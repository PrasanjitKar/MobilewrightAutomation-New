import { test } from './test-fixtures';
import { createBdd } from 'playwright-bdd';
export const { Given, When, Then, Before, After, BeforeAll, AfterAll, BeforeStep, AfterStep } = createBdd(test, {
  worldFixture: 'world',
});

import fs from 'fs';
import path from 'path';
import type { TestInfo } from '@playwright/test';
import { createLogger } from 'winston';

import { ScenarioContext } from '../utils/ScenarioContext';
import { HTMLSubStepLogger } from '../utils/htmlSubStepLogger';
import { CSVParser } from '../utils/CSVParser';
import { loadPasswordsMap } from '../utils/passwordResolver';
import { options } from '../utils/logger';
import { HtmlEmailReport } from '../report/email-html/html-report';
import { ResultStore } from '../report/email-html/result-store';
import logger from '../utils/logger';
import { ConfigurationManager } from '../config/ConfigurationManager';

// playwright-bdd v9 auto-injects these fixtures into every hook at runtime.
// They are not in our extended test's TypeScript type, so we cast where needed.
type BddAutoFixtures = {
  $testInfo: TestInfo;
  $tags: string[];
  $step: { title: string; error?: unknown };
  $bddContext: { featureUri: string; tags: string[] };
};

// =====================================================
// BeforeAll
// =====================================================

BeforeAll(async function () {
  const config = ConfigurationManager.config();

  ensureDir(config.screenshotPath);
  ensureDir(config.tracePath);
  ensureDir(config.videoPath);

  ResultStore.clear();
});

// =====================================================
// Before Scenario
// =====================================================

Before(async function (this: ScenarioContext, { $tags }: Pick<BddAutoFixtures, '$tags'>) {
  const config = ConfigurationManager.config();
  const scenarioName = `${this.testInfo.title}_${this.testInfo.testId.slice(0, 8)}`;

  this.scenarioStart = Date.now();
  this.env = config.envName;

  this.softAssertErrors = [];
  this.softAssertStepFailures = [];
  this.currentStepSoftFailures = [];
  this.currentStepHasSoftFailure = false;
  this.currentStepHasWarning = false;

  // Per-scenario file logger
  this.logger = createLogger(options(scenarioName));
  this.logger.info(`Starting Scenario: ${this.testInfo.title}`);

  // subStepLogger — HTML badge attachments mirrored to terminal logger
  this.subStepLogger = new HTMLSubStepLogger(
    async (data, mediaType) => {
      await this.attach(data as string, mediaType);
    },
    this,
  );
  (['success', 'info', 'warning', 'failure', 'logFailure', 'softFailure'] as const).forEach((fn) => {
    const proxy = this.subStepLogger as unknown as Record<string, (msg: string) => unknown>;
    const orig = proxy[fn].bind(this.subStepLogger);
    proxy[fn] = (msg: string) => {
      logger.info(`[${fn}] ${msg}`);
      return orig(msg);
    };
  });

  // ---- Test data loading ----
  const dataFileTag = $tags.find((t: string) => t.startsWith('@DataFile:'));
  const keyTag = $tags.find((t: string) => t.startsWith('@Key:'));

  if (keyTag) {
    const key = keyTag.replace('@Key:', '').trim();
    const dataFilePath = dataFileTag
      ? dataFileTag.replace('@DataFile:', '').trim()
      : 'resources/data/testdata.csv';

    const fullPath = path.resolve(process.cwd(), dataFilePath);
    const fileExt = path.extname(fullPath).toLowerCase();

    if (!fs.existsSync(fullPath)) throw new Error(`Data file not found: ${fullPath}`);

    let dataSource: Record<string, unknown>[];

    if (fileExt === '.json') {
      dataSource = JSON.parse(fs.readFileSync(fullPath, 'utf-8')) as Record<string, unknown>[];
    } else if (fileExt === '.csv') {
      dataSource = await CSVParser.parseData(fullPath, '|');
    } else {
      throw new Error(`Unsupported data file format: ${fileExt} — use .csv or .json`);
    }

    const match = dataSource.find((row) => {
      const rowKey = String(row['Key'] ?? row['TestCaseID'] ?? row['key'] ?? row['testcaseid'] ?? '').trim();
      const rowEnv = String(row['Env'] ?? row['env'] ?? '').trim();
      return rowKey === key && rowEnv.toLowerCase() === config.envName.toLowerCase();
    });

    if (!match) throw new Error(`No data found for Key="${key}" Env="${config.envName}" in ${dataFilePath}`);

    const parsed: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(match)) {
      if (typeof v === 'string' && v.trim().startsWith('{')) {
        try {
          parsed[k] = JSON.parse(v);
        } catch {
          parsed[k] = v;
        }
      } else {
        parsed[k] = v;
      }
    }

    parsed['password'] = loadPasswordsMap();
    this.testData = parsed;

    logger.info(`Test data loaded: key="${key}" env="${config.envName}" file="${dataFilePath}"`);
  } else {
    this.testData = {};
  }
});

// =====================================================
// BeforeStep
// =====================================================

BeforeStep(async function (this: ScenarioContext, { $step }: Pick<BddAutoFixtures, '$step'>) {
  const stepText = maskPasswords($step.title);

  this.currentStep = stepText;
  this.currentStepSoftFailures = [];
  this.currentStepHasSoftFailure = false;
  this.currentStepHasWarning = false;

  this.logger?.info(`Step started: ${stepText}`);
  await this.subStepLogger?.info(`Step started → ${stepText}`);
});

// =====================================================
// AfterStep
// =====================================================

AfterStep(async function (this: ScenarioContext, { $step }: Pick<BddAutoFixtures, '$step'>) {
  const stepText = maskPasswords($step.title);
  const hasFailed = !!$step.error;

  if (!hasFailed) {
    if (this.currentStepHasSoftFailure) {
      this.logger?.error(`Step soft-failed: ${stepText}`);
      await this.subStepLogger?.logFailure(`Step soft-failed → ${stepText}`);
    } else if (this.currentStepHasWarning) {
      this.logger?.warn(`Step passed with warning: ${stepText}`);
      await this.subStepLogger?.warning(`Step has warning → ${stepText}`);
    } else {
      this.logger?.info(`Step passed: ${stepText}`);
    }
  } else {
    this.logger?.error(`Step failed: ${stepText}`);
    await this.subStepLogger?.logFailure(`Step failed → ${stepText}`);

    if (this.page) {
      try {
        const screenshotPath = path.join(
          ConfigurationManager.config().screenshotPath,
          `${this.testInfo.testId.slice(0, 8)}_${safeFileName(stepText)}.png`,
        );
        const screenshot = await this.page.screenshot({ path: screenshotPath, fullPage: true });
        await this.attach(screenshot, 'image/png');
      } catch (err) {
        logger.warn('Failed to take step-failure screenshot', err);
      }
    }
  }

  this.currentStep = '';
  this.currentStepSoftFailures = [];
  this.currentStepHasSoftFailure = false;
  this.currentStepHasWarning = false;
});

// =====================================================
// After Scenario
// =====================================================

After(
  { timeout: 120000 },
  async function (this: ScenarioContext, { $bddContext }: Pick<BddAutoFixtures, '$bddContext'>) {
  const end = Date.now();
  const scenarioPassed = this.testInfo.status === 'passed';
  const hasSoftErrors = this.softAssertErrors?.length > 0;
  const softFailures = [...(this.softAssertStepFailures ?? [])];

  let videoPath: string | undefined;
  let savedTracePath: string | undefined;
  const config = ConfigurationManager.config();

  // ---- Video path ----
  try {
    videoPath = (await this.page?.video()?.path()) ?? undefined;
  } catch {
    logger.warn('Could not retrieve video path');
  }

  // ---- Final screenshot ----
  try {
    if (this.page) {
      const screenshot = await this.page.screenshot({ fullPage: true });
      await this.attach(screenshot, 'image/png');
    }
  } catch (err) {
    logger.error('Failed to capture final screenshot', err);
  }

  // ---- Stop tracing ----
  try {
    if (this.context) {
      if (config.traceEnabled) {
        savedTracePath = path.join(
          config.tracePath,
          `${safeFileName(this.testInfo.title)}-${this.testInfo.testId.slice(0, 8)}.zip`,
        );
        await this.context.tracing.stop({ path: savedTracePath });
        logger.info(`Trace saved: ${savedTracePath}`);
      } else {
        await this.context.tracing.stop();
      }
    }
  } catch (err) {
    logger.error('Failed to stop tracing', err);
  }

  // ---- Attach trace note ----
  if (savedTracePath && fs.existsSync(savedTracePath)) {
    await this.attach(
      `Trace: ${savedTracePath}\nOpen at: https://trace.playwright.dev/`,
      'text/plain',
    );
  }

  // ---- Attach video ----
  try {
    if (videoPath && fs.existsSync(videoPath)) {
      await this.attach(fs.readFileSync(videoPath), 'video/webm');
    } else if (videoPath) {
      logger.warn(`Video file not found at: ${videoPath}`);
    }
  } catch (err) {
    logger.warn('Unable to attach video', err);
  }

  const effectiveStatus =
    scenarioPassed && hasSoftErrors
      ? 'FAILED'
      : scenarioPassed
        ? 'PASSED'
        : this.testInfo.status === 'failed' || this.testInfo.status === 'timedOut'
          ? 'FAILED'
          : 'SKIPPED';

  ResultStore.add({
    module: path.basename($bddContext.featureUri, '.feature'),
    name: this.testInfo.title,
    status: effectiveStatus,
    duration: end - (this.scenarioStart ?? end),
    error: this.testInfo.error?.message || (hasSoftErrors ? this.softAssertErrors.join('\n') : ''),
    startTime: time(this.scenarioStart ?? end),
    endTime: time(end),
    },
  );

  this.softAssertErrors = [];
  this.softAssertStepFailures = [];
  this.currentStepSoftFailures = [];
  this.currentStepHasSoftFailure = false;
  this.currentStepHasWarning = false;

  if (scenarioPassed && softFailures.length > 0) {
    throw new Error(
      'Soft assertion failures:\n' +
        softFailures.map((f, i) => `${i + 1}. [${f.step}] ${f.message}`).join('\n'),
    );
  }

  this.logger?.info(`Scenario finished: ${this.testInfo.title}`);
});

// =====================================================
// AfterAll
// =====================================================

AfterAll(async function () {
  await HtmlEmailReport.generate(ResultStore.all());
  logger.info('Execution report generated');
});

// =====================================================
// Helpers
// =====================================================

function ensureDir(dir: string): void {
  fs.mkdirSync(dir, { recursive: true });
}

function safeFileName(name: string): string {
  return name.replace(/[^a-z0-9-_]+/gi, '_').toLowerCase();
}

function time(millis: number): string {
  return new Date(millis).toLocaleTimeString('en-GB', { hour12: false });
}

function maskPasswords(stepText: string): string {
  if (!stepText.toLowerCase().includes('password')) return stepText;
  return stepText.replace(/"([^"]+)"/g, (match) =>
    stepText.toLowerCase().indexOf('password') < stepText.indexOf(match) ? '"********"' : match,
  );
}

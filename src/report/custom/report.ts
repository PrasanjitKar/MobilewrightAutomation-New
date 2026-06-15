import * as dotenv from 'dotenv';
import * as path from 'path';
import * as os from 'os';
import * as fs from 'fs';
import { execSync } from 'child_process';
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { generate } = require('multiple-cucumber-html-reporter') as {
  generate: (options: Record<string, unknown>) => void;
};

function hasSoftFailureEmbedding(step: any): boolean {
  if (!Array.isArray(step?.embeddings)) return false;
  return step.embeddings.some((embedding: any) => {
    if (embedding?.mime_type !== 'text/html') return false;
    const data = String(embedding?.data ?? '');
    return data.includes('SOFT ASSERT FAILED') || data.includes('Step soft-failed');
  });
}

/**
 * Cucumber marks After/Before hooks as hidden:true, so multiple-cucumber-html-reporter
 * skips them entirely — screenshots, videos, and traces are never rendered.
 * This function moves all embeddings from hidden hook steps to the last visible step
 * so they appear in the report.
 */
function promoteHookEmbeddingsToLastStep(reportFilePath: string): void {
  if (!fs.existsSync(reportFilePath)) return;

  const raw = fs.readFileSync(reportFilePath, 'utf8');
  if (!raw.trim()) return;

  const report = JSON.parse(raw);
  if (!Array.isArray(report)) return;

  for (const feature of report) {
    if (!Array.isArray(feature?.elements)) continue;

    for (const scenario of feature.elements) {
      if (!Array.isArray(scenario?.steps)) continue;

      const visibleSteps = scenario.steps.filter((s: any) => !s.hidden);
      const hiddenHooks = scenario.steps.filter((s: any) => s.hidden);

      if (!visibleSteps.length || !hiddenHooks.length) continue;

      const lastStep = visibleSteps[visibleSteps.length - 1];
      if (!Array.isArray(lastStep.embeddings)) lastStep.embeddings = [];

      for (const hook of hiddenHooks) {
        if (!Array.isArray(hook.embeddings)) continue;
        for (const emb of hook.embeddings) {
          // Skip subStepLogger HTML badges — only promote real artifacts
          if (emb.mime_type === 'text/html') continue;
          lastStep.embeddings.push(emb);
        }
      }
    }
  }

  fs.writeFileSync(reportFilePath, JSON.stringify(report, null, 2), 'utf8');
}

function normalizeSoftFailuresInJsonReport(reportFilePath: string): void {
  if (!fs.existsSync(reportFilePath)) return;

  const raw = fs.readFileSync(reportFilePath, 'utf8');
  if (!raw.trim()) return;

  const report = JSON.parse(raw);
  if (!Array.isArray(report)) return;

  let updatedStepCount = 0;

  for (const feature of report) {
    if (!Array.isArray(feature?.elements)) continue;

    for (const scenario of feature.elements) {
      if (!Array.isArray(scenario?.steps)) continue;

      let scenarioHasSoftFailedStep = false;

      for (const step of scenario.steps) {
        if (!step?.result || step.hidden) continue;
        if (step.result.status !== 'passed') continue;
        if (!hasSoftFailureEmbedding(step)) continue;

        step.result.status = 'failed';
        if (!step.result.error_message) {
          step.result.error_message = 'Soft assertion failure in this step. Execution continued by design.';
        }
        scenarioHasSoftFailedStep = true;
        updatedStepCount += 1;
      }

      if (!scenarioHasSoftFailedStep) continue;

      for (const step of scenario.steps) {
        if (!step?.hidden || step?.keyword !== 'After') continue;
        if (!step?.result || step.result.status !== 'failed') continue;

        const errorText = String(step.result.error_message ?? '');
        if (!errorText.includes('Soft assertion failures:')) continue;

        step.result.status = 'passed';
        delete step.result.error_message;
      }
    }
  }

  if (updatedStepCount > 0) {
    fs.writeFileSync(reportFilePath, JSON.stringify(report, null, 2), 'utf8');
    console.log(`INFO: Normalized ${updatedStepCount} soft-failed step(s) in ${path.basename(reportFilePath)}.`);
  }
}

/* =====================================
   LOAD ENV FILE
===================================== */
dotenv.config({
  path: path.resolve(process.cwd(), `resources/.env.${process.env.ENV || 'STG'}`),
});

/* =====================================
   SYSTEM INFO
===================================== */
const deviceName = os.hostname();
const platformName = os.type();
const platformVersion = os.release();

/* =====================================
   ENV VARIABLES
===================================== */
const projectName = process.env.PROJECT || 'Conti+';
const releaseVersion = process.env.RELEASE || '1.0.0';
const cycleName = process.env.CYCLE || 'Sanity';
const baseUrl = process.env.BASEURL || 'https://stage.contiplus.net/';

const headlessMode = process.env.HEADLESS !== 'false' ? 'true' : 'false';
const browserName = process.env.BROWSER || 'chrome';

/* =====================================
   DETECT BROWSER VERSION
===================================== */
let browserVersion = 'Unknown';

try {
  if (browserName.toLowerCase().includes('chrome')) {
    const output = execSync(
      process.platform === 'win32'
        ? 'reg query "HKEY_CURRENT_USER\\Software\\Google\\Chrome\\BLBeacon" /v version'
        : 'google-chrome --version || chromium --version',
      { encoding: 'utf8', stdio: ['pipe', 'pipe', 'ignore'] },
    );

    const match = output.match(/\d+\.\d+\.\d+\.\d+/);
    if (match) browserVersion = match[0];
  }

  if (browserName.toLowerCase().includes('edge')) {
    const output = execSync(
      process.platform === 'win32'
        ? 'reg query "HKEY_CURRENT_USER\\Software\\Microsoft\\Edge\\BLBeacon" /v version'
        : 'msedge --version',
      { encoding: 'utf8', stdio: ['pipe', 'pipe', 'ignore'] },
    );

    const match = output.match(/\d+\.\d+\.\d+\.\d+/);
    if (match) browserVersion = match[0];
  }

  if (browserName.toLowerCase().includes('firefox')) {
    const output = execSync('firefox --version', { encoding: 'utf8' });

    const match = output.match(/\d+\.\d+/);
    if (match) browserVersion = match[0];
  }
} catch {
  console.warn('⚠ Browser version detection failed.');
}

/* =====================================
   REPORT PATHS
===================================== */
const jsonDir = path.resolve('test-results');
const reportDir = path.join(jsonDir, 'reports');

if (!fs.existsSync(jsonDir)) {
  console.warn('⚠ test-results folder not found. No report generated.');
  process.exit(0);
}

if (!fs.existsSync(reportDir)) {
  fs.mkdirSync(reportDir, { recursive: true });
}

const jsonReportPath = path.join(jsonDir, 'cucumber-report.json');
promoteHookEmbeddingsToLastStep(jsonReportPath);
normalizeSoftFailuresInJsonReport(jsonReportPath);

/* =====================================
   CUSTOM CSS THEME
===================================== */
const cssContent = `
body {
    background-color: #ffa500 !important;
}

.main_container {
    background: #ffffff !important;
    padding: 15px;
    border-radius: 10px;
}

@media (prefers-color-scheme: dark) {
    body {
        background-color: #1a1a1a !important;
    }

    .main_container, .x_panel {
        background: #2a2a2a !important;
        color: #ffffff !important;
    }

    .x_title {
        color: #ffffff !important;
        border-bottom: 2px solid #ffa500 !important;
    }
}

.x_title h2 {
    font-weight: bold;
    color: #333;
}
`;

const cssPath = path.join(reportDir, 'custom-style.css');
fs.writeFileSync(cssPath, cssContent);

/* =====================================
   GENERATE HTML REPORT
===================================== */
generate({
  jsonDir,
  reportPath: reportDir,
  reportName: 'Automation Report',
  pageTitle: 'Conti+ Test Results',
  displayDuration: true,
  durationInMS: false,

  metadata: {
    browser: {
      name: browserName,
      version: browserVersion,
    },
    device: deviceName,
    platform: {
      name: platformName,
      version: platformVersion,
    },
  },

  customData: {
    title: 'Execution Details',
    data: [
      { label: 'Project', value: projectName },
      { label: 'Release', value: releaseVersion },
      { label: 'Cycle', value: cycleName },
      { label: 'Base URL', value: baseUrl },
      { label: 'Headless', value: headlessMode },
      { label: 'Executed At', value: new Date().toLocaleString() },
    ],
  },

  customStyle: cssPath,
});

console.log('✅ HTML Report Generated Successfully!');

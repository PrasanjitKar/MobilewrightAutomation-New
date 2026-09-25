import { expect } from '@mobilewright/test';
import { Page, Locator } from 'mobilewright';
import { ISoftAssertState } from './ScenarioContext';

type AssertLogger = {
  info?: (msg: string) => void | Promise<void>;
  success?: (msg: string) => void | Promise<void>;
  failure?: (msg: string) => void | Promise<void>;
  logFailure?: (msg: string) => void | Promise<void>;
  warning?: (msg: string) => void | Promise<void>;
};

export default class Assert {
  // Usage convention:
  // - assert*     => hard assertion (throws immediately)
  // - softAssert* => soft assertion (collects error, scenario fails in After hook)
  private static async hardFail(message: string, error: unknown, logger?: AssertLogger): Promise<never> {
    await logger?.failure?.(message);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error(message);
  }

  private static async softFail(message: string, logger?: AssertLogger, state?: ISoftAssertState): Promise<void> {
    if (!state) {
      throw new Error('softFail requires an ISoftAssertState (World context) — pass it via the soft assert call.');
    }
    const stepPrefix = state.currentStep ? `[${state.currentStep}] ` : '';
    const stepAwareMessage = `${stepPrefix}${message}`;
    const activeLogger = logger;
    const stepName = state.currentStep || 'Unknown step';
    state.currentStepHasWarning = true;
    state.currentStepHasSoftFailure = true;
    state.currentStepSoftFailures.push(stepAwareMessage);
    state.softAssertStepFailures.push({
      step: stepName,
      message,
    });

    try {
      if (activeLogger?.logFailure) {
        await activeLogger.logFailure(`SOFT ASSERT FAILED: ${stepAwareMessage}`);
      } else if (activeLogger?.warning) {
        await activeLogger.warning(`SOFT ASSERT FAILED: ${stepAwareMessage}`);
      } else if (activeLogger?.info) {
        await activeLogger.info(`SOFT ASSERT FAILED: ${stepAwareMessage}`);
      }
    } catch {
      // Soft assertion logging should never convert to a hard failure.
    }

    state.softAssertErrors.push(stepAwareMessage);
  }

  private static async verify(
    assertion: () => Promise<void> | void,
    successMessage: string,
    failureMessage: string,
    logger?: AssertLogger,
    soft: boolean = false,
    state?: ISoftAssertState,
  ): Promise<void> {
    try {
      await assertion();
      await logger?.success?.(successMessage);
    } catch (error) {
      if (soft) {
        await this.softFail(failureMessage, logger, state);
        return;
      }
      await this.hardFail(failureMessage, error, logger);
    }
  }

  static async assertTitle(page: Page, title: string, logger?: AssertLogger) {
    await logger?.info?.(`Asserting page title is: ${title}`);
    await this.verify(
      () => expect(page).toHaveTitle(title),
      `Page title matches: ${title}`,
      `Page title assertion failed: ${title}`,
      logger,
      false,
    );
  }

  static async softAssertTitle(page: Page, title: string, logger?: AssertLogger, state?: ISoftAssertState) {
    await logger?.info?.(`Soft-asserting page title is: ${title}`);
    await this.verify(
      () => expect(page).toHaveTitle(title),
      `Page title matches: ${title}`,
      `Page title assertion failed: ${title}`,
      logger,
      true,
      state,
    );
  }

  static async assertTitleContains(page: Page, title: string, logger?: AssertLogger) {
    await logger?.info?.(`Asserting page title contains: ${title}`);
    await this.verify(
      async () => {
        const pageTitle = await page.title();
        expect(pageTitle).toContain(title);
      },
      `Page title contains: ${title}`,
      `Page title does not contain: ${title}`,
      logger,
      false,
    );
  }

  static async softAssertTitleContains(page: Page, title: string, logger?: AssertLogger, state?: ISoftAssertState) {
    await logger?.info?.(`Soft-asserting page title contains: ${title}`);
    await this.verify(
      async () => {
        const pageTitle = await page.title();
        expect(pageTitle).toContain(title);
      },
      `Page title contains: ${title}`,
      `Page title does not contain: ${title}`,
      logger,
      true,
      state,
    );
  }

  static async assertURL(page: Page, url: string, logger?: AssertLogger) {
    await logger?.info?.(`Asserting page URL is: ${url}`);
    await this.verify(
      () => expect(page).toHaveURL(url),
      `Page URL matches: ${url}`,
      `Page URL assertion failed: ${url}`,
      logger,
      false,
    );
  }

  static async softAssertURL(page: Page, url: string, logger?: AssertLogger, state?: ISoftAssertState) {
    await logger?.info?.(`Soft-asserting page URL is: ${url}`);
    await this.verify(
      () => expect(page).toHaveURL(url),
      `Page URL matches: ${url}`,
      `Page URL assertion failed: ${url}`,
      logger,
      true,
      state,
    );
  }

  static async assertURLContains(page: Page, text: string, logger?: AssertLogger) {
    await logger?.info?.(`Asserting page URL contains: ${text}`);
    await this.verify(
      () => expect(page.url()).toContain(text),
      `Page URL contains: ${text}`,
      `Page URL does not contain: ${text}`,
      logger,
      false,
    );
  }

  static async softAssertURLContains(page: Page, text: string, logger?: AssertLogger, state?: ISoftAssertState) {
    await logger?.info?.(`Soft-asserting page URL contains: ${text}`);
    await this.verify(
      () => expect(page.url()).toContain(text),
      `Page URL contains: ${text}`,
      `Page URL does not contain: ${text}`,
      logger,
      true,
      state,
    );
  }

  static async assertElementExists(locator: Locator, label?: string, logger?: AssertLogger) {
    const desc = label ?? 'element';
    await logger?.info?.(`Asserting ${desc} is visible`);
    await this.verify(() => expect(locator).toBeVisible(), `${desc} is visible`, `${desc} not visible`, logger, false);
  }

  static async softAssertElementExists(
    locator: Locator,
    label?: string,
    logger?: AssertLogger,
    state?: ISoftAssertState,
  ) {
    const desc = label ?? 'element';
    await logger?.info?.(`Soft-asserting ${desc} is visible`);
    await this.verify(
      () => expect(locator).toBeVisible(),
      `${desc} is visible`,
      `${desc} not visible`,
      logger,
      true,
      state,
    );
  }

  static async assertElementNotExists(locator: Locator, label?: string, logger?: AssertLogger) {
    const desc = label ?? 'element';
    await logger?.info?.(`Asserting ${desc} is not visible`);
    await this.verify(
      () => expect(locator).not.toBeVisible(),
      `${desc} is not visible`,
      `${desc} is visible (should not be)`,
      logger,
      false,
    );
  }

  static async softAssertElementNotExists(
    locator: Locator,
    label?: string,
    logger?: AssertLogger,
    state?: ISoftAssertState,
  ) {
    const desc = label ?? 'element';
    await logger?.info?.(`Soft-asserting ${desc} is not visible`);
    await this.verify(
      () => expect(locator).not.toBeVisible(),
      `${desc} is not visible`,
      `${desc} is visible (should not be)`,
      logger,
      true,
      state,
    );
  }

  static async assertTrue(condition: boolean, logger?: AssertLogger) {
    await logger?.info?.('Asserting condition is true');
    await this.verify(
      () => expect(condition).toBeTruthy(),
      'Condition is true',
      'Condition is not true',
      logger,
      false,
    );
  }

  static async softAssertTrue(condition: boolean, logger?: AssertLogger, state?: ISoftAssertState) {
    await logger?.info?.('Soft-asserting condition is true');
    await this.verify(
      () => expect(condition).toBeTruthy(),
      'Condition is true',
      'Condition is not true',
      logger,
      true,
      state,
    );
  }

  static async assertEquals(actual: any, expected: any, stepMessage: string, logger?: AssertLogger) {
    await logger?.info?.(`Verifying: ${stepMessage}`);
    await this.verify(
      () => expect(actual).toBe(expected),
      `PASS ${stepMessage}`,
      `FAIL ${stepMessage} | Expected: ${expected}, Actual: ${actual}`,
      logger,
      false,
    );
  }

  static async softAssertEquals(
    actual: any,
    expected: any,
    stepMessage: string,
    logger?: AssertLogger,
    state?: ISoftAssertState,
  ) {
    await logger?.info?.(`Soft-verifying: ${stepMessage}`);
    await this.verify(
      () => expect(actual).toBe(expected),
      `PASS ${stepMessage}`,
      `FAIL ${stepMessage} | Expected: ${expected}, Actual: ${actual}`,
      logger,
      true,
      state,
    );
  }

  static async assertTextContents(locator: Locator, expectedText: string, label?: string, logger?: AssertLogger) {
    const desc = label ?? 'element';
    await logger?.info?.(`Asserting ${desc} has text: ${expectedText}`);
    await this.verify(
      () => expect(locator).toHaveText(expectedText),
      `${desc} text matches: ${expectedText}`,
      `${desc} text does not match: ${expectedText}`,
      logger,
      false,
    );
  }

  static async softAssertTextContents(
    locator: Locator,
    expectedText: string,
    label?: string,
    logger?: AssertLogger,
    state?: ISoftAssertState,
  ) {
    const desc = label ?? 'element';
    await logger?.info?.(`Soft-asserting ${desc} has text: ${expectedText}`);
    await this.verify(
      () => expect(locator).toHaveText(expectedText),
      `${desc} text matches: ${expectedText}`,
      `${desc} text does not match: ${expectedText}`,
      logger,
      true,
      state,
    );
  }
}

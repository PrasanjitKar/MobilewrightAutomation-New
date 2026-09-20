import { Screen, Locator } from 'mobilewright';
import { HTMLSubStepLogger } from '../utils/htmlSubStepLogger';

export interface TapOptions {
  timeout?: number;
  button?: 'left' | 'right' | 'middle';
  clickCount?: number;
}

export interface FillOptions {
  timeout?: number;
  delay?: number;
}

export interface WaitForOptions {
  state: 'visible' | 'hidden' | 'enabled' | 'disabled';
  timeout?: number;
}

export interface SwipeOptions {
  direction: 'up' | 'down' | 'left' | 'right';
  distance?: number;
  duration?: number;
  timeout?: number;
  startX?: number;
  startY?: number;
}

export interface AssertionOptions {
  timeout?: number;
}

export default class BasePage {
  protected DEFAULT_TIMEOUT = 5000;

  constructor(
    protected screen: Screen,
    protected subStepLogger?: HTMLSubStepLogger,
  ) {}

  async waitForLoadingToComplete(): Promise<void> {
    await this.waitForTime(1000);
  }

  protected async logInfo(message: string): Promise<void> {
    await this.subStepLogger?.info(message);
  }

  protected async logSuccess(message: string): Promise<void> {
    await this.subStepLogger?.success(message);
  }

  protected async logWarning(message: string): Promise<void> {
    await this.subStepLogger?.warning(message);
  }

  protected async logFailure(message: string): Promise<void> {
    await this.subStepLogger?.logFailure(message);
  }

  async tap(locator: Locator, timeout?: number): Promise<void> {
    const waittime = timeout ?? this.DEFAULT_TIMEOUT;
    await locator.waitFor({ state: 'visible', timeout: waittime });
    await locator.tap({ timeout: waittime });
  }

  async doubleTap(locator: Locator, timeout?: number): Promise<void> {
    const waittime = timeout ?? this.DEFAULT_TIMEOUT;
    await locator.waitFor({ state: 'visible', timeout: waittime });
    await locator.doubleTap({ timeout: waittime });
  }

  async longPress(locator: Locator, duration?: number, timeout?: number): Promise<void> {
    const waittime = timeout ?? this.DEFAULT_TIMEOUT;
    await locator.waitFor({ state: 'visible', timeout: waittime });
    await locator.longPress({ duration: duration ?? 5000, timeout: waittime });
  }

  async fill(locator: Locator, value: string, timeout?: number): Promise<void> {
    const waittime = timeout ?? this.DEFAULT_TIMEOUT;
    await locator.waitFor({ state: 'visible', timeout: waittime });
    await locator.fill(value, { timeout: waittime });
  }

  async swipeScreen(options: SwipeOptions): Promise<void> {
    await this.screen.swipe(options.direction, {
      distance: options.distance,
      duration: options.duration,
    });
  }

  async swipeElement(locator: Locator, _direction: string, options: SwipeOptions): Promise<void> {
    const waittime = this.DEFAULT_TIMEOUT;
    await locator.waitFor({ state: 'visible', timeout: waittime });
    await locator.swipe({ direction: options.direction, timeout: waittime });
  }

  async scrollIntoView(locator: Locator, _timeout?: number): Promise<void> {
    await locator.scrollIntoViewIfNeeded();
  }

  /**
   * Waits (polling) until the first locator among the candidates becomes visible, returning it.
   * Useful when the same action can surface one of several possible UI variants
   * (e.g. phone vs tablet layout, or different navigation paths reaching the same feature).
   */
  protected async findFirstVisible(locators: Locator[], timeout: number): Promise<Locator | undefined> {
    const deadline = Date.now() + timeout;

    while (Date.now() < deadline) {
      for (const locator of locators) {
        try {
          await locator.waitFor({ state: 'visible', timeout: Math.min(500, Math.max(1, deadline - Date.now())) });
          return locator;
        } catch {
          // Try the next locator until the overall timeout expires.
        }
      }
    }

    return undefined;
  }

  async logTree(): Promise<void> {
    console.log(await this.screen.viewTree());
  }

  async waitForTime(milliseconds: number, message?: string): Promise<void> {
    if (message) {
      console.log(`${message} - waiting ${milliseconds}ms...`);
    } else {
      console.log(`Waiting ${milliseconds}ms...`);
    }
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  }

  async takeScreenshot(filename?: string, format: 'png' | 'jpeg' = 'png'): Promise<Buffer> {
    return this.screen.screenshot({
      path: filename,
      format: format,
    });
  }
}

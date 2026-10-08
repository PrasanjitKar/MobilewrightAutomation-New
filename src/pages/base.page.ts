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

export interface BoundingBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface ScrollToEndOptions {
  /** Maximum number of swipes before giving up. Default: 10 */
  maxSwipes?: number;
  /** Swipe gesture direction. 'up' moves the finger up, revealing content below the fold. Default: 'up' */
  direction?: SwipeOptions['direction'];
  /**
   * Swipe length in pixels. Leave unset unless a specific gesture length is required: the driver
   * then swipes half the screen height (or width), which scales to the device instead of risking a
   * gesture that ends far outside the screen on smaller displays.
   */
  distance?: number;
  duration?: number;
  /** Time to let the content settle after each swipe, in ms. Default: 600 */
  settleDelay?: number;
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
      startX: options.startX,
      startY: options.startY,
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

  /**
   * Returns the on-screen rectangle of a locator, or null when it cannot be resolved.
   */
  protected async getBoundingBox(locator: Locator, timeout = 500): Promise<BoundingBox | null> {
    try {
      return await locator.boundingBox({ timeout });
    } catch {
      return null;
    }
  }

  /**
   * Waits (polling) until the first locator among the candidates resolves to an element that
   * actually occupies screen space, and returns it.
   *
   * Note that a non-zero box alone does not mean the element is fully usable: content that sits
   * below the fold of a scrollable container is often reported as a thin clipped sliver at the
   * bottom edge of the screen. Use {@link scrollToEndAndFind} when the element may be off-screen.
   */
  protected async findFirstTappable(locators: Locator[], timeout: number): Promise<Locator | undefined> {
    const deadline = Date.now() + timeout;

    do {
      for (const locator of locators) {
        const remaining = deadline - Date.now();
        const box = await this.getBoundingBox(locator, Math.min(500, Math.max(1, remaining)));
        if (box && box.width > 0 && box.height > 0) {
          return locator;
        }
      }
    } while (Date.now() < deadline);

    return undefined;
  }

  /**
   * Scrolls the screen to the end of its content, then returns the first candidate found there.
   *
   * This is the reliable way to reach an element that always sits below the fold, such as the
   * action buttons of a long consent dialog. Relying on the element's visibility or bounding box
   * to decide whether a scroll is needed does not work: a clipped element below the fold still
   * reports as visible, with a thin non-zero box pinned to the bottom edge of the screen, so the
   * scroll would be skipped and the tap would land on the sliver instead of the real control.
   *
   * Instead the screen is swiped until the candidate's box stops moving between two consecutive
   * swipes, which means the content cannot scroll any further. This needs no knowledge of the
   * platform, of the scrollable container, or of how far the content extends, so it behaves the
   * same on Android and iOS - including for WebView content, which reports no scrollable node.
   *
   * A swipe direction of 'up' moves the finger upwards, scrolling the content down and therefore
   * revealing elements located below the current viewport.
   */
  protected async scrollToEndAndFind(
    locators: Locator[],
    options: ScrollToEndOptions = {},
  ): Promise<Locator | undefined> {
    const maxSwipes = options.maxSwipes ?? 10;
    const settleDelay = options.settleDelay ?? 600;

    let target = await this.findFirstTappable(locators, 2000);
    let previousBox = target ? await this.getBoundingBox(target) : null;

    for (let attempt = 0; attempt < maxSwipes; attempt++) {
      try {
        await this.swipeScreen({
          direction: options.direction ?? 'up',
          distance: options.distance,
          duration: options.duration,
        });
      } catch {
        // The screen cannot be swiped - fall back to whatever was found before.
        break;
      }
      await this.waitForTime(settleDelay);

      // Re-scanning every candidate costs one view-hierarchy dump each, so only do it while no
      // candidate has been matched yet; afterwards the known target is simply re-measured.
      if (!target) {
        target = await this.findFirstTappable(locators, 1000);
      }
      const currentBox = target ? await this.getBoundingBox(target) : null;

      if (previousBox && currentBox && this.boundsEqual(previousBox, currentBox)) {
        return target;
      }
      previousBox = currentBox;
    }

    return target;
  }

  private boundsEqual(a: BoundingBox, b: BoundingBox): boolean {
    return a.x === b.x && a.y === b.y && a.width === b.width && a.height === b.height;
  }

  /**
   * Combines candidate locators into a single locator matching any of them.
   *
   * Each locator resolution costs one view-hierarchy dump (~1.6s on a real device), so polling a
   * list of N candidates one by one makes a single poll cycle N times slower and can miss an
   * element that appears in between. A combined locator is evaluated against one dump instead.
   */
  protected anyOf(locators: Locator[]): Locator {
    if (locators.length === 0) {
      throw new Error('anyOf() requires at least one locator');
    }
    return locators.reduce((combined, locator) => combined.or(locator));
  }

  async logTree(): Promise<void> {
    console.log(await this.screen.viewTree());
  }

  async waitForTime(milliseconds: number, message?: string): Promise<void> {
    // if (message) {
    //   console.log(`${message} - waiting ${milliseconds}ms...`);
    // } else {
    //   console.log(`Waiting ${milliseconds}ms...`);
    // }
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  }

  async takeScreenshot(filename?: string, format: 'png' | 'jpeg' = 'png'): Promise<Buffer> {
    return this.screen.screenshot({
      path: filename,
      format: format,
    });
  }
}

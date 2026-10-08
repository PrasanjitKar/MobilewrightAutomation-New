import type { Device, Locator } from 'mobilewright';

/**
 * Types that represent an editable text input in a raw platform dump.
 *
 * Flutter renders every text field as a real `android.widget.EditText` proxy on Android, and as
 * `XCUIElementTypeTextField` / `XCUIElementTypeSecureTextField` on iOS. mobilecli strips the
 * `XCUIElementType` prefix in some dumps, so both spellings are accepted.
 */
const TEXT_INPUT_TYPES = new Set(
  [
    'android.widget.EditText',
    'android.widget.AutoCompleteTextView',
    'android.widget.MultiAutoCompleteTextView',
    'XCUIElementTypeTextField',
    'XCUIElementTypeSecureTextField',
    'TextField',
    'SecureTextField',
  ].map((type) => type.toLowerCase()),
);

interface RawRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

/** A node exactly as the platform reports it, before mobilecli's dump filter runs. */
interface RawNode {
  class: string;
  text?: string;
  'content-desc'?: string;
  'resource-id'?: string;
  focused?: boolean;
  visible?: boolean;
  rect: RawRect;
  children?: RawNode[] | null;
}

/**
 * The live RPC session the MobileWright driver already holds open.
 *
 * `MobilecliDriver.session` is private to the published typings, but it is a plain public runtime
 * property. Reaching it lets us issue one extra `device.dump.ui` call on the connection the driver
 * is already using, instead of spawning a second mobilecli process per field.
 */
interface DriverWithSession {
  session: {
    deviceId: string;
    rpc: { call<T>(method: string, params?: Record<string, unknown>): Promise<T> };
  } | null;
}

export interface FillNativeInputOptions {
  /** The field masks its value (password). Verification then compares length, not characters. */
  obscured?: boolean;
  /** How long to wait for the caption and its input to appear, in ms. Default: 15000. */
  timeout?: number;
}

/**
 * Drives native text inputs that no MobileWright locator can resolve.
 *
 * `Screen` and `Locator` query mobilecli's *processed* dump (`device.dump.ui`), which discards
 * every node whose text, content-desc and resource-id are all empty. An empty Flutter text field
 * is exactly that — `<android.widget.EditText text="" content-desc="" resource-id="">` — so it is
 * missing from the tree the query engine sees until it already holds a value. That is why
 * `getByRole('textfield')`, `getByType('android.widget.EditText')` and any chain from the caption
 * all fail: there is no node to match, and none to chain to. The MobileWright Inspector reads the
 * *raw* tree, where the node still exists, which is why the locators it suggests cannot work at
 * runtime.
 *
 * The same RPC does return the unfiltered tree when asked for `format: 'raw'`. This helper anchors
 * on the field's caption — which is a normal, locatable node — then reads the input's real bounds
 * out of the raw tree and taps it. Every coordinate is read live from the device on each run, so
 * there are no hard-coded sizes, offsets or gap calculations, and the same code works on any
 * screen size, density or orientation.
 */
export class NativeTextInput {
  constructor(private readonly device: Device) {}

  /**
   * Focuses the text input directly below `caption` and types `value` into it.
   *
   * The caption is resolved with an ordinary locator, so callers keep using readable anchors such
   * as `screen.getByLabel('Enter registered email')`.
   */
  async fillBelow(caption: Locator, value: string, options: FillNativeInputOptions = {}): Promise<void> {
    const timeout = options.timeout ?? 15_000;
    const captionBox = await caption.boundingBox({ timeout });
    const field = await this.waitForInputBelow(captionBox, timeout);

    await this.tapCenter(field);
    await this.waitForFocus(field, timeout);
    await this.device.driver.typeText(value);
    await this.verifyValue(field, value, options.obscured === true, timeout);
  }

  /** Taps the middle of the input's own live bounds — the same point `Locator.tap()` would use. */
  private async tapCenter(field: RawNode): Promise<void> {
    await this.device.driver.tap(field.rect.x + field.rect.width / 2, field.rect.y + field.rect.height / 2);
  }

  /**
   * Polls the raw tree until an input appears below the caption, and returns it.
   *
   * "Below" means the input starts under the caption's bottom edge and overlaps it horizontally,
   * which is what visually ties a caption to its field. The nearest such input wins, so stacked
   * fields each resolve to their own caption.
   */
  private async waitForInputBelow(captionBox: RawRect, timeout: number): Promise<RawNode> {
    const field = await this.poll(timeout, async () => {
      const inputs = this.collectInputs(await this.rawTree());
      const below = inputs
        .filter((node) => node.rect.y >= captionBox.y + captionBox.height)
        .filter((node) => horizontallyOverlaps(node.rect, captionBox))
        .sort((a, b) => a.rect.y - b.rect.y);
      return below[0];
    });

    if (!field) {
      throw new Error(
        `No text input found below the caption at ${JSON.stringify(captionBox)}. ` +
          'The caption resolved, but no editable field sits beneath it in the raw view tree.',
      );
    }

    return field;
  }

  /** Confirms the tap landed, so text is never sent to whatever else holds focus. */
  private async waitForFocus(field: RawNode, timeout: number): Promise<void> {
    const focused = await this.poll(timeout, async () => {
      const match = this.findByRect(await this.rawTree(), field.rect);
      return match?.focused === true ? match : undefined;
    });

    if (!focused) {
      throw new Error(`Tapped the text input at ${JSON.stringify(field.rect)} but it never took focus.`);
    }
  }

  /**
   * Reads the value back off the device.
   *
   * An obscured field reports a mask (e.g. `••••••••••`) rather than the characters typed, so its
   * length is compared instead of its content.
   */
  private async verifyValue(field: RawNode, value: string, obscured: boolean, timeout: number): Promise<void> {
    const matched = await this.poll(timeout, async () => {
      const node = this.findByRect(await this.rawTree(), field.rect);
      const actual = node?.text ?? '';
      if (obscured && isMasked(actual, value)) {
        return actual.length === value.length ? node : undefined;
      }
      return actual === value ? node : undefined;
    });

    if (!matched) {
      const node = this.findByRect(await this.rawTree(), field.rect);
      const actual = node?.text ?? '';
      const reported = obscured ? `${actual.length} characters` : JSON.stringify(actual);
      throw new Error(`Text input did not accept the value. Expected ${describe(value, obscured)}, got ${reported}.`);
    }
  }

  /** Fetches the unfiltered view tree over the driver's existing RPC connection. */
  private async rawTree(): Promise<RawNode[]> {
    const session = (this.device.driver as unknown as DriverWithSession).session;

    if (!session) {
      throw new Error('MobileWright driver has no active session, so the raw view tree cannot be read.');
    }

    const result = await session.rpc.call<{ rawData: string }>('device.dump.ui', {
      deviceId: session.deviceId,
      format: 'raw',
    });

    const parsed = JSON.parse(result.rawData) as { hierarchy?: RawNode[] };
    return parsed.hierarchy ?? [];
  }

  private collectInputs(nodes: RawNode[]): RawNode[] {
    const inputs: RawNode[] = [];
    walk(nodes, (node) => {
      const isInput = TEXT_INPUT_TYPES.has(node.class.toLowerCase());
      const hasArea = node.rect.width > 0 && node.rect.height > 0;
      if (isInput && hasArea && node.visible !== false) {
        inputs.push(node);
      }
    });
    return inputs;
  }

  /** Re-locates a node across dumps by its bounds, which stay stable while the layout does. */
  private findByRect(nodes: RawNode[], rect: RawRect): RawNode | undefined {
    let match: RawNode | undefined;
    walk(nodes, (node) => {
      if (!match && sameRect(node.rect, rect)) {
        match = node;
      }
    });
    return match;
  }

  private async poll<T>(timeout: number, attempt: () => Promise<T | undefined>): Promise<T | undefined> {
    const deadline = Date.now() + timeout;

    for (;;) {
      const result = await attempt();
      if (result !== undefined) {
        return result;
      }
      if (Date.now() >= deadline) {
        return undefined;
      }
      await new Promise((resolve) => setTimeout(resolve, 300));
    }
  }
}

function walk(nodes: RawNode[], visit: (node: RawNode) => void): void {
  for (const node of nodes) {
    visit(node);
    walk(node.children ?? [], visit);
  }
}

function horizontallyOverlaps(a: RawRect, b: RawRect): boolean {
  return a.x < b.x + b.width && b.x < a.x + a.width;
}

function sameRect(a: RawRect, b: RawRect): boolean {
  return a.x === b.x && a.y === b.y && a.width === b.width && a.height === b.height;
}

/** True when the field reports a uniform mask instead of the characters that were typed. */
function isMasked(actual: string, value: string): boolean {
  return actual.length > 0 && actual !== value && /^(.)\1*$/.test(actual);
}

function describe(value: string, obscured: boolean): string {
  return obscured ? `${value.length} characters` : JSON.stringify(value);
}

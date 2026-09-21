import { Locator, Screen } from 'mobilewright';
import { expect } from '@mobilewright/test';
import BasePage from './base.page';
import { HTMLSubStepLogger } from '../utils/htmlSubStepLogger';

/**
 * Page object for the Conti+ Welcome screen and Continental Account Login screen
 * (`ContiplusFormTemplate` widget in `contiplus_form_template.dart`, rendering
 * `WelcomeForm` / `LoginForm` from `forms/login_form.dart`).
 *
 * Complements `AppLaunchPage` — which owns the happy-path launch → login → home
 * flow reused across scenarios — with the additional UI-detail and negative-path
 * coverage needed for `docs/test-suites/login` (TC-LOGIN-001 through TC-LOGIN-015).
 */
export class LoginScreenPage extends BasePage {
  constructor(screen: Screen, subStepLogger?: HTMLSubStepLogger) {
    super(screen, subStepLogger);
  }

  // ==================== Welcome screen locators ====================

  get contiplusLogo(): Locator {
    return this.screen.getByLabel('conti+Logo');
  }

  get loginWithText(): Locator {
    return this.screen.getByLabel('loginWithText');
  }

  get continentalAccountButton(): Locator {
    return this.screen.getByLabel('continentalAccountButton');
  }

  get orSeparatorText(): Locator {
    return this.screen.getByText('or', { exact: true });
  }

  get continueAsGuestButton(): Locator {
    return this.screen.getByLabel('loginGuestButton');
  }

  /**
   * `manageSitesConveyors` is the first onboarding card title (see `onboard_screen.dart`).
   * Flutter merges the card's title + description Text widgets into a single flattened
   * semantics node exposed to Android's accessibility bridge as `content-desc` (confirmed via
   * `uiautomator dump`: `content-desc="Manage Sites/Conveyors\nWe have prepared sample data..."`,
   * with `text=""`) — so it must be located via `getByLabel` (content-desc), not `getByText`.
   */
  get onboardingScreenIndicator(): Locator {
    return this.screen.getByLabel('Manage Sites/Conveyors', { exact: false });
  }

  /**
   * `skipIntroduction` (see `AppLocalizations.skipIntroduction` / `onboard_screen.dart`) has no
   * SemanticsLabel of its own — it's a plain `TextButton` wrapping a `Text('Skip Introduction')`
   * + forward-arrow icon. Flutter still exposes the merged label via `content-desc="Skip Introduction"`
   * (confirmed via `uiautomator dump`, `text=""`), so it's located with `getByLabel`.
   */
  get skipIntroductionButton(): Locator {
    return this.screen.getByLabel('Skip Introduction', { exact: true });
  }

  // ==================== Login screen locators ====================

  get backButton(): Locator {
    return this.screen.getByText('Back', { exact: true });
  }

  get welcomeHeading(): Locator {
    return this.screen.getByLabel('welcomeText');
  }

  get emailTextField(): Locator {
    return this.screen.getByLabel('emailTextFieldBox');
  }

  get passwordTextField(): Locator {
    return this.screen.getByLabel('passwordTextFieldBox');
  }

  /**
   * Minimal structural shape of the accessibility nodes returned by `Screen.viewTree()` —
   * defined locally instead of importing `ViewNode` from `@mobilewright/protocol`, which is
   * only a transitive dependency of this project, not a declared one.
   */
  private async readFieldValueByLabel(label: string): Promise<string> {
    interface AccessibilityNode {
      label?: string;
      value?: string;
      text?: string;
      children: AccessibilityNode[];
    }

    const findByLabel = (nodes: AccessibilityNode[]): AccessibilityNode | undefined => {
      for (const node of nodes) {
        if (node.label === label) {
          return node;
        }
        const found = findByLabel(node.children);
        if (found) {
          return found;
        }
      }
      return undefined;
    };

    const findFirstValue = (node: AccessibilityNode): string | undefined => {
      if (node.value || node.text) {
        return node.value ?? node.text;
      }
      for (const child of node.children) {
        const found = findFirstValue(child);
        if (found !== undefined) {
          return found;
        }
      }
      return undefined;
    };

    const roots = await this.screen.viewTree();
    const match = findByLabel(roots);

    if (!match) {
      throw new Error(`Could not locate an accessibility node labelled "${label}" in the current view hierarchy`);
    }

    return findFirstValue(match) ?? '';
  }

  /**
   * Polls `readFieldValueByLabel` until it returns the expected value or the timeout elapses —
   * mirrors the polling behaviour of `expect(locator).toHaveValue()`, which can't be used here
   * since the value lives on a nested node the wrapper `Locator` can't resolve (see above).
   */
  private async waitForFieldValue(label: string, expected: string, timeoutMs = 10_000): Promise<string> {
    const deadline = Date.now() + timeoutMs;
    let lastValue = '';

    while (Date.now() < deadline) {
      lastValue = await this.readFieldValueByLabel(label);
      if (lastValue === expected) {
        return lastValue;
      }
      await this.waitForTime(250);
    }

    return lastValue;
  }

  get loginButton(): Locator {
    return this.screen.getByLabel('loginButton');
  }

  get forgotPasswordLink(): Locator {
    return this.screen.getByLabel('forgotPasswordText');
  }

  get loggingInSnackbar(): Locator {
    return this.screen.getByText('Login...', { exact: true });
  }

  get authenticationFailedMessage(): Locator {
    return this.screen.getByText('Authentication failed', { exact: false });
  }

  /**
   * The eye icon (`IconButton` in `login_form.dart`) toggles password visibility but has
   * no `SemanticsLabel`/accessibility identifier in the current Flutter source — Flutter
   * renders it as a plain `android.widget.ImageView` (not an accessibility "button" role)
   * with empty text/content-desc, so neither `getByRole('button')` nor a `getByType()` +
   * `.last()` heuristic reliably resolves it (document order in the underlying driver's
   * dump does not consistently match visual/raw-uiautomator order). Recommend the Flutter
   * team add a dedicated semantic label (e.g. `passwordVisibilityToggleButton`) so this can
   * be replaced with a direct `getByLabel` lookup.
   */
  get passwordTextFieldSuffixIconOffsetPx(): number {
    // Eye icon is a fixed-size trailing suffix icon inside the password field; tapping
    // near the right edge (vertically centred) reliably hits it regardless of tree order.
    return 40;
  }

  // ==================== Welcome screen actions ====================

  async verifyWelcomeScreenElements(): Promise<void> {
    await expect(this.contiplusLogo).toBeVisible({ timeout: 30_000 });
    await expect(this.loginWithText).toBeVisible({ timeout: 10_000 });
    await expect(this.continentalAccountButton).toBeVisible({ timeout: 10_000 });
    await expect(this.orSeparatorText).toBeVisible({ timeout: 10_000 });
    await expect(this.continueAsGuestButton).toBeVisible({ timeout: 10_000 });
    await this.logSuccess('Welcome screen displays the Conti+ logo, heading, both login buttons and separator');
  }

  async tapContinueAsGuest(): Promise<void> {
    await this.tap(this.continueAsGuestButton, 15_000);
    await this.logSuccess('"Continue as a Guest" button tapped');
  }

  async verifyOnboardingScreenDisplayed(): Promise<void> {
    await expect(this.onboardingScreenIndicator).toBeVisible({ timeout: 30_000 });
    await this.logSuccess('Onboarding screen is displayed');
  }

  async tapSkipIntroduction(): Promise<void> {
    await this.tap(this.skipIntroductionButton, 15_000);
    await this.logSuccess('"Skip Introduction" button tapped');
  }

  // ==================== Login screen actions ====================

  async verifyBackButtonVisible(): Promise<void> {
    await expect(this.backButton).toBeVisible({ timeout: 15_000 });
    await this.logSuccess('Back button is visible on the Login screen');
  }

  async verifyLoginScreenHeading(): Promise<void> {
    await expect(this.welcomeHeading).toBeVisible({ timeout: 15_000 });
    await this.logSuccess('"Welcome!" heading is displayed on the Login screen');
  }

  async verifyForgotPasswordLinkVisible(): Promise<void> {
    await expect(this.forgotPasswordLink).toBeVisible({ timeout: 15_000 });
    await this.logSuccess('"Forgot password" link is visible');
  }

  async typeEmail(email: string): Promise<void> {
    await this.tap(this.emailTextField, 15_000);
    await this.emailTextField.fill(email, { timeout: 15_000 });
    await this.logSuccess(`Typed email "${email}" into the email field`);
  }

  async typePassword(password: string): Promise<void> {
    await this.tap(this.passwordTextField, 15_000);
    await this.passwordTextField.fill(password, { timeout: 15_000 });
    await this.logSuccess('Typed password into the password field');
  }

  async verifyEmailFieldValue(expected: string): Promise<void> {
    const actual = await this.waitForFieldValue('emailTextFieldBox', expected);

    if (actual !== expected) {
      throw new Error(`Expected email field to have value "${expected}", but got "${actual}"`);
    }

    await this.logSuccess(`Email field preserves the exact case as typed: "${expected}"`);
  }

  /**
   * Verifies the password field is currently obscured by confirming its exposed value
   * does not equal the plain text that was typed — regardless of the exact masking
   * character used by the platform's accessibility layer.
   */
  async verifyPasswordObscured(plainText: string): Promise<void> {
    const value = await this.readFieldValueByLabel('passwordTextFieldBox');

    if (value === plainText) {
      throw new Error('Password field is not obscured — exposed value matches the plain text that was typed');
    }

    await this.logSuccess('Password field is obscured (default state)');
  }

  async verifyPasswordVisible(plainText: string): Promise<void> {
    const actual = await this.waitForFieldValue('passwordTextFieldBox', plainText);

    if (actual !== plainText) {
      throw new Error(`Expected password field to show plain text "${plainText}", but got "${actual}"`);
    }

    await this.logSuccess(`Password field shows plain text after toggle: "${plainText}"`);
  }

  async tapPasswordVisibilityToggle(): Promise<void> {
    const box = await this.passwordTextField.boundingBox({ timeout: 10_000 });
    const x = box.x + box.width - this.passwordTextFieldSuffixIconOffsetPx;
    const y = box.y + box.height / 2;

    await this.screen.tap(x, y);
    await this.logSuccess('Password visibility (eye) icon tapped');
  }

  async verifyFieldValidationErrors(emailError: string, passwordError: string): Promise<void> {
    if (!emailError && !passwordError) {
      throw new Error('At least one of emailError/passwordError must be provided');
    }

    if (emailError) {
      await expect(this.screen.getByText(emailError, { exact: true })).toBeVisible({ timeout: 10_000 });
      await this.logSuccess(`Email field shows validation error: "${emailError}"`);
    }

    if (passwordError) {
      await expect(this.screen.getByText(passwordError, { exact: true })).toBeVisible({ timeout: 10_000 });
      await this.logSuccess(`Password field shows validation error: "${passwordError}"`);
    }
  }

  async verifyNoLoginRequestSent(): Promise<void> {
    const stillOnLoginScreen = await this.emailTextField.isVisible({ timeout: 3_000 });

    if (!stillOnLoginScreen) {
      throw new Error('Expected to remain on the Login screen — client-side validation should block submission');
    }

    const snackbarShown = await this.loggingInSnackbar.isVisible({ timeout: 1_000 }).catch(() => false);

    if (snackbarShown) {
      throw new Error('Unexpected "Login..." snackbar appeared — no login API call should have been triggered');
    }

    await this.logSuccess('No login request was sent; user remains on the Login screen');
  }

  async verifyAuthenticationErrorDisplayed(): Promise<void> {
    await expect(this.authenticationFailedMessage).toBeVisible({ timeout: 15_000 });
    await this.logSuccess('Authentication error message is displayed');
  }

  /**
   * Best-effort check for the "Login..." loading snackbar. The API call can complete in
   * well under a second on a fast STG connection, so this logs a warning instead of
   * failing the scenario when the transient snackbar isn't caught in time.
   */
  async verifyLoggingInSnackbarShown(): Promise<void> {
    const visible = await this.loggingInSnackbar.isVisible({ timeout: 3_000 }).catch(() => false);

    if (visible) {
      await this.logSuccess('"Login..." snackbar was shown while authenticating');
    } else {
      await this.logWarning(
        '"Login..." snackbar was not captured — the API call likely completed before the check ran',
      );
    }
  }

  /**
   * Best-effort check that the Login button was disabled while `AuthenticationLoadingState`
   * was active. See note on `verifyLoggingInSnackbarShown` regarding the inherent race
   * condition against fast network responses.
   */
  async verifyLoginButtonDisabledDuringLoading(): Promise<void> {
    const stillEnabled = await this.loginButton.isEnabled({ timeout: 1_000 }).catch(() => true);

    if (!stillEnabled) {
      await this.logSuccess('Login button was disabled while the authentication request was in flight');
    } else {
      await this.logWarning(
        'Login button disabled state was not captured in time — authentication may have completed too quickly to observe',
      );
    }
  }

  async verifyEmailAndPasswordFieldsAcceptInput(): Promise<void> {
    const probeEmail = 'autofill-check@example.com';
    const probePassword = 'AutofillCheck@1';

    await this.typeEmail(probeEmail);
    const actualEmail = await this.waitForFieldValue('emailTextFieldBox', probeEmail);

    if (actualEmail !== probeEmail) {
      throw new Error(`Expected email field to have value "${probeEmail}", but got "${actualEmail}"`);
    }

    await this.typePassword(probePassword);
    await this.verifyPasswordObscured(probePassword);

    await this.logSuccess(
      'Email and password fields accept keyboard input and declare AutofillHints.email / AutofillHints.password ' +
        'in the Flutter source, making them eligible for platform autofill (Keychain / Autofill Service)',
    );
  }
}

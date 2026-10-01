import { Device, Locator, Screen } from 'mobilewright';
import { expect } from '@mobilewright/test';
import { HTMLSubStepLogger } from '../utils/htmlSubStepLogger';
import BasePage from './base.page';

export class AppLaunchPage extends BasePage {
  constructor(
    screen: Screen,
    private readonly device: Device,
    private readonly bundleId: string | undefined,
    private readonly installApps: string | string[] | undefined,
    subStepLogger?: HTMLSubStepLogger,
    private readonly platform?: 'ios' | 'android',
  ) {
    super(screen, subStepLogger);
  }

  get loginWithText(): Locator {
    return this.screen
      .getByLabel('loginWithText')
      .or(this.screen.getByTestId('loginWithText'))
      .or(this.screen.getByText(/Login with/i))
      .or(this.screen.getByLabel('Login with', { exact: false }));
  }

  get continentalAccountButton(): Locator {
    return this.screen
      .getByLabel('continentalAccountButton')
      .or(this.screen.getByTestId('continentalAccountButton'))
      .or(this.screen.getByRole('button', { name: /Continental Account/i }))
      .or(this.screen.getByText('Continental Account', { exact: false }))
      .or(this.screen.getByLabel('Continental Account', { exact: false }));
  }

  get emailTextField(): Locator {
    return this.screen
      .getByLabel('emailTextFieldBox')
      .or(this.screen.getByTestId('emailTextFieldBox'))
      .or(this.screen.getByType('TextField').nth(0))
      .or(this.screen.getByType('XCUIElementTypeTextField').nth(0));
  }

  get passwordTextField(): Locator {
    return this.screen
      .getByLabel('passwordTextFieldBox')
      .or(this.screen.getByTestId('passwordTextFieldBox'))
      .or(this.screen.getByType('TextField').nth(1))
      .or(this.screen.getByType('XCUIElementTypeTextField').nth(1))
      .or(this.screen.getByType('SecureTextField'))
      .or(this.screen.getByType('XCUIElementTypeSecureTextField'));
  }

  get loginButton(): Locator {
    return this.screen
      .getByLabel('loginButton')
      .or(this.screen.getByTestId('loginButton'))
      .or(this.screen.getByRole('button', { name: /Log ?in/i }))
      .or(this.screen.getByText(/^Log ?in$/i))
      .or(this.screen.getByLabel('Login', { exact: false }))
      .or(this.screen.getByText('Login', { exact: false }));
  }

  get postLoginIndicatorCandidates(): Locator[] {
    return [
      // Flutter semantic identifiers. Android exposes these as content-desc, but iOS does not
      // surface them at all, so they cannot be the only anchors for the Home screen.
      this.screen.getByLabel('homeTab'),
      this.screen.getByLabel('conveyorTab'),
      this.screen.getByLabel('corporatesTab'),
      this.screen.getByLabel('toolsTab'),
      this.screen.getByLabel('inspectionsTab'),
      this.screen.getByTestId('homeTab'),
      this.screen.getByTestId('conveyorTab'),
      this.screen.getByLabel('lastUpdatedTimeHomeScreen'),
      // Visible dashboard captions. getByText falls back to the accessibility label, which is all
      // iOS exposes for these nodes, so these anchors work on both platforms. They only ever
      // render once the Home dashboard is loaded, so they cannot match before login.
      this.screen.getByText('Conveyors', { exact: true }),
      this.screen.getByText('Inspections', { exact: true }),
      this.screen.getByText('Belt Scans', { exact: true }),
      this.screen.getByText('Cover Wear', { exact: true }),
      this.screen.getByText('Conveyor Inspect', { exact: true }),
    ];
  }

  get homeContentCandidates(): Locator[] {
    return [
      this.screen.getByLabel('lastUpdatedTimeHomeScreen'),
      this.screen.getByLabel('siteCard'),
      this.screen.getByLabel('conveyorCard'),
      this.screen.getByLabel('coverWearCard'),
      this.screen.getByLabel('inspectionCard'),
      this.screen.getByLabel('conveyorInspectCard'),
      this.screen.getByLabel('beltScanCard'),
      this.screen.getByLabel('monitoringDeviceCard'),
      this.screen.getByLabel('heavyEquipmentCard'),
      this.screen.getByLabel('minutemanCalculationCard'),
      this.screen.getByTestId('siteCard'),
      this.screen.getByTestId('conveyorCard'),
      this.screen.getByText(/CONVEYORS/i),
      this.screen.getByText(/SITES/i),
      this.screen.getByText(/Conveyor/i),
      this.screen.getByText(/Site/i),
      this.screen.getByLabel('CONVEYORS', { exact: false }),
      this.screen.getByLabel('SITES', { exact: false }),
    ];
  }

  get functionButtonCandidates(): Locator[] {
    return [
      this.screen.getByText('Function', { exact: false }),
      this.screen.getByText('FUNCTION', { exact: false }),
      this.screen.getByLabel('Function', { exact: false }),
      this.screen.getByLabel('FUNCTION', { exact: false }),
      this.screen.getByText(/Function/i),
      this.screen.getByRole('button', { name: /Function/i }),
    ];
  }

  /**
   * Buttons that dismiss an iOS native system permission alert by granting it.
   *
   * These alerts are owned by the OS, not by the Conti+ app, and only appear on a fresh install.
   * Confirmed live on the iPhone 15 simulator, where the App Tracking Transparency prompt exposes:
   *   Button label="Allow"                b=[61,528,270,44]
   *   Button label="Ask App Not to Track" b=[61,483,270,44]
   *
   * Matching must be exact: the alert body is a StaticText beginning with
   * 'Allow "Conti+ 2.0" to track your activity...', so a contains-match on 'Allow' would
   * resolve to the non-tappable message instead of the button.
   */
  get systemPermissionAllowCandidates(): Locator[] {
    return [
      this.screen.getByLabel('Allow', { exact: true }),
      this.screen.getByLabel('Allow While Using App', { exact: true }),
      this.screen.getByLabel('Allow Once', { exact: true }),
      this.screen.getByLabel('OK', { exact: true }),
    ];
  }

  get acceptAllButtonCandidates(): Locator[] {
    return [
      // getByText matches node.text, falling back to the accessibility label, so this single
      // locator covers the Android button caption and the iOS accessibility label alike.
      this.screen.getByText('Accept all', { exact: false }),
      // Explicit accessibility label match, for platforms exposing only a label.
      this.screen.getByLabel('Accept all', { exact: false }),
      // Consent manager widget id: the Android resource-id and the iOS accessibility identifier
      // both come from the same WebView markup, so this fallback is identical on both platforms.
      this.screen.getByTestId('cmpwelcomebtnyes'),
    ];
  }

  get laterButtonCandidates(): Locator[] {
    return [
      this.screen.getByText('LATER', { exact: true }),
      this.screen.getByText('Later', { exact: true }),
      this.screen.getByText('LATER', { exact: false }),
      this.screen.getByText('Later', { exact: false }),
      this.screen.getByLabel('LATER', { exact: false }),
      this.screen.getByLabel('Later', { exact: false }),
      this.screen.getByLabel('laterButton', { exact: false }),
      this.screen.getByLabel('later', { exact: false }),
      this.screen.getByText('NOT NOW', { exact: false }),
      this.screen.getByText('Not Now', { exact: false }),
      this.screen.getByLabel('Not now', { exact: false }),
      this.screen.getByText('CANCEL', { exact: false }),
      this.screen.getByText('Cancel', { exact: false }),
      this.screen.getByText('SKIP', { exact: false }),
      this.screen.getByText('Skip', { exact: false }),
      this.screen.getByRole('button', { name: 'LATER' }),
      this.screen.getByRole('button', { name: 'Later' }),
      this.screen.getByType('android.widget.Button').filter({ hasText: 'LATER' }),
      this.screen.getByType('android.widget.Button').filter({ hasText: 'Later' }),
      this.screen.getByType('XCUIElementTypeButton').filter({ hasText: 'LATER' }),
      this.screen.getByType('XCUIElementTypeButton').filter({ hasText: 'Later' }),
    ];
  }

  async launchApp(): Promise<void> {
    if (!this.bundleId) {
      throw new Error('Missing MobileWright bundleId. Set ANDROID_PACKAGE or IOS_BUNDLE_ID before running the test.');
    }

    await this.freshInstallApp();

    if (this.platform === 'ios') {
      // On a fresh install iOS shows the App Tracking Transparency alert on top of the app. That
      // alert owns the foreground, so MobileWright's post-launch foreground check never passes and
      // launchApp throws. Skip that check, clear the alert, then let waitForAppLoaded() confirm the
      // app is genuinely up. Android raises no such alert, so it keeps the default verified launch.
      await this.device.launchApp(this.bundleId, { noWaitAfter: true });
      await this.handleSystemPermissionPrompts();
    } else {
      await this.device.launchApp(this.bundleId);
    }

    await this.logSuccess(`Fresh app launched: ${this.bundleId}`);
  }

  /**
   * Grants any iOS native system permission alerts raised immediately after a fresh launch.
   *
   * Android is a no-op: the Conti+ Android build raises no runtime permission dialog at launch,
   * and skipping the probe avoids spending a UI dump (~1.6s on a real device) on every run.
   *
   * Several alerts can queue up (e.g. tracking, then notifications), so this drains them in a
   * loop. Every step is best-effort — a missing alert is the normal case once the OS has already
   * recorded a decision, so it must never fail the launch.
   */
  async handleSystemPermissionPrompts(): Promise<void> {
    if (this.platform !== 'ios') {
      return;
    }

    const maxPrompts = 3;

    for (let attempt = 0; attempt < maxPrompts; attempt++) {
      // The first alert can lag behind launch on a cold install; later ones queue up instantly.
      const timeout = attempt === 0 ? 15_000 : 3_000;
      const allowButton = await this.findFirstVisible(this.systemPermissionAllowCandidates, timeout);

      if (!allowButton) {
        if (attempt === 0) {
          await this.logInfo('No iOS system permission alert appeared');
        }
        return;
      }

      try {
        const label = await allowButton.getText().catch(() => 'Allow');
        await allowButton.tap({ timeout: 10_000 });
        await this.waitForTime(1500);
        await this.logSuccess(`Dismissed iOS system permission alert via "${label}"`);
      } catch {
        await this.logWarning('iOS system permission alert disappeared before it could be tapped');
        return;
      }
    }
  }

  async waitForAppLoaded(): Promise<void> {
    await this.logInfo('Waiting for Conti+ app to finish loading');
    await this.waitForAnyVisible(
      [
        this.loginWithText,
        this.continentalAccountButton,
        this.emailTextField,
        this.passwordTextField,
        ...this.acceptAllButtonCandidates,
        ...this.postLoginIndicatorCandidates,
        ...this.homeContentCandidates,
      ],
      60_000,
    );
    await this.logSuccess('Conti+ app finished loading');
  }

  async acceptAllConsentOptions(): Promise<void> {
    if (await this.isWelcomeScreenDisplayed()) {
      await this.logWarning('Accept all button was not displayed; continuing from the Welcome screen');
      return;
    }

    if (await this.isLoginFormDisplayed()) {
      await this.logWarning('Accept all button was not displayed; continuing from the Login screen');
      return;
    }

    if (await this.isLoggedIn()) {
      await this.logWarning('Accept all button was not displayed; user is already logged in');
      return;
    }

    await this.logInfo('Checking for consent screen / Accept all button');

    // "Accept all" always sits below the fold of the scrollable consent dialog, where it is
    // reported as a thin clipped sliver at the bottom edge of the screen. Scroll to the end of
    // the dialog first so the tap lands on the fully laid out button.
    const acceptAllButton = await this.scrollToEndAndFind(this.acceptAllButtonCandidates, {
      maxSwipes: 10,
      direction: 'up',
      duration: 300,
    });

    if (!acceptAllButton) {
      await this.waitForWelcomeScreen();
      await this.logWarning('Accept all button was not displayed; continuing from the Welcome screen');
      return;
    }

    await this.logInfo('Consent dialog scrolled to the end, tapping Accept all');
    await this.tap(acceptAllButton, 10_000);
    await this.waitForTime(3000);
    await this.logSuccess('Accepted all consent options');
  }

  async waitForWelcomeScreen(): Promise<void> {
    if (await this.isLoginFormDisplayed()) {
      await this.logSuccess('Login screen is already displayed');
      return;
    }

    if (await this.isLoggedIn()) {
      await this.logSuccess('User is already logged in');
      return;
    }

    await expect(this.loginWithText).toBeVisible({ timeout: 30_000 });
    await expect(this.continentalAccountButton).toBeVisible({ timeout: 30_000 });
    await this.logSuccess('Welcome screen is displayed');
  }

  async openContinentalAccountLogin(): Promise<void> {
    if (await this.isLoginFormDisplayed()) {
      await this.logSuccess('Continental Account login is already open');
      return;
    }

    await this.tap(this.continentalAccountButton, 15_000);
    await this.logSuccess('Continental Account login opened');
  }

  async verifyLoginFieldsDisplayed(): Promise<void> {
    await expect(this.emailTextField).toBeVisible({ timeout: 30_000 });
    await expect(this.passwordTextField).toBeVisible({ timeout: 30_000 });
    await this.logSuccess('Email and password fields are displayed');
  }

  async dismissKeyboard(): Promise<void> {
    try {
      const welcomeHeader = this.screen.getByText('Welcome!').or(this.screen.getByText(/Welcome/i));
      const isHeaderVisible = await welcomeHeader.isVisible({ timeout: 1000 }).catch(() => false);
      if (isHeaderVisible) {
        await welcomeHeader.tap({ timeout: 2000 }).catch(() => {});
      } else {
        await this.screen.tap(200, 150).catch(() => {});
      }
    } catch {
      // Ignore if dismiss fails
    }
    await this.waitForTime(500);
  }

  async provideCredentials(username: string, password: string): Promise<void> {
    await this.focusThenFill(this.emailTextField, username);
    await this.focusThenFill(this.passwordTextField, password);
    await this.dismissKeyboard();
    await this.logSuccess(`Credentials entered for ${username}`);
  }

  async clickLoginButton(): Promise<void> {
    await this.dismissKeyboard();
    await this.tap(this.loginButton, 15_000);
    await this.logSuccess('Login button clicked');
    // Ensure tap is registered and retry once if still on login form after 3s
    await this.waitForTime(3000);
    const stillOnLoginForm = await this.findFirstVisible([this.loginButton], 1000);
    if (stillOnLoginForm) {
      await this.dismissKeyboard();
      await this.tap(this.loginButton, 5_000).catch(() => {});
    }
  }

  async verifyLoggedInSuccessfully(): Promise<void> {
    await this.logInfo('Waiting for login to complete or Update App popup to appear');
    await this.waitForAnyVisible(
      [...this.postLoginIndicatorCandidates, ...this.laterButtonCandidates],
      90_000,
      'Neither Home screen nor Update App popup became visible after login',
    );
    await this.logSuccess('User login transition detected');
  }

  async waitForHomeScreenToLoadCompletely(): Promise<void> {
    await this.logInfo('Waiting for Home screen data to finish loading');
    // First login loads the full dashboard data set, which can take a few minutes on a real device.
    await this.waitForHomeShellDisplayed(240_000);

    // The last-updated stamp is an Android-only semantic label; iOS renders the timestamp as plain
    // text. Probe it briefly as a bonus signal, then fall back to the dashboard content.
    const lastUpdated = await this.findFirstVisible([this.screen.getByLabel('lastUpdatedTimeHomeScreen')], 10_000);

    if (lastUpdated) {
      await this.logSuccess('Home screen data loaded completely');
      return;
    }

    await this.waitForAnyVisible(this.homeContentCandidates, 30_000, 'Home screen content did not become visible');
    await this.logWarning('Home screen loaded without a last-updated timestamp for this user');
  }

  async clickLaterInUpdateAppPopup(): Promise<void> {
    await this.logInfo('Checking for Update App popup');

    const deadline = Date.now() + 20_000;
    let popupDismissed = false;

    while (Date.now() < deadline && !popupDismissed) {
      const visibleCandidate = await this.findFirstVisible(this.laterButtonCandidates, 1500);

      if (visibleCandidate) {
        await this.logInfo('Found Later button in Update App popup, attempting tap');
        await this.waitForTime(300);

        for (let attempt = 1; attempt <= 3; attempt++) {
          try {
            await visibleCandidate.tap({ timeout: 5000 });
            await this.logSuccess(`Tapped Later button (attempt ${attempt})`);
          } catch (tapErr) {
            await this.logWarning(`Tap failed on attempt ${attempt}: ${tapErr}`);
          }

          await this.waitForTime(500);

          const stillVisible = await visibleCandidate.waitFor({ state: 'visible', timeout: 500 }).then(
            () => true,
            () => false,
          );

          if (!stillVisible) {
            popupDismissed = true;
            await this.logSuccess('Update App popup dismissed successfully');
            break;
          }
        }

        if (popupDismissed) break;
      }

      // Check if home screen content is already visible and no popup is blocking
      const isHomeVisible = await this.findFirstVisible(this.postLoginIndicatorCandidates, 500);
      if (isHomeVisible && !visibleCandidate) {
        await this.logInfo('Home navigation is visible with no popup detected');
        break;
      }
    }

    if (!popupDismissed) {
      await this.logWarning('Update App popup was not displayed or already dismissed; continuing with flow');
    }
  }

  async verifyHomeScreenDisplayed(): Promise<void> {
    await this.waitForHomeShellDisplayed(120_000);
    await this.waitForAnyVisible(this.homeContentCandidates, 30_000, 'Home screen content did not become visible');
    await this.logSuccess('Home screen is displayed');
  }

  async verifyAppIsForeground(): Promise<void> {
    if (!this.bundleId) {
      throw new Error('Missing MobileWright bundleId. Set ANDROID_PACKAGE or IOS_BUNDLE_ID before running the test.');
    }

    const foregroundApp = await this.device.getForegroundApp();
    expect(foregroundApp.bundleId).toBe(this.bundleId);
    await this.logSuccess(`App is running in foreground: ${foregroundApp.bundleId}`);
  }

  private async waitForAnyVisible(locators: Locator[], timeout: number, errorMessage?: string): Promise<void> {
    // A combined locator is resolved against a single view-hierarchy dump per poll, instead of one
    // dump per candidate. That keeps long candidate lists cheap and avoids missing an element that
    // appears while the remaining candidates are still being checked one by one.
    try {
      await this.anyOf(locators).waitFor({ state: 'visible', timeout });
    } catch {
      throw new Error(errorMessage ?? `No expected Conti+ UI element became visible within ${timeout}ms`);
    }
  }

  private async waitForHomeShellDisplayed(timeout: number): Promise<void> {
    // The Home screen fetches a large data set on first login and can take several minutes to
    // render. Poll the candidates as a single combined locator so each cycle costs one view
    // hierarchy dump instead of one per candidate, and the tabs are detected as soon as they appear.
    const homeShell = this.anyOf(this.postLoginIndicatorCandidates);

    try {
      await homeShell.waitFor({ state: 'visible', timeout });
    } catch {
      throw new Error(`Home navigation did not become visible within ${timeout}ms`);
    }
  }

  private async focusThenFill(locator: Locator, value: string): Promise<void> {
    await this.tap(locator, 15_000);
    await this.waitForTime(500);

    if (!value) {
      // Underlying driver RPC (`typeText`) rejects an empty string with "text is required".
      // Fields start empty by default, so there is nothing to type — leave the field blank.
      return;
    }

    await locator.fill(value, { timeout: 15_000 });
  }

  private async freshInstallApp(): Promise<void> {
    if (!this.bundleId) {
      throw new Error('Missing MobileWright bundleId. Set ANDROID_PACKAGE or IOS_BUNDLE_ID before running the test.');
    }

    const appPath = Array.isArray(this.installApps) ? this.installApps[0] : this.installApps;

    if (!appPath) {
      throw new Error('Missing MobileWright install app path. Set ANDROID_APP or IOS_APP before running the test.');
    }

    await this.logInfo(`Preparing fresh install for ${this.bundleId}`);

    const installedApps = await this.device.listApps();
    const isAppInstalled = installedApps.some((app) => app.bundleId === this.bundleId);

    if (isAppInstalled) {
      await this.logInfo(`Uninstalling existing app: ${this.bundleId}`);
      await this.device.uninstallApp(this.bundleId);
    }

    await this.logInfo(`Installing fresh app from: ${appPath}`);
    await this.device.installApp(appPath);
  }

  private async isLoginFormDisplayed(): Promise<boolean> {
    return Boolean(await this.findFirstVisible([this.emailTextField, this.passwordTextField], 3000));
  }

  private async isWelcomeScreenDisplayed(): Promise<boolean> {
    return Boolean(await this.findFirstVisible([this.loginWithText, this.continentalAccountButton], 3000));
  }

  private async isLoggedIn(): Promise<boolean> {
    try {
      if (this.bundleId) {
        const fg = await this.device.getForegroundApp();
        if (fg.bundleId !== this.bundleId) {
          return false;
        }
      }
    } catch {
      // Continue if getForegroundApp is unavailable
    }
    return Boolean(await this.findFirstVisible(this.postLoginIndicatorCandidates, 3000));
  }
}

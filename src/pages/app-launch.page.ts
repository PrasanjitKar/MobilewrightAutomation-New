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
  ) {
    super(screen, subStepLogger);
  }

  get loginWithText(): Locator {
    return this.screen.getByLabel('loginWithText');
  }

  get continentalAccountButton(): Locator {
    return this.screen.getByLabel('continentalAccountButton');
  }

  get emailTextField(): Locator {
    return this.screen.getByLabel('emailTextFieldBox');
  }

  get passwordTextField(): Locator {
    return this.screen.getByLabel('passwordTextFieldBox');
  }

  get loginButton(): Locator {
    return this.screen.getByLabel('loginButton');
  }

  get postLoginIndicatorCandidates(): Locator[] {
    return [
      this.screen.getByLabel('homeTab'),
      this.screen.getByLabel('conveyorTab'),
      this.screen.getByLabel('corporatesTab'),
      this.screen.getByLabel('toolsTab'),
      this.screen.getByLabel('inspectionsTab'),
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
    ];
  }

  get acceptAllButtonCandidates(): Locator[] {
    return [
      this.screen.getByText(/Accept all/i),
      this.screen.getByText(/Accept All/i),
      this.screen.getByLabel('Accept all'),
      this.screen.getByLabel('Accept All'),
    ];
  }

  async launchApp(): Promise<void> {
    if (!this.bundleId) {
      throw new Error('Missing MobileWright bundleId. Set ANDROID_PACKAGE before running the test.');
    }

    await this.freshInstallApp();
    await this.device.launchApp(this.bundleId);
    await this.logSuccess(`Fresh app launched: ${this.bundleId}`);
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

    const acceptAllButton = await this.findFirstVisible(this.acceptAllButtonCandidates, 10_000);

    if (acceptAllButton) {
      await this.tap(acceptAllButton, 10_000);
      await this.logSuccess('Accepted all consent options');
      await this.waitForWelcomeScreen();
      return;
    }

    await this.waitForWelcomeScreen();
    await this.logWarning('Accept all button was not displayed; continuing from the Welcome screen');
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

  async provideCredentials(username: string, password: string): Promise<void> {
    await this.focusThenFill(this.emailTextField, username);
    await this.focusThenFill(this.passwordTextField, password);
    await this.logSuccess(`Credentials entered for ${username}`);
  }

  async clickLoginButton(): Promise<void> {
    await this.tap(this.loginButton, 15_000);
    await this.logSuccess('Login button clicked');
  }

  async verifyLoggedInSuccessfully(): Promise<void> {
    await this.waitForHomeShellDisplayed(90_000);
    await this.logSuccess('User logged in successfully');
  }

  async waitForHomeScreenToLoadCompletely(): Promise<void> {
    await this.logInfo('Waiting for Home screen data to finish loading');
    await this.waitForHomeShellDisplayed(90_000);

    const lastUpdated = await this.findFirstVisible([this.screen.getByLabel('lastUpdatedTimeHomeScreen')], 240_000);

    if (lastUpdated) {
      await this.logSuccess('Home screen data loaded completely');
      return;
    }

    await this.waitForAnyVisible(this.homeContentCandidates, 90_000, 'Home screen content did not become visible');
    await this.logWarning('Home screen loaded without a last-updated timestamp for this user');
  }

  async verifyHomeScreenDisplayed(): Promise<void> {
    await this.waitForHomeShellDisplayed(30_000);
    await this.waitForAnyVisible(this.homeContentCandidates, 30_000, 'Home screen content did not become visible');
    await this.logSuccess('Home screen is displayed');
  }

  async verifyAppIsForeground(): Promise<void> {
    if (!this.bundleId) {
      throw new Error('Missing MobileWright bundleId. Set ANDROID_PACKAGE before running the test.');
    }

    const foregroundApp = await this.device.getForegroundApp();
    expect(foregroundApp.bundleId).toBe(this.bundleId);
    await this.logSuccess(`App is running in foreground: ${foregroundApp.bundleId}`);
  }

  private async waitForAnyVisible(locators: Locator[], timeout: number, errorMessage?: string): Promise<void> {
    const visibleLocator = await this.findFirstVisible(locators, timeout);

    if (!visibleLocator) {
      throw new Error(errorMessage ?? `No expected Conti+ UI element became visible within ${timeout}ms`);
    }
  }

  private async waitForHomeShellDisplayed(timeout: number): Promise<void> {
    await this.waitForAnyVisible(
      this.postLoginIndicatorCandidates,
      timeout,
      `Home navigation did not become visible within ${timeout}ms`,
    );
  }

  private async findFirstVisible(locators: Locator[], timeout: number): Promise<Locator | undefined> {
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

  private async focusThenFill(locator: Locator, value: string): Promise<void> {
    await this.tap(locator, 15_000);
    await this.waitForTime(500);
    await locator.fill(value, { timeout: 15_000 });
  }

  private async freshInstallApp(): Promise<void> {
    if (!this.bundleId) {
      throw new Error('Missing MobileWright bundleId. Set ANDROID_PACKAGE before running the test.');
    }

    const appPath = Array.isArray(this.installApps) ? this.installApps[0] : this.installApps;

    if (!appPath) {
      throw new Error('Missing MobileWright install app path. Set ANDROID_APP before running the test.');
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
    return Boolean(await this.findFirstVisible(this.postLoginIndicatorCandidates, 3000));
  }
}

import { Locator, Screen } from 'mobilewright';
import { HTMLSubStepLogger } from '../utils/htmlSubStepLogger';
import BasePage from './base.page';

/**
 * Page object covering the Profile screen and top bar profile icon.
 *
 * Locator labels are sourced from the Flutter app source:
 * - conti_app_bar.dart  -> profileIcon (SemanticsLabel)
 * - profile_screen.dart -> buildAppbar ("View Profile"), logoutButton ("Logout"), settings ("Settings"), V. (app version)
 */
export class ProfilePage extends BasePage {
  constructor(screen: Screen, subStepLogger?: HTMLSubStepLogger) {
    super(screen, subStepLogger);
  }

  // ---- Top app bar ----
  get profileIconCandidates(): Locator[] {
    return [this.screen.getByLabel('profileIcon'), this.screen.getByLabel('profileButton')];
  }

  // ---- Profile screen ----
  get logoutButtonCandidates(): Locator[] {
    return [
      this.screen.getByText('Logout', { exact: true }),
      this.screen.getByLabel('logoutButton'),
      this.screen.getByType('android.widget.Button').filter({ hasText: 'Logout' }),
    ];
  }

  get profileScreenIndicators(): Locator[] {
    return [
      this.screen.getByText('Logout', { exact: true }),
      this.screen.getByText('Settings', { exact: true }),
      this.screen.getByText('View Profile', { exact: true }),
      this.screen.getByText('Profile', { exact: true }),
      this.screen.getByText(/V\./),
    ];
  }

  get unauthenticatedIndicators(): Locator[] {
    return [
      this.screen.getByLabel('loginWithText'),
      this.screen.getByLabel('continentalAccountButton'),
      this.screen.getByText(/Continental Account/i),
    ];
  }

  // ---- Actions ----

  async openProfile(): Promise<void> {
    const profileIcon = await this.findFirstVisible(this.profileIconCandidates, 15_000);
    if (!profileIcon) {
      throw new Error('Profile icon was not visible in the top right corner of the app bar');
    }
    await this.tap(profileIcon, 10_000);
    await this.logSuccess('Tapped Profile icon from top right corner');
  }

  async verifyProfileScreenDisplayed(): Promise<void> {
    const visibleIndicator = await this.findFirstVisible(this.profileScreenIndicators, 30_000);
    if (!visibleIndicator) {
      throw new Error('Profile screen did not become visible');
    }
    await this.logSuccess('Profile screen is displayed');
  }

  async clickLogoutButton(): Promise<void> {
    const logoutBtn = await this.findFirstVisible(this.logoutButtonCandidates, 15_000);
    if (!logoutBtn) {
      throw new Error('Logout button was not found on the Profile screen');
    }
    await this.tap(logoutBtn, 10_000);
    await this.logSuccess('Logout button tapped');
  }

  async verifyLoggedOutSuccessfully(): Promise<void> {
    const unauthenticated = await this.findFirstVisible(this.unauthenticatedIndicators, 30_000);
    if (!unauthenticated) {
      throw new Error('App did not return to the unauthenticated/Welcome state after logout');
    }
    await this.logSuccess('User logged out successfully and redirected to Welcome screen');
  }
}

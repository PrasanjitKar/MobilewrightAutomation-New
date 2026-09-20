import { Screen } from 'mobilewright';
import BasePage from './base.page';
import { HTMLSubStepLogger } from '../utils/htmlSubStepLogger';

export class LoginPage extends BasePage {
  private platform: 'ios' | 'android' | undefined;

  constructor(screen: Screen, platform: 'ios' | 'android' | undefined, subStepLogger?: HTMLSubStepLogger) {
    super(screen, subStepLogger);
    this.platform = platform;
  }

  // ==================== Locators ====================

  get usernameInput() {
    return this.platform === 'android'
      ? this.screen.getByLabel('emailTextFieldBox')
      : this.screen.getByPlaceholder('Email');
  }

  get passwordInput() {
    return this.platform === 'android'
      ? this.screen.getByLabel('passwordTextFieldBox')
      : this.screen.getByPlaceholder('Password');
  }

  get loginButton() {
    return this.platform === 'android'
      ? this.screen.getByLabel('loginButton')
      : this.screen.getByText('LOGIN', { exact: true });
  }

  get loginErrorMessage() {
    return this.platform === 'android'
      ? this.screen.getByLabel('login-error-message')
      : this.screen.getByText('Invalid credentials', { exact: false });
  }

  get forgotPasswordLink() {
    return this.platform === 'android'
      ? this.screen.getByLabel('forgotPasswordText')
      : this.screen.getByText('Forgot Password?', { exact: false });
  }

  get forgotPasswordEmailInput() {
    return this.platform === 'android'
      ? this.screen.getByLabel('emailTextFieldBox')
      : this.screen.getByPlaceholder('Email');
  }

  get backToLoginLink() {
    return this.platform === 'android'
      ? this.screen.getByLabel('link-back-to-login')
      : this.screen.getByText('Back to Login', { exact: false });
  }

  get currentPasswordInput() {
    return this.platform === 'android'
      ? this.screen.getByLabel('input-current-password')
      : this.screen.getByPlaceholder('Current password');
  }

  get newPasswordInput() {
    return this.platform === 'android'
      ? this.screen.getByLabel('input-new-password')
      : this.screen.getByPlaceholder('New password');
  }

  get confirmPasswordInput() {
    return this.platform === 'android'
      ? this.screen.getByLabel('input-repeat-password')
      : this.screen.getByPlaceholder('Confirm password');
  }

  get changePasswordMismatchError() {
    return this.platform === 'android'
      ? this.screen.getByLabel('password-mismatch-error')
      : this.screen.getByText('Passwords do not match', { exact: false });
  }

  get saveButton() {
    return this.platform === 'android'
      ? this.screen.getByLabel('button-SAVE')
      : this.screen.getByText('SAVE', { exact: true });
  }

  get changePasswordPolicyError() {
    return this.platform === 'android'
      ? this.screen.getByLabel('password-policy-error')
      : this.screen.getByText('Password does not meet policy', { exact: false });
  }

  get signUpTab() {
    return this.screen.getByText('Sign up', { exact: true });
  }

  get successMessage() {
    return this.platform === 'android'
      ? this.screen.getByText('Signed Up!', { exact: true })
      : this.screen.getByLabel('Signed Up!', { exact: true });
  }

  get successMessageDescription() {
    return this.screen.getByText('You successfully signed up!', { exact: true });
  }

  get signUpButton() {
    return this.platform === 'android'
      ? this.screen.getByLabel('button-SIGN UP')
      : this.screen.getByText('SIGN UP', { exact: true });
  }

  // ==================== Methods ====================

  async login(username: string, password: string): Promise<void> {
    await this.logInfo(`Logging in as ${username}`);
    await this.fill(this.usernameInput, username);
    await this.fill(this.passwordInput, password);
    await this.tap(this.loginButton);
    await this.logSuccess('Login submitted');
  }

  async loginExpectingError(username: string, password: string): Promise<void> {
    await this.logInfo(`Attempting login expecting error for ${username}`);
    await this.fill(this.usernameInput, username);
    await this.fill(this.passwordInput, password);
    await this.tap(this.loginButton);
  }

  async isPasswordChangePage(): Promise<boolean> {
    try {
      await this.currentPasswordInput.waitFor({ state: 'visible', timeout: 3000 });
      return true;
    } catch {
      return false;
    }
  }

  async changePassword(currentPassword: string, newPassword: string, confirmPassword: string): Promise<void> {
    await this.logInfo('Changing password');
    await this.fill(this.currentPasswordInput, currentPassword);
    await this.fillNewPasswordFields(newPassword, confirmPassword);
    await this.tap(this.saveButton);
    await this.logSuccess('Password changed');
  }

  async clickForgotPasswordLink(): Promise<void> {
    await this.logInfo('Clicking Forgot Password link');
    await this.tap(this.forgotPasswordLink);
  }

  async submitForgotPassword(email: string): Promise<void> {
    await this.logInfo(`Submitting forgot password for ${email}`);
    await this.fill(this.forgotPasswordEmailInput, email);
    await this.tap(this.loginButton);
  }

  async clickBackToLoginLink(): Promise<void> {
    await this.logInfo('Clicking Back to Login link');
    await this.tap(this.backToLoginLink);
  }

  async fillNewPasswordFields(newPassword: string, confirmPassword: string): Promise<void> {
    await this.logInfo('Filling new and confirm password fields');
    await this.fill(this.newPasswordInput, newPassword);
    await this.fill(this.confirmPasswordInput, confirmPassword);
    await this.logSuccess('Password fields filled');
  }
}

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

  // ==================== Methods ====================

  async login(username: string, password: string): Promise<void> {
    await this.logInfo(`Logging in as ${username}`);
    await this.fill(this.usernameInput, username);
    await this.fill(this.passwordInput, password);
    await this.tap(this.loginButton);
    await this.logSuccess('Login submitted');
  }
}

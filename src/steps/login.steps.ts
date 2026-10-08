import { Given, Then, When } from '../helper/hooks';
import { expect } from '@mobilewright/test';

import { ScenarioContext } from '../utils/ScenarioContext';

// =====================================================
// Existing steps
// =====================================================

Given('User is at Login page', async function (this: ScenarioContext) {
  await expect(this.loginPage.usernameInput).toBeVisible();
});

Given('Login with {string} and {string}', async function (this: ScenarioContext, username: string, password: string) {
  await this.loginPage.login(username, password);
});

Then('User remains on the Login page', async function (this: ScenarioContext) {
  await expect(this.loginPage.usernameInput).toBeVisible();
  await this.subStepLogger.success('User remains on the Login page');
});

When('User clicks Login button without entering credentials', async function (this: ScenarioContext) {
  await this.loginPage.loginButton.tap();
});

When('User enters only password {string} and clicks Login', async function (this: ScenarioContext, password: string) {
  await this.loginPage.passwordInput.fill(password);
  await this.loginPage.loginButton.tap();
});

When('User enters only email {string} and clicks Login', async function (this: ScenarioContext, email: string) {
  await this.loginPage.usernameInput.fill(email);
  await this.loginPage.loginButton.tap();
});

Then('User is on the Login page', async function (this: ScenarioContext) {
  await expect(this.loginPage.usernameInput).toBeVisible();
  await this.subStepLogger.success('User is back on the Login page');
});

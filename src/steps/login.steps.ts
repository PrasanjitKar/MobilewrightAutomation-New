import { Given, Then, When } from '../helper/hooks';
import { expect } from '@mobilewright/test';

import { ScenarioContext } from '../utils/ScenarioContext';

// =====================================================
// Existing steps
// =====================================================

Given('User is at Login page', async function (this: ScenarioContext) {
  await expect(this.loginPage.usernameInput).toBeVisible();
});

Given('Login with {string} and {string}', async function (
  this: ScenarioContext,
  username: string,
  password: string,
) {
  await this.loginPage.login(username, password);
});

Then('Verify Home page is displayed', async function (this: ScenarioContext) {
  await this.homePage.verifyHomePageVisible();
});

Given('Login with normal user {string} and {string}', async function (
  this: ScenarioContext,
  username: string,
  password: string,
) {
  await this.loginPage.login(username, password);

  if (await this.loginPage.isPasswordChangePage()) {
    await this.loginPage.changePassword(password, password, password);
  }
});

// =====================================================
// TC-LOGIN-002: Invalid credentials
// =====================================================

When('User attempts login with {string} and {string}', async function (
  this: ScenarioContext,
  username: string,
  password: string,
) {
  await this.loginPage.loginExpectingError(username, password);
});

Then('Login error message is displayed', async function (this: ScenarioContext) {
  await expect(this.loginPage.loginErrorMessage).toBeVisible();
  await this.subStepLogger.success('Login error message is visible');
});

Then('User remains on the Login page', async function (this: ScenarioContext) {
  await expect(this.loginPage.usernameInput).toBeVisible();
  await this.subStepLogger.success('User remains on the Login page');
});

// =====================================================
// TC-LOGIN-003/004/005: Form validation — empty fields
// =====================================================

When('User clicks Login button without entering credentials', async function (
  this: ScenarioContext,
) {
  await this.loginPage.loginButton.tap();
});

When('User enters only password {string} and clicks Login', async function (
  this: ScenarioContext,
  password: string,
) {
  await this.loginPage.passwordInput.fill(password);
  await this.loginPage.loginButton.tap();
});

When('User enters only email {string} and clicks Login', async function (
  this: ScenarioContext,
  email: string,
) {
  await this.loginPage.usernameInput.fill(email);
  await this.loginPage.loginButton.tap();
});

Then('Login validation error is displayed', async function (this: ScenarioContext) {
  await expect(this.loginPage.loginErrorMessage).toBeVisible();
  await this.subStepLogger.success('Login validation error message is visible');
});

// =====================================================
// TC-LOGIN-007 / TC-LOGIN-012: Forgot-password navigation
// =====================================================

Then('Forgot Password link is visible on the Login page', async function (
  this: ScenarioContext,
) {
  await expect(this.loginPage.forgotPasswordLink).toBeVisible();
  await this.subStepLogger.success('Forgot Password link is visible');
});

When('User clicks the Forgot Password link', async function (this: ScenarioContext) {
  await this.loginPage.clickForgotPasswordLink();
});

Then('Forgot Password page is displayed', async function (this: ScenarioContext) {
  await expect(this.loginPage.forgotPasswordEmailInput).toBeVisible();
  await this.subStepLogger.success('Forgot Password page is displayed');
});

Then('Login link is visible on the Forgot Password page', async function (
  this: ScenarioContext,
) {
  await expect(this.loginPage.backToLoginLink).toBeVisible();
  await this.subStepLogger.success('Login back-link is visible');
});

When('User clicks the Login link on the Forgot Password page', async function (
  this: ScenarioContext,
) {
  await this.loginPage.clickBackToLoginLink();
});

Then('User is on the Login page', async function (this: ScenarioContext) {
  await expect(this.loginPage.usernameInput).toBeVisible();
  await this.subStepLogger.success('User is back on the Login page');
});

When('User submits forgot password for {string}', async function (
  this: ScenarioContext,
  email: string,
) {
  await this.loginPage.submitForgotPassword(email);
});

Then('User is redirected to the Reset Password page', async function (this: ScenarioContext) {
  await expect(this.loginPage.newPasswordInput).toBeVisible({ timeout: 15000 });
  await this.subStepLogger.success('Redirected to Reset Password page');
});

// =====================================================
// TC-LOGIN-010/011: Change-password validation
// =====================================================

When('User navigates to the Change Password page', async function (this: ScenarioContext) {
  await this.loginPage.waitForLoadingToComplete();
  await expect(this.loginPage.currentPasswordInput).toBeVisible();
  await this.subStepLogger.success('Change Password page is displayed');
});

When('User enters mismatched passwords {string} and {string}', async function (
  this: ScenarioContext,
  newPassword: string,
  confirmPassword: string,
) {
  await this.loginPage.currentPasswordInput.fill('PlaceholderC0urrent!');
  await this.loginPage.fillNewPasswordFields(newPassword, confirmPassword);
});

Then('Password mismatch error is displayed', async function (this: ScenarioContext) {
  await expect(this.loginPage.changePasswordMismatchError).toBeVisible();
  await this.subStepLogger.success('Password mismatch error is visible');
});

Then('Save button is disabled on Change Password page', async function (
  this: ScenarioContext,
) {
  await expect(this.loginPage.saveButton).toBeDisabled();
  await this.subStepLogger.success('Save button is correctly disabled');
});

When('User enters weak password {string}', async function (
  this: ScenarioContext,
  weakPassword: string,
) {
  await this.loginPage.currentPasswordInput.fill('PlaceholderC0urrent!');
  await this.loginPage.newPasswordInput.fill(weakPassword);
  await this.loginPage.confirmPasswordInput.fill(weakPassword);
});

Then('Password policy error is displayed', async function (this: ScenarioContext) {
  await expect(this.loginPage.changePasswordPolicyError).toBeVisible();
  await this.subStepLogger.success('Password policy error is visible');
});

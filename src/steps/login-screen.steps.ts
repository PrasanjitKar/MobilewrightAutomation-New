import { Then, When } from '../helper/hooks';
import { ScenarioContext } from '../utils/ScenarioContext';

// =====================================================
// Welcome screen (TC-LOGIN-002, TC-LOGIN-004)
// =====================================================

Then(
  'the Welcome screen displays the Contiplus logo, heading, both login buttons and separator',
  async function (this: ScenarioContext) {
    await this.loginScreenPage.verifyWelcomeScreenElements();
  },
);

When(
  'the user taps the {string} button on the Welcome screen',
  async function (this: ScenarioContext, buttonName: string) {
    if (buttonName === 'Continue as a Guest') {
      await this.loginScreenPage.tapContinueAsGuest();
      return;
    }

    throw new Error(`Unsupported Welcome screen button: "${buttonName}"`);
  },
);

Then('the Onboarding screen should be displayed', async function (this: ScenarioContext) {
  await this.loginScreenPage.verifyOnboardingScreenDisplayed();
});

When('the user taps the {string} button', async function (this: ScenarioContext, buttonText: string) {
  if (buttonText === 'Skip Introduction') {
    await this.loginScreenPage.tapSkipIntroduction();
    return;
  }

  throw new Error(`Unsupported button: "${buttonText}"`);
});

Then('the Dashboard screen should be displayed', async function (this: ScenarioContext) {
  await this.appLaunchPage.verifyLoggedInSuccessfully();
});

// =====================================================
// Login screen UI details (TC-LOGIN-003, TC-LOGIN-005)
// =====================================================

Then('the Login screen displays a {string} button', async function (this: ScenarioContext, buttonText: string) {
  if (buttonText === 'Back') {
    await this.loginScreenPage.verifyBackButtonVisible();
    return;
  }

  throw new Error(`Unsupported Login screen button assertion: "${buttonText}"`);
});

Then('the Login screen displays the {string} heading', async function (this: ScenarioContext, heading: string) {
  if (heading === 'Welcome!') {
    await this.loginScreenPage.verifyLoginScreenHeading();
    return;
  }

  throw new Error(`Unsupported Login screen heading assertion: "${heading}"`);
});

Then('the "Forgot password" link is visible on the Login screen', async function (this: ScenarioContext) {
  await this.loginScreenPage.verifyForgotPasswordLinkVisible();
});

// =====================================================
// Email case handling (TC-LOGIN-007)
// =====================================================

When('the user types {string} into the email field', async function (this: ScenarioContext, email: string) {
  await this.loginScreenPage.typeEmail(email);
});

Then('the email field still displays {string}', async function (this: ScenarioContext, expectedValue: string) {
  await this.loginScreenPage.verifyEmailFieldValue(expectedValue);
});

// =====================================================
// Password visibility toggle (TC-LOGIN-008)
// =====================================================

When('the user types {string} into the password field', async function (this: ScenarioContext, password: string) {
  await this.loginScreenPage.typePassword(password);
});

Then('the password field is obscured showing {string}', async function (this: ScenarioContext, plainText: string) {
  await this.loginScreenPage.verifyPasswordObscured(plainText);
});

When('the user taps the password visibility toggle', async function (this: ScenarioContext) {
  await this.loginScreenPage.tapPasswordVisibilityToggle();
});

Then('the password field shows {string} in plain text', async function (this: ScenarioContext, plainText: string) {
  await this.loginScreenPage.verifyPasswordVisible(plainText);
});

// =====================================================
// Form validation (TC-LOGIN-009, TC-LOGIN-010, TC-LOGIN-011)
// =====================================================

Then(
  'the email field shows the error {string} and the password field shows the error {string}',
  async function (this: ScenarioContext, emailError: string, passwordError: string) {
    await this.loginScreenPage.verifyFieldValidationErrors(emailError, passwordError);
  },
);

Then('no login request should be sent', async function (this: ScenarioContext) {
  await this.loginScreenPage.verifyNoLoginRequestSent();
});

// =====================================================
// Invalid credentials (TC-LOGIN-012)
// =====================================================

Then('an authentication error is displayed', async function (this: ScenarioContext) {
  await this.loginScreenPage.verifyAuthenticationErrorDisplayed();
});

Then('the user remains on the Login screen', async function (this: ScenarioContext) {
  await this.appLaunchPage.verifyLoginFieldsDisplayed();
});

// =====================================================
// Loading state (TC-LOGIN-014)
// =====================================================

Then('the login-in-progress snackbar is displayed', async function (this: ScenarioContext) {
  await this.loginScreenPage.verifyLoggingInSnackbarShown();
});

Then('the login button is disabled while authenticating', async function (this: ScenarioContext) {
  await this.loginScreenPage.verifyLoginButtonDisabledDuringLoading();
});

// =====================================================
// Autofill support (TC-LOGIN-015)
// =====================================================

Then('the email and password fields are focusable and accept keyboard input', async function (this: ScenarioContext) {
  await this.loginScreenPage.verifyEmailAndPasswordFieldsAcceptInput();
});

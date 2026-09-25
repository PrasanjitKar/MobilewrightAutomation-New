import { Then, When } from '../helper/hooks';
import { ScenarioContext } from '../utils/ScenarioContext';
import { resolveTestDataToken } from '../utils/testData';

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
  if (buttonText === 'Get Verification Code') {
    await this.loginScreenPage.tapGetVerificationCodeButton();
    return;
  }
  if (buttonText === 'Submit') {
    await this.loginScreenPage.tapResetPasswordSubmitButton();
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

When('the user types {string} into the email field', async function (this: ScenarioContext, emailToken: string) {
  const email = resolveTestDataToken(this.testData, emailToken);
  await this.loginScreenPage.typeEmail(email);
});

Then('the email field still displays {string}', async function (this: ScenarioContext, expectedValue: string) {
  await this.loginScreenPage.verifyEmailFieldValue(expectedValue);
});

// =====================================================
// Password visibility toggle (TC-LOGIN-008)
// =====================================================

When('the user types {string} into the password field', async function (this: ScenarioContext, passwordToken: string) {
  const password = resolveTestDataToken(this.testData, passwordToken);
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

// =====================================================
// Back button on Login (TC-LOGIN-016)
// =====================================================

When('the user taps the Back button on the Login screen', async function (this: ScenarioContext) {
  await this.loginScreenPage.tapBackButton();
});

// =====================================================
// Forgot Password Navigation & Screen (TC-LOGIN-017, TC-LOGIN-018)
// =====================================================

When('the user taps the "Forgot password" link', async function (this: ScenarioContext) {
  await this.loginScreenPage.tapForgotPasswordLink();
});

Then('the Forgot Password screen should be displayed', async function (this: ScenarioContext) {
  await this.loginScreenPage.verifyForgotPasswordScreenDisplayed();
});

Then(
  'the email field on the Forgot Password screen displays {string}',
  async function (this: ScenarioContext, expectedEmail: string) {
    await this.loginScreenPage.verifyEmailFieldValue(expectedEmail);
  },
);

Then('the Forgot Password screen displays all required UI elements', async function (this: ScenarioContext) {
  await this.loginScreenPage.verifyForgotPasswordUIElements();
});

// =====================================================
// Forgot Password Form Validation (TC-LOGIN-020)
// =====================================================

When(
  'the user enters email {string} on the Forgot Password screen',
  async function (this: ScenarioContext, email: string) {
    await this.loginScreenPage.typeForgotPasswordEmail(email);
  },
);

Then(
  'the Forgot Password screen shows the email error {string}',
  async function (this: ScenarioContext, expectedError: string) {
    await this.loginScreenPage.verifyForgotPasswordEmailError(expectedError);
  },
);

// =====================================================
// Verification Code Already Received (TC-LOGIN-021)
// =====================================================

When('the user taps the "Verification Code already received" link', async function (this: ScenarioContext) {
  await this.loginScreenPage.tapVerificationCodeAlreadyReceivedLink();
});

Then('the Reset Password screen should be displayed', async function (this: ScenarioContext) {
  await this.loginScreenPage.verifyResetPasswordScreenDisplayed();
});

// =====================================================
// Back Button & Login Link on Forgot Password (TC-LOGIN-022)
// =====================================================

When(
  'the user taps the {string} on the Forgot Password screen',
  async function (this: ScenarioContext, action: string) {
    if (action === 'Back button') {
      await this.loginScreenPage.tapBackButton();
      return;
    }
    if (action === 'Login link') {
      await this.loginScreenPage.tapForgotPasswordLoginLink();
      return;
    }
    throw new Error(`Unsupported action on Forgot Password screen: "${action}"`);
  },
);

// =====================================================
// Reset Password Screen UI & Validation (TC-LOGIN-023, TC-LOGIN-025)
// =====================================================

Then('the Reset Password screen displays all required form fields', async function (this: ScenarioContext) {
  await this.loginScreenPage.verifyResetPasswordUIElements();
});

When(
  'the user sets verification code {string}, new password {string}, and confirm password {string} on the Reset Password screen',
  async function (this: ScenarioContext, code: string, newPw: string, confirmPw: string) {
    await this.loginScreenPage.fillResetPasswordForm(code, newPw, confirmPw);
  },
);

Then(
  'the Reset Password screen shows the validation error {string}',
  async function (this: ScenarioContext, expectedError: string) {
    await this.loginScreenPage.verifyResetPasswordValidationError(expectedError);
  },
);

// =====================================================
// Paste Password & Space Trimming (TC-LOGIN-034, TC-LOGIN-035)
// =====================================================

When(
  'the user pastes password {string} into the password field',
  async function (this: ScenarioContext, passwordToken: string) {
    const password = resolveTestDataToken(this.testData, passwordToken);
    await this.loginScreenPage.pastePasswordIntoField(password);
  },
);

When(
  'the user provides username with spaces as {string} and password as {string}',
  async function (this: ScenarioContext, usernameToken: string, passwordToken: string) {
    const username = resolveTestDataToken(this.testData, usernameToken);
    const password = resolveTestDataToken(this.testData, passwordToken);
    await this.loginScreenPage.enterUsernameAndPasswordWithSpaces(username, password);
  },
);

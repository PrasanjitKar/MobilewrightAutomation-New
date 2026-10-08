import { Given, Then, When } from '../helper/hooks';
import { ScenarioContext } from '../utils/ScenarioContext';
import { resolveTestDataToken } from '../utils/testData';

Given('the Conti+ app is launched', async function (this: ScenarioContext) {
  await this.appLaunchPage.launchApp();
});

Given('the app is launched', async function (this: ScenarioContext) {
  await this.appLaunchPage.launchApp();
});

Given('the Conti+ app has loaded completely', async function (this: ScenarioContext) {
  await this.appLaunchPage.waitForAppLoaded();
});

When('the user accepts all consent options', async function (this: ScenarioContext) {
  await this.appLaunchPage.acceptAllConsentOptions();
});

Then('the Welcome screen should be displayed', async function (this: ScenarioContext) {
  await this.appLaunchPage.waitForWelcomeScreen();
});

When('the user opens Continental Account login', async function (this: ScenarioContext) {
  await this.appLaunchPage.openContinentalAccountLogin();
});

Then('the email and password fields should be displayed', async function (this: ScenarioContext) {
  await this.appLaunchPage.verifyLoginFieldsDisplayed();
});

Then(
  'the user provides username as {string} and password as {string}',
  async function (this: ScenarioContext, username: string, password: string) {
    await this.appLaunchPage.provideCredentials(username, password);
  },
);

Then(
  'the user provides username as {string} and password as {string} from test data',
  async function (this: ScenarioContext, usernameToken: string, passwordToken: string) {
    const username = resolveTestDataToken(this.testData, usernameToken);
    const password = resolveTestDataToken(this.testData, passwordToken);

    await this.appLaunchPage.provideCredentials(username, password);
  },
);

Then('the user clicks on the login button', async function (this: ScenarioContext) {
  await this.appLaunchPage.clickLoginButton();
});

Then('the user should be logged in successfully', async function (this: ScenarioContext) {
  await this.appLaunchPage.verifyLoggedInSuccessfully();
});

Then('wait for the home screen to load completely', async function (this: ScenarioContext) {
  await this.appLaunchPage.waitForHomeScreenToLoadCompletely();
});

When('the user clicks on later button in the update app popup', async function (this: ScenarioContext) {
  await this.appLaunchPage.clickLaterInUpdateAppPopup();
});

Then('the user should see the home screen', async function (this: ScenarioContext) {
  await this.appLaunchPage.verifyHomeScreenDisplayed();
});

Then('the Conti+ app should be running in the foreground', async function (this: ScenarioContext) {
  await this.appLaunchPage.verifyAppIsForeground();
});

When('the user is on login screen', async function (this: ScenarioContext) {
  await this.appLaunchPage.waitForLoginScreenDisplayed();
});

When('the user clicks on login button', async function (this: ScenarioContext) {
  await this.appLaunchPage.clickOnTheLoginButton();
});

Then('the user should see the login form', async function (this: ScenarioContext) {
  await this.appLaunchPage.verifyLoginFormDisplayed();
});

When('the user provides the phone number as {string}', async function (this: ScenarioContext, phoneNumber: string) {
  await this.appLaunchPage.providePhoneNumber(phoneNumber);
});

Then('the user should see the login screen', async function (this: ScenarioContext) {
  await this.appLaunchPage.verifyLoginScreenDisplayed();
});

When('the user provides the email as {string}', async function (this: ScenarioContext, email: string) {
  await this.appLaunchPage.provideRegisteredEmail(resolveTestDataToken(this.testData, email));
});

When('the user provides the password as {string}', async function (this: ScenarioContext, password: string) {
  await this.appLaunchPage.providePassword(resolveTestDataToken(this.testData, password));
});

When('the user taps on the login button', async function (this: ScenarioContext) {
  await this.appLaunchPage.tapOnTheLoginButton();
});

Then('the user locates the store manually', async function (this: ScenarioContext) {
  await this.appLaunchPage.locateStoreManually();
});

When('the user selects the location as SKIMMERSITEA', async function (this: ScenarioContext) {
  await this.appLaunchPage.selectLocationAsSKIMMERSITEA();
});

When('the user confirms the location', async function (this: ScenarioContext) {
  await this.appLaunchPage.clickOnConfirmLocation();
});

Then('the dashboard screen should be displayed successfully', async function (this: ScenarioContext) {
  await this.appLaunchPage.verifyDashboardScreenDisplayed();
});

When('the user orders food as Chicken Biryani', async function (this: ScenarioContext) {
  await this.appLaunchPage.orderFoodAsChickenBiryani();
});

When('the user selects the payment method as card', async function (this: ScenarioContext) {
  await this.appLaunchPage.selectPaymentMethodAsCard();
});

When('the user pays with card', async function (this: ScenarioContext) {
  await this.appLaunchPage.payWithCard();
});

Then('the order should be placed successfully', async function (this: ScenarioContext) {
  await this.appLaunchPage.verifyOrderPlacedSuccessfully();
});

When('the user clicks on the back to home button', async function (this: ScenarioContext) {
  await this.appLaunchPage.clickBackToHomeButton();
});
When('the user logs out from the application', async function (this: ScenarioContext) {
  await this.appLaunchPage.logoutFromApplication();
});
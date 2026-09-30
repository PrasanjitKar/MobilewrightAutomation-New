import { Given, Then, When } from '../helper/hooks';
import { ScenarioContext } from '../utils/ScenarioContext';
import { resolveTestDataToken } from '../utils/testData';

Given('the Conti+ app is launched', async function (this: ScenarioContext) {
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

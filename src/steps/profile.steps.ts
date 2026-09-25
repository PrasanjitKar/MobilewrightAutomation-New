import { Then, When } from '../helper/hooks';
import { ScenarioContext } from '../utils/ScenarioContext';

// =====================================================
// Profile & Logout steps
// =====================================================

When('the user clicks on Profile icon from top right corner', async function (this: ScenarioContext) {
  await this.profilePage.openProfile();
});

Then('the user should see the profile screen', async function (this: ScenarioContext) {
  await this.profilePage.verifyProfileScreenDisplayed();
});

When('the user clicks on Logout button', async function (this: ScenarioContext) {
  await this.profilePage.clickLogoutButton();
});

Then('the user should be logged out successfully', async function (this: ScenarioContext) {
  await this.profilePage.verifyLoggedOutSuccessfully();
});

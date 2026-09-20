import { Then, When } from '../helper/hooks';
import { ScenarioContext } from '../utils/ScenarioContext';
import { resolveTestDataToken } from '../utils/testData';

// =====================================================
// Home screen — conveyor count
// =====================================================

Then('verify the conveyor count is displayed on the home screen', async function (this: ScenarioContext) {
  const count = await this.conveyorPage.captureConveyorCountFromHome();
  this.testData['_conveyorCountOnHome'] = count;
});

When('the user clicks on the conveyor card', async function (this: ScenarioContext) {
  await this.conveyorPage.openConveyorListFromHome();
});

Then('the user should see the conveyor details screen', async function (this: ScenarioContext) {
  await this.conveyorPage.verifyConveyorListScreenDisplayed();
});

Then(
  'verify the same conveyor count is displayed on the bottom of the conveyor details screen',
  async function (this: ScenarioContext) {
    const expectedCount = Number(this.testData['_conveyorCountOnHome']);
    await this.conveyorPage.verifyConveyorListCountMatches(expectedCount);
  },
);

// =====================================================
// Add Conveyor flow
// =====================================================

When('user clicks on add conveyor button', async function (this: ScenarioContext) {
  const countBeforeAdd = await this.conveyorPage.captureConveyorListCount();
  this.testData['_conveyorCountBeforeAdd'] = countBeforeAdd;
  await this.conveyorPage.openAddConveyorForm();
});

Then('the user should see the add conveyor screen', async function (this: ScenarioContext) {
  await this.conveyorPage.verifyAddConveyorScreenDisplayed();
});

When('user provides the conveyor name as {string} from test data', async function (
  this: ScenarioContext,
  conveyorNameToken: string,
) {
  const baseName = resolveTestDataToken(this.testData, conveyorNameToken);
  // Append a unique suffix so repeated runs never collide with a previously created conveyor name.
  const uniqueName = `${baseName}_${Date.now()}`;
  this.testData['_createdConveyorName'] = uniqueName;
  await this.conveyorPage.enterConveyorName(uniqueName);
});

When('user provides the customer site as {string} from test data', async function (
  this: ScenarioContext,
  customerSiteToken: string,
) {
  const siteName = resolveTestDataToken(this.testData, customerSiteToken);
  await this.conveyorPage.selectCustomerSite(siteName);
});

When('user clicks on the Create button', async function (this: ScenarioContext) {
  await this.conveyorPage.clickCreateButton();
  await this.conveyorPage.ensureOnConveyorListScreenAfterCreate();
});

Then('the user should see the conveyor details screen with the newly added conveyor', async function (
  this: ScenarioContext,
) {
  const conveyorName = String(this.testData['_createdConveyorName']);
  await this.conveyorPage.verifyConveyorCreated(conveyorName);
});

Then(
  'verify the conveyor count is updated on the conveyor details screen after adding a new conveyor',
  async function (this: ScenarioContext) {
    const countBeforeAdd = Number(this.testData['_conveyorCountBeforeAdd']);
    await this.conveyorPage.verifyConveyorListCountIncreasedBy(countBeforeAdd, 1);
  },
);

// =====================================================
// Back to Home — verify count updated
// =====================================================

When('user clicks on home tab button', async function (this: ScenarioContext) {
  await this.conveyorPage.goToHomeTab();
});

Then(
  'verify the conveyor count is updated on the home screen after adding a new conveyor',
  async function (this: ScenarioContext) {
    const countBeforeAdd = Number(this.testData['_conveyorCountOnHome']);
    await this.conveyorPage.verifyHomeConveyorCountIncreasedBy(countBeforeAdd, 1);
  },
);

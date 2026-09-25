import { Then, When } from '../helper/hooks';
import { ScenarioContext } from '../utils/ScenarioContext';
import { resolveTestDataToken } from '../utils/testData';

// =====================================================
// Conveyor Inspect Event Creation & Upload Steps
// =====================================================

When('the user clicks on Conveyor Inspect card in the home screen', async function (this: ScenarioContext) {
  await this.conveyorInspectPage.clickConveyorInspectCardFromHome();
});

Then('the user should see the Conveyor Inspect list screen', async function (this: ScenarioContext) {
  await this.conveyorInspectPage.verifyConveyorInspectListScreenDisplayed();
});

When('the user clicks the first event in the list', async function (this: ScenarioContext) {
  await this.conveyorInspectPage.clickFirstEventInList();
});

Then('the user should see the View Conveyor Inspect Event details screen', async function (this: ScenarioContext) {
  await this.conveyorInspectPage.verifyViewEventDetailsScreenDisplayed();
});

When('the user clicks on the Upload button', async function (this: ScenarioContext) {
  await this.conveyorInspectPage.clickUploadFilesButton();
});

Then('the user should see the Edit Conveyor Inspect Event screen', async function (this: ScenarioContext) {
  await this.conveyorInspectPage.verifyEditConveyorInspectScreenDisplayed();
});

When('the user clicks on the Upload button from LHS', async function (this: ScenarioContext) {
  await this.conveyorInspectPage.clickUploadButtonFromLhs();
});

When('the user clicks Save button', async function (this: ScenarioContext) {
  await this.conveyorInspectPage.clickSaveButton();
});

When('the user clicks on the Add Conveyor Inspect module', async function (this: ScenarioContext) {
  await this.conveyorInspectPage.clickAddConveyorInspectModule();
});

Then('the user should see the Add Conveyor Inspect Event screen', async function (this: ScenarioContext) {
  await this.conveyorInspectPage.verifyAddConveyorInspectScreenDisplayed();
});

When(
  'the user fills the conveyor name field with {string} from test data',
  async function (this: ScenarioContext, conveyorNameToken: string) {
    const conveyorName = resolveTestDataToken(this.testData, conveyorNameToken);
    await this.conveyorInspectPage.fillConveyorName(conveyorName);
  },
);

When("the user fills the inspection date field with today's date", async function (this: ScenarioContext) {
  await this.conveyorInspectPage.fillInspectionDateWithToday();
});

When('the user fills the inspector time field with current time', async function (this: ScenarioContext) {
  await this.conveyorInspectPage.fillInspectorTimeWithCurrentTime();
});

When(
  'the user selects the colormap as {string} from the dropdown',
  async function (this: ScenarioContext, colormapToken: string) {
    const colormap = resolveTestDataToken(this.testData, colormapToken);
    await this.conveyorInspectPage.selectColormap(colormap);
  },
);

When('the user clicks on the Create button', async function (this: ScenarioContext) {
  await this.conveyorInspectPage.clickCreateButton();
});

Then('the user should see the Conveyor Inspect Event details screen', async function (this: ScenarioContext) {
  await this.conveyorInspectPage.verifyEventDetailsScreenDisplayed();
});

Then('{string} message should be displayed', async function (this: ScenarioContext, messageText: string) {
  if (messageText.toLowerCase().includes('successfully created')) {
    await this.conveyorInspectPage.verifySuccessMessageDisplayed();
  } else if (messageText.toLowerCase().includes('upload successful')) {
    await this.conveyorInspectPage.verifyUploadSuccessMessageDisplayed();
  } else {
    await this.subStepLogger?.info(`Verifying message "${messageText}"`);
  }
});

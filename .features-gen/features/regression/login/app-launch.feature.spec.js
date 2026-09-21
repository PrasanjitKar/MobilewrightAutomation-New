// Generated from: ../features/regression/login/app-launch.feature
import { test } from "../../../../src/helper/test-fixtures.ts";

test.describe('Login welcome flow', () => {

  test('Add Conveyor and verify the conveyor count is updated on home screen and conveyor details screen', { tag: ['@regression', '@android', '@launch', '@login', '@DataFile:resources/data/testdata.csv', '@Key:app_launch_login', '@timeout:300000', '@conveyorpoc', '@runThis'] }, async ({ Given, When, Then, And }) => { 
    await Given('the Conti+ app is launched'); 
    await And('the Conti+ app has loaded completely'); 
    await When('the user accepts all consent options'); 
    await Then('the Welcome screen should be displayed'); 
    await When('the user opens Continental Account login'); 
    await Then('the email and password fields should be displayed'); 
    await And('the user provides username as "td.Username" and password as "td.Password" from test data'); 
    await And('the user clicks on the login button'); 
    await Then('the user should be logged in successfully'); 
    await And('wait for the home screen to load completely'); 
    await Then('the user should see the home screen'); 
    await And('verify the conveyor count is displayed on the home screen'); 
    await And('the user clicks on the conveyor card'); 
    await Then('the user should see the conveyor details screen'); 
    await And('verify the same conveyor count is displayed on the bottom of the conveyor details screen'); 
    await And('user clicks on add conveyor button'); 
    await Then('the user should see the add conveyor screen'); 
    await And('user provides the conveyor name as "td.ConveyorName" from test data'); 
    await And('user provides the customer site as "td.CustomerSite" from test data'); 
    await And('user clicks on the Create button'); 
    await Then('the user should see the conveyor details screen with the newly added conveyor'); 
    await And('verify the conveyor count is updated on the conveyor details screen after adding a new conveyor'); 
    await And('user clicks on home tab button'); 
    await Then('the user should see the home screen'); 
    await And('verify the conveyor count is updated on the home screen after adding a new conveyor'); 
  });

});

// == technical section ==

test.beforeAll('BeforeAll Hooks', ({ $runBeforeAllHooks }) => $runBeforeAllHooks(test, {  }, bddFileData));
test.afterAll('AfterAll Hooks', ({ $registerAfterAllHooks }) => $registerAfterAllHooks(test, {  }, bddFileData));
test.beforeEach('BeforeEach Hooks', ({ $runScenarioHooks }) => $runScenarioHooks('before', {  }));
test.afterEach('AfterEach Hooks', ({ $runScenarioHooks }) => $runScenarioHooks('after', {  }));

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('../features/regression/login/app-launch.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
  $world: [({ world }, use) => use(world), { scope: 'test', box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":6,"pickleLine":8,"timeout":300000,"tags":["@regression","@android","@launch","@login","@DataFile:resources/data/testdata.csv","@Key:app_launch_login","@timeout:300000","@conveyorpoc","@runThis"],"steps":[{"pwStepLine":7,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"Given the Conti+ app is launched","stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":10,"keywordType":"Context","textWithKeyword":"And the Conti+ app has loaded completely","stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":11,"keywordType":"Action","textWithKeyword":"When the user accepts all consent options","stepMatchArguments":[]},{"pwStepLine":10,"gherkinStepLine":12,"keywordType":"Outcome","textWithKeyword":"Then the Welcome screen should be displayed","stepMatchArguments":[]},{"pwStepLine":11,"gherkinStepLine":13,"keywordType":"Action","textWithKeyword":"When the user opens Continental Account login","stepMatchArguments":[]},{"pwStepLine":12,"gherkinStepLine":14,"keywordType":"Outcome","textWithKeyword":"Then the email and password fields should be displayed","stepMatchArguments":[]},{"pwStepLine":13,"gherkinStepLine":15,"keywordType":"Outcome","textWithKeyword":"And the user provides username as \"td.Username\" and password as \"td.Password\" from test data","stepMatchArguments":[{"group":{"start":30,"value":"\"td.Username\"","children":[{"start":31,"value":"td.Username","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"},{"group":{"start":60,"value":"\"td.Password\"","children":[{"start":61,"value":"td.Password","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":14,"gherkinStepLine":16,"keywordType":"Outcome","textWithKeyword":"And the user clicks on the login button","stepMatchArguments":[]},{"pwStepLine":15,"gherkinStepLine":17,"keywordType":"Outcome","textWithKeyword":"Then the user should be logged in successfully","stepMatchArguments":[]},{"pwStepLine":16,"gherkinStepLine":18,"keywordType":"Outcome","textWithKeyword":"And wait for the home screen to load completely","stepMatchArguments":[]},{"pwStepLine":17,"gherkinStepLine":19,"keywordType":"Outcome","textWithKeyword":"Then the user should see the home screen","stepMatchArguments":[]},{"pwStepLine":18,"gherkinStepLine":20,"keywordType":"Outcome","textWithKeyword":"And verify the conveyor count is displayed on the home screen","stepMatchArguments":[]},{"pwStepLine":19,"gherkinStepLine":21,"keywordType":"Outcome","textWithKeyword":"And the user clicks on the conveyor card","stepMatchArguments":[]},{"pwStepLine":20,"gherkinStepLine":22,"keywordType":"Outcome","textWithKeyword":"Then the user should see the conveyor details screen","stepMatchArguments":[]},{"pwStepLine":21,"gherkinStepLine":23,"keywordType":"Outcome","textWithKeyword":"And verify the same conveyor count is displayed on the bottom of the conveyor details screen","stepMatchArguments":[]},{"pwStepLine":22,"gherkinStepLine":24,"keywordType":"Outcome","textWithKeyword":"And user clicks on add conveyor button","stepMatchArguments":[]},{"pwStepLine":23,"gherkinStepLine":25,"keywordType":"Outcome","textWithKeyword":"Then the user should see the add conveyor screen","stepMatchArguments":[]},{"pwStepLine":24,"gherkinStepLine":26,"keywordType":"Outcome","textWithKeyword":"And user provides the conveyor name as \"td.ConveyorName\" from test data","stepMatchArguments":[{"group":{"start":35,"value":"\"td.ConveyorName\"","children":[{"start":36,"value":"td.ConveyorName","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":25,"gherkinStepLine":27,"keywordType":"Outcome","textWithKeyword":"And user provides the customer site as \"td.CustomerSite\" from test data","stepMatchArguments":[{"group":{"start":35,"value":"\"td.CustomerSite\"","children":[{"start":36,"value":"td.CustomerSite","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":26,"gherkinStepLine":28,"keywordType":"Outcome","textWithKeyword":"And user clicks on the Create button","stepMatchArguments":[]},{"pwStepLine":27,"gherkinStepLine":29,"keywordType":"Outcome","textWithKeyword":"Then the user should see the conveyor details screen with the newly added conveyor","stepMatchArguments":[]},{"pwStepLine":28,"gherkinStepLine":30,"keywordType":"Outcome","textWithKeyword":"And verify the conveyor count is updated on the conveyor details screen after adding a new conveyor","stepMatchArguments":[]},{"pwStepLine":29,"gherkinStepLine":31,"keywordType":"Outcome","textWithKeyword":"And user clicks on home tab button","stepMatchArguments":[]},{"pwStepLine":30,"gherkinStepLine":32,"keywordType":"Outcome","textWithKeyword":"Then the user should see the home screen","stepMatchArguments":[]},{"pwStepLine":31,"gherkinStepLine":33,"keywordType":"Outcome","textWithKeyword":"And verify the conveyor count is updated on the home screen after adding a new conveyor","stepMatchArguments":[]}]},
]; // bdd-data-end
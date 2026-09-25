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
    await And('the user clicks on add button in dashboard'); 
    await Then('the user should see the list of module'); 
    await And('the user clicks on the Add Conveyor module'); 
    await Then('the user should see the add conveyor screen'); 
    await And('the user clicks cancel button'); 
    await Then('the user should see the home screen'); 
    await And('the user clicks on Conveyor tab in the bottom navigation'); 
    await Then('the user should see the conveyor details screen'); 
    await And('the user clicks on add button in conveyor details screen'); 
    await Then('the user should see the add conveyor screen'); 
    await And('the user clicks back button'); 
    await Then('the user should see the conveyor details screen'); 
    await And('the user clicks on Profile icon from top right corner'); 
    await Then('the user should see the profile screen'); 
    await And('the user clicks on Logout button'); 
    await And('the user should be logged out successfully'); 
    await Then('the Welcome screen should be displayed'); 
  });

  test('Verify Conveyor Inspect upload functionality in the Conti+ app', { tag: ['@regression', '@android', '@launch', '@login', '@DataFile:resources/data/testdata.csv', '@Key:app_launch_login', '@timeout:300000', '@conveyorpoc', '@runThis1'] }, async ({ Given, When, Then, And }) => { 
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
    await And('the user clicks on Conveyor Inspect card in the home screen'); 
    await Then('the user should see the Conveyor Inspect list screen'); 
    await And('the user clicks the first event in the list'); 
    await Then('the user should see the View Conveyor Inspect Event details screen'); 
    await And('the user clicks on the Upload button'); 
    await Then('the user should see the Edit Conveyor Inspect Event screen'); 
    await And('the user fills the inspection date field with today\'s date'); 
    await And('the user fills the inspector time field with current time'); 
    await And('the user clicks on the Upload button from LHS'); 
    await And('the user clicks Save button'); 
    await Then('"Upload successful" message should be displayed'); 
    await Then('the user should see the View Conveyor Inspect Event details screen'); 
    await And('the user clicks back button'); 
    await Then('the user should see the Conveyor Inspect list screen'); 
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
  {"pwTestLine":6,"pickleLine":8,"timeout":300000,"tags":["@regression","@android","@launch","@login","@DataFile:resources/data/testdata.csv","@Key:app_launch_login","@timeout:300000","@conveyorpoc","@runThis"],"steps":[{"pwStepLine":7,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"Given the Conti+ app is launched","stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":10,"keywordType":"Context","textWithKeyword":"And the Conti+ app has loaded completely","stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":11,"keywordType":"Action","textWithKeyword":"When the user accepts all consent options","stepMatchArguments":[]},{"pwStepLine":10,"gherkinStepLine":12,"keywordType":"Outcome","textWithKeyword":"Then the Welcome screen should be displayed","stepMatchArguments":[]},{"pwStepLine":11,"gherkinStepLine":13,"keywordType":"Action","textWithKeyword":"When the user opens Continental Account login","stepMatchArguments":[]},{"pwStepLine":12,"gherkinStepLine":14,"keywordType":"Outcome","textWithKeyword":"Then the email and password fields should be displayed","stepMatchArguments":[]},{"pwStepLine":13,"gherkinStepLine":15,"keywordType":"Outcome","textWithKeyword":"And the user provides username as \"td.Username\" and password as \"td.Password\" from test data","stepMatchArguments":[{"group":{"start":30,"value":"\"td.Username\"","children":[{"start":31,"value":"td.Username","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"},{"group":{"start":60,"value":"\"td.Password\"","children":[{"start":61,"value":"td.Password","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":14,"gherkinStepLine":16,"keywordType":"Outcome","textWithKeyword":"And the user clicks on the login button","stepMatchArguments":[]},{"pwStepLine":15,"gherkinStepLine":17,"keywordType":"Outcome","textWithKeyword":"Then the user should be logged in successfully","stepMatchArguments":[]},{"pwStepLine":16,"gherkinStepLine":18,"keywordType":"Outcome","textWithKeyword":"And wait for the home screen to load completely","stepMatchArguments":[]},{"pwStepLine":17,"gherkinStepLine":19,"keywordType":"Outcome","textWithKeyword":"Then the user should see the home screen","stepMatchArguments":[]},{"pwStepLine":18,"gherkinStepLine":20,"keywordType":"Outcome","textWithKeyword":"And verify the conveyor count is displayed on the home screen","stepMatchArguments":[]},{"pwStepLine":19,"gherkinStepLine":21,"keywordType":"Outcome","textWithKeyword":"And the user clicks on the conveyor card","stepMatchArguments":[]},{"pwStepLine":20,"gherkinStepLine":22,"keywordType":"Outcome","textWithKeyword":"Then the user should see the conveyor details screen","stepMatchArguments":[]},{"pwStepLine":21,"gherkinStepLine":23,"keywordType":"Outcome","textWithKeyword":"And verify the same conveyor count is displayed on the bottom of the conveyor details screen","stepMatchArguments":[]},{"pwStepLine":22,"gherkinStepLine":24,"keywordType":"Outcome","textWithKeyword":"And user clicks on add conveyor button","stepMatchArguments":[]},{"pwStepLine":23,"gherkinStepLine":25,"keywordType":"Outcome","textWithKeyword":"Then the user should see the add conveyor screen","stepMatchArguments":[]},{"pwStepLine":24,"gherkinStepLine":26,"keywordType":"Outcome","textWithKeyword":"And user provides the conveyor name as \"td.ConveyorName\" from test data","stepMatchArguments":[{"group":{"start":35,"value":"\"td.ConveyorName\"","children":[{"start":36,"value":"td.ConveyorName","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":25,"gherkinStepLine":27,"keywordType":"Outcome","textWithKeyword":"And user provides the customer site as \"td.CustomerSite\" from test data","stepMatchArguments":[{"group":{"start":35,"value":"\"td.CustomerSite\"","children":[{"start":36,"value":"td.CustomerSite","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":26,"gherkinStepLine":28,"keywordType":"Outcome","textWithKeyword":"And user clicks on the Create button","stepMatchArguments":[]},{"pwStepLine":27,"gherkinStepLine":29,"keywordType":"Outcome","textWithKeyword":"Then the user should see the conveyor details screen with the newly added conveyor","stepMatchArguments":[]},{"pwStepLine":28,"gherkinStepLine":30,"keywordType":"Outcome","textWithKeyword":"And verify the conveyor count is updated on the conveyor details screen after adding a new conveyor","stepMatchArguments":[]},{"pwStepLine":29,"gherkinStepLine":31,"keywordType":"Outcome","textWithKeyword":"And user clicks on home tab button","stepMatchArguments":[]},{"pwStepLine":30,"gherkinStepLine":32,"keywordType":"Outcome","textWithKeyword":"Then the user should see the home screen","stepMatchArguments":[]},{"pwStepLine":31,"gherkinStepLine":33,"keywordType":"Outcome","textWithKeyword":"And verify the conveyor count is updated on the home screen after adding a new conveyor","stepMatchArguments":[]},{"pwStepLine":32,"gherkinStepLine":34,"keywordType":"Outcome","textWithKeyword":"And the user clicks on add button in dashboard","stepMatchArguments":[]},{"pwStepLine":33,"gherkinStepLine":35,"keywordType":"Outcome","textWithKeyword":"Then the user should see the list of module","stepMatchArguments":[]},{"pwStepLine":34,"gherkinStepLine":36,"keywordType":"Outcome","textWithKeyword":"And the user clicks on the Add Conveyor module","stepMatchArguments":[]},{"pwStepLine":35,"gherkinStepLine":37,"keywordType":"Outcome","textWithKeyword":"Then the user should see the add conveyor screen","stepMatchArguments":[]},{"pwStepLine":36,"gherkinStepLine":38,"keywordType":"Outcome","textWithKeyword":"And the user clicks cancel button","stepMatchArguments":[]},{"pwStepLine":37,"gherkinStepLine":39,"keywordType":"Outcome","textWithKeyword":"Then the user should see the home screen","stepMatchArguments":[]},{"pwStepLine":38,"gherkinStepLine":40,"keywordType":"Outcome","textWithKeyword":"And the user clicks on Conveyor tab in the bottom navigation","stepMatchArguments":[]},{"pwStepLine":39,"gherkinStepLine":41,"keywordType":"Outcome","textWithKeyword":"Then the user should see the conveyor details screen","stepMatchArguments":[]},{"pwStepLine":40,"gherkinStepLine":42,"keywordType":"Outcome","textWithKeyword":"And the user clicks on add button in conveyor details screen","stepMatchArguments":[]},{"pwStepLine":41,"gherkinStepLine":43,"keywordType":"Outcome","textWithKeyword":"Then the user should see the add conveyor screen","stepMatchArguments":[]},{"pwStepLine":42,"gherkinStepLine":44,"keywordType":"Outcome","textWithKeyword":"And the user clicks back button","stepMatchArguments":[]},{"pwStepLine":43,"gherkinStepLine":45,"keywordType":"Outcome","textWithKeyword":"Then the user should see the conveyor details screen","stepMatchArguments":[]},{"pwStepLine":44,"gherkinStepLine":46,"keywordType":"Outcome","textWithKeyword":"And the user clicks on Profile icon from top right corner","stepMatchArguments":[]},{"pwStepLine":45,"gherkinStepLine":47,"keywordType":"Outcome","textWithKeyword":"Then the user should see the profile screen","stepMatchArguments":[]},{"pwStepLine":46,"gherkinStepLine":48,"keywordType":"Outcome","textWithKeyword":"And the user clicks on Logout button","stepMatchArguments":[]},{"pwStepLine":47,"gherkinStepLine":49,"keywordType":"Outcome","textWithKeyword":"And the user should be logged out successfully","stepMatchArguments":[]},{"pwStepLine":48,"gherkinStepLine":50,"keywordType":"Outcome","textWithKeyword":"Then the Welcome screen should be displayed","stepMatchArguments":[]}]},
  {"pwTestLine":51,"pickleLine":54,"timeout":300000,"tags":["@regression","@android","@launch","@login","@DataFile:resources/data/testdata.csv","@Key:app_launch_login","@timeout:300000","@conveyorpoc","@runThis1"],"steps":[{"pwStepLine":52,"gherkinStepLine":55,"keywordType":"Context","textWithKeyword":"Given the Conti+ app is launched","stepMatchArguments":[]},{"pwStepLine":53,"gherkinStepLine":56,"keywordType":"Context","textWithKeyword":"And the Conti+ app has loaded completely","stepMatchArguments":[]},{"pwStepLine":54,"gherkinStepLine":57,"keywordType":"Action","textWithKeyword":"When the user accepts all consent options","stepMatchArguments":[]},{"pwStepLine":55,"gherkinStepLine":58,"keywordType":"Outcome","textWithKeyword":"Then the Welcome screen should be displayed","stepMatchArguments":[]},{"pwStepLine":56,"gherkinStepLine":59,"keywordType":"Action","textWithKeyword":"When the user opens Continental Account login","stepMatchArguments":[]},{"pwStepLine":57,"gherkinStepLine":60,"keywordType":"Outcome","textWithKeyword":"Then the email and password fields should be displayed","stepMatchArguments":[]},{"pwStepLine":58,"gherkinStepLine":61,"keywordType":"Outcome","textWithKeyword":"And the user provides username as \"td.Username\" and password as \"td.Password\" from test data","stepMatchArguments":[{"group":{"start":30,"value":"\"td.Username\"","children":[{"start":31,"value":"td.Username","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"},{"group":{"start":60,"value":"\"td.Password\"","children":[{"start":61,"value":"td.Password","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":59,"gherkinStepLine":62,"keywordType":"Outcome","textWithKeyword":"And the user clicks on the login button","stepMatchArguments":[]},{"pwStepLine":60,"gherkinStepLine":63,"keywordType":"Outcome","textWithKeyword":"Then the user should be logged in successfully","stepMatchArguments":[]},{"pwStepLine":61,"gherkinStepLine":64,"keywordType":"Outcome","textWithKeyword":"And wait for the home screen to load completely","stepMatchArguments":[]},{"pwStepLine":62,"gherkinStepLine":65,"keywordType":"Outcome","textWithKeyword":"Then the user should see the home screen","stepMatchArguments":[]},{"pwStepLine":63,"gherkinStepLine":80,"keywordType":"Outcome","textWithKeyword":"And the user clicks on Conveyor Inspect card in the home screen","stepMatchArguments":[]},{"pwStepLine":64,"gherkinStepLine":81,"keywordType":"Outcome","textWithKeyword":"Then the user should see the Conveyor Inspect list screen","stepMatchArguments":[]},{"pwStepLine":65,"gherkinStepLine":82,"keywordType":"Outcome","textWithKeyword":"And the user clicks the first event in the list","stepMatchArguments":[]},{"pwStepLine":66,"gherkinStepLine":83,"keywordType":"Outcome","textWithKeyword":"Then the user should see the View Conveyor Inspect Event details screen","stepMatchArguments":[]},{"pwStepLine":67,"gherkinStepLine":84,"keywordType":"Outcome","textWithKeyword":"And the user clicks on the Upload button","stepMatchArguments":[]},{"pwStepLine":68,"gherkinStepLine":85,"keywordType":"Outcome","textWithKeyword":"Then the user should see the Edit Conveyor Inspect Event screen","stepMatchArguments":[]},{"pwStepLine":69,"gherkinStepLine":86,"keywordType":"Outcome","textWithKeyword":"And the user fills the inspection date field with today's date","stepMatchArguments":[]},{"pwStepLine":70,"gherkinStepLine":87,"keywordType":"Outcome","textWithKeyword":"And the user fills the inspector time field with current time","stepMatchArguments":[]},{"pwStepLine":71,"gherkinStepLine":88,"keywordType":"Outcome","textWithKeyword":"And the user clicks on the Upload button from LHS","stepMatchArguments":[]},{"pwStepLine":72,"gherkinStepLine":89,"keywordType":"Outcome","textWithKeyword":"And the user clicks Save button","stepMatchArguments":[]},{"pwStepLine":73,"gherkinStepLine":90,"keywordType":"Outcome","textWithKeyword":"Then \"Upload successful\" message should be displayed","stepMatchArguments":[{"group":{"start":0,"value":"\"Upload successful\"","children":[{"start":1,"value":"Upload successful","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":74,"gherkinStepLine":91,"keywordType":"Outcome","textWithKeyword":"Then the user should see the View Conveyor Inspect Event details screen","stepMatchArguments":[]},{"pwStepLine":75,"gherkinStepLine":92,"keywordType":"Outcome","textWithKeyword":"And the user clicks back button","stepMatchArguments":[]},{"pwStepLine":76,"gherkinStepLine":93,"keywordType":"Outcome","textWithKeyword":"Then the user should see the Conveyor Inspect list screen","stepMatchArguments":[]}]},
]; // bdd-data-end
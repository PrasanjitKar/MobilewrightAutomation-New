// Generated from: ../features/regression/login/app-launch.feature
import { test } from "../../../../src/helper/test-fixtures.ts";

test.describe('Semnox Mobile App Flow', () => {

  test('Verify successful order placement flow', { tag: ['@regression', '@both', '@launch', '@login', '@DataFile:resources/data/testdata.csv', '@Key:app_launch_login', '@timeout:600000', '@runThisNow'] }, async ({ Given, When, Then, And }) => { 
    await Given('the app is launched'); 
    await When('the user is on login screen'); 
    await And('the user clicks on login button'); 
    await Then('the user should see the login screen'); 
    await And('the user provides the email as "td.Username"'); 
    await And('the user provides the password as "td.Password"'); 
    await And('the user taps on the login button'); 
    await Then('the user locates the store manually'); 
    await And('the user selects the location as SKIMMERSITEA'); 
    await And('the user confirms the location'); 
    await Then('the dashboard screen should be displayed successfully'); 
    await When('the user orders food as Chicken Biryani'); 
    await And('the user selects the payment method as card'); 
    await And('the user pays with card'); 
    await Then('the order should be placed successfully'); 
    await And('the user clicks on the back to home button'); 
    await Then('the dashboard screen should be displayed successfully'); 
    await And('the user logs out from the application'); 
    await Then('the user is on login screen'); 
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
  {"pwTestLine":6,"pickleLine":5,"timeout":600000,"tags":["@regression","@both","@launch","@login","@DataFile:resources/data/testdata.csv","@Key:app_launch_login","@timeout:600000","@runThisNow"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given the app is launched","stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Action","textWithKeyword":"When the user is on login screen","stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":8,"keywordType":"Action","textWithKeyword":"And the user clicks on login button","stepMatchArguments":[]},{"pwStepLine":10,"gherkinStepLine":9,"keywordType":"Outcome","textWithKeyword":"Then the user should see the login screen","stepMatchArguments":[]},{"pwStepLine":11,"gherkinStepLine":10,"keywordType":"Outcome","textWithKeyword":"And the user provides the email as \"td.Username\"","stepMatchArguments":[{"group":{"start":31,"value":"\"td.Username\"","children":[{"start":32,"value":"td.Username","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":12,"gherkinStepLine":11,"keywordType":"Outcome","textWithKeyword":"And the user provides the password as \"td.Password\"","stepMatchArguments":[{"group":{"start":34,"value":"\"td.Password\"","children":[{"start":35,"value":"td.Password","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":13,"gherkinStepLine":12,"keywordType":"Outcome","textWithKeyword":"And the user taps on the login button","stepMatchArguments":[]},{"pwStepLine":14,"gherkinStepLine":13,"keywordType":"Outcome","textWithKeyword":"Then the user locates the store manually","stepMatchArguments":[]},{"pwStepLine":15,"gherkinStepLine":14,"keywordType":"Outcome","textWithKeyword":"And the user selects the location as SKIMMERSITEA","stepMatchArguments":[]},{"pwStepLine":16,"gherkinStepLine":15,"keywordType":"Outcome","textWithKeyword":"And the user confirms the location","stepMatchArguments":[]},{"pwStepLine":17,"gherkinStepLine":16,"keywordType":"Outcome","textWithKeyword":"Then the dashboard screen should be displayed successfully","stepMatchArguments":[]},{"pwStepLine":18,"gherkinStepLine":17,"keywordType":"Action","textWithKeyword":"When the user orders food as Chicken Biryani","stepMatchArguments":[]},{"pwStepLine":19,"gherkinStepLine":18,"keywordType":"Action","textWithKeyword":"And the user selects the payment method as card","stepMatchArguments":[]},{"pwStepLine":20,"gherkinStepLine":19,"keywordType":"Action","textWithKeyword":"And the user pays with card","stepMatchArguments":[]},{"pwStepLine":21,"gherkinStepLine":20,"keywordType":"Outcome","textWithKeyword":"Then the order should be placed successfully","stepMatchArguments":[]},{"pwStepLine":22,"gherkinStepLine":21,"keywordType":"Outcome","textWithKeyword":"And the user clicks on the back to home button","stepMatchArguments":[]},{"pwStepLine":23,"gherkinStepLine":22,"keywordType":"Outcome","textWithKeyword":"Then the dashboard screen should be displayed successfully","stepMatchArguments":[]},{"pwStepLine":24,"gherkinStepLine":23,"keywordType":"Outcome","textWithKeyword":"And the user logs out from the application","stepMatchArguments":[]},{"pwStepLine":25,"gherkinStepLine":24,"keywordType":"Outcome","textWithKeyword":"Then the user is on login screen","stepMatchArguments":[]}]},
]; // bdd-data-end
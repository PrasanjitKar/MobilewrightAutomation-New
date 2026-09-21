// Generated from: ../features/smoke/login.feature
import { test } from "../../../src/helper/test-fixtures.ts";

test.describe('Login smoke — Welcome and Login screen essentials', () => {

  test.beforeEach('Background', async ({ Given, When, And }, testInfo) => { if (testInfo.error) return;
    await Given('the Conti+ app is launched'); 
    await And('the Conti+ app has loaded completely'); 
    await When('the user accepts all consent options'); 
  });
  
  test('Splash screen transitions automatically to the Welcome screen', { tag: ['@smoke', '@both', '@login', '@TC-LOGIN-001'] }, async ({ Then }) => { 
    await Then('the Welcome screen should be displayed'); 
  });

  test('Welcome screen displays all required UI elements', { tag: ['@smoke', '@both', '@login', '@TC-LOGIN-002'] }, async ({ Then, And }) => { 
    await Then('the Welcome screen should be displayed'); 
    await And('the Welcome screen displays the Contiplus logo, heading, both login buttons and separator'); 
  });

  test('Login screen displays all required UI elements', { tag: ['@smoke', '@both', '@login', '@TC-LOGIN-005'] }, async ({ When, Then, And }) => { 
    await Then('the Welcome screen should be displayed'); 
    await When('the user opens Continental Account login'); 
    await Then('the email and password fields should be displayed'); 
    await And('the Login screen displays a "Back" button'); 
    await And('the Login screen displays the "Welcome!" heading'); 
    await And('the "Forgot password" link is visible on the Login screen'); 
  });

  test('Successful login with valid credentials navigates to the Home screen', { tag: ['@smoke', '@both', '@login', '@TC-LOGIN-006', '@DataFile:resources/data/smokedata.csv', '@Key:login_valid', '@timeout:300000'] }, async ({ When, Then, And }) => { 
    await Then('the Welcome screen should be displayed'); 
    await When('the user opens Continental Account login'); 
    await Then('the email and password fields should be displayed'); 
    await And('the user provides username as "td.Username" and password as "td.Password" from test data'); 
    await And('the user clicks on the login button'); 
    await Then('the user should be logged in successfully'); 
    await And('wait for the home screen to load completely'); 
    await Then('the user should see the home screen'); 
  });

});

// == technical section ==

test.beforeAll('BeforeAll Hooks', ({ $runBeforeAllHooks }) => $runBeforeAllHooks(test, {  }, bddFileData));
test.afterAll('AfterAll Hooks', ({ $registerAfterAllHooks }) => $registerAfterAllHooks(test, {  }, bddFileData));
test.beforeEach('BeforeEach Hooks', ({ $runScenarioHooks }) => $runScenarioHooks('before', {  }));
test.afterEach('AfterEach Hooks', ({ $runScenarioHooks }) => $runScenarioHooks('after', {  }));

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('../features/smoke/login.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
  $world: [({ world }, use) => use(world), { scope: 'test', box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":12,"pickleLine":19,"tags":["@smoke","@both","@login","@TC-LOGIN-001"],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given the Conti+ app is launched","isBg":true,"stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"And the Conti+ app has loaded completely","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":10,"keywordType":"Action","textWithKeyword":"When the user accepts all consent options","isBg":true,"stepMatchArguments":[]},{"pwStepLine":13,"gherkinStepLine":20,"keywordType":"Outcome","textWithKeyword":"Then the Welcome screen should be displayed","stepMatchArguments":[]}]},
  {"pwTestLine":16,"pickleLine":24,"tags":["@smoke","@both","@login","@TC-LOGIN-002"],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given the Conti+ app is launched","isBg":true,"stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"And the Conti+ app has loaded completely","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":10,"keywordType":"Action","textWithKeyword":"When the user accepts all consent options","isBg":true,"stepMatchArguments":[]},{"pwStepLine":17,"gherkinStepLine":25,"keywordType":"Outcome","textWithKeyword":"Then the Welcome screen should be displayed","stepMatchArguments":[]},{"pwStepLine":18,"gherkinStepLine":26,"keywordType":"Outcome","textWithKeyword":"And the Welcome screen displays the Contiplus logo, heading, both login buttons and separator","stepMatchArguments":[]}]},
  {"pwTestLine":21,"pickleLine":30,"tags":["@smoke","@both","@login","@TC-LOGIN-005"],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given the Conti+ app is launched","isBg":true,"stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"And the Conti+ app has loaded completely","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":10,"keywordType":"Action","textWithKeyword":"When the user accepts all consent options","isBg":true,"stepMatchArguments":[]},{"pwStepLine":22,"gherkinStepLine":31,"keywordType":"Outcome","textWithKeyword":"Then the Welcome screen should be displayed","stepMatchArguments":[]},{"pwStepLine":23,"gherkinStepLine":32,"keywordType":"Action","textWithKeyword":"When the user opens Continental Account login","stepMatchArguments":[]},{"pwStepLine":24,"gherkinStepLine":33,"keywordType":"Outcome","textWithKeyword":"Then the email and password fields should be displayed","stepMatchArguments":[]},{"pwStepLine":25,"gherkinStepLine":34,"keywordType":"Outcome","textWithKeyword":"And the Login screen displays a \"Back\" button","stepMatchArguments":[{"group":{"start":28,"value":"\"Back\"","children":[{"start":29,"value":"Back","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":26,"gherkinStepLine":35,"keywordType":"Outcome","textWithKeyword":"And the Login screen displays the \"Welcome!\" heading","stepMatchArguments":[{"group":{"start":30,"value":"\"Welcome!\"","children":[{"start":31,"value":"Welcome!","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":27,"gherkinStepLine":36,"keywordType":"Outcome","textWithKeyword":"And the \"Forgot password\" link is visible on the Login screen","stepMatchArguments":[]}]},
  {"pwTestLine":30,"pickleLine":40,"timeout":300000,"tags":["@smoke","@both","@login","@TC-LOGIN-006","@DataFile:resources/data/smokedata.csv","@Key:login_valid","@timeout:300000"],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given the Conti+ app is launched","isBg":true,"stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"And the Conti+ app has loaded completely","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":10,"keywordType":"Action","textWithKeyword":"When the user accepts all consent options","isBg":true,"stepMatchArguments":[]},{"pwStepLine":31,"gherkinStepLine":41,"keywordType":"Outcome","textWithKeyword":"Then the Welcome screen should be displayed","stepMatchArguments":[]},{"pwStepLine":32,"gherkinStepLine":42,"keywordType":"Action","textWithKeyword":"When the user opens Continental Account login","stepMatchArguments":[]},{"pwStepLine":33,"gherkinStepLine":43,"keywordType":"Outcome","textWithKeyword":"Then the email and password fields should be displayed","stepMatchArguments":[]},{"pwStepLine":34,"gherkinStepLine":44,"keywordType":"Outcome","textWithKeyword":"And the user provides username as \"td.Username\" and password as \"td.Password\" from test data","stepMatchArguments":[{"group":{"start":30,"value":"\"td.Username\"","children":[{"start":31,"value":"td.Username","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"},{"group":{"start":60,"value":"\"td.Password\"","children":[{"start":61,"value":"td.Password","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":35,"gherkinStepLine":45,"keywordType":"Outcome","textWithKeyword":"And the user clicks on the login button","stepMatchArguments":[]},{"pwStepLine":36,"gherkinStepLine":46,"keywordType":"Outcome","textWithKeyword":"Then the user should be logged in successfully","stepMatchArguments":[]},{"pwStepLine":37,"gherkinStepLine":47,"keywordType":"Outcome","textWithKeyword":"And wait for the home screen to load completely","stepMatchArguments":[]},{"pwStepLine":38,"gherkinStepLine":48,"keywordType":"Outcome","textWithKeyword":"Then the user should see the home screen","stepMatchArguments":[]}]},
]; // bdd-data-end
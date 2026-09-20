import { test as mobilewrightTest } from '@mobilewright/test';
import { mergeTests, type TestInfo } from '@playwright/test';
import { test as bddTest } from 'playwright-bdd';
import { ScenarioContext } from '../utils/ScenarioContext';

const base = mergeTests(bddTest, mobilewrightTest);

export const test = base.extend<{ world: ScenarioContext }>({
  world: [
    // testInfo is Playwright's third fixture-function argument — it holds the live TestInfo for the running test
    async ({ screen, platform, device, bundleId, installApps }, use, testInfo: TestInfo) => {
      const world = new ScenarioContext();
      world.screen = screen;
      world.platform = platform;
      world.device = device;
      world.bundleId = bundleId;
      world.installApps = installApps;
      world.testInfo = testInfo;
      await use(world);
    },
    { scope: 'test' },
  ],
});

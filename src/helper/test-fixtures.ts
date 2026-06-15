import { test as base } from '@mobilewright/test';
import type { TestInfo } from '@playwright/test';
import { ScenarioContext } from '../utils/ScenarioContext';

export const test = base.extend<{ world: ScenarioContext }>({
  world: [
    // testInfo is Playwright's third fixture-function argument — it holds the live TestInfo for the running test
    async ({ page, screen, platform, context }, use, testInfo: TestInfo) => {
      const world = new ScenarioContext();
      world.page = page;
      world.screen = screen;
      world.platform = platform;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      world.context = context as any;
      world.testInfo = testInfo;
      await use(world);
    },
    { scope: 'test' },
  ],
});

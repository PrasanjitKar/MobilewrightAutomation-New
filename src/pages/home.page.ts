import { Screen } from 'mobilewright';
import { HTMLSubStepLogger } from '../utils/htmlSubStepLogger';
import BasePage from './base.page';
import { expect } from '@mobilewright/test';

export class HomePage extends BasePage {
  constructor(screen: Screen, subStepLogger?: HTMLSubStepLogger) {
    super(screen, subStepLogger);
  }

  get homeIndicator() {
    return this.screen.getByLabel('home-screen');
  }

  async verifyHomePageVisible(): Promise<void> {
    await expect(this.homeIndicator).toBeVisible({ timeout: 15000 });
  }
}

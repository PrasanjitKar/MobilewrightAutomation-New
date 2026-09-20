import { Page, BrowserContext, APIRequestContext, TestInfo } from '@playwright/test';
import { Device, Screen } from 'mobilewright';
import { Logger } from 'winston';
import { HTMLSubStepLogger } from './htmlSubStepLogger';
 
import { LoginPage } from '../pages/login.page';
import { HomePage } from '../pages/home.page';
import { AppLaunchPage } from '../pages/app-launch.page';
import { ConveyorPage } from '../pages/conveyor.page';
import { ApiFactory } from '../helper/api-factory';
import { ConfigurationManager } from '../config/ConfigurationManager';

export interface ISoftAssertState {
  currentStep: string;
  softAssertErrors: string[];
  softAssertStepFailures: Array<{ step: string; message: string }>;
  currentStepSoftFailures: string[];
  currentStepHasSoftFailure: boolean;
  currentStepHasWarning: boolean;
}

export class ScenarioContext implements ISoftAssertState {
  // Browser / page (injected by world fixture in test-fixtures.ts)
  page?: Page;
  screen!: Screen;
  device!: Device;
  bundleId?: string;
  installApps?: string | string[];
  platform!: 'ios' | 'android' | undefined;
  context?: BrowserContext;
  testInfo!: TestInfo;

  // Logging
  logger!: Logger;
  subStepLogger!: HTMLSubStepLogger;

  // API
  apiFactory?: ApiFactory;
  api?: APIRequestContext;

  // Scenario data
  testData: Record<string, unknown> = {};
  env: string = '';
  scenarioStart: number = 0;

  // Step tracking
  currentStep: string = '';

  // Soft-assertion buckets (reset per scenario / step in hooks)
  softAssertErrors: string[] = [];
  softAssertStepFailures: Array<{ step: string; message: string }> = [];
  currentStepSoftFailures: string[] = [];
  currentStepHasSoftFailure: boolean = false;
  currentStepHasWarning: boolean = false;

  // Lazy-cached page objects (one instance per scenario, created on first access)
  private _loginPage?: LoginPage;
  private _homePage?: HomePage;
  private _appLaunchPage?: AppLaunchPage;
  private _conveyorPage?: ConveyorPage;

  get appLaunchPage(): AppLaunchPage {
    if (!this._appLaunchPage) {
      this._appLaunchPage = new AppLaunchPage(
        this.screen,
        this.device,
        this.bundleId,
        this.installApps,
        this.subStepLogger,
      );
    }
    return this._appLaunchPage;
  }

  get conveyorPage(): ConveyorPage {
    if (!this._conveyorPage) {
      this._conveyorPage = new ConveyorPage(this.screen, this.subStepLogger);
    }
    return this._conveyorPage;
  }

  get loginPage(): LoginPage {
    if (!this._loginPage) {
      const platform = (this.platform ?? ConfigurationManager.config().platform) as 'ios' | 'android' | undefined;
      this._loginPage = new LoginPage(this.screen, platform, this.subStepLogger);
    }
    return this._loginPage;
  }

  get homePage(): HomePage {
    if (!this._homePage) {
      this._homePage = new HomePage(this.screen, this.subStepLogger);
    }
    return this._homePage;
  }

  // Cucumber-compatible attach — delegates to Playwright's testInfo.attach()
  async attach(data: Buffer | string, mediaType?: string): Promise<void> {
    const contentType = mediaType ?? 'text/plain';
    const name = contentType.startsWith('image/')
      ? 'screenshot'
      : contentType === 'video/webm'
        ? 'video'
        : contentType === 'text/html'
          ? 'sub-step'
          : 'attachment';
    await this.testInfo.attach(name, { body: data as string | Buffer, contentType });
  }
}

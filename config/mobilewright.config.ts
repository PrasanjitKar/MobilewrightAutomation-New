import { defineConfig } from 'mobilewright';
import { defineBddConfig } from 'playwright-bdd';
import { iosConfig } from '../src/config/ios';
import { androidConfig } from '../src/config/android';

const testDir = defineBddConfig({
  features: '../features/**/*.feature',
  featuresRoot: '..',
  steps: ['../src/helper/**/*.ts', '../src/steps/**/*.ts'],
  outputDir: '../.features-gen',
  missingSteps: 'fail-on-run',
});

const platform = process.env['PLATFORM'];

const iosProject = () => {
  return {
    appPath: iosConfig.appPath,
    project: {
      name: 'ios',
      grep: /@ios|@both/,
      use: {
        platform: 'ios',
        bundleId: iosConfig.bundleId,
        installApps: iosConfig.appPath,
        appLaunchTimeout: 60_000,
        installTimeout: 180_000,
        ...(iosConfig.udid ? {} : { deviceName: new RegExp(iosConfig.deviceName) }),
      },
    },
  };
};

const androidProject = () => {
  return {
    appPath: androidConfig.appPath,
    project: {
      name: 'android',
      grep: /@android|@both/,
      use: {
        platform: 'android',
        bundleId: androidConfig.packageName,
        installApps: androidConfig.appPath,
        appLaunchTimeout: 60_000,
        installTimeout: 180_000,
        ...(androidConfig.serial ? {} : { deviceName: new RegExp(androidConfig.deviceName) }),
      },
    },
  };
};

const platformConfigs =
  platform === 'ios' ? [iosProject()] : platform === 'android' ? [androidProject()] : [iosProject(), androidProject()];

const projects = platformConfigs.map(({ project }) => project);
const installApps = platformConfigs.map(({ appPath }) => appPath);
const androidDeviceId = androidConfig.serial?.startsWith('emulator-') ? undefined : androidConfig.serial;
const deviceId = platform === 'ios' ? iosConfig.udid : platform === 'android' ? androidDeviceId : undefined;

export default defineConfig({
  testDir,
  timeout: 120_000,
  retries: process.env['CI'] ? 2 : 0,
  workers: 2,
  fullyParallel: true,
  deviceId,
  autoAppLaunch: false,
  installApps,
  reporter: [
    ['list'],
    ['allure-playwright', { outputFolder: 'allure-results' }],
    ['html', { outputFolder: 'reports', open: 'never' }],
  ],
  projects,
});
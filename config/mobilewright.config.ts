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
        ...(iosConfig.udid
          ? { deviceId: iosConfig.udid }
          : { deviceName: new RegExp(iosConfig.deviceName, 'i') }),
      },
    },
  };
};

const getAndroidDeviceConfig = () => {
  const serial = androidConfig.serial;
  const name = androidConfig.deviceName;

  // 1. If explicit real device serial or device ID is provided (e.g. RZ8T315G0KB)
  if (serial && !serial.startsWith('emulator-')) {
    return { deviceId: serial };
  }

  // 2. If emulator serial is provided (e.g. emulator-5554), target any emulator AVD
  if (serial && serial.startsWith('emulator-')) {
    return { deviceName: /(emulator|pixel|sdk_gphone)/i };
  }

  // 3. If explicit device name is given
  if (name && !name.startsWith('emulator-')) {
    return { deviceName: new RegExp(name.replace(/_/g, '[_ ]?'), 'i') };
  }

  // 4. Default to emulator
  return { deviceName: /(emulator|pixel|sdk_gphone)/i };
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
        ...getAndroidDeviceConfig(),
      },
    },
  };
};

const platformConfigs =
  platform === 'ios' ? [iosProject()] : platform === 'android' ? [androidProject()] : [iosProject(), androidProject()];

const projects = platformConfigs.map(({ project }) => project);
const installApps = platformConfigs.map(({ appPath }) => appPath);
const deviceId = platform === 'ios' ? iosConfig.udid : undefined;

export default defineConfig({
  testDir,
  timeout: 300_000,
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
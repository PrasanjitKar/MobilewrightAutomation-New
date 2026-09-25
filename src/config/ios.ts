import './env';

function required(key: string): string {
  const value = process.env[key];
  if (value) return value;
  if (process.env['PLATFORM'] === 'android') return '';
  throw new Error(`Missing required env var: ${key}`);
}

export const iosConfig = {
  bundleId: required('IOS_BUNDLE_ID'),
  appPath: required('IOS_APP'),
  deviceName: required('IOS_DEVICE_NAME'),
  udid: process.env['IOS_UDID'],
  platformVersion: process.env['IOS_PLATFORM_VERSION'],
} as const;

import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

interface AppConfig {
  defaultTimeout: number;
  /** Base URL of the Conti+ web app for the active environment (BASEURL in resources/.env.<ENV>). */
  baseUrl: string;
  authToken: string;
  orgId: string;
  apiTimeout: number;
  screenshotPath: string;
  videoPath: string;
  tracePath: string;
  traceEnabled: boolean;
  videoRecording: boolean;
  envName: string;
  /** Admin username used by auth-setup to perform the one-time global login.
   *  Set ADMIN_USERNAME in the active resources/.env.<ENV> file. */
  adminUsername: string;
  /** Target mobile platform — set via configuration.json or PLATFORM env var. */
  platform: 'ios' | 'android';
}

export class ConfigurationManager {
  private static _config: AppConfig | undefined;

  static config(): AppConfig {
    if (!this._config) {
      this._config = this.load();
    }
    return this._config;
  }

  static reset(): void {
    this._config = undefined;
  }

  private static load(): AppConfig {
    const envName = process.env.ENV || 'STG';
    const envFilePath = path.resolve(process.cwd(), `resources/.env.${envName}`);

    if (fs.existsSync(envFilePath)) {
      dotenv.config({ override: true, path: envFilePath });
    }

    const configPath = path.resolve(process.cwd(), 'resources/configuration.json');
    const raw = JSON.parse(fs.readFileSync(configPath, 'utf8'));

    return {
      defaultTimeout: Number(raw.defaultTimeOut) || 120000,
      baseUrl: process.env.BASEURL || 'https://stage.contiplus.net/',
      authToken: process.env.AUTH_TOKEN || '',
      orgId: process.env.ORG_ID || '',
      apiTimeout: Number(process.env.API_TIMEOUT) || 30000,
      screenshotPath: raw['screenshot.path'] || 'test-results/screenshots',
      videoPath: raw['video.path'] || 'test-results/videos',
      tracePath: raw['trace.path'] || 'test-results/traces',
      traceEnabled: raw['trace.enabled'] ?? true,
      videoRecording: raw['video.recording'] ?? true,
      envName,
      adminUsername: process.env.ADMIN_USERNAME || '',
      platform: (process.env.PLATFORM || raw.platform || 'android') as 'ios' | 'android',
    };
  }
}

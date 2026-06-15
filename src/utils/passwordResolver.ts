import * as dotenv from 'dotenv';
import * as path from 'path';
import * as fs from 'fs';

const PASSWORDS_FILE = path.resolve(process.cwd(), 'resources/data/.env.passwords');

let passwordsLoaded = false;

/**
 * Loads the .env.passwords file once per process.
 * System/user environment variables always take precedence — the file only fills gaps.
 */
function ensurePasswordsLoaded(): void {
  if (passwordsLoaded) return;
  passwordsLoaded = true;
  if (fs.existsSync(PASSWORDS_FILE)) {
    // No `override: true` — existing process.env values win over file values
    dotenv.config({ path: PASSWORDS_FILE });
    console.log(`🔑 Loaded passwords from ${PASSWORDS_FILE}`);
  } else {
    console.log(`ℹ️  No passwords file found at ${PASSWORDS_FILE}, relying on system environment variables`);
  }
}

/**
 * Returns a map of user-type → password built from *_PASSWORD environment variables.
 * E.g. ADMIN_PASSWORD=secret → { admin: 'secret' }S
 *
 * Use in feature files as: td.password.admin etc.
 */
export function loadPasswordsMap(): Record<string, string> {
  ensurePasswordsLoaded();
  const passwords: Record<string, string> = {};
  for (const [key, value] of Object.entries(process.env)) {
    const match = key.match(/^(.+)_ROLE$/i);
    if (match && value !== undefined) {
      passwords[match[1].toLowerCase()] = value;
    }
  }
  return passwords;
}

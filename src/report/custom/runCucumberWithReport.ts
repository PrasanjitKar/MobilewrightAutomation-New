#!/usr/bin/env ts-node
import { execSync } from 'child_process';

const ENV = process.env.ENV || 'STG';
const TAGS = process.env.TAGS || '';

// 1️⃣ Initialize report
console.log(`🔧 Initializing execution for ENV=${ENV}...`);
execSync(`npx ts-node src/report/custom/init.ts`, {
  stdio: 'inherit',
  env: { ...process.env, ENV },
});

// 2️⃣ Run cucumber (catch errors to continue to report generation)
let testsPassed = true;
try {
  console.log(`🧪 Execution started Cucumber tests with tags: ${TAGS}...`);
  execSync(`npx cucumber-js --config=config/cucumber.js ${TAGS}`, {
    stdio: 'inherit',
    env: { ...process.env, ENV },
  });
} catch (e) {
  testsPassed = false;
  console.warn('⚠️ Some tests failed, but continuing to generate report...');
}

// 3️⃣ Generate report
console.log('📊 Generating HTML report...');
execSync(`npx ts-node src/report/custom/report.ts`, {
  stdio: 'inherit',
  env: { ...process.env, ENV },
});

console.log('✅ All done: Cucumber ran and report generated.');
if (!testsPassed) {
  console.log('⚠️ Note: Some tests failed. Check the report for details.');
  process.exit(1); // Exit with error code if tests failed
}

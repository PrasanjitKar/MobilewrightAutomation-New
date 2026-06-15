import fs from 'node:fs';

try {
  fs.rmSync('test-results', { recursive: true, force: true });
  fs.mkdirSync('test-results', { recursive: true });
} catch (error) {
  console.log('Folder not created! ' + error);
}

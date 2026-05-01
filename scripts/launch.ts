import fs from 'node:fs';
import path from 'node:path';
import { execSync, spawn } from 'node:child_process';

const root = process.cwd();
const userConfig = path.resolve(root, 'config/devfolio.yaml');
const exampleConfig = path.resolve(root, 'config/devfolio.example.yaml');

// Step 1: Bootstrap config if missing
if (!fs.existsSync(userConfig)) {
  if (!fs.existsSync(exampleConfig)) {
    console.error('✗ config/devfolio.example.yaml not found. Is this a valid DevfolioKit repo?');
    process.exit(1);
  }
  fs.copyFileSync(exampleConfig, userConfig);
  console.log('');
  console.log('✓ Created config/devfolio.yaml from example.');
  console.log('');
  console.log('  → Edit config/devfolio.yaml to add your real profile data.');
  console.log('  → Then run `pnpm launch` again, or just save your changes — the server will reload.');
  console.log('');
}

// Step 2: Validate config
console.log('Validating config...');
try {
  execSync('pnpm validate', { stdio: 'inherit', cwd: root });
} catch {
  console.error('');
  console.error('✗ Fix the config errors above, then run `pnpm launch` again.');
  process.exit(1);
}

// Step 3: Start dev server
console.log('');
console.log('Starting dev server...');
console.log('');

const dev = spawn('pnpm', ['dev'], { stdio: 'inherit', cwd: root });

dev.on('error', (err) => {
  console.error('✗ Failed to start dev server:', err.message);
  process.exit(1);
});

dev.on('exit', (code) => {
  process.exit(code ?? 0);
});

import yaml from 'js-yaml';
import fs from 'node:fs';
import path from 'node:path';
import { configSchema } from '../src/lib/schema.js';
import { ZodError } from 'zod';

const root = process.cwd();
const userConfig = path.resolve(root, 'config/devfolio.yaml');
const exampleConfig = path.resolve(root, 'config/devfolio.example.yaml');

const filePath = fs.existsSync(userConfig) ? userConfig : exampleConfig;

if (!fs.existsSync(filePath)) {
  console.error('✗ No config file found.');
  console.error('  Expected: config/devfolio.yaml or config/devfolio.example.yaml');
  process.exit(1);
}

console.log(`Validating: ${path.relative(root, filePath)}`);

try {
  const raw = fs.readFileSync(filePath, 'utf-8');
  const parsed = yaml.load(raw);
  configSchema.parse(parsed);
  console.log('✓ Config is valid.');
} catch (err) {
  if (err instanceof ZodError) {
    console.error('✗ Config validation failed:\n');
    for (const issue of err.issues) {
      const field = issue.path.join('.');
      console.error(`  - ${field || 'root'}: ${issue.message}`);
    }
  } else {
    console.error('✗ Failed to parse config:');
    console.error(' ', (err as Error).message);
  }
  process.exit(1);
}

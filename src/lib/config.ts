import yaml from 'js-yaml';
import fs from 'node:fs';
import path from 'node:path';
import { configSchema, type Config } from '@/lib/schema.js';

export function loadConfig(): Config {
  const root = process.cwd();
  const userConfig = path.resolve(root, 'config/devfolio.yaml');
  const exampleConfig = path.resolve(root, 'config/devfolio.example.yaml');

  const filePath = fs.existsSync(userConfig) ? userConfig : exampleConfig;

  if (!fs.existsSync(filePath)) {
    throw new Error(
      'No config found. Run `pnpm launch` to create one from the example, or copy config/devfolio.example.yaml to config/devfolio.yaml.'
    );
  }

  const raw = fs.readFileSync(filePath, 'utf-8');
  const parsed = yaml.load(raw);
  return configSchema.parse(parsed);
}

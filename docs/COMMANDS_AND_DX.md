# Commands and Developer Experience

## Available Commands

| Command         | Description                                                   |
| --------------- | ------------------------------------------------------------- |
| `pnpm install`  | Install all dependencies                                      |
| `pnpm dev`      | Start Astro dev server (hot reload)                           |
| `pnpm build`    | Production build to `dist/`                                   |
| `pnpm preview`  | Preview production build locally                              |
| `pnpm validate` | Validate `config/devfolio.yaml` (or example) against schema   |
| `pnpm launch`   | Magic command: bootstrap config → validate → start dev server |

## pnpm launch (Magic Command)

This is the primary entry point for new users.

```bash
pnpm launch
```

What it does:

1. Checks if `config/devfolio.yaml` exists.
2. If not, copies `config/devfolio.example.yaml` → `config/devfolio.yaml`.
3. Prints a message telling the user to edit their config.
4. Runs `pnpm validate`.
5. If validation fails: exits with readable errors.
6. If validation passes: starts `pnpm dev`.

## Scripts

Scripts are TypeScript files in `scripts/` run with `tsx`.

- `scripts/launch.ts` — launch orchestration
- `scripts/validate.ts` — schema validation

## Config Location

| File                           | Purpose             | Committed?      |
| ------------------------------ | ------------------- | --------------- |
| `config/devfolio.example.yaml` | Demo data, template | Yes             |
| `config/devfolio.yaml`         | Your real config    | No (gitignored) |

## First-Time Setup

```bash
git clone https://github.com/vankhaivn/DevfolioKit.git my-portfolio
cd my-portfolio
pnpm launch
# Edit config/devfolio.yaml
# Save → browser refreshes automatically
```

## Validation Errors

If `pnpm validate` fails, errors show the failing field path and expected type.

Example:

```
✗ Config validation failed:
  - settings.layout: Invalid enum value. Expected 'minimal' | 'engineer', received 'fullpage'
  - profile.email: Invalid email
```

Fix the YAML and run `pnpm validate` again.

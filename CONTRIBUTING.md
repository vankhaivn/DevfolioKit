# Contributing to DevfolioKit

Thanks for your interest in contributing!

## Development Setup

```bash
git clone https://github.com/vankhaivn/DevfolioKit.git
cd DevfolioKit
pnpm install
pnpm launch
```

## Project Philosophy

- **Generic** — no personal data in source code.
- **Simple** — one YAML config, one command, one site.
- **No over-engineering** — don't add SaaS features, dashboards, or backends.
- **Accessible** — semantic HTML, good contrast, keyboard navigation.

## Before Submitting a PR

- `pnpm build` passes.
- `pnpm validate` passes with example config.
- No TypeScript errors.
- No hard-coded personal data.
- Keep the example YAML as fake/demo data only.

## Adding a New Layout

1. Create `src/layouts/YourLayout.astro`.
2. Accept `config: Config` as a prop.
3. Add it to the layout switch in `src/pages/index.astro`.
4. Add the new value to `settings.layout` enum in `src/lib/schema.ts`.
5. Update `docs/CONFIG_SPEC.md`.

## Adding a New Section

1. Create `src/components/sections/YourSection.astro`.
2. Accept typed props from the config.
3. Add it to whichever layouts should render it.

## Config Schema Changes

- Update `src/lib/schema.ts`.
- Update `config/devfolio.example.yaml` to demonstrate new fields.
- Update `docs/CONFIG_SPEC.md`.

## Code Style

- TypeScript strict mode — no `any`.
- Astro components for static markup.
- React only for interactive islands.
- No inline styles in Astro files — use `<style>` blocks.
- CSS variables for all theme-sensitive colors.

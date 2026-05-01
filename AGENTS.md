# AGENTS.md — DevfolioKit

> Read this first. It gives any future agent session everything needed to continue work immediately.

---

## What is DevfolioKit?

**DevfolioKit** is an open-source developer portfolio / CV starter template.

A developer clones the repo, edits a YAML config file, runs `pnpm launch`, and gets a polished portfolio site running on localhost — and deployable to Vercel in minutes.

---

## Product Goal

Make it trivially easy for individual developers to have a professional, fast, beautiful CV/portfolio website they fully own.

**Definition of Done (MVP):** `pnpm launch` starts a working portfolio website on localhost.

---

## Fixed Technology Decisions

| Area | Decision |
|---|---|
| Framework | Astro |
| Interactivity | React islands (where needed) |
| Styling | Tailwind CSS v4 + CSS variables |
| Config/data | YAML |
| Validation | Zod |
| Package manager | pnpm |
| MVP layouts | `minimal`, `engineer` |
| MVP themes | `light`, `dark`, `system` |
| Deployment | Vercel first |
| Resume PDF | User places file at `public/resume.pdf` |
| License | MIT |

---

## Repository Structure

```
DevfolioKit/
├── AGENTS.md                  ← You are here
├── README.md
├── CONTRIBUTING.md
├── LICENSE
├── package.json
├── astro.config.mjs
├── tsconfig.json
├── .gitignore
├── config/
│   ├── devfolio.example.yaml  ← Committed demo data
│   └── devfolio.yaml          ← Gitignored real config
├── docs/
│   ├── TASKS.md               ← Task tracker (always keep up to date)
│   ├── ARCHITECTURE.md
│   ├── CONFIG_SPEC.md
│   ├── UI_SPEC.md
│   ├── COMMANDS_AND_DX.md
│   └── DEPLOYMENT.md
├── public/
│   └── resume.pdf             ← User places their PDF here
├── scripts/
│   ├── launch.ts              ← pnpm launch entry point
│   └── validate.ts            ← pnpm validate entry point
└── src/
    ├── components/
    │   ├── sections/          ← About, Experience, Projects, Skills, etc.
    │   └── ui/                ← ThemeToggle (React), LayoutToggle (React), ResumeButton, etc.
    ├── layouts/
    │   ├── BaseLayout.astro
    │   ├── MinimalLayout.astro
    │   └── EngineerLayout.astro
    ├── lib/
    │   ├── config.ts          ← loadConfig() helper
    │   └── schema.ts          ← Zod schema + Config type
    ├── pages/
    │   └── index.astro
    └── styles/
        └── global.css
```

---

## Coding Conventions

- TypeScript everywhere — avoid `any`.
- Astro components for static markup, React islands for interactive UI.
- All profile data must come from the YAML config. Never hard-code personal data in components.
- CSS variables drive theming. `data-theme` attribute on `<html>`.
- Tailwind CSS v4 — uses `@tailwindcss/vite` plugin, no `tailwind.config.js`.
- Scripts run with `tsx` (TypeScript execution, no compilation step).
- No debug `console.log` left in shipped code.
- No backend, no database, no auth — static site only.
- **Path alias `@/` maps to `src/`** — use `@/lib/schema.js`, `@/components/Header.astro`, etc. Do not use `../` relative imports. Configured in both `tsconfig.json` (paths) and `astro.config.mjs` (Vite alias).

---

## Config Rules

- **Committed:** `config/devfolio.example.yaml` — fake realistic demo data only.
- **Gitignored:** `config/devfolio.yaml` — the real user config.
- `loadConfig()` in `src/lib/config.ts` reads `devfolio.yaml` if present, falls back to `devfolio.example.yaml`.
- All config is validated with Zod on load. Validation errors are human-readable.
- Never commit real personal data.

---

## Available Commands

```bash
pnpm install    # Install dependencies
pnpm dev        # Start Astro dev server
pnpm build      # Production build
pnpm preview    # Preview production build
pnpm validate   # Validate YAML config (tsx scripts/validate.ts)
pnpm launch     # Magic command: copy config if missing → validate → dev server
```

---

## How to Continue Work Across Sessions

Provide this context to the next agent:

```
@AGENTS.md @docs/TASKS.md
Continue the next open task.
```

For architecture/config questions also include:
```
@docs/ARCHITECTURE.md @docs/CONFIG_SPEC.md
```

---

## Task Workflow

1. Pick the first `open` task in `docs/TASKS.md`.
2. Change its status to `in_progress`.
3. Do the work.
4. Check acceptance criteria.
5. Change status to `done`.
6. If new work is discovered, add a new task — do not hide it inside an existing task.

---

## Run Before Starting Work

```bash
pnpm install
```

## Run After Completing Work

```bash
pnpm build
pnpm validate
```

---

## Core Rules

1. Do not hard-code personal data anywhere in components or layouts.
2. All profile data must come from `loadConfig()`.
3. Real YAML config (`config/devfolio.yaml`) must be gitignored.
4. Example YAML (`config/devfolio.example.yaml`) must be committed with fake data.
5. Keep the project generic — it's a template, not a personal site.
6. No SaaS, no dashboard, no backend features in MVP.

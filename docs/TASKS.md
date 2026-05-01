# TASKS.md — DevfolioKit

Task tracker. Keep statuses current. One task per logical unit of work.

Statuses: `open` | `in_progress` | `done`

---

## TASK-001 — Initialize Astro project scaffold

Status: done

### Goal

Set up the Astro + TypeScript + Tailwind CSS v4 + React foundation.

### Instructions

Create package.json, astro.config.mjs, tsconfig.json with all required dependencies.
Set up Tailwind CSS v4 via `@tailwindcss/vite`. Add React islands support via `@astrojs/react`.

### Acceptance Criteria

- `pnpm install` works.
- `pnpm dev` starts Astro dev server.
- `pnpm build` passes.
- Tailwind CSS v4 classes render correctly.
- No personal data hard-coded.

### Related Files

- `package.json`
- `astro.config.mjs`
- `tsconfig.json`
- `src/styles/global.css`

---

## TASK-002 — YAML config schema and validation

Status: done

### Goal

Define the Zod schema for devfolio.yaml, create loadConfig(), and add pnpm validate command.

### Instructions

- Create `src/lib/schema.ts` with full Zod schema.
- Create `src/lib/config.ts` with `loadConfig()`.
- Create `scripts/validate.ts`.
- Wire up `pnpm validate` in package.json.

### Acceptance Criteria

- `pnpm validate` passes with example config.
- `pnpm validate` shows readable errors when config is invalid.
- `loadConfig()` returns typed Config object.

### Related Files

- `src/lib/schema.ts`
- `src/lib/config.ts`
- `scripts/validate.ts`
- `config/devfolio.example.yaml`

---

## TASK-003 — Example YAML config with fake demo data

Status: done

### Goal

Create a realistic but fake developer profile in `config/devfolio.example.yaml`.

### Instructions

- Full-stack/backend/devops-oriented demo developer.
- 2–3 work experience items.
- 3–4 projects.
- Grouped skills.
- Placeholder social links.
- Resume path: `/resume.pdf`.

### Acceptance Criteria

- File committed at `config/devfolio.example.yaml`.
- `config/devfolio.yaml` is gitignored.
- `pnpm validate` passes against example config.
- Demo data looks realistic and professional.

### Related Files

- `config/devfolio.example.yaml`
- `.gitignore`

---

## TASK-004 — pnpm launch magic command

Status: done

### Goal

Create the one-command launch experience.

### Instructions

- Create `scripts/launch.ts`.
- If `config/devfolio.yaml` doesn't exist, copy from example and print instructions.
- Run `pnpm validate` — stop on failure with readable errors.
- On success, start `pnpm dev`.

### Acceptance Criteria

- `pnpm launch` copies config if missing.
- `pnpm launch` validates config before starting server.
- `pnpm launch` starts the dev server on success.
- `pnpm launch` exits with clear error on validation failure.

### Related Files

- `scripts/launch.ts`
- `package.json`

---

## TASK-005 — Base layout and global styles

Status: done

### Goal

Create BaseLayout.astro with SEO, Open Graph, theme script, and global CSS.

### Instructions

- SEO: title, description, OG tags, Twitter card.
- Theme script in `<head>` reads localStorage, sets `data-theme` on `<html>` before paint.
- Global CSS with CSS variables for light/dark themes.
- Tailwind CSS v4 base import.

### Acceptance Criteria

- No FOUC (flash of unstyled/wrong theme) on page load.
- SEO meta tags rendered correctly.
- `data-theme` attribute set correctly from localStorage or system preference.

### Related Files

- `src/layouts/BaseLayout.astro`
- `src/styles/global.css`

---

## TASK-006 — Shared UI components

Status: done

### Goal

Create Header, ThemeToggle (React island), and ResumeButton.

### Instructions

- `Header.astro`: name, headline, navigation links.
- `ThemeToggle.tsx`: React island, cycles light/dark/system, persists to localStorage.
- `ResumeButton.astro`: download link, graceful hide if no resume path in config.

### Acceptance Criteria

- Theme toggle works and persists across page reloads.
- Resume button only shows when `resume.path` is set in config.
- Header is responsive.

### Related Files

- `src/components/Header.astro`
- `src/components/ui/ThemeToggle.tsx`
- `src/components/ui/ResumeButton.astro`

---

## TASK-007 — Section components

Status: done

### Goal

Create all section components that render config data.

### Instructions

Create the following section components, each receiving typed config props:
- `About.astro` — summary, location, contact
- `Experience.astro` — work history
- `Projects.astro` — project cards
- `Skills.astro` — skill groups
- `Education.astro` — education + certifications
- `Contact.astro` — social links + email

### Acceptance Criteria

- All sections render correctly from config data.
- Missing/optional data has graceful fallback (sections hidden or placeholder shown).
- Semantic HTML used throughout.

### Related Files

- `src/components/sections/`

---

## TASK-008 — Minimal layout

Status: done

### Goal

Implement the `minimal` layout — compact, CV-like, readable.

### Instructions

- Clean single-column or constrained-width layout.
- Emphasizes typography and readability.
- Professional CV feel.
- Renders sections in order from config.

### Acceptance Criteria

- Layout looks polished with demo data.
- Responsive on mobile and desktop.
- Sections render in correct order.

### Related Files

- `src/layouts/MinimalLayout.astro`

---

## TASK-009 — Engineer layout

Status: done

### Goal

Implement the `engineer` layout — emphasizes projects, stack, impact, technical depth.

### Instructions

- Two-column or card-heavy layout.
- Projects section is prominent.
- Skills/stack visually emphasized.
- More visual than minimal.

### Acceptance Criteria

- Layout looks polished with demo data.
- Projects are visually prominent.
- Responsive.

### Related Files

- `src/layouts/EngineerLayout.astro`

---

## TASK-010 — Index page and layout registry

Status: done

### Goal

Wire up index.astro to select layout from config.

### Instructions

- `src/pages/index.astro` loads config and renders the correct layout.
- Layout selected by `settings.layout` in config.
- No hard-coded layout choice.

### Acceptance Criteria

- Changing `settings.layout` in YAML switches the layout.
- Both `minimal` and `engineer` layouts render correctly.

### Related Files

- `src/pages/index.astro`

---

## TASK-011 — README and documentation

Status: done

### Goal

Write README.md, CONTRIBUTING.md, and populate all docs/ files.

### Instructions

- README: quick start, customization guide, layout selection, theme setup, Vercel deploy.
- CONTRIBUTING: how to contribute, dev setup.
- docs/DEPLOYMENT.md: Vercel deploy guide.

### Acceptance Criteria

- README clearly explains how to clone, configure, and launch.
- All docs/ files have useful content.

### Related Files

- `README.md`
- `CONTRIBUTING.md`
- `docs/`

---

## TASK-012 — Build verification

Status: done

### Goal

Verify `pnpm build` and `pnpm validate` pass cleanly.

### Instructions

- Run `pnpm install`.
- Run `pnpm validate`.
- Run `pnpm build`.
- Fix any TypeScript or build errors.

### Acceptance Criteria

- `pnpm install` exits 0.
- `pnpm validate` exits 0.
- `pnpm build` exits 0.
- No TypeScript errors.

### Related Files

- All source files

---

## TASK-013 — Blog/case-study architecture placeholder

Status: open

### Goal

Leave a clean extension path for blog/case studies without implementing them.

### Instructions

- Add a placeholder `src/pages/blog/` directory with a README or index.
- Document the intended approach in `docs/ARCHITECTURE.md`.

### Acceptance Criteria

- Future agent can understand where to add blog support.
- No blog UI in MVP.

### Dependencies

- TASK-010 done

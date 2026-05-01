# DevfolioKit

> Open-source developer portfolio starter. Configure once in YAML, deploy anywhere.

Clone → Edit YAML → Run one command → Polished portfolio on localhost.

---

## Quick Start

```bash
git clone https://github.com/vankhaivn/DevfolioKit.git my-portfolio
cd my-portfolio
pnpm install
pnpm launch
```

`pnpm launch` will:

1. Copy the example config to `config/devfolio.yaml` if it doesn't exist.
2. Validate your config.
3. Start the dev server at `http://localhost:4321`.

Edit `config/devfolio.yaml` — the browser reloads automatically.

---

## Customizing Your Config

Open `config/devfolio.yaml` and fill in your information:

```yaml
profile:
  name: "Your Name"
  headline: "Your Headline"
  summary: "Your bio..."
  location: "City, Country"
  avatar: "/avatar.svg" # place image in public/
  email: "you@example.com"
```

See [docs/CONFIG_SPEC.md](docs/CONFIG_SPEC.md) for the full schema reference.

---

## Layouts

Set `settings.layout` in your YAML (visitors can switch at runtime):

| Layout     | Description                                                                   |
| ---------- | ----------------------------------------------------------------------------- |
| `minimal`  | Compact, CV-like, single-column. Great for traditional resumes.               |
| `engineer` | Two-column with prominent project cards. Great for showcasing technical work. |

```yaml
settings:
  layout: minimal # or: engineer
```

---

## Themes

Set `settings.theme` to control the default:

| Value    | Behavior                        |
| -------- | ------------------------------- |
| `light`  | Always light mode               |
| `dark`   | Always dark mode                |
| `system` | Follows visitor's OS preference |

Visitors can toggle the theme using the button in the header.

```yaml
settings:
  theme: system
```

---

## Resume / Export PDF

The header always shows a resume button. Behavior depends on whether a PDF exists:

- **PDF present** — place your file at `public/resume.pdf` and configure its path. The button downloads it directly.

  ```yaml
  resume:
    path: "/resume.pdf"
    label: "Download Resume"
  ```

- **No PDF** — if `public/resume.pdf` does not exist (or `resume` is not configured), the button switches to **Export as PDF** mode and triggers the browser's print-to-PDF dialog instead.

---

## Commands

```bash
pnpm install    # Install dependencies
pnpm launch     # Bootstrap config + validate + start dev server
pnpm dev        # Start dev server directly
pnpm build      # Production build
pnpm preview    # Preview production build
pnpm validate   # Validate config/devfolio.yaml
```

---

## Deploying to Vercel

See [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) for the full guide.

Quick version:

1. Push your fork to GitHub.
2. Import the repo at [vercel.com](https://vercel.com).
3. Framework: Astro (auto-detected). Build: `pnpm build`. Output: `dist`.
4. Deploy.

---

## Project Structure

```
config/
  devfolio.example.yaml  ← Demo data (committed)
  devfolio.yaml          ← Your real config (gitignored)
public/
  resume.pdf             ← Your resume PDF
src/
  components/            ← Section and UI components
  layouts/               ← minimal, engineer
  lib/                   ← Config loading and schema
  pages/                 ← index.astro
  styles/                ← global.css
```

---

## Validation Errors

If your config has errors, `pnpm validate` shows exactly where:

```
✗ Config validation failed:
  - settings.layout: Invalid enum value. Expected 'minimal' | 'engineer'
  - profile.email: Invalid email
```

Fix the field and run again.

---

## Tech Stack

- [Astro](https://astro.build) — static site framework
- [Tailwind CSS v4](https://tailwindcss.com) — utility-first CSS
- [React](https://react.dev) — interactive components (theme toggle)
- [Zod](https://zod.dev) — config schema validation
- [js-yaml](https://github.com/nodeca/js-yaml) — YAML parsing
- [tsx](https://github.com/privatenumber/tsx) — TypeScript script runner

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).

---

## License

MIT — see [LICENSE](LICENSE).

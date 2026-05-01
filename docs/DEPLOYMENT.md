# Deployment — DevfolioKit

## Vercel (Recommended)

DevfolioKit produces a fully static site and deploys to Vercel in minutes.

### Steps

1. **Fork or clone** DevfolioKit to your GitHub account.

2. **Create your config** (if you haven't already):
   ```bash
   cp config/devfolio.example.yaml config/devfolio.yaml
   # Edit config/devfolio.yaml with your real data
   ```

3. **Important:** `config/devfolio.yaml` is gitignored. You have two options for Vercel:

   **Option A — Commit your config (simplest)**
   Remove `config/devfolio.yaml` from `.gitignore`, commit it, and push. Only do this if you are comfortable with your data being in a public repo.

   **Option B — Use example config as build source** (default)
   `loadConfig()` falls back to `devfolio.example.yaml` if `devfolio.yaml` is not present.
   Rename/copy your data into `devfolio.example.yaml` and commit it.

4. **Import into Vercel:**
   - Go to [vercel.com](https://vercel.com) → New Project.
   - Import your GitHub repository.
   - Framework preset: **Astro** (auto-detected).
   - Build command: `pnpm build` (default).
   - Output directory: `dist` (default).
   - Click **Deploy**.

5. **Add your resume PDF:**
   Place your PDF at `public/resume.pdf` and commit it.
   The download button will appear automatically.

6. **Custom domain:**
   In Vercel project settings → Domains → Add your domain.

### Environment Variables

No environment variables are required for basic deployment.

## Other Platforms

DevfolioKit builds to static HTML/CSS/JS and works on any static host:

- **Netlify:** Same process as Vercel. Build command: `pnpm build`, publish directory: `dist`.
- **GitHub Pages:** Add a `deploy.yml` workflow with `pnpm build` and push `dist/` to `gh-pages` branch.
- **Cloudflare Pages:** Import repo, set build command `pnpm build`, output `dist`.

## Build Output

`pnpm build` outputs to `dist/`. All files are static — no Node.js server needed.

## Troubleshooting

**Build fails with "Config not found":**
Make sure `config/devfolio.yaml` or `config/devfolio.example.yaml` exists in the repo.

**Build fails with "Validation error":**
Run `pnpm validate` locally to see the exact error and fix your config.

**Resume button not showing:**
Make sure `resume.path` is set in config and `public/resume.pdf` exists.

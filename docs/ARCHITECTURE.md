# Architecture — DevfolioKit

## Overview

DevfolioKit is a static site generator built on Astro. It reads a single YAML config file and renders a polished portfolio website. There is no backend, no database, and no runtime server.

```
YAML Config → loadConfig() → Zod Validation → Astro Build → Static HTML/CSS/JS
```

## Data Flow

```
config/devfolio.yaml
       │
       ▼
src/lib/config.ts (loadConfig)
       │
       ▼
src/lib/schema.ts (Zod parse → typed Config)
       │
       ▼
src/pages/index.astro (reads layout from config)
       │
       ├── MinimalLayout.astro
       └── EngineerLayout.astro
              │
              ▼
        Section components (About, Experience, Projects, Skills, Education, Contact)
```

## Key Modules

### `src/lib/schema.ts`

Zod schema for the entire config. Export:
- `configSchema` — the Zod schema
- `Config` — inferred TypeScript type

### `src/lib/config.ts`

```ts
export function loadConfig(): Config
```

Reads `config/devfolio.yaml` if it exists, falls back to `config/devfolio.example.yaml`.
Parses YAML with `js-yaml`, validates with Zod, returns typed object.
Called at build time inside Astro `---` frontmatter.

### `src/pages/index.astro`

Entry point. Calls `loadConfig()`, selects layout based on `settings.layout`.

### Layouts

- `BaseLayout.astro` — HTML shell: `<head>` with SEO, theme script, global styles.
- `MinimalLayout.astro` — Compact, CV-like single-column layout.
- `EngineerLayout.astro` — Projects-prominent, technical-depth layout.

Both extend `BaseLayout.astro`.

### Sections

Stateless Astro components. Each accepts typed props from config.
Located in `src/components/sections/`.

### React Islands

Only used for interactive UI:
- `ThemeToggle.tsx` — reads/writes `localStorage.devfolio-theme`, toggles `data-theme` on `<html>`.

### Theming

- CSS variables on `:root` for light theme defaults.
- `[data-theme="dark"]` overrides for dark theme.
- Initial theme script in `<head>` prevents flash of wrong theme.
- Visitor can toggle theme. Developer sets default in YAML (`settings.theme`).

## Adding a New Layout

1. Create `src/layouts/YourLayout.astro`.
2. Accept `config: Config` as a prop.
3. Register it in `src/pages/index.astro` layout switch.
4. Add `your-layout` to the `settings.layout` enum in `src/lib/schema.ts`.

## Adding a New Section

1. Create `src/components/sections/YourSection.astro`.
2. Accept the relevant config slice as props.
3. Add it to the layouts that should render it.
4. Add the section key to the `sections` array in the schema if needed.

## Future: Blog / Case Studies

Placeholder structure is already in place. No UI is rendered in MVP.

### Existing placeholders

```
src/
├── content/
│   └── blog/                  ← Drop .md / .mdx posts here
└── pages/
    └── blog/
        ├── index.astro        ← Redirects to / until implemented
        └── [slug].astro       ← Returns no static paths until implemented
```

### Step-by-step to activate

**Step 1 — Define the content collection** (`src/content/config.ts`):
```ts
import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.string(),
    description: z.string().optional(),
    tags: z.array(z.string()).optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
```

**Step 2 — Add posts** to `src/content/blog/my-post.md`:
```md
---
title: "My First Post"
date: "2024-06-01"
description: "A short intro."
tags: [engineering, open-source]
---

Post content here...
```

**Step 3 — Implement listing page** (`src/pages/blog/index.astro`):
```ts
import { getCollection } from 'astro:content';
const posts = (await getCollection('blog'))
  .filter(p => !p.data.draft)
  .sort((a, b) => b.data.date.localeCompare(a.data.date));
```

**Step 4 — Implement post page** (`src/pages/blog/[slug].astro`):
```ts
export async function getStaticPaths() {
  const posts = await getCollection('blog');
  return posts.map(post => ({ params: { slug: post.slug }, props: { post } }));
}
const { post } = Astro.props;
const { Content } = await post.render();
```

**Step 5 — Optional config gate** — add to `src/lib/schema.ts`:
```ts
settings: z.object({
  // ... existing fields
  blog: z.object({ enabled: z.boolean().default(false) }).optional(),
})
```
Then conditionally show blog links in Header/nav only when `settings.blog.enabled` is true.

## Constraints

- No backend. No API routes in MVP.
- No database. Config is the only data source.
- No auth, no dashboard, no SaaS features.
- `pnpm build` must produce a fully static output.

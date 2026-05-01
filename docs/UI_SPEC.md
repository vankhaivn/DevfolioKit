# UI Spec — DevfolioKit

## Design Principles

- Modern, professional, clean.
- Not overly colorful — developer CV, not a marketing site.
- Responsive: works on mobile and desktop.
- Accessible: semantic HTML, good contrast, keyboard navigable.
- Fast: static HTML, minimal JavaScript.

## Theming

### Theme Values

| Value | Behavior |
|---|---|
| `light` | Always light mode |
| `dark` | Always dark mode |
| `system` | Follows OS preference |

### Implementation

- `data-theme` attribute on `<html>` element.
- CSS variables under `:root` for light mode, `[data-theme="dark"]` for dark.
- `ThemeToggle` React island persists preference to `localStorage` as `devfolio-theme`.
- Inline script in `<head>` applies correct theme before first paint (no FOUC).

### CSS Variables

```css
:root {
  --color-bg: #ffffff;
  --color-surface: #f8f9fa;
  --color-border: #e5e7eb;
  --color-text: #111827;
  --color-text-muted: #6b7280;
  --color-accent: #2563eb;
  --color-accent-hover: #1d4ed8;
}

[data-theme="dark"] {
  --color-bg: #0f172a;
  --color-surface: #1e293b;
  --color-border: #334155;
  --color-text: #f1f5f9;
  --color-text-muted: #94a3b8;
  --color-accent: #60a5fa;
  --color-accent-hover: #93c5fd;
}
```

## Layouts

### Minimal Layout

- Constrained max-width (~800px), centered.
- Single column.
- Header: name, headline, theme toggle, resume button.
- Sections below in order: About, Experience, Projects, Skills, Education, Contact.
- CV-like typography — clear section headings, compact spacing.

### Engineer Layout

- Wider max-width (~1100px), centered.
- Header: name, headline, theme toggle, resume button.
- Two-column on desktop: sidebar (skills, contact, links) + main (experience, projects).
- Projects section is visually prominent with cards.
- Skills shown as tag groups.

## Components

### Header

- Name (large, bold)
- Headline (muted, below name)
- Location (optional)
- Theme toggle button (top right)
- Resume download button (visible if `resume.path` set)

### ThemeToggle (React island)

- Icon button cycling: light → dark → system → light
- Reads initial state from `localStorage.devfolio-theme`
- Updates `data-theme` on `document.documentElement`
- Shows appropriate icon (sun / moon / monitor)

### ResumeButton

- `<a download>` link to `resume.path`
- Hidden if `resume` not set in config

### Section: About

- Summary paragraph
- Location badge (optional)
- Contact row: email, social icons

### Section: Experience

- Timeline list
- Each item: company, role, dates, location, summary, highlights
- Current role: no end date shown or "Present"

### Section: Projects

- Card grid (engineer) or compact list (minimal)
- Each card: name, description, tags, links (live / repo)
- Highlights as bullets if present

### Section: Skills

- Category groups
- Tags/badges per item

### Section: Education

- Institution, degree, dates
- Notes (optional)

### Section: Contact

- Social links with icons
- Email (if set)
- Phone (if set)

## Accessibility

- All interactive elements are keyboard accessible.
- Images have `alt` attributes.
- Color contrast meets WCAG AA.
- Semantic heading hierarchy (h1 → h2 → h3).
- `aria-label` on icon-only buttons.

## SEO

- `<title>` from `site.title`
- `<meta name="description">` from `site.description`
- Open Graph: `og:title`, `og:description`, `og:image`, `og:url`
- Twitter: `twitter:card`, `twitter:title`, `twitter:description`
- Canonical URL if `site.url` is set

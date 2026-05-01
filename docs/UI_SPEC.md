# UI Spec — DevfolioKit (Modernized)

## Design Principles

### Modern & Premium

Minimalist but sophisticated. Use ample whitespace to let the content breathe and avoid a cluttered, "newspaper-like" look.

### Visual Hierarchy

Rely on font weights and shades of gray (Slate/Zinc) to establish hierarchy rather than just pure black and white.

### Subtle Containers

Instead of plain text sections, group elements like Projects, Contact, and Education into "Cards" with subtle borders (1px solid) and soft rounded corners (rounded-xl or rounded-2xl).

### Responsive & Fluid

Seamlessly adapts to all devices, from mobile to ultra-wide desktop monitors.

### Accessible & Fast

Semantic HTML, high contrast, keyboard navigable, static HTML with minimal JavaScript.

---

## Theming & Typography

### Typography

#### Primary Font

Recommend modern Sans-serif typefaces like Inter, Geist, Plus Jakarta Sans, or a clean system-ui fallback.

### Theme Values & Implementation

| Value  | Behavior              |
| ------ | --------------------- |
| light  | Always light mode     |
| dark   | Always dark mode      |
| system | Follows OS preference |

- `data-theme` attribute on the `<html>` element.
- ThemeToggle React island persists user preference to localStorage as `devfolio-theme`.
- Inline script in `<head>` applies the correct theme before the first paint to prevent FOUC (Flash of Unstyled Content).

### Colors (Slate / Zinc Palette)

Move away from basic grays and use Slate or Zinc palettes for more depth. Add smooth transitions for hover states (`transition-all duration-200`).

```css
:root {
  --color-bg: #f8fafc; /* slate-50 */
  --color-surface: #ffffff;
  --color-border: #e2e8f0; /* slate-200 */
  --color-text: #0f172a; /* slate-900 */
  --color-text-muted: #64748b; /* slate-500 */
  --color-accent: #2563eb; /* blue-600 */
  --color-accent-hover: #1d4ed8; /* blue-700 */
}

[data-theme="dark"] {
  --color-bg: #020617; /* slate-950 */
  --color-surface: #0f172a; /* slate-900 */
  --color-border: #1e293b; /* slate-800 */
  --color-text: #f8fafc; /* slate-50 */
  --color-text-muted: #94a3b8; /* slate-400 */
  --color-accent: #3b82f6; /* blue-500 */
  --color-accent-hover: #60a5fa; /* blue-400 */
}
```

---

## Layouts

### 1. Minimal Layout

#### Container

Constrained max-width (~800px), centered for a CV-like reading experience.

#### Header

Sticky or generously padded at the top. Features a subtle fade or glassmorphism (backdrop-blur) effect when scrolling.

#### Experience

Rendered as a Vertical Timeline (a vertical line with dots connecting roles) to break the monotony of plain text.

#### Projects

Displayed as a clean list with subtle background highlight effects upon hover.

### 2. Engineer Layout

#### Container

Wider max-width (~1024px - 1100px), centered.

#### Hero Section

Large, bold Name and a prominent Headline. Includes circular social links next to the "Download Resume" button.

#### Skills

Displayed as "Bento boxes" or pill-shaped badges (e.g., bg-slate-100 in light mode) for a modern feel.

#### Projects

2-column Grid layout. Projects are placed inside Cards featuring thin borders, subtle drop shadows on hover, and an arrow -> indicator that appears on mouse-over.

---

## Components Specification

### Header

#### Name

Large, bold, tight tracking.

#### Headline

Muted text, placed right below the name.

#### Theme Toggle

Icon button cycling (Sun → Moon → Monitor).

#### Layout Toggle

Icon button toggling between Minimal (single-column) and Engineer (sidebar + grid) layouts. Preference is saved to `localStorage['devfolio-layout']`. The YAML `settings.layout` sets the default shown on first visit.

#### Resume Button

Prominent CTA button, hidden if resume.path is not configured.

### Section: Skills (Badges / Pills)

Rendered as rounded tags:

```html
<span
  class="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm font-medium"
></span>
```

Grouped by category (Frontend, Backend, Infrastructure).

### Section: Experience (Timeline)

#### Left/Top

Dates (styled with uppercase, small, muted text: uppercase text-xs text-muted).

#### Right/Bottom

Company (bold) and Role.

Includes bullet points for highlights, using an accent-colored bullet or icon (e.g., ▹).

### Section: Projects (Cards)

#### Container

Large rounded corners (rounded-2xl), background contrasting slightly with the main app background (e.g., White card on a Slate-50 background).

#### Content

Title, description, tags (using the Skill Badge style), and external/repo links.

### Section: Contact & Education

#### Education

Structured similarly to Experience but without the heavy timeline styling.

#### Contact

Clean row or grid of social links and email, utilizing recognizable standard icons (Lucide or similar).

---

## Accessibility

All interactive elements are keyboard accessible (tab index, focus rings).

Images and icons must have alt attributes or aria-labels.

Color contrast strictly meets WCAG AA standards.

Semantic heading hierarchy enforced (h1 → h2 → h3).

---

## SEO

`<title>` is populated from site.title.

`<meta name="description">` is populated from site.description.

Open Graph tags included: og:title, og:description, og:image, og:url.

Twitter Cards setup: twitter:card, twitter:title, twitter:description.

Canonical URL included if site.url is provided.

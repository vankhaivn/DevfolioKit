# Config Spec — DevfolioKit

All portfolio data is driven by a single YAML file.

- **Committed example:** `config/devfolio.example.yaml`
- **Real user config:** `config/devfolio.yaml` (gitignored)

## Full Schema Reference

```yaml
# ─────────────────────────────────────────────
# Site metadata
# ─────────────────────────────────────────────
site:
  title: string            # Browser tab title and OG title
  description: string      # Meta description and OG description
  url: string (optional)   # Canonical URL, e.g. https://yourname.dev
  ogImage: string (optional) # Path to OG image, e.g. /og.png

# ─────────────────────────────────────────────
# Developer profile
# ─────────────────────────────────────────────
profile:
  name: string             # Full name
  headline: string         # One-line professional summary
  summary: string          # Multi-line bio (supports newlines)
  location: string (optional)
  avatar: string (optional) # Path, e.g. /avatar.jpg
  email: string (optional)
  phone: string (optional)

# ─────────────────────────────────────────────
# Social links
# ─────────────────────────────────────────────
social:                    # optional list
  - platform: github | linkedin | twitter | mastodon | youtube | website | ...
    url: string            # Full URL
    label: string (optional) # Display label

# ─────────────────────────────────────────────
# Skills
# ─────────────────────────────────────────────
skills:                    # optional list
  - category: string       # e.g. "Languages", "Frontend", "Infrastructure"
    items:
      - string

# ─────────────────────────────────────────────
# Work experience
# ─────────────────────────────────────────────
experience:                # optional list
  - company: string
    role: string
    start: string          # e.g. "2022-03" or "2022"
    end: string (optional) # omit for current role
    location: string (optional)
    summary: string (optional)
    highlights:            # optional list of bullet points
      - string

# ─────────────────────────────────────────────
# Projects
# ─────────────────────────────────────────────
projects:                  # optional list
  - name: string
    description: string
    url: string (optional)  # Live URL
    repo: string (optional) # Git repo URL
    tags:                   # optional list
      - string
    highlights:             # optional list
      - string

# ─────────────────────────────────────────────
# Education
# ─────────────────────────────────────────────
education:                 # optional list
  - institution: string
    degree: string
    field: string (optional)
    start: string (optional)
    end: string (optional)
    notes: string (optional)

# ─────────────────────────────────────────────
# Certifications
# ─────────────────────────────────────────────
certifications:            # optional list
  - name: string
    issuer: string
    date: string (optional)
    url: string (optional)

# ─────────────────────────────────────────────
# Resume PDF
# ─────────────────────────────────────────────
resume:                    # optional
  path: string             # e.g. /resume.pdf (place file in public/)
  label: string (optional) # Button label, default "Download Resume"

# ─────────────────────────────────────────────
# Site settings
# ─────────────────────────────────────────────
settings:
  layout: minimal | engineer   # Which layout to use
  theme: light | dark | system # Default theme
  sections:                    # optional — ordered list of visible sections
    - about
    - experience
    - projects
    - skills
    - education
    - certifications
    - contact
```

## Validation

Run `pnpm validate` to check your config. Errors will point to the failing field.

Common issues:
- `url` fields must be valid URLs (include `https://`).
- `email` must be a valid email format.
- `settings.layout` must be exactly `minimal` or `engineer`.
- `settings.theme` must be exactly `light`, `dark`, or `system`.

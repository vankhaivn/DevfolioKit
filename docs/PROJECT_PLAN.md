# Project Plan — DevfolioKit

## Vision

DevfolioKit is an open-source developer portfolio starter that makes it trivially easy to go from "I need a portfolio" to "I have a live, professional portfolio website" in under 10 minutes.

## MVP Scope

**In scope:**
- Astro-based static site
- YAML-driven config
- Two layouts: `minimal` and `engineer`
- Three theme modes: `light`, `dark`, `system`
- All standard portfolio sections
- Resume PDF download
- Vercel deployment
- `pnpm launch` magic command

**Out of scope for MVP:**
- Blog / case studies (architecture supports it, UI not built)
- CMS integration
- Contact form (no backend)
- Analytics
- Multiple pages
- Authentication

## Milestones

### M0 — Foundation (done)
- AGENTS.md, planning docs, task tracker

### M1 — Project Scaffold (done)
- Astro + TypeScript + Tailwind CSS v4 + React
- All dependencies installed

### M2 — Config System (done)
- Zod schema, loadConfig(), validate command
- Example YAML with demo data

### M3 — Core UI (done)
- BaseLayout, global styles, theme system
- All section components
- Minimal and engineer layouts

### M4 — DX & Polish (done)
- pnpm launch command
- README, docs
- Build verification

### M5 — Blog Extension (open)
- Architecture placeholder only — see TASK-013

# Delight International School — Copilot Instructions (concise)

Overview
- Small React + Vite + TypeScript site. Routes live in `src/App.tsx`; entry point is `src/main.tsx`.

Where to look first
- Layout components: `src/components/Layout/Header.tsx`, `Footer.tsx` — header variants control page nav and theme.
- Reusable UI: `src/components/UI/Hero.tsx`, `Card.tsx` demonstrate CSS Module usage and theme variables.
- Pages: `src/pages/*/` — each page folder contains `PageName.tsx`, `PageName.module.css`, and `index.ts`.
- Static assets: `public/images/` and `public/files/` (served at `/images/*` and `/files/*`).

Conventions agents must follow
- Styles: use CSS Modules (`Component.module.css`). Keep class names local to component.
- Exports: components expose an `index.ts` barrel file (follow existing pattern when adding files).
- Routing: add new routes in `src/App.tsx`; pages expect a default export from page folder `index.ts`.
- Header variants: use the `variant` prop values `default|wine|blue|cream` to match page themes.

Common patterns (examples)
- Hero backgrounds use a `linear-gradient` overlay — see `src/components/UI/Hero.module.css`.
- Cards use a left accent border: `border-left: 5px solid var(--accent)` (see `src/components/UI/Card.module.css`).

Developer commands
```bash
npm run dev      # start dev server (Vite)
npm run build    # build production
npm run preview  # preview production build
npm run lint     # run ESLint
```

Notes about tests & CI
- No test suite detected in repo root. Before adding tests, follow existing project structure and keep tests colocated with components.

Agent model preference
- Prefer GPT-5 mini when generating code or PR text. (I cannot toggle service-level model settings from the repo; request admin changes in your Copilot/AI platform.)

If unsure, open these files
- `src/App.tsx` — routing and page mounts
- `src/components/Layout/Header.tsx` — nav + theme handling
- `src/components/UI/Hero.tsx`, `Card.tsx` — UI patterns

If you want this updated or expanded (examples, PR checklist), tell me which section to expand.

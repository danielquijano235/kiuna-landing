# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Kiuna AI marketing site — a single-page React/Vite/TypeScript landing page (Spanish copy) for an AI consulting/automation business. There is no backend, router, or component library: the entire page lives in `src/App.tsx`.

## Commands

- `npm run dev` — start Vite dev server (bound to `127.0.0.1:4173`, see `vite.config.ts`)
- `npm run build` — type-checks via `tsc -b` then builds with Vite into `dist/`
- `npm run preview` — serve the built `dist/` output locally

There is no test suite, linter, or formatter configured in this repo.

## Architecture

- `src/main.tsx` — mounts `<App />` into `#root`, imports the single global stylesheet `src/styles.css`.
- `src/App.tsx` — the entire site. Content sections (capabilities, outcomes, process steps, hero copy) are defined as static data arrays near the top of the file and rendered via `.map()`, so copy edits and structural edits happen in different parts of the same file.
- The contact form posts to Web3Forms (`https://api.web3forms.com/submit`) with `import.meta.env.VITE_WEB3FORMS_ACCESS_KEY`. The key lives in `.env.local` (gitignored) locally and in EasyPanel for production; Vite inlines it at build time, so it must be present when the Docker image is built (`ARG`/`ENV` in `Dockerfile`).
- Pointer-driven decorative effects (hero parallax via `--pointer-x`/`--pointer-y` CSS custom properties, and a click/move "bubble" particle system) are implemented with plain React state + refs in `App.tsx` and styled entirely through CSS custom properties consumed by `src/styles.css`. When touching these, keep the timer cleanup in the `useEffect` return (bubble timers) intact to avoid leaking `setTimeout` handles.
- `dist/` is no longer committed (gitignored). Production is built inside Docker (multi-stage `Dockerfile` → nginx with `nginx.conf`) and deployed via EasyPanel on the Hostinger VPS at kiuna.cloud — see `DEPLOY.md`.
- `assets/kiuna-hero.png` is the hero background image, referenced by absolute path `/assets/kiuna-hero.png`.

## Design Context

This project uses the `impeccable` design skill (see `PRODUCT.md` and `DESIGN.md` at the repo root). Register is **brand** (marketing landing, design IS the product), platform is **web**. Three audiences: pyme/negocio owners evaluating IA for growth, marketing/sales teams evaluating automation, and IA-curious people drawn to Kiuna Academy. Primary conversion goal: agendar una llamada de diagnóstico. Brand personality is deliberately **cercana, práctica y accesible** rather than corporate-distant, with explicit user permission to reinvent the current dark cyan/amber visual system (captured as a baseline in `DESIGN.md`) if it moves the site further from generic AI-SaaS look. Run `/impeccable` commands (`critique`, `polish`, `audit`, `live`, etc.) for design work so they read this context automatically.

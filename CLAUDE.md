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
- The contact form has no backend: on submit it builds a summary string, copies it to the clipboard, and opens a `mailto:` link (`hola@kiuna.ai`) with the subject/body pre-filled — there is no API call or persistence.
- Pointer-driven decorative effects (hero parallax via `--pointer-x`/`--pointer-y` CSS custom properties, and a click/move "bubble" particle system) are implemented with plain React state + refs in `App.tsx` and styled entirely through CSS custom properties consumed by `src/styles.css`. When touching these, keep the timer cleanup in the `useEffect` return (bubble timers) intact to avoid leaking `setTimeout` handles.
- `dist/` is committed build output — do not hand-edit it; regenerate via `npm run build`.
- `assets/kiuna-hero.png` is the hero background image, referenced by absolute path `/assets/kiuna-hero.png`.

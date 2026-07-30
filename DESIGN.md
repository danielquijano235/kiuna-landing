---
name: Kiuna AI
description: Landing diurna estilo panel de control industrial para una consultora de IA que ofrece tres vías de crecimiento.
colors:
  panel: "#e9edee"
  surface: "#ffffff"
  ink: "#0f2430"
  steel: "#56707c"
  safety: "#ff5a1f"
  steel-line: "rgba(15, 36, 48, 0.16)"
  steel-line-strong: "rgba(15, 36, 48, 0.32)"
typography:
  display:
    fontFamily: "Aptos, 'Segoe UI Variable', 'Segoe UI', sans-serif"
    fontSize: "clamp(3.5rem, 9vw, 6.6rem)"
    fontWeight: 650
    lineHeight: 1.02
    letterSpacing: "normal"
  hero-title:
    fontFamily: "Aptos, 'Segoe UI Variable', 'Segoe UI', sans-serif"
    fontSize: "clamp(2rem, 3vw, 3.15rem)"
    fontWeight: 650
    lineHeight: 1.08
    letterSpacing: "normal"
  headline:
    fontFamily: "Aptos, 'Segoe UI Variable', 'Segoe UI', sans-serif"
    fontSize: "clamp(1.85rem, 3.1vw, 2.7rem)"
    fontWeight: 650
    lineHeight: 1.1
  body:
    fontFamily: "Aptos, 'Segoe UI Variable', 'Segoe UI', sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "Aptos, 'Segoe UI Variable', 'Segoe UI', sans-serif"
    fontSize: "0.72rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "0.12rem"
  monospace-id:
    fontFamily: "ui-monospace, 'SF Mono', 'Cascadia Code', 'Roboto Mono', monospace"
    fontSize: "0.78rem–0.95rem"
    fontWeight: 600
    lineHeight: 1
rounded:
  pill: "999px"
  md: "0.5rem"
  sm: "0.45rem"
  xs: "0.35rem"
spacing:
  sm: "0.75rem"
  md: "1.5rem"
  lg: "2.5rem"
  xl: "clamp(3rem, 9vw, 6rem)"
components:
  button-primary:
    backgroundColor: "{colors.safety}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: "0.74rem 1.16rem"
    border: "2px solid {colors.safety}"
  button-ghost:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: "0.74rem 1.16rem"
    border: "2px solid {colors.ink}"
  vertical-card:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.md}"
    padding: "1.9rem 1.7rem 1.7rem"
    border: "2px solid {colors.ink}"
---

# Design System: Kiuna AI

## 1. Overview

**Creative North Star: "Panel de Turno"**

Kiuna AI reads like the control panel of a plant that already runs on IA: a flat, gray-blue daylight surface, thick ink-colored borders, and a single safety-orange accent reserved for what's live or actionable. The referent is physical signage — an industrial control board, floor markings, shift-change status boards — not a SaaS dashboard and not the previous dark "Operations Deck at Night" theme. Elevation is flat (hard-edged offset shadows, no blur/glow), typography splits cleanly between the sans body face and a monospace face reserved for module IDs and step numerals, and motion (pointer tilt on the modules panel, the bubble/spark particle layer) is kept but recolored to the new ink/safety/steel palette.

This is a **captured baseline of the current implementation, not a locked mandate.** PRODUCT.md gives explicit permission to keep reinventing this system if it moves the site further from generic AI-SaaS territory. Treat every token below as a starting point for `polish`/`critique`/`live` iteration, not a ceiling.

What this system explicitly rejects (from PRODUCT.md's anti-references): the purple-to-blue SaaS gradient, identical nested card grids, a hero built around one big gradient-text metric, glassmorphism/blur chrome, and any visual pattern that reads as "template-made-by-AI" rather than a considered decision.

**Key Characteristics:**
- Flat daylight panel background (`#e9edee`) with white module surfaces and near-black ink text/borders — no gradients on backgrounds.
- One-accent discipline: safety orange marks only what's live, actionable, or proven — nothing else uses it.
- One monospace face reserved for module IDs, step numerals, and differentiator reference tags; everything else in the variable sans body font.
- Thick (2px) ink-colored borders and rectangular/pill shapes with small radii; no glass/blur chrome anywhere.
- Flat elevation: hard offset shadows (`0 10px 0` + soft blur), never colored glow.
- The 01–04 numeral motif is deliberately varied per content group (see §5, Named Rules) rather than repeated identically three times.

## 2. Colors

A flat daylight base with a one-accent discipline: safety orange is the only color that carries interactive/live meaning.

### Primary
- **Panel** (`#e9edee`): page background. Flat, no gradient.
- **Surface** (`#ffffff`): fill for cards, modules, the lead-form, the modules panel.

### Accent
- **Safety** (`#ff5a1f`): the system's only accent — primary button fill, module LED indicators, status-dot, active nav underline, form focus ring, bubble/spark particle hue, vertical-card hover border. Never used for body text at length.

### Neutral
- **Ink** (`#0f2430`): primary text, all structural borders (2px), the brand mark, button borders.
- **Steel** (`#56707c`): secondary/muted text (taglines, descriptions, form labels, kickers).
- **Steel Line** (`rgba(15,36,48,0.16)`) / **Steel Line Strong** (`rgba(15,36,48,0.32)`): hairline dividers used for internal card structure (e.g. `.module-row` separators, `.differentiator-list` grid lines); the 2px Ink border is reserved for a component's outer edge.

### Named Rules
**The One-Accent Rule.** Only safety orange carries interactive/live color meaning. If a second color is introduced for that purpose, this rule needs to be renamed or retired — don't silently add a second accent.

## 3. Typography

**Body Font:** Aptos (with Segoe UI Variable, Segoe UI, sans-serif fallback)
**Monospace Font:** system monospace stack (SF Mono / Cascadia Code / Roboto Mono fallback)

**Character:** A single confident sans carries almost every word on the page; the monospace face is let in only where the copy is functioning as an ID or index (module numbers, step badges, `REF.0x` tags) — so its one appearance reads as "this is a system reference," not decoration.

### Hierarchy
- **Display** (650 weight, `clamp(3.5rem, 9vw, 6.6rem)`, 1.02 line-height): reserved for section H2s that need maximum weight.
- **Hero Title** (650 weight, `clamp(2rem, 3vw, 3.15rem)`, 1.08 line-height, `text-wrap: balance`, max 21ch): the hero H1.
- **Headline** (650 weight, `clamp(1.85rem, 3.1vw, 2.7rem)`, 1.1 line-height, max 20ch): section headings.
- **Body** (400 weight, 1rem–1.04rem, 1.5–1.65 line-height): paragraph copy; color is always Steel, never full Ink at length.
- **Label** (400 weight, 0.72rem, 0.12rem letter-spacing, uppercase): eyebrows, kickers, community label, contact-point captions.

### Named Rules
**The One-Monospace Rule.** The monospace stack appears only where text is a numeral/ID/reference: `.module-id`, `.step-number`, `.differentiator-index` (`REF.0x`), `.vertical-index`, `.status-tag`, `.proof-number`. Every other character on the page is Aptos.

**The Varied-Index Rule.** The 01–04 numeral motif deliberately does not repeat the same visual treatment across unrelated content groups (this corrects a finding from the pre-redesign critique, where one identical amber gradient numeral appeared in three unrelated sections):
- **Verticales** (3 parallel options): a filled "module plate" chip — monospace, ink background, panel-colored text.
- **Proceso** (4 sequential steps): a circular ink-bordered node sitting on the existing connector line.
- **Diferenciadores** (4 parallel, non-sequential items): a small `REF.0x` monospace label, no large numeral, no chip — the lightest-weight treatment of the three.

## 4. Elevation

Kiuna AI is flat, not glass: surfaces sit on solid white fills with thick ink borders, and depth comes from a hard offset shadow (`--shadow`), never blur or colored glow.

### Shadow Vocabulary
- **Flat Offset** (`box-shadow: 0 10px 0 rgba(15,36,48,0.06), 0 18px 40px rgba(15,36,48,0.08)`, the `--shadow` token): the only shadow in the system — used on the modules panel, vertical cards, and the lead-form. No variant tints it with the accent color; elevation is structural, not a live/interactive signal.

### Named Rules
**The Flat-Elevation Rule.** No `backdrop-filter`, no colored glow, no gradient panel fill. If a surface needs to feel "elevated," it gets the Flat Offset shadow and/or a thicker ink border — not blur or tint.

## 5. Components

### Buttons
- **Shape:** small radius (`0.45rem`), 2px ink border on every variant.
- **Primary (`button-solid`):** solid Safety fill, Safety border, Ink text, Flat Offset shadow.
- **Ghost/Quiet (`button-ghost`, `button-quiet`):** Surface fill, Ink border and text — no accent color at rest.
- **Hover/Focus:** all buttons lift 1px (`translateY(-1px)`) on hover/focus-visible; no color shift, the lift alone signals interactivity.

### Cards / Containers
- **Corner Style:** small radius (`0.5rem`) across cards, the modules panel, and the lead-form — nothing pill-shaped except buttons and the status tag.
- **Background:** flat Surface white, no gradient.
- **Shadow Strategy:** Flat Offset at rest; vertical cards additionally switch border color from Ink to Safety on hover, with a 4px lift — no blur transition.
- **Border:** 2px Ink by default (thicker than the previous hairline system — this is a deliberate "control-panel" signal).
- **Internal Padding:** roughly 1.7–1.9rem for content cards, 1.25rem for the lead-form, 2rem for the community panel.

### Inputs / Fields
- **Style:** 1px Steel Line border, Panel-colored fill (reads as a recessed field against the white form card), 0.35rem radius.
- **Focus:** border shifts to Safety, fill brightens to Surface white, plus a soft 3px safety-tinted ring.

### Navigation
- **Style:** solid, full-width `sticky` topbar with a 2px ink bottom border — no floating pill, no blur.
- **Typography:** uppercase, bold, letter-spaced links; a safety-orange underline slides in on hover/focus instead of a background pill.
- **Brand mark:** a small square ink chip (not a glowing circle).
- **Mobile treatment:** collapses to a hamburger (`.nav-toggle`) below 900px; unchanged from the previous system, only its colors follow the new tokens.

### Signature Component: Bubble/Spark Particle Layer
A fixed-position particle system (`.bubble-layer`, `.click-bubble`) driven by pointer move (sparks) and pointer down (bursts), cycling through ink/safety/steel. Motion is unchanged from the previous system (`cubic-bezier(0.16, 1, 0.3, 1)` ease-out blooms with blur-out fades) — only the hue palette was retargeted. This is the site's one "delight" component and should stay restrained (short-lived, capped particle count) rather than become persistent chrome.

## 6. Do's and Don'ts

### Do:
- **Do** keep the One-Accent Rule: safety orange only for what's live/actionable/proven, nowhere else.
- **Do** keep the monospace face restricted to numerals/IDs/references (One-Monospace Rule) — it's what makes those elements read as system data rather than decoration.
- **Do** keep the three numeral treatments (module plate / circular node / `REF.0x` label) visually distinct — don't collapse them back into one repeated pattern.
- **Do** use the single Flat Offset shadow for elevation; don't reach for blur or a colored glow.
- **Do** treat this file as a captured baseline: per PRODUCT.md, every token here is open to further reinvention if a change moves the site further from generic AI-SaaS look.

### Don't:
- **Don't** introduce a second accent color alongside safety orange, or reintroduce the old cyan/amber pair.
- **Don't** add gradient text (`background-clip: text`) anywhere — the previous system's one gradient-text exception (`.step-number`) was removed in this redesign and should not return.
- **Don't** add `backdrop-filter`/blur chrome anywhere; it was removed from the topbar and hero stage as part of this redesign.
- **Don't** nest cards inside cards, or default to the vertical-card grid as the answer for every new content group — check whether a list, table, or full-bleed layout serves better first.
- **Don't** let the bubble/spark particle layer become permanent visual chrome; it must stay a short-lived response to pointer interaction, not an ambient background animation.

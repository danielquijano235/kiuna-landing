---
name: Kiuna AI
description: Landing oscura, editorial y cercana para una consultora de IA que ofrece tres vías de crecimiento.
colors:
  ink-void: "#050608"
  paper-warm: "#f2f2ee"
  muted-slate: "#9ea3ad"
  silver-mist: "#d8ddd6"
  cyan-signal: "#84d8ff"
  amber-ember: "#d7b784"
  panel-overlay: "rgba(255, 255, 255, 0.05)"
  line-hairline: "rgba(255, 255, 255, 0.12)"
  line-hairline-strong: "rgba(255, 255, 255, 0.22)"
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
  numeral:
    fontFamily: "'Iowan Old Style', 'Palatino Linotype', 'Book Antiqua', serif"
    fontSize: "clamp(2.4rem, 4vw, 3.4rem)"
    fontWeight: 400
    lineHeight: 1
rounded:
  pill: "999px"
  lg: "1.2rem"
  md: "0.9rem"
  sm: "0.45rem"
spacing:
  sm: "0.75rem"
  md: "1.5rem"
  lg: "2.5rem"
  xl: "clamp(3rem, 9vw, 6rem)"
components:
  button-primary:
    backgroundColor: "{colors.paper-warm}"
    textColor: "{colors.ink-void}"
    rounded: "{rounded.pill}"
    padding: "0.74rem 1.16rem"
  button-primary-hover:
    backgroundColor: "{colors.paper-warm}"
    textColor: "{colors.ink-void}"
    rounded: "{rounded.pill}"
  button-ghost:
    backgroundColor: "{colors.panel-overlay}"
    textColor: "{colors.paper-warm}"
    rounded: "{rounded.pill}"
    padding: "0.74rem 1.16rem"
  vertical-card:
    backgroundColor: "{colors.panel-overlay}"
    rounded: "{rounded.md}"
    padding: "1.9rem 1.7rem 1.7rem"
---

# Design System: Kiuna AI

## 1. Overview

**Creative North Star: "The Operations Deck at Night"**

Kiuna AI reads like the control room of a business that's already running on IA: near-black ink, hairline dividers, and two disciplined accent signals — a cool cyan for live/active states, a warm amber for indices and proof — floating over a hero image of a dark automation floor. The system is editorial more than "SaaS dashboard": generous negative space, a single serif numeral face reserved for step markers and vertical indices, and restrained motion (parallax tilt, pointer-driven glow, click sparks) that reads as precision instrumentation rather than decoration.

This is a **captured baseline of the current implementation, not a locked mandate.** PRODUCT.md gives explicit permission to reinvent any part of this system — including the dark theme itself — if it moves the site further from generic AI-SaaS territory. Treat every token below as a starting point for `polish`/`critique`/`live` iteration, not a ceiling.

What this system explicitly rejects (from PRODUCT.md's anti-references): the purple-to-blue SaaS gradient, identical nested card grids, a hero built around one big gradient-text metric, and any visual pattern that reads as "template-made-by-AI" rather than a considered decision.

**Key Characteristics:**
- Near-black ink base (`#050608`) with warm off-white text, never pure white/black text-on-text.
- Two-accent discipline: cyan for interactive/live signals, amber reserved for numerals and proof indices — never both on the same element.
- One serif display face (Iowan Old Style) used exclusively for numerals (`01`–`04`), everything else in the variable sans body font.
- Pill-shaped buttons and nav chrome; rectangular, hairline-bordered cards for content.
- Atmospheric elevation: soft colored glows and blur, not hard drop shadows.

## 2. Colors

A near-black editorial base with a two-accent discipline: cyan carries interactivity, amber carries proof and sequence.

### Primary
- **Ink Void** (`#050608`): the body background and the base every gradient/overlay sits on top of. Never pure `#000`.

### Secondary
- **Cyan Signal** (`#84d8ff`): interactive/live accent — link hover, focus rings, bubble particles, hero glow, primary button gradient's cool edge. Used sparingly, never as a body-text color.
- **Amber Ember** (`#d7b784`): proof/sequence accent — numeral gradients (step numbers, vertical indices), one of three particle hues. Reserved for things that count or order.

### Neutral
- **Paper Warm** (`#f2f2ee`): primary text color and the light end of the primary-button gradient. Not pure white.
- **Muted Slate** (`#9ea3ad`): secondary/body copy color (taglines, descriptions, form notes). This is the system's most contrast-risky token — verify ≥4.5:1 against Ink Void before reusing it for anything longer than a line.
- **Silver Mist** (`#d8ddd6`): tertiary text — eyebrows, kickers, labels, contact-point values. Sits between Paper Warm and Muted Slate in emphasis.
- **Panel Overlay** (`rgba(255,255,255,0.05)`): the default translucent fill for cards, panels, and the topbar, layered over Ink Void.
- **Line Hairline** (`rgba(255,255,255,0.12)`) / **Line Hairline Strong** (`rgba(255,255,255,0.22)`): border/divider pair; Strong is reserved for hover states and section-line accents.

### Named Rules
**The Two-Accent Rule.** Only cyan and amber carry color meaning. Cyan means "interactive or alive"; amber means "counted or proven." No element uses both, and no third accent hue is introduced without renaming this rule.

## 3. Typography

**Body Font:** Aptos (with Segoe UI Variable, Segoe UI, sans-serif fallback)
**Numeral Font:** Iowan Old Style (with Palatino Linotype, Book Antiqua, serif fallback)

**Character:** A single confident sans carries almost every word on the page; a humanist serif is let in only for the numerals, so the one moment of "editorial" typography is also the one moment the design counts something (a step, a vertical, an index).

### Hierarchy
- **Display** (650 weight, `clamp(3.5rem, 9vw, 6.6rem)`, 1.02 line-height): reserved for section H2s that need maximum weight; capped well under the 6rem/96px ceiling at typical viewport widths.
- **Hero Title** (650 weight, `clamp(2rem, 3vw, 3.15rem)`, 1.08 line-height, `text-wrap: balance`, max 21ch): the actual hero H1 — deliberately smaller than the Display role above so the hero reads as a sentence, not a shout.
- **Headline** (650 weight, `clamp(1.85rem, 3.1vw, 2.7rem)`, 1.1 line-height, max 20ch): section headings (`.section-head h2`, community, contact).
- **Body** (400 weight, 1rem–1.04rem, 1.5–1.65 line-height): paragraph copy; color is always Muted Slate or Silver Mist, never full Paper Warm.
- **Label** (400 weight, 0.72rem, 0.12rem letter-spacing, uppercase): eyebrows, kickers, community label, contact-point captions.

### Named Rules
**The One Serif Rule.** Iowan Old Style appears only on numerals (`.step-number`, vertical/differentiator indices). Every other character on the page is Aptos. Introducing the serif anywhere else breaks the rule that dictates where "editorial" attention lands.

## 4. Elevation

Kiuna AI is flat-with-glow, not shadow-stacked: surfaces sit on translucent panel fills and hairline borders, and depth comes from colored ambient glow (radial gradients, `box-shadow` tinted with cyan/amber) plus `backdrop-filter: blur()` on floating chrome (topbar, stage cards), not from dark drop shadows implying a light source.

### Shadow Vocabulary
- **Ambient Lift** (`box-shadow: 0 28px 90px rgba(0,0,0,0.45)`, the `--shadow` token): the default resting shadow for cards and the hero stage — wide, soft, low-opacity; reads as depth in a dark scene rather than a hard-edged card shadow.
- **Signal Glow** (`box-shadow: 0 12px 40px rgba(132,216,255,0.16)`): cyan-tinted glow under the primary button and interactive focus states; ties elevation to the Two-Accent Rule.
- **Glass Chrome** (`backdrop-filter: blur(20px)` + layered translucent gradient background): the topbar and stage cards; used for floating UI that sits above the hero image.

### Named Rules
**The Colored-Glow Rule.** When a surface needs to feel elevated *and* interactive, its shadow is tinted with the Two-Accent color it belongs to (cyan or amber), not neutral black. Purely structural elevation (cards at rest) uses the neutral Ambient Lift instead.

## 5. Components

### Buttons
- **Shape:** full pill (`border-radius: 999px`).
- **Primary (`button-solid`):** gradient fill from Paper Warm to a light cyan tint (`linear-gradient(135deg, #f2f4ef, #a5dbf3 120%)`), Ink Void text, Signal Glow shadow. The only component where cyan and near-white text combine.
- **Ghost/Quiet (`button-ghost`, `button-quiet`):** Line Hairline border, Panel Overlay-tier background, Paper Warm text; the topbar variant widens to a fixed min-width and adds a subtle top-lit gradient.
- **Hover/Focus:** all buttons lift 1px (`translateY(-1px)`) on hover/focus-visible; no color shift, the lift alone signals interactivity.

### Cards / Containers
- **Corner Style:** 0.9rem–1.2rem radius depending on size (vertical cards vs. hero stage); the lead-form and community panel use smaller radii (0.75rem / 0.5rem) to read as denser, more functional containers.
- **Background:** Panel Overlay gradient (5%→1.5% white) over Ink Void.
- **Shadow Strategy:** Ambient Lift at rest; vertical cards additionally brighten their border to Line Hairline Strong on hover, with a 4px lift.
- **Border:** 1px Line Hairline by default.
- **Internal Padding:** roughly 1.7–1.9rem for content cards, 1.25rem for the lead-form, 2rem for the community panel.

### Inputs / Fields
- **Style:** Line Hairline border, `rgba(5,6,8,0.42)` fill (darker than the page background, reads as a recessed field), 0.45rem radius.
- **Focus:** border shifts to cyan at 46% opacity plus a soft 3px cyan ring (`box-shadow: 0 0 0 3px rgba(132,216,255,0.08)`) — the field itself brightens (`rgba(5,6,8,0.62)`).

### Navigation
- **Style:** floating pill topbar, Glass Chrome background, centered and inset from the viewport edge rather than full-width.
- **Typography:** Muted Slate links at 0.92rem, becoming Paper Warm with a faint Panel Overlay background pill on hover/focus.
- **Mobile treatment:** collapses to a hamburger (`.nav-toggle`) below 900px; the nav list becomes a full-width stacked column inside the same pill chrome when open.

### Signature Component: Bubble/Spark Particle Layer
A fixed-position particle system (`.bubble-layer`, `.click-bubble`) driven by pointer move (sparks) and pointer down (bursts), cycling through the Two-Accent palette plus Silver Mist. Motion uses `cubic-bezier(0.16, 1, 0.3, 1)` (ease-out) blooms with blur-out fades — this is the site's one "delight" component and should stay restrained (short-lived, capped particle count) rather than become persistent chrome.

## 6. Do's and Don'ts

### Do:
- **Do** keep the Two-Accent Rule: cyan for interactive/live, amber for counted/proven, never mixed on one element.
- **Do** verify Muted Slate (`#9ea3ad`) body text against Ink Void before reusing it for new copy blocks — it's the system's tightest contrast margin, not a safe default.
- **Do** reserve the Iowan Old Style serif for numerals only; every other text element is Aptos.
- **Do** use tinted, colored glows (Signal Glow) for interactive elevation and the neutral Ambient Lift for structural/resting elevation — never a flat black drop shadow.
- **Do** treat this file as a captured baseline: per PRODUCT.md, the palette, the dark theme, and every component here are open to reinvention if a change moves the site further from generic AI-SaaS look.

### Don't:
- **Don't** introduce a purple-to-blue gradient or any third accent hue alongside cyan/amber.
- **Don't** put gradient text (`background-clip: text`) on anything except the existing amber step-number treatment — it's already the system's one deliberate exception; adding more turns a rule into decoration.
- **Don't** add colored `border-left`/`border-right` stripes as a callout pattern; the system uses full hairline borders or background tints instead.
- **Don't** nest cards inside cards, or default to the vertical-card grid as the answer for every new content group — check whether a list, table, or full-bleed layout serves better first.
- **Don't** let the bubble/spark particle layer become permanent visual chrome; it must stay a short-lived response to pointer interaction, not an ambient background animation.

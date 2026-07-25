# Ripples — Home Design System

Source of truth for the **homepage** visual language. Inspired in structure and continuity by [GRU Space](https://www.gru.space/) — one atmospheric scroll, not stacked “panels” — while keeping Ripples’ fountain/water identity.

Other pages (Creations, Practice, Buzz, Contact) are deferred. Nav labels stay as placeholders until those routes ship. Update this file before inventing new tokens or section patterns.

---

## Current scope

| In scope | Out of scope (for now) |
|---|---|
| `/` homepage only | Inner page layouts, forms, grids |
| Nav labels (text only) | Working nav routes |
| Continuous page atmosphere | Section borders / flat alternating bands |

**Homepage stack (top → bottom):**

1. **Hero** — scroll-synced fountain frames + overlay copy  
2. **Intro band** — brand statement + four stats  
3. **Brand trail** — client logo marquee  
4. **CTA panel** — single full-width contact / project card  
5. **Footer** — brand, explore labels, contact  

All of 2–5 sit on **one shared page gradient** — no hairline rules between sections.

---

## Philosophy

- **One canvas.** The page is a single deep wash that shifts subtly top → bottom. Sections are spacing + type only, never boxed slabs.
- **Hero first.** The scroll animation carries emotion; below it, quieter support.
- **One idea per section.** Intro = who we are. Trail = who trusts us. Footer = reach us.
- **Brand visible.** “Ripples” in the nav is a hero-level signal; ice-blue labels never overpower display type.
- **Restraint.** No cards, pills, floating badges, purple glows, or newspaper rules.
- **Shared horizontal rhythm.** Text uses `.r-container` + `--space-page-x`.

---

## Color & atmosphere

| Token | Value | Role |
|---|---|---|
| `--color-bg` | `#000000` | Matches hero end-frame black |
| `--color-bg-mid` | `#060b12` | Cool blue-ink mid |
| `--color-bg-lift` | `#0b1520` | Soft blue lift |
| `--color-text` | `#f3efe6` | Primary type |
| `--color-text-soft` | `rgba(243,239,230,0.78)` | Nav |
| `--color-text-muted` | `rgba(243,239,230,0.52)` | Body / captions |
| `--color-accent` | `#8eb8d4` | Labels, section headers, active hero dots |
| `--color-accent-soft` | `rgba(142,184,212,0.32)` | Soft accent borders / hover washes |
| `--color-glow` | `rgba(70,130,180,0.08)` | Soft blue depth mid-page |
| `--page-gradient` | black → blue-ink → black | Full post-hero wash |

**Accent rule:** Ice blue (`--color-accent`) is for **labels and interaction only** — never large fills. It sits in the same cool family as the page gradient (no gold).

### Page shell

```html
<div class="home-page">
  <!-- hero -->
  <div class="home-page__below">
    <div class="home-page__atmosphere" aria-hidden="true"></div>
    <main class="home-page__main">…</main>
    <footer class="site-footer">…</footer>
  </div>
</div>
```

- `.home-page__below` applies `--page-gradient`.
- Gradient **starts and holds pure `#000`** so it locks to the hero’s last black frame.
- Mid-page lift is **cool blue**, not warm/orange.
- Atmosphere keeps the top edge black; blue glow sits mid/lower only.
- Brand trail and footer stay transparent.

**Accent rule:** Ice blue is for labels and interaction only — never large fills.

---

## Typography

| Role | Font | Where |
|---|---|---|
| Display | Cormorant Garamond | `.r-display`, `.home-hero__title`, logo |
| Body / UI | Outfit | `.r-body`, nav, footer, taglines |

### Scale

| Token | Use |
|---|---|
| `--text-xs` | Labels, nav, footer meta |
| `--text-sm` | Footer copy |
| `--text-base` | Intro body |
| `--text-2xl` | Stats |
| `--text-3xl` | Section display |
| Hero title | Clamp in `hero.css` |

### Patterns

```html
<span class="r-label">Ripples Engineering</span>
<h2 class="r-display">We sculpt water<br /><em>into wonder</em></h2>
<p class="r-body">Supporting sentence.</p>
<span class="r-stat">36+</span>
```

- Labels: uppercase, wide tracking, accent ice blue.
- Display italics: second line in `<em>` — muted, quieter than the main line.
- Hero titles: 2–4 words. Taglines: one line. No eyebrows.

---

## Spacing & layout

| Token | Use |
|---|---|
| `--space-page-x` | Horizontal padding |
| `--space-section-y` | Vertical section padding (generous) |
| `--space-block` | Trail head → marquee gap |
| `--max-width` | `76rem` |

```html
<div class="r-container">…</div>
```

Home sections use `.home-section` for vertical rhythm **only** — no dividers.

---

## Homepage sections

### 1. Hero

- `HeroVideoAnimation` + `HeroCopy` + `SiteNav variant="hero"`
- CSS: `src/styles/hero.css`
- Phases: edit `src/HeroCopy.jsx` only

| Progress | Title | Tagline |
|---|---|---|
| 0–22% | Held breath | Before the first surge. |
| 22–40% | Built to rise | Every pump. Every nozzle. Made here. |
| 40–58% | It breaks free | Water climbs — light catches every arc. |
| 58–74% | Spectacle | Laser. Music. Water. In sync. |
| 74–88% | Their faces | That pause. That gasp. That wow. |
| 88–100% | Since 1989 | Design. Build. Manufacture. |

Hero bottom scrim should ease into the page gradient (darken toward ink), not a hard cut.

### 2. Intro band

- `.intro-band.home-section` → `.intro-band__inner.r-container`
- Copy column + aside (body + stats grid)
- Data: `HOME_STATS` in `src/data/site.js`
- Stats: 4-column grid on desktop, 2-column on small screens

### 3. Brand trail

- Component: `BrandTrail`
- Data: `BRAND_LOGOS` in `src/data/brands.js`
- Label pattern: **Backed by** (quiet, GRU-like)
- Transparent section; edge fade via CSS `mask-image` only
- Marquee ~55s linear; pause + slight lift on logo hover
- Right-side faded **Earth photo** (Unsplash blue-marble), circular mask + soft dissolve into the page wash; slow spin
- Respects `prefers-reduced-motion`

### 4. CTA panel

- Component: `HomeCta`
- One full-width interactive card (no image / no dual layout)
- Soft blue radial lift on a dark panel — inspired by [GRU Space](https://www.gru.space/)
- Label + display headline (ice-blue italic emphasis) + supporting copy + mailto button
- Button: high-contrast cream fill, soft radius

### 5. Footer

- Transparent on the same canvas
- Soft inset highlight above the legal row (not a hard border)
- Explore = labels only until routes exist

---

## Components

| Component | File | Notes |
|---|---|---|
| `SiteNav` | `src/components/SiteNav.jsx` | Hero variant; items are spans |
| `SiteFooter` | `src/components/SiteFooter.jsx` | Mailto/tel live |
| `BrandTrail` | `src/components/BrandTrail.jsx` | Marquee |
| `HomeCta` | `src/components/HomeCta.jsx` | Single CTA panel |
| `HeroCopy` | `src/HeroCopy.jsx` | Scroll opacity |

---

## CSS map

| File | Owns |
|---|---|
| `src/styles/design-system.css` | Tokens, `--page-gradient`, `.r-*` |
| `src/styles/components.css` | `.home-page`, nav, footer, intro, trail |
| `src/styles/hero.css` | Hero overlay |
| `src/index.css` | Imports + reset |

---

## Motion

| Element | Behavior |
|---|---|
| Hero copy | Scroll-tied opacity |
| Hero dots | Accent active / soft past |
| Brand marquee | 55s loop, pause on hover |
| Logo hover | Opacity + grayscale + 2px lift |

No bounce, no competing loops in one viewport.

---

## Imagery

- Logos: ripplesfountains.com via `brands.js` — `object-fit: contain`, `loading="lazy"`
- Hero frames: `hero-video-anim` — do not restyle the frame plane here

---

## When adding a new page later

1. Create `src/pages/YourPage.jsx`
2. Add route in `App.jsx`
3. Wire `NAV_LINKS` with `to` + restore `<Link>` in nav/footer
4. Reuse the same `--page-gradient` canvas — do not introduce a second background system
5. Extend this doc; do not fork tokens

---

## Reference

- Continuity / premium scroll feel: [GRU Space](https://www.gru.space/)
- Content & logos: [ripplesfountains.com](https://www.ripplesfountains.com/)

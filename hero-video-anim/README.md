# hero-video-anim

Drop-in **scroll-driven video hero** for React. Pre-export frames as WebP, drop them in `public/frames/`, render one component  Lenis + GSAP ScrollTrigger + canvas playback are already wired.

## Quick start

### 1. Copy this folder into your project

```
your-app/
  src/
    hero-video-anim/     ← copy entire folder here
  public/
    frames/              ← your frame-0001.webp … frame-0241.webp
```

### 2. Install peer dependencies

```bash
npm install gsap lenis
```

### 3. Import Lenis CSS once (in `main.jsx`)

```js
import 'lenis/dist/lenis.css'
```

Optional helpers in your global CSS:

```css
html.lenis,
html.lenis body {
  height: auto;
}
```

### 4. Use the component

```jsx
import HeroVideoAnimation from './hero-video-anim'

export default function Home() {
  return (
    <>
      <HeroVideoAnimation frames={{ frameCount: 241 }} />

      <section style={{ minHeight: '100vh' }}>
        Rest of your page…
      </section>
    </>
  )
}
```

That's it. Lenis is included automatically (`lenis={true}` by default).

---

## Export frames from video

```bash
mkdir -p public/frames
ffmpeg -i your-video.mp4 -vf "fps=24" -q:v 80 public/frames/frame-%04d.webp
```

Update `frameCount` to match the number of files produced.

---

## `frames` prop

All fields are optional except **`frameCount`** (when your sequence differs from defaults).

```jsx
<HeroVideoAnimation
  frames={{
    frameCount: 241,       // required if not 241
    basePath: '/frames',   // default
    startIndex: 1,         // 1 = frame-0001.webp
    extension: 'webp',
    prefix: 'frame-',
    padLength: 4,
    priorityCount: 24,
    stride: 10,
    maxConcurrent: 10,
    maxDpr: 2,
  }}
/>
```

---

## Other props

| Prop | Default | Description |
|---|---|---|
| `scrollLength` | `'+=130%'` | GSAP ScrollTrigger pin distance (lower = faster completion) |
| `scrub` | `0.4` | Scroll scrub smoothing |
| `showLoader` | `true` | Full-screen loader until first frame |
| `showProgressBar` | `true` | Top progress bar |
| `showHint` | `true` | "Scroll" hint at bottom |
| `showVignette` | `true` | Edge vignette overlay |
| `lenis` | `true` | Wrap with built-in LenisProvider |
| `lenisOptions` |  | Override Lenis settings |
| `className` | `''` | Root class |
| `id` | `'hero-video-anim'` | Root id |
| `children` |  | Overlay content (text, buttons) |

### Overlay example

```jsx
<HeroVideoAnimation frames={{ frameCount: 241 }}>
  <div style={{ padding: '2rem', textAlign: 'center', marginTop: '30vh' }}>
    <h1>Your headline</h1>
    <p>Scroll to play the animation</p>
  </div>
</HeroVideoAnimation>
```

### App already using Lenis

If your app already has a Lenis + GSAP setup, disable the built-in provider:

```jsx
<LenisProvider>  {/* your app-level provider */}
  <HeroVideoAnimation frames={{ frameCount: 241 }} lenis={false} />
</LenisProvider>
```

Use the `LenisProvider` exported from `./hero-video-anim` or your own.

---

## Tuning scroll speed

**Less scrolling to finish the animation:**

```jsx
<HeroVideoAnimation
  frames={{ frameCount: 241 }}
  scrollLength="+=100%"
/>
```

**More movement per wheel tick**  edit `lenis/LenisProvider.jsx`:

```js
wheelMultiplier: 3,  // try 4–5
```

---

## Folder structure

```
hero-video-anim/
  HeroVideoAnimation.jsx   ← main component
  HeroVideoAnimation.css
  defaults.js
  index.js                 ← public exports
  lenis/                   ← smooth scroll + GSAP sync
  scroll-frames/           ← frame loader + canvas renderer
  package.json             ← peer dependency list
  README.md
```

---

## Exports

```js
import HeroVideoAnimation, {
  HeroVideoAnimationInner,
  LenisProvider,
  useLenis,
  useScrollFrameSequence,
  DEFAULT_FRAMES,
} from './hero-video-anim'
```

---

## Troubleshooting

| Issue | Fix |
|---|---|
| Blank canvas | Check `frameCount`, files in `public/frames/`, `startIndex` |
| Scroll feels dead | Import `lenis/dist/lenis.css`; ensure only one Lenis instance |
| Too much scrolling | Lower `scrollLength` (e.g. `'+=100%'`) |
| Jank while loading | Increase `priorityCount`; frames load progressively |

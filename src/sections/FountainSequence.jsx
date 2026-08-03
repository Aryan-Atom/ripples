import { Suspense, useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import LazyCanvas from '../three/LazyCanvas'
import FountainExperience from '../three/FountainExperience'
import { isMobileViewport, prefersReducedMotion } from '../motion/preferences'
import { useWebGLSupport } from '../three/useWebGLSupport'

gsap.registerPlugin(ScrollTrigger)

const BEATS = [
  {
    id: 'wide',
    kicker: 'Engineered Spectacle',
    line: 'India’s largest fountain manufacturer',
  },
  {
    id: 'orbit',
    kicker: 'Water · Light · Sound',
    line: 'Choreographed in perfect sync',
  },
  {
    id: 'low',
    kicker: 'Built to Command Space',
    line: 'Scale you feel from the ground up',
  },
  {
    id: 'rise',
    kicker: 'Multimedia Fountain Show',
    line: 'Jets · Lighting · Control systems',
  },
  {
    id: 'push',
    kicker: 'See the Project',
    line: 'Begin your consultation',
    cta: true,
  },
]

/**
 * Orbital camera keyframes (azimuth / elevation / radius) → cinematic arcs.
 * Holds keep each angle readable; moves ease between distinct viewpoints.
 *
 * az  — degrees around Y (0 = front +Z)
 * el  — degrees above horizon
 * r   — distance from look target
 */
const KEYFRAMES = [
  // 1 — Wide establishing (front)
  {
    p: 0,
    az: 0,
    el: 10,
    r: 17,
    tx: 0,
    ty: 2.1,
    tz: 0,
    fov: 44,
    iGold: 1.7,
    iTeal: 0.3,
    iWarm: 0.75,
  },
  {
    p: 0.12,
    az: 0,
    el: 10,
    r: 17,
    tx: 0,
    ty: 2.1,
    tz: 0,
    fov: 44,
    iGold: 1.7,
    iTeal: 0.3,
    iWarm: 0.75,
  },
  // 2 — Sweep to side / three-quarter
  {
    p: 0.26,
    az: 72,
    el: 14,
    r: 14.5,
    tx: 0.15,
    ty: 2.4,
    tz: 0,
    fov: 40,
    iGold: 0.85,
    iTeal: 1.7,
    iWarm: 0.65,
  },
  {
    p: 0.34,
    az: 78,
    el: 14,
    r: 14.2,
    tx: 0.15,
    ty: 2.4,
    tz: 0,
    fov: 40,
    iGold: 0.85,
    iTeal: 1.7,
    iWarm: 0.65,
  },
  // 3 — Low heroic (ground-level drama)
  {
    p: 0.48,
    az: 148,
    el: 4,
    r: 11,
    tx: 0,
    ty: 3.2,
    tz: 0.1,
    fov: 38,
    iGold: 1.9,
    iTeal: 0.55,
    iWarm: 1.1,
  },
  {
    p: 0.56,
    az: 155,
    el: 3.5,
    r: 10.6,
    tx: 0,
    ty: 3.3,
    tz: 0.1,
    fov: 37,
    iGold: 2.0,
    iTeal: 0.5,
    iWarm: 1.15,
  },
  // 4 — Crane / high look-down
  {
    p: 0.72,
    az: 220,
    el: 58,
    r: 15.5,
    tx: 0,
    ty: 0.6,
    tz: 0,
    fov: 46,
    iGold: 1.2,
    iTeal: 1.25,
    iWarm: 1.45,
  },
  {
    p: 0.8,
    az: 228,
    el: 60,
    r: 15,
    tx: 0,
    ty: 0.5,
    tz: 0,
    fov: 46,
    iGold: 1.2,
    iTeal: 1.25,
    iWarm: 1.45,
  },
  // 5 — Macro push into jets
  {
    p: 0.94,
    az: 28,
    el: 16,
    r: 5.4,
    tx: 0.35,
    ty: 2.85,
    tz: 0.2,
    fov: 30,
    iGold: 2.35,
    iTeal: 0.4,
    iWarm: 1.2,
  },
  {
    p: 1,
    az: 22,
    el: 15,
    r: 4.6,
    tx: 0.4,
    ty: 2.95,
    tz: 0.25,
    fov: 28,
    iGold: 2.5,
    iTeal: 0.35,
    iWarm: 1.25,
  },
]

const ORBIT_PROPS = ['az', 'el', 'r', 'tx', 'ty', 'tz', 'fov', 'iGold', 'iTeal', 'iWarm']
const easeMove = gsap.parseEase('power3.inOut')
const easeHold = gsap.parseEase('none')

function polarToCartesian(azDeg, elDeg, r, tx, ty, tz) {
  const az = (azDeg * Math.PI) / 180
  const el = (elDeg * Math.PI) / 180
  const cosEl = Math.cos(el)
  return {
    x: tx + r * cosEl * Math.sin(az),
    y: ty + r * Math.sin(el),
    z: tz + r * cosEl * Math.cos(az),
  }
}

function sampleCamera(progress) {
  const p = Math.min(1, Math.max(0, progress))
  let i = 0
  while (i < KEYFRAMES.length - 1 && KEYFRAMES[i + 1].p < p) i += 1
  const a = KEYFRAMES[i]
  const b = KEYFRAMES[Math.min(i + 1, KEYFRAMES.length - 1)]
  const span = b.p - a.p || 1
  const raw = (p - a.p) / span

  // Holds (nearly identical poses) stay linear; moves get cinematic ease
  const isHold =
    Math.abs(a.az - b.az) < 4 &&
    Math.abs(a.el - b.el) < 3 &&
    Math.abs(a.r - b.r) < 0.6
  const t = (isHold ? easeHold : easeMove)(raw)

  const mixed = {}
  ORBIT_PROPS.forEach((k) => {
    // Shortest-path azimuth wrap so orbits never reverse the long way
    if (k === 'az') {
      let d = b.az - a.az
      while (d > 180) d -= 360
      while (d < -180) d += 360
      mixed.az = a.az + d * t
    } else {
      mixed[k] = a[k] + (b[k] - a[k]) * t
    }
  })

  const pos = polarToCartesian(
    mixed.az,
    mixed.el,
    mixed.r,
    mixed.tx,
    mixed.ty,
    mixed.tz,
  )

  return {
    x: pos.x,
    y: pos.y,
    z: pos.z,
    tx: mixed.tx,
    ty: mixed.ty,
    tz: mixed.tz,
    fov: mixed.fov,
    iGold: mixed.iGold,
    iTeal: mixed.iTeal,
    iWarm: mixed.iWarm,
  }
}

function beatIndex(progress) {
  if (progress < 0.22) return 0
  if (progress < 0.42) return 1
  if (progress < 0.62) return 2
  if (progress < 0.84) return 3
  return 4
}

function ReducedFallback() {
  return (
    <section className="bg-[#080A0C] px-[clamp(1.25rem,4vw,3rem)] py-24">
      <img
        src="/images/journey2.jpg"
        alt="Fountain show"
        className="w-full object-cover opacity-75"
        loading="lazy"
      />
      <div className="mt-10 grid gap-8 md:grid-cols-2">
        {BEATS.map((b) => (
          <div key={b.id}>
            <p className="font-display text-2xl uppercase tracking-[0.08em] text-mist">
              {b.kicker}
            </p>
            {b.line && (
              <p className="mt-2 text-sm uppercase tracking-[0.15em] text-gold/80">
                {b.line}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

export default function FountainSequence() {
  const pinRef = useRef(null)
  const overlayRefs = useRef([])
  const stateRef = useRef(sampleCamera(0))
  const progressRef = useRef(0)
  const [activeBeat, setActiveBeat] = useState(0)
  const [ready3d, setReady3d] = useState(false)
  const webgl = useWebGLSupport()
  const mobile = isMobileViewport()
  const reduced = prefersReducedMotion()
  const use3d = webgl && !mobile && !reduced

  useEffect(() => {
    if (!use3d) return
    const el = pinRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setReady3d(true)
      },
      { rootMargin: '60% 0px', threshold: 0 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [use3d])

  useEffect(() => {
    const pin = pinRef.current
    if (!pin || reduced) return

    Object.assign(stateRef.current, sampleCamera(0))

    const overlays = overlayRefs.current.filter(Boolean)
    gsap.set(overlays, { autoAlpha: 0, y: 28 })

    let lastBeat = 0
    if (overlays[0]) gsap.set(overlays[0], { autoAlpha: 0.95, y: 0 })

    const showBeat = (beat) => {
      overlays.forEach((el, i) => {
        const on = i === beat
        gsap.to(el, {
          autoAlpha: on ? 0.95 : 0,
          y: on ? 0 : 18,
          duration: on ? 0.55 : 0.35,
          overwrite: 'auto',
          ease: on ? 'power3.out' : 'power2.in',
        })
      })
      setActiveBeat(beat)
    }

    const st = ScrollTrigger.create({
      trigger: pin,
      start: 'top top',
      end: use3d ? '+=560%' : '+=240%',
      pin: true,
      scrub: 0.55,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        const p = self.progress
        progressRef.current = p
        Object.assign(stateRef.current, sampleCamera(p))

        const beat = beatIndex(p)
        if (beat !== lastBeat) {
          lastBeat = beat
          showBeat(beat)
        }
      },
    })

    return () => st.kill()
  }, [use3d, reduced])

  if (reduced) return <ReducedFallback />

  const start = sampleCamera(0)

  return (
    <section className="relative bg-[#080A0C]" aria-label="Fountain showcase">
      <div
        ref={pinRef}
        className="relative h-screen w-full overflow-hidden bg-[#080A0C]"
      >
        {use3d && ready3d ? (
          <LazyCanvas
            eager
            className="absolute inset-0 z-0 h-full w-full"
            camera={{
              position: [start.x, start.y, start.z],
              fov: start.fov,
              near: 0.1,
              far: 120,
            }}
            fallback={
              <img
                src="/images/journey2.jpg"
                alt=""
                className="h-full w-full object-cover opacity-55"
              />
            }
          >
            <Suspense fallback={null}>
              <FountainExperience stateRef={stateRef} />
            </Suspense>
          </LazyCanvas>
        ) : (
          <img
            src="/images/journey2.jpg"
            alt="Multimedia fountain show"
            className="absolute inset-0 h-full w-full object-cover opacity-60"
          />
        )}

        <div
          className="pointer-events-none absolute inset-0 z-[5]"
          style={{
            background:
              'linear-gradient(to top, rgba(8,10,12,0.78) 0%, transparent 48%), linear-gradient(to right, rgba(8,10,12,0.5) 0%, transparent 42%)',
          }}
        />

        <div className="pointer-events-none absolute inset-0 z-10">
          {BEATS.map((beat, i) => (
            <div
              key={beat.id}
              ref={(el) => {
                overlayRefs.current[i] = el
              }}
              className="absolute bottom-[11%] left-[clamp(1.25rem,5vw,4.5rem)] max-w-xl opacity-0"
              aria-hidden={activeBeat !== i}
            >
              <p className="font-display text-[clamp(1.85rem,4.2vw,3.4rem)] font-normal uppercase leading-[1.15] tracking-[0.08em] text-mist">
                {beat.kicker}
              </p>
              {beat.line && (
                <p className="mt-3 font-body text-[0.72rem] font-medium uppercase tracking-[0.15em] text-gold">
                  {beat.line}
                </p>
              )}
              {beat.cta && (
                <a
                  href="#projects"
                  data-cursor="hover"
                  className="pointer-events-auto mt-7 inline-flex border border-gold px-8 py-3.5 font-body text-[0.68rem] font-medium uppercase tracking-[0.15em] text-gold transition-colors hover:bg-gold hover:text-void"
                >
                  See the Project
                </a>
              )}
            </div>
          ))}
        </div>

        <div className="pointer-events-none absolute bottom-8 left-[clamp(1.25rem,5vw,4.5rem)] z-10 flex items-center gap-3">
          {BEATS.map((b, i) => (
            <span
              key={b.id}
              className="h-px transition-all duration-500"
              style={{
                width: i === activeBeat ? 28 : 12,
                background:
                  i <= activeBeat ? '#C9A227' : 'rgba(250,248,245,0.25)',
              }}
            />
          ))}
          <span className="ml-2 font-body text-[0.6rem] uppercase tracking-[0.2em] text-mist/50">
            0{activeBeat + 1} / 0{BEATS.length}
          </span>
        </div>
      </div>
    </section>
  )
}

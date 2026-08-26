import { useCallback, useId, useLayoutEffect, useRef, useState } from 'react'
import { useHeroScrollSubscribe } from 'hero-video-anim'

/** Share of hero pin scroll used for the RIPPLES zoom cut (desktop). */
export const LOGO_REVEAL_END = 0.42

/** Mobile uses a longer share so the word→video handoff isn't rushed. */
const LOGO_REVEAL_END_MOBILE = 0.5

export function getLogoRevealEnd() {
  if (typeof window === 'undefined') return LOGO_REVEAL_END
  return window.matchMedia('(max-width: 720px), (pointer: coarse)').matches
    ? LOGO_REVEAL_END_MOBILE
    : LOGO_REVEAL_END
}

const SCALE_END = 16
const SCALE_END_MOBILE = 12

const VB_W = 1600
const VB_H = 900
/** Approx width of "Ripples" in ems in Ripples Logo at current tracking. */
const WORD_EM = 2.5

function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - ((-2 * t + 2) ** 3) / 2
}

function isNarrowHero() {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(max-width: 720px), (pointer: coarse)').matches
}

/** Shared type node  mask + rim must use identical metrics. */
function LogoType({ className = '', fill, stroke, children, textRef }) {
  return (
    <text
      ref={textRef}
      className={`hero-logo-reveal__type ${className}`.trim()}
      x="0"
      y="0"
      textAnchor="middle"
      // Cap-height optical center (dominant-baseline is unreliable on mobile WebKit)
      dy="0.35em"
      fill={fill}
      stroke={stroke ?? 'none'}
      strokeWidth="0"
      fontFamily="'Ripples Logo', Montserrat, sans-serif"
      fontWeight="800"
      fontSize="240"
    >
      {children}
    </text>
  )
}

/**
 * Scroll-scrubbed intro: gradient plate with RIPPLES cut out; zooms until video fills the frame.
 * Mask hole + white rim share one SVG / one type class so they stay aligned.
 */
export default function HeroLogoReveal() {
  const wrapRef = useRef(null)
  const scaleRef = useRef(null)
  const plateRef = useRef(null)
  const rimRef = useRef(null)
  const maskTypeRef = useRef(null)
  const rimTypeRef = useRef(null)
  const progressRef = useRef(0)
  const narrowRef = useRef(false)
  const awayRef = useRef(false)
  const [resetGen, setResetGen] = useState(0)
  const reactId = useId().replace(/:/g, '')
  const maskId = `ripples-cut-${reactId}`
  const gradId = `ripples-grad-${reactId}`

  const applyTypeMetrics = useCallback((size, stroke) => {
    const sizeValue = String(size)
    const strokeValue = String(stroke)
    if (maskTypeRef.current) {
      maskTypeRef.current.setAttribute('font-size', sizeValue)
      maskTypeRef.current.setAttribute('stroke', 'none')
      maskTypeRef.current.setAttribute('stroke-width', '0')
    }
    if (rimTypeRef.current) {
      rimTypeRef.current.setAttribute('font-size', sizeValue)
      rimTypeRef.current.setAttribute('stroke', '#ffffff')
      rimTypeRef.current.setAttribute('stroke-width', strokeValue)
    }
  }, [])

  const fitType = useCallback(() => {
    const scaler = scaleRef.current
    if (!scaler) return

    // Layout size only  getBoundingClientRect includes the zoom transform and
    // desyncs the SVG mask from the rim after scroll-back.
    const width = scaler.offsetWidth
    const height = scaler.offsetHeight
    if (width < 1 || height < 1) return

    // With xMidYMid slice, visible viewBox width is what fits after cover-crop
    const cover = Math.max(width / VB_W, height / VB_H)
    const visibleW = width / cover
    const size = Math.max(64, (visibleW * 0.9) / WORD_EM)
    const stroke = Math.max(1.1, size * 0.008)

    scaler.style.setProperty('--hero-logo-size', `${size}px`)
    scaler.style.setProperty('--hero-logo-stroke', `${stroke}px`)
    applyTypeMetrics(size, stroke)
  }, [applyTypeMetrics])

  const update = useCallback((progress) => {
    const wrap = wrapRef.current
    const scaler = scaleRef.current
    const plate = plateRef.current
    const rim = rimRef.current
    if (!wrap || !scaler || !plate || !rim) return

    progressRef.current = progress
    const mobile = narrowRef.current
    const logoEnd = getLogoRevealEnd()
    const scaleEnd = mobile ? SCALE_END_MOBILE : SCALE_END

    const raw = Math.min(1, Math.max(0, progress / logoEnd))
    const t = easeInOutCubic(raw)
    const scale = 1 + t * (scaleEnd - 1)

    const fadeStart = mobile ? 0.48 : 0.4
    const fadeT =
      raw < fadeStart ? 0 : easeInOutCubic((raw - fadeStart) / (1 - fadeStart))
    const plateOpacity = 1 - fadeT * (mobile ? 0.98 : 0.95)

    const rimStart = mobile ? 0.08 : 0.12
    const rimSpan = mobile ? 0.32 : 0.38
    const rimFadeT =
      raw < rimStart ? 0 : easeInOutCubic(Math.min(1, (raw - rimStart) / rimSpan))
    const rimOpacity = 1 - rimFadeT
    const hide = raw >= 0.995
    const rest = raw <= 0.002

    if (raw >= 0.45) awayRef.current = true

    wrap.style.pointerEvents = 'none'
    plate.setAttribute('opacity', String(Math.max(0, plateOpacity)))
    rim.setAttribute('opacity', String(Math.max(0, rimOpacity)))

    // Drop the zoomed compositor layer while off-screen so it cannot ghost
    // extra stroke rasters when we return to the top.
    if (hide || rest) {
      wrap.style.opacity = hide ? '0' : '1'
      scaler.style.willChange = 'auto'
      scaler.style.transform = 'none'
      if (rest) {
        plate.setAttribute('opacity', '1')
        rim.setAttribute('opacity', '1')
        if (awayRef.current) {
          awayRef.current = false
          setResetGen((n) => n + 1)
        }
      }
      return
    }

    wrap.style.opacity = '1'
    scaler.style.willChange = 'transform'
    scaler.style.transform = `scale(${scale})`
  }, [])

  useHeroScrollSubscribe(update)

  useLayoutEffect(() => {
    narrowRef.current = isNarrowHero()
    fitType()
    update(progressRef.current)

    const scaler = scaleRef.current
    if (!scaler) return undefined

    const ro = new ResizeObserver(() => {
      narrowRef.current = isNarrowHero()
      fitType()
      update(progressRef.current)
    })
    ro.observe(scaler)

    const onOrient = () => {
      narrowRef.current = isNarrowHero()
      fitType()
      update(progressRef.current)
    }
    window.addEventListener('orientationchange', onOrient)

    let cancelled = false
    document.fonts?.ready?.then(() => {
      if (cancelled) return
      fitType()
      update(progressRef.current)
    })

    return () => {
      cancelled = true
      ro.disconnect()
      window.removeEventListener('orientationchange', onOrient)
    }
  }, [fitType, update, resetGen])

  const cx = VB_W / 2
  const cy = VB_H / 2

  return (
    <div ref={wrapRef} className="hero-logo-reveal" aria-hidden="true">
      <div ref={scaleRef} className="hero-logo-reveal__scaler">
        <svg
          key={resetGen}
          className="hero-logo-reveal__svg"
          viewBox={`0 0 ${VB_W} ${VB_H}`}
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#000000" />
              <stop offset="10%" stopColor="#000000" />
              <stop offset="26%" stopColor="#061220" />
              <stop offset="44%" stopColor="#0a1e38" />
              <stop offset="58%" stopColor="#102848" />
              <stop offset="76%" stopColor="#081828" />
              <stop offset="100%" stopColor="#000000" />
            </linearGradient>
            <mask
              id={maskId}
              maskUnits="userSpaceOnUse"
              maskContentUnits="userSpaceOnUse"
              x="0"
              y="0"
              width={VB_W}
              height={VB_H}
            >
              <rect width={VB_W} height={VB_H} fill="#fff" />
              <g transform={`translate(${cx} ${cy})`}>
                <LogoType fill="#000" stroke="none" textRef={maskTypeRef}>
                  Ripples
                </LogoType>
              </g>
            </mask>
          </defs>

          <rect
            ref={plateRef}
            width={VB_W}
            height={VB_H}
            fill={`url(#${gradId})`}
            mask={`url(#${maskId})`}
          />

          <g transform={`translate(${cx} ${cy})`} ref={rimRef}>
            <LogoType
              className="hero-logo-reveal__rim"
              fill="none"
              stroke="#ffffff"
              textRef={rimTypeRef}
            >
              Ripples
            </LogoType>
          </g>
        </svg>
      </div>
    </div>
  )
}

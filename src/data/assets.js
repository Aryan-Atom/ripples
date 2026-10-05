import manifest from '../asset-manifest.json' with { type: 'json' }

const MANIFEST_KEYS = Object.keys(manifest)

/** basename → all manifest keys ending with that file name */
const BY_BASENAME = new Map()
for (const key of MANIFEST_KEYS) {
  const base = key.split('/').pop()
  if (!BY_BASENAME.has(base)) BY_BASENAME.set(base, [])
  BY_BASENAME.get(base).push(key)
}

/**
 * Map legacy short paths (used in data files) onto the new
 * "Ripples Assets/…" tree when filenames stayed the same.
 */
const LEGACY_PREFIX_HINTS = [
  [/^(?:case-study\/)?W-?Goa\/(?:Section \d\/)?/i, 'CaseStudy/WGoa'],
  [/^case-study\//i, 'CaseStudy/NehruGarden'],
  [/^architectural\//i, 'WaterWorks/Architectural'],
  [/^multimedia\//i, 'WaterWorks/Multimedia'],
  [/^prefab\//i, 'WaterWorks/Prefabs'],
  [/^ww-others\//i, 'WaterWorks/Others'],
  [/^ripples-assets\/Logo\//i, 'Navbar&Footer'],
  [/^ripples-assets\//i, 'WaterWorks/Multimedia/Section 2'],
  [/^front-page\//i, 'WorldWide'],
  [/^events\//i, 'WorldWide'],
  [/^company_intro\.mp4$/i, 'Homepage'],
  [/^video_engineering\.mp4$/i, 'Homepage'],
  [/^WebsiteLogo\.mp4$/i, 'Gif'],
  [/^RipplesLogoAnimationWithMusic\.mp4$/i, 'Homepage'],
  [/^(FromPitToPool|OffSiteFabricated|StructuralAssembly|Final|Completion)\.(jpg|webp)$/i, 'CaseStudy/WGoa'],
]

function normalizeKey(path) {
  return String(path)
    .replace(/^\/assets\//, '')
    .replace(/^assets\//, '')
    .replace(/^Ripples Assets\//, '')
}

function scoreCandidate(candidate, hintParts, legacy) {
  let score = 0
  const lower = candidate.toLowerCase()
  for (const part of hintParts) {
    if (part && lower.includes(part.toLowerCase())) score += 3
  }
  // Prefer gallery/detail sections when legacy had a category folder
  if (/\/Section 2\//i.test(candidate) && /architectural|prefab|ww-others|multimedia|events|front-page|worldwide/i.test(legacy)) {
    score += 1
  }
  // Prefer preview Section 1 for cover/preview-style short paths without deep nesting
  if (/\/Section 1\//i.test(candidate) && legacy.split('/').length <= 2) {
    score += 1
  }
  return score
}

function resolveManifestKey(path) {
  if (!path) return path
  if (/^https?:\/\//i.test(path)) return null

  const raw = String(path)
  if (manifest[raw]) return raw

  const withBucket = raw.startsWith('Ripples Assets/') ? raw : `Ripples Assets/${normalizeKey(raw)}`
  if (manifest[withBucket]) return withBucket

  const legacy = normalizeKey(raw)
  if (manifest[`Ripples Assets/${legacy}`]) return `Ripples Assets/${legacy}`

  const base = legacy.split('/').pop()
  const candidates = BY_BASENAME.get(base) || []
  if (candidates.length === 0) return null
  if (candidates.length === 1) return candidates[0]

  const hintParts = []
  for (const [re, hint] of LEGACY_PREFIX_HINTS) {
    if (re.test(legacy) || re.test(base)) {
      hintParts.push(...hint.split('/'))
      break
    }
  }
  // Also use leftover path segments from the legacy path (e.g. floating-fountains)
  hintParts.push(...legacy.split('/').slice(0, -1).filter(Boolean))

  let best = candidates[0]
  let bestScore = -1
  for (const candidate of candidates) {
    const score = scoreCandidate(candidate, hintParts, legacy)
    if (score > bestScore) {
      bestScore = score
      best = candidate
    }
  }
  return best
}

/** Resolve a file via the Supabase asset manifest. */
export function asset(path) {
  if (!path) return path
  if (/^https?:\/\//i.test(path)) return path

  const key = resolveManifestKey(path)
  if (key && manifest[key]) return manifest[key]

  const fallback = normalizeKey(path)
  return `/assets/${fallback}`
}

/** Official color wordmark (footer, hero lockup). */
export const COLOR_LOGO = asset('Ripples Assets/Navbar&Footer/RipplesLogo(Color).webp')

/** White wordmark for dark / glass surfaces (navbar). */
export const WHITE_LOGO = asset('Ripples Assets/Navbar&Footer/PNG BG Removed White Only.webp')

/**
 * Collect multimedia project video + .webp stills from
 * Ripples Assets/WaterWorks/Multimedia/Section 2/{folder}/
 * `video` = full file for the card poster; `videoCompressed` = lightbox first slide.
 */
export function folderMedia(folder) {
  const prefix = `Ripples Assets/WaterWorks/Multimedia/Section 2/${folder}/`
  const keys = MANIFEST_KEYS.filter((key) => key.startsWith(prefix))
  const mp4Keys = keys.filter((key) => /\.mp4$/i.test(key))
  const videoKey = mp4Keys.find((key) => !/_compressed\.mp4$/i.test(key))
  const compressedKey = mp4Keys.find((key) => /_compressed\.mp4$/i.test(key))
  const imageKeys = keys
    .filter((key) => /\.webp$/i.test(key))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }))

  return {
    video: videoKey ? asset(videoKey) : '',
    videoCompressed: compressedKey ? asset(compressedKey) : videoKey ? asset(videoKey) : '',
    poster: imageKeys[0] ? asset(imageKeys[0]) : '',
    gallery: imageKeys.map((key) => ({
      title: folder,
      src: asset(key),
    })),
  }
}

/** Walk data trees and swap local/manifest asset paths for remote URLs. */
export function withRemoteAssets(value) {
  if (Array.isArray(value)) return value.map(withRemoteAssets)
  if (value && typeof value === 'object') {
    const next = {}
    for (const [key, nested] of Object.entries(value)) {
      next[key] = withRemoteAssets(nested)
    }
    return next
  }
  if (
    typeof value === 'string' &&
    (value.startsWith('/assets/') || value.startsWith('Ripples Assets/'))
  ) {
    return asset(value)
  }
  return value
}

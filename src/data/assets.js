import manifest from '../asset-manifest.json' with { type: 'json' }

/** Resolve a file from public/assets via the Supabase manifest. */
export function asset(path) {
  if (!path) return path
  if (/^https?:\/\//i.test(path)) return path

  const key = String(path)
    .replace(/^\/assets\//, '')
    .replace(/^assets\//, '')

  return manifest[key] ?? `/assets/${key}`
}

/** Official color wordmark (footer, hero lockup). */
export const COLOR_LOGO = asset('ripples-assets/Logo/RipplesLogo(Color).webp')

/** White wordmark for dark / glass surfaces (navbar). */
export const WHITE_LOGO = asset('ripples-assets/Logo/PNG BG Removed White Only.webp')

/** Collect a ripples-assets/{folder} video + .webp stills from the manifest. */
export function folderMedia(folder) {
  const prefix = `ripples-assets/${folder}/`
  const keys = Object.keys(manifest).filter((key) => key.startsWith(prefix))
  const videoKey = keys.find((key) => /\.mp4$/i.test(key))
  const imageKeys = keys
    .filter((key) => /\.webp$/i.test(key))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }))

  return {
    video: videoKey ? `/assets/${videoKey}` : '',
    poster: imageKeys[0] ? `/assets/${imageKeys[0]}` : '',
    gallery: imageKeys.map((key) => ({
      title: folder,
      src: `/assets/${key}`,
    })),
  }
}

/** Walk data trees and swap `/assets/...` strings for manifest URLs. */
export function withRemoteAssets(value) {
  if (Array.isArray(value)) return value.map(withRemoteAssets)
  if (value && typeof value === 'object') {
    const next = {}
    for (const [key, nested] of Object.entries(value)) {
      next[key] = withRemoteAssets(nested)
    }
    return next
  }
  if (typeof value === 'string' && value.startsWith('/assets/')) {
    return asset(value)
  }
  return value
}

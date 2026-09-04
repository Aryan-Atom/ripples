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

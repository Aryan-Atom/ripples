/** Deployed API — override with VITE_API_URL for local backend testing. */
export const API_BASE = (
  import.meta.env.VITE_API_URL || 'https://ripples-backend.onrender.com'
).replace(/\/$/, '')

export function apiUrl(path) {
  const p = path.startsWith('/') ? path : `/${path}`
  return `${API_BASE}${p}`
}

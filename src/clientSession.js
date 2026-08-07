const SESSION_KEY = 'ripples.clientSession'

/**
 * @typedef {{
 *   requestId: string,
 *   profile: {
 *     name: string,
 *     company: string,
 *     contactEmail: string,
 *     accountTier?: string,
 *   }
 * }} ClientSession
 */

/** @returns {ClientSession | null} */
export function loadClientSession() {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY)
    if (!raw) return null
    const data = JSON.parse(raw)
    if (!data?.requestId || !data?.profile?.contactEmail) return null
    return data
  } catch {
    return null
  }
}

/** @param {ClientSession} session */
export function saveClientSession(session) {
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(session))
}

export function clearClientSession() {
  sessionStorage.removeItem(SESSION_KEY)
}

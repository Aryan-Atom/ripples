import { useEffect, useState } from 'react'
import { apiUrl } from '../api'

const MESSAGES = {
  pending: 'Your request is being reviewed by our team…',
  approved:
    "We've sent a Slack invite to your email. Please accept it first to join your channel.",
  joined: "You're in — open your channel below.",
  rejected: "We couldn't complete your request — we'll be in touch.",
}

export default function JoinStatus({ requestId }) {
  const [status, setStatus] = useState('pending')
  const [channelLink, setChannelLink] = useState(null)
  const [slackChannelName, setSlackChannelName] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!requestId) return undefined
    let alive = true

    const tick = async () => {
      try {
        const res = await fetch(apiUrl(`/api/clients/${requestId}/status`))
        const data = await res.json()
        if (!res.ok) throw new Error(data.error || 'Status lookup failed')
        if (alive) {
          setStatus(data.status)
          setChannelLink(data.channelLink || null)
          setSlackChannelName(data.slackChannelName || null)
          setError(null)
        }
        return data.status
      } catch (err) {
        if (alive) setError(err.message)
        return null
      }
    }

    tick()
    // Keep polling while pending/approved so accept → joined flips automatically
    const poll = setInterval(async () => {
      const next = await tick()
      if (next === 'joined' || next === 'rejected') clearInterval(poll)
    }, 5000)

    return () => {
      alive = false
      clearInterval(poll)
    }
  }, [requestId])

  return (
    <div className="onboard-status">
      <p className="onboard-status__label">Request status</p>
      <p className={`onboard-status__value is-${status}`}>{status}</p>
      <p className="onboard-status__message">{MESSAGES[status] || MESSAGES.pending}</p>

      {status === 'approved' && (
        <div className="onboard-status__invite-hint">
          <p>
            <strong>Please accept the invite first</strong> in your email / Slack.
          </p>
          <p>This page updates automatically once you join.</p>
        </div>
      )}

      {status === 'joined' && channelLink && (
        <a
          className="onboard-channel"
          href={channelLink}
          target="_blank"
          rel="noreferrer"
        >
          <span className="onboard-channel__eyebrow">Your channel</span>
          <span className="onboard-channel__name">
            {slackChannelName || 'Open in Slack'}
          </span>
          <span className="onboard-channel__cta">Open in Slack →</span>
        </a>
      )}

      {error && <p className="onboard-form__error">{error}</p>}
    </div>
  )
}

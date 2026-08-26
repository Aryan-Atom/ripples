import { useEffect, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { apiUrl } from '../api'
import {
  clearClientSession,
  loadClientSession,
  saveClientSession,
} from '../clientSession'
import { withBrand } from '../components/Brand.jsx'

const STATUS_COPY = {
  pending: 'Your access request is with our team for review.',
  approved:
    'Accept the Slack invite in your email, then this dashboard updates automatically.',
  joined: 'You’re connected — open your project channel when you need the team.',
  rejected: 'This request couldn’t be completed. Contact Ripples for help.',
}

const STATUS_STEPS = ['pending', 'approved', 'joined']

export default function ClientProfile() {
  const navigate = useNavigate()
  const session = loadClientSession()
  const [status, setStatus] = useState('pending')
  const [channelLink, setChannelLink] = useState(null)
  const [slackChannelName, setSlackChannelName] = useState(null)
  const [profile, setProfile] = useState(session?.profile || null)
  const [error, setError] = useState(null)
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    const requestId = session?.requestId
    if (!requestId) return undefined
    let alive = true

    const tick = async () => {
      try {
        const res = await fetch(apiUrl(`/api/clients/${requestId}/status`), {
          signal: AbortSignal.timeout(45_000),
        })
        const data = await res.json()
        if (!res.ok) throw new Error(data.error || 'Status lookup failed')
        if (!alive) return data.status

        setStatus(data.status)
        setChannelLink(data.channelLink || null)
        setSlackChannelName(data.slackChannelName || null)
        if (data.profile?.contactEmail) {
          const prev = loadClientSession()
          const next = {
            requestId,
            profile: {
              name: data.profile.name || prev?.profile?.name || '—',
              company: data.profile.company || prev?.profile?.company || '—',
              contactEmail: data.profile.contactEmail,
              accountTier:
                data.profile.accountTier || prev?.profile?.accountTier || 'standard',
            },
          }
          setProfile(next.profile)
          saveClientSession(next)
        }
        setError(null)
        return data.status
      } catch (err) {
        if (alive) setError(err.message)
        return null
      }
    }

    tick()
    const poll = setInterval(async () => {
      const next = await tick()
      if (next === 'joined' || next === 'rejected') clearInterval(poll)
    }, 5000)

    return () => {
      alive = false
      clearInterval(poll)
    }
  }, [session?.requestId])

  if (!session?.requestId) {
    return <Navigate to="/client-login" replace />
  }

  const display = profile || session.profile
  const stepIndex =
    status === 'rejected' ? -1 : Math.max(0, STATUS_STEPS.indexOf(status))

  const signOut = () => {
    clearClientSession()
    navigate('/client-login')
  }

  const refresh = async () => {
    if (!session?.requestId || refreshing) return
    setRefreshing(true)
    try {
      const res = await fetch(apiUrl(`/api/clients/${session.requestId}/status`), {
        signal: AbortSignal.timeout(45_000),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Refresh failed')
      setStatus(data.status)
      setChannelLink(data.channelLink || null)
      setSlackChannelName(data.slackChannelName || null)
      setError(null)
    } catch (err) {
      setError(err.message)
    } finally {
      setRefreshing(false)
    }
  }

  return (
    <div className="interior-page portal-dash">
      <div className="interior-page__atmosphere" aria-hidden="true" />
      <main className="interior-page__main">
        <div className="r-container portal-dash__shell">
          <header className="portal-dash__top">
            <div>
              <p className="r-label">Client dashboard</p>
              <h1 className="portal-dash__hello">
                Hello, <em>{display.name?.split(' ')[0] || 'there'}</em>
              </h1>
              <p className="portal-dash__sub">
                {display.company || 'Your workspace'} · {display.contactEmail}
              </p>
            </div>
            <div className="portal-dash__top-actions">
              <button
                type="button"
                className="portal-dash__ghost"
                onClick={refresh}
                disabled={refreshing}
              >
                {refreshing ? 'Refreshing…' : 'Refresh status'}
              </button>
              <button type="button" className="portal-dash__ghost" onClick={signOut}>
                Sign out
              </button>
            </div>
          </header>

          <section className="portal-dash__status" aria-label="Access status">
            <div className="portal-dash__status-main">
              <p className="portal-dash__kicker">Access status</p>
              <p className={`portal-dash__badge is-${status}`}>{status}</p>
              <p className="portal-dash__status-copy">
                {withBrand(STATUS_COPY[status] || STATUS_COPY.pending)}
              </p>
              {error && <p className="onboard-form__error">{error}</p>}
            </div>

            {status !== 'rejected' && (
              <ol className="portal-dash__steps" aria-label="Request progress">
                {STATUS_STEPS.map((step, index) => (
                  <li
                    key={step}
                    className={
                      index < stepIndex
                        ? 'is-done'
                        : index === stepIndex
                          ? 'is-current'
                          : ''
                    }
                  >
                    <span className="portal-dash__step-dot" aria-hidden="true" />
                    <span className="portal-dash__step-label">{step}</span>
                  </li>
                ))}
              </ol>
            )}
          </section>

          <section className="portal-dash__grid" aria-label="Account overview">
            <article className="portal-dash__tile">
              <h2>Account</h2>
              <dl>
                <div>
                  <dt>Name</dt>
                  <dd>{display.name || '—'}</dd>
                </div>
                <div>
                  <dt>Email</dt>
                  <dd>{display.contactEmail || '—'}</dd>
                </div>
                <div>
                  <dt>Company</dt>
                  <dd>{display.company || '—'}</dd>
                </div>
                <div>
                  <dt>Plan</dt>
                  <dd className="portal-dash__tier">{display.accountTier || 'standard'}</dd>
                </div>
              </dl>
            </article>

            <article className="portal-dash__tile portal-dash__tile--action">
              <h2>Slack channel</h2>
              {status === 'joined' && channelLink ? (
                <>
                  <p className="portal-dash__channel-name">
                    {slackChannelName || 'Your project channel'}
                  </p>
                  <p className="portal-dash__tile-copy">
                    {withBrand('Open Slack to message the Ripples team on this project.')}
                  </p>
                  <a
                    className="cta-card__btn portal-dash__cta"
                    href={channelLink}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Open in Slack <span aria-hidden="true">&rarr;</span>
                  </a>
                </>
              ) : (
                <>
                  <p className="portal-dash__tile-copy">
                    {status === 'approved'
                      ? 'Invite sent — accept it, then refresh to unlock the channel link.'
                      : status === 'rejected'
                        ? 'No channel is available for this request.'
                        : 'Your channel link appears here once access is approved and you join Slack.'}
                  </p>
                  <Link className="r-link" to="/contact">
                    Need help? Contact us{' '}
                    <span className="r-link__arrow" aria-hidden="true">→</span>
                  </Link>
                </>
              )}
            </article>

            <article className="portal-dash__tile">
              <h2>Quick links</h2>
              <ul className="portal-dash__links">
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/multimedia">Multimedia</Link>
                </li>
                <li>
                  <Link to="/our-journey">Our Journey</Link>
                </li>
                <li>
                  <Link to="/contact">Contact</Link>
                </li>
              </ul>
            </article>
          </section>
        </div>
      </main>
    </div>
  )
}

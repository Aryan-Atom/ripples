import { useEffect, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { apiUrl } from '../api'
import {
  clearClientSession,
  loadClientSession,
  saveClientSession,
} from '../clientSession'
import PageHero from '../components/PageHero'
import SiteFooter from '../components/SiteFooter'
import FadeUp from '../motion/FadeUp'

const STATUS_COPY = {
  pending: 'Your access request is with our team for review.',
  approved:
    'A Slack invite is on its way — accept it in email or Slack, then this page will update.',
  joined: 'You’re connected. Open your project channel below.',
  rejected: 'This request couldn’t be completed. We’ll be in touch separately.',
}

export default function ClientProfile() {
  const navigate = useNavigate()
  const session = loadClientSession()
  const [status, setStatus] = useState('pending')
  const [channelLink, setChannelLink] = useState(null)
  const [slackChannelName, setSlackChannelName] = useState(null)
  const [profile, setProfile] = useState(session?.profile || null)
  const [error, setError] = useState(null)

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

  const signOut = () => {
    clearClientSession()
    navigate('/client-login')
  }

  return (
    <div className="interior-page">
      <div className="interior-page__atmosphere" aria-hidden="true" />
      <main className="interior-page__main">
        <PageHero
          eyebrow="Client profile"
          title={
            <>
              {display.name || 'Your'} <em>workspace</em>
            </>
          }
          lead="Your project details and Slack channel access live here."
        />

        <section className="client-profile" aria-label="Client profile">
          <div className="r-container client-profile__inner">
            <FadeUp className="client-profile__details" stagger={0.08}>
              <div className="client-profile__block">
                <h4>Name</h4>
                <span>{display.name || '—'}</span>
              </div>
              <div className="client-profile__block">
                <h4>Email</h4>
                <span>{display.contactEmail || '—'}</span>
              </div>
              <div className="client-profile__block">
                <h4>Company</h4>
                <span>{display.company || '—'}</span>
              </div>
              <div className="client-profile__block">
                <h4>Plan</h4>
                <span className="client-profile__tier">
                  {display.accountTier || 'standard'}
                </span>
              </div>
            </FadeUp>

            <FadeUp className="client-profile__status" delay={0.12}>
              <p className="client-profile__label">Access status</p>
              <p className={`client-profile__badge is-${status}`}>{status}</p>
              <p className="client-profile__message">
                {STATUS_COPY[status] || STATUS_COPY.pending}
              </p>

              {status === 'joined' && channelLink && (
                <a
                  className="r-link client-profile__channel"
                  href={channelLink}
                  target="_blank"
                  rel="noreferrer"
                >
                  {slackChannelName || 'Open Slack channel'}{' '}
                  <span className="r-link__arrow" aria-hidden="true">
                    →
                  </span>
                </a>
              )}

              {error && <p className="onboard-form__error">{error}</p>}
            </FadeUp>

            <FadeUp className="client-profile__actions" delay={0.18}>
              <button type="button" className="cta-card__btn" onClick={signOut}>
                Sign out <span aria-hidden="true">&rarr;</span>
              </button>
              <Link className="r-link" to="/contact">
                Contact Ripples <span className="r-link__arrow" aria-hidden="true">→</span>
              </Link>
            </FadeUp>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}

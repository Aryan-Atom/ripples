import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import SignupForm from '../components/SignupForm'
import LoginForm from '../components/LoginForm'
import PageHero from '../components/PageHero.jsx'
import SiteFooter from '../components/SiteFooter.jsx'
import FadeUp from '../motion/FadeUp'
import { loadClientSession } from '../clientSession'

export default function ClientLogin() {
  const existing = loadClientSession()
  const [mode, setMode] = useState('login')

  if (existing?.requestId) {
    return <Navigate to="/client-profile" replace />
  }

  return (
    <div className="interior-page">
      <div className="interior-page__atmosphere" aria-hidden="true" />
      <main className="interior-page__main">
        <PageHero
          className="page-hero--client-login"
          contentKey={mode}
          eyebrow="Client portal"
          title={
            mode === 'login' ? (
              <>
                Welcome <em>Back</em>
              </>
            ) : (
              <>
                Request <em>Access</em>
              </>
            )
          }
          lead={
            mode === 'login'
              ? 'Log in with your work email to open your profile and Slack channel status.'
              : 'Sign up to join your Ripples project channel. Our team reviews every request.'
          }
        />

        <section className="client-access" aria-label="Client account">
          <div className="r-container client-access__inner">
            <FadeUp className="client-access__panel" y={36} stagger={0.08}>
              <div className="client-access__tabs" role="tablist" aria-label="Account">
                <button
                  type="button"
                  role="tab"
                  aria-selected={mode === 'login'}
                  className={`client-access__tab${mode === 'login' ? ' is-active' : ''}`}
                  onClick={() => setMode('login')}
                >
                  Log in
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={mode === 'signup'}
                  className={`client-access__tab${mode === 'signup' ? ' is-active' : ''}`}
                  onClick={() => setMode('signup')}
                >
                  Sign up
                </button>
              </div>

              <div className="client-access__body">
                {mode === 'login' ? <LoginForm /> : <SignupForm />}
              </div>

              <p className="client-access__switch">
                {mode === 'login' ? (
                  <>
                    New here?{' '}
                    <button type="button" onClick={() => setMode('signup')}>
                      Create a request
                    </button>
                  </>
                ) : (
                  <>
                    Already requested access?{' '}
                    <button type="button" onClick={() => setMode('login')}>
                      Log in
                    </button>
                  </>
                )}
              </p>
            </FadeUp>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}

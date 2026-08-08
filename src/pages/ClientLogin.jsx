import { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import SignupForm from '../components/SignupForm'
import LoginForm from '../components/LoginForm'
import { loadClientSession } from '../clientSession'

export default function ClientLogin() {
  const existing = loadClientSession()
  const [mode, setMode] = useState('login')

  if (existing?.requestId) {
    return <Navigate to="/client-profile" replace />
  }

  return (
    <div className="interior-page portal-auth">
      <div className="interior-page__atmosphere" aria-hidden="true" />
      <main className="interior-page__main portal-auth__main">
        <div className="r-container portal-auth__grid">
          <aside className="portal-auth__intro">
            <p className="r-label">Client portal</p>
            <h1 className="portal-auth__title">
              {mode === 'login' ? (
                <>
                  Your project, <em>one place</em>
                </>
              ) : (
                <>
                  Request <em>channel access</em>
                </>
              )}
            </h1>
            <p className="portal-auth__lead">
              {mode === 'login'
                ? 'Sign in to check Slack status, company details, and open your project channel.'
                : 'Create an account so our team can approve you and invite you to Slack.'}
            </p>
            <ul className="portal-auth__points">
              <li>Live access status</li>
              <li>Direct Slack channel link</li>
              <li>Company &amp; plan details</li>
            </ul>
            <Link className="r-link portal-auth__back" to="/">
              Back to site <span className="r-link__arrow" aria-hidden="true">→</span>
            </Link>
          </aside>

          <section className="portal-auth__card" aria-label="Client account">
            <div className="portal-auth__tabs" role="tablist" aria-label="Account">
              <button
                type="button"
                role="tab"
                aria-selected={mode === 'login'}
                className={`portal-auth__tab${mode === 'login' ? ' is-active' : ''}`}
                onClick={() => setMode('login')}
              >
                Log in
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={mode === 'signup'}
                className={`portal-auth__tab${mode === 'signup' ? ' is-active' : ''}`}
                onClick={() => setMode('signup')}
              >
                Sign up
              </button>
            </div>

            <div className="portal-auth__body">
              {mode === 'login' ? <LoginForm /> : <SignupForm />}
            </div>

            <p className="portal-auth__switch">
              {mode === 'login' ? (
                <>
                  New here?{' '}
                  <button type="button" onClick={() => setMode('signup')}>
                    Create a request
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{' '}
                  <button type="button" onClick={() => setMode('login')}>
                    Log in
                  </button>
                </>
              )}
            </p>
          </section>
        </div>
      </main>
    </div>
  )
}

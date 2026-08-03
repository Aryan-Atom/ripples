import { useState } from 'react'
import SignupForm from '../components/SignupForm'
import LoginForm from '../components/LoginForm'
import JoinStatus from '../components/JoinStatus'

export default function ClientLogin() {
  const [mode, setMode] = useState('login')
  const [requestId, setRequestId] = useState(null)

  const showForm = !requestId

  return (
    <div className="interior-page interior-page--client">
      <div className="interior-page__atmosphere" aria-hidden="true" />
      <main className="interior-page__main client-access">
        <section className="client-access__shell r-container">
          <div className="client-access__intro">
            <p className="client-access__eyebrow">Client portal</p>
            <h1 className="client-access__title">
              {mode === 'login' ? 'Welcome back' : 'Request access'}
            </h1>
            <p className="client-access__lead">
              {mode === 'login'
                ? 'Log in with your work email to view your Slack channel request.'
                : 'Sign up to join your Ripples project channel. Our team reviews and invites you.'}
            </p>
          </div>

          <div className="client-access__panel">
            {showForm && (
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
            )}

            <div className="client-access__body">
              {!showForm ? (
                <>
                  <JoinStatus requestId={requestId} />
                  <button
                    type="button"
                    className="onboard-form__ghost"
                    onClick={() => {
                      setRequestId(null)
                      setMode('login')
                    }}
                  >
                    Back to account
                  </button>
                </>
              ) : mode === 'login' ? (
                <LoginForm
                  onFound={(id) => {
                    setRequestId(id)
                  }}
                />
              ) : (
                <SignupForm
                  onCreated={(id) => {
                    setRequestId(id)
                  }}
                />
              )}
            </div>

            {showForm && (
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
            )}
          </div>
        </section>
      </main>
    </div>
  )
}

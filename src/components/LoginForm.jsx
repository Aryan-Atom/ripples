import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { apiUrl } from '../api'
import { saveClientSession } from '../clientSession'

export default function LoginForm({ onFound }) {
  const navigate = useNavigate()
  const [form, setForm] = useState({ contact_email: '', password: '' })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)

  const update = (key) => (event) => {
    setForm((prev) => ({ ...prev, [key]: event.target.value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSubmitting(true)
    setError(null)
    try {
      const res = await fetch(apiUrl('/api/clients/login'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contact_email: form.contact_email,
          password: form.password,
        }),
        signal: AbortSignal.timeout(45_000),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data.error || 'Login failed')

      const profile = data.profile || {
        name: form.contact_email.split('@')[0],
        company: '—',
        contactEmail: form.contact_email.trim().toLowerCase(),
        accountTier: 'standard',
      }

      saveClientSession({ requestId: data.requestId, profile })
      onFound?.(data.requestId, data.status)
      navigate('/client-profile')
    } catch (err) {
      const message =
        err?.name === 'TimeoutError' || err?.name === 'AbortError'
          ? 'Request timed out — the API may be waking up. Try again in a moment.'
          : err.message || 'Login failed'
      setError(message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form className="onboard-form" onSubmit={handleSubmit}>
      <label className="onboard-form__field">
        <span>Work email</span>
        <input
          type="email"
          required
          value={form.contact_email}
          onChange={update('contact_email')}
          placeholder="you@company.com"
          autoComplete="email"
        />
      </label>

      <label className="onboard-form__field">
        <span>Password</span>
        <input
          type="password"
          required
          value={form.password}
          onChange={update('password')}
          placeholder="••••••••"
          autoComplete="current-password"
        />
      </label>

      <p className="onboard-form__hint">
        Use the email and password from your signup to open your client profile.
      </p>

      {error && <p className="onboard-form__error" role="alert">{error}</p>}

      <button type="submit" className="cta-card__btn onboard-form__submit" disabled={submitting}>
        {submitting ? 'Checking…' : (
          <>
            Log in <span aria-hidden="true">&rarr;</span>
          </>
        )}
      </button>
    </form>
  )
}

import { useState } from 'react'
import { apiUrl } from '../api'

export default function LoginForm({ onFound }) {
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
        signal: AbortSignal.timeout(20_000),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data.error || 'Login failed')
      onFound?.(data.requestId, data.status)
    } catch (err) {
      const message =
        err?.name === 'TimeoutError' || err?.name === 'AbortError'
          ? 'Request timed out — is the API running? (npm run dev:api)'
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
          placeholder="ada@company.com"
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
        Use the email and password from your signup to view request status and your channel.
      </p>

      {error && <p className="onboard-form__error">{error}</p>}

      <button type="submit" className="onboard-form__submit" disabled={submitting}>
        {submitting ? 'Checking…' : 'Log in'}
      </button>
    </form>
  )
}

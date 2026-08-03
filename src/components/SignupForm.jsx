import { useState } from 'react'
import { apiUrl } from '../api'

const INITIAL = {
  name: '',
  contact_email: '',
  company: '',
  password: '',
  account_tier: 'standard',
  uses_slack: true,
}

export default function SignupForm({ onCreated }) {
  const [form, setForm] = useState(INITIAL)
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
      const res = await fetch(apiUrl('/api/clients'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
        signal: AbortSignal.timeout(20_000),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data.error || 'Signup failed')
      onCreated?.(data.requestId)
    } catch (err) {
      const message =
        err?.name === 'TimeoutError' || err?.name === 'AbortError'
          ? 'Request timed out — is the API running? (npm run dev:api)'
          : err.message || 'Signup failed'
      setError(message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form className="onboard-form" onSubmit={handleSubmit}>
      <label className="onboard-form__field">
        <span>Full name</span>
        <input
          required
          value={form.name}
          onChange={update('name')}
          placeholder="Ada Lovelace"
          autoComplete="name"
        />
      </label>

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
        <span>Company</span>
        <input
          required
          value={form.company}
          onChange={update('company')}
          placeholder="Company name"
          autoComplete="organization"
        />
      </label>

      <label className="onboard-form__field">
        <span>Password</span>
        <input
          type="password"
          required
          minLength={6}
          value={form.password}
          onChange={update('password')}
          placeholder="At least 6 characters"
          autoComplete="new-password"
        />
      </label>

      <label className="onboard-form__field">
        <span>Plan</span>
        <select value={form.account_tier} onChange={update('account_tier')}>
          <option value="standard">Standard</option>
          <option value="pro">Pro</option>
          <option value="enterprise">Enterprise</option>
        </select>
      </label>

      <label className="onboard-form__check">
        <input
          type="checkbox"
          checked={form.uses_slack}
          onChange={(e) => setForm((prev) => ({ ...prev, uses_slack: e.target.checked }))}
        />
        <span>We already use Slack</span>
      </label>

      {error && <p className="onboard-form__error">{error}</p>}

      <button type="submit" className="onboard-form__submit" disabled={submitting}>
        {submitting ? 'Submitting…' : 'Request Slack access'}
      </button>
    </form>
  )
}

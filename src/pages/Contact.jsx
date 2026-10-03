import { useState } from 'react'
import { SITE } from '../data/site'
import PageHero from '../components/PageHero.jsx'
import SiteFooter from '../components/SiteFooter.jsx'
import FadeUp from '../motion/FadeUp'

const PROJECT_TYPES = [
  'Musical fountain',
  'Interactive fountain',
  'Lake / River show',
  'Architectural feature',
  'Maintenance / Retrofit',
  'Something else',
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', type: PROJECT_TYPES[0], message: '' })

  const update = (key) => (event) => setForm((f) => ({ ...f, [key]: event.target.value }))

  const submit = (event) => {
    event.preventDefault()
    const subject = encodeURIComponent(`Project enquiry  ${form.type}`)
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nProject: ${form.type}\n\n${form.message}`,
    )
    window.location.href = `mailto:${SITE.email.work}?subject=${subject}&body=${body}`
  }

  return (
    <div className="interior-page">
      <div className="interior-page__atmosphere" aria-hidden="true" />
      <main className="interior-page__main">
        <PageHero
          eyebrow="Contact"
          title={
            <>
              Make water <em>Dance</em>
            </>
          }
          lead="Tell us about the site, the scale, and the feeling you want water to create. We'll take it from there."
        />

        <section className="contact-body" aria-label="Contact form">
          <div className="r-container contact-body__inner">
            <FadeUp as="form" className="contact-form" onSubmit={submit} stagger={0.07}>
              <label className="contact-field">
                <span>Your name</span>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={update('name')}
                  placeholder="Full name"
                  autoComplete="name"
                />
              </label>
              <label className="contact-field">
                <span>Email</span>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={update('email')}
                  placeholder="you@company.com"
                  autoComplete="email"
                />
              </label>
              <label className="contact-field">
                <span>Project type</span>
                <select value={form.type} onChange={update('type')}>
                  {PROJECT_TYPES.map((type) => (
                    <option key={type}>{type}</option>
                  ))}
                </select>
              </label>
              <label className="contact-field">
                <span>The idea</span>
                <textarea
                  rows={5}
                  required
                  value={form.message}
                  onChange={update('message')}
                  placeholder="Site, scale, timeline  anything that helps us hear it."
                />
              </label>
              <button type="submit" className="cta-card__btn contact-form__submit">
                Send the brief <span aria-hidden="true">&rarr;</span>
              </button>
            </FadeUp>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}

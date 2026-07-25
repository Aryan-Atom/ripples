import { SITE } from '../data/site'

export default function HomeCta() {
  return (
    <section className="home-cta home-section" aria-label="Get in touch">
      <div className="r-container">
        <article className="cta-card">
          <div className="cta-card__body">
            <span className="r-label">Start a project</span>
            <h2 className="cta-card__title">
              Ready to turn water
              <br />
              into a <em>spectacle?</em>
            </h2>
            <p className="cta-card__text">
              From the first nozzle drawing to opening night, Ripples designs,
              builds, and manufactures every system in-house — so the show you
              imagine is the show your city gets.
            </p>
            <p className="cta-card__text">
              Tell us about the site, the scale, and the feeling you want water
              to create. We&rsquo;ll take it from there.
            </p>
            <a className="cta-card__btn" href={`mailto:${SITE.email.work}`}>
              Begin the conversation
              <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </article>
      </div>
    </section>
  )
}

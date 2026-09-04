import { Link } from 'react-router-dom'
import LazyVideo from './LazyVideo.jsx'
import FadeUp from '../motion/FadeUp'
import { asset } from '../data/assets.js'

export default function HomeCta() {
  return (
    <section className="home-cta home-section" aria-label="Get in touch">
      <div className="r-container">
        <FadeUp className="cta-row" y={50}>
          <article className="cta-card">
            <div className="cta-card__body">
              <span className="r-label">Start a project</span>
              <h2 className="cta-card__title">
                Ready to turn water
                <br />
                into a <em>spectacle?</em>
              </h2>
              <p className="cta-card__text">
                From the first nozzle drawing to opening night, Ripples designs, builds, and
                manufactures every system in-house so the show you imagine is the show your
                city gets.
              </p>
              <p className="cta-card__text">
                Tell us about the site, the scale, and the feeling you want water
                to create. We&rsquo;ll take it from there.
              </p>
              <Link className="cta-card__btn" to="/contact">
                Begin the conversation
                <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </article>

          <div className="cta-video-card">
            <div className="cta-video-card__frame">
              <LazyVideo
                className="cta-video-card__video"
                src={asset('RipplesLogoAnimationWithMusic.mp4')}
                autoPlay
                muted
                loop
                playsInline
              />
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}

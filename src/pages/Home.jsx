import HeroVideoAnimation from 'hero-video-anim'
import HeroCopy from '../HeroCopy.jsx'
import SiteNav from '../components/SiteNav.jsx'
import SiteFooter from '../components/SiteFooter.jsx'
import BrandTrail from '../components/BrandTrail.jsx'
import HomeVideo from '../components/HomeVideo.jsx'
import HomeCta from '../components/HomeCta.jsx'
import { HOME_STATS } from '../data/site'

const FRAME_COUNT = 241

export default function Home() {
  return (
    <div className="home-page">
      <SiteNav variant="hero" />
      <HeroVideoAnimation frames={{ frameCount: FRAME_COUNT }} showProgressBar={false}>
        <HeroCopy />
      </HeroVideoAnimation>

      <div className="home-page__below">
        <div className="home-page__atmosphere" aria-hidden="true" />

        <main className="home-page__main">
          <section className="intro-band home-section">
            <div className="intro-band__inner r-container">
              <div className="intro-band__copy">
                <span className="r-label">Ripples Engineering</span>
                <h2 className="r-display">
                  We sculpt water
                  <br />
                  <em>into wonder</em>
                </h2>
              </div>
              <div className="intro-band__aside">
                <p className="r-body">
                  Among the few companies worldwide that design, build, and
                  manufacture fountain equipment entirely in-house — from precision
                  nozzles to multimedia show systems that stop crowds mid-step.
                </p>
                <div className="intro-band__stat-row">
                  {HOME_STATS.map((stat) => (
                    <div className="intro-band__stat" key={stat.label}>
                      <span className="r-stat">{stat.value}</span>
                      <span>{stat.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <HomeVideo />

          <BrandTrail />

          <HomeCta />
        </main>

        <SiteFooter />
      </div>
    </div>
  )
}



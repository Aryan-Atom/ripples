import HeroVideoAnimation from 'hero-video-anim'
import HeroCopy from './HeroCopy.jsx'
import './Home.css'

const FRAME_COUNT = 241

const STATS = [
  { value: '36+', label: 'Years of Craft' },
  { value: '2,000+', label: 'Fountains Delivered' },
  { value: '170+', label: 'In-house Experts' },
  { value: '30+', label: 'Countries Reached' },
]

const SERVICES = [
  {
    title: 'Multimedia Show Fountains',
    description:
      'Laser, light, music, and water choreographed into immersive night-time spectacles that turn public spaces into destinations.',
  },
  {
    title: 'Architectural Water Features',
    description:
      'Bespoke fountains for hotels, corporate campuses, and civic landmarks — designed to become the signature of a place.',
  },
  {
    title: 'Prefab Water Features',
    description:
      'Plug-and-play fountain systems for sites where civil work is limited — fast to install, built to perform.',
  },
]

export default function Home() {
  return (
    <>
      <HeroVideoAnimation frames={{ frameCount: FRAME_COUNT }}>
        <header className="home-nav">
          <a href="/" className="home-nav__logo">
            Ripples
          </a>
          <nav className="home-nav__links" aria-label="Primary">
            <a href="#services">Services</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
          </nav>
        </header>

        <HeroCopy />
      </HeroVideoAnimation>

      <main className="home-main">
        <section className="home-stats" aria-label="Company progress">
          <p className="home-stats__intro">
            Three decades of turning water into wonder
          </p>
          <div className="home-stats__grid">
            {STATS.map((stat) => (
              <article key={stat.label} className="home-stats__item">
                <span className="home-stats__value">{stat.value}</span>
                <span className="home-stats__label">{stat.label}</span>
              </article>
            ))}
          </div>
        </section>

        <section className="home-services" id="services">
          <div className="home-services__header">
            <span className="home-label">What We Create</span>
            <h2 className="home-heading">
              Fountains that stop people
              <br />
              <em>in their tracks</em>
            </h2>
          </div>
          <div className="home-services__grid">
            {SERVICES.map((service, i) => (
              <article key={service.title} className="home-service">
                <span className="home-service__index">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="home-service__title">{service.title}</h3>
                <p className="home-service__desc">{service.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="home-about" id="about">
          <div className="home-about__inner">
            <span className="home-label">Trusted Worldwide</span>
            <p className="home-about__text">
              From municipal parks to five-star hotels, our fountains draw
              crowds, boost footfall, and become the landmark people come back
              to — night after night, year after year.
            </p>
            <blockquote className="home-quote">
              <p>
                &ldquo;The musical fountain installed by Ripples is fantastic and
                has become a key attraction in the city. People are enjoying it
                with family. The comprehensive operation and maintenance by the
                Ripples team are impressive.&rdquo;
              </p>
              <footer>
                <cite>Pimpri Chinchwad Municipal Corporation</cite>
                <span>Pune, India</span>
              </footer>
            </blockquote>
          </div>
        </section>

        <section className="home-contact" id="contact">
          <div className="home-contact__inner">
            <span className="home-label">Start a Project</span>
            <h2 className="home-heading home-heading--light">
              Let&apos;s create something
              <br />
              <em>unforgettable</em>
            </h2>
            <div className="home-contact__details">
              <a href="mailto:admin@ripplesfountains.com">
                admin@ripplesfountains.com
              </a>
              <a href="tel:+919350001901">+91 93500 01901</a>
              <address>
                Factory: C-119, Hosiery Complex, Phase 2 Extension
                <br />
                Noida, Uttar Pradesh 201305
              </address>
            </div>
          </div>
        </section>

        <footer className="home-footer">
          <span className="home-footer__brand">Ripples Engineering Pvt. Ltd.</span>
          <span className="home-footer__copy">
            &copy; {new Date().getFullYear()} All rights reserved.
          </span>
        </footer>
      </main>
    </>
  )
}

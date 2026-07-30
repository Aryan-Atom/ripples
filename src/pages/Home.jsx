import HeroVideoAnimation from 'hero-video-anim'
import HeroCopy from '../HeroCopy.jsx'
import SiteFooter from '../components/SiteFooter.jsx'
import BrandTrail from '../components/BrandTrail.jsx'
import HomeIntro from '../components/HomeIntro.jsx'
import HomeCreations from '../components/HomeCreations.jsx'
import HomeVideo from '../components/HomeVideo.jsx'
import HomeWorldwide from '../components/HomeWorldwide.jsx'
import HomeCta from '../components/HomeCta.jsx'

const FRAME_COUNT = 241

export default function Home() {
  return (
    <div className="home-page">
      <HeroVideoAnimation frames={{ frameCount: FRAME_COUNT }} showProgressBar={false}>
        <HeroCopy />
      </HeroVideoAnimation>

      <div className="home-page__below">
        <div className="home-page__atmosphere" aria-hidden="true" />

        <main className="home-page__main">
          <HomeIntro />
          <HomeCreations />
          <HomeVideo />
          <HomeWorldwide />
          <BrandTrail />
          <HomeCta />
        </main>

        <SiteFooter />
      </div>
    </div>
  )
}

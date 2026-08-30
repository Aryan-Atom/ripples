import { getCapabilityPage } from '../data/capabilities'
import { WATERWORKS_CATEGORIES } from '../data/waterworksCategories'
import PageHero from '../components/PageHero.jsx'
import CategoryExploreList from '../components/CategoryExploreList.jsx'
import SiteFooter from '../components/SiteFooter.jsx'
import FadeUp from '../motion/FadeUp'

export default function Creations() {
  const water = getCapabilityPage('water-features')

  return (
    <div className="interior-page waterworks-page multimedia-page">
      <div className="interior-page__atmosphere" aria-hidden="true" />
      <main className="interior-page__main">
        {water && (
          <PageHero
            eyebrow={water.eyebrow}
            title={
              <>
                <span className="multimedia-explore__title-main">Water that</span> <em>belongs</em>
              </>
            }
            lead={water.lead}
          />
        )}

        <section id="categories" className="ww-categories home-section" aria-label="Categories">
          <div className="r-container">
            <FadeUp as="p" className="r-label">
              Categories
            </FadeUp>
            <CategoryExploreList categories={WATERWORKS_CATEGORIES} />
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}

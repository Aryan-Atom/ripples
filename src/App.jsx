import { lazy, Suspense } from 'react'
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom'
import AppLayout from './layouts/AppLayout.jsx'
import Home from './pages/Home.jsx'
import Creations from './pages/Creations.jsx'
import ClientLogin from './pages/ClientLogin.jsx'
import ClientProfile from './pages/ClientProfile.jsx'
import Practice from './pages/Practice.jsx'
import Worldwide from './pages/Worldwide.jsx'
import Contact from './pages/Contact.jsx'
import CapabilityPage from './pages/CapabilityPage.jsx'

const OurJourney = lazy(() => import('./pages/OurJourney.jsx'))

/** Legacy capability URLs that still have working page data. */
const LEGACY_CAPABILITY_PAGES = [
  { path: '/prefab-water-features', slug: 'prefab-water-features' },
  { path: '/architectural-fountains', slug: 'architectural-fountains' },
]

/** Old archive routes whose /capabilities/ media is gone — send users to WaterWorks. */
const LEGACY_CAPABILITY_REDIRECTS = [
  { from: '/water-features', to: '/waterworks' },
  { from: '/floating-fountains', to: '/waterworks/others#floating-fountains' },
  { from: '/programmable-fountains', to: '/waterworks/others#programmable-fountains' },
  { from: '/swimming-pools', to: '/waterworks/others#swimming-pools' },
  { from: '/kids-play-areas', to: '/waterworks/others#kids-play' },
]

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/waterworks" element={<Creations />} />
          <Route
            path="/waterworks/multimedia"
            element={<CapabilityPage key="multimedia-shows" slug="multimedia-shows" />}
          />
          <Route
            path="/waterworks/architectural"
            element={<CapabilityPage key="architectural-fountains" slug="architectural-fountains" />}
          />
          <Route
            path="/waterworks/prefabs"
            element={<CapabilityPage key="prefab-water-features" slug="prefab-water-features" />}
          />
          <Route
            path="/waterworks/others"
            element={<CapabilityPage key="waterworks-others" slug="waterworks-others" />}
          />

          {/* Legacy aliases */}
          <Route path="/multimedia" element={<Navigate to="/waterworks/multimedia" replace />} />
          <Route path="/creations" element={<Navigate to="/waterworks" replace />} />
          <Route path="/practice" element={<Practice />} />
          <Route path="/worldwide" element={<Worldwide />} />
          <Route
            path="/our-journey"
            element={
              <Suspense fallback={null}>
                <OurJourney />
              </Suspense>
            }
          />
          <Route path="/client-login" element={<ClientLogin />} />
          <Route path="/client-profile" element={<ClientProfile />} />
          <Route path="/contact" element={<Contact />} />

          {LEGACY_CAPABILITY_PAGES.map(({ path, slug }) => (
            <Route
              key={path}
              path={path}
              element={<CapabilityPage key={slug} slug={slug} />}
            />
          ))}
          {LEGACY_CAPABILITY_REDIRECTS.map(({ from, to }) => (
            <Route key={from} path={from} element={<Navigate to={to} replace />} />
          ))}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AppLayout from './layouts/AppLayout.jsx'
import Home from './pages/Home.jsx'
import Creations from './pages/Creations.jsx'
import ClientLogin from './pages/ClientLogin.jsx'
import ClientProfile from './pages/ClientProfile.jsx'
import Practice from './pages/Practice.jsx'
import Worldwide from './pages/Worldwide.jsx'
import Contact from './pages/Contact.jsx'
import CapabilityPage from './pages/CapabilityPage.jsx'
import { CAPABILITY_ROUTES } from './data/capabilities'

const OurJourney = lazy(() => import('./pages/OurJourney.jsx'))

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/waterworks" element={<Creations />} />
          <Route
            path="/waterworks/multimedia"
            element={<CapabilityPage slug="multimedia-shows" />}
          />
          <Route
            path="/waterworks/architectural"
            element={<CapabilityPage slug="architectural-fountains" />}
          />
          <Route
            path="/waterworks/prefabs"
            element={<CapabilityPage slug="prefab-water-features" />}
          />
          <Route
            path="/waterworks/others"
            element={<CapabilityPage slug="waterworks-others" />}
          />
          {/* Legacy aliases */}
          <Route path="/multimedia" element={<Creations />} />
          <Route path="/creations" element={<Creations />} />
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
          {CAPABILITY_ROUTES.map(({ to }) => (
            <Route
              key={to}
              path={to}
              element={<CapabilityPage slug={to.replace(/^\//, '')} />}
            />
          ))}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

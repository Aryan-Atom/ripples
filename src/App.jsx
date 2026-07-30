import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AppLayout from './layouts/AppLayout.jsx'
import Home from './pages/Home.jsx'
import Creations from './pages/Creations.jsx'
import Practice from './pages/Practice.jsx'
import Worldwide from './pages/Worldwide.jsx'
import Contact from './pages/Contact.jsx'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/creations" element={<Creations />} />
          <Route path="/practice" element={<Practice />} />
          <Route path="/worldwide" element={<Worldwide />} />
          <Route path="/contact" element={<Contact />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

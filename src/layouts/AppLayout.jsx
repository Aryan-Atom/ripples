import { Outlet } from 'react-router-dom'
import SiteNav from '../components/SiteNav.jsx'
import SmoothScroll from '../motion/SmoothScroll.jsx'
import ScrollToTop from '../motion/ScrollToTop.jsx'

export default function AppLayout() {
  return (
    <>
      <ScrollToTop />
      <SmoothScroll />
      <SiteNav variant="hero" />
      <Outlet />
    </>
  )
}

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/archivo/300.css'
import '@fontsource/archivo/400.css'
import '@fontsource/archivo/500.css'
import '@fontsource/archivo/600.css'
import '@fontsource/cinzel/400.css'
import '@fontsource/cinzel/600.css'
import '@fontsource/instrument-serif/400.css'
import '@fontsource/instrument-serif/400-italic.css'
import '@fontsource/montserrat/800.css'
import 'lenis/dist/lenis.css'
import { ScrollTrigger } from './motion/gsap'
import { disableBrowserScrollRestoration } from './motion/scrollReset'
import './motion/scrollReveal.js'
import App from './App.jsx'
import './index.css'

disableBrowserScrollRestoration()
document.fonts?.ready?.then(() => ScrollTrigger.refresh())

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

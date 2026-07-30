import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/archivo/300.css'
import '@fontsource/archivo/400.css'
import '@fontsource/archivo/500.css'
import '@fontsource/instrument-serif/400.css'
import '@fontsource/instrument-serif/400-italic.css'
import 'lenis/dist/lenis.css'
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

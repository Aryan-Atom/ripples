import { withRemoteAssets } from './assets.js'

export const HOME_GALLERY = withRemoteAssets({
  label: 'In the field',
  title: 'Every project',
  titleEm: 'a signature',
  body:
    'From civic plazas to landmark hotels  each installation is engineered, fabricated, and choreographed entirely in-house. Scroll through a few moments from the floor.',
  images: [
    { src: '/assets/home_1.webp', alt: 'Ripples fountain installation' },
    { src: '/assets/home_2.webp', alt: 'Architectural water feature' },
    { src: '/assets/home_3.webp', alt: 'Multimedia show fountain' },
    { src: '/assets/home_4.webp', alt: 'Custom fountain engineering' },
  ],
})

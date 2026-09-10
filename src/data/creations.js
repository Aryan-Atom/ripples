import { asset, withRemoteAssets } from './assets.js'

/** Local placeholder images  swap for real project photography later. */
const PLACEHOLDER_IMAGES = [
  asset('home_1.webp'),
  asset('home_2.webp'),
  asset('home_3.webp'),
  asset('home_4.webp'),
]

const img = (index) => PLACEHOLDER_IMAGES[index % PLACEHOLDER_IMAGES.length]

export const CREATION_FILTERS = [
  'All',
  'Musical & Dancing',
  'Interactive',
  'Architectural',
  'Shows & Multimedia',
]

export const CREATIONS = [
  {
    id: 'lake-of-lights',
    title: 'Lake of Lights',
    location: 'Dubai, UAE',
    year: '2024',
    category: 'Shows & Multimedia',
    summary:
      'A 240-metre lake show where lasers, flame jets, and water screens move to an original score.',
    image: img(0),
  },
  {
    id: 'civic-crown',
    title: 'Civic Crown Fountain',
    location: 'New Delhi, India',
    year: '2023',
    category: 'Musical & Dancing',
    summary:
      'Ninety choreographed nozzles crowning a public plaza, performing hourly to live-mixed audio.',
    image: img(1),
  },
  {
    id: 'monsoon-steps',
    title: 'Monsoon Steps',
    location: 'Singapore',
    year: '2023',
    category: 'Architectural',
    summary:
      'A cascading water stairway threaded through a retail atrium  engineered to whisper, not roar.',
    image: img(2),
  },
  {
    id: 'playa-del-agua',
    title: 'Playa del Agua',
    location: 'Doha, Qatar',
    year: '2022',
    category: 'Interactive',
    summary:
      'A dry-deck play field of 120 ground jets that reads footsteps and answers with water.',
    image: img(3),
  },
  {
    id: 'harbour-veil',
    title: 'Harbour Veil',
    location: 'Sydney, Australia',
    year: '2022',
    category: 'Shows & Multimedia',
    summary:
      'A floating projection veil over the harbour, pairing 60-metre plumes with mapped film.',
    image: img(0),
  },
  {
    id: 'garden-of-glass',
    title: 'Garden of Glass',
    location: 'Nairobi, Kenya',
    year: '2021',
    category: 'Architectural',
    summary:
      'Laminar arcs vaulting a botanical walk  silent glass-rod streams lit from within.',
    image: img(1),
  },
  {
    id: 'raag-e-aab',
    title: 'Raag-e-Aab',
    location: 'Jaipur, India',
    year: '2021',
    category: 'Musical & Dancing',
    summary:
      'A heritage courtyard fountain that performs classical raags at dusk, tuned to the hour.',
    image: img(2),
  },
  {
    id: 'tidal-atrium',
    title: 'Tidal Atrium',
    location: 'London, UK',
    year: '2020',
    category: 'Architectural',
    summary:
      'A programmable tide table in a museum forecourt  water that rises, holds, and recedes.',
    image: img(3),
  },
  {
    id: 'festival-of-mist',
    title: 'Festival of Mist',
    location: 'Hanoi, Vietnam',
    year: '2019',
    category: 'Interactive',
    summary:
      'Fog fields, touch-reactive jets, and low fountains built for a lakeside festival ground.',
    image: img(0),
  },
  {
    id: 'aurora-basin',
    title: 'Aurora Basin',
    location: 'Astana, Kazakhstan',
    year: '2019',
    category: 'Shows & Multimedia',
    summary:
      'A winter-hardened show basin performing beneath sub-zero skies, 365 nights a year.',
    image: img(1),
  },
]

/** Homepage Selected Creations — one lead project per WaterWorks category. */
export const FEATURED_CREATION_GROUPS = withRemoteAssets([
  {
    id: 'multimedia',
    label: 'Multimedia',
    to: '/waterworks/multimedia',
    items: [
      {
        id: 'bhopal-musical',
        title: 'Bhopal Musical',
        location: 'Bhopal, India',
        category: 'Multimedia',
        summary:
          'A civic musical fountain where light, score, and water move as one system  programmed in-house for the nightly show.',
        image: '/assets/multimedia/bhopal-musical.webp',
      },
    ],
  },
  {
    id: 'architectural',
    label: 'Architectural',
    to: '/waterworks/architectural',
    items: [
      {
        id: 'adnoc-abu-dhabi',
        title: 'ADNOC Abu Dhabi',
        location: 'Abu Dhabi, UAE',
        category: 'Architectural',
        summary:
          'A landmark campus fountain for ADNOC  choreographed jets and light composed for the desert skyline.',
        image: '/assets/front-page/adnoc-abu-dhabi.webp',
      },
    ],
  },
  {
    id: 'prefabs',
    label: 'Prefabs',
    to: '/waterworks/prefabs',
    items: [
      {
        id: 'prefab-pool-w-goa',
        title: 'Prefab Pool, W Goa',
        location: 'Goa, India',
        category: 'Prefabs',
        summary:
          'A workshop-built swimming pool for W Goa  modular precision that arrives ready to set without losing a custom finish.',
        image: '/assets/prefab/prefab-swimming-pool-w-goa.webp',
      },
    ],
  },
  {
    id: 'floating-fountains',
    label: 'Floating Fountains',
    to: '/waterworks/others#floating-fountains',
    items: [
      {
        id: 'creek-fountain-sharjah',
        title: 'Creek Fountain',
        location: 'Sharjah, UAE',
        category: 'Floating Fountains',
        summary:
          'A creek-scale floating array for Sharjah  jets engineered for open water, wind, and a long civic duty cycle.',
        image: '/assets/ww-others/floating-fountains/creek-fountain-sharjah.webp',
      },
    ],
  },
])

export const FEATURED_CREATIONS = FEATURED_CREATION_GROUPS.flatMap((group) => group.items)

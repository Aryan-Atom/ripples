/** Regions where Ripples has delivered fountain experiences. */
import { sectionGallery, withRemoteAssets } from './assets.js'

export const WORLDWIDE_PRESENCE = [
  { lat: 52.52, lng: 13.405, label: 'Europe' },
  { lat: 25.2048, lng: 55.2708, label: 'Middle East' },
  { lat: 28.6139, lng: 77.209, label: 'Asia' },
  { lat: -1.2921, lng: 36.8219, label: 'Africa' },
  { lat: -33.8688, lng: 151.2093, label: 'Oceania' },
  { lat: 40.7128, lng: -74.006, label: 'Americas' },
]

export const WORLDWIDE_GEOJSON_URL = '/data/world-countries.geojson'

let worldCountriesCache = null
let worldCountriesPromise = null

/** Warm the GeoJSON cache before the globe mounts (Worldwide route / hero). */
export function prefetchWorldCountries() {
  if (worldCountriesCache) return Promise.resolve(worldCountriesCache)
  if (!worldCountriesPromise) {
    worldCountriesPromise = fetch(WORLDWIDE_GEOJSON_URL)
      .then((res) => res.json())
      .then((data) => {
        worldCountriesCache = data.features ?? []
        return worldCountriesCache
      })
      .catch(() => {
        worldCountriesPromise = null
        worldCountriesCache = []
        return worldCountriesCache
      })
  }
  return worldCountriesPromise
}

export function getWorldCountriesCache() {
  return worldCountriesCache
}

/** Regional footprint  shown below the globe hero. */
export const WORLDWIDE_REGIONS = [
  {
    index: '01',
    name: 'Asia',
    countries: 'India · Singapore · Vietnam · Kazakhstan',
    projects: '1,400+ projects',
    note: 'Home ground  from civic plazas to the subcontinent\u2019s largest musical fountains.',
  },
  {
    index: '02',
    name: 'Middle East',
    countries: 'UAE · Qatar · Saudi Arabia · Oman',
    projects: '260+ projects',
    note: 'Lake shows and destination fountains engineered for desert heat and salt air.',
  },
  {
    index: '03',
    name: 'Africa',
    countries: 'Kenya · Nigeria · Egypt',
    projects: '90+ projects',
    note: 'Architectural water features and interactive plazas across growing capitals.',
  },
  {
    index: '04',
    name: 'Europe',
    countries: 'UK · Germany · Spain',
    projects: '70+ projects',
    note: 'Heritage-sensitive installations and museum-grade programmable water.',
  },
  {
    index: '05',
    name: 'Oceania & Americas',
    countries: 'Australia · USA',
    projects: '40+ projects',
    note: 'Harbour shows and winter-hardened basins on both sides of the Pacific.',
  },
]

/** Scroll-driven event showcase  videos resolved through the asset manifest. */
export const WORLDWIDE_EVENTS = withRemoteAssets([
  {
    index: '01',
    title: 'Dubai Event',
    description:
      'An exhibition at a Dubai industry event showcasing Ripples Fountains, with programmable jets, lighting, and music brought together in a dynamic presentation.',
    video: '/assets/events/dubai-event-final-out-12-12.mp4',
    align: 'right',
  },
  {
    index: '02',
    title: 'Guangzhou Event',
    description:
      'A Global Showcase at a Guangzhou industry event, presenting innovative water features, precision engineering, and integrated lighting to an international trade audience.',
    video: '/assets/events/guangzhou-1.mp4',
    align: 'left',
  },
  {
    index: '03',
    title: 'Shanghai Event',
    description:
      'Ripples Fountains showcased its engineering expertise at IAAPA Expo, presenting innovative water features, programmable choreography, and advanced control systems to an international audience.',
    video: '/assets/events/iaapa-2025.mp4',
    align: 'right',
  },
])

/** Landmark project cards — permanent installations with optional photo galleries. */
export const WORLDWIDE_PROJECTS = withRemoteAssets([
  {
    index: '01',
    title: 'BRICS Summit',
    description:
      'Ripples Fountains at BRICS, presenting innovative water features, programmable jets, lighting, and music to an international audience.',
    poster: '/assets/events/BRICS3.webp',
    image: '/assets/events/BRICS3.webp',
    align: 'left',
    gallery: [
      {
        title: 'BRICS Summit',
        src: '/assets/events/BRICS1.webp',
      },
      {
        title: 'BRICS Summit',
        src: '/assets/events/BRICS2.webp',
      },
      {
        title: 'BRICS Summit',
        src: '/assets/events/BRICS3.webp',
      },
      {
        title: 'BRICS Summit',
        src: '/assets/events/BRICS4.webp',
      },
      {
        title: 'BRICS Summit',
        src: '/assets/events/BRICS5.webp',
      },
      {
        title: 'BRICS Summit',
        src: '/assets/events/BRICS6.webp',
      },
      {
        title: 'BRICS Summit',
        src: '/assets/events/BRICS7.webp',
      },
      {
        title: 'BRICS Summit',
        src: '/assets/events/BRICS8.webp',
      },
      {
        title: 'BRICS Summit',
        src: '/assets/events/BRICS9.webp',
      },
    ],
  },
  {
    index: '02',
    title: 'ADNOC Abu Dhabi',
    description:
      'A landmark campus fountain for ADNOC  choreographed jets and light composed for the desert skyline.',
    poster: '/assets/front-page/adnoc-abu-dhabi.webp',
    image: '/assets/front-page/adnoc-abu-dhabi.webp',
    align: 'right',
  },
  {
    index: '03',
    title: 'Global Village Musical Fountain, Dubai',
    description:
      'A festival-scale musical fountain for Global Village  jets, light, and score timed for nightly crowds.',
    poster:
      '/assets/events/GlobalVillageDubai7.webp',
    image:
      '/assets/events/GlobalVillageDubai7.webp',
    align: 'left',
    gallery: [
      {
        title: 'Global Village Musical Fountain, Dubai',
        src: '/assets/events/GlobalVillageDubai1.webp',
      },
      {
        title: 'Global Village Musical Fountain, Dubai',
        src: '/assets/events/GlobalVillageDubai2.webp',
      },
      {
        title: 'Global Village Musical Fountain, Dubai',
        src: '/assets/events/GlobalVillageDubai3.webp',
      },
      {
        title: 'Global Village Musical Fountain, Dubai',
        src: '/assets/events/GlobalVillageDubai4.webp',
      },
      {
        title: 'Global Village Musical Fountain, Dubai',
        src: '/assets/events/GlobalVillageDubai5.webp',
      },
      {
        title: 'Global Village Musical Fountain, Dubai',
        src: '/assets/events/GlobalVillageDubai6.webp',
      },
      {
        title: 'Global Village Musical Fountain, Dubai',
        src: '/assets/events/GlobalVillageDubai7.webp',
      },
      {
        title: 'Global Village Musical Fountain, Dubai',
        src: '/assets/events/GlobalVillageDubai8.webp',
      },
      {
        title: 'Global Village Musical Fountain, Dubai',
        src: '/assets/events/GlobalVillageDubai9.webp',
      },
    ],
  },
  {
    index: '04',
    title: 'Zayed International Airport',
    description:
      'Architectural water for Zayed International Airport  calm geometry and precise jets at the terminal approach.',
    poster:
      '/assets/events/Zayed2.webp',
    image:
      '/assets/events/Zayed2.webp',
    align: 'right',
    gallery: [
      {
        title: 'Zayed International Airport',
        src: '/assets/events/Zayed1.webp',
      },
      {
        title: 'Zayed International Airport',
        src: '/assets/events/Zayed2.webp',
      },
      {
        title: 'Zayed International Airport',
        src: '/assets/events/Zayed3.webp',
      },
      {
        title: 'Zayed International Airport',
        src: '/assets/events/Zayed4.webp',
      },
      {
        title: 'Zayed International Airport',
        src: '/assets/events/Zayed5.webp',
      },
      {
        title: 'Zayed International Airport',
        src: '/assets/events/Zayed6.webp',
      },
      {
        title: 'Zayed International Airport',
        src: '/assets/events/Zayed7.webp',
      },
      {
        title: 'Zayed International Airport',
        src: '/assets/events/Zayed8.webp',
      },
    ],
  },
])

/** Section 3 stills — collage below the projects showcase. */
export const WORLDWIDE_COLLAGE = sectionGallery('Ripples Assets/Worldwide/Section 3/')

export const WORLDWIDE_CITIES = [
  'New Delhi',
  'Dubai',
  'Singapore',
  'Doha',
  'Sydney',
  'Nairobi',
  'London',
  'Hanoi',
  'Astana',
  'Jaipur',
  'Muscat',
  'Riyadh',
]

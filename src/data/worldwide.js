/** Regions where Ripples has delivered fountain experiences. */
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

/** Scroll-driven event showcase  videos live in /public/assets/web-videos. */
export const WORLDWIDE_EVENTS = [
  {
    index: '01',
    title: 'Dubai Fountain District',
    description:
      'A landmark lake show engineered for desert heat  programmable arcs, chromatic lighting, and synchronized music across one of the Gulf\u2019s most visible waterfront destinations.',
    video: '/assets/web-videos/video 1.mp4',
    align: 'right',
  },
  {
    index: '02',
    title: 'Guangzhou Civic Plaza',
    description:
      'An interactive water matrix for a growing Chinese metropolis  precision nozzles, dynamic patterns, and a basin designed for year-round public spectacle.',
    video: '/assets/web-videos/video 2.mp4',
    align: 'left',
  },
  {
    index: '03',
    title: 'IAAPA Expo Showcase',
    description:
      'Live demonstration at the global attractions industry stage  Ripples engineering on display, from programmable choreography to field-ready control systems.',
    video: '/assets/web-videos/video 3.mp4',
    align: 'right',
  },
]

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

import fs from 'fs'
import path from 'path'

function titleFrom(file) {
  return file
    .replace(/^\d+-/, '')
    .replace(/\.[^.]+$/, '')
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .trim()
}

function gallery(folder) {
  const dir = path.join('public/capabilities', folder)
  return fs
    .readdirSync(dir)
    .filter((f) => /\.(jpe?g|png|webp)$/i.test(f))
    .sort()
    .map((f) => ({
      title: titleFrom(f),
      src: `/capabilities/${folder}/${f}`,
    }))
}

const multimedia = gallery('multimedia-shows')
const architectural = gallery('architectural-fountains')
const prefabs = gallery('prefab-water-features')
const others = [
  ...gallery('floating-fountains'),
  ...gallery('programmable-fountains'),
  ...gallery('swimming-pools'),
  ...gallery('kids-play-areas'),
]

const categories = [
  {
    id: 'multimedia',
    label: 'Multimedia',
    to: '/waterworks/multimedia',
    slug: 'multimedia-shows',
    tags: ['Shows', 'Light', 'Music'],
    place: 'Worldwide',
    description:
      'Immersive fountain shows where water, light, and music move as one choreographed system. Built for plazas, lakes, and landmark nights  every effect engineered in-house so the performance holds its drama from opening surge to final fade.',
    cover: multimedia[0].src,
    previews: multimedia.slice(0, 3).map((i) => i.src),
  },
  {
    id: 'architectural',
    label: 'Architectural',
    to: '/waterworks/architectural',
    slug: 'architectural-fountains',
    tags: ['Civic', 'Campus', 'Plazas'],
    place: 'Site-specific',
    description:
      'Site-specific architectural fountains composed as built form. Basins, nozzles, and light are engineered for wind, climate, and daily use  so the water reads as architecture long after opening day.',
    cover: architectural[0].src,
    previews: architectural.slice(0, 3).map((i) => i.src),
  },
  {
    id: 'prefabs',
    label: 'Prefabs',
    to: '/waterworks/prefabs',
    slug: 'prefab-water-features',
    tags: ['Pools', 'Fountains', 'Modular'],
    place: 'Workshop-built',
    description:
      'Prefab pools and water features manufactured in our workshop for faster install. Precision modules arrive ready to set  still feeling custom on site, still built to Ripples tolerances.',
    cover: prefabs[0].src,
    previews: prefabs.slice(0, 3).map((i) => i.src),
  },
  {
    id: 'others',
    label: 'Others',
    to: '/waterworks/others',
    slug: 'waterworks-others',
    tags: ['Floating', 'Programmable', 'Play'],
    place: 'Full catalogue',
    description:
      'Floating systems, programmable jets, swimming pools, and kids play water. The wider Ripples catalogue beyond shows and architecture  each system still designed, engineered, and built under one roof.',
    cover: others[0].src,
    previews: others.slice(0, 3).map((i) => i.src),
  },
]

const pages = {
  'multimedia-shows': {
    slug: 'multimedia-shows',
    label: 'Multimedia',
    eyebrow: 'WaterWorks  Multimedia',
    titleBefore: 'Water as',
    titleEm: 'performance',
    lead: 'Multimedia fountain shows  light, music, and water choreographed as one system.',
    body: 'From lake spectacles to urban promenades, we design and manufacture the show systems that turn water into a nightly performance.',
    gallery: multimedia,
  },
  'waterworks-others': {
    slug: 'waterworks-others',
    label: 'Others',
    eyebrow: 'WaterWorks  Others',
    titleBefore: 'Beyond the',
    titleEm: 'stage',
    lead: 'Floating fountains, programmable jets, pools, and play areas from the Ripples workshop.',
    body: 'A curated set of systems outside multimedia shows and architectural fountains  each still designed, engineered, and built in-house.',
    gallery: others,
  },
}

const file = `/** WaterWorks landing categories + gallery page payloads. */
export const WATERWORKS_CATEGORIES = ${JSON.stringify(categories, null, 2)}

export const WATERWORKS_CATEGORY_PAGES = ${JSON.stringify(pages, null, 2)}

export function getWaterworksCategoryPage(slug) {
  return WATERWORKS_CATEGORY_PAGES[slug] ?? null
}
`

fs.writeFileSync('src/data/waterworksCategories.js', file)
console.log('ok', categories.length, 'categories', multimedia.length, 'mm', others.length, 'others')

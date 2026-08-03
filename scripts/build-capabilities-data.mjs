import fs from 'fs'

let raw = fs.readFileSync('old-pages/_gallery-manifest.json', 'utf8')
if (raw.charCodeAt(0) === 0xfeff) raw = raw.slice(1)
const manifest = JSON.parse(raw)

const meta = {
  'water-features': {
    slug: 'water-features',
    label: 'Water Features',
    eyebrow: 'Capabilities — Water',
    titleBefore: 'Water that',
    titleEm: 'belongs',
    lead: 'Architectural fountains, floating systems, programmable jets, pools, and play — designed, engineered, and manufactured under one roof since 1989.',
    body: 'Every system begins as a site-specific composition. We shape hydraulics, lighting, and control so the water reads as architecture — then build the hardware ourselves so it performs for decades.',
  },
  'architectural-fountains': {
    slug: 'architectural-fountains',
    label: 'Architectural Fountains',
    eyebrow: 'Water Features — Architectural',
    titleBefore: 'Fountains as',
    titleEm: 'architecture',
    lead: 'Site-specific architectural fountains — basins, nozzles, and light composed for plazas, campuses, and civic destinations.',
    body: 'Form follows hydraulics. We design the silhouette and engineer the system so the water holds its line in wind, heat, and daily use — built in our workshop, installed as architecture.',
  },
  'floating-fountains': {
    slug: 'floating-fountains',
    label: 'Floating Fountains',
    eyebrow: 'Water Features — Floating',
    titleBefore: 'Lakes, reimagined',
    titleEm: 'as stages',
    lead: 'Floating fountain systems for lakes, lagoons, and open water — reliable platforms that carry light, spray, and spectacle without a permanent basin on shore.',
    body: 'From municipal lakes to private estates, our floating arrays are built for duty cycles, climate, and service access — so the show stays on long after opening night.',
  },
  'programmable-fountains': {
    slug: 'programmable-fountains',
    label: 'Programmable Fountains',
    eyebrow: 'Water Features — Programmable',
    titleBefore: 'Jets that',
    titleEm: 'listen',
    lead: 'Programmable nozzles, jumping jets, and sequenced water — choreographed to music, light, and visitor flow.',
    body: 'We write the show and build the control racks that run it. Precision timing, safe public interaction, and hardware we can service for the life of the installation.',
  },
  'kids-play-areas': {
    slug: 'kids-play-areas',
    label: 'Kids Play Areas',
    eyebrow: 'Water Features — Play',
    titleBefore: 'Water play,',
    titleEm: 'engineered',
    lead: 'Interactive splash pads and kids play fountains that invite joy without compromising safety, filtration, or durability.',
    body: 'Soft flow profiles, accessible decks, and robust manifolds — designed for parks, resorts, and mixed-use destinations that expect daily use.',
  },
  'swimming-pools': {
    slug: 'swimming-pools',
    label: 'Swimming Pools',
    eyebrow: 'Water Features — Pools',
    titleBefore: 'Pools with',
    titleEm: 'presence',
    lead: 'Hospitality and private pools engineered as destinations — clarity, edge detail, and systems that stay quiet while guests stay longer.',
    body: 'From villas to hotels, we deliver the hydraulic backbone and finishes that make a pool feel intentional, not generic.',
  },
  'prefab-water-features': {
    slug: 'prefab-water-features',
    label: 'Prefab Water Features',
    eyebrow: 'Capabilities — Prefab',
    titleBefore: 'Factory-built',
    titleEm: 'water',
    lead: 'Prefab pools and prefab fountains — assembled with workshop control, installed with site speed.',
    body: 'Prefab is how we bring our factory standards to remote and fast-track projects without losing craft in the finish.',
  },
}

const WATER_FEATURE_CATEGORY_SLUGS = [
  'architectural-fountains',
  'floating-fountains',
  'programmable-fountains',
  'swimming-pools',
  'kids-play-areas',
]

function cleanGallery(items = []) {
  return items
    .filter((item) => !/owl\.video|logo|quote|bh3-/i.test(item.src + item.title))
    .map(({ title, src }) => ({ title, src }))
}

function splitPrefabSections(gallery) {
  const pools = []
  const fountains = []
  for (const item of gallery) {
    const key = `${item.title} ${item.src}`.toLowerCase()
    const isPool =
      key.includes('swimming-pool') ||
      key.includes('swimming pool') ||
      (key.includes('pool') && !key.includes('waterfall'))
    if (isPool) pools.push(item)
    else fountains.push(item)
  }
  return [
    { id: 'prefab-pools', label: 'Prefab Pools', gallery: pools },
    { id: 'prefab-fountains', label: 'Prefab Fountains', gallery: fountains },
  ]
}

const pageOrder = [
  'water-features',
  ...WATER_FEATURE_CATEGORY_SLUGS,
  'prefab-water-features',
]

const pages = pageOrder.map((slug) => {
  const gallery = cleanGallery(manifest[slug] || [])
  const page = { ...meta[slug], gallery }
  if (slug === 'prefab-water-features') {
    page.sections = splitPrefabSections(gallery)
    page.gallery = [] // sections own the images
  }
  return page
})

const CAPABILITY_LINKS = [
  { label: 'Water Features', to: '/water-features' },
  { label: 'Prefab Water Features', to: '/prefab-water-features' },
  // Existing site page — not a CapabilityPage gallery
  { label: 'Multimedia', to: '/multimedia' },
]

const WATER_FEATURE_CATEGORIES = WATER_FEATURE_CATEGORY_SLUGS.map((slug) => ({
  label: meta[slug].label,
  to: `/${slug}`,
  slug,
}))

// Only gallery capability pages — exclude /multimedia (handled by Creations route)
const CAPABILITY_ROUTES = [
  { label: 'Water Features', to: '/water-features' },
  { label: 'Prefab Water Features', to: '/prefab-water-features' },
  ...WATER_FEATURE_CATEGORIES.map(({ label, to }) => ({ label, to })),
]

const out = `/** Legacy capability pages — structure & photos from ripplesfountains.com archives. */

/** Footer / top-level Capabilities only */
export const CAPABILITY_LINKS = ${JSON.stringify(CAPABILITY_LINKS, null, 2)}

/** Nested under Water Features (not in footer Capabilities) */
export const WATER_FEATURE_CATEGORIES = ${JSON.stringify(WATER_FEATURE_CATEGORIES, null, 2)}

/** All routable capability paths (top-level + water-feature categories) */
export const CAPABILITY_ROUTES = ${JSON.stringify(CAPABILITY_ROUTES, null, 2)}

export const CAPABILITY_PAGES = ${JSON.stringify(pages, null, 2)}

export function getCapabilityPage(slug) {
  return CAPABILITY_PAGES.find((page) => page.slug === slug) ?? null
}

export function getCapabilityRelatedLinks(slug) {
  if (slug === 'water-features') return WATER_FEATURE_CATEGORIES
  if (WATER_FEATURE_CATEGORIES.some((c) => c.slug === slug)) {
    return [
      { label: 'All Water Features', to: '/water-features' },
      ...WATER_FEATURE_CATEGORIES.filter((c) => c.slug !== slug),
      { label: 'Prefab Water Features', to: '/prefab-water-features' },
    ]
  }
  if (slug === 'prefab-water-features') {
    return [
      { label: 'Water Features', to: '/water-features' },
      ...WATER_FEATURE_CATEGORIES,
    ]
  }
  return CAPABILITY_LINKS.filter((link) => link.to !== \`/\${slug}\`)
}
`

fs.writeFileSync('src/data/capabilities.js', out)
console.log(
  'pages',
  pages.map((p) => `${p.slug}:${p.sections ? p.sections.map((s) => `${s.id}=${s.gallery.length}`).join(',') : p.gallery.length}`).join('\n'),
)

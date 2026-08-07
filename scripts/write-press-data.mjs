import fs from 'fs'
import path from 'path'

const dir = 'public/press/clippings'
const files = fs
  .readdirSync(dir)
  .filter((f) => /\.(jpe?g|png|webp)$/i.test(f))
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))

function inferPublication(title) {
  const t = title.toLowerCase()
  if (t.includes('times of india') || t.includes('toi')) return { id: 'toi', name: 'The Times of India' }
  if (t.includes('hindustan')) return { id: 'hindustan', name: 'Hindustan' }
  if (t.includes('amar ujala')) return { id: 'amar-ujala', name: 'Amar Ujala' }
  if (t.includes('dainik')) return { id: 'dainik', name: 'Dainik Jagaran' }
  if (t.includes('sail') || t.includes('jusco')) return { id: 'project', name: 'Project coverage' }
  if (t.includes('bhopal') || t.includes('raipur')) return { id: 'regional', name: 'Regional press' }
  if (t.includes('scan')) return { id: 'archive', name: 'Press archive' }
  if (t.includes('news')) return { id: 'regional', name: 'Press' }
  return { id: 'regional', name: 'Press' }
}

function titleFromFile(file) {
  return file
    .replace(/^\d+-/, '')
    .replace(/\.[^.]+$/, '')
    .replace(/^scan-/, 'Press scan ')
    .replace(/-/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase())
}

const publicationsMap = new Map()
const clippings = files.map((file, index) => {
  const headline = titleFromFile(file)
  const pub = inferPublication(headline + ' ' + file)
  publicationsMap.set(pub.id, pub.name)
  const src = `/press/clippings/${file}`
  return {
    id: `press-${String(index + 1).padStart(2, '0')}-${file.replace(/\.[^.]+$/, '')}`,
    publication: pub.name,
    publicationId: pub.id,
    headline,
    date: '',
    year: 0,
    thumbnail: src,
    fullImage: src,
    alt: `${pub.name}  ${headline}`,
    featured: false,
  }
})

const featureOrder = ['toi', 'hindustan', 'amar-ujala', 'dainik', 'project', 'regional', 'archive']
let featuredCount = 0
for (const id of featureOrder) {
  for (const clip of clippings) {
    if (featuredCount >= 6) break
    if (clip.publicationId === id && !clip.featured) {
      clip.featured = true
      featuredCount += 1
    }
  }
}

const PRESS_PUBLICATIONS = [...publicationsMap.entries()].map(([id, name]) => ({
  id,
  name,
  short: name.replace(/^The\s+/, ''),
}))

const PRESS_LOGOS = [
  { publicationId: 'toi', src: '/press/logos/times-of-india.svg', alt: 'The Times of India' },
  { publicationId: 'hindu', src: '/press/logos/the-hindu.svg', alt: 'The Hindu' },
  { publicationId: 'et', src: '/press/logos/economic-times.svg', alt: 'The Economic Times' },
  { publicationId: 'hindustan', src: '/press/logos/hindustan.svg', alt: 'Hindustan' },
  { publicationId: 'navbharat', src: '/press/logos/navbharat.svg', alt: 'Navbharat' },
]

const out = `/**
 * Press / media clippings  images from legacy ripplesfountains.com press archive.
 * thumbnail: card image. fullImage: lightbox scan.
 */

export const PRESS_PUBLICATIONS = ${JSON.stringify(PRESS_PUBLICATIONS, null, 2)}

/** Wordmark paths for the “As featured in” strip */
export const PRESS_LOGOS = ${JSON.stringify(PRESS_LOGOS, null, 2)}

/**
 * @typedef {{
 *   id: string,
 *   publication: string,
 *   publicationId: string,
 *   headline: string,
 *   date: string,
 *   year: number,
 *   thumbnail: string,
 *   fullImage: string,
 *   alt: string,
 *   featured?: boolean,
 * }} PressClipping
 */

/** @type {PressClipping[]} */
export const PRESS_CLIPPINGS = ${JSON.stringify(clippings, null, 2)}

export const FEATURED_PRESS = PRESS_CLIPPINGS.filter((c) => c.featured).slice(0, 6)

export const PRESS_YEARS = [...new Set(PRESS_CLIPPINGS.map((c) => c.year).filter(Boolean))].sort(
  (a, b) => b - a,
)
`

fs.writeFileSync('src/data/press.js', out)
console.log('files', files.length, 'publications', PRESS_PUBLICATIONS.map((p) => p.short).join(', '))

import fs from 'fs'

const payload = JSON.parse(fs.readFileSync('scripts/_multimedia-gallery.json', 'utf8'))

function polish(title) {
  return title
    .replace(/\bBirsa Munda memorial park\b/i, 'Birsa Munda Memorial Park')
    .replace(/\bLuv Kush Garden\b/i, 'Luv Kush Garden')
    .replace(/\bStatue of unity fountain\b/i, 'Statue of Unity Fountain')
    .replace(/\bBhopal Musical\b/i, 'Bhopal Musical')
    .replace(/\bJK Temple\b/i, 'JK Temple')
    .replace(/\bNDMC image 9\b/i, 'NDMC')
    .replace(/\bPCMC 1\b/i, 'PCMC')
    .replace(/\bHUB\b/i, 'HUB')
}

const gallery = payload.gallery.map((item) => ({
  title: polish(item.title),
  src: item.src,
}))

const cover = payload.cover
const previews = payload.previews

const page = {
  slug: 'multimedia-shows',
  label: 'Multimedia',
  eyebrow: 'WaterWorks  Multimedia',
  titleBefore: 'Water as',
  titleEm: 'performance',
  lead: 'Multimedia fountain shows  light, music, and water choreographed as one system.',
  body: 'From lake spectacles to urban promenades, we design and manufacture the show systems that turn water into a nightly performance.',
  gallery,
}

let ww = fs.readFileSync('src/data/waterworksCategories.js', 'utf8')

// Replace multimedia category cover + previews in WATERWORKS_CATEGORIES
ww = ww.replace(
  /("id": "multimedia"[\s\S]*?"cover":\s*")[^"]*(")/,
  `$1${cover}$2`,
)
ww = ww.replace(
  /("id": "multimedia"[\s\S]*?"previews":\s*)\[[\s\S]*?\]/,
  `$1${JSON.stringify(previews, null, 6).replace(/\n/g, '\n    ')}`,
)

// Replace multimedia-shows page object in WATERWORKS_CATEGORY_PAGES
const marker = '"multimedia-shows":'
const slugIdx = ww.indexOf(marker)
if (slugIdx < 0) throw new Error('multimedia-shows page not found')
const start = ww.indexOf('{', slugIdx + marker.length)
if (start < 0) throw new Error('multimedia page start not found')

let depth = 0
let end = -1
for (let i = start; i < ww.length; i += 1) {
  const ch = ww[i]
  if (ch === '{') depth += 1
  if (ch === '}') {
    depth -= 1
    if (depth === 0) {
      end = i + 1
      break
    }
  }
}
if (end < 0) throw new Error('multimedia page end not found')

const pageStr = JSON.stringify(page, null, 2)
  .split('\n')
  .map((line, idx) => (idx === 0 ? line : `  ${line}`))
  .join('\n')

ww = ww.slice(0, start) + pageStr + ww.slice(end)
fs.writeFileSync('src/data/waterworksCategories.js', ww)

console.log('ok', { cover, count: gallery.length, previews })

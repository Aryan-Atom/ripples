import fs from 'fs'

const payload = JSON.parse(fs.readFileSync('scripts/_architectural-gallery.json', 'utf8'))

function polish(title) {
  return title
    .replace(/\bAarohan Gurgaon\b/i, 'Aarohan, Gurgaon')
    .replace(/\bAbu Dhabi Airport\b/i, 'Abu Dhabi Airport')
    .replace(/\bAdani Power Plant Mundra\b/i, 'Adani Power Plant, Mundra')
    .replace(/\bAditya World City Noida\b/i, 'Aditya World City, Noida')
    .replace(/\bAnsal Township Lucknow\b/i, 'Ansal Township, Lucknow')
    .replace(/\bAPRA Builders\b/i, 'APRA Builders')
    .replace(/\bAsiana Hotel - Dubai\b/i, 'Asiana Hotel, Dubai')
    .replace(/\bBombay Dying\b/i, 'Bombay Dyeing')
    .replace(/\bCountry Inn and Suites\b/i, 'Country Inn & Suites')
    .replace(/\bCROWNE PLAZA ROHINI\b/i, 'Crowne Plaza Rohini')
    .replace(/\bDLF Prinston\b/i, 'DLF Princeton')
    .replace(/\bF1 Track Greater Noida\b/i, 'F1 Track, Greater Noida')
    .replace(/\bFortis Gurgaon\b/i, 'Fortis, Gurgaon')
    .replace(/\bGolf Park\b/i, 'Golf Park')
    .replace(/\bHarsha Dubai 1\b/i, 'Harsha, Dubai')
    .replace(/\bHotel Radisson SAS - Dubai\b/i, 'Radisson SAS, Dubai')
    .replace(/\bHyatt Hyderabad\b/i, 'Hyatt Hyderabad')
    .replace(/\bINS Karamba\b/i, 'INS Karamba')
    .replace(/\bIOCL Panipat\b/i, 'IOCL Panipat')
}

const gallery = payload.gallery.map((item) => ({
  title: polish(item.title),
  src: item.src,
}))

const cover = payload.cover
const previews = payload.previews

const page = {
  slug: 'architectural-fountains',
  label: 'Architectural',
  eyebrow: 'WaterWorks  Architectural',
  titleBefore: 'Fountains as',
  titleEm: 'architecture',
  lead:
    'Site-specific architectural fountains  basins, nozzles, and light composed for plazas, campuses, and civic destinations.',
  body:
    'Form follows hydraulics. We design the silhouette and engineer the system so the water holds its line in wind, heat, and daily use  built in our workshop, installed as architecture.',
  gallery,
}

function replaceObjectAt(source, start) {
  let depth = 0
  let end = -1
  for (let i = start; i < source.length; i += 1) {
    const ch = source[i]
    if (ch === '{') depth += 1
    if (ch === '}') {
      depth -= 1
      if (depth === 0) {
        end = i + 1
        break
      }
    }
  }
  if (end < 0) throw new Error('object end not found')
  return { end, text: source.slice(start, end) }
}

let caps = fs.readFileSync('src/data/capabilities.js', 'utf8')

// 1) Restore WATER_FEATURE_CATEGORIES architectural link if it was overwritten
const catsMarker = 'export const WATER_FEATURE_CATEGORIES'
const catsIdx = caps.indexOf(catsMarker)
if (catsIdx < 0) throw new Error('WATER_FEATURE_CATEGORIES not found')
const catsArrStart = caps.indexOf('[', catsIdx)
const firstCatStart = caps.indexOf('{', catsArrStart)
const firstCat = replaceObjectAt(caps, firstCatStart)
if (firstCat.text.includes('"gallery"') || firstCat.text.includes('"titleBefore"')) {
  const restoredCat = `{
    "label": "Architectural Fountains",
    "to": "/architectural-fountains",
    "slug": "architectural-fountains"
  }`
  caps = caps.slice(0, firstCatStart) + restoredCat + caps.slice(firstCat.end)
  console.log('restored WATER_FEATURE_CATEGORIES architectural link')
}

// 2) Replace architectural page inside CAPABILITY_PAGES only
const pagesMarker = 'export const CAPABILITY_PAGES'
const pagesIdx = caps.indexOf(pagesMarker)
if (pagesIdx < 0) throw new Error('CAPABILITY_PAGES not found')
const slugNeedle = '"slug": "architectural-fountains"'
const slugIdx = caps.indexOf(slugNeedle, pagesIdx)
if (slugIdx < 0) throw new Error('architectural page not found in CAPABILITY_PAGES')
const pageStart = caps.lastIndexOf('{', slugIdx)
const pageRange = replaceObjectAt(caps, pageStart)
const pageStr = JSON.stringify(page, null, 2)
  .split('\n')
  .map((line, idx) => (idx === 0 ? line : `  ${line}`))
  .join('\n')
caps = caps.slice(0, pageStart) + pageStr + caps.slice(pageRange.end)
fs.writeFileSync('src/data/capabilities.js', caps)

// 3) WaterWorks hover cover/previews
let ww = fs.readFileSync('src/data/waterworksCategories.js', 'utf8')
ww = ww.replace(
  /("id": "architectural"[\s\S]*?"cover":\s*")[^"]*(")/,
  `$1${cover}$2`,
)
ww = ww.replace(
  /("id": "architectural"[\s\S]*?"previews":\s*)\[[\s\S]*?\]/,
  `$1${JSON.stringify(previews, null, 6).replace(/\n/g, '\n    ')}`,
)
fs.writeFileSync('src/data/waterworksCategories.js', ww)

console.log('ok', { cover, count: gallery.length, previews })

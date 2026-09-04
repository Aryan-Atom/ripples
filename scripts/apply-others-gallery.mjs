import fs from 'fs'

const payload = JSON.parse(fs.readFileSync('scripts/_others-gallery.json', 'utf8'))

function polish(title) {
  return title
    .replace(/\bADNOC Abu Dhabi\b/i, 'ADNOC, Abu Dhabi')
    .replace(/\bCreek Fountain Sharjah\b/i, 'Creek Fountain, Sharjah')
    .replace(/\bDLF Golf Club Gurgaon\b/i, 'DLF Golf Club, Gurgaon')
    .replace(/\bFloating Fountain Indore\b/i, 'Floating Fountain, Indore')
    .replace(/\bJaypee Golf Course G Noida\b/i, 'Jaypee Golf Course, Greater Noida')
    .replace(/\bJaypee Greens G Noida\b/i, 'Jaypee Greens, Greater Noida')
    .replace(/\bM3M Golf Estate,? Gurgaon\b/i, 'M3M Golf Estate, Gurgaon')
    .replace(/\bPark Hyatt Goa\b/i, 'Park Hyatt, Goa')
    .replace(/\bSVIL Mines Katni\b/i, 'SVIL Mines, Katni')
    .replace(/\bAl Ain Stadium UAE\b/i, 'Al Ain Stadium, UAE')
    .replace(/\bAppu Ghar Gurgaon\b/i, 'Appu Ghar, Gurgaon')
    .replace(/\bBay Club Mumbai\b/i, 'Bay Club, Mumbai')
    .replace(/\bMiraj Housing Mumbai\b/i, 'Miraj Housing, Mumbai')
    .replace(/\bSuncity Panchkula\b/i, 'Suncity, Panchkula')
    .replace(/\bHarsha Dubai\b/i, 'Harsha, Dubai')
    .replace(/\bJumping Jets Club Florence Gurgaon\b/i, 'Jumping Jets, Club Florence Gurgaon')
    .replace(/\bJumping Jets Cross River Mall Noida\b/i, 'Jumping Jets, Cross River Mall Noida')
    .replace(/\bJumping Jets Mall Noida\b/i, 'Jumping Jets, Mall Noida')
    .replace(/\bJumping Jets ZECO Haryana\b/i, 'Jumping Jets, ZECO Haryana')
    .replace(/\bOrange county Indirapuram\b/i, 'Orange County, Indirapuram')
    .replace(/\bPrivate Residence N Delhi\b/i, 'Private Residence, New Delhi')
    .replace(/\bShantaram Talaov Mumbai\b/i, 'Shantaram Talaov, Mumbai')
    .replace(/\bTaj Vivanta Surajkund\b/i, 'Taj Vivanta, Surajkund')
    .replace(/\bTaj Vivanta Suraj Kund\b/i, 'Taj Vivanta, Surajkund')
    .replace(/\bTata Steel Jamshedpur\b/i, 'Tata Steel, Jamshedpur')
    .replace(/\bCountry Inn & Suites Ajmer\b/i, 'Country Inn & Suites, Ajmer')
    .replace(/^IMG[_\s-]?\d+$/i, 'Private Pool')
    .replace(/\bIntercontinental Goa\b/i, 'Intercontinental, Goa')
    .replace(/\bJW MARRIOT MUMBAI\b/i, 'JW Marriott, Mumbai')
    .replace(/\bLodha Bellezza Hyderabad\b/i, 'Lodha Bellezza, Hyderabad')
    .replace(/\bPrivate Farm N Delhi\b/i, 'Private Farm, New Delhi')
    .replace(/\bSapphire Heights Mumbai Swimming Pool\b/i, 'Sapphire Heights, Mumbai')
    .replace(/\bThe Bay Club Mumbai\b/i, 'The Bay Club, Mumbai')
}

const sections = payload.sections.map((section) => ({
  id: section.id,
  label: section.label,
  titleBefore: section.titleBefore,
  titleEm: section.titleEm,
  gallery: section.gallery.map((item) => ({
    title: polish(item.title),
    src: item.src,
  })),
}))

const cover = payload.cover
const previews = payload.previews

const page = {
  slug: 'waterworks-others',
  label: 'Others',
  eyebrow: 'WaterWorks  Others',
  titleBefore: 'Beyond the',
  titleEm: 'stage',
  lead:
    'Floating fountains, programmable jets, pools, and play areas from the Ripples workshop.',
  body:
    'A curated set of systems outside multimedia shows and architectural fountains  each still designed, engineered, and built in-house.',
  gallery: [],
  sections,
}

let ww = fs.readFileSync('src/data/waterworksCategories.js', 'utf8')

ww = ww.replace(
  /("id": "others"[\s\S]*?"cover":\s*")[^"]*(")/,
  `$1${cover}$2`,
)
ww = ww.replace(
  /("id": "others"[\s\S]*?"previews":\s*)\[[\s\S]*?\]/,
  `$1${JSON.stringify(previews, null, 6).replace(/\n/g, '\n    ')}`,
)

const marker = '"waterworks-others":'
const slugIdx = ww.indexOf(marker)
if (slugIdx < 0) throw new Error('waterworks-others page not found')
const start = ww.indexOf('{', slugIdx + marker.length)
if (start < 0) throw new Error('others page start not found')

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
if (end < 0) throw new Error('others page end not found')

const pageStr = JSON.stringify(page, null, 2)
  .split('\n')
  .map((line, idx) => (idx === 0 ? line : `  ${line}`))
  .join('\n')

ww = ww.slice(0, start) + pageStr + ww.slice(end)
fs.writeFileSync('src/data/waterworksCategories.js', ww)

console.log('ok', {
  cover,
  sections: sections.map((s) => `${s.id}:${s.gallery.length}`),
  previews,
})

import fs from 'fs'

const payload = JSON.parse(fs.readFileSync('scripts/_prefab-gallery.json', 'utf8'))

const previews = [
  '/assets/prefab/prefab-swimming-pool-w-goa.webp',
  '/assets/prefab/custom-geyser-jet-fountain-dmrc-hq-n-delhi.webp',
  '/assets/prefab/mckinsey-gurgaon.webp',
]
const cover = previews[0]

function polish(title) {
  return title
    .replace(/ W Goa/g, ', W Goa')
    .replace(/ N Delhi/g, ', New Delhi')
    .replace(/ DMRC HQ/g, ', DMRC HQ')
    .replace(/ TDI Township Kundli/g, ', TDI Township, Kundli')
    .replace(/ Hill Spring School Mumbai/g, ', Hill Spring School, Mumbai')
    .replace(/ SS Columns Dubai/g, ' SS Columns, Dubai')
    .replace(/ Private Client$/g, ', Private Client')
}

const pools = payload.pools.map((item) => ({ title: polish(item.title), src: item.src }))
const fountains = payload.fountains.map((item) => ({ title: polish(item.title), src: item.src }))

const page = {
  slug: 'prefab-water-features',
  label: 'Prefabs',
  eyebrow: 'WaterWorks  Prefabs',
  titleBefore: 'Factory-built',
  titleEm: 'water',
  lead:
    'Prefab pools and waterfalls from the Ripples workshop  precision-built modules that install faster without losing the finish of a custom system.',
  body:
    'Every prefab piece is manufactured under one roof: swimming pools, rock pools, sheet and trickling waterfalls, geyser jets. Workshop control means tighter tolerances, cleaner edges, and site schedules that stay on track.',
  gallery: [],
  sections: [
    { id: 'prefab-pools', label: 'Prefab Pools', gallery: pools },
    { id: 'prefab-fountains', label: 'Prefab Fountains', gallery: fountains },
  ],
}

let caps = fs.readFileSync('src/data/capabilities.js', 'utf8')
const slugIdx = caps.indexOf('"slug": "prefab-water-features"')
if (slugIdx < 0) throw new Error('prefab page not found')
const start = caps.lastIndexOf('{', slugIdx)
if (start < 0) throw new Error('prefab page start not found')

let depth = 0
let end = -1
for (let i = start; i < caps.length; i += 1) {
  const ch = caps[i]
  if (ch === '{') depth += 1
  if (ch === '}') {
    depth -= 1
    if (depth === 0) {
      end = i + 1
      break
    }
  }
}
if (end < 0) throw new Error('prefab page end not found')

const pageStr = JSON.stringify(page, null, 2)
  .split('\n')
  .map((line, idx) => (idx === 0 ? line : `  ${line}`))
  .join('\n')

caps = caps.slice(0, start) + pageStr + caps.slice(end)
fs.writeFileSync('src/data/capabilities.js', caps)

let ww = fs.readFileSync('src/data/waterworksCategories.js', 'utf8')
ww = ww.replace(
  /"cover": "\/capabilities\/prefab-water-features\/01-prefab-swimming-pool-w-goa-pp010\.jpg"/,
  `"cover": "${cover}"`,
)
ww = ww.replace(
  /"previews": \[\s*"\/capabilities\/prefab-water-features\/01-prefab-swimming-pool-w-goa-pp010\.jpg",\s*"\/capabilities\/prefab-water-features\/02-prefab-swimming-pool-w-goa-pp009\.jpg",\s*"\/capabilities\/prefab-water-features\/03-prefab-swimming-pool-w-goa-pp008\.jpg"\s*\]/,
  `"previews": ${JSON.stringify(previews, null, 6).replace(/\n/g, '\n    ')}`,
)
ww = ww.replace(
  /("id": "prefabs"[\s\S]*?"description": ")[^"]*(")/,
  '$1Prefab pools, rock pools, and waterfalls manufactured in our workshop. Modules arrive ready to set  still custom in the finish, still built to Ripples tolerances.$2',
)
fs.writeFileSync('src/data/waterworksCategories.js', ww)

console.log('ok', { cover, pools: pools.length, fountains: fountains.length })

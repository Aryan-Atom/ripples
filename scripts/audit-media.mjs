import fs from 'fs'
import path from 'path'
import http from 'http'

const root = process.cwd()
const publicRoot = path.join(root, 'public')

function walkText(dir, out = []) {
  if (!fs.existsSync(dir)) return out
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (['node_modules', '.git', 'dist'].includes(entry.name)) continue
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) walkText(full, out)
    else if (/\.(jsx?|tsx?|css|html|json|mjs)$/i.test(entry.name)) out.push(full)
  }
  return out
}

const refs = new Map()
const patterns = [
  /["'`](\/(?:assets|capabilities|press)\/[^"'`?#]+?\.(?:jpe?g|png|gif|webp|svg|mp4|webm|mov|avif))["'`]/gi,
  /url\(\s*["']?(\/(?:assets|capabilities)\/[^"')?#]+?\.(?:jpe?g|png|gif|webp|svg|mp4))["']?\s*\)/gi,
]

function addRef(url, file) {
  const clean = url.replace(/\\/g, '/')
  if (!refs.has(clean)) refs.set(clean, new Set())
  refs.get(clean).add(path.relative(root, file))
}

for (const file of walkText(path.join(root, 'src'))) {
  const text = fs.readFileSync(file, 'utf8')
  for (const pattern of patterns) {
    pattern.lastIndex = 0
    let match
    while ((match = pattern.exec(text))) addRef(match[1], file)
  }
}

const journeyPath = path.join(root, 'src/data/journey.js')
const journey = fs.readFileSync(journeyPath, 'utf8')
for (const match of journey.matchAll(/journeyAsset\('([^']+)'\)/g)) {
  addRef(`/assets/Journey/${match[1]}`, journeyPath)
}

const missing = []
const present = []
for (const url of [...refs.keys()].sort()) {
  const disk = path.join(publicRoot, ...url.replace(/^\//, '').split('/'))
  if (fs.existsSync(disk)) present.push(url)
  else missing.push({ url, refs: [...refs.get(url)] })
}

console.log('referenced media', refs.size)
console.log('present on disk', present.length)
console.log('missing on disk', missing.length)
if (missing.length) {
  console.log('--- MISSING ---')
  for (const item of missing) console.log(`${item.url} <- ${item.refs.join(', ')}`)
}

function head(requestPath) {
  return new Promise((resolve) => {
    const req = http.request(
      {
        hostname: 'localhost',
        port: 5173,
        path: encodeURI(requestPath),
        method: 'HEAD',
        timeout: 5000,
      },
      (res) => resolve(res.statusCode),
    )
    req.on('error', () => resolve('ERR'))
    req.on('timeout', () => {
      req.destroy()
      resolve('TIMEOUT')
    })
    req.end()
  })
}

const routes = [
  '/',
  '/waterworks',
  '/waterworks/multimedia',
  '/waterworks/architectural',
  '/waterworks/prefabs',
  '/waterworks/others',
  '/our-journey',
  '/practice',
  '/worldwide',
  '/contact',
]

console.log('--- ROUTES ---')
for (const route of routes) console.log(route, await head(route))

let httpBad = 0
for (const url of present) {
  const status = await head(url)
  if (status !== 200) {
    httpBad += 1
    console.log('HTTP', status, url)
  }
}
console.log('http assets checked', present.length, 'bad', httpBad)

// data integrity checks for waterworks pages
const { getCapabilityPage } = await import('../src/data/capabilities.js')
const { WATERWORKS_CATEGORIES } = await import('../src/data/waterworksCategories.js')

const slugs = [
  'multimedia-shows',
  'architectural-fountains',
  'prefab-water-features',
  'waterworks-others',
]

console.log('--- WATERWORKS PAGES ---')
for (const slug of slugs) {
  const page = getCapabilityPage(slug)
  if (!page) {
    console.log('MISSING PAGE', slug)
    continue
  }
  const galleries = []
  if (page.gallery?.length) galleries.push(...page.gallery)
  if (page.sections?.length) {
    for (const section of page.sections) galleries.push(...(section.gallery || []))
  }
  if (page.showreel?.src) galleries.push({ title: 'showreel', src: page.showreel.src })
  if (page.showreel?.poster) galleries.push({ title: 'poster', src: page.showreel.poster })

  let bad = 0
  for (const item of galleries) {
    const disk = path.join(publicRoot, ...item.src.replace(/^\//, '').split('/'))
    if (!fs.existsSync(disk)) {
      bad += 1
      console.log('PAGE MISSING', slug, item.src)
    }
  }
  console.log(
    slug,
    'ok',
    'items',
    galleries.length,
    'bad',
    bad,
    page.sections ? `sections=${page.sections.length}` : 'flat-gallery',
  )
}

console.log('--- WATERWORKS HOVER ---')
for (const cat of WATERWORKS_CATEGORIES) {
  const urls = [cat.cover, ...(cat.previews || [])]
  let bad = 0
  for (const url of urls) {
    const disk = path.join(publicRoot, ...url.replace(/^\//, '').split('/'))
    if (!fs.existsSync(disk)) {
      bad += 1
      console.log('HOVER MISSING', cat.id, url)
    }
  }
  console.log(cat.id, 'assets', urls.length, 'bad', bad)
}

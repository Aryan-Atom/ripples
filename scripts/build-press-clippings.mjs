import fs from 'fs'
import path from 'path'

const html = fs.readFileSync('old-pages/_extract/press/index.html', 'utf8')
const imagesDir = 'old-pages/_extract/press/images'
const outDir = 'public/press/clippings'
fs.mkdirSync(outDir, { recursive: true })

function sanitize(name) {
  return name
    .replace(/%20|-20/g, ' ')
    .replace(/[^\w.\- ]+/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .toLowerCase()
    .slice(0, 80)
}

function decode(s) {
  return s
    .replace(/&amp;/g, '&')
    .replace(/&nbsp;/g, ' ')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
}

const pattern =
  /data-title="([^"]+)"[^>]*data-image="([^"]+)"|data-image="([^"]+)"[^>]*data-title="([^"]+)"/gi
const seen = new Set()
const items = []
let i = 0

for (const m of html.matchAll(pattern)) {
  const title = decode((m[1] || m[4] || '').trim())
  const src = m[2] || m[3] || ''
  const fileName = path.basename(src.replace(/\\/g, '/'))
  const candidates = [
    path.join(imagesDir, fileName),
    path.join(imagesDir, fileName.replace(/ /g, '-20')),
    path.join(imagesDir, fileName.replace(/ /g, '%20')),
  ]
  let found = candidates.find((c) => fs.existsSync(c))
  if (!found) {
    const base = path.parse(fileName).name
    found = fs
      .readdirSync(imagesDir)
      .map((f) => path.join(imagesDir, f))
      .find((full) => {
        const n = path.basename(full).replace(/-20|%20/g, ' ')
        return n.includes(base) || base.includes(path.parse(n).name)
      })
  }
  if (!found || seen.has(found)) continue
  // skip UI chrome
  if (/logo|quote|bh3-|multihome|owl\.|fontawesome|favicon/i.test(found)) continue
  seen.add(found)
  i += 1
  const ext = path.extname(found).toLowerCase() || '.jpg'
  const outName = `${String(i).padStart(2, '0')}-${sanitize(title) || 'clipping'}${ext}`
  fs.copyFileSync(found, path.join(outDir, outName))
  items.push({ title, src: `/press/clippings/${outName}`, file: path.basename(found) })
}

// Fallback: named press files not caught by gallery markup
if (items.length < 8) {
  for (const f of fs.readdirSync(imagesDir)) {
    if (!/\.(jpe?g|png|webp)$/i.test(f)) continue
    if (/logo|quote|bh3-|multihome|owl\.|fontawesome|^\d+\.jpg$/i.test(f)) continue
    const full = path.join(imagesDir, f)
    if (seen.has(full)) continue
    seen.add(full)
    i += 1
    const title = path
      .parse(f)
      .name.replace(/-20|%20/g, ' ')
      .replace(/[-_]+/g, ' ')
      .trim()
    const outName = `${String(i).padStart(2, '0')}-${sanitize(title)}${path.extname(f).toLowerCase()}`
    fs.copyFileSync(full, path.join(outDir, outName))
    items.push({ title, src: `/press/clippings/${outName}`, file: f })
  }
}

console.log(JSON.stringify(items, null, 2))
console.log('count', items.length)
fs.writeFileSync('old-pages/_extract/press/_manifest.json', JSON.stringify(items, null, 2))

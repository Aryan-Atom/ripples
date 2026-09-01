import fs from 'fs'
import path from 'path'

const srcDir = path.join('public', 'assets', 'architectural Images')
const outDir = path.join('public', 'assets', 'architectural')

fs.mkdirSync(outDir, { recursive: true })

function slugify(name) {
  return name
    .replace(/\.[^.]+$/, '')
    .replace(/\(\d+\)/g, '')
    .replace(/^\d+\s+/, '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

function titleFrom(file) {
  return file
    .replace(/\.[^.]+$/, '')
    .replace(/\(\d+\)/g, '')
    .replace(/^\d+\s+/, '')
    .replace(/\s+/g, ' ')
    .replace(/\bG Noida\b/i, 'Greater Noida')
    .replace(/\bCrowne Plaza Rohini\b/i, 'Crowne Plaza Rohini')
    .replace(/\bF1 Track Greater Noida\b/i, 'F1 Track, Greater Noida')
    .replace(/\bIOCL\b/i, 'IOCL')
    .replace(/\bINS\b/i, 'INS')
    .replace(/\bAPRA\b/i, 'APRA')
    .trim()
}

const files = fs
  .readdirSync(srcDir)
  .filter((f) => /\.(jpe?g|png|webp)$/i.test(f))
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))

const used = new Map()
const gallery = []

for (const file of files) {
  const lowerExt = path.extname(file).toLowerCase()
  const ext = lowerExt === '.png' ? '.png' : '.jpg'
  let base = slugify(file)
  const count = (used.get(base) || 0) + 1
  used.set(base, count)
  const outName = count > 1 ? `${base}-${count}${ext}` : `${base}${ext}`
  fs.copyFileSync(path.join(srcDir, file), path.join(outDir, outName))
  gallery.push({
    title: titleFrom(file),
    src: `/assets/architectural/${outName}`,
  })
}

const preferredPreviews = [
  'aarohan-gurgaon',
  'abu-dhabi-airport',
  'hyatt-hyderabad',
]
const bySlug = new Map(gallery.map((g) => [slugify(path.basename(g.src)), g]))
const previews = preferredPreviews
  .map((slug) => bySlug.get(slug)?.src)
  .filter(Boolean)
while (previews.length < 3 && gallery[previews.length]) {
  const next = gallery[previews.length].src
  if (!previews.includes(next)) previews.push(next)
}

const payload = {
  cover: previews[0] || gallery[0]?.src,
  previews,
  gallery,
}

fs.writeFileSync('scripts/_architectural-gallery.json', JSON.stringify(payload, null, 2))
console.log('copied', gallery.length)
console.log(previews.join('\n'))

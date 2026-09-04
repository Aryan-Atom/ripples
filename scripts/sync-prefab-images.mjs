import fs from 'fs'
import path from 'path'

const srcDir = path.join('public', 'assets', 'Prefab Images')
const outDir = path.join('public', 'assets', 'prefab')

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
    .trim()
}

const files = fs
  .readdirSync(srcDir)
  .filter((f) => /\.(jpe?g|png|webp)$/i.test(f))
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))

const used = new Map()
const gallery = []

for (const file of files) {
  const ext = path.extname(file).toLowerCase() === '.png' ? '.png' : '.jpg'
  let base = slugify(file)
  const count = (used.get(base) || 0) + 1
  used.set(base, count)
  const outName = count > 1 ? `${base}-${count}${ext}` : `${base}${ext}`
  fs.copyFileSync(path.join(srcDir, file), path.join(outDir, outName))
  gallery.push({
    title: titleFrom(file),
    src: `/assets/prefab/${outName}`,
    file,
  })
}

const isPool = (title) => /pool/i.test(title)
const pools = gallery.filter((g) => isPool(g.title)).map(({ title, src }) => ({ title, src }))
const fountains = gallery.filter((g) => !isPool(g.title)).map(({ title, src }) => ({ title, src }))
const previews = gallery.slice(0, 3).map((g) => g.src)

const payload = {
  cover: gallery[0]?.src,
  previews,
  pools,
  fountains,
  all: gallery.map(({ title, src }) => ({ title, src })),
}

fs.writeFileSync('scripts/_prefab-gallery.json', JSON.stringify(payload, null, 2))
console.log('copied', gallery.length, 'pools', pools.length, 'fountains', fountains.length)
console.log(previews.join('\n'))

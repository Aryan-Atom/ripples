import fs from 'fs'
import path from 'path'

const srcRoot = path.join('public', 'assets', 'Others')
// Use a distinct folder name  Windows treats `Others` / `others` as the same path.
const outRoot = path.join('public', 'assets', 'ww-others')

const SECTION_MAP = [
  {
    folder: 'Floating Fountains Images',
    id: 'floating-fountains',
    label: 'Floating Fountains',
    titleBefore: 'Floating',
    titleEm: 'systems',
  },
  {
    folder: 'Programmable Fountains Images',
    id: 'programmable-fountains',
    label: 'Programmable Fountains',
    titleBefore: 'Programmable',
    titleEm: 'jets',
  },
  {
    folder: 'Swimming Pools Images',
    id: 'swimming-pools',
    label: 'Swimming Pools',
    titleBefore: 'Swimming',
    titleEm: 'pools',
  },
  {
    folder: 'Kids Play Area Images',
    id: 'kids-play',
    label: 'Kids Play Areas',
    titleBefore: 'Kids',
    titleEm: 'play',
  },
]

fs.mkdirSync(outRoot, { recursive: true })

function slugify(name) {
  return name
    .replace(/\.[^.]+$/, '')
    .replace(/\(\d+\)/g, '')
    .replace(/^\d+\s+/, '')
    .trim()
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

function titleFrom(file) {
  return file
    .replace(/\.[^.]+$/, '')
    .replace(/\(\d+\)/g, '')
    .replace(/^\d+\s+/, '')
    .replace(/\s+/g, ' ')
    .replace(/,/g, '')
    .trim()
}

const sections = []
const allImages = []

for (const section of SECTION_MAP) {
  const srcDir = path.join(srcRoot, section.folder)
  if (!fs.existsSync(srcDir)) {
    console.warn('missing folder', section.folder)
    continue
  }

  const outDir = path.join(outRoot, section.id)
  fs.mkdirSync(outDir, { recursive: true })

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
    if (base.startsWith('img-')) base = `private-pool-${base}`
    const count = (used.get(base) || 0) + 1
    used.set(base, count)
    const outName = count > 1 ? `${base}-${count}${ext}` : `${base}${ext}`
    fs.copyFileSync(path.join(srcDir, file), path.join(outDir, outName))
    const item = {
      title: titleFrom(file),
      src: `/assets/ww-others/${section.id}/${outName}`,
    }
    gallery.push(item)
    allImages.push(item)
  }

  sections.push({
    id: section.id,
    label: section.label,
    titleBefore: section.titleBefore,
    titleEm: section.titleEm,
    gallery,
  })
}

const preferredPreviews = [
  '/assets/ww-others/floating-fountains/creek-fountain-sharjah.webp',
  '/assets/ww-others/programmable-fountains/jumping-jets-mall-noida.webp',
  '/assets/ww-others/swimming-pools/intercontinental-goa.webp',
]

const existing = new Set(allImages.map((g) => g.src))
const previews = preferredPreviews.filter((src) => existing.has(src))
for (const item of allImages) {
  if (previews.length >= 3) break
  if (!previews.includes(item.src)) previews.push(item.src)
}

const payload = {
  cover: previews[0] || allImages[0]?.src,
  previews,
  sections,
  all: allImages,
}

fs.writeFileSync('scripts/_others-gallery.json', JSON.stringify(payload, null, 2))
console.log(
  'copied',
  allImages.length,
  'sections',
  sections.map((s) => `${s.id}:${s.gallery.length}`).join(' '),
)
console.log(previews.join('\n'))

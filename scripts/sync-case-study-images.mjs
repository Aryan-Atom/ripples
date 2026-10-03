import { copyFileSync, mkdirSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const src = join(root, 'public', 'assets', 'case study images')
const dst = join(root, 'public', 'assets', 'case-study')

const map = {
  'Site Photos before fountain/1 (3).jpeg': 'before-01.jpg',
  'Site Photos before fountain/1 (4).jpeg': 'before-02.jpg',
  'Site Photos before fountain/1 (6).jpeg': 'before-03.jpg',
  'Site Photos before fountain/1 (31).jpeg': 'before-04.jpg',
  'day_night photos/day.mp4': 'day.mp4',
  'day_night photos/night.mp4': 'night.mp4',
}

mkdirSync(dst, { recursive: true })

for (const [from, to] of Object.entries(map)) {
  const input = join(src, ...from.split('/'))
  const output = join(dst, to)
  if (!existsSync(input)) {
    console.warn('Missing', from)
    continue
  }
  copyFileSync(input, output)
  console.log('OK', to)
}

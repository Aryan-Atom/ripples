import fs from 'fs'
import http from 'http'

const ww = fs.readFileSync('src/data/waterworksCategories.js', 'utf8')
const urls = [...ww.matchAll(/"(?:src|cover)":\s*"(\/assets\/(?:others|ww-others)\/[^"]+)"/g)].map(
  (m) => m[1],
)
const previewUrls = [...ww.matchAll(/"(\/assets\/(?:others|ww-others)\/[^"]+\.(?:jpe?g|png|webp))"/gi)].map(
  (m) => m[1],
)
const all = [...new Set([...urls, ...previewUrls])]

function check(path) {
  return new Promise((resolve) => {
    const req = http.request(
      { hostname: 'localhost', port: 5173, path: encodeURI(path), method: 'HEAD' },
      (res) => resolve({ path, status: res.statusCode }),
    )
    req.on('error', (error) => resolve({ path, status: error.message }))
    req.end()
  })
}

const results = []
for (const path of all) results.push(await check(path))
const bad = results.filter((r) => r.status !== 200)
console.log('checked', results.length, 'bad', bad.length)
for (const row of bad.slice(0, 30)) console.log(row.status, row.path)

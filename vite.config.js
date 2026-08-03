import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'hero-video-anim': path.resolve(__dirname, 'hero-video-anim'),
    },
  },
  server: {
    port: 5173,
    host: true,
    strictPort: false,
  },
})

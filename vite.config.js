import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { copyFileSync, existsSync } from 'fs'
import { resolve } from 'path'

// Use relative base so assets load correctly on GitHub Pages (any repo name/path).
// React Router basename is derived from window.location in main.jsx.
const base = './'

/** Copy index.html to 404.html so GitHub Pages serves the SPA for all routes */
function copy404Plugin() {
  return {
    name: 'copy-404',
    closeBundle() {
      const outDir = resolve(__dirname, 'dist')
      const index = resolve(outDir, 'index.html')
      const notFound = resolve(outDir, '404.html')
      if (existsSync(index)) {
        copyFileSync(index, notFound)
        console.log('Copied index.html to 404.html for GitHub Pages SPA routing')
      }
    },
  }
}

export default defineConfig({
  plugins: [react(), copy404Plugin()],
  base,
})

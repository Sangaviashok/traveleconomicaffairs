import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const root = fileURLToPath(new URL('.', import.meta.url))

// GitHub Pages is https://sangaviashok.github.io/traveleconomicaffairs/
// The trip calculator is /place/. Local `npm run dev` stays at http://localhost:5173/place/
export default defineConfig({
  plugins: [react()],
  base: process.env.GITHUB_ACTIONS ? '/traveleconomicaffairs/' : '/',
  build: {
    rollupOptions: {
      input: {
        main: resolve(root, 'index.html'),
        place: resolve(root, 'place/index.html'),
      },
    },
  },
})

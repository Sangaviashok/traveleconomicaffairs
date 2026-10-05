import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// GitHub Pages is https://sangaviashok.github.io/city-eats/
// Local `npm run dev` stays at http://localhost:5173/
export default defineConfig({
  plugins: [react()],
  base: process.env.GITHUB_ACTIONS ? '/city-eats/' : '/',
})

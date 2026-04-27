import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react()],
  assetsInclude: ['**/*.md'],
  server: {
    allowedHosts: ['localhost', 'devserver-preview--leeous.netlify.app', 'leeous.com', 'www.leeous.com'],
  },
})

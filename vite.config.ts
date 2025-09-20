import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Set the base path for all assets to be relative, which is useful for loading the app from a file path (e.g., in Electron)
  base: './',
  // Configure the build output directory to 'dist-react' for clarity and separation from other builds
  build: {
    outDir: 'dist-react',
  },
  server: {
    port: 20251, // Configure the server port to be 20251
    strictPort: true, // Configure the server to use a strict port
  },
})

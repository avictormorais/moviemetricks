import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  root: './src',
  build: {
    outDir: '../dist',
  },
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['**\/(*.)?{test,spec}.?(c|m)[jt]s?(x)'],
    setupFiles: ['../.test/setup.js'],
    coverage: {
      provider: 'v8',
      include: ['**/components/**']
    }    
  }
})

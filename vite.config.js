import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  base: '/ecommerce-data-tracker/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  }
})

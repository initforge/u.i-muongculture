import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    // Tăng giới hạn kích thước file để hỗ trợ PDF lớn
    fs: {
      strict: false
    }
  },
  build: {
    // Tăng giới hạn kích thước chunk
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: undefined
      }
    }
  }
})


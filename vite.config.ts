import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/PeopleManagement': {
        target: 'http://localhost:5545',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/PeopleManagement/, '/PeopleManagement')
      }
    }
  }  
})

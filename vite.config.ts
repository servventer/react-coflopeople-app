import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// IIS Hosting
//        target: 'http://localhost:5565',
// Docker Hosting
//        target: 'http://localhost:5545',
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/PeopleManagement': {
        target: 'http://localhost:5565',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/PeopleManagement/, '/PeopleManagement')
      }
    }
  }  
})

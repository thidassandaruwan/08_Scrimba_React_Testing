import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'


// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // test configuration
  test: {
    // giving the testing file's path
    setupFiles: ["./test-setup.js"],
    // giving the testing enviroment
    environment: 'jsdom'
  }
})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    allowedHosts: [
      "8907-2a09-bac1-34c0-28-00-2e4-34.ngrok-free.app",
      "a462-2a09-bac5-3a14-101e-00-19b-18d.ngrok-free.app",
      "e4d2-2a09-bac1-34a0-28-00-3c3-24.ngrok-free.app",
      "d83e-2a09-bac5-3a11-25d7-00-3c5-41.ngrok-free.app",
      "3b03-2a09-bac5-3a14-25b9-00-3c2-3c.ngrok-free.app"
    ]
  }
})

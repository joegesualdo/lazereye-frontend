import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // This will take the process.env variable and pass it to vite to make the environemnt variables accessible
  // https://github.com/vitejs/vite/issues/1973#issuecomment-815695512
  define: {
    'process.env': process.env,
  },
})

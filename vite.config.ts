import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path' // এটি অবশ্যই যোগ করবেন

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // @ কে src ফোল্ডারের সাথে লিঙ্ক করা
    },
  },
})
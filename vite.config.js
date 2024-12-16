import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/todo-react', // Замените <repository> на имя вашего репозитория
  plugins: [react()],
})

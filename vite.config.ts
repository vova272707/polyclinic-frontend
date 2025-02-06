import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import mkcert from 'vite-plugin-mkcert'
import fs from 'fs';
import path from 'path';

export default defineConfig({
  plugins: [react(), mkcert()],
  base: "/polyclinic-frontend", // имя вашего репозитория
  server: {
    https: {
      key: fs.readFileSync(path.resolve(__dirname, 'cert.key')), // путь к приватному ключу
      cert: fs.readFileSync(path.resolve(__dirname, 'cert.crt')), // путь к публичному сертификату
    },
    host: "0.0.0.0",
    port: 5174,
    proxy: {
      "/api": {
        target: "http://localhost:8000",
        secure: false,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, "/"),
      },
    },
  },
})

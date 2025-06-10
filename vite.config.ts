import react from "@vitejs/plugin-react";
import tailwind from "tailwindcss";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "./",
  css: {
    postcss: {
      plugins: [tailwind()],
    },
  },
  server: { // Añadido para la configuración del proxy
    proxy: {
      '/api': { // Cualquier solicitud a /api/... será redirigida
        target: 'https://n8n.sebagarcia.dev', // El servidor de destino
        changeOrigin: true, // Necesario para hosts virtuales
        rewrite: (path) => path.replace(/^\/api/, ''), // Elimina /api del path antes de reenviar
      },
    },
  },
});

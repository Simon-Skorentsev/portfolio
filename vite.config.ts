import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { VitePWA } from "vite-plugin-pwa";
import autoprefixer from "autoprefixer"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      manifest: { 
        name: "Simon's site",
        description: "Portfolio site of front end developer",
        theme_color: '#1D1D1D',
        icons: [
        { src: "/images/icon-192.png", type: "image/png", sizes: "192x192" },
        { src: "/images/icon-512.png", type: "image/png", sizes: "512x512" },
        { src: "./images/maskable_icon_x192.png", type: "image/png", sizes: "192x192", purpose: "maskable" }
        ]
      }
    }),
  ],
  css: {
    postcss: {
      plugins: [
        autoprefixer({}),
      ],
    }
  }
})
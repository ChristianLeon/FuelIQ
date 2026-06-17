import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "FuelIQ",
        short_name: "FuelIQ",
        description: "Control personal de gasolina y rendimiento",
        theme_color: "#22c55e",
        background_color: "#09090b",
        display: "standalone",
        start_url: "/",
        icons: [
          {
            src: "/fueliq-192.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "/fueliq-512.png",
            sizes: "512x512",
            type: "image/png"
          }
        ]
      }
    })
  ]
});
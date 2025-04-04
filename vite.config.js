import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ["three"], // Ensure Three.js is optimized
  },
  build: {
    rollupOptions: {
      external: ["three"], // Add this if Three.js is not bundling properly
    },
  },
});

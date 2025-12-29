import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  base: "/",   // ✅ VERY IMPORTANT (fixes blank page)

  preview: {
    allowedHosts: [
      "portfolio-9urm.onrender.com"
    ]
  }
});

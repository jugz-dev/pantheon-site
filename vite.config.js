import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/pantheon-site/",
  plugins: [react()],
});

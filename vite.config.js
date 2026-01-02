import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { copyFileSync, readFileSync, writeFileSync, existsSync } from "fs";
import { join } from "path";

export default defineConfig(({ command }) => ({
  plugins: [
    react(),
    {
      name: 'copy-404',
      closeBundle() {
        if (command === 'build') {
          const src404 = join(process.cwd(), '404.html');
          const dist404 = join(process.cwd(), 'dist', '404.html');
          if (existsSync(src404)) {
            copyFileSync(src404, dist404);
            console.log('✓ Copied 404.html to dist');
          }
        }
      }
    }
  ],
  base: "/",
}));


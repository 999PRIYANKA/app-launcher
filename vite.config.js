import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { copyFileSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";

export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === "build" ? "/app-launcher/" : "/",
}));


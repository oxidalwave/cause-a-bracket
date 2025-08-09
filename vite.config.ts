import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { defineConfig } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";
import react from '@vitejs/plugin-react';

export default defineConfig({
  server: {
    port: 3000
  },
  plugins: [tailwindcss(), tsConfigPaths({
    projects: ["./tsconfig.json"]
  }), tanstackStart({
    target: "node-server",
    customViteReactPlugin: true,
    server: {
      entry: "server.ts",
    }
  }), react()]
});
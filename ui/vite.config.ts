import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  clearScreen: false,
  server: {
    host: "::",
    port: 5173,
    strictPort: true,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime", "@tanstack/react-query", "@tanstack/query-core"],
  },
  build: {
    rollupOptions: {
      // Treat Tauri as external - don't bundle it
      external: [
        "@tauri-apps/api",
        "@tauri-apps/api/core",
        "@tauri-apps/api/window",
        "@tauri-apps/api/webview",
      ],
      output: {
        // These will be undefined in web builds, causing graceful fallback
        globals: {
          "@tauri-apps/api": "undefined",
          "@tauri-apps/api/core": "undefined",
          "@tauri-apps/api/window": "undefined",
          "@tauri-apps/api/webview": "undefined",
        },
      },
    },
    commonjsOptions: {
      ignoreDynamicRequires: true,
    },
  },
  optimizeDeps: {
    // Don't pre-bundle Tauri
    exclude: ["@tauri-apps/api"],
  },
}));

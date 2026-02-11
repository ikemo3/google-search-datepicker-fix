import { resolve } from "path";
import { defineConfig } from "vitest/config";

// https://vitejs.dev/config/
// https://ja.vitejs.dev/guide/backend-integration.html
export default defineConfig({
  build: {
    target: "es2022",
    minify: false,
    cssMinify: false,
    sourcemap: true,
    rollupOptions: {
      input: {
        google: resolve(__dirname, "apps/content_script/google.ts"),
      },
      output: {
        entryFileNames: "assets/[name].js",
        chunkFileNames: "assets/[name].js",
        assetFileNames: "assets/[name].[ext]",
      },
    },
  },
  plugins: [],
  test: {
    globals: true,
  },
});

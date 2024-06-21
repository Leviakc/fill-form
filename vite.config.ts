import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        popup: resolve(__dirname, "index.html"),
        content: resolve(__dirname, "src/scripts/content.ts"),
        // background: resolve(__dirname, "src/background/background.ts"),
      },
      output: {
        entryFileNames: "[name].js",
        assetFileNames: "[name].[ext]", // Ensures CSS and other assets retain their names
        inlineDynamicImports: false,
      },
    },
    outDir: "dist",
    emptyOutDir: true,
    // Disable inlining dynamic imports
  },
});

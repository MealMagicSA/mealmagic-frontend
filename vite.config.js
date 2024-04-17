import { defineConfig } from "vite";
import path from "path";
import Pages from "vite-plugin-pages";

export default defineConfig({
  plugins: [
    Pages({
      pagesDir: "src/pages",
      extensions: ["html"],
      routeBlockLang: "yaml",
    }),
  ],

  resolve: {
    alias: {
      "@pages": path.resolve(__dirname, "src/pages"),
    },
  },
});

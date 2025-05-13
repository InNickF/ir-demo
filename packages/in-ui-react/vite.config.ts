import { defineConfig } from "vite";
import * as path from "path";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import svgLoader from "vite-svg-loader";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src/lib"),
      "@@": path.resolve(__dirname, "./src/lib/components"),
    },
  },
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
    }),
    svgLoader({
      defaultImport: "raw",
    }),
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/lib/index.ts"),
      name: "inUIReact",
      formats: ["es", "umd"],
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
});

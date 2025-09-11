// Plugins
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import Fonts from "unplugin-fonts/vite";
import Layouts from "vite-plugin-vue-layouts-next";
import Vue from "@vitejs/plugin-vue";
import VueRouter from "unplugin-vue-router/vite";
import { VueRouterAutoImports } from "unplugin-vue-router";
import Vuetify, { transformAssetUrls } from "vite-plugin-vuetify";

// Utilities
import { defineConfig } from "vite";
import { fileURLToPath, URL } from "node:url";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    VueRouter({
      dts: "src/typed-router.d.ts",
    }),
    Layouts(),
    AutoImport({
      imports: [
        "vue",
        VueRouterAutoImports,
        {
          pinia: ["defineStore", "storeToRefs"],
        },
      ],
      dts: "src/auto-imports.d.ts",
      eslintrc: {
        enabled: true, // create file .eslintrc-auto-import.json
        // globalsPropValue: true, // Đặt giá trị cho các biến toàn cục
      },
      vueTemplate: true,
    }),
    Components({
      dts: "src/components.d.ts",
    }),
    Vue({
      template: { transformAssetUrls },
    }),
    // https://github.com/vuetifyjs/vuetify-loader/tree/master/packages/vite-plugin#readme
    Vuetify({
      autoImport: true,
      styles: {
        configFile: "src/styles/settings.scss",
      },
    }),
    // Fonts({
    //   fontsource: {
    //     families: [
    //       {
    //         name: "Roboto",
    //         weights: [100, 300, 400, 500, 700, 900],
    //         styles: ["normal", "italic"],
    //       },
    //     ],
    //   },
    // }),
  ],
  optimizeDeps: {
    exclude: [
      "vuetify",
      "vue-router",
      "unplugin-vue-router/runtime",
      "unplugin-vue-router/data-loaders",
      "unplugin-vue-router/data-loaders/basic",
    ],
  },
  define: { "process.env": {} },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("src", import.meta.url)),
    },
    extensions: [".js", ".json", ".jsx", ".mjs", ".ts", ".tsx", ".vue"],
  },
  css: {
    preprocessorOptions: {
      sass: {
        api: "modern-compiler",
      },
      scss: {
        api: "modern-compiler",
      },
    },
  },
  server: {
    port: 8000,
  },
  // base: './', // or ''
  // build: {
  //   outDir: "dist", // thư mục chứa output sau khi chạy lệnh build, mặc định là dist
  //   assetsDir: 'static-assets', // Assets will be in ./dist/static-assets (if outDir is 'dist')
  // },
  // publicDir: './my-public-files', // thư mục chứa file tĩnh (static assets) ./my-public-files 
  // => Tùy chọn này chỉ định một thư mục cho các tài sản tĩnh được sao chép trực tiếp vào outDir
  // mà không cần xử lý bởi quy trình build của Vite. Mặc định là public
});

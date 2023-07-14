import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "path";
import cesium from 'vite-plugin-cesium'; // 引入插件
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

const pathSrc = path.resolve(__dirname, "src");

export default defineConfig({
  base: './',
  resolve: {
    alias: {
      "@": pathSrc,
    },
  },
  plugins: [
    cesium(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    vue()
  ],
})

import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'url';

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    // alias: {
    //   '@': fileURLToPath(new URL('./src', import.meta.url)),
    //   '@configs': fileURLToPath(new URL('./src/configs', import.meta.url)),
    //   '@helpers': fileURLToPath(new URL('./src/helpers', import.meta.url)),
    //   '@assets': fileURLToPath(new URL('./src/assets', import.meta.url)),
    //   '@components': fileURLToPath(new URL('./src/components', import.meta.url)),
    //   '@views': fileURLToPath(new URL('./src/views', import.meta.url)),
    // },
    alias: [
      { find: '@', replacement: fileURLToPath(new URL('./src', import.meta.url)) },
      { find: '@assets', replacement: fileURLToPath(new URL('./src/assets', import.meta.url)) },
      { find: '@components', replacement: fileURLToPath(new URL('./src/components', import.meta.url)) },
      { find: '@configs', replacement: fileURLToPath(new URL('./src/configs', import.meta.url)) },
      { find: '@helpers', replacement: fileURLToPath(new URL('./src/helpers', import.meta.url)) },
      { find: '@router', replacement: fileURLToPath(new URL('./src/router', import.meta.url)) },
      { find: '@stores', replacement: fileURLToPath(new URL('./src/stores', import.meta.url)) },
      { find: '@views', replacement: fileURLToPath(new URL('./src/views', import.meta.url)) },
    ]
  },
  server: {
    port: 8000,
  },
})

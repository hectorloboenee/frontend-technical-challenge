import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import {resolve} from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), tailwindcss()],
    // resolve: {
    //   alias: {
    //       '@common': resolve(__dirname, 'src/common'),
    //       '@components': resolve(__dirname, 'src/components'),
    //   }
    // }
})

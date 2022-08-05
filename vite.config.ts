import { defineConfig } from 'vite';
import { resolve } from 'path';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/currency-conversion/',
  plugins: [vue()],
  resolve: {
    alias: {
      '~': resolve(__dirname, 'src')
    }
  }
});

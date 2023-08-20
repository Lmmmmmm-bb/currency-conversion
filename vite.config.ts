import { resolve } from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import ogPlugin from 'vite-plugin-open-graph';
import type { Options } from 'vite-plugin-open-graph';
import { visualizer } from 'rollup-plugin-visualizer';

const ogOptions: Options = {
  basic: {
    type: 'website',
    title: 'Currency Conversion',
    url: 'https://convert.lmmmmmm.dev',
    description:
      'Help you convert, use vue, conversion information provided by exchangerate.host.',
  },
  twitter: {
    title: 'Currency Conversion',
    card: 'summary',
    description:
      'Help you convert, use vue, conversion information provided by exchangerate.host.',
    creator: '@_lmmmmmm',
  },
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    ogPlugin(ogOptions),
    visualizer({
      open: true,
      filename: './dist/visualizer.html',
    }),
  ],
  resolve: {
    alias: {
      '~': resolve(__dirname, 'src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          chart: ['chart.js'],
          math: ['mathjs'],
          vue: ['vue'],
          ui: ['naive-ui'],
        },
      },
    },
  },
});

import { resolve } from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import ogPlugin, { Options } from 'vite-plugin-open-graph';

const ogOptions: Options = {
  basic: {
    type: 'website',
    title: 'Currency Conversion',
    url: 'https://convert.lmmmmmm.dev',
    description:
      'Help you convert, use vue, conversion information provided by exchangerate.host.'
  },
  twitter: {
    title: 'Currency Conversion',
    card: 'summary',
    description:
      'Help you convert, use vue, conversion information provided by exchangerate.host.',
    creator: '@_lmmmmmm'
  }
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), ogPlugin(ogOptions)],
  resolve: {
    alias: {
      '~': resolve(__dirname, 'src')
    }
  }
});

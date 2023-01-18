import 'reset-css';
import { createApp } from 'vue';
import { inject } from '@vercel/analytics';

import './index.scss';
import App from './app/index.vue';

inject();

const app = createApp(App);

app.mount('#app');

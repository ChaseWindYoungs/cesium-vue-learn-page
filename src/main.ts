import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router';
import {useIcoins } from '@/utils/icons.ts'
const app = createApp(App);
useIcoins(app)
app.use(router).mount('#app');


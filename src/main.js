// main.js/ts
import App from './App.vue'; // Can be a different place

import { createApp } from 'vue';
import BootstrapVueNext from 'bootstrap-vue-next';

// Optional, since every component imports their Bootstrap functionality
// the following line is not necessary
// import 'bootstrap'

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap';
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css';

const app = createApp(App);
app.use(BootstrapVueNext);
app.mount('#app');

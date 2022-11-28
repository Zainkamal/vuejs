import { createApp } from 'vue';
import App from './App.vue';
import "bootstrap/dist/css/bootstrap.min.css";
import Router from './router';
// import './assets/main.css'

import "sweetalert2/dist/sweetalert2.min.css";


createApp(App).use(Router).mount('#app')

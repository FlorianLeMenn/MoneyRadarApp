import { createApp } from 'vue'
import App from './App.vue'
import '@/assets/css/tailwind.css' //@en vue pointe vers src/
import store from './store'
import router from './router'
import { apply } from 'core-js/library/fn/reflect';

const app = createApp(App);
app.use(store);
app.use(router);
app.mount('#app');

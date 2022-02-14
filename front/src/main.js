import { createApp } from 'vue'
import App from './App.vue'
import '@/assets/css/tailwind.css' //@en vue pointe vers src/
import store from './store'
import { apply } from 'core-js/library/fn/reflect';

const app = createApp(App);
app.use(store);
app.mount('#app');

import { createRouter, createWebHashHistory }  from 'vue-router';
import App from '../App.vue'
import MoodBoard from '../views/MoodBoard'
import Home from '../views/Home'
import Finances from '../views/Finances'
import TodoBoard from '../views/TodoBoard'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/finances',
        name: 'Finances',
        component: Finances
    },
    { 
        path: '/moodboard', 
        name: 'moodboard',
        component: MoodBoard 
    },
    { 
        path: '/todo', 
        name: 'todoboard',
        component: TodoBoard 
    }
]

const router = createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: createWebHashHistory(process.env.BASE_URL),
    routes, // short for `routes: routes`
})

export default router;
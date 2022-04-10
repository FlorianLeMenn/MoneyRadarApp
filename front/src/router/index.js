import { createRouter, createWebHashHistory }  from 'vue-router';
import App from '../App.vue'
import MoodBoard from '../views/MoodBoard'
import Home from '../views/Home'
import Finances from '../views/Finances'
import TodoList from '../views/TodoList'

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
        path: '/todolist', 
        name: 'todolist',
        component: TodoList 
    }
]

const router = createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: createWebHashHistory(process.env.BASE_URL),
    routes, // short for `routes: routes`
})

export default router;
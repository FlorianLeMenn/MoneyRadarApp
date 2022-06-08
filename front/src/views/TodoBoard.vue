<template>
    <h1 class="mb-6 text-3xl max-w-sm mx-auto font-bold text-white text-center">
        Todo Board
    </h1>
    <div class="todolist p-6 max-w-sm mx-auto bg-gray rounded-xl shadow-lg flex flex-col ">
        <div class="period-nav m-4 flex justify-around items-center text-center text-gray1">
            <div class="day selected py-1 px-2 text-white rounded-full bg-gray-light" data-item="day">Jour</div>
            <div class="week" data-item="week">Semaine</div>
            <div class="month" data-item="month">Mois</div>
        </div>
        <div class="container"></div>
        <todo-list :allTodoList="allTodoList" ></todo-list>
    </div>
</template>

<script>
import main from '../assets/js/main.js';
import todoList from '../components/todoList.vue';
import nav from '../assets/js/period-nav.js';
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3000';


export default {
    name: 'TodoBoard',
    components: {
        todoList,
    },
    mounted() {
        nav.init();
        main.init();
        this.$store.dispatch('loadAllTodos');
    },
    computed: {
        allTodoList() {
            return this.$store.state.todoList; 
        },
        error() {
            return this.$store.state.error;
        },
    },
    
}
</script>
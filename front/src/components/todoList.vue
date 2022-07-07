
<template >
    <div class="container">
        <div class="list flex flex-col  max-w-sm mx-auto">
            <hr class="text-gray1 mb-4">
            <div v-for="list in allTodoList" :value="list.id" :key="list.id" class="mb-4 px-4 py-2 bg-gray-dark rounded-xl  ">
            <div class="flex list-info">
                <div class="flex date text-sm text text-left text-gray1">
                    <div class="picto">
                        <svg xmlns="http://www.w3.org/2000/svg" version="1.0" width="12.000000pt" height="12.000000pt" viewBox="0 0 128.000000 128.000000" preserveAspectRatio="xMidYMid meet">
                        <g transform="translate(0.000000,128.000000) scale(0.100000,-0.100000)" fill="#ffffff" stroke="none">
                        <path d="M207 1162 c-64 -64 -117 -124 -117 -133 0 -19 20 -39 40 -39 8 0 49 34 90 75 l75 76 5 -562 c5 -521 6 -563 23 -573 12 -8 22 -8 35 0 16 10 17 52 22 573 l5 562 75 -76 c41 -41 82 -75 90 -75 20 0 40 20 40 40 0 20 -230 250 -250 250 -9 0 -68 -53 -133 -118z"/>
                        <path d="M912 1268 c-9 -9 -12 -150 -12 -572 l0 -561 -78 78 c-42 42 -84 77 -93 77 -19 0 -39 -20 -39 -40 0 -19 230 -250 250 -250 20 0 250 231 250 250 0 20 -20 40 -39 40 -9 0 -51 -35 -93 -77 l-78 -78 0 561 c0 579 0 584 -40 584 -9 0 -21 -5 -28 -12z"/>
                        </g>
                        </svg>
                    </div>
                    <div class="order">
                        {{ list.order }}
                    </div>                 
                </div>
                <div class="title font-bold">{{ list.title }}</div>
                <div class="ml-auto font-bold text-right">
                    <!-- <button v-if="list.id" @click="this.$store.dispatch('removeTodoList', list.id)">Supprimer</button> -->
                    <button v-if="list.id" @click="loadTasks(list.id)">open</button>
                </div>
            </div>
            <div :class='"list-container list-" + list.id +" items-center"'></div>
            </div>
            <div :class="[ showForm === true ? '' : 'hidden' ] + ' addNewForm'"> 
                <add-task-form :listId="getListId" :showForm="showForm" ></add-task-form>
            </div>
        </div>
    </div>
    
    <button @click="addTodoList()" href="#" class="p-4 mb-2 grow max-w rounded-xl bg-blue text-white text-sm uppercase">
        + Nouvelle liste de tâches
    </button>
    <task-list  :showTaskList="showTaskList" :tasksList="tasksList" :listId="listId" @displayForm="displayForm" ></task-list>
</template>

<script>
import addTaskForm from './addTaskForm.vue';
import taskList from './taskList.vue';
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3000';

export default {
    name: 'todoList',
    props: ['allTodoList'],
    components: {
        taskList,
        addTaskForm,
    },
    data() {
        return {
            loading: false,
            visibleForm: false,
            visibleTaskList: false,
            listId: 0,
            tasks: [],
            newList: {
                title: undefined,
                order: 0,
            }
        };
    },
    methods: {
        displayForm(listId) {
            this.listId = listId;
            this.visibleForm = !this.visibleForm;
        },
        async loadTasks(listId) {
            this.listId = listId;

            const listContainer  = document.querySelector(`.list-container.list-${listId}`);
            const taskListContainer = document.querySelector('.task-list');
            //API call
            this.$store.dispatch('loadTasks', listId);
            //display tasks list
            listContainer.appendChild(taskListContainer);
            this.visibleTaskList = !this.visibleTaskList
        },
        cancelForm() {
            this.visibleForm = false;
        },
        async addTodoList() {
            try {
                this.newList.title = `Liste test`;
                const message = await axios.post(`/list`, this.newList);

                if (!message) {
                    this.$store.dispatch('setError', 'Impossible de créer la liste');
                }
                this.message = 'Liste de tâche crée';
                this.$store.dispatch('loadAllTodos');

            } catch (error) {
                this.$store.dispatch('setError', error);
            }
        },
    },
    computed: {
        showForm() {
            return this.visibleForm;
        },
        showTaskList() {
            return this.visibleTaskList;
        },
        getListId() {
            return this.listId;
        },
        tasksList() {
            return this.$store.state.tasksList; 
        },
    },
}
</script>
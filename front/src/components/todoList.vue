
<template >
    <div class="container">
        <div class="list flex flex-col  max-w-sm mx-auto">
            <hr class="text-gray1 mb-4">
            <div v-for="list in allTodoList" :value="list.id" :key="list.id" class="mb-4 px-4 py-2 bg-gray-dark rounded-xl  ">
                <div :class='"list-container list-" + list.id +" items-center gap-4 mb-4"'>
                    <div class="date text-sm text text-left text-gray1">{{ list.order }}</div>
                    <div class="title font-bold">{{ list.title }}</div>
                    <div class="ml-auto font-bold text-right">
                        <!-- <button v-if="list.id" @click="this.$store.dispatch('removeTodoList', list.id)">Supprimer</button> -->
                        <button v-if="list.id" @click="loadTasks(list.id)">open</button>
                    </div>
                    <div class="task-container">
                        <div v-if="loading">loading...</div>
                        <!-- <task-list :taskList="taskList" :listId="list.id" @displayForm="displayForm" ></task-list> -->
                    </div>
                </div>
            </div>
            {{this.$store.state.error}}
            <div :class="[ showForm === true ? '' : 'hidden' ] + ' addNewForm'"> 
                <add-task-form :listId="getListId" :showForm="showForm" ></add-task-form>
            </div>
        </div>
    </div>
    
    <button @click="addTodoList()" href="#" class="p-4 mb-2 grow max-w rounded-xl bg-blue text-white text-sm uppercase">
        + Nouvelle liste de tâches
    </button>
    <task-list  :tasksList="tasksList" :listId="listId" @displayForm="displayForm" ></task-list>
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
        getListId() {
            return this.listId;
        },
        tasksList() {
            return this.$store.state.tasksList; 
        },
    },
}
</script>
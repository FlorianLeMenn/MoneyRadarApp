
<template >
    <div class="container">
        <div class="list flex flex-col  max-w-sm mx-auto">
            <hr class="text-gray1 mb-4">
            <div 
                v-for="list in allTodoList" :value="list.id" :key="list.id" 
            class="mb-4 px-4 py-2 bg-gray-dark rounded-xl  ">
            <div class="flex list-info items-center">
                {{list.id}}
                <div class="flex date text-sm text text-left text-gray1">
                    <div class="picto mr-2 w-8">
                        <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                            viewBox="0 0 512.004 512.004" style="enable-background:new 0 0 512.004 512.004;" xml:space="preserve">
                        <g>
                            <rect x="238.984" y="118.986" style="fill:#BCBCBC;" width="199.188" height="16"/>
                            <rect x="238.984" y="177.217" style="fill:#BCBCBC;" width="273.02" height="16"/>
                            <rect x="238.984" y="329.623" style="fill:#BCBCBC;" width="189.006" height="16"/>
                            <rect x="238.984" y="389.702" style="fill:#BCBCBC;" width="273.02" height="16"/>
                        </g>
                        <rect x="8" y="90.753" style="fill:#FFFFFF;" width="143.438" height="143.438"/>
                        <path style="fill:#BCBCBC;" d="M143.44,98.755v127.44H16V98.755H143.44 M159.44,82.754H0v159.44h159.44V82.754z"/>
                        <rect x="8" y="303.217" style="fill:#FFFFFF;" width="143.438" height="143.449"/>
                        <path style="fill:#BCBCBC;" d="M143.44,311.211v127.44H16v-127.44H143.44 M159.44,295.21H0v159.44h159.44V295.21z"/>
                        <g>
                            <polygon style="fill:#E21B1B;" points="96.016,416.707 35.36,362.835 56.504,339.026 91.792,370.37 170.296,269.826 195.4,289.427 
                                    "/>
                            <polygon style="fill:#E21B1B;" points="96.016,204.234 35.36,150.362 56.504,126.554 91.792,157.899 170.296,57.354 195.4,76.954 	
                                "/>
                        </g>
                        </svg>
                    </div>
                    <div class="order"></div>                 
                </div>
                <div class="title font-bold">{{ list.title }}</div>
                <div class="ml-auto font-bold text-right">
                    <button 
                        v-if="list.id"
                        @click="this.$store.dispatch('removeTodoList', list.id)"
                    >
                        <svg width="24px" height="24px" viewBox="0 0 24 24" role="img" xmlns="http://www.w3.org/2000/svg" aria-labelledby="removeIconTitle" stroke="#EF5350" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none" color="#000000">
                            <title id="removeIconTitle">Remove</title> 
                            <path d="M17,12 L7,12"/>
                            <circle cx="12" cy="12" r="10"/>
                        </svg>
                    </button>
                    <button 
                        v-if="list.id"
                        @click="loadTasks(list.id)"
                    >
                        <svg width="24px" height="24px" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M37 18L25 30L13 18" stroke="#919db5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
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
        displayForm() {
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
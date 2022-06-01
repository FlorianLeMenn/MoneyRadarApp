
<template >
    <div class="todo-list-container">
        <div class="list flex flex-col  max-w-sm mx-auto">
            <hr class="text-gray1 mb-4">
            <div v-for="list in allTodoList" :value="list.id" :key="list.id" class="mb-4 px-4 py-2 bg-gray-dark rounded-xl  ">
                <div class="flex items-center gap-4 mb-4">
                    <div class="date text-sm text text-left text-gray1">{{ list.order }}</div>
                    <div class="title font-bold">{{ list.title }}</div>
                    <div class="ml-auto font-bold text-right">
                        <button v-if="list.id" @click="this.$store.dispatch('removeTodoList', list.id)">Supprimer</button>
                    </div>
                </div>
                <div class="task-container">
                    liste
                    <task-list :listId="list.id" :allTaskList="this.$store.dispatch('loadAllTasks',list.id)" @displayForm="displayForm" ></task-list>
                </div>
            </div>
            {{this.$store.state.error}}
            <div :class="[ showForm === true ? '' : 'hidden' ] + ' addNewForm'"> 
                <add-task-form :listId="listId" :showForm="showForm" ></add-task-form>
            </div>
        </div>
    </div>
    
    <button @click="addTodoList()" href="#" class="p-4 mb-2 grow max-w rounded-xl bg-blue text-white text-sm uppercase">
        + Nouvelle liste de tâches
    </button>
</template>

<script>
import taskList from './taskList.vue';
import addTaskForm from './addTaskForm.vue';
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
            message: '',
            error: '',
            counter: 0,
            visibleForm: false,
            listId: 10,
            newList: {
                title: undefined,
                order: 0,
            }
        };
    },
    mounted() {
        this.$store.dispatch('loadAllTasks');
    },
    methods: {
        displayForm(listId) {
            console.log('displayForm = ' + listId);
            this.listId = listId;
            this.visibleForm = !this.visibleForm;
        },
        selectedList(newListId) {
            this.listId = newListId
        },
        cancelForm() {
            this.visibleForm = false;
        },
        async addTodoList() {
            try {
                this.newList.title = `Liste ${this.counter++}`;
                this.newList.order = this.counter;
                console.log(this.newList);
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
        async getTotalTask() {

        }
    },
    computed: {
        selectedList() {
            return this.listId;
        },
        showForm() {
            return this.visibleForm;
        },
        listId() {
            return this.listId;
        },
        allTaskList() {
            return this.$store.state.tasksList; 
        },
    },
}
</script>
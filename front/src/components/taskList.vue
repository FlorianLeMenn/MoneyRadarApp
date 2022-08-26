
<template >
    <div 
        :class="[ showTaskList === true ? '' : 'hidden' ] + ' mt-4 task-list list weekList flex flex-col p-2 max-w-sm mx-auto bg-gray rounded-xl shadow-lg'"
    >
        <draggable 
            v-model="tasksList" 
            tag="div"
            item-key="id"
            :sort="true"
            ghost-class="ghost"
            chosen-class="chosen"
            @end="updateItemOrder"
        >
        <template #item="{element, index}">
        
            <div class="container task border-b p-2 flex flex-row">
                <div class="text-sm text mr-2">
                    {{ element.position }}
                        <input
                            @change="updateTasksList(element, $event)"
                            type="checkbox"
                            :checked="element.finish"
                            v-model="element.finish" 
                            :value="element.id"
                            @start="isDragging = true"
                            @end="isDragging = false"
                        >
                </div>
                <div  :class="[ element.finish === true ? 'finished' : '' ] + ' title'">{{ element.title }}</div>
                <div class="font-bold">
                    <button 
                        v-if="element.id" 
                        @click="this.$store.dispatch('removeTask', element.id)"
                    >
                        <svg width="24px" height="24px" viewBox="0 0 24 24" role="img" xmlns="http://www.w3.org/2000/svg" aria-labelledby="removeIconTitle" stroke="#EF5350" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none" color="#000000">
                            <title id="removeIconTitle">Remove</title> 
                            <path d="M17,12 L7,12"/>
                            <circle cx="12" cy="12" r="10"/>
                        </svg>
                    </button>
                </div>
            </div>
        </template>
        </draggable>
        <div class="flex flex-row gap-4 pt-4 pb-4 justify-center">
            <button @click="displayForm(listId)" href="#" class="px-2 rounded bg-blue text-white text-sm uppercase right">+</button>
        </div>
    </div>
</template>

<script>
import Draggable from 'vuedraggable';
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3000';

export default {
    name: 'taskList',
    props: ['tasksList','listId', 'showTaskList'],
    components: {
        Draggable,
    },
    data() {
        return {
            drag: false,
            finishedTask: [],
        }
    },
    methods: {
        displayForm(event) {
            this.$emit('displayForm', this.listId);
        },
        updateItemOrder(e) {
            this.tasksList.map(function(task, index) {
                task.position = index;
            });
            this.tasksList.forEach(task => {
                this.updateTask(task);
            });
        },
        async updateTasksList(task, event) {
            if (event.target.checked) {
                task.finish = true;
                this.updateTask(task);
            }
            else {
                task.finish = false;
                this.updateTask(task);      
            }
        },
        async updateTask(task) {
            try {
                const message = await axios.patch(`/task/${task.id}`,task);

                if (!message) {
                    this.$store.dispatch('setError', 'Impossible de créer la tache');
                }
                this.message = 'Tache update';
                // Refresh list
                this.$store.dispatch('loadTasks', this.listId);

            } catch (error) {
                this.$store.dispatch('setError', error);
            }
        }
    },
    computed: {
        error() {
            return this.$store.state.error;
        },
    },
}
</script>

<style>
.ghost { 
    opacity: 0.4;
    background-color: red;
    }
.chosen {
    background-color: #353766;
    opacity: 0.7;
}
.task-list .border-b {
    border-color: #292B4D;
}
.task {
    justify-content: space-between;
    align-items: center;
}
.finished {
    text-decoration: line-through;
}
</style>

<template >
    <div 
        :class="[ showTaskList === true ? '' : 'hidden' ] + ' mt-4 task-list list weekList flex flex-col p-6 max-w-sm mx-auto bg-gray rounded-xl shadow-lg'"
    >
        <div class="flex flex-row gap-4">
            Liste des taches <button @click="displayForm(listId)" href="#" class="px-2 rounded bg-blue text-white text-sm uppercase right">+</button>
            <hr class="text-gray1 mb-4">
        </div>
        <draggable 
            v-model="tasksList" 
            tag="div" 
            item-key="id"
            :move="checkMove"
            ghost-class="ghost"
            chosen-class="chosen"
            @end="updateTasksList()" 
        >
        <template #item="{element, index}">
        <div class="container flex flex-row">
            <div class="text-sm text text-left text-gray1"  >{{index}} - {{ element.position }}</div>
            <div class="">
                <div class="title font-bold">{{ element.title }}</div>
                <div class="date text-sm text text-left text-gray1">Terminé 
                    <input 
                        type="checkbox" 
                        name="finish"
                        :value="element.id"  
                        v-model="finishedTask"  
                        :checked="element.finish" >
                    </div>
            </div>
            <div class="ml-auto font-bold text-right">
                <button 
                    v-if="element.id" 
                    @click="this.$store.dispatch('removeTask', element.id)"
                >
                Supprimer
                </button>
            </div>
        </div>

        </template>
        </draggable>
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
        checkMove(e) {
            console.log("checkMove");
            console.log(e.draggedContext.element.position);
        },
        updateTasksList() {
            this.tasksList.map((task, index) => {
                
                const isFinished = this.finishedTask.find( el => el === task.id);
                task.finish = false;
                console.log("finished ? = " + isFinished);
                if (isFinished) {
                    task.finish = true;
                    console.log("finish = " + task.finish);
                }
            
                task.position = index;
                this.updateTask(task);
                // clean finished Task 
                this.finishedTask = [];
            });

        },
        async updateTask(task) {
            try {
                const message = await axios.patch(`/task/${task.id}`,
                    {
                        title: 'test',
                        position: task.position,
                        finish: true,
                    }
                );

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
    background-color: green;
}
</style>
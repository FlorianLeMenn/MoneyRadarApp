
<template >
    <div class="task-list list weekList flex flex-col p-6 max-w-sm mx-auto bg-gray rounded-xl shadow-lg">
        <div class="flex flex-row gap-4">
            Liste des taches <button @click="displayForm(listId)" href="#" class="px-2 rounded bg-blue text-white text-sm uppercase right">+</button>
            <hr class="text-gray1 mb-4">
        </div>
        <div v-for="task in tasksList" :value="task.id" :key="task.id" class=" mb-4 flex items-center gap-4 flex-row">
        <div class="date text-sm text text-left text-gray1">{{ task.position }}</div>
            <div class="">
                <div class="title font-bold">{{ task.title }}</div>
                <div class="date text-sm text text-left text-gray1">Terminé <input type="checkbox" name="finish" id="" :checked="task.finish" ></div>
            </div>
            <div class="ml-auto font-bold text-right">
                <button v-if="task.id" @click="this.$store.dispatch('removeTask', task.id)">Supprimer</button>
            </div>
        </div>
    </div>
</template>

<script>

import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3000';

export default {
    name: 'taskList',
    props: ['tasksList','listId'],
    methods: {
        displayForm(event) {
            this.$emit('displayForm', this.listId);
        },
    },
    computed: {
        error() {
            return this.$store.state.error;
        },
    },
}


</script>
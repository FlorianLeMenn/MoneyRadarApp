<template>
        <form 
            @submit="onSubmit"
            method="POST"
            action="http://localhost:3000/task"
        >

        <div :class="listId">
            <p class="mb-2 font-semibold text-gray1">Intitulé</p>
            <input 
                v-model="newTask.title" 
                type="text" 
                name="description" 
                placeholder="Nouvelle tache..."
                class="w-full p-2 mb-5 bg-gray-dark rounded shadow-sm" id="" 
            />
            <input 
                v-model="listId" 
                type="text" 
                name="liste" 
                placeholder="ID liste"
                class="w-full p-2 mb-5 bg-gray-dark rounded shadow-sm" id="" 
            />
            <div class="flex flex-col sm:flex-row items-center mb-5 sm:space-x-5">
                    <div class="w-full">
                        <p class="mb-2 font-semibold text-gray1">Catégorie</p>
                        <select v-model="newTask.taxonomies" name="categoriesList" class="w-full p-2 bg-gray-dark rounded shadow-sm appearance-none" id="">
                            <optgroup v-for=" parentCategory in categoriesList" :label="parentCategory.name" :key="parentCategory.id">
                                <option v-for="option in parentCategory.children" :value="option.id" :key="option.id">
                                    {{ option.name }}
                                </option>
                            </optgroup>
                        </select>
                    </div>               
                </div>

            <div class="flex sm:flex-row items-baseline mb-5 sm:space-x-5">
                <div class="w-2/3">
                    <p class="mb-2 font-semibold text-gray1">Position</p>
                    <input 
                        v-model="newTask.position" 
                        type="number" 
                        name="position" 
                        class="p-2 mb-5 bg-gray-dark rounded shadow-sm" id="" 
                    />
                </div>
                <div class="w-1/3">
                    <input 
                        v-model="newTask.finish" 
                        type="checkbox" 
                        name="finish" 
                        class="p-2 mb-5 bg-gray-dark rounded shadow-sm" id="checkFinish" 
                    />
                    <label class="p-2 form-check-label inline-block text-gray1" for="checkFinish">Terminé</label>
                </div>
            </div>

                <div class="flex flex-row items-center justify-between py-2">
                    <button type="button" class="cancelBtn px-4 py-2 text-white font-semibold bg-red text-white text-sm uppercase rounded">
                        Annuler
                    </button>
                    <button type="submit" class="px-4 py-2 text-white font-semibold bg-blue text-white text-sm uppercase rounded">
                        Enregistrer
                    </button>
                </div>
        </div>
        </form>
</template>
<script>

import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3000';

export default {
    name: 'addTaskForm',
    props: ['listId'],
    data() {
        return {
            message: '',
            error: '',
            counter: 0,
            newTask: {
                title: '',
                finish: 0,
                position: 0,
                taxonomies: undefined,
                list_id: this.listId,
            },
        };
    },
    mounted() {
        this.initCategories();
    },
    methods: {
        onSubmit(e) {
            this.newTask.list_id = this.listId;
            e.preventDefault() // don't perform submit action (i.e., `<form>.action`)
            if(this.newTask.title === '') {
                this.$store.dispatch('setError', 'La description n\'est pas renseignée.');
                return;
            }
            else if(this.newTask.taxonomies === undefined) {
                this.$store.dispatch('setError', 'La catégorie n\'est pas renseignée.');
                return;
            }
            else {
                this.addTask();
            }
        },
        async initCategories() {
            try {
                const {data} = await axios.get(`/vocabulary/5`);
                if (!data.taxonomies) {
                    this.message = 'Impossible de trouver les catégories';
                }

                //boucle de trie parent / enfants
                let hierarchy = [];
                data.taxonomies.forEach(el => {
                    if (el.parent === null){
                        const children =  data.taxonomies.filter(child => child.parent == el.id)
                        hierarchy.push({name: el.name, weight: el.weight, children: children });
                    }
                });

                this.categoriesList = hierarchy;
                

            } catch (error) {
                this.$store.dispatch('setError', error);
            }
        },
        async getTaxonomie() {
            try {
                const {data} = await axios.get(`/taxonomy/`, this.newTask.taxonomies);
                if (data.taxonomies) {
                    this.message = 'Impossible de trouver la catégorie';
                }

            } catch (error) {
                this.$store.dispatch('setError', error);
            }
        },

        async addTask() {
            try {
                const message = await axios.post(`/task`, this.newTask);

                if (!message) {
                    this.$store.dispatch('setError', 'Impossible de créer la tache');
                }
                this.message = 'Tache crée';
                // Refresh list
                this.$store.dispatch('loadTasks', this.listId);

            } catch (error) {
                this.$store.dispatch('setError', error);
            }
        }
    },
}
</script>
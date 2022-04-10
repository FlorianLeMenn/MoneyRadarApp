<template>
    <h1 class="mb-6 text-3xl max-w-sm mx-auto font-bold text-white text-center">
        Todo list
    </h1>
    <div class="todolist p-6 max-w-sm mx-auto bg-gray rounded-xl shadow-lg flex flex-col ">
        <h2  class="mb-6 text-l max-w-sm mx-auto font-bold text-white text-left" >{{title}}</h2>
        <div class="period-nav m-4 flex justify-around items-center text-center text-gray1">
            <div class="day selected py-1 px-2 text-white rounded-full bg-gray-light" data-item="day">Jour</div>
            <div class="week" data-item="week">Semaine</div>
            <div class="month" data-item="month">Mois</div>
        </div>
        <div class="container">

        </div>

        <div>
            {{ this.$store.state.error }}
        </div>

        <form 
            @submit="onSubmit"
            method="POST"
            action="http://localhost:3000/task"
        >
            <input 
                v-model="newTask.name" 
                type="text" 
                name="description" 
                placeholder="Nouvelle tache..."
                class="w-full p-2 mb-5 mt-5 bg-gray-dark rounded shadow-sm" id="" 
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
            <input 
                v-model="newTask.finish" 
                type="checkbox" 
                name="mood" 
                class="p-2 mb-5 bg-gray-dark rounded shadow-sm" id="" 
            />
            <input 
                v-model="newTask.position" 
                type="text" 
                name="position" 
                class="p-2 mb-5 bg-gray-dark rounded shadow-sm" id="" 
            />
            
            <div class="flex flex-row items-center justify-between py-2">
                <button type="submit" class="w-full px-4 py-2 text-white font-semibold bg-blue text-white text-sm uppercase rounded">
                    Enregistrer
                </button>
            </div>

        </form>
    </div>
</template>

<script>
import {format, getDate , getDaysInMonth, parseISO} from 'date-fns';
import { enUS, fr } from 'date-fns/esm/locale'
import nav from '../assets/js/period-nav.js';
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3000';


export default {
    name: 'TodoList',
    data() {
        return {
            title: format(new Date(), 'EEEE c MMMM', {locale: fr}),
            currentday: getDate(new Date()),
            newTask: {
                name: '',
                finish: 0,
                position: 0,
                taxonomies: undefined,
            }
        };
    },
    created() {
    },
    mounted() {
        nav.init();
        this.$store.dispatch('loadAllTasks');
    },
    updated() {
    },
    methods: {
        onSubmit(e) {
            e.preventDefault() // don't perform submit action (i.e., `<form>.action`)
            if(this.newTask.name === '') {
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
                const {data} = await axios.get(`/vocabulary/2`);
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

            } catch (error) {
                this.$store.dispatch('setError', error);
            }
        }
    },
    computed: {
        TodoList() {
            return this.$store.state.TodoList; 
        },
        error() {
            return this.$store.state.error;
        },
    },
}
</script>
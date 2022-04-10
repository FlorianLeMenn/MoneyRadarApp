<template>
    <h1 class="mb-6 text-3xl max-w-sm mx-auto font-bold text-white text-center">
        MoodBoard
    </h1>
    <div class="moodboard p-6 max-w-sm mx-auto bg-gray rounded-xl shadow-lg flex flex-col ">
        <h2  class="mb-6 text-l max-w-sm mx-auto font-bold text-white text-left" >{{title}}</h2>
        <div class="container">
            <div 
            @click="setMood((index + 1), $event)" 
            v-for="mood in moodList" :value="mood.id" :key="mood.id" 
            :class="[ mood.date == currentday ? 'today' : '' ] + ' day day-' + mood.date"
            :style="'background: '+ [ mood.mood ? mood.mood : '' ] "
            >
                {{ mood.date }}
            </div>
        </div>

        <output id="output"></output>

        <input id="mood_slider" type="range" min="10" max="100" class="slider" step="10" list="tickmarks"  @change="getSliderVal">
        <datalist id="tickmarks">
            <option value="0" label="0%"></option>
            <option value="10"></option>
            <option value="20"></option>
            <option value="30"></option>
            <option value="40"></option>
            <option value="50"></option>
            <option value="60"></option>
            <option value="70"></option>
            <option value="80"></option>
            <option value="90"></option>
            <option value="100"></option>
        </datalist>

        <div>
            {{ this.$store.state.error }}
        </div>

        <form 
            @submit="onSubmit"
            method="POST"
            action="http://localhost:3000/mood"
        >
            <input 
                v-model="newMood.description" 
                type="text" 
                name="description" 
                placeholder="La raison de votre état émotionnel..."
                class="w-full p-2 mb-5 mt-5 bg-gray-dark rounded shadow-sm" 
            />
            <input 
                v-model="newMood.mood" 
                type="hidden" 
                name="mood" 
                class="p-2 mb-5 bg-gray-dark rounded shadow-sm"
            />
            <input 
                v-model="newMood.date" 
                type="hidden" 
                name="date" 
                class="p-2 mb-5 bg-gray-dark rounded shadow-sm"
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
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3000';

export default {
    name: 'MoodBoard',
    data() {
        return {
            title: format(new Date(), 'MMMM', {locale: fr}),
            totalDays: getDaysInMonth(new Date()),
            days: [],
            currentday: getDate(new Date()),
            newMood: {
                mood: '#d5e1e8',
                description: '',
                date: new Date().toISOString(),
            }
        };
    },
    created() {
    },
    mounted() {
        this.$store.dispatch('loadAllMoods');
    },
    updated() {
    },
    methods: {
        onSubmit(e) {
            e.preventDefault() // don't perform submit action (i.e., `<form>.action`)
            if(this.newMood.description === '') {
                this.$store.dispatch('setError', 'La description n\'est pas renseignée.');
                return;
            }
            else if(this.newMood.mood === '') {
                this.$store.dispatch('setError', 'Le mood n\'est pas renseignée.');
                return;
            }
            else if(this.newMood.date === undefined) {
                this.$store.dispatch('setError', 'La date n\'est pas renseignée.');
                return;
            }
            else {
                this.addMood();
            }
        },
        setMood(index, e) {
            if (index == this.currentday) { 
                e.target.style.background = '#6bc279'; 
            };
        },
        getSliderVal(e) {
            const colorMap = {
                '0': '#6bc279',
                '10': '#6bc279',
                '20': '#5db1a5',
                '30': '#69ace2',
                '40': '#d5e1e8',
                '50': '#fbe38b',
                '60': '#f7c257',
                '70': '#fcab7d',
                '80': '#f38757',
                '90': '#fb6f62',
                '100': '#df4644',
            }

            const currentDay = document.querySelector(`.day-${this.currentday}`);
            currentDay.style.background = colorMap[e.target.value];
            this.newMood.mood = colorMap[e.target.value];
        },
        async addMood() {
            try {
                const message = await axios.post(`/mood`, this.newMood);

                if (!message) {
                    this.$store.dispatch('setError', 'Impossible de créer le mood');
                }

                this.message = 'Mood crée';

            } catch (error) {
                this.$store.dispatch('setError', error);
            }
        }
    },
    computed: {
        moodList() {
            return this.$store.state.moodList; 
        },
        error() {
            return this.$store.state.error;
        },
    },
}
</script>

<style>
.moodboard input[type="range"] {
    display: inline;
    -webkit-appearance: none;
    height: 10px;
    border-radius: 5px;
    outline: none;
    -webkit-transition: .2s;
    transition: opacity .2s;
    margin: 1rem 0;
        background: linear-gradient(90deg, 
    #6bc279 0%, #6bc279 10%,  
    #5db1a5 10%, #5db1a5 20%, 
    #69ace2 20%, #69ace2 30%,
    #d5e1e8 30%, #d5e1e8 40%,
    #fbe38b 40%, #fbe38b 50%,
    #f7c257 50%, #f7c257 60%,
    #fcab7d 60%, #fcab7d 70%,
    #f38757 70%, #f38757 80%,
    #fb6f62 80%, #fb6f62 90%,
    #df4644 90%, #df4644 100%
    );

}

.moodboard input[type=range]::-webkit-slider-thumb {
    -webkit-appearance: none;
    background: rgb(41, 43, 77);
    border: 2px solid rgb(53 55 102 );
    height: 16px;
    width: 16px;
    border-radius: 50%;

}

input[type=range]::-webkit-slider-runnable-track {
     -webkit-appearance: none;

}

.moodboard .container {
    display: inline-grid;;
    grid-template-columns: repeat(auto-fill,minmax(50px,1fr));
    border-top: 1px solid #414376;
    border-left: 1px solid #414376;
}
.moodboard .day {
    padding: 10px;
    border-bottom: 1px solid #414376;
    border-right: 1px solid #414376;
    text-align: center;
}
.moodboard .today {
    background: #414376;
}

</style>
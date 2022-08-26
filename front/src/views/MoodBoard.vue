<template>
    <h1 class="mb-6 text-3xl max-w-sm mx-auto font-bold text-white text-center">
        MoodBoard
    </h1>
    <div class="moodboard p-6 max-w-sm mx-auto bg-gray rounded-xl shadow-lg flex flex-col ">
        <h2  class="mb-6 text-l max-w-sm mx-auto font-bold text-white text-left" >
            <span @click="sub(current_date)"> &lt;</span>
            {{current_date_format}}
            <span @click="add(current_date)"> > </span>
        </h2>
        
        <div class="container">
            <div 
                @click="setMood((moodDay.day), $event)" 
                v-for="moodDay in moodList" :value="moodDay.id" :key="moodDay.id" 
                :class="[ moodDay.day == currentday ? 'today' : '' ] + ' day day-' + moodDay.day"
                :style="'background: '+ [ moodDay.mood ? moodDay.mood : '' ] "
            >
                {{ moodDay.day }} <span>{{ moodDay.description }}</span>
            </div>
        </div>

        <output id="output"></output>

        <input id="mood_slider" type="range" min="10" max="100" class="slider" step="10" list="tickmarks"  @change="setSliderVal">
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
            {{ this.message }}
        </div>

        <form 
            v-if="displayForm" 
            @submit="onSubmit"
            :method=this.methode
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
            <input 
                v-model="newMood.day" 
                type="hidden" 
                name="day" 
                class="p-2 mb-5 bg-gray-dark rounded shadow-sm"
            />
            <input 
                v-if="newMood.id" 
                v-model="newMood.id" 
                type="hidden" 
                name="day" 
                class="p-2 mb-5 bg-gray-dark rounded shadow-sm"
            />
            
            <div class="flex flex-row items-center justify-between py-2">
                <button 
                    v-if="newMood.id" 
                    @click="deleteMood(newMood.id)"
                    type="button" 
                    class="cancelBtn px-4 py-2 text-white font-semibold bg-red text-white text-sm uppercase rounded"
                >
                    Supprimer
                </button>
                <button type="submit" class="px-4 py-2 text-white font-semibold bg-blue text-white text-sm uppercase rounded">
                    {{ this.btnText }}
                </button>
            </div>

        </form>
    </div>
</template>

<script>
import {format, getDate , getDaysInMonth} from 'date-fns';
import { enUS, fr } from 'date-fns/esm/locale'
import sub from 'date-fns/sub'
import add from 'date-fns/add'

import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3000';

export default {
    name: 'MoodBoard',
    data() {
        return {
            message: '',
            current_date_format: format(new Date(), 'MMMM', {locale: fr}),
            current_date: null,
            selected_day: null,
            methode: 'POST',
            btnText: 'Enregistrer',
            totalDays: getDaysInMonth(new Date()),
            days: [],
            currentday: getDate(new Date()),
            newMood: {
                mood: '#fbe38b',
                date: new Date().toISOString(),
            },
            displayForm: true,
            colorMap: {
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
        };
    },
    created() {
    },
    mounted() {
        this.$store.dispatch('setError','');
        this.$store.dispatch('loadMoods', 'month');
    },
    methods: {
        add() {},
        sub() {},
        onSubmit(e) {
            this.$store.dispatch('setError','');
            this.message = '';
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
                if (this.methode === 'POST')
                    this.addMood();
                if (this.methode === 'PATCH') {
                    this.updateMood(this.newMood);
                }
                
            }
        },
        setMood(index, e) {
            this.message = '';
            this.$store.dispatch('setError','');
            this.displayForm = false;
            // Cas non cliqué init au loading
            // Add selected class
            const listItems = document.querySelectorAll('.container .day');
            for(var i = 0; i < listItems.length; i++){
                // Remove selected class
                if (listItems[i].classList.contains('selected')) {
                    listItems[i].classList.remove('selected');
                } 
                else {
                    // Add class selected
                    listItems[i].addEventListener('click', function(event) {
                        this.classList.add('selected');
                    });
                }
            }
            // Map date index with moodList array if id exist -> update
            if (this.moodList[index - 1].id) {
                this.displayForm = true;
                this.message = 'Mise à jour du mood du : ' + this.moodList[index - 1].day + ' ' + this.current_date_format;
                this.newMood = this.moodList[index - 1]
                this.methode = "PATCH"
                this.btnText = "Enregistrer"
            }
            // Set empty mood, current day
            else if (index == this.currentday && !this.moodList[index - 1].id) {
                this.displayForm = true;
                this.methode = "POST"
                this.btnText = "Sauvegarder"
                this.newMood = {
                        mood: this.getSliderVal(),
                        date: new Date().toISOString(),
                    }
            }

        },
        setSliderVal(e) {
            const selected = document.querySelector(`.day.selected`) ? document.querySelector(`.day.selected`) : document.querySelector(`.today.day-${this.currentday}`);
            selected.style.background = this.colorMap[e.target.value];
            this.newMood.mood = this.colorMap[e.target.value];
        },
        getSliderVal() {
            const value = document.querySelector('#mood_slider').value;
            return value
        },
        async updateMood(payload) {
            try {
                const message = await axios.patch(`/mood/${payload.id}`, payload);

                if (!message) {
                    this.$store.dispatch('setError', 'Impossible de mettre à jour le mood');
                }

                this.message = 'Mood mise à jour';
                this.$store.dispatch('loadMoods');
                //clean 
                this.newMood = {};

            } catch (error) {
                this.$store.dispatch('setError', error);
            }
        },
        async addMood() {
            try {
                const message = await axios.post(`/mood`, this.newMood);

                if (!message) {
                    this.$store.dispatch('setError', 'Impossible de créer le mood');
                }

                this.message = 'Mood crée';
                this.$store.dispatch('loadMoods');
                //clean 
                this.newMood = {};

            } catch (error) {
                this.$store.dispatch('setError', error);
            }
        },
        deleteMood(moodId) {
            this.$store.dispatch('setError','');
            this.$store.dispatch('removeMood', moodId);
            //clean 
            this.newMood = {};
            this.message = 'Mood supprimé avec succès.';
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

.moodboard .day.selected {
    border: 2px solid salmon;
}

</style>
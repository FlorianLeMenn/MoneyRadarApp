<template>
    <form 
        @submit="onSubmit"
        method="POST"
        action="http://localhost:3000/finance"
    >
        <div class="flex flex-col max-w-sm mx-auto rounded-lg border border-gray-dark bg-gray antialiased shadow-lg mb-2">
            <div class="flex flex-row justify-between p-6 bg-gray-dark border-b border-gray-dark rounded-tl-lg rounded-tr-lg">
                <p class="font-semibold text-white">Nouvelle dépense</p>
            </div>
            <div class="flex flex-col px-6 py-5 bg-gray-50">
                <p class="mb-2 font-semibold text-gray1">Intitulé</p>
                <input 
                    v-model="newExpense.title" 
                    type="text" 
                    name="title" 
                    placeholder="Nommer la dépense..."
                    class="p-2 mb-5 bg-gray-dark rounded shadow-sm" id="" 
                />
                <p class="mb-2 font-semibold text-gray1">Prix</p>
                <input 
                    v-model="newExpense.cost" 
                    type="text"
                    name="cost"
                    placeholder="Prix la dépense..."
                    class="p-2 mb-5 bg-gray-dark rounded shadow-sm"
                    id="" 
                />
                <div class="flex flex-col sm:flex-row items-center mb-5 sm:space-x-5">
                    <div class="w-full">
                        <p class="mb-2 font-semibold text-gray1">Catégorie</p>
                        <select v-model="newExpense.taxonomies" name="categoriesList" class="w-full p-2 bg-gray-dark rounded shadow-sm appearance-none" id="">
                            <!-- <option v-for="category in categories" v-bind:value="category.value" :key="category.value">
                                {{ category.text }}
                            </option> -->
                            <optgroup v-for=" parentCategory in categoriesList" :label="parentCategory.name" :key="parentCategory.id">
                                <option v-for="option in parentCategory.children" :value="option.id" :key="option.id">
                                    {{ option.name }}
                                </option>
                            </optgroup>
                        </select>
                    </div>               
                </div>

                <div class="form-check mb-5">
                    <input 
                        v-model="newExpense.recurrent" 
                        name="recurrent"
                        class="form-check-input 
                        h-4
                        w-4
                        bg-gray-light 
                        rounded-sm 
                        checked:bg-gray-d
                        checked:border-gray-dark 
                        focus:outline-none transition 
                        duration-200 mt-1 
                        align-top 
                        bg-no-repeat 
                        bg-center 
                        bg-contain 
                        float-left 
                        mr-2 
                        cursor-pointer"
                        type="checkbox" 
                        value="" 
                        id="checkRecurrent"
                    >
                    <label class="form-check-label inline-block text-gray1" for="checkRecurrent">
                        Dépense récurrente
                    </label>
                </div>



                <!-- START period -->
                <div id="recurrentFieldsContainer" class="hidden flex sm:flex-row items-baseline mb-5 sm:space-x-5">
                    <div class="w-1/3">
                    <!-- START interval -->
                        <p class="mb-2 font-semibold text-gray1">Interval</p>
                        <input 
                            v-model="newExpense.interval" 
                            type="number"
                            name="interval"
                            class="w-full p-2 mb-5 bg-gray-dark rounded shadow-sm"
                            id="" 
                        />
                        </div>
                    <!-- END interval -->
                    <div class="w-2/3">
                         <p class="mb-2 font-semibold text-gray1">Période</p>
                        <select v-model="newExpense.periodicity" class="w-full p-2 bg-gray-dark rounded shadow-sm appearance-none" >
                            <option value="0" selected>Jour</option>
                            <option value="1">Semaine</option>
                            <option value="2">Mois</option>
                            <option value="3">Année</option>
                        </select>
                    </div>
                </div>
                <!-- END period -->

                <!-- START date picker -->
                <div class="antialiased sans-serif">
                    <div>
                        <div class="container mx-auto">
                            <div class="mb-5 w-64">
                                <label for="datepicker" class="font-bold mb-1 text-gray1 block">Date</label>
                                <div class="relative">
                                    
                                    <input type="text" readonly v-model="datepickerValue"
                                        @click="showDatepicker = !showDatepicker" @keydown.escape="showDatepicker = false"
                                        class="
                                            w-full
                                            pl-4
                                            pr-10
                                            py-3
                                            leading-none
                                            rounded
                                            shadow-sm
                                            focus:outline-none focus:shadow-outline
                                            text-gray-600
                                            bg-gray-dark
                                            font-medium
                                            " placeholder="Selectionnez la date" />
                                    <div class="absolute top-0 right-0 px-3 py-2">
                                        <svg class="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24"
                                            stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    </div>

                                    <!-- <div x-text="no_of_days.length"></div>
                                    <div x-text="32 - new Date(year, month, 32).getDate()"></div>
                                    <div x-text="new Date(year, month).getDay()"></div> -->

                                    <div class="
                                        bg-white
                                        mt-12
                                        rounded-lg
                                        shadow
                                        p-4
                                        absolute
                                        top-0
                                        left-0
                                        " style="width: 17rem" 
                                        v-show="showDatepicker" 
                                        ref="target"
                                        >
                                        <div class="text-gray-dark flex justify-between items-center mb-2">
                                            <div>
                                                <span v-text="MONTH_NAMES[month]"
                                                    class="text-lg font-bold text-gray-800"></span>
                                                <span v-text="year" class="ml-1 text-lg text-gray-600 font-normal"></span>
                                            </div>
                                            <div>
                                                <button type="button" class="
                                                    text-gray-dark
                                                    transition
                                                    ease-in-out
                                                    duration-100
                                                    inline-flex
                                                    cursor-pointer
                                                    hover:bg-gray-200
                                                    p-1
                                                    rounded-full
                                                    " :class="{'cursor-not-allowed opacity-25': month == 0 }"
                                                                    :disabled="month == 0 ? true : false" @click="month--; getNoOfDays()">
                                                                    <svg class="h-6 w-6 text-gray-500 inline-flex" fill="none"
                                                                        viewBox="0 0 24 24" stroke="currentColor">
                                                                        <path stroke-linecap="round" stroke-linejoin="round"
                                                                            stroke-width="2" d="M15 19l-7-7 7-7" />
                                                                    </svg>
                                                </button>
                                                <button type="button" class="
                                                    text-gray-dark
                                                    transition
                                                    ease-in-out
                                                    duration-100
                                                    inline-flex
                                                    cursor-pointer
                                                    hover:bg-gray-200
                                                    p-1
                                                    rounded-full
                                                    " :class="{'cursor-not-allowed opacity-25': month == 11 }"
                                                    :disabled="month == 11 ? true : false" @click="month++; getNoOfDays()">
                                                    <svg class="h-6 w-6 text-gray inline-flex" fill="none"
                                                        viewBox="0 0 24 24" stroke="currentColor">
                                                        <path stroke-linecap="round" stroke-linejoin="round"
                                                            stroke-width="2" d="M9 5l7 7-7 7" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                        <div class="flex flex-wrap mb-3 -mx-1">
                                            <template v-for="(day, index) in DAYS" :key="index">
                                                <div style="width: 14.26%" class="px-1">
                                                    <div v-text="day" class="text-gray-dark font-medium text-center text-xs">
                                                    </div>
                                                </div>
                                            </template>
                                        </div>

                                        <div class="flex flex-wrap -mx-1">
                                            <template v-for="(blankday, index) in blankdays" :key="index">
                                                <div style="width: 14.28%" class="
                                                    text-center
                                                    border
                                                    p-1
                                                    border-transparent
                                                    text-sm">
                                                </div>
                                            </template>
                                            <template v-for="(date, dateIndex) in no_of_days" :key="dateIndex">
                                                <div style="width: 14.28%" class="px-1 mb-1">
                                                    <div @click="getDateValue(date)" v-text="date" class="
                                                        text-gray-dark
                                                        cursor-pointer
                                                        text-center text-sm
                                                        leading-none
                                                        rounded-full
                                                        leading-loose
                                                        transition
                                                        ease-in-out
                                                        duration-100
                                                        " :class="{'bg-blue text-white': isToday(date) == true, 'text-gray hover:bg-blue-200': isToday(date) == false }">
                                                    </div>
                                                </div>
                                            </template>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- END date picker -->
                <div class="flex flex-row items-center justify-between py-2">
                    <button @click="cancelForm" type="button" class="cancelBtn px-4 py-2 text-white font-semibold bg-red text-white text-sm uppercase rounded">
                        Annuler
                    </button>
                    <button type="submit" class="px-4 py-2 text-white font-semibold bg-blue text-white text-sm uppercase rounded">
                        Enregistrer
                    </button>
                </div>
            </div>
        </div>
    </form>
</template>

<script>
import {addWeeks, addMonths, parseISO, lastDayOfYear,differenceInMonths, differenceInWeeks} from 'date-fns';
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3000';

    const MONTH_NAMES = [
        "Janvier",
        "Février",
        "Mars",
        "Avril",
        "Mai",
        "Juin",
        "Juillet",
        "Aout",
        "Septembre",
        "Octobre",
        "Novembre",
        "Décembre",
    ];

    const DAYS = ["Dim","Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];

export default {
  name: 'addExpenseForm',
  props: ['showForm'],
      data() {
        return {
            showDatepicker: false,
            datepickerValue: "",
            month: "",
            year: "",
            no_of_days: [],
            blankdays: [],
            DAYS: DAYS,
            MONTH_NAMES: MONTH_NAMES,
            message:'',
            error: '',
            categoriesList: undefined,
            newExpense: {
                title: undefined,
                cost: 0,
                recurrent: false,
                interval: 0,
                periodicity: 0,
                date: new Date().toISOString(),
                taxonomies: undefined,
            }
        };
    },
    created() {    
    },
    mounted() {
        this.initDate();
        this.getNoOfDays();
        this.initCategories();
    },
    methods: {
        cancelForm() {
             this.$emit('cancelForm');
        },
        onSubmit(e) {
            e.preventDefault() // don't perform submit action (i.e., `<form>.action`)
            if(this.newExpense.title === undefined) {
                this.$store.dispatch('setError', 'Le titre n\'est pas renseignée.');
                return;
            }
            else if(this.newExpense.date === undefined) {
                this.$store.dispatch('setError', 'La date n\'est pas renseignée.');
                return;
            }
            else if(this.newExpense.taxonomies === undefined) {
                this.$store.dispatch('setError', 'La catégorie n\'est pas renseignée.');
                return;
            }
            else if (this.newExpense.recurrent) {
                this.addRecurrentExpense();
            }
            else {
                this.addExpense();
            }
        },
        async addRecurrentExpense() {
            try {
                //si l'option dépense régulière est cochée
                if(this.newExpense.recurrent && this.newExpense.interval > 0) {
                    //How many times the expense 
                    let total, duration = 0
                    const interval      = this.newExpense.interval;
                    const periode       = +this.newExpense.periodicity;
                    const selectedDate  = this.newExpense.date !== undefined ? this.newExpense.date : new Date().toISOString();
                    const lastDay       = lastDayOfYear(parseISO(selectedDate));
                    //ajouter une nouvelle dépense en date glissante en fontion de la période et de la date renseignée
                    //ex: un abonnement mensuel le 15 du mois
                    switch (periode) {
                        case 0:
                            //jour glissant
                            break;
                        case 1:
                            //semaine glissante pendant 1 an
                            duration     = differenceInWeeks(lastDay, parseISO(selectedDate));
                            total        = Math.round(duration/interval); 
                            let nextweek = addWeeks(parseISO(selectedDate), interval);

                            for (let i = 0; i < total; i++) {
                                nextweek = addWeeks(nextweek, interval);
                                this.newExpense.date = nextweek.toISOString();
                                const message = await axios.post(`/finance`, this.newExpense);
                                if (!message) {
                                    this.$store.dispatch('setError', 'Impossible de créer la dépense');
                                }
                            }  
                            break;
                        case 2:
                            //mois glissant
                            duration      = differenceInMonths(lastDay, parseISO(selectedDate));
                            total         = Math.round(duration/interval)
                            let nextmonth = addMonths(parseISO(selectedDate), interval);
                            
                            for (let i = 0; i < total; i++) {
                                nextmonth = addMonths(nextmonth, interval);
                                this.newExpense.date = nextmonth.toISOString();
                                const message = await axios.post(`/finance`, this.newExpense);
                                if (!message) {
                                    this.$store.dispatch('setError', 'Impossible de créer la dépense');
                                }
                            }
                            break;
                        case 3:
                            //année glissant
                            break;
                        default:
                            break;
                    }
                }
                this.message = 'Dépense crée';

            } catch (error) {
                this.$store.dispatch('setError', error);
            }
        },

        async addExpense() {
            try {
                const message = await axios.post(`/finance`, this.newExpense);
                if (!message) {
                    this.$store.dispatch('setError', 'Impossible de créer la dépense');
                }
                this.message = 'Dépense crée';
                this.$store.dispatch('loadExpenses');
                this.$store.dispatch('loadAllExpenses');
                this.$store.dispatch('loadExpensesTotal');
                
            } catch (error) {
                this.$store.dispatch('setError', error);
            }
        },
        async initCategories() {
            try {
                const {data} = await axios.get(`/vocabulary/1`);
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
                const {data} = await axios.get(`/taxonomy/`, this.newExpense.taxonomies);
                if (data.taxonomies) {
                    this.message = 'Impossible de trouver la catégorie';
                }

            } catch (error) {
                this.$store.dispatch('setError', error);
            }
        },

        initDate() {
            let today     = new Date();
            this.month    = today.getMonth();
            this.year     = today.getFullYear();
            this.datepickerValue = new Date().toDateString(); 
        },

        getNoOfDays() {
            let daysInMonth = new Date(
                this.year,
                this.month + 1,
                0
            ).getDate();

            // find where to start calendar day of week
            let dayOfWeek = new Date(this.year, this.month).getDay();
            let blankdaysArray = [];
            for (var i = 1; i <= dayOfWeek; i++) {
                blankdaysArray.push(i);
            }

            let daysArray = [];
            for (var i = 1; i <= daysInMonth; i++) {
                daysArray.push(i);
            }

            this.blankdays = blankdaysArray;
            this.no_of_days = daysArray;
        },

        isToday(date) {
            const today = new Date();
            const d = new Date(this.year, this.month, date);

            return today.toDateString() === d.toDateString() ? true : false;
        },

        getDateValue(date) {
            let selectedDate = new Date(this.year, this.month, date);
            this.datepickerValue = selectedDate.toDateString();
            this.newExpense.date = selectedDate.toISOString();

            this.$refs.date.value =
                selectedDate.getFullYear() +
                "-" +
                ("0" + selectedDate.getMonth()).slice(-2) +
                "-" +
                ("0" + selectedDate.getDate()).slice(-2);
            this.showDatepicker = false;
        },
        }
}
</script>
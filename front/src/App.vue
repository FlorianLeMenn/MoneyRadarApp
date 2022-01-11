<template>

    <h1 class="mb-6 text-3xl max-w-sm mx-auto font-bold text-white text-center">
        Dépenses
    </h1>
    <div class="p-6 max-w-sm mx-auto bg-gray rounded-xl shadow-lg flex flex-col ">
        <div class="justify-center items-center text-center">
            <div class="mb-2 text-base">Total dépenses</div>
            <p class="text-gray-500 text-2xl">15000€</p>
        </div>
            <depensesChart/>
    </div>
    <div class="m-2 max-w-sm mx-auto flex text-center">
        <a href="#" class="addNewBtn p-4 grow max-w rounded-xl bg-blue text-white text-sm uppercase">Ajouter une
            dépense</a>
    </div>
    <div class="addNewForm flex flex-col max-w-sm mx-auto rounded-lg border border-gray-dark bg-gray antialiased shadow-lg hidden mb-2">
        <div class="flex flex-row justify-between p-6 bg-gray-dark border-b border-gray-dark rounded-tl-lg rounded-tr-lg">
            <p class="font-semibold text-white">Nouvelle dépense</p>
        </div>
        <div class="flex flex-col px-6 py-5 bg-gray-50">
            <p class="mb-2 font-semibold text-gray1">Intitulé</p>
            <input type="text" name="" placeholder="Nommer la dépense..."
                class="p-2 mb-5 bg-gray-dark rounded shadow-sm" id="" />
            <p class="mb-2 font-semibold text-gray1">Prix</p>
            <input type="text" name="" placeholder="Prix la dépense..." class="p-2 mb-5 bg-gray-dark rounded shadow-sm"
                id="" />
            <div class="flex flex-col sm:flex-row items-center mb-5 sm:space-x-5">
                <div class="w-full">
                    <p class="mb-2 font-semibold text-gray1">Catégorie</p>
                    <select type="text" name="" class="w-full p-2 bg-gray-dark rounded shadow-sm appearance-none" id="">
                        <option value="0">Add service</option>
                    </select>
                </div>               
            </div>

            <div class="form-check mb-5">
                <input 
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
                    id="flexCheckDefault"
                >
                <label class="form-check-label inline-block text-gray1" for="flexCheckDefault">
                    Dépense récurrente
                </label>
            </div>
            <!-- START date picker -->
            <div class="antialiased sans-serif">
                <div>
                    <div class="container mx-auto">
                        <div class="mb-5 w-64">
                            <label for="datepicker" class="font-bold mb-1 text-gray1 block">Date</label>
                            <div class="relative">
                                <input type="hidden" name="date" x-ref="date" />
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
                                        " placeholder="Select date" />
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
                <button class="px-4 py-2 text-white font-semibold bg-red text-white text-sm uppercase rounded">
                    Annuler
                </button>
                <button class="px-4 py-2 text-white font-semibold bg-blue text-white text-sm uppercase rounded">
                    Enregistrer
                </button>
            </div>
        </div>
    </div>
    <div class="list weekList flex flex-col p-6 max-w-sm mx-auto bg-gray rounded-xl shadow-lg">
        <div class="mb-4 flex items-center gap-4 flex-row">
            <div class="">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                    <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
                </svg>
            </div>
            <div class="">
                <div class="title font-bold">Carrefour Chartres</div>
                <div class="date text-sm text text-left text-gray1">23/05/2021 - 12h25</div>
            </div>
            <div class="ml-auto font-bold text-right">-135€</div>
        </div>
        <div class="mb-4 flex items-center gap-4 flex-row">
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd"
                        d="M6 3a1 1 0 011-1h.01a1 1 0 010 2H7a1 1 0 01-1-1zm2 3a1 1 0 00-2 0v1a2 2 0 00-2 2v1a2 2 0 00-2 2v.683a3.7 3.7 0 011.055.485 1.704 1.704 0 001.89 0 3.704 3.704 0 014.11 0 1.704 1.704 0 001.89 0 3.704 3.704 0 014.11 0 1.704 1.704 0 001.89 0A3.7 3.7 0 0118 12.683V12a2 2 0 00-2-2V9a2 2 0 00-2-2V6a1 1 0 10-2 0v1h-1V6a1 1 0 10-2 0v1H8V6zm10 8.868a3.704 3.704 0 01-4.055-.036 1.704 1.704 0 00-1.89 0 3.704 3.704 0 01-4.11 0 1.704 1.704 0 00-1.89 0A3.704 3.704 0 012 14.868V17a1 1 0 001 1h14a1 1 0 001-1v-2.132zM9 3a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1zm3 0a1 1 0 011-1h.01a1 1 0 110 2H13a1 1 0 01-1-1z"
                        clip-rule="evenodd" />
                </svg>
            </div>
            <div>
                <div class="title font-bold">Carrefour Chartres</div>
                <div class="date text-sm text text-left text-gray1">23/05/2021 - 12h25</div>
            </div>
            <div class="ml-auto font-bold text-right">-135€</div>
        </div>
        <div class="mx-auto max-w-sm">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
        </div>
    </div>
    <div class="list monthList flex flex-wrap gap-4 flex-row justify-center p-4 max-w-sm mx-auto bg-gray rounded-xl shadow-lg hidden">
        <div class="hover:bg-gray-light border border-gray-dark rounded-lg shadow-lg p-6 text-center">
            <div class="icon flex justify-center mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                    <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
                </svg>
            </div>
            <div class="title font-bold">catégorie 1</div>
            <div class="total">15000€</div>
        </div>
        <div class="hover:bg-gray-light border border-gray-dark rounded-lg shadow-lg p-6 text-center hover:bg-gray">
            <div class="icon flex justify-center mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                    <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
                </svg>
            </div>
            <div class="title font-bold">catégorie 2</div>
            <div class="total">15000€</div>
        </div>
        <div class="hover:bg-gray-light border border-gray-dark rounded-lg shadow-lg p-6 text-center">
            <div class="icon flex justify-center mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                    <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
                </svg>
            </div>
            <div class="title font-bold">catégorie 3</div>
            <div class="total">15000€</div>
        </div>
        <div class="hover:bg-gray-light border border-gray-dark rounded-lg shadow-lg p-6 text-center">
            <div class="icon flex justify-center mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                    <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
                </svg>
            </div>
            <div class="title font-bold">catégorie 4</div>
            <div class="total">15000€</div>
        </div>                 
    </div>
    <div class="list yearList flex flex-col p-6 max-w-sm mx-auto bg-gray rounded-xl shadow-lg hidden">
        <div class="mb-4 flex items-center gap-4 flex-row">
            <div class="">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                    <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
                </svg>
            </div>
            <div class="">
                <div class="title font-bold">Logement</div>
                <div class="date text-sm text text-left text-gray1">45% - 15 transactions</div>
            </div>
            <div class="ml-auto font-bold text-right">4500€</div>
            <div class=" text-sm text-gray1">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
            </div>
        </div>
        <div class="mb-4 flex items-center gap-4 flex-row">
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd"
                        d="M6 3a1 1 0 011-1h.01a1 1 0 010 2H7a1 1 0 01-1-1zm2 3a1 1 0 00-2 0v1a2 2 0 00-2 2v1a2 2 0 00-2 2v.683a3.7 3.7 0 011.055.485 1.704 1.704 0 001.89 0 3.704 3.704 0 014.11 0 1.704 1.704 0 001.89 0 3.704 3.704 0 014.11 0 1.704 1.704 0 001.89 0A3.7 3.7 0 0118 12.683V12a2 2 0 00-2-2V9a2 2 0 00-2-2V6a1 1 0 10-2 0v1h-1V6a1 1 0 10-2 0v1H8V6zm10 8.868a3.704 3.704 0 01-4.055-.036 1.704 1.704 0 00-1.89 0 3.704 3.704 0 01-4.11 0 1.704 1.704 0 00-1.89 0A3.704 3.704 0 012 14.868V17a1 1 0 001 1h14a1 1 0 001-1v-2.132zM9 3a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1zm3 0a1 1 0 011-1h.01a1 1 0 110 2H13a1 1 0 01-1-1z"
                        clip-rule="evenodd" />
                </svg>
            </div>
            <div>
                <div class="title font-bold">Alimentation</div>
                <div class="date text-sm text text-left text-gray1">70% - 500 transactions</div>
            </div>
            <div class="ml-auto font-bold text-right">5000€</div>
            <div class=" text-sm text-gray1">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
            </div>
        </div>
        <div class="mb-4 flex items-center gap-4 flex-row">
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd"
                        d="M6 3a1 1 0 011-1h.01a1 1 0 010 2H7a1 1 0 01-1-1zm2 3a1 1 0 00-2 0v1a2 2 0 00-2 2v1a2 2 0 00-2 2v.683a3.7 3.7 0 011.055.485 1.704 1.704 0 001.89 0 3.704 3.704 0 014.11 0 1.704 1.704 0 001.89 0 3.704 3.704 0 014.11 0 1.704 1.704 0 001.89 0A3.7 3.7 0 0118 12.683V12a2 2 0 00-2-2V9a2 2 0 00-2-2V6a1 1 0 10-2 0v1h-1V6a1 1 0 10-2 0v1H8V6zm10 8.868a3.704 3.704 0 01-4.055-.036 1.704 1.704 0 00-1.89 0 3.704 3.704 0 01-4.11 0 1.704 1.704 0 00-1.89 0A3.704 3.704 0 012 14.868V17a1 1 0 001 1h14a1 1 0 001-1v-2.132zM9 3a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1zm3 0a1 1 0 011-1h.01a1 1 0 110 2H13a1 1 0 01-1-1z"
                        clip-rule="evenodd" />
                </svg>
            </div>
            <div>
                <div class="title font-bold">Loisirs & sortie</div>
                <div class="date text-sm text text-left text-gray1">18% - 42 transactions</div>
            </div>
            <div class="ml-auto font-bold text-right">1200€</div>
            <div class=" text-sm text-gray1">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
            </div>
        </div>
    </div>
    <div class="mt-4 py-2 mx-auto max-w-sm flex flex-row items-center justify-around bg-gray">
        <div class="menu-item hover:bg-gray-dark">
            <a href="" class="menu-link p-4 block">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
            </a>
        </div>
        <div class="menu-item hover:bg-gray-dark">
            <a href="" class="menu-link p-4 block">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
            </svg>
        </a></div>
        <div class="menu-item hover:bg-gray-dark -mt-4 selected rounded-xl">
            <a href="" class="menu-link p-4 block">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.121 15.536c-1.171 1.952-3.07 1.952-4.242 0-1.172-1.953-1.172-5.119 0-7.072 1.171-1.952 3.07-1.952 4.242 0M8 10.5h4m-4 3h4m9-1.5a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </a>
        </div>
        <div class="menu-item ">
            <a href="" class="menu-link">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
            </a>
        </div>         
    </div>
</template>

<script>
    import depensesChart from './components/depensesChart.vue'
    import main from './assets/js/main.js';
    import { ref } from 'vue';
  //import { onClickOutside } from '@vueuse/core';

    const MONTH_NAMES = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    const DAYS = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

    export default {
    components: {
        depensesChart
    },
    setup() {
    //   const target = ref(null)
    //   onClickOutside(target, (event) => { console.log(target)})
    //   return { target }
    },
    data() {
      return {
            showDatepicker: false,
            datepickerValue: "",
            month: "",
            year: "",
            no_of_days: [],
            blankdays: [],
            days: ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"],
            DAYS: DAYS,
            MONTH_NAMES: MONTH_NAMES,
      };
    },
    beforeCreate() {
        // let chartScript = document.createElement('script');
        // chartScript.setAttribute('src', 'https://cdn.jsdelivr.net/npm/chart.js');
        // document.head.appendChild(chartScript);
        console.log('BEFORE')
    },
    created() {
        console.log('CREATED');
    },
    mounted() {
        console.log('MOUNTED');
            this.initDate();
            this.getNoOfDays();
            //l'app est load
            main.init();
            this.$nextTick( function() {
          }
        );
    },
    watch: {

    },
    methods: {
      initDate() {
          let today     = new Date();
          this.month    = today.getMonth();
          this.year     = today.getFullYear();
          this.datepickerValue = new Date(
              this.year,
              this.month,
              today.getDate()
          ).toDateString();
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

          this.$refs.date.value =
              selectedDate.getFullYear() +
              "-" +
              ("0" + selectedDate.getMonth()).slice(-2) +
              "-" +
              ("0" + selectedDate.getDate()).slice(-2);

          console.log(this.$refs.date.value);

          this.showDatepicker = false;
      },
    }
  }
</script>

<style>
#app {

}
</style>
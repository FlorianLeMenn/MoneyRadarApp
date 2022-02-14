
<template >
    <div class="expense-list-container">
        <div class="list weekList flex flex-col p-6 max-w-sm mx-auto bg-gray rounded-xl shadow-lg">
            <div class="mb-4 flex items-center gap-4 flex-row">
                    <div class="title font-bold">Dépenses de la semaine :</div>
                    <div class="ml-auto font-bold text-right">-{{ getTotal }}€</div>
            </div>
            <hr class="text-gray1 mb-4">
            {{this.$store.state.error}}
            <div v-for="expense in expensesList" :value="expense.id" :key="expense.id" class="mb-4 flex items-center gap-4 flex-row">
                <div class="">
                    <!-- Cat: {{ expense.taxonomies[0].id }} -->
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                        <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
                    </svg>
                </div>
                <div class="">
                    <div class="title font-bold">{{ expense.title }}</div>
                    <div class="date text-sm text text-left text-gray1">{{ expense.date }}</div>
                </div>
                <div class="ml-auto font-bold text-right">-{{ expense.cost }}€</div>
                <div class="ml-auto font-bold text-right">
                    <button v-if="expense.id" @click="this.$store.dispatch('removeExpense', expense.id)">Supprimer</button>
                </div>
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
    </div>
</template>

<script>
import { format } from 'date-fns'
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3000';

export default {
    name: 'expenseList',
    props: ['expensesList'],
    data() {
    return {
        message: '',
        error: '',
    };
    },
    computed: {
        getTotal() {
            let total   = 0;
            const data  = this.$props.expensesList;
            if(data) {
                for (const key in data) {
                    if (Object.hasOwnProperty.call(data, key)) {
                        total += +data[key].cost;
                    }
                }  
            }
            return total;
        },
    }
}
</script>
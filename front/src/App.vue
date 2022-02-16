<template>

    <h1 class="mb-6 text-3xl max-w-sm mx-auto font-bold text-white text-center">
        Dépenses
    </h1>
    <div class="p-6 max-w-sm mx-auto bg-gray rounded-xl shadow-lg flex flex-col ">
        <div class="justify-center items-center text-center">
            <div class="mb-2 text-base">Total dépenses</div>
            <p class="text-gray-500 text-2xl">{{ total }}</p>
        </div>
            <expensesChart :groupedExpenses="groupedExpenses" />
    </div>
    <div class="m-2 max-w-sm mx-auto flex text-center">
        <a href="#" class="addNewBtn p-4 grow max-w rounded-xl bg-blue text-white text-sm uppercase">Ajouter une
            dépense</a>
    </div>

    <add-expense-form></add-expense-form> 

    <expense-list :expensesList="expensesList" ></expense-list>
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
    import expensesChart from './components/expensesChart.vue'
    import addExpenseForm from './components/addExpenseForm.vue'
    import expenseList from './components/expenseList.vue';
    import main from './assets/js/main.js';

    export default {
    components: {
        expensesChart,
        addExpenseForm,
        expenseList
    },
    beforeCreate() {
                this.$store.dispatch('loadExpenses');
    },
    mounted() {
        //l'app est load
        main.init();
        this.$store.dispatch('loadAllExpenses');
        this.$store.dispatch('loadExpensesTotal');
    },
    
    //prorietes calculées
    computed: {
        groupedExpenses() {
            return this.$store.state.groupedExpenses; 
        },
        expensesList() {
            return this.$store.state.expensesList;
        },
        total() {
            return this.$store.state.total;
        },
        removedExpenseId() {
            return this.$store.state.removedExpense;
        },
        error() {
            return this.$store.state.error;
        },
    },
    watch: {},
    methods: {}
}
</script>

<style>
#app {

}
</style>
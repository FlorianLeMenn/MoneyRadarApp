<template>
    <h1 class="mb-6 text-3xl max-w-sm mx-auto font-bold text-white text-center">
        Dépenses
    </h1>
    <div class="p-6 max-w-sm mx-auto bg-gray rounded-xl shadow-lg flex flex-col ">
        <div class="justify-center items-center text-center">
            <div class="mb-2 text-base">Total dépenses</div>
            <p class="text-gray-500 text-2xl">{{ total }}</p>
        </div>
        <div v-if="groupedExpenses && groupedExpenses.length">
            <expensesChart :groupedExpenses="groupedExpenses" />
        </div>
    </div>
    <div class="m-2 max-w-sm mx-auto flex text-center">
        <a href="#" class="addNewBtn p-4 grow max-w rounded-xl bg-blue text-white text-sm uppercase">Ajouter une
            dépense</a>
    </div>

    <add-expense-form></add-expense-form> 

    <expense-list :expensesList="expensesList" ></expense-list>
</template>

<script>
import expensesChart from '../components/expensesChart.vue'
import addExpenseForm from '../components/addExpenseForm.vue'
import expenseList from '../components/expenseList.vue';
import main from '../assets/js/main.js';

export default {
    name: 'Finance',
    components: {
        expensesChart,
        addExpenseForm,
        expenseList,
    },
    mounted() {
        //l'app est load
        main.init();
        this.$store.dispatch('loadExpenses');
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
}
</script>
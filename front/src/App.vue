<template>
    <router-view />
    <menu-tap-bar></menu-tap-bar>
</template>

<script>
    import expensesChart from './components/expensesChart.vue'
    import addExpenseForm from './components/addExpenseForm.vue'
    import expenseList from './components/expenseList.vue';
    import menuTapBar from './views/Menu.vue';

    export default {
    components: {
        menuTapBar,
        expensesChart,
        //addExpenseForm,
        expenseList,
    },
    watch: {},
    methods: {}
}
</script>
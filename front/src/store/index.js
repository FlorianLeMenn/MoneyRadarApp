import { createStore } from 'vuex'
import { format } from 'date-fns'
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3000';

export default createStore( {
    state: {
        expensesList: [],
        groupedExpenses: [],
        total: 0,
        error: '',
    },
    mutations: {
        loadExpenses(state, groupedExpenses) {
            state.groupedExpenses = groupedExpenses;
        },
        loadAllExpenses(state, expensesList) {
            state.expensesList = expensesList;
        },
        removeExpense(state, expenseId) {
            const updateExpensesList = state.expensesList.filter(el => expenseId != el.id);
            state.expensesList = updateExpensesList;
        },
        loadExpensesTotal(state, total) {
            state.total = total;
        },
        updateError(state, error) {
            state.error = error;
        }
    },
    actions: {
        //load finances infos
        //appeler l'action par la methode dispatch
        //appeler la mutation par la methode commit
        async loadAllExpenses({ commit }) {
            try {
                const financeList = await axios.get(`/finance`);
                if (!financeList.data) {
                    commit('updateError','Impossible de récupérer les dépenses');
                }
                if (!financeList.data.length) {
                    commit('updateError','Aucune dépenses');
                }
                else {
                    //const formatedList = financeList.data.filter(el => el.date = format(new Date(el.date), 'dd/MM/yyyy - HH:mm'));
                    commit('loadAllExpenses', financeList.data);
                }
            } catch (error) {
                commit('updateError', error);
            }
        },
        async loadExpenses({ commit }, period = 'week') {
            try {
                const financeList = await axios.get(`/finance/${period}`);
                if (!financeList.data) {
                    commit('updateError','Impossible de récupérer les dépenses');
                }
                if (!financeList.data.length) {
                    commit('updateError','Aucune dépenses');
                }
                else {
                    commit('loadExpenses', financeList.data);
                    console.log('loadExpenses');
                    console.log(financeList.data);
                }
            } catch (error) {
                commit('updateError', error);
            }
        },
        async removeExpense({ commit }, expenseId) {
            try {
                if(!expenseId) commit('updateError', 'expenseId vide');
                const removedItem = await axios.delete(`/finance/${expenseId}`);
                if (!removedItem) {
                    commit('updateError', 'Impossible de supprimer la dépense: ' + expenseId);
                }
                commit('removeExpense', expenseId);

            } catch (error) {
                commit('updateError', error);
            }
            
        },
        async loadExpensesTotal({ commit }, period = 'week') {
            try {
                const financeList = await axios.get(`/finance/${period}`);
                if (!financeList) {
                    commit('updateError', 'Impossible de trouver le total pour la periode: ' + period);
                }
                const total = financeList.data.map(el => +el.total).reduce((prev, next) => prev + next);
                commit('loadExpensesTotal', total);

            } catch (error) {
                commit('updateError', error);
            }
        },
        setError({ commit }, error) {
            commit('updateError', error);
        }
    },

});
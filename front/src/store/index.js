import { createStore } from 'vuex'
import {startOfWeek, lastDayOfWeek, eachDayOfInterval, format, parseISO, getDaysInMonth, getDate} from 'date-fns';
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3000';

export default createStore( {
    state: {
        expensesList: [],
        todoList: [],
        allTasksList: [],
        tasksList: [],
        moodList: [],
        groupedExpenses: [],
        total: 0,
        error: '',
    },
    mutations: {
        // EXPENSES BOARD
        loadExpenses(state, groupedExpenses) {
            //default week star monday
            const startedDate = startOfWeek(new Date(), { weekStartsOn: 1 });
            const endDate     = lastDayOfWeek(new Date(), { weekStartsOn: 1 });
            //week interval
            const result = eachDayOfInterval({
                start: startedDate,
                end: endDate
            })
            //Format ISO day of week 
            const allDays    = result.map(el => el = format(el, 'i'));
            const dataByDays = groupedExpenses.map(el => el = format(new Date(el.date_alias), 'i'));

            const intersection = allDays.map(function(day) {
                return dataByDays.includes(day) ? groupedExpenses[dataByDays.indexOf(day)].total : 0;
            });
            state.groupedExpenses = intersection;
        },
        loadAllExpenses(state, expensesList) {
            state.expensesList = expensesList;
        },
        // MOODBOARD
        loadAllMoods(state, moodList) {
            //https://stackoverflow.com/questions/49627157/update-the-attribute-value-of-an-object-using-the-map-function-in-es6
            const mood = moodList.map( ({ date, ...list }) => {
                return {...list, day: format(parseISO(date), 'd'), date: date};
            });
            const date = new Date();
            let days = []

            //create all days in month
            for (let index = 1; index <= getDaysInMonth(date); index++) {
                //search day in the month with existing valuein mood array
                const data = mood.find( el => +el.day == index)
                if(data)
                    days.push(data);
                else
                    days.push({'id': '', 'mood':'', 'description': '', 'day':index, 'date': index});
            }
            console.log('DAYS');
            console.log(days);
            state.moodList = days;
        },
        // TODOLIST BOARD
        loadAllTasks(state, allTasksList) {
            state.allTasksList = allTasksList;
        },
        loadTasks(state, tasksList) {
            state.tasksList = tasksList;
        },
        loadAllTodos(state, todoList) {
            state.todoList = todoList;
        },
        removeTask(state, taskId) {
            const updateTasks = state.tasksList.filter(el => taskId != el.id);
            state.tasksList = updateTasks;
        },
        removeTodoList(state, todoId) {
            const updateTodoList = state.todoList.filter(el => todoId != el.id);
            state,todoList = updateTodoList;
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
        async loadAllMoods({ commit }) {
            try {
                const moodList = await axios.get(`/mood`);
                if (!moodList.data) {
                    commit('updateError','Impossible de récupérer les moods');
                }
                if (!moodList.data.length) {
                    commit('updateError','Aucun mood');
                }
                else {
                    commit('loadAllMoods', moodList.data);
                }
            } catch (error) {
                commit('updateError', error);
            }
        },
        async loadMoods({ commit }, period = 'month') {
            try {

                const moodList = await axios.get(`/mood/${period}`);
                console.log(period);
                console.log(moodList.data);
                commit('loadAllMoods', moodList.data);
                // if (!moodList.data) {
                //     commit('updateError','Impossible de récupérer les moods');
                // }
                // if (!moodList.data.length) {
                //     commit('updateError','Aucun mood');
                // }
                // else {
                    
                // }
            } catch (error) {
                commit('updateError', error);
            }
        },
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
                this.dispatch('loadExpenses');
                this.dispatch('loadExpensesTotal');

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
                if(financeList.data.length > 0)
                {
                    const total = financeList.data.map(el => +el.total).reduce((prev, next) => prev + next);
                    commit('loadExpensesTotal', total);  
                }
            } catch (error) {
                commit('updateError', error);
            }
        },

        async loadAllTasks({ commit }, period = 'day', listId = null) {
            try {
                const tasksList = await axios.get(`/task/${period}`);
                if (!tasksList.data) {
                    commit('updateError','Impossible de récupérer les taches');
                }
                if (!tasksList.data.length) {
                    commit('updateError','Aucune tache');
                }
                else {
                    commit('loadAllTasks', tasksList.data);
                }
            } catch (error) {
                commit('updateError', error);
            }
        },
        async loadTasks({ commit }, listId) {
            try {
                if(!listId) commit('updateError', 'listId vide');
                const tasksList = await axios.get(`/list/${listId}/tasks`);
                if (!tasksList.data.tasks || !tasksList.data.tasks.length) {
                    commit('updateError','Aucune tache');
                    //set an empty task list
                    commit('loadTasks', []);
                }
                else {
                    commit('loadTasks', tasksList.data.tasks);
                }
            } catch (error) {
                commit('updateError', error);
            }
        },
        async loadAllTodos({ commit }, period = 'day') {
            try {
                const todoList = await axios.get(`/list/${period}`);
                if (!todoList.data) {
                    commit('updateError','Impossible de récupérer les liste de tâches');
                }
                if (!todoList.data.length) {
                    commit('updateError','Aucune liste');
                }
                else {
                    commit('loadAllTodos', todoList.data);
                }
            } catch (error) {
                commit('updateError', error);
            }
        },

        async removeTodoList({ commit }, todoId) {
            try {
                if(!todoId) commit('updateError', 'todoId vide');
                const removedItem = await axios.delete(`/list/${todoId}`);
                if (!removedItem) {
                    commit('updateError', 'Impossible de supprimer la liste: ' + todoId);
                }
                commit('removeTodoList', todoId);
                this.dispatch('loadAllTodos');

            } catch (error) {
                commit('updateError', error);
            }
        },
        async removeTask({ commit }, taskId) {
            try {
                if(!taskId) commit('updateError', 'taskId vide');
                const removedItem = await axios.delete(`/task/${taskId}`);
                if (!removedItem) {
                    commit('updateError', 'Impossible de supprimer la liste: ' + taskId);
                }
                commit('removeTask', taskId);
                this.dispatch('loadAllTasks');

            } catch (error) {
                commit('updateError', error);
            }
        },
        setError({ commit }, error) {
            commit('updateError', error);
        }
    },
    getters: {
        loadExpenses (state) {
            return (state.groupedExpenses);
        }
    }

});
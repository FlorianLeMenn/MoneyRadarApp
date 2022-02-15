<template>
        <div class="chart-nav m-4 flex justify-around items-center text-center text-gray1">
            <div class="week selected py-1 px-2 text-white rounded-full bg-gray-light" data-item="week">Semaine</div>
            <div class="month" data-item="month">Mois</div>
            <div class="year" data-item="year">Année</div>
        </div>
        <div class="container">  
            <div class=" overflow-hidden">
                <canvas class="" id="chartLine"></canvas>
            </div>
        </div>
</template>

<script>
import { Chart, registerables} from 'chart.js';
import myChart from '../assets/js/chart.js';
import {getDay, startOfWeek, lastDayOfWeek, startOfMonth, lastDayOfMonth, eachDayOfInterval,formatISO, parseISO, format } from 'date-fns';
import  { utcToZonedTime } from 'date-fns-tz';

export default {
  name: 'expensesChart',
    //propriété de donnée du parent, passage en attribut html
  props: ['groupedExpenses'],
    created() {
        //console.log('CREATED CHART');
        Chart.register(...registerables);
    },
    updated() {
        const data = myChart.loadDataChart(this.getTotalByDays, 'week');
        const configLineChart = myChart.setConfChart(data)
        //create chart
        const myLineChart = new Chart(document.getElementById('chartLine'),configLineChart);
        //init chart 
        myChart.init(myLineChart);
    },
    computed: {
        //Retourn un tableau des dépenses totales triées par jours
        getTotalByDays() {
            const data = this.$props.groupedExpenses;
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
            const dataByDays = data.map(el => el = format(new Date(el.date_alias), 'i'));

            const intersection = allDays.map(function(day) {
                return dataByDays.includes(day) ? data[dataByDays.indexOf(day)].total : 0;
            });
            return (intersection);
        },
    },
}
</script>
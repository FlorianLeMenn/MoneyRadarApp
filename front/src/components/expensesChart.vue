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
    mounted() {
    },
    updated() {
        console.dir( 'DATA UP:');
        console.dir( this.test);
        //const data = myChart.loadDataChart(this.getTotalByDays, 'week');
        //const configLineChart = myChart.setConfChart(data)
        //create chart
        //const myLineChart = new Chart(document.getElementById('chartLine'),configLineChart);
        //init chart 
        //myChart.init(myLineChart);
    },
    computed: {
        test() {
             const data = this.$props.groupedExpenses;
            console.log('== groupedExpenses ==')
            console.dir( data);
            console.log('== each interval days ==')
            //default week
            const startedDate   = startOfWeek(new Date(), { weekStartsOn: 1 });
            const endDate       = lastDayOfWeek(new Date(), { weekStartsOn: 1 });

            let currentTotal    = 0;
            let sumData         = [];

            const result = eachDayOfInterval({
                start: startedDate,
                end: endDate
            })
            console.log('=== formated ====') 
            const timeZone = 'Europe/Paris'

            const currentW = result.map(el => el = format(el, 'i'));
            const formatedW = data.map(el =>el.date_alias);
            console.log(currentW);
            console.log(formatedW);
            const date2 = new Date('2022-02-06T00:00:00.000Z')
            const zonedDate = utcToZonedTime(date2, timeZone)
            console.log(zonedDate)
            //return this.$props.groupedExpenses;
        },
        //Retourn un tableau des dépenses totales triées par jours
        getTotalByDays() {}

    },
}
</script>
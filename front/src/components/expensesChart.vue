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

export default {
    name: 'expensesChart',
    //propriété de donnée du parent, passage en attribut html
    props: ['groupedExpenses'],
    created() {
        //console.log('CREATED CHART');
        Chart.register(...registerables);
    },
    mounted() {
        console.log('mouted');
        console.log(this.$props.groupedExpenses);
        const data = myChart.loadDataChart(this.$props.groupedExpenses, 'week');
        const configLineChart = myChart.setConfChart(data)
        //create chart
        const myLineChart = new Chart(document.getElementById('chartLine'),configLineChart);
        //init chart 
        myChart.init(myLineChart);
    },
}
</script>
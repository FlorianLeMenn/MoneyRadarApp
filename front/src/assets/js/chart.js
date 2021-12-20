const chart = {
    init:  function() {
        //get item selected
        const chartNav = document.querySelector('.chart-nav');
    
        //init chart 
        const data = this.loadDataChart();
        const configLineChart = this.setConfChart(data)
    
        //create chart
        const myLineChart = new Chart(document.getElementById('chartLine'),configLineChart);
    
        chartNav.addEventListener('click', (e) => {
            const period = e.target.dataset.item;
            const classes = ["selected", "py-1", "px-4" ,"text-white" ,"rounded-full", "bg-gray-light"];
    
            if(period === undefined) {return;}
    
            //convert staticNodeList
            [...chartNav.querySelectorAll('div')].map(el => {
                el.classList.remove(...classes);
            });
    
            //add all class
            if (period) {
                e.target.classList.add(...classes);
                //add hidden to all list
                [...document.querySelectorAll('.list')].map(el => {
                    el.classList.add('hidden');
                });
                const list = document.querySelector(`.${period}List`);
                list.classList.toggle('hidden');
            }
            const data = this.loadDataChart(period);
            const newConf = this.setConfChart(data);
            //update data chart
            myLineChart.data = data;
            myLineChart.options = newConf.options;
            myLineChart.update();
        });
    },
    
    loadDataChart: function(period = 'week') {
        let xAxisLegend = [];
        let periodData  = [];
        
        const today = new Date();
        const month = today.getMonth();
        const year  = today.getFullYear();
        let currIndex = 0;
    
        if(period === 'week') {
            //les jours passés
            xAxisLegend = [
                'lundi',
                'mardi',
                'mercredi',
                'jeudi',
                'vendredi',
                'samedi',
                'dimanche',
            ];
            //index du jour courant
            currIndex = xAxisLegend.indexOf(today.toLocaleDateString('fr-FR', { weekday: 'long' }));
            periodData = [0, 10, 5, 2, 20, 0, 40, 20, 10, 5, 2, 20, 30, 45];
        }
        
        if (period === 'month') {
            //les jours du mois
            const daysInMonth = new Date(year, month, 0).getDate();
            //le jour courrant
    
            for (let  i=1; i <= daysInMonth; i++) {
                xAxisLegend.push(i);
            }
            //index du jour courant
            currIndex = today.getDate() - 1
            periodData = [250, 150, 100, 200, 50, 150, 100, 100, 120, 79, 20, 140];

        }
            
        if (period === 'year') {
            xAxisLegend = [
                'janvier',
                'février',
                'mars',
                'avril',
                'mai',
                'juin',
                'juillet',
                'août',
                'septembre',
                'octobre',
                'novembre',
                'décembre',
            ];
            //index du mois courant
            currIndex = xAxisLegend.indexOf(today.toLocaleDateString('fr-FR', { month: 'long' }));
            periodData = [250, 150, 100, 200, 50, 150, 100, 100, 120, 79, 20, 140];
        }
    
        const data = {
            labels: xAxisLegend,
            color: '#fff',
            datasets: [{
                currIndex: currIndex,
                label: '',
                yAxisID: 'yAxis',
                xAxisID: 'xAxis',
                lineTension: 0.4,
                borderJoinStyle: 'rounmiterd',
                borderWidth: 1,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: '#f0f',//'rgba(75, 192, 192, 0.9)',
                data: periodData,
                fill: {
                    target: 'origin',
                    above: function(context) {
                        const chart = context.chart;
                        const {ctx} = chart;
        
                        // Create a linear gradient https://www.chartjs.org/docs/3.1.0/samples/advanced/linear-gradient.html
                        var gradient = ctx.createLinearGradient(0,0,0,800);
                    
                        // Add three color stops
                        gradient.addColorStop(0, 'rgba(75, 192, 192, 0.6)');
                        gradient.addColorStop(0.7, 'rgba(75, 192, 192, 0.2)');
                        gradient.addColorStop(0.5, 'rgba(0, 0, 0, 0)');
                        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
                        return gradient;
                    },   // Area will be red above the origin
                    //below: ''  // utilisé pour les valeurs négatives ne dessous de l'axe des y
                }
            }]
        };
    
    return data;
    },
    
    setConfChart: function(data) {
    
        const configLineChart = {
            type: 'line',   
            data,
            options: {
                elements: {
                    point:{
                        radius: 0
                    }
                },
                scales: {
                    yAxis: {
                        axis: 'y',
                        display: true,
                        stacked: 'single',
                        min: 0,
                        max: Math.max(...data.datasets[0].data),
                        grid: {
                            display: false,
                            drawBorder: false,
                        },
                        ticks: {
                            color: "#fff",
                            stepSize: 10,
                            beginAtZero: true,
                        }
                    },
                    xAxis: {
                        axis: 'x',
                        stacked: 'single',
                        grid: {
                            display: true,
                            drawBorder: false,
                            //borderColor: "rgba(0, 241, 120, 0.6)",
                            //backgroundColor: "rgba(100, 20, 120, 0.6)",
                            //color: '#f0f',
                            //tickColor: '#f0f',
                        },
                        ticks: {
                            color: (tick) => {
                                //console.log("index = " + data.datasets[0].currIndex)
                                if(tick.index === data.datasets[0].currIndex) {
                                    return "rgba(75, 192, 192, 1)";
                                }
                                return "#fff";
    
                            },//['#fff', '#f0f', '#00f'], //"#fff",
                            stepSize: 1,
                            beginAtZero: true,
                        }
                    },              
                },
                plugins: {
                    legend: {
                        display: false,
                        position: 'bottom',
                        align: 'center',
                        labels: {
                            color: '#fff',
                        }
                    }
                }
            }
        };
    
        return configLineChart;
    }
};

module.exports = chart;
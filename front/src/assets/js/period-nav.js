
const nav = {
    init: function() {//get item selected
        const chartNav = document.querySelector('.period-nav');

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
                // [...document.querySelectorAll('.list')].map(el => {
                //     el.classList.add('hidden');
                // });
                // const list = document.querySelector(`.${period}List`);
                // list.classList.toggle('hidden');
            }

        });
    }
}

module.exports = nav;
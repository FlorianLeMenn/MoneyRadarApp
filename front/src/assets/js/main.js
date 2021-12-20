const main = {
    init: function() {
        const displayForm = document.querySelector('.addNewForm');
        const btnAdd = document.querySelector('.addNewBtn');
        
        btnAdd.addEventListener('click', (event) => {
            displayForm.classList.toggle('hidden');
        })
    }
}

module.exports = main;

const main = {
    init: function() {
        const displayForm     = document.querySelector('.addNewForm');
        const btnAdd          = document.querySelector('.addNewBtn');
        const checkRecurrent  = document.getElementById('checkRecurrent');
        const fieldsContainer = document.getElementById('recurrentFieldsContainer');

        checkRecurrent.addEventListener('change', (e) => {
            if (e.target.checked) {
                fieldsContainer.classList.toggle('hidden');
            }
            else {
                fieldsContainer.classList.toggle('hidden');
            }
        })
        
        btnAdd.addEventListener('click', (event) => {
            displayForm.classList.toggle('hidden');
        })
    }
}

module.exports = main;

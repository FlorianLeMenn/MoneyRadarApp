const main = {
    init: function() {
        const displayForm     = document.querySelector('.addNewForm');
        const btnAdd          = document.querySelector('.addNewBtn');
        const btnCancel       = document.querySelector('.cancelBtn');
        const checkRecurrent  = document.getElementById('checkRecurrent');
        const fieldsContainer = document.getElementById('recurrentFieldsContainer');

        if(checkRecurrent) {
            checkRecurrent.addEventListener('change', (e) => {
                if (e.target.checked) {
                    fieldsContainer.classList.toggle('hidden');
                }
                else {
                    fieldsContainer.classList.toggle('hidden');
                }
            });
        }
        
        if(btnCancel){
            btnCancel.addEventListener('click', (e) => {
                displayForm.classList.toggle('hidden');
            });
        }
    }
}

module.exports = main;

$(document).ready(function() {

    const buttons = document.querySelectorAll(".js-toggle-state"); 

    for (const button of buttons) {
        button.addEventListener('click', function(event) {
            this.setAttribute('data-active', this.getAttribute('data-active') === 'true' ? false : true);
            event.preventDefault();
        });
    }
});

$(document).ready(function() {
    const buttons = document.querySelectorAll(".js-toggle-state");

    for (const button of buttons) {
        button.addEventListener('click', function(event) {
            this.setAttribute('data-active', this.getAttribute('data-active') === 'true' ? false : true);
            event.preventDefault();
        });
    }

    $(".title").fadeIn(3000);
    $(".arrow").fadeIn(1000);
  
        function fnBlink() {
      $(".arrow").fadeOut(1000);
      $(".arrow").fadeIn(1000);
    }
    setInterval(fnBlink, 2000);
});
$ (function () {
    $ ('#arrow') .click(function () {
    $ ('html, body') .animate ({
    scrollTop: $ ("#post") .offset().top - 0.25*$("#post")[0].scrollHeight
    }, 750);
    return false;
    })
});



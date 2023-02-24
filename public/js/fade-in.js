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
    var a = getUrlParameter('a');
    console.log(a); // "edit"

});
$ (function () {
    $ ('#arrow') .click(function () {
    $ ('html, body') .animate ({
    scrollTop: $ ("#post") .offset().top - 0.25*$("#post")[0].scrollHeight
    }, 750);
    return false;
    })
});


var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
    return false;
};

$(document).ready(function() {
    /* Fetch query parameter to select real estate agent */
    var sala = getUrlParameter('sala');
    if (sala !== false){
        localStorage.setItem("sala", sala);
    }
    var soluRedirect = localStorage.getItem("sala");
    switch(soluRedirect) {
        case "as":
            $("#as").show();
            $("#borg").hide();
            $("#hraunhamar").hide();
            break;
        case "borg":
            $("#borg").show();
            $("#as").hide();
            $("#hraunhamar").hide();
            break;
            case "hraunhamar":
                $("#hraunhamar").show();
                $("#borg").hide();
                $("#as").hide();
                break;
        default:
            $("#borg").show();
            $("#as").show();
            break;
    }

        /*Remove query parameter from page*/
    var uri = window.location.href.toString();
    if (uri.indexOf("?") > 0) {
        var clean_uri = uri.substring(0, uri.indexOf("?"));
        window.history.replaceState({}, document.title, clean_uri);
    }

    const buttons = document.querySelectorAll(".js-toggle-state");

    for (const button of buttons) {
        button.addEventListener('click', function(event) {
            this.setAttribute('data-active', this.getAttribute('data-active') === 'true' ? false : true);
            event.preventDefault();
        });
    }

    $(".title").fadeIn(3000);
    $("#arrow").fadeIn(1000);
  
        function fnBlink() {
      $("#arrow").fadeOut(1000);
      $("#arrow").fadeIn(1000);
    }
    setInterval(fnBlink, 2000);
});
$ (function () {
    $ ('#arrow') .click(function () {
    $ ('html, body') .animate ({
    scrollTop: $ ("#apt") .offset().top - 0.25*$("#apt")[0].scrollHeight
    }, 1250);
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

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
    updateImageMap();

    
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

function updateImageMap() {
    $.getJSON("image-map.json", function (mapdata) {
            ImageMapPro.init('#image-map-pro', mapdata);        
    }
    ).fail(function () {
        console.log("An error has occurred loading image map");
    });
}

$(window).on('resize scroll', function() {
    if ($('.horizontal-scroller').isInViewport()) {
        //CHeck if slide-left class is already applied
        if(!$(".horizontal-scroller").hasClass("slide-left")) {
            $(".horizontal-scroller").toggleClass("slide-left");
        }
        
    } else {
        // do something else
    }
});

function toggleFullscreen(x) {

    //If x has src attribute, set the src of the fullscreenview to x.src
    if (x.hasAttribute('src')) {
        $('.fullscreenview').css('background-image',  "url(" + x.src + ")");
        $('.fullscreenview').css("display", "flex").hide().fadeIn(200);
    }
    else {
        $('.fullscreenview').css("display", "none");
    }
}


function updateImageMap() {
    
    $.getJSON("image-map.json", function (mapdata) {
        initMap(mapdata);        
    }
    ).fail(function () {
        console.log("An error has occurred loading image map");
    });

    ImageMapPro.subscribe((action) => {    
        if (action.type === 'objectClick' && action.payload.object.length === 7) {
            var houseNr = action.payload.object.slice(0, 2);
            var aptNr = action.payload.object.slice(3, 7);
                changeArtboard(houseNr);
                revealApt(houseNr, aptNr);
        }
    });
}

function revealApt(houseNr, aptNr) {
    //Set display block on apt-view
    var href="upplysingar.html?hus="+houseNr+"&ibud="+aptNr+""
    $("#front-page-apt-view img").attr('src', 'media/images/floor-plans/'+houseNr+'/'+aptNr+'.jpg');
    $("#front-page-apt-view img").attr('onclick', "location.href='"+href+"'");
    $("#front-page-apt-view-title").text("Áshamar "+houseNr+" - Íbúð "+aptNr);
    $("#front-page-apt-view-button").attr('onClick', "location.href='" + href + "'");
    $("#front-page-apt-view").removeClass("hide");

    $ ('html, body') .animate ({
        scrollTop: $ ("#front-page-apt-view") .offset().top - 0.25*$("#front-page-apt-view")[0].scrollHeight
    }, 750);
}

function initMap(mapdata) {
    ImageMapPro.init('#image-map-pro', mapdata);
}   

function changeArtboard(housenr) {
    ImageMapPro.changeArtboard('ashamar-project','Áshamar '+housenr);
}

$.fn.isInViewport = function() {
    var elementTop = $(this).offset().top;
    var elementBottom = elementTop + $(this).outerHeight();

    var viewportTop = $(window).scrollTop();
    var viewportBottom = viewportTop + $(window).height();

    return elementBottom > viewportTop && elementTop < viewportBottom;
};
$(document).ready(function() {
    var ibudNr = getUrlParameter('ibud');
    var husNr = getUrlParameter('hus');
    $.getJSON("data.json", function(data){
        var found = false;
        for (var i = 0, len = data.length; i < len; i++) {
            var value = data[i];
            if(value.ibudnr === ibudNr && value.husnr.toString() === husNr) {
                /* Data point found */
                found = true;
                $("#floor-plan").attr('src', 'media/images/floor-plans/' +husNr + '/' + ibudNr+'.jpg');
                $(".apt-name").text("Íbúð " + value.ibudnr);
                $("#haed span").text(value.haed);
                $("#hrb span").text(value.herbergi);
                $("#geymsla span").text(value.geymsla);
                $("#staerd span").text(value.staerd);
                $("#verd span").text(value.verd);
                break;
            }
        }
        if(found === false) {
            $(".wrapper-item").hide();
            $("#notfound").show();
        }

    }).fail(function(){
        console.log("An error has occurred.");
        $(".wrapper-item").hide();
        $("#notfound").show();
    });

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

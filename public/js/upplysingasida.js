$(document).ready(function() {
    var ibudNr = getUrlParameter('ibud');
    console.log(ibudNr);

    $.getJSON("ibudir.json", function(data){
        if (!data.hasOwnProperty(ibudNr)) {
            console.log("íbúð ekki til");
            $(".wrapper-item").hide();
            $("#notfound").show();
        }
        else {
        $("#floor-plan").attr('src', 'media/images/floor-plans/' + ibudNr+'.jpg');
        $(".apt-name").text("Íbúð " + data[ibudNr].ibudnr);
        $("#head span").text(data[ibudNr].haed);
        $("#hrb span").text(data[ibudNr].herbergi);
        $("#geymsla span").text(data[ibudNr].geymsla);
        $("#staerd span").text(data[ibudNr].staerd);
        $("#verd span").text(data[ibudNr].verd);
        }
    }).fail(function(){
        console.log("An error has occurred.");
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

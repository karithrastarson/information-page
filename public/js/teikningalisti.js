window.addEventListener("keydown", function (e) {
    if (["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].indexOf(e.code) > -1) {
        e.preventDefault();
    }
}, false);

$(document).ready(function () {
    var hus = getUrlParameter('hus');
    //if (hus !== false && "42 44 46 48".includes(hus)) {
    if (hus !== false && "44".includes(hus)) {
        $('#ashamar' + hus).prop('checked', true);
    } else {
        $('#ashamar42').prop('checked', false);
        $('#ashamar44').prop('checked', true);
        $('#ashamar46').prop('checked', false);
        $('#ashamar48').prop('checked', false);
    }


    $('#herb1').prop('checked', true);
    $('#herb2').prop('checked', true);
    $('#herb3').prop('checked', true);
    $('#herb4').prop('checked', true);
    $('#herb5').prop('checked', true);
    updateTable();
});
function updateTable(sort, desc) {
    $(".apt-row").remove();

    $.getJSON("data.json", function (data) {

        if (sort === "verd") {
            data.sort(function (a, b) {
                if (parseFloat(b.verd) < parseFloat(a.verd)) {
                    return desc ? -1 : 0;
                }
                return desc ? 0 : -1;
            });
        }
        if (sort === "fm") {
            data.sort(function (a, b) {
                if (parseFloat(b.staerd) < parseFloat(a.staerd)) {
                    return desc ? -1 : 0;
                }
                return desc ? 0 : -1;
            });
        }


        for (var i = 0, len = data.length; i < len; i++) {
            var value = data[i];
            var seld = (String(value.seld).toLowerCase() === "já");
            var ferli = (value.ferli != null) ? "ferli" : ""; 
            if ($('#herb' + value.herbergi).is(':checked') && $('#ashamar' + value.husnr).is(':checked')) {
                var row = `
            <tr class="apt-row ${seld ? "seld" : ""} ${ferli ? "ferli" : ""}" data-size="${Math.ceil(parseFloat(value.staerd))}">
                <td data-th="Íbúð">
                    ${value.husnr} - ${value.ibudnr}
                </td>
                <td data-th="Hæð">
                    ${value.haed}
                </td>
                <td data-th="Herbergi">
                    ${value.herbergi}
                </td>
                <td data-th="Bílastæði í kjallara">
                    ${value.bilastaedi}
                </td>
                <td data-th="Birtir fermetrar">
                    ${value.staerd}
                </td>
                <td data-th="Verð">
                    ${seld ? "Seld" : (value.ferli != null ? "Í ferli" : value.verd)}
                </td>
                <td data-th="Nánar" data-img="media/images/floor-plans/${value.husnr}/${value.ibudnr}.jpg">
                    <a class="more-info" data-href="upplysingar.html?hus=${value.husnr}&ibud=${value.ibudnr}"><i class="fa fa-eye ${seld ? "seld" : ""}"></i></a>
                </td>
            </tr>`

                $('#apt-table tbody tr:last').after(row);

            }

            $(".more-info").click(function () {
                $(".apt-row").removeClass('highlight');
                var img = $(this).parent().attr('data-img');
                $(this).parent().parent().toggleClass('highlight');
                var src = $(this).attr('data-href');
                $("#apt-view img").attr('src', img);
                $("#apt-view img").attr('onclick', "location.href='"+img+"'");
                $("#apt-view-details-button").attr('onClick', "location.href='" + src + "'");
                $("#apt-view").css("display", "flex")
                    .hide()
                    .fadeIn(10);

            })
        }
    }
    ).fail(function () {
        console.log("An error has occurred.");
    });

}
$(document).mouseup(function (e) {
    var container = $("#apt-view");

    // if the target of the click isn't the container nor a descendant of the container
    if (!container.is(e.target) && container.has(e.target).length === 0) {
        $(".apt-row").removeClass('highlight');
        $("#apt-view").attr('style', 'display:none');
    }
});

$(document).on("click", "tr", function () {
    var index = $(this).index(); //this is event.target, which is the clicked tr element in this case
    if (index > 0) {
        $(".apt-row").removeClass('highlight');
        $(this).addClass('highlight');
    }
});

$('input').change(function () {
    updateTable();
});

$("#filter-verd").click(function () {
    $("#filter-fm i").removeClass("fa-arrow-down");
    $("#filter-fm i").removeClass("fa-arrow-up");
    if ($("#filter-verd i").hasClass("fa-arrow-down")) {
        $("#filter-verd i").toggleClass("fa-arrow-down");
        $("#filter-verd i").toggleClass("fa-arrow-up");
        updateTable("verd", false);
    }
    else if ($("#filter-verd i").hasClass("fa-arrow-up")) {
        $("#filter-verd i").toggleClass("fa-arrow-down");
        $("#filter-verd i").toggleClass("fa-arrow-up");
        updateTable("verd", true);
    }
    else {
        $("#filter-verd i").toggleClass("fa-arrow-down");
        updateTable("verd", true);
    }
})

$("#filter-fm").click(function () {
    $("#filter-verd i").removeClass("fa-arrow-down");
    $("#filter-verd i").removeClass("fa-arrow-up");
    if ($("#filter-fm i").hasClass("fa-arrow-down")) {
        $("#filter-fm i").toggleClass("fa-arrow-down");
        $("#filter-fm i").toggleClass("fa-arrow-up");
        updateTable("fm", false);
    }
    else if ($("#filter-fm i").hasClass("fa-arrow-up")) {
        $("#filter-fm i").toggleClass("fa-arrow-down");
        $("#filter-fm i").toggleClass("fa-arrow-up");
        updateTable("fm", true);
    }
    else {
        $("#filter-fm i").toggleClass("fa-arrow-down");
        updateTable("fm", true);
    }
})
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
$(document).keydown(function (e) {
    if (e.keyCode === 37) {
        prevApt();
    }
    if (e.keyCode === 39) {
        nextApt();
    }
    //Arrow down
    if (e.keyCode === 40) {
        nextApt();
    }
    //Arrow up
    if (e.keyCode === 38) {
        prevApt();
    }
    //ESC
    if (e.keyCode === 27) {
        $(".apt-row").removeClass('highlight');
        $("#apt-view").attr('style', 'display:none');
    }
    //ENTER
    if (e.keyCode === 13) {
        $("#apt-view").css("display", "flex")
    }
});

function prevApt() {
    var row = $('.highlight').prev().find('td:last-child');
    if (row.length > 0) {
        var img = row.attr('data-img');
        var src = row.find('a').attr('data-href');
        $("#apt-view img").attr('src', img);
        $("#apt-view-details-button").attr('onclick', "location.href='" + src + "'");

        var currentHighlight = $('.highlight');
        var newHighlight = $('.highlight').prev();
        currentHighlight.toggleClass('highlight');
        newHighlight.toggleClass('highlight');
    }
}
function nextApt() {
    var row = $('.highlight').next().find('td:last-child');
    if (row.length > 0) {
        var img = row.attr('data-img');
        var src = row.find('a').attr('data-href');
        $("#apt-view img").attr('src', img);
        $("#apt-view-details-button").attr('onclick', "location.href='" + src + "'");
        var currentHighlight = $('.highlight');
        var newHighlight = $('.highlight').next();

        currentHighlight.toggleClass('highlight');
        newHighlight.toggleClass('highlight');
    }
}


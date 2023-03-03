$(document).ready(function() {

    $.getJSON("data.json", function(data){
        for (var i = 0, len = data.length; i < len; i++) {
        var value = data[i];

            var row =`
            <tr data-size="${Math.ceil(parseFloat(value.staerd))}" class="herb${value.herbergi}">
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
                    ${value.verd}
                </td>
                <td data-th="Nánar" data-img="media/images/floor-plans/${value.husnr}/${value.ibudnr}.jpg">
                    <a class="more-info" data-href="/upplysingar.html?hus=${value.husnr}&ibud=${value.ibudnr}"><i class="fa fa-eye"></i></a>
                </td>
            </tr>`

            $('#apt-table tr:last').after(row);

        }

        $(".more-info").click(function(){
            var img = $(this).parent().attr('data-img');
            var src = $(this).attr('data-href');
            $("#apt-view img").attr('src', img);
            $("#apt-view a").attr('href', src);
            $("#apt-view").fadeIn(500);
        })
    }).fail(function(){
        console.log("An error has occurred.");
    });



});

$(document).mouseup(function(e)
{
    var container = $("#apt-view");

    // if the target of the click isn't the container nor a descendant of the container
    if (!container.is(e.target) && container.has(e.target).length === 0)
    {
        $("#apt-view").attr('style', 'display:none');
    }
});



function filterRooms(minRooms) {
    var element = document.getElementById("range-rooms");
    element.innerHTML = minRooms;
    switch (minRooms) {
        case '1':
            showherb("herb1", true);
            showherb("herb2", true);
            showherb("herb3", true);
            showherb("herb4", true);
            showherb("herb5", true);
            break;
        case '2':
            showherb("herb1", false);
            showherb("herb2", true);
            showherb("herb3", true);
            showherb("herb4", true);
            showherb("herb5", true);
            break;
        case '3':
            showherb("herb1", false);
            showherb("herb2", false);
            showherb("herb3", true);
            showherb("herb4", true);
            showherb("herb5", true);
            break;
        case '4':
            showherb("herb1", false);
            showherb("herb2", false);
            showherb("herb3", false);
            showherb("herb4", true);
            showherb("herb5", true);
            break;
        case '5':
            showherb("herb1", false);
            showherb("herb2", false);
            showherb("herb3", false);
            showherb("herb4", false);
            showherb("herb5", true);
            break;
        default:
            break;
    }
}
function showherb(className, show) {
    var elements = document.getElementsByClassName(className);
    for(var i = 0; i < elements.length; i++) {
        elements[i].style.display = show ? 'table-row' : 'none';
    }
}

function filterSize(minSize) {
    var element = document.getElementById("range-size");
    element.innerHTML = minSize;

    $("table tr").each(function() {
        var attr = $(this).attr('data-size');
        if (typeof attr !== 'undefined' && attr !== false) {

            var size = $(this).attr("data-size");
            var display = (parseInt(size) > parseInt(minSize)) ? 'table-row' : 'none';
            $(this).css('display', display);
        }
    });

}
$(document).ready(function() {

    var minSize = $('.size-slider').val();
    var minRoom = $('.room-slider').val();

    updateTable(minRoom, minSize);

});
function updateTable(minRooms, minSize) {
    $(".apt-row").remove();

    $.getJSON("data.json", function(data){
            for (var i = 0, len = data.length; i < len; i++) {
                var value = data[i];
                if (Math.ceil(parseFloat(value.staerd)) > minSize && value.herbergi >= minRooms){
                    var row =`
            <tr class="apt-row" data-size="${Math.ceil(parseFloat(value.staerd))}">
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
            }
        }
    ).fail(function(){
        console.log("An error has occurred.");
    });



}
$(document).mouseup(function(e)
{
    var container = $("#apt-view");

    // if the target of the click isn't the container nor a descendant of the container
    if (!container.is(e.target) && container.has(e.target).length === 0)
    {
        $("#apt-view").attr('style', 'display:none');
    }
});

$('.room-slider').on('input', function() {
    console.log("works!");
    let val = $(this).val();
    var element = document.getElementById("range-rooms");
    element.innerHTML = val;

    var minSize = $('.size-slider').val();
    var minRoom = $(this).val();

    updateTable(minRoom, minSize);
});

$('.size-slider').on('input', function() {
    console.log("this too!");
    let val = $(this).val();
    var element = document.getElementById("range-size");
    element.innerHTML = val;

    var minRoom = $('.room-slider').val();
    var minSize = $(this).val();

    updateTable(minRoom, minSize);
});

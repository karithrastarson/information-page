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
                <td data-th="Nánar">
                    <a href="/upplysingar.html?hus=${value.husnr}&ibud=${value.ibudnr}"><i class="fa fa-eye"></i></a>
                </td>
            </tr>`

            $('#apt-table tr:last').after(row);

        }
    }).fail(function(){
        console.log("An error has occurred.");
    });
});

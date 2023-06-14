$(document).ready(function() {
/*Populate navigation menu*/

/*Get div with id overlay*/
var overlay = document.getElementById("overlay");
    $( "#overlay" ).append( $( "<a href=\"/\">VERKEFNIÐ</a>" ) );
    $( "#overlay" ).append( $( "<a href=\"/teikningar.html\">ÍBÚÐIR</a>" ) );
    $( "#overlay" ).append( $( "<a href=\"/teymid.html\">TEYMIÐ</a>" ) );
    $( "#overlay" ).append( $( "<a href=\"https://us14.list-manage.com/contact-form?u=3412f3b17965f94555bd17560&form_id=1a27fc054f26d25ffe397e4d0525be4f\">HAFA SAMBAND</a>" ) );

    $( "#topnav" ).append( $( "<a href=\"/\" class=\"nav\">VERKEFNIÐ</a>" ) );
    $( "#topnav" ).append( $( "<a href=\"/teikningar.html\" class=\"nav\">ÍBÚÐIR</a>" ) );
    $( "#topnav" ).append( $( "<a href=\"/teymid.html\" class=\"nav\">TEYMIÐ</a>" ) );
    $( "#topnav" ).append( $( "<a href=\"https://us14.list-manage.com/contact-form?u=3412f3b17965f94555bd17560&form_id=1a27fc054f26d25ffe397e4d0525be4f\"\n" +
        "       class=\"nav\">HAFÐU SAMBAND</a>" ) );






});
function openNav() {
    document.getElementById("myNav").style.height = "100%";
    document.getElementById("hamburger").style.display = "none";

}

function closeNav() {
    document.getElementById("myNav").style.height = "0%";
    document.getElementById("hamburger").style.display = "block";
}


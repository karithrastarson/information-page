/* Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon */
function myFunction() {
    var x = document.getElementById("topnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}

function toggleBurger() {
    var element = document.getElementById("hamburger");
    element.classList.toggle("is-active");

    openNav();

    // var x = document.getElementById("topnav");
    // if (x.className === "topnav") {
    //     x.className += " responsive";
    // } else {
    //     x.className = "topnav";
    // }
}

function openNav() {
    document.getElementById("myNav").style.height = "100%";
}

function closeNav() {
    document.getElementById("myNav").style.height = "0%";
}

function flip() {
    document.getElementById("flip-box-inner").style.transform = "rotateY(180deg)";
}

function flipBack() {
    document.getElementById("flip-box-inner").style.transform = "rotateY(360deg)";
}

async function getAllItems() {
    const response = await fetch('http://localhost:8484/register');
    const myJson = await response.json(); //extract JSON from the http
    console.log("Successs:");

    for (var i = 0; i < myJson.length; i++) {
        var obj = myJson[i];

        console.log(obj.name);
    }

}

async function buildHtmlTable(selector) {
    const response = await fetch('http://localhost:8484/register');
    const myList = await response.json();

    var columns = addAllColumnHeaders(myList, selector);

    for (var i = 0; i < myList.length; i++) {
        var row$ = $('<tr/>');
        for (var colIndex = 0; colIndex < columns.length; colIndex++) {
            var cellValue = myList[i][columns[colIndex]];
            if (cellValue == null) cellValue = "";
            row$.append($('<td/>').html(cellValue));
        }
        $(selector).append(row$);
    }
}

// Adds a header row to the table and returns the set of columns.
// Need to do union of keys from all records as some records may not contain
// all records.
function addAllColumnHeaders(myList, selector) {
    var columnSet = [];
    var headerTr$ = $('<tr/>');

    for (var i = 0; i < myList.length; i++) {
        var rowHash = myList[i];
        for (var key in rowHash) {
            if ($.inArray(key, columnSet) == -1) {
                columnSet.push(key);
                headerTr$.append($('<th/>').html(key));
            }
        }
    }
    $(selector).append(headerTr$);

    return columnSet;
}
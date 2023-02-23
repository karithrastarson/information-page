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

function toggle1() {
  var elements = document.getElementsByClassName("1-svefnh");
  for(var i = 0; i < elements.length; i++) {
    if (elements[i].classList.contains("hidden")) {
        elements[i].classList.remove("hidden");
      } else {
        elements[i].classList.add("hidden");
      }
    }
    }
function toggle2() {
    var elements = document.getElementsByClassName("2-svefnh");
    for(var i = 0; i < elements.length; i++) {
      if (elements[i].classList.contains("hidden")) {
          elements[i].classList.remove("hidden");
        } else {
          elements[i].classList.add("hidden");
        }
      }
}
  function toggle3() {
    var elements = document.getElementsByClassName("3-svefnh");
    for(var i = 0; i < elements.length; i++) {
      if (elements[i].classList.contains("hidden")) {
          elements[i].classList.remove("hidden");
        } else {
          elements[i].classList.add("hidden");
        }
      }
}



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
            console.log("size" + size + " min size" + minSize);
            var display = (parseInt(size) > parseInt(minSize)) ? 'table-row' : 'none';
            $(this).css('display', display);
        }
    });

}

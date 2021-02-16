/**
 * Basic calculator
 *
 * @author     Sambrax
 * @copyright  2021 Sambrax
 * @license    MIT License
 */
function calculator() {
    $(function () {
        /*
        | ---------------------------------------------------------------------
        | Calculator structure
        | ---------------------------------------------------------------------
        */
        $("#calculator").html('\
          <div class="container">\
            <div class="calculator">\
              <div class="screen"></div>\
              <input type="hidden" value="">\
              <ul>\
                <li><a href="c">C</a></li>\
                <li><a href="%">&#37;</a></li>\
                <li><a href="/">&#247;</a></li>\
                <li><a href="*">&#215;</a></li>\
                <li><a href="7">7</a></li>\
                <li><a href="8">8</a></li>\
                <li><a href="9">9</a></li>\
                <li><a href="-">-</a></li>\
                <li><a href="4">4</a></li>\
                <li><a href="5">5</a></li>\
                <li><a href="6">6</a></li>\
                <li><a href="+">+</a></li>\
                <li><a href="1">1</a></li>\
                <li><a href="2">2</a></li>\
                <li><a href="3">3</a></li>\
                <li><a href="=" class="equal tall">=</a></li>\
                <li><a href="0" class="wide shift">0</a></li>\
                <li><a href="." class="shift">.</a></li>\
              </ul>\
            </div>\
          </div>').draggable();
        /*
        | ---------------------------------------------------------------------
        | Calculation memory and display screen
        | ---------------------------------------------------------------------
        */
        var memory = $('#calculator input[type="hidden"]');
        var screen = $("#calculator .screen");
        /*
        | ---------------------------------------------------------------------
        | Clean the screen
        | ---------------------------------------------------------------------
        */
        var reset = function () {
            memory.val("");
            screen.html("");
        };
        /*
        | ---------------------------------------------------------------------
        | Insert a character on the screen
        | ---------------------------------------------------------------------
        */
        var insert = function (char) {
            if (char === "/") {
                screen.append("&divide;");
            } else {
                screen.append(char);
            }
            memory.val(memory.val() + char);
        };
        /*
        | ---------------------------------------------------------------------
        | Triggers the operation
        | ---------------------------------------------------------------------
        */
        var total = function () {
            memory.val(eval(memory.val()));
            screen.html(memory.val());
        };
        /*
        | ---------------------------------------------------------------------
        | Event: Click
        | ---------------------------------------------------------------------
        */
        $("#calculator a").click(function (e) {
            e.preventDefault();
            var char = $(this).attr("href");
            if (char === "=") { // Enter
                total();
            } else if (char === "c") { // Esc
                reset();
            } else {
                insert(char);
            }
        });
        /*
        | ---------------------------------------------------------------------
        | Event: keypress
        | ---------------------------------------------------------------------
        */
        $(this).keypress(function (e) {
            var char = "";
            var key  = (e.which) ? e.which : e.keyCode;
            char = String.fromCharCode(key);
            $('#calculator a[href="' + char + '"]').addClass("shadow");
            // Allowed characters 0-9 / * - + . %
            char = char.replace(/[^0-9\/\*\-\+\.\%]/g, "");
            if (char) {
                insert(char);
            } else if (key === 13) { // Enter
                total();
            }
        });
        /*
        | ---------------------------------------------------------------------
        | Event: keydown
        | ---------------------------------------------------------------------
        */
        $(this).keydown(function (e) {
            var key = (e.which) ? e.which : e.keyCode;
            if (key === 27) { // Esc
                $('#calculator a[href="c"]').addClass("shadow");
            } else if (key === 13) { // Enter
                $('#calculator a[href="="]').addClass("shadow");
            }
        });
        /*
        | ---------------------------------------------------------------------
        | Event: keyup
        | ---------------------------------------------------------------------
        */
        $(this).keyup(function (e) {
            $("#calculator li a").removeClass("shadow");
            var key = (e.which) ? e.which : e.keyCode;
            if (key === 27) { // Esc
                reset();
            } else if (key === 8) { // Tab
                var char = screen.html();
                char = char.substr(0, char.length - 1);
                screen.html(char);
                memory.val(char);
            }
        });
    });
}

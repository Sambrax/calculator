(function ($) {

    $.fn.calculator = function () {

        $("#calculator").html('<div class="container"><div class="calculator"><div class="screen"></div><input type="hidden" value="" class="outcome" /><ul class="buttons"><li class="clear"><a class="btn27">C</a></li><li><a href="%" class="val btn37">&#37;</a></li><li><a href="/" class="val btn47">&#247;</a></li><li><a href="*" class="val btn42">&#215;</a></li>    <li><a href="7" class="val btn55">7</a></li><li><a href="8" class="val btn56">8</a></li><li><a href="9" class="val btn57">9</a></li><li><a href="-" class="val btn45">-</a></li><li><a href="4" class="val btn52">4</a></li><li><a href="5" class="val btn53">5</a></li><li><a href="6" class="val btn54">6</a></li><li><a href="+" class="val btn43">+</a></li><li><a href="1" class="val btn49">1</a></li><li><a href="2" class="val btn50">2</a></li><li><a href="3" class="val btn51">3</a></li><li><a class="equal tall btn13">=</a></li><li><a href="0" class="val wide shift btn48">0</a></li><li><a href="." class="val shift btn44 btn46">.</a></li></ul></div></div>');

        $(this).on("keypress", function (e) {

            var str = "";
            var key = "";

            if( e.keyCode ){
                key = e.keyCode;
            }
            else
            {
                key = e.which;
            }

            str = String.fromCharCode(key);

            $(".btn" + key).css({
                "box-shadow": "inset rgba(0,0,0,0.5) 0px 2px 8px",
                "background-image": "-moz-linear-gradient(top, #2f2f2f 0%, #363636 100%)",
                "background-image": "-webkit-linear-gradient(top, #2f2f2f 0%, #363636 100%)",
                "background-image": "linear-gradient(top, #2f2f2f 0%, #363636 100%)"
            });

            var str_0_9 = str.replace(/[^0-9]/g, "");

            if( str == "," ){
                str = ".";
            }

            if( str_0_9 || str == "/" || str == "*" || str == "-" || str == "+" || str == "." || str == "%" ){

                if( str == "/" ){
                    $(".screen").append("&divide;");
                }
                else
                {
                    $(".screen").append(str);
                }

                $(".outcome").val($(".outcome").val() + str);

                str = "";
            }
            else

            // Tab
            if( key == "8" ){
                str = $(".screen").html();
                str = str.substr(0, str.length - 1);
                $(".screen").html(str);
                $(".outcome").val(str);
            }
            else

            // Enter
            if( key == "13" ){
                $(".outcome").val(eval($(".outcome").val()));
                $(".screen").html(eval($(".outcome").val()));
            }
            else

            // Esc
            if( key == "27" ){
                $(".outcome").val("");
                $(".screen").html("");
            }
        });

        $(".val").click(function (e) {

            e.preventDefault();
            var a = $(this).attr("href");
            var s = a;
            if( a == "/" ){
                s = "&divide;";
            }

            $(".screen").append(s);
            $(".outcome").val($(".outcome").val() + a);
        });

        $(".equal").click(function () {
            $(".outcome").val(eval($(".outcome").val()));
            $(".screen").html(eval($(".outcome").val()));
        });

        $(".clear").click(function () {
            $(".outcome").val("");
            $(".screen").html("");
        });

        $(this).keyup(function (e) {
            $("li a").css({"box-shadow": "", "background-image": ""});
        });
    };

})(jQuery);

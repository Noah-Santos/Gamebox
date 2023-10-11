$(function(){
     // when burger is clicked, open nav
    $("#burger").on('click', function(){
        $(".nav").animate({width: "28%"}, 300).delay(50).promise().done(function(){
            $(".x").css("display", "block");
            $(".navLink").css("display", "flex");
        });
        $("section").css("filter", "blur(4px)");
        $("#pickedCard").css("filter", "blur(4px)");
    });

    // when x is clicked, close nav
    $(".x").on('click', function(){
        $(".x").css("display", "none");
        $(".navLink").css("display", "none");
        $(".nav").animate({width: "0%"}, 300);
        $("section").css("filter", "blur(0px)");
        $("#pickedCard").css("filter", "blur(0px)");
    });  
})
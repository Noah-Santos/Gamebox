$(function(){
    // jquery for the nav
    
    // when burger is clicked, open nav
    $("#burger").on('click', function(){
        console.log('click')
        document.getElementById("nav").style.transform = "translateX(0%)"
        $(".nav").delay(50).promise().done(function(){
            $(".x").css("display", "block");
            // $(".navLink").css("display", "flex");
        });
        $("section").css("filter", "blur(4px)");
        $("#pickedCard").css("filter", "blur(4px)");
    });

    // when x is clicked, close nav
    $(".x").on('click', function(){
        $(".x").css("display", "none");
        // $(".navLink").css("display", "none");
         document.getElementById("nav").style.transform = "translateX(-100%)"

         $("section").css("filter", "blur(0px)");
    });  
})


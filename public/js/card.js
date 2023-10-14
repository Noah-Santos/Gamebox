$(function(){
    // if(sessionStorage.getItem('turn') != 0){
    //     $('#btnDiv').css('display', 'none');
    //     $('#boards').css('width', '150%');
    // }else{
    //     $('#btnDiv').css('display','flex');
    // } 
    $('#btnDiv').css('display','flex');
    

    // blurs the screen until the start button is clicked
    // also makes sure that the nav doesn't unblur everything until game starts
    let started = false;
    $('section').css("filter", "blur(4px)");
    $('#btnDiv').css("filter", "blur(0px)");
    $('#btnDiv').on('click', function(){
        $('section').css("filter", "blur(0px)"); 
        started = true; 
    })  


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
        
        // prevents everything from unblurring until the game starts
        if(started){
            $("section").css("filter", "blur(0px)");
            $("#pickedCard").css("filter", "blur(0px)");
        }
        $('#btnDiv').css("filter", "blur(0px)")
    });  
})

// Declares each set cards

// dipslays the menu
let menu = false;
function headerClick(){
    if (menu == false){
        menu = true;
        document.getElementById("menu").style.display = "flex";
    } else if (menu == true){
        menu = false;
        document.getElementById("menu").style.display = "none";
    }
}


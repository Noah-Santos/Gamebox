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
let cards1 = ["card1.1", "card1.2", "card1.3", "card1.4", "card1.5", "card1.6", "card1.7", "card1.8", "card1.9"];
let cards2 = ["card2.1", "card2.2", "card2.3", "card2.4", "card2.5", "card2.6", "card2.7", "card2.8", "card2.9"];

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


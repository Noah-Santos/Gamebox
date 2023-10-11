$(function(){
    // blurs the screen until the start button is clicked
    // also makes sure that the nav doesn't unblur everything until game starts
    let started = false;
    $('section').css("filter", "blur(4px)");
    $('.btnDiv').css("filter", "blur(0px)")
    $('#btnDiv').on('click', function(){
        $('section').css("filter", "blur(0px)");   
        started = true; 
    })


    let picked = false;

    // makes the card follow the mouse at all times
    document.addEventListener("mousemove", card);

    $('#deck').on('click', function(e){
        // sets variable to true, indicating that a card is selected
        picked = true;
        console.log(picked)

        // displays the card
        $('#pickedCard').css('display', 'block');
    })

    function card(e){
        // sets position to the client x and y positon
        $('#pickedCard').css({
            left:  e.pageX - 90,
            top:   e.pageY - 123
        });
    }

    // indicates what the user is hovering over when the card is selected
    $('.card').on( "mouseenter", function(){
        if(picked){
            $(this).animate({opacity:.5}, 100);
        }
    }).on( "mouseleave", function(){
        if(picked){
            $(this).animate({opacity:1}, 100);
        }
    })

    if(picked){
        $('.card').on('click', function(){

        })
    }






    // jquery for the nav
    
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
        
        // prevents everything from unblurring until the game starts
        if(started){
            $("section").css("filter", "blur(0px)");
            $("#pickedCard").css("filter", "blur(0px)");
        }
        $('.btnDiv').css("filter", "blur(0px)")
    });  
})

// Declares each set cards
let cards1 = ["card1.1", "card1.2", "card1.3", "card1.4", "card1.5", "card1.6", "card1.7", "card1.8", "card1.9"];
let cards2 = ["card2.1", "card2.2", "card2.3", "card2.4", "card2.5", "card2.6", "card2.7", "card2.8", "card2.9"];

// onclick for the main start button
let playerTurn = 0;
function btnChange(){
    if(playerTurn === 0){
        document.getElementById("btnDiv").style.width = "20vw";
        document.getElementById("btnDiv").style.fontSize = "20px";
        document.getElementById("btnDiv2").style.transform = "translate(0px, -5vh)";
        document.getElementById("mainBTN").innerHTML = "Player 1's Turn";
        document.getElementById("boards").style.width = "150%";
        playerTurn = 1;
    } else if(playerTurn === 1){
        document.getElementById("mainBTN").innerHTML = "Player 2's Turn";
        playerTurn = 2;
        document.getElementById("boards").style.transform = "translate(-50vw,0px)";
    } else if (playerTurn === 2){
        document.getElementById("mainBTN").innerHTML = "Player 1's Turn";
        playerTurn = 1;
        document.getElementById("boards").style.transform = "translate(0vw,0px)";
    }
}

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


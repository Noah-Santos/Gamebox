$(function(){
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
})


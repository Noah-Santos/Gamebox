$(function(){
    let deckId = sessionStorage.getItem('deck');
    let started = false;
    let picked = false;
    let moves = 0;
    let finished = false;
    let firstTurns = false;
    let firstMove = false;
    let turns;
    let draw;
    let replace;
    let playerOneScore = 0;
    let playerTwoScore = 0;
    let playerOne =[
        ['x','x','x'],['x','x','x'],['x','x','x']
    ];
    let playerTwo =[
        ['x','x','x'],['x','x','x'],['x','x','x']
    ];
    let playerOneImg =[
        ['x','x','x'],['x','x','x'],['x','x','x']
    ];
    let playerTwoImg =[
        ['x','x','x'],['x','x','x'],['x','x','x']
    ];
    let discard = ['x','https://www.deckofcardsapi.com/static/img/back.png'];
    let cards1 = [["card1.1", "card1.2", "card1.3"], ["card1.4", "card1.5", "card1.6"], ["card1.7", "card1.8", "card1.9"]];
    let cards2 = [["card2.1", "card2.2", "card2.3"], ["card2.4", "card2.5", "card2.6"], ["card2.7", "card2.8", "card2.9"]];

    // makes sure that the game has started
    $('#btnDiv').on('click', function(){ 
        started = true; 
        turns = 1;
    })

    // keeps track of which cards have been clicked already
    let chosenCards = [];
    // keeps track of turn every click
    $('.playArea').on('click', async function(){
        console.log($(this).attr('src'))
        replace = $(this).attr('src');
        $('#discardPile').css('pointer-events', 'auto');
        if(started){
            // console.log(chosenCards);
            // console.log($(this).attr('id'))
            
            // $(this).css('display', 'none');
            if(!picked){
                draw = await fetch(`https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`).then(response =>{return response.json()});
            }
            
            // console.log(`it is turn ${turns}`)
            // console.log(draw)
            // console.log(draw.cards[0])
            // console.log(draw.cards.image)
            // if it is the first turn, let player flip three cards
            if(turns == 1 && sessionStorage.getItem('start')){
                let inArr = false;
                for(let i = 0; i < chosenCards.length; i++){
                    if($(this).attr('id') == chosenCards[i]){
                        inArr = true;
                    }
                }
                if(!inArr){
                    // console.log('passed1')
                    moves++;
                    $(this).attr('src', draw.cards[0].image).animate({opacity:1}, 100);
                    chosenCards.push($(this).attr('id'));
                    // gets the location of the card and updates the array
                    for(let i = 0; i < cards1.length; i++){
                        for(let j = 0; j < cards1[i].length; j++){
                            if($(this).attr('id') == cards1[i][j]){
                                cardUpdate(i,j,1,false);
                            }
                        }
                    }
                }
                

                if(moves == 3){
                    moves = 0;
                    turns++;

                    // slides screen over to player 2
                    setTimeout(function(){
                        document.getElementById("boards").style.transform = "translate(-50vw,0px)";
                    }, 500);
                    
                    // console.log(turns);
                }

            // makes sure that a card is picked
            }else if(turns %2 == 1 && picked && sessionStorage.getItem('start')){
                $('#deck').css('pointer-events', 'auto');
                moves = 0;
                turns++;
                // gets the location of the card and updates the array
                for(let i = 0; i < cards1.length; i++){
                    for(let j = 0; j < cards1[i].length; j++){
                        if($(this).attr('id') == cards1[i][j]){
                            cardUpdate(i,j,1,true);
                            // discardPileUpdate();
                        }
                    }
                }
                
                // set image to the drawn card and hides drawn card
                $(this).attr('src', $('#pickedCard').attr('src')).animate({opacity:1}, 100);
                $('#pickedCard').css('display', 'none');

                // slides screen over to player 2
                setTimeout(function(){
                    document.getElementById("boards").style.transform = "translate(-50vw,0px)";
                }, 500);
                picked = false;
                firstMove = false;

            // if it is the second turn, let player flip three cards
            }else if(turns == 2 && sessionStorage.getItem('start')){
                let inArr = false;
                for(let i = 0; i < chosenCards.length; i++){
                    if($(this).attr('id') == chosenCards[i]){
                        inArr = true;
                    }
                }
                if(!inArr){
                    // console.log('passed1')
                    moves++;
                    $(this).attr('src', draw.cards[0].image).animate({opacity:1}, 100);
                    chosenCards.push($(this).attr('id'));
                    // gets the location of the card and updates the array
                    for(let i = 0; i < cards2.length; i++){
                        for(let j = 0; j < cards2[i].length; j++){
                            if($(this).attr('id') == cards2[i][j]){
                                cardUpdate(i,j,2,false);
                            }
                        }
                    }
                }
                

                if(moves == 3){
                    moves = 0;
                    turns++;

                    // slides screen over to player 1
                    setTimeout(function(){
                        document.getElementById("boards").style.transform = "translate(00vw,0px)";
                    }, 500);
                    firstTurns = true;
                    
                    // console.log(turns);
                }

            // makes sure that a card is picked
            }else if(turns %2 == 0 && picked && sessionStorage.getItem('start')){
                $('#deck').css('pointer-events', 'auto');
                moves = 0;
                turns++;
    
                // set image to the drawn card and hides drawn card
                $(this).attr('src', $('#pickedCard').attr('src')).animate({opacity:1}, 100);
                $('#pickedCard').css('display', 'none');
                // gets the location of the card and updates the array
                for(let i = 0; i < cards2.length; i++){
                    for(let j = 0; j < cards2[i].length; j++){
                        if($(this).attr('id') == cards2[i][j]){
                            cardUpdate(i,j,2, true);
                            // discardPileUpdate();
                        }
                    }
                }

                // slides screen over to player 1
                setTimeout(function(){
                    document.getElementById("boards").style.transform = "translate(0vw,0px)";
                }, 500);
                picked = false;
                firstMove = false;
            }
        }
        checkWinner();

        if(finished){
            // zooms board back to normal
            setTimeout(function(){
                document.getElementById("boards").style.transform = "translate(0vw,0px)";
                document.getElementById("boards").style.width = "100%";
            }, 1000);
        }
        
    });

    
    // makes the card follow the mouse at all times
    document.addEventListener("mousemove", card);
    $('#deck').on('click', async function(e){
        // console.log('click')
        // makes sure the first opening moves are done first
        if(firstTurns && !firstMove){
            // console.log('work')
            // sets variable to true, indicating that a card is selected
            picked = true;
            // console.log(picked)
            // sets pciked card image to a drawn card image
            draw = await fetch(`https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`).then(response =>{return response.json()});
            $('#pickedCard').attr('src', draw.cards[0].image);
            // console.log('draw')
            // displays the card
            $('#pickedCard').css({display: 'block', filter: 'blur(0px)'});
            // console.log('ayy')
            // $('#deck').css('pointer-events', 'none');
            firstMove = true;
        }else if(firstMove){
            $('#deck').css('pointer-events', 'none');
        }
    })

    if($('#discardPile').attr('src') == 'https://www.deckofcardsapi.com/static/img/back.png'){
        
    }
    $('#discardPile').on('click', async function(){
        // console.log(firstMove)
        // lets player discard the card they drew and switch turns
        if(picked){
            $('#discardPile').attr('src', $('#pickedCard').attr('src'));
            $('#pickedCard').css({display: 'none'});
            if(turns % 2 == 1){
                turns++;
                setTimeout(function(){
                    document.getElementById("boards").style.transform = "translate(-50vw,0px)";
                }, 500);
            }else if(turns % 2 == 0){
                turns++;
                setTimeout(function(){
                    document.getElementById("boards").style.transform = "translate(0vw,0px)";
                }, 500);
            }
            firstMove = false;
            picked = false;
            $(this).animate({opacity:1}, 50);

        }else if(firstTurns && !firstMove && turns > 3){
            // console.log('yes');
            // set the picled card to the card that is on top
            $('#pickedCard').attr('src', $(this).attr('src'));
            $('#pickedCard').css({display: 'block'});
            $(this).attr('src', 'https://www.deckofcardsapi.com/static/img/back.png');
            draw.cards[0].image = discard[1];
            draw.cards[0].value = discard[0];

            // displays the card
            // $('#pickedCard').css({display: 'block', filter: 'blur(0px)'});
            $(this).css('pointer-events', 'none');
            firstMove = true;
            picked = true;
        }else{
            // $('#deck').attr('src', $('#pickedCard').attr('src'));
        }
    })
    

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

    // if(picked){
    //     $('.card').on('click', function(){

    //     })
    // }
    
    // updates the grids of both players
    function cardUpdate(row, col, player, run){
        // if the card replaced is not blank, set the discard pile value to the value and image of the replaced card
        console.log(replace)
        if(replace != 'https://www.deckofcardsapi.com/static/img/back.png'){
            if(player == 1){
                discard[0] = playerOne[row][col];
                discard[1] = playerOneImg[row][col];
            }else{
                discard[0] = playerTwo[row][col];
                discard[1] = playerTwoImg[row][col];
            }
        }

        // updates the players grid
        if(player == 1){
            playerOne[row][col] = draw.cards[0].value;
            playerOneImg[row][col] = draw.cards[0].image;
        }else{
            playerTwo[row][col] = draw.cards[0].value;
            playerTwoImg[row][col] = draw.cards[0].image;
        }
        console.log(playerOne)
        console.log(playerTwo);

        // determines if the discard pile needs to be updated or not
        if(run){
            discardPileUpdate();
        }
    }

    // updates the discard pile
    async function discardPileUpdate(){
        // if the card replaced has no value yet, draw new card to replace the discard pile
        if(replace == 'https://www.deckofcardsapi.com/static/img/back.png' || replace == undefined){
            console.log('true');
            draw = await fetch(`https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`).then(response =>{return response.json()});
            discard[0] = draw.cards[0].value;
            discard[1] = draw.cards[0].image;
        }
        // console.log(discard);

        if(discard[1] == 'x'){
            $('#discardPile').attr('src', 'https://www.deckofcardsapi.com/static/img/back.png');
        }else{
            $('#discardPile').attr('src', discard[1]);
        }
        
        firstMove = false;
    }

    function card(e){
        // sets position to the client x and y positon
        $('#pickedCard').css({
            left:  e.pageX - 90,
            top:   e.pageY - 123
        });
    }

    // checks to see if the game is over
    function checkWinner(){
        let countOne = 0;
        let countTwo = 0;
        // checks if the either of the player grids are full or not
        for(let i = 0; i < playerOne.length; i++){
            for(let j = 0; j < playerOne[i].length; j++){
                if(playerOne[i][j] != 'x'){
                    countOne++;
                }
                if(playerTwo[i][j] != 'x'){
                    countTwo++;
                }
            }
        }
        if(countOne == 9 || countTwo == 9){
            console.log('Game over')
            sumScore();
            finished = true;
        }
    }

    // sums the score of the boards
    async function sumScore(){
        // zooms board back to normal
        // document.getElementById("boards").style.transform = "translate(0vw,0px)";
        // document.getElementById("boards").style.width = "100%";
        // prevents the game from continuing
        $('#deck').css('pointer-events', 'none');
        $('#discardPile').css('pointer-events', 'none');

        for(let i = 0; i < cards1.length; i++){
            for(let j = 0; j < cards1[i].length; j++){
                draw = await fetch(`https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`).then(response =>{return response.json()});
                // if the slot is empty, draw a card to fill the spot
                if(playerOne[i][j] == 'x'){
                    $(`#${cards1[i][j]}`).attr('src', draw.cards[0].image);
                    playerOne[i][j] = draw.cards[0].value;
                }
                // sets the value for face cards and aces
                if(playerOne[i][j] == 'JACK' || playerOne[i][j] == 'QUEEN' || playerOne[i][j] == 'KING'){
                    playerOne[i][j] = 10;
                }else if(playerOne[i][j] == 'ACE'){
                    playerOne[i][j] = 1;
                }
                playerOneScore += Number(playerOne[i][j]);

                // if the slot is empty, draw a card to fill the spot
                if(playerTwo[i][j] == 'x'){
                    console.log(draw.cards[0].image)
                    console.log(cards2[i][j])
                    console.log($(`#${cards2[i][j]}`))
                    // document.findElementById(`${cards2[i][j]}`).src = `${draw.cards[0].image}`
                    $(`#${cards2[i][j]}`).attr('src', `${draw.cards[0].image}`);
                    console.log('success')
                    playerTwo[i][j] = draw.cards[0].value;
                }
                // sets the value for face cards and aces
                if(playerTwo[i][j] == 'JACK' || playerTwo[i][j] == 'QUEEN' || playerTwo[i][j] == 'KING'){
                    playerTwo[i][j] = 10;
                }else if(playerTwo[i][j] == 'ACE'){
                    playerTwo[i][j] = 1;
                }
                playerTwoScore += Number(playerTwo[i][j]);
            }
        }
        if(playerOneScore < playerTwoScore){
            document.getElementById(`winner`).innerHTML = 'Player wins';
        }else if(playerOneScore > playerTwoScore){
            document.getElementById(`winner`).innerHTML = 'Guest wins';
        }else{
            document.getElementById(`winner`).innerHTML = 'Tie';
        }
        console.log(`Player one score: ${playerOneScore}`)
        console.log(`Player two score: ${playerTwoScore}`)
    }
    
})








// function to get a new deck
async function getDeck(){
    // get new shuffled deck
    let deck = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1').then(response =>{return response.json()});
    // console.log(deck);

    // get deck id
    let deck_id = deck.deck_id;
    // console.log(deck_id);

    // draw a card
    // let draw = await fetch(`https://www.deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`).then(response =>{return response.json()});
    // console.log(draw);
    sessionStorage.setItem('deck', deck_id);

    // print value and suit of chosen card
    // let value = draw.cards[0].value;
    // let suit = draw.cards[0].suit;
    // console.log(`${value} of ${suit}`);
}

// resets the turn to one if the game is started
function newGame(){
    sessionStorage.setItem('turn', 1);
}

// onclick for the main start button
function btnChange(){
    // if(playerTurn === 0){
    //     document.getElementById("btnDiv").style.width = "20vw";
    //     document.getElementById("btnDiv").style.fontSize = "20px";
    //     document.getElementById("btnDiv2").style.transform = "translate(0px, -5vh)";
    //     document.getElementById("mainBTN").innerHTML = "Player 1's Turn";
    //     document.getElementById("boards").style.width = "150%";
    //     playerTurn = 1;
    // } else if(playerTurn === 1){
    //     document.getElementById("mainBTN").innerHTML = "Player 2's Turn";
    //     playerTurn = 2;
    //     document.getElementById("boards").style.transform = "translate(-50vw,0px)";
    // } else if (playerTurn === 2){
    //     document.getElementById("mainBTN").innerHTML = "Player 1's Turn";
    //     playerTurn = 1;
    //     document.getElementById("boards").style.transform = "translate(0vw,0px)";
    // }
    document.getElementById("btnDiv").style.display = "none";
    document.getElementById("boards").style.width = "150%";
    sessionStorage.setItem('start', true);
}
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

// function to keep track of moves
function moveCount(moves){
    return moves++; 
}

$(function(){
    let started = false;
    let moves = 0;
    let turns;
    $('#btnDiv').on('click', function(){ 
        started = true; 
        turns = sessionStorage.getItem("turn");
    })

    $('.card').on('click', function(){
        if(started){
            $(this).css('display', 'none');
            if(turns % 2 == 1 && sessionStorage.getItem('start')){
                // if it is the first turn, let player flip three cards
                if(turns == 1){
                    moves++;
                    if(moves == 3){
                        moves = 0;
                        // sessionStorage.setItem('turn', turns++);
                        turns++;
                        // slides screen over to player 2
                        document.getElementById("boards").style.transform = "translate(-50vw,0px)";
                        console.log(turns);
                    }
                }else if (turns % 2 == 1){
                    moves = 0;
                    // sessionStorage.setItem('turn', turns++);
                    turns++;
                    // slides screen over to player 2
                    document.getElementById("boards").style.transform = "translate(-50vw,0px)";
                }

            }else if (turns % 2 == 0){
                // if it is second turn, allow player to flip three cards
                if(turns == 2){
                    moves++;
                    if(moves == 3){
                        moves = 0;
                        // sessionStorage.setItem('turn', turns++);
                        turns++;
                        // slides screen over to player 1
                        document.getElementById("boards").style.transform = "translate(0vw,0px)";
                    }
                }else{
                    moves = 0;
                    // sessionStorage.setItem('turn', turns++);
                    turns++;
                    // slides screen over to player 1
                    document.getElementById("boards").style.transform = "translate(0vw,0px)";
                }
            }
        }
    });
    
    

})

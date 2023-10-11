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
        document.getElementById("abc123").style.width = "150%";
        playerTurn = 1;
    } else if(playerTurn === 1){
        document.getElementById("mainBTN").innerHTML = "Player 2's Turn";
        playerTurn = 2;
        document.getElementById("abc123").style.transform = "translate(-50vw,0px)";
    } else if (playerTurn === 2){
        document.getElementById("mainBTN").innerHTML = "Player 1's Turn";
        playerTurn = 1;
        document.getElementById("abc123").style.transform = "translate(0vw,0px)";
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
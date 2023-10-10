let playerTurn = 0;
function btnChange(){
    if(document.getElementById("mainBTN").innerHTML == "Start Game"){
        playerTurn = 1;
        return document.getElementById("mainBTN").innerHTML = "Player 1's Turn";
    } else if (document.getElementById("mainBTN").innerHTML == "Player 1's Turn"){
        playerTurn = 2;
        return document.getElementById("mainBTN").innerHTML = "Player 2's Turn";
    } else {
        playerTurn = 1;
        return document.getElementById("mainBTN").innerHTML = "Player 1's Turn";
    }
}
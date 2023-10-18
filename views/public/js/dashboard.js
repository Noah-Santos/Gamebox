$(function(){

    // refreshes the leaderboard
    fetchPeople();

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

const fetchPeople = async() =>{
    let currentEmail = sessionStorage.getItem('currentUserEmail');
    console.log(currentEmail)
    try {
        const {data} = await axios.get('/users/getUser');
        let currentUser;
        console.log(data);

        // going through the data array and getting the data that holds the value of data
        const leaderBoard = data.map((user)=>{
            let temp = [`${user.first_name} ${user.last_name}`, `${user.wins}`];
            // gets the data of the current email
            if(user.email == currentEmail){
                currentUser = user;
            }
            return temp;
        })
        // sorts the numbers in numerical order
        leaderBoard.sort(compareNumbers);
        console.log(leaderBoard)

        // sets the user info
        document.querySelector('#username').innerHTML = `${currentUser.first_name} ${currentUser.last_name}`;
        document.querySelector('#userGame').innerHTML = `Games: ${currentUser.games}`;
        document.querySelector('#userWins').innerHTML = `Wins: ${currentUser.wins}`;
        document.querySelector('#userLoses').innerHTML = `Loses: ${currentUser.loses}`;
        document.querySelector('#userTies').innerHTML = `Ties: ${currentUser.ties}`;

        // results.innerHTML = task.join("");

        // change();
        // newTask.value = '';
        // newDesc.value = '';
        // newAssign.value = '';
    }catch(e){
        // formAlert.textContent = e.response.data.msg;
        console.log(e);
    }
}

// used to sort the numbers
function compareNumbers(a, b) {
  return a - b;
}


//html 
const allSquares = document.querySelectorAll(".gridSquare"); // returns all grid elements
const playerOneScore = document.getElementById("info__player__score1");
const playerTwoScore = document.getElementById("info__player__score2");

const instructionsText = document. getElementById("instructions-text");
const startGameBtn = document.getElementById("instructions-btn");

const modal = document.getElementById("modal");

//variables
let grid = [2,2,2,2,2,2,2,2,2]; // 3 states-> 0 : cross there , 1 : circle there , 2 : nothing 

const players = [
    {
        name: "jack",
        wins: 0,
    },
    {
        name : "jill",
        wins: 0,
    },
];

let didAnyOneWin = false;
let countOfMoves = 0;
let isCircleFlag = false;

//functions
//Square

function addSquareClick() {
    allSquares.forEach(
        (square, idx) => {
            square.addEventListener("click" , () => {
                squareClick(square, idx);
            });
         });
}

function squareClick(square, idx) {
    let currSq = grid[idx];
    if(!didAnyOneWin && grid[idx] == 2) { //still vacant if it is 2
        if(!isCircleFlag){
            //add cross
            square.classList.add("cross");
            grid[idx] = 0;

        } else {
            //add circle
            square.classList.add("circle");
            grid[idx] = 1;
        }

        incrementMove();

    }
}

function incrementMove() {
    countOfMoves += 1;
    isCircleFlag = !isCircleFlag;
    let nextplayer = 0;
    if(isCircleFlag){
        nextplayer = 1;
    }
    let nextplayerName = players[nextplayer].name 
    instructionsText.innerHTML = `${nextplayerName}'s turn`;
    checkForWin();
    checkForTie();
}

function checkForWin() {
    //check the column
    let winScenarios = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (const winScenario of winScenarios) {
        let firstSqVal = grid[winScenario[0]];
        if (
            firstSqVal != 2 &&
            grid[winScenario[1]] === firstSqVal &&
            grid[winScenario[2]] === firstSqVal
        ) {
            didAnyOneWin = true;
            currPlayerWon();
            break;
        }
    }
}

function currPlayerWon() {
    if(!isCircleFlag){
        //circle player won
        players[1].wins += 1;
        playerTwoScore.innerHTML = players[1].wins;
        instructionsText.innerHTML = `${players[1].name} won!`;
    } else {
        players[0].wins += 1;
        playerOneScore.innerHTML = players[0].wins;
        instructionsText.innerHTML = `${players[0].name} won!`;
    }
    continueGame();
}

function checkForTie() {
    if (countOfMoves === 9 && !didAnyOneWin) {
      instructionsText.innerHTML = "It's a Tie";
      continueGame();
    }
  }

function continueGame() {
    setTimeout(
        () => { resetGame(); }, 2000);
}

function resetGame() {
    grid.fill(2);
    allSquares.forEach( (square) => square.classList = ("gridSquare") );
    addSquareClick();
    didAnyOneWin = false;
    isCircleFlag = false;
    countOfMoves = 0;
    let nextplayer = players[0].name;
    instructionsText.innerHTML = `${nextplayer}'s turn`;
}

function startGame() {
    startGameBtn.addEventListener("click", () => {
        modal.style.display = "flex";
    });

    const form = document.querySelector("form");
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const player1Input = document.getElementById("player1").value.trim().toLowerCase();
        const player2Input = document.getElementById("player2").value.trim().toLowerCase();

        const player1Name = player1Input.charAt(0).toUpperCase() + player1Input.slice(1);
        const player2Name = player2Input.charAt(0).toUpperCase() + player2Input.slice(1);

        players[0].name = player1Name;
        players[0].wins = 0;

        players[1].name = player2Name;
        players[1].wins = 0;
        
        console.log("Players 0  = " + players[0].name);

        if(player1Input === "jinay") {
            // document.getElementById("info_player_name1").innerHTML = `${players[0].name} <img src='./images/crown.png' width='20px' height='15px'>`;
            document.getElementById(
                "info__player__name1"
              ).innerHTML = `${players[0].name}
                <img src='./images/crown.png' width='20px' height='15px'>`;
        } else {
            document.getElementById("info__player__name1").innerHTML = players[0].name;
        }

        document.getElementById("info__player__name2").innerHTML = players[1].name;

        playerOneScore.innerHTML = players[0].wins;
        playerTwoScore.innerHTML = players[1].wins;
        instructionsText.innerHTML = `${players[0].name}'s turn to start`;
        modal.style.display = "none";
        startGameBtn.innerHTML = "Restart Gamey";
        addSquareClick();
        resetGame();
        form.reset();


    });
}

startGame();
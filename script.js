window.addEventListener("load", function() {
	//VARIABLES
	//-----------------------------
	var playerTurn = false; // determines player turns
	var totalMoves = 9; //total number of possible moves in one game
	var currentMove = 0; // tracks total moves for both players
	var playerWon = 0;  // tracks if player1 victory OR player 2 victory OR tied game per single game
	var player1Wins = 0; // stores total number of wins for player 1
	var player2Wins = 0; // stores total number of wins for player 2
	var player1Moves = []; // stores player 1's moves per game
	var player2Moves = []; // stores player 2's moves per game
	var tiles = document.getElementsByClassName("board-tile"); // stores an array/collection of all 'tic tac toe' game tiles
	var readyPlayer1 = document.getElementById("player-x-ready"); // stores HTML node containing notification that it is player 1's turn
	var readyPlayer2 = document.getElementById("player-o-ready"); // stores HTML node containing notification that it is player 2's turn
	var readyMessage = document.getElementsByClassName("ready-message"); // stores array/collection of all HTML nodes containing notification of player turns
	var victoryMessages = document.getElementsByClassName("victoryMessage"); // stores array/collection of all end game notifcations
	var winMoves = [ // stores nested array containing all possible 'tic'tac'toe winning combinations
	 ["tile-1-1", "tile-1-2", "tile-1-3"], // top, horizontal
	 ["tile-2-1", "tile-2-2", "tile-2-3"], // middle horizontal
	 ["tile-3-1", "tile-3-2", "tile-3-3"], // bottom horizontal
	 ["tile-1-1", "tile-2-1", "tile-3-1"], // left veritcal
	 ["tile-1-2", "tile-2-2", "tile-3-2"], // middle vertical
	 ["tile-1-3", "tile-2-3", "tile-3-3"], // right vertical
	 ["tile-1-1", "tile-2-2", "tile-3-3"], // left diagonal
	 ["tile-1-3", "tile-2-2", "tile-3-1"] // right diagonal
	 ];

	//FUNCTIONS
	//----------------------------------

	// function is core game mechanics. this function is bound to the event listener that is applied to each 'tic tac toe' tile.
	function playGame(){
		// function hides and shows appropriate message to notify each player when it is his or her turn
		hideReadyMessage()
		// removes the event listener so that the tile can no longer be clicked
		this.removeEventListener("click", playGame);
		// if variable playerTurn is false, it is the first player's turn
		if (playerTurn === false){
			playerGameActions(this, "X", player1Moves);
		// second player's turn
		} else {
			playerGameActions(this, "O", player2Moves);
		}
		// checks after each eventListener action to see if there is a winner or tied game
		playerTurn = !playerTurn;
		determineWinnerOrTie()
	}

	function playerGameActions(elem, text, playerMoves){
		elem.innerHTML = "<label>" + text + "</label>";
		playerMoves.push(elem.getAttribute('id'));
	}


	function winnerCheck(playerMoves){
		var isSuperset; // will eventually store boolean value
	  for(var i = 0; i < winMoves.length; i++){ // iterates through all possible willing combinations
	  	// function checks to see if player's moves array contains one of the winning combinations defined in winMoves Variable. Returns boolean "true" if it does
	  	isSuperset = winMoves[i].every(function(val) { return playerMoves.indexOf(val) >= 0; }); 
	  	if(isSuperset === true){
	      break; // if variable is true, breaks out of loop and does not check other possible combinations (only needs one to win)
	     }
	  }
	  if (isSuperset === true){
	  	//removes all remaining 'tic tac toe' tile event listeners in the event there is a winner. 
	  	for (var i = 0; i < tiles.length; i++){
	  		tiles[i].removeEventListener("click", playGame);
	  	}
	  	return true;
	  } else {
	  	return false;
	  }
	}

	// function handles score-keeping functionality and winner messages
	function determineWinnerOrTie(){
		//checks to see if player 1 won 
		if (winnerCheck(player1Moves) === true){
			determineWinnerOutput(1, document.getElementById("player-x-wins"), document.getElementById("x-score").innerHTML, player1Wins);			
		//checks to see if player2 won if player1 did not win
		} else if (winnerCheck(player2Moves) === true){
			determineWinnerOutput(2, document.getElementById("player-o-wins"), document.getElementById("o-score").innerHTML, player2Wins);	
		//checks to see if players have done all possible moves without declaring a winner. if both conditions are met, the program identifies a tied game
		} else if (currentMove >= totalMoves && playerWon === 0){
			determineWinnerOutput(0, document.getElementById("tie-game"), false, false);	
		} 
	}

	function determineWinnerOutput(playerWonValue, winMessage, winnerScore, winCounter){
		hideAllReadyMessages() 
		playerWon = playerWonValue;
		winMessage.classList.remove("hidden");
		winnerScore = ++winCounter;
		updateGameLog();
	}
	//function updates HTML node containing records of previous game outcomes
	function updateGameLog(){
		var gameLog = document.getElementById("game-log"); // stores HTML node that tracks the final outcome of all previous games
		var finishedGame = document.createElement("li"); // creates new list element
		var logText; // will be innerHTML/text for finishedGame
		if(playerWon === 1){
			logText = document.createTextNode("Player X won");
		} else if (playerWon === 2){
			logText = document.createTextNode("Player O won");
		} else {
			logText = document.createTextNode("Cat's game (tie)");
		}
		finishedGame.appendChild(logText); // adds game history text to li element
		gameLog.appendChild(finishedGame);  // adds li record to ol list
	}

	// binds newGameReset function with eventListener on each "Play Again" div
	function newGame() {
		var game = document.getElementsByClassName("new-game");
		for(var i = 0; i < game.length; i++){
			game[i].addEventListener("click", newGameReset);
		}
	};

	
	// binds playGame function with eventListener on each 'tic tac toe' tilefunction setUpGameTiles(){
	function	setUpGameTiles(){
		for (var i = 0; i < tiles.length; i++){
			tiles[i].innerHTML = "";
			tiles[i].addEventListener("click", playGame)
		}
	}

	//resets game variables for new game of tic tac toe
	function newGameReset(){
		setUpGameTiles()
		playerTurn = false;
		currentMove = 0;
		playerWon = 0;
		player1Moves = [];
		player2Moves = [];
		winnerRecord = [];

		//hides last game's victory or tie notification HTML node
		for (var i = 0; i < victoryMessages.length; i++){
			victoryMessages[i].classList.add("hidden");
		}
	}

	function hideReadyMessage(){
		currentMove++
		if (currentMove <= 0){
			readyPlayer1.classList.remove("visible");
		} else if(currentMove >= totalMoves) {
			hideAllReadyMessages()
		} else {
			hideAllReadyMessages()
			if (playerTurn === false){
				readyPlayer2.classList.remove("hidden");
			} else {
				readyPlayer1.classList.remove("hidden");
			}
		}
	}

	function hideAllReadyMessages(){
		for(var i = 0; i < readyMessage.length; i++){
			readyMessage[i].classList.add("hidden");
		}
	}

// PROGRAM
//------------------------------------
	setUpGameTiles()
	newGame()
});
window.addEventListener("load", setUpPage);

function setUpPage() {
		var tiles = document.getElementsByClassName("board-tile");
		for (var i = 0; i < tiles.length; i++ ){
			tiles[i].addEventListener("click", changeToX())
		}
}
  // initialize whatever variables you need and add your event listeners
  // you can (but probably shouldn't) define functions inside this function


	function changeToX() {
		this.innerHTML = "X";
	} 
	

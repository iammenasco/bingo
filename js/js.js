// See readme.txt for list of "To Do" items remaining
// All code created by Brian Menasco, Nathan Schultz, and Nathan Wilson
// JSON array of arrays for storing the tiles and options
var board = 
{"tiles": [
{"name": "Joseph Smith", "flipped": false, "tile": ""},
{"name": "1820", "flipped": false, "tile": ""},
{"name": "Restoration", "flipped": false, "tile": ""},
{"name": "Pillar of Light", "flipped": false, "tile": ""},
{"name": "Darkness", "flipped": false, "tile": ""},
{"name": "If any lack wisdom", "flipped": false, "tile": ""},
{"name": "Upstate Newyork", "flipped": false, "tile": ""},
{"name": "Palmyra", "flipped": false, "tile": ""},
{"name": "Moroni", "flipped": false, "tile": ""},
{"name": "Priesthood", "flipped": false, "tile": ""},
{"name": "First Vision", "flipped": false, "tile": ""},
{"name": "Apostasy", "flipped": false, "tile": ""},
{"name": "Hyrum Smith", "flipped": false, "tile": ""},
{"name": "Book of Mormon", "flipped": false, "tile": ""},
{"name": "Dispensation", "flipped": false, "tile": ""},
{"name": "Doctrine of Christ", "flipped": false, "tile": ""},
{"name": "Prophet", "flipped": false, "tile": ""},
{"name": "Amos 3:7", "flipped": false, "tile": ""},
{"name": "Moroni 10:3&#45;5", "flipped": false, "tile": ""},
{"name": "Pray", "flipped": false, "tile": ""},
{"name": "Baptized", "flipped": false, "tile": ""},
{"name": "Laying on of Hands", "flipped": false, "tile": ""},
{"name": "Saints", "flipped": false, "tile": ""},
{"name": "Revealed", "flipped": false, "tile": ""},
{"name": "Gospel", "flipped": false, "tile": ""}
],
"options": [
{"freespace": true, "category": "restoration", "save": false}
]
};
function createBoard() {
	// Randomize the array of tiles in json object
	board.tiles.sort(function () {
		return Math.random(Math.random()) - 0.5;
	});
	// Assign the tile ID to an item on the board array
	for (var i = 0; i < board.tiles.length; i ++){
		board.tiles[i].tile = i + 1;
		var html = board.tiles[i].name;
		document.getElementById(i + 1).innerHTML = html;
	}
	// Run freeSpace
	freeSpace();
}
// Load onClick: If the tile is flipped, but it back to flipped=false
// If the tile is not flipped, but it to flipped=ture
function flip(div, id) {
	if (id == '13') {
		return null;
	}else if (board.tiles[id - 1].flipped == true) {
		div.style.webkitTransform = 'rotatey(0deg)';
		div.style.backgroundImage="url('images/tile.png')";
		div.style.color = "white";
		board.tiles[id - 1].flipped = false;
	} else {
		div.style.webkitTransform = 'rotatey(180deg)';
		div.style.backgroundImage="url('images/clicked.png')";
		div.style.color = "#666699";
		board.tiles[id - 1].flipped = true;
	}
	save();
}
// Check to see if the player wants the freespace or not.
function freeSpace() {
	if (board.options[0].freespace == true) {
		// document.getElementById("freeCheck").checked = true;
		document.getElementById("13").innerHTML = "Free Space!";
		var free = document.getElementById(13);
		free.style.backgroundImage="url('images/clicked.png')";
		free.style.webkitTransform = 'rotatey(360deg)';
		free.style.color = "#666699";
	}
}
// Save the json object array
function save() {
	localStorage.setItem('board', JSON.stringify(board));
}
var loadedboard;
// load the json object array, and check if flipped
function load() {
	if (localStorage.getItem('board') == null) {
		createBoard();
	} else {
		if (loadedboard != "cleared") {
			loadedboard = localStorage.getItem('board');
			board = JSON.parse(loadedboard);
			for (var i = 0; i <= 24; i++) {
				var id = board.tiles[i].tile;
				document.getElementById(id).innerHTML = board.tiles[i].name;
				if (board.tiles[i].flipped == true) {
					var div = document.getElementById(id);
					div.style.webkitTransform = 'rotatey(360deg)';
					div.style.backgroundImage="url('images/clicked.png')";
					div.style.color = "#666699";
				}
			}
			freeSpace();
		}
	}
}
// Remove the board from the local storage
function clearSave() {
	localStorage.removeItem("board");
	loadedboard = "cleared";
	createBoard();
}
// Clear the board of flipped tiles/set all flipped statuses to false
function newGame() {
	for (i = 1; i <= 25; i++) {
		div = document.getElementById(i);
		div.style.webkitTransform = 'rotatey(0deg)';
		div.style.backgroundImage="url('images/tile.png')";
		div.style.color = "white";
		board.tiles[i - 1].flipped = false;
	}
	clearSave();
}
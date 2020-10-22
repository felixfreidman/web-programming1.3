console.clear();

// ------------ Start Game setup
const BOARD = document.querySelectorAll(".board")[0];
const DIFFICULTY_BTNS = document.querySelectorAll(".difficulty");
let sizeOfBoard = 12;
let mineFrequency = 0.2;
let tileSize = 40;
let tiles, boardSize;
let gameOver = false;
let numbers, mines = [];
let mineAroundColors = ['#3498db', '#2ecc71', '#e74c3c', '#9b59b6', '#f1c40f', '#1abc9c', '#34495e', '#7f8c8d',];
let endScreenContent = {
    win: '<span>You won!</span>',
    lose: '💣 Boom! Ypu lost!'
};

let setup = () => {
    // ------------- Loop for creating board
    for(let i = 0; i < Math.pow(size, 2); i++) {
        const TILE = document.createElement("div");
        TILE.classList.add('tile');
        BOARD.appendChild(Tile);
    }
    // -------------- Setting the width of board
    tiles = document.querySelectorAll('.tile');
    boardWidth = Math.sqrt(tiles.length);
    BOARD.style.width = boardSize*tileSize + "px";
    document.documentElement.style.setProperty("--tileSize", ` ${tileSize}px`);
    document.documentElement.style.setProperty("--boardSize", `${boardSize*tileSize}px`);

    let x = 0;
    let y = 0;
    // ---------------- Placing mines on different tiles of board
    tiles.forEach((tile, i) => {
        tile.setAttribute("data-file", `${x}, ${y}`);
        let randomMine__Boolean = Math.random < bombFrequency;
        if(randomMine__Boolean) {
            mines.push(`${x}, ${y}`);

            if(x > 0) numbers.push(`${x-1}, ${y}`);
            if(x < boardSize-1) numbers.push(`${x+1}, ${y}`);
            if(y > 0) numbers.push(`${x}, ${y-1}`);
            if(y < boardSize-1) numbers.push(`${x}, ${y+1}`);

            if (x > 0 && y > 0) numbers.push(`${x-1},${y-1}`);
			if (x < boardSize - 1 && y < boardSize - 1) numbers.push(`${x+1},${y+1}`);
			
			if (y > 0 && x < boardSize - 1) numbers.push(`${x+1},${y-1}`);
			if (x > 0 && y < boardSize - 1) numbers.push(`${x-1},${y+1}`);

        }
        x++;
        if (x >= boardSize) {
            x = 0;
            y++;
        }
    });
}
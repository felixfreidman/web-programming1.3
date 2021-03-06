console.clear();

const BOARD = document.querySelectorAll(".board")[0];
const RESTART_BTN = document.querySelectorAll(".minesweeper-btn")[0];
const ENDSCREEN = document.querySelectorAll(".endscreen")[0];
let size = 12,
  mineFrequency = 0.15,
  tileSize = 40,
  gameOver = false,
  tiles,
  boardSize,
  mines = [],
  numbers = [],
  numberColors = [
    "white",
    "green",
    "red",
    "orange",
    "#yellow",
    "#blue",
    "#black",
    "#tranparent",
  ],
  endscreenContent = {
    win: "<span>You won!</span>",
    lose: "💣 Booom! Game over.",
  };

//  -------------- Start Game Setup
const clear = () => {
  gameOver = false;
  mines = [];
  numbers = [];
  ENDSCREEN.innerHTML = "";
  ENDSCREEN.classList.remove("show");
  tiles.forEach((tile) => {
    tile.remove();
  });

  setup();
};

const setup = () => {
  for (let i = 0; i < Math.pow(size, 2); i++) {
    const tile = document.createElement("div");
    tile.classList.add("tile");
    BOARD.appendChild(tile);
  }
  tiles = document.querySelectorAll(".tile");
  boardSize = Math.sqrt(tiles.length);
  BOARD.style.width = boardSize * tileSize +25 + "px";

  document.documentElement.style.setProperty("--tileSize", `${tileSize}px`);
  document.documentElement.style.setProperty(
    "--boardSize",
    `${boardSize * tileSize}px`
  );

  let x = 0;
  let y = 0;
  tiles.forEach((tile) => {
    tile.setAttribute("data-tile", `${x},${y}`);

    let random_boolean = Math.random() < mineFrequency;
    if (random_boolean) {
      mines.push(`${x},${y}`);
      if (x > 0) numbers.push(`${x - 1},${y}`);
      if (x < boardSize - 1) numbers.push(`${x + 1},${y}`);
      if (y > 0) numbers.push(`${x},${y - 1}`);
      if (y < boardSize - 1) numbers.push(`${x},${y + 1}`);

      if (x > 0 && y > 0) numbers.push(`${x - 1},${y - 1}`);
      if (x < boardSize - 1 && y < boardSize - 1)
        numbers.push(`${x + 1},${y + 1}`);

      if (y > 0 && x < boardSize - 1) numbers.push(`${x + 1},${y - 1}`);
      if (x > 0 && y < boardSize - 1) numbers.push(`${x - 1},${y + 1}`);
    }

    x++;
    if (x >= boardSize) {
      x = 0;
      y++;
    }

    tile.oncontextmenu = function (event) {
      event.preventDefault();
      flag(tile);
    };

    tile.addEventListener("click", function () {
      clickTile(tile);
    });
  });

  numbers.forEach((num) => {
    let coords = num.split(",");
    let tile = document.querySelectorAll(
      `[data-tile="${parseInt(coords[0])},${parseInt(coords[1])}"]`
    )[0];
    let dataNum = parseInt(tile.getAttribute("data-num"));
    if (!dataNum) dataNum = 0;
    tile.setAttribute("data-num", dataNum + 1);
  });
};
//------------- End Game Setup
// ------------ TSart Game Mechanics

const flag = (tile) => {
  if (gameOver) return;
  if (!tile.classList.contains("tile--checked")) {
    if (!tile.classList.contains("tile--flagged")) {
      tile.innerHTML = "🚩";
      tile.classList.add("tile--flagged");
    } else {
      tile.innerHTML = "";
      tile.classList.remove("tile--flagged");
    }
  }
};

const clickTile = (tile) => {
  if (gameOver) return;
  if (
    tile.classList.contains("tile--checked") ||
    tile.classList.contains("tile--flagged")
  )
    return;
  let coordinate = tile.getAttribute("data-tile");
  if (mines.includes(coordinate)) {
    endGame(tile);
  } else {
    let num = tile.getAttribute("data-num");
    if (num != null) {
      tile.classList.add("tile--checked");
      tile.innerHTML = num;
      tile.style.color = numberColors[num - 1];
      setTimeout(() => {
        checkVictory();
      }, 100);
      return;
    }

    checkTile(tile, coordinate);
  }
  tile.classList.add("tile--checked");
};

const checkTile = (tile, coordinate) => {
  console.log("Yeah, bitches!");
  let coords = coordinate.split(",");
  let x = parseInt(coords[0]);
  let y = parseInt(coords[1]);

  setTimeout(() => {
    if (x > 0) {
      let targetW = document.querySelectorAll(`[data-tile="${x - 1},${y}"`)[0];
      clickTile(targetW, `${x - 1},${y}`);
    }
    if (x < boardSize - 1) {
      let targetE = document.querySelectorAll(`[data-tile="${x + 1},${y}"`)[0];
      clickTile(targetE, `${x + 1},${y}`);
    }
    if (y > 0) {
      let targetN = document.querySelectorAll(`[data-tile="${x},${y - 1}"]`)[0];
      clickTile(targetN, `${x},${y - 1}`);
    }
    if (y < boardSize - 1) {
      let targetS = document.querySelectorAll(`[data-tile="${x},${y + 1}"]`)[0];
      clickTile(targetS, `${x},${y + 1}`);
    }

    if (x > 0 && y > 0) {
      let targetNW = document.querySelectorAll(
        `[data-tile="${x - 1},${y - 1}"`
      )[0];
      clickTile(targetNW, `${x - 1},${y - 1}`);
    }
    if (x < boardSize - 1 && y < boardSize - 1) {
      let targetSE = document.querySelectorAll(
        `[data-tile="${x + 1},${y + 1}"`
      )[0];
      clickTile(targetSE, `${x + 1},${y + 1}`);
    }

    if (y > 0 && x < boardSize - 1) {
      let targetNE = document.querySelectorAll(
        `[data-tile="${x + 1},${y - 1}"]`
      )[0];
      clickTile(targetNE, `${x + 1},${y - 1}`);
    }
    if (x > 0 && y < boardSize - 1) {
      let targetSW = document.querySelectorAll(
        `[data-tile="${x - 1},${y + 1}"`
      )[0];
      clickTile(targetSW, `${x - 1},${y + 1}`);
    }
  }, 10);
};
// ----------- End Game Mechanics

/* ----------- Start Game end */
const endGame = (tile) => {
  console.log("💣 Booom! Game over.");
  ENDSCREEN.innerHTML = endscreenContent.lose;
  ENDSCREEN.classList.add("show");
  gameOver = true;
  tiles.forEach((tile) => {
    let coordinate = tile.getAttribute("data-tile");
    if (mines.includes(coordinate)) {
      tile.classList.remove("tile--flagged");
      tile.classList.add("tile--checked", "tile--bomb");
      tile.innerHTML = "💣";
    }
  });
};

const checkVictory = () => {
  let win = true;
  tiles.forEach((tile) => {
    let coordinate = tile.getAttribute("data-tile");
    if (
      !tile.classList.contains("tile--checked") &&
      !mines.includes(coordinate)
    )
      win = false;
  });
  if (win) {
    ENDSCREEN.innerHTML = endscreenContent.win;
    ENDSCREEN.classList.add("show");
    gameOver = true;
  }
};

// -------- End Game End

/* The beginning */
setup();

// New Game
RESTART_BTN.addEventListener("click", function (event) {
  event.preventDefault();
  clear();
});

let data = {};
let speech;
let game;

function preload() {
  data = loadJSON("assets/words.json");
}

function setup() {
  createCanvas(800, 600);
  textSize(48);
  game = new Game(data["words"]);
}

function draw() {
  game.draw();
}

function keyReleased() {
  if (!game.won) {
    if (key == "Enter") {
      game.sayWord();
    } else {
      if (key.match(/^[A-Za-z]$/)) {
        game.checkLetter(key);
      }
    }
    return false;
  }
}

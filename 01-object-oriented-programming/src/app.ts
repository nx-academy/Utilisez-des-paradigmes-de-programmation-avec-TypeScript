class Game {
  gameState: string[];
  currentPlayer: string;
  isGameActive: boolean;

  constructor() {
    this.gameState = ["", "", "", "", "", "", "", "", ""];
    this.currentPlayer = "X";
    this.isGameActive = true;
  }
}

class App {
  game: Game;

  constructor() {
    this.game = new Game();
  }

  init(): void {
    window.alert("Let's start the game!");
  }
}

const app = new App();
app.init();

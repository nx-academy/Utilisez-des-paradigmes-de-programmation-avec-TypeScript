class Game {
  gameState: string[];
  currentPlayer: "X" | "Y";
  isGameActive: boolean;

  constructor() {
    this.gameState = ["", "", "", "", "", "", "", "", ""];
    this.currentPlayer = "X";
    this.isGameActive = true;
  }
}

class App {
  init(): void {
    window.alert("Let's start the game!");
  }
}

const game = new Game();
const app = new App();
app.init();

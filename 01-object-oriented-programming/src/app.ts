class Game {
  gameState: string[];
  currentPlayer: "X" | "Y";
  isGameActive: boolean;

  constructor() {
    this.gameState = ["", "", "", "", "", "", "", "", ""];
    this.currentPlayer = "X";
    this.isGameActive = true;
  }

  handleRestartGame(): void {
    this.isGameActive = true;
    this.currentPlayer = "X";
    this.gameState = ["", "", "", "", "", "", "", "", ""];

    console.log("Game restart")

    document.querySelectorAll(".cell").forEach((cell) => (cell.innerHTML = ""));
  }
}

class App {
  game: Game

  constructor() {
    this.game = new Game();
  }

  init(): void {
    //window.alert("Let's start the game!");

    document
      .querySelector(".game-restart")
      ?.addEventListener("click", () => this.game.handleRestartGame());
  }
}

const app = new App();
app.init();

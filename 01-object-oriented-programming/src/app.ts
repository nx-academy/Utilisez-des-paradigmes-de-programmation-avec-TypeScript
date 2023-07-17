class Messages {
  private static statusDisplay = document.querySelector(".game-status");

  public static displayWinningMessage(currentPlayer: string) {
    const message = `Player ${currentPlayer} has won!`;

    if (this.statusDisplay) {
      this.statusDisplay.innerHTML = message;
    }
  }

  public static displayDrawMessage() {
    const message = "Game ended in a draw";

    if (this.statusDisplay) {
      this.statusDisplay.innerHTML = message;
    }
  }

  public static displayCurrentPlayerTurn(currentPlayer: string) {
    const message = `It's ${currentPlayer}'s turn`;

    if (this.statusDisplay) {
      this.statusDisplay.innerHTML = message;
    }
  }
}

class Game {
  private gameState: string[];
  private currentPlayer: string;
  private isGameActive: boolean;

  private readonly winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  constructor() {
    this.gameState = ["", "", "", "", "", "", "", "", ""];
    this.currentPlayer = "X";
    this.isGameActive = true;
  }

  private handleCellPlayed(
    clickedCell: HTMLDivElement,
    clickedCellIndex: number,
  ): void {
    this.gameState[clickedCellIndex] = this.currentPlayer;
    clickedCell.innerHTML = this.currentPlayer;
  }

  private handlePlayerChanged(): void {
    this.currentPlayer = this.currentPlayer === "X" ? "O" : "X";
    Messages.displayCurrentPlayerTurn(this.currentPlayer);
  }

  private handleResultValidation(): void {
    let roundWon = false;
    for (let i = 0; i < this.winningConditions.length; i++) {
      const winCondition = this.winningConditions[i];
      const firstCell = this.gameState[winCondition[0]];
      const secondCell = this.gameState[winCondition[1]];
      const thirdCell = this.gameState[winCondition[2]];

      if (firstCell === "" || secondCell === "" || thirdCell === "") {
        continue;
      }

      if (firstCell === secondCell && secondCell === thirdCell) {
        roundWon = true;
        break;
      }
    }

    if (roundWon) {
      this.isGameActive = false;
      Messages.displayWinningMessage(this.currentPlayer);
      return;
    }

    if (!this.gameState.includes("")) {
      this.isGameActive = false;
      Messages.displayDrawMessage();
      return;
    }

    this.handlePlayerChanged();
  }

  public handleCellClick(clickedCellEvent: Event): void {
    const clickedCell = clickedCellEvent.target as HTMLDivElement;
    const clickedCellIndex = Number(
      clickedCell.getAttribute("data-cell-index"),
    );

    if (this.gameState[clickedCellIndex] !== "" || !this.isGameActive) {
      return;
    }

    this.handleCellPlayed(clickedCell, clickedCellIndex);
    this.handleResultValidation();
  }

  public handleRestartGame(): void {
    this.isGameActive = true;
    this.currentPlayer = "X";
    this.gameState = ["", "", "", "", "", "", "", "", ""];

    Messages.displayCurrentPlayerTurn(this.currentPlayer);

    document.querySelectorAll(".cell").forEach((cell) => (cell.innerHTML = ""));
  }
}

class App {
  game: Game;

  constructor() {
    this.game = new Game();
  }

  init(): void {
    document
      .querySelectorAll(".cell")
      .forEach((cell) =>
        cell.addEventListener("click", (e: Event) =>
          this.game.handleCellClick(e),
        ),
      );
    document
      .querySelector(".game-restart")
      ?.addEventListener("click", () => this.game.handleRestartGame());
  }
}

const app = new App();
app.init();

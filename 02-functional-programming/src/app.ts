type State = {
  gameState: string[];
  currentPlayer: string;
  isGameActive: boolean;
};

const WINNING_CONDITIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function createStore(): () => State {
  const state = {
    gameState: ["", "", "", "", "", "", "", "", ""],
    currentPlayer: "X",
    isGameActive: true,
  };

  function store(): State {
    return state;
  }

  return store;
}

function getCellClicked(clickedCellEvent: Event): [HTMLDivElement, number] {
  const clickedCell = clickedCellEvent.target as HTMLDivElement;
  return [clickedCell, Number(clickedCell.getAttribute("data-cell-index"))];
}

function updateStatus(fn: string): void {
  const $gameStatus = document.querySelector(".game-status");

  if ($gameStatus) {
    $gameStatus.innerHTML = fn;
  }
}

function getGameStatus(player: string): string {
  return `It's ${player}'s turn`;
}

function getWinningMessage(player: string): string {
  return `Player ${player} has won!`;
}

function getDrawMessage(): string {
  return "Game ended in a draw";
}

function handleValidation(board: string[]): {
  roundWon: boolean;
  isDraw: boolean;
} {
  let roundWon = false;
  let isDraw = false;

  for (let i = 0; i <= WINNING_CONDITIONS.length; i++) {
    const winCondition = WINNING_CONDITIONS[i];
    const firstCell = board[winCondition[0]];
    const secondCell = board[winCondition[1]];
    const thirdCell = board[winCondition[2]];

    if (firstCell === "" || secondCell === "" || thirdCell === "") {
      continue;
    }

    if (firstCell === secondCell && secondCell === thirdCell) {
      roundWon = true;
      break;
    }

    if (!board.includes("")) {
      isDraw = true;
    }
  }

  return {
    roundWon,
    isDraw,
  };
}

function game(): void {
  const store = createStore();
  const state = store();

  document.querySelectorAll(".cell").forEach((cell) =>
    cell.addEventListener("click", (e: Event) => {
      const [$cell, cellIndex] = getCellClicked(e);

      if (state.gameState[cellIndex] !== "" || !state.isGameActive) {
        return;
      }

      state.gameState[cellIndex] = state.currentPlayer;
      $cell.innerHTML = state.currentPlayer;

      updateStatus(getGameStatus(state.currentPlayer));

      const { roundWon, isDraw } = handleValidation(state.gameState);

      if (roundWon) {
        updateStatus(getWinningMessage(state.currentPlayer));
        return;
      }

      if (isDraw) {
        updateStatus(getDrawMessage());
        return;
      }

      state.currentPlayer = state.currentPlayer === "X" ? "O" : "X";
    }),
  );
}

function handleRestartGame(): void {
  document.querySelectorAll(".cell").forEach((cell) => (cell.innerHTML = ""));
  game();
}

function main() {
  game();

  const $restartBtn = document.querySelector(".game-restart");
  if ($restartBtn) {
    $restartBtn.addEventListener("click", () => handleRestartGame());
  }
}

main();

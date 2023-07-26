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
    $gameStatus.textContent = fn;
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

function checkWinCondition(winCondition: number[], gameState: string[]): boolean {
  const [a, b, c] = winCondition;
  return gameState[a] !== "" && gameState[a] === gameState[b] && gameState[b] === gameState[c];
}

function handleValidation(board: string[]): {
  roundWon: boolean;
  isDraw: boolean;
} {
  const roundWon = WINNING_CONDITIONS.some(winCondition => checkWinCondition(winCondition, board));
  const isDraw = !roundWon && !board.includes("");

  return {
    roundWon,
    isDraw,
  };
}

function makeMove(state: State, cellIndex: number): State {
  if (!state.isGameActive || state.gameState[cellIndex] !== "") {
    return state;
  }

  const newState = {
    ...state,
    gameState: [...state.gameState],
  };

  newState.gameState[cellIndex] = state.currentPlayer;

  const { roundWon, isDraw } = handleValidation(newState.gameState);

  if (roundWon || isDraw) {
    newState.isGameActive = false;
  } else {
    newState.currentPlayer = state.currentPlayer === "X" ? "O" : "X";
  }

  return newState;
}

function game(): void {
  const store = createStore();
  let state = store();

  document.querySelectorAll(".cell").forEach((cell) =>
    cell.addEventListener("click", (e: Event) => {
      const [$cell, cellIndex] = getCellClicked(e);

      const newState = makeMove(state, cellIndex);
      $cell.innerHTML = newState.currentPlayer

      if (newState !== state) {
        state = newState;
        updateStatus(getGameStatus(state.currentPlayer));

        if (!state.isGameActive) {
          if (handleValidation(state.gameState).roundWon) {
            updateStatus(getWinningMessage(state.currentPlayer));
          } else {
            updateStatus(getDrawMessage());
          }
        }
      }
    }),
  );
}

function handleRestartGame(): void {
  document.querySelectorAll(".cell").forEach((cell) => (cell.textContent = ""));
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


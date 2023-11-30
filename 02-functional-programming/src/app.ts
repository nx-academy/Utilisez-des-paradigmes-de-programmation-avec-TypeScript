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

export function checkHorizontal(board: (String | null)[]) {
  for (let i = 0; i < 3; i++) {
      if (board[i * 3] !== null ) {
          if (board[i * 3] === board[i * 3 + 1] && board[i * 3 + 1] === board[i * 3 + 2]) {
              return true;
          }
      } continue;
  }
  return false;
}

export function checkVertical(board: (String | null)[]) {
  for (let i = 0; i < 3; i++) {
      if (board[i] !== null) {
          if (board[i] == board[3 + i] && board[3 + i] == board[6 + i]) return true;
      } continue;
  }
  return false;
}

export function checkDiagonal(board: (String | null)[]) {
  if (board[4] !== null) {
      if ((board[0] === board[4] && board[4] === board[8]) || (board[2] === board[4] && board[4] === board[6])) return true;
  } 
  return false;
}

export function checkDraw(board: (String | null)[]) {
  return board.every(value => value !== null);
}
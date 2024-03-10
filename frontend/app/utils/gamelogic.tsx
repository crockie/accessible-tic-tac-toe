const calculateWinner = (squares: string[]): string | null => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

const checkDraw = (squares: string[]): boolean => {
  return squares.every((square) => square !== null);
};

const generateGameID = (): string => {
  const chars = "abcdefghijkmnopqrstuvwxyz123456789";
  let gameId = "";
  for (let i = 0; i < 6; i++) {
    gameId += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return gameId;
};

export { calculateWinner, checkDraw, generateGameID };

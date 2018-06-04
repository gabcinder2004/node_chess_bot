const directions = {
  rook: [[0, 1], [1, 0], [0, -1], [-1, 0]],
  queen: [[0, 1], [1, 0], [0, -1], [-1, 0], [1, 1], [-1, -1], [1, -1], [-1, 1]],
  bishop: [[-1, -1], [1, 1], [-1, 1], [1, -1]],
  king: [[0, 1], [1, 0], [0, -1], [-1, 0], [1, 1], [-1, -1], [1, -1], [-1, 1]],
  knight: [
    [1, 2],
    [-1, 2],
    [-2, 1],
    [2, 1],
    [1, -2],
    [-1, -2],
    [-2, -1],
    [2, -1],
  ],
  pawn: [[0, 1]],
};

const tileValues = {
  pawn: [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [5, 10, 10, -20, -20, 10, 10, 5],
    [5, -5, -10, 0, 0, -10, -5, 5],
    [0, 0, 0, 20, 20, 0, 0, 0],
    [5, 5, 10, 25, 25, 10, 5, 5],
    [10, 10, 20, 30, 30, 20, 10, 10],
    [50, 50, 50, 50, 50, 50, 50, 50],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ],
  knight: [
    [-50, -40, -30, -30, -30, -30, -40, -50],
    [-40, -20, 0, 5, 5, 0, -20, -40],
    [-30, 5, 10, 15, 15, 10, 5, -30],
    [-30, 0, 15, 20, 20, 15, 0, -30],
    [-30, 5, 15, 20, 20, 15, 5, -30],
    [-30, 0, 10, 15, 15, 10, 0, -30],
    [-40, -20, 0, 0, 0, 0, -20, -40],
    [-50, -40, -30, -30, -30, -30, -40, -50],
  ],
  bishop: [
    [-20, -10, -10, -10, -10, -10, -10, -20],
    [-10, 5, 0, 0, 0, 0, 5, -10],
    [-10, 10, 10, 10, 10, 10, 10, -10],
    [-10, 0, 10, 10, 10, 10, 0, -10],
    [-10, 5, 5, 10, 10, 5, 5, -10],
    [-10, 0, 5, 10, 10, 5, 0, -10],
    [-10, 0, 0, 0, 0, 0, 0, -10],
    [-20, -10, -10, -10, -10, -10, -10, -20],
  ],
  rook: [
    [0, 0, 0, 5, 5, 0, 0, 0],
    [-5, 0, 0, 0, 0, 0, 0, -5],
    [-5, 0, 0, 0, 0, 0, 0, -5],
    [-5, 0, 0, 0, 0, 0, 0, -5],
    [-5, 0, 0, 0, 0, 0, 0, -5],
    [-5, 0, 0, 0, 0, 0, 0, -5],
    [5, 10, 10, 10, 10, 10, 10, 5],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ],
  queen: [
    [-20, -10, -10, -5, -5, -10, -10, -20],
    [-10, 0, 5, 0, 0, 0, 0, -10],
    [-10, 5, 5, 5, 5, 5, 0, -10],
    [0, 0, 5, 5, 5, 5, 0, -5],
    [-5, 0, 5, 5, 5, 5, 0, -5],
    [-10, 0, 5, 5, 5, 5, 0, -10],
    [-10, 0, 0, 0, 0, 0, 0, -10],
    [-20, -10, -10, -5, -5, -10, -10, -20],
  ],
  king: [
    [20, 30, 10, 0, 0, 10, 30, 20],
    [20, 20, 0, 0, 0, 0, 20, 20],
    [-10, -20, -20, -20, -20, -20, -20, -10],
    [-20, -30, -30, -40, -40, -30, -30, -20],
    [-30, -40, -40, -50, -50, -40, -40, -30],
    [-30, -40, -40, -50, -50, -40, -40, -30],
    [-30, -40, -40, -50, -50, -40, -40, -30],
    [-30, -40, -40, -50, -50, -40, -40, -30],
  ],
};

const getPieceDirections = (type, color = 'W') => {
  switch (type) {
    case 'R':
      return directions.rook;
    case 'N':
      return directions.knight;
    case 'Q':
      return directions.queen;
    case 'B':
      return directions.bishop;
    case 'K':
      return directions.king;
    case 'P': {
      if (color === 'B') {
        const newDirections = [
          [directions.pawn[0][0], directions.pawn[0][1] * -1],
        ];
        return newDirections;
      }
      return directions.pawn;
    }
    default:
      throw new Error('Unable to get piece directions. Piece does not exist.');
  }
};

const getTileValues = (type, color) => {
  let values = null;
  switch (type) {
    case 'P':
      values = tileValues.pawn;
      break;
    case 'N':
      values = tileValues.knight;
      break;
    case 'B':
      values = tileValues.bishop;
      break;
    case 'R':
      values = tileValues.rook;
      break;
    case 'Q':
      values = tileValues.queen;
      break;
    case 'K':
      values = tileValues.king;
      break;
    default:
  }

  if (color === 'B') {
    const blackValues = [];
    for (let i = 0; i < values.length; i++) {
      blackValues.push(values[values.length - 1 - i]);
    }
    return blackValues;
  }
  return values;
};

module.exports = { getPieceDirections, getTileValues };

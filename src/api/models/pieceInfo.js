const directions = {
  rook: [[0, 1], [1, 0], [0, -1], [-1, 0]],
  queen: [[0, 1], [1, 0], [0, -1], [-1, 0], [1, 1], [-1, -1], [1, -1], [-1, 1]],
  bishop: [[-1, -1], [1, 1], [-1, 1], [1, -1]],
  king: [[0, 1], [1, 0], [0, -1], [-1, 0], [1, 1], [-1, -1], [1, -1], [-1, 1]],
  knight: [[1, 2], [-1, 2], [-2, 1], [2, 1], [1, -2], [-1, -2], [-2, -1], [2, -1]],
  pawn: [[0, 1]],
};

// const tileValuesByPiece = {
//   pawn:
//   [
//     [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
//     [5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0],
//     [1.0, 1.0, 2.0, 3.0, 3.0, 2.0, 1.0, 1.0],
//     [0.5, 0.5, 1.0, 2.5, 2.5, 1.0, 0.5, 0.5],
//     [0.0, 0.0, 0.0, 2.0, 2.0, 0.0, 0.0, 0.0],
//     [0.5, -0.5, -1.0, 0.0, 0.0, -1.0, -0.5, 0.5],
//     [0.5, 1.0, 1.0, -2.0, -2.0, 1.0, 1.0, 0.5],
//     [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
//   ],
// };

const getPieceDirections = (type, color = 'W') => {
  switch (type) {
    case 'R': return directions.rook;
    case 'N': return directions.knight;
    case 'Q': return directions.queen;
    case 'B': return directions.bishop;
    case 'K': return directions.king;
    case 'P': {
      if (color === 'B') {
        const newDirections = [[directions.pawn[0][0], directions.pawn[0][1] * -1]];
        return newDirections;
      }
      return directions.pawn;
    }
    default: throw new Error('Unable to get piece directions. Piece does not exist.');
  }
};

module.exports = { getPieceDirections };


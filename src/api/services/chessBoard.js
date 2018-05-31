const _ = require('lodash');
const ChessPiece = require('../models/chessPiece');
const PieceDirections = require('../models/pieceDirections');

const buildBoardFromGameState = (gameState) => {
  const array = [];
  let currentRow = 0;
  gameState.board.forEach((tile, index) => {
    if (index !== 0 && index % 8 === 0) {
      currentRow++;
    }
    if (!array[currentRow]) {
      array[currentRow] = [];
    }

    const piece = tile != null ? new ChessPiece(
      index % 8,
      currentRow,
      PieceDirections.getPieceDirections(tile.type, tile.side),
      tile.type,
      tile.side,
    ) : null;

    array[currentRow].push({
      location: { x: index % 8, y: currentRow },
      piece,
    });
    array[currentRow].push();
  });

  return array;
};

const isCellEmpty = (cellLocation, board) => {
  let cellEmpty = null;
  _.forEach(board, (cells) => {
    _.forEach(cells, (cell) => {
      if (cell.location.x === cellLocation.x
        && cell.location.y === cellLocation.y) {
        cellEmpty = cell.piece == null;
      }
    });
  });

  if (cellEmpty === null) {
    throw new Error('Cell not found');
  }

  return cellEmpty;
};

const isValidCell = (loc) => {
  if (loc.x > 7 || loc.x < 0 || loc.y > 7 || loc.y < 0) {
    return false;
  }
  return true;
};

const getCell = (cellLocation, board) => {
  let foundCell = null;
  _.forEach(board, (cells) => {
    _.forEach(cells, (cell) => {
      if (cell.location.x === cellLocation.x && cell.location.y === cellLocation.y) {
        foundCell = cell;
      }
    });
  });

  return foundCell;
};

module.exports = {
  buildBoardFromGameState, isCellEmpty, getCell, isValidCell,
};


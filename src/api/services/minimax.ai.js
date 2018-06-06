const _ = require('lodash');

const execute = (board, depth) => {
  console.time('executeStart');
  console.log(depth);
  const color = board.currentTurn;
  const allMoves = board.getAllAvailableMovesForColor(color);
  const isWhitePlayer = color === 'W';

  let highestBoardValue = Number.NEGATIVE_INFINITY;
  let lowestBoardValue = Number.POSITIVE_INFINITY;
  let bestMove = null;
  let moveId = -1;

  // TODO: Investigate why queen not moving to checkmate position
  _.forEach(allMoves, (move) => {
    move.moveId = moveId++;
    const cloneBoard = board.clone();
    cloneBoard.makeMove(move);
    const boardValue = isWhitePlayer
      ? min(cloneBoard, depth - 1, 'B')
      : max(cloneBoard, depth - 1, 'W');

    if (isWhitePlayer && boardValue > highestBoardValue) {
      highestBoardValue = boardValue;
      bestMove = move;
    } else if (!isWhitePlayer && boardValue < lowestBoardValue) {
      lowestBoardValue = boardValue;
      bestMove = move;
    }
  });
  console.timeEnd('executeStart');
  bestMove = formatMoveObject(bestMove);
  const finalBoardValue = isWhitePlayer ? highestBoardValue : lowestBoardValue;
  return { bestMove, finalBoardValue };
};

const formatMoveObject = (move) => {
  const xCoord = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  const yCoord = ['1', '2', '3', '4', '5', '6', '7', '8'];

  return `${xCoord[move.from.x]}${yCoord[move.from.y]}-${xCoord[move.to.x]}${
    yCoord[move.to.y]
  }`;
};

// If Black Player
const min = (board, depth, color) => {
  const bValue = board.getBoardValue();
  if (depth === 0 || Math.abs(bValue) > 10000) {
    return bValue;
  }

  let lowestSeenValue = Number.POSITIVE_INFINITY;
  const allMoves = board.getAllAvailableMovesForColor(color);

  _.forEach(allMoves, (move) => {
    const cloneBoard = board.clone();
    move.moveId = `${cloneBoard.getLastMove().moveId}${depth}`;

    cloneBoard.makeMove(move);
    const boardValue = max(cloneBoard, depth - 1, color, 'W');
    if (boardValue < lowestSeenValue) {
      lowestSeenValue = boardValue;
    }
  });

  return lowestSeenValue;
};

// If White Player
const max = (board, depth, color) => {
  const bValue = board.getBoardValue();
  if (depth === 0 || Math.abs(bValue) > 10000) {
    return bValue;
  }

  let highestSeenValue = Number.NEGATIVE_INFINITY;
  const allMoves = board.getAllAvailableMovesForColor(color);

  _.forEach(allMoves, (move) => {
    const cloneBoard = board.clone();
    move.moveId = `${cloneBoard.getLastMove().moveId}${depth}`;

    cloneBoard.makeMove(move);
    const boardValue = min(cloneBoard, depth - 1, 'B');
    if (boardValue > highestSeenValue) {
      highestSeenValue = boardValue;
    }
  });

  return highestSeenValue;
};

module.exports = { execute };

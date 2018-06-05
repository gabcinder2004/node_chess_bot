const _ = require('lodash');

const execute = (board, depth) => {
  console.time('executeStart');
  console.log(depth);
  const color = board.currentTurn;
  const allMoves = board.getAllAvailableMovesForColor(color);
  const isWhitePlayer = color === 'W';

  let highestBoardValue = Number.MIN_VALUE;
  let lowestBoardValue = Number.MAX_VALUE;
  let bestMove = null;
  _.forEach(allMoves, (move) => {
    const cloneBoard = board.clone();
    cloneBoard.makeMove(move);
    const boardValue = isWhitePlayer ?
      min(cloneBoard, depth - 1) :
      max(cloneBoard, depth - 1);

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
  return bestMove;
};

const formatMoveObject = (move) => {
  const xCoord = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  const yCoord = ['1', '2', '3', '4', '5', '6', '7', '8'];

  return `${xCoord[move.from.x]}${yCoord[move.from.y]}-${xCoord[move.to.x]}${yCoord[move.to.y]}`;
};

// If Black Player
const min = (board, previousBoard, depth, color) => {
  if (depth === 0) {
    return board.getBoardValueForColor(color);
  }

  let lowestSeenValue = Number.MAX_VALUE;
  const allMoves = board.getAllAvailableMovesForColor(color);

  _.forEach(allMoves, (move) => {
    const cloneBoard = board.clone();
    cloneBoard.makeMove(move);
    const boardValue = max(cloneBoard, depth - 1);
    if (boardValue < lowestSeenValue) {
      lowestSeenValue = boardValue;
    }
  });

  return lowestSeenValue;
};

// If White Player
const max = (board, previousBoard, depth, color) => {
  if (depth === 0) {
    return board.getBoardValue();
  }

  let highestSeenValue = Number.MIN_VALUE;
  const allMoves = board.getAllAvailableMovesForColor(color);

  _.forEach(allMoves, (move) => {
    const cloneBoard = board.clone();
    cloneBoard.makeMove(move);
    const boardValue = min(cloneBoard, depth - 1);
    if (boardValue > highestSeenValue) {
      highestSeenValue = boardValue;
    }
  });

  return highestSeenValue;
};

module.exports = { execute };


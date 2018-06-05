// const { FENBoard } = require('fen-chess-board');

const httpStatus = require('http-status');
const chess = require('chess-rules');

const ChessBoard = require('../models/chessBoard');
/**
 * Get next move
 * @public
 */
exports.getMove = async (req, res, next) => {
  try {
    // Parse FEN
    const { fen, depth } = req.body;
    const bestMove = this.getBestMove(fen, depth - 1);

    res.status(httpStatus.OK);
    res.json({
      message: 'Success!', bestMove,
    });
  } catch (error) {
    next(error);
  }
};

exports.getBestMove = (fen, depth) => {
  const gameState = chess.fenToPosition(fen);
  const board = new ChessBoard(gameState);
  return board.determineBestMove(depth, gameState.turn, true);
};


// const { FENBoard } = require('fen-chess-board');

const httpStatus = require('http-status');
const chess = require('chess-rules');

const ChessBoard = require('../models/chessBoard');
const aiMinimax = require('../services/minimax.ai');
/**
 * Get next move
 * @public
 */
exports.getMove = async (req, res, next) => {
  try {
    // Parse FEN
    const { fen, depth } = req.body;
    const move = this.getBestMove(fen, depth - 1);

    res.status(httpStatus.OK);
    res.json({
      message: 'Success!', move: move.bestMove, boardValue: move.finalBoardValue,
    });
  } catch (error) {
    next(error);
  }
};

exports.getBestMove = (fen, depth) => {
  const gameState = chess.fenToPosition(fen);
  const board = new ChessBoard(gameState);
  // return board.determineBestMove(depth, gameState.turn, true);
  return aiMinimax.execute(board, depth);
};


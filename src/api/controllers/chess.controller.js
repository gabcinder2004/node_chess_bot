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
    const { fen } = req.body;
    const gameState = chess.fenToPosition(fen);

    // Build board from FEN
    // gameState.board = chessBoardService.buildBoardFromGameState(gameState.board);

    const board = new ChessBoard(gameState);

    const bestMove = board.determineBestMove(1, gameState.turn);

    // For each possible move:
    // Are we checked?
    // Can we check them?
    // If we make the move, what is the best move opponent can make?
    // Compare boardvalues after opponent makes a move


    // Minimax tree

    res.status(httpStatus.OK);
    res.json({
      message: 'Success!', bestMove,
    });
  } catch (error) {
    next(error);
  }
};


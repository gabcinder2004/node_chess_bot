// const { FENBoard } = require('fen-chess-board');

const httpStatus = require('http-status');
const chess = require('chess-rules');

const chessBoardService = require('../services/chessBoard');

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
    gameState.board = chessBoardService.buildBoardFromGameState(gameState.board);

    // Get game moves possible
    const test = gameState.board[0][3].piece.getAvailableMoves(gameState.board);

    // Get board value for each move?
    // Minimax tree

    res.status(httpStatus.OK);
    res.json({ message: 'Success!', result: test });
  } catch (error) {
    next(error);
  }
};

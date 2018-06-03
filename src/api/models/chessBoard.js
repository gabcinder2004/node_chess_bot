const _ = require('lodash');
const ChessPiece = require('../models/chessPiece');
const PieceInfo = require('../models/pieceInfo');

module.exports = class ChessBoard {
  constructor(gameState, cloneBoard) {
    if (cloneBoard) {
      this.currentTurnState = cloneBoard.currentTurnState;
      this.currentTurn = cloneBoard.currentTurn;
      this.check = cloneBoard.check;
      this.castlingFlags = cloneBoard.castlingFlags;
    } else {
      this.buildBoardFromGameState(gameState.board);
      this.currentTurn = gameState.turn;
      this.check = gameState.check ? gameState.turn : null;
      this.castlingFlags = gameState.castlingFlags;
    }
    this.xMinBound = 0;
    this.xMaxBound = 7;
    this.yMinBound = 0;
    this.yMaxBound = 7;
  }

  clone() {
    return new ChessBoard(null, this);
  }

  makeMove(move) {
    const fromCell = this.getCell(move.from);
    const toCell = this.getCell(move.to);

    toCell.piece = fromCell.piece;

    if (fromCell.piece === null) {
      console.log(move);
      console.log(this.currentTurnState);
      throw new Error('Trying to move a piece that doesnt exist');
    }

    toCell.piece.x = move.to.x;
    toCell.piece.y = move.to.y;
    fromCell.piece = null;
    this.changeTurn();
    this.check = null;
  }

  changeTurn() {
    if (this.currentTurn === 'W') {
      this.currentTurn = 'B';
    } else {
      this.currentTurn = 'W';
    }
  }

  kingIsChecked() {
    if (this.check != null) {
      return this.check;
    }

    const opponentColor = this.currentTurn === 'W' ? 'B' : 'W';
    const opponentNextMove = this.determineBestMove(0, opponentColor);
    if (opponentNextMove.boardValue * -1 < -800) {
      this.check = { color: this.currentTurn, checked: true };
      return this.check;
    }
    this.check = { color: this.currentTurn, checked: false };
    return this.check;
  }

  buildBoardFromGameState(gameStateBoard) {
    const array = [];
    let currentRow = 0;
    gameStateBoard.forEach((tile, index) => {
      if (index !== 0 && index % 8 === 0) {
        currentRow++;
      }
      if (!array[currentRow]) {
        array[currentRow] = [];
      }

      const piece =
        tile != null
          ? new ChessPiece(
            index % 8,
            currentRow,
            PieceInfo.getPieceDirections(tile.type, tile.side),
            tile.type,
            tile.side,
          )
          : null;

      array[currentRow].push({
        location: { x: index % 8, y: currentRow },
        piece,
      });
      array[currentRow].push();
    });
    this.currentTurnState = array;
  }

  isCellEmpty(cellLocation) {
    let cellEmpty = null;
    _.forEach(this.currentTurnState, (cells) => {
      _.forEach(cells, (cell) => {
        if (
          cell.location.x === cellLocation.x &&
          cell.location.y === cellLocation.y
        ) {
          cellEmpty = cell.piece == null;
        }
      });
    });

    if (cellEmpty === null) {
      throw new Error('Cell not found');
    }

    return cellEmpty;
  }

  getBoardValueForColor(color) {
    let boardValue = 0;
    _.forEach(this.currentTurnState, (cells) => {
      _.forEach(cells, (cell) => {
        if (cell.piece) {
          boardValue += ChessPiece.getPieceValue(
            cell.piece.color !== color,
            cell.piece.type,
          );
        }
      });
    });

    return boardValue;
  }

  determineBestMove(depth, color) {
    const moves = this.getAllAvailableMovesForColor(color);
    const oldBoardValue = this.getBoardValueForColor(color);
    let bestMove = { move: null, oldBoardValue, boardValue: -9999 };
    _.forEach(moves, (move) => {
      const cloneBoard = _.cloneDeep(this);
      cloneBoard.makeMove(move);
      const boardValue = cloneBoard.getBoardValueForColor(color);

      if (depth !== 0 && boardValue > bestMove.boardValue) {
        const opponentBestMove = cloneBoard.determineBestMove(depth - 1, color === 'W' ? 'B' : 'W');

        opponentBestMove.boardValue *= -1;
        if (opponentBestMove.boardValue >= oldBoardValue && opponentBestMove.boardValue >= bestMove.boardValue) {
          bestMove = { move, boardValue: opponentBestMove.boardValue, oldBoardValue };
        }
      } else if (boardValue > bestMove.boardValue) {
        bestMove = { move, boardValue, oldBoardValue };
      }
    });

    return bestMove;
  }

  getAllAvailableMovesForColor(color) {
    let moves = [];

    _.forEach(this.currentTurnState, (cells) => {
      _.forEach(cells, (cell) => {
        if (cell.piece && cell.piece.color === color) {
          // const checkObj = this.kingIsChecked();
          // const weAreChecked = checkObj.check && checkObj.color === color;
          // if (weAreChecked && cell.piece.type === 'K') {
          //   cell.piece.getAvailableMoves(this);
          //   moves = moves.concat(cell.piece.availableMoves);
          // } else if (!weAreChecked) {
          cell.piece.getAvailableMoves(this);
          moves = moves.concat(cell.piece.availableMoves);
          // }
        }
      });
    });

    return moves;
  }

  isValidCell(loc) {
    if (
      loc.x > this.xMaxBound ||
      loc.x < this.xMinBound ||
      loc.y > this.yMaxBound ||
      loc.y < this.yMinBound
    ) {
      return false;
    }
    return true;
  }

  getCell(cellLocation) {
    let foundCell = null;
    _.forEach(this.currentTurnState, (cells) => {
      _.forEach(cells, (cell) => {
        if (
          cell.location.x === cellLocation.x &&
          cell.location.y === cellLocation.y
        ) {
          foundCell = cell;
        }
      });
    });

    return foundCell;
  }
};

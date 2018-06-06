const _ = require('lodash');
const ChessPiece = require('../models/chessPiece');
const PieceInfo = require('../models/pieceInfo');

module.exports = class ChessBoard {
  constructor(gameState) {
    this.buildBoardFromGameState(gameState.board);
    this.currentTurn = gameState.turn;
    this.castlingFlags = gameState.castlingFlags;

    this.moves = [];
    this.pieces = [];
    this.getAllPieces();
    this.xMinBound = 0;
    this.xMaxBound = 7;
    this.yMinBound = 0;
    this.yMaxBound = 7;
  }

  clone() {
    const clonedBoard = _.cloneDeep(this);
    clonedBoard.cleanClonedChessPieces();
    return clonedBoard;
  }

  getAllPieces() {
    _.forEach(this.currentTurnState, (cells) => {
      _.forEach(cells, (cell) => {
        if (cell.piece) {
          this.pieces.push(cell.piece);
        }
      });
    });
  }

  cleanClonedChessPieces() {
    _.forEach(this.pieces, (piece) => {
      piece.availableMoves = [];
    });
  }

  getLastMove() {
    return _.last(this.moves);
  }

  makeMove(move) {
    const fromCell = this.getCell(move.from);
    const toCell = this.getCell(move.to);

    toCell.piece = fromCell.piece;

    if (fromCell.piece === null) {
      throw new Error('Trying to move a piece that doesnt exist');
    }

    toCell.piece.x = move.to.x;
    toCell.piece.y = move.to.y;
    fromCell.piece = null;

    this.moves.push(move);
    this.changeTurn();
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

  getBoardValue() {
    let boardValue = 0;

    _.forEach(this.currentTurnState, (cells) => {
      _.forEach(cells, (cell) => {
        if (cell.piece) {
          const pieceLocationValue = PieceInfo.getTileValues(cell.piece.type, cell.piece.color)[cell.piece.x][cell.piece.y];
          const pieceValue = pieceLocationValue + ChessPiece.getPieceValue(cell.piece.type, cell.piece.color);

          boardValue += pieceValue;
        }
      });
    });

    return boardValue;
  }

  getAllAvailableMovesForColor(color) {
    let moves = [];

    _.forEach(this.currentTurnState, (cells) => {
      _.forEach(cells, (cell) => {
        if (cell.piece && cell.piece.color === color) {
          cell.piece.getAvailableMoves(this);
          moves = moves.concat(cell.piece.availableMoves);
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

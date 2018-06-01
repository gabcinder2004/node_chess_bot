
const _ = require('lodash');

module.exports = class ChessPiece {
  constructor(x, y, moveDirections, type, color) {
    this.x = x;
    this.y = y;
    this.moveDirections = moveDirections;
    this.type = type;
    this.color = color;
    this.availableMoves = [];
  }

  static getNextLocation(curLocation, direction) {
    const rowMove = direction[0];
    const colMove = direction[1];

    const newX = curLocation.x + rowMove;
    const newY = curLocation.y + colMove;

    return { x: newX, y: newY };
  }

  isSpecialPiece() { return (this.type === 'K' || this.type === 'P' || this.type === 'N'); }

  isKillableByPawn(curLocation, direction, board) {
    const chessBoard = require('../services/chessBoard'); // eslint-disable-line global-require
    const newLocation = ChessPiece.getNextLocation(curLocation, direction);
    const newLocationValid = chessBoard.isValidCell(newLocation);
    if (!newLocationValid) { return; }
    const newLocationEmpty = chessBoard.isCellEmpty(newLocation, board);
    const newLocationHasEnemy = (!newLocationEmpty
      && chessBoard.getCell(newLocation, board).piece.color !== this.color);
    if (newLocationHasEnemy) {
      this.availableMoves.push({ from: curLocation, to: newLocation });
    }
  }

  addMoveIfValid(curLocation, direction, board, moveOnce) {
    const chessBoard = require('../services/chessBoard'); // eslint-disable-line global-require

    const newLocation = ChessPiece.getNextLocation(curLocation, direction);
    const cellValid = chessBoard.isValidCell(newLocation);

    if (!cellValid) {
      return;
    }

    const cellEmpty = chessBoard.isCellEmpty(newLocation, board);
    const cellHasEnemy = !cellEmpty
    && chessBoard.getCell(newLocation, board).piece.color !== this.color;

    if (this.type === 'P') {
      if (this.color === 'B') {
        this.isKillableByPawn(curLocation, [1, -1], board);
        this.isKillableByPawn(curLocation, [-1, -1], board);
      } else {
        this.isKillableByPawn(curLocation, [1, 1], board);
        this.isKillableByPawn(curLocation, [-1, 1], board);
      }
    }

    // If cell is empty or has an enemy on it, it is an available move
    if (cellValid && (cellEmpty || cellHasEnemy)) {
      this.availableMoves.push({ from: { x: this.x, y: this.y }, to: newLocation, moveType: cellHasEnemy ? 'KILL' : 'MOVE' });

      if (!moveOnce && !cellHasEnemy) {
        this.addMoveIfValid(newLocation, direction, false);
      }
    }
  }

  getAvailableMoves(board) {
    _.forEach(this.moveDirections, (direction) => {
      const currentLocation = { x: this.x, y: this.y };
      const moveOnce = this.isSpecialPiece(this.type);
      this.addMoveIfValid(currentLocation, direction, board, moveOnce);
    });

    return this.availableMoves;
  }
};

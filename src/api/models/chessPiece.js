
const _ = require('lodash');


module.exports = class ChessPiece {
  constructor(x, y, moveDirections, type, color) {
    this.x = x;
    this.y = y;
    this.moveDirections = moveDirections;
    this.type = type;
    this.color = color;
  }

  getAvailableMoves(currentBoard) {
    const availableMoves = [];

    const getNextLocation = (curLocation, direction) => {
      const rowMove = direction[0];
      const colMove = direction[1];

      const newX = curLocation.x + rowMove;
      const newY = curLocation.y + colMove;

      return { x: newX, y: newY };
    };

    const isSpecialPiece = type => (type === 'K' || type === 'P' || type === 'N');

    const isKillableByPawn = (curLocation, direction) => {
      const chessBoard = require('../services/chessBoard'); // eslint-disable-line global-require
      const newLocation = getNextLocation(curLocation, direction);
      const newLocationEmpty = chessBoard.isCellEmpty(newLocation, currentBoard);
      const newLocationHasEnemy = (!newLocationEmpty
        && chessBoard.getCell(newLocation, currentBoard).piece.color !== this.color);
      if (newLocationHasEnemy) {
        availableMoves.push({ from: curLocation, to: newLocation });
      }
    };

    const addMoveIfValid = (curLocation, direction, moveOnce) => {
      const chessBoard = require('../services/chessBoard'); // eslint-disable-line global-require

      const newLocation = getNextLocation(curLocation, direction);
      const cellEmpty = chessBoard.isCellEmpty(newLocation, currentBoard);
      const cellValid = chessBoard.isValidCell(newLocation);
      const cellHasEnemy = !cellEmpty
      && chessBoard.getCell(newLocation, currentBoard).piece.color !== this.color;

      if (this.type === 'P') {
        if (this.color === 'B') {
          isKillableByPawn(curLocation, [1, -1]);
          isKillableByPawn(curLocation, [-1, -1]);
        } else {
          isKillableByPawn(curLocation, [1, 1]);
          isKillableByPawn(curLocation, [-1, 1]);
        }
      }

      // If cell is empty or has an enemy on it, it is an available move
      if (cellValid && (cellEmpty || cellHasEnemy)) {
        availableMoves.push({ from: { x: this.x, y: this.y }, to: newLocation, moveType: cellHasEnemy ? 'KILL' : 'MOVE' });

        if (!moveOnce && !cellHasEnemy) {
          addMoveIfValid(newLocation, direction, false);
        }
      }
    };

    _.forEach(this.moveDirections, (direction) => {
      const currentLocation = { x: this.x, y: this.y };
      const moveOnce = isSpecialPiece(this.type);
      addMoveIfValid(currentLocation, direction, moveOnce);
    });

    return availableMoves;
  }
};

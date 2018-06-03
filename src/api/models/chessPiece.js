
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

  static getPieceValue(isOpponentPiece, type) {
    let value = 0;
    switch (type) {
      case 'P': value = 10; break;
      case 'N': value = 30; break;
      case 'B': value = 30; break;
      case 'R': value = 50; break;
      case 'Q': value = 90; break;
      case 'K': value = 900; break;
      default:
    }

    if (isOpponentPiece) return value * -1;
    return value;
  }

  isSpecialPiece() { return (this.type === 'K' || this.type === 'P' || this.type === 'N'); }

  isKillableByPawn(curLocation, direction, board) {
    const newLocation = ChessPiece.getNextLocation(curLocation, direction);
    const newLocationValid = board.isValidCell(newLocation);
    if (!newLocationValid) { return; }
    const newLocationEmpty = board.isCellEmpty(newLocation, board.currentTurnState);
    const newLocationHasEnemy = (!newLocationEmpty
      && board.getCell(newLocation, board.currentTurnState).piece.color !== this.color);
    if (newLocationHasEnemy) {
      this.availableMoves.push({
        from: curLocation, to: newLocation, moveType: 'KILL', movingPiece: this.type,
      });
    }
  }

  addMoveIfValid(curLocation, direction, board, moveOnce) {
    const newLocation = ChessPiece.getNextLocation(curLocation, direction);
    const cellValid = board.isValidCell(newLocation);

    if (!cellValid) {
      return;
    }

    const cellEmpty = board.isCellEmpty(newLocation, board.currentTurnState);
    const cellHasEnemy = !cellEmpty
    && board.getCell(newLocation, board.currentTurnState).piece.color !== this.color;

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
      this.availableMoves.push({
        from: { x: this.x, y: this.y }, to: newLocation, moveType: cellHasEnemy ? 'KILL' : 'MOVE', movingPiece: this.type,
      });

      if (!moveOnce && !cellHasEnemy) {
        this.addMoveIfValid(newLocation, direction, board, false);
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

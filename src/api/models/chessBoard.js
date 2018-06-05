const _ = require('lodash');
const ChessPiece = require('../models/chessPiece');
const PieceInfo = require('../models/pieceInfo');

module.exports = class ChessBoard {
  constructor(gameState, cloneBoard) {
    // if (cloneBoard) {
    //   this.currentTurnState = _.cloneDeep(cloneBoard.currentTurnState);
    //   this.cleanClonedChessPieces();
    //   this.currentTurn = cloneBoard.currentTurn;
    //   this.check = cloneBoard.check;
    //   this.castlingFlags = cloneBoard.castlingFlags;
    // } else {
    this.buildBoardFromGameState(gameState.board);
    this.currentTurn = gameState.turn;
    this.check = gameState.check ? gameState.turn : null;
    this.castlingFlags = gameState.castlingFlags;
    // }
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

  cleanClonedChessPieces() {
    _.forEach(this.currentTurnState, (cells) => {
      _.forEach(cells, (cell) => {
        if (cell.piece) {
          cell.piece.availableMoves = [];
        }
      });
    });
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
          const pieceLocationValue = PieceInfo.getTileValues(cell.piece.type, cell.piece.color)[cell.location.x][cell.location.y];
          let pieceValue = 0 + ChessPiece.getPieceValue(cell.piece.type);

          if (cell.piece.color !== color) {
            pieceValue *= -1;
          }

          boardValue += pieceValue;
        }
      });
    });

    return boardValue;
  }

  determineBestMove(depth, color, onceFlag) {
    const moves = this.getAllAvailableMovesForColor(color);
    const oldBoardValue = this.getBoardValueForColor(color);
    let opponentBestMoveRightNow = null;
    if (onceFlag) {
      opponentBestMoveRightNow = this.determineBestMove(0, color === 'W' ? 'B' : 'W', false);
      opponentBestMoveRightNow.boardValue *= -1;
    }
    let bestMove = { move: null, oldBoardValue, boardValue: -99999 };
    _.forEach(moves, (move) => {
      const cloneBoard = this.clone();

      cloneBoard.makeMove(move);
      const boardValue = cloneBoard.getBoardValueForColor(color);

      // if (depth === 0 && move.movingPiece === 'K' && onceFlag) {
      //   const opponentBestMove = cloneBoard.determineBestMove(0, color === 'W' ? 'B' : 'W', false);
      //   if (opponentBestMove.boardValue * -1 < boardValue) {
      //     return;
      //   }
      // }

      if (depth !== 0 && boardValue >= bestMove.boardValue && boardValue >= oldBoardValue && boardValue >= opponentBestMoveRightNow.boardValue) {
        const opponentBestMove = cloneBoard.determineBestMove(depth - 1, color === 'W' ? 'B' : 'W', true);

        opponentBestMove.boardValue *= -1;

        if
        (opponentBestMove.boardValue > bestMove.boardValue ||
        (opponentBestMove.boardValue > oldBoardValue) ||
        (opponentBestMove.boardValue > opponentBestMoveRightNow.boardValue)
        ) {
          const futureMoves = [].concat(opponentBestMove.futureMoves);
          opponentBestMove.futureMoves = null;
          futureMoves.push(opponentBestMove);
          bestMove = {
            move: ChessBoard.formatMoveObject(move), boardValue: opponentBestMove.boardValue, oldBoardValue, finalBoardValue: opponentBestMove.finalBoardValue, depth, color, futureMoves,
          };
        }
      } else if (depth === 0 && boardValue > bestMove.boardValue) {
        bestMove = {
          move: ChessBoard.formatMoveObject(move), boardValue, oldBoardValue, color, depth, futureMoves: [], finalBoardValue: boardValue,
        };
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

  static formatMoveObject(move) {
    const xCoord = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    const yCoord = ['1', '2', '3', '4', '5', '6', '7', '8'];

    return `${xCoord[move.from.x]}${yCoord[move.from.y]}-${xCoord[move.to.x]}${yCoord[move.to.y]}`;
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

/* eslint-disable arrow-body-style */
// const request = require('supertest');
// const httpStatus = require('http-status');
const { expect } = require('chai');
const sinon = require('sinon');
// const app = require('../../../index');

const ChessPiece = require('../../models/chessPiece');
const ChessBoard = require('../../services/chessBoard');

describe('ChessPiece.js', () => {
  let sandbox;
  beforeEach(async () => {
    sandbox = sinon.sandbox.create();
  });

  afterEach(() => sandbox.restore());

  describe('getNextLocation()', () => {
    it('positive', () => {
      // Arrange
      const inputLocation = { x: 0, y: 0 };
      const inputDirection = [1, 1];
      const expectedOutput = { x: 1, y: 1 };

      // Act
      const actualOutput = ChessPiece.getNextLocation(
        inputLocation,
        inputDirection,
      );

      // Assert
      expect(actualOutput.x).to.be.equal(expectedOutput.x);
      expect(actualOutput.y).to.be.equal(expectedOutput.y);
    });

    it('negative', () => {
      // Arrange
      const inputLocation = { x: 0, y: 0 };
      const inputDirection = [-1, -1];
      const expectedOutput = { x: -1, y: -1 };

      // Act
      const actualOutput = ChessPiece.getNextLocation(
        inputLocation,
        inputDirection,
      );

      // Assert
      expect(actualOutput.x).to.be.equal(expectedOutput.x);
      expect(actualOutput.y).to.be.equal(expectedOutput.y);
    });
  });

  describe('isSpecialPiece()', () => {
    it('King', () => {
      // Arrange
      const piece = new ChessPiece(0, 0, [], 'K', 'B');
      // Act
      const actualOutput = piece.isSpecialPiece();

      // Assert
      expect(actualOutput).to.be.equal(true);
    });

    it('Pawn', () => {
      // Arrange
      const piece = new ChessPiece(0, 0, [], 'P', 'B');
      // Act
      const actualOutput = piece.isSpecialPiece();

      // Assert
      expect(actualOutput).to.be.equal(true);
    });

    it('Knight', () => {
      // Arrange
      const piece = new ChessPiece(0, 0, [], 'N', 'B');
      // Act
      const actualOutput = piece.isSpecialPiece();

      // Assert
      expect(actualOutput).to.be.equal(true);
    });

    it('Queen', () => {
      // Arrange
      const piece = new ChessPiece(0, 0, [], 'Q', 'B');
      // Act
      const actualOutput = piece.isSpecialPiece();

      // Assert
      expect(actualOutput).to.be.equal(false);
    });

    it('Rook', () => {
      // Arrange
      const piece = new ChessPiece(0, 0, [], 'R', 'B');
      // Act
      const actualOutput = piece.isSpecialPiece();

      // Assert
      expect(actualOutput).to.be.equal(false);
    });

    it('Bishop', () => {
      // Arrange
      const piece = new ChessPiece(0, 0, [], 'B', 'B');
      // Act
      const actualOutput = piece.isSpecialPiece();

      // Assert
      expect(actualOutput).to.be.equal(false);
    });
  });

  describe('isKillablePawn()', () => {
    it('Killable +1, +1', () => {
      // Arrange
      const board = [];
      const curLocation = { x: 1, y: 1 };
      const direction = [1, 1];

      sandbox.stub(ChessPiece, 'getNextLocation').returns({ x: 2, y: 2 });
      sandbox.stub(ChessBoard, 'isValidCell').returns(true);
      sandbox.stub(ChessBoard, 'isCellEmpty').returns(false);
      sandbox.stub(ChessBoard, 'getCell').returns({ piece: { color: 'W' } });

      const piece = new ChessPiece(1, 1, [], 'P', 'B');
      // Act
      piece.isKillableByPawn(curLocation, direction, board);

      // Assert
      expect(piece.availableMoves.length).to.be.equal(1);
      expect(piece.availableMoves[0].from.x).to.be.equal(curLocation.x);
      expect(piece.availableMoves[0].from.y).to.be.equal(curLocation.y);
      expect(piece.availableMoves[0].to.x).to.be.equal(2);
      expect(piece.availableMoves[0].to.y).to.be.equal(2);
    });

    it('Killable -1, 1', () => {
      // Arrange
      const board = [];
      const curLocation = { x: 1, y: 1 };
      const direction = [-1, 1];

      sandbox.stub(ChessPiece, 'getNextLocation').returns({ x: 0, y: 2 });
      sandbox.stub(ChessBoard, 'isValidCell').returns(true);
      sandbox.stub(ChessBoard, 'isCellEmpty').returns(false);
      sandbox.stub(ChessBoard, 'getCell').returns({ piece: { color: 'W' } });

      const piece = new ChessPiece(1, 1, [], 'P', 'B');
      // Act
      piece.isKillableByPawn(curLocation, direction, board);

      // Assert
      expect(piece.availableMoves.length).to.be.equal(1);
      expect(piece.availableMoves[0].from.x).to.be.equal(curLocation.x);
      expect(piece.availableMoves[0].from.y).to.be.equal(curLocation.y);
      expect(piece.availableMoves[0].to.x).to.be.equal(0);
      expect(piece.availableMoves[0].to.y).to.be.equal(2);
    });

    it('Killable -1, -1', () => {
      // Arrange
      const board = [];
      const curLocation = { x: 1, y: 6 };
      const direction = [-1, -1];

      sandbox.stub(ChessPiece, 'getNextLocation').returns({ x: 0, y: 5 });
      sandbox.stub(ChessBoard, 'isValidCell').returns(true);
      sandbox.stub(ChessBoard, 'isCellEmpty').returns(false);
      sandbox.stub(ChessBoard, 'getCell').returns({ piece: { color: 'W' } });

      const piece = new ChessPiece(1, 6, [], 'P', 'B');
      // Act
      piece.isKillableByPawn(curLocation, direction, board);

      // Assert
      expect(piece.availableMoves.length).to.be.equal(1);
      expect(piece.availableMoves[0].from.x).to.be.equal(curLocation.x);
      expect(piece.availableMoves[0].from.y).to.be.equal(curLocation.y);
      expect(piece.availableMoves[0].to.x).to.be.equal(0);
      expect(piece.availableMoves[0].to.y).to.be.equal(5);
    });

    it('Killable 1, -1', () => {
      // Arrange
      const board = [];
      const curLocation = { x: 1, y: 6 };
      const direction = [-1, -1];

      sandbox.stub(ChessPiece, 'getNextLocation').returns({ x: 2, y: 5 });
      sandbox.stub(ChessBoard, 'isValidCell').returns(true);
      sandbox.stub(ChessBoard, 'isCellEmpty').returns(false);
      sandbox.stub(ChessBoard, 'getCell').returns({ piece: { color: 'W' } });

      const piece = new ChessPiece(1, 6, [], 'P', 'B');
      // Act
      piece.isKillableByPawn(curLocation, direction, board);

      // Assert
      expect(piece.availableMoves.length).to.be.equal(1);
      expect(piece.availableMoves[0].from.x).to.be.equal(curLocation.x);
      expect(piece.availableMoves[0].from.y).to.be.equal(curLocation.y);
      expect(piece.availableMoves[0].to.x).to.be.equal(2);
      expect(piece.availableMoves[0].to.y).to.be.equal(5);
    });

    it('Next location not valid', () => {
      // Arrange
      const board = [];
      const curLocation = { x: 1, y: 6 };
      const direction = [-1, -1];

      sandbox.stub(ChessPiece, 'getNextLocation').returns({ x: 2, y: 5 });
      sandbox.stub(ChessBoard, 'isValidCell').returns(false);

      const piece = new ChessPiece(1, 6, [], 'P', 'B');
      // Act
      piece.isKillableByPawn(curLocation, direction, board);

      // Assert
      expect(piece.availableMoves.length).to.be.equal(0);
    });

    it('Cell is empty', () => {
      // Arrange
      const board = [];
      const curLocation = { x: 1, y: 6 };
      const direction = [-1, -1];

      sandbox.stub(ChessPiece, 'getNextLocation').returns({ x: 2, y: 5 });
      sandbox.stub(ChessBoard, 'isValidCell').returns(true);
      sandbox.stub(ChessBoard, 'isCellEmpty').returns(true);
      sandbox.stub(ChessBoard, 'getCell').returns({ piece: { color: 'W' } });

      const piece = new ChessPiece(1, 6, [], 'P', 'B');
      // Act
      piece.isKillableByPawn(curLocation, direction, board);

      // Assert
      expect(piece.availableMoves.length).to.be.equal(0);
    });

    it('Cell is not empty, but no enemy', () => {
      // Arrange
      const board = [];
      const curLocation = { x: 1, y: 6 };
      const direction = [-1, -1];

      sandbox.stub(ChessPiece, 'getNextLocation').returns({ x: 2, y: 5 });
      sandbox.stub(ChessBoard, 'isValidCell').returns(true);
      sandbox.stub(ChessBoard, 'isCellEmpty').returns(true);
      sandbox.stub(ChessBoard, 'getCell').returns({ piece: { color: 'B' } });

      const piece = new ChessPiece(1, 6, [], 'P', 'B');
      // Act
      piece.isKillableByPawn(curLocation, direction, board);

      // Assert
      expect(piece.availableMoves.length).to.be.equal(0);
    });
  });

  describe('addMoveIfValid()', () => {
    it('Valid Move - Not Pawn', () => {
      // Arrange
      const board = [];
      const curLocation = { x: 1, y: 1 };
      const direction = [1, 1];

      sandbox.stub(ChessPiece, 'getNextLocation').returns({ x: 2, y: 2 });
      sandbox.stub(ChessBoard, 'isValidCell').returns(true);
      sandbox.stub(ChessBoard, 'isCellEmpty').returns(false);
      sandbox.stub(ChessBoard, 'getCell').returns({ piece: { color: 'W' } });

      const piece = new ChessPiece(1, 1, [], 'K', 'B');
      // Act
      piece.addMoveIfValid(curLocation, direction, board, true);

      // Assert
      expect(piece.availableMoves.length).to.be.equal(1);
      expect(piece.availableMoves[0].from.x).to.be.equal(curLocation.x);
      expect(piece.availableMoves[0].from.y).to.be.equal(curLocation.y);
      expect(piece.availableMoves[0].to.x).to.be.equal(2);
      expect(piece.availableMoves[0].to.y).to.be.equal(2);
      expect(piece.availableMoves[0].moveType).to.be.equal('KILL');
    });

    it('Valid Move - Black Pawn', () => {
      // Arrange
      const board = [];
      const curLocation = { x: 1, y: 1 };
      const direction = [1, 1];

      sandbox.stub(ChessPiece, 'getNextLocation').returns({ x: 2, y: 2 });
      sandbox.stub(ChessBoard, 'isValidCell').returns(true);
      sandbox.stub(ChessBoard, 'isCellEmpty').returns(false);
      sandbox.stub(ChessBoard, 'getCell').returns({ piece: { color: 'W' } });

      const piece = new ChessPiece(1, 1, [], 'P', 'B');
      // Act
      piece.addMoveIfValid(curLocation, direction, board, true);

      // Assert
      expect(piece.availableMoves.length).to.be.equal(3);
      expect(piece.availableMoves[0].from.x).to.be.equal(curLocation.x);
      expect(piece.availableMoves[0].from.y).to.be.equal(curLocation.y);
      expect(piece.availableMoves[0].to.x).to.be.equal(2);
      expect(piece.availableMoves[0].to.y).to.be.equal(2);
    });

    it('Valid Move - White Pawn', () => {
      // Arrange
      const board = [];
      const curLocation = { x: 1, y: 1 };
      const direction = [1, 1];

      sandbox.stub(ChessPiece, 'getNextLocation').returns({ x: 2, y: 2 });
      sandbox.stub(ChessBoard, 'isValidCell').returns(true);
      sandbox.stub(ChessBoard, 'isCellEmpty').returns(false);
      sandbox.stub(ChessBoard, 'getCell').returns({ piece: { color: 'B' } });

      const piece = new ChessPiece(1, 1, [], 'P', 'W');
      // Act
      piece.addMoveIfValid(curLocation, direction, board, true);

      // Assert
      expect(piece.availableMoves.length).to.be.equal(3);
      expect(piece.availableMoves[0].from.x).to.be.equal(curLocation.x);
      expect(piece.availableMoves[0].from.y).to.be.equal(curLocation.y);
      expect(piece.availableMoves[0].to.x).to.be.equal(2);
      expect(piece.availableMoves[0].to.y).to.be.equal(2);
    });

    it('Invalid Move - Cell invalid', () => {
      // Arrange
      const board = [];
      const curLocation = { x: 1, y: 1 };
      const direction = [1, 1];

      sandbox.stub(ChessPiece, 'getNextLocation').returns({ x: 2, y: 2 });
      sandbox.stub(ChessBoard, 'isValidCell').returns(false);
      sandbox.stub(ChessBoard, 'isCellEmpty').returns(false);
      sandbox.stub(ChessBoard, 'getCell').returns({ piece: { color: 'B' } });

      const piece = new ChessPiece(1, 1, [], 'P', 'W');
      // Act
      piece.addMoveIfValid(curLocation, direction, board, true);

      // Assert
      expect(piece.availableMoves.length).to.be.equal(0);
    });

    it('Valid move - cell empty', () => {
      // Arrange
      const board = [];
      const curLocation = { x: 1, y: 1 };
      const direction = [1, 1];

      sandbox.stub(ChessPiece, 'getNextLocation').returns({ x: 2, y: 2 });
      sandbox.stub(ChessBoard, 'isValidCell').returns(true);
      sandbox.stub(ChessBoard, 'isCellEmpty').returns(true);
      sandbox.stub(ChessBoard, 'getCell').returns({ piece: { color: 'W' } });

      const piece = new ChessPiece(1, 1, [], 'P', 'W');
      // Act
      piece.addMoveIfValid(curLocation, direction, board, true);

      // Assert
      expect(piece.availableMoves.length).to.be.equal(1);
    });

    it('Valid move - moveOnce false and cellHasEnemy false', () => {
      // Arrange
      const board = [];
      const curLocation = { x: 1, y: 1 };
      const direction = [1, 1];

      sandbox.stub(ChessPiece, 'getNextLocation').returns({ x: 2, y: 2 });
      sandbox.stub(ChessBoard, 'isValidCell').returns(true);
      sandbox.stub(ChessBoard, 'isCellEmpty').returns(false);
      sandbox.stub(ChessBoard, 'getCell').returns({ piece: { color: 'B' } });

      const piece = new ChessPiece(1, 1, [], 'K', 'W');
      // Act
      piece.addMoveIfValid(curLocation, direction, board, false);

      // Assert
      expect(piece.availableMoves.length).to.be.equal(1);
    });
  });

  describe('getAvailableMoves()', () => {
    it('Has moves', () => {
      // Arrange
      const board = [];
      const curLocation = { x: 1, y: 1 };
      const moveDirections = [[1, 1]];

      sandbox.stub(ChessPiece, 'getNextLocation').returns({ x: 2, y: 2 });
      sandbox.stub(ChessBoard, 'isValidCell').returns(true);
      sandbox.stub(ChessBoard, 'isCellEmpty').returns(true);
      sandbox.stub(ChessBoard, 'getCell').returns({ piece: { color: 'W' } });

      const piece = new ChessPiece(curLocation.x, curLocation.y, moveDirections, 'P', 'B');
      // Act
      piece.getAvailableMoves(board);

      // Assert
      expect(piece.availableMoves.length).to.be.equal(1);
      expect(piece.availableMoves[0].from.x).to.be.equal(curLocation.x);
      expect(piece.availableMoves[0].from.y).to.be.equal(curLocation.y);
      expect(piece.availableMoves[0].to.x).to.be.equal(2);
      expect(piece.availableMoves[0].to.y).to.be.equal(2);
    });
  });
});

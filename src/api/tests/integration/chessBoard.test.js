/* eslint-disable arrow-body-style */
// const request = require('supertest');
// const httpStatus = require('http-status');
const { expect } = require('chai');
const sinon = require('sinon');
// const app = require('../../../index');

const chessBoardService = require('../../services/chessBoard');

const sandbox = sinon.createSandbox();

describe('Chess Board Service', () => {
  beforeEach(async () => {

  });

  afterEach(() => sandbox.restore());

  describe('buildBoardFromGameState()', () => {
    it('fresh board game state', () => {
      // Arrange
      const inputGameState = JSON.parse('{"turn":"W","castlingFlags":{"W":{"K":true,"Q":true},"B":{"K":true,"Q":true}},"lastPawnMoveColumn":null,"check":false,"fullMoveNumber":1,"halfMoveClock":0,"board":[{"type":"R","side":"W"},{"type":"N","side":"W"},{"type":"B","side":"W"},{"type":"Q","side":"W"},{"type":"K","side":"W"},{"type":"B","side":"W"},{"type":"N","side":"W"},{"type":"R","side":"W"},{"type":"P","side":"W"},{"type":"P","side":"W"},{"type":"P","side":"W"},{"type":"P","side":"W"},{"type":"P","side":"W"},{"type":"P","side":"W"},{"type":"P","side":"W"},{"type":"P","side":"W"},null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,{"type":"P","side":"B"},{"type":"P","side":"B"},{"type":"P","side":"B"},{"type":"P","side":"B"},{"type":"P","side":"B"},{"type":"P","side":"B"},{"type":"P","side":"B"},{"type":"P","side":"B"},{"type":"R","side":"B"},{"type":"N","side":"B"},{"type":"B","side":"B"},{"type":"Q","side":"B"},{"type":"K","side":"B"},{"type":"B","side":"B"},{"type":"N","side":"B"},{"type":"R","side":"B"}]}');

      const expectedOutput = '[[{"location":{"x":0,"y":0},"piece":{"x":0,"y":0,"moveDirections":[[0,1],[1,0],[0,-1],[-1,0]],"type":"R","color":"W"}},{"location":{"x":1,"y":0},"piece":{"x":1,"y":0,"moveDirections":[[1,2],[-1,2],[-2,1],[2,1],[1,-2],[-1,-2],[-2,-1],[2,-1]],"type":"N","color":"W"}},{"location":{"x":2,"y":0},"piece":{"x":2,"y":0,"moveDirections":[[-1,-1],[1,1],[-1,1],[1,-1]],"type":"B","color":"W"}},{"location":{"x":3,"y":0},"piece":{"x":3,"y":0,"moveDirections":[[0,1],[1,0],[0,-1],[-1,0],[1,1],[-1,-1],[1,-1],[-1,1]],"type":"Q","color":"W"}},{"location":{"x":4,"y":0},"piece":{"x":4,"y":0,"moveDirections":[[0,1],[1,0],[0,-1],[-1,0],[1,1],[-1,-1],[1,-1],[-1,1]],"type":"K","color":"W"}},{"location":{"x":5,"y":0},"piece":{"x":5,"y":0,"moveDirections":[[-1,-1],[1,1],[-1,1],[1,-1]],"type":"B","color":"W"}},{"location":{"x":6,"y":0},"piece":{"x":6,"y":0,"moveDirections":[[1,2],[-1,2],[-2,1],[2,1],[1,-2],[-1,-2],[-2,-1],[2,-1]],"type":"N","color":"W"}},{"location":{"x":7,"y":0},"piece":{"x":7,"y":0,"moveDirections":[[0,1],[1,0],[0,-1],[-1,0]],"type":"R","color":"W"}}],[{"location":{"x":0,"y":1},"piece":{"x":0,"y":1,"moveDirections":[[0,1]],"type":"P","color":"W"}},{"location":{"x":1,"y":1},"piece":{"x":1,"y":1,"moveDirections":[[0,1]],"type":"P","color":"W"}},{"location":{"x":2,"y":1},"piece":{"x":2,"y":1,"moveDirections":[[0,1]],"type":"P","color":"W"}},{"location":{"x":3,"y":1},"piece":{"x":3,"y":1,"moveDirections":[[0,1]],"type":"P","color":"W"}},{"location":{"x":4,"y":1},"piece":{"x":4,"y":1,"moveDirections":[[0,1]],"type":"P","color":"W"}},{"location":{"x":5,"y":1},"piece":{"x":5,"y":1,"moveDirections":[[0,1]],"type":"P","color":"W"}},{"location":{"x":6,"y":1},"piece":{"x":6,"y":1,"moveDirections":[[0,1]],"type":"P","color":"W"}},{"location":{"x":7,"y":1},"piece":{"x":7,"y":1,"moveDirections":[[0,1]],"type":"P","color":"W"}}],[{"location":{"x":0,"y":2},"piece":null},{"location":{"x":1,"y":2},"piece":null},{"location":{"x":2,"y":2},"piece":null},{"location":{"x":3,"y":2},"piece":null},{"location":{"x":4,"y":2},"piece":null},{"location":{"x":5,"y":2},"piece":null},{"location":{"x":6,"y":2},"piece":null},{"location":{"x":7,"y":2},"piece":null}],[{"location":{"x":0,"y":3},"piece":null},{"location":{"x":1,"y":3},"piece":null},{"location":{"x":2,"y":3},"piece":null},{"location":{"x":3,"y":3},"piece":null},{"location":{"x":4,"y":3},"piece":null},{"location":{"x":5,"y":3},"piece":null},{"location":{"x":6,"y":3},"piece":null},{"location":{"x":7,"y":3},"piece":null}],[{"location":{"x":0,"y":4},"piece":null},{"location":{"x":1,"y":4},"piece":null},{"location":{"x":2,"y":4},"piece":null},{"location":{"x":3,"y":4},"piece":null},{"location":{"x":4,"y":4},"piece":null},{"location":{"x":5,"y":4},"piece":null},{"location":{"x":6,"y":4},"piece":null},{"location":{"x":7,"y":4},"piece":null}],[{"location":{"x":0,"y":5},"piece":null},{"location":{"x":1,"y":5},"piece":null},{"location":{"x":2,"y":5},"piece":null},{"location":{"x":3,"y":5},"piece":null},{"location":{"x":4,"y":5},"piece":null},{"location":{"x":5,"y":5},"piece":null},{"location":{"x":6,"y":5},"piece":null},{"location":{"x":7,"y":5},"piece":null}],[{"location":{"x":0,"y":6},"piece":{"x":0,"y":6,"moveDirections":[[0,-1]],"type":"P","color":"B"}},{"location":{"x":1,"y":6},"piece":{"x":1,"y":6,"moveDirections":[[0,-1]],"type":"P","color":"B"}},{"location":{"x":2,"y":6},"piece":{"x":2,"y":6,"moveDirections":[[0,-1]],"type":"P","color":"B"}},{"location":{"x":3,"y":6},"piece":{"x":3,"y":6,"moveDirections":[[0,-1]],"type":"P","color":"B"}},{"location":{"x":4,"y":6},"piece":{"x":4,"y":6,"moveDirections":[[0,-1]],"type":"P","color":"B"}},{"location":{"x":5,"y":6},"piece":{"x":5,"y":6,"moveDirections":[[0,-1]],"type":"P","color":"B"}},{"location":{"x":6,"y":6},"piece":{"x":6,"y":6,"moveDirections":[[0,-1]],"type":"P","color":"B"}},{"location":{"x":7,"y":6},"piece":{"x":7,"y":6,"moveDirections":[[0,-1]],"type":"P","color":"B"}}],[{"location":{"x":0,"y":7},"piece":{"x":0,"y":7,"moveDirections":[[0,1],[1,0],[0,-1],[-1,0]],"type":"R","color":"B"}},{"location":{"x":1,"y":7},"piece":{"x":1,"y":7,"moveDirections":[[1,2],[-1,2],[-2,1],[2,1],[1,-2],[-1,-2],[-2,-1],[2,-1]],"type":"N","color":"B"}},{"location":{"x":2,"y":7},"piece":{"x":2,"y":7,"moveDirections":[[-1,-1],[1,1],[-1,1],[1,-1]],"type":"B","color":"B"}},{"location":{"x":3,"y":7},"piece":{"x":3,"y":7,"moveDirections":[[0,1],[1,0],[0,-1],[-1,0],[1,1],[-1,-1],[1,-1],[-1,1]],"type":"Q","color":"B"}},{"location":{"x":4,"y":7},"piece":{"x":4,"y":7,"moveDirections":[[0,1],[1,0],[0,-1],[-1,0],[1,1],[-1,-1],[1,-1],[-1,1]],"type":"K","color":"B"}},{"location":{"x":5,"y":7},"piece":{"x":5,"y":7,"moveDirections":[[-1,-1],[1,1],[-1,1],[1,-1]],"type":"B","color":"B"}},{"location":{"x":6,"y":7},"piece":{"x":6,"y":7,"moveDirections":[[1,2],[-1,2],[-2,1],[2,1],[1,-2],[-1,-2],[-2,-1],[2,-1]],"type":"N","color":"B"}},{"location":{"x":7,"y":7},"piece":{"x":7,"y":7,"moveDirections":[[0,1],[1,0],[0,-1],[-1,0]],"type":"R","color":"B"}}]]';

      // Act
      const board = chessBoardService.buildBoardFromGameState(inputGameState);

      // Assert
      expect(JSON.stringify(board)).to.be.equal(expectedOutput);
    });

    it('random in progress state', () => {
      // 1Bb3n1/8/3R1r1p/7P/Pp3N2/Pk4KB/1P3P2/8 w - - 0 1

      // Arrange
      const inputGameState = JSON.parse('{"turn":"W","castlingFlags":{"W":{"K":false,"Q":false},"B":{"K":false,"Q":false}},"lastPawnMoveColumn":null,"check":false,"fullMoveNumber":1,"halfMoveClock":0,"board":[null,null,null,null,null,null,null,null,null,{"type":"P","side":"W"},null,null,null,{"type":"P","side":"W"},null,null,{"type":"P","side":"W"},{"type":"K","side":"B"},null,null,null,null,{"type":"K","side":"W"},{"type":"B","side":"W"},{"type":"P","side":"W"},{"type":"P","side":"B"},null,null,null,{"type":"N","side":"W"},null,null,null,null,null,null,null,null,null,{"type":"P","side":"W"},null,null,null,{"type":"R","side":"W"},null,{"type":"R","side":"B"},null,{"type":"P","side":"B"},null,null,null,null,null,null,null,null,null,{"type":"B","side":"W"},{"type":"B","side":"B"},null,null,null,{"type":"N","side":"B"},null]}');

      const expectedOutput = '[[{"location":{"x":0,"y":0},"piece":null},{"location":{"x":1,"y":0},"piece":null},{"location":{"x":2,"y":0},"piece":null},{"location":{"x":3,"y":0},"piece":null},{"location":{"x":4,"y":0},"piece":null},{"location":{"x":5,"y":0},"piece":null},{"location":{"x":6,"y":0},"piece":null},{"location":{"x":7,"y":0},"piece":null}],[{"location":{"x":0,"y":1},"piece":null},{"location":{"x":1,"y":1},"piece":{"x":1,"y":1,"moveDirections":[[0,1]],"type":"P","color":"W"}},{"location":{"x":2,"y":1},"piece":null},{"location":{"x":3,"y":1},"piece":null},{"location":{"x":4,"y":1},"piece":null},{"location":{"x":5,"y":1},"piece":{"x":5,"y":1,"moveDirections":[[0,1]],"type":"P","color":"W"}},{"location":{"x":6,"y":1},"piece":null},{"location":{"x":7,"y":1},"piece":null}],[{"location":{"x":0,"y":2},"piece":{"x":0,"y":2,"moveDirections":[[0,1]],"type":"P","color":"W"}},{"location":{"x":1,"y":2},"piece":{"x":1,"y":2,"moveDirections":[[0,1],[1,0],[0,-1],[-1,0],[1,1],[-1,-1],[1,-1],[-1,1]],"type":"K","color":"B"}},{"location":{"x":2,"y":2},"piece":null},{"location":{"x":3,"y":2},"piece":null},{"location":{"x":4,"y":2},"piece":null},{"location":{"x":5,"y":2},"piece":null},{"location":{"x":6,"y":2},"piece":{"x":6,"y":2,"moveDirections":[[0,1],[1,0],[0,-1],[-1,0],[1,1],[-1,-1],[1,-1],[-1,1]],"type":"K","color":"W"}},{"location":{"x":7,"y":2},"piece":{"x":7,"y":2,"moveDirections":[[-1,-1],[1,1],[-1,1],[1,-1]],"type":"B","color":"W"}}],[{"location":{"x":0,"y":3},"piece":{"x":0,"y":3,"moveDirections":[[0,1]],"type":"P","color":"W"}},{"location":{"x":1,"y":3},"piece":{"x":1,"y":3,"moveDirections":[[0,-1]],"type":"P","color":"B"}},{"location":{"x":2,"y":3},"piece":null},{"location":{"x":3,"y":3},"piece":null},{"location":{"x":4,"y":3},"piece":null},{"location":{"x":5,"y":3},"piece":{"x":5,"y":3,"moveDirections":[[1,2],[-1,2],[-2,1],[2,1],[1,-2],[-1,-2],[-2,-1],[2,-1]],"type":"N","color":"W"}},{"location":{"x":6,"y":3},"piece":null},{"location":{"x":7,"y":3},"piece":null}],[{"location":{"x":0,"y":4},"piece":null},{"location":{"x":1,"y":4},"piece":null},{"location":{"x":2,"y":4},"piece":null},{"location":{"x":3,"y":4},"piece":null},{"location":{"x":4,"y":4},"piece":null},{"location":{"x":5,"y":4},"piece":null},{"location":{"x":6,"y":4},"piece":null},{"location":{"x":7,"y":4},"piece":{"x":7,"y":4,"moveDirections":[[0,1]],"type":"P","color":"W"}}],[{"location":{"x":0,"y":5},"piece":null},{"location":{"x":1,"y":5},"piece":null},{"location":{"x":2,"y":5},"piece":null},{"location":{"x":3,"y":5},"piece":{"x":3,"y":5,"moveDirections":[[0,1],[1,0],[0,-1],[-1,0]],"type":"R","color":"W"}},{"location":{"x":4,"y":5},"piece":null},{"location":{"x":5,"y":5},"piece":{"x":5,"y":5,"moveDirections":[[0,1],[1,0],[0,-1],[-1,0]],"type":"R","color":"B"}},{"location":{"x":6,"y":5},"piece":null},{"location":{"x":7,"y":5},"piece":{"x":7,"y":5,"moveDirections":[[0,-1]],"type":"P","color":"B"}}],[{"location":{"x":0,"y":6},"piece":null},{"location":{"x":1,"y":6},"piece":null},{"location":{"x":2,"y":6},"piece":null},{"location":{"x":3,"y":6},"piece":null},{"location":{"x":4,"y":6},"piece":null},{"location":{"x":5,"y":6},"piece":null},{"location":{"x":6,"y":6},"piece":null},{"location":{"x":7,"y":6},"piece":null}],[{"location":{"x":0,"y":7},"piece":null},{"location":{"x":1,"y":7},"piece":{"x":1,"y":7,"moveDirections":[[-1,-1],[1,1],[-1,1],[1,-1]],"type":"B","color":"W"}},{"location":{"x":2,"y":7},"piece":{"x":2,"y":7,"moveDirections":[[-1,-1],[1,1],[-1,1],[1,-1]],"type":"B","color":"B"}},{"location":{"x":3,"y":7},"piece":null},{"location":{"x":4,"y":7},"piece":null},{"location":{"x":5,"y":7},"piece":null},{"location":{"x":6,"y":7},"piece":{"x":6,"y":7,"moveDirections":[[1,2],[-1,2],[-2,1],[2,1],[1,-2],[-1,-2],[-2,-1],[2,-1]],"type":"N","color":"B"}},{"location":{"x":7,"y":7},"piece":null}]]';

      // Act
      const board = chessBoardService.buildBoardFromGameState(inputGameState);

      // Assert
      expect(JSON.stringify(board)).to.be.equal(expectedOutput);
    });
  });

  describe('isCellEmpty()', () => {
    it('Cell exists and is empty', () => {
      // Arrange
      const inputBoard = [[{ location: { x: 0, y: 0 }, piece: null }]];
      const inputCell = { x: 0, y: 0 };
      const expectedOutput = true;

      // Act
      const actualOutput = chessBoardService.isCellEmpty(inputCell, inputBoard);

      // Assert
      expect(actualOutput).to.equal(expectedOutput);
    });

    it('Cell exists and is not empty', () => {
      // Arrange
      const inputBoard = [[{ location: { x: 0, y: 0 }, piece: { name: 'some object' } }]];
      const inputCell = { x: 0, y: 0 };
      const expectedOutput = false;

      // Act
      const actualOutput = chessBoardService.isCellEmpty(inputCell, inputBoard);

      // Assert
      expect(actualOutput).to.equal(expectedOutput);
    });

    it('Cell does not exist and is not empty', () => {
      // Arrange
      const inputBoard = [[{ location: { x: 0, y: 1 }, piece: { name: 'some object' } }]];
      const inputCell = { x: 0, y: 0 };

      // Act

      // Assert
      expect(() => { chessBoardService.isCellEmpty(inputCell, inputBoard); }).to.throw('Cell not found');
    });

    it('Cell does not exist and is empty', () => {
      // Arrange
      const inputBoard = [[{ location: { x: 0, y: 1 }, piece: null }]];
      const inputCell = { x: 0, y: 0 };

      // Act

      // Assert
      expect(() => { chessBoardService.isCellEmpty(inputCell, inputBoard); }).to.throw('Cell not found');
    });
  });

  describe('isValidCell()', () => {
    it('Cell valid', () => {
      [{ input: { x: 0, y: 0 }, expectedOutput: true },
        { input: { x: 7, y: 7 }, expectedOutput: true }]
        .forEach((testCase) => {
        // Arrange

        // Act
          const actualOutput = chessBoardService.isValidCell(testCase.input);

          // Assert
          expect(actualOutput).to.equal(testCase.expectedOutput);
        });
    });

    it('Cell not valid', () => {
      // Arrange
      const inputCell1 = { x: 0, y: -1 };
      const inputCell2 = { x: 7, y: 8 };
      const expectedOutput = false;

      // Act
      const actualOutput1 = chessBoardService.isValidCell(inputCell1);
      const actualOutput2 = chessBoardService.isValidCell(inputCell2);

      // Assert
      expect(actualOutput1).to.equal(expectedOutput);
      expect(actualOutput2).to.equal(expectedOutput);
    });

    it('Cell not valid on X', () => {
      // Arrange
      const inputCell1 = { x: -1, y: 0 };
      const inputCell2 = { x: 8, y: 0 };
      const expectedOutput = false;

      // Act
      const actualOutput1 = chessBoardService.isValidCell(inputCell1);
      const actualOutput2 = chessBoardService.isValidCell(inputCell2);

      // Assert
      expect(actualOutput1).to.equal(expectedOutput);
      expect(actualOutput2).to.equal(expectedOutput);
    });

    it('Cell not valid on X and Y', () => {
      // Arrange
      const inputCell1 = { x: -1, y: -1 };
      const inputCell2 = { x: 8, y: 8 };
      const expectedOutput = false;

      // Act
      const actualOutput1 = chessBoardService.isValidCell(inputCell1);
      const actualOutput2 = chessBoardService.isValidCell(inputCell2);

      // Assert
      expect(actualOutput1).to.equal(expectedOutput);
      expect(actualOutput2).to.equal(expectedOutput);
    });
  });

  describe('getCell()', () => {
    it('Cell found', () => {
      // Arrange
      const inputLocation = { x: 0, y: 0 };
      const inputBoard = [[{ location: { x: 0, y: 0 }, piece: { name: 'some object' } }]];

      const expectedOutput = inputBoard[0][0];

      // Act
      const actualOutput = chessBoardService.getCell(inputLocation, inputBoard);
      // Assert
      expect(actualOutput).to.equal(expectedOutput);
    });

    it('Cell not found - bad x', () => {
      // Arrange
      const inputLocation = { x: 1, y: 0 };
      const inputBoard = [[{ location: { x: 0, y: 0 }, piece: { name: 'some object' } }]];

      const expectedOutput = null;

      // Act
      const actualOutput = chessBoardService.getCell(inputLocation, inputBoard);
      // Assert
      expect(actualOutput).to.equal(expectedOutput);
    });

    it('Cell not found - bad y', () => {
      // Arrange
      const inputLocation = { x: 0, y: 1 };
      const inputBoard = [[{ location: { x: 0, y: 0 }, piece: { name: 'some object' } }]];

      const expectedOutput = null;

      // Act
      const actualOutput = chessBoardService.getCell(inputLocation, inputBoard);
      // Assert
      expect(actualOutput).to.equal(expectedOutput);
    });

    it('Cell not found - bad x and y', () => {
      // Arrange
      const inputLocation = { x: 1, y: 1 };
      const inputBoard = [[{ location: { x: 0, y: 0 }, piece: { name: 'some object' } }]];

      const expectedOutput = null;

      // Act
      const actualOutput = chessBoardService.getCell(inputLocation, inputBoard);
      // Assert
      expect(actualOutput).to.equal(expectedOutput);
    });
  });
});

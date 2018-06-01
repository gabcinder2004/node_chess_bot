/* eslint-disable arrow-body-style */
// const request = require('supertest');
// const httpStatus = require('http-status');
const { expect } = require('chai');
const sinon = require('sinon');
// const app = require('../../../index');

const chessBoardService = require('../../services/chessBoard');

const sandbox = sinon.createSandbox();

describe('Chess Board Service', () => {
  beforeEach(async () => {});

  afterEach(() => sandbox.restore());

  describe('buildBoardFromGameState()', () => {
    it('fresh board game state', () => {
      // Arrange
      const inputBoard = [
        { type: 'R', side: 'W' },
        { type: 'N', side: 'W' },
        { type: 'B', side: 'W' },
        { type: 'Q', side: 'W' },
        { type: 'K', side: 'W' },
        { type: 'B', side: 'W' },
        { type: 'N', side: 'W' },
        { type: 'R', side: 'W' },
        { type: 'P', side: 'W' },
        { type: 'P', side: 'W' },
        { type: 'P', side: 'W' },
        { type: 'P', side: 'W' },
        { type: 'P', side: 'W' },
        { type: 'P', side: 'W' },
        { type: 'P', side: 'W' },
        { type: 'P', side: 'W' },
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        { type: 'P', side: 'B' },
        { type: 'P', side: 'B' },
        { type: 'P', side: 'B' },
        { type: 'P', side: 'B' },
        { type: 'P', side: 'B' },
        { type: 'P', side: 'B' },
        { type: 'P', side: 'B' },
        { type: 'P', side: 'B' },
        { type: 'R', side: 'B' },
        { type: 'N', side: 'B' },
        { type: 'B', side: 'B' },
        { type: 'Q', side: 'B' },
        { type: 'K', side: 'B' },
        { type: 'B', side: 'B' },
        { type: 'N', side: 'B' },
        { type: 'R', side: 'B' },
      ];

      const expectedBoard = [
        [
          {
            piece: {
              x: 0,
              y: 0,
              type: 'R',
              color: 'W',
            },
          },
          {
            piece: {
              x: 1,
              y: 0,
              type: 'N',
              color: 'W',
            },
          },
          {
            piece: {
              x: 2,
              y: 0,
              type: 'B',
              color: 'W',
            },
          },
          {
            piece: {
              x: 3,
              y: 0,
              type: 'Q',
              color: 'W',
            },
          },
          {
            piece: {
              x: 4,
              y: 0,
              type: 'K',
              color: 'W',
            },
          },
          {
            piece: {
              x: 5,
              y: 0,
              type: 'B',
              color: 'W',
            },
          },
          {
            piece: {
              x: 6,
              y: 0,
              type: 'N',
              color: 'W',
            },
          },
          {
            piece: {
              x: 7,
              y: 0,
              type: 'R',
              color: 'W',
            },
          },
        ],
        [
          {
            piece: {
              x: 0,
              y: 1,
              type: 'P',
              color: 'W',
            },
          },
          {
            piece: {
              x: 1,
              y: 1,
              type: 'P',
              color: 'W',
            },
          },
          {
            piece: {
              x: 2,
              y: 1,
              type: 'P',
              color: 'W',
            },
          },
          {
            piece: {
              x: 3,
              y: 1,
              type: 'P',
              color: 'W',
            },
          },
          {
            piece: {
              x: 4,
              y: 1,
              type: 'P',
              color: 'W',
            },
          },
          {
            piece: {
              x: 5,
              y: 1,
              type: 'P',
              color: 'W',
            },
          },
          {
            piece: {
              x: 6,
              y: 1,
              type: 'P',
              color: 'W',
            },
          },
          {
            piece: {
              x: 7,
              y: 1,
              type: 'P',
              color: 'W',
            },
          },
        ],
        [
          { piece: null },
          { piece: null },
          { piece: null },
          { piece: null },
          { piece: null },
          { piece: null },
          { piece: null },
          { piece: null },
        ],
        [
          { piece: null },
          { piece: null },
          { piece: null },
          { piece: null },
          { piece: null },
          { piece: null },
          { piece: null },
          { piece: null },
        ],
        [
          { piece: null },
          { piece: null },
          { piece: null },
          { piece: null },
          { piece: null },
          { piece: null },
          { piece: null },
          { piece: null },
        ],
        [
          { piece: null },
          { piece: null },
          { piece: null },
          { piece: null },
          { piece: null },
          { piece: null },
          { piece: null },
          { piece: null },
        ],
        [
          {
            piece: {
              x: 0,
              y: 6,
              type: 'P',
              color: 'B',
            },
          },
          {
            piece: {
              x: 1,
              y: 6,
              type: 'P',
              color: 'B',
            },
          },
          {
            piece: {
              x: 2,
              y: 6,
              type: 'P',
              color: 'B',
            },
          },
          {
            piece: {
              x: 3,
              y: 6,
              type: 'P',
              color: 'B',
            },
          },
          {
            piece: {
              x: 4,
              y: 6,
              type: 'P',
              color: 'B',
            },
          },
          {
            piece: {
              x: 5,
              y: 6,
              type: 'P',
              color: 'B',
            },
          },
          {
            piece: {
              x: 6,
              y: 6,
              type: 'P',
              color: 'B',
            },
          },
          {
            piece: {
              x: 7,
              y: 6,
              type: 'P',
              color: 'B',
            },
          },
        ],
        [
          {
            piece: {
              x: 0,
              y: 7,
              type: 'R',
              color: 'B',
            },
          },
          {
            piece: {
              x: 1,
              y: 7,
              type: 'N',
              color: 'B',
            },
          },
          {
            piece: {
              x: 2,
              y: 7,
              type: 'B',
              color: 'B',
            },
          },
          {
            piece: {
              x: 3,
              y: 7,
              type: 'Q',
              color: 'B',
            },
          },
          {
            piece: {
              x: 4,
              y: 7,
              type: 'K',
              color: 'B',
            },
          },
          {
            piece: {
              x: 5,
              y: 7,
              type: 'B',
              color: 'B',
            },
          },
          {
            piece: {
              x: 6,
              y: 7,
              type: 'N',
              color: 'B',
            },
          },
          {
            piece: {
              x: 7,
              y: 7,
              type: 'R',
              color: 'B',
            },
          },
        ],
      ];

      // Act
      const actualBoard = chessBoardService.buildBoardFromGameState(inputBoard);

      // Assert

      expect(actualBoard[0][0].piece.type).to.equal(expectedBoard[0][0].piece.type);
      expect(actualBoard[0][1].piece.type).to.equal(expectedBoard[0][1].piece.type);
      expect(actualBoard[0][2].piece.type).to.equal(expectedBoard[0][2].piece.type);
      expect(actualBoard[0][3].piece.type).to.equal(expectedBoard[0][3].piece.type);
      expect(actualBoard[0][4].piece.type).to.equal(expectedBoard[0][4].piece.type);
      expect(actualBoard[0][5].piece.type).to.equal(expectedBoard[0][5].piece.type);
      expect(actualBoard[0][6].piece.type).to.equal(expectedBoard[0][6].piece.type);
      expect(actualBoard[0][7].piece.type).to.equal(expectedBoard[0][7].piece.type);

      expect(actualBoard[1][0].piece.type).to.equal(expectedBoard[1][0].piece.type);
      expect(actualBoard[1][1].piece.type).to.equal(expectedBoard[1][1].piece.type);
      expect(actualBoard[1][2].piece.type).to.equal(expectedBoard[1][2].piece.type);
      expect(actualBoard[1][3].piece.type).to.equal(expectedBoard[1][3].piece.type);
      expect(actualBoard[1][4].piece.type).to.equal(expectedBoard[1][4].piece.type);
      expect(actualBoard[1][5].piece.type).to.equal(expectedBoard[1][5].piece.type);
      expect(actualBoard[1][6].piece.type).to.equal(expectedBoard[1][6].piece.type);
      expect(actualBoard[1][7].piece.type).to.equal(expectedBoard[1][7].piece.type);

      expect(actualBoard[2][0].piece).to.equal(expectedBoard[2][0].piece);
      expect(actualBoard[2][1].piece).to.equal(expectedBoard[2][1].piece);
      expect(actualBoard[2][2].piece).to.equal(expectedBoard[2][2].piece);
      expect(actualBoard[2][3].piece).to.equal(expectedBoard[2][3].piece);
      expect(actualBoard[2][4].piece).to.equal(expectedBoard[2][4].piece);
      expect(actualBoard[2][5].piece).to.equal(expectedBoard[2][5].piece);
      expect(actualBoard[2][6].piece).to.equal(expectedBoard[2][6].piece);
      expect(actualBoard[2][7].piece).to.equal(expectedBoard[2][7].piece);

      expect(actualBoard[3][0].piece).to.equal(expectedBoard[3][0].piece);
      expect(actualBoard[3][1].piece).to.equal(expectedBoard[3][1].piece);
      expect(actualBoard[3][2].piece).to.equal(expectedBoard[3][2].piece);
      expect(actualBoard[3][3].piece).to.equal(expectedBoard[3][3].piece);
      expect(actualBoard[3][4].piece).to.equal(expectedBoard[3][4].piece);
      expect(actualBoard[3][5].piece).to.equal(expectedBoard[3][5].piece);
      expect(actualBoard[3][6].piece).to.equal(expectedBoard[3][6].piece);
      expect(actualBoard[3][7].piece).to.equal(expectedBoard[3][7].piece);

      expect(actualBoard[4][0].piece).to.equal(expectedBoard[4][0].piece);
      expect(actualBoard[4][1].piece).to.equal(expectedBoard[4][1].piece);
      expect(actualBoard[4][2].piece).to.equal(expectedBoard[4][2].piece);
      expect(actualBoard[4][3].piece).to.equal(expectedBoard[4][3].piece);
      expect(actualBoard[4][4].piece).to.equal(expectedBoard[4][4].piece);
      expect(actualBoard[4][5].piece).to.equal(expectedBoard[4][5].piece);
      expect(actualBoard[4][6].piece).to.equal(expectedBoard[4][6].piece);
      expect(actualBoard[4][7].piece).to.equal(expectedBoard[4][7].piece);

      expect(actualBoard[5][0].piece).to.equal(expectedBoard[5][0].piece);
      expect(actualBoard[5][1].piece).to.equal(expectedBoard[5][1].piece);
      expect(actualBoard[5][2].piece).to.equal(expectedBoard[5][2].piece);
      expect(actualBoard[5][3].piece).to.equal(expectedBoard[5][3].piece);
      expect(actualBoard[5][4].piece).to.equal(expectedBoard[5][4].piece);
      expect(actualBoard[5][5].piece).to.equal(expectedBoard[5][5].piece);
      expect(actualBoard[5][6].piece).to.equal(expectedBoard[5][6].piece);
      expect(actualBoard[5][7].piece).to.equal(expectedBoard[5][7].piece);

      expect(actualBoard[6][0].piece.type).to.equal(expectedBoard[6][0].piece.type);
      expect(actualBoard[6][1].piece.type).to.equal(expectedBoard[6][1].piece.type);
      expect(actualBoard[6][2].piece.type).to.equal(expectedBoard[6][2].piece.type);
      expect(actualBoard[6][3].piece.type).to.equal(expectedBoard[6][3].piece.type);
      expect(actualBoard[6][4].piece.type).to.equal(expectedBoard[6][4].piece.type);
      expect(actualBoard[6][5].piece.type).to.equal(expectedBoard[6][5].piece.type);
      expect(actualBoard[6][6].piece.type).to.equal(expectedBoard[6][6].piece.type);
      expect(actualBoard[6][7].piece.type).to.equal(expectedBoard[6][7].piece.type);

      expect(actualBoard[7][0].piece.type).to.equal(expectedBoard[7][0].piece.type);
      expect(actualBoard[7][1].piece.type).to.equal(expectedBoard[7][1].piece.type);
      expect(actualBoard[7][2].piece.type).to.equal(expectedBoard[7][2].piece.type);
      expect(actualBoard[7][3].piece.type).to.equal(expectedBoard[7][3].piece.type);
      expect(actualBoard[7][4].piece.type).to.equal(expectedBoard[7][4].piece.type);
      expect(actualBoard[7][5].piece.type).to.equal(expectedBoard[7][5].piece.type);
      expect(actualBoard[7][6].piece.type).to.equal(expectedBoard[7][6].piece.type);
      expect(actualBoard[7][7].piece.type).to.equal(expectedBoard[7][7].piece.type);
    });

    it('random board game state', () => {
      // Arrange
      const inputBoard = [
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        { type: 'P', side: 'W' },
        null,
        null,
        null,
        { type: 'P', side: 'W' },
        null,
        null,
        { type: 'P', side: 'W' },
        { type: 'K', side: 'B' },
        null,
        null,
        null,
        null,
        { type: 'K', side: 'W' },
        { type: 'B', side: 'W' },
        { type: 'P', side: 'W' },
        { type: 'P', side: 'B' },
        null,
        null,
        null,
        { type: 'N', side: 'W' },
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        { type: 'P', side: 'W' },
        null,
        null,
        null,
        { type: 'R', side: 'W' },
        null,
        { type: 'R', side: 'B' },
        null,
        { type: 'P', side: 'B' },
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        { type: 'B', side: 'W' },
        { type: 'B', side: 'B' },
        null,
        null,
        null,
        { type: 'N', side: 'B' },
        null,
      ];

      const expectedBoard = [
        [
          {
            piece: null,
          },
          {
            piece: null,
          },
          {
            piece: null,
          },
          {
            piece: null,
          },
          {
            piece: null,
          },
          {
            piece: null,
          },
          {
            piece: null,
          },
          {
            piece: null,
          },
        ],
        [
          {
            piece: null,
          },
          {
            piece: {
              x: 1,
              y: 1,
              type: 'P',
              color: 'W',
            },
          },
          {
            piece: null,
          },
          {
            piece: null,
          },
          {
            piece: null,
          },
          {
            piece: {
              x: 5,
              y: 1,
              type: 'P',
              color: 'W',
            },
          },
          {
            piece: null,
          },
          {
            piece: null,
          },
        ],
        [
          {
            piece: {
              x: 0,
              y: 2,
              type: 'P',
              color: 'W',
            },
          },
          {
            piece: {
              x: 1,
              y: 2,
              type: 'K',
              color: 'B',
            },
          },
          { piece: null },
          { piece: null },
          { piece: null },
          { piece: null },
          {
            piece: {
              x: 6,
              y: 2,
              type: 'K',
              color: 'W',
            },
          },
          {
            piece: {
              x: 7,
              y: 2,
              type: 'B',
              color: 'W',
            },
          },
        ],
        [
          {
            piece: {
              x: 0,
              y: 3,
              type: 'P',
              color: 'W',
            },
          },
          {
            piece: {
              x: 1,
              y: 3,
              type: 'P',
              color: 'B',
            },
          },
          { piece: null },
          { piece: null },
          { piece: null },
          {
            piece: {
              x: 5,
              y: 3,
              type: 'N',
              color: 'W',
            },
          },
          { piece: null },
          { piece: null },
        ],
        [
          { piece: null },
          { piece: null },
          { piece: null },
          { piece: null },
          { piece: null },
          { piece: null },
          { piece: null },
          {
            piece: {
              x: 7,
              y: 4,
              type: 'P',
              color: 'W',
            },
          },
        ],
        [
          { piece: null },
          { piece: null },
          { piece: null },
          {
            piece: {
              x: 3,
              y: 5,
              type: 'R',
              color: 'W',
            },
          },
          { piece: null },
          {
            piece: {
              x: 5,
              y: 5,
              type: 'R',
              color: 'B',
            },
          },
          { piece: null },
          {
            piece: {
              x: 7,
              y: 5,
              type: 'P',
              color: 'B',
            },
          },
        ],
        [
          { piece: null },
          { piece: null },
          { piece: null },
          { piece: null },
          { piece: null },
          { piece: null },
          { piece: null },
          { piece: null },
        ],
        [
          { piece: null },
          {
            piece: {
              x: 1,
              y: 7,
              type: 'B',
              color: 'W',
            },
          },
          {
            piece: {
              x: 2,
              y: 7,
              type: 'B',
              color: 'B',
            },
          },
          { piece: null },
          { piece: null },
          { piece: null },
          {
            piece: {
              x: 6,
              y: 7,
              type: 'N',
              color: 'B',
            },
          },
          { piece: null },
        ],
      ];

      // Act
      const actualBoard = chessBoardService.buildBoardFromGameState(inputBoard);

      // Assert

      expect(actualBoard[0][0].piece).to.equal(expectedBoard[0][0].piece);
      expect(actualBoard[0][1].piece).to.equal(expectedBoard[0][1].piece);
      expect(actualBoard[0][2].piece).to.equal(expectedBoard[0][2].piece);
      expect(actualBoard[0][3].piece).to.equal(expectedBoard[0][3].piece);
      expect(actualBoard[0][4].piece).to.equal(expectedBoard[0][4].piece);
      expect(actualBoard[0][5].piece).to.equal(expectedBoard[0][5].piece);
      expect(actualBoard[0][6].piece).to.equal(expectedBoard[0][6].piece);
      expect(actualBoard[0][7].piece).to.equal(expectedBoard[0][7].piece);

      expect(actualBoard[1][0].piece).to.equal(expectedBoard[1][0].piece);
      expect(actualBoard[1][1].piece.type).to.equal(expectedBoard[1][1].piece.type);
      expect(actualBoard[1][2].piece).to.equal(expectedBoard[1][2].piece);
      expect(actualBoard[1][3].piece).to.equal(expectedBoard[1][3].piece);
      expect(actualBoard[1][4].piece).to.equal(expectedBoard[1][4].piece);
      expect(actualBoard[1][5].piece.type).to.equal(expectedBoard[1][5].piece.type);
      expect(actualBoard[1][6].piece).to.equal(expectedBoard[1][6].piece);
      expect(actualBoard[1][7].piece).to.equal(expectedBoard[1][7].piece);

      expect(actualBoard[2][0].piece.type).to.equal(expectedBoard[2][0].piece.type);
      expect(actualBoard[2][1].piece.type).to.equal(expectedBoard[2][1].piece.type);
      expect(actualBoard[2][2].piece).to.equal(expectedBoard[2][2].piece);
      expect(actualBoard[2][3].piece).to.equal(expectedBoard[2][3].piece);
      expect(actualBoard[2][4].piece).to.equal(expectedBoard[2][4].piece);
      expect(actualBoard[2][5].piece).to.equal(expectedBoard[2][5].piece);
      expect(actualBoard[2][6].piece.type).to.equal(expectedBoard[2][6].piece.type);
      expect(actualBoard[2][7].piece.type).to.equal(expectedBoard[2][7].piece.type);

      expect(actualBoard[3][0].piece.type).to.equal(expectedBoard[3][0].piece.type);
      expect(actualBoard[3][1].piece.type).to.equal(expectedBoard[3][1].piece.type);
      expect(actualBoard[3][2].piece).to.equal(expectedBoard[3][2].piece);
      expect(actualBoard[3][3].piece).to.equal(expectedBoard[3][3].piece);
      expect(actualBoard[3][4].piece).to.equal(expectedBoard[3][4].piece);
      expect(actualBoard[3][5].piece.type).to.equal(expectedBoard[3][5].piece.type);
      expect(actualBoard[3][6].piece).to.equal(expectedBoard[3][6].piece);
      expect(actualBoard[3][7].piece).to.equal(expectedBoard[3][7].piece);

      expect(actualBoard[4][0].piece).to.equal(expectedBoard[4][0].piece);
      expect(actualBoard[4][1].piece).to.equal(expectedBoard[4][1].piece);
      expect(actualBoard[4][2].piece).to.equal(expectedBoard[4][2].piece);
      expect(actualBoard[4][3].piece).to.equal(expectedBoard[4][3].piece);
      expect(actualBoard[4][4].piece).to.equal(expectedBoard[4][4].piece);
      expect(actualBoard[4][5].piece).to.equal(expectedBoard[4][5].piece);
      expect(actualBoard[4][6].piece).to.equal(expectedBoard[4][6].piece);
      expect(actualBoard[4][7].piece.type).to.equal(expectedBoard[4][7].piece.type);

      expect(actualBoard[5][0].piece).to.equal(expectedBoard[5][0].piece);
      expect(actualBoard[5][1].piece).to.equal(expectedBoard[5][1].piece);
      expect(actualBoard[5][2].piece).to.equal(expectedBoard[5][2].piece);
      expect(actualBoard[5][3].piece.type).to.equal(expectedBoard[5][3].piece.type);
      expect(actualBoard[5][4].piece).to.equal(expectedBoard[5][4].piece);
      expect(actualBoard[5][5].piece.type).to.equal(expectedBoard[5][5].piece.type);
      expect(actualBoard[5][6].piece).to.equal(expectedBoard[5][6].piece);
      expect(actualBoard[5][7].piece.type).to.equal(expectedBoard[5][7].piece.type);

      expect(actualBoard[6][0].piece).to.equal(expectedBoard[6][0].piece);
      expect(actualBoard[6][1].piece).to.equal(expectedBoard[6][1].piece);
      expect(actualBoard[6][2].piece).to.equal(expectedBoard[6][2].piece);
      expect(actualBoard[6][3].piece).to.equal(expectedBoard[6][3].piece);
      expect(actualBoard[6][4].piece).to.equal(expectedBoard[6][4].piece);
      expect(actualBoard[6][5].piece).to.equal(expectedBoard[6][5].piece);
      expect(actualBoard[6][6].piece).to.equal(expectedBoard[6][6].piece);
      expect(actualBoard[6][7].piece).to.equal(expectedBoard[6][7].piece);

      expect(actualBoard[7][0].piece).to.equal(expectedBoard[7][0].piece);
      expect(actualBoard[7][1].piece.type).to.equal(expectedBoard[7][1].piece.type);
      expect(actualBoard[7][2].piece.type).to.equal(expectedBoard[7][2].piece.type);
      expect(actualBoard[7][3].piece).to.equal(expectedBoard[7][3].piece);
      expect(actualBoard[7][4].piece).to.equal(expectedBoard[7][4].piece);
      expect(actualBoard[7][5].piece).to.equal(expectedBoard[7][5].piece);
      expect(actualBoard[7][6].piece.type).to.equal(expectedBoard[7][6].piece.type);
      expect(actualBoard[7][7].piece).to.equal(expectedBoard[7][7].piece);
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
      const inputBoard = [
        [{ location: { x: 0, y: 0 }, piece: { name: 'some object' } }],
      ];
      const inputCell = { x: 0, y: 0 };
      const expectedOutput = false;

      // Act
      const actualOutput = chessBoardService.isCellEmpty(inputCell, inputBoard);

      // Assert
      expect(actualOutput).to.equal(expectedOutput);
    });

    it('Cell does not exist and is not empty', () => {
      // Arrange
      const inputBoard = [
        [{ location: { x: 0, y: 1 }, piece: { name: 'some object' } }],
      ];
      const inputCell = { x: 0, y: 0 };

      // Act

      // Assert
      expect(() => {
        chessBoardService.isCellEmpty(inputCell, inputBoard);
      }).to.throw('Cell not found');
    });

    it('Cell does not exist and is empty', () => {
      // Arrange
      const inputBoard = [[{ location: { x: 0, y: 1 }, piece: null }]];
      const inputCell = { x: 0, y: 0 };

      // Act

      // Assert
      expect(() => {
        chessBoardService.isCellEmpty(inputCell, inputBoard);
      }).to.throw('Cell not found');
    });
  });

  describe('isValidCell()', () => {
    it('Cell valid', () => {
      [
        { input: { x: 0, y: 0 }, expectedOutput: true },
        { input: { x: 7, y: 7 }, expectedOutput: true },
      ].forEach((testCase) => {
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
      const inputBoard = [
        [{ location: { x: 0, y: 0 }, piece: { name: 'some object' } }],
      ];

      const expectedOutput = inputBoard[0][0];

      // Act
      const actualOutput = chessBoardService.getCell(inputLocation, inputBoard);
      // Assert
      expect(actualOutput).to.equal(expectedOutput);
    });

    it('Cell not found - bad x', () => {
      // Arrange
      const inputLocation = { x: 1, y: 0 };
      const inputBoard = [
        [{ location: { x: 0, y: 0 }, piece: { name: 'some object' } }],
      ];

      const expectedOutput = null;

      // Act
      const actualOutput = chessBoardService.getCell(inputLocation, inputBoard);
      // Assert
      expect(actualOutput).to.equal(expectedOutput);
    });

    it('Cell not found - bad y', () => {
      // Arrange
      const inputLocation = { x: 0, y: 1 };
      const inputBoard = [
        [{ location: { x: 0, y: 0 }, piece: { name: 'some object' } }],
      ];

      const expectedOutput = null;

      // Act
      const actualOutput = chessBoardService.getCell(inputLocation, inputBoard);
      // Assert
      expect(actualOutput).to.equal(expectedOutput);
    });

    it('Cell not found - bad x and y', () => {
      // Arrange
      const inputLocation = { x: 1, y: 1 };
      const inputBoard = [
        [{ location: { x: 0, y: 0 }, piece: { name: 'some object' } }],
      ];

      const expectedOutput = null;

      // Act
      const actualOutput = chessBoardService.getCell(inputLocation, inputBoard);
      // Assert
      expect(actualOutput).to.equal(expectedOutput);
    });
  });
});

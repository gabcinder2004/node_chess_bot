/* eslint-disable arrow-body-style */
// const request = require('supertest');
// const httpStatus = require('http-status');
const { expect } = require('chai');
const sinon = require('sinon');
// const app = require('../../../index');

const pieceDirections = require('../../models/pieceDirections');

const sandbox = sinon.createSandbox();

describe('Piece Directions', () => {
  beforeEach(async () => {

  });

  afterEach(() => sandbox.restore());

  describe('GetPieceDirections', () => {
    it('White Pawn', () => {
      // Arrange
      const expectedOutput = [[0, 1]];
      // Act
      const actualOutput = pieceDirections.getPieceDirections('P', 'W');
      // Assert
      expect(actualOutput[0][0]).to.be.equal(expectedOutput[0][0]);
      expect(actualOutput[0][1]).to.be.equal(expectedOutput[0][1]);
    });

    it('White Pawn Defaulted', () => {
      // Arrange
      const expectedOutput = [[0, 1]];
      // Act
      const actualOutput = pieceDirections.getPieceDirections('P');
      // Assert
      expect(actualOutput[0][0]).to.be.equal(expectedOutput[0][0]);
      expect(actualOutput[0][1]).to.be.equal(expectedOutput[0][1]);
    });

    it('Black Pawn', () => {
      // Arrange
      const expectedOutput = [[0, -1]];
      // Act
      const actualOutput = pieceDirections.getPieceDirections('P', 'B');
      // Assert
      expect(actualOutput[0][0]).to.be.equal(expectedOutput[0][0]);
      expect(actualOutput[0][1]).to.be.equal(expectedOutput[0][1]);
    });

    it('Invalid Piece', () => {
      // Arrange
      // Act
      // Assert
      expect(() => { pieceDirections.getPieceDirections('X', 'B'); }).to.throw('Unable to get piece directions. Piece does not exist.');
    });
  });
});

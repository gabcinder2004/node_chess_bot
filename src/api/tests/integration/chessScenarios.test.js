/* eslint-disable arrow-body-style */
// const request = require('supertest');
// const httpStatus = require('http-status');
const { expect } = require('chai');
// const app = require('../../../index');

const _ = require('lodash');
const controller = require('../../controllers/chess.controller');

describe('Chess Game Scenarios', () => {
  describe('White', () => {
    const depth = 3;
    const testCases = [
      { id: 1, fen: '1N1kr3/1pr5/3p1pB1/P3N3/4R3/2p5/K6P/1n4q1 w - - 0 1', result: 'e5-c6' },
      { id: 2, fen: '1N1kB3/1pr5/3p1p2/P3N3/4R3/2p5/K6q/1n6 w - - 0 1', result: 'a2-b3' },
      { id: 3, fen: '4r1q1/2p1N1N1/P2PnK1n/2p5/4P2Q/1k6/2p1P3/8 w - - 0 1', result: 'e7-g8' },
      { id: 4, fen: '1b6/1k2B3/1qR4P/2p3pp/8/7K/b1nP3p/2rN4 w - - 0 1', result: 'c6-b6' },
      { id: 5, fen: 'r1b1kbnr/p5pp/4q3/8/8/8/8/3QK3 w KQkq -', result: 'd1-e2' },
      { id: 6, fen: '8/n2pp1P1/2k1p3/2p1R3/K3b1P1/4P3/1Pp4P/2R5 w - - 0 1', result: 'e5-e4' },
      { id: 7, fen: '6K1/P1B4R/bN5p/p2r1P2/PpRq1p1p/n1PB1P2/1kP5/2b1Q2r w - - 0 1', result: 'c3-d4' },
      { id: 8, fen: 'Bq6/Pn1P1Pb1/b4NK1/Pp2ppPp/r1P5/2pRB1k1/3NP3/6r1 w - - 0 1', result: 'e3-g1' },
      { id: 9, fen: '1Q5B/r1R2n1p/3n1Pkr/R1PpPp1N/2Bp1bP1/pp5P/1PpNP3/2K5 w - - 0 1', result: 'd8-g8' },
      { id: 10, fen: '8/7b/1r1k1K1p/2N5/6p1/p1B1n3/8/8 w - - 0 1', result: 'f6-g7' },
    ];
    _.forEach(testCases, (testCase) => {
      it(`Test Case: ${testCase.id}`, () => {
        const actualMove = controller.getBestMove(testCase.fen, depth);
        expect(actualMove.move).to.equal(testCase.result);
      });
    });
  });
});

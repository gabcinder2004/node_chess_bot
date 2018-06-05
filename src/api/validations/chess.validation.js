const Joi = require('joi');

module.exports = {
  // POST /v1/chess
  getMove: {
    body: {
      fen: Joi.string().required(),
      gameid: Joi.number(),
    },
  },
};

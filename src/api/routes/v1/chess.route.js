const express = require('express');
const validate = require('express-validation');
const controller = require('../../controllers/chess.controller');
// const { authorize, ADMIN, LOGGED_USER } = require('../../middlewares/auth');
const {
  getMove,
} = require('../../validations/chess.validation');

const router = express.Router();

/**
 * Load user when API with userId route parameter is hit
 */
// router.param('userId', controller.load);
router
  .route('/')
  .post(validate(getMove), controller.getMove);

module.exports = router;

const express = require('express');
const router = express.Router();

// Services
const {
  getGames,
} = require('../services/gamesService');

// Util
const {
  asyncWrapper,
} = require('../util/apiUtils');

router.get('/', asyncWrapper(async (req, res) => {
  const data = await getGames();
  res.status(200).json(data);
}));

module.exports = {
  gamesRouter: router,
};

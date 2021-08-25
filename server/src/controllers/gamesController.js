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
  const {
    userId,
  } = req.user;

  const games = await getGames(userId);
  res.status(200).json(games);
}));

module.exports = {
  gamesRouter: router,
};

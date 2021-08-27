const express = require('express');
const { Game } = require('../models/gameModel');
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

router.post('/', asyncWrapper(async (req, res) => {
  const game = new Game({
    ...req.body
  });

  await game.save();
  res.status(200).json({message: 'Done'});
}));

module.exports = {
  gamesRouter: router,
};

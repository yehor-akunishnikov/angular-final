const { Game } = require('../models/gameModel');

const getGames = async() => {
  return await Game
    .find()
    .select(['-__v']);
};

module.exports = {
  getGames,
};

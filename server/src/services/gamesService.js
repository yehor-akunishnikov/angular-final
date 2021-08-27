const { Game } = require('../models/gameModel');
const { User } = require('../models/userModel');

const getGames = async(userId) => {
  const { games: userLibrary } = await User.findById(userId);

  const gamesList = await Game
    .find({ 
      '_id': { $nin: userLibrary, } 
    })
    .sort({ 'price.val': 1 })
    .select(['-__v']);

  return gamesList.map(game => {
    const letters = game.description.length;

    if(letters > 200) {
      game.description = game.description.slice(0, 200).trim() + '...';
    }

    return game;
  });
};

module.exports = {
  getGames,
};

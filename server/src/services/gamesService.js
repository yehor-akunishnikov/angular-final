const { Game } = require('../models/gameModel');
const { User } = require('../models/userModel');

const getGames = async(userId) => {
  const { games } = await User.findById(userId);

  return await Game
    .find({ 
      '_id': { 
        $nin: games,
      } 
    }).select(['-__v']);
};

module.exports = {
  getGames,
};

const {User} = require('../models/userModel');
const {Game} = require('../models/gameModel');
const { InvalidRequestError } = require('../util/customErrors');

const getUserInfoById = async (userId) => {
  return await User
      .findOne({_id: userId})
      .select(['__id', 'age', 'username', 'email']);
};

const deleteUserById = async (userId) => {
  await User.findOneAndRemove({_id: userId});
};

const updateUserInfoById = async (userId, data) => {
  await User.findByIdAndUpdate(userId, {
    ...data
  });
}

// Friends

const getUserFriendsById = async (userId) => {
  const { friends } = await User.findById(userId);

  return await User.find({
    '_id': {
      $in: friends
    },
  }, (err, friendsList) => {
    if(err) throw new InvalidRequestError();
    return friendsList;
  }).select(['_id', 'username']);
}

const addFriendById = async (userId, friendId) => {
  const { username: friendName } = await User.findById(friendId);
  await User.findByIdAndUpdate(userId, { $push: { friends: friendId } });

  return friendName;
}

const removeFriendById = async (userId, friendId) => {
  const { username: friendName } = await User.findById(friendId);
  await User.findByIdAndUpdate(userId, { $pull: { friends: friendId } });

  return friendName;
}

// Games

const getUserGamesById = async (userId) => {
  const { games } = await User.findById(userId);

  return await Game.find({
    '_id': {
      $in: games
    },
  }, (err, gamesList) => {
    if(err) throw new InvalidRequestError();
    return gamesList;
  }).select(['-__v']);
}

const addGameById = async (userId, gameId) => {
  const { name: gameName } = await Game.findById(gameId);
  await User.findByIdAndUpdate(userId, { $push: { games: gameId } });

  return gameName;
}

const removeGameById = async (userId, gameId) => {
  const { name: gameName } = await Game.findById(gameId);
  await User.findByIdAndUpdate(userId, { $pull: { games: gameId } });

  return gameName;
}

module.exports = {
  getUserInfoById,
  deleteUserById,
  updateUserInfoById,

  getUserFriendsById,
  addFriendById,
  removeFriendById,

  getUserGamesById,
  addGameById,
  removeGameById,
};

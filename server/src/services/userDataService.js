const { User } = require('../models/userModel');
const { Game } = require('../models/gameModel');
const { Friendship } = require('../models/friendshipModel');
const { InvalidRequestError } = require('../util/customErrors');

const getUserInfoById = async (userId) => {
  return await User
      .findOne({_id: userId})
      .select(['_id', 'age', 'username', 'email']);
};

const deleteUserById = async (userId) => {
  await User.findOneAndRemove({_id: userId});
};

const updateUserInfoById = async (userId, data) => {
  await User.findByIdAndUpdate(userId, {
    ...data
  });
}

// Friend invite
const createFriendInvite = async(requesterId, recipientId) => {
  const newFriendship = new Friendship({
    requester: requesterId,
    recipient: recipientId,
  });

  await newFriendship.save();

  return newFriendship._id;
};

const getFriendInvites = async(userId) => {
  const invites = await Friendship.find({
    'recipient': userId,
  }).select('-__v');

  const modifiedInvites = invites.map(async({requester, _id}) => {
    const {username: requesterName } = await User.findById(requester);

    return {requester, requesterName, _id};
  });

  return await Promise.all(modifiedInvites);
};

const acceptFriendInvite = async(inviteId) => {
  const {requester, recipient} = await Friendship.findById(inviteId);

  await User.findByIdAndUpdate(requester, { $push: { friends: recipient } });
  await User.findByIdAndUpdate(recipient, { $push: { friends: requester } });
  await Friendship.findByIdAndRemove(inviteId);
}

const declineFriendInvite = async(inviteId) => {
  await Friendship.findByIdAndRemove(inviteId);
}

// Friends
const getFriendsById = async(userId) => {
  const { friends } = await User.findById(userId);

  return await User.find({
    '_id': {
      $in: friends
    },
  }).select(['_id', 'username']);
};

const removeFriendById = async(userId, friendId) => {
  const user = await User.findById(userId);
  const friend = await User.findById(friendId);

  user.friends = user.friends.filter(f => f._id != friendId);
  friend.friends = friend.friends.filter(f => f._id != userId);

  await user.save();
  await friend.save();
};

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

  createFriendInvite,
  getFriendInvites,
  acceptFriendInvite,
  declineFriendInvite,

  getFriendsById,
  removeFriendById,

  getUserGamesById,
  addGameById,
  removeGameById,
};

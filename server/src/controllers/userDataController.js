const express = require('express');
const router = express.Router();

// Services
const {
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
} = require('../services/userDataService');

// Util
const {
  asyncWrapper,
} = require('../util/apiUtils');

router.get('/', asyncWrapper(async (req, res) => {
  const {
    userId,
  } = req.user;

  const data = await getUserInfoById(userId);
  res.status(200).json(data);
}));

router.put('/', asyncWrapper(async (req, res) => {
  const {
    userId,
  } = req.user;

  await updateUserInfoById(userId, req.body);
  res.status(200).json({ message: 'Profile updated successfully' });
}));

router.delete('/', asyncWrapper(async (req, res) => {
  const {
    userId,
  } = req.user;

  await deleteUserById(userId);
  res.status(200).json({ message: 'Profile deleted successfully' });
}));

// Friend invites
router.get('/friend-invites', asyncWrapper(async (req, res) => {
  const {
    userId,
  } = req.user;

  const invites = await getFriendInvites(userId);
  res.status(200).json(invites);
}));

router.post('/friend-invites', asyncWrapper(async (req, res) => {
  const {
    userId,
  } = req.user;

  const {
    userId: friendId,
  } = req.body;

  const inviteId = await createFriendInvite(userId, friendId);
  res.status(200).json(inviteId);
}));

router.put('/friend-invites', asyncWrapper(async (req, res) => {
  const {
    inviteId,
  } = req.body;

  console.log(inviteId);

  await acceptFriendInvite(inviteId);
  res.status(200).json({ message: 'Invite successfully accepted!' });
}));

router.delete('/friend-invites', asyncWrapper(async (req, res) => {
  const {
    inviteId,
  } = req.body;

  await declineFriendInvite(inviteId);
  res.status(200).json({ message: 'Invite declined!' });
}));

// Friends
router.get('/friends', asyncWrapper(async (req, res) => {
  const {
    userId,
  } = req.user;

  const friends = await getFriendsById(userId);
  res.status(200).json(friends);
}));

router.delete('/friends', asyncWrapper(async (req, res) => {
  const {
    userId,
  } = req.user;

  const {
    friendId,
  } = req.body;

  await removeFriendById(userId, friendId);
  res.status(200).json({ message: 'Friend removed!' });
}));



// Games
router.get('/games', asyncWrapper(async (req, res) => {
  const {
    userId,
  } = req.user;

  const games = await getUserGamesById(userId);
  res.status(200).json(games);
}));

router.put('/games', asyncWrapper(async (req, res) => {
  const {
    userId,
  } = req.user;

  const {
    gameId,
  } = req.body;

  const gameName = await addGameById(userId, gameId);
  res.status(200).json({ message: `${gameName} added successfully to library` });
}));

router.delete('/games', asyncWrapper(async (req, res) => {
  const {
    userId,
  } = req.user;

  const {
    gameId,
  } = req.body;

  const gameName = await removeGameById(userId, gameId);
  res.status(200).json({ message: `${gameName} successfully removed from library` });
}));

module.exports = {
  userDataRouter: router,
};

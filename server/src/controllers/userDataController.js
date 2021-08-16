const express = require('express');
const router = express.Router();

// Services
const {
  getUserInfoById,
  deleteUserById,
  updateUserInfoById,

  getUserFriendsById,
  addFriendById,
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

// Friends

router.get('/friends', asyncWrapper(async (req, res) => {
  const {
    userId,
  } = req.user;

  const friendsList = await getUserFriendsById(userId);
  res.status(200).json(friendsList);
}));

router.put('/friends', asyncWrapper(async (req, res) => {
  const {
    userId,
  } = req.user;

  const {
    friendId,
  } = req.body;

  const friendName = await addFriendById(userId, friendId);
  res.status(200).json({ message: `${friendName} added successfully to friendlist` });
}));

router.delete('/friends', asyncWrapper(async (req, res) => {
  const {
    userId,
  } = req.user;

  const {
    friendId,
  } = req.body;

  const friendName = await removeFriendById(userId, friendId);
  res.status(200).json({ message: `${friendName} successfully removed from friendlist` });
}));

// Games

router.get('/games', asyncWrapper(async (req, res) => {
  const {
    userId,
  } = req.user;

  const gamesList = await getUserGamesById(userId);
  res.status(200).json(gamesList);
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

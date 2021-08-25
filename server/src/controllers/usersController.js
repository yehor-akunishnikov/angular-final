const express = require('express');
const router = express.Router();

// Services
const {
  getUsers,
} = require('../services/usersService');

// Util
const {
  asyncWrapper,
} = require('../util/apiUtils');

router.get('/', asyncWrapper(async (req, res) => {
  const {
    userId,
  } = req.user;

  const users = await getUsers(userId);
  res.status(200).json(users);
}));

module.exports = {
  usersRouter: router,
};

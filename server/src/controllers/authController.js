const express = require('express');
const router = express.Router();

// Services
const {
  registration,
  signIn,
} = require('../services/authService');

// Util
const {
  asyncWrapper,
} = require('../util/apiUtils');

// Validation
const {
  registrationValidator,
  loginValidator,
} = require('../middleware/validationMiddleware');

router.post(
    '/register',
    registrationValidator,
    asyncWrapper(async (req, res) => {
      const {
        username,
        password,
      } = req.body;

      await registration({username, password});

      res.status(200).json({
        message: 'Profile created successfully',
      });
    }));

router.post(
    '/login',
    loginValidator,
    asyncWrapper(async (req, res) => {
      const {
        username,
        password,
      } = req.body;

      const jwt_token = await signIn({username, password});

      res.status(200).json({
        jwt_token,
      });
    }));

module.exports = {
  authRouter: router,
};

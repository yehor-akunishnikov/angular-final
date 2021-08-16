const jwt = require('jsonwebtoken');
const {User} = require('../models/userModel');

// Errors
const {UnauthorizedError} = require('../util/customErrors');

const authMiddleware = async (req, res, next) => {
  try {
    const {
      authorization,
    } = req.headers;

    if (!authorization) {
      throw new UnauthorizedError('Please, provide "authorization" header');
    }

    // Достаём второй елемент из массива - token
    const [, jwt_token] = authorization.split(' ');

    if (!jwt_token) {
      throw new UnauthorizedError('Please, include token to header');
    }

    const tokenPayload = jwt.verify(jwt_token, 'secret', (err, data) => {
      if(err) {
        throw new UnauthorizedError('Token is expired');
      }

      return data;
    });
    const userExists = await User.countDocuments({_id: tokenPayload._id}) > 0;

    if (!userExists) {
      throw new UnauthorizedError('Login again, please!');
    }

    req.user = {
      userId: tokenPayload._id,
      username: tokenPayload.username,
    };
    next();
  } catch (err) {
    res.status(err.status).json({message: err.message});
  }
};

module.exports = {
  authMiddleware,
};

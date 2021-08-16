const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {User} = require('../models/userModel');

// Errors
const {
  InvalidRequestError,
} = require('../util/customErrors');

const registration = async ({username, password}) => {
  const user = new User({
    username,
    password: await bcrypt.hash(password, 10),
  });

  await user.save();
};

const signIn = async ({username, password}) => {
  const user = await User.findOne({username});

  if (!user || !await bcrypt.compare(password, user.password)) {
    throw new InvalidRequestError('Incorrect password or username');
  }

  const jwt_token = jwt.sign(
    {
      _id: user._id,
      username: user.username,
    }, 
    'secret',
    { expiresIn: '1h' },
  );

  return jwt_token;
};

module.exports = {
  registration,
  signIn,
};

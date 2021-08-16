const {User} = require('../models/userModel');

const getUsers = async(userId) => {
  return await User
    .find( { _id: { $nin: [userId] } } )
    .select(['_id', 'username']);
};

module.exports = {
  getUsers,
};

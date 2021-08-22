const {User} = require('../models/userModel');

const getUsers = async(userId) => {
  const { friends } = await User.findById(userId);

  return await User
    .find( { _id: { $nin: [userId, ...friends] } } )
    .select(['_id', 'username']);
};

module.exports = {
  getUsers,
};

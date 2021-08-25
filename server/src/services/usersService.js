const { Friendship } = require('../models/friendshipModel');
const {User} = require('../models/userModel');

const getUsers = async (userId) => {
  const { friends: friendsIds } = await User.findById(userId);

  let users = await User.find({
    '_id': {
      $nin: [...friendsIds, userId],
    },
  }).select(['_id', 'username']);

  users = users.map(({_id, username}) => {
    return {_id, username, status: 0 };
  });

  const invites = await Friendship.find({
    $or: [
      { 'requester': userId },
      { 'recipient': userId },
    ],
  });

  invites.forEach(invite => {
    let userIndex = users.findIndex(user => user._id == invite.requester.toString());
    let type = 'requester';

    if (userIndex === -1) {
      userIndex = users.findIndex(user => user._id == invite.recipient.toString());
      type = 'recipient';
    }

    users[userIndex].status = invite.status;
    users[userIndex].type = type;
    users[userIndex].inviteId = invite._id;
  });

  return users;
};

module.exports = {
  getUsers,
};

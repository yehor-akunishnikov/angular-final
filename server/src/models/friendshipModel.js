const mongoose = require('mongoose');

const Friendship = mongoose.model('Friendship', {
  requester: {
    type: mongoose.Schema.ObjectId,
    required: true,
  },
  recipient: {
      type: mongoose.Schema.ObjectId,
      required: true,
  },
  status: {
    type: Number,
    default: 1,
  }
});

module.exports = {Friendship};

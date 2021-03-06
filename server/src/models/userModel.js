const mongoose = require('mongoose');

const User = mongoose.model('User', {
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  created_date: {
    type: Date,
    default: Date.now(),
  },
  email: {
    type: String,
    default: '',
  },
  age: {
    type: Number,
    default: null
  },
  friends: {
    type: Array,
    default: [],
    items: {
      type: String,
    },
  },
  games: {
    type: Array,
    default: [],
    items: {
      type: String,
    },
  }
});

module.exports = {User};

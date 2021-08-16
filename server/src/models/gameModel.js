const mongoose = require('mongoose');

const Game = mongoose.model('Game', {
  name: {
    type: String,
    required: true,
    unique: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    default: 'Game descript...',
  },
  tags: {
    type: Array,
    default: [],
    items: {
      type: mongoose.Schema.ObjectId,
    },
  }
});

module.exports = {Game};

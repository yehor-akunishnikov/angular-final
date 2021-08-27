const mongoose = require('mongoose');

const Game = mongoose.model('Game', {
  name: {
    type: String,
    required: true,
  },
  price: {
    type: {
      val: Number,
      currency: String,
    },
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

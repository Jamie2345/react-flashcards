const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cardSchema = require('./Cards');

const ACCESS_LEVELS = {
  PUBLIC: 'public',
  FRIENDS_ONLY: 'friendsOnly',
  PRIVATE: 'private',
};

const deckSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  topic: {
    type: String,
    required: false,
  },
  creator: {
    type: String,
    required: true,
  },
  accessLevel: {
    type: String,
    enum: Object.values(ACCESS_LEVELS),
    default: ACCESS_LEVELS.PRIVATE,
  },
  cards: {
    type: [cardSchema],
    required: false,
  },
  length: {
    type: Number,
    required: true,
  }

}, {timestamps: true})

const Deck = mongoose.model('Deck', deckSchema);
module.exports = Deck;
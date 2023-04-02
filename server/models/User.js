const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pendingSchema = require('./Pending');
const friendSchema = require('./Friends');

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  friends: {
    type: [friendSchema],
  },
  pendingFriends: {
    type: pendingSchema,
  },
  refreshToken: [String]

}, {timestamps: true})

const User = mongoose.model('User', userSchema)
module.exports = User
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const friendSchema = require('./Friends')

const pendingSchema = new Schema({
  incoming: {
    type: [friendSchema]
  },
  outgoing: {
    type: [friendSchema]
  },
}, { _id : false } );

module.exports = pendingSchema;
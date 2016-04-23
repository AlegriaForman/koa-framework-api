'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var supercarSchema = new Schema({
  make: {
    type: String,
    required: true
  },
  model: {
    type: String
  },
  zeroToSixty: {
    type: Number
  },
  price: {
    type: Number
  }
});

module.exports = mongoose.model('Supercar', supercarSchema);

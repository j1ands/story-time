'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var AlchemySchema = new Schema({
  name: String,
  info: String,
  active: Boolean
});

module.exports = mongoose.model('Alchemy', AlchemySchema);
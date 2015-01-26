'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var StorySchema = new Schema({
  author: {
  	type: Schema.Types.ObjectId,
  	ref: 'User'
  },
  text: Array,
  headline: String,
  name: String,
  nyurl: String
});

module.exports = mongoose.model('Story', StorySchema);
'use strict';

var _ = require('lodash');
var Story = require('./story.model');

// Get list of storys
exports.index = function(req, res) {
  Story.find(function (err, storys) {
    if(err) { return handleError(res, err); }
    return res.json(200, storys);
  });
};

// Get a single story
exports.show = function(req, res) {
  Story.findById(req.params.id, function (err, story) {
    if(err) { return handleError(res, err); }
    if(!story) { return res.send(404); }
    return res.json(story);
  });
};

// Creates a new story in the DB.
exports.create = function(req, res) {

  console.log(req.body);

  var newStory = {
    author: req.body.data.author,
    name: req.body.data.name,
    text: req.body.data.text,
    headline: req.body.data.headline,
    nyurl: req.body.data.nyurl
  }
  Story.create(newStory, function(err, story) {
    if(err) { return handleError(res, err); }
    return res.json(201, {id:story._id});
  });
};

// Updates an existing story in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Story.findById(req.params.id, function (err, story) {
    if (err) { return handleError(res, err); }
    if(!story) { return res.send(404); }
    var updated = _.merge(story, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, story);
    });
  });
};

// Deletes a story from the DB.
exports.destroy = function(req, res) {
  Story.findById(req.params.id, function (err, story) {
    if(err) { return handleError(res, err); }
    if(!story) { return res.send(404); }
    story.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
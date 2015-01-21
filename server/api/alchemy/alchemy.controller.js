'use strict';

var _ = require('lodash');
var Alchemy = require('./alchemy.model');
var AlchemyAPI = require('./alchemyapi');
var alchemyapi = new AlchemyAPI();

// Get list of alchemys
// exports.index = function(req, res) {
//   Alchemy.find(function (err, alchemys) {
//     if(err) { return handleError(res, err); }
//     return res.json(200, alchemys);
//   });
// };
var myText = "Whoa, AlchemyAPI's Node.js SDK is really great, I can't wait to build my app!";

exports.index = function(req, res) {
  alchemyapi.sentiment("text", myText, {}, function(response) {
    console.log(response);
    //res.send(200, "Sentiment: " + response["docSentiment"]["type"]);
    res.json(200, response);

  });
}

// Get a single alchemy
exports.show = function(req, res) {
  Alchemy.findById(req.params.id, function (err, alchemy) {
    if(err) { return handleError(res, err); }
    if(!alchemy) { return res.send(404); }
    return res.json(alchemy);
  });
};

// Creates a new alchemy in the DB.
exports.create = function(req, res) {
  Alchemy.create(req.body, function(err, alchemy) {
    if(err) { return handleError(res, err); }
    return res.json(201, alchemy);
  });
};

// Updates an existing alchemy in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Alchemy.findById(req.params.id, function (err, alchemy) {
    if (err) { return handleError(res, err); }
    if(!alchemy) { return res.send(404); }
    var updated = _.merge(alchemy, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, alchemy);
    });
  });
};

// Deletes a alchemy from the DB.
exports.destroy = function(req, res) {
  Alchemy.findById(req.params.id, function (err, alchemy) {
    if(err) { return handleError(res, err); }
    if(!alchemy) { return res.send(404); }
    alchemy.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
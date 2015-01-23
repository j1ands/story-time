'use strict';

var _ = require('lodash');
var Nyt = require('./nyt.model');
var NYTAPI = require('./nytapi');
var nytAPI = new NYTAPI();

// Get list of nyts
exports.index = function(req, res) {
  nytAPI.search("fq=romney&facet_field=day_of_week&begin_date=20120101&end_date=20120101&api-key=", function(content){
    res.json(200, content.response.docs[0]);
  })
};

// Get a single nyt
exports.show = function(req, res) {
  Nyt.findById(req.params.id, function (err, nyt) {
    if(err) { return handleError(res, err); }
    if(!nyt) { return res.send(404); }
    return res.json(nyt);
  });
};

// Creates a new nyt in the DB.
exports.create = function(req, res) {
  Nyt.create(req.body, function(err, nyt) {
    if(err) { return handleError(res, err); }
    return res.json(201, nyt);
  });
};

// Updates an existing nyt in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Nyt.findById(req.params.id, function (err, nyt) {
    if (err) { return handleError(res, err); }
    if(!nyt) { return res.send(404); }
    var updated = _.merge(nyt, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, nyt);
    });
  });
};

// Deletes a nyt from the DB.
exports.destroy = function(req, res) {
  Nyt.findById(req.params.id, function (err, nyt) {
    if(err) { return handleError(res, err); }
    if(!nyt) { return res.send(404); }
    nyt.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
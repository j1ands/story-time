'use strict';

var _ = require('lodash');
var Generate = require('./generate.model');
var NYTAPI = require('../nyt/nytapi');
var User = require('../user/user.model')
var nytAPI = new NYTAPI();
var AlchemyAPI = require('../alchemy/alchemyapi');
var alchemyapi = new AlchemyAPI();

// Get list of generates
exports.index = function(req, res) {
  Generate.find(function (err, generates) {
    if(err) { return handleError(res, err); }
    return res.json(200, generates);
  });
};

// Get a single generate
exports.show = function(req, res) {
  // Generate.findById(req.params.id, function (err, generate) {
  //   if(err) { return handleError(res, err); }
  //   if(!generate) { return res.send(404); }
  //   return res.json(generate);
  // });
  nytAPI.search("fq=" + req.params.type + "&api-key=", function(content)
  {
      console.log("content!, ", content);
      //res.json(200, content.response.docs[0]);
      alchemyapi.text('url', content.response.docs[0].web_url, {}, function(cleanText)
      {
        console.log("response!, ", cleanText);
        //res.json(200, response);
        User.findById(req.params.id, function(err, user){
          console.log("user!, ", user);
          //var friends = {list: user.facebook.taggable_friends};
          var friends = {};
          for(var i = 0; i < user.facebook.taggable_friends.data.length; i++)
          {
            friends[i] = user.facebook.taggable_friends.data[i].name;
          }
          res.json(200, friends);
        })
      })
  });
};

// Creates a new generate in the DB.
exports.create = function(req, res) {
  Generate.create(req.body, function(err, generate) {
    if(err) { return handleError(res, err); }
    return res.json(201, generate);
  });
};

// Updates an existing generate in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Generate.findById(req.params.id, function (err, generate) {
    if (err) { return handleError(res, err); }
    if(!generate) { return res.send(404); }
    var updated = _.merge(generate, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, generate);
    });
  });
};

// Deletes a generate from the DB.
exports.destroy = function(req, res) {
  Generate.findById(req.params.id, function (err, generate) {
    if(err) { return handleError(res, err); }
    if(!generate) { return res.send(404); }
    generate.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
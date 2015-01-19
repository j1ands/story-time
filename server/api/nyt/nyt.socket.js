/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Nyt = require('./nyt.model');

exports.register = function(socket) {
  Nyt.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Nyt.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('nyt:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('nyt:remove', doc);
}
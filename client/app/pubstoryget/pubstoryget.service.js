'use strict';

angular.module('storytimeApp')
  .factory('pubstoryget', function ($resource) {
    return $resource('api/storys/:id');
  });

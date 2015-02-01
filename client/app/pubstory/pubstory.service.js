'use strict';

angular.module('storytimeApp')
  .factory('Pubstory', function ($resource) {
    return {
    	post: $resource('api/storys'),
    	get: $resource('api/storys/:id')
    }
  });

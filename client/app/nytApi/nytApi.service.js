'use strict';

angular.module('storytimeApp')
  .factory('nytApi', function ($resource) {
    // Service logic
    // ...

    function nytCall(params)
    {
      return $resource('/api/nyt').get();
    }

    // Public API here
    return {
      get: function (params) {
        return nytCall(params);
      }
    };
  });

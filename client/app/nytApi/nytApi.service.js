'use strict';

angular.module('storytimeApp')
  .factory('nytApi', function ($http) {
    // Service logic
    // ...

    function nytCall(params)
    {
      $http.get('/api/nyt')
        .success(function(things)
        {
          return things;
        })
        .error(function(error)
        {
          throw error;
        });
    }

    // Public API here
    return {
      get: function (params) {
        return nytCall(params);
      }
    };
  });

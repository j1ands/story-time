'use strict';

angular.module('storytimeApp')
  .factory('alchemyApi', function ($resource) {
    // Service logic
    // ...

    function alchemyCall(params)
    {
        return $resource('/api/alchemy').get();
    }
    // Public API here
    return {
      get: function (params) {
        return alchemyCall(params);
      }
    };
  });
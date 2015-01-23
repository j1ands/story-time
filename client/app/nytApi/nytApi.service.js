'use strict';

angular.module('storytimeApp')
  .factory('nytApi', function ($resource, bigres, Auth) {
    // Service logic
    // ...


    function nytCall(params)
    {
      var id = Auth.getCurrentUser()._id;
      bigres.setNY($resource('/api/generate/' + id + '/' + params).get());
    }

    // Public API here
    return {
      get: function (params) {
        return nytCall(params);
      }
    };
  });

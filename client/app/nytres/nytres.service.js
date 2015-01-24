'use strict';

angular.module('storytimeApp')
  .factory('bigres', function () {
    // Service logic
    // ...

    var response = {};

    // Public API here
    return {
      getNY: function () {
        //return response.ny;
        return response;
      },
      setNY: function(obj) {
      	response.ny = obj;
      }
    };
  });

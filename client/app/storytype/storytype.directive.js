'use strict';

angular.module('storytimeApp')
  .directive('storytype', function () {
    return {
      templateUrl: 'app/storytype/storytype.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });
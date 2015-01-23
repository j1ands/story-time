'use strict';

angular.module('storytimeApp')
  .directive('storypanel', function () {
    return {
      templateUrl: 'app/storypanel/storypanel.html',
      restrict: 'EA',
      scope: {
      	title: '=',
      	content: '='
      },
      link: function (scope, element, attrs) {
      }
    };
  });
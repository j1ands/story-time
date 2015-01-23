'use strict';

angular.module('storytimeApp')
  .directive('story', function () {
    return {
      templateUrl: 'app/story/story.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });
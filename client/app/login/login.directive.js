'use strict';

angular.module('storytimeApp')
  .directive('login', function () {
    return {
      templateUrl: 'app/account/login/login.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });
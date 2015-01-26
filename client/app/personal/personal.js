'use strict';

angular.module('storytimeApp')
  .config(function ($stateProvider) {
    // $routeProvider
    //   .when('/personal/:id', {
    //     templateUrl: 'app/personal/personal.html',
    //     controller: 'PersonalCtrl'
    //   });
    $stateProvider
      .state('personal', {
        url: '/personal/:id',
        templateUrl: 'app/personal/personal.html',
        controller: 'PersonalCtrl'
      });
  });
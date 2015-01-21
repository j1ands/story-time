'use strict';

angular.module('storytimeApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('index', {
        url: '/',
        templateUrl: 'app/index/index.html',
        controller: 'IndexCtrl'
      });
  });
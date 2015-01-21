'use strict';

angular.module('storytimeApp')
  .controller('IndexCtrl', function ($scope, nytApi, alchemyApi) {
    $scope.message = 'Hello';

    $scope.alchemyThings;
    $scope.nytThings;

    //debugger;
    $scope.alchemyThings = alchemyApi.get();
    //debugger;
    console.log($scope.alchemyThings);

    //$scope.nytThings = nytApi.get();

  });

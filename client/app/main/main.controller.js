'use strict';

angular.module('storytimeApp')
  .controller('MainCtrl', function ($scope, $http, socket, nytApi, alchemyApi) {
    $scope.awesomeThings = [];

    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
      socket.syncUpdates('thing', $scope.awesomeThings);
    });

    $scope.alchemyThings;
    $scope.nytThings;

    $scope.alchemyThings = alchemyApi.get();

    //$scope.nytThings = nytApi.get();

    $scope.addThing = function() {
      if($scope.newThing === '') {
        return;
      }
      $http.post('/api/things', { name: $scope.newThing });
      $scope.newThing = '';
    };

    $scope.deleteThing = function(thing) {
      $http.delete('/api/things/' + thing._id);
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('thing');
    });
  });

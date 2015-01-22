'use strict';

angular.module('storytimeApp')
  .controller('IndexCtrl', function ($scope, nytApi, alchemyApi) {
    
    var ictrl = this;

    ictrl.alchemyThings;
    ictrl.nytThings;

    ictrl.goToLogin = false;

    ictrl.login = function()
    {
    	ictrl.goToLogin = true;
    }



    //$scope.alchemyThings = alchemyApi.get();
    //$scope.nytThings = nytApi.get();

  });

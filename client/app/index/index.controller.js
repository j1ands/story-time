'use strict';

angular.module('storytimeApp')
  .controller('IndexCtrl', function ($scope, nytApi, alchemyApi, anchorSmoothScroll, $location, Auth) {
    
    var ictrl = this;

    ictrl.alchemyThings;
    ictrl.nytThings;

    ictrl.panel = {value: Auth.getCurrentUser() ? 'storytype' : 'login'};

    // ictrl.goToLogin = {value : false};
    // ictrl.goToStory = {value: false};

    ictrl.login = function(eID)
    {
        // if(Auth.getCurrentUser())
        // {
        //     debugger;
        //     var storyDiv = angular.element(document.getElementById(eID));
        //     storyDiv.removeClass("ng-hide");
        //     anchorSmoothScroll.scrollTo(eID);
        // }
        // else
        // {
        //     var loginDiv = angular.element(document.getElementById(eID));
        //     loginDiv.removeClass("ng-hide");
        //     anchorSmoothScroll.scrollTo(eID);            
        // }

        var div = angular.element(document.getElementById(eID));
        div.removeClass("ng-hide");
        anchorSmoothScroll.scrollTo(eID);
    }


    //$scope.alchemyThings = alchemyApi.get();
    //$scope.nytThings = nytApi.get();

  });

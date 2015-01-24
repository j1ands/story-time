'use strict';

angular.module('storytimeApp')
  .controller('StoryCtrl', function ($scope, nytApi, anchorSmoothScroll, bigres) {
    var sctrl = this;
    $scope.bigres = bigres.getNY();

    sctrl.emptyStory = {value:true};

    $scope.$watch('bigres.ny.$resolved', function(newValue, oldValue){
        //debugger;
        if(oldValue === false && newValue != oldValue)
        {
            sctrl.emptyStory.value = false;
        }
    })

    sctrl.showStory = function(eID)
    {
    	var div = angular.element(document.getElementById(eID));
        div.removeClass("ng-hide");
        anchorSmoothScroll.scrollTo(eID);
    }

    sctrl.military = function()
    {
    	nytApi.get('military');
    	//debugger;
    	sctrl.showStory('story');
    }
  });

'use strict';

angular.module('storytimeApp')
  .controller('StoryCtrl', function ($scope, nytApi, anchorSmoothScroll, bigres) {
    var sctrl = this;
    $scope.bigres = bigres.getNY();

    sctrl.emptyStory = {value:true};

    var flipbook = angular.element(document.getElementById('flipbook'));
    
    //debugger;
    //debugger;

    if(flipbook.context)
    {
        flipbook.turn({
            width: 700,
            height: 525,
            autoCenter: true
        });
    }

    $scope.$watch('bigres.ny.$resolved', function(newValue, oldValue){
        //debugger;
        if(oldValue === false && newValue != oldValue)
        {
            sctrl.emptyStory.value = false;
            // anchorSmoothScroll.scrollTo('flipbook');
            sctrl.showStory('flipbook');
        }
    })

    sctrl.showStory = function(eID)
    {
    	var div = angular.element(document.getElementById(eID));
        div.removeClass("ng-hide");
        anchorSmoothScroll.scrollTo(eID);
        if(eID == "flipbook")
        {
            //debugger;
            var booktitle = angular.element(document.getElementById('booktitle'));
            booktitle.text($scope.bigres.ny.headline);
            // var page = angular.element(document.getElementById('page1'));
            // page.text($scope.bigres.ny.text[0]);
        }
    }

    sctrl.military = function()
    {
    	nytApi.get('military');
    	//debugger;
    	sctrl.showStory('story');
    }
  });

'use strict';

angular.module('storytimeApp')
  .controller('StoryCtrl', function ($scope, nytApi, anchorSmoothScroll, bigres) {
    var sctrl = this;
    sctrl.bigres = bigres;

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

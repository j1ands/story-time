'use strict';

angular.module('storytimeApp')
  .controller('PersonalCtrl', function ($stateParams, $scope, bigres) {
    $scope.message = 'Hello';

    var pctrl = this;

    pctrl.storyid = $stateParams.id;
    bigres.get(pctrl.storyid);
    $scope.bigres = bigres.getNY();

    pctrl.emptyStory = {value:true};

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
    	if(oldValue === false && newValue != oldValue)
    	{
    		pctrl.emptyStory.value = false;
    		pctrl.showStory('flipbook');
    	}
    })

    pctrl.showStory = function(eID)
    {
    	var div = angular.element(document.getElementById(eID));
        div.removeClass("ng-hide");
        if(eID == "flipbook")
        {
            //debugger;
            var booktitle = angular.element(document.getElementById('booktitle'));
            booktitle.text($scope.bigres.ny.headline + "\n- A " + $scope.bigres.ny.name + " Story");

            var page = angular.element(document.getElementById('page1'));
            page.text($scope.bigres.ny.text[0]);

            var element;
            var i;

            for(i = 1; i < $scope.bigres.ny.text.length; i++)
            {
                element = $("<div />").text($scope.bigres.ny.text[i]);
                $("#flipbook").turn("addPage", element, i+2);                
            }

            element = $("<div />", {"class": "hard"});
            $("#flipbook").turn("addPage", element, i+2);
            if(i%2)
            {
                element = $("<div />", {"class": "hard"});
                $("#flipbook").turn("addPage", element, i+3);                
            }
        }
    }

  });

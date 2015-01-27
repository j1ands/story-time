'use strict';

angular.module('storytimeApp')
  .controller('StoryCtrl', function ($scope, anchorSmoothScroll, nytApi, bigres, $location) {
    var sctrl = this;
    $scope.bigres = bigres.getNY();
    //$scope.nyurl;

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
            //$scope.nyurl = $scope.bigres.ny.
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

    sctrl.select = function(type)
    {
    	nytApi.get(type);
    	//debugger;
    	sctrl.showStory('story');
    }

    sctrl.publish = function()
    {
        var storyID = bigres.post();
        storyID.then(function(data)
        {
            //debugger;
            console.log(data);
            console.log(data.id);
            $location.path('/personal/' + data.id);
        })

        //location.path(/personal/ + storyID);
    }
   
  });

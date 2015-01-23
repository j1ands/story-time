'use strict';

angular.module('storytimeApp')
  .controller('StoryCtrl', function ($scope, nytApi) {
    var sctrl = this;
    sctrl.nytApi = nytApi;
    sctrl.nytRes;

    sctrl.military = function()
    {
    	sctrl.nytRes = sctrl.nytApi.get('military');
    }
  });

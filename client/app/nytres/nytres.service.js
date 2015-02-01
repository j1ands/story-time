'use strict';

angular.module('storytimeApp')
  .factory('bigres', function (Pubstory, pubstoryget, Auth) {
    // Service logic
    // ...
    var user = Auth.getCurrentUser();

    var response = {};

    function publishStory()
    {
      var newStory = new Pubstory.post();
      newStory.data = response.ny;
      newStory.data.author = user._id;
      // newStory.$save(function(anything){
      //   console.log(anything);
      //   return anything;
      // })
      return newStory.$save();
    }

    function getStory(id)
    {
      response.ny = pubstoryget.get({id: id});
    }

    // Public API here
    return {
      getNY: function () {
        //return response.ny;
        return response;
      },
      setNY: function(obj) {
      	response.ny = obj;
      },
      get: function(id) {
        return getStory(id);
      },
      post: function() {
        return publishStory();
      }
    };
  });

'use strict';

angular.module('storytimeApp')
  .factory('alchemyApi', function ($resource) {
    // Service logic
    // ...

    function alchemyCall(params)
    {
        //$http.get('/api/alchemy')
        return $resource('/api/alchemy').get();
    }
    // Public API here
    return {
      get: function (params) {
        return alchemyCall(params);
      }
    };
  });


// angular.module('stackStoreApp')
//    .factory('Product', function($resource) {
//        return $resource('/api/products/:id/:option', {
//            id: '@_id'
//        }, {
//            update: {
//                method: 'PUT'
//            },
//            remove: {
//                method: 'DELETE'
//            },
//            getUserByName: {
//                method: 'GET',
//                params: {
//                    option: 'reviews'
//                }
//            },
//            getReviews: {
//                method: 'GET',
//                params: {
//                    option: 'reviews'
//                }
//            },
//            addReview: {
//                method: 'POST',
//                params: {
//                    option: 'reviews'
//                }
//            },
//            showRec: {
//                 method: 'GET'
//               }
//        });
//    });
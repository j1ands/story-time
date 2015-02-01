'use strict';

describe('Controller: PersonalCtrl', function () {

  // load the controller's module
  beforeEach(module('storytimeApp'));

  var PersonalCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PersonalCtrl = $controller('PersonalCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});

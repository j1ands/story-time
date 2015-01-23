'use strict';

describe('Directive: storytype', function () {

  // load the directive's module and view
  beforeEach(module('storytimeApp'));
  beforeEach(module('app/storytype/storytype.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<storytype></storytype>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the storytype directive');
  }));
});
'use strict';

describe('Directive: storypanel', function () {

  // load the directive's module and view
  beforeEach(module('storytimeApp'));
  beforeEach(module('app/storypanel/storypanel.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<storypanel></storypanel>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the storypanel directive');
  }));
});
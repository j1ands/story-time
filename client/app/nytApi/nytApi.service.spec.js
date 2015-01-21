'use strict';

describe('Service: nytApi', function () {

  // load the service's module
  beforeEach(module('storytimeApp'));

  // instantiate service
  var nytApi;
  beforeEach(inject(function (_nytApi_) {
    nytApi = _nytApi_;
  }));

  it('should do something', function () {
    expect(!!nytApi).toBe(true);
  });

});

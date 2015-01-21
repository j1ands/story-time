'use strict';

describe('Service: alchemyApi', function () {

  // load the service's module
  beforeEach(module('storytimeApp'));

  // instantiate service
  var alchemyApi;
  beforeEach(inject(function (_alchemyApi_) {
    alchemyApi = _alchemyApi_;
  }));

  it('should do something', function () {
    expect(!!alchemyApi).toBe(true);
  });

});

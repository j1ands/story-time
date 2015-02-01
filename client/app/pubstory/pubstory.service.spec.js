'use strict';

describe('Service: pubstory', function () {

  // load the service's module
  beforeEach(module('storytimeApp'));

  // instantiate service
  var pubstory;
  beforeEach(inject(function (_pubstory_) {
    pubstory = _pubstory_;
  }));

  it('should do something', function () {
    expect(!!pubstory).toBe(true);
  });

});

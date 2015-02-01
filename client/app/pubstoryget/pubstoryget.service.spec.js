'use strict';

describe('Service: pubstoryget', function () {

  // load the service's module
  beforeEach(module('storytimeApp'));

  // instantiate service
  var pubstoryget;
  beforeEach(inject(function (_pubstoryget_) {
    pubstoryget = _pubstoryget_;
  }));

  it('should do something', function () {
    expect(!!pubstoryget).toBe(true);
  });

});

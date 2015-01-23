'use strict';

describe('Service: nytres', function () {

  // load the service's module
  beforeEach(module('storytimeApp'));

  // instantiate service
  var nytres;
  beforeEach(inject(function (_nytres_) {
    nytres = _nytres_;
  }));

  it('should do something', function () {
    expect(!!nytres).toBe(true);
  });

});

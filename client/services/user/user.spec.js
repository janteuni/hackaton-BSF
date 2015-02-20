'use strict';

describe('Factory: User', function () {

  beforeEach(module('bsf'));

  var User;

  beforeEach(inject(function (_User_) {
    User = _User_;
  }));

  it('should ...', function () {
    expect(1).toBe(1);
  });

});

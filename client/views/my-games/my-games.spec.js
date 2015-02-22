'use strict';

describe('Controller: MyGamesCtrl', function () {

  beforeEach(module('bsf'));

  var MyGamesCtrl;

  beforeEach(inject(function ($controller) {
    MyGamesCtrl = $controller('MyGamesCtrl', {});
  }));

  it('should ...', function () {
    expect(1).toBe(1);
  });

});

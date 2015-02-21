'use strict';

describe('Factory: Game', function () {

  beforeEach(module('bsf'));

  var Game;

  beforeEach(inject(function (_Game_) {
    Game = _Game_;
  }));

  it('should ...', function () {
    expect(1).toBe(1);
  });

});

'use strict';

angular.module('bsf')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/game', {
        templateUrl: 'views/game/game.html',
        controller: 'GameCtrl',
        controllerAs: 'vm'
      });
  });

'use strict';

angular.module('bsf')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/join-game', {
        templateUrl: 'views/join-game/join-game.html',
        controller: 'JoinGameCtrl',
        controllerAs: 'vm'
      });
  });

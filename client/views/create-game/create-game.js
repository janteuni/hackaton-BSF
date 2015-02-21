'use strict';

angular.module('bsf')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/create-game', {
        templateUrl: 'views/create-game/create-game.html',
        controller: 'CreateGameCtrl',
        controllerAs: 'vm'
      });
  });

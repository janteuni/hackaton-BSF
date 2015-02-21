'use strict';

angular.module('bsf')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/play/:game', {
        templateUrl: 'views/play/play.html',
        controller: 'PlayCtrl',
        controllerAs: 'vm',
        resolve: {
          currentGame: function (Game, $route) {
            return Game.getByIdAndNotDone($route.current.params.game);
          }
        }
      });
  });

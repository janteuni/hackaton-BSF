'use strict';

angular.module('bsf')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/view/:id', {
        templateUrl: 'views/view/view.html',
        controller: 'ViewCtrl',
        controllerAs: 'vm',
        resolve: {
          currentGame: function (Game, $route) {
            return Game.getById($route.current.params.game);
          }
        }
      });
  });

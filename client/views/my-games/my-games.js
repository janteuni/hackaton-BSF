'use strict';

angular.module('bsf')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/my-games', {
        templateUrl: 'views/my-games/my-games.html',
        controller: 'MyGamesCtrl',
        controllerAs: 'vm'
      });
  });

'use strict';

angular.module('bsf')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/play', {
        templateUrl: 'views/play/play.html',
        controller: 'PlayCtrl',
        controllerAs: 'vm'
      });
  });

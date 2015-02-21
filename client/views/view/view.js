'use strict';

angular.module('bsf')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/view/:team', {
        templateUrl: 'views/view/view.html',
        controller: 'ViewCtrl',
        controllerAs: 'vm'
      });
  });

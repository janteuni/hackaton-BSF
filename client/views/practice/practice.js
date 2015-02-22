'use strict';

angular.module('bsf')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/practice/:notion', {
        templateUrl: 'views/practice/practice.html',
        controller: 'PracticeCtrl',
        controllerAs: 'vm'
      });
  });

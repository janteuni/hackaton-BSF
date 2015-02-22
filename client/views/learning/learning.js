'use strict';

angular.module('bsf')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/learning', {
        templateUrl: 'views/learning/learning.html',
        controller: 'LearningCtrl',
        controllerAs: 'vm'
      });
  });

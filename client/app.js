'use strict';

angular.module('bsf', [
  'ngRoute',
  'ngCookies',
  'ngSanitize',
  'ngAnimate',
  'ui.codemirror'
])
  .config(function ($routeProvider, $locationProvider) {

    $routeProvider
      .otherwise({
        redirectTo: '/'
      });

    $locationProvider.html5Mode(true);

  });

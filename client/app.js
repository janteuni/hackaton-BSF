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

  })

.run(function ($rootScope, $location) {

    // Redirect to login if route requires auth and you're not logged in
    $rootScope.$on('$routeChangeStart', function (event, next) {
      var currentUser = Parse.User.current();
      if (!currentUser)
        $location.path('/login');

    });
    $rootScope.bar = true;
  });

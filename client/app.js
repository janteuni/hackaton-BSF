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

      //Auth.isLoggedInAsync(function (loggedIn, currentUser) {
      //  if (
      //    (next.authenticate && !loggedIn) ||
      //    (new RegExp('^\/admin').test(next.$$route.originalPath) && currentUser && currentUser.role !== 'admin') ||
      //    (next.isProject && currentUser && currentUser.accountType !== 'project') ||
      //    (next.isMember && currentUser && currentUser.accountType !== 'member')
      //  ) {
      //    $location.path('/login');
      //  }
      //});
    });
  });

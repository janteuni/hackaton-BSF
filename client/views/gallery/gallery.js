'use strict';

angular.module('bsf')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/gallery', {
        templateUrl: 'views/gallery/gallery.html',
        controller: 'GalleryCtrl',
        controllerAs: 'vm'
      });
  });

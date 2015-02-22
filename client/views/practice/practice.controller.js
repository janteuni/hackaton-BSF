'use strict';

angular.module('bsf')
  .controller('PracticeCtrl', function ($scope, $route) {

    var vm = this;

    angular.extend(vm, {
      name: 'PracticeCtrl'
    });

    $scope.title = $route.current.params.notion;
    $scope.desc = "";

  });

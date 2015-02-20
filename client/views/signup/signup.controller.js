'use strict';

angular.module('bsf')
  .controller('SignupCtrl', function ($scope, User) {

    var vm = this;

    angular.extend(vm, {
      name: 'SignupCtrl'
    });

    $scope.user = {};

    $scope.register = function (form) {
      console.dir($scope.user);
        User.create($scope.user)
          .then(function () {
            console.log("OK");

          })
          .catch(function (err) {
            console.dir(err.data);
          });
      }

  });

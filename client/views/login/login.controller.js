'use strict';

angular.module('bsf')
  .controller('LoginCtrl', function ($scope, User) {

    var vm = this;

    angular.extend(vm, {
      name: 'LoginCtrl'
    });

    $scope.user = {};

    $scope.logIn = function (form) {
      console.dir($scope.user);
      User.logIn($scope.user)
        .then(function () {
          console.log("OK");

        })
        .catch(function (err) {
          console.dir(err.data);
        });
    };

    $scope.loginFB = function (){
        Parse.FacebookUtils.logIn(null, {
          success: function (user) {
            if (!user.existed()) {
              alert("User signed up and logged in through Facebook!");
            } else {
              alert("User logged in through Facebook!");
            }
          },
          error: function (user, error) {
            alert("User cancelled the Facebook login or did not fully authorize.");
          }
        });
    }

  });

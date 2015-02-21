'use strict';

angular.module('bsf')
  .controller('JoinGameCtrl', function ($scope, Game) {

    var vm = this;

    angular.extend(vm, {
      name: 'JoinGameCtrl'
    });

    $scope.game = {};

    $scope.joinGame = function (form) {
      console.dir($scope.game);
      Game.join($scope.game.name)
        .then(function () {
          console.log("joined game!!");

        })
        .catch(function (err) {
          console.dir(err.data);
        });
    };
    $scope.validateGame = function () {
      console.dir($scope.game);
      var currentUser = Parse.User.current();
      Game.validate(currentUser.id)
        .then(function () {
          console.log("tried to validate my part!!");

        })
        .catch(function (err) {
          console.dir(err.data);
        });
    }

  });

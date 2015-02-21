'use strict';

angular.module('bsf')
  .controller('CreateGameCtrl', function ($scope, Game) {

    var vm = this;

    angular.extend(vm, {
      name: 'CreateGameCtrl'
    });


    $scope.game = {};

    $scope.createGame = function (form) {
      console.dir($scope.game);
      Game.create($scope.game)
        .then(function () {
          console.log("Calling Create Game!!");

        })
        .catch(function (err) {
          console.dir(err.data);
        });
    }

  });

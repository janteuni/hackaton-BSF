'use strict';

angular.module('bsf')
  .controller('CreateGameCtrl', function ($scope, Game, $location) {

    var vm = this;

    angular.extend(vm, {
      name: 'CreateGameCtrl'
    });


    $scope.game = {};

    $scope.createGame = function (form) {
      console.dir($scope.game);
      Game.create($scope.game)
        .then(function (newgame) {
          console.log("Game " + newgame.id + " created");
          $location.path('/play/' + newgame.id);
        })
        .catch(function (err) {
          console.dir(err.data);
        });
    }

  });

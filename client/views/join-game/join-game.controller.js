'use strict';

angular.module('bsf')
  .controller('JoinGameCtrl', function ($scope, Game, $location) {

    var vm = this;

    angular.extend(vm, {
      name: 'JoinGameCtrl'
    });

    $scope.game = {};
    $scope.openGames = [];

    Game.getAvailableGames()
      .then(function (allGames) {
        console.log(allGames);
        for (var i = 0; i < allGames.length; i++) {
          var thisGame = allGames[i];
          if (thisGame.attributes.players.length < thisGame.attributes.num_players) {
            $scope.openGames.push(thisGame);
          }
        }
      })
      .catch(function (err) {
        console.dir(err.data);
      });

    $scope.joinGame = function (form) {
      Game.join($scope.game.id.id)
        .then(function () {
          console.log("ooook");
          $location.path('/play/' + $scope.game.id.id);

        })
        .catch(function (err) {
          console.dir(err.data);
        });
    };

    $scope.testGetMyCurrentGame = function() {
      var currentUser = Parse.User.current();
      Game.getMyCurrentGames(currentUser.id);
    };

    $scope.testGetMyPlayerNumber = function() {
      var currentUser = Parse.User.current();
      Game.getMyPlayerNumber(currentUser.id, 'BLOuu7jIT4');
    };

  });

'use strict';

angular.module('bsf')
  .controller('JoinGameCtrl', function ($scope, Game, $location) {

    var vm = this;

    angular.extend(vm, {
      name: 'JoinGameCtrl'
    });

    $scope.game = {};
    $scope.openGames = [];

    Game.getGames()
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

    $scope.logout = function () {
      Parse.User.logOut();
      var currentUser = Parse.User.current();
      alert("You are logging out!");
      console.dir("Logged Out - Current User now " + currentUser);
      $location.path('/login');
    };


    $scope.testGetMyCurrentGame = function() {
      var currentUser = Parse.User.current();
      Game.getMyCurrentGames(currentUser.id);
    }

    $scope.testGetMyPlayerNumber = function() {
      var currentUser = Parse.User.current();
      Game.getMyPlayerNumber(currentUser.id, 'BLOuu7jIT4');
    }

  });

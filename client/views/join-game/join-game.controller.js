'use strict';

angular.module('bsf')
  .controller('JoinGameCtrl', function ($scope, Game, $location) {

    var vm = this;

    angular.extend(vm, {
      name: 'JoinGameCtrl'
    });

    $scope.game = {};
    var query = new Parse.Query(Game);
    query.find({
      success: function (results) {
        $scope.allGames = results;
      },
      error: function (error) {
        console.log("Game search error! ");
        $scope.allGames = [];
      }
    });

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

    $scope.logout = function () {
      Parse.User.logOut();
      var currentUser = Parse.User.current();
      alert("You are logging out!");
      console.dir("Logged Out - Current User now " + currentUser);
      $location.path('/login');
    }

  });

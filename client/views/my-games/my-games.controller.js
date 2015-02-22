'use strict';

angular.module('bsf')
  .controller('MyGamesCtrl', function ($scope, Game) {

    var vm = this;

    angular.extend(vm, {
      name: 'MyGamesCtrl'
    });


    var currentUser = Parse.User.current();
    $scope.myGames = [];

    Game.getMyCurrentGames(currentUser.id)
      .then(function (myGames) {
        $scope.myGames = myGames;
      })
      .catch(function (err) {
        console.dir(err.data);
      });

  });

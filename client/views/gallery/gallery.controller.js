'use strict';

angular.module('bsf')
  .controller('GalleryCtrl', function ($scope, Game) {

    var vm = this;

    angular.extend(vm, {
      name: 'GalleryCtrl'
    });

    var currentUser = Parse.User.current();
    $scope.myGames = [];

    Game.getMyFinishedGames(currentUser.id)
      .then(function (myGames) {
        $scope.myGames = myGames;
      })
      .catch(function (err) {
        console.dir(err.data);
      });

  });

'use strict';

angular.module('bsf')
  .controller('GameCtrl', function ($scope, Game, $location) {

    var vm = this;

    angular.extend(vm, {
      name: 'GameCtrl'
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

        //$scope.logout = function () {
        //  Parse.User.logOut();
        //  var currentUser = Parse.User.current();
        //  alert("You are logging out!");
        //  console.dir("Logged Out - Current User now " + currentUser);
        //  $location.path('/login');
        //};

  });

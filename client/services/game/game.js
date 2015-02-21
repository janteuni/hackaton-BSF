'use strict';

angular.module('bsf')
  .factory('Game', function ($q) {
    var Game = Parse.Object.extend("Game");

    return {
      create: function (data) {
        var deferred = $q.defer();

        //Check is name doesn't already exist
        var query = new Parse.Query(Game);
        query.equalTo("name", data.name);
        query.find({
          success: function (results) {
            if (results.length > 0) {
              alert("That game name already exists!");
              console.log(results);
            } else {
              var newGame = new Game();
              var currentUser = Parse.User.current();
              newGame.set("name", data.name);
              newGame.set("type", data.type);
              newGame.set("num_players", data.nb);
              newGame.set("players", [currentUser]);
              newGame.set("finished", false);

              newGame.save(null, {
                success: function (newGame) {
                  alert('New object created with objectId: ' + newGame.id);
                  deferred.resolve(newGame);
                },
                error: function (newGame, error) {
                  alert('Failed to create new object, with error code: ' + error.message);
                  deferred.reject(error);
                }
              });
            }
          },
          error: function (error) {
            console.log("Game name check error");
            console.log(error);
          }
        })
        return deferred.promise;
      },

      join: function (gameName) {
        var deferred = $q.defer();
        var currentUser = Parse.User.current();
        var query = new Parse.Query(Game);
        query.equalTo("name", gameName);
        query.find({
          success: function (results) {
            //Check if game exists
            if (results.length > 0) {
              console.log("Found the game! ");
              console.log(results[0]);
              console.log("Current user");
              console.log(currentUser);

              var game = results[0];
              //check if game is full..
              if (game.attributes.players.length >= game.attributes.num_players )
                alert("This game is full! You can't join...");
              else {
                //check if user is already subscribed...
                var found = 0;
                for (var i = 0; i < game.attributes.players.length; i++) {
                  var p = game.attributes.players[i];
                  console.log(currentUser.id + " " + p.id);
                  if (currentUser.id === p.id) {
                    found++;
                    break;
                  }
                }
                if (found){
                  console.log("ALREADY PARTICIPATING");
                  alert("You are already participating in this game!");
                } else {
                  game.add("players", currentUser);
                  game.save();
                  console.log("Successfully added to the game!");
                }
              }
            } else {
              alert("The game " + gameName + " does not exist");
            }
          },
          error: function (error) {
            console.log("Game search error! ");
          }
        });
        return deferred.promise;
      }
    };

  });
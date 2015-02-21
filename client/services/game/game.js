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
              newGame.set("players", [{
                player: currentUser,
                done: false,
                HTMLData: "",
                CSSData: ""
              }]);
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
            deferred.reject(error);
          }
        });
        return deferred.promise;
      },

      join: function (gameId) {
        var deferred = $q.defer();
        var currentUser = Parse.User.current();
        var query = new Parse.Query(Game);
        query.get(gameId, {
          success: function (results) {
            console.log(results);
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
                  game.add("players", [{
                    player: currentUser,
                    done: false,
                    HTMLData: "",
                    CSSData: ""
                  }]);
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
      },


      validate: function(data, gameName) {
        var deferred = $q.defer();

        //Save my data
        var query = new Parse.Query(Game);
        query.equalTo("name", gameName);
        query.find({
          success: function (results) {
            if (results.length == 1) {
              var players = results[0].attributes.players;
              var tab = players.map(function (el) { return el.player.id; });
              var index = tab.indexOf(Parse.User.current().id);
              if (index != -1) {
                players[index].HTMLData = data.html;
                players[index].CSSData = data.css;
                results[0].attributes.players = players;

                results[0].save(null, {
                  success: function () {
                    deferred.resolve();
                  },
                  error: function (game, error) {
                    deferred.reject(error.message);
                  }
                });
                deferred.resolve();
              } else {
                deferred.reject("Player not register in this game!");
              }

            } else {
              deferred.reject("to much game found!");
            }
          },
          error: function (error) {
            deferred.reject(error);
          }
        });
        return deferred.promise;
      },

      getGames: function(){
        var deferred = $q.defer();
        var allGames = [];

        var query = new Parse.Query(Game);
        query.find({
          success: function (results) {
            console.log("getGames search ok! ");
            deferred.resolve(results);
          },
          error: function (error) {
            console.log("getGames search error! ");
            deferred.reject(error);
          }
        });
        return deferred.promise;
      }
    };

  });


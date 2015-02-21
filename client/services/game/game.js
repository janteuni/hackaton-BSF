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
          success: function (result) {
            console.log(result);
            //Check if game exists
            if (result) {
              console.log("Found the game! ");
              console.log(result);
              console.log("Current user");
              console.log(currentUser);

              var game = result;
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
              alert("The game " + gameId + " does not exist");
            }
          },
          error: function (error) {
            console.log("Game search error! ");
          }
        });
        return deferred.promise;
      },


      validate: function(data, gameId) {
        var deferred = $q.defer();

        //Save my data
        var query = new Parse.Query(Game);
        query.get(gameId, {
          success: function (result) {
            if (result) {
              var players = result.attributes.players;
              console.log(result);
              var tab = players.map(function (el) { return el.player.id; });
              var index = tab.indexOf(Parse.User.current().id);
              if (index != -1) {
                players[index].HTMLData = data.html;
                players[index].CSSData = data.css;
                result.attributes.players = players;

                result.save(null, {
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
            deferred.resolve(results);
          },
          error: function (error) {
            deferred.reject(error);
          }
        });
        return deferred.promise;
      },

      getById: function(id){
        var deferred = $q.defer();

        var query = new Parse.Query(Game);
        query.get(id, {
          success: function (result) {
            if (result) {
              console.log(result);
                deferred.resolve(result);
              } else {
              console.log("err");
                deferred.reject();
              }
          },
          error: function (error) {
            console.log("nope");
            deferred.reject(error);
          }
        });
        return deferred.promise;
      }
    };

  });


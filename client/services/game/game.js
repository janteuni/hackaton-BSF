'use strict';

angular.module('bsf')
  .factory('Game', function ($q) {
    var Game = Parse.Object.extend("Game");

    var resultGame = {
      create: function (data) {
        var deferred = $q.defer();

        //Check is name doesn't already exist
        var query = new Parse.Query(Game);
        query.equalTo("name", data.name);
        query.find({
          success: function (results) {
            if (results.length > 0) {
              alert("That game name already exists!");
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
            //Check if game exists
            if (result) {
              var game = result;
              //check if game is full..
              if (game.attributes.players.length >= game.attributes.num_players)
                deferred.reject("This game is full! You can't join...");
              else {
                //check if user is already subscribed...
                var found = 0;
                for (var i = 0; i < game.attributes.players.length; i++) {
                  var p = game.attributes.players[i].player;
                  if (currentUser.id === p.id) {
                    found++;
                    break;
                  }
                }
                if (found) {
                  alert("You are already participating in this game!");
                } else {
                  game.add("players", {
                    player: currentUser,
                    done: false,
                    HTMLData: "",
                    CSSData: ""
                  });
                  game.save();
                  deferred.resolve();
                }
              }
            } else {
              deferred.reject("The game " + gameId + " does not exist");
            }
          },
          error: function (error) {
            deferred.reject(error);
          }
        });
        return deferred.promise;
      },


      validate: function (data, gameId) {
        var deferred = $q.defer();

        //Save my data
        var query = new Parse.Query(Game);
        query.get(gameId, {
          success: function (result) {
            if (result) {
              var players = result.attributes.players;
              var tab = players.map(function (el) {
                return el.player.id;
              });
              var index = tab.indexOf(Parse.User.current().id);
              if (index != -1) {
                players[index].HTMLData = data.html;
                players[index].CSSData = data.css;
                players[index].done = true;
                result.attributes.players = players;
                console.log(result.attributes.players.length);
                console.log(result.attributes.num_players);
                if (result.attributes.players.length == result.attributes.num_players) {
                  var end = 0;
                  for (var i = 0; i < players.length; i++) {
                    if (players[i].done == true) {
                      end++;
                    }
                  }
                  if (end == result.attributes.players.length) {
                    result.set("finished", true);
                  }
                }

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

      getGames: function () {
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

      getMyCurrentGames: function (userId) {
        var deferred = $q.defer();
        var myCurrentGames = [];
        resultGame.getGames()
          .then(function (allGames) {
            for (var i = 0; i < allGames.length; i++) {
              var thisGame = allGames[i];
              for (var n = 0; n < thisGame.attributes.players.length; n++) {
                var thisPlayer = thisGame.attributes.players[n].player;
                if (thisPlayer.id === userId && thisGame.attributes.players[n].done == false) {
                  myCurrentGames.push(thisGame);
                }
              }
            }
            deferred.resolve(myCurrentGames);
          })
          .catch(function (err) {
            console.dir(err.data);
            deferred.reject();
          });
        return deferred.promise;
      },

      getAvailableGames: function () {
        var deferred = $q.defer();
        var myCurrentGames = [];
        var userId = Parse.User.current().id;
        resultGame.getGames()
          .then(function (allGames) {
            for (var i = 0; i < allGames.length; i++) {
              var thisGame = allGames[i];
              if (thisGame.attributes.finished == false) {
                var alreadyJoin = false;
                for (var n = 0; n < thisGame.attributes.players.length; n++) {
                  if (thisGame.attributes.players[n].player.id == userId) {
                    alreadyJoin = true;
                  }
                }
                if (alreadyJoin == false) {
                  myCurrentGames.push(thisGame);
                }
              }
            }
            deferred.resolve(myCurrentGames);
          })
          .catch(function (err) {
            console.dir(err.data);
            deferred.reject();
          });
        return deferred.promise;
      },

      getMyPlayerNumber: function (userId, gameId) {
        var deferred = $q.defer();
        var query = new Parse.Query(Game);
        query.get(gameId, {
          success: function (result) {
            if (result) {
              var found = -1;
              for (var i = 0; i < result.attributes.players.length; i++) {
                var thisPlayer = result.attributes.players[i].player;
                if (thisPlayer.id === userId)
                  found = i;
              }

              if (found > -1) {
                console.log("RESULT: " + found);
                deferred.resolve(found);
              } else {
                console.log("RESULT: NOT FOUND");
                deferred.reject();
              }
            } else {
              deferred.reject();
            }
          },
          error: function (error) {
            deferred.reject(error);
          }
        });
        return deferred.promise;
      },

      getById: function (id) {
        var deferred = $q.defer();
        console.log(id);
        var query = new Parse.Query(Game);
        query.get(id, {
          success: function (result) {
            if (result) {
              deferred.resolve(result);
            } else {
              deferred.reject();
            }
          },
          error: function (error) {
            deferred.reject(error);
          }
        });
        return deferred.promise;
      },

      getByIdAndNotDone: function (id) {
        var deferred = $q.defer();
        var playerId = Parse.User.current().id;

        resultGame.getById(id)
          .then(function (g) {
            var game = g;
            for (var i = 0; i < game.attributes.players.length; i++) {
              if (game.attributes.players[i].player.id == playerId && game.attributes.players[i].done == false) {
                deferred.resolve(game);
              } else if (game.attributes.players[i].player.id == playerId && game.attributes.players[i].done == true) {
                deferred.reject("Already done!");
              }
            }
          })
          .catch(function (err) {
            deferred.reject(err.data);
          });

        return deferred.promise;
      }

    };

    return resultGame;

  });


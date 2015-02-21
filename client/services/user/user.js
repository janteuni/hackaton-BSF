'use strict';

angular.module('bsf')
  .factory('User', function ($q, $http) {

    return {
      create: function (data) {
        var deferred = $q.defer();
        var user = new Parse.User();
        user.set("username", data.username);
        user.set("password", data.password);
        user.set("email", data.email);

        user.signUp(null, {
          success: function(user) {
            console.log("New User sent!!")
            deferred.resolve(user);
          },
          error: function(user, error) {
            console.log("Error: " + error.code + " " + error.message);
            deferred.reject(error);
          }
        });
        return deferred.promise;

      },
      logIn: function (data) {
        var deferred = $q.defer();
        Parse.User.logIn(data.username, data.password, {
          success: function(user) {
            console.log("SUccess user logged in : " + user);
            deferred.resolve(user);
          },
          error: function(user, error) {
            console.log("Failed to log in " + error);
            deferred.reject(error);
          }
        });
        return deferred.promise;
      }
    };

  });

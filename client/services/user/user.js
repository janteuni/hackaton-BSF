'use strict';

angular.module('bsf')
  .factory('User', function ($q, $http) {

    return {
      create: function (data) {
        var deferred = $q.defer();
        $http.post('/api/users', { user: data })
          .then(function (res) {
            deferred.resolve(res.data);
          })
          .catch(function (err) {
            deferred.reject(err.data);
          });
        return deferred.promise;
      }
    };

  });

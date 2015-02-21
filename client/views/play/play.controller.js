'use strict';

angular.module('bsf')
  .controller('PlayCtrl', function ($scope) {

    var vm = this;
    $scope.css= 'h1 { color:red }';
    $scope.html = '<h1>TOTOTOTOT</h1>';

    angular.extend(vm, {
      name: 'PlayCtrl'
    });

    $scope.editorOptions = {
      lineWrapping : true,
      lineNumbers: true,
      theme: 'night',
      autofocus: true,
      matchBrackets: true,
      mode: 'html'
    };


    $scope.editorOptions2 = {
      lineWrapping : true,
      lineNumbers: true,
      theme: 'night',
      autofocus: true,
      matchBrackets: true,
      mode: 'html'
    };




    $scope.parseAndExecute = function() {
      var insert = "#p1";

      var regexp = /\S+(?= {)/g;
      var match, matches = [];

      while ((match = regexp.exec($scope.css)) != null) {
        matches.push(match.index);
      }

      var finalCss = $scope.css;
      var i = 0;
      matches.map(function(pos) {

        pos = pos + (5 * i);
        var css = [finalCss.slice(0, pos), insert, finalCss.slice(pos)].join(' ');
        finalCss = css;
        i++;
      });

      $( "style" ).html(finalCss);
      $( "#p1" ).html($scope.html);
    };
  });

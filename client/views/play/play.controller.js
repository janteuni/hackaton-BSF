'use strict';

angular.module('bsf')


  .controller('PlayCtrl', function ($scope, Game, $location, currentGame, $route) {

    var vm = this;

    vm.compiledCss = '';

    vm.numPlayer = 0;

    Game.getMyPlayerNumber(Parse.User.current().id, $route.current.params.game)
      .then(function (num) {
        vm.numPlayer = num;
        var id = "p" + num;
        $( ".my-preview" ).attr('id', id);

      })
      .catch(function (err) {
        console.dir(err.data);
      });

    function insertAtCursor(myField, myValue) {
      //IE support
      if (document.selection) {
        myField.focus();
        var sel = document.selection.createRange();
        sel.text = myValue;
      }
      //MOZILLA and others
      else if (myField.selectionStart || myField.selectionStart == '0') {
        var startPos = myField.selectionStart;
        var endPos = myField.selectionEnd;
        myField.value = myField.value.substring(0, startPos)
        + myValue
        + myField.value.substring(endPos, myField.value.length);
        myField.selectionStart = startPos + myValue.length;
        myField.selectionEnd = startPos + myValue.length;
      } else {
        myField.value += myValue;
      }
    }

    $scope.insert = function(str)  {

      $scope.html += str;

    };

    $scope.css= 'h1 { color:red } .toto { background-color:blue }';
    $scope.html = '<div id="toto"><h1>TOTOTOTOTO</h1></div>';


    vm.tab = 1;

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

    function getCss() {
      var insert =  "#p" + vm.numPlayer;

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
        return finalCss;
      }

      $scope.parseAndExecute = function() {
        vm.compiledCss = getCss();
        $( "#p" + vm.numPlayer ).html($scope.html);
      };


      $scope.validateGame = function () {

        var data = {
          'css': getCss(),
          'html' : $scope.html
        };

        var gameId = $route.current.params.game;

        Game.validate(data, gameId)
        .then(function () {
          $location.path('/');
        })
        .catch(function (err) {
          console.dir(err.data);
        });
      };

    });

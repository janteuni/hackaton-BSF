'use strict';

angular.module('bsf')


  .controller('PlayCtrl', function ($scope, Game, $location, currentGame, $route) {

    var vm = this;

    vm.strHelp = {p:"\Le texte entre la balise ouvrante \<p> et la balise fermante </p> est un paragraphe.",
      br:"« br » est une balise orpheline : elle ne possède pas de balise de fin. Elle se trouve obligatoirement dans un paragraphe.",
      h:"\Balise de titre, le « / » indique la balise fermante.",
      em:"Le texte encadré est en italique.",
      img:"Balise orpheline contenant deux arguments : [src = chemin d'accès de l’image] et [alt = texte alternatif venant décrire l’image si celle-ci ne s’affiche pas ou pour aider les moteurs de recherche à trouver l’image (non obligatoire)]",
      div:"Balise conteneur qui peut inclure tous les tags html"};

    vm.compiledCss = '';
    vm.help = "aide";

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
    $scope.insertHTML = function(str1, str2)  {

      $scope.html += str1;
     vm.help = vm.strHelp[str2];

    };
    $scope.insertCSS = function(str)  {

      $scope.css += str;

    };

    $scope.css= 'h1 { color:red } #toto { background-color: yellow;heigth: 50px;}';
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


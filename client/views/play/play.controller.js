'use strict';

angular.module('bsf')


  .controller('PlayCtrl', function ($scope, Game, $location, currentGame, $route) {

    var vm = this;

    vm.strHelp = {p:"\Le texte entre la balise ouvrante \<p> et la balise fermante </p> est un paragraphe.",
      br:"« br » est une balise orpheline : elle ne possède pas de balise de fin. Elle se trouve obligatoirement dans un paragraphe.",
      h:"\Balise de titre, le « / » indique la balise fermante.",
      em:"Le texte encadré est en italique.",
      img:"Balise orpheline contenant deux arguments : [src = chemin d'accès de l’image] et [alt = texte alternatif venant décrire l’image si celle-ci ne s’affiche pas ou pour aider les moteurs de recherche à trouver l’image (non obligatoire)]",
      color:"Cette valeur est un nom de couleur comme blue, black, green, lime, maroon, aqua, silver, fuchsia, yellow, … La couleur peut être codée en RGB (niveau de couleur de rouge, vert, bleu) rgb(50,96,204); Chaque nombre est compris entre 0 et 255.",
      family:"Indique la police du texte (police1).  Si cette police n’existe pas, le navigateur essaiera la police2 (non obligatoire). Celles-ci peuvent être : Arial, Comic Sans Ms, Courier New, Georgia, Impact, Times New Roman, Verdana, …",
      weight:"The font-weight property sets how thick or thin characters in text should be displayed.",
      bg:"Couleur de fond. la valeur de l'attribut est un nom de couleur (voir color).",
      border:"Applique une bordure. Elle prend 3 arguments : [la largeur de la bordure en pixel], [La couleur de la bordure] et [Le type de bordure (ex : solid, dotted, dashed, groove, inset, double, …)]",
      margin:"Marge extérieur. Les 4 arguments sont les tailles des marges en pixel (haute, droite, basse, gauche).",
      padding:"Marge intérieur dont les arguments sont décrits dans «  margin ».",
      height:"modifie la hauteur de l'attribut selctionné",
      width:"modifie la largeur de l'attribut selctionné",
      size:"ajuste la taille de la police",
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
    $scope.insertCSS = function(str1, str2)  {

      $scope.css += str1;
      vm.help = vm.strHelp[str2];

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

    vm.autoreload = false;

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

      $scope.checkIt = function(){
      vm.autoreload = !vm.autoreload;
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

      $scope.reload = function() {
        if (vm.autoreload) {
          $scope.parseAndExecute();
        }
      };

    $scope.changeReload = function() {
      vm.autoreload = !vm.autoreload;
    }
    });


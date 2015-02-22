'use strict';

angular.module('bsf')
  .controller('PracticeCtrl', function ($scope, $route, $rootScope) {

    var vm = this;

    angular.extend(vm, {
      name: 'PracticeCtrl'
    });

    $scope.title = $route.current.params.notion;
    $scope.desc = "tljrthl jrt uhtiuhegkuehrgi uehrgirujg eorigreiughr eiguherigu erhg ioure hgirue ghreiu ghruigh regiu";

    $scope.str = {
      "TITRES" : "Les balises h1, h2, h3 et h4 te permettent de créer différents niveaux de texte.",
      "PARAGRAPHE" : "Les balises p te permettront d’organiser tes paragraphes.",
      "RETOUR À LA LIGNE" : "Les balises br te permettront de retourner à la ligne.",
      "TAILLE DE TEXTE" : "L’attribut font-size te permettra de modifier la taille de ta typographie.",
      "COULEURS" : "L’attribut color te permettra de modifier la couleur de ton texte.",
      "POLICES" : "L’attribut font-family te permettra de choisir la typographie de ton choix.",
      "DIVISONS" : "L’attribut div te permettra de créer des divisions et de structurer ta page HTML.",
      "BACKGROUND" : "L’attribut background te permettra de modifier à ta guise ton arrière plan.",
      "IMAGES" : "La balise img te permettra de placer une image.",
      "EMPHASE" :"Les balises em te permettront de mettre en valeur ton texte.",
      "BORDURE":"L’attribut border te permettra d’encadrer un élément.",
      "LARGEUR":"L’attribut width te permettra de gérer la largeur de ton élément.",
      "HAUTEUR":"L’attribut height te permettra de gérer la hauteur de ton élément.",
      "MARGE EXTERNE":"L’attribut margin te permettra de gérer les marges dans ta page.",
      "MARGE INTERNE":"L’attribut padding te permettra de gérer les marges à l’intérieur de ton élément."
    };

    $scope.desc = $scope.str[$scope.title];

  });

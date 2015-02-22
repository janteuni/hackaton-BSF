'use strict';

angular.module('bsf')
  .controller('LearningCtrl', function () {

    var vm = this;

    angular.extend(vm, {
      name: 'LearningCtrl'
    });

    vm.list= [
      "TITRES",
      "PARAGRAPHE",
      "RETOUR À LA LIGNE",
      "TAILLE DE TEXTE",
      "COULEURS",
      "POLICES",
      "DIVISONS",
      "BACKGROUND",
      "IMAGES",
      "EMPHASE",
      "BORDURE",
      "LARGEUR",
      "HAUTEUR",
      "MARGE EXTERNE",
      "MARGE INTERNE"
    ];

  });

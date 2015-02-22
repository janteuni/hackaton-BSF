'use strict';

angular.module('bsf')
  .controller('ViewCtrl', function (currentGame) {

    var vm = this;

    angular.extend(vm, {
      name: 'ViewCtrl'
    });

    vm.currentGame = currentGame;
    vm.compiledCss = "";


  });

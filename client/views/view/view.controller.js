'use strict';

angular.module('bsf')
  .controller('ViewCtrl', function (currentGame) {

    var vm = this;

    angular.extend(vm, {
      name: 'ViewCtrl'
    });

    vm.currentGame = currentGame;
    vm.compiledCss = "";

    function joinCss() {
      var css = "";
      for (var i = 0; currentGame.attributes.players.length ;i++) {
        css += currentGame.attributes.players[i].CSSData;
      }
      vm.compiledCss = css;
    }


  });

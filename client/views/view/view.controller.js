'use strict';

angular.module('bsf')
  .controller('ViewCtrl', function (currentGame) {

    var vm = this;

    angular.extend(vm, {
      name: 'ViewCtrl'
    });

    vm.currentGame = currentGame;
    vm.compiledCss = "";

    console.log(currentGame);

    var css = "";
    for (var i = 0; i < currentGame.attributes.players.length; i++) {
      console.log(currentGame.attributes.players[i]);
      css += currentGame.attributes.players[i].CSSData;
    }
    vm.compiledCss = css;

    var html = "";
    for (var i = 0; i < currentGame.attributes.players.length; i++) {
      html += '<div id="p' + i + '">' + currentGame.attributes.players[i].HTMLData + "</div>";
    }
    $("#render").html(html);


  });

goog.provide('illandril.game.requestAnimFrame');

// requestAnim shim layer by Paul Irish, tweaked slightly by Illandril
illandril.game.requestAnimFrame = (function(){
    var fn = window.requestAnimationFrame       || 
              window.webkitRequestAnimationFrame || 
              window.mozRequestAnimationFrame    || 
              window.oRequestAnimationFrame      || 
              window.msRequestAnimationFrame     || 
              function(/* function */ callback, /* DOMElement */ element){
                window.setTimeout(callback, 1000 / 60);
              };
              return function(){ fn.apply(window, arguments); };
    })();


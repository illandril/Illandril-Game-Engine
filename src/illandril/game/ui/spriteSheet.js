goog.provide("illandril.game.ui.SpriteSheet");

/**
 * @constructor
 */
illandril.game.ui.SpriteSheet =  function( src ) {
  this.src = src;
  var imgPreLoad = new Image(); // Pre-load
  imgPreLoad.src = src;
};


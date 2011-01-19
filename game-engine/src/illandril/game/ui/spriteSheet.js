/**
 * @preserve Copyright (c) 2011, Joseph Spandrusyszyn
 * See https://github.com/illandril/Illandril-Game-Engine
 */


goog.provide("illandril.game.ui.SpriteSheet");

/**
 * @constructor
 */
illandril.game.ui.SpriteSheet =  function( src ) {
  this.src = src;
  var imgPreLoad = new Image(); // Pre-load
  imgPreLoad.src = src;
};


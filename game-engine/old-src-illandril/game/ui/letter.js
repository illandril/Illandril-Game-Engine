/**
 * @preserve Copyright (c) 2011, Joseph Spandrusyszyn
 * See https://github.com/illandril/Illandril-Game-Engine.
 */


goog.provide('illandril.game.ui.Letter');

goog.require('illandril');

/**
 * @constructor
 */
illandril.game.ui.Letter = function(src, x, y, height, width ) {
  this.src = src;
  this.x = x;
  this.y = y;
  this.height = height;
  this.width = width;
};


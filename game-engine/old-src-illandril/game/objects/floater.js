/**
 * @preserve Copyright (c) 2011, Joseph Spandrusyszyn
 * See https://github.com/illandril/Illandril-Game-Engine.
 */


goog.provide('illandril.game.objects.Floater');

goog.require('illandril');
goog.require('illandril.game.objects.GameObject');

/**
 * @constructor
 */
illandril.game.objects.Floater = function() {
  if (!this instanceof illandril.game.objects.GameObject) {
    throw 'Error... active object not also a game object!';
  }
  this.impactedByGravity = false;
};

illandril.game.objects.Floater.prototype.impactedByGravity = false;



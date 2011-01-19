/**
 * @preserve Copyright (c) 2011, Joseph Spandrusyszyn
 * See https://github.com/illandril/Illandril-Game-Engine
 */


goog.provide("illandril.game.objects.Wall");

goog.require("goog.object");
goog.require("illandril.game.objects.GameObject");
goog.require("illandril.game.objects.Solid");

/**
 * @constructor
 * @extends illandril.game.objects.GameObject
 * @param {illandril.game.Scene} scene the scene the object lives in
 * @param {illandril.math.Bounds} bounds the bounds that define the size and location of the object
 * @param {string|null} bg the URL of the background image for this object
 */
illandril.game.objects.Wall = function( scene, bounds, bg, zIndex ) {
  illandril.game.objects.GameObject.call( this, scene, bounds, bg, zIndex );
  illandril.game.objects.Solid.call( this );
};
goog.inherits( illandril.game.objects.Wall, illandril.game.objects.GameObject );
goog.object.extend( illandril.game.objects.Wall.prototype, illandril.game.objects.Solid.prototype );

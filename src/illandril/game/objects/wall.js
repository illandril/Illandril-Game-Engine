goog.provide("illandril.game.objects.Wall");

goog.require("goog.object");
goog.require("illandril.game.objects.GameObject");
goog.require("illandril.game.objects.Solid");

/**
 * @constructor
 * @extends illandril.game.objects.GameObject
 * @param {illandril.game.World} world the world the object lives in
 * @param {illandril.math.Bounds} bounds the bounds that define the size and location of the object
 * @param {string|null} bg the URL of the background image for this object
 */
illandril.game.objects.Wall = function( world, bounds, bg, zIndex ) {
  illandril.game.objects.GameObject.call( this, world, bounds, bg, zIndex );
  illandril.game.objects.Solid.call( this );
};
goog.inherits( illandril.game.objects.Wall, illandril.game.objects.GameObject );
goog.object.extend( illandril.game.objects.Wall.prototype, illandril.game.objects.Solid.prototype );

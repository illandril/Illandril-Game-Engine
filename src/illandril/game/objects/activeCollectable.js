goog.provide("illandril.game.objects.ActiveCollectable");

goog.require("goog.object")
goog.require("illandril.game.objects.Collectable");
goog.require("illandril.game.objects.Active");

/**
 * @constructor
 * @extends illandril.game.objects.Collectable
 */
illandril.game.objects.ActiveCollectable = function( world, bounds, bg, zIndex ) {
  illandril.game.objects.Collectable.call( this, world, bounds, bg, zIndex );
  illandril.game.objects.Active.call( this );
};
goog.inherits( illandril.game.objects.ActiveCollectable, illandril.game.objects.Collectable );
goog.object.extend( illandril.game.objects.ActiveCollectable.prototype, illandril.game.objects.Active.prototype );

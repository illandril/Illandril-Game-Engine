goog.provide("illandril.game.objects.Collectable");

goog.require("goog.object")
goog.require("illandril.game.objects.GameObject");
goog.require("illandril.game.objects.Solid");

/**
 * @constructor
 * @extends illandril.game.objects.GameObject
 */
illandril.game.objects.Collectable = function( scene, bounds, bg, zIndex ) {
  illandril.game.objects.GameObject.call( this, scene, bounds, bg, zIndex );
  illandril.game.objects.Solid.call( this );
};
goog.inherits( illandril.game.objects.Collectable, illandril.game.objects.GameObject );
goog.object.extend( illandril.game.objects.Collectable.prototype, illandril.game.objects.Solid.prototype );

illandril.game.objects.Collectable.prototype.blocks = function( otherObject ) {
  return false;
};

illandril.game.objects.Collectable.prototype.canBeBlocked = function() {
  return false;
};

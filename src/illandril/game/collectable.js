goog.provide("illandril.game.Collectable");

goog.require("illandril.game.GameObject");

/**
 * @constructor
 */
illandril.game.Collectable = function( world, bounds, bg ) {
  illandril.game.GameObject.call( this, world, bounds, bg );
};
goog.inherits( illandril.game.GameObject, illandril.game.Collectable );

illandril.game.Collectable.prototype.blocks = function( otherObject ) {
  return false;
};

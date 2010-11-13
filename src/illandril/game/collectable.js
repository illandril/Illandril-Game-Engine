goog.provide("illandril.game.Collectable");

goog.require("illandril.game.GameObject");

/**
 * @constructor
 * @extends illandril.game.GameObject
 */
illandril.game.Collectable = function( world, bounds, bg ) {
  illandril.game.GameObject.call( this, world, bounds, bg );
};
goog.inherits( illandril.game.Collectable, illandril.game.GameObject );

illandril.game.Collectable.prototype.blocks = function( otherObject ) {
  return false;
};

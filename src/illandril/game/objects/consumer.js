goog.provide("illandril.game.objects.Consumer");

goog.require("goog.object");
goog.require("illandril.game.objects.GameObject");
goog.require("illandril.game.objects.Solid");

/**
 * @constructor
 * @extends illandril.game.objects.GameObject
 */
illandril.game.objects.Consumer = function( world, bounds, bg, zIndex, type ) {
  illandril.game.objects.GameObject.call( this, world, bounds, bg, zIndex );
  illandril.game.objects.Solid.call( this );
  this.type = type;
};
goog.inherits( illandril.game.objects.Consumer, illandril.game.objects.GameObject );
goog.object.extend( illandril.game.objects.Consumer.prototype, illandril.game.objects.Solid.prototype );

illandril.game.objects.Consumer.prototype.blocks = function( otherObject ) {
  return false;
};

illandril.game.objects.Consumer.prototype.collideWith = function( otherObject ) {
  if ( otherObject instanceof this.type ) {
    this.world.removeObject( otherObject );
  }
};

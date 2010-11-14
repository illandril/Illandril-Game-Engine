goog.provide("illandril.game.objects.Player");

goog.require("illandril.game.objects.Active");
goog.require("illandril.game.objects.Collectable");
goog.require("illandril.game.objects.GameObject");
goog.require("illandril.game.objects.Solid");

/**
 * @constructor
 * @extends illandril.game.objects.GameObject
 * @extends illandril.game.objects.Solid
 * @extends illandril.game.objects.Active
 */
illandril.game.objects.Player = function( world, bounds, bg ) {
  illandril.game.objects.GameObject.call( this, world, bounds, bg );
  illandril.game.objects.Solid.call( this );
  illandril.game.objects.Active.call( this );
  this.collectables = [];
};
goog.inherits( illandril.game.objects.Player, illandril.game.objects.GameObject );
goog.inherits( illandril.game.objects.Player, illandril.game.objects.Solid );
goog.inherits( illandril.game.objects.Player, illandril.game.objects.Active );

illandril.game.objects.Player.prototype.collideWith = function( otherObject ) {
  if ( otherObject instanceof illandril.game.objects.Collectable ) {
    this.world.removeObject( otherObject );
    this.collectables.push( otherObject );
    document.getElementById( "collectableCount" ).innerHTML = "Collectables: " + this.collectables.length;
  }
};

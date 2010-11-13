goog.provide("illandril.game.Player");

goog.require("illandril.game.GameObject");
goog.require("illandril.game.Collectable");

/**
 * @constructor
 */
illandril.game.Player = function( world, bounds, bg ) {
  illandril.game.GameObject.call( this, world, bounds, bg );
  this.collectables = [];
};
goog.inherits( illandril.game.GameObject, illandril.game.Player );

illandril.game.Player.prototype.collideWith = function( otherObject ) {
  if ( otherObject instanceOf illandril.game.Collectable ) {
    this.world.removeObject( otherObject );
    this.collectables.push( otherObject );
    document.getElementById( "collectableCount" ).innerHTML = "Collectables: " + this.collectables.length;
  }
};

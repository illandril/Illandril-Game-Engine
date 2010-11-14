goog.provide("illandril.game.objects.Player");

goog.require("goog.object");
goog.require("illandril.game.objects.Active");
goog.require("illandril.game.objects.Collectable");
goog.require("illandril.game.objects.GameObject");
goog.require("illandril.game.objects.Solid");

/**
 * @constructor
 * @extends illandril.game.objects.GameObject
 * @param {illandril.game.World} world the world the object lives in
 * @param {illandril.math.Bounds} bounds the bounds that define the size and location of the object
 * @param {string|null} bg the URL of the background image for this object
 */
illandril.game.objects.Player = function( world, bounds, bg ) {
  illandril.game.objects.GameObject.call( this, world, bounds, bg );
  illandril.game.objects.Solid.call( this );
  illandril.game.objects.Active.call( this );
  this.collectables = [];
};
goog.inherits( illandril.game.objects.Player, illandril.game.objects.GameObject );
goog.object.extend( illandril.game.objects.Player, illandril.game.objects.Solid );
goog.object.extend( illandril.game.objects.Player, illandril.game.objects.Active );

illandril.game.objects.Player.prototype.collideWith = function( otherObject ) {
  if ( otherObject instanceof illandril.game.objects.Collectable ) {
    this.world.removeObject( otherObject );
    this.collectables.push( otherObject );
    document.getElementById( "collectableCount" ).innerHTML = "Collectables: " + this.collectables.length;
  }
};

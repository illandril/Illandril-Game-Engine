goog.provide("illandril.game.objects.Car");

goog.require("goog.object");
goog.require("illandril.game.objects.Active");
goog.require("illandril.game.objects.Solid");
goog.require("illandril.game.objects.GameObject");

/**
 * @constructor
 * @extends illandril.game.objects.GameObject
 */
illandril.game.objects.Car = function( world, bounds, bg, zIndex ) {
  illandril.game.objects.GameObject.call( this, world, bounds, bg, zIndex );
  illandril.game.objects.Active.call( this );
  illandril.game.objects.Solid.call( this );
};
goog.inherits( illandril.game.objects.Car, illandril.game.objects.GameObject );
goog.object.extend( illandril.game.objects.Car.prototype, illandril.game.objects.Active.prototype );
goog.object.extend( illandril.game.objects.Car.prototype, illandril.game.objects.Solid.prototype );

illandril.game.objects.Car.prototype.think = function( tick ) {
  this.setVelocity( new goog.math.Vec2( Math.random(), 0 ) );
};

illandril.game.objects.Car.prototype.canBeBlocked = function() { return false; }
illandril.game.objects.Car.prototype.blocks = function() { return false; }


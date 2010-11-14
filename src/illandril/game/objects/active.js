goog.provide("illandril.game.objects.Active");

goog.require("illandril.game.objects.GameObject");

/**
 * @constructor
 */
illandril.game.objects.Active = function( world, bounds, bg ) {
  if ( !this instanceof illandril.game.objects.GameObject ) {
    throw "Error... active object not also a game object!"
  }
  this.velocity = new goog.math.Vec2( 0, 0 );
};

illandril.game.objects.Active.prototype.think = function( tick ) {};

illandril.game.objects.Active.prototype.setVelocity = function( newVelocity ) {
  this.velocity = newVelocity;
};

illandril.game.objects.Active.prototype.addVelocity = function( direction ) {
  var newVelocity = this.velocity.clone().add( direction );
  newVelocity.x = Math.min( 1, newVelocity.x );
  newVelocity.x = Math.max( -1, newVelocity.x );
  newVelocity.y = Math.min( 1, newVelocity.y );
  newVelocity.y = Math.max( -1, newVelocity.y );
  // We need to make sure they don't keep skating along very very slowly because of a rounding error
  if ( newVelocity.x < 0.005 && newVelocity.x > -0.005 ) {
    newVelocity.x = 0;
  }
  if ( newVelocity.y < 0.005 && newVelocity.y > -0.005 ) {
    newVelocity.y = 0;
  }
  this.setVelocity( newVelocity );
};

illandril.game.objects.Active.prototype.getVelocity = function() {
  return this.velocity.clone();
};

illandril.game.objects.Active.prototype.isMoving = function() {
  return this.velocity.x != 0 || this.velocity.y != 0;
};

illandril.game.objects.Active.prototype.moveBy = function( direction ) {
  this.moveTo( this.getPosition().add( direction ) );
};

illandril.game.objects.Active.prototype.moveTo = function( position ) {
  this.bounds.centerOn( position );
  this.world.objectMoved( this );
};

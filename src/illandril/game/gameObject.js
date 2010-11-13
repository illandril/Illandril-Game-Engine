goog.provide("illandril.game.GameObject");

goog.require("goog.math.Vec2");

var nextGameObjectID = 0;
/**
 * @constructor
 */
illandril.game.GameObject = function( world, bounds, bg ) {
  this.id = nextGameObjectID++;
  this.world = world;
  this.bounds = bounds;
  this.world.addObject( this );
  this.velocity = new goog.math.Vec2( 0, 0 );
  this.bg = bg;
};

illandril.game.GameObject.prototype.setVelocity = function( newVelocity ) {
  this.velocity = newVelocity;
};

illandril.game.GameObject.prototype.blocks = function( otherObject ) {
  return true;
};

illandril.game.GameObject.prototype.canBeBlocked = function() {
  return true;
};

illandril.game.GameObject.prototype.canBeBlockedBy = function( otherObject ) {
  return true;
};

illandril.game.GameObject.prototype.collideWith = function( otherObject ) {};

illandril.game.GameObject.prototype.addVelocity = function( direction ) {
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

illandril.game.GameObject.prototype.getVelocity = function() {
  return this.velocity.clone();
};

illandril.game.GameObject.prototype.isMoving = function() {
  return this.velocity.x != 0 || this.velocity.y != 0;
};

illandril.game.GameObject.prototype.moveBy = function( direction ) {
  this.moveTo( this.getPosition().add( direction ) );
};

illandril.game.GameObject.prototype.moveTo = function( position ) {
  this.bounds.centerOn( position );
  this.world.objectMoved( this );
};

illandril.game.GameObject.prototype.getBounds = function() {
  return this.bounds;
};

illandril.game.GameObject.prototype.getPosition = function() {
  return this.bounds.getCenter();
};

illandril.game.GameObject.prototype.getSize = function() {
  return this.bounds.getSize();
};

illandril.game.GameObject.prototype.think = function( tick ) {
};


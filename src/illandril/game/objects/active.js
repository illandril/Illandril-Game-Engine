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


/*

loop {
 accelerate( direction );
  \--> adjust velocity by acceleration
 move
  \--> fix velocity to 0 if below threshold
  \--> adjust position by velocity scaled by tick and collisions
       \--> adjust velocity based on collisions
       \--> adjust velocity of other objects based on collision
  \--> adjust velocity by gravity and friction
}  

*/

illandril.game.objects.Active.prototype.isActive = true;

illandril.game.objects.Active.prototype.think = function( tick ) {};

illandril.game.objects.Active.prototype.setVelocity = function( newVelocity ) {
  this.velocity = newVelocity.clone();
  this.setDirection( newVelocity );
};

illandril.game.objects.Active.prototype.addVelocity = function( direction ) {
  var newVelocity = this.velocity.clone().add( direction );
  newVelocity.x = Math.min( 1, newVelocity.x );
  newVelocity.x = Math.max( -1, newVelocity.x );
  newVelocity.y = Math.min( 1, newVelocity.y );
  newVelocity.y = Math.max( -1, newVelocity.y );
  // We need to make sure they don't keep skating along very very slowly because of a rounding error
  if ( Math.abs( newVelocity.x ) < illandril.game.objects.GameObject.GRANULARITY ) {
    newVelocity.x = 0;
  }
  if ( Math.abs( newVelocity.y ) < illandril.game.objects.GameObject.GRANULARITY ) {
    newVelocity.y = 0;
  }
  this.setVelocity( newVelocity );
};

illandril.game.objects.Active.prototype.getVelocity = function() {
  var retVelo = this.velocity.clone();
  if ( retVelo.squaredMagnitude() > 1 ) {
    retVelo.normalize();
  }
  return retVelo;
};



illandril.game.objects.Active.prototype.isMoving = function() {
  return this.velocity.x != 0 || this.velocity.y != 0;
};

illandril.game.objects.Active.prototype.moveBy = function( direction ) {
  this.moveTo( this.getPosition().add( direction ) );
};

illandril.game.objects.Active.prototype.moveTo = function( position ) {
  this.bounds.centerOn( position );
  if ( this.world != null ) {
    this.world.objectMoved( this );
  }
};

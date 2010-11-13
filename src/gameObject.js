var nextGameObjectID = 0;
/**
 * @constructor
 */
GameObject = function( world, bounds ) {
  this.id = nextGameObjectID++;
  this.world = world;
  this.bounds = bounds;
  this.world.addObject( this );
  this.velocity = new Vector2( 0, 0 );
};

GameObject.prototype.setVelocity = function( direction ) {
  this.velocity = direction;
};

GameObject.prototype.addVelocity = function( direction ) {
  var newVelocity = this.velocity.add( direction );
  newVelocity.x = Math.min( 1, newVelocity.x );
  newVelocity.x = Math.max( -1, newVelocity.x );
  newVelocity.y = Math.min( 1, newVelocity.y );
  newVelocity.y = Math.max( -1, newVelocity.y );
  this.velocity = newVelocity;
};

GameObject.prototype.getVelocity = function() {
  return this.velocity;
};

GameObject.prototype.isMoving = function() {
  return this.velocity.x != 0 || this.velocity.y != 0;
};

GameObject.prototype.moveBy = function( direction ) {
  this.moveTo( this.getPosition().add( direction ) );
};

GameObject.prototype.moveTo = function( position ) {
  this.bounds.centerOn( position );
  this.world.objectMoved( this );
};

GameObject.prototype.getBounds = function() {
  return this.bounds;
};

GameObject.prototype.getPosition = function() {
  return this.bounds.getCenter();
};

GameObject.prototype.getSize = function() {
  return this.bounds.getSize();
};

GameObject.prototype.think = function( tick ) {
};


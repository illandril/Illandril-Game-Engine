/**
 * @constructor
 */
GameObject = function( world, bounds ) {
  this.world = world;
  this.bounds = bounds;
  this.world.addObject( this );
};

GameObject.prototype.moveBy = function( direction ) {
  this.moveTo( this.getPosition().add( direction ) );
};

GameObject.prototype.moveTo = function( position ) {
  this.bounds.centerOn( position );
  this.world.objectMoved( this );
};

GameObject.prototype.getPosition = function() {
  return this.bounds.getCenter();
};

GameObject.prototype.getSize = function() {
  return this.bounds.getSize();
};


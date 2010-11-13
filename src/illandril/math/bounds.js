goog.provide("illandril.math.Bounds");

goog.require("goog.math.Vec2");

/**
 * @constructor
 */
illandril.math.Bounds = function( center, size, debug ) {
  this.size = size;
  this.halfSize = size.clone().scale( 0.5 );
  this.center = center;
};

illandril.math.Bounds.fromCenter = function( center, size ) {
  return new illandril.math.Bounds( center, size );
};

illandril.math.Bounds.prototype.centerOn = function( position ) {
  this.center = position;
};

illandril.math.Bounds.prototype.getCenter = function() {
  return this.center.clone();
};

illandril.math.Bounds.prototype.getTopLeft = function() {
  return new goog.math.Vec2( this.getLeft(), this.getTop() );
};

illandril.math.Bounds.prototype.getTop = function() {
  return this.center.y - this.halfSize.y;
};

illandril.math.Bounds.prototype.getLeft = function() {
  return this.center.x - this.halfSize.x;
};

illandril.math.Bounds.prototype.getBottom = function() {
  return this.center.y + this.halfSize.y;
};

illandril.math.Bounds.prototype.getRight = function() {
  return this.center.x + this.halfSize.x;
};

illandril.math.Bounds.prototype.getSize = function() {
  return this.size.clone();
};

illandril.math.Bounds.prototype.divide = function( scale ) {
  var newSize = this.size.clone().scale( 1.0 / scale );
  return new illandril.math.Bounds( this.center.clone(), newSize );
};

illandril.math.Bounds.prototype.toString = function() {
  return this.getLeft() + "," + this.getTop() + " - " + this.getRight() + "," + this.getBottom() + " -- " + this.size.toString();
};

illandril.math.Bounds.prototype.intersects = function( otherBounds ) {
  if ( this.getTop() >= otherBounds.getBottom() ) { return false; }
  if ( this.getBottom() <= otherBounds.getTop() ) { return false; }
  if ( this.getRight() <= otherBounds.getLeft() ) { return false; }
  if ( this.getLeft() >= otherBounds.getRight() ) { return false; }
  return true;
};


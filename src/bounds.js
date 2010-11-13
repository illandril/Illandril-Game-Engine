/**
 * @constructor
 */
Bounds = function( center, size ) {
  this.size = size;
  this.halfSize = size.divide( 2 );
  this.center = center;
};

Bounds.fromCenter = function( center, size ) {
  return new Bounds( center, size );
};

Bounds.prototype.centerOn = function( position ) {
  this.center = position;
};

Bounds.prototype.getCenter = function() {
  return this.center;
};

Bounds.prototype.getTopLeft = function() {
  return new Vector2( this.getLeft(), this.getTop() );
};

Bounds.prototype.getTop = function() {
  return this.center.y - this.halfSize.y;
};

Bounds.prototype.getLeft = function() {
  return this.center.x - this.halfSize.x;
};

Bounds.prototype.getBottom = function() {
  return this.center.y + this.halfSize.y;
};

Bounds.prototype.getRight = function() {
  return this.center.x + this.halfSize.x;
};

Bounds.prototype.getSize = function() {
  return this.size;
};

Bounds.prototype.divide = function( scale ) {
  var size = this.size.divide( scale );
  return new Bounds( this.center, size );
};

Bounds.prototype.toString = function() {
  return this.getLeft() + "." + this.getTop() + " - " + this.getRight() + "." + this.getBottom();
};

Bounds.prototype.intersects = function( otherBounds ) {
  if ( this.getTop() >= otherBounds.getBottom() ) { return false; }
  if ( this.getBottom() <= otherBounds.getTop() ) { return false; }
  if ( this.getRight() <= otherBounds.getLeft() ) { return false; }
  if ( this.getLeft() >= otherBounds.getRight() ) { return false; }
  return true;
};


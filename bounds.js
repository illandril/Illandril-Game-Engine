Bounds = function( topLeft, size ) {
  this.topLeft = topLeft;
  this.size = size;
  this.center = new Vector2( this.size.x / 2 + this.topLeft.x, this.size.y / 2 + this.topLeft.y );
}

Bounds.prototype.centerOn = function( position ) {
  this.topLeft = new Vector2( position.x - this.size.x / 2, position.y - this.size.y / 2 )
  this.center = position;
}

Bounds.prototype.getCenter = function() {
  return this.center;
}

Bounds.prototype.getTopLeft = function() {
  return this.topLeft;
}


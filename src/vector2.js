/**
 * @constructor
 */
Vector2 = function( x, y ) {
 this.x = x;
 this.y = y;
};

Vector2.prototype.add = function( vector ) {
  return new Vector2( this.x + vector.x, this.y + vector.y );
};

Vector2.prototype.multiply = function( scale ) {
  return new Vector2( roundNumber( this.x * scale, vectorPrecision ), roundNumber( this.y * scale, vectorPrecision ) );
};

Vector2.prototype.divide = function( scale ) {
  return new Vector2( roundNumber( this.x / scale, vectorPrecision ), roundNumber( this.y / scale, vectorPrecision ) );
};

Vector2.prototype.isWithinXFrom = function( x, otherPosition ) {
  var xDistance = this.x - otherPosition.x;
  var yDistance = this.y - otherPosition.y;
  return xDistance * xDistance + yDistance * yDistance <= x * x;
};

var vectorPrecision = 2;
function roundNumber(num, dec) {
  var factor = Math.pow( 10, dec );
  return Math.round( num * factor ) / factor;
}

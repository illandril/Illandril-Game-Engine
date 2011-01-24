/**
 * @preserve Copyright (c) 2011, Joseph Spandrusyszyn
 * See https://github.com/illandril/Illandril-Game-Engine
 */


goog.provide("illandril.game.objects.Slope");

goog.require("goog.object")
goog.require("illandril");
goog.require("illandril.game.objects.Solid");

/**
 * @constructor
 * @extends illandril.game.objects.Solid
 */
illandril.game.objects.Slope = function( direction ) {
  illandril.game.objects.Solid.call( this );
  this.direction = direction;
};
goog.inherits( illandril.game.objects.Slope, illandril.game.objects.Solid );

illandril.game.objects.Slope.DIRECTION = {
  NE: 0, // Slope goes from bottom left to top right, blocks on bottom and right 
  SE: 1, // Slope goes from top left to bottom right, blocks on top and right
  SW: 2, // Slope goes from bottom left to top right, blocks on top and left
  NW: 3  // Slope goes from top left to bottom right, blocks on bottom and left
};

illandril.game.objects.Slope.RAMP_OFFSET = 0.4; // We add a little bit of offset from the ramp to stop from getting stuck when moving quickly along slopes

illandril.game.objects.Slope.prototype.blocksFromTop = function() {
  return this.direction == illandril.game.objects.Slope.DIRECTION.SE || this.direction == illandril.game.objects.Slope.DIRECTION.SW;
};
illandril.game.objects.Slope.prototype.blocksFromBottom = function() {
  return this.direction == illandril.game.objects.Slope.DIRECTION.NE || this.direction == illandril.game.objects.Slope.DIRECTION.NW;
};
illandril.game.objects.Slope.prototype.blocksFromLeft = function() {
  return this.direction == illandril.game.objects.Slope.DIRECTION.NW || this.direction == illandril.game.objects.Slope.DIRECTION.SW;
};
illandril.game.objects.Slope.prototype.blocksFromRight = function() {
  return this.direction == illandril.game.objects.Slope.DIRECTION.NE || this.direction == illandril.game.objects.Slope.DIRECTION.SE;
};

illandril.game.objects.Slope.prototype.collideWith = function( otherObject ) {
  if ( otherObject.canBeBlockedBy( this ) ) {
    var otherBounds = otherObject.getBounds();
    var size = this.getBounds().getSize();
    if ( this.direction == illandril.game.objects.Slope.DIRECTION.NE ) {
      // WORKS
      var y = otherBounds.getBottom() - this.getBounds().getBottom();
      var x = this.getBounds().getRight() - otherBounds.getRight();
      var slope = Math.min( ( size.x - x ) / size.x, 1 );
      var rampTop = slope * size.y + illandril.game.objects.Slope.RAMP_OFFSET;
      if ( rampTop > y ) {
        otherObject.moveBy( new goog.math.Vec2( 0, rampTop - y ) );
        otherObject.blockedY();
      }
    } else if ( this.direction == illandril.game.objects.Slope.DIRECTION.SE ) {
      // NOT TESTED
      var y = this.getBounds().getTop() - otherBounds.getTop();
      var x = this.getBounds().getRight() - otherBounds.getRight();
      var slope = Math.min( ( size.x - x ) / size.x, 1 );
      var rampTop = slope * size.y + illandril.game.objects.Slope.RAMP_OFFSET;
      if ( rampTop < y ) {
        otherObject.moveBy( new goog.math.Vec2( 0, rampTop - y ) );
        otherObject.blockedY();
      }
    } else if ( this.direction == illandril.game.objects.Slope.DIRECTION.SW ) {
      // NOT TESTED
      var y = this.getBounds().getTop() - otherBounds.getTop();
      var x = otherBounds.getLeft() - this.getBounds().getLeft();
      var slope = Math.min( ( size.x - x ) / size.x, 1 );
      var rampTop = slope * size.y + illandril.game.objects.Slope.RAMP_OFFSET;
      if ( rampTop < y ) {
        otherObject.moveBy( new goog.math.Vec2( 0, rampTop - y ) );
        otherObject.blockedY();
      }
    } else /* NW */ {
      // WORKS
      var y = otherBounds.getBottom() - this.getBounds().getBottom();
      var x = otherBounds.getLeft() - this.getBounds().getLeft();
      var slope = Math.min( ( size.x - x ) / size.x, 1 );
      var rampTop = slope * size.y + illandril.game.objects.Slope.RAMP_OFFSET;
      if ( rampTop > y ) {
        otherObject.moveBy( new goog.math.Vec2( 0, rampTop - y ) );
        otherObject.blockedY();
      }
    }
  }
};

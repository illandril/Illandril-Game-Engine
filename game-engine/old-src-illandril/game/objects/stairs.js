/**
 * @preserve Copyright (c) 2011, Joseph Spandrusyszyn
 * See https://github.com/illandril/Illandril-Game-Engine.
 */


goog.provide('illandril.game.objects.Stairs');

goog.require('goog.object');
goog.require('illandril');
goog.require('illandril.game.objects.Slope');

/**
 * @constructor
 * @extends illandril.game.objects.Slope
 */
illandril.game.objects.Stairs = function(direction, steps) {
  illandril.game.objects.Slope.call(this, direction);
  this.steps = steps;
};
goog.inherits(illandril.game.objects.Stairs, illandril.game.objects.Slope);

illandril.game.objects.Stairs.prototype.collideWith = function(otherObject, movement) {
  if (otherObject.canBeBlockedBy(this)) {
    var thisBounds = this.getBlockingBounds();
    var otherBounds = otherObject.getBlockingBounds();
    var size = this.getBounds().getSize();
    var stepHeight = size.y / this.steps;
    if (this.direction == illandril.game.objects.Slope.DIRECTION.NE) {
      var y = otherBounds.getBottom() - thisBounds.getBottom();
      var x = thisBounds.getRight() - otherBounds.getRight();
      var slope = Math.min((size.x - x) / size.x, 1);
      var rampTop = slope * size.y;
      rampTop = rampTop - rampTop % stepHeight + stepHeight;
      rampTop = Math.min(size.y, rampTop);
      rampTop = rampTop + illandril.game.objects.Slope.RAMP_OFFSET;
      if (rampTop > y) {
        otherObject.moveBy(new goog.math.Vec2(0, rampTop - y));
        if ( movement.y < 0 ) {
          otherObject.blockedY();
        }
      }
    } else if (this.direction == illandril.game.objects.Slope.DIRECTION.SE) {
      var y = thisBounds.getTop() - otherBounds.getTop();
      var x = thisBounds.getRight() - otherBounds.getRight();
      var slope = Math.min((size.x - x) / size.x, 1);
      var rampBottom = slope * size.y;
      rampBottom = rampBottom - rampBottom % stepHeight + stepHeight;
      rampBottom = Math.min(size.y, rampBottom);
      rampBottom = rampBottom + illandril.game.objects.Slope.RAMP_OFFSET;
      if (rampBottom > y) {
        otherObject.moveBy(new goog.math.Vec2(0, -1 * (rampBottom - y)));
        if ( movement.y > 0 ) {
          otherObject.blockedY();
        }
      }
    } else if (this.direction == illandril.game.objects.Slope.DIRECTION.SW) {
      var y = thisBounds.getTop() - otherBounds.getTop();
      var x = otherBounds.getLeft() - thisBounds.getLeft();
      var slope = Math.min((size.x - x) / size.x, 1);
      var rampBottom = slope * size.y;
      rampBottom = rampBottom - rampBottom % stepHeight + stepHeight;
      rampBottom = Math.min(size.y, rampBottom);
      rampBottom = rampBottom + illandril.game.objects.Slope.RAMP_OFFSET;
      if (rampBottom > y) {
        otherObject.moveBy(new goog.math.Vec2(0, -1 * (rampBottom - y)));
        if ( movement.y > 0 ) {
          otherObject.blockedY();
        }
      }
    } else /* NW */ {
      var y = otherBounds.getBottom() - thisBounds.getBottom();
      var x = otherBounds.getLeft() - thisBounds.getLeft();
      var slope = Math.min((size.x - x) / size.x, 1);
      var rampTop = slope * size.y;
      rampTop = rampTop - rampTop % stepHeight + stepHeight;
      rampTop = Math.min(size.y, rampTop);
      rampTop = rampTop + illandril.game.objects.Slope.RAMP_OFFSET;
      if (rampTop > y) {
        otherObject.moveBy(new goog.math.Vec2(0, rampTop - y));
        if ( movement.y < 0 ) {
          otherObject.blockedY();
        }
      }
    }
  }
};

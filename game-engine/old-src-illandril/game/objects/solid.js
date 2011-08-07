/**
 * @preserve Copyright (c) 2011, Joseph Spandrusyszyn
 * See https://github.com/illandril/Illandril-Game-Engine.
 */


goog.provide('illandril.game.objects.Solid');

goog.require('illandril');
goog.require('illandril.game.objects.GameObject');

/**
 * @constructor
 */
illandril.game.objects.Solid = function(blockingBounds) {
  if (!this instanceof illandril.game.objects.GameObject) {
    throw 'Error... solid object not also a game object!';
  }
  this.blockingBounds = blockingBounds;
};

illandril.game.objects.Solid.prototype.getBlockingBounds = function() {
  if ( this.blockingBounds != null ) {
    var pos = this.getPosition();
    var blockPos = this.blockingBounds.getCenter();
    return new illandril.math.Bounds(new goog.math.Vec2(pos.x + blockPos.x, pos.y + blockPos.y), this.blockingBounds.getSize());
  } else {
    return this.getBounds();
  }
};

illandril.game.objects.Solid.prototype.isSolid = true;

illandril.game.objects.Solid.prototype.isBlockingCollision = function(nearbyObject, movement ) {
  if (!this.canBeBlocked()) {
    return false;
  }
  if (!nearbyObject.canBlock(this)) {
    return false;
  }
  if (nearbyObject.hasDirectionalBlockingRules()) {
    var nearbyBounds = nearbyObject.getBlockingBounds();
    if (movement.y < 0 && nearbyObject.blocksFromTop()) {
        // We're starting above the other object
        if (this.bounds.getBottom() > nearbyBounds.getTop()) {
            return true;
        }
    } else if (movement.y > 0 && nearbyObject.blocksFromBottom()) {
        // We're starting below the other object
        if (this.bounds.getTop() < nearbyBounds.getBottom()) {
            return true;
        }
    }
    if (movement.x > 0 && nearbyObject.blocksFromLeft()) {
        // We're starting left of the other object
        if (this.bounds.getRight() < nearbyBounds.getLeft()) {
            return true;
        }
    } else if (movement.x < 0 && nearbyObject.blocksFromRight()) {
        // We're starting left of the other object
        if (this.bounds.getLeft() > nearbyBounds.getRight()) {
            return true;
        }
    }
    // We either started inside the other object, or came from a non-blocking direction
    return false;
  } else {
    return true;
  }
};
illandril.game.objects.Solid.prototype.hasDirectionalBlockingRules = function() {
  return !this.blocksFromTop() || !this.blocksFromBottom() || !this.blocksFromLeft() || !this.blocksFromRight();
};
illandril.game.objects.Solid.prototype.blocksFromTop = function() { return true; };
illandril.game.objects.Solid.prototype.blocksFromBottom = function() { return true; };
illandril.game.objects.Solid.prototype.blocksFromLeft = function() { return true; };
illandril.game.objects.Solid.prototype.blocksFromRight = function() { return true; };

illandril.game.objects.Solid.prototype.canBlock = function(otherObject ) {
  return (this.blocksFromTop() || this.blocksFromBottom() || this.blocksFromLeft() || this.blocksFromRight()) && otherObject.canBeBlockedBy(this);
};
illandril.game.objects.Solid.prototype.canBeBlocked = function() { return true; };
illandril.game.objects.Solid.prototype.canBeBlockedBy = function(otherObject ) { return true; };

illandril.game.objects.Solid.prototype.canCollideWith = function(otherObject ) { return false; };
illandril.game.objects.Solid.prototype.collideWith = function(otherObject ) {};

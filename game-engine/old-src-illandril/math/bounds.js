/**
 * @preserve Copyright (c) 2011, Joseph Spandrusyszyn
 * See https://github.com/illandril/Illandril-Game-Engine.
 */

/**
 * @fileoverview A rectangular bounding box.
 */

goog.provide('illandril.math.Bounds');

goog.require('goog.math.Vec2');
goog.require('illandril');

/**
 * @param {!goog.math.Vec2} center The center of the Bounds.
 * @param {!goog.math.Vec2} size The size of the Bounds.
 * @constructor
 */
illandril.math.Bounds = function(center, size) {
  this.size = size;
  this.halfSize = size.clone().scale(0.5);
  this.center = center;
};

/**
 * @param {!goog.math.Vec2} position The new center of the bounds.
 */
illandril.math.Bounds.prototype.centerOn = function(position) {
  this.center = position;
};

/**
 * @return {!goog.math.Vec2} A clone of the center of the bounds.
 */
illandril.math.Bounds.prototype.getCenter = function() {
  return this.center.clone();
};

/**
 * @return {number} The Y value of the top of the bounds.
 */
illandril.math.Bounds.prototype.getTop = function() {
  return this.center.y + this.halfSize.y;
};

/**
 * @return {number} The X value of the left of the bounds.
 */
illandril.math.Bounds.prototype.getLeft = function() {
  return this.center.x - this.halfSize.x;
};

/**
 * @return {number} The Y value of the bottom of the bounds.
 */
illandril.math.Bounds.prototype.getBottom = function() {
  return this.center.y - this.halfSize.y;
};

/**
 * @return {number} The X value of the right of the bounds.
 */
illandril.math.Bounds.prototype.getRight = function() {
  return this.center.x + this.halfSize.x;
};

/**
 * @return {!goog.math.Vec2} A clone of the size of the bounds.
 */
illandril.math.Bounds.prototype.getSize = function() {
  return this.size.clone();
};

/**
 * @param {number} scale The value to divide the bounds by.
 * @return {!illandril.math.Bounds} A new Bounds object with the scaled size.
 */
illandril.math.Bounds.prototype.divide = function(scale) {
  var newSize = this.size.clone().scale(1.0 / scale);
  return new illandril.math.Bounds(this.center.clone(), newSize);
};

if (illandril.DEBUG) {
  /**
   * @return {string} A text representation of the Bounds.
   */
  illandril.math.Bounds.prototype.toString = function() {
    var tl = this.getLeft() + ',' + this.getTop();
    var br = this.getRight() + ',' + this.getBottom();
    return tl + ';' + br + ' -- ' + this.size.toString();
  };
}

/**
 * @param {!illandril.math.Bounds} otherBounds A Bounds object to check for
 *     intersection with.
 * @return {boolean} true if otherBounds intersects with this bounds.
 */
illandril.math.Bounds.prototype.intersects = function(otherBounds) {
  if (this.getTop() <= otherBounds.getBottom()) { return false; }
  if (this.getBottom() >= otherBounds.getTop()) { return false; }
  if (this.getRight() <= otherBounds.getLeft()) { return false; }
  if (this.getLeft() >= otherBounds.getRight()) { return false; }
  return true;
};

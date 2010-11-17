goog.provide("illandril.game.objects.GameObject");

goog.require("goog.math.Vec2");

var nextGameObjectID = 0;
/**
 * @constructor
 */
illandril.game.objects.GameObject = function( world, bounds, bg, zIndex ) {
  this.id = nextGameObjectID++;
  this.world = world;
  this.bounds = bounds;
  this.zIndex = zIndex;
  this.world.addObject( this );
  this.bg = bg;
  this.visible = true;
};

illandril.game.objects.GameObject.prototype.getBounds = function() {
  return this.bounds;
};

illandril.game.objects.GameObject.prototype.getPosition = function() {
  return this.bounds.getCenter();
};

illandril.game.objects.GameObject.prototype.getSize = function() {
  return this.bounds.getSize();
};

illandril.game.objects.GameObject.prototype.isVisible = function() {
  return this.visible;
};


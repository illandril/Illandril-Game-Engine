goog.provide("illandril.game.objects.GameObject");

goog.require("goog.math.Vec2");

var nextGameObjectID = 0;
/**
 * @constructor
 */
illandril.game.objects.GameObject = function( world, bounds, bg ) {
  this.id = nextGameObjectID++;
  this.world = world;
  this.bounds = bounds;
  this.world.addObject( this );
  this.bg = bg;
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

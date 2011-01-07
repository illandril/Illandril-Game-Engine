goog.provide("illandril.game.objects.GameObject");

goog.require("goog.math.Vec2");

var nextGameObjectID = 0;
/**
 * @constructor
 */
illandril.game.objects.GameObject = function( scene, bounds, bg, zIndex ) {
  this.id = nextGameObjectID++;
  this.scene = scene;
  this.bounds = bounds;
  this.zIndex = zIndex;
  this.scene.addObject( this );
  this.bg = bg;
  this.visible = true;
  this.direction = new goog.math.Vec2(0,0);
};

// We need to make sure things don't get messed up because of rounding errors
illandril.game.objects.GameObject.GRANULARITY = 0.005;

illandril.game.objects.GameObject.prototype.getBounds = function() {
  return this.bounds;
};

illandril.game.objects.GameObject.prototype.getPosition = function() {
  return this.bounds.getCenter();
};

illandril.game.objects.GameObject.prototype.setDirection = function( dir ) {
  var newDir = dir.clone();
  if ( Math.abs( newDir.x ) < illandril.game.objects.GameObject.GRANULARITY ) {
    newDir.x = 0;
  }
  if ( Math.abs( newDir.y ) < illandril.game.objects.GameObject.GRANULARITY ) {
    newDir.y = 0;
  }
  if ( newDir.x != 0 || newDir.y != 0 ) {
    newDir.normalize();
    this.direction = newDir;
  }
};

illandril.game.objects.GameObject.prototype.getDirection = function() {
  return this.direction;
};


illandril.game.objects.GameObject.prototype.getVelocity = function() {
  return new goog.math.Vec2(0,0);
};

illandril.game.objects.GameObject.prototype.getSize = function() {
  return this.bounds.getSize();
};

illandril.game.objects.GameObject.prototype.isVisible = function() {
  return this.visible;
};


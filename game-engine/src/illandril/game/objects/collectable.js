/**
 * @preserve Copyright (c) 2011, Joseph Spandrusyszyn
 * See https://github.com/illandril/Illandril-Game-Engine
 */


goog.provide("illandril.game.objects.Collectable");

goog.require("goog.object")
goog.require("illandril.game.objects.GameObject");
goog.require("illandril.game.objects.Solid");
goog.require("illandril.game.objects.Floater");

/**
 * @constructor
 * @extends illandril.game.objects.GameObject
 */
illandril.game.objects.Collectable = function( scene, bounds, bg, zIndex ) {
  illandril.game.objects.GameObject.call( this, scene, bounds, bg, zIndex );
  illandril.game.objects.Solid.call( this );
  illandril.game.objects.Floater.call( this );
};
goog.inherits( illandril.game.objects.Collectable, illandril.game.objects.GameObject );
goog.object.extend( illandril.game.objects.Collectable.prototype, illandril.game.objects.Solid.prototype );
goog.object.extend( illandril.game.objects.Collectable.prototype, illandril.game.objects.Floater.prototype );

illandril.game.objects.Collectable.prototype.blocks = function( otherObject ) {
  return false;
};

illandril.game.objects.Collectable.prototype.canBeBlocked = function() {
  return false;
};

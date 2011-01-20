/**
 * @preserve Copyright (c) 2011, Joseph Spandrusyszyn
 * See https://github.com/illandril/Illandril-Game-Engine
 */


goog.provide("illandril.game.objects.Consumer");

goog.require("goog.object");
goog.require("illandril.game.objects.GameObject");
goog.require("illandril.game.objects.Solid");

/**
 * @constructor
 * @extends illandril.game.objects.GameObject
 */
illandril.game.objects.Consumer = function( scene, bounds, bg, zIndex, type ) {
  illandril.game.objects.GameObject.call( this, scene, bounds, bg, zIndex );
  illandril.game.objects.Solid.call( this );
  this.type = type;
};
goog.inherits( illandril.game.objects.Consumer, illandril.game.objects.GameObject );
goog.object.extend( illandril.game.objects.Consumer.prototype, illandril.game.objects.Solid.prototype );

illandril.game.objects.Consumer.prototype.canBlock = function( otherObject ) {
  return false;
};

illandril.game.objects.Consumer.prototype.collideWith = function( otherObject ) {
  if ( otherObject instanceof this.type ) {
    this.scene.removeObject( otherObject );
  }
};

goog.provide("illandril.game.objects.Solid");

goog.require("illandril.game.objects.GameObject");

/**
 * @constructor
 */
illandril.game.objects.Solid = function() {
  if ( !this instanceof illandril.game.objects.GameObject ) {
    throw "Error... solid object not also a game object!"
  }
};
illandril.game.objects.Solid.prototype.blocks = function( otherObject ) { return true; };
illandril.game.objects.Solid.prototype.canBeBlocked = function() { return true; };
illandril.game.objects.Solid.prototype.canBeBlockedBy = function( otherObject ) { return true; };
illandril.game.objects.Solid.prototype.collideWith = function( otherObject ) {};

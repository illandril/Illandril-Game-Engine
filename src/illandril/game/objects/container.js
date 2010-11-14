goog.provide("illandril.game.objects.Container");

goog.require("goog.structs.Set");
goog.require("illandril.game.objects.Active");
goog.require("illandril.game.objects.Solid");

/**
 * @constructor
 */
illandril.game.objects.Container = function() {
  this.objects = new goog.structs.Set();
  this.activeObjects = new goog.structs.Set();
  this.solidObjects = new goog.structs.Set();
};

illandril.game.objects.Container.add = function( object ) {
  this.objects.add( object );
  if ( object instanceof illandril.game.objects.Active ) {
    this.activeObjects.add( object );
  }
  if ( object instanceof illandril.game.objects.Solid ) {
    this.solidObjects.add( object );
  }
};

illandril.game.objects.Container.remove = function( object ) {
  this.objects.remove( object );
  this.activeObjects.remove( object );
  this.solidObjects.remove( object );
};

illandril.game.objects.Container.getAllObjects = function() {
  return this.objects.getValues();
};

illandril.game.objects.Container.getActiveObjects = function() {
  return this.activeObjects.getValues();
};

illandril.game.objects.Container.getSolidObjects = function() {
  return this.solidObjects.getValues();
};



/**
 * @preserve Copyright (c) 2011, Joseph Spandrusyszyn
 * See https://github.com/illandril/Illandril-Game-Engine
 */


goog.provide("illandril.game.objects.Container");

goog.require("goog.structs.Set");
goog.require("illandril.game.objects.Active");
goog.require("illandril.game.objects.Solid");

/**
 * @constructor
 */
illandril.game.objects.Container = function() {
  this.objects = {};
  this.objectsArrayCache = [];
  this.activeObjects = {};
  this.activeObjectsArrayCache = [];
  this.solidObjects = {};
  this.solidObjectsArrayCache = [];
};

illandril.game.objects.Container.prototype.add = function( object ) {
  this.objects[object.id] = object;
  if ( this.objectsArrayCache != null ) {
    this.objectsArrayCache.push( object );
  }
  if ( object.isActive ) {
    this.activeObjects[object.id] = object;
    if ( this.activeObjectsArrayCache != null ) {
      this.activeObjectsArrayCache.push( object );
    }
  }
  if ( object.isSolid ) {
    this.solidObjects[object.id] = object;
    if ( this.solidObjectsArrayCache != null ) {
      this.solidObjectsArrayCache.push( object );
    }
  }
};

illandril.game.objects.Container.prototype.remove = function( object ) {
  if ( this.objects[object.id] != null ) {
    this.objectsArrayCache = null;
    delete this.objects[object.id];
  } 
  if ( this.activeObjects[object.id] != null ) {
    this.activeObjectsArrayCache = null;
    delete this.activeObjects[object.id];
  }
  if ( this.solidObjects[object.id] != null ) {
    this.solidObjectsArrayCache = null;
    delete this.solidObjects[object.id];
  }
};

illandril.game.objects.Container.prototype.getAllObjects = function() {
  if ( this.objectsArrayCache == null ) {
    this.objectsArrayCache = [];
    for ( var key in this.objects ) {
      this.objectsArrayCache.push( this.objects[key] );
    }
  }
  return this.objectsArrayCache;
};

illandril.game.objects.Container.prototype.getActiveObjects = function() {
  if ( this.activeObjectsArrayCache == null ) {
    this.activeObjectsArrayCache = [];
    for ( var key in this.activeObjects ) {
      this.activeObjectsArrayCache.push( this.objects[key] );
    }
  }
  return this.activeObjectsArrayCache;
};

illandril.game.objects.Container.prototype.getSolidObjects = function() {
  if ( this.solidObjectsArrayCache == null ) {
    this.solidObjectsArrayCache = [];
    for ( var key in this.solidObjects ) {
      this.solidObjectsArrayCache.push( this.objects[key] );
    }
  }
  return this.solidObjectsArrayCache;
};

/**
 * @preserve Copyright (c) 2011, Joseph Spandrusyszyn
 * See https://github.com/illandril/Illandril-Game-Engine.
 */


goog.provide('illandril.game.Cutscene');

goog.require('illandril');

goog.require('illandril.game.objects.Container');
goog.require('illandril.game.ui.Controls');

/**
 * @constructor
 */
illandril.game.Cutscene = function(name, scene) {
  this.scene = scene;
  this.controls = new illandril.game.ui.Controls(name);
  this.objects = new illandril.game.objects.Container();
};


illandril.game.Cutscene.prototype.getObjects = function() {
  return this.objects;
};

illandril.game.Cutscene.prototype.getControls = function() {
  return this.controls;
};

/**
 * Adds an object to the cutscene.
 * @param {illandril.game.objects.GameObject} gameObject The object to add to the cutscene.
 */
illandril.game.Cutscene.prototype.addObject = function(gameObject) {
  this.objects.add(gameObject);
};

/**
 * Removes an object from the cutscene.
 * @param {illandril.game.objects.GameObject} gameObject The object to remove from the cutscene.
 */
illandril.game.Cutscene.prototype.removeObject = function(gameObject) {
  this.objects.remove(gameObject);
};

illandril.game.Cutscene.prototype.start = function() {
  this.initialize();
};

illandril.game.Cutscene.prototype.end = function() {
  this.cleanup();
};

illandril.game.Cutscene.prototype.update = function() {
  this.think();
  this.scene._update(this.objects.getActiveObjects());
};

illandril.game.Cutscene.prototype.initialize = function() {};

illandril.game.Cutscene.prototype.think = function() {};

illandril.game.Cutscene.prototype.cleanup = function() {};
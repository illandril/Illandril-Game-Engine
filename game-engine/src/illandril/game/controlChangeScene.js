/**
 * @preserve Copyright (c) 2011, Joseph Spandrusyszyn
 * See https://github.com/illandril/Illandril-Game-Engine.
 */


goog.provide('illandril.game.ControlChangeScene');

goog.require('goog.math.Vec2');
goog.require('illandril');
goog.require('illandril.game.Scene');

/**
 * @constructor
 * @extends illandril.game.Scene
 */
illandril.game.ControlChangeScene = function(name, firstControlCenter, font, padding ) {
  illandril.game.Scene.call(this, name);
  this.nextCenter = firstControlCenter;
  this.font = font;
  this.padding = padding || 0;
};
goog.inherits(illandril.game.ControlChangeScene, illandril.game.Scene);

illandril.game.ControlChangeScene.prototype.addControl = function(controls, action ) {
  var newEntry = new illandril.game.objects.menus.ControlEntry(this, controls, action, this.nextCenter, this.font, 0);
  var height = this.font.getLetter(action.name.charAt(0)).height;
  this.nextCenter = new goog.math.Vec2(this.nextCenter.x, this.nextCenter.y - height - this.padding);
};


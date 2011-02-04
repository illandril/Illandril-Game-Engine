/**
 * @preserve Copyright (c) 2011, Joseph Spandrusyszyn
 * See https://github.com/illandril/Illandril-Game-Engine.
 */


goog.provide('illandril.game.ControlChangeScene');

goog.require('goog.math.Vec2');
goog.require('illandril');
goog.require('illandril.game.Scene');

/**
 * @param {string} name The name of this scene.
 * @param {!goog.math.Vec2} firstControlCenter The center of the first control.
 * @param {!illandril.game.ui.Font} font The font to use for listing controls.
 * @param {?number} padding The amount of vertical padding between controls.
 * @constructor
 * @extends illandril.game.Scene
 */
illandril.game.ControlChangeScene = function(name, firstControlCenter, font,
                                             padding) {
  illandril.game.Scene.call(this, name);
  this.nextCenter = firstControlCenter;
  this.font = font;
  this.padding = padding || 0;
};
goog.inherits(illandril.game.ControlChangeScene, illandril.game.Scene);

/**
 * @param {!illandril.game.ui.Controls} controls The controls listener that
 *     handles the action.
 * @param {!illandril.game.ui.Action} action The action the control is for.
 */
illandril.game.ControlChangeScene.prototype.addControl = function(controls,
                                                                  action) {
  var newEntry = new illandril.game.objects.menus.ControlEntry(this, controls,
                                                               action,
                                                               this.nextCenter,
                                                               this.font, 0);
  var height = this.font.getLetter(action.name.charAt(0)).height;
  var nextY = this.nextCenter.y - height - this.padding;
  this.nextCenter = new goog.math.Vec2(this.nextCenter.x, nextY);
};


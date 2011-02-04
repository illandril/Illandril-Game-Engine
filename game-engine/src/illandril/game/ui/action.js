/**
 * @preserve Copyright (c) 2011, Joseph Spandrusyszyn
 * See https://github.com/illandril/Illandril-Game-Engine.
 */


goog.provide('illandril.game.ui.Action');

goog.require('illandril');

/**
 * @param {Function} fn The function to execute when this action occurs.
 * @param {string} name The end-user facing name of the action.
 * @param {boolean} executeOnRepeat flag indicating if execute should be called on repeat key presses.
 * @constructor
 */
illandril.game.ui.Action = function(fn, name, executeOnRepeat ) {
  this.execute = fn;
  this.name = name;
  this['name'] = name;
  this.executeOnRepeat = executeOnRepeat;
};

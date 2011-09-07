goog.provide('game.controls.action');

/**
 * @param {Function} fn The function to execute when this action occurs.
 * @param {string} name The end-user facing name of the action.
 * @param {boolean} executeOnRepeat flag indicating if execute should be called on repeat key presses.
 * @constructor
 */
game.controls.action = function(fn, name, executeOnRepeat) {
  this.execute = fn;
  this.name = name;
  this['name'] = name;
  this.executeOnRepeat = executeOnRepeat;
};

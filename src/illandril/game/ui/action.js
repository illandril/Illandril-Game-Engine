goog.provide("illandril.game.ui.Action");

/**
 * @param {Function} fn The function to execute when this action occurs
 * @param {string} name The end-user facing name of the action
 * @constructor
 */
illandril.game.ui.Action =  function( fn, name ) {
  this.execute = fn;
  this.name = name;
  this["name"] = name;
};

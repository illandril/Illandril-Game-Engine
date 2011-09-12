goog.provide('illandril.game.controls.action');

/**
 * @param {function()} fn The function to execute when this action occurs.
 * @param {string} name The end-user facing name of the action.
 * @param {boolean} executeOnRepeat flag indicating if execute should be called on repeat key presses.
 * @constructor
 */
illandril.game.controls.action = function(fn, name, executeOnRepeat) {
    /** @type {function()} */
    this.execute = fn;
    
    /** @type {string} */
    this.name = name;
    
    /** @type {boolean} */
    this.executeOnRepeat = executeOnRepeat;
};

/*
 * See Box2D.js
 */

goog.provide('Box2D.inherit');
goog.provide('Box2D.generateCallback');
goog.provide('Box2D.is');
goog.provide('Box2D.Queue');
goog.provide('Box2D.postDefs');
goog.provide('Box2D.Consts');

goog.provide('Box2D.defineProperty');

Box2D = Box2D || {};

if (!(Object.prototype.defineProperty instanceof Function) && Object.prototype.__defineGetter__ instanceof Function && Object.prototype.__defineSetter__ instanceof Function) {
    Box2D.defineProperty = function(obj, p, cfg) {
        if (cfg.get instanceof Function) obj.__defineGetter__(p, cfg.get);
        if (cfg.set instanceof Function) obj.__defineSetter__(p, cfg.set);
    };
} else {
    Box2D.defineProperty = Object.defineProperty;
}

/**
 * Makes a class a subclass of a different class
 * MUST BE CALLED BEFORE ANY PROTOTYPE IS DEFINED IN THE SUBCLASS
 * @param {function} childClass The class inheriting from a different class
 * @param {function} baseClass The class inherited from
 */
Box2D.inherit = function(childClass, baseClass) {
    var tmpCtr = childClass;
    var emptyFn = function() {};
    emptyFn.prototype = baseClass.prototype;
    childClass.prototype = new emptyFn();
    childClass.prototype.constructor = tmpCtr;
};

/**
 * Creates a callback function
 * @param {!Object} context The context ('this' variable) of the callback function
 * @param {function} fn The function to execute with the given context for the returned callback
 * @return {function()} The callback function
 */
Box2D.generateCallback = function(context, fn) {
    return function() {
        fn.apply(context, arguments);
    };
};

/**
 * Checks to see if an object is of a given type
 * @param {!Object} object The object to check
 * @param {function} type The type to check against
 */
Box2D.is = function(object, type) {
    if (object instanceof type) {
        return true;
    }
    if (object.constructor !== undefined && object.constructor.__implements !== undefined) {
        if (object.constructor.__implements[type]) {
            return true;
        }
    }
    return false;
};

/**
 * Gets the absolute value of a value
 * @param {number} v The value to get the absolute value of
 * @return {number}
 */
Box2D.parseUInt = function(v) {
    return Math.abs(v);
};

/**
 * A Queue
 * @constructor
 */
Box2D.Queue = function() {
    this.queue = [];
    this.size = 0;
    this.start = 0;
};

/**
 * Adds an object to the queue
 * @param {*} o The object to enqueue
 */
Box2D.Queue.prototype.enqueue = function(o) {
    this.queue[this.start + this.size] = o;
    this.size++;
};

/**
 * Gets the next object from the queue
 * @return {*} o The object from the queue
 */
Box2D.Queue.prototype.dequeue = function() {
    var o = this.queue[this.start];
    this.queue[this.start] = null;
    this.size--;
    this.start++;
    return o;
};

Box2D.Consts.MIN_VALUE_SQUARED = Number.MIN_VALUE * Number.MIN_VALUE;


/**
 * Actions to execute after all of Box2D is initialized
 * @type {Array.<function()>}
 */
Box2D.postDefs = [];

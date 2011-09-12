goog.provide('illandril.game.ai');

goog.require('goog.array');

/**
 * @constructor
 */
illandril.game.ai = function() {
    /** @type {Array.<!illandril.game.gameObject>} */
    this.thinkers = [];
};

/**
 * @param {!illandril.game.gameObject} thinker
 * @param {function(number, number)} thought
 */
illandril.game.ai.prototype.addThinker = function(thinker, thought) {
    thinker.thoughts.push(thought);
    goog.array.insert(this.thinkers, thinker);
};

/**
 * @param {!illandril.game.gameObject} thinker
 */
illandril.game.ai.prototype.clearThinker = function(thinker) {
    goog.array.remove(this.thinkers, thinker);
};

/**
 * @param {!illandril.game.gameObject} thinker
 * @param {function(number, number)} thought
 */
illandril.game.ai.prototype.removeThinker = function(thinker, thought) {
    if (thinker.thoughts.length > 0) {
        goog.array.remove(thinker.thoughts, thought);
        if (thinker.thoughts.length == 0) {
            this.clearThinker(thinker);
        }
    }
};

/**
 * @param {number} time
 * @param {number} tick
 */
illandril.game.ai.prototype.think = function(time, tick) {
    for (var tIdx = 0; tIdx < this.thinkers.length; tIdx++) {
        var thinker = this.thinkers[tIdx];
        for (var thoughtIdx = 0; thoughtIdx < thinker.thoughts.length; thoughtIdx++) {
            thinker.thoughts[thoughtIdx].apply(thinker, [time, tick]);
        }
    }
};

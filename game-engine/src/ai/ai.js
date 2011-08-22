// If this isn't here, the built version fails for some reason
var game = game || {};

goog.provide('game.ai');

goog.require('goog.array');

game.ai = function() {
    this.thinkers = [];
};

game.ai._instance = null;

game.ai.getInstance = function() {
    if (game.ai._instance === null) {
        game.ai._instance = new game.ai();
    }
    return game.ai._instance;
};

game.ai.prototype.addThinker = function(thinker, thought) {
    if (typeof(thought) != "function") {
        throw "Thought not a function!";
    }
    thinker.thoughts = thinker.thoughts || [];
    thinker.thoughts.push(thought);
    goog.array.insert(this.thinkers, thinker);
};

game.ai.prototype.clearThinker = function(thinker) {
    thinker.thoughts = null;
    goog.array.remove(this.thinkers, thinker);
};

game.ai.prototype.removeThinker = function(thinker, thought) {
    if (thinker.thoughts != null) {
        goog.array.remove(thinker.thoughts, thought);
        if (thinker.thoughts.length == 0) {
            this.clearThinker(thinker);
        }
    }
};

game.ai.prototype.think = function(time, tick) {
    for (var tIdx = 0; tIdx < this.thinkers.length; tIdx++) {
        var thinker = this.thinkers[tIdx];
        for (var thoughtIdx = 0; thoughtIdx < thinker.thoughts.length; thoughtIdx++) {
            thinker.thoughts[thoughtIdx].apply(thinker, [time, tick]);
        }
    }
};

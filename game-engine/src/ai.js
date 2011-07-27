goog.provide('game.ai');

game = game || {};

(function(game){
    var thinkers = [];
    
    game.ai = {};
    
    game.ai.addThinker = function(thinker) {
        if (typeof(thinker.think) != "function") {
            throw "Thinker can't think!";
        }
        if (thinker.tIdx != null) {
            throw "Thinker already added!";
        }
        thinker.tIdx = thinkers.push( thinker );
    };
    
    game.ai.removeThinker = function(thinker) {
        if (thinker.tIdx != null) {
            throw "Thinker not added (or already removed)!";
        }
        thinkers[thinker.tIdx] = null;
        thinker.tIdx = null;
    };
    
    game.ai.think = function(time, tick) {
        var newThinkers = [];
        for (var tIdx = 0; tIdx < thinkers.length; tIdx++) {
            var thinker = thinkers[tIdx];
            if (thinker == null) {
                continue;
            }
            thinker.tIdx = newThinkers.push(thinkers[tIdx]);
            thinker.think(tick);
        }
        thinkers = newThinkers;
    };

})(game);
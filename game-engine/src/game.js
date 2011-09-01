goog.provide('game.game');

goog.require('Box2D');

goog.require('game.ai');
goog.require('game.world');
goog.require('game.ui.viewport');
goog.require('game.ui.animation');

goog.require('window.requestAnimFrame');

game.game = function(gameType, gameContainerID, worldSize, gravity, viewportSize, viewportScale, doDebug) {
    this.specificGameType = gameType;
    this.paused = false;
    this.unrunTicks = 0;
    
    this.ai = game.ai.getInstance();
    this.animation = new game.ui.animation(this);
    
    // Initialize the world
    this.world = new game.world(this, worldSize, gravity);
    
    // Initialize the display
    this.viewport = new game.ui.viewport(this, gameContainerID, viewportScale, viewportSize, doDebug);
};

game.game.MAX_START_DELAY = 5 /* seconds */ * 1000 /* milliseconds */;

game.game.prototype.startWhenReady = function() {
    if (this.initialStartTime === null) {
        this.initialStartTime = new Date();
    }
    var pastMaxDelay = (new Date() - this.initialStartTime) >= game.game.MAX_START_DELAY;
    if (game.ui.imagesLoading() && !pastMaxDelay) {
        var self = this;
        setTimeout(function(){ self.startWhenReady(); }, 50);
    } else {
        if (pastMaxDelay) {
            alert("It appears to be taking a long time to load the game's images. You may experience some invisible objects until they finish loading, but the game will now start.");
        }
        this.start();
    }
};

game.game.prototype.update = function(time, tick) {
    if (this.paused) {
        this.unrunTicks = 0;
        this.viewport.showPaused();
        if (this.specificGameType.whilePaused) {
            this.specificGameType.whilePaused(time, tick);
        }
    } else {
        if (this.specificGameType.preThink) {
            this.specificGameType.preThink(time, tick);
        }
        this.ai.think(time, tick);
        
        this.unrunTicks += tick;
        var execTime = time - this.unrunTicks;
        var execTick = game.game.TICK_STEP;
        while(this.unrunTicks >= execTick) {
            this.unrunTicks -= execTick;
            execTime += execTick;
            
            if (this.specificGameType.preUpdate) {
                this.specificGameType.preUpdate(execTime, execTick);
            }
            this.world.update(execTime, execTick);
        }
        
        if (this.specificGameType.preDraw) {
            this.specificGameType.preDraw(time, tick);
        }
        this.viewport.hidePaused();
        this.viewport.draw(time, tick);
    }
};

game.game.prototype.start = function() {
    this.viewport.hideLoading();
    game.game.addGame(this);
    game.game.run();
};

game.game.prototype.togglePause = function() {
    this.paused = !this.paused;
};

game.game.prototype.pause = function() {
    this.paused = true;
};

game.game.prototype.resume = function() {
    this.paused = false;
};

game.game.prototype.getAIManager = function() {
    return this.ai;
};

game.game.prototype.getAnimationManager = function() {
    return this.animation;
};

game.game.prototype.getViewport = function() {
    return this.viewport;
};

game.game.prototype.getWorld = function() {
    return this.world;
};


// Statics

game.game.TICK_STEP = 0.015; // About 62.5 steps per second

game.game.isRunning = false;
game.game.games = [];
game.game.rollingFPS = 60;
game.game.lastTickTime = null;
game.game.initialStartTime = null;
game.game.fps = null;

game.game.run = function() {
    game.game.fps = document.getElementById( "fps" );
    if(!game.game.isRunning) {
        game.game.isRunning = true;
        game.game._update();
    }
};

game.game.addGame = function(g) {
    goog.array.insert(game.game.games, g);
};

game.game._update = function(time) {
    if (time == null) {
        time = new Date().getTime();
    }
    var tick = 0;
    if (game.game.lastTickTime !== null) {
        tick = (time - game.game.lastTickTime) / 1000;
    } else {
        game.game.lastTickTime = time;
    }
    if ( tick > 0 || tick > game.game.TICK_STEP ) {
        if ( game.game.fps ) {
            var instantFPS = 1 / tick;
            game.game.rollingFPS = game.game.rollingFPS * 0.99 + instantFPS * 0.01;
            game.game.fps.innerHTML = Math.round(instantFPS) + " - " + Math.round(game.game.rollingFPS);
        }
        game.game.lastTickTime = time;
        for (var i = 0; i < game.game.games.length; i++) {
            game.game.games[i].update(time, tick);
        }
        game.controls.rememberCurrentAsLastKeyState();
    }
    window.requestAnimFrame(game.game._update, document.body);
};

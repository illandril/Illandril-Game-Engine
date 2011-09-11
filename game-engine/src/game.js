goog.provide('illandril.game.game');

goog.require('illandril.game.ai');
goog.require('illandril.game.controls.keyHandler');
goog.require('illandril.game.requestAnimFrame');
goog.require('illandril.game.ui.ui');
goog.require('illandril.game.ui.viewport');
goog.require('illandril.game.ui.animation');
goog.require('illandril.game.world');
goog.require('goog.array');

/**
 * @param {!Object} gameType
 * @param {string} gameContainerID
 * @param {!Box2D.Common.Math.b2Vec2} worldSize
 * @param {!Box2D.Common.Math.b2Vec2} gravity
 * @param {!Box2D.Common.Math.b2Vec2} viewportSize
 * @param {number} viewportScale
 * @param {boolean} doDebug
 * @constructor
 */
illandril.game.game = function(gameType, gameContainerID, worldSize, gravity, viewportSize, viewportScale, doDebug) {
    this.specificGameType = gameType;
    this.paused = false;
    this.unrunTicks = 0;
    
    this.ai = new illandril.game.ai();
    this.animation = new illandril.game.ui.animation(this);
    
    // Initialize the world
    this.world = new illandril.game.world(this, worldSize, gravity);
    
    // Initialize the display
    this.viewport = new illandril.game.ui.viewport(this, gameContainerID, viewportScale, viewportSize, doDebug);
};

/**
 * @const
 * @type {number}
 */
illandril.game.game.MAX_START_DELAY = 5 /* seconds */ * 1000 /* milliseconds */;

illandril.game.game.prototype.startWhenReady = function() {
    if (this.initialStartTime === null) {
        this.initialStartTime = new Date();
    }
    var pastMaxDelay = (new Date() - this.initialStartTime) >= illandril.game.game.MAX_START_DELAY;
    if (illandril.game.ui.ui.imagesLoading() && !pastMaxDelay) {
        var self = this;
        setTimeout(function(){ self.startWhenReady(); }, 50);
    } else {
        if (pastMaxDelay) {
            alert("It appears to be taking a long time to load the game's images. You may experience some invisible objects until they finish loading, but the game will now start.");
        }
        this.start();
    }
};

illandril.game.game.prototype.update = function(time, tick) {
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
        var execTick = illandril.game.game.TICK_STEP;
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

illandril.game.game.prototype.start = function() {
    this.viewport.hideLoading();
    illandril.game.game.addGame(this);
    illandril.game.game.run();
};

illandril.game.game.prototype.togglePause = function() {
    this.paused = !this.paused;
};

illandril.game.game.prototype.pause = function() {
    this.paused = true;
};

illandril.game.game.prototype.resume = function() {
    this.paused = false;
};

illandril.game.game.prototype.getAIManager = function() {
    return this.ai;
};

illandril.game.game.prototype.getAnimationManager = function() {
    return this.animation;
};

illandril.game.game.prototype.getViewport = function() {
    return this.viewport;
};

illandril.game.game.prototype.getWorld = function() {
    return this.world;
};


// Statics
/**
 * @const
 * @type {number}
 */
illandril.game.game.TICK_STEP = 0.015; // About 62.5 steps per second

/**
 * @const
 * @type {number}
 */
illandril.game.game.MAX_TICK = 0.2; // About 5 FPS

/**
 * @type {boolean}
 */
illandril.game.game.isRunning = false;

/**
 * @type {Array.<illandril.game.game>}
 */
illandril.game.game.games = [];

/**
 * @type {number}
 */
illandril.game.game.rollingFPS = 60;

/**
 * @type {?number}
 */
illandril.game.game.lastTickTime = null;

/**
 * @type {?number}
 */
illandril.game.game.initialStartTime = null;

illandril.game.game.fps = null;

illandril.game.game.run = function() {
    if(!illandril.game.game.isRunning) {
        illandril.game.game.fps = document.getElementById( "fps" );
        illandril.game.game.isRunning = true;
        illandril.game.game._update();
    }
};

/**
 * @param {!illandril.game.game} g
 */
illandril.game.game.addGame = function(g) {
    goog.array.insert(illandril.game.game.games, g);
};

/**
 * @param {?number} time Current time in milliseconds
 */
illandril.game.game._update = function(time) {
    if (time == null) {
        time = new Date().getTime();
    }
    var tick = 0;
    if (illandril.game.game.lastTickTime !== null) {
        tick = (time - illandril.game.game.lastTickTime) / 1000;
    } else {
        illandril.game.game.lastTickTime = time;
    }
    if ( tick > 0 ) {
        // Stop things from going crazy after losing focus from the page for a while
        if ( tick > illandril.game.game.MAX_TICK ) {
            tick = illandril.game.game.MAX_TICK; 
        }
        if ( illandril.game.game.fps ) {
            var instantFPS = 1 / tick;
            illandril.game.game.rollingFPS = illandril.game.game.rollingFPS * 0.99 + instantFPS * 0.01;
            illandril.game.game.fps.innerHTML = Math.round(instantFPS) + " - " + Math.round(illandril.game.game.rollingFPS);
        }
        illandril.game.game.lastTickTime = time;
        for (var i = 0; i < illandril.game.game.games.length; i++) {
            illandril.game.game.games[i].update(time, tick);
        }
        illandril.game.controls.keyHandler.rememberCurrentAsLastKeyState();
    }
    illandril.game.requestAnimFrame(illandril.game.game._update, document.body);
};


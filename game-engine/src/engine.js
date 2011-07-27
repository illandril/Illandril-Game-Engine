goog.provide('game');

goog.require('Box2D');

goog.require('game.ai');
goog.require('game.world');
goog.require('game.ui');

// requestAnim shim layer by Paul Irish
window.requestAnimFrame = (function(){
      return  window.requestAnimationFrame       || 
              window.webkitRequestAnimationFrame || 
              window.mozRequestAnimationFrame    || 
              window.oRequestAnimationFrame      || 
              window.msRequestAnimationFrame     || 
              function(/* function */ callback, /* DOMElement */ element){
                window.setTimeout(callback, 1000 / 60);
              };
    })();


game = game || {};

// TODO Move as configuration options for init call
var viewportWidth = 600; // Pixels
var viewportHeight = 400; // Pixels
var worldWidth = 60; // Meters
var worldHeight = 30; // Meters
var frameSteps = 10;
var scale = 20.0; // Pixels per Meter
var testObjects = 0;

// TODO Find a better place for these
var PI = 3.14159265;
var HALF_PI = 1.57079633;

(function(game){
    
    var fps = 0;
    var frames = 0;
    var rollingFPS = 60;
    var lastTickTime = 0;
    
    var specificGameType = null;
    
    game.init = function(gameType, gameContainerID, doDebug) {
        specificGameType = gameType;
        
        fps = document.getElementById( "fps" );
        
        // Initialize the world
        game.world.init(worldWidth, worldHeight);
        
        // Initialize the display
        game.ui.initDisplay(gameContainerID, scale, viewportWidth, viewportHeight, doDebug);
    };
    
    game.start = function() {
        window.requestAnimFrame(update, game.ui.getDisplayDOMObject());
    };
    
    var update = function(time) {
        if (time == null) {
            time = new Date().getTime();
        }
        var tick = 0;
        if (lastTickTime != 0) {
            tick = (time - lastTickTime) / 1000;
        } else {
            lastTickTime = time;
        }
        // Clamp the frame rate to minimize Box2D discrepencies
        if ( tick > 0.015 ) { // Max FPS: 66.66
            if ( tick > 0.04 ) { // Min FPS: 25
                tick = 0.04;
            }
            if ( fps ) {
                var instantFPS = 1 / tick;
                rollingFPS = rollingFPS * 0.99 + instantFPS * 0.01;
                fps.innerHTML = Math.round(instantFPS) + " - " + Math.round(rollingFPS);
                frames++;
            }
            lastTickTime = time;
            
            if (specificGameType.preThink) { specificGameType.preThink(time, tick); }
            game.ai.think(time, tick);
            if (specificGameType.preUpdate) { specificGameType.preUpdate(time, tick); }
            game.world.update(time, tick);
            if (specificGameType.preDraw) { specificGameType.preDraw(time, tick); }
            game.ui.draw(time, tick);
        }
        window.requestAnimFrame(update, game.ui.getDisplayDOMObject());
    };
})(game);

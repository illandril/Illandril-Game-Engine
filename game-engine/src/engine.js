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

(function(game){
    
    var fps = 0;
    var rollingFPS = 60;
    var lastTickTime = 0;
    
    var specificGameType = null;
    
    game.init = function(gameType, gameContainerID, worldSize, gravity, viewportSize, viewportScale, doDebug) {
        specificGameType = gameType;
        
        fps = document.getElementById( "fps" );
        
        // Initialize the world
        game.world.init(worldSize, gravity);
        
        // Initialize the display
        game.ui.initDisplay(gameContainerID, viewportScale, viewportSize, doDebug);
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
            if ( fps ) {
                var instantFPS = 1 / tick;
                rollingFPS = rollingFPS * 0.99 + instantFPS * 0.01;
                fps.innerHTML = Math.round(instantFPS) + " - " + Math.round(rollingFPS);
            }
            if ( tick > 0.04 ) { // Min effective FPS: 25
                tick = 0.04;
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

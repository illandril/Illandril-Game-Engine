goog.provide('robo');

goog.require('Box2D.Common.Math.b2Vec2');
goog.require('Box2D.Collision.Shapes.b2CircleShape');
goog.require('Box2D.Collision.Shapes.b2PolygonShape');
goog.require('Box2D.Dynamics.Joints.b2DistanceJointDef');
goog.require('Box2D.Dynamics.Joints.b2GearJointDef');
goog.require('Box2D.Dynamics.Joints.b2LineJointDef');
goog.require('Box2D.Dynamics.Joints.b2MouseJointDef');
goog.require('Box2D.Dynamics.Joints.b2PrismaticJointDef');
goog.require('Box2D.Dynamics.Joints.b2RevoluteJointDef');
goog.require('Box2D.Dynamics.Joints.b2WeldJointDef');
goog.require('Box2D.Dynamics.Joints.b2PulleyJointDef');

goog.require('goog.events.KeyCodes');

goog.require('illandril.game.game');
goog.require('illandril.game.platformer');
goog.require('illandril.game.controls.keyHandler');
goog.require('illandril.game.controls.action');

(function(test){

var player = null;
var player2 = null;

var worldSize = Box2D.Common.Math.b2Vec2.Get(50, 30); // Meters
var viewportSize = Box2D.Common.Math.b2Vec2.Get(1000, 600); // Pixels
var viewportScale = 20; // Pixels per Meter
var spawn = Box2D.Common.Math.b2Vec2.Get(6, worldSize.y - 5);
var playerControls;
var gameControls;
var g;
var p;

test.init = function(gameContainerID, doDebug) {
    g = new illandril.game.game(test, gameContainerID, worldSize, illandril.game.platformer.DEFAULTS.GRAVITY, viewportSize, viewportScale, doDebug);
    p = new illandril.game.platformer(g);
    
    gameControls = new illandril.game.controls.keyHandler("game");
    var pauseAction = new illandril.game.controls.action(function(){ g.togglePause(); }, "Pause", false /* executeOnRepeat */);
    gameControls.registerAction(pauseAction, goog.events.KeyCodes.P, false, false, false);
    
    playerControls = new illandril.game.controls.keyHandler("player");
    
    var makePlayer1Action = new illandril.game.controls.action(function() {
        playerControls.unregisterAction(makePlayer1Action);
        player = test.createPlayer(true /* wasd */);
    }, "Play WASD", false /* executeOnRepeat */ );
    playerControls.registerAction(makePlayer1Action, goog.events.KeyCodes.W, false, false, false);
    
    var makePlayer2Action = new illandril.game.controls.action(function() {
        playerControls.unregisterAction(makePlayer2Action);
        player2 = test.createPlayer(false/* wasd */);
    }, "Play Arrows", false /* executeOnRepeat */ );
    playerControls.registerAction(makePlayer2Action, goog.events.KeyCodes.UP, false, false, false);

    //test.createPlayer(position, wasd);
    test.createBridge(g, p, worldSize.y - 1);
    
    g.startWhenReady();
};

test.createPlayer = function(wasd) {
    var position = spawn;
    if ( player !== null ) {
        position = player.body.GetWorldCenter();
    } else if ( player2 !== null ) {
        position = player2.body.GetWorldCenter();
    }
    var sprite = '../external-resources/graphics/urbansquall_tileset/characters/princess_AP.png';
    var spriteOffset = Box2D.Common.Math.b2Vec2.Get(0, 0);
    var frames = 4;
    var frameSpeed = 4;
    var frameSize = Box2D.Common.Math.b2Vec2.Get(21, 47);
    var size = Box2D.Common.Math.b2Vec2.Get(frameSize.x / 20, frameSize.y / 20);
    var thisPlayer = p.createRoboPlayer(size, position);
    
    
    playerControls.registerAction(thisPlayer.actions.moveUp, wasd ? goog.events.KeyCodes.W : goog.events.KeyCodes.UP, false, false, false);
    playerControls.registerAction(thisPlayer.actions.moveLeft, wasd ? goog.events.KeyCodes.A : goog.events.KeyCodes.LEFT, false, false, false);
    playerControls.registerAction(thisPlayer.actions.moveDown, wasd ? goog.events.KeyCodes.S : goog.events.KeyCodes.DOWN, false, false, false);
    playerControls.registerAction(thisPlayer.actions.moveRight, wasd ? goog.events.KeyCodes.D : goog.events.KeyCodes.RIGHT, false, false, false);
    return thisPlayer;
};

test.createBridge = function(g, p, y) {
    g.getWorld().createStaticBox(Box2D.Common.Math.b2Vec2.Get( worldSize.x, 1 ), Box2D.Common.Math.b2Vec2.Get( worldSize.x / 2, y ), true /* visible */);
};

test.whilePaused = function(time, tick) {
    gameControls.handleKeyEvents(time, tick);
};

test.preThink = function(time, tick) {
    gameControls.handleKeyEvents(time, tick);
    playerControls.handleKeyEvents(time, tick);
};

//test.preUpdate = function(time, tick) {};
test.preDraw = function(time, tick) {
    if ( player !== null ) {
        g.getViewport().lookAt(player.body.GetWorldCenter());
    } else if ( player2 !== null ) {
        g.getViewport().lookAt(player2.body.GetWorldCenter());
    } else {
        g.getViewport().lookAt(spawn);
    }
};

})(robo);

goog.exportSymbol('robo.init', robo.init);

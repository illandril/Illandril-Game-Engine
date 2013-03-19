goog.provide('pit');

goog.require('Box2D.Common.Math.b2Vec2');
goog.require('Box2D.Collision.Shapes.b2CircleShape');

goog.require('illandril.game.game');
goog.require('illandril.game.platformer');
goog.require('illandril.game.controls.keyHandler');
goog.require('illandril.game.controls.action');
goog.require('goog.events.KeyCodes');

(function(test){

var player;
var ramp;
var testObjects = 0;
var worldSize = Box2D.Common.Math.b2Vec2.Get(5, 10); // Meters
var viewportSize = Box2D.Common.Math.b2Vec2.Get(100, 200); // Pixels
var viewportScale = 20; // Pixels per Meter
var addBallPit = true;

var playerControls;
var gameControls;
var g;
var p;

test.init = function(gameContainerID, doDebug, wasd) {
    g = new illandril.game.game(test, gameContainerID, worldSize, illandril.game.platformer.DEFAULTS.GRAVITY, viewportSize, viewportScale, doDebug);
    p = new illandril.game.platformer(g);
    var position = Box2D.Common.Math.b2Vec2.Get(2, 2);
    test.createWorld();
    test.createPlayer(position, wasd);
    g.startWhenReady();
};

test.createPlayer = function(position, wasd) {
    var sprite = '../external-resources/graphics/urbansquall_tileset/characters/princess_AP.png';
    var spriteOffset = Box2D.Common.Math.b2Vec2.Get(0, 0);
    var frames = 4;
    var frameSpeed = 4;
    var frameSize = Box2D.Common.Math.b2Vec2.Get(21, 47);
    var size = Box2D.Common.Math.b2Vec2.Get(frameSize.x / viewportScale, frameSize.y / viewportScale);
    player = p.createPlayer(size, position);
    g.getAnimationManager().setAsFourDirectionalAnimation(player, size, sprite, spriteOffset, frameSize, frames, frameSpeed);
    
    gameControls = new illandril.game.controls.keyHandler("game");
    var pauseAction = new illandril.game.controls.action(function(){ g.togglePause(); }, "Pause", false /* executeOnRepeat */);
    gameControls.registerAction(pauseAction, goog.events.KeyCodes.P, false, false, false);
    
    playerControls = new illandril.game.controls.keyHandler("player");
    playerControls.registerAction(player.actions.moveUp, wasd ? goog.events.KeyCodes.W : goog.events.KeyCodes.UP, false, false, false);
    playerControls.registerAction(player.actions.moveLeft, wasd ? goog.events.KeyCodes.A : goog.events.KeyCodes.LEFT, false, false, false);
    playerControls.registerAction(player.actions.moveDown, wasd ? goog.events.KeyCodes.S : goog.events.KeyCodes.DOWN, false, false, false);
    playerControls.registerAction(player.actions.moveRight, wasd ? goog.events.KeyCodes.D : goog.events.KeyCodes.RIGHT, false, false, false);
};

test.createWorld = function() {
    var platformSize = Box2D.Common.Math.b2Vec2.Get(3, 0.25);
    p.createBlock(Box2D.Common.Math.b2Vec2.Get(worldSize.x, 0.5), Box2D.Common.Math.b2Vec2.Get((worldSize.x/2), worldSize.y-0.25));
    test.createBallPit(Box2D.Common.Math.b2Vec2.Get(worldSize.x , 6), Box2D.Common.Math.b2Vec2.Get(0, worldSize.y-0.25));
};

test.createBallPit = function(size, bottomLeft) {
    // Bottom assumed to already exist
    
    // Ramp
    var rampWidth = 0; //size.y * 3; //size.y;
    var rampLength = Math.sqrt(rampWidth * rampWidth + size.y * size.y);
    //g.getWorld().createStaticBox(Box2D.Common.Math.b2Vec2.Get(0.25, rampLength), Box2D.Common.Math.b2Vec2.Get(bottomLeft.x + rampWidth / 2, bottomLeft.y - size.y / 2), true /* visible */, { angle: Math.atan(rampWidth / size.y)/* Math.PI / (4 / (rampWidth/size.y))*/ }, null );
    
    // Left wall
    g.getWorld().createStaticBox(Box2D.Common.Math.b2Vec2.Get(0.25, size.y), Box2D.Common.Math.b2Vec2.Get(bottomLeft.x + rampWidth, bottomLeft.y - size.y / 2), true /* visible */, null, null );
    
    // Right wall
    g.getWorld().createStaticBox(Box2D.Common.Math.b2Vec2.Get(0.25, size.y), Box2D.Common.Math.b2Vec2.Get(bottomLeft.x + size.x - 0.125, bottomLeft.y - size.y / 2), true /* visible */, null, null );
    
    var radius = 0.15;
    var shape = new Box2D.Collision.Shapes.b2CircleShape(radius);
    var cnt = 0;
    for(var x = rampWidth + radius; x < size.x - radius; x += radius * 2) {
        for(var y = 0; y < size.y / 2; y+= radius * 2) { // half full
            var ballArgs = {
                fixtureArgs: { density: 0.1, restitution: 0.1, friction: 0.1 }
            };
            var ball = g.getWorld().createObject(Box2D.Common.Math.b2Vec2.Get(radius * 2, radius * 2), Box2D.Common.Math.b2Vec2.Get(bottomLeft.x + x - (cnt++ % 2) * radius, bottomLeft.y - y), true /* visible */, shape, ballArgs);
            var color = Math.random();
            if (color <= 0.25) {
                g.getViewport().setImage(ball, 'graphics/ball-red.png');
            } else if (color <= 0.5) {
                g.getViewport().setImage(ball, 'graphics/ball-green.png');
            } else if (color <= 0.75) {
                g.getViewport().setImage(ball, 'graphics/ball-yellow.png');
            } else {
                g.getViewport().setImage(ball, 'graphics/ball-blue.png');
            }
        }
    }
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
    g.getViewport().lookAt(player.body.GetWorldCenter());
};

})(pit);

goog.exportSymbol('pit.init', pit.init);

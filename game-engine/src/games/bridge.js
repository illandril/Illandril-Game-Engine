goog.provide('bridge');

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

var player;

var worldSize = new Box2D.Common.Math.b2Vec2(350, 30); // Meters
var viewportSize = new Box2D.Common.Math.b2Vec2(1000, 300); // Pixels
var viewportScale = 20; // Pixels per Meter

var playerControls;
var gameControls;
var g;
var p;

test.init = function(gameContainerID, doDebug, wasd) {
    g = new illandril.game.game(test, gameContainerID, worldSize, illandril.game.platformer.DEFAULTS.GRAVITY, viewportSize, viewportScale, doDebug);
    p = new illandril.game.platformer(g);
    var position = new Box2D.Common.Math.b2Vec2(5, worldSize.y - 15);
    test.createPlayer(position, wasd);
    test.createBridge(g, p, new Box2D.Common.Math.b2Vec2(5, worldSize.y), position);
    
    g.startWhenReady();
};

test.createPlayer = function(position, wasd) {
    var sprite = '../external-resources/graphics/urbansquall_tileset/characters/princess_AP.png';
    var spriteOffset = new Box2D.Common.Math.b2Vec2(0, 0);
    var frames = 4;
    var frameSpeed = 4;
    var frameSize = new Box2D.Common.Math.b2Vec2(21, 47);
    var size = new Box2D.Common.Math.b2Vec2(frameSize.x / 20, frameSize.y / 20);
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

test.createBridge = function(g, p, offset) {
    var position = offset.Copy();
    position.y -= 10;
    var panelSize = new Box2D.Common.Math.b2Vec2(2.5, 0.1);
    var panelSpacing = 0.5;
    var panels = 30;
    var lastPanel = null;
    for (var i = 0; i < panels; i++) {
        position.x += panelSize.x / 2;
        var thisPanel;
        if (i != 0 && i != panels - 1) {
            thisPanel = g.getWorld().createBox(panelSize, position, true /* visible */);
        } else {
            thisPanel = g.getWorld().createStaticBox(panelSize, position, true /* visible */);
        }
        if (lastPanel != null) {
            var jointDef = new Box2D.Dynamics.Joints.b2RevoluteJointDef();
            var center = Box2D.Common.Math.b2Math.AddVV(lastPanel.body.GetWorldCenter(), thisPanel.body.GetWorldCenter() );
            center.Multiply(0.5);
            jointDef.Initialize(lastPanel.body, thisPanel.body, center);
            g.getWorld().getBox2DWorld().CreateJoint(jointDef);
        }
        lastPanel = thisPanel;
        position.x += panelSize.x / 2;
        position.x += panelSpacing;
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

})(bridge);

goog.exportSymbol('bridge.init', bridge.init);

goog.provide('mario');

goog.require('game.game');
goog.require('game.platformer');
goog.require('game.controls');
goog.require('game.controls.action');
goog.require('goog.events.KeyCodes');

(function(test){

var player;
var ramp;

var testObjects = 0;
var worldSize = new Box2D.Common.Math.b2Vec2(600, 30); // Meters
var viewportSize = new Box2D.Common.Math.b2Vec2(600, 300); // Pixels
var viewportScale = 20; // Pixels per Meter
var addBallPit = false;

var playerControls;
var gameControls;
var g;
var p;

test.init = function(gameContainerID, doDebug, wasd) {
    g = new game.game(test, gameContainerID, worldSize, game.platformer.DEFAULTS.GRAVITY, viewportSize, viewportScale, doDebug);
    p = new game.platformer(g);
    var position = new Box2D.Common.Math.b2Vec2(5, worldSize.y - 7);
    test.createPlayer(position, wasd);
    test.createMario(new Box2D.Common.Math.b2Vec2(0, worldSize.y - 5));
    g.startWhenReady();
};

test.createPlayer = function(position, wasd) {
    var sprite = '../external-resources/graphics/urbansquall_tileset/characters/princess_AP.png';
    var spriteOffset = new Box2D.Common.Math.b2Vec2(0, 0);
    var frames = 4;
    var frameSpeed = 4;
    var frameSize = new Box2D.Common.Math.b2Vec2(21, 47);
    var size = new Box2D.Common.Math.b2Vec2(frameSize.x / viewportScale, frameSize.y / viewportScale);
    player = p.createPlayer(size, position);
    g.getAnimationManager().setAsFourDirectionalAnimation(player, size, sprite, spriteOffset, frameSize, frames, frameSpeed);
    
    gameControls = new game.controls("game");
    var pauseAction = new game.controls.action(function(){ g.togglePause(); }, "Pause", false /* executeOnRepeat */);
    gameControls.registerAction(pauseAction, goog.events.KeyCodes.P, false, false, false);
    
    playerControls = new game.controls("player");
    playerControls.registerAction(player.actions.moveUp, wasd ? goog.events.KeyCodes.W : goog.events.KeyCodes.UP, false, false, false);
    playerControls.registerAction(player.actions.moveLeft, wasd ? goog.events.KeyCodes.A : goog.events.KeyCodes.LEFT, false, false, false);
    playerControls.registerAction(player.actions.moveDown, wasd ? goog.events.KeyCodes.S : goog.events.KeyCodes.DOWN, false, false, false);
    playerControls.registerAction(player.actions.moveRight, wasd ? goog.events.KeyCodes.D : goog.events.KeyCodes.RIGHT, false, false, false);
};

test.createMario = function(offset) {
    var marioSheet = 'graphics/smbsheet.gif';
    var offsets = {
        floor: new Box2D.Common.Math.b2Vec2(0,454),
        block: new Box2D.Common.Math.b2Vec2(178,326),
        coin: new Box2D.Common.Math.b2Vec2(354,54),
        coinBlock: new Box2D.Common.Math.b2Vec2(178,326),
        shroom: new Box2D.Common.Math.b2Vec2(354,54),
        hiddenStar: new Box2D.Common.Math.b2Vec2(32,84),
        hidden1up: new Box2D.Common.Math.b2Vec2(32,84),
        pipeL: new Box2D.Common.Math.b2Vec2(158,388),
        pipeR: new Box2D.Common.Math.b2Vec2(190,388),
        pipeLT: new Box2D.Common.Math.b2Vec2(158,356),
        pipeRT: new Box2D.Common.Math.b2Vec2(190,356),
        pipeLTD: new Box2D.Common.Math.b2Vec2(158,356),
        pipeRTD: new Box2D.Common.Math.b2Vec2(190,356)
    };

    var tileSize = new Box2D.Common.Math.b2Vec2(1.6, 1.6);
    var start = new Box2D.Common.Math.b2Vec2(offset.x + tileSize.x / 2, offset.y + tileSize.y / 2);
    //http://ian-albert.com/games/super_mario_bros_maps/mario-1-1.gif
    var obj = p.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x, start.y));
    g.getViewport().setImage(obj, marioSheet, offsets.floor);
    obj = p.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x, start.y));
    g.getViewport().setImage(obj, marioSheet, offsets.floor);
    obj = p.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 2, start.y));
    g.getViewport().setImage(obj, marioSheet, offsets.floor);
    obj = p.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 3, start.y));
    g.getViewport().setImage(obj, marioSheet, offsets.floor);
    obj = p.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 4, start.y));
    g.getViewport().setImage(obj, marioSheet, offsets.floor);
    obj = p.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 5, start.y));
    g.getViewport().setImage(obj, marioSheet, offsets.floor);
    obj = p.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 6, start.y));
    g.getViewport().setImage(obj, marioSheet, offsets.floor);
    obj = p.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 7, start.y));
    g.getViewport().setImage(obj, marioSheet, offsets.floor);
    obj = p.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 8, start.y));
    g.getViewport().setImage(obj, marioSheet, offsets.floor);
    obj = p.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 9, start.y));
    g.getViewport().setImage(obj, marioSheet, offsets.floor);
    obj = p.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 10, start.y));
    g.getViewport().setImage(obj, marioSheet, offsets.floor);
    obj = p.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 11, start.y));
    g.getViewport().setImage(obj, marioSheet, offsets.floor);
    obj = p.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 12, start.y));
    g.getViewport().setImage(obj, marioSheet, offsets.floor);
    obj = p.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 13, start.y));
    g.getViewport().setImage(obj, marioSheet, offsets.floor);
    obj = p.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 14, start.y));
    g.getViewport().setImage(obj, marioSheet, offsets.floor);
    obj = p.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 15, start.y));
    g.getViewport().setImage(obj, marioSheet, offsets.floor);
    obj = p.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 16, start.y));
    g.getViewport().setImage(obj, marioSheet, offsets.floor);
    obj = p.createBreakableBlock(tileSize,  new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 16, start.y - tileSize.y * 4));
    g.getViewport().setImage(obj, marioSheet, offsets.coin);
    obj = p.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 17, start.y));
    g.getViewport().setImage(obj, marioSheet, offsets.floor);
    obj = p.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 18, start.y));
    g.getViewport().setImage(obj, marioSheet, offsets.floor);
    obj = p.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 19, start.y));
    g.getViewport().setImage(obj, marioSheet, offsets.floor);
    obj = p.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 20, start.y));
    g.getViewport().setImage(obj, marioSheet, offsets.floor);
    obj = p.createBreakableBlock(tileSize,  new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 20, start.y - tileSize.y * 4));
    g.getViewport().setImage(obj, marioSheet, offsets.block);
    obj = p.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 21, start.y));
    g.getViewport().setImage(obj, marioSheet, offsets.floor);
    obj = p.createBreakableBlock(tileSize,  new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 21, start.y - tileSize.y * 4));
    g.getViewport().setImage(obj, marioSheet, offsets.shroom);
    obj = p.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 22, start.y));
    g.getViewport().setImage(obj, marioSheet, offsets.floor);
    obj = p.createBreakableBlock(tileSize,  new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 22, start.y - tileSize.y * 4));
    g.getViewport().setImage(obj, marioSheet, offsets.block);
    obj = p.createBreakableBlock(tileSize,  new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 22, start.y - tileSize.y * 8));
    g.getViewport().setImage(obj, marioSheet, offsets.coin);
    obj = p.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 23, start.y));
    g.getViewport().setImage(obj, marioSheet, offsets.floor);
    obj = p.createBreakableBlock(tileSize,  new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 23, start.y - tileSize.y * 4));
    g.getViewport().setImage(obj, marioSheet, offsets.coin);
    obj = p.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 24, start.y));
    g.getViewport().setImage(obj, marioSheet, offsets.floor);
    obj = p.createBreakableBlock(tileSize,  new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 24, start.y - tileSize.y * 4));
    g.getViewport().setImage(obj, marioSheet, offsets.block);
    obj = p.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 25, start.y));
    g.getViewport().setImage(obj, marioSheet, offsets.floor);
    obj = p.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 26, start.y));
    g.getViewport().setImage(obj, marioSheet, offsets.floor);
    obj = p.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 27, start.y));
    g.getViewport().setImage(obj, marioSheet, offsets.floor);
    // goomba
    obj = p.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 28, start.y));
    g.getViewport().setImage(obj, marioSheet, offsets.floor);
    obj = p.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 28, start.y - tileSize.y * 1));
    g.getViewport().setImage(obj, marioSheet, offsets.pipeL);
    obj = p.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 28, start.y - tileSize.y * 2));
    g.getViewport().setImage(obj, marioSheet, offsets.pipeLT);
    obj = p.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 29, start.y));
    g.getViewport().setImage(obj, marioSheet, offsets.floor);
    obj = p.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 29, start.y - tileSize.y * 1));
    g.getViewport().setImage(obj, marioSheet, offsets.pipeR);
    obj = p.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 29, start.y - tileSize.y * 2));
    g.getViewport().setImage(obj, marioSheet, offsets.pipeRT);
    obj = p.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 30, start.y));
    g.getViewport().setImage(obj, marioSheet, offsets.floor);
    obj = p.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 31, start.y));
    g.getViewport().setImage(obj, marioSheet, offsets.floor);
    obj = p.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 32, start.y));
    g.getViewport().setImage(obj, marioSheet, offsets.floor);
    obj = p.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 33, start.y));
    g.getViewport().setImage(obj, marioSheet, offsets.floor);
    obj = p.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 34, start.y));
    g.getViewport().setImage(obj, marioSheet, offsets.floor);
    obj = p.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 35, start.y));
    g.getViewport().setImage(obj, marioSheet, offsets.floor);
    obj = p.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 36, start.y));
    g.getViewport().setImage(obj, marioSheet, offsets.floor);
    obj = p.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 37, start.y));
    g.getViewport().setImage(obj, marioSheet, offsets.floor);
    obj = p.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 38, start.y));
    g.getViewport().setImage(obj, marioSheet, offsets.floor);
    obj = p.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 38, start.y - tileSize.y * 1));
    g.getViewport().setImage(obj, marioSheet, offsets.pipeL);
    obj = p.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 38, start.y - tileSize.y * 2));
    g.getViewport().setImage(obj, marioSheet, offsets.pipeL);
    obj = p.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 38, start.y - tileSize.y * 3));
    g.getViewport().setImage(obj, marioSheet, offsets.pipeLT);
    obj = p.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 39, start.y));
    g.getViewport().setImage(obj, marioSheet, offsets.floor);
    obj = p.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 39, start.y - tileSize.y * 1));
    g.getViewport().setImage(obj, marioSheet, offsets.pipeR);
    obj = p.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 39, start.y - tileSize.y * 2));
    g.getViewport().setImage(obj, marioSheet, offsets.pipeR);
    obj = p.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 39, start.y - tileSize.y * 3));
    g.getViewport().setImage(obj, marioSheet, offsets.pipeRT);
    obj = p.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 40, start.y));
    g.getViewport().setImage(obj, marioSheet, offsets.floor);
    // goomba
    obj = p.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 41, start.y));
    g.getViewport().setImage(obj, marioSheet, offsets.floor);
    obj = p.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 42, start.y));
    g.getViewport().setImage(obj, marioSheet, offsets.floor);
    obj = p.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 43, start.y));
    g.getViewport().setImage(obj, marioSheet, offsets.floor);
    obj = p.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 44, start.y));
    g.getViewport().setImage(obj, marioSheet, offsets.floor);
    obj = p.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 45, start.y));
    g.getViewport().setImage(obj, marioSheet, offsets.floor);
    obj = p.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 46, start.y));
    g.getViewport().setImage(obj, marioSheet, offsets.floor);
    obj = p.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 46, start.y - tileSize.y * 1));
    g.getViewport().setImage(obj, marioSheet, offsets.pipeL);
    obj = p.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 46, start.y - tileSize.y * 2));
    g.getViewport().setImage(obj, marioSheet, offsets.pipeL);
    obj = p.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 46, start.y - tileSize.y * 3));
    g.getViewport().setImage(obj, marioSheet, offsets.pipeL);
    obj = p.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 46, start.y - tileSize.y * 4));
    g.getViewport().setImage(obj, marioSheet, offsets.pipeLT);
    obj = p.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 47, start.y));
    g.getViewport().setImage(obj, marioSheet, offsets.floor);
    obj = p.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 47, start.y - tileSize.y * 1));
    g.getViewport().setImage(obj, marioSheet, offsets.pipeR);
    obj = p.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 47, start.y - tileSize.y * 2));
    g.getViewport().setImage(obj, marioSheet, offsets.pipeR);
    obj = p.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 47, start.y - tileSize.y * 3));
    g.getViewport().setImage(obj, marioSheet, offsets.pipeR);
    obj = p.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 47, start.y - tileSize.y * 4));
    g.getViewport().setImage(obj, marioSheet, offsets.pipeRT);
    obj = p.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 48, start.y));
    g.getViewport().setImage(obj, marioSheet, offsets.floor);
    obj = p.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 49, start.y));
    g.getViewport().setImage(obj, marioSheet, offsets.floor);
    obj = p.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 50, start.y));
    g.getViewport().setImage(obj, marioSheet, offsets.floor);
    obj = p.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 51, start.y));
    g.getViewport().setImage(obj, marioSheet, offsets.floor);
    obj = p.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 52, start.y));
    g.getViewport().setImage(obj, marioSheet, offsets.floor);
    obj = p.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 53, start.y));
    g.getViewport().setImage(obj, marioSheet, offsets.floor);
    // goomba
    obj = p.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 54, start.y));
    g.getViewport().setImage(obj, marioSheet, offsets.floor);
    // goomba
    obj = p.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 55, start.y));
    g.getViewport().setImage(obj, marioSheet, offsets.floor);
    obj = p.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 56, start.y));
    g.getViewport().setImage(obj, marioSheet, offsets.floor);
    obj = p.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 57, start.y));
    g.getViewport().setImage(obj, marioSheet, offsets.floor);
    obj = p.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 57, start.y - tileSize.y * 1));
    g.getViewport().setImage(obj, marioSheet, offsets.pipeL);
    obj = p.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 57, start.y - tileSize.y * 2));
    g.getViewport().setImage(obj, marioSheet, offsets.pipeL);
    obj = p.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 57, start.y - tileSize.y * 3));
    g.getViewport().setImage(obj, marioSheet, offsets.pipeL);
    obj = p.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 57, start.y - tileSize.y * 4));
    g.getViewport().setImage(obj, marioSheet, offsets.pipeLTD);
    obj = p.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 58, start.y));
    g.getViewport().setImage(obj, marioSheet, offsets.floor);
    obj = p.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 58, start.y - tileSize.y * 1));
    g.getViewport().setImage(obj, marioSheet, offsets.pipeR);
    obj = p.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 58, start.y - tileSize.y * 2));
    g.getViewport().setImage(obj, marioSheet, offsets.pipeR);
    obj = p.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 58, start.y - tileSize.y * 3));
    g.getViewport().setImage(obj, marioSheet, offsets.pipeR);
    obj = p.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 58, start.y - tileSize.y * 4));
    g.getViewport().setImage(obj, marioSheet, offsets.pipeRTD);
    obj = p.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 59, start.y));
    g.getViewport().setImage(obj, marioSheet, offsets.floor);
    obj = p.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 60, start.y));
    g.getViewport().setImage(obj, marioSheet, offsets.floor);
    obj = p.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 61, start.y));
    g.getViewport().setImage(obj, marioSheet, offsets.floor);
    obj = p.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 62, start.y));
    g.getViewport().setImage(obj, marioSheet, offsets.floor);
    obj = p.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 63, start.y));
    g.getViewport().setImage(obj, marioSheet, offsets.floor);
    obj = p.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 64, start.y));
    g.getViewport().setImage(obj, marioSheet, offsets.floor);
    obj = p.createBreakableBlock(tileSize,  new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 64, start.y - tileSize.y * 5));
    game.platformer.initializeDirectionalSiding(obj, game.platformer.SIDES.TOP | game.platformer.SIDES.LEFT | game.platformer.SIDES.RIGHT);
    g.getViewport().setImage(obj, marioSheet, offsets.hidden1up);
    obj = p.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 65, start.y));
    g.getViewport().setImage(obj, marioSheet, offsets.floor);
    obj = p.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 66, start.y));
    g.getViewport().setImage(obj, marioSheet, offsets.floor);
    obj = p.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 67, start.y));
    g.getViewport().setImage(obj, marioSheet, offsets.floor);
    obj = p.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 68, start.y));
    g.getViewport().setImage(obj, marioSheet, offsets.floor);
    
    // gap of 2
    
    obj = p.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 71, start.y));
    g.getViewport().setImage(obj, marioSheet, offsets.floor);
    obj = p.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 72, start.y));
    g.getViewport().setImage(obj, marioSheet, offsets.floor);
    obj = p.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 73, start.y));
    g.getViewport().setImage(obj, marioSheet, offsets.floor);
    obj = p.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 74, start.y));
    g.getViewport().setImage(obj, marioSheet, offsets.floor);
    obj = p.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 75, start.y));
    g.getViewport().setImage(obj, marioSheet, offsets.floor);
    obj = p.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 76, start.y));
    g.getViewport().setImage(obj, marioSheet, offsets.floor);
    obj = p.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 77, start.y));
    g.getViewport().setImage(obj, marioSheet, offsets.floor);
    obj = p.createBreakableBlock(tileSize,  new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 77, start.y - tileSize.y * 4));
    g.getViewport().setImage(obj, marioSheet, offsets.block);
    obj = p.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 78, start.y));
    g.getViewport().setImage(obj, marioSheet, offsets.floor);
    obj = p.createBreakableBlock(tileSize,  new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 78, start.y - tileSize.y * 4));
    g.getViewport().setImage(obj, marioSheet, offsets.shroom);
    obj = p.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 79, start.y));
    g.getViewport().setImage(obj, marioSheet, offsets.floor);
    obj = p.createBreakableBlock(tileSize,  new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 79, start.y - tileSize.y * 4));
    g.getViewport().setImage(obj, marioSheet, offsets.block);
    // goomba (above block)
    obj = p.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 80, start.y));
    g.getViewport().setImage(obj, marioSheet, offsets.floor);
    obj = p.createBreakableBlock(tileSize,  new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 80, start.y - tileSize.y * 8));
    g.getViewport().setImage(obj, marioSheet, offsets.block);
    obj = p.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 81, start.y));
    g.getViewport().setImage(obj, marioSheet, offsets.floor);
    obj = p.createBreakableBlock(tileSize,  new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 81, start.y - tileSize.y * 8));
    g.getViewport().setImage(obj, marioSheet, offsets.block);
    obj = p.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 82, start.y));
    g.getViewport().setImage(obj, marioSheet, offsets.floor);
    obj = p.createBreakableBlock(tileSize,  new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 82, start.y - tileSize.y * 8));
    g.getViewport().setImage(obj, marioSheet, offsets.block);
    // goomba (above block)
    obj = p.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 83, start.y));
    g.getViewport().setImage(obj, marioSheet, offsets.floor);
    obj = p.createBreakableBlock(tileSize,  new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 83, start.y - tileSize.y * 8));
    g.getViewport().setImage(obj, marioSheet, offsets.block);
    obj = p.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 84, start.y));
    g.getViewport().setImage(obj, marioSheet, offsets.floor);
    obj = p.createBreakableBlock(tileSize,  new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 84, start.y - tileSize.y * 8));
    g.getViewport().setImage(obj, marioSheet, offsets.block);
    obj = p.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 85, start.y));
    g.getViewport().setImage(obj, marioSheet, offsets.floor);
    obj = p.createBreakableBlock(tileSize,  new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 85, start.y - tileSize.y * 8));
    g.getViewport().setImage(obj, marioSheet, offsets.block);
    obj = p.createBreakableBlock(tileSize,  new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 86, start.y - tileSize.y * 8));
    g.getViewport().setImage(obj, marioSheet, offsets.block);
    obj = p.createBreakableBlock(tileSize,  new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 87, start.y - tileSize.y * 8));
    g.getViewport().setImage(obj, marioSheet, offsets.block);
    obj = p.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 89, start.y));
    g.getViewport().setImage(obj, marioSheet, offsets.floor);
    obj = p.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 90, start.y));
    g.getViewport().setImage(obj, marioSheet, offsets.floor);
    obj = p.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 91, start.y));
    g.getViewport().setImage(obj, marioSheet, offsets.floor);
    obj = p.createBreakableBlock(tileSize,  new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 91, start.y - tileSize.y * 8));
    g.getViewport().setImage(obj, marioSheet, offsets.block);
    obj = p.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 92, start.y));
    g.getViewport().setImage(obj, marioSheet, offsets.floor);
    obj = p.createBreakableBlock(tileSize,  new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 92, start.y - tileSize.y * 8));
    g.getViewport().setImage(obj, marioSheet, offsets.block);
    obj = p.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 93, start.y));
    g.getViewport().setImage(obj, marioSheet, offsets.floor);
    obj = p.createBreakableBlock(tileSize,  new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 93, start.y - tileSize.y * 8));
    g.getViewport().setImage(obj, marioSheet, offsets.block);
    obj = p.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 94, start.y));
    g.getViewport().setImage(obj, marioSheet, offsets.floor);
    obj = p.createBreakableBlock(tileSize,  new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 94, start.y - tileSize.y * 4));
    g.getViewport().setImage(obj, marioSheet, offsets.coinBlock);
    obj = p.createBreakableBlock(tileSize,  new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 94, start.y - tileSize.y * 8));
    g.getViewport().setImage(obj, marioSheet, offsets.coin);
    obj = p.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 95, start.y));
    g.getViewport().setImage(obj, marioSheet, offsets.floor);
    // goomba
    obj = p.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 96, start.y));
    g.getViewport().setImage(obj, marioSheet, offsets.floor);
    obj = p.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 97, start.y));
    g.getViewport().setImage(obj, marioSheet, offsets.floor);
    // goomba
    obj = p.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 98, start.y));
    g.getViewport().setImage(obj, marioSheet, offsets.floor);
    obj = p.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 99, start.y));
    g.getViewport().setImage(obj, marioSheet, offsets.floor);
    obj = p.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 100, start.y));
    g.getViewport().setImage(obj, marioSheet, offsets.floor);
    obj = p.createBreakableBlock(tileSize,  new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 100, start.y - tileSize.y * 4));
    g.getViewport().setImage(obj, marioSheet, offsets.block);
    obj = p.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 101, start.y));
    g.getViewport().setImage(obj, marioSheet, offsets.floor);
    obj = p.createBreakableBlock(tileSize,  new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 101, start.y - tileSize.y * 4));
    game.platformer.initializeDirectionalSiding(obj, game.platformer.SIDES.TOP | game.platformer.SIDES.LEFT | game.platformer.SIDES.RIGHT);
    g.getViewport().setImage(obj, marioSheet, offsets.hiddenStar);
    obj = p.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 102, start.y));
    g.getViewport().setImage(obj, marioSheet, offsets.floor);
    obj = p.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 103, start.y));
    g.getViewport().setImage(obj, marioSheet, offsets.floor);
    obj = p.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 104, start.y));
    g.getViewport().setImage(obj, marioSheet, offsets.floor);
    obj = p.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 105, start.y));
    g.getViewport().setImage(obj, marioSheet, offsets.floor);
    obj = p.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 106, start.y));
    g.getViewport().setImage(obj, marioSheet, offsets.floor);
    // turtle
    obj = p.createBreakableBlock(tileSize,  new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 106, start.y - tileSize.y * 4));
    g.getViewport().setImage(obj, marioSheet, offsets.coin);
    obj = p.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 107, start.y));
    g.getViewport().setImage(obj, marioSheet, offsets.floor);
    obj = p.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 108, start.y));
    g.getViewport().setImage(obj, marioSheet, offsets.floor);
    obj = p.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 109, start.y));
    g.getViewport().setImage(obj, marioSheet, offsets.floor);
    obj = p.createBreakableBlock(tileSize,  new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 109, start.y - tileSize.y * 4));
    g.getViewport().setImage(obj, marioSheet, offsets.coin);
    obj = p.createBreakableBlock(tileSize,  new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 109, start.y - tileSize.y * 8));
    g.getViewport().setImage(obj, marioSheet, offsets.shroom);
    obj = p.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 110, start.y));
    g.getViewport().setImage(obj, marioSheet, offsets.floor);
    obj = p.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 111, start.y));
    g.getViewport().setImage(obj, marioSheet, offsets.floor);
    obj = p.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 112, start.y));
    g.getViewport().setImage(obj, marioSheet, offsets.floor);
    obj = p.createBreakableBlock(tileSize,  new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 112, start.y - tileSize.y * 4));
    g.getViewport().setImage(obj, marioSheet, offsets.coin);
    obj = p.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 113, start.y));
    g.getViewport().setImage(obj, marioSheet, offsets.floor);
    obj = p.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 114, start.y));
    g.getViewport().setImage(obj, marioSheet, offsets.floor);
    obj = p.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 115, start.y));
    g.getViewport().setImage(obj, marioSheet, offsets.floor);
    obj = p.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 116, start.y));
    g.getViewport().setImage(obj, marioSheet, offsets.floor);
    obj = p.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 117, start.y));
    g.getViewport().setImage(obj, marioSheet, offsets.floor);
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

})(mario);

goog.exportSymbol('mario.init', mario.init);

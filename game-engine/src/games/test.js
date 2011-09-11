goog.provide('test');

goog.require('Box2D.Common.Math.b2Vec2');
goog.require('Box2D.Collision.Shapes.b2CircleShape');
goog.require('Box2D.Collision.Shapes.b2PolygonShape');
goog.require('Box2D.Dynamics.Joints.b2RevoluteJointDef');
goog.require('Box2D.Dynamics.Joints.b2WeldJointDef');

goog.require('illandril.game.game');
goog.require('illandril.game.platformer');
goog.require('illandril.game.controls.keyHandler');
goog.require('illandril.game.controls.action');
goog.require('goog.events.KeyCodes');

(function(test){

var player;
var ramp;

var testObjects = 50;
var worldSize = new Box2D.Common.Math.b2Vec2(600, 80); // Meters
var viewportSize = new Box2D.Common.Math.b2Vec2(400, 300); // Pixels
var viewportScale = 20; // Pixels per Meter
var addBallPit = true;

var playerControls;
var gameControls;
var g;
var p;

test.init = function(gameContainerID, doDebug, wasd) {
    g = new illandril.game.game(test, gameContainerID, worldSize, illandril.game.platformer.DEFAULTS.GRAVITY, viewportSize, viewportScale, doDebug);
    p = new illandril.game.platformer(g);
    var position = new Box2D.Common.Math.b2Vec2(13, worldSize.y - 45);
    test.createWorld();
    test.createSpinners();
    test.createDebugObjects();
    test.createPlayer(position, wasd);
    test.createMario(new Box2D.Common.Math.b2Vec2(13, worldSize.y - 40));
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
    var platformSize = new Box2D.Common.Math.b2Vec2(3, 0.25);
    ramp = g.getWorld().createStaticBox(new Box2D.Common.Math.b2Vec2(5, 0.25),  new Box2D.Common.Math.b2Vec2(16, worldSize.y - 1.5), true /* visible */, { angle: Math.PI / 3 }, null );
    p.createPlatform(platformSize, new Box2D.Common.Math.b2Vec2(10, worldSize.y - 6));
    p.createPlatform(platformSize, new Box2D.Common.Math.b2Vec2(6, worldSize.y - 12));
    p.createPlatform(platformSize, new Box2D.Common.Math.b2Vec2(8, worldSize.y - 18));
    p.createPlatform(platformSize, new Box2D.Common.Math.b2Vec2(12, worldSize.y - 24));
    p.createPlatform(platformSize, new Box2D.Common.Math.b2Vec2(10, worldSize.y - 30));
    p.createPlatform(platformSize, new Box2D.Common.Math.b2Vec2(10, worldSize.y - 36));
    p.createBlock(new Box2D.Common.Math.b2Vec2(worldSize.x - 14, 0.5), new Box2D.Common.Math.b2Vec2((worldSize.x/2) + 7, worldSize.y - 25));
    if(addBallPit) {
        test.createBallPit(new Box2D.Common.Math.b2Vec2(10, 5), new Box2D.Common.Math.b2Vec2(20, worldSize.y - 25));
    }
};

test.createBallPit = function(size, bottomLeft) {
    // Bottom assumed to already exist
    
    // Ramp
    g.getWorld().createStaticBox(new Box2D.Common.Math.b2Vec2(0.25, Math.sqrt(size.y * size.y * 2)), new Box2D.Common.Math.b2Vec2(bottomLeft.x + size.y / 2, bottomLeft.y - size.y / 2), true /* visible */, { angle: Math.PI / 4 }, null );
    
    // Left wall
    g.getWorld().createStaticBox(new Box2D.Common.Math.b2Vec2(0.25, size.y), new Box2D.Common.Math.b2Vec2(bottomLeft.x + size.y, bottomLeft.y - size.y / 2), true /* visible */, null, null );
    
    // Right wall
    g.getWorld().createStaticBox(new Box2D.Common.Math.b2Vec2(0.25, size.y), new Box2D.Common.Math.b2Vec2(bottomLeft.x + size.x, bottomLeft.y - size.y / 2), true /* visible */, null, null );
    
    var radius = 0.15;
    var shape = new Box2D.Collision.Shapes.b2CircleShape(radius);
    for(var x = size.y + 1; x < size.x; x += radius * 2) {
        for(var y = 0; y < size.y / 2; y+= radius * 2) { // half full
            var ball = g.getWorld().createObject(new Box2D.Common.Math.b2Vec2(radius * 2, radius * 2), new Box2D.Common.Math.b2Vec2(bottomLeft.x + x + (Math.random() - 0.5)/2, bottomLeft.y - size.y), true /* visible */, shape, { fixtureArgs: { density: 0.1, restitution: 0.1, friction: 0.1 } } );
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

test.createSpinners = function() {
    // Add in the spinners
    var jointDef = new Box2D.Dynamics.Joints.b2RevoluteJointDef();
    var weldJointDef = new Box2D.Dynamics.Joints.b2WeldJointDef();
    var flip = false;
    for ( var i = 20; i <= worldSize.x - 10; i += 8 ) {
        g.getWorld().getBox2DBodyDefinition().angle = i / worldSize.x * Math.PI;
        var y = worldSize.y - 14;
        if ( flip ) {
            y = y + 8;
        }
        flip = !flip;
        var b0 = g.getWorld().createStaticBox(new Box2D.Common.Math.b2Vec2(0.1, 0.1), new Box2D.Common.Math.b2Vec2(i, y), false /* visible */);
        var b1 = g.getWorld().createBox(new Box2D.Common.Math.b2Vec2(10, 1), new Box2D.Common.Math.b2Vec2(i, y));
        g.getViewport().setImage(b1, 'graphics/spinner.png');
        illandril.game.platformer.initializeDirectionalSiding(b1, false, true, false, false);
        var b2 = g.getWorld().createBox(new Box2D.Common.Math.b2Vec2(10, 1), new Box2D.Common.Math.b2Vec2(i, y));
        b2.body.SetAngle(g.getWorld().getBox2DBodyDefinition().angle + Math.PI / 2);
        g.getViewport().setImage(b2, 'graphics/spinner.png');
        jointDef.Initialize(b0.body, b1.body, b0.body.GetWorldCenter());
        g.getWorld().getBox2DWorld().CreateJoint(jointDef);
        jointDef.Initialize(b0.body, b2.body, b0.body.GetWorldCenter());
        g.getWorld().getBox2DWorld().CreateJoint(jointDef);
        weldJointDef.Initialize(b1.body, b2.body, b1.body.GetWorldCenter());
        g.getWorld().getBox2DWorld().CreateJoint(weldJointDef);
    }
};

test.createDebugObjects = function() {
    // Debug Objects
    var bodyArgs = {
        type: Box2D.Dynamics.b2Body.b2_dynamicBody,
        fixedRotation: false
    };
    var fixArgs = {
        restitution: 2.5
    };
    var shape = new Box2D.Collision.Shapes.b2CircleShape( 0.25 )
    var size = new Box2D.Common.Math.b2Vec2(0.5, 0.5);
    for ( var i = 0; i < testObjects; i++ ) {
      var x = ( i * 5 ) % ( worldSize.x - 10 );
      var position = new Box2D.Common.Math.b2Vec2(x + ( i % 20 ) / 20 + 4.5, 15 + ( i % 20 ));
      g.getWorld().createObject(size, position, true /* visible */, shape, {bodyArgs: bodyArgs, fixtureArgs: fixArgs });
    }
    shape = new Box2D.Collision.Shapes.b2PolygonShape();
    shape.SetAsBox( 0.25, 0.25 );
    for ( var i = 0; i < testObjects; i++ ) {
      var x = ( i * 5 ) % ( worldSize.x - 10 );
      var position = new Box2D.Common.Math.b2Vec2(x + ( ( i + 5 ) % 20 ) / 20 + 4.5, 15 + ( ( i + 5 ) % 20 ));
      bodyArgs.angle = ( i % 17 ) / 17;
      g.getWorld().createObject(size, position, true /* visible */, shape, {bodyArgs: bodyArgs, fixtureArgs: fixArgs });
    }
    shape = new Box2D.Collision.Shapes.b2PolygonShape();
    shape.SetAsArray( [ new Box2D.Common.Math.b2Vec2(-0.5, -0.5), new Box2D.Common.Math.b2Vec2(0.5, -0.5), new Box2D.Common.Math.b2Vec2(-0.5,0.5)], 3 );
    for ( var i = 0; i < testObjects; i++ ) {
      var x = ( i * 5 ) % ( worldSize.x - 10 );
      var position = new Box2D.Common.Math.b2Vec2(x + ( ( i + 10 ) % 20 ) / 20 + 4.5, 15 + ( ( i + 10 ) % 20 ));
      bodyArgs.angle = ( i % 22 ) / 22;
      g.getWorld().createObject(size, position, true /* visible */, shape, {bodyArgs: bodyArgs, fixtureArgs: fixArgs });
    }
    shape = new Box2D.Collision.Shapes.b2PolygonShape();
    shape.SetAsArray( [ new Box2D.Common.Math.b2Vec2(-0.5, -0.5), new Box2D.Common.Math.b2Vec2(0, -0.5), new Box2D.Common.Math.b2Vec2(0.5,0), new Box2D.Common.Math.b2Vec2(0.5, 0.5), new Box2D.Common.Math.b2Vec2( 0, 0.3 )], 5 );
    for ( var i = 0; i < testObjects; i++ ) {
      var x = ( i * 5 ) % ( worldSize.x - 10 );
      var position = new Box2D.Common.Math.b2Vec2(x + ( ( i + 15 ) % 20 ) / 20 + 4.5, 15 + ( ( i + 15 ) % 20 ));
      bodyArgs.angle = ( i % 35 ) / 35;
      g.getWorld().createObject(size, position, true /* visible */, shape, {bodyArgs: bodyArgs, fixtureArgs: fixArgs });
    }
};

test.createMario = function(offset) {
    var marioSheet = 'graphics/smbsheet.gif';
    var offsets = {
        floor: new Box2D.Common.Math.b2Vec2(0,454),
        block: new Box2D.Common.Math.b2Vec2(178,326),
        coin: new Box2D.Common.Math.b2Vec2(354,54),
        shroom: new Box2D.Common.Math.b2Vec2(354,54),
        hiddenStar: new Box2D.Common.Math.b2Vec2(32,84),
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
    illandril.game.platformer.initializeDirectionalSiding(obj, illandril.game.platformer.SIDES.TOP | illandril.game.platformer.SIDES.LEFT | illandril.game.platformer.SIDES.RIGHT);
    g.getViewport().setImage(obj, marioSheet, offsets.hiddenStar);
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
    // goomba (above blocK)
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

})(test);

goog.exportSymbol('test.init', test.init);

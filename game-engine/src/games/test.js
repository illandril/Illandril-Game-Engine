goog.provide('test');

goog.require('game');
goog.require('game.platformer');
goog.require('game.controls');
goog.require('goog.events.KeyCodes');

var player;
var ramp;
(function(test){

var testObjects = 0;
var worldSize = new Box2D.Common.Math.b2Vec2(200, 80); // Meters
var viewportSize = new Box2D.Common.Math.b2Vec2(600, 400); // Pixels
var viewportScale = 20; // Pixels per Meter

var controls;

test.init = function(gameContainerID, doDebug) {
    game.init(test, gameContainerID, worldSize, game.platformer.DEFAULTS.GRAVITY, viewportSize, viewportScale, doDebug);
    game.platformer.init();
    var position = new Box2D.Common.Math.b2Vec2(13, worldSize.y - 45);
    test.createWorld();
    test.createSpinners();
    test.createDebugObjects();
    test.createPlayer(position);
    test.createMario(new Box2D.Common.Math.b2Vec2(13, worldSize.y - 40));
    game.start();
};

test.createPlayer = function(position) {
    var sprite = '../external-resources/graphics/urbansquall_tileset/characters/princess_AP.png';
    var spriteOffset = new Box2D.Common.Math.b2Vec2(0, 0);
    var frames = 4;
    var frameSpeed = 4;
    var frameSize = new Box2D.Common.Math.b2Vec2(21, 47);
    var size = new Box2D.Common.Math.b2Vec2(frameSize.x / viewportScale, frameSize.y / viewportScale);
    player = game.platformer.createPlayer(size, position);
    game.animations.setAsFourDirectionalAnimation(player.body, size, sprite, spriteOffset, frameSize, frames, frameSpeed );
    
    controls = new game.controls("main");
    controls.registerAction(player.actions.moveUp, goog.events.KeyCodes.W, false, false, false);
    controls.registerAction(player.actions.moveLeft, goog.events.KeyCodes.A, false, false, false);
    controls.registerAction(player.actions.moveDown, goog.events.KeyCodes.S, false, false, false);
    controls.registerAction(player.actions.moveRight, goog.events.KeyCodes.D, false, false, false);
};

test.createWorld = function() {
    var platformSize = new Box2D.Common.Math.b2Vec2(3, 0.25);
    ramp = game.world.createStaticBox(new Box2D.Common.Math.b2Vec2(5, 0.25),  new Box2D.Common.Math.b2Vec2(16, worldSize.y - 1.5), true /* visible */, { angle: Math.PI / 3 }, null );
    game.platformer.createPlatform(platformSize, new Box2D.Common.Math.b2Vec2(12, worldSize.y - 2.5));
    game.platformer.createPlatform(platformSize, new Box2D.Common.Math.b2Vec2(10, worldSize.y - 5));
    game.platformer.createPlatform(platformSize, new Box2D.Common.Math.b2Vec2(8, worldSize.y - 7.5));
    game.platformer.createPlatform(platformSize, new Box2D.Common.Math.b2Vec2(6, worldSize.y - 10));
    game.platformer.createPlatform(platformSize, new Box2D.Common.Math.b2Vec2(4, worldSize.y - 12.5));
    game.platformer.createPlatform(platformSize, new Box2D.Common.Math.b2Vec2(2, worldSize.y - 15));
    game.platformer.createPlatform(platformSize, new Box2D.Common.Math.b2Vec2(8, worldSize.y - 17.5));
    game.platformer.createPlatform(platformSize, new Box2D.Common.Math.b2Vec2(10, worldSize.y - 20));
    game.platformer.createPlatform(platformSize, new Box2D.Common.Math.b2Vec2(12, worldSize.y - 22.5));
    game.platformer.createPlatform(platformSize, new Box2D.Common.Math.b2Vec2(10, worldSize.y - 27.5));
    game.platformer.createPlatform(platformSize, new Box2D.Common.Math.b2Vec2(10, worldSize.y - 31));
    game.platformer.createPlatform(platformSize, new Box2D.Common.Math.b2Vec2(10, worldSize.y - 34.5));
    game.platformer.createPlatform(platformSize, new Box2D.Common.Math.b2Vec2(10, worldSize.y - 38));
    game.platformer.createBlock(new Box2D.Common.Math.b2Vec2(worldSize.x - 14, 0.5), new Box2D.Common.Math.b2Vec2((worldSize.x/2) + 7, worldSize.y - 25));
    //test.createBallPit(new Box2D.Common.Math.b2Vec2(worldSize.x - 30, 5), new Box2D.Common.Math.b2Vec2(20, worldSize.y - 25));
};

test.createBallPit = function(size, bottomLeft) {
    // Bottom assumed to already exist
    
    // Ramp
    game.world.createStaticBox(new Box2D.Common.Math.b2Vec2(0.25, Math.sqrt(size.y * size.y * 2)), new Box2D.Common.Math.b2Vec2(bottomLeft.x + size.y / 2, bottomLeft.y - size.y / 2), true /* visible */, { angle: Math.PI / 4 }, null );
    
    // Left wall
    game.world.createStaticBox(new Box2D.Common.Math.b2Vec2(0.25, size.y), new Box2D.Common.Math.b2Vec2(bottomLeft.x + size.y, bottomLeft.y - size.y / 2), true /* visible */, null, null );
    
    // Right wall
    game.world.createStaticBox(new Box2D.Common.Math.b2Vec2(0.25, size.y), new Box2D.Common.Math.b2Vec2(bottomLeft.x + size.x, bottomLeft.y - size.y / 2), true /* visible */, null, null );
    
    var radius = 0.15;
    var shape = new Box2D.Collision.Shapes.b2CircleShape(radius);
    for(var x = size.y + 1; x < size.x; x += radius * 2) {
        for(var y = 0; y < size.y; y+=1) { // half full
            var ball = game.world.createObject(new Box2D.Common.Math.b2Vec2(radius * 2, radius * 2), new Box2D.Common.Math.b2Vec2(bottomLeft.x + x + (Math.random() - 0.5)/2, bottomLeft.y - size.y), true /* visible */, null, { density: 0.1, restitution: 0.0, friction: 0.1 }, shape );
            var color = Math.random();
            if (color <= 0.25) {
                game.ui.setImage(ball.body, 'graphics/ball-red.png');
            } else if (color <= 0.5) {
                game.ui.setImage(ball.body, 'graphics/ball-green.png');
            } else if (color <= 0.75) {
                game.ui.setImage(ball.body, 'graphics/ball-yellow.png');
            } else {
                game.ui.setImage(ball.body, 'graphics/ball-blue.png');
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
        game.world.getBox2DBodyDefinition().angle = i / worldSize.x * Math.PI;
        var y = worldSize.y - 14;
        if ( flip ) {
            y = y + 8;
        }
        flip = !flip;
        var b0 = game.world.createStaticBox(new Box2D.Common.Math.b2Vec2(0.1, 0.1), new Box2D.Common.Math.b2Vec2(i, y));
        b0.body.display = null; // Hide the middle joint
        var b1 = game.world.createBox(new Box2D.Common.Math.b2Vec2(10, 1), new Box2D.Common.Math.b2Vec2(i, y));
        game.ui.setImage(b1.body, 'graphics/spinner.png');
        game.platformer.initializeDirectionalSiding(b1, false, true, false, false);
        var b2 = game.world.createBox(new Box2D.Common.Math.b2Vec2(10, 1), new Box2D.Common.Math.b2Vec2(i, y));
        b2.body.SetAngle(game.world.getBox2DBodyDefinition().angle + Math.PI / 2);
        game.ui.setImage(b2.body, 'graphics/spinner.png');
        jointDef.Initialize(b0.body, b1.body, b0.body.GetWorldCenter());
        game.world.getBox2DWorld().CreateJoint(jointDef);
        jointDef.Initialize(b0.body, b2.body, b0.body.GetWorldCenter());
        game.world.getBox2DWorld().CreateJoint(jointDef);
        weldJointDef.Initialize(b1.body, b2.body, b1.body.GetWorldCenter());
        game.world.getBox2DWorld().CreateJoint(weldJointDef);
    }
};

test.createDebugObjects = function() {
    // Debug Objects
    game.world.getBox2DBodyDefinition().type = Box2D.Dynamics.b2Body.b2_dynamicBody;
    game.world.getBox2DBodyDefinition().fixedRotation = false;
    game.world.getBox2DFixtureDefinition().restitution = 2.5;
    game.world.getBox2DFixtureDefinition().shape = new Box2D.Collision.Shapes.b2CircleShape( 0.25 );
    for ( var i = 0; i < testObjects; i++ ) {
      var x = ( i * 5 ) % ( worldSize.x - 10 );
      game.world.getBox2DBodyDefinition().position.y = 15 + ( i % 20 );
      game.world.getBox2DBodyDefinition().position.x = x + ( i % 20 ) / 20 + 4.5;
      var db3 = game.world.getBox2DWorld().CreateBody(game.world.getBox2DBodyDefinition());
      db3.display = {};
      db3.display.size = new Box2D.Common.Math.b2Vec2( 0.5, 0.5 );
      db3.CreateFixture(game.world.getBox2DFixtureDefinition());
    }
    game.world.getBox2DFixtureDefinition().shape = new Box2D.Collision.Shapes.b2PolygonShape();
    game.world.getBox2DFixtureDefinition().shape.SetAsBox( 0.25, 0.25 );
    for ( var i = 0; i < testObjects; i++ ) {
      var x = ( i * 5 ) % ( worldSize.x - 10 );
      game.world.getBox2DBodyDefinition().position.y = 15 + ( ( i + 5 ) % 20 );
      game.world.getBox2DBodyDefinition().position.x = x + ( ( i + 5 ) % 20 ) / 20 + 4.5;
      game.world.getBox2DBodyDefinition().angle = ( i % 17 ) / 17;
      var db3 = game.world.getBox2DWorld().CreateBody(game.world.getBox2DBodyDefinition());
      db3.display = {};
      db3.display.size = new Box2D.Common.Math.b2Vec2( 0.5, 0.5 );
      db3.CreateFixture(game.world.getBox2DFixtureDefinition());
    }
    game.world.getBox2DFixtureDefinition().shape = new Box2D.Collision.Shapes.b2PolygonShape();
    game.world.getBox2DFixtureDefinition().shape.SetAsArray( [ new Box2D.Common.Math.b2Vec2(-0.5, -0.5), new Box2D.Common.Math.b2Vec2(0.5, -0.5), new Box2D.Common.Math.b2Vec2(-0.5,0.5)], 3 );
    for ( var i = 0; i < testObjects; i++ ) {
      var x = ( i * 5 ) % ( worldSize.x - 10 );
      game.world.getBox2DBodyDefinition().position.y = 15 + ( ( i + 10 ) % 20 );
      game.world.getBox2DBodyDefinition().position.x = x + ( ( i + 10 ) % 20 ) / 20 + 4.5;
      game.world.getBox2DBodyDefinition().angle = ( i % 22 ) / 22;
      var db3 = game.world.getBox2DWorld().CreateBody(game.world.getBox2DBodyDefinition());
      db3.display = {};
      db3.display.size = new Box2D.Common.Math.b2Vec2( 0.75, 0.75 );
      db3.CreateFixture(game.world.getBox2DFixtureDefinition());
    }
    game.world.getBox2DFixtureDefinition().shape = new Box2D.Collision.Shapes.b2PolygonShape();
    game.world.getBox2DFixtureDefinition().shape.SetAsArray( [ new Box2D.Common.Math.b2Vec2(-0.5, -0.5), new Box2D.Common.Math.b2Vec2(0, -0.5), new Box2D.Common.Math.b2Vec2(0.5,0), new Box2D.Common.Math.b2Vec2(0.5, 0.5), new Box2D.Common.Math.b2Vec2( 0, 0.3 )], 5 );
    for ( var i = 0; i < testObjects; i++ ) {
      var x = ( i * 5 ) % ( worldSize.x - 10 );
      game.world.getBox2DBodyDefinition().position.y = 15 + ( ( i + 15 ) % 20 );
      game.world.getBox2DBodyDefinition().position.x = x + ( ( i + 15 ) % 20 ) / 20 + 4.5;
      game.world.getBox2DBodyDefinition().angle = ( i % 35 ) / 35;
      var db3 = game.world.getBox2DWorld().CreateBody(game.world.getBox2DBodyDefinition());
      db3.display = {};
      db3.display.size = new Box2D.Common.Math.b2Vec2( 0.75, 0.75 );
      db3.CreateFixture(game.world.getBox2DFixtureDefinition());
    }
};

test.createMario = function(offset) {
    var tileSize = new Box2D.Common.Math.b2Vec2(1.5, 1.5);
    var start = new Box2D.Common.Math.b2Vec2(offset.x + tileSize.x / 2, offset.y + tileSize.y / 2);
    //http://ian-albert.com/games/super_mario_bros_maps/mario-1-1.gif
    game.platformer.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x, start.y));
    game.platformer.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x, start.y));
    game.platformer.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 2, start.y));
    game.platformer.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 3, start.y));
    game.platformer.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 4, start.y));
    game.platformer.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 5, start.y));
    game.platformer.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 6, start.y));
    game.platformer.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 7, start.y));
    game.platformer.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 8, start.y));
    game.platformer.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 9, start.y));
    game.platformer.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 10, start.y));
    game.platformer.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 11, start.y));
    game.platformer.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 12, start.y));
    game.platformer.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 13, start.y));
    game.platformer.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 14, start.y));
    game.platformer.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 15, start.y));
    game.platformer.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 16, start.y));
    /* COIN */ game.platformer.createBreakableBlock(tileSize,  new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 16, start.y - tileSize.y * 4));
    game.platformer.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 17, start.y));
    game.platformer.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 18, start.y));
    game.platformer.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 19, start.y));
    game.platformer.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 20, start.y));
    game.platformer.createBreakableBlock(tileSize,  new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 20, start.y - tileSize.y * 4));
    game.platformer.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 21, start.y));
    /* SHROOM */ game.platformer.createBreakableBlock(tileSize,  new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 21, start.y - tileSize.y * 4));
    game.platformer.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 22, start.y));
    game.platformer.createBreakableBlock(tileSize,  new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 22, start.y - tileSize.y * 4));
    /* COIN */ game.platformer.createBreakableBlock(tileSize,  new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 22, start.y - tileSize.y * 8));
    game.platformer.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 23, start.y));
    /* COIN */ game.platformer.createBreakableBlock(tileSize,  new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 23, start.y - tileSize.y * 4));
    game.platformer.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 24, start.y));
    game.platformer.createBreakableBlock(tileSize,  new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 24, start.y - tileSize.y * 4));
    game.platformer.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 25, start.y));
    game.platformer.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 26, start.y));
    game.platformer.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 27, start.y));
    // goomba
    game.platformer.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 28, start.y));
    game.platformer.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 28, start.y - tileSize.y * 1));
    game.platformer.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 28, start.y - tileSize.y * 2));
    game.platformer.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 29, start.y));
    game.platformer.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 29, start.y - tileSize.y * 1));
    game.platformer.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 29, start.y - tileSize.y * 2));
    game.platformer.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 30, start.y));
    game.platformer.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 31, start.y));
    game.platformer.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 32, start.y));
    game.platformer.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 33, start.y));
    game.platformer.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 34, start.y));
    game.platformer.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 35, start.y));
    game.platformer.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 36, start.y));
    game.platformer.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 37, start.y));
    game.platformer.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 38, start.y));
    game.platformer.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 38, start.y - tileSize.y * 1));
    game.platformer.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 38, start.y - tileSize.y * 2));
    game.platformer.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 38, start.y - tileSize.y * 3));
    game.platformer.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 39, start.y));
    game.platformer.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 39, start.y - tileSize.y * 1));
    game.platformer.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 39, start.y - tileSize.y * 2));
    game.platformer.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 39, start.y - tileSize.y * 3));
    game.platformer.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 40, start.y));
    // goomba
    game.platformer.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 41, start.y));
    game.platformer.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 42, start.y));
    game.platformer.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 43, start.y));
    game.platformer.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 44, start.y));
    game.platformer.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 45, start.y));
    game.platformer.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 46, start.y));
    game.platformer.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 46, start.y - tileSize.y * 1));
    game.platformer.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 46, start.y - tileSize.y * 2));
    game.platformer.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 46, start.y - tileSize.y * 3));
    game.platformer.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 46, start.y - tileSize.y * 4));
    game.platformer.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 47, start.y));
    game.platformer.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 47, start.y - tileSize.y * 1));
    game.platformer.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 47, start.y - tileSize.y * 2));
    game.platformer.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 47, start.y - tileSize.y * 3));
    game.platformer.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 47, start.y - tileSize.y * 4));
    game.platformer.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 48, start.y));
    game.platformer.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 49, start.y));
    game.platformer.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 50, start.y));
    game.platformer.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 51, start.y));
    game.platformer.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 52, start.y));
    game.platformer.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 53, start.y));
    // goomba
    game.platformer.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 54, start.y));
    // goomba
    game.platformer.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 55, start.y));
    game.platformer.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 56, start.y));
    game.platformer.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 57, start.y));
    /* ALLOWS DOWN */ game.platformer.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 57, start.y - tileSize.y * 1));
    game.platformer.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 57, start.y - tileSize.y * 2));
    game.platformer.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 57, start.y - tileSize.y * 3));
    game.platformer.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 57, start.y - tileSize.y * 4));
    game.platformer.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 58, start.y));
    /* ALLOWS DOWN */ game.platformer.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 58, start.y - tileSize.y * 1));
    game.platformer.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 58, start.y - tileSize.y * 2));
    game.platformer.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 58, start.y - tileSize.y * 3));
    game.platformer.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 58, start.y - tileSize.y * 4));
    game.platformer.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 59, start.y));
    game.platformer.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 60, start.y));
    game.platformer.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 61, start.y));
    game.platformer.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 62, start.y));
    game.platformer.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 63, start.y));
    game.platformer.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 64, start.y));
    /* hidden 1up */ game.platformer.createBreakableBlock(tileSize,  new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 64, start.y - tileSize.y * 5));
    game.platformer.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 65, start.y));
    game.platformer.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 66, start.y));
    game.platformer.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 67, start.y));
    game.platformer.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 68, start.y));
    
    // gap of 2
    
    game.platformer.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 71, start.y));
    game.platformer.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 72, start.y));
    game.platformer.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 73, start.y));
    game.platformer.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 74, start.y));
    game.platformer.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 75, start.y));
    game.platformer.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 76, start.y));
    game.platformer.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 77, start.y));
    game.platformer.createBreakableBlock(tileSize,  new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 77, start.y - tileSize.y * 4));
    game.platformer.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 78, start.y));
    /* SHROOM */ game.platformer.createBreakableBlock(tileSize,  new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 78, start.y - tileSize.y * 4));
    game.platformer.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 79, start.y));
    game.platformer.createBreakableBlock(tileSize,  new Box2D.Common.Math.b2Vec2(start.x + tileSize.x * 79, start.y - tileSize.y * 4));
    // goomba (above blocK)
};

test.preThink = function(time, tick) {
    controls.handleKeyEvents(tick);
};
//test.preUpdate = function(time, tick) {};
test.preDraw = function(time, tick) {
    game.ui.lookAt(player.body.GetWorldCenter());
};

})(test);

goog.provide('test');

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

goog.require('bridge');
goog.require('mario');

(function(test){

var player;
var ramp;

var testObjects = 250;
var worldSize = new Box2D.Common.Math.b2Vec2(3500, 100); // Meters
var viewportSize = new Box2D.Common.Math.b2Vec2(1024, 600); // Pixels
var viewportScale = 20; // Pixels per Meter
var addBallPit = true;

var leftPlat = 4;
var rightPlat = 10;
var testLeft = 15;
var distanceBetweenPlatforms = 6;
var distanceBetweenTests = distanceBetweenPlatforms * 4;
var marioFloor = 3.2;

var playerControls;
var gameControls;
var g;
var p;

test.init = function(gameContainerID, doDebug, wasd) {
    g = new illandril.game.game(test, gameContainerID, worldSize, illandril.game.platformer.DEFAULTS.GRAVITY, viewportSize, viewportScale, doDebug);
    p = new illandril.game.platformer(g);
    
    var startingTest = 1;
    var position = new Box2D.Common.Math.b2Vec2(5, worldSize.y - 7 - distanceBetweenTests * startingTest);
    
    test.createPlayer(position, wasd);
    mario.createMario(g, p, new Box2D.Common.Math.b2Vec2(0, worldSize.y), position);
    
    var testCount = 0;
    
    testCount++;
    bridge.createBridge(g, p, new Box2D.Common.Math.b2Vec2(testLeft, worldSize.y - (marioFloor + testCount * distanceBetweenTests)));
    
    test.createJointTests(++testCount);
    test.createSlopeTests(++testCount);
    
    test.createPlatforms(testCount);
    test.createDebugObjects();
    
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

test.createPlatforms = function(testCount) {
    var platformSize = new Box2D.Common.Math.b2Vec2(3, 0.25);
    for (var i = 0; i < testCount; i++) {
        var yOffset = marioFloor + i * distanceBetweenTests;
        for (var y = distanceBetweenPlatforms; y <= distanceBetweenTests; y += distanceBetweenPlatforms) {
            p.createPlatform(platformSize, new Box2D.Common.Math.b2Vec2(leftPlat, worldSize.y - y - yOffset));
            p.createPlatform(platformSize, new Box2D.Common.Math.b2Vec2(rightPlat, worldSize.y - y - yOffset));
        }
        p.createPlatform(new Box2D.Common.Math.b2Vec2(worldSize.x - testLeft, 0.25), new Box2D.Common.Math.b2Vec2((worldSize.x - testLeft) / 2 + testLeft, worldSize.y - yOffset - distanceBetweenTests));
    }
    p.createPlatform(new Box2D.Common.Math.b2Vec2(1, 1), new Box2D.Common.Math.b2Vec2(testLeft - 3, worldSize.y - marioFloor - 3.5), illandril.game.platformer.SIDES.LEFT);
    p.createPlatform(new Box2D.Common.Math.b2Vec2(1, 1), new Box2D.Common.Math.b2Vec2(testLeft + 0, worldSize.y - marioFloor - 3.5), illandril.game.platformer.SIDES.RIGHT);
    p.createPlatform(new Box2D.Common.Math.b2Vec2(1, 1), new Box2D.Common.Math.b2Vec2(testLeft + 3, worldSize.y - marioFloor - 3.5), illandril.game.platformer.SIDES.TOP);
    p.createPlatform(new Box2D.Common.Math.b2Vec2(1, 1), new Box2D.Common.Math.b2Vec2(testLeft + 6, worldSize.y - marioFloor - 3.5), illandril.game.platformer.SIDES.BOTTOM);
    var x = p.createPlatform(new Box2D.Common.Math.b2Vec2(1, 1), new Box2D.Common.Math.b2Vec2(testLeft + 9, worldSize.y - marioFloor - 3.5), illandril.game.platformer.SIDES.BOTTOM);
    x.body.SetAngle(Math.PI / 2);
};

test.createSlopeTests = function(testCount) {
    var testSpacing = 2;
    var offset = new Box2D.Common.Math.b2Vec2(testLeft + testSpacing, worldSize.y - (marioFloor + testCount * distanceBetweenTests));
    var minSlope = -Math.PI / 4;
    var maxSlope = 0;
    var slopeTicks = 20;
    var slopeWidth = 3;
    var slopeTick = (maxSlope - minSlope) / slopeTicks;
    for(var slope = minSlope; slope <= maxSlope; slope += slopeTick) {
        offset.x += slopeWidth / 2;
        var ramp = g.getWorld().createStaticBox(new Box2D.Common.Math.b2Vec2(slopeWidth, slopeWidth / 10),  new Box2D.Common.Math.b2Vec2(offset.x, offset.y - slopeWidth / 2), true /* visible */, { angle: slope }, null );
        offset.x += slopeWidth / 2 + testSpacing;
    }
};

test.createJointTests = function(testCount) {
    var testSpacing = 2;
    var offset = new Box2D.Common.Math.b2Vec2(testLeft + testSpacing, worldSize.y - (marioFloor + testCount * distanceBetweenTests));
    
    var spinnerCount = 1;
    var spinnerRadius = 5;
    
    var distanceCount = 1;
    var distanceRadius = 2;
    
    var pulleyCount = 3;
    var pulleyWidth = 3;
    
    var gearCount = 2;
    var gearHeight = 2;
    var gearRadius = 2;
    
    //goog.require('Box2D.Dynamics.Joints.b2LineJointDef');
    //goog.require('Box2D.Dynamics.Joints.b2MouseJointDef');
    //goog.require('Box2D.Dynamics.Joints.b2PrismaticJointDef');

    for ( var x = 0; x < spinnerCount; x++ ) {
        var jointDef = new Box2D.Dynamics.Joints.b2RevoluteJointDef();
        var weldJointDef = new Box2D.Dynamics.Joints.b2WeldJointDef();
        offset.x += spinnerRadius;
        var bodyArgs = { angle: Math.random() * Math.PI };
        var y = offset.y - spinnerRadius * 1.5;
        var b0 = g.getWorld().createStaticBox(new Box2D.Common.Math.b2Vec2(0.01, 0.01), new Box2D.Common.Math.b2Vec2(offset.x, y), false /* visible */, { bodyArgs: bodyArgs });
        var b1 = g.getWorld().createBox(new Box2D.Common.Math.b2Vec2(spinnerRadius * 2, spinnerRadius / 5), new Box2D.Common.Math.b2Vec2(offset.x, y), true /* visible */, { bodyArgs: bodyArgs });
        g.getViewport().setImage(b1, 'graphics/spinner.png');
        bodyArgs.angle += Math.PI / 2;
        var b2 = g.getWorld().createBox(new Box2D.Common.Math.b2Vec2(spinnerRadius * 2, spinnerRadius / 5), new Box2D.Common.Math.b2Vec2(offset.x, y), true /* visible */, { bodyArgs: bodyArgs });
        g.getViewport().setImage(b2, 'graphics/spinner.png');
        jointDef.Initialize(b0.body, b1.body, b0.body.GetWorldCenter());
        g.getWorld().getBox2DWorld().CreateJoint(jointDef);
        jointDef.Initialize(b0.body, b2.body, b0.body.GetWorldCenter());
        g.getWorld().getBox2DWorld().CreateJoint(jointDef);
        weldJointDef.Initialize(b1.body, b2.body, b1.body.GetWorldCenter());
        g.getWorld().getBox2DWorld().CreateJoint(weldJointDef);
        offset.x += spinnerRadius + testSpacing;
    }
    
    for ( var x = 0; x < distanceCount; x++ ) {
        var bodyArgs = { fixedRotation: true };
        var jointDef = new Box2D.Dynamics.Joints.b2DistanceJointDef();
        offset.x += distanceRadius;
        var y = offset.y - 6;
        var sideLength = distanceRadius * 1.5;
        var sideWidth = distanceRadius * 0.1;
        
        var bottom = g.getWorld().createBox(new Box2D.Common.Math.b2Vec2(sideLength, sideWidth), new Box2D.Common.Math.b2Vec2(offset.x + sideWidth / 2, y + distanceRadius), true /* visible */, { bodyArgs: bodyArgs });
        var top = g.getWorld().createBox(new Box2D.Common.Math.b2Vec2(sideLength, sideWidth), new Box2D.Common.Math.b2Vec2(offset.x + sideWidth / 2, y - distanceRadius), true /* visible */, { bodyArgs: bodyArgs });
        var left = g.getWorld().createBox(new Box2D.Common.Math.b2Vec2(sideWidth, sideLength), new Box2D.Common.Math.b2Vec2(offset.x - distanceRadius, y + sideWidth / 2), true /* visible */, { bodyArgs: bodyArgs });
        var right = g.getWorld().createBox(new Box2D.Common.Math.b2Vec2(sideWidth, sideLength), new Box2D.Common.Math.b2Vec2(offset.x + distanceRadius, y + sideWidth / 2), true /* visible */, { bodyArgs: bodyArgs });
        
        jointDef.Initialize(bottom.body, top.body, bottom.body.GetWorldCenter(), top.body.GetWorldCenter());
        g.getWorld().getBox2DWorld().CreateJoint(jointDef);
        jointDef.Initialize(bottom.body, left.body, bottom.body.GetWorldCenter(), left.body.GetWorldCenter());
        g.getWorld().getBox2DWorld().CreateJoint(jointDef);
        jointDef.Initialize(bottom.body, right.body, bottom.body.GetWorldCenter(), right.body.GetWorldCenter());
        g.getWorld().getBox2DWorld().CreateJoint(jointDef);
        jointDef.Initialize(top.body, left.body, top.body.GetWorldCenter(), left.body.GetWorldCenter());
        g.getWorld().getBox2DWorld().CreateJoint(jointDef);
        jointDef.Initialize(top.body, right.body, top.body.GetWorldCenter(), right.body.GetWorldCenter());
        g.getWorld().getBox2DWorld().CreateJoint(jointDef);
        jointDef.Initialize(left.body, right.body, left.body.GetWorldCenter(), right.body.GetWorldCenter());
        g.getWorld().getBox2DWorld().CreateJoint(jointDef);
        
        offset.x += distanceRadius + testSpacing;
    }
    
    for ( var x = 0; x < pulleyCount; x++ ) {
        var y = offset.y - pulleyWidth * pulleyCount;
        var bodyArgs = { fixedRotation: true };
        var jointDef = new Box2D.Dynamics.Joints.b2PulleyJointDef();
        
        offset.x += pulleyWidth / 2;
        var left = g.getWorld().createBox(new Box2D.Common.Math.b2Vec2(pulleyWidth, pulleyWidth / 10), new Box2D.Common.Math.b2Vec2(offset.x + pulleyWidth / 2, y), true /* visible */, { bodyArgs: bodyArgs });
        
        offset.x += pulleyWidth * 2;
        var right = g.getWorld().createBox(new Box2D.Common.Math.b2Vec2(pulleyWidth, pulleyWidth / 10), new Box2D.Common.Math.b2Vec2(offset.x + pulleyWidth / 2, y), true /* visible */, { bodyArgs: bodyArgs });
        
        var leftTop = left.body.GetWorldCenter().Copy()
        leftTop.y -= pulleyWidth;
        g.getWorld().createScenery(new Box2D.Common.Math.b2Vec2(pulleyWidth / 10, pulleyWidth / 10), leftTop);
        var rightTop = right.body.GetWorldCenter().Copy()
        rightTop.y -= pulleyWidth;
        g.getWorld().createScenery(new Box2D.Common.Math.b2Vec2(pulleyWidth / 10, pulleyWidth / 10), rightTop);
        
        jointDef.Initialize(left.body, right.body, leftTop, rightTop, left.body.GetWorldCenter(), right.body.GetWorldCenter(), (x + 1) / 2 /* ratio */);
        g.getWorld().getBox2DWorld().CreateJoint(jointDef);
        
        offset.x += pulleyWidth / 2 + testSpacing;
    }
    
    
    for ( var x = 0; x < gearCount; x++ ) {
        var jointDef = new Box2D.Dynamics.Joints.b2GearJointDef();
        var revJointDef = new Box2D.Dynamics.Joints.b2RevoluteJointDef();
        var prisJointDef = new Box2D.Dynamics.Joints.b2PrismaticJointDef();
        var bodyArgs = { angle: 0 };
        
        offset.x += gearRadius;
        var lastJoint = null;
        for(var i = 0; i < gearHeight; i++) {
            var y = offset.y - gearRadius * (i + 1) * 2;
            var b0 = g.getWorld().createStaticBox(new Box2D.Common.Math.b2Vec2(0.01, 0.01), new Box2D.Common.Math.b2Vec2(offset.x, y), false /* visible */, { bodyArgs: bodyArgs });
            var b1 = g.getWorld().createBox(new Box2D.Common.Math.b2Vec2(gearRadius * 2, gearRadius / 10), new Box2D.Common.Math.b2Vec2(offset.x, y), true /* visible */, { bodyArgs: bodyArgs });
            revJointDef.Initialize(b0.body, b1.body, b0.body.GetWorldCenter());
            var joint = g.getWorld().getBox2DWorld().CreateJoint(revJointDef);
            if (lastJoint !== null) {
                jointDef.Initialize(joint, lastJoint, i /* ratio */);
                g.getWorld().getBox2DWorld().CreateJoint(jointDef);
            }
            lastJoint = joint;
        }
        var y = offset.y - gearRadius * (gearHeight + 1) * 2;
        var b0 = g.getWorld().createStaticBox(new Box2D.Common.Math.b2Vec2(0.01, 0.01), new Box2D.Common.Math.b2Vec2(offset.x, y), false /* visible */, { bodyArgs: bodyArgs });
        var b1 = g.getWorld().createBox(new Box2D.Common.Math.b2Vec2(gearRadius / 5, gearRadius / 10), new Box2D.Common.Math.b2Vec2(offset.x, y), true /* visible */, { bodyArgs: bodyArgs });
        var prismJointDef = new Box2D.Dynamics.Joints.b2PrismaticJointDef();
        prismJointDef.Initialize(b0.body, b1.body, b0.body.GetWorldCenter(), new Box2D.Common.Math.b2Vec2(Math.random(), Math.random()) /* axis */)
        prismJointDef.enableLimit = true;
        prismJointDef.lowerTranslation = -gearRadius / 2;
        prismJointDef.upperTranslation = gearRadius / 2;
        var joint = g.getWorld().getBox2DWorld().CreateJoint(prismJointDef);
        jointDef.Initialize(joint, lastJoint, 1 / gearHeight /* ratio */);
        g.getWorld().getBox2DWorld().CreateJoint(jointDef);
        
        offset.x += gearRadius + testSpacing;
    }
    //goog.require('Box2D.Dynamics.Joints.b2GearJointDef');
};

test.createDebugObjects = function() {
    // Debug Objects
    var bodyArgs = {
        type: Box2D.Dynamics.b2BodyDef.b2_dynamicBody,
        fixedRotation: false
    };
    var fixArgs = {
        restitution: 1.25
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
    shape.SetAsArray( [ new Box2D.Common.Math.b2Vec2(-0.5, -0.5), new Box2D.Common.Math.b2Vec2(0.5, -0.5), new Box2D.Common.Math.b2Vec2(-0.5,0.5)] );
    for ( var i = 0; i < testObjects; i++ ) {
      var x = ( i * 5 ) % ( worldSize.x - 10 );
      var position = new Box2D.Common.Math.b2Vec2(x + ( ( i + 10 ) % 20 ) / 20 + 4.5, 15 + ( ( i + 10 ) % 20 ));
      bodyArgs.angle = ( i % 22 ) / 22;
      g.getWorld().createObject(size, position, true /* visible */, shape, {bodyArgs: bodyArgs, fixtureArgs: fixArgs });
    }
    shape = new Box2D.Collision.Shapes.b2PolygonShape();
    shape.SetAsArray( [ new Box2D.Common.Math.b2Vec2(-Math.random() * 0.5, -Math.random() * 0.5), new Box2D.Common.Math.b2Vec2(Math.random() * 0.5, -Math.random() * 0.5), new Box2D.Common.Math.b2Vec2(Math.random() * 0.5, Math.random() * 0.5), new Box2D.Common.Math.b2Vec2(-Math.random() * 0.5, Math.random() * 0.5)] );
    for ( var i = 0; i < testObjects; i++ ) {
      var x = ( i * 5 ) % ( worldSize.x - 10 );
      var position = new Box2D.Common.Math.b2Vec2(x + ( ( i + 15 ) % 20 ) / 20 + 4.5, 15 + ( ( i + 15 ) % 20 ));
      bodyArgs.angle = ( i % 35 ) / 35;
      g.getWorld().createObject(size, position, true /* visible */, shape, {bodyArgs: bodyArgs, fixtureArgs: fixArgs });
    }
    shape = new Box2D.Collision.Shapes.b2PolygonShape();
    shape.SetAsArray( [ new Box2D.Common.Math.b2Vec2(-0.5, -0.5), new Box2D.Common.Math.b2Vec2(0, -0.5), new Box2D.Common.Math.b2Vec2(0.5,0), new Box2D.Common.Math.b2Vec2(0.5, 0.5), new Box2D.Common.Math.b2Vec2( 0, 0.3 )] );
    for ( var i = 0; i < testObjects; i++ ) {
      var x = ( i * 5 ) % ( worldSize.x - 10 );
      var position = new Box2D.Common.Math.b2Vec2(x + ( ( i + 15 ) % 20 ) / 20 + 4.5, 15 + ( ( i + 15 ) % 20 ));
      bodyArgs.angle = ( i % 35 ) / 35;
      g.getWorld().createObject(size, position, true /* visible */, shape, {bodyArgs: bodyArgs, fixtureArgs: fixArgs });
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

})(test);

goog.exportSymbol('test.init', test.init);

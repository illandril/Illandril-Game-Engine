goog.require('game');
goog.require('game.platformer');

goog.provide('test');

var test = {};

(function(test){

var testObjects = 0;
var worldSize = new Box2D.Common.Math.b2Vec2(60, 30); // Meters
var viewportSize = new Box2D.Common.Math.b2Vec2(600, 400); // Pixels
var viewportScale = 20; // Pixels per Meter

var player;
var controls;

test.init = function(gameContainerID, doDebug) {
    game.init(test, gameContainerID, worldSize, viewportSize, viewportScale, doDebug);
    var position = new Box2D.Common.Math.b2Vec2(5, worldSize.y - 5);
    test.createPlayer(position);
    test.createSpinners();
    test.createDebugObjects();
    game.start();
};

test.createPlayer = function(position) {
    var size = new Box2D.Common.Math.b2Vec2(1.0, 1.0);
    player = game.platformer.createPlayer(position, size);
    game.animations.setAsFourDirectionalAnimation(player, size /* size (meters) */, 'graphics/generic_character.png' /* url */, new Box2D.Common.Math.b2Vec2(0, 0) /* offset */, new Box2D.Common.Math.b2Vec2(20, 20) /* frameSize */, 2 /* frames */, 4 /* frameSpeed (fps) */ );
    controls = new illandril.game.ui.Controls("main");
    
    controls.registerAction(player.actions.moveUp, goog.events.KeyCodes.W, false, false, false);
    controls.registerAction(player.actions.moveLeft, goog.events.KeyCodes.A, false, false, false);
    controls.registerAction(player.actions.moveDown, goog.events.KeyCodes.S, false, false, false);
    controls.registerAction(player.actions.moveRight, goog.events.KeyCodes.D, false, false, false);
};

test.createSpinners = function() {
    // Add in the spinners
    var jointDef = new Box2D.Dynamics.Joints.b2RevoluteJointDef();
    var weldJointDef = new Box2D.Dynamics.Joints.b2WeldJointDef();
    var flip = false;
    for ( var i = 10; i <= worldSize.x - 10; i += 8 ) {
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

test.preThink = function(time, tick) {
    controls.handleKeyEvents(tick);
};
//test.preUpdate = function(time, tick) {};
test.preDraw = function(time, tick) {
    game.ui.lookAt(player.GetWorldCenter());
};

})(test);

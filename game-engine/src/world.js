goog.provide('game.world');

game = game || {};

var GRAVITY = new Box2D.Common.Math.b2Vec2( 0, 9.8 );
(function(game){
    var world = new Box2D.Dynamics.b2World( GRAVITY /* Gravity */, true /* allow sleep */ );
    var fixtureDefinition = new Box2D.Dynamics.b2FixtureDef();
    var bodyDefinition = new Box2D.Dynamics.b2BodyDef();
    var worldWidth = null;
    var worldHeight = null;
    
    game.world = {};
    
    game.world.init = function(width, height) {
        worldWidth = width;
        worldHeight = height;
        // Add in the boundries
        var top = game.world.createStaticBox( worldWidth, 1, worldWidth / 2, 0 );
        top.body.display.spriteSheet = 'graphics/sky.png';
        var bottom = game.world.createStaticBox( worldWidth, 1, worldWidth / 2, worldHeight );
        bottom.body.display.spriteSheet = 'graphics/grass.png';
        var left = game.world.createStaticBox( 1, worldHeight, 0, worldHeight / 2 );
        left.body.display.spriteSheet = 'graphics/wall.png';
        var right = game.world.createStaticBox( 1, worldHeight, worldWidth, worldHeight / 2 );
        right.body.display.spriteSheet = 'graphics/wall.png';
    };
    
    game.world.update = function(time, tick) {
        world.Step(tick /* time delta (sec) */, frameSteps /* Velocity Iterations */, frameSteps /* Position Iterations */);
        world.DrawDebugData();
        world.ClearForces();
    };
    
    game.world.getBox2DWorld = function() {
        return world;
    };
    
    game.world.getBox2DBodyDefinition = function() {
        return bodyDefinition;
    };
    
    game.world.getBox2DFixtureDefinition = function() {
        return fixtureDefinition;
    };
    
    game.world.getWorldWidth = function() {
        return worldWidth;
    };
    
    game.world.getWorldHeight = function() {
        return worldHeight;
    };
    
    game.world.createStaticBox = function( width, height, centerX, centerY ) {
        fixtureDefinition.density = 1.0;
        fixtureDefinition.friction = 0.5;
        fixtureDefinition.restitution = 0.01;
        fixtureDefinition.shape = new Box2D.Collision.Shapes.b2PolygonShape();
        fixtureDefinition.shape.SetAsBox( width / 2, height / 2 );
        bodyDefinition.type = Box2D.Dynamics.b2Body.b2_staticBody;
        bodyDefinition.position.x = centerX;
        bodyDefinition.position.y = centerY;
        var body = world.CreateBody( bodyDefinition );
        body.display = {};
        body.display.size = new Box2D.Common.Math.b2Vec2( width, height );
        var fixture = body.CreateFixture( fixtureDefinition );
        return { body: body, fixture: fixture };
    };
    
    game.world.createBox = function( width, height, centerX, centerY ) {
        fixtureDefinition.density = 1.0;
        fixtureDefinition.friction = 0.5;
        fixtureDefinition.restitution = 0.2;
        fixtureDefinition.shape = new Box2D.Collision.Shapes.b2PolygonShape();
        fixtureDefinition.shape.SetAsBox( width / 2, height / 2 );
        bodyDefinition.type = Box2D.Dynamics.b2Body.b2_dynamicBody;
        bodyDefinition.position.x = centerX;
        bodyDefinition.position.y = centerY;
        var body = world.CreateBody( bodyDefinition );
        body.display = {};
        body.display.size = new Box2D.Common.Math.b2Vec2( width, height );
        var fixture = body.CreateFixture( fixtureDefinition );
        return { body: body, fixture: fixture };
    };
})(game);
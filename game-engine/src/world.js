goog.provide('game.world');

goog.require('game.animations');

game = game || {};

(function(game){
    var fixtureDefinition = new Box2D.Dynamics.b2FixtureDef();
    var bodyDefinition = new Box2D.Dynamics.b2BodyDef();
    var world = null;
    var worldWidth = null;
    var worldHeight = null;
    var frameSteps = 10;
    
    var fixtureDefaults = {
        density: 0.10,
        friction: 0.5,
        restitution: 0.01
    };
    
    var bodyDefaults = {
        fixedRotation: false,
        angle: 0,
        type: Box2D.Dynamics.b2Body.b2_dynamicBody
    };
    
    var argsOrDefaults = function(args, defaults) {
        args = args || {};
        var newArgs = {};
        for(var x in defaults) {
            if(args[x] === undefined || args[x] === null) {
                newArgs[x] = defaults[x];
            } else {
                newArgs[x] = args[x];
            }
        }
        return newArgs;
    };
    var argsOrFixtureDefaults = function(args) {
        return argsOrDefaults(args, fixtureDefaults);
    };
    
    var argsOrBodyDefaults = function(args) {
        return argsOrDefaults(args, bodyDefaults);
    };
    
    game.world = {};
    
    game.world.init = function(worldSize, gravity) {
        world = new Box2D.Dynamics.b2World( gravity, true /* allow sleep */ );
        worldWidth = worldSize.x;
        worldHeight = worldSize.y;
        // Add in the boundries
        var top = game.world.createStaticBox(new Box2D.Common.Math.b2Vec2(worldWidth, 1), new Box2D.Common.Math.b2Vec2(worldWidth / 2, 0), true, null, { friction: 0} );
        game.ui.setImage(top.body, 'graphics/border.png');
        var bottom = game.world.createStaticBox(new Box2D.Common.Math.b2Vec2(worldWidth, 1), new Box2D.Common.Math.b2Vec2(worldWidth / 2, worldHeight), true, null, { friction: 0});
        game.ui.setImage(bottom.body, 'graphics/border.png');
        var left = game.world.createStaticBox(new Box2D.Common.Math.b2Vec2(1, worldHeight), new Box2D.Common.Math.b2Vec2(0, worldHeight / 2), true, null, { friction: 0});
        game.ui.setImage(left.body, 'graphics/border.png');
        var right = game.world.createStaticBox(new Box2D.Common.Math.b2Vec2(1, worldHeight), new Box2D.Common.Math.b2Vec2(worldWidth, worldHeight / 2), true, null, { friction: 0});
        game.ui.setImage(right.body, 'graphics/border.png');
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
    
    game.world.createStaticBox = function(size, position, visible, bodyArgs, fixtureArgs) {
        bodyArgs = bodyArgs || {};
        bodyArgs.type = Box2D.Dynamics.b2Body.b2_staticBody;
        return game.world.createBox(size, position, visible, bodyArgs, fixtureArgs);
    };
    
    game.world.createBox = function(size, position, visible, bodyArgs, fixtureArgs) {
        var shape = new Box2D.Collision.Shapes.b2PolygonShape();
        shape.SetAsBox(size.x / 2, size.y / 2);
        return game.world.createObject(size, position, visible !== false, bodyArgs, fixtureArgs, shape);
    };
    
    game.world.createObject = function(size, position, visible, bodyArgs, fixtureArgs, shape) {
        bodyArgs = argsOrBodyDefaults(bodyArgs);
        fixtureArgs = argsOrFixtureDefaults(fixtureArgs);
        fixtureDefinition.density = fixtureArgs.density;
        fixtureDefinition.friction = fixtureArgs.friction;
        fixtureDefinition.restitution = fixtureArgs.restitution;
        fixtureDefinition.shape = shape;
        bodyDefinition.type = bodyArgs.type;
        bodyDefinition.angle = bodyArgs.angle;
        bodyDefinition.fixedRotation = bodyArgs.fixedRotation;
        bodyDefinition.position = position;
        var body = world.CreateBody(bodyDefinition);
        var fixture = body.CreateFixture(fixtureDefinition);
        if (visible) {
            game.ui.setDisplaySize(body, new Box2D.Common.Math.b2Vec2(size.x, size.y));
        }
        return { body: body, fixture: fixture };
    };
})(game);
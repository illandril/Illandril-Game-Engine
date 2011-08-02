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
    
    var collisionFilters = [];
    
    var fixtureDefaults = {
        density: 0.10,
        friction: 0.5,
        restitution: 0.01,
        isSensor: false
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
        world.SetContactFilter(game.world);
        world.SetContactListener(game.world);
        
        worldWidth = worldSize.x;
        worldHeight = worldSize.y;
        // Add in the boundries
        world.top = game.world.createStaticBox(new Box2D.Common.Math.b2Vec2(worldWidth, 1), new Box2D.Common.Math.b2Vec2(worldWidth / 2, 0), true, null, { friction: 0} );
        game.ui.setImage(world.top.body, 'graphics/border.png');
        world.bottom = game.world.createStaticBox(new Box2D.Common.Math.b2Vec2(worldWidth, 1), new Box2D.Common.Math.b2Vec2(worldWidth / 2, worldHeight), true, null, { friction: 0});
        game.ui.setImage(world.bottom.body, 'graphics/border.png');
        world.left = game.world.createStaticBox(new Box2D.Common.Math.b2Vec2(1, worldHeight), new Box2D.Common.Math.b2Vec2(0, worldHeight / 2), true, null, { friction: 0});
        game.ui.setImage(world.left.body, 'graphics/border.png');
        world.right = game.world.createStaticBox(new Box2D.Common.Math.b2Vec2(1, worldHeight), new Box2D.Common.Math.b2Vec2(worldWidth, worldHeight / 2), true, null, { friction: 0});
        game.ui.setImage(world.right.body, 'graphics/border.png');
    };
    
    game.world.update = function(time, tick) {
        world.Step(tick /* time delta (sec) */, frameSteps /* Velocity Iterations */, frameSteps /* Position Iterations */);
        world.DrawDebugData();
        world.ClearForces();
    };
    
    game.world.getBox2DWorld = function() {
        return world;
    };
    
    game.world.addCollisionFilter = function(filter) {
        collisionFilters.push(filter);
    };
    
    // Return true if the given fixture should be considered for ray intersection.
    game.world.RayCollide = function(userData, fixture) {
        // Sensors should always collide
        if (!fixture.IsSensor()) {
            for( var i = 0; i < collisionFilters.length; i++ ) {
                if (collisionFilters[i].RayCollide) {
                    if (!collisionFilters[i].RayCollide(userData, fixture)) {
                        return false;
                    }
                }
            }
        }
        return Box2D.Dynamics.b2ContactFilter.prototype.RayCollide(userData, fixture);
    };
    
    // Return true if contact calculations should be performed between these two fixtures.
    game.world.ShouldCollide = function(fixtureA, fixtureB) {
        // Sensors should always collide
        if(!(fixtureA.IsSensor() || fixtureB.IsSensor())) {
            for( var i = 0; i < collisionFilters.length; i++ ) {
                if (collisionFilters[i].ShouldCollide) {
                    if (!collisionFilters[i].ShouldCollide(fixtureA, fixtureB)) {
                        return false;
                    }
                }
            }
        }
        return Box2D.Dynamics.b2ContactFilter.prototype.ShouldCollide(fixtureA, fixtureB);
    };
    
    //Called when two fixtures begin to touch.
    game.world.BeginContact = function(contact) {
        for( var i = 0; i < collisionFilters.length; i++ ) {
            // Called when two fixtures begin to touch, before BeginContact
            // Should be actions that can disable contact - contact may already be disabled
            if (collisionFilters[i].ValidateBeginContact) {
                collisionFilters[i].ValidateBeginContact(contact);
            }
            if(contact.disabled) {
                contact.SetEnabled(false);
            }
            // Called when two fixtures begin to touch, after ValidateBeginContact
            // Should be actions that can not disable contact - contact may already be disabled
            if (collisionFilters[i].BeginContact) {
                collisionFilters[i].BeginContact(contact);
            }
        }
    };
    
    //Called when two fixtures cease to touch.
    game.world.EndContact = function(contact) {
        for( var i = 0; i < collisionFilters.length; i++ ) {
            if (collisionFilters[i].EndContact) {
                collisionFilters[i].EndContact(contact);
            }
        }
        contact.disabled = false;
        contact.SetEnabled(true);
    };
    
    // This is called after a contact is updated.
    game.world.PreSolve = function(contact, oldManifold) {
        if(contact.disabled) {
            contact.SetEnabled(false);
        }
        for( var i = 0; i < collisionFilters.length; i++ ) {
            if (collisionFilters[i].PreSolve) {
                collisionFilters[i].PreSolve(contact, oldManifold);
            }
        }
    };
    
    // This lets you inspect a contact after the solver is finished.
    game.world.PostSolve = function(contact, impulse) {
        for( var i = 0; i < collisionFilters.length; i++ ) {
            if (collisionFilters[i].PostSolve) {
                collisionFilters[i].PostSolve(contact, impulse);
            }
        }
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
        bodyDefinition.type = bodyArgs.type;
        bodyDefinition.angle = bodyArgs.angle;
        bodyDefinition.fixedRotation = bodyArgs.fixedRotation;
        bodyDefinition.position = position;
        var body = world.CreateBody(bodyDefinition);
        fixture = game.world.addFixture(body, fixtureArgs, shape);
        if (visible) {
            game.ui.setDisplaySize(body, new Box2D.Common.Math.b2Vec2(size.x, size.y));
        }
        var object = { body: body, fixture: fixture };
        body.object = object;
        return object;
    };
    
    game.world.addFixture = function(body, fixtureArgs, shape) {
        fixtureArgs = argsOrFixtureDefaults(fixtureArgs);
        fixtureDefinition.density = fixtureArgs.density;
        fixtureDefinition.friction = fixtureArgs.friction;
        fixtureDefinition.restitution = fixtureArgs.restitution;
        fixtureDefinition.isSensor = fixtureArgs.isSensor;
        fixtureDefinition.shape = shape;
        var fixture = body.CreateFixture(fixtureDefinition);
        return fixture;
    };
})(game);
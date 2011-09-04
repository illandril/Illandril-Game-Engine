goog.provide('game.world');

goog.require('game.gameObject');
goog.require('Box2D');

(function(game){
    var fixtureDefinition = new Box2D.Dynamics.b2FixtureDef();
    var bodyDefinition = new Box2D.Dynamics.b2BodyDef();
    var frameSteps = 10;
    
    var fixtureDefaults = {
        density: 0.10,
        friction: 0.6,
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
    
    game.world = function(theGame, worldSize, gravity) {
        this.queuedActions = [];
        this.collisionFilters = [];
        
        this.nextObjectID = 0;
        this.objects = {};
        
        this.game = theGame;
        this.worldSize = new Box2D.Common.Math.b2Vec2(worldSize.x, worldSize.y);
        this.b2World = new Box2D.Dynamics.b2World( gravity, true /* allow sleep */ );
        this.b2World.SetContactFilter(this);
        this.b2World.SetContactListener(this);
        
        // Add in the boundries
        this.top = this.createStaticBox(new Box2D.Common.Math.b2Vec2(this.worldSize.x + 2, 2), new Box2D.Common.Math.b2Vec2(this.worldSize.x / 2, -1), false /* visible */, null, { friction: 0} );
        this.bottom = this.createStaticBox(new Box2D.Common.Math.b2Vec2(this.worldSize.x + 2, 2), new Box2D.Common.Math.b2Vec2(this.worldSize.x / 2, this.worldSize.y + 1), false /* visible */, null, { friction: 0});
        this.left = this.createStaticBox(new Box2D.Common.Math.b2Vec2(2, this.worldSize.y + 2), new Box2D.Common.Math.b2Vec2(-1, this.worldSize.y / 2), false /* visible */, null, { friction: 0});
        this.right = this.createStaticBox(new Box2D.Common.Math.b2Vec2(2, this.worldSize.y + 2), new Box2D.Common.Math.b2Vec2(this.worldSize.x + 1, this.worldSize.y / 2), false /* visible */, null, { friction: 0});
    };
    
    game.world.prototype.update = function(time, tick) {
        this.b2World.Step(tick /* time delta (sec) */, frameSteps /* Velocity Iterations */, frameSteps /* Position Iterations */);
        this.b2World.ClearForces();
        var prevQueuedActions = this.queuedActions;
        this.queuedActions = [];
        if (prevQueuedActions.length > 0) {
            for (var i = 0; i < prevQueuedActions.length; i++) {
                prevQueuedActions[i].call(this);
            }
        }
    };
    
    game.world.prototype.getBox2DWorld = function() {
        return this.b2World;
    };
    
    game.world.prototype.addCollisionFilter = function(filter) {
        this.collisionFilters.push(filter);
    };
    
    // Return true if the given fixture should be considered for ray intersection.
    game.world.prototype.RayCollide = function(userData, fixture) {
        // Sensors should always collide
        if (!fixture.IsSensor()) {
            for( var i = 0; i < this.collisionFilters.length; i++ ) {
                if (this.collisionFilters[i].RayCollide) {
                    if (!this.collisionFilters[i].RayCollide(userData, fixture)) {
                        return false;
                    }
                }
            }
        }
        return Box2D.Dynamics.b2ContactFilter.prototype.RayCollide(userData, fixture);
    };
    
    // Return true if contact calculations should be performed between these two fixtures.
    game.world.prototype.ShouldCollide = function(fixtureA, fixtureB) {
        // Sensors should always collide
        if(!(fixtureA.IsSensor() || fixtureB.IsSensor())) {
            for( var i = 0; i < this.collisionFilters.length; i++ ) {
                if (this.collisionFilters[i].ShouldCollide) {
                    if (!this.collisionFilters[i].ShouldCollide(fixtureA, fixtureB)) {
                        return false;
                    }
                }
            }
        }
        return Box2D.Dynamics.b2ContactFilter.prototype.ShouldCollide(fixtureA, fixtureB);
    };
    
    //Called when two fixtures begin to touch.
    game.world.prototype.BeginContact = function(contact) {
        for( var i = 0; i < this.collisionFilters.length; i++ ) {
            // Called when two fixtures begin to touch, before BeginContact
            // Should be actions that can disable contact - contact may already be disabled
            if (this.collisionFilters[i].ValidateBeginContact) {
                this.collisionFilters[i].ValidateBeginContact(contact);
            }
            if(contact.disabled) {
                contact.SetEnabled(false);
            }
            // Called when two fixtures begin to touch, after ValidateBeginContact
            // Should be actions that can not disable contact - contact may already be disabled
            if (this.collisionFilters[i].BeginContact) {
                this.collisionFilters[i].BeginContact(contact);
            }
        }
    };
    
    //Called when two fixtures cease to touch.
    game.world.prototype.EndContact = function(contact) {
        for( var i = 0; i < this.collisionFilters.length; i++ ) {
            if (this.collisionFilters[i].EndContact) {
                this.collisionFilters[i].EndContact(contact);
            }
        }
        contact.disabled = false;
        contact.SetEnabled(true);
    };
    
    // This is called after a contact is updated.
    game.world.prototype.PreSolve = function(contact, oldManifold) {
        if(contact.disabled) {
            contact.SetEnabled(false);
        }
        for( var i = 0; i < this.collisionFilters.length; i++ ) {
            if (this.collisionFilters[i].PreSolve) {
                this.collisionFilters[i].PreSolve(contact, oldManifold);
            }
        }
    };
    
    // This lets you inspect a contact after the solver is finished.
    game.world.prototype.PostSolve = function(contact, impulse) {
        for( var i = 0; i < this.collisionFilters.length; i++ ) {
            if (this.collisionFilters[i].PostSolve) {
                this.collisionFilters[i].PostSolve(contact, impulse);
            }
        }
    };
    
    game.world.prototype.getBox2DBodyDefinition = function() {
        return bodyDefinition;
    };
    
    game.world.prototype.getBox2DFixtureDefinition = function() {
        return fixtureDefinition;
    };
    
    game.world.prototype.getWorldWidth = function() {
        return this.worldSize.x;
    };
    
    game.world.prototype.getWorldHeight = function() {
        return this.worldSize.y;
    };
    
    game.world.prototype.createScenery = function(size, position, zOffset) {
        zOffset = zOffset || 0;
        var obj = this._createObject(size, position, true /* visible */);
        this.game.getViewport().setZOffset(obj, game.ui.viewport.LAYERS.SCENERY + zOffset);
        return obj;
    };
    
    game.world.prototype.createStaticBox = function(size, position, visible, bodyArgs, fixtureArgs) {
        bodyArgs = bodyArgs || {};
        bodyArgs.type = Box2D.Dynamics.b2Body.b2_staticBody;
        return this.createBox(size, position, visible, bodyArgs, fixtureArgs);
    };
    
    game.world.prototype.createBox = function(size, position, visible, bodyArgs, fixtureArgs) {
        var shape = new Box2D.Collision.Shapes.b2PolygonShape();
        shape.SetAsBox(size.x / 2, size.y / 2);
        return this.createObject(size, position, visible, shape, { bodyArgs: bodyArgs, fixtureArgs: fixtureArgs });
    };
    
    game.world.prototype.createSafeBox = function(size, position, visible, args) {
        var shape = new Box2D.Collision.Shapes.b2PolygonShape();
        //shape.SetAsBox(size.x / 2, size.y / 2);
        // Make the boxes have slightly angled edges to avoid having things get stuck (lousy floating point rounding!)
        var halfSize = new Box2D.Common.Math.b2Vec2(size.x / 2, size.y / 2);
        var edging = 0.01;
        shape.SetAsArray([
            new Box2D.Common.Math.b2Vec2(0, halfSize.y),
            new Box2D.Common.Math.b2Vec2(-halfSize.x + edging, halfSize.y - edging),
            new Box2D.Common.Math.b2Vec2(-halfSize.x, 0),
            new Box2D.Common.Math.b2Vec2(-halfSize.x + edging, -halfSize.y + edging),
            new Box2D.Common.Math.b2Vec2(0, -halfSize.y),
            new Box2D.Common.Math.b2Vec2(halfSize.x - edging, -halfSize.y + edging),
            new Box2D.Common.Math.b2Vec2(halfSize.x, 0),
            new Box2D.Common.Math.b2Vec2(halfSize.x - edging, halfSize.y - edging)
            ]);
        return this.createObject(size, position, visible, shape, args);
    };
    
    game.world.prototype._doWhenUnlocked = function(action) {
        if(this.b2World.IsLocked()) {
            this.queuedActions.push(action);
        } else {
            action.apply(this);
        }
    };
    
    game.world.prototype.createObject = function(size, position, visible, shape, args) {
        var object = this._createObject(size, position, visible);
        if (!args.scenery) {
            this._doWhenUnlocked(function() { this._createBox2DObject(object, size, position, shape, args); });
        }
        return object;
    };
    
    game.world.prototype._createObject = function(size, position, visible) {
        var object = new game.gameObject(position);
        this.objects[object.UID] = object;
        if (visible !== false) {
            this.game.getViewport().setDisplaySize(object, size);
        }
        return object;
    };
    
    game.world.prototype._createBox2DObject = function(object, size, position, shape, args) {
        args = args || {};
        var bodyArgs = argsOrBodyDefaults(args.bodyArgs);
        bodyDefinition.type = bodyArgs.type;
        bodyDefinition.angle = bodyArgs.angle;
        bodyDefinition.fixedRotation = bodyArgs.fixedRotation;
        bodyDefinition.position = position;
        var body = this.b2World.CreateBody(bodyDefinition);
        fixture = this.addFixture(body, shape, args);
        object.body = body;
        object.fixture = fixture;
        body.object = object;
        return object;
    };
    
    game.world.prototype.addFixture = function(body, shape, args) {
        args = args || {};
        var fixtureArgs = argsOrFixtureDefaults(args.fixtureArgs);
        fixtureDefinition.density = fixtureArgs.density;
        fixtureDefinition.friction = fixtureArgs.friction;
        fixtureDefinition.restitution = fixtureArgs.restitution;
        fixtureDefinition.isSensor = fixtureArgs.isSensor;
        fixtureDefinition.shape = shape;
        var fixture = body.CreateFixture(fixtureDefinition);
        return fixture;
    };
    
    game.world.prototype.destroyObject = function(object) {
        this._doWhenUnlocked(function() {
            if (object.body) {
                this.b2World.DestroyBody(object.body);
            }
            delete this.objects[object.UID];
        });
    };
    
    game.world.prototype.moveObject = function(object, newPosition) {
        this._doWhenUnlocked(function() { object.setPosition(newPosition); });
    };
})(game);

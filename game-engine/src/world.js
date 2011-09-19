goog.provide('illandril.game.world');

goog.require('Box2D.Collision.Shapes.b2PolygonShape');
goog.require('Box2D.Common.Math.b2Vec2');
goog.require('Box2D.Dynamics.b2BodyDef');
goog.require('Box2D.Dynamics.b2ContactFilter');
goog.require('Box2D.Dynamics.b2FixtureDef');
goog.require('Box2D.Dynamics.b2World');

goog.require('illandril.game.gameObject');
goog.require('illandril.game.ui.viewport');


/**
 * @param {!illandril.game.game} game
 * @param {!Box2D.Common.Math.b2Vec2} worldSize
 * @param {!Box2D.Common.Math.b2Vec2} gravity
 * @constructor
 */
illandril.game.world = function(game, worldSize, gravity) {
    this.queuedActions = [];
    this.collisionFilters = [];
    
    this.nextObjectID = 0;
    this.objects = {};
    
    this.game = game;
    this.worldSize = new Box2D.Common.Math.b2Vec2(worldSize.x, worldSize.y);
    this.b2World = new Box2D.Dynamics.b2World( gravity, true /* allow sleep */ );
    this.b2World.SetContactFilter(this);
    this.b2World.SetContactListener(this);
    
    // Add in the boundries
    var boundryWidth = 5;
    this.top = this.createStaticBox(new Box2D.Common.Math.b2Vec2(this.worldSize.x + boundryWidth, boundryWidth), new Box2D.Common.Math.b2Vec2(this.worldSize.x / 2, -boundryWidth / 2), false /* visible */, null, { friction: 0} );
    this.bottom = this.createStaticBox(new Box2D.Common.Math.b2Vec2(this.worldSize.x + boundryWidth, boundryWidth), new Box2D.Common.Math.b2Vec2(this.worldSize.x / 2, this.worldSize.y + boundryWidth / 2), false /* visible */, null, { friction: 0});
    this.left = this.createStaticBox(new Box2D.Common.Math.b2Vec2(boundryWidth, this.worldSize.y + boundryWidth), new Box2D.Common.Math.b2Vec2(-boundryWidth / 2, this.worldSize.y / 2), false /* visible */, null, { friction: 0});
    this.right = this.createStaticBox(new Box2D.Common.Math.b2Vec2(boundryWidth, this.worldSize.y + boundryWidth), new Box2D.Common.Math.b2Vec2(this.worldSize.x + boundryWidth / 2, this.worldSize.y / 2), false /* visible */, null, { friction: 0});
};

/**
 * @param {number} time
 * @param {number} tick
 */
illandril.game.world.prototype.update = function(time, tick) {
    this.b2World.Step(tick /* time delta (sec) */, illandril.game.world.frameSteps /* Velocity Iterations */, illandril.game.world.frameSteps /* Position Iterations */);
    this.b2World.ClearForces();
    var prevQueuedActions = this.queuedActions;
    this.queuedActions = [];
    if (prevQueuedActions.length > 0) {
        for (var i = 0; i < prevQueuedActions.length; i++) {
            prevQueuedActions[i].call(this);
        }
    }
};

/**
 * @return {!Box2D.Dynamics.b2World}
 */
illandril.game.world.prototype.getBox2DWorld = function() {
    return this.b2World;
};

illandril.game.world.prototype.addCollisionFilter = function(filter) {
    this.collisionFilters.push(filter);
};

// Return true if the given fixture should be considered for ray intersection.
illandril.game.world.prototype.RayCollide = function(userData, fixture) {
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
illandril.game.world.prototype.ShouldCollide = function(fixtureA, fixtureB) {
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
illandril.game.world.prototype.BeginContact = function(contact) {
    var fixtureA = contact.GetFixtureA();
    var bodyA = fixtureA.GetBody();
    var objectA = bodyA.object;
    var fixtureB = contact.GetFixtureB();
    var bodyB = fixtureB.GetBody();
    var objectB = bodyB.object;
    
    // Called when two fixtures begin to touch, before BeginContact
    // Should be actions that can disable contact - contact may already be disabled
    for (var i = 0; i < objectA.ValidateBeginContactActions.length; i++) {
        objectA.ValidateBeginContactActions[i](contact, objectA, bodyA, fixtureA, objectB, bodyB, fixtureB);
    }
    
    for (var i = 0; i < objectB.ValidateBeginContactActions.length; i++) {
        objectB.ValidateBeginContactActions[i](contact, objectB, bodyB, fixtureB, objectA, bodyA, fixtureA);
    }
    
    for( var i = 0; i < this.collisionFilters.length; i++ ) {
        if (this.collisionFilters[i].ValidateBeginContact) {
            this.collisionFilters[i].ValidateBeginContact(contact);
        }
        if(contact.disabled) {
            contact.SetEnabled(false);
        }
    }
    
    
    // Called when two fixtures begin to touch, after ValidateBeginContact
    // Should be actions that can not disable contact - contact may already be disabled
    for (var i = 0; i < objectA.BeginContactActions.length; i++) {
        objectA.BeginContactActions[i](contact, objectA, bodyA, fixtureA, objectB, bodyB, fixtureB);
    }
    
    for (var i = 0; i < objectB.BeginContactActions.length; i++) {
        objectB.BeginContactActions[i](contact, objectB, bodyB, fixtureB, objectA, bodyA, fixtureA);
    }
    
    for( var i = 0; i < this.collisionFilters.length; i++ ) {
        if (this.collisionFilters[i].BeginContact) {
            this.collisionFilters[i].BeginContact(contact);
        }
    }
};

//Called when two fixtures cease to touch.
illandril.game.world.prototype.EndContact = function(contact) {
    for( var i = 0; i < this.collisionFilters.length; i++ ) {
        if (this.collisionFilters[i].EndContact) {
            this.collisionFilters[i].EndContact(contact);
        }
    }
    contact.disabled = false;
    contact.SetEnabled(true);
};

// This is called after a contact is updated.
illandril.game.world.prototype.PreSolve = function(contact, oldManifold) {
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
illandril.game.world.prototype.PostSolve = function(contact, impulse) {
    for( var i = 0; i < this.collisionFilters.length; i++ ) {
        if (this.collisionFilters[i].PostSolve) {
            this.collisionFilters[i].PostSolve(contact, impulse);
        }
    }
};

illandril.game.world.prototype.getWorldWidth = function() {
    return this.worldSize.x;
};

illandril.game.world.prototype.getWorldHeight = function() {
    return this.worldSize.y;
};

illandril.game.world.prototype.createScenery = function(size, position, zOffset) {
    zOffset = zOffset || 0;
    var obj = this._createObject(size, position, true /* visible */);
    this.game.getViewport().setZOffset(obj, illandril.game.ui.viewport.LAYERS.SCENERY + zOffset);
    return obj;
};

illandril.game.world.prototype.createStaticBox = function(size, position, visible, bodyArgs, fixtureArgs) {
    bodyArgs = bodyArgs || {};
    bodyArgs.type = Box2D.Dynamics.b2BodyDef.b2_staticBody;
    return this.createBox(size, position, visible, { bodyArgs: bodyArgs, fixtureArgs: fixtureArgs });
};

illandril.game.world.prototype.createBox = function(size, position, visible, args) {
    var shape = new Box2D.Collision.Shapes.b2PolygonShape();
    shape.SetAsBox(size.x / 2, size.y / 2);
    return this.createObject(size, position, visible, shape, args);
};

illandril.game.world.prototype.createSafeBox = function(size, position, visible, args) {
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

illandril.game.world.prototype._doWhenUnlocked = function(action) {
    if(this.b2World.IsLocked()) {
        this.queuedActions.push(action);
    } else {
        action.apply(this);
    }
};

illandril.game.world.prototype.createObject = function(size, position, visible, shape, args) {
    var object = this._createObject(size, position, visible);
    this._doWhenUnlocked(function() { this._createBox2DObject(object, size, position, shape, args); });
    return object;
};

illandril.game.world.prototype._createObject = function(size, position, visible) {
    var object = new illandril.game.gameObject(position);
    this.objects[object.UID] = object;
    if (visible !== false) {
        this.game.getViewport().setDisplaySize(object, size);
    }
    return object;
};

illandril.game.world.prototype._createBox2DObject = function(object, size, position, shape, args) {
    args = args || {};
    var bodyArgs = illandril.game.world.argsOrBodyDefaults(args.bodyArgs);
    var bodyDef = new Box2D.Dynamics.b2BodyDef();
    bodyDef.type = bodyArgs.type;
    bodyDef.angle = bodyArgs.angle;
    bodyDef.fixedRotation = bodyArgs.fixedRotation;
    bodyDef.position = position;
    var body = this.b2World.CreateBody(bodyDef);
    var fixture = this.addFixture(body, shape, args);
    object.body = body;
    object.fixture = fixture;
    body.object = object;
    return object;
};

illandril.game.world.prototype.addFixture = function(body, shape, args) {
    args = args || {};
    var fixtureArgs = illandril.game.world.argsOrFixtureDefaults(args.fixtureArgs);
    var fixtureDef = new Box2D.Dynamics.b2FixtureDef();
    fixtureDef.density = fixtureArgs.density;
    fixtureDef.friction = fixtureArgs.friction;
    fixtureDef.restitution = fixtureArgs.restitution;
    fixtureDef.isSensor = fixtureArgs.isSensor;
    fixtureDef.shape = shape;
    var fixture = body.CreateFixture(fixtureDef);
    return fixture;
};

illandril.game.world.prototype.destroyObject = function(object) {
    this._doWhenUnlocked(function() {
        if (object.body) {
            this.b2World.DestroyBody(object.body);
        }
        delete this.objects[object.UID];
    });
};

illandril.game.world.prototype.moveObject = function(object, newPosition) {
    this._doWhenUnlocked(function() { object.setPosition(newPosition); });
};

// Statics

illandril.game.world.frameSteps = 10;

illandril.game.world.fixtureDefaults = {
    density: 0.10,
    friction: 0.6,
    restitution: 0.01,
    isSensor: false
};

illandril.game.world.bodyDefaults = {
    fixedRotation: false,
    angle: 0,
    type: Box2D.Dynamics.b2BodyDef.b2_dynamicBody
};

illandril.game.world.argsOrDefaults = function(args, defaults) {
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

illandril.game.world.argsOrFixtureDefaults = function(args) {
    return illandril.game.world.argsOrDefaults(args, illandril.game.world.fixtureDefaults);
};

illandril.game.world.argsOrBodyDefaults = function(args) {
    return illandril.game.world.argsOrDefaults(args, illandril.game.world.bodyDefaults);
};


/*

Known issues:
1. Ground-detection logic isn't very good for rotating objects
   If a rotating object starts out vertical, and ends up picking up the jumper, jumper still cannot jump
   If a rotating object starts out underneath the jumper, and ends up next to or above, jumper can still jump
   This issue makes it more challenging to fix steep surface issue (see below)
2. Ground-detection logic allows jumping on very, very, very steep surfaces
   Fixing this would increase the issues with rotating objects (see above)
3. DirectionalActions onEnd doesn't work yet
4. DirectionalActions and Siding is based on the World Normal, so "Top" for an upside-down object is the object's bottom

*/

goog.provide('illandril.game.platformer');

goog.require('Box2D.Collision.b2WorldManifold');
goog.require('Box2D.Collision.Shapes.b2PolygonShape');
goog.require('Box2D.Common.Math.b2Vec2');
goog.require('illandril.game.controls.action');

/**
 * @param {!illandril.game.game} theGame
 * @constructor
 */
illandril.game.platformer = function(theGame) {
    this.game = theGame;
    this.game.getWorld().addCollisionFilter(this);
};


illandril.game.platformer.prototype.createPlayer = function(size, position) {
    var args = {
        bodyArgs: {
            fixedRotation: true
        },
        fixtureArgs: {
            restitution: 0
        }
    };
    var player = this.game.getWorld().createSafeBox(size, position, true /* visible */, args);
    illandril.game.platformer.initializeJumper(player, illandril.game.platformer.DEFAULTS.PLAYER_SPEED);
    illandril.game.platformer.initializeMover(player, illandril.game.platformer.DEFAULTS.PLAYER_SPEED, illandril.game.platformer.DEFAULTS.PLAYER_ACCELERATION);
    illandril.game.platformer.initializeLiving(player, illandril.game.platformer.LIVING_FILTERS.PLAYER);
    
    // Add left/right edge to the player so they slide against walls
    var shape = new Box2D.Collision.Shapes.b2PolygonShape();
    var halfSize = new Box2D.Common.Math.b2Vec2(size.x / 2, size.y / 2);
    var edging = 0.01;
    shape.SetAsArray([
        new Box2D.Common.Math.b2Vec2(-halfSize.x + edging, halfSize.y - edging),
        new Box2D.Common.Math.b2Vec2(-halfSize.x - edging, 0),
        new Box2D.Common.Math.b2Vec2(-halfSize.x + edging, -halfSize.y + edging),
        new Box2D.Common.Math.b2Vec2(halfSize.x - edging, -halfSize.y + edging),
        new Box2D.Common.Math.b2Vec2(halfSize.x + edging, 0),
        new Box2D.Common.Math.b2Vec2(halfSize.x - edging, halfSize.y - edging)
        ]);
    player.edging = this.game.getWorld().addFixture(player.body, shape, { fixtureArgs: { friction: 0 } });
    
    player.actions = {};
    player.actions.moveUp = new illandril.game.controls.action(function(tickTime) {
        player.platformerRules.jumper.jump();
    }, 'Move Up', true);
    player.actions.moveDown = new illandril.game.controls.action(function(tickTime) {
        // Duck? Drop down through floor?
    }, 'Move Down', true);
    player.actions.moveLeft = new illandril.game.controls.action(function(tickTime) {
        player.platformerRules.mover.moveLeft();
    }, 'Move Left', true);
    player.actions.moveRight = new illandril.game.controls.action(function(tickTime) {
        player.platformerRules.mover.moveRight();
    }, 'Move Right', true);
    
    return player;
};

(function(platformer){
    platformer.NORMAL_ERROR = 0.1; // Ensure solid hits for breaking, jump surfaces, etc
    platformer.DEFAULT_GRAVITY = new Box2D.Common.Math.b2Vec2( 0, 9.8 );
    platformer.DEFAULTS = {
        GRAVITY: new Box2D.Common.Math.b2Vec2( 0, 9.8 ),
        JUMP_IMPULSE_MODIFIER: 1.5,
        PLAYER_SPEED: 8,
        PLAYER_ACCELERATION: 1
    };
    
    platformer.RULE_TYPES = {
        DIRECTIONAL_SIDING: parseInt('1', 2),
        JUMPER:             parseInt('10', 2),
        MOVER:              parseInt('100', 2),
        BREAKABLE:          parseInt('1000', 2),
        DEATHTRIGGER:       parseInt('10000', 2),
        LIVING:             parseInt('100000', 2),
        DIRECTIONAL_ACTION: parseInt('1000000', 2)
    };
    
    platformer.LIVING_FILTERS = {
        PLAYER: parseInt('1', 2),
        ALLY:   parseInt('10', 2),
        ENEMY:  parseInt('100', 2)
    };
    
    platformer.SIDES = {
        TOP:    parseInt('1', 2),
        LEFT:   parseInt('10', 2),
        BOTTOM: parseInt('100', 2),
        RIGHT:  parseInt('1000', 2)
    };
    
    platformer.initializeDirectionalSiding = function(platform, falseSides) {
        platform.platformerRules = platform.platformerRules || {};
        platform.platformerRules.type |= platformer.RULE_TYPES.DIRECTIONAL_SIDING;
        platform.platformerRules.directionalSiding = {
            noTop: falseSides & platformer.SIDES.TOP,
            noBottom: falseSides & platformer.SIDES.BOTTOM,
            noLeft: falseSides & platformer.SIDES.LEFT,
            noRight: falseSides & platformer.SIDES.RIGHT
        };

    };
    
    platformer.initializeJumper = function(jumper, jumpSpeed) {
        jumper.platformerRules = jumper.platformerRules || {};
        jumper.platformerRules.type |= platformer.RULE_TYPES.JUMPER;
        jumper.platformerRules.jumper = {
            grounds: [],
            speed: jumpSpeed,
            jump: function() {
                var grounds = jumper.platformerRules.jumper.grounds;
                if (grounds.length > 0) {
                    var impulse = jumper.body.GetMass() * jumper.platformerRules.jumper.speed * platformer.DEFAULTS.JUMP_IMPULSE_MODIFIER;
                    var newPos = jumper.body.GetWorldCenter();
                    // Stop all current Y motion, so we don't give too much or too little velocity from the jump
                    // (hopefully it will already be 0 or very, very close to 0 in most situations)
                    var velocity = jumper.body.GetLinearVelocity();
                    velocity.y = 0;
                    jumper.body.SetLinearVelocity(velocity);
                    jumper.body.ApplyImpulse(new Box2D.Common.Math.b2Vec2(0,-impulse), newPos);
                    // Known bug: This might cause a double-impulse to the ground in some situations (when velocity is not 0 above)
                    for(var i = 0; i < grounds.length; i++) {
                        grounds[i].body.ApplyImpulse(new Box2D.Common.Math.b2Vec2(0,impulse / grounds.length), newPos);
                    }
                }
            }
        };
    };
    
    platformer.initializeMover = function(mover, speed, acceleration) {
        mover.platformerRules = mover.platformerRules || {};
        mover.platformerRules.type |= platformer.RULE_TYPES.JUMPER;
        mover.platformerRules.mover = {
            acceleration: acceleration,
            speed: speed,
            moveRight: function() {
                var vel = mover.body.GetLinearVelocity();
                var desiredVel = Math.min(vel.x + mover.platformerRules.mover.acceleration, mover.platformerRules.mover.speed);
                var velChange = desiredVel - vel.x;
                if (velChange > 0 ) {
                    var imp = mover.body.GetMass() * velChange;
                    mover.body.ApplyImpulse(new Box2D.Common.Math.b2Vec2(imp,0), mover.body.GetWorldCenter());
                }
            },
            moveLeft: function() {
                var vel = mover.body.GetLinearVelocity();
                var desiredVel = Math.max(vel.x - mover.platformerRules.mover.acceleration, -mover.platformerRules.mover.speed);
                var velChange = desiredVel - vel.x;
                if (velChange < 0 ) {
                    var imp = mover.body.GetMass() * velChange;
                    mover.body.ApplyImpulse(new Box2D.Common.Math.b2Vec2(imp,0), mover.body.GetWorldCenter());
                }
            }
        };
    };
    
    platformer.initializeDirectionalAction = function(platform, action, sidesOnBegin, sidesOnEnd) {
        platform.platformerRules = platform.platformerRules || {};
        platform.platformerRules.type |= platformer.RULE_TYPES.DIRECTIONAL_ACTION;
        platform.platformerRules.directionalActions = platform.platformerRules.directionalActions || {};
        if ( sidesOnBegin & platformer.SIDES.TOP ) {
            platform.platformerRules.directionalActions.hasOnBegin = true;
            platform.platformerRules.directionalActions.topOnBegin = platform.platformerRules.directionalActions.topOnBegin || [];
            platform.platformerRules.directionalActions.topOnBegin.push(action);
        }
        if ( sidesOnBegin & platformer.SIDES.BOTTOM ) {
            platform.platformerRules.directionalActions.hasOnBegin = true;
            platform.platformerRules.directionalActions.bottomOnBegin = platform.platformerRules.directionalActions.bottomOnBegin || [];
            platform.platformerRules.directionalActions.bottomOnBegin.push(action);
        }
        if ( sidesOnBegin & platformer.SIDES.LEFT ) {
            platform.platformerRules.directionalActions.hasOnBegin = true;
            platform.platformerRules.directionalActions.leftOnBegin = platform.platformerRules.directionalActions.leftOnBegin || [];
            platform.platformerRules.directionalActions.leftOnBegin.push(action);
        }
        if ( sidesOnBegin & platformer.SIDES.RIGHT ) {
            platform.platformerRules.directionalActions.hasOnBegin = true;
            platform.platformerRules.directionalActions.rightOnBegin = platform.platformerRules.directionalActions.rightOnBegin || [];
            platform.platformerRules.directionalActions.rightOnBegin.push(action);
        }
        if ( sidesOnEnd & platformer.SIDES.TOP ) {
            platform.platformerRules.directionalActions.hasOnEnd = true;
            platform.platformerRules.directionalActions.topOnEnd = platform.platformerRules.directionalActions.topOnEnd || [];
            platform.platformerRules.directionalActions.topOnEnd.push(action);
        }
        if ( sidesOnEnd & platformer.SIDES.BOTTOM ) {
            platform.platformerRules.directionalActions.hasOnEnd = true;
            platform.platformerRules.directionalActions.bottomOnEnd = platform.platformerRules.directionalActions.bottomOnEnd || [];
            platform.platformerRules.directionalActions.bottomOnEnd.push(action);
        }
        if ( sidesOnEnd & platformer.SIDES.LEFT ) {
            platform.platformerRules.directionalActions.hasOnEnd = true;
            platform.platformerRules.directionalActions.leftOnEnd = platform.platformerRules.directionalActions.leftOnEnd || [];
            platform.platformerRules.directionalActions.leftOnEnd.push(action);
        }
        if ( sidesOnEnd & platformer.SIDES.RIGHT ) {
            platform.platformerRules.directionalActions.hasOnEnd = true;
            platform.platformerRules.directionalActions.rightOnEnd = platform.platformerRules.directionalActions.rightOnEnd || [];
            platform.platformerRules.directionalActions.rightOnEnd.push(action);
        }
    };
    
    platformer.initializeDeathTrigger = function(platform, respawnPoint, filter) {
        platform.platformerRules = platform.platformerRules || {};
        platform.platformerRules.type |= platformer.RULE_TYPES.DEATHTRIGGER;
        platform.platformerRules.deathTrigger = {
            respawnPoint: respawnPoint,
            filter: filter || 0
        };
    };
    
    platformer.initializeLiving = function(platform, filter) {
        platform.platformerRules = platform.platformerRules || {};
        platform.platformerRules.type |= platformer.RULE_TYPES.LIVING;
        platform.platformerRules.living = {
            filter: filter
        };
    };
    
    // Return true if the given fixture should be considered for ray intersection.
    platformer.prototype.RayCollide = null; //function(userData, fixture) {} 
    
    // Return true if contact calculations should be performed between these two fixtures.
    platformer.prototype.ShouldCollide = null; //function(fixtureA, fixtureB) {};
    
    //Called when two fixtures begin to touch, before BeginContact (should be actions that can disable contact)
    platformer.prototype.ValidateBeginContact = function(contact) {
        var fixtureA = contact.GetFixtureA();
        var bodyA = fixtureA.GetBody();
        var objectA = bodyA.object;
        var fixtureB = contact.GetFixtureB();
        var bodyB = fixtureB.GetBody();
        var objectB = bodyB.object;
        if (!contact.disabled && objectA && objectA.platformerRules) {
            this._ValidateBeginPlatformerContact(contact, objectA, bodyA, fixtureA, objectB, bodyB, fixtureB);
        }
        if (!contact.disabled && objectB && objectB.platformerRules) {
            this._ValidateBeginPlatformerContact(contact, objectB, bodyB, fixtureB, objectA, bodyA, fixtureA);
        }
    };
    
    platformer.prototype._ValidateBeginPlatformerContact = function(contact, objectA, bodyA, fixtureA, objectB, bodyB, fixtureB) {
        if (objectA.platformerRules.type & platformer.RULE_TYPES.DIRECTIONAL_SIDING) {
            contact.disabled = true;
            var m = new Box2D.Collision.b2WorldManifold();
            contact.GetWorldManifold(m);
            var normal = m.m_normal;
            /* This should really be the normal for the directional sided object
            var m = contact.GetManifold();
            var normal = m.m_localPlaneNormal;
            if(contact.GetFixtureB() == fixtureA) {
                normal = normal.GetNegative(); // This is wrong - need to transform the normal twice, once for each fixture
            }
            */
            if (!(objectA.platformerRules.directionalSiding.noTop) && normal.y > platformer.NORMAL_ERROR) {
                contact.disabled = false;
            } else if (!(objectA.platformerRules.directionalSiding.noBottom) && normal.y < -platformer.NORMAL_ERROR) {
                contact.disabled = false;
            } else if (!(objectA.platformerRules.directionalSiding.noRight) && normal.x > platformer.NORMAL_ERROR) {
                contact.disabled = false;
            } else if (!(objectA.platformerRules.directionalSiding.noLeft) && normal.x < -platformer.NORMAL_ERROR) {
                contact.disabled = false;
            } else {
            }
        }
    };
    
    //Called when two fixtures begin to touch, after ValidateBeginContact (should be actions that can not disable contact)
    platformer.prototype.BeginContact = function(contact) {
        if (contact.disabled) {
            // There are no actions that would be done to disabled contacts here
            return;
        }
        var fixtureA = contact.GetFixtureA();
        var bodyA = fixtureA.GetBody();
        var objectA = bodyA.object;
        var fixtureB = contact.GetFixtureB();
        var bodyB = fixtureB.GetBody();
        var objectB = bodyB.object;
        if (objectA && objectB) {
            if (objectA.platformerRules) {
                this._BeginPlatformerContact(contact, objectA, bodyA, fixtureA, objectB, bodyB, fixtureB);
            }
            if (objectB.platformerRules) {
                this._BeginPlatformerContact(contact, objectB, bodyB, fixtureB, objectA, bodyA, fixtureA);
            }
        }
    };
     // Contact rules depending on all other rules
    platformer.prototype._BeginPlatformerContact = function(contact, objectA, bodyA, fixtureA, objectB, bodyB, fixtureB) {
        if (objectA.platformerRules.type & platformer.RULE_TYPES.JUMPER) {
            var m = new Box2D.Collision.b2WorldManifold();
            contact.GetWorldManifold(m);
            var normal = m.m_normal;
            if (normal.y > platformer.NORMAL_ERROR) {
                var foundBody = false;
                for (var i = 0; i < objectA.platformerRules.jumper.grounds.length; i++) {
                    if (objectA.platformerRules.jumper.grounds[i].body == bodyB) {
                        objectA.platformerRules.jumper.grounds[i].count++;
                        foundBody = true;
                        break;
                    }
                }
                if (!foundBody) {
                    objectA.platformerRules.jumper.grounds.push({body: bodyB, count: 1});
                }
                contact.platformerGrounds = contact.platformerGrounds || [];
                contact.platformerGrounds.push({jumper: objectA, ground: bodyB});
            }
        }
        
        if (objectA.platformerRules.type & platformer.RULE_TYPES.DIRECTIONAL_ACTION) {
            var m = new Box2D.Collision.b2WorldManifold();
            contact.GetWorldManifold(m);
            var normal = m.m_normal;
            if (normal.y > platformer.NORMAL_ERROR && objectA.platformerRules.directionalActions.topOnBegin) {
                for (var i = 0; i < objectA.platformerRules.directionalActions.topOnBegin.length; i++) {
                    objectA.platformerRules.directionalActions.topOnBegin[i](contact);
                }
            } else if (normal.y < -platformer.NORMAL_ERROR && objectA.platformerRules.directionalActions.bottomOnBegin) {
                for (var i = 0; i < objectA.platformerRules.directionalActions.bottomOnBegin.length; i++) {
                    objectA.platformerRules.directionalActions.bottomOnBegin[i](contact);
                }
            }
            if (normal.x > platformer.NORMAL_ERROR && objectA.platformerRules.directionalActions.leftOnBegin) {
                for (var i = 0; i < objectA.platformerRules.directionalActions.leftOnBegin.length; i++) {
                    objectA.platformerRules.directionalActions.leftOnBegin[i](contact);
                }
            } else if (normal.x < -platformer.NORMAL_ERROR && objectA.platformerRules.directionalActions.rightOnBegin) {
                for (var i = 0; i < objectA.platformerRules.directionalActions.rightOnBegin.length; i++) {
                    objectA.platformerRules.directionalActions.rightOnBegin[i](contact);
                }
            }
        }
        
        if (objectA.platformerRules.type & platformer.RULE_TYPES.DEATHTRIGGER) {
            if (objectB.platformerRules && objectB.platformerRules.type & platformer.RULE_TYPES.LIVING) {
                if (objectA.platformerRules.deathTrigger.filter == 0 || objectA.platformerRules.deathTrigger.filter & objectB.platformerRules.living.filter) {
                    this.game.getWorld().moveObject(objectB, objectA.platformerRules.deathTrigger.respawnPoint);
                }
            }
        }
    };
    
    //Called when two fixtures cease to touch.
    platformer.prototype.EndContact = function(contact) {
        if (contact.platformerGrounds) {
            for (var j = 0; j < contact.platformerGrounds.length; j++) {
                var jumper = contact.platformerGrounds[j].jumper;
                var groundBody = contact.platformerGrounds[j].ground;
                var newGrounds = [];
                for (var i = 0; i < jumper.platformerRules.jumper.grounds.length; i++) {
                    if (jumper.platformerRules.jumper.grounds[i].body == groundBody) {
                        jumper.platformerRules.jumper.grounds[i].count--;
                        if (jumper.platformerRules.jumper.grounds[i].count > 0) {
                            newGrounds.push(jumper.platformerRules.jumper.grounds[i]);
                        }
                    } else {
                        newGrounds.push(jumper.platformerRules.jumper.grounds[i]);
                    }
                }
                jumper.platformerRules.jumper.grounds = newGrounds;
            }
            contact.platformerGrounds = null;
        }
        
        if (contact.disabled) {
            // There are no other actions that would be done to disabled contacts here
            return;
        }
        
        var fixtureA = contact.GetFixtureA();
        var bodyA = fixtureA.GetBody();
        var objectA = bodyA.object;
        var fixtureB = contact.GetFixtureB();
        var bodyB = fixtureB.GetBody();
        var objectB = bodyB.object;
        if (objectA && objectB) {
            if (objectA.platformerRules) {
                this._EndPlatformerContact(contact, objectA, bodyA, fixtureA, objectB, bodyB, fixtureB);
            }
            if (objectB.platformerRules) {
                this._EndPlatformerContact(contact, objectB, bodyB, fixtureB, objectA, bodyA, fixtureA);
            }
        }
    };
    
    // Contact rules depending on all other rules
    platformer.prototype._EndPlatformerContact = function(contact, objectA, bodyA, fixtureA, objectB, bodyB, fixtureB) {
        if (objectA.platformerRules.type & platformer.RULE_TYPES.DIRECTIONAL_ACTION && objectA.platformerRules.directionalActions.hasOnEnd) {
            // This does not currently work! Normal is always 0,0?
            var m = new Box2D.Collision.b2WorldManifold();
            contact.GetWorldManifold(m);
            var normal = m.m_normal;
            if (normal.y > platformer.NORMAL_ERROR && objectA.platformerRules.directionalActions.topOnEnd) {
                for (var i = 0; i < objectA.platformerRules.directionalActions.topOnEnd.length; i++) {
                    objectA.platformerRules.directionalActions.topOnEnd[i](contact);
                }
            } else if (normal.y < -platformer.NORMAL_ERROR && objectA.platformerRules.directionalActions.bottomOnEnd) {
                for (var i = 0; i < objectA.platformerRules.directionalActions.bottomOnEnd.length; i++) {
                    objectA.platformerRules.directionalActions.bottomOnEnd[i](contact);
                }
            }
            if (normal.x > platformer.NORMAL_ERROR && objectA.platformerRules.directionalActions.leftOnEnd) {
                for (var i = 0; i < objectA.platformerRules.directionalActions.leftOnEnd.length; i++) {
                    objectA.platformerRules.directionalActions.leftOnEnd[i](contact);
                }
            } else if (normal.x < -platformer.NORMAL_ERROR && objectA.platformerRules.directionalActions.rightOnEnd) {
                for (var i = 0; i < objectA.platformerRules.directionalActions.rightOnEnd.length; i++) {
                    objectA.platformerRules.directionalActions.rightOnEnd[i](contact);
                }
            }
        }
        
    };
    
    // This is called after a contact is updated.
    platformer.prototype.PreSolve = null; // function(contact, oldManifold) {};
    
    // This lets you inspect a contact after the solver is finished.
    platformer.prototype.PostSolve = null; //function(contact, impulse) {};
    
    platformer.prototype.createBlock = function(size, position) {
        return this.game.getWorld().createStaticBox(size, position, true /* visible */ );
    };
    
    platformer.prototype.createPlatform = function(size, position, falseSides) {
        var platform = this.game.getWorld().createStaticBox(size, position, true /* visible */, null, null );
        if ( falseSides === undefined || falseSides === null ) {
            falseSides = platformer.SIDES.BOTTOM | platformer.SIDES.LEFT | platformer.SIDES.RIGHT;
        }
        platformer.initializeDirectionalSiding(platform, falseSides);
        return platform;
    };
    
    platformer.prototype.initializeBreakable = function(obj, weakSides) {
        var self = this;
        platformer.initializeDirectionalAction(obj, function(contact){
            self.game.getWorld().destroyObject(obj);
        }, weakSides);
    };
    
    platformer.prototype.createBreakableBlock = function(size, position, weakSides) {
        var platform = this.game.getWorld().createStaticBox(size, position, true /* visible */, null, null );
        if ( weakSides === undefined || weakSides === null ) {
            weakSides = platformer.SIDES.BOTTOM;
        }
        this.initializeBreakable(platform, weakSides);
        return platform;
    };
    
    platformer.prototype.createDeathTrigger = function(size, position, respawnPoint) {
        var platform = this.game.getWorld().createStaticBox(size, position, true /* visible */, null, null );
        platformer.initializeDeathTrigger(platform, respawnPoint);
        return platform;
    };
})(illandril.game.platformer);
/*

Known issues:
1. Ground-detection logic isn't very good for rotating objects.
   If a rotating object starts out vertical, and ends up picking up the jumper, jumper still cannot jump
   If a rotating object starts out underneath the jumper, and ends up next to or above, jumper can still jump
   This issue makes it more challenging to fix steep surface issue (see below)
2. Ground-detection logic allows jumping on very, very, very steep surfaces
   Fixing this would increase the issues with rotating objects (see above)

*/

game = game || {};
goog.provide('game.platformer');
game.platformer = game.platformer || {};

goog.require('game.animations');
goog.require('game.ai');
goog.require('game.world');

(function(platformer){
    platformer.DEFAULT_GRAVITY = new Box2D.Common.Math.b2Vec2( 0, 9.8 );
    platformer.DEFAULTS = {
        GRAVITY: new Box2D.Common.Math.b2Vec2( 0, 9.8 ),
        JUMP_IMPULSE_MODIFIER: 2.25,
        PLAYER_SPEED: 5,
        PLAYER_ACCELERATION: 1
    };
    
    platformer.RULE_TYPES = {
        DIRECTIONAL_SIDING: 0x01,
        JUMPER: 0x02,
        MOVER: 0x04,
        BREAKABLE: 0x08
    };
    
    platformer.SIDES = {
        TOP: 0x01,
        LEFT: 0x02,
        BOTTOM: 0x04,
        RIGHT: 0x08
    };
    
    platformer.init = function() {
        game.world.addCollisionFilter(platformer);
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
    
    platformer.initializeBreakable = function(platform, weakSides) {
        platform.platformerRules = platform.platformerRules || {};
        platform.platformerRules.type |= platformer.RULE_TYPES.BREAKABLE;
        platform.platformerRules.breakable = {
            top: weakSides & platformer.SIDES.TOP,
            bottom: weakSides & platformer.SIDES.BOTTOM,
            left: weakSides & platformer.SIDES.LEFT,
            right: weakSides & platformer.SIDES.RIGHT
        };

    };
    
    platformer.createPlayer = function(size, position) {
        var player = game.world.createBox(size, position, true /* visible */, { fixedRotation: true } /* bodyArgs */, { restitution: 0 } /* fixtureArgs */);
        player.platformerRules = {};
        platformer.initializeJumper(player, platformer.DEFAULTS.PLAYER_SPEED);
        platformer.initializeMover(player, platformer.DEFAULTS.PLAYER_SPEED, platformer.DEFAULTS.PLAYER_ACCELERATION);
        
        // Add left/right edge to the player so they slide against walls
        var shape = new Box2D.Collision.Shapes.b2PolygonShape();
        shape.SetAsOrientedBox(0.01, size.y / 2, new Box2D.Common.Math.b2Vec2(-size.x / 2, 0));
        player.leftEdge = game.world.addFixture(player.body, { friction: 0 }, shape);
        shape.SetAsOrientedBox(0.01, size.y / 2, new Box2D.Common.Math.b2Vec2(size.x / 2, 0));
        player.rightEdge = game.world.addFixture(player.body, { friction: 0 }, shape);
        
        player.actions = {};
        player.actions.moveUp = new game.controls.action(function(tickTime) {
            player.platformerRules.jumper.jump();
        }, 'Move Up', true);
        player.actions.moveDown = new game.controls.action(function(tickTime) {
            /*
            var nextContact = player.body.GetContactList();
            while(nextContact != null) {
                if (nextContact.contact.IsTouching() && !nextContact.contact.IsSensor()) {
                    if (nextContact.contact.GetFixtureA().softBottom || nextContact.contact.GetFixtureB().softBottom) {
                        var pos = player.body.GetPosition();
                        pos.y += 1;
                        player.body.SetPosition(pos);
                        player.body.SetAwake(true)
                        return;
                    }
                }
                nextContact = nextContact.next;
            }
            */
            // Duck? Drop down through floor?
        }, 'Move Down', true);
        player.actions.moveLeft = new game.controls.action(function(tickTime) {
            player.platformerRules.mover.moveLeft();
        }, 'Move Left', true);
        player.actions.moveRight = new game.controls.action(function(tickTime) {
            player.platformerRules.mover.moveRight();
        }, 'Move Right', true);
        
        return player;
    };
    
    var getNoSensorBodyAABB = function(fixture) {
        var body = fixture.GetBody();
        var aabb = null;
        var f = body.GetFixtureList();
        while( f ) {
            if (!f.IsSensor()) {
                if (aabb === null) {
                    aabb = f.GetAABB();
                } else {
                    aabb = Box2D.Collision.b2AABB.Combine(aabb,f.GetAABB());
                }
            }
            f = f = f.GetNext();
        }
        return aabb;
    };
    
    
    // Return true if the given fixture should be considered for ray intersection.
    platformer.RayCollide = null; //function(userData, fixture) {} 
    
    // Return true if contact calculations should be performed between these two fixtures.
    platformer.ShouldCollide = null; //function(fixtureA, fixtureB) {};
    
    //Called when two fixtures begin to touch, before BeginContact (should be actions that can disable contact)
    platformer.ValidateBeginContact = function(contact) {
        var fixtureA = contact.GetFixtureA();
        var bodyA = fixtureA.GetBody();
        var objectA = bodyA.object;
        var fixtureB = contact.GetFixtureB();
        var bodyB = fixtureB.GetBody();
        var objectB = bodyB.object;
        if (!contact.disabled && objectA.platformerRules) {
            ValidateBeginPlatformerContact(contact, objectA, bodyA, fixtureA, objectB, bodyB, fixtureB);
        }
        if (!contact.disabled && objectB.platformerRules) {
            ValidateBeginPlatformerContact(contact, objectB, bodyB, fixtureB, objectA, bodyA, fixtureA);
        }
    };
    
    var ValidateBeginPlatformerContact = function(contact, objectA, bodyA, fixtureA, objectB, bodyB, fixtureB) {
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
            if (!(objectA.platformerRules.directionalSiding.noTop) && normal.y > 0) {
                contact.disabled = false;
            } else if (!(objectA.platformerRules.directionalSiding.noBottom) && normal.y < 0) {
                contact.disabled = false;
            } else if (!(objectA.platformerRules.directionalSiding.noRight) && normal.x > 0) {
                contact.disabled = false;
            } else if (!(objectA.platformerRules.directionalSiding.noLeft) && normal.x < 0) {
                contact.disabled = false;
            } else {
            }
        }
    };
    
    //Called when two fixtures begin to touch, after ValidateBeginContact (should be actions that can not disable contact)
    platformer.BeginContact = function(contact) {
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
        if (objectA.platformerRules) {
            BeginPlatformerContact(contact, objectA, bodyA, fixtureA, objectB, bodyB, fixtureB);
        }
        if (objectB.platformerRules) {
            BeginPlatformerContact(contact, objectB, bodyB, fixtureB, objectA, bodyA, fixtureA);
        }
    };
     // Contact rules depending on all other rules
    var BeginPlatformerContact = function(contact, objectA, bodyA, fixtureA, objectB, bodyB, fixtureB) {
        if (objectA.platformerRules.type & platformer.RULE_TYPES.JUMPER) {
            var m = new Box2D.Collision.b2WorldManifold();
            contact.GetWorldManifold(m);
            var normal = m.m_normal;
            if (normal.y > 0) {
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
        if (objectA.platformerRules.type & platformer.RULE_TYPES.BREAKABLE) {
            var m = new Box2D.Collision.b2WorldManifold();
            contact.GetWorldManifold(m);
            var normal = m.m_normal;
            if (normal.y > 0 && objectA.platformerRules.breakable.top) {
                game.world.destroyObject(objectA);
            } else if (normal.y < 0 && objectA.platformerRules.breakable.bottom) {
                game.world.destroyObject(objectA);
            } else if (normal.x > 0 && objectA.platformerRules.breakable.left) {
                game.world.destroyObject(objectA);
            } else if (normal.x < 0 && objectA.platformerRules.breakable.right) {
                game.world.destroyObject(objectA);
            }
        }
    };
    
    //Called when two fixtures cease to touch.
    platformer.EndContact = function(contact) {
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
    };
    
    // This is called after a contact is updated.
    platformer.PreSolve = null; // function(contact, oldManifold) {};
    
    // This lets you inspect a contact after the solver is finished.
    platformer.PostSolve = null; //function(contact, impulse) {};
    
    
    
    platformer.createBlock = function(size, position) {
        return game.world.createStaticBox(size, position, true /* visible */ );
    };
    
    platformer.createPlatform = function(size, position, falseSides) {
        var platform = game.world.createStaticBox(size, position, true /* visible */, { angle: Math.PI * Math.random() * 0 }, null );
        if ( falseSides === undefined || falseSides === null ) {
            falseSides = platformer.SIDES.BOTTOM | platformer.SIDES.LEFT | platformer.SIDES.RIGHT;
        }
        platformer.initializeDirectionalSiding(platform, falseSides);
        return platform;
    };
    
    platformer.createBreakableBlock = function(size, position, weakSides) {
        var platform = game.world.createStaticBox(size, position, true /* visible */, { angle: Math.PI * Math.random() * 0 }, null );
        if ( weakSides === undefined || weakSides === null ) {
            weakSides = platformer.SIDES.BOTTOM;
        }
        platformer.initializeBreakable(platform, weakSides);
        return platform;
    };
    
})(game.platformer);
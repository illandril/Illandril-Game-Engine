goog.require('game');

var test = {};

(function(test){
    var player;
    var controls;

test.init = function(gameContainerID, doDebug) {
    game.init(test, gameContainerID, doDebug);
    
    // Add in the spinners
    var jointDef = new Box2D.Dynamics.Joints.b2RevoluteJointDef();
    var weldJointDef = new Box2D.Dynamics.Joints.b2WeldJointDef();
    var flip = false;
    for ( var i = 10; i <= worldWidth - 10; i += 8 ) {
        game.world.getBox2DBodyDefinition().angle = i / worldWidth * PI;
        var y = worldHeight - 14;
        if ( flip ) {
            y = y + 8;
        }
        flip = !flip;
        var b0 = game.world.createStaticBox( 0.1, 0.1, i, y );
        b0.body.display = null; // Hide the middle joint
        var b1 = game.world.createBox( 10, 1, i, y );
        b1.body.display.spriteSheet = 'graphics/spinner.png';
        var b2 = game.world.createBox( 10, 1, i, y );
        b2.body.SetAngle(game.world.getBox2DBodyDefinition().angle + HALF_PI);
        b2.body.display.spriteSheet = 'graphics/spinner.png';
        jointDef.Initialize(b0.body, b1.body, b0.body.GetWorldCenter());
        game.world.getBox2DWorld().CreateJoint(jointDef);
        jointDef.Initialize(b0.body, b2.body, b0.body.GetWorldCenter());
        game.world.getBox2DWorld().CreateJoint(jointDef);
        weldJointDef.Initialize(b1.body, b2.body, b1.body.GetWorldCenter());
        game.world.getBox2DWorld().CreateJoint(weldJointDef);
    }
    
    game.world.getBox2DBodyDefinition().type = Box2D.Dynamics.b2Body.b2_dynamicBody;
    game.world.getBox2DBodyDefinition().position.y = worldHeight - 5;
    game.world.getBox2DBodyDefinition().position.x = 5;
    game.world.getBox2DBodyDefinition().angle = 0;
    game.world.getBox2DBodyDefinition().fixedRotation = true;
    game.world.getBox2DFixtureDefinition().restitution = 0;
    game.world.getBox2DFixtureDefinition().shape = new Box2D.Collision.Shapes.b2PolygonShape();
    game.world.getBox2DFixtureDefinition().shape.SetAsBox(0.5, 0.5); // If you change this, change player.display.size and groundSensor below
    player = game.world.getBox2DWorld().CreateBody(game.world.getBox2DBodyDefinition());
    player.acceleration = 1;
    player.speed = 5;
    player.CreateFixture(game.world.getBox2DFixtureDefinition());
    
    game.world.getBox2DFixtureDefinition().restitution = 0;
    game.world.getBox2DFixtureDefinition().isSensor = true;
    game.world.getBox2DFixtureDefinition().shape = new Box2D.Collision.Shapes.b2PolygonShape();
    game.world.getBox2DFixtureDefinition().shape.SetAsOrientedBox(0.49, 0.1, new Box2D.Common.Math.b2Vec2(0,0.49));
    player.groundSensor = player.CreateFixture(game.world.getBox2DFixtureDefinition());
    game.world.getBox2DFixtureDefinition().isSensor = false;
    
    player.display = {};
    player.display.size = new Box2D.Common.Math.b2Vec2(1.0, 1.0);
    player.display.spriteSheet = 'graphics/generic_character.png';
    player.display.spriteOffset = new Box2D.Common.Math.b2Vec2(0, 0);
    player.display.frameTick = 0;
    player.display.frameDir = {};
    player.think = function( tick ) {
        var MIN = 0.01;
        var MIN_N = -MIN;
        var E = 0;
        var W = 1;
        var N = 2;
        var S = 3;
        var vel = player.GetLinearVelocity();
        player.display.frameTick += tick;
        var absX = Math.abs(vel.x);
        var absY = Math.abs(vel.y);
        if (absY < MIN || absX >= absY) {
            if (vel.x > MIN) {
                player.display.frameDir.x = E;
                if (player.display.frameDir.a != E) {
                    player.display.frameDir.a = E;
                    player.display.frameTick = 0;
                }
                player.display.spriteOffset.x = Math.floor((player.display.frameTick * 5) % 2) * 20;
            } else if (vel.x < MIN_N) {
                player.display.frameDir.x = W;
                if (player.display.frameDir.a != W) {
                    player.display.frameDir.a = W;
                    player.display.frameTick = 0;
                }
                player.display.spriteOffset.x = Math.floor((player.display.frameTick * 5) % 2) * 20;
            } else {
                player.display.spriteOffset.x = 0;
            }
            if (player.display.frameDir.x == W) {
                player.display.spriteOffset.y = 60;
            } else {
                player.display.spriteOffset.y = 20;
            }
        } else {
            if (vel.y > MIN) {
                player.display.frameDir.y = S;
                if (player.display.frameDir.a != S) {
                    player.display.frameDir.a = S;
                    player.display.frameTick = 0;
                }
                player.display.spriteOffset.y = 40;
                player.display.spriteOffset.x = Math.floor((player.display.frameTick * 5) % 2) * 20;
            } else { // vel.y must be less than 0, because if it was 0 then we'd be in X logic
                player.display.frameDir.y = N;
                if (player.display.frameDir.a != N) {
                    player.display.frameDir.a = N;
                    player.display.frameTick = 0;
                }
                player.display.spriteOffset.y = 0;
                player.display.spriteOffset.x = Math.floor((player.display.frameTick * 5) % 2) * 20;
            }
        }
    };
    game.ai.addThinker(player);
    
    controls = new illandril.game.ui.Controls("main");
    
    var moveUp = new illandril.game.ui.Action(function(tickTime) {
        if (player.jumping) {
            return;
        }
        var ground = null;
        var nextContact = player.GetContactList();
        var fContact = nextContact;
        while(nextContact != null && ground == null) {
            if (nextContact.contact.IsTouching() && nextContact.contact.IsSensor()) {
                if (nextContact.contact.GetFixtureA() == player.groundSensor) {
                    ground = nextContact.contact.GetFixtureB().GetBody();
                } else if(nextContact.contact.GetFixtureB() == player.groundSensor) {
                    ground = nextContact.contact.GetFixtureA().GetBody();
                }
            }
            nextContact = nextContact.next;
        }
        if (ground != null) {
            var impulse = player.GetMass() * player.speed * 1.5;
            var newPos = player.GetWorldCenter();
            // Stop all current Y motion, so we don't give too much or too little velocity from the jump
            // (hopefully it will already be 0 or very, very close to 0 in most situations)
            var velocity = player.GetLinearVelocity();
            velocity.y = 0;
            player.SetLinearVelocity(velocity);
            player.ApplyImpulse(new Box2D.Common.Math.b2Vec2(0,-impulse), newPos);
            // Known bug: This might cause a double-impulse to the ground in some situations (when velocity is not 0 above)
            ground.ApplyImpulse(new Box2D.Common.Math.b2Vec2(0,impulse), newPos);
            player.jumping = true;
            setTimeout(function(){ player.jumping = false; }, 100);
        }
    }, 'Move Up', true);
    var moveDown = new illandril.game.ui.Action(function(tickTime) {
        // Duck? Drop down through floor?
    }, 'Move Down', true);
    var moveLeft = new illandril.game.ui.Action(function(tickTime) {
        var vel = player.GetLinearVelocity();
        var desiredVel = Math.max(vel.x - player.acceleration, -player.speed);
        var velChange = desiredVel - vel.x;
        if (velChange < 0 ) {
            var imp = player.GetMass() * velChange;
            player.ApplyImpulse(new Box2D.Common.Math.b2Vec2(imp,0), player.GetWorldCenter());
        }
    }, 'Move Left', true);
    var moveRight = new illandril.game.ui.Action(function(tickTime) {
        var vel = player.GetLinearVelocity();
        var desiredVel = Math.min(vel.x + player.acceleration, player.speed);
        var velChange = desiredVel - vel.x;
        if (velChange > 0 ) {
            var imp = player.GetMass() * velChange;
            player.ApplyImpulse(new Box2D.Common.Math.b2Vec2(imp,0), player.GetWorldCenter());
        }
    }, 'Move Right', true);
    controls.registerAction(moveUp, goog.events.KeyCodes.W, false, false, false);
    controls.registerAction(moveLeft, goog.events.KeyCodes.A, false, false, false);
    controls.registerAction(moveDown, goog.events.KeyCodes.S, false, false, false);
    controls.registerAction(moveRight, goog.events.KeyCodes.D, false, false, false);
    
    // Debug Objects
    game.world.getBox2DBodyDefinition().type = Box2D.Dynamics.b2Body.b2_dynamicBody;
    game.world.getBox2DBodyDefinition().fixedRotation = false;
    game.world.getBox2DFixtureDefinition().restitution = 2.5;
    game.world.getBox2DFixtureDefinition().shape = new Box2D.Collision.Shapes.b2CircleShape( 0.25 );
    for ( var i = 0; i < testObjects; i++ ) {
      var x = ( i * 5 ) % ( worldWidth - 10 );
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
      var x = ( i * 5 ) % ( worldWidth - 10 );
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
      var x = ( i * 5 ) % ( worldWidth - 10 );
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
      var x = ( i * 5 ) % ( worldWidth - 10 );
      game.world.getBox2DBodyDefinition().position.y = 15 + ( ( i + 15 ) % 20 );
      game.world.getBox2DBodyDefinition().position.x = x + ( ( i + 15 ) % 20 ) / 20 + 4.5;
      game.world.getBox2DBodyDefinition().angle = ( i % 35 ) / 35;
      var db3 = world.CreateBody(game.world.getBox2DBodyDefinition());
      db3.display = {};
      db3.display.size = new Box2D.Common.Math.b2Vec2( 0.75, 0.75 );
      db3.CreateFixture(game.world.getBox2DFixtureDefinition());
    }
    
    // Start the magic!
    game.start();
};

test.preThink = function(time, tick) {
    controls.handleKeyEvents(tick);
};
//test.preUpdate = function(time, tick) {};
test.preDraw = function(time, tick) {
    game.ui.lookAt(player.GetWorldCenter());
};

})(test);

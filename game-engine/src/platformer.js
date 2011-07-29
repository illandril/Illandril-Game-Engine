goog.provide('game.platformer');

goog.require('game.animations');
goog.require('game.ai');
goog.require('game.world');

game = game || {};
game.platformer = {};
(function(platformer){
    platformer.DEFAULT_GRAVITY = new Box2D.Common.Math.b2Vec2( 0, 9.8 );
    
    platformer.createPlayer = function(size, position) {
        var player = game.world.createBox(size, position, true /* visible */, { fixedRotation: true } /* bodyArgs */, { restitution: 0 } /* fixtureArgs */);
        /*
        game.world.getBox2DBodyDefinition().type = Box2D.Dynamics.b2Body.b2_dynamicBody;
        game.world.getBox2DBodyDefinition().position = position;
        game.world.getBox2DBodyDefinition().angle = 0;
        game.world.getBox2DBodyDefinition().fixedRotation = true;
        game.world.getBox2DFixtureDefinition().restitution = 0;
        game.world.getBox2DFixtureDefinition().shape = new Box2D.Collision.Shapes.b2PolygonShape();
        game.world.getBox2DFixtureDefinition().shape.SetAsBox(size.x / 2, size.y / 2);
        var player = game.world.getBox2DWorld().CreateBody(game.world.getBox2DBodyDefinition());
        */
        player.acceleration = 1;
        player.speed = 5;
        //player.CreateFixture(game.world.getBox2DFixtureDefinition());
        
        game.world.getBox2DFixtureDefinition().restitution = 0;
        game.world.getBox2DFixtureDefinition().isSensor = true;
        game.world.getBox2DFixtureDefinition().shape = new Box2D.Collision.Shapes.b2PolygonShape();
        game.world.getBox2DFixtureDefinition().shape.SetAsOrientedBox(size.x / 2 - size.x / 20, size.y / 20, new Box2D.Common.Math.b2Vec2(0, size.y / 2));
        player.groundSensor = player.body.CreateFixture(game.world.getBox2DFixtureDefinition());
        game.world.getBox2DFixtureDefinition().isSensor = false;
        
        player.actions = {};
        player.actions.moveUp = new illandril.game.ui.Action(function(tickTime) {
            if (player.jumping) {
                return;
            }
            //var velocity = player.body.GetLinearVelocity();
            //if (velocity.y < -player.speed) {
            //    console.error(velocity.y);
            //    console.error(player.body.GetInertia());
            //    return; // Only allow jumping on the way down (note: this may stop jumping when going up ramps)
            //}
            var ground = null;
            var nextContact = player.body.GetContactList();
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
                var impulse = player.body.GetMass() * player.speed * 1.75;
                var newPos = player.body.GetWorldCenter();
                // Stop all current Y motion, so we don't give too much or too little velocity from the jump
                // (hopefully it will already be 0 or very, very close to 0 in most situations)
                var velocity = player.body.GetLinearVelocity();
                velocity.y = 0;
                player.body.SetLinearVelocity(velocity);
                player.body.ApplyImpulse(new Box2D.Common.Math.b2Vec2(0,-impulse), newPos);
                // Known bug: This might cause a double-impulse to the ground in some situations (when velocity is not 0 above)
                ground.ApplyImpulse(new Box2D.Common.Math.b2Vec2(0,impulse), newPos);
                player.jumping = true;
                setTimeout(function(){ player.jumping = false; }, 100);
            }
        }, 'Move Up', true);
        player.actions.moveDown = new illandril.game.ui.Action(function(tickTime) {
            // Duck? Drop down through floor?
        }, 'Move Down', true);
        player.actions.moveLeft = new illandril.game.ui.Action(function(tickTime) {
            var vel = player.body.GetLinearVelocity();
            var desiredVel = Math.max(vel.x - player.acceleration, -player.speed);
            var velChange = desiredVel - vel.x;
            if (velChange < 0 ) {
                var imp = player.body.GetMass() * velChange;
                player.body.ApplyImpulse(new Box2D.Common.Math.b2Vec2(imp,0), player.body.GetWorldCenter());
            }
        }, 'Move Left', true);
        player.actions.moveRight = new illandril.game.ui.Action(function(tickTime) {
            var vel = player.body.GetLinearVelocity();
            var desiredVel = Math.min(vel.x + player.acceleration, player.speed);
            var velChange = desiredVel - vel.x;
            if (velChange > 0 ) {
                var imp = player.body.GetMass() * velChange;
                player.body.ApplyImpulse(new Box2D.Common.Math.b2Vec2(imp,0), player.body.GetWorldCenter());
            }
        }, 'Move Right', true);
        
        return player;
    };
    
    platformer.createPlatform = function(size, position) {
        var platform = game.world.createStaticBox(size, position, true /* visible */ );
        platform.rightEdge = game.world.createStaticBox(new Box2D.Common.Math.b2Vec2(0.01, size.y - 0.01), new Box2D.Common.Math.b2Vec2(position.x + size.x / 2, position.y), true /* visible */, null /* bodyArgs */, { friction: 0 } /* fixtureArgs */ );
        platform.leftEdge = game.world.createStaticBox(new Box2D.Common.Math.b2Vec2(0.01, size.y - 0.01), new Box2D.Common.Math.b2Vec2(position.x - size.x / 2, position.y), true /* visible */, null /* bodyArgs */, { friction: 0 } /* fixtureArgs */ );
    };
    
})(game.platformer);
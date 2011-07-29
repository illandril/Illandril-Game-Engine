goog.provide('game.platformer');

goog.require('game.animations');
goog.require('game.ai');
goog.require('game.world');

game = game || {};
game.platformer = {};
(function(platformer){
    
    platformer.createPlayer = function(position, size) {
        game.world.getBox2DBodyDefinition().type = Box2D.Dynamics.b2Body.b2_dynamicBody;
        game.world.getBox2DBodyDefinition().position = position;
        game.world.getBox2DBodyDefinition().angle = 0;
        game.world.getBox2DBodyDefinition().fixedRotation = true;
        game.world.getBox2DFixtureDefinition().restitution = 0;
        game.world.getBox2DFixtureDefinition().shape = new Box2D.Collision.Shapes.b2PolygonShape();
        game.world.getBox2DFixtureDefinition().shape.SetAsBox(size.x / 2, size.y / 2);
        var player = game.world.getBox2DWorld().CreateBody(game.world.getBox2DBodyDefinition());
        player.acceleration = 1;
        player.speed = 5;
        player.CreateFixture(game.world.getBox2DFixtureDefinition());
        
        game.world.getBox2DFixtureDefinition().restitution = 0;
        game.world.getBox2DFixtureDefinition().isSensor = true;
        game.world.getBox2DFixtureDefinition().shape = new Box2D.Collision.Shapes.b2PolygonShape();
        game.world.getBox2DFixtureDefinition().shape.SetAsOrientedBox(size.x / 2 - 0.01, 0.1, new Box2D.Common.Math.b2Vec2(0, size.y / 2 - 0.01));
        player.groundSensor = player.CreateFixture(game.world.getBox2DFixtureDefinition());
        game.world.getBox2DFixtureDefinition().isSensor = false;
        
        player.actions = {};
        player.actions.moveUp = new illandril.game.ui.Action(function(tickTime) {
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
        player.actions.moveDown = new illandril.game.ui.Action(function(tickTime) {
            // Duck? Drop down through floor?
        }, 'Move Down', true);
        player.actions.moveLeft = new illandril.game.ui.Action(function(tickTime) {
            var vel = player.GetLinearVelocity();
            var desiredVel = Math.max(vel.x - player.acceleration, -player.speed);
            var velChange = desiredVel - vel.x;
            if (velChange < 0 ) {
                var imp = player.GetMass() * velChange;
                player.ApplyImpulse(new Box2D.Common.Math.b2Vec2(imp,0), player.GetWorldCenter());
            }
        }, 'Move Left', true);
        player.actions.moveRight = new illandril.game.ui.Action(function(tickTime) {
            var vel = player.GetLinearVelocity();
            var desiredVel = Math.min(vel.x + player.acceleration, player.speed);
            var velChange = desiredVel - vel.x;
            if (velChange > 0 ) {
                var imp = player.GetMass() * velChange;
                player.ApplyImpulse(new Box2D.Common.Math.b2Vec2(imp,0), player.GetWorldCenter());
            }
        }, 'Move Right', true);
        
        return player;
    };
    
    platformer.createPlatform = function(position, size) {
        game.world.getBox2DBodyDefinition().type = Box2D.Dynamics.b2Body.b2_dynamicBody;
        game.world.getBox2DBodyDefinition().position = position;
        game.world.getBox2DBodyDefinition().angle = 0;
        game.world.getBox2DBodyDefinition().fixedRotation = true;
        game.world.getBox2DFixtureDefinition().restitution = 0;
        game.world.getBox2DFixtureDefinition().shape = new Box2D.Collision.Shapes.b2PolygonShape();
        game.world.getBox2DFixtureDefinition().shape.SetAsBox(size.x / 2, size.y / 2);
        var platform = game.world.getBox2DWorld().CreateBody(game.world.getBox2DBodyDefinition());
        platform.CreateFixture(game.world.getBox2DFixtureDefinition());
        return platform;
    };
    
})(game.platformer);
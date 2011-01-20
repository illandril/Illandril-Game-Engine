/**
 * @preserve Copyright (c) 2011, Joseph Spandrusyszyn
 * See https://github.com/illandril/Illandril-Game-Engine
 */


goog.provide("illandril.game.objects.Active");

goog.require("illandril.game.objects.GameObject");

/**
 * @constructor
 */
illandril.game.objects.Active = function() {
  if ( !this instanceof illandril.game.objects.GameObject ) {
    throw "Error... active object not also a game object!"
  }
  this.velocity = new goog.math.Vec2( 0, 0 );
  this.internalVelocity = new goog.math.Vec2( 0, 0 );
  this.desiredMovement = null;
  this.setSpeed( 1 );
  this.jumpY = true;
};


/*

loop {
 accelerate( direction );
  \--> adjust velocity by acceleration
 move
  \--> fix velocity to 0 if below threshold
  \--> adjust position by velocity scaled by tick and collisions
       \--> adjust velocity based on collisions
       \--> adjust velocity of other objects based on collision
  \--> adjust velocity by gravity and friction
}  

*/

illandril.game.objects.Active.prototype.isActive = true;

illandril.game.objects.Active.prototype.grounded = { x: 0, y: 0 };

illandril.game.objects.Active.prototype.setSpeed = function( speed ) {
  this.speed = speed;
  this.squaredSpeed = speed * speed;
};

illandril.game.objects.Active.prototype.setDesiredMovement = function( direction ) {
  if ( this.desiredMovement == null ) {
    this.desiredMovement = direction.clone();
  } else {
    this.desiredMovement.add( direction );
  }
};

illandril.game.objects.Active.prototype.think = function( tickSeconds ) {
  var desiredInternalVelocityChange = null;
  if ( this.desiredMovement != null ) {
    desiredInternalVelocityChange = this.desiredMovement;
    this.desiredMovement = null;
    if ( desiredInternalVelocityChange.squaredMagnitude() != 1 ) {
      desiredInternalVelocityChange.normalize();
    }
    desiredInternalVelocityChange.scale( this.speed * tickSeconds );
  } else {
    desiredInternalVelocityChange = new goog.math.Vec2( 0, 0 );
  }
  if ( desiredInternalVelocityChange.x == 0 && this.internalVelocity.x != 0 ) {
    var inverseVelocity = -1 * this.internalVelocity.x;
    var scaledSpeed = this.speed * tickSeconds;
    if ( !this.jumpY ) {
      scaledSpeed = scaledSpeed * ( Math.abs( this.internalVelocity.x ) / ( Math.abs( this.internalVelocity.x ) + Math.abs( this.internalVelocity.y ) ) );
    }
    if ( Math.abs( inverseVelocity ) < scaledSpeed ) {
      desiredInternalVelocityChange.x = inverseVelocity;
    } else {
      if ( inverseVelocity > 0 ) {
        desiredInternalVelocityChange.x = scaledSpeed;
      } else {
        desiredInternalVelocityChange.x = -1 * scaledSpeed;
      }
    }
  }
  if ( !this.jumpY && desiredInternalVelocityChange.y == 0 && this.internalVelocity.y != 0 ) {
    var inverseVelocity = -1 * this.internalVelocity.y;
    var scaledSpeed = this.speed * tickSeconds;
    scaledSpeed = scaledSpeed * ( Math.abs( this.internalVelocity.y ) / ( Math.abs( this.internalVelocity.x ) + Math.abs( this.internalVelocity.y ) ) );
    if ( Math.abs( inverseVelocity ) < scaledSpeed ) {
      desiredInternalVelocityChange.y = inverseVelocity;
    } else {
      if ( inverseVelocity > 0 ) {
        desiredInternalVelocityChange.y = scaledSpeed;
      } else {
        desiredInternalVelocityChange.y = -1 * scaledSpeed;
      }
    }
  }
  if ( desiredInternalVelocityChange.x != 0 || desiredInternalVelocityChange.y != 0 ) {
    var actualVelocityChange = desiredInternalVelocityChange.clone();
    if ( this.jumpY ) {
      actualVelocityChange.y = 0;
    }
    var newX = this.internalVelocity.x + actualVelocityChange.x;
    var newY = this.internalVelocity.y + actualVelocityChange.y;
    var newSQSpeed = newX * newX;
    if ( !this.jumpY ) {
      newSQSpeed += newY * newY;
    }
    if ( newSQSpeed > this.squaredSpeed ) {
      if ( Math.abs( newX ) > Math.abs( this.internalVelocity.x ) ) {
        actualVelocityChange.x = 0;
      }
      if ( Math.abs( newY ) > Math.abs( this.internalVelocity.y ) ) {
        actualVelocityChange.y = 0;
      }
    }
    if ( this.jumpY && ( this.grounded.y == -1 && desiredInternalVelocityChange.y > 0 ) ) {
      actualVelocityChange.y = 2 * this.speed;
    }
    this.internalVelocity.add( actualVelocityChange );
  }
  
  // We need to make sure they don't keep skating along very very slowly because of a rounding error
  if ( Math.abs( this.velocity.x ) < illandril.game.objects.GameObject.GRANULARITY ) {
    this.velocity.x = 0;
  }
  if ( Math.abs( this.velocity.y ) < illandril.game.objects.GameObject.GRANULARITY ) {
    this.velocity.y = 0;
  }
  if ( Math.abs( this.internalVelocity.x ) < illandril.game.objects.GameObject.GRANULARITY ) {
    this.internalVelocity.x = 0;
  }
  if ( Math.abs( this.internalVelocity.y ) < illandril.game.objects.GameObject.GRANULARITY ) {
    this.internalVelocity.y = 0;
  }
  this.grounded.x = 0;
  this.grounded.y = 0;
  this.setDirection( this.getVelocity() );
};

illandril.game.objects.Active.prototype.addVelocity = function( velocity ) {
  this.velocity.add( velocity );
};

illandril.game.objects.Active.prototype.applyFriction = function( tickSeconds ) {
  var friction = tickSeconds / 2;
  this.velocity.x = this.velocity.x - this.velocity.x * friction;
  this.velocity.y = this.velocity.y - this.velocity.y * friction;
  this.internalVelocity.x = this.internalVelocity.x - this.internalVelocity.x * friction;
  this.internalVelocity.y = this.internalVelocity.y - this.internalVelocity.y * friction;
};

illandril.game.objects.Active.prototype.blockedY = function() {
  if ( this.grounded.y == 0 ) {
    if ( this.velocity.y + this.internalVelocity.y > 0 ) {
      this.grounded.y = 1;
    } else {
      this.grounded.y = -1;
    }
  }
  this.velocity.y = 0;
  this.internalVelocity.y = 0;
};

illandril.game.objects.Active.prototype.blockedX = function() {
  if ( this.grounded.x == 0 ) {
    if ( this.velocity.x + this.internalVelocity.x > 0 ) {
      this.grounded.x = 1;
    } else {
      this.grounded.x = -1;
    }
  }
  this.velocity.x = 0;
  this.internalVelocity.x = 0;
};

illandril.game.objects.Active.prototype.getVelocity = function() {
  var retVelo = this.velocity.clone();
  //if ( retVelo.squaredMagnitude() > 1 ) {
  //  retVelo.normalize();
  //}
  return retVelo.add( this.internalVelocity );
};

illandril.game.objects.Active.prototype.isMoving = function() {
  return this.velocity.x != 0 || this.velocity.y != 0;
};

illandril.game.objects.Active.prototype.moveBy = function( direction ) {
  this.moveTo( this.getPosition().add( direction ) );
};

illandril.game.objects.Active.prototype.moveTo = function( position ) {
  this.bounds.centerOn( position );
  if ( this.scene != null ) {
    this.scene.objectMoved( this );
  }
};

goog.provide("illandril.game.ui.SpriteSheet");

/**
 * @constructor
 */
illandril.game.ui.SpriteSheet =  function( src, tileHeight, tileWidth, fps ) {
  this.src = src;
  this.tileHeight = tileHeight;
  this.tileWidth = tileWidth;
  this.mspf = 1000 / fps;
  this.frames = 6;
  this.lastDirection = -1;
  this.directionTime = 0;
  this.lastGameTime = -1;
  this.lastFrame = 0;
};

/**
 * @enum {number}
 */
illandril.game.ui.SpriteSheet.Direction = {
  N: 0,
  NE: 1,
  E: 2,
  SE: 3,
  S: 4,
  SW: 5,
  W: 6,
  NW: 7
};

illandril.game.ui.SpriteSheet.prototype.getSprite = function( gameTime, directionVector, speedVector ) {
  var tickTime = gameTime - this.lastGameTime;
  this.lastGameTime = gameTime;
  
  var direction = illandril.game.ui.SpriteSheet.Direction.N;
  var magX = Math.abs( directionVector.x );
  var magY = Math.abs( directionVector.y );
  if ( magX > 2 * magY ) {
    if ( directionVector.x > 0 ) {
      direction = illandril.game.ui.SpriteSheet.Direction.E;
    } else {
      direction = illandril.game.ui.SpriteSheet.Direction.W;
    }
  } else if ( magY > 2 * magX ) {
    if ( directionVector.y > 0 ) {
      direction = illandril.game.ui.SpriteSheet.Direction.S;
    } else {
      direction = illandril.game.ui.SpriteSheet.Direction.N;
    }
  } else {
    if ( directionVector.y > 0 ) {
      if ( directionVector.x > 0 ) {
        direction = illandril.game.ui.SpriteSheet.Direction.SE;
      } else {
        direction = illandril.game.ui.SpriteSheet.Direction.SW;
      }
    } else {
      if ( directionVector.x > 0 ) {
        direction = illandril.game.ui.SpriteSheet.Direction.NE;
      } else {
        direction = illandril.game.ui.SpriteSheet.Direction.NW;
      }
    }
  }
  
  if ( direction != this.lastDirection  ) {
    this.directionTime = 0;
    this.lastDirection = direction;
  }
  
  var spriteY = 0;
  var spriteX = Math.round( ( this.directionTime + 1 ) / ( this.mspf ) ) % this.frames;
  
  var isStationary = speedVector.squaredMagnitude() == 0;
  if ( !isStationary || this.lastFrame != 0 ) {
    this.directionTime += tickTime;
    this.lastFrame = spriteX;
  } else {
    this.directionTime = 0;
    spriteX = this.lastFrame = 0;
  }
  
  switch ( direction ) {
    case illandril.game.ui.SpriteSheet.Direction.N:
      spriteY = 0;
      break;
    case illandril.game.ui.SpriteSheet.Direction.NE:
      spriteY = 0;
      spriteX += this.frames;
      break;
    case illandril.game.ui.SpriteSheet.Direction.E:
      spriteY = 1;
      break;
    case illandril.game.ui.SpriteSheet.Direction.SE:
      spriteY = 1;
      spriteX += this.frames;
      break;
    case illandril.game.ui.SpriteSheet.Direction.S:
      spriteY = 2;
      break;
    case illandril.game.ui.SpriteSheet.Direction.SW:
      spriteY = 2;
      spriteX += this.frames;
      break;
    case illandril.game.ui.SpriteSheet.Direction.W:
      spriteY = 3;
      break;
    case illandril.game.ui.SpriteSheet.Direction.NW:
      spriteY = 3;
      spriteX += this.frames;
      break;
  }
  
  if ( illandril.DEBUG ) {
    illandril.getLogger( "game.ui.spriteSheet" ).finest( "direction: " + direction + "; spriteX: " + spriteX + "; spriteY: " + spriteY + "; stationary: " + isStationary );
  }
  
  var retX = spriteX * this.tileWidth;
  var retY = spriteY * this.tileHeight;
  if ( isNaN( retX ) ) {
    retX = 0;
    if ( illandril.DEBUG ) {
      illandril.getLogger( "game.ui.spriteSheet" ).shout( "BAD SPRITE X -- sX: " + spriteX + "; DT: " + this.directionTime + "; MSPF: " + this.mspf + "; Width: " + this.tileWidth );
    }
  }
  if ( isNaN( retY ) ) {
    retY = 0;
    if ( illandril.DEBUG ) {
      illandril.getLogger( "game.ui.spriteSheet" ).shout( "BAD SPRITE Y -- sY: " + spriteY + "; GT: " + gameTime + "; MSPF: " + this.mspf + "; Height: " + this.tileHeight );
    }
  }
  return { src: this.src, x: spriteX * this.tileWidth, y: spriteY * this.tileHeight };
};


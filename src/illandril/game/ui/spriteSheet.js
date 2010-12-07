goog.provide("illandril.game.ui.SpriteSheet");

/**
 * @constructor
 */
illandril.game.ui.SpriteSheet =  function( src, tileHeight, tileWidth, fps ) {
  this.src = src;
  this.tileHeight = tileHeight;
  this.tileWidth = tileWidth;
  this.mspf = 1000 / fps;
};

illandril.game.ui.SpriteSheet.prototype.getSprite = function( gameTime, direction ) {
  var spriteY = 0;
  var magX = Math.abs( direction.x );
  var magY = Math.abs( direction.y );
  var spriteX = Math.round( ( gameTime + 1 ) / ( this.mspf ) ) % 2;
  if ( magX > 2 * magY ) {
      if ( direction.x > 0 ) {
        spriteY = 1;
      } else {
        spriteY = 3;
      }
  } else if ( magY > 2 * magX ) {
      if ( direction.y > 0 ) {
        spriteY = 2;
      } else {
        spriteY = 0;
      }
  } else {
      spriteX = spriteX + 2;
      if ( direction.y > 0 ) {
        if ( direction.x > 0 ) {
          spriteY = 1;
        } else {
          spriteY = 2;
        }
      } else {
        if ( direction.x > 0 ) {
          spriteY = 0;
        } else {
          spriteY = 3;
        }
      }
  }
  var retX = spriteX * this.tileWidth;
  var retY = spriteY * this.tileHeight;
  if ( isNaN( retX ) ) {
    retX = 0;
    if ( illandril.DEBUG ) {
      illandril.getLogger( "game.ui.spriteSheet" ).shout( "BAD SPRITE X -- sX: " + spriteX + "; GT: " + gameTime + "; MSPF: " + this.mspf + "; Width: " + this.tileWidth );
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


goog.provide("illandril.game.ui.Font");

goog.require("illandril.game.ui.Letter");
goog.require("illandril.game.ui.SpriteSheet");

/**
 * @constructor
 * @extends illandril.game.ui.SpriteSheet
 */
illandril.game.ui.Font = function( src, tileHeight, tileWidth, letters, fps, frames, defaultLetterSpacing ) {
  illandril.game.ui.SpriteSheet.call( this, src );
  this.tileHeight = tileHeight;
  this.tileWidth = tileWidth;
  this.letters = letters;
  this.mspf = 1000 / ( fps || 1 );
  this.frames = frames || 1;
  this.defaultLetterSpacing = defaultLetterSpacing || 0;
};
goog.inherits( illandril.game.ui.Font, illandril.game.ui.SpriteSheet );


illandril.game.ui.Font.prototype.getSprite = function( gameTime, obj ) {
  var frame = 0;
  if ( this.frames > 1 ) {
    frame = Math.round( gameTime / this.mspf ) % this.frames;
  }
  return this.getLetter( obj.letter, obj.getState(), frame );
};

illandril.game.ui.Font.prototype.getLetter = function( letter, state, frame ) {
  var spriteY = ( frame || 0 ) * 8;
  if ( state != null ) {
    if ( state.active ) {
      spriteY = spriteY + 4;
    }
    if ( state.down ) {
      spriteY = spriteY + 2;
    }
    if ( state.hover ) {
      spriteY = spriteY + 1;
    }
  }
  var spriteX = this.letters.indexOf( letter );
  if ( spriteX < 0 ) {
    spriteX = 0;
    if ( illandril.DEBUG ) {
      illandril.getLogger( "game.ui.Font" ).shout( "Bad Letter: " + letter + "; Letters: " + this.letters + "; SRC: " + this.src );
    }
  }
  
  return new illandril.game.ui.Letter( this.src, spriteX * this.tileWidth, spriteY * this.tileHeight, this.tileHeight, this.tileWidth );
};


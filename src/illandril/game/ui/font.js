goog.provide("illandril.game.ui.Font");

goog.require("illandril.game.ui.Letter");

/**
 * @constructor
 */
illandril.game.ui.Font = function( src, tileHeight, tileWidth, letters ) {
  this.src = src;
  this.tileHeight = tileHeight;
  this.tileWidth = tileWidth;
  this.letters = letters;
};

illandril.game.ui.Font.prototype.getSprite = function( gameTime, obj ) {
  return this.getLetter( obj.letter, obj.getState() );
};

illandril.game.ui.Font.prototype.getLetter = function( letter, state ) {
  
  var spriteY = 0;
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


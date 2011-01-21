/**
 * @preserve Copyright (c) 2011, Joseph Spandrusyszyn
 * See https://github.com/illandril/Illandril-Game-Engine
 */


goog.provide("illandril.game.ui.StaticSprite");

goog.require("goog.math.Vec2");
goog.require("illandril");
goog.require("illandril.game.ui.SpriteSheet");

/**
 * @constructor
 * @extends illandril.game.ui.SpriteSheet
 */
illandril.game.ui.StaticSprite =  function( src, topLeft ) {
  illandril.game.ui.SpriteSheet.call( this, src );
  this.topLeft = topLeft || new goog.math.Vec2( 0, 0 );
};
goog.inherits( illandril.game.ui.StaticSprite, illandril.game.ui.SpriteSheet );

illandril.game.ui.StaticSprite.prototype.getSprite = function( gameTime, obj ) {
  return { src: this.src, x: this.topLeft.x, y: this.topLeft.y };
};


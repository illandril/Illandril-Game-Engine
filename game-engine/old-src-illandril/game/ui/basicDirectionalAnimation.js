/**
 * @preserve Copyright (c) 2011, Joseph Spandrusyszyn
 * See https://github.com/illandril/Illandril-Game-Engine.
 */


goog.provide('illandril.game.ui.BasicDirectionalAnimation');

goog.require('illandril');
goog.require('illandril.game.ui.SpriteSheet');

/**
 * @constructor
 * @extends illandril.game.ui.SpriteSheet
 */
illandril.game.ui.BasicDirectionalAnimation = function(src, tileWidth, tileHeight, fps, frames ) {
  illandril.game.ui.SpriteSheet.call(this, src);
  this.tileHeight = tileHeight;
  this.tileWidth = tileWidth;
  this.mspf = 1000 / fps;
  this.frames = frames;
  this.lastDirection = -1;
  this.directionTime = 0;
  this.lastGameTime = -1;
  this.lastFrame = 0;
};
goog.inherits(illandril.game.ui.BasicDirectionalAnimation, illandril.game.ui.SpriteSheet);

/**
 * @enum {number}
 */
illandril.game.ui.BasicDirectionalAnimation.Direction = {
  N: 0,
  NE: 1,
  E: 2,
  SE: 3,
  S: 4,
  SW: 5,
  W: 6,
  NW: 7
};

illandril.game.ui.BasicDirectionalAnimation.prototype.getSprite = function(gameTime, obj ) {
  var directionVector = obj.getDirection();
  var speedVector = obj.getVelocity();

  var tickTime = gameTime - this.lastGameTime;
  this.lastGameTime = gameTime;

  var direction = illandril.game.ui.BasicDirectionalAnimation.Direction.N;
  var magX = Math.abs(directionVector.x);
  var magY = Math.abs(directionVector.y);
  if (magX > 2 * magY) {
    if (directionVector.x > 0) {
      direction = illandril.game.ui.BasicDirectionalAnimation.Direction.E;
    } else {
      direction = illandril.game.ui.BasicDirectionalAnimation.Direction.W;
    }
  } else if (magY > 2 * magX) {
    if (directionVector.y < 0) {
      direction = illandril.game.ui.BasicDirectionalAnimation.Direction.S;
    } else {
      direction = illandril.game.ui.BasicDirectionalAnimation.Direction.N;
    }
  } else {
    if (directionVector.y < 0) {
      if (directionVector.x > 0) {
        direction = illandril.game.ui.BasicDirectionalAnimation.Direction.SE;
      } else {
        direction = illandril.game.ui.BasicDirectionalAnimation.Direction.SW;
      }
    } else {
      if (directionVector.x > 0) {
        direction = illandril.game.ui.BasicDirectionalAnimation.Direction.NE;
      } else {
        direction = illandril.game.ui.BasicDirectionalAnimation.Direction.NW;
      }
    }
  }

  if (direction != this.lastDirection) {
    this.directionTime = 0;
    this.lastDirection = direction;
  }

  var spriteY = 0;
  var spriteX = Math.round((this.directionTime + 1) / (this.mspf)) % this.frames;

  var isStationary = speedVector.squaredMagnitude() == 0;
  if (!isStationary || this.lastFrame != 0) {
    this.directionTime += tickTime;
    this.lastFrame = spriteX;
  } else {
    this.directionTime = 0;
    spriteX = this.lastFrame = 0;
  }

  switch (direction) {
    case illandril.game.ui.BasicDirectionalAnimation.Direction.N:
      spriteY = 0;
      break;
    case illandril.game.ui.BasicDirectionalAnimation.Direction.NE:
      spriteY = 0;
      spriteX += this.frames;
      break;
    case illandril.game.ui.BasicDirectionalAnimation.Direction.E:
      spriteY = 1;
      break;
    case illandril.game.ui.BasicDirectionalAnimation.Direction.SE:
      spriteY = 1;
      spriteX += this.frames;
      break;
    case illandril.game.ui.BasicDirectionalAnimation.Direction.S:
      spriteY = 2;
      break;
    case illandril.game.ui.BasicDirectionalAnimation.Direction.SW:
      spriteY = 2;
      spriteX += this.frames;
      break;
    case illandril.game.ui.BasicDirectionalAnimation.Direction.W:
      spriteY = 3;
      break;
    case illandril.game.ui.BasicDirectionalAnimation.Direction.NW:
      spriteY = 3;
      spriteX += this.frames;
      break;
  }

  var retX = spriteX * this.tileWidth;
  var retY = spriteY * this.tileHeight;
  if (isNaN(retX)) {
    retX = 0;
    if (illandril.DEBUG) {
      illandril.getLogger('game.ui.BasicDirectionalAnimation').shout('BAD SPRITE X -- sX: ' + spriteX + '; DT: ' + this.directionTime + '; MSPF: ' + this.mspf + '; Width: ' + this.tileWidth);
    }
  }
  if (isNaN(retY)) {
    retY = 0;
    if (illandril.DEBUG) {
      illandril.getLogger('game.ui.SpriteSheet').shout('BAD SPRITE Y -- sY: ' + spriteY + '; GT: ' + gameTime + '; MSPF: ' + this.mspf + '; Height: ' + this.tileHeight);
    }
  }
  return { src: this.src, x: spriteX * this.tileWidth, y: spriteY * this.tileHeight };
};


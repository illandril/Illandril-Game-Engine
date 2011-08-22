goog.provide('game.ui.animation');

goog.require('game.ai');
goog.require('game.ui.viewport');
goog.require('game.ui.spriteSheet');


game.ui.animation = function(game) {
    this.game = game;
};

game.ui.animation.prototype.setAsFourDirectionalAnimation = function(object, size, url, offset, frameSize, xFrames, frameSpeed) {
    this.setSpriteSheet(object, size, url, offset, frameSize, new Box2D.Common.Math.b2Vec2(xFrames, 4), frameSpeed);
    this.game.getAIManager().addThinker(object, game.ui.animation.fourDirectionalAnimationThought);
};

game.ui.animation.prototype.setSpriteSheet = function(object, size, url, offset, frameSize, frames, frameSpeed) {
    this.game.getViewport().setDisplaySize(object.body, size);
    this.game.getViewport().setImage(object, url, offset);
    object.display.spriteSheet = new game.ui.spriteSheet(url, offset, frames, frameSize);
    object.display.animation = {};
    object.display.animation.frameSize = frameSize; // Pixels
    object.display.animation.frameSpeed = frameSpeed; // FPS
    object.display.animation.frameTick = 0;
    object.display.animation.frameDir = { a: game.ui.animation.DIRECTIONS.E, x: game.ui.animation.DIRECTIONS.E, y: game.ui.animation.DIRECTIONS.N };
};

game.ui.animation.DIRECTIONS = {
    E: 0,
    W: 1,
    N: 2,
    S: 3,
    NE: 4,
    NW: 5,
    SE: 6,
    SW: 7
};
(function(animation) {
    var ZERO_MOTION = 0.01;
    
    animation.fourDirectionalAnimationThought = function(time, tick) {
        animation.fourDirectionalAnimation(time, tick, this);
    };
    
    animation.fourDirectionalAnimation = function(time, tick, object) {
        var animation = object.display.animation;
        animation.frameTick += tick;
        var tile = new Box2D.Common.Math.b2Vec2(1,1);
        
        var vel = object.body.GetLinearVelocity();
        var absX = Math.abs(vel.x);
        var absY = Math.abs(vel.y);
        if (absY < ZERO_MOTION || absX >= absY) {
            if (vel.x > ZERO_MOTION) {
                animation.frameDir.x = game.ui.animation.DIRECTIONS.E;
                if (animation.frameDir.a != game.ui.animation.DIRECTIONS.E) {
                    animation.frameDir.a = game.ui.animation.DIRECTIONS.E;
                    animation.frameTick = 0;
                }
            } else if (vel.x < -ZERO_MOTION) {
                animation.frameDir.x = game.ui.animation.DIRECTIONS.W;
                if (animation.frameDir.a != game.ui.animation.DIRECTIONS.W) {
                    animation.frameDir.a = game.ui.animation.DIRECTIONS.W;
                    animation.frameTick = 0;
                }
            } else {
                animation.frameTick = 0;
            }
            if (animation.frameDir.x == game.ui.animation.DIRECTIONS.W) {
                tile.y = 4;
            } else {
                tile.y = 2;
            }
        } else {
            if (vel.y > ZERO_MOTION) {
                animation.frameDir.y = game.ui.animation.DIRECTIONS.S;
                if (animation.frameDir.a != game.ui.animation.DIRECTIONS.S) {
                    animation.frameDir.a = game.ui.animation.DIRECTIONS.S;
                    animation.frameTick = 0;
                }
                tile.y = 3;
            } else { // vel.y must be less than 0, because if it was 0 then we'd be in X logic
                animation.frameDir.y = game.ui.animation.DIRECTIONS.N;
                if (animation.frameDir.a != game.ui.animation.DIRECTIONS.N) {
                    animation.frameDir.a = game.ui.animation.DIRECTIONS.N;
                    animation.frameTick = 0;
                }
                tile.y = 1;
            }
        }
        if (animation.frameTick == 0) {
            tile.x = 1;
        } else {
            tile.x = Math.floor(animation.frameTick * animation.frameSpeed);
        }
        object.display.spriteSheet.setTile(tile);
    };
    
    animation.eightDirectionalAnimationThought = function(time, tick) {
        animation.eightDirectionalAnimation(time, tick, this);
    };
    
    animation.eightDirectionalAnimation = function(time, tick, object) {
        var vel = object.body.GetLinearVelocity();
        var absX = Math.abs(vel.x);
        var absY = Math.abs(vel.y);
        
        var direction = illandril.game.ui.BasicDirectionalAnimation.Direction.N;
        var magX = Math.abs(directionVector.x);
        var magY = Math.abs(directionVector.y);
      if (magX > 2 * magY) {
          if (directionVector.x > 0) {
              direction = illandril.game.ui.BasicDirectionalAnimation.Direction.E;
          }
          else {
              direction = illandril.game.ui.BasicDirectionalAnimation.Direction.W;
          }
      }
      else if (magY > 2 * magX) {
          if (directionVector.y < 0) {
              direction = illandril.game.ui.BasicDirectionalAnimation.Direction.S;
          }
          else {
              direction = illandril.game.ui.BasicDirectionalAnimation.Direction.N;
          }
      }
      else {
          if (directionVector.y < 0) {
              if (directionVector.x > 0) {
                  direction = illandril.game.ui.BasicDirectionalAnimation.Direction.SE;
              }
              else {
                  direction = illandril.game.ui.BasicDirectionalAnimation.Direction.SW;
              }
          }
          else {
              if (directionVector.x > 0) {
                  direction = illandril.game.ui.BasicDirectionalAnimation.Direction.NE;
              }
              else {
                  direction = illandril.game.ui.BasicDirectionalAnimation.Direction.NW;
              }
          }
      }
      
      if (direction != this.lastDirection) {
          this.directionTime = 0;
          this.lastDirection = direction;
      }
      
      var spriteY = 0;
      var spriteX = Math.round((this.directionTime + 1) / (this.mspf));
      
      var isStationary = speedVector.squaredMagnitude() == 0;
      if (!isStationary || this.lastFrame != 0) {
          this.directionTime += tickTime;
          this.lastFrame = spriteX;
      }
      else {
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
      return {
          src: this.src,
          x: spriteX * this.tileWidth,
          y: spriteY * this.tileHeight
      };
    };
})(game.ui.animation);
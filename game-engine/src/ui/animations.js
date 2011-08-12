goog.provide('game.animations');

goog.require('game.ai');

(function(animations) {
    var E = 0;
    var W = 1;
    var N = 2;
    var S = 3;
    var NE = 4;
    var NW = 5;
    var SE = 6;
    var SW = 7;
    var ZERO_MOTION = 0.01;
    
    animations.setSpriteSheet = function(object, size, url, offset, frameSize, frames, frameSpeed) {
        game.ui.setDisplaySize(object, size);
        game.ui.setImage(object, url);
        object.display.spriteSheet.offset = offset; // Pixels
        object.display.spriteSheet.frameSize = frameSize; // Pixels
        object.display.spriteSheet.frames = frames;
        object.display.spriteSheet.frameSpeed = frameSpeed; // FPS
        object.display.spriteSheet.frameTick = 0;
        object.display.spriteSheet.frameOffset = new Box2D.Common.Math.b2Vec2(0,0);
        object.display.spriteSheet.frameDir = { a: E, x: E, y: N };
    };
    
    animations.setAsFourDirectionalAnimation = function(object, size, url, offset, frameSize, frames, frameSpeed) {
        animations.setSpriteSheet(object, size, url, offset, frameSize, frames, frameSpeed );
        if (object.think) {
            var oldThink = object.think;
            object.think = function(time, tick) {
                oldThink(time, tick);
                animations.fourDirectionalAnimation(time, tick, object);
            };
        } else {
            object.think = function(time, tick) {
                animations.fourDirectionalAnimation(time, tick, object);
            };
            game.ai.addThinker(object);
        }
    };
    
    animations.fourDirectionalAnimation = function(time, tick, object) {
        var spriteSheet = object.display.spriteSheet;
        spriteSheet.frameTick += tick;
        
        var vel = object.GetLinearVelocity();
        var absX = Math.abs(vel.x);
        var absY = Math.abs(vel.y);
        if (absY < ZERO_MOTION || absX >= absY) {
            if (vel.x > ZERO_MOTION) {
                spriteSheet.frameDir.x = E;
                if (spriteSheet.frameDir.a != E) {
                    spriteSheet.frameDir.a = E;
                    spriteSheet.frameTick = 0;
                }
            } else if (vel.x < -ZERO_MOTION) {
                spriteSheet.frameDir.x = W;
                if (spriteSheet.frameDir.a != W) {
                    spriteSheet.frameDir.a = W;
                    spriteSheet.frameTick = 0;
                }
            } else {
                spriteSheet.frameTick = 0;
            }
            if (spriteSheet.frameDir.x == W) {
                spriteSheet.frameOffset.y = spriteSheet.frameSize.y * 3 + spriteSheet.offset.y;
            } else {
                spriteSheet.frameOffset.y = spriteSheet.frameSize.y + spriteSheet.offset.y;
            }
        } else {
            if (vel.y > ZERO_MOTION) {
                spriteSheet.frameDir.y = S;
                if (spriteSheet.frameDir.a != S) {
                    spriteSheet.frameDir.a = S;
                    spriteSheet.frameTick = 0;
                }
                spriteSheet.frameOffset.y = spriteSheet.frameSize.y * 2 + spriteSheet.offset.y;
            } else { // vel.y must be less than 0, because if it was 0 then we'd be in X logic
                spriteSheet.frameDir.y = N;
                if (spriteSheet.frameDir.a != N) {
                    spriteSheet.frameDir.a = N;
                    spriteSheet.frameTick = 0;
                }
                spriteSheet.frameOffset.y = spriteSheet.offset.y;
            }
        }
        if (spriteSheet.frameTick == 0) {
            spriteSheet.frameOffset.x = spriteSheet.offset.x;
        } else {
            var frame = Math.floor(spriteSheet.frameTick * spriteSheet.frameSpeed) % spriteSheet.frames;
            spriteSheet.frameOffset.x = frame * spriteSheet.frameSize.x + spriteSheet.offset.x;
        }
    };
    
    animations.eightDirectionalAnimation = function(time, tick, object) {
        var vel = object.GetLinearVelocity();
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
      var spriteX = Math.round((this.directionTime + 1) / (this.mspf)) % this.frames;
      
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
})(game.animations);
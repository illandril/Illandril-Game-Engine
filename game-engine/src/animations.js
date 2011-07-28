goog.provide('game.animations');

game = game || {};
game.animations = {};
(function(animations) {
    var E = 0;
    var W = 1;
    var N = 2;
    var S = 3;
    var ZERO_MOTION = 0.01;
    
    animations.setSpriteSheet = function(object, size, url, offset, frameSize, frames, frameSpeed) {
        object.display = object.display || {};
        object.display.size = size; // Meters
        object.display.spriteSheet = {
            url: url,
            offset: offset, // Pixels
            frameSize: frameSize, // Pixels
            frames: frames,
            frameSpeed: frameSpeed, // FPS
            frameTick: 0,
            frameOffset: new Box2D.Common.Math.b2Vec2(0,0),
            frameDir: { a: E, x: E, y: N }
        };
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
    
})(game.animations);
goog.provide("illandril.game.Framerate");

/**
 * @constructor
 */
illandril.game.Framerate = {};
illandril.game.Framerate.totalFrames = 0;
illandril.game.Framerate.lastResetStamp = new Date();
illandril.game.Framerate.lastFrameStamp = new Date();
illandril.game.Framerate.frames = [];
illandril.game.Framerate.rollingFrames = 50;

illandril.game.Framerate.reset = function() {
  illandril.game.Framerate.totalFrames = 0
  illandril.game.Framerate.lastResetStamp = new Date();
  illandril.game.Framerate.lastFrameStamp = new Date();
  illandril.game.Framerate.frames = [];
};

illandril.game.Framerate.tick = function() {
  var thisFrameStamp = new Date();
  var timeForThisTick = thisFrameStamp - illandril.game.Framerate.lastFrameStamp;
  illandril.game.Framerate.lastFrameStamp = thisFrameStamp;
  illandril.game.Framerate.totalFrames++;
  illandril.game.Framerate.frames.push( thisFrameStamp );
  // First frame in the list is effectively the "start time" for the second, so keep 1 extra frame
  while ( illandril.game.Framerate.frames.length > illandril.game.Framerate.rollingFrames + 1 ) {
    illandril.game.Framerate.frames.shift();
  }
  return timeForThisTick;
};

illandril.game.Framerate.getAverageFPS = function() {
  return ( illandril.game.Framerate.totalFrames * 1000 ) / ( illandril.game.Framerate.lastFrameStamp - illandril.game.Framerate.lastResetStamp );
};

illandril.game.Framerate.getRollingAverageFPS = function() {
  // First frame in the list is effectively the "start time" for the second, so we subtract 1 to avoid giving an overly low FPS
  return ( ( illandril.game.Framerate.frames.length - 1 ) * 1000 ) / ( illandril.game.Framerate.frames[illandril.game.Framerate.frames.length - 1] - illandril.game.Framerate.frames[0] );
};


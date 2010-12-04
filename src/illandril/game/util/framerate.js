goog.provide("illandril.game.util.Framerate");

/**
 * @constructor
 */
illandril.game.util.Framerate = {};
illandril.game.util.Framerate.totalFrames = 0;
illandril.game.util.Framerate.lastResetStamp = new Date();
illandril.game.util.Framerate.lastFrameStamp = new Date();
illandril.game.util.Framerate.frames = [];
illandril.game.util.Framerate.rollingFrames = 50;

illandril.game.util.Framerate.reset = function() {
  illandril.game.util.Framerate.totalFrames = 0
  illandril.game.util.Framerate.lastResetStamp = new Date();
  illandril.game.util.Framerate.lastFrameStamp = new Date();
  illandril.game.util.Framerate.frames = [];
};

illandril.game.util.Framerate.tick = function() {
  var thisFrameStamp = new Date();
  var timeForThisTick = thisFrameStamp - illandril.game.util.Framerate.lastFrameStamp;
  illandril.game.util.Framerate.lastFrameStamp = thisFrameStamp;
  illandril.game.util.Framerate.totalFrames++;
  illandril.game.util.Framerate.frames.push( thisFrameStamp );
  // First frame in the list is effectively the "start time" for the second, so keep 1 extra frame
  while ( illandril.game.util.Framerate.frames.length > illandril.game.util.Framerate.rollingFrames + 1 ) {
    illandril.game.util.Framerate.frames.shift();
  }
  return timeForThisTick;
};

illandril.game.util.Framerate.getTotalTime = function() {
  return illandril.game.util.Framerate.lastFrameStamp - illandril.game.util.Framerate.lastResetStamp;
};

illandril.game.util.Framerate.getAverageFPS = function() {
  return ( illandril.game.util.Framerate.totalFrames * 1000 ) / illandril.game.util.Framerate.getTotalTime();
};

illandril.game.util.Framerate.getRollingAverageFPS = function() {
  // First frame in the list is effectively the "start time" for the second, so we subtract 1 to avoid giving an overly low FPS
  return ( ( illandril.game.util.Framerate.frames.length - 1 ) * 1000 ) / ( illandril.game.util.Framerate.frames[illandril.game.util.Framerate.frames.length - 1] - illandril.game.util.Framerate.frames[0] );
};


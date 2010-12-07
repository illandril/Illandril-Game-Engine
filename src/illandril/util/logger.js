goog.provide("illandril.util.Logger");

goog.require("goog.debug.FancyWindow");
goog.require("goog.debug.Logger");
goog.require("goog.debug.Console");

illandril.util.Logger = {};

/**
 * enum {number}
 */
illandril.util.Logger.Levels = {
  ALL: 0,
  FINEST: 1,
  INFO: 2,
  WARNING: 3,
  SEVERE: 4,
  SHOUT: 5,
  NONE: 6
}

/**
 * @const
 */
illandril.util.Logger.MAX_LOG_LEVEL = illandril.util.Logger.Levels.ALL;

if ( illandril.util.Logger.MAX_LOG_LEVEL <= illandril.util.Logger.Levels.SHOUT ) {
  illandril.util.Logger.shout = function( name, message ) {
    goog.debug.Logger.getLogger( name ).shout( message );
  };
} else {
  illandril.util.Logger.shout = function() {};
}

if ( illandril.util.Logger.MAX_LOG_LEVEL <= illandril.util.Logger.Levels.SEVERE ) {
  illandril.util.Logger.severe = function( name, message ) {
    goog.debug.Logger.getLogger( name ).severe( message );
  };
} else {
  illandril.util.Logger.severe = function() {};
}

if ( illandril.util.Logger.MAX_LOG_LEVEL <= illandril.util.Logger.Levels.WARNING ) {
  illandril.util.Logger.warning = function( name, message ) {
    goog.debug.Logger.getLogger( name ).warning( message );
  };
} else {
  illandril.util.Logger.warning = function() {};
}

if ( illandril.util.Logger.MAX_LOG_LEVEL <= illandril.util.Logger.Levels.INFO ) {
  illandril.util.Logger.info = function( name, message ) {
    goog.debug.Logger.getLogger( name ).info( message );
  };
} else {
  illandril.util.Logger.info= function() {};
}

if ( illandril.util.Logger.MAX_LOG_LEVEL <= illandril.util.Logger.Levels.FINEST ) {
  illandril.util.Logger.finest = function( name, message ) {
    goog.debug.Logger.getLogger( name ).finest( message );
  };
} else {
  illandril.util.Logger.finest = function() {};
}


if ( illandril.util.Logger.MAX_LOG_LEVEL < illandril.util.Logger.Levels.NONE ) {
  var debugWindow = new goog.debug.FancyWindow('main');
  debugWindow.setEnabled(true);
  debugWindow.init();
  
  var console = new goog.debug.Console();
  console.setCapturing( true );
}
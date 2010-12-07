goog.provide( "illandril" );

goog.require("goog.debug.Logger");

illandril = illandril || {};

/**
 * @define {boolean}
 */
illandril.DEBUG = true;

illandril.loggers = {};

illandril.getLogger = function( namespace ) {
  var logger = illandril.loggers[namespace];
  if ( logger == null ) {
    if ( illandril.DEBUG ) {
      logger = illandril.loggers[namespace] = goog.debug.Logger.getLogger( namespace );
    } else {
      logger = illandril.loggers[namespace] = {
        finest: function(){},
        finer: function(){},
        fine: function(){},
        config: function(){},
        info: function(){},
        warning: function(){},
        severe: function(){},
        shout: function(){}
      };
    }
  }
  return logger;
}


if ( illandril.DEBUG ) {
  goog.require("goog.events");
  goog.require("goog.events.EventType");
  goog.require("goog.debug.DivConsole");
  goog.require("goog.debug.FancyWindow");
  
  goog.exportSymbol( "setLogLevel", function(l){ goog.debug.Logger.getLogger("").setLevel(l); } );
  goog.exportSymbol( "Log.ALL", goog.debug.Logger.Level.ALL );
  goog.exportSymbol( "Log.CONFIG", goog.debug.Logger.Level.CONFIG );
  goog.exportSymbol( "Log.WARNING", goog.debug.Logger.Level.WARNING );
  goog.exportSymbol( "Log.SEVERE", goog.debug.Logger.Level.SEVERE );
  goog.exportSymbol( "Log.NONE", goog.debug.Logger.Level.NONE );
  goog.debug.Logger.getLogger("").setLevel( goog.debug.Logger.Level.ALL );
  
  goog.events.listen( window, goog.events.EventType.LOAD, function() {
    var elem = document.getElementById( "illandrilDebug" );
    if ( elem != null ) {
      var debugConsole = new goog.debug.DivConsole( elem );
      debugConsole.setCapturing( true );
    } else {
      var debugWindow = new goog.debug.FancyWindow('main');
      debugWindow.setEnabled( true );
      debugWindow.init();
    }
  } );
}

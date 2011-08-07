/**
 * @preserve Copyright (c) 2011, Joseph Spandrusyszyn
 * See https://github.com/illandril/Illandril-Game-Engine.
 */

/**
 * @fileoverview Logging/Debug helpers for all Illandril projects.
 */

goog.provide('illandril.DEBUG');

illandril = illandril || {};

/**
 * @define {boolean} Flag indicates if projects should include debugging logic.
 */
illandril.DEBUG = true;

if (illandril.DEBUG) {
  goog.require('goog.debug.DivConsole');
  goog.require('goog.debug.FancyWindow');
  goog.require('goog.debug.Logger');
  goog.require('goog.events');
  goog.require('goog.events.EventType');

  /**
   * Gets a logger for the specified namespace.
   * @param {string} namespace The namespace (without "illandril.") of the code
   *     snippit the logger is for.
   * @return {goog.debug.Logger} logger.
   */
  illandril.getLogger = function(namespace) {
    return goog.debug.Logger.getLogger('illandril.' + namespace);
  };

  // Exposes some logging controls
  var initLogs = function(elemID) {
    var elem = document.getElementById(elemID);
    if (elem != null) {
      var debugConsole = new goog.debug.DivConsole(elem);
      debugConsole.setCapturing(true);
    } else {
      var debugWindow = new goog.debug.FancyWindow('main');
      debugWindow.setEnabled(true);
      debugWindow.init();
    }
    goog.debug.Logger.getLogger('').finest('Debug Initialization Complete');
    goog.debug.Logger.getLogger('').finest('Dropping to Warning level');
    goog.debug.Logger.getLogger('').setLevel(goog.debug.Logger.Level.WARNING);
  };
  var setLogLevel = function(level) {
    goog.debug.Logger.getLogger('').setLevel(level);
  };
  goog.exportSymbol('initLogs', initLogs);
  goog.exportSymbol('setLogLevel', setLogLevel);
  goog.exportSymbol('Log.ALL', goog.debug.Logger.Level.ALL);
  goog.exportSymbol('Log.CONFIG', goog.debug.Logger.Level.CONFIG);
  goog.exportSymbol('Log.WARNING', goog.debug.Logger.Level.WARNING);
  goog.exportSymbol('Log.SEVERE', goog.debug.Logger.Level.SEVERE);
  goog.exportSymbol('Log.NONE', goog.debug.Logger.Level.NONE);
  goog.debug.Logger.getLogger('').setLevel(goog.debug.Logger.Level.ALL);
}

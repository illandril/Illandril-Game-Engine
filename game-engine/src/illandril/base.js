/**
 * @preserve Copyright (c) 2011, Joseph Spandrusyszyn
 * See https://github.com/illandril/Illandril-Game-Engine.
 */

/**
 * @fileoverview Logging helpers (and possibly more in the future) for all Illandril projects.
 */


goog.provide('illandril');

goog.require('goog.debug.DivConsole');

illandril = illandril || {};

/**
 * @define {boolean} If false, all logging calls are replaced with empty functions to improve performance.
 */
illandril.DEBUG = true;

if (illandril.DEBUG) {
  /**
   * Gets a logger for the specified namespace.
   * @param {string} namespace The namespace (without "illandril.") of the code snippit the logger is for.
   * @return {goog.debug.Logger} logger.
   */
  illandril.getLogger = function(namespace ) {
    return goog.debug.Logger.getLogger('illandril.' + namespace);
  };

  // Exposes some logging controls
  goog.require('goog.debug.FancyWindow');
  goog.require('goog.debug.Logger');
  goog.require('goog.events');
  goog.require('goog.events.EventType');
  var initLogs = function(elemID ) {
    var elem = document.getElementById(elemID);
    if (elem != null) {
      var debugConsole = new goog.debug.DivConsole(elem);
      debugConsole.setCapturing(true);
    } else {
      var debugWindow = new goog.debug.FancyWindow('main');
      debugWindow.setEnabled(true);
      debugWindow.init();
    }
    goog.debug.Logger.getLogger('').finest('Debug Initialization Complete - dropping to Warning level');
    goog.debug.Logger.getLogger('').setLevel(goog.debug.Logger.Level.WARNING);
  };
  goog.exportSymbol('initLogs', initLogs);
  goog.exportSymbol('setLogLevel', function(l) { goog.debug.Logger.getLogger('').setLevel(l); });
  goog.exportSymbol('Log.ALL', goog.debug.Logger.Level.ALL);
  goog.exportSymbol('Log.CONFIG', goog.debug.Logger.Level.CONFIG);
  goog.exportSymbol('Log.WARNING', goog.debug.Logger.Level.WARNING);
  goog.exportSymbol('Log.SEVERE', goog.debug.Logger.Level.SEVERE);
  goog.exportSymbol('Log.NONE', goog.debug.Logger.Level.NONE);
  goog.debug.Logger.getLogger('').setLevel(goog.debug.Logger.Level.ALL);
}

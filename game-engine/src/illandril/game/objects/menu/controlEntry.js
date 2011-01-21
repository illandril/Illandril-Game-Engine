/**
 * @preserve Copyright (c) 2011, Joseph Spandrusyszyn
 * See https://github.com/illandril/Illandril-Game-Engine
 */


goog.provide("illandril.game.objects.menus.ControlEntry");

goog.require("goog.object");
goog.require("illandril");
goog.require("illandril.game.objects.menus.MenuEntry");

/**
 * @constructor
 * @extends illandril.game.objects.menu.MenuEntry
 * @param {illandril.game.Scene} scene the scene the object lives in
 * @param {illandril.math.Bounds} bounds the bounds that define the size and location of the object
 * @param {string|null} bg the URL of the background image for this object
 */
illandril.game.objects.menus.ControlEntry = function( scene, controls, action, center, font, zIndex ) {
  illandril.game.objects.menus.MenuEntry.call( this, scene, "", center, font, zIndex );
  this.controls = controls;
  this.action = action;
  this.displayAction = this.action.name;
  while ( this.displayAction.length < illandril.game.objects.menus.ControlEntry.MAX_ACTION_NAME_LENGTH ) {
    this.displayAction = " " + this.displayAction;
  }
  if ( this.displayAction.length > illandril.game.objects.menus.ControlEntry.MAX_ACTION_NAME_LENGTH ) {
    this.displayAction = this.displayAction.subString(0, illandril.game.objects.menus.ControlEntry.MAX_ACTION_NAME_LENGTH - 3);
    this.displayAction = this.displayAction + "...";
  }
  controls.registerControlChangeListener( this, this.actionsUpdated );
  this.actionsUpdated();
};
goog.inherits( illandril.game.objects.menus.ControlEntry, illandril.game.objects.menus.MenuEntry );

// This is to help ensure that the : is always in the same spot. It should be longer than the longest possible action name.
// If there is a longer named action, the action name will be truncated with an ellipses.
illandril.game.objects.menus.ControlEntry.MAX_ACTION_NAME_LENGTH = 28;

// This is to help ensure that the : is always in the same spot. It should be longer than the longest possible control name.
// If there is a longer control name, the display will look bad.
illandril.game.objects.menus.ControlEntry.MAX_CONTROL_NAME_LENGTH = 28;

illandril.game.objects.menus.ControlEntry.prototype.actionsUpdated = function() {
  var controlText = this.controls.getKeyForAction( this.action.name );
  if ( controlText == null ) {
    controlText = "N/A";
  } else {
    controlText = controlText.toUpperCase();
  }
  this.setControlText( controlText );
};

illandril.game.objects.menus.ControlEntry.prototype.setControlText = function( controlText ) {
  while ( controlText.length < illandril.game.objects.menus.ControlEntry.MAX_CONTROL_NAME_LENGTH ) {
    controlText = controlText + " ";
  }
  this.setText( this.displayAction + ": " + controlText );
};

illandril.game.objects.menus.ControlEntry.prototype.onClick = function( e ) {
  this.controls.registerActionFromInput( this.action );
  this.setControlText( "Press a Key" );
};

/*
illandril.game.objects.menus.MenuEntry.prototype.onMouseDown = function( e ) {
  var evt = new goog.events.BrowserEvent(e);
  this.state.down = true;
};
illandril.game.objects.menus.MenuEntry.prototype.onMouseUp = function( e ) {
  var evt = new goog.events.BrowserEvent(e);
  this.state.down = false;
};
illandril.game.objects.menus.MenuEntry.prototype.onMouseOver = function( e ) {
  var evt = new goog.events.BrowserEvent(e);
  this.state.hover = true;
};
illandril.game.objects.menus.MenuEntry.prototype.onMouseOut = function( e ) {
  var evt = new goog.events.BrowserEvent(e);
  this.state.hover = false;
  this.state.down = false;
};
*/

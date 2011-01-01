goog.provide("illandril.game.objects.menus.ControlEntry");

goog.require("goog.object");
goog.require("illandril.game.objects.menus.MenuEntry");

/**
 * @constructor
 * @extends illandril.game.objects.menu.MenuEntry
 * @param {illandril.game.Scene} scene the scene the object lives in
 * @param {illandril.math.Bounds} bounds the bounds that define the size and location of the object
 * @param {string|null} bg the URL of the background image for this object
 */
illandril.game.objects.menus.ControlEntry = function( scene, controls, action, center, font, zIndex, minNameLength ) {
  illandril.game.objects.menus.MenuEntry.call( this, scene, "", center, font, zIndex );
  this.controls = controls;
  this.action = action;
  this.displayAction = this.action.name;
  minNameLength = minNameLength || 0;
  while ( this.displayAction.length < minNameLength ) {
    this.displayAction = " " + this.displayAction;
  }
  controls.registerControlChangeListener( this, this.actionsUpdated );
  this.actionsUpdated();
};
goog.inherits( illandril.game.objects.menus.ControlEntry, illandril.game.objects.menus.MenuEntry );

illandril.game.objects.menus.ControlEntry.prototype.actionsUpdated = function() {
  var controlText = this.controls.getKeyForAction( this.action.name );
  if ( controlText == null ) {
    controlText = "N/A";
  } else {
    controlText = controlText.toUpperCase();
  }
  this.setText( this.displayAction + ": " + controlText );
};

illandril.game.objects.menus.ControlEntry.prototype.onClick = function( e ) {
  this.controls.registerActionFromInput( this.action );
  this.setText( this.displayAction + ": " + "Press a Key" );
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
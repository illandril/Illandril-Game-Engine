/**
 * @preserve Copyright (c) 2011, Joseph Spandrusyszyn
 * See https://github.com/illandril/Illandril-Game-Engine
 */


goog.provide("illandril.game.objects.menus.MenuLetter");

goog.require("goog.object");
goog.require("illandril");
goog.require("illandril.game.objects.GameObject");
goog.require("illandril.game.objects.Floater");

/**
 * @constructor
 * @extends illandril.game.objects.GameObject
 * @param {illandril.game.Scene} scene the scene the object lives in
 * @param {illandril.math.Bounds} bounds the bounds that define the size and location of the object
 * @param {string|null} bg the URL of the background image for this object
 */
illandril.game.objects.menus.MenuLetter = function( scene, bounds, font, letter, menuEntry, zIndex ) {
  illandril.game.objects.GameObject.call( this, scene, bounds, font, zIndex );
  illandril.game.objects.Floater.call( this );
  this.letter = letter;
  this.menuEntry = menuEntry;
};
goog.inherits( illandril.game.objects.menus.MenuLetter, illandril.game.objects.GameObject );
goog.object.extend( illandril.game.objects.menus.MenuLetter.prototype, illandril.game.objects.Floater.prototype );

illandril.game.objects.menus.MenuLetter.prototype.getState = function() {
  return this.menuEntry.getState();
};

illandril.game.objects.menus.MenuLetter.prototype.onClick = function(e) {
  if ( this.menuEntry.onClick != null ) { this.menuEntry.onClick(e); }
};
illandril.game.objects.menus.MenuLetter.prototype.onMouseDown = function(e) {
  if ( this.menuEntry.onMouseDown != null ) { this.menuEntry.onMouseDown(e); }
};
illandril.game.objects.menus.MenuLetter.prototype.onMouseUp = function(e) {
  if ( this.menuEntry.onMouseUp != null ) { this.menuEntry.onMouseUp(e); }
};
illandril.game.objects.menus.MenuLetter.prototype.onMouseOver = function(e) {
  if ( this.menuEntry.onMouseOver != null ) { this.menuEntry.onMouseOver(e); }
};
illandril.game.objects.menus.MenuLetter.prototype.onMouseOut = function(e) {
  if ( this.menuEntry.onMouseOut != null ) { this.menuEntry.onMouseOut(e); }
};

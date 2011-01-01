goog.provide("illandril.game.objects.menus.MenuEntry");

goog.require("goog.object");
goog.require("illandril.game.objects.GameObject");
goog.require("illandril.game.objects.menus.MenuLetter");
goog.require("illandril.game.ui.Font");

/**
 * @constructor
 * @extends illandril.game.objects.GameObject
 * @param {illandril.game.Scene} scene the scene the object lives in
 * @param {illandril.math.Bounds} bounds the bounds that define the size and location of the object
 * @param {string|null} bg the URL of the background image for this object
 */
illandril.game.objects.menus.MenuEntry = function( scene, text, center, font, zIndex ) {
  // 0x0 because the letters are the actual objects
  illandril.game.objects.GameObject.call( this, scene, illandril.math.Bounds.fromCenter( center, new goog.math.Vec2( 0, 0 ) ), null, zIndex );
  this.state = { active: false, down: false, hover: false };
  this.font = font;
  this.center = center;
  this.setText( text );
};
goog.inherits( illandril.game.objects.menus.MenuEntry, illandril.game.objects.GameObject );

illandril.game.objects.menus.MenuEntry.prototype.setText = function( text ) {
  this.text = text;
  if ( this.letters != null ) {
    for ( var i = 0; i < this.letters.length; i++ ) {
      this.scene.removeObject( this.letters[i] );
    }
    delete this.letters;
  }
  this.letters = [];
  var width = 0;
  var height = 0;
  for ( var i = 0; i < text.length; i++ ) {
    var letter = text.charAt( i );
    var letterUI = this.font.getLetter( letter );
    width += letterUI.width;
    height = Math.max( height, letterUI.height );
    this.letters.push( new illandril.game.objects.menus.MenuLetter( this.scene, illandril.math.Bounds.fromCenter( this.center, new goog.math.Vec2( letterUI.width, letterUI.height ) ), this.font, letter, this, this.zIndex ) );
  }
  var x = this.center.x - width / 2;
  for ( var i = 0; i < this.letters.length; i++ ) {
    var letter = this.letters[i];
    var size = letter.getSize();
    letter.bounds = illandril.math.Bounds.fromCenter( new goog.math.Vec2( x + size.x / 2, this.center.y ), size );
    x += size.x;
  }
};

illandril.game.objects.menus.MenuEntry.prototype.getState = function() {
  return this.state;
};
illandril.game.objects.menus.MenuEntry.prototype.onClick = function( e ) {
  var evt = new goog.events.BrowserEvent(e);
  this.state.active = !this.state.active;
};
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

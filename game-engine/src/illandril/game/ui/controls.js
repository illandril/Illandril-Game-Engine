/**
 * @preserve Copyright (c) 2011, Joseph Spandrusyszyn
 * See https://github.com/illandril/Illandril-Game-Engine
 */


goog.provide("illandril.game.ui.Controls");

goog.require("goog.events");
goog.require("goog.events.EventType");
goog.require("goog.events.KeyCodes");
goog.require("goog.events.KeyHandler");
goog.require("goog.events.KeyNames");
goog.require("goog.userAgent");
goog.require("illandril");

/**
 * @constructor
 */
illandril.game.ui.Controls = function() {
  this.controls = {};
  this.reverseControls = {};
  this.controlChangeListeners = [];
  this.actionToRegister = null;
  this.registeringActionTimeout = null;
};

illandril.game.ui.Controls.actionPendingFor = null;

illandril.game.ui.Controls.keyStates = {};

illandril.game.ui.Controls.modifierKeyStates = { CTRL: false, CTRL_LAST: false, ALT: false, ALT_LAST: false, SHIFT: false, SHIFT_LAST: false },

illandril.game.ui.Controls.getKeyState = function( e ) {
  var keyCode = e.KeyCode;
  if ( goog.userAgent.GECKO &&
       e.keyCode in goog.events.KeyHandler.mozKeyCodeToKeyCodeMap_ ) {
    keyCode = goog.events.KeyHandler.mozKeyCodeToKeyCodeMap_[e.keyCode];
  } else {
    keyCode = e.keyCode;
  }
  return { keyCode: keyCode, ctrlKey: e.ctrlKey, altKey: e.altKey, shiftKey: e.shiftKey };
};
  
illandril.game.ui.Controls.blur = function( e ) {
  if ( illandril.DEBUG ) {
    illandril.getLogger("game.ui.Controls").finest( "Blur" );
  }
  illandril.game.ui.Controls.keyStates = {};
  illandril.game.ui.Controls.modifierKeyStates.CTRL = false;
  illandril.game.ui.Controls.modifierKeyStates.CTRL_LAST = false;
  illandril.game.ui.Controls.modifierKeyStates.ALT = false;
  illandril.game.ui.Controls.modifierKeyStates.ALT_LAST = false;
  illandril.game.ui.Controls.modifierKeyStates.SHIFT = false;
  illandril.game.ui.Controls.modifierKeyStates.SHIFT_LAST = false;
};

illandril.game.ui.Controls.keyDown = function( e ) {
  var ks = illandril.game.ui.Controls.getKeyState( e );
  var key = illandril.game.ui.Controls.getKeyEventKey( ks.keyCode, ks.ctrlKey, ks.altKey, ks.shiftKey );
  if ( illandril.DEBUG ) {
    illandril.getLogger("game.ui.Controls").finest( "KeyDown: " + key );
  }
  if ( ks.keyCode != goog.events.KeyCodes.SHIFT &&
       ks.keyCode != goog.events.KeyCodes.CTRL &&
       ks.keyCode != goog.events.KeyCodes.ALT ) {
    if ( illandril.game.ui.Controls.keyStates[ks.keyCode] == null ) {
      illandril.game.ui.Controls.keyStates[ks.keyCode] = { wasActive: false };
    }
  }
  illandril.game.ui.Controls.modifierKeyStates.CTRL = ks.ctrlKey;
  illandril.game.ui.Controls.modifierKeyStates.ALT = ks.altKey;
  illandril.game.ui.Controls.modifierKeyStates.SHIFT = ks.shiftKey;
};

illandril.game.ui.Controls.keyUp = function( e ) {
  var ks = illandril.game.ui.Controls.getKeyState( e );
  var key = illandril.game.ui.Controls.getKeyEventKey( ks.keyCode, ks.ctrlKey, ks.altKey, ks.shiftKey );
  if ( illandril.DEBUG ) {
    illandril.getLogger("game.ui.Controls").finest( "KeyUp: " + key );
  }
  delete illandril.game.ui.Controls.keyStates[ks.keyCode];
  illandril.game.ui.Controls.modifierKeyStates.CTRL = ks.ctrlKey;
  illandril.game.ui.Controls.modifierKeyStates.ALT = ks.altKey;
  illandril.game.ui.Controls.modifierKeyStates.SHIFT = ks.shiftKey;
};

illandril.game.ui.Controls.getKeyEventKey = function( keyCode, ctrl, alt, shift ) {
  var keyName = goog.events.KeyNames[keyCode];
  if ( keyName == null ) {
    keyName = "KEY[" + keyCode + "]";
  }
  return ( ctrl ? "Ctrl + " : "" ) + ( alt ? "Alt + " : "" ) + ( shift ? "Shift + " : "" ) + keyName.toUpperCase();
};

illandril.game.ui.Controls.prototype = {
  handleKeyEvents: function( tickTime ) {
    var activeKeys = 0;
    var modifierRepeat = illandril.game.ui.Controls.modifierKeyStates.CTRL == illandril.game.ui.Controls.modifierKeyStates.CTRL_LAST
                         && illandril.game.ui.Controls.modifierKeyStates.ALT == illandril.game.ui.Controls.modifierKeyStates.ALT_LAST
                         && illandril.game.ui.Controls.modifierKeyStates.SHIFT == illandril.game.ui.Controls.modifierKeyStates.SHIFT_LAST;
    for ( var keyCode in illandril.game.ui.Controls.keyStates ) {
      var repeat = modifierRepeat && illandril.game.ui.Controls.keyStates[keyCode].wasActive;
      illandril.game.ui.Controls.keyStates[keyCode].wasActive = true;
      
      activeKeys++;
      var key = illandril.game.ui.Controls.getKeyEventKey( keyCode, illandril.game.ui.Controls.modifierKeyStates.CTRL,
                                                                    illandril.game.ui.Controls.modifierKeyStates.ALT,
                                                                    illandril.game.ui.Controls.modifierKeyStates.SHIFT );
      if ( this.actionToRegister == null ) {
        if ( this.controls[key] != null
             && ( !repeat || this.controls[key].executeOnRepeat ) ) {
          this.controls[key].execute( tickTime );
        }
      }
    }
    if ( activeKeys == 1 && this.actionToRegister != null ) {
      if ( this.registeringActionTimeout != null ) {
        clearTimeout( this.registeringActionTimeout );
      }
      var controls = this;
      this.registeringActionTimeout = setTimeout( function() {
        controls.registerAction( controls.actionToRegister, key );
        controls.actionToRegister = null;
        illandril.game.ui.Controls.actionPendingFor = null;
        controls.registeringActionTimeout = null;
      }, 100 );
    }
    illandril.game.ui.Controls.modifierKeyStates.CTRL_LAST = illandril.game.ui.Controls.modifierKeyStates.CTRL;
    illandril.game.ui.Controls.modifierKeyStates.ALT_LAST = illandril.game.ui.Controls.modifierKeyStates.ALT;
    illandril.game.ui.Controls.modifierKeyStates.SHIFT_LAST = illandril.game.ui.Controls.modifierKeyStates.SHIFT;
  },
  
  getKeyForAction: function( action ) {
    return this.reverseControls[action];
  },
  
  registerAction: function( action, keyCodeOrKey, ctrl, alt, shift ) {
    var key = keyCodeOrKey;
    if ( typeof( keyCodeOrKey ) == "number" ) {
      key = illandril.game.ui.Controls.getKeyEventKey( keyCodeOrKey, ctrl, alt, shift );
    }
    if ( illandril.DEBUG ) {
      illandril.getLogger("game.ui.Controls").finest( "registerAction: " + action.name + "; " + key );
    }
    var changes = [];
    var oldAction = this.controls[key];
    var oldKey = this.reverseControls[action.name];
    if ( oldAction != null ) {
      if ( oldKey != null ) {
        this.controls[oldKey] = oldAction;
        this.reverseControls[oldAction.name] = oldKey;
        changes.push( new illandril.game.ui.Controls.exportedAction( oldKey, oldAction ) );
      } else {
        throw "The specified key is already in use for a different function.";
      }
    } else if ( oldKey != null ) {
      if ( illandril.DEBUG ) {
        illandril.getLogger("game.ui.Controls").finest( "oldKey: " + oldKey );
      }
      delete this.controls[oldKey]
    }
    this.controls[key] = action;
    this.reverseControls[action.name] = key;
    changes.push( new illandril.game.ui.Controls.exportedAction( key, action ) );
    this.notifyControlChangeListeners( changes );
  },
  
  registerActionFromInput: function( action ) {
    if ( illandril.game.ui.Controls.actionPendingFor != null ) {
      illandril.game.ui.Controls.actionPendingFor.notifyControlChangeListeners( null );
    }
    illandril.game.ui.Controls.actionPendingFor = this;
    this.actionToRegister = action;
  },
  
  unregisterAction: function( action ) {
    var oldKey = this.reverseControls[action.name];
    if ( oldKey != null ) {
      delete this.controls[oldKey];
      delete this.reverseControls[action.name];
      this.notifyControlChangeListeners( [new illandril.game.ui.Controls.exportedAction( null, action )] );
    }
  },
  
  /**
   * @return {Array.<illandril.game.ui.Controls.exportedAction>} An array of actions with keys
   */
  getActionList: function() {
    var actions = [];
    for ( var key in this.controls ) {
      actions.push( new illandril.game.ui.Controls.exportedAction( key, this.controls[key] ) );
    }
    return actions;
  },
  
  registerControlChangeListener: function( listener, fn, notifyNow ) {
    this.controlChangeListeners.push( { listener: listener, fn: fn } );
    if ( notifyNow ) {
      fn.apply( listener, null, this.getActionList() );
    }
  },
  
  notifyControlChangeListeners: function( lastChanges ) {
    for ( var idx = 0; idx < this.controlChangeListeners.length; idx++ ) {
      var ln = this.controlChangeListeners[idx];
      ln.fn.apply( ln.listener, lastChanges || [], this.getActionList() );
    }
  }
};

goog.events.listen( document, goog.events.EventType.KEYDOWN, illandril.game.ui.Controls.keyDown );
goog.events.listen( document, goog.events.EventType.KEYUP, illandril.game.ui.Controls.keyUp );
goog.events.listen( document, goog.events.EventType.BLUR, illandril.game.ui.Controls.blur );

/**
 * @constructor
 */
illandril.game.ui.Controls.exportedAction = function( key, action ) {
  this.key = key;
  this["key"] = key;
  this.action = action;
  this["action"] = action;
};


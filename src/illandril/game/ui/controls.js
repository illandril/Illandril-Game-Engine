goog.provide("illandril.game.ui.Controls");

goog.require("illandril.util.Logger");
goog.require("goog.events");
goog.require("goog.events.EventType");
goog.require("goog.events.KeyCodes");
goog.require("goog.events.KeyHandler");
goog.require("goog.events.KeyNames");
goog.require("goog.userAgent");

/*
var usedCodes = {};
window["usedCodes"] = usedCodes;

var activeControls = [];
window["activeControls"] = activeControls;

var activeKeys = {};
window["activeKeys"] = activeKeys;

document.onkeydown = function( e ) {
  e = e || window.event;
  var kc = e.keyCode;
  activeKeys[kc] = true;
};

document.onkeyup = function( e ) {
  e = e || window.event;
  var kc = e.keyCode;
  activeKeys[kc] = false;
};

window.onblur = function() {
  activeKeys = {};
};

function updateControls() {
  for ( var kc in usedCodes ) {
    if ( activeKeys[kc] ) {
      for ( var idx = 0; idx < activeControls.length; idx++ ) {
        if ( activeControls[idx].keyPressed( kc ) ) {
          break;
        }
      }
    }
  }
}
*/

illandril.game.ui.Controls = {
  controls: {},
  reverseControls: {},
  keyStates: {},
  modifierKeyStates: { CTRL: false, ALT: false, SHIFT: false },
  controlChangeListeners: [],
  actionToRegister: null,
  registeringActionTimeout: null,
  
  getKeyState: function( e ) {
    var keyCode = e.KeyCode;
    if (goog.userAgent.GECKO &&
        e.keyCode in goog.events.KeyHandler.mozKeyCodeToKeyCodeMap_) {
      keyCode = goog.events.KeyHandler.mozKeyCodeToKeyCodeMap_[e.keyCode];
    } else {
      keyCode = e.keyCode;
    }
    return { keyCode: keyCode, ctrlKey: e.ctrlKey, altKey: e.altKey, shiftKey: e.shiftKey };
  },
  
  blur: function( e ) {
    illandril.game.ui.Controls.keyStates = {};
    illandril.game.ui.Controls.modifierKeyStates.CTRL = false;
    illandril.game.ui.Controls.modifierKeyStates.ALT = false;
    illandril.game.ui.Controls.modifierKeyStates.SHIFT = false;
  },
  
  keyDown: function( e ) {
    var ks = illandril.game.ui.Controls.getKeyState( e );
    var key = illandril.game.ui.Controls.getKeyEventKey( ks.keyCode, ks.ctrlKey, ks.altKey, ks.shiftKey );
    illandril.util.Logger.finest( "KeyDown: " + key );
    if ( ks.keyCode != goog.events.KeyCodes.SHIFT &&
         ks.keyCode != goog.events.KeyCodes.CTRL &&
         ks.keyCode != goog.events.KeyCodes.ALT ) {
      illandril.game.ui.Controls.keyStates[ks.keyCode] = true;
    }
    illandril.game.ui.Controls.modifierKeyStates.CTRL = ks.ctrlKey;
    illandril.game.ui.Controls.modifierKeyStates.ALT = ks.altKey;
    illandril.game.ui.Controls.modifierKeyStates.SHIFT = ks.shiftKey;
  },
  
  keyUp: function( e ) {
    var ks = illandril.game.ui.Controls.getKeyState( e );
    var key = illandril.game.ui.Controls.getKeyEventKey( ks.keyCode, ks.ctrlKey, ks.altKey, ks.shiftKey );
    illandril.util.Logger.finest( "KeyUp: " + key );
    delete illandril.game.ui.Controls.keyStates[ks.keyCode];
    illandril.game.ui.Controls.modifierKeyStates.CTRL = ks.ctrlKey;
    illandril.game.ui.Controls.modifierKeyStates.ALT = ks.altKey;
    illandril.game.ui.Controls.modifierKeyStates.SHIFT = ks.shiftKey;
  },
  
  handleKeyEvents: function() {
    var activeKeys = 0;
    for ( var keyCode in illandril.game.ui.Controls.keyStates ) {
      activeKeys++;
      var key = illandril.game.ui.Controls.getKeyEventKey( keyCode, illandril.game.ui.Controls.modifierKeyStates.CTRL,
                                                                    illandril.game.ui.Controls.modifierKeyStates.ALT,
                                                                    illandril.game.ui.Controls.modifierKeyStates.SHIFT );
      if ( illandril.game.ui.Controls.actionToRegister == null ) {
        if ( illandril.game.ui.Controls.controls[key] != null ) {
          illandril.game.ui.Controls.controls[key].execute();
        }
      }
    }
    if ( activeKeys == 1 && illandril.game.ui.Controls.actionToRegister != null ) {
        if ( illandril.game.ui.Controls.registeringActionTimeout != null ) {
          clearTimeout( illandril.game.ui.Controls.registeringActionTimeout );
        }
        illandril.game.ui.Controls.registeringActionTimeout = setTimeout( function() {
          illandril.game.ui.Controls.registerAction( illandril.game.ui.Controls.actionToRegister, key );
          illandril.game.ui.Controls.actionToRegister = null;
          illandril.game.ui.Controls.registeringActionTimeout = null;
        }, 100 );
      }
  },
  
  getKeyEventKey: function( keyCode, ctrl, alt, shift ) {
    return ( ctrl ? "ctrl + " : "" ) + ( alt ? "alt + " : "" ) + ( shift ? "shift + " : "" ) + goog.events.KeyNames[keyCode];
  },
  
  registerAction: function( action, keyCodeOrKey, ctrl, alt, shift ) {
    var key = keyCodeOrKey;
    if ( typeof( keyCodeOrKey ) == "number" ) {
      key = illandril.game.ui.Controls.getKeyEventKey( keyCodeOrKey, ctrl, alt, shift );
    }
    illandril.util.Logger.finest( "registerAction: " + key );
    var changes = [];
    var oldAction = illandril.game.ui.Controls.controls[key];
    var oldKey = illandril.game.ui.Controls.reverseControls[action.name];
    if ( oldAction != null ) {
      if ( oldKey != null ) {
        illandril.game.ui.Controls.controls[oldKey] = oldAction;
        illandril.game.ui.Controls.reverseControls[oldAction.name] = oldKey;
        changes.push( new exportedAction( oldKey, oldAction ) );
      } else {
        throw "The specified key is already in use for a different function.";
      }
    } else if ( oldKey != null ) {
      illandril.util.Logger.finest( "oldKey: " + oldKey );
      delete illandril.game.ui.Controls.controls[oldKey]
    }
    illandril.game.ui.Controls.controls[key] = action;
    illandril.game.ui.Controls.reverseControls[action.name] = key;
    changes.push( new exportedAction( key, action ) );
    illandril.game.ui.Controls.notifyControlChangeListeners( changes );
  },
  
  registerActionFromInput: function( action ) {
    illandril.game.ui.Controls.actionToRegister = action;
  },
  
  unregisterAction: function( action ) {
    var oldKey = illandril.game.ui.Controls.reverseControls[action.name];
    if ( oldKey != null ) {
      delete illandril.game.ui.Controls.controls[oldKey];
      delete illandril.game.ui.Controls.reverseControls[action.name];
      illandril.game.ui.Controls.notifyControlChangeListeners( [new exportedAction( null, action )] );
    }
  },
  
  /**
   * @return {Array.<exportedAction>} An array of actions with keys
   */
  getActionList: function() {
    var actions = [];
    for ( var key in illandril.game.ui.Controls.controls ) {
      actions.push( new exportedAction( key, illandril.game.ui.Controls.controls[key] ) );
    }
    return actions;
  },
  
  registerControlChangeListener: function( listener, notifyNow ) {
    illandril.game.ui.Controls.controlChangeListeners.push( listener );
    if ( notifyNow ) {
      listener( [], illandril.game.ui.Controls.getActionList() );
    }
  },
  
  notifyControlChangeListeners: function( lastChanges ) {
    for ( var idx = 0; idx < illandril.game.ui.Controls.controlChangeListeners.length; idx++ ) {
      illandril.game.ui.Controls.controlChangeListeners[idx]( lastChanges, illandril.game.ui.Controls.getActionList() );
    }
  }
};

goog.events.listen( document, goog.events.EventType.KEYDOWN, illandril.game.ui.Controls.keyDown );
goog.events.listen( document, goog.events.EventType.KEYUP, illandril.game.ui.Controls.keyUp );
goog.events.listen( document, goog.events.EventType.BLUR, illandril.game.ui.Controls.blur );

goog.exportSymbol( "illandril.game.ui.Controls.registerControlChangeListener", illandril.game.ui.Controls.registerControlChangeListener );
goog.exportSymbol( "illandril.game.ui.Controls.registerActionFromInput", illandril.game.ui.Controls.registerActionFromInput );
/**
 * @constructor
 */
var exportedAction = function( key, action ) {
  this.key = key;
  this["key"] = key;
  this.action = action;
  this["action"] = action;
};

 /*
function( title ) {
  this.codesToFn = {};
  this.fnToCode = {}
  var acIndex = activeControls.length;
  activeControls[acIndex] = this;
};

illandril.game.ui.Controls.prototype.register = function( keyCode, fn, name ) {
  if ( usedCodes[keyCode] ) {
    alert( "That key is already used by " + usedCodes[keyCode] );
  } else {
    var oldCode = this.fnToCode[fn];
    if ( oldCode != null ) {
      this.codeToFn[oldCode] = null;
      usedCodes[oldCode] = null;
    }
    usedCodes[keyCode] = name;
    this.codesToFn[keyCode] = fn;
    this.fnToCode[fn] = keyCode;
  }
};

illandril.game.ui.Controls.prototype.keyPressed = function( keyCode ) {
  var fn = this.codesToFn[keyCode];
  if ( fn != null ) {
    fn();
  }
};
*/

/**
 * @preserve Copyright (c) 2011, Joseph Spandrusyszyn
 * See https://github.com/illandril/Illandril-Game-Engine.
 */

goog.provide('game.controls');

goog.require('goog.events');
goog.require('goog.events.EventType');
goog.require('goog.events.KeyCodes');
goog.require('goog.events.KeyHandler');
goog.require('goog.events.KeyNames');
goog.require('goog.userAgent');

/**
 * @constructor
 */
game.controls = function(name) {
  this.id = game.controls.nextID++;
  this.name = name;
  this.controls = {};
  this.reverseControls = {};
  this.controlChangeListeners = [];
  this.actionToRegister = null;
  this.registeringActionTimeout = null;
};

game.controls.nextID = 0;

game.controls.actionPendingFor = null;

game.controls.keyStates = {};
game.controls.modifierKeyStates = { CTRL: false, CTRL_LAST: {}, ALT: false, ALT_LAST: {}, SHIFT: false, SHIFT_LAST: {} };

game.controls.rememberCurrentAsLastKeyState = function() {
  for (var keyCode in game.controls.keyStates) {
    game.controls.keyStates[keyCode].wasActive = true;
  }
  game.controls.modifierKeyStates.CTRL_LAST = game.controls.modifierKeyStates.CTRL;
  game.controls.modifierKeyStates.ALT_LAST = game.controls.modifierKeyStates.ALT;
  game.controls.modifierKeyStates.SHIFT_LAST = game.controls.modifierKeyStates.SHIFT;
};

game.controls.getKeyState = function(e) {
  var keyCode = e.KeyCode;
  if (goog.userAgent.GECKO &&
       e.keyCode in goog.events.KeyHandler.mozKeyCodeToKeyCodeMap_) {
    keyCode = goog.events.KeyHandler.mozKeyCodeToKeyCodeMap_[e.keyCode];
  } else {
    keyCode = e.keyCode;
  }
  return { keyCode: keyCode, ctrlKey: e.ctrlKey, altKey: e.altKey, shiftKey: e.shiftKey };
};

game.controls.blur = function(e) {
  game.controls.keyStates = {};
  game.controls.modifierKeyStates.CTRL = false;
  game.controls.modifierKeyStates.CTRL_LAST = false;
  game.controls.modifierKeyStates.ALT = false;
  game.controls.modifierKeyStates.ALT_LAST = false;
  game.controls.modifierKeyStates.SHIFT = false;
  game.controls.modifierKeyStates.SHIFT_LAST = false;
};

game.controls.keyDown = function(e) {
  var ks = game.controls.getKeyState(e);
  var key = game.controls.getKeyEventKey(ks.keyCode, ks.ctrlKey, ks.altKey, ks.shiftKey);
  if (ks.keyCode != goog.events.KeyCodes.SHIFT &&
       ks.keyCode != goog.events.KeyCodes.CTRL &&
       ks.keyCode != goog.events.KeyCodes.ALT) {
    if (game.controls.keyStates[ks.keyCode] == null) {
      game.controls.keyStates[ks.keyCode] = { wasActive: false };
    }
  }
  game.controls.modifierKeyStates.CTRL = ks.ctrlKey;
  game.controls.modifierKeyStates.ALT = ks.altKey;
  game.controls.modifierKeyStates.SHIFT = ks.shiftKey;
};

game.controls.keyUp = function(e) {
  var ks = game.controls.getKeyState(e);
  var key = game.controls.getKeyEventKey(ks.keyCode, ks.ctrlKey, ks.altKey, ks.shiftKey);
  delete game.controls.keyStates[ks.keyCode];
  game.controls.modifierKeyStates.CTRL = ks.ctrlKey;
  game.controls.modifierKeyStates.ALT = ks.altKey;
  game.controls.modifierKeyStates.SHIFT = ks.shiftKey;
};

game.controls.getKeyEventKey = function(keyCode, ctrl, alt, shift) {
  var keyName = goog.events.KeyNames[keyCode];
  if (keyName == null) {
    keyName = 'KEY[' + keyCode + ']';
  }
  return (ctrl ? 'Ctrl + ' : '') + (alt ? 'Alt + ' : '') + (shift ? 'Shift + ' : '') + keyName.toUpperCase();
};

game.controls.prototype = {
  handleKeyEvents: function(time, tickTime) {
    var activeKeys = 0;
    var modifierRepeat = game.controls.modifierKeyStates.CTRL == game.controls.modifierKeyStates.CTRL_LAST &&
                         game.controls.modifierKeyStates.ALT == game.controls.modifierKeyStates.ALT_LAST &&
                         game.controls.modifierKeyStates.SHIFT == game.controls.modifierKeyStates.SHIFT_LAST;
    for (var keyCode in game.controls.keyStates) {
      var repeat = modifierRepeat && game.controls.keyStates[keyCode].wasActive;

      activeKeys++;
      var key = game.controls.getKeyEventKey(keyCode, game.controls.modifierKeyStates.CTRL,
                                                                   game.controls.modifierKeyStates.ALT,
                                                                   game.controls.modifierKeyStates.SHIFT);
      if (this.actionToRegister == null) {
        if (this.controls[key] != null && (!repeat || this.controls[key].executeOnRepeat)) {
          this.controls[key].execute(tickTime);
        }
      }
    }
    if (activeKeys == 1 && this.actionToRegister != null) {
      if (this.registeringActionTimeout != null) {
        clearTimeout(this.registeringActionTimeout);
      }
      var controls = this;
      this.registeringActionTimeout = setTimeout(function() {
        controls.registerAction(controls.actionToRegister, key);
        controls.actionToRegister = null;
        game.controls.actionPendingFor = null;
        controls.registeringActionTimeout = null;
      }, 100);
    }
  },

  getKeyForAction: function(action) {
    return this.reverseControls[action];
  },

  registerAction: function(action, keyCodeOrKey, ctrl, alt, shift) {
    var key = keyCodeOrKey;
    if (typeof(keyCodeOrKey) == 'number') {
      key = game.controls.getKeyEventKey(keyCodeOrKey, ctrl, alt, shift);
    }
    var changes = [];
    var oldAction = this.controls[key];
    var oldKey = this.reverseControls[action.name];
    if (oldAction != null) {
      if (oldKey != null) {
        this.controls[oldKey] = oldAction;
        this.reverseControls[oldAction.name] = oldKey;
        changes.push(new game.controls.exportedAction(oldKey, oldAction));
      } else {
        throw 'The specified key is already in use for a different function.';
      }
    } else if (oldKey != null) {
      delete this.controls[oldKey];
    }
    this.controls[key] = action;
    this.reverseControls[action.name] = key;
    changes.push(new game.controls.exportedAction(key, action));
    this.notifyControlChangeListeners(changes);
  },

  registerActionFromInput: function(action) {
    if (game.controls.actionPendingFor != null) {
      game.controls.actionPendingFor.notifyControlChangeListeners(null);
    }
    game.controls.actionPendingFor = this;
    this.actionToRegister = action;
  },

  unregisterAction: function(action) {
    var oldKey = this.reverseControls[action.name];
    if (oldKey != null) {
      delete this.controls[oldKey];
      delete this.reverseControls[action.name];
      this.notifyControlChangeListeners([new game.controls.exportedAction(null, action)]);
    }
  },

  /**
   * @return {Array.<game.controls.exportedAction>} An array of actions with keys.
   */
  getActionList: function() {
    var actions = [];
    for (var key in this.controls) {
      actions.push(new game.controls.exportedAction(key, this.controls[key]));
    }
    return actions;
  },

  registerControlChangeListener: function(listener, fn, notifyNow) {
    this.controlChangeListeners.push({ listener: listener, fn: fn });
    if (notifyNow) {
      fn.apply(listener, null, this.getActionList());
    }
  },

  notifyControlChangeListeners: function(lastChanges) {
    for (var idx = 0; idx < this.controlChangeListeners.length; idx++) {
      var ln = this.controlChangeListeners[idx];
      ln.fn.apply(ln.listener, lastChanges || [], this.getActionList());
    }
  }
};

goog.events.listen(document, goog.events.EventType.KEYDOWN, game.controls.keyDown);
goog.events.listen(document, goog.events.EventType.KEYUP, game.controls.keyUp);
goog.events.listen(document, goog.events.EventType.BLUR, game.controls.blur);

/**
 * @constructor
 */
game.controls.exportedAction = function(key, action) {
  this.key = key;
  this['key'] = key;
  this.action = action;
  this['action'] = action;
};


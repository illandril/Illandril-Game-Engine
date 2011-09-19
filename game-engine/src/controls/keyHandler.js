goog.provide('illandril.game.controls.keyHandler');

goog.require('goog.events');
goog.require('goog.events.EventType');
goog.require('goog.events.KeyCodes');
goog.require('goog.events.KeyHandler');
goog.require('goog.events.KeyNames');
goog.require('goog.userAgent');

/**
 * @param {string} name
 * @constructor
 */
illandril.game.controls.keyHandler = function(name) {
    /** @type {number} */
    this.id = illandril.game.controls.keyHandler.nextID++;
    
    /** @type {string} */
    this.name = name;
    
    this.controls = {};
    
    this.reverseControls = {};
    
    this.controlChangeListeners = [];
    
    /** @type {illandril.game.controls.action} */
    this.actionToRegister = null;
    
    /** @type {?number} */
    this.registeringActionTimeout = null;
};

/**
 * @param {number} time
 * @param {number} tick
 */
illandril.game.controls.keyHandler.prototype.handleKeyEvents = function(time, tick) {
    var activeKeys = 0;
    var modifierRepeat = illandril.game.controls.keyHandler.modifierKeyStates.CTRL == illandril.game.controls.keyHandler.modifierKeyStates.CTRL_LAST && illandril.game.controls.keyHandler.modifierKeyStates.ALT == illandril.game.controls.keyHandler.modifierKeyStates.ALT_LAST && illandril.game.controls.keyHandler.modifierKeyStates.SHIFT == illandril.game.controls.keyHandler.modifierKeyStates.SHIFT_LAST;
    for (var keyCode in illandril.game.controls.keyHandler.keyStates) {
        var repeat = modifierRepeat && illandril.game.controls.keyHandler.keyStates[keyCode].wasActive;
        
        activeKeys++;
        var key = illandril.game.controls.keyHandler.getKeyEventKey(keyCode, illandril.game.controls.keyHandler.modifierKeyStates.CTRL, illandril.game.controls.keyHandler.modifierKeyStates.ALT, illandril.game.controls.keyHandler.modifierKeyStates.SHIFT);
        if (this.actionToRegister == null) {
            if (this.controls[key] != null && (!repeat || this.controls[key].executeOnRepeat)) {
                this.controls[key].execute(tick);
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
            illandril.game.controls.keyHandler.actionPendingFor = null;
            controls.registeringActionTimeout = null;
        }, 100);
    }
};

/**
 * @param {!illandril.game.controls.action} action
 */
illandril.game.controls.keyHandler.prototype.getKeyForAction = function(action) {
    return this.reverseControls[action.name];
};

/**
 * @param {!illandril.game.controls.action} action
 * @param {number|string} keyCodeOrKey
 * @param {boolean=} ctrl
 * @param {boolean=} alt
 * @param {boolean=} shift
 */
illandril.game.controls.keyHandler.prototype.registerAction = function(action, keyCodeOrKey, ctrl, alt, shift) {
    var key = keyCodeOrKey;
    if (typeof(keyCodeOrKey) == 'number') {
        key = illandril.game.controls.keyHandler.getKeyEventKey(keyCodeOrKey, ctrl, alt, shift);
    }
    var changes = [];
    var oldAction = this.controls[key];
    var oldKey = this.reverseControls[action.name];
    if (oldAction != null) {
        if (oldKey != null) {
            this.controls[oldKey] = oldAction;
            this.reverseControls[oldAction.name] = oldKey;
            changes.push(new illandril.game.controls.keyHandler.exportedAction(oldKey, oldAction));
        } else {
            throw 'The specified key is already in use for a different function.';
        }
    } else if (oldKey != null) {
        delete this.controls[oldKey];
    }
    this.controls[key] = action;
    this.reverseControls[action.name] = key;
    changes.push(new illandril.game.controls.keyHandler.exportedAction(key, action));
    this.notifyControlChangeListeners(changes);
};

/**
 * @param {!illandril.game.controls.action} action
 */
illandril.game.controls.keyHandler.prototype.registerActionFromInput = function(action) {
    if (illandril.game.controls.keyHandler.actionPendingFor != null) {
        illandril.game.controls.keyHandler.actionPendingFor.notifyControlChangeListeners(null);
    }
    illandril.game.controls.keyHandler.actionPendingFor = this;
    this.actionToRegister = action;
};

/**
 * @param {!illandril.game.controls.action} action
 */
illandril.game.controls.keyHandler.prototype.unregisterAction = function(action) {
    var oldKey = this.reverseControls[action.name];
    if (oldKey != null) {
        delete this.controls[oldKey];
        delete this.reverseControls[action.name];
        this.notifyControlChangeListeners([new illandril.game.controls.keyHandler.exportedAction(null, action)]);
    }
};

/**
 * @return {Array.<illandril.game.controls.keyHandler.exportedAction>} An array of actions with keys.
 */
illandril.game.controls.keyHandler.prototype.getActionList = function() {
    var actions = [];
    for (var key in this.controls) {
        actions.push(new illandril.game.controls.keyHandler.exportedAction(key, this.controls[key]));
    }
    return actions;
};

illandril.game.controls.keyHandler.prototype.registerControlChangeListener = function(listener, fn, notifyNow) {
    this.controlChangeListeners.push({
        listener: listener,
        fn: fn
    });
    if (notifyNow) {
        fn.apply(listener, null, this.getActionList());
    }
};

illandril.game.controls.keyHandler.prototype.notifyControlChangeListeners = function(lastChanges) {
    for (var idx = 0; idx < this.controlChangeListeners.length; idx++) {
        var ln = this.controlChangeListeners[idx];
        ln.fn.apply(ln.listener, lastChanges || [], this.getActionList());
    }
};

/**
 * @type {number}
 * @private
 */
illandril.game.controls.keyHandler.nextID = 0;

/**
 * @type {illandril.game.controls.keyHandler}
 * @private
 */
illandril.game.controls.keyHandler.actionPendingFor = null;

/**
 * @type {Object.<number, Object.<string, boolean>>}
 */
illandril.game.controls.keyHandler.keyStates = {};

/**
 * @type {Object.<string, boolean|Object.<string, boolean>>}
 */
illandril.game.controls.keyHandler.modifierKeyStates = { CTRL: false, CTRL_LAST: {}, ALT: false, ALT_LAST: {}, SHIFT: false, SHIFT_LAST: {} };

illandril.game.controls.keyHandler.rememberCurrentAsLastKeyState = function() {
  for (var keyCode in illandril.game.controls.keyHandler.keyStates) {
    illandril.game.controls.keyHandler.keyStates[keyCode].wasActive = true;
  }
  illandril.game.controls.keyHandler.modifierKeyStates.CTRL_LAST = illandril.game.controls.keyHandler.modifierKeyStates.CTRL;
  illandril.game.controls.keyHandler.modifierKeyStates.ALT_LAST = illandril.game.controls.keyHandler.modifierKeyStates.ALT;
  illandril.game.controls.keyHandler.modifierKeyStates.SHIFT_LAST = illandril.game.controls.keyHandler.modifierKeyStates.SHIFT;
};

illandril.game.controls.keyHandler.getKeyState = function(e) {
  var keyCode = e.KeyCode;
  if (goog.userAgent.GECKO &&
       e.keyCode in goog.events.KeyHandler.mozKeyCodeToKeyCodeMap_) {
    keyCode = goog.events.KeyHandler.mozKeyCodeToKeyCodeMap_[e.keyCode];
  } else {
    keyCode = e.keyCode;
  }
  return { keyCode: keyCode, ctrlKey: e.ctrlKey, altKey: e.altKey, shiftKey: e.shiftKey };
};

illandril.game.controls.keyHandler.blur = function(e) {
  illandril.game.controls.keyHandler.keyStates = {};
  illandril.game.controls.keyHandler.modifierKeyStates.CTRL = false;
  illandril.game.controls.keyHandler.modifierKeyStates.CTRL_LAST = false;
  illandril.game.controls.keyHandler.modifierKeyStates.ALT = false;
  illandril.game.controls.keyHandler.modifierKeyStates.ALT_LAST = false;
  illandril.game.controls.keyHandler.modifierKeyStates.SHIFT = false;
  illandril.game.controls.keyHandler.modifierKeyStates.SHIFT_LAST = false;
};

illandril.game.controls.keyHandler.keyDown = function(e) {
  var ks = illandril.game.controls.keyHandler.getKeyState(e);
  var key = illandril.game.controls.keyHandler.getKeyEventKey(ks.keyCode, ks.ctrlKey, ks.altKey, ks.shiftKey);
  if (ks.keyCode != goog.events.KeyCodes.SHIFT &&
       ks.keyCode != goog.events.KeyCodes.CTRL &&
       ks.keyCode != goog.events.KeyCodes.ALT) {
    if (illandril.game.controls.keyHandler.keyStates[ks.keyCode] == null) {
      illandril.game.controls.keyHandler.keyStates[ks.keyCode] = { wasActive: false };
    }
  }
  illandril.game.controls.keyHandler.modifierKeyStates.CTRL = ks.ctrlKey;
  illandril.game.controls.keyHandler.modifierKeyStates.ALT = ks.altKey;
  illandril.game.controls.keyHandler.modifierKeyStates.SHIFT = ks.shiftKey;
};

illandril.game.controls.keyHandler.keyUp = function(e) {
  var ks = illandril.game.controls.keyHandler.getKeyState(e);
  var key = illandril.game.controls.keyHandler.getKeyEventKey(ks.keyCode, ks.ctrlKey, ks.altKey, ks.shiftKey);
  delete illandril.game.controls.keyHandler.keyStates[ks.keyCode];
  illandril.game.controls.keyHandler.modifierKeyStates.CTRL = ks.ctrlKey;
  illandril.game.controls.keyHandler.modifierKeyStates.ALT = ks.altKey;
  illandril.game.controls.keyHandler.modifierKeyStates.SHIFT = ks.shiftKey;
};

/**
 * @param {number} keyCode
 * @param {boolean=} ctrl
 * @param {boolean=} alt
 * @param {boolean=} shift
 */
illandril.game.controls.keyHandler.getKeyEventKey = function(keyCode, ctrl, alt, shift) {
  var keyName = goog.events.KeyNames[keyCode];
  if (keyName == null) {
    keyName = 'KEY[' + keyCode + ']';
  }
  return (ctrl ? 'Ctrl + ' : '') + (alt ? 'Alt + ' : '') + (shift ? 'Shift + ' : '') + keyName.toUpperCase();
};

goog.events.listen(document, goog.events.EventType.KEYDOWN, illandril.game.controls.keyHandler.keyDown);
goog.events.listen(document, goog.events.EventType.KEYUP, illandril.game.controls.keyHandler.keyUp);
goog.events.listen(document, goog.events.EventType.BLUR, illandril.game.controls.keyHandler.blur);

/**
 * @constructor
 */
illandril.game.controls.keyHandler.exportedAction = function(key, action) {
  this.key = key;
  this['key'] = key;
  this.action = action;
  this['action'] = action;
};


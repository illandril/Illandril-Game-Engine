var usedCodes = {};
window["usedCodes"] = usedCodes;

var activeControls = [];
window["activeControls"] = activeControls;

var activeKeys = {};
window["activeKeys"] = activeKeys;

window.onkeydown = function( e ) {
  var kc = e.keyCode;
  activeKeys[kc] = true;
}

window.onkeyup = function( e ) {
  var kc = e.keyCode;
  activeKeys[kc] = false;
}

window.onblur = function() {
  activeKeys = {};
}

setInterval( function() {
  for ( var kc in usedCodes ) {
    if ( activeKeys[kc] ) {
      for ( var idx = 0; idx < activeControls.length; idx++ ) {
        if ( activeControls[idx].keyPressed( kc ) ) {
          break;
        }
      }
    }
  }
}, 100 );

/**
 * @constructor
 */
Controls = function( title ) {
  this.codesToFn = {};
  this.fnToCode = {}
  var acIndex = activeControls.length;
  activeControls[acIndex] = this;
}

Controls.prototype.register = function( keyCode, fn, name ) {
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
}

Controls.prototype.keyPressed = function( keyCode ) {
  var fn = this.codesToFn[keyCode];
  if ( fn != null ) {
    fn();
  }
}
Controls.prototype["keyPressed"] = Controls.prototype.keyPressed;

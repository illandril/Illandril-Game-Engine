/**
 * @preserve Copyright (c) 2011, Joseph Spandrusyszyn
 * See https://github.com/illandril/Illandril-Game-Engine.
 */


goog.provide('illandril.game.Engine');

goog.require('goog.events');
goog.require('goog.events.KeyCodes');
goog.require('goog.math.Vec2');
goog.require('goog.net.EventType');
goog.require('goog.net.XhrIo');
goog.require('goog.style');
goog.require('goog.ui.Dialog');
goog.require('goog.ui.KeyboardShortcutHandler');
goog.require('illandril');
goog.require('illandril.game.objects.GameObject');
goog.require('illandril.game.objects.Wall');
goog.require('illandril.game.ui.Action');
goog.require('illandril.game.ui.Controls');
goog.require('illandril.game.util.Framerate');
goog.require('illandril.math.Bounds');

/**
 * @param {string} gameContainerID The ID of the dom element containing the game.
 * @constructor
 */
illandril.game.Engine = function(gameContainerID) {
  this.debug = {
    FPS: true,
    objectCount: false,
    bounding: false
  };
  this.allowLagPause = true;
  this.resumeOnLoadingFinish = true;
  this.paused = true;
  this.lagPaused = false;
  this.lagCount = 0;
  this.loading = 0;

  this.maps = [];
  this.currentScene = null;
  this.lastScene = null;
  this.startTime = new Date(),

  this.container = document.getElementById(gameContainerID);

  this.initDebug();
  this.initNoClick();
  this.initControls();
  this.initDialogs();
};

/**
 * The desired delay between each frame, in MS
 * @const {number}
 */
illandril.game.Engine.prototype.TARGET_TIMEOUT = 33, // 16 - about 60 FPS; 33 - about 30 FPS
illandril.game.Engine.prototype.MINIMUM_TIMEOUT = 2, // Make sure computer has time to respond to other programs in case the game is causing lag
illandril.game.Engine.prototype.LAG_TIMEOUT = 100, // About 10 FPS
illandril.game.Engine.prototype.TICKS_FOR_LAG = 2, // Reduce lag warning chance for fluke frames

illandril.game.Engine.prototype.initControls = function() {
  if (this.controls != null) {
    return;
  }
  this.controls = new illandril.game.ui.Controls();
  this.controls.registerControlChangeListener(this, this.updateDialogs);

  var self = this;
  this.pauseAction = new illandril.game.ui.Action(function() { self.togglePause(); }, 'Pause', false);
  this.controls.registerAction(this.pauseAction, goog.events.KeyCodes.P, false, false, false);

  this.noLagPauseAction = new illandril.game.ui.Action(function() { self.allowLagPause = false; }, 'Prevent Lag Pause', false);
  this.controls.registerAction(this.noLagPauseAction, goog.events.KeyCodes.L, false, false, true);

  this.debugFPSAction = new illandril.game.ui.Action(function() { if (!self.paused) { self.debugFPS = !self.debugFPS; } }, 'Debug FPS', false);
  this.controls.registerAction(this.debugFPSAction, goog.events.KeyCodes.F8, false, false, false);

  this.debugObjectCountAction = new illandril.game.ui.Action(function() { if (!self.paused) { self.debug.objectCount = !self.debug.objectCount; } }, 'Debug Object Count', false);
  this.controls.registerAction(this.debugObjectCountAction, goog.events.KeyCodes.F7, false, false, false);
  
  this.debugBoundingAction = new illandril.game.ui.Action(function() { if (!self.paused) { self.debug.bounding = !self.debug.bounding; } }, 'Debug Bounding Boxes', false);
  this.controls.registerAction(this.debugBoundingAction, goog.events.KeyCodes.F9, false, false, false);
};

illandril.game.Engine.prototype.initDebug = function() {
  if (this.debugContainer != null) {
    return;
  }
  this.debugContainer = document.createElement('span');
  this.debugContainer.style.position = 'absolute';
  this.debugContainer.style.zIndex = 99998;
  this.debugContainer.style.textAlign = 'left';
  this.debugContainer.style.fontSize = '12px';
  this.debugContainer.style.fontWeight = 'bold';
  this.debugContainer.style.fontFamily = 'Courier New';
  this.debugContainer.style.backgroundColor = 'white';
  this.debugContainer.style.padding = '2px';
  this.container.appendChild(this.debugContainer);
};

illandril.game.Engine.prototype.initNoClick = function() {
  if (this.noClick != null) {
    return;
  }
  this.noClick = document.createElement('div');
  this.noClick.style.position = 'absolute';
  this.noClick.style.zIndex = 99997;
  if (this.container.width != null) {
    this.noClick.style.width = this.container.width;
    this.noClick.style.height = this.container.height;
  }
  this.noClick.style.backgroundColor = '#000';
  goog.style.setOpacity(this.noClick, 0.5);
  this.noClick.style.display = 'none';
  this.container.appendChild(this.noClick);
};

illandril.game.Engine.prototype.initDialogs = function() {
  this.initLagDialog();
  this.initPausedDialog();
  this.initLoadingDialog();
  this.updateDialogs();
};

illandril.game.Engine.prototype.updateDialogs = function() {
  this.updateLagDialog();
  this.updatePausedDialog();
};

illandril.game.Engine.prototype.initLagDialog = function() {
  if (this.lagDialog != null) {
    return;
  }
  this.lagDialog = new goog.ui.Dialog();
  this.lagDialog.setTitle('Game Lagging');
  this.lagDialog.setButtonSet(new goog.ui.Dialog.ButtonSet());
  this.lagDialog.setHasTitleCloseButton(false);
  this.lagDialog.setEscapeToCancel(false);
  this.lagDialog.setDraggable(false);
  this.lagDialog.setModal(false);
  this.lagDialog.setVisible(false);
};

illandril.game.Engine.prototype.updateLagDialog = function() {
  if (this.lagDialog == null) {
    return;
  }
  var pauseKey = this.controls.getKeyForAction(this.pauseAction.name);
  var noLagPauseKey = this.controls.getKeyForAction(this.noLagPauseAction.name);
  this.lagDialog.setContent("You appear to be experiencing excessive lag. Your game has been paused.<br>Please close any programs that may be slowing down your system.<br>Press '" + noLagPauseKey + "' to prevent the game from auto-pausing on lag spikes.<br>Press '" + pauseKey + "' to try to resume playing.");
};

illandril.game.Engine.prototype.initPausedDialog = function() {
  if (this.pausedDialog != null) {
    return;
  }
  this.pausedDialog = new goog.ui.Dialog();
  this.pausedDialog.setTitle('Game Paused');
  this.pausedDialog.setButtonSet(new goog.ui.Dialog.ButtonSet());
  this.pausedDialog.setHasTitleCloseButton(false);
  this.pausedDialog.setEscapeToCancel(false);
  this.pausedDialog.setDraggable(false);
  this.pausedDialog.setModal(false);
  this.pausedDialog.setVisible(false);
};

illandril.game.Engine.prototype.updatePausedDialog = function() {
  if (this.pausedDialog == null) {
    return;
  }
  var pauseKey = this.controls.getKeyForAction(this.pauseAction.name);
  this.pausedDialog.setContent("Your game has been paused.<br>Press '" + pauseKey + "' to resume.");
};

illandril.game.Engine.prototype.initLoadingDialog = function() {
  if (this.loadingDialog != null) {
    return;
  }
  this.loadingDialog = new goog.ui.Dialog();
  this.loadingDialog.setTitle('Loading');
  this.loadingDialog.setContent('Loading, please wait...');
  this.loadingDialog.setButtonSet(new goog.ui.Dialog.ButtonSet());
  this.loadingDialog.setHasTitleCloseButton(false);
  this.loadingDialog.setEscapeToCancel(false);
  this.loadingDialog.setDraggable(false);
  this.loadingDialog.setModal(false);
  this.loadingDialog.setVisible(true);
};

illandril.game.Engine.prototype.addActionToControls = function(action, keyCodeOrKey, ctrl, alt, shift ) {
  this.controls.registerAction(action, keyCodeOrKey, ctrl, alt, shift);
};

illandril.game.Engine.prototype.addStandardEngineControlsToScene = function(controlScene ) {
  controlScene.addControl(this.controls, this.pauseAction);
  controlScene.addControl(this.controls, this.debugFPSAction);
  controlScene.addControl(this.controls, this.debugObjectCountAction);
};

illandril.game.Engine.prototype.loadScene = function(scene ) {
  if (scene == null) {
    throw 'Null Scene!';
  }
  this.currentScene = scene;
};

illandril.game.Engine.prototype.start = function() {
  if (this.currentScene == null) {
    throw 'Starting engine without giving a scene first!';
  }
  illandril.game.util.Framerate.reset();
  this.tick();
};

illandril.game.Engine.prototype.loadMap = function(mapSrc, scene, callback ) {
  this.startLoad();
  this._loadMap(mapSrc, scene, callback);
};

illandril.game.Engine.prototype._loadMap = function(mapSrc, scene, callback ) {
  if (mapSrc != null && this.maps[mapSrc] == null) {
    var mapPullRequest = new goog.net.XhrIo();
    var self = this;
    goog.events.listen(mapPullRequest, goog.net.EventType.COMPLETE, function(e) {
      self.maps[mapSrc] = this.getResponseJson() || [];
      self._loadMap(mapSrc, scene, callback);
    });
    mapPullRequest.send(mapSrc);
  } else if (mapSrc == null || this.maps[mapSrc].length == 0) {
    callback(mapSrc, scene);
    this.endLoad();
  } else {
    scene.startBulk();
    while (this.maps[mapSrc].length > 0) {
      var objDef = this.maps[mapSrc].pop();
      var xStart = objDef['x'];
      var xEnd = objDef['xEnd'] || xStart;
      var yStart = objDef['y'];
      var yEnd = objDef['yEnd'] || yStart;
      var width = objDef['width'];
      var height = objDef['height'];
      var bgOffsetX = objDef['bgOffsetX'] || 0;
      var bgOffsetY = objDef['bgOffsetY'] || 0;
      for (var x = xStart; x <= xEnd; x += width) {
        for (var y = yStart; y <= yEnd; y += height) {
          var sprite = null;
          if (objDef['bg'] != null) {
            sprite = new illandril.game.ui.StaticSprite(objDef['bg'], new goog.math.Vec2(bgOffsetX, bgOffsetY));
          }
          if (objDef['solid'] != null && objDef['solid'] == false) {
            new illandril.game.objects.GameObject(scene, new illandril.math.Bounds(new goog.math.Vec2(x, y), new goog.math.Vec2(width, height)), sprite, objDef['zIndex']);
          } else {
            new illandril.game.objects.Wall(scene, new illandril.math.Bounds(new goog.math.Vec2(x, y), new goog.math.Vec2(width, height)), sprite, objDef['zIndex']);
          }
        }
      }
      if (this.maps[mapSrc].length % 100 == 0) {
        break; // Make sure the UI still responds
      }
    }
    scene.endBulk();
    var self = this;
    setTimeout(function() { self._loadMap(mapSrc, scene, callback); }, 0);
  }
};
illandril.game.Engine.prototype.tick = function() {
  var tickTime = illandril.game.util.Framerate.tick();
  if (illandril.game.ui.Controls.actionPendingFor != null) {
    illandril.game.ui.Controls.actionPendingFor.handleKeyEvents(tickTime);
  }
  this.controls.handleKeyEvents(tickTime);
  if (!this.paused && this.allowLagPause && tickTime > this.LAG_TIMEOUT) {
    this.lagCount++;
    if (this.lagCount >= this.TICKS_FOR_LAG) {
      this.lagPaused = true;
      this.pause();
    }
  } else {
    this.lagCount = 0;
  }

  if (this.paused) {
    //illandril.game.util.Framerate.reset();
  } else {
    var scene = this.currentScene;
    if (scene != this.lastScene) {
      if (this.lastScene != null) {
        for (var i = 0; i < this.lastScene.viewports.length; i++) {
          this.lastScene.viewports[i].hide();
        }
      }
      this.lastScene = scene;
    }
    for (var i = 0; i < scene.viewports.length; i++) {
      scene.viewports[i].show();
      scene.viewports[i].DEBUG_BOUNDING = this.debug.bounding;
    }
    scene.getControls().handleKeyEvents(tickTime);
    scene.update(tickTime, illandril.game.util.Framerate.getTotalTime());
    if (illandril.game.util.Framerate.totalFrames % 5 == 0) {
      this.debugContainer.innerHTML = '';
      if (this.debug.FPS) {
        this.debugContainer.innerHTML = 'FPS: ' + illandril.game.util.Framerate.getAverageFPS().toString().substr(0, 5) + ':' + illandril.game.util.Framerate.getRollingAverageFPS().toString().substr(0, 5);
        if (this.debug.objectCount) {
          this.debugContainer.innerHTML = this.debugContainer.innerHTML + '<br>';
        }
      }
      if (this.debug.objectCount) {
        this.debugContainer.innerHTML = this.debugContainer.innerHTML + 'Game Objects: ' + scene.getObjects().getAllObjects().length;
        this.debugContainer.innerHTML = this.debugContainer.innerHTML + '<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Solid: ' + scene.getObjects().getSolidObjects().length;
        this.debugContainer.innerHTML = this.debugContainer.innerHTML + '<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Active: ' + scene.getObjects().getActiveObjects().length;
        this.debugContainer.innerHTML = this.debugContainer.innerHTML + '<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Movers: ' + scene.movingLastUpdate;
        this.debugContainer.innerHTML = this.debugContainer.innerHTML + '<br>DOM Objects: ' + document.all.length;
      }
      this.debugContainer.style.display = (this.debugContainer.innerHTML == '') ? 'none' : '';
    }
  }

  var timeout = this.TARGET_TIMEOUT - (new Date() - illandril.game.util.Framerate.lastFrameStamp);
  if (timeout < this.MINIMUM_TIMEOUT) {
    timeout = this.MINIMUM_TIMEOUT;
  }
  var self = this;
  setTimeout(function() { self.tick(); }, timeout);
};

illandril.game.Engine.prototype.startLoad = function() {
  this.loading++;
  this.loadingDialog.setVisible(true);
  this._pause();
};

illandril.game.Engine.prototype.endLoad = function() {
  this.loading--;
  if (this.loading == 0) {
    this.loadingDialog.setVisible(false);
    if (this.resumeOnLoadingFinish) {
      this.resume();
    } else {
      this._pause();
    }
  }
};

illandril.game.Engine.prototype.togglePause = function() {
  if (this.paused) {
    this.resume();
  } else {
    this.pause();
  }
};

illandril.game.Engine.prototype.pause = function() {
  this.resumeOnLoadingFinish = false;
  this._pause();
};

illandril.game.Engine.prototype._pause = function() {
  this.paused = true;
  if (this.lagPaused) {
    this.lagDialog.setVisible(this.loading == 0);
  } else {
    this.pausedDialog.setVisible(this.loading == 0);
  }
  this.noClick.style.display = '';
  this.noClick.style.width = this.container.clientWidth + 'px';
  this.noClick.style.height = this.container.clientHeight + 'px';
};

illandril.game.Engine.prototype.resume = function() {
  if (this.loading == 0) {
    this.lagPaused = false;
    this.paused = false;
    this.resumeOnLoadingFinish = true;
    this.pausedDialog.setVisible(false);
    this.lagDialog.setVisible(false);
    this.noClick.style.display = 'none';
  }
};


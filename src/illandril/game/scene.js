goog.provide("illandril.game.Scene");

goog.require("illandril.game.ui.Controls");

/**
 * @constructor
 */
illandril.game.Scene = function( name ) {
  this.controls = new illandril.game.ui.Controls( name );
  
  this.tickCount = 0;
  this.lastSceneTime = 0;
  this.lastTickTime = 0;
  
  this.hasUpdate = false;
  this.inBulk = 0;
  this.viewports = [];
};

illandril.game.Scene.prototype.getControls = function() {
  return this.controls;
};

/**
 * Mark the scene for a bulk action.
 * Use any time more than one object in the scene is moving, being created, or being deleted.
 * Call endBulk when the bulk action is complete.
 */
illandril.game.Scene.prototype.startBulk = function() {
  this.inBulk++;
};

/**
 * Mark the end of a bulk action.
 * Use any time more than one object in the scene is moving, being created, or being deleted.
 * Call startBulk before starting the bulk action.
 * This will update all viewports if no other bulk actions are in progress.
 */
illandril.game.Scene.prototype.endBulk = function() {
  this.inBulk--;
  if ( this.hasUpdate ) {
    this.updateViewports();
  }
};

/**
 * Links a viewport with this scene.
 * @param {illandril.game.Viewport} viewport The viewport to link to this scene
 */
illandril.game.Scene.prototype.attachViewport = function( viewport ) {
  this.viewports[this.viewports.length] = viewport;
  this.updateViewports();
};

/**
 *
 */
illandril.game.Scene.prototype.updateViewports = function() {
  this.hasUpdate = true;
  if ( this.inBulk == 0 ) {
    this.hasUpdate = false;
    for ( var idx = 0; idx < this.viewports.length; idx++ ) {
      this.viewports[idx].update( this.lastTickTime, this.lastSceneTime );
    }
  }
};

/**
 *
 */
illandril.game.Scene.prototype.update = function( tickTime, gameTime ) {
  this.tickCount++;
  var tick = Math.min( tickTime, 1000 );
  this.lastTickTime = tick;
  this.lastSceneTime = gameTime;
  
  this.startBulk();
  
  // TODO: Update objects in the scene
  this._update();
  
  // Make sure the viewports always update every tick, for animation
  // This should be handled by obj.think() calls in _update probably...
  this.updateViewports();
  this.endBulk();
};

illandril.game.Scene.prototype._update = function(){};

/**
 * @preserve Copyright (c) 2011, Joseph Spandrusyszyn
 * See https://github.com/illandril/Illandril-Game-Engine.
 */


goog.provide('illandril.game.Scene');

goog.require('goog.math.Vec2');
goog.require('illandril');
goog.require('illandril.game.objects.Container');
goog.require('illandril.game.objects.GameObject');
goog.require('illandril.game.ui.Controls');
goog.require('illandril.math.Bounds');


/**
 * The maximum allowed tick time, to prevent lag spikes from causing objects to move too far in one tick.
 * @const
 */
var MAX_TICK_TIME = 100;

/**
 * The size of each bucket in scenes.
 * Buckets should be larger than the largest object that could exist in the scene,
 *   otherwise things might disappear at the edges of the viewing area, and collision
 *   detection might fail.
 * @const
 */
var BUCKET_SIZE = 70;

/**
 * The squared distance away from players that should be active.
 * Recommended to be at least be double the visible diagonal.
 * 500x500 screen = 500,000 squared diagonal
 * Using 5,000,000 to make the activity area 10x visible range
 * @const
 */
var ACTIVITY_RANGE = 5000000;

/**
 * @constructor
 */
illandril.game.Scene = function(name ) {
  this.controls = new illandril.game.ui.Controls(name);

  this.players = [];
  this.objects = new illandril.game.objects.Container();
  this.buckets = {};
  this.getNearbySolidObjects__last = -1;
  this.getNearbySolidObjects__cache = {};

  this.tickCount = 0;
  this.lastSceneTime = 0;
  this.lastTickSeconds = 0;

  this.hasUpdate = false;
  this.inBulk = 0;
  this.viewports = [];
  this.gravity = new goog.math.Vec2(0, 0);
};

illandril.game.Scene.prototype.setGravity = function(gravity ) {
  this.gravity = gravity.clone();
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
  if (this.hasUpdate) {
    this.updateViewports();
  }
};

/**
 * Links a viewport with this scene.
 * @param {illandril.game.Viewport} viewport The viewport to link to this scene.
 */
illandril.game.Scene.prototype.attachViewport = function(viewport ) {
  this.viewports[this.viewports.length] = viewport;
  this.updateViewports();
};

/**
 *
 */
illandril.game.Scene.prototype.updateViewports = function() {
  this.hasUpdate = true;
  if (this.inBulk == 0) {
    this.hasUpdate = false;
    for (var idx = 0; idx < this.viewports.length; idx++) {
      this.viewports[idx].update(this.lastTickSeconds, this.lastSceneTime);
    }
  }
};

/**
 *
 */
illandril.game.Scene.prototype.update = function(tickTime, gameTime ) {
  this.tickCount++;
  var tick = Math.min(tickTime, MAX_TICK_TIME);
  this.lastTickSeconds = tick / 1000;
  this.lastSceneTime = gameTime;

  this.startBulk();

  // TODO: Update objects in the scene
  this._update();

  // Make sure the viewports always update every tick, for animation
  // This should be handled by obj.think() calls in _update probably...
  this.updateViewports();
  this.endBulk();
};


illandril.game.Scene.prototype.getBucketXY = function(point ) {
  var x = Math.round(point.x / BUCKET_SIZE);
  var y = Math.round(point.y / BUCKET_SIZE);
  return { x: x, y: y };
};

/**
 * Gets the bucket that contains the specified point
 * @param {goog.math.Vec2} point The point the bucket should contain.
 * @return {illandril.game.objects.Container} The bucket containing the point.
 */
illandril.game.Scene.prototype.getBucket = function(point ) {
  var bucketXY = this.getBucketXY(point);
  if (this.buckets[bucketXY.x] == null) {
    this.buckets[bucketXY.x] = {};
  }
  if (this.buckets[bucketXY.x][bucketXY.y] == null) {
    this.buckets[bucketXY.x][bucketXY.y] = new illandril.game.objects.Container();
  }
  return this.buckets[bucketXY.x][bucketXY.y];
};

/**
 * Gets an array of objects that are in the same bucket, or a bucket adjacent to,
 * the specified point.
 * @param {goog.math.Vec2} point The point to get nearby objects from.
 * @return {Array.<illandril.game.objects.GameObject>} All nearby solid objects.
 */
illandril.game.Scene.prototype.getNearbySolidObjects = function(point ) {
  // The cache speeds things up quite a bit when there are lots of things moving close together...
  // But it also means there might be cases where things don't collide when they should (two, fast moving objects and/or teleporting objects)
  if (this.getNearbySolidObjects__last != this.tickCount) {
    this.getNearbySolidObjects__last = this.tickCount;
    this.getNearbySolidObjects__cache = {};
  }
  var bucketXY = this.getBucketXY(point);
  var id = bucketXY.x + '.' + bucketXY.y;
  if (this.getNearbySolidObjects__cache[id] == null) {
    this.getNearbySolidObjects__cache[id] = this._getNearbySolidObjects(bucketXY);
  }
  return this.getNearbySolidObjects__cache[id];
};

illandril.game.Scene.prototype._getNearbySolidObjects = function(bucketXY ) {
  var nearbyObjects = [];
  for (var x = -1; x <= 1; x++) {
    var xBucketContainer = this.buckets[bucketXY.x + x];
    if (xBucketContainer != null) {
      for (var y = -1; y <= 1; y++) {
        var bucket = xBucketContainer[bucketXY.y + y];
        if (bucket != null) {
          var bucketObjects = bucket.getSolidObjects();
          for (var objIdx = 0; objIdx < bucketObjects.length; objIdx++) {
            nearbyObjects[nearbyObjects.length] = bucketObjects[objIdx];
          }
        }
      }
    }
  }
  return nearbyObjects;
};

/**
 * Adds an object to the scene.
 * @param {illandril.game.objects.GameObject} gameObject The object to add to the scene.
 */
illandril.game.Scene.prototype.addObject = function(gameObject ) {
  if (gameObject.scene != null) {
    gameObject.scene.removeObject(gameObject);
  }
  gameObject.scene = this;
  this.objects.add(gameObject);
  this.objectMoved(gameObject);
  if (gameObject.isPlayer) {
    this.players.push(gameObject);
  }
};

/**
 * Removes an object from the scene.
 * @param {illandril.game.objects.GameObject} gameObject The object to remove from the scene.
 */
illandril.game.Scene.prototype.removeObject = function(gameObject ) {
  if (gameObject.scene != this) {
    return;
  }
  gameObject.scene = null;
  this.objects.remove(gameObject);
  var oldBucket = gameObject.bucket;
  if (oldBucket != null) {
    oldBucket.remove(gameObject);
  }
  if (gameObject.isPlayer) {
    var oldPlayers = this.players;
    this.players = [];
    for (var pIdx = 0; pIdx < oldPlayers.length; pIdx++) {
      if (oldPlayers[pIdx] != gameObject) {
        this.players.push(oldPlayers[pIdx]);
      }
    }
  }
  this.updateViewports();
};

/**
 * Gets all objects that are contained by buckets that are at least partially inside
 * the specified bounds.
 * @param {illandril.math.Bounds} bounds The bounds that objects should be inside.
 * @return {Array.<illandril.game.objects.GameObject>} The objects in the specified bounds.
 */
illandril.game.Scene.prototype.getObjects = function(bounds ) {
  if (bounds == null) {
    return this.objects;
  }
  var bucketXYTL = this.getBucketXY(new goog.math.Vec2(bounds.getLeft(), bounds.getTop()));
  var bucketXYBR = this.getBucketXY(new goog.math.Vec2(bounds.getRight(), bounds.getBottom()));
  var bucketX = bucketXYTL.x - 1;
  var bucketY = bucketXYBR.y - 1;
  var bucketXMax = bucketXYBR.x + 1;
  var bucketYMax = bucketXYTL.y + 1;
  var containedObjects = [];
  for (var x = bucketX; x <= bucketXMax; x += 1) {
    var xBucketContainer = this.buckets[x];
    if (xBucketContainer != null) {
      for (var y = bucketY; y <= bucketYMax; y += 1) {
        var bucket = xBucketContainer[y];
        if (bucket != null) {
          var bucketObjects = bucket.getAllObjects();
          for (var objIdx = 0; objIdx < bucketObjects.length; objIdx++) {
            containedObjects[containedObjects.length] = bucketObjects[objIdx];
          }
        }
      }
    }
  }
  return containedObjects;
};

/**
 *
 */
illandril.game.Scene.prototype.objectMoved = function(gameObject ) {
  if (gameObject.scene != this) {
    return;
  }
  var oldBucket = gameObject.bucket;
  var newBucket = this.getBucket(gameObject.getPosition());
  if (oldBucket != newBucket) {
    if (oldBucket != null) {
      oldBucket.remove(gameObject);
    }
    newBucket.add(gameObject);
    gameObject.bucket = newBucket;
  }
  this.updateViewports();
};

/**
 *
 */
illandril.game.Scene.prototype._update = function() {
  var scaledGravity = this.gravity.clone().scale(this.lastTickSeconds);
  this.movingLastUpdate = 0;
  var activeObjects = this.objects.getActiveObjects();
  var needsUpdate = true;
  for (var idx = 0; idx < activeObjects.length; idx++) {
    var obj = activeObjects[idx];
    if (obj.scene != this) {
      continue; // Skip over the object if it has been removed from the scene
    }
    var closeEnoughToPlayers = false;
    for (var pIdx = 0; pIdx < this.players.length && !closeEnoughToPlayers; pIdx++) {
      if (goog.math.Vec2.squaredDistance(obj.getPosition(), this.players[pIdx].getPosition()) < ACTIVITY_RANGE) {
        closeEnoughToPlayers = true;
      }
    }
    if (closeEnoughToPlayers) {
        obj.applyFriction(this.lastTickSeconds);
        obj.think(this.lastTickSeconds);
        if (obj.impactedByGravity && (scaledGravity.x != 0 || scaledGravity.y != 0)) {
          obj.addVelocity(scaledGravity);
        }

        if (obj.isMoving()) {
          this.move(obj, this.lastTickSeconds);
          this.movingLastUpdate++;
        }
    }
  }
  if (needsUpdate) {
    this.updateViewports();
  }
};

/**
 *
 */
illandril.game.Scene.prototype.move = function(obj, tickSeconds ) {
  if (obj.scene != this) {
    return; // Skip over the object if it has been removed from the scene
  }
  var movement = obj.getVelocity().scale(tickSeconds);
  var newMovement = movement;
  if (obj.isSolid) {
    newMovement = checkForCollisions(obj, movement, this.getNearbySolidObjects(obj.getPosition()));
  } else {
    if (movement.x != 0 && newMovement.x == 0) {
      obj.blockedX();
    }
    if (movement.y != 0 && newMovement.y == 0) {
      obj.blockedY();
    }
    if (newMovement.x != 0 || newMovement.y != 0) {
      obj.moveBy(newMovement);
    }
  }
};

/**
 *
 */
illandril.game.Scene.prototype.hasObjectIntersecting = function(bounds ) {
  var objectList = this.getNearbySolidObjects(bounds.getCenter());
  var hasCollision = false;
  for (var idx = 0; idx < objectList.length && !hasCollision; idx++) {
    hasCollision = bounds.intersects(objectList[idx].getBounds());
  }
  return hasCollision;
};

/**
 *
 */
function checkForCollisions(movingObject, movement, objectList ) {
  var shallowXMovement = null;
  var shallowYMovement = null;
  var startingPosition = movingObject.getPosition();
  var bounds = new illandril.math.Bounds(goog.math.Vec2.sum(startingPosition, movement), movingObject.getSize());
  var stillMoving = true;
  var hasBlockingCollision = false;
  var collidingObjects = [];
  for (var idx = 0; idx < objectList.length && stillMoving; idx++) {
    var nearbyObject = objectList[idx];
    if (movingObject == nearbyObject || nearbyObject.scene != movingObject.scene || !(movingObject.canCollideWith(nearbyObject) || nearbyObject.canCollideWith(movingObject) || movingObject.canBlock(nearbyObject) || nearbyObject.canBlock(movingObject))) {
      continue;
    }
    var collision = bounds.intersects(nearbyObject.getBounds());
    if (collision) {
      collidingObjects.push(nearbyObject);
      if (movingObject.isBlockingCollision(nearbyObject, movement)) {
        hasBlockingCollision = true;
        if (shallowXMovement == null) {
          shallowXMovement = new goog.math.Vec2(movement.x / 10, 0);
          shallowYMovement = new goog.math.Vec2(0, movement.y / 10);
        }
        var secondXCollision = false;
        var secondYCollision = false;
        stillMoving = false;
        var newBounds = new illandril.math.Bounds(movingObject.getPosition(), movingObject.getSize());
        while (!secondXCollision || !secondYCollision) {
          var currentCenter = bounds.getCenter();
          var newCenter = newBounds.getCenter();
          if (!secondXCollision) {
            if (shallowXMovement.x < 0) {
              secondXCollision = newCenter.x <= currentCenter.x;
              if (secondXCollision) {
                newCenter.x = currentCenter.x;
                newBounds.centerOn(new goog.math.Vec2(currentCenter.x, newCenter.y));
              }
            } else {
              secondXCollision = newCenter.x >= currentCenter.x;
              if (secondXCollision) {
                newCenter.x = currentCenter.x;
                newBounds.centerOn(new goog.math.Vec2(currentCenter.x, newCenter.y));
              }
            }
          }
          if (!secondXCollision) {
            newBounds.centerOn(newBounds.getCenter().add(shallowXMovement));
            secondXCollision = newBounds.intersects(nearbyObject.getBounds());
            if (secondXCollision) {
              newBounds.centerOn(newBounds.getCenter().subtract(shallowXMovement));
            } else {
              stillMoving = true;
            }
          }
          if (!secondYCollision) {
            if (shallowYMovement.y < 0) {
              secondYCollision = newCenter.y <= currentCenter.y;
              if (secondYCollision) {
                newCenter.y = currentCenter.y;
                newBounds.centerOn(new goog.math.Vec2(newCenter.x, currentCenter.y));
              }
            } else {
              secondYCollision = newCenter.y >= currentCenter.y;
              if (secondYCollision) {
                newCenter.y = currentCenter.y;
                newBounds.centerOn(new goog.math.Vec2(newCenter.x, currentCenter.y));
              }
            }
          }
          if (!secondYCollision) {
            newBounds.centerOn(newBounds.getCenter().add(shallowYMovement));
            secondYCollision = newBounds.intersects(nearbyObject.getBounds());
            if (secondYCollision) {
              newBounds.centerOn(newBounds.getCenter().subtract(shallowYMovement));
            } else {
              stillMoving = true;
            }
          }
        }
        bounds = newBounds;
      }
    }
  }
  var newMovement = movement;
  if (hasBlockingCollision) {
    newMovement = goog.math.Vec2.difference(bounds.getCenter(), movingObject.getPosition());
  }
  if (movement.x != 0 && newMovement.x == 0) {
    movingObject.blockedX();
  }
  if (movement.y != 0 && newMovement.y == 0) {
    movingObject.blockedY();
  }
  if (newMovement.x != 0 || newMovement.y != 0) {
    movingObject.moveBy(newMovement);
  }
  if (stillMoving) {
    for (var idx = 0; idx < collidingObjects.length; idx++) {
      if (!hasBlockingCollision || bounds.intersects(collidingObjects[idx].getBounds())) {
        movingObject.collideWith(collidingObjects[idx]);
        collidingObjects[idx].collideWith(movingObject);
      }
    }
  }
  return newMovement;
}

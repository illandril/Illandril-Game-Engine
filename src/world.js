/**
 * @constructor
 */
World = function() {
  this.viewports = [];
  this.objects = [];
  this["objects"] = this.objects;
  this.inBulk = 0;
  this.hasUpdate = false;
  this.buckets = {};
};

var bucketSize = 100;
World.prototype.getBucket = function( center ) {
  var bucketX = Math.round( center.x / bucketSize );
  if ( this.buckets[bucketX] == null ) {
    this.buckets[bucketX] = {};
  }
  var bucketY = Math.round( center.y / bucketSize );
  if ( this.buckets[bucketX][bucketY] == null ) {
    this.buckets[bucketX][bucketY] = {};
  }
  return this.buckets[bucketX][bucketY];
};

World.prototype.getNearbyObjects = function( center ) {
  var nearbyObjects = [];
  var bucketX = Math.round( center.x / bucketSize );
  var bucketY = Math.round( center.y / bucketSize );
  for ( var x = -1; x <= 1; x++ ) {
    var xBucketContainer = this.buckets[bucketX + x];
    if ( xBucketContainer != null ) {
      for ( var y = -1; y <= 1; y++ ) {
        var bucket = xBucketContainer[bucketY + y]
        if ( bucket != null ) {
          for ( var objID in bucket ) {
            nearbyObjects[nearbyObjects.length] = bucket[objID];
          }
        }
      }
    }
  }
  return nearbyObjects;
};

World.prototype.startBulk = function() {
  this.inBulk++;
};

World.prototype.endBulk = function() {
  this.inBulk--;
  if ( this.hasUpdate ) {
    this.updateViewports();
  }
};

World.prototype.addObject = function( gameObject ) {
  this.objects[this.objects.length] = gameObject;
  this.objectMoved( gameObject );
};

World.prototype.getObjects = function( bounds ) {
  if ( bounds == null ) {
    return this.objects;
  }
  var topLeft = bounds.getTopLeft();
  var bottomRight = topLeft.add( bounds.getSize() );
  var bucketX = Math.round( topLeft.x / bucketSize ) - 1;
  var bucketXMax = Math.round( bottomRight.x / bucketSize ) + 1;
  var bucketY = Math.round( topLeft.y / bucketSize ) - 1;
  var bucketYMax = Math.round( bottomRight.y / bucketSize ) + 1;
  var containedObjects = [];
  for( var x = bucketX; x <= bucketXMax; x++ ) {
    var xBucketContainer = this.buckets[x];
    if ( xBucketContainer != null ) {
      for( var y = bucketY; y <= bucketYMax; y++ ) {
        var bucket = xBucketContainer[y]
        if ( bucket != null ) {
          for ( var objID in bucket ) {
            containedObjects[containedObjects.length] = bucket[objID];
          }
        }
      }
    }
  }
  return containedObjects;
};

World.prototype.attachViewport = function( viewport ) {
  this.viewports[this.viewports.length] = viewport;
};

World.prototype.updateViewports = function() {
  this.hasUpdate = true;
  if ( this.inBulk == 0 ) {
    this.hasUpdate = false;
    for ( var idx = 0; idx < this.viewports.length; idx++ ) {
      this.viewports[idx].update();
    }
  }
};

World.prototype.objectMoved = function( gameObject ) {
  var oldBucket = gameObject.bucket;
  var newBucket = this.getBucket( gameObject.getPosition() );
  if ( oldBucket != null && oldBucket != newBucket ) {
    delete oldBucket[gameObject.id];
  }
  newBucket[gameObject.id] = gameObject;
  gameObject.bucket = newBucket;
  this.updateViewports();
};

World.prototype.update = function( tick ) {
  tick = Math.min( tick, 1000 );
  this.startBulk();
  if ( Math.random() * 100 < 25 ) {
    var oldObject = this.objects.pop();
    var oldBucket = oldObject.bucket;
    if ( oldBucket != null ) {
      delete oldBucket[oldObject.id];
    }
    new GameObject( this, Bounds.fromCenter( new Vector2( 500, 0 ), new Vector2( Math.random() * 100, Math.random() * 100 ) ) );
  }
  this.think( tick );
  this.move( tick );
  this.endBulk();
};

World.prototype.think = function( tick ) {
  for ( var idx = 0; idx < this.objects.length; idx++ ) {
    this.objects[idx].think( tick );
  }
};

World.prototype.move = function( tick ) {
  for ( var idx = 0; idx < this.objects.length; idx++ ) {
    var obj = this.objects[idx];
    if ( obj.isMoving() ) {
      var movement = obj.getVelocity().multiply( tick / 10 );
      var intersectionBounds = Bounds.fromCenter( obj.getPosition().add( movement ), obj.getSize() );
      var hasCollision = checkForCollisions( obj, intersectionBounds, this.getNearbyObjects( obj.getPosition() ) );
      if ( !hasCollision ) {
        obj.moveBy( movement );
        // "friction"
        obj.setVelocity( obj.getVelocity().multiply( 1 - Math.min( 1, tick / 100 ) ) );
      } else {
        obj.setVelocity( new Vector2( 0, 0 ) );
      }
    }
  }
};

function checkForCollisions( movingObject, bounds, objectList ) {
  var hasCollision = false;
  for ( var idx = 0; idx < objectList.length && !hasCollision; idx++ ) {
    var nearbyObject = objectList[idx];
    if ( movingObject == nearbyObject ) {
      continue;
    }
    hasCollision = bounds.intersects( nearbyObject.getBounds() );
  }
  return hasCollision;
};


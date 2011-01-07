goog.provide("illandril.game.ui.Viewport");

goog.require("goog.math.Vec2");
goog.require("illandril.math.Bounds");

/**
 * @constructor
 */
illandril.game.ui.Viewport = function( container, scene, size ) {
  this.domObjects = {};
  this.domObjectsCount = 0;
  this.bounds = new illandril.math.Bounds( new goog.math.Vec2( 0, 0 ), size );
  this.zoomedBounds = this.bounds;
  this.zoom = 1;
  this.movedSinceLastUpdate = true;
  this.scene = scene;
  this.following = null;
  this.buildDOMContainers( container, size );
  this.hide();
  this.scene.attachViewport( this );
};

illandril.game.ui.Viewport.prototype.buildDOMContainers = function( container, size ) {
  this.domObjectContainer = document.createElement('span');
  this.domObjectContainer.className = 'viewportContainer';
  this.domObjectContainer.style.width = size.x + "px";
  this.domObjectContainer.style.height = size.y + "px";
  this.domObject = document.createElement('span');
  this.domObject.className = 'viewport';
  this.domObjectContainer.appendChild( this.domObject );
  container.appendChild( this.domObjectContainer );
}

illandril.game.ui.Viewport.prototype.setZoom = function( zoom ) {
  if ( this.zoom != zoom ) {
    this.zoom = zoom;
    this.zoomedBounds = this.bounds.divide( this.zoom );
    var size = this.zoomedBounds.getSize();
    this.domObjectContainer.style.width = size.x + "px";
    this.domObjectContainer.style.height = size.y + "px";
    this.domObjectContainer.style.zoom = zoom;
    this.domObjectContainer.style["MozTransform"] = "scale(" + zoom + ")";
    this.movedSinceLastUpdate = true;
    this.scene.updateViewports();
  }
};

illandril.game.ui.Viewport.prototype.lookAtNoUpdate = function( position ) {
  if ( !( this.bounds.getCenter().equals( position ) ) ) {
    this.bounds.centerOn( position );
    this.zoomedBounds.centerOn( position );
    this.movedSinceLastUpdate = true;
  }
};

illandril.game.ui.Viewport.prototype.lookAt = function( position ) {
  this.following = null;
  this.lookAtNoUpdate( position );
  if ( this.movedSinceLastUpdate ) {
    this.scene.updateViewports();
  }
};

illandril.game.ui.Viewport.prototype.follow = function( obj ) {
  this.following = obj;
  this.scene.updateViewports();
};

illandril.game.ui.Viewport.prototype.hide = function() {
  this.domObjectContainer.style.display = "none";
};

illandril.game.ui.Viewport.prototype.show = function() {
  this.domObjectContainer.style.display = "";
};

illandril.game.ui.Viewport.prototype.update = function( tickTime, gameTime ) {
  if ( this.following != null ) {
    this.lookAtNoUpdate( this.following.getPosition() );
  }
  
  var shownObjects = [];
  var objectsToShow = this.scene.getObjects( this.zoomedBounds );
  if ( this.movedSinceLastUpdate ) {
    var topLeft = this.zoomedBounds.getTopLeft();
    this.movedSinceLastUpdate = false;
    this.domObject.style.left = ( -1 * topLeft.x ) + "px";
    this.domObject.style.top = ( -1 * topLeft.y ) + "px";
  }
  for ( var idx = 0; idx < objectsToShow.length; idx++ ) {
    var obj = objectsToShow[idx];
    var objBounds = obj.getBounds();
    var objSize = objBounds.getSize();
    // make sure it's big enough to see (at least 1 sq pixel of surface area)
    if ( this.isBigEnoughToBeVisible( objSize ) ) {
      shownObjects[shownObjects.length] = obj.id;
      var objDom = this.getOrCreateDomObject( obj );
      var top = objBounds.getTop();
      var left = objBounds.getLeft();
      var resized = objDom.savedStyle.width != objSize.x || objDom.savedStyle.height != objSize.y;
      var moved = resized || objDom.savedStyle.top != top || objDom.savedStyle.left != left
      if ( moved ) {
        objDom.style.left = left + "px";
        objDom.style.top = top + "px";
        objDom.savedStyle.left = left;
        objDom.savedStyle.top = top;
      }
      if ( resized ) {
        objDom.style.width = objSize.x + "px";
        objDom.style.height = objSize.y + "px";
        objDom.savedStyle.width = objSize.x;
        objDom.savedStyle.height = objSize.y;
      }
      if ( objDom.savedStyle.z != obj.zIndex ) {
        objDom.style.zIndex = Math.max( 1, obj.zIndex + 1000 );
        objDom.savedStyle.z = obj.zIndex;
      }
      if ( obj.bg != null ) {
        this.updateBG( obj, objDom, gameTime );
      }
    }
  }
  this.clean( shownObjects, gameTime );
};

illandril.game.ui.Viewport.prototype.isBigEnoughToBeVisible = function( objSize ) {
  return this.zoom >= 1 || ( ( objSize.x * objSize.y ) * this.zoom ) >= 1;
};

illandril.game.ui.Viewport.prototype.getOrCreateDomObject = function( obj ) {
  var objDom = this.domObjects[obj.id];
  if ( objDom == null ) {
    objDom = document.createElement( 'span' );
    this.domObjects[obj.id] = objDom;
    this.domObjectsCount++;
    objDom.className = "gameObject";
    objDom.obj = obj;
    objDom.savedStyle = {};
    if ( obj.bg != null ) {
      objDom.style.backgroundColor = "transparent";
    }
    objDom.onclick = function(e) {
      if ( this.obj.onClick != null ) { this.obj.onClick(e); }
    };
    objDom.onmousedown = function(e) {
      if ( this.obj.onMouseDown != null ) { this.obj.onMouseDown(e); }
    };
    objDom.onmouseup = function(e) {
      if ( this.obj.onMouseUp != null ) { this.obj.onMouseUp(e); }
    };
    objDom.onmouseover = function(e) {
      if ( this.obj.onMouseOver != null ) { this.obj.onMouseOver(e); }
    };
    objDom.onmouseout = function(e) {
      if ( this.obj.onMouseOut != null ) { this.obj.onMouseOut(e); }
    };
    this.domObject.appendChild( objDom );
  }
  return objDom;
};

illandril.game.ui.Viewport.prototype.updateBG = function( obj, objDom, gameTime ) {
  var sprite = obj.bg.getSprite( gameTime, obj );
  // We save the old BG and BGPos as seperate attributes because CSS engines can tweak the values returned from style
  if ( objDom.savedStyle.bg != sprite.src ) {
    objDom.style.backgroundImage = "url(" + sprite.src + ")";
    objDom.savedStyle.bg = sprite.src;
  }
  if ( objDom.savedStyle.bgX != sprite.x || objDom.savedStyle.bgY != sprite.y ) {
    objDom.style.backgroundPosition = ( sprite.x * -1 ) + "px " + ( sprite.y * -1 ) + "px";
    objDom.savedStyle.bgX = sprite.x;
    objDom.savedStyle.bgY = sprite.y;
  }
};

illandril.game.ui.Viewport.prototype.clean = function( shownObjects, gameTime ) {
  if ( this.domObjectsCount > ( shownObjects.length + 100 ) ) {
    for ( var objID in this.domObjects ) {
      var hasObj = false;
      for ( var idx = 0; idx < shownObjects.length && !hasObj; idx++ ) {
        hasObj = shownObjects[idx] == objID;
      }
      if ( !hasObj ) {
        this.domObject.removeChild( this.domObjects[objID] );
        delete this.domObjects[objID];
        this.domObjectsCount--;
      }
    }
  }
};

illandril.game.ui.Viewport.prototype.getBounds = function() {
  return this.bounds;
};

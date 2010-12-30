goog.provide("illandril.game.ui.Viewport");

goog.require("goog.math.Vec2");
goog.require("illandril.math.Bounds");

/**
 * @constructor
 */
illandril.game.ui.Viewport = function( container, scene, size ) {
  var vpcontainer = container;
  this.domObject = document.createElement('span');
  this.domObject.className = 'viewport';
  this.domObject.style.width = size.x + "px";
  this.domObject.style.height = size.y + "px";
  this.domObject.style.zIndex = 0;
  this.hide();
  vpcontainer.appendChild( this.domObject );
  this.domObjects = {};
  this.domObjectsCount = 0;
  this.bounds = new illandril.math.Bounds( new goog.math.Vec2( 0, 0 ), size );
  this.zoomedBounds = this.bounds;
  this.zoom = 1;
  
  this.scene = scene;
  this.following = null;
  this.scene.attachViewport( this );
};

illandril.game.ui.Viewport.prototype.setZoom = function( zoom ) {
  this.zoom = zoom;
  this.zoomedBounds = this.bounds.divide( this.zoom );
  var size = this.zoomedBounds.getSize();
  this.domObject.style.width = size.x + "px";
  this.domObject.style.height = size.y + "px";
  this.domObject.style.zoom = zoom;
  this.domObject.style["MozTransform"] = "scale(" + zoom + ")";
  this.scene.updateViewports();
};

illandril.game.ui.Viewport.prototype.lookAtNoUpdate = function( position ) {
  this.bounds.centerOn( position );
  this.zoomedBounds.centerOn( position );
};

illandril.game.ui.Viewport.prototype.lookAt = function( position ) {
  this.following = null;
  this.lookAtNoUpdate( position );
  this.scene.updateViewports();
};

illandril.game.ui.Viewport.prototype.follow = function( obj ) {
  this.following = obj;
  this.scene.updateViewports();
};

illandril.game.ui.Viewport.prototype.hide = function() {
  this.domObject.style.display = "none";
};

illandril.game.ui.Viewport.prototype.show = function() {
  this.domObject.style.display = "";
};

illandril.game.ui.Viewport.prototype.update = function( tickTime, gameTime ) {
  if ( this.following != null ) {
    this.lookAtNoUpdate( this.following.getPosition() );
  }
  
  var shownObjects = [];
  var objectsToShow = this.scene.getObjects( this.zoomedBounds );
  var topLeft = this.zoomedBounds.getTopLeft();
  for ( var idx = 0; idx < objectsToShow.length; idx++ ) {
    var obj = objectsToShow[idx];
    var objPos = obj.getPosition();
    var objSize = obj.getSize();
    // make sure it's big enough to see (at least 1 sq pixel of surface area)
    if ( this.zoom >= 1 || ( ( objSize.x * objSize.y ) * this.zoom ) >= 1 ) {
      shownObjects[shownObjects.length] = obj.id;
      var objDom = this.domObjects[obj.id];
      if ( objDom == null ) {
        objDom = document.createElement( 'span' );
        this.domObjects[obj.id] = objDom;
        this.domObjectsCount++;
        objDom.className = "gameObject";
        this.domObject.appendChild( objDom );
        objDom.onclick = function(e) {
          if ( obj.onClick != null ) {
            obj.onClick(e);
          }
        };
        objDom.onmousedown = function(e) {
          if ( obj.onMouseDown != null ) {
            obj.onMouseDown(e);
          }
        };
        objDom.onmouseup = function(e) {
          if ( obj.onMouseUp != null ) {
            obj.onMouseUp(e);
          }
        };
        objDom.onmouseover = function(e) {
          if ( obj.onMouseOver != null ) {
            obj.onMouseOver(e);
          }
        };
        objDom.onmouseout = function(e) {
          if ( obj.onMouseOut != null ) {
            obj.onMouseOut(e);
          }
        };
      }
      objDom.style.top = ( objPos.y - objSize.y / 2 - topLeft.y ) + "px";
      objDom.style.left = ( objPos.x - objSize.x / 2 - topLeft.x ) + "px";
      objDom.style.width = objSize.x + "px";
      objDom.style.height = objSize.y + "px";
      objDom.style.zIndex = Math.max( 1, obj.zIndex + 1000 );
      if ( obj.bg != null ) {
        var sprite = obj.bg.getSprite( gameTime, obj );
        objDom.style.backgroundImage = "url( " + sprite.src + " )";
        objDom.style.backgroundPosition = ( sprite.x * -1 ) + "px " + ( sprite.y * -1 ) + "px";
        objDom.style.backgroundColor = "transparent";
      }
    }
  }
  
  this.clean( shownObjects );
};

illandril.game.ui.Viewport.prototype.clean = function( shownObjects ) {
  if ( this.domObjectsCount > shownObjects.length ) {
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

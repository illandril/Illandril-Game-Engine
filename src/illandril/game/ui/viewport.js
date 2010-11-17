goog.provide("illandril.game.ui.Viewport");

goog.require("goog.math.Vec2");
goog.require("illandril.math.Bounds");

/**
 * @constructor
 */
illandril.game.ui.Viewport = function( container, world, size ) {
  //var vpcontainer = document.createElement('span');
  //vpcontainer.className = 'viewportContainer';
  //container.appendChild( vpcontainer );
  var vpcontainer = container;
  this.domObject = document.createElement('span');
  this.domObject.className = 'viewport';
  this.domObject.style.width = size.x + "px";
  this.domObject.style.height = size.y + "px";
  this.domObject.style.zIndex = 0;
  vpcontainer.appendChild( this.domObject );
  this.domObjects = {};
  this.domObjectsCount = 0;
  this.bounds = new illandril.math.Bounds( new goog.math.Vec2( 0, 0 ), size );
  this.zoomedBounds = this.bounds;
  this.zoom = 1;
  
  this.world = world;
  this.following = null;
  this.world.attachViewport( this );
  this.update();
};

illandril.game.ui.Viewport.prototype.setZoom = function( zoom ) {
  this.zoom = zoom;
  this.zoomedBounds = this.bounds.divide( this.zoom );
  var size = this.zoomedBounds.getSize();
  this.domObject.style.width = size.x + "px";
  this.domObject.style.height = size.y + "px";
  this.domObject.style.zoom = zoom;
  this.domObject.style["MozTransform"] = "scale(" + zoom + ")";
  this.update();
};

illandril.game.ui.Viewport.prototype.lookAtNoUpdate = function( position ) {
  this.bounds.centerOn( position );
  this.zoomedBounds.centerOn( position );
};

illandril.game.ui.Viewport.prototype.lookAt = function( position ) {
  this.following = null;
  this.lookAtNoUpdate( position );
  this.update();
};

illandril.game.ui.Viewport.prototype.follow = function( obj ) {
  this.following = obj;
  this.update();
};

illandril.game.ui.Viewport.prototype.update = function() {
  if ( this.following != null ) {
    this.lookAtNoUpdate( this.following.getPosition() );
  }
  
  var shownObjects = [];
  var objectsToShow = this.world.getObjects( this.zoomedBounds );
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
      }
      objDom.style.top = ( objPos.y - objSize.y / 2 - topLeft.y ) + "px";
      objDom.style.left = ( objPos.x - objSize.x / 2 - topLeft.x ) + "px";
      objDom.style.width = objSize.x + "px";
      objDom.style.height = objSize.y + "px";
      objDom.style.zIndex = Math.min( 1, obj.zIndex + 1000 );
      if ( obj.bg != null ) {
        objDom.style.backgroundImage = "url( " + obj.bg + " )";
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

Viewport = function( container, world, size ) {
  this.domObject = document.createElement('div');
  this.domObject.className = 'viewport';
  this.domObject.style.width = size.x;
  this.domObject.style.height = size.y;
  container.appendChild( this.domObject );
  
  this.bounds = new Bounds( new Vector2( 0, 0 ), size );
 
  this.world = world;
  this.world.attachViewport( this );
  this.update();
};

Viewport.prototype.lookAt = function( position ) {
  this.bounds.centerOn( position );
  this.update();
};

Viewport.prototype.update = function() {
  var objectsToShow = this.world.getObjects( this.getBounds() );
  this.domObject.innerHTML = "";
  var topLeft = this.bounds.getTopLeft();
  for ( var idx = 0; idx < objectsToShow.length; idx++ ) {
    var obj = objectsToShow[idx];
    var objDom = document.createElement( 'div' );
    objDom.className = "gameObject game-" + obj.id;
    objDom.style.top = ( obj.position.y - 5 - topLeft.y ) + "px";
    objDom.style.left = ( obj.position.x - 5 - topLeft.x ) + "px";
    this.domObject.appendChild( objDom );
  }
};

Viewport.prototype.getBounds = function() {
};


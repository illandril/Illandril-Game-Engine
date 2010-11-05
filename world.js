World = function() {
  this.viewports = [];
  this.objects = [];
  this.inBulk = 0;
}

World.prototype.startBulk = function() {
  this.inBulk++;
}

World.prototype.endBulk = function() {
  this.inBulk--;
  this.updateViewports();
}

World.prototype.addObject = function( id, pos ) {
  this.objects[this.objects.length] = { id: id, position: pos };
  this.updateViewports();
}

World.prototype.getObjects = function( bounds ) {
  return this.objects;
}

World.prototype.attachViewport = function( viewport ) {
  this.viewports[this.viewports.length] = viewport;
}

World.prototype.updateViewports = function() {
  if ( this.inBulk == 0 ) {
    for ( var idx = 0; idx < this.viewports.length; idx++ ) {
      this.viewports[idx].update();
    }
  }
}

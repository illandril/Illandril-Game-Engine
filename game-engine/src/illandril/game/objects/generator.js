goog.provide("illandril.game.objects.Generator");

goog.require("goog.object");
goog.require("illandril.game.objects.Active");
goog.require("illandril.game.objects.GameObject");

/**
 * @constructor
 * @extends illandril.game.objects.GameObject
 */
illandril.game.objects.Generator = function( scene, bounds, bg, zIndex, generatedType, minDelay, maxDelay ) {
  illandril.game.objects.GameObject.call( this, scene, bounds, bg, zIndex );
  illandril.game.objects.Active.call( this );
  this.generatedType = generatedType;
  this.minDelay = minDelay || 1;
  this.maxDelay = Math.max( minDelay, maxDelay || 1 );
  this.timeSinceLast = 0;
  this.enabled = false;
  this.visible = false;
};
goog.inherits( illandril.game.objects.Generator, illandril.game.objects.GameObject );
goog.object.extend( illandril.game.objects.Generator.prototype, illandril.game.objects.Active.prototype );

illandril.game.objects.Generator.prototype.start = function() {
  this.enabled = true;
  this.timeSinceLast = 0;
};

illandril.game.objects.Generator.prototype.stop = function() {
  this.enabled = false;
};

illandril.game.objects.Generator.prototype.think = function( tick ) {
  if ( this.enabled ) {
    this.timeSinceLast += tick;
    if ( this.timeSinceLast >= this.minDelay ) {
      if ( this.timeSinceLast + Math.random() * ( this.maxDelay - this.minDelay ) >= this.maxDelay ) {
        var bounds = illandril.math.Bounds.fromCenter( this.getPosition(), this.getSize() );
        if ( !this.scene.hasObjectIntersecting( bounds ) ) {
          new this.generatedType( this.scene, bounds, this.bg, this.zIndex );
          this.timeSinceLast = 0;
        }
      }
    }
  }
};

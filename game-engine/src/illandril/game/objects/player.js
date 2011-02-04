/**
 * @preserve Copyright (c) 2011, Joseph Spandrusyszyn
 * See https://github.com/illandril/Illandril-Game-Engine.
 */


goog.provide('illandril.game.objects.Player');

goog.require('goog.object');
goog.require('illandril');
goog.require('illandril.game.objects.Active');
goog.require('illandril.game.objects.Collectable');
goog.require('illandril.game.objects.GameObject');
goog.require('illandril.game.objects.Solid');

/**
 * @constructor
 * @extends illandril.game.objects.GameObject
 * @param {illandril.game.Scene} scene the scene the object lives in.
 * @param {illandril.math.Bounds} bounds the bounds that define the size and location of the object.
 * @param {?string} bg the URL of the background image for this object.
 */
illandril.game.objects.Player = function(scene, bounds, bg, zIndex ) {
  illandril.game.objects.GameObject.call(this, scene, bounds, bg, zIndex);
  illandril.game.objects.Solid.call(this);
  illandril.game.objects.Active.call(this);
  this.collectables = [];
  this.startPos = bounds.getCenter();
  this.deaths = 0;
};
goog.inherits(illandril.game.objects.Player, illandril.game.objects.GameObject);
goog.object.extend(illandril.game.objects.Player.prototype, illandril.game.objects.Solid.prototype);
goog.object.extend(illandril.game.objects.Player.prototype, illandril.game.objects.Active.prototype);

illandril.game.objects.Player.prototype.isPlayer = true;
illandril.game.objects.Player.prototype.collideWith = function(otherObject ) {
  if (otherObject instanceof illandril.game.objects.Collectable) {
    this.scene.removeObject(otherObject);
    this.collectables.push(otherObject);
    document.getElementById('collectableCount').innerHTML = 'Collectables: ' + this.collectables.length + ' / ' + test.mc;
  } else if (otherObject instanceof illandril.game.objects.Car) {
    this.moveTo(this.startPos);
    this.deaths++;
    document.getElementById('deathCount').innerHTML = 'Deaths: ' + this.deaths;
  }
};

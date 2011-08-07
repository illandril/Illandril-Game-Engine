/**
 * @preserve Copyright (c) 2011, Joseph Spandrusyszyn
 * See https://github.com/illandril/Illandril-Game-Engine.
 */


goog.provide('illandril.game.objects.ActiveCollectable');

goog.require('goog.object');
goog.require('illandril');
goog.require('illandril.game.objects.Active');
goog.require('illandril.game.objects.Collectable');

/**
 * @constructor
 * @extends illandril.game.objects.Collectable
 */
illandril.game.objects.ActiveCollectable = function(scene, bounds, bg, zIndex ) {
  illandril.game.objects.Collectable.call(this, scene, bounds, bg, zIndex);
  illandril.game.objects.Active.call(this);
};
goog.inherits(illandril.game.objects.ActiveCollectable, illandril.game.objects.Collectable);
goog.object.extend(illandril.game.objects.ActiveCollectable.prototype, illandril.game.objects.Active.prototype);

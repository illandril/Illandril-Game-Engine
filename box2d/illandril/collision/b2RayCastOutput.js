/*
 * See Box2D.js
 */
goog.provide('Box2D.Collision.b2RayCastOutput');

goog.require('Box2D.Common.Math.b2Vec2');

Box2D.Collision.b2RayCastOutput = function(p1, p2, maxFraction) {
    this.normal = new Box2D.Common.Math.b2Vec2(0, 0);
};
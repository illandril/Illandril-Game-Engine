/*
 * See Box2D.js
 */
goog.provide('Box2D.Collision.Shapes.b2MassData');

goog.require('Box2D.Common.Math.b2Vec2');

Box2D.Collision.Shapes.b2MassData = function() {
    this.mass = 0.0;
    this.center = new Box2D.Common.Math.b2Vec2(0, 0);
    this.I = 0.0;
};
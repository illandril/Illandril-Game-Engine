/*
 * See Box2D.js
 */
goog.provide('Box2D.Collision.Shapes.b2EdgeChainDef');

/**
 * @constructor
 */
Box2D.Collision.Shapes.b2EdgeChainDef = function() {
    this.vertexCount = 0;
    this.isALoop = true;
    this.vertices = [];
};
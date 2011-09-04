/*
 * See Box2D.js
 */
goog.provide('Box2D.Collision.b2DynamicTreeNode');

goog.require('Box2D.Collision.b2AABB');

Box2D.Collision.b2DynamicTreeNode = function() {
      this.aabb = new Box2D.Collision.b2AABB();
};

Box2D.Collision.b2DynamicTreeNode.prototype.IsLeaf = function () {
  return this.child1 == null;
};

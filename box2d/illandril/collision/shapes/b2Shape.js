/*
 * See Box2D.js
 */
goog.provide('Box2D.Collision.Shapes.b2Shape');

goog.require('Box2D.postDefs');
goog.require('Box2D.Collision.b2Distance');
goog.require('Box2D.Collision.b2DistanceInput');
goog.require('Box2D.Collision.b2DistanceOutput');
goog.require('Box2D.Collision.b2DistanceProxy');
goog.require('Box2D.Collision.b2SimplexCache');

Box2D.Collision.Shapes.b2Shape = function() {
    this.m_type = Box2D.Collision.Shapes.b2Shape.e_unknownShape;
    this.m_radius = Box2D.Common.b2Settings.b2_linearSlop;
};

Box2D.Collision.Shapes.b2Shape.prototype.Copy = function() {
    return null;
};

Box2D.Collision.Shapes.b2Shape.prototype.Set = function(other) {
    this.m_radius = other.m_radius;
};

Box2D.Collision.Shapes.b2Shape.prototype.GetType = function() {
    return this.m_type;
};

Box2D.Collision.Shapes.b2Shape.prototype.TestPoint = function(xf, p) {
    return false;
};

Box2D.Collision.Shapes.b2Shape.prototype.RayCast = function(output, input, transform) {
    return false;
};

Box2D.Collision.Shapes.b2Shape.prototype.ComputeAABB = function(aabb, xf) {};

Box2D.Collision.Shapes.b2Shape.prototype.ComputeMass = function(massData, density) {
    if (density === undefined) density = 0;
};

Box2D.Collision.Shapes.b2Shape.prototype.ComputeSubmergedArea = function(normal, offset, xf, c) {
    if (offset === undefined) offset = 0;
    return 0;
};

Box2D.Collision.Shapes.b2Shape.TestOverlap = function(shape1, transform1, shape2, transform2) {
    var input = new Box2D.Collision.b2DistanceInput();
    input.proxyA = new Box2D.Collision.b2DistanceProxy();
    input.proxyA.Set(shape1);
    input.proxyB = new Box2D.Collision.b2DistanceProxy();
    input.proxyB.Set(shape2);
    input.transformA = transform1;
    input.transformB = transform2;
    input.useRadii = true;
    var simplexCache = new Box2D.Collision.b2SimplexCache();
    simplexCache.count = 0;
    var output = new Box2D.Collision.b2DistanceOutput();
    Box2D.Collision.b2Distance.Distance(output, simplexCache, input);
    return output.distance < 10.0 * Number.MIN_VALUE;
};

Box2D.postDefs.push(function() {
    Box2D.Collision.Shapes.b2Shape.e_unknownShape = -1;
    Box2D.Collision.Shapes.b2Shape.e_circleShape = 0;
    Box2D.Collision.Shapes.b2Shape.e_polygonShape = 1;
    Box2D.Collision.Shapes.b2Shape.e_edgeShape = 2;
    Box2D.Collision.Shapes.b2Shape.e_shapeTypeCount = 3;
    Box2D.Collision.Shapes.b2Shape.e_hitCollide = 1;
    Box2D.Collision.Shapes.b2Shape.e_missCollide = 0;
    Box2D.Collision.Shapes.b2Shape.e_startsInsideCollide = -1;
});
/*
 * See Box2D.js
 */
goog.provide('Box2D.Collision.Shapes.b2CircleShape');

goog.require('Box2D.Common.Math.b2Vec2');
goog.require('Box2D.Collision.Shapes.b2Shape');
goog.require('Box2D.is');
goog.require('Box2D.Common.Math.b2Math');

Box2D.Collision.Shapes.b2CircleShape = function(radius) {
    Box2D.Collision.Shapes.b2Shape.call(this);
    if (radius === undefined) radius = 0;
    this.m_type = Box2D.Collision.Shapes.b2Shape.e_circleShape;
    this.m_radius = radius;
    this.m_p = new Box2D.Common.Math.b2Vec2(0, 0);
};

Box2D.inherit(Box2D.Collision.Shapes.b2CircleShape, Box2D.Collision.Shapes.b2Shape);
Box2D.Collision.Shapes.b2CircleShape.prototype.__super = Box2D.Collision.Shapes.b2Shape.prototype;

Box2D.Collision.Shapes.b2CircleShape.prototype.Copy = function() {
    var s = new Box2D.Collision.Shapes.b2CircleShape();
    s.Set(this);
    return s;
};

Box2D.Collision.Shapes.b2CircleShape.prototype.Set = function(other) {
    this.__super.Set.call(this, other);
    if (Box2D.is(other, Box2D.Collision.Shapes.b2CircleShape)) {
        this.m_p.SetV(other.m_p);
    }
};

Box2D.Collision.Shapes.b2CircleShape.prototype.TestPoint = function(transform, p) {
    var tMat = transform.R;
    var dX = transform.position.x + (tMat.col1.x * this.m_p.x + tMat.col2.x * this.m_p.y);
    var dY = transform.position.y + (tMat.col1.y * this.m_p.x + tMat.col2.y * this.m_p.y);
    dX = p.x - dX;
    dY = p.y - dY;
    return (dX * dX + dY * dY) <= this.m_radius * this.m_radius;
};

Box2D.Collision.Shapes.b2CircleShape.prototype.RayCast = function(output, input, transform) {
    var tMat = transform.R;
    var positionX = transform.position.x + (tMat.col1.x * this.m_p.x + tMat.col2.x * this.m_p.y);
    var positionY = transform.position.y + (tMat.col1.y * this.m_p.x + tMat.col2.y * this.m_p.y);
    var sX = input.p1.x - positionX;
    var sY = input.p1.y - positionY;
    var b = (sX * sX + sY * sY) - this.m_radius * this.m_radius;
    var rX = input.p2.x - input.p1.x;
    var rY = input.p2.y - input.p1.y;
    var c = (sX * rX + sY * rY);
    var rr = (rX * rX + rY * rY);
    var sigma = c * c - rr * b;
    if (sigma < 0.0 || rr < Number.MIN_VALUE) {
        return false;
    }
    var a = (-(c + Math.sqrt(sigma)));
    if (0.0 <= a && a <= input.maxFraction * rr) {
        a /= rr;
        output.fraction = a;
        output.normal.x = sX + a * rX;
        output.normal.y = sY + a * rY;
        output.normal.Normalize();
        return true;
    }
    return false;
};

Box2D.Collision.Shapes.b2CircleShape.prototype.ComputeAABB = function(aabb, transform) {
    var tMat = transform.R;
    var pX = transform.position.x + (tMat.col1.x * this.m_p.x + tMat.col2.x * this.m_p.y);
    var pY = transform.position.y + (tMat.col1.y * this.m_p.x + tMat.col2.y * this.m_p.y);
    aabb.lowerBound.Set(pX - this.m_radius, pY - this.m_radius);
    aabb.upperBound.Set(pX + this.m_radius, pY + this.m_radius);
};

Box2D.Collision.Shapes.b2CircleShape.prototype.ComputeMass = function(massData, density) {
    if (density === undefined) density = 0;
    massData.mass = density * Math.PI * this.m_radius * this.m_radius;
    massData.center.SetV(this.m_p);
    massData.I = massData.mass * (0.5 * this.m_radius * this.m_radius + (this.m_p.x * this.m_p.x + this.m_p.y * this.m_p.y));
};

Box2D.Collision.Shapes.b2CircleShape.prototype.ComputeSubmergedArea = function(normal, offset, xf, c) {
    if (offset === undefined) offset = 0;
    var p = Box2D.Common.Math.b2Math.MulX(xf, this.m_p);
    var l = (-(Box2D.Common.Math.b2Math.Dot(normal, p) - offset));
    if (l < (-this.m_radius) + Number.MIN_VALUE) {
        return 0;
    }
    if (l > this.m_radius) {
        c.SetV(p);
        return Math.PI * this.m_radius * this.m_radius;
    }
    var r2 = this.m_radius * this.m_radius;
    var l2 = l * l;
    var area = r2 * (Math.asin(l / this.m_radius) + Math.PI / 2) + l * Math.sqrt(r2 - l2);
    var com = (-2 / 3 * Math.pow(r2 - l2, 1.5) / area);
    c.x = p.x + normal.x * com;
    c.y = p.y + normal.y * com;
    return area;
};

Box2D.Collision.Shapes.b2CircleShape.prototype.GetLocalPosition = function() {
    return this.m_p;
};

Box2D.Collision.Shapes.b2CircleShape.prototype.SetLocalPosition = function(position) {
    this.m_p.SetV(position);
};

Box2D.Collision.Shapes.b2CircleShape.prototype.GetRadius = function() {
    return this.m_radius;
};

Box2D.Collision.Shapes.b2CircleShape.prototype.SetRadius = function(radius) {
    if (radius === undefined) radius = 0;
    this.m_radius = radius;
};

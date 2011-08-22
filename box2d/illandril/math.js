/*
 * See Box2D.js
 */
goog.provide('Box2D.Common.Math');

goog.require('Box2D.base');

Box2D.Common.Math.b2Vec2 = function(x, y) {
    this.x = x;
    this.y = y;
};

Box2D.Common.Math.b2Vec2.prototype.SetZero = function() {
    this.x = 0.0;
    this.y = 0.0;
};

Box2D.Common.Math.b2Vec2.prototype.Set = function(x, y) {
    this.x = x;
    this.y = y;
};

Box2D.Common.Math.b2Vec2.prototype.SetV = function(v) {
    this.x = v.x;
    this.y = v.y;
};

Box2D.Common.Math.b2Vec2.prototype.GetNegative = function() {
    return new Box2D.Common.Math.b2Vec2((-this.x), (-this.y));
};

Box2D.Common.Math.b2Vec2.prototype.NegativeSelf = function() {
    this.x = (-this.x);
    this.y = (-this.y);
};

Box2D.Common.Math.b2Vec2.prototype.Copy = function() {
    return new Box2D.Common.Math.b2Vec2(this.x, this.y);
};

Box2D.Common.Math.b2Vec2.prototype.Add = function(v) {
    this.x += v.x;
    this.y += v.y;
};

Box2D.Common.Math.b2Vec2.prototype.Subtract = function(v) {
    this.x -= v.x;
    this.y -= v.y;
};

Box2D.Common.Math.b2Vec2.prototype.Multiply = function(a) {
    this.x *= a;
    this.y *= a;
};

Box2D.Common.Math.b2Vec2.prototype.MulM = function(A) {
    var tX = this.x;
    this.x = A.col1.x * tX + A.col2.x * this.y;
    this.y = A.col1.y * tX + A.col2.y * this.y;
};

Box2D.Common.Math.b2Vec2.prototype.MulTM = function(A) {
    var tX = Box2D.Common.Math.b2Math.Dot(this, A.col1);
    this.y = Box2D.Common.Math.b2Math.Dot(this, A.col2);
    this.x = tX;
};

Box2D.Common.Math.b2Vec2.prototype.CrossVF = function(s) {
    var tX = this.x;
    this.x = s * this.y;
    this.y = (-s * tX);
};

Box2D.Common.Math.b2Vec2.prototype.CrossFV = function(s) {
    var tX = this.x;
    this.x = (-s * this.y);
    this.y = s * tX;
};

Box2D.Common.Math.b2Vec2.prototype.MinV = function(b) {
    this.x = this.x < b.x ? this.x : b.x;
    this.y = this.y < b.y ? this.y : b.y;
};

Box2D.Common.Math.b2Vec2.prototype.MaxV = function(b) {
    this.x = this.x > b.x ? this.x : b.x;
    this.y = this.y > b.y ? this.y : b.y;
};

Box2D.Common.Math.b2Vec2.prototype.Abs = function() {
    if (this.x < 0) this.x = (-this.x);
    if (this.y < 0) this.y = (-this.y);
};

Box2D.Common.Math.b2Vec2.prototype.Length = function() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
};

Box2D.Common.Math.b2Vec2.prototype.LengthSquared = function() {
    return (this.x * this.x + this.y * this.y);
};

Box2D.Common.Math.b2Vec2.prototype.Normalize = function() {
    var length = this.Length();
    if (length < Number.MIN_VALUE) {
        return 0.0;
    }
    var invLength = 1.0 / length;
    this.x *= invLength;
    this.y *= invLength;
    return length;
};

Box2D.Common.Math.b2Vec2.prototype.IsValid = function () {
  return Box2D.Common.Math.b2Math.IsValid(this.x) && Box2D.Common.Math.b2Math.IsValid(this.y);
};

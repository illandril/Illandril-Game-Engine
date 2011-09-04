/*
 * See Box2D.js
 */
goog.provide('Box2D.Common.Math.b2Transform');

goog.require('Box2D.Common.Math.b2Mat22');
goog.require('Box2D.Common.Math.b2Vec2');

Box2D.Common.Math.b2Transform = function(pos, r) {
    this.position = new Box2D.Common.Math.b2Vec2;
    this.R = new Box2D.Common.Math.b2Mat22();
    if (this.constructor === Box2D.Common.Math.b2Transform) {
        if (pos === undefined) pos = null;
        if (r === undefined) r = null;
        if (pos) {
            this.position.SetV(pos);
            this.R.SetM(r);
        }
    }
};

Box2D.Common.Math.b2Transform.prototype.Initialize = function(pos, r) {
    this.position.SetV(pos);
    this.R.SetM(r);
};

Box2D.Common.Math.b2Transform.prototype.SetIdentity = function() {
    this.position.SetZero();
    this.R.SetIdentity();
};

Box2D.Common.Math.b2Transform.prototype.Set = function(x) {
    this.position.SetV(x.position);
    this.R.SetM(x.R);
};

Box2D.Common.Math.b2Transform.prototype.GetAngle = function() {
    return Math.atan2(this.R.col1.y, this.R.col1.x);
};

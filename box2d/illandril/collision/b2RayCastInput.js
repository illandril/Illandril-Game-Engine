/*
 * See Box2D.js
 */
goog.provide('Box2D.Collision.b2RayCastInput');

goog.require('Box2D.Common.Math.b2Vec2');

Box2D.Collision.b2RayCastInput = function(p1, p2, maxFraction) {
      this.p1 = new Box2D.Common.Math.b2Vec2(0, 0);
      this.p2 = new Box2D.Common.Math.b2Vec2(0, 0);
      if (maxFraction === undefined) maxFraction = 1;
      if (p1) this.p1.SetV(p1);
      if (p2) this.p2.SetV(p2);
      this.maxFraction = maxFraction;
};

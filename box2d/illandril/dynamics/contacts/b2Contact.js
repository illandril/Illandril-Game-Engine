/*
 * See Box2D.js
 */
goog.provide('Box2D.Dynamics.Contacts.b2Contact');

goog.require('Box2D.Dynamics.Contacts.b2ContactEdge');
goog.require('Box2D.Collision.b2Manifold');
goog.require('Box2D.Collision.b2TOIInput');
goog.require('Box2D.Collision.b2TimeOfImpact');
goog.require('Box2D.Dynamics.b2BodyDef');
goog.require('Box2D.Collision.Shapes.b2Shape');
goog.require('Box2D.Common.b2Settings');

/**
 * @constructor
 */
Box2D.Dynamics.Contacts.b2Contact = function() {
    this.m_nodeA = new Box2D.Dynamics.Contacts.b2ContactEdge();
    this.m_nodeB = new Box2D.Dynamics.Contacts.b2ContactEdge();
    this.m_manifold = new Box2D.Collision.b2Manifold();
    this.m_oldManifold = new Box2D.Collision.b2Manifold();
};

Box2D.Dynamics.Contacts.b2Contact.prototype.GetManifold = function () {
  return this.m_manifold;
};

Box2D.Dynamics.Contacts.b2Contact.prototype.GetWorldManifold = function (worldManifold) {
  var bodyA = this.m_fixtureA.GetBody();
  var bodyB = this.m_fixtureB.GetBody();
  var shapeA = this.m_fixtureA.GetShape();
  var shapeB = this.m_fixtureB.GetShape();
  worldManifold.Initialize(this.m_manifold, bodyA.GetTransform(), shapeA.m_radius, bodyB.GetTransform(), shapeB.m_radius);
};

Box2D.Dynamics.Contacts.b2Contact.prototype.IsTouching = function () {
  return this.touching;
};

Box2D.Dynamics.Contacts.b2Contact.prototype.IsContinuous = function () {
  return this.continuous;
};

Box2D.Dynamics.Contacts.b2Contact.prototype.SetSensor = function (sensor) {
   this.sensor = sensor;
};

Box2D.Dynamics.Contacts.b2Contact.prototype.IsSensor = function () {
  return this.sensor;
};

Box2D.Dynamics.Contacts.b2Contact.prototype.SetEnabled = function (flag) {
   this.enabled = flag;
};

Box2D.Dynamics.Contacts.b2Contact.prototype.IsEnabled = function () {
   return this.enabled;
};

Box2D.Dynamics.Contacts.b2Contact.prototype.GetNext = function () {
  return this.m_next;
};

Box2D.Dynamics.Contacts.b2Contact.prototype.GetFixtureA = function () {
  return this.m_fixtureA;
};

Box2D.Dynamics.Contacts.b2Contact.prototype.GetFixtureB = function () {
  return this.m_fixtureB;
};

Box2D.Dynamics.Contacts.b2Contact.prototype.FlagForFiltering = function () {
   this.filtering = true;
};

Box2D.Dynamics.Contacts.b2Contact.prototype.ClearFiltering = function () {
   this.filtering = false;
};

Box2D.Dynamics.Contacts.b2Contact.prototype.IsFiltering = function () {
   return this.filtering;
};

Box2D.Dynamics.Contacts.b2Contact.prototype.Reset = function (fixtureA, fixtureB) {
  if (fixtureA === undefined) fixtureA = null;
  if (fixtureB === undefined) fixtureB = null;
  this.enabled = true;
  this.sensor = false;
  this.continuous = false;
  this.touching = false;
  this.filtering = false;
  if (!fixtureA || !fixtureB) {
     this.m_fixtureA = null;
     this.m_fixtureB = null;
     return;
  }
  if (fixtureA.IsSensor() || fixtureB.IsSensor()) {
      this.sensor = true;
  }
  var bodyA = fixtureA.GetBody();
  var bodyB = fixtureB.GetBody();
  if (bodyA.GetType() != Box2D.Dynamics.b2BodyDef.b2_dynamicBody || bodyA.IsBullet() || bodyB.GetType() != Box2D.Dynamics.b2BodyDef.b2_dynamicBody || bodyB.IsBullet()) {
      this.continuous = true;
  }
  this.m_fixtureA = fixtureA;
  this.m_fixtureB = fixtureB;
  this.m_manifold.m_pointCount = 0;
  this.m_prev = null;
  this.m_next = null;
  this.m_nodeA.contact = null;
  this.m_nodeA.prev = null;
  this.m_nodeA.next = null;
  this.m_nodeA.other = null;
  this.m_nodeB.contact = null;
  this.m_nodeB.prev = null;
  this.m_nodeB.next = null;
  this.m_nodeB.other = null;
};

Box2D.Dynamics.Contacts.b2Contact.prototype.Update = function (listener) {
  var tManifold = this.m_oldManifold;
  this.m_oldManifold = this.m_manifold;
  this.m_manifold = tManifold;
  this.enabled = true;
  var touching = false;
  var wasTouching = this.IsTouching();
  var bodyA = this.m_fixtureA.m_body;
  var bodyB = this.m_fixtureB.m_body;
  var aabbOverlap = this.m_fixtureA.m_aabb.TestOverlap(this.m_fixtureB.m_aabb);
  if (this.sensor) {
     if (aabbOverlap) {
        touching = Box2D.Collision.Shapes.b2Shape.TestOverlap(this.m_fixtureA.GetShape(), bodyA.GetTransform(), this.m_fixtureB.GetShape(), bodyB.GetTransform());
     }
     this.m_manifold.m_pointCount = 0;
  } else {
     if (bodyA.GetType() != Box2D.Dynamics.b2BodyDef.b2_dynamicBody || bodyA.IsBullet() || bodyB.GetType() != Box2D.Dynamics.b2BodyDef.b2_dynamicBody || bodyB.IsBullet()) {
        this.continuous = true;
     } else {
        this.continuous = false;
     }
     if (aabbOverlap) {
        this.Evaluate();
        touching = this.m_manifold.m_pointCount > 0;
        for (var i = 0; i < this.m_manifold.m_pointCount; i++) {
           var mp2 = this.m_manifold.m_points[i];
           mp2.m_normalImpulse = 0.0;
           mp2.m_tangentImpulse = 0.0;
           for (var j = 0; j < this.m_oldManifold.m_pointCount; j++) {
              var mp1 = this.m_oldManifold.m_points[j];
              if (mp1.m_id.key == mp2.m_id.key) {
                 mp2.m_normalImpulse = mp1.m_normalImpulse;
                 mp2.m_tangentImpulse = mp1.m_tangentImpulse;
                 break;
              }
           }
        }
     } else {
        this.m_manifold.m_pointCount = 0;
     }
     if (touching != wasTouching) {
        bodyA.SetAwake(true);
        bodyB.SetAwake(true);
     }
  }
  this.touching = touching;
  
  if (!wasTouching && touching) {
     listener.BeginContact(this);
  }
  if (wasTouching && !touching) {
     listener.EndContact(this);
  }
  if (!this.sensor) {
     listener.PreSolve(this, this.m_oldManifold);
  }
};

Box2D.Dynamics.Contacts.b2Contact.prototype.Evaluate = function () {};

Box2D.Dynamics.Contacts.b2Contact.prototype.ComputeTOI = function (sweepA, sweepB) {
  Box2D.Dynamics.Contacts.b2Contact.s_input.proxyA.Set(this.m_fixtureA.GetShape());
  Box2D.Dynamics.Contacts.b2Contact.s_input.proxyB.Set(this.m_fixtureB.GetShape());
  Box2D.Dynamics.Contacts.b2Contact.s_input.sweepA = sweepA;
  Box2D.Dynamics.Contacts.b2Contact.s_input.sweepB = sweepB;
  Box2D.Dynamics.Contacts.b2Contact.s_input.tolerance = Box2D.Common.b2Settings.b2_linearSlop;
  return Box2D.Collision.b2TimeOfImpact.TimeOfImpact(Box2D.Dynamics.Contacts.b2Contact.s_input);
};

Box2D.Dynamics.Contacts.b2Contact.s_input = new Box2D.Collision.b2TOIInput();

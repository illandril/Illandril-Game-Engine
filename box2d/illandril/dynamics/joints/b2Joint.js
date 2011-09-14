/*
 * See Box2D.js
 */
goog.provide('Box2D.Dynamics.Joints.b2Joint');

goog.require('Box2D.Dynamics.Joints.b2JointEdge');
goog.require('Box2D.Common.Math.b2Vec2');
goog.require('Box2D.Common.b2Settings');
goog.require('Box2D.Common.Math.b2Math');

/**
 * @param {!Box2D.Dynamics.Joints.b2JointDef} def
 * @constructor
 */
Box2D.Dynamics.Joints.b2Joint = function(def) {
    this.m_edgeA = new Box2D.Dynamics.Joints.b2JointEdge();
    this.m_edgeB = new Box2D.Dynamics.Joints.b2JointEdge();
    this.m_localCenterA = new Box2D.Common.Math.b2Vec2(0, 0);
    this.m_localCenterB = new Box2D.Common.Math.b2Vec2(0, 0);
    Box2D.Common.b2Settings.b2Assert(def.bodyA != def.bodyB);
    this.m_type = def.type;
    this.m_prev = null;
    this.m_next = null;
    this.m_bodyA = def.bodyA;
    this.m_bodyB = def.bodyB;
    this.m_collideConnected = def.collideConnected;
};

Box2D.Dynamics.Joints.b2Joint.prototype.GetType = function() {
    return this.m_type;
};

Box2D.Dynamics.Joints.b2Joint.prototype.GetAnchorA = function() {
    return null;
};

Box2D.Dynamics.Joints.b2Joint.prototype.GetAnchorB = function() {
    return null;
};

Box2D.Dynamics.Joints.b2Joint.prototype.GetReactionForce = function(inv_dt) {
    if (inv_dt === undefined) inv_dt = 0;
    return null;
};

Box2D.Dynamics.Joints.b2Joint.prototype.GetReactionTorque = function(inv_dt) {
    if (inv_dt === undefined) inv_dt = 0;
    return 0.0;
};

Box2D.Dynamics.Joints.b2Joint.prototype.GetBodyA = function() {
    return this.m_bodyA;
};

Box2D.Dynamics.Joints.b2Joint.prototype.GetBodyB = function() {
    return this.m_bodyB;
};

Box2D.Dynamics.Joints.b2Joint.prototype.GetNext = function() {
    return this.m_next;
};

Box2D.Dynamics.Joints.b2Joint.prototype.IsActive = function() {
    return this.m_bodyA.IsActive() && this.m_bodyB.IsActive();
};

Box2D.Dynamics.Joints.b2Joint.Create = function(def) {
    return def.Create();
};

Box2D.Dynamics.Joints.b2Joint.prototype.InitVelocityConstraints = function(step) {};

Box2D.Dynamics.Joints.b2Joint.prototype.SolveVelocityConstraints = function(step) {};

Box2D.Dynamics.Joints.b2Joint.prototype.FinalizeVelocityConstraints = function() {};

Box2D.Dynamics.Joints.b2Joint.prototype.SolvePositionConstraints = function(baumgarte) {
    return false;
};

Box2D.Dynamics.Joints.b2Joint.e_unknownJoint = 0;
Box2D.Dynamics.Joints.b2Joint.e_revoluteJoint = 1;
Box2D.Dynamics.Joints.b2Joint.e_prismaticJoint = 2;
Box2D.Dynamics.Joints.b2Joint.e_distanceJoint = 3;
Box2D.Dynamics.Joints.b2Joint.e_pulleyJoint = 4;
Box2D.Dynamics.Joints.b2Joint.e_mouseJoint = 5;
Box2D.Dynamics.Joints.b2Joint.e_gearJoint = 6;
Box2D.Dynamics.Joints.b2Joint.e_lineJoint = 7;
Box2D.Dynamics.Joints.b2Joint.e_weldJoint = 8;
Box2D.Dynamics.Joints.b2Joint.e_frictionJoint = 9;
Box2D.Dynamics.Joints.b2Joint.e_inactiveLimit = 0;
Box2D.Dynamics.Joints.b2Joint.e_atLowerLimit = 1;
Box2D.Dynamics.Joints.b2Joint.e_atUpperLimit = 2;
Box2D.Dynamics.Joints.b2Joint.e_equalLimits = 3;

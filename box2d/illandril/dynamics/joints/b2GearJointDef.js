/*
 * See Box2D.js
 */
goog.provide('Box2D.Dynamics.Joints.b2GearJointDef');

goog.require('Box2D.Dynamics.Joints.b2JointDef');
goog.require('Box2D.Dynamics.Joints.b2Joint');
goog.require('Box2D.Dynamics.Joints.b2GearJoint');

/**
 * @constructor
 * @extends {Box2D.Dynamics.Joints.b2JointDef}
 */
 Box2D.Dynamics.Joints.b2GearJointDef = function() {
    Box2D.Dynamics.Joints.b2JointDef.call(this);
    this.type = Box2D.Dynamics.Joints.b2Joint.e_gearJoint;
    this.joint1 = null;
    this.joint2 = null;
    this.ratio = 1.0;
};
goog.inherits(Box2D.Dynamics.Joints.b2GearJointDef, Box2D.Dynamics.Joints.b2JointDef);

Box2D.Dynamics.Joints.b2GearJointDef.prototype.Create = function() {
    return new Box2D.Dynamics.Joints.b2GearJoint(this);
};
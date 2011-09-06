/*
 * See Box2D.js
 */
goog.provide('Box2D.unopped');

goog.require('Box2D.Common.b2Color');
goog.require('Box2D.Collision.Shapes.b2PolygonShape');
goog.require('Box2D.Collision.Shapes.b2MassData');
goog.require('Box2D.defineProperty');
goog.require('Box2D.Collision.Shapes.b2EdgeShape');
goog.require('Box2D.Collision.Shapes.b2EdgeChainDef');
goog.require('Box2D.Collision.Shapes.b2CircleShape');
goog.require('Box2D.Collision.ClipVertex');
goog.require('Box2D.Collision.b2WorldManifold');
goog.require('Box2D.Collision.b2TOIInput');
goog.require('Box2D.Collision.b2TimeOfImpact');
goog.require('Box2D.Collision.b2SimplexVertex');
goog.require('Box2D.Collision.b2Simplex');
goog.require('Box2D.Collision.b2SeparationFunction');
goog.require('Box2D.Collision.Features');
goog.require('Box2D.Collision.b2Segment');
goog.require('Box2D.Collision.b2RayCastOutput');
goog.require('Box2D.Collision.b2RayCastInput');
goog.require('Box2D.Collision.b2Manifold');
goog.require('Box2D.Collision.Shapes.b2Shape');
goog.require('Box2D.Common.b2Settings');
goog.require('Box2D.Collision.b2AABB');
goog.require('Box2D.Collision.b2SimplexCache');
goog.require('Box2D.Collision.b2Collision');
goog.require('Box2D.Collision.b2ContactID');
goog.require('Box2D.Collision.b2ContactPoint');
goog.require('Box2D.Collision.b2Distance');
goog.require('Box2D.Collision.b2DistanceInput');
goog.require('Box2D.Collision.b2DistanceOutput');
goog.require('Box2D.Collision.b2DistanceProxy');
goog.require('Box2D.Collision.b2DynamicTreeBroadPhase');
goog.require('Box2D.Collision.b2DynamicTreeNode');
goog.require('Box2D.Collision.b2DynamicTree');
goog.require('Box2D.Collision.IBroadPhase');
goog.require('Box2D.Common.Math.b2Math');
goog.require('Box2D.Common.Math.b2Transform');
goog.require('Box2D.Common.Math.b2Sweep');
goog.require('Box2D.Common.Math.b2Vec2');
goog.require('Box2D.Common.Math.b2Vec3');
goog.require('Box2D.Common.Math.b2Mat22');
goog.require('Box2D.Common.Math.b2Mat33');
goog.require('Box2D.Dynamics');
goog.require('Box2D.Dynamics.Contacts.b2CircleContact');
goog.require('Box2D.Dynamics.Contacts.b2Contact');
goog.require('Box2D.Dynamics.Contacts.b2ContactConstraint');
goog.require('Box2D.Dynamics.Contacts.b2ContactConstraintPoint');
goog.require('Box2D.Dynamics.Contacts.b2ContactEdge');
goog.require('Box2D.Dynamics.Contacts.b2ContactFactory');
goog.require('Box2D.Dynamics.Contacts.b2ContactRegister');
goog.require('Box2D.Dynamics.Contacts.b2ContactResult');
goog.require('Box2D.Dynamics.Contacts.b2ContactSolver');
goog.require('Box2D.Dynamics.Contacts.b2EdgeAndCircleContact');
goog.require('Box2D.Dynamics.Contacts.b2PolyAndCircleContact');
goog.require('Box2D.Dynamics.Contacts.b2PolyAndEdgeContact');
goog.require('Box2D.Dynamics.Contacts.b2PolygonContact');
goog.require('Box2D.Dynamics.Contacts.b2PositionSolverManifold');
goog.require('Box2D.Dynamics.Contacts');
goog.require('Box2D.Dynamics.Contacts');
goog.require('Box2D.Dynamics.Contacts');
goog.require('Box2D.inherit');
goog.require('Box2D.generateCallback');
goog.require('Box2D.is');
goog.require('Box2D.Queue');
goog.require('Box2D.postDefs');
goog.require('Box2D.Consts');

//package structure
if (typeof(Box2D.Dynamics.Controllers) === "undefined") Box2D.Dynamics.Controllers = {};
if (typeof(Box2D.Dynamics.Joints) === "undefined") Box2D.Dynamics.Joints = {};

(function () {
   function b2BuoyancyController() {
      b2BuoyancyController.b2BuoyancyController.apply(this, arguments);
   };
   Box2D.Dynamics.Controllers.b2BuoyancyController = b2BuoyancyController;

   function b2ConstantAccelController() {
      b2ConstantAccelController.b2ConstantAccelController.apply(this, arguments);
   };
   Box2D.Dynamics.Controllers.b2ConstantAccelController = b2ConstantAccelController;

   function b2ConstantForceController() {
      b2ConstantForceController.b2ConstantForceController.apply(this, arguments);
   };
   Box2D.Dynamics.Controllers.b2ConstantForceController = b2ConstantForceController;

   function b2Controller() {
      b2Controller.b2Controller.apply(this, arguments);
   };
   Box2D.Dynamics.Controllers.b2Controller = b2Controller;

   function b2ControllerEdge() {
      b2ControllerEdge.b2ControllerEdge.apply(this, arguments);
   };
   Box2D.Dynamics.Controllers.b2ControllerEdge = b2ControllerEdge;

   function b2GravityController() {
      b2GravityController.b2GravityController.apply(this, arguments);
   };
   Box2D.Dynamics.Controllers.b2GravityController = b2GravityController;

   function b2TensorDampingController() {
      b2TensorDampingController.b2TensorDampingController.apply(this, arguments);
   };
   Box2D.Dynamics.Controllers.b2TensorDampingController = b2TensorDampingController;

   function b2DistanceJoint() {
      b2DistanceJoint.b2DistanceJoint.apply(this, arguments);
      if (this.constructor === b2DistanceJoint) this.b2DistanceJoint.apply(this, arguments);
   };
   Box2D.Dynamics.Joints.b2DistanceJoint = b2DistanceJoint;

   function b2DistanceJointDef() {
      b2DistanceJointDef.b2DistanceJointDef.apply(this, arguments);
      if (this.constructor === b2DistanceJointDef) this.b2DistanceJointDef.apply(this, arguments);
   };
   Box2D.Dynamics.Joints.b2DistanceJointDef = b2DistanceJointDef;

   function b2FrictionJoint() {
      b2FrictionJoint.b2FrictionJoint.apply(this, arguments);
      if (this.constructor === b2FrictionJoint) this.b2FrictionJoint.apply(this, arguments);
   };
   Box2D.Dynamics.Joints.b2FrictionJoint = b2FrictionJoint;

   function b2FrictionJointDef() {
      b2FrictionJointDef.b2FrictionJointDef.apply(this, arguments);
      if (this.constructor === b2FrictionJointDef) this.b2FrictionJointDef.apply(this, arguments);
   };
   Box2D.Dynamics.Joints.b2FrictionJointDef = b2FrictionJointDef;

   function b2GearJoint() {
      b2GearJoint.b2GearJoint.apply(this, arguments);
      if (this.constructor === b2GearJoint) this.b2GearJoint.apply(this, arguments);
   };
   Box2D.Dynamics.Joints.b2GearJoint = b2GearJoint;

   function b2GearJointDef() {
      b2GearJointDef.b2GearJointDef.apply(this, arguments);
      if (this.constructor === b2GearJointDef) this.b2GearJointDef.apply(this, arguments);
   };
   Box2D.Dynamics.Joints.b2GearJointDef = b2GearJointDef;

   function b2Jacobian() {
      b2Jacobian.b2Jacobian.apply(this, arguments);
   };
   Box2D.Dynamics.Joints.b2Jacobian = b2Jacobian;

   function b2Joint() {
      b2Joint.b2Joint.apply(this, arguments);
      if (this.constructor === b2Joint) this.b2Joint.apply(this, arguments);
   };
   Box2D.Dynamics.Joints.b2Joint = b2Joint;

   function b2JointDef() {
      b2JointDef.b2JointDef.apply(this, arguments);
      if (this.constructor === b2JointDef) this.b2JointDef.apply(this, arguments);
   };
   Box2D.Dynamics.Joints.b2JointDef = b2JointDef;

   function b2JointEdge() {
      b2JointEdge.b2JointEdge.apply(this, arguments);
   };
   Box2D.Dynamics.Joints.b2JointEdge = b2JointEdge;

   function b2LineJoint() {
      b2LineJoint.b2LineJoint.apply(this, arguments);
      if (this.constructor === b2LineJoint) this.b2LineJoint.apply(this, arguments);
   };
   Box2D.Dynamics.Joints.b2LineJoint = b2LineJoint;

   function b2LineJointDef() {
      b2LineJointDef.b2LineJointDef.apply(this, arguments);
      if (this.constructor === b2LineJointDef) this.b2LineJointDef.apply(this, arguments);
   };
   Box2D.Dynamics.Joints.b2LineJointDef = b2LineJointDef;

   function b2MouseJoint() {
      b2MouseJoint.b2MouseJoint.apply(this, arguments);
      if (this.constructor === b2MouseJoint) this.b2MouseJoint.apply(this, arguments);
   };
   Box2D.Dynamics.Joints.b2MouseJoint = b2MouseJoint;

   function b2MouseJointDef() {
      b2MouseJointDef.b2MouseJointDef.apply(this, arguments);
      if (this.constructor === b2MouseJointDef) this.b2MouseJointDef.apply(this, arguments);
   };
   Box2D.Dynamics.Joints.b2MouseJointDef = b2MouseJointDef;

   function b2PrismaticJoint() {
      b2PrismaticJoint.b2PrismaticJoint.apply(this, arguments);
      if (this.constructor === b2PrismaticJoint) this.b2PrismaticJoint.apply(this, arguments);
   };
   Box2D.Dynamics.Joints.b2PrismaticJoint = b2PrismaticJoint;

   function b2PrismaticJointDef() {
      b2PrismaticJointDef.b2PrismaticJointDef.apply(this, arguments);
      if (this.constructor === b2PrismaticJointDef) this.b2PrismaticJointDef.apply(this, arguments);
   };
   Box2D.Dynamics.Joints.b2PrismaticJointDef = b2PrismaticJointDef;

   function b2PulleyJoint() {
      b2PulleyJoint.b2PulleyJoint.apply(this, arguments);
      if (this.constructor === b2PulleyJoint) this.b2PulleyJoint.apply(this, arguments);
   };
   Box2D.Dynamics.Joints.b2PulleyJoint = b2PulleyJoint;

   function b2PulleyJointDef() {
      b2PulleyJointDef.b2PulleyJointDef.apply(this, arguments);
      if (this.constructor === b2PulleyJointDef) this.b2PulleyJointDef.apply(this, arguments);
   };
   Box2D.Dynamics.Joints.b2PulleyJointDef = b2PulleyJointDef;

   function b2RevoluteJoint() {
      b2RevoluteJoint.b2RevoluteJoint.apply(this, arguments);
      if (this.constructor === b2RevoluteJoint) this.b2RevoluteJoint.apply(this, arguments);
   };
   Box2D.Dynamics.Joints.b2RevoluteJoint = b2RevoluteJoint;

   function b2RevoluteJointDef() {
      b2RevoluteJointDef.b2RevoluteJointDef.apply(this, arguments);
      if (this.constructor === b2RevoluteJointDef) this.b2RevoluteJointDef.apply(this, arguments);
   };
   Box2D.Dynamics.Joints.b2RevoluteJointDef = b2RevoluteJointDef;

   function b2WeldJoint() {
      b2WeldJoint.b2WeldJoint.apply(this, arguments);
      if (this.constructor === b2WeldJoint) this.b2WeldJoint.apply(this, arguments);
   };
   Box2D.Dynamics.Joints.b2WeldJoint = b2WeldJoint;

   function b2WeldJointDef() {
      b2WeldJointDef.b2WeldJointDef.apply(this, arguments);
      if (this.constructor === b2WeldJointDef) this.b2WeldJointDef.apply(this, arguments);
   };
   Box2D.Dynamics.Joints.b2WeldJointDef = b2WeldJointDef;
})(); //definitions

(function () {
    
   var b2ControllerEdge = Box2D.Dynamics.Controllers.b2ControllerEdge,
      b2Mat22 = Box2D.Common.Math.b2Mat22,
      b2Mat33 = Box2D.Common.Math.b2Mat33,
      b2Math = Box2D.Common.Math.b2Math,
      b2Sweep = Box2D.Common.Math.b2Sweep,
      b2Transform = Box2D.Common.Math.b2Transform,
      b2Vec2 = Box2D.Common.Math.b2Vec2,
      b2Vec3 = Box2D.Common.Math.b2Vec3,
      b2Color = Box2D.Common.b2Color,
      b2Settings = Box2D.Common.b2Settings,
      b2AABB = Box2D.Collision.b2AABB,
      b2Collision = Box2D.Collision.b2Collision,
      b2ContactID = Box2D.Collision.b2ContactID,
      b2ContactPoint = Box2D.Collision.b2ContactPoint,
      b2Distance = Box2D.Collision.b2Distance,
      b2DistanceInput = Box2D.Collision.b2DistanceInput,
      b2DistanceOutput = Box2D.Collision.b2DistanceOutput,
      b2DistanceProxy = Box2D.Collision.b2DistanceProxy,
      b2DynamicTree = Box2D.Collision.b2DynamicTree,
      b2DynamicTreeBroadPhase = Box2D.Collision.b2DynamicTreeBroadPhase,
      b2DynamicTreeNode = Box2D.Collision.b2DynamicTreeNode,
      b2Manifold = Box2D.Collision.b2Manifold,
      b2RayCastInput = Box2D.Collision.b2RayCastInput,
      b2RayCastOutput = Box2D.Collision.b2RayCastOutput,
      b2Segment = Box2D.Collision.b2Segment,
      b2SeparationFunction = Box2D.Collision.b2SeparationFunction,
      b2Simplex = Box2D.Collision.b2Simplex,
      b2SimplexCache = Box2D.Collision.b2SimplexCache,
      b2SimplexVertex = Box2D.Collision.b2SimplexVertex,
      b2TimeOfImpact = Box2D.Collision.b2TimeOfImpact,
      b2TOIInput = Box2D.Collision.b2TOIInput,
      b2WorldManifold = Box2D.Collision.b2WorldManifold,
      ClipVertex = Box2D.Collision.ClipVertex,
      Features = Box2D.Collision.Features,
      IBroadPhase = Box2D.Collision.IBroadPhase,
      b2CircleShape = Box2D.Collision.Shapes.b2CircleShape,
      b2EdgeChainDef = Box2D.Collision.Shapes.b2EdgeChainDef,
      b2EdgeShape = Box2D.Collision.Shapes.b2EdgeShape,
      b2MassData = Box2D.Collision.Shapes.b2MassData,
      b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape,
      b2Shape = Box2D.Collision.Shapes.b2Shape,
      b2Body = Box2D.Dynamics.b2Body,
      b2BodyDef = Box2D.Dynamics.b2BodyDef,
      b2ContactFilter = Box2D.Dynamics.b2ContactFilter,
      b2ContactImpulse = Box2D.Dynamics.b2ContactImpulse,
      b2ContactListener = Box2D.Dynamics.b2ContactListener,
      b2ContactManager = Box2D.Dynamics.b2ContactManager,
      b2DebugDraw = Box2D.Dynamics.b2DebugDraw,
      b2DestructionListener = Box2D.Dynamics.b2DestructionListener,
      b2FilterData = Box2D.Dynamics.b2FilterData,
      b2Fixture = Box2D.Dynamics.b2Fixture,
      b2FixtureDef = Box2D.Dynamics.b2FixtureDef,
      b2Island = Box2D.Dynamics.b2Island,
      b2TimeStep = Box2D.Dynamics.b2TimeStep,
      b2World = Box2D.Dynamics.b2World,
      b2CircleContact = Box2D.Dynamics.Contacts.b2CircleContact,
      b2Contact = Box2D.Dynamics.Contacts.b2Contact,
      b2ContactConstraint = Box2D.Dynamics.Contacts.b2ContactConstraint,
      b2ContactConstraintPoint = Box2D.Dynamics.Contacts.b2ContactConstraintPoint,
      b2ContactEdge = Box2D.Dynamics.Contacts.b2ContactEdge,
      b2ContactFactory = Box2D.Dynamics.Contacts.b2ContactFactory,
      b2ContactRegister = Box2D.Dynamics.Contacts.b2ContactRegister,
      b2ContactResult = Box2D.Dynamics.Contacts.b2ContactResult,
      b2ContactSolver = Box2D.Dynamics.Contacts.b2ContactSolver,
      b2EdgeAndCircleContact = Box2D.Dynamics.Contacts.b2EdgeAndCircleContact,
      b2NullContact = Box2D.Dynamics.Contacts.b2NullContact,
      b2PolyAndCircleContact = Box2D.Dynamics.Contacts.b2PolyAndCircleContact,
      b2PolyAndEdgeContact = Box2D.Dynamics.Contacts.b2PolyAndEdgeContact,
      b2PolygonContact = Box2D.Dynamics.Contacts.b2PolygonContact,
      b2PositionSolverManifold = Box2D.Dynamics.Contacts.b2PositionSolverManifold,
      b2Controller = Box2D.Dynamics.Controllers.b2Controller,
      b2DistanceJoint = Box2D.Dynamics.Joints.b2DistanceJoint,
      b2DistanceJointDef = Box2D.Dynamics.Joints.b2DistanceJointDef,
      b2FrictionJoint = Box2D.Dynamics.Joints.b2FrictionJoint,
      b2FrictionJointDef = Box2D.Dynamics.Joints.b2FrictionJointDef,
      b2GearJoint = Box2D.Dynamics.Joints.b2GearJoint,
      b2GearJointDef = Box2D.Dynamics.Joints.b2GearJointDef,
      b2Jacobian = Box2D.Dynamics.Joints.b2Jacobian,
      b2Joint = Box2D.Dynamics.Joints.b2Joint,
      b2JointDef = Box2D.Dynamics.Joints.b2JointDef,
      b2JointEdge = Box2D.Dynamics.Joints.b2JointEdge,
      b2LineJoint = Box2D.Dynamics.Joints.b2LineJoint,
      b2LineJointDef = Box2D.Dynamics.Joints.b2LineJointDef,
      b2MouseJoint = Box2D.Dynamics.Joints.b2MouseJoint,
      b2MouseJointDef = Box2D.Dynamics.Joints.b2MouseJointDef,
      b2PrismaticJoint = Box2D.Dynamics.Joints.b2PrismaticJoint,
      b2PrismaticJointDef = Box2D.Dynamics.Joints.b2PrismaticJointDef,
      b2PulleyJoint = Box2D.Dynamics.Joints.b2PulleyJoint,
      b2PulleyJointDef = Box2D.Dynamics.Joints.b2PulleyJointDef,
      b2RevoluteJoint = Box2D.Dynamics.Joints.b2RevoluteJoint,
      b2RevoluteJointDef = Box2D.Dynamics.Joints.b2RevoluteJointDef,
      b2WeldJoint = Box2D.Dynamics.Joints.b2WeldJoint,
      b2WeldJointDef = Box2D.Dynamics.Joints.b2WeldJointDef;

   b2Body.b2Body = function () {
      this.m_xf = new b2Transform();
      this.m_sweep = new b2Sweep();
      this.m_linearVelocity = new b2Vec2(0, 0);
      this.m_force = new b2Vec2(0, 0);
   };
   b2Body.prototype.connectEdges = function (s1, s2, angle1) {
      if (angle1 === undefined) angle1 = 0;
      var angle2 = Math.atan2(s2.GetDirectionVector().y, s2.GetDirectionVector().x);
      var coreOffset = Math.tan((angle2 - angle1) * 0.5);
      var core = b2Math.MulFV(coreOffset, s2.GetDirectionVector());
      core = b2Math.SubtractVV(core, s2.GetNormalVector());
      core = b2Math.MulFV(b2Settings.b2_toiSlop, core);
      core = b2Math.AddVV(core, s2.GetVertex1());
      var cornerDir = b2Math.AddVV(s1.GetDirectionVector(), s2.GetDirectionVector());
      cornerDir.Normalize();
      var convex = b2Math.Dot(s1.GetDirectionVector(), s2.GetNormalVector()) > 0.0;
      s1.SetNextEdge(s2, core, cornerDir, convex);
      s2.SetPrevEdge(s1, core, cornerDir, convex);
      return angle2;
   }
   b2Body.prototype.CreateFixture = function (def) {
      if (this.m_world.IsLocked() == true) {
         return null;
      }
      var fixture = new b2Fixture();
      fixture.Create(this, this.m_xf, def);
      if (this.m_flags & b2Body.e_activeFlag) {
         var broadPhase = this.m_world.m_contactManager.m_broadPhase;
         fixture.CreateProxy(broadPhase, this.m_xf);
      }
      fixture.m_next = this.m_fixtureList;
      this.m_fixtureList = fixture;
      ++this.m_fixtureCount;
      fixture.m_body = this;
      if (fixture.m_density > 0.0) {
         this.ResetMassData();
      }
      this.m_world.m_newFixture = true;
      return fixture;
   }
   b2Body.prototype.CreateFixture2 = function (shape, density) {
      if (density === undefined) density = 0.0;
      var def = new b2FixtureDef();
      def.shape = shape;
      def.density = density;
      return this.CreateFixture(def);
   }
   b2Body.prototype.DestroyFixture = function (fixture) {
      if (this.m_world.IsLocked() == true) {
         return;
      }
      var node = this.m_fixtureList;
      var ppF = null;
      var found = false;
      while (node != null) {
         if (node == fixture) {
            if (ppF) ppF.m_next = fixture.m_next;
            else this.m_fixtureList = fixture.m_next;
            found = true;
            break;
         }
         ppF = node;
         node = node.m_next;
      }
      var edge = this.m_contactList;
      while (edge) {
         var c = edge.contact;
         edge = edge.next;
         var fixtureA = c.GetFixtureA();
         var fixtureB = c.GetFixtureB();
         if (fixture == fixtureA || fixture == fixtureB) {
            this.m_world.m_contactManager.Destroy(c);
         }
      }
      if (this.m_flags & b2Body.e_activeFlag) {
         var broadPhase = this.m_world.m_contactManager.m_broadPhase;
         fixture.DestroyProxy(broadPhase);
      }
      else {}
      fixture.Destroy();
      fixture.m_body = null;
      fixture.m_next = null;
      --this.m_fixtureCount;
      this.ResetMassData();
   }
   b2Body.prototype.SetPositionAndAngle = function (position, angle) {
      if (angle === undefined) angle = 0;
      var f;
      if (this.m_world.IsLocked() == true) {
         return;
      }
      this.m_xf.R.Set(angle);
      this.m_xf.position.SetV(position);
      var tMat = this.m_xf.R;
      var tVec = this.m_sweep.localCenter;
      this.m_sweep.c.x = (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
      this.m_sweep.c.y = (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
      this.m_sweep.c.x += this.m_xf.position.x;
      this.m_sweep.c.y += this.m_xf.position.y;
      this.m_sweep.c0.SetV(this.m_sweep.c);
      this.m_sweep.a0 = this.m_sweep.a = angle;
      var broadPhase = this.m_world.m_contactManager.m_broadPhase;
      for (f = this.m_fixtureList;
      f; f = f.m_next) {
         f.Synchronize(broadPhase, this.m_xf, this.m_xf);
      }
      this.m_world.m_contactManager.FindNewContacts();
   }
   b2Body.prototype.SetTransform = function (xf) {
      this.SetPositionAndAngle(xf.position, xf.GetAngle());
   }
   b2Body.prototype.GetTransform = function () {
      return this.m_xf;
   }
   b2Body.prototype.GetPosition = function () {
      return this.m_xf.position;
   }
   b2Body.prototype.SetPosition = function (position) {
      this.SetPositionAndAngle(position, this.GetAngle());
   }
   b2Body.prototype.GetAngle = function () {
      return this.m_sweep.a;
   }
   b2Body.prototype.SetAngle = function (angle) {
      if (angle === undefined) angle = 0;
      this.SetPositionAndAngle(this.GetPosition(), angle);
   }
   b2Body.prototype.GetWorldCenter = function () {
      return this.m_sweep.c;
   }
   b2Body.prototype.GetLocalCenter = function () {
      return this.m_sweep.localCenter;
   }
   b2Body.prototype.SetLinearVelocity = function (v) {
      if (this.m_type == b2Body.b2_staticBody) {
         return;
      }
      this.m_linearVelocity.SetV(v);
   }
   b2Body.prototype.GetLinearVelocity = function () {
      return this.m_linearVelocity;
   }
   b2Body.prototype.SetAngularVelocity = function (omega) {
      if (omega === undefined) omega = 0;
      if (this.m_type == b2Body.b2_staticBody) {
         return;
      }
      this.m_angularVelocity = omega;
   }
   b2Body.prototype.GetAngularVelocity = function () {
      return this.m_angularVelocity;
   }
   b2Body.prototype.GetDefinition = function () {
      var bd = new b2BodyDef();
      bd.type = this.GetType();
      bd.allowSleep = this.m_allowSleep;
      bd.angle = this.GetAngle();
      bd.angularDamping = this.m_angularDamping;
      bd.angularVelocity = this.m_angularVelocity;
      bd.fixedRotation = (this.m_flags & b2Body.e_fixedRotationFlag) == b2Body.e_fixedRotationFlag;
      bd.bullet = (this.m_flags & b2Body.e_bulletFlag) == b2Body.e_bulletFlag;
      bd.awake = this.m_awake;
      bd.linearDamping = this.m_linearDamping;
      bd.linearVelocity.SetV(this.GetLinearVelocity());
      bd.position = this.GetPosition();
      bd.userData = this.GetUserData();
      return bd;
   }
   b2Body.prototype.ApplyForce = function (force, point) {
      if (this.m_type != b2Body.b2_dynamicBody) {
         return;
      }
      if (this.IsAwake() == false) {
         this.SetAwake(true);
      }
      this.m_force.x += force.x;
      this.m_force.y += force.y;
      this.m_torque += ((point.x - this.m_sweep.c.x) * force.y - (point.y - this.m_sweep.c.y) * force.x);
   }
   b2Body.prototype.ApplyTorque = function (torque) {
      if (torque === undefined) torque = 0;
      if (this.m_type != b2Body.b2_dynamicBody) {
         return;
      }
      if (this.IsAwake() == false) {
         this.SetAwake(true);
      }
      this.m_torque += torque;
   }
   b2Body.prototype.ApplyImpulse = function (impulse, point) {
      if (this.m_type != b2Body.b2_dynamicBody) {
         return;
      }
      if (this.IsAwake() == false) {
         this.SetAwake(true);
      }
      this.m_linearVelocity.x += this.m_invMass * impulse.x;
      this.m_linearVelocity.y += this.m_invMass * impulse.y;
      this.m_angularVelocity += this.m_invI * ((point.x - this.m_sweep.c.x) * impulse.y - (point.y - this.m_sweep.c.y) * impulse.x);
   }
   b2Body.prototype.Split = function (callback) {
      var linearVelocity = this.GetLinearVelocity().Copy();
      var angularVelocity = this.GetAngularVelocity();
      var center = this.GetWorldCenter();
      var body1 = this;
      var body2 = this.m_world.CreateBody(this.GetDefinition());
      var prev;
      for (var f = body1.m_fixtureList; f;) {
         if (callback(f)) {
            var next = f.m_next;
            if (prev) {
               prev.m_next = next;
            }
            else {
               body1.m_fixtureList = next;
            }
            body1.m_fixtureCount--;
            f.m_next = body2.m_fixtureList;
            body2.m_fixtureList = f;
            body2.m_fixtureCount++;
            f.m_body = body2;
            f = next;
         }
         else {
            prev = f;
            f = f.m_next;
         }
      }
      body1.ResetMassData();
      body2.ResetMassData();
      var center1 = body1.GetWorldCenter();
      var center2 = body2.GetWorldCenter();
      var velocity1 = b2Math.AddVV(linearVelocity, b2Math.CrossFV(angularVelocity, b2Math.SubtractVV(center1, center)));
      var velocity2 = b2Math.AddVV(linearVelocity, b2Math.CrossFV(angularVelocity, b2Math.SubtractVV(center2, center)));
      body1.SetLinearVelocity(velocity1);
      body2.SetLinearVelocity(velocity2);
      body1.SetAngularVelocity(angularVelocity);
      body2.SetAngularVelocity(angularVelocity);
      body1.SynchronizeFixtures();
      body2.SynchronizeFixtures();
      return body2;
   }
   b2Body.prototype.Merge = function (other) {
      var f;
      for (f = other.m_fixtureList;
      f;) {
         var next = f.m_next;
         other.m_fixtureCount--;
         f.m_next = this.m_fixtureList;
         this.m_fixtureList = f;
         this.m_fixtureCount++;
         f.m_body = body2;
         f = next;
      }
      body1.m_fixtureCount = 0;
      var body1 = this;
      var body2 = other;
      var center1 = body1.GetWorldCenter();
      var center2 = body2.GetWorldCenter();
      var velocity1 = body1.GetLinearVelocity().Copy();
      var velocity2 = body2.GetLinearVelocity().Copy();
      var angular1 = body1.GetAngularVelocity();
      var angular = body2.GetAngularVelocity();
      body1.ResetMassData();
      this.SynchronizeFixtures();
   }
   b2Body.prototype.GetMass = function () {
      return this.m_mass;
   }
   b2Body.prototype.GetInertia = function () {
      return this.m_I;
   }
   b2Body.prototype.GetMassData = function (data) {
      data.mass = this.m_mass;
      data.I = this.m_I;
      data.center.SetV(this.m_sweep.localCenter);
   }
   b2Body.prototype.SetMassData = function (massData) {
      b2Settings.b2Assert(this.m_world.IsLocked() == false);
      if (this.m_world.IsLocked() == true) {
         return;
      }
      if (this.m_type != b2Body.b2_dynamicBody) {
         return;
      }
      this.m_invMass = 0.0;
      this.m_I = 0.0;
      this.m_invI = 0.0;
      this.m_mass = massData.mass;
      if (this.m_mass <= 0.0) {
         this.m_mass = 1.0;
      }
      this.m_invMass = 1.0 / this.m_mass;
      if (massData.I > 0.0 && (this.m_flags & b2Body.e_fixedRotationFlag) == 0) {
         this.m_I = massData.I - this.m_mass * (massData.center.x * massData.center.x + massData.center.y * massData.center.y);
         this.m_invI = 1.0 / this.m_I;
      }
      var oldCenter = this.m_sweep.c.Copy();
      this.m_sweep.localCenter.SetV(massData.center);
      this.m_sweep.c0.SetV(b2Math.MulX(this.m_xf, this.m_sweep.localCenter));
      this.m_sweep.c.SetV(this.m_sweep.c0);
      this.m_linearVelocity.x += this.m_angularVelocity * (-(this.m_sweep.c.y - oldCenter.y));
      this.m_linearVelocity.y += this.m_angularVelocity * (+(this.m_sweep.c.x - oldCenter.x));
   }
   b2Body.prototype.ResetMassData = function () {
      this.m_mass = 0.0;
      this.m_invMass = 0.0;
      this.m_I = 0.0;
      this.m_invI = 0.0;
      this.m_sweep.localCenter.SetZero();
      if (this.m_type == b2Body.b2_staticBody || this.m_type == b2Body.b2_kinematicBody) {
         return;
      }
      var center = new b2Vec2(0, 0);
      for (var f = this.m_fixtureList; f; f = f.m_next) {
         if (f.m_density == 0.0) {
            continue;
         }
         var massData = f.GetMassData();
         this.m_mass += massData.mass;
         center.x += massData.center.x * massData.mass;
         center.y += massData.center.y * massData.mass;
         this.m_I += massData.I;
      }
      if (this.m_mass > 0.0) {
         this.m_invMass = 1.0 / this.m_mass;
         center.x *= this.m_invMass;
         center.y *= this.m_invMass;
      }
      else {
         this.m_mass = 1.0;
         this.m_invMass = 1.0;
      }
      if (this.m_I > 0.0 && (this.m_flags & b2Body.e_fixedRotationFlag) == 0) {
         this.m_I -= this.m_mass * (center.x * center.x + center.y * center.y);
         this.m_I *= this.m_inertiaScale;
         b2Settings.b2Assert(this.m_I > 0);
         this.m_invI = 1.0 / this.m_I;
      }
      else {
         this.m_I = 0.0;
         this.m_invI = 0.0;
      }
      var oldCenter = this.m_sweep.c.Copy();
      this.m_sweep.localCenter.SetV(center);
      this.m_sweep.c0.SetV(b2Math.MulX(this.m_xf, this.m_sweep.localCenter));
      this.m_sweep.c.SetV(this.m_sweep.c0);
      this.m_linearVelocity.x += this.m_angularVelocity * (-(this.m_sweep.c.y - oldCenter.y));
      this.m_linearVelocity.y += this.m_angularVelocity * (+(this.m_sweep.c.x - oldCenter.x));
   }
   b2Body.prototype.GetWorldPoint = function (localPoint) {
      var A = this.m_xf.R;
      var u = new b2Vec2(A.col1.x * localPoint.x + A.col2.x * localPoint.y, A.col1.y * localPoint.x + A.col2.y * localPoint.y);
      u.x += this.m_xf.position.x;
      u.y += this.m_xf.position.y;
      return u;
   }
   b2Body.prototype.GetWorldVector = function (localVector) {
      return b2Math.MulMV(this.m_xf.R, localVector);
   }
   b2Body.prototype.GetLocalPoint = function (worldPoint) {
      return b2Math.MulXT(this.m_xf, worldPoint);
   }
   b2Body.prototype.GetLocalVector = function (worldVector) {
      return b2Math.MulTMV(this.m_xf.R, worldVector);
   }
   b2Body.prototype.GetLinearVelocityFromWorldPoint = function (worldPoint) {
      return new b2Vec2(this.m_linearVelocity.x - this.m_angularVelocity * (worldPoint.y - this.m_sweep.c.y), this.m_linearVelocity.y + this.m_angularVelocity * (worldPoint.x - this.m_sweep.c.x));
   }
   b2Body.prototype.GetLinearVelocityFromLocalPoint = function (localPoint) {
      var A = this.m_xf.R;
      var worldPoint = new b2Vec2(A.col1.x * localPoint.x + A.col2.x * localPoint.y, A.col1.y * localPoint.x + A.col2.y * localPoint.y);
      worldPoint.x += this.m_xf.position.x;
      worldPoint.y += this.m_xf.position.y;
      return new b2Vec2(this.m_linearVelocity.x - this.m_angularVelocity * (worldPoint.y - this.m_sweep.c.y), this.m_linearVelocity.y + this.m_angularVelocity * (worldPoint.x - this.m_sweep.c.x));
   }
   b2Body.prototype.GetLinearDamping = function () {
      return this.m_linearDamping;
   }
   b2Body.prototype.SetLinearDamping = function (linearDamping) {
      if (linearDamping === undefined) linearDamping = 0;
      this.m_linearDamping = linearDamping;
   }
   b2Body.prototype.GetAngularDamping = function () {
      return this.m_angularDamping;
   }
   b2Body.prototype.SetAngularDamping = function (angularDamping) {
      if (angularDamping === undefined) angularDamping = 0;
      this.m_angularDamping = angularDamping;
   }
   b2Body.prototype.SetType = function (type) {
      if (type === undefined) type = 0;
      if (this.m_type == type) {
         return;
      }
      this.m_type = type;
      this.ResetMassData();
      if (this.m_type == b2Body.b2_staticBody) {
         this.m_linearVelocity.SetZero();
         this.m_angularVelocity = 0.0;
      }
      this.SetAwake(true);
      this.m_force.SetZero();
      this.m_torque = 0.0;
      for (var ce = this.m_contactList; ce; ce = ce.next) {
         ce.contact.FlagForFiltering();
      }
   }
   b2Body.prototype.GetType = function () {
      return this.m_type;
   }
   b2Body.prototype.SetBullet = function (flag) {
      if (flag) {
         this.m_flags |= b2Body.e_bulletFlag;
      }
      else {
         this.m_flags &= ~b2Body.e_bulletFlag;
      }
   }
   b2Body.prototype.IsBullet = function () {
      return (this.m_flags & b2Body.e_bulletFlag) == b2Body.e_bulletFlag;
   }
   b2Body.prototype.SetSleepingAllowed = function (flag) {
      this.m_allowSleep = flag;
      if (!flag) {
         this.SetAwake(true);
      }
   }
   b2Body.prototype.SetAwake = function (flag) {
       this.m_awake = flag;
       this.m_sleepTime = 0;
       if (!flag) {
         this.m_linearVelocity.SetZero();
         this.m_angularVelocity = 0.0;
         this.m_force.SetZero();
         this.m_torque = 0.0;
      }
   }
   b2Body.prototype.IsAwake = function () {
      return this.m_awake;
   }
   b2Body.prototype.SetFixedRotation = function (fixed) {
      if (fixed) {
         this.m_flags |= b2Body.e_fixedRotationFlag;
      }
      else {
         this.m_flags &= ~b2Body.e_fixedRotationFlag;
      }
      this.ResetMassData();
   }
   b2Body.prototype.IsFixedRotation = function () {
      return (this.m_flags & b2Body.e_fixedRotationFlag) == b2Body.e_fixedRotationFlag;
   }
   b2Body.prototype.SetActive = function (flag) {
      if (flag == this.IsActive()) {
         return;
      }
      var broadPhase;
      var f;
      if (flag) {
         this.m_flags |= b2Body.e_activeFlag;
         broadPhase = this.m_world.m_contactManager.m_broadPhase;
         for (f = this.m_fixtureList;
         f; f = f.m_next) {
            f.CreateProxy(broadPhase, this.m_xf);
         }
      }
      else {
         this.m_flags &= ~b2Body.e_activeFlag;
         broadPhase = this.m_world.m_contactManager.m_broadPhase;
         for (f = this.m_fixtureList;
         f; f = f.m_next) {
            f.DestroyProxy(broadPhase);
         }
         var ce = this.m_contactList;
         while (ce) {
            var ce0 = ce;
            ce = ce.next;
            this.m_world.m_contactManager.Destroy(ce0.contact);
         }
         this.m_contactList = null;
      }
   }
   b2Body.prototype.IsActive = function () {
      return (this.m_flags & b2Body.e_activeFlag) == b2Body.e_activeFlag;
   }
   b2Body.prototype.IsSleepingAllowed = function () {
      return this.m_allowSleep;
   }
   b2Body.prototype.GetFixtureList = function () {
      return this.m_fixtureList;
   }
   b2Body.prototype.GetJointList = function () {
      return this.m_jointList;
   }
   b2Body.prototype.GetControllerList = function () {
      return this.m_controllerList;
   }
   b2Body.prototype.GetContactList = function () {
      return this.m_contactList;
   }
   b2Body.prototype.GetNext = function () {
      return this.m_next;
   }
   b2Body.prototype.GetUserData = function () {
      return this.m_userData;
   }
   b2Body.prototype.SetUserData = function (data) {
      this.m_userData = data;
   }
   b2Body.prototype.GetWorld = function () {
      return this.m_world;
   }
   b2Body.prototype.b2Body = function (bd, world) {
      this.m_flags = 0;
      if (bd.bullet) {
         this.m_flags |= b2Body.e_bulletFlag;
      }
      if (bd.fixedRotation) {
         this.m_flags |= b2Body.e_fixedRotationFlag;
      }
      this.m_allowSleep = bd.allowSleep;
      this.m_awake = bd.awake;
      if (bd.active) {
         this.m_flags |= b2Body.e_activeFlag;
      }
      this.m_world = world;
      this.m_xf.position.SetV(bd.position);
      this.m_xf.R.Set(bd.angle);
      this.m_sweep.localCenter.SetZero();
      this.m_sweep.t0 = 1.0;
      this.m_sweep.a0 = this.m_sweep.a = bd.angle;
      var tMat = this.m_xf.R;
      var tVec = this.m_sweep.localCenter;
      this.m_sweep.c.x = (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
      this.m_sweep.c.y = (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
      this.m_sweep.c.x += this.m_xf.position.x;
      this.m_sweep.c.y += this.m_xf.position.y;
      this.m_sweep.c0.SetV(this.m_sweep.c);
      this.m_jointList = null;
      this.m_controllerList = null;
      this.m_contactList = null;
      this.m_controllerCount = 0;
      this.m_prev = null;
      this.m_next = null;
      this.m_linearVelocity.SetV(bd.linearVelocity);
      this.m_angularVelocity = bd.angularVelocity;
      this.m_linearDamping = bd.linearDamping;
      this.m_angularDamping = bd.angularDamping;
      this.m_force.SetZero();
      this.m_torque = 0.0;
      this.m_sleepTime = 0.0;
      this.m_type = bd.type;
      if (this.m_type == b2Body.b2_dynamicBody) {
         this.m_mass = 1.0;
         this.m_invMass = 1.0;
      }
      else {
         this.m_mass = 0.0;
         this.m_invMass = 0.0;
      }
      this.m_I = 0.0;
      this.m_invI = 0.0;
      this.m_inertiaScale = bd.inertiaScale;
      this.m_userData = bd.userData;
      this.m_fixtureList = null;
      this.m_fixtureCount = 0;
   }
   b2Body.prototype.SynchronizeFixtures = function () {
      var xf1 = b2Body.s_xf1;
      xf1.R.Set(this.m_sweep.a0);
      var tMat = xf1.R;
      var tVec = this.m_sweep.localCenter;
      xf1.position.x = this.m_sweep.c0.x - (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
      xf1.position.y = this.m_sweep.c0.y - (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
      var f;
      var broadPhase = this.m_world.m_contactManager.m_broadPhase;
      for (f = this.m_fixtureList;
      f; f = f.m_next) {
         f.Synchronize(broadPhase, xf1, this.m_xf);
      }
   }
   b2Body.prototype.SynchronizeTransform = function () {
      this.m_xf.R.Set(this.m_sweep.a);
      var tMat = this.m_xf.R;
      var tVec = this.m_sweep.localCenter;
      this.m_xf.position.x = this.m_sweep.c.x - (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
      this.m_xf.position.y = this.m_sweep.c.y - (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
   }
   b2Body.prototype.ShouldCollide = function (other) {
      if (this.m_type != b2Body.b2_dynamicBody && other.m_type != b2Body.b2_dynamicBody) {
         return false;
      }
      for (var jn = this.m_jointList; jn; jn = jn.next) {
         if (jn.other == other) if (jn.joint.m_collideConnected == false) {
            return false;
         }
      }
      return true;
   }
   b2Body.prototype.Advance = function (t) {
      if (t === undefined) t = 0;
      this.m_sweep.Advance(t);
      this.m_sweep.c.SetV(this.m_sweep.c0);
      this.m_sweep.a = this.m_sweep.a0;
      this.SynchronizeTransform();
   }
   Box2D.postDefs.push(function () {
      Box2D.Dynamics.b2Body.s_xf1 = new b2Transform();
      Box2D.Dynamics.b2Body.e_bulletFlag = 0x0008;
      Box2D.Dynamics.b2Body.e_fixedRotationFlag = 0x0010;
      Box2D.Dynamics.b2Body.e_activeFlag = 0x0020;
      Box2D.Dynamics.b2Body.b2_staticBody = 0;
      Box2D.Dynamics.b2Body.b2_kinematicBody = 1;
      Box2D.Dynamics.b2Body.b2_dynamicBody = 2;
   });
   b2BodyDef.b2BodyDef = function () {
      this.position = new b2Vec2(0, 0);
      this.linearVelocity = new b2Vec2(0, 0);
   };
   b2BodyDef.prototype.b2BodyDef = function () {
      this.userData = null;
      this.position.SetZero();
      this.angle = 0.0;
      this.linearVelocity.SetZero();
      this.angularVelocity = 0.0;
      this.linearDamping = 0.0;
      this.angularDamping = 0.0;
      this.allowSleep = true;
      this.awake = true;
      this.fixedRotation = false;
      this.bullet = false;
      this.type = b2Body.b2_staticBody;
      this.active = true;
      this.inertiaScale = 1.0;
   }
   b2ContactFilter.b2ContactFilter = function () {};
   b2ContactFilter.prototype.ShouldCollide = function (fixtureA, fixtureB) {
      var filter1 = fixtureA.GetFilterData();
      var filter2 = fixtureB.GetFilterData();
      if (filter1.groupIndex == filter2.groupIndex && filter1.groupIndex != 0) {
         return filter1.groupIndex > 0;
      }
      var collide = (filter1.maskBits & filter2.categoryBits) != 0 && (filter1.categoryBits & filter2.maskBits) != 0;
      return collide;
   }
   b2ContactFilter.prototype.RayCollide = function (userData, fixture) {
      if (!userData) return true;
      return this.ShouldCollide(userData, fixture);
   }
   Box2D.postDefs.push(function () {
      Box2D.Dynamics.b2ContactFilter.b2_defaultFilter = new b2ContactFilter();
   });
   b2ContactImpulse.b2ContactImpulse = function () {
      this.normalImpulses = [];
      this.tangentImpulses = [];
   };
   b2ContactListener.b2ContactListener = function () {};
   b2ContactListener.prototype.BeginContact = function (contact) {}
   b2ContactListener.prototype.EndContact = function (contact) {}
   b2ContactListener.prototype.PreSolve = function (contact, oldManifold) {}
   b2ContactListener.prototype.PostSolve = function (contact, impulse) {}
   Box2D.postDefs.push(function () {
      Box2D.Dynamics.b2ContactListener.b2_defaultListener = new b2ContactListener();
   });
   b2DestructionListener.b2DestructionListener = function () {};
   b2DestructionListener.prototype.SayGoodbyeJoint = function (joint) {}
   b2DestructionListener.prototype.SayGoodbyeFixture = function (fixture) {}
   b2FilterData.b2FilterData = function () {
      this.categoryBits = 0x0001;
      this.maskBits = 0xFFFF;
      this.groupIndex = 0;
   };
   b2FilterData.prototype.Copy = function () {
      var copy = new b2FilterData();
      copy.categoryBits = this.categoryBits;
      copy.maskBits = this.maskBits;
      copy.groupIndex = this.groupIndex;
      return copy;
   }
   b2Fixture.b2Fixture = function () {
      this.m_filter = new b2FilterData();
   };
   b2Fixture.prototype.GetType = function () {
      return this.m_shape.GetType();
   }
   b2Fixture.prototype.GetShape = function () {
      return this.m_shape;
   }
   b2Fixture.prototype.SetSensor = function (sensor) {
      if (this.m_isSensor == sensor) return;
      this.m_isSensor = sensor;
      if (this.m_body == null) return;
      var edge = this.m_body.GetContactList();
      while (edge) {
         var contact = edge.contact;
         var fixtureA = contact.GetFixtureA();
         var fixtureB = contact.GetFixtureB();
         if (fixtureA == this || fixtureB == this) contact.SetSensor(fixtureA.IsSensor() || fixtureB.IsSensor());
         edge = edge.next;
      }
   }
   b2Fixture.prototype.IsSensor = function () {
      return this.m_isSensor;
   }
   b2Fixture.prototype.SetFilterData = function (filter) {
      this.m_filter = filter.Copy();
      if (this.m_body) return;
      var edge = this.m_body.GetContactList();
      while (edge) {
         var contact = edge.contact;
         var fixtureA = contact.GetFixtureA();
         var fixtureB = contact.GetFixtureB();
         if (fixtureA == this || fixtureB == this) contact.FlagForFiltering();
         edge = edge.next;
      }
   }
   b2Fixture.prototype.GetFilterData = function () {
      return this.m_filter.Copy();
   }
   b2Fixture.prototype.GetBody = function () {
      return this.m_body;
   }
   b2Fixture.prototype.GetNext = function () {
      return this.m_next;
   }
   b2Fixture.prototype.GetUserData = function () {
      return this.m_userData;
   }
   b2Fixture.prototype.SetUserData = function (data) {
      this.m_userData = data;
   }
   b2Fixture.prototype.TestPoint = function (p) {
      return this.m_shape.TestPoint(this.m_body.GetTransform(), p);
   }
   b2Fixture.prototype.RayCast = function (output, input) {
      return this.m_shape.RayCast(output, input, this.m_body.GetTransform());
   }
   b2Fixture.prototype.GetMassData = function (massData) {
      if (massData === undefined) massData = null;
      if (massData == null) {
         massData = new b2MassData();
      }
      this.m_shape.ComputeMass(massData, this.m_density);
      return massData;
   }
   b2Fixture.prototype.SetDensity = function (density) {
      if (density === undefined) density = 0;
      this.m_density = density;
   }
   b2Fixture.prototype.GetDensity = function () {
      return this.m_density;
   }
   b2Fixture.prototype.GetFriction = function () {
      return this.m_friction;
   }
   b2Fixture.prototype.SetFriction = function (friction) {
      if (friction === undefined) friction = 0;
      this.m_friction = friction;
   }
   b2Fixture.prototype.GetRestitution = function () {
      return this.m_restitution;
   }
   b2Fixture.prototype.SetRestitution = function (restitution) {
      if (restitution === undefined) restitution = 0;
      this.m_restitution = restitution;
   }
   b2Fixture.prototype.GetAABB = function () {
      return this.m_aabb;
   }
   b2Fixture.prototype.b2Fixture = function () {
      this.m_aabb = new b2AABB();
      this.m_userData = null;
      this.m_body = null;
      this.m_next = null;
      this.m_shape = null;
      this.m_density = 0.0;
      this.m_friction = 0.0;
      this.m_restitution = 0.0;
   }
   b2Fixture.prototype.Create = function (body, xf, def) {
      this.m_userData = def.userData;
      this.m_friction = def.friction;
      this.m_restitution = def.restitution;
      this.m_body = body;
      this.m_next = null;
      this.m_filter = def.filter.Copy();
      this.m_isSensor = def.isSensor;
      this.m_shape = def.shape.Copy();
      this.m_density = def.density;
   }
   b2Fixture.prototype.Destroy = function () {
      this.m_shape = null;
   }
   b2Fixture.prototype.CreateProxy = function (broadPhase, xf) {
      this.m_shape.ComputeAABB(this.m_aabb, xf);
      this.m_proxy = broadPhase.CreateProxy(this.m_aabb, this);
   }
   b2Fixture.prototype.DestroyProxy = function (broadPhase) {
      if (this.m_proxy == null) {
         return;
      }
      broadPhase.DestroyProxy(this.m_proxy);
      this.m_proxy = null;
   }
   b2Fixture.prototype.Synchronize = function (broadPhase, transform1, transform2) {
      if (!this.m_proxy) return;
      var aabb1 = new b2AABB();
      var aabb2 = new b2AABB();
      this.m_shape.ComputeAABB(aabb1, transform1);
      this.m_shape.ComputeAABB(aabb2, transform2);
      this.m_aabb.Combine(aabb1, aabb2);
      var displacement = b2Math.SubtractVV(transform2.position, transform1.position);
      broadPhase.MoveProxy(this.m_proxy, this.m_aabb, displacement);
   }
   b2FixtureDef.b2FixtureDef = function () {
      this.filter = new b2FilterData();
   };
   b2FixtureDef.prototype.b2FixtureDef = function () {
      this.shape = null;
      this.userData = null;
      this.friction = 0.2;
      this.restitution = 0.0;
      this.density = 0.0;
      this.filter.categoryBits = 0x0001;
      this.filter.maskBits = 0xFFFF;
      this.filter.groupIndex = 0;
      this.isSensor = false;
   }
   b2Island.b2Island = function () {};
   b2Island.prototype.b2Island = function () {
      this.m_bodies = [];
      this.m_contacts = [];
      this.m_joints = [];
   }
   b2Island.prototype.Initialize = function (bodyCapacity, contactCapacity, jointCapacity, listener, contactSolver) {
      if (bodyCapacity === undefined) bodyCapacity = 0;
      if (contactCapacity === undefined) contactCapacity = 0;
      if (jointCapacity === undefined) jointCapacity = 0;
      var i = 0;
      this.m_bodyCapacity = bodyCapacity;
      this.m_contactCapacity = contactCapacity;
      this.m_jointCapacity = jointCapacity;
      this.m_bodyCount = 0;
      this.m_contactCount = 0;
      this.m_jointCount = 0;
      this.m_listener = listener;
      this.m_contactSolver = contactSolver;
      for (i = this.m_bodies.length;
      i < bodyCapacity; i++)
      this.m_bodies[i] = null;
      for (i = this.m_contacts.length;
      i < contactCapacity; i++)
      this.m_contacts[i] = null;
      for (i = this.m_joints.length;
      i < jointCapacity; i++)
      this.m_joints[i] = null;
   }
   b2Island.prototype.Clear = function () {
      this.m_bodyCount = 0;
      this.m_contactCount = 0;
      this.m_jointCount = 0;
   }
   b2Island.prototype.Solve = function (step, gravity, allowSleep) {
      var i = 0;
      var j = 0;
      var b;
      var joint;
      for (i = 0;
      i < this.m_bodyCount; ++i) {
         b = this.m_bodies[i];
         if (b.GetType() != b2Body.b2_dynamicBody) continue;
         b.m_linearVelocity.x += step.dt * (gravity.x + b.m_invMass * b.m_force.x);
         b.m_linearVelocity.y += step.dt * (gravity.y + b.m_invMass * b.m_force.y);
         b.m_angularVelocity += step.dt * b.m_invI * b.m_torque;
         b.m_linearVelocity.Multiply(b2Math.Clamp(1.0 - step.dt * b.m_linearDamping, 0.0, 1.0));
         b.m_angularVelocity *= b2Math.Clamp(1.0 - step.dt * b.m_angularDamping, 0.0, 1.0);
      }
      this.m_contactSolver.Initialize(step, this.m_contacts, this.m_contactCount);
      var contactSolver = this.m_contactSolver;
      contactSolver.InitVelocityConstraints(step);
      for (i = 0;
      i < this.m_jointCount; ++i) {
         joint = this.m_joints[i];
         joint.InitVelocityConstraints(step);
      }
      for (i = 0;
      i < step.velocityIterations; ++i) {
         for (j = 0;
         j < this.m_jointCount; ++j) {
            joint = this.m_joints[j];
            joint.SolveVelocityConstraints(step);
         }
         contactSolver.SolveVelocityConstraints();
      }
      for (i = 0;
      i < this.m_jointCount; ++i) {
         joint = this.m_joints[i];
         joint.FinalizeVelocityConstraints();
      }
      contactSolver.FinalizeVelocityConstraints();
      for (i = 0;
      i < this.m_bodyCount; ++i) {
         b = this.m_bodies[i];
         if (b.GetType() == b2Body.b2_staticBody) continue;
         var translationX = step.dt * b.m_linearVelocity.x;
         var translationY = step.dt * b.m_linearVelocity.y;
         if ((translationX * translationX + translationY * translationY) > b2Settings.b2_maxTranslationSquared) {
            b.m_linearVelocity.Normalize();
            b.m_linearVelocity.x *= b2Settings.b2_maxTranslation * step.inv_dt;
            b.m_linearVelocity.y *= b2Settings.b2_maxTranslation * step.inv_dt;
         }
         var rotation = step.dt * b.m_angularVelocity;
         if (rotation * rotation > b2Settings.b2_maxRotationSquared) {
            if (b.m_angularVelocity < 0.0) {
               b.m_angularVelocity = (-b2Settings.b2_maxRotation * step.inv_dt);
            }
            else {
               b.m_angularVelocity = b2Settings.b2_maxRotation * step.inv_dt;
            }
         }
         b.m_sweep.c0.SetV(b.m_sweep.c);
         b.m_sweep.a0 = b.m_sweep.a;
         b.m_sweep.c.x += step.dt * b.m_linearVelocity.x;
         b.m_sweep.c.y += step.dt * b.m_linearVelocity.y;
         b.m_sweep.a += step.dt * b.m_angularVelocity;
         b.SynchronizeTransform();
      }
      for (i = 0;
      i < step.positionIterations; ++i) {
         var contactsOkay = contactSolver.SolvePositionConstraints(b2Settings.b2_contactBaumgarte);
         var jointsOkay = true;
         for (j = 0;
         j < this.m_jointCount; ++j) {
            joint = this.m_joints[j];
            var jointOkay = joint.SolvePositionConstraints(b2Settings.b2_contactBaumgarte);
            jointsOkay = jointsOkay && jointOkay;
         }
         if (contactsOkay && jointsOkay) {
            break;
         }
      }
      this.Report(contactSolver.m_constraints);
      if (allowSleep) {
         var minSleepTime = Number.MAX_VALUE;
         var linTolSqr = b2Settings.b2_linearSleepTolerance * b2Settings.b2_linearSleepTolerance;
         var angTolSqr = b2Settings.b2_angularSleepTolerance * b2Settings.b2_angularSleepTolerance;
         for (i = 0;
         i < this.m_bodyCount; ++i) {
            b = this.m_bodies[i];
            if (b.GetType() == b2Body.b2_staticBody) {
               continue;
            }
            if (!b.m_allowSleep || b.m_angularVelocity * b.m_angularVelocity > angTolSqr || b2Math.Dot(b.m_linearVelocity, b.m_linearVelocity) > linTolSqr) {
               b.m_sleepTime = 0.0;
               minSleepTime = 0.0;
            } else {
               b.m_sleepTime += step.dt;
               minSleepTime = b2Math.Min(minSleepTime, b.m_sleepTime);
            }
         }
         if (minSleepTime >= b2Settings.b2_timeToSleep) {
            for (i = 0;
            i < this.m_bodyCount; ++i) {
               b = this.m_bodies[i];
               b.SetAwake(false);
            }
         }
      }
   }
   
   b2Island.prototype.SolveTOI = function (subStep) {
      var i = 0;
      var j = 0;
      this.m_contactSolver.Initialize(subStep, this.m_contacts, this.m_contactCount);
      var contactSolver = this.m_contactSolver;
      for (i = 0;
      i < this.m_jointCount; ++i) {
         this.m_joints[i].InitVelocityConstraints(subStep);
      }
      for (i = 0;
      i < subStep.velocityIterations; ++i) {
         contactSolver.SolveVelocityConstraints();
         for (j = 0;
         j < this.m_jointCount; ++j) {
            this.m_joints[j].SolveVelocityConstraints(subStep);
         }
      }
      for (i = 0;
      i < this.m_bodyCount; ++i) {
         var b = this.m_bodies[i];
         if (b.GetType() == b2Body.b2_staticBody) continue;
         var translationX = subStep.dt * b.m_linearVelocity.x;
         var translationY = subStep.dt * b.m_linearVelocity.y;
         if ((translationX * translationX + translationY * translationY) > b2Settings.b2_maxTranslationSquared) {
            b.m_linearVelocity.Normalize();
            b.m_linearVelocity.x *= b2Settings.b2_maxTranslation * subStep.inv_dt;
            b.m_linearVelocity.y *= b2Settings.b2_maxTranslation * subStep.inv_dt;
         }
         var rotation = subStep.dt * b.m_angularVelocity;
         if (rotation * rotation > b2Settings.b2_maxRotationSquared) {
            if (b.m_angularVelocity < 0.0) {
               b.m_angularVelocity = (-b2Settings.b2_maxRotation * subStep.inv_dt);
            }
            else {
               b.m_angularVelocity = b2Settings.b2_maxRotation * subStep.inv_dt;
            }
         }
         b.m_sweep.c0.SetV(b.m_sweep.c);
         b.m_sweep.a0 = b.m_sweep.a;
         b.m_sweep.c.x += subStep.dt * b.m_linearVelocity.x;
         b.m_sweep.c.y += subStep.dt * b.m_linearVelocity.y;
         b.m_sweep.a += subStep.dt * b.m_angularVelocity;
         b.SynchronizeTransform();
      }
      var k_toiBaumgarte = 0.75;
      for (i = 0;
      i < subStep.positionIterations; ++i) {
         var contactsOkay = contactSolver.SolvePositionConstraints(k_toiBaumgarte);
         var jointsOkay = true;
         for (j = 0;
         j < this.m_jointCount; ++j) {
            var jointOkay = this.m_joints[j].SolvePositionConstraints(b2Settings.b2_contactBaumgarte);
            jointsOkay = jointsOkay && jointOkay;
         }
         if (contactsOkay && jointsOkay) {
            break;
         }
      }
      this.Report(contactSolver.m_constraints);
   }
   b2Island.prototype.Report = function (constraints) {
      if (this.m_listener == null) {
         return;
      }
      for (var i = 0; i < this.m_contactCount; ++i) {
         var c = this.m_contacts[i];
         var cc = constraints[i];
         for (var j = 0; j < cc.pointCount; ++j) {
            b2Island.s_impulse.normalImpulses[j] = cc.points[j].normalImpulse;
            b2Island.s_impulse.tangentImpulses[j] = cc.points[j].tangentImpulse;
         }
         this.m_listener.PostSolve(c, b2Island.s_impulse);
      }
   }
   b2Island.prototype.AddBody = function (body) {
      body.m_islandIndex = this.m_bodyCount;
      this.m_bodies[this.m_bodyCount++] = body;
   }
   b2Island.prototype.AddContact = function (contact) {
      this.m_contacts[this.m_contactCount++] = contact;
   }
   b2Island.prototype.AddJoint = function (joint) {
      this.m_joints[this.m_jointCount++] = joint;
   }
   Box2D.postDefs.push(function () {
      Box2D.Dynamics.b2Island.s_impulse = new b2ContactImpulse();
   });
   b2TimeStep.b2TimeStep = function () {};
   b2TimeStep.prototype.Set = function (step) {
      this.dt = step.dt;
      this.inv_dt = step.inv_dt;
      this.positionIterations = step.positionIterations;
      this.velocityIterations = step.velocityIterations;
      this.warmStarting = step.warmStarting;
   }
})();
(function () {
   var b2Body = Box2D.Dynamics.b2Body,
      b2BodyDef = Box2D.Dynamics.b2BodyDef,
      b2ContactFilter = Box2D.Dynamics.b2ContactFilter,
      b2ContactImpulse = Box2D.Dynamics.b2ContactImpulse,
      b2ContactListener = Box2D.Dynamics.b2ContactListener,
      b2ContactManager = Box2D.Dynamics.b2ContactManager,
      b2DebugDraw = Box2D.Dynamics.b2DebugDraw,
      b2DestructionListener = Box2D.Dynamics.b2DestructionListener,
      b2FilterData = Box2D.Dynamics.b2FilterData,
      b2Fixture = Box2D.Dynamics.b2Fixture,
      b2FixtureDef = Box2D.Dynamics.b2FixtureDef,
      b2Island = Box2D.Dynamics.b2Island,
      b2TimeStep = Box2D.Dynamics.b2TimeStep,
      b2World = Box2D.Dynamics.b2World,
      b2Mat22 = Box2D.Common.Math.b2Mat22,
      b2Mat33 = Box2D.Common.Math.b2Mat33,
      b2Math = Box2D.Common.Math.b2Math,
      b2Sweep = Box2D.Common.Math.b2Sweep,
      b2Transform = Box2D.Common.Math.b2Transform,
      b2Vec2 = Box2D.Common.Math.b2Vec2,
      b2Vec3 = Box2D.Common.Math.b2Vec3,
      b2Color = Box2D.Common.b2Color,
      b2Settings = Box2D.Common.b2Settings,
      b2CircleShape = Box2D.Collision.Shapes.b2CircleShape,
      b2EdgeChainDef = Box2D.Collision.Shapes.b2EdgeChainDef,
      b2EdgeShape = Box2D.Collision.Shapes.b2EdgeShape,
      b2MassData = Box2D.Collision.Shapes.b2MassData,
      b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape,
      b2Shape = Box2D.Collision.Shapes.b2Shape,
      b2BuoyancyController = Box2D.Dynamics.Controllers.b2BuoyancyController,
      b2ConstantAccelController = Box2D.Dynamics.Controllers.b2ConstantAccelController,
      b2ConstantForceController = Box2D.Dynamics.Controllers.b2ConstantForceController,
      b2Controller = Box2D.Dynamics.Controllers.b2Controller,
      b2ControllerEdge = Box2D.Dynamics.Controllers.b2ControllerEdge,
      b2GravityController = Box2D.Dynamics.Controllers.b2GravityController,
      b2TensorDampingController = Box2D.Dynamics.Controllers.b2TensorDampingController;

   Box2D.inherit(b2BuoyancyController, Box2D.Dynamics.Controllers.b2Controller);
   b2BuoyancyController.prototype.__super = Box2D.Dynamics.Controllers.b2Controller.prototype;
   b2BuoyancyController.b2BuoyancyController = function () {
      Box2D.Dynamics.Controllers.b2Controller.b2Controller.apply(this, arguments);
      this.normal = new b2Vec2(0, (-1));
      this.offset = 0;
      this.density = 0;
      this.velocity = new b2Vec2(0, 0);
      this.linearDrag = 2;
      this.angularDrag = 1;
      this.useDensity = false;
      this.useWorldGravity = true;
      this.gravity = null;
   };
   b2BuoyancyController.prototype.Step = function (step) {
      if (!this.m_bodyList) return;
      if (this.useWorldGravity) {
         this.gravity = this.GetWorld().GetGravity().Copy();
      }
      for (var i = this.m_bodyList; i; i = i.nextBody) {
         var body = i.body;
         if (body.IsAwake() == false) {
            continue;
         }
         var areac = new b2Vec2(0, 0);
         var massc = new b2Vec2(0, 0);
         var area = 0.0;
         var mass = 0.0;
         for (var fixture = body.GetFixtureList(); fixture; fixture = fixture.GetNext()) {
            var sc = new b2Vec2(0, 0);
            var sarea = fixture.GetShape().ComputeSubmergedArea(this.normal, this.offset, body.GetTransform(), sc);
            area += sarea;
            areac.x += sarea * sc.x;
            areac.y += sarea * sc.y;
            var shapeDensity = 0;
            if (this.useDensity) {
               shapeDensity = 1;
            }
            else {
               shapeDensity = 1;
            }
            mass += sarea * shapeDensity;
            massc.x += sarea * sc.x * shapeDensity;
            massc.y += sarea * sc.y * shapeDensity;
         }
         areac.x /= area;
         areac.y /= area;
         massc.x /= mass;
         massc.y /= mass;
         if (area < Number.MIN_VALUE) continue;
         var buoyancyForce = this.gravity.GetNegative();
         buoyancyForce.Multiply(this.density * area);
         body.ApplyForce(buoyancyForce, massc);
         var dragForce = body.GetLinearVelocityFromWorldPoint(areac);
         dragForce.Subtract(this.velocity);
         dragForce.Multiply((-this.linearDrag * area));
         body.ApplyForce(dragForce, areac);
         body.ApplyTorque((-body.GetInertia() / body.GetMass() * area * body.GetAngularVelocity() * this.angularDrag));
      }
   }
   b2BuoyancyController.prototype.Draw = function (debugDraw) {
      var r = 1000;
      var p1 = new b2Vec2(0, 0);
      var p2 = new b2Vec2(0, 0);
      p1.x = this.normal.x * this.offset + this.normal.y * r;
      p1.y = this.normal.y * this.offset - this.normal.x * r;
      p2.x = this.normal.x * this.offset - this.normal.y * r;
      p2.y = this.normal.y * this.offset + this.normal.x * r;
      var color = new b2Color(0, 0, 1);
      debugDraw.DrawSegment(p1, p2, color);
   }
   Box2D.inherit(b2ConstantAccelController, Box2D.Dynamics.Controllers.b2Controller);
   b2ConstantAccelController.prototype.__super = Box2D.Dynamics.Controllers.b2Controller.prototype;
   b2ConstantAccelController.b2ConstantAccelController = function () {
      Box2D.Dynamics.Controllers.b2Controller.b2Controller.apply(this, arguments);
      this.A = new b2Vec2(0, 0);
   };
   b2ConstantAccelController.prototype.Step = function (step) {
      var smallA = new b2Vec2(this.A.x * step.dt, this.A.y * step.dt);
      for (var i = this.m_bodyList; i; i = i.nextBody) {
         var body = i.body;
         if (!body.IsAwake()) continue;
         body.SetLinearVelocity(new b2Vec2(body.GetLinearVelocity().x + smallA.x, body.GetLinearVelocity().y + smallA.y));
      }
   }
   Box2D.inherit(b2ConstantForceController, Box2D.Dynamics.Controllers.b2Controller);
   b2ConstantForceController.prototype.__super = Box2D.Dynamics.Controllers.b2Controller.prototype;
   b2ConstantForceController.b2ConstantForceController = function () {
      Box2D.Dynamics.Controllers.b2Controller.b2Controller.apply(this, arguments);
      this.F = new b2Vec2(0, 0);
   };
   b2ConstantForceController.prototype.Step = function (step) {
      for (var i = this.m_bodyList; i; i = i.nextBody) {
         var body = i.body;
         if (!body.IsAwake()) continue;
         body.ApplyForce(this.F, body.GetWorldCenter());
      }
   }
   b2Controller.b2Controller = function () {};
   b2Controller.prototype.Step = function (step) {}
   b2Controller.prototype.Draw = function (debugDraw) {}
   b2Controller.prototype.AddBody = function (body) {
      var edge = new b2ControllerEdge();
      edge.controller = this;
      edge.body = body;
      edge.nextBody = this.m_bodyList;
      edge.prevBody = null;
      this.m_bodyList = edge;
      if (edge.nextBody) edge.nextBody.prevBody = edge;
      this.m_bodyCount++;
      edge.nextController = body.m_controllerList;
      edge.prevController = null;
      body.m_controllerList = edge;
      if (edge.nextController) edge.nextController.prevController = edge;
      body.m_controllerCount++;
   }
   b2Controller.prototype.RemoveBody = function (body) {
      var edge = body.m_controllerList;
      while (edge && edge.controller != this)
      edge = edge.nextController;
      if (edge.prevBody) edge.prevBody.nextBody = edge.nextBody;
      if (edge.nextBody) edge.nextBody.prevBody = edge.prevBody;
      if (edge.nextController) edge.nextController.prevController = edge.prevController;
      if (edge.prevController) edge.prevController.nextController = edge.nextController;
      if (this.m_bodyList == edge) this.m_bodyList = edge.nextBody;
      if (body.m_controllerList == edge) body.m_controllerList = edge.nextController;
      body.m_controllerCount--;
      this.m_bodyCount--;
   }
   b2Controller.prototype.Clear = function () {
      while (this.m_bodyList)
      this.RemoveBody(this.m_bodyList.body);
   }
   b2Controller.prototype.GetNext = function () {
      return this.m_next;
   }
   b2Controller.prototype.GetWorld = function () {
      return this.m_world;
   }
   b2Controller.prototype.GetBodyList = function () {
      return this.m_bodyList;
   }
   b2ControllerEdge.b2ControllerEdge = function () {};
   Box2D.inherit(b2GravityController, Box2D.Dynamics.Controllers.b2Controller);
   b2GravityController.prototype.__super = Box2D.Dynamics.Controllers.b2Controller.prototype;
   b2GravityController.b2GravityController = function () {
      Box2D.Dynamics.Controllers.b2Controller.b2Controller.apply(this, arguments);
      this.G = 1;
      this.invSqr = true;
   };
   b2GravityController.prototype.Step = function (step) {
      var i = null;
      var body1 = null;
      var p1 = null;
      var mass1 = 0;
      var j = null;
      var body2 = null;
      var p2 = null;
      var dx = 0;
      var dy = 0;
      var r2 = 0;
      var f = null;
      if (this.invSqr) {
         for (i = this.m_bodyList;
         i; i = i.nextBody) {
            body1 = i.body;
            p1 = body1.GetWorldCenter();
            mass1 = body1.GetMass();
            for (j = this.m_bodyList;
            j != i; j = j.nextBody) {
               body2 = j.body;
               p2 = body2.GetWorldCenter();
               dx = p2.x - p1.x;
               dy = p2.y - p1.y;
               r2 = dx * dx + dy * dy;
               if (r2 < Number.MIN_VALUE) continue;
               f = new b2Vec2(dx, dy);
               f.Multiply(this.G / r2 / Math.sqrt(r2) * mass1 * body2.GetMass());
               if (body1.IsAwake()) body1.ApplyForce(f, p1);
               f.Multiply((-1));
               if (body2.IsAwake()) body2.ApplyForce(f, p2);
            }
         }
      }
      else {
         for (i = this.m_bodyList;
         i; i = i.nextBody) {
            body1 = i.body;
            p1 = body1.GetWorldCenter();
            mass1 = body1.GetMass();
            for (j = this.m_bodyList;
            j != i; j = j.nextBody) {
               body2 = j.body;
               p2 = body2.GetWorldCenter();
               dx = p2.x - p1.x;
               dy = p2.y - p1.y;
               r2 = dx * dx + dy * dy;
               if (r2 < Number.MIN_VALUE) continue;
               f = new b2Vec2(dx, dy);
               f.Multiply(this.G / r2 * mass1 * body2.GetMass());
               if (body1.IsAwake()) body1.ApplyForce(f, p1);
               f.Multiply((-1));
               if (body2.IsAwake()) body2.ApplyForce(f, p2);
            }
         }
      }
   }
   Box2D.inherit(b2TensorDampingController, Box2D.Dynamics.Controllers.b2Controller);
   b2TensorDampingController.prototype.__super = Box2D.Dynamics.Controllers.b2Controller.prototype;
   b2TensorDampingController.b2TensorDampingController = function () {
      Box2D.Dynamics.Controllers.b2Controller.b2Controller.apply(this, arguments);
      this.T = new b2Mat22();
      this.maxTimestep = 0;
   };
   b2TensorDampingController.prototype.SetAxisAligned = function (xDamping, yDamping) {
      if (xDamping === undefined) xDamping = 0;
      if (yDamping === undefined) yDamping = 0;
      this.T.col1.x = (-xDamping);
      this.T.col1.y = 0;
      this.T.col2.x = 0;
      this.T.col2.y = (-yDamping);
      if (xDamping > 0 || yDamping > 0) {
         this.maxTimestep = 1 / Math.max(xDamping, yDamping);
      }
      else {
         this.maxTimestep = 0;
      }
   }
   b2TensorDampingController.prototype.Step = function (step) {
      var timestep = step.dt;
      if (timestep <= Number.MIN_VALUE) return;
      if (timestep > this.maxTimestep && this.maxTimestep > 0) timestep = this.maxTimestep;
      for (var i = this.m_bodyList; i; i = i.nextBody) {
         var body = i.body;
         if (!body.IsAwake()) {
            continue;
         }
         var damping = body.GetWorldVector(b2Math.MulMV(this.T, body.GetLocalVector(body.GetLinearVelocity())));
         body.SetLinearVelocity(new b2Vec2(body.GetLinearVelocity().x + damping.x * timestep, body.GetLinearVelocity().y + damping.y * timestep));
      }
   }
})();
(function () {
   var b2Color = Box2D.Common.b2Color,
      b2Settings = Box2D.Common.b2Settings,
      b2Mat22 = Box2D.Common.Math.b2Mat22,
      b2Mat33 = Box2D.Common.Math.b2Mat33,
      b2Math = Box2D.Common.Math.b2Math,
      b2Sweep = Box2D.Common.Math.b2Sweep,
      b2Transform = Box2D.Common.Math.b2Transform,
      b2Vec2 = Box2D.Common.Math.b2Vec2,
      b2Vec3 = Box2D.Common.Math.b2Vec3,
      b2DistanceJoint = Box2D.Dynamics.Joints.b2DistanceJoint,
      b2DistanceJointDef = Box2D.Dynamics.Joints.b2DistanceJointDef,
      b2FrictionJoint = Box2D.Dynamics.Joints.b2FrictionJoint,
      b2FrictionJointDef = Box2D.Dynamics.Joints.b2FrictionJointDef,
      b2GearJoint = Box2D.Dynamics.Joints.b2GearJoint,
      b2GearJointDef = Box2D.Dynamics.Joints.b2GearJointDef,
      b2Jacobian = Box2D.Dynamics.Joints.b2Jacobian,
      b2Joint = Box2D.Dynamics.Joints.b2Joint,
      b2JointDef = Box2D.Dynamics.Joints.b2JointDef,
      b2JointEdge = Box2D.Dynamics.Joints.b2JointEdge,
      b2LineJoint = Box2D.Dynamics.Joints.b2LineJoint,
      b2LineJointDef = Box2D.Dynamics.Joints.b2LineJointDef,
      b2MouseJoint = Box2D.Dynamics.Joints.b2MouseJoint,
      b2MouseJointDef = Box2D.Dynamics.Joints.b2MouseJointDef,
      b2PrismaticJoint = Box2D.Dynamics.Joints.b2PrismaticJoint,
      b2PrismaticJointDef = Box2D.Dynamics.Joints.b2PrismaticJointDef,
      b2PulleyJoint = Box2D.Dynamics.Joints.b2PulleyJoint,
      b2PulleyJointDef = Box2D.Dynamics.Joints.b2PulleyJointDef,
      b2RevoluteJoint = Box2D.Dynamics.Joints.b2RevoluteJoint,
      b2RevoluteJointDef = Box2D.Dynamics.Joints.b2RevoluteJointDef,
      b2WeldJoint = Box2D.Dynamics.Joints.b2WeldJoint,
      b2WeldJointDef = Box2D.Dynamics.Joints.b2WeldJointDef,
      b2Body = Box2D.Dynamics.b2Body,
      b2BodyDef = Box2D.Dynamics.b2BodyDef,
      b2ContactFilter = Box2D.Dynamics.b2ContactFilter,
      b2ContactImpulse = Box2D.Dynamics.b2ContactImpulse,
      b2ContactListener = Box2D.Dynamics.b2ContactListener,
      b2ContactManager = Box2D.Dynamics.b2ContactManager,
      b2DebugDraw = Box2D.Dynamics.b2DebugDraw,
      b2DestructionListener = Box2D.Dynamics.b2DestructionListener,
      b2FilterData = Box2D.Dynamics.b2FilterData,
      b2Fixture = Box2D.Dynamics.b2Fixture,
      b2FixtureDef = Box2D.Dynamics.b2FixtureDef,
      b2Island = Box2D.Dynamics.b2Island,
      b2TimeStep = Box2D.Dynamics.b2TimeStep,
      b2World = Box2D.Dynamics.b2World;

   Box2D.inherit(b2DistanceJoint, Box2D.Dynamics.Joints.b2Joint);
   b2DistanceJoint.prototype.__super = Box2D.Dynamics.Joints.b2Joint.prototype;
   b2DistanceJoint.b2DistanceJoint = function () {
      Box2D.Dynamics.Joints.b2Joint.b2Joint.apply(this, arguments);
      this.m_localAnchor1 = new b2Vec2(0, 0);
      this.m_localAnchor2 = new b2Vec2(0, 0);
      this.m_u = new b2Vec2(0, 0);
   };
   b2DistanceJoint.prototype.GetAnchorA = function () {
      return this.m_bodyA.GetWorldPoint(this.m_localAnchor1);
   }
   b2DistanceJoint.prototype.GetAnchorB = function () {
      return this.m_bodyB.GetWorldPoint(this.m_localAnchor2);
   }
   b2DistanceJoint.prototype.GetReactionForce = function (inv_dt) {
      if (inv_dt === undefined) inv_dt = 0;
      return new b2Vec2(inv_dt * this.m_impulse * this.m_u.x, inv_dt * this.m_impulse * this.m_u.y);
   }
   b2DistanceJoint.prototype.GetReactionTorque = function (inv_dt) {
      if (inv_dt === undefined) inv_dt = 0;
      return 0.0;
   }
   b2DistanceJoint.prototype.GetLength = function () {
      return this.m_length;
   }
   b2DistanceJoint.prototype.SetLength = function (length) {
      if (length === undefined) length = 0;
      this.m_length = length;
   }
   b2DistanceJoint.prototype.GetFrequency = function () {
      return this.m_frequencyHz;
   }
   b2DistanceJoint.prototype.SetFrequency = function (hz) {
      if (hz === undefined) hz = 0;
      this.m_frequencyHz = hz;
   }
   b2DistanceJoint.prototype.GetDampingRatio = function () {
      return this.m_dampingRatio;
   }
   b2DistanceJoint.prototype.SetDampingRatio = function (ratio) {
      if (ratio === undefined) ratio = 0;
      this.m_dampingRatio = ratio;
   }
   b2DistanceJoint.prototype.b2DistanceJoint = function (def) {
      this.__super.b2Joint.call(this, def);
      var tMat;
      var tX = 0;
      var tY = 0;
      this.m_localAnchor1.SetV(def.localAnchorA);
      this.m_localAnchor2.SetV(def.localAnchorB);
      this.m_length = def.length;
      this.m_frequencyHz = def.frequencyHz;
      this.m_dampingRatio = def.dampingRatio;
      this.m_impulse = 0.0;
      this.m_gamma = 0.0;
      this.m_bias = 0.0;
   }
   b2DistanceJoint.prototype.InitVelocityConstraints = function (step) {
      var tMat;
      var tX = 0;
      var bA = this.m_bodyA;
      var bB = this.m_bodyB;
      tMat = bA.m_xf.R;
      var r1X = this.m_localAnchor1.x - bA.m_sweep.localCenter.x;
      var r1Y = this.m_localAnchor1.y - bA.m_sweep.localCenter.y;
      tX = (tMat.col1.x * r1X + tMat.col2.x * r1Y);
      r1Y = (tMat.col1.y * r1X + tMat.col2.y * r1Y);
      r1X = tX;
      tMat = bB.m_xf.R;
      var r2X = this.m_localAnchor2.x - bB.m_sweep.localCenter.x;
      var r2Y = this.m_localAnchor2.y - bB.m_sweep.localCenter.y;
      tX = (tMat.col1.x * r2X + tMat.col2.x * r2Y);
      r2Y = (tMat.col1.y * r2X + tMat.col2.y * r2Y);
      r2X = tX;
      this.m_u.x = bB.m_sweep.c.x + r2X - bA.m_sweep.c.x - r1X;
      this.m_u.y = bB.m_sweep.c.y + r2Y - bA.m_sweep.c.y - r1Y;
      var length = Math.sqrt(this.m_u.x * this.m_u.x + this.m_u.y * this.m_u.y);
      if (length > b2Settings.b2_linearSlop) {
         this.m_u.Multiply(1.0 / length);
      }
      else {
         this.m_u.SetZero();
      }
      var cr1u = (r1X * this.m_u.y - r1Y * this.m_u.x);
      var cr2u = (r2X * this.m_u.y - r2Y * this.m_u.x);
      var invMass = bA.m_invMass + bA.m_invI * cr1u * cr1u + bB.m_invMass + bB.m_invI * cr2u * cr2u;
      this.m_mass = invMass != 0.0 ? 1.0 / invMass : 0.0;
      if (this.m_frequencyHz > 0.0) {
         var C = length - this.m_length;
         var omega = 2.0 * Math.PI * this.m_frequencyHz;
         var d = 2.0 * this.m_mass * this.m_dampingRatio * omega;
         var k = this.m_mass * omega * omega;
         this.m_gamma = step.dt * (d + step.dt * k);
         this.m_gamma = this.m_gamma != 0.0 ? 1 / this.m_gamma : 0.0;
         this.m_bias = C * step.dt * k * this.m_gamma;
         this.m_mass = invMass + this.m_gamma;
         this.m_mass = this.m_mass != 0.0 ? 1.0 / this.m_mass : 0.0;
      }
      if (step.warmStarting) {
         this.m_impulse *= step.dtRatio;
         var PX = this.m_impulse * this.m_u.x;
         var PY = this.m_impulse * this.m_u.y;
         bA.m_linearVelocity.x -= bA.m_invMass * PX;
         bA.m_linearVelocity.y -= bA.m_invMass * PY;
         bA.m_angularVelocity -= bA.m_invI * (r1X * PY - r1Y * PX);
         bB.m_linearVelocity.x += bB.m_invMass * PX;
         bB.m_linearVelocity.y += bB.m_invMass * PY;
         bB.m_angularVelocity += bB.m_invI * (r2X * PY - r2Y * PX);
      }
      else {
         this.m_impulse = 0.0;
      }
   }
   b2DistanceJoint.prototype.SolveVelocityConstraints = function (step) {
      var tMat;
      var bA = this.m_bodyA;
      var bB = this.m_bodyB;
      tMat = bA.m_xf.R;
      var r1X = this.m_localAnchor1.x - bA.m_sweep.localCenter.x;
      var r1Y = this.m_localAnchor1.y - bA.m_sweep.localCenter.y;
      var tX = (tMat.col1.x * r1X + tMat.col2.x * r1Y);
      r1Y = (tMat.col1.y * r1X + tMat.col2.y * r1Y);
      r1X = tX;
      tMat = bB.m_xf.R;
      var r2X = this.m_localAnchor2.x - bB.m_sweep.localCenter.x;
      var r2Y = this.m_localAnchor2.y - bB.m_sweep.localCenter.y;
      tX = (tMat.col1.x * r2X + tMat.col2.x * r2Y);
      r2Y = (tMat.col1.y * r2X + tMat.col2.y * r2Y);
      r2X = tX;
      var v1X = bA.m_linearVelocity.x + ((-bA.m_angularVelocity * r1Y));
      var v1Y = bA.m_linearVelocity.y + (bA.m_angularVelocity * r1X);
      var v2X = bB.m_linearVelocity.x + ((-bB.m_angularVelocity * r2Y));
      var v2Y = bB.m_linearVelocity.y + (bB.m_angularVelocity * r2X);
      var Cdot = (this.m_u.x * (v2X - v1X) + this.m_u.y * (v2Y - v1Y));
      var impulse = (-this.m_mass * (Cdot + this.m_bias + this.m_gamma * this.m_impulse));
      this.m_impulse += impulse;
      var PX = impulse * this.m_u.x;
      var PY = impulse * this.m_u.y;
      bA.m_linearVelocity.x -= bA.m_invMass * PX;
      bA.m_linearVelocity.y -= bA.m_invMass * PY;
      bA.m_angularVelocity -= bA.m_invI * (r1X * PY - r1Y * PX);
      bB.m_linearVelocity.x += bB.m_invMass * PX;
      bB.m_linearVelocity.y += bB.m_invMass * PY;
      bB.m_angularVelocity += bB.m_invI * (r2X * PY - r2Y * PX);
   }
   b2DistanceJoint.prototype.SolvePositionConstraints = function (baumgarte) {
      if (baumgarte === undefined) baumgarte = 0;
      var tMat;
      if (this.m_frequencyHz > 0.0) {
         return true;
      }
      var bA = this.m_bodyA;
      var bB = this.m_bodyB;
      tMat = bA.m_xf.R;
      var r1X = this.m_localAnchor1.x - bA.m_sweep.localCenter.x;
      var r1Y = this.m_localAnchor1.y - bA.m_sweep.localCenter.y;
      var tX = (tMat.col1.x * r1X + tMat.col2.x * r1Y);
      r1Y = (tMat.col1.y * r1X + tMat.col2.y * r1Y);
      r1X = tX;
      tMat = bB.m_xf.R;
      var r2X = this.m_localAnchor2.x - bB.m_sweep.localCenter.x;
      var r2Y = this.m_localAnchor2.y - bB.m_sweep.localCenter.y;
      tX = (tMat.col1.x * r2X + tMat.col2.x * r2Y);
      r2Y = (tMat.col1.y * r2X + tMat.col2.y * r2Y);
      r2X = tX;
      var dX = bB.m_sweep.c.x + r2X - bA.m_sweep.c.x - r1X;
      var dY = bB.m_sweep.c.y + r2Y - bA.m_sweep.c.y - r1Y;
      var length = Math.sqrt(dX * dX + dY * dY);
      dX /= length;
      dY /= length;
      var C = length - this.m_length;
      C = b2Math.Clamp(C, (-b2Settings.b2_maxLinearCorrection), b2Settings.b2_maxLinearCorrection);
      var impulse = (-this.m_mass * C);
      this.m_u.Set(dX, dY);
      var PX = impulse * this.m_u.x;
      var PY = impulse * this.m_u.y;
      bA.m_sweep.c.x -= bA.m_invMass * PX;
      bA.m_sweep.c.y -= bA.m_invMass * PY;
      bA.m_sweep.a -= bA.m_invI * (r1X * PY - r1Y * PX);
      bB.m_sweep.c.x += bB.m_invMass * PX;
      bB.m_sweep.c.y += bB.m_invMass * PY;
      bB.m_sweep.a += bB.m_invI * (r2X * PY - r2Y * PX);
      bA.SynchronizeTransform();
      bB.SynchronizeTransform();
      return b2Math.Abs(C) < b2Settings.b2_linearSlop;
   }
   Box2D.inherit(b2DistanceJointDef, Box2D.Dynamics.Joints.b2JointDef);
   b2DistanceJointDef.prototype.__super = Box2D.Dynamics.Joints.b2JointDef.prototype;
   b2DistanceJointDef.b2DistanceJointDef = function () {
      Box2D.Dynamics.Joints.b2JointDef.b2JointDef.apply(this, arguments);
      this.localAnchorA = new b2Vec2(0, 0);
      this.localAnchorB = new b2Vec2(0, 0);
   };
   b2DistanceJointDef.prototype.b2DistanceJointDef = function () {
      this.__super.b2JointDef.call(this);
      this.type = b2Joint.e_distanceJoint;
      this.length = 1.0;
      this.frequencyHz = 0.0;
      this.dampingRatio = 0.0;
   }
   b2DistanceJointDef.prototype.Initialize = function (bA, bB, anchorA, anchorB) {
      this.bodyA = bA;
      this.bodyB = bB;
      this.localAnchorA.SetV(this.bodyA.GetLocalPoint(anchorA));
      this.localAnchorB.SetV(this.bodyB.GetLocalPoint(anchorB));
      var dX = anchorB.x - anchorA.x;
      var dY = anchorB.y - anchorA.y;
      this.length = Math.sqrt(dX * dX + dY * dY);
      this.frequencyHz = 0.0;
      this.dampingRatio = 0.0;
   }
   Box2D.inherit(b2FrictionJoint, Box2D.Dynamics.Joints.b2Joint);
   b2FrictionJoint.prototype.__super = Box2D.Dynamics.Joints.b2Joint.prototype;
   b2FrictionJoint.b2FrictionJoint = function () {
      Box2D.Dynamics.Joints.b2Joint.b2Joint.apply(this, arguments);
      this.m_localAnchorA = new b2Vec2(0, 0);
      this.m_localAnchorB = new b2Vec2(0, 0);
      this.m_linearMass = new b2Mat22();
      this.m_linearImpulse = new b2Vec2(0, 0);
   };
   b2FrictionJoint.prototype.GetAnchorA = function () {
      return this.m_bodyA.GetWorldPoint(this.m_localAnchorA);
   }
   b2FrictionJoint.prototype.GetAnchorB = function () {
      return this.m_bodyB.GetWorldPoint(this.m_localAnchorB);
   }
   b2FrictionJoint.prototype.GetReactionForce = function (inv_dt) {
      if (inv_dt === undefined) inv_dt = 0;
      return new b2Vec2(inv_dt * this.m_linearImpulse.x, inv_dt * this.m_linearImpulse.y);
   }
   b2FrictionJoint.prototype.GetReactionTorque = function (inv_dt) {
      if (inv_dt === undefined) inv_dt = 0;
      return inv_dt * this.m_angularImpulse;
   }
   b2FrictionJoint.prototype.SetMaxForce = function (force) {
      if (force === undefined) force = 0;
      this.m_maxForce = force;
   }
   b2FrictionJoint.prototype.GetMaxForce = function () {
      return this.m_maxForce;
   }
   b2FrictionJoint.prototype.SetMaxTorque = function (torque) {
      if (torque === undefined) torque = 0;
      this.m_maxTorque = torque;
   }
   b2FrictionJoint.prototype.GetMaxTorque = function () {
      return this.m_maxTorque;
   }
   b2FrictionJoint.prototype.b2FrictionJoint = function (def) {
      this.__super.b2Joint.call(this, def);
      this.m_localAnchorA.SetV(def.localAnchorA);
      this.m_localAnchorB.SetV(def.localAnchorB);
      this.m_linearMass.SetZero();
      this.m_angularMass = 0.0;
      this.m_linearImpulse.SetZero();
      this.m_angularImpulse = 0.0;
      this.m_maxForce = def.maxForce;
      this.m_maxTorque = def.maxTorque;
   }
   b2FrictionJoint.prototype.InitVelocityConstraints = function (step) {
      var tMat;
      var tX = 0;
      var bA = this.m_bodyA;
      var bB = this.m_bodyB;
      tMat = bA.m_xf.R;
      var rAX = this.m_localAnchorA.x - bA.m_sweep.localCenter.x;
      var rAY = this.m_localAnchorA.y - bA.m_sweep.localCenter.y;
      tX = (tMat.col1.x * rAX + tMat.col2.x * rAY);
      rAY = (tMat.col1.y * rAX + tMat.col2.y * rAY);
      rAX = tX;
      tMat = bB.m_xf.R;
      var rBX = this.m_localAnchorB.x - bB.m_sweep.localCenter.x;
      var rBY = this.m_localAnchorB.y - bB.m_sweep.localCenter.y;
      tX = (tMat.col1.x * rBX + tMat.col2.x * rBY);
      rBY = (tMat.col1.y * rBX + tMat.col2.y * rBY);
      rBX = tX;
      var mA = bA.m_invMass;
      var mB = bB.m_invMass;
      var iA = bA.m_invI;
      var iB = bB.m_invI;
      var K = new b2Mat22();
      K.col1.x = mA + mB;
      K.col2.x = 0.0;
      K.col1.y = 0.0;
      K.col2.y = mA + mB;
      K.col1.x += iA * rAY * rAY;
      K.col2.x += (-iA * rAX * rAY);
      K.col1.y += (-iA * rAX * rAY);
      K.col2.y += iA * rAX * rAX;
      K.col1.x += iB * rBY * rBY;
      K.col2.x += (-iB * rBX * rBY);
      K.col1.y += (-iB * rBX * rBY);
      K.col2.y += iB * rBX * rBX;
      K.GetInverse(this.m_linearMass);
      this.m_angularMass = iA + iB;
      if (this.m_angularMass > 0.0) {
         this.m_angularMass = 1.0 / this.m_angularMass;
      }
      if (step.warmStarting) {
         this.m_linearImpulse.x *= step.dtRatio;
         this.m_linearImpulse.y *= step.dtRatio;
         this.m_angularImpulse *= step.dtRatio;
         var P = this.m_linearImpulse;
         bA.m_linearVelocity.x -= mA * P.x;
         bA.m_linearVelocity.y -= mA * P.y;
         bA.m_angularVelocity -= iA * (rAX * P.y - rAY * P.x + this.m_angularImpulse);
         bB.m_linearVelocity.x += mB * P.x;
         bB.m_linearVelocity.y += mB * P.y;
         bB.m_angularVelocity += iB * (rBX * P.y - rBY * P.x + this.m_angularImpulse);
      }
      else {
         this.m_linearImpulse.SetZero();
         this.m_angularImpulse = 0.0;
      }
   }
   b2FrictionJoint.prototype.SolveVelocityConstraints = function (step) {
      var tMat;
      var tX = 0;
      var bA = this.m_bodyA;
      var bB = this.m_bodyB;
      var vA = bA.m_linearVelocity;
      var wA = bA.m_angularVelocity;
      var vB = bB.m_linearVelocity;
      var wB = bB.m_angularVelocity;
      var mA = bA.m_invMass;
      var mB = bB.m_invMass;
      var iA = bA.m_invI;
      var iB = bB.m_invI;
      tMat = bA.m_xf.R;
      var rAX = this.m_localAnchorA.x - bA.m_sweep.localCenter.x;
      var rAY = this.m_localAnchorA.y - bA.m_sweep.localCenter.y;
      tX = (tMat.col1.x * rAX + tMat.col2.x * rAY);
      rAY = (tMat.col1.y * rAX + tMat.col2.y * rAY);
      rAX = tX;
      tMat = bB.m_xf.R;
      var rBX = this.m_localAnchorB.x - bB.m_sweep.localCenter.x;
      var rBY = this.m_localAnchorB.y - bB.m_sweep.localCenter.y;
      tX = (tMat.col1.x * rBX + tMat.col2.x * rBY);
      rBY = (tMat.col1.y * rBX + tMat.col2.y * rBY);
      rBX = tX;
      var maxImpulse = 0; {
         var Cdot = wB - wA;
         var impulse = (-this.m_angularMass * Cdot);
         var oldImpulse = this.m_angularImpulse;
         maxImpulse = step.dt * this.m_maxTorque;
         this.m_angularImpulse = b2Math.Clamp(this.m_angularImpulse + impulse, (-maxImpulse), maxImpulse);
         impulse = this.m_angularImpulse - oldImpulse;
         wA -= iA * impulse;
         wB += iB * impulse;
      } {
         var CdotX = vB.x - wB * rBY - vA.x + wA * rAY;
         var CdotY = vB.y + wB * rBX - vA.y - wA * rAX;
         var impulseV = b2Math.MulMV(this.m_linearMass, new b2Vec2((-CdotX), (-CdotY)));
         var oldImpulseV = this.m_linearImpulse.Copy();
         this.m_linearImpulse.Add(impulseV);
         maxImpulse = step.dt * this.m_maxForce;
         if (this.m_linearImpulse.LengthSquared() > maxImpulse * maxImpulse) {
            this.m_linearImpulse.Normalize();
            this.m_linearImpulse.Multiply(maxImpulse);
         }
         impulseV = b2Math.SubtractVV(this.m_linearImpulse, oldImpulseV);
         vA.x -= mA * impulseV.x;
         vA.y -= mA * impulseV.y;
         wA -= iA * (rAX * impulseV.y - rAY * impulseV.x);
         vB.x += mB * impulseV.x;
         vB.y += mB * impulseV.y;
         wB += iB * (rBX * impulseV.y - rBY * impulseV.x);
      }
      bA.m_angularVelocity = wA;
      bB.m_angularVelocity = wB;
   }
   b2FrictionJoint.prototype.SolvePositionConstraints = function (baumgarte) {
      if (baumgarte === undefined) baumgarte = 0;
      return true;
   }
   Box2D.inherit(b2FrictionJointDef, Box2D.Dynamics.Joints.b2JointDef);
   b2FrictionJointDef.prototype.__super = Box2D.Dynamics.Joints.b2JointDef.prototype;
   b2FrictionJointDef.b2FrictionJointDef = function () {
      Box2D.Dynamics.Joints.b2JointDef.b2JointDef.apply(this, arguments);
      this.localAnchorA = new b2Vec2(0, 0);
      this.localAnchorB = new b2Vec2(0, 0);
   };
   b2FrictionJointDef.prototype.b2FrictionJointDef = function () {
      this.__super.b2JointDef.call(this);
      this.type = b2Joint.e_frictionJoint;
      this.maxForce = 0.0;
      this.maxTorque = 0.0;
   }
   b2FrictionJointDef.prototype.Initialize = function (bA, bB, anchor) {
      this.bodyA = bA;
      this.bodyB = bB;
      this.localAnchorA.SetV(this.bodyA.GetLocalPoint(anchor));
      this.localAnchorB.SetV(this.bodyB.GetLocalPoint(anchor));
   }
   Box2D.inherit(b2GearJoint, Box2D.Dynamics.Joints.b2Joint);
   b2GearJoint.prototype.__super = Box2D.Dynamics.Joints.b2Joint.prototype;
   b2GearJoint.b2GearJoint = function () {
      Box2D.Dynamics.Joints.b2Joint.b2Joint.apply(this, arguments);
      this.m_groundAnchor1 = new b2Vec2(0, 0);
      this.m_groundAnchor2 = new b2Vec2(0, 0);
      this.m_localAnchor1 = new b2Vec2(0, 0);
      this.m_localAnchor2 = new b2Vec2(0, 0);
      this.m_J = new b2Jacobian();
   };
   b2GearJoint.prototype.GetAnchorA = function () {
      return this.m_bodyA.GetWorldPoint(this.m_localAnchor1);
   }
   b2GearJoint.prototype.GetAnchorB = function () {
      return this.m_bodyB.GetWorldPoint(this.m_localAnchor2);
   }
   b2GearJoint.prototype.GetReactionForce = function (inv_dt) {
      if (inv_dt === undefined) inv_dt = 0;
      return new b2Vec2(inv_dt * this.m_impulse * this.m_J.linearB.x, inv_dt * this.m_impulse * this.m_J.linearB.y);
   }
   b2GearJoint.prototype.GetReactionTorque = function (inv_dt) {
      if (inv_dt === undefined) inv_dt = 0;
      var tMat = this.m_bodyB.m_xf.R;
      var rX = this.m_localAnchor1.x - this.m_bodyB.m_sweep.localCenter.x;
      var rY = this.m_localAnchor1.y - this.m_bodyB.m_sweep.localCenter.y;
      var tX = tMat.col1.x * rX + tMat.col2.x * rY;
      rY = tMat.col1.y * rX + tMat.col2.y * rY;
      rX = tX;
      var PX = this.m_impulse * this.m_J.linearB.x;
      var PY = this.m_impulse * this.m_J.linearB.y;
      return inv_dt * (this.m_impulse * this.m_J.angularB - rX * PY + rY * PX);
   }
   b2GearJoint.prototype.GetRatio = function () {
      return this.m_ratio;
   }
   b2GearJoint.prototype.SetRatio = function (ratio) {
      if (ratio === undefined) ratio = 0;
      this.m_ratio = ratio;
   }
   b2GearJoint.prototype.b2GearJoint = function (def) {
      this.__super.b2Joint.call(this, def);
      var type1 = def.joint1.m_type;
      var type2 = def.joint2.m_type;
      this.m_revolute1 = null;
      this.m_prismatic1 = null;
      this.m_revolute2 = null;
      this.m_prismatic2 = null;
      var coordinate1 = 0;
      var coordinate2 = 0;
      this.m_ground1 = def.joint1.GetBodyA();
      this.m_bodyA = def.joint1.GetBodyB();
      if (type1 == b2Joint.e_revoluteJoint) {
         this.m_revolute1 = def.joint1;
         this.m_groundAnchor1.SetV(this.m_revolute1.m_localAnchor1);
         this.m_localAnchor1.SetV(this.m_revolute1.m_localAnchor2);
         coordinate1 = this.m_revolute1.GetJointAngle();
      } else {
         this.m_prismatic1 = def.joint1;
         this.m_groundAnchor1.SetV(this.m_prismatic1.m_localAnchor1);
         this.m_localAnchor1.SetV(this.m_prismatic1.m_localAnchor2);
         coordinate1 = this.m_prismatic1.GetJointTranslation();
      }
      this.m_ground2 = def.joint2.GetBodyA();
      this.m_bodyB = def.joint2.GetBodyB();
      if (type2 == b2Joint.e_revoluteJoint) {
         this.m_revolute2 = def.joint2;
         this.m_groundAnchor2.SetV(this.m_revolute2.m_localAnchor1);
         this.m_localAnchor2.SetV(this.m_revolute2.m_localAnchor2);
         coordinate2 = this.m_revolute2.GetJointAngle();
      } else {
         this.m_prismatic2 = def.joint2;
         this.m_groundAnchor2.SetV(this.m_prismatic2.m_localAnchor1);
         this.m_localAnchor2.SetV(this.m_prismatic2.m_localAnchor2);
         coordinate2 = this.m_prismatic2.GetJointTranslation();
      }
      this.m_ratio = def.ratio;
      this.m_constant = coordinate1 + this.m_ratio * coordinate2;
      this.m_impulse = 0.0;
   }
   b2GearJoint.prototype.InitVelocityConstraints = function (step) {
      var g1 = this.m_ground1;
      var g2 = this.m_ground2;
      var bA = this.m_bodyA;
      var bB = this.m_bodyB;
      var ugX = 0;
      var ugY = 0;
      var rX = 0;
      var rY = 0;
      var tMat;
      var tVec;
      var crug = 0;
      var tX = 0;
      var K = 0.0;
      this.m_J.SetZero();
      if (this.m_revolute1) {
         this.m_J.angularA = (-1.0);
         K += bA.m_invI;
      }
      else {
         tMat = g1.m_xf.R;
         tVec = this.m_prismatic1.m_localXAxis1;
         ugX = tMat.col1.x * tVec.x + tMat.col2.x * tVec.y;
         ugY = tMat.col1.y * tVec.x + tMat.col2.y * tVec.y;
         tMat = bA.m_xf.R;
         rX = this.m_localAnchor1.x - bA.m_sweep.localCenter.x;
         rY = this.m_localAnchor1.y - bA.m_sweep.localCenter.y;
         tX = tMat.col1.x * rX + tMat.col2.x * rY;
         rY = tMat.col1.y * rX + tMat.col2.y * rY;
         rX = tX;
         crug = rX * ugY - rY * ugX;
         this.m_J.linearA.Set((-ugX), (-ugY));
         this.m_J.angularA = (-crug);
         K += bA.m_invMass + bA.m_invI * crug * crug;
      }
      if (this.m_revolute2) {
         this.m_J.angularB = (-this.m_ratio);
         K += this.m_ratio * this.m_ratio * bB.m_invI;
      }
      else {
         tMat = g2.m_xf.R;
         tVec = this.m_prismatic2.m_localXAxis1;
         ugX = tMat.col1.x * tVec.x + tMat.col2.x * tVec.y;
         ugY = tMat.col1.y * tVec.x + tMat.col2.y * tVec.y;
         tMat = bB.m_xf.R;
         rX = this.m_localAnchor2.x - bB.m_sweep.localCenter.x;
         rY = this.m_localAnchor2.y - bB.m_sweep.localCenter.y;
         tX = tMat.col1.x * rX + tMat.col2.x * rY;
         rY = tMat.col1.y * rX + tMat.col2.y * rY;
         rX = tX;
         crug = rX * ugY - rY * ugX;
         this.m_J.linearB.Set((-this.m_ratio * ugX), (-this.m_ratio * ugY));
         this.m_J.angularB = (-this.m_ratio * crug);
         K += this.m_ratio * this.m_ratio * (bB.m_invMass + bB.m_invI * crug * crug);
      }
      this.m_mass = K > 0.0 ? 1.0 / K : 0.0;
      if (step.warmStarting) {
         bA.m_linearVelocity.x += bA.m_invMass * this.m_impulse * this.m_J.linearA.x;
         bA.m_linearVelocity.y += bA.m_invMass * this.m_impulse * this.m_J.linearA.y;
         bA.m_angularVelocity += bA.m_invI * this.m_impulse * this.m_J.angularA;
         bB.m_linearVelocity.x += bB.m_invMass * this.m_impulse * this.m_J.linearB.x;
         bB.m_linearVelocity.y += bB.m_invMass * this.m_impulse * this.m_J.linearB.y;
         bB.m_angularVelocity += bB.m_invI * this.m_impulse * this.m_J.angularB;
      }
      else {
         this.m_impulse = 0.0;
      }
   }
   b2GearJoint.prototype.SolveVelocityConstraints = function (step) {
      var bA = this.m_bodyA;
      var bB = this.m_bodyB;
      var Cdot = this.m_J.Compute(bA.m_linearVelocity, bA.m_angularVelocity, bB.m_linearVelocity, bB.m_angularVelocity);
      var impulse = (-this.m_mass * Cdot);
      this.m_impulse += impulse;
      bA.m_linearVelocity.x += bA.m_invMass * impulse * this.m_J.linearA.x;
      bA.m_linearVelocity.y += bA.m_invMass * impulse * this.m_J.linearA.y;
      bA.m_angularVelocity += bA.m_invI * impulse * this.m_J.angularA;
      bB.m_linearVelocity.x += bB.m_invMass * impulse * this.m_J.linearB.x;
      bB.m_linearVelocity.y += bB.m_invMass * impulse * this.m_J.linearB.y;
      bB.m_angularVelocity += bB.m_invI * impulse * this.m_J.angularB;
   }
   b2GearJoint.prototype.SolvePositionConstraints = function (baumgarte) {
      if (baumgarte === undefined) baumgarte = 0;
      var linearError = 0.0;
      var bA = this.m_bodyA;
      var bB = this.m_bodyB;
      var coordinate1 = 0;
      var coordinate2 = 0;
      if (this.m_revolute1) {
         coordinate1 = this.m_revolute1.GetJointAngle();
      }
      else {
         coordinate1 = this.m_prismatic1.GetJointTranslation();
      }
      if (this.m_revolute2) {
         coordinate2 = this.m_revolute2.GetJointAngle();
      }
      else {
         coordinate2 = this.m_prismatic2.GetJointTranslation();
      }
      var C = this.m_constant - (coordinate1 + this.m_ratio * coordinate2);
      var impulse = (-this.m_mass * C);
      bA.m_sweep.c.x += bA.m_invMass * impulse * this.m_J.linearA.x;
      bA.m_sweep.c.y += bA.m_invMass * impulse * this.m_J.linearA.y;
      bA.m_sweep.a += bA.m_invI * impulse * this.m_J.angularA;
      bB.m_sweep.c.x += bB.m_invMass * impulse * this.m_J.linearB.x;
      bB.m_sweep.c.y += bB.m_invMass * impulse * this.m_J.linearB.y;
      bB.m_sweep.a += bB.m_invI * impulse * this.m_J.angularB;
      bA.SynchronizeTransform();
      bB.SynchronizeTransform();
      return linearError < b2Settings.b2_linearSlop;
   }
   Box2D.inherit(b2GearJointDef, Box2D.Dynamics.Joints.b2JointDef);
   b2GearJointDef.prototype.__super = Box2D.Dynamics.Joints.b2JointDef.prototype;
   b2GearJointDef.b2GearJointDef = function () {
      Box2D.Dynamics.Joints.b2JointDef.b2JointDef.apply(this, arguments);
   };
   b2GearJointDef.prototype.b2GearJointDef = function () {
      this.__super.b2JointDef.call(this);
      this.type = b2Joint.e_gearJoint;
      this.joint1 = null;
      this.joint2 = null;
      this.ratio = 1.0;
   }
   b2Jacobian.b2Jacobian = function () {
      this.linearA = new b2Vec2(0, 0);
      this.linearB = new b2Vec2(0, 0);
   };
   b2Jacobian.prototype.SetZero = function () {
      this.linearA.SetZero();
      this.angularA = 0.0;
      this.linearB.SetZero();
      this.angularB = 0.0;
   }
   b2Jacobian.prototype.Set = function (x1, a1, x2, a2) {
      if (a1 === undefined) a1 = 0;
      if (a2 === undefined) a2 = 0;
      this.linearA.SetV(x1);
      this.angularA = a1;
      this.linearB.SetV(x2);
      this.angularB = a2;
   }
   b2Jacobian.prototype.Compute = function (x1, a1, x2, a2) {
      if (a1 === undefined) a1 = 0;
      if (a2 === undefined) a2 = 0;
      return (this.linearA.x * x1.x + this.linearA.y * x1.y) + this.angularA * a1 + (this.linearB.x * x2.x + this.linearB.y * x2.y) + this.angularB * a2;
   }
   b2Joint.b2Joint = function () {
      this.m_edgeA = new b2JointEdge();
      this.m_edgeB = new b2JointEdge();
      this.m_localCenterA = new b2Vec2(0, 0);
      this.m_localCenterB = new b2Vec2(0, 0);
   };
   b2Joint.prototype.GetType = function () {
      return this.m_type;
   }
   b2Joint.prototype.GetAnchorA = function () {
      return null;
   }
   b2Joint.prototype.GetAnchorB = function () {
      return null;
   }
   b2Joint.prototype.GetReactionForce = function (inv_dt) {
      if (inv_dt === undefined) inv_dt = 0;
      return null;
   }
   b2Joint.prototype.GetReactionTorque = function (inv_dt) {
      if (inv_dt === undefined) inv_dt = 0;
      return 0.0;
   }
   b2Joint.prototype.GetBodyA = function () {
      return this.m_bodyA;
   }
   b2Joint.prototype.GetBodyB = function () {
      return this.m_bodyB;
   }
   b2Joint.prototype.GetNext = function () {
      return this.m_next;
   }
   b2Joint.prototype.GetUserData = function () {
      return this.m_userData;
   }
   b2Joint.prototype.SetUserData = function (data) {
      this.m_userData = data;
   }
   b2Joint.prototype.IsActive = function () {
      return this.m_bodyA.IsActive() && this.m_bodyB.IsActive();
   }
   b2Joint.Create = function (def) {
      var joint = null;
      switch (def.type) {
      case b2Joint.e_distanceJoint:
         {
            joint = new b2DistanceJoint(def);
         }
         break;
      case b2Joint.e_mouseJoint:
         {
            joint = new b2MouseJoint(def);
         }
         break;
      case b2Joint.e_prismaticJoint:
         {
            joint = new b2PrismaticJoint(def);
         }
         break;
      case b2Joint.e_revoluteJoint:
         {
            joint = new b2RevoluteJoint(def);
         }
         break;
      case b2Joint.e_pulleyJoint:
         {
            joint = new b2PulleyJoint(def);
         }
         break;
      case b2Joint.e_gearJoint:
         {
            joint = new b2GearJoint(def);
         }
         break;
      case b2Joint.e_lineJoint:
         {
            joint = new b2LineJoint(def);
         }
         break;
      case b2Joint.e_weldJoint:
         {
            joint = new b2WeldJoint(def);
         }
         break;
      case b2Joint.e_frictionJoint:
         {
            joint = new b2FrictionJoint(def);
         }
         break;
      default:
         break;
      }
      return joint;
   }
   b2Joint.Destroy = function (joint) {}
   b2Joint.prototype.b2Joint = function (def) {
      b2Settings.b2Assert(def.bodyA != def.bodyB);
      this.m_type = def.type;
      this.m_prev = null;
      this.m_next = null;
      this.m_bodyA = def.bodyA;
      this.m_bodyB = def.bodyB;
      this.m_collideConnected = def.collideConnected;
      this.m_userData = def.userData;
   }
   b2Joint.prototype.InitVelocityConstraints = function (step) {}
   b2Joint.prototype.SolveVelocityConstraints = function (step) {}
   b2Joint.prototype.FinalizeVelocityConstraints = function () {}
   b2Joint.prototype.SolvePositionConstraints = function (baumgarte) {
      if (baumgarte === undefined) baumgarte = 0;
      return false;
   }
   Box2D.postDefs.push(function () {
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
   });
   b2JointDef.b2JointDef = function () {};
   b2JointDef.prototype.b2JointDef = function () {
      this.type = b2Joint.e_unknownJoint;
      this.userData = null;
      this.bodyA = null;
      this.bodyB = null;
      this.collideConnected = false;
   }
   b2JointEdge.b2JointEdge = function () {};
   Box2D.inherit(b2LineJoint, Box2D.Dynamics.Joints.b2Joint);
   b2LineJoint.prototype.__super = Box2D.Dynamics.Joints.b2Joint.prototype;
   b2LineJoint.b2LineJoint = function () {
      Box2D.Dynamics.Joints.b2Joint.b2Joint.apply(this, arguments);
      this.m_localAnchor1 = new b2Vec2(0, 0);
      this.m_localAnchor2 = new b2Vec2(0, 0);
      this.m_localXAxis1 = new b2Vec2(0, 0);
      this.m_localYAxis1 = new b2Vec2(0, 0);
      this.m_axis = new b2Vec2(0, 0);
      this.m_perp = new b2Vec2(0, 0);
      this.m_K = new b2Mat22();
      this.m_impulse = new b2Vec2(0, 0);
   };
   b2LineJoint.prototype.GetAnchorA = function () {
      return this.m_bodyA.GetWorldPoint(this.m_localAnchor1);
   }
   b2LineJoint.prototype.GetAnchorB = function () {
      return this.m_bodyB.GetWorldPoint(this.m_localAnchor2);
   }
   b2LineJoint.prototype.GetReactionForce = function (inv_dt) {
      if (inv_dt === undefined) inv_dt = 0;
      return new b2Vec2(inv_dt * (this.m_impulse.x * this.m_perp.x + (this.m_motorImpulse + this.m_impulse.y) * this.m_axis.x), inv_dt * (this.m_impulse.x * this.m_perp.y + (this.m_motorImpulse + this.m_impulse.y) * this.m_axis.y));
   }
   b2LineJoint.prototype.GetReactionTorque = function (inv_dt) {
      if (inv_dt === undefined) inv_dt = 0;
      return inv_dt * this.m_impulse.y;
   }
   b2LineJoint.prototype.GetJointTranslation = function () {
      var bA = this.m_bodyA;
      var bB = this.m_bodyB;
      var tMat;
      var p1 = bA.GetWorldPoint(this.m_localAnchor1);
      var p2 = bB.GetWorldPoint(this.m_localAnchor2);
      var dX = p2.x - p1.x;
      var dY = p2.y - p1.y;
      var axis = bA.GetWorldVector(this.m_localXAxis1);
      var translation = axis.x * dX + axis.y * dY;
      return translation;
   }
   b2LineJoint.prototype.GetJointSpeed = function () {
      var bA = this.m_bodyA;
      var bB = this.m_bodyB;
      var tMat;
      tMat = bA.m_xf.R;
      var r1X = this.m_localAnchor1.x - bA.m_sweep.localCenter.x;
      var r1Y = this.m_localAnchor1.y - bA.m_sweep.localCenter.y;
      var tX = (tMat.col1.x * r1X + tMat.col2.x * r1Y);
      r1Y = (tMat.col1.y * r1X + tMat.col2.y * r1Y);
      r1X = tX;
      tMat = bB.m_xf.R;
      var r2X = this.m_localAnchor2.x - bB.m_sweep.localCenter.x;
      var r2Y = this.m_localAnchor2.y - bB.m_sweep.localCenter.y;
      tX = (tMat.col1.x * r2X + tMat.col2.x * r2Y);
      r2Y = (tMat.col1.y * r2X + tMat.col2.y * r2Y);
      r2X = tX;
      var p1X = bA.m_sweep.c.x + r1X;
      var p1Y = bA.m_sweep.c.y + r1Y;
      var p2X = bB.m_sweep.c.x + r2X;
      var p2Y = bB.m_sweep.c.y + r2Y;
      var dX = p2X - p1X;
      var dY = p2Y - p1Y;
      var axis = bA.GetWorldVector(this.m_localXAxis1);
      var v1 = bA.m_linearVelocity;
      var v2 = bB.m_linearVelocity;
      var w1 = bA.m_angularVelocity;
      var w2 = bB.m_angularVelocity;
      var speed = (dX * ((-w1 * axis.y)) + dY * (w1 * axis.x)) + (axis.x * (((v2.x + ((-w2 * r2Y))) - v1.x) - ((-w1 * r1Y))) + axis.y * (((v2.y + (w2 * r2X)) - v1.y) - (w1 * r1X)));
      return speed;
   }
   b2LineJoint.prototype.IsLimitEnabled = function () {
      return this.m_enableLimit;
   }
   b2LineJoint.prototype.EnableLimit = function (flag) {
      this.m_bodyA.SetAwake(true);
      this.m_bodyB.SetAwake(true);
      this.m_enableLimit = flag;
   }
   b2LineJoint.prototype.GetLowerLimit = function () {
      return this.m_lowerTranslation;
   }
   b2LineJoint.prototype.GetUpperLimit = function () {
      return this.m_upperTranslation;
   }
   b2LineJoint.prototype.SetLimits = function (lower, upper) {
      if (lower === undefined) lower = 0;
      if (upper === undefined) upper = 0;
      this.m_bodyA.SetAwake(true);
      this.m_bodyB.SetAwake(true);
      this.m_lowerTranslation = lower;
      this.m_upperTranslation = upper;
   }
   b2LineJoint.prototype.IsMotorEnabled = function () {
      return this.m_enableMotor;
   }
   b2LineJoint.prototype.EnableMotor = function (flag) {
      this.m_bodyA.SetAwake(true);
      this.m_bodyB.SetAwake(true);
      this.m_enableMotor = flag;
   }
   b2LineJoint.prototype.SetMotorSpeed = function (speed) {
      if (speed === undefined) speed = 0;
      this.m_bodyA.SetAwake(true);
      this.m_bodyB.SetAwake(true);
      this.m_motorSpeed = speed;
   }
   b2LineJoint.prototype.GetMotorSpeed = function () {
      return this.m_motorSpeed;
   }
   b2LineJoint.prototype.SetMaxMotorForce = function (force) {
      if (force === undefined) force = 0;
      this.m_bodyA.SetAwake(true);
      this.m_bodyB.SetAwake(true);
      this.m_maxMotorForce = force;
   }
   b2LineJoint.prototype.GetMaxMotorForce = function () {
      return this.m_maxMotorForce;
   }
   b2LineJoint.prototype.GetMotorForce = function () {
      return this.m_motorImpulse;
   }
   b2LineJoint.prototype.b2LineJoint = function (def) {
      this.__super.b2Joint.call(this, def);
      var tMat;
      var tX = 0;
      var tY = 0;
      this.m_localAnchor1.SetV(def.localAnchorA);
      this.m_localAnchor2.SetV(def.localAnchorB);
      this.m_localXAxis1.SetV(def.localAxisA);
      this.m_localYAxis1.x = (-this.m_localXAxis1.y);
      this.m_localYAxis1.y = this.m_localXAxis1.x;
      this.m_impulse.SetZero();
      this.m_motorMass = 0.0;
      this.m_motorImpulse = 0.0;
      this.m_lowerTranslation = def.lowerTranslation;
      this.m_upperTranslation = def.upperTranslation;
      this.m_maxMotorForce = def.maxMotorForce;
      this.m_motorSpeed = def.motorSpeed;
      this.m_enableLimit = def.enableLimit;
      this.m_enableMotor = def.enableMotor;
      this.m_limitState = b2Joint.e_inactiveLimit;
      this.m_axis.SetZero();
      this.m_perp.SetZero();
   }
   b2LineJoint.prototype.InitVelocityConstraints = function (step) {
      var bA = this.m_bodyA;
      var bB = this.m_bodyB;
      var tMat;
      var tX = 0;
      this.m_localCenterA.SetV(bA.GetLocalCenter());
      this.m_localCenterB.SetV(bB.GetLocalCenter());
      var xf1 = bA.GetTransform();
      var xf2 = bB.GetTransform();
      tMat = bA.m_xf.R;
      var r1X = this.m_localAnchor1.x - this.m_localCenterA.x;
      var r1Y = this.m_localAnchor1.y - this.m_localCenterA.y;
      tX = (tMat.col1.x * r1X + tMat.col2.x * r1Y);
      r1Y = (tMat.col1.y * r1X + tMat.col2.y * r1Y);
      r1X = tX;
      tMat = bB.m_xf.R;
      var r2X = this.m_localAnchor2.x - this.m_localCenterB.x;
      var r2Y = this.m_localAnchor2.y - this.m_localCenterB.y;
      tX = (tMat.col1.x * r2X + tMat.col2.x * r2Y);
      r2Y = (tMat.col1.y * r2X + tMat.col2.y * r2Y);
      r2X = tX;
      var dX = bB.m_sweep.c.x + r2X - bA.m_sweep.c.x - r1X;
      var dY = bB.m_sweep.c.y + r2Y - bA.m_sweep.c.y - r1Y;
      this.m_invMassA = bA.m_invMass;
      this.m_invMassB = bB.m_invMass;
      this.m_invIA = bA.m_invI;
      this.m_invIB = bB.m_invI; {
         this.m_axis.SetV(b2Math.MulMV(xf1.R, this.m_localXAxis1));
         this.m_a1 = (dX + r1X) * this.m_axis.y - (dY + r1Y) * this.m_axis.x;
         this.m_a2 = r2X * this.m_axis.y - r2Y * this.m_axis.x;
         this.m_motorMass = this.m_invMassA + this.m_invMassB + this.m_invIA * this.m_a1 * this.m_a1 + this.m_invIB * this.m_a2 * this.m_a2;
         this.m_motorMass = this.m_motorMass > Number.MIN_VALUE ? 1.0 / this.m_motorMass : 0.0;
      } {
         this.m_perp.SetV(b2Math.MulMV(xf1.R, this.m_localYAxis1));
         this.m_s1 = (dX + r1X) * this.m_perp.y - (dY + r1Y) * this.m_perp.x;
         this.m_s2 = r2X * this.m_perp.y - r2Y * this.m_perp.x;
         var m1 = this.m_invMassA;
         var m2 = this.m_invMassB;
         var i1 = this.m_invIA;
         var i2 = this.m_invIB;
         this.m_K.col1.x = m1 + m2 + i1 * this.m_s1 * this.m_s1 + i2 * this.m_s2 * this.m_s2;
         this.m_K.col1.y = i1 * this.m_s1 * this.m_a1 + i2 * this.m_s2 * this.m_a2;
         this.m_K.col2.x = this.m_K.col1.y;
         this.m_K.col2.y = m1 + m2 + i1 * this.m_a1 * this.m_a1 + i2 * this.m_a2 * this.m_a2;
      }
      if (this.m_enableLimit) {
         var jointTransition = this.m_axis.x * dX + this.m_axis.y * dY;
         if (b2Math.Abs(this.m_upperTranslation - this.m_lowerTranslation) < 2.0 * b2Settings.b2_linearSlop) {
            this.m_limitState = b2Joint.e_equalLimits;
         }
         else if (jointTransition <= this.m_lowerTranslation) {
            if (this.m_limitState != b2Joint.e_atLowerLimit) {
               this.m_limitState = b2Joint.e_atLowerLimit;
               this.m_impulse.y = 0.0;
            }
         }
         else if (jointTransition >= this.m_upperTranslation) {
            if (this.m_limitState != b2Joint.e_atUpperLimit) {
               this.m_limitState = b2Joint.e_atUpperLimit;
               this.m_impulse.y = 0.0;
            }
         }
         else {
            this.m_limitState = b2Joint.e_inactiveLimit;
            this.m_impulse.y = 0.0;
         }
      }
      else {
         this.m_limitState = b2Joint.e_inactiveLimit;
      }
      if (this.m_enableMotor == false) {
         this.m_motorImpulse = 0.0;
      }
      if (step.warmStarting) {
         this.m_impulse.x *= step.dtRatio;
         this.m_impulse.y *= step.dtRatio;
         this.m_motorImpulse *= step.dtRatio;
         var PX = this.m_impulse.x * this.m_perp.x + (this.m_motorImpulse + this.m_impulse.y) * this.m_axis.x;
         var PY = this.m_impulse.x * this.m_perp.y + (this.m_motorImpulse + this.m_impulse.y) * this.m_axis.y;
         var L1 = this.m_impulse.x * this.m_s1 + (this.m_motorImpulse + this.m_impulse.y) * this.m_a1;
         var L2 = this.m_impulse.x * this.m_s2 + (this.m_motorImpulse + this.m_impulse.y) * this.m_a2;
         bA.m_linearVelocity.x -= this.m_invMassA * PX;
         bA.m_linearVelocity.y -= this.m_invMassA * PY;
         bA.m_angularVelocity -= this.m_invIA * L1;
         bB.m_linearVelocity.x += this.m_invMassB * PX;
         bB.m_linearVelocity.y += this.m_invMassB * PY;
         bB.m_angularVelocity += this.m_invIB * L2;
      }
      else {
         this.m_impulse.SetZero();
         this.m_motorImpulse = 0.0;
      }
   }
   b2LineJoint.prototype.SolveVelocityConstraints = function (step) {
      var bA = this.m_bodyA;
      var bB = this.m_bodyB;
      var v1 = bA.m_linearVelocity;
      var w1 = bA.m_angularVelocity;
      var v2 = bB.m_linearVelocity;
      var w2 = bB.m_angularVelocity;
      var PX = 0;
      var PY = 0;
      var L1 = 0;
      var L2 = 0;
      if (this.m_enableMotor && this.m_limitState != b2Joint.e_equalLimits) {
         var Cdot = this.m_axis.x * (v2.x - v1.x) + this.m_axis.y * (v2.y - v1.y) + this.m_a2 * w2 - this.m_a1 * w1;
         var impulse = this.m_motorMass * (this.m_motorSpeed - Cdot);
         var oldImpulse = this.m_motorImpulse;
         var maxImpulse = step.dt * this.m_maxMotorForce;
         this.m_motorImpulse = b2Math.Clamp(this.m_motorImpulse + impulse, (-maxImpulse), maxImpulse);
         impulse = this.m_motorImpulse - oldImpulse;
         PX = impulse * this.m_axis.x;
         PY = impulse * this.m_axis.y;
         L1 = impulse * this.m_a1;
         L2 = impulse * this.m_a2;
         v1.x -= this.m_invMassA * PX;
         v1.y -= this.m_invMassA * PY;
         w1 -= this.m_invIA * L1;
         v2.x += this.m_invMassB * PX;
         v2.y += this.m_invMassB * PY;
         w2 += this.m_invIB * L2;
      }
      var Cdot1 = this.m_perp.x * (v2.x - v1.x) + this.m_perp.y * (v2.y - v1.y) + this.m_s2 * w2 - this.m_s1 * w1;
      if (this.m_enableLimit && this.m_limitState != b2Joint.e_inactiveLimit) {
         var Cdot2 = this.m_axis.x * (v2.x - v1.x) + this.m_axis.y * (v2.y - v1.y) + this.m_a2 * w2 - this.m_a1 * w1;
         var f1 = this.m_impulse.Copy();
         var df = this.m_K.Solve(new b2Vec2(0, 0), (-Cdot1), (-Cdot2));
         this.m_impulse.Add(df);
         if (this.m_limitState == b2Joint.e_atLowerLimit) {
            this.m_impulse.y = b2Math.Max(this.m_impulse.y, 0.0);
         }
         else if (this.m_limitState == b2Joint.e_atUpperLimit) {
            this.m_impulse.y = b2Math.Min(this.m_impulse.y, 0.0);
         }
         var b = (-Cdot1) - (this.m_impulse.y - f1.y) * this.m_K.col2.x;
         var f2r = 0;
         if (this.m_K.col1.x != 0.0) {
            f2r = b / this.m_K.col1.x + f1.x;
         }
         else {
            f2r = f1.x;
         }
         this.m_impulse.x = f2r;
         df.x = this.m_impulse.x - f1.x;
         df.y = this.m_impulse.y - f1.y;
         PX = df.x * this.m_perp.x + df.y * this.m_axis.x;
         PY = df.x * this.m_perp.y + df.y * this.m_axis.y;
         L1 = df.x * this.m_s1 + df.y * this.m_a1;
         L2 = df.x * this.m_s2 + df.y * this.m_a2;
         v1.x -= this.m_invMassA * PX;
         v1.y -= this.m_invMassA * PY;
         w1 -= this.m_invIA * L1;
         v2.x += this.m_invMassB * PX;
         v2.y += this.m_invMassB * PY;
         w2 += this.m_invIB * L2;
      }
      else {
         var df2 = 0;
         if (this.m_K.col1.x != 0.0) {
            df2 = ((-Cdot1)) / this.m_K.col1.x;
         }
         else {
            df2 = 0.0;
         }
         this.m_impulse.x += df2;
         PX = df2 * this.m_perp.x;
         PY = df2 * this.m_perp.y;
         L1 = df2 * this.m_s1;
         L2 = df2 * this.m_s2;
         v1.x -= this.m_invMassA * PX;
         v1.y -= this.m_invMassA * PY;
         w1 -= this.m_invIA * L1;
         v2.x += this.m_invMassB * PX;
         v2.y += this.m_invMassB * PY;
         w2 += this.m_invIB * L2;
      }
      bA.m_linearVelocity.SetV(v1);
      bA.m_angularVelocity = w1;
      bB.m_linearVelocity.SetV(v2);
      bB.m_angularVelocity = w2;
   }
   b2LineJoint.prototype.SolvePositionConstraints = function (baumgarte) {
      if (baumgarte === undefined) baumgarte = 0;
      var limitC = 0;
      var oldLimitImpulse = 0;
      var bA = this.m_bodyA;
      var bB = this.m_bodyB;
      var c1 = bA.m_sweep.c;
      var a1 = bA.m_sweep.a;
      var c2 = bB.m_sweep.c;
      var a2 = bB.m_sweep.a;
      var tMat;
      var tX = 0;
      var m1 = 0;
      var m2 = 0;
      var i1 = 0;
      var i2 = 0;
      var linearError = 0.0;
      var angularError = 0.0;
      var active = false;
      var C2 = 0.0;
      var R1 = b2Mat22.FromAngle(a1);
      var R2 = b2Mat22.FromAngle(a2);
      tMat = R1;
      var r1X = this.m_localAnchor1.x - this.m_localCenterA.x;
      var r1Y = this.m_localAnchor1.y - this.m_localCenterA.y;
      tX = (tMat.col1.x * r1X + tMat.col2.x * r1Y);
      r1Y = (tMat.col1.y * r1X + tMat.col2.y * r1Y);
      r1X = tX;
      tMat = R2;
      var r2X = this.m_localAnchor2.x - this.m_localCenterB.x;
      var r2Y = this.m_localAnchor2.y - this.m_localCenterB.y;
      tX = (tMat.col1.x * r2X + tMat.col2.x * r2Y);
      r2Y = (tMat.col1.y * r2X + tMat.col2.y * r2Y);
      r2X = tX;
      var dX = c2.x + r2X - c1.x - r1X;
      var dY = c2.y + r2Y - c1.y - r1Y;
      if (this.m_enableLimit) {
         this.m_axis = b2Math.MulMV(R1, this.m_localXAxis1);
         this.m_a1 = (dX + r1X) * this.m_axis.y - (dY + r1Y) * this.m_axis.x;
         this.m_a2 = r2X * this.m_axis.y - r2Y * this.m_axis.x;
         var translation = this.m_axis.x * dX + this.m_axis.y * dY;
         if (b2Math.Abs(this.m_upperTranslation - this.m_lowerTranslation) < 2.0 * b2Settings.b2_linearSlop) {
            C2 = b2Math.Clamp(translation, (-b2Settings.b2_maxLinearCorrection), b2Settings.b2_maxLinearCorrection);
            linearError = b2Math.Abs(translation);
            active = true;
         }
         else if (translation <= this.m_lowerTranslation) {
            C2 = b2Math.Clamp(translation - this.m_lowerTranslation + b2Settings.b2_linearSlop, (-b2Settings.b2_maxLinearCorrection), 0.0);
            linearError = this.m_lowerTranslation - translation;
            active = true;
         }
         else if (translation >= this.m_upperTranslation) {
            C2 = b2Math.Clamp(translation - this.m_upperTranslation + b2Settings.b2_linearSlop, 0.0, b2Settings.b2_maxLinearCorrection);
            linearError = translation - this.m_upperTranslation;
            active = true;
         }
      }
      this.m_perp = b2Math.MulMV(R1, this.m_localYAxis1);
      this.m_s1 = (dX + r1X) * this.m_perp.y - (dY + r1Y) * this.m_perp.x;
      this.m_s2 = r2X * this.m_perp.y - r2Y * this.m_perp.x;
      var impulse = new b2Vec2(0, 0);
      var C1 = this.m_perp.x * dX + this.m_perp.y * dY;
      linearError = b2Math.Max(linearError, b2Math.Abs(C1));
      angularError = 0.0;
      if (active) {
         m1 = this.m_invMassA;
         m2 = this.m_invMassB;
         i1 = this.m_invIA;
         i2 = this.m_invIB;
         this.m_K.col1.x = m1 + m2 + i1 * this.m_s1 * this.m_s1 + i2 * this.m_s2 * this.m_s2;
         this.m_K.col1.y = i1 * this.m_s1 * this.m_a1 + i2 * this.m_s2 * this.m_a2;
         this.m_K.col2.x = this.m_K.col1.y;
         this.m_K.col2.y = m1 + m2 + i1 * this.m_a1 * this.m_a1 + i2 * this.m_a2 * this.m_a2;
         this.m_K.Solve(impulse, (-C1), (-C2));
      }
      else {
         m1 = this.m_invMassA;
         m2 = this.m_invMassB;
         i1 = this.m_invIA;
         i2 = this.m_invIB;
         var k11 = m1 + m2 + i1 * this.m_s1 * this.m_s1 + i2 * this.m_s2 * this.m_s2;
         var impulse1 = 0;
         if (k11 != 0.0) {
            impulse1 = ((-C1)) / k11;
         }
         else {
            impulse1 = 0.0;
         }
         impulse.x = impulse1;
         impulse.y = 0.0;
      }
      var PX = impulse.x * this.m_perp.x + impulse.y * this.m_axis.x;
      var PY = impulse.x * this.m_perp.y + impulse.y * this.m_axis.y;
      var L1 = impulse.x * this.m_s1 + impulse.y * this.m_a1;
      var L2 = impulse.x * this.m_s2 + impulse.y * this.m_a2;
      c1.x -= this.m_invMassA * PX;
      c1.y -= this.m_invMassA * PY;
      a1 -= this.m_invIA * L1;
      c2.x += this.m_invMassB * PX;
      c2.y += this.m_invMassB * PY;
      a2 += this.m_invIB * L2;
      bA.m_sweep.a = a1;
      bB.m_sweep.a = a2;
      bA.SynchronizeTransform();
      bB.SynchronizeTransform();
      return linearError <= b2Settings.b2_linearSlop && angularError <= b2Settings.b2_angularSlop;
   }
   Box2D.inherit(b2LineJointDef, Box2D.Dynamics.Joints.b2JointDef);
   b2LineJointDef.prototype.__super = Box2D.Dynamics.Joints.b2JointDef.prototype;
   b2LineJointDef.b2LineJointDef = function () {
      Box2D.Dynamics.Joints.b2JointDef.b2JointDef.apply(this, arguments);
      this.localAnchorA = new b2Vec2(0, 0);
      this.localAnchorB = new b2Vec2(0, 0);
      this.localAxisA = new b2Vec2(0, 0);
   };
   b2LineJointDef.prototype.b2LineJointDef = function () {
      this.__super.b2JointDef.call(this);
      this.type = b2Joint.e_lineJoint;
      this.localAxisA.Set(1.0, 0.0);
      this.enableLimit = false;
      this.lowerTranslation = 0.0;
      this.upperTranslation = 0.0;
      this.enableMotor = false;
      this.maxMotorForce = 0.0;
      this.motorSpeed = 0.0;
   }
   b2LineJointDef.prototype.Initialize = function (bA, bB, anchor, axis) {
      this.bodyA = bA;
      this.bodyB = bB;
      this.localAnchorA = this.bodyA.GetLocalPoint(anchor);
      this.localAnchorB = this.bodyB.GetLocalPoint(anchor);
      this.localAxisA = this.bodyA.GetLocalVector(axis);
   }
   Box2D.inherit(b2MouseJoint, Box2D.Dynamics.Joints.b2Joint);
   b2MouseJoint.prototype.__super = Box2D.Dynamics.Joints.b2Joint.prototype;
   b2MouseJoint.b2MouseJoint = function () {
      Box2D.Dynamics.Joints.b2Joint.b2Joint.apply(this, arguments);
      this.K = new b2Mat22();
      this.K1 = new b2Mat22();
      this.K2 = new b2Mat22();
      this.m_localAnchor = new b2Vec2(0, 0);
      this.m_target = new b2Vec2(0, 0);
      this.m_impulse = new b2Vec2(0, 0);
      this.m_mass = new b2Mat22();
      this.m_C = new b2Vec2(0, 0);
   };
   b2MouseJoint.prototype.GetAnchorA = function () {
      return this.m_target;
   }
   b2MouseJoint.prototype.GetAnchorB = function () {
      return this.m_bodyB.GetWorldPoint(this.m_localAnchor);
   }
   b2MouseJoint.prototype.GetReactionForce = function (inv_dt) {
      if (inv_dt === undefined) inv_dt = 0;
      return new b2Vec2(inv_dt * this.m_impulse.x, inv_dt * this.m_impulse.y);
   }
   b2MouseJoint.prototype.GetReactionTorque = function (inv_dt) {
      if (inv_dt === undefined) inv_dt = 0;
      return 0.0;
   }
   b2MouseJoint.prototype.GetTarget = function () {
      return this.m_target;
   }
   b2MouseJoint.prototype.SetTarget = function (target) {
      if (this.m_bodyB.IsAwake() == false) {
         this.m_bodyB.SetAwake(true);
      }
      this.m_target = target;
   }
   b2MouseJoint.prototype.GetMaxForce = function () {
      return this.m_maxForce;
   }
   b2MouseJoint.prototype.SetMaxForce = function (maxForce) {
      if (maxForce === undefined) maxForce = 0;
      this.m_maxForce = maxForce;
   }
   b2MouseJoint.prototype.GetFrequency = function () {
      return this.m_frequencyHz;
   }
   b2MouseJoint.prototype.SetFrequency = function (hz) {
      if (hz === undefined) hz = 0;
      this.m_frequencyHz = hz;
   }
   b2MouseJoint.prototype.GetDampingRatio = function () {
      return this.m_dampingRatio;
   }
   b2MouseJoint.prototype.SetDampingRatio = function (ratio) {
      if (ratio === undefined) ratio = 0;
      this.m_dampingRatio = ratio;
   }
   b2MouseJoint.prototype.b2MouseJoint = function (def) {
      this.__super.b2Joint.call(this, def);
      this.m_target.SetV(def.target);
      var tX = this.m_target.x - this.m_bodyB.m_xf.position.x;
      var tY = this.m_target.y - this.m_bodyB.m_xf.position.y;
      var tMat = this.m_bodyB.m_xf.R;
      this.m_localAnchor.x = (tX * tMat.col1.x + tY * tMat.col1.y);
      this.m_localAnchor.y = (tX * tMat.col2.x + tY * tMat.col2.y);
      this.m_maxForce = def.maxForce;
      this.m_impulse.SetZero();
      this.m_frequencyHz = def.frequencyHz;
      this.m_dampingRatio = def.dampingRatio;
      this.m_beta = 0.0;
      this.m_gamma = 0.0;
   }
   b2MouseJoint.prototype.InitVelocityConstraints = function (step) {
      var b = this.m_bodyB;
      var mass = b.GetMass();
      var omega = 2.0 * Math.PI * this.m_frequencyHz;
      var d = 2.0 * mass * this.m_dampingRatio * omega;
      var k = mass * omega * omega;
      this.m_gamma = step.dt * (d + step.dt * k);
      this.m_gamma = this.m_gamma != 0 ? 1 / this.m_gamma : 0.0;
      this.m_beta = step.dt * k * this.m_gamma;
      var tMat;tMat = b.m_xf.R;
      var rX = this.m_localAnchor.x - b.m_sweep.localCenter.x;
      var rY = this.m_localAnchor.y - b.m_sweep.localCenter.y;
      var tX = (tMat.col1.x * rX + tMat.col2.x * rY);rY = (tMat.col1.y * rX + tMat.col2.y * rY);
      rX = tX;
      var invMass = b.m_invMass;
      var invI = b.m_invI;this.K1.col1.x = invMass;
      this.K1.col2.x = 0.0;
      this.K1.col1.y = 0.0;
      this.K1.col2.y = invMass;
      this.K2.col1.x = invI * rY * rY;
      this.K2.col2.x = (-invI * rX * rY);
      this.K2.col1.y = (-invI * rX * rY);
      this.K2.col2.y = invI * rX * rX;
      this.K.SetM(this.K1);
      this.K.AddM(this.K2);
      this.K.col1.x += this.m_gamma;
      this.K.col2.y += this.m_gamma;
      this.K.GetInverse(this.m_mass);
      this.m_C.x = b.m_sweep.c.x + rX - this.m_target.x;
      this.m_C.y = b.m_sweep.c.y + rY - this.m_target.y;
      b.m_angularVelocity *= 0.98;
      this.m_impulse.x *= step.dtRatio;
      this.m_impulse.y *= step.dtRatio;
      b.m_linearVelocity.x += invMass * this.m_impulse.x;
      b.m_linearVelocity.y += invMass * this.m_impulse.y;
      b.m_angularVelocity += invI * (rX * this.m_impulse.y - rY * this.m_impulse.x);
   }
   b2MouseJoint.prototype.SolveVelocityConstraints = function (step) {
      var b = this.m_bodyB;
      var tMat;
      var tX = 0;
      var tY = 0;
      tMat = b.m_xf.R;
      var rX = this.m_localAnchor.x - b.m_sweep.localCenter.x;
      var rY = this.m_localAnchor.y - b.m_sweep.localCenter.y;
      tX = (tMat.col1.x * rX + tMat.col2.x * rY);
      rY = (tMat.col1.y * rX + tMat.col2.y * rY);
      rX = tX;
      var CdotX = b.m_linearVelocity.x + ((-b.m_angularVelocity * rY));
      var CdotY = b.m_linearVelocity.y + (b.m_angularVelocity * rX);
      tMat = this.m_mass;
      tX = CdotX + this.m_beta * this.m_C.x + this.m_gamma * this.m_impulse.x;
      tY = CdotY + this.m_beta * this.m_C.y + this.m_gamma * this.m_impulse.y;
      var impulseX = (-(tMat.col1.x * tX + tMat.col2.x * tY));
      var impulseY = (-(tMat.col1.y * tX + tMat.col2.y * tY));
      var oldImpulseX = this.m_impulse.x;
      var oldImpulseY = this.m_impulse.y;
      this.m_impulse.x += impulseX;
      this.m_impulse.y += impulseY;
      var maxImpulse = step.dt * this.m_maxForce;
      if (this.m_impulse.LengthSquared() > maxImpulse * maxImpulse) {
         this.m_impulse.Multiply(maxImpulse / this.m_impulse.Length());
      }
      impulseX = this.m_impulse.x - oldImpulseX;
      impulseY = this.m_impulse.y - oldImpulseY;
      b.m_linearVelocity.x += b.m_invMass * impulseX;
      b.m_linearVelocity.y += b.m_invMass * impulseY;
      b.m_angularVelocity += b.m_invI * (rX * impulseY - rY * impulseX);
   }
   b2MouseJoint.prototype.SolvePositionConstraints = function (baumgarte) {
      if (baumgarte === undefined) baumgarte = 0;
      return true;
   }
   Box2D.inherit(b2MouseJointDef, Box2D.Dynamics.Joints.b2JointDef);
   b2MouseJointDef.prototype.__super = Box2D.Dynamics.Joints.b2JointDef.prototype;
   b2MouseJointDef.b2MouseJointDef = function () {
      Box2D.Dynamics.Joints.b2JointDef.b2JointDef.apply(this, arguments);
      this.target = new b2Vec2(0, 0);
   };
   b2MouseJointDef.prototype.b2MouseJointDef = function () {
      this.__super.b2JointDef.call(this);
      this.type = b2Joint.e_mouseJoint;
      this.maxForce = 0.0;
      this.frequencyHz = 5.0;
      this.dampingRatio = 0.7;
   }
   Box2D.inherit(b2PrismaticJoint, Box2D.Dynamics.Joints.b2Joint);
   b2PrismaticJoint.prototype.__super = Box2D.Dynamics.Joints.b2Joint.prototype;
   b2PrismaticJoint.b2PrismaticJoint = function () {
      Box2D.Dynamics.Joints.b2Joint.b2Joint.apply(this, arguments);
      this.m_localAnchor1 = new b2Vec2(0, 0);
      this.m_localAnchor2 = new b2Vec2(0, 0);
      this.m_localXAxis1 = new b2Vec2(0, 0);
      this.m_localYAxis1 = new b2Vec2(0, 0);
      this.m_axis = new b2Vec2(0, 0);
      this.m_perp = new b2Vec2(0, 0);
      this.m_K = new b2Mat33();
      this.m_impulse = new b2Vec3();
   };
   b2PrismaticJoint.prototype.GetAnchorA = function () {
      return this.m_bodyA.GetWorldPoint(this.m_localAnchor1);
   }
   b2PrismaticJoint.prototype.GetAnchorB = function () {
      return this.m_bodyB.GetWorldPoint(this.m_localAnchor2);
   }
   b2PrismaticJoint.prototype.GetReactionForce = function (inv_dt) {
      if (inv_dt === undefined) inv_dt = 0;
      return new b2Vec2(inv_dt * (this.m_impulse.x * this.m_perp.x + (this.m_motorImpulse + this.m_impulse.z) * this.m_axis.x), inv_dt * (this.m_impulse.x * this.m_perp.y + (this.m_motorImpulse + this.m_impulse.z) * this.m_axis.y));
   }
   b2PrismaticJoint.prototype.GetReactionTorque = function (inv_dt) {
      if (inv_dt === undefined) inv_dt = 0;
      return inv_dt * this.m_impulse.y;
   }
   b2PrismaticJoint.prototype.GetJointTranslation = function () {
      var bA = this.m_bodyA;
      var bB = this.m_bodyB;
      var tMat;
      var p1 = bA.GetWorldPoint(this.m_localAnchor1);
      var p2 = bB.GetWorldPoint(this.m_localAnchor2);
      var dX = p2.x - p1.x;
      var dY = p2.y - p1.y;
      var axis = bA.GetWorldVector(this.m_localXAxis1);
      var translation = axis.x * dX + axis.y * dY;
      return translation;
   }
   b2PrismaticJoint.prototype.GetJointSpeed = function () {
      var bA = this.m_bodyA;
      var bB = this.m_bodyB;
      var tMat;
      tMat = bA.m_xf.R;
      var r1X = this.m_localAnchor1.x - bA.m_sweep.localCenter.x;
      var r1Y = this.m_localAnchor1.y - bA.m_sweep.localCenter.y;
      var tX = (tMat.col1.x * r1X + tMat.col2.x * r1Y);
      r1Y = (tMat.col1.y * r1X + tMat.col2.y * r1Y);
      r1X = tX;
      tMat = bB.m_xf.R;
      var r2X = this.m_localAnchor2.x - bB.m_sweep.localCenter.x;
      var r2Y = this.m_localAnchor2.y - bB.m_sweep.localCenter.y;
      tX = (tMat.col1.x * r2X + tMat.col2.x * r2Y);
      r2Y = (tMat.col1.y * r2X + tMat.col2.y * r2Y);
      r2X = tX;
      var p1X = bA.m_sweep.c.x + r1X;
      var p1Y = bA.m_sweep.c.y + r1Y;
      var p2X = bB.m_sweep.c.x + r2X;
      var p2Y = bB.m_sweep.c.y + r2Y;
      var dX = p2X - p1X;
      var dY = p2Y - p1Y;
      var axis = bA.GetWorldVector(this.m_localXAxis1);
      var v1 = bA.m_linearVelocity;
      var v2 = bB.m_linearVelocity;
      var w1 = bA.m_angularVelocity;
      var w2 = bB.m_angularVelocity;
      var speed = (dX * ((-w1 * axis.y)) + dY * (w1 * axis.x)) + (axis.x * (((v2.x + ((-w2 * r2Y))) - v1.x) - ((-w1 * r1Y))) + axis.y * (((v2.y + (w2 * r2X)) - v1.y) - (w1 * r1X)));
      return speed;
   }
   b2PrismaticJoint.prototype.IsLimitEnabled = function () {
      return this.m_enableLimit;
   }
   b2PrismaticJoint.prototype.EnableLimit = function (flag) {
      this.m_bodyA.SetAwake(true);
      this.m_bodyB.SetAwake(true);
      this.m_enableLimit = flag;
   }
   b2PrismaticJoint.prototype.GetLowerLimit = function () {
      return this.m_lowerTranslation;
   }
   b2PrismaticJoint.prototype.GetUpperLimit = function () {
      return this.m_upperTranslation;
   }
   b2PrismaticJoint.prototype.SetLimits = function (lower, upper) {
      if (lower === undefined) lower = 0;
      if (upper === undefined) upper = 0;
      this.m_bodyA.SetAwake(true);
      this.m_bodyB.SetAwake(true);
      this.m_lowerTranslation = lower;
      this.m_upperTranslation = upper;
   }
   b2PrismaticJoint.prototype.IsMotorEnabled = function () {
      return this.m_enableMotor;
   }
   b2PrismaticJoint.prototype.EnableMotor = function (flag) {
      this.m_bodyA.SetAwake(true);
      this.m_bodyB.SetAwake(true);
      this.m_enableMotor = flag;
   }
   b2PrismaticJoint.prototype.SetMotorSpeed = function (speed) {
      if (speed === undefined) speed = 0;
      this.m_bodyA.SetAwake(true);
      this.m_bodyB.SetAwake(true);
      this.m_motorSpeed = speed;
   }
   b2PrismaticJoint.prototype.GetMotorSpeed = function () {
      return this.m_motorSpeed;
   }
   b2PrismaticJoint.prototype.SetMaxMotorForce = function (force) {
      if (force === undefined) force = 0;
      this.m_bodyA.SetAwake(true);
      this.m_bodyB.SetAwake(true);
      this.m_maxMotorForce = force;
   }
   b2PrismaticJoint.prototype.GetMotorForce = function () {
      return this.m_motorImpulse;
   }
   b2PrismaticJoint.prototype.b2PrismaticJoint = function (def) {
      this.__super.b2Joint.call(this, def);
      var tMat;
      var tX = 0;
      var tY = 0;
      this.m_localAnchor1.SetV(def.localAnchorA);
      this.m_localAnchor2.SetV(def.localAnchorB);
      this.m_localXAxis1.SetV(def.localAxisA);
      this.m_localYAxis1.x = (-this.m_localXAxis1.y);
      this.m_localYAxis1.y = this.m_localXAxis1.x;
      this.m_refAngle = def.referenceAngle;
      this.m_impulse.SetZero();
      this.m_motorMass = 0.0;
      this.m_motorImpulse = 0.0;
      this.m_lowerTranslation = def.lowerTranslation;
      this.m_upperTranslation = def.upperTranslation;
      this.m_maxMotorForce = def.maxMotorForce;
      this.m_motorSpeed = def.motorSpeed;
      this.m_enableLimit = def.enableLimit;
      this.m_enableMotor = def.enableMotor;
      this.m_limitState = b2Joint.e_inactiveLimit;
      this.m_axis.SetZero();
      this.m_perp.SetZero();
   }
   b2PrismaticJoint.prototype.InitVelocityConstraints = function (step) {
      var bA = this.m_bodyA;
      var bB = this.m_bodyB;
      var tMat;
      var tX = 0;
      this.m_localCenterA.SetV(bA.GetLocalCenter());
      this.m_localCenterB.SetV(bB.GetLocalCenter());
      var xf1 = bA.GetTransform();
      var xf2 = bB.GetTransform();
      tMat = bA.m_xf.R;
      var r1X = this.m_localAnchor1.x - this.m_localCenterA.x;
      var r1Y = this.m_localAnchor1.y - this.m_localCenterA.y;
      tX = (tMat.col1.x * r1X + tMat.col2.x * r1Y);
      r1Y = (tMat.col1.y * r1X + tMat.col2.y * r1Y);
      r1X = tX;
      tMat = bB.m_xf.R;
      var r2X = this.m_localAnchor2.x - this.m_localCenterB.x;
      var r2Y = this.m_localAnchor2.y - this.m_localCenterB.y;
      tX = (tMat.col1.x * r2X + tMat.col2.x * r2Y);
      r2Y = (tMat.col1.y * r2X + tMat.col2.y * r2Y);
      r2X = tX;
      var dX = bB.m_sweep.c.x + r2X - bA.m_sweep.c.x - r1X;
      var dY = bB.m_sweep.c.y + r2Y - bA.m_sweep.c.y - r1Y;
      this.m_invMassA = bA.m_invMass;
      this.m_invMassB = bB.m_invMass;
      this.m_invIA = bA.m_invI;
      this.m_invIB = bB.m_invI; {
         this.m_axis.SetV(b2Math.MulMV(xf1.R, this.m_localXAxis1));
         this.m_a1 = (dX + r1X) * this.m_axis.y - (dY + r1Y) * this.m_axis.x;
         this.m_a2 = r2X * this.m_axis.y - r2Y * this.m_axis.x;
         this.m_motorMass = this.m_invMassA + this.m_invMassB + this.m_invIA * this.m_a1 * this.m_a1 + this.m_invIB * this.m_a2 * this.m_a2;
         if (this.m_motorMass > Number.MIN_VALUE) this.m_motorMass = 1.0 / this.m_motorMass;
      } {
         this.m_perp.SetV(b2Math.MulMV(xf1.R, this.m_localYAxis1));
         this.m_s1 = (dX + r1X) * this.m_perp.y - (dY + r1Y) * this.m_perp.x;
         this.m_s2 = r2X * this.m_perp.y - r2Y * this.m_perp.x;
         var m1 = this.m_invMassA;
         var m2 = this.m_invMassB;
         var i1 = this.m_invIA;
         var i2 = this.m_invIB;
         this.m_K.col1.x = m1 + m2 + i1 * this.m_s1 * this.m_s1 + i2 * this.m_s2 * this.m_s2;
         this.m_K.col1.y = i1 * this.m_s1 + i2 * this.m_s2;
         this.m_K.col1.z = i1 * this.m_s1 * this.m_a1 + i2 * this.m_s2 * this.m_a2;
         this.m_K.col2.x = this.m_K.col1.y;
         this.m_K.col2.y = i1 + i2;
         this.m_K.col2.z = i1 * this.m_a1 + i2 * this.m_a2;
         this.m_K.col3.x = this.m_K.col1.z;
         this.m_K.col3.y = this.m_K.col2.z;
         this.m_K.col3.z = m1 + m2 + i1 * this.m_a1 * this.m_a1 + i2 * this.m_a2 * this.m_a2;
      }
      if (this.m_enableLimit) {
         var jointTransition = this.m_axis.x * dX + this.m_axis.y * dY;
         if (b2Math.Abs(this.m_upperTranslation - this.m_lowerTranslation) < 2.0 * b2Settings.b2_linearSlop) {
            this.m_limitState = b2Joint.e_equalLimits;
         }
         else if (jointTransition <= this.m_lowerTranslation) {
            if (this.m_limitState != b2Joint.e_atLowerLimit) {
               this.m_limitState = b2Joint.e_atLowerLimit;
               this.m_impulse.z = 0.0;
            }
         }
         else if (jointTransition >= this.m_upperTranslation) {
            if (this.m_limitState != b2Joint.e_atUpperLimit) {
               this.m_limitState = b2Joint.e_atUpperLimit;
               this.m_impulse.z = 0.0;
            }
         }
         else {
            this.m_limitState = b2Joint.e_inactiveLimit;
            this.m_impulse.z = 0.0;
         }
      }
      else {
         this.m_limitState = b2Joint.e_inactiveLimit;
      }
      if (this.m_enableMotor == false) {
         this.m_motorImpulse = 0.0;
      }
      if (step.warmStarting) {
         this.m_impulse.x *= step.dtRatio;
         this.m_impulse.y *= step.dtRatio;
         this.m_motorImpulse *= step.dtRatio;
         var PX = this.m_impulse.x * this.m_perp.x + (this.m_motorImpulse + this.m_impulse.z) * this.m_axis.x;
         var PY = this.m_impulse.x * this.m_perp.y + (this.m_motorImpulse + this.m_impulse.z) * this.m_axis.y;
         var L1 = this.m_impulse.x * this.m_s1 + this.m_impulse.y + (this.m_motorImpulse + this.m_impulse.z) * this.m_a1;
         var L2 = this.m_impulse.x * this.m_s2 + this.m_impulse.y + (this.m_motorImpulse + this.m_impulse.z) * this.m_a2;
         bA.m_linearVelocity.x -= this.m_invMassA * PX;
         bA.m_linearVelocity.y -= this.m_invMassA * PY;
         bA.m_angularVelocity -= this.m_invIA * L1;
         bB.m_linearVelocity.x += this.m_invMassB * PX;
         bB.m_linearVelocity.y += this.m_invMassB * PY;
         bB.m_angularVelocity += this.m_invIB * L2;
      }
      else {
         this.m_impulse.SetZero();
         this.m_motorImpulse = 0.0;
      }
   }
   b2PrismaticJoint.prototype.SolveVelocityConstraints = function (step) {
      var bA = this.m_bodyA;
      var bB = this.m_bodyB;
      var v1 = bA.m_linearVelocity;
      var w1 = bA.m_angularVelocity;
      var v2 = bB.m_linearVelocity;
      var w2 = bB.m_angularVelocity;
      var PX = 0;
      var PY = 0;
      var L1 = 0;
      var L2 = 0;
      if (this.m_enableMotor && this.m_limitState != b2Joint.e_equalLimits) {
         var Cdot = this.m_axis.x * (v2.x - v1.x) + this.m_axis.y * (v2.y - v1.y) + this.m_a2 * w2 - this.m_a1 * w1;
         var impulse = this.m_motorMass * (this.m_motorSpeed - Cdot);
         var oldImpulse = this.m_motorImpulse;
         var maxImpulse = step.dt * this.m_maxMotorForce;
         this.m_motorImpulse = b2Math.Clamp(this.m_motorImpulse + impulse, (-maxImpulse), maxImpulse);
         impulse = this.m_motorImpulse - oldImpulse;
         PX = impulse * this.m_axis.x;
         PY = impulse * this.m_axis.y;
         L1 = impulse * this.m_a1;
         L2 = impulse * this.m_a2;
         v1.x -= this.m_invMassA * PX;
         v1.y -= this.m_invMassA * PY;
         w1 -= this.m_invIA * L1;
         v2.x += this.m_invMassB * PX;
         v2.y += this.m_invMassB * PY;
         w2 += this.m_invIB * L2;
      }
      var Cdot1X = this.m_perp.x * (v2.x - v1.x) + this.m_perp.y * (v2.y - v1.y) + this.m_s2 * w2 - this.m_s1 * w1;
      var Cdot1Y = w2 - w1;
      if (this.m_enableLimit && this.m_limitState != b2Joint.e_inactiveLimit) {
         var Cdot2 = this.m_axis.x * (v2.x - v1.x) + this.m_axis.y * (v2.y - v1.y) + this.m_a2 * w2 - this.m_a1 * w1;
         var f1 = this.m_impulse.Copy();
         var df = this.m_K.Solve33(new b2Vec3(), (-Cdot1X), (-Cdot1Y), (-Cdot2));
         this.m_impulse.Add(df);
         if (this.m_limitState == b2Joint.e_atLowerLimit) {
            this.m_impulse.z = b2Math.Max(this.m_impulse.z, 0.0);
         }
         else if (this.m_limitState == b2Joint.e_atUpperLimit) {
            this.m_impulse.z = b2Math.Min(this.m_impulse.z, 0.0);
         }
         var bX = (-Cdot1X) - (this.m_impulse.z - f1.z) * this.m_K.col3.x;
         var bY = (-Cdot1Y) - (this.m_impulse.z - f1.z) * this.m_K.col3.y;
         var f2r = this.m_K.Solve22(new b2Vec2(0, 0), bX, bY);
         f2r.x += f1.x;
         f2r.y += f1.y;
         this.m_impulse.x = f2r.x;
         this.m_impulse.y = f2r.y;
         df.x = this.m_impulse.x - f1.x;
         df.y = this.m_impulse.y - f1.y;
         df.z = this.m_impulse.z - f1.z;
         PX = df.x * this.m_perp.x + df.z * this.m_axis.x;
         PY = df.x * this.m_perp.y + df.z * this.m_axis.y;
         L1 = df.x * this.m_s1 + df.y + df.z * this.m_a1;
         L2 = df.x * this.m_s2 + df.y + df.z * this.m_a2;
         v1.x -= this.m_invMassA * PX;
         v1.y -= this.m_invMassA * PY;
         w1 -= this.m_invIA * L1;
         v2.x += this.m_invMassB * PX;
         v2.y += this.m_invMassB * PY;
         w2 += this.m_invIB * L2;
      }
      else {
         var df2 = this.m_K.Solve22(new b2Vec2(0, 0), (-Cdot1X), (-Cdot1Y));
         this.m_impulse.x += df2.x;
         this.m_impulse.y += df2.y;
         PX = df2.x * this.m_perp.x;
         PY = df2.x * this.m_perp.y;
         L1 = df2.x * this.m_s1 + df2.y;
         L2 = df2.x * this.m_s2 + df2.y;
         v1.x -= this.m_invMassA * PX;
         v1.y -= this.m_invMassA * PY;
         w1 -= this.m_invIA * L1;
         v2.x += this.m_invMassB * PX;
         v2.y += this.m_invMassB * PY;
         w2 += this.m_invIB * L2;
      }
      bA.m_linearVelocity.SetV(v1);
      bA.m_angularVelocity = w1;
      bB.m_linearVelocity.SetV(v2);
      bB.m_angularVelocity = w2;
   }
   b2PrismaticJoint.prototype.SolvePositionConstraints = function (baumgarte) {
      if (baumgarte === undefined) baumgarte = 0;
      var limitC = 0;
      var oldLimitImpulse = 0;
      var bA = this.m_bodyA;
      var bB = this.m_bodyB;
      var c1 = bA.m_sweep.c;
      var a1 = bA.m_sweep.a;
      var c2 = bB.m_sweep.c;
      var a2 = bB.m_sweep.a;
      var tMat;
      var tX = 0;
      var m1 = 0;
      var m2 = 0;
      var i1 = 0;
      var i2 = 0;
      var linearError = 0.0;
      var angularError = 0.0;
      var active = false;
      var C2 = 0.0;
      var R1 = b2Mat22.FromAngle(a1);
      var R2 = b2Mat22.FromAngle(a2);
      tMat = R1;
      var r1X = this.m_localAnchor1.x - this.m_localCenterA.x;
      var r1Y = this.m_localAnchor1.y - this.m_localCenterA.y;
      tX = (tMat.col1.x * r1X + tMat.col2.x * r1Y);
      r1Y = (tMat.col1.y * r1X + tMat.col2.y * r1Y);
      r1X = tX;
      tMat = R2;
      var r2X = this.m_localAnchor2.x - this.m_localCenterB.x;
      var r2Y = this.m_localAnchor2.y - this.m_localCenterB.y;
      tX = (tMat.col1.x * r2X + tMat.col2.x * r2Y);
      r2Y = (tMat.col1.y * r2X + tMat.col2.y * r2Y);
      r2X = tX;
      var dX = c2.x + r2X - c1.x - r1X;
      var dY = c2.y + r2Y - c1.y - r1Y;
      if (this.m_enableLimit) {
         this.m_axis = b2Math.MulMV(R1, this.m_localXAxis1);
         this.m_a1 = (dX + r1X) * this.m_axis.y - (dY + r1Y) * this.m_axis.x;
         this.m_a2 = r2X * this.m_axis.y - r2Y * this.m_axis.x;
         var translation = this.m_axis.x * dX + this.m_axis.y * dY;
         if (b2Math.Abs(this.m_upperTranslation - this.m_lowerTranslation) < 2.0 * b2Settings.b2_linearSlop) {
            C2 = b2Math.Clamp(translation, (-b2Settings.b2_maxLinearCorrection), b2Settings.b2_maxLinearCorrection);
            linearError = b2Math.Abs(translation);
            active = true;
         }
         else if (translation <= this.m_lowerTranslation) {
            C2 = b2Math.Clamp(translation - this.m_lowerTranslation + b2Settings.b2_linearSlop, (-b2Settings.b2_maxLinearCorrection), 0.0);
            linearError = this.m_lowerTranslation - translation;
            active = true;
         }
         else if (translation >= this.m_upperTranslation) {
            C2 = b2Math.Clamp(translation - this.m_upperTranslation + b2Settings.b2_linearSlop, 0.0, b2Settings.b2_maxLinearCorrection);
            linearError = translation - this.m_upperTranslation;
            active = true;
         }
      }
      this.m_perp = b2Math.MulMV(R1, this.m_localYAxis1);
      this.m_s1 = (dX + r1X) * this.m_perp.y - (dY + r1Y) * this.m_perp.x;
      this.m_s2 = r2X * this.m_perp.y - r2Y * this.m_perp.x;
      var impulse = new b2Vec3();
      var C1X = this.m_perp.x * dX + this.m_perp.y * dY;
      var C1Y = a2 - a1 - this.m_refAngle;
      linearError = b2Math.Max(linearError, b2Math.Abs(C1X));
      angularError = b2Math.Abs(C1Y);
      if (active) {
         m1 = this.m_invMassA;
         m2 = this.m_invMassB;
         i1 = this.m_invIA;
         i2 = this.m_invIB;
         this.m_K.col1.x = m1 + m2 + i1 * this.m_s1 * this.m_s1 + i2 * this.m_s2 * this.m_s2;
         this.m_K.col1.y = i1 * this.m_s1 + i2 * this.m_s2;
         this.m_K.col1.z = i1 * this.m_s1 * this.m_a1 + i2 * this.m_s2 * this.m_a2;
         this.m_K.col2.x = this.m_K.col1.y;
         this.m_K.col2.y = i1 + i2;
         this.m_K.col2.z = i1 * this.m_a1 + i2 * this.m_a2;
         this.m_K.col3.x = this.m_K.col1.z;
         this.m_K.col3.y = this.m_K.col2.z;
         this.m_K.col3.z = m1 + m2 + i1 * this.m_a1 * this.m_a1 + i2 * this.m_a2 * this.m_a2;
         this.m_K.Solve33(impulse, (-C1X), (-C1Y), (-C2));
      }
      else {
         m1 = this.m_invMassA;
         m2 = this.m_invMassB;
         i1 = this.m_invIA;
         i2 = this.m_invIB;
         var k11 = m1 + m2 + i1 * this.m_s1 * this.m_s1 + i2 * this.m_s2 * this.m_s2;
         var k12 = i1 * this.m_s1 + i2 * this.m_s2;
         var k22 = i1 + i2;
         this.m_K.col1.Set(k11, k12, 0.0);
         this.m_K.col2.Set(k12, k22, 0.0);
         var impulse1 = this.m_K.Solve22(new b2Vec2(0, 0), (-C1X), (-C1Y));
         impulse.x = impulse1.x;
         impulse.y = impulse1.y;
         impulse.z = 0.0;
      }
      var PX = impulse.x * this.m_perp.x + impulse.z * this.m_axis.x;
      var PY = impulse.x * this.m_perp.y + impulse.z * this.m_axis.y;
      var L1 = impulse.x * this.m_s1 + impulse.y + impulse.z * this.m_a1;
      var L2 = impulse.x * this.m_s2 + impulse.y + impulse.z * this.m_a2;
      c1.x -= this.m_invMassA * PX;
      c1.y -= this.m_invMassA * PY;
      a1 -= this.m_invIA * L1;
      c2.x += this.m_invMassB * PX;
      c2.y += this.m_invMassB * PY;
      a2 += this.m_invIB * L2;
      bA.m_sweep.a = a1;
      bB.m_sweep.a = a2;
      bA.SynchronizeTransform();
      bB.SynchronizeTransform();
      return linearError <= b2Settings.b2_linearSlop && angularError <= b2Settings.b2_angularSlop;
   }
   Box2D.inherit(b2PrismaticJointDef, Box2D.Dynamics.Joints.b2JointDef);
   b2PrismaticJointDef.prototype.__super = Box2D.Dynamics.Joints.b2JointDef.prototype;
   b2PrismaticJointDef.b2PrismaticJointDef = function () {
      Box2D.Dynamics.Joints.b2JointDef.b2JointDef.apply(this, arguments);
      this.localAnchorA = new b2Vec2(0, 0);
      this.localAnchorB = new b2Vec2(0, 0);
      this.localAxisA = new b2Vec2(0, 0);
   };
   b2PrismaticJointDef.prototype.b2PrismaticJointDef = function () {
      this.__super.b2JointDef.call(this);
      this.type = b2Joint.e_prismaticJoint;
      this.localAxisA.Set(1.0, 0.0);
      this.referenceAngle = 0.0;
      this.enableLimit = false;
      this.lowerTranslation = 0.0;
      this.upperTranslation = 0.0;
      this.enableMotor = false;
      this.maxMotorForce = 0.0;
      this.motorSpeed = 0.0;
   }
   b2PrismaticJointDef.prototype.Initialize = function (bA, bB, anchor, axis) {
      this.bodyA = bA;
      this.bodyB = bB;
      this.localAnchorA = this.bodyA.GetLocalPoint(anchor);
      this.localAnchorB = this.bodyB.GetLocalPoint(anchor);
      this.localAxisA = this.bodyA.GetLocalVector(axis);
      this.referenceAngle = this.bodyB.GetAngle() - this.bodyA.GetAngle();
   }
   Box2D.inherit(b2PulleyJoint, Box2D.Dynamics.Joints.b2Joint);
   b2PulleyJoint.prototype.__super = Box2D.Dynamics.Joints.b2Joint.prototype;
   b2PulleyJoint.b2PulleyJoint = function () {
      Box2D.Dynamics.Joints.b2Joint.b2Joint.apply(this, arguments);
      this.m_groundAnchor1 = new b2Vec2(0, 0);
      this.m_groundAnchor2 = new b2Vec2(0, 0);
      this.m_localAnchor1 = new b2Vec2(0, 0);
      this.m_localAnchor2 = new b2Vec2(0, 0);
      this.m_u1 = new b2Vec2(0, 0);
      this.m_u2 = new b2Vec2(0, 0);
   };
   b2PulleyJoint.prototype.GetAnchorA = function () {
      return this.m_bodyA.GetWorldPoint(this.m_localAnchor1);
   }
   b2PulleyJoint.prototype.GetAnchorB = function () {
      return this.m_bodyB.GetWorldPoint(this.m_localAnchor2);
   }
   b2PulleyJoint.prototype.GetReactionForce = function (inv_dt) {
      if (inv_dt === undefined) inv_dt = 0;
      return new b2Vec2(inv_dt * this.m_impulse * this.m_u2.x, inv_dt * this.m_impulse * this.m_u2.y);
   }
   b2PulleyJoint.prototype.GetReactionTorque = function (inv_dt) {
      if (inv_dt === undefined) inv_dt = 0;
      return 0.0;
   }
   b2PulleyJoint.prototype.GetGroundAnchorA = function () {
      var a = this.m_ground.m_xf.position.Copy();
      a.Add(this.m_groundAnchor1);
      return a;
   }
   b2PulleyJoint.prototype.GetGroundAnchorB = function () {
      var a = this.m_ground.m_xf.position.Copy();
      a.Add(this.m_groundAnchor2);
      return a;
   }
   b2PulleyJoint.prototype.GetLength1 = function () {
      var p = this.m_bodyA.GetWorldPoint(this.m_localAnchor1);
      var sX = this.m_ground.m_xf.position.x + this.m_groundAnchor1.x;
      var sY = this.m_ground.m_xf.position.y + this.m_groundAnchor1.y;
      var dX = p.x - sX;
      var dY = p.y - sY;
      return Math.sqrt(dX * dX + dY * dY);
   }
   b2PulleyJoint.prototype.GetLength2 = function () {
      var p = this.m_bodyB.GetWorldPoint(this.m_localAnchor2);
      var sX = this.m_ground.m_xf.position.x + this.m_groundAnchor2.x;
      var sY = this.m_ground.m_xf.position.y + this.m_groundAnchor2.y;
      var dX = p.x - sX;
      var dY = p.y - sY;
      return Math.sqrt(dX * dX + dY * dY);
   }
   b2PulleyJoint.prototype.GetRatio = function () {
      return this.m_ratio;
   }
   b2PulleyJoint.prototype.b2PulleyJoint = function (def) {
      this.__super.b2Joint.call(this, def);
      var tMat;
      var tX = 0;
      var tY = 0;
      this.m_ground = this.m_bodyA.m_world.m_groundBody;
      this.m_groundAnchor1.x = def.groundAnchorA.x - this.m_ground.m_xf.position.x;
      this.m_groundAnchor1.y = def.groundAnchorA.y - this.m_ground.m_xf.position.y;
      this.m_groundAnchor2.x = def.groundAnchorB.x - this.m_ground.m_xf.position.x;
      this.m_groundAnchor2.y = def.groundAnchorB.y - this.m_ground.m_xf.position.y;
      this.m_localAnchor1.SetV(def.localAnchorA);
      this.m_localAnchor2.SetV(def.localAnchorB);
      this.m_ratio = def.ratio;
      this.m_constant = def.lengthA + this.m_ratio * def.lengthB;
      this.m_maxLength1 = b2Math.Min(def.maxLengthA, this.m_constant - this.m_ratio * b2PulleyJoint.b2_minPulleyLength);
      this.m_maxLength2 = b2Math.Min(def.maxLengthB, (this.m_constant - b2PulleyJoint.b2_minPulleyLength) / this.m_ratio);
      this.m_impulse = 0.0;
      this.m_limitImpulse1 = 0.0;
      this.m_limitImpulse2 = 0.0;
   }
   b2PulleyJoint.prototype.InitVelocityConstraints = function (step) {
      var bA = this.m_bodyA;
      var bB = this.m_bodyB;
      var tMat;
      tMat = bA.m_xf.R;
      var r1X = this.m_localAnchor1.x - bA.m_sweep.localCenter.x;
      var r1Y = this.m_localAnchor1.y - bA.m_sweep.localCenter.y;
      var tX = (tMat.col1.x * r1X + tMat.col2.x * r1Y);
      r1Y = (tMat.col1.y * r1X + tMat.col2.y * r1Y);
      r1X = tX;
      tMat = bB.m_xf.R;
      var r2X = this.m_localAnchor2.x - bB.m_sweep.localCenter.x;
      var r2Y = this.m_localAnchor2.y - bB.m_sweep.localCenter.y;
      tX = (tMat.col1.x * r2X + tMat.col2.x * r2Y);
      r2Y = (tMat.col1.y * r2X + tMat.col2.y * r2Y);
      r2X = tX;
      var p1X = bA.m_sweep.c.x + r1X;
      var p1Y = bA.m_sweep.c.y + r1Y;
      var p2X = bB.m_sweep.c.x + r2X;
      var p2Y = bB.m_sweep.c.y + r2Y;
      var s1X = this.m_ground.m_xf.position.x + this.m_groundAnchor1.x;
      var s1Y = this.m_ground.m_xf.position.y + this.m_groundAnchor1.y;
      var s2X = this.m_ground.m_xf.position.x + this.m_groundAnchor2.x;
      var s2Y = this.m_ground.m_xf.position.y + this.m_groundAnchor2.y;
      this.m_u1.Set(p1X - s1X, p1Y - s1Y);
      this.m_u2.Set(p2X - s2X, p2Y - s2Y);
      var length1 = this.m_u1.Length();
      var length2 = this.m_u2.Length();
      if (length1 > b2Settings.b2_linearSlop) {
         this.m_u1.Multiply(1.0 / length1);
      }
      else {
         this.m_u1.SetZero();
      }
      if (length2 > b2Settings.b2_linearSlop) {
         this.m_u2.Multiply(1.0 / length2);
      }
      else {
         this.m_u2.SetZero();
      }
      var C = this.m_constant - length1 - this.m_ratio * length2;
      if (C > 0.0) {
         this.m_state = b2Joint.e_inactiveLimit;
         this.m_impulse = 0.0;
      }
      else {
         this.m_state = b2Joint.e_atUpperLimit;
      }
      if (length1 < this.m_maxLength1) {
         this.m_limitState1 = b2Joint.e_inactiveLimit;
         this.m_limitImpulse1 = 0.0;
      }
      else {
         this.m_limitState1 = b2Joint.e_atUpperLimit;
      }
      if (length2 < this.m_maxLength2) {
         this.m_limitState2 = b2Joint.e_inactiveLimit;
         this.m_limitImpulse2 = 0.0;
      }
      else {
         this.m_limitState2 = b2Joint.e_atUpperLimit;
      }
      var cr1u1 = r1X * this.m_u1.y - r1Y * this.m_u1.x;
      var cr2u2 = r2X * this.m_u2.y - r2Y * this.m_u2.x;
      this.m_limitMass1 = bA.m_invMass + bA.m_invI * cr1u1 * cr1u1;
      this.m_limitMass2 = bB.m_invMass + bB.m_invI * cr2u2 * cr2u2;
      this.m_pulleyMass = this.m_limitMass1 + this.m_ratio * this.m_ratio * this.m_limitMass2;
      this.m_limitMass1 = 1.0 / this.m_limitMass1;
      this.m_limitMass2 = 1.0 / this.m_limitMass2;
      this.m_pulleyMass = 1.0 / this.m_pulleyMass;
      if (step.warmStarting) {
         this.m_impulse *= step.dtRatio;
         this.m_limitImpulse1 *= step.dtRatio;
         this.m_limitImpulse2 *= step.dtRatio;
         var P1X = ((-this.m_impulse) - this.m_limitImpulse1) * this.m_u1.x;
         var P1Y = ((-this.m_impulse) - this.m_limitImpulse1) * this.m_u1.y;
         var P2X = ((-this.m_ratio * this.m_impulse) - this.m_limitImpulse2) * this.m_u2.x;
         var P2Y = ((-this.m_ratio * this.m_impulse) - this.m_limitImpulse2) * this.m_u2.y;
         bA.m_linearVelocity.x += bA.m_invMass * P1X;
         bA.m_linearVelocity.y += bA.m_invMass * P1Y;
         bA.m_angularVelocity += bA.m_invI * (r1X * P1Y - r1Y * P1X);
         bB.m_linearVelocity.x += bB.m_invMass * P2X;
         bB.m_linearVelocity.y += bB.m_invMass * P2Y;
         bB.m_angularVelocity += bB.m_invI * (r2X * P2Y - r2Y * P2X);
      }
      else {
         this.m_impulse = 0.0;
         this.m_limitImpulse1 = 0.0;
         this.m_limitImpulse2 = 0.0;
      }
   }
   b2PulleyJoint.prototype.SolveVelocityConstraints = function (step) {
      var bA = this.m_bodyA;
      var bB = this.m_bodyB;
      var tMat;
      tMat = bA.m_xf.R;
      var r1X = this.m_localAnchor1.x - bA.m_sweep.localCenter.x;
      var r1Y = this.m_localAnchor1.y - bA.m_sweep.localCenter.y;
      var tX = (tMat.col1.x * r1X + tMat.col2.x * r1Y);
      r1Y = (tMat.col1.y * r1X + tMat.col2.y * r1Y);
      r1X = tX;
      tMat = bB.m_xf.R;
      var r2X = this.m_localAnchor2.x - bB.m_sweep.localCenter.x;
      var r2Y = this.m_localAnchor2.y - bB.m_sweep.localCenter.y;
      tX = (tMat.col1.x * r2X + tMat.col2.x * r2Y);
      r2Y = (tMat.col1.y * r2X + tMat.col2.y * r2Y);
      r2X = tX;
      var v1X = 0;
      var v1Y = 0;
      var v2X = 0;
      var v2Y = 0;
      var P1X = 0;
      var P1Y = 0;
      var P2X = 0;
      var P2Y = 0;
      var Cdot = 0;
      var impulse = 0;
      var oldImpulse = 0;
      if (this.m_state == b2Joint.e_atUpperLimit) {
         v1X = bA.m_linearVelocity.x + ((-bA.m_angularVelocity * r1Y));
         v1Y = bA.m_linearVelocity.y + (bA.m_angularVelocity * r1X);
         v2X = bB.m_linearVelocity.x + ((-bB.m_angularVelocity * r2Y));
         v2Y = bB.m_linearVelocity.y + (bB.m_angularVelocity * r2X);
         Cdot = (-(this.m_u1.x * v1X + this.m_u1.y * v1Y)) - this.m_ratio * (this.m_u2.x * v2X + this.m_u2.y * v2Y);
         impulse = this.m_pulleyMass * ((-Cdot));
         oldImpulse = this.m_impulse;
         this.m_impulse = b2Math.Max(0.0, this.m_impulse + impulse);
         impulse = this.m_impulse - oldImpulse;
         P1X = (-impulse * this.m_u1.x);
         P1Y = (-impulse * this.m_u1.y);
         P2X = (-this.m_ratio * impulse * this.m_u2.x);
         P2Y = (-this.m_ratio * impulse * this.m_u2.y);
         bA.m_linearVelocity.x += bA.m_invMass * P1X;
         bA.m_linearVelocity.y += bA.m_invMass * P1Y;
         bA.m_angularVelocity += bA.m_invI * (r1X * P1Y - r1Y * P1X);
         bB.m_linearVelocity.x += bB.m_invMass * P2X;
         bB.m_linearVelocity.y += bB.m_invMass * P2Y;
         bB.m_angularVelocity += bB.m_invI * (r2X * P2Y - r2Y * P2X);
      }
      if (this.m_limitState1 == b2Joint.e_atUpperLimit) {
         v1X = bA.m_linearVelocity.x + ((-bA.m_angularVelocity * r1Y));
         v1Y = bA.m_linearVelocity.y + (bA.m_angularVelocity * r1X);
         Cdot = (-(this.m_u1.x * v1X + this.m_u1.y * v1Y));
         impulse = (-this.m_limitMass1 * Cdot);
         oldImpulse = this.m_limitImpulse1;
         this.m_limitImpulse1 = b2Math.Max(0.0, this.m_limitImpulse1 + impulse);
         impulse = this.m_limitImpulse1 - oldImpulse;
         P1X = (-impulse * this.m_u1.x);
         P1Y = (-impulse * this.m_u1.y);
         bA.m_linearVelocity.x += bA.m_invMass * P1X;
         bA.m_linearVelocity.y += bA.m_invMass * P1Y;
         bA.m_angularVelocity += bA.m_invI * (r1X * P1Y - r1Y * P1X);
      }
      if (this.m_limitState2 == b2Joint.e_atUpperLimit) {
         v2X = bB.m_linearVelocity.x + ((-bB.m_angularVelocity * r2Y));
         v2Y = bB.m_linearVelocity.y + (bB.m_angularVelocity * r2X);
         Cdot = (-(this.m_u2.x * v2X + this.m_u2.y * v2Y));
         impulse = (-this.m_limitMass2 * Cdot);
         oldImpulse = this.m_limitImpulse2;
         this.m_limitImpulse2 = b2Math.Max(0.0, this.m_limitImpulse2 + impulse);
         impulse = this.m_limitImpulse2 - oldImpulse;
         P2X = (-impulse * this.m_u2.x);
         P2Y = (-impulse * this.m_u2.y);
         bB.m_linearVelocity.x += bB.m_invMass * P2X;
         bB.m_linearVelocity.y += bB.m_invMass * P2Y;
         bB.m_angularVelocity += bB.m_invI * (r2X * P2Y - r2Y * P2X);
      }
   }
   b2PulleyJoint.prototype.SolvePositionConstraints = function (baumgarte) {
      if (baumgarte === undefined) baumgarte = 0;
      var bA = this.m_bodyA;
      var bB = this.m_bodyB;
      var tMat;
      var s1X = this.m_ground.m_xf.position.x + this.m_groundAnchor1.x;
      var s1Y = this.m_ground.m_xf.position.y + this.m_groundAnchor1.y;
      var s2X = this.m_ground.m_xf.position.x + this.m_groundAnchor2.x;
      var s2Y = this.m_ground.m_xf.position.y + this.m_groundAnchor2.y;
      var r1X = 0;
      var r1Y = 0;
      var r2X = 0;
      var r2Y = 0;
      var p1X = 0;
      var p1Y = 0;
      var p2X = 0;
      var p2Y = 0;
      var length1 = 0;
      var length2 = 0;
      var C = 0;
      var impulse = 0;
      var oldImpulse = 0;
      var oldLimitPositionImpulse = 0;
      var tX = 0;
      var linearError = 0.0;
      if (this.m_state == b2Joint.e_atUpperLimit) {
         tMat = bA.m_xf.R;
         r1X = this.m_localAnchor1.x - bA.m_sweep.localCenter.x;
         r1Y = this.m_localAnchor1.y - bA.m_sweep.localCenter.y;
         tX = (tMat.col1.x * r1X + tMat.col2.x * r1Y);
         r1Y = (tMat.col1.y * r1X + tMat.col2.y * r1Y);
         r1X = tX;
         tMat = bB.m_xf.R;
         r2X = this.m_localAnchor2.x - bB.m_sweep.localCenter.x;
         r2Y = this.m_localAnchor2.y - bB.m_sweep.localCenter.y;
         tX = (tMat.col1.x * r2X + tMat.col2.x * r2Y);
         r2Y = (tMat.col1.y * r2X + tMat.col2.y * r2Y);
         r2X = tX;
         p1X = bA.m_sweep.c.x + r1X;
         p1Y = bA.m_sweep.c.y + r1Y;
         p2X = bB.m_sweep.c.x + r2X;
         p2Y = bB.m_sweep.c.y + r2Y;
         this.m_u1.Set(p1X - s1X, p1Y - s1Y);
         this.m_u2.Set(p2X - s2X, p2Y - s2Y);
         length1 = this.m_u1.Length();
         length2 = this.m_u2.Length();
         if (length1 > b2Settings.b2_linearSlop) {
            this.m_u1.Multiply(1.0 / length1);
         }
         else {
            this.m_u1.SetZero();
         }
         if (length2 > b2Settings.b2_linearSlop) {
            this.m_u2.Multiply(1.0 / length2);
         }
         else {
            this.m_u2.SetZero();
         }
         C = this.m_constant - length1 - this.m_ratio * length2;
         linearError = b2Math.Max(linearError, (-C));
         C = b2Math.Clamp(C + b2Settings.b2_linearSlop, (-b2Settings.b2_maxLinearCorrection), 0.0);
         impulse = (-this.m_pulleyMass * C);
         p1X = (-impulse * this.m_u1.x);
         p1Y = (-impulse * this.m_u1.y);
         p2X = (-this.m_ratio * impulse * this.m_u2.x);
         p2Y = (-this.m_ratio * impulse * this.m_u2.y);
         bA.m_sweep.c.x += bA.m_invMass * p1X;
         bA.m_sweep.c.y += bA.m_invMass * p1Y;
         bA.m_sweep.a += bA.m_invI * (r1X * p1Y - r1Y * p1X);
         bB.m_sweep.c.x += bB.m_invMass * p2X;
         bB.m_sweep.c.y += bB.m_invMass * p2Y;
         bB.m_sweep.a += bB.m_invI * (r2X * p2Y - r2Y * p2X);
         bA.SynchronizeTransform();
         bB.SynchronizeTransform();
      }
      if (this.m_limitState1 == b2Joint.e_atUpperLimit) {
         tMat = bA.m_xf.R;
         r1X = this.m_localAnchor1.x - bA.m_sweep.localCenter.x;
         r1Y = this.m_localAnchor1.y - bA.m_sweep.localCenter.y;
         tX = (tMat.col1.x * r1X + tMat.col2.x * r1Y);
         r1Y = (tMat.col1.y * r1X + tMat.col2.y * r1Y);
         r1X = tX;
         p1X = bA.m_sweep.c.x + r1X;
         p1Y = bA.m_sweep.c.y + r1Y;
         this.m_u1.Set(p1X - s1X, p1Y - s1Y);
         length1 = this.m_u1.Length();
         if (length1 > b2Settings.b2_linearSlop) {
            this.m_u1.x *= 1.0 / length1;
            this.m_u1.y *= 1.0 / length1;
         }
         else {
            this.m_u1.SetZero();
         }
         C = this.m_maxLength1 - length1;
         linearError = b2Math.Max(linearError, (-C));
         C = b2Math.Clamp(C + b2Settings.b2_linearSlop, (-b2Settings.b2_maxLinearCorrection), 0.0);
         impulse = (-this.m_limitMass1 * C);
         p1X = (-impulse * this.m_u1.x);
         p1Y = (-impulse * this.m_u1.y);
         bA.m_sweep.c.x += bA.m_invMass * p1X;
         bA.m_sweep.c.y += bA.m_invMass * p1Y;
         bA.m_sweep.a += bA.m_invI * (r1X * p1Y - r1Y * p1X);
         bA.SynchronizeTransform();
      }
      if (this.m_limitState2 == b2Joint.e_atUpperLimit) {
         tMat = bB.m_xf.R;
         r2X = this.m_localAnchor2.x - bB.m_sweep.localCenter.x;
         r2Y = this.m_localAnchor2.y - bB.m_sweep.localCenter.y;
         tX = (tMat.col1.x * r2X + tMat.col2.x * r2Y);
         r2Y = (tMat.col1.y * r2X + tMat.col2.y * r2Y);
         r2X = tX;
         p2X = bB.m_sweep.c.x + r2X;
         p2Y = bB.m_sweep.c.y + r2Y;
         this.m_u2.Set(p2X - s2X, p2Y - s2Y);
         length2 = this.m_u2.Length();
         if (length2 > b2Settings.b2_linearSlop) {
            this.m_u2.x *= 1.0 / length2;
            this.m_u2.y *= 1.0 / length2;
         }
         else {
            this.m_u2.SetZero();
         }
         C = this.m_maxLength2 - length2;
         linearError = b2Math.Max(linearError, (-C));
         C = b2Math.Clamp(C + b2Settings.b2_linearSlop, (-b2Settings.b2_maxLinearCorrection), 0.0);
         impulse = (-this.m_limitMass2 * C);
         p2X = (-impulse * this.m_u2.x);
         p2Y = (-impulse * this.m_u2.y);
         bB.m_sweep.c.x += bB.m_invMass * p2X;
         bB.m_sweep.c.y += bB.m_invMass * p2Y;
         bB.m_sweep.a += bB.m_invI * (r2X * p2Y - r2Y * p2X);
         bB.SynchronizeTransform();
      }
      return linearError < b2Settings.b2_linearSlop;
   }
   Box2D.postDefs.push(function () {
      Box2D.Dynamics.Joints.b2PulleyJoint.b2_minPulleyLength = 2.0;
   });
   Box2D.inherit(b2PulleyJointDef, Box2D.Dynamics.Joints.b2JointDef);
   b2PulleyJointDef.prototype.__super = Box2D.Dynamics.Joints.b2JointDef.prototype;
   b2PulleyJointDef.b2PulleyJointDef = function () {
      Box2D.Dynamics.Joints.b2JointDef.b2JointDef.apply(this, arguments);
      this.groundAnchorA = new b2Vec2(0, 0);
      this.groundAnchorB = new b2Vec2(0, 0);
      this.localAnchorA = new b2Vec2(0, 0);
      this.localAnchorB = new b2Vec2(0, 0);
   };
   b2PulleyJointDef.prototype.b2PulleyJointDef = function () {
      this.__super.b2JointDef.call(this);
      this.type = b2Joint.e_pulleyJoint;
      this.groundAnchorA.Set((-1.0), 1.0);
      this.groundAnchorB.Set(1.0, 1.0);
      this.localAnchorA.Set((-1.0), 0.0);
      this.localAnchorB.Set(1.0, 0.0);
      this.lengthA = 0.0;
      this.maxLengthA = 0.0;
      this.lengthB = 0.0;
      this.maxLengthB = 0.0;
      this.ratio = 1.0;
      this.collideConnected = true;
   }
   b2PulleyJointDef.prototype.Initialize = function (bA, bB, gaA, gaB, anchorA, anchorB, r) {
      if (r === undefined) r = 0;
      this.bodyA = bA;
      this.bodyB = bB;
      this.groundAnchorA.SetV(gaA);
      this.groundAnchorB.SetV(gaB);
      this.localAnchorA = this.bodyA.GetLocalPoint(anchorA);
      this.localAnchorB = this.bodyB.GetLocalPoint(anchorB);
      var d1X = anchorA.x - gaA.x;
      var d1Y = anchorA.y - gaA.y;
      this.lengthA = Math.sqrt(d1X * d1X + d1Y * d1Y);
      var d2X = anchorB.x - gaB.x;
      var d2Y = anchorB.y - gaB.y;
      this.lengthB = Math.sqrt(d2X * d2X + d2Y * d2Y);
      this.ratio = r;
      var C = this.lengthA + this.ratio * this.lengthB;
      this.maxLengthA = C - this.ratio * b2PulleyJoint.b2_minPulleyLength;
      this.maxLengthB = (C - b2PulleyJoint.b2_minPulleyLength) / this.ratio;
   }
   Box2D.inherit(b2RevoluteJoint, Box2D.Dynamics.Joints.b2Joint);
   b2RevoluteJoint.prototype.__super = Box2D.Dynamics.Joints.b2Joint.prototype;
   b2RevoluteJoint.b2RevoluteJoint = function () {
      Box2D.Dynamics.Joints.b2Joint.b2Joint.apply(this, arguments);
      this.K = new b2Mat22();
      this.K1 = new b2Mat22();
      this.K2 = new b2Mat22();
      this.K3 = new b2Mat22();
      this.impulse3 = new b2Vec3();
      this.impulse2 = new b2Vec2(0, 0);
      this.reduced = new b2Vec2(0, 0);
      this.m_localAnchor1 = new b2Vec2(0, 0);
      this.m_localAnchor2 = new b2Vec2(0, 0);
      this.m_impulse = new b2Vec3();
      this.m_mass = new b2Mat33();
   };
   b2RevoluteJoint.prototype.GetAnchorA = function () {
      return this.m_bodyA.GetWorldPoint(this.m_localAnchor1);
   }
   b2RevoluteJoint.prototype.GetAnchorB = function () {
      return this.m_bodyB.GetWorldPoint(this.m_localAnchor2);
   }
   b2RevoluteJoint.prototype.GetReactionForce = function (inv_dt) {
      if (inv_dt === undefined) inv_dt = 0;
      return new b2Vec2(inv_dt * this.m_impulse.x, inv_dt * this.m_impulse.y);
   }
   b2RevoluteJoint.prototype.GetReactionTorque = function (inv_dt) {
      if (inv_dt === undefined) inv_dt = 0;
      return inv_dt * this.m_impulse.z;
   }
   b2RevoluteJoint.prototype.GetJointAngle = function () {
      return this.m_bodyB.m_sweep.a - this.m_bodyA.m_sweep.a - this.m_referenceAngle;
   }
   b2RevoluteJoint.prototype.GetJointSpeed = function () {
      return this.m_bodyB.m_angularVelocity - this.m_bodyA.m_angularVelocity;
   }
   b2RevoluteJoint.prototype.IsLimitEnabled = function () {
      return this.m_enableLimit;
   }
   b2RevoluteJoint.prototype.EnableLimit = function (flag) {
      this.m_enableLimit = flag;
   }
   b2RevoluteJoint.prototype.GetLowerLimit = function () {
      return this.m_lowerAngle;
   }
   b2RevoluteJoint.prototype.GetUpperLimit = function () {
      return this.m_upperAngle;
   }
   b2RevoluteJoint.prototype.SetLimits = function (lower, upper) {
      if (lower === undefined) lower = 0;
      if (upper === undefined) upper = 0;
      this.m_lowerAngle = lower;
      this.m_upperAngle = upper;
   }
   b2RevoluteJoint.prototype.IsMotorEnabled = function () {
      this.m_bodyA.SetAwake(true);
      this.m_bodyB.SetAwake(true);
      return this.m_enableMotor;
   }
   b2RevoluteJoint.prototype.EnableMotor = function (flag) {
      this.m_enableMotor = flag;
   }
   b2RevoluteJoint.prototype.SetMotorSpeed = function (speed) {
      if (speed === undefined) speed = 0;
      this.m_bodyA.SetAwake(true);
      this.m_bodyB.SetAwake(true);
      this.m_motorSpeed = speed;
   }
   b2RevoluteJoint.prototype.GetMotorSpeed = function () {
      return this.m_motorSpeed;
   }
   b2RevoluteJoint.prototype.SetMaxMotorTorque = function (torque) {
      if (torque === undefined) torque = 0;
      this.m_maxMotorTorque = torque;
   }
   b2RevoluteJoint.prototype.GetMotorTorque = function () {
      return this.m_maxMotorTorque;
   }
   b2RevoluteJoint.prototype.b2RevoluteJoint = function (def) {
      this.__super.b2Joint.call(this, def);
      this.m_localAnchor1.SetV(def.localAnchorA);
      this.m_localAnchor2.SetV(def.localAnchorB);
      this.m_referenceAngle = def.referenceAngle;
      this.m_impulse.SetZero();
      this.m_motorImpulse = 0.0;
      this.m_lowerAngle = def.lowerAngle;
      this.m_upperAngle = def.upperAngle;
      this.m_maxMotorTorque = def.maxMotorTorque;
      this.m_motorSpeed = def.motorSpeed;
      this.m_enableLimit = def.enableLimit;
      this.m_enableMotor = def.enableMotor;
      this.m_limitState = b2Joint.e_inactiveLimit;
   }
   b2RevoluteJoint.prototype.InitVelocityConstraints = function (step) {
      var bA = this.m_bodyA;
      var bB = this.m_bodyB;
      var tMat;
      var tX = 0;
      if (this.m_enableMotor || this.m_enableLimit) {}
      tMat = bA.m_xf.R;
      var r1X = this.m_localAnchor1.x - bA.m_sweep.localCenter.x;
      var r1Y = this.m_localAnchor1.y - bA.m_sweep.localCenter.y;
      tX = (tMat.col1.x * r1X + tMat.col2.x * r1Y);
      r1Y = (tMat.col1.y * r1X + tMat.col2.y * r1Y);
      r1X = tX;
      tMat = bB.m_xf.R;
      var r2X = this.m_localAnchor2.x - bB.m_sweep.localCenter.x;
      var r2Y = this.m_localAnchor2.y - bB.m_sweep.localCenter.y;
      tX = (tMat.col1.x * r2X + tMat.col2.x * r2Y);
      r2Y = (tMat.col1.y * r2X + tMat.col2.y * r2Y);
      r2X = tX;
      var m1 = bA.m_invMass;
      var m2 = bB.m_invMass;
      var i1 = bA.m_invI;
      var i2 = bB.m_invI;
      this.m_mass.col1.x = m1 + m2 + r1Y * r1Y * i1 + r2Y * r2Y * i2;
      this.m_mass.col2.x = (-r1Y * r1X * i1) - r2Y * r2X * i2;
      this.m_mass.col3.x = (-r1Y * i1) - r2Y * i2;
      this.m_mass.col1.y = this.m_mass.col2.x;
      this.m_mass.col2.y = m1 + m2 + r1X * r1X * i1 + r2X * r2X * i2;
      this.m_mass.col3.y = r1X * i1 + r2X * i2;
      this.m_mass.col1.z = this.m_mass.col3.x;
      this.m_mass.col2.z = this.m_mass.col3.y;
      this.m_mass.col3.z = i1 + i2;
      this.m_motorMass = 1.0 / (i1 + i2);
      if (this.m_enableMotor == false) {
         this.m_motorImpulse = 0.0;
      }
      if (this.m_enableLimit) {
         var jointAngle = bB.m_sweep.a - bA.m_sweep.a - this.m_referenceAngle;
         if (b2Math.Abs(this.m_upperAngle - this.m_lowerAngle) < 2.0 * b2Settings.b2_angularSlop) {
            this.m_limitState = b2Joint.e_equalLimits;
         }
         else if (jointAngle <= this.m_lowerAngle) {
            if (this.m_limitState != b2Joint.e_atLowerLimit) {
               this.m_impulse.z = 0.0;
            }
            this.m_limitState = b2Joint.e_atLowerLimit;
         }
         else if (jointAngle >= this.m_upperAngle) {
            if (this.m_limitState != b2Joint.e_atUpperLimit) {
               this.m_impulse.z = 0.0;
            }
            this.m_limitState = b2Joint.e_atUpperLimit;
         }
         else {
            this.m_limitState = b2Joint.e_inactiveLimit;
            this.m_impulse.z = 0.0;
         }
      }
      else {
         this.m_limitState = b2Joint.e_inactiveLimit;
      }
      if (step.warmStarting) {
         this.m_impulse.x *= step.dtRatio;
         this.m_impulse.y *= step.dtRatio;
         this.m_motorImpulse *= step.dtRatio;
         var PX = this.m_impulse.x;
         var PY = this.m_impulse.y;
         bA.m_linearVelocity.x -= m1 * PX;
         bA.m_linearVelocity.y -= m1 * PY;
         bA.m_angularVelocity -= i1 * ((r1X * PY - r1Y * PX) + this.m_motorImpulse + this.m_impulse.z);
         bB.m_linearVelocity.x += m2 * PX;
         bB.m_linearVelocity.y += m2 * PY;
         bB.m_angularVelocity += i2 * ((r2X * PY - r2Y * PX) + this.m_motorImpulse + this.m_impulse.z);
      }
      else {
         this.m_impulse.SetZero();
         this.m_motorImpulse = 0.0;
      }
   }
   b2RevoluteJoint.prototype.SolveVelocityConstraints = function (step) {
      var bA = this.m_bodyA;
      var bB = this.m_bodyB;
      var tMat;
      var tX = 0;
      var newImpulse = 0;
      var r1X = 0;
      var r1Y = 0;
      var r2X = 0;
      var r2Y = 0;
      var v1 = bA.m_linearVelocity;
      var w1 = bA.m_angularVelocity;
      var v2 = bB.m_linearVelocity;
      var w2 = bB.m_angularVelocity;
      var m1 = bA.m_invMass;
      var m2 = bB.m_invMass;
      var i1 = bA.m_invI;
      var i2 = bB.m_invI;
      if (this.m_enableMotor && this.m_limitState != b2Joint.e_equalLimits) {
         var Cdot = w2 - w1 - this.m_motorSpeed;
         var impulse = this.m_motorMass * ((-Cdot));
         var oldImpulse = this.m_motorImpulse;
         var maxImpulse = step.dt * this.m_maxMotorTorque;
         this.m_motorImpulse = b2Math.Clamp(this.m_motorImpulse + impulse, (-maxImpulse), maxImpulse);
         impulse = this.m_motorImpulse - oldImpulse;
         w1 -= i1 * impulse;
         w2 += i2 * impulse;
      }
      if (this.m_enableLimit && this.m_limitState != b2Joint.e_inactiveLimit) {
         tMat = bA.m_xf.R;
         r1X = this.m_localAnchor1.x - bA.m_sweep.localCenter.x;
         r1Y = this.m_localAnchor1.y - bA.m_sweep.localCenter.y;
         tX = (tMat.col1.x * r1X + tMat.col2.x * r1Y);
         r1Y = (tMat.col1.y * r1X + tMat.col2.y * r1Y);
         r1X = tX;
         tMat = bB.m_xf.R;
         r2X = this.m_localAnchor2.x - bB.m_sweep.localCenter.x;
         r2Y = this.m_localAnchor2.y - bB.m_sweep.localCenter.y;
         tX = (tMat.col1.x * r2X + tMat.col2.x * r2Y);
         r2Y = (tMat.col1.y * r2X + tMat.col2.y * r2Y);
         r2X = tX;
         var Cdot1X = v2.x + ((-w2 * r2Y)) - v1.x - ((-w1 * r1Y));
         var Cdot1Y = v2.y + (w2 * r2X) - v1.y - (w1 * r1X);
         var Cdot2 = w2 - w1;
         this.m_mass.Solve33(this.impulse3, (-Cdot1X), (-Cdot1Y), (-Cdot2));
         if (this.m_limitState == b2Joint.e_equalLimits) {
            this.m_impulse.Add(this.impulse3);
         }
         else if (this.m_limitState == b2Joint.e_atLowerLimit) {
            newImpulse = this.m_impulse.z + this.impulse3.z;
            if (newImpulse < 0.0) {
               this.m_mass.Solve22(this.reduced, (-Cdot1X), (-Cdot1Y));
               this.impulse3.x = this.reduced.x;
               this.impulse3.y = this.reduced.y;
               this.impulse3.z = (-this.m_impulse.z);
               this.m_impulse.x += this.reduced.x;
               this.m_impulse.y += this.reduced.y;
               this.m_impulse.z = 0.0;
            }
         }
         else if (this.m_limitState == b2Joint.e_atUpperLimit) {
            newImpulse = this.m_impulse.z + this.impulse3.z;
            if (newImpulse > 0.0) {
               this.m_mass.Solve22(this.reduced, (-Cdot1X), (-Cdot1Y));
               this.impulse3.x = this.reduced.x;
               this.impulse3.y = this.reduced.y;
               this.impulse3.z = (-this.m_impulse.z);
               this.m_impulse.x += this.reduced.x;
               this.m_impulse.y += this.reduced.y;
               this.m_impulse.z = 0.0;
            }
         }
         v1.x -= m1 * this.impulse3.x;
         v1.y -= m1 * this.impulse3.y;
         w1 -= i1 * (r1X * this.impulse3.y - r1Y * this.impulse3.x + this.impulse3.z);
         v2.x += m2 * this.impulse3.x;
         v2.y += m2 * this.impulse3.y;
         w2 += i2 * (r2X * this.impulse3.y - r2Y * this.impulse3.x + this.impulse3.z);
      }
      else {
         tMat = bA.m_xf.R;
         r1X = this.m_localAnchor1.x - bA.m_sweep.localCenter.x;
         r1Y = this.m_localAnchor1.y - bA.m_sweep.localCenter.y;
         tX = (tMat.col1.x * r1X + tMat.col2.x * r1Y);
         r1Y = (tMat.col1.y * r1X + tMat.col2.y * r1Y);
         r1X = tX;
         tMat = bB.m_xf.R;
         r2X = this.m_localAnchor2.x - bB.m_sweep.localCenter.x;
         r2Y = this.m_localAnchor2.y - bB.m_sweep.localCenter.y;
         tX = (tMat.col1.x * r2X + tMat.col2.x * r2Y);
         r2Y = (tMat.col1.y * r2X + tMat.col2.y * r2Y);
         r2X = tX;
         var CdotX = v2.x + ((-w2 * r2Y)) - v1.x - ((-w1 * r1Y));
         var CdotY = v2.y + (w2 * r2X) - v1.y - (w1 * r1X);
         this.m_mass.Solve22(this.impulse2, (-CdotX), (-CdotY));
         this.m_impulse.x += this.impulse2.x;
         this.m_impulse.y += this.impulse2.y;
         v1.x -= m1 * this.impulse2.x;
         v1.y -= m1 * this.impulse2.y;
         w1 -= i1 * (r1X * this.impulse2.y - r1Y * this.impulse2.x);
         v2.x += m2 * this.impulse2.x;
         v2.y += m2 * this.impulse2.y;
         w2 += i2 * (r2X * this.impulse2.y - r2Y * this.impulse2.x);
      }
      bA.m_linearVelocity.SetV(v1);
      bA.m_angularVelocity = w1;
      bB.m_linearVelocity.SetV(v2);
      bB.m_angularVelocity = w2;
   }
   b2RevoluteJoint.prototype.SolvePositionConstraints = function (baumgarte) {
      if (baumgarte === undefined) baumgarte = 0;
      var oldLimitImpulse = 0;
      var C = 0;
      var tMat;
      var bA = this.m_bodyA;
      var bB = this.m_bodyB;
      var angularError = 0.0;
      var positionError = 0.0;
      var tX = 0;
      var impulseX = 0;
      var impulseY = 0;
      if (this.m_enableLimit && this.m_limitState != b2Joint.e_inactiveLimit) {
         var angle = bB.m_sweep.a - bA.m_sweep.a - this.m_referenceAngle;
         var limitImpulse = 0.0;
         if (this.m_limitState == b2Joint.e_equalLimits) {
            C = b2Math.Clamp(angle - this.m_lowerAngle, (-b2Settings.b2_maxAngularCorrection), b2Settings.b2_maxAngularCorrection);
            limitImpulse = (-this.m_motorMass * C);
            angularError = b2Math.Abs(C);
         }
         else if (this.m_limitState == b2Joint.e_atLowerLimit) {
            C = angle - this.m_lowerAngle;
            angularError = (-C);
            C = b2Math.Clamp(C + b2Settings.b2_angularSlop, (-b2Settings.b2_maxAngularCorrection), 0.0);
            limitImpulse = (-this.m_motorMass * C);
         }
         else if (this.m_limitState == b2Joint.e_atUpperLimit) {
            C = angle - this.m_upperAngle;
            angularError = C;
            C = b2Math.Clamp(C - b2Settings.b2_angularSlop, 0.0, b2Settings.b2_maxAngularCorrection);
            limitImpulse = (-this.m_motorMass * C);
         }
         bA.m_sweep.a -= bA.m_invI * limitImpulse;
         bB.m_sweep.a += bB.m_invI * limitImpulse;
         bA.SynchronizeTransform();
         bB.SynchronizeTransform();
      } {
         tMat = bA.m_xf.R;
         var r1X = this.m_localAnchor1.x - bA.m_sweep.localCenter.x;
         var r1Y = this.m_localAnchor1.y - bA.m_sweep.localCenter.y;
         tX = (tMat.col1.x * r1X + tMat.col2.x * r1Y);
         r1Y = (tMat.col1.y * r1X + tMat.col2.y * r1Y);
         r1X = tX;
         tMat = bB.m_xf.R;
         var r2X = this.m_localAnchor2.x - bB.m_sweep.localCenter.x;
         var r2Y = this.m_localAnchor2.y - bB.m_sweep.localCenter.y;
         tX = (tMat.col1.x * r2X + tMat.col2.x * r2Y);
         r2Y = (tMat.col1.y * r2X + tMat.col2.y * r2Y);
         r2X = tX;
         var CX = bB.m_sweep.c.x + r2X - bA.m_sweep.c.x - r1X;
         var CY = bB.m_sweep.c.y + r2Y - bA.m_sweep.c.y - r1Y;
         var CLengthSquared = CX * CX + CY * CY;
         var CLength = Math.sqrt(CLengthSquared);
         positionError = CLength;
         var invMass1 = bA.m_invMass;
         var invMass2 = bB.m_invMass;
         var invI1 = bA.m_invI;
         var invI2 = bB.m_invI;
         var k_allowedStretch = 10.0 * b2Settings.b2_linearSlop;
         if (CLengthSquared > k_allowedStretch * k_allowedStretch) {
            var uX = CX / CLength;
            var uY = CY / CLength;
            var k = invMass1 + invMass2;
            var m = 1.0 / k;
            impulseX = m * ((-CX));
            impulseY = m * ((-CY));
            var k_beta = 0.5;
            bA.m_sweep.c.x -= k_beta * invMass1 * impulseX;
            bA.m_sweep.c.y -= k_beta * invMass1 * impulseY;
            bB.m_sweep.c.x += k_beta * invMass2 * impulseX;
            bB.m_sweep.c.y += k_beta * invMass2 * impulseY;
            CX = bB.m_sweep.c.x + r2X - bA.m_sweep.c.x - r1X;
            CY = bB.m_sweep.c.y + r2Y - bA.m_sweep.c.y - r1Y;
         }
         this.K1.col1.x = invMass1 + invMass2;
         this.K1.col2.x = 0.0;
         this.K1.col1.y = 0.0;
         this.K1.col2.y = invMass1 + invMass2;
         this.K2.col1.x = invI1 * r1Y * r1Y;
         this.K2.col2.x = (-invI1 * r1X * r1Y);
         this.K2.col1.y = (-invI1 * r1X * r1Y);
         this.K2.col2.y = invI1 * r1X * r1X;
         this.K3.col1.x = invI2 * r2Y * r2Y;
         this.K3.col2.x = (-invI2 * r2X * r2Y);
         this.K3.col1.y = (-invI2 * r2X * r2Y);
         this.K3.col2.y = invI2 * r2X * r2X;
         this.K.SetM(this.K1);
         this.K.AddM(this.K2);
         this.K.AddM(this.K3);
         this.K.Solve(b2RevoluteJoint.tImpulse, (-CX), (-CY));
         impulseX = b2RevoluteJoint.tImpulse.x;
         impulseY = b2RevoluteJoint.tImpulse.y;
         bA.m_sweep.c.x -= bA.m_invMass * impulseX;
         bA.m_sweep.c.y -= bA.m_invMass * impulseY;
         bA.m_sweep.a -= bA.m_invI * (r1X * impulseY - r1Y * impulseX);
         bB.m_sweep.c.x += bB.m_invMass * impulseX;
         bB.m_sweep.c.y += bB.m_invMass * impulseY;
         bB.m_sweep.a += bB.m_invI * (r2X * impulseY - r2Y * impulseX);
         bA.SynchronizeTransform();
         bB.SynchronizeTransform();
      }
      return positionError <= b2Settings.b2_linearSlop && angularError <= b2Settings.b2_angularSlop;
   }
   Box2D.postDefs.push(function () {
      Box2D.Dynamics.Joints.b2RevoluteJoint.tImpulse = new b2Vec2(0, 0);
   });
   Box2D.inherit(b2RevoluteJointDef, Box2D.Dynamics.Joints.b2JointDef);
   b2RevoluteJointDef.prototype.__super = Box2D.Dynamics.Joints.b2JointDef.prototype;
   b2RevoluteJointDef.b2RevoluteJointDef = function () {
      Box2D.Dynamics.Joints.b2JointDef.b2JointDef.apply(this, arguments);
      this.localAnchorA = new b2Vec2(0, 0);
      this.localAnchorB = new b2Vec2(0, 0);
   };
   b2RevoluteJointDef.prototype.b2RevoluteJointDef = function () {
      this.__super.b2JointDef.call(this);
      this.type = b2Joint.e_revoluteJoint;
      this.localAnchorA.SetZero();
      this.localAnchorB.SetZero();
      this.referenceAngle = 0.0;
      this.lowerAngle = 0.0;
      this.upperAngle = 0.0;
      this.maxMotorTorque = 0.0;
      this.motorSpeed = 0.0;
      this.enableLimit = false;
      this.enableMotor = false;
   }
   b2RevoluteJointDef.prototype.Initialize = function (bA, bB, anchor) {
      this.bodyA = bA;
      this.bodyB = bB;
      this.localAnchorA = this.bodyA.GetLocalPoint(anchor);
      this.localAnchorB = this.bodyB.GetLocalPoint(anchor);
      this.referenceAngle = this.bodyB.GetAngle() - this.bodyA.GetAngle();
   }
   Box2D.inherit(b2WeldJoint, Box2D.Dynamics.Joints.b2Joint);
   b2WeldJoint.prototype.__super = Box2D.Dynamics.Joints.b2Joint.prototype;
   b2WeldJoint.b2WeldJoint = function () {
      Box2D.Dynamics.Joints.b2Joint.b2Joint.apply(this, arguments);
      this.m_localAnchorA = new b2Vec2(0, 0);
      this.m_localAnchorB = new b2Vec2(0, 0);
      this.m_impulse = new b2Vec3();
      this.m_mass = new b2Mat33();
   };
   b2WeldJoint.prototype.GetAnchorA = function () {
      return this.m_bodyA.GetWorldPoint(this.m_localAnchorA);
   }
   b2WeldJoint.prototype.GetAnchorB = function () {
      return this.m_bodyB.GetWorldPoint(this.m_localAnchorB);
   }
   b2WeldJoint.prototype.GetReactionForce = function (inv_dt) {
      if (inv_dt === undefined) inv_dt = 0;
      return new b2Vec2(inv_dt * this.m_impulse.x, inv_dt * this.m_impulse.y);
   }
   b2WeldJoint.prototype.GetReactionTorque = function (inv_dt) {
      if (inv_dt === undefined) inv_dt = 0;
      return inv_dt * this.m_impulse.z;
   }
   b2WeldJoint.prototype.b2WeldJoint = function (def) {
      this.__super.b2Joint.call(this, def);
      this.m_localAnchorA.SetV(def.localAnchorA);
      this.m_localAnchorB.SetV(def.localAnchorB);
      this.m_referenceAngle = def.referenceAngle;
      this.m_impulse.SetZero();
      this.m_mass = new b2Mat33();
   }
   b2WeldJoint.prototype.InitVelocityConstraints = function (step) {
      var tMat;
      var tX = 0;
      var bA = this.m_bodyA;
      var bB = this.m_bodyB;
      tMat = bA.m_xf.R;
      var rAX = this.m_localAnchorA.x - bA.m_sweep.localCenter.x;
      var rAY = this.m_localAnchorA.y - bA.m_sweep.localCenter.y;
      tX = (tMat.col1.x * rAX + tMat.col2.x * rAY);
      rAY = (tMat.col1.y * rAX + tMat.col2.y * rAY);
      rAX = tX;
      tMat = bB.m_xf.R;
      var rBX = this.m_localAnchorB.x - bB.m_sweep.localCenter.x;
      var rBY = this.m_localAnchorB.y - bB.m_sweep.localCenter.y;
      tX = (tMat.col1.x * rBX + tMat.col2.x * rBY);
      rBY = (tMat.col1.y * rBX + tMat.col2.y * rBY);
      rBX = tX;
      var mA = bA.m_invMass;
      var mB = bB.m_invMass;
      var iA = bA.m_invI;
      var iB = bB.m_invI;
      this.m_mass.col1.x = mA + mB + rAY * rAY * iA + rBY * rBY * iB;
      this.m_mass.col2.x = (-rAY * rAX * iA) - rBY * rBX * iB;
      this.m_mass.col3.x = (-rAY * iA) - rBY * iB;
      this.m_mass.col1.y = this.m_mass.col2.x;
      this.m_mass.col2.y = mA + mB + rAX * rAX * iA + rBX * rBX * iB;
      this.m_mass.col3.y = rAX * iA + rBX * iB;
      this.m_mass.col1.z = this.m_mass.col3.x;
      this.m_mass.col2.z = this.m_mass.col3.y;
      this.m_mass.col3.z = iA + iB;
      if (step.warmStarting) {
         this.m_impulse.x *= step.dtRatio;
         this.m_impulse.y *= step.dtRatio;
         this.m_impulse.z *= step.dtRatio;
         bA.m_linearVelocity.x -= mA * this.m_impulse.x;
         bA.m_linearVelocity.y -= mA * this.m_impulse.y;
         bA.m_angularVelocity -= iA * (rAX * this.m_impulse.y - rAY * this.m_impulse.x + this.m_impulse.z);
         bB.m_linearVelocity.x += mB * this.m_impulse.x;
         bB.m_linearVelocity.y += mB * this.m_impulse.y;
         bB.m_angularVelocity += iB * (rBX * this.m_impulse.y - rBY * this.m_impulse.x + this.m_impulse.z);
      }
      else {
         this.m_impulse.SetZero();
      }
   }
   b2WeldJoint.prototype.SolveVelocityConstraints = function (step) {
      var tMat;
      var tX = 0;
      var bA = this.m_bodyA;
      var bB = this.m_bodyB;
      var vA = bA.m_linearVelocity;
      var wA = bA.m_angularVelocity;
      var vB = bB.m_linearVelocity;
      var wB = bB.m_angularVelocity;
      var mA = bA.m_invMass;
      var mB = bB.m_invMass;
      var iA = bA.m_invI;
      var iB = bB.m_invI;
      tMat = bA.m_xf.R;
      var rAX = this.m_localAnchorA.x - bA.m_sweep.localCenter.x;
      var rAY = this.m_localAnchorA.y - bA.m_sweep.localCenter.y;
      tX = (tMat.col1.x * rAX + tMat.col2.x * rAY);
      rAY = (tMat.col1.y * rAX + tMat.col2.y * rAY);
      rAX = tX;
      tMat = bB.m_xf.R;
      var rBX = this.m_localAnchorB.x - bB.m_sweep.localCenter.x;
      var rBY = this.m_localAnchorB.y - bB.m_sweep.localCenter.y;
      tX = (tMat.col1.x * rBX + tMat.col2.x * rBY);
      rBY = (tMat.col1.y * rBX + tMat.col2.y * rBY);
      rBX = tX;
      var Cdot1X = vB.x - wB * rBY - vA.x + wA * rAY;
      var Cdot1Y = vB.y + wB * rBX - vA.y - wA * rAX;
      var Cdot2 = wB - wA;
      var impulse = new b2Vec3();
      this.m_mass.Solve33(impulse, (-Cdot1X), (-Cdot1Y), (-Cdot2));
      this.m_impulse.Add(impulse);
      vA.x -= mA * impulse.x;
      vA.y -= mA * impulse.y;
      wA -= iA * (rAX * impulse.y - rAY * impulse.x + impulse.z);
      vB.x += mB * impulse.x;
      vB.y += mB * impulse.y;
      wB += iB * (rBX * impulse.y - rBY * impulse.x + impulse.z);
      bA.m_angularVelocity = wA;
      bB.m_angularVelocity = wB;
   }
   b2WeldJoint.prototype.SolvePositionConstraints = function (baumgarte) {
      if (baumgarte === undefined) baumgarte = 0;
      var tMat;
      var tX = 0;
      var bA = this.m_bodyA;
      var bB = this.m_bodyB;
      tMat = bA.m_xf.R;
      var rAX = this.m_localAnchorA.x - bA.m_sweep.localCenter.x;
      var rAY = this.m_localAnchorA.y - bA.m_sweep.localCenter.y;
      tX = (tMat.col1.x * rAX + tMat.col2.x * rAY);
      rAY = (tMat.col1.y * rAX + tMat.col2.y * rAY);
      rAX = tX;
      tMat = bB.m_xf.R;
      var rBX = this.m_localAnchorB.x - bB.m_sweep.localCenter.x;
      var rBY = this.m_localAnchorB.y - bB.m_sweep.localCenter.y;
      tX = (tMat.col1.x * rBX + tMat.col2.x * rBY);
      rBY = (tMat.col1.y * rBX + tMat.col2.y * rBY);
      rBX = tX;
      var mA = bA.m_invMass;
      var mB = bB.m_invMass;
      var iA = bA.m_invI;
      var iB = bB.m_invI;
      var C1X = bB.m_sweep.c.x + rBX - bA.m_sweep.c.x - rAX;
      var C1Y = bB.m_sweep.c.y + rBY - bA.m_sweep.c.y - rAY;
      var C2 = bB.m_sweep.a - bA.m_sweep.a - this.m_referenceAngle;
      var k_allowedStretch = 10.0 * b2Settings.b2_linearSlop;
      var positionError = Math.sqrt(C1X * C1X + C1Y * C1Y);
      var angularError = b2Math.Abs(C2);
      if (positionError > k_allowedStretch) {
         iA *= 1.0;
         iB *= 1.0;
      }
      this.m_mass.col1.x = mA + mB + rAY * rAY * iA + rBY * rBY * iB;
      this.m_mass.col2.x = (-rAY * rAX * iA) - rBY * rBX * iB;
      this.m_mass.col3.x = (-rAY * iA) - rBY * iB;
      this.m_mass.col1.y = this.m_mass.col2.x;
      this.m_mass.col2.y = mA + mB + rAX * rAX * iA + rBX * rBX * iB;
      this.m_mass.col3.y = rAX * iA + rBX * iB;
      this.m_mass.col1.z = this.m_mass.col3.x;
      this.m_mass.col2.z = this.m_mass.col3.y;
      this.m_mass.col3.z = iA + iB;
      var impulse = new b2Vec3();
      this.m_mass.Solve33(impulse, (-C1X), (-C1Y), (-C2));
      bA.m_sweep.c.x -= mA * impulse.x;
      bA.m_sweep.c.y -= mA * impulse.y;
      bA.m_sweep.a -= iA * (rAX * impulse.y - rAY * impulse.x + impulse.z);
      bB.m_sweep.c.x += mB * impulse.x;
      bB.m_sweep.c.y += mB * impulse.y;
      bB.m_sweep.a += iB * (rBX * impulse.y - rBY * impulse.x + impulse.z);
      bA.SynchronizeTransform();
      bB.SynchronizeTransform();
      return positionError <= b2Settings.b2_linearSlop && angularError <= b2Settings.b2_angularSlop;
   }
   Box2D.inherit(b2WeldJointDef, Box2D.Dynamics.Joints.b2JointDef);
   b2WeldJointDef.prototype.__super = Box2D.Dynamics.Joints.b2JointDef.prototype;
   b2WeldJointDef.b2WeldJointDef = function () {
      Box2D.Dynamics.Joints.b2JointDef.b2JointDef.apply(this, arguments);
      this.localAnchorA = new b2Vec2(0, 0);
      this.localAnchorB = new b2Vec2(0, 0);
   };
   b2WeldJointDef.prototype.b2WeldJointDef = function () {
      this.__super.b2JointDef.call(this);
      this.type = b2Joint.e_weldJoint;
      this.referenceAngle = 0.0;
   }
   b2WeldJointDef.prototype.Initialize = function (bA, bB, anchor) {
      this.bodyA = bA;
      this.bodyB = bB;
      this.localAnchorA.SetV(this.bodyA.GetLocalPoint(anchor));
      this.localAnchorB.SetV(this.bodyB.GetLocalPoint(anchor));
      this.referenceAngle = this.bodyB.GetAngle() - this.bodyA.GetAngle();
   }
})();

/*
 * See Box2D.js
 */
goog.provide('Box2D.Dynamics');
goog.provide('Box2D.Dynamics.b2DebugDraw');

goog.require('Box2D.postDefs');

Box2D.Dynamics.b2World = function(gravity, doSleep) {
    this.m_contactManager = new Box2D.Dynamics.b2ContactManager();
    this.m_contactSolver = new Box2D.Dynamics.Contacts.b2ContactSolver();
    this.m_island = new Box2D.Dynamics.b2Island();
    if (this.constructor === Box2D.Dynamics.b2World) {
        this.m_isLocked = false;
        this.m_newFixture = false;
        this.m_destructionListener = null;
        this.m_debugDraw = null;
        this.m_bodyList = null;
        this.m_contactList = null;
        this.m_jointList = null;
        this.m_controllerList = null;
        this.m_bodyCount = 0;
        this.m_contactCount = 0;
        this.m_jointCount = 0;
        this.m_controllerCount = 0;
        Box2D.Dynamics.b2World.m_warmStarting = true;
        Box2D.Dynamics.b2World.m_continuousPhysics = true;
        this.m_allowSleep = doSleep;
        this.m_gravity = gravity;
        this.m_inv_dt0 = 0.0;
        this.m_contactManager.m_world = this;
        var bd = new Box2D.Dynamics.b2BodyDef();
        this.m_groundBody = this.CreateBody(bd);
    }
};
(function(b2World) {
   b2World.MAX_TOI = 1.0 - 100.0 * Number.MIN_VALUE;
   
   b2World.prototype.SetDestructionListener = function (listener) {
      this.m_destructionListener = listener;
   };
   
   b2World.prototype.SetContactFilter = function (filter) {
      this.m_contactManager.m_contactFilter = filter;
   };
   
   b2World.prototype.SetContactListener = function (listener) {
      this.m_contactManager.m_contactListener = listener;
   };
   
   b2World.prototype.SetDebugDraw = function (debugDraw) {
      this.m_debugDraw = debugDraw;
   };
   
   b2World.prototype.SetBroadPhase = function (broadPhase) {
      var oldBroadPhase = this.m_contactManager.m_broadPhase;
      this.m_contactManager.m_broadPhase = broadPhase;
      for (var b = this.m_bodyList; b; b = b.m_next) {
         for (var f = b.m_fixtureList; f; f = f.m_next) {
            f.m_proxy = broadPhase.CreateProxy(oldBroadPhase.GetFatAABB(f.m_proxy), f);
         }
      }
   };
   
   b2World.prototype.Validate = function () {
      this.m_contactManager.m_broadPhase.Validate();
   };
   
   b2World.prototype.GetProxyCount = function () {
      return this.m_contactManager.m_broadPhase.GetProxyCount();
   };
   
   b2World.prototype.CreateBody = function (def) {
      if (this.IsLocked()) {
         return null;
      }
      var b = new Box2D.Dynamics.b2Body(def, this);
      b.m_prev = null;
      b.m_next = this.m_bodyList;
      if (this.m_bodyList) {
         this.m_bodyList.m_prev = b;
      }
      this.m_bodyList = b;
      this.m_bodyCount++;
      return b;
   };
   
   b2World.prototype.DestroyBody = function (b) {
      if (this.IsLocked()) {
         return;
      }
      var jn = b.m_jointList;
      while (jn) {
         var jn0 = jn;
         jn = jn.next;
         if (this.m_destructionListener) {
            this.m_destructionListener.SayGoodbyeJoint(jn0.joint);
         }
         this.DestroyJoint(jn0.joint);
      }
      var coe = b.m_controllerList;
      while (coe) {
         var coe0 = coe;
         coe = coe.nextController;
         coe0.controller.RemoveBody(b);
      }
      var ce = b.m_contactList;
      while (ce) {
         var ce0 = ce;
         ce = ce.next;
         this.m_contactManager.Destroy(ce0.contact);
      }
      b.m_contactList = null;
      var f = b.m_fixtureList;
      while (f) {
         var f0 = f;
         f = f.m_next;
         if (this.m_destructionListener) {
            this.m_destructionListener.SayGoodbyeFixture(f0);
         }
         f0.DestroyProxy(this.m_contactManager.m_broadPhase);
         f0.Destroy();
      }
      b.m_fixtureList = null;
      b.m_fixtureCount = 0;
      if (b.m_prev) {
         b.m_prev.m_next = b.m_next;
      }
      if (b.m_next) {
         b.m_next.m_prev = b.m_prev;
      }
      if (b == this.m_bodyList) {
         this.m_bodyList = b.m_next;
      }
      this.m_bodyCount--;
   };
   
   b2World.prototype.CreateJoint = function (def) {
      var j = Box2D.Dynamics.Joints.b2Joint.Create(def, null);
      j.m_prev = null;
      j.m_next = this.m_jointList;
      if (this.m_jointList) {
         this.m_jointList.m_prev = j;
      }
      this.m_jointList = j;
      this.m_jointCount++;
      j.m_edgeA.joint = j;
      j.m_edgeA.other = j.m_bodyB;
      j.m_edgeA.prev = null;
      j.m_edgeA.next = j.m_bodyA.m_jointList;
      if (j.m_bodyA.m_jointList) {
          j.m_bodyA.m_jointList.prev = j.m_edgeA;
      }
      j.m_bodyA.m_jointList = j.m_edgeA;
      j.m_edgeB.joint = j;
      j.m_edgeB.other = j.m_bodyA;
      j.m_edgeB.prev = null;
      j.m_edgeB.next = j.m_bodyB.m_jointList;
      if (j.m_bodyB.m_jointList) {
          j.m_bodyB.m_jointList.prev = j.m_edgeB;
      }
      j.m_bodyB.m_jointList = j.m_edgeB;
      var bodyA = def.bodyA;
      var bodyB = def.bodyB;
      if (!def.collideConnected) {
         var edge = bodyB.GetContactList();
         while (edge) {
            if (edge.other == bodyA) {
               edge.contact.FlagForFiltering();
            }
            edge = edge.next;
         }
      }
      return j;
   };
   
   b2World.prototype.DestroyJoint = function (j) {
      var collideConnected = j.m_collideConnected;
      if (j.m_prev) {
         j.m_prev.m_next = j.m_next;
      }
      if (j.m_next) {
         j.m_next.m_prev = j.m_prev;
      }
      if (j == this.m_jointList) {
         this.m_jointList = j.m_next;
      }
      var bodyA = j.m_bodyA;
      var bodyB = j.m_bodyB;
      bodyA.SetAwake(true);
      bodyB.SetAwake(true);
      if (j.m_edgeA.prev) {
         j.m_edgeA.prev.next = j.m_edgeA.next;
      }
      if (j.m_edgeA.next) {
         j.m_edgeA.next.prev = j.m_edgeA.prev;
      }
      if (j.m_edgeA == bodyA.m_jointList) {
         bodyA.m_jointList = j.m_edgeA.next;
      }
      j.m_edgeA.prev = null;
      j.m_edgeA.next = null;
      if (j.m_edgeB.prev) {
         j.m_edgeB.prev.next = j.m_edgeB.next;
      }
      if (j.m_edgeB.next) {
         j.m_edgeB.next.prev = j.m_edgeB.prev;
      }
      if (j.m_edgeB == bodyB.m_jointList) {
         bodyB.m_jointList = j.m_edgeB.next;
      }
      j.m_edgeB.prev = null;
      j.m_edgeB.next = null;
      Box2D.Dynamics.Joints.b2Joint.Destroy(j, null);
      this.m_jointCount--;
      if (!collideConnected) {
         var edge = bodyB.GetContactList();
         while (edge) {
            if (edge.other == bodyA) {
               edge.contact.FlagForFiltering();
            }
            edge = edge.next;
         }
      }
   };
   
   b2World.prototype.AddController = function (c) {
      c.m_next = this.m_controllerList;
      c.m_prev = null;
      this.m_controllerList = c;
      c.m_world = this;
      this.m_controllerCount++;
      return c;
   };
   
   b2World.prototype.RemoveController = function (c) {
      if (c.m_prev) c.m_prev.m_next = c.m_next;
      if (c.m_next) c.m_next.m_prev = c.m_prev;
      if (this.m_controllerList == c) this.m_controllerList = c.m_next;
      this.m_controllerCount--;
   };
   
   b2World.prototype.CreateController = function (controller) {
      if (controller.m_world != this) {
          throw new Error("Controller can only be a member of one world");
      }
      controller.m_next = this.m_controllerList;
      controller.m_prev = null;
      if (this.m_controllerList) {
          this.m_controllerList.m_prev = controller;
      }
      this.m_controllerList = controller;
      this.m_controllerCount++;
      controller.m_world = this;
      return controller;
   };
   
   b2World.prototype.DestroyController = function (controller) {
      controller.Clear();
      if (controller.m_next) {
          controller.m_next.m_prev = controller.m_prev;
      }
      if (controller.m_prev) {
          controller.m_prev.m_next = controller.m_next;
      }
      if (controller == this.m_controllerList) {
          this.m_controllerList = controller.m_next;
      }
      this.m_controllerCount--;
   };
   
   b2World.prototype.SetWarmStarting = function (flag) {
      b2World.m_warmStarting = flag;
   };
   
   b2World.prototype.SetContinuousPhysics = function (flag) {
      b2World.m_continuousPhysics = flag;
   };
   
   b2World.prototype.GetBodyCount = function () {
      return this.m_bodyCount;
   };
   
   b2World.prototype.GetJointCount = function () {
      return this.m_jointCount;
   };
   
   b2World.prototype.GetContactCount = function () {
      return this.m_contactCount;
   };
   
   b2World.prototype.SetGravity = function (gravity) {
      this.m_gravity = gravity;
   };
   
   b2World.prototype.GetGravity = function () {
      return this.m_gravity;
   };
   
   b2World.prototype.GetGroundBody = function () {
      return this.m_groundBody;
   };
   
   b2World.prototype.Step = function (dt, velocityIterations, positionIterations) {
      if (dt === undefined) dt = 0;
      if (velocityIterations === undefined) velocityIterations = 0;
      if (positionIterations === undefined) positionIterations = 0;
      if (this.m_newFixture) {
         this.m_contactManager.FindNewContacts();
         this.m_newFixture = false;
      }
      this.m_isLocked = true;
      var step = new Box2D.Dynamics.b2TimeStep();
      step.dt = dt;
      step.velocityIterations = velocityIterations;
      step.positionIterations = positionIterations;
      if (dt > 0.0) {
         step.inv_dt = 1.0 / dt;
      } else {
         step.inv_dt = 0.0;
      }
      step.dtRatio = this.m_inv_dt0 * dt;
      step.warmStarting = b2World.m_warmStarting;
      this.m_contactManager.Collide();
      if (step.dt > 0.0) {
         this.Solve(step);
         if (b2World.m_continuousPhysics && step.dt > 0.0) {
            this.SolveTOI(step);
         }
         this.m_inv_dt0 = step.inv_dt;
      }
      this.m_isLocked = false;
   };
   
   b2World.prototype.ClearForces = function () {
      for (var body = this.m_bodyList; body; body = body.m_next) {
         body.m_force.SetZero();
         body.m_torque = 0.0;
      }
   };
   
   b2World.prototype.DrawDebugData = function () {
      if (this.m_debugDraw === null) {
         return;
      }
      this.m_debugDraw.m_sprite.graphics.clear();
      var flags = this.m_debugDraw.GetFlags();
      if (flags & Box2D.Dynamics.b2DebugDraw.e_shapeBit) {
         var color_inactive = new Box2D.Common.b2Color(0.5, 0.5, 0.3);
         var color_static = new Box2D.Common.b2Color(0.5, 0.9, 0.5);
         var color_kinematic = new Box2D.Common.b2Color(0.5, 0.5, 0.9);
         var color_dynamic_sleeping = new Box2D.Common.b2Color(0.6, 0.6, 0.6);
         var color_dynamic_awake = new Box2D.Common.b2Color(0.9, 0.7, 0.7);
         for (var b = this.m_bodyList; b; b = b.m_next) {
            var xf = b.m_xf;
            for (var f = b.GetFixtureList(); f; f = f.m_next) {
               var s = f.GetShape();
               if (!b.IsActive()) {
                  this.DrawShape(s, b.m_xf, color_inactive);
               } else if (b.GetType() == Box2D.Dynamics.b2Body.b2_staticBody) {
                  this.DrawShape(s, b.m_xf, color_static);
               } else if (b.GetType() == Box2D.Dynamics.b2Body.b2_kinematicBody) {
                  this.DrawShape(s, b.m_xf, color_kinematic);
               } else if (!b.IsAwake()) {
                  this.DrawShape(s, b.m_xf, color_dynamic_sleeping);
               } else {
                  this.DrawShape(s, b.m_xf, color_dynamic_awake);
               }
            }
         }
      }
      if (flags & Box2D.Dynamics.b2DebugDraw.e_jointBit) {
         for (var j = this.m_jointList; j; j = j.m_next) {
            this.DrawJoint(j);
         }
      }
      if (flags & Box2D.Dynamics.b2DebugDraw.e_controllerBit) {
         for (var c = this.m_controllerList; c; c = c.m_next) {
            c.Draw(this.m_debugDraw);
         }
      }
      if (flags & Box2D.Dynamics.b2DebugDraw.e_pairBit) {
         var pairColor = new Box2D.Common.b2Color(0.3, 0.9, 0.9);
         for (var contact = this.m_contactManager.m_contactList; contact; contact = contact.GetNext()) {
            var fixtureA = contact.GetFixtureA();
            var fixtureB = contact.GetFixtureB();
            var cA = fixtureA.GetAABB().GetCenter();
            var cB = fixtureB.GetAABB().GetCenter();
            this.m_debugDraw.DrawSegment(cA, cB, pairColor);
         }
      }
      if (flags & Box2D.Dynamics.b2DebugDraw.e_aabbBit) {
         var aabbColor = new Box2D.Common.b2Color(0.0, 0.0, 0.8);
         for (var b = this.m_bodyList; b; b = b.GetNext()) {
            if (!b.IsActive()) {
               continue;
            }
            for (var f = b.GetFixtureList(); f; f = f.GetNext()) {
               var aabb = this.m_contactManager.m_broadPhase.GetFatAABB(f.m_proxy);
               var vs = [new Box2D.Common.Math.b2Vec2(aabb.lowerBound.x, aabb.lowerBound.y),
                         new Box2D.Common.Math.b2Vec2(aabb.upperBound.x, aabb.lowerBound.y),
                         new Box2D.Common.Math.b2Vec2(aabb.upperBound.x, aabb.upperBound.y),
                         new Box2D.Common.Math.b2Vec2(aabb.lowerBound.x, aabb.upperBound.y)];
               this.m_debugDraw.DrawPolygon(vs, 4, aabbColor);
            }
         }
      }
      if (flags & Box2D.Dynamics.b2DebugDraw.e_centerOfMassBit) {
         for (var b = this.m_bodyList; b; b = b.m_next) {
            b2World.s_xf.R = b.m_xf.R;
            b2World.s_xf.position = b.GetWorldCenter();
            this.m_debugDraw.DrawTransform(b2World.s_xf);
         }
      }
   };
   
   b2World.prototype.QueryAABB = function (callback, aabb) {
      var broadPhase = this.m_contactManager.m_broadPhase;

      var WorldQueryWrapper = function(proxy) {
         return callback(broadPhase.GetUserData(proxy));
      };
      broadPhase.Query(WorldQueryWrapper, aabb);
   };
   
   b2World.prototype.QueryShape = function (callback, shape, transform) {
      if (transform === undefined || transform === null) {
         transform = new Box2D.Common.Math.b2Transform();
         transform.SetIdentity();
      }
      var broadPhase = this.m_contactManager.m_broadPhase;
      
      var WorldQueryWrapper = function(proxy) {
         var fixture = broadPhase.GetUserData(proxy);
         if (Box2D.Collision.Shapes.b2Shape.TestOverlap(shape, transform, fixture.GetShape(), fixture.GetBody().GetTransform())) {
             return callback(fixture);
         } else {
             return true;
         }
      };
      var aabb = new Box2D.Collision.b2AABB();
      shape.ComputeAABB(aabb, transform);
      broadPhase.Query(WorldQueryWrapper, aabb);
   };
   
   b2World.prototype.QueryPoint = function (callback, p) {
      var broadPhase = this.m_contactManager.m_broadPhase;

      var WorldQueryWrapper = function(proxy) {
         var fixture = broadPhase.GetUserData(proxy);
         if (fixture.TestPoint(p)) {
             return callback(fixture);
         } else {
             return true;
         }
      };
      var aabb = new Box2D.Collision.b2AABB();
      aabb.lowerBound.Set(p.x - Box2D.Common.b2Settings.b2_linearSlop, p.y - Box2D.Common.b2Settings.b2_linearSlop);
      aabb.upperBound.Set(p.x + Box2D.Common.b2Settings.b2_linearSlop, p.y + Box2D.Common.b2Settings.b2_linearSlop);
      broadPhase.Query(WorldQueryWrapper, aabb);
   };
   
   b2World.prototype.RayCast = function (callback, point1, point2) {
      var broadPhase = this.m_contactManager.m_broadPhase;
      var output = new Box2D.Collision.b2RayCastOutput();

      var RayCastWrapper = function(input, proxy) {
         var fixture = broadPhase.GetUserData(proxy);
         var hit = fixture.RayCast(output, input);
         if (hit) {
            var flipFrac = 1 - output.fraction;
            var point = new Box2D.Common.Math.b2Vec2(flipFrac * point1.x + output.fraction * point2.x, flipFrac * point1.y + output.fraction * point2.y);
            return callback(fixture, point, output.normal, output.fraction);
         } else {
             return input.maxFraction;
         }
      };
      var input = new Box2D.Collision.b2RayCastInput(point1, point2);
      broadPhase.RayCast(RayCastWrapper, input);
   };
   
   b2World.prototype.RayCastOne = function (point1, point2) {
      var result;

      var RayCastOneWrapper = function(fixture, point, normal, fraction) {
         if (fraction === undefined) fraction = 0;
         result = fixture;
         return fraction;
      };
      this.RayCast(RayCastOneWrapper, point1, point2);
      return result;
   };
   
   b2World.prototype.RayCastAll = function (point1, point2) {
      var result = [];

      var RayCastAllWrapper = function(fixture, point, normal, fraction) {
         if (fraction === undefined) fraction = 0;
         result[result.length] = fixture;
         return 1;
      };
      this.RayCast(RayCastAllWrapper, point1, point2);
      return result;
   };
   
   b2World.prototype.GetBodyList = function () {
      return this.m_bodyList;
   };
   
   b2World.prototype.GetJointList = function () {
      return this.m_jointList;
   };
   
   b2World.prototype.GetContactList = function () {
      return this.m_contactList;
   };
   
   b2World.prototype.IsLocked = function () {
      return this.m_isLocked;
   };
   
   b2World.prototype.Solve = function (step) {
      for (var controller = this.m_controllerList; controller; controller = controller.m_next) {
         controller.Step(step);
      }
      this.m_island.Initialize(this.m_bodyCount, this.m_contactCount, this.m_jointCount, this.m_contactManager.m_contactListener, this.m_contactSolver);
      for (var b = this.m_bodyList; b; b = b.m_next) {
         b.m_islandFlag = false;
      }
      for (var c = this.m_contactList; c; c = c.m_next) {
         c.m_islandFlag = false;
      }
      for (var j = this.m_jointList; j; j = j.m_next) {
         j.m_islandFlag = false;
      }
      for (var seed = this.m_bodyList; seed; seed = seed.m_next) {
         if (seed.m_islandFlag) {
            continue;
         }
         if (!seed.IsAwake() || !seed.IsActive()) {
            continue;
         }
         if (seed.GetType() == Box2D.Dynamics.b2Body.b2_staticBody) {
            continue;
         }
         this.m_island.Clear();
         var stack = [];
         stack.push(seed);
         seed.m_islandFlag = true;
         while (stack.length > 0) {
            var b = stack.pop();
            this.m_island.AddBody(b);
            if (!b.IsAwake()) {
               b.SetAwake(true);
            }
            if (b.GetType() == Box2D.Dynamics.b2Body.b2_staticBody) {
               continue;
            }
            for (var ce = b.m_contactList; ce; ce = ce.next) {
               if (ce.contact.m_islandFlag || ce.contact.IsSensor() || ce.contact.IsEnabled() == false || !ce.contact.IsTouching()) {
                  continue;
               }
               this.m_island.AddContact(ce.contact);
               ce.contact.m_islandFlag = true;
               if (ce.other.m_islandFlag) {
                  continue;
               }
               stack.push(ce.other);
               ce.other.m_islandFlag = true;
            }
            for (var jn = b.m_jointList; jn; jn = jn.next) {
               if (jn.joint.m_islandFlag || !jn.other.IsActive()) {
                  continue;
               }
               this.m_island.AddJoint(jn.joint);
               jn.joint.m_islandFlag = true;
               if (jn.other.m_islandFlag) {
                  continue;
               }
               stack.push(jn.other);
               jn.other.m_islandFlag = true;
            }
         }
         this.m_island.Solve(step, this.m_gravity, this.m_allowSleep);
         
         for (var i = 0; i < this.m_island.m_bodyCount; ++i) {
            if (this.m_island.m_bodies[i].GetType() == Box2D.Dynamics.b2Body.b2_staticBody) {
               this.m_island.m_bodies[i].m_islandFlag = false;
            }
         }
      }
      for (var b = this.m_bodyList; b; b = b.m_next) {
         if (!b.IsAwake() || !b.IsActive()) {
            continue;
         }
         if (b.GetType() == Box2D.Dynamics.b2Body.b2_staticBody) {
            continue;
         }
         b.SynchronizeFixtures();
      }
      this.m_contactManager.FindNewContacts();
   };
   
   b2World.prototype.SolveTOI = function (step) {
      this.m_island.Initialize(this.m_bodyCount, Box2D.Common.b2Settings.b2_maxTOIContactsPerIsland,
                               Box2D.Common.b2Settings.b2_maxTOIJointsPerIsland, this.m_contactManager.m_contactListener,
                               this.m_contactSolver);
      for (var b = this.m_bodyList; b; b = b.m_next) {
         b.m_islandFlag = false;
         b.m_sweep.t0 = 0.0;
      }
      for (var c = this.m_contactList; c; c = c.m_next) {
         c.m_islandFlag = false;
         c.m_toi = null;
      }
      for (var j = this.m_jointList; j; j = j.m_next) {
         j.m_islandFlag = false;
      }
      for (;;) {
         var toi2 = this._SolveTOI2(step);
         var minContact = toi2.minContact;
         var minTOI = toi2.minTOI;
         if (minContact === null || b2World.MAX_TOI < minTOI) {
            break;
         }
         b2World.s_backupA.Set(minContact.m_fixtureA.m_body.m_sweep);
         b2World.s_backupB.Set(minContact.m_fixtureB.m_body.m_sweep);
         minContact.m_fixtureA.m_body.Advance(minTOI);
         minContact.m_fixtureB.m_body.Advance(minTOI);
         minContact.Update(this.m_contactManager.m_contactListener);
         minContact.m_toi = null;
         if (minContact.IsSensor() || minContact.IsEnabled() == false) {
            minContact.m_fixtureA.m_body.m_sweep.Set(b2World.s_backupA);
            minContact.m_fixtureB.m_body.m_sweep.Set(b2World.s_backupB);
            minContact.m_fixtureA.m_body.SynchronizeTransform();
            minContact.m_fixtureB.m_body.SynchronizeTransform();
            continue;
         }
         if (!minContact.IsTouching()) {
            continue;
         }
         var seed = minContact.m_fixtureA.m_body;
         if (seed.GetType() != Box2D.Dynamics.b2Body.b2_dynamicBody) {
            seed = minContact.m_fixtureB.m_body;
         }
         this.m_island.Clear();
         var queue = new Box2D.Queue();
         queue.enqueue(seed);
         seed.m_islandFlag = true;
         while (queue.size > 0) {
            var b = queue.dequeue();
            this.m_island.AddBody(b);
            if (!b.IsAwake()) {
               b.SetAwake(true);
            }
            if (b.GetType() != Box2D.Dynamics.b2Body.b2_dynamicBody) {
               continue;
            }
            for (var cEdge = b.m_contactList; cEdge; cEdge = cEdge.next) {
               if (this.m_island.m_contactCount == this.m_island.m_contactCapacity) {
                  break;
               }
               if (cEdge.contact.m_islandFlag || cEdge.contact.IsSensor() || cEdge.contact.IsEnabled() == false || !cEdge.contact.IsTouching()) {
                  continue;
               }
               this.m_island.AddContact(cEdge.contact);
               cEdge.contact.m_islandFlag = true;
               if (cEdge.other.m_islandFlag) {
                  continue;
               }
               if (cEdge.other.GetType() != Box2D.Dynamics.b2Body.b2_staticBody) {
                  cEdge.other.Advance(minTOI);
                  cEdge.other.SetAwake(true);
               }
               queue.enqueue(cEdge.other);
               cEdge.other.m_islandFlag = true;
            }
            for (var jEdge = b.m_jointList; jEdge; jEdge = jEdge.next) {
               if (this.m_island.m_jointCount == this.m_island.m_jointCapacity) {
                   continue;
               }
               if (jEdge.joint.m_islandFlag || !jEdge.other.IsActive()) {
                  continue;
               }
               this.m_island.AddJoint(jEdge.joint);
               jEdge.joint.m_islandFlag = true;
               if (jEdge.other.m_islandFlag) {
                   continue;
               }
               if (jEdge.other.GetType() != Box2D.Dynamics.b2Body.b2_staticBody) {
                  jEdge.other.Advance(minTOI);
                  jEdge.other.SetAwake(true);
               }
               queue.enqueue(jEdge.other);
               jEdge.other.m_islandFlag = true;
            }
         }
         var subStep = new Box2D.Dynamics.b2TimeStep();
         subStep.warmStarting = false;
         subStep.dt = (1.0 - minTOI) * step.dt;
         subStep.inv_dt = 1.0 / subStep.dt;
         subStep.dtRatio = 0.0;
         subStep.velocityIterations = step.velocityIterations;
         subStep.positionIterations = step.positionIterations;
         this.m_island.SolveTOI(subStep);
         
         for (var i = 0; i < this.m_island.m_bodyCount; i++) {
            this.m_island.m_bodies[i].m_islandFlag = false;
            if (!this.m_island.m_bodies[i].IsAwake() || this.m_island.m_bodies[i].GetType() != Box2D.Dynamics.b2Body.b2_dynamicBody) {
               continue;
            }
            this.m_island.m_bodies[i].SynchronizeFixtures();
            for (var cEdge = this.m_island.m_bodies[i].m_contactList; cEdge; cEdge = cEdge.next) {
               cEdge.contact.m_toi = null;
            }
         }
         for (var i = 0; i < this.m_island.m_contactCount; i++) {
            this.m_island.m_contacts[i].m_islandFlag = false;
            this.m_island.m_contacts[i].m_toi = null;
         }
         for (var i = 0; i < this.m_island.m_jointCount; i++) {
            this.m_island.m_joints[i].m_islandFlag = false;
         }
         this.m_contactManager.FindNewContacts();
      }
   };
   b2World.prototype._SolveTOI2 = function(step) {
     var minContact = null;
     var minTOI = 1.0;
     var contacts = 0;
     for (var c = this.m_contactList; c; c = c.m_next) {
        if (this._SolveTOI2SkipContact(step, c)) {
           continue;
        }
        var toi = 1.0;
        if (c.m_toi != null) {
           toi = c.m_toi;
        } else if (c.IsTouching()) {
            toi = 1;
            c.m_toi = toi;
        } else {
           var t0 = c.m_fixtureA.m_body.m_sweep.t0;
           if (c.m_fixtureA.m_body.m_sweep.t0 < c.m_fixtureB.m_body.m_sweep.t0) {
              t0 = c.m_fixtureB.m_body.m_sweep.t0;
              c.m_fixtureA.m_body.m_sweep.Advance(t0);
           } else if (c.m_fixtureB.m_body.m_sweep.t0 < c.m_fixtureA.m_body.m_sweep.t0) {
              t0 = c.m_fixtureA.m_body.m_sweep.t0;
              c.m_fixtureB.m_body.m_sweep.Advance(t0);
           }
           toi = c.ComputeTOI(c.m_fixtureA.m_body.m_sweep, c.m_fixtureB.m_body.m_sweep);
           Box2D.Common.b2Settings.b2Assert(0.0 <= toi && toi <= 1.0);
           if (toi > 0.0 && toi < 1.0) {
              toi = (1.0 - toi) * t0 + toi;
           }
           c.m_toi = toi;
        }
        if (Number.MIN_VALUE < toi && toi < minTOI) {
           minContact = c;
           minTOI = toi;
        }
     }
     return { minContact: minContact, minTOI: minTOI };
    };
    b2World.prototype._SolveTOI2SkipContact = function(step, c) {
        if (c.IsSensor() || c.IsEnabled() == false || !c.IsContinuous()) {
           return true;
        }
        if ((c.m_fixtureA.m_body.GetType() != Box2D.Dynamics.b2Body.b2_dynamicBody || !c.m_fixtureA.m_body.IsAwake()) &&
            (c.m_fixtureB.m_body.GetType() != Box2D.Dynamics.b2Body.b2_dynamicBody || !c.m_fixtureB.m_body.IsAwake())) {
           return true;
        }
        return false;
    };

   b2World.prototype.DrawJoint = function (joint) {
      if (joint.m_type == Box2D.Dynamics.Joints.b2Joint.e_distanceJoint || joint.m_type == Box2D.Dynamics.Joints.b2Joint.e_mouseJoint ) {
         this.m_debugDraw.DrawSegment(joint.GetAnchorA(), joint.GetAnchorB(), b2World.s_jointColor);
      } else if (joint.m_type == Box2D.Dynamics.Joints.b2Joint.e_pulleyJoint) {
            this.m_debugDraw.DrawSegment(joint.GetGroundAnchorA(), joint.GetAnchorA(), b2World.s_jointColor);
            this.m_debugDraw.DrawSegment(joint.GetGroundAnchorB(), joint.GetAnchorB(), b2World.s_jointColor);
            this.m_debugDraw.DrawSegment(joint.GetGroundAnchorA(), joint.GetGroundAnchorB(), b2World.s_jointColor);
      } else {
         if (joint.GetBodyA() != this.m_groundBody) {
             this.m_debugDraw.DrawSegment(joint.GetBodyA().m_xf.position, joint.GetAnchorA(), b2World.s_jointColor);
         }
         this.m_debugDraw.DrawSegment(joint.GetAnchorA(), joint.GetAnchorB(), b2World.s_jointColor);
         if (joint.GetBodyB() != this.m_groundBody) {
             this.m_debugDraw.DrawSegment(joint.GetBodyB().m_xf.position, joint.GetAnchorB(), b2World.s_jointColor);
         }
      }
   };
   
   b2World.prototype.DrawShape = function (shape, xf, color) {
      switch (shape.m_type) {
      case Box2D.Collision.Shapes.b2Shape.e_circleShape:
         {
            var circle = shape;
            var center = Box2D.Common.Math.b2Math.MulX(xf, circle.m_p);
            var radius = circle.m_radius;
            var axis = xf.R.col1;
            this.m_debugDraw.DrawSolidCircle(center, radius, axis, color);
         }
         break;
      case Box2D.Collision.Shapes.b2Shape.e_polygonShape:
         {
            var i = 0;
            var poly = shape;
            var vertexCount = parseInt(poly.GetVertexCount());
            var localVertices = poly.GetVertices();
            var vertices = new Array(vertexCount);
            for (i = 0;
            i < vertexCount; ++i) {
               vertices[i] = Box2D.Common.Math.b2Math.MulX(xf, localVertices[i]);
            }
            this.m_debugDraw.DrawSolidPolygon(vertices, vertexCount, color);
         }
         break;
      case Box2D.Collision.Shapes.b2Shape.e_edgeShape:
         {
            var edge = shape;
            this.m_debugDraw.DrawSegment(Box2D.Common.Math.b2Math.MulX(xf, edge.GetVertex1()), Box2D.Common.Math.b2Math.MulX(xf, edge.GetVertex2()), color);
         }
         break;
      }
   };
   Box2D.postDefs.push(function () {
      Box2D.Dynamics.b2World.s_xf = new Box2D.Common.Math.b2Transform();
      Box2D.Dynamics.b2World.s_backupA = new Box2D.Common.Math.b2Sweep();
      Box2D.Dynamics.b2World.s_backupB = new Box2D.Common.Math.b2Sweep();
      Box2D.Dynamics.b2World.s_jointColor = new Box2D.Common.b2Color(0.5, 0.8, 0.8);
   });
})(Box2D.Dynamics.b2World);


Box2D.Dynamics.b2ContactManager = function() {
    if (this.constructor === Box2D.Dynamics.b2ContactManager) {
        this.m_world = null;
        this.m_contactCount = 0;
        this.m_contactFilter = Box2D.Dynamics.b2ContactFilter.b2_defaultFilter;
        this.m_contactListener = Box2D.Dynamics.b2ContactListener.b2_defaultListener;
        this.m_contactFactory = new Box2D.Dynamics.Contacts.b2ContactFactory();
        this.m_broadPhase = new Box2D.Collision.b2DynamicTreeBroadPhase();
    }
};

Box2D.Dynamics.b2ContactManager.prototype.AddPair = function (fixtureA, fixtureB) {
  var bodyA = fixtureA.GetBody();
  var bodyB = fixtureB.GetBody();
  if (bodyA == bodyB) {
      return;
  }
  if (!bodyB.ShouldCollide(bodyA)) {
     return;
  }
  if (!this.m_contactFilter.ShouldCollide(fixtureA, fixtureB)) {
     return;
  }
  var edge = bodyB.GetContactList();
  while (edge) {
     if (edge.other == bodyA) {
        var fA = edge.contact.GetFixtureA();
        var fB = edge.contact.GetFixtureB();
        if (fA == fixtureA && fB == fixtureB) {
            return;
        }
        if (fA == fixtureB && fB == fixtureA) {
            return;
        }
     }
     edge = edge.next;
  }
  var c = this.m_contactFactory.Create(fixtureA, fixtureB);
  fixtureA = c.GetFixtureA();
  fixtureB = c.GetFixtureB();
  bodyA = fixtureA.m_body;
  bodyB = fixtureB.m_body;
  c.m_prev = null;
  c.m_next = this.m_world.m_contactList;
  if (this.m_world.m_contactList != null) {
     this.m_world.m_contactList.m_prev = c;
  }
  this.m_world.m_contactList = c;
  c.m_nodeA.contact = c;
  c.m_nodeA.other = bodyB;
  c.m_nodeA.prev = null;
  c.m_nodeA.next = bodyA.m_contactList;
  if (bodyA.m_contactList != null) {
     bodyA.m_contactList.prev = c.m_nodeA;
  }
  bodyA.m_contactList = c.m_nodeA;
  c.m_nodeB.contact = c;
  c.m_nodeB.other = bodyA;
  c.m_nodeB.prev = null;
  c.m_nodeB.next = bodyB.m_contactList;
  if (bodyB.m_contactList != null) {
     bodyB.m_contactList.prev = c.m_nodeB;
  }
  bodyB.m_contactList = c.m_nodeB;
  this.m_world.m_contactCount++;
  return;
};

Box2D.Dynamics.b2ContactManager.prototype.FindNewContacts = function () {
  this.m_broadPhase.UpdatePairs(Box2D.generateCallback(this, this.AddPair));
};

Box2D.Dynamics.b2ContactManager.prototype.Destroy = function (c) {
  var fixtureA = c.GetFixtureA();
  var fixtureB = c.GetFixtureB();
  var bodyA = fixtureA.GetBody();
  var bodyB = fixtureB.GetBody();
  if (c.IsTouching()) {
     this.m_contactListener.EndContact(c);
  }
  if (c.m_prev) {
     c.m_prev.m_next = c.m_next;
  }
  if (c.m_next) {
     c.m_next.m_prev = c.m_prev;
  }
  if (c == this.m_world.m_contactList) {
     this.m_world.m_contactList = c.m_next;
  }
  if (c.m_nodeA.prev) {
     c.m_nodeA.prev.next = c.m_nodeA.next;
  }
  if (c.m_nodeA.next) {
     c.m_nodeA.next.prev = c.m_nodeA.prev;
  }
  if (c.m_nodeA == bodyA.m_contactList) {
     bodyA.m_contactList = c.m_nodeA.next;
  }
  if (c.m_nodeB.prev) {
     c.m_nodeB.prev.next = c.m_nodeB.next;
  }
  if (c.m_nodeB.next) {
     c.m_nodeB.next.prev = c.m_nodeB.prev;
  }
  if (c.m_nodeB == bodyB.m_contactList) {
     bodyB.m_contactList = c.m_nodeB.next;
  }
  this.m_contactFactory.Destroy(c);
  this.m_contactCount--;
};

Box2D.Dynamics.b2ContactManager.prototype.Collide = function () {
  var c = this.m_world.m_contactList;
  while (c) {
     var fixtureA = c.GetFixtureA();
     var fixtureB = c.GetFixtureB();
     var bodyA = fixtureA.GetBody();
     var bodyB = fixtureB.GetBody();
     if (bodyA.IsAwake() == false && bodyB.IsAwake() == false) {
        c = c.GetNext();
        continue;
     }
     if (c.IsFiltering()) {
        if (bodyB.ShouldCollide(bodyA) == false) {
           var cNuke = c;
           c = cNuke.GetNext();
           this.Destroy(cNuke);
           continue;
        }
        if (this.m_contactFilter.ShouldCollide(fixtureA, fixtureB) == false) {
           cNuke = c;
           c = cNuke.GetNext();
           this.Destroy(cNuke);
           continue;
        }
        c.ClearFiltering();
     }
     var proxyA = fixtureA.m_proxy;
     var proxyB = fixtureB.m_proxy;
     var overlap = this.m_broadPhase.TestOverlap(proxyA, proxyB);
     if (overlap == false) {
        cNuke = c;
        c = cNuke.GetNext();
        this.Destroy(cNuke);
        continue;
     }
     c.Update(this.m_contactListener);
     c = c.GetNext();
  }
};

Box2D.postDefs.push(function () {
  Box2D.Dynamics.b2ContactManager.s_evalCP = new Box2D.Collision.b2ContactPoint();
});


Box2D.Dynamics.b2DebugDraw = function() {
      this.m_drawScale = 1.0;
      this.m_lineThickness = 1.0;
      this.m_alpha = 1.0;
      this.m_fillAlpha = 1.0;
      this.m_xformScale = 1.0;
      var __this = this;
      //#WORKAROUND
      this.m_sprite = {
         graphics: {
            clear: function () {
               __this.m_ctx.clearRect(0, 0, __this.m_ctx.canvas.width, __this.m_ctx.canvas.height)
            }
         }
      };
      if (this.constructor === Box2D.Dynamics.b2DebugDraw) {
          this.m_drawFlags = 0;
      }
};
(function (b2DebugDraw) {
   b2DebugDraw.prototype._color = function (color, alpha) {
      return "rgba(" + ((color & 0xFF0000) >> 16) + "," + ((color & 0xFF00) >> 8) + "," + (color & 0xFF) + "," + alpha + ")";
   };
   b2DebugDraw.prototype.SetFlags = function (flags) {
      if (flags === undefined) flags = 0;
      this.m_drawFlags = flags;
   };
   b2DebugDraw.prototype.GetFlags = function () {
      return this.m_drawFlags;
   };
   b2DebugDraw.prototype.AppendFlags = function (flags) {
      if (flags === undefined) flags = 0;
      this.m_drawFlags |= flags;
   };
   b2DebugDraw.prototype.ClearFlags = function (flags) {
      if (flags === undefined) flags = 0;
      this.m_drawFlags &= ~flags;
   };
   b2DebugDraw.prototype.SetSprite = function (sprite) {
      this.m_ctx = sprite;
   };
   b2DebugDraw.prototype.GetSprite = function () {
      return this.m_ctx;
   };
   b2DebugDraw.prototype.SetDrawScale = function (drawScale) {
      if (drawScale === undefined) drawScale = 0;
      this.m_drawScale = drawScale;
   };
   b2DebugDraw.prototype.GetDrawScale = function () {
      return this.m_drawScale;
   };
   b2DebugDraw.prototype.SetLineThickness = function (lineThickness) {
      if (lineThickness === undefined) lineThickness = 0;
      this.m_lineThickness = lineThickness;
      this.m_ctx.strokeWidth = lineThickness;
   };
   b2DebugDraw.prototype.GetLineThickness = function () {
      return this.m_lineThickness;
   };
   b2DebugDraw.prototype.SetAlpha = function (alpha) {
      if (alpha === undefined) alpha = 0;
      this.m_alpha = alpha;
   };
   b2DebugDraw.prototype.GetAlpha = function () {
      return this.m_alpha;
   };
   b2DebugDraw.prototype.SetFillAlpha = function (alpha) {
      if (alpha === undefined) alpha = 0;
      this.m_fillAlpha = alpha;
   };
   b2DebugDraw.prototype.GetFillAlpha = function () {
      return this.m_fillAlpha;
   };
   b2DebugDraw.prototype.SetXFormScale = function (xformScale) {
      if (xformScale === undefined) xformScale = 0;
      this.m_xformScale = xformScale;
   };
   b2DebugDraw.prototype.GetXFormScale = function () {
      return this.m_xformScale;
   };
   b2DebugDraw.prototype.DrawPolygon = function (vertices, vertexCount, color) {
      if (!vertexCount) return;
      var s = this.m_ctx;
      var drawScale = this.m_drawScale;
      s.beginPath();
      s.strokeStyle = this._color(color.color, this.m_alpha);
      s.moveTo(vertices[0].x * drawScale, vertices[0].y * drawScale);
      for (var i = 1; i < vertexCount; i++) {
         s.lineTo(vertices[i].x * drawScale, vertices[i].y * drawScale);
      }
      s.lineTo(vertices[0].x * drawScale, vertices[0].y * drawScale);
      s.closePath();
      s.stroke();
   };
   b2DebugDraw.prototype.DrawSolidPolygon = function (vertices, vertexCount, color) {
      if (!vertexCount) return;
      var s = this.m_ctx;
      var drawScale = this.m_drawScale;
      s.beginPath();
      s.strokeStyle = this._color(color.color, this.m_alpha);
      s.fillStyle = this._color(color.color, this.m_fillAlpha);
      s.moveTo(vertices[0].x * drawScale, vertices[0].y * drawScale);
      for (var i = 1; i < vertexCount; i++) {
         s.lineTo(vertices[i].x * drawScale, vertices[i].y * drawScale);
      }
      s.lineTo(vertices[0].x * drawScale, vertices[0].y * drawScale);
      s.closePath();
      s.fill();
      s.stroke();
   };
   b2DebugDraw.prototype.DrawCircle = function (center, radius, color) {
      if (!radius) return;
      var s = this.m_ctx;
      var drawScale = this.m_drawScale;
      s.beginPath();
      s.strokeStyle = this._color(color.color, this.m_alpha);
      s.arc(center.x * drawScale, center.y * drawScale, radius * drawScale, 0, Math.PI * 2, true);
      s.closePath();
      s.stroke();
   };
   b2DebugDraw.prototype.DrawSolidCircle = function (center, radius, axis, color) {
      if (!radius) return;
      var s = this.m_ctx,
         drawScale = this.m_drawScale,
         cx = center.x * drawScale,
         cy = center.y * drawScale;
      s.moveTo(0, 0);
      s.beginPath();
      s.strokeStyle = this._color(color.color, this.m_alpha);
      s.fillStyle = this._color(color.color, this.m_fillAlpha);
      s.arc(cx, cy, radius * drawScale, 0, Math.PI * 2, true);
      s.moveTo(cx, cy);
      s.lineTo((center.x + axis.x * radius) * drawScale, (center.y + axis.y * radius) * drawScale);
      s.closePath();
      s.fill();
      s.stroke();
   };
   b2DebugDraw.prototype.DrawSegment = function (p1, p2, color) {
      var s = this.m_ctx,
         drawScale = this.m_drawScale;
      s.strokeStyle = this._color(color.color, this.m_alpha);
      s.beginPath();
      s.moveTo(p1.x * drawScale, p1.y * drawScale);
      s.lineTo(p2.x * drawScale, p2.y * drawScale);
      s.closePath();
      s.stroke();
   };
   b2DebugDraw.prototype.DrawTransform = function (xf) {
      var s = this.m_ctx,
         drawScale = this.m_drawScale;
      s.beginPath();
      s.strokeStyle = this._color(0xff0000, this.m_alpha);
      s.moveTo(xf.position.x * drawScale, xf.position.y * drawScale);
      s.lineTo((xf.position.x + this.m_xformScale * xf.R.col1.x) * drawScale, (xf.position.y + this.m_xformScale * xf.R.col1.y) * drawScale);

      s.strokeStyle = this._color(0xff00, this.m_alpha);
      s.moveTo(xf.position.x * drawScale, xf.position.y * drawScale);
      s.lineTo((xf.position.x + this.m_xformScale * xf.R.col2.x) * drawScale, (xf.position.y + this.m_xformScale * xf.R.col2.y) * drawScale);
      s.closePath();
      s.stroke();
   };
   Box2D.postDefs.push(function () {
      Box2D.Dynamics.b2DebugDraw.e_shapeBit = 0x0001;
      Box2D.Dynamics.b2DebugDraw.e_jointBit = 0x0002;
      Box2D.Dynamics.b2DebugDraw.e_aabbBit = 0x0004;
      Box2D.Dynamics.b2DebugDraw.e_pairBit = 0x0008;
      Box2D.Dynamics.b2DebugDraw.e_centerOfMassBit = 0x0010;
      Box2D.Dynamics.b2DebugDraw.e_controllerBit = 0x0020;
   });
})(Box2D.Dynamics.b2DebugDraw);

(function(){
   function b2Body() {
      b2Body.b2Body.apply(this, arguments);
      if (this.constructor === b2Body) this.b2Body.apply(this, arguments);
   };
   Box2D.Dynamics.b2Body = b2Body;

   function b2BodyDef() {
      b2BodyDef.b2BodyDef.apply(this, arguments);
      if (this.constructor === b2BodyDef) this.b2BodyDef.apply(this, arguments);
   };
   Box2D.Dynamics.b2BodyDef = b2BodyDef;

   function b2ContactFilter() {
      b2ContactFilter.b2ContactFilter.apply(this, arguments);
   };
   Box2D.Dynamics.b2ContactFilter = b2ContactFilter;

   function b2ContactImpulse() {
      b2ContactImpulse.b2ContactImpulse.apply(this, arguments);
   };
   Box2D.Dynamics.b2ContactImpulse = b2ContactImpulse;

   function b2ContactListener() {
      b2ContactListener.b2ContactListener.apply(this, arguments);
   };
   Box2D.Dynamics.b2ContactListener = b2ContactListener;

   function b2DestructionListener() {
      b2DestructionListener.b2DestructionListener.apply(this, arguments);
   };
   Box2D.Dynamics.b2DestructionListener = b2DestructionListener;

   function b2FilterData() {
      b2FilterData.b2FilterData.apply(this, arguments);
   };
   Box2D.Dynamics.b2FilterData = b2FilterData;

   function b2Fixture() {
      b2Fixture.b2Fixture.apply(this, arguments);
      if (this.constructor === b2Fixture) this.b2Fixture.apply(this, arguments);
   };
   Box2D.Dynamics.b2Fixture = b2Fixture;

   function b2FixtureDef() {
      b2FixtureDef.b2FixtureDef.apply(this, arguments);
      if (this.constructor === b2FixtureDef) this.b2FixtureDef.apply(this, arguments);
   };
   Box2D.Dynamics.b2FixtureDef = b2FixtureDef;

   function b2Island() {
      b2Island.b2Island.apply(this, arguments);
      if (this.constructor === b2Island) this.b2Island.apply(this, arguments);
   };
   Box2D.Dynamics.b2Island = b2Island;

   function b2TimeStep() {
      b2TimeStep.b2TimeStep.apply(this, arguments);
   };
   Box2D.Dynamics.b2TimeStep = b2TimeStep;
})();
/*
 * See Box2D.js
 */
goog.provide('Box2D.Dynamics.Contacts');
goog.require('Box2D.base');

Box2D.Dynamics.Contacts.b2Contact = function() {
    this.m_nodeA = new Box2D.Dynamics.Contacts.b2ContactEdge();
    this.m_nodeB = new Box2D.Dynamics.Contacts.b2ContactEdge();
    this.m_manifold = new Box2D.Collision.b2Manifold();
    this.m_oldManifold = new Box2D.Collision.b2Manifold();
    if (this.constructor === Box2D.Dynamics.Contacts.b2Contact) {
        this.b2Contact.apply(this, arguments);
    }
};

(function(b2Contact) {
   b2Contact.b2Contact = function () {
   };
   b2Contact.prototype.GetManifold = function () {
      return this.m_manifold;
   };
   b2Contact.prototype.GetWorldManifold = function (worldManifold) {
      var bodyA = this.m_fixtureA.GetBody();
      var bodyB = this.m_fixtureB.GetBody();
      var shapeA = this.m_fixtureA.GetShape();
      var shapeB = this.m_fixtureB.GetShape();
      worldManifold.Initialize(this.m_manifold, bodyA.GetTransform(), shapeA.m_radius, bodyB.GetTransform(), shapeB.m_radius);
   };
   b2Contact.prototype.IsTouching = function () {
      return this.touching;
   };
   b2Contact.prototype.IsContinuous = function () {
      return this.continuous;
   };
   b2Contact.prototype.SetSensor = function (sensor) {
       this.sensor = sensor;
   };
   b2Contact.prototype.IsSensor = function () {
      return this.sensor;
   };
   b2Contact.prototype.SetEnabled = function (flag) {
       this.enabled = flag;
   };
   b2Contact.prototype.IsEnabled = function () {
       return this.enabled;
   };
   b2Contact.prototype.GetNext = function () {
      return this.m_next;
   };
   b2Contact.prototype.GetFixtureA = function () {
      return this.m_fixtureA;
   };
   b2Contact.prototype.GetFixtureB = function () {
      return this.m_fixtureB;
   };
   b2Contact.prototype.FlagForFiltering = function () {
       this.filtering = true;
   };
   b2Contact.prototype.ClearFiltering = function () {
       this.filtering = false;
   };
   b2Contact.prototype.IsFiltering = function () {
       return this.filtering;
   };
   b2Contact.prototype.b2Contact = function () {};
   b2Contact.prototype.Reset = function (fixtureA, fixtureB) {
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
      if (bodyA.GetType() != Box2D.Dynamics.b2Body.b2_dynamicBody || bodyA.IsBullet() || bodyB.GetType() != Box2D.Dynamics.b2Body.b2_dynamicBody || bodyB.IsBullet()) {
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
   b2Contact.prototype.Update = function (listener) {
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
            var shapeA = this.m_fixtureA.GetShape();
            var shapeB = this.m_fixtureB.GetShape();
            var xfA = bodyA.GetTransform();
            var xfB = bodyB.GetTransform();
            touching = Box2D.Collision.Shapes.b2Shape.TestOverlap(shapeA, xfA, shapeB, xfB);
         }
         this.m_manifold.m_pointCount = 0;
      } else {
         if (bodyA.GetType() != Box2D.Dynamics.b2Body.b2_dynamicBody || bodyA.IsBullet() || bodyB.GetType() != Box2D.Dynamics.b2Body.b2_dynamicBody || bodyB.IsBullet()) {
            this.continuous = true;
         } else {
            this.continuous = false;
         }
         if (aabbOverlap) {
            this.Evaluate();
            touching = this.m_manifold.m_pointCount > 0;
            for (var i = 0; i < this.m_manifold.m_pointCount; ++i) {
               var mp2 = this.m_manifold.m_points[i];
               mp2.m_normalImpulse = 0.0;
               mp2.m_tangentImpulse = 0.0;
               var id2 = mp2.m_id;
               for (var j = 0; j < this.m_oldManifold.m_pointCount; ++j) {
                  var mp1 = this.m_oldManifold.m_points[j];
                  if (mp1.m_id.key == id2.key) {
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
   b2Contact.prototype.Evaluate = function () {};
   b2Contact.prototype.ComputeTOI = function (sweepA, sweepB) {
      b2Contact.s_input.proxyA.Set(this.m_fixtureA.GetShape());
      b2Contact.s_input.proxyB.Set(this.m_fixtureB.GetShape());
      b2Contact.s_input.sweepA = sweepA;
      b2Contact.s_input.sweepB = sweepB;
      b2Contact.s_input.tolerance = Box2D.Common.b2Settings.b2_linearSlop;
      return Box2D.Collision.b2TimeOfImpact.TimeOfImpact(b2Contact.s_input);
   };
   Box2D.postDefs.push(function () {
      Box2D.Dynamics.Contacts.b2Contact.s_input = new Box2D.Collision.b2TOIInput();
   });
})(Box2D.Dynamics.Contacts.b2Contact);


Box2D.Dynamics.Contacts.b2CircleContact = function() {
    Box2D.Dynamics.Contacts.b2Contact.apply(this, arguments);
};
(function(b2CircleContact){
   Box2D.inherit(b2CircleContact, Box2D.Dynamics.Contacts.b2Contact);
   b2CircleContact.prototype.__super = Box2D.Dynamics.Contacts.b2Contact.prototype;
   b2CircleContact.Create = function () {
      return new b2CircleContact();
   };
   b2CircleContact.Destroy = function (contact) {};
   b2CircleContact.prototype.Reset = function (fixtureA, fixtureB) {
      this.__super.Reset.call(this, fixtureA, fixtureB);
   };
   b2CircleContact.prototype.Evaluate = function () {
      var bA = this.m_fixtureA.GetBody();
      var bB = this.m_fixtureB.GetBody();
      Box2D.Collision.b2Collision.CollideCircles(this.m_manifold, (this.m_fixtureA.GetShape() instanceof Box2D.Collision.Shapes.b2CircleShape ? this.m_fixtureA.GetShape() : null), bA.m_xf, (this.m_fixtureB.GetShape() instanceof Box2D.Collision.Shapes.b2CircleShape ? this.m_fixtureB.GetShape() : null), bB.m_xf);
   };
})(Box2D.Dynamics.Contacts.b2CircleContact);


Box2D.Dynamics.Contacts.b2ContactConstraint = function() {
    this.localPlaneNormal = new Box2D.Common.Math.b2Vec2();
    this.localPoint = new Box2D.Common.Math.b2Vec2();
    this.normal = new Box2D.Common.Math.b2Vec2();
    this.normalMass = new Box2D.Common.Math.b2Mat22();
    this.K = new Box2D.Common.Math.b2Mat22();
    if (this.constructor === Box2D.Dynamics.Contacts.b2ContactConstraint) {
        this.b2ContactConstraint.apply(this, arguments);
    }
};
(function(b2ContactConstraint){
   b2ContactConstraint.prototype.b2ContactConstraint = function () {
      this.points = new Array(Box2D.Common.b2Settings.b2_maxManifoldPoints);
      for (var i = 0; i < Box2D.Common.b2Settings.b2_maxManifoldPoints; i++) {
         this.points[i] = new Box2D.Dynamics.Contacts.b2ContactConstraintPoint();
      }
   };
})(Box2D.Dynamics.Contacts.b2ContactConstraint);

Box2D.Dynamics.Contacts.b2ContactConstraintPoint = function() {
      this.localPoint = new Box2D.Common.Math.b2Vec2();
      this.rA = new Box2D.Common.Math.b2Vec2();
      this.rB = new Box2D.Common.Math.b2Vec2();
};

Box2D.Dynamics.Contacts.b2ContactEdge = function() {};

Box2D.Dynamics.Contacts.b2ContactFactory = function() {
    if (this.constructor === Box2D.Dynamics.Contacts.b2ContactFactory) {
        this.b2ContactFactory.apply(this, arguments);
    }
};
(function(b2ContactFactory){
   b2ContactFactory.prototype.b2ContactFactory = function () {
      this.InitializeRegisters();
   };
   b2ContactFactory.prototype.AddType = function (createFcn, destroyFcn, type1, type2) {
      if (type1 === undefined) type1 = 0;
      if (type2 === undefined) type2 = 0;
      this.m_registers[type1][type2].createFcn = createFcn;
      this.m_registers[type1][type2].destroyFcn = destroyFcn;
      this.m_registers[type1][type2].primary = true;
      if (type1 != type2) {
         this.m_registers[type2][type1].createFcn = createFcn;
         this.m_registers[type2][type1].destroyFcn = destroyFcn;
         this.m_registers[type2][type1].primary = false;
      }
   };
   b2ContactFactory.prototype.InitializeRegisters = function () {
      this.m_registers = new Array(Box2D.Collision.Shapes.b2Shape.e_shapeTypeCount);
      for (var i = 0; i < Box2D.Collision.Shapes.b2Shape.e_shapeTypeCount; i++) {
         this.m_registers[i] = new Array(Box2D.Collision.Shapes.b2Shape.e_shapeTypeCount);
         for (var j = 0; j < Box2D.Collision.Shapes.b2Shape.e_shapeTypeCount; j++) {
            this.m_registers[i][j] = new Box2D.Dynamics.Contacts.b2ContactRegister();
         }
      }
      this.AddType(Box2D.Dynamics.Contacts.b2CircleContact.Create, Box2D.Dynamics.Contacts.b2CircleContact.Destroy, Box2D.Collision.Shapes.b2Shape.e_circleShape, Box2D.Collision.Shapes.b2Shape.e_circleShape);
      this.AddType(Box2D.Dynamics.Contacts.b2PolyAndCircleContact.Create, Box2D.Dynamics.Contacts.b2PolyAndCircleContact.Destroy, Box2D.Collision.Shapes.b2Shape.e_polygonShape, Box2D.Collision.Shapes.b2Shape.e_circleShape);
      this.AddType(Box2D.Dynamics.Contacts.b2PolygonContact.Create, Box2D.Dynamics.Contacts.b2PolygonContact.Destroy, Box2D.Collision.Shapes.b2Shape.e_polygonShape, Box2D.Collision.Shapes.b2Shape.e_polygonShape);
      this.AddType(Box2D.Dynamics.Contacts.b2EdgeAndCircleContact.Create, Box2D.Dynamics.Contacts.b2EdgeAndCircleContact.Destroy, Box2D.Collision.Shapes.b2Shape.e_edgeShape, Box2D.Collision.Shapes.b2Shape.e_circleShape);
      this.AddType(Box2D.Dynamics.Contacts.b2PolyAndEdgeContact.Create, Box2D.Dynamics.Contacts.b2PolyAndEdgeContact.Destroy, Box2D.Collision.Shapes.b2Shape.e_polygonShape, Box2D.Collision.Shapes.b2Shape.e_edgeShape);
   };
   
   b2ContactFactory.prototype.Create = function (fixtureA, fixtureB) {
      var type1 = fixtureA.GetType();
      var type2 = fixtureB.GetType();
      var reg = this.m_registers[type1][type2];
      var c;
      if (reg.pool) {
         c = reg.pool;
         reg.pool = c.m_next;
         reg.poolCount--;
         c.Reset(fixtureA, fixtureB);
         return c;
      }
      var createFcn = reg.createFcn;
      if (createFcn != null) {
         if (reg.primary) {
            c = createFcn();
            c.Reset(fixtureA, fixtureB);
            return c;
         } else {
            c = createFcn();
            c.Reset(fixtureB, fixtureA);
            return c;
         }
      } else {
         return null;
      }
   };
   b2ContactFactory.prototype.Create = function (fixtureA, fixtureB) {
      var type1 = fixtureA.GetType();
      var type2 = fixtureB.GetType();
      var reg = this.m_registers[type1][type2];
      var c;
      if (reg.pool) {
         c = reg.pool;
         reg.pool = c.m_next;
         reg.poolCount--;
         c.Reset(fixtureA, fixtureB);
         return c;
      }
      var createFcn = reg.createFcn;
      if (createFcn != null) {
         if (reg.primary) {
            c = createFcn();
            c.Reset(fixtureA, fixtureB);
            return c;
         } else {
            c = createFcn();
            c.Reset(fixtureB, fixtureA);
            return c;
         }
      }
      else {
         return null;
      }
   };
   b2ContactFactory.prototype.Destroy = function (contact) {
      if (contact.m_manifold.m_pointCount > 0) {
         contact.m_fixtureA.m_body.SetAwake(true);
         contact.m_fixtureB.m_body.SetAwake(true);
      }
      var type1 = contact.m_fixtureA.GetType();
      var type2 = contact.m_fixtureB.GetType();
      var reg = this.m_registers[type1][type2];
      if (true) {
         reg.poolCount++;
         contact.m_next = reg.pool;
         reg.pool = contact;
      }
      var destroyFcn = reg.destroyFcn;
      destroyFcn(contact);
   };
})(Box2D.Dynamics.Contacts.b2ContactFactory);

   function b2ContactRegister() {
      b2ContactRegister.b2ContactRegister.apply(this, arguments);
   };
   Box2D.Dynamics.Contacts.b2ContactRegister = b2ContactRegister;

   function b2ContactResult() {
      b2ContactResult.b2ContactResult.apply(this, arguments);
   };
   Box2D.Dynamics.Contacts.b2ContactResult = b2ContactResult;

   function b2ContactSolver() {
      b2ContactSolver.b2ContactSolver.apply(this, arguments);
      if (this.constructor === b2ContactSolver) this.b2ContactSolver.apply(this, arguments);
   };
   Box2D.Dynamics.Contacts.b2ContactSolver = b2ContactSolver;

   function b2EdgeAndCircleContact() {
      b2EdgeAndCircleContact.b2EdgeAndCircleContact.apply(this, arguments);
   };
   Box2D.Dynamics.Contacts.b2EdgeAndCircleContact = b2EdgeAndCircleContact;

   function b2NullContact() {
      b2NullContact.b2NullContact.apply(this, arguments);
      if (this.constructor === b2NullContact) this.b2NullContact.apply(this, arguments);
   };
   Box2D.Dynamics.Contacts.b2NullContact = b2NullContact;

   function b2PolyAndCircleContact() {
      b2PolyAndCircleContact.b2PolyAndCircleContact.apply(this, arguments);
   };
   Box2D.Dynamics.Contacts.b2PolyAndCircleContact = b2PolyAndCircleContact;

   function b2PolyAndEdgeContact() {
      b2PolyAndEdgeContact.b2PolyAndEdgeContact.apply(this, arguments);
   };
   Box2D.Dynamics.Contacts.b2PolyAndEdgeContact = b2PolyAndEdgeContact;

   function b2PolygonContact() {
      b2PolygonContact.b2PolygonContact.apply(this, arguments);
   };
   Box2D.Dynamics.Contacts.b2PolygonContact = b2PolygonContact;

   function b2PositionSolverManifold() {
      b2PositionSolverManifold.b2PositionSolverManifold.apply(this, arguments);
      if (this.constructor === b2PositionSolverManifold) this.b2PositionSolverManifold.apply(this, arguments);
   };
   Box2D.Dynamics.Contacts.b2PositionSolverManifold = b2PositionSolverManifold;

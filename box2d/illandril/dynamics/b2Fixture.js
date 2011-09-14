/*
 * See Box2D.js
 */
goog.provide('Box2D.Dynamics.b2Fixture');

goog.require('Box2D.Common.Math.b2Math');
goog.require('Box2D.Dynamics.b2FilterData');
goog.require('Box2D.Collision.b2AABB');
goog.require('Box2D.Collision.Shapes.b2MassData');

/**
 * @constructor
 */
Box2D.Dynamics.b2Fixture = function() {
    /** @type {!Box2D.Dynamics.b2FilterData} */
    this.m_filter = new Box2D.Dynamics.b2FilterData();
    
    /** @type {!Box2D.Collision.b2AABB} */
    this.m_aabb = new Box2D.Collision.b2AABB();
    
    /** @type {Box2D.Dynamics.b2Body} */
    this.m_body = null;
    
    /** @type {Box2D.Dynamics.b2Fixture} */
    this.m_next = null;
    
    /** @type {Box2D.Collision.Shapes.b2Shape} */
    this.m_shape = null;
    
    /** @type {number} */
    this.m_density = 0.0;
    
    /** @type {number} */
    this.m_friction = 0.0;
    
    /** @type {number} */
    this.m_restitution = 0.0;
};

Box2D.Dynamics.b2Fixture.prototype.GetShape = function() {
    return this.m_shape;
};

Box2D.Dynamics.b2Fixture.prototype.SetSensor = function(sensor) {
    if (this.m_isSensor == sensor) {
        return;
    }
    this.m_isSensor = sensor;
    if (this.m_body == null) {
        return;
    }
    var edge = this.m_body.GetContactList();
    while (edge) {
        var contact = edge.contact;
        var fixtureA = contact.GetFixtureA();
        var fixtureB = contact.GetFixtureB();
        if (fixtureA == this || fixtureB == this) {
            contact.SetSensor(fixtureA.IsSensor() || fixtureB.IsSensor());
        }
        edge = edge.next;
    }
};

Box2D.Dynamics.b2Fixture.prototype.IsSensor = function() {
    return this.m_isSensor;
};

Box2D.Dynamics.b2Fixture.prototype.SetFilterData = function(filter) {
    this.m_filter = filter.Copy();
    if (this.m_body == null) {
        return;
    }
    var edge = this.m_body.GetContactList();
    while (edge) {
        var contact = edge.contact;
        var fixtureA = contact.GetFixtureA();
        var fixtureB = contact.GetFixtureB();
        if (fixtureA == this || fixtureB == this) {
            contact.FlagForFiltering();
        }
        edge = edge.next;
    }
};

Box2D.Dynamics.b2Fixture.prototype.GetFilterData = function() {
    return this.m_filter.Copy();
};

Box2D.Dynamics.b2Fixture.prototype.GetBody = function() {
    return this.m_body;
};

Box2D.Dynamics.b2Fixture.prototype.GetNext = function() {
    return this.m_next;
};

Box2D.Dynamics.b2Fixture.prototype.TestPoint = function(p) {
    return this.m_shape.TestPoint(this.m_body.GetTransform(), p);
};

/**
 * @param {!Box2D.Collision.b2RayCastOutput} output
 * @param {!Box2D.Collision.b2RayCastInput} input
 * @return {boolean}
 */
Box2D.Dynamics.b2Fixture.prototype.RayCast = function(output, input) {
    return this.m_shape.RayCast(output, input, this.m_body.GetTransform());
};

Box2D.Dynamics.b2Fixture.prototype.GetMassData = function(massData) {
    if (massData === undefined) massData = null;
    if (massData == null) {
        massData = new Box2D.Collision.Shapes.b2MassData();
    }
    this.m_shape.ComputeMass(massData, this.m_density);
    return massData;
};

/**
 * @param {number} density
 */
Box2D.Dynamics.b2Fixture.prototype.SetDensity = function(density) {
    this.m_density = density;
};

/**
 * @return {number}
 */
Box2D.Dynamics.b2Fixture.prototype.GetDensity = function() {
    return this.m_density;
};

/**
 * @return {number}
 */
Box2D.Dynamics.b2Fixture.prototype.GetFriction = function() {
    return this.m_friction;
};

/**
 * @param {number} friction
 */
Box2D.Dynamics.b2Fixture.prototype.SetFriction = function(friction) {
    this.m_friction = friction;
};

/**
 * @return {number}
 */
Box2D.Dynamics.b2Fixture.prototype.GetRestitution = function() {
    return this.m_restitution;
};

/**
 * @param {number} restitution
 */
Box2D.Dynamics.b2Fixture.prototype.SetRestitution = function(restitution) {
    this.m_restitution = restitution;
};

Box2D.Dynamics.b2Fixture.prototype.GetAABB = function() {
    return this.m_aabb;
};

Box2D.Dynamics.b2Fixture.prototype.Create = function(body, xf, def) {
    this.m_friction = def.friction;
    this.m_restitution = def.restitution;
    this.m_body = body;
    this.m_next = null;
    this.m_filter = def.filter.Copy();
    this.m_isSensor = def.isSensor;
    this.m_shape = def.shape.Copy();
    this.m_density = def.density;
};

Box2D.Dynamics.b2Fixture.prototype.Destroy = function() {
    this.m_shape = null;
};

Box2D.Dynamics.b2Fixture.prototype.CreateProxy = function(broadPhase, xf) {
    this.m_shape.ComputeAABB(this.m_aabb, xf);
    this.m_proxy = broadPhase.CreateProxy(this.m_aabb, this);
};

Box2D.Dynamics.b2Fixture.prototype.DestroyProxy = function(broadPhase) {
    if (this.m_proxy == null) {
        return;
    }
    broadPhase.DestroyProxy(this.m_proxy);
    this.m_proxy = null;
};

Box2D.Dynamics.b2Fixture.prototype.Synchronize = function(broadPhase, transform1, transform2) {
    if (!this.m_proxy) return;
    var aabb1 = new Box2D.Collision.b2AABB();
    var aabb2 = new Box2D.Collision.b2AABB();
    this.m_shape.ComputeAABB(aabb1, transform1);
    this.m_shape.ComputeAABB(aabb2, transform2);
    this.m_aabb.Combine(aabb1, aabb2);
    var displacement = Box2D.Common.Math.b2Math.SubtractVV(transform2.position, transform1.position);
    broadPhase.MoveProxy(this.m_proxy, this.m_aabb, displacement);
};

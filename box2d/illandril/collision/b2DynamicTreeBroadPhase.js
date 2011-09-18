/*
 * See Box2D.js
 */
goog.provide('Box2D.Collision.b2DynamicTreeBroadPhase');

goog.require('Box2D.Collision.b2DynamicTree');
goog.require('Box2D.Collision.b2DynamicTreePair');
goog.require('Box2D.Collision.IBroadPhase');

goog.require('goog.array');

/**
 * @constructor
 */
Box2D.Collision.b2DynamicTreeBroadPhase = function() {
    /** @type {!Box2D.Collision.b2DynamicTree} */
    this.m_tree = new Box2D.Collision.b2DynamicTree();
    
    /** @type {Array.<!Box2D.Collision.b2DynamicTreeNode>} */
    this.m_moveBuffer = [];
};

/**
 * @param {!Box2D.Collision.b2AABB} aabb
 * @param {Box2D.Dynamics.b2Fixture} fixture
 * @return {!Box2D.Collision.b2DynamicTreeNode}
 */
Box2D.Collision.b2DynamicTreeBroadPhase.prototype.CreateProxy = function(aabb, fixture) {
    var proxy = this.m_tree.CreateProxy(aabb, fixture);
    this.BufferMove(proxy);
    return proxy;
};

/**
 * @param {!Box2D.Collision.b2DynamicTreeNode}
 */
Box2D.Collision.b2DynamicTreeBroadPhase.prototype.DestroyProxy = function(proxy) {
    this.UnBufferMove(proxy);
    this.m_tree.DestroyProxy(proxy);
};

/**
 * @param {!Box2D.Collision.b2DynamicTreeNode} proxy
 * @param {!Box2D.Collision.b2AABB} aabb
 * @param {!Box2D.Common.Math.b2Vec2} displacement
 */
Box2D.Collision.b2DynamicTreeBroadPhase.prototype.MoveProxy = function(proxy, aabb, displacement) {
    var buffer = this.m_tree.MoveProxy(proxy, aabb, displacement);
    if (buffer) {
        this.BufferMove(proxy);
    }
};

/**
 * @param {!Box2D.Collision.b2DynamicTreeNode} proxyA
 * @param {!Box2D.Collision.b2DynamicTreeNode} proxyB
 * @return {boolean}
 */
Box2D.Collision.b2DynamicTreeBroadPhase.prototype.TestOverlap = function(proxyA, proxyB) {
    var aabbA = this.m_tree.GetFatAABB(proxyA);
    var aabbB = this.m_tree.GetFatAABB(proxyB);
    return aabbA.TestOverlap(aabbB);
};

/**
 * @param {!Box2D.Collision.b2DynamicTreeNode} proxy
 * @return {!Box2D.Collision.b2AABB}
 */
Box2D.Collision.b2DynamicTreeBroadPhase.prototype.GetFatAABB = function(proxy) {
    return this.m_tree.GetFatAABB(proxy);
};

/**
 * @return {number}
 */
Box2D.Collision.b2DynamicTreeBroadPhase.prototype.GetProxyCount = function() {
    return this.m_tree.length;
};

/**
 * @param {function(Box2D.Dynamics.b2Fixture, Box2D.Dynamics.b2Fixture)} callback
 */
Box2D.Collision.b2DynamicTreeBroadPhase.prototype.UpdatePairs = function(callback) {
    var __this = this;
    var pairs = [];
    for (var i = 0; i < this.m_moveBuffer.length; i++) {
        var queryProxy = this.m_moveBuffer[i];
        
        var QueryCallback = function(fixture) {
            if (fixture != queryProxy.fixture) {
                pairs.push(new Box2D.Collision.b2DynamicTreePair(queryProxy.fixture, fixture));
            }
            return true;
        };
        var fatAABB = this.m_tree.GetFatAABB(queryProxy);
        this.m_tree.Query(QueryCallback, fatAABB);
    }
    this.m_moveBuffer = [];
    var i = 0;
    while(i < pairs.length) {
        var primaryPair = pairs[i];
        callback(primaryPair.fixtureA, primaryPair.fixtureB);
        i++;
        while(i < pairs.length) {
            var pair = pairs[i];
            if (!(pair.fixtureA == primaryPair.fixtureA && pair.fixtureB == primaryPair.fixtureB)
                && !(pair.fixtureA == primaryPair.fixtureB && pair.fixtureB == primaryPair.fixtureA)) {
                break;
            }
            i++;
        }
    }
};

/**
 * @param {function(!Box2D.Dynamics.b2Fixture): boolean} callback
 * @param {!Box2D.Collision.b2AABB} aabb
 */
Box2D.Collision.b2DynamicTreeBroadPhase.prototype.Query = function(callback, aabb) {
    this.m_tree.Query(callback, aabb);
};

/**
 * @param {function(!Box2D.Collision.b2RayCastInput, !Box2D.Collision.b2Fixture): number} callback
 * @param {!Box2D.Collision.b2RayCastInput} input
 */
Box2D.Collision.b2DynamicTreeBroadPhase.prototype.RayCast = function(callback, input) {
    this.m_tree.RayCast(callback, input);
};

/**
 * @param {number} iterations
 */
Box2D.Collision.b2DynamicTreeBroadPhase.prototype.Rebalance = function(iterations) {
    this.m_tree.Rebalance(iterations);
};

Box2D.Collision.b2DynamicTreeBroadPhase.prototype.BufferMove = function(proxy) {
    this.m_moveBuffer.push(proxy);
};

Box2D.Collision.b2DynamicTreeBroadPhase.prototype.UnBufferMove = function(proxy) {
    goog.array.remove(this.m_moveBuffer, proxy);
};

Box2D.Collision.b2DynamicTreeBroadPhase.__implements = {};
Box2D.Collision.b2DynamicTreeBroadPhase.__implements[Box2D.Collision.IBroadPhase] = true;

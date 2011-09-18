/*
 * See Box2D.js
 */
goog.provide('Box2D.Collision.b2DynamicTree');

goog.require('Box2D.Collision.b2RayCastInput');
goog.require('Box2D.Collision.b2AABB');
goog.require('Box2D.Collision.b2DynamicTreeNode');
goog.require('Box2D.Common.b2Settings');
goog.require('Box2D.Common.Math.b2Math');

/**
 * @constructor
 */
Box2D.Collision.b2DynamicTree = function() {
    /** @type {Box2D.Collision.b2DynamicTreeNode} */
    this.m_root = null;
    
    /** @type {number} */
    this.m_path = 0;
    
    /** @type {number} */
    this.m_insertionCount = 0;
};

/**
 * @param {!Box2D.Collision.b2AABB} aabb
 * @param {Box2D.Dynamics.b2Fixture} fixture
 * @return {!Box2D.Collision.b2DynamicTreeNode}
 */
Box2D.Collision.b2DynamicTree.prototype.CreateProxy = function(aabb, fixture) {
    var node = new Box2D.Collision.b2DynamicTreeNode(fixture);
    var extendX = Box2D.Common.b2Settings.b2_aabbExtension;
    var extendY = Box2D.Common.b2Settings.b2_aabbExtension;
    node.aabb.lowerBound.x = aabb.lowerBound.x - extendX;
    node.aabb.lowerBound.y = aabb.lowerBound.y - extendY;
    node.aabb.upperBound.x = aabb.upperBound.x + extendX;
    node.aabb.upperBound.y = aabb.upperBound.y + extendY;
    this.InsertLeaf(node);
    return node;
};

/**
 * @param {!Box2D.Collision.b2DynamicTreeNode} proxy
 */
Box2D.Collision.b2DynamicTree.prototype.DestroyProxy = function(proxy) {
    this.RemoveLeaf(proxy);
};

/**
 * @param {!Box2D.Collision.b2DynamicTreeNode} proxy
 * @param {!Box2D.Collision.b2AABB} aabb
 * @param {!Box2D.Common.Math.b2Vec2} displacement
 * @return {boolean}
 */
Box2D.Collision.b2DynamicTree.prototype.MoveProxy = function(proxy, aabb, displacement) {
    Box2D.Common.b2Settings.b2Assert(proxy.IsLeaf());
    if (proxy.aabb.Contains(aabb)) {
        return false;
    }
    this.RemoveLeaf(proxy);
    var extendX = Box2D.Common.b2Settings.b2_aabbExtension + Box2D.Common.b2Settings.b2_aabbMultiplier * Math.abs(displacement.x);
    var extendY = Box2D.Common.b2Settings.b2_aabbExtension + Box2D.Common.b2Settings.b2_aabbMultiplier * Math.abs(displacement.y);
    proxy.aabb.lowerBound.x = aabb.lowerBound.x - extendX;
    proxy.aabb.lowerBound.y = aabb.lowerBound.y - extendY;
    proxy.aabb.upperBound.x = aabb.upperBound.x + extendX;
    proxy.aabb.upperBound.y = aabb.upperBound.y + extendY;
    this.InsertLeaf(proxy);
    return true;
};

/**
 * @param {number} iterations
 */
Box2D.Collision.b2DynamicTree.prototype.Rebalance = function(iterations) {
    if (this.m_root !== null) {
        for (var i = 0; i < iterations; i++) {
            var node = this.m_root;
            var bit = 0;
            while (!node.IsLeaf()) {
                node = (this.m_path >> bit) & 1 ? node.child2 : node.child1;
                bit = (bit + 1) & 31;
            }
            this.m_path++;
            this.RemoveLeaf(node);
            this.InsertLeaf(node);
        }
    }
};

/**
 * @param {!Box2D.Collision.b2DynamicTreeNode} proxy
 * @return {!Box2D.Collision.b2AABB}
 */
Box2D.Collision.b2DynamicTree.prototype.GetFatAABB = function(proxy) {
    return proxy.aabb;
};

/**
 * @param {function(!Box2D.Dynamics.b2Fixture): boolean} callback
 * @param {!Box2D.Collision.b2AABB} aabb
 */
Box2D.Collision.b2DynamicTree.prototype.Query = function(callback, aabb) {
    if (this.m_root !== null) {
        var stack = [];
        stack.push(this.m_root);
        while (stack.length > 0) {
            var node = stack.pop();
            if (node.aabb.TestOverlap(aabb)) {
                if (node.IsLeaf()) {
                    if (!callback(node.fixture)) {
                        return;
                    }
                } else {
                    stack.push(node.child1);
                    stack.push(node.child2);
                }
            }
        }
    }
};

/**
 * @param {function(!Box2D.Collision.b2RayCastInput, !Box2D.Dynamics.b2Fixture): number} callback
 * @param {!Box2D.Collision.b2RayCastInput} input
 */
Box2D.Collision.b2DynamicTree.prototype.RayCast = function(callback, input) {
    if (this.m_root === null) {
        return;
    }
    
    var r = Box2D.Common.Math.b2Math.SubtractVV(input.p1, input.p2);
    r.Normalize();
    var v = Box2D.Common.Math.b2Math.CrossFV(1.0, r);
    var abs_v = Box2D.Common.Math.b2Math.AbsV(v);
    var maxFraction = input.maxFraction;
    var tX = input.p1.x + maxFraction * (input.p2.x - input.p1.x);
    var tY = input.p1.y + maxFraction * (input.p2.y - input.p1.y);
    
    var segmentAABB = new Box2D.Collision.b2AABB();
    segmentAABB.lowerBound.x = Math.min(input.p1.x, tX);
    segmentAABB.lowerBound.y = Math.min(input.p1.y, tY);
    segmentAABB.upperBound.x = Math.max(input.p1.x, tX);
    segmentAABB.upperBound.y = Math.max(input.p1.y, tY);
    
    var stack = [];
    stack.push(this.m_root);
    while (stack.length > 0) {
        var node = stack.pop();
        if (!node.aabb.TestOverlap(segmentAABB)) {
            continue;
        }
        var c = node.aabb.GetCenter();
        var h = node.aabb.GetExtents();
        var separation = Math.abs(v.x * (input.p1.x - c.x) + v.y * (input.p1.y - c.y)) - abs_v.x * h.x - abs_v.y * h.y;
        if (separation > 0.0) {
            continue;
        }
        if (node.IsLeaf()) {
            var subInput = new Box2D.Collision.b2RayCastInput(input.p1, input.p2, input.maxFraction);
            maxFraction = callback(input, node.fixture);
            if (maxFraction == 0.0) {
                return;
            }
            if (maxFraction > 0.0) {
                tX = input.p1.x + maxFraction * (input.p2.x - input.p1.x);
                tY = input.p1.y + maxFraction * (input.p2.y - input.p1.y);
                segmentAABB.lowerBound.x = Math.min(input.p1.x, tX);
                segmentAABB.lowerBound.y = Math.min(input.p1.y, tY);
                segmentAABB.upperBound.x = Math.max(input.p1.x, tX);
                segmentAABB.upperBound.y = Math.max(input.p1.y, tY);
            }
        } else {
            stack.push(node.child1);
            stack.push(node.child2);
        }
    }
};

/**
 * @param {!Box2D.Collision.b2DynamicTreeNode} leaf
 */
Box2D.Collision.b2DynamicTree.prototype.InsertLeaf = function(leaf) {
    this.m_insertionCount++;
    if (this.m_root === null) {
        this.m_root = leaf;
        this.m_root.parent = null;
        return;
    }
    var sibling = this.GetBestSibling(leaf);
    
    var parent = sibling.parent;
    var node2 = new Box2D.Collision.b2DynamicTreeNode();
    node2.parent = parent;
    node2.aabb.Combine(leaf.aabb, sibling.aabb);
    if (parent) {
        if (sibling.parent.child1 == sibling) {
            parent.child1 = node2;
        } else {
            parent.child2 = node2;
        }
        node2.child1 = sibling;
        node2.child2 = leaf;
        sibling.parent = node2;
        leaf.parent = node2;
        while (parent) {
            if (parent.aabb.Contains(node2.aabb)) {
                break;
            }
            parent.aabb.Combine(parent.child1.aabb, parent.child2.aabb);
            node2 = parent;
            parent = parent.parent;
        }
    } else {
        node2.child1 = sibling;
        node2.child2 = leaf;
        sibling.parent = node2;
        leaf.parent = node2;
        this.m_root = node2;
    }
};

/**
 * @param {!Box2D.Collision.b2DynamicTreeNode} leaf
 * @return {!Box2D.Collision.b2DynamicTreeNode}
 */
Box2D.Collision.b2DynamicTree.prototype.GetBestSibling = function(leaf) {
    var center = leaf.aabb.GetCenter();
    var sibling = this.m_root;
    while(!sibling.IsLeaf()) {
        var child1 = sibling.child1;
        var child2 = sibling.child2;
        var norm1 = Math.abs((child1.aabb.lowerBound.x + child1.aabb.upperBound.x) / 2 - center.x) + Math.abs((child1.aabb.lowerBound.y + child1.aabb.upperBound.y) / 2 - center.y);
        var norm2 = Math.abs((child2.aabb.lowerBound.x + child2.aabb.upperBound.x) / 2 - center.x) + Math.abs((child2.aabb.lowerBound.y + child2.aabb.upperBound.y) / 2 - center.y);
        if (norm1 < norm2) {
            sibling = child1; 
        } else {
            sibling = child2;
        }
    }
    return sibling;
};

/**
 * @param {!Box2D.Collision.b2DynamicTreeNode} leaf
 */
Box2D.Collision.b2DynamicTree.prototype.RemoveLeaf = function(leaf) {
    if (leaf == this.m_root) {
        this.m_root = null;
        return;
    }
    var node2 = leaf.parent;
    var node1 = node2.parent;
    var sibling;
    if (node2.child1 == leaf) {
        sibling = node2.child2;
    } else {
        sibling = node2.child1;
    }
    if (node1) {
        if (node1.child1 == node2) {
            node1.child1 = sibling;
        } else {
            node1.child2 = sibling;
        }
        sibling.parent = node1;
        while (node1) {
            var oldAABB = node1.aabb;
            node1.aabb = Box2D.Collision.b2AABB.Combine(node1.child1.aabb, node1.child2.aabb);
            if (oldAABB.Contains(node1.aabb)) {
                break;
            }
            node1 = node1.parent;
        }
    } else {
        this.m_root = sibling;
        sibling.parent = null;
    }
};

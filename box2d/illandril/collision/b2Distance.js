/*
 * See Box2D.js
 */

goog.provide('Box2D.Collision.b2Distance');

goog.require('Box2D.Common.b2Settings');
goog.require('Box2D.Common.Math.b2Math');
goog.require('Box2D.Common.Math.b2Vec2');
goog.require('Box2D.Collision.b2Simplex');

/**
 * @constructor
 */
Box2D.Collision.b2Distance = function() {};

Box2D.Collision.b2Distance.Distance = function(output, cache, input) {
    Box2D.Collision.b2Distance.s_simplex.ReadCache(cache, input.proxyA, input.transformA, input.proxyB, input.transformB);
    if (Box2D.Collision.b2Distance.s_simplex.m_count < 1 || Box2D.Collision.b2Distance.s_simplex.m_count > 3) {
        Box2D.Common.b2Settings.b2Assert(false);
    }
    var iter = 0;
    while (iter < 20) {
        var save = [];
        for (var i = 0; i < Box2D.Collision.b2Distance.s_simplex.m_count; i++) {
            save[i] = {};
            save[i].indexA = Box2D.Collision.b2Distance.s_simplex.m_vertices[i].indexA;
            save[i].indexB = Box2D.Collision.b2Distance.s_simplex.m_vertices[i].indexB;
        }
        if (Box2D.Collision.b2Distance.s_simplex.m_count == 2) {
            Box2D.Collision.b2Distance.s_simplex.Solve2();
        } else if (Box2D.Collision.b2Distance.s_simplex.m_count == 3) {
            Box2D.Collision.b2Distance.s_simplex.Solve3();
        }
        if (Box2D.Collision.b2Distance.s_simplex.m_count == 3) {
            // m_count can be changed by s_simplex.Solve3/Solve2
            break;
        }
        var d = Box2D.Collision.b2Distance.s_simplex.GetSearchDirection();
        if (d.LengthSquared() < Box2D.Consts.MIN_VALUE_SQUARED) {
            break;
        }
        Box2D.Collision.b2Distance.s_simplex.m_vertices[Box2D.Collision.b2Distance.s_simplex.m_count].indexA = input.proxyA.GetSupport(Box2D.Common.Math.b2Math.MulTMV(input.transformA.R, d.GetNegative()));
        Box2D.Collision.b2Distance.s_simplex.m_vertices[Box2D.Collision.b2Distance.s_simplex.m_count].wA = Box2D.Common.Math.b2Math.MulX(input.transformA, input.proxyA.GetVertex(Box2D.Collision.b2Distance.s_simplex.m_vertices[Box2D.Collision.b2Distance.s_simplex.m_count].indexA));
        Box2D.Collision.b2Distance.s_simplex.m_vertices[Box2D.Collision.b2Distance.s_simplex.m_count].indexB = input.proxyB.GetSupport(Box2D.Common.Math.b2Math.MulTMV(input.transformB.R, d));
        Box2D.Collision.b2Distance.s_simplex.m_vertices[Box2D.Collision.b2Distance.s_simplex.m_count].wB = Box2D.Common.Math.b2Math.MulX(input.transformB, input.proxyB.GetVertex(Box2D.Collision.b2Distance.s_simplex.m_vertices[Box2D.Collision.b2Distance.s_simplex.m_count].indexB));
        Box2D.Collision.b2Distance.s_simplex.m_vertices[Box2D.Collision.b2Distance.s_simplex.m_count].w = Box2D.Common.Math.b2Math.SubtractVV(Box2D.Collision.b2Distance.s_simplex.m_vertices[Box2D.Collision.b2Distance.s_simplex.m_count].wB, Box2D.Collision.b2Distance.s_simplex.m_vertices[Box2D.Collision.b2Distance.s_simplex.m_count].wA);

        iter++;
        var duplicate = false;
        for (var i = 0; i < save.length; i++) {
            if (Box2D.Collision.b2Distance.s_simplex.m_vertices[Box2D.Collision.b2Distance.s_simplex.m_count].indexA == save[i].indexA && Box2D.Collision.b2Distance.s_simplex.m_vertices[Box2D.Collision.b2Distance.s_simplex.m_count].indexB == save[i].indexB) {
                duplicate = true;
                break;
            }
        }
        if (duplicate) {
            break;
        }
        Box2D.Collision.b2Distance.s_simplex.m_count++;
    }
    Box2D.Collision.b2Distance.s_simplex.GetWitnessPoints(output.pointA, output.pointB);
    output.distance = Box2D.Common.Math.b2Math.SubtractVV(output.pointA, output.pointB).Length();
    output.iterations = iter;
    Box2D.Collision.b2Distance.s_simplex.WriteCache(cache);
    if (input.useRadii) {
        var rA = input.proxyA.m_radius;
        var rB = input.proxyB.m_radius;
        if (output.distance > rA + rB && output.distance > Number.MIN_VALUE) {
            output.distance -= rA + rB;
            var normal = Box2D.Common.Math.b2Math.SubtractVV(output.pointB, output.pointA);
            normal.Normalize();
            output.pointA.x += rA * normal.x;
            output.pointA.y += rA * normal.y;
            output.pointB.x -= rB * normal.x;
            output.pointB.y -= rB * normal.y;
        } else {
            var p = new Box2D.Common.Math.b2Vec2(0, 0);
            p.x = 0.5 * (output.pointA.x + output.pointB.x);
            p.y = 0.5 * (output.pointA.y + output.pointB.y);
            output.pointA.x = output.pointB.x = p.x;
            output.pointA.y = output.pointB.y = p.y;
            output.distance = 0.0;
        }
    }
};


Box2D.Collision.b2Distance.s_simplex = new Box2D.Collision.b2Simplex();
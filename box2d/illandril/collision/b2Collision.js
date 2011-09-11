/*
 * See Box2D.js
 */
goog.provide('Box2D.Collision.b2Collision');

goog.require('Box2D.Collision.ClipVertex');
goog.require('Box2D.Collision.b2Manifold');
goog.require('Box2D.Common.b2Settings');
goog.require('Box2D.Common.Math.b2Vec2');

Box2D.Collision.b2Collision = {};

/**
 * @param {!Box2D.Common.Math.b2Vec2} vOut
 * @param {!Box2D.Common.Math.b2Vec2} vIn
 * @param {!Box2D.Common.Math.b2Vec2} normal
 * @param {number} offset
 */
Box2D.Collision.b2Collision.ClipSegmentToLine = function(vOut, vIn, normal, offset) {
    var numOut = 0;
    var vIn0 = vIn[0].v;
    var vIn1 = vIn[1].v;
    var distance0 = normal.x * vIn0.x + normal.y * vIn0.y - offset;
    var distance1 = normal.x * vIn1.x + normal.y * vIn1.y - offset;
    if (distance0 <= 0.0) {
        vOut[numOut++].Set(vIn[0]);
    }
    if (distance1 <= 0.0) {
        vOut[numOut++].Set(vIn[1]);
    }
    if (distance0 * distance1 < 0.0) {
        var interp = distance0 / (distance0 - distance1);
        var tVec = vOut[numOut].v;
        tVec.x = vIn0.x + interp * (vIn1.x - vIn0.x);
        tVec.y = vIn0.y + interp * (vIn1.y - vIn0.y);
        if (distance0 > 0.0) {
            vOut[numOut].id = vIn[0].id;
        } else {
            vOut[numOut].id = vIn[1].id;
        }
        numOut++;
    }
    return numOut;
};

Box2D.Collision.b2Collision.EdgeSeparation = function(poly1, xf1, edge1, poly2, xf2) {
    if (edge1 === undefined) edge1 = 0;
    var vertices1 = poly1.m_vertices;
    var normals1 = poly1.m_normals;
    var vertices2 = poly2.m_vertices;
    var normal1WorldX = (xf1.R.col1.x * normals1[edge1].x + xf1.R.col2.x * normals1[edge1].y);
    var normal1WorldY = (xf1.R.col1.y * normals1[edge1].x + xf1.R.col2.y * normals1[edge1].y);
    var normal1X = (xf2.R.col1.x * normal1WorldX + xf2.R.col1.y * normal1WorldY);
    var normal1Y = (xf2.R.col2.x * normal1WorldX + xf2.R.col2.y * normal1WorldY);
    var index = 0;
    var minDot = Number.MAX_VALUE;
    for (var i = 0; i < poly2.m_vertexCount; ++i) {
        var dot = vertices2[i].x * normal1X + vertices2[i].y * normal1Y;
        if (dot < minDot) {
            minDot = dot;
            index = i;
        }
    }
    var v1X = xf1.position.x + (xf1.R.col1.x * vertices1[edge1].x + xf1.R.col2.x * vertices1[edge1].y);
    var v1Y = xf1.position.y + (xf1.R.col1.y * vertices1[edge1].x + xf1.R.col2.y * vertices1[edge1].y);
    var v2X = xf2.position.x + (xf2.R.col1.x * vertices2[index].x + xf2.R.col2.x * vertices2[index].y);
    var v2Y = xf2.position.y + (xf2.R.col1.y * vertices2[index].x + xf2.R.col2.y * vertices2[index].y);
    var separation = (v2X - v1X) * normal1WorldX + (v2Y - v1Y) * normal1WorldY;
    return separation;
};

Box2D.Collision.b2Collision.FindMaxSeparation = function(edgeIndex, poly1, xf1, poly2, xf2) {
    var normals1 = poly1.m_normals;
    var dX = xf2.position.x + (xf2.R.col1.x * poly2.m_centroid.x + xf2.R.col2.x * poly2.m_centroid.y);
    var dY = xf2.position.y + (xf2.R.col1.y * poly2.m_centroid.x + xf2.R.col2.y * poly2.m_centroid.y);
    dX -= xf1.position.x + (xf1.R.col1.x * poly1.m_centroid.x + xf1.R.col2.x * poly1.m_centroid.y);
    dY -= xf1.position.y + (xf1.R.col1.y * poly1.m_centroid.x + xf1.R.col2.y * poly1.m_centroid.y);
    var dLocal1X = (dX * xf1.R.col1.x + dY * xf1.R.col1.y);
    var dLocal1Y = (dX * xf1.R.col2.x + dY * xf1.R.col2.y);
    var edge = 0;
    var maxDot = (-Number.MAX_VALUE);
    for (var i = 0; i < poly1.m_vertexCount; ++i) {
        var dot = (normals1[i].x * dLocal1X + normals1[i].y * dLocal1Y);
        if (dot > maxDot) {
            maxDot = dot;
            edge = i;
        }
    }
    var s = Box2D.Collision.b2Collision.EdgeSeparation(poly1, xf1, edge, poly2, xf2);
    var prevEdge = edge - 1;
    if (prevEdge < 0) {
        prevEdge = poly1.m_vertexCount - 1;
    }
    var sPrev = Box2D.Collision.b2Collision.EdgeSeparation(poly1, xf1, prevEdge, poly2, xf2);
    var nextEdge = edge + 1;
    if (nextEdge >= poly1.m_vertexCount) {
        nextEdge = 0;
    }
    var sNext = Box2D.Collision.b2Collision.EdgeSeparation(poly1, xf1, nextEdge, poly2, xf2);
    var bestEdge = 0;
    var bestSeparation = 0;
    var increment = 0;
    if (sPrev > s && sPrev > sNext) {
        increment = -1;
        bestEdge = prevEdge;
        bestSeparation = sPrev;
    } else if (sNext > s) {
        increment = 1;
        bestEdge = nextEdge;
        bestSeparation = sNext;
    } else {
        edgeIndex[0] = edge;
        return s;
    }
    while (true) {
        if (increment == -1) {
            edge = bestEdge - 1;
            if (edge < 0) {
                edge = poly1.m_vertexCount - 1;
            }
        } else {
            edge = bestEdge + 1;
            if (edge >= poly1.m_vertexCount) {
                edge = 0;
            }
        }
        s = Box2D.Collision.b2Collision.EdgeSeparation(poly1, xf1, edge, poly2, xf2);
        if (s > bestSeparation) {
            bestEdge = edge;
            bestSeparation = s;
        } else {
            break;
        }
    }
    edgeIndex[0] = bestEdge;
    return bestSeparation;
};

Box2D.Collision.b2Collision.FindIncidentEdge = function(c, poly1, xf1, edge1, poly2, xf2) {
    if (edge1 === undefined) edge1 = 0;
    var normal1X = (xf1.R.col1.x * poly1.m_normals[edge1].x + xf1.R.col2.x * poly1.m_normals[edge1].y);
    var normal1Y = (xf1.R.col1.y * poly1.m_normals[edge1].x + xf1.R.col2.y * poly1.m_normals[edge1].y);
    var tX = (xf2.R.col1.x * normal1X + xf2.R.col1.y * normal1Y);
    normal1Y = (xf2.R.col2.x * normal1X + xf2.R.col2.y * normal1Y);
    normal1X = tX;
    var i1 = 0;
    var minDot = Number.MAX_VALUE;
    for (var i = 0; i < poly2.m_vertexCount; i++) {
        var dot = (normal1X * poly2.m_normals[i].x + normal1Y * poly2.m_normals[i].y);
        if (dot < minDot) {
            minDot = dot;
            i1 = i;
        }
    }
    var i2 = i1 + 1;
    if (i2 >= poly2.m_vertexCount) {
        i2 = 0;
    }
    c[0].v.x = xf2.position.x + (xf2.R.col1.x * poly2.m_vertices[i1].x + xf2.R.col2.x * poly2.m_vertices[i1].y);
    c[0].v.y = xf2.position.y + (xf2.R.col1.y * poly2.m_vertices[i1].x + xf2.R.col2.y * poly2.m_vertices[i1].y);
    c[0].id.features.referenceEdge = edge1;
    c[0].id.features.incidentEdge = i1;
    c[0].id.features.incidentVertex = 0;
    c[1].v.x = xf2.position.x + (xf2.R.col1.x * poly2.m_vertices[i2].x + xf2.R.col2.x * poly2.m_vertices[i2].y);
    c[1].v.y = xf2.position.y + (xf2.R.col1.y * poly2.m_vertices[i2].x + xf2.R.col2.y * poly2.m_vertices[i2].y);
    c[1].id.features.referenceEdge = edge1;
    c[1].id.features.incidentEdge = i2;
    c[1].id.features.incidentVertex = 1;
};

Box2D.Collision.b2Collision.MakeClipPointVector = function() {
    return [new Box2D.Collision.ClipVertex(), new Box2D.Collision.ClipVertex()];
};

Box2D.Collision.b2Collision.CollidePolygons = function(manifold, polyA, xfA, polyB, xfB) {
    manifold.m_pointCount = 0;
    var totalRadius = polyA.m_radius + polyB.m_radius;
    
    Box2D.Collision.b2Collision.s_edgeAO[0] = 0;
    var separationA = Box2D.Collision.b2Collision.FindMaxSeparation(Box2D.Collision.b2Collision.s_edgeAO, polyA, xfA, polyB, xfB);
    if (separationA > totalRadius) {
        return;
    }
    
    Box2D.Collision.b2Collision.s_edgeBO[0] = 0;
    var separationB = Box2D.Collision.b2Collision.FindMaxSeparation(Box2D.Collision.b2Collision.s_edgeBO, polyB, xfB, polyA, xfA);
    if (separationB > totalRadius) {
        return;
    }
    
    var poly1 = polyA;
    var poly2 = polyB;
    var xf1 = xfA;
    var xf2 = xfB;
    var edge1 = Box2D.Collision.b2Collision.s_edgeAO[0];
    var flip = 0;
    manifold.m_type = Box2D.Collision.b2Manifold.e_faceA;
    if (separationB > 0.98 /* k_relativeTol */ * separationA + 0.001 /* k_absoluteTol */ ) {
        poly1 = polyB;
        poly2 = polyA;
        xf1 = xfB;
        xf2 = xfA;
        edge1 = Box2D.Collision.b2Collision.s_edgeBO[0];
        manifold.m_type = Box2D.Collision.b2Manifold.e_faceB;
        flip = 1;
    }
    var incidentEdge = Box2D.Collision.b2Collision.s_incidentEdge;
    Box2D.Collision.b2Collision.FindIncidentEdge(incidentEdge, poly1, xf1, edge1, poly2, xf2);
    var local_v11 = poly1.m_vertices[edge1];
    var local_v12;
    if (edge1 + 1 < poly1.m_vertexCount) {
        local_v12 = poly1.m_vertices[edge1 + 1];
    } else {
        local_v12 = poly1.m_vertices[0];
    }
    Box2D.Collision.b2Collision.s_localTangent.Set(local_v12.x - local_v11.x, local_v12.y - local_v11.y);
    Box2D.Collision.b2Collision.s_localTangent.Normalize();
    Box2D.Collision.b2Collision.s_localNormal.x = Box2D.Collision.b2Collision.s_localTangent.y;
    Box2D.Collision.b2Collision.s_localNormal.y = (-Box2D.Collision.b2Collision.s_localTangent.x);
    Box2D.Collision.b2Collision.s_planePoint.Set(0.5 * (local_v11.x + local_v12.x), 0.5 * (local_v11.y + local_v12.y));
    Box2D.Collision.b2Collision.s_tangent.x = (xf1.R.col1.x * Box2D.Collision.b2Collision.s_localTangent.x + xf1.R.col2.x * Box2D.Collision.b2Collision.s_localTangent.y);
    Box2D.Collision.b2Collision.s_tangent.y = (xf1.R.col1.y * Box2D.Collision.b2Collision.s_localTangent.x + xf1.R.col2.y * Box2D.Collision.b2Collision.s_localTangent.y);
    Box2D.Collision.b2Collision.s_tangent2.x = (-Box2D.Collision.b2Collision.s_tangent.x);
    Box2D.Collision.b2Collision.s_tangent2.y = (-Box2D.Collision.b2Collision.s_tangent.y);
    Box2D.Collision.b2Collision.s_normal.x = Box2D.Collision.b2Collision.s_tangent.y;
    Box2D.Collision.b2Collision.s_normal.y = (-Box2D.Collision.b2Collision.s_tangent.x);
    Box2D.Collision.b2Collision.s_v11.x = xf1.position.x + (xf1.R.col1.x * local_v11.x + xf1.R.col2.x * local_v11.y);
    Box2D.Collision.b2Collision.s_v11.y = xf1.position.y + (xf1.R.col1.y * local_v11.x + xf1.R.col2.y * local_v11.y);
    Box2D.Collision.b2Collision.s_v12.x = xf1.position.x + (xf1.R.col1.x * local_v12.x + xf1.R.col2.x * local_v12.y);
    Box2D.Collision.b2Collision.s_v12.y = xf1.position.y + (xf1.R.col1.y * local_v12.x + xf1.R.col2.y * local_v12.y);
    var sideOffset1 = (-Box2D.Collision.b2Collision.s_tangent.x * Box2D.Collision.b2Collision.s_v11.x) - Box2D.Collision.b2Collision.s_tangent.y * Box2D.Collision.b2Collision.s_v11.y + totalRadius;
    if (Box2D.Collision.b2Collision.ClipSegmentToLine(Box2D.Collision.b2Collision.s_clipPoints1, incidentEdge, Box2D.Collision.b2Collision.s_tangent2, sideOffset1) < 2) {
        return;
    }
    var sideOffset2 = Box2D.Collision.b2Collision.s_tangent.x * Box2D.Collision.b2Collision.s_v12.x + Box2D.Collision.b2Collision.s_tangent.y * Box2D.Collision.b2Collision.s_v12.y + totalRadius;
    if (Box2D.Collision.b2Collision.ClipSegmentToLine(Box2D.Collision.b2Collision.s_clipPoints2, Box2D.Collision.b2Collision.s_clipPoints1, Box2D.Collision.b2Collision.s_tangent, sideOffset2) < 2) {
        return;
    }
    manifold.m_localPlaneNormal.SetV(Box2D.Collision.b2Collision.s_localNormal);
    manifold.m_localPoint.SetV(Box2D.Collision.b2Collision.s_planePoint);
    var frontOffset = Box2D.Collision.b2Collision.s_normal.x * Box2D.Collision.b2Collision.s_v11.x + Box2D.Collision.b2Collision.s_normal.y * Box2D.Collision.b2Collision.s_v11.y;
    var pointCount = 0;
    for (var i = 0; i < Box2D.Common.b2Settings.b2_maxManifoldPoints; ++i) {
        var separation = Box2D.Collision.b2Collision.s_normal.x * Box2D.Collision.b2Collision.s_clipPoints2[i].v.x + Box2D.Collision.b2Collision.s_normal.y * Box2D.Collision.b2Collision.s_clipPoints2[i].v.y - frontOffset;
        if (separation <= totalRadius) {
            var tX = Box2D.Collision.b2Collision.s_clipPoints2[i].v.x - xf2.position.x;
            var tY = Box2D.Collision.b2Collision.s_clipPoints2[i].v.y - xf2.position.y;
            manifold.m_points[pointCount].m_localPoint.x = (tX * xf2.R.col1.x + tY * xf2.R.col1.y);
            manifold.m_points[pointCount].m_localPoint.y = (tX * xf2.R.col2.x + tY * xf2.R.col2.y);
            manifold.m_points[pointCount].m_id.Set(Box2D.Collision.b2Collision.s_clipPoints2[i].id);
            manifold.m_points[pointCount].m_id.features.flip = flip;
            pointCount++;
        }
    }
    manifold.m_pointCount = pointCount;
};

Box2D.Collision.b2Collision.CollideCircles = function(manifold, circle1, xf1, circle2, xf2) {
    manifold.m_pointCount = 0;
    var p1X = xf1.position.x + (xf1.R.col1.x * circle1.m_p.x + xf1.R.col2.x * circle1.m_p.y);
    var p1Y = xf1.position.y + (xf1.R.col1.y * circle1.m_p.x + xf1.R.col2.y * circle1.m_p.y);
    var p2X = xf2.position.x + (xf2.R.col1.x * circle2.m_p.x + xf2.R.col2.x * circle2.m_p.y);
    var p2Y = xf2.position.y + (xf2.R.col1.y * circle2.m_p.x + xf2.R.col2.y * circle2.m_p.y);
    var dX = p2X - p1X;
    var dY = p2Y - p1Y;
    var distSqr = dX * dX + dY * dY;
    var radius = circle1.m_radius + circle2.m_radius;
    if (distSqr > radius * radius) {
        return;
    }
    manifold.m_type = Box2D.Collision.b2Manifold.e_circles;
    manifold.m_localPoint.SetV(circle1.m_p);
    manifold.m_localPlaneNormal.SetZero();
    manifold.m_pointCount = 1;
    manifold.m_points[0].m_localPoint.SetV(circle2.m_p);
    manifold.m_points[0].m_id.key = 0;
};

Box2D.Collision.b2Collision.CollidePolygonAndCircle = function(manifold, polygon, xf1, circle, xf2) {
    manifold.m_pointCount = 0;
    var dX = xf2.position.x + (xf2.R.col1.x * circle.m_p.x + xf2.R.col2.x * circle.m_p.y) - xf1.position.x;
    var dY = xf2.position.y + (xf2.R.col1.y * circle.m_p.x + xf2.R.col2.y * circle.m_p.y) - xf1.position.y;
    var cLocalX = (dX * xf1.R.col1.x + dY * xf1.R.col1.y);
    var cLocalY = (dX * xf1.R.col2.x + dY * xf1.R.col2.y);
    var normalIndex = 0;
    var separation = (-Number.MAX_VALUE);
    var radius = polygon.m_radius + circle.m_radius;
    for (var i = 0; i < polygon.m_vertexCount; ++i) {
        var s = polygon.m_normals[i].x * (cLocalX - polygon.m_vertices[i].x) + polygon.m_normals[i].y * (cLocalY - polygon.m_vertices[i].y);
        if (s > radius) {
            return;
        }
        if (s > separation) {
            separation = s;
            normalIndex = i;
        }
    }
    var vertIndex2 = normalIndex + 1;
    if (vertIndex2 >= polygon.m_vertexCount) {
        vertIndex2 = 0;
    }
    var v1 = polygon.m_vertices[normalIndex];
    var v2 = polygon.m_vertices[vertIndex2];
    if (separation < Number.MIN_VALUE) {
        manifold.m_pointCount = 1;
        manifold.m_type = Box2D.Collision.b2Manifold.e_faceA;
        manifold.m_localPlaneNormal.SetV(polygon.m_normals[normalIndex]);
        manifold.m_localPoint.x = 0.5 * (v1.x + v2.x);
        manifold.m_localPoint.y = 0.5 * (v1.y + v2.y);
        manifold.m_points[0].m_localPoint.SetV(circle.m_p);
        manifold.m_points[0].m_id.key = 0;
    } else {
        var u1 = (cLocalX - v1.x) * (v2.x - v1.x) + (cLocalY - v1.y) * (v2.y - v1.y);
        if (u1 <= 0.0) {
            if ((cLocalX - v1.x) * (cLocalX - v1.x) + (cLocalY - v1.y) * (cLocalY - v1.y) > radius * radius) return;
            manifold.m_pointCount = 1;
            manifold.m_type = Box2D.Collision.b2Manifold.e_faceA;
            manifold.m_localPlaneNormal.x = cLocalX - v1.x;
            manifold.m_localPlaneNormal.y = cLocalY - v1.y;
            manifold.m_localPlaneNormal.Normalize();
            manifold.m_localPoint.SetV(v1);
            manifold.m_points[0].m_localPoint.SetV(circle.m_p);
            manifold.m_points[0].m_id.key = 0;
        } else {
            var u2 = (cLocalX - v2.x) * (v1.x - v2.x) + (cLocalY - v2.y) * (v1.y - v2.y);
            if (u2 <= 0) {
                if ((cLocalX - v2.x) * (cLocalX - v2.x) + (cLocalY - v2.y) * (cLocalY - v2.y) > radius * radius) return;
                manifold.m_pointCount = 1;
                manifold.m_type = Box2D.Collision.b2Manifold.e_faceA;
                manifold.m_localPlaneNormal.x = cLocalX - v2.x;
                manifold.m_localPlaneNormal.y = cLocalY - v2.y;
                manifold.m_localPlaneNormal.Normalize();
                manifold.m_localPoint.SetV(v2);
                manifold.m_points[0].m_localPoint.SetV(circle.m_p);
                manifold.m_points[0].m_id.key = 0;
            } else {
                var faceCenterX = 0.5 * (v1.x + v2.x);
                var faceCenterY = 0.5 * (v1.y + v2.y);
                separation = (cLocalX - faceCenterX) * polygon.m_normals[normalIndex].x + (cLocalY - faceCenterY) * polygon.m_normals[normalIndex].y;
                if (separation > radius) return;
                manifold.m_pointCount = 1;
                manifold.m_type = Box2D.Collision.b2Manifold.e_faceA;
                manifold.m_localPlaneNormal.x = polygon.m_normals[normalIndex].x;
                manifold.m_localPlaneNormal.y = polygon.m_normals[normalIndex].y;
                manifold.m_localPlaneNormal.Normalize();
                manifold.m_localPoint.Set(faceCenterX, faceCenterY);
                manifold.m_points[0].m_localPoint.SetV(circle.m_p);
                manifold.m_points[0].m_id.key = 0;
            }
        }
    }
};

Box2D.Collision.b2Collision.TestOverlap = function(a, b) {
    if (b.lowerBound.x - a.upperBound.x > 0) {
        return false;
    }
    if (b.lowerBound.y - a.upperBound.y > 0) {
        return false;
    }
    if (a.lowerBound.x - b.upperBound.x > 0) {
        return false;
    }
    if (a.lowerBound.y - b.upperBound.y > 0) {
        return false;
    }
    return true;
};

Box2D.Collision.b2Collision.s_incidentEdge = Box2D.Collision.b2Collision.MakeClipPointVector();
Box2D.Collision.b2Collision.s_clipPoints1 = Box2D.Collision.b2Collision.MakeClipPointVector();
Box2D.Collision.b2Collision.s_clipPoints2 = Box2D.Collision.b2Collision.MakeClipPointVector();
Box2D.Collision.b2Collision.s_edgeAO = [0];
Box2D.Collision.b2Collision.s_edgeBO = [0];
Box2D.Collision.b2Collision.s_localTangent = new Box2D.Common.Math.b2Vec2(0, 0);
Box2D.Collision.b2Collision.s_localNormal = new Box2D.Common.Math.b2Vec2(0, 0);
Box2D.Collision.b2Collision.s_planePoint = new Box2D.Common.Math.b2Vec2(0, 0);
Box2D.Collision.b2Collision.s_normal = new Box2D.Common.Math.b2Vec2(0, 0);
Box2D.Collision.b2Collision.s_tangent = new Box2D.Common.Math.b2Vec2(0, 0);
Box2D.Collision.b2Collision.s_tangent2 = new Box2D.Common.Math.b2Vec2(0, 0);
Box2D.Collision.b2Collision.s_v11 = new Box2D.Common.Math.b2Vec2(0, 0);
Box2D.Collision.b2Collision.s_v12 = new Box2D.Common.Math.b2Vec2(0, 0);

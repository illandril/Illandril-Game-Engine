/*
 * See Box2D.js
 */
goog.provide('Box2D.Collision');
goog.require('Box2D.base');

Box2D.Collision.IBroadPhase = 'Box2D.Collision.IBroadPhase';

Box2D.Collision.b2AABB = function() {
    this.lowerBound = new Box2D.Common.Math.b2Vec2();
    this.upperBound = new Box2D.Common.Math.b2Vec2();
};
(function(b2AABB) {
    b2AABB.prototype.IsValid = function() {
        var dX = this.upperBound.x - this.lowerBound.x;
        if (dX < 0) {
            return false;
        }
        var dY = this.upperBound.y - this.lowerBound.y;
        if (dY < 0) {
            return false;
        }
        return this.lowerBound.IsValid() && this.upperBound.IsValid();
    };
    
    b2AABB.prototype.GetCenter = function() {
        return new Box2D.Common.Math.b2Vec2((this.lowerBound.x + this.upperBound.x) / 2, (this.lowerBound.y + this.upperBound.y) / 2);
    };
    
    b2AABB.prototype.GetExtents = function() {
        return new Box2D.Common.Math.b2Vec2((this.upperBound.x - this.lowerBound.x) / 2, (this.upperBound.y - this.lowerBound.y) / 2);
    };
    
    b2AABB.prototype.Contains = function(aabb) {
        var result = true;
        result = result && this.lowerBound.x <= aabb.lowerBound.x;
        result = result && this.lowerBound.y <= aabb.lowerBound.y;
        result = result && aabb.upperBound.x <= this.upperBound.x;
        result = result && aabb.upperBound.y <= this.upperBound.y;
        return result;
    };
    
    b2AABB.prototype.RayCast = function(output, input) {
        var tmin = (-Number.MAX_VALUE);
        var tmax = Number.MAX_VALUE;
        
        var dX = input.p2.x - input.p1.x;
        var absDX = Math.abs(dX);
        if (absDX < Number.MIN_VALUE) {
            if (input.p1.x < this.lowerBound.x || this.upperBound.x < input.p1.x) {
                return false;
            }
        } else {
            var inv_d = 1.0 / dX;
            var t1 = (this.lowerBound.x - input.p1.x) * inv_d;
            var t2 = (this.upperBound.x - input.p1.x) * inv_d;
            var s = (-1.0);
            if (t1 > t2) {
                var t3 = t1;
                t1 = t2;
                t2 = t3;
                s = 1.0;
            }
            if (t1 > tmin) {
                output.normal.x = s;
                output.normal.y = 0;
                tmin = t1;
            }
            tmax = Math.min(tmax, t2);
            if (tmin > tmax) return false;
        }
        
        var dY = input.p2.y - input.p1.y;
        var absDY = Math.abs(dY);
        if (absDY < Number.MIN_VALUE) {
            if (input.p1.y < this.lowerBound.y || this.upperBound.y < input.p1.y) {
                return false;
            }
        } else {
            var inv_d = 1.0 / dY;
            var t1 = (this.lowerBound.y - input.p1.y) * inv_d;
            var t2 = (this.upperBound.y - input.p1.y) * inv_d;
            var s = (-1.0);
            if (t1 > t2) {
                var t3 = t1;
                t1 = t2;
                t2 = t3;
                s = 1.0;
            }
            if (t1 > tmin) {
                output.normal.y = s;
                output.normal.x = 0;
                tmin = t1;
            }
            tmax = Math.min(tmax, t2);
            if (tmin > tmax) {
                return false;
            }
        }
        output.fraction = tmin;
        return true;
    };
    
    b2AABB.prototype.TestOverlap = function(other) {
        if ( other.lowerBound.x - this.upperBound.x > 0 ) { return false; }
        if ( other.lowerBound.y - this.upperBound.y > 0 ) { return false; }
        if ( this.lowerBound.x - other.upperBound.x > 0 ) { return false; }
        if ( this.lowerBound.y - other.upperBound.y > 0 ) { return false; }
        return true;
    };
    
    b2AABB.Combine = function(aabb1, aabb2) {
        var aabb = new b2AABB();
        aabb.Combine(aabb1, aabb2);
        return aabb;
    };
    
    b2AABB.prototype.Combine = function(aabb1, aabb2) {
        this.lowerBound.x = Math.min(aabb1.lowerBound.x, aabb2.lowerBound.x);
        this.lowerBound.y = Math.min(aabb1.lowerBound.y, aabb2.lowerBound.y);
        this.upperBound.x = Math.max(aabb1.upperBound.x, aabb2.upperBound.x);
        this.upperBound.y = Math.max(aabb1.upperBound.y, aabb2.upperBound.y);
    };
    
})(Box2D.Collision.b2AABB);


Box2D.Collision.b2Collision = function() {};
(function(b2Collision) {
    b2Collision.ClipSegmentToLine = function(vOut, vIn, normal, offset) {
        if (offset === undefined) offset = 0;
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
    
    b2Collision.EdgeSeparation = function(poly1, xf1, edge1, poly2, xf2) {
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
    
    b2Collision.FindMaxSeparation = function(edgeIndex, poly1, xf1, poly2, xf2) {
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
        var s = b2Collision.EdgeSeparation(poly1, xf1, edge, poly2, xf2);
        var prevEdge = edge - 1;
        if ( prevEdge < 0 ) {
            prevEdge = poly1.m_vertexCount - 1;
        }
        var sPrev = b2Collision.EdgeSeparation(poly1, xf1, prevEdge, poly2, xf2);
        var nextEdge = edge + 1;
        if ( nextEdge >= poly1.m_vertexCount ) {
            nextEdge = 0;
        }
        var sNext = b2Collision.EdgeSeparation(poly1, xf1, nextEdge, poly2, xf2);
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
                if ( edge < 0 ) {
                    edge = poly1.m_vertexCount - 1;
                }
            } else {
                edge = bestEdge + 1;
                if ( edge >= poly1.m_vertexCount ) {
                    edge = 0;
                }
            }
            s = b2Collision.EdgeSeparation(poly1, xf1, edge, poly2, xf2);
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
    
    b2Collision.FindIncidentEdge = function(c, poly1, xf1, edge1, poly2, xf2) {
        if (edge1 === undefined) edge1 = 0;
        var normal1X = (xf1.R.col1.x * poly1.m_normals[edge1].x + xf1.R.col2.x * poly1.m_normals[edge1].y);
        var normal1Y = (xf1.R.col1.y * poly1.m_normals[edge1].x + xf1.R.col2.y * poly1.m_normals[edge1].y);
        var tX = (xf2.R.col1.x * normal1X + xf2.R.col1.y * normal1Y);
        normal1Y = (xf2.R.col2.x * normal1X + xf2.R.col2.y * normal1Y);
        normal1X = tX;
        var i1 = 0;
        var minDot = Number.MAX_VALUE;
        for ( var i = 0; i < poly2.m_vertexCount; i++ ) {
            var dot = (normal1X * poly2.m_normals[i].x + normal1Y * poly2.m_normals[i].y);
            if (dot < minDot) {
                minDot = dot;
                i1 = i;
            }
        }
        var i2 = i1 + 1;
        if ( i2 >= poly2.m_vertexCount ) {
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
    
    b2Collision.MakeClipPointVector = function() {
        return [ new Box2D.Collision.ClipVertex(), new Box2D.Collision.ClipVertex() ];
    };
    
    b2Collision.CollidePolygons = function(manifold, polyA, xfA, polyB, xfB) {
        manifold.m_pointCount = 0;
        var totalRadius = polyA.m_radius + polyB.m_radius;
        
        b2Collision.s_edgeAO[0] = 0;
        var separationA = b2Collision.FindMaxSeparation(b2Collision.s_edgeAO, polyA, xfA, polyB, xfB);
        if (separationA > totalRadius) {
            return;
        }
        
        b2Collision.s_edgeBO[0] = 0;
        var separationB = b2Collision.FindMaxSeparation(b2Collision.s_edgeBO, polyB, xfB, polyA, xfA);
        if (separationB > totalRadius) {
            return;
        }
        
        var poly1 = polyA;
        var poly2 = polyB;
        var xf1 = xfA;
        var xf2 = xfB;
        var edge1 = b2Collision.s_edgeAO[0];
        var flip = 0;
        manifold.m_type = Box2D.Collision.b2Manifold.e_faceA;
        if (separationB > 0.98/* k_relativeTol */ * separationA + 0.001/* k_absoluteTol */ ) {
            poly1 = polyB;
            poly2 = polyA;
            xf1 = xfB;
            xf2 = xfA;
            edge1 = b2Collision.s_edgeBO[0];
            manifold.m_type = Box2D.Collision.b2Manifold.e_faceB;
            flip = 1;
        }
        var incidentEdge = b2Collision.s_incidentEdge;
        b2Collision.FindIncidentEdge(incidentEdge, poly1, xf1, edge1, poly2, xf2);
        var local_v11 = poly1.m_vertices[edge1];
        var local_v12;
        if (edge1 + 1 < poly1.m_vertexCount) {
            local_v12 = poly1.m_vertices[edge1 + 1];
        } else {
            local_v12 = poly1.m_vertices[0];
        }
        b2Collision.s_localTangent.Set(local_v12.x - local_v11.x, local_v12.y - local_v11.y);
        b2Collision.s_localTangent.Normalize();
        b2Collision.s_localNormal.x = b2Collision.s_localTangent.y;
        b2Collision.s_localNormal.y = (-b2Collision.s_localTangent.x);
        b2Collision.s_planePoint.Set(0.5 * (local_v11.x + local_v12.x), 0.5 * (local_v11.y + local_v12.y));
        b2Collision.s_tangent.x = (xf1.R.col1.x * b2Collision.s_localTangent.x + xf1.R.col2.x * b2Collision.s_localTangent.y);
        b2Collision.s_tangent.y = (xf1.R.col1.y * b2Collision.s_localTangent.x + xf1.R.col2.y * b2Collision.s_localTangent.y);
        b2Collision.s_tangent2.x = (-b2Collision.s_tangent.x);
        b2Collision.s_tangent2.y = (-b2Collision.s_tangent.y);
        b2Collision.s_normal.x = b2Collision.s_tangent.y;
        b2Collision.s_normal.y = (-b2Collision.s_tangent.x);
        b2Collision.s_v11.x = xf1.position.x + (xf1.R.col1.x * local_v11.x + xf1.R.col2.x * local_v11.y);
        b2Collision.s_v11.y = xf1.position.y + (xf1.R.col1.y * local_v11.x + xf1.R.col2.y * local_v11.y);
        b2Collision.s_v12.x = xf1.position.x + (xf1.R.col1.x * local_v12.x + xf1.R.col2.x * local_v12.y);
        b2Collision.s_v12.y = xf1.position.y + (xf1.R.col1.y * local_v12.x + xf1.R.col2.y * local_v12.y);
        var sideOffset1 = (-b2Collision.s_tangent.x * b2Collision.s_v11.x) - b2Collision.s_tangent.y * b2Collision.s_v11.y + totalRadius;
        if (b2Collision.ClipSegmentToLine(b2Collision.s_clipPoints1, incidentEdge, b2Collision.s_tangent2, sideOffset1) < 2) {
            return;
        }
        var sideOffset2 = b2Collision.s_tangent.x * b2Collision.s_v12.x + b2Collision.s_tangent.y * b2Collision.s_v12.y + totalRadius;
        if (b2Collision.ClipSegmentToLine(b2Collision.s_clipPoints2, b2Collision.s_clipPoints1, b2Collision.s_tangent, sideOffset2) < 2) {
            return;
        }
        manifold.m_localPlaneNormal.SetV(b2Collision.s_localNormal);
        manifold.m_localPoint.SetV(b2Collision.s_planePoint);
        var frontOffset = b2Collision.s_normal.x * b2Collision.s_v11.x + b2Collision.s_normal.y * b2Collision.s_v11.y;
        var pointCount = 0;
        for (var i = 0; i < Box2D.Common.b2Settings.b2_maxManifoldPoints; ++i) {
            var separation = b2Collision.s_normal.x * b2Collision.s_clipPoints2[i].v.x + b2Collision.s_normal.y * b2Collision.s_clipPoints2[i].v.y - frontOffset;
            if (separation <= totalRadius) {
                var tX = b2Collision.s_clipPoints2[i].v.x - xf2.position.x;
                var tY = b2Collision.s_clipPoints2[i].v.y - xf2.position.y;
                manifold.m_points[pointCount].m_localPoint.x = (tX * xf2.R.col1.x + tY * xf2.R.col1.y);
                manifold.m_points[pointCount].m_localPoint.y = (tX * xf2.R.col2.x + tY * xf2.R.col2.y);
                manifold.m_points[pointCount].m_id.Set(b2Collision.s_clipPoints2[i].id);
                manifold.m_points[pointCount].m_id.features.flip = flip;
                pointCount++;
            }
        }
        manifold.m_pointCount = pointCount;
    };
    
    b2Collision.CollideCircles = function(manifold, circle1, xf1, circle2, xf2) {
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
    
    b2Collision.CollidePolygonAndCircle = function(manifold, polygon, xf1, circle, xf2) {
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
        if ( vertIndex2 >= polygon.m_vertexCount ) {
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
    
    b2Collision.TestOverlap = function(a, b) {
        if ( b.lowerBound.x - a.upperBound.x > 0 ) { return false; }
        if ( b.lowerBound.y - a.upperBound.y > 0 ) { return false; }
        if ( a.lowerBound.x - b.upperBound.x > 0 ) { return false; }
        if ( a.lowerBound.y - b.upperBound.y > 0 ) { return false; }
        return true;
    };
    
    Box2D.postDefs.push(function() {
        Box2D.Collision.b2Collision.s_incidentEdge = b2Collision.MakeClipPointVector();
        Box2D.Collision.b2Collision.s_clipPoints1 = b2Collision.MakeClipPointVector();
        Box2D.Collision.b2Collision.s_clipPoints2 = b2Collision.MakeClipPointVector();
        Box2D.Collision.b2Collision.s_edgeAO = [0];
        Box2D.Collision.b2Collision.s_edgeBO = [0];
        Box2D.Collision.b2Collision.s_localTangent = new Box2D.Common.Math.b2Vec2();
        Box2D.Collision.b2Collision.s_localNormal = new Box2D.Common.Math.b2Vec2();
        Box2D.Collision.b2Collision.s_planePoint = new Box2D.Common.Math.b2Vec2();
        Box2D.Collision.b2Collision.s_normal = new Box2D.Common.Math.b2Vec2();
        Box2D.Collision.b2Collision.s_tangent = new Box2D.Common.Math.b2Vec2();
        Box2D.Collision.b2Collision.s_tangent2 = new Box2D.Common.Math.b2Vec2();
        Box2D.Collision.b2Collision.s_v11 = new Box2D.Common.Math.b2Vec2();
        Box2D.Collision.b2Collision.s_v12 = new Box2D.Common.Math.b2Vec2();
    });
})(Box2D.Collision.b2Collision);

Box2D.Collision.b2ContactID = function() {
    this.features = new Box2D.Collision.Features();
    if (this.constructor === Box2D.Collision.b2ContactID) {
        this.b2ContactID.apply(this, arguments);
    }
};
(function(b2ContactID) {
   b2ContactID.prototype.b2ContactID = function () {
      this.features._m_id = this;
   };
   
   b2ContactID.prototype.Set = function (id) {
      this.key = id._key;
   };
   
   b2ContactID.prototype.Copy = function () {
      var id = new b2ContactID();
      id.key = this.key;
      return id;
   };
   
   Object.defineProperty(b2ContactID.prototype, 'key', {
      enumerable: false,
      configurable: true,
      get: function () {
         return this._key;
      },
      set: function (value) {
         if (value === undefined) value = 0;
         this._key = value;
         this.features._referenceEdge = this._key & 0x000000ff;
         this.features._incidentEdge = ((this._key & 0x0000ff00) >> 8) & 0x000000ff;
         this.features._incidentVertex = ((this._key & 0x00ff0000) >> 16) & 0x000000ff;
         this.features._flip = ((this._key & 0xff000000) >> 24) & 0x000000ff;
      }
   });
})(Box2D.Collision.b2ContactID);

Box2D.Collision.b2ContactPoint = function() {
    this.position = new Box2D.Common.Math.b2Vec2();
    this.velocity = new Box2D.Common.Math.b2Vec2();
    this.normal = new Box2D.Common.Math.b2Vec2();
    this.id = new Box2D.Collision.b2ContactID();
};


Box2D.Collision.b2Distance = function() {};
(function(b2Distance) {
    b2Distance.Distance = function(output, cache, input) {
        b2Distance.s_simplex.ReadCache(cache, input.proxyA, input.transformA, input.proxyB, input.transformB);
        if ( b2Distance.s_simplex.m_count < 1 || b2Distance.s_simplex.m_count > 3 ) {
            Box2D.Common.b2Settings.b2Assert(false);
        }
        var iter = 0;
        while ( iter < 20 ) {
            var save = [];
            for (var i = 0; i < b2Distance.s_simplex.m_count; i++) {
                save[i] = {};
                save[i].indexA = b2Distance.s_simplex.m_vertices[i].indexA;
                save[i].indexB = b2Distance.s_simplex.m_vertices[i].indexB;
            }
            if (b2Distance.s_simplex.m_count == 2) {
                b2Distance.s_simplex.Solve2();
            } else if ( b2Distance.s_simplex.m_count == 3 ) {
                b2Distance.s_simplex.Solve3();
            }
            if ( b2Distance.s_simplex.m_count == 3 ) {
                // m_count can be changed by s_simplex.Solve3/Solve2
                break;
            }
            var d = b2Distance.s_simplex.GetSearchDirection();
            if (d.LengthSquared() < Box2D.MIN_VALUE_SQUARED) {
                break;
            }
            b2Distance.s_simplex.m_vertices[b2Distance.s_simplex.m_count].indexA = input.proxyA.GetSupport(Box2D.Common.Math.b2Math.MulTMV(input.transformA.R, d.GetNegative()));
            b2Distance.s_simplex.m_vertices[b2Distance.s_simplex.m_count].wA = Box2D.Common.Math.b2Math.MulX(input.transformA, input.proxyA.GetVertex(b2Distance.s_simplex.m_vertices[b2Distance.s_simplex.m_count].indexA));
            b2Distance.s_simplex.m_vertices[b2Distance.s_simplex.m_count].indexB = input.proxyB.GetSupport(Box2D.Common.Math.b2Math.MulTMV(input.transformB.R, d));
            b2Distance.s_simplex.m_vertices[b2Distance.s_simplex.m_count].wB = Box2D.Common.Math.b2Math.MulX(input.transformB, input.proxyB.GetVertex(b2Distance.s_simplex.m_vertices[b2Distance.s_simplex.m_count].indexB));
            b2Distance.s_simplex.m_vertices[b2Distance.s_simplex.m_count].w = Box2D.Common.Math.b2Math.SubtractVV(b2Distance.s_simplex.m_vertices[b2Distance.s_simplex.m_count].wB, b2Distance.s_simplex.m_vertices[b2Distance.s_simplex.m_count].wA);
            
            iter++;
            var duplicate = false;
            for (var i = 0; i < save.length; i++) {
                if (b2Distance.s_simplex.m_vertices[b2Distance.s_simplex.m_count].indexA == save[i].indexA && b2Distance.s_simplex.m_vertices[b2Distance.s_simplex.m_count].indexB == save[i].indexB) {
                    duplicate = true;
                    break;
                }
            }
            if (duplicate) {
                break;
            }
            b2Distance.s_simplex.m_count++;
        }
        b2Distance.s_simplex.GetWitnessPoints(output.pointA, output.pointB);
        output.distance = Box2D.Common.Math.b2Math.SubtractVV(output.pointA, output.pointB).Length();
        output.iterations = iter;
        b2Distance.s_simplex.WriteCache(cache);
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
                var p = new Box2D.Common.Math.b2Vec2();
                p.x = 0.5 * (output.pointA.x + output.pointB.x);
                p.y = 0.5 * (output.pointA.y + output.pointB.y);
                output.pointA.x = output.pointB.x = p.x;
                output.pointA.y = output.pointB.y = p.y;
                output.distance = 0.0;
            }
        }
    };
    
    Box2D.postDefs.push(function() {
        Box2D.Collision.b2Distance.s_simplex = new Box2D.Collision.b2Simplex();
    });
})(Box2D.Collision.b2Distance);


Box2D.Collision.b2DistanceInput = function () {};

Box2D.Collision.b2DistanceOutput = function () {
    this.pointA = new Box2D.Common.Math.b2Vec2();
    this.pointB = new Box2D.Common.Math.b2Vec2();
};

Box2D.Collision.b2DistanceProxy = function() {};
(function(b2DistanceProxy) {
    b2DistanceProxy.prototype.Set = function (shape) {
        var type = shape.GetType();
        if (type == Box2D.Collision.Shapes.b2Shape.e_circleShape) {
            this.m_vertices = [shape.m_p];
            this.m_count = 1;
            this.m_radius = shape.m_radius;
        } else if (type == Box2D.Collision.Shapes.b2Shape.e_polygonShape) {
            this.m_vertices = shape.m_vertices;
            this.m_count = shape.m_vertexCount;
            this.m_radius = shape.m_radius;
        } else {
            Box2D.Common.b2Settings.b2Assert(false);
        }
   };
   
   b2DistanceProxy.prototype.GetSupport = function (d) {
      var bestIndex = 0;
      var bestValue = this.m_vertices[0].x * d.x + this.m_vertices[0].y * d.y;
      for (var i = 1; i < this.m_count; i++) {
         var value = this.m_vertices[i].x * d.x + this.m_vertices[i].y * d.y;
         if (value > bestValue) {
            bestIndex = i;
            bestValue = value;
         }
      }
      return bestIndex;
   };
   
   b2DistanceProxy.prototype.GetSupportVertex = function (d) {
       return this.m_vertices[this.GetSupport(d)];
   };
   
   b2DistanceProxy.prototype.GetVertexCount = function () {
       return this.m_count;
   };
   
   b2DistanceProxy.prototype.GetVertex = function (index) {
      if (index === undefined) index = 0;
      Box2D.Common.b2Settings.b2Assert(0 <= index && index < this.m_count);
      return this.m_vertices[index];
   };
})(Box2D.Collision.b2DistanceProxy);




Box2D.Collision.b2DynamicTreeBroadPhase = function() {
    Box2D.Collision.b2DynamicTreeBroadPhase.b2DynamicTreeBroadPhase.apply(this, arguments);
};
(function(b2DynamicTreeBroadPhase) {
})(Box2D.Collision.b2DynamicTreeBroadPhase);

Box2D.Collision.b2DynamicTreeNode = function() {
    Box2D.Collision.b2DynamicTreeNode.b2DynamicTreeNode.apply(this, arguments);
};
(function(b2DynamicTreeNode) {
})(Box2D.Collision.b2DynamicTreeNode);

Box2D.Collision.b2DynamicTreePair = function() {
    Box2D.Collision.b2DynamicTreePair.b2DynamicTreePair.apply(this, arguments);
};
(function(b2DynamicTreePair) {
})(Box2D.Collision.b2DynamicTreePair);

Box2D.Collision.b2Manifold = function() {
    Box2D.Collision.b2Manifold.b2Manifold.apply(this, arguments);
    if (this.constructor === Box2D.Collision.b2Manifold) this.b2Manifold.apply(this, arguments);
};
(function(b2Manifold) {
})(Box2D.Collision.b2Manifold);

Box2D.Collision.b2ManifoldPoint = function() {
    Box2D.Collision.b2ManifoldPoint.b2ManifoldPoint.apply(this, arguments);
    if (this.constructor === Box2D.Collision.b2ManifoldPoint) this.b2ManifoldPoint.apply(this, arguments);
};
(function(b2ManifoldPoint) {
})(Box2D.Collision.b2ManifoldPoint);

Box2D.Collision.b2Point = function() {
    Box2D.Collision.b2Point.b2Point.apply(this, arguments);
};
(function(b2Point) {
})(Box2D.Collision.b2Point);

Box2D.Collision.b2RayCastInput = function() {
    Box2D.Collision.b2RayCastInput.b2RayCastInput.apply(this, arguments);
    if (this.constructor === Box2D.Collision.b2RayCastInput) this.b2RayCastInput.apply(this, arguments);
};
(function(b2RayCastInput) {
})(Box2D.Collision.b2RayCastInput);

Box2D.Collision.b2RayCastOutput = function() {
    Box2D.Collision.b2RayCastOutput.b2RayCastOutput.apply(this, arguments);
};
(function(b2RayCastOutput) {
})(Box2D.Collision.b2RayCastOutput);

Box2D.Collision.b2Segment = function() {
    Box2D.Collision.b2Segment.b2Segment.apply(this, arguments);
};
(function(b2Segment) {
})(Box2D.Collision.b2Segment);

Box2D.Collision.b2SeparationFunction = function() {
    Box2D.Collision.b2SeparationFunction.b2SeparationFunction.apply(this, arguments);
};
(function(b2SeparationFunction) {
})(Box2D.Collision.b2SeparationFunction);

(function(c) {
    
    c.b2Simplex = function() {
        c.b2Simplex.b2Simplex.apply(this, arguments);
        if (this.constructor === c.b2Simplex) this.b2Simplex.apply(this, arguments);
    };
    
    c.b2SimplexCache = function() {
        c.b2SimplexCache.b2SimplexCache.apply(this, arguments);
    };
    
    c.b2SimplexVertex = function() {
        c.b2SimplexVertex.b2SimplexVertex.apply(this, arguments);
    };
    
    c.b2TimeOfImpact = function() {
        c.b2TimeOfImpact.b2TimeOfImpact.apply(this, arguments);
    };
    
    c.b2TOIInput = function() {
        c.b2TOIInput.b2TOIInput.apply(this, arguments);
    };
    
    c.b2WorldManifold = function() {
        c.b2WorldManifold.b2WorldManifold.apply(this, arguments);
        if (this.constructor === c.b2WorldManifold) this.b2WorldManifold.apply(this, arguments);
    };
    
    c.ClipVertex = function() {
        c.ClipVertex.ClipVertex.apply(this, arguments);
    };
    
    c.Features = function() {
        c.Features.Features.apply(this, arguments);
    };
})(Box2D.Collision);
/*
 * See Box2D.js
 */
goog.provide('Box2D.Collision.b2DistanceProxy');

//goog.require('Box2D.Collision.Shapes.b2Shape');
goog.require('Box2D.Common.b2Settings');

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

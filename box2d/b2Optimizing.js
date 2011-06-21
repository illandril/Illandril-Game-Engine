// Next function to optimize from Box2D
   b2ContactSolver.prototype.SolveVelocityConstraints = function () {
      for (var i = 0; i < this.m_constraintCount; ++i) {
         var c = this.m_constraints[i];
         var bodyA = c.bodyA;
         var bodyB = c.bodyB;
         var wA = bodyA.m_angularVelocity;
         var wB = bodyB.m_angularVelocity;
         var vA = bodyA.m_linearVelocity;
         var vB = bodyB.m_linearVelocity;
         var invMassA = bodyA.m_invMass;
         var invIA = bodyA.m_invI;
         var invMassB = bodyB.m_invMass;
         var invIB = bodyB.m_invI;
         var normalX = c.normal.x;
         var normalY = c.normal.y;
         var tangentX = normalY;
         var tangentY = (-normalX);
         var friction = c.friction;
         var tX = 0;
         for (var j = 0; j < c.pointCount; j++) {
            var ccp = c.points[j];
            var dvX = vB.x - wB * ccp.rB.y - vA.x + wA * ccp.rA.y;
            var dvY = vB.y + wB * ccp.rB.x - vA.y - wA * ccp.rA.x;
            var vt = dvX * tangentX + dvY * tangentY;
            var lambda = ccp.tangentMass * (-vt);
            var maxFriction = friction * ccp.normalImpulse;
            var newImpulse = b2Math.Clamp(ccp.tangentImpulse + lambda, (-maxFriction), maxFriction);
            lambda = newImpulse - ccp.tangentImpulse;
            var PX = lambda * tangentX;
            var PY = lambda * tangentY;
            vA.x -= invMassA * PX;
            vA.y -= invMassA * PY;
            wA -= invIA * (ccp.rA.x * PY - ccp.rA.y * PX);
            vB.x += invMassB * PX;
            vB.y += invMassB * PY;
            wB += invIB * (ccp.rB.x * PY - ccp.rB.y * PX);
            ccp.tangentImpulse = newImpulse;
         }
         var tCount = parseInt(c.pointCount);
         if (c.pointCount == 1) {
            var ccp = c.points[0];
            var dvX = vB.x + (-wB * ccp.rB.y) - vA.x - (-wA * ccp.rA.y);
            var dvY = vB.y + (wB * ccp.rB.x) - vA.y - (wA * ccp.rA.x);
            var vn = dvX * normalX + dvY * normalY;
            var lambda = (-ccp.normalMass * (vn - ccp.velocityBias));
            var newImpulse = ccp.normalImpulse + lambda;
            newImpulse = newImpulse > 0 ? newImpulse : 0.0;
            lambda = newImpulse - ccp.normalImpulse;
            var PX = lambda * normalX;
            var PY = lambda * normalY;
            vA.x -= invMassA * PX;
            vA.y -= invMassA * PY;
            wA -= invIA * (ccp.rA.x * PY - ccp.rA.y * PX);
            vB.x += invMassB * PX;
            vB.y += invMassB * PY;
            wB += invIB * (ccp.rB.x * PY - ccp.rB.y * PX);
            ccp.normalImpulse = newImpulse;
         } else {
            var cp1 = c.points[0];
            var cp2 = c.points[1];
            var aX = cp1.normalImpulse;
            var aY = cp2.normalImpulse;
            var dv1X = vB.x - wB * cp1.rB.y - vA.x + wA * cp1.rA.y;
            var dv1Y = vB.y + wB * cp1.rB.x - vA.y - wA * cp1.rA.x;
            var dv2X = vB.x - wB * cp2.rB.y - vA.x + wA * cp2.rA.y;
            var dv2Y = vB.y + wB * cp2.rB.x - vA.y - wA * cp2.rA.x;
            var vn1 = dv1X * normalX + dv1Y * normalY;
            var vn2 = dv2X * normalX + dv2Y * normalY;
            var bX = vn1 - cp1.velocityBias;
            var bY = vn2 - cp2.velocityBias;
            bX -= c.K.col1.x * aX + c.K.col2.x * aY;
            bY -= c.K.col1.y * aX + c.K.col2.y * aY;
            var k_errorTol = 0.001;
            for (;;) {
               var tMat = c.normalMass;
               var xX = (-(tMat.col1.x * bX + tMat.col2.x * bY));
               if (xX >= 0) {
                 var xY = (-(tMat.col1.y * bX + tMat.col2.y * bY));
                 if (xY >= 0.0) {
                   var dX = xX - aX;
                   var dY = xY - aY;
                   var P1X = dX * normalX;
                   var P1Y = dX * normalY;
                   var P2X = dY * normalX;
                   var P2Y = dY * normalY;
                   vA.x -= invMassA * (P1X + P2X);
                   vA.y -= invMassA * (P1Y + P2Y);
                   wA -= invIA * (cp1.rA.x * P1Y - cp1.rA.y * P1X + cp2.rA.x * P2Y - cp2.rA.y * P2X);
                   vB.x += invMassB * (P1X + P2X);
                   vB.y += invMassB * (P1Y + P2Y);
                   wB += invIB * (cp1.rB.x * P1Y - cp1.rB.y * P1X + cp2.rB.x * P2Y - cp2.rB.y * P2X);
                   cp1.normalImpulse = xX;
                   cp2.normalImpulse = xY;
                   break;
                 }
               }
               xX = (-cp1.normalMass * bX);
               var xY = 0.0;
               vn1 = 0.0;
               vn2 = c.K.col1.y * xX + bY;
               if (xX >= 0.0 && vn2 >= 0.0) {
                  var dX = xX - aX;
                  var dY = xY - aY;
                  var P1X = dX * normalX;
                  var P1Y = dX * normalY;
                  var P2X = dY * normalX;
                  var P2Y = dY * normalY;
                  vA.x -= invMassA * (P1X + P2X);
                  vA.y -= invMassA * (P1Y + P2Y);
                  wA -= invIA * (cp1.rA.x * P1Y - cp1.rA.y * P1X + cp2.rA.x * P2Y - cp2.rA.y * P2X);
                  vB.x += invMassB * (P1X + P2X);
                  vB.y += invMassB * (P1Y + P2Y);
                  wB += invIB * (cp1.rB.x * P1Y - cp1.rB.y * P1X + cp2.rB.x * P2Y - cp2.rB.y * P2X);
                  cp1.normalImpulse = xX;
                  cp2.normalImpulse = xY;
                  break;
               }
               xX = 0.0;
               xY = (-cp2.normalMass * bY);
               vn1 = c.K.col2.x * xY + bX;
               vn2 = 0.0;
               if (xY >= 0.0 && vn1 >= 0.0) {
                  var dX = xX - aX;
                  var dY = xY - aY;
                  var P1X = dX * normalX;
                  var P1Y = dX * normalY;
                  var P2X = dY * normalX;
                  var P2Y = dY * normalY;
                  vA.x -= invMassA * (P1X + P2X);
                  vA.y -= invMassA * (P1Y + P2Y);
                  wA -= invIA * (cp1.rA.x * P1Y - cp1.rA.y * P1X + cp2.rA.x * P2Y - cp2.rA.y * P2X);
                  vB.x += invMassB * (P1X + P2X);
                  vB.y += invMassB * (P1Y + P2Y);
                  wB += invIB * (cp1.rB.x * P1Y - cp1.rB.y * P1X + cp2.rB.x * P2Y - cp2.rB.y * P2X);
                  cp1.normalImpulse = xX;
                  cp2.normalImpulse = xY;
                  break;
               }
               xX = 0.0;
               xY = 0.0;
               vn1 = bX;
               vn2 = bY;
               if (vn1 >= 0.0 && vn2 >= 0.0) {
                  var dX = xX - aX;
                  var dY = xY - aY;
                  var P1X = dX * normalX;
                  var P1Y = dX * normalY;
                  var P2X = dY * normalX;
                  var P2Y = dY * normalY;
                  vA.x -= invMassA * (P1X + P2X);
                  vA.y -= invMassA * (P1Y + P2Y);
                  wA -= invIA * (cp1.rA.x * P1Y - cp1.rA.y * P1X + cp2.rA.x * P2Y - cp2.rA.y * P2X);
                  vB.x += invMassB * (P1X + P2X);
                  vB.y += invMassB * (P1Y + P2Y);
                  wB += invIB * (cp1.rB.x * P1Y - cp1.rB.y * P1X + cp2.rB.x * P2Y - cp2.rB.y * P2X);
                  cp1.normalImpulse = xX;
                  cp2.normalImpulse = xY;
                  break;
               }
               break;
            }
         }
         bodyA.m_angularVelocity = wA;
         bodyB.m_angularVelocity = wB;
      }
   }
var f = void 0, p = null;
function q() {
  return function() {
  }
}
function u(a) {
  return function() {
    return this[a]
  }
}
function D(a) {
  return function() {
    return a
  }
}
var J, O = this;
function aa() {
}
function ba(a) {
  var g = typeof a;
  if(g == "object") {
    if(a) {
      if(a instanceof Array) {
        return"array"
      }else {
        if(a instanceof Object) {
          return g
        }
      }
      var e = Object.prototype.toString.call(a);
      if(e == "[object Window]") {
        return"object"
      }
      if(e == "[object Array]" || typeof a.length == "number" && typeof a.splice != "undefined" && typeof a.propertyIsEnumerable != "undefined" && !a.propertyIsEnumerable("splice")) {
        return"array"
      }
      if(e == "[object Function]" || typeof a.call != "undefined" && typeof a.propertyIsEnumerable != "undefined" && !a.propertyIsEnumerable("call")) {
        return"function"
      }
    }else {
      return"null"
    }
  }else {
    if(g == "function" && typeof a.call == "undefined") {
      return"object"
    }
  }
  return g
}
var ca = "closure_uid_" + Math.floor(Math.random() * 2147483648).toString(36), da = 0;
function ea(a, g) {
  function e() {
  }
  e.prototype = g.prototype;
  a.Pm = g.prototype;
  a.prototype = new e;
  a.prototype.constructor = a
}
;var P = P || {};
P.Fo = P.Fo || {};
(function(a, g) {
  function e() {
  }
  if(!(Object.prototype.defineProperty instanceof Function) && Object.prototype.__defineGetter__ instanceof Function && Object.prototype.__defineSetter__ instanceof Function) {
    Object.defineProperty = function(a, c, b) {
      b.get instanceof Function && a.__defineGetter__(c, b.get);
      b.set instanceof Function && a.__defineSetter__(c, b.set)
    }
  }
  a.ya = function(a, c) {
    e.prototype = c.prototype;
    a.prototype = new e;
    a.prototype.constructor = a
  };
  a.ap = function(a, c) {
    return function() {
      c.apply(a, arguments)
    }
  };
  a.ij = function(a) {
    a === g && (a = 0);
    for(var c = Array(a || 0), b = 0;b < a;++b) {
      c[b] = 0
    }
    return c
  };
  a.hm = function(a, c) {
    return a === p ? !1 : c instanceof Function && a instanceof c ? !0 : a.constructor.rj !== g && a.constructor.rj[c] ? !0 : !1
  };
  a.$c = function(a) {
    return Math.abs(a)
  }
})(P);
P.Fn = function() {
  this.Bk = [];
  this.start = this.size = 0
};
function fa(a, g) {
  a.Bk[a.start + a.size] = g;
  a.size++
}
P.Wa = [];
P.i = {};
P.i.wn = "Box2D.Collision.IBroadPhase";
P.i.yj = function() {
  this.lowerBound = new P.a.f.g;
  this.upperBound = new P.a.f.g
};
(function(a) {
  a.prototype.Jf = function() {
    return this.upperBound.x - this.lowerBound.x < 0 ? !1 : this.upperBound.y - this.lowerBound.y < 0 ? !1 : this.lowerBound.Jf() && this.upperBound.Jf()
  };
  a.prototype.Zi = function() {
    return new P.a.f.g((this.lowerBound.x + this.upperBound.x) / 2, (this.lowerBound.y + this.upperBound.y) / 2)
  };
  a.prototype.Ti = function(a) {
    var e;
    return e = (e = (e = (e = this.lowerBound.x <= a.lowerBound.x) && this.lowerBound.y <= a.lowerBound.y) && a.upperBound.x <= this.upperBound.x) && a.upperBound.y <= this.upperBound.y
  };
  a.prototype.ie = function(a) {
    return a.lowerBound.x - this.upperBound.x > 0 ? !1 : a.lowerBound.y - this.upperBound.y > 0 ? !1 : this.lowerBound.x - a.upperBound.x > 0 ? !1 : this.lowerBound.y - a.upperBound.y > 0 ? !1 : !0
  };
  a.Cf = function(g, e) {
    var d = new a;
    d.Cf(g, e);
    return d
  };
  a.prototype.Cf = function(a, e) {
    this.lowerBound.x = Math.min(a.lowerBound.x, e.lowerBound.x);
    this.lowerBound.y = Math.min(a.lowerBound.y, e.lowerBound.y);
    this.upperBound.x = Math.max(a.upperBound.x, e.upperBound.x);
    this.upperBound.y = Math.max(a.upperBound.y, e.upperBound.y)
  }
})(P.i.yj);
P.i.Wb = q();
(function(a) {
  a.Vk = function(a, e, d, c) {
    c === f && (c = 0);
    var b = 0, h = e[0].Oc, i = e[1].Oc, j = d.x * h.x + d.y * h.y - c, d = d.x * i.x + d.y * i.y - c;
    j <= 0 && a[b++].s(e[0]);
    d <= 0 && a[b++].s(e[1]);
    if(j * d < 0) {
      d = j / (j - d), c = a[b].Oc, c.x = h.x + d * (i.x - h.x), c.y = h.y + d * (i.y - h.y), a[b].id = j > 0 ? e[0].id : e[1].id, b++
    }
    return b
  };
  a.Oh = function(a, e, d, c, b) {
    d === f && (d = 0);
    for(var h = a.u, i = a.na, a = c.u, j = e.h.b.x * i[d].x + e.h.d.x * i[d].y, i = e.h.b.y * i[d].x + e.h.d.y * i[d].y, k = b.h.b.x * j + b.h.b.y * i, m = b.h.d.x * j + b.h.d.y * i, l = 0, s = Number.MAX_VALUE, n = 0;n < c.ja;++n) {
      var x = a[n].x * k + a[n].y * m;
      x < s && (s = x, l = n)
    }
    return(b.position.x + (b.h.b.x * a[l].x + b.h.d.x * a[l].y) - (e.position.x + (e.h.b.x * h[d].x + e.h.d.x * h[d].y))) * j + (b.position.y + (b.h.b.y * a[l].x + b.h.d.y * a[l].y) - (e.position.y + (e.h.b.y * h[d].x + e.h.d.y * h[d].y))) * i
  };
  a.Zk = function(g, e, d, c, b) {
    var h = e.na, i = b.position.x + (b.h.b.x * c.gc.x + b.h.d.x * c.gc.y), j = b.position.y + (b.h.b.y * c.gc.x + b.h.d.y * c.gc.y);
    i -= d.position.x + (d.h.b.x * e.gc.x + d.h.d.x * e.gc.y);
    j -= d.position.y + (d.h.b.y * e.gc.x + d.h.d.y * e.gc.y);
    for(var k = i * d.h.b.x + j * d.h.b.y, j = i * d.h.d.x + j * d.h.d.y, i = 0, m = -Number.MAX_VALUE, l = 0;l < e.ja;++l) {
      var s = h[l].x * k + h[l].y * j;
      s > m && (m = s, i = l)
    }
    h = a.Oh(e, d, i, c, b);
    k = i - 1;
    k < 0 && (k = e.ja - 1);
    j = a.Oh(e, d, k, c, b);
    m = i + 1;
    m >= e.ja && (m = 0);
    var l = a.Oh(e, d, m, c, b), n = s = 0, x = 0;
    if(j > h && j > l) {
      x = -1, s = k, n = j
    }else {
      if(l > h) {
        x = 1, s = m, n = l
      }else {
        return g[0] = i, h
      }
    }
    for(;;) {
      if(x == -1 ? (i = s - 1, i < 0 && (i = e.ja - 1)) : (i = s + 1, i >= e.ja && (i = 0)), h = a.Oh(e, d, i, c, b), h > n) {
        s = i, n = h
      }else {
        break
      }
    }
    g[0] = s;
    return n
  };
  a.rn = function(a, e, d, c, b, h) {
    c === f && (c = 0);
    for(var i = d.h.b.x * e.na[c].x + d.h.d.x * e.na[c].y, e = d.h.b.y * e.na[c].x + d.h.d.y * e.na[c].y, d = h.h.b.x * i + h.h.b.y * e, e = h.h.d.x * i + h.h.d.y * e, i = d, d = 0, j = Number.MAX_VALUE, k = 0;k < b.ja;k++) {
      var m = i * b.na[k].x + e * b.na[k].y;
      m < j && (j = m, d = k)
    }
    i = d + 1;
    i >= b.ja && (i = 0);
    a[0].Oc.x = h.position.x + (h.h.b.x * b.u[d].x + h.h.d.x * b.u[d].y);
    a[0].Oc.y = h.position.y + (h.h.b.y * b.u[d].x + h.h.d.y * b.u[d].y);
    a[0].id.Sc.eq = c;
    a[0].id.Sc.gp = d;
    a[0].id.Sc.hp = 0;
    a[1].Oc.x = h.position.x + (h.h.b.x * b.u[i].x + h.h.d.x * b.u[i].y);
    a[1].Oc.y = h.position.y + (h.h.b.y * b.u[i].x + h.h.d.y * b.u[i].y);
    a[1].id.Sc.eq = c;
    a[1].id.Sc.gp = i;
    a[1].id.Sc.hp = 1
  };
  a.gj = function() {
    return[new P.i.Bf, new P.i.Bf]
  };
  a.cn = function(g, e, d, c, b) {
    g.Za = 0;
    var h = e.ba + c.ba;
    a.Fk[0] = 0;
    var i = a.Zk(a.Fk, e, d, c, b);
    if(!(i > h)) {
      a.Gk[0] = 0;
      var j = a.Zk(a.Gk, c, b, e, d);
      if(!(j > h)) {
        var k = e, m = c, l = d, s = b, n = a.Fk[0], x = 0;
        g.ca = P.i.pb.kd;
        if(j > 0.98 * i + 0.001) {
          k = c, m = e, l = b, s = d, n = a.Gk[0], g.ca = P.i.pb.cf, x = 1
        }
        e = a.gq;
        a.rn(e, k, l, n, m, s);
        m = k.u[n];
        k = n + 1 < k.ja ? k.u[n + 1] : k.u[0];
        a.Ce.s(k.x - m.x, k.y - m.y);
        a.Ce.dc();
        a.Ik.x = a.Ce.y;
        a.Ik.y = -a.Ce.x;
        a.Nm.s(0.5 * (m.x + k.x), 0.5 * (m.y + k.y));
        a.sd.x = l.h.b.x * a.Ce.x + l.h.d.x * a.Ce.y;
        a.sd.y = l.h.b.y * a.Ce.x + l.h.d.y * a.Ce.y;
        a.Jk.x = -a.sd.x;
        a.Jk.y = -a.sd.y;
        a.rg.x = a.sd.y;
        a.rg.y = -a.sd.x;
        a.sg.x = l.position.x + (l.h.b.x * m.x + l.h.d.x * m.y);
        a.sg.y = l.position.y + (l.h.b.y * m.x + l.h.d.y * m.y);
        a.Li.x = l.position.x + (l.h.b.x * k.x + l.h.d.x * k.y);
        a.Li.y = l.position.y + (l.h.b.y * k.x + l.h.d.y * k.y);
        if(!(a.Vk(a.Lm, e, a.Jk, -a.sd.x * a.sg.x - a.sd.y * a.sg.y + h) < 2) && !(a.Vk(a.og, a.Lm, a.sd, a.sd.x * a.Li.x + a.sd.y * a.Li.y + h) < 2)) {
          g.yb.p(a.Ik);
          g.ia.p(a.Nm);
          l = a.rg.x * a.sg.x + a.rg.y * a.sg.y;
          for(n = k = 0;n < P.a.$.Dc;++n) {
            if(a.rg.x * a.og[n].Oc.x + a.rg.y * a.og[n].Oc.y - l <= h) {
              m = a.og[n].Oc.x - s.position.x, e = a.og[n].Oc.y - s.position.y, g.aa[k].ia.x = m * s.h.b.x + e * s.h.b.y, g.aa[k].ia.y = m * s.h.d.x + e * s.h.d.y, g.aa[k].Ud.s(a.og[n].id), g.aa[k].Ud.Sc.Yq = x, k++
            }
          }
          g.Za = k
        }
      }
    }
  };
  a.an = function(a, e, d, c, b) {
    a.Za = 0;
    var h = b.position.x + (b.h.b.x * c.Fa.x + b.h.d.x * c.Fa.y) - (d.position.x + (d.h.b.x * e.Fa.x + d.h.d.x * e.Fa.y)), d = b.position.y + (b.h.b.y * c.Fa.x + b.h.d.y * c.Fa.y) - (d.position.y + (d.h.b.y * e.Fa.x + d.h.d.y * e.Fa.y)), b = e.ba + c.ba;
    if(!(h * h + d * d > b * b)) {
      a.ca = P.i.pb.Tj, a.ia.p(e.Fa), a.yb.V(), a.Za = 1, a.aa[0].ia.p(c.Fa), a.aa[0].Ud.key = 0
    }
  };
  a.bn = function(a, e, d, c, b) {
    a.Za = 0;
    for(var h = b.position.x + (b.h.b.x * c.Fa.x + b.h.d.x * c.Fa.y) - d.position.x, i = b.position.y + (b.h.b.y * c.Fa.x + b.h.d.y * c.Fa.y) - d.position.y, b = h * d.h.b.x + i * d.h.b.y, d = h * d.h.d.x + i * d.h.d.y, h = 0, i = -Number.MAX_VALUE, j = e.ba + c.ba, k = 0;k < e.ja;++k) {
      var m = e.na[k].x * (b - e.u[k].x) + e.na[k].y * (d - e.u[k].y);
      if(m > j) {
        return
      }
      m > i && (i = m, h = k)
    }
    m = h + 1;
    m >= e.ja && (m = 0);
    var k = e.u[h], l = e.u[m];
    if(i < Number.MIN_VALUE) {
      a.Za = 1, a.ca = P.i.pb.kd, a.yb.p(e.na[h]), a.ia.x = 0.5 * (k.x + l.x), a.ia.y = 0.5 * (k.y + l.y)
    }else {
      if((b - k.x) * (l.x - k.x) + (d - k.y) * (l.y - k.y) <= 0) {
        if((b - k.x) * (b - k.x) + (d - k.y) * (d - k.y) > j * j) {
          return
        }
        a.Za = 1;
        a.ca = P.i.pb.kd;
        a.yb.x = b - k.x;
        a.yb.y = d - k.y;
        a.yb.dc();
        a.ia.p(k)
      }else {
        if((b - l.x) * (k.x - l.x) + (d - l.y) * (k.y - l.y) <= 0) {
          if((b - l.x) * (b - l.x) + (d - l.y) * (d - l.y) > j * j) {
            return
          }
          a.Za = 1;
          a.ca = P.i.pb.kd;
          a.yb.x = b - l.x;
          a.yb.y = d - l.y;
          a.yb.dc();
          a.ia.p(l)
        }else {
          m = 0.5 * (k.x + l.x);
          k = 0.5 * (k.y + l.y);
          i = (b - m) * e.na[h].x + (d - k) * e.na[h].y;
          if(i > j) {
            return
          }
          a.Za = 1;
          a.ca = P.i.pb.kd;
          a.yb.x = e.na[h].x;
          a.yb.y = e.na[h].y;
          a.yb.dc();
          a.ia.s(m, k)
        }
      }
    }
    a.aa[0].ia.p(c.Fa);
    a.aa[0].Ud.key = 0
  };
  a.ie = function(a, e) {
    return e.lowerBound.x - a.upperBound.x > 0 ? !1 : e.lowerBound.y - a.upperBound.y > 0 ? !1 : a.lowerBound.x - e.upperBound.x > 0 ? !1 : a.lowerBound.y - e.upperBound.y > 0 ? !1 : !0
  };
  P.Wa.push(function() {
    P.i.Wb.gq = a.gj();
    P.i.Wb.Lm = a.gj();
    P.i.Wb.og = a.gj();
    P.i.Wb.Fk = [0];
    P.i.Wb.Gk = [0];
    P.i.Wb.Ce = new P.a.f.g;
    P.i.Wb.Ik = new P.a.f.g;
    P.i.Wb.Nm = new P.a.f.g;
    P.i.Wb.rg = new P.a.f.g;
    P.i.Wb.sd = new P.a.f.g;
    P.i.Wb.Jk = new P.a.f.g;
    P.i.Wb.sg = new P.a.f.g;
    P.i.Wb.Li = new P.a.f.g
  })
})(P.i.Wb);
P.i.Qe = function() {
  this.Sc = new P.i.Wi;
  this.constructor === P.i.Qe && this.Qe.apply(this, arguments)
};
(function(a) {
  a.prototype.Qe = function() {
    this.Sc.ke = this
  };
  a.prototype.s = function(a) {
    this.key = a.qc
  };
  a.prototype.mb = function() {
    var g = new a;
    g.key = this.key;
    return g
  };
  Object.defineProperty(a.prototype, "key", {enumerable:!1, configurable:!0, get:u("qc"), set:function(a) {
    a === f && (a = 0);
    this.qc = a;
    this.Sc.vj = this.qc & 255;
    this.Sc.tj = (this.qc & 65280) >> 8 & 255;
    this.Sc.uj = (this.qc & 16711680) >> 16 & 255;
    this.Sc.sj = (this.qc & 4278190080) >> 24 & 255
  }})
})(P.i.Qe);
P.i.ro = function() {
  this.position = new P.a.f.g;
  this.Vm = new P.a.f.g;
  this.kb = new P.a.f.g;
  this.id = new P.i.Qe
};
P.i.ci = q();
(function(a) {
  a.Vi = function(g, e, d) {
    a.ka.Gn(e, d.Lc, d.Oi, d.Mc, d.Pi);
    (a.ka.Y < 1 || a.ka.Y > 3) && P.a.$.Ra(!1);
    for(var c = 0;c < 20;) {
      for(var b = [], h = 0;h < a.ka.Y;h++) {
        b[h] = {}, b[h].bb = a.ka.u[h].bb, b[h].cb = a.ka.u[h].cb
      }
      a.ka.Y == 2 ? a.ka.Xn() : a.ka.Y == 3 && a.ka.Yn();
      if(a.ka.Y == 3) {
        break
      }
      h = a.ka.un();
      if(h.Vh() < P.fj) {
        break
      }
      a.ka.u[a.ka.Y].bb = d.Lc.Sh(P.a.f.Xa.ge(d.Oi.h, h.fe()));
      a.ka.u[a.ka.Y].Jb = P.a.f.Xa.Oa(d.Oi, d.Lc.Cb(a.ka.u[a.ka.Y].bb));
      a.ka.u[a.ka.Y].cb = d.Mc.Sh(P.a.f.Xa.ge(d.Pi.h, h));
      a.ka.u[a.ka.Y].ad = P.a.f.Xa.Oa(d.Pi, d.Mc.Cb(a.ka.u[a.ka.Y].cb));
      a.ka.u[a.ka.Y].Ab = P.a.f.Xa.Pa(a.ka.u[a.ka.Y].ad, a.ka.u[a.ka.Y].Jb);
      c++;
      for(var i = !1, h = 0;h < b.length;h++) {
        if(a.ka.u[a.ka.Y].bb == b[h].bb && a.ka.u[a.ka.Y].cb == b[h].cb) {
          i = !0;
          break
        }
      }
      if(i) {
        break
      }
      a.ka.Y++
    }
    a.ka.vn(g.Zd, g.$d);
    g.Yf = P.a.f.Xa.Pa(g.Zd, g.$d).Ld();
    g.ar = c;
    a.ka.eo(e);
    if(d.Um) {
      e = d.Lc.ba, d = d.Mc.ba, g.Yf > e + d && g.Yf > Number.MIN_VALUE ? (g.Yf -= e + d, c = P.a.f.Xa.Pa(g.$d, g.Zd), c.dc(), g.Zd.x += e * c.x, g.Zd.y += e * c.y, g.$d.x -= d * c.x, g.$d.y -= d * c.y) : (d = new P.a.f.g, d.x = 0.5 * (g.Zd.x + g.$d.x), d.y = 0.5 * (g.Zd.y + g.$d.y), g.Zd.x = g.$d.x = d.x, g.Zd.y = g.$d.y = d.y, g.Yf = 0)
    }
  };
  P.Wa.push(function() {
    P.i.ci.ka = new P.i.oe
  })
})(P.i.ci);
P.i.Al = q();
P.i.Bl = function() {
  this.Zd = new P.a.f.g;
  this.$d = new P.a.f.g
};
P.i.Hj = q();
(function(a) {
  a.prototype.s = function(a) {
    var e = a.la();
    e == P.i.H.O.qe ? (this.u = [a.Fa], this.Y = 1, this.ba = a.ba) : e == P.i.H.O.Pd ? (this.u = a.u, this.Y = a.ja, this.ba = a.ba) : P.a.$.Ra(!1)
  };
  a.prototype.Sh = function(a) {
    for(var e = 0, d = this.u[0].x * a.x + this.u[0].y * a.y, c = 1;c < this.Y;c++) {
      var b = this.u[c].x * a.x + this.u[c].y * a.y;
      b > d && (e = c, d = b)
    }
    return e
  };
  a.prototype.Eg = function(a) {
    return this.u[this.Sh(a)]
  };
  a.prototype.gl = u("Y");
  a.prototype.Cb = function(a) {
    a === f && (a = 0);
    P.a.$.Ra(0 <= a && a < this.Y);
    return this.u[a]
  }
})(P.i.Hj);
P.c = {};
P.c.Nd = function(a, g) {
  this.Fb = new P.c.Re;
  this.kf = new P.c.D.me;
  this.Ea = new P.c.Ue;
  if(this.constructor === P.c.Nd) {
    this.qk = this.dg = !1, this.Sd = this.Na = this.za = this.Da = this.Gb = this.dr = p, this.fk = this.hc = this.Xc = this.Lb = 0, P.c.Nd.Op = !0, P.c.Nd.vp = !0, this.ck = g, this.sm = a, this.tm = 0, this.Fb.zb = this, this.jk = this.Ef(new P.c.Pe)
  }
};
(function(a) {
  a.zn = 1 - 100 * Number.MIN_VALUE;
  a.prototype.Nn = function(a) {
    this.Fb.ek = a
  };
  a.prototype.On = function(a) {
    this.Fb.bg = a
  };
  a.prototype.Pn = function(a) {
    this.Gb = a
  };
  a.prototype.Ef = function(a) {
    if(this.dg) {
      return p
    }
    a = new P.c.sa(a, this);
    a.rb = p;
    if(a.L = this.Da) {
      this.Da.rb = a
    }
    this.Da = a;
    this.Lb++;
    return a
  };
  a.prototype.hn = function(a) {
    if(!this.dg) {
      for(var e = a.Na;e;) {
        var d = e, e = e.next;
        this.jn(d.Rd)
      }
      for(e = a.Sd;e;) {
        d = e, e = e.Yd, d.Ol.nl(a)
      }
      for(e = a.za;e;) {
        d = e, e = e.next, this.Fb.nb(d.ib)
      }
      a.za = p;
      for(e = a.Bd;e;) {
        d = e, e = e.L, d.Ag(this.Fb.jf), d.nb()
      }
      a.Bd = p;
      a.rm = 0;
      if(a.rb) {
        a.rb.L = a.L
      }
      if(a.L) {
        a.L.rb = a.rb
      }
      if(a == this.Da) {
        this.Da = a.L
      }
      this.Lb--
    }
  };
  a.prototype.Ui = function(a) {
    var e = P.c.o.F.Rb(a, p);
    e.rb = p;
    if(e.L = this.Na) {
      this.Na.rb = e
    }
    this.Na = e;
    this.hc++;
    e.$b.Rd = e;
    e.$b.Ja = e.N;
    e.$b.La = p;
    if(e.$b.next = e.S.Na) {
      e.S.Na.La = e.$b
    }
    e.S.Na = e.$b;
    e.ac.Rd = e;
    e.ac.Ja = e.S;
    e.ac.La = p;
    if(e.ac.next = e.N.Na) {
      e.N.Na.La = e.ac
    }
    e.N.Na = e.ac;
    var e = a.ma, d = a.qa;
    if(!a.Oj) {
      for(a = d.za;a;) {
        a.Ja == e && a.ib.$k(), a = a.next
      }
    }
  };
  a.prototype.jn = function(a) {
    var e = a.nm;
    if(a.rb) {
      a.rb.L = a.L
    }
    if(a.L) {
      a.L.rb = a.rb
    }
    if(a == this.Na) {
      this.Na = a.L
    }
    var d = a.S, c = a.N;
    d.nc(!0);
    c.nc(!0);
    if(a.$b.La) {
      a.$b.La.next = a.$b.next
    }
    if(a.$b.next) {
      a.$b.next.La = a.$b.La
    }
    if(a.$b == d.Na) {
      d.Na = a.$b.next
    }
    a.$b.La = p;
    a.$b.next = p;
    if(a.ac.La) {
      a.ac.La.next = a.ac.next
    }
    if(a.ac.next) {
      a.ac.next.La = a.ac.La
    }
    if(a.ac == c.Na) {
      c.Na = a.ac.next
    }
    a.ac.La = p;
    a.ac.next = p;
    P.c.o.F.nb(a, p);
    this.hc--;
    if(!e) {
      for(a = c.za;a;) {
        a.Ja == d && a.ib.$k(), a = a.next
      }
    }
  };
  a.prototype.he = function(g, e, d) {
    g === f && (g = 0);
    e === f && (e = 0);
    d === f && (d = 0);
    if(this.qk) {
      this.Fb.Ph(), this.qk = !1
    }
    this.dg = !0;
    var c = new P.c.Rf;
    c.da = g;
    c.tg = e;
    c.lg = d;
    c.Wc = g > 0 ? 1 / g : 0;
    c.Ya = this.tm * g;
    c.bd = a.Op;
    this.Fb.$m();
    if(c.da > 0) {
      this.Me(c), a.vp && c.da > 0 && this.qj(c), this.tm = c.Wc
    }
    this.dg = !1
  };
  a.prototype.Zm = function() {
    for(var a = this.Da;a;a = a.L) {
      a.mf.V(), a.Dh = 0
    }
  };
  a.prototype.kn = function() {
    if(this.Gb !== p) {
      this.Gb.Mp.dp.clear();
      var g = this.Gb.pm;
      if(g & P.c.Db.$l) {
        for(var e = new P.a.sc(0.5, 0.5, 0.3), d = new P.a.sc(0.5, 0.9, 0.5), c = new P.a.sc(0.5, 0.5, 0.9), b = new P.a.sc(0.6, 0.6, 0.6), h = new P.a.sc(0.9, 0.7, 0.7), i = this.Da;i;i = i.L) {
          for(var j = i.Bd;j;j = j.L) {
            var k = j.Ga;
            i.Kd() ? i.la() == P.c.sa.vc ? this.Bg(k, i.n, d) : i.la() == P.c.sa.Gl ? this.Bg(k, i.n, c) : i.gb ? this.Bg(k, i.n, h) : this.Bg(k, i.n, b) : this.Bg(k, i.n, e)
          }
        }
      }
      if(g & P.c.Db.Uo) {
        for(i = this.Na;i;i = i.L) {
          this.ln(i)
        }
      }
      if(g & P.c.Db.To) {
        for(i = this.Sd;i;i = i.L) {
          i.Yk(this.Gb)
        }
      }
      if(g & P.c.Db.Xl) {
        i = new P.a.sc(0.3, 0.9, 0.9);
        for(j = this.Fb.za;j;j = j.L) {
          d = j.ha, e = j.fa.te.Zi(), d = d.te.Zi(), this.Gb.ud(e, d, i)
        }
      }
      if(g & P.c.Db.Sl) {
        e = new P.a.sc(0, 0, 0.8);
        for(i = this.Da;i;i = i.L) {
          if(i.Kd()) {
            for(j = i.Bd;j;j = j.L) {
              d = this.Fb.jf.Hf(j.ye), this.Gb.mn([new P.a.f.g(d.lowerBound.x, d.lowerBound.y), new P.a.f.g(d.upperBound.x, d.lowerBound.y), new P.a.f.g(d.upperBound.x, d.upperBound.y), new P.a.f.g(d.lowerBound.x, d.upperBound.y)], e)
            }
          }
        }
      }
      if(g & P.c.Db.So) {
        for(i = this.Da;i;i = i.L) {
          a.Kk.h = i.n.h, a.Kk.position = i.e.k, this.Gb.pn(a.Kk)
        }
      }
    }
  };
  a.prototype.Me = function(a) {
    for(var e = this.Sd;e;e = e.L) {
      e.he(a)
    }
    this.Ea.$a(this.Lb, this.Xc, this.hc, this.Fb.bg, this.kf);
    for(var d = this.Da;d;d = d.L) {
      d.Ka = !1
    }
    for(e = this.za;e;e = e.L) {
      e.Ka = !1
    }
    for(e = this.Na;e;e = e.L) {
      e.Ka = !1
    }
    for(e = this.Da;e;e = e.L) {
      if(!e.Ka && e.gb && e.Kd() && e.la() != P.c.sa.vc) {
        this.Ea.Si();
        var c = [];
        c.push(e);
        for(e.Ka = !0;c.length > 0;) {
          if(d = c.pop(), this.Ea.Ri(d), d.gb || d.nc(!0), d.la() != P.c.sa.vc) {
            for(var b = d.za;b;b = b.next) {
              if(!b.ib.Ka && !b.ib.vd() && b.ib.enabled != !1 && b.ib.Af && (this.Ea.Pk(b.ib), b.ib.Ka = !0, !b.Ja.Ka)) {
                c.push(b.Ja), b.Ja.Ka = !0
              }
            }
            for(d = d.Na;d;d = d.next) {
              if(!d.Rd.Ka && d.Ja.Kd() && (this.Ea.Qk(d.Rd), d.Rd.Ka = !0, !d.Ja.Ka)) {
                c.push(d.Ja), d.Ja.Ka = !0
              }
            }
          }
        }
        this.Ea.Me(a, this.sm, this.ck);
        for(c = 0;c < this.Ea.Lb;++c) {
          if(this.Ea.fc[c].la() == P.c.sa.vc) {
            this.Ea.fc[c].Ka = !1
          }
        }
      }
    }
    for(d = this.Da;d;d = d.L) {
      d.gb && d.Kd() && d.la() != P.c.sa.vc && d.tl()
    }
    this.Fb.Ph()
  };
  a.prototype.qj = function(g) {
    this.Ea.$a(this.Lb, P.a.$.yo, P.a.$.zo, this.Fb.bg, this.kf);
    for(var e = this.Da;e;e = e.L) {
      e.Ka = !1, e.e.tb = 0
    }
    for(var d = this.za;d;d = d.L) {
      d.Ka = !1, d.hg = p
    }
    for(d = this.Na;d;d = d.L) {
      d.Ka = !1
    }
    for(;;) {
      var d = this.fo(), c = d.Tp, d = d.Up;
      if(c === p || a.zn < d) {
        break
      }
      a.Jm.s(c.fa.M.e);
      a.Km.s(c.ha.M.e);
      c.fa.M.de(d);
      c.ha.M.de(d);
      c.vl(this.Fb.bg);
      c.hg = p;
      if(c.vd() || c.enabled == !1) {
        c.fa.M.e.s(a.Jm), c.ha.M.e.s(a.Km), c.fa.M.Qa(), c.ha.M.Qa()
      }else {
        if(c.Af) {
          var b = c.fa.M;
          if(b.la() != P.c.sa.Eb) {
            b = c.ha.M
          }
          this.Ea.Si();
          c = new P.Fn;
          fa(c, b);
          for(b.Ka = !0;c.size > 0;) {
            if(b = c, e = b.Bk[b.start], b.Bk[b.start] = p, b.size--, b.start++, this.Ea.Ri(e), e.gb || e.nc(!0), e.la() == P.c.sa.Eb) {
              for(b = e.za;b;b = b.next) {
                if(this.Ea.Xc == this.Ea.up) {
                  break
                }
                if(!b.ib.Ka && !b.ib.vd() && b.ib.enabled != !1 && b.ib.Af && (this.Ea.Pk(b.ib), b.ib.Ka = !0, !b.Ja.Ka)) {
                  b.Ja.la() != P.c.sa.vc && (b.Ja.de(d), b.Ja.nc(!0)), fa(c, b.Ja), b.Ja.Ka = !0
                }
              }
              for(b = e.Na;b;b = b.next) {
                if(this.Ea.hc != this.Ea.Fp && !b.Rd.Ka && b.Ja.Kd() && (this.Ea.Qk(b.Rd), b.Rd.Ka = !0, !b.Ja.Ka)) {
                  b.Ja.la() != P.c.sa.vc && (b.Ja.de(d), b.Ja.nc(!0)), fa(c, b.Ja), b.Ja.Ka = !0
                }
              }
            }
          }
          c = new P.c.Rf;
          c.bd = !1;
          c.da = (1 - d) * g.da;
          c.Wc = 1 / c.da;
          c.Ya = 0;
          c.tg = g.tg;
          c.lg = g.lg;
          this.Ea.qj(c);
          for(d = 0;d < this.Ea.Lb;d++) {
            if(this.Ea.fc[d].Ka = !1, this.Ea.fc[d].gb && this.Ea.fc[d].la() == P.c.sa.Eb) {
              this.Ea.fc[d].tl();
              for(b = this.Ea.fc[d].za;b;b = b.next) {
                b.ib.hg = p
              }
            }
          }
          for(d = 0;d < this.Ea.Xc;d++) {
            this.Ea.ve[d].Ka = !1, this.Ea.ve[d].hg = p
          }
          for(d = 0;d < this.Ea.hc;d++) {
            this.Ea.pd[d].Ka = !1
          }
          this.Fb.Ph()
        }
      }
    }
  };
  a.prototype.fo = function() {
    for(var a = p, e = 1, d = this.za;d;d = d.L) {
      if(!this.ho(d)) {
        var c = 1;
        if(d.hg != p) {
          c = d.hg
        }else {
          if(d.Af) {
            c = 1
          }else {
            var b = d.fa.M.e.tb;
            if(d.fa.M.e.tb < d.ha.M.e.tb) {
              b = d.ha.M.e.tb, d.fa.M.e.de(b)
            }else {
              if(d.ha.M.e.tb < d.fa.M.e.tb) {
                b = d.fa.M.e.tb, d.ha.M.e.de(b)
              }
            }
            c = d.fn(d.fa.M.e, d.ha.M.e);
            P.a.$.Ra(0 <= c && c <= 1);
            c > 0 && c < 1 && (c = (1 - c) * b + c)
          }
          d.hg = c
        }
        Number.MIN_VALUE < c && c < e && (a = d, e = c)
      }
    }
    return{Tp:a, Up:e}
  };
  a.prototype.ho = function(a) {
    return a.vd() || a.enabled == !1 || !a.Pj ? !0 : (a.fa.M.la() != P.c.sa.Eb || !a.fa.M.gb) && (a.ha.M.la() != P.c.sa.Eb || !a.ha.M.gb) ? !0 : !1
  };
  a.prototype.ln = function(g) {
    g.ca == P.c.o.F.Uj || g.ca == P.c.o.F.Vj ? this.Gb.ud(g.zc(), g.Ac(), a.xf) : g.ca == P.c.o.F.Wj ? (this.Gb.ud(g.cl(), g.zc(), a.xf), this.Gb.ud(g.dl(), g.Ac(), a.xf), this.Gb.ud(g.cl(), g.dl(), a.xf)) : (g.S != this.jk && this.Gb.ud(g.S.n.position, g.zc(), a.xf), this.Gb.ud(g.zc(), g.Ac(), a.xf), g.N != this.jk && this.Gb.ud(g.N.n.position, g.Ac(), a.xf))
  };
  a.prototype.Bg = function(a, e, d) {
    switch(a.ca) {
      case P.i.H.O.qe:
        var c = a instanceof P.i.H.Cc ? a : p;
        this.Gb.nn(P.a.f.Xa.Oa(e, c.Fa), c.ba, e.h.b, d);
        break;
      case P.i.H.O.Pd:
        for(var c = 0, c = a instanceof P.i.H.ec ? a : p, a = parseInt(c.gl()), b = c.u, h = Array(a), c = 0;c < a;++c) {
          h[c] = P.a.f.Xa.Oa(e, b[c])
        }
        this.Gb.on(h, a, d);
        break;
      case P.i.H.O.oh:
        c = a instanceof P.i.H.ne ? a : p, this.Gb.ud(P.a.f.Xa.Oa(e, c.U), P.a.f.Xa.Oa(e, c.ga), d)
    }
  };
  P.Wa.push(function() {
    P.c.Nd.Kk = new P.a.f.Md;
    P.c.Nd.Jm = new P.a.f.Ze;
    P.c.Nd.Km = new P.a.f.Ze;
    P.c.Nd.xf = new P.a.sc(0.5, 0.8, 0.8)
  })
})(P.c.Nd);
P.c.Db = function() {
  this.Hi = this.hk = this.$f = this.Gp = this.cg = 1;
  var a = this;
  this.Mp = {dp:{clear:function() {
    a.Td.clearRect(0, 0, a.Td.canvas.width, a.Td.canvas.height)
  }}};
  if(this.constructor === P.c.Db) {
    this.pm = 0
  }
};
(function(a) {
  a.prototype.je = function(a, e) {
    return"rgba(" + ((a & 16711680) >> 16) + "," + ((a & 65280) >> 8) + "," + (a & 255) + "," + e + ")"
  };
  a.prototype.Sn = function(a) {
    a === f && (a = 0);
    this.pm = a
  };
  a.prototype.Vn = function(a) {
    this.Td = a
  };
  a.prototype.Qn = function(a) {
    a === f && (a = 0);
    this.cg = a
  };
  a.prototype.Tn = function() {
    var a = 1;
    a === f && (a = 0);
    this.Gp = a;
    this.Td.ur = a
  };
  a.prototype.Rn = function() {
    var a = 0.3;
    a === f && (a = 0);
    this.hk = a
  };
  a.prototype.mn = function(a, e) {
    var d = this.Td, c = this.cg;
    d.beginPath();
    d.strokeStyle = this.je(e.color, this.$f);
    d.moveTo(a[0].x * c, a[0].y * c);
    for(var b = 1;b < 4;b++) {
      d.lineTo(a[b].x * c, a[b].y * c)
    }
    d.lineTo(a[0].x * c, a[0].y * c);
    d.closePath();
    d.stroke()
  };
  a.prototype.on = function(a, e, d) {
    if(e) {
      var c = this.Td, b = this.cg;
      c.beginPath();
      c.strokeStyle = this.je(d.color, this.$f);
      c.fillStyle = this.je(d.color, this.hk);
      c.moveTo(a[0].x * b, a[0].y * b);
      for(d = 1;d < e;d++) {
        c.lineTo(a[d].x * b, a[d].y * b)
      }
      c.lineTo(a[0].x * b, a[0].y * b);
      c.closePath();
      c.fill();
      c.stroke()
    }
  };
  a.prototype.nn = function(a, e, d, c) {
    if(e) {
      var b = this.Td, h = this.cg, i = a.x * h, j = a.y * h;
      b.moveTo(0, 0);
      b.beginPath();
      b.strokeStyle = this.je(c.color, this.$f);
      b.fillStyle = this.je(c.color, this.hk);
      b.arc(i, j, e * h, 0, Math.PI * 2, !0);
      b.moveTo(i, j);
      b.lineTo((a.x + d.x * e) * h, (a.y + d.y * e) * h);
      b.closePath();
      b.fill();
      b.stroke()
    }
  };
  a.prototype.ud = function(a, e, d) {
    var c = this.Td, b = this.cg;
    c.strokeStyle = this.je(d.color, this.$f);
    c.beginPath();
    c.moveTo(a.x * b, a.y * b);
    c.lineTo(e.x * b, e.y * b);
    c.closePath();
    c.stroke()
  };
  a.prototype.pn = function(a) {
    var e = this.Td, d = this.cg;
    e.beginPath();
    e.strokeStyle = this.je(16711680, this.$f);
    e.moveTo(a.position.x * d, a.position.y * d);
    e.lineTo((a.position.x + this.Hi * a.h.b.x) * d, (a.position.y + this.Hi * a.h.b.y) * d);
    e.strokeStyle = this.je(65280, this.$f);
    e.moveTo(a.position.x * d, a.position.y * d);
    e.lineTo((a.position.x + this.Hi * a.h.d.x) * d, (a.position.y + this.Hi * a.h.d.y) * d);
    e.closePath();
    e.stroke()
  };
  P.Wa.push(function() {
    P.c.Db.$l = 1;
    P.c.Db.Uo = 2;
    P.c.Db.Sl = 4;
    P.c.Db.Xl = 8;
    P.c.Db.So = 16;
    P.c.Db.To = 32
  })
})(P.c.Db);
P.c.D = {};
P.c.D.Sa = function() {
  this.Hb = new P.c.D.zl;
  this.Ib = new P.c.D.zl;
  this.xc = new P.i.pb;
  this.Ah = new P.i.pb;
  this.constructor === P.c.D.Sa && this.Sa.apply(this, arguments)
};
(function(a) {
  a.Sa = q();
  a.prototype.bj = function(a) {
    var e = this.ha.M, d = this.fa.Ga, c = this.ha.Ga;
    a.$a(this.xc, this.fa.M.Tb(), d.ba, e.Tb(), c.ba)
  };
  a.prototype.vd = u("Mi");
  a.prototype.oj = function(a) {
    this.enabled = a
  };
  a.prototype.$k = function() {
    this.Xj = !0
  };
  a.prototype.Ym = function() {
    this.Xj = !1
  };
  a.prototype.Sa = q();
  a.prototype.ob = function(a, e) {
    a === f && (a = p);
    e === f && (e = p);
    this.enabled = !0;
    this.Xj = this.Af = this.Pj = this.Mi = !1;
    if(!a || !e) {
      this.ha = this.fa = p
    }else {
      if(a.vd() || e.vd()) {
        this.Mi = !0
      }
      var d = a.M, c = e.M;
      if(d.la() != P.c.sa.Eb || d.Th() || c.la() != P.c.sa.Eb || c.Th()) {
        this.Pj = !0
      }
      this.fa = a;
      this.ha = e;
      this.xc.Za = 0;
      this.L = this.rb = p;
      this.Hb.ib = p;
      this.Hb.La = p;
      this.Hb.next = p;
      this.Hb.Ja = p;
      this.Ib.ib = p;
      this.Ib.La = p;
      this.Ib.next = p;
      this.Ib.Ja = p
    }
  };
  a.prototype.vl = function(a) {
    var e = this.Ah;
    this.Ah = this.xc;
    this.xc = e;
    this.enabled = !0;
    var d = !1, e = this.Af, c = this.fa.M, b = this.ha.M, h = this.fa.te.ie(this.ha.te);
    if(this.Mi) {
      if(h) {
        d = this.fa.Ga, h = this.ha.Ga, c = c.Tb(), b = b.Tb(), d = P.i.H.O.ie(d, c, h, b)
      }
      this.xc.Za = 0
    }else {
      this.Pj = c.la() != P.c.sa.Eb || c.Th() || b.la() != P.c.sa.Eb || b.Th() ? !0 : !1;
      if(h) {
        this.cd();
        d = this.xc.Za > 0;
        for(h = 0;h < this.xc.Za;++h) {
          var i = this.xc.aa[h];
          i.pf = 0;
          i.tf = 0;
          for(var j = i.Ud, k = 0;k < this.Ah.Za;++k) {
            var m = this.Ah.aa[k];
            if(m.Ud.key == j.key) {
              i.pf = m.pf;
              i.tf = m.tf;
              break
            }
          }
        }
      }else {
        this.xc.Za = 0
      }
      d != e && (c.nc(!0), b.nc(!0))
    }
    this.Af = d;
    !e && d && a.vg(this);
    e && !d && a.Gf(this);
    this.Mi || a.Hg(this, this.Ah)
  };
  a.prototype.cd = q();
  a.prototype.fn = function(g, e) {
    a.qg.Lc.s(this.fa.Ga);
    a.qg.Mc.s(this.ha.Ga);
    a.qg.Qm = g;
    a.qg.Rm = e;
    a.qg.nq = P.a.$.ta;
    return P.i.tc.$n(a.qg)
  };
  P.Wa.push(function() {
    P.c.D.Sa.qg = new P.i.jh
  })
})(P.c.D.Sa);
P.c.D.Aj = function() {
  P.c.D.Sa.apply(this, arguments)
};
(function(a) {
  P.ya(a, P.c.D.Sa);
  a.prototype.I = P.c.D.Sa.prototype;
  a.Rb = function() {
    return new a
  };
  a.nb = q();
  a.prototype.ob = function(a, e) {
    this.I.ob.call(this, a, e)
  };
  a.prototype.cd = function() {
    P.i.Wb.an(this.xc, this.fa.Ga instanceof P.i.H.Cc ? this.fa.Ga : p, this.fa.M.n, this.ha.Ga instanceof P.i.H.Cc ? this.ha.Ga : p, this.ha.M.n)
  }
})(P.c.D.Aj);
P.c.D.Lg = function() {
  this.zi = new P.a.f.g;
  this.yd = new P.a.f.g;
  this.kb = new P.a.f.g;
  this.kg = new P.a.f.wd;
  this.Kb = new P.a.f.wd;
  this.constructor === P.c.D.Lg && this.Lg.apply(this, arguments)
};
(function(a) {
  a.prototype.Lg = function() {
    this.Pb = Array(P.a.$.Dc);
    for(var a = 0;a < P.a.$.Dc;a++) {
      this.Pb[a] = new P.c.D.qo
    }
  }
})(P.c.D.Lg);
P.c.D.qo = function() {
  this.yd = new P.a.f.g;
  this.oa = new P.a.f.g;
  this.pa = new P.a.f.g
};
P.c.D.zl = q();
P.c.D.Mg = function() {
  this.constructor === P.c.D.Mg && this.Mg.apply(this, arguments)
};
(function(a) {
  a.prototype.Mg = function() {
    this.xn()
  };
  a.prototype.ug = function(a, e, d, c) {
    d === f && (d = 0);
    c === f && (c = 0);
    this.rd[d][c].Qj = a;
    this.rd[d][c].Pl = e;
    this.rd[d][c].zk = !0;
    if(d != c) {
      this.rd[c][d].Qj = a, this.rd[c][d].Pl = e, this.rd[c][d].zk = !1
    }
  };
  a.prototype.xn = function() {
    this.rd = Array(P.i.H.O.ti);
    for(var a = 0;a < P.i.H.O.ti;a++) {
      this.rd[a] = Array(P.i.H.O.ti);
      for(var e = 0;e < P.i.H.O.ti;e++) {
        this.rd[a][e] = new P.c.D.bi
      }
    }
    this.ug(P.c.D.Aj.Rb, P.c.D.Aj.nb, P.i.H.O.qe, P.i.H.O.qe);
    this.ug(P.c.D.bh.Rb, P.c.D.bh.nb, P.i.H.O.Pd, P.i.H.O.qe);
    this.ug(P.c.D.eh.Rb, P.c.D.eh.nb, P.i.H.O.Pd, P.i.H.O.Pd);
    this.ug(P.c.D.Qg.Rb, P.c.D.Qg.nb, P.i.H.O.oh, P.i.H.O.qe);
    this.ug(P.c.D.dh.Rb, P.c.D.dh.nb, P.i.H.O.Pd, P.i.H.O.oh)
  };
  a.prototype.Rb = function(a, e) {
    var d = this.rd[a.la()][e.la()], c;
    if(d.vf) {
      return c = d.vf, d.vf = c.L, d.Em--, c.ob(a, e), c
    }
    c = d.Qj;
    return c != p ? (d.zk ? (c = c(), c.ob(a, e)) : (c = c(), c.ob(e, a)), c) : p
  };
  a.prototype.Rb = function(a, e) {
    var d = this.rd[a.la()][e.la()], c;
    if(d.vf) {
      return c = d.vf, d.vf = c.L, d.Em--, c.ob(a, e), c
    }
    c = d.Qj;
    return c != p ? (d.zk ? (c = c(), c.ob(a, e)) : (c = c(), c.ob(e, a)), c) : p
  };
  a.prototype.nb = function(a) {
    a.xc.Za > 0 && (a.fa.M.nc(!0), a.ha.M.nc(!0));
    var e = this.rd[a.fa.la()][a.ha.la()];
    e.Em++;
    a.L = e.vf;
    e.vf = a;
    e = e.Pl;
    e(a)
  }
})(P.c.D.Mg);
function ga() {
  ga.bi.apply(this, arguments)
}
P.c.D.bi = ga;
function ha() {
  ha.Ej.apply(this, arguments)
}
P.c.D.Ej = ha;
function ia() {
  ia.me.apply(this, arguments);
  this.constructor === ia && this.me.apply(this, arguments)
}
P.c.D.me = ia;
function ja() {
  ja.Qg.apply(this, arguments)
}
P.c.D.Qg = ja;
function ka() {
  ka.ah.apply(this, arguments);
  this.constructor === ka && this.ah.apply(this, arguments)
}
P.c.D.ah = ka;
function la() {
  la.bh.apply(this, arguments)
}
P.c.D.bh = la;
function ma() {
  ma.dh.apply(this, arguments)
}
P.c.D.dh = ma;
function na() {
  na.eh.apply(this, arguments)
}
P.c.D.eh = na;
function oa() {
  oa.We.apply(this, arguments);
  this.constructor === oa && this.We.apply(this, arguments)
}
P.c.D.We = oa;
P.vr = {};
if(typeof P.i.H === "undefined") {
  P.i.H = {}
}
if(typeof P.a === "undefined") {
  P.a = {}
}
if(typeof P.a.f === "undefined") {
  P.a.f = {}
}
if(typeof P.c.Ca === "undefined") {
  P.c.Ca = {}
}
if(typeof P.c.o === "undefined") {
  P.c.o = {}
}
var R = P.i;
P.i.Se = function() {
  R.Se.Se.apply(this, arguments);
  this.constructor === R.Se && this.Se.apply(this, arguments)
};
P.i.Pg = function() {
  R.Pg.Pg.apply(this, arguments)
};
P.i.di = function() {
  R.di.di.apply(this, arguments)
};
P.i.Cl = q();
P.i.pb = function() {
  R.pb.pb.apply(this, arguments);
  this.constructor === R.pb && this.pb.apply(this, arguments)
};
P.i.Ve = function() {
  R.Ve.Ve.apply(this, arguments);
  this.constructor === R.Ve && this.Ve.apply(this, arguments)
};
P.i.ei = function() {
  R.ei.ei.apply(this, arguments)
};
P.i.Xe = function() {
  R.Xe.Xe.apply(this, arguments);
  this.constructor === R.Xe && this.Xe.apply(this, arguments)
};
P.i.fi = function() {
  R.fi.fi.apply(this, arguments)
};
P.i.gi = function() {
  R.gi.gi.apply(this, arguments)
};
P.i.Ye = function() {
  R.Ye.Ye.apply(this, arguments)
};
(function(a) {
  a.oe = function() {
    a.oe.oe.apply(this, arguments);
    this.constructor === a.oe && this.oe.apply(this, arguments)
  };
  a.ih = function() {
    a.ih.ih.apply(this, arguments)
  };
  a.Dl = q();
  a.tc = q();
  a.jh = function() {
    a.jh.jh.apply(this, arguments)
  };
  a.gd = function() {
    a.gd.gd.apply(this, arguments);
    this.constructor === a.gd && this.gd.apply(this, arguments)
  };
  a.Bf = function() {
    a.Bf.Bf.apply(this, arguments)
  };
  a.Wi = q()
})(P.i);
(function(a) {
  a.Cc = function() {
    a.Cc.Cc.apply(this, arguments);
    this.constructor === a.Cc && this.Cc.apply(this, arguments)
  };
  a.Te = function() {
    a.Te.Te.apply(this, arguments);
    this.constructor === a.Te && this.Te.apply(this, arguments)
  };
  a.ne = function() {
    a.ne.ne.apply(this, arguments);
    this.constructor === a.ne && this.ne.apply(this, arguments)
  };
  a.Yg = function() {
    a.Yg.Yg.apply(this, arguments)
  };
  a.ec = function() {
    a.ec.ec.apply(this, arguments);
    this.constructor === a.ec && this.ec.apply(this, arguments)
  };
  a.O = function() {
    a.O.O.apply(this, arguments);
    this.constructor === a.O && this.O.apply(this, arguments)
  }
})(P.i.H);
(function() {
  function a() {
    a.sc.apply(this, arguments);
    this.constructor === a && this.sc.apply(this, arguments)
  }
  function g() {
    g.$.apply(this, arguments)
  }
  function e() {
    e.wd.apply(this, arguments);
    this.constructor === e && this.wd.apply(this, arguments)
  }
  function d() {
    d.Nf.apply(this, arguments);
    this.constructor === d && this.Nf.apply(this, arguments)
  }
  function c() {
    c.Xa.apply(this, arguments)
  }
  function b() {
    b.Ze.apply(this, arguments)
  }
  function h() {
    h.Md.apply(this, arguments);
    this.constructor === h && this.Md.apply(this, arguments)
  }
  function i() {
    i.g.apply(this, arguments);
    this.constructor === i && this.g.apply(this, arguments)
  }
  function j() {
    j.Sf.apply(this, arguments);
    this.constructor === j && this.Sf.apply(this, arguments)
  }
  function k() {
    k.sa.apply(this, arguments);
    this.constructor === k && this.sa.apply(this, arguments)
  }
  function m() {
    m.Pe.apply(this, arguments);
    this.constructor === m && this.Pe.apply(this, arguments)
  }
  function l() {
    l.Lf.apply(this, arguments)
  }
  function s() {
    s.Dj.apply(this, arguments)
  }
  function n() {
    n.ai.apply(this, arguments)
  }
  function x() {
    x.Re.apply(this, arguments);
    this.constructor === x && this.Re.apply(this, arguments)
  }
  function w() {
    w.Gj.apply(this, arguments)
  }
  function z() {
    z.Ij.apply(this, arguments)
  }
  function C() {
    C.Rg.apply(this, arguments);
    this.constructor === C && this.Rg.apply(this, arguments)
  }
  function v() {
    v.Mf.apply(this, arguments);
    this.constructor === v && this.Mf.apply(this, arguments)
  }
  function I() {
    I.Ue.apply(this, arguments);
    this.constructor === I && this.Ue.apply(this, arguments)
  }
  function L() {
    L.Rf.apply(this, arguments)
  }
  function M() {
    M.zj.apply(this, arguments)
  }
  function o() {
    o.Bj.apply(this, arguments)
  }
  function F() {
    F.Cj.apply(this, arguments)
  }
  function K() {
    K.ab.apply(this, arguments)
  }
  function B() {
    B.Fj.apply(this, arguments)
  }
  function Q() {
    Q.Jj.apply(this, arguments)
  }
  function T() {
    T.Mj.apply(this, arguments)
  }
  function t() {
    t.Ng.apply(this, arguments);
    this.constructor === t && this.Ng.apply(this, arguments)
  }
  function r() {
    r.Og.apply(this, arguments);
    this.constructor === r && this.Og.apply(this, arguments)
  }
  function y() {
    y.Sg.apply(this, arguments);
    this.constructor === y && this.Sg.apply(this, arguments)
  }
  function G() {
    G.Tg.apply(this, arguments);
    this.constructor === G && this.Tg.apply(this, arguments)
  }
  function Ka() {
    Ka.Ug.apply(this, arguments);
    this.constructor === Ka && this.Ug.apply(this, arguments)
  }
  function S() {
    S.Vg.apply(this, arguments);
    this.constructor === S && this.Vg.apply(this, arguments)
  }
  function H() {
    H.Kj.apply(this, arguments)
  }
  function E() {
    E.F.apply(this, arguments);
    this.constructor === E && this.F.apply(this, arguments)
  }
  function N() {
    N.R.apply(this, arguments);
    this.constructor === N && this.R.apply(this, arguments)
  }
  function V() {
    V.Lj.apply(this, arguments)
  }
  function La() {
    La.Wg.apply(this, arguments);
    this.constructor === La && this.Wg.apply(this, arguments)
  }
  function Ma() {
    Ma.Xg.apply(this, arguments);
    this.constructor === Ma && this.Xg.apply(this, arguments)
  }
  function Na() {
    Na.Zg.apply(this, arguments);
    this.constructor === Na && this.Zg.apply(this, arguments)
  }
  function A() {
    A.$g.apply(this, arguments);
    this.constructor === A && this.$g.apply(this, arguments)
  }
  function Oa() {
    Oa.fh.apply(this, arguments);
    this.constructor === Oa && this.fh.apply(this, arguments)
  }
  function Pa() {
    Pa.gh.apply(this, arguments);
    this.constructor === Pa && this.gh.apply(this, arguments)
  }
  function Qa() {
    Qa.Of.apply(this, arguments);
    this.constructor === Qa && this.Of.apply(this, arguments)
  }
  function Ra() {
    Ra.hh.apply(this, arguments);
    this.constructor === Ra && this.hh.apply(this, arguments)
  }
  function Sa() {
    Sa.Pf.apply(this, arguments);
    this.constructor === Sa && this.Pf.apply(this, arguments)
  }
  function Ta() {
    Ta.Qf.apply(this, arguments);
    this.constructor === Ta && this.Qf.apply(this, arguments)
  }
  function Ua() {
    Ua.kh.apply(this, arguments);
    this.constructor === Ua && this.kh.apply(this, arguments)
  }
  function Va() {
    Va.Tf.apply(this, arguments);
    this.constructor === Va && this.Tf.apply(this, arguments)
  }
  P.fj = Number.MIN_VALUE * Number.MIN_VALUE;
  P.a.Qq = "Box2D.Common.b2internal";
  P.a.sc = a;
  P.a.$ = g;
  P.a.f.wd = e;
  P.a.f.Nf = d;
  P.a.f.Xa = c;
  P.a.f.Ze = b;
  P.a.f.Md = h;
  P.a.f.g = i;
  P.a.f.Sf = j;
  P.c.sa = k;
  P.c.Pe = m;
  P.c.Lf = l;
  P.c.Dj = s;
  P.c.ai = n;
  P.c.Re = x;
  P.c.Gj = w;
  P.c.Ij = z;
  P.c.Rg = C;
  P.c.Mf = v;
  P.c.Ue = I;
  P.c.Rf = L;
  P.c.Ca.zj = M;
  P.c.Ca.Bj = o;
  P.c.Ca.Cj = F;
  P.c.Ca.ab = K;
  P.c.Ca.Fj = B;
  P.c.Ca.Jj = Q;
  P.c.Ca.Mj = T;
  P.c.o.Ng = t;
  P.c.o.Og = r;
  P.c.o.Sg = y;
  P.c.o.Tg = G;
  P.c.o.Ug = Ka;
  P.c.o.Vg = S;
  P.c.o.Kj = H;
  P.c.o.F = E;
  P.c.o.R = N;
  P.c.o.Lj = V;
  P.c.o.Wg = La;
  P.c.o.Xg = Ma;
  P.c.o.Zg = Na;
  P.c.o.$g = A;
  P.c.o.fh = Oa;
  P.c.o.gh = Pa;
  P.c.o.Of = Qa;
  P.c.o.hh = Ra;
  P.c.o.Pf = Sa;
  P.c.o.Qf = Ta;
  P.c.o.kh = Ua;
  P.c.o.Tf = Va
})();
(function() {
  var a = P.a.$, g = P.a.f.Xa, e = P.a.f.Ze, d = P.a.f.Md, c = P.a.f.g, b = P.i.yj, h = P.i.Qe, i = P.i.ci, j = P.i.Al, k = P.i.Bl, m = P.i.Hj, l = P.i.Se, s = P.i.Pg, n = P.i.di, x = P.i.Cl, w = P.i.pb, z = P.i.Ve, C = P.i.ei, v = P.i.Xe, I = P.i.fi, L = P.i.gi, M = P.i.Ye, o = P.i.oe, F = P.i.ih, K = P.i.Dl, B = P.i.tc, Q = P.i.jh, T = P.i.gd, t = P.i.Bf, r = P.i.Wi, y = P.i.wn;
  l.Se = q();
  l.prototype.Se = function() {
    this.vh = this.Gd = p;
    this.Dp = this.gr = 0
  };
  l.prototype.yg = function(c, b) {
    var d = this.Sk(), t = a.hi, i = a.hi;
    d.ra.lowerBound.x = c.lowerBound.x - t;
    d.ra.lowerBound.y = c.lowerBound.y - i;
    d.ra.upperBound.x = c.upperBound.x + t;
    d.ra.upperBound.y = c.upperBound.y + i;
    d.Fe = b;
    this.hl(d);
    return d
  };
  l.prototype.Ag = function(a) {
    this.ol(a);
    this.Yi(a)
  };
  l.prototype.hj = function(c, b, d) {
    a.Ra(c.Uh());
    if(c.ra.Ti(b)) {
      return!1
    }
    this.ol(c);
    var t = a.hi + a.El * (d.x > 0 ? d.x : -d.x), d = a.hi + a.El * (d.y > 0 ? d.y : -d.y);
    c.ra.lowerBound.x = b.lowerBound.x - t;
    c.ra.lowerBound.y = b.lowerBound.y - d;
    c.ra.upperBound.x = b.upperBound.x + t;
    c.ra.upperBound.y = b.upperBound.y + d;
    this.hl(c);
    return!0
  };
  l.prototype.Hf = function(a) {
    return a.ra
  };
  l.prototype.Ie = function(a) {
    return a.Fe
  };
  l.prototype.jj = function(a, c) {
    if(this.Gd != p) {
      var b = [], d = 0;
      for(b[d++] = this.Gd;d > 0;) {
        var t = b[--d];
        if(t.ra.ie(c)) {
          if(t.Uh()) {
            if(!a(t)) {
              break
            }
          }else {
            b[d++] = t.Ec, b[d++] = t.Od
          }
        }
      }
    }
  };
  l.prototype.Sk = function() {
    if(this.vh) {
      var a = this.vh;
      this.vh = a.parent;
      a.parent = p;
      a.Ec = p;
      a.Od = p;
      return a
    }
    return new n
  };
  l.prototype.Yi = function(a) {
    a.parent = this.vh;
    this.vh = a
  };
  l.prototype.hl = function(a) {
    ++this.Dp;
    if(this.Gd == p) {
      this.Gd = a, this.Gd.parent = p
    }else {
      var c = a.ra.Zi(), b = this.Gd;
      if(b.Uh() == !1) {
        do {
          var d = b.Ec, b = b.Od, b = Math.abs((d.ra.lowerBound.x + d.ra.upperBound.x) / 2 - c.x) + Math.abs((d.ra.lowerBound.y + d.ra.upperBound.y) / 2 - c.y) < Math.abs((b.ra.lowerBound.x + b.ra.upperBound.x) / 2 - c.x) + Math.abs((b.ra.lowerBound.y + b.ra.upperBound.y) / 2 - c.y) ? d : b
        }while(b.Uh() == !1)
      }
      c = b.parent;
      d = this.Sk();
      d.parent = c;
      d.Fe = p;
      d.ra.Cf(a.ra, b.ra);
      if(c) {
        b.parent.Ec == b ? c.Ec = d : c.Od = d;
        d.Ec = b;
        d.Od = a;
        b.parent = d;
        a.parent = d;
        do {
          if(c.ra.Ti(d.ra)) {
            break
          }
          c.ra.Cf(c.Ec.ra, c.Od.ra);
          d = c;
          c = c.parent
        }while(c)
      }else {
        d.Ec = b, d.Od = a, b.parent = d, this.Gd = a.parent = d
      }
    }
  };
  l.prototype.ol = function(a) {
    if(a == this.Gd) {
      this.Gd = p
    }else {
      var c = a.parent, d = c.parent, a = c.Ec == a ? c.Od : c.Ec;
      if(d) {
        d.Ec == c ? d.Ec = a : d.Od = a;
        a.parent = d;
        for(this.Yi(c);d;) {
          c = d.ra;
          d.ra = b.Cf(d.Ec.ra, d.Od.ra);
          if(c.Ti(d.ra)) {
            break
          }
          d = d.parent
        }
      }else {
        this.Gd = a, a.parent = p, this.Yi(c)
      }
    }
  };
  s.Pg = function() {
    this.Yc = new l;
    this.of = [];
    this.Bh = [];
    this.qf = 0
  };
  s.prototype.yg = function(a, c) {
    var b = this.Yc.yg(a, c);
    ++this.Kp;
    this.Uk(b);
    return b
  };
  s.prototype.Ag = function(a) {
    this.ao(a);
    --this.Kp;
    this.Yc.Ag(a)
  };
  s.prototype.hj = function(a, c, b) {
    this.Yc.hj(a, c, b) && this.Uk(a)
  };
  s.prototype.ie = function(a, c) {
    return this.Yc.Hf(a).ie(this.Yc.Hf(c))
  };
  s.prototype.Ie = function(a) {
    return this.Yc.Ie(a)
  };
  s.prototype.Hf = function(a) {
    return this.Yc.Hf(a)
  };
  s.prototype.bo = function(a) {
    for(var c = this, b = c.qf = 0, d, b = 0;b < c.of.length;++b) {
      d = c.of[b], c.Yc.jj(function(a) {
        if(a == d) {
          return!0
        }
        c.qf == c.Bh.length && (c.Bh[c.qf] = new x);
        var b = c.Bh[c.qf];
        b.Lc = a < d ? a : d;
        b.Mc = a >= d ? a : d;
        ++c.qf;
        return!0
      }, c.Yc.Hf(d))
    }
    for(b = c.of.length = 0;b < c.qf;) {
      var t = c.Bh[b];
      a(c.Yc.Ie(t.Lc), c.Yc.Ie(t.Mc));
      for(++b;b < c.qf;) {
        var i = c.Bh[b];
        if(i.Lc != t.Lc || i.Mc != t.Mc) {
          break
        }
        ++b
      }
    }
  };
  s.prototype.jj = function(a, c) {
    this.Yc.jj(a, c)
  };
  s.prototype.Uk = function(a) {
    this.of[this.of.length] = a
  };
  s.prototype.ao = function(a) {
    this.of.splice(this.of.indexOf(a), 1)
  };
  s.rj = {};
  s.rj[y] = !0;
  n.di = function() {
    this.ra = new b
  };
  n.prototype.Uh = function() {
    return this.Ec == p
  };
  x.Cl = q();
  w.pb = function() {
    this.Za = 0
  };
  w.prototype.pb = function() {
    this.aa = [];
    for(var b = 0;b < a.Dc;b++) {
      this.aa[b] = new z
    }
    this.yb = new c;
    this.ia = new c
  };
  w.prototype.ob = function() {
    for(var c = 0;c < a.Dc;c++) {
      (this.aa[c] instanceof z ? this.aa[c] : p).ob()
    }
    this.yb.V();
    this.ia.V();
    this.Za = this.ca = 0
  };
  w.prototype.s = function(c) {
    this.Za = c.Za;
    for(var b = 0;b < a.Dc;b++) {
      (this.aa[b] instanceof z ? this.aa[b] : p).s(c.aa[b])
    }
    this.yb.p(c.yb);
    this.ia.p(c.ia);
    this.ca = c.ca
  };
  w.prototype.mb = function() {
    var a = new w;
    a.s(this);
    return a
  };
  P.Wa.push(function() {
    P.i.pb.Tj = 1;
    P.i.pb.kd = 2;
    P.i.pb.cf = 4
  });
  z.Ve = function() {
    this.ia = new c;
    this.Ud = new h
  };
  z.prototype.Ve = function() {
    this.ob()
  };
  z.prototype.ob = function() {
    this.ia.V();
    this.tf = this.pf = 0;
    this.Ud.key = 0
  };
  z.prototype.s = function(a) {
    this.ia.p(a.ia);
    this.pf = a.pf;
    this.tf = a.tf;
    this.Ud.s(a.Ud)
  };
  C.ei = function() {
    this.mr = new c
  };
  v.Xe = function() {
    this.Cm = new c;
    this.Dm = new c
  };
  v.prototype.Xe = function(a, c, b) {
    a === f && (a = p);
    c === f && (c = p);
    b === f && (b = 1);
    a && this.Cm.p(a);
    c && this.Dm.p(c);
    this.ir = b
  };
  I.fi = function() {
    this.kb = new c
  };
  L.gi = function() {
    this.Cm = new c;
    this.Dm = new c
  };
  M.Ye = function() {
    this.ia = new c;
    this.B = new c
  };
  M.prototype.$a = function(b, d, t, i, e) {
    this.ze = d;
    this.Ae = i;
    var r = b.count;
    a.Ra(0 < r && r < 3);
    var y, o, j, h, F = h = j = i = d = 0, k = 0, F = 0;
    r == 1 ? (this.ca = M.Yl, y = this.ze.Cb(b.bb[0]), o = this.Ae.Cb(b.cb[0]), r = y, b = t.h, d = t.position.x + (b.b.x * r.x + b.d.x * r.y), i = t.position.y + (b.b.y * r.x + b.d.y * r.y), r = o, b = e.h, j = e.position.x + (b.b.x * r.x + b.d.x * r.y), h = e.position.y + (b.b.y * r.x + b.d.y * r.y), this.B.x = j - d, this.B.y = h - i, this.B.dc()) : (b.cb[0] == b.cb[1] ? (this.ca = M.kd, d = this.ze.Cb(b.bb[0]), i = this.ze.Cb(b.bb[1]), o = this.Ae.Cb(b.cb[0]), this.ia.x = 0.5 * (d.x + i.x), this.ia.y = 
    0.5 * (d.y + i.y), this.B = g.ee(g.Pa(i, d), 1), this.B.dc(), r = this.B, b = t.h, F = b.b.x * r.x + b.d.x * r.y, k = b.b.y * r.x + b.d.y * r.y, r = this.ia, b = t.h, d = t.position.x + (b.b.x * r.x + b.d.x * r.y), i = t.position.y + (b.b.y * r.x + b.d.y * r.y), r = o, b = e.h, j = e.position.x + (b.b.x * r.x + b.d.x * r.y), h = e.position.y + (b.b.y * r.x + b.d.y * r.y), F = (j - d) * F + (h - i) * k) : b.bb[0] == b.bb[0] ? (this.ca = M.cf, j = this.Ae.Cb(b.cb[0]), h = this.Ae.Cb(b.cb[1]), y = 
    this.ze.Cb(b.bb[0]), this.ia.x = 0.5 * (j.x + h.x), this.ia.y = 0.5 * (j.y + h.y), this.B = g.ee(g.Pa(h, j), 1), this.B.dc(), r = this.B, b = e.h, F = b.b.x * r.x + b.d.x * r.y, k = b.b.y * r.x + b.d.y * r.y, r = this.ia, b = e.h, j = e.position.x + (b.b.x * r.x + b.d.x * r.y), h = e.position.y + (b.b.y * r.x + b.d.y * r.y), r = y, b = t.h, d = t.position.x + (b.b.x * r.x + b.d.x * r.y), i = t.position.y + (b.b.y * r.x + b.d.y * r.y), F = (d - j) * F + (i - h) * k) : (d = this.ze.Cb(b.bb[0]), 
    i = this.ze.Cb(b.bb[1]), j = this.Ae.Cb(b.cb[0]), h = this.Ae.Cb(b.cb[1]), g.Oa(t, y), y = g.ub(t.h, g.Pa(i, d)), g.Oa(e, o), F = g.ub(e.h, g.Pa(h, j)), e = y.x * y.x + y.y * y.y, o = F.x * F.x + F.y * F.y, b = g.Pa(F, y), t = y.x * b.x + y.y * b.y, b = F.x * b.x + F.y * b.y, y = y.x * F.x + y.y * F.y, k = e * o - y * y, F = 0, k != 0 && (F = g.xa((y * b - t * o) / k, 0, 1)), (y * F + b) / o < 0 && (F = g.xa((y - t) / e, 0, 1)), y = new c, y.x = d.x + F * (i.x - d.x), y.y = d.y + F * (i.y - d.y), 
    o = new c, o.x = j.x + F * (h.x - j.x), o.y = j.y + F * (h.y - j.y), F == 0 || F == 1 ? (this.ca = M.cf, this.B = g.ee(g.Pa(h, j), 1), this.B.dc(), this.ia = o) : (this.ca = M.kd, this.B = g.ee(g.Pa(i, d), 1), this.ia = y)), F < 0 && this.B.ll())
  };
  M.prototype.cd = function(c, b) {
    var d, t, i = 0;
    switch(this.ca) {
      case M.Yl:
        return d = g.ge(c.h, this.B), t = g.ge(b.h, this.B.fe()), d = this.ze.Eg(d), t = this.Ae.Eg(t), d = g.Oa(c, d), t = g.Oa(b, t), i = (t.x - d.x) * this.B.x + (t.y - d.y) * this.B.y;
      case M.kd:
        return i = g.ub(c.h, this.B), d = g.Oa(c, this.ia), t = g.ge(b.h, i.fe()), t = this.Ae.Eg(t), t = g.Oa(b, t), i = (t.x - d.x) * i.x + (t.y - d.y) * i.y;
      case M.cf:
        return i = g.ub(b.h, this.B), t = g.Oa(b, this.ia), d = g.ge(c.h, i.fe()), d = this.ze.Eg(d), d = g.Oa(c, d), i = (d.x - t.x) * i.x + (d.y - t.y) * i.y;
      default:
        return a.Ra(!1), 0
    }
  };
  P.Wa.push(function() {
    P.i.Ye.Yl = 1;
    P.i.Ye.kd = 2;
    P.i.Ye.cf = 4
  });
  o.oe = function() {
    this.U = new K;
    this.ga = new K;
    this.yc = new K;
    this.u = Array(3)
  };
  o.prototype.oe = function() {
    this.u[0] = this.U;
    this.u[1] = this.ga;
    this.u[2] = this.yc
  };
  o.prototype.Gn = function(c, b, d, t, i) {
    a.Ra(0 <= c.count && c.count <= 3);
    var e, r;
    this.Y = c.count;
    for(var y = this.u, o = 0;o < this.Y;o++) {
      var j = y[o];
      j.bb = c.bb[o];
      j.cb = c.cb[o];
      e = b.Cb(j.bb);
      r = t.Cb(j.cb);
      j.Jb = g.Oa(d, e);
      j.ad = g.Oa(i, r);
      j.Ab = g.Pa(j.ad, j.Jb);
      j.z = 0
    }
    if(this.Y > 1 && (c = c.Sp, e = this.fl(), e < 0.5 * c || 2 * c < e || e < Number.MIN_VALUE)) {
      this.Y = 0
    }
    if(this.Y == 0) {
      j = y[0], j.bb = 0, j.cb = 0, e = b.Cb(0), r = t.Cb(0), j.Jb = g.Oa(d, e), j.ad = g.Oa(i, r), j.Ab = g.Pa(j.ad, j.Jb), this.Y = 1
    }
  };
  o.prototype.eo = function(a) {
    a.Sp = this.fl();
    a.count = P.$c(this.Y);
    for(var c = this.u, b = 0;b < this.Y;b++) {
      a.bb[b] = P.$c(c[b].bb), a.cb[b] = P.$c(c[b].cb)
    }
  };
  o.prototype.un = function() {
    switch(this.Y) {
      case 1:
        return this.U.Ab.fe();
      case 2:
        var b = g.Pa(this.ga.Ab, this.U.Ab);
        return g.Ff(b, this.U.Ab.fe()) > 0 ? g.Wk(1, b) : g.ee(b, 1);
      default:
        return a.Ra(!1), new c
    }
  };
  o.prototype.vn = function(c, b) {
    switch(this.Y) {
      case 0:
        a.Ra(!1);
        break;
      case 1:
        c.p(this.U.Jb);
        b.p(this.U.ad);
        break;
      case 2:
        c.x = this.U.z * this.U.Jb.x + this.ga.z * this.ga.Jb.x;
        c.y = this.U.z * this.U.Jb.y + this.ga.z * this.ga.Jb.y;
        b.x = this.U.z * this.U.ad.x + this.ga.z * this.ga.ad.x;
        b.y = this.U.z * this.U.ad.y + this.ga.z * this.ga.ad.y;
        break;
      case 3:
        b.x = c.x = this.U.z * this.U.Jb.x + this.ga.z * this.ga.Jb.x + this.yc.z * this.yc.Jb.x;
        b.y = c.y = this.U.z * this.U.Jb.y + this.ga.z * this.ga.Jb.y + this.yc.z * this.yc.Jb.y;
        break;
      default:
        a.Ra(!1)
    }
  };
  o.prototype.fl = function() {
    switch(this.Y) {
      case 0:
        return a.Ra(!1), 0;
      case 1:
        return 0;
      case 2:
        return g.Pa(this.U.Ab, this.ga.Ab).Ld();
      case 3:
        return g.Ff(g.Pa(this.ga.Ab, this.U.Ab), g.Pa(this.yc.Ab, this.U.Ab));
      default:
        return a.Ra(!1), 0
    }
  };
  o.prototype.Xn = function() {
    var a = this.U.Ab, c = this.ga.Ab, b = g.Pa(c, a), a = -(a.x * b.x + a.y * b.y);
    a <= 0 ? this.Y = this.U.z = 1 : (c = c.x * b.x + c.y * b.y, c <= 0 ? (this.Y = this.ga.z = 1, this.U.s(this.ga)) : (b = 1 / (c + a), this.U.z = c * b, this.ga.z = a * b, this.Y = 2))
  };
  o.prototype.Yn = function() {
    var a = this.U.Ab, c = this.ga.Ab, b = this.yc.Ab, d = g.Pa(c, a), t = g.Bb(c, d), i = -g.Bb(a, d), e = g.Pa(b, a), r = g.Bb(b, e), y = -g.Bb(a, e), o = g.Pa(b, c), j = g.Bb(b, o), o = -g.Bb(c, o), e = g.Ff(d, e), d = e * g.Ff(c, b), b = e * g.Ff(b, a), a = e * g.Ff(a, c);
    i <= 0 && y <= 0 ? this.Y = this.U.z = 1 : t > 0 && i > 0 && a <= 0 ? (r = 1 / (t + i), this.U.z = t * r, this.ga.z = i * r, this.Y = 2) : r > 0 && y > 0 && b <= 0 ? (t = 1 / (r + y), this.U.z = r * t, this.yc.z = y * t, this.Y = 2, this.ga.s(this.yc)) : t <= 0 && o <= 0 ? (this.Y = this.ga.z = 1, this.U.s(this.ga)) : r <= 0 && j <= 0 ? (this.Y = this.yc.z = 1, this.U.s(this.yc)) : j > 0 && o > 0 && d <= 0 ? (t = 1 / (j + o), this.ga.z = j * t, this.yc.z = o * t, this.Y = 2, this.U.s(this.yc)) : 
    (t = 1 / (d + b + a), this.U.z = d * t, this.ga.z = b * t, this.yc.z = a * t, this.Y = 3)
  };
  F.ih = function() {
    this.bb = [0, 0, 0];
    this.cb = [0, 0, 0]
  };
  K.Dl = q();
  K.prototype.s = function(a) {
    this.Jb.p(a.Jb);
    this.ad.p(a.ad);
    this.Ab.p(a.Ab);
    this.z = a.z;
    this.bb = a.bb;
    this.cb = a.cb
  };
  B.tc = q();
  B.$n = function(b) {
    ++B.Bo;
    var c = b.Lc, d = b.Mc, t = b.Qm, e = b.Rm;
    a.Ra(t.tb == e.tb);
    a.Ra(1 - t.tb > Number.MIN_VALUE);
    var r = c.ba + d.ba, b = b.nq, y = 0, o = 0, j = 0;
    B.Ek.count = 0;
    for(B.pg.Um = !1;;) {
      t.Tb(B.De, y);
      e.Tb(B.Ee, y);
      B.pg.Lc = c;
      B.pg.Mc = d;
      B.pg.Oi = B.De;
      B.pg.Pi = B.Ee;
      i.Vi(B.Mm, B.Ek, B.pg);
      if(B.Mm.Yf <= 0) {
        y = 1;
        break
      }
      B.Ji.$a(B.Ek, c, B.De, d, B.Ee);
      var h = B.Ji.cd(B.De, B.Ee);
      if(h <= 0) {
        y = 1;
        break
      }
      o == 0 && (j = h > r ? g.Ub(r - b, 0.75 * r) : g.Ub(h - b, 0.02 * r));
      if(h - j < 0.5 * b) {
        if(o == 0) {
          y = 1;
          break
        }
        break
      }
      var F = y, k = y, K = 1;
      t.Tb(B.De, K);
      e.Tb(B.Ee, K);
      var n = B.Ji.cd(B.De, B.Ee);
      if(n >= j) {
        y = 1;
        break
      }
      for(var z = 0;;) {
        var l = 0, l = z & 1 ? k + (j - h) * (K - k) / (n - h) : 0.5 * (k + K);
        t.Tb(B.De, l);
        e.Tb(B.Ee, l);
        var s = B.Ji.cd(B.De, B.Ee);
        if(g.lb(s - j) < 0.025 * b) {
          F = l;
          break
        }
        s > j ? (k = l, h = s) : (K = l, n = s);
        ++z;
        ++B.Do;
        if(z == 50) {
          break
        }
      }
      B.Ll = g.Ub(B.Ll, z);
      if(F < (1 + 100 * Number.MIN_VALUE) * y) {
        break
      }
      y = F;
      o++;
      ++B.Co;
      if(o == 1E3) {
        break
      }
    }
    B.Kl = g.Ub(B.Kl, o);
    return y
  };
  P.Wa.push(function() {
    P.i.tc.Bo = 0;
    P.i.tc.Co = 0;
    P.i.tc.Kl = 0;
    P.i.tc.Do = 0;
    P.i.tc.Ll = 0;
    P.i.tc.Ek = new F;
    P.i.tc.pg = new j;
    P.i.tc.De = new d;
    P.i.tc.Ee = new d;
    P.i.tc.Ji = new M;
    P.i.tc.Mm = new k
  });
  Q.jh = function() {
    this.Lc = new m;
    this.Mc = new m;
    this.Qm = new e;
    this.Rm = new e
  };
  T.gd = function() {
    this.W = new c
  };
  T.prototype.gd = function() {
    this.aa = Array(a.Dc);
    for(var b = 0;b < a.Dc;b++) {
      this.aa[b] = new c
    }
  };
  T.prototype.$a = function(a, b, c, d, t) {
    c === f && (c = 0);
    t === f && (t = 0);
    if(a.Za != 0) {
      var i = 0, e, r, y = 0, o = 0, g = 0, j = 0, h = 0;
      e = 0;
      switch(a.ca) {
        case w.Tj:
          r = b.h;
          e = a.ia;
          i = b.position.x + r.b.x * e.x + r.d.x * e.y;
          b = b.position.y + r.b.y * e.x + r.d.y * e.y;
          r = d.h;
          e = a.aa[0].ia;
          a = d.position.x + r.b.x * e.x + r.d.x * e.y;
          d = d.position.y + r.b.y * e.x + r.d.y * e.y;
          e = a - i;
          r = d - b;
          y = e * e + r * r;
          y > P.fj ? (y = Math.sqrt(y), this.W.x = e / y, this.W.y = r / y) : (this.W.x = 1, this.W.y = 0);
          e = b + c * this.W.y;
          d -= t * this.W.y;
          this.aa[0].x = 0.5 * (i + c * this.W.x + (a - t * this.W.x));
          this.aa[0].y = 0.5 * (e + d);
          break;
        case w.kd:
          r = b.h;
          e = a.yb;
          y = r.b.x * e.x + r.d.x * e.y;
          o = r.b.y * e.x + r.d.y * e.y;
          r = b.h;
          e = a.ia;
          g = b.position.x + r.b.x * e.x + r.d.x * e.y;
          j = b.position.y + r.b.y * e.x + r.d.y * e.y;
          this.W.x = y;
          this.W.y = o;
          for(i = 0;i < a.Za;i++) {
            r = d.h, e = a.aa[i].ia, h = d.position.x + r.b.x * e.x + r.d.x * e.y, e = d.position.y + r.b.y * e.x + r.d.y * e.y, this.aa[i].x = h + 0.5 * (c - (h - g) * y - (e - j) * o - t) * y, this.aa[i].y = e + 0.5 * (c - (h - g) * y - (e - j) * o - t) * o
          }
          break;
        case w.cf:
          r = d.h;
          e = a.yb;
          y = r.b.x * e.x + r.d.x * e.y;
          o = r.b.y * e.x + r.d.y * e.y;
          r = d.h;
          e = a.ia;
          g = d.position.x + r.b.x * e.x + r.d.x * e.y;
          j = d.position.y + r.b.y * e.x + r.d.y * e.y;
          this.W.x = -y;
          this.W.y = -o;
          for(i = 0;i < a.Za;i++) {
            r = b.h, e = a.aa[i].ia, h = b.position.x + r.b.x * e.x + r.d.x * e.y, e = b.position.y + r.b.y * e.x + r.d.y * e.y, this.aa[i].x = h + 0.5 * (t - (h - g) * y - (e - j) * o - c) * y, this.aa[i].y = e + 0.5 * (t - (h - g) * y - (e - j) * o - c) * o
          }
      }
    }
  };
  t.Bf = function() {
    this.Oc = new c;
    this.id = new h
  };
  t.prototype.s = function(a) {
    this.Oc.p(a.Oc);
    this.id.s(a.id)
  };
  r.Wi = q();
  Object.defineProperty(r.prototype, "referenceEdge", {enumerable:!1, configurable:!0, get:u("vj")});
  Object.defineProperty(r.prototype, "referenceEdge", {enumerable:!1, configurable:!0, set:function(a) {
    a === f && (a = 0);
    this.vj = a;
    this.ke.qc = this.ke.qc & 4294967040 | this.vj & 255
  }});
  Object.defineProperty(r.prototype, "incidentEdge", {enumerable:!1, configurable:!0, get:u("tj")});
  Object.defineProperty(r.prototype, "incidentEdge", {enumerable:!1, configurable:!0, set:function(a) {
    a === f && (a = 0);
    this.tj = a;
    this.ke.qc = this.ke.qc & 4294902015 | this.tj << 8 & 65280
  }});
  Object.defineProperty(r.prototype, "incidentVertex", {enumerable:!1, configurable:!0, get:u("uj")});
  Object.defineProperty(r.prototype, "incidentVertex", {enumerable:!1, configurable:!0, set:function(a) {
    a === f && (a = 0);
    this.uj = a;
    this.ke.qc = this.ke.qc & 4278255615 | this.uj << 16 & 16711680
  }});
  Object.defineProperty(r.prototype, "flip", {enumerable:!1, configurable:!0, get:u("sj")});
  Object.defineProperty(r.prototype, "flip", {enumerable:!1, configurable:!0, set:function(a) {
    a === f && (a = 0);
    this.sj = a;
    this.ke.qc = this.ke.qc & 16777215 | this.sj << 24 & 4278190080
  }})
})();
(function() {
  var a = P.a.$, g = P.i.H.Cc, e = P.i.H.Te, d = P.i.H.ne, c = P.i.H.Yg, b = P.i.H.ec, h = P.i.H.O, i = P.a.f.wd, j = P.a.f.Xa, k = P.a.f.Md, m = P.a.f.g, l = P.i.ci, s = P.i.Al, n = P.i.Bl, x = P.i.Hj, w = P.i.ih;
  P.ya(g, P.i.H.O);
  g.prototype.I = P.i.H.O.prototype;
  g.Cc = function() {
    P.i.H.O.O.apply(this, arguments);
    this.Fa = new m
  };
  g.prototype.mb = function() {
    var a = new g;
    a.s(this);
    return a
  };
  g.prototype.s = function(a) {
    this.I.s.call(this, a);
    P.hm(a, g) && this.Fa.p((a instanceof g ? a : p).Fa)
  };
  g.prototype.Df = function(a, b) {
    var c = b.h, d = b.position.x + (c.b.x * this.Fa.x + c.d.x * this.Fa.y), c = b.position.y + (c.b.y * this.Fa.x + c.d.y * this.Fa.y);
    a.lowerBound.s(d - this.ba, c - this.ba);
    a.upperBound.s(d + this.ba, c + this.ba)
  };
  g.prototype.wg = function(b, c) {
    c === f && (c = 0);
    b.Hd = c * a.lh * this.ba * this.ba;
    b.hd.p(this.Fa);
    b.If = b.Hd * (0.5 * this.ba * this.ba + (this.Fa.x * this.Fa.x + this.Fa.y * this.Fa.y))
  };
  g.prototype.Nh = function(a, b, c, d) {
    b === f && (b = 0);
    var c = j.Oa(c, this.Fa), e = -(j.Bb(a, c) - b);
    if(e < -this.ba + Number.MIN_VALUE) {
      return 0
    }
    if(e > this.ba) {
      return d.p(c), Math.PI * this.ba * this.ba
    }
    var b = this.ba * this.ba, i = e * e, e = b * (Math.asin(e / this.ba) + Math.PI / 2) + e * Math.sqrt(b - i), b = -2 / 3 * Math.pow(b - i, 1.5) / e;
    d.x = c.x + a.x * b;
    d.y = c.y + a.y * b;
    return e
  };
  g.prototype.Cc = function(a) {
    a === f && (a = 0);
    this.I.O.call(this);
    this.ca = h.qe;
    this.ba = a
  };
  e.Te = q();
  e.prototype.Te = function() {
    this.xr = 0;
    this.$q = !0;
    this.yr = []
  };
  P.ya(d, P.i.H.O);
  d.prototype.I = P.i.H.O.prototype;
  d.ne = function() {
    P.i.H.O.O.apply(this, arguments);
    this.sr = new m;
    this.U = new m;
    this.ga = new m;
    this.wp = new m;
    this.xp = new m;
    this.W = new m;
    this.we = new m;
    this.yp = new m;
    this.zp = new m
  };
  d.prototype.Df = function(a, b) {
    var c = b.h, d = b.position.x + (c.b.x * this.U.x + c.d.x * this.U.y), e = b.position.y + (c.b.y * this.U.x + c.d.y * this.U.y), i = b.position.x + (c.b.x * this.ga.x + c.d.x * this.ga.y), c = b.position.y + (c.b.y * this.ga.x + c.d.y * this.ga.y);
    d < i ? (a.lowerBound.x = d, a.upperBound.x = i) : (a.lowerBound.x = i, a.upperBound.x = d);
    e < c ? (a.lowerBound.y = e, a.upperBound.y = c) : (a.lowerBound.y = c, a.upperBound.y = e)
  };
  d.prototype.wg = function(a) {
    a.Hd = 0;
    a.hd.p(this.U);
    a.If = 0
  };
  d.prototype.Nh = function(a, b, c, d) {
    b === f && (b = 0);
    var e = new m(a.x * b, a.y * b), i = j.Oa(c, this.U), c = j.Oa(c, this.ga), o = j.Bb(a, i) - b, a = j.Bb(a, c) - b;
    if(o > 0) {
      if(a > 0) {
        return 0
      }else {
        i.x = -a / (o - a) * i.x + o / (o - a) * c.x, i.y = -a / (o - a) * i.y + o / (o - a) * c.y
      }
    }else {
      if(a > 0) {
        c.x = -a / (o - a) * i.x + o / (o - a) * c.x, c.y = -a / (o - a) * i.y + o / (o - a) * c.y
      }
    }
    d.x = (e.x + i.x + c.x) / 3;
    d.y = (e.y + i.y + c.y) / 3;
    return 0.5 * ((i.x - e.x) * (c.y - e.y) - (i.y - e.y) * (c.x - e.x))
  };
  d.prototype.ne = function(b, c) {
    this.I.O.call(this);
    this.ca = h.oh;
    this.fr = this.hr = p;
    this.U = b;
    this.ga = c;
    this.we.s(this.ga.x - this.U.x, this.ga.y - this.U.y);
    this.kk = this.we.dc();
    this.W.s(this.we.y, -this.we.x);
    this.wp.s(-a.ki * (this.W.x - this.we.x) + this.U.x, -a.ki * (this.W.y - this.we.y) + this.U.y);
    this.xp.s(-a.ki * (this.W.x + this.we.x) + this.ga.x, -a.ki * (this.W.y + this.we.y) + this.ga.y);
    this.yp = this.W;
    this.zp.s(-this.W.x, -this.W.y)
  };
  c.Yg = function() {
    this.Hd = 0;
    this.hd = new m(0, 0);
    this.If = 0
  };
  P.ya(b, P.i.H.O);
  b.prototype.I = P.i.H.O.prototype;
  b.ec = function() {
    P.i.H.O.O.apply(this, arguments)
  };
  b.prototype.mb = function() {
    var a = new b;
    a.s(this);
    return a
  };
  b.prototype.s = function(a) {
    this.I.s.call(this, a);
    if(P.hm(a, b)) {
      a = a instanceof b ? a : p;
      this.gc.p(a.gc);
      this.ja = a.ja;
      this.Jg(this.ja);
      for(var c = 0;c < this.ja;c++) {
        this.u[c].p(a.u[c]), this.na[c].p(a.na[c])
      }
    }
  };
  b.prototype.lj = function(a, c) {
    c === f && (c = 0);
    for(var b = [], d = 0, e, d = 0;d < a.length;++d) {
      e = a[d], b.push(e)
    }
    this.ql(b, c)
  };
  b.tq = function(a, c) {
    c === f && (c = 0);
    var d = new b;
    d.lj(a, c);
    return d
  };
  b.prototype.ql = function(c, d) {
    d === f && (d = 0);
    if(d == 0) {
      d = c.length
    }
    a.Ra(2 <= d);
    this.ja = d;
    this.Jg(d);
    for(var e = 0, e = 0;e < this.ja;e++) {
      this.u[e].p(c[e])
    }
    for(e = 0;e < this.ja;++e) {
      var i = j.Pa(this.u[e + 1 < this.ja ? e + 1 : 0], this.u[e]);
      a.Ra(i.Vh() > Number.MIN_VALUE);
      this.na[e].p(j.ee(i, 1));
      this.na[e].dc()
    }
    this.gc = b.en(this.u, this.ja)
  };
  b.xq = function(a, c) {
    c === f && (c = 0);
    var d = new b;
    d.ql(a, c);
    return d
  };
  b.prototype.mj = function(a, c) {
    a === f && (a = 0);
    c === f && (c = 0);
    this.ja = 4;
    this.Jg(4);
    this.u[0].s(-a, -c);
    this.u[1].s(a, -c);
    this.u[2].s(a, c);
    this.u[3].s(-a, c);
    this.na[0].s(0, -1);
    this.na[1].s(1, 0);
    this.na[2].s(0, 1);
    this.na[3].s(-1, 0);
    this.gc.V()
  };
  b.uq = function(a, c) {
    a === f && (a = 0);
    c === f && (c = 0);
    var d = new b;
    d.mj(a, c);
    return d
  };
  b.prototype.nj = function(a, c, b, d) {
    a === f && (a = 0);
    c === f && (c = 0);
    b === f && (b = p);
    d === f && (d = 0);
    this.ja = 4;
    this.Jg(4);
    this.u[0].s(-a, -c);
    this.u[1].s(a, -c);
    this.u[2].s(a, c);
    this.u[3].s(-a, c);
    this.na[0].s(0, -1);
    this.na[1].s(1, 0);
    this.na[2].s(0, 1);
    this.na[3].s(-1, 0);
    this.gc = b;
    a = new k;
    a.position = b;
    a.h.s(d);
    for(b = 0;b < this.ja;++b) {
      this.u[b] = j.Oa(a, this.u[b]), this.na[b] = j.ub(a.h, this.na[b])
    }
  };
  b.wq = function(a, c, d, e) {
    a === f && (a = 0);
    c === f && (c = 0);
    d === f && (d = p);
    e === f && (e = 0);
    var i = new b;
    i.nj(a, c, d, e);
    return i
  };
  b.prototype.Mn = function(a, c) {
    this.ja = 2;
    this.Jg(2);
    this.u[0].p(a);
    this.u[1].p(c);
    this.gc.x = 0.5 * (a.x + c.x);
    this.gc.y = 0.5 * (a.y + c.y);
    this.na[0] = j.ee(j.Pa(c, a), 1);
    this.na[0].dc();
    this.na[1].x = -this.na[0].x;
    this.na[1].y = -this.na[0].y
  };
  b.vq = function(a, c) {
    var d = new b;
    d.Mn(a, c);
    return d
  };
  b.prototype.Df = function(a, c) {
    for(var b = c.h, d = this.u[0], e = c.position.x + (b.b.x * d.x + b.d.x * d.y), i = c.position.y + (b.b.y * d.x + b.d.y * d.y), o = e, g = i, j = 1;j < this.ja;++j) {
      var d = this.u[j], h = c.position.x + (b.b.x * d.x + b.d.x * d.y), d = c.position.y + (b.b.y * d.x + b.d.y * d.y), e = e < h ? e : h, i = i < d ? i : d, o = o > h ? o : h, g = g > d ? g : d
    }
    a.lowerBound.x = e - this.ba;
    a.lowerBound.y = i - this.ba;
    a.upperBound.x = o + this.ba;
    a.upperBound.y = g + this.ba
  };
  b.prototype.wg = function(a, c) {
    c === f && (c = 0);
    if(this.ja == 2) {
      a.hd.x = 0.5 * (this.u[0].x + this.u[1].x), a.hd.y = 0.5 * (this.u[0].y + this.u[1].y), a.Hd = 0, a.If = 0
    }else {
      for(var b = 0, d = 0, e = 0, i = 0, o = 1 / 3, g = 0;g < this.ja;++g) {
        var j = this.u[g], h = g + 1 < this.ja ? this.u[g + 1] : this.u[0], k = j.x - 0, n = j.y - 0, t = h.x - 0, r = h.y - 0, y = k * r - n * t, G = 0.5 * y;
        e += G;
        b += G * o * (0 + j.x + h.x);
        d += G * o * (0 + j.y + h.y);
        j = k;
        i += y * (o * (0.25 * (j * j + t * j + t * t) + (0 * j + 0 * t)) + 0 + (o * (0.25 * (n * n + r * n + r * r) + (0 * n + 0 * r)) + 0))
      }
      a.Hd = c * e;
      b *= 1 / e;
      d *= 1 / e;
      a.hd.s(b, d);
      a.If = c * i
    }
  };
  b.prototype.Nh = function(a, b, d, e) {
    b === f && (b = 0);
    for(var i = j.ge(d.h, a), g = b - j.Bb(a, d.position), o = [], h = 0, k = -1, b = -1, n = !1, a = a = 0;a < this.ja;++a) {
      o[a] = j.Bb(i, this.u[a]) - g;
      var l = o[a] < -Number.MIN_VALUE;
      a > 0 && (l ? n || (k = a - 1, h++) : n && (b = a - 1, h++));
      n = l
    }
    switch(h) {
      case 0:
        return n ? (a = new c, this.wg(a, 1), e.p(j.Oa(d, a.hd)), a.Hd) : 0;
      case 1:
        k == -1 ? k = this.ja - 1 : b = this.ja - 1
    }
    a = (k + 1) % this.ja;
    i = (b + 1) % this.ja;
    g = (0 - o[k]) / (o[a] - o[k]);
    o = (0 - o[b]) / (o[i] - o[b]);
    k = new m(this.u[k].x * (1 - g) + this.u[a].x * g, this.u[k].y * (1 - g) + this.u[a].y * g);
    b = new m(this.u[b].x * (1 - o) + this.u[i].x * o, this.u[b].y * (1 - o) + this.u[i].y * o);
    o = 0;
    g = new m;
    for(h = this.u[a];a != i;) {
      a = (a + 1) % this.ja, n = a == i ? b : this.u[a], l = 0.5 * ((h.x - k.x) * (n.y - k.y) - (h.y - k.y) * (n.x - k.x)), o += l, g.x += l * (k.x + h.x + n.x) / 3, g.y += l * (k.y + h.y + n.y) / 3, h = n
    }
    g.Vb(1 / o);
    e.p(j.Oa(d, g));
    return o
  };
  b.prototype.gl = u("ja");
  b.prototype.Sh = function(a) {
    for(var c = 0, b = this.u[0].x * a.x + this.u[0].y * a.y, d = 1;d < this.ja;++d) {
      var e = this.u[d].x * a.x + this.u[d].y * a.y;
      e > b && (c = d, b = e)
    }
    return c
  };
  b.prototype.Eg = function(a) {
    for(var c = 0, b = this.u[0].x * a.x + this.u[0].y * a.y, d = 1;d < this.ja;++d) {
      var e = this.u[d].x * a.x + this.u[d].y * a.y;
      e > b && (c = d, b = e)
    }
    return this.u[c]
  };
  b.prototype.ec = function() {
    this.I.O.call(this);
    this.ca = h.Pd;
    this.gc = new m;
    this.u = [];
    this.na = []
  };
  b.prototype.Jg = function(a) {
    a === f && (a = 0);
    for(var c = this.u.length;c < a;c++) {
      this.u[c] = new m, this.na[c] = new m
    }
  };
  b.en = function(a, c) {
    c === f && (c = 0);
    for(var b = new m, d = 0, e = 1 / 3, i = 0;i < c;++i) {
      var o = a[i], g = i + 1 < c ? a[i + 1] : a[0], j = 0.5 * ((o.x - 0) * (g.y - 0) - (o.y - 0) * (g.x - 0));
      d += j;
      b.x += j * e * (0 + o.x + g.x);
      b.y += j * e * (0 + o.y + g.y)
    }
    b.x *= 1 / d;
    b.y *= 1 / d;
    return b
  };
  b.zq = function(a, c, b) {
    b === f && (b = 0);
    for(var d = 0, e = Array(b + 1), d = 0;d < b;++d) {
      e[d] = c[d]
    }
    e[b] = e[0];
    c = Number.MAX_VALUE;
    for(d = 1;d <= b;++d) {
      var i = e[d - 1], o = e[d].x - i.x, g = e[d].y - i.y, j = Math.sqrt(o * o + g * g);
      o /= j;
      g /= j;
      for(var h = -g, k = o, n = j = Number.MAX_VALUE, t = -Number.MAX_VALUE, r = -Number.MAX_VALUE, y = 0;y < b;++y) {
        var G = e[y].x - i.x, l = e[y].y - i.y, S = o * G + g * l, G = h * G + k * l;
        S < j && (j = S);
        G < n && (n = G);
        S > t && (t = S);
        G > r && (r = G)
      }
      y = (t - j) * (r - n);
      if(y < 0.95 * c) {
        c = y, a.h.b.x = o, a.h.b.y = g, a.h.d.x = h, a.h.d.y = k, o = 0.5 * (j + t), g = 0.5 * (n + r), h = a.h, a.hd.x = i.x + (h.b.x * o + h.d.x * g), a.hd.y = i.y + (h.b.y * o + h.d.y * g), a.Zo.x = 0.5 * (t - j), a.Zo.y = 0.5 * (r - n)
      }
    }
  };
  P.Wa.push(function() {
    P.i.H.ec.rr = new i
  });
  h.O = q();
  h.prototype.mb = D(p);
  h.prototype.s = function(a) {
    this.ba = a.ba
  };
  h.prototype.la = u("ca");
  h.prototype.Df = q();
  h.prototype.wg = q();
  h.prototype.Nh = D(0);
  h.ie = function(a, c, b, d) {
    var e = new s;
    e.Lc = new x;
    e.Lc.s(a);
    e.Mc = new x;
    e.Mc.s(b);
    e.Oi = c;
    e.Pi = d;
    e.Um = !0;
    a = new w;
    a.count = 0;
    c = new n;
    l.Vi(c, a, e);
    return c.Yf < 10 * Number.MIN_VALUE
  };
  h.prototype.O = function() {
    this.ca = h.Wo;
    this.ba = a.ta
  };
  P.Wa.push(function() {
    P.i.H.O.Wo = -1;
    P.i.H.O.qe = 0;
    P.i.H.O.Pd = 1;
    P.i.H.O.oh = 2;
    P.i.H.O.ti = 3;
    P.i.H.O.Tq = 1;
    P.i.H.O.Uq = 0;
    P.i.H.O.Vq = -1
  })
})();
(function() {
  var a = P.a.sc, g = P.a.$, e = P.a.f.Xa;
  a.sc = function() {
    this.Xh = this.Yh = this.Zh = 0
  };
  a.prototype.sc = function(a, c, b) {
    a === f && (a = 0);
    c === f && (c = 0);
    b === f && (b = 0);
    this.Zh = P.$c(255 * e.xa(a, 0, 1));
    this.Yh = P.$c(255 * e.xa(c, 0, 1));
    this.Xh = P.$c(255 * e.xa(b, 0, 1))
  };
  a.prototype.s = function(a, c, b) {
    a === f && (a = 0);
    c === f && (c = 0);
    b === f && (b = 0);
    this.Zh = P.$c(255 * e.xa(a, 0, 1));
    this.Yh = P.$c(255 * e.xa(c, 0, 1));
    this.Xh = P.$c(255 * e.xa(b, 0, 1))
  };
  Object.defineProperty(a.prototype, "r", {enumerable:!1, configurable:!0, set:function(a) {
    a === f && (a = 0);
    this.Zh = P.$c(255 * e.xa(a, 0, 1))
  }});
  Object.defineProperty(a.prototype, "g", {enumerable:!1, configurable:!0, set:function(a) {
    a === f && (a = 0);
    this.Yh = P.$c(255 * e.xa(a, 0, 1))
  }});
  Object.defineProperty(a.prototype, "b", {enumerable:!1, configurable:!0, set:function(a) {
    a === f && (a = 0);
    this.Xh = P.$c(255 * e.xa(a, 0, 1))
  }});
  Object.defineProperty(a.prototype, "color", {enumerable:!1, configurable:!0, get:function() {
    return this.Zh << 16 | this.Yh << 8 | this.Xh
  }});
  g.$ = q();
  g.to = function(a, c) {
    a === f && (a = 0);
    c === f && (c = 0);
    return Math.sqrt(a * c)
  };
  g.uo = function(a, c) {
    a === f && (a = 0);
    c === f && (c = 0);
    return a > c ? a : c
  };
  g.Ra = function(a) {
    if(!a) {
      throw"Assertion Failed";
    }
  };
  P.Wa.push(function() {
    P.a.$.VERSION = "2.1alpha";
    P.a.$.Nq = 65535;
    P.a.$.lh = Math.PI;
    P.a.$.Dc = 2;
    P.a.$.hi = 0.1;
    P.a.$.El = 2;
    P.a.$.Pq = 2 * g.ta;
    P.a.$.ta = 0.005;
    P.a.$.$e = 2 / 180 * g.lh;
    P.a.$.ki = 8 * g.ta;
    P.a.$.yo = 32;
    P.a.$.zo = 32;
    P.a.$.Eo = 1;
    P.a.$.uc = 0.2;
    P.a.$.ii = 8 / 180 * g.lh;
    P.a.$.Vf = 2;
    P.a.$.Jl = g.Vf * g.Vf;
    P.a.$.Uf = 0.5 * g.lh;
    P.a.$.Il = g.Uf * g.Uf;
    P.a.$.Nj = 0.2;
    P.a.$.Ao = 0.5;
    P.a.$.Hl = 0.01;
    P.a.$.Fl = 2 / 180 * g.lh
  })
})();
(function() {
  var a = P.a.f.wd, g = P.a.f.Nf, e = P.a.f.Xa, d = P.a.f.Ze, c = P.a.f.Md, b = P.a.f.g, h = P.a.f.Sf;
  a.wd = function() {
    this.b = new b;
    this.d = new b
  };
  a.prototype.wd = function() {
    this.Wh()
  };
  a.Qh = function(c) {
    c === f && (c = 0);
    var b = new a;
    b.s(c);
    return b
  };
  a.Cg = function(c, b) {
    var d = new a;
    d.Wn(c, b);
    return d
  };
  a.prototype.s = function(a) {
    a === f && (a = 0);
    var c = Math.cos(a), a = Math.sin(a);
    this.b.x = c;
    this.d.x = -a;
    this.b.y = a;
    this.d.y = c
  };
  a.prototype.Wn = function(a, c) {
    this.b.p(a);
    this.d.p(c)
  };
  a.prototype.mb = function() {
    var c = new a;
    c.Le(this);
    return c
  };
  a.prototype.Le = function(a) {
    this.b.p(a.b);
    this.d.p(a.d)
  };
  a.prototype.Kh = function(a) {
    this.b.x += a.b.x;
    this.b.y += a.b.y;
    this.d.x += a.d.x;
    this.d.y += a.d.y
  };
  a.prototype.Wh = function() {
    this.b.x = 1;
    this.d.x = 0;
    this.b.y = 0;
    this.d.y = 1
  };
  a.prototype.V = function() {
    this.b.x = 0;
    this.d.x = 0;
    this.b.y = 0;
    this.d.y = 0
  };
  a.prototype.Jd = function() {
    return Math.atan2(this.b.y, this.b.x)
  };
  a.prototype.$i = function(a) {
    var c = this.b.x, b = this.d.x, d = this.b.y, e = this.d.y, g = c * e - b * d;
    g != 0 && (g = 1 / g);
    a.b.x = g * e;
    a.d.x = -g * b;
    a.b.y = -g * d;
    a.d.y = g * c
  };
  a.prototype.Me = function(a, c, b) {
    c === f && (c = 0);
    b === f && (b = 0);
    var d = this.b.x, e = this.d.x, g = this.b.y, h = this.d.y, x = d * h - e * g;
    x != 0 && (x = 1 / x);
    a.x = x * (h * c - e * b);
    a.y = x * (d * b - g * c);
    return a
  };
  a.prototype.lb = function() {
    this.b.lb();
    this.d.lb()
  };
  g.Nf = function() {
    this.b = new h;
    this.d = new h;
    this.X = new h
  };
  g.prototype.Nf = function(a, c, b) {
    a === f && (a = p);
    c === f && (c = p);
    b === f && (b = p);
    !a && !c && !b ? (this.b.V(), this.d.V(), this.X.V()) : (this.b.p(a), this.d.p(c), this.X.p(b))
  };
  g.prototype.mb = function() {
    return new g(this.b, this.d, this.X)
  };
  g.prototype.Le = function(a) {
    this.b.p(a.b);
    this.d.p(a.d);
    this.X.p(a.X)
  };
  g.prototype.Kh = function(a) {
    this.b.x += a.b.x;
    this.b.y += a.b.y;
    this.b.t += a.b.t;
    this.d.x += a.d.x;
    this.d.y += a.d.y;
    this.d.t += a.d.t;
    this.X.x += a.X.x;
    this.X.y += a.X.y;
    this.X.t += a.X.t
  };
  g.prototype.Wh = function() {
    this.b.x = 1;
    this.d.x = 0;
    this.X.x = 0;
    this.b.y = 0;
    this.d.y = 1;
    this.X.y = 0;
    this.b.t = 0;
    this.d.t = 0;
    this.X.t = 1
  };
  g.prototype.V = function() {
    this.b.x = 0;
    this.d.x = 0;
    this.X.x = 0;
    this.b.y = 0;
    this.d.y = 0;
    this.X.y = 0;
    this.b.t = 0;
    this.d.t = 0;
    this.X.t = 0
  };
  g.prototype.Kf = function(a, c, b) {
    c === f && (c = 0);
    b === f && (b = 0);
    var d = this.b.x, e = this.d.x, g = this.b.y, h = this.d.y, x = d * h - e * g;
    x != 0 && (x = 1 / x);
    a.x = x * (h * c - e * b);
    a.y = x * (d * b - g * c);
    return a
  };
  g.prototype.Kg = function(a, c, b, d) {
    c === f && (c = 0);
    b === f && (b = 0);
    d === f && (d = 0);
    var e = this.b.x, g = this.b.y, h = this.b.t, x = this.d.x, w = this.d.y, z = this.d.t, C = this.X.x, v = this.X.y, I = this.X.t, L = e * (w * I - z * v) + g * (z * C - x * I) + h * (x * v - w * C);
    L != 0 && (L = 1 / L);
    a.x = L * (c * (w * I - z * v) + b * (z * C - x * I) + d * (x * v - w * C));
    a.y = L * (e * (b * I - d * v) + g * (d * C - c * I) + h * (c * v - b * C));
    a.t = L * (e * (w * d - z * b) + g * (z * c - x * d) + h * (x * b - w * c));
    return a
  };
  e.Xa = q();
  e.Jf = function(a) {
    a === f && (a = 0);
    return isFinite(a)
  };
  e.Bb = function(a, c) {
    return a.x * c.x + a.y * c.y
  };
  e.Ff = function(a, c) {
    return a.x * c.y - a.y * c.x
  };
  e.ee = function(a, c) {
    c === f && (c = 0);
    return new b(c * a.y, -c * a.x)
  };
  e.Wk = function(a, c) {
    a === f && (a = 0);
    return new b(-a * c.y, a * c.x)
  };
  e.ub = function(a, c) {
    return new b(a.b.x * c.x + a.d.x * c.y, a.b.y * c.x + a.d.y * c.y)
  };
  e.ge = function(a, c) {
    return new b(e.Bb(c, a.b), e.Bb(c, a.d))
  };
  e.Oa = function(a, c) {
    var b = e.ub(a.h, c);
    b.x += a.position.x;
    b.y += a.position.y;
    return b
  };
  e.Bn = function(a, c) {
    var b = e.Pa(c, a.position), d = b.x * a.h.b.x + b.y * a.h.b.y;
    b.y = b.x * a.h.d.x + b.y * a.h.d.y;
    b.x = d;
    return b
  };
  e.Rk = function(a, c) {
    return new b(a.x + c.x, a.y + c.y)
  };
  e.Pa = function(a, c) {
    return new b(a.x - c.x, a.y - c.y)
  };
  e.Vi = function(a, c) {
    var b = a.x - c.x, d = a.y - c.y;
    return Math.sqrt(b * b + d * d)
  };
  e.Bq = function(a, c) {
    var b = a.x - c.x, d = a.y - c.y;
    return b * b + d * d
  };
  e.Fq = function(a, c) {
    a === f && (a = 0);
    return new b(a * c.x, a * c.y)
  };
  e.sq = function(c, b) {
    return a.Cg(e.Rk(c.b, b.b), e.Rk(c.d, b.d))
  };
  e.Gq = function(c, b) {
    return a.Cg(e.ub(c, b.b), e.ub(c, b.d))
  };
  e.Hq = function(c, d) {
    var g = new b(e.Bb(c.b, d.b), e.Bb(c.d, d.b)), h = new b(e.Bb(c.b, d.d), e.Bb(c.d, d.d));
    return a.Cg(g, h)
  };
  e.lb = function(a) {
    a === f && (a = 0);
    return a > 0 ? a : -a
  };
  e.Ok = function(a) {
    return new b(e.lb(a.x), e.lb(a.y))
  };
  e.rq = function(c) {
    return a.Cg(e.Ok(c.b), e.Ok(c.d))
  };
  e.Je = function(a, c) {
    a === f && (a = 0);
    c === f && (c = 0);
    return a < c ? a : c
  };
  e.jl = function(a, c) {
    return new b(e.Je(a.x, c.x), e.Je(a.y, c.y))
  };
  e.Ub = function(a, c) {
    a === f && (a = 0);
    c === f && (c = 0);
    return a > c ? a : c
  };
  e.il = function(a, c) {
    return new b(e.Ub(a.x, c.x), e.Ub(a.y, c.y))
  };
  e.xa = function(a, c, b) {
    a === f && (a = 0);
    c === f && (c = 0);
    b === f && (b = 0);
    return a < c ? c : a > b ? b : a
  };
  e.yq = function(a, c, b) {
    return e.il(c, e.jl(a, b))
  };
  e.Mq = function(a, c) {
    var b = a[0];
    a[0] = c[0];
    c[0] = b
  };
  e.Kq = function() {
    return Math.random() * 2 - 1
  };
  e.Lq = function(a, c) {
    a === f && (a = 0);
    c === f && (c = 0);
    var b = Math.random();
    return(c - a) * b + a
  };
  e.Iq = function(a) {
    a === f && (a = 0);
    a |= a >> 1 & 2147483647;
    a |= a >> 2 & 1073741823;
    a |= a >> 4 & 268435455;
    a |= a >> 8 & 16777215;
    a |= a >> 16 & 65535;
    return a + 1
  };
  e.Cq = function(a) {
    a === f && (a = 0);
    return a > 0 && (a & a - 1) == 0
  };
  P.Wa.push(function() {
    P.a.f.Xa.vo = new b(0, 0);
    P.a.f.Xa.so = a.Cg(new b(1, 0), new b(0, 1));
    P.a.f.Xa.Oq = new c(e.vo, e.so)
  });
  d.Ze = function() {
    this.v = new b;
    this.vb = new b;
    this.k = new b
  };
  d.prototype.s = function(a) {
    this.v.p(a.v);
    this.vb.p(a.vb);
    this.k.p(a.k);
    this.Qc = a.Qc;
    this.z = a.z;
    this.tb = a.tb
  };
  d.prototype.mb = function() {
    var a = new d;
    a.v.p(this.v);
    a.vb.p(this.vb);
    a.k.p(this.k);
    a.Qc = this.Qc;
    a.z = this.z;
    a.tb = this.tb;
    return a
  };
  d.prototype.Tb = function(a, c) {
    c === f && (c = 0);
    a.position.x = (1 - c) * this.vb.x + c * this.k.x;
    a.position.y = (1 - c) * this.vb.y + c * this.k.y;
    a.h.s((1 - c) * this.Qc + c * this.z);
    var b = a.h;
    a.position.x -= b.b.x * this.v.x + b.d.x * this.v.y;
    a.position.y -= b.b.y * this.v.x + b.d.y * this.v.y
  };
  d.prototype.de = function(a) {
    a === f && (a = 0);
    if(this.tb < a && 1 - this.tb > Number.MIN_VALUE) {
      var c = (a - this.tb) / (1 - this.tb);
      this.vb.x = (1 - c) * this.vb.x + c * this.k.x;
      this.vb.y = (1 - c) * this.vb.y + c * this.k.y;
      this.Qc = (1 - c) * this.Qc + c * this.z;
      this.tb = a
    }
  };
  c.Md = function() {
    this.position = new b;
    this.h = new a
  };
  c.prototype.Md = function(a, c) {
    a === f && (a = p);
    c === f && (c = p);
    a && (this.position.p(a), this.h.Le(c))
  };
  c.prototype.$a = function(a, c) {
    this.position.p(a);
    this.h.Le(c)
  };
  c.prototype.Wh = function() {
    this.position.V();
    this.h.Wh()
  };
  c.prototype.s = function(a) {
    this.position.p(a.position);
    this.h.Le(a.h)
  };
  c.prototype.Jd = function() {
    return Math.atan2(this.h.b.y, this.h.b.x)
  };
  b.g = q();
  b.prototype.g = function(a, c) {
    a === f && (a = 0);
    c === f && (c = 0);
    this.x = a;
    this.y = c
  };
  b.prototype.V = function() {
    this.y = this.x = 0
  };
  b.prototype.s = function(a, c) {
    a === f && (a = 0);
    c === f && (c = 0);
    this.x = a;
    this.y = c
  };
  b.prototype.p = function(a) {
    this.x = a.x;
    this.y = a.y
  };
  b.prototype.fe = function() {
    return new b(-this.x, -this.y)
  };
  b.prototype.ll = function() {
    this.x = -this.x;
    this.y = -this.y
  };
  b.An = function() {
    var a = 0, c = 0;
    a === f && (a = 0);
    c === f && (c = 0);
    return new b(a, c)
  };
  b.prototype.mb = function() {
    return new b(this.x, this.y)
  };
  b.prototype.ce = function(a) {
    this.x += a.x;
    this.y += a.y
  };
  b.prototype.rl = function(a) {
    this.x -= a.x;
    this.y -= a.y
  };
  b.prototype.Vb = function(a) {
    a === f && (a = 0);
    this.x *= a;
    this.y *= a
  };
  b.prototype.ee = function(a) {
    a === f && (a = 0);
    var c = this.x;
    this.x = a * this.y;
    this.y = -a * c
  };
  b.prototype.Wk = function(a) {
    a === f && (a = 0);
    var c = this.x;
    this.x = -a * this.y;
    this.y = a * c
  };
  b.prototype.jl = function(a) {
    this.x = this.x < a.x ? this.x : a.x;
    this.y = this.y < a.y ? this.y : a.y
  };
  b.prototype.il = function(a) {
    this.x = this.x > a.x ? this.x : a.x;
    this.y = this.y > a.y ? this.y : a.y
  };
  b.prototype.lb = function() {
    if(this.x < 0) {
      this.x = -this.x
    }
    if(this.y < 0) {
      this.y = -this.y
    }
  };
  b.prototype.Ld = function() {
    return Math.sqrt(this.x * this.x + this.y * this.y)
  };
  b.prototype.Vh = function() {
    return this.x * this.x + this.y * this.y
  };
  b.prototype.dc = function() {
    var a = Math.sqrt(this.x * this.x + this.y * this.y);
    if(a < Number.MIN_VALUE) {
      return 0
    }
    var c = 1 / a;
    this.x *= c;
    this.y *= c;
    return a
  };
  b.prototype.Jf = function() {
    return e.Jf(this.x) && e.Jf(this.y)
  };
  h.Sf = q();
  h.prototype.Sf = function(a, c, b) {
    a === f && (a = 0);
    c === f && (c = 0);
    b === f && (b = 0);
    this.x = a;
    this.y = c;
    this.t = b
  };
  h.prototype.V = function() {
    this.x = this.y = this.t = 0
  };
  h.prototype.s = function(a, c, b) {
    a === f && (a = 0);
    c === f && (c = 0);
    b === f && (b = 0);
    this.x = a;
    this.y = c;
    this.t = b
  };
  h.prototype.p = function(a) {
    this.x = a.x;
    this.y = a.y;
    this.t = a.t
  };
  h.prototype.fe = function() {
    return new h(-this.x, -this.y, -this.t)
  };
  h.prototype.ll = function() {
    this.x = -this.x;
    this.y = -this.y;
    this.t = -this.t
  };
  h.prototype.mb = function() {
    return new h(this.x, this.y, this.t)
  };
  h.prototype.ce = function(a) {
    this.x += a.x;
    this.y += a.y;
    this.t += a.t
  };
  h.prototype.rl = function(a) {
    this.x -= a.x;
    this.y -= a.y;
    this.t -= a.t
  };
  h.prototype.Vb = function(a) {
    a === f && (a = 0);
    this.x *= a;
    this.y *= a;
    this.t *= a
  }
})();
(function() {
  var a = P.a.f.Xa, g = P.a.f.Ze, e = P.a.f.Md, d = P.a.f.g, c = P.a.$, b = P.i.yj, h = P.i.ro, i = P.i.Pg, j = P.i.H.Yg, k = P.c.sa, m = P.c.Pe, l = P.c.Lf, s = P.c.Dj, n = P.c.ai, x = P.c.Re, w = P.c.Gj, z = P.c.Ij, C = P.c.Rg, v = P.c.Mf, I = P.c.Ue, L = P.c.Rf, M = P.c.D.Mg;
  k.sa = function() {
    this.n = new e;
    this.e = new g;
    this.m = new d;
    this.mf = new d
  };
  k.prototype.xg = function(a) {
    if(this.zb.dg == !0) {
      return p
    }
    var c = new C;
    c.Rb(this, this.n, a);
    this.lf & k.ri && c.yg(this.zb.Fb.jf, this.n);
    c.L = this.Bd;
    this.Bd = c;
    ++this.rm;
    c.M = this;
    c.Ci > 0 && this.Hn();
    this.zb.qk = !0;
    return c
  };
  k.prototype.Un = function(a, c) {
    c === f && (c = 0);
    var b;
    if(this.zb.dg != !0) {
      this.n.h.s(c);
      this.n.position.p(a);
      b = this.n.h;
      var d = this.e.v;
      this.e.k.x = b.b.x * d.x + b.d.x * d.y;
      this.e.k.y = b.b.y * d.x + b.d.y * d.y;
      this.e.k.x += this.n.position.x;
      this.e.k.y += this.n.position.y;
      this.e.vb.p(this.e.k);
      this.e.Qc = this.e.z = c;
      d = this.zb.Fb.jf;
      for(b = this.Bd;b;b = b.L) {
        b.sl(d, this.n, this.n)
      }
      this.zb.Fb.Ph()
    }
  };
  k.prototype.Tb = u("n");
  k.prototype.Jd = function() {
    return this.e.z
  };
  k.prototype.Ln = function() {
    var a = U.G.xb().rc + Math.PI / 2;
    a === f && (a = 0);
    this.Un(this.n.position, a)
  };
  k.prototype.pj = function(a) {
    this.ca != k.vc && this.m.p(a)
  };
  k.prototype.He = function(a, c) {
    this.ca == k.Eb && (this.gb == !1 && this.nc(!0), this.mf.x += a.x, this.mf.y += a.y, this.Dh += (c.x - this.e.k.x) * a.y - (c.y - this.e.k.y) * a.x)
  };
  k.prototype.Xm = function(a) {
    a === f && (a = 0);
    this.ca == k.Eb && (this.gb == !1 && this.nc(!0), this.Dh += a)
  };
  k.prototype.Lh = function(a, c) {
    this.ca == k.Eb && (this.gb == !1 && this.nc(!0), this.m.x += this.r * a.x, this.m.y += this.r * a.y, this.w += this.C * ((c.x - this.e.k.x) * a.y - (c.y - this.e.k.y) * a.x))
  };
  k.prototype.el = function(a) {
    a.Hd = this.A;
    a.If = this.zd;
    a.hd.p(this.e.v)
  };
  k.prototype.Hn = function() {
    this.C = this.zd = this.r = this.A = 0;
    this.e.v.V();
    if(!(this.ca == k.vc || this.ca == k.Gl)) {
      for(var b = d.An(), e = this.Bd;e;e = e.L) {
        if(e.Ci != 0) {
          var g = e.el();
          this.A += g.Hd;
          b.x += g.hd.x * g.Hd;
          b.y += g.hd.y * g.Hd;
          this.zd += g.If
        }
      }
      this.A > 0 ? (this.r = 1 / this.A, b.x *= this.r, b.y *= this.r) : this.r = this.A = 1;
      this.zd > 0 && (this.lf & k.Tl) == 0 ? (this.zd -= this.A * (b.x * b.x + b.y * b.y), this.zd *= this.Cp, c.Ra(this.zd > 0), this.C = 1 / this.zd) : this.C = this.zd = 0;
      e = this.e.k.mb();
      this.e.v.p(b);
      this.e.vb.p(a.Oa(this.n, this.e.v));
      this.e.k.p(this.e.vb);
      this.m.x += this.w * -(this.e.k.y - e.y);
      this.m.y += this.w * +(this.e.k.x - e.x)
    }
  };
  k.prototype.hb = function(a) {
    var c = this.n.h, a = new d(c.b.x * a.x + c.d.x * a.y, c.b.y * a.x + c.d.y * a.y);
    a.x += this.n.position.x;
    a.y += this.n.position.y;
    return a
  };
  k.prototype.cj = function(c) {
    return a.ub(this.n.h, c)
  };
  k.prototype.mc = function(c) {
    return a.Bn(this.n, c)
  };
  k.prototype.aj = function(c) {
    return a.ge(this.n.h, c)
  };
  k.prototype.tn = function(a) {
    return new d(this.m.x - this.w * (a.y - this.e.k.y), this.m.y + this.w * (a.x - this.e.k.x))
  };
  k.prototype.la = u("ca");
  k.prototype.Th = function() {
    return(this.lf & k.Sj) == k.Sj
  };
  k.prototype.nc = function(a) {
    this.gb = a;
    this.Gi = 0;
    if(!a) {
      this.m.V(), this.w = 0, this.mf.V(), this.Dh = 0
    }
  };
  k.prototype.Kd = function() {
    return(this.lf & k.ri) == k.ri
  };
  k.prototype.Ie = u("ig");
  k.prototype.sa = function(a, c) {
    this.lf = 0;
    a.Jo && (this.lf |= k.Sj);
    a.Zf && (this.lf |= k.Tl);
    this.ck = a.lo;
    this.gb = a.po;
    a.io && (this.lf |= k.ri);
    this.zb = c;
    this.n.position.p(a.position);
    this.n.h.s(a.rc);
    this.e.v.V();
    this.e.tb = 1;
    this.e.Qc = this.e.z = a.rc;
    var b = this.n.h, d = this.e.v;
    this.e.k.x = b.b.x * d.x + b.d.x * d.y;
    this.e.k.y = b.b.y * d.x + b.d.y * d.y;
    this.e.k.x += this.n.position.x;
    this.e.k.y += this.n.position.y;
    this.e.vb.p(this.e.k);
    this.za = this.Sd = this.Na = p;
    this.fk = 0;
    this.L = this.rb = p;
    this.m.p(a.km);
    this.w = a.oo;
    this.Hp = a.qp;
    this.tp = a.mo;
    this.mf.s(0, 0);
    this.Gi = this.Dh = 0;
    this.ca = a.type;
    this.r = this.ca == k.Eb ? this.A = 1 : this.A = 0;
    this.C = this.zd = 0;
    this.Cp = a.ip;
    this.ig = a.Fe;
    this.Bd = p;
    this.rm = 0
  };
  k.prototype.tl = function() {
    var a = k.hq;
    a.h.s(this.e.Qc);
    var c = a.h, b = this.e.v;
    a.position.x = this.e.vb.x - (c.b.x * b.x + c.d.x * b.y);
    a.position.y = this.e.vb.y - (c.b.y * b.x + c.d.y * b.y);
    b = this.zb.Fb.jf;
    for(c = this.Bd;c;c = c.L) {
      c.sl(b, a, this.n)
    }
  };
  k.prototype.Qa = function() {
    this.n.h.s(this.e.z);
    var a = this.n.h, c = this.e.v;
    this.n.position.x = this.e.k.x - (a.b.x * c.x + a.d.x * c.y);
    this.n.position.y = this.e.k.y - (a.b.y * c.x + a.d.y * c.y)
  };
  k.prototype.fd = function(a) {
    if(this.ca != k.Eb && a.ca != k.Eb) {
      return!1
    }
    for(var c = this.Na;c;c = c.next) {
      if(c.Ja == a && c.Rd.nm == !1) {
        return!1
      }
    }
    return!0
  };
  k.prototype.de = function(a) {
    a === f && (a = 0);
    this.e.de(a);
    this.e.k.p(this.e.vb);
    this.e.z = this.e.Qc;
    this.Qa()
  };
  P.Wa.push(function() {
    P.c.sa.hq = new e;
    P.c.sa.Sj = 8;
    P.c.sa.Tl = 16;
    P.c.sa.ri = 32;
    P.c.sa.vc = 0;
    P.c.sa.Gl = 1;
    P.c.sa.Eb = 2
  });
  m.Pe = function() {
    this.position = new d;
    this.km = new d
  };
  m.prototype.Pe = function() {
    this.Fe = p;
    this.position.s(0, 0);
    this.rc = 0;
    this.km.s(0, 0);
    this.mo = this.qp = this.oo = 0;
    this.po = this.lo = !0;
    this.Jo = this.Zf = !1;
    this.type = k.vc;
    this.io = !0;
    this.ip = 1
  };
  l.Lf = q();
  l.prototype.fd = function(a, c) {
    var b = a.bl(), d = c.bl();
    return b.ef == d.ef && b.ef != 0 ? b.ef > 0 : (b.Eh & d.mh) != 0 && (b.mh & d.Eh) != 0
  };
  l.prototype.Ig = function(a, c) {
    return!a ? !0 : this.fd(a instanceof C ? a : p, c)
  };
  P.Wa.push(function() {
    P.c.Lf.wo = new l
  });
  s.Dj = function() {
    this.aq = new P.ij(c.Dc);
    this.lq = new P.ij(c.Dc)
  };
  n.ai = q();
  n.prototype.vg = q();
  n.prototype.Gf = q();
  n.prototype.Hg = q();
  n.prototype.Gg = q();
  P.Wa.push(function() {
    P.c.ai.xo = new n
  });
  x.Re = q();
  x.prototype.Re = function() {
    this.zb = p;
    this.Xc = 0;
    this.ek = l.wo;
    this.bg = n.xo;
    this.om = new M;
    this.jf = new i
  };
  x.prototype.Wm = function(a, c) {
    var b = a instanceof C ? a : p, d = c instanceof C ? c : p, e = b.M, g = d.M;
    if(e != g && g.fd(e) != !1 && this.ek.fd(b, d) != !1) {
      for(g = g.za;g;) {
        if(g.Ja == e) {
          var t = g.ib.fa, r = g.ib.ha;
          if(t == b && r == d) {
            return
          }
          if(t == d && r == b) {
            return
          }
        }
        g = g.next
      }
      t = this.om.Rb(b, d);
      b = t.fa;
      d = t.ha;
      e = b.M;
      g = d.M;
      t.rb = p;
      t.L = this.zb.za;
      if(this.zb.za != p) {
        this.zb.za.rb = t
      }
      this.zb.za = t;
      t.Hb.ib = t;
      t.Hb.Ja = g;
      t.Hb.La = p;
      t.Hb.next = e.za;
      if(e.za != p) {
        e.za.La = t.Hb
      }
      e.za = t.Hb;
      t.Ib.ib = t;
      t.Ib.Ja = e;
      t.Ib.La = p;
      t.Ib.next = g.za;
      if(g.za != p) {
        g.za.La = t.Ib
      }
      g.za = t.Ib;
      ++this.zb.Xc
    }
  };
  x.prototype.Ph = function() {
    this.jf.bo(P.ap(this, this.Wm))
  };
  x.prototype.nb = function(a) {
    var c = a.fa.M, b = a.ha.M;
    a.Af && this.bg.Gf(a);
    if(a.rb) {
      a.rb.L = a.L
    }
    if(a.L) {
      a.L.rb = a.rb
    }
    if(a == this.zb.za) {
      this.zb.za = a.L
    }
    if(a.Hb.La) {
      a.Hb.La.next = a.Hb.next
    }
    if(a.Hb.next) {
      a.Hb.next.La = a.Hb.La
    }
    if(a.Hb == c.za) {
      c.za = a.Hb.next
    }
    if(a.Ib.La) {
      a.Ib.La.next = a.Ib.next
    }
    if(a.Ib.next) {
      a.Ib.next.La = a.Ib.La
    }
    if(a.Ib == b.za) {
      b.za = a.Ib.next
    }
    this.om.nb(a);
    --this.Xc
  };
  x.prototype.$m = function() {
    for(var a = this.zb.za;a;) {
      var c = a.fa, b = a.ha, d = c.M, e = b.M;
      if(d.gb == !1 && e.gb == !1) {
        a = a.L
      }else {
        if(a.Xj) {
          if(e.fd(d) == !1) {
            c = a;
            a = c.L;
            this.nb(c);
            continue
          }
          if(this.ek.fd(c, b) == !1) {
            c = a;
            a = c.L;
            this.nb(c);
            continue
          }
          a.Ym()
        }
        this.jf.ie(c.ye, b.ye) == !1 ? (c = a, a = c.L, this.nb(c)) : (a.vl(this.bg), a = a.L)
      }
    }
  };
  P.Wa.push(function() {
    P.c.Re.qr = new h
  });
  w.Gj = q();
  z.Ij = function() {
    this.mh = 1;
    this.Eh = 65535;
    this.ef = 0
  };
  z.prototype.mb = function() {
    var a = new z;
    a.mh = this.mh;
    a.Eh = this.Eh;
    a.ef = this.ef;
    return a
  };
  C.Rg = function() {
    this.qm = new z
  };
  C.prototype.la = function() {
    return this.Ga.la()
  };
  C.prototype.vd = u("Ep");
  C.prototype.bl = function() {
    return this.qm.mb()
  };
  C.prototype.Ie = u("ig");
  C.prototype.el = function(a) {
    a === f && (a = p);
    a == p && (a = new j);
    this.Ga.wg(a, this.Ci);
    return a
  };
  C.prototype.Rg = function() {
    this.te = new b;
    this.Ga = this.L = this.M = this.ig = p;
    this.rk = this.ik = this.Ci = 0
  };
  C.prototype.Rb = function(a, c, b) {
    this.ig = b.Fe;
    this.ik = b.Hc;
    this.rk = b.ae;
    this.M = a;
    this.L = p;
    this.qm = b.filter.mb();
    this.Ep = b.yi;
    this.Ga = b.shape.mb();
    this.Ci = b.bf
  };
  C.prototype.nb = function() {
    this.Ga = p
  };
  C.prototype.yg = function(a, c) {
    this.Ga.Df(this.te, c);
    this.ye = a.yg(this.te, this)
  };
  C.prototype.Ag = function(a) {
    if(this.ye != p) {
      a.Ag(this.ye), this.ye = p
    }
  };
  C.prototype.sl = function(c, d, e) {
    if(this.ye) {
      var g = new b, h = new b;
      this.Ga.Df(g, d);
      this.Ga.Df(h, e);
      this.te.Cf(g, h);
      d = a.Pa(e.position, d.position);
      c.hj(this.ye, this.te, d)
    }
  };
  v.Mf = function() {
    this.filter = new z
  };
  v.prototype.Mf = function() {
    this.Fe = this.shape = p;
    this.Hc = 0.2;
    this.bf = this.ae = 0;
    this.filter.mh = 1;
    this.filter.Eh = 65535;
    this.filter.ef = 0;
    this.yi = !1
  };
  I.Ue = q();
  I.prototype.Ue = function() {
    this.fc = [];
    this.ve = [];
    this.pd = []
  };
  I.prototype.$a = function(a, c, b, d, e) {
    a === f && (a = 0);
    c === f && (c = 0);
    b === f && (b = 0);
    var g = 0;
    this.cr = a;
    this.up = c;
    this.Fp = b;
    this.hc = this.Xc = this.Lb = 0;
    this.um = d;
    this.kf = e;
    for(g = this.fc.length;g < a;g++) {
      this.fc[g] = p
    }
    for(g = this.ve.length;g < c;g++) {
      this.ve[g] = p
    }
    for(g = this.pd.length;g < b;g++) {
      this.pd[g] = p
    }
  };
  I.prototype.Si = function() {
    this.hc = this.Xc = this.Lb = 0
  };
  I.prototype.Me = function(b, d, e) {
    for(var g = 0, h = 0, i, g = 0;g < this.Lb;++g) {
      h = this.fc[g], h.la() == k.Eb && (h.m.x += b.da * (d.x + h.r * h.mf.x), h.m.y += b.da * (d.y + h.r * h.mf.y), h.w += b.da * h.C * h.Dh, h.m.Vb(a.xa(1 - b.da * h.Hp, 0, 1)), h.w *= a.xa(1 - b.da * h.tp, 0, 1))
    }
    this.kf.$a(b, this.ve, this.Xc);
    d = this.kf;
    d.Bc(b);
    for(g = 0;g < this.hc;++g) {
      i = this.pd[g], i.Bc(b)
    }
    for(g = 0;g < b.tg;++g) {
      for(h = 0;h < this.hc;++h) {
        i = this.pd[h], i.pc(b)
      }
      d.pc()
    }
    for(g = 0;g < this.hc;++g) {
      i = this.pd[g], i.Xi()
    }
    d.Xi();
    for(g = 0;g < this.Lb;++g) {
      if(h = this.fc[g], h.la() != k.vc) {
        var t = b.da * h.m.x, r = b.da * h.m.y;
        t * t + r * r > c.Jl && (h.m.dc(), h.m.x *= c.Vf * b.Wc, h.m.y *= c.Vf * b.Wc);
        t = b.da * h.w;
        if(t * t > c.Il) {
          h.w = h.w < 0 ? -c.Uf * b.Wc : c.Uf * b.Wc
        }
        h.e.vb.p(h.e.k);
        h.e.Qc = h.e.z;
        h.e.k.x += b.da * h.m.x;
        h.e.k.y += b.da * h.m.y;
        h.e.z += b.da * h.w;
        h.Qa()
      }
    }
    for(g = 0;g < b.lg;++g) {
      t = d.oc(c.Nj);
      r = !0;
      for(h = 0;h < this.hc;++h) {
        i = this.pd[h], i = i.oc(c.Nj), r = r && i
      }
      if(t && r) {
        break
      }
    }
    this.pl(d.Ad);
    if(e) {
      e = Number.MAX_VALUE;
      d = c.Hl * c.Hl;
      t = c.Fl * c.Fl;
      for(g = 0;g < this.Lb;++g) {
        if(h = this.fc[g], h.la() != k.vc) {
          !h.ck || h.w * h.w > t || a.Bb(h.m, h.m) > d ? e = h.Gi = 0 : (h.Gi += b.da, e = a.Je(e, h.Gi))
        }
      }
      if(e >= c.Ao) {
        for(g = 0;g < this.Lb;++g) {
          h = this.fc[g], h.nc(!1)
        }
      }
    }
  };
  I.prototype.qj = function(a) {
    var b = 0, d = 0;
    this.kf.$a(a, this.ve, this.Xc);
    for(var e = this.kf, b = 0;b < this.hc;++b) {
      this.pd[b].Bc(a)
    }
    for(b = 0;b < a.tg;++b) {
      e.pc();
      for(d = 0;d < this.hc;++d) {
        this.pd[d].pc(a)
      }
    }
    for(b = 0;b < this.Lb;++b) {
      if(d = this.fc[b], d.la() != k.vc) {
        var g = a.da * d.m.x, h = a.da * d.m.y;
        g * g + h * h > c.Jl && (d.m.dc(), d.m.x *= c.Vf * a.Wc, d.m.y *= c.Vf * a.Wc);
        g = a.da * d.w;
        if(g * g > c.Il) {
          d.w = d.w < 0 ? -c.Uf * a.Wc : c.Uf * a.Wc
        }
        d.e.vb.p(d.e.k);
        d.e.Qc = d.e.z;
        d.e.k.x += a.da * d.m.x;
        d.e.k.y += a.da * d.m.y;
        d.e.z += a.da * d.w;
        d.Qa()
      }
    }
    for(b = 0;b < a.lg;++b) {
      g = e.oc(0.75);
      h = !0;
      for(d = 0;d < this.hc;++d) {
        var t = this.pd[d].oc(c.Nj), h = h && t
      }
      if(g && h) {
        break
      }
    }
    this.pl(e.Ad)
  };
  I.prototype.pl = function(a) {
    if(this.um != p) {
      for(var c = 0;c < this.Xc;++c) {
        for(var b = this.ve[c], d = a[c], e = 0;e < d.Kc;++e) {
          I.Hk.aq[e] = d.Pb[e].sb, I.Hk.lq[e] = d.Pb[e].be
        }
        this.um.Gg(b, I.Hk)
      }
    }
  };
  I.prototype.Ri = function(a) {
    a.er = this.Lb;
    this.fc[this.Lb++] = a
  };
  I.prototype.Pk = function(a) {
    this.ve[this.Xc++] = a
  };
  I.prototype.Qk = function(a) {
    this.pd[this.hc++] = a
  };
  P.Wa.push(function() {
    P.c.Ue.Hk = new s
  });
  L.Rf = q();
  L.prototype.s = function(a) {
    this.da = a.da;
    this.Wc = a.Wc;
    this.lg = a.lg;
    this.tg = a.tg;
    this.bd = a.bd
  }
})();
(function() {
  var a = P.i.H.Cc, g = P.i.H.ec, e = P.i.H.O, d = P.c.D.Lg, c = P.c.D.Ej, b = P.c.D.me, h = P.c.D.Qg, i = P.c.D.ah, j = P.c.D.bh, k = P.c.D.dh, m = P.c.D.eh, l = P.c.D.We, s = P.c.Rf, n = P.a.$, x = P.a.f.Xa, w = P.a.f.g, z = P.i.Wb, C = P.i.Qe, v = P.i.pb, I = P.i.gd;
  P.c.D.bi.bi = q();
  c.Ej = function() {
    this.position = new w;
    this.kb = new w;
    this.id = new C
  };
  b.me = function() {
    this.Np = new s;
    this.Ad = []
  };
  b.prototype.me = q();
  b.prototype.$a = function(a, c, e) {
    e === f && (e = 0);
    var g;
    this.Np.s(a);
    a = 0;
    for(this.uh = e;this.Ad.length < this.uh;) {
      this.Ad[this.Ad.length] = new d
    }
    for(a = 0;a < e;++a) {
      g = c[a];
      var h = g.fa, i = g.ha, j = h.Ga.ba, l = i.Ga.ba, t = h.M, r = i.M, y = g.xc, G = n.to(h.ik, i.ik), k = n.uo(h.rk, i.rk), S = t.m.x, H = t.m.y, E = r.m.x, N = r.m.y, V = t.w, s = r.w;
      n.Ra(y.Za > 0);
      b.yf.$a(y, t.n, j, r.n, l);
      i = b.yf.W.x;
      g = b.yf.W.y;
      h = this.Ad[a];
      h.ma = t;
      h.qa = r;
      h.Pp = y;
      h.kb.x = i;
      h.kb.y = g;
      h.Kc = y.Za;
      h.Hc = G;
      h.ae = k;
      h.zi.x = y.yb.x;
      h.zi.y = y.yb.y;
      h.yd.x = y.ia.x;
      h.yd.y = y.ia.y;
      h.Ck = j + l;
      h.type = y.ca;
      for(j = 0;j < h.Kc;++j) {
        G = y.aa[j];
        l = h.Pb[j];
        l.sb = G.pf;
        l.be = G.tf;
        l.yd.p(G.ia);
        var G = l.oa.x = b.yf.aa[j].x - t.e.k.x, k = l.oa.y = b.yf.aa[j].y - t.e.k.y, m = l.pa.x = b.yf.aa[j].x - r.e.k.x, x = l.pa.y = b.yf.aa[j].y - r.e.k.y, A = G * g - k * i, w = m * g - x * i;
        A *= A;
        w *= w;
        l.kg = 1 / (t.r + r.r + t.C * A + r.C * w);
        var v = t.A * t.r + r.A * r.r;
        v += t.A * t.C * A + r.A * r.C * w;
        l.Xo = 1 / v;
        w = g;
        v = -i;
        A = G * v - k * w;
        w = m * v - x * w;
        A *= A;
        w *= w;
        l.mq = 1 / (t.r + r.r + t.C * A + r.C * w);
        l.Qi = 0;
        G = h.kb.x * (E + -s * x - S - -V * k) + h.kb.y * (N + s * m - H - V * G);
        G < -n.Eo && (l.Qi += -h.ae * G)
      }
      if(h.Kc == 2) {
        N = h.Pb[0], E = h.Pb[1], y = t.r, t = t.C, S = r.r, r = r.C, H = N.oa.x * g - N.oa.y * i, N = N.pa.x * g - N.pa.y * i, V = E.oa.x * g - E.oa.y * i, E = E.pa.x * g - E.pa.y * i, i = y + S + t * H * H + r * N * N, g = y + S + t * V * V + r * E * E, r = y + S + t * H * V + r * N * E, i * i < 100 * (i * g - r * r) ? (h.Kb.b.s(i, r), h.Kb.d.s(r, g), h.Kb.$i(h.kg)) : h.Kc = 1
      }
    }
  };
  b.prototype.Bc = function(a) {
    for(var c = 0;c < this.uh;++c) {
      var b = this.Ad[c], d = b.ma, e = b.qa, g = d.r, h = d.C, i = e.r, t = e.C, r = b.kb.x, y = b.kb.y, G = y, n = -r, j = 0, H = 0;
      if(a.bd) {
        H = b.Kc;
        for(j = 0;j < H;++j) {
          var E = b.Pb[j];
          E.sb *= a.Ya;
          E.be *= a.Ya;
          var N = E.sb * r + E.be * G, l = E.sb * y + E.be * n;
          d.w -= h * (E.oa.x * l - E.oa.y * N);
          d.m.x -= g * N;
          d.m.y -= g * l;
          e.w += t * (E.pa.x * l - E.pa.y * N);
          e.m.x += i * N;
          e.m.y += i * l
        }
      }else {
        H = b.Kc;
        for(j = 0;j < H;++j) {
          d = b.Pb[j], d.sb = 0, d.be = 0
        }
      }
    }
  };
  b.prototype.pc = function() {
    for(var a = 0, c, b = 0, d = 0, e = 0, g = d = d = b = b = 0, h = b = b = 0, i = b = e = 0, t = 0, r, y = 0;y < this.uh;++y) {
      var e = this.Ad[y], G = e.ma, n = e.qa, j = G.w, H = n.w, E = G.m, l = n.m, k = G.r, s = G.C, m = n.r, w = n.C, i = e.kb.x, A = t = e.kb.y;
      r = -i;
      h = e.Hc;
      for(a = 0;a < e.Kc;a++) {
        c = e.Pb[a], b = l.x - H * c.pa.y - E.x + j * c.oa.y, d = l.y + H * c.pa.x - E.y - j * c.oa.x, b = b * A + d * r, b = c.mq * -b, d = h * c.sb, d = x.xa(c.be + b, -d, d), b = d - c.be, g = b * A, b *= r, E.x -= k * g, E.y -= k * b, j -= s * (c.oa.x * b - c.oa.y * g), l.x += m * g, l.y += m * b, H += w * (c.pa.x * b - c.pa.y * g), c.be = d
      }
      if(e.Kc == 1) {
        c = e.Pb[0], b = l.x + -H * c.pa.y - E.x - -j * c.oa.y, d = l.y + H * c.pa.x - E.y - j * c.oa.x, e = b * i + d * t, b = -c.kg * (e - c.Qi), d = c.sb + b, d = d > 0 ? d : 0, b = d - c.sb, g = b * i, b *= t, E.x -= k * g, E.y -= k * b, j -= s * (c.oa.x * b - c.oa.y * g), l.x += m * g, l.y += m * b, H += w * (c.pa.x * b - c.pa.y * g), c.sb = d
      }else {
        c = e.Pb[0];
        var a = e.Pb[1], b = c.sb, h = a.sb, v = (l.x - H * c.pa.y - E.x + j * c.oa.y) * i + (l.y + H * c.pa.x - E.y - j * c.oa.x) * t, z = (l.x - H * a.pa.y - E.x + j * a.oa.y) * i + (l.y + H * a.pa.x - E.y - j * a.oa.x) * t, d = v - c.Qi, g = z - a.Qi;
        r = e.Kb;
        d -= r.b.x * b + r.d.x * h;
        for(g -= r.b.y * b + r.d.y * h;;) {
          r = e.kg;
          A = -(r.b.x * d + r.d.x * g);
          r = -(r.b.y * d + r.d.y * g);
          if(A >= 0 && r >= 0) {
            b = A - b;
            h = r - h;
            e = b * i;
            b *= t;
            i *= h;
            t *= h;
            E.x -= k * (e + i);
            E.y -= k * (b + t);
            j -= s * (c.oa.x * b - c.oa.y * e + a.oa.x * t - a.oa.y * i);
            l.x += m * (e + i);
            l.y += m * (b + t);
            H += w * (c.pa.x * b - c.pa.y * e + a.pa.x * t - a.pa.y * i);
            c.sb = A;
            a.sb = r;
            break
          }
          A = -c.kg * d;
          r = 0;
          z = e.Kb.b.y * A + g;
          if(A >= 0 && z >= 0) {
            b = A - b;
            h = r - h;
            e = b * i;
            b *= t;
            i *= h;
            t *= h;
            E.x -= k * (e + i);
            E.y -= k * (b + t);
            j -= s * (c.oa.x * b - c.oa.y * e + a.oa.x * t - a.oa.y * i);
            l.x += m * (e + i);
            l.y += m * (b + t);
            H += w * (c.pa.x * b - c.pa.y * e + a.pa.x * t - a.pa.y * i);
            c.sb = A;
            a.sb = r;
            break
          }
          A = 0;
          r = -a.kg * g;
          v = e.Kb.d.x * r + d;
          if(r >= 0 && v >= 0) {
            b = A - b;
            h = r - h;
            e = b * i;
            b *= t;
            i *= h;
            t *= h;
            E.x -= k * (e + i);
            E.y -= k * (b + t);
            j -= s * (c.oa.x * b - c.oa.y * e + a.oa.x * t - a.oa.y * i);
            l.x += m * (e + i);
            l.y += m * (b + t);
            H += w * (c.pa.x * b - c.pa.y * e + a.pa.x * t - a.pa.y * i);
            c.sb = A;
            a.sb = r;
            break
          }
          r = A = 0;
          v = d;
          z = g;
          if(v >= 0 && z >= 0) {
            b = A - b;
            h = r - h;
            e = b * i;
            b *= t;
            i *= h;
            t *= h;
            E.x -= k * (e + i);
            E.y -= k * (b + t);
            j -= s * (c.oa.x * b - c.oa.y * e + a.oa.x * t - a.oa.y * i);
            l.x += m * (e + i);
            l.y += m * (b + t);
            H += w * (c.pa.x * b - c.pa.y * e + a.pa.x * t - a.pa.y * i);
            c.sb = A;
            a.sb = r;
            break
          }
          break
        }
      }
      G.w = j;
      n.w = H
    }
  };
  b.prototype.Xi = function() {
    for(var a = 0;a < this.uh;++a) {
      for(var c = this.Ad[a], b = c.Pp, d = 0;d < c.Kc;++d) {
        var e = b.aa[d], g = c.Pb[d];
        e.pf = g.sb;
        e.tf = g.be
      }
    }
  };
  b.prototype.oc = function(a) {
    a === f && (a = 0);
    for(var c = 0, d = 0;d < this.uh;d++) {
      var e = this.Ad[d], g = e.ma, h = e.qa, i = g.A * g.r, j = g.A * g.C, t = h.A * h.r, r = h.A * h.C;
      b.Ki.$a(e);
      for(var y = b.Ki.W, G = 0;G < e.Kc;G++) {
        var l = e.Pb[G], k = b.Ki.aa[G], H = b.Ki.Fi[G], E = k.x - g.e.k.x, N = k.y - g.e.k.y, s = k.x - h.e.k.x, k = k.y - h.e.k.y, c = c < H ? c : H, H = -l.Xo * x.xa(a * (H + n.ta), -n.uc, 0), l = H * y.x;
        H *= y.y;
        g.e.k.x -= i * l;
        g.e.k.y -= i * H;
        g.e.z -= j * (E * H - N * l);
        g.Qa();
        h.e.k.x += t * l;
        h.e.k.y += t * H;
        h.e.z += r * (s * H - k * l);
        h.Qa()
      }
    }
    return c > -1.5 * n.ta
  };
  P.Wa.push(function() {
    P.c.D.me.yf = new I;
    P.c.D.me.Ki = new l
  });
  P.ya(h, P.c.D.Sa);
  h.prototype.I = P.c.D.Sa.prototype;
  h.Qg = function() {
    P.c.D.Sa.apply(this, arguments)
  };
  h.Rb = function() {
    return new h
  };
  h.nb = q();
  h.prototype.ob = function(a, c) {
    this.I.ob.call(this, a, c)
  };
  h.prototype.cd = q();
  P.ya(i, P.c.D.Sa);
  i.prototype.I = P.c.D.Sa.prototype;
  i.ah = function() {
    P.c.D.Sa.apply(this, arguments)
  };
  i.prototype.ah = function() {
    this.I.Sa.call(this)
  };
  i.prototype.cd = q();
  P.ya(j, P.c.D.Sa);
  j.prototype.I = P.c.D.Sa.prototype;
  j.bh = function() {
    P.c.D.Sa.apply(this, arguments)
  };
  j.Rb = function() {
    return new j
  };
  j.nb = q();
  j.prototype.ob = function(a, c) {
    this.I.ob.call(this, a, c);
    n.Ra(a.la() == e.Pd);
    n.Ra(c.la() == e.qe)
  };
  j.prototype.cd = function() {
    z.bn(this.xc, this.fa.Ga instanceof g ? this.fa.Ga : p, this.fa.M.n, this.ha.Ga instanceof a ? this.ha.Ga : p, this.ha.M.n)
  };
  P.ya(k, P.c.D.Sa);
  k.prototype.I = P.c.D.Sa.prototype;
  k.dh = function() {
    P.c.D.Sa.apply(this, arguments)
  };
  k.Rb = function() {
    return new k
  };
  k.nb = q();
  k.prototype.ob = function(a, c) {
    this.I.ob.call(this, a, c);
    n.Ra(a.la() == e.Pd);
    n.Ra(c.la() == e.oh)
  };
  k.prototype.cd = q();
  P.ya(m, P.c.D.Sa);
  m.prototype.I = P.c.D.Sa.prototype;
  m.eh = function() {
    P.c.D.Sa.apply(this, arguments)
  };
  m.Rb = function() {
    return new m
  };
  m.nb = q();
  m.prototype.ob = function(a, c) {
    this.I.ob.call(this, a, c)
  };
  m.prototype.cd = function() {
    z.cn(this.xc, this.fa.Ga instanceof g ? this.fa.Ga : p, this.fa.M.n, this.ha.Ga instanceof g ? this.ha.Ga : p, this.ha.M.n)
  };
  l.We = q();
  l.prototype.We = function() {
    this.W = new w;
    this.Fi = new P.ij(n.Dc);
    this.aa = Array(n.Dc);
    for(var a = 0;a < n.Dc;a++) {
      this.aa[a] = new w
    }
  };
  l.prototype.$a = function(a) {
    n.Ra(a.Kc > 0);
    var c = 0, b = 0, d = 0, e = 0, g = 0;
    switch(a.type) {
      case v.Tj:
        var h = a.ma.n.h, d = a.yd, c = a.ma.n.position.x + (h.b.x * d.x + h.d.x * d.y), b = a.ma.n.position.y + (h.b.y * d.x + h.d.y * d.y), h = a.qa.n.h, d = a.Pb[0].yd, e = a.qa.n.position.x + (h.b.x * d.x + h.d.x * d.y), h = a.qa.n.position.y + (h.b.y * d.x + h.d.y * d.y), d = e - c, g = h - b, i = d * d + g * g;
        i > P.fj ? (i = Math.sqrt(i), this.W.x = d / i, this.W.y = g / i) : (this.W.x = 1, this.W.y = 0);
        this.aa[0].x = 0.5 * (c + e);
        this.aa[0].y = 0.5 * (b + h);
        this.Fi[0] = d * this.W.x + g * this.W.y - a.Ck;
        break;
      case v.kd:
        h = a.ma.n.h;
        d = a.zi;
        this.W.x = h.b.x * d.x + h.d.x * d.y;
        this.W.y = h.b.y * d.x + h.d.y * d.y;
        h = a.ma.n.h;
        d = a.yd;
        e = a.ma.n.position.x + (h.b.x * d.x + h.d.x * d.y);
        g = a.ma.n.position.y + (h.b.y * d.x + h.d.y * d.y);
        h = a.qa.n.h;
        for(c = 0;c < a.Kc;++c) {
          d = a.Pb[c].yd, b = a.qa.n.position.x + (h.b.x * d.x + h.d.x * d.y), d = a.qa.n.position.y + (h.b.y * d.x + h.d.y * d.y), this.Fi[c] = (b - e) * this.W.x + (d - g) * this.W.y - a.Ck, this.aa[c].x = b, this.aa[c].y = d
        }
        break;
      case v.cf:
        h = a.qa.n.h;
        d = a.zi;
        this.W.x = h.b.x * d.x + h.d.x * d.y;
        this.W.y = h.b.y * d.x + h.d.y * d.y;
        h = a.qa.n.h;
        d = a.yd;
        e = a.qa.n.position.x + (h.b.x * d.x + h.d.x * d.y);
        g = a.qa.n.position.y + (h.b.y * d.x + h.d.y * d.y);
        h = a.ma.n.h;
        for(c = 0;c < a.Kc;++c) {
          d = a.Pb[c].yd, b = a.ma.n.position.x + (h.b.x * d.x + h.d.x * d.y), d = a.ma.n.position.y + (h.b.y * d.x + h.d.y * d.y), this.Fi[c] = (b - e) * this.W.x + (d - g) * this.W.y - a.Ck, this.aa[c].s(b, d)
        }
        this.W.x *= -1;
        this.W.y *= -1
    }
  };
  P.Wa.push(function() {
    P.c.D.We.Rq = new w;
    P.c.D.We.Sq = new w
  })
})();
(function() {
  var a = P.a.f.wd, g = P.a.f.Xa, e = P.a.f.g, d = P.a.sc, c = P.c.Ca.zj, b = P.c.Ca.Bj, h = P.c.Ca.Cj, i = P.c.Ca.ab, j = P.c.Ca.Fj, k = P.c.Ca.Jj, m = P.c.Ca.Mj;
  P.ya(c, P.c.Ca.ab);
  c.prototype.I = P.c.Ca.ab.prototype;
  c.zj = function() {
    P.c.Ca.ab.ab.apply(this, arguments);
    this.kb = new e(0, -1);
    this.bf = this.Zc = 0;
    this.Vm = new e(0, 0);
    this.rp = 2;
    this.no = 1;
    this.wr = !1;
    this.pq = !0;
    this.em = p
  };
  c.prototype.he = function() {
    if(this.Da) {
      if(this.pq) {
        this.em = this.zb.sm.mb()
      }
      for(var a = this.Da;a;a = a.lc) {
        var c = a.body;
        if(c.gb != !1) {
          for(var b = new e, d = new e, g = 0, h = 0, i = c.Bd;i;i = i.L) {
            var j = new e, k = i.Ga.Nh(this.kb, this.Zc, c.Tb(), j);
            g += k;
            b.x += k * j.x;
            b.y += k * j.y;
            var m = 0, m = 1;
            h += k * m;
            d.x += k * j.x * m;
            d.y += k * j.y * m
          }
          b.x /= g;
          b.y /= g;
          d.x /= h;
          d.y /= h;
          g < Number.MIN_VALUE || (h = this.em.fe(), h.Vb(this.bf * g), c.He(h, d), d = c.tn(b), d.rl(this.Vm), d.Vb(-this.rp * g), c.He(d, b), c.Xm(-c.zd / c.A * g * c.w * this.no))
        }
      }
    }
  };
  c.prototype.Yk = function(a) {
    var c = new e, b = new e;
    c.x = this.kb.x * this.Zc + this.kb.y * 1E3;
    c.y = this.kb.y * this.Zc - this.kb.x * 1E3;
    b.x = this.kb.x * this.Zc - this.kb.y * 1E3;
    b.y = this.kb.y * this.Zc + this.kb.x * 1E3;
    var g = new d(0, 0, 1);
    a.ud(c, b, g)
  };
  P.ya(b, P.c.Ca.ab);
  b.prototype.I = P.c.Ca.ab.prototype;
  b.Bj = function() {
    P.c.Ca.ab.ab.apply(this, arguments);
    this.Nk = new e(0, 0)
  };
  b.prototype.he = function(a) {
    for(var a = new e(this.Nk.x * a.da, this.Nk.y * a.da), c = this.Da;c;c = c.lc) {
      var b = c.body;
      b.gb && b.pj(new e(b.m.x + a.x, b.m.y + a.y))
    }
  };
  P.ya(h, P.c.Ca.ab);
  h.prototype.I = P.c.Ca.ab.prototype;
  h.Cj = function() {
    P.c.Ca.ab.ab.apply(this, arguments);
    this.qn = new e(0, 0)
  };
  h.prototype.he = function() {
    for(var a = this.Da;a;a = a.lc) {
      var c = a.body;
      c.gb && c.He(this.qn, c.e.k)
    }
  };
  i.ab = q();
  i.prototype.he = q();
  i.prototype.Yk = q();
  i.prototype.Ri = function(a) {
    var c = new j;
    c.Ol = this;
    c.body = a;
    c.lc = this.Da;
    c.Gh = p;
    this.Da = c;
    if(c.lc) {
      c.lc.Gh = c
    }
    this.Lb++;
    c.Yd = a.Sd;
    c.Hh = p;
    a.Sd = c;
    if(c.Yd) {
      c.Yd.Hh = c
    }
    a.fk++
  };
  i.prototype.nl = function(a) {
    for(var c = a.Sd;c && c.Ol != this;) {
      c = c.Yd
    }
    if(c.Gh) {
      c.Gh.lc = c.lc
    }
    if(c.lc) {
      c.lc.Gh = c.Gh
    }
    if(c.Yd) {
      c.Yd.Hh = c.Hh
    }
    if(c.Hh) {
      c.Hh.Yd = c.Yd
    }
    if(this.Da == c) {
      this.Da = c.lc
    }
    if(a.Sd == c) {
      a.Sd = c.Yd
    }
    a.fk--;
    this.Lb--
  };
  i.prototype.Si = function() {
    for(;this.Da;) {
      this.nl(this.Da.body)
    }
  };
  j.Fj = q();
  P.ya(k, P.c.Ca.ab);
  k.prototype.I = P.c.Ca.ab.prototype;
  k.Jj = function() {
    P.c.Ca.ab.ab.apply(this, arguments);
    this.al = 1;
    this.np = !0
  };
  k.prototype.he = function() {
    var a = p, c = p, b = p, d = 0, g = p, h = p, i = p, j = 0, k = 0, m = 0, j = p;
    if(this.np) {
      for(a = this.Da;a;a = a.lc) {
        c = a.body;
        b = c.e.k;
        d = c.A;
        for(g = this.Da;g != a;g = g.lc) {
          h = g.body, i = h.e.k, j = i.x - b.x, k = i.y - b.y, m = j * j + k * k, m < Number.MIN_VALUE || (j = new e(j, k), j.Vb(this.al / m / Math.sqrt(m) * d * h.A), c.gb && c.He(j, b), j.Vb(-1), h.gb && h.He(j, i))
        }
      }
    }else {
      for(a = this.Da;a;a = a.lc) {
        c = a.body;
        b = c.e.k;
        d = c.A;
        for(g = this.Da;g != a;g = g.lc) {
          h = g.body, i = h.e.k, j = i.x - b.x, k = i.y - b.y, m = j * j + k * k, m < Number.MIN_VALUE || (j = new e(j, k), j.Vb(this.al / m * d * h.A), c.gb && c.He(j, b), j.Vb(-1), h.gb && h.He(j, i))
        }
      }
    }
  };
  P.ya(m, P.c.Ca.ab);
  m.prototype.I = P.c.Ca.ab.prototype;
  m.Mj = function() {
    P.c.Ca.ab.ab.apply(this, arguments);
    this.Zn = new a;
    this.wk = 0
  };
  m.prototype.he = function(a) {
    a = a.da;
    if(!(a <= Number.MIN_VALUE)) {
      if(a > this.wk && this.wk > 0) {
        a = this.wk
      }
      for(var c = this.Da;c;c = c.lc) {
        var b = c.body;
        if(b.gb) {
          var d = b.cj(g.ub(this.Zn, b.aj(b.m)));
          b.pj(new e(b.m.x + d.x * a, b.m.y + d.y * a))
        }
      }
    }
  }
})();
(function() {
  var a = P.a.$, g = P.a.f.wd, e = P.a.f.Nf, d = P.a.f.Xa, c = P.a.f.g, b = P.a.f.Sf, h = P.c.o.Ng, i = P.c.o.Og, j = P.c.o.Sg, k = P.c.o.Tg, m = P.c.o.Ug, l = P.c.o.Vg, s = P.c.o.Kj, n = P.c.o.F, x = P.c.o.R, w = P.c.o.Lj, z = P.c.o.Wg, C = P.c.o.Xg, v = P.c.o.Zg, I = P.c.o.$g, L = P.c.o.fh, M = P.c.o.gh, o = P.c.o.Of, F = P.c.o.hh, K = P.c.o.Pf, B = P.c.o.Qf, Q = P.c.o.kh, T = P.c.o.Tf;
  P.ya(h, P.c.o.F);
  h.prototype.I = P.c.o.F.prototype;
  h.Ng = function() {
    P.c.o.F.F.apply(this, arguments);
    this.J = new c;
    this.K = new c;
    this.jb = new c
  };
  h.prototype.zc = function() {
    return this.S.hb(this.J)
  };
  h.prototype.Ac = function() {
    return this.N.hb(this.K)
  };
  h.prototype.Ng = function(a) {
    this.I.F.call(this, a);
    this.J.p(a.eb);
    this.K.p(a.fb);
    this.kk = a.length;
    this.wh = a.vi;
    this.gk = a.ni;
    this.mm = this.Mb = this.j = 0
  };
  h.prototype.Bc = function(c) {
    var b, d = 0, e = this.S, g = this.N;
    b = e.n.h;
    var h = this.J.x - e.e.v.x, i = this.J.y - e.e.v.y, d = b.b.x * h + b.d.x * i, i = b.b.y * h + b.d.y * i, h = d;
    b = g.n.h;
    var j = this.K.x - g.e.v.x, k = this.K.y - g.e.v.y, d = b.b.x * j + b.d.x * k, k = b.b.y * j + b.d.y * k, j = d;
    this.jb.x = g.e.k.x + j - e.e.k.x - h;
    this.jb.y = g.e.k.y + k - e.e.k.y - i;
    d = Math.sqrt(this.jb.x * this.jb.x + this.jb.y * this.jb.y);
    d > a.ta ? this.jb.Vb(1 / d) : this.jb.V();
    b = h * this.jb.y - i * this.jb.x;
    var n = j * this.jb.y - k * this.jb.x;
    b = e.r + e.C * b * b + g.r + g.C * n * n;
    this.A = b != 0 ? 1 / b : 0;
    if(this.wh > 0) {
      d -= this.kk;
      var n = 2 * Math.PI * this.wh, l = this.A * n * n;
      this.Mb = c.da * (2 * this.A * this.gk * n + c.da * l);
      this.Mb = this.Mb != 0 ? 1 / this.Mb : 0;
      this.mm = d * c.da * l * this.Mb;
      this.A = b + this.Mb;
      this.A = this.A != 0 ? 1 / this.A : 0
    }
    c.bd ? (this.j *= c.Ya, c = this.j * this.jb.x, b = this.j * this.jb.y, e.m.x -= e.r * c, e.m.y -= e.r * b, e.w -= e.C * (h * b - i * c), g.m.x += g.r * c, g.m.y += g.r * b, g.w += g.C * (j * b - k * c)) : this.j = 0
  };
  h.prototype.pc = function() {
    var a, c = this.S, b = this.N;
    a = c.n.h;
    var d = this.J.x - c.e.v.x, e = this.J.y - c.e.v.y, g = a.b.x * d + a.d.x * e, e = a.b.y * d + a.d.y * e, d = g;
    a = b.n.h;
    var h = this.K.x - b.e.v.x, i = this.K.y - b.e.v.y, g = a.b.x * h + a.d.x * i, i = a.b.y * h + a.d.y * i, h = g, g = -this.A * (this.jb.x * (b.m.x + -b.w * i - (c.m.x + -c.w * e)) + this.jb.y * (b.m.y + b.w * h - (c.m.y + c.w * d)) + this.mm + this.Mb * this.j);
    this.j += g;
    a = g * this.jb.x;
    g *= this.jb.y;
    c.m.x -= c.r * a;
    c.m.y -= c.r * g;
    c.w -= c.C * (d * g - e * a);
    b.m.x += b.r * a;
    b.m.y += b.r * g;
    b.w += b.C * (h * g - i * a)
  };
  h.prototype.oc = function() {
    var c;
    if(this.wh > 0) {
      return!0
    }
    var b = this.S, e = this.N;
    c = b.n.h;
    var g = this.J.x - b.e.v.x, h = this.J.y - b.e.v.y, i = c.b.x * g + c.d.x * h, h = c.b.y * g + c.d.y * h, g = i;
    c = e.n.h;
    var j = this.K.x - e.e.v.x, k = this.K.y - e.e.v.y, i = c.b.x * j + c.d.x * k, k = c.b.y * j + c.d.y * k, j = i, i = e.e.k.x + j - b.e.k.x - g, n = e.e.k.y + k - b.e.k.y - h;
    c = Math.sqrt(i * i + n * n);
    i /= c;
    n /= c;
    c -= this.kk;
    c = d.xa(c, -a.uc, a.uc);
    var l = -this.A * c;
    this.jb.s(i, n);
    i = l * this.jb.x;
    n = l * this.jb.y;
    b.e.k.x -= b.r * i;
    b.e.k.y -= b.r * n;
    b.e.z -= b.C * (g * n - h * i);
    e.e.k.x += e.r * i;
    e.e.k.y += e.r * n;
    e.e.z += e.C * (j * n - k * i);
    b.Qa();
    e.Qa();
    return d.lb(c) < a.ta
  };
  P.ya(i, P.c.o.R);
  i.prototype.I = P.c.o.R.prototype;
  i.Og = function() {
    P.c.o.R.R.apply(this, arguments);
    this.eb = new c;
    this.fb = new c
  };
  i.prototype.Og = function() {
    this.I.R.call(this);
    this.type = n.Uj;
    this.length = 1;
    this.ni = this.vi = 0
  };
  i.prototype.$a = function(a, c, b, d) {
    this.ma = a;
    this.qa = c;
    this.eb.p(this.ma.mc(b));
    this.fb.p(this.qa.mc(d));
    a = d.x - b.x;
    b = d.y - b.y;
    this.length = Math.sqrt(a * a + b * b);
    this.ni = this.vi = 0
  };
  P.ya(j, P.c.o.F);
  j.prototype.I = P.c.o.F.prototype;
  j.Sg = function() {
    P.c.o.F.F.apply(this, arguments);
    this.ic = new c;
    this.jc = new c;
    this.nk = new g;
    this.qd = new c
  };
  j.prototype.zc = function() {
    return this.S.hb(this.ic)
  };
  j.prototype.Ac = function() {
    return this.N.hb(this.jc)
  };
  j.prototype.Sg = function(a) {
    this.I.F.call(this, a);
    this.ic.p(a.eb);
    this.jc.p(a.fb);
    this.nk.V();
    this.th = 0;
    this.qd.V();
    this.ue = 0;
    this.ok = a.uk;
    this.Jp = a.Rp
  };
  j.prototype.Bc = function(a) {
    var c, b = 0, d = this.S, e = this.N;
    c = d.n.h;
    var h = this.ic.x - d.e.v.x, i = this.ic.y - d.e.v.y, b = c.b.x * h + c.d.x * i, i = c.b.y * h + c.d.y * i, h = b;
    c = e.n.h;
    var j = this.jc.x - e.e.v.x, k = this.jc.y - e.e.v.y, b = c.b.x * j + c.d.x * k, k = c.b.y * j + c.d.y * k, j = b;
    c = d.r;
    var b = e.r, n = d.C, l = e.C, m = new g;
    m.b.x = c + b;
    m.d.x = 0;
    m.b.y = 0;
    m.d.y = c + b;
    m.b.x += n * i * i;
    m.d.x += -n * h * i;
    m.b.y += -n * h * i;
    m.d.y += n * h * h;
    m.b.x += l * k * k;
    m.d.x += -l * j * k;
    m.b.y += -l * j * k;
    m.d.y += l * j * j;
    m.$i(this.nk);
    this.th = n + l;
    if(this.th > 0) {
      this.th = 1 / this.th
    }
    a.bd ? (this.qd.x *= a.Ya, this.qd.y *= a.Ya, this.ue *= a.Ya, a = this.qd, d.m.x -= c * a.x, d.m.y -= c * a.y, d.w -= n * (h * a.y - i * a.x + this.ue), e.m.x += b * a.x, e.m.y += b * a.y, e.w += l * (j * a.y - k * a.x + this.ue)) : (this.qd.V(), this.ue = 0)
  };
  j.prototype.pc = function(a) {
    var b, e = 0, g = this.S, h = this.N, i = g.m, j = g.w, k = h.m, n = h.w, l = g.r, m = h.r, s = g.C, o = h.C;
    b = g.n.h;
    var A = this.ic.x - g.e.v.x, x = this.ic.y - g.e.v.y, e = b.b.x * A + b.d.x * x, x = b.b.y * A + b.d.y * x, A = e;
    b = h.n.h;
    var w = this.jc.x - h.e.v.x, v = this.jc.y - h.e.v.y, e = b.b.x * w + b.d.x * v, v = b.b.y * w + b.d.y * v, w = e;
    b = 0;
    var e = -this.th * (n - j), z = this.ue;
    b = a.da * this.Jp;
    this.ue = d.xa(this.ue + e, -b, b);
    e = this.ue - z;
    j -= s * e;
    n += o * e;
    b = d.ub(this.nk, new c(-(k.x - n * v - i.x + j * x), -(k.y + n * w - i.y - j * A)));
    e = this.qd.mb();
    this.qd.ce(b);
    b = a.da * this.ok;
    this.qd.Vh() > b * b && (this.qd.dc(), this.qd.Vb(b));
    b = d.Pa(this.qd, e);
    i.x -= l * b.x;
    i.y -= l * b.y;
    j -= s * (A * b.y - x * b.x);
    k.x += m * b.x;
    k.y += m * b.y;
    n += o * (w * b.y - v * b.x);
    g.w = j;
    h.w = n
  };
  j.prototype.oc = D(!0);
  P.ya(k, P.c.o.R);
  k.prototype.I = P.c.o.R.prototype;
  k.Tg = function() {
    P.c.o.R.R.apply(this, arguments);
    this.eb = new c;
    this.fb = new c
  };
  k.prototype.Tg = function() {
    this.I.R.call(this);
    this.type = n.Ul;
    this.Rp = this.uk = 0
  };
  k.prototype.$a = function(a, c, b) {
    this.ma = a;
    this.qa = c;
    this.eb.p(this.ma.mc(b));
    this.fb.p(this.qa.mc(b))
  };
  P.ya(m, P.c.o.F);
  m.prototype.I = P.c.o.F.prototype;
  m.Ug = function() {
    P.c.o.F.F.apply(this, arguments);
    this.Cd = new c;
    this.Dd = new c;
    this.J = new c;
    this.K = new c;
    this.Ma = new s
  };
  m.prototype.zc = function() {
    return this.S.hb(this.J)
  };
  m.prototype.Ac = function() {
    return this.N.hb(this.K)
  };
  m.prototype.Ug = function(a) {
    this.I.F.call(this, a);
    var c = a.ff.ca, b = a.gf.ca;
    this.fg = this.sf = this.eg = this.rf = p;
    var d = 0, e = 0;
    this.Ap = a.ff.S;
    this.S = a.ff.N;
    c == n.si ? (this.rf = a.ff instanceof K ? a.ff : p, this.Cd.p(this.rf.J), this.J.p(this.rf.K), d = this.rf.Rh()) : (this.eg = a.ff instanceof L ? a.ff : p, this.Cd.p(this.eg.J), this.J.p(this.eg.K), d = this.eg.Dg());
    this.Bp = a.gf.S;
    this.N = a.gf.N;
    b == n.si ? (this.sf = a.gf instanceof K ? a.gf : p, this.Dd.p(this.sf.J), this.K.p(this.sf.K), e = this.sf.Rh()) : (this.fg = a.gf instanceof L ? a.gf : p, this.Dd.p(this.fg.J), this.K.p(this.fg.K), e = this.fg.Dg());
    this.Va = a.wf;
    this.ag = d + this.Va * e;
    this.j = 0
  };
  m.prototype.Bc = function(a) {
    var c = this.Ap, b = this.Bp, d = this.S, e = this.N, g = 0, h = 0, i = 0, j = 0, k = i = 0, n = 0;
    this.Ma.V();
    this.rf ? (this.Ma.Ne = -1, n += d.C) : (c = c.n.h, h = this.eg.kc, g = c.b.x * h.x + c.d.x * h.y, h = c.b.y * h.x + c.d.y * h.y, c = d.n.h, i = this.J.x - d.e.v.x, j = this.J.y - d.e.v.y, k = c.b.x * i + c.d.x * j, j = c.b.y * i + c.d.y * j, i = k * h - j * g, this.Ma.md.s(-g, -h), this.Ma.Ne = -i, n += d.r + d.C * i * i);
    this.sf ? (this.Ma.Oe = -this.Va, n += this.Va * this.Va * e.C) : (c = b.n.h, h = this.fg.kc, g = c.b.x * h.x + c.d.x * h.y, h = c.b.y * h.x + c.d.y * h.y, c = e.n.h, i = this.K.x - e.e.v.x, j = this.K.y - e.e.v.y, k = c.b.x * i + c.d.x * j, j = c.b.y * i + c.d.y * j, i = k * h - j * g, this.Ma.nd.s(-this.Va * g, -this.Va * h), this.Ma.Oe = -this.Va * i, n += this.Va * this.Va * (e.r + e.C * i * i));
    this.A = n > 0 ? 1 / n : 0;
    a.bd ? (d.m.x += d.r * this.j * this.Ma.md.x, d.m.y += d.r * this.j * this.Ma.md.y, d.w += d.C * this.j * this.Ma.Ne, e.m.x += e.r * this.j * this.Ma.nd.x, e.m.y += e.r * this.j * this.Ma.nd.y, e.w += e.C * this.j * this.Ma.Oe) : this.j = 0
  };
  m.prototype.pc = function() {
    var a = this.S, c = this.N, b = -this.A * this.Ma.dn(a.m, a.w, c.m, c.w);
    this.j += b;
    a.m.x += a.r * b * this.Ma.md.x;
    a.m.y += a.r * b * this.Ma.md.y;
    a.w += a.C * b * this.Ma.Ne;
    c.m.x += c.r * b * this.Ma.nd.x;
    c.m.y += c.r * b * this.Ma.nd.y;
    c.w += c.C * b * this.Ma.Oe
  };
  m.prototype.oc = function() {
    var c = this.S, b = this.N, d = 0, e = 0, d = this.rf ? this.rf.Rh() : this.eg.Dg(), e = this.sf ? this.sf.Rh() : this.fg.Dg(), d = -this.A * (this.ag - (d + this.Va * e));
    c.e.k.x += c.r * d * this.Ma.md.x;
    c.e.k.y += c.r * d * this.Ma.md.y;
    c.e.z += c.C * d * this.Ma.Ne;
    b.e.k.x += b.r * d * this.Ma.nd.x;
    b.e.k.y += b.r * d * this.Ma.nd.y;
    b.e.z += b.C * d * this.Ma.Oe;
    c.Qa();
    b.Qa();
    return 0 < a.ta
  };
  P.ya(l, P.c.o.R);
  l.prototype.I = P.c.o.R.prototype;
  l.Vg = function() {
    P.c.o.R.R.apply(this, arguments)
  };
  l.prototype.Vg = function() {
    this.I.R.call(this);
    this.type = n.Vl;
    this.gf = this.ff = p;
    this.wf = 1
  };
  s.Kj = function() {
    this.md = new c;
    this.nd = new c
  };
  s.prototype.V = function() {
    this.md.V();
    this.Ne = 0;
    this.nd.V();
    this.Oe = 0
  };
  s.prototype.s = function(a, c, b, d) {
    c === f && (c = 0);
    d === f && (d = 0);
    this.md.p(a);
    this.Ne = c;
    this.nd.p(b);
    this.Oe = d
  };
  s.prototype.dn = function(a, c, b, d) {
    c === f && (c = 0);
    d === f && (d = 0);
    return this.md.x * a.x + this.md.y * a.y + this.Ne * c + (this.nd.x * b.x + this.nd.y * b.y) + this.Oe * d
  };
  n.F = function() {
    this.$b = new w;
    this.ac = new w;
    this.Ed = new c;
    this.Fd = new c
  };
  n.prototype.la = u("ca");
  n.prototype.zc = D(p);
  n.prototype.Ac = D(p);
  n.prototype.Ie = u("ig");
  n.prototype.Kd = function() {
    return this.S.Kd() && this.N.Kd()
  };
  n.Rb = function(a) {
    var c = p;
    switch(a.type) {
      case n.Uj:
        c = new h(a instanceof i ? a : p);
        break;
      case n.Vj:
        c = new v(a instanceof I ? a : p);
        break;
      case n.Zl:
        c = new L(a instanceof M ? a : p);
        break;
      case n.si:
        c = new K(a instanceof B ? a : p);
        break;
      case n.Wj:
        c = new o(a instanceof F ? a : p);
        break;
      case n.Vl:
        c = new m(a instanceof l ? a : p);
        break;
      case n.Wl:
        c = new z(a instanceof C ? a : p);
        break;
      case n.am:
        c = new Q(a instanceof T ? a : p);
        break;
      case n.Ul:
        c = new j(a instanceof k ? a : p)
    }
    return c
  };
  n.nb = q();
  n.prototype.F = function(c) {
    a.Ra(c.ma != c.qa);
    this.ca = c.type;
    this.L = this.rb = p;
    this.S = c.ma;
    this.N = c.qa;
    this.nm = c.Oj;
    this.ig = c.Fe
  };
  n.prototype.Bc = q();
  n.prototype.pc = q();
  n.prototype.Xi = q();
  n.prototype.oc = D(!1);
  P.Wa.push(function() {
    P.c.o.F.Vo = 0;
    P.c.o.F.si = 1;
    P.c.o.F.Zl = 2;
    P.c.o.F.Uj = 3;
    P.c.o.F.Wj = 4;
    P.c.o.F.Vj = 5;
    P.c.o.F.Vl = 6;
    P.c.o.F.Wl = 7;
    P.c.o.F.am = 8;
    P.c.o.F.Ul = 9;
    P.c.o.F.Xb = 0;
    P.c.o.F.xd = 1;
    P.c.o.F.wb = 2;
    P.c.o.F.re = 3
  });
  x.R = q();
  x.prototype.R = function() {
    this.type = n.Vo;
    this.qa = this.ma = this.Fe = p;
    this.Oj = !1
  };
  w.Lj = q();
  P.ya(z, P.c.o.F);
  z.prototype.I = P.c.o.F.prototype;
  z.Wg = function() {
    P.c.o.F.F.apply(this, arguments);
    this.J = new c;
    this.K = new c;
    this.kc = new c;
    this.Xd = new c;
    this.B = new c;
    this.T = new c;
    this.P = new g;
    this.j = new c
  };
  z.prototype.zc = function() {
    return this.S.hb(this.J)
  };
  z.prototype.Ac = function() {
    return this.N.hb(this.K)
  };
  z.prototype.Dg = function() {
    var a = this.S, c = this.N, b = a.hb(this.J), d = c.hb(this.K), c = d.x - b.x, b = d.y - b.y, a = a.cj(this.kc);
    return a.x * c + a.y * b
  };
  z.prototype.Wg = function(a) {
    this.I.F.call(this, a);
    this.J.p(a.eb);
    this.K.p(a.fb);
    this.kc.p(a.hf);
    this.Xd.x = -this.kc.y;
    this.Xd.y = this.kc.x;
    this.j.V();
    this.wa = this.bc = 0;
    this.Ic = a.bk;
    this.Jc = a.Mk;
    this.pk = a.vk;
    this.zh = a.Fh;
    this.od = a.ph;
    this.xe = a.qh;
    this.ea = n.Xb;
    this.B.V();
    this.T.V()
  };
  z.prototype.Bc = function(c) {
    var b = this.S, e = this.N, g, h = 0;
    this.Ed.p(b.e.v);
    this.Fd.p(e.e.v);
    var i = b.Tb();
    e.Tb();
    g = b.n.h;
    var j = this.J.x - this.Ed.x, k = this.J.y - this.Ed.y, h = g.b.x * j + g.d.x * k, k = g.b.y * j + g.d.y * k, j = h;
    g = e.n.h;
    var l = this.K.x - this.Fd.x, m = this.K.y - this.Fd.y, h = g.b.x * l + g.d.x * m, m = g.b.y * l + g.d.y * m, l = h;
    g = e.e.k.x + l - b.e.k.x - j;
    h = e.e.k.y + m - b.e.k.y - k;
    this.Ta = b.r;
    this.Ua = e.r;
    this.Nb = b.C;
    this.Ob = e.C;
    this.B.p(d.ub(i.h, this.kc));
    this.ua = (g + j) * this.B.y - (h + k) * this.B.x;
    this.va = l * this.B.y - m * this.B.x;
    this.bc = this.Ta + this.Ua + this.Nb * this.ua * this.ua + this.Ob * this.va * this.va;
    this.bc = this.bc > Number.MIN_VALUE ? 1 / this.bc : 0;
    this.T.p(d.ub(i.h, this.Xd));
    this.Aa = (g + j) * this.T.y - (h + k) * this.T.x;
    this.Ba = l * this.T.y - m * this.T.x;
    i = this.Ta;
    j = this.Ua;
    k = this.Nb;
    l = this.Ob;
    this.P.b.x = i + j + k * this.Aa * this.Aa + l * this.Ba * this.Ba;
    this.P.b.y = k * this.Aa * this.ua + l * this.Ba * this.va;
    this.P.d.x = this.P.b.y;
    this.P.d.y = i + j + k * this.ua * this.ua + l * this.va * this.va;
    if(this.od) {
      if(g = this.B.x * g + this.B.y * h, d.lb(this.Jc - this.Ic) < 2 * a.ta) {
        this.ea = n.re
      }else {
        if(g <= this.Ic) {
          if(this.ea != n.xd) {
            this.ea = n.xd, this.j.y = 0
          }
        }else {
          if(g >= this.Jc) {
            if(this.ea != n.wb) {
              this.ea = n.wb, this.j.y = 0
            }
          }else {
            this.ea = n.Xb, this.j.y = 0
          }
        }
      }
    }else {
      this.ea = n.Xb
    }
    if(this.xe == !1) {
      this.wa = 0
    }
    c.bd ? (this.j.x *= c.Ya, this.j.y *= c.Ya, this.wa *= c.Ya, c = this.j.x * this.T.x + (this.wa + this.j.y) * this.B.x, g = this.j.x * this.T.y + (this.wa + this.j.y) * this.B.y, h = this.j.x * this.Aa + (this.wa + this.j.y) * this.ua, i = this.j.x * this.Ba + (this.wa + this.j.y) * this.va, b.m.x -= this.Ta * c, b.m.y -= this.Ta * g, b.w -= this.Nb * h, e.m.x += this.Ua * c, e.m.y += this.Ua * g, e.w += this.Ob * i) : (this.j.V(), this.wa = 0)
  };
  z.prototype.pc = function(a) {
    var b = this.S, e = this.N, g = b.m, h = b.w, i = e.m, j = e.w, k = 0, l = 0, m = 0, s = 0;
    if(this.xe && this.ea != n.re) {
      s = this.bc * (this.zh - (this.B.x * (i.x - g.x) + this.B.y * (i.y - g.y) + this.va * j - this.ua * h)), k = this.wa, l = a.da * this.pk, this.wa = d.xa(this.wa + s, -l, l), s = this.wa - k, k = s * this.B.x, l = s * this.B.y, m = s * this.ua, s *= this.va, g.x -= this.Ta * k, g.y -= this.Ta * l, h -= this.Nb * m, i.x += this.Ua * k, i.y += this.Ua * l, j += this.Ob * s
    }
    l = this.T.x * (i.x - g.x) + this.T.y * (i.y - g.y) + this.Ba * j - this.Aa * h;
    if(this.od && this.ea != n.Xb) {
      m = this.B.x * (i.x - g.x) + this.B.y * (i.y - g.y) + this.va * j - this.ua * h;
      k = this.j.mb();
      a = this.P.Me(new c, -l, -m);
      this.j.ce(a);
      if(this.ea == n.xd) {
        this.j.y = d.Ub(this.j.y, 0)
      }else {
        if(this.ea == n.wb) {
          this.j.y = d.Je(this.j.y, 0)
        }
      }
      l = -l - (this.j.y - k.y) * this.P.d.x;
      m = 0;
      m = this.P.b.x != 0 ? l / this.P.b.x + k.x : k.x;
      this.j.x = m;
      a.x = this.j.x - k.x;
      a.y = this.j.y - k.y;
      k = a.x * this.T.x + a.y * this.B.x;
      l = a.x * this.T.y + a.y * this.B.y;
      m = a.x * this.Aa + a.y * this.ua;
      s = a.x * this.Ba + a.y * this.va
    }else {
      a = 0, a = this.P.b.x != 0 ? -l / this.P.b.x : 0, this.j.x += a, k = a * this.T.x, l = a * this.T.y, m = a * this.Aa, s = a * this.Ba
    }
    g.x -= this.Ta * k;
    g.y -= this.Ta * l;
    h -= this.Nb * m;
    i.x += this.Ua * k;
    i.y += this.Ua * l;
    j += this.Ob * s;
    b.m.p(g);
    b.w = h;
    e.m.p(i);
    e.w = j
  };
  z.prototype.oc = function() {
    var b = this.S, e = this.N, h = b.e.k, i = b.e.z, j = e.e.k, k = e.e.z, n, l = 0, m = 0, s = 0, o = 0, x = n = 0, w = 0, m = !1, A = 0, v = g.Qh(i), s = g.Qh(k);
    n = v;
    var w = this.J.x - this.Ed.x, z = this.J.y - this.Ed.y, l = n.b.x * w + n.d.x * z, z = n.b.y * w + n.d.y * z, w = l;
    n = s;
    s = this.K.x - this.Fd.x;
    o = this.K.y - this.Fd.y;
    l = n.b.x * s + n.d.x * o;
    o = n.b.y * s + n.d.y * o;
    s = l;
    n = j.x + s - h.x - w;
    l = j.y + o - h.y - z;
    if(this.od) {
      this.B = d.ub(v, this.kc);
      this.ua = (n + w) * this.B.y - (l + z) * this.B.x;
      this.va = s * this.B.y - o * this.B.x;
      var C = this.B.x * n + this.B.y * l;
      d.lb(this.Jc - this.Ic) < 2 * a.ta ? (A = d.xa(C, -a.uc, a.uc), x = d.lb(C), m = !0) : C <= this.Ic ? (A = d.xa(C - this.Ic + a.ta, -a.uc, 0), x = this.Ic - C, m = !0) : C >= this.Jc && (A = d.xa(C - this.Jc + a.ta, 0, a.uc), x = C - this.Jc, m = !0)
    }
    this.T = d.ub(v, this.Xd);
    this.Aa = (n + w) * this.T.y - (l + z) * this.T.x;
    this.Ba = s * this.T.y - o * this.T.x;
    v = new c;
    z = this.T.x * n + this.T.y * l;
    x = d.Ub(x, d.lb(z));
    w = 0;
    m ? (m = this.Ta, s = this.Ua, o = this.Nb, n = this.Ob, this.P.b.x = m + s + o * this.Aa * this.Aa + n * this.Ba * this.Ba, this.P.b.y = o * this.Aa * this.ua + n * this.Ba * this.va, this.P.d.x = this.P.b.y, this.P.d.y = m + s + o * this.ua * this.ua + n * this.va * this.va, this.P.Me(v, -z, -A)) : (m = this.Ta, s = this.Ua, o = this.Nb, n = this.Ob, A = m + s + o * this.Aa * this.Aa + n * this.Ba * this.Ba, v.x = A != 0 ? -z / A : 0, v.y = 0);
    A = v.x * this.T.x + v.y * this.B.x;
    m = v.x * this.T.y + v.y * this.B.y;
    z = v.x * this.Aa + v.y * this.ua;
    v = v.x * this.Ba + v.y * this.va;
    h.x -= this.Ta * A;
    h.y -= this.Ta * m;
    i -= this.Nb * z;
    j.x += this.Ua * A;
    j.y += this.Ua * m;
    k += this.Ob * v;
    b.e.z = i;
    e.e.z = k;
    b.Qa();
    e.Qa();
    return x <= a.ta && w <= a.$e
  };
  P.ya(C, P.c.o.R);
  C.prototype.I = P.c.o.R.prototype;
  C.Xg = function() {
    P.c.o.R.R.apply(this, arguments);
    this.eb = new c;
    this.fb = new c;
    this.hf = new c
  };
  C.prototype.Xg = function() {
    this.I.R.call(this);
    this.type = n.Wl;
    this.hf.s(1, 0);
    this.ph = !1;
    this.Mk = this.bk = 0;
    this.qh = !1;
    this.Fh = this.vk = 0
  };
  C.prototype.$a = function(a, c, b, d) {
    this.ma = a;
    this.qa = c;
    this.eb = this.ma.mc(b);
    this.fb = this.qa.mc(b);
    this.hf = this.ma.aj(d)
  };
  P.ya(v, P.c.o.F);
  v.prototype.I = P.c.o.F.prototype;
  v.Zg = function() {
    P.c.o.F.F.apply(this, arguments);
    this.Kb = new g;
    this.dd = new g;
    this.ed = new g;
    this.nf = new c;
    this.gg = new c;
    this.j = new c;
    this.A = new g;
    this.Bi = new c
  };
  v.prototype.zc = u("gg");
  v.prototype.Ac = function() {
    return this.N.hb(this.nf)
  };
  v.prototype.Zg = function(a) {
    this.I.F.call(this, a);
    this.gg.p(a.target);
    var c = this.gg.x - this.N.n.position.x, b = this.gg.y - this.N.n.position.y, d = this.N.n.h;
    this.nf.x = c * d.b.x + b * d.b.y;
    this.nf.y = c * d.d.x + b * d.d.y;
    this.ok = a.uk;
    this.j.V();
    this.wh = a.vi;
    this.gk = a.ni;
    this.Mb = this.dk = 0
  };
  v.prototype.Bc = function(a) {
    var c = this.N, b = c.A, d = 2 * Math.PI * this.wh, e = b * d * d;
    this.Mb = a.da * (2 * b * this.gk * d + a.da * e);
    this.Mb = this.Mb != 0 ? 1 / this.Mb : 0;
    this.dk = a.da * e * this.Mb;
    var e = c.n.h, b = this.nf.x - c.e.v.x, d = this.nf.y - c.e.v.y, g = e.b.x * b + e.d.x * d, d = e.b.y * b + e.d.y * d, b = g, e = c.r, g = c.C;
    this.dd.b.x = e;
    this.dd.d.x = 0;
    this.dd.b.y = 0;
    this.dd.d.y = e;
    this.ed.b.x = g * d * d;
    this.ed.d.x = -g * b * d;
    this.ed.b.y = -g * b * d;
    this.ed.d.y = g * b * b;
    this.Kb.Le(this.dd);
    this.Kb.Kh(this.ed);
    this.Kb.b.x += this.Mb;
    this.Kb.d.y += this.Mb;
    this.Kb.$i(this.A);
    this.Bi.x = c.e.k.x + b - this.gg.x;
    this.Bi.y = c.e.k.y + d - this.gg.y;
    c.w *= 0.98;
    this.j.x *= a.Ya;
    this.j.y *= a.Ya;
    c.m.x += e * this.j.x;
    c.m.y += e * this.j.y;
    c.w += g * (b * this.j.y - d * this.j.x)
  };
  v.prototype.pc = function(a) {
    var c = this.N, b, d = 0, e = 0;
    b = c.n.h;
    var g = this.nf.x - c.e.v.x, h = this.nf.y - c.e.v.y, d = b.b.x * g + b.d.x * h, h = b.b.y * g + b.d.y * h, g = d, d = c.m.x + -c.w * h, i = c.m.y + c.w * g;
    b = this.A;
    d = d + this.dk * this.Bi.x + this.Mb * this.j.x;
    e = i + this.dk * this.Bi.y + this.Mb * this.j.y;
    i = -(b.b.x * d + b.d.x * e);
    e = -(b.b.y * d + b.d.y * e);
    b = this.j.x;
    d = this.j.y;
    this.j.x += i;
    this.j.y += e;
    a = a.da * this.ok;
    this.j.Vh() > a * a && this.j.Vb(a / this.j.Ld());
    i = this.j.x - b;
    e = this.j.y - d;
    c.m.x += c.r * i;
    c.m.y += c.r * e;
    c.w += c.C * (g * e - h * i)
  };
  v.prototype.oc = D(!0);
  P.ya(I, P.c.o.R);
  I.prototype.I = P.c.o.R.prototype;
  I.$g = function() {
    P.c.o.R.R.apply(this, arguments);
    this.target = new c
  };
  I.prototype.$g = function() {
    this.I.R.call(this);
    this.type = n.Vj;
    this.uk = 0;
    this.vi = 5;
    this.ni = 0.7
  };
  P.ya(L, P.c.o.F);
  L.prototype.I = P.c.o.F.prototype;
  L.fh = function() {
    P.c.o.F.F.apply(this, arguments);
    this.J = new c;
    this.K = new c;
    this.kc = new c;
    this.Xd = new c;
    this.B = new c;
    this.T = new c;
    this.P = new e;
    this.j = new b
  };
  L.prototype.zc = function() {
    return this.S.hb(this.J)
  };
  L.prototype.Ac = function() {
    return this.N.hb(this.K)
  };
  L.prototype.Dg = function() {
    var a = this.S, c = this.N, b = a.hb(this.J), d = c.hb(this.K), c = d.x - b.x, b = d.y - b.y, a = a.cj(this.kc);
    return a.x * c + a.y * b
  };
  L.prototype.fh = function(a) {
    this.I.F.call(this, a);
    this.J.p(a.eb);
    this.K.p(a.fb);
    this.kc.p(a.hf);
    this.Xd.x = -this.kc.y;
    this.Xd.y = this.kc.x;
    this.Lp = a.Be;
    this.j.V();
    this.wa = this.bc = 0;
    this.Ic = a.bk;
    this.Jc = a.Mk;
    this.pk = a.vk;
    this.zh = a.Fh;
    this.od = a.ph;
    this.xe = a.qh;
    this.ea = n.Xb;
    this.B.V();
    this.T.V()
  };
  L.prototype.Bc = function(c) {
    var b = this.S, e = this.N, g, h = 0;
    this.Ed.p(b.e.v);
    this.Fd.p(e.e.v);
    var i = b.Tb();
    e.Tb();
    g = b.n.h;
    var j = this.J.x - this.Ed.x, k = this.J.y - this.Ed.y, h = g.b.x * j + g.d.x * k, k = g.b.y * j + g.d.y * k, j = h;
    g = e.n.h;
    var l = this.K.x - this.Fd.x, m = this.K.y - this.Fd.y, h = g.b.x * l + g.d.x * m, m = g.b.y * l + g.d.y * m, l = h;
    g = e.e.k.x + l - b.e.k.x - j;
    h = e.e.k.y + m - b.e.k.y - k;
    this.Ta = b.r;
    this.Ua = e.r;
    this.Nb = b.C;
    this.Ob = e.C;
    this.B.p(d.ub(i.h, this.kc));
    this.ua = (g + j) * this.B.y - (h + k) * this.B.x;
    this.va = l * this.B.y - m * this.B.x;
    this.bc = this.Ta + this.Ua + this.Nb * this.ua * this.ua + this.Ob * this.va * this.va;
    if(this.bc > Number.MIN_VALUE) {
      this.bc = 1 / this.bc
    }
    this.T.p(d.ub(i.h, this.Xd));
    this.Aa = (g + j) * this.T.y - (h + k) * this.T.x;
    this.Ba = l * this.T.y - m * this.T.x;
    i = this.Ta;
    j = this.Ua;
    k = this.Nb;
    l = this.Ob;
    this.P.b.x = i + j + k * this.Aa * this.Aa + l * this.Ba * this.Ba;
    this.P.b.y = k * this.Aa + l * this.Ba;
    this.P.b.t = k * this.Aa * this.ua + l * this.Ba * this.va;
    this.P.d.x = this.P.b.y;
    this.P.d.y = k + l;
    this.P.d.t = k * this.ua + l * this.va;
    this.P.X.x = this.P.b.t;
    this.P.X.y = this.P.d.t;
    this.P.X.t = i + j + k * this.ua * this.ua + l * this.va * this.va;
    if(this.od) {
      if(g = this.B.x * g + this.B.y * h, d.lb(this.Jc - this.Ic) < 2 * a.ta) {
        this.ea = n.re
      }else {
        if(g <= this.Ic) {
          if(this.ea != n.xd) {
            this.ea = n.xd, this.j.t = 0
          }
        }else {
          if(g >= this.Jc) {
            if(this.ea != n.wb) {
              this.ea = n.wb, this.j.t = 0
            }
          }else {
            this.ea = n.Xb, this.j.t = 0
          }
        }
      }
    }else {
      this.ea = n.Xb
    }
    if(this.xe == !1) {
      this.wa = 0
    }
    c.bd ? (this.j.x *= c.Ya, this.j.y *= c.Ya, this.wa *= c.Ya, c = this.j.x * this.T.x + (this.wa + this.j.t) * this.B.x, g = this.j.x * this.T.y + (this.wa + this.j.t) * this.B.y, h = this.j.x * this.Aa + this.j.y + (this.wa + this.j.t) * this.ua, i = this.j.x * this.Ba + this.j.y + (this.wa + this.j.t) * this.va, b.m.x -= this.Ta * c, b.m.y -= this.Ta * g, b.w -= this.Nb * h, e.m.x += this.Ua * c, e.m.y += this.Ua * g, e.w += this.Ob * i) : (this.j.V(), this.wa = 0)
  };
  L.prototype.pc = function(a) {
    var e = this.S, g = this.N, h = e.m, i = e.w, j = g.m, k = g.w, l = 0, m = 0, s = 0, o = 0;
    if(this.xe && this.ea != n.re) {
      o = this.bc * (this.zh - (this.B.x * (j.x - h.x) + this.B.y * (j.y - h.y) + this.va * k - this.ua * i)), l = this.wa, a = a.da * this.pk, this.wa = d.xa(this.wa + o, -a, a), o = this.wa - l, l = o * this.B.x, m = o * this.B.y, s = o * this.ua, o *= this.va, h.x -= this.Ta * l, h.y -= this.Ta * m, i -= this.Nb * s, j.x += this.Ua * l, j.y += this.Ua * m, k += this.Ob * o
    }
    s = this.T.x * (j.x - h.x) + this.T.y * (j.y - h.y) + this.Ba * k - this.Aa * i;
    m = k - i;
    if(this.od && this.ea != n.Xb) {
      a = this.B.x * (j.x - h.x) + this.B.y * (j.y - h.y) + this.va * k - this.ua * i;
      l = this.j.mb();
      a = this.P.Kg(new b, -s, -m, -a);
      this.j.ce(a);
      if(this.ea == n.xd) {
        this.j.t = d.Ub(this.j.t, 0)
      }else {
        if(this.ea == n.wb) {
          this.j.t = d.Je(this.j.t, 0)
        }
      }
      s = -s - (this.j.t - l.t) * this.P.X.x;
      m = -m - (this.j.t - l.t) * this.P.X.y;
      m = this.P.Kf(new c, s, m);
      m.x += l.x;
      m.y += l.y;
      this.j.x = m.x;
      this.j.y = m.y;
      a.x = this.j.x - l.x;
      a.y = this.j.y - l.y;
      a.t = this.j.t - l.t;
      l = a.x * this.T.x + a.t * this.B.x;
      m = a.x * this.T.y + a.t * this.B.y;
      s = a.x * this.Aa + a.y + a.t * this.ua;
      o = a.x * this.Ba + a.y + a.t * this.va
    }else {
      a = this.P.Kf(new c, -s, -m), this.j.x += a.x, this.j.y += a.y, l = a.x * this.T.x, m = a.x * this.T.y, s = a.x * this.Aa + a.y, o = a.x * this.Ba + a.y
    }
    h.x -= this.Ta * l;
    h.y -= this.Ta * m;
    i -= this.Nb * s;
    j.x += this.Ua * l;
    j.y += this.Ua * m;
    k += this.Ob * o;
    e.m.p(h);
    e.w = i;
    g.m.p(j);
    g.w = k
  };
  L.prototype.oc = function() {
    var e = this.S, h = this.N, i = e.e.k, j = e.e.z, k = h.e.k, l = h.e.z, n, m = 0, s = 0, o = 0, w = m = n = 0, x = 0, s = !1, v = 0, A = g.Qh(j), z = g.Qh(l);
    n = A;
    var x = this.J.x - this.Ed.x, C = this.J.y - this.Ed.y, m = n.b.x * x + n.d.x * C, C = n.b.y * x + n.d.y * C, x = m;
    n = z;
    z = this.K.x - this.Fd.x;
    o = this.K.y - this.Fd.y;
    m = n.b.x * z + n.d.x * o;
    o = n.b.y * z + n.d.y * o;
    z = m;
    n = k.x + z - i.x - x;
    m = k.y + o - i.y - C;
    if(this.od) {
      this.B = d.ub(A, this.kc);
      this.ua = (n + x) * this.B.y - (m + C) * this.B.x;
      this.va = z * this.B.y - o * this.B.x;
      var B = this.B.x * n + this.B.y * m;
      d.lb(this.Jc - this.Ic) < 2 * a.ta ? (v = d.xa(B, -a.uc, a.uc), w = d.lb(B), s = !0) : B <= this.Ic ? (v = d.xa(B - this.Ic + a.ta, -a.uc, 0), w = this.Ic - B, s = !0) : B >= this.Jc && (v = d.xa(B - this.Jc + a.ta, 0, a.uc), w = B - this.Jc, s = !0)
    }
    this.T = d.ub(A, this.Xd);
    this.Aa = (n + x) * this.T.y - (m + C) * this.T.x;
    this.Ba = z * this.T.y - o * this.T.x;
    A = new b;
    C = this.T.x * n + this.T.y * m;
    z = l - j - this.Lp;
    w = d.Ub(w, d.lb(C));
    x = d.lb(z);
    s ? (s = this.Ta, o = this.Ua, n = this.Nb, m = this.Ob, this.P.b.x = s + o + n * this.Aa * this.Aa + m * this.Ba * this.Ba, this.P.b.y = n * this.Aa + m * this.Ba, this.P.b.t = n * this.Aa * this.ua + m * this.Ba * this.va, this.P.d.x = this.P.b.y, this.P.d.y = n + m, this.P.d.t = n * this.ua + m * this.va, this.P.X.x = this.P.b.t, this.P.X.y = this.P.d.t, this.P.X.t = s + o + n * this.ua * this.ua + m * this.va * this.va, this.P.Kg(A, -C, -z, -v)) : (s = this.Ta, o = this.Ua, n = this.Nb, m = 
    this.Ob, v = n * this.Aa + m * this.Ba, B = n + m, this.P.b.s(s + o + n * this.Aa * this.Aa + m * this.Ba * this.Ba, v, 0), this.P.d.s(v, B, 0), v = this.P.Kf(new c, -C, -z), A.x = v.x, A.y = v.y, A.t = 0);
    v = A.x * this.T.x + A.t * this.B.x;
    s = A.x * this.T.y + A.t * this.B.y;
    C = A.x * this.Aa + A.y + A.t * this.ua;
    A = A.x * this.Ba + A.y + A.t * this.va;
    i.x -= this.Ta * v;
    i.y -= this.Ta * s;
    j -= this.Nb * C;
    k.x += this.Ua * v;
    k.y += this.Ua * s;
    l += this.Ob * A;
    e.e.z = j;
    h.e.z = l;
    e.Qa();
    h.Qa();
    return w <= a.ta && x <= a.$e
  };
  P.ya(M, P.c.o.R);
  M.prototype.I = P.c.o.R.prototype;
  M.gh = function() {
    P.c.o.R.R.apply(this, arguments);
    this.eb = new c;
    this.fb = new c;
    this.hf = new c
  };
  M.prototype.gh = function() {
    this.I.R.call(this);
    this.type = n.Zl;
    this.hf.s(1, 0);
    this.Be = 0;
    this.ph = !1;
    this.Mk = this.bk = 0;
    this.qh = !1;
    this.Fh = this.vk = 0
  };
  M.prototype.$a = function(a, c, b, d) {
    this.ma = a;
    this.qa = c;
    this.eb = this.ma.mc(b);
    this.fb = this.qa.mc(b);
    this.hf = this.ma.aj(d);
    this.Be = this.qa.Jd() - this.ma.Jd()
  };
  P.ya(o, P.c.o.F);
  o.prototype.I = P.c.o.F.prototype;
  o.Of = function() {
    P.c.o.F.F.apply(this, arguments);
    this.Cd = new c;
    this.Dd = new c;
    this.J = new c;
    this.K = new c;
    this.Ha = new c;
    this.Ia = new c
  };
  o.prototype.zc = function() {
    return this.S.hb(this.J)
  };
  o.prototype.Ac = function() {
    return this.N.hb(this.K)
  };
  o.prototype.cl = function() {
    var a = this.wc.n.position.mb();
    a.ce(this.Cd);
    return a
  };
  o.prototype.dl = function() {
    var a = this.wc.n.position.mb();
    a.ce(this.Dd);
    return a
  };
  o.prototype.Of = function(a) {
    this.I.F.call(this, a);
    this.wc = this.S.zb.jk;
    this.Cd.x = a.wi.x - this.wc.n.position.x;
    this.Cd.y = a.wi.y - this.wc.n.position.y;
    this.Dd.x = a.xi.x - this.wc.n.position.x;
    this.Dd.y = a.xi.y - this.wc.n.position.y;
    this.J.p(a.eb);
    this.K.p(a.fb);
    this.Va = a.wf;
    this.ag = a.$j + this.Va * a.ak;
    this.vm = d.Je(a.ym, this.ag - this.Va * o.ji);
    this.wm = d.Je(a.zm, (this.ag - o.ji) / this.Va);
    this.Wd = this.Vd = this.j = 0
  };
  o.prototype.Bc = function(c) {
    var b = this.S, d = this.N, e;
    e = b.n.h;
    var g = this.J.x - b.e.v.x, h = this.J.y - b.e.v.y, i = e.b.x * g + e.d.x * h, h = e.b.y * g + e.d.y * h, g = i;
    e = d.n.h;
    var j = this.K.x - d.e.v.x, k = this.K.y - d.e.v.y, i = e.b.x * j + e.d.x * k, k = e.b.y * j + e.d.y * k, j = i;
    e = d.e.k.x + j;
    var i = d.e.k.y + k, l = this.wc.n.position.x + this.Dd.x, m = this.wc.n.position.y + this.Dd.y;
    this.Ha.s(b.e.k.x + g - (this.wc.n.position.x + this.Cd.x), b.e.k.y + h - (this.wc.n.position.y + this.Cd.y));
    this.Ia.s(e - l, i - m);
    e = this.Ha.Ld();
    i = this.Ia.Ld();
    e > a.ta ? this.Ha.Vb(1 / e) : this.Ha.V();
    i > a.ta ? this.Ia.Vb(1 / i) : this.Ia.V();
    this.ag - e - this.Va * i > 0 ? (this.sk = n.Xb, this.j = 0) : this.sk = n.wb;
    e < this.vm ? (this.lk = n.Xb, this.Vd = 0) : this.lk = n.wb;
    i < this.wm ? (this.mk = n.Xb, this.Wd = 0) : this.mk = n.wb;
    e = g * this.Ha.y - h * this.Ha.x;
    i = j * this.Ia.y - k * this.Ia.x;
    this.xh = b.r + b.C * e * e;
    this.yh = d.r + d.C * i * i;
    this.Ei = this.xh + this.Va * this.Va * this.yh;
    this.xh = 1 / this.xh;
    this.yh = 1 / this.yh;
    this.Ei = 1 / this.Ei;
    c.bd ? (this.j *= c.Ya, this.Vd *= c.Ya, this.Wd *= c.Ya, c = (-this.j - this.Vd) * this.Ha.x, e = (-this.j - this.Vd) * this.Ha.y, i = (-this.Va * this.j - this.Wd) * this.Ia.x, l = (-this.Va * this.j - this.Wd) * this.Ia.y, b.m.x += b.r * c, b.m.y += b.r * e, b.w += b.C * (g * e - h * c), d.m.x += d.r * i, d.m.y += d.r * l, d.w += d.C * (j * l - k * i)) : this.Wd = this.Vd = this.j = 0
  };
  o.prototype.pc = function() {
    var a = this.S, c = this.N, b;
    b = a.n.h;
    var e = this.J.x - a.e.v.x, g = this.J.y - a.e.v.y, h = b.b.x * e + b.d.x * g, g = b.b.y * e + b.d.y * g, e = h;
    b = c.n.h;
    var i = this.K.x - c.e.v.x, j = this.K.y - c.e.v.y, h = b.b.x * i + b.d.x * j, j = b.b.y * i + b.d.y * j, i = h, k = h = b = 0, l = 0;
    b = l = b = l = k = h = b = 0;
    if(this.sk == n.wb) {
      b = a.m.x + -a.w * g, h = a.m.y + a.w * e, k = c.m.x + -c.w * j, l = c.m.y + c.w * i, b = -(this.Ha.x * b + this.Ha.y * h) - this.Va * (this.Ia.x * k + this.Ia.y * l), l = this.Ei * -b, b = this.j, this.j = d.Ub(0, this.j + l), l = this.j - b, b = -l * this.Ha.x, h = -l * this.Ha.y, k = -this.Va * l * this.Ia.x, l = -this.Va * l * this.Ia.y, a.m.x += a.r * b, a.m.y += a.r * h, a.w += a.C * (e * h - g * b), c.m.x += c.r * k, c.m.y += c.r * l, c.w += c.C * (i * l - j * k)
    }
    if(this.lk == n.wb) {
      b = a.m.x + -a.w * g, h = a.m.y + a.w * e, b = -(this.Ha.x * b + this.Ha.y * h), l = -this.xh * b, b = this.Vd, this.Vd = d.Ub(0, this.Vd + l), l = this.Vd - b, b = -l * this.Ha.x, h = -l * this.Ha.y, a.m.x += a.r * b, a.m.y += a.r * h, a.w += a.C * (e * h - g * b)
    }
    if(this.mk == n.wb) {
      k = c.m.x + -c.w * j, l = c.m.y + c.w * i, b = -(this.Ia.x * k + this.Ia.y * l), l = -this.yh * b, b = this.Wd, this.Wd = d.Ub(0, this.Wd + l), l = this.Wd - b, k = -l * this.Ia.x, l = -l * this.Ia.y, c.m.x += c.r * k, c.m.y += c.r * l, c.w += c.C * (i * l - j * k)
    }
  };
  o.prototype.oc = function() {
    var c = this.S, b = this.N, e, g = this.wc.n.position.x + this.Cd.x, h = this.wc.n.position.y + this.Cd.y, i = this.wc.n.position.x + this.Dd.x, j = this.wc.n.position.y + this.Dd.y, k = 0, l = 0, m = 0, s = 0, o = e = 0, x = 0, A = 0, w = o = A = e = o = e = 0;
    if(this.sk == n.wb) {
      e = c.n.h, k = this.J.x - c.e.v.x, l = this.J.y - c.e.v.y, o = e.b.x * k + e.d.x * l, l = e.b.y * k + e.d.y * l, k = o, e = b.n.h, m = this.K.x - b.e.v.x, s = this.K.y - b.e.v.y, o = e.b.x * m + e.d.x * s, s = e.b.y * m + e.d.y * s, m = o, e = c.e.k.x + k, o = c.e.k.y + l, x = b.e.k.x + m, A = b.e.k.y + s, this.Ha.s(e - g, o - h), this.Ia.s(x - i, A - j), e = this.Ha.Ld(), o = this.Ia.Ld(), e > a.ta ? this.Ha.Vb(1 / e) : this.Ha.V(), o > a.ta ? this.Ia.Vb(1 / o) : this.Ia.V(), e = this.ag - 
      e - this.Va * o, w = d.Ub(w, -e), e = d.xa(e + a.ta, -a.uc, 0), A = -this.Ei * e, e = -A * this.Ha.x, o = -A * this.Ha.y, x = -this.Va * A * this.Ia.x, A = -this.Va * A * this.Ia.y, c.e.k.x += c.r * e, c.e.k.y += c.r * o, c.e.z += c.C * (k * o - l * e), b.e.k.x += b.r * x, b.e.k.y += b.r * A, b.e.z += b.C * (m * A - s * x), c.Qa(), b.Qa()
    }
    if(this.lk == n.wb) {
      e = c.n.h, k = this.J.x - c.e.v.x, l = this.J.y - c.e.v.y, o = e.b.x * k + e.d.x * l, l = e.b.y * k + e.d.y * l, k = o, e = c.e.k.x + k, o = c.e.k.y + l, this.Ha.s(e - g, o - h), e = this.Ha.Ld(), e > a.ta ? (this.Ha.x *= 1 / e, this.Ha.y *= 1 / e) : this.Ha.V(), e = this.vm - e, w = d.Ub(w, -e), e = d.xa(e + a.ta, -a.uc, 0), A = -this.xh * e, e = -A * this.Ha.x, o = -A * this.Ha.y, c.e.k.x += c.r * e, c.e.k.y += c.r * o, c.e.z += c.C * (k * o - l * e), c.Qa()
    }
    if(this.mk == n.wb) {
      e = b.n.h, m = this.K.x - b.e.v.x, s = this.K.y - b.e.v.y, o = e.b.x * m + e.d.x * s, s = e.b.y * m + e.d.y * s, m = o, x = b.e.k.x + m, A = b.e.k.y + s, this.Ia.s(x - i, A - j), o = this.Ia.Ld(), o > a.ta ? (this.Ia.x *= 1 / o, this.Ia.y *= 1 / o) : this.Ia.V(), e = this.wm - o, w = d.Ub(w, -e), e = d.xa(e + a.ta, -a.uc, 0), A = -this.yh * e, x = -A * this.Ia.x, A = -A * this.Ia.y, b.e.k.x += b.r * x, b.e.k.y += b.r * A, b.e.z += b.C * (m * A - s * x), b.Qa()
    }
    return w < a.ta
  };
  P.Wa.push(function() {
    P.c.o.Of.ji = 2
  });
  P.ya(F, P.c.o.R);
  F.prototype.I = P.c.o.R.prototype;
  F.hh = function() {
    P.c.o.R.R.apply(this, arguments);
    this.wi = new c;
    this.xi = new c;
    this.eb = new c;
    this.fb = new c
  };
  F.prototype.hh = function() {
    this.I.R.call(this);
    this.type = n.Wj;
    this.wi.s(-1, 1);
    this.xi.s(1, 1);
    this.eb.s(-1, 0);
    this.fb.s(1, 0);
    this.zm = this.ak = this.ym = this.$j = 0;
    this.wf = 1;
    this.Oj = !0
  };
  F.prototype.$a = function(a, c, b, d, e, g, h) {
    h === f && (h = 0);
    this.ma = a;
    this.qa = c;
    this.wi.p(b);
    this.xi.p(d);
    this.eb = this.ma.mc(e);
    this.fb = this.qa.mc(g);
    a = e.x - b.x;
    b = e.y - b.y;
    this.$j = Math.sqrt(a * a + b * b);
    b = g.x - d.x;
    d = g.y - d.y;
    this.ak = Math.sqrt(b * b + d * d);
    this.wf = h;
    h = this.$j + this.wf * this.ak;
    this.ym = h - this.wf * o.ji;
    this.zm = (h - o.ji) / this.wf
  };
  P.ya(K, P.c.o.F);
  K.prototype.I = P.c.o.F.prototype;
  K.Pf = function() {
    P.c.o.F.F.apply(this, arguments);
    this.Kb = new g;
    this.dd = new g;
    this.ed = new g;
    this.Fg = new g;
    this.qb = new b;
    this.ld = new c;
    this.Id = new c;
    this.J = new c;
    this.K = new c;
    this.j = new b;
    this.A = new e
  };
  K.prototype.zc = function() {
    return this.S.hb(this.J)
  };
  K.prototype.Ac = function() {
    return this.N.hb(this.K)
  };
  K.prototype.Rh = function() {
    return this.N.e.z - this.S.e.z - this.Ch
  };
  K.prototype.Pf = function(a) {
    this.I.F.call(this, a);
    this.J.p(a.eb);
    this.K.p(a.fb);
    this.Ch = a.Be;
    this.j.V();
    this.wa = 0;
    this.Di = a.sp;
    this.tk = a.oq;
    this.Ip = a.Qp;
    this.zh = a.Fh;
    this.od = a.ph;
    this.xe = a.qh;
    this.ea = n.Xb
  };
  K.prototype.Bc = function(c) {
    var b = this.S, e = this.N, g, h = 0;
    g = b.n.h;
    var i = this.J.x - b.e.v.x, j = this.J.y - b.e.v.y, h = g.b.x * i + g.d.x * j, j = g.b.y * i + g.d.y * j, i = h;
    g = e.n.h;
    var k = this.K.x - e.e.v.x, l = this.K.y - e.e.v.y, h = g.b.x * k + g.d.x * l, l = g.b.y * k + g.d.y * l, k = h;
    g = b.r;
    var h = e.r, m = b.C, s = e.C;
    this.A.b.x = g + h + j * j * m + l * l * s;
    this.A.d.x = -j * i * m - l * k * s;
    this.A.X.x = -j * m - l * s;
    this.A.b.y = this.A.d.x;
    this.A.d.y = g + h + i * i * m + k * k * s;
    this.A.X.y = i * m + k * s;
    this.A.b.t = this.A.X.x;
    this.A.d.t = this.A.X.y;
    this.A.X.t = m + s;
    this.bc = 1 / (m + s);
    if(this.xe == !1) {
      this.wa = 0
    }
    if(this.od) {
      var o = e.e.z - b.e.z - this.Ch;
      if(d.lb(this.tk - this.Di) < 2 * a.$e) {
        this.ea = n.re
      }else {
        if(o <= this.Di) {
          if(this.ea != n.xd) {
            this.j.t = 0
          }
          this.ea = n.xd
        }else {
          if(o >= this.tk) {
            if(this.ea != n.wb) {
              this.j.t = 0
            }
            this.ea = n.wb
          }else {
            this.ea = n.Xb, this.j.t = 0
          }
        }
      }
    }else {
      this.ea = n.Xb
    }
    c.bd ? (this.j.x *= c.Ya, this.j.y *= c.Ya, this.wa *= c.Ya, c = this.j.x, o = this.j.y, b.m.x -= g * c, b.m.y -= g * o, b.w -= m * (i * o - j * c + this.wa + this.j.t), e.m.x += h * c, e.m.y += h * o, e.w += s * (k * o - l * c + this.wa + this.j.t)) : (this.j.V(), this.wa = 0)
  };
  K.prototype.pc = function(a) {
    var c = this.S, b = this.N, e = 0, g = e = 0, h = 0, i = 0, j = 0, k = c.m, l = c.w, m = b.m, s = b.w, o = c.r, x = b.r, w = c.C, v = b.C;
    if(this.xe && this.ea != n.re) {
      g = this.bc * -(s - l - this.zh), h = this.wa, i = a.da * this.Ip, this.wa = d.xa(this.wa + g, -i, i), g = this.wa - h, l -= w * g, s += v * g
    }
    if(this.od && this.ea != n.Xb) {
      var a = c.n.h, g = this.J.x - c.e.v.x, h = this.J.y - c.e.v.y, e = a.b.x * g + a.d.x * h, h = a.b.y * g + a.d.y * h, g = e, a = b.n.h, i = this.K.x - b.e.v.x, j = this.K.y - b.e.v.y, e = a.b.x * i + a.d.x * j, j = a.b.y * i + a.d.y * j, i = e, a = m.x + -s * j - k.x - -l * h, z = m.y + s * i - k.y - l * g;
      this.A.Kg(this.qb, -a, -z, -(s - l));
      if(this.ea == n.re) {
        this.j.ce(this.qb)
      }else {
        if(this.ea == n.xd) {
          if(e = this.j.t + this.qb.t, e < 0) {
            this.A.Kf(this.Id, -a, -z), this.qb.x = this.Id.x, this.qb.y = this.Id.y, this.qb.t = -this.j.t, this.j.x += this.Id.x, this.j.y += this.Id.y, this.j.t = 0
          }
        }else {
          if(this.ea == n.wb && (e = this.j.t + this.qb.t, e > 0)) {
            this.A.Kf(this.Id, -a, -z), this.qb.x = this.Id.x, this.qb.y = this.Id.y, this.qb.t = -this.j.t, this.j.x += this.Id.x, this.j.y += this.Id.y, this.j.t = 0
          }
        }
      }
      k.x -= o * this.qb.x;
      k.y -= o * this.qb.y;
      l -= w * (g * this.qb.y - h * this.qb.x + this.qb.t);
      m.x += x * this.qb.x;
      m.y += x * this.qb.y;
      s += v * (i * this.qb.y - j * this.qb.x + this.qb.t)
    }else {
      a = c.n.h, g = this.J.x - c.e.v.x, h = this.J.y - c.e.v.y, e = a.b.x * g + a.d.x * h, h = a.b.y * g + a.d.y * h, g = e, a = b.n.h, i = this.K.x - b.e.v.x, j = this.K.y - b.e.v.y, e = a.b.x * i + a.d.x * j, j = a.b.y * i + a.d.y * j, i = e, this.A.Kf(this.ld, -(m.x + -s * j - k.x - -l * h), -(m.y + s * i - k.y - l * g)), this.j.x += this.ld.x, this.j.y += this.ld.y, k.x -= o * this.ld.x, k.y -= o * this.ld.y, l -= w * (g * this.ld.y - h * this.ld.x), m.x += x * this.ld.x, m.y += x * this.ld.y, 
      s += v * (i * this.ld.y - j * this.ld.x)
    }
    c.m.p(k);
    c.w = l;
    b.m.p(m);
    b.w = s
  };
  K.prototype.oc = function() {
    var c = 0, b, e = this.S, g = this.N, h = 0, i = b = 0, j = 0, k = 0;
    if(this.od && this.ea != n.Xb) {
      var c = g.e.z - e.e.z - this.Ch, l = 0;
      this.ea == n.re ? (c = d.xa(c - this.Di, -a.ii, a.ii), l = -this.bc * c, h = d.lb(c)) : this.ea == n.xd ? (c -= this.Di, h = -c, c = d.xa(c + a.$e, -a.ii, 0), l = -this.bc * c) : this.ea == n.wb && (c -= this.tk, h = c, c = d.xa(c - a.$e, 0, a.ii), l = -this.bc * c);
      e.e.z -= e.C * l;
      g.e.z += g.C * l;
      e.Qa();
      g.Qa()
    }
    b = e.n.h;
    l = this.J.x - e.e.v.x;
    c = this.J.y - e.e.v.y;
    i = b.b.x * l + b.d.x * c;
    c = b.b.y * l + b.d.y * c;
    l = i;
    b = g.n.h;
    var m = this.K.x - g.e.v.x, s = this.K.y - g.e.v.y, i = b.b.x * m + b.d.x * s, s = b.b.y * m + b.d.y * s, m = i, j = g.e.k.x + m - e.e.k.x - l, k = g.e.k.y + s - e.e.k.y - c, o = j * j + k * k;
    b = Math.sqrt(o);
    var i = e.r, x = g.r, w = e.C, v = g.C, z = 10 * a.ta;
    o > z * z && (o = 1 / (i + x), j = o * -j, k = o * -k, e.e.k.x -= 0.5 * i * j, e.e.k.y -= 0.5 * i * k, g.e.k.x += 0.5 * x * j, g.e.k.y += 0.5 * x * k, j = g.e.k.x + m - e.e.k.x - l, k = g.e.k.y + s - e.e.k.y - c);
    this.dd.b.x = i + x;
    this.dd.d.x = 0;
    this.dd.b.y = 0;
    this.dd.d.y = i + x;
    this.ed.b.x = w * c * c;
    this.ed.d.x = -w * l * c;
    this.ed.b.y = -w * l * c;
    this.ed.d.y = w * l * l;
    this.Fg.b.x = v * s * s;
    this.Fg.d.x = -v * m * s;
    this.Fg.b.y = -v * m * s;
    this.Fg.d.y = v * m * m;
    this.Kb.Le(this.dd);
    this.Kb.Kh(this.ed);
    this.Kb.Kh(this.Fg);
    this.Kb.Me(K.Lk, -j, -k);
    j = K.Lk.x;
    k = K.Lk.y;
    e.e.k.x -= e.r * j;
    e.e.k.y -= e.r * k;
    e.e.z -= e.C * (l * k - c * j);
    g.e.k.x += g.r * j;
    g.e.k.y += g.r * k;
    g.e.z += g.C * (m * k - s * j);
    e.Qa();
    g.Qa();
    return b <= a.ta && h <= a.$e
  };
  P.Wa.push(function() {
    P.c.o.Pf.Lk = new c
  });
  P.ya(B, P.c.o.R);
  B.prototype.I = P.c.o.R.prototype;
  B.Qf = function() {
    P.c.o.R.R.apply(this, arguments);
    this.eb = new c;
    this.fb = new c
  };
  B.prototype.Qf = function() {
    this.I.R.call(this);
    this.type = n.si;
    this.eb.s(0, 0);
    this.fb.s(0, 0);
    this.Fh = this.Qp = this.oq = this.sp = this.Be = 0;
    this.qh = this.ph = !1
  };
  B.prototype.$a = function(a, c, b) {
    this.ma = a;
    this.qa = c;
    this.eb = this.ma.mc(b);
    this.fb = this.qa.mc(b);
    this.Be = this.qa.Jd() - this.ma.Jd()
  };
  P.ya(Q, P.c.o.F);
  Q.prototype.I = P.c.o.F.prototype;
  Q.kh = function() {
    P.c.o.F.F.apply(this, arguments);
    this.ic = new c;
    this.jc = new c;
    this.j = new b;
    this.A = new e
  };
  Q.prototype.zc = function() {
    return this.S.hb(this.ic)
  };
  Q.prototype.Ac = function() {
    return this.N.hb(this.jc)
  };
  Q.prototype.kh = function(a) {
    this.I.F.call(this, a);
    this.ic.p(a.eb);
    this.jc.p(a.fb);
    this.Ch = a.Be;
    this.j.V();
    this.A = new e
  };
  Q.prototype.Bc = function(a) {
    var c, b = 0, d = this.S, e = this.N;
    c = d.n.h;
    var g = this.ic.x - d.e.v.x, h = this.ic.y - d.e.v.y, b = c.b.x * g + c.d.x * h, h = c.b.y * g + c.d.y * h, g = b;
    c = e.n.h;
    var i = this.jc.x - e.e.v.x, j = this.jc.y - e.e.v.y, b = c.b.x * i + c.d.x * j, j = c.b.y * i + c.d.y * j, i = b;
    c = d.r;
    var b = e.r, k = d.C, l = e.C;
    this.A.b.x = c + b + h * h * k + j * j * l;
    this.A.d.x = -h * g * k - j * i * l;
    this.A.X.x = -h * k - j * l;
    this.A.b.y = this.A.d.x;
    this.A.d.y = c + b + g * g * k + i * i * l;
    this.A.X.y = g * k + i * l;
    this.A.b.t = this.A.X.x;
    this.A.d.t = this.A.X.y;
    this.A.X.t = k + l;
    a.bd ? (this.j.x *= a.Ya, this.j.y *= a.Ya, this.j.t *= a.Ya, d.m.x -= c * this.j.x, d.m.y -= c * this.j.y, d.w -= k * (g * this.j.y - h * this.j.x + this.j.t), e.m.x += b * this.j.x, e.m.y += b * this.j.y, e.w += l * (i * this.j.y - j * this.j.x + this.j.t)) : this.j.V()
  };
  Q.prototype.pc = function() {
    var a, c = 0, d = this.S, e = this.N, g = d.m, h = d.w, i = e.m, j = e.w, k = d.r, l = e.r, n = d.C, m = e.C;
    a = d.n.h;
    var s = this.ic.x - d.e.v.x, o = this.ic.y - d.e.v.y, c = a.b.x * s + a.d.x * o, o = a.b.y * s + a.d.y * o, s = c;
    a = e.n.h;
    var x = this.jc.x - e.e.v.x, w = this.jc.y - e.e.v.y, c = a.b.x * x + a.d.x * w, w = a.b.y * x + a.d.y * w, x = c;
    a = i.x - j * w - g.x + h * o;
    var c = i.y + j * x - g.y - h * s, v = j - h, z = new b;
    this.A.Kg(z, -a, -c, -v);
    this.j.ce(z);
    g.x -= k * z.x;
    g.y -= k * z.y;
    h -= n * (s * z.y - o * z.x + z.t);
    i.x += l * z.x;
    i.y += l * z.y;
    j += m * (x * z.y - w * z.x + z.t);
    d.w = h;
    e.w = j
  };
  Q.prototype.oc = function() {
    var c, e = 0, g = this.S, h = this.N;
    c = g.n.h;
    var i = this.ic.x - g.e.v.x, j = this.ic.y - g.e.v.y, e = c.b.x * i + c.d.x * j, j = c.b.y * i + c.d.y * j, i = e;
    c = h.n.h;
    var k = this.jc.x - h.e.v.x, l = this.jc.y - h.e.v.y, e = c.b.x * k + c.d.x * l, l = c.b.y * k + c.d.y * l, k = e;
    c = g.r;
    var e = h.r, n = g.C, m = h.C, s = h.e.k.x + k - g.e.k.x - i, o = h.e.k.y + l - g.e.k.y - j, x = h.e.z - g.e.z - this.Ch, w = 10 * a.ta, v = Math.sqrt(s * s + o * o), z = d.lb(x);
    v > w && (n *= 1, m *= 1);
    this.A.b.x = c + e + j * j * n + l * l * m;
    this.A.d.x = -j * i * n - l * k * m;
    this.A.X.x = -j * n - l * m;
    this.A.b.y = this.A.d.x;
    this.A.d.y = c + e + i * i * n + k * k * m;
    this.A.X.y = i * n + k * m;
    this.A.b.t = this.A.X.x;
    this.A.d.t = this.A.X.y;
    this.A.X.t = n + m;
    w = new b;
    this.A.Kg(w, -s, -o, -x);
    g.e.k.x -= c * w.x;
    g.e.k.y -= c * w.y;
    g.e.z -= n * (i * w.y - j * w.x + w.t);
    h.e.k.x += e * w.x;
    h.e.k.y += e * w.y;
    h.e.z += m * (k * w.y - l * w.x + w.t);
    g.Qa();
    h.Qa();
    return v <= a.ta && z <= a.$e
  };
  P.ya(T, P.c.o.R);
  T.prototype.I = P.c.o.R.prototype;
  T.Tf = function() {
    P.c.o.R.R.apply(this, arguments);
    this.eb = new c;
    this.fb = new c
  };
  T.prototype.Tf = function() {
    this.I.R.call(this);
    this.type = n.am;
    this.Be = 0
  };
  T.prototype.$a = function(a, c, b) {
    this.ma = a;
    this.qa = c;
    this.eb.p(this.ma.mc(b));
    this.fb.p(this.qa.mc(b));
    this.Be = this.qa.Jd() - this.ma.Jd()
  }
})();
P.Jq = {};
var pa;
for(pa = 0;pa < P.Wa.length;++pa) {
  P.Wa[pa]()
}
delete P.Wa;
var U = U || {};
U.xj = {};
(function(a) {
  var g = [];
  a.ko = function(a) {
    if(typeof a.zf != "function") {
      throw"Thinker can't think!";
    }
    if(a.Jh != p) {
      throw"Thinker already added!";
    }
    a.Jh = g.push(a)
  };
  a.nr = function(a) {
    if(a.Jh != p) {
      throw"Thinker not added (or already removed)!";
    }
    g[a.Jh] = p;
    a.Jh = p
  };
  a.zf = function(a, d) {
    for(var c = [], b = 0;b < g.length;b++) {
      var h = g[b];
      if(h != p) {
        h.Jh = c.push(g[b]), h.zf(a, d)
      }
    }
    g = c
  }
})(U.xj);
U.yl = {};
(function(a) {
  a.jq = function(a, e, d, c) {
    U.Z.Om(a, e);
    U.Z.td(a, "../external-resources/graphics/urbansquall_tileset/characters/princess_AP.png");
    a.display.Nc.Zc = d;
    a.display.Nc.ui = c;
    a.display.Nc.frames = 4;
    a.display.Nc.$o = 4;
    a.display.Nc.se = 0;
    a.display.Nc.rh = new P.a.f.g(0, 0);
    a.display.Nc.Gc = {z:0, x:0, y:2}
  };
  a.iq = function(g, e, d) {
    var c = W.body;
    a.jq(c, g, e, d);
    if(c.zf) {
      var b = c.zf;
      c.zf = function(d, e) {
        b(d, e);
        a.cm(e, c)
      }
    }else {
      c.zf = function(b, d) {
        a.cm(d, c)
      }, U.xj.ko(c)
    }
  };
  a.cm = function(a, e) {
    var d = e.display.Nc;
    d.se += a;
    var c = e.m, b = Math.abs(c.x), h = Math.abs(c.y);
    if(h < 0.01 || b >= h) {
      if(c.x > 0.01) {
        if(d.Gc.x = 0, d.Gc.z != 0) {
          d.Gc.z = 0, d.se = 0
        }
      }else {
        if(c.x < -0.01) {
          if(d.Gc.x = 1, d.Gc.z != 1) {
            d.Gc.z = 1, d.se = 0
          }
        }else {
          d.se = 0
        }
      }
      d.rh.y = d.Gc.x == 1 ? d.ui.y * 3 + d.Zc.y : d.ui.y + d.Zc.y
    }else {
      if(c.y > 0.01) {
        d.Gc.y = 3;
        if(d.Gc.z != 3) {
          d.Gc.z = 3, d.se = 0
        }
        d.rh.y = d.ui.y * 2 + d.Zc.y
      }else {
        d.Gc.y = 2;
        if(d.Gc.z != 2) {
          d.Gc.z = 2, d.se = 0
        }
        d.rh.y = d.Zc.y
      }
    }
    d.rh.x = d.se == 0 ? d.Zc.x : Math.floor(d.se * d.$o) % d.frames * d.ui.x + d.Zc.x
  };
  a.Wq = function() {
    var a = illandril.Yb.Z.Qb.Sb.kl, e = Math.abs(directionVector.x), d = Math.abs(directionVector.y), a = e > 2 * d ? directionVector.x > 0 ? illandril.Yb.Z.Qb.Sb.E : illandril.Yb.Z.Qb.Sb.co : d > 2 * e ? directionVector.y < 0 ? illandril.Yb.Z.Qb.Sb.In : illandril.Yb.Z.Qb.Sb.kl : directionVector.y < 0 ? directionVector.x > 0 ? illandril.Yb.Z.Qb.Sb.Jn : illandril.Yb.Z.Qb.Sb.Kn : directionVector.x > 0 ? illandril.Yb.Z.Qb.Sb.Cn : illandril.Yb.Z.Qb.Sb.Dn;
    if(a != this.pp) {
      this.pi = 0, this.pp = a
    }
    e = 0;
    d = Math.round((this.pi + 1) / this.Am) % this.frames;
    speedVector.tr() != 0 || this.jm != 0 ? (this.pi += tickTime, this.jm = d) : d = this.jm = this.pi = 0;
    switch(a) {
      case illandril.Yb.Z.Qb.Sb.kl:
        e = 0;
        break;
      case illandril.Yb.Z.Qb.Sb.Cn:
        e = 0;
        d += this.frames;
        break;
      case illandril.Yb.Z.Qb.Sb.E:
        e = 1;
        break;
      case illandril.Yb.Z.Qb.Sb.Jn:
        e = 1;
        d += this.frames;
        break;
      case illandril.Yb.Z.Qb.Sb.In:
        e = 2;
        break;
      case illandril.Yb.Z.Qb.Sb.Kn:
        e = 2;
        d += this.frames;
        break;
      case illandril.Yb.Z.Qb.Sb.co:
        e = 3;
        break;
      case illandril.Yb.Z.Qb.Sb.Dn:
        e = 3, d += this.frames
    }
    a = e * this.Sm;
    isNaN(d * this.Tm) && illandril.gn && illandril.cp("game.ui.BasicDirectionalAnimation").kq("BAD SPRITE X -- sX: " + d + "; DT: " + this.pi + "; MSPF: " + this.Am + "; Width: " + this.Tm);
    isNaN(a) && illandril.gn && illandril.cp("game.ui.SpriteSheet").kq("BAD SPRITE Y -- sY: " + e + "; GT: " + gameTime + "; MSPF: " + this.Am + "; Height: " + this.Sm);
    return{src:this.src, x:d * this.Tm, y:e * this.Sm}
  }
})(U.yl);
U.G = {};
(function(a) {
  function g(a, c) {
    var a = a || {}, b = {}, d;
    for(d in c) {
      b[d] = a[d] === f || a[d] === p ? c[d] : a[d]
    }
    return b
  }
  var e = new P.c.Mf, d = new P.c.Pe, c = p, b = p, h = p, i = [], j = [], k = {bf:0.1, Hc:0.5, ae:0.01, yi:!1}, m = {Zf:!1, rc:0, type:P.c.sa.Eb};
  a.Vc = function(d, e) {
    c = new P.c.Nd(e, !0);
    c.Nn(a);
    c.On(a);
    b = d.x;
    h = d.y;
    a.top = a.Rc(new P.a.f.g(b, 1), new P.a.f.g(b / 2, 0), !0, p, {Hc:0});
    U.Z.td(a.top.body, "graphics/border.png");
    a.bottom = a.Rc(new P.a.f.g(b, 1), new P.a.f.g(b / 2, h), !0, p, {Hc:0});
    U.Z.td(a.bottom.body, "graphics/border.png");
    a.left = a.Rc(new P.a.f.g(1, h), new P.a.f.g(0, h / 2), !0, p, {Hc:0});
    U.Z.td(a.left.body, "graphics/border.png");
    a.right = a.Rc(new P.a.f.g(1, h), new P.a.f.g(b, h / 2), !0, p, {Hc:0});
    U.Z.td(a.right.body, "graphics/border.png")
  };
  a.update = function(a, b) {
    c.he(b, 10, 10);
    c.kn();
    c.Zm();
    if(j.length > 0) {
      for(var d = 0;d < j.length;d++) {
        c.hn(j[d].body)
      }
      j = []
    }
  };
  a.Qd = function() {
    return c
  };
  a.jo = function(a) {
    i.push(a)
  };
  a.Ig = function(a, c) {
    if(!c.vd()) {
      for(var b = 0;b < i.length;b++) {
        if(i[b].Ig && !i[b].Ig(a, c)) {
          return!1
        }
      }
    }
    return P.c.Lf.prototype.Ig(a, c)
  };
  a.fd = function(a, c) {
    if(!a.vd() && !c.vd()) {
      for(var b = 0;b < i.length;b++) {
        if(i[b].fd && !i[b].fd(a, c)) {
          return!1
        }
      }
    }
    return P.c.Lf.prototype.fd(a, c)
  };
  a.vg = function(a) {
    for(var c = 0;c < i.length;c++) {
      i[c].wl && i[c].wl(a), a.disabled && a.oj(!1), i[c].vg && i[c].vg(a)
    }
  };
  a.Gf = function(a) {
    for(var c = 0;c < i.length;c++) {
      i[c].Gf && i[c].Gf(a)
    }
    a.disabled = !1;
    a.oj(!0)
  };
  a.Hg = function(a, c) {
    a.disabled && a.oj(!1);
    for(var b = 0;b < i.length;b++) {
      i[b].Hg && i[b].Hg(a, c)
    }
  };
  a.Gg = function(a, c) {
    for(var b = 0;b < i.length;b++) {
      i[b].Gg && i[b].Gg(a, c)
    }
  };
  a.xb = function() {
    return d
  };
  a.Tc = function() {
    return e
  };
  a.Zj = function() {
    return b
  };
  a.Yj = function() {
    return h
  };
  a.Rc = function(c, b, d, e, g) {
    e = e || {};
    e.type = P.c.sa.vc;
    return a.mi(c, b, d, e, g)
  };
  a.mi = function(c, b, d, e, g) {
    var h = new P.i.H.ec;
    h.mj(c.x / 2, c.y / 2);
    return a.nh(c, b, d !== !1, e, g, h)
  };
  a.nh = function(b, e, h, i, j, k) {
    i = g(i, m);
    d.type = i.type;
    d.rc = i.rc;
    d.Zf = i.Zf;
    d.position = e;
    e = c.Ef(d);
    fixture = a.wj(e, j, k);
    h && U.Z.Om(e, new P.a.f.g(b.x, b.y));
    b = {body:e, Xq:fixture};
    return e.object = b
  };
  a.wj = function(a, c, b) {
    c = g(c, k);
    e.bf = c.bf;
    e.Hc = c.Hc;
    e.ae = c.ae;
    e.yi = c.yi;
    e.shape = b;
    return a.xg(e)
  };
  a.oi = function(a) {
    j.push(a)
  }
})(U.G);
U.Z = {};
(function(a) {
  var g = 0;
  g |= P.c.Db.Sl;
  g |= P.c.Db.Xl;
  g |= P.c.Db.$l;
  var e = 0, d = {}, c = p, b = p, h = p, i = p, j = p, k = p, m = p, l = new P.a.f.g(0, 0), s = new P.a.f.g(0, 0);
  a.Z = {};
  a.Z.dm = function() {
    return k
  };
  a.Z.jp = function(d, e, l, s) {
    c = e;
    b = l.x;
    h = l.y;
    i = b / c;
    j = h / c;
    a.Z.lm(new P.a.f.g(0, 0));
    e = document.getElementById(d);
    l = document.createElement("span");
    if(s) {
      e.innerHTML = '<div style="width: ' + b + "px; height: " + h / 2 + 'px; background-color: #000; opacity: 0.15; position: absolute;"></div><div style="width: ' + b / 2 + "px; height: " + h + 'px; background-color: #FFF; opacity: 0.15; position: absolute;"></div>', l.innerHTML = '<canvas id="' + d + '__DEBUG" class="debugViewport"></canvas>'
    }
    l.className = "viewportContainer";
    l.style.width = b + "px";
    l.style.height = h + "px";
    k = document.createElement("span");
    k.className = "viewport";
    l.appendChild(k);
    e.appendChild(l);
    if(s) {
      m = document.getElementById(d + "__DEBUG"), m.width = a.G.Zj() * c, m.height = a.G.Yj() * c, m.style.marginRight = "-" + m.width + "px", m.style.marginBottom = "-" + m.height + "px", d = new P.c.Db, d.Vn(m.getContext("2d")), d.Qn(c), d.Rn(), d.Tn(), d.Sn(g), a.G.Qd().Pn(d)
    }
  };
  a.Z.lm = function(c) {
    l.x = c.x - i / 2;
    l.y = c.y - j / 2;
    if(l.x < 0) {
      l.x = 0
    }else {
      if(l.x > a.G.Zj() - i) {
        l.x = a.G.Zj() - i
      }
    }
    if(l.y < 0) {
      l.y = 0
    }else {
      if(l.y > a.G.Yj() - j) {
        l.y = a.G.Yj() - j
      }
    }
  };
  a.Z.Ro = function() {
    if(k == p) {
      throw"Display not yet initialized!";
    }
    if(s.x != l.x || s.y != l.y) {
      s.x = l.x;
      s.y = l.y;
      if(m != p) {
        m.style.left = "-" + l.x * c + "px", m.style.top = "-" + l.y * c + "px"
      }
      k.style.left = "-" + l.x * c + "px";
      k.style.top = "-" + l.y * c + "px"
    }
    var b = {}, g;
    for(g in d) {
      b[g] = d[g]
    }
    for(var h = a.G.Qd().Da;h != p;) {
      if(h.display != p) {
        var i = h.n.position, j = h.display.size;
        if(h.display.Ge == p) {
          h.display.Ge = e++
        }
        delete b[h.display.Ge];
        if(d[h.display.Ge] == p) {
          d[h.display.Ge] = document.createElement("span"), d[h.display.Ge].className = "gameObject", d[h.display.Ge].cc = {}, k.appendChild(d[h.display.Ge])
        }
        var v = d[h.display.Ge], I = (i.x - j.x / 2) * c;
        if(v.cc.left != I) {
          v.cc.left = I, v.style.left = I + "px"
        }
        i = (i.y - j.y / 2) * c;
        if(v.cc.top != i) {
          v.cc.top = i, v.style.top = i + "px"
        }
        i = j.x * c;
        if(v.cc.width != i) {
          v.cc.width = i, v.style.width = i + "px"
        }
        j = j.y * c;
        if(v.cc.height != j) {
          v.cc.height = j, v.style.height = j + "px"
        }
        j = h.Jd();
        if(v.cc.rotation != j) {
          v.cc.rotation = j, v.style.webkitTransform = "rotate(" + j + "rad)"
        }
        if(h.display.Nc != p) {
          j = h.display.Nc.url;
          if(v.cc.Go != j) {
            v.cc.Go = j, v.style.backgroundImage = "url(" + j + ")", v.style.backgroundColor = "transparent"
          }
          j = h.display.Nc.rh;
          if(j != p && (v.cc.Ho != j.x || v.cc.Io != j.y)) {
            v.cc.Ho = j.x, v.cc.Io = j.y, v.style.backgroundPosition = j.x * -1 + "px " + j.y * -1 + "px"
          }
        }
      }
      h = h.L
    }
    for(g in b) {
      v = b[g], k.removeChild(v), delete d[g]
    }
  };
  a.Z.Om = function(a, c) {
    a.display = a.display || {};
    a.display.size = c
  };
  a.Z.td = function(a, c) {
    if(a.display == p || a.display.size == p) {
      throw"Attempt to set image of object with no display size!";
    }
    a.display.Nc = a.display.Nc || {};
    a.display.Nc.url = c
  }
})(U);
window.Im = window.or || window.zr || window.jr || window.lr || window.kr || function(a) {
  window.setTimeout(a, 1E3 / 60)
};
U = U || {};
(function(a) {
  function g(h) {
    h == p && (h = (new Date).getTime());
    var i = 0;
    c != 0 ? i = (h - c) / 1E3 : c = h;
    if(i > 0.015) {
      if(e) {
        var j = 1 / i;
        d = d * 0.99 + j * 0.01;
        e.innerHTML = Math.round(j) + " - " + Math.round(d)
      }
      i > 0.04 && (i = 0.04);
      c = h;
      b.Gm && b.Gm(0, i);
      a.xj.zf(h, i);
      b.dq && b.dq(h, i);
      a.G.update(h, i);
      b.Fm && b.Fm();
      a.Z.Ro()
    }
    window.Im(g, a.Z.dm())
  }
  var e = 0, d = 60, c = 0, b = p;
  a.Vc = function(c, d, g, k, m, l, s) {
    b = c;
    e = document.getElementById("fps");
    a.G.Vc(g, k);
    a.Z.jp(d, l, m, s)
  };
  a.start = function() {
    window.Im(g, a.Z.dm())
  }
})(U);
function qa(a, g) {
  for(var e = 0, d = String(a).replace(/^[\s\xa0]+|[\s\xa0]+$/g, "").split("."), c = String(g).replace(/^[\s\xa0]+|[\s\xa0]+$/g, "").split("."), b = Math.max(d.length, c.length), h = 0;e == 0 && h < b;h++) {
    var i = d[h] || "", j = c[h] || "", k = RegExp("(\\d*)(\\D*)", "g"), m = RegExp("(\\d*)(\\D*)", "g");
    do {
      var l = k.exec(i) || ["", "", ""], s = m.exec(j) || ["", "", ""];
      if(l[0].length == 0 && s[0].length == 0) {
        break
      }
      e = ra(l[1].length == 0 ? 0 : parseInt(l[1], 10), s[1].length == 0 ? 0 : parseInt(s[1], 10)) || ra(l[2].length == 0, s[2].length == 0) || ra(l[2], s[2])
    }while(e == 0)
  }
  return e
}
function ra(a, g) {
  if(a < g) {
    return-1
  }else {
    if(a > g) {
      return 1
    }
  }
  return 0
}
;var sa, ta, ua, va;
function wa() {
  return O.navigator ? O.navigator.userAgent : p
}
va = ua = ta = sa = !1;
var xa;
if(xa = wa()) {
  var ya = O.navigator;
  sa = xa.indexOf("Opera") == 0;
  ta = !sa && xa.indexOf("MSIE") != -1;
  ua = !sa && xa.indexOf("WebKit") != -1;
  va = !sa && !ua && ya.product == "Gecko"
}
var X = ta, za = va, Aa = ua, Ba = O.navigator, Ca = (Ba && Ba.platform || "").indexOf("Mac") != -1, Da;
a: {
  var Ea = "", Fa;
  if(sa && O.opera) {
    var Ga = O.opera.version, Ea = typeof Ga == "function" ? Ga() : Ga
  }else {
    if(za ? Fa = /rv\:([^\);]+)(\)|;)/ : X ? Fa = /MSIE\s+([^\);]+)(\)|;)/ : Aa && (Fa = /WebKit\/(\S+)/), Fa) {
      var Ha = Fa.exec(wa()), Ea = Ha ? Ha[1] : ""
    }
  }
  if(X) {
    var Ia, Ja = O.document;
    Ia = Ja ? Ja.documentMode : f;
    if(Ia > parseFloat(Ea)) {
      Da = String(Ia);
      break a
    }
  }
  Da = Ea
}
var Wa = {}, Xa = {};
var Ya, Za = {8:"backspace", 9:"tab", 13:"enter", 16:"shift", 17:"ctrl", 18:"alt", 19:"pause", 20:"caps-lock", 27:"esc", 32:"space", 33:"pg-up", 34:"pg-down", 35:"end", 36:"home", 37:"left", 38:"up", 39:"right", 40:"down", 45:"insert", 46:"delete", 48:"0", 49:"1", 50:"2", 51:"3", 52:"4", 53:"5", 54:"6", 55:"7", 56:"8", 57:"9", 61:"equals", 65:"a", 66:"b", 67:"c", 68:"d", 69:"e", 70:"f", 71:"g", 72:"h", 73:"i", 74:"j", 75:"k", 76:"l", 77:"m", 78:"n", 79:"o", 80:"p", 81:"q", 82:"r", 83:"s", 84:"t", 
85:"u", 86:"v", 87:"w", 88:"x", 89:"y", 90:"z", 93:"context", 96:"num-0", 97:"num-1", 98:"num-2", 99:"num-3", 100:"num-4", 101:"num-5", 102:"num-6", 103:"num-7", 104:"num-8", 105:"num-9", 106:"num-multiply", 107:"num-plus", 109:"num-minus", 110:"num-period", 111:"num-division", 112:"f1", 113:"f2", 114:"f3", 115:"f4", 116:"f5", 117:"f6", 118:"f7", 119:"f8", 120:"f9", 121:"f10", 122:"f11", 123:"f12", 187:"equals", 188:",", 190:".", 191:"/", 220:"\\", 224:"win"};
var $a = Array.prototype, ab = $a.indexOf ? function(a, g, e) {
  return $a.indexOf.call(a, g, e)
} : function(a, g, e) {
  e = e == p ? 0 : e < 0 ? Math.max(0, a.length + e) : e;
  if(typeof a == "string") {
    return typeof g != "string" || g.length != 1 ? -1 : a.indexOf(g, e)
  }
  for(;e < a.length;e++) {
    if(e in a && a[e] === g) {
      return e
    }
  }
  return-1
};
X && (Xa[9] || (Xa[9] = X && document.documentMode && document.documentMode >= 9));
X && (Wa["8"] || (Wa["8"] = qa(Da, "8") >= 0));
function bb() {
}
bb.prototype.Rl = !1;
bb.prototype.Wf = function() {
  if(!this.Rl) {
    this.Rl = !0, this.Xf()
  }
};
bb.prototype.Xf = function() {
  this.Qo && cb.apply(p, this.Qo)
};
function cb(a) {
  for(var g = 0, e = arguments.length;g < e;++g) {
    var d = arguments[g], c = ba(d);
    c == "array" || c == "object" && typeof d.length == "number" ? cb.apply(p, d) : d && typeof d.Wf == "function" && d.Wf()
  }
}
;function db(a, g) {
  this.type = a;
  this.currentTarget = this.target = g
}
ea(db, bb);
db.prototype.Xf = function() {
  delete this.type;
  delete this.target;
  delete this.currentTarget
};
db.prototype.Ak = !1;
db.prototype.fq = !0;
function eb(a) {
  eb[" "](a);
  return a
}
eb[" "] = aa;
function fb(a, g) {
  a && this.Vc(a, g)
}
ea(fb, db);
J = fb.prototype;
J.target = p;
J.relatedTarget = p;
J.offsetX = 0;
J.offsetY = 0;
J.clientX = 0;
J.clientY = 0;
J.screenX = 0;
J.screenY = 0;
J.button = 0;
J.keyCode = 0;
J.charCode = 0;
J.ctrlKey = !1;
J.altKey = !1;
J.shiftKey = !1;
J.metaKey = !1;
J.cq = !1;
J.bm = p;
J.Vc = function(a, g) {
  var e = this.type = a.type;
  db.call(this, e);
  this.target = a.target || a.srcElement;
  this.currentTarget = g;
  var d = a.relatedTarget;
  if(d) {
    if(za) {
      var c;
      a: {
        try {
          eb(d.nodeName);
          c = !0;
          break a
        }catch(b) {
        }
        c = !1
      }
      c || (d = p)
    }
  }else {
    if(e == "mouseover") {
      d = a.fromElement
    }else {
      if(e == "mouseout") {
        d = a.toElement
      }
    }
  }
  this.relatedTarget = d;
  this.offsetX = a.offsetX !== f ? a.offsetX : a.layerX;
  this.offsetY = a.offsetY !== f ? a.offsetY : a.layerY;
  this.clientX = a.clientX !== f ? a.clientX : a.pageX;
  this.clientY = a.clientY !== f ? a.clientY : a.pageY;
  this.screenX = a.screenX || 0;
  this.screenY = a.screenY || 0;
  this.button = a.button;
  this.keyCode = a.keyCode || 0;
  this.charCode = a.charCode || (e == "keypress" ? a.keyCode : 0);
  this.ctrlKey = a.ctrlKey;
  this.altKey = a.altKey;
  this.shiftKey = a.shiftKey;
  this.metaKey = a.metaKey;
  this.cq = Ca ? a.metaKey : a.ctrlKey;
  this.state = a.state;
  this.bm = a;
  delete this.fq;
  delete this.Ak
};
J.Xf = function() {
  fb.Pm.Xf.call(this);
  this.relatedTarget = this.currentTarget = this.target = this.bm = p
};
function gb() {
}
var hb = 0;
J = gb.prototype;
J.key = 0;
J.ng = !1;
J.Ml = !1;
J.Vc = function(a, g, e, d, c, b) {
  if(ba(a) == "function") {
    this.im = !0
  }else {
    if(a && a.handleEvent && ba(a.handleEvent) == "function") {
      this.im = !1
    }else {
      throw Error("Invalid listener argument");
    }
  }
  this.sh = a;
  this.Hm = g;
  this.src = e;
  this.type = d;
  this.capture = !!c;
  this.fm = b;
  this.Ml = !1;
  this.key = ++hb;
  this.ng = !1
};
J.handleEvent = function(a) {
  return this.im ? this.sh.call(this.fm || this.src, a) : this.sh.handleEvent.call(this.sh, a)
};
var ib, jb = (ib = "ScriptEngine" in O && O.ScriptEngine() == "JScript") ? O.ScriptEngineMajorVersion() + "." + O.ScriptEngineMinorVersion() + "." + O.ScriptEngineBuildVersion() : "0";
function Y(a, g) {
  this.xm = g;
  this.df = [];
  if(a > this.xm) {
    throw Error("[goog.structs.SimplePool] Initial cannot be greater than max");
  }
  for(var e = 0;e < a;e++) {
    this.df.push(this.nh())
  }
}
ea(Y, bb);
J = Y.prototype;
J.af = p;
J.Ql = p;
J.getObject = function() {
  return this.df.length ? this.df.pop() : this.nh()
};
function kb(a, g) {
  a.df.length < a.xm ? a.df.push(g) : lb(a, g)
}
J.nh = function() {
  return this.af ? this.af() : {}
};
function lb(a, g) {
  if(a.Ql) {
    a.Ql(g)
  }else {
    var e = ba(g);
    if(e == "object" || e == "array" || e == "function") {
      if(ba(g.Wf) == "function") {
        g.Wf()
      }else {
        for(var d in g) {
          delete g[d]
        }
      }
    }
  }
}
J.Xf = function() {
  Y.Pm.Xf.call(this);
  for(var a = this.df;a.length;) {
    lb(this, a.pop())
  }
  delete this.df
};
var mb, nb, ob, pb, qb, rb, sb, tb, ub, vb, wb;
(function() {
  function a() {
    return{pe:0, mg:0}
  }
  function g() {
    return[]
  }
  function e() {
    function a(c) {
      c = h.call(a.src, a.key, c);
      if(!c) {
        return c
      }
    }
    return a
  }
  function d() {
    return new gb
  }
  function c() {
    return new fb
  }
  var b = ib && !(qa(jb, "5.7") >= 0), h;
  rb = function(a) {
    h = a
  };
  if(b) {
    mb = function() {
      return i.getObject()
    };
    nb = function(a) {
      kb(i, a)
    };
    ob = function() {
      return j.getObject()
    };
    pb = function(a) {
      kb(j, a)
    };
    qb = function() {
      return k.getObject()
    };
    sb = function() {
      kb(k, e())
    };
    tb = function() {
      return m.getObject()
    };
    ub = function(a) {
      kb(m, a)
    };
    vb = function() {
      return l.getObject()
    };
    wb = function(a) {
      kb(l, a)
    };
    var i = new Y(0, 600);
    i.af = a;
    var j = new Y(0, 600);
    j.af = g;
    var k = new Y(0, 600);
    k.af = e;
    var m = new Y(0, 600);
    m.af = d;
    var l = new Y(0, 600);
    l.af = c
  }else {
    mb = a, nb = aa, ob = g, pb = aa, qb = e, sb = aa, tb = d, ub = aa, vb = c, wb = aa
  }
})();
var xb = {}, Z = {}, yb = {}, zb = {};
function Ab(a, g, e, d, c) {
  if(g) {
    if(ba(g) == "array") {
      for(var b = 0;b < g.length;b++) {
        Ab(a, g[b], e, d, c)
      }
    }else {
      var d = !!d, h = Z;
      g in h || (h[g] = mb());
      h = h[g];
      d in h || (h[d] = mb(), h.pe++);
      var h = h[d], i = a[ca] || (a[ca] = ++da), j;
      h.mg++;
      if(h[i]) {
        j = h[i];
        for(b = 0;b < j.length;b++) {
          if(h = j[b], h.sh == e && h.fm == c) {
            if(h.ng) {
              break
            }
            return
          }
        }
      }else {
        j = h[i] = ob(), h.pe++
      }
      b = qb();
      b.src = a;
      h = tb();
      h.Vc(e, b, a, g, d, c);
      e = h.key;
      b.key = e;
      j.push(h);
      xb[e] = h;
      yb[i] || (yb[i] = ob());
      yb[i].push(h);
      a.addEventListener ? (a == O || !a.Po) && a.addEventListener(g, b, d) : a.attachEvent(g in zb ? zb[g] : zb[g] = "on" + g, b)
    }
  }else {
    throw Error("Invalid event type");
  }
}
function Bb(a, g, e, d) {
  if(!d.Ai && d.Bm) {
    for(var c = 0, b = 0;c < d.length;c++) {
      if(d[c].ng) {
        var h = d[c].Hm;
        h.src = p;
        sb(h);
        ub(d[c])
      }else {
        c != b && (d[b] = d[c]), b++
      }
    }
    d.length = b;
    d.Bm = !1;
    b == 0 && (pb(d), delete Z[a][g][e], Z[a][g].pe--, Z[a][g].pe == 0 && (nb(Z[a][g]), delete Z[a][g], Z[a].pe--), Z[a].pe == 0 && (nb(Z[a]), delete Z[a]))
  }
}
function Cb(a, g, e, d, c) {
  var b = 1, g = g[ca] || (g[ca] = ++da);
  if(a[g]) {
    a.mg--;
    a = a[g];
    a.Ai ? a.Ai++ : a.Ai = 1;
    try {
      for(var h = a.length, i = 0;i < h;i++) {
        var j = a[i];
        j && !j.ng && (b &= Db(j, c) !== !1)
      }
    }finally {
      a.Ai--, Bb(e, d, g, a)
    }
  }
  return Boolean(b)
}
function Db(a, g) {
  var e = a.handleEvent(g);
  if(a.Ml) {
    var d = a.key;
    if(xb[d]) {
      var c = xb[d];
      if(!c.ng) {
        var b = c.src, h = c.type, i = c.Hm, j = c.capture;
        b.removeEventListener ? (b == O || !b.Po) && b.removeEventListener(h, i, j) : b.detachEvent && b.detachEvent(h in zb ? zb[h] : zb[h] = "on" + h, i);
        b = b[ca] || (b[ca] = ++da);
        i = Z[h][j][b];
        if(yb[b]) {
          var k = yb[b], m = ab(k, c);
          m >= 0 && $a.splice.call(k, m, 1);
          k.length == 0 && delete yb[b]
        }
        c.ng = !0;
        i.Bm = !0;
        Bb(h, j, b, i);
        delete xb[d]
      }
    }
  }
  return e
}
rb(function(a, g) {
  if(!xb[a]) {
    return!0
  }
  var e = xb[a], d = e.type, c = Z;
  if(!(d in c)) {
    return!0
  }
  var c = c[d], b, h;
  Ya === f && (Ya = X && !O.addEventListener);
  if(Ya) {
    var i;
    if(!(i = g)) {
      a: {
        i = "window.event".split(".");
        for(var j = O;b = i.shift();) {
          if(j[b] != p) {
            j = j[b]
          }else {
            i = p;
            break a
          }
        }
        i = j
      }
    }
    b = i;
    i = !0 in c;
    j = !1 in c;
    if(i) {
      if(b.keyCode < 0 || b.returnValue != f) {
        return!0
      }
      a: {
        var k = !1;
        if(b.keyCode == 0) {
          try {
            b.keyCode = -1;
            break a
          }catch(m) {
            k = !0
          }
        }
        if(k || b.returnValue == f) {
          b.returnValue = !0
        }
      }
    }
    k = vb();
    k.Vc(b, this);
    b = !0;
    try {
      if(i) {
        for(var l = ob(), s = k.currentTarget;s;s = s.parentNode) {
          l.push(s)
        }
        h = c[!0];
        h.mg = h.pe;
        for(var n = l.length - 1;!k.Ak && n >= 0 && h.mg;n--) {
          k.currentTarget = l[n], b &= Cb(h, l[n], d, !0, k)
        }
        if(j) {
          h = c[!1];
          h.mg = h.pe;
          for(n = 0;!k.Ak && n < l.length && h.mg;n++) {
            k.currentTarget = l[n], b &= Cb(h, l[n], d, !1, k)
          }
        }
      }else {
        b = Db(e, k)
      }
    }finally {
      if(l) {
        l.length = 0, pb(l)
      }
      k.Wf();
      wb(k)
    }
    return b
  }
  d = new fb(g, this);
  try {
    b = Db(e, d)
  }finally {
    d.Wf()
  }
  return b
});
var Eb = {61:187, 59:186};
X || Aa && (Wa["525"] || (Wa["525"] = qa(Da, "525") >= 0));
/*
 Copyright (c) 2011, Joseph Spandrusyszyn
 See https://github.com/illandril/Illandril-Game-Engine.
*/
function Fb(a) {
  this.id = Gb++;
  this.name = a;
  this.controls = {};
  this.Dk = {};
  this.Nl = [];
  this.Ii = this.$h = p
}
var Gb = 0, Hb = {}, Ib = !1, Jb = {}, Kb = !1, Lb = {}, Mb = !1, Nb = {};
function Ob(a) {
  var g = a.Dq, g = za && a.keyCode in Eb ? Eb[a.keyCode] : a.keyCode;
  return{keyCode:g, ctrlKey:a.ctrlKey, altKey:a.altKey, shiftKey:a.shiftKey}
}
function Pb(a, g, e, d) {
  var c = Za[a];
  c == p && (c = "KEY[" + a + "]");
  return(g ? "Ctrl + " : "") + (e ? "Alt + " : "") + (d ? "Shift + " : "") + c.toUpperCase()
}
Fb.prototype = {fp:function(a) {
  var g = 0, e = Ib == Jb && Kb == Lb && Mb == Nb, d;
  for(d in Hb) {
    var c = e && Hb[d].qq;
    g++;
    var b = Pb(d, Ib, Kb, Mb);
    this.$h == p && this.controls[b] != p && (!c || this.controls[b].Yo) && this.controls[b].execute(a)
  }
  if(g == 1 && this.$h != p) {
    this.Ii != p && clearTimeout(this.Ii);
    var h = this;
    this.Ii = setTimeout(function() {
      h.Ih(h.$h, b);
      h.$h = p;
      h.Ii = p
    }, 100)
  }
}, Ih:function(a, g, e, d, c) {
  var b = g;
  typeof g == "number" && (b = Pb(g, e, d, c));
  g = [];
  e = this.controls[b];
  d = this.Dk[a.name];
  if(e != p) {
    if(d != p) {
      this.controls[d] = e, this.Dk[e.name] = d, g.push(new Qb(d, e))
    }else {
      throw"The specified key is already in use for a different function.";
    }
  }else {
    d != p && delete this.controls[d]
  }
  this.controls[b] = a;
  this.Dk[a.name] = b;
  g.push(new Qb(b, a));
  this.bq(g)
}, bp:function() {
  var a = [], g;
  for(g in this.controls) {
    a.push(new Qb(g, this.controls[g]))
  }
  return a
}, bq:function(a) {
  for(var g = 0;g < this.Nl.length;g++) {
    var e = this.Nl[g];
    e.Zq.apply(e.sh, a || [], this.bp())
  }
}};
Ab(document, "keydown", function(a) {
  a = Ob(a);
  a.keyCode != 16 && a.keyCode != 17 && a.keyCode != 18 && Hb[a.keyCode] == p && (Hb[a.keyCode] = {qq:!1});
  Ib = a.ctrlKey;
  Kb = a.altKey;
  Mb = a.shiftKey
});
Ab(document, "keyup", function(a) {
  a = Ob(a);
  delete Hb[a.keyCode];
  Ib = a.ctrlKey;
  Kb = a.altKey;
  Mb = a.shiftKey
});
Ab(document, "blur", function() {
  Hb = {};
  Nb = Mb = Lb = Kb = Jb = Ib = !1
});
function Qb(a, g) {
  this.key = this.key = a;
  this.action = this.action = g
}
;function Rb(a, g) {
  this.execute = a;
  this.name = this.name = g;
  this.Yo = !0
}
;U.l = {};
(function(a) {
  function g(d, c, b) {
    if(c.Q.type & a.Ke.dj) {
      var e = new P.i.gd;
      d.bj(e);
      e = e.W;
      if(e.y > 0) {
        for(var e = !1, g = 0;g < c.Q.Zb.Uc.length;g++) {
          if(c.Q.Zb.Uc[g].body == b) {
            c.Q.Zb.Uc[g].count++;
            e = !0;
            break
          }
        }
        e || c.Q.Zb.Uc.push({body:b, count:1});
        d.uf = d.uf || [];
        d.uf.push({Zb:c, ep:b})
      }
    }
    if(c.Q.type & a.Ke.Tk) {
      e = new P.i.gd, d.bj(e), e = e.W, e.y > 0 && c.Q.li.top ? U.G.oi(c) : e.y < 0 && c.Q.li.bottom ? U.G.oi(c) : e.x > 0 && c.Q.li.left ? U.G.oi(c) : e.x < 0 && c.Q.li.right && U.G.oi(c)
    }
  }
  function e(d, c) {
    if(c.Q.type & a.Ke.Xk) {
      d.disabled = !0;
      var b = new P.i.gd;
      d.bj(b);
      b = b.W;
      if(!c.Q.qi.$p && b.y > 0) {
        d.disabled = !1
      }else {
        if(!c.Q.qi.Xp && b.y < 0) {
          d.disabled = !1
        }else {
          if(!c.Q.qi.Zp && b.x > 0) {
            d.disabled = !1
          }else {
            if(!c.Q.qi.Yp && b.x < 0) {
              d.disabled = !1
            }
          }
        }
      }
    }
  }
  a.Aq = new P.a.f.g(0, 9.8);
  a.zg = {sn:new P.a.f.g(0, 9.8), yn:2.25, ml:5, En:1};
  a.Ke = {Xk:1, dj:2, Eq:4, Tk:8};
  a.Pc = {ul:1, ej:2, Mh:4, kj:8};
  a.Vc = function() {
    U.G.jo(a)
  };
  a.gm = function(d, c) {
    d.Q = d.Q || {};
    d.Q.type |= a.Ke.Xk;
    d.Q.qi = {$p:c & a.Pc.ul, Xp:c & a.Pc.Mh, Yp:c & a.Pc.ej, Zp:c & a.Pc.kj}
  };
  a.lp = function(d, c) {
    d.Q = d.Q || {};
    d.Q.type |= a.Ke.dj;
    d.Q.Zb = {Uc:[], Ni:c, op:function() {
      var c = d.Q.Zb.Uc;
      if(c.length > 0) {
        var e = d.body.A * d.Q.Zb.Ni * a.zg.yn, g = d.body.e.k, j = d.body.m;
        j.y = 0;
        d.body.pj(j);
        d.body.Lh(new P.a.f.g(0, -e), g);
        for(j = 0;j < c.length;j++) {
          c[j].body.Lh(new P.a.f.g(0, e / c.length), g)
        }
      }
    }}
  };
  a.mp = function(d, c, b) {
    d.Q = d.Q || {};
    d.Q.type |= a.Ke.dj;
    d.Q.jg = {xl:b, Ni:c, yk:function() {
      var a = d.body.m, a = Math.min(a.x + d.Q.jg.xl, d.Q.jg.Ni) - a.x;
      a > 0 && d.body.Lh(new P.a.f.g(d.body.A * a, 0), d.body.e.k)
    }, xk:function() {
      var a = d.body.m, a = Math.max(a.x - d.Q.jg.xl, -d.Q.jg.Ni) - a.x;
      a < 0 && d.body.Lh(new P.a.f.g(d.body.A * a, 0), d.body.e.k)
    }}
  };
  a.kp = function(d, c) {
    d.Q = d.Q || {};
    d.Q.type |= a.Ke.Tk;
    d.Q.li = {top:c & a.Pc.ul, bottom:c & a.Pc.Mh, left:c & a.Pc.ej, right:c & a.Pc.kj}
  };
  a.Rj = function(d, c) {
    var b = U.G.mi(d, c, !0, {Zf:!0}, {ae:0});
    b.Q = {};
    a.lp(b, a.zg.ml);
    a.mp(b, a.zg.ml, a.zg.En);
    var e = new P.i.H.ec;
    e.nj(0.01, d.y / 2, new P.a.f.g(-d.x / 2, 0));
    b.br = U.G.wj(b.body, {Hc:0}, e);
    e.nj(0.01, d.y / 2, new P.a.f.g(d.x / 2, 0));
    b.pr = U.G.wj(b.body, {Hc:0}, e);
    b.le = {};
    b.le.Wp = new Rb(function() {
      b.Q.Zb.op()
    }, "Move Up");
    b.le.Vp = new Rb(q(), "Move Down");
    b.le.xk = new Rb(function() {
      b.Q.jg.xk()
    }, "Move Left");
    b.le.yk = new Rb(function() {
      b.Q.jg.yk()
    }, "Move Right");
    return b
  };
  a.Ig = p;
  a.fd = p;
  a.wl = function(a) {
    var c = a.fa.M.object, b = a.ha.M.object;
    !a.disabled && c.Q && e(a, c);
    !a.disabled && b.Q && e(a, b)
  };
  a.vg = function(a) {
    if(!a.disabled) {
      var c = a.fa.M, b = c.object, e = a.ha.M, i = e.object;
      b.Q && g(a, b, e);
      i.Q && g(a, i, c)
    }
  };
  a.Gf = function(a) {
    if(a.uf) {
      for(var c = 0;c < a.uf.length;c++) {
        for(var b = a.uf[c].Zb, e = a.uf[c].ep, g = [], j = 0;j < b.Q.Zb.Uc.length;j++) {
          b.Q.Zb.Uc[j].body == e ? (b.Q.Zb.Uc[j].count--, b.Q.Zb.Uc[j].count > 0 && g.push(b.Q.Zb.Uc[j])) : g.push(b.Q.Zb.Uc[j])
        }
        b.Q.Zb.Uc = g
      }
      a.uf = p
    }
  };
  a.Hg = p;
  a.Gg = p;
  a.q = function(a, c) {
    U.G.Rc(a, c, !0)
  };
  a.Fc = function(d, c) {
    var b, e = U.G.Rc(d, c, !0, {rc:Math.PI * Math.random() * 0}, p);
    if(b === f || b === p) {
      b = a.Pc.Mh | a.Pc.ej | a.Pc.kj
    }
    a.gm(e, b)
  };
  a.jd = function(d, c) {
    var b, e = U.G.Rc(d, c, !0, {rc:Math.PI * Math.random() * 0}, p);
    if(b === f || b === p) {
      b = a.Pc.Mh
    }
    a.kp(e, b)
  }
})(U.l);
var Sb = {}, W;
(function(a) {
  var g = new P.a.f.g(200, 80), e = new P.a.f.g(600, 400), d;
  a.Vc = function(c, b) {
    U.Vc(a, c, g, U.l.zg.sn, e, 20, b);
    U.l.Vc();
    var d = new P.a.f.g(13, g.y - 45);
    a.Oo();
    a.No();
    a.Lo();
    a.Rj(d);
    a.Mo(new P.a.f.g(13, g.y - 40));
    U.start()
  };
  a.Rj = function(a) {
    var b = new P.a.f.g(0, 0), e = new P.a.f.g(21, 47), g = new P.a.f.g(e.x / 20, e.y / 20);
    W = U.l.Rj(g, a);
    U.yl.iq(g, b, e);
    d = new Fb("main");
    d.Ih(W.le.Wp, 87, !1, !1, !1);
    d.Ih(W.le.xk, 65, !1, !1, !1);
    d.Ih(W.le.Vp, 83, !1, !1, !1);
    d.Ih(W.le.yk, 68, !1, !1, !1)
  };
  a.Oo = function() {
    var c = new P.a.f.g(3, 0.25);
    U.G.Rc(new P.a.f.g(5, 0.25), new P.a.f.g(16, g.y - 1.5), !0, {rc:Math.PI / 3}, p);
    U.l.Fc(c, new P.a.f.g(12, g.y - 2.5));
    U.l.Fc(c, new P.a.f.g(10, g.y - 5));
    U.l.Fc(c, new P.a.f.g(8, g.y - 7.5));
    U.l.Fc(c, new P.a.f.g(6, g.y - 10));
    U.l.Fc(c, new P.a.f.g(4, g.y - 12.5));
    U.l.Fc(c, new P.a.f.g(2, g.y - 15));
    U.l.Fc(c, new P.a.f.g(8, g.y - 17.5));
    U.l.Fc(c, new P.a.f.g(10, g.y - 20));
    U.l.Fc(c, new P.a.f.g(12, g.y - 22.5));
    U.l.Fc(c, new P.a.f.g(10, g.y - 27.5));
    U.l.Fc(c, new P.a.f.g(10, g.y - 31));
    U.l.Fc(c, new P.a.f.g(10, g.y - 34.5));
    U.l.Fc(c, new P.a.f.g(10, g.y - 38));
    U.l.q(new P.a.f.g(g.x - 14, 0.5), new P.a.f.g(g.x / 2 + 7, g.y - 25));
    a.Ko(new P.a.f.g(30, 5), new P.a.f.g(20, g.y - 25))
  };
  a.Ko = function(a, b) {
    U.G.Rc(new P.a.f.g(0.25, Math.sqrt(a.y * a.y * 2)), new P.a.f.g(b.x + a.y / 2, b.y - a.y / 2), !0, {rc:Math.PI / 4}, p);
    U.G.Rc(new P.a.f.g(0.25, a.y), new P.a.f.g(b.x + a.y, b.y - a.y / 2), !0, p, p);
    U.G.Rc(new P.a.f.g(0.25, a.y), new P.a.f.g(b.x + a.x, b.y - a.y / 2), !0, p, p);
    for(var d = new P.i.H.Cc(0.15), e = a.y + 1;e < a.x;e += 0.3) {
      for(var g = 0;g < a.y;g += 1) {
        var k = U.G.nh(new P.a.f.g(0.3, 0.3), new P.a.f.g(b.x + e + (Math.random() - 0.5) / 2, b.y - a.y), !0, p, {bf:0.1, ae:0, Hc:0.1}, d), m = Math.random();
        m <= 0.25 ? U.Z.td(k.body, "graphics/ball-red.png") : m <= 0.5 ? U.Z.td(k.body, "graphics/ball-green.png") : m <= 0.75 ? U.Z.td(k.body, "graphics/ball-yellow.png") : U.Z.td(k.body, "graphics/ball-blue.png")
      }
    }
  };
  a.No = function() {
    for(var a = new P.c.o.Qf, b = new P.c.o.Tf, d = !1, e = 20;e <= g.x - 10;e += 8) {
      U.G.xb().rc = e / g.x * Math.PI;
      var j = g.y - 14;
      d && (j += 8);
      var d = !d, k = U.G.Rc(new P.a.f.g(0.1, 0.1), new P.a.f.g(e, j));
      k.body.display = p;
      var m = U.G.mi(new P.a.f.g(10, 1), new P.a.f.g(e, j));
      U.Z.td(m.body, "graphics/spinner.png");
      U.l.gm(m, !1);
      j = U.G.mi(new P.a.f.g(10, 1), new P.a.f.g(e, j));
      j.body.Ln();
      U.Z.td(j.body, "graphics/spinner.png");
      a.$a(k.body, m.body, k.body.e.k);
      U.G.Qd().Ui(a);
      a.$a(k.body, j.body, k.body.e.k);
      U.G.Qd().Ui(a);
      b.$a(m.body, j.body, m.body.e.k);
      U.G.Qd().Ui(b)
    }
  };
  a.Lo = function() {
    U.G.xb().type = P.c.sa.Eb;
    U.G.xb().Zf = !1;
    U.G.Tc().ae = 2.5;
    U.G.Tc().shape = new P.i.H.Cc(0.25);
    for(var a = 0;a < 0;a++) {
      var b = a * 5 % (g.x - 10);
      U.G.xb().position.y = 15 + a % 20;
      U.G.xb().position.x = b + a % 20 / 20 + 4.5;
      b = U.G.Qd().Ef(U.G.xb());
      b.display = {};
      b.display.size = new P.a.f.g(0.5, 0.5);
      b.xg(U.G.Tc())
    }
    U.G.Tc().shape = new P.i.H.ec;
    U.G.Tc().shape.mj(0.25, 0.25);
    for(a = 0;a < 0;a++) {
      b = a * 5 % (g.x - 10), U.G.xb().position.y = 15 + (a + 5) % 20, U.G.xb().position.x = b + (a + 5) % 20 / 20 + 4.5, U.G.xb().rc = a % 17 / 17, b = U.G.Qd().Ef(U.G.xb()), b.display = {}, b.display.size = new P.a.f.g(0.5, 0.5), b.xg(U.G.Tc())
    }
    U.G.Tc().shape = new P.i.H.ec;
    U.G.Tc().shape.lj([new P.a.f.g(-0.5, -0.5), new P.a.f.g(0.5, -0.5), new P.a.f.g(-0.5, 0.5)], 3);
    for(a = 0;a < 0;a++) {
      b = a * 5 % (g.x - 10), U.G.xb().position.y = 15 + (a + 10) % 20, U.G.xb().position.x = b + (a + 10) % 20 / 20 + 4.5, U.G.xb().rc = a % 22 / 22, b = U.G.Qd().Ef(U.G.xb()), b.display = {}, b.display.size = new P.a.f.g(0.75, 0.75), b.xg(U.G.Tc())
    }
    U.G.Tc().shape = new P.i.H.ec;
    U.G.Tc().shape.lj([new P.a.f.g(-0.5, -0.5), new P.a.f.g(0, -0.5), new P.a.f.g(0.5, 0), new P.a.f.g(0.5, 0.5), new P.a.f.g(0, 0.3)], 5);
    for(a = 0;a < 0;a++) {
      b = a * 5 % (g.x - 10), U.G.xb().position.y = 15 + (a + 15) % 20, U.G.xb().position.x = b + (a + 15) % 20 / 20 + 4.5, U.G.xb().rc = a % 35 / 35, b = U.G.Qd().Ef(U.G.xb()), b.display = {}, b.display.size = new P.a.f.g(0.75, 0.75), b.xg(U.G.Tc())
    }
  };
  a.Mo = function(a) {
    var b = new P.a.f.g(1.5, 1.5), a = new P.a.f.g(a.x + b.x / 2, a.y + b.y / 2);
    U.l.q(b, new P.a.f.g(a.x, a.y));
    U.l.q(b, new P.a.f.g(a.x + b.x, a.y));
    U.l.q(b, new P.a.f.g(a.x + b.x * 2, a.y));
    U.l.q(b, new P.a.f.g(a.x + b.x * 3, a.y));
    U.l.q(b, new P.a.f.g(a.x + b.x * 4, a.y));
    U.l.q(b, new P.a.f.g(a.x + b.x * 5, a.y));
    U.l.q(b, new P.a.f.g(a.x + b.x * 6, a.y));
    U.l.q(b, new P.a.f.g(a.x + b.x * 7, a.y));
    U.l.q(b, new P.a.f.g(a.x + b.x * 8, a.y));
    U.l.q(b, new P.a.f.g(a.x + b.x * 9, a.y));
    U.l.q(b, new P.a.f.g(a.x + b.x * 10, a.y));
    U.l.q(b, new P.a.f.g(a.x + b.x * 11, a.y));
    U.l.q(b, new P.a.f.g(a.x + b.x * 12, a.y));
    U.l.q(b, new P.a.f.g(a.x + b.x * 13, a.y));
    U.l.q(b, new P.a.f.g(a.x + b.x * 14, a.y));
    U.l.q(b, new P.a.f.g(a.x + b.x * 15, a.y));
    U.l.q(b, new P.a.f.g(a.x + b.x * 16, a.y));
    U.l.jd(b, new P.a.f.g(a.x + b.x * 16, a.y - b.y * 4));
    U.l.q(b, new P.a.f.g(a.x + b.x * 17, a.y));
    U.l.q(b, new P.a.f.g(a.x + b.x * 18, a.y));
    U.l.q(b, new P.a.f.g(a.x + b.x * 19, a.y));
    U.l.q(b, new P.a.f.g(a.x + b.x * 20, a.y));
    U.l.jd(b, new P.a.f.g(a.x + b.x * 20, a.y - b.y * 4));
    U.l.q(b, new P.a.f.g(a.x + b.x * 21, a.y));
    U.l.jd(b, new P.a.f.g(a.x + b.x * 21, a.y - b.y * 4));
    U.l.q(b, new P.a.f.g(a.x + b.x * 22, a.y));
    U.l.jd(b, new P.a.f.g(a.x + b.x * 22, a.y - b.y * 4));
    U.l.jd(b, new P.a.f.g(a.x + b.x * 22, a.y - b.y * 8));
    U.l.q(b, new P.a.f.g(a.x + b.x * 23, a.y));
    U.l.jd(b, new P.a.f.g(a.x + b.x * 23, a.y - b.y * 4));
    U.l.q(b, new P.a.f.g(a.x + b.x * 24, a.y));
    U.l.jd(b, new P.a.f.g(a.x + b.x * 24, a.y - b.y * 4));
    U.l.q(b, new P.a.f.g(a.x + b.x * 25, a.y));
    U.l.q(b, new P.a.f.g(a.x + b.x * 26, a.y));
    U.l.q(b, new P.a.f.g(a.x + b.x * 27, a.y));
    U.l.q(b, new P.a.f.g(a.x + b.x * 28, a.y));
    U.l.q(b, new P.a.f.g(a.x + b.x * 28, a.y - b.y * 1));
    U.l.q(b, new P.a.f.g(a.x + b.x * 28, a.y - b.y * 2));
    U.l.q(b, new P.a.f.g(a.x + b.x * 29, a.y));
    U.l.q(b, new P.a.f.g(a.x + b.x * 29, a.y - b.y * 1));
    U.l.q(b, new P.a.f.g(a.x + b.x * 29, a.y - b.y * 2));
    U.l.q(b, new P.a.f.g(a.x + b.x * 30, a.y));
    U.l.q(b, new P.a.f.g(a.x + b.x * 31, a.y));
    U.l.q(b, new P.a.f.g(a.x + b.x * 32, a.y));
    U.l.q(b, new P.a.f.g(a.x + b.x * 33, a.y));
    U.l.q(b, new P.a.f.g(a.x + b.x * 34, a.y));
    U.l.q(b, new P.a.f.g(a.x + b.x * 35, a.y));
    U.l.q(b, new P.a.f.g(a.x + b.x * 36, a.y));
    U.l.q(b, new P.a.f.g(a.x + b.x * 37, a.y));
    U.l.q(b, new P.a.f.g(a.x + b.x * 38, a.y));
    U.l.q(b, new P.a.f.g(a.x + b.x * 38, a.y - b.y * 1));
    U.l.q(b, new P.a.f.g(a.x + b.x * 38, a.y - b.y * 2));
    U.l.q(b, new P.a.f.g(a.x + b.x * 38, a.y - b.y * 3));
    U.l.q(b, new P.a.f.g(a.x + b.x * 39, a.y));
    U.l.q(b, new P.a.f.g(a.x + b.x * 39, a.y - b.y * 1));
    U.l.q(b, new P.a.f.g(a.x + b.x * 39, a.y - b.y * 2));
    U.l.q(b, new P.a.f.g(a.x + b.x * 39, a.y - b.y * 3));
    U.l.q(b, new P.a.f.g(a.x + b.x * 40, a.y));
    U.l.q(b, new P.a.f.g(a.x + b.x * 41, a.y));
    U.l.q(b, new P.a.f.g(a.x + b.x * 42, a.y));
    U.l.q(b, new P.a.f.g(a.x + b.x * 43, a.y));
    U.l.q(b, new P.a.f.g(a.x + b.x * 44, a.y));
    U.l.q(b, new P.a.f.g(a.x + b.x * 45, a.y));
    U.l.q(b, new P.a.f.g(a.x + b.x * 46, a.y));
    U.l.q(b, new P.a.f.g(a.x + b.x * 46, a.y - b.y * 1));
    U.l.q(b, new P.a.f.g(a.x + b.x * 46, a.y - b.y * 2));
    U.l.q(b, new P.a.f.g(a.x + b.x * 46, a.y - b.y * 3));
    U.l.q(b, new P.a.f.g(a.x + b.x * 46, a.y - b.y * 4));
    U.l.q(b, new P.a.f.g(a.x + b.x * 47, a.y));
    U.l.q(b, new P.a.f.g(a.x + b.x * 47, a.y - b.y * 1));
    U.l.q(b, new P.a.f.g(a.x + b.x * 47, a.y - b.y * 2));
    U.l.q(b, new P.a.f.g(a.x + b.x * 47, a.y - b.y * 3));
    U.l.q(b, new P.a.f.g(a.x + b.x * 47, a.y - b.y * 4));
    U.l.q(b, new P.a.f.g(a.x + b.x * 48, a.y));
    U.l.q(b, new P.a.f.g(a.x + b.x * 49, a.y));
    U.l.q(b, new P.a.f.g(a.x + b.x * 50, a.y));
    U.l.q(b, new P.a.f.g(a.x + b.x * 51, a.y));
    U.l.q(b, new P.a.f.g(a.x + b.x * 52, a.y));
    U.l.q(b, new P.a.f.g(a.x + b.x * 53, a.y));
    U.l.q(b, new P.a.f.g(a.x + b.x * 54, a.y));
    U.l.q(b, new P.a.f.g(a.x + b.x * 55, a.y));
    U.l.q(b, new P.a.f.g(a.x + b.x * 56, a.y));
    U.l.q(b, new P.a.f.g(a.x + b.x * 57, a.y));
    U.l.q(b, new P.a.f.g(a.x + b.x * 57, a.y - b.y * 1));
    U.l.q(b, new P.a.f.g(a.x + b.x * 57, a.y - b.y * 2));
    U.l.q(b, new P.a.f.g(a.x + b.x * 57, a.y - b.y * 3));
    U.l.q(b, new P.a.f.g(a.x + b.x * 57, a.y - b.y * 4));
    U.l.q(b, new P.a.f.g(a.x + b.x * 58, a.y));
    U.l.q(b, new P.a.f.g(a.x + b.x * 58, a.y - b.y * 1));
    U.l.q(b, new P.a.f.g(a.x + b.x * 58, a.y - b.y * 2));
    U.l.q(b, new P.a.f.g(a.x + b.x * 58, a.y - b.y * 3));
    U.l.q(b, new P.a.f.g(a.x + b.x * 58, a.y - b.y * 4));
    U.l.q(b, new P.a.f.g(a.x + b.x * 59, a.y));
    U.l.q(b, new P.a.f.g(a.x + b.x * 60, a.y));
    U.l.q(b, new P.a.f.g(a.x + b.x * 61, a.y));
    U.l.q(b, new P.a.f.g(a.x + b.x * 62, a.y));
    U.l.q(b, new P.a.f.g(a.x + b.x * 63, a.y));
    U.l.q(b, new P.a.f.g(a.x + b.x * 64, a.y));
    U.l.jd(b, new P.a.f.g(a.x + b.x * 64, a.y - b.y * 5));
    U.l.q(b, new P.a.f.g(a.x + b.x * 65, a.y));
    U.l.q(b, new P.a.f.g(a.x + b.x * 66, a.y));
    U.l.q(b, new P.a.f.g(a.x + b.x * 67, a.y));
    U.l.q(b, new P.a.f.g(a.x + b.x * 68, a.y));
    U.l.q(b, new P.a.f.g(a.x + b.x * 71, a.y));
    U.l.q(b, new P.a.f.g(a.x + b.x * 72, a.y));
    U.l.q(b, new P.a.f.g(a.x + b.x * 73, a.y));
    U.l.q(b, new P.a.f.g(a.x + b.x * 74, a.y));
    U.l.q(b, new P.a.f.g(a.x + b.x * 75, a.y));
    U.l.q(b, new P.a.f.g(a.x + b.x * 76, a.y));
    U.l.q(b, new P.a.f.g(a.x + b.x * 77, a.y));
    U.l.jd(b, new P.a.f.g(a.x + b.x * 77, a.y - b.y * 4));
    U.l.q(b, new P.a.f.g(a.x + b.x * 78, a.y));
    U.l.jd(b, new P.a.f.g(a.x + b.x * 78, a.y - b.y * 4));
    U.l.q(b, new P.a.f.g(a.x + b.x * 79, a.y));
    U.l.jd(b, new P.a.f.g(a.x + b.x * 79, a.y - b.y * 4))
  };
  a.Gm = function(a, b) {
    d.fp(b)
  };
  a.Fm = function() {
    U.Z.lm(W.body.e.k)
  }
})(Sb);
var Tb = Sb.Vc, Ub = "test.init".split("."), $ = O;
!(Ub[0] in $) && $.execScript && $.execScript("var " + Ub[0]);
for(var Vb;Ub.length && (Vb = Ub.shift());) {
  !Ub.length && Tb !== f ? $[Vb] = Tb : $ = $[Vb] ? $[Vb] : $[Vb] = {}
}
;

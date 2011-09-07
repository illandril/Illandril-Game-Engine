var i = void 0, p = null;
function r() {
  return function() {
  }
}
function t(a) {
  return function() {
    return this[a]
  }
}
function aa(a) {
  return function() {
    return a
  }
}
var x, z = this;
function ba(a, d) {
  var b = a.split("."), c = z;
  !(b[0] in c) && c.execScript && c.execScript("var " + b[0]);
  for(var e;b.length && (e = b.shift());) {
    !b.length && d !== i ? c[e] = d : c = c[e] ? c[e] : c[e] = {}
  }
}
function ca() {
}
function da(a) {
  var d = typeof a;
  if(d == "object") {
    if(a) {
      if(a instanceof Array) {
        return"array"
      }else {
        if(a instanceof Object) {
          return d
        }
      }
      var b = Object.prototype.toString.call(a);
      if(b == "[object Window]") {
        return"object"
      }
      if(b == "[object Array]" || typeof a.length == "number" && typeof a.splice != "undefined" && typeof a.propertyIsEnumerable != "undefined" && !a.propertyIsEnumerable("splice")) {
        return"array"
      }
      if(b == "[object Function]" || typeof a.call != "undefined" && typeof a.propertyIsEnumerable != "undefined" && !a.propertyIsEnumerable("call")) {
        return"function"
      }
    }else {
      return"null"
    }
  }else {
    if(d == "function" && typeof a.call == "undefined") {
      return"object"
    }
  }
  return d
}
var ea = "closure_uid_" + Math.floor(Math.random() * 2147483648).toString(36), fa = 0;
function A(a, d) {
  function b() {
  }
  b.prototype = d.prototype;
  a.$g = d.prototype;
  a.prototype = new b;
  a.prototype.constructor = a
}
;function D(a, d) {
  this.x = a;
  this.y = d
}
x = D.prototype;
x.ca = function() {
  this.y = this.x = 0
};
x.i = function(a, d) {
  this.x = a;
  this.y = d
};
x.l = function(a) {
  this.x = a.x;
  this.y = a.y
};
x.Ec = function() {
  return new D(-this.x, -this.y)
};
x.lg = function() {
  this.x = -this.x;
  this.y = -this.y
};
x.la = function() {
  return new D(this.x, this.y)
};
x.Hd = function(a) {
  this.x += a.x;
  this.y += a.y
};
x.kg = function(a) {
  this.x *= a;
  this.y *= a
};
function ga(a) {
  return a.x * a.x + a.y * a.y
}
function E(a) {
  var d = Math.sqrt(ga(a));
  d < Number.MIN_VALUE || (d = 1 / d, a.x *= d, a.y *= d)
}
;function ha() {
  this.a = new D(0, 0);
  this.b = new D(0, 0);
  this.re()
}
x = ha.prototype;
x.i = function(a) {
  var d = Math.cos(a), a = Math.sin(a);
  this.a.i(d, a);
  this.b.i(-a, d)
};
x.la = function() {
  var a = new ha;
  a.fd(this);
  return a
};
x.fd = function(a) {
  this.a.l(a.a);
  this.b.l(a.b)
};
x.Xe = function(a) {
  this.a.Hd(a.a);
  this.b.Hd(a.b)
};
x.re = function() {
  this.a.i(1, 0);
  this.b.i(0, 1)
};
x.ca = function() {
  this.a.i(0, 0);
  this.b.i(0, 0)
};
x.Pb = function() {
  return Math.atan2(this.a.y, this.a.x)
};
x.Ud = function(a, d, b) {
  var c = this.a.x * this.b.y - this.b.x * this.a.y;
  c != 0 && (c = 1 / c);
  a.x = c * (this.b.y * d - this.b.x * b);
  a.y = c * (this.a.x * b - this.a.y * d);
  return a
};
function ia(a, d) {
  return a.x * d.x + a.y * d.y
}
function ja(a, d) {
  return a.x * d.y - a.y * d.x
}
function ka(a) {
  return new D(1 * a.y, -1 * a.x)
}
function la(a, d) {
  return new D(a.a.x * d.x + a.b.x * d.y, a.a.y * d.x + a.b.y * d.y)
}
function ma(a, d) {
  return new D(ia(d, a.a), ia(d, a.b))
}
function F(a, d) {
  var b = la(a.d, d);
  b.x += a.position.x;
  b.y += a.position.y;
  return b
}
function na(a, d) {
  var b = G(d, a.position), c = b.x * a.d.a.x + b.y * a.d.a.y;
  b.y = b.x * a.d.b.x + b.y * a.d.b.y;
  b.x = c;
  return b
}
function G(a, d) {
  return new D(a.x - d.x, a.y - d.y)
}
function H(a, d, b) {
  return a < d ? d : a > b ? b : a
}
;function I(a) {
  if(!a) {
    throw"Assertion Failed";
  }
}
var oa = 2 / 180 * Math.PI, pa = 8 / 180 * Math.PI, qa = 0.5 * Math.PI, ra = qa * qa, sa = 2 / 180 * Math.PI;
function ta() {
}
ta.prototype.i = function(a) {
  this.Da.l(a.Da);
  this.tb.l(a.tb);
  this.ua.l(a.ua);
  this.k = a.k;
  this.ga = a.ga;
  this.ha = a.ha
};
function ua(a) {
  return a.t == 1 ? 0 : a.t == 2 ? Math.sqrt(ga(G(a.O.ua, a.X.ua))) : a.t == 3 ? ja(G(a.X.ua, a.O.ua), G(a.Za.ua, a.O.ua)) : (I(!1), 0)
}
;function va() {
}
(function(a) {
  a.fg = function(d, b, c) {
    var e = a.D, f = c.fb, g = c.Te, h = c.gb, k = c.Ue;
    I(0 <= b.count && b.count <= 3);
    var j, o;
    e.t = b.count;
    for(var n = e.j, s = 0;s < e.t;s++) {
      var q = n[s];
      q.ga = b.ga[s];
      q.ha = b.ha[s];
      j = f.va(q.ga);
      o = h.va(q.ha);
      q.Da = F(g, j);
      q.tb = F(k, o);
      q.ua = G(q.tb, q.Da);
      q.k = 0
    }
    if(e.t > 1 && (j = b.Xi, o = ua(e), o < 0.5 * j || 2 * j < o || o < Number.MIN_VALUE)) {
      e.t = 0
    }
    if(e.t == 0) {
      q = n[0], q.ga = 0, q.ha = 0, j = f.va(0), o = h.va(0), q.Da = F(g, j), q.tb = F(k, o), q.ua = G(q.tb, q.Da), e.t = 1
    }
    (a.D.t < 1 || a.D.t > 3) && I(!1);
    for(e = 0;e < 20;) {
      f = [];
      for(g = 0;g < a.D.t;g++) {
        f[g] = {}, f[g].ga = a.D.j[g].ga, f[g].ha = a.D.j[g].ha
      }
      if(a.D.t == 2) {
        g = a.D, h = g.O.ua, k = g.X.ua, n = G(k, h), h = -(h.x * n.x + h.y * n.y), h <= 0 ? (g.O.k = 1, g.t = 1) : (k = k.x * n.x + k.y * n.y, k <= 0 ? (g.X.k = 1, g.t = 1, g.O.i(g.X)) : (n = 1 / (k + h), g.O.k = k * n, g.X.k = h * n, g.t = 2))
      }else {
        if(a.D.t == 3) {
          var g = a.D, q = g.O.ua, v = g.X.ua, u = g.Za.ua, w = G(v, q), h = ia(v, w), k = -ia(q, w), y = G(u, q), n = ia(u, y);
          j = -ia(q, y);
          s = G(u, v);
          o = ia(u, s);
          s = -ia(v, s);
          y = ja(w, y);
          w = y * ja(v, u);
          u = y * ja(u, q);
          q = y * ja(q, v);
          k <= 0 && j <= 0 ? (g.O.k = 1, g.t = 1) : h > 0 && k > 0 && q <= 0 ? (n = 1 / (h + k), g.O.k = h * n, g.X.k = k * n, g.t = 2) : n > 0 && j > 0 && u <= 0 ? (h = 1 / (n + j), g.O.k = n * h, g.Za.k = j * h, g.t = 2, g.X.i(g.Za)) : h <= 0 && s <= 0 ? (g.X.k = 1, g.t = 1, g.O.i(g.X)) : n <= 0 && o <= 0 ? (g.Za.k = 1, g.t = 1, g.O.i(g.Za)) : o > 0 && s > 0 && w <= 0 ? (h = 1 / (o + s), g.X.k = o * h, g.Za.k = s * h, g.t = 2, g.O.i(g.Za)) : (h = 1 / (w + u + q), g.O.k = w * h, g.X.k = u * h, g.Za.k = 
          q * h, g.t = 3)
        }
      }
      if(a.D.t == 3) {
        break
      }
      g = a.D;
      g.t == 1 ? g = g.O.ua.Ec() : g.t == 2 ? (h = G(g.X.ua, g.O.ua), g = ja(h, g.O.ua.Ec()) > 0 ? new D(-1 * h.y, 1 * h.x) : ka(h)) : (I(!1), g = new D(0, 0));
      if(ga(g) < wa) {
        break
      }
      a.D.j[a.D.t].ga = c.fb.qe(ma(c.Te.d, g.Ec()));
      a.D.j[a.D.t].Da = F(c.Te, c.fb.va(a.D.j[a.D.t].ga));
      a.D.j[a.D.t].ha = c.gb.qe(ma(c.Ue.d, g));
      a.D.j[a.D.t].tb = F(c.Ue, c.gb.va(a.D.j[a.D.t].ha));
      a.D.j[a.D.t].ua = G(a.D.j[a.D.t].tb, a.D.j[a.D.t].Da);
      e++;
      h = !1;
      for(g = 0;g < f.length;g++) {
        if(a.D.j[a.D.t].ga == f[g].ga && a.D.j[a.D.t].ha == f[g].ha) {
          h = !0;
          break
        }
      }
      if(h) {
        break
      }
      a.D.t++
    }
    f = a.D;
    g = d.gc;
    h = d.hc;
    f.t == 1 ? (g.l(f.O.Da), h.l(f.O.tb)) : f.t == 2 ? (g.x = f.O.k * f.O.Da.x + f.X.k * f.X.Da.x, g.y = f.O.k * f.O.Da.y + f.X.k * f.X.Da.y, h.x = f.O.k * f.O.tb.x + f.X.k * f.X.tb.x, h.y = f.O.k * f.O.tb.y + f.X.k * f.X.tb.y) : f.t == 3 ? (h.x = g.x = f.O.k * f.O.Da.x + f.X.k * f.X.Da.x + f.Za.k * f.Za.Da.x, h.y = g.y = f.O.k * f.O.Da.y + f.X.k * f.X.Da.y + f.Za.k * f.Za.Da.y) : I(!1);
    d.nd = Math.sqrt(ga(G(d.gc, d.hc)));
    d.Lj = e;
    e = a.D;
    b.Xi = ua(e);
    b.count = e.t;
    f = e.j;
    for(g = 0;g < e.t;g++) {
      b.ga[g] = f[g].ga, b.ha[g] = f[g].ha
    }
    if(c.eh) {
      b = c.fb.N, c = c.gb.N, d.nd > b + c && d.nd > Number.MIN_VALUE ? (d.nd -= b + c, e = G(d.hc, d.gc), E(e), d.gc.x += b * e.x, d.gc.y += b * e.y, d.hc.x -= c * e.x, d.hc.y -= c * e.y) : (c = new D, c.x = 0.5 * (d.gc.x + d.hc.x), c.y = 0.5 * (d.gc.y + d.hc.y), d.gc.x = d.hc.x = c.x, d.gc.y = d.hc.y = c.y, d.nd = 0)
    }
  }
})(va);
va.D = new function() {
  this.O = new ta;
  this.X = new ta;
  this.Za = new ta;
  this.j = [this.O, this.X, this.Za]
};
function xa() {
}
;function ya() {
  this.gc = new D;
  this.hc = new D
}
;function za() {
  this.ga = [0, 0, 0];
  this.ha = [0, 0, 0]
}
;function Aa() {
}
(function(a) {
  a.prototype.i = function(a) {
    a.gf(this)
  };
  a.prototype.qe = function(a) {
    for(var b = 0, c = this.j[0].x * a.x + this.j[0].y * a.y, e = 1;e < this.t;e++) {
      var f = this.j[e].x * a.x + this.j[e].y * a.y;
      f > c && (b = e, c = f)
    }
    return b
  };
  a.prototype.Nd = function(a) {
    return this.j[this.qe(a)]
  };
  a.prototype.ig = t("t");
  a.prototype.va = function(a) {
    a === i && (a = 0);
    I(0 <= a && a < this.t);
    return this.j[a]
  }
})(Aa);
function J() {
  this.I = J.fi;
  this.N = 0.005
}
x = J.prototype;
x.la = aa(p);
x.i = function(a) {
  this.N = a.N
};
x.L = t("I");
x.Jd = r();
x.Ye = r();
x.gf = function() {
  I(!1)
};
J.Sb = function(a, d, b, c) {
  var e = new xa;
  e.fb = new Aa;
  e.fb.i(a);
  e.gb = new Aa;
  e.gb.i(b);
  e.Te = d;
  e.Ue = c;
  e.eh = !0;
  a = new za;
  a.count = 0;
  d = new ya;
  va.fg(d, a, e);
  return d.nd < 10 * Number.MIN_VALUE
};
J.fi = -1;
J.Nc = 0;
J.pc = 1;
J.ue = 2;
J.Gj = -1;
J.Fj = 0;
J.Ej = 1;
function Ba() {
  this.xc = 0;
  this.Kc = new D(0, 0);
  this.Od = 0
}
;function Ca(a, d) {
  this.position = new D;
  this.d = new ha;
  this.constructor === Ca && (a === i && (a = p), d === i && (d = p), a && (this.position.l(a), this.d.fd(d)))
}
Ca.prototype.wa = function(a, d) {
  this.position.l(a);
  this.d.fd(d)
};
Ca.prototype.re = function() {
  this.position.ca();
  this.d.re()
};
Ca.prototype.i = function(a) {
  this.position.l(a.position);
  this.d.fd(a.d)
};
Ca.prototype.Pb = function() {
  return Math.atan2(this.d.a.y, this.d.a.x)
};
function Da() {
  J.call(this);
  this.I = J.pc;
  this.qb = new D(0, 0);
  this.j = [];
  this.aa = []
}
A(Da, J);
x = Da.prototype;
x.la = function() {
  var a = new Da;
  a.i(this);
  return a
};
x.i = function(a) {
  J.prototype.i.call(this, a);
  if(a instanceof Da) {
    this.qb.l(a.qb);
    this.W = a.W;
    Ea(this, this.W);
    for(var d = 0;d < this.W;d++) {
      this.j[d].l(a.j[d]), this.aa[d].l(a.aa[d])
    }
  }
};
function Fa(a, d, b) {
  b === i && (b = 0);
  for(var c = [], e = 0, f, e = 0;e < d.length;++e) {
    f = d[e], c.push(f)
  }
  d = b;
  d === i && (d = 0);
  if(d == 0) {
    d = c.length
  }
  I(2 <= d);
  a.W = d;
  Ea(a, d);
  for(d = d = 0;d < a.W;d++) {
    a.j[d].l(c[d])
  }
  for(d = 0;d < a.W;++d) {
    c = G(a.j[d + 1 < a.W ? d + 1 : 0], a.j[d]), I(ga(c) > Number.MIN_VALUE), a.aa[d].l(ka(c)), E(a.aa[d])
  }
  c = a.j;
  d = a.W;
  d === i && (d = 0);
  b = new D(0, 0);
  e = 0;
  f = 1 / 3;
  for(var g = 0;g < d;++g) {
    var h = c[g], k = g + 1 < d ? c[g + 1] : c[0], j = 0.5 * ((h.x - 0) * (k.y - 0) - (h.y - 0) * (k.x - 0));
    e += j;
    b.x += j * f * (0 + h.x + k.x);
    b.y += j * f * (0 + h.y + k.y)
  }
  b.x *= 1 / e;
  b.y *= 1 / e;
  a.qb = b
}
function Ga(a, d, b) {
  d === i && (d = 0);
  b === i && (b = 0);
  a.W = 4;
  Ea(a, 4);
  a.j[0].i(-d, -b);
  a.j[1].i(d, -b);
  a.j[2].i(d, b);
  a.j[3].i(-d, b);
  a.aa[0].i(0, -1);
  a.aa[1].i(1, 0);
  a.aa[2].i(0, 1);
  a.aa[3].i(-1, 0);
  a.qb.ca()
}
x.Jd = function(a, d) {
  for(var b = d.d, c = this.j[0], e = d.position.x + (b.a.x * c.x + b.b.x * c.y), f = d.position.y + (b.a.y * c.x + b.b.y * c.y), g = e, h = f, k = 1;k < this.W;++k) {
    var c = this.j[k], j = d.position.x + (b.a.x * c.x + b.b.x * c.y), c = d.position.y + (b.a.y * c.x + b.b.y * c.y), e = e < j ? e : j, f = f < c ? f : c, g = g > j ? g : j, h = h > c ? h : c
  }
  a.lowerBound.x = e - this.N;
  a.lowerBound.y = f - this.N;
  a.upperBound.x = g + this.N;
  a.upperBound.y = h + this.N
};
x.Ye = function(a, d) {
  d === i && (d = 0);
  if(this.W == 2) {
    a.Kc.x = 0.5 * (this.j[0].x + this.j[1].x), a.Kc.y = 0.5 * (this.j[0].y + this.j[1].y), a.xc = 0, a.Od = 0
  }else {
    for(var b = 0, c = 0, e = 0, f = 0, g = 1 / 3, h = 0;h < this.W;++h) {
      var k = this.j[h], j = h + 1 < this.W ? this.j[h + 1] : this.j[0], o = k.x - 0, n = k.y - 0, s = j.x - 0, q = j.y - 0, v = o * q - n * s, u = 0.5 * v;
      e += u;
      b += u * g * (0 + k.x + j.x);
      c += u * g * (0 + k.y + j.y);
      k = o;
      f += v * (g * (0.25 * (k * k + s * k + s * s) + (0 * k + 0 * s)) + 0 + (g * (0.25 * (n * n + q * n + q * q) + (0 * n + 0 * q)) + 0))
    }
    a.xc = d * e;
    b *= 1 / e;
    c *= 1 / e;
    a.Kc.i(b, c);
    a.Od = d * f
  }
};
x.gf = function(a) {
  a.j = this.j;
  a.t = this.W;
  a.N = this.N
};
x.ig = t("W");
x.qe = function(a) {
  for(var d = 0, b = this.j[0].x * a.x + this.j[0].y * a.y, c = 1;c < this.W;++c) {
    var e = this.j[c].x * a.x + this.j[c].y * a.y;
    e > b && (d = c, b = e)
  }
  return d
};
x.Nd = function(a) {
  for(var d = 0, b = this.j[0].x * a.x + this.j[0].y * a.y, c = 1;c < this.W;++c) {
    var e = this.j[c].x * a.x + this.j[c].y * a.y;
    e > b && (d = c, b = e)
  }
  return this.j[d]
};
function Ea(a, d) {
  d === i && (d = 0);
  for(var b = a.j.length;b < d;b++) {
    a.j[b] = new D(0, 0), a.aa[b] = new D(0, 0)
  }
}
new ha;
function Ha(a, d) {
  for(var b = 0, c = String(a).replace(/^[\s\xa0]+|[\s\xa0]+$/g, "").split("."), e = String(d).replace(/^[\s\xa0]+|[\s\xa0]+$/g, "").split("."), f = Math.max(c.length, e.length), g = 0;b == 0 && g < f;g++) {
    var h = c[g] || "", k = e[g] || "", j = RegExp("(\\d*)(\\D*)", "g"), o = RegExp("(\\d*)(\\D*)", "g");
    do {
      var n = j.exec(h) || ["", "", ""], s = o.exec(k) || ["", "", ""];
      if(n[0].length == 0 && s[0].length == 0) {
        break
      }
      b = Ia(n[1].length == 0 ? 0 : parseInt(n[1], 10), s[1].length == 0 ? 0 : parseInt(s[1], 10)) || Ia(n[2].length == 0, s[2].length == 0) || Ia(n[2], s[2])
    }while(b == 0)
  }
  return b
}
function Ia(a, d) {
  if(a < d) {
    return-1
  }else {
    if(a > d) {
      return 1
    }
  }
  return 0
}
;var Ja, Ka, La, Ma;
function Na() {
  return z.navigator ? z.navigator.userAgent : p
}
Ma = La = Ka = Ja = !1;
var Oa;
if(Oa = Na()) {
  var Pa = z.navigator;
  Ja = Oa.indexOf("Opera") == 0;
  Ka = !Ja && Oa.indexOf("MSIE") != -1;
  La = !Ja && Oa.indexOf("WebKit") != -1;
  Ma = !Ja && !La && Pa.product == "Gecko"
}
var Qa = Ka, Ra = Ma, Sa = La, Ta = z.navigator, Ua = (Ta && Ta.platform || "").indexOf("Mac") != -1, Va;
a: {
  var Wa = "", Xa;
  if(Ja && z.opera) {
    var Ya = z.opera.version, Wa = typeof Ya == "function" ? Ya() : Ya
  }else {
    if(Ra ? Xa = /rv\:([^\);]+)(\)|;)/ : Qa ? Xa = /MSIE\s+([^\);]+)(\)|;)/ : Sa && (Xa = /WebKit\/(\S+)/), Xa) {
      var Za = Xa.exec(Na()), Wa = Za ? Za[1] : ""
    }
  }
  if(Qa) {
    var $a, ab = z.document;
    $a = ab ? ab.documentMode : i;
    if($a > parseFloat(Wa)) {
      Va = String($a);
      break a
    }
  }
  Va = Wa
}
var bb = {}, cb = {};
var db, eb = {8:"backspace", 9:"tab", 13:"enter", 16:"shift", 17:"ctrl", 18:"alt", 19:"pause", 20:"caps-lock", 27:"esc", 32:"space", 33:"pg-up", 34:"pg-down", 35:"end", 36:"home", 37:"left", 38:"up", 39:"right", 40:"down", 45:"insert", 46:"delete", 48:"0", 49:"1", 50:"2", 51:"3", 52:"4", 53:"5", 54:"6", 55:"7", 56:"8", 57:"9", 61:"equals", 65:"a", 66:"b", 67:"c", 68:"d", 69:"e", 70:"f", 71:"g", 72:"h", 73:"i", 74:"j", 75:"k", 76:"l", 77:"m", 78:"n", 79:"o", 80:"p", 81:"q", 82:"r", 83:"s", 84:"t", 
85:"u", 86:"v", 87:"w", 88:"x", 89:"y", 90:"z", 93:"context", 96:"num-0", 97:"num-1", 98:"num-2", 99:"num-3", 100:"num-4", 101:"num-5", 102:"num-6", 103:"num-7", 104:"num-8", 105:"num-9", 106:"num-multiply", 107:"num-plus", 109:"num-minus", 110:"num-period", 111:"num-division", 112:"f1", 113:"f2", 114:"f3", 115:"f4", 116:"f5", 117:"f6", 118:"f7", 119:"f8", 120:"f9", 121:"f10", 122:"f11", 123:"f12", 187:"equals", 188:",", 190:".", 191:"/", 220:"\\", 224:"win"};
var fb = Array.prototype, gb = fb.indexOf ? function(a, d, b) {
  return fb.indexOf.call(a, d, b)
} : function(a, d, b) {
  b = b == p ? 0 : b < 0 ? Math.max(0, a.length + b) : b;
  if(typeof a == "string") {
    return typeof d != "string" || d.length != 1 ? -1 : a.indexOf(d, b)
  }
  for(;b < a.length;b++) {
    if(b in a && a[b] === d) {
      return b
    }
  }
  return-1
};
Qa && (cb[9] || (cb[9] = Qa && document.documentMode && document.documentMode >= 9));
Qa && (bb["8"] || (bb["8"] = Ha(Va, "8") >= 0));
function hb() {
}
hb.prototype.Ag = !1;
hb.prototype.ld = function() {
  if(!this.Ag) {
    this.Ag = !0, this.md()
  }
};
hb.prototype.md = function() {
  this.ai && ib.apply(p, this.ai)
};
function ib(a) {
  for(var d = 0, b = arguments.length;d < b;++d) {
    var c = arguments[d], e = da(c);
    e == "array" || e == "object" && typeof c.length == "number" ? ib.apply(p, c) : c && typeof c.ld == "function" && c.ld()
  }
}
;function jb(a, d) {
  this.type = a;
  this.currentTarget = this.target = d
}
A(jb, hb);
jb.prototype.md = function() {
  delete this.type;
  delete this.target;
  delete this.currentTarget
};
jb.prototype.Pf = !1;
jb.prototype.kj = !0;
function kb(a) {
  kb[" "](a);
  return a
}
kb[" "] = ca;
function lb(a, d) {
  a && this.Db(a, d)
}
A(lb, jb);
x = lb.prototype;
x.target = p;
x.relatedTarget = p;
x.offsetX = 0;
x.offsetY = 0;
x.clientX = 0;
x.clientY = 0;
x.screenX = 0;
x.screenY = 0;
x.button = 0;
x.keyCode = 0;
x.charCode = 0;
x.ctrlKey = !1;
x.altKey = !1;
x.shiftKey = !1;
x.metaKey = !1;
x.gj = !1;
x.Dg = p;
x.Db = function(a, d) {
  var b = this.type = a.type;
  jb.call(this, b);
  this.target = a.target || a.srcElement;
  this.currentTarget = d;
  var c = a.relatedTarget;
  if(c) {
    if(Ra) {
      var e;
      a: {
        try {
          kb(c.nodeName);
          e = !0;
          break a
        }catch(f) {
        }
        e = !1
      }
      e || (c = p)
    }
  }else {
    if(b == "mouseover") {
      c = a.fromElement
    }else {
      if(b == "mouseout") {
        c = a.toElement
      }
    }
  }
  this.relatedTarget = c;
  this.offsetX = a.offsetX !== i ? a.offsetX : a.layerX;
  this.offsetY = a.offsetY !== i ? a.offsetY : a.layerY;
  this.clientX = a.clientX !== i ? a.clientX : a.pageX;
  this.clientY = a.clientY !== i ? a.clientY : a.pageY;
  this.screenX = a.screenX || 0;
  this.screenY = a.screenY || 0;
  this.button = a.button;
  this.keyCode = a.keyCode || 0;
  this.charCode = a.charCode || (b == "keypress" ? a.keyCode : 0);
  this.ctrlKey = a.ctrlKey;
  this.altKey = a.altKey;
  this.shiftKey = a.shiftKey;
  this.metaKey = a.metaKey;
  this.gj = Ua ? a.metaKey : a.ctrlKey;
  this.state = a.state;
  this.Dg = a;
  delete this.kj;
  delete this.Pf
};
x.md = function() {
  lb.$g.md.call(this);
  this.relatedTarget = this.currentTarget = this.target = this.Dg = p
};
function mb() {
}
var nb = 0;
x = mb.prototype;
x.key = 0;
x.Bd = !1;
x.vg = !1;
x.Db = function(a, d, b, c, e, f) {
  if(da(a) == "function") {
    this.Gg = !0
  }else {
    if(a && a.handleEvent && da(a.handleEvent) == "function") {
      this.Gg = !1
    }else {
      throw Error("Invalid listener argument");
    }
  }
  this.be = a;
  this.Vg = d;
  this.src = b;
  this.type = c;
  this.capture = !!e;
  this.Eg = f;
  this.vg = !1;
  this.key = ++nb;
  this.Bd = !1
};
x.handleEvent = function(a) {
  return this.Gg ? this.be.call(this.Eg || this.src, a) : this.be.handleEvent.call(this.be, a)
};
var ob, pb = (ob = "ScriptEngine" in z && z.ScriptEngine() == "JScript") ? z.ScriptEngineMajorVersion() + "." + z.ScriptEngineMinorVersion() + "." + z.ScriptEngineBuildVersion() : "0";
function qb(a, d) {
  this.Qg = d;
  this.Pc = [];
  if(a > this.Qg) {
    throw Error("[goog.structs.SimplePool] Initial cannot be greater than max");
  }
  for(var b = 0;b < a;b++) {
    this.Pc.push(this.wb())
  }
}
A(qb, hb);
x = qb.prototype;
x.Lc = p;
x.zg = p;
x.getObject = function() {
  return this.Pc.length ? this.Pc.pop() : this.wb()
};
function rb(a, d) {
  a.Pc.length < a.Qg ? a.Pc.push(d) : sb(a, d)
}
x.wb = function() {
  return this.Lc ? this.Lc() : {}
};
function sb(a, d) {
  if(a.zg) {
    a.zg(d)
  }else {
    var b = da(d);
    if(b == "object" || b == "array" || b == "function") {
      if(da(d.ld) == "function") {
        d.ld()
      }else {
        for(var c in d) {
          delete d[c]
        }
      }
    }
  }
}
x.md = function() {
  qb.$g.md.call(this);
  for(var a = this.Pc;a.length;) {
    sb(this, a.pop())
  }
  delete this.Pc
};
var tb, ub, vb, wb, xb, yb, zb, Ab, Bb, Cb, Db;
(function() {
  function a() {
    return{oc:0, Ad:0}
  }
  function d() {
    return[]
  }
  function b() {
    function a(d) {
      d = g.call(a.src, a.key, d);
      if(!d) {
        return d
      }
    }
    return a
  }
  function c() {
    return new mb
  }
  function e() {
    return new lb
  }
  var f = ob && !(Ha(pb, "5.7") >= 0), g;
  yb = function(a) {
    g = a
  };
  if(f) {
    tb = function() {
      return h.getObject()
    };
    ub = function(a) {
      rb(h, a)
    };
    vb = function() {
      return k.getObject()
    };
    wb = function(a) {
      rb(k, a)
    };
    xb = function() {
      return j.getObject()
    };
    zb = function() {
      rb(j, b())
    };
    Ab = function() {
      return o.getObject()
    };
    Bb = function(a) {
      rb(o, a)
    };
    Cb = function() {
      return n.getObject()
    };
    Db = function(a) {
      rb(n, a)
    };
    var h = new qb(0, 600);
    h.Lc = a;
    var k = new qb(0, 600);
    k.Lc = d;
    var j = new qb(0, 600);
    j.Lc = b;
    var o = new qb(0, 600);
    o.Lc = c;
    var n = new qb(0, 600);
    n.Lc = e
  }else {
    tb = a, ub = ca, vb = d, wb = ca, xb = b, zb = ca, Ab = c, Bb = ca, Cb = e, Db = ca
  }
})();
var Eb = {}, L = {}, Fb = {}, Gb = {};
function Hb(a, d, b, c, e) {
  if(d) {
    if(da(d) == "array") {
      for(var f = 0;f < d.length;f++) {
        Hb(a, d[f], b, c, e)
      }
    }else {
      var c = !!c, g = L;
      d in g || (g[d] = tb());
      g = g[d];
      c in g || (g[c] = tb(), g.oc++);
      var g = g[c], h = a[ea] || (a[ea] = ++fa), k;
      g.Ad++;
      if(g[h]) {
        k = g[h];
        for(f = 0;f < k.length;f++) {
          if(g = k[f], g.be == b && g.Eg == e) {
            if(g.Bd) {
              break
            }
            return
          }
        }
      }else {
        k = g[h] = vb(), g.oc++
      }
      f = xb();
      f.src = a;
      g = Ab();
      g.Db(b, f, a, d, c, e);
      b = g.key;
      f.key = b;
      k.push(g);
      Eb[b] = g;
      Fb[h] || (Fb[h] = vb());
      Fb[h].push(g);
      a.addEventListener ? (a == z || !a.$h) && a.addEventListener(d, f, c) : a.attachEvent(d in Gb ? Gb[d] : Gb[d] = "on" + d, f)
    }
  }else {
    throw Error("Invalid event type");
  }
}
function Ib(a, d, b, c) {
  if(!c.ze && c.Rg) {
    for(var e = 0, f = 0;e < c.length;e++) {
      if(c[e].Bd) {
        var g = c[e].Vg;
        g.src = p;
        zb(g);
        Bb(c[e])
      }else {
        e != f && (c[f] = c[e]), f++
      }
    }
    c.length = f;
    c.Rg = !1;
    f == 0 && (wb(c), delete L[a][d][b], L[a][d].oc--, L[a][d].oc == 0 && (ub(L[a][d]), delete L[a][d], L[a].oc--), L[a].oc == 0 && (ub(L[a]), delete L[a]))
  }
}
function Jb(a, d, b, c, e) {
  var f = 1, d = d[ea] || (d[ea] = ++fa);
  if(a[d]) {
    a.Ad--;
    a = a[d];
    a.ze ? a.ze++ : a.ze = 1;
    try {
      for(var g = a.length, h = 0;h < g;h++) {
        var k = a[h];
        k && !k.Bd && (f &= Kb(k, e) !== !1)
      }
    }finally {
      a.ze--, Ib(b, c, d, a)
    }
  }
  return Boolean(f)
}
function Kb(a, d) {
  var b = a.handleEvent(d);
  if(a.vg) {
    var c = a.key;
    if(Eb[c]) {
      var e = Eb[c];
      if(!e.Bd) {
        var f = e.src, g = e.type, h = e.Vg, k = e.capture;
        f.removeEventListener ? (f == z || !f.$h) && f.removeEventListener(g, h, k) : f.detachEvent && f.detachEvent(g in Gb ? Gb[g] : Gb[g] = "on" + g, h);
        f = f[ea] || (f[ea] = ++fa);
        h = L[g][k][f];
        if(Fb[f]) {
          var j = Fb[f], o = gb(j, e);
          o >= 0 && fb.splice.call(j, o, 1);
          j.length == 0 && delete Fb[f]
        }
        e.Bd = !0;
        h.Rg = !0;
        Ib(g, k, f, h);
        delete Eb[c]
      }
    }
  }
  return b
}
yb(function(a, d) {
  if(!Eb[a]) {
    return!0
  }
  var b = Eb[a], c = b.type, e = L;
  if(!(c in e)) {
    return!0
  }
  var e = e[c], f, g;
  db === i && (db = Qa && !z.addEventListener);
  if(db) {
    var h;
    if(!(h = d)) {
      a: {
        h = "window.event".split(".");
        for(var k = z;f = h.shift();) {
          if(k[f] != p) {
            k = k[f]
          }else {
            h = p;
            break a
          }
        }
        h = k
      }
    }
    f = h;
    h = !0 in e;
    k = !1 in e;
    if(h) {
      if(f.keyCode < 0 || f.returnValue != i) {
        return!0
      }
      a: {
        var j = !1;
        if(f.keyCode == 0) {
          try {
            f.keyCode = -1;
            break a
          }catch(o) {
            j = !0
          }
        }
        if(j || f.returnValue == i) {
          f.returnValue = !0
        }
      }
    }
    j = Cb();
    j.Db(f, this);
    f = !0;
    try {
      if(h) {
        for(var n = vb(), s = j.currentTarget;s;s = s.parentNode) {
          n.push(s)
        }
        g = e[!0];
        g.Ad = g.oc;
        for(var q = n.length - 1;!j.Pf && q >= 0 && g.Ad;q--) {
          j.currentTarget = n[q], f &= Jb(g, n[q], c, !0, j)
        }
        if(k) {
          g = e[!1];
          g.Ad = g.oc;
          for(q = 0;!j.Pf && q < n.length && g.Ad;q++) {
            j.currentTarget = n[q], f &= Jb(g, n[q], c, !1, j)
          }
        }
      }else {
        f = Kb(b, j)
      }
    }finally {
      if(n) {
        n.length = 0, wb(n)
      }
      j.ld();
      Db(j)
    }
    return f
  }
  c = new lb(d, this);
  try {
    f = Kb(b, c)
  }finally {
    c.ld()
  }
  return f
});
var Lb = {61:187, 59:186};
Qa || Sa && (bb["525"] || (bb["525"] = Ha(Va, "525") >= 0));
/*
 Copyright (c) 2011, Joseph Spandrusyszyn
 See https://github.com/illandril/Illandril-Game-Engine.
*/
function Mb(a) {
  this.id = Nb++;
  this.name = a;
  this.controls = {};
  this.Tf = {};
  this.yg = [];
  this.Me = this.se = p
}
var Nb = 0, Ob = {}, Pb = !1, Qb = {}, Rb = !1, Sb = {}, Tb = !1, Ub = {};
function Vb(a) {
  var d = a.xj, d = Ra && a.keyCode in Lb ? Lb[a.keyCode] : a.keyCode;
  return{keyCode:d, ctrlKey:a.ctrlKey, altKey:a.altKey, shiftKey:a.shiftKey}
}
function Wb(a, d, b, c) {
  var e = eb[a];
  e == p && (e = "KEY[" + a + "]");
  return(d ? "Ctrl + " : "") + (b ? "Alt + " : "") + (c ? "Shift + " : "") + e.toUpperCase()
}
Mb.prototype = {Yb:function(a, d) {
  var b = 0, c = Pb == Qb && Rb == Sb && Tb == Ub, e;
  for(e in Ob) {
    var f = c && Ob[e].gh;
    b++;
    var g = Wb(e, Pb, Rb, Tb);
    this.se == p && this.controls[g] != p && (!f || this.controls[g].ji) && this.controls[g].execute(d)
  }
  if(b == 1 && this.se != p) {
    this.Me != p && clearTimeout(this.Me);
    var h = this;
    this.Me = setTimeout(function() {
      h.Pa(h.se, g);
      h.se = p;
      h.Me = p
    }, 100)
  }
}, Pa:function(a, d, b, c, e) {
  var f = d;
  typeof d == "number" && (f = Wb(d, b, c, e));
  d = [];
  b = this.controls[f];
  c = this.Tf[a.name];
  if(b != p) {
    if(c != p) {
      this.controls[c] = b, this.Tf[b.name] = c, d.push(new Xb(c, b))
    }else {
      throw"The specified key is already in use for a different function.";
    }
  }else {
    c != p && delete this.controls[c]
  }
  this.controls[f] = a;
  this.Tf[a.name] = f;
  d.push(new Xb(f, a));
  this.fj(d)
}, oi:function() {
  var a = [], d;
  for(d in this.controls) {
    a.push(new Xb(d, this.controls[d]))
  }
  return a
}, fj:function(a) {
  for(var d = 0;d < this.yg.length;d++) {
    var b = this.yg[d];
    b.Jj.apply(b.be, a || [], this.oi())
  }
}};
Hb(document, "keydown", function(a) {
  a = Vb(a);
  a.keyCode != 16 && a.keyCode != 17 && a.keyCode != 18 && Ob[a.keyCode] == p && (Ob[a.keyCode] = {gh:!1});
  Pb = a.ctrlKey;
  Rb = a.altKey;
  Tb = a.shiftKey
});
Hb(document, "keyup", function(a) {
  a = Vb(a);
  delete Ob[a.keyCode];
  Pb = a.ctrlKey;
  Rb = a.altKey;
  Tb = a.shiftKey
});
Hb(document, "blur", function() {
  Ob = {};
  Ub = Tb = Sb = Rb = Qb = Pb = !1
});
function Xb(a, d) {
  this.key = this.key = a;
  this.action = this.action = d
}
;var M = !(Object.prototype.defineProperty instanceof Function) && Object.prototype.__defineGetter__ instanceof Function && Object.prototype.__defineSetter__ instanceof Function ? function(a, d, b) {
  b.get instanceof Function && a.__defineGetter__(d, b.get);
  b.set instanceof Function && a.__defineSetter__(d, b.set)
} : Object.defineProperty;
function Yb(a, d) {
  return function() {
    d.apply(a, arguments)
  }
}
;function Zb() {
}
M(Zb.prototype, "referenceEdge", {enumerable:!1, configurable:!0, get:t("pf")});
M(Zb.prototype, "referenceEdge", {enumerable:!1, configurable:!0, set:function(a) {
  a === i && (a = 0);
  this.pf = a;
  this.mc.Sa = this.mc.Sa & 4294967040 | this.pf & 255
}});
M(Zb.prototype, "incidentEdge", {enumerable:!1, configurable:!0, get:t("mf")});
M(Zb.prototype, "incidentEdge", {enumerable:!1, configurable:!0, set:function(a) {
  a === i && (a = 0);
  this.mf = a;
  this.mc.Sa = this.mc.Sa & 4294902015 | this.mf << 8 & 65280
}});
M(Zb.prototype, "incidentVertex", {enumerable:!1, configurable:!0, get:t("nf")});
M(Zb.prototype, "incidentVertex", {enumerable:!1, configurable:!0, set:function(a) {
  a === i && (a = 0);
  this.nf = a;
  this.mc.Sa = this.mc.Sa & 4278255615 | this.nf << 16 & 16711680
}});
M(Zb.prototype, "flip", {enumerable:!1, configurable:!0, get:t("kf")});
M(Zb.prototype, "flip", {enumerable:!1, configurable:!0, set:function(a) {
  a === i && (a = 0);
  this.kf = a;
  this.mc.Sa = this.mc.Sa & 16777215 | this.kf << 24 & 4278190080
}});
function $b() {
  this.mb = new Zb;
  this.constructor === $b && this.Rh.apply(this, arguments)
}
(function(a) {
  a.prototype.Rh = function() {
    this.mb.mc = this
  };
  a.prototype.i = function(a) {
    this.key = a.Sa
  };
  a.prototype.la = function() {
    var d = new a;
    d.key = this.key;
    return d
  };
  M(a.prototype, "key", {enumerable:!1, configurable:!0, get:t("Sa"), set:function(a) {
    a === i && (a = 0);
    this.Sa = a;
    this.mb.pf = this.Sa & 255;
    this.mb.mf = (this.Sa & 65280) >> 8 & 255;
    this.mb.nf = (this.Sa & 16711680) >> 16 & 255;
    this.mb.kf = (this.Sa & 4278190080) >> 24 & 255
  }})
})($b);
function ac() {
  this.A = new D(0, 0);
  this.cc = new $b;
  this.constructor === ac && this.ma()
}
ac.prototype.ma = function() {
  this.A.ca();
  this.Wc = this.Uc = 0;
  this.cc.key = 0
};
ac.prototype.i = function(a) {
  this.A.l(a.A);
  this.Uc = a.Uc;
  this.Wc = a.Wc;
  this.cc.i(a.cc)
};
function O() {
  this.ba = 0;
  if(this.constructor === O) {
    this.z = [];
    for(var a = 0;a < 2;a++) {
      this.z[a] = new ac
    }
    this.ta = new D(0, 0);
    this.A = new D(0, 0)
  }
}
O.prototype.ma = function() {
  for(var a = 0;a < 2;a++) {
    this.z[a].ma()
  }
  this.ta.ca();
  this.A.ca();
  this.ba = this.I = 0
};
O.prototype.i = function(a) {
  this.ba = a.ba;
  for(var d = 0;d < 2;d++) {
    this.z[d].i(a.z[d])
  }
  this.ta.l(a.ta);
  this.A.l(a.A);
  this.I = a.I
};
O.prototype.la = function() {
  var a = new O;
  a.i(this);
  return a
};
O.xf = 1;
O.Oc = 2;
O.yf = 4;
var wa = Number.MIN_VALUE * Number.MIN_VALUE;
function bc() {
  this.H = new D(0, 0);
  this.z = [];
  for(var a = 0;a < 2;a++) {
    this.z[a] = new D(0, 0)
  }
}
bc.prototype.wa = function(a, d, b, c, e) {
  b === i && (b = 0);
  e === i && (e = 0);
  if(a.ba != 0) {
    var f = 0, g, h, k = 0, j = 0, o = 0, n = 0, s = 0;
    g = 0;
    switch(a.I) {
      case O.xf:
        h = d.d;
        g = a.A;
        f = d.position.x + h.a.x * g.x + h.b.x * g.y;
        d = d.position.y + h.a.y * g.x + h.b.y * g.y;
        h = c.d;
        g = a.z[0].A;
        a = c.position.x + h.a.x * g.x + h.b.x * g.y;
        c = c.position.y + h.a.y * g.x + h.b.y * g.y;
        g = a - f;
        h = c - d;
        k = g * g + h * h;
        k > wa ? (k = Math.sqrt(k), this.H.x = g / k, this.H.y = h / k) : (this.H.x = 1, this.H.y = 0);
        g = d + b * this.H.y;
        c -= e * this.H.y;
        this.z[0].x = 0.5 * (f + b * this.H.x + (a - e * this.H.x));
        this.z[0].y = 0.5 * (g + c);
        break;
      case O.Oc:
        h = d.d;
        g = a.ta;
        k = h.a.x * g.x + h.b.x * g.y;
        j = h.a.y * g.x + h.b.y * g.y;
        h = d.d;
        g = a.A;
        o = d.position.x + h.a.x * g.x + h.b.x * g.y;
        n = d.position.y + h.a.y * g.x + h.b.y * g.y;
        this.H.x = k;
        this.H.y = j;
        for(f = 0;f < a.ba;f++) {
          h = c.d, g = a.z[f].A, s = c.position.x + h.a.x * g.x + h.b.x * g.y, g = c.position.y + h.a.y * g.x + h.b.y * g.y, this.z[f].x = s + 0.5 * (b - (s - o) * k - (g - n) * j - e) * k, this.z[f].y = g + 0.5 * (b - (s - o) * k - (g - n) * j - e) * j
        }
        break;
      case O.yf:
        h = c.d;
        g = a.ta;
        k = h.a.x * g.x + h.b.x * g.y;
        j = h.a.y * g.x + h.b.y * g.y;
        h = c.d;
        g = a.A;
        o = c.position.x + h.a.x * g.x + h.b.x * g.y;
        n = c.position.y + h.a.y * g.x + h.b.y * g.y;
        this.H.x = -k;
        this.H.y = -j;
        for(f = 0;f < a.ba;f++) {
          h = d.d, g = a.z[f].A, s = d.position.x + h.a.x * g.x + h.b.x * g.y, g = d.position.y + h.a.y * g.x + h.b.y * g.y, this.z[f].x = s + 0.5 * (e - (s - o) * k - (g - n) * j - b) * k, this.z[f].y = g + 0.5 * (e - (s - o) * k - (g - n) * j - b) * j
        }
    }
  }
};
function cc(a, d, b) {
  this.execute = a;
  this.name = this.name = d;
  this.ji = b
}
;function P(a) {
  this.fa = a;
  this.fa.n.xa.push(this)
}
P.prototype.Ub = function(a, d) {
  var b = dc(this.fa.n, a, d);
  P.yi(b);
  P.Ai(b);
  P.zi(b);
  var c = new Da, e = new D(a.x / 2, a.y / 2);
  Fa(c, [new D(-e.x + 0.01, e.y - 0.01), new D(-e.x - 0.01, 0), new D(-e.x + 0.01, -e.y + 0.01), new D(e.x - 0.01, -e.y + 0.01), new D(e.x + 0.01, 0), new D(e.x - 0.01, e.y - 0.01)]);
  b.Hj = ec(b.body, c, {Xb:{bb:0}});
  b.Ja = {};
  b.Ja.Mf = new cc(function() {
    b.e.La.Bi()
  }, "Move Up", !0);
  b.Ja.Lf = new cc(r(), "Move Down", !0);
  b.Ja.he = new cc(function() {
    b.e.xd.he()
  }, "Move Left", !0);
  b.Ja.ie = new cc(function() {
    b.e.xd.ie()
  }, "Move Right", !0);
  return b
};
(function(a) {
  a.$a = 0.1;
  a.sj = new D(0, 9.8);
  a.Dc = {bf:new D(0, 9.8), xh:1.5, mg:8, Bh:1};
  a.jb = {eg:1, cf:2, yj:4, rj:8, dg:16, jg:32, $e:64};
  a.yh = {Ah:1, qj:2, uj:4};
  a.Q = {gd:1, Gc:2, Ab:4, Hc:8};
  a.Yd = function(d, b) {
    d.e = d.e || {};
    d.e.type |= a.jb.eg;
    d.e.te = {dj:b & a.Q.gd, aj:b & a.Q.Ab, bj:b & a.Q.Gc, cj:b & a.Q.Hc}
  };
  a.yi = function(d) {
    var b = P.Dc.mg;
    d.e = d.e || {};
    d.e.type |= a.jb.cf;
    d.e.La = {nb:[], Qe:b, Bi:function() {
      var b = d.e.La.nb;
      if(b.length > 0) {
        var e = d.body.m * d.e.La.Qe * a.Dc.xh, f = d.body.c.h, g = d.body.q;
        g.y = 0;
        var h = d.body;
        h.I != Q && h.q.l(g);
        fc(d.body, new D(0, -e), f);
        for(g = 0;g < b.length;g++) {
          fc(b[g].body, new D(0, e / b.length), f)
        }
      }
    }}
  };
  a.Ai = function(d) {
    var b = P.Dc.mg, c = P.Dc.Bh;
    d.e = d.e || {};
    d.e.type |= a.jb.cf;
    d.e.xd = {tg:c, Qe:b, ie:function() {
      var a = d.body.q, a = Math.min(a.x + d.e.xd.tg, d.e.xd.Qe) - a.x;
      a > 0 && fc(d.body, new D(d.body.m * a, 0), d.body.c.h)
    }, he:function() {
      var a = d.body.q, a = Math.max(a.x - d.e.xd.tg, -d.e.xd.Qe) - a.x;
      a < 0 && fc(d.body, new D(d.body.m * a, 0), d.body.c.h)
    }}
  };
  a.pd = function(d, b, c) {
    d.e = d.e || {};
    d.e.type |= a.jb.$e;
    d.e.o = d.e.o || {};
    if(c & a.Q.gd) {
      d.e.o.zf = !0, d.e.o.me = d.e.o.me || [], d.e.o.me.push(b)
    }
    if(c & a.Q.Ab) {
      d.e.o.zf = !0, d.e.o.Vd = d.e.o.Vd || [], d.e.o.Vd.push(b)
    }
    if(c & a.Q.Gc) {
      d.e.o.zf = !0, d.e.o.$d = d.e.o.$d || [], d.e.o.$d.push(b)
    }
    if(c & a.Q.Hc) {
      d.e.o.zf = !0, d.e.o.ke = d.e.o.ke || [], d.e.o.ke.push(b)
    }
    if(NaN & a.Q.gd) {
      d.e.o.we = !0, d.e.o.ne = d.e.o.ne || [], d.e.o.ne.push(b)
    }
    if(NaN & a.Q.Ab) {
      d.e.o.we = !0, d.e.o.Wd = d.e.o.Wd || [], d.e.o.Wd.push(b)
    }
    if(NaN & a.Q.Gc) {
      d.e.o.we = !0, d.e.o.ae = d.e.o.ae || [], d.e.o.ae.push(b)
    }
    if(NaN & a.Q.Hc) {
      d.e.o.we = !0, d.e.o.le = d.e.o.le || [], d.e.o.le.push(b)
    }
  };
  a.xi = function(d, b) {
    d.e = d.e || {};
    d.e.type |= a.jb.dg;
    d.e.wf = {jj:b, filter:0}
  };
  a.zi = function(d) {
    var b = P.yh.Ah;
    d.e = d.e || {};
    d.e.type |= a.jb.jg;
    d.e.Di = {filter:b}
  };
  a.prototype.Cb = p;
  a.prototype.pg = function(a) {
    var b = a.C.p.object, c = a.G.p.object;
    !a.disabled && b && b.e && this.sg(a, b);
    !a.disabled && c && c.e && this.sg(a, c)
  };
  a.prototype.sg = function(d, b) {
    if(b.e.type & a.jb.eg) {
      d.disabled = !0;
      var c = new bc;
      gc(d, c);
      c = c.H;
      if(!b.e.te.dj && c.y > a.$a) {
        d.disabled = !1
      }else {
        if(!b.e.te.aj && c.y < -a.$a) {
          d.disabled = !1
        }else {
          if(!b.e.te.cj && c.x > a.$a) {
            d.disabled = !1
          }else {
            if(!b.e.te.bj && c.x < -a.$a) {
              d.disabled = !1
            }
          }
        }
      }
    }
  };
  a.prototype.Id = function(a) {
    if(!a.disabled) {
      var b = a.C.p, c = b.object, e = a.G.p, f = e.object;
      c && f && (c.e && this.qg(a, c, f, e), f.e && this.qg(a, f, c, b))
    }
  };
  a.prototype.qg = function(d, b, c, e) {
    if(b.e.type & a.jb.cf) {
      var f = new bc;
      gc(d, f);
      var g = f.H;
      if(g.y > a.$a) {
        g = !1;
        for(f = 0;f < b.e.La.nb.length;f++) {
          if(b.e.La.nb[f].body == e) {
            b.e.La.nb[f].count++;
            g = !0;
            break
          }
        }
        g || b.e.La.nb.push({body:e, count:1});
        d.Xc = d.Xc || [];
        d.Xc.push({La:b, si:e})
      }
    }
    if(b.e.type & a.jb.$e) {
      f = new bc;
      gc(d, f);
      g = f.H;
      if(g.y > a.$a && b.e.o.me) {
        for(f = 0;f < b.e.o.me.length;f++) {
          b.e.o.me[f](d)
        }
      }else {
        if(g.y < -a.$a && b.e.o.Vd) {
          for(f = 0;f < b.e.o.Vd.length;f++) {
            b.e.o.Vd[f](d)
          }
        }
      }
      if(g.x > a.$a && b.e.o.$d) {
        for(f = 0;f < b.e.o.$d.length;f++) {
          b.e.o.$d[f](d)
        }
      }else {
        if(g.x < -a.$a && b.e.o.ke) {
          for(f = 0;f < b.e.o.ke.length;f++) {
            b.e.o.ke[f](d)
          }
        }
      }
    }
    b.e.type & a.jb.dg && c.e && c.e.type & a.jb.jg && (b.e.wf.filter == 0 || b.e.wf.filter & c.e.Di.filter) && hc(this.fa.n, c, b.e.wf.jj)
  };
  a.prototype.ad = function(a) {
    if(a.Xc) {
      for(var b = 0;b < a.Xc.length;b++) {
        for(var c = a.Xc[b].La, e = a.Xc[b].si, f = [], g = 0;g < c.e.La.nb.length;g++) {
          c.e.La.nb[g].body == e ? (c.e.La.nb[g].count--, c.e.La.nb[g].count > 0 && f.push(c.e.La.nb[g])) : f.push(c.e.La.nb[g])
        }
        c.e.La.nb = f
      }
      a.Xc = p
    }
    if(!a.disabled) {
      b = a.C.p.object, c = a.G.p.object, b && c && (b.e && this.rg(a, b), c.e && this.rg(a, c))
    }
  };
  a.prototype.rg = function(d, b) {
    if(b.e.type & a.jb.$e && b.e.o.we) {
      var c = new bc;
      gc(d, c);
      c = c.H;
      if(c.y > a.$a && b.e.o.ne) {
        for(var e = 0;e < b.e.o.ne.length;e++) {
          b.e.o.ne[e](d)
        }
      }else {
        if(c.y < -a.$a && b.e.o.Wd) {
          for(e = 0;e < b.e.o.Wd.length;e++) {
            b.e.o.Wd[e](d)
          }
        }
      }
      if(c.x > a.$a && b.e.o.ae) {
        for(e = 0;e < b.e.o.ae.length;e++) {
          b.e.o.ae[e](d)
        }
      }else {
        if(c.x < -a.$a && b.e.o.le) {
          for(e = 0;e < b.e.o.le.length;e++) {
            b.e.o.le[e](d)
          }
        }
      }
    }
  };
  a.prototype.Td = p;
  a.prototype.Sd = p;
  a.prototype.f = function(a, b) {
    return R(this.fa.n, a, b, !0)
  };
  a.prototype.jd = function(d, b) {
    var c, e = R(this.fa.n, d, b, !0, p, p);
    if(c === i || c === p) {
      c = a.Q.Ab | a.Q.Gc | a.Q.Hc
    }
    a.Yd(e, c)
  };
  a.prototype.wi = function(d, b) {
    var c = this;
    a.pd(d, function() {
      ic(c.fa.n, d)
    }, b)
  };
  a.prototype.Ka = function(d, b) {
    var c, e = R(this.fa.n, d, b, !0, p, p);
    if(c === i || c === p) {
      c = a.Q.Ab
    }
    this.wi(e, c);
    return e
  };
  a.prototype.Wh = function(d, b, c) {
    d = R(this.fa.n, d, b, !0, p, p);
    a.xi(d, c);
    return d
  }
})(P);
function jc() {
  this.$f = []
}
;var kc = {}, lc = 0;
function mc() {
  lc--
}
function nc(a) {
  if(a.Zf === i || a.Zf === p) {
    a.Zf = {}
  }
  return a.Zf
}
;function oc(a, d, b, c) {
  if(kc[a] == p) {
    lc++, kc[a] = new Image, kc[a].onload = mc, kc[a].src = a
  }
  this.url = a;
  this.Sg = d || new D(0, 0);
  this.Pe = b || new D(1, 1);
  this.dh = c || new D(1, 1);
  this.hb = new D(1, 1)
}
;function S() {
  this.Ie = this.Ef = this.sd = this.Ni = this.ud = 1;
  var a = this;
  this.Si = {ri:{clear:function() {
    a.ac.clearRect(0, 0, a.ac.canvas.width, a.ac.canvas.height)
  }}};
  this.Kg = 0
}
(function(a) {
  a.prototype.lc = function(a, b) {
    return"rgba(" + ((a & 16711680) >> 16) + "," + ((a & 65280) >> 8) + "," + (a & 255) + "," + b + ")"
  };
  a.prototype.Hh = function() {
    var a = pc;
    a === i && (a = 0);
    this.Kg = a
  };
  a.prototype.Jh = function(a) {
    this.ac = a
  };
  a.prototype.Fh = function(a) {
    a === i && (a = 0);
    this.ud = a
  };
  a.prototype.Ih = function() {
    var a = 1;
    a === i && (a = 0);
    this.Ni = a;
    this.ac.Zj = a
  };
  a.prototype.Gh = function() {
    var a = 0.3;
    a === i && (a = 0);
    this.Ef = a
  };
  a.prototype.qh = function(a, b) {
    var c = this.ac, e = this.ud;
    c.beginPath();
    c.strokeStyle = this.lc(b.color, this.sd);
    c.moveTo(a[0].x * e, a[0].y * e);
    for(var f = 1;f < 4;f++) {
      c.lineTo(a[f].x * e, a[f].y * e)
    }
    c.lineTo(a[0].x * e, a[0].y * e);
    c.closePath();
    c.stroke()
  };
  a.prototype.sh = function(a, b, c) {
    if(b) {
      var e = this.ac, f = this.ud;
      e.beginPath();
      e.strokeStyle = this.lc(c.color, this.sd);
      e.fillStyle = this.lc(c.color, this.Ef);
      e.moveTo(a[0].x * f, a[0].y * f);
      for(c = 1;c < b;c++) {
        e.lineTo(a[c].x * f, a[c].y * f)
      }
      e.lineTo(a[0].x * f, a[0].y * f);
      e.closePath();
      e.fill();
      e.stroke()
    }
  };
  a.prototype.rh = function(a, b, c, e) {
    if(b) {
      var f = this.ac, g = this.ud, h = a.x * g, k = a.y * g;
      f.moveTo(0, 0);
      f.beginPath();
      f.strokeStyle = this.lc(e.color, this.sd);
      f.fillStyle = this.lc(e.color, this.Ef);
      f.arc(h, k, b * g, 0, Math.PI * 2, !0);
      f.moveTo(h, k);
      f.lineTo((a.x + c.x * b) * g, (a.y + c.y * b) * g);
      f.closePath();
      f.fill();
      f.stroke()
    }
  };
  a.prototype.Ob = function(a, b, c) {
    var e = this.ac, f = this.ud;
    e.strokeStyle = this.lc(c.color, this.sd);
    e.beginPath();
    e.moveTo(a.x * f, a.y * f);
    e.lineTo(b.x * f, b.y * f);
    e.closePath();
    e.stroke()
  };
  a.prototype.th = function(a) {
    var b = this.ac, c = this.ud;
    b.beginPath();
    b.strokeStyle = this.lc(16711680, this.sd);
    b.moveTo(a.position.x * c, a.position.y * c);
    b.lineTo((a.position.x + this.Ie * a.d.a.x) * c, (a.position.y + this.Ie * a.d.a.y) * c);
    b.strokeStyle = this.lc(65280, this.sd);
    b.moveTo(a.position.x * c, a.position.y * c);
    b.lineTo((a.position.x + this.Ie * a.d.b.x) * c, (a.position.y + this.Ie * a.d.b.y) * c);
    b.closePath();
    b.stroke()
  };
  S.Cg = 1;
  S.di = 2;
  S.Bg = 4;
  S.ei = 8;
  S.bi = 16;
  S.ci = 32
})(S);
function qc() {
  this.lowerBound = new D;
  this.upperBound = new D
}
function rc(a) {
  return new D((a.lowerBound.x + a.upperBound.x) / 2, (a.lowerBound.y + a.upperBound.y) / 2)
}
function sc(a, d) {
  var b;
  return b = (b = (b = (b = a.lowerBound.x <= d.lowerBound.x) && a.lowerBound.y <= d.lowerBound.y) && d.upperBound.x <= a.upperBound.x) && d.upperBound.y <= a.upperBound.y
}
qc.prototype.Sb = function(a) {
  return a.lowerBound.x - this.upperBound.x > 0 ? !1 : a.lowerBound.y - this.upperBound.y > 0 ? !1 : this.lowerBound.x - a.upperBound.x > 0 ? !1 : this.lowerBound.y - a.upperBound.y > 0 ? !1 : !0
};
function tc(a, d, b) {
  a.lowerBound.x = Math.min(d.lowerBound.x, b.lowerBound.x);
  a.lowerBound.y = Math.min(d.lowerBound.y, b.lowerBound.y);
  a.upperBound.x = Math.max(d.upperBound.x, b.upperBound.x);
  a.upperBound.y = Math.max(d.upperBound.y, b.upperBound.y)
}
;function uc(a, d, b, c, e) {
  this.Vb = {};
  this.fa = a;
  this.sb = c;
  this.Nb = new D(c.x / b, c.y / b);
  this.scale = b;
  this.ja = new D(0, 0);
  this.xe = new D(-1, -1);
  this.fh = R(this.fa.n, new D(this.Nb.x * vc, this.Nb.y * vc), new D(0, 0), !1, p, {Zd:!0});
  wc(this, new D(0, 0));
  a = document.getElementById(d);
  this.Mc = document.createElement("span");
  if(e) {
    a.innerHTML = '<div style="width: ' + this.sb.x + "px; height: " + this.sb.y / 2 + 'px; background-color: #000; opacity: 0.15; position: absolute;"></div><div style="width: ' + this.sb.x / 2 + "px; height: " + this.sb.y + 'px; background-color: #FFF; opacity: 0.15; position: absolute;"></div>', this.Mc.innerHTML = '<canvas id="' + d + '__DEBUG" class="debugViewport"></canvas>'
  }
  this.Mc.className = "viewportContainer";
  this.Mc.style.width = this.sb.x + "px";
  this.Mc.style.height = this.sb.y + "px";
  this.display = document.createElement("span");
  this.display.className = "viewport";
  this.Mc.appendChild(this.display);
  a.appendChild(this.Mc);
  this.Af = document.createElement("div");
  this.Af = xc(this, "Loading, please wait.");
  yc(this.Af);
  this.Tg = xc(this, "Paused");
  e ? (this.Va = document.getElementById(d + "__DEBUG"), this.Va.width = this.fa.n.Qa.x * b, this.Va.height = this.fa.n.Qa.y * b, this.Va.style.marginRight = "-" + this.Va.width + "px", this.Va.style.marginBottom = "-" + this.Va.height + "px", d = new S, d.Jh(this.Va.getContext("2d")), d.Fh(b), d.Gh(), d.Ih(), d.Hh(), this.fa.n.lb.Eh(d)) : this.Va = p
}
function xc(a, d) {
  var b = document.createElement("div");
  b.style.fontSize = "40px";
  b.style.textAlign = "center";
  b.style.verticalAlign = "middle";
  b.style.backgroundColor = "rgba(255,255,255,0.5)";
  b.style.color = "black";
  b.style.position = "relative";
  b.style.display = "none";
  b.style.zIndex = zc + Ac;
  b.innerHTML = d;
  b.style.width = a.sb.x + "px";
  b.style.height = a.sb.y + "px";
  a.Mc.appendChild(b);
  return b
}
function yc(a) {
  if(a.style.display == "none") {
    a.style.display = Bc
  }
}
function Cc(a) {
  if(a.style.display != "none") {
    a.style.display = "none"
  }
}
function wc(a, d) {
  a.ja.x = d.x;
  a.ja.y = d.y;
  if(a.ja.x < a.Nb.x / 2) {
    a.ja.x = a.Nb.x / 2
  }else {
    if(a.ja.x > a.fa.n.Qa.x - a.Nb.x / 2) {
      a.ja.x = a.fa.n.Qa.x - a.Nb.x / 2
    }
  }
  if(a.ja.y < a.Nb.y / 2) {
    a.ja.y = a.Nb.y / 2
  }else {
    if(a.ja.y > a.fa.n.Qa.y - a.Nb.y / 2) {
      a.ja.y = a.fa.n.Qa.y - a.Nb.y / 2
    }
  }
}
function Dc(a, d) {
  if(a.display == p) {
    a.display = {}, a.display.B = new qc, a.qi = function(a) {
      var d = this.body ? this.body.g.position : this.position.la();
      return this.display.Je == 0 ? d : new D(d.x + (a.x - d.x) * this.display.Je, d.y + (a.y - d.y) * this.display.Je)
    }, a.pi = function() {
      return this.body ? this.body.Pb() : this.Ta
    }, a.display.Je = 0, a.display.ag = 0
  }
  a.display.size = d.la()
}
function T(a, d, b) {
  a.display.Re = new oc(d, b)
}
var vc = 1.25, zc = 100, Ac = 100, Bc = "table-cell", pc = 0 | S.Bg | S.Cg, Ec = 0;
function Fc(a) {
  this.fa = a
}
function Gc(a, d, b, c, e) {
  var f = new D(4, 4);
  Dc(d.body, b);
  T(d, "../external-resources/graphics/urbansquall_tileset/characters/princess_AP.png", c);
  d.display.Re = new oc("../external-resources/graphics/urbansquall_tileset/characters/princess_AP.png", c, f, e);
  d.display.Tb = {};
  d.display.Tb.Kj = e;
  d.display.Tb.ni = 4;
  d.display.Tb.qc = 0;
  d.display.Tb.ab = {k:Hc, x:Hc, y:Ic};
  a = a.fa.ug;
  b = Fc.mi;
  if(typeof b != "function") {
    throw"Thought not a function!";
  }
  d.Se = d.Se || [];
  d.Se.push(b);
  a = a.$f;
  gb(a, d) >= 0 || a.push(d)
}
var Hc = 0, Ic = 2;
(function(a) {
  a.mi = function(d, b) {
    a.li(b, this)
  };
  a.li = function(a, b) {
    var c = b.display.Tb;
    c.qc += a;
    var e = new D(1, 1), f = b.body.q, g = Math.abs(f.x), h = Math.abs(f.y);
    if(h < 0.01 || g >= h) {
      if(f.x > 0.01) {
        if(c.ab.x = Hc, c.ab.k != Hc) {
          c.ab.k = Hc, c.qc = 0
        }
      }else {
        if(f.x < -0.01) {
          if(c.ab.x = 1, c.ab.k != 1) {
            c.ab.k = 1, c.qc = 0
          }
        }else {
          c.qc = 0
        }
      }
      e.y = c.ab.x == 1 ? 4 : 2
    }else {
      if(f.y > 0.01) {
        c.ab.y = 3;
        if(c.ab.k != 3) {
          c.ab.k = 3, c.qc = 0
        }
        e.y = 3
      }else {
        c.ab.y = Ic;
        if(c.ab.k != Ic) {
          c.ab.k = Ic, c.qc = 0
        }
        e.y = 1
      }
    }
    e.x = c.qc == 0 ? 1 : Math.floor(c.qc * c.ni);
    c = b.display.Re;
    c.hb = e.la();
    c.hb.x %= c.Pe.x;
    c.hb.y %= c.Pe.y;
    if(c.hb.x === 0) {
      c.hb.x = c.Pe.x
    }
    if(c.hb.y === 0) {
      c.hb.y = c.Pe.y
    }
  }
})(Fc);
var Jc = function() {
  var a = window.Wj || window.ak || window.Rj || window.Vj || window.Sj || function(a) {
    window.setTimeout(a, 1E3 / 60)
  };
  return function() {
    a.apply(window, arguments)
  }
}();
function Kc() {
  this.Xd = 1;
  this.ge = 65535;
  this.Qc = 0
}
Kc.prototype.la = function() {
  var a = new Kc;
  a.Xd = this.Xd;
  a.ge = this.ge;
  a.Qc = this.Qc;
  return a
};
function Lc() {
}
Lc.prototype.Cb = function(a, d) {
  var b = a.Ff.la(), c = d.Ff.la();
  return b.Qc == c.Qc && b.Qc != 0 ? b.Qc > 0 : (b.ge & c.Xd) != 0 && (b.Xd & c.ge) != 0
};
var Mc = new Lc;
function Nc() {
}
Nc.prototype.i = function(a) {
  this.Z = a.Z;
  this.ob = a.ob;
  this.zd = a.zd;
  this.Fd = a.Fd;
  this.Gd = a.Gd
};
function Oc() {
  this.Fb = new D;
  this.J = new D;
  this.K = new D
}
;function Pc() {
  this.ye = new D;
  this.Fb = new D;
  this.fc = new D;
  this.yd = new ha;
  this.vb = new ha;
  this.Ia = [];
  for(var a = 0;a < 2;a++) {
    this.Ia[a] = new Oc
  }
}
;function Qc() {
  this.H = new D(0, 0);
  this.Ge = [];
  this.z = [];
  for(var a = 0;a < 2;a++) {
    this.z[a] = new D(0, 0)
  }
}
Qc.prototype.wa = function(a) {
  I(a.eb > 0);
  var d = 0, b = 0, c = 0, e = 0, f = 0;
  switch(a.type) {
    case O.xf:
      var g = a.da.g.d, c = a.Fb, d = a.da.g.position.x + (g.a.x * c.x + g.b.x * c.y), b = a.da.g.position.y + (g.a.y * c.x + g.b.y * c.y), g = a.ea.g.d, c = a.Ia[0].Fb, e = a.ea.g.position.x + (g.a.x * c.x + g.b.x * c.y), g = a.ea.g.position.y + (g.a.y * c.x + g.b.y * c.y), c = e - d, f = g - b, h = c * c + f * f;
      h > wa ? (h = Math.sqrt(h), this.H.x = c / h, this.H.y = f / h) : (this.H.x = 1, this.H.y = 0);
      this.z[0].x = 0.5 * (d + e);
      this.z[0].y = 0.5 * (b + g);
      this.Ge[0] = c * this.H.x + f * this.H.y - a.Sf;
      break;
    case O.Oc:
      g = a.da.g.d;
      c = a.ye;
      this.H.x = g.a.x * c.x + g.b.x * c.y;
      this.H.y = g.a.y * c.x + g.b.y * c.y;
      g = a.da.g.d;
      c = a.Fb;
      e = a.da.g.position.x + (g.a.x * c.x + g.b.x * c.y);
      f = a.da.g.position.y + (g.a.y * c.x + g.b.y * c.y);
      g = a.ea.g.d;
      for(d = 0;d < a.eb;d++) {
        c = a.Ia[d].Fb, b = a.ea.g.position.x + (g.a.x * c.x + g.b.x * c.y), c = a.ea.g.position.y + (g.a.y * c.x + g.b.y * c.y), this.Ge[d] = (b - e) * this.H.x + (c - f) * this.H.y - a.Sf, this.z[d].x = b, this.z[d].y = c
      }
      break;
    case O.yf:
      g = a.ea.g.d;
      c = a.ye;
      this.H.x = g.a.x * c.x + g.b.x * c.y;
      this.H.y = g.a.y * c.x + g.b.y * c.y;
      g = a.ea.g.d;
      c = a.Fb;
      e = a.ea.g.position.x + (g.a.x * c.x + g.b.x * c.y);
      f = a.ea.g.position.y + (g.a.y * c.x + g.b.y * c.y);
      g = a.da.g.d;
      for(d = 0;d < a.eb;d++) {
        c = a.Ia[d].Fb, b = a.da.g.position.x + (g.a.x * c.x + g.b.x * c.y), c = a.da.g.position.y + (g.a.y * c.x + g.b.y * c.y), this.Ge[d] = (b - e) * this.H.x + (c - f) * this.H.y - a.Sf, this.z[d].i(b, c)
      }
      this.H.x *= -1;
      this.H.y *= -1
  }
};
function Rc() {
  this.Ti = new Nc;
  this.Gb = []
}
x = Rc.prototype;
x.wa = function(a, d, b) {
  b === i && (b = 0);
  var c;
  this.Ti.i(a);
  a = 0;
  for(this.ce = b;this.Gb.length < this.ce;) {
    this.Gb[this.Gb.length] = new Pc
  }
  for(a = 0;a < b;++a) {
    c = d[a];
    var e = c.C, f = c.G, g = e.ia.N, h = f.ia.N, k = e.p, j = f.p, o = c.Ya, n;
    c = e.Gf;
    var s = f.Gf;
    c === i && (c = 0);
    s === i && (s = 0);
    n = Math.sqrt(c * s);
    var q, e = e.If, f = f.If;
    e === i && (e = 0);
    f === i && (f = 0);
    q = e > f ? e : f;
    var s = k.q.x, v = k.q.y, u = j.q.x, w = j.q.y, y = k.F, N = j.F;
    I(o.ba > 0);
    Sc.wa(o, k.g, g, j.g, h);
    e = Sc.H.x;
    c = Sc.H.y;
    f = this.Gb[a];
    f.da = k;
    f.ea = j;
    f.Vi = o;
    f.fc.x = e;
    f.fc.y = c;
    f.eb = o.ba;
    f.bb = n;
    f.Mb = q;
    f.ye.x = o.ta.x;
    f.ye.y = o.ta.y;
    f.Fb.x = o.A.x;
    f.Fb.y = o.A.y;
    f.Sf = g + h;
    f.type = o.I;
    for(g = 0;g < f.eb;++g) {
      n = o.z[g];
      h = f.Ia[g];
      h.pa = n.Uc;
      h.ic = n.Wc;
      h.Fb.l(n.A);
      n = h.J.x = Sc.z[g].x - k.c.h.x;
      q = h.J.y = Sc.z[g].y - k.c.h.y;
      var C = h.K.x = Sc.z[g].x - j.c.h.x, l = h.K.y = Sc.z[g].y - j.c.h.y, m = n * c - q * e, K = C * c - l * e;
      m *= m;
      K *= K;
      h.yd = 1 / (k.w + j.w + k.M * m + j.M * K);
      var V = k.m * k.w + j.m * j.w;
      V += k.m * k.M * m + j.m * j.M * K;
      h.ii = 1 / V;
      K = c;
      V = -e;
      m = n * V - q * K;
      K = C * V - l * K;
      m *= m;
      K *= K;
      h.nj = 1 / (k.w + j.w + k.M * m + j.M * K);
      h.Ve = 0;
      n = f.fc.x * (u + -N * l - s - -y * q) + f.fc.y * (w + N * C - v - y * n);
      n < -1 && (h.Ve += -f.Mb * n)
    }
    if(f.eb == 2) {
      w = f.Ia[0], u = f.Ia[1], o = k.w, k = k.M, s = j.w, j = j.M, v = w.J.x * c - w.J.y * e, w = w.K.x * c - w.K.y * e, y = u.J.x * c - u.J.y * e, u = u.K.x * c - u.K.y * e, e = o + s + k * v * v + j * w * w, c = o + s + k * y * y + j * u * u, j = o + s + k * v * y + j * w * u, e * e < 100 * (e * c - j * j) ? (f.vb.a.i(e, j), f.vb.b.i(j, c), j = f.vb, f = f.yd, k = j.a.x * j.b.y - j.b.x * j.a.y, k != 0 && (k = 1 / k), f.a.x = k * j.b.y, f.b.x = -k * j.b.x, f.a.y = -k * j.a.y, f.b.y = k * j.a.x) : 
      f.eb = 1
    }
  }
};
x.ed = function(a) {
  for(var d = 0;d < this.ce;++d) {
    var b = this.Gb[d], c = b.da, e = b.ea, f = c.w, g = c.M, h = e.w, k = e.M, j = b.fc.x, o = b.fc.y, n = o, s = -j, q = 0, v = 0;
    if(a.Gd) {
      v = b.eb;
      for(q = 0;q < v;++q) {
        var u = b.Ia[q];
        u.pa *= a.Wb;
        u.ic *= a.Wb;
        var w = u.pa * j + u.ic * n, y = u.pa * o + u.ic * s;
        c.F -= g * (u.J.x * y - u.J.y * w);
        c.q.x -= f * w;
        c.q.y -= f * y;
        e.F += k * (u.K.x * y - u.K.y * w);
        e.q.x += h * w;
        e.q.y += h * y
      }
    }else {
      v = b.eb;
      for(q = 0;q < v;++q) {
        c = b.Ia[q], c.pa = 0, c.ic = 0
      }
    }
  }
};
x.Jc = function() {
  for(var a = 0, d, b = 0, c = 0, e = 0, f = c = c = b = b = 0, g = b = b = 0, h = b = e = 0, k = 0, j, o = 0;o < this.ce;++o) {
    var e = this.Gb[o], n = e.da, s = e.ea, q = n.F, v = s.F, u = n.q, w = s.q, y = n.w, N = n.M, C = s.w, l = s.M, h = e.fc.x, m = k = e.fc.y;
    j = -h;
    g = e.bb;
    for(a = 0;a < e.eb;a++) {
      d = e.Ia[a], b = w.x - v * d.K.y - u.x + q * d.J.y, c = w.y + v * d.K.x - u.y - q * d.J.x, b = b * m + c * j, b = d.nj * -b, c = g * d.pa, c = H(d.ic + b, -c, c), b = c - d.ic, f = b * m, b *= j, u.x -= y * f, u.y -= y * b, q -= N * (d.J.x * b - d.J.y * f), w.x += C * f, w.y += C * b, v += l * (d.K.x * b - d.K.y * f), d.ic = c
    }
    if(e.eb == 1) {
      d = e.Ia[0], b = w.x + -v * d.K.y - u.x - -q * d.J.y, c = w.y + v * d.K.x - u.y - q * d.J.x, e = b * h + c * k, b = -d.yd * (e - d.Ve), c = d.pa + b, c = c > 0 ? c : 0, b = c - d.pa, f = b * h, b *= k, u.x -= y * f, u.y -= y * b, q -= N * (d.J.x * b - d.J.y * f), w.x += C * f, w.y += C * b, v += l * (d.K.x * b - d.K.y * f), d.pa = c
    }else {
      d = e.Ia[0];
      var a = e.Ia[1], b = d.pa, g = a.pa, K = (w.x - v * d.K.y - u.x + q * d.J.y) * h + (w.y + v * d.K.x - u.y - q * d.J.x) * k, V = (w.x - v * a.K.y - u.x + q * a.J.y) * h + (w.y + v * a.K.x - u.y - q * a.J.x) * k, c = K - d.Ve, f = V - a.Ve;
      j = e.vb;
      c -= j.a.x * b + j.b.x * g;
      for(f -= j.a.y * b + j.b.y * g;;) {
        j = e.yd;
        m = -(j.a.x * c + j.b.x * f);
        j = -(j.a.y * c + j.b.y * f);
        if(m >= 0 && j >= 0) {
          b = m - b;
          g = j - g;
          e = b * h;
          b *= k;
          h *= g;
          k *= g;
          u.x -= y * (e + h);
          u.y -= y * (b + k);
          q -= N * (d.J.x * b - d.J.y * e + a.J.x * k - a.J.y * h);
          w.x += C * (e + h);
          w.y += C * (b + k);
          v += l * (d.K.x * b - d.K.y * e + a.K.x * k - a.K.y * h);
          d.pa = m;
          a.pa = j;
          break
        }
        m = -d.yd * c;
        j = 0;
        V = e.vb.a.y * m + f;
        if(m >= 0 && V >= 0) {
          b = m - b;
          g = j - g;
          e = b * h;
          b *= k;
          h *= g;
          k *= g;
          u.x -= y * (e + h);
          u.y -= y * (b + k);
          q -= N * (d.J.x * b - d.J.y * e + a.J.x * k - a.J.y * h);
          w.x += C * (e + h);
          w.y += C * (b + k);
          v += l * (d.K.x * b - d.K.y * e + a.K.x * k - a.K.y * h);
          d.pa = m;
          a.pa = j;
          break
        }
        m = 0;
        j = -a.yd * f;
        K = e.vb.b.x * j + c;
        if(j >= 0 && K >= 0) {
          b = m - b;
          g = j - g;
          e = b * h;
          b *= k;
          h *= g;
          k *= g;
          u.x -= y * (e + h);
          u.y -= y * (b + k);
          q -= N * (d.J.x * b - d.J.y * e + a.J.x * k - a.J.y * h);
          w.x += C * (e + h);
          w.y += C * (b + k);
          v += l * (d.K.x * b - d.K.y * e + a.K.x * k - a.K.y * h);
          d.pa = m;
          a.pa = j;
          break
        }
        j = m = 0;
        K = c;
        V = f;
        if(K >= 0 && V >= 0) {
          b = m - b;
          g = j - g;
          e = b * h;
          b *= k;
          h *= g;
          k *= g;
          u.x -= y * (e + h);
          u.y -= y * (b + k);
          q -= N * (d.J.x * b - d.J.y * e + a.J.x * k - a.J.y * h);
          w.x += C * (e + h);
          w.y += C * (b + k);
          v += l * (d.K.x * b - d.K.y * e + a.K.x * k - a.K.y * h);
          d.pa = m;
          a.pa = j;
          break
        }
        break
      }
    }
    n.F = q;
    s.F = v
  }
};
x.af = function() {
  for(var a = 0;a < this.ce;++a) {
    for(var d = this.Gb[a], b = d.Vi, c = 0;c < d.eb;++c) {
      var e = b.z[c], f = d.Ia[c];
      e.Uc = f.pa;
      e.Wc = f.ic
    }
  }
};
x.Ic = function(a) {
  a === i && (a = 0);
  for(var d = 0, b = 0;b < this.ce;b++) {
    var c = this.Gb[b], e = c.da, f = c.ea, g = e.m * e.w, h = e.m * e.M, k = f.m * f.w, j = f.m * f.M;
    Tc.wa(c);
    for(var o = Tc.H, n = 0;n < c.eb;n++) {
      var s = c.Ia[n], q = Tc.z[n], v = Tc.Ge[n], u = q.x - e.c.h.x, w = q.y - e.c.h.y, y = q.x - f.c.h.x, q = q.y - f.c.h.y, d = d < v ? d : v, v = -s.ii * H(a * (v + 0.005), -0.2, 0), s = v * o.x;
      v *= o.y;
      e.c.h.x -= g * s;
      e.c.h.y -= g * v;
      e.c.k -= h * (u * v - w * s);
      U(e);
      f.c.h.x += k * s;
      f.c.h.y += k * v;
      f.c.k += j * (y * v - q * s);
      U(f)
    }
  }
  return d > -0.0075
};
var Sc = new bc, Tc = new Qc;
function Uc() {
  this.ib = new D(0, 0);
  this.id = new $b
}
Uc.prototype.i = function(a) {
  this.ib.l(a.ib);
  this.id.i(a.id)
};
function W() {
}
(function(a) {
  a.bg = function(a, b, c, e) {
    e === i && (e = 0);
    var f = 0, g = b[0].ib, h = b[1].ib, k = c.x * g.x + c.y * g.y - e, c = c.x * h.x + c.y * h.y - e;
    k <= 0 && a[f++].i(b[0]);
    c <= 0 && a[f++].i(b[1]);
    if(k * c < 0) {
      c = k / (k - c), e = a[f].ib, e.x = g.x + c * (h.x - g.x), e.y = g.y + c * (h.y - g.y), a[f].id = k > 0 ? b[0].id : b[1].id, f++
    }
    return f
  };
  a.pe = function(a, b, c, e, f) {
    c === i && (c = 0);
    for(var g = a.j, h = a.aa, a = e.j, k = b.d.a.x * h[c].x + b.d.b.x * h[c].y, h = b.d.a.y * h[c].x + b.d.b.y * h[c].y, j = f.d.a.x * k + f.d.a.y * h, o = f.d.b.x * k + f.d.b.y * h, n = 0, s = Number.MAX_VALUE, q = 0;q < e.W;++q) {
      var v = a[q].x * j + a[q].y * o;
      v < s && (s = v, n = q)
    }
    return(f.position.x + (f.d.a.x * a[n].x + f.d.b.x * a[n].y) - (b.position.x + (b.d.a.x * g[c].x + b.d.b.x * g[c].y))) * k + (f.position.y + (f.d.a.y * a[n].x + f.d.b.y * a[n].y) - (b.position.y + (b.d.a.y * g[c].x + b.d.b.y * g[c].y))) * h
  };
  a.gg = function(d, b, c, e, f) {
    var g = b.aa, h = f.position.x + (f.d.a.x * e.qb.x + f.d.b.x * e.qb.y), k = f.position.y + (f.d.a.y * e.qb.x + f.d.b.y * e.qb.y);
    h -= c.position.x + (c.d.a.x * b.qb.x + c.d.b.x * b.qb.y);
    k -= c.position.y + (c.d.a.y * b.qb.x + c.d.b.y * b.qb.y);
    for(var j = h * c.d.a.x + k * c.d.a.y, k = h * c.d.b.x + k * c.d.b.y, h = 0, o = -Number.MAX_VALUE, n = 0;n < b.W;++n) {
      var s = g[n].x * j + g[n].y * k;
      s > o && (o = s, h = n)
    }
    g = a.pe(b, c, h, e, f);
    j = h - 1;
    j < 0 && (j = b.W - 1);
    k = a.pe(b, c, j, e, f);
    o = h + 1;
    o >= b.W && (o = 0);
    var n = a.pe(b, c, o, e, f), q = s = 0, v = 0;
    if(k > g && k > n) {
      v = -1, s = j, q = k
    }else {
      if(n > g) {
        v = 1, s = o, q = n
      }else {
        return d[0] = h, g
      }
    }
    for(;;) {
      if(v == -1 ? (h = s - 1, h < 0 && (h = b.W - 1)) : (h = s + 1, h >= b.W && (h = 0)), g = a.pe(b, c, h, e, f), g > q) {
        s = h, q = g
      }else {
        break
      }
    }
    d[0] = s;
    return q
  };
  a.uh = function(a, b, c, e, f, g) {
    e === i && (e = 0);
    for(var h = c.d.a.x * b.aa[e].x + c.d.b.x * b.aa[e].y, b = c.d.a.y * b.aa[e].x + c.d.b.y * b.aa[e].y, c = g.d.a.x * h + g.d.a.y * b, b = g.d.b.x * h + g.d.b.y * b, h = c, c = 0, k = Number.MAX_VALUE, j = 0;j < f.W;j++) {
      var o = h * f.aa[j].x + b * f.aa[j].y;
      o < k && (k = o, c = j)
    }
    h = c + 1;
    h >= f.W && (h = 0);
    a[0].ib.x = g.position.x + (g.d.a.x * f.j[c].x + g.d.b.x * f.j[c].y);
    a[0].ib.y = g.position.y + (g.d.a.y * f.j[c].x + g.d.b.y * f.j[c].y);
    a[0].id.mb.ij = e;
    a[0].id.mb.ti = c;
    a[0].id.mb.ui = 0;
    a[1].ib.x = g.position.x + (g.d.a.x * f.j[h].x + g.d.b.x * f.j[h].y);
    a[1].ib.y = g.position.y + (g.d.a.y * f.j[h].x + g.d.b.y * f.j[h].y);
    a[1].id.mb.ij = e;
    a[1].id.mb.ti = h;
    a[1].id.mb.ui = 1
  };
  a.df = function() {
    return[new Uc, new Uc]
  };
  a.lh = function(d, b, c, e, f) {
    d.ba = 0;
    var g = b.N + e.N;
    a.Uf[0] = 0;
    var h = a.gg(a.Uf, b, c, e, f);
    if(!(h > g)) {
      a.Vf[0] = 0;
      var k = a.gg(a.Vf, e, f, b, c);
      if(!(k > g)) {
        var j = b, o = e, n = c, s = f, q = a.Uf[0], v = 0;
        d.I = O.Oc;
        if(k > 0.98 * h + 0.001) {
          j = e, o = b, n = f, s = c, q = a.Vf[0], d.I = O.yf, v = 1
        }
        b = a.lj;
        a.uh(b, j, n, q, o, s);
        o = j.j[q];
        j = q + 1 < j.W ? j.j[q + 1] : j.j[0];
        a.yc.i(j.x - o.x, j.y - o.y);
        E(a.yc);
        a.Wf.x = a.yc.y;
        a.Wf.y = -a.yc.x;
        a.Zg.i(0.5 * (o.x + j.x), 0.5 * (o.y + j.y));
        a.zb.x = n.d.a.x * a.yc.x + n.d.b.x * a.yc.y;
        a.zb.y = n.d.a.y * a.yc.x + n.d.b.y * a.yc.y;
        a.Xf.x = -a.zb.x;
        a.Xf.y = -a.zb.y;
        a.Dd.x = a.zb.y;
        a.Dd.y = -a.zb.x;
        a.Ed.x = n.position.x + (n.d.a.x * o.x + n.d.b.x * o.y);
        a.Ed.y = n.position.y + (n.d.a.y * o.x + n.d.b.y * o.y);
        a.Ne.x = n.position.x + (n.d.a.x * j.x + n.d.b.x * j.y);
        a.Ne.y = n.position.y + (n.d.a.y * j.x + n.d.b.y * j.y);
        if(!(a.bg(a.Yg, b, a.Xf, -a.zb.x * a.Ed.x - a.zb.y * a.Ed.y + g) < 2) && !(a.bg(a.Cd, a.Yg, a.zb, a.zb.x * a.Ne.x + a.zb.y * a.Ne.y + g) < 2)) {
          d.ta.l(a.Wf);
          d.A.l(a.Zg);
          n = a.Dd.x * a.Ed.x + a.Dd.y * a.Ed.y;
          for(q = j = 0;q < 2;++q) {
            if(a.Dd.x * a.Cd[q].ib.x + a.Dd.y * a.Cd[q].ib.y - n <= g) {
              o = a.Cd[q].ib.x - s.position.x, b = a.Cd[q].ib.y - s.position.y, d.z[j].A.x = o * s.d.a.x + b * s.d.a.y, d.z[j].A.y = o * s.d.b.x + b * s.d.b.y, d.z[j].cc.i(a.Cd[q].id), d.z[j].cc.mb.Ij = v, j++
            }
          }
          d.ba = j
        }
      }
    }
  };
  a.jh = function(a, b, c, e, f) {
    a.ba = 0;
    var g = f.position.x + (f.d.a.x * e.V.x + f.d.b.x * e.V.y) - (c.position.x + (c.d.a.x * b.V.x + c.d.b.x * b.V.y)), c = f.position.y + (f.d.a.y * e.V.x + f.d.b.y * e.V.y) - (c.position.y + (c.d.a.y * b.V.x + c.d.b.y * b.V.y)), f = b.N + e.N;
    if(!(g * g + c * c > f * f)) {
      a.I = O.xf, a.A.l(b.V), a.ta.ca(), a.ba = 1, a.z[0].A.l(e.V), a.z[0].cc.key = 0
    }
  };
  a.kh = function(a, b, c, e, f) {
    a.ba = 0;
    for(var g = f.position.x + (f.d.a.x * e.V.x + f.d.b.x * e.V.y) - c.position.x, h = f.position.y + (f.d.a.y * e.V.x + f.d.b.y * e.V.y) - c.position.y, f = g * c.d.a.x + h * c.d.a.y, c = g * c.d.b.x + h * c.d.b.y, g = 0, h = -Number.MAX_VALUE, k = b.N + e.N, j = 0;j < b.W;++j) {
      var o = b.aa[j].x * (f - b.j[j].x) + b.aa[j].y * (c - b.j[j].y);
      if(o > k) {
        return
      }
      o > h && (h = o, g = j)
    }
    o = g + 1;
    o >= b.W && (o = 0);
    var j = b.j[g], n = b.j[o];
    if(h < Number.MIN_VALUE) {
      a.ba = 1, a.I = O.Oc, a.ta.l(b.aa[g]), a.A.x = 0.5 * (j.x + n.x), a.A.y = 0.5 * (j.y + n.y)
    }else {
      if((f - j.x) * (n.x - j.x) + (c - j.y) * (n.y - j.y) <= 0) {
        if((f - j.x) * (f - j.x) + (c - j.y) * (c - j.y) > k * k) {
          return
        }
        a.ba = 1;
        a.I = O.Oc;
        a.ta.x = f - j.x;
        a.ta.y = c - j.y;
        E(a.ta);
        a.A.l(j)
      }else {
        if((f - n.x) * (j.x - n.x) + (c - n.y) * (j.y - n.y) <= 0) {
          if((f - n.x) * (f - n.x) + (c - n.y) * (c - n.y) > k * k) {
            return
          }
          a.ba = 1;
          a.I = O.Oc;
          a.ta.x = f - n.x;
          a.ta.y = c - n.y;
          E(a.ta);
          a.A.l(n)
        }else {
          o = 0.5 * (j.x + n.x);
          j = 0.5 * (j.y + n.y);
          h = (f - o) * b.aa[g].x + (c - j) * b.aa[g].y;
          if(h > k) {
            return
          }
          a.ba = 1;
          a.I = O.Oc;
          a.ta.x = b.aa[g].x;
          a.ta.y = b.aa[g].y;
          E(a.ta);
          a.A.i(o, j)
        }
      }
    }
    a.z[0].A.l(e.V);
    a.z[0].cc.key = 0
  };
  a.Sb = function(a, b) {
    return b.lowerBound.x - a.upperBound.x > 0 ? !1 : b.lowerBound.y - a.upperBound.y > 0 ? !1 : a.lowerBound.x - b.upperBound.x > 0 ? !1 : a.lowerBound.y - b.upperBound.y > 0 ? !1 : !0
  }
})(W);
W.lj = W.df();
W.Yg = W.df();
W.Cd = W.df();
W.Uf = [0];
W.Vf = [0];
W.yc = new D;
W.Wf = new D;
W.Zg = new D;
W.Dd = new D;
W.zb = new D;
W.Xf = new D;
W.Ed = new D;
W.Ne = new D;
function Vc() {
  this.A = new D(0, 0);
  this.sa = new D(0, 0)
}
Vc.prototype.wa = function(a, d, b, c, e) {
  this.vc = d;
  this.wc = c;
  var f = a.count;
  I(0 < f && f < 3);
  var g, h, k, j, o = j = k = c = d = 0, n = 0, o = 0;
  f == 1 ? (this.I = Wc, g = this.vc.va(a.ga[0]), h = this.wc.va(a.ha[0]), f = g, a = b.d, d = b.position.x + (a.a.x * f.x + a.b.x * f.y), c = b.position.y + (a.a.y * f.x + a.b.y * f.y), f = h, a = e.d, k = e.position.x + (a.a.x * f.x + a.b.x * f.y), j = e.position.y + (a.a.y * f.x + a.b.y * f.y), this.sa.x = k - d, this.sa.y = j - c, E(this.sa)) : (a.ha[0] == a.ha[1] ? (this.I = Xc, d = this.vc.va(a.ga[0]), c = this.vc.va(a.ga[1]), h = this.wc.va(a.ha[0]), this.A.x = 0.5 * (d.x + c.x), this.A.y = 
  0.5 * (d.y + c.y), this.sa = ka(G(c, d)), E(this.sa), f = this.sa, a = b.d, o = a.a.x * f.x + a.b.x * f.y, n = a.a.y * f.x + a.b.y * f.y, f = this.A, a = b.d, d = b.position.x + (a.a.x * f.x + a.b.x * f.y), c = b.position.y + (a.a.y * f.x + a.b.y * f.y), f = h, a = e.d, k = e.position.x + (a.a.x * f.x + a.b.x * f.y), j = e.position.y + (a.a.y * f.x + a.b.y * f.y), o = (k - d) * o + (j - c) * n) : a.ga[0] == a.ga[0] ? (this.I = Yc, k = this.wc.va(a.ha[0]), j = this.wc.va(a.ha[1]), g = this.vc.va(a.ga[0]), 
  this.A.x = 0.5 * (k.x + j.x), this.A.y = 0.5 * (k.y + j.y), this.sa = ka(G(j, k)), E(this.sa), f = this.sa, a = e.d, o = a.a.x * f.x + a.b.x * f.y, n = a.a.y * f.x + a.b.y * f.y, f = this.A, a = e.d, k = e.position.x + (a.a.x * f.x + a.b.x * f.y), j = e.position.y + (a.a.y * f.x + a.b.y * f.y), f = g, a = b.d, d = b.position.x + (a.a.x * f.x + a.b.x * f.y), c = b.position.y + (a.a.y * f.x + a.b.y * f.y), o = (d - k) * o + (c - j) * n) : (d = this.vc.va(a.ga[0]), c = this.vc.va(a.ga[1]), k = this.wc.va(a.ha[0]), 
  j = this.wc.va(a.ha[1]), F(b, g), g = la(b.d, G(c, d)), F(e, h), o = la(e.d, G(j, k)), e = g.x * g.x + g.y * g.y, h = o.x * o.x + o.y * o.y, a = G(o, g), b = g.x * a.x + g.y * a.y, a = o.x * a.x + o.y * a.y, g = g.x * o.x + g.y * o.y, n = e * h - g * g, o = 0, n != 0 && (o = H((g * a - b * h) / n, 0, 1)), (g * o + a) / h < 0 && (o = H((g - b) / e, 0, 1)), g = new D(0, 0), g.x = d.x + o * (c.x - d.x), g.y = d.y + o * (c.y - d.y), h = new D(0, 0), h.x = k.x + o * (j.x - k.x), h.y = k.y + o * (j.y - 
  k.y), o == 0 || o == 1 ? (this.I = Yc, this.sa = ka(G(j, k)), E(this.sa), this.A = h) : (this.I = Xc, this.sa = ka(G(c, d)), this.A = g)), o < 0 && this.sa.lg())
};
Vc.prototype.Bb = function(a, d) {
  var b, c, e = 0;
  switch(this.I) {
    case Wc:
      b = ma(a.d, this.sa);
      c = ma(d.d, this.sa.Ec());
      b = this.vc.Nd(b);
      c = this.wc.Nd(c);
      b = F(a, b);
      c = F(d, c);
      e = (c.x - b.x) * this.sa.x + (c.y - b.y) * this.sa.y;
      break;
    case Xc:
      e = la(a.d, this.sa);
      b = F(a, this.A);
      c = ma(d.d, e.Ec());
      c = this.wc.Nd(c);
      c = F(d, c);
      e = (c.x - b.x) * e.x + (c.y - b.y) * e.y;
      break;
    case Yc:
      e = la(d.d, this.sa);
      c = F(d, this.A);
      b = ma(a.d, e.Ec());
      b = this.vc.Nd(b);
      b = F(a, b);
      e = (b.x - c.x) * e.x + (b.y - c.y) * e.y;
      break;
    default:
      I(!1)
  }
  return e
};
var Wc = 1, Xc = 2, Yc = 4;
var Zc = 0, $c = 0, ad = 0, bd = 0, cd = 0, dd = new za, ed = new xa, fd = new Ca, gd = new Ca, hd = new Vc, id = new ya;
function jd() {
  this.u = new D(0, 0);
  this.ra = new D;
  this.h = new D(0, 0)
}
jd.prototype.i = function(a) {
  this.u.l(a.u);
  this.ra.l(a.ra);
  this.h.l(a.h);
  this.kb = a.kb;
  this.k = a.k;
  this.qa = a.qa
};
jd.prototype.la = function() {
  var a = new jd;
  a.u.l(this.u);
  a.ra.l(this.ra);
  a.h.l(this.h);
  a.kb = this.kb;
  a.k = this.k;
  a.qa = this.qa;
  return a
};
jd.prototype.ub = function(a, d) {
  d === i && (d = 0);
  a.position.x = (1 - d) * this.ra.x + d * this.h.x;
  a.position.y = (1 - d) * this.ra.y + d * this.h.y;
  a.d.i((1 - d) * this.kb + d * this.k);
  var b = a.d;
  a.position.x -= b.a.x * this.u.x + b.b.x * this.u.y;
  a.position.y -= b.a.y * this.u.x + b.b.y * this.u.y
};
jd.prototype.jc = function(a) {
  a === i && (a = 0);
  if(this.qa < a && 1 - this.qa > Number.MIN_VALUE) {
    var d = (a - this.qa) / (1 - this.qa);
    this.ra.x = (1 - d) * this.ra.x + d * this.h.x;
    this.ra.y = (1 - d) * this.ra.y + d * this.h.y;
    this.kb = (1 - d) * this.kb + d * this.k;
    this.qa = a
  }
};
function kd() {
}
;function ld() {
  this.position = new D(0, 0);
  this.Hg = new D(0, 0);
  this.Ac = p;
  this.position.ca();
  this.Ta = 0;
  this.Hg.ca();
  this.Oh = this.Ci = this.Ph = 0;
  this.Qh = this.Nh = !0;
  this.Vh = this.od = !1;
  this.type = Q;
  this.Mh = !0;
  this.vi = 1
}
var Q = 0;
function X() {
  this.Ba = new kd;
  this.Ca = new kd;
  this.Ya = new O;
  this.ee = new O
}
function gc(a, d) {
  var b = a.G.p, c = a.C.ia, e = a.G.ia;
  d.wa(a.Ya, a.C.p.ub(), c.N, b.ub(), e.N)
}
X.prototype.Rb = t("Oe");
X.prototype.ma = function(a, d) {
  a === i && (a = p);
  d === i && (d = p);
  this.enabled = !0;
  this.ve = this.$c = this.rf = this.Oe = !1;
  if(!a || !d) {
    this.G = this.C = p
  }else {
    if(a.Rb() || d.Rb()) {
      this.Oe = !0
    }
    var b = a.p, c = d.p;
    if(b.L() != 2 || (b.Hb & md) == md || c.L() != 2 || (c.Hb & md) == md) {
      this.rf = !0
    }
    this.C = a;
    this.G = d;
    this.Ya.ba = 0;
    this.r = this.oa = p;
    this.Ba.ka = p;
    this.Ba.Y = p;
    this.Ba.next = p;
    this.Ba.T = p;
    this.Ca.ka = p;
    this.Ca.Y = p;
    this.Ca.next = p;
    this.Ca.T = p
  }
};
function nd(a, d) {
  var b = a.ee;
  a.ee = a.Ya;
  a.Ya = b;
  a.enabled = !0;
  var b = !1, c = a.$c, e = a.C.p, f = a.G.p, g = a.C.$b.Sb(a.G.$b);
  if(a.Oe) {
    g && (b = J.Sb(a.C.ia, e.ub(), a.G.ia, f.ub())), a.Ya.ba = 0
  }else {
    a.rf = e.L() != 2 || (e.Hb & md) == md || f.L() != 2 || (f.Hb & md) == md ? !0 : !1;
    if(g) {
      a.Bb();
      b = a.Ya.ba > 0;
      for(g = 0;g < a.Ya.ba;g++) {
        var h = a.Ya.z[g];
        h.Uc = 0;
        for(var k = h.Wc = 0;k < a.ee.ba;k++) {
          var j = a.ee.z[k];
          if(j.cc.key == h.cc.key) {
            h.Uc = j.Uc;
            h.Wc = j.Wc;
            break
          }
        }
      }
    }else {
      a.Ya.ba = 0
    }
    b != c && (Y(e, !0), Y(f, !0))
  }
  a.$c = b;
  !c && b && d.Id(a);
  c && !b && d.ad(a);
  a.Oe || d.Td(a, a.ee)
}
X.prototype.Bb = r();
var od = new function() {
  this.fb = new Aa;
  this.gb = new Aa;
  this.ah = new jd;
  this.bh = new jd
};
function pd() {
  X.call(this)
}
A(pd, X);
function qd() {
  return new pd
}
pd.prototype.ma = function(a, d) {
  X.prototype.ma.call(this, a, d)
};
pd.prototype.Bb = function() {
  W.jh(this.Ya, this.C.ia, this.C.p.g, this.G.ia, this.G.p.g)
};
function rd() {
  X.call(this)
}
A(rd, X);
function sd() {
  return new rd
}
rd.prototype.ma = function(a, d) {
  X.prototype.ma.call(this, a, d)
};
rd.prototype.Bb = r();
function td() {
  X.call(this)
}
A(td, X);
function ud() {
  return new td
}
td.prototype.ma = function(a, d) {
  X.prototype.ma.call(this, a, d);
  I(a.L() == J.pc);
  I(d.L() == J.Nc)
};
td.prototype.Bb = function() {
  W.kh(this.Ya, this.C.ia, this.C.p.g, this.G.ia, this.G.p.g)
};
function vd() {
  X.call(this)
}
A(vd, X);
function wd() {
  return new vd
}
vd.prototype.ma = function(a, d) {
  X.prototype.ma.call(this, a, d);
  I(a.L() == J.pc);
  I(d.L() == J.ue)
};
vd.prototype.Bb = r();
function xd() {
  X.call(this)
}
A(xd, X);
function yd() {
  return new xd
}
xd.prototype.ma = function(a, d) {
  X.prototype.ma.call(this, a, d)
};
xd.prototype.Bb = function() {
  W.lh(this.Ya, this.C.ia, this.C.p.g, this.G.ia, this.G.p.g)
};
function zd() {
}
;function Ad() {
  this.cb = [];
  Bd(this, qd, J.Nc, J.Nc);
  Bd(this, ud, J.pc, J.Nc);
  Bd(this, yd, J.pc, J.pc);
  Bd(this, sd, J.ue, J.Nc);
  Bd(this, wd, J.pc, J.ue)
}
function Bd(a, d, b, c) {
  a.cb[b] = a.cb[b] || [];
  a.cb[b][c] = new zd;
  a.cb[b][c].tf = d;
  a.cb[b][c].Of = !0;
  if(b != c) {
    a.cb[c] = a.cb[c] || [], a.cb[c][b] = new zd, a.cb[c][b].tf = d, a.cb[c][b].Of = !1
  }
}
Ad.prototype.Cc = function(a, d) {
  var b = this.cb[a.L()][d.L()], c;
  if(b.Yc) {
    return c = b.Yc, b.Yc = c.r, b.Ug--, c.ma(a, d), c
  }
  c = b.tf;
  return c != p ? (b.Of ? (c = c(), c.ma(a, d)) : (c = c(), c.ma(d, a)), c) : p
};
Ad.prototype.Cc = function(a, d) {
  var b = this.cb[a.L()][d.L()], c;
  if(b.Yc) {
    return c = b.Yc, b.Yc = c.r, b.Ug--, c.ma(a, d), c
  }
  c = b.tf;
  return c != p ? (b.Of ? (c = c(), c.ma(a, d)) : (c = c(), c.ma(d, a)), c) : p
};
Ad.prototype.kc = function(a) {
  a.Ya.ba > 0 && (Y(a.C.p, !0), Y(a.G.p, !0));
  var d = this.cb[a.C.L()][a.G.L()];
  d.Ug++;
  a.r = d.Yc;
  d.Yc = a
};
function Cd() {
}
;function Dd() {
  this.B = new qc
}
;function Ed() {
  if(this.constructor === Ed) {
    this.Kb = p, this.Ki = this.Qj = 0
  }
}
x = Ed.prototype;
x.Kd = function(a, d) {
  var b = new Dd;
  b.B.lowerBound.x = a.lowerBound.x - 0.1;
  b.B.lowerBound.y = a.lowerBound.y - 0.1;
  b.B.upperBound.x = a.upperBound.x + 0.1;
  b.B.upperBound.y = a.upperBound.y + 0.1;
  b.Ac = d;
  Fd(this, b);
  return b
};
x.Ld = function(a) {
  Gd(this, a)
};
x.ef = function(a, d, b) {
  I(a.Ua == p);
  if(sc(a.B, d)) {
    return!1
  }
  Gd(this, a);
  var c = 0.1 + 2 * Math.abs(b.x), b = 0.1 + 2 * Math.abs(b.y);
  a.B.lowerBound.x = d.lowerBound.x - c;
  a.B.lowerBound.y = d.lowerBound.y - b;
  a.B.upperBound.x = d.upperBound.x + c;
  a.B.upperBound.y = d.upperBound.y + b;
  Fd(this, a);
  return!0
};
x.dd = function(a) {
  return a.B
};
x.Fc = function(a) {
  return a.Ac
};
x.ff = function(a, d) {
  if(this.Kb !== p) {
    var b = [];
    for(b.push(this.Kb);b.length > 0;) {
      var c = b.pop();
      if(c.B.Sb(d)) {
        if(c.Ua == p) {
          if(!a(c)) {
            break
          }
        }else {
          b.push(c.Ua), b.push(c.nc)
        }
      }
    }
  }
};
function Fd(a, d) {
  a.Ki++;
  if(a.Kb === p) {
    a.Kb = d, a.Kb.parent = p
  }else {
    for(var b = rc(d.B), c = a.Kb;c.Ua != p;) {
      var e = c.Ua, c = c.nc, c = Math.abs((e.B.lowerBound.x + e.B.upperBound.x) / 2 - b.x) + Math.abs((e.B.lowerBound.y + e.B.upperBound.y) / 2 - b.y) < Math.abs((c.B.lowerBound.x + c.B.upperBound.x) / 2 - b.x) + Math.abs((c.B.lowerBound.y + c.B.upperBound.y) / 2 - b.y) ? e : c
    }
    b = c.parent;
    e = new Dd;
    e.parent = b;
    e.Ac = p;
    tc(e.B, d.B, c.B);
    if(b) {
      c.parent.Ua == c ? b.Ua = e : b.nc = e;
      e.Ua = c;
      e.nc = d;
      c.parent = e;
      for(d.parent = e;b;) {
        if(sc(b.B, e.B)) {
          break
        }
        tc(b.B, b.Ua.B, b.nc.B);
        e = b;
        b = b.parent
      }
    }else {
      e.Ua = c, e.nc = d, c.parent = e, d.parent = e, a.Kb = e
    }
  }
}
function Gd(a, d) {
  if(d == a.Kb) {
    a.Kb = p
  }else {
    var b = d.parent, c = b.parent, e;
    e = b.Ua == d ? b.nc : b.Ua;
    if(c) {
      c.Ua == b ? c.Ua = e : c.nc = e;
      for(e.parent = c;c;) {
        b = c.B;
        e = c;
        var f = new qc;
        tc(f, c.Ua.B, c.nc.B);
        e.B = f;
        if(sc(b, c.B)) {
          break
        }
        c = c.parent
      }
    }else {
      a.Kb = e, e.parent = p
    }
  }
}
;function Hd() {
  this.rb = new Ed;
  this.ec = [];
  this.fe = [];
  this.Vc = 0
}
x = Hd.prototype;
x.Kd = function(a, d) {
  var b = this.rb.Kd(a, d);
  this.Ri++;
  return this.ec[this.ec.length] = b
};
x.Ld = function(a) {
  this.ec.splice(this.ec.indexOf(a), 1);
  this.Ri--;
  this.rb.Ld(a)
};
x.ef = function(a, d, b) {
  this.rb.ef(a, d, b) && (this.ec[this.ec.length] = a)
};
x.Sb = function(a, d) {
  return this.rb.dd(a).Sb(this.rb.dd(d))
};
x.Fc = function(a) {
  return this.rb.Fc(a)
};
x.dd = function(a) {
  return this.rb.dd(a)
};
function Id(a, d) {
  for(var b = a.Vc = 0;b < a.ec.length;++b) {
    var c = a.ec[b];
    a.rb.ff(function(b) {
      if(b == c) {
        return!0
      }
      a.Vc == a.fe.length && (a.fe[a.Vc] = new Cd);
      var d = a.fe[a.Vc];
      d.fb = b < c ? b : c;
      d.gb = b >= c ? b : c;
      a.Vc++;
      return!0
    }, a.rb.dd(c))
  }
  for(b = a.ec.length = 0;b < a.Vc;) {
    var e = a.fe[b];
    d(a.rb.Fc(e.fb), a.rb.Fc(e.gb));
    for(b++;b < a.Vc;) {
      var f = a.fe[b];
      if(f.fb != e.fb || f.gb != e.gb) {
        break
      }
      ++b
    }
  }
}
x.ff = function(a, d) {
  this.rb.ff(a, d)
};
function Jd() {
}
Jd.prototype.Id = r();
Jd.prototype.ad = r();
Jd.prototype.Td = r();
Jd.prototype.Sd = r();
var Kd = new Jd;
function Ld() {
  if(this.constructor === Ld) {
    this.Ha = p, this.Xa = 0, this.Cf = Mc, this.td = Kd, this.Jg = new Ad, this.Rc = new Hd
  }
}
Ld.prototype.hh = function(a, d) {
  var b = a.p, c = d.p;
  if(b != c && c.Cb(b) && this.Cf.Cb(a, d)) {
    for(c = c.P;c;) {
      if(c.T == b) {
        var e = c.ka.C, f = c.ka.G;
        if(e == a && f == d) {
          return
        }
        if(e == d && f == a) {
          return
        }
      }
      c = c.next
    }
    e = this.Jg.Cc(a, d);
    a = e.C;
    d = e.G;
    b = a.p;
    c = d.p;
    e.oa = p;
    e.r = this.Ha.P;
    if(this.Ha.P != p) {
      this.Ha.P.oa = e
    }
    this.Ha.P = e;
    e.Ba.ka = e;
    e.Ba.T = c;
    e.Ba.Y = p;
    e.Ba.next = b.P;
    if(b.P != p) {
      b.P.Y = e.Ba
    }
    b.P = e.Ba;
    e.Ca.ka = e;
    e.Ca.T = b;
    e.Ca.Y = p;
    e.Ca.next = c.P;
    if(c.P != p) {
      c.P.Y = e.Ca
    }
    c.P = e.Ca;
    this.Ha.Xa++
  }
};
function Md(a) {
  Id(a.Rc, Yb(a, a.hh))
}
Ld.prototype.kc = function(a) {
  var d = a.C.p, b = a.G.p;
  a.$c && this.td.ad(a);
  if(a.oa) {
    a.oa.r = a.r
  }
  if(a.r) {
    a.r.oa = a.oa
  }
  if(a == this.Ha.P) {
    this.Ha.P = a.r
  }
  if(a.Ba.Y) {
    a.Ba.Y.next = a.Ba.next
  }
  if(a.Ba.next) {
    a.Ba.next.Y = a.Ba.Y
  }
  if(a.Ba == d.P) {
    d.P = a.Ba.next
  }
  if(a.Ca.Y) {
    a.Ca.Y.next = a.Ca.next
  }
  if(a.Ca.next) {
    a.Ca.next.Y = a.Ca.Y
  }
  if(a.Ca == b.P) {
    b.P = a.Ca.next
  }
  this.Jg.kc(a);
  this.Xa--
};
Ld.Xj = new function() {
  this.position = new D;
  this.$j = new D;
  this.fc = new D;
  this.id = new $b
};
function Nd() {
}
;function Od(a) {
  this.Ma = new Nd;
  this.Na = new Nd;
  this.Oj = new D(0, 0);
  this.Pj = new D(0, 0);
  I(a.da != a.ea);
  this.I = a.type;
  this.r = this.oa = p;
  this.Ea = a.da;
  this.Fa = a.ea;
  this.Ig = a.xg;
  this.wd = a.Ac
}
x = Od.prototype;
x.L = t("I");
x.bd = aa(p);
x.cd = aa(p);
x.Fc = t("wd");
x.Qb = function() {
  return this.Ea.Qb() && this.Fa.Qb()
};
x.ed = r();
x.Jc = r();
x.af = r();
x.Ic = aa(!1);
function Z(a, d, b) {
  this.of = 255 * H(a, 0, 1);
  this.lf = 255 * H(d, 0, 1);
  this.jf = 255 * H(b, 0, 1)
}
Z.prototype.i = function(a, d, b) {
  this.of = 255 * H(a, 0, 1);
  this.lf = 255 * H(d, 0, 1);
  this.jf = 255 * H(b, 0, 1)
};
M(Z.prototype, "r", {enumerable:!1, configurable:!0, set:function(a) {
  this.of = 255 * H(a, 0, 1)
}});
M(Z.prototype, "g", {enumerable:!1, configurable:!0, set:function(a) {
  this.lf = 255 * H(a, 0, 1)
}});
M(Z.prototype, "b", {enumerable:!1, configurable:!0, set:function(a) {
  this.jf = 255 * H(a, 0, 1)
}});
M(Z.prototype, "color", {enumerable:!1, configurable:!0, get:function() {
  return this.of << 16 | this.lf << 8 | this.jf
}});
function Pd() {
  this.Ff = new Kc;
  this.$b = new qc;
  this.ia = this.r = this.p = this.wd = p;
  this.If = this.Gf = this.Be = 0
}
x = Pd.prototype;
x.L = function() {
  return this.ia.L()
};
x.Rb = t("Li");
x.Fc = t("wd");
x.hg = function(a) {
  a === i && (a = p);
  a == p && (a = new Ba);
  this.ia.Ye(a, this.Be);
  return a
};
x.Cc = function(a, d, b) {
  this.wd = b.Ac;
  this.Gf = b.bb;
  this.If = b.Mb;
  this.p = a;
  this.r = p;
  this.Ff = b.filter.la();
  this.Li = b.Zd;
  this.ia = b.shape.la();
  this.Be = b.kd
};
x.kc = function() {
  this.ia = p
};
x.Kd = function(a, d) {
  this.ia.Jd(this.$b, d);
  this.uc = a.Kd(this.$b, this)
};
x.Ld = function(a) {
  if(this.uc != p) {
    a.Ld(this.uc), this.uc = p
  }
};
function Qd(a, d, b, c) {
  if(a.uc) {
    var e = new qc, f = new qc;
    a.ia.Jd(e, b);
    a.ia.Jd(f, c);
    tc(a.$b, e, f);
    d.ef(a.uc, a.$b, G(c.position, b.position))
  }
}
;function Rd(a, d) {
  this.g = new Ca;
  this.c = new jd;
  this.q = new D(0, 0);
  this.de = new D(0, 0);
  this.Hb = 0;
  a.Vh && (this.Hb |= md);
  a.od && (this.Hb |= Sd);
  this.Bf = a.Nh;
  this.pb = a.Qh;
  a.Mh && (this.Hb |= Td);
  this.Ha = d;
  this.g.position.l(a.position);
  this.g.d.i(a.Ta);
  this.c.u.ca();
  this.c.qa = 1;
  this.c.kb = this.c.k = a.Ta;
  var b = this.g.d, c = this.c.u;
  this.c.h.x = b.a.x * c.x + b.b.x * c.y;
  this.c.h.y = b.a.y * c.x + b.b.y * c.y;
  this.c.h.x += this.g.position.x;
  this.c.h.y += this.g.position.y;
  this.c.ra.l(this.c.h);
  this.P = this.Ae = this.$ = p;
  this.Hi = 0;
  this.r = this.oa = p;
  this.q.l(a.Hg);
  this.F = a.Ph;
  this.Oi = a.Ci;
  this.Fi = a.Oh;
  this.de.ca();
  this.He = this.Jf = 0;
  this.I = a.type;
  this.w = this.I == 2 ? this.m = 1 : this.m = 0;
  this.M = this.Zb = 0;
  this.Ji = a.vi;
  this.wd = a.Ac;
  this.bc = p;
  this.Mg = 0
}
function Ud(a, d, b) {
  b === i && (b = 0);
  if(a.Ha.Tc != !0) {
    a.g.d.i(b);
    a.g.position.l(d);
    var d = a.g.d, c = a.c.u;
    a.c.h.x = d.a.x * c.x + d.b.x * c.y;
    a.c.h.y = d.a.y * c.x + d.b.y * c.y;
    a.c.h.x += a.g.position.x;
    a.c.h.y += a.g.position.y;
    a.c.ra.l(a.c.h);
    a.c.kb = a.c.k = b;
    d = a.Ha.za.Rc;
    for(b = a.bc;b;b = b.r) {
      Qd(b, d, a.g, a.g)
    }
    Md(a.Ha.za)
  }
}
x = Rd.prototype;
x.ub = t("g");
x.Pb = function() {
  return this.c.k
};
function fc(a, d, b) {
  a.I == 2 && (a.pb == !1 && Y(a, !0), a.q.x += a.w * d.x, a.q.y += a.w * d.y, a.F += a.M * ((b.x - a.c.h.x) * d.y - (b.y - a.c.h.y) * d.x))
}
x.hg = function(a) {
  a.xc = this.m;
  a.Od = this.Zb;
  a.Kc.l(this.c.u)
};
function Vd(a, d) {
  var b = a.g.d, b = new D(b.a.x * d.x + b.b.x * d.y, b.a.y * d.x + b.b.y * d.y);
  b.x += a.g.position.x;
  b.y += a.g.position.y;
  return b
}
x.L = t("I");
function Y(a, d) {
  a.pb = d;
  a.He = 0;
  if(!d) {
    a.q.ca(), a.F = 0, a.de.ca(), a.Jf = 0
  }
}
x.Qb = function() {
  return(this.Hb & Td) == Td
};
x.Fc = t("wd");
function Wd(a) {
  Xd.d.i(a.c.kb);
  var d = Xd.d, b = a.c.u;
  Xd.position.x = a.c.ra.x - (d.a.x * b.x + d.b.x * b.y);
  Xd.position.y = a.c.ra.y - (d.a.y * b.x + d.b.y * b.y);
  b = a.Ha.za.Rc;
  for(d = a.bc;d;d = d.r) {
    Qd(d, b, Xd, a.g)
  }
}
function U(a) {
  a.g.d.i(a.c.k);
  var d = a.g.d, b = a.c.u;
  a.g.position.x = a.c.h.x - (d.a.x * b.x + d.b.x * b.y);
  a.g.position.y = a.c.h.y - (d.a.y * b.x + d.b.y * b.y)
}
x.Cb = function(a) {
  if(this.I != 2 && a.I != 2) {
    return!1
  }
  for(var d = this.$;d;d = d.next) {
    if(d.T == a && d.Eb.Ig == !1) {
      return!1
    }
  }
  return!0
};
x.jc = function(a) {
  a === i && (a = 0);
  this.c.jc(a);
  this.c.h.l(this.c.ra);
  this.c.k = this.c.kb;
  U(this)
};
var Xd = new Ca, md = 8, Sd = 16, Td = 32;
function Yd() {
  this.Qf = [];
  this.start = this.size = 0
}
function Zd(a, d) {
  a.Qf[a.start + a.size] = d;
  a.size++
}
;function $d() {
  this.Ra = [];
  this.rc = [];
  this.yb = []
}
$d.prototype.wa = function(a, d, b, c, e) {
  this.Ga = this.Xa = this.ya = 0;
  this.Pg = c;
  this.Sc = e;
  this.Ra = [];
  this.rc = [];
  this.yb = []
};
$d.prototype.Ud = function(a, d, b) {
  for(var c = 0, e = 0, f, c = 0;c < this.ya;++c) {
    e = this.Ra[c], e.L() == 2 && (e.q.x += a.Z * (d.x + e.w * e.de.x), e.q.y += a.Z * (d.y + e.w * e.de.y), e.F += a.Z * e.M * e.Jf, e.q.kg(H(1 - a.Z * e.Oi, 0, 1)), e.F *= H(1 - a.Z * e.Fi, 0, 1))
  }
  this.Sc.wa(a, this.rc, this.Xa);
  d = this.Sc;
  d.ed(a);
  for(c = 0;c < this.Ga;++c) {
    f = this.yb[c], f.ed(a)
  }
  for(c = 0;c < a.Fd;++c) {
    for(e = 0;e < this.Ga;++e) {
      f = this.yb[e], f.Jc(a)
    }
    d.Jc()
  }
  for(c = 0;c < this.Ga;++c) {
    f = this.yb[c], f.af()
  }
  d.af();
  for(c = 0;c < this.ya;++c) {
    if(e = this.Ra[c], e.L() != Q) {
      var g = a.Z * e.q.x, h = a.Z * e.q.y;
      g * g + h * h > 4 && (E(e.q), e.q.x *= 2 * a.ob, e.q.y *= 2 * a.ob);
      g = a.Z * e.F;
      if(g * g > ra) {
        e.F = e.F < 0 ? -qa * a.ob : qa * a.ob
      }
      e.c.ra.l(e.c.h);
      e.c.kb = e.c.k;
      e.c.h.x += a.Z * e.q.x;
      e.c.h.y += a.Z * e.q.y;
      e.c.k += a.Z * e.F;
      U(e)
    }
  }
  for(c = 0;c < a.zd;++c) {
    g = d.Ic(0.2);
    h = !0;
    for(e = 0;e < this.Ga;++e) {
      f = this.yb[e], f = f.Ic(0.2), h = h && f
    }
    if(g && h) {
      break
    }
  }
  ae(this, d.Gb);
  if(b) {
    b = Number.MAX_VALUE;
    d = sa * sa;
    for(c = 0;c < this.ya;++c) {
      if(e = this.Ra[c], e.L() != Q) {
        !e.Bf || e.F * e.F > d || ia(e.q, e.q) > 1.0E-4 ? b = e.He = 0 : (e.He += a.Z, b = Math.min(b, e.He))
      }
    }
    if(b >= 0.5) {
      for(c = 0;c < this.ya;++c) {
        e = this.Ra[c], Y(e, !1)
      }
    }
  }
};
$d.prototype.hf = function(a) {
  var d = 0, b = 0;
  this.Sc.wa(a, this.rc, this.Xa);
  for(var c = this.Sc, d = 0;d < this.Ga;++d) {
    this.yb[d].ed(a)
  }
  for(d = 0;d < a.Fd;++d) {
    c.Jc();
    for(b = 0;b < this.Ga;++b) {
      this.yb[b].Jc(a)
    }
  }
  for(d = 0;d < this.ya;++d) {
    if(b = this.Ra[d], b.L() != Q) {
      var e = a.Z * b.q.x, f = a.Z * b.q.y;
      e * e + f * f > 4 && (E(b.q), b.q.x *= 2 * a.ob, b.q.y *= 2 * a.ob);
      e = a.Z * b.F;
      if(e * e > ra) {
        b.F = b.F < 0 ? -qa * a.ob : qa * a.ob
      }
      b.c.ra.l(b.c.h);
      b.c.kb = b.c.k;
      b.c.h.x += a.Z * b.q.x;
      b.c.h.y += a.Z * b.q.y;
      b.c.k += a.Z * b.F;
      U(b)
    }
  }
  for(d = 0;d < a.zd;++d) {
    e = c.Ic(0.75);
    f = !0;
    for(b = 0;b < this.Ga;++b) {
      var g = this.yb[b].Ic(0.2), f = f && g
    }
    if(e && f) {
      break
    }
  }
  ae(this, c.Gb)
};
function ae(a, d) {
  if(a.Pg != p) {
    for(var b = 0;b < a.Xa;++b) {
      for(var c = a.rc[b], e = d[b], f = 0;f < e.eb;++f) {
        be.ej[f] = e.Ia[f].pa, be.mj[f] = e.Ia[f].ic
      }
      a.Pg.Sd(c, be)
    }
  }
}
var be = new function() {
  this.ej = [];
  this.mj = []
};
function ce(a, d) {
  this.za = new Ld;
  this.Sc = new Rc;
  this.S = new $d;
  this.Hf = this.Tc = !1;
  this.Ae = this.$ = this.P = this.Wa = this.Aa = this.Ce = p;
  this.Hi = this.Ga = this.Xa = this.ya = 0;
  ce.Ui = !0;
  ce.Gi = !0;
  this.Bf = d;
  this.Ii = a;
  this.Og = 0;
  this.za.Ha = this;
  this.Ng = this.cg(new ld)
}
(function(a) {
  a.zh = 1 - 100 * Number.MIN_VALUE;
  a.prototype.Ch = function(a) {
    this.za.Cf = a
  };
  a.prototype.Dh = function(a) {
    this.za.td = a
  };
  a.prototype.Eh = function(a) {
    this.Aa = a
  };
  a.prototype.cg = function(a) {
    if(this.Tc) {
      return p
    }
    a = new Rd(a, this);
    a.oa = p;
    if(a.r = this.Wa) {
      this.Wa.oa = a
    }
    this.Wa = a;
    this.ya++;
    return a
  };
  a.prototype.mh = function(a) {
    if(!this.Tc) {
      for(var b = a.$;b;) {
        var c = b, b = b.next;
        this.Ce && this.Ce.Bj(c.Eb);
        this.nh(c.Eb)
      }
      for(b = a.Ae;b;) {
        c = b, b = b.Tj, c.Dj.zj(a)
      }
      for(b = a.P;b;) {
        c = b, b = b.next, this.za.kc(c.ka)
      }
      a.P = p;
      for(b = a.bc;b;) {
        c = b, b = b.r, this.Ce && this.Ce.Aj(c), c.Ld(this.za.Rc), c.kc()
      }
      a.bc = p;
      a.Mg = 0;
      if(a.oa) {
        a.oa.r = a.r
      }
      if(a.r) {
        a.r.oa = a.oa
      }
      if(a == this.Wa) {
        this.Wa = a.r
      }
      this.ya--
    }
  };
  a.prototype.Ze = function(a) {
    var b = a.Cc();
    b.oa = p;
    if(b.r = this.$) {
      this.$.oa = b
    }
    this.$ = b;
    this.Ga++;
    b.Ma.Eb = b;
    b.Ma.T = b.Fa;
    b.Ma.Y = p;
    if(b.Ma.next = b.Ea.$) {
      b.Ea.$.Y = b.Ma
    }
    b.Ea.$ = b.Ma;
    b.Na.Eb = b;
    b.Na.T = b.Ea;
    b.Na.Y = p;
    if(b.Na.next = b.Fa.$) {
      b.Fa.$.Y = b.Na
    }
    b.Fa.$ = b.Na;
    var b = a.da, c = a.ea;
    if(!a.xg) {
      for(a = c.P;a;) {
        if(a.T == b) {
          a.ka.ve = !0
        }
        a = a.next
      }
    }
  };
  a.prototype.nh = function(a) {
    var b = a.Ig;
    if(a.oa) {
      a.oa.r = a.r
    }
    if(a.r) {
      a.r.oa = a.oa
    }
    if(a == this.$) {
      this.$ = a.r
    }
    var c = a.Ea, e = a.Fa;
    Y(c, !0);
    Y(e, !0);
    if(a.Ma.Y) {
      a.Ma.Y.next = a.Ma.next
    }
    if(a.Ma.next) {
      a.Ma.next.Y = a.Ma.Y
    }
    if(a.Ma == c.$) {
      c.$ = a.Ma.next
    }
    a.Ma.Y = p;
    a.Ma.next = p;
    if(a.Na.Y) {
      a.Na.Y.next = a.Na.next
    }
    if(a.Na.next) {
      a.Na.next.Y = a.Na.Y
    }
    if(a.Na == e.$) {
      e.$ = a.Na.next
    }
    a.Na.Y = p;
    a.Na.next = p;
    this.Ga--;
    if(!b) {
      for(a = e.P;a;) {
        if(a.T == c) {
          a.ka.ve = !0
        }
        a = a.next
      }
    }
  };
  a.prototype.ng = function(d, b, c) {
    d === i && (d = 0);
    b === i && (b = 0);
    c === i && (c = 0);
    if(this.Hf) {
      Md(this.za), this.Hf = !1
    }
    this.Tc = !0;
    var e = new Nc;
    e.Z = d;
    e.Fd = b;
    e.zd = c;
    e.ob = d > 0 ? 1 / d : 0;
    e.Wb = this.Og * d;
    e.Gd = a.Ui;
    d = this.za;
    for(b = d.Ha.P;b;) {
      var c = b.C, f = b.G, g = c.p, h = f.p;
      if(g.pb == !1 && h.pb == !1) {
        b = b.r
      }else {
        if(b.ve) {
          if(h.Cb(g) == !1) {
            c = b;
            b = c.r;
            d.kc(c);
            continue
          }
          if(d.Cf.Cb(c, f) == !1) {
            c = b;
            b = c.r;
            d.kc(c);
            continue
          }
          b.ve = !1
        }
        d.Rc.Sb(c.uc, f.uc) == !1 ? (c = b, b = c.r, d.kc(c)) : (nd(b, d.td), b = b.r)
      }
    }
    if(e.Z > 0) {
      this.Ud(e), a.Gi && e.Z > 0 && this.hf(e), this.Og = e.ob
    }
    this.Tc = !1
  };
  a.prototype.ih = function() {
    for(var a = this.Wa;a;a = a.r) {
      a.de.ca(), a.Jf = 0
    }
  };
  a.prototype.oh = function() {
    if(this.Aa !== p) {
      this.Aa.Si.ri.clear();
      var d = this.Aa.Kg;
      if(d & S.Cg) {
        for(var b = new Z(0.5, 0.5, 0.3), c = new Z(0.5, 0.9, 0.5), e = new Z(0.5, 0.5, 0.9), f = new Z(0.6, 0.6, 0.6), g = new Z(0.9, 0.7, 0.7), h = this.Wa;h;h = h.r) {
          for(var k = h.bc;k;k = k.r) {
            var j = k.ia;
            h.Qb() ? h.L() == Q ? this.Md(j, h.g, c) : h.L() == 1 ? this.Md(j, h.g, e) : h.pb ? this.Md(j, h.g, g) : this.Md(j, h.g, f) : this.Md(j, h.g, b)
          }
        }
      }
      if(d & S.di) {
        for(h = this.$;h;h = h.r) {
          this.ph(h)
        }
      }
      if(d & S.ci) {
        for(h = this.Ae;h;h = h.r) {
          h.tj(this.Aa)
        }
      }
      if(d & S.ei) {
        h = new Z(0.3, 0.9, 0.9);
        for(k = this.za.P;k;k = k.r) {
          this.Aa.Ob(rc(k.C.$b), rc(k.G.$b), h)
        }
      }
      if(d & S.Bg) {
        b = new Z(0, 0, 0.8);
        for(h = this.Wa;h;h = h.r) {
          if(h.Qb()) {
            for(k = h.bc;k;k = k.r) {
              c = this.za.Rc.dd(k.uc), this.Aa.qh([new D(c.lowerBound.x, c.lowerBound.y), new D(c.upperBound.x, c.lowerBound.y), new D(c.upperBound.x, c.upperBound.y), new D(c.lowerBound.x, c.upperBound.y)], b)
            }
          }
        }
      }
      if(d & S.bi) {
        for(h = this.Wa;h;h = h.r) {
          a.Yf.d = h.g.d, a.Yf.position = h.c.h, this.Aa.th(a.Yf)
        }
      }
    }
  };
  a.prototype.Ud = function(a) {
    for(var b = this.Ae;b;b = b.r) {
      b.ng(a)
    }
    this.S.wa(this.ya, this.Xa, this.Ga, this.za.td, this.Sc);
    for(var c = this.Wa;c;c = c.r) {
      c.U = !1
    }
    for(b = this.P;b;b = b.r) {
      b.U = !1
    }
    for(b = this.$;b;b = b.r) {
      b.U = !1
    }
    for(b = this.Wa;b;b = b.r) {
      if(!b.U && b.pb && b.Qb() && b.L() != Q) {
        var e = this.S;
        e.ya = 0;
        e.Xa = 0;
        e.Ga = 0;
        e = [];
        e.push(b);
        for(b.U = !0;e.length > 0;) {
          var c = e.pop(), f = this.S, g = c;
          g.Mi = f.ya;
          f.Ra[f.ya++] = g;
          c.pb || Y(c, !0);
          if(c.L() != Q) {
            for(f = c.P;f;f = f.next) {
              if(!f.ka.U && !f.ka.Rb() && f.ka.enabled != !1 && f.ka.$c) {
                var g = this.S, h = f.ka;
                g.rc[g.Xa++] = h;
                f.ka.U = !0;
                if(!f.T.U) {
                  e.push(f.T), f.T.U = !0
                }
              }
            }
            for(c = c.$;c;c = c.next) {
              if(!c.Eb.U && c.T.Qb() && (f = this.S, g = c.Eb, f.yb[f.Ga++] = g, c.Eb.U = !0, !c.T.U)) {
                e.push(c.T), c.T.U = !0
              }
            }
          }
        }
        this.S.Ud(a, this.Ii, this.Bf);
        for(e = 0;e < this.S.ya;++e) {
          if(this.S.Ra[e].L() == Q) {
            this.S.Ra[e].U = !1
          }
        }
      }
    }
    for(c = this.Wa;c;c = c.r) {
      c.pb && c.Qb() && c.L() != Q && Wd(c)
    }
    Md(this.za)
  };
  a.prototype.hf = function(d) {
    this.S.wa(this.ya, 32, 32, this.za.td, this.Sc);
    for(var b = this.Wa;b;b = b.r) {
      b.U = !1, b.c.qa = 0
    }
    for(var c = this.P;c;c = c.r) {
      c.U = !1, c.vd = p
    }
    for(c = this.$;c;c = c.r) {
      c.U = !1
    }
    for(;;) {
      var c = this.Kh(), e = c.Yi, c = c.Zi;
      if(e === p || a.zh < c) {
        break
      }
      a.Wg.i(e.C.p.c);
      a.Xg.i(e.G.p.c);
      e.C.p.jc(c);
      e.G.p.jc(c);
      nd(e, this.za.td);
      e.vd = p;
      if(e.Rb() || e.enabled == !1) {
        e.C.p.c.i(a.Wg), e.G.p.c.i(a.Xg), U(e.C.p), U(e.G.p)
      }else {
        if(e.$c) {
          b = e.C.p;
          if(b.L() != 2) {
            b = e.G.p
          }
          e = this.S;
          e.ya = 0;
          e.Xa = 0;
          e.Ga = 0;
          e = new Yd;
          Zd(e, b);
          for(b.U = !0;e.size > 0;) {
            var b = e, f = b.Qf[b.start];
            b.Qf[b.start] = p;
            b.size--;
            b.start++;
            var b = f, f = this.S, g = b;
            g.Mi = f.ya;
            f.Ra[f.ya++] = g;
            b.pb || Y(b, !0);
            if(b.L() == 2) {
              for(f = b.P;f;f = f.next) {
                if(this.S.Xa == this.S.Mj) {
                  break
                }
                if(!f.ka.U && !f.ka.Rb() && f.ka.enabled != !1 && f.ka.$c) {
                  var g = this.S, h = f.ka;
                  g.rc[g.Xa++] = h;
                  f.ka.U = !0;
                  if(!f.T.U) {
                    f.T.L() != Q && (f.T.jc(c), Y(f.T, !0)), Zd(e, f.T), f.T.U = !0
                  }
                }
              }
              for(b = b.$;b;b = b.next) {
                if(this.S.Ga != this.S.Nj && !b.Eb.U && b.T.Qb() && (f = this.S, g = b.Eb, f.yb[f.Ga++] = g, b.Eb.U = !0, !b.T.U)) {
                  b.T.L() != Q && (b.T.jc(c), Y(b.T, !0)), Zd(e, b.T), b.T.U = !0
                }
              }
            }
          }
          e = new Nc;
          e.Gd = !1;
          e.Z = (1 - c) * d.Z;
          e.ob = 1 / e.Z;
          e.Wb = 0;
          e.Fd = d.Fd;
          e.zd = d.zd;
          this.S.hf(e);
          for(c = 0;c < this.S.ya;c++) {
            if(this.S.Ra[c].U = !1, this.S.Ra[c].pb && this.S.Ra[c].L() == 2) {
              Wd(this.S.Ra[c]);
              for(f = this.S.Ra[c].P;f;f = f.next) {
                f.ka.vd = p
              }
            }
          }
          for(c = 0;c < this.S.Xa;c++) {
            this.S.rc[c].U = !1, this.S.rc[c].vd = p
          }
          for(c = 0;c < this.S.Ga;c++) {
            this.S.yb[c].U = !1
          }
          Md(this.za)
        }
      }
    }
  };
  a.prototype.Kh = function() {
    for(var a = p, b = 1, c = this.P;c;c = c.r) {
      if(!this.Lh(c)) {
        var e = 1;
        if(c.vd != p) {
          e = c.vd
        }else {
          if(c.$c) {
            e = 1
          }else {
            var f = c.C.p.c.qa;
            if(c.C.p.c.qa < c.G.p.c.qa) {
              f = c.G.p.c.qa, c.C.p.c.jc(f)
            }else {
              if(c.G.p.c.qa < c.C.p.c.qa) {
                f = c.C.p.c.qa, c.G.p.c.jc(f)
              }
            }
            var e = c, g = c.C.p.c, h = c.G.p.c;
            od.fb.i(e.C.ia);
            od.gb.i(e.G.ia);
            od.ah = g;
            od.bh = h;
            od.oj = 0.005;
            var k = od;
            Zc++;
            var e = k.fb, g = k.gb, h = k.ah, j = k.bh;
            I(h.qa == j.qa);
            I(1 - h.qa > Number.MIN_VALUE);
            var o = e.N + g.N, k = k.oj, n = 0, s = 0, q = 0;
            dd.count = 0;
            for(ed.eh = !1;;) {
              h.ub(fd, n);
              j.ub(gd, n);
              ed.fb = e;
              ed.gb = g;
              ed.Te = fd;
              ed.Ue = gd;
              va.fg(id, dd, ed);
              if(id.nd <= 0) {
                n = 1;
                break
              }
              hd.wa(dd, e, fd, g, gd);
              var v = hd.Bb(fd, gd);
              if(v <= 0) {
                n = 1;
                break
              }
              s == 0 && (q = v > o ? Math.max(o - k, 0.75 * o) : Math.max(v - k, 0.02 * o));
              if(v - q < 0.5 * k) {
                if(s == 0) {
                  n = 1;
                  break
                }
                break
              }
              var u = n, w = n, y = 1;
              h.ub(fd, y);
              j.ub(gd, y);
              var N = hd.Bb(fd, gd);
              if(N >= q) {
                n = 1;
                break
              }
              for(var C = 0;;) {
                var l = 0, l = C & 1 ? w + (q - v) * (y - w) / (N - v) : 0.5 * (w + y);
                h.ub(fd, l);
                j.ub(gd, l);
                var m = hd.Bb(fd, gd);
                if(Math.abs(m - q) < 0.025 * k) {
                  u = l;
                  break
                }
                m > q ? (w = l, v = m) : (y = l, N = m);
                C++;
                bd++;
                if(C == 50) {
                  break
                }
              }
              cd = Math.max(cd, C);
              if(u < (1 + 100 * Number.MIN_VALUE) * n) {
                break
              }
              n = u;
              s++;
              $c++;
              if(s == 1E3) {
                break
              }
            }
            ad = Math.max(ad, s);
            e = n;
            I(0 <= e && e <= 1);
            e > 0 && e < 1 && (e = (1 - e) * f + e)
          }
          c.vd = e
        }
        Number.MIN_VALUE < e && e < b && (a = c, b = e)
      }
    }
    return{Yi:a, Zi:b}
  };
  a.prototype.Lh = function(a) {
    return a.Rb() || a.enabled == !1 || !a.rf ? !0 : (a.C.p.L() != 2 || !a.C.p.pb) && (a.G.p.L() != 2 || !a.G.p.pb) ? !0 : !1
  };
  a.prototype.ph = function(d) {
    d.I == 3 || d.I == 5 ? this.Aa.Ob(d.bd(), d.cd(), a.Zc) : d.I == 4 ? (this.Aa.Ob(d.vh(), d.bd(), a.Zc), this.Aa.Ob(d.wh(), d.cd(), a.Zc), this.Aa.Ob(d.vh(), d.wh(), a.Zc)) : (d.Ea != this.Ng && this.Aa.Ob(d.Ea.g.position, d.bd(), a.Zc), this.Aa.Ob(d.bd(), d.cd(), a.Zc), d.Fa != this.Ng && this.Aa.Ob(d.Fa.g.position, d.cd(), a.Zc))
  };
  a.prototype.Md = function(a, b, c) {
    switch(a.I) {
      case J.Nc:
        this.Aa.rh(F(b, a.V), a.N, b.d.a, c);
        break;
      case J.pc:
        for(var e = 0, f = parseInt(a.ig()), a = a.j, g = Array(f), e = 0;e < f;++e) {
          g[e] = F(b, a[e])
        }
        this.Aa.sh(g, f, c);
        break;
      case J.ue:
        this.Aa.Ob(F(b, a.vj()), F(b, a.wj()), c)
    }
  };
  ce.Yf = new Ca;
  ce.Wg = new jd;
  ce.Xg = new jd;
  ce.Zc = new Z(0.5, 0.8, 0.8)
})(ce);
function de(a) {
  this.og = ee++;
  this.position = a.la();
  this.Ta = 0
}
var ee = 0;
function fe(a, d, b) {
  this.Rf = [];
  this.xa = [];
  this.Uj = 0;
  this.Nf = {};
  this.fa = a;
  this.Qa = new D(d.x, d.y);
  this.lb = new ce(b, !0);
  this.lb.Ch(this);
  this.lb.Dh(this);
  this.top = R(this, new D(this.Qa.x + 2, 2), new D(this.Qa.x / 2, -1), !1, p, {bb:0});
  this.bottom = R(this, new D(this.Qa.x + 2, 2), new D(this.Qa.x / 2, this.Qa.y + 1), !1, p, {bb:0});
  this.left = R(this, new D(2, this.Qa.y + 2), new D(-1, this.Qa.y / 2), !1, p, {bb:0});
  this.right = R(this, new D(2, this.Qa.y + 2), new D(this.Qa.x + 1, this.Qa.y / 2), !1, p, {bb:0})
}
x = fe.prototype;
x.update = function(a, d) {
  this.lb.ng(d, ge, ge);
  this.lb.ih();
  var b = this.Rf;
  this.Rf = [];
  if(b.length > 0) {
    for(var c = 0;c < b.length;c++) {
      b[c].call(this)
    }
  }
};
x.Cb = function(a, d) {
  if(!a.Rb() && !d.Rb()) {
    for(var b = 0;b < this.xa.length;b++) {
      if(this.xa[b].Cb && !this.xa[b].Cb(a, d)) {
        return!1
      }
    }
  }
  return Lc.prototype.Cb(a, d)
};
x.Id = function(a) {
  for(var d = 0;d < this.xa.length;d++) {
    this.xa[d].pg && this.xa[d].pg(a);
    if(a.disabled) {
      a.enabled = !1
    }
    this.xa[d].Id && this.xa[d].Id(a)
  }
};
x.ad = function(a) {
  for(var d = 0;d < this.xa.length;d++) {
    this.xa[d].ad && this.xa[d].ad(a)
  }
  a.disabled = !1;
  a.enabled = !0
};
x.Td = function(a, d) {
  if(a.disabled) {
    a.enabled = !1
  }
  for(var b = 0;b < this.xa.length;b++) {
    this.xa[b].Td && this.xa[b].Td(a, d)
  }
};
x.Sd = function(a, d) {
  for(var b = 0;b < this.xa.length;b++) {
    this.xa[b].Sd && this.xa[b].Sd(a, d)
  }
};
function $(a, d, b, c) {
  c = c || 0;
  a = he(a, d, b, !0);
  a.display.ag = -10 + c;
  return a
}
function R(a, d, b, c, e, f) {
  e = e || {};
  e.type = Q;
  return ie(a, d, b, c, e, f)
}
function ie(a, d, b, c, e, f) {
  var g = new Da;
  Ga(g, d.x / 2, d.y / 2);
  return a.wb(d, b, c, g, {hd:e, Xb:f})
}
function dc(a, d, b) {
  var c = new Da, e = new D(d.x / 2, d.y / 2);
  Fa(c, [new D(0, e.y), new D(-e.x + 0.01, e.y - 0.01), new D(-e.x, 0), new D(-e.x + 0.01, -e.y + 0.01), new D(0, -e.y), new D(e.x - 0.01, -e.y + 0.01), new D(e.x, 0), new D(e.x - 0.01, e.y - 0.01)]);
  return a.wb(d, b, !0, c, {hd:{od:!0}, Xb:{Mb:0}})
}
function je(a, d) {
  a.lb.Tc ? a.Rf.push(d) : d.apply(a)
}
x.wb = function(a, d, b, c, e) {
  var f = he(this, a, d, b);
  e.Yj || je(this, function() {
    var a = e, a = a || {}, b = ke(a.hd, le);
    me.type = b.type;
    me.Ta = b.Ta;
    me.od = b.od;
    me.position = d;
    b = this.lb.cg(me);
    fixture = ec(b, c, a);
    f.body = b;
    f.ki = fixture;
    b.object = f
  });
  return f
};
function he(a, d, b, c) {
  b = new de(b);
  a.Nf[b.og] = b;
  c !== !1 && Dc(b, d);
  return b
}
function ec(a, d, b) {
  b = b || {};
  b = ke(b.Xb, ne);
  oe.kd = b.kd;
  oe.bb = b.bb;
  oe.Mb = b.Mb;
  oe.Zd = b.Zd;
  oe.shape = d;
  if(a.Ha.Tc == !0) {
    a = p
  }else {
    d = new Pd;
    d.Cc(a, a.g, oe);
    a.Hb & Td && d.Kd(a.Ha.za.Rc, a.g);
    d.r = a.bc;
    a.bc = d;
    a.Mg++;
    d.p = a;
    if(d.Be > 0 && (a.m = 0, a.w = 0, a.Zb = 0, a.M = 0, a.c.u.ca(), !(a.I == Q || a.I == 1))) {
      for(var b = new D(0, 0), c = a.bc;c;c = c.r) {
        if(c.Be != 0) {
          var e = c.hg();
          a.m += e.xc;
          b.x += e.Kc.x * e.xc;
          b.y += e.Kc.y * e.xc;
          a.Zb += e.Od
        }
      }
      a.m > 0 ? (a.w = 1 / a.m, b.x *= a.w, b.y *= a.w) : (a.m = 1, a.w = 1);
      a.Zb > 0 && (a.Hb & Sd) == 0 ? (a.Zb -= a.m * (b.x * b.x + b.y * b.y), a.Zb *= a.Ji, I(a.Zb > 0), a.M = 1 / a.Zb) : (a.Zb = 0, a.M = 0);
      c = a.c.h.la();
      a.c.u.l(b);
      a.c.ra.l(F(a.g, a.c.u));
      a.c.h.l(a.c.ra);
      a.q.x += a.F * -(a.c.h.y - c.y);
      a.q.y += a.F * +(a.c.h.x - c.x)
    }
    a.Ha.Hf = !0;
    a = d
  }
  return a
}
function ic(a, d) {
  je(a, function() {
    d.body && this.lb.mh(d.body);
    delete this.Nf[d.og]
  })
}
function hc(a, d, b) {
  je(a, function() {
    if(d.body) {
      var a = d.body;
      Ud(a, b, a.Pb())
    }else {
      d.position = b.la()
    }
  })
}
var oe = new function() {
  this.filter = new Kc;
  this.Ac = this.shape = p;
  this.bb = 0.2;
  this.kd = this.Mb = 0;
  this.filter.Xd = 1;
  this.filter.ge = 65535;
  this.filter.Qc = 0;
  this.Zd = !1
}, me = new ld, ge = 10, ne = {kd:0.1, bb:0.6, Mb:0.01, Zd:!1}, le = {od:!1, Ta:0, type:2};
function ke(a, d) {
  var a = a || {}, b = {}, c;
  for(c in d) {
    b[c] = a[c] === i || a[c] === p ? d[c] : a[c]
  }
  return b
}
;function pe(a, d, b, c, e, f, g) {
  this.zc = a;
  this.paused = !1;
  this.oe = 0;
  this.ug = new jc;
  this.Tb = new Fc(this);
  this.n = new fe(this, b, c);
  this.viewport = new uc(this, d, f, e, g)
}
function qe(a) {
  if(a.Fg === p) {
    a.Fg = new Date
  }
  var d = new Date - a.Fg >= 5E3;
  lc > 0 && !d ? setTimeout(function() {
    qe(a)
  }, 50) : (d && alert("It appears to be taking a long time to load the game's images. You may experience some invisible objects until they finish loading, but the game will now start."), a.start())
}
pe.prototype.update = function(a, d) {
  if(this.paused) {
    this.oe = 0, yc(this.viewport.Tg), this.zc.We && this.zc.We(a, d)
  }else {
    this.zc.Le && this.zc.Le(a, d);
    for(var b = this.ug, c = 0;c < b.$f.length;c++) {
      for(var e = b.$f[c], f = 0;f < e.Se.length;f++) {
        e.Se[f].apply(e, [a, d])
      }
    }
    this.oe += d;
    for(b = a - this.oe;this.oe >= re;) {
      this.oe -= re, b += re, this.zc.hj && this.zc.hj(b, re), this.n.update(b, re)
    }
    this.zc.Ke && this.zc.Ke(a, d);
    Cc(this.viewport.Tg);
    b = this.viewport;
    b.display.style.visibility = "hidden";
    if(b.xe.x != b.ja.x || b.xe.y != b.ja.y) {
      b.xe.x = b.ja.x;
      b.xe.y = b.ja.y;
      if(b.Va !== p) {
        b.Va.style.left = "-" + (b.ja.x * b.scale - b.sb.x / 2) + "px", b.Va.style.top = "-" + (b.ja.y * b.scale - b.sb.y / 2) + "px"
      }
      b.display.style.left = "-" + (b.ja.x * b.scale - b.sb.x / 2) + "px";
      b.display.style.top = "-" + (b.ja.y * b.scale - b.sb.y / 2) + "px";
      c = b.fh.body;
      Ud(c, new D(b.ja.x, b.ja.y), c.Pb())
    }
    var c = [], g;
    for(g in b.Vb) {
      c[g] = b.Vb[g]
    }
    g = b.fh.ki.$b;
    var e = b.fa.n.Nf, h;
    for(h in e) {
      var k = e[h];
      if(k.display) {
        var j = k.display, o = k.qi(b.ja), n = j.size;
        j.B.lowerBound.i(o.x - n.x, o.y - n.y);
        j.B.upperBound.i(o.x + n.x, o.y + n.y);
        if(g.Sb(j.B)) {
          if(j.Bc == p) {
            j.Bc = Ec++
          }
          delete c[j.Bc];
          if(b.Vb[j.Bc] == p) {
            b.Vb[j.Bc] = document.createElement("span"), b.Vb[j.Bc].className = "gameObject", b.Vb[j.Bc].style.zIndex = zc + (j.ag || 0), b.display.appendChild(b.Vb[j.Bc])
          }
          var f = b.Vb[j.Bc], s = nc(f), q = b.scale != s.scale;
          s.scale = b.scale;
          var v = o.x - n.x / 2;
          if(q || s.left != v) {
            s.left = v, f.style.left = v * b.scale + "px"
          }
          o = o.y - n.y / 2;
          if(q || s.top != o) {
            s.top = o, f.style.top = o * b.scale + "px"
          }
          o = n.x;
          if(q || s.width != o) {
            s.width = o, f.style.width = o * b.scale + "px"
          }
          n = n.y;
          if(q || s.height != n) {
            s.height = n, f.style.height = n * b.scale + "px"
          }
          k = k.pi();
          if(s.rotation != k) {
            s.rotation = k, f.style.webkitTransform = "rotate(" + k + "rad)"
          }
          if(j.Re != p) {
            j = j.Re;
            s = !1;
            k = nc(f);
            if(k.Sh != j.url) {
              k.Sh = j.url, f.style.backgroundImage = "url(" + j.url + ")", f.style.backgroundColor = "transparent", s = !0
            }else {
              if(k.Th != j.hb.x || k.Uh != j.hb.y) {
                s = !0
              }
            }
            if(s) {
              k.Th = j.hb.x, k.Uh = j.hb.y, f.style.backgroundPosition = (j.Sg.x + (j.hb.x - 1) * j.dh.x) * -1 + "px " + (j.Sg.y + (j.hb.y - 1) * j.dh.y) * -1 + "px"
            }
          }
        }
      }
    }
    for(var u in c) {
      b.display.removeChild(c[u]), delete b.Vb[u]
    }
    if(b.Va !== p) {
      b.Va.style.visibility = "hidden", b.fa.n.lb.oh(), b.Va.style.visibility = ""
    }
    b.display.style.visibility = ""
  }
};
pe.prototype.start = function() {
  Cc(this.viewport.Af);
  var a = se;
  gb(a, this) >= 0 || a.push(this);
  te = document.getElementById("fps");
  ue || (ue = !0, ve())
};
var re = 0.015, ue = !1, se = [], we = 60, xe = p, te = p;
function ve(a) {
  a == p && (a = (new Date).getTime());
  var d = 0;
  xe !== p ? d = (a - xe) / 1E3 : xe = a;
  if(d > 0) {
    d > 0.2 && (d = 0.2);
    if(te) {
      var b = 1 / d;
      we = we * 0.99 + b * 0.01;
      te.innerHTML = Math.round(b) + " - " + Math.round(we)
    }
    xe = a;
    for(b = 0;b < se.length;b++) {
      se[b].update(a, d)
    }
    for(var c in Ob) {
      Ob[c].gh = !0
    }
    Qb = Pb;
    Sb = Rb;
    Ub = Tb
  }
  Jc(ve, document.body)
}
;function ye(a, d, b) {
  this.x = a;
  this.y = d;
  this.s = b
}
x = ye.prototype;
x.ca = function() {
  this.s = this.y = this.x = 0
};
x.i = function(a, d, b) {
  this.x = a;
  this.y = d;
  this.s = b
};
x.l = function(a) {
  this.x = a.x;
  this.y = a.y;
  this.s = a.s
};
x.Ec = function() {
  return new ye(-this.x, -this.y, -this.s)
};
x.lg = function() {
  this.x = -this.x;
  this.y = -this.y;
  this.s = -this.s
};
x.la = function() {
  return new ye(this.x, this.y, this.s)
};
x.Hd = function(a) {
  this.x += a.x;
  this.y += a.y;
  this.s += a.s
};
x.kg = function(a) {
  this.x *= a;
  this.y *= a;
  this.s *= a
};
function ze(a, d, b) {
  this.a = new ye(0, 0, 0);
  this.b = new ye(0, 0, 0);
  this.R = new ye(0, 0, 0);
  a && this.a.l(a);
  d && this.b.l(d);
  b && this.R.l(b)
}
x = ze.prototype;
x.la = function() {
  return new ze(this.a, this.b, this.R)
};
x.fd = function(a) {
  this.a.l(a.a);
  this.b.l(a.b);
  this.R.l(a.R)
};
x.Xe = function(a) {
  this.a.x += a.a.x;
  this.a.y += a.a.y;
  this.a.s += a.a.s;
  this.b.x += a.b.x;
  this.b.y += a.b.y;
  this.b.s += a.b.s;
  this.R.x += a.R.x;
  this.R.y += a.R.y;
  this.R.s += a.R.s
};
x.re = function() {
  this.a.i(1, 0, 0);
  this.b.i(0, 1, 0);
  this.R.i(0, 0, 1)
};
x.ca = function() {
  this.a.i(0, 0, 0);
  this.b.i(0, 0, 0);
  this.R.i(0, 0, 0)
};
function Ae(a, d, b, c) {
  var e = a.a.x, f = a.b.x, g = a.a.y, a = a.b.y, h = e * a - f * g;
  h != 0 && (h = 1 / h);
  d.x = h * (a * b - f * c);
  d.y = h * (e * c - g * b)
}
function Be(a, d, b, c, e) {
  var f = a.a.x, g = a.a.y, h = a.a.s, k = a.b.x, j = a.b.y, o = a.b.s, n = a.R.x, s = a.R.y, a = a.R.s, q = f * (j * a - o * s) + g * (o * n - k * a) + h * (k * s - j * n);
  q != 0 && (q = 1 / q);
  d.x = q * (b * (j * a - o * s) + c * (o * n - k * a) + e * (k * s - j * n));
  d.y = q * (f * (c * a - e * s) + g * (e * n - b * a) + h * (b * s - c * n));
  d.s = q * (f * (j * e - o * c) + g * (o * b - k * e) + h * (k * c - j * b))
}
;function Ce(a) {
  Od.call(this, a);
  this.sc = new D(0, 0);
  this.tc = new D(0, 0);
  this.v = new ye;
  this.m = new ze;
  this.sc.l(a.qd);
  this.tc.l(a.rd);
  this.Fe = a.je;
  this.v.ca()
}
A(Ce, Od);
x = Ce.prototype;
x.bd = function() {
  return Vd(this.Ea, this.sc)
};
x.cd = function() {
  return Vd(this.Fa, this.tc)
};
x.ed = function(a) {
  var d, b = 0, c = this.Ea, e = this.Fa;
  d = c.g.d;
  var f = this.sc.x - c.c.u.x, g = this.sc.y - c.c.u.y, b = d.a.x * f + d.b.x * g, g = d.a.y * f + d.b.y * g, f = b;
  d = e.g.d;
  var h = this.tc.x - e.c.u.x, k = this.tc.y - e.c.u.y, b = d.a.x * h + d.b.x * k, k = d.a.y * h + d.b.y * k, h = b;
  d = c.w;
  var b = e.w, j = c.M, o = e.M;
  this.m.a.x = d + b + g * g * j + k * k * o;
  this.m.b.x = -g * f * j - k * h * o;
  this.m.R.x = -g * j - k * o;
  this.m.a.y = this.m.b.x;
  this.m.b.y = d + b + f * f * j + h * h * o;
  this.m.R.y = f * j + h * o;
  this.m.a.s = this.m.R.x;
  this.m.b.s = this.m.R.y;
  this.m.R.s = j + o;
  a.Gd ? (this.v.x *= a.Wb, this.v.y *= a.Wb, this.v.s *= a.Wb, c.q.x -= d * this.v.x, c.q.y -= d * this.v.y, c.F -= j * (f * this.v.y - g * this.v.x + this.v.s), e.q.x += b * this.v.x, e.q.y += b * this.v.y, e.F += o * (h * this.v.y - k * this.v.x + this.v.s)) : this.v.ca()
};
x.Jc = function() {
  var a, d = 0, b = this.Ea, c = this.Fa, e = b.q, f = b.F, g = c.q, h = c.F, k = b.w, j = c.w, o = b.M, n = c.M;
  a = b.g.d;
  var s = this.sc.x - b.c.u.x, q = this.sc.y - b.c.u.y, d = a.a.x * s + a.b.x * q, q = a.a.y * s + a.b.y * q, s = d;
  a = c.g.d;
  var v = this.tc.x - c.c.u.x, u = this.tc.y - c.c.u.y, d = a.a.x * v + a.b.x * u, u = a.a.y * v + a.b.y * u, v = d;
  a = new ye(0, 0, 0);
  Be(this.m, a, -(g.x - h * u - e.x + f * q), -(g.y + h * v - e.y - f * s), -(h - f));
  this.v.Hd(a);
  e.x -= k * a.x;
  e.y -= k * a.y;
  f -= o * (s * a.y - q * a.x + a.s);
  g.x += j * a.x;
  g.y += j * a.y;
  h += n * (v * a.y - u * a.x + a.s);
  b.F = f;
  c.F = h
};
x.Ic = function() {
  var a, d = 0, b = this.Ea, c = this.Fa;
  a = b.g.d;
  var e = this.sc.x - b.c.u.x, f = this.sc.y - b.c.u.y, d = a.a.x * e + a.b.x * f, f = a.a.y * e + a.b.y * f, e = d;
  a = c.g.d;
  var g = this.tc.x - c.c.u.x, h = this.tc.y - c.c.u.y, d = a.a.x * g + a.b.x * h, h = a.a.y * g + a.b.y * h, g = d;
  a = b.w;
  var d = c.w, k = b.M, j = c.M, o = c.c.h.x + g - b.c.h.x - e, n = c.c.h.y + h - b.c.h.y - f, s = c.c.k - b.c.k - this.Fe, q = Math.sqrt(o * o + n * n), v = Math.abs(s);
  q > 0.05 && (k *= 1, j *= 1);
  this.m.a.x = a + d + f * f * k + h * h * j;
  this.m.b.x = -f * e * k - h * g * j;
  this.m.R.x = -f * k - h * j;
  this.m.a.y = this.m.b.x;
  this.m.b.y = a + d + e * e * k + g * g * j;
  this.m.R.y = e * k + g * j;
  this.m.a.s = this.m.R.x;
  this.m.b.s = this.m.R.y;
  this.m.R.s = k + j;
  var u = new ye(0, 0, 0);
  Be(this.m, u, -o, -n, -s);
  b.c.h.x -= a * u.x;
  b.c.h.y -= a * u.y;
  b.c.k -= k * (e * u.y - f * u.x + u.s);
  c.c.h.x += d * u.x;
  c.c.h.y += d * u.y;
  c.c.k += j * (g * u.y - h * u.x + u.s);
  U(b);
  U(c);
  return q <= 0.005 && v <= oa
};
function De() {
  this.type = 0;
  this.ea = this.da = this.Ac = p;
  this.xg = !1
}
;function Ee() {
  De.call(this);
  this.qd = new D(0, 0);
  this.rd = new D(0, 0);
  this.type = 8;
  this.je = 0
}
A(Ee, De);
Ee.prototype.wa = function(a, d, b) {
  this.da = a;
  this.ea = d;
  this.qd.l(na(this.da.g, b));
  this.rd.l(na(this.ea.g, b));
  this.je = this.ea.Pb() - this.da.Pb()
};
Ee.prototype.Cc = function() {
  return new Ce(this)
};
function Fe(a) {
  J.call(this);
  this.I = J.Nc;
  this.N = a;
  this.V = new D(0, 0)
}
A(Fe, J);
x = Fe.prototype;
x.la = function() {
  var a = new Fe;
  a.i(this);
  return a
};
x.i = function(a) {
  J.prototype.i.call(this, a);
  a instanceof Fe && this.V.l(a.V)
};
x.Jd = function(a, d) {
  var b = d.d, c = d.position.x + (b.a.x * this.V.x + b.b.x * this.V.y), b = d.position.y + (b.a.y * this.V.x + b.b.y * this.V.y);
  a.lowerBound.i(c - this.N, b - this.N);
  a.upperBound.i(c + this.N, b + this.N)
};
x.Ye = function(a, d) {
  a.xc = d * Math.PI * this.N * this.N;
  a.Kc.l(this.V);
  a.Od = a.xc * (0.5 * this.N * this.N + (this.V.x * this.V.x + this.V.y * this.V.y))
};
x.gf = function(a) {
  a.j = [this.V];
  a.t = 1;
  a.N = this.N
};
function Ge(a) {
  Od.call(this, a);
  this.vb = new ha;
  this.Pd = new ha;
  this.Qd = new ha;
  this.Rd = new ha;
  this.na = new ye(0, 0, 0);
  this.xb = new D(0, 0);
  this.Lb = new D(0, 0);
  this.Ib = new D(0, 0);
  this.Jb = new D(0, 0);
  this.v = new ye(0, 0, 0);
  this.m = new ze;
  this.Ib.l(a.qd);
  this.Jb.l(a.rd);
  this.Fe = a.je;
  this.v.ca();
  this.dc = 0;
  this.De = a.Ei;
  this.Kf = a.pj;
  this.Pi = a.Wi;
  this.Qi = a.$i;
  this.Df = a.gi;
  this.Lg = a.hi;
  this.Oa = 0
}
A(Ge, Od);
x = Ge.prototype;
x.bd = function() {
  return Vd(this.Ea, this.Ib)
};
x.cd = function() {
  return Vd(this.Fa, this.Jb)
};
x.ed = function(a) {
  var d = this.Ea, b = this.Fa, c, e = 0;
  c = d.g.d;
  var f = this.Ib.x - d.c.u.x, g = this.Ib.y - d.c.u.y, e = c.a.x * f + c.b.x * g, g = c.a.y * f + c.b.y * g, f = e;
  c = b.g.d;
  var h = this.Jb.x - b.c.u.x, k = this.Jb.y - b.c.u.y, e = c.a.x * h + c.b.x * k, k = c.a.y * h + c.b.y * k, h = e;
  c = d.w;
  var e = b.w, j = d.M, o = b.M;
  this.m.a.x = c + e + g * g * j + k * k * o;
  this.m.b.x = -g * f * j - k * h * o;
  this.m.R.x = -g * j - k * o;
  this.m.a.y = this.m.b.x;
  this.m.b.y = c + e + f * f * j + h * h * o;
  this.m.R.y = f * j + h * o;
  this.m.a.s = this.m.R.x;
  this.m.b.s = this.m.R.y;
  this.m.R.s = j + o;
  this.Ee = 1 / (j + o);
  if(!this.Lg) {
    this.dc = 0
  }
  if(this.Df) {
    var n = b.c.k - d.c.k - this.Fe;
    if(Math.abs(this.Kf - this.De) < 2 * oa) {
      this.Oa = 3
    }else {
      if(n <= this.De) {
        if(this.Oa != 1) {
          this.v.s = 0
        }
        this.Oa = 1
      }else {
        if(n >= this.Kf) {
          if(this.Oa != 2) {
            this.v.s = 0
          }
          this.Oa = 2
        }else {
          this.Oa = 0, this.v.s = 0
        }
      }
    }
  }else {
    this.Oa = 0
  }
  a.Gd ? (this.v.x *= a.Wb, this.v.y *= a.Wb, this.dc *= a.Wb, a = this.v.x, n = this.v.y, d.q.x -= c * a, d.q.y -= c * n, d.F -= j * (f * n - g * a + this.dc + this.v.s), b.q.x += e * a, b.q.y += e * n, b.F += o * (h * n - k * a + this.dc + this.v.s)) : (this.v.ca(), this.dc = 0)
};
x.Jc = function(a) {
  var d = this.Ea, b = this.Fa, c = 0, e = c = 0, f = 0, g = 0, h = 0, k = d.q, j = d.F, o = b.q, n = b.F, s = d.w, q = b.w, v = d.M, u = b.M;
  if(this.Lg && this.Oa != 3) {
    e = this.Ee * -(n - j - this.Qi), f = this.dc, g = a.Z * this.Pi, this.dc = H(this.dc + e, -g, g), e = this.dc - f, j -= v * e, n += u * e
  }
  if(this.Df && this.Oa != 0) {
    var a = d.g.d, e = this.Ib.x - d.c.u.x, f = this.Ib.y - d.c.u.y, c = a.a.x * e + a.b.x * f, f = a.a.y * e + a.b.y * f, e = c, a = b.g.d, g = this.Jb.x - b.c.u.x, h = this.Jb.y - b.c.u.y, c = a.a.x * g + a.b.x * h, h = a.a.y * g + a.b.y * h, g = c, a = o.x + -n * h - k.x - -j * f, w = o.y + n * g - k.y - j * e;
    Be(this.m, this.na, -a, -w, -(n - j));
    if(this.Oa == 3) {
      this.v.Hd(this.na)
    }else {
      if(this.Oa == 1) {
        if(c = this.v.s + this.na.s, c < 0) {
          Ae(this.m, this.Lb, -a, -w), this.na.x = this.Lb.x, this.na.y = this.Lb.y, this.na.s = -this.v.s, this.v.x += this.Lb.x, this.v.y += this.Lb.y, this.v.s = 0
        }
      }else {
        if(this.Oa == 2 && (c = this.v.s + this.na.s, c > 0)) {
          Ae(this.m, this.Lb, -a, -w), this.na.x = this.Lb.x, this.na.y = this.Lb.y, this.na.s = -this.v.s, this.v.x += this.Lb.x, this.v.y += this.Lb.y, this.v.s = 0
        }
      }
    }
    k.x -= s * this.na.x;
    k.y -= s * this.na.y;
    j -= v * (e * this.na.y - f * this.na.x + this.na.s);
    o.x += q * this.na.x;
    o.y += q * this.na.y;
    n += u * (g * this.na.y - h * this.na.x + this.na.s)
  }else {
    a = d.g.d, e = this.Ib.x - d.c.u.x, f = this.Ib.y - d.c.u.y, c = a.a.x * e + a.b.x * f, f = a.a.y * e + a.b.y * f, e = c, a = b.g.d, g = this.Jb.x - b.c.u.x, h = this.Jb.y - b.c.u.y, c = a.a.x * g + a.b.x * h, h = a.a.y * g + a.b.y * h, g = c, Ae(this.m, this.xb, -(o.x + -n * h - k.x - -j * f), -(o.y + n * g - k.y - j * e)), this.v.x += this.xb.x, this.v.y += this.xb.y, k.x -= s * this.xb.x, k.y -= s * this.xb.y, j -= v * (e * this.xb.y - f * this.xb.x), o.x += q * this.xb.x, o.y += q * this.xb.y, 
    n += u * (g * this.xb.y - h * this.xb.x)
  }
  d.q.l(k);
  d.F = j;
  b.q.l(o);
  b.F = n
};
x.Ic = function() {
  var a = 0, d, b = this.Ea, c = this.Fa, e = 0, f = d = 0, g = 0, h = 0;
  if(this.Df && this.Oa != 0) {
    var a = c.c.k - b.c.k - this.Fe, k = 0;
    this.Oa == 3 ? (a = H(a - this.De, -pa, pa), k = -this.Ee * a, e = Math.abs(a)) : this.Oa == 1 ? (a -= this.De, e = -a, a = H(a + oa, -pa, 0), k = -this.Ee * a) : this.Oa == 2 && (a -= this.Kf, e = a, a = H(a - oa, 0, pa), k = -this.Ee * a);
    b.c.k -= b.M * k;
    c.c.k += c.M * k;
    U(b);
    U(c)
  }
  d = b.g.d;
  k = this.Ib.x - b.c.u.x;
  a = this.Ib.y - b.c.u.y;
  f = d.a.x * k + d.b.x * a;
  a = d.a.y * k + d.b.y * a;
  k = f;
  d = c.g.d;
  var j = this.Jb.x - c.c.u.x, o = this.Jb.y - c.c.u.y, f = d.a.x * j + d.b.x * o, o = d.a.y * j + d.b.y * o, j = f, g = c.c.h.x + j - b.c.h.x - k, h = c.c.h.y + o - b.c.h.y - a, n = g * g + h * h;
  d = Math.sqrt(n);
  var f = b.w, s = c.w, q = b.M, v = c.M;
  n > 0.05 * 0.05 && (n = 1 / (f + s), g = n * -g, h = n * -h, b.c.h.x -= 0.5 * f * g, b.c.h.y -= 0.5 * f * h, c.c.h.x += 0.5 * s * g, c.c.h.y += 0.5 * s * h, g = c.c.h.x + j - b.c.h.x - k, h = c.c.h.y + o - b.c.h.y - a);
  this.Pd.a.x = f + s;
  this.Pd.b.x = 0;
  this.Pd.a.y = 0;
  this.Pd.b.y = f + s;
  this.Qd.a.x = q * a * a;
  this.Qd.b.x = -q * k * a;
  this.Qd.a.y = -q * k * a;
  this.Qd.b.y = q * k * k;
  this.Rd.a.x = v * o * o;
  this.Rd.b.x = -v * j * o;
  this.Rd.a.y = -v * j * o;
  this.Rd.b.y = v * j * j;
  this.vb.fd(this.Pd);
  this.vb.Xe(this.Qd);
  this.vb.Xe(this.Rd);
  this.vb.Ud(He, -g, -h);
  g = He.x;
  h = He.y;
  b.c.h.x -= b.w * g;
  b.c.h.y -= b.w * h;
  b.c.k -= b.M * (k * h - a * g);
  c.c.h.x += c.w * g;
  c.c.h.y += c.w * h;
  c.c.k += c.M * (j * h - o * g);
  U(b);
  U(c);
  return d <= 0.005 && e <= oa
};
var He = new D(0, 0);
function Ie() {
  De.call(this);
  this.qd = new D(0, 0);
  this.rd = new D(0, 0);
  this.type = 1;
  this.qd.ca();
  this.rd.ca();
  this.$i = this.Wi = this.pj = this.Ei = this.je = 0;
  this.hi = this.gi = !1
}
A(Ie, De);
Ie.prototype.wa = function(a, d, b) {
  this.da = a;
  this.ea = d;
  this.qd = na(this.da.g, b);
  this.rd = na(this.ea.g, b);
  this.je = this.ea.Pb() - this.da.Pb()
};
Ie.prototype.Cc = function() {
  return new Ge(this)
};
var Je = {};
(function(a) {
  var d, b = new D(600, 80), c = new D(400, 300), e, f, g, h;
  a.Db = function(d, e, f) {
    g = new pe(a, d, b, P.Dc.bf, c, 20, e);
    h = new P(g);
    d = new D(13, b.y - 45);
    a.vf();
    a.Zh();
    a.Xh();
    a.Ub(d, f);
    a.uf(new D(13, b.y - 40));
    qe(g)
  };
  a.Ub = function(a, b) {
    var c = new D(0, 0), n = new D(21, 47), s = new D(n.x / 20, n.y / 20);
    d = h.Ub(s, a);
    Gc(g.Tb, d, s, c, n);
    f = new Mb("game");
    f.Pa(new cc(function() {
      g.paused = !g.paused
    }, "Pause", !1), 80, !1, !1, !1);
    e = new Mb("player");
    e.Pa(d.Ja.Mf, b ? 87 : 38, !1, !1, !1);
    e.Pa(d.Ja.he, b ? 65 : 37, !1, !1, !1);
    e.Pa(d.Ja.Lf, b ? 83 : 40, !1, !1, !1);
    e.Pa(d.Ja.ie, b ? 68 : 39, !1, !1, !1)
  };
  a.vf = function() {
    var d = new D(3, 0.25);
    R(g.n, new D(5, 0.25), new D(16, b.y - 1.5), !0, {Ta:Math.PI / 3}, p);
    h.jd(d, new D(10, b.y - 6));
    h.jd(d, new D(6, b.y - 12));
    h.jd(d, new D(8, b.y - 18));
    h.jd(d, new D(12, b.y - 24));
    h.jd(d, new D(10, b.y - 30));
    h.jd(d, new D(10, b.y - 36));
    h.f(new D(b.x - 14, 0.5), new D(b.x / 2 + 7, b.y - 25));
    a.sf(new D(10, 5), new D(20, b.y - 25))
  };
  a.sf = function(a, b) {
    R(g.n, new D(0.25, Math.sqrt(a.y * a.y * 2)), new D(b.x + a.y / 2, b.y - a.y / 2), !0, {Ta:Math.PI / 4}, p);
    R(g.n, new D(0.25, a.y), new D(b.x + a.y, b.y - a.y / 2), !0, p, p);
    R(g.n, new D(0.25, a.y), new D(b.x + a.x, b.y - a.y / 2), !0, p, p);
    for(var d = new Fe(0.15), c = a.y + 1;c < a.x;c += 0.3) {
      for(var e = 0;e < a.y / 2;e += 0.3) {
        var f = g.n.wb(new D(0.3, 0.3), new D(b.x + c + (Math.random() - 0.5) / 2, b.y - a.y), !0, d, {Xb:{kd:0.1, Mb:0.1, bb:0.1}}), h = Math.random();
        h <= 0.25 ? T(f, "graphics/ball-red.png") : h <= 0.5 ? T(f, "graphics/ball-green.png") : h <= 0.75 ? T(f, "graphics/ball-yellow.png") : T(f, "graphics/ball-blue.png")
      }
    }
  };
  a.Zh = function() {
    for(var a = new Ie, d = new Ee, c = !1, e = 20;e <= b.x - 10;e += 8) {
      me.Ta = e / b.x * Math.PI;
      var f = b.y - 14;
      c && (f += 8);
      var c = !c, h = R(g.n, new D(0.1, 0.1), new D(e, f), !1), v = ie(g.n, new D(10, 1), new D(e, f));
      T(v, "graphics/spinner.png");
      P.Yd(v, !1);
      var f = ie(g.n, new D(10, 1), new D(e, f)), u = f.body, w = me.Ta + Math.PI / 2;
      w === i && (w = 0);
      Ud(u, u.g.position, w);
      T(f, "graphics/spinner.png");
      a.wa(h.body, v.body, h.body.c.h);
      g.n.lb.Ze(a);
      a.wa(h.body, f.body, h.body.c.h);
      g.n.lb.Ze(a);
      d.wa(v.body, f.body, v.body.c.h);
      g.n.lb.Ze(d)
    }
  };
  a.Xh = function() {
    for(var a = {type:Rd.Cj, od:!1}, d = {Mb:2.5}, c = new Fe(0.25), e = new D(0.5, 0.5), f = 0;f < 50;f++) {
      var h = f * 5 % (b.x - 10), h = new D(h + f % 20 / 20 + 4.5, 15 + f % 20);
      g.n.wb(e, h, !0, c, {hd:a, Xb:d})
    }
    c = new Da;
    Ga(c, 0.25, 0.25);
    for(f = 0;f < 50;f++) {
      h = f * 5 % (b.x - 10), h = new D(h + (f + 5) % 20 / 20 + 4.5, 15 + (f + 5) % 20), a.Ta = f % 17 / 17, g.n.wb(e, h, !0, c, {hd:a, Xb:d})
    }
    c = new Da;
    Fa(c, [new D(-0.5, -0.5), new D(0.5, -0.5), new D(-0.5, 0.5)], 3);
    for(f = 0;f < 50;f++) {
      h = f * 5 % (b.x - 10), h = new D(h + (f + 10) % 20 / 20 + 4.5, 15 + (f + 10) % 20), a.Ta = f % 22 / 22, g.n.wb(e, h, !0, c, {hd:a, Xb:d})
    }
    c = new Da;
    Fa(c, [new D(-0.5, -0.5), new D(0, -0.5), new D(0.5, 0), new D(0.5, 0.5), new D(0, 0.3)], 5);
    for(f = 0;f < 50;f++) {
      h = f * 5 % (b.x - 10), h = new D(h + (f + 15) % 20 / 20 + 4.5, 15 + (f + 15) % 20), a.Ta = f % 35 / 35, g.n.wb(e, h, !0, c, {hd:a, Xb:d})
    }
  };
  a.uf = function(a) {
    var b = new D(0, 454), d = new D(178, 326), c = new D(354, 54), e = new D(354, 54), f = new D(32, 84), g = new D(158, 388), u = new D(190, 388), w = new D(158, 356), y = new D(190, 356), N = new D(158, 356), C = new D(190, 356), l = new D(1.6, 1.6), a = new D(a.x + l.x / 2, a.y + l.y / 2), m = h.f(l, new D(a.x, a.y));
    T(m, "graphics/smbsheet.gif", b);
    m = h.f(l, new D(a.x + l.x, a.y));
    T(m, "graphics/smbsheet.gif", b);
    m = h.f(l, new D(a.x + l.x * 2, a.y));
    T(m, "graphics/smbsheet.gif", b);
    m = h.f(l, new D(a.x + l.x * 3, a.y));
    T(m, "graphics/smbsheet.gif", b);
    m = h.f(l, new D(a.x + l.x * 4, a.y));
    T(m, "graphics/smbsheet.gif", b);
    m = h.f(l, new D(a.x + l.x * 5, a.y));
    T(m, "graphics/smbsheet.gif", b);
    m = h.f(l, new D(a.x + l.x * 6, a.y));
    T(m, "graphics/smbsheet.gif", b);
    m = h.f(l, new D(a.x + l.x * 7, a.y));
    T(m, "graphics/smbsheet.gif", b);
    m = h.f(l, new D(a.x + l.x * 8, a.y));
    T(m, "graphics/smbsheet.gif", b);
    m = h.f(l, new D(a.x + l.x * 9, a.y));
    T(m, "graphics/smbsheet.gif", b);
    m = h.f(l, new D(a.x + l.x * 10, a.y));
    T(m, "graphics/smbsheet.gif", b);
    m = h.f(l, new D(a.x + l.x * 11, a.y));
    T(m, "graphics/smbsheet.gif", b);
    m = h.f(l, new D(a.x + l.x * 12, a.y));
    T(m, "graphics/smbsheet.gif", b);
    m = h.f(l, new D(a.x + l.x * 13, a.y));
    T(m, "graphics/smbsheet.gif", b);
    m = h.f(l, new D(a.x + l.x * 14, a.y));
    T(m, "graphics/smbsheet.gif", b);
    m = h.f(l, new D(a.x + l.x * 15, a.y));
    T(m, "graphics/smbsheet.gif", b);
    m = h.f(l, new D(a.x + l.x * 16, a.y));
    T(m, "graphics/smbsheet.gif", b);
    m = h.Ka(l, new D(a.x + l.x * 16, a.y - l.y * 4));
    T(m, "graphics/smbsheet.gif", c);
    m = h.f(l, new D(a.x + l.x * 17, a.y));
    T(m, "graphics/smbsheet.gif", b);
    m = h.f(l, new D(a.x + l.x * 18, a.y));
    T(m, "graphics/smbsheet.gif", b);
    m = h.f(l, new D(a.x + l.x * 19, a.y));
    T(m, "graphics/smbsheet.gif", b);
    m = h.f(l, new D(a.x + l.x * 20, a.y));
    T(m, "graphics/smbsheet.gif", b);
    m = h.Ka(l, new D(a.x + l.x * 20, a.y - l.y * 4));
    T(m, "graphics/smbsheet.gif", d);
    m = h.f(l, new D(a.x + l.x * 21, a.y));
    T(m, "graphics/smbsheet.gif", b);
    m = h.Ka(l, new D(a.x + l.x * 21, a.y - l.y * 4));
    T(m, "graphics/smbsheet.gif", e);
    m = h.f(l, new D(a.x + l.x * 22, a.y));
    T(m, "graphics/smbsheet.gif", b);
    m = h.Ka(l, new D(a.x + l.x * 22, a.y - l.y * 4));
    T(m, "graphics/smbsheet.gif", d);
    m = h.Ka(l, new D(a.x + l.x * 22, a.y - l.y * 8));
    T(m, "graphics/smbsheet.gif", c);
    m = h.f(l, new D(a.x + l.x * 23, a.y));
    T(m, "graphics/smbsheet.gif", b);
    m = h.Ka(l, new D(a.x + l.x * 23, a.y - l.y * 4));
    T(m, "graphics/smbsheet.gif", c);
    m = h.f(l, new D(a.x + l.x * 24, a.y));
    T(m, "graphics/smbsheet.gif", b);
    m = h.Ka(l, new D(a.x + l.x * 24, a.y - l.y * 4));
    T(m, "graphics/smbsheet.gif", d);
    m = h.f(l, new D(a.x + l.x * 25, a.y));
    T(m, "graphics/smbsheet.gif", b);
    m = h.f(l, new D(a.x + l.x * 26, a.y));
    T(m, "graphics/smbsheet.gif", b);
    m = h.f(l, new D(a.x + l.x * 27, a.y));
    T(m, "graphics/smbsheet.gif", b);
    m = h.f(l, new D(a.x + l.x * 28, a.y));
    T(m, "graphics/smbsheet.gif", b);
    m = h.f(l, new D(a.x + l.x * 28, a.y - l.y * 1));
    T(m, "graphics/smbsheet.gif", g);
    m = h.f(l, new D(a.x + l.x * 28, a.y - l.y * 2));
    T(m, "graphics/smbsheet.gif", w);
    m = h.f(l, new D(a.x + l.x * 29, a.y));
    T(m, "graphics/smbsheet.gif", b);
    m = h.f(l, new D(a.x + l.x * 29, a.y - l.y * 1));
    T(m, "graphics/smbsheet.gif", u);
    m = h.f(l, new D(a.x + l.x * 29, a.y - l.y * 2));
    T(m, "graphics/smbsheet.gif", y);
    m = h.f(l, new D(a.x + l.x * 30, a.y));
    T(m, "graphics/smbsheet.gif", b);
    m = h.f(l, new D(a.x + l.x * 31, a.y));
    T(m, "graphics/smbsheet.gif", b);
    m = h.f(l, new D(a.x + l.x * 32, a.y));
    T(m, "graphics/smbsheet.gif", b);
    m = h.f(l, new D(a.x + l.x * 33, a.y));
    T(m, "graphics/smbsheet.gif", b);
    m = h.f(l, new D(a.x + l.x * 34, a.y));
    T(m, "graphics/smbsheet.gif", b);
    m = h.f(l, new D(a.x + l.x * 35, a.y));
    T(m, "graphics/smbsheet.gif", b);
    m = h.f(l, new D(a.x + l.x * 36, a.y));
    T(m, "graphics/smbsheet.gif", b);
    m = h.f(l, new D(a.x + l.x * 37, a.y));
    T(m, "graphics/smbsheet.gif", b);
    m = h.f(l, new D(a.x + l.x * 38, a.y));
    T(m, "graphics/smbsheet.gif", b);
    m = h.f(l, new D(a.x + l.x * 38, a.y - l.y * 1));
    T(m, "graphics/smbsheet.gif", g);
    m = h.f(l, new D(a.x + l.x * 38, a.y - l.y * 2));
    T(m, "graphics/smbsheet.gif", g);
    m = h.f(l, new D(a.x + l.x * 38, a.y - l.y * 3));
    T(m, "graphics/smbsheet.gif", w);
    m = h.f(l, new D(a.x + l.x * 39, a.y));
    T(m, "graphics/smbsheet.gif", b);
    m = h.f(l, new D(a.x + l.x * 39, a.y - l.y * 1));
    T(m, "graphics/smbsheet.gif", u);
    m = h.f(l, new D(a.x + l.x * 39, a.y - l.y * 2));
    T(m, "graphics/smbsheet.gif", u);
    m = h.f(l, new D(a.x + l.x * 39, a.y - l.y * 3));
    T(m, "graphics/smbsheet.gif", y);
    m = h.f(l, new D(a.x + l.x * 40, a.y));
    T(m, "graphics/smbsheet.gif", b);
    m = h.f(l, new D(a.x + l.x * 41, a.y));
    T(m, "graphics/smbsheet.gif", b);
    m = h.f(l, new D(a.x + l.x * 42, a.y));
    T(m, "graphics/smbsheet.gif", b);
    m = h.f(l, new D(a.x + l.x * 43, a.y));
    T(m, "graphics/smbsheet.gif", b);
    m = h.f(l, new D(a.x + l.x * 44, a.y));
    T(m, "graphics/smbsheet.gif", b);
    m = h.f(l, new D(a.x + l.x * 45, a.y));
    T(m, "graphics/smbsheet.gif", b);
    m = h.f(l, new D(a.x + l.x * 46, a.y));
    T(m, "graphics/smbsheet.gif", b);
    m = h.f(l, new D(a.x + l.x * 46, a.y - l.y * 1));
    T(m, "graphics/smbsheet.gif", g);
    m = h.f(l, new D(a.x + l.x * 46, a.y - l.y * 2));
    T(m, "graphics/smbsheet.gif", g);
    m = h.f(l, new D(a.x + l.x * 46, a.y - l.y * 3));
    T(m, "graphics/smbsheet.gif", g);
    m = h.f(l, new D(a.x + l.x * 46, a.y - l.y * 4));
    T(m, "graphics/smbsheet.gif", w);
    m = h.f(l, new D(a.x + l.x * 47, a.y));
    T(m, "graphics/smbsheet.gif", b);
    m = h.f(l, new D(a.x + l.x * 47, a.y - l.y * 1));
    T(m, "graphics/smbsheet.gif", u);
    m = h.f(l, new D(a.x + l.x * 47, a.y - l.y * 2));
    T(m, "graphics/smbsheet.gif", u);
    m = h.f(l, new D(a.x + l.x * 47, a.y - l.y * 3));
    T(m, "graphics/smbsheet.gif", u);
    m = h.f(l, new D(a.x + l.x * 47, a.y - l.y * 4));
    T(m, "graphics/smbsheet.gif", y);
    m = h.f(l, new D(a.x + l.x * 48, a.y));
    T(m, "graphics/smbsheet.gif", b);
    m = h.f(l, new D(a.x + l.x * 49, a.y));
    T(m, "graphics/smbsheet.gif", b);
    m = h.f(l, new D(a.x + l.x * 50, a.y));
    T(m, "graphics/smbsheet.gif", b);
    m = h.f(l, new D(a.x + l.x * 51, a.y));
    T(m, "graphics/smbsheet.gif", b);
    m = h.f(l, new D(a.x + l.x * 52, a.y));
    T(m, "graphics/smbsheet.gif", b);
    m = h.f(l, new D(a.x + l.x * 53, a.y));
    T(m, "graphics/smbsheet.gif", b);
    m = h.f(l, new D(a.x + l.x * 54, a.y));
    T(m, "graphics/smbsheet.gif", b);
    m = h.f(l, new D(a.x + l.x * 55, a.y));
    T(m, "graphics/smbsheet.gif", b);
    m = h.f(l, new D(a.x + l.x * 56, a.y));
    T(m, "graphics/smbsheet.gif", b);
    m = h.f(l, new D(a.x + l.x * 57, a.y));
    T(m, "graphics/smbsheet.gif", b);
    m = h.f(l, new D(a.x + l.x * 57, a.y - l.y * 1));
    T(m, "graphics/smbsheet.gif", g);
    m = h.f(l, new D(a.x + l.x * 57, a.y - l.y * 2));
    T(m, "graphics/smbsheet.gif", g);
    m = h.f(l, new D(a.x + l.x * 57, a.y - l.y * 3));
    T(m, "graphics/smbsheet.gif", g);
    m = h.f(l, new D(a.x + l.x * 57, a.y - l.y * 4));
    T(m, "graphics/smbsheet.gif", N);
    m = h.f(l, new D(a.x + l.x * 58, a.y));
    T(m, "graphics/smbsheet.gif", b);
    m = h.f(l, new D(a.x + l.x * 58, a.y - l.y * 1));
    T(m, "graphics/smbsheet.gif", u);
    m = h.f(l, new D(a.x + l.x * 58, a.y - l.y * 2));
    T(m, "graphics/smbsheet.gif", u);
    m = h.f(l, new D(a.x + l.x * 58, a.y - l.y * 3));
    T(m, "graphics/smbsheet.gif", u);
    m = h.f(l, new D(a.x + l.x * 58, a.y - l.y * 4));
    T(m, "graphics/smbsheet.gif", C);
    m = h.f(l, new D(a.x + l.x * 59, a.y));
    T(m, "graphics/smbsheet.gif", b);
    m = h.f(l, new D(a.x + l.x * 60, a.y));
    T(m, "graphics/smbsheet.gif", b);
    m = h.f(l, new D(a.x + l.x * 61, a.y));
    T(m, "graphics/smbsheet.gif", b);
    m = h.f(l, new D(a.x + l.x * 62, a.y));
    T(m, "graphics/smbsheet.gif", b);
    m = h.f(l, new D(a.x + l.x * 63, a.y));
    T(m, "graphics/smbsheet.gif", b);
    m = h.f(l, new D(a.x + l.x * 64, a.y));
    T(m, "graphics/smbsheet.gif", b);
    m = h.Ka(l, new D(a.x + l.x * 64, a.y - l.y * 5));
    P.Yd(m, P.Q.gd | P.Q.Gc | P.Q.Hc);
    T(m, "graphics/smbsheet.gif", f);
    m = h.f(l, new D(a.x + l.x * 65, a.y));
    T(m, "graphics/smbsheet.gif", b);
    m = h.f(l, new D(a.x + l.x * 66, a.y));
    T(m, "graphics/smbsheet.gif", b);
    m = h.f(l, new D(a.x + l.x * 67, a.y));
    T(m, "graphics/smbsheet.gif", b);
    m = h.f(l, new D(a.x + l.x * 68, a.y));
    T(m, "graphics/smbsheet.gif", b);
    m = h.f(l, new D(a.x + l.x * 71, a.y));
    T(m, "graphics/smbsheet.gif", b);
    m = h.f(l, new D(a.x + l.x * 72, a.y));
    T(m, "graphics/smbsheet.gif", b);
    m = h.f(l, new D(a.x + l.x * 73, a.y));
    T(m, "graphics/smbsheet.gif", b);
    m = h.f(l, new D(a.x + l.x * 74, a.y));
    T(m, "graphics/smbsheet.gif", b);
    m = h.f(l, new D(a.x + l.x * 75, a.y));
    T(m, "graphics/smbsheet.gif", b);
    m = h.f(l, new D(a.x + l.x * 76, a.y));
    T(m, "graphics/smbsheet.gif", b);
    m = h.f(l, new D(a.x + l.x * 77, a.y));
    T(m, "graphics/smbsheet.gif", b);
    m = h.Ka(l, new D(a.x + l.x * 77, a.y - l.y * 4));
    T(m, "graphics/smbsheet.gif", d);
    m = h.f(l, new D(a.x + l.x * 78, a.y));
    T(m, "graphics/smbsheet.gif", b);
    m = h.Ka(l, new D(a.x + l.x * 78, a.y - l.y * 4));
    T(m, "graphics/smbsheet.gif", e);
    m = h.f(l, new D(a.x + l.x * 79, a.y));
    T(m, "graphics/smbsheet.gif", b);
    m = h.Ka(l, new D(a.x + l.x * 79, a.y - l.y * 4));
    T(m, "graphics/smbsheet.gif", d)
  };
  a.We = function(a, b) {
    f.Yb(a, b)
  };
  a.Le = function(a, b) {
    f.Yb(a, b);
    e.Yb(a, b)
  };
  a.Ke = function() {
    wc(g.viewport, d.body.c.h)
  }
})(Je);
ba("test.init", Je.Db);
var Ke = {};
(function(a) {
  var d, b = new D(350, 30), c = new D(600, 300), e, f, g, h, k = new D(0, 454), j = new D(178, 326), o = new D(2, 124), n = new D(354, 54), s = new D(0, 58), q = new D(290, 54), v = new D(178, 326), u = new D(0, 0), w = new D(32, 84), y = new D(354, 54), N = new D(0, 90), C = new D(0, 0), l = new D(2, 158), m = new D(158, 388), K = new D(190, 388), V = new D(158, 356), Me = new D(190, 356), Ne = new D(158, 356), Oe = new D(190, 356), Pe = new D(55, 380), Qe = new D(10, 396), Re = new D(466, 168), 
  Se = new D(452, 136), Te = new D(466, 104), Ue = new D(300, 424), Ve = new D(300, 352), We = new D(364, 424), Xe = new D(364, 384), Ye = new D(332, 352), Ze = new D(332, 320), $e = new D(396, 352), af = new D(396, 320), bf = new D(364, 352), cf = new D(362, 264), df = new D(160, 64);
  a.Db = function(d, e, f) {
    g = new pe(a, d, b, P.Dc.bf, c, 20, e);
    h = new P(g);
    d = new D(5, b.y - 7);
    a.Ub(d, f);
    a.uf(new D(0, b.y), d);
    f = $(g.n, new D(c.x / 20, c.y / 20), new D(0, 0), -1);
    T(f, "graphics/sky.png");
    f.display.Je = 1;
    qe(g)
  };
  a.Ub = function(a, b) {
    var c = new D(0, 0), j = new D(21, 47), k = new D(j.x / 20, j.y / 20);
    d = h.Ub(k, a);
    Gc(g.Tb, d, k, c, j);
    d.display.ag = 10;
    f = new Mb("game");
    f.Pa(new cc(function() {
      g.paused = !g.paused
    }, "Pause", !1), 80, !1, !1, !1);
    e = new Mb("player");
    e.Pa(d.Ja.Mf, b ? 87 : 38, !1, !1, !1);
    e.Pa(d.Ja.he, b ? 65 : 37, !1, !1, !1);
    e.Pa(d.Ja.Lf, b ? 83 : 40, !1, !1, !1);
    e.Pa(d.Ja.ie, b ? 68 : 39, !1, !1, !1)
  };
  a.uf = function(b, d) {
    for(var c = new D(1.6, 1.6), e = new D(b.x - c.x / 2, b.y - c.y / 2), f = ["                                                                                                                                                                                                                    ".split(""), "                                                                                                                                                                                                                    ".split(""), 
    "                                                                                                                                                                                                      o             ".split(""), "                                                                                                                                                                                                     F|             ".split(""), "                                                                                   G                                                                                                                  |             ".split(""), 
    "                      O                                                         ########   ###O              M           ###    #OO#                                                        ==        |             ".split(""), "                                                                                                                                                                                           ===        |             ".split(""), "                                                                               G                                                                                                          ====        |     $       ".split(""), 
    "                                                                1                                                                                                                        =====        |    ^^^      ".split(""), "                O   #M#O#                     <>         {}                  #M#              @     #*    O  O  O     #          ##      =  =          ==  =            ###O#           ======        |    R+L      ".split(""), "                                      <>      []         []                                                                             ==  ==        ===  ==                          =======        |   ^r&l^     ".split(""), 
    "                            <>        []      []         []                                                                            ===  ===      ====  ===     {}              <> ========        |   ++u++     ".split(""), "                     G      []        [] G    []     G G []                                    G G        T                G G G G    ====  ====    =====  ====    []        G G   []=========        =   ++8++     ".split(""), "---------------------------------------------------------------------  ---------------   ----------------------------------------------------------------  ---------------------------------------------------------".split(""), 
    "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx".split("")], e = new D(e.x, e.y - c.y * (f.length - 1)), g = 0;g < f.length;g++) {
      for(var h = 0;h < f[g].length;h++) {
        a.Yh(f[g][h], new D(h, g), e, c, d)
      }
    }
  };
  a.Yh = function(a, b, d, c, e) {
    var f = p, B = p;
    switch(a) {
      case " ":
        break;
      case "-":
        f = h.f(c, new D(d.x + b.x * c.x, d.y + b.y * c.y));
        B = k;
        break;
      case "=":
        f = h.f(c, new D(d.x + b.x * c.x, d.y + b.y * c.y));
        B = o;
        break;
      case "O":
        f = h.Ka(c, new D(d.x + b.x * c.x, d.y + b.y * c.y));
        P.pd(f, function() {
          var a = h.f(c, new D(d.x + b.x * c.x, d.y + b.y * c.y));
          T(a, "graphics/smbsheet.gif", q);
          a = $(g.n, c, new D(d.x + b.x * c.x, d.y + (b.y - 1) * c.y));
          T(a, "graphics/smbsheet.gif", s)
        }, P.Q.Ab);
        B = n;
        break;
      case "@":
        f = h.f(c, new D(d.x + b.x * c.x, d.y + b.y * c.y));
        f.wg = 8;
        f.qf = 0;
        P.pd(f, function() {
          f.qf++;
          a = $(g.n, c, new D(d.x + b.x * c.x, d.y + (b.y - f.qf / f.wg) * c.y));
          T(a, "graphics/smbsheet.gif", s);
          if(f.qf == f.wg) {
            ic(g.n, f);
            var a = h.f(c, new D(d.x + b.x * c.x, d.y + b.y * c.y));
            T(a, "graphics/smbsheet.gif", q)
          }
        }, P.Q.Ab);
        B = v;
        break;
      case "#":
        f = h.Ka(c, new D(d.x + b.x * c.x, d.y + b.y * c.y));
        B = j;
        break;
      case "1":
        f = h.Ka(c, new D(d.x + b.x * c.x, d.y + b.y * c.y));
        P.Yd(f, P.Q.gd | P.Q.Gc | P.Q.Hc);
        P.pd(f, function() {
          var a = h.f(c, new D(d.x + b.x * c.x, d.y + b.y * c.y));
          T(a, "graphics/smbsheet.gif", q);
          a = $(g.n, c, new D(d.x + b.x * c.x, d.y + (b.y - 1) * c.y));
          T(a, "graphics/smbsheet.gif", l)
        }, P.Q.Ab);
        B = C;
        break;
      case "*":
        f = h.Ka(c, new D(d.x + b.x * c.x, d.y + b.y * c.y));
        P.Yd(f, P.Q.gd | P.Q.Gc | P.Q.Hc);
        P.pd(f, function() {
          var a = h.f(c, new D(d.x + b.x * c.x, d.y + b.y * c.y));
          T(a, "graphics/smbsheet.gif", q);
          a = $(g.n, c, new D(d.x + b.x * c.x, d.y + (b.y - 1) * c.y));
          T(a, "graphics/smbsheet.gif", w)
        }, P.Q.Ab);
        B = u;
        break;
      case "M":
        f = h.Ka(c, new D(d.x + b.x * c.x, d.y + b.y * c.y));
        P.pd(f, function() {
          var a = h.f(c, new D(d.x + b.x * c.x, d.y + b.y * c.y));
          T(a, "graphics/smbsheet.gif", q);
          a = $(g.n, c, new D(d.x + b.x * c.x, d.y + (b.y - 1) * c.y));
          T(a, "graphics/smbsheet.gif", N)
        }, P.Q.Ab);
        B = y;
        break;
      case "[":
        f = h.f(c, new D(d.x + b.x * c.x, d.y + b.y * c.y));
        B = m;
        break;
      case "]":
        f = h.f(c, new D(d.x + b.x * c.x, d.y + b.y * c.y));
        B = K;
        break;
      case "<":
        f = h.f(c, new D(d.x + b.x * c.x, d.y + b.y * c.y));
        B = V;
        break;
      case ">":
        f = h.f(c, new D(d.x + b.x * c.x, d.y + b.y * c.y));
        B = Me;
        break;
      case "{":
        f = h.f(c, new D(d.x + b.x * c.x, d.y + b.y * c.y));
        B = Ne;
        break;
      case "}":
        f = h.f(c, new D(d.x + b.x * c.x, d.y + b.y * c.y));
        B = Oe;
        break;
      case "T":
        f = $(g.n, c, new D(d.x + b.x * c.x, d.y + b.y * c.y));
        B = Pe;
        break;
      case "G":
        f = $(g.n, c, new D(d.x + b.x * c.x, d.y + b.y * c.y));
        B = Qe;
        break;
      case "|":
        f = $(g.n, c, new D(d.x + b.x * c.x, d.y + b.y * c.y));
        B = Re;
        break;
      case "F":
        f = $(g.n, c, new D(d.x + b.x * c.x + c.x / 2, d.y + b.y * c.y), 1);
        B = Se;
        break;
      case "o":
        f = $(g.n, c, new D(d.x + b.x * c.x, d.y + b.y * c.y));
        B = Te;
        break;
      case "+":
        f = $(g.n, c, new D(d.x + b.x * c.x, d.y + b.y * c.y));
        B = Ue;
        break;
      case "^":
        f = $(g.n, c, new D(d.x + b.x * c.x, d.y + b.y * c.y));
        B = Ve;
        break;
      case "8":
        f = $(g.n, c, new D(d.x + b.x * c.x, d.y + b.y * c.y));
        B = We;
        break;
      case "u":
        f = $(g.n, c, new D(d.x + b.x * c.x, d.y + b.y * c.y));
        B = Xe;
        break;
      case "R":
        f = $(g.n, c, new D(d.x + b.x * c.x, d.y + b.y * c.y));
        B = Ze;
        break;
      case "r":
        f = $(g.n, c, new D(d.x + b.x * c.x, d.y + b.y * c.y));
        B = Ye;
        break;
      case "L":
        f = $(g.n, c, new D(d.x + b.x * c.x, d.y + b.y * c.y));
        B = af;
        break;
      case "l":
        f = $(g.n, c, new D(d.x + b.x * c.x, d.y + b.y * c.y));
        B = $e;
        break;
      case "&":
        f = $(g.n, c, new D(d.x + b.x * c.x, d.y + b.y * c.y));
        B = bf;
        break;
      case "$":
        f = $(g.n, c, new D(d.x + b.x * c.x, d.y + b.y * c.y + c.y / 4));
        B = cf;
        break;
      case "x":
        f = h.Wh(c, new D(d.x + b.x * c.x, d.y + b.y * c.y), e);
        B = df;
        break;
      default:
        throw"Invalid type: " + a;
    }
    f !== p && "graphics/smbsheet.gif" !== p && B !== p && T(f, "graphics/smbsheet.gif", B)
  };
  a.We = function(a, b) {
    f.Yb(a, b)
  };
  a.Le = function(a, b) {
    f.Yb(a, b);
    e.Yb(a, b)
  };
  a.Ke = function() {
    wc(g.viewport, d.body.c.h)
  }
})(Ke);
ba("mario.init", Ke.Db);
var Le = {};
(function(a) {
  var d, b = new D(5, 10), c = new D(100, 200), e, f, g, h;
  a.Db = function(d, e, f) {
    g = new pe(a, d, b, P.Dc.bf, c, 20, e);
    h = new P(g);
    d = new D(2, 2);
    a.vf();
    a.Ub(d, f);
    qe(g)
  };
  a.Ub = function(a, b) {
    var c = new D(0, 0), n = new D(21, 47), s = new D(n.x / 20, n.y / 20);
    d = h.Ub(s, a);
    Gc(g.Tb, d, s, c, n);
    f = new Mb("game");
    f.Pa(new cc(function() {
      g.paused = !g.paused
    }, "Pause", !1), 80, !1, !1, !1);
    e = new Mb("player");
    e.Pa(d.Ja.Mf, b ? 87 : 38, !1, !1, !1);
    e.Pa(d.Ja.he, b ? 65 : 37, !1, !1, !1);
    e.Pa(d.Ja.Lf, b ? 83 : 40, !1, !1, !1);
    e.Pa(d.Ja.ie, b ? 68 : 39, !1, !1, !1)
  };
  a.vf = function() {
    h.f(new D(b.x, 0.5), new D(b.x / 2, b.y - 0.25));
    a.sf(new D(b.x, 6), new D(0, b.y - 0.25))
  };
  a.sf = function(a, b) {
    R(g.n, new D(0.25, a.y), new D(b.x + 0, b.y - a.y / 2), !0, p, p);
    R(g.n, new D(0.25, a.y), new D(b.x + a.x - 0.125, b.y - a.y / 2), !0, p, p);
    for(var c = new Fe(0.15), d = 0, e = 0.15;e < a.x - 0.15;e += 0.3) {
      for(var f = 0;f < a.y / 2;f += 0.3) {
        var h = g.n.wb(new D(0.3, 0.3), new D(b.x + e - d++ % 2 * 0.15, b.y - f), c, {Xb:{kd:0.1, Mb:0.1, bb:0.1}}), u = Math.random();
        u <= 0.25 ? T(h, "graphics/ball-red.png") : u <= 0.5 ? T(h, "graphics/ball-green.png") : u <= 0.75 ? T(h, "graphics/ball-yellow.png") : T(h, "graphics/ball-blue.png")
      }
    }
  };
  a.We = function(a, b) {
    f.Yb(a, b)
  };
  a.Le = function(a, b) {
    f.Yb(a, b);
    e.Yb(a, b)
  };
  a.Ke = function() {
    wc(g.viewport, d.body.c.h)
  }
})(Le);
ba("pit.init", Le.Db);


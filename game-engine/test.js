var i = void 0, q = null;
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
  for(var f;b.length && (f = b.shift());) {
    !b.length && d !== i ? c[f] = d : c = c[f] ? c[f] : c[f] = {}
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
  a.qh = d.prototype;
  a.prototype = new b;
  a.prototype.constructor = a
}
;function ga(a, d) {
  for(var b = 0, c = String(a).replace(/^[\s\xa0]+|[\s\xa0]+$/g, "").split("."), f = String(d).replace(/^[\s\xa0]+|[\s\xa0]+$/g, "").split("."), e = Math.max(c.length, f.length), g = 0;b == 0 && g < e;g++) {
    var h = c[g] || "", k = f[g] || "", j = RegExp("(\\d*)(\\D*)", "g"), o = RegExp("(\\d*)(\\D*)", "g");
    do {
      var n = j.exec(h) || ["", "", ""], s = o.exec(k) || ["", "", ""];
      if(n[0].length == 0 && s[0].length == 0) {
        break
      }
      b = ha(n[1].length == 0 ? 0 : parseInt(n[1], 10), s[1].length == 0 ? 0 : parseInt(s[1], 10)) || ha(n[2].length == 0, s[2].length == 0) || ha(n[2], s[2])
    }while(b == 0)
  }
  return b
}
function ha(a, d) {
  if(a < d) {
    return-1
  }else {
    if(a > d) {
      return 1
    }
  }
  return 0
}
;var ia, ja, ka, la;
function ma() {
  return z.navigator ? z.navigator.userAgent : q
}
la = ka = ja = ia = !1;
var na;
if(na = ma()) {
  var oa = z.navigator;
  ia = na.indexOf("Opera") == 0;
  ja = !ia && na.indexOf("MSIE") != -1;
  ka = !ia && na.indexOf("WebKit") != -1;
  la = !ia && !ka && oa.product == "Gecko"
}
var pa = ja, qa = la, ra = ka, sa = z.navigator, ta = (sa && sa.platform || "").indexOf("Mac") != -1, ua;
a: {
  var va = "", wa;
  if(ia && z.opera) {
    var xa = z.opera.version, va = typeof xa == "function" ? xa() : xa
  }else {
    if(qa ? wa = /rv\:([^\);]+)(\)|;)/ : pa ? wa = /MSIE\s+([^\);]+)(\)|;)/ : ra && (wa = /WebKit\/(\S+)/), wa) {
      var ya = wa.exec(ma()), va = ya ? ya[1] : ""
    }
  }
  if(pa) {
    var za, Aa = z.document;
    za = Aa ? Aa.documentMode : i;
    if(za > parseFloat(va)) {
      ua = String(za);
      break a
    }
  }
  ua = va
}
var Ba = {}, Ca = {};
var Da;
var Ea = {8:"backspace", 9:"tab", 13:"enter", 16:"shift", 17:"ctrl", 18:"alt", 19:"pause", 20:"caps-lock", 27:"esc", 32:"space", 33:"pg-up", 34:"pg-down", 35:"end", 36:"home", 37:"left", 38:"up", 39:"right", 40:"down", 45:"insert", 46:"delete", 48:"0", 49:"1", 50:"2", 51:"3", 52:"4", 53:"5", 54:"6", 55:"7", 56:"8", 57:"9", 61:"equals", 65:"a", 66:"b", 67:"c", 68:"d", 69:"e", 70:"f", 71:"g", 72:"h", 73:"i", 74:"j", 75:"k", 76:"l", 77:"m", 78:"n", 79:"o", 80:"p", 81:"q", 82:"r", 83:"s", 84:"t", 85:"u", 
86:"v", 87:"w", 88:"x", 89:"y", 90:"z", 93:"context", 96:"num-0", 97:"num-1", 98:"num-2", 99:"num-3", 100:"num-4", 101:"num-5", 102:"num-6", 103:"num-7", 104:"num-8", 105:"num-9", 106:"num-multiply", 107:"num-plus", 109:"num-minus", 110:"num-period", 111:"num-division", 112:"f1", 113:"f2", 114:"f3", 115:"f4", 116:"f5", 117:"f6", 118:"f7", 119:"f8", 120:"f9", 121:"f10", 122:"f11", 123:"f12", 187:"equals", 188:",", 190:".", 191:"/", 220:"\\", 224:"win"};
var Fa = Array.prototype, Ga = Fa.indexOf ? function(a, d, b) {
  return Fa.indexOf.call(a, d, b)
} : function(a, d, b) {
  b = b == q ? 0 : b < 0 ? Math.max(0, a.length + b) : b;
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
pa && (Ca[9] || (Ca[9] = pa && document.documentMode && document.documentMode >= 9));
pa && (Ba["8"] || (Ba["8"] = ga(ua, "8") >= 0));
function Ha() {
}
Ha.prototype.Mg = !1;
Ha.prototype.qd = function() {
  if(!this.Mg) {
    this.Mg = !0, this.rd()
  }
};
Ha.prototype.rd = function() {
  this.Bi && Ia.apply(q, this.Bi)
};
function Ia(a) {
  for(var d = 0, b = arguments.length;d < b;++d) {
    var c = arguments[d], f = da(c);
    f == "array" || f == "object" && typeof c.length == "number" ? Ia.apply(q, c) : c && typeof c.qd == "function" && c.qd()
  }
}
;function Ja(a, d) {
  this.type = a;
  this.currentTarget = this.target = d
}
A(Ja, Ha);
Ja.prototype.rd = function() {
  delete this.type;
  delete this.target;
  delete this.currentTarget
};
Ja.prototype.Yf = !1;
Ja.prototype.Sj = !0;
function Ka(a) {
  Ka[" "](a);
  return a
}
Ka[" "] = ca;
function La(a, d) {
  a && this.Ib(a, d)
}
A(La, Ja);
x = La.prototype;
x.target = q;
x.relatedTarget = q;
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
x.Nj = !1;
x.Pg = q;
x.Ib = function(a, d) {
  var b = this.type = a.type;
  Ja.call(this, b);
  this.target = a.target || a.srcElement;
  this.currentTarget = d;
  var c = a.relatedTarget;
  if(c) {
    if(qa) {
      var f;
      a: {
        try {
          Ka(c.nodeName);
          f = !0;
          break a
        }catch(e) {
        }
        f = !1
      }
      f || (c = q)
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
  this.Nj = ta ? a.metaKey : a.ctrlKey;
  this.state = a.state;
  this.Pg = a;
  delete this.Sj;
  delete this.Yf
};
x.rd = function() {
  La.qh.rd.call(this);
  this.relatedTarget = this.currentTarget = this.target = this.Pg = q
};
function Ma() {
}
var Na = 0;
x = Ma.prototype;
x.key = 0;
x.Gd = !1;
x.Gg = !1;
x.Ib = function(a, d, b, c, f, e) {
  if(da(a) == "function") {
    this.Ug = !0
  }else {
    if(a && a.handleEvent && da(a.handleEvent) == "function") {
      this.Ug = !1
    }else {
      throw Error("Invalid listener argument");
    }
  }
  this.ge = a;
  this.lh = d;
  this.src = b;
  this.type = c;
  this.capture = !!f;
  this.Sg = e;
  this.Gg = !1;
  this.key = ++Na;
  this.Gd = !1
};
x.handleEvent = function(a) {
  return this.Ug ? this.ge.call(this.Sg || this.src, a) : this.ge.handleEvent.call(this.ge, a)
};
var Oa, Pa = (Oa = "ScriptEngine" in z && z.ScriptEngine() == "JScript") ? z.ScriptEngineMajorVersion() + "." + z.ScriptEngineMinorVersion() + "." + z.ScriptEngineBuildVersion() : "0";
function Qa(a, d) {
  this.fh = d;
  this.Uc = [];
  if(a > this.fh) {
    throw Error("[goog.structs.SimplePool] Initial cannot be greater than max");
  }
  for(var b = 0;b < a;b++) {
    this.Uc.push(this.Bb())
  }
}
A(Qa, Ha);
x = Qa.prototype;
x.Qc = q;
x.Lg = q;
x.getObject = function() {
  return this.Uc.length ? this.Uc.pop() : this.Bb()
};
function Ra(a, d) {
  a.Uc.length < a.fh ? a.Uc.push(d) : Sa(a, d)
}
x.Bb = function() {
  return this.Qc ? this.Qc() : {}
};
function Sa(a, d) {
  if(a.Lg) {
    a.Lg(d)
  }else {
    var b = da(d);
    if(b == "object" || b == "array" || b == "function") {
      if(da(d.qd) == "function") {
        d.qd()
      }else {
        for(var c in d) {
          delete d[c]
        }
      }
    }
  }
}
x.rd = function() {
  Qa.qh.rd.call(this);
  for(var a = this.Uc;a.length;) {
    Sa(this, a.pop())
  }
  delete this.Uc
};
var Ta, Ua, Va, Wa, Xa, Ya, Za, $a, ab, bb, cb;
(function() {
  function a() {
    return{sc:0, Fd:0}
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
    return new Ma
  }
  function f() {
    return new La
  }
  var e = Oa && !(ga(Pa, "5.7") >= 0), g;
  Ya = function(a) {
    g = a
  };
  if(e) {
    Ta = function() {
      return h.getObject()
    };
    Ua = function(a) {
      Ra(h, a)
    };
    Va = function() {
      return k.getObject()
    };
    Wa = function(a) {
      Ra(k, a)
    };
    Xa = function() {
      return j.getObject()
    };
    Za = function() {
      Ra(j, b())
    };
    $a = function() {
      return o.getObject()
    };
    ab = function(a) {
      Ra(o, a)
    };
    bb = function() {
      return n.getObject()
    };
    cb = function(a) {
      Ra(n, a)
    };
    var h = new Qa(0, 600);
    h.Qc = a;
    var k = new Qa(0, 600);
    k.Qc = d;
    var j = new Qa(0, 600);
    j.Qc = b;
    var o = new Qa(0, 600);
    o.Qc = c;
    var n = new Qa(0, 600);
    n.Qc = f
  }else {
    Ta = a, Ua = ca, Va = d, Wa = ca, Xa = b, Za = ca, $a = c, ab = ca, bb = f, cb = ca
  }
})();
var db = {}, D = {}, eb = {}, fb = {};
function gb(a, d, b, c, f) {
  if(d) {
    if(da(d) == "array") {
      for(var e = 0;e < d.length;e++) {
        gb(a, d[e], b, c, f)
      }
    }else {
      var c = !!c, g = D;
      d in g || (g[d] = Ta());
      g = g[d];
      c in g || (g[c] = Ta(), g.sc++);
      var g = g[c], h = a[ea] || (a[ea] = ++fa), k;
      g.Fd++;
      if(g[h]) {
        k = g[h];
        for(e = 0;e < k.length;e++) {
          if(g = k[e], g.ge == b && g.Sg == f) {
            if(g.Gd) {
              break
            }
            return
          }
        }
      }else {
        k = g[h] = Va(), g.sc++
      }
      e = Xa();
      e.src = a;
      g = $a();
      g.Ib(b, e, a, d, c, f);
      b = g.key;
      e.key = b;
      k.push(g);
      db[b] = g;
      eb[h] || (eb[h] = Va());
      eb[h].push(g);
      a.addEventListener ? (a == z || !a.Ai) && a.addEventListener(d, e, c) : a.attachEvent(d in fb ? fb[d] : fb[d] = "on" + d, e)
    }
  }else {
    throw Error("Invalid event type");
  }
}
function hb(a, d, b, c) {
  if(!c.Ge && c.hh) {
    for(var f = 0, e = 0;f < c.length;f++) {
      if(c[f].Gd) {
        var g = c[f].lh;
        g.src = q;
        Za(g);
        ab(c[f])
      }else {
        f != e && (c[e] = c[f]), e++
      }
    }
    c.length = e;
    c.hh = !1;
    e == 0 && (Wa(c), delete D[a][d][b], D[a][d].sc--, D[a][d].sc == 0 && (Ua(D[a][d]), delete D[a][d], D[a].sc--), D[a].sc == 0 && (Ua(D[a]), delete D[a]))
  }
}
function ib(a, d, b, c, f) {
  var e = 1, d = d[ea] || (d[ea] = ++fa);
  if(a[d]) {
    a.Fd--;
    a = a[d];
    a.Ge ? a.Ge++ : a.Ge = 1;
    try {
      for(var g = a.length, h = 0;h < g;h++) {
        var k = a[h];
        k && !k.Gd && (e &= jb(k, f) !== !1)
      }
    }finally {
      a.Ge--, hb(b, c, d, a)
    }
  }
  return Boolean(e)
}
function jb(a, d) {
  var b = a.handleEvent(d);
  if(a.Gg) {
    var c = a.key;
    if(db[c]) {
      var f = db[c];
      if(!f.Gd) {
        var e = f.src, g = f.type, h = f.lh, k = f.capture;
        e.removeEventListener ? (e == z || !e.Ai) && e.removeEventListener(g, h, k) : e.detachEvent && e.detachEvent(g in fb ? fb[g] : fb[g] = "on" + g, h);
        e = e[ea] || (e[ea] = ++fa);
        h = D[g][k][e];
        if(eb[e]) {
          var j = eb[e], o = Ga(j, f);
          o >= 0 && Fa.splice.call(j, o, 1);
          j.length == 0 && delete eb[e]
        }
        f.Gd = !0;
        h.hh = !0;
        hb(g, k, e, h);
        delete db[c]
      }
    }
  }
  return b
}
Ya(function(a, d) {
  if(!db[a]) {
    return!0
  }
  var b = db[a], c = b.type, f = D;
  if(!(c in f)) {
    return!0
  }
  var f = f[c], e, g;
  Da === i && (Da = pa && !z.addEventListener);
  if(Da) {
    var h;
    if(!(h = d)) {
      a: {
        h = "window.event".split(".");
        for(var k = z;e = h.shift();) {
          if(k[e] != q) {
            k = k[e]
          }else {
            h = q;
            break a
          }
        }
        h = k
      }
    }
    e = h;
    h = !0 in f;
    k = !1 in f;
    if(h) {
      if(e.keyCode < 0 || e.returnValue != i) {
        return!0
      }
      a: {
        var j = !1;
        if(e.keyCode == 0) {
          try {
            e.keyCode = -1;
            break a
          }catch(o) {
            j = !0
          }
        }
        if(j || e.returnValue == i) {
          e.returnValue = !0
        }
      }
    }
    j = bb();
    j.Ib(e, this);
    e = !0;
    try {
      if(h) {
        for(var n = Va(), s = j.currentTarget;s;s = s.parentNode) {
          n.push(s)
        }
        g = f[!0];
        g.Fd = g.sc;
        for(var p = n.length - 1;!j.Yf && p >= 0 && g.Fd;p--) {
          j.currentTarget = n[p], e &= ib(g, n[p], c, !0, j)
        }
        if(k) {
          g = f[!1];
          g.Fd = g.sc;
          for(p = 0;!j.Yf && p < n.length && g.Fd;p++) {
            j.currentTarget = n[p], e &= ib(g, n[p], c, !1, j)
          }
        }
      }else {
        e = jb(b, j)
      }
    }finally {
      if(n) {
        n.length = 0, Wa(n)
      }
      j.qd();
      cb(j)
    }
    return e
  }
  c = new La(d, this);
  try {
    e = jb(b, c)
  }finally {
    c.qd()
  }
  return e
});
var kb = {61:187, 59:186};
pa || ra && (Ba["525"] || (Ba["525"] = ga(ua, "525") >= 0));
/*
 Copyright (c) 2011, Joseph Spandrusyszyn
 See https://github.com/illandril/Illandril-Game-Engine.
*/
var E = {};
function lb(a) {
  this.id = mb++;
  this.name = a;
  this.controls = {};
  this.bg = {};
  this.Jg = [];
  this.Se = this.ye = q
}
var mb = 0, nb = {}, ob = !1, pb = {}, qb = !1, rb = {}, sb = !1, tb = {};
function ub(a) {
  var d = a.hk, d = qa && a.keyCode in kb ? kb[a.keyCode] : a.keyCode;
  return{keyCode:d, ctrlKey:a.ctrlKey, altKey:a.altKey, shiftKey:a.shiftKey}
}
function vb(a, d, b, c) {
  var f = Ea[a];
  f == q && (f = "KEY[" + a + "]");
  return(d ? "Ctrl + " : "") + (b ? "Alt + " : "") + (c ? "Shift + " : "") + f.toUpperCase()
}
lb.prototype = {ac:function(a, d) {
  var b = 0, c = ob == pb && qb == rb && sb == tb, f;
  for(f in nb) {
    var e = c && nb[f].wh;
    b++;
    var g = vb(f, ob, qb, sb);
    this.ye == q && this.controls[g] != q && (!e || this.controls[g].Li) && this.controls[g].execute(d)
  }
  if(b == 1 && this.ye != q) {
    this.Se != q && clearTimeout(this.Se);
    var h = this;
    this.Se = setTimeout(function() {
      h.Ua(h.ye, g);
      h.ye = q;
      h.Se = q
    }, 100)
  }
}, Ua:function(a, d, b, c, f) {
  var e = d;
  typeof d == "number" && (e = vb(d, b, c, f));
  d = [];
  b = this.controls[e];
  c = this.bg[a.name];
  if(b != q) {
    if(c != q) {
      this.controls[c] = b, this.bg[b.name] = c, d.push(new wb(c, b))
    }else {
      throw"The specified key is already in use for a different function.";
    }
  }else {
    c != q && delete this.controls[c]
  }
  this.controls[e] = a;
  this.bg[a.name] = e;
  d.push(new wb(e, a));
  this.Mj(d)
}, Qi:function() {
  var a = [], d;
  for(d in this.controls) {
    a.push(new wb(d, this.controls[d]))
  }
  return a
}, Mj:function(a) {
  for(var d = 0;d < this.Jg.length;d++) {
    var b = this.Jg[d];
    b.uk.apply(b.ge, a || [], this.Qi())
  }
}};
gb(document, "keydown", function(a) {
  a = ub(a);
  a.keyCode != 16 && a.keyCode != 17 && a.keyCode != 18 && nb[a.keyCode] == q && (nb[a.keyCode] = {wh:!1});
  ob = a.ctrlKey;
  qb = a.altKey;
  sb = a.shiftKey
});
gb(document, "keyup", function(a) {
  a = ub(a);
  delete nb[a.keyCode];
  ob = a.ctrlKey;
  qb = a.altKey;
  sb = a.shiftKey
});
gb(document, "blur", function() {
  nb = {};
  tb = sb = rb = qb = pb = ob = !1
});
function wb(a, d) {
  this.key = this.key = a;
  this.action = this.action = d
}
;function xb(a, d, b) {
  this.execute = a;
  this.name = this.name = d;
  this.Li = b
}
;E = E || {};
function yb() {
  this.ig = []
}
;E.M = {};
E.M.xe = {};
E.M.tf = 0;
E.M.Pj = function(a) {
  if(E.M.xe[a] == q) {
    E.M.tf++, E.M.xe[a] = new Image, E.M.xe[a].onload = E.M.Wi, E.M.xe[a].src = a
  }
};
E.M.Wi = function() {
  E.M.tf--
};
E.M.Xi = function() {
  return E.M.tf > 0
};
E.M.Rg = function(a) {
  if(a.hg === i || a.hg === q) {
    a.hg = {}
  }
  return a.hg
};
function F(a, d) {
  this.x = a;
  this.y = d
}
x = F.prototype;
x.ea = function() {
  this.y = this.x = 0
};
x.j = function(a, d) {
  this.x = a;
  this.y = d
};
x.m = function(a) {
  this.x = a.x;
  this.y = a.y
};
x.Jc = function() {
  return new F(-this.x, -this.y)
};
x.vg = function() {
  this.x = -this.x;
  this.y = -this.y
};
x.Fa = function() {
  return new F(this.x, this.y)
};
x.Md = function(a) {
  this.x += a.x;
  this.y += a.y
};
x.tg = function(a) {
  this.x *= a;
  this.y *= a
};
function zb(a) {
  return a.x * a.x + a.y * a.y
}
function G(a) {
  var d = Math.sqrt(zb(a));
  d < Number.MIN_VALUE || (d = 1 / d, a.x *= d, a.y *= d)
}
;function Ab(a, d, b, c) {
  E.M.Pj(a);
  this.url = a;
  this.ih = d || new F(0, 0);
  this.Ve = b || new F(1, 1);
  this.th = c || new F(1, 1);
  this.lb = new F(1, 1)
}
;function H(a) {
  if(!a) {
    throw"Assertion Failed";
  }
}
var Bb = 2 / 180 * Math.PI, Cb = 8 / 180 * Math.PI, Db = 0.5 * Math.PI, Eb = Db * Db, Fb = 2 / 180 * Math.PI;
function Gb() {
  this.a = new F(0, 0);
  this.b = new F(0, 0);
  this.we()
}
x = Gb.prototype;
x.j = function(a) {
  var d = Math.cos(a), a = Math.sin(a);
  this.a.j(d, a);
  this.b.j(-a, d)
};
x.Fa = function() {
  var a = new Gb;
  a.ld(this);
  return a
};
x.ld = function(a) {
  this.a.m(a.a);
  this.b.m(a.b)
};
x.cf = function(a) {
  this.a.Md(a.a);
  this.b.Md(a.b)
};
x.we = function() {
  this.a.j(1, 0);
  this.b.j(0, 1)
};
x.ea = function() {
  this.a.j(0, 0);
  this.b.j(0, 0)
};
x.Ic = function() {
  return Math.atan2(this.a.y, this.a.x)
};
x.Zd = function(a, d, b) {
  var c = this.a.x * this.b.y - this.b.x * this.a.y;
  c != 0 && (c = 1 / c);
  a.x = c * (this.b.y * d - this.b.x * b);
  a.y = c * (this.a.x * b - this.a.y * d);
  return a
};
function Hb(a, d) {
  return a.x * d.x + a.y * d.y
}
function Ib(a, d) {
  return a.x * d.y - a.y * d.x
}
function Jb(a) {
  return new F(1 * a.y, -1 * a.x)
}
function Kb(a, d) {
  return new F(a.a.x * d.x + a.b.x * d.y, a.a.y * d.x + a.b.y * d.y)
}
function Lb(a, d) {
  return new F(Hb(d, a.a), Hb(d, a.b))
}
function I(a, d) {
  var b = Kb(a.d, d);
  b.x += a.position.x;
  b.y += a.position.y;
  return b
}
function Mb(a, d) {
  var b = J(d, a.position), c = b.x * a.d.a.x + b.y * a.d.a.y;
  b.y = b.x * a.d.b.x + b.y * a.d.b.y;
  b.x = c;
  return b
}
function J(a, d) {
  return new F(a.x - d.x, a.y - d.y)
}
function L(a, d, b) {
  return a < d ? d : a > b ? b : a
}
;function Nb() {
}
;function Ob(a) {
  this.Ra = new Nb;
  this.Sa = new Nb;
  this.Dk = new F(0, 0);
  this.Ek = new F(0, 0);
  H(a.fa != a.ga);
  this.J = a.type;
  this.r = this.pa = q;
  this.Ga = a.fa;
  this.Ha = a.ga;
  this.Xg = a.Ig;
  this.Bd = a.Ec
}
x = Ob.prototype;
x.N = t("J");
x.gd = aa(q);
x.hd = aa(q);
x.Kc = t("Bd");
x.Tb = function() {
  return this.Ga.Tb() && this.Ha.Tb()
};
x.kd = r();
x.Oc = r();
x.gf = r();
x.Nc = aa(!1);
function Pb() {
  this.type = 0;
  this.ga = this.fa = this.Ec = q;
  this.Ig = !1
}
;function Qb() {
}
(function(a) {
  a.prototype.j = function(a) {
    a.nf(this)
  };
  a.prototype.ve = function(a) {
    for(var b = 0, c = this.k[0].x * a.x + this.k[0].y * a.y, f = 1;f < this.t;f++) {
      var e = this.k[f].x * a.x + this.k[f].y * a.y;
      e > c && (b = f, c = e)
    }
    return b
  };
  a.prototype.Sd = function(a) {
    return this.k[this.ve(a)]
  };
  a.prototype.rg = t("t");
  a.prototype.wa = function(a) {
    a === i && (a = 0);
    H(0 <= a && a < this.t);
    return this.k[a]
  }
})(Qb);
function Rb() {
  this.u = new F(0, 0);
  this.sa = new F;
  this.h = new F(0, 0)
}
Rb.prototype.j = function(a) {
  this.u.m(a.u);
  this.sa.m(a.sa);
  this.h.m(a.h);
  this.ob = a.ob;
  this.l = a.l;
  this.ra = a.ra
};
Rb.prototype.Fa = function() {
  var a = new Rb;
  a.u.m(this.u);
  a.sa.m(this.sa);
  a.h.m(this.h);
  a.ob = this.ob;
  a.l = this.l;
  a.ra = this.ra;
  return a
};
Rb.prototype.zb = function(a, d) {
  d === i && (d = 0);
  a.position.x = (1 - d) * this.sa.x + d * this.h.x;
  a.position.y = (1 - d) * this.sa.y + d * this.h.y;
  a.d.j((1 - d) * this.ob + d * this.l);
  var b = a.d;
  a.position.x -= b.a.x * this.u.x + b.b.x * this.u.y;
  a.position.y -= b.a.y * this.u.x + b.b.y * this.u.y
};
Rb.prototype.nc = function(a) {
  a === i && (a = 0);
  if(this.ra < a && 1 - this.ra > Number.MIN_VALUE) {
    var d = (a - this.ra) / (1 - this.ra);
    this.sa.x = (1 - d) * this.sa.x + d * this.h.x;
    this.sa.y = (1 - d) * this.sa.y + d * this.h.y;
    this.ob = (1 - d) * this.ob + d * this.l;
    this.ra = a
  }
};
function M(a, d, b) {
  this.x = a;
  this.y = d;
  this.s = b
}
x = M.prototype;
x.ea = function() {
  this.s = this.y = this.x = 0
};
x.j = function(a, d, b) {
  this.x = a;
  this.y = d;
  this.s = b
};
x.m = function(a) {
  this.x = a.x;
  this.y = a.y;
  this.s = a.s
};
x.Jc = function() {
  return new M(-this.x, -this.y, -this.s)
};
x.vg = function() {
  this.x = -this.x;
  this.y = -this.y;
  this.s = -this.s
};
x.Fa = function() {
  return new M(this.x, this.y, this.s)
};
x.Md = function(a) {
  this.x += a.x;
  this.y += a.y;
  this.s += a.s
};
x.tg = function(a) {
  this.x *= a;
  this.y *= a;
  this.s *= a
};
function Sb(a, d, b) {
  this.a = new M(0, 0, 0);
  this.b = new M(0, 0, 0);
  this.T = new M(0, 0, 0);
  a && this.a.m(a);
  d && this.b.m(d);
  b && this.T.m(b)
}
x = Sb.prototype;
x.Fa = function() {
  return new Sb(this.a, this.b, this.T)
};
x.ld = function(a) {
  this.a.m(a.a);
  this.b.m(a.b);
  this.T.m(a.T)
};
x.cf = function(a) {
  this.a.x += a.a.x;
  this.a.y += a.a.y;
  this.a.s += a.a.s;
  this.b.x += a.b.x;
  this.b.y += a.b.y;
  this.b.s += a.b.s;
  this.T.x += a.T.x;
  this.T.y += a.T.y;
  this.T.s += a.T.s
};
x.we = function() {
  this.a.j(1, 0, 0);
  this.b.j(0, 1, 0);
  this.T.j(0, 0, 1)
};
x.ea = function() {
  this.a.j(0, 0, 0);
  this.b.j(0, 0, 0);
  this.T.j(0, 0, 0)
};
function Tb(a, d, b, c) {
  var f = a.a.x, e = a.b.x, g = a.a.y, a = a.b.y, h = f * a - e * g;
  h != 0 && (h = 1 / h);
  d.x = h * (a * b - e * c);
  d.y = h * (f * c - g * b)
}
function Ub(a, d, b, c, f) {
  var e = a.a.x, g = a.a.y, h = a.a.s, k = a.b.x, j = a.b.y, o = a.b.s, n = a.T.x, s = a.T.y, a = a.T.s, p = e * (j * a - o * s) + g * (o * n - k * a) + h * (k * s - j * n);
  p != 0 && (p = 1 / p);
  d.x = p * (b * (j * a - o * s) + c * (o * n - k * a) + f * (k * s - j * n));
  d.y = p * (e * (c * a - f * s) + g * (f * n - b * a) + h * (b * s - c * n));
  d.s = p * (e * (j * f - o * c) + g * (o * b - k * f) + h * (k * c - j * b))
}
;function Vb() {
}
;function Wb(a) {
  Ob.call(this, a);
  this.wc = new F(0, 0);
  this.xc = new F(0, 0);
  this.v = new M;
  this.n = new Sb;
  this.wc.m(a.vd);
  this.xc.m(a.wd);
  this.Le = a.oe;
  this.v.ea()
}
A(Wb, Ob);
x = Wb.prototype;
x.gd = function() {
  return Xb(this.Ga, this.wc)
};
x.hd = function() {
  return Xb(this.Ha, this.xc)
};
x.kd = function(a) {
  var d, b = 0, c = this.Ga, f = this.Ha;
  d = c.i.d;
  var e = this.wc.x - c.c.u.x, g = this.wc.y - c.c.u.y, b = d.a.x * e + d.b.x * g, g = d.a.y * e + d.b.y * g, e = b;
  d = f.i.d;
  var h = this.xc.x - f.c.u.x, k = this.xc.y - f.c.u.y, b = d.a.x * h + d.b.x * k, k = d.a.y * h + d.b.y * k, h = b;
  d = c.z;
  var b = f.z, j = c.O, o = f.O;
  this.n.a.x = d + b + g * g * j + k * k * o;
  this.n.b.x = -g * e * j - k * h * o;
  this.n.T.x = -g * j - k * o;
  this.n.a.y = this.n.b.x;
  this.n.b.y = d + b + e * e * j + h * h * o;
  this.n.T.y = e * j + h * o;
  this.n.a.s = this.n.T.x;
  this.n.b.s = this.n.T.y;
  this.n.T.s = j + o;
  a.Ld ? (this.v.x *= a.Zb, this.v.y *= a.Zb, this.v.s *= a.Zb, c.q.x -= d * this.v.x, c.q.y -= d * this.v.y, c.G -= j * (e * this.v.y - g * this.v.x + this.v.s), f.q.x += b * this.v.x, f.q.y += b * this.v.y, f.G += o * (h * this.v.y - k * this.v.x + this.v.s)) : this.v.ea()
};
x.Oc = function() {
  var a, d = 0, b = this.Ga, c = this.Ha, f = b.q, e = b.G, g = c.q, h = c.G, k = b.z, j = c.z, o = b.O, n = c.O;
  a = b.i.d;
  var s = this.wc.x - b.c.u.x, p = this.wc.y - b.c.u.y, d = a.a.x * s + a.b.x * p, p = a.a.y * s + a.b.y * p, s = d;
  a = c.i.d;
  var v = this.xc.x - c.c.u.x, u = this.xc.y - c.c.u.y, d = a.a.x * v + a.b.x * u, u = a.a.y * v + a.b.y * u, v = d;
  a = new M(0, 0, 0);
  Ub(this.n, a, -(g.x - h * u - f.x + e * p), -(g.y + h * v - f.y - e * s), -(h - e));
  this.v.Md(a);
  f.x -= k * a.x;
  f.y -= k * a.y;
  e -= o * (s * a.y - p * a.x + a.s);
  g.x += j * a.x;
  g.y += j * a.y;
  h += n * (v * a.y - u * a.x + a.s);
  b.G = e;
  c.G = h
};
x.Nc = function() {
  var a, d = 0, b = this.Ga, c = this.Ha;
  a = b.i.d;
  var f = this.wc.x - b.c.u.x, e = this.wc.y - b.c.u.y, d = a.a.x * f + a.b.x * e, e = a.a.y * f + a.b.y * e, f = d;
  a = c.i.d;
  var g = this.xc.x - c.c.u.x, h = this.xc.y - c.c.u.y, d = a.a.x * g + a.b.x * h, h = a.a.y * g + a.b.y * h, g = d;
  a = b.z;
  var d = c.z, k = b.O, j = c.O, o = c.c.h.x + g - b.c.h.x - f, n = c.c.h.y + h - b.c.h.y - e, s = c.c.l - b.c.l - this.Le, p = Math.sqrt(o * o + n * n), v = Math.abs(s);
  p > 0.05 && (k *= 1, j *= 1);
  this.n.a.x = a + d + e * e * k + h * h * j;
  this.n.b.x = -e * f * k - h * g * j;
  this.n.T.x = -e * k - h * j;
  this.n.a.y = this.n.b.x;
  this.n.b.y = a + d + f * f * k + g * g * j;
  this.n.T.y = f * k + g * j;
  this.n.a.s = this.n.T.x;
  this.n.b.s = this.n.T.y;
  this.n.T.s = k + j;
  var u = new M(0, 0, 0);
  Ub(this.n, u, -o, -n, -s);
  b.c.h.x -= a * u.x;
  b.c.h.y -= a * u.y;
  b.c.l -= k * (f * u.y - e * u.x + u.s);
  c.c.h.x += d * u.x;
  c.c.h.y += d * u.y;
  c.c.l += j * (g * u.y - h * u.x + u.s);
  O(b);
  O(c);
  return p <= 0.005 && v <= Bb
};
function Yb() {
  Pb.call(this);
  this.vd = new F(0, 0);
  this.wd = new F(0, 0);
  this.type = 8;
  this.oe = 0
}
A(Yb, Pb);
Yb.prototype.xa = function(a, d, b) {
  this.fa = a;
  this.ga = d;
  this.vd.m(Mb(this.fa.i, b));
  this.wd.m(Mb(this.ga.i, b));
  this.oe = this.ga.Ic() - this.fa.Ic()
};
Yb.prototype.Gc = function() {
  return new Wb(this)
};
function Zb() {
}
Zb.prototype.j = function(a) {
  this.Ea.m(a.Ea);
  this.yb.m(a.yb);
  this.va.m(a.va);
  this.l = a.l;
  this.ha = a.ha;
  this.ia = a.ia
};
function $b(a) {
  return a.t == 1 ? 0 : a.t == 2 ? Math.sqrt(zb(J(a.Q.va, a.Z.va))) : a.t == 3 ? Ib(J(a.Z.va, a.Q.va), J(a.cb.va, a.Q.va)) : (H(!1), 0)
}
;function ac() {
}
(function(a) {
  a.og = function(d, b, c) {
    var f = a.F, e = c.jb, g = c.Ze, h = c.kb, k = c.$e;
    H(0 <= b.count && b.count <= 3);
    var j, o;
    f.t = b.count;
    for(var n = f.k, s = 0;s < f.t;s++) {
      var p = n[s];
      p.ha = b.ha[s];
      p.ia = b.ia[s];
      j = e.wa(p.ha);
      o = h.wa(p.ia);
      p.Ea = I(g, j);
      p.yb = I(k, o);
      p.va = J(p.yb, p.Ea);
      p.l = 0
    }
    if(f.t > 1 && (j = b.Cj, o = $b(f), o < 0.5 * j || 2 * j < o || o < Number.MIN_VALUE)) {
      f.t = 0
    }
    if(f.t == 0) {
      p = n[0], p.ha = 0, p.ia = 0, j = e.wa(0), o = h.wa(0), p.Ea = I(g, j), p.yb = I(k, o), p.va = J(p.yb, p.Ea), f.t = 1
    }
    (a.F.t < 1 || a.F.t > 3) && H(!1);
    for(f = 0;f < 20;) {
      e = [];
      for(g = 0;g < a.F.t;g++) {
        e[g] = {}, e[g].ha = a.F.k[g].ha, e[g].ia = a.F.k[g].ia
      }
      if(a.F.t == 2) {
        g = a.F, h = g.Q.va, k = g.Z.va, n = J(k, h), h = -(h.x * n.x + h.y * n.y), h <= 0 ? (g.Q.l = 1, g.t = 1) : (k = k.x * n.x + k.y * n.y, k <= 0 ? (g.Z.l = 1, g.t = 1, g.Q.j(g.Z)) : (n = 1 / (k + h), g.Q.l = k * n, g.Z.l = h * n, g.t = 2))
      }else {
        if(a.F.t == 3) {
          var g = a.F, p = g.Q.va, v = g.Z.va, u = g.cb.va, w = J(v, p), h = Hb(v, w), k = -Hb(p, w), y = J(u, p), n = Hb(u, y);
          j = -Hb(p, y);
          s = J(u, v);
          o = Hb(u, s);
          s = -Hb(v, s);
          y = Ib(w, y);
          w = y * Ib(v, u);
          u = y * Ib(u, p);
          p = y * Ib(p, v);
          k <= 0 && j <= 0 ? (g.Q.l = 1, g.t = 1) : h > 0 && k > 0 && p <= 0 ? (n = 1 / (h + k), g.Q.l = h * n, g.Z.l = k * n, g.t = 2) : n > 0 && j > 0 && u <= 0 ? (h = 1 / (n + j), g.Q.l = n * h, g.cb.l = j * h, g.t = 2, g.Z.j(g.cb)) : h <= 0 && s <= 0 ? (g.Z.l = 1, g.t = 1, g.Q.j(g.Z)) : n <= 0 && o <= 0 ? (g.cb.l = 1, g.t = 1, g.Q.j(g.cb)) : o > 0 && s > 0 && w <= 0 ? (h = 1 / (o + s), g.Z.l = o * h, g.cb.l = s * h, g.t = 2, g.Q.j(g.cb)) : (h = 1 / (w + u + p), g.Q.l = w * h, g.Z.l = u * h, g.cb.l = 
          p * h, g.t = 3)
        }
      }
      if(a.F.t == 3) {
        break
      }
      g = a.F;
      g.t == 1 ? g = g.Q.va.Jc() : g.t == 2 ? (h = J(g.Z.va, g.Q.va), g = Ib(h, g.Q.va.Jc()) > 0 ? new F(-1 * h.y, 1 * h.x) : Jb(h)) : (H(!1), g = new F(0, 0));
      if(zb(g) < bc) {
        break
      }
      a.F.k[a.F.t].ha = c.jb.ve(Lb(c.Ze.d, g.Jc()));
      a.F.k[a.F.t].Ea = I(c.Ze, c.jb.wa(a.F.k[a.F.t].ha));
      a.F.k[a.F.t].ia = c.kb.ve(Lb(c.$e.d, g));
      a.F.k[a.F.t].yb = I(c.$e, c.kb.wa(a.F.k[a.F.t].ia));
      a.F.k[a.F.t].va = J(a.F.k[a.F.t].yb, a.F.k[a.F.t].Ea);
      f++;
      h = !1;
      for(g = 0;g < e.length;g++) {
        if(a.F.k[a.F.t].ha == e[g].ha && a.F.k[a.F.t].ia == e[g].ia) {
          h = !0;
          break
        }
      }
      if(h) {
        break
      }
      a.F.t++
    }
    e = a.F;
    g = d.kc;
    h = d.lc;
    e.t == 1 ? (g.m(e.Q.Ea), h.m(e.Q.yb)) : e.t == 2 ? (g.x = e.Q.l * e.Q.Ea.x + e.Z.l * e.Z.Ea.x, g.y = e.Q.l * e.Q.Ea.y + e.Z.l * e.Z.Ea.y, h.x = e.Q.l * e.Q.yb.x + e.Z.l * e.Z.yb.x, h.y = e.Q.l * e.Q.yb.y + e.Z.l * e.Z.yb.y) : e.t == 3 ? (h.x = g.x = e.Q.l * e.Q.Ea.x + e.Z.l * e.Z.Ea.x + e.cb.l * e.cb.Ea.x, h.y = g.y = e.Q.l * e.Q.Ea.y + e.Z.l * e.Z.Ea.y + e.cb.l * e.cb.Ea.y) : H(!1);
    d.sd = Math.sqrt(zb(J(d.kc, d.lc)));
    d.zk = f;
    f = a.F;
    b.Cj = $b(f);
    b.count = f.t;
    e = f.k;
    for(g = 0;g < f.t;g++) {
      b.ha[g] = e[g].ha, b.ia[g] = e[g].ia
    }
    if(c.uh) {
      b = c.jb.P, c = c.kb.P, d.sd > b + c && d.sd > Number.MIN_VALUE ? (d.sd -= b + c, f = J(d.lc, d.kc), G(f), d.kc.x += b * f.x, d.kc.y += b * f.y, d.lc.x -= c * f.x, d.lc.y -= c * f.y) : (c = new F, c.x = 0.5 * (d.kc.x + d.lc.x), c.y = 0.5 * (d.kc.y + d.lc.y), d.kc.x = d.lc.x = c.x, d.kc.y = d.lc.y = c.y, d.sd = 0)
    }
  }
})(ac);
ac.F = new function() {
  this.Q = new Zb;
  this.Z = new Zb;
  this.cb = new Zb;
  this.k = [this.Q, this.Z, this.cb]
};
function cc() {
}
;function dc() {
  this.kc = new F;
  this.lc = new F
}
;function ec() {
  this.ha = [0, 0, 0];
  this.ia = [0, 0, 0]
}
;function P() {
  this.J = P.Gi;
  this.P = 0.005
}
x = P.prototype;
x.Fa = aa(q);
x.j = function(a) {
  this.P = a.P
};
x.N = t("J");
x.Od = r();
x.df = r();
x.nf = function() {
  H(!1)
};
P.Vb = function(a, d, b, c) {
  var f = new cc;
  f.jb = new Qb;
  f.jb.j(a);
  f.kb = new Qb;
  f.kb.j(b);
  f.Ze = d;
  f.$e = c;
  f.uh = !0;
  a = new ec;
  a.count = 0;
  d = new dc;
  ac.og(d, a, f);
  return d.sd < 10 * Number.MIN_VALUE
};
P.Gi = -1;
P.Sc = 0;
P.tc = 1;
P.Be = 2;
P.qk = -1;
P.pk = 0;
P.ok = 1;
function fc(a) {
  P.call(this);
  this.J = P.Sc;
  this.P = a;
  this.X = new F(0, 0)
}
A(fc, P);
x = fc.prototype;
x.Fa = function() {
  var a = new fc;
  a.j(this);
  return a
};
x.j = function(a) {
  P.prototype.j.call(this, a);
  a instanceof fc && this.X.m(a.X)
};
x.Od = function(a, d) {
  var b = d.d, c = d.position.x + (b.a.x * this.X.x + b.b.x * this.X.y), b = d.position.y + (b.a.y * this.X.x + b.b.y * this.X.y);
  a.lowerBound.j(c - this.P, b - this.P);
  a.upperBound.j(c + this.P, b + this.P)
};
x.df = function(a, d) {
  a.Bc = d * Math.PI * this.P * this.P;
  a.Pc.m(this.X);
  a.Td = a.Bc * (0.5 * this.P * this.P + (this.X.x * this.X.x + this.X.y * this.X.y))
};
x.nf = function(a) {
  a.k = [this.X];
  a.t = 1;
  a.P = this.P
};
function gc() {
  this.lowerBound = new F;
  this.upperBound = new F
}
function hc(a) {
  return new F((a.lowerBound.x + a.upperBound.x) / 2, (a.lowerBound.y + a.upperBound.y) / 2)
}
function ic(a, d) {
  var b;
  return b = (b = (b = (b = a.lowerBound.x <= d.lowerBound.x) && a.lowerBound.y <= d.lowerBound.y) && d.upperBound.x <= a.upperBound.x) && d.upperBound.y <= a.upperBound.y
}
gc.prototype.Vb = function(a) {
  return a.lowerBound.x - this.upperBound.x > 0 ? !1 : a.lowerBound.y - this.upperBound.y > 0 ? !1 : this.lowerBound.x - a.upperBound.x > 0 ? !1 : this.lowerBound.y - a.upperBound.y > 0 ? !1 : !0
};
function jc(a, d, b) {
  a.lowerBound.x = Math.min(d.lowerBound.x, b.lowerBound.x);
  a.lowerBound.y = Math.min(d.lowerBound.y, b.lowerBound.y);
  a.upperBound.x = Math.max(d.upperBound.x, b.upperBound.x);
  a.upperBound.y = Math.max(d.upperBound.y, b.upperBound.y)
}
;function kc() {
  this.C = new gc
}
;function lc() {
  if(this.constructor === lc) {
    this.Ob = q, this.pj = this.Fk = 0
  }
}
x = lc.prototype;
x.Pd = function(a, d) {
  var b = new kc;
  b.C.lowerBound.x = a.lowerBound.x - 0.1;
  b.C.lowerBound.y = a.lowerBound.y - 0.1;
  b.C.upperBound.x = a.upperBound.x + 0.1;
  b.C.upperBound.y = a.upperBound.y + 0.1;
  b.Ec = d;
  mc(this, b);
  return b
};
x.Qd = function(a) {
  nc(this, a)
};
x.lf = function(a, d, b) {
  H(a.Ya == q);
  if(ic(a.C, d)) {
    return!1
  }
  nc(this, a);
  var c = 0.1 + 2 * Math.abs(b.x), b = 0.1 + 2 * Math.abs(b.y);
  a.C.lowerBound.x = d.lowerBound.x - c;
  a.C.lowerBound.y = d.lowerBound.y - b;
  a.C.upperBound.x = d.upperBound.x + c;
  a.C.upperBound.y = d.upperBound.y + b;
  mc(this, a);
  return!0
};
x.jd = function(a) {
  return a.C
};
x.Kc = function(a) {
  return a.Ec
};
x.mf = function(a, d) {
  if(this.Ob !== q) {
    var b = [];
    for(b.push(this.Ob);b.length > 0;) {
      var c = b.pop();
      if(c.C.Vb(d)) {
        if(c.Ya == q) {
          if(!a(c)) {
            break
          }
        }else {
          b.push(c.Ya), b.push(c.rc)
        }
      }
    }
  }
};
function mc(a, d) {
  a.pj++;
  if(a.Ob === q) {
    a.Ob = d, a.Ob.parent = q
  }else {
    for(var b = hc(d.C), c = a.Ob;c.Ya != q;) {
      var f = c.Ya, c = c.rc, c = Math.abs((f.C.lowerBound.x + f.C.upperBound.x) / 2 - b.x) + Math.abs((f.C.lowerBound.y + f.C.upperBound.y) / 2 - b.y) < Math.abs((c.C.lowerBound.x + c.C.upperBound.x) / 2 - b.x) + Math.abs((c.C.lowerBound.y + c.C.upperBound.y) / 2 - b.y) ? f : c
    }
    b = c.parent;
    f = new kc;
    f.parent = b;
    f.Ec = q;
    jc(f.C, d.C, c.C);
    if(b) {
      c.parent.Ya == c ? b.Ya = f : b.rc = f;
      f.Ya = c;
      f.rc = d;
      c.parent = f;
      for(d.parent = f;b;) {
        if(ic(b.C, f.C)) {
          break
        }
        jc(b.C, b.Ya.C, b.rc.C);
        f = b;
        b = b.parent
      }
    }else {
      f.Ya = c, f.rc = d, c.parent = f, d.parent = f, a.Ob = f
    }
  }
}
function nc(a, d) {
  if(d == a.Ob) {
    a.Ob = q
  }else {
    var b = d.parent, c = b.parent, f;
    f = b.Ya == d ? b.rc : b.Ya;
    if(c) {
      c.Ya == b ? c.Ya = f : c.rc = f;
      for(f.parent = c;c;) {
        b = c.C;
        f = c;
        var e = new gc;
        jc(e, c.Ya.C, c.rc.C);
        f.C = e;
        if(ic(b, c.C)) {
          break
        }
        c = c.parent
      }
    }else {
      a.Ob = f, f.parent = q
    }
  }
}
;var Q = !(Object.prototype.defineProperty instanceof Function) && Object.prototype.__defineGetter__ instanceof Function && Object.prototype.__defineSetter__ instanceof Function ? function(a, d, b) {
  b.get instanceof Function && a.__defineGetter__(d, b.get);
  b.set instanceof Function && a.__defineSetter__(d, b.set)
} : Object.defineProperty;
function oc(a, d) {
  return function() {
    d.apply(a, arguments)
  }
}
;function pc() {
}
Q(pc.prototype, "referenceEdge", {enumerable:!1, configurable:!0, get:t("xf")});
Q(pc.prototype, "referenceEdge", {enumerable:!1, configurable:!0, set:function(a) {
  a === i && (a = 0);
  this.xf = a;
  this.qc.Xa = this.qc.Xa & 4294967040 | this.xf & 255
}});
Q(pc.prototype, "incidentEdge", {enumerable:!1, configurable:!0, get:t("uf")});
Q(pc.prototype, "incidentEdge", {enumerable:!1, configurable:!0, set:function(a) {
  a === i && (a = 0);
  this.uf = a;
  this.qc.Xa = this.qc.Xa & 4294902015 | this.uf << 8 & 65280
}});
Q(pc.prototype, "incidentVertex", {enumerable:!1, configurable:!0, get:t("vf")});
Q(pc.prototype, "incidentVertex", {enumerable:!1, configurable:!0, set:function(a) {
  a === i && (a = 0);
  this.vf = a;
  this.qc.Xa = this.qc.Xa & 4278255615 | this.vf << 16 & 16711680
}});
Q(pc.prototype, "flip", {enumerable:!1, configurable:!0, get:t("rf")});
Q(pc.prototype, "flip", {enumerable:!1, configurable:!0, set:function(a) {
  a === i && (a = 0);
  this.rf = a;
  this.qc.Xa = this.qc.Xa & 16777215 | this.rf << 24 & 4278190080
}});
function qc() {
  this.rb = new pc;
  this.constructor === qc && this.qi.apply(this, arguments)
}
(function(a) {
  a.prototype.qi = function() {
    this.rb.qc = this
  };
  a.prototype.j = function(a) {
    this.key = a.Xa
  };
  a.prototype.Fa = function() {
    var d = new a;
    d.key = this.key;
    return d
  };
  Q(a.prototype, "key", {enumerable:!1, configurable:!0, get:t("Xa"), set:function(a) {
    a === i && (a = 0);
    this.Xa = a;
    this.rb.xf = this.Xa & 255;
    this.rb.uf = (this.Xa & 65280) >> 8 & 255;
    this.rb.vf = (this.Xa & 16711680) >> 16 & 255;
    this.rb.rf = (this.Xa & 4278190080) >> 24 & 255
  }})
})(qc);
function rc() {
  this.mb = new F(0, 0);
  this.id = new qc
}
rc.prototype.j = function(a) {
  this.mb.m(a.mb);
  this.id.j(a.id)
};
function sc() {
  this.B = new F(0, 0);
  this.gc = new qc;
  this.constructor === sc && this.na()
}
sc.prototype.na = function() {
  this.B.ea();
  this.ad = this.Zc = 0;
  this.gc.key = 0
};
sc.prototype.j = function(a) {
  this.B.m(a.B);
  this.Zc = a.Zc;
  this.ad = a.ad;
  this.gc.j(a.gc)
};
function R() {
  this.da = 0;
  if(this.constructor === R) {
    this.A = [];
    for(var a = 0;a < 2;a++) {
      this.A[a] = new sc
    }
    this.ua = new F(0, 0);
    this.B = new F(0, 0)
  }
}
R.prototype.na = function() {
  for(var a = 0;a < 2;a++) {
    this.A[a].na()
  }
  this.ua.ea();
  this.B.ea();
  this.da = this.J = 0
};
R.prototype.j = function(a) {
  this.da = a.da;
  for(var d = 0;d < 2;d++) {
    this.A[d].j(a.A[d])
  }
  this.ua.m(a.ua);
  this.B.m(a.B);
  this.J = a.J
};
R.prototype.Fa = function() {
  var a = new R;
  a.j(this);
  return a
};
R.Gf = 1;
R.Tc = 2;
R.Hf = 4;
function S() {
}
(function(a) {
  a.kg = function(a, b, c, f) {
    f === i && (f = 0);
    var e = 0, g = b[0].mb, h = b[1].mb, k = c.x * g.x + c.y * g.y - f, c = c.x * h.x + c.y * h.y - f;
    k <= 0 && a[e++].j(b[0]);
    c <= 0 && a[e++].j(b[1]);
    if(k * c < 0) {
      c = k / (k - c), f = a[e].mb, f.x = g.x + c * (h.x - g.x), f.y = g.y + c * (h.y - g.y), a[e].id = k > 0 ? b[0].id : b[1].id, e++
    }
    return e
  };
  a.ue = function(a, b, c, f, e) {
    c === i && (c = 0);
    for(var g = a.k, h = a.ca, a = f.k, k = b.d.a.x * h[c].x + b.d.b.x * h[c].y, h = b.d.a.y * h[c].x + b.d.b.y * h[c].y, j = e.d.a.x * k + e.d.a.y * h, o = e.d.b.x * k + e.d.b.y * h, n = 0, s = Number.MAX_VALUE, p = 0;p < f.Y;++p) {
      var v = a[p].x * j + a[p].y * o;
      v < s && (s = v, n = p)
    }
    return(e.position.x + (e.d.a.x * a[n].x + e.d.b.x * a[n].y) - (b.position.x + (b.d.a.x * g[c].x + b.d.b.x * g[c].y))) * k + (e.position.y + (e.d.a.y * a[n].x + e.d.b.y * a[n].y) - (b.position.y + (b.d.a.y * g[c].x + b.d.b.y * g[c].y))) * h
  };
  a.pg = function(d, b, c, f, e) {
    var g = b.ca, h = e.position.x + (e.d.a.x * f.vb.x + e.d.b.x * f.vb.y), k = e.position.y + (e.d.a.y * f.vb.x + e.d.b.y * f.vb.y);
    h -= c.position.x + (c.d.a.x * b.vb.x + c.d.b.x * b.vb.y);
    k -= c.position.y + (c.d.a.y * b.vb.x + c.d.b.y * b.vb.y);
    for(var j = h * c.d.a.x + k * c.d.a.y, k = h * c.d.b.x + k * c.d.b.y, h = 0, o = -Number.MAX_VALUE, n = 0;n < b.Y;++n) {
      var s = g[n].x * j + g[n].y * k;
      s > o && (o = s, h = n)
    }
    g = a.ue(b, c, h, f, e);
    j = h - 1;
    j < 0 && (j = b.Y - 1);
    k = a.ue(b, c, j, f, e);
    o = h + 1;
    o >= b.Y && (o = 0);
    var n = a.ue(b, c, o, f, e), p = s = 0, v = 0;
    if(k > g && k > n) {
      v = -1, s = j, p = k
    }else {
      if(n > g) {
        v = 1, s = o, p = n
      }else {
        return d[0] = h, g
      }
    }
    for(;;) {
      if(v == -1 ? (h = s - 1, h < 0 && (h = b.Y - 1)) : (h = s + 1, h >= b.Y && (h = 0)), g = a.ue(b, c, h, f, e), g > p) {
        s = h, p = g
      }else {
        break
      }
    }
    d[0] = s;
    return p
  };
  a.Lh = function(a, b, c, f, e, g) {
    f === i && (f = 0);
    for(var h = c.d.a.x * b.ca[f].x + c.d.b.x * b.ca[f].y, b = c.d.a.y * b.ca[f].x + c.d.b.y * b.ca[f].y, c = g.d.a.x * h + g.d.a.y * b, b = g.d.b.x * h + g.d.b.y * b, h = c, c = 0, k = Number.MAX_VALUE, j = 0;j < e.Y;j++) {
      var o = h * e.ca[j].x + b * e.ca[j].y;
      o < k && (k = o, c = j)
    }
    h = c + 1;
    h >= e.Y && (h = 0);
    a[0].mb.x = g.position.x + (g.d.a.x * e.k[c].x + g.d.b.x * e.k[c].y);
    a[0].mb.y = g.position.y + (g.d.a.y * e.k[c].x + g.d.b.y * e.k[c].y);
    a[0].id.rb.Qj = f;
    a[0].id.rb.Yi = c;
    a[0].id.rb.Zi = 0;
    a[1].mb.x = g.position.x + (g.d.a.x * e.k[h].x + g.d.b.x * e.k[h].y);
    a[1].mb.y = g.position.y + (g.d.a.y * e.k[h].x + g.d.b.y * e.k[h].y);
    a[1].id.rb.Qj = f;
    a[1].id.rb.Yi = h;
    a[1].id.rb.Zi = 1
  };
  a.kf = function() {
    return[new rc, new rc]
  };
  a.Bh = function(d, b, c, f, e) {
    d.da = 0;
    var g = b.P + f.P;
    a.cg[0] = 0;
    var h = a.pg(a.cg, b, c, f, e);
    if(!(h > g)) {
      a.dg[0] = 0;
      var k = a.pg(a.dg, f, e, b, c);
      if(!(k > g)) {
        var j = b, o = f, n = c, s = e, p = a.cg[0], v = 0;
        d.J = R.Tc;
        if(k > 0.98 * h + 0.001) {
          j = f, o = b, n = e, s = c, p = a.dg[0], d.J = R.Hf, v = 1
        }
        b = a.Tj;
        a.Lh(b, j, n, p, o, s);
        o = j.k[p];
        j = p + 1 < j.Y ? j.k[p + 1] : j.k[0];
        a.Cc.j(j.x - o.x, j.y - o.y);
        G(a.Cc);
        a.eg.x = a.Cc.y;
        a.eg.y = -a.Cc.x;
        a.ph.j(0.5 * (o.x + j.x), 0.5 * (o.y + j.y));
        a.Eb.x = n.d.a.x * a.Cc.x + n.d.b.x * a.Cc.y;
        a.Eb.y = n.d.a.y * a.Cc.x + n.d.b.y * a.Cc.y;
        a.fg.x = -a.Eb.x;
        a.fg.y = -a.Eb.y;
        a.Id.x = a.Eb.y;
        a.Id.y = -a.Eb.x;
        a.Jd.x = n.position.x + (n.d.a.x * o.x + n.d.b.x * o.y);
        a.Jd.y = n.position.y + (n.d.a.y * o.x + n.d.b.y * o.y);
        a.Te.x = n.position.x + (n.d.a.x * j.x + n.d.b.x * j.y);
        a.Te.y = n.position.y + (n.d.a.y * j.x + n.d.b.y * j.y);
        if(!(a.kg(a.oh, b, a.fg, -a.Eb.x * a.Jd.x - a.Eb.y * a.Jd.y + g) < 2) && !(a.kg(a.Hd, a.oh, a.Eb, a.Eb.x * a.Te.x + a.Eb.y * a.Te.y + g) < 2)) {
          d.ua.m(a.eg);
          d.B.m(a.ph);
          n = a.Id.x * a.Jd.x + a.Id.y * a.Jd.y;
          for(p = j = 0;p < 2;++p) {
            if(a.Id.x * a.Hd[p].mb.x + a.Id.y * a.Hd[p].mb.y - n <= g) {
              o = a.Hd[p].mb.x - s.position.x, b = a.Hd[p].mb.y - s.position.y, d.A[j].B.x = o * s.d.a.x + b * s.d.a.y, d.A[j].B.y = o * s.d.b.x + b * s.d.b.y, d.A[j].gc.j(a.Hd[p].id), d.A[j].gc.rb.tk = v, j++
            }
          }
          d.da = j
        }
      }
    }
  };
  a.zh = function(a, b, c, f, e) {
    a.da = 0;
    var g = e.position.x + (e.d.a.x * f.X.x + e.d.b.x * f.X.y) - (c.position.x + (c.d.a.x * b.X.x + c.d.b.x * b.X.y)), c = e.position.y + (e.d.a.y * f.X.x + e.d.b.y * f.X.y) - (c.position.y + (c.d.a.y * b.X.x + c.d.b.y * b.X.y)), e = b.P + f.P;
    if(!(g * g + c * c > e * e)) {
      a.J = R.Gf, a.B.m(b.X), a.ua.ea(), a.da = 1, a.A[0].B.m(f.X), a.A[0].gc.key = 0
    }
  };
  a.Ah = function(a, b, c, f, e) {
    a.da = 0;
    for(var g = e.position.x + (e.d.a.x * f.X.x + e.d.b.x * f.X.y) - c.position.x, h = e.position.y + (e.d.a.y * f.X.x + e.d.b.y * f.X.y) - c.position.y, e = g * c.d.a.x + h * c.d.a.y, c = g * c.d.b.x + h * c.d.b.y, g = 0, h = -Number.MAX_VALUE, k = b.P + f.P, j = 0;j < b.Y;++j) {
      var o = b.ca[j].x * (e - b.k[j].x) + b.ca[j].y * (c - b.k[j].y);
      if(o > k) {
        return
      }
      o > h && (h = o, g = j)
    }
    o = g + 1;
    o >= b.Y && (o = 0);
    var j = b.k[g], n = b.k[o];
    if(h < Number.MIN_VALUE) {
      a.da = 1, a.J = R.Tc, a.ua.m(b.ca[g]), a.B.x = 0.5 * (j.x + n.x), a.B.y = 0.5 * (j.y + n.y)
    }else {
      if((e - j.x) * (n.x - j.x) + (c - j.y) * (n.y - j.y) <= 0) {
        if((e - j.x) * (e - j.x) + (c - j.y) * (c - j.y) > k * k) {
          return
        }
        a.da = 1;
        a.J = R.Tc;
        a.ua.x = e - j.x;
        a.ua.y = c - j.y;
        G(a.ua);
        a.B.m(j)
      }else {
        if((e - n.x) * (j.x - n.x) + (c - n.y) * (j.y - n.y) <= 0) {
          if((e - n.x) * (e - n.x) + (c - n.y) * (c - n.y) > k * k) {
            return
          }
          a.da = 1;
          a.J = R.Tc;
          a.ua.x = e - n.x;
          a.ua.y = c - n.y;
          G(a.ua);
          a.B.m(n)
        }else {
          o = 0.5 * (j.x + n.x);
          j = 0.5 * (j.y + n.y);
          h = (e - o) * b.ca[g].x + (c - j) * b.ca[g].y;
          if(h > k) {
            return
          }
          a.da = 1;
          a.J = R.Tc;
          a.ua.x = b.ca[g].x;
          a.ua.y = b.ca[g].y;
          G(a.ua);
          a.B.j(o, j)
        }
      }
    }
    a.A[0].B.m(f.X);
    a.A[0].gc.key = 0
  };
  a.Vb = function(a, b) {
    return b.lowerBound.x - a.upperBound.x > 0 ? !1 : b.lowerBound.y - a.upperBound.y > 0 ? !1 : a.lowerBound.x - b.upperBound.x > 0 ? !1 : a.lowerBound.y - b.upperBound.y > 0 ? !1 : !0
  }
})(S);
S.Tj = S.kf();
S.oh = S.kf();
S.Hd = S.kf();
S.cg = [0];
S.dg = [0];
S.Cc = new F;
S.eg = new F;
S.ph = new F;
S.Id = new F;
S.Eb = new F;
S.fg = new F;
S.Jd = new F;
S.Te = new F;
function tc() {
  this.B = new F(0, 0);
  this.ta = new F(0, 0)
}
tc.prototype.xa = function(a, d, b, c, f) {
  this.zc = d;
  this.Ac = c;
  var e = a.count;
  H(0 < e && e < 3);
  var g, h, k, j, o = j = k = c = d = 0, n = 0, o = 0;
  e == 1 ? (this.J = uc, g = this.zc.wa(a.ha[0]), h = this.Ac.wa(a.ia[0]), e = g, a = b.d, d = b.position.x + (a.a.x * e.x + a.b.x * e.y), c = b.position.y + (a.a.y * e.x + a.b.y * e.y), e = h, a = f.d, k = f.position.x + (a.a.x * e.x + a.b.x * e.y), j = f.position.y + (a.a.y * e.x + a.b.y * e.y), this.ta.x = k - d, this.ta.y = j - c, G(this.ta)) : (a.ia[0] == a.ia[1] ? (this.J = vc, d = this.zc.wa(a.ha[0]), c = this.zc.wa(a.ha[1]), h = this.Ac.wa(a.ia[0]), this.B.x = 0.5 * (d.x + c.x), this.B.y = 
  0.5 * (d.y + c.y), this.ta = Jb(J(c, d)), G(this.ta), e = this.ta, a = b.d, o = a.a.x * e.x + a.b.x * e.y, n = a.a.y * e.x + a.b.y * e.y, e = this.B, a = b.d, d = b.position.x + (a.a.x * e.x + a.b.x * e.y), c = b.position.y + (a.a.y * e.x + a.b.y * e.y), e = h, a = f.d, k = f.position.x + (a.a.x * e.x + a.b.x * e.y), j = f.position.y + (a.a.y * e.x + a.b.y * e.y), o = (k - d) * o + (j - c) * n) : a.ha[0] == a.ha[0] ? (this.J = wc, k = this.Ac.wa(a.ia[0]), j = this.Ac.wa(a.ia[1]), g = this.zc.wa(a.ha[0]), 
  this.B.x = 0.5 * (k.x + j.x), this.B.y = 0.5 * (k.y + j.y), this.ta = Jb(J(j, k)), G(this.ta), e = this.ta, a = f.d, o = a.a.x * e.x + a.b.x * e.y, n = a.a.y * e.x + a.b.y * e.y, e = this.B, a = f.d, k = f.position.x + (a.a.x * e.x + a.b.x * e.y), j = f.position.y + (a.a.y * e.x + a.b.y * e.y), e = g, a = b.d, d = b.position.x + (a.a.x * e.x + a.b.x * e.y), c = b.position.y + (a.a.y * e.x + a.b.y * e.y), o = (d - k) * o + (c - j) * n) : (d = this.zc.wa(a.ha[0]), c = this.zc.wa(a.ha[1]), k = this.Ac.wa(a.ia[0]), 
  j = this.Ac.wa(a.ia[1]), I(b, g), g = Kb(b.d, J(c, d)), I(f, h), o = Kb(f.d, J(j, k)), f = g.x * g.x + g.y * g.y, h = o.x * o.x + o.y * o.y, a = J(o, g), b = g.x * a.x + g.y * a.y, a = o.x * a.x + o.y * a.y, g = g.x * o.x + g.y * o.y, n = f * h - g * g, o = 0, n != 0 && (o = L((g * a - b * h) / n, 0, 1)), (g * o + a) / h < 0 && (o = L((g - b) / f, 0, 1)), g = new F(0, 0), g.x = d.x + o * (c.x - d.x), g.y = d.y + o * (c.y - d.y), h = new F(0, 0), h.x = k.x + o * (j.x - k.x), h.y = k.y + o * (j.y - 
  k.y), o == 0 || o == 1 ? (this.J = wc, this.ta = Jb(J(j, k)), G(this.ta), this.B = h) : (this.J = vc, this.ta = Jb(J(c, d)), this.B = g)), o < 0 && this.ta.vg())
};
tc.prototype.Gb = function(a, d) {
  var b, c, f = 0;
  switch(this.J) {
    case uc:
      b = Lb(a.d, this.ta);
      c = Lb(d.d, this.ta.Jc());
      b = this.zc.Sd(b);
      c = this.Ac.Sd(c);
      b = I(a, b);
      c = I(d, c);
      f = (c.x - b.x) * this.ta.x + (c.y - b.y) * this.ta.y;
      break;
    case vc:
      f = Kb(a.d, this.ta);
      b = I(a, this.B);
      c = Lb(d.d, f.Jc());
      c = this.Ac.Sd(c);
      c = I(d, c);
      f = (c.x - b.x) * f.x + (c.y - b.y) * f.y;
      break;
    case wc:
      f = Kb(d.d, this.ta);
      c = I(d, this.B);
      b = Lb(a.d, f.Jc());
      b = this.zc.Sd(b);
      b = I(a, b);
      f = (b.x - c.x) * f.x + (b.y - c.y) * f.y;
      break;
    default:
      H(!1)
  }
  return f
};
var uc = 1, vc = 2, wc = 4;
function xc(a, d) {
  this.position = new F;
  this.d = new Gb;
  this.constructor === xc && (a === i && (a = q), d === i && (d = q), a && (this.position.m(a), this.d.ld(d)))
}
xc.prototype.xa = function(a, d) {
  this.position.m(a);
  this.d.ld(d)
};
xc.prototype.we = function() {
  this.position.ea();
  this.d.we()
};
xc.prototype.j = function(a) {
  this.position.m(a.position);
  this.d.ld(a.d)
};
xc.prototype.Ic = function() {
  return Math.atan2(this.d.a.y, this.d.a.x)
};
var yc = 0, zc = 0, Ac = 0, Bc = 0, Cc = 0, Dc = new ec, Ec = new cc, Fc = new xc, Gc = new xc, Hc = new tc, Ic = new dc;
function Jc() {
  this.position = new F(0, 0);
  this.Wg = new F(0, 0);
  this.Ec = q;
  this.position.ea();
  this.pb = 0;
  this.Wg.ea();
  this.ni = this.hj = this.oi = 0;
  this.pi = this.mi = !0;
  this.ui = this.td = !1;
  this.type = T;
  this.ki = !0;
  this.$i = 1
}
var T = 0;
function U() {
  this.Ca = new Vb;
  this.Da = new Vb;
  this.bb = new R;
  this.je = new R
}
function Kc(a, d) {
  var b = a.H.p, c = a.D.ja, f = a.H.ja;
  d.xa(a.bb, a.D.p.zb(), c.P, b.zb(), f.P)
}
U.prototype.Ub = t("Ue");
U.prototype.na = function(a, d) {
  a === i && (a = q);
  d === i && (d = q);
  this.enabled = !0;
  this.Ce = this.ed = this.zf = this.Ue = !1;
  if(!a || !d) {
    this.H = this.D = q
  }else {
    if(a.Ub() || d.Ub()) {
      this.Ue = !0
    }
    var b = a.p, c = d.p;
    if(b.N() != 2 || (b.Lb & Lc) == Lc || c.N() != 2 || (c.Lb & Lc) == Lc) {
      this.zf = !0
    }
    this.D = a;
    this.H = d;
    this.bb.da = 0;
    this.r = this.pa = q;
    this.Ca.la = q;
    this.Ca.$ = q;
    this.Ca.next = q;
    this.Ca.V = q;
    this.Da.la = q;
    this.Da.$ = q;
    this.Da.next = q;
    this.Da.V = q
  }
};
function Mc(a, d) {
  var b = a.je;
  a.je = a.bb;
  a.bb = b;
  a.enabled = !0;
  var b = !1, c = a.ed, f = a.D.p, e = a.H.p, g = a.D.dc.Vb(a.H.dc);
  if(a.Ue) {
    g && (b = P.Vb(a.D.ja, f.zb(), a.H.ja, e.zb())), a.bb.da = 0
  }else {
    a.zf = f.N() != 2 || (f.Lb & Lc) == Lc || e.N() != 2 || (e.Lb & Lc) == Lc ? !0 : !1;
    if(g) {
      a.Gb();
      b = a.bb.da > 0;
      for(g = 0;g < a.bb.da;g++) {
        var h = a.bb.A[g];
        h.Zc = 0;
        for(var k = h.ad = 0;k < a.je.da;k++) {
          var j = a.je.A[k];
          if(j.gc.key == h.gc.key) {
            h.Zc = j.Zc;
            h.ad = j.ad;
            break
          }
        }
      }
    }else {
      a.bb.da = 0
    }
    b != c && (V(f, !0), V(e, !0))
  }
  a.ed = b;
  !c && b && d.Nd(a);
  c && !b && d.fd(a);
  a.Ue || d.Yd(a, a.je)
}
U.prototype.Gb = r();
var Nc = new function() {
  this.jb = new Qb;
  this.kb = new Qb;
  this.rh = new Rb;
  this.sh = new Rb
};
function Oc() {
  U.call(this)
}
A(Oc, U);
function Pc() {
  return new Oc
}
Oc.prototype.na = function(a, d) {
  U.prototype.na.call(this, a, d);
  H(a.N() == P.tc);
  H(d.N() == P.Be)
};
Oc.prototype.Gb = r();
function Qc() {
}
Qc.prototype.j = function(a) {
  this.aa = a.aa;
  this.tb = a.tb;
  this.Ed = a.Ed;
  this.Kd = a.Kd;
  this.Ld = a.Ld
};
function Rc() {
  this.Bc = 0;
  this.Pc = new F(0, 0);
  this.Td = 0
}
;function Sc() {
  this.be = 1;
  this.le = 65535;
  this.Vc = 0
}
Sc.prototype.Fa = function() {
  var a = new Sc;
  a.be = this.be;
  a.le = this.le;
  a.Vc = this.Vc;
  return a
};
function Tc() {
  this.Of = new Sc;
  this.dc = new gc;
  this.ja = this.r = this.p = this.Bd = q;
  this.Rf = this.Pf = this.Ie = 0
}
x = Tc.prototype;
x.N = function() {
  return this.ja.N()
};
x.Ub = t("qj");
x.Kc = t("Bd");
x.qg = function(a) {
  a === i && (a = q);
  a == q && (a = new Rc);
  this.ja.df(a, this.Ie);
  return a
};
x.Gc = function(a, d, b) {
  this.Bd = b.Ec;
  this.Pf = b.gb;
  this.Rf = b.Qb;
  this.p = a;
  this.r = q;
  this.Of = b.filter.Fa();
  this.qj = b.de;
  this.ja = b.shape.Fa();
  this.Ie = b.pd
};
x.oc = function() {
  this.ja = q
};
x.Pd = function(a, d) {
  this.ja.Od(this.dc, d);
  this.yc = a.Pd(this.dc, this)
};
x.Qd = function(a) {
  if(this.yc != q) {
    a.Qd(this.yc), this.yc = q
  }
};
function Uc(a, d, b, c) {
  if(a.yc) {
    var f = new gc, e = new gc;
    a.ja.Od(f, b);
    a.ja.Od(e, c);
    jc(a.dc, f, e);
    d.lf(a.yc, a.dc, J(c.position, b.position))
  }
}
;function Vc() {
  U.call(this)
}
A(Vc, U);
function Wc() {
  return new Vc
}
Vc.prototype.na = function(a, d) {
  U.prototype.na.call(this, a, d)
};
Vc.prototype.Gb = function() {
  S.zh(this.bb, this.D.ja, this.D.p.i, this.H.ja, this.H.p.i)
};
function Xc() {
  U.call(this)
}
A(Xc, U);
function Yc() {
  return new Xc
}
Xc.prototype.na = function(a, d) {
  U.prototype.na.call(this, a, d)
};
Xc.prototype.Gb = r();
function Zc(a) {
  Ob.call(this, a);
  this.Ab = new Gb;
  this.Ud = new Gb;
  this.Vd = new Gb;
  this.Wd = new Gb;
  this.oa = new M(0, 0, 0);
  this.Cb = new F(0, 0);
  this.Pb = new F(0, 0);
  this.Mb = new F(0, 0);
  this.Nb = new F(0, 0);
  this.v = new M(0, 0, 0);
  this.n = new Sb;
  this.Mb.m(a.vd);
  this.Nb.m(a.wd);
  this.Le = a.oe;
  this.v.ea();
  this.hc = 0;
  this.Je = a.jj;
  this.Tf = a.$j;
  this.uj = a.Bj;
  this.vj = a.Fj;
  this.Mf = a.Ii;
  this.$g = a.Ji;
  this.Ta = 0
}
A(Zc, Ob);
x = Zc.prototype;
x.gd = function() {
  return Xb(this.Ga, this.Mb)
};
x.hd = function() {
  return Xb(this.Ha, this.Nb)
};
x.kd = function(a) {
  var d = this.Ga, b = this.Ha, c, f = 0;
  c = d.i.d;
  var e = this.Mb.x - d.c.u.x, g = this.Mb.y - d.c.u.y, f = c.a.x * e + c.b.x * g, g = c.a.y * e + c.b.y * g, e = f;
  c = b.i.d;
  var h = this.Nb.x - b.c.u.x, k = this.Nb.y - b.c.u.y, f = c.a.x * h + c.b.x * k, k = c.a.y * h + c.b.y * k, h = f;
  c = d.z;
  var f = b.z, j = d.O, o = b.O;
  this.n.a.x = c + f + g * g * j + k * k * o;
  this.n.b.x = -g * e * j - k * h * o;
  this.n.T.x = -g * j - k * o;
  this.n.a.y = this.n.b.x;
  this.n.b.y = c + f + e * e * j + h * h * o;
  this.n.T.y = e * j + h * o;
  this.n.a.s = this.n.T.x;
  this.n.b.s = this.n.T.y;
  this.n.T.s = j + o;
  this.Ke = 1 / (j + o);
  if(!this.$g) {
    this.hc = 0
  }
  if(this.Mf) {
    var n = b.c.l - d.c.l - this.Le;
    if(Math.abs(this.Tf - this.Je) < 2 * Bb) {
      this.Ta = 3
    }else {
      if(n <= this.Je) {
        if(this.Ta != 1) {
          this.v.s = 0
        }
        this.Ta = 1
      }else {
        if(n >= this.Tf) {
          if(this.Ta != 2) {
            this.v.s = 0
          }
          this.Ta = 2
        }else {
          this.Ta = 0, this.v.s = 0
        }
      }
    }
  }else {
    this.Ta = 0
  }
  a.Ld ? (this.v.x *= a.Zb, this.v.y *= a.Zb, this.hc *= a.Zb, a = this.v.x, n = this.v.y, d.q.x -= c * a, d.q.y -= c * n, d.G -= j * (e * n - g * a + this.hc + this.v.s), b.q.x += f * a, b.q.y += f * n, b.G += o * (h * n - k * a + this.hc + this.v.s)) : (this.v.ea(), this.hc = 0)
};
x.Oc = function(a) {
  var d = this.Ga, b = this.Ha, c = 0, f = c = 0, e = 0, g = 0, h = 0, k = d.q, j = d.G, o = b.q, n = b.G, s = d.z, p = b.z, v = d.O, u = b.O;
  if(this.$g && this.Ta != 3) {
    f = this.Ke * -(n - j - this.vj), e = this.hc, g = a.aa * this.uj, this.hc = L(this.hc + f, -g, g), f = this.hc - e, j -= v * f, n += u * f
  }
  if(this.Mf && this.Ta != 0) {
    var a = d.i.d, f = this.Mb.x - d.c.u.x, e = this.Mb.y - d.c.u.y, c = a.a.x * f + a.b.x * e, e = a.a.y * f + a.b.y * e, f = c, a = b.i.d, g = this.Nb.x - b.c.u.x, h = this.Nb.y - b.c.u.y, c = a.a.x * g + a.b.x * h, h = a.a.y * g + a.b.y * h, g = c, a = o.x + -n * h - k.x - -j * e, w = o.y + n * g - k.y - j * f;
    Ub(this.n, this.oa, -a, -w, -(n - j));
    if(this.Ta == 3) {
      this.v.Md(this.oa)
    }else {
      if(this.Ta == 1) {
        if(c = this.v.s + this.oa.s, c < 0) {
          Tb(this.n, this.Pb, -a, -w), this.oa.x = this.Pb.x, this.oa.y = this.Pb.y, this.oa.s = -this.v.s, this.v.x += this.Pb.x, this.v.y += this.Pb.y, this.v.s = 0
        }
      }else {
        if(this.Ta == 2 && (c = this.v.s + this.oa.s, c > 0)) {
          Tb(this.n, this.Pb, -a, -w), this.oa.x = this.Pb.x, this.oa.y = this.Pb.y, this.oa.s = -this.v.s, this.v.x += this.Pb.x, this.v.y += this.Pb.y, this.v.s = 0
        }
      }
    }
    k.x -= s * this.oa.x;
    k.y -= s * this.oa.y;
    j -= v * (f * this.oa.y - e * this.oa.x + this.oa.s);
    o.x += p * this.oa.x;
    o.y += p * this.oa.y;
    n += u * (g * this.oa.y - h * this.oa.x + this.oa.s)
  }else {
    a = d.i.d, f = this.Mb.x - d.c.u.x, e = this.Mb.y - d.c.u.y, c = a.a.x * f + a.b.x * e, e = a.a.y * f + a.b.y * e, f = c, a = b.i.d, g = this.Nb.x - b.c.u.x, h = this.Nb.y - b.c.u.y, c = a.a.x * g + a.b.x * h, h = a.a.y * g + a.b.y * h, g = c, Tb(this.n, this.Cb, -(o.x + -n * h - k.x - -j * e), -(o.y + n * g - k.y - j * f)), this.v.x += this.Cb.x, this.v.y += this.Cb.y, k.x -= s * this.Cb.x, k.y -= s * this.Cb.y, j -= v * (f * this.Cb.y - e * this.Cb.x), o.x += p * this.Cb.x, o.y += p * this.Cb.y, 
    n += u * (g * this.Cb.y - h * this.Cb.x)
  }
  d.q.m(k);
  d.G = j;
  b.q.m(o);
  b.G = n
};
x.Nc = function() {
  var a = 0, d, b = this.Ga, c = this.Ha, f = 0, e = d = 0, g = 0, h = 0;
  if(this.Mf && this.Ta != 0) {
    var a = c.c.l - b.c.l - this.Le, k = 0;
    this.Ta == 3 ? (a = L(a - this.Je, -Cb, Cb), k = -this.Ke * a, f = Math.abs(a)) : this.Ta == 1 ? (a -= this.Je, f = -a, a = L(a + Bb, -Cb, 0), k = -this.Ke * a) : this.Ta == 2 && (a -= this.Tf, f = a, a = L(a - Bb, 0, Cb), k = -this.Ke * a);
    b.c.l -= b.O * k;
    c.c.l += c.O * k;
    O(b);
    O(c)
  }
  d = b.i.d;
  k = this.Mb.x - b.c.u.x;
  a = this.Mb.y - b.c.u.y;
  e = d.a.x * k + d.b.x * a;
  a = d.a.y * k + d.b.y * a;
  k = e;
  d = c.i.d;
  var j = this.Nb.x - c.c.u.x, o = this.Nb.y - c.c.u.y, e = d.a.x * j + d.b.x * o, o = d.a.y * j + d.b.y * o, j = e, g = c.c.h.x + j - b.c.h.x - k, h = c.c.h.y + o - b.c.h.y - a, n = g * g + h * h;
  d = Math.sqrt(n);
  var e = b.z, s = c.z, p = b.O, v = c.O;
  n > 0.05 * 0.05 && (n = 1 / (e + s), g = n * -g, h = n * -h, b.c.h.x -= 0.5 * e * g, b.c.h.y -= 0.5 * e * h, c.c.h.x += 0.5 * s * g, c.c.h.y += 0.5 * s * h, g = c.c.h.x + j - b.c.h.x - k, h = c.c.h.y + o - b.c.h.y - a);
  this.Ud.a.x = e + s;
  this.Ud.b.x = 0;
  this.Ud.a.y = 0;
  this.Ud.b.y = e + s;
  this.Vd.a.x = p * a * a;
  this.Vd.b.x = -p * k * a;
  this.Vd.a.y = -p * k * a;
  this.Vd.b.y = p * k * k;
  this.Wd.a.x = v * o * o;
  this.Wd.b.x = -v * j * o;
  this.Wd.a.y = -v * j * o;
  this.Wd.b.y = v * j * j;
  this.Ab.ld(this.Ud);
  this.Ab.cf(this.Vd);
  this.Ab.cf(this.Wd);
  this.Ab.Zd($c, -g, -h);
  g = $c.x;
  h = $c.y;
  b.c.h.x -= b.z * g;
  b.c.h.y -= b.z * h;
  b.c.l -= b.O * (k * h - a * g);
  c.c.h.x += c.z * g;
  c.c.h.y += c.z * h;
  c.c.l += c.O * (j * h - o * g);
  O(b);
  O(c);
  return d <= 0.005 && f <= Bb
};
var $c = new F(0, 0);
function ad() {
  Pb.call(this);
  this.vd = new F(0, 0);
  this.wd = new F(0, 0);
  this.type = 1;
  this.vd.ea();
  this.wd.ea();
  this.Fj = this.Bj = this.$j = this.jj = this.oe = 0;
  this.Ji = this.Ii = !1
}
A(ad, Pb);
ad.prototype.xa = function(a, d, b) {
  this.fa = a;
  this.ga = d;
  this.vd = Mb(this.fa.i, b);
  this.wd = Mb(this.ga.i, b);
  this.oe = this.ga.Ic() - this.fa.Ic()
};
ad.prototype.Gc = function() {
  return new Zc(this)
};
function bd() {
  this.I = new F(0, 0);
  this.Me = [];
  this.A = [];
  for(var a = 0;a < 2;a++) {
    this.A[a] = new F(0, 0)
  }
}
bd.prototype.xa = function(a) {
  H(a.ib > 0);
  var d = 0, b = 0, c = 0, f = 0, e = 0;
  switch(a.type) {
    case R.Gf:
      var g = a.fa.i.d, c = a.Jb, d = a.fa.i.position.x + (g.a.x * c.x + g.b.x * c.y), b = a.fa.i.position.y + (g.a.y * c.x + g.b.y * c.y), g = a.ga.i.d, c = a.Ka[0].Jb, f = a.ga.i.position.x + (g.a.x * c.x + g.b.x * c.y), g = a.ga.i.position.y + (g.a.y * c.x + g.b.y * c.y), c = f - d, e = g - b, h = c * c + e * e;
      h > bc ? (h = Math.sqrt(h), this.I.x = c / h, this.I.y = e / h) : (this.I.x = 1, this.I.y = 0);
      this.A[0].x = 0.5 * (d + f);
      this.A[0].y = 0.5 * (b + g);
      this.Me[0] = c * this.I.x + e * this.I.y - a.ag;
      break;
    case R.Tc:
      g = a.fa.i.d;
      c = a.Fe;
      this.I.x = g.a.x * c.x + g.b.x * c.y;
      this.I.y = g.a.y * c.x + g.b.y * c.y;
      g = a.fa.i.d;
      c = a.Jb;
      f = a.fa.i.position.x + (g.a.x * c.x + g.b.x * c.y);
      e = a.fa.i.position.y + (g.a.y * c.x + g.b.y * c.y);
      g = a.ga.i.d;
      for(d = 0;d < a.ib;d++) {
        c = a.Ka[d].Jb, b = a.ga.i.position.x + (g.a.x * c.x + g.b.x * c.y), c = a.ga.i.position.y + (g.a.y * c.x + g.b.y * c.y), this.Me[d] = (b - f) * this.I.x + (c - e) * this.I.y - a.ag, this.A[d].x = b, this.A[d].y = c
      }
      break;
    case R.Hf:
      g = a.ga.i.d;
      c = a.Fe;
      this.I.x = g.a.x * c.x + g.b.x * c.y;
      this.I.y = g.a.y * c.x + g.b.y * c.y;
      g = a.ga.i.d;
      c = a.Jb;
      f = a.ga.i.position.x + (g.a.x * c.x + g.b.x * c.y);
      e = a.ga.i.position.y + (g.a.y * c.x + g.b.y * c.y);
      g = a.fa.i.d;
      for(d = 0;d < a.ib;d++) {
        c = a.Ka[d].Jb, b = a.fa.i.position.x + (g.a.x * c.x + g.b.x * c.y), c = a.fa.i.position.y + (g.a.y * c.x + g.b.y * c.y), this.Me[d] = (b - f) * this.I.x + (c - e) * this.I.y - a.ag, this.A[d].j(b, c)
      }
      this.I.x *= -1;
      this.I.y *= -1
  }
};
function X(a, d, b) {
  this.wf = 255 * L(a, 0, 1);
  this.sf = 255 * L(d, 0, 1);
  this.pf = 255 * L(b, 0, 1)
}
X.prototype.j = function(a, d, b) {
  this.wf = 255 * L(a, 0, 1);
  this.sf = 255 * L(d, 0, 1);
  this.pf = 255 * L(b, 0, 1)
};
Q(X.prototype, "r", {enumerable:!1, configurable:!0, set:function(a) {
  this.wf = 255 * L(a, 0, 1)
}});
Q(X.prototype, "g", {enumerable:!1, configurable:!0, set:function(a) {
  this.sf = 255 * L(a, 0, 1)
}});
Q(X.prototype, "b", {enumerable:!1, configurable:!0, set:function(a) {
  this.pf = 255 * L(a, 0, 1)
}});
Q(X.prototype, "color", {enumerable:!1, configurable:!0, get:function() {
  return this.wf << 16 | this.sf << 8 | this.pf
}});
function cd() {
  U.call(this)
}
A(cd, U);
function dd() {
  return new cd
}
cd.prototype.na = function(a, d) {
  U.prototype.na.call(this, a, d);
  H(a.N() == P.tc);
  H(d.N() == P.Sc)
};
cd.prototype.Gb = function() {
  S.Ah(this.bb, this.D.ja, this.D.p.i, this.H.ja, this.H.p.i)
};
function ed() {
  this.Jb = new F;
  this.K = new F;
  this.L = new F
}
;function fd() {
  this.Fe = new F;
  this.Jb = new F;
  this.jc = new F;
  this.Dd = new Gb;
  this.Ab = new Gb;
  this.Ka = [];
  for(var a = 0;a < 2;a++) {
    this.Ka[a] = new ed
  }
}
;function gd() {
  U.call(this)
}
A(gd, U);
function hd() {
  return new gd
}
gd.prototype.na = function(a, d) {
  U.prototype.na.call(this, a, d)
};
gd.prototype.Gb = function() {
  S.Bh(this.bb, this.D.ja, this.D.p.i, this.H.ja, this.H.p.i)
};
function id() {
  this.Wa = [];
  this.vc = [];
  this.Db = []
}
id.prototype.xa = function(a, d, b, c, f) {
  this.Ia = this.ab = this.za = 0;
  this.eh = c;
  this.Xc = f;
  this.Wa = [];
  this.vc = [];
  this.Db = []
};
id.prototype.Zd = function(a, d, b) {
  for(var c = 0, f = 0, e, c = 0;c < this.za;++c) {
    f = this.Wa[c], f.N() == 2 && (f.q.x += a.aa * (d.x + f.z * f.ie.x), f.q.y += a.aa * (d.y + f.z * f.ie.y), f.G += a.aa * f.O * f.Sf, f.q.tg(L(1 - a.aa * f.tj, 0, 1)), f.G *= L(1 - a.aa * f.kj, 0, 1))
  }
  this.Xc.xa(a, this.vc, this.ab);
  d = this.Xc;
  d.kd(a);
  for(c = 0;c < this.Ia;++c) {
    e = this.Db[c], e.kd(a)
  }
  for(c = 0;c < a.Kd;++c) {
    for(f = 0;f < this.Ia;++f) {
      e = this.Db[f], e.Oc(a)
    }
    d.Oc()
  }
  for(c = 0;c < this.Ia;++c) {
    e = this.Db[c], e.gf()
  }
  d.gf();
  for(c = 0;c < this.za;++c) {
    if(f = this.Wa[c], f.N() != T) {
      var g = a.aa * f.q.x, h = a.aa * f.q.y;
      g * g + h * h > 4 && (G(f.q), f.q.x *= 2 * a.tb, f.q.y *= 2 * a.tb);
      g = a.aa * f.G;
      if(g * g > Eb) {
        f.G = f.G < 0 ? -Db * a.tb : Db * a.tb
      }
      f.c.sa.m(f.c.h);
      f.c.ob = f.c.l;
      f.c.h.x += a.aa * f.q.x;
      f.c.h.y += a.aa * f.q.y;
      f.c.l += a.aa * f.G;
      O(f)
    }
  }
  for(c = 0;c < a.Ed;++c) {
    g = d.Nc(0.2);
    h = !0;
    for(f = 0;f < this.Ia;++f) {
      e = this.Db[f], e = e.Nc(0.2), h = h && e
    }
    if(g && h) {
      break
    }
  }
  jd(this, d.Kb);
  if(b) {
    b = Number.MAX_VALUE;
    d = Fb * Fb;
    for(c = 0;c < this.za;++c) {
      if(f = this.Wa[c], f.N() != T) {
        !f.Kf || f.G * f.G > d || Hb(f.q, f.q) > 1.0E-4 ? b = f.Ne = 0 : (f.Ne += a.aa, b = Math.min(b, f.Ne))
      }
    }
    if(b >= 0.5) {
      for(c = 0;c < this.za;++c) {
        f = this.Wa[c], V(f, !1)
      }
    }
  }
};
id.prototype.of = function(a) {
  var d = 0, b = 0;
  this.Xc.xa(a, this.vc, this.ab);
  for(var c = this.Xc, d = 0;d < this.Ia;++d) {
    this.Db[d].kd(a)
  }
  for(d = 0;d < a.Kd;++d) {
    c.Oc();
    for(b = 0;b < this.Ia;++b) {
      this.Db[b].Oc(a)
    }
  }
  for(d = 0;d < this.za;++d) {
    if(b = this.Wa[d], b.N() != T) {
      var f = a.aa * b.q.x, e = a.aa * b.q.y;
      f * f + e * e > 4 && (G(b.q), b.q.x *= 2 * a.tb, b.q.y *= 2 * a.tb);
      f = a.aa * b.G;
      if(f * f > Eb) {
        b.G = b.G < 0 ? -Db * a.tb : Db * a.tb
      }
      b.c.sa.m(b.c.h);
      b.c.ob = b.c.l;
      b.c.h.x += a.aa * b.q.x;
      b.c.h.y += a.aa * b.q.y;
      b.c.l += a.aa * b.G;
      O(b)
    }
  }
  for(d = 0;d < a.Ed;++d) {
    f = c.Nc(0.75);
    e = !0;
    for(b = 0;b < this.Ia;++b) {
      var g = this.Db[b].Nc(0.2), e = e && g
    }
    if(f && e) {
      break
    }
  }
  jd(this, c.Kb)
};
function jd(a, d) {
  if(a.eh != q) {
    for(var b = 0;b < a.ab;++b) {
      for(var c = a.vc[b], f = d[b], e = 0;e < f.ib;++e) {
        kd.Lj[e] = f.Ka[e].qa, kd.Vj[e] = f.Ka[e].mc
      }
      a.eh.Xd(c, kd)
    }
  }
}
var kd = new function() {
  this.Lj = [];
  this.Vj = []
};
function ld() {
}
;function Y() {
  this.Oe = this.Nf = this.xd = this.sj = this.zd = 1;
  var a = this;
  this.xj = {Ui:{clear:function() {
    a.ec.clearRect(0, 0, a.ec.canvas.width, a.ec.canvas.height)
  }}};
  this.Zg = 0
}
(function(a) {
  a.prototype.pc = function(a, b) {
    return"rgba(" + ((a & 16711680) >> 16) + "," + ((a & 65280) >> 8) + "," + (a & 255) + "," + b + ")"
  };
  a.prototype.ci = function() {
    var a = md;
    a === i && (a = 0);
    this.Zg = a
  };
  a.prototype.ei = function(a) {
    this.ec = a
  };
  a.prototype.ai = function(a) {
    a === i && (a = 0);
    this.zd = a
  };
  a.prototype.di = function() {
    var a = 1;
    a === i && (a = 0);
    this.sj = a;
    this.ec.Qk = a
  };
  a.prototype.bi = function() {
    var a = 0.3;
    a === i && (a = 0);
    this.Nf = a
  };
  a.prototype.Hh = function(a, b) {
    var c = this.ec, f = this.zd;
    c.beginPath();
    c.strokeStyle = this.pc(b.color, this.xd);
    c.moveTo(a[0].x * f, a[0].y * f);
    for(var e = 1;e < 4;e++) {
      c.lineTo(a[e].x * f, a[e].y * f)
    }
    c.lineTo(a[0].x * f, a[0].y * f);
    c.closePath();
    c.stroke()
  };
  a.prototype.Jh = function(a, b, c) {
    if(b) {
      var f = this.ec, e = this.zd;
      f.beginPath();
      f.strokeStyle = this.pc(c.color, this.xd);
      f.fillStyle = this.pc(c.color, this.Nf);
      f.moveTo(a[0].x * e, a[0].y * e);
      for(c = 1;c < b;c++) {
        f.lineTo(a[c].x * e, a[c].y * e)
      }
      f.lineTo(a[0].x * e, a[0].y * e);
      f.closePath();
      f.fill();
      f.stroke()
    }
  };
  a.prototype.Ih = function(a, b, c, f) {
    if(b) {
      var e = this.ec, g = this.zd, h = a.x * g, k = a.y * g;
      e.moveTo(0, 0);
      e.beginPath();
      e.strokeStyle = this.pc(f.color, this.xd);
      e.fillStyle = this.pc(f.color, this.Nf);
      e.arc(h, k, b * g, 0, Math.PI * 2, !0);
      e.moveTo(h, k);
      e.lineTo((a.x + c.x * b) * g, (a.y + c.y * b) * g);
      e.closePath();
      e.fill();
      e.stroke()
    }
  };
  a.prototype.Sb = function(a, b, c) {
    var f = this.ec, e = this.zd;
    f.strokeStyle = this.pc(c.color, this.xd);
    f.beginPath();
    f.moveTo(a.x * e, a.y * e);
    f.lineTo(b.x * e, b.y * e);
    f.closePath();
    f.stroke()
  };
  a.prototype.Kh = function(a) {
    var b = this.ec, c = this.zd;
    b.beginPath();
    b.strokeStyle = this.pc(16711680, this.xd);
    b.moveTo(a.position.x * c, a.position.y * c);
    b.lineTo((a.position.x + this.Oe * a.d.a.x) * c, (a.position.y + this.Oe * a.d.a.y) * c);
    b.strokeStyle = this.pc(65280, this.xd);
    b.moveTo(a.position.x * c, a.position.y * c);
    b.lineTo((a.position.x + this.Oe * a.d.b.x) * c, (a.position.y + this.Oe * a.d.b.y) * c);
    b.closePath();
    b.stroke()
  };
  Y.Og = 1;
  Y.Ei = 2;
  Y.Ng = 4;
  Y.Fi = 8;
  Y.Ci = 16;
  Y.Di = 32
})(Y);
function nd() {
}
nd.prototype.Hb = function(a, d) {
  var b = a.Of.Fa(), c = d.Of.Fa();
  return b.Vc == c.Vc && b.Vc != 0 ? b.Vc > 0 : (b.le & c.be) != 0 && (b.be & c.le) != 0
};
var od = new nd;
function pd() {
  this.hb = [];
  qd(this, Wc, P.Sc, P.Sc);
  qd(this, dd, P.tc, P.Sc);
  qd(this, hd, P.tc, P.tc);
  qd(this, Yc, P.Be, P.Sc);
  qd(this, Pc, P.tc, P.Be)
}
function qd(a, d, b, c) {
  a.hb[b] = a.hb[b] || [];
  a.hb[b][c] = new ld;
  a.hb[b][c].Cf = d;
  a.hb[b][c].Xf = !0;
  if(b != c) {
    a.hb[c] = a.hb[c] || [], a.hb[c][b] = new ld, a.hb[c][b].Cf = d, a.hb[c][b].Xf = !1
  }
}
pd.prototype.Gc = function(a, d) {
  var b = this.hb[a.N()][d.N()], c;
  if(b.cd) {
    return c = b.cd, b.cd = c.r, b.kh--, c.na(a, d), c
  }
  c = b.Cf;
  return c != q ? (b.Xf ? (c = c(), c.na(a, d)) : (c = c(), c.na(d, a)), c) : q
};
pd.prototype.Gc = function(a, d) {
  var b = this.hb[a.N()][d.N()], c;
  if(b.cd) {
    return c = b.cd, b.cd = c.r, b.kh--, c.na(a, d), c
  }
  c = b.Cf;
  return c != q ? (b.Xf ? (c = c(), c.na(a, d)) : (c = c(), c.na(d, a)), c) : q
};
pd.prototype.oc = function(a) {
  a.bb.da > 0 && (V(a.D.p, !0), V(a.H.p, !0));
  var d = this.hb[a.D.N()][a.H.N()];
  d.kh++;
  a.r = d.cd;
  d.cd = a
};
function rd() {
}
;function sd() {
  this.wb = new lc;
  this.ic = [];
  this.ke = [];
  this.$c = 0
}
x = sd.prototype;
x.Pd = function(a, d) {
  var b = this.wb.Pd(a, d);
  this.wj++;
  return this.ic[this.ic.length] = b
};
x.Qd = function(a) {
  this.ic.splice(this.ic.indexOf(a), 1);
  this.wj--;
  this.wb.Qd(a)
};
x.lf = function(a, d, b) {
  this.wb.lf(a, d, b) && (this.ic[this.ic.length] = a)
};
x.Vb = function(a, d) {
  return this.wb.jd(a).Vb(this.wb.jd(d))
};
x.Kc = function(a) {
  return this.wb.Kc(a)
};
x.jd = function(a) {
  return this.wb.jd(a)
};
function td(a, d) {
  for(var b = a.$c = 0;b < a.ic.length;++b) {
    var c = a.ic[b];
    a.wb.mf(function(b) {
      if(b == c) {
        return!0
      }
      a.$c == a.ke.length && (a.ke[a.$c] = new rd);
      var d = a.ke[a.$c];
      d.jb = b < c ? b : c;
      d.kb = b >= c ? b : c;
      a.$c++;
      return!0
    }, a.wb.jd(c))
  }
  for(b = a.ic.length = 0;b < a.$c;) {
    var f = a.ke[b];
    d(a.wb.Kc(f.jb), a.wb.Kc(f.kb));
    for(b++;b < a.$c;) {
      var e = a.ke[b];
      if(e.jb != f.jb || e.kb != f.kb) {
        break
      }
      ++b
    }
  }
}
x.mf = function(a, d) {
  this.wb.mf(a, d)
};
function ud() {
}
ud.prototype.Nd = r();
ud.prototype.fd = r();
ud.prototype.Yd = r();
ud.prototype.Xd = r();
var vd = new ud;
function wd() {
  if(this.constructor === wd) {
    this.Ja = q, this.ab = 0, this.Lf = od, this.yd = vd, this.Yg = new pd, this.Wc = new sd
  }
}
wd.prototype.xh = function(a, d) {
  var b = a.p, c = d.p;
  if(b != c && c.Hb(b) && this.Lf.Hb(a, d)) {
    for(c = c.R;c;) {
      if(c.V == b) {
        var f = c.la.D, e = c.la.H;
        if(f == a && e == d) {
          return
        }
        if(f == d && e == a) {
          return
        }
      }
      c = c.next
    }
    f = this.Yg.Gc(a, d);
    a = f.D;
    d = f.H;
    b = a.p;
    c = d.p;
    f.pa = q;
    f.r = this.Ja.R;
    if(this.Ja.R != q) {
      this.Ja.R.pa = f
    }
    this.Ja.R = f;
    f.Ca.la = f;
    f.Ca.V = c;
    f.Ca.$ = q;
    f.Ca.next = b.R;
    if(b.R != q) {
      b.R.$ = f.Ca
    }
    b.R = f.Ca;
    f.Da.la = f;
    f.Da.V = b;
    f.Da.$ = q;
    f.Da.next = c.R;
    if(c.R != q) {
      c.R.$ = f.Da
    }
    c.R = f.Da;
    this.Ja.ab++
  }
};
function xd(a) {
  td(a.Wc, oc(a, a.xh))
}
wd.prototype.oc = function(a) {
  var d = a.D.p, b = a.H.p;
  a.ed && this.yd.fd(a);
  if(a.pa) {
    a.pa.r = a.r
  }
  if(a.r) {
    a.r.pa = a.pa
  }
  if(a == this.Ja.R) {
    this.Ja.R = a.r
  }
  if(a.Ca.$) {
    a.Ca.$.next = a.Ca.next
  }
  if(a.Ca.next) {
    a.Ca.next.$ = a.Ca.$
  }
  if(a.Ca == d.R) {
    d.R = a.Ca.next
  }
  if(a.Da.$) {
    a.Da.$.next = a.Da.next
  }
  if(a.Da.next) {
    a.Da.next.$ = a.Da.$
  }
  if(a.Da == b.R) {
    b.R = a.Da.next
  }
  this.Yg.oc(a);
  this.ab--
};
wd.Mk = new yd;
var bc = Number.MIN_VALUE * Number.MIN_VALUE;
function zd() {
  this.I = new F(0, 0);
  this.A = [];
  for(var a = 0;a < 2;a++) {
    this.A[a] = new F(0, 0)
  }
}
zd.prototype.xa = function(a, d, b, c, f) {
  b === i && (b = 0);
  f === i && (f = 0);
  if(a.da != 0) {
    var e = 0, g, h, k = 0, j = 0, o = 0, n = 0, s = 0;
    g = 0;
    switch(a.J) {
      case R.Gf:
        h = d.d;
        g = a.B;
        e = d.position.x + h.a.x * g.x + h.b.x * g.y;
        d = d.position.y + h.a.y * g.x + h.b.y * g.y;
        h = c.d;
        g = a.A[0].B;
        a = c.position.x + h.a.x * g.x + h.b.x * g.y;
        c = c.position.y + h.a.y * g.x + h.b.y * g.y;
        g = a - e;
        h = c - d;
        k = g * g + h * h;
        k > bc ? (k = Math.sqrt(k), this.I.x = g / k, this.I.y = h / k) : (this.I.x = 1, this.I.y = 0);
        g = d + b * this.I.y;
        c -= f * this.I.y;
        this.A[0].x = 0.5 * (e + b * this.I.x + (a - f * this.I.x));
        this.A[0].y = 0.5 * (g + c);
        break;
      case R.Tc:
        h = d.d;
        g = a.ua;
        k = h.a.x * g.x + h.b.x * g.y;
        j = h.a.y * g.x + h.b.y * g.y;
        h = d.d;
        g = a.B;
        o = d.position.x + h.a.x * g.x + h.b.x * g.y;
        n = d.position.y + h.a.y * g.x + h.b.y * g.y;
        this.I.x = k;
        this.I.y = j;
        for(e = 0;e < a.da;e++) {
          h = c.d, g = a.A[e].B, s = c.position.x + h.a.x * g.x + h.b.x * g.y, g = c.position.y + h.a.y * g.x + h.b.y * g.y, this.A[e].x = s + 0.5 * (b - (s - o) * k - (g - n) * j - f) * k, this.A[e].y = g + 0.5 * (b - (s - o) * k - (g - n) * j - f) * j
        }
        break;
      case R.Hf:
        h = c.d;
        g = a.ua;
        k = h.a.x * g.x + h.b.x * g.y;
        j = h.a.y * g.x + h.b.y * g.y;
        h = c.d;
        g = a.B;
        o = c.position.x + h.a.x * g.x + h.b.x * g.y;
        n = c.position.y + h.a.y * g.x + h.b.y * g.y;
        this.I.x = -k;
        this.I.y = -j;
        for(e = 0;e < a.da;e++) {
          h = d.d, g = a.A[e].B, s = d.position.x + h.a.x * g.x + h.b.x * g.y, g = d.position.y + h.a.y * g.x + h.b.y * g.y, this.A[e].x = s + 0.5 * (f - (s - o) * k - (g - n) * j - b) * k, this.A[e].y = g + 0.5 * (f - (s - o) * k - (g - n) * j - b) * j
        }
    }
  }
};
function Ad() {
  this.yj = new Qc;
  this.Kb = []
}
x = Ad.prototype;
x.xa = function(a, d, b) {
  b === i && (b = 0);
  var c;
  this.yj.j(a);
  a = 0;
  for(this.he = b;this.Kb.length < this.he;) {
    this.Kb[this.Kb.length] = new fd
  }
  for(a = 0;a < b;++a) {
    c = d[a];
    var f = c.D, e = c.H, g = f.ja.P, h = e.ja.P, k = f.p, j = e.p, o = c.bb, n;
    c = f.Pf;
    var s = e.Pf;
    c === i && (c = 0);
    s === i && (s = 0);
    n = Math.sqrt(c * s);
    var p, f = f.Rf, e = e.Rf;
    f === i && (f = 0);
    e === i && (e = 0);
    p = f > e ? f : e;
    var s = k.q.x, v = k.q.y, u = j.q.x, w = j.q.y, y = k.G, N = j.G;
    H(o.da > 0);
    Bd.xa(o, k.i, g, j.i, h);
    f = Bd.I.x;
    c = Bd.I.y;
    e = this.Kb[a];
    e.fa = k;
    e.ga = j;
    e.Aj = o;
    e.jc.x = f;
    e.jc.y = c;
    e.ib = o.da;
    e.gb = n;
    e.Qb = p;
    e.Fe.x = o.ua.x;
    e.Fe.y = o.ua.y;
    e.Jb.x = o.B.x;
    e.Jb.y = o.B.y;
    e.ag = g + h;
    e.type = o.J;
    for(g = 0;g < e.ib;++g) {
      n = o.A[g];
      h = e.Ka[g];
      h.qa = n.Zc;
      h.mc = n.ad;
      h.Jb.m(n.B);
      n = h.K.x = Bd.A[g].x - k.c.h.x;
      p = h.K.y = Bd.A[g].y - k.c.h.y;
      var C = h.L.x = Bd.A[g].x - j.c.h.x, l = h.L.y = Bd.A[g].y - j.c.h.y, m = n * c - p * f, K = C * c - l * f;
      m *= m;
      K *= K;
      h.Dd = 1 / (k.z + j.z + k.O * m + j.O * K);
      var W = k.n * k.z + j.n * j.z;
      W += k.n * k.O * m + j.n * j.O * K;
      h.Ki = 1 / W;
      K = c;
      W = -f;
      m = n * W - p * K;
      K = C * W - l * K;
      m *= m;
      K *= K;
      h.Wj = 1 / (k.z + j.z + k.O * m + j.O * K);
      h.af = 0;
      n = e.jc.x * (u + -N * l - s - -y * p) + e.jc.y * (w + N * C - v - y * n);
      n < -1 && (h.af += -e.Qb * n)
    }
    if(e.ib == 2) {
      w = e.Ka[0], u = e.Ka[1], o = k.z, k = k.O, s = j.z, j = j.O, v = w.K.x * c - w.K.y * f, w = w.L.x * c - w.L.y * f, y = u.K.x * c - u.K.y * f, u = u.L.x * c - u.L.y * f, f = o + s + k * v * v + j * w * w, c = o + s + k * y * y + j * u * u, j = o + s + k * v * y + j * w * u, f * f < 100 * (f * c - j * j) ? (e.Ab.a.j(f, j), e.Ab.b.j(j, c), j = e.Ab, e = e.Dd, k = j.a.x * j.b.y - j.b.x * j.a.y, k != 0 && (k = 1 / k), e.a.x = k * j.b.y, e.b.x = -k * j.b.x, e.a.y = -k * j.a.y, e.b.y = k * j.a.x) : 
      e.ib = 1
    }
  }
};
x.kd = function(a) {
  for(var d = 0;d < this.he;++d) {
    var b = this.Kb[d], c = b.fa, f = b.ga, e = c.z, g = c.O, h = f.z, k = f.O, j = b.jc.x, o = b.jc.y, n = o, s = -j, p = 0, v = 0;
    if(a.Ld) {
      v = b.ib;
      for(p = 0;p < v;++p) {
        var u = b.Ka[p];
        u.qa *= a.Zb;
        u.mc *= a.Zb;
        var w = u.qa * j + u.mc * n, y = u.qa * o + u.mc * s;
        c.G -= g * (u.K.x * y - u.K.y * w);
        c.q.x -= e * w;
        c.q.y -= e * y;
        f.G += k * (u.L.x * y - u.L.y * w);
        f.q.x += h * w;
        f.q.y += h * y
      }
    }else {
      v = b.ib;
      for(p = 0;p < v;++p) {
        c = b.Ka[p], c.qa = 0, c.mc = 0
      }
    }
  }
};
x.Oc = function() {
  for(var a = 0, d, b = 0, c = 0, f = 0, e = c = c = b = b = 0, g = b = b = 0, h = b = f = 0, k = 0, j, o = 0;o < this.he;++o) {
    var f = this.Kb[o], n = f.fa, s = f.ga, p = n.G, v = s.G, u = n.q, w = s.q, y = n.z, N = n.O, C = s.z, l = s.O, h = f.jc.x, m = k = f.jc.y;
    j = -h;
    g = f.gb;
    for(a = 0;a < f.ib;a++) {
      d = f.Ka[a], b = w.x - v * d.L.y - u.x + p * d.K.y, c = w.y + v * d.L.x - u.y - p * d.K.x, b = b * m + c * j, b = d.Wj * -b, c = g * d.qa, c = L(d.mc + b, -c, c), b = c - d.mc, e = b * m, b *= j, u.x -= y * e, u.y -= y * b, p -= N * (d.K.x * b - d.K.y * e), w.x += C * e, w.y += C * b, v += l * (d.L.x * b - d.L.y * e), d.mc = c
    }
    if(f.ib == 1) {
      d = f.Ka[0], b = w.x + -v * d.L.y - u.x - -p * d.K.y, c = w.y + v * d.L.x - u.y - p * d.K.x, f = b * h + c * k, b = -d.Dd * (f - d.af), c = d.qa + b, c = c > 0 ? c : 0, b = c - d.qa, e = b * h, b *= k, u.x -= y * e, u.y -= y * b, p -= N * (d.K.x * b - d.K.y * e), w.x += C * e, w.y += C * b, v += l * (d.L.x * b - d.L.y * e), d.qa = c
    }else {
      d = f.Ka[0];
      var a = f.Ka[1], b = d.qa, g = a.qa, K = (w.x - v * d.L.y - u.x + p * d.K.y) * h + (w.y + v * d.L.x - u.y - p * d.K.x) * k, W = (w.x - v * a.L.y - u.x + p * a.K.y) * h + (w.y + v * a.L.x - u.y - p * a.K.x) * k, c = K - d.af, e = W - a.af;
      j = f.Ab;
      c -= j.a.x * b + j.b.x * g;
      for(e -= j.a.y * b + j.b.y * g;;) {
        j = f.Dd;
        m = -(j.a.x * c + j.b.x * e);
        j = -(j.a.y * c + j.b.y * e);
        if(m >= 0 && j >= 0) {
          b = m - b;
          g = j - g;
          f = b * h;
          b *= k;
          h *= g;
          k *= g;
          u.x -= y * (f + h);
          u.y -= y * (b + k);
          p -= N * (d.K.x * b - d.K.y * f + a.K.x * k - a.K.y * h);
          w.x += C * (f + h);
          w.y += C * (b + k);
          v += l * (d.L.x * b - d.L.y * f + a.L.x * k - a.L.y * h);
          d.qa = m;
          a.qa = j;
          break
        }
        m = -d.Dd * c;
        j = 0;
        W = f.Ab.a.y * m + e;
        if(m >= 0 && W >= 0) {
          b = m - b;
          g = j - g;
          f = b * h;
          b *= k;
          h *= g;
          k *= g;
          u.x -= y * (f + h);
          u.y -= y * (b + k);
          p -= N * (d.K.x * b - d.K.y * f + a.K.x * k - a.K.y * h);
          w.x += C * (f + h);
          w.y += C * (b + k);
          v += l * (d.L.x * b - d.L.y * f + a.L.x * k - a.L.y * h);
          d.qa = m;
          a.qa = j;
          break
        }
        m = 0;
        j = -a.Dd * e;
        K = f.Ab.b.x * j + c;
        if(j >= 0 && K >= 0) {
          b = m - b;
          g = j - g;
          f = b * h;
          b *= k;
          h *= g;
          k *= g;
          u.x -= y * (f + h);
          u.y -= y * (b + k);
          p -= N * (d.K.x * b - d.K.y * f + a.K.x * k - a.K.y * h);
          w.x += C * (f + h);
          w.y += C * (b + k);
          v += l * (d.L.x * b - d.L.y * f + a.L.x * k - a.L.y * h);
          d.qa = m;
          a.qa = j;
          break
        }
        j = m = 0;
        K = c;
        W = e;
        if(K >= 0 && W >= 0) {
          b = m - b;
          g = j - g;
          f = b * h;
          b *= k;
          h *= g;
          k *= g;
          u.x -= y * (f + h);
          u.y -= y * (b + k);
          p -= N * (d.K.x * b - d.K.y * f + a.K.x * k - a.K.y * h);
          w.x += C * (f + h);
          w.y += C * (b + k);
          v += l * (d.L.x * b - d.L.y * f + a.L.x * k - a.L.y * h);
          d.qa = m;
          a.qa = j;
          break
        }
        break
      }
    }
    n.G = p;
    s.G = v
  }
};
x.gf = function() {
  for(var a = 0;a < this.he;++a) {
    for(var d = this.Kb[a], b = d.Aj, c = 0;c < d.ib;++c) {
      var f = b.A[c], e = d.Ka[c];
      f.Zc = e.qa;
      f.ad = e.mc
    }
  }
};
x.Nc = function(a) {
  a === i && (a = 0);
  for(var d = 0, b = 0;b < this.he;b++) {
    var c = this.Kb[b], f = c.fa, e = c.ga, g = f.n * f.z, h = f.n * f.O, k = e.n * e.z, j = e.n * e.O;
    Cd.xa(c);
    for(var o = Cd.I, n = 0;n < c.ib;n++) {
      var s = c.Ka[n], p = Cd.A[n], v = Cd.Me[n], u = p.x - f.c.h.x, w = p.y - f.c.h.y, y = p.x - e.c.h.x, p = p.y - e.c.h.y, d = d < v ? d : v, v = -s.Ki * L(a * (v + 0.005), -0.2, 0), s = v * o.x;
      v *= o.y;
      f.c.h.x -= g * s;
      f.c.h.y -= g * v;
      f.c.l -= h * (u * v - w * s);
      O(f);
      e.c.h.x += k * s;
      e.c.h.y += k * v;
      e.c.l += j * (y * v - p * s);
      O(e)
    }
  }
  return d > -0.0075
};
var Bd = new zd, Cd = new bd;
function Dd() {
  this.filter = new Sc;
  this.Ec = this.shape = q;
  this.gb = 0.2;
  this.pd = this.Qb = 0;
  this.filter.be = 1;
  this.filter.le = 65535;
  this.filter.Vc = 0;
  this.de = !1
}
;function Ed(a, d) {
  this.i = new xc;
  this.c = new Rb;
  this.q = new F(0, 0);
  this.ie = new F(0, 0);
  this.Lb = 0;
  a.ui && (this.Lb |= Lc);
  a.td && (this.Lb |= Fd);
  this.Kf = a.mi;
  this.ub = a.pi;
  a.ki && (this.Lb |= Gd);
  this.Ja = d;
  this.i.position.m(a.position);
  this.i.d.j(a.pb);
  this.c.u.ea();
  this.c.ra = 1;
  this.c.ob = this.c.l = a.pb;
  var b = this.i.d, c = this.c.u;
  this.c.h.x = b.a.x * c.x + b.b.x * c.y;
  this.c.h.y = b.a.y * c.x + b.b.y * c.y;
  this.c.h.x += this.i.position.x;
  this.c.h.y += this.i.position.y;
  this.c.sa.m(this.c.h);
  this.R = this.He = this.ba = q;
  this.mj = 0;
  this.r = this.pa = q;
  this.q.m(a.Wg);
  this.G = a.oi;
  this.tj = a.hj;
  this.kj = a.ni;
  this.ie.ea();
  this.Ne = this.Sf = 0;
  this.J = a.type;
  this.z = this.J == 2 ? this.n = 1 : this.n = 0;
  this.O = this.cc = 0;
  this.oj = a.$i;
  this.Bd = a.Ec;
  this.fc = q;
  this.ah = 0
}
function Hd(a, d, b) {
  b === i && (b = 0);
  if(a.Ja.Yc != !0) {
    a.i.d.j(b);
    a.i.position.m(d);
    var d = a.i.d, c = a.c.u;
    a.c.h.x = d.a.x * c.x + d.b.x * c.y;
    a.c.h.y = d.a.y * c.x + d.b.y * c.y;
    a.c.h.x += a.i.position.x;
    a.c.h.y += a.i.position.y;
    a.c.sa.m(a.c.h);
    a.c.ob = a.c.l = b;
    d = a.Ja.Aa.Wc;
    for(b = a.fc;b;b = b.r) {
      Uc(b, d, a.i, a.i)
    }
    xd(a.Ja.Aa)
  }
}
x = Ed.prototype;
x.zb = t("i");
x.Ic = function() {
  return this.c.l
};
function Id(a, d, b) {
  a.J == 2 && (a.ub == !1 && V(a, !0), a.q.x += a.z * d.x, a.q.y += a.z * d.y, a.G += a.O * ((b.x - a.c.h.x) * d.y - (b.y - a.c.h.y) * d.x))
}
x.qg = function(a) {
  a.Bc = this.n;
  a.Td = this.cc;
  a.Pc.m(this.c.u)
};
function Xb(a, d) {
  var b = a.i.d, b = new F(b.a.x * d.x + b.b.x * d.y, b.a.y * d.x + b.b.y * d.y);
  b.x += a.i.position.x;
  b.y += a.i.position.y;
  return b
}
x.N = t("J");
function V(a, d) {
  a.ub = d;
  a.Ne = 0;
  if(!d) {
    a.q.ea(), a.G = 0, a.ie.ea(), a.Sf = 0
  }
}
x.Tb = function() {
  return(this.Lb & Gd) == Gd
};
x.Kc = t("Bd");
function Jd(a) {
  Kd.d.j(a.c.ob);
  var d = Kd.d, b = a.c.u;
  Kd.position.x = a.c.sa.x - (d.a.x * b.x + d.b.x * b.y);
  Kd.position.y = a.c.sa.y - (d.a.y * b.x + d.b.y * b.y);
  b = a.Ja.Aa.Wc;
  for(d = a.fc;d;d = d.r) {
    Uc(d, b, Kd, a.i)
  }
}
function O(a) {
  a.i.d.j(a.c.l);
  var d = a.i.d, b = a.c.u;
  a.i.position.x = a.c.h.x - (d.a.x * b.x + d.b.x * b.y);
  a.i.position.y = a.c.h.y - (d.a.y * b.x + d.b.y * b.y)
}
x.Hb = function(a) {
  if(this.J != 2 && a.J != 2) {
    return!1
  }
  for(var d = this.ba;d;d = d.next) {
    if(d.V == a && d.bc.Xg == !1) {
      return!1
    }
  }
  return!0
};
x.nc = function(a) {
  a === i && (a = 0);
  this.c.nc(a);
  this.c.h.m(this.c.sa);
  this.c.l = this.c.ob;
  O(this)
};
var Kd = new xc, Lc = 8, Fd = 16, Gd = 32;
function Ld(a, d) {
  this.Aa = new wd;
  this.Xc = new Ad;
  this.U = new id;
  this.Qf = this.Yc = !1;
  this.He = this.ba = this.R = this.$a = this.Ba = this.Bk = q;
  this.mj = this.Ia = this.ab = this.za = 0;
  Ld.zj = !0;
  Ld.lj = !0;
  this.Kf = d;
  this.nj = a;
  this.dh = 0;
  this.Aa.Ja = this;
  this.bh = this.lg(new Jc)
}
(function(a) {
  a.Qh = 1 - 100 * Number.MIN_VALUE;
  a.prototype.Yh = function(a) {
    this.Aa.Lf = a
  };
  a.prototype.Zh = function(a) {
    this.Aa.yd = a
  };
  a.prototype.$h = function(a) {
    this.Ba = a
  };
  a.prototype.lg = function(a) {
    if(this.Yc) {
      return q
    }
    a = new Ed(a, this);
    a.pa = q;
    if(a.r = this.$a) {
      this.$a.pa = a
    }
    this.$a = a;
    this.za++;
    return a
  };
  a.prototype.Dh = function(a) {
    if(!this.Yc) {
      for(var b = a.ba;b;) {
        var c = b, b = b.next;
        this.Eh(c.bc)
      }
      for(b = a.He;b;) {
        c = b, b = b.Ik, c.nk.kk(a)
      }
      for(b = a.R;b;) {
        c = b, b = b.next, this.Aa.oc(c.la)
      }
      a.R = q;
      for(b = a.fc;b;) {
        c = b, b = b.r, c.Qd(this.Aa.Wc), c.oc()
      }
      a.fc = q;
      a.ah = 0;
      if(a.pa) {
        a.pa.r = a.r
      }
      if(a.r) {
        a.r.pa = a.pa
      }
      if(a == this.$a) {
        this.$a = a.r
      }
      this.za--
    }
  };
  a.prototype.ef = function(a) {
    var b = a.Gc();
    b.pa = q;
    if(b.r = this.ba) {
      this.ba.pa = b
    }
    this.ba = b;
    this.Ia++;
    b.Ra.bc = b;
    b.Ra.V = b.Ha;
    b.Ra.$ = q;
    if(b.Ra.next = b.Ga.ba) {
      b.Ga.ba.$ = b.Ra
    }
    b.Ga.ba = b.Ra;
    b.Sa.bc = b;
    b.Sa.V = b.Ga;
    b.Sa.$ = q;
    if(b.Sa.next = b.Ha.ba) {
      b.Ha.ba.$ = b.Sa
    }
    b.Ha.ba = b.Sa;
    var b = a.fa, c = a.ga;
    if(!a.Ig) {
      for(a = c.R;a;) {
        if(a.V == b) {
          a.la.Ce = !0
        }
        a = a.next
      }
    }
  };
  a.prototype.Eh = function(a) {
    var b = a.Xg;
    if(a.pa) {
      a.pa.r = a.r
    }
    if(a.r) {
      a.r.pa = a.pa
    }
    if(a == this.ba) {
      this.ba = a.r
    }
    var c = a.Ga, f = a.Ha;
    V(c, !0);
    V(f, !0);
    if(a.Ra.$) {
      a.Ra.$.next = a.Ra.next
    }
    if(a.Ra.next) {
      a.Ra.next.$ = a.Ra.$
    }
    if(a.Ra == c.ba) {
      c.ba = a.Ra.next
    }
    a.Ra.$ = q;
    a.Ra.next = q;
    if(a.Sa.$) {
      a.Sa.$.next = a.Sa.next
    }
    if(a.Sa.next) {
      a.Sa.next.$ = a.Sa.$
    }
    if(a.Sa == f.ba) {
      f.ba = a.Sa.next
    }
    a.Sa.$ = q;
    a.Sa.next = q;
    this.Ia--;
    if(!b) {
      for(a = f.R;a;) {
        if(a.V == c) {
          a.la.Ce = !0
        }
        a = a.next
      }
    }
  };
  a.prototype.xg = function(d, b, c) {
    d === i && (d = 0);
    b === i && (b = 0);
    c === i && (c = 0);
    if(this.Qf) {
      xd(this.Aa), this.Qf = !1
    }
    this.Yc = !0;
    var f = new Qc;
    f.aa = d;
    f.Kd = b;
    f.Ed = c;
    f.tb = d > 0 ? 1 / d : 0;
    f.Zb = this.dh * d;
    f.Ld = a.zj;
    d = this.Aa;
    for(b = d.Ja.R;b;) {
      var c = b.D, e = b.H, g = c.p, h = e.p;
      if(g.ub == !1 && h.ub == !1) {
        b = b.r
      }else {
        if(b.Ce) {
          if(h.Hb(g) == !1) {
            c = b;
            b = c.r;
            d.oc(c);
            continue
          }
          if(d.Lf.Hb(c, e) == !1) {
            c = b;
            b = c.r;
            d.oc(c);
            continue
          }
          b.Ce = !1
        }
        d.Wc.Vb(c.yc, e.yc) == !1 ? (c = b, b = c.r, d.oc(c)) : (Mc(b, d.yd), b = b.r)
      }
    }
    if(f.aa > 0) {
      this.Zd(f), a.lj && f.aa > 0 && this.of(f), this.dh = f.tb
    }
    this.Yc = !1
  };
  a.prototype.yh = function() {
    for(var a = this.$a;a;a = a.r) {
      a.ie.ea(), a.Sf = 0
    }
  };
  a.prototype.Fh = function() {
    if(this.Ba !== q) {
      this.Ba.xj.Ui.clear();
      var d = this.Ba.Zg;
      if(d & Y.Og) {
        for(var b = new X(0.5, 0.5, 0.3), c = new X(0.5, 0.9, 0.5), f = new X(0.5, 0.5, 0.9), e = new X(0.6, 0.6, 0.6), g = new X(0.9, 0.7, 0.7), h = this.$a;h;h = h.r) {
          for(var k = h.fc;k;k = k.r) {
            var j = k.ja;
            h.Tb() ? h.N() == T ? this.Rd(j, h.i, c) : h.N() == 1 ? this.Rd(j, h.i, f) : h.ub ? this.Rd(j, h.i, g) : this.Rd(j, h.i, e) : this.Rd(j, h.i, b)
          }
        }
      }
      if(d & Y.Ei) {
        for(h = this.ba;h;h = h.r) {
          this.Gh(h)
        }
      }
      if(d & Y.Di) {
        for(h = this.He;h;h = h.r) {
          h.dk(this.Ba)
        }
      }
      if(d & Y.Fi) {
        h = new X(0.3, 0.9, 0.9);
        for(k = this.Aa.R;k;k = k.r) {
          this.Ba.Sb(hc(k.D.dc), hc(k.H.dc), h)
        }
      }
      if(d & Y.Ng) {
        b = new X(0, 0, 0.8);
        for(h = this.$a;h;h = h.r) {
          if(h.Tb()) {
            for(k = h.fc;k;k = k.r) {
              c = this.Aa.Wc.jd(k.yc), this.Ba.Hh([new F(c.lowerBound.x, c.lowerBound.y), new F(c.upperBound.x, c.lowerBound.y), new F(c.upperBound.x, c.upperBound.y), new F(c.lowerBound.x, c.upperBound.y)], b)
            }
          }
        }
      }
      if(d & Y.Ci) {
        for(h = this.$a;h;h = h.r) {
          a.gg.d = h.i.d, a.gg.position = h.c.h, this.Ba.Kh(a.gg)
        }
      }
    }
  };
  a.prototype.Zd = function(a) {
    for(var b = this.He;b;b = b.r) {
      b.xg(a)
    }
    this.U.xa(this.za, this.ab, this.Ia, this.Aa.yd, this.Xc);
    for(var c = this.$a;c;c = c.r) {
      c.W = !1
    }
    for(b = this.R;b;b = b.r) {
      b.W = !1
    }
    for(b = this.ba;b;b = b.r) {
      b.W = !1
    }
    for(b = this.$a;b;b = b.r) {
      if(!b.W && b.ub && b.Tb() && b.N() != T) {
        var f = this.U;
        f.za = 0;
        f.ab = 0;
        f.Ia = 0;
        f = [];
        f.push(b);
        for(b.W = !0;f.length > 0;) {
          var c = f.pop(), e = this.U, g = c;
          g.rj = e.za;
          e.Wa[e.za++] = g;
          c.ub || V(c, !0);
          if(c.N() != T) {
            for(e = c.R;e;e = e.next) {
              if(!e.la.W && !e.la.Ub() && e.la.enabled != !1 && e.la.ed) {
                var g = this.U, h = e.la;
                g.vc[g.ab++] = h;
                e.la.W = !0;
                if(!e.V.W) {
                  f.push(e.V), e.V.W = !0
                }
              }
            }
            for(c = c.ba;c;c = c.next) {
              if(!c.bc.W && c.V.Tb() && (e = this.U, g = c.bc, e.Db[e.Ia++] = g, c.bc.W = !0, !c.V.W)) {
                f.push(c.V), c.V.W = !0
              }
            }
          }
        }
        this.U.Zd(a, this.nj, this.Kf);
        for(f = 0;f < this.U.za;++f) {
          if(this.U.Wa[f].N() == T) {
            this.U.Wa[f].W = !1
          }
        }
      }
    }
    for(c = this.$a;c;c = c.r) {
      c.ub && c.Tb() && c.N() != T && Jd(c)
    }
    xd(this.Aa)
  };
  a.prototype.of = function(d) {
    this.U.xa(this.za, 32, 32, this.Aa.yd, this.Xc);
    for(var b = this.$a;b;b = b.r) {
      b.W = !1, b.c.ra = 0
    }
    for(var c = this.R;c;c = c.r) {
      c.W = !1, c.Ad = q
    }
    for(c = this.ba;c;c = c.r) {
      c.W = !1
    }
    for(;;) {
      var c = this.hi(), f = c.Dj, c = c.Ej;
      if(f === q || a.Qh < c) {
        break
      }
      a.mh.j(f.D.p.c);
      a.nh.j(f.H.p.c);
      f.D.p.nc(c);
      f.H.p.nc(c);
      Mc(f, this.Aa.yd);
      f.Ad = q;
      if(f.Ub() || f.enabled == !1) {
        f.D.p.c.j(a.mh), f.H.p.c.j(a.nh), O(f.D.p), O(f.H.p)
      }else {
        if(f.ed) {
          b = f.D.p;
          if(b.N() != 2) {
            b = f.H.p
          }
          f = this.U;
          f.za = 0;
          f.ab = 0;
          f.Ia = 0;
          f = new Md;
          Nd(f, b);
          for(b.W = !0;f.size > 0;) {
            var b = f, e = b.Zf[b.start];
            b.Zf[b.start] = q;
            b.size--;
            b.start++;
            var b = e, e = this.U, g = b;
            g.rj = e.za;
            e.Wa[e.za++] = g;
            b.ub || V(b, !0);
            if(b.N() == 2) {
              for(e = b.R;e;e = e.next) {
                if(this.U.ab == this.U.Ak) {
                  break
                }
                if(!e.la.W && !e.la.Ub() && e.la.enabled != !1 && e.la.ed) {
                  var g = this.U, h = e.la;
                  g.vc[g.ab++] = h;
                  e.la.W = !0;
                  if(!e.V.W) {
                    e.V.N() != T && (e.V.nc(c), V(e.V, !0)), Nd(f, e.V), e.V.W = !0
                  }
                }
              }
              for(b = b.ba;b;b = b.next) {
                if(this.U.Ia != this.U.Ck && !b.bc.W && b.V.Tb() && (e = this.U, g = b.bc, e.Db[e.Ia++] = g, b.bc.W = !0, !b.V.W)) {
                  b.V.N() != T && (b.V.nc(c), V(b.V, !0)), Nd(f, b.V), b.V.W = !0
                }
              }
            }
          }
          f = new Qc;
          f.Ld = !1;
          f.aa = (1 - c) * d.aa;
          f.tb = 1 / f.aa;
          f.Zb = 0;
          f.Kd = d.Kd;
          f.Ed = d.Ed;
          this.U.of(f);
          for(c = 0;c < this.U.za;c++) {
            if(this.U.Wa[c].W = !1, this.U.Wa[c].ub && this.U.Wa[c].N() == 2) {
              Jd(this.U.Wa[c]);
              for(e = this.U.Wa[c].R;e;e = e.next) {
                e.la.Ad = q
              }
            }
          }
          for(c = 0;c < this.U.ab;c++) {
            this.U.vc[c].W = !1, this.U.vc[c].Ad = q
          }
          for(c = 0;c < this.U.Ia;c++) {
            this.U.Db[c].W = !1
          }
          xd(this.Aa)
        }
      }
    }
  };
  a.prototype.hi = function() {
    for(var a = q, b = 1, c = this.R;c;c = c.r) {
      if(!this.ii(c)) {
        var f = 1;
        if(c.Ad != q) {
          f = c.Ad
        }else {
          if(c.ed) {
            f = 1
          }else {
            var e = c.D.p.c.ra;
            if(c.D.p.c.ra < c.H.p.c.ra) {
              e = c.H.p.c.ra, c.D.p.c.nc(e)
            }else {
              if(c.H.p.c.ra < c.D.p.c.ra) {
                e = c.D.p.c.ra, c.H.p.c.nc(e)
              }
            }
            var f = c, g = c.D.p.c, h = c.H.p.c;
            Nc.jb.j(f.D.ja);
            Nc.kb.j(f.H.ja);
            Nc.rh = g;
            Nc.sh = h;
            Nc.Zj = 0.005;
            var k = Nc;
            yc++;
            var f = k.jb, g = k.kb, h = k.rh, j = k.sh;
            H(h.ra == j.ra);
            H(1 - h.ra > Number.MIN_VALUE);
            var o = f.P + g.P, k = k.Zj, n = 0, s = 0, p = 0;
            Dc.count = 0;
            for(Ec.uh = !1;;) {
              h.zb(Fc, n);
              j.zb(Gc, n);
              Ec.jb = f;
              Ec.kb = g;
              Ec.Ze = Fc;
              Ec.$e = Gc;
              ac.og(Ic, Dc, Ec);
              if(Ic.sd <= 0) {
                n = 1;
                break
              }
              Hc.xa(Dc, f, Fc, g, Gc);
              var v = Hc.Gb(Fc, Gc);
              if(v <= 0) {
                n = 1;
                break
              }
              s == 0 && (p = v > o ? Math.max(o - k, 0.75 * o) : Math.max(v - k, 0.02 * o));
              if(v - p < 0.5 * k) {
                if(s == 0) {
                  n = 1;
                  break
                }
                break
              }
              var u = n, w = n, y = 1;
              h.zb(Fc, y);
              j.zb(Gc, y);
              var N = Hc.Gb(Fc, Gc);
              if(N >= p) {
                n = 1;
                break
              }
              for(var C = 0;;) {
                var l = 0, l = C & 1 ? w + (p - v) * (y - w) / (N - v) : 0.5 * (w + y);
                h.zb(Fc, l);
                j.zb(Gc, l);
                var m = Hc.Gb(Fc, Gc);
                if(Math.abs(m - p) < 0.025 * k) {
                  u = l;
                  break
                }
                m > p ? (w = l, v = m) : (y = l, N = m);
                C++;
                Bc++;
                if(C == 50) {
                  break
                }
              }
              Cc = Math.max(Cc, C);
              if(u < (1 + 100 * Number.MIN_VALUE) * n) {
                break
              }
              n = u;
              s++;
              zc++;
              if(s == 1E3) {
                break
              }
            }
            Ac = Math.max(Ac, s);
            f = n;
            H(0 <= f && f <= 1);
            f > 0 && f < 1 && (f = (1 - f) * e + f)
          }
          c.Ad = f
        }
        Number.MIN_VALUE < f && f < b && (a = c, b = f)
      }
    }
    return{Dj:a, Ej:b}
  };
  a.prototype.ii = function(a) {
    return a.Ub() || a.enabled == !1 || !a.zf ? !0 : (a.D.p.N() != 2 || !a.D.p.ub) && (a.H.p.N() != 2 || !a.H.p.ub) ? !0 : !1
  };
  a.prototype.Gh = function(d) {
    d.J == 3 || d.J == 5 ? this.Ba.Sb(d.gd(), d.hd(), a.dd) : d.J == 4 ? (this.Ba.Sb(d.Mh(), d.gd(), a.dd), this.Ba.Sb(d.Nh(), d.hd(), a.dd), this.Ba.Sb(d.Mh(), d.Nh(), a.dd)) : (d.Ga != this.bh && this.Ba.Sb(d.Ga.i.position, d.gd(), a.dd), this.Ba.Sb(d.gd(), d.hd(), a.dd), d.Ha != this.bh && this.Ba.Sb(d.Ha.i.position, d.hd(), a.dd))
  };
  a.prototype.Rd = function(a, b, c) {
    switch(a.J) {
      case P.Sc:
        this.Ba.Ih(I(b, a.X), a.P, b.d.a, c);
        break;
      case P.tc:
        for(var f = 0, e = parseInt(a.rg()), a = a.k, g = Array(e), f = 0;f < e;++f) {
          g[f] = I(b, a[f])
        }
        this.Ba.Jh(g, e, c);
        break;
      case P.Be:
        this.Ba.Sb(I(b, a.fk()), I(b, a.gk()), c)
    }
  };
  Ld.gg = new xc;
  Ld.mh = new Rb;
  Ld.nh = new Rb;
  Ld.dd = new X(0.5, 0.8, 0.8)
})(Ld);
function Od() {
  P.call(this);
  this.J = P.tc;
  this.vb = new F(0, 0);
  this.k = [];
  this.ca = []
}
A(Od, P);
x = Od.prototype;
x.Fa = function() {
  var a = new Od;
  a.j(this);
  return a
};
x.j = function(a) {
  P.prototype.j.call(this, a);
  if(a instanceof Od) {
    this.vb.m(a.vb);
    this.Y = a.Y;
    Pd(this, this.Y);
    for(var d = 0;d < this.Y;d++) {
      this.k[d].m(a.k[d]), this.ca[d].m(a.ca[d])
    }
  }
};
function Qd(a, d, b) {
  b === i && (b = 0);
  for(var c = [], f = 0, e, f = 0;f < d.length;++f) {
    e = d[f], c.push(e)
  }
  d = b;
  d === i && (d = 0);
  if(d == 0) {
    d = c.length
  }
  H(2 <= d);
  a.Y = d;
  Pd(a, d);
  for(d = d = 0;d < a.Y;d++) {
    a.k[d].m(c[d])
  }
  for(d = 0;d < a.Y;++d) {
    c = J(a.k[d + 1 < a.Y ? d + 1 : 0], a.k[d]), H(zb(c) > Number.MIN_VALUE), a.ca[d].m(Jb(c)), G(a.ca[d])
  }
  c = a.k;
  d = a.Y;
  d === i && (d = 0);
  b = new F(0, 0);
  f = 0;
  e = 1 / 3;
  for(var g = 0;g < d;++g) {
    var h = c[g], k = g + 1 < d ? c[g + 1] : c[0], j = 0.5 * ((h.x - 0) * (k.y - 0) - (h.y - 0) * (k.x - 0));
    f += j;
    b.x += j * e * (0 + h.x + k.x);
    b.y += j * e * (0 + h.y + k.y)
  }
  b.x *= 1 / f;
  b.y *= 1 / f;
  a.vb = b
}
function Rd(a, d, b) {
  d === i && (d = 0);
  b === i && (b = 0);
  a.Y = 4;
  Pd(a, 4);
  a.k[0].j(-d, -b);
  a.k[1].j(d, -b);
  a.k[2].j(d, b);
  a.k[3].j(-d, b);
  a.ca[0].j(0, -1);
  a.ca[1].j(1, 0);
  a.ca[2].j(0, 1);
  a.ca[3].j(-1, 0);
  a.vb.ea()
}
x.Od = function(a, d) {
  for(var b = d.d, c = this.k[0], f = d.position.x + (b.a.x * c.x + b.b.x * c.y), e = d.position.y + (b.a.y * c.x + b.b.y * c.y), g = f, h = e, k = 1;k < this.Y;++k) {
    var c = this.k[k], j = d.position.x + (b.a.x * c.x + b.b.x * c.y), c = d.position.y + (b.a.y * c.x + b.b.y * c.y), f = f < j ? f : j, e = e < c ? e : c, g = g > j ? g : j, h = h > c ? h : c
  }
  a.lowerBound.x = f - this.P;
  a.lowerBound.y = e - this.P;
  a.upperBound.x = g + this.P;
  a.upperBound.y = h + this.P
};
x.df = function(a, d) {
  d === i && (d = 0);
  if(this.Y == 2) {
    a.Pc.x = 0.5 * (this.k[0].x + this.k[1].x), a.Pc.y = 0.5 * (this.k[0].y + this.k[1].y), a.Bc = 0, a.Td = 0
  }else {
    for(var b = 0, c = 0, f = 0, e = 0, g = 1 / 3, h = 0;h < this.Y;++h) {
      var k = this.k[h], j = h + 1 < this.Y ? this.k[h + 1] : this.k[0], o = k.x - 0, n = k.y - 0, s = j.x - 0, p = j.y - 0, v = o * p - n * s, u = 0.5 * v;
      f += u;
      b += u * g * (0 + k.x + j.x);
      c += u * g * (0 + k.y + j.y);
      k = o;
      e += v * (g * (0.25 * (k * k + s * k + s * s) + (0 * k + 0 * s)) + 0 + (g * (0.25 * (n * n + p * n + p * p) + (0 * n + 0 * p)) + 0))
    }
    a.Bc = d * f;
    b *= 1 / f;
    c *= 1 / f;
    a.Pc.j(b, c);
    a.Td = d * e
  }
};
x.nf = function(a) {
  a.k = this.k;
  a.t = this.Y;
  a.P = this.P
};
x.rg = t("Y");
x.ve = function(a) {
  for(var d = 0, b = this.k[0].x * a.x + this.k[0].y * a.y, c = 1;c < this.Y;++c) {
    var f = this.k[c].x * a.x + this.k[c].y * a.y;
    f > b && (d = c, b = f)
  }
  return d
};
x.Sd = function(a) {
  for(var d = 0, b = this.k[0].x * a.x + this.k[0].y * a.y, c = 1;c < this.Y;++c) {
    var f = this.k[c].x * a.x + this.k[c].y * a.y;
    f > b && (d = c, b = f)
  }
  return this.k[d]
};
function Pd(a, d) {
  d === i && (d = 0);
  for(var b = a.k.length;b < d;b++) {
    a.k[b] = new F(0, 0), a.ca[b] = new F(0, 0)
  }
}
new Gb;
function yd() {
  this.position = new F;
  this.Rk = new F;
  this.jc = new F;
  this.id = new qc
}
;function Md() {
  this.Zf = [];
  this.start = this.size = 0
}
function Nd(a, d) {
  a.Zf[a.start + a.size] = d;
  a.size++
}
;E.g = {};
(function(a) {
  function d(a, b) {
    var a = a || {}, c = {}, d;
    for(d in b) {
      c[d] = a[d] === i || a[d] === q ? b[d] : a[d]
    }
    return c
  }
  var b = new Dd, c = new Jc, f = {pd:0.1, gb:0.6, Qb:0.01, de:!1}, e = {td:!1, pb:0, type:2};
  a.g = function(a, b, c) {
    this.$f = [];
    this.ya = [];
    this.Jk = 0;
    this.Wf = {};
    this.w = a;
    this.Va = new F(b.x, b.y);
    this.qb = new Ld(c, !0);
    this.qb.Yh(this);
    this.qb.Zh(this);
    this.top = this.Pa(new F(this.Va.x + 2, 2), new F(this.Va.x / 2, -1), !1, q, {gb:0});
    this.bottom = this.Pa(new F(this.Va.x + 2, 2), new F(this.Va.x / 2, this.Va.y + 1), !1, q, {gb:0});
    this.left = this.Pa(new F(2, this.Va.y + 2), new F(-1, this.Va.y / 2), !1, q, {gb:0});
    this.right = this.Pa(new F(2, this.Va.y + 2), new F(this.Va.x + 1, this.Va.y / 2), !1, q, {gb:0})
  };
  a.g.prototype.update = function(a, b) {
    this.qb.xg(b, 10, 10);
    this.qb.yh();
    var c = this.$f;
    this.$f = [];
    if(c.length > 0) {
      for(var d = 0;d < c.length;d++) {
        c[d].call(this)
      }
    }
  };
  a.g.prototype.li = function(a) {
    this.ya.push(a)
  };
  a.g.prototype.Hb = function(a, b) {
    if(!a.Ub() && !b.Ub()) {
      for(var c = 0;c < this.ya.length;c++) {
        if(this.ya[c].Hb && !this.ya[c].Hb(a, b)) {
          return!1
        }
      }
    }
    return nd.prototype.Hb(a, b)
  };
  a.g.prototype.Nd = function(a) {
    for(var b = 0;b < this.ya.length;b++) {
      this.ya[b].yg && this.ya[b].yg(a);
      if(a.disabled) {
        a.enabled = !1
      }
      this.ya[b].Nd && this.ya[b].Nd(a)
    }
  };
  a.g.prototype.fd = function(a) {
    for(var b = 0;b < this.ya.length;b++) {
      this.ya[b].fd && this.ya[b].fd(a)
    }
    a.disabled = !1;
    a.enabled = !0
  };
  a.g.prototype.Yd = function(a, b) {
    if(a.disabled) {
      a.enabled = !1
    }
    for(var c = 0;c < this.ya.length;c++) {
      this.ya[c].Yd && this.ya[c].Yd(a, b)
    }
  };
  a.g.prototype.Xd = function(a, b) {
    for(var c = 0;c < this.ya.length;c++) {
      this.ya[c].Xd && this.ya[c].Xd(a, b)
    }
  };
  a.g.prototype.Qg = function() {
    return c
  };
  a.g.prototype.ma = function(b, c, d) {
    d = d || 0;
    b = this.Cg(b, c, !0);
    b.display.jg = a.M.viewport.ik.lk + d;
    return b
  };
  a.g.prototype.Pa = function(a, b, c, d, f) {
    d = d || {};
    d.type = T;
    return this.Bf(a, b, c, d, f)
  };
  a.g.prototype.Bf = function(a, b, c, d, f) {
    var e = new Od;
    Rd(e, a.x / 2, a.y / 2);
    return this.Bb(a, b, c, e, {nd:d, $b:f})
  };
  a.g.prototype.yi = function(a, b) {
    var c = new Od, d = new F(a.x / 2, a.y / 2);
    Qd(c, [new F(0, d.y), new F(-d.x + 0.01, d.y - 0.01), new F(-d.x, 0), new F(-d.x + 0.01, -d.y + 0.01), new F(0, -d.y), new F(d.x - 0.01, -d.y + 0.01), new F(d.x, 0), new F(d.x - 0.01, d.y - 0.01)]);
    return this.Bb(a, b, !0, c, {nd:{td:!0}, $b:{Qb:0}})
  };
  a.g.prototype.qf = function(a) {
    this.qb.Yc ? this.$f.push(a) : a.apply(this)
  };
  a.g.prototype.Bb = function(a, b, c, d, f) {
    var e = this.Cg(a, b, c);
    f.Nk || this.qf(function() {
      this.ji(e, b, d, f)
    });
    return e
  };
  a.g.prototype.Cg = function(b, c, d) {
    c = new a.wk(c);
    this.Wf[c.fi] = c;
    d !== !1 && Sd(c, b);
    return c
  };
  a.g.prototype.ji = function(a, b, f, j) {
    var j = j || {}, o = d(j.nd, e);
    c.type = o.type;
    c.pb = o.pb;
    c.td = o.td;
    c.position = b;
    b = this.qb.lg(c);
    fixture = this.Eg(b, f, j);
    a.body = b;
    a.Mi = fixture;
    b.object = a
  };
  a.g.prototype.Eg = function(a, c, e) {
    e = e || {};
    e = d(e.$b, f);
    b.pd = e.pd;
    b.gb = e.gb;
    b.Qb = e.Qb;
    b.de = e.de;
    b.shape = c;
    if(a.Ja.Yc == !0) {
      a = q
    }else {
      c = new Tc;
      c.Gc(a, a.i, b);
      a.Lb & Gd && c.Pd(a.Ja.Aa.Wc, a.i);
      c.r = a.fc;
      a.fc = c;
      a.ah++;
      c.p = a;
      if(c.Ie > 0 && (a.n = 0, a.z = 0, a.cc = 0, a.O = 0, a.c.u.ea(), !(a.J == T || a.J == 1))) {
        for(var e = new F(0, 0), j = a.fc;j;j = j.r) {
          if(j.Ie != 0) {
            var o = j.qg();
            a.n += o.Bc;
            e.x += o.Pc.x * o.Bc;
            e.y += o.Pc.y * o.Bc;
            a.cc += o.Td
          }
        }
        a.n > 0 ? (a.z = 1 / a.n, e.x *= a.z, e.y *= a.z) : (a.n = 1, a.z = 1);
        a.cc > 0 && (a.Lb & Fd) == 0 ? (a.cc -= a.n * (e.x * e.x + e.y * e.y), a.cc *= a.oj, H(a.cc > 0), a.O = 1 / a.cc) : (a.cc = 0, a.O = 0);
        j = a.c.h.Fa();
        a.c.u.m(e);
        a.c.sa.m(I(a.i, a.c.u));
        a.c.h.m(a.c.sa);
        a.q.x += a.G * -(a.c.h.y - j.y);
        a.q.y += a.G * +(a.c.h.x - j.x)
      }
      a.Ja.Qf = !0;
      a = c
    }
    return a
  };
  a.g.prototype.Kg = function(a) {
    this.qf(function() {
      a.body && this.qb.Dh(a.body);
      delete this.Wf[a.fi]
    })
  };
  a.g.prototype.Gj = function(a, b) {
    this.qf(function() {
      a.Ok(b)
    })
  }
})(E);
function Td(a, d, b, c, f) {
  this.Yb = {};
  this.w = a;
  this.xb = c;
  this.Rb = new F(c.x / b, c.y / b);
  this.scale = b;
  this.ka = new F(0, 0);
  this.Ee = new F(-1, -1);
  this.vh = this.w.g.Pa(new F(this.Rb.x * Ud, this.Rb.y * Ud), new F(0, 0), !1, q, {de:!0});
  Vd(this, new F(0, 0));
  a = document.getElementById(d);
  this.Rc = document.createElement("span");
  if(f) {
    a.innerHTML = '<div style="width: ' + this.xb.x + "px; height: " + this.xb.y / 2 + 'px; background-color: #000; opacity: 0.15; position: absolute;"></div><div style="width: ' + this.xb.x / 2 + "px; height: " + this.xb.y + 'px; background-color: #FFF; opacity: 0.15; position: absolute;"></div>', this.Rc.innerHTML = '<canvas id="' + d + '__DEBUG" class="debugViewport"></canvas>'
  }
  this.Rc.className = "viewportContainer";
  this.Rc.style.width = this.xb.x + "px";
  this.Rc.style.height = this.xb.y + "px";
  this.display = document.createElement("span");
  this.display.className = "viewport";
  this.Rc.appendChild(this.display);
  a.appendChild(this.Rc);
  this.Jf = document.createElement("div");
  this.Jf = Wd(this, "Loading, please wait.");
  Xd(this.Jf);
  this.jh = Wd(this, "Paused");
  f ? (this.Za = document.getElementById(d + "__DEBUG"), this.Za.width = this.w.g.Va.x * b, this.Za.height = this.w.g.Va.y * b, this.Za.style.marginRight = "-" + this.Za.width + "px", this.Za.style.marginBottom = "-" + this.Za.height + "px", d = new Y, d.ei(this.Za.getContext("2d")), d.ai(b), d.bi(), d.di(), d.ci(), this.w.g.qb.$h(d)) : this.Za = q
}
function Wd(a, d) {
  var b = document.createElement("div");
  b.style.fontSize = "40px";
  b.style.textAlign = "center";
  b.style.verticalAlign = "middle";
  b.style.backgroundColor = "rgba(255,255,255,0.5)";
  b.style.color = "black";
  b.style.position = "relative";
  b.style.display = "none";
  b.style.zIndex = Yd + Zd;
  b.innerHTML = d;
  b.style.width = a.xb.x + "px";
  b.style.height = a.xb.y + "px";
  a.Rc.appendChild(b);
  return b
}
function Xd(a) {
  if(a.style.display == "none") {
    a.style.display = $d
  }
}
function ae(a) {
  if(a.style.display != "none") {
    a.style.display = "none"
  }
}
function Vd(a, d) {
  a.ka.x = d.x;
  a.ka.y = d.y;
  if(a.ka.x < a.Rb.x / 2) {
    a.ka.x = a.Rb.x / 2
  }else {
    if(a.ka.x > a.w.g.Va.x - a.Rb.x / 2) {
      a.ka.x = a.w.g.Va.x - a.Rb.x / 2
    }
  }
  if(a.ka.y < a.Rb.y / 2) {
    a.ka.y = a.Rb.y / 2
  }else {
    if(a.ka.y > a.w.g.Va.y - a.Rb.y / 2) {
      a.ka.y = a.w.g.Va.y - a.Rb.y / 2
    }
  }
}
function Sd(a, d) {
  if(a.display == q) {
    a.display = {}, a.display.C = new gc, a.Si = function(a) {
      var c = this.yk();
      return this.display.Pe == 0 ? c : new F(c.x + (a.x - c.x) * this.display.Pe, c.y + (a.y - c.y) * this.display.Pe)
    }, a.Ri = function() {
      return this.xk()
    }, a.display.Pe = 0, a.display.jg = 0
  }
  a.display.size = d.Fa()
}
function Z(a, d, b) {
  a.display.Xe = new Ab(d, b)
}
var Ud = 1.25, Yd = 100, Zd = 100, $d = "table-cell", md = 0 | Y.Ng | Y.Og, be = 0;
function ce(a) {
  this.w = a
}
function de(a, d, b, c, f) {
  var e = new F(4, 4);
  Sd(d.body, b);
  Z(d, "../external-resources/graphics/urbansquall_tileset/characters/princess_AP.png", c);
  d.display.Xe = new Ab("../external-resources/graphics/urbansquall_tileset/characters/princess_AP.png", c, e, f);
  d.display.Wb = {};
  d.display.Wb.vk = f;
  d.display.Wb.Pi = 4;
  d.display.Wb.uc = 0;
  d.display.Wb.fb = {l:ee, x:ee, y:fe};
  a = a.w.Fg;
  b = ce.Oi;
  if(typeof b != "function") {
    throw"Thought not a function!";
  }
  d.Ye = d.Ye || [];
  d.Ye.push(b);
  a = a.ig;
  Ga(a, d) >= 0 || a.push(d)
}
var ee = 0, fe = 2;
(function(a) {
  a.Oi = function(d, b) {
    a.Ni(b, this)
  };
  a.Ni = function(a, b) {
    var c = b.display.Wb;
    c.uc += a;
    var f = new F(1, 1), e = b.body.q, g = Math.abs(e.x), h = Math.abs(e.y);
    if(h < 0.01 || g >= h) {
      if(e.x > 0.01) {
        if(c.fb.x = ee, c.fb.l != ee) {
          c.fb.l = ee, c.uc = 0
        }
      }else {
        if(e.x < -0.01) {
          if(c.fb.x = 1, c.fb.l != 1) {
            c.fb.l = 1, c.uc = 0
          }
        }else {
          c.uc = 0
        }
      }
      f.y = c.fb.x == 1 ? 4 : 2
    }else {
      if(e.y > 0.01) {
        c.fb.y = 3;
        if(c.fb.l != 3) {
          c.fb.l = 3, c.uc = 0
        }
        f.y = 3
      }else {
        c.fb.y = fe;
        if(c.fb.l != fe) {
          c.fb.l = fe, c.uc = 0
        }
        f.y = 1
      }
    }
    f.x = c.uc == 0 ? 1 : Math.floor(c.uc * c.Pi);
    c = b.display.Xe;
    c.lb = f.Fa();
    c.lb.x %= c.Ve.x;
    c.lb.y %= c.Ve.y;
    if(c.lb.x === 0) {
      c.lb.x = c.Ve.x
    }
    if(c.lb.y === 0) {
      c.lb.y = c.Ve.y
    }
  };
  a.sk = function() {
    a.Hi()
  };
  a.Hi = function() {
    var a = illandril.w.M.La.Ma.ug, b = Math.abs(directionVector.x), c = Math.abs(directionVector.y), a = b > 2 * c ? directionVector.x > 0 ? illandril.w.M.La.Ma.E : illandril.w.M.La.Ma.gi : c > 2 * b ? directionVector.y < 0 ? illandril.w.M.La.Ma.Vh : illandril.w.M.La.Ma.ug : directionVector.y < 0 ? directionVector.x > 0 ? illandril.w.M.La.Ma.Wh : illandril.w.M.La.Ma.Xh : directionVector.x > 0 ? illandril.w.M.La.Ma.Rh : illandril.w.M.La.Ma.Sh;
    if(a != this.gj) {
      this.ze = 0, this.gj = a
    }
    b = 0;
    c = Math.round((this.ze + 1) / this.gh);
    speedVector.Pk() != 0 || this.Vg != 0 ? (this.ze += tickTime, this.Vg = c) : c = this.Vg = this.ze = 0;
    switch(a) {
      case illandril.w.M.La.Ma.ug:
        b = 0;
        break;
      case illandril.w.M.La.Ma.Rh:
        b = 0;
        c += this.frames;
        break;
      case illandril.w.M.La.Ma.E:
        b = 1;
        break;
      case illandril.w.M.La.Ma.Wh:
        b = 1;
        c += this.frames;
        break;
      case illandril.w.M.La.Ma.Vh:
        b = 2;
        break;
      case illandril.w.M.La.Ma.Xh:
        b = 2;
        c += this.frames;
        break;
      case illandril.w.M.La.Ma.gi:
        b = 3;
        break;
      case illandril.w.M.La.Ma.Sh:
        b = 3, c += this.frames
    }
    a = b * this.Xj;
    isNaN(c * this.Yj) && illandril.Ch && illandril.Ti("game.ui.BasicDirectionalAnimation").Uj("BAD SPRITE X -- sX: " + c + "; DT: " + this.ze + "; MSPF: " + this.gh + "; Width: " + this.Yj);
    isNaN(a) && illandril.Ch && illandril.Ti("game.ui.SpriteSheet").Uj("BAD SPRITE Y -- sY: " + b + "; GT: " + gameTime + "; MSPF: " + this.gh + "; Height: " + this.Xj)
  }
})(ce);
var window = {}, ge = window.Lk || window.Sk || window.Gk || window.Kk || window.Hk || function(a) {
  window.setTimeout(a, 1E3 / 60)
};
function he(a, d, b, c, f, e, g) {
  this.Dc = a;
  this.paused = !1;
  this.te = 0;
  this.Fg = new yb;
  this.Wb = new ce(this);
  this.g = new E.g(this, b, c);
  this.viewport = new Td(this, d, e, f, g)
}
function ie(a) {
  if(a.Tg === q) {
    a.Tg = new Date
  }
  var d = new Date - a.Tg >= 5E3;
  E.M.Xi() && !d ? setTimeout(function() {
    ie(a)
  }, 50) : (d && alert("It appears to be taking a long time to load the game's images. You may experience some invisible objects until they finish loading, but the game will now start."), a.start())
}
he.prototype.update = function(a, d) {
  if(this.paused) {
    this.te = 0, Xd(this.viewport.jh), this.Dc.bf && this.Dc.bf(a, d)
  }else {
    this.Dc.Re && this.Dc.Re(a, d);
    for(var b = this.Fg, c = 0;c < b.ig.length;c++) {
      for(var f = b.ig[c], e = 0;e < f.Ye.length;e++) {
        f.Ye[e].apply(f, [a, d])
      }
    }
    this.te += d;
    b = a - this.te;
    for(c = je;this.te >= c;) {
      this.te -= c, b += c, this.Dc.Oj && this.Dc.Oj(b, c), this.g.update(b, c)
    }
    this.Dc.Qe && this.Dc.Qe(a, d);
    ae(this.viewport.jh);
    b = this.viewport;
    b.display.style.visibility = "hidden";
    if(b.Ee.x != b.ka.x || b.Ee.y != b.ka.y) {
      b.Ee.x = b.ka.x;
      b.Ee.y = b.ka.y;
      if(b.Za !== q) {
        b.Za.style.left = "-" + (b.ka.x * b.scale - b.xb.x / 2) + "px", b.Za.style.top = "-" + (b.ka.y * b.scale - b.xb.y / 2) + "px"
      }
      b.display.style.left = "-" + (b.ka.x * b.scale - b.xb.x / 2) + "px";
      b.display.style.top = "-" + (b.ka.y * b.scale - b.xb.y / 2) + "px";
      c = b.vh.body;
      Hd(c, new F(b.ka.x, b.ka.y), c.Ic())
    }
    var c = [], g;
    for(g in b.Yb) {
      c[g] = b.Yb[g]
    }
    g = b.vh.Mi.dc;
    var f = b.w.g.Wf, h;
    for(h in f) {
      var k = f[h];
      if(k.display) {
        var j = k.display, o = k.Si(b.ka), n = j.size;
        j.C.lowerBound.j(o.x - n.x, o.y - n.y);
        j.C.upperBound.j(o.x + n.x, o.y + n.y);
        if(g.Vb(j.C)) {
          if(j.Fc == q) {
            j.Fc = be++
          }
          delete c[j.Fc];
          if(b.Yb[j.Fc] == q) {
            b.Yb[j.Fc] = document.createElement("span"), b.Yb[j.Fc].className = "gameObject", b.Yb[j.Fc].style.zIndex = Yd + (j.jg || 0), b.display.appendChild(b.Yb[j.Fc])
          }
          var e = b.Yb[j.Fc], s = E.M.Rg(e), p = b.scale != s.scale;
          s.scale = b.scale;
          var v = o.x - n.x / 2;
          if(p || s.left != v) {
            s.left = v, e.style.left = v * b.scale + "px"
          }
          o = o.y - n.y / 2;
          if(p || s.top != o) {
            s.top = o, e.style.top = o * b.scale + "px"
          }
          o = n.x;
          if(p || s.width != o) {
            s.width = o, e.style.width = o * b.scale + "px"
          }
          n = n.y;
          if(p || s.height != n) {
            s.height = n, e.style.height = n * b.scale + "px"
          }
          k = k.Ri();
          if(s.rotation != k) {
            s.rotation = k, e.style.webkitTransform = "rotate(" + k + "rad)"
          }
          if(j.Xe != q) {
            j = j.Xe;
            s = !1;
            k = E.M.Rg(e);
            if(k.ri != j.url) {
              k.ri = j.url, e.style.backgroundImage = "url(" + j.url + ")", e.style.backgroundColor = "transparent", s = !0
            }else {
              if(k.si != j.lb.x || k.ti != j.lb.y) {
                s = !0
              }
            }
            if(s) {
              k.si = j.lb.x, k.ti = j.lb.y, e.style.backgroundPosition = (j.ih.x + (j.lb.x - 1) * j.th.x) * -1 + "px " + (j.ih.y + (j.lb.y - 1) * j.th.y) * -1 + "px"
            }
          }
        }
      }
    }
    for(var u in c) {
      b.display.removeChild(c[u]), delete b.Yb[u]
    }
    if(b.Za !== q) {
      b.Za.style.visibility = "hidden", b.w.g.qb.Fh(), b.Za.style.visibility = ""
    }
    b.display.style.visibility = ""
  }
};
he.prototype.start = function() {
  ae(this.viewport.Jf);
  var a = ke;
  Ga(a, this) >= 0 || a.push(this);
  le = document.getElementById("fps");
  me || (me = !0, ne())
};
var je = 0.015, me = !1, ke = [], oe = 60, pe = q, le = q;
function ne(a) {
  a == q && (a = (new Date).getTime());
  var d = 0;
  pe !== q ? d = (a - pe) / 1E3 : pe = a;
  if(d > 0) {
    d > 0.2 && (d = 0.2);
    if(le) {
      var b = 1 / d;
      oe = oe * 0.99 + b * 0.01;
      le.innerHTML = Math.round(b) + " - " + Math.round(oe)
    }
    pe = a;
    for(b = 0;b < ke.length;b++) {
      ke[b].update(a, d)
    }
    for(var c in nb) {
      nb[c].wh = !0
    }
    pb = ob;
    rb = qb;
    tb = sb
  }
  ge(ne, document.body)
}
;function $(a) {
  this.w = a;
  this.w.g.li(this)
}
$.prototype.Xb = function(a, d) {
  var b = this.w.g.yi(a, d);
  $.cj(b);
  $.ej(b);
  $.dj(b);
  var c = new Od, f = new F(a.x / 2, a.y / 2);
  Qd(c, [new F(-f.x + 0.01, f.y - 0.01), new F(-f.x - 0.01, 0), new F(-f.x + 0.01, -f.y + 0.01), new F(f.x - 0.01, -f.y + 0.01), new F(f.x + 0.01, 0), new F(f.x - 0.01, f.y - 0.01)]);
  b.rk = this.w.g.Eg(b.body, c, {$b:{gb:0}});
  b.Na = {};
  b.Na.Vf = new xb(function() {
    b.e.Qa.fj()
  }, "Move Up", !0);
  b.Na.Uf = new xb(r(), "Move Down", !0);
  b.Na.me = new xb(function() {
    b.e.Cd.me()
  }, "Move Left", !0);
  b.Na.ne = new xb(function() {
    b.e.Cd.ne()
  }, "Move Right", !0);
  return b
};
(function(a) {
  a.eb = 0.1;
  a.ck = new F(0, 9.8);
  a.Hc = {hf:new F(0, 9.8), Oh:1.5, wg:8, Uh:1};
  a.nb = {ng:1, jf:2, jk:4, bk:8, mg:16, sg:32, ff:64};
  a.Ph = {Th:1, ak:2, ek:4};
  a.S = {md:1, Lc:2, Fb:4, Mc:8};
  a.ce = function(d, b) {
    d.e = d.e || {};
    d.e.type |= a.nb.ng;
    d.e.Ae = {Kj:b & a.S.md, Hj:b & a.S.Fb, Ij:b & a.S.Lc, Jj:b & a.S.Mc}
  };
  a.cj = function(d) {
    var b = $.Hc.wg;
    d.e = d.e || {};
    d.e.type |= a.nb.jf;
    d.e.Qa = {sb:[], We:b, fj:function() {
      var b = d.e.Qa.sb;
      if(b.length > 0) {
        var f = d.body.n * d.e.Qa.We * a.Hc.Oh, e = d.body.c.h, g = d.body.q;
        g.y = 0;
        var h = d.body;
        h.J != T && h.q.m(g);
        Id(d.body, new F(0, -f), e);
        for(g = 0;g < b.length;g++) {
          Id(b[g].body, new F(0, f / b.length), e)
        }
      }
    }}
  };
  a.ej = function(d) {
    var b = $.Hc.wg, c = $.Hc.Uh;
    d.e = d.e || {};
    d.e.type |= a.nb.jf;
    d.e.Cd = {Dg:c, We:b, ne:function() {
      var a = d.body.q, a = Math.min(a.x + d.e.Cd.Dg, d.e.Cd.We) - a.x;
      a > 0 && Id(d.body, new F(d.body.n * a, 0), d.body.c.h)
    }, me:function() {
      var a = d.body.q, a = Math.max(a.x - d.e.Cd.Dg, -d.e.Cd.We) - a.x;
      a < 0 && Id(d.body, new F(d.body.n * a, 0), d.body.c.h)
    }}
  };
  a.ud = function(d, b, c) {
    d.e = d.e || {};
    d.e.type |= a.nb.ff;
    d.e.o = d.e.o || {};
    if(c & a.S.md) {
      d.e.o.If = !0, d.e.o.re = d.e.o.re || [], d.e.o.re.push(b)
    }
    if(c & a.S.Fb) {
      d.e.o.If = !0, d.e.o.$d = d.e.o.$d || [], d.e.o.$d.push(b)
    }
    if(c & a.S.Lc) {
      d.e.o.If = !0, d.e.o.ee = d.e.o.ee || [], d.e.o.ee.push(b)
    }
    if(c & a.S.Mc) {
      d.e.o.If = !0, d.e.o.pe = d.e.o.pe || [], d.e.o.pe.push(b)
    }
    if(NaN & a.S.md) {
      d.e.o.De = !0, d.e.o.se = d.e.o.se || [], d.e.o.se.push(b)
    }
    if(NaN & a.S.Fb) {
      d.e.o.De = !0, d.e.o.ae = d.e.o.ae || [], d.e.o.ae.push(b)
    }
    if(NaN & a.S.Lc) {
      d.e.o.De = !0, d.e.o.fe = d.e.o.fe || [], d.e.o.fe.push(b)
    }
    if(NaN & a.S.Mc) {
      d.e.o.De = !0, d.e.o.qe = d.e.o.qe || [], d.e.o.qe.push(b)
    }
  };
  a.bj = function(d, b) {
    d.e = d.e || {};
    d.e.type |= a.nb.mg;
    d.e.Ff = {Rj:b, filter:0}
  };
  a.dj = function(d) {
    var b = $.Ph.Th;
    d.e = d.e || {};
    d.e.type |= a.nb.sg;
    d.e.ij = {filter:b}
  };
  a.prototype.Hb = q;
  a.prototype.yg = function(a) {
    var b = a.D.p.object, c = a.H.p.object;
    !a.disabled && b && b.e && this.Bg(a, b);
    !a.disabled && c && c.e && this.Bg(a, c)
  };
  a.prototype.Bg = function(d, b) {
    if(b.e.type & a.nb.ng) {
      d.disabled = !0;
      var c = new zd;
      Kc(d, c);
      c = c.I;
      if(!b.e.Ae.Kj && c.y > a.eb) {
        d.disabled = !1
      }else {
        if(!b.e.Ae.Hj && c.y < -a.eb) {
          d.disabled = !1
        }else {
          if(!b.e.Ae.Jj && c.x > a.eb) {
            d.disabled = !1
          }else {
            if(!b.e.Ae.Ij && c.x < -a.eb) {
              d.disabled = !1
            }
          }
        }
      }
    }
  };
  a.prototype.Nd = function(a) {
    if(!a.disabled) {
      var b = a.D.p, c = b.object, f = a.H.p, e = f.object;
      c && e && (c.e && this.zg(a, c, e, f), e.e && this.zg(a, e, c, b))
    }
  };
  a.prototype.zg = function(d, b, c, f) {
    if(b.e.type & a.nb.jf) {
      var e = new zd;
      Kc(d, e);
      var g = e.I;
      if(g.y > a.eb) {
        g = !1;
        for(e = 0;e < b.e.Qa.sb.length;e++) {
          if(b.e.Qa.sb[e].body == f) {
            b.e.Qa.sb[e].count++;
            g = !0;
            break
          }
        }
        g || b.e.Qa.sb.push({body:f, count:1});
        d.bd = d.bd || [];
        d.bd.push({Qa:b, Vi:f})
      }
    }
    if(b.e.type & a.nb.ff) {
      e = new zd;
      Kc(d, e);
      g = e.I;
      if(g.y > a.eb && b.e.o.re) {
        for(e = 0;e < b.e.o.re.length;e++) {
          b.e.o.re[e](d)
        }
      }else {
        if(g.y < -a.eb && b.e.o.$d) {
          for(e = 0;e < b.e.o.$d.length;e++) {
            b.e.o.$d[e](d)
          }
        }
      }
      if(g.x > a.eb && b.e.o.ee) {
        for(e = 0;e < b.e.o.ee.length;e++) {
          b.e.o.ee[e](d)
        }
      }else {
        if(g.x < -a.eb && b.e.o.pe) {
          for(e = 0;e < b.e.o.pe.length;e++) {
            b.e.o.pe[e](d)
          }
        }
      }
    }
    b.e.type & a.nb.mg && c.e && c.e.type & a.nb.sg && (b.e.Ff.filter == 0 || b.e.Ff.filter & c.e.ij.filter) && this.w.g.Gj(c, b.e.Ff.Rj)
  };
  a.prototype.fd = function(a) {
    if(a.bd) {
      for(var b = 0;b < a.bd.length;b++) {
        for(var c = a.bd[b].Qa, f = a.bd[b].Vi, e = [], g = 0;g < c.e.Qa.sb.length;g++) {
          c.e.Qa.sb[g].body == f ? (c.e.Qa.sb[g].count--, c.e.Qa.sb[g].count > 0 && e.push(c.e.Qa.sb[g])) : e.push(c.e.Qa.sb[g])
        }
        c.e.Qa.sb = e
      }
      a.bd = q
    }
    if(!a.disabled) {
      b = a.D.p.object, c = a.H.p.object, b && c && (b.e && this.Ag(a, b), c.e && this.Ag(a, c))
    }
  };
  a.prototype.Ag = function(d, b) {
    if(b.e.type & a.nb.ff && b.e.o.De) {
      var c = new zd;
      Kc(d, c);
      c = c.I;
      if(c.y > a.eb && b.e.o.se) {
        for(var f = 0;f < b.e.o.se.length;f++) {
          b.e.o.se[f](d)
        }
      }else {
        if(c.y < -a.eb && b.e.o.ae) {
          for(f = 0;f < b.e.o.ae.length;f++) {
            b.e.o.ae[f](d)
          }
        }
      }
      if(c.x > a.eb && b.e.o.fe) {
        for(f = 0;f < b.e.o.fe.length;f++) {
          b.e.o.fe[f](d)
        }
      }else {
        if(c.x < -a.eb && b.e.o.qe) {
          for(f = 0;f < b.e.o.qe.length;f++) {
            b.e.o.qe[f](d)
          }
        }
      }
    }
  };
  a.prototype.Yd = q;
  a.prototype.Xd = q;
  a.prototype.f = function(a, b) {
    return this.w.g.Pa(a, b, !0)
  };
  a.prototype.od = function(d, b) {
    var c, f = this.w.g.Pa(d, b, !0, q, q);
    if(c === i || c === q) {
      c = a.S.Fb | a.S.Lc | a.S.Mc
    }
    a.ce(f, c)
  };
  a.prototype.aj = function(d, b) {
    var c = this;
    a.ud(d, function() {
      c.w.g.Kg(d)
    }, b)
  };
  a.prototype.Oa = function(d, b) {
    var c, f = this.w.g.Pa(d, b, !0, q, q);
    if(c === i || c === q) {
      c = a.S.Fb
    }
    this.aj(f, c);
    return f
  };
  a.prototype.vi = function(d, b, c) {
    d = this.w.g.Pa(d, b, !0, q, q);
    a.bj(d, c);
    return d
  }
})($);
var qe = {};
(function(a) {
  var d, b = new F(600, 80), c = new F(400, 300), f, e, g, h;
  a.Ib = function(d, f, e) {
    g = new he(a, d, b, $.Hc.hf, c, 20, f);
    h = new $(g);
    d = new F(13, b.y - 45);
    a.Ef();
    a.zi();
    a.wi();
    a.Xb(d, e);
    a.Df(new F(13, b.y - 40));
    ie(g)
  };
  a.Xb = function(a, b) {
    var c = new F(0, 0), n = new F(21, 47), s = new F(n.x / 20, n.y / 20);
    d = h.Xb(s, a);
    de(g.Wb, d, s, c, n);
    e = new lb("game");
    e.Ua(new xb(function() {
      g.paused = !g.paused
    }, "Pause", !1), 80, !1, !1, !1);
    f = new lb("player");
    f.Ua(d.Na.Vf, b ? 87 : 38, !1, !1, !1);
    f.Ua(d.Na.me, b ? 65 : 37, !1, !1, !1);
    f.Ua(d.Na.Uf, b ? 83 : 40, !1, !1, !1);
    f.Ua(d.Na.ne, b ? 68 : 39, !1, !1, !1)
  };
  a.Ef = function() {
    var c = new F(3, 0.25);
    g.g.Pa(new F(5, 0.25), new F(16, b.y - 1.5), !0, {pb:Math.PI / 3}, q);
    h.od(c, new F(10, b.y - 6));
    h.od(c, new F(6, b.y - 12));
    h.od(c, new F(8, b.y - 18));
    h.od(c, new F(12, b.y - 24));
    h.od(c, new F(10, b.y - 30));
    h.od(c, new F(10, b.y - 36));
    h.f(new F(b.x - 14, 0.5), new F(b.x / 2 + 7, b.y - 25));
    a.Af(new F(10, 5), new F(20, b.y - 25))
  };
  a.Af = function(a, b) {
    g.g.Pa(new F(0.25, Math.sqrt(a.y * a.y * 2)), new F(b.x + a.y / 2, b.y - a.y / 2), !0, {pb:Math.PI / 4}, q);
    g.g.Pa(new F(0.25, a.y), new F(b.x + a.y, b.y - a.y / 2), !0, q, q);
    g.g.Pa(new F(0.25, a.y), new F(b.x + a.x, b.y - a.y / 2), !0, q, q);
    for(var c = new fc(0.15), d = a.y + 1;d < a.x;d += 0.3) {
      for(var f = 0;f < a.y / 2;f += 0.3) {
        var e = g.g.Bb(new F(0.3, 0.3), new F(b.x + d + (Math.random() - 0.5) / 2, b.y - a.y), !0, c, {$b:{pd:0.1, Qb:0.1, gb:0.1}}), h = Math.random();
        h <= 0.25 ? Z(e, "graphics/ball-red.png") : h <= 0.5 ? Z(e, "graphics/ball-green.png") : h <= 0.75 ? Z(e, "graphics/ball-yellow.png") : Z(e, "graphics/ball-blue.png")
      }
    }
  };
  a.zi = function() {
    for(var a = new ad, c = new Yb, d = !1, f = 20;f <= b.x - 10;f += 8) {
      g.g.Qg().pb = f / b.x * Math.PI;
      var e = b.y - 14;
      d && (e += 8);
      var d = !d, h = g.g.Pa(new F(0.1, 0.1), new F(f, e), !1), v = g.g.Bf(new F(10, 1), new F(f, e));
      Z(v, "graphics/spinner.png");
      $.ce(v, !1);
      var e = g.g.Bf(new F(10, 1), new F(f, e)), u = e.body, w = g.g.Qg().pb + Math.PI / 2;
      w === i && (w = 0);
      Hd(u, u.i.position, w);
      Z(e, "graphics/spinner.png");
      a.xa(h.body, v.body, h.body.c.h);
      g.g.qb.ef(a);
      a.xa(h.body, e.body, h.body.c.h);
      g.g.qb.ef(a);
      c.xa(v.body, e.body, v.body.c.h);
      g.g.qb.ef(c)
    }
  };
  a.wi = function() {
    for(var a = {type:Ed.mk, td:!1}, c = {Qb:2.5}, d = new fc(0.25), f = new F(0.5, 0.5), e = 0;e < 50;e++) {
      var h = e * 5 % (b.x - 10), h = new F(h + e % 20 / 20 + 4.5, 15 + e % 20);
      g.g.Bb(f, h, !0, d, {nd:a, $b:c})
    }
    d = new Od;
    Rd(d, 0.25, 0.25);
    for(e = 0;e < 50;e++) {
      h = e * 5 % (b.x - 10), h = new F(h + (e + 5) % 20 / 20 + 4.5, 15 + (e + 5) % 20), a.pb = e % 17 / 17, g.g.Bb(f, h, !0, d, {nd:a, $b:c})
    }
    d = new Od;
    Qd(d, [new F(-0.5, -0.5), new F(0.5, -0.5), new F(-0.5, 0.5)], 3);
    for(e = 0;e < 50;e++) {
      h = e * 5 % (b.x - 10), h = new F(h + (e + 10) % 20 / 20 + 4.5, 15 + (e + 10) % 20), a.pb = e % 22 / 22, g.g.Bb(f, h, !0, d, {nd:a, $b:c})
    }
    d = new Od;
    Qd(d, [new F(-0.5, -0.5), new F(0, -0.5), new F(0.5, 0), new F(0.5, 0.5), new F(0, 0.3)], 5);
    for(e = 0;e < 50;e++) {
      h = e * 5 % (b.x - 10), h = new F(h + (e + 15) % 20 / 20 + 4.5, 15 + (e + 15) % 20), a.pb = e % 35 / 35, g.g.Bb(f, h, !0, d, {nd:a, $b:c})
    }
  };
  a.Df = function(a) {
    var b = new F(0, 454), c = new F(178, 326), d = new F(354, 54), f = new F(354, 54), e = new F(32, 84), g = new F(158, 388), u = new F(190, 388), w = new F(158, 356), y = new F(190, 356), N = new F(158, 356), C = new F(190, 356), l = new F(1.6, 1.6), a = new F(a.x + l.x / 2, a.y + l.y / 2), m = h.f(l, new F(a.x, a.y));
    Z(m, "graphics/smbsheet.gif", b);
    m = h.f(l, new F(a.x + l.x, a.y));
    Z(m, "graphics/smbsheet.gif", b);
    m = h.f(l, new F(a.x + l.x * 2, a.y));
    Z(m, "graphics/smbsheet.gif", b);
    m = h.f(l, new F(a.x + l.x * 3, a.y));
    Z(m, "graphics/smbsheet.gif", b);
    m = h.f(l, new F(a.x + l.x * 4, a.y));
    Z(m, "graphics/smbsheet.gif", b);
    m = h.f(l, new F(a.x + l.x * 5, a.y));
    Z(m, "graphics/smbsheet.gif", b);
    m = h.f(l, new F(a.x + l.x * 6, a.y));
    Z(m, "graphics/smbsheet.gif", b);
    m = h.f(l, new F(a.x + l.x * 7, a.y));
    Z(m, "graphics/smbsheet.gif", b);
    m = h.f(l, new F(a.x + l.x * 8, a.y));
    Z(m, "graphics/smbsheet.gif", b);
    m = h.f(l, new F(a.x + l.x * 9, a.y));
    Z(m, "graphics/smbsheet.gif", b);
    m = h.f(l, new F(a.x + l.x * 10, a.y));
    Z(m, "graphics/smbsheet.gif", b);
    m = h.f(l, new F(a.x + l.x * 11, a.y));
    Z(m, "graphics/smbsheet.gif", b);
    m = h.f(l, new F(a.x + l.x * 12, a.y));
    Z(m, "graphics/smbsheet.gif", b);
    m = h.f(l, new F(a.x + l.x * 13, a.y));
    Z(m, "graphics/smbsheet.gif", b);
    m = h.f(l, new F(a.x + l.x * 14, a.y));
    Z(m, "graphics/smbsheet.gif", b);
    m = h.f(l, new F(a.x + l.x * 15, a.y));
    Z(m, "graphics/smbsheet.gif", b);
    m = h.f(l, new F(a.x + l.x * 16, a.y));
    Z(m, "graphics/smbsheet.gif", b);
    m = h.Oa(l, new F(a.x + l.x * 16, a.y - l.y * 4));
    Z(m, "graphics/smbsheet.gif", d);
    m = h.f(l, new F(a.x + l.x * 17, a.y));
    Z(m, "graphics/smbsheet.gif", b);
    m = h.f(l, new F(a.x + l.x * 18, a.y));
    Z(m, "graphics/smbsheet.gif", b);
    m = h.f(l, new F(a.x + l.x * 19, a.y));
    Z(m, "graphics/smbsheet.gif", b);
    m = h.f(l, new F(a.x + l.x * 20, a.y));
    Z(m, "graphics/smbsheet.gif", b);
    m = h.Oa(l, new F(a.x + l.x * 20, a.y - l.y * 4));
    Z(m, "graphics/smbsheet.gif", c);
    m = h.f(l, new F(a.x + l.x * 21, a.y));
    Z(m, "graphics/smbsheet.gif", b);
    m = h.Oa(l, new F(a.x + l.x * 21, a.y - l.y * 4));
    Z(m, "graphics/smbsheet.gif", f);
    m = h.f(l, new F(a.x + l.x * 22, a.y));
    Z(m, "graphics/smbsheet.gif", b);
    m = h.Oa(l, new F(a.x + l.x * 22, a.y - l.y * 4));
    Z(m, "graphics/smbsheet.gif", c);
    m = h.Oa(l, new F(a.x + l.x * 22, a.y - l.y * 8));
    Z(m, "graphics/smbsheet.gif", d);
    m = h.f(l, new F(a.x + l.x * 23, a.y));
    Z(m, "graphics/smbsheet.gif", b);
    m = h.Oa(l, new F(a.x + l.x * 23, a.y - l.y * 4));
    Z(m, "graphics/smbsheet.gif", d);
    m = h.f(l, new F(a.x + l.x * 24, a.y));
    Z(m, "graphics/smbsheet.gif", b);
    m = h.Oa(l, new F(a.x + l.x * 24, a.y - l.y * 4));
    Z(m, "graphics/smbsheet.gif", c);
    m = h.f(l, new F(a.x + l.x * 25, a.y));
    Z(m, "graphics/smbsheet.gif", b);
    m = h.f(l, new F(a.x + l.x * 26, a.y));
    Z(m, "graphics/smbsheet.gif", b);
    m = h.f(l, new F(a.x + l.x * 27, a.y));
    Z(m, "graphics/smbsheet.gif", b);
    m = h.f(l, new F(a.x + l.x * 28, a.y));
    Z(m, "graphics/smbsheet.gif", b);
    m = h.f(l, new F(a.x + l.x * 28, a.y - l.y * 1));
    Z(m, "graphics/smbsheet.gif", g);
    m = h.f(l, new F(a.x + l.x * 28, a.y - l.y * 2));
    Z(m, "graphics/smbsheet.gif", w);
    m = h.f(l, new F(a.x + l.x * 29, a.y));
    Z(m, "graphics/smbsheet.gif", b);
    m = h.f(l, new F(a.x + l.x * 29, a.y - l.y * 1));
    Z(m, "graphics/smbsheet.gif", u);
    m = h.f(l, new F(a.x + l.x * 29, a.y - l.y * 2));
    Z(m, "graphics/smbsheet.gif", y);
    m = h.f(l, new F(a.x + l.x * 30, a.y));
    Z(m, "graphics/smbsheet.gif", b);
    m = h.f(l, new F(a.x + l.x * 31, a.y));
    Z(m, "graphics/smbsheet.gif", b);
    m = h.f(l, new F(a.x + l.x * 32, a.y));
    Z(m, "graphics/smbsheet.gif", b);
    m = h.f(l, new F(a.x + l.x * 33, a.y));
    Z(m, "graphics/smbsheet.gif", b);
    m = h.f(l, new F(a.x + l.x * 34, a.y));
    Z(m, "graphics/smbsheet.gif", b);
    m = h.f(l, new F(a.x + l.x * 35, a.y));
    Z(m, "graphics/smbsheet.gif", b);
    m = h.f(l, new F(a.x + l.x * 36, a.y));
    Z(m, "graphics/smbsheet.gif", b);
    m = h.f(l, new F(a.x + l.x * 37, a.y));
    Z(m, "graphics/smbsheet.gif", b);
    m = h.f(l, new F(a.x + l.x * 38, a.y));
    Z(m, "graphics/smbsheet.gif", b);
    m = h.f(l, new F(a.x + l.x * 38, a.y - l.y * 1));
    Z(m, "graphics/smbsheet.gif", g);
    m = h.f(l, new F(a.x + l.x * 38, a.y - l.y * 2));
    Z(m, "graphics/smbsheet.gif", g);
    m = h.f(l, new F(a.x + l.x * 38, a.y - l.y * 3));
    Z(m, "graphics/smbsheet.gif", w);
    m = h.f(l, new F(a.x + l.x * 39, a.y));
    Z(m, "graphics/smbsheet.gif", b);
    m = h.f(l, new F(a.x + l.x * 39, a.y - l.y * 1));
    Z(m, "graphics/smbsheet.gif", u);
    m = h.f(l, new F(a.x + l.x * 39, a.y - l.y * 2));
    Z(m, "graphics/smbsheet.gif", u);
    m = h.f(l, new F(a.x + l.x * 39, a.y - l.y * 3));
    Z(m, "graphics/smbsheet.gif", y);
    m = h.f(l, new F(a.x + l.x * 40, a.y));
    Z(m, "graphics/smbsheet.gif", b);
    m = h.f(l, new F(a.x + l.x * 41, a.y));
    Z(m, "graphics/smbsheet.gif", b);
    m = h.f(l, new F(a.x + l.x * 42, a.y));
    Z(m, "graphics/smbsheet.gif", b);
    m = h.f(l, new F(a.x + l.x * 43, a.y));
    Z(m, "graphics/smbsheet.gif", b);
    m = h.f(l, new F(a.x + l.x * 44, a.y));
    Z(m, "graphics/smbsheet.gif", b);
    m = h.f(l, new F(a.x + l.x * 45, a.y));
    Z(m, "graphics/smbsheet.gif", b);
    m = h.f(l, new F(a.x + l.x * 46, a.y));
    Z(m, "graphics/smbsheet.gif", b);
    m = h.f(l, new F(a.x + l.x * 46, a.y - l.y * 1));
    Z(m, "graphics/smbsheet.gif", g);
    m = h.f(l, new F(a.x + l.x * 46, a.y - l.y * 2));
    Z(m, "graphics/smbsheet.gif", g);
    m = h.f(l, new F(a.x + l.x * 46, a.y - l.y * 3));
    Z(m, "graphics/smbsheet.gif", g);
    m = h.f(l, new F(a.x + l.x * 46, a.y - l.y * 4));
    Z(m, "graphics/smbsheet.gif", w);
    m = h.f(l, new F(a.x + l.x * 47, a.y));
    Z(m, "graphics/smbsheet.gif", b);
    m = h.f(l, new F(a.x + l.x * 47, a.y - l.y * 1));
    Z(m, "graphics/smbsheet.gif", u);
    m = h.f(l, new F(a.x + l.x * 47, a.y - l.y * 2));
    Z(m, "graphics/smbsheet.gif", u);
    m = h.f(l, new F(a.x + l.x * 47, a.y - l.y * 3));
    Z(m, "graphics/smbsheet.gif", u);
    m = h.f(l, new F(a.x + l.x * 47, a.y - l.y * 4));
    Z(m, "graphics/smbsheet.gif", y);
    m = h.f(l, new F(a.x + l.x * 48, a.y));
    Z(m, "graphics/smbsheet.gif", b);
    m = h.f(l, new F(a.x + l.x * 49, a.y));
    Z(m, "graphics/smbsheet.gif", b);
    m = h.f(l, new F(a.x + l.x * 50, a.y));
    Z(m, "graphics/smbsheet.gif", b);
    m = h.f(l, new F(a.x + l.x * 51, a.y));
    Z(m, "graphics/smbsheet.gif", b);
    m = h.f(l, new F(a.x + l.x * 52, a.y));
    Z(m, "graphics/smbsheet.gif", b);
    m = h.f(l, new F(a.x + l.x * 53, a.y));
    Z(m, "graphics/smbsheet.gif", b);
    m = h.f(l, new F(a.x + l.x * 54, a.y));
    Z(m, "graphics/smbsheet.gif", b);
    m = h.f(l, new F(a.x + l.x * 55, a.y));
    Z(m, "graphics/smbsheet.gif", b);
    m = h.f(l, new F(a.x + l.x * 56, a.y));
    Z(m, "graphics/smbsheet.gif", b);
    m = h.f(l, new F(a.x + l.x * 57, a.y));
    Z(m, "graphics/smbsheet.gif", b);
    m = h.f(l, new F(a.x + l.x * 57, a.y - l.y * 1));
    Z(m, "graphics/smbsheet.gif", g);
    m = h.f(l, new F(a.x + l.x * 57, a.y - l.y * 2));
    Z(m, "graphics/smbsheet.gif", g);
    m = h.f(l, new F(a.x + l.x * 57, a.y - l.y * 3));
    Z(m, "graphics/smbsheet.gif", g);
    m = h.f(l, new F(a.x + l.x * 57, a.y - l.y * 4));
    Z(m, "graphics/smbsheet.gif", N);
    m = h.f(l, new F(a.x + l.x * 58, a.y));
    Z(m, "graphics/smbsheet.gif", b);
    m = h.f(l, new F(a.x + l.x * 58, a.y - l.y * 1));
    Z(m, "graphics/smbsheet.gif", u);
    m = h.f(l, new F(a.x + l.x * 58, a.y - l.y * 2));
    Z(m, "graphics/smbsheet.gif", u);
    m = h.f(l, new F(a.x + l.x * 58, a.y - l.y * 3));
    Z(m, "graphics/smbsheet.gif", u);
    m = h.f(l, new F(a.x + l.x * 58, a.y - l.y * 4));
    Z(m, "graphics/smbsheet.gif", C);
    m = h.f(l, new F(a.x + l.x * 59, a.y));
    Z(m, "graphics/smbsheet.gif", b);
    m = h.f(l, new F(a.x + l.x * 60, a.y));
    Z(m, "graphics/smbsheet.gif", b);
    m = h.f(l, new F(a.x + l.x * 61, a.y));
    Z(m, "graphics/smbsheet.gif", b);
    m = h.f(l, new F(a.x + l.x * 62, a.y));
    Z(m, "graphics/smbsheet.gif", b);
    m = h.f(l, new F(a.x + l.x * 63, a.y));
    Z(m, "graphics/smbsheet.gif", b);
    m = h.f(l, new F(a.x + l.x * 64, a.y));
    Z(m, "graphics/smbsheet.gif", b);
    m = h.Oa(l, new F(a.x + l.x * 64, a.y - l.y * 5));
    $.ce(m, $.S.md | $.S.Lc | $.S.Mc);
    Z(m, "graphics/smbsheet.gif", e);
    m = h.f(l, new F(a.x + l.x * 65, a.y));
    Z(m, "graphics/smbsheet.gif", b);
    m = h.f(l, new F(a.x + l.x * 66, a.y));
    Z(m, "graphics/smbsheet.gif", b);
    m = h.f(l, new F(a.x + l.x * 67, a.y));
    Z(m, "graphics/smbsheet.gif", b);
    m = h.f(l, new F(a.x + l.x * 68, a.y));
    Z(m, "graphics/smbsheet.gif", b);
    m = h.f(l, new F(a.x + l.x * 71, a.y));
    Z(m, "graphics/smbsheet.gif", b);
    m = h.f(l, new F(a.x + l.x * 72, a.y));
    Z(m, "graphics/smbsheet.gif", b);
    m = h.f(l, new F(a.x + l.x * 73, a.y));
    Z(m, "graphics/smbsheet.gif", b);
    m = h.f(l, new F(a.x + l.x * 74, a.y));
    Z(m, "graphics/smbsheet.gif", b);
    m = h.f(l, new F(a.x + l.x * 75, a.y));
    Z(m, "graphics/smbsheet.gif", b);
    m = h.f(l, new F(a.x + l.x * 76, a.y));
    Z(m, "graphics/smbsheet.gif", b);
    m = h.f(l, new F(a.x + l.x * 77, a.y));
    Z(m, "graphics/smbsheet.gif", b);
    m = h.Oa(l, new F(a.x + l.x * 77, a.y - l.y * 4));
    Z(m, "graphics/smbsheet.gif", c);
    m = h.f(l, new F(a.x + l.x * 78, a.y));
    Z(m, "graphics/smbsheet.gif", b);
    m = h.Oa(l, new F(a.x + l.x * 78, a.y - l.y * 4));
    Z(m, "graphics/smbsheet.gif", f);
    m = h.f(l, new F(a.x + l.x * 79, a.y));
    Z(m, "graphics/smbsheet.gif", b);
    m = h.Oa(l, new F(a.x + l.x * 79, a.y - l.y * 4));
    Z(m, "graphics/smbsheet.gif", c)
  };
  a.bf = function(a, b) {
    e.ac(a, b)
  };
  a.Re = function(a, b) {
    e.ac(a, b);
    f.ac(a, b)
  };
  a.Qe = function() {
    Vd(g.viewport, d.body.c.h)
  }
})(qe);
ba("test.init", qe.Ib);
var re = {};
(function(a) {
  var d, b = new F(350, 30), c = new F(600, 300), f, e, g, h, k = new F(0, 454), j = new F(178, 326), o = new F(2, 124), n = new F(354, 54), s = new F(0, 58), p = new F(290, 54), v = new F(178, 326), u = new F(0, 0), w = new F(32, 84), y = new F(354, 54), N = new F(0, 90), C = new F(0, 0), l = new F(2, 158), m = new F(158, 388), K = new F(190, 388), W = new F(158, 356), te = new F(190, 356), ue = new F(158, 356), ve = new F(190, 356), we = new F(55, 380), xe = new F(10, 396), ye = new F(466, 168), 
  ze = new F(452, 136), Ae = new F(466, 104), Be = new F(300, 424), Ce = new F(300, 352), De = new F(364, 424), Ee = new F(364, 384), Fe = new F(332, 352), Ge = new F(332, 320), He = new F(396, 352), Ie = new F(396, 320), Je = new F(364, 352), Ke = new F(362, 264), Le = new F(160, 64);
  a.Ib = function(d, f, e) {
    g = new he(a, d, b, $.Hc.hf, c, 20, f);
    h = new $(g);
    d = new F(5, b.y - 7);
    a.Xb(d, e);
    a.Df(new F(0, b.y), d);
    e = g.g.ma(new F(c.x / 20, c.y / 20), new F(0, 0), -1);
    Z(e, "graphics/sky.png");
    e.display.Pe = 1;
    ie(g)
  };
  a.Xb = function(a, b) {
    var c = new F(0, 0), j = new F(21, 47), k = new F(j.x / 20, j.y / 20);
    d = h.Xb(k, a);
    de(g.Wb, d, k, c, j);
    d.display.jg = 10;
    e = new lb("game");
    e.Ua(new xb(function() {
      g.paused = !g.paused
    }, "Pause", !1), 80, !1, !1, !1);
    f = new lb("player");
    f.Ua(d.Na.Vf, b ? 87 : 38, !1, !1, !1);
    f.Ua(d.Na.me, b ? 65 : 37, !1, !1, !1);
    f.Ua(d.Na.Uf, b ? 83 : 40, !1, !1, !1);
    f.Ua(d.Na.ne, b ? 68 : 39, !1, !1, !1)
  };
  a.Df = function(b, c) {
    for(var d = new F(1.6, 1.6), f = new F(b.x - d.x / 2, b.y - d.y / 2), e = ["                                                                                                                                                                                                                    ".split(""), "                                                                                                                                                                                                                    ".split(""), 
    "                                                                                                                                                                                                      o             ".split(""), "                                                                                                                                                                                                     F|             ".split(""), "                                                                                   G                                                                                                                  |             ".split(""), 
    "                      O                                                         ########   ###O              M           ###    #OO#                                                        ==        |             ".split(""), "                                                                                                                                                                                           ===        |             ".split(""), "                                                                               G                                                                                                          ====        |     $       ".split(""), 
    "                                                                1                                                                                                                        =====        |    ^^^      ".split(""), "                O   #M#O#                     <>         {}                  #M#              @     #*    O  O  O     #          ##      =  =          ==  =            ###O#           ======        |    R+L      ".split(""), "                                      <>      []         []                                                                             ==  ==        ===  ==                          =======        |   ^r&l^     ".split(""), 
    "                            <>        []      []         []                                                                            ===  ===      ====  ===     {}              <> ========        |   ++u++     ".split(""), "                     G      []        [] G    []     G G []                                    G G        T                G G G G    ====  ====    =====  ====    []        G G   []=========        =   ++8++     ".split(""), "---------------------------------------------------------------------  ---------------   ----------------------------------------------------------------  ---------------------------------------------------------".split(""), 
    "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx".split("")], f = new F(f.x, f.y - d.y * (e.length - 1)), g = 0;g < e.length;g++) {
      for(var h = 0;h < e[g].length;h++) {
        a.xi(e[g][h], new F(h, g), f, d, c)
      }
    }
  };
  a.xi = function(a, b, c, d, f) {
    var e = q, B = q;
    switch(a) {
      case " ":
        break;
      case "-":
        e = h.f(d, new F(c.x + b.x * d.x, c.y + b.y * d.y));
        B = k;
        break;
      case "=":
        e = h.f(d, new F(c.x + b.x * d.x, c.y + b.y * d.y));
        B = o;
        break;
      case "O":
        e = h.Oa(d, new F(c.x + b.x * d.x, c.y + b.y * d.y));
        $.ud(e, function() {
          var a = h.f(d, new F(c.x + b.x * d.x, c.y + b.y * d.y));
          Z(a, "graphics/smbsheet.gif", p);
          a = g.g.ma(d, new F(c.x + b.x * d.x, c.y + (b.y - 1) * d.y));
          Z(a, "graphics/smbsheet.gif", s)
        }, $.S.Fb);
        B = n;
        break;
      case "@":
        e = h.f(d, new F(c.x + b.x * d.x, c.y + b.y * d.y));
        e.Hg = 8;
        e.yf = 0;
        $.ud(e, function() {
          e.yf++;
          a = g.g.ma(d, new F(c.x + b.x * d.x, c.y + (b.y - e.yf / e.Hg) * d.y));
          Z(a, "graphics/smbsheet.gif", s);
          if(e.yf == e.Hg) {
            g.g.Kg(e);
            var a = h.f(d, new F(c.x + b.x * d.x, c.y + b.y * d.y));
            Z(a, "graphics/smbsheet.gif", p)
          }
        }, $.S.Fb);
        B = v;
        break;
      case "#":
        e = h.Oa(d, new F(c.x + b.x * d.x, c.y + b.y * d.y));
        B = j;
        break;
      case "1":
        e = h.Oa(d, new F(c.x + b.x * d.x, c.y + b.y * d.y));
        $.ce(e, $.S.md | $.S.Lc | $.S.Mc);
        $.ud(e, function() {
          var a = h.f(d, new F(c.x + b.x * d.x, c.y + b.y * d.y));
          Z(a, "graphics/smbsheet.gif", p);
          a = g.g.ma(d, new F(c.x + b.x * d.x, c.y + (b.y - 1) * d.y));
          Z(a, "graphics/smbsheet.gif", l)
        }, $.S.Fb);
        B = C;
        break;
      case "*":
        e = h.Oa(d, new F(c.x + b.x * d.x, c.y + b.y * d.y));
        $.ce(e, $.S.md | $.S.Lc | $.S.Mc);
        $.ud(e, function() {
          var a = h.f(d, new F(c.x + b.x * d.x, c.y + b.y * d.y));
          Z(a, "graphics/smbsheet.gif", p);
          a = g.g.ma(d, new F(c.x + b.x * d.x, c.y + (b.y - 1) * d.y));
          Z(a, "graphics/smbsheet.gif", w)
        }, $.S.Fb);
        B = u;
        break;
      case "M":
        e = h.Oa(d, new F(c.x + b.x * d.x, c.y + b.y * d.y));
        $.ud(e, function() {
          var a = h.f(d, new F(c.x + b.x * d.x, c.y + b.y * d.y));
          Z(a, "graphics/smbsheet.gif", p);
          a = g.g.ma(d, new F(c.x + b.x * d.x, c.y + (b.y - 1) * d.y));
          Z(a, "graphics/smbsheet.gif", N)
        }, $.S.Fb);
        B = y;
        break;
      case "[":
        e = h.f(d, new F(c.x + b.x * d.x, c.y + b.y * d.y));
        B = m;
        break;
      case "]":
        e = h.f(d, new F(c.x + b.x * d.x, c.y + b.y * d.y));
        B = K;
        break;
      case "<":
        e = h.f(d, new F(c.x + b.x * d.x, c.y + b.y * d.y));
        B = W;
        break;
      case ">":
        e = h.f(d, new F(c.x + b.x * d.x, c.y + b.y * d.y));
        B = te;
        break;
      case "{":
        e = h.f(d, new F(c.x + b.x * d.x, c.y + b.y * d.y));
        B = ue;
        break;
      case "}":
        e = h.f(d, new F(c.x + b.x * d.x, c.y + b.y * d.y));
        B = ve;
        break;
      case "T":
        e = g.g.ma(d, new F(c.x + b.x * d.x, c.y + b.y * d.y));
        B = we;
        break;
      case "G":
        e = g.g.ma(d, new F(c.x + b.x * d.x, c.y + b.y * d.y));
        B = xe;
        break;
      case "|":
        e = g.g.ma(d, new F(c.x + b.x * d.x, c.y + b.y * d.y));
        B = ye;
        break;
      case "F":
        e = g.g.ma(d, new F(c.x + b.x * d.x + d.x / 2, c.y + b.y * d.y), 1);
        B = ze;
        break;
      case "o":
        e = g.g.ma(d, new F(c.x + b.x * d.x, c.y + b.y * d.y));
        B = Ae;
        break;
      case "+":
        e = g.g.ma(d, new F(c.x + b.x * d.x, c.y + b.y * d.y));
        B = Be;
        break;
      case "^":
        e = g.g.ma(d, new F(c.x + b.x * d.x, c.y + b.y * d.y));
        B = Ce;
        break;
      case "8":
        e = g.g.ma(d, new F(c.x + b.x * d.x, c.y + b.y * d.y));
        B = De;
        break;
      case "u":
        e = g.g.ma(d, new F(c.x + b.x * d.x, c.y + b.y * d.y));
        B = Ee;
        break;
      case "R":
        e = g.g.ma(d, new F(c.x + b.x * d.x, c.y + b.y * d.y));
        B = Ge;
        break;
      case "r":
        e = g.g.ma(d, new F(c.x + b.x * d.x, c.y + b.y * d.y));
        B = Fe;
        break;
      case "L":
        e = g.g.ma(d, new F(c.x + b.x * d.x, c.y + b.y * d.y));
        B = Ie;
        break;
      case "l":
        e = g.g.ma(d, new F(c.x + b.x * d.x, c.y + b.y * d.y));
        B = He;
        break;
      case "&":
        e = g.g.ma(d, new F(c.x + b.x * d.x, c.y + b.y * d.y));
        B = Je;
        break;
      case "$":
        e = g.g.ma(d, new F(c.x + b.x * d.x, c.y + b.y * d.y + d.y / 4));
        B = Ke;
        break;
      case "x":
        e = h.vi(d, new F(c.x + b.x * d.x, c.y + b.y * d.y), f);
        B = Le;
        break;
      default:
        throw"Invalid type: " + a;
    }
    e !== q && "graphics/smbsheet.gif" !== q && B !== q && Z(e, "graphics/smbsheet.gif", B)
  };
  a.bf = function(a, b) {
    e.ac(a, b)
  };
  a.Re = function(a, b) {
    e.ac(a, b);
    f.ac(a, b)
  };
  a.Qe = function() {
    Vd(g.viewport, d.body.c.h)
  }
})(re);
ba("mario.init", re.Ib);
var se = {};
(function(a) {
  var d, b = new F(5, 10), c = new F(100, 200), f, e, g, h;
  a.Ib = function(d, e, f) {
    g = new he(a, d, b, $.Hc.hf, c, 20, e);
    h = new $(g);
    d = new F(2, 2);
    a.Ef();
    a.Xb(d, f);
    ie(g)
  };
  a.Xb = function(a, b) {
    var c = new F(0, 0), n = new F(21, 47), s = new F(n.x / 20, n.y / 20);
    d = h.Xb(s, a);
    de(g.Wb, d, s, c, n);
    e = new lb("game");
    e.Ua(new xb(function() {
      g.paused = !g.paused
    }, "Pause", !1), 80, !1, !1, !1);
    f = new lb("player");
    f.Ua(d.Na.Vf, b ? 87 : 38, !1, !1, !1);
    f.Ua(d.Na.me, b ? 65 : 37, !1, !1, !1);
    f.Ua(d.Na.Uf, b ? 83 : 40, !1, !1, !1);
    f.Ua(d.Na.ne, b ? 68 : 39, !1, !1, !1)
  };
  a.Ef = function() {
    h.f(new F(b.x, 0.5), new F(b.x / 2, b.y - 0.25));
    a.Af(new F(b.x, 6), new F(0, b.y - 0.25))
  };
  a.Af = function(a, b) {
    g.g.Pa(new F(0.25, a.y), new F(b.x + 0, b.y - a.y / 2), !0, q, q);
    g.g.Pa(new F(0.25, a.y), new F(b.x + a.x - 0.125, b.y - a.y / 2), !0, q, q);
    for(var c = new fc(0.15), d = 0, e = 0.15;e < a.x - 0.15;e += 0.3) {
      for(var f = 0;f < a.y / 2;f += 0.3) {
        var h = g.g.Bb(new F(0.3, 0.3), new F(b.x + e - d++ % 2 * 0.15, b.y - f), c, {$b:{pd:0.1, Qb:0.1, gb:0.1}}), u = Math.random();
        u <= 0.25 ? Z(h, "graphics/ball-red.png") : u <= 0.5 ? Z(h, "graphics/ball-green.png") : u <= 0.75 ? Z(h, "graphics/ball-yellow.png") : Z(h, "graphics/ball-blue.png")
      }
    }
  };
  a.bf = function(a, b) {
    e.ac(a, b)
  };
  a.Re = function(a, b) {
    e.ac(a, b);
    f.ac(a, b)
  };
  a.Qe = function() {
    Vd(g.viewport, d.body.c.h)
  }
})(se);
ba("pit.init", se.Ib);


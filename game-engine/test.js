var COMPILED = !0, goog = goog || {};
goog.global = this;
goog.DEBUG = !0;
goog.LOCALE = "en";
goog.provide = function(a) {
  if(!COMPILED) {
    if(goog.isProvided_(a)) {
      throw Error('Namespace "' + a + '" already declared.');
    }
    delete goog.implicitNamespaces_[a];
    for(var e = a;e = e.substring(0, e.lastIndexOf("."));) {
      if(goog.getObjectByName(e)) {
        break
      }
      goog.implicitNamespaces_[e] = !0
    }
  }
  goog.exportPath_(a)
};
goog.setTestOnly = function(a) {
  if(COMPILED && !goog.DEBUG) {
    throw a = a || "", Error("Importing test-only code into non-debug environment" + a ? ": " + a : ".");
  }
};
if(!COMPILED) {
  goog.isProvided_ = function(a) {
    return!goog.implicitNamespaces_[a] && !!goog.getObjectByName(a)
  }, goog.implicitNamespaces_ = {}
}
goog.exportPath_ = function(a, e, d) {
  a = a.split(".");
  d = d || goog.global;
  !(a[0] in d) && d.execScript && d.execScript("var " + a[0]);
  for(var b;a.length && (b = a.shift());) {
    !a.length && goog.isDef(e) ? d[b] = e : d = d[b] ? d[b] : d[b] = {}
  }
};
goog.getObjectByName = function(a, e) {
  for(var d = a.split("."), b = e || goog.global, g;g = d.shift();) {
    if(goog.isDefAndNotNull(b[g])) {
      b = b[g]
    }else {
      return null
    }
  }
  return b
};
goog.globalize = function(a, e) {
  var d = e || goog.global, b;
  for(b in a) {
    d[b] = a[b]
  }
};
goog.addDependency = function(a, e, d) {
  if(!COMPILED) {
    for(var b, a = a.replace(/\\/g, "/"), g = goog.dependencies_, f = 0;b = e[f];f++) {
      g.nameToPath[b] = a, a in g.pathToNames || (g.pathToNames[a] = {}), g.pathToNames[a][b] = !0
    }
    for(b = 0;e = d[b];b++) {
      a in g.requires || (g.requires[a] = {}), g.requires[a][e] = !0
    }
  }
};
goog.ENABLE_DEBUG_LOADER = !0;
goog.require = function(a) {
  if(!COMPILED && !goog.isProvided_(a)) {
    if(goog.ENABLE_DEBUG_LOADER) {
      var e = goog.getPathFromDeps_(a);
      if(e) {
        goog.included_[e] = !0;
        goog.writeScripts_();
        return
      }
    }
    a = "goog.require could not find: " + a;
    goog.global.console && goog.global.console.error(a);
    throw Error(a);
  }
};
goog.basePath = "";
goog.nullFunction = function() {
};
goog.identityFunction = function(a) {
  return a
};
goog.abstractMethod = function() {
  throw Error("unimplemented abstract method");
};
goog.addSingletonGetter = function(a) {
  a.getInstance = function() {
    return a.instance_ || (a.instance_ = new a)
  }
};
if(!COMPILED && goog.ENABLE_DEBUG_LOADER) {
  goog.included_ = {}, goog.dependencies_ = {pathToNames:{}, nameToPath:{}, requires:{}, visited:{}, written:{}}, goog.inHtmlDocument_ = function() {
    var a = goog.global.document;
    return typeof a != "undefined" && "write" in a
  }, goog.findBasePath_ = function() {
    if(goog.global.CLOSURE_BASE_PATH) {
      goog.basePath = goog.global.CLOSURE_BASE_PATH
    }else {
      if(goog.inHtmlDocument_()) {
        for(var a = goog.global.document.getElementsByTagName("script"), e = a.length - 1;e >= 0;--e) {
          var d = a[e].src, b = d.lastIndexOf("?"), b = b == -1 ? d.length : b;
          if(d.substr(b - 7, 7) == "base.js") {
            goog.basePath = d.substr(0, b - 7);
            break
          }
        }
      }
    }
  }, goog.importScript_ = function(a) {
    var e = goog.global.CLOSURE_IMPORT_SCRIPT || goog.writeScriptTag_;
    !goog.dependencies_.written[a] && e(a) && (goog.dependencies_.written[a] = !0)
  }, goog.writeScriptTag_ = function(a) {
    return goog.inHtmlDocument_() ? (goog.global.document.write('<script type="text/javascript" src="' + a + '"><\/script>'), !0) : !1
  }, goog.writeScripts_ = function() {
    function a(g) {
      if(!(g in b.written)) {
        if(!(g in b.visited) && (b.visited[g] = !0, g in b.requires)) {
          for(var l in b.requires[g]) {
            if(!goog.isProvided_(l)) {
              if(l in b.nameToPath) {
                a(b.nameToPath[l])
              }else {
                throw Error("Undefined nameToPath for " + l);
              }
            }
          }
        }
        g in d || (d[g] = !0, e.push(g))
      }
    }
    var e = [], d = {}, b = goog.dependencies_, g;
    for(g in goog.included_) {
      b.written[g] || a(g)
    }
    for(g = 0;g < e.length;g++) {
      if(e[g]) {
        goog.importScript_(goog.basePath + e[g])
      }else {
        throw Error("Undefined script input");
      }
    }
  }, goog.getPathFromDeps_ = function(a) {
    return a in goog.dependencies_.nameToPath ? goog.dependencies_.nameToPath[a] : null
  }, goog.findBasePath_(), goog.global.CLOSURE_NO_DEPS || goog.importScript_(goog.basePath + "deps.js")
}
goog.typeOf = function(a) {
  var e = typeof a;
  if(e == "object") {
    if(a) {
      if(a instanceof Array) {
        return"array"
      }else {
        if(a instanceof Object) {
          return e
        }
      }
      var d = Object.prototype.toString.call(a);
      if(d == "[object Window]") {
        return"object"
      }
      if(d == "[object Array]" || typeof a.length == "number" && typeof a.splice != "undefined" && typeof a.propertyIsEnumerable != "undefined" && !a.propertyIsEnumerable("splice")) {
        return"array"
      }
      if(d == "[object Function]" || typeof a.call != "undefined" && typeof a.propertyIsEnumerable != "undefined" && !a.propertyIsEnumerable("call")) {
        return"function"
      }
    }else {
      return"null"
    }
  }else {
    if(e == "function" && typeof a.call == "undefined") {
      return"object"
    }
  }
  return e
};
goog.propertyIsEnumerableCustom_ = function(a, e) {
  if(e in a) {
    for(var d in a) {
      if(d == e && Object.prototype.hasOwnProperty.call(a, e)) {
        return!0
      }
    }
  }
  return!1
};
goog.propertyIsEnumerable_ = function(a, e) {
  return a instanceof Object ? Object.prototype.propertyIsEnumerable.call(a, e) : goog.propertyIsEnumerableCustom_(a, e)
};
goog.isDef = function(a) {
  return a !== void 0
};
goog.isNull = function(a) {
  return a === null
};
goog.isDefAndNotNull = function(a) {
  return a != null
};
goog.isArray = function(a) {
  return goog.typeOf(a) == "array"
};
goog.isArrayLike = function(a) {
  var e = goog.typeOf(a);
  return e == "array" || e == "object" && typeof a.length == "number"
};
goog.isDateLike = function(a) {
  return goog.isObject(a) && typeof a.getFullYear == "function"
};
goog.isString = function(a) {
  return typeof a == "string"
};
goog.isBoolean = function(a) {
  return typeof a == "boolean"
};
goog.isNumber = function(a) {
  return typeof a == "number"
};
goog.isFunction = function(a) {
  return goog.typeOf(a) == "function"
};
goog.isObject = function(a) {
  a = goog.typeOf(a);
  return a == "object" || a == "array" || a == "function"
};
goog.getUid = function(a) {
  return a[goog.UID_PROPERTY_] || (a[goog.UID_PROPERTY_] = ++goog.uidCounter_)
};
goog.removeUid = function(a) {
  "removeAttribute" in a && a.removeAttribute(goog.UID_PROPERTY_);
  try {
    delete a[goog.UID_PROPERTY_]
  }catch(e) {
  }
};
goog.UID_PROPERTY_ = "closure_uid_" + Math.floor(Math.random() * 2147483648).toString(36);
goog.uidCounter_ = 0;
goog.getHashCode = goog.getUid;
goog.removeHashCode = goog.removeUid;
goog.cloneObject = function(a) {
  var e = goog.typeOf(a);
  if(e == "object" || e == "array") {
    if(a.clone) {
      return a.clone()
    }
    var e = e == "array" ? [] : {}, d;
    for(d in a) {
      e[d] = goog.cloneObject(a[d])
    }
    return e
  }
  return a
};
goog.bindNative_ = function(a, e, d) {
  return a.call.apply(a.bind, arguments)
};
goog.bindJs_ = function(a, e, d) {
  var b = e || goog.global;
  if(arguments.length > 2) {
    var g = Array.prototype.slice.call(arguments, 2);
    return function() {
      var e = Array.prototype.slice.call(arguments);
      Array.prototype.unshift.apply(e, g);
      return a.apply(b, e)
    }
  }else {
    return function() {
      return a.apply(b, arguments)
    }
  }
};
goog.bind = function(a, e, d) {
  goog.bind = Function.prototype.bind && Function.prototype.bind.toString().indexOf("native code") != -1 ? goog.bindNative_ : goog.bindJs_;
  return goog.bind.apply(null, arguments)
};
goog.partial = function(a, e) {
  var d = Array.prototype.slice.call(arguments, 1);
  return function() {
    var e = Array.prototype.slice.call(arguments);
    e.unshift.apply(e, d);
    return a.apply(this, e)
  }
};
goog.mixin = function(a, e) {
  for(var d in e) {
    a[d] = e[d]
  }
};
goog.now = Date.now || function() {
  return+new Date
};
goog.globalEval = function(a) {
  if(goog.global.execScript) {
    goog.global.execScript(a, "JavaScript")
  }else {
    if(goog.global.eval) {
      if(goog.evalWorksForGlobals_ == null) {
        goog.global.eval("var _et_ = 1;"), typeof goog.global._et_ != "undefined" ? (delete goog.global._et_, goog.evalWorksForGlobals_ = !0) : goog.evalWorksForGlobals_ = !1
      }
      if(goog.evalWorksForGlobals_) {
        goog.global.eval(a)
      }else {
        var e = goog.global.document, d = e.createElement("script");
        d.type = "text/javascript";
        d.defer = !1;
        d.appendChild(e.createTextNode(a));
        e.body.appendChild(d);
        e.body.removeChild(d)
      }
    }else {
      throw Error("goog.globalEval not available");
    }
  }
};
goog.evalWorksForGlobals_ = null;
goog.getCssName = function(a, e) {
  var d = function(e) {
    return goog.cssNameMapping_[e] || e
  }, b;
  b = goog.cssNameMapping_ ? goog.cssNameMappingStyle_ == "BY_WHOLE" ? d : function(e) {
    for(var e = e.split("-"), a = [], b = 0;b < e.length;b++) {
      a.push(d(e[b]))
    }
    return a.join("-")
  } : function(e) {
    return e
  };
  return e ? a + "-" + b(e) : b(a)
};
goog.setCssNameMapping = function(a, e) {
  goog.cssNameMapping_ = a;
  goog.cssNameMappingStyle_ = e
};
goog.getMsg = function(a, e) {
  var d = e || {}, b;
  for(b in d) {
    var g = ("" + d[b]).replace(/\$/g, "$$$$"), a = a.replace(RegExp("\\{\\$" + b + "\\}", "gi"), g)
  }
  return a
};
goog.exportSymbol = function(a, e, d) {
  goog.exportPath_(a, e, d)
};
goog.exportProperty = function(a, e, d) {
  a[e] = d
};
goog.inherits = function(a, e) {
  function d() {
  }
  d.prototype = e.prototype;
  a.superClass_ = e.prototype;
  a.prototype = new d;
  a.prototype.constructor = a
};
goog.base = function(a, e, d) {
  var b = arguments.callee.caller;
  if(b.superClass_) {
    return b.superClass_.constructor.apply(a, Array.prototype.slice.call(arguments, 1))
  }
  for(var g = Array.prototype.slice.call(arguments, 2), f = !1, l = a.constructor;l;l = l.superClass_ && l.superClass_.constructor) {
    if(l.prototype[e] === b) {
      f = !0
    }else {
      if(f) {
        return l.prototype[e].apply(a, g)
      }
    }
  }
  if(a[e] === b) {
    return a.constructor.prototype[e].apply(a, g)
  }else {
    throw Error("goog.base called from a method of one name to a method of a different name");
  }
};
goog.scope = function(a) {
  a.call(goog.global)
};
var Box2D = {base:{}};
(function(a, e) {
  if(!(Object.prototype.defineProperty instanceof Function) && Object.prototype.__defineGetter__ instanceof Function && Object.prototype.__defineSetter__ instanceof Function) {
    Object.defineProperty = function(e, a, d) {
      d.get instanceof Function && e.__defineGetter__(a, d.get);
      d.set instanceof Function && e.__defineSetter__(a, d.set)
    }
  }
  var d = function() {
  };
  a.inherit = function(e, a) {
    d.prototype = a.prototype;
    e.prototype = new d;
    e.prototype.constructor = e
  };
  a.generateCallback = function(e, a) {
    return function() {
      a.apply(e, arguments)
    }
  };
  a.NVector = function(a) {
    a === e && (a = 0);
    for(var d = Array(a || 0), f = 0;f < a;++f) {
      d[f] = 0
    }
    return d
  };
  a.is = function(a, d) {
    return a === null ? !1 : d instanceof Function && a instanceof d ? !0 : a.constructor.__implements !== e && a.constructor.__implements[d] ? !0 : !1
  };
  a.parseUInt = function(e) {
    return Math.abs(e)
  }
})(Box2D);
Box2D.Queue = function() {
  this.queue = [];
  this.start = this.size = 0
};
Box2D.Queue.prototype.enqueue = function(a) {
  this.queue[this.start + this.size] = a;
  this.size++
};
Box2D.Queue.prototype.dequeue = function() {
  var a = this.queue[this.start];
  this.queue[this.start] = null;
  this.size--;
  this.start++;
  return a
};
Box2D.postDefs = [];
Box2D.Collision = {};
Box2D.Collision.IBroadPhase = "Box2D.Collision.IBroadPhase";
Box2D.Collision.b2AABB = function() {
  this.lowerBound = new Box2D.Common.Math.b2Vec2;
  this.upperBound = new Box2D.Common.Math.b2Vec2
};
(function(a) {
  a.prototype.IsValid = function() {
    return this.upperBound.x - this.lowerBound.x < 0 ? !1 : this.upperBound.y - this.lowerBound.y < 0 ? !1 : this.lowerBound.IsValid() && this.upperBound.IsValid()
  };
  a.prototype.GetCenter = function() {
    return new Box2D.Common.Math.b2Vec2((this.lowerBound.x + this.upperBound.x) / 2, (this.lowerBound.y + this.upperBound.y) / 2)
  };
  a.prototype.GetExtents = function() {
    return new Box2D.Common.Math.b2Vec2((this.upperBound.x - this.lowerBound.x) / 2, (this.upperBound.y - this.lowerBound.y) / 2)
  };
  a.prototype.Contains = function(e) {
    var a;
    return a = (a = (a = (a = this.lowerBound.x <= e.lowerBound.x) && this.lowerBound.y <= e.lowerBound.y) && e.upperBound.x <= this.upperBound.x) && e.upperBound.y <= this.upperBound.y
  };
  a.prototype.RayCast = function(e, a) {
    var b = -Number.MAX_VALUE, g = Number.MAX_VALUE, f = a.p2.x - a.p1.x;
    if(Math.abs(f) < Number.MIN_VALUE) {
      if(a.p1.x < this.lowerBound.x || this.upperBound.x < a.p1.x) {
        return!1
      }
    }else {
      var l = 1 / f, f = (this.lowerBound.x - a.p1.x) * l;
      l *= this.upperBound.x - a.p1.x;
      var h = -1;
      f > l && (h = f, f = l, l = h, h = 1);
      if(f > b) {
        e.normal.x = h, e.normal.y = 0, b = f
      }
      g = Math.min(g, l);
      if(b > g) {
        return!1
      }
    }
    f = a.p2.y - a.p1.y;
    if(Math.abs(f) < Number.MIN_VALUE) {
      if(a.p1.y < this.lowerBound.y || this.upperBound.y < a.p1.y) {
        return!1
      }
    }else {
      l = 1 / f;
      f = (this.lowerBound.y - a.p1.y) * l;
      l *= this.upperBound.y - a.p1.y;
      h = -1;
      f > l && (h = f, f = l, l = h, h = 1);
      if(f > b) {
        e.normal.y = h, e.normal.x = 0, b = f
      }
      g = Math.min(g, l);
      if(b > g) {
        return!1
      }
    }
    e.fraction = b;
    return!0
  };
  a.prototype.TestOverlap = function(e) {
    return e.lowerBound.x - this.upperBound.x > 0 ? !1 : e.lowerBound.y - this.upperBound.y > 0 ? !1 : this.lowerBound.x - e.upperBound.x > 0 ? !1 : this.lowerBound.y - e.upperBound.y > 0 ? !1 : !0
  };
  a.Combine = function(e, d) {
    var b = new a;
    b.Combine(e, d);
    return b
  };
  a.prototype.Combine = function(e, a) {
    this.lowerBound.x = Math.min(e.lowerBound.x, a.lowerBound.x);
    this.lowerBound.y = Math.min(e.lowerBound.y, a.lowerBound.y);
    this.upperBound.x = Math.max(e.upperBound.x, a.upperBound.x);
    this.upperBound.y = Math.max(e.upperBound.y, a.upperBound.y)
  }
})(Box2D.Collision.b2AABB);
Box2D.Collision.b2Collision = function() {
};
(function(a) {
  a.ClipSegmentToLine = function(e, a, b, g) {
    g === void 0 && (g = 0);
    var f = 0, l = a[0].v, h = a[1].v, n = b.x * l.x + b.y * l.y - g, b = b.x * h.x + b.y * h.y - g;
    n <= 0 && e[f++].Set(a[0]);
    b <= 0 && e[f++].Set(a[1]);
    if(n * b < 0) {
      b = n / (n - b), g = e[f].v, g.x = l.x + b * (h.x - l.x), g.y = l.y + b * (h.y - l.y), e[f].id = n > 0 ? a[0].id : a[1].id, f++
    }
    return f
  };
  a.EdgeSeparation = function(e, a, b, g, f) {
    b === void 0 && (b = 0);
    for(var l = e.m_vertices, h = e.m_normals, e = g.m_vertices, n = a.R.col1.x * h[b].x + a.R.col2.x * h[b].y, h = a.R.col1.y * h[b].x + a.R.col2.y * h[b].y, j = f.R.col1.x * n + f.R.col1.y * h, r = f.R.col2.x * n + f.R.col2.y * h, p = 0, v = Number.MAX_VALUE, o = 0;o < g.m_vertexCount;++o) {
      var w = e[o].x * j + e[o].y * r;
      w < v && (v = w, p = o)
    }
    return(f.position.x + (f.R.col1.x * e[p].x + f.R.col2.x * e[p].y) - (a.position.x + (a.R.col1.x * l[b].x + a.R.col2.x * l[b].y))) * n + (f.position.y + (f.R.col1.y * e[p].x + f.R.col2.y * e[p].y) - (a.position.y + (a.R.col1.y * l[b].x + a.R.col2.y * l[b].y))) * h
  };
  a.FindMaxSeparation = function(e, d, b, g, f) {
    var l = d.m_normals, h = f.position.x + (f.R.col1.x * g.m_centroid.x + f.R.col2.x * g.m_centroid.y), n = f.position.y + (f.R.col1.y * g.m_centroid.x + f.R.col2.y * g.m_centroid.y);
    h -= b.position.x + (b.R.col1.x * d.m_centroid.x + b.R.col2.x * d.m_centroid.y);
    n -= b.position.y + (b.R.col1.y * d.m_centroid.x + b.R.col2.y * d.m_centroid.y);
    for(var j = h * b.R.col1.x + n * b.R.col1.y, n = h * b.R.col2.x + n * b.R.col2.y, h = 0, r = -Number.MAX_VALUE, p = 0;p < d.m_vertexCount;++p) {
      var v = l[p].x * j + l[p].y * n;
      v > r && (r = v, h = p)
    }
    l = a.EdgeSeparation(d, b, h, g, f);
    j = h - 1;
    j < 0 && (j = d.m_vertexCount - 1);
    n = a.EdgeSeparation(d, b, j, g, f);
    r = h + 1;
    r >= d.m_vertexCount && (r = 0);
    var p = a.EdgeSeparation(d, b, r, g, f), o = v = 0, w = 0;
    if(n > l && n > p) {
      w = -1, v = j, o = n
    }else {
      if(p > l) {
        w = 1, v = r, o = p
      }else {
        return e[0] = h, l
      }
    }
    for(;;) {
      if(w == -1 ? (h = v - 1, h < 0 && (h = d.m_vertexCount - 1)) : (h = v + 1, h >= d.m_vertexCount && (h = 0)), l = a.EdgeSeparation(d, b, h, g, f), l > o) {
        v = h, o = l
      }else {
        break
      }
    }
    e[0] = v;
    return o
  };
  a.FindIncidentEdge = function(e, a, b, g, f, l) {
    g === void 0 && (g = 0);
    for(var h = b.R.col1.x * a.m_normals[g].x + b.R.col2.x * a.m_normals[g].y, a = b.R.col1.y * a.m_normals[g].x + b.R.col2.y * a.m_normals[g].y, b = l.R.col1.x * h + l.R.col1.y * a, a = l.R.col2.x * h + l.R.col2.y * a, h = b, b = 0, n = Number.MAX_VALUE, j = 0;j < f.m_vertexCount;j++) {
      var r = h * f.m_normals[j].x + a * f.m_normals[j].y;
      r < n && (n = r, b = j)
    }
    h = b + 1;
    h >= f.m_vertexCount && (h = 0);
    e[0].v.x = l.position.x + (l.R.col1.x * f.m_vertices[b].x + l.R.col2.x * f.m_vertices[b].y);
    e[0].v.y = l.position.y + (l.R.col1.y * f.m_vertices[b].x + l.R.col2.y * f.m_vertices[b].y);
    e[0].id.features.referenceEdge = g;
    e[0].id.features.incidentEdge = b;
    e[0].id.features.incidentVertex = 0;
    e[1].v.x = l.position.x + (l.R.col1.x * f.m_vertices[h].x + l.R.col2.x * f.m_vertices[h].y);
    e[1].v.y = l.position.y + (l.R.col1.y * f.m_vertices[h].x + l.R.col2.y * f.m_vertices[h].y);
    e[1].id.features.referenceEdge = g;
    e[1].id.features.incidentEdge = h;
    e[1].id.features.incidentVertex = 1
  };
  a.MakeClipPointVector = function() {
    return[new Box2D.Collision.ClipVertex, new Box2D.Collision.ClipVertex]
  };
  a.CollidePolygons = function(e, d, b, g, f) {
    e.m_pointCount = 0;
    var l = d.m_radius + g.m_radius;
    a.s_edgeAO[0] = 0;
    var h = a.FindMaxSeparation(a.s_edgeAO, d, b, g, f);
    if(!(h > l)) {
      a.s_edgeBO[0] = 0;
      var n = a.FindMaxSeparation(a.s_edgeBO, g, f, d, b);
      if(!(n > l)) {
        var j = d, r = g, p = b, v = f, o = a.s_edgeAO[0], w = 0;
        e.m_type = Box2D.Collision.b2Manifold.e_faceA;
        if(n > 0.98 * h + 0.001) {
          j = g, r = d, p = f, v = b, o = a.s_edgeBO[0], e.m_type = Box2D.Collision.b2Manifold.e_faceB, w = 1
        }
        d = a.s_incidentEdge;
        a.FindIncidentEdge(d, j, p, o, r, v);
        r = j.m_vertices[o];
        j = o + 1 < j.m_vertexCount ? j.m_vertices[o + 1] : j.m_vertices[0];
        a.s_localTangent.Set(j.x - r.x, j.y - r.y);
        a.s_localTangent.Normalize();
        a.s_localNormal.x = a.s_localTangent.y;
        a.s_localNormal.y = -a.s_localTangent.x;
        a.s_planePoint.Set(0.5 * (r.x + j.x), 0.5 * (r.y + j.y));
        a.s_tangent.x = p.R.col1.x * a.s_localTangent.x + p.R.col2.x * a.s_localTangent.y;
        a.s_tangent.y = p.R.col1.y * a.s_localTangent.x + p.R.col2.y * a.s_localTangent.y;
        a.s_tangent2.x = -a.s_tangent.x;
        a.s_tangent2.y = -a.s_tangent.y;
        a.s_normal.x = a.s_tangent.y;
        a.s_normal.y = -a.s_tangent.x;
        a.s_v11.x = p.position.x + (p.R.col1.x * r.x + p.R.col2.x * r.y);
        a.s_v11.y = p.position.y + (p.R.col1.y * r.x + p.R.col2.y * r.y);
        a.s_v12.x = p.position.x + (p.R.col1.x * j.x + p.R.col2.x * j.y);
        a.s_v12.y = p.position.y + (p.R.col1.y * j.x + p.R.col2.y * j.y);
        if(!(a.ClipSegmentToLine(a.s_clipPoints1, d, a.s_tangent2, -a.s_tangent.x * a.s_v11.x - a.s_tangent.y * a.s_v11.y + l) < 2) && !(a.ClipSegmentToLine(a.s_clipPoints2, a.s_clipPoints1, a.s_tangent, a.s_tangent.x * a.s_v12.x + a.s_tangent.y * a.s_v12.y + l) < 2)) {
          e.m_localPlaneNormal.SetV(a.s_localNormal);
          e.m_localPoint.SetV(a.s_planePoint);
          p = a.s_normal.x * a.s_v11.x + a.s_normal.y * a.s_v11.y;
          for(o = j = 0;o < Box2D.Common.b2Settings.b2_maxManifoldPoints;++o) {
            if(a.s_normal.x * a.s_clipPoints2[o].v.x + a.s_normal.y * a.s_clipPoints2[o].v.y - p <= l) {
              r = a.s_clipPoints2[o].v.x - v.position.x, d = a.s_clipPoints2[o].v.y - v.position.y, e.m_points[j].m_localPoint.x = r * v.R.col1.x + d * v.R.col1.y, e.m_points[j].m_localPoint.y = r * v.R.col2.x + d * v.R.col2.y, e.m_points[j].m_id.Set(a.s_clipPoints2[o].id), e.m_points[j].m_id.features.flip = w, j++
            }
          }
          e.m_pointCount = j
        }
      }
    }
  };
  a.CollideCircles = function(e, a, b, g, f) {
    e.m_pointCount = 0;
    var l = f.position.x + (f.R.col1.x * g.m_p.x + f.R.col2.x * g.m_p.y) - (b.position.x + (b.R.col1.x * a.m_p.x + b.R.col2.x * a.m_p.y)), b = f.position.y + (f.R.col1.y * g.m_p.x + f.R.col2.y * g.m_p.y) - (b.position.y + (b.R.col1.y * a.m_p.x + b.R.col2.y * a.m_p.y)), f = a.m_radius + g.m_radius;
    if(!(l * l + b * b > f * f)) {
      e.m_type = Box2D.Collision.b2Manifold.e_circles, e.m_localPoint.SetV(a.m_p), e.m_localPlaneNormal.SetZero(), e.m_pointCount = 1, e.m_points[0].m_localPoint.SetV(g.m_p), e.m_points[0].m_id.key = 0
    }
  };
  a.CollidePolygonAndCircle = function(a, d, b, g, f) {
    a.m_pointCount = 0;
    for(var l = f.position.x + (f.R.col1.x * g.m_p.x + f.R.col2.x * g.m_p.y) - b.position.x, h = f.position.y + (f.R.col1.y * g.m_p.x + f.R.col2.y * g.m_p.y) - b.position.y, f = l * b.R.col1.x + h * b.R.col1.y, b = l * b.R.col2.x + h * b.R.col2.y, l = 0, h = -Number.MAX_VALUE, n = d.m_radius + g.m_radius, j = 0;j < d.m_vertexCount;++j) {
      var r = d.m_normals[j].x * (f - d.m_vertices[j].x) + d.m_normals[j].y * (b - d.m_vertices[j].y);
      if(r > n) {
        return
      }
      r > h && (h = r, l = j)
    }
    r = l + 1;
    r >= d.m_vertexCount && (r = 0);
    var j = d.m_vertices[l], p = d.m_vertices[r];
    if(h < Number.MIN_VALUE) {
      a.m_pointCount = 1, a.m_type = Box2D.Collision.b2Manifold.e_faceA, a.m_localPlaneNormal.SetV(d.m_normals[l]), a.m_localPoint.x = 0.5 * (j.x + p.x), a.m_localPoint.y = 0.5 * (j.y + p.y)
    }else {
      if((f - j.x) * (p.x - j.x) + (b - j.y) * (p.y - j.y) <= 0) {
        if((f - j.x) * (f - j.x) + (b - j.y) * (b - j.y) > n * n) {
          return
        }
        a.m_pointCount = 1;
        a.m_type = Box2D.Collision.b2Manifold.e_faceA;
        a.m_localPlaneNormal.x = f - j.x;
        a.m_localPlaneNormal.y = b - j.y;
        a.m_localPlaneNormal.Normalize();
        a.m_localPoint.SetV(j)
      }else {
        if((f - p.x) * (j.x - p.x) + (b - p.y) * (j.y - p.y) <= 0) {
          if((f - p.x) * (f - p.x) + (b - p.y) * (b - p.y) > n * n) {
            return
          }
          a.m_pointCount = 1;
          a.m_type = Box2D.Collision.b2Manifold.e_faceA;
          a.m_localPlaneNormal.x = f - p.x;
          a.m_localPlaneNormal.y = b - p.y;
          a.m_localPlaneNormal.Normalize();
          a.m_localPoint.SetV(p)
        }else {
          r = 0.5 * (j.x + p.x);
          j = 0.5 * (j.y + p.y);
          h = (f - r) * d.m_normals[l].x + (b - j) * d.m_normals[l].y;
          if(h > n) {
            return
          }
          a.m_pointCount = 1;
          a.m_type = Box2D.Collision.b2Manifold.e_faceA;
          a.m_localPlaneNormal.x = d.m_normals[l].x;
          a.m_localPlaneNormal.y = d.m_normals[l].y;
          a.m_localPlaneNormal.Normalize();
          a.m_localPoint.Set(r, j)
        }
      }
    }
    a.m_points[0].m_localPoint.SetV(g.m_p);
    a.m_points[0].m_id.key = 0
  };
  a.TestOverlap = function(a, d) {
    return d.lowerBound.x - a.upperBound.x > 0 ? !1 : d.lowerBound.y - a.upperBound.y > 0 ? !1 : a.lowerBound.x - d.upperBound.x > 0 ? !1 : a.lowerBound.y - d.upperBound.y > 0 ? !1 : !0
  };
  Box2D.postDefs.push(function() {
    Box2D.Collision.b2Collision.s_incidentEdge = a.MakeClipPointVector();
    Box2D.Collision.b2Collision.s_clipPoints1 = a.MakeClipPointVector();
    Box2D.Collision.b2Collision.s_clipPoints2 = a.MakeClipPointVector();
    Box2D.Collision.b2Collision.s_edgeAO = [0];
    Box2D.Collision.b2Collision.s_edgeBO = [0];
    Box2D.Collision.b2Collision.s_localTangent = new Box2D.Common.Math.b2Vec2;
    Box2D.Collision.b2Collision.s_localNormal = new Box2D.Common.Math.b2Vec2;
    Box2D.Collision.b2Collision.s_planePoint = new Box2D.Common.Math.b2Vec2;
    Box2D.Collision.b2Collision.s_normal = new Box2D.Common.Math.b2Vec2;
    Box2D.Collision.b2Collision.s_tangent = new Box2D.Common.Math.b2Vec2;
    Box2D.Collision.b2Collision.s_tangent2 = new Box2D.Common.Math.b2Vec2;
    Box2D.Collision.b2Collision.s_v11 = new Box2D.Common.Math.b2Vec2;
    Box2D.Collision.b2Collision.s_v12 = new Box2D.Common.Math.b2Vec2
  })
})(Box2D.Collision.b2Collision);
Box2D.Collision.b2ContactID = function() {
  this.features = new Box2D.Collision.Features;
  this.constructor === Box2D.Collision.b2ContactID && this.b2ContactID.apply(this, arguments)
};
(function(a) {
  a.prototype.b2ContactID = function() {
    this.features._m_id = this
  };
  a.prototype.Set = function(a) {
    this.key = a._key
  };
  a.prototype.Copy = function() {
    var e = new a;
    e.key = this.key;
    return e
  };
  Object.defineProperty(a.prototype, "key", {enumerable:!1, configurable:!0, get:function() {
    return this._key
  }, set:function(a) {
    a === void 0 && (a = 0);
    this._key = a;
    this.features._referenceEdge = this._key & 255;
    this.features._incidentEdge = (this._key & 65280) >> 8 & 255;
    this.features._incidentVertex = (this._key & 16711680) >> 16 & 255;
    this.features._flip = (this._key & 4278190080) >> 24 & 255
  }})
})(Box2D.Collision.b2ContactID);
Box2D.Collision.b2ContactPoint = function() {
  this.position = new Box2D.Common.Math.b2Vec2;
  this.velocity = new Box2D.Common.Math.b2Vec2;
  this.normal = new Box2D.Common.Math.b2Vec2;
  this.id = new Box2D.Collision.b2ContactID
};
Box2D.Collision.b2Distance = function() {
};
(function(a) {
  a.Distance = function(e, d, b) {
    a.s_simplex.ReadCache(d, b.proxyA, b.transformA, b.proxyB, b.transformB);
    for((a.s_simplex.m_count < 1 || a.s_simplex.m_count > 3) && Box2D.Common.b2Settings.b2Assert(!1);a.s_simplex.m_count < 3;) {
      for(var g = [], f = 0;f < a.s_simplex.m_count;f++) {
        g[f] = {}, g[f].indexA = a.s_simplex.m_vertices[f].indexA, g[f].indexB = a.s_simplex.m_vertices[f].indexB
      }
      a.s_simplex.m_count == 2 && a.s_simplex.Solve2();
      f = a.s_simplex.GetSearchDirection();
      if(f.LengthSquared() < Box2D.MIN_VALUE_SQUARED) {
        break
      }
      a.s_simplex.m_vertices[a.s_simplex.m_count].indexA = b.proxyA.GetSupport(Box2D.Common.Math.b2Math.MulTMV(b.transformA.R, f.GetNegative()));
      a.s_simplex.m_vertices[a.s_simplex.m_count].wA = Box2D.Common.Math.b2Math.MulX(b.transformA, b.proxyA.GetVertex(a.s_simplex.m_vertices[a.s_simplex.m_count].indexA));
      a.s_simplex.m_vertices[a.s_simplex.m_count].indexB = b.proxyB.GetSupport(Box2D.Common.Math.b2Math.MulTMV(b.transformB.R, f));
      a.s_simplex.m_vertices[a.s_simplex.m_count].wB = Box2D.Common.Math.b2Math.MulX(b.transformB, b.proxyB.GetVertex(a.s_simplex.m_vertices[a.s_simplex.m_count].indexB));
      a.s_simplex.m_vertices[a.s_simplex.m_count].w = Box2D.Common.Math.b2Math.SubtractVV(a.s_simplex.m_vertices[a.s_simplex.m_count].wB, a.s_simplex.m_vertices[a.s_simplex.m_count].wA);
      for(var l = !1, f = 0;f < a.s_simplex.m_count;f++) {
        if(a.s_simplex.m_vertices[a.s_simplex.m_count].indexA == g[f].indexA && a.s_simplex.m_vertices[a.s_simplex.m_count].indexB == g[f].indexB) {
          l = !0;
          break
        }
      }
      if(l) {
        break
      }
      a.s_simplex.m_count++
    }
    a.s_simplex.m_count == 3 && a.s_simplex.Solve3();
    a.s_simplex.GetWitnessPoints(e.pointA, e.pointB);
    e.distance = Box2D.Common.Math.b2Math.SubtractVV(e.pointA, e.pointB).Length();
    a.s_simplex.WriteCache(d);
    if(b.useRadii) {
      d = b.proxyA.m_radius, b = b.proxyB.m_radius, e.distance > d + b && e.distance > Number.MIN_VALUE ? (e.distance -= d + b, g = b2Math.SubtractVV(e.pointB, e.pointA), g.Normalize(), e.pointA.x += d * g.x, e.pointA.y += d * g.y, e.pointB.x -= b * g.x, e.pointB.y -= b * g.y) : (b = new Box2D.Collision.b2Vec2, b.x = 0.5 * (e.pointA.x + e.pointB.x), b.y = 0.5 * (e.pointA.y + e.pointB.y), e.pointA.x = e.pointB.x = b.x, e.pointA.y = e.pointB.y = b.y, e.distance = 0)
    }
  };
  Box2D.postDefs.push(function() {
    Box2D.Collision.b2Distance.s_simplex = new Box2D.Collision.b2Simplex
  })
})(Box2D.Collision.b2Distance);
Box2D.Collision.b2DistanceInput = function() {
};
Box2D.Collision.b2DistanceOutput = function() {
  this.pointA = new Box2D.Common.Math.b2Vec2;
  this.pointB = new Box2D.Common.Math.b2Vec2
};
Box2D.Collision.b2DistanceProxy = function() {
};
(function(a) {
  a.prototype.Set = function(a) {
    var d = a.GetType();
    d == Box2D.Collision.Shapes.b2Shape.e_circleShape ? (this.m_vertices = [a.m_p], this.m_count = 1, this.m_radius = a.m_radius) : d == Box2D.Collision.Shapes.b2Shape.e_polygonShape ? (this.m_vertices = a.m_vertices, this.m_count = a.m_vertexCount, this.m_radius = a.m_radius) : Box2D.Common.b2Settings.b2Assert(!1)
  };
  a.prototype.GetSupport = function(a) {
    for(var d = 0, b = this.m_vertices[0].x * a.x + this.m_vertices[0].y * a.y, g = 1;g < this.m_count;g++) {
      var f = this.m_vertices[g].x * a.x + this.m_vertices[g].y * a.y;
      f > b && (d = g, b = f)
    }
    return d
  };
  a.prototype.GetSupportVertex = function(a) {
    return this.m_vertices[this.GetSupport(a)]
  };
  a.prototype.GetVertexCount = function() {
    return this.m_count
  };
  a.prototype.GetVertex = function(a) {
    a === void 0 && (a = 0);
    Box2D.Common.b2Settings.b2Assert(0 <= a && a < this.m_count);
    return this.m_vertices[a]
  }
})(Box2D.Collision.b2DistanceProxy);
Box2D.Dynamics = {};
Box2D.Dynamics.b2World = function(a, e) {
  this.m_contactManager = new Box2D.Dynamics.b2ContactManager;
  this.m_contactSolver = new Box2D.Dynamics.Contacts.b2ContactSolver;
  this.m_island = new Box2D.Dynamics.b2Island;
  if(this.constructor === Box2D.Dynamics.b2World) {
    this.m_newFixture = this.m_isLocked = !1, this.m_controllerList = this.m_jointList = this.m_contactList = this.m_bodyList = this.m_debugDraw = this.m_destructionListener = null, this.m_controllerCount = this.m_jointCount = this.m_contactCount = this.m_bodyCount = 0, Box2D.Dynamics.b2World.m_warmStarting = !0, Box2D.Dynamics.b2World.m_continuousPhysics = !0, this.m_allowSleep = e, this.m_gravity = a, this.m_inv_dt0 = 0, this.m_contactManager.m_world = this, this.m_groundBody = this.CreateBody(new Box2D.Dynamics.b2BodyDef)
  }
};
(function(a) {
  a.MAX_TOI = 1 - 100 * Number.MIN_VALUE;
  a.prototype.SetDestructionListener = function(a) {
    this.m_destructionListener = a
  };
  a.prototype.SetContactFilter = function(a) {
    this.m_contactManager.m_contactFilter = a
  };
  a.prototype.SetContactListener = function(a) {
    this.m_contactManager.m_contactListener = a
  };
  a.prototype.SetDebugDraw = function(a) {
    this.m_debugDraw = a
  };
  a.prototype.SetBroadPhase = function(a) {
    var d = this.m_contactManager.m_broadPhase;
    this.m_contactManager.m_broadPhase = a;
    for(var b = this.m_bodyList;b;b = b.m_next) {
      for(var g = b.m_fixtureList;g;g = g.m_next) {
        g.m_proxy = a.CreateProxy(d.GetFatAABB(g.m_proxy), g)
      }
    }
  };
  a.prototype.Validate = function() {
    this.m_contactManager.m_broadPhase.Validate()
  };
  a.prototype.GetProxyCount = function() {
    return this.m_contactManager.m_broadPhase.GetProxyCount()
  };
  a.prototype.CreateBody = function(a) {
    if(this.IsLocked()) {
      return null
    }
    a = new Box2D.Dynamics.b2Body(a, this);
    a.m_prev = null;
    if(a.m_next = this.m_bodyList) {
      this.m_bodyList.m_prev = a
    }
    this.m_bodyList = a;
    this.m_bodyCount++;
    return a
  };
  a.prototype.DestroyBody = function(a) {
    if(!this.IsLocked()) {
      for(var d = a.m_jointList;d;) {
        var b = d, d = d.next;
        this.m_destructionListener && this.m_destructionListener.SayGoodbyeJoint(b.joint);
        this.DestroyJoint(b.joint)
      }
      for(d = a.m_controllerList;d;) {
        b = d, d = d.nextController, b.controller.RemoveBody(a)
      }
      for(d = a.m_contactList;d;) {
        b = d, d = d.next, this.m_contactManager.Destroy(b.contact)
      }
      a.m_contactList = null;
      for(d = a.m_fixtureList;d;) {
        b = d, d = d.m_next, this.m_destructionListener && this.m_destructionListener.SayGoodbyeFixture(b), b.DestroyProxy(this.m_contactManager.m_broadPhase), b.Destroy()
      }
      a.m_fixtureList = null;
      a.m_fixtureCount = 0;
      if(a.m_prev) {
        a.m_prev.m_next = a.m_next
      }
      if(a.m_next) {
        a.m_next.m_prev = a.m_prev
      }
      if(a == this.m_bodyList) {
        this.m_bodyList = a.m_next
      }
      this.m_bodyCount--
    }
  };
  a.prototype.CreateJoint = function(a) {
    var d = Box2D.Dynamics.Joints.b2Joint.Create(a, null);
    d.m_prev = null;
    if(d.m_next = this.m_jointList) {
      this.m_jointList.m_prev = d
    }
    this.m_jointList = d;
    this.m_jointCount++;
    d.m_edgeA.joint = d;
    d.m_edgeA.other = d.m_bodyB;
    d.m_edgeA.prev = null;
    if(d.m_edgeA.next = d.m_bodyA.m_jointList) {
      d.m_bodyA.m_jointList.prev = d.m_edgeA
    }
    d.m_bodyA.m_jointList = d.m_edgeA;
    d.m_edgeB.joint = d;
    d.m_edgeB.other = d.m_bodyA;
    d.m_edgeB.prev = null;
    if(d.m_edgeB.next = d.m_bodyB.m_jointList) {
      d.m_bodyB.m_jointList.prev = d.m_edgeB
    }
    d.m_bodyB.m_jointList = d.m_edgeB;
    var b = a.bodyA, g = a.bodyB;
    if(!a.collideConnected) {
      for(a = g.GetContactList();a;) {
        a.other == b && a.contact.FlagForFiltering(), a = a.next
      }
    }
    return d
  };
  a.prototype.DestroyJoint = function(a) {
    var d = a.m_collideConnected;
    if(a.m_prev) {
      a.m_prev.m_next = a.m_next
    }
    if(a.m_next) {
      a.m_next.m_prev = a.m_prev
    }
    if(a == this.m_jointList) {
      this.m_jointList = a.m_next
    }
    var b = a.m_bodyA, g = a.m_bodyB;
    b.SetAwake(!0);
    g.SetAwake(!0);
    if(a.m_edgeA.prev) {
      a.m_edgeA.prev.next = a.m_edgeA.next
    }
    if(a.m_edgeA.next) {
      a.m_edgeA.next.prev = a.m_edgeA.prev
    }
    if(a.m_edgeA == b.m_jointList) {
      b.m_jointList = a.m_edgeA.next
    }
    a.m_edgeA.prev = null;
    a.m_edgeA.next = null;
    if(a.m_edgeB.prev) {
      a.m_edgeB.prev.next = a.m_edgeB.next
    }
    if(a.m_edgeB.next) {
      a.m_edgeB.next.prev = a.m_edgeB.prev
    }
    if(a.m_edgeB == g.m_jointList) {
      g.m_jointList = a.m_edgeB.next
    }
    a.m_edgeB.prev = null;
    a.m_edgeB.next = null;
    Box2D.Dynamics.Joints.b2Joint.Destroy(a, null);
    this.m_jointCount--;
    if(!d) {
      for(a = g.GetContactList();a;) {
        a.other == b && a.contact.FlagForFiltering(), a = a.next
      }
    }
  };
  a.prototype.AddController = function(a) {
    a.m_next = this.m_controllerList;
    a.m_prev = null;
    this.m_controllerList = a;
    a.m_world = this;
    this.m_controllerCount++;
    return a
  };
  a.prototype.RemoveController = function(a) {
    if(a.m_prev) {
      a.m_prev.m_next = a.m_next
    }
    if(a.m_next) {
      a.m_next.m_prev = a.m_prev
    }
    if(this.m_controllerList == a) {
      this.m_controllerList = a.m_next
    }
    this.m_controllerCount--
  };
  a.prototype.CreateController = function(a) {
    if(a.m_world != this) {
      throw Error("Controller can only be a member of one world");
    }
    a.m_next = this.m_controllerList;
    a.m_prev = null;
    if(this.m_controllerList) {
      this.m_controllerList.m_prev = a
    }
    this.m_controllerList = a;
    this.m_controllerCount++;
    a.m_world = this;
    return a
  };
  a.prototype.DestroyController = function(a) {
    a.Clear();
    if(a.m_next) {
      a.m_next.m_prev = a.m_prev
    }
    if(a.m_prev) {
      a.m_prev.m_next = a.m_next
    }
    if(a == this.m_controllerList) {
      this.m_controllerList = a.m_next
    }
    this.m_controllerCount--
  };
  a.prototype.SetWarmStarting = function(e) {
    a.m_warmStarting = e
  };
  a.prototype.SetContinuousPhysics = function(e) {
    a.m_continuousPhysics = e
  };
  a.prototype.GetBodyCount = function() {
    return this.m_bodyCount
  };
  a.prototype.GetJointCount = function() {
    return this.m_jointCount
  };
  a.prototype.GetContactCount = function() {
    return this.m_contactCount
  };
  a.prototype.SetGravity = function(a) {
    this.m_gravity = a
  };
  a.prototype.GetGravity = function() {
    return this.m_gravity
  };
  a.prototype.GetGroundBody = function() {
    return this.m_groundBody
  };
  a.prototype.Step = function(e, d, b) {
    e === void 0 && (e = 0);
    d === void 0 && (d = 0);
    b === void 0 && (b = 0);
    if(this.m_newFixture) {
      this.m_contactManager.FindNewContacts(), this.m_newFixture = !1
    }
    this.m_isLocked = !0;
    var g = new Box2D.Dynamics.b2TimeStep;
    g.dt = e;
    g.velocityIterations = d;
    g.positionIterations = b;
    g.inv_dt = e > 0 ? 1 / e : 0;
    g.dtRatio = this.m_inv_dt0 * e;
    g.warmStarting = a.m_warmStarting;
    this.m_contactManager.Collide();
    if(g.dt > 0) {
      this.Solve(g), a.m_continuousPhysics && g.dt > 0 && this.SolveTOI(g), this.m_inv_dt0 = g.inv_dt
    }
    this.m_isLocked = !1
  };
  a.prototype.ClearForces = function() {
    for(var a = this.m_bodyList;a;a = a.m_next) {
      a.m_force.SetZero(), a.m_torque = 0
    }
  };
  a.prototype.DrawDebugData = function() {
    if(this.m_debugDraw !== null) {
      this.m_debugDraw.m_sprite.graphics.clear();
      var e = this.m_debugDraw.GetFlags();
      if(e & Box2D.Dynamics.b2DebugDraw.e_shapeBit) {
        for(var d = new Box2D.Common.b2Color(0.5, 0.5, 0.3), b = new Box2D.Common.b2Color(0.5, 0.9, 0.5), g = new Box2D.Common.b2Color(0.5, 0.5, 0.9), f = new Box2D.Common.b2Color(0.6, 0.6, 0.6), l = new Box2D.Common.b2Color(0.9, 0.7, 0.7), h = this.m_bodyList;h;h = h.m_next) {
          for(var n = h.GetFixtureList();n;n = n.m_next) {
            var j = n.GetShape();
            h.IsActive() ? h.GetType() == Box2D.Dynamics.b2Body.b2_staticBody ? this.DrawShape(j, h.m_xf, b) : h.GetType() == Box2D.Dynamics.b2Body.b2_kinematicBody ? this.DrawShape(j, h.m_xf, g) : h.IsAwake() ? this.DrawShape(j, h.m_xf, l) : this.DrawShape(j, h.m_xf, f) : this.DrawShape(j, h.m_xf, d)
          }
        }
      }
      if(e & Box2D.Dynamics.b2DebugDraw.e_jointBit) {
        for(h = this.m_jointList;h;h = h.m_next) {
          this.DrawJoint(h)
        }
      }
      if(e & Box2D.Dynamics.b2DebugDraw.e_controllerBit) {
        for(h = this.m_controllerList;h;h = h.m_next) {
          h.Draw(this.m_debugDraw)
        }
      }
      if(e & Box2D.Dynamics.b2DebugDraw.e_pairBit) {
        h = new Box2D.Common.b2Color(0.3, 0.9, 0.9);
        for(n = this.m_contactManager.m_contactList;n;n = n.GetNext()) {
          b = n.GetFixtureA(), d = n.GetFixtureB(), b = b.GetAABB().GetCenter(), d = d.GetAABB().GetCenter(), this.m_debugDraw.DrawSegment(b, d, h)
        }
      }
      if(e & Box2D.Dynamics.b2DebugDraw.e_aabbBit) {
        d = new Box2D.Common.b2Color(0, 0, 0.8);
        for(h = this.m_bodyList;h;h = h.GetNext()) {
          if(h.IsActive()) {
            for(n = h.GetFixtureList();n;n = n.GetNext()) {
              b = this.m_contactManager.m_broadPhase.GetFatAABB(n.m_proxy), this.m_debugDraw.DrawPolygon([new Box2D.Common.Math.b2Vec2(b.lowerBound.x, b.lowerBound.y), new Box2D.Common.Math.b2Vec2(b.upperBound.x, b.lowerBound.y), new Box2D.Common.Math.b2Vec2(b.upperBound.x, b.upperBound.y), new Box2D.Common.Math.b2Vec2(b.lowerBound.x, b.upperBound.y)], 4, d)
            }
          }
        }
      }
      if(e & Box2D.Dynamics.b2DebugDraw.e_centerOfMassBit) {
        for(h = this.m_bodyList;h;h = h.m_next) {
          a.s_xf.R = h.m_xf.R, a.s_xf.position = h.GetWorldCenter(), this.m_debugDraw.DrawTransform(a.s_xf)
        }
      }
    }
  };
  a.prototype.QueryAABB = function(a, d) {
    var b = this.m_contactManager.m_broadPhase;
    b.Query(function(d) {
      return a(b.GetUserData(d))
    }, d)
  };
  a.prototype.QueryShape = function(a, d, b) {
    if(b === void 0 || b === null) {
      b = new Box2D.Common.Math.b2Transform, b.SetIdentity()
    }
    var g = this.m_contactManager.m_broadPhase, f = new Box2D.Collision.b2AABB;
    d.ComputeAABB(f, b);
    g.Query(function(f) {
      f = g.GetUserData(f);
      f instanceof Box2D.Dynamics.b2Fixture || (f = null);
      return Box2D.Collision.Shapes.b2Shape.TestOverlap(d, b, f.GetShape(), f.GetBody().GetTransform()) ? a(f) : !0
    }, f)
  };
  a.prototype.QueryPoint = function(a, d) {
    var b = this.m_contactManager.m_broadPhase, g = new Box2D.Collision.b2AABB;
    g.lowerBound.Set(d.x - Box2D.Common.b2Settings.b2_linearSlop, d.y - Box2D.Common.b2Settings.b2_linearSlop);
    g.upperBound.Set(d.x + Box2D.Common.b2Settings.b2_linearSlop, d.y + Box2D.Common.b2Settings.b2_linearSlop);
    b.Query(function(g) {
      g = b.GetUserData(g);
      g instanceof Box2D.Dynamics.b2Fixture || (g = null);
      return g.TestPoint(d) ? a(g) : !0
    }, g)
  };
  a.prototype.RayCast = function(a, d, b) {
    var g = this.m_contactManager.m_broadPhase, f = new Box2D.Collision.b2RayCastOutput, l = new Box2D.Collision.b2RayCastInput(d, b);
    g.RayCast(function(h, n) {
      var j = g.GetUserData(n);
      j instanceof Box2D.Dynamics.b2Fixture || (j = null);
      if(j.RayCast(f, h)) {
        var l = 1 - f.fraction, l = new Box2D.Common.Math.b2Vec2(l * d.x + f.fraction * b.x, l * d.y + f.fraction * b.y);
        return a(j, l, f.normal, f.fraction)
      }else {
        return h.maxFraction
      }
    }, l)
  };
  a.prototype.RayCastOne = function(a, d) {
    var b;
    this.RayCast(function(a, e, d, h) {
      h === void 0 && (h = 0);
      b = a;
      return h
    }, a, d);
    return b
  };
  a.prototype.RayCastAll = function(a, d) {
    var b = [];
    this.RayCast(function(a) {
      b[b.length] = a;
      return 1
    }, a, d);
    return b
  };
  a.prototype.GetBodyList = function() {
    return this.m_bodyList
  };
  a.prototype.GetJointList = function() {
    return this.m_jointList
  };
  a.prototype.GetContactList = function() {
    return this.m_contactList
  };
  a.prototype.IsLocked = function() {
    return this.m_isLocked
  };
  a.prototype.Solve = function(a) {
    for(var d = this.m_controllerList;d;d = d.m_next) {
      d.Step(a)
    }
    this.m_island.Initialize(this.m_bodyCount, this.m_contactCount, this.m_jointCount, null, this.m_contactManager.m_contactListener, this.m_contactSolver);
    for(var b = this.m_bodyList;b;b = b.m_next) {
      b.m_flags &= ~Box2D.Dynamics.b2Body.e_islandFlag
    }
    for(d = this.m_contactList;d;d = d.m_next) {
      d.m_flags &= ~Box2D.Dynamics.Contacts.b2Contact.e_islandFlag
    }
    for(d = this.m_jointList;d;d = d.m_next) {
      d.m_islandFlag = !1
    }
    for(d = this.m_bodyList;d;d = d.m_next) {
      if(!(d.m_flags & Box2D.Dynamics.b2Body.e_islandFlag) && d.IsAwake() && d.IsActive() && d.GetType() != Box2D.Dynamics.b2Body.b2_staticBody) {
        this.m_island.Clear();
        var g = [];
        g.push(d);
        for(d.m_flags |= Box2D.Dynamics.b2Body.e_islandFlag;g.length > 0;) {
          if(b = g.pop(), this.m_island.AddBody(b), b.IsAwake() || b.SetAwake(!0), b.GetType() != Box2D.Dynamics.b2Body.b2_staticBody) {
            for(var f = b.m_contactList;f;f = f.next) {
              !(f.contact.m_flags & Box2D.Dynamics.Contacts.b2Contact.e_islandFlag) && !f.contact.IsSensor() && f.contact.IsEnabled() && f.contact.IsTouching() && (this.m_island.AddContact(f.contact), f.contact.m_flags |= Box2D.Dynamics.Contacts.b2Contact.e_islandFlag, f.other.m_flags & Box2D.Dynamics.b2Body.e_islandFlag || (g.push(f.other), f.other.m_flags |= Box2D.Dynamics.b2Body.e_islandFlag))
            }
            for(b = b.m_jointList;b;b = b.next) {
              if(!b.joint.m_islandFlag && b.other.IsActive()) {
                this.m_island.AddJoint(b.joint), b.joint.m_islandFlag = !0, b.other.m_flags & Box2D.Dynamics.b2Body.e_islandFlag || (g.push(b.other), b.other.m_flags |= Box2D.Dynamics.b2Body.e_islandFlag)
              }
            }
          }
        }
        this.m_island.Solve(a, this.m_gravity, this.m_allowSleep);
        for(g = 0;g < this.m_island.m_bodyCount;++g) {
          this.m_island.m_bodies[g].GetType() == Box2D.Dynamics.b2Body.b2_staticBody && (this.m_island.m_bodies[g].m_flags &= ~Box2D.Dynamics.b2Body.e_islandFlag)
        }
      }
    }
    for(b = this.m_bodyList;b;b = b.m_next) {
      b.IsAwake() && b.IsActive() && b.GetType() != Box2D.Dynamics.b2Body.b2_staticBody && b.SynchronizeFixtures()
    }
    this.m_contactManager.FindNewContacts()
  };
  a.prototype.SolveTOI = function(e) {
    this.m_island.Initialize(this.m_bodyCount, Box2D.Common.b2Settings.b2_maxTOIContactsPerIsland, Box2D.Common.b2Settings.b2_maxTOIJointsPerIsland, null, this.m_contactManager.m_contactListener, this.m_contactSolver);
    for(var d = this.m_bodyList;d;d = d.m_next) {
      d.m_flags &= ~Box2D.Dynamics.b2Body.e_islandFlag, d.m_sweep.t0 = 0
    }
    for(var b = this.m_contactList;b;b = b.m_next) {
      b.m_flags &= ~(Box2D.Dynamics.Contacts.b2Contact.e_toiFlag | Box2D.Dynamics.Contacts.b2Contact.e_islandFlag)
    }
    for(var g = this.m_jointList;g;g = g.m_next) {
      g.m_islandFlag = !1
    }
    for(;;) {
      for(var f = null, g = 1, b = this.m_contactList;b;b = b.m_next) {
        if(!b.IsSensor() && b.IsEnabled() && b.IsContinuous() && (b.m_fixtureA.m_body.GetType() == Box2D.Dynamics.b2Body.b2_dynamicBody && b.m_fixtureA.m_body.IsAwake() || b.m_fixtureB.m_body.GetType() == Box2D.Dynamics.b2Body.b2_dynamicBody && b.m_fixtureB.m_body.IsAwake())) {
          d = 1;
          if(b.m_flags & Box2D.Dynamics.Contacts.b2Contact.e_toiFlag) {
            d = b.m_toi
          }else {
            var l = b.m_fixtureA.m_body.m_sweep.t0;
            if(b.m_fixtureA.m_body.m_sweep.t0 < b.m_fixtureB.m_body.m_sweep.t0) {
              l = b.m_fixtureB.m_body.m_sweep.t0, b.m_fixtureA.m_body.m_sweep.Advance(l)
            }else {
              if(b.m_fixtureB.m_body.m_sweep.t0 < b.m_fixtureA.m_body.m_sweep.t0) {
                l = b.m_fixtureA.m_body.m_sweep.t0, b.m_fixtureB.m_body.m_sweep.Advance(l)
              }
            }
            d = b.ComputeTOI(b.m_fixtureA.m_body.m_sweep, b.m_fixtureB.m_body.m_sweep);
            Box2D.Common.b2Settings.b2Assert(0 <= d && d <= 1);
            d > 0 && d < 1 && (d = (1 - d) * l + d);
            b.m_toi = d;
            b.m_flags |= Box2D.Dynamics.Contacts.b2Contact.e_toiFlag
          }
          Number.MIN_VALUE < d && d < g && (f = b, g = d)
        }
      }
      if(f === null || a.MAX_TOI < g) {
        break
      }
      a.s_backupA.Set(f.m_fixtureA.m_body.m_sweep);
      a.s_backupB.Set(f.m_fixtureB.m_body.m_sweep);
      f.m_fixtureA.m_body.Advance(g);
      f.m_fixtureB.m_body.Advance(g);
      f.Update(this.m_contactManager.m_contactListener);
      f.m_flags &= ~Box2D.Dynamics.Contacts.b2Contact.e_toiFlag;
      if(f.IsSensor() || !f.IsEnabled()) {
        f.m_fixtureA.m_body.m_sweep.Set(a.s_backupA), f.m_fixtureB.m_body.m_sweep.Set(a.s_backupB), f.m_fixtureA.m_body.SynchronizeTransform(), f.m_fixtureB.m_body.SynchronizeTransform()
      }else {
        if(f.IsTouching()) {
          b = f.m_fixtureA.m_body;
          if(b.GetType() != Box2D.Dynamics.b2Body.b2_dynamicBody) {
            b = f.m_fixtureB.m_body
          }
          this.m_island.Clear();
          f = new Box2D.Queue;
          f.enqueue(b);
          for(b.m_flags |= Box2D.Dynamics.b2Body.e_islandFlag;f.size > 0;) {
            if(d = f.dequeue(), this.m_island.AddBody(d), d.IsAwake() == !1 && d.SetAwake(!0), d.GetType() == Box2D.Dynamics.b2Body.b2_dynamicBody) {
              for(b = d.m_contactList;b;b = b.next) {
                if(this.m_island.m_contactCount == this.m_island.m_contactCapacity) {
                  break
                }
                !(b.contact.m_flags & Box2D.Dynamics.Contacts.b2Contact.e_islandFlag) && !b.contact.IsSensor() && b.contact.IsEnabled() && b.contact.IsTouching() && (this.m_island.AddContact(b.contact), b.contact.m_flags |= Box2D.Dynamics.Contacts.b2Contact.e_islandFlag, b.other.m_flags & Box2D.Dynamics.b2Body.e_islandFlag || (b.other.GetType() != Box2D.Dynamics.b2Body.b2_staticBody && (b.other.Advance(g), b.other.SetAwake(!0)), f.enqueue(b.other), b.other.m_flags |= Box2D.Dynamics.b2Body.e_islandFlag))
              }
              for(b = d.m_jointList;b;b = b.next) {
                if(this.m_island.m_jointCount != this.m_island.m_jointCapacity && !b.joint.m_islandFlag && b.other.IsActive()) {
                  this.m_island.AddJoint(b.joint), b.joint.m_islandFlag = !0, b.other.m_flags & Box2D.Dynamics.b2Body.e_islandFlag || (b.other.GetType() != Box2D.Dynamics.b2Body.b2_staticBody && (b.other.Advance(g), b.other.SetAwake(!0)), f.enqueue(b.other), b.other.m_flags |= Box2D.Dynamics.b2Body.e_islandFlag)
                }
              }
            }
          }
          f = new Box2D.Dynamics.b2TimeStep;
          f.warmStarting = !1;
          f.dt = (1 - g) * e.dt;
          f.inv_dt = 1 / f.dt;
          f.dtRatio = 0;
          f.velocityIterations = e.velocityIterations;
          f.positionIterations = e.positionIterations;
          this.m_island.SolveTOI(f);
          for(g = 0;g < this.m_island.m_bodyCount;++g) {
            if(this.m_island.m_bodies[g].m_flags &= ~Box2D.Dynamics.b2Body.e_islandFlag, this.m_island.m_bodies[g].IsAwake() && this.m_island.m_bodies[g].GetType() == Box2D.Dynamics.b2Body.b2_dynamicBody) {
              this.m_island.m_bodies[g].SynchronizeFixtures();
              for(b = this.m_island.m_bodies[g].m_contactList;b;b = b.next) {
                b.contact.m_flags &= ~Box2D.Dynamics.Contacts.b2Contact.e_toiFlag
              }
            }
          }
          for(g = 0;g < this.m_island.m_contactCount;++g) {
            this.m_island.m_contacts[g].m_flags &= ~(Box2D.Dynamics.Contacts.b2Contact.e_toiFlag | Box2D.Dynamics.Contacts.b2Contact.e_islandFlag)
          }
          for(g = 0;g < this.m_island.m_jointCount;++g) {
            this.m_island.m_joints[g].m_islandFlag = !1
          }
          this.m_contactManager.FindNewContacts()
        }
      }
    }
  };
  a.prototype.DrawJoint = function(e) {
    e.m_type == Box2D.Dynamics.Joints.b2Joint.e_distanceJoint || e.m_type == Box2D.Dynamics.Joints.b2Joint.e_mouseJoint ? this.m_debugDraw.DrawSegment(e.GetAnchorA(), e.GetAnchorB(), a.s_jointColor) : e.m_type == Box2D.Dynamics.Joints.b2Joint.e_pulleyJoint ? (this.m_debugDraw.DrawSegment(e.GetGroundAnchorA(), e.GetAnchorA(), a.s_jointColor), this.m_debugDraw.DrawSegment(e.GetGroundAnchorB(), e.GetAnchorB(), a.s_jointColor), this.m_debugDraw.DrawSegment(e.GetGroundAnchorA(), e.GetGroundAnchorB(), 
    a.s_jointColor)) : (e.GetBodyA() != this.m_groundBody && this.m_debugDraw.DrawSegment(e.GetBodyA().m_xf.position, e.GetAnchorA(), a.s_jointColor), this.m_debugDraw.DrawSegment(e.GetAnchorA(), e.GetAnchorB(), a.s_jointColor), e.GetBodyB() != this.m_groundBody && this.m_debugDraw.DrawSegment(e.GetBodyB().m_xf.position, e.GetAnchorB(), a.s_jointColor))
  };
  a.prototype.DrawShape = function(a, d, b) {
    switch(a.m_type) {
      case Box2D.Collision.Shapes.b2Shape.e_circleShape:
        var g = a instanceof Box2D.Collision.Shapes.b2CircleShape ? a : null;
        this.m_debugDraw.DrawSolidCircle(Box2D.Common.Math.b2Math.MulX(d, g.m_p), g.m_radius, d.R.col1, b);
        break;
      case Box2D.Collision.Shapes.b2Shape.e_polygonShape:
        for(var g = 0, g = a instanceof Box2D.Collision.Shapes.b2PolygonShape ? a : null, a = parseInt(g.GetVertexCount()), f = g.GetVertices(), l = Array(a), g = 0;g < a;++g) {
          l[g] = Box2D.Common.Math.b2Math.MulX(d, f[g])
        }
        this.m_debugDraw.DrawSolidPolygon(l, a, b);
        break;
      case Box2D.Collision.Shapes.b2Shape.e_edgeShape:
        g = a instanceof Box2D.Collision.Shapes.b2EdgeShape ? a : null, this.m_debugDraw.DrawSegment(Box2D.Common.Math.b2Math.MulX(d, g.GetVertex1()), Box2D.Common.Math.b2Math.MulX(d, g.GetVertex2()), b)
    }
  };
  Box2D.postDefs.push(function() {
    Box2D.Dynamics.b2World.s_xf = new Box2D.Common.Math.b2Transform;
    Box2D.Dynamics.b2World.s_backupA = new Box2D.Common.Math.b2Sweep;
    Box2D.Dynamics.b2World.s_backupB = new Box2D.Common.Math.b2Sweep;
    Box2D.Dynamics.b2World.s_jointColor = new Box2D.Common.b2Color(0.5, 0.8, 0.8)
  })
})(Box2D.Dynamics.b2World);
Box2D.unopped = {};
if(typeof Box2D.Collision.Shapes === "undefined") {
  Box2D.Collision.Shapes = {}
}
if(typeof Box2D.Common === "undefined") {
  Box2D.Common = {}
}
if(typeof Box2D.Common.Math === "undefined") {
  Box2D.Common.Math = {}
}
if(typeof Box2D.Dynamics.Contacts === "undefined") {
  Box2D.Dynamics.Contacts = {}
}
if(typeof Box2D.Dynamics.Controllers === "undefined") {
  Box2D.Dynamics.Controllers = {}
}
if(typeof Box2D.Dynamics.Joints === "undefined") {
  Box2D.Dynamics.Joints = {}
}
var c = Box2D.Collision;
Box2D.Collision.b2DynamicTree = function() {
  c.b2DynamicTree.b2DynamicTree.apply(this, arguments);
  this.constructor === c.b2DynamicTree && this.b2DynamicTree.apply(this, arguments)
};
(function() {
})(Box2D.Collision.b2DynamicTree);
Box2D.Collision.b2DynamicTreeBroadPhase = function() {
  c.b2DynamicTreeBroadPhase.b2DynamicTreeBroadPhase.apply(this, arguments)
};
(function() {
})(Box2D.Collision.b2DynamicTreeBroadPhase);
Box2D.Collision.b2DynamicTreeNode = function() {
  c.b2DynamicTreeNode.b2DynamicTreeNode.apply(this, arguments)
};
(function() {
})(Box2D.Collision.b2DynamicTreeNode);
Box2D.Collision.b2DynamicTreePair = function() {
  c.b2DynamicTreePair.b2DynamicTreePair.apply(this, arguments)
};
(function() {
})(Box2D.Collision.b2DynamicTreePair);
Box2D.Collision.b2Manifold = function() {
  c.b2Manifold.b2Manifold.apply(this, arguments);
  this.constructor === c.b2Manifold && this.b2Manifold.apply(this, arguments)
};
(function() {
})(Box2D.Collision.b2Manifold);
Box2D.Collision.b2ManifoldPoint = function() {
  c.b2ManifoldPoint.b2ManifoldPoint.apply(this, arguments);
  this.constructor === c.b2ManifoldPoint && this.b2ManifoldPoint.apply(this, arguments)
};
(function() {
})(Box2D.Collision.b2ManifoldPoint);
Box2D.Collision.b2Point = function() {
  c.b2Point.b2Point.apply(this, arguments)
};
(function() {
})(Box2D.Collision.b2Point);
Box2D.Collision.b2RayCastInput = function() {
  c.b2RayCastInput.b2RayCastInput.apply(this, arguments);
  this.constructor === c.b2RayCastInput && this.b2RayCastInput.apply(this, arguments)
};
(function() {
})(Box2D.Collision.b2RayCastInput);
Box2D.Collision.b2RayCastOutput = function() {
  c.b2RayCastOutput.b2RayCastOutput.apply(this, arguments)
};
(function() {
})(Box2D.Collision.b2RayCastOutput);
Box2D.Collision.b2Segment = function() {
  c.b2Segment.b2Segment.apply(this, arguments)
};
(function() {
})(Box2D.Collision.b2Segment);
Box2D.Collision.b2SeparationFunction = function() {
  c.b2SeparationFunction.b2SeparationFunction.apply(this, arguments)
};
(function() {
})(Box2D.Collision.b2SeparationFunction);
(function(a) {
  a.b2Simplex = function() {
    a.b2Simplex.b2Simplex.apply(this, arguments);
    this.constructor === a.b2Simplex && this.b2Simplex.apply(this, arguments)
  };
  a.b2SimplexCache = function() {
    a.b2SimplexCache.b2SimplexCache.apply(this, arguments)
  };
  a.b2SimplexVertex = function() {
    a.b2SimplexVertex.b2SimplexVertex.apply(this, arguments)
  };
  a.b2TimeOfImpact = function() {
    a.b2TimeOfImpact.b2TimeOfImpact.apply(this, arguments)
  };
  a.b2TOIInput = function() {
    a.b2TOIInput.b2TOIInput.apply(this, arguments)
  };
  a.b2WorldManifold = function() {
    a.b2WorldManifold.b2WorldManifold.apply(this, arguments);
    this.constructor === a.b2WorldManifold && this.b2WorldManifold.apply(this, arguments)
  };
  a.ClipVertex = function() {
    a.ClipVertex.ClipVertex.apply(this, arguments)
  };
  a.Features = function() {
    a.Features.Features.apply(this, arguments)
  }
})(Box2D.Collision);
(function(a) {
  a.b2CircleShape = function() {
    a.b2CircleShape.b2CircleShape.apply(this, arguments);
    this.constructor === a.b2CircleShape && this.b2CircleShape.apply(this, arguments)
  };
  a.b2EdgeChainDef = function() {
    a.b2EdgeChainDef.b2EdgeChainDef.apply(this, arguments);
    this.constructor === a.b2EdgeChainDef && this.b2EdgeChainDef.apply(this, arguments)
  };
  a.b2EdgeShape = function() {
    a.b2EdgeShape.b2EdgeShape.apply(this, arguments);
    this.constructor === a.b2EdgeShape && this.b2EdgeShape.apply(this, arguments)
  };
  a.b2MassData = function() {
    a.b2MassData.b2MassData.apply(this, arguments)
  };
  a.b2PolygonShape = function() {
    a.b2PolygonShape.b2PolygonShape.apply(this, arguments);
    this.constructor === a.b2PolygonShape && this.b2PolygonShape.apply(this, arguments)
  };
  a.b2Shape = function() {
    a.b2Shape.b2Shape.apply(this, arguments);
    this.constructor === a.b2Shape && this.b2Shape.apply(this, arguments)
  }
})(Box2D.Collision.Shapes);
(function() {
  function a() {
    a.b2Color.apply(this, arguments);
    this.constructor === a && this.b2Color.apply(this, arguments)
  }
  function e() {
    e.b2Settings.apply(this, arguments)
  }
  function d() {
    d.b2Mat22.apply(this, arguments);
    this.constructor === d && this.b2Mat22.apply(this, arguments)
  }
  function b() {
    b.b2Mat33.apply(this, arguments);
    this.constructor === b && this.b2Mat33.apply(this, arguments)
  }
  function g() {
    g.b2Math.apply(this, arguments)
  }
  function f() {
    f.b2Sweep.apply(this, arguments)
  }
  function l() {
    l.b2Transform.apply(this, arguments);
    this.constructor === l && this.b2Transform.apply(this, arguments)
  }
  function h() {
    h.b2Vec2.apply(this, arguments);
    this.constructor === h && this.b2Vec2.apply(this, arguments)
  }
  function n() {
    n.b2Vec3.apply(this, arguments);
    this.constructor === n && this.b2Vec3.apply(this, arguments)
  }
  function j() {
    j.b2Body.apply(this, arguments);
    this.constructor === j && this.b2Body.apply(this, arguments)
  }
  function r() {
    r.b2BodyDef.apply(this, arguments);
    this.constructor === r && this.b2BodyDef.apply(this, arguments)
  }
  function p() {
    p.b2ContactFilter.apply(this, arguments)
  }
  function v() {
    v.b2ContactImpulse.apply(this, arguments)
  }
  function o() {
    o.b2ContactListener.apply(this, arguments)
  }
  function w() {
    w.b2ContactManager.apply(this, arguments);
    this.constructor === w && this.b2ContactManager.apply(this, arguments)
  }
  function x() {
    x.b2DebugDraw.apply(this, arguments);
    this.constructor === x && this.b2DebugDraw.apply(this, arguments)
  }
  function t() {
    t.b2DestructionListener.apply(this, arguments)
  }
  function D() {
    D.b2FilterData.apply(this, arguments)
  }
  function u() {
    u.b2Fixture.apply(this, arguments);
    this.constructor === u && this.b2Fixture.apply(this, arguments)
  }
  function H() {
    H.b2FixtureDef.apply(this, arguments);
    this.constructor === H && this.b2FixtureDef.apply(this, arguments)
  }
  function B() {
    B.b2Island.apply(this, arguments);
    this.constructor === B && this.b2Island.apply(this, arguments)
  }
  function F() {
    F.b2TimeStep.apply(this, arguments)
  }
  function G() {
    G.b2CircleContact.apply(this, arguments)
  }
  function K() {
    K.b2Contact.apply(this, arguments);
    this.constructor === K && this.b2Contact.apply(this, arguments)
  }
  function m() {
    m.b2ContactConstraint.apply(this, arguments);
    this.constructor === m && this.b2ContactConstraint.apply(this, arguments)
  }
  function z() {
    z.b2ContactConstraintPoint.apply(this, arguments)
  }
  function I() {
    I.b2ContactEdge.apply(this, arguments)
  }
  function J() {
    J.b2ContactFactory.apply(this, arguments);
    this.constructor === J && this.b2ContactFactory.apply(this, arguments)
  }
  function k() {
    k.b2ContactRegister.apply(this, arguments)
  }
  function s() {
    s.b2ContactResult.apply(this, arguments)
  }
  function q() {
    q.b2ContactSolver.apply(this, arguments);
    this.constructor === q && this.b2ContactSolver.apply(this, arguments)
  }
  function E() {
    E.b2EdgeAndCircleContact.apply(this, arguments)
  }
  function M() {
    M.b2NullContact.apply(this, arguments);
    this.constructor === M && this.b2NullContact.apply(this, arguments)
  }
  function A() {
    A.b2PolyAndCircleContact.apply(this, arguments)
  }
  function y() {
    y.b2PolyAndEdgeContact.apply(this, arguments)
  }
  function ga() {
    ga.b2PolygonContact.apply(this, arguments)
  }
  function N() {
    N.b2PositionSolverManifold.apply(this, arguments);
    this.constructor === N && this.b2PositionSolverManifold.apply(this, arguments)
  }
  function C() {
    C.b2BuoyancyController.apply(this, arguments)
  }
  function ha() {
    ha.b2ConstantAccelController.apply(this, arguments)
  }
  function ia() {
    ia.b2ConstantForceController.apply(this, arguments)
  }
  function ja() {
    ja.b2Controller.apply(this, arguments)
  }
  function ka() {
    ka.b2ControllerEdge.apply(this, arguments)
  }
  function la() {
    la.b2GravityController.apply(this, arguments)
  }
  function ma() {
    ma.b2TensorDampingController.apply(this, arguments)
  }
  function O() {
    O.b2DistanceJoint.apply(this, arguments);
    this.constructor === O && this.b2DistanceJoint.apply(this, arguments)
  }
  function P() {
    P.b2DistanceJointDef.apply(this, arguments);
    this.constructor === P && this.b2DistanceJointDef.apply(this, arguments)
  }
  function Q() {
    Q.b2FrictionJoint.apply(this, arguments);
    this.constructor === Q && this.b2FrictionJoint.apply(this, arguments)
  }
  function R() {
    R.b2FrictionJointDef.apply(this, arguments);
    this.constructor === R && this.b2FrictionJointDef.apply(this, arguments)
  }
  function S() {
    S.b2GearJoint.apply(this, arguments);
    this.constructor === S && this.b2GearJoint.apply(this, arguments)
  }
  function T() {
    T.b2GearJointDef.apply(this, arguments);
    this.constructor === T && this.b2GearJointDef.apply(this, arguments)
  }
  function na() {
    na.b2Jacobian.apply(this, arguments)
  }
  function U() {
    U.b2Joint.apply(this, arguments);
    this.constructor === U && this.b2Joint.apply(this, arguments)
  }
  function L() {
    L.b2JointDef.apply(this, arguments);
    this.constructor === L && this.b2JointDef.apply(this, arguments)
  }
  function oa() {
    oa.b2JointEdge.apply(this, arguments)
  }
  function V() {
    V.b2LineJoint.apply(this, arguments);
    this.constructor === V && this.b2LineJoint.apply(this, arguments)
  }
  function W() {
    W.b2LineJointDef.apply(this, arguments);
    this.constructor === W && this.b2LineJointDef.apply(this, arguments)
  }
  function X() {
    X.b2MouseJoint.apply(this, arguments);
    this.constructor === X && this.b2MouseJoint.apply(this, arguments)
  }
  function Y() {
    Y.b2MouseJointDef.apply(this, arguments);
    this.constructor === Y && this.b2MouseJointDef.apply(this, arguments)
  }
  function Z() {
    Z.b2PrismaticJoint.apply(this, arguments);
    this.constructor === Z && this.b2PrismaticJoint.apply(this, arguments)
  }
  function $() {
    $.b2PrismaticJointDef.apply(this, arguments);
    this.constructor === $ && this.b2PrismaticJointDef.apply(this, arguments)
  }
  function aa() {
    aa.b2PulleyJoint.apply(this, arguments);
    this.constructor === aa && this.b2PulleyJoint.apply(this, arguments)
  }
  function ba() {
    ba.b2PulleyJointDef.apply(this, arguments);
    this.constructor === ba && this.b2PulleyJointDef.apply(this, arguments)
  }
  function ca() {
    ca.b2RevoluteJoint.apply(this, arguments);
    this.constructor === ca && this.b2RevoluteJoint.apply(this, arguments)
  }
  function da() {
    da.b2RevoluteJointDef.apply(this, arguments);
    this.constructor === da && this.b2RevoluteJointDef.apply(this, arguments)
  }
  function ea() {
    ea.b2WeldJoint.apply(this, arguments);
    this.constructor === ea && this.b2WeldJoint.apply(this, arguments)
  }
  function fa() {
    fa.b2WeldJointDef.apply(this, arguments);
    this.constructor === fa && this.b2WeldJointDef.apply(this, arguments)
  }
  Box2D.MIN_VALUE_SQUARED = Number.MIN_VALUE * Number.MIN_VALUE;
  Box2D.Common.b2internal = "Box2D.Common.b2internal";
  Box2D.Common.b2Color = a;
  Box2D.Common.b2Settings = e;
  Box2D.Common.Math.b2Mat22 = d;
  Box2D.Common.Math.b2Mat33 = b;
  Box2D.Common.Math.b2Math = g;
  Box2D.Common.Math.b2Sweep = f;
  Box2D.Common.Math.b2Transform = l;
  Box2D.Common.Math.b2Vec2 = h;
  Box2D.Common.Math.b2Vec3 = n;
  Box2D.Dynamics.b2Body = j;
  Box2D.Dynamics.b2BodyDef = r;
  Box2D.Dynamics.b2ContactFilter = p;
  Box2D.Dynamics.b2ContactImpulse = v;
  Box2D.Dynamics.b2ContactListener = o;
  Box2D.Dynamics.b2ContactManager = w;
  Box2D.Dynamics.b2DebugDraw = x;
  Box2D.Dynamics.b2DestructionListener = t;
  Box2D.Dynamics.b2FilterData = D;
  Box2D.Dynamics.b2Fixture = u;
  Box2D.Dynamics.b2FixtureDef = H;
  Box2D.Dynamics.b2Island = B;
  Box2D.Dynamics.b2TimeStep = F;
  Box2D.Dynamics.Contacts.b2CircleContact = G;
  Box2D.Dynamics.Contacts.b2Contact = K;
  Box2D.Dynamics.Contacts.b2ContactConstraint = m;
  Box2D.Dynamics.Contacts.b2ContactConstraintPoint = z;
  Box2D.Dynamics.Contacts.b2ContactEdge = I;
  Box2D.Dynamics.Contacts.b2ContactFactory = J;
  Box2D.Dynamics.Contacts.b2ContactRegister = k;
  Box2D.Dynamics.Contacts.b2ContactResult = s;
  Box2D.Dynamics.Contacts.b2ContactSolver = q;
  Box2D.Dynamics.Contacts.b2EdgeAndCircleContact = E;
  Box2D.Dynamics.Contacts.b2NullContact = M;
  Box2D.Dynamics.Contacts.b2PolyAndCircleContact = A;
  Box2D.Dynamics.Contacts.b2PolyAndEdgeContact = y;
  Box2D.Dynamics.Contacts.b2PolygonContact = ga;
  Box2D.Dynamics.Contacts.b2PositionSolverManifold = N;
  Box2D.Dynamics.Controllers.b2BuoyancyController = C;
  Box2D.Dynamics.Controllers.b2ConstantAccelController = ha;
  Box2D.Dynamics.Controllers.b2ConstantForceController = ia;
  Box2D.Dynamics.Controllers.b2Controller = ja;
  Box2D.Dynamics.Controllers.b2ControllerEdge = ka;
  Box2D.Dynamics.Controllers.b2GravityController = la;
  Box2D.Dynamics.Controllers.b2TensorDampingController = ma;
  Box2D.Dynamics.Joints.b2DistanceJoint = O;
  Box2D.Dynamics.Joints.b2DistanceJointDef = P;
  Box2D.Dynamics.Joints.b2FrictionJoint = Q;
  Box2D.Dynamics.Joints.b2FrictionJointDef = R;
  Box2D.Dynamics.Joints.b2GearJoint = S;
  Box2D.Dynamics.Joints.b2GearJointDef = T;
  Box2D.Dynamics.Joints.b2Jacobian = na;
  Box2D.Dynamics.Joints.b2Joint = U;
  Box2D.Dynamics.Joints.b2JointDef = L;
  Box2D.Dynamics.Joints.b2JointEdge = oa;
  Box2D.Dynamics.Joints.b2LineJoint = V;
  Box2D.Dynamics.Joints.b2LineJointDef = W;
  Box2D.Dynamics.Joints.b2MouseJoint = X;
  Box2D.Dynamics.Joints.b2MouseJointDef = Y;
  Box2D.Dynamics.Joints.b2PrismaticJoint = Z;
  Box2D.Dynamics.Joints.b2PrismaticJointDef = $;
  Box2D.Dynamics.Joints.b2PulleyJoint = aa;
  Box2D.Dynamics.Joints.b2PulleyJointDef = ba;
  Box2D.Dynamics.Joints.b2RevoluteJoint = ca;
  Box2D.Dynamics.Joints.b2RevoluteJointDef = da;
  Box2D.Dynamics.Joints.b2WeldJoint = ea;
  Box2D.Dynamics.Joints.b2WeldJointDef = fa
})();
(function() {
  var a = Box2D.Common.b2Settings, e = Box2D.Common.Math.b2Math, d = Box2D.Common.Math.b2Sweep, b = Box2D.Common.Math.b2Transform, g = Box2D.Common.Math.b2Vec2, f = Box2D.Collision.b2AABB, l = Box2D.Collision.b2ContactID, h = Box2D.Collision.b2Distance, n = Box2D.Collision.b2DistanceInput, j = Box2D.Collision.b2DistanceOutput, r = Box2D.Collision.b2DistanceProxy, p = Box2D.Collision.b2DynamicTree, v = Box2D.Collision.b2DynamicTreeBroadPhase, o = Box2D.Collision.b2DynamicTreeNode, w = Box2D.Collision.b2DynamicTreePair, 
  x = Box2D.Collision.b2Manifold, t = Box2D.Collision.b2ManifoldPoint, D = Box2D.Collision.b2Point, u = Box2D.Collision.b2RayCastInput, H = Box2D.Collision.b2RayCastOutput, B = Box2D.Collision.b2Segment, F = Box2D.Collision.b2SeparationFunction, G = Box2D.Collision.b2Simplex, K = Box2D.Collision.b2SimplexCache, m = Box2D.Collision.b2SimplexVertex, z = Box2D.Collision.b2TimeOfImpact, I = Box2D.Collision.b2TOIInput, J = Box2D.Collision.b2WorldManifold, k = Box2D.Collision.ClipVertex, s = Box2D.Collision.Features, 
  q = Box2D.Collision.IBroadPhase;
  p.b2DynamicTree = function() {
  };
  p.prototype.b2DynamicTree = function() {
    this.m_freeList = this.m_root = null;
    this.m_insertionCount = this.m_path = 0
  };
  p.prototype.CreateProxy = function(E, k) {
    var A = this.AllocateNode(), y = a.b2_aabbExtension, b = a.b2_aabbExtension;
    A.aabb.lowerBound.x = E.lowerBound.x - y;
    A.aabb.lowerBound.y = E.lowerBound.y - b;
    A.aabb.upperBound.x = E.upperBound.x + y;
    A.aabb.upperBound.y = E.upperBound.y + b;
    A.userData = k;
    this.InsertLeaf(A);
    return A
  };
  p.prototype.DestroyProxy = function(a) {
    this.RemoveLeaf(a);
    this.FreeNode(a)
  };
  p.prototype.MoveProxy = function(E, k, A) {
    a.b2Assert(E.IsLeaf());
    if(E.aabb.Contains(k)) {
      return!1
    }
    this.RemoveLeaf(E);
    var y = a.b2_aabbExtension + a.b2_aabbMultiplier * (A.x > 0 ? A.x : -A.x), A = a.b2_aabbExtension + a.b2_aabbMultiplier * (A.y > 0 ? A.y : -A.y);
    E.aabb.lowerBound.x = k.lowerBound.x - y;
    E.aabb.lowerBound.y = k.lowerBound.y - A;
    E.aabb.upperBound.x = k.upperBound.x + y;
    E.aabb.upperBound.y = k.upperBound.y + A;
    this.InsertLeaf(E);
    return!0
  };
  p.prototype.Rebalance = function(a) {
    a === void 0 && (a = 0);
    if(this.m_root != null) {
      for(var k = 0;k < a;k++) {
        for(var A = this.m_root, y = 0;A.IsLeaf() == !1;) {
          A = this.m_path >> y & 1 ? A.child2 : A.child1, y = y + 1 & 31
        }
        ++this.m_path;
        this.RemoveLeaf(A);
        this.InsertLeaf(A)
      }
    }
  };
  p.prototype.GetFatAABB = function(a) {
    return a.aabb
  };
  p.prototype.GetUserData = function(a) {
    return a.userData
  };
  p.prototype.Query = function(a, k) {
    if(this.m_root != null) {
      var A = [], y = 0;
      for(A[y++] = this.m_root;y > 0;) {
        var b = A[--y];
        if(b.aabb.TestOverlap(k)) {
          if(b.IsLeaf()) {
            if(!a(b)) {
              break
            }
          }else {
            A[y++] = b.child1, A[y++] = b.child2
          }
        }
      }
    }
  };
  p.prototype.RayCast = function(a, k) {
    if(this.m_root != null) {
      var A = k.p1, y = k.p2, b = e.SubtractVV(A, y);
      b.Normalize();
      var b = e.CrossFV(1, b), q = e.AbsV(b), s = k.maxFraction, d = new f, m = 0, h = 0, m = A.x + s * (y.x - A.x), h = A.y + s * (y.y - A.y);
      d.lowerBound.x = Math.min(A.x, m);
      d.lowerBound.y = Math.min(A.y, h);
      d.upperBound.x = Math.max(A.x, m);
      d.upperBound.y = Math.max(A.y, h);
      var g = [], j = 0;
      for(g[j++] = this.m_root;j > 0;) {
        if(s = g[--j], s.aabb.TestOverlap(d) != !1 && (m = s.aabb.GetCenter(), h = s.aabb.GetExtents(), !(Math.abs(b.x * (A.x - m.x) + b.y * (A.y - m.y)) - q.x * h.x - q.y * h.y > 0))) {
          if(s.IsLeaf()) {
            m = new u;
            m.p1 = k.p1;
            m.p2 = k.p2;
            m.maxFraction = k.maxFraction;
            s = a(m, s);
            if(s == 0) {
              break
            }
            if(s > 0) {
              m = A.x + s * (y.x - A.x), h = A.y + s * (y.y - A.y), d.lowerBound.x = Math.min(A.x, m), d.lowerBound.y = Math.min(A.y, h), d.upperBound.x = Math.max(A.x, m), d.upperBound.y = Math.max(A.y, h)
            }
          }else {
            g[j++] = s.child1, g[j++] = s.child2
          }
        }
      }
    }
  };
  p.prototype.AllocateNode = function() {
    if(this.m_freeList) {
      var a = this.m_freeList;
      this.m_freeList = a.parent;
      a.parent = null;
      a.child1 = null;
      a.child2 = null;
      return a
    }
    return new o
  };
  p.prototype.FreeNode = function(a) {
    a.parent = this.m_freeList;
    this.m_freeList = a
  };
  p.prototype.InsertLeaf = function(a) {
    ++this.m_insertionCount;
    if(this.m_root == null) {
      this.m_root = a, this.m_root.parent = null
    }else {
      var k = a.aabb.GetCenter(), A = this.m_root;
      if(A.IsLeaf() == !1) {
        do {
          var b = A.child1, A = A.child2, A = Math.abs((b.aabb.lowerBound.x + b.aabb.upperBound.x) / 2 - k.x) + Math.abs((b.aabb.lowerBound.y + b.aabb.upperBound.y) / 2 - k.y) < Math.abs((A.aabb.lowerBound.x + A.aabb.upperBound.x) / 2 - k.x) + Math.abs((A.aabb.lowerBound.y + A.aabb.upperBound.y) / 2 - k.y) ? b : A
        }while(A.IsLeaf() == !1)
      }
      k = A.parent;
      b = this.AllocateNode();
      b.parent = k;
      b.userData = null;
      b.aabb.Combine(a.aabb, A.aabb);
      if(k) {
        A.parent.child1 == A ? k.child1 = b : k.child2 = b;
        b.child1 = A;
        b.child2 = a;
        A.parent = b;
        a.parent = b;
        do {
          if(k.aabb.Contains(b.aabb)) {
            break
          }
          k.aabb.Combine(k.child1.aabb, k.child2.aabb);
          b = k;
          k = k.parent
        }while(k)
      }else {
        b.child1 = A, b.child2 = a, A.parent = b, this.m_root = a.parent = b
      }
    }
  };
  p.prototype.RemoveLeaf = function(a) {
    if(a == this.m_root) {
      this.m_root = null
    }else {
      var k = a.parent, b = k.parent, a = k.child1 == a ? k.child2 : k.child1;
      if(b) {
        b.child1 == k ? b.child1 = a : b.child2 = a;
        a.parent = b;
        for(this.FreeNode(k);b;) {
          k = b.aabb;
          b.aabb = f.Combine(b.child1.aabb, b.child2.aabb);
          if(k.Contains(b.aabb)) {
            break
          }
          b = b.parent
        }
      }else {
        this.m_root = a, a.parent = null, this.FreeNode(k)
      }
    }
  };
  v.b2DynamicTreeBroadPhase = function() {
    this.m_tree = new p;
    this.m_moveBuffer = [];
    this.m_pairBuffer = [];
    this.m_pairCount = 0
  };
  v.prototype.CreateProxy = function(a, k) {
    var b = this.m_tree.CreateProxy(a, k);
    ++this.m_proxyCount;
    this.BufferMove(b);
    return b
  };
  v.prototype.DestroyProxy = function(a) {
    this.UnBufferMove(a);
    --this.m_proxyCount;
    this.m_tree.DestroyProxy(a)
  };
  v.prototype.MoveProxy = function(a, k, b) {
    this.m_tree.MoveProxy(a, k, b) && this.BufferMove(a)
  };
  v.prototype.TestOverlap = function(a, k) {
    var b = this.m_tree.GetFatAABB(a), y = this.m_tree.GetFatAABB(k);
    return b.TestOverlap(y)
  };
  v.prototype.GetUserData = function(a) {
    return this.m_tree.GetUserData(a)
  };
  v.prototype.GetFatAABB = function(a) {
    return this.m_tree.GetFatAABB(a)
  };
  v.prototype.GetProxyCount = function() {
    return this.m_proxyCount
  };
  v.prototype.UpdatePairs = function(a) {
    for(var k = this, b = k.m_pairCount = 0, y, b = 0;b < k.m_moveBuffer.length;++b) {
      y = k.m_moveBuffer[b];
      var s = k.m_tree.GetFatAABB(y);
      k.m_tree.Query(function(a) {
        if(a == y) {
          return!0
        }
        k.m_pairCount == k.m_pairBuffer.length && (k.m_pairBuffer[k.m_pairCount] = new w);
        var E = k.m_pairBuffer[k.m_pairCount];
        E.proxyA = a < y ? a : y;
        E.proxyB = a >= y ? a : y;
        ++k.m_pairCount;
        return!0
      }, s)
    }
    for(b = k.m_moveBuffer.length = 0;b < k.m_pairCount;) {
      var s = k.m_pairBuffer[b], e = k.m_tree.GetUserData(s.proxyA), d = k.m_tree.GetUserData(s.proxyB);
      a(e, d);
      for(++b;b < k.m_pairCount;) {
        e = k.m_pairBuffer[b];
        if(e.proxyA != s.proxyA || e.proxyB != s.proxyB) {
          break
        }
        ++b
      }
    }
  };
  v.prototype.Query = function(a, k) {
    this.m_tree.Query(a, k)
  };
  v.prototype.RayCast = function(a, k) {
    this.m_tree.RayCast(a, k)
  };
  v.prototype.Validate = function() {
  };
  v.prototype.Rebalance = function(a) {
    a === void 0 && (a = 0);
    this.m_tree.Rebalance(a)
  };
  v.prototype.BufferMove = function(a) {
    this.m_moveBuffer[this.m_moveBuffer.length] = a
  };
  v.prototype.UnBufferMove = function(a) {
    this.m_moveBuffer.splice(parseInt(this.m_moveBuffer.indexOf(a)), 1)
  };
  v.prototype.ComparePairs = function() {
    return 0
  };
  v.__implements = {};
  v.__implements[q] = !0;
  o.b2DynamicTreeNode = function() {
    this.aabb = new f
  };
  o.prototype.IsLeaf = function() {
    return this.child1 == null
  };
  w.b2DynamicTreePair = function() {
  };
  x.b2Manifold = function() {
    this.m_pointCount = 0
  };
  x.prototype.b2Manifold = function() {
    this.m_points = [];
    for(var k = 0;k < a.b2_maxManifoldPoints;k++) {
      this.m_points[k] = new t
    }
    this.m_localPlaneNormal = new g;
    this.m_localPoint = new g
  };
  x.prototype.Reset = function() {
    for(var k = 0;k < a.b2_maxManifoldPoints;k++) {
      (this.m_points[k] instanceof t ? this.m_points[k] : null).Reset()
    }
    this.m_localPlaneNormal.SetZero();
    this.m_localPoint.SetZero();
    this.m_pointCount = this.m_type = 0
  };
  x.prototype.Set = function(k) {
    this.m_pointCount = k.m_pointCount;
    for(var b = 0;b < a.b2_maxManifoldPoints;b++) {
      (this.m_points[b] instanceof t ? this.m_points[b] : null).Set(k.m_points[b])
    }
    this.m_localPlaneNormal.SetV(k.m_localPlaneNormal);
    this.m_localPoint.SetV(k.m_localPoint);
    this.m_type = k.m_type
  };
  x.prototype.Copy = function() {
    var a = new x;
    a.Set(this);
    return a
  };
  Box2D.postDefs.push(function() {
    Box2D.Collision.b2Manifold.e_circles = 1;
    Box2D.Collision.b2Manifold.e_faceA = 2;
    Box2D.Collision.b2Manifold.e_faceB = 4
  });
  t.b2ManifoldPoint = function() {
    this.m_localPoint = new g;
    this.m_id = new l
  };
  t.prototype.b2ManifoldPoint = function() {
    this.Reset()
  };
  t.prototype.Reset = function() {
    this.m_localPoint.SetZero();
    this.m_tangentImpulse = this.m_normalImpulse = 0;
    this.m_id.key = 0
  };
  t.prototype.Set = function(a) {
    this.m_localPoint.SetV(a.m_localPoint);
    this.m_normalImpulse = a.m_normalImpulse;
    this.m_tangentImpulse = a.m_tangentImpulse;
    this.m_id.Set(a.m_id)
  };
  D.b2Point = function() {
    this.p = new g
  };
  D.prototype.Support = function() {
    return this.p
  };
  D.prototype.GetFirstVertex = function() {
    return this.p
  };
  u.b2RayCastInput = function() {
    this.p1 = new g;
    this.p2 = new g
  };
  u.prototype.b2RayCastInput = function(a, k, b) {
    a === void 0 && (a = null);
    k === void 0 && (k = null);
    b === void 0 && (b = 1);
    a && this.p1.SetV(a);
    k && this.p2.SetV(k);
    this.maxFraction = b
  };
  H.b2RayCastOutput = function() {
    this.normal = new g
  };
  B.b2Segment = function() {
    this.p1 = new g;
    this.p2 = new g
  };
  B.prototype.TestSegment = function(a, k, b, y) {
    y === void 0 && (y = 0);
    var s = b.p1, e = b.p2.x - s.x, d = b.p2.y - s.y, b = this.p2.y - this.p1.y, q = -(this.p2.x - this.p1.x), m = 100 * Number.MIN_VALUE, h = -(e * b + d * q);
    if(h > m) {
      var g = s.x - this.p1.x, f = s.y - this.p1.y, s = g * b + f * q;
      if(0 <= s && s <= y * h && (y = -e * f + d * g, -m * h <= y && y <= h * (1 + m))) {
        return s /= h, y = Math.sqrt(b * b + q * q), b /= y, q /= y, a[0] = s, k.Set(b, q), !0
      }
    }
    return!1
  };
  B.prototype.Extend = function(a) {
    this.ExtendForward(a);
    this.ExtendBackward(a)
  };
  B.prototype.ExtendForward = function(a) {
    var k = this.p2.x - this.p1.x, b = this.p2.y - this.p1.y, a = Math.min(k > 0 ? (a.upperBound.x - this.p1.x) / k : k < 0 ? (a.lowerBound.x - this.p1.x) / k : Number.POSITIVE_INFINITY, b > 0 ? (a.upperBound.y - this.p1.y) / b : b < 0 ? (a.lowerBound.y - this.p1.y) / b : Number.POSITIVE_INFINITY);
    this.p2.x = this.p1.x + k * a;
    this.p2.y = this.p1.y + b * a
  };
  B.prototype.ExtendBackward = function(a) {
    var k = -this.p2.x + this.p1.x, b = -this.p2.y + this.p1.y, a = Math.min(k > 0 ? (a.upperBound.x - this.p2.x) / k : k < 0 ? (a.lowerBound.x - this.p2.x) / k : Number.POSITIVE_INFINITY, b > 0 ? (a.upperBound.y - this.p2.y) / b : b < 0 ? (a.lowerBound.y - this.p2.y) / b : Number.POSITIVE_INFINITY);
    this.p1.x = this.p2.x + k * a;
    this.p1.y = this.p2.y + b * a
  };
  F.b2SeparationFunction = function() {
    this.m_localPoint = new g;
    this.m_axis = new g
  };
  F.prototype.Initialize = function(k, b, A, y, s) {
    this.m_proxyA = b;
    this.m_proxyB = y;
    var q = parseInt(k.count);
    a.b2Assert(0 < q && q < 3);
    var d, m, h, f, j = f = h = y = b = 0, t = 0, j = 0;
    q == 1 ? (this.m_type = F.e_points, d = this.m_proxyA.GetVertex(k.indexA[0]), m = this.m_proxyB.GetVertex(k.indexB[0]), q = d, k = A.R, b = A.position.x + (k.col1.x * q.x + k.col2.x * q.y), y = A.position.y + (k.col1.y * q.x + k.col2.y * q.y), q = m, k = s.R, h = s.position.x + (k.col1.x * q.x + k.col2.x * q.y), f = s.position.y + (k.col1.y * q.x + k.col2.y * q.y), this.m_axis.x = h - b, this.m_axis.y = f - y, this.m_axis.Normalize()) : (k.indexB[0] == k.indexB[1] ? (this.m_type = F.e_faceA, 
    b = this.m_proxyA.GetVertex(k.indexA[0]), y = this.m_proxyA.GetVertex(k.indexA[1]), m = this.m_proxyB.GetVertex(k.indexB[0]), this.m_localPoint.x = 0.5 * (b.x + y.x), this.m_localPoint.y = 0.5 * (b.y + y.y), this.m_axis = e.CrossVF(e.SubtractVV(y, b), 1), this.m_axis.Normalize(), q = this.m_axis, k = A.R, j = k.col1.x * q.x + k.col2.x * q.y, t = k.col1.y * q.x + k.col2.y * q.y, q = this.m_localPoint, k = A.R, b = A.position.x + (k.col1.x * q.x + k.col2.x * q.y), y = A.position.y + (k.col1.y * 
    q.x + k.col2.y * q.y), q = m, k = s.R, h = s.position.x + (k.col1.x * q.x + k.col2.x * q.y), f = s.position.y + (k.col1.y * q.x + k.col2.y * q.y), j = (h - b) * j + (f - y) * t) : k.indexA[0] == k.indexA[0] ? (this.m_type = F.e_faceB, h = this.m_proxyB.GetVertex(k.indexB[0]), f = this.m_proxyB.GetVertex(k.indexB[1]), d = this.m_proxyA.GetVertex(k.indexA[0]), this.m_localPoint.x = 0.5 * (h.x + f.x), this.m_localPoint.y = 0.5 * (h.y + f.y), this.m_axis = e.CrossVF(e.SubtractVV(f, h), 1), this.m_axis.Normalize(), 
    q = this.m_axis, k = s.R, j = k.col1.x * q.x + k.col2.x * q.y, t = k.col1.y * q.x + k.col2.y * q.y, q = this.m_localPoint, k = s.R, h = s.position.x + (k.col1.x * q.x + k.col2.x * q.y), f = s.position.y + (k.col1.y * q.x + k.col2.y * q.y), q = d, k = A.R, b = A.position.x + (k.col1.x * q.x + k.col2.x * q.y), y = A.position.y + (k.col1.y * q.x + k.col2.y * q.y), j = (b - h) * j + (y - f) * t) : (b = this.m_proxyA.GetVertex(k.indexA[0]), y = this.m_proxyA.GetVertex(k.indexA[1]), h = this.m_proxyB.GetVertex(k.indexB[0]), 
    f = this.m_proxyB.GetVertex(k.indexB[1]), e.MulX(A, d), d = e.MulMV(A.R, e.SubtractVV(y, b)), e.MulX(s, m), j = e.MulMV(s.R, e.SubtractVV(f, h)), s = d.x * d.x + d.y * d.y, m = j.x * j.x + j.y * j.y, k = e.SubtractVV(j, d), A = d.x * k.x + d.y * k.y, k = j.x * k.x + j.y * k.y, d = d.x * j.x + d.y * j.y, t = s * m - d * d, j = 0, t != 0 && (j = e.Clamp((d * k - A * m) / t, 0, 1)), (d * j + k) / m < 0 && (j = e.Clamp((d - A) / s, 0, 1)), d = new g, d.x = b.x + j * (y.x - b.x), d.y = b.y + j * (y.y - 
    b.y), m = new g, m.x = h.x + j * (f.x - h.x), m.y = h.y + j * (f.y - h.y), j == 0 || j == 1 ? (this.m_type = F.e_faceB, this.m_axis = e.CrossVF(e.SubtractVV(f, h), 1), this.m_axis.Normalize(), this.m_localPoint = m) : (this.m_type = F.e_faceA, this.m_axis = e.CrossVF(e.SubtractVV(y, b), 1), this.m_localPoint = d)), j < 0 && this.m_axis.NegativeSelf())
  };
  F.prototype.Evaluate = function(k, b) {
    var q, y, s = 0;
    switch(this.m_type) {
      case F.e_points:
        return q = e.MulTMV(k.R, this.m_axis), y = e.MulTMV(b.R, this.m_axis.GetNegative()), q = this.m_proxyA.GetSupportVertex(q), y = this.m_proxyB.GetSupportVertex(y), q = e.MulX(k, q), y = e.MulX(b, y), s = (y.x - q.x) * this.m_axis.x + (y.y - q.y) * this.m_axis.y;
      case F.e_faceA:
        return s = e.MulMV(k.R, this.m_axis), q = e.MulX(k, this.m_localPoint), y = e.MulTMV(b.R, s.GetNegative()), y = this.m_proxyB.GetSupportVertex(y), y = e.MulX(b, y), s = (y.x - q.x) * s.x + (y.y - q.y) * s.y;
      case F.e_faceB:
        return s = e.MulMV(b.R, this.m_axis), y = e.MulX(b, this.m_localPoint), q = e.MulTMV(k.R, s.GetNegative()), q = this.m_proxyA.GetSupportVertex(q), q = e.MulX(k, q), s = (q.x - y.x) * s.x + (q.y - y.y) * s.y;
      default:
        return a.b2Assert(!1), 0
    }
  };
  Box2D.postDefs.push(function() {
    Box2D.Collision.b2SeparationFunction.e_points = 1;
    Box2D.Collision.b2SeparationFunction.e_faceA = 2;
    Box2D.Collision.b2SeparationFunction.e_faceB = 4
  });
  G.b2Simplex = function() {
    this.m_v1 = new m;
    this.m_v2 = new m;
    this.m_v3 = new m;
    this.m_vertices = Array(3)
  };
  G.prototype.b2Simplex = function() {
    this.m_vertices[0] = this.m_v1;
    this.m_vertices[1] = this.m_v2;
    this.m_vertices[2] = this.m_v3
  };
  G.prototype.ReadCache = function(k, b, q, y, s) {
    a.b2Assert(0 <= k.count && k.count <= 3);
    var d, m;
    this.m_count = k.count;
    for(var h = this.m_vertices, g = 0;g < this.m_count;g++) {
      var f = h[g];
      f.indexA = k.indexA[g];
      f.indexB = k.indexB[g];
      d = b.GetVertex(f.indexA);
      m = y.GetVertex(f.indexB);
      f.wA = e.MulX(q, d);
      f.wB = e.MulX(s, m);
      f.w = e.SubtractVV(f.wB, f.wA);
      f.a = 0
    }
    if(this.m_count > 1 && (k = k.metric, d = this.GetMetric(), d < 0.5 * k || 2 * k < d || d < Number.MIN_VALUE)) {
      this.m_count = 0
    }
    if(this.m_count == 0) {
      f = h[0], f.indexA = 0, f.indexB = 0, d = b.GetVertex(0), m = y.GetVertex(0), f.wA = e.MulX(q, d), f.wB = e.MulX(s, m), f.w = e.SubtractVV(f.wB, f.wA), this.m_count = 1
    }
  };
  G.prototype.WriteCache = function(a) {
    a.metric = this.GetMetric();
    a.count = Box2D.parseUInt(this.m_count);
    for(var k = this.m_vertices, b = 0;b < this.m_count;b++) {
      a.indexA[b] = Box2D.parseUInt(k[b].indexA), a.indexB[b] = Box2D.parseUInt(k[b].indexB)
    }
  };
  G.prototype.GetSearchDirection = function() {
    switch(this.m_count) {
      case 1:
        return this.m_v1.w.GetNegative();
      case 2:
        var k = e.SubtractVV(this.m_v2.w, this.m_v1.w);
        return e.CrossVV(k, this.m_v1.w.GetNegative()) > 0 ? e.CrossFV(1, k) : e.CrossVF(k, 1);
      default:
        return a.b2Assert(!1), new g
    }
  };
  G.prototype.GetClosestPoint = function() {
    switch(this.m_count) {
      case 0:
        return a.b2Assert(!1), new g;
      case 1:
        return this.m_v1.w;
      case 2:
        return new g(this.m_v1.a * this.m_v1.w.x + this.m_v2.a * this.m_v2.w.x, this.m_v1.a * this.m_v1.w.y + this.m_v2.a * this.m_v2.w.y);
      default:
        return a.b2Assert(!1), new g
    }
  };
  G.prototype.GetWitnessPoints = function(k, b) {
    switch(this.m_count) {
      case 0:
        a.b2Assert(!1);
        break;
      case 1:
        k.SetV(this.m_v1.wA);
        b.SetV(this.m_v1.wB);
        break;
      case 2:
        k.x = this.m_v1.a * this.m_v1.wA.x + this.m_v2.a * this.m_v2.wA.x;
        k.y = this.m_v1.a * this.m_v1.wA.y + this.m_v2.a * this.m_v2.wA.y;
        b.x = this.m_v1.a * this.m_v1.wB.x + this.m_v2.a * this.m_v2.wB.x;
        b.y = this.m_v1.a * this.m_v1.wB.y + this.m_v2.a * this.m_v2.wB.y;
        break;
      case 3:
        b.x = k.x = this.m_v1.a * this.m_v1.wA.x + this.m_v2.a * this.m_v2.wA.x + this.m_v3.a * this.m_v3.wA.x;
        b.y = k.y = this.m_v1.a * this.m_v1.wA.y + this.m_v2.a * this.m_v2.wA.y + this.m_v3.a * this.m_v3.wA.y;
        break;
      default:
        a.b2Assert(!1)
    }
  };
  G.prototype.GetMetric = function() {
    switch(this.m_count) {
      case 0:
        return a.b2Assert(!1), 0;
      case 1:
        return 0;
      case 2:
        return e.SubtractVV(this.m_v1.w, this.m_v2.w).Length();
      case 3:
        return e.CrossVV(e.SubtractVV(this.m_v2.w, this.m_v1.w), e.SubtractVV(this.m_v3.w, this.m_v1.w));
      default:
        return a.b2Assert(!1), 0
    }
  };
  G.prototype.Solve2 = function() {
    var a = this.m_v1.w, k = this.m_v2.w, b = e.SubtractVV(k, a), a = -(a.x * b.x + a.y * b.y);
    a <= 0 ? this.m_count = this.m_v1.a = 1 : (k = k.x * b.x + k.y * b.y, k <= 0 ? (this.m_count = this.m_v2.a = 1, this.m_v1.Set(this.m_v2)) : (b = 1 / (k + a), this.m_v1.a = k * b, this.m_v2.a = a * b, this.m_count = 2))
  };
  G.prototype.Solve3 = function() {
    var a = this.m_v1.w, k = this.m_v2.w, b = this.m_v3.w, q = e.SubtractVV(k, a), s = e.Dot(a, q), d = e.Dot(k, q), s = -s, m = e.SubtractVV(b, a), h = e.Dot(a, m), f = e.Dot(b, m), h = -h, g = e.SubtractVV(b, k), j = e.Dot(k, g), g = e.Dot(b, g), j = -j, m = e.CrossVV(q, m), q = m * e.CrossVV(k, b), b = m * e.CrossVV(b, a), a = m * e.CrossVV(a, k);
    s <= 0 && h <= 0 ? this.m_count = this.m_v1.a = 1 : d > 0 && s > 0 && a <= 0 ? (f = 1 / (d + s), this.m_v1.a = d * f, this.m_v2.a = s * f, this.m_count = 2) : f > 0 && h > 0 && b <= 0 ? (d = 1 / (f + h), this.m_v1.a = f * d, this.m_v3.a = h * d, this.m_count = 2, this.m_v2.Set(this.m_v3)) : d <= 0 && j <= 0 ? (this.m_count = this.m_v2.a = 1, this.m_v1.Set(this.m_v2)) : f <= 0 && g <= 0 ? (this.m_count = this.m_v3.a = 1, this.m_v1.Set(this.m_v3)) : g > 0 && j > 0 && q <= 0 ? (d = 1 / (g + j), 
    this.m_v2.a = g * d, this.m_v3.a = j * d, this.m_count = 2, this.m_v1.Set(this.m_v3)) : (d = 1 / (q + b + a), this.m_v1.a = q * d, this.m_v2.a = b * d, this.m_v3.a = a * d, this.m_count = 3)
  };
  K.b2SimplexCache = function() {
    this.indexA = [0, 0, 0];
    this.indexB = [0, 0, 0]
  };
  m.b2SimplexVertex = function() {
  };
  m.prototype.Set = function(a) {
    this.wA.SetV(a.wA);
    this.wB.SetV(a.wB);
    this.w.SetV(a.w);
    this.a = a.a;
    this.indexA = a.indexA;
    this.indexB = a.indexB
  };
  z.b2TimeOfImpact = function() {
  };
  z.TimeOfImpact = function(k) {
    ++z.b2_toiCalls;
    var b = k.proxyA, q = k.proxyB, s = k.sweepA, d = k.sweepB;
    a.b2Assert(s.t0 == d.t0);
    a.b2Assert(1 - s.t0 > Number.MIN_VALUE);
    var m = b.m_radius + q.m_radius, k = k.tolerance, f = 0, g = 0, j = 0;
    z.s_cache.count = 0;
    for(z.s_distanceInput.useRadii = !1;;) {
      s.GetTransform(z.s_xfA, f);
      d.GetTransform(z.s_xfB, f);
      z.s_distanceInput.proxyA = b;
      z.s_distanceInput.proxyB = q;
      z.s_distanceInput.transformA = z.s_xfA;
      z.s_distanceInput.transformB = z.s_xfB;
      h.Distance(z.s_distanceOutput, z.s_cache, z.s_distanceInput);
      if(z.s_distanceOutput.distance <= 0) {
        f = 1;
        break
      }
      z.s_fcn.Initialize(z.s_cache, b, z.s_xfA, q, z.s_xfB);
      var t = z.s_fcn.Evaluate(z.s_xfA, z.s_xfB);
      if(t <= 0) {
        f = 1;
        break
      }
      g == 0 && (j = t > m ? e.Max(m - k, 0.75 * m) : e.Max(t - k, 0.02 * m));
      if(t - j < 0.5 * k) {
        if(g == 0) {
          f = 1;
          break
        }
        break
      }
      var n = f, u = f, D = 1;
      s.GetTransform(z.s_xfA, D);
      d.GetTransform(z.s_xfB, D);
      var l = z.s_fcn.Evaluate(z.s_xfA, z.s_xfB);
      if(l >= j) {
        f = 1;
        break
      }
      for(var o = 0;;) {
        var I = 0, I = o & 1 ? u + (j - t) * (D - u) / (l - t) : 0.5 * (u + D);
        s.GetTransform(z.s_xfA, I);
        d.GetTransform(z.s_xfB, I);
        var H = z.s_fcn.Evaluate(z.s_xfA, z.s_xfB);
        if(e.Abs(H - j) < 0.025 * k) {
          n = I;
          break
        }
        H > j ? (u = I, t = H) : (D = I, l = H);
        ++o;
        ++z.b2_toiRootIters;
        if(o == 50) {
          break
        }
      }
      z.b2_toiMaxRootIters = e.Max(z.b2_toiMaxRootIters, o);
      if(n < (1 + 100 * Number.MIN_VALUE) * f) {
        break
      }
      f = n;
      g++;
      ++z.b2_toiIters;
      if(g == 1E3) {
        break
      }
    }
    z.b2_toiMaxIters = e.Max(z.b2_toiMaxIters, g);
    return f
  };
  Box2D.postDefs.push(function() {
    Box2D.Collision.b2TimeOfImpact.b2_toiCalls = 0;
    Box2D.Collision.b2TimeOfImpact.b2_toiIters = 0;
    Box2D.Collision.b2TimeOfImpact.b2_toiMaxIters = 0;
    Box2D.Collision.b2TimeOfImpact.b2_toiRootIters = 0;
    Box2D.Collision.b2TimeOfImpact.b2_toiMaxRootIters = 0;
    Box2D.Collision.b2TimeOfImpact.s_cache = new K;
    Box2D.Collision.b2TimeOfImpact.s_distanceInput = new n;
    Box2D.Collision.b2TimeOfImpact.s_xfA = new b;
    Box2D.Collision.b2TimeOfImpact.s_xfB = new b;
    Box2D.Collision.b2TimeOfImpact.s_fcn = new F;
    Box2D.Collision.b2TimeOfImpact.s_distanceOutput = new j
  });
  I.b2TOIInput = function() {
    this.proxyA = new r;
    this.proxyB = new r;
    this.sweepA = new d;
    this.sweepB = new d
  };
  J.b2WorldManifold = function() {
    this.m_normal = new g
  };
  J.prototype.b2WorldManifold = function() {
    this.m_points = Array(a.b2_maxManifoldPoints);
    for(var k = 0;k < a.b2_maxManifoldPoints;k++) {
      this.m_points[k] = new g
    }
  };
  J.prototype.Initialize = function(a, k, b, q, s) {
    b === void 0 && (b = 0);
    s === void 0 && (s = 0);
    if(a.m_pointCount != 0) {
      var d = 0, m, h, e = 0, f = 0, g = 0, j = 0, t = 0;
      m = 0;
      switch(a.m_type) {
        case x.e_circles:
          h = k.R;
          m = a.m_localPoint;
          d = k.position.x + h.col1.x * m.x + h.col2.x * m.y;
          k = k.position.y + h.col1.y * m.x + h.col2.y * m.y;
          h = q.R;
          m = a.m_points[0].m_localPoint;
          a = q.position.x + h.col1.x * m.x + h.col2.x * m.y;
          q = q.position.y + h.col1.y * m.x + h.col2.y * m.y;
          m = a - d;
          h = q - k;
          e = m * m + h * h;
          e > Box2D.MIN_VALUE_SQUARED ? (e = Math.sqrt(e), this.m_normal.x = m / e, this.m_normal.y = h / e) : (this.m_normal.x = 1, this.m_normal.y = 0);
          m = k + b * this.m_normal.y;
          q -= s * this.m_normal.y;
          this.m_points[0].x = 0.5 * (d + b * this.m_normal.x + (a - s * this.m_normal.x));
          this.m_points[0].y = 0.5 * (m + q);
          break;
        case x.e_faceA:
          h = k.R;
          m = a.m_localPlaneNormal;
          e = h.col1.x * m.x + h.col2.x * m.y;
          f = h.col1.y * m.x + h.col2.y * m.y;
          h = k.R;
          m = a.m_localPoint;
          g = k.position.x + h.col1.x * m.x + h.col2.x * m.y;
          j = k.position.y + h.col1.y * m.x + h.col2.y * m.y;
          this.m_normal.x = e;
          this.m_normal.y = f;
          for(d = 0;d < a.m_pointCount;d++) {
            h = q.R, m = a.m_points[d].m_localPoint, t = q.position.x + h.col1.x * m.x + h.col2.x * m.y, m = q.position.y + h.col1.y * m.x + h.col2.y * m.y, this.m_points[d].x = t + 0.5 * (b - (t - g) * e - (m - j) * f - s) * e, this.m_points[d].y = m + 0.5 * (b - (t - g) * e - (m - j) * f - s) * f
          }
          break;
        case x.e_faceB:
          h = q.R;
          m = a.m_localPlaneNormal;
          e = h.col1.x * m.x + h.col2.x * m.y;
          f = h.col1.y * m.x + h.col2.y * m.y;
          h = q.R;
          m = a.m_localPoint;
          g = q.position.x + h.col1.x * m.x + h.col2.x * m.y;
          j = q.position.y + h.col1.y * m.x + h.col2.y * m.y;
          this.m_normal.x = -e;
          this.m_normal.y = -f;
          for(d = 0;d < a.m_pointCount;d++) {
            h = k.R, m = a.m_points[d].m_localPoint, t = k.position.x + h.col1.x * m.x + h.col2.x * m.y, m = k.position.y + h.col1.y * m.x + h.col2.y * m.y, this.m_points[d].x = t + 0.5 * (s - (t - g) * e - (m - j) * f - b) * e, this.m_points[d].y = m + 0.5 * (s - (t - g) * e - (m - j) * f - b) * f
          }
      }
    }
  };
  k.ClipVertex = function() {
    this.v = new g;
    this.id = new l
  };
  k.prototype.Set = function(a) {
    this.v.SetV(a.v);
    this.id.Set(a.id)
  };
  s.Features = function() {
  };
  Object.defineProperty(s.prototype, "referenceEdge", {enumerable:!1, configurable:!0, get:function() {
    return this._referenceEdge
  }});
  Object.defineProperty(s.prototype, "referenceEdge", {enumerable:!1, configurable:!0, set:function(a) {
    a === void 0 && (a = 0);
    this._referenceEdge = a;
    this._m_id._key = this._m_id._key & 4294967040 | this._referenceEdge & 255
  }});
  Object.defineProperty(s.prototype, "incidentEdge", {enumerable:!1, configurable:!0, get:function() {
    return this._incidentEdge
  }});
  Object.defineProperty(s.prototype, "incidentEdge", {enumerable:!1, configurable:!0, set:function(a) {
    a === void 0 && (a = 0);
    this._incidentEdge = a;
    this._m_id._key = this._m_id._key & 4294902015 | this._incidentEdge << 8 & 65280
  }});
  Object.defineProperty(s.prototype, "incidentVertex", {enumerable:!1, configurable:!0, get:function() {
    return this._incidentVertex
  }});
  Object.defineProperty(s.prototype, "incidentVertex", {enumerable:!1, configurable:!0, set:function(a) {
    a === void 0 && (a = 0);
    this._incidentVertex = a;
    this._m_id._key = this._m_id._key & 4278255615 | this._incidentVertex << 16 & 16711680
  }});
  Object.defineProperty(s.prototype, "flip", {enumerable:!1, configurable:!0, get:function() {
    return this._flip
  }});
  Object.defineProperty(s.prototype, "flip", {enumerable:!1, configurable:!0, set:function(a) {
    a === void 0 && (a = 0);
    this._flip = a;
    this._m_id._key = this._m_id._key & 16777215 | this._flip << 24 & 4278190080
  }})
})();
(function() {
  var a = Box2D.Common.b2Settings, e = Box2D.Collision.Shapes.b2CircleShape, d = Box2D.Collision.Shapes.b2EdgeChainDef, b = Box2D.Collision.Shapes.b2EdgeShape, g = Box2D.Collision.Shapes.b2MassData, f = Box2D.Collision.Shapes.b2PolygonShape, l = Box2D.Collision.Shapes.b2Shape, h = Box2D.Common.Math.b2Mat22, n = Box2D.Common.Math.b2Math, j = Box2D.Common.Math.b2Transform, r = Box2D.Common.Math.b2Vec2, p = Box2D.Collision.b2Distance, v = Box2D.Collision.b2DistanceInput, o = Box2D.Collision.b2DistanceOutput, 
  w = Box2D.Collision.b2DistanceProxy, x = Box2D.Collision.b2SimplexCache;
  Box2D.inherit(e, Box2D.Collision.Shapes.b2Shape);
  e.prototype.__super = Box2D.Collision.Shapes.b2Shape.prototype;
  e.b2CircleShape = function() {
    Box2D.Collision.Shapes.b2Shape.b2Shape.apply(this, arguments);
    this.m_p = new r
  };
  e.prototype.Copy = function() {
    var a = new e;
    a.Set(this);
    return a
  };
  e.prototype.Set = function(a) {
    this.__super.Set.call(this, a);
    Box2D.is(a, e) && this.m_p.SetV((a instanceof e ? a : null).m_p)
  };
  e.prototype.TestPoint = function(a, b) {
    var d = a.R, h = a.position.x + (d.col1.x * this.m_p.x + d.col2.x * this.m_p.y), d = a.position.y + (d.col1.y * this.m_p.x + d.col2.y * this.m_p.y), h = b.x - h, d = b.y - d;
    return h * h + d * d <= this.m_radius * this.m_radius
  };
  e.prototype.RayCast = function(a, b, d) {
    var h = d.R, e = b.p1.x - (d.position.x + (h.col1.x * this.m_p.x + h.col2.x * this.m_p.y)), d = b.p1.y - (d.position.y + (h.col1.y * this.m_p.x + h.col2.y * this.m_p.y)), h = b.p2.x - b.p1.x, f = b.p2.y - b.p1.y, g = e * h + d * f, j = h * h + f * f, m = g * g - j * (e * e + d * d - this.m_radius * this.m_radius);
    if(m < 0 || j < Number.MIN_VALUE) {
      return!1
    }
    g = -(g + Math.sqrt(m));
    return 0 <= g && g <= b.maxFraction * j ? (g /= j, a.fraction = g, a.normal.x = e + g * h, a.normal.y = d + g * f, a.normal.Normalize(), !0) : !1
  };
  e.prototype.ComputeAABB = function(a, b) {
    var d = b.R, h = b.position.x + (d.col1.x * this.m_p.x + d.col2.x * this.m_p.y), d = b.position.y + (d.col1.y * this.m_p.x + d.col2.y * this.m_p.y);
    a.lowerBound.Set(h - this.m_radius, d - this.m_radius);
    a.upperBound.Set(h + this.m_radius, d + this.m_radius)
  };
  e.prototype.ComputeMass = function(b, d) {
    d === void 0 && (d = 0);
    b.mass = d * a.b2_pi * this.m_radius * this.m_radius;
    b.center.SetV(this.m_p);
    b.I = b.mass * (0.5 * this.m_radius * this.m_radius + (this.m_p.x * this.m_p.x + this.m_p.y * this.m_p.y))
  };
  e.prototype.ComputeSubmergedArea = function(a, b, d, h) {
    b === void 0 && (b = 0);
    var d = n.MulX(d, this.m_p), e = -(n.Dot(a, d) - b);
    if(e < -this.m_radius + Number.MIN_VALUE) {
      return 0
    }
    if(e > this.m_radius) {
      return h.SetV(d), Math.PI * this.m_radius * this.m_radius
    }
    var b = this.m_radius * this.m_radius, f = e * e, e = b * (Math.asin(e / this.m_radius) + Math.PI / 2) + e * Math.sqrt(b - f), b = -2 / 3 * Math.pow(b - f, 1.5) / e;
    h.x = d.x + a.x * b;
    h.y = d.y + a.y * b;
    return e
  };
  e.prototype.GetLocalPosition = function() {
    return this.m_p
  };
  e.prototype.SetLocalPosition = function(a) {
    this.m_p.SetV(a)
  };
  e.prototype.GetRadius = function() {
    return this.m_radius
  };
  e.prototype.SetRadius = function(a) {
    a === void 0 && (a = 0);
    this.m_radius = a
  };
  e.prototype.b2CircleShape = function(a) {
    a === void 0 && (a = 0);
    this.__super.b2Shape.call(this);
    this.m_type = l.e_circleShape;
    this.m_radius = a
  };
  d.b2EdgeChainDef = function() {
  };
  d.prototype.b2EdgeChainDef = function() {
    this.vertexCount = 0;
    this.isALoop = !0;
    this.vertices = []
  };
  Box2D.inherit(b, Box2D.Collision.Shapes.b2Shape);
  b.prototype.__super = Box2D.Collision.Shapes.b2Shape.prototype;
  b.b2EdgeShape = function() {
    Box2D.Collision.Shapes.b2Shape.b2Shape.apply(this, arguments);
    this.s_supportVec = new r;
    this.m_v1 = new r;
    this.m_v2 = new r;
    this.m_coreV1 = new r;
    this.m_coreV2 = new r;
    this.m_normal = new r;
    this.m_direction = new r;
    this.m_cornerDir1 = new r;
    this.m_cornerDir2 = new r
  };
  b.prototype.TestPoint = function() {
    return!1
  };
  b.prototype.RayCast = function(a, b, d) {
    var h, e = b.p2.x - b.p1.x, f = b.p2.y - b.p1.y;
    h = d.R;
    var g = d.position.x + (h.col1.x * this.m_v1.x + h.col2.x * this.m_v1.y), j = d.position.y + (h.col1.y * this.m_v1.x + h.col2.y * this.m_v1.y), m = d.position.y + (h.col1.y * this.m_v2.x + h.col2.y * this.m_v2.y) - j, d = -(d.position.x + (h.col1.x * this.m_v2.x + h.col2.x * this.m_v2.y) - g);
    h = 100 * Number.MIN_VALUE;
    var n = -(e * m + f * d);
    if(n > h) {
      var g = b.p1.x - g, l = b.p1.y - j, j = g * m + l * d;
      if(0 <= j && j <= b.maxFraction * n && (b = -e * l + f * g, -h * n <= b && b <= n * (1 + h))) {
        return j /= n, a.fraction = j, b = Math.sqrt(m * m + d * d), a.normal.x = m / b, a.normal.y = d / b, !0
      }
    }
    return!1
  };
  b.prototype.ComputeAABB = function(a, b) {
    var d = b.R, h = b.position.x + (d.col1.x * this.m_v1.x + d.col2.x * this.m_v1.y), e = b.position.y + (d.col1.y * this.m_v1.x + d.col2.y * this.m_v1.y), f = b.position.x + (d.col1.x * this.m_v2.x + d.col2.x * this.m_v2.y), d = b.position.y + (d.col1.y * this.m_v2.x + d.col2.y * this.m_v2.y);
    h < f ? (a.lowerBound.x = h, a.upperBound.x = f) : (a.lowerBound.x = f, a.upperBound.x = h);
    e < d ? (a.lowerBound.y = e, a.upperBound.y = d) : (a.lowerBound.y = d, a.upperBound.y = e)
  };
  b.prototype.ComputeMass = function(a) {
    a.mass = 0;
    a.center.SetV(this.m_v1);
    a.I = 0
  };
  b.prototype.ComputeSubmergedArea = function(a, b, d, h) {
    b === void 0 && (b = 0);
    var e = new r(a.x * b, a.y * b), f = n.MulX(d, this.m_v1), d = n.MulX(d, this.m_v2), g = n.Dot(a, f) - b, a = n.Dot(a, d) - b;
    if(g > 0) {
      if(a > 0) {
        return 0
      }else {
        f.x = -a / (g - a) * f.x + g / (g - a) * d.x, f.y = -a / (g - a) * f.y + g / (g - a) * d.y
      }
    }else {
      if(a > 0) {
        d.x = -a / (g - a) * f.x + g / (g - a) * d.x, d.y = -a / (g - a) * f.y + g / (g - a) * d.y
      }
    }
    h.x = (e.x + f.x + d.x) / 3;
    h.y = (e.y + f.y + d.y) / 3;
    return 0.5 * ((f.x - e.x) * (d.y - e.y) - (f.y - e.y) * (d.x - e.x))
  };
  b.prototype.GetLength = function() {
    return this.m_length
  };
  b.prototype.GetVertex1 = function() {
    return this.m_v1
  };
  b.prototype.GetVertex2 = function() {
    return this.m_v2
  };
  b.prototype.GetCoreVertex1 = function() {
    return this.m_coreV1
  };
  b.prototype.GetCoreVertex2 = function() {
    return this.m_coreV2
  };
  b.prototype.GetNormalVector = function() {
    return this.m_normal
  };
  b.prototype.GetDirectionVector = function() {
    return this.m_direction
  };
  b.prototype.GetCorner1Vector = function() {
    return this.m_cornerDir1
  };
  b.prototype.GetCorner2Vector = function() {
    return this.m_cornerDir2
  };
  b.prototype.Corner1IsConvex = function() {
    return this.m_cornerConvex1
  };
  b.prototype.Corner2IsConvex = function() {
    return this.m_cornerConvex2
  };
  b.prototype.GetFirstVertex = function(a) {
    var b = a.R;
    return new r(a.position.x + (b.col1.x * this.m_coreV1.x + b.col2.x * this.m_coreV1.y), a.position.y + (b.col1.y * this.m_coreV1.x + b.col2.y * this.m_coreV1.y))
  };
  b.prototype.GetNextEdge = function() {
    return this.m_nextEdge
  };
  b.prototype.GetPrevEdge = function() {
    return this.m_prevEdge
  };
  b.prototype.Support = function(a, b, d) {
    b === void 0 && (b = 0);
    d === void 0 && (d = 0);
    var h = a.R, e = a.position.x + (h.col1.x * this.m_coreV1.x + h.col2.x * this.m_coreV1.y), f = a.position.y + (h.col1.y * this.m_coreV1.x + h.col2.y * this.m_coreV1.y), g = a.position.x + (h.col1.x * this.m_coreV2.x + h.col2.x * this.m_coreV2.y), a = a.position.y + (h.col1.y * this.m_coreV2.x + h.col2.y * this.m_coreV2.y);
    e * b + f * d > g * b + a * d ? (this.s_supportVec.x = e, this.s_supportVec.y = f) : (this.s_supportVec.x = g, this.s_supportVec.y = a);
    return this.s_supportVec
  };
  b.prototype.b2EdgeShape = function(b, d) {
    this.__super.b2Shape.call(this);
    this.m_type = l.e_edgeShape;
    this.m_nextEdge = this.m_prevEdge = null;
    this.m_v1 = b;
    this.m_v2 = d;
    this.m_direction.Set(this.m_v2.x - this.m_v1.x, this.m_v2.y - this.m_v1.y);
    this.m_length = this.m_direction.Normalize();
    this.m_normal.Set(this.m_direction.y, -this.m_direction.x);
    this.m_coreV1.Set(-a.b2_toiSlop * (this.m_normal.x - this.m_direction.x) + this.m_v1.x, -a.b2_toiSlop * (this.m_normal.y - this.m_direction.y) + this.m_v1.y);
    this.m_coreV2.Set(-a.b2_toiSlop * (this.m_normal.x + this.m_direction.x) + this.m_v2.x, -a.b2_toiSlop * (this.m_normal.y + this.m_direction.y) + this.m_v2.y);
    this.m_cornerDir1 = this.m_normal;
    this.m_cornerDir2.Set(-this.m_normal.x, -this.m_normal.y)
  };
  b.prototype.SetPrevEdge = function(a, b, d, h) {
    this.m_prevEdge = a;
    this.m_coreV1 = b;
    this.m_cornerDir1 = d;
    this.m_cornerConvex1 = h
  };
  b.prototype.SetNextEdge = function(a, b, d, h) {
    this.m_nextEdge = a;
    this.m_coreV2 = b;
    this.m_cornerDir2 = d;
    this.m_cornerConvex2 = h
  };
  g.b2MassData = function() {
    this.mass = 0;
    this.center = new r(0, 0);
    this.I = 0
  };
  Box2D.inherit(f, Box2D.Collision.Shapes.b2Shape);
  f.prototype.__super = Box2D.Collision.Shapes.b2Shape.prototype;
  f.b2PolygonShape = function() {
    Box2D.Collision.Shapes.b2Shape.b2Shape.apply(this, arguments)
  };
  f.prototype.Copy = function() {
    var a = new f;
    a.Set(this);
    return a
  };
  f.prototype.Set = function(a) {
    this.__super.Set.call(this, a);
    if(Box2D.is(a, f)) {
      a = a instanceof f ? a : null;
      this.m_centroid.SetV(a.m_centroid);
      this.m_vertexCount = a.m_vertexCount;
      this.Reserve(this.m_vertexCount);
      for(var b = 0;b < this.m_vertexCount;b++) {
        this.m_vertices[b].SetV(a.m_vertices[b]), this.m_normals[b].SetV(a.m_normals[b])
      }
    }
  };
  f.prototype.SetAsArray = function(a, b) {
    b === void 0 && (b = 0);
    for(var d = [], h = 0, e, h = 0;h < a.length;++h) {
      e = a[h], d.push(e)
    }
    this.SetAsVector(d, b)
  };
  f.AsArray = function(a, b) {
    b === void 0 && (b = 0);
    var d = new f;
    d.SetAsArray(a, b);
    return d
  };
  f.prototype.SetAsVector = function(b, d) {
    d === void 0 && (d = 0);
    if(d == 0) {
      d = b.length
    }
    a.b2Assert(2 <= d);
    this.m_vertexCount = d;
    this.Reserve(d);
    for(var h = 0, h = 0;h < this.m_vertexCount;h++) {
      this.m_vertices[h].SetV(b[h])
    }
    for(h = 0;h < this.m_vertexCount;++h) {
      var e = parseInt(h), g = parseInt(h + 1 < this.m_vertexCount ? h + 1 : 0), e = n.SubtractVV(this.m_vertices[g], this.m_vertices[e]);
      a.b2Assert(e.LengthSquared() > Number.MIN_VALUE);
      this.m_normals[h].SetV(n.CrossVF(e, 1));
      this.m_normals[h].Normalize()
    }
    this.m_centroid = f.ComputeCentroid(this.m_vertices, this.m_vertexCount)
  };
  f.AsVector = function(a, b) {
    b === void 0 && (b = 0);
    var d = new f;
    d.SetAsVector(a, b);
    return d
  };
  f.prototype.SetAsBox = function(a, b) {
    a === void 0 && (a = 0);
    b === void 0 && (b = 0);
    this.m_vertexCount = 4;
    this.Reserve(4);
    this.m_vertices[0].Set(-a, -b);
    this.m_vertices[1].Set(a, -b);
    this.m_vertices[2].Set(a, b);
    this.m_vertices[3].Set(-a, b);
    this.m_normals[0].Set(0, -1);
    this.m_normals[1].Set(1, 0);
    this.m_normals[2].Set(0, 1);
    this.m_normals[3].Set(-1, 0);
    this.m_centroid.SetZero()
  };
  f.AsBox = function(a, b) {
    a === void 0 && (a = 0);
    b === void 0 && (b = 0);
    var d = new f;
    d.SetAsBox(a, b);
    return d
  };
  f.prototype.SetAsOrientedBox = function(a, b, d, h) {
    a === void 0 && (a = 0);
    b === void 0 && (b = 0);
    d === void 0 && (d = null);
    h === void 0 && (h = 0);
    this.m_vertexCount = 4;
    this.Reserve(4);
    this.m_vertices[0].Set(-a, -b);
    this.m_vertices[1].Set(a, -b);
    this.m_vertices[2].Set(a, b);
    this.m_vertices[3].Set(-a, b);
    this.m_normals[0].Set(0, -1);
    this.m_normals[1].Set(1, 0);
    this.m_normals[2].Set(0, 1);
    this.m_normals[3].Set(-1, 0);
    this.m_centroid = d;
    a = new j;
    a.position = d;
    a.R.Set(h);
    for(d = 0;d < this.m_vertexCount;++d) {
      this.m_vertices[d] = n.MulX(a, this.m_vertices[d]), this.m_normals[d] = n.MulMV(a.R, this.m_normals[d])
    }
  };
  f.AsOrientedBox = function(a, b, d, h) {
    a === void 0 && (a = 0);
    b === void 0 && (b = 0);
    d === void 0 && (d = null);
    h === void 0 && (h = 0);
    var e = new f;
    e.SetAsOrientedBox(a, b, d, h);
    return e
  };
  f.prototype.SetAsEdge = function(a, b) {
    this.m_vertexCount = 2;
    this.Reserve(2);
    this.m_vertices[0].SetV(a);
    this.m_vertices[1].SetV(b);
    this.m_centroid.x = 0.5 * (a.x + b.x);
    this.m_centroid.y = 0.5 * (a.y + b.y);
    this.m_normals[0] = n.CrossVF(n.SubtractVV(b, a), 1);
    this.m_normals[0].Normalize();
    this.m_normals[1].x = -this.m_normals[0].x;
    this.m_normals[1].y = -this.m_normals[0].y
  };
  f.AsEdge = function(a, b) {
    var d = new f;
    d.SetAsEdge(a, b);
    return d
  };
  f.prototype.TestPoint = function(a, b) {
    var d;
    d = a.R;
    for(var h = b.x - a.position.x, e = b.y - a.position.y, f = h * d.col1.x + e * d.col1.y, g = h * d.col2.x + e * d.col2.y, j = 0;j < this.m_vertexCount;++j) {
      if(d = this.m_vertices[j], h = f - d.x, e = g - d.y, d = this.m_normals[j], d.x * h + d.y * e > 0) {
        return!1
      }
    }
    return!0
  };
  f.prototype.RayCast = function(a, b, d) {
    var h = 0, e = b.maxFraction, f = 0, g = 0, j, m, f = b.p1.x - d.position.x, g = b.p1.y - d.position.y;
    j = d.R;
    var n = f * j.col1.x + g * j.col1.y, l = f * j.col2.x + g * j.col2.y, f = b.p2.x - d.position.x, g = b.p2.y - d.position.y;
    j = d.R;
    b = f * j.col1.x + g * j.col1.y - n;
    j = f * j.col2.x + g * j.col2.y - l;
    for(var o = -1, k = 0;k < this.m_vertexCount;++k) {
      m = this.m_vertices[k];
      f = m.x - n;
      g = m.y - l;
      m = this.m_normals[k];
      f = m.x * f + m.y * g;
      g = m.x * b + m.y * j;
      if(g == 0) {
        if(f < 0) {
          return!1
        }
      }else {
        g < 0 && f < h * g ? (h = f / g, o = k) : g > 0 && f < e * g && (e = f / g)
      }
      if(e < h - Number.MIN_VALUE) {
        return!1
      }
    }
    return o >= 0 ? (a.fraction = h, j = d.R, m = this.m_normals[o], a.normal.x = j.col1.x * m.x + j.col2.x * m.y, a.normal.y = j.col1.y * m.x + j.col2.y * m.y, !0) : !1
  };
  f.prototype.ComputeAABB = function(a, b) {
    for(var d = b.R, h = this.m_vertices[0], e = b.position.x + (d.col1.x * h.x + d.col2.x * h.y), f = b.position.y + (d.col1.y * h.x + d.col2.y * h.y), g = e, j = f, m = 1;m < this.m_vertexCount;++m) {
      var h = this.m_vertices[m], n = b.position.x + (d.col1.x * h.x + d.col2.x * h.y), h = b.position.y + (d.col1.y * h.x + d.col2.y * h.y), e = e < n ? e : n, f = f < h ? f : h, g = g > n ? g : n, j = j > h ? j : h
    }
    a.lowerBound.x = e - this.m_radius;
    a.lowerBound.y = f - this.m_radius;
    a.upperBound.x = g + this.m_radius;
    a.upperBound.y = j + this.m_radius
  };
  f.prototype.ComputeMass = function(a, b) {
    b === void 0 && (b = 0);
    if(this.m_vertexCount == 2) {
      a.center.x = 0.5 * (this.m_vertices[0].x + this.m_vertices[1].x), a.center.y = 0.5 * (this.m_vertices[0].y + this.m_vertices[1].y), a.mass = 0, a.I = 0
    }else {
      for(var d = 0, h = 0, e = 0, f = 0, g = 1 / 3, j = 0;j < this.m_vertexCount;++j) {
        var m = this.m_vertices[j], n = j + 1 < this.m_vertexCount ? this.m_vertices[parseInt(j + 1)] : this.m_vertices[0], l = m.x - 0, o = m.y - 0, k = n.x - 0, s = n.y - 0, q = l * s - o * k, E = 0.5 * q;
        e += E;
        d += E * g * (0 + m.x + n.x);
        h += E * g * (0 + m.y + n.y);
        m = l;
        f += q * (g * (0.25 * (m * m + k * m + k * k) + (0 * m + 0 * k)) + 0 + (g * (0.25 * (o * o + s * o + s * s) + (0 * o + 0 * s)) + 0))
      }
      a.mass = b * e;
      d *= 1 / e;
      h *= 1 / e;
      a.center.Set(d, h);
      a.I = b * f
    }
  };
  f.prototype.ComputeSubmergedArea = function(a, b, d, h) {
    b === void 0 && (b = 0);
    for(var e = n.MulTMV(d.R, a), f = b - n.Dot(a, d.position), j = [], l = 0, m = -1, b = -1, z = !1, a = a = 0;a < this.m_vertexCount;++a) {
      j[a] = n.Dot(e, this.m_vertices[a]) - f;
      var o = j[a] < -Number.MIN_VALUE;
      a > 0 && (o ? z || (m = a - 1, l++) : z && (b = a - 1, l++));
      z = o
    }
    switch(l) {
      case 0:
        return z ? (a = new g, this.ComputeMass(a, 1), h.SetV(n.MulX(d, a.center)), a.mass) : 0;
      case 1:
        m == -1 ? m = this.m_vertexCount - 1 : b = this.m_vertexCount - 1
    }
    a = parseInt((m + 1) % this.m_vertexCount);
    e = parseInt((b + 1) % this.m_vertexCount);
    f = (0 - j[m]) / (j[a] - j[m]);
    j = (0 - j[b]) / (j[e] - j[b]);
    m = new r(this.m_vertices[m].x * (1 - f) + this.m_vertices[a].x * f, this.m_vertices[m].y * (1 - f) + this.m_vertices[a].y * f);
    b = new r(this.m_vertices[b].x * (1 - j) + this.m_vertices[e].x * j, this.m_vertices[b].y * (1 - j) + this.m_vertices[e].y * j);
    j = 0;
    f = new r;
    for(l = this.m_vertices[a];a != e;) {
      a = (a + 1) % this.m_vertexCount, z = a == e ? b : this.m_vertices[a], o = 0.5 * ((l.x - m.x) * (z.y - m.y) - (l.y - m.y) * (z.x - m.x)), j += o, f.x += o * (m.x + l.x + z.x) / 3, f.y += o * (m.y + l.y + z.y) / 3, l = z
    }
    f.Multiply(1 / j);
    h.SetV(n.MulX(d, f));
    return j
  };
  f.prototype.GetVertexCount = function() {
    return this.m_vertexCount
  };
  f.prototype.GetVertices = function() {
    return this.m_vertices
  };
  f.prototype.GetNormals = function() {
    return this.m_normals
  };
  f.prototype.GetSupport = function(a) {
    for(var b = 0, d = this.m_vertices[0].x * a.x + this.m_vertices[0].y * a.y, h = 1;h < this.m_vertexCount;++h) {
      var e = this.m_vertices[h].x * a.x + this.m_vertices[h].y * a.y;
      e > d && (b = h, d = e)
    }
    return b
  };
  f.prototype.GetSupportVertex = function(a) {
    for(var b = 0, d = this.m_vertices[0].x * a.x + this.m_vertices[0].y * a.y, h = 1;h < this.m_vertexCount;++h) {
      var e = this.m_vertices[h].x * a.x + this.m_vertices[h].y * a.y;
      e > d && (b = h, d = e)
    }
    return this.m_vertices[b]
  };
  f.prototype.Validate = function() {
    return!1
  };
  f.prototype.b2PolygonShape = function() {
    this.__super.b2Shape.call(this);
    this.m_type = l.e_polygonShape;
    this.m_centroid = new r;
    this.m_vertices = [];
    this.m_normals = []
  };
  f.prototype.Reserve = function(a) {
    a === void 0 && (a = 0);
    for(var b = parseInt(this.m_vertices.length);b < a;b++) {
      this.m_vertices[b] = new r, this.m_normals[b] = new r
    }
  };
  f.ComputeCentroid = function(a, b) {
    b === void 0 && (b = 0);
    for(var d = new r, h = 0, e = 1 / 3, f = 0;f < b;++f) {
      var g = a[f], j = f + 1 < b ? a[parseInt(f + 1)] : a[0], m = 0.5 * ((g.x - 0) * (j.y - 0) - (g.y - 0) * (j.x - 0));
      h += m;
      d.x += m * e * (0 + g.x + j.x);
      d.y += m * e * (0 + g.y + j.y)
    }
    d.x *= 1 / h;
    d.y *= 1 / h;
    return d
  };
  f.ComputeOBB = function(a, b, d) {
    d === void 0 && (d = 0);
    for(var h = 0, e = Array(d + 1), h = 0;h < d;++h) {
      e[h] = b[h]
    }
    e[d] = e[0];
    b = Number.MAX_VALUE;
    for(h = 1;h <= d;++h) {
      var f = e[parseInt(h - 1)], g = e[h].x - f.x, j = e[h].y - f.y, m = Math.sqrt(g * g + j * j);
      g /= m;
      j /= m;
      for(var n = -j, l = g, o = m = Number.MAX_VALUE, k = -Number.MAX_VALUE, s = -Number.MAX_VALUE, q = 0;q < d;++q) {
        var E = e[q].x - f.x, M = e[q].y - f.y, A = g * E + j * M, E = n * E + l * M;
        A < m && (m = A);
        E < o && (o = E);
        A > k && (k = A);
        E > s && (s = E)
      }
      q = (k - m) * (s - o);
      if(q < 0.95 * b) {
        b = q, a.R.col1.x = g, a.R.col1.y = j, a.R.col2.x = n, a.R.col2.y = l, g = 0.5 * (m + k), j = 0.5 * (o + s), n = a.R, a.center.x = f.x + (n.col1.x * g + n.col2.x * j), a.center.y = f.y + (n.col1.y * g + n.col2.y * j), a.extents.x = 0.5 * (k - m), a.extents.y = 0.5 * (s - o)
      }
    }
  };
  Box2D.postDefs.push(function() {
    Box2D.Collision.Shapes.b2PolygonShape.s_mat = new h
  });
  l.b2Shape = function() {
  };
  l.prototype.Copy = function() {
    return null
  };
  l.prototype.Set = function(a) {
    this.m_radius = a.m_radius
  };
  l.prototype.GetType = function() {
    return this.m_type
  };
  l.prototype.TestPoint = function() {
    return!1
  };
  l.prototype.RayCast = function() {
    return!1
  };
  l.prototype.ComputeAABB = function() {
  };
  l.prototype.ComputeMass = function() {
  };
  l.prototype.ComputeSubmergedArea = function() {
    return 0
  };
  l.TestOverlap = function(a, b, d, h) {
    var e = new v;
    e.proxyA = new w;
    e.proxyA.Set(a);
    e.proxyB = new w;
    e.proxyB.Set(d);
    e.transformA = b;
    e.transformB = h;
    e.useRadii = !0;
    a = new x;
    a.count = 0;
    b = new o;
    p.Distance(b, a, e);
    return b.distance < 10 * Number.MIN_VALUE
  };
  l.prototype.b2Shape = function() {
    this.m_type = l.e_unknownShape;
    this.m_radius = a.b2_linearSlop
  };
  Box2D.postDefs.push(function() {
    Box2D.Collision.Shapes.b2Shape.e_unknownShape = -1;
    Box2D.Collision.Shapes.b2Shape.e_circleShape = 0;
    Box2D.Collision.Shapes.b2Shape.e_polygonShape = 1;
    Box2D.Collision.Shapes.b2Shape.e_edgeShape = 2;
    Box2D.Collision.Shapes.b2Shape.e_shapeTypeCount = 3;
    Box2D.Collision.Shapes.b2Shape.e_hitCollide = 1;
    Box2D.Collision.Shapes.b2Shape.e_missCollide = 0;
    Box2D.Collision.Shapes.b2Shape.e_startsInsideCollide = -1
  })
})();
(function() {
  var a = Box2D.Common.b2Color, e = Box2D.Common.b2Settings, d = Box2D.Common.Math.b2Math;
  a.b2Color = function() {
    this._b = this._g = this._r = 0
  };
  a.prototype.b2Color = function(a, e, f) {
    a === void 0 && (a = 0);
    e === void 0 && (e = 0);
    f === void 0 && (f = 0);
    this._r = Box2D.parseUInt(255 * d.Clamp(a, 0, 1));
    this._g = Box2D.parseUInt(255 * d.Clamp(e, 0, 1));
    this._b = Box2D.parseUInt(255 * d.Clamp(f, 0, 1))
  };
  a.prototype.Set = function(a, e, f) {
    a === void 0 && (a = 0);
    e === void 0 && (e = 0);
    f === void 0 && (f = 0);
    this._r = Box2D.parseUInt(255 * d.Clamp(a, 0, 1));
    this._g = Box2D.parseUInt(255 * d.Clamp(e, 0, 1));
    this._b = Box2D.parseUInt(255 * d.Clamp(f, 0, 1))
  };
  Object.defineProperty(a.prototype, "r", {enumerable:!1, configurable:!0, set:function(a) {
    a === void 0 && (a = 0);
    this._r = Box2D.parseUInt(255 * d.Clamp(a, 0, 1))
  }});
  Object.defineProperty(a.prototype, "g", {enumerable:!1, configurable:!0, set:function(a) {
    a === void 0 && (a = 0);
    this._g = Box2D.parseUInt(255 * d.Clamp(a, 0, 1))
  }});
  Object.defineProperty(a.prototype, "b", {enumerable:!1, configurable:!0, set:function(a) {
    a === void 0 && (a = 0);
    this._b = Box2D.parseUInt(255 * d.Clamp(a, 0, 1))
  }});
  Object.defineProperty(a.prototype, "color", {enumerable:!1, configurable:!0, get:function() {
    return this._r << 16 | this._g << 8 | this._b
  }});
  e.b2Settings = function() {
  };
  e.b2MixFriction = function(a, d) {
    a === void 0 && (a = 0);
    d === void 0 && (d = 0);
    return Math.sqrt(a * d)
  };
  e.b2MixRestitution = function(a, d) {
    a === void 0 && (a = 0);
    d === void 0 && (d = 0);
    return a > d ? a : d
  };
  e.b2Assert = function(a) {
    if(!a) {
      throw"Assertion Failed";
    }
  };
  Box2D.postDefs.push(function() {
    Box2D.Common.b2Settings.VERSION = "2.1alpha";
    Box2D.Common.b2Settings.USHRT_MAX = 65535;
    Box2D.Common.b2Settings.b2_pi = Math.PI;
    Box2D.Common.b2Settings.b2_maxManifoldPoints = 2;
    Box2D.Common.b2Settings.b2_aabbExtension = 0.1;
    Box2D.Common.b2Settings.b2_aabbMultiplier = 2;
    Box2D.Common.b2Settings.b2_polygonRadius = 2 * e.b2_linearSlop;
    Box2D.Common.b2Settings.b2_linearSlop = 0.005;
    Box2D.Common.b2Settings.b2_angularSlop = 2 / 180 * e.b2_pi;
    Box2D.Common.b2Settings.b2_toiSlop = 8 * e.b2_linearSlop;
    Box2D.Common.b2Settings.b2_maxTOIContactsPerIsland = 32;
    Box2D.Common.b2Settings.b2_maxTOIJointsPerIsland = 32;
    Box2D.Common.b2Settings.b2_velocityThreshold = 1;
    Box2D.Common.b2Settings.b2_maxLinearCorrection = 0.2;
    Box2D.Common.b2Settings.b2_maxAngularCorrection = 8 / 180 * e.b2_pi;
    Box2D.Common.b2Settings.b2_maxTranslation = 2;
    Box2D.Common.b2Settings.b2_maxTranslationSquared = e.b2_maxTranslation * e.b2_maxTranslation;
    Box2D.Common.b2Settings.b2_maxRotation = 0.5 * e.b2_pi;
    Box2D.Common.b2Settings.b2_maxRotationSquared = e.b2_maxRotation * e.b2_maxRotation;
    Box2D.Common.b2Settings.b2_contactBaumgarte = 0.2;
    Box2D.Common.b2Settings.b2_timeToSleep = 0.5;
    Box2D.Common.b2Settings.b2_linearSleepTolerance = 0.01;
    Box2D.Common.b2Settings.b2_angularSleepTolerance = 2 / 180 * e.b2_pi
  })
})();
(function() {
  var a = Box2D.Common.Math.b2Mat22, e = Box2D.Common.Math.b2Mat33, d = Box2D.Common.Math.b2Math, b = Box2D.Common.Math.b2Sweep, g = Box2D.Common.Math.b2Transform, f = Box2D.Common.Math.b2Vec2, l = Box2D.Common.Math.b2Vec3;
  a.b2Mat22 = function() {
    this.col1 = new f;
    this.col2 = new f
  };
  a.prototype.b2Mat22 = function() {
    this.SetIdentity()
  };
  a.FromAngle = function(b) {
    b === void 0 && (b = 0);
    var d = new a;
    d.Set(b);
    return d
  };
  a.FromVV = function(b, d) {
    var e = new a;
    e.SetVV(b, d);
    return e
  };
  a.prototype.Set = function(a) {
    a === void 0 && (a = 0);
    var b = Math.cos(a), a = Math.sin(a);
    this.col1.x = b;
    this.col2.x = -a;
    this.col1.y = a;
    this.col2.y = b
  };
  a.prototype.SetVV = function(a, b) {
    this.col1.SetV(a);
    this.col2.SetV(b)
  };
  a.prototype.Copy = function() {
    var b = new a;
    b.SetM(this);
    return b
  };
  a.prototype.SetM = function(a) {
    this.col1.SetV(a.col1);
    this.col2.SetV(a.col2)
  };
  a.prototype.AddM = function(a) {
    this.col1.x += a.col1.x;
    this.col1.y += a.col1.y;
    this.col2.x += a.col2.x;
    this.col2.y += a.col2.y
  };
  a.prototype.SetIdentity = function() {
    this.col1.x = 1;
    this.col2.x = 0;
    this.col1.y = 0;
    this.col2.y = 1
  };
  a.prototype.SetZero = function() {
    this.col1.x = 0;
    this.col2.x = 0;
    this.col1.y = 0;
    this.col2.y = 0
  };
  a.prototype.GetAngle = function() {
    return Math.atan2(this.col1.y, this.col1.x)
  };
  a.prototype.GetInverse = function(a) {
    var b = this.col1.x, d = this.col2.x, e = this.col1.y, f = this.col2.y, g = b * f - d * e;
    g != 0 && (g = 1 / g);
    a.col1.x = g * f;
    a.col2.x = -g * d;
    a.col1.y = -g * e;
    a.col2.y = g * b;
    return a
  };
  a.prototype.Solve = function(a, b, d) {
    b === void 0 && (b = 0);
    d === void 0 && (d = 0);
    var e = this.col1.x, f = this.col2.x, g = this.col1.y, l = this.col2.y, w = e * l - f * g;
    w != 0 && (w = 1 / w);
    a.x = w * (l * b - f * d);
    a.y = w * (e * d - g * b);
    return a
  };
  a.prototype.Abs = function() {
    this.col1.Abs();
    this.col2.Abs()
  };
  e.b2Mat33 = function() {
    this.col1 = new l;
    this.col2 = new l;
    this.col3 = new l
  };
  e.prototype.b2Mat33 = function(a, b, d) {
    a === void 0 && (a = null);
    b === void 0 && (b = null);
    d === void 0 && (d = null);
    !a && !b && !d ? (this.col1.SetZero(), this.col2.SetZero(), this.col3.SetZero()) : (this.col1.SetV(a), this.col2.SetV(b), this.col3.SetV(d))
  };
  e.prototype.SetVVV = function(a, b, d) {
    this.col1.SetV(a);
    this.col2.SetV(b);
    this.col3.SetV(d)
  };
  e.prototype.Copy = function() {
    return new e(this.col1, this.col2, this.col3)
  };
  e.prototype.SetM = function(a) {
    this.col1.SetV(a.col1);
    this.col2.SetV(a.col2);
    this.col3.SetV(a.col3)
  };
  e.prototype.AddM = function(a) {
    this.col1.x += a.col1.x;
    this.col1.y += a.col1.y;
    this.col1.z += a.col1.z;
    this.col2.x += a.col2.x;
    this.col2.y += a.col2.y;
    this.col2.z += a.col2.z;
    this.col3.x += a.col3.x;
    this.col3.y += a.col3.y;
    this.col3.z += a.col3.z
  };
  e.prototype.SetIdentity = function() {
    this.col1.x = 1;
    this.col2.x = 0;
    this.col3.x = 0;
    this.col1.y = 0;
    this.col2.y = 1;
    this.col3.y = 0;
    this.col1.z = 0;
    this.col2.z = 0;
    this.col3.z = 1
  };
  e.prototype.SetZero = function() {
    this.col1.x = 0;
    this.col2.x = 0;
    this.col3.x = 0;
    this.col1.y = 0;
    this.col2.y = 0;
    this.col3.y = 0;
    this.col1.z = 0;
    this.col2.z = 0;
    this.col3.z = 0
  };
  e.prototype.Solve22 = function(a, b, d) {
    b === void 0 && (b = 0);
    d === void 0 && (d = 0);
    var e = this.col1.x, f = this.col2.x, g = this.col1.y, l = this.col2.y, w = e * l - f * g;
    w != 0 && (w = 1 / w);
    a.x = w * (l * b - f * d);
    a.y = w * (e * d - g * b);
    return a
  };
  e.prototype.Solve33 = function(a, b, d, e) {
    b === void 0 && (b = 0);
    d === void 0 && (d = 0);
    e === void 0 && (e = 0);
    var f = this.col1.x, g = this.col1.y, l = this.col1.z, w = this.col2.x, x = this.col2.y, t = this.col2.z, D = this.col3.x, u = this.col3.y, H = this.col3.z, B = f * (x * H - t * u) + g * (t * D - w * H) + l * (w * u - x * D);
    B != 0 && (B = 1 / B);
    a.x = B * (b * (x * H - t * u) + d * (t * D - w * H) + e * (w * u - x * D));
    a.y = B * (f * (d * H - e * u) + g * (e * D - b * H) + l * (b * u - d * D));
    a.z = B * (f * (x * e - t * d) + g * (t * b - w * e) + l * (w * d - x * b));
    return a
  };
  d.b2Math = function() {
  };
  d.IsValid = function(a) {
    a === void 0 && (a = 0);
    return isFinite(a)
  };
  d.Dot = function(a, b) {
    return a.x * b.x + a.y * b.y
  };
  d.CrossVV = function(a, b) {
    return a.x * b.y - a.y * b.x
  };
  d.CrossVF = function(a, b) {
    b === void 0 && (b = 0);
    return new f(b * a.y, -b * a.x)
  };
  d.CrossFV = function(a, b) {
    a === void 0 && (a = 0);
    return new f(-a * b.y, a * b.x)
  };
  d.MulMV = function(a, b) {
    return new f(a.col1.x * b.x + a.col2.x * b.y, a.col1.y * b.x + a.col2.y * b.y)
  };
  d.MulTMV = function(a, b) {
    return new f(d.Dot(b, a.col1), d.Dot(b, a.col2))
  };
  d.MulX = function(a, b) {
    var e = d.MulMV(a.R, b);
    e.x += a.position.x;
    e.y += a.position.y;
    return e
  };
  d.MulXT = function(a, b) {
    var e = d.SubtractVV(b, a.position), f = e.x * a.R.col1.x + e.y * a.R.col1.y;
    e.y = e.x * a.R.col2.x + e.y * a.R.col2.y;
    e.x = f;
    return e
  };
  d.AddVV = function(a, b) {
    return new f(a.x + b.x, a.y + b.y)
  };
  d.SubtractVV = function(a, b) {
    return new f(a.x - b.x, a.y - b.y)
  };
  d.Distance = function(a, b) {
    var d = a.x - b.x, e = a.y - b.y;
    return Math.sqrt(d * d + e * e)
  };
  d.DistanceSquared = function(a, b) {
    var d = a.x - b.x, e = a.y - b.y;
    return d * d + e * e
  };
  d.MulFV = function(a, b) {
    a === void 0 && (a = 0);
    return new f(a * b.x, a * b.y)
  };
  d.AddMM = function(b, e) {
    return a.FromVV(d.AddVV(b.col1, e.col1), d.AddVV(b.col2, e.col2))
  };
  d.MulMM = function(b, e) {
    return a.FromVV(d.MulMV(b, e.col1), d.MulMV(b, e.col2))
  };
  d.MulTMM = function(b, e) {
    var g = new f(d.Dot(b.col1, e.col1), d.Dot(b.col2, e.col1)), l = new f(d.Dot(b.col1, e.col2), d.Dot(b.col2, e.col2));
    return a.FromVV(g, l)
  };
  d.Abs = function(a) {
    a === void 0 && (a = 0);
    return a > 0 ? a : -a
  };
  d.AbsV = function(a) {
    return new f(d.Abs(a.x), d.Abs(a.y))
  };
  d.AbsM = function(b) {
    return a.FromVV(d.AbsV(b.col1), d.AbsV(b.col2))
  };
  d.Min = function(a, b) {
    a === void 0 && (a = 0);
    b === void 0 && (b = 0);
    return a < b ? a : b
  };
  d.MinV = function(a, b) {
    return new f(d.Min(a.x, b.x), d.Min(a.y, b.y))
  };
  d.Max = function(a, b) {
    a === void 0 && (a = 0);
    b === void 0 && (b = 0);
    return a > b ? a : b
  };
  d.MaxV = function(a, b) {
    return new f(d.Max(a.x, b.x), d.Max(a.y, b.y))
  };
  d.Clamp = function(a, b, d) {
    a === void 0 && (a = 0);
    b === void 0 && (b = 0);
    d === void 0 && (d = 0);
    return a < b ? b : a > d ? d : a
  };
  d.ClampV = function(a, b, e) {
    return d.MaxV(b, d.MinV(a, e))
  };
  d.Swap = function(a, b) {
    var d = a[0];
    a[0] = b[0];
    b[0] = d
  };
  d.Random = function() {
    return Math.random() * 2 - 1
  };
  d.RandomRange = function(a, b) {
    a === void 0 && (a = 0);
    b === void 0 && (b = 0);
    var d = Math.random();
    return(b - a) * d + a
  };
  d.NextPowerOfTwo = function(a) {
    a === void 0 && (a = 0);
    a |= a >> 1 & 2147483647;
    a |= a >> 2 & 1073741823;
    a |= a >> 4 & 268435455;
    a |= a >> 8 & 16777215;
    a |= a >> 16 & 65535;
    return a + 1
  };
  d.IsPowerOfTwo = function(a) {
    a === void 0 && (a = 0);
    return a > 0 && (a & a - 1) == 0
  };
  Box2D.postDefs.push(function() {
    Box2D.Common.Math.b2Math.b2Vec2_zero = new f(0, 0);
    Box2D.Common.Math.b2Math.b2Mat22_identity = a.FromVV(new f(1, 0), new f(0, 1));
    Box2D.Common.Math.b2Math.b2Transform_identity = new g(d.b2Vec2_zero, d.b2Mat22_identity)
  });
  b.b2Sweep = function() {
    this.localCenter = new f;
    this.c0 = new f;
    this.c = new f
  };
  b.prototype.Set = function(a) {
    this.localCenter.SetV(a.localCenter);
    this.c0.SetV(a.c0);
    this.c.SetV(a.c);
    this.a0 = a.a0;
    this.a = a.a;
    this.t0 = a.t0
  };
  b.prototype.Copy = function() {
    var a = new b;
    a.localCenter.SetV(this.localCenter);
    a.c0.SetV(this.c0);
    a.c.SetV(this.c);
    a.a0 = this.a0;
    a.a = this.a;
    a.t0 = this.t0;
    return a
  };
  b.prototype.GetTransform = function(a, b) {
    b === void 0 && (b = 0);
    a.position.x = (1 - b) * this.c0.x + b * this.c.x;
    a.position.y = (1 - b) * this.c0.y + b * this.c.y;
    a.R.Set((1 - b) * this.a0 + b * this.a);
    var d = a.R;
    a.position.x -= d.col1.x * this.localCenter.x + d.col2.x * this.localCenter.y;
    a.position.y -= d.col1.y * this.localCenter.x + d.col2.y * this.localCenter.y
  };
  b.prototype.Advance = function(a) {
    a === void 0 && (a = 0);
    if(this.t0 < a && 1 - this.t0 > Number.MIN_VALUE) {
      var b = (a - this.t0) / (1 - this.t0);
      this.c0.x = (1 - b) * this.c0.x + b * this.c.x;
      this.c0.y = (1 - b) * this.c0.y + b * this.c.y;
      this.a0 = (1 - b) * this.a0 + b * this.a;
      this.t0 = a
    }
  };
  g.b2Transform = function() {
    this.position = new f;
    this.R = new a
  };
  g.prototype.b2Transform = function(a, b) {
    a === void 0 && (a = null);
    b === void 0 && (b = null);
    a && (this.position.SetV(a), this.R.SetM(b))
  };
  g.prototype.Initialize = function(a, b) {
    this.position.SetV(a);
    this.R.SetM(b)
  };
  g.prototype.SetIdentity = function() {
    this.position.SetZero();
    this.R.SetIdentity()
  };
  g.prototype.Set = function(a) {
    this.position.SetV(a.position);
    this.R.SetM(a.R)
  };
  g.prototype.GetAngle = function() {
    return Math.atan2(this.R.col1.y, this.R.col1.x)
  };
  f.b2Vec2 = function() {
  };
  f.prototype.b2Vec2 = function(a, b) {
    a === void 0 && (a = 0);
    b === void 0 && (b = 0);
    this.x = a;
    this.y = b
  };
  f.prototype.SetZero = function() {
    this.y = this.x = 0
  };
  f.prototype.Set = function(a, b) {
    a === void 0 && (a = 0);
    b === void 0 && (b = 0);
    this.x = a;
    this.y = b
  };
  f.prototype.SetV = function(a) {
    this.x = a.x;
    this.y = a.y
  };
  f.prototype.GetNegative = function() {
    return new f(-this.x, -this.y)
  };
  f.prototype.NegativeSelf = function() {
    this.x = -this.x;
    this.y = -this.y
  };
  f.Make = function(a, b) {
    a === void 0 && (a = 0);
    b === void 0 && (b = 0);
    return new f(a, b)
  };
  f.prototype.Copy = function() {
    return new f(this.x, this.y)
  };
  f.prototype.Add = function(a) {
    this.x += a.x;
    this.y += a.y
  };
  f.prototype.Subtract = function(a) {
    this.x -= a.x;
    this.y -= a.y
  };
  f.prototype.Multiply = function(a) {
    a === void 0 && (a = 0);
    this.x *= a;
    this.y *= a
  };
  f.prototype.MulM = function(a) {
    var b = this.x;
    this.x = a.col1.x * b + a.col2.x * this.y;
    this.y = a.col1.y * b + a.col2.y * this.y
  };
  f.prototype.MulTM = function(a) {
    var b = d.Dot(this, a.col1);
    this.y = d.Dot(this, a.col2);
    this.x = b
  };
  f.prototype.CrossVF = function(a) {
    a === void 0 && (a = 0);
    var b = this.x;
    this.x = a * this.y;
    this.y = -a * b
  };
  f.prototype.CrossFV = function(a) {
    a === void 0 && (a = 0);
    var b = this.x;
    this.x = -a * this.y;
    this.y = a * b
  };
  f.prototype.MinV = function(a) {
    this.x = this.x < a.x ? this.x : a.x;
    this.y = this.y < a.y ? this.y : a.y
  };
  f.prototype.MaxV = function(a) {
    this.x = this.x > a.x ? this.x : a.x;
    this.y = this.y > a.y ? this.y : a.y
  };
  f.prototype.Abs = function() {
    if(this.x < 0) {
      this.x = -this.x
    }
    if(this.y < 0) {
      this.y = -this.y
    }
  };
  f.prototype.Length = function() {
    return Math.sqrt(this.x * this.x + this.y * this.y)
  };
  f.prototype.LengthSquared = function() {
    return this.x * this.x + this.y * this.y
  };
  f.prototype.Normalize = function() {
    var a = Math.sqrt(this.x * this.x + this.y * this.y);
    if(a < Number.MIN_VALUE) {
      return 0
    }
    var b = 1 / a;
    this.x *= b;
    this.y *= b;
    return a
  };
  f.prototype.IsValid = function() {
    return d.IsValid(this.x) && d.IsValid(this.y)
  };
  l.b2Vec3 = function() {
  };
  l.prototype.b2Vec3 = function(a, b, d) {
    a === void 0 && (a = 0);
    b === void 0 && (b = 0);
    d === void 0 && (d = 0);
    this.x = a;
    this.y = b;
    this.z = d
  };
  l.prototype.SetZero = function() {
    this.x = this.y = this.z = 0
  };
  l.prototype.Set = function(a, b, d) {
    a === void 0 && (a = 0);
    b === void 0 && (b = 0);
    d === void 0 && (d = 0);
    this.x = a;
    this.y = b;
    this.z = d
  };
  l.prototype.SetV = function(a) {
    this.x = a.x;
    this.y = a.y;
    this.z = a.z
  };
  l.prototype.GetNegative = function() {
    return new l(-this.x, -this.y, -this.z)
  };
  l.prototype.NegativeSelf = function() {
    this.x = -this.x;
    this.y = -this.y;
    this.z = -this.z
  };
  l.prototype.Copy = function() {
    return new l(this.x, this.y, this.z)
  };
  l.prototype.Add = function(a) {
    this.x += a.x;
    this.y += a.y;
    this.z += a.z
  };
  l.prototype.Subtract = function(a) {
    this.x -= a.x;
    this.y -= a.y;
    this.z -= a.z
  };
  l.prototype.Multiply = function(a) {
    a === void 0 && (a = 0);
    this.x *= a;
    this.y *= a;
    this.z *= a
  }
})();
(function() {
  var a = Box2D.Common.Math.b2Math, e = Box2D.Common.Math.b2Sweep, d = Box2D.Common.Math.b2Transform, b = Box2D.Common.Math.b2Vec2, g = Box2D.Common.b2Settings, f = Box2D.Collision.b2AABB, l = Box2D.Collision.b2ContactPoint, h = Box2D.Collision.b2DynamicTreeBroadPhase, n = Box2D.Collision.Shapes.b2MassData, j = Box2D.Dynamics.b2Body, r = Box2D.Dynamics.b2BodyDef, p = Box2D.Dynamics.b2ContactFilter, v = Box2D.Dynamics.b2ContactImpulse, o = Box2D.Dynamics.b2ContactListener, w = Box2D.Dynamics.b2ContactManager, 
  x = Box2D.Dynamics.b2DebugDraw, t = Box2D.Dynamics.b2DestructionListener, D = Box2D.Dynamics.b2FilterData, u = Box2D.Dynamics.b2Fixture, H = Box2D.Dynamics.b2FixtureDef, B = Box2D.Dynamics.b2Island, F = Box2D.Dynamics.b2TimeStep, G = Box2D.Dynamics.Contacts.b2Contact, K = Box2D.Dynamics.Contacts.b2ContactFactory;
  j.b2Body = function() {
    this.m_xf = new d;
    this.m_sweep = new e;
    this.m_linearVelocity = new b;
    this.m_force = new b
  };
  j.prototype.connectEdges = function(b, d, e) {
    e === void 0 && (e = 0);
    var f = Math.atan2(d.GetDirectionVector().y, d.GetDirectionVector().x), e = a.MulFV(Math.tan((f - e) * 0.5), d.GetDirectionVector()), e = a.SubtractVV(e, d.GetNormalVector()), e = a.MulFV(g.b2_toiSlop, e), e = a.AddVV(e, d.GetVertex1()), k = a.AddVV(b.GetDirectionVector(), d.GetDirectionVector());
    k.Normalize();
    var s = a.Dot(b.GetDirectionVector(), d.GetNormalVector()) > 0;
    b.SetNextEdge(d, e, k, s);
    d.SetPrevEdge(b, e, k, s);
    return f
  };
  j.prototype.CreateFixture = function(a) {
    if(this.m_world.IsLocked() == !0) {
      return null
    }
    var b = new u;
    b.Create(this, this.m_xf, a);
    this.m_flags & j.e_activeFlag && b.CreateProxy(this.m_world.m_contactManager.m_broadPhase, this.m_xf);
    b.m_next = this.m_fixtureList;
    this.m_fixtureList = b;
    ++this.m_fixtureCount;
    b.m_body = this;
    b.m_density > 0 && this.ResetMassData();
    this.m_world.m_newFixture = !0;
    return b
  };
  j.prototype.CreateFixture2 = function(a, b) {
    b === void 0 && (b = 0);
    var d = new H;
    d.shape = a;
    d.density = b;
    return this.CreateFixture(d)
  };
  j.prototype.DestroyFixture = function(a) {
    if(this.m_world.IsLocked() != !0) {
      for(var b = this.m_fixtureList, d = null;b != null;) {
        if(b == a) {
          d ? d.m_next = a.m_next : this.m_fixtureList = a.m_next;
          break
        }
        d = b;
        b = b.m_next
      }
      for(b = this.m_contactList;b;) {
        var d = b.contact, b = b.next, e = d.GetFixtureA(), k = d.GetFixtureB();
        (a == e || a == k) && this.m_world.m_contactManager.Destroy(d)
      }
      this.m_flags & j.e_activeFlag && a.DestroyProxy(this.m_world.m_contactManager.m_broadPhase);
      a.Destroy();
      a.m_body = null;
      a.m_next = null;
      --this.m_fixtureCount;
      this.ResetMassData()
    }
  };
  j.prototype.SetPositionAndAngle = function(a, b) {
    b === void 0 && (b = 0);
    var d;
    if(this.m_world.IsLocked() != !0) {
      this.m_xf.R.Set(b);
      this.m_xf.position.SetV(a);
      d = this.m_xf.R;
      var e = this.m_sweep.localCenter;
      this.m_sweep.c.x = d.col1.x * e.x + d.col2.x * e.y;
      this.m_sweep.c.y = d.col1.y * e.x + d.col2.y * e.y;
      this.m_sweep.c.x += this.m_xf.position.x;
      this.m_sweep.c.y += this.m_xf.position.y;
      this.m_sweep.c0.SetV(this.m_sweep.c);
      this.m_sweep.a0 = this.m_sweep.a = b;
      e = this.m_world.m_contactManager.m_broadPhase;
      for(d = this.m_fixtureList;d;d = d.m_next) {
        d.Synchronize(e, this.m_xf, this.m_xf)
      }
      this.m_world.m_contactManager.FindNewContacts()
    }
  };
  j.prototype.SetTransform = function(a) {
    this.SetPositionAndAngle(a.position, a.GetAngle())
  };
  j.prototype.GetTransform = function() {
    return this.m_xf
  };
  j.prototype.GetPosition = function() {
    return this.m_xf.position
  };
  j.prototype.SetPosition = function(a) {
    this.SetPositionAndAngle(a, this.GetAngle())
  };
  j.prototype.GetAngle = function() {
    return this.m_sweep.a
  };
  j.prototype.SetAngle = function(a) {
    a === void 0 && (a = 0);
    this.SetPositionAndAngle(this.GetPosition(), a)
  };
  j.prototype.GetWorldCenter = function() {
    return this.m_sweep.c
  };
  j.prototype.GetLocalCenter = function() {
    return this.m_sweep.localCenter
  };
  j.prototype.SetLinearVelocity = function(a) {
    this.m_type != j.b2_staticBody && this.m_linearVelocity.SetV(a)
  };
  j.prototype.GetLinearVelocity = function() {
    return this.m_linearVelocity
  };
  j.prototype.SetAngularVelocity = function(a) {
    a === void 0 && (a = 0);
    if(this.m_type != j.b2_staticBody) {
      this.m_angularVelocity = a
    }
  };
  j.prototype.GetAngularVelocity = function() {
    return this.m_angularVelocity
  };
  j.prototype.GetDefinition = function() {
    var a = new r;
    a.type = this.GetType();
    a.allowSleep = (this.m_flags & j.e_allowSleepFlag) == j.e_allowSleepFlag;
    a.angle = this.GetAngle();
    a.angularDamping = this.m_angularDamping;
    a.angularVelocity = this.m_angularVelocity;
    a.fixedRotation = (this.m_flags & j.e_fixedRotationFlag) == j.e_fixedRotationFlag;
    a.bullet = (this.m_flags & j.e_bulletFlag) == j.e_bulletFlag;
    a.awake = (this.m_flags & j.e_awakeFlag) == j.e_awakeFlag;
    a.linearDamping = this.m_linearDamping;
    a.linearVelocity.SetV(this.GetLinearVelocity());
    a.position = this.GetPosition();
    a.userData = this.GetUserData();
    return a
  };
  j.prototype.ApplyForce = function(a, b) {
    this.m_type == j.b2_dynamicBody && (this.IsAwake() == !1 && this.SetAwake(!0), this.m_force.x += a.x, this.m_force.y += a.y, this.m_torque += (b.x - this.m_sweep.c.x) * a.y - (b.y - this.m_sweep.c.y) * a.x)
  };
  j.prototype.ApplyTorque = function(a) {
    a === void 0 && (a = 0);
    this.m_type == j.b2_dynamicBody && (this.IsAwake() == !1 && this.SetAwake(!0), this.m_torque += a)
  };
  j.prototype.ApplyImpulse = function(a, b) {
    this.m_type == j.b2_dynamicBody && (this.IsAwake() == !1 && this.SetAwake(!0), this.m_linearVelocity.x += this.m_invMass * a.x, this.m_linearVelocity.y += this.m_invMass * a.y, this.m_angularVelocity += this.m_invI * ((b.x - this.m_sweep.c.x) * a.y - (b.y - this.m_sweep.c.y) * a.x))
  };
  j.prototype.Split = function(b) {
    for(var d = this.GetLinearVelocity().Copy(), e = this.GetAngularVelocity(), f = this.GetWorldCenter(), k = this.m_world.CreateBody(this.GetDefinition()), s, q = this.m_fixtureList;q;) {
      if(b(q)) {
        var E = q.m_next;
        s ? s.m_next = E : this.m_fixtureList = E;
        this.m_fixtureCount--;
        q.m_next = k.m_fixtureList;
        k.m_fixtureList = q;
        k.m_fixtureCount++;
        q.m_body = k;
        q = E
      }else {
        s = q, q = q.m_next
      }
    }
    this.ResetMassData();
    k.ResetMassData();
    s = this.GetWorldCenter();
    b = k.GetWorldCenter();
    s = a.AddVV(d, a.CrossFV(e, a.SubtractVV(s, f)));
    d = a.AddVV(d, a.CrossFV(e, a.SubtractVV(b, f)));
    this.SetLinearVelocity(s);
    k.SetLinearVelocity(d);
    this.SetAngularVelocity(e);
    k.SetAngularVelocity(e);
    this.SynchronizeFixtures();
    k.SynchronizeFixtures();
    return k
  };
  j.prototype.Merge = function(a) {
    var b;
    for(b = a.m_fixtureList;b;) {
      var d = b.m_next;
      a.m_fixtureCount--;
      b.m_next = this.m_fixtureList;
      this.m_fixtureList = b;
      this.m_fixtureCount++;
      b.m_body = k;
      b = d
    }
    e.m_fixtureCount = 0;
    var e = this, k = a;
    e.GetWorldCenter();
    k.GetWorldCenter();
    e.GetLinearVelocity().Copy();
    k.GetLinearVelocity().Copy();
    e.GetAngularVelocity();
    k.GetAngularVelocity();
    e.ResetMassData();
    this.SynchronizeFixtures()
  };
  j.prototype.GetMass = function() {
    return this.m_mass
  };
  j.prototype.GetInertia = function() {
    return this.m_I
  };
  j.prototype.GetMassData = function(a) {
    a.mass = this.m_mass;
    a.I = this.m_I;
    a.center.SetV(this.m_sweep.localCenter)
  };
  j.prototype.SetMassData = function(b) {
    g.b2Assert(this.m_world.IsLocked() == !1);
    if(this.m_world.IsLocked() != !0 && this.m_type == j.b2_dynamicBody) {
      this.m_invI = this.m_I = this.m_invMass = 0;
      this.m_mass = b.mass;
      if(this.m_mass <= 0) {
        this.m_mass = 1
      }
      this.m_invMass = 1 / this.m_mass;
      if(b.I > 0 && (this.m_flags & j.e_fixedRotationFlag) == 0) {
        this.m_I = b.I - this.m_mass * (b.center.x * b.center.x + b.center.y * b.center.y), this.m_invI = 1 / this.m_I
      }
      var d = this.m_sweep.c.Copy();
      this.m_sweep.localCenter.SetV(b.center);
      this.m_sweep.c0.SetV(a.MulX(this.m_xf, this.m_sweep.localCenter));
      this.m_sweep.c.SetV(this.m_sweep.c0);
      this.m_linearVelocity.x += this.m_angularVelocity * -(this.m_sweep.c.y - d.y);
      this.m_linearVelocity.y += this.m_angularVelocity * +(this.m_sweep.c.x - d.x)
    }
  };
  j.prototype.ResetMassData = function() {
    this.m_invI = this.m_I = this.m_invMass = this.m_mass = 0;
    this.m_sweep.localCenter.SetZero();
    if(!(this.m_type == j.b2_staticBody || this.m_type == j.b2_kinematicBody)) {
      for(var d = b.Make(0, 0), e = this.m_fixtureList;e;e = e.m_next) {
        if(e.m_density != 0) {
          var f = e.GetMassData();
          this.m_mass += f.mass;
          d.x += f.center.x * f.mass;
          d.y += f.center.y * f.mass;
          this.m_I += f.I
        }
      }
      this.m_mass > 0 ? (this.m_invMass = 1 / this.m_mass, d.x *= this.m_invMass, d.y *= this.m_invMass) : this.m_invMass = this.m_mass = 1;
      this.m_I > 0 && (this.m_flags & j.e_fixedRotationFlag) == 0 ? (this.m_I -= this.m_mass * (d.x * d.x + d.y * d.y), this.m_I *= this.m_inertiaScale, g.b2Assert(this.m_I > 0), this.m_invI = 1 / this.m_I) : this.m_invI = this.m_I = 0;
      e = this.m_sweep.c.Copy();
      this.m_sweep.localCenter.SetV(d);
      this.m_sweep.c0.SetV(a.MulX(this.m_xf, this.m_sweep.localCenter));
      this.m_sweep.c.SetV(this.m_sweep.c0);
      this.m_linearVelocity.x += this.m_angularVelocity * -(this.m_sweep.c.y - e.y);
      this.m_linearVelocity.y += this.m_angularVelocity * +(this.m_sweep.c.x - e.x)
    }
  };
  j.prototype.GetWorldPoint = function(a) {
    var d = this.m_xf.R, a = new b(d.col1.x * a.x + d.col2.x * a.y, d.col1.y * a.x + d.col2.y * a.y);
    a.x += this.m_xf.position.x;
    a.y += this.m_xf.position.y;
    return a
  };
  j.prototype.GetWorldVector = function(b) {
    return a.MulMV(this.m_xf.R, b)
  };
  j.prototype.GetLocalPoint = function(b) {
    return a.MulXT(this.m_xf, b)
  };
  j.prototype.GetLocalVector = function(b) {
    return a.MulTMV(this.m_xf.R, b)
  };
  j.prototype.GetLinearVelocityFromWorldPoint = function(a) {
    return new b(this.m_linearVelocity.x - this.m_angularVelocity * (a.y - this.m_sweep.c.y), this.m_linearVelocity.y + this.m_angularVelocity * (a.x - this.m_sweep.c.x))
  };
  j.prototype.GetLinearVelocityFromLocalPoint = function(a) {
    var d = this.m_xf.R, a = new b(d.col1.x * a.x + d.col2.x * a.y, d.col1.y * a.x + d.col2.y * a.y);
    a.x += this.m_xf.position.x;
    a.y += this.m_xf.position.y;
    return new b(this.m_linearVelocity.x - this.m_angularVelocity * (a.y - this.m_sweep.c.y), this.m_linearVelocity.y + this.m_angularVelocity * (a.x - this.m_sweep.c.x))
  };
  j.prototype.GetLinearDamping = function() {
    return this.m_linearDamping
  };
  j.prototype.SetLinearDamping = function(a) {
    a === void 0 && (a = 0);
    this.m_linearDamping = a
  };
  j.prototype.GetAngularDamping = function() {
    return this.m_angularDamping
  };
  j.prototype.SetAngularDamping = function(a) {
    a === void 0 && (a = 0);
    this.m_angularDamping = a
  };
  j.prototype.SetType = function(a) {
    a === void 0 && (a = 0);
    if(this.m_type != a) {
      this.m_type = a;
      this.ResetMassData();
      if(this.m_type == j.b2_staticBody) {
        this.m_linearVelocity.SetZero(), this.m_angularVelocity = 0
      }
      this.SetAwake(!0);
      this.m_force.SetZero();
      this.m_torque = 0;
      for(a = this.m_contactList;a;a = a.next) {
        a.contact.FlagForFiltering()
      }
    }
  };
  j.prototype.GetType = function() {
    return this.m_type
  };
  j.prototype.SetBullet = function(a) {
    a ? this.m_flags |= j.e_bulletFlag : this.m_flags &= ~j.e_bulletFlag
  };
  j.prototype.IsBullet = function() {
    return(this.m_flags & j.e_bulletFlag) == j.e_bulletFlag
  };
  j.prototype.SetSleepingAllowed = function(a) {
    a ? this.m_flags |= j.e_allowSleepFlag : (this.m_flags &= ~j.e_allowSleepFlag, this.SetAwake(!0))
  };
  j.prototype.SetAwake = function(a) {
    a ? (this.m_flags |= j.e_awakeFlag, this.m_sleepTime = 0) : (this.m_flags &= ~j.e_awakeFlag, this.m_sleepTime = 0, this.m_linearVelocity.SetZero(), this.m_angularVelocity = 0, this.m_force.SetZero(), this.m_torque = 0)
  };
  j.prototype.IsAwake = function() {
    return(this.m_flags & j.e_awakeFlag) == j.e_awakeFlag
  };
  j.prototype.SetFixedRotation = function(a) {
    a ? this.m_flags |= j.e_fixedRotationFlag : this.m_flags &= ~j.e_fixedRotationFlag;
    this.ResetMassData()
  };
  j.prototype.IsFixedRotation = function() {
    return(this.m_flags & j.e_fixedRotationFlag) == j.e_fixedRotationFlag
  };
  j.prototype.SetActive = function(a) {
    if(a != this.IsActive()) {
      var b;
      if(a) {
        this.m_flags |= j.e_activeFlag;
        a = this.m_world.m_contactManager.m_broadPhase;
        for(b = this.m_fixtureList;b;b = b.m_next) {
          b.CreateProxy(a, this.m_xf)
        }
      }else {
        this.m_flags &= ~j.e_activeFlag;
        a = this.m_world.m_contactManager.m_broadPhase;
        for(b = this.m_fixtureList;b;b = b.m_next) {
          b.DestroyProxy(a)
        }
        for(a = this.m_contactList;a;) {
          b = a, a = a.next, this.m_world.m_contactManager.Destroy(b.contact)
        }
        this.m_contactList = null
      }
    }
  };
  j.prototype.IsActive = function() {
    return(this.m_flags & j.e_activeFlag) == j.e_activeFlag
  };
  j.prototype.IsSleepingAllowed = function() {
    return(this.m_flags & j.e_allowSleepFlag) == j.e_allowSleepFlag
  };
  j.prototype.GetFixtureList = function() {
    return this.m_fixtureList
  };
  j.prototype.GetJointList = function() {
    return this.m_jointList
  };
  j.prototype.GetControllerList = function() {
    return this.m_controllerList
  };
  j.prototype.GetContactList = function() {
    return this.m_contactList
  };
  j.prototype.GetNext = function() {
    return this.m_next
  };
  j.prototype.GetUserData = function() {
    return this.m_userData
  };
  j.prototype.SetUserData = function(a) {
    this.m_userData = a
  };
  j.prototype.GetWorld = function() {
    return this.m_world
  };
  j.prototype.b2Body = function(a, b) {
    this.m_flags = 0;
    a.bullet && (this.m_flags |= j.e_bulletFlag);
    a.fixedRotation && (this.m_flags |= j.e_fixedRotationFlag);
    a.allowSleep && (this.m_flags |= j.e_allowSleepFlag);
    a.awake && (this.m_flags |= j.e_awakeFlag);
    a.active && (this.m_flags |= j.e_activeFlag);
    this.m_world = b;
    this.m_xf.position.SetV(a.position);
    this.m_xf.R.Set(a.angle);
    this.m_sweep.localCenter.SetZero();
    this.m_sweep.t0 = 1;
    this.m_sweep.a0 = this.m_sweep.a = a.angle;
    var d = this.m_xf.R, e = this.m_sweep.localCenter;
    this.m_sweep.c.x = d.col1.x * e.x + d.col2.x * e.y;
    this.m_sweep.c.y = d.col1.y * e.x + d.col2.y * e.y;
    this.m_sweep.c.x += this.m_xf.position.x;
    this.m_sweep.c.y += this.m_xf.position.y;
    this.m_sweep.c0.SetV(this.m_sweep.c);
    this.m_contactList = this.m_controllerList = this.m_jointList = null;
    this.m_controllerCount = 0;
    this.m_next = this.m_prev = null;
    this.m_linearVelocity.SetV(a.linearVelocity);
    this.m_angularVelocity = a.angularVelocity;
    this.m_linearDamping = a.linearDamping;
    this.m_angularDamping = a.angularDamping;
    this.m_force.Set(0, 0);
    this.m_sleepTime = this.m_torque = 0;
    this.m_type = a.type;
    this.m_invMass = this.m_type == j.b2_dynamicBody ? this.m_mass = 1 : this.m_mass = 0;
    this.m_invI = this.m_I = 0;
    this.m_inertiaScale = a.inertiaScale;
    this.m_userData = a.userData;
    this.m_fixtureList = null;
    this.m_fixtureCount = 0
  };
  j.prototype.SynchronizeFixtures = function() {
    var a = j.s_xf1;
    a.R.Set(this.m_sweep.a0);
    var b = a.R, d = this.m_sweep.localCenter;
    a.position.x = this.m_sweep.c0.x - (b.col1.x * d.x + b.col2.x * d.y);
    a.position.y = this.m_sweep.c0.y - (b.col1.y * d.x + b.col2.y * d.y);
    d = this.m_world.m_contactManager.m_broadPhase;
    for(b = this.m_fixtureList;b;b = b.m_next) {
      b.Synchronize(d, a, this.m_xf)
    }
  };
  j.prototype.SynchronizeTransform = function() {
    this.m_xf.R.Set(this.m_sweep.a);
    var a = this.m_xf.R, b = this.m_sweep.localCenter;
    this.m_xf.position.x = this.m_sweep.c.x - (a.col1.x * b.x + a.col2.x * b.y);
    this.m_xf.position.y = this.m_sweep.c.y - (a.col1.y * b.x + a.col2.y * b.y)
  };
  j.prototype.ShouldCollide = function(a) {
    if(this.m_type != j.b2_dynamicBody && a.m_type != j.b2_dynamicBody) {
      return!1
    }
    for(var b = this.m_jointList;b;b = b.next) {
      if(b.other == a && b.joint.m_collideConnected == !1) {
        return!1
      }
    }
    return!0
  };
  j.prototype.Advance = function(a) {
    a === void 0 && (a = 0);
    this.m_sweep.Advance(a);
    this.m_sweep.c.SetV(this.m_sweep.c0);
    this.m_sweep.a = this.m_sweep.a0;
    this.SynchronizeTransform()
  };
  Box2D.postDefs.push(function() {
    Box2D.Dynamics.b2Body.s_xf1 = new d;
    Box2D.Dynamics.b2Body.e_islandFlag = 1;
    Box2D.Dynamics.b2Body.e_awakeFlag = 2;
    Box2D.Dynamics.b2Body.e_allowSleepFlag = 4;
    Box2D.Dynamics.b2Body.e_bulletFlag = 8;
    Box2D.Dynamics.b2Body.e_fixedRotationFlag = 16;
    Box2D.Dynamics.b2Body.e_activeFlag = 32;
    Box2D.Dynamics.b2Body.b2_staticBody = 0;
    Box2D.Dynamics.b2Body.b2_kinematicBody = 1;
    Box2D.Dynamics.b2Body.b2_dynamicBody = 2
  });
  r.b2BodyDef = function() {
    this.position = new b;
    this.linearVelocity = new b
  };
  r.prototype.b2BodyDef = function() {
    this.userData = null;
    this.position.Set(0, 0);
    this.angle = 0;
    this.linearVelocity.Set(0, 0);
    this.angularDamping = this.linearDamping = this.angularVelocity = 0;
    this.awake = this.allowSleep = !0;
    this.bullet = this.fixedRotation = !1;
    this.type = j.b2_staticBody;
    this.active = !0;
    this.inertiaScale = 1
  };
  p.b2ContactFilter = function() {
  };
  p.prototype.ShouldCollide = function(a, b) {
    var d = a.GetFilterData(), e = b.GetFilterData();
    return d.groupIndex == e.groupIndex && d.groupIndex != 0 ? d.groupIndex > 0 : (d.maskBits & e.categoryBits) != 0 && (d.categoryBits & e.maskBits) != 0
  };
  p.prototype.RayCollide = function(a, b) {
    return!a ? !0 : this.ShouldCollide(a instanceof u ? a : null, b)
  };
  Box2D.postDefs.push(function() {
    Box2D.Dynamics.b2ContactFilter.b2_defaultFilter = new p
  });
  v.b2ContactImpulse = function() {
    this.normalImpulses = new Box2D.NVector(g.b2_maxManifoldPoints);
    this.tangentImpulses = new Box2D.NVector(g.b2_maxManifoldPoints)
  };
  o.b2ContactListener = function() {
  };
  o.prototype.BeginContact = function() {
  };
  o.prototype.EndContact = function() {
  };
  o.prototype.PreSolve = function() {
  };
  o.prototype.PostSolve = function() {
  };
  Box2D.postDefs.push(function() {
    Box2D.Dynamics.b2ContactListener.b2_defaultListener = new o
  });
  w.b2ContactManager = function() {
  };
  w.prototype.b2ContactManager = function() {
    this.m_world = null;
    this.m_contactCount = 0;
    this.m_contactFilter = p.b2_defaultFilter;
    this.m_contactListener = o.b2_defaultListener;
    this.m_contactFactory = new K(this.m_allocator);
    this.m_broadPhase = new h
  };
  w.prototype.AddPair = function(a, b) {
    var d = a instanceof u ? a : null, e = b instanceof u ? b : null, k = d.GetBody(), f = e.GetBody();
    if(k != f) {
      for(var q = f.GetContactList();q;) {
        if(q.other == k) {
          var E = q.contact.GetFixtureA(), g = q.contact.GetFixtureB();
          if(E == d && g == e) {
            return
          }
          if(E == e && g == d) {
            return
          }
        }
        q = q.next
      }
      if(f.ShouldCollide(k) != !1 && this.m_contactFilter.ShouldCollide(d, e) != !1) {
        q = this.m_contactFactory.Create(d, e);
        d = q.GetFixtureA();
        e = q.GetFixtureB();
        k = d.m_body;
        f = e.m_body;
        q.m_prev = null;
        q.m_next = this.m_world.m_contactList;
        if(this.m_world.m_contactList != null) {
          this.m_world.m_contactList.m_prev = q
        }
        this.m_world.m_contactList = q;
        q.m_nodeA.contact = q;
        q.m_nodeA.other = f;
        q.m_nodeA.prev = null;
        q.m_nodeA.next = k.m_contactList;
        if(k.m_contactList != null) {
          k.m_contactList.prev = q.m_nodeA
        }
        k.m_contactList = q.m_nodeA;
        q.m_nodeB.contact = q;
        q.m_nodeB.other = k;
        q.m_nodeB.prev = null;
        q.m_nodeB.next = f.m_contactList;
        if(f.m_contactList != null) {
          f.m_contactList.prev = q.m_nodeB
        }
        f.m_contactList = q.m_nodeB;
        ++this.m_world.m_contactCount
      }
    }
  };
  w.prototype.FindNewContacts = function() {
    this.m_broadPhase.UpdatePairs(Box2D.generateCallback(this, this.AddPair))
  };
  w.prototype.Destroy = function(a) {
    var b = a.GetFixtureA(), d = a.GetFixtureB(), b = b.GetBody(), d = d.GetBody();
    a.IsTouching() && this.m_contactListener.EndContact(a);
    if(a.m_prev) {
      a.m_prev.m_next = a.m_next
    }
    if(a.m_next) {
      a.m_next.m_prev = a.m_prev
    }
    if(a == this.m_world.m_contactList) {
      this.m_world.m_contactList = a.m_next
    }
    if(a.m_nodeA.prev) {
      a.m_nodeA.prev.next = a.m_nodeA.next
    }
    if(a.m_nodeA.next) {
      a.m_nodeA.next.prev = a.m_nodeA.prev
    }
    if(a.m_nodeA == b.m_contactList) {
      b.m_contactList = a.m_nodeA.next
    }
    if(a.m_nodeB.prev) {
      a.m_nodeB.prev.next = a.m_nodeB.next
    }
    if(a.m_nodeB.next) {
      a.m_nodeB.next.prev = a.m_nodeB.prev
    }
    if(a.m_nodeB == d.m_contactList) {
      d.m_contactList = a.m_nodeB.next
    }
    this.m_contactFactory.Destroy(a);
    --this.m_contactCount
  };
  w.prototype.Collide = function() {
    for(var a = this.m_world.m_contactList;a;) {
      var b = a.GetFixtureA(), d = a.GetFixtureB(), e = b.GetBody(), k = d.GetBody();
      if(e.IsAwake() == !1 && k.IsAwake() == !1) {
        a = a.GetNext()
      }else {
        if(a.m_flags & G.e_filterFlag) {
          if(k.ShouldCollide(e) == !1) {
            b = a;
            a = b.GetNext();
            this.Destroy(b);
            continue
          }
          if(this.m_contactFilter.ShouldCollide(b, d) == !1) {
            b = a;
            a = b.GetNext();
            this.Destroy(b);
            continue
          }
          a.m_flags &= ~G.e_filterFlag
        }
        this.m_broadPhase.TestOverlap(b.m_proxy, d.m_proxy) == !1 ? (b = a, a = b.GetNext(), this.Destroy(b)) : (a.Update(this.m_contactListener), a = a.GetNext())
      }
    }
  };
  Box2D.postDefs.push(function() {
    Box2D.Dynamics.b2ContactManager.s_evalCP = new l
  });
  x.b2DebugDraw = function() {
  };
  x.prototype.b2DebugDraw = function() {
  };
  x.prototype.SetFlags = function() {
  };
  x.prototype.GetFlags = function() {
  };
  x.prototype.AppendFlags = function() {
  };
  x.prototype.ClearFlags = function() {
  };
  x.prototype.SetSprite = function() {
  };
  x.prototype.GetSprite = function() {
  };
  x.prototype.SetDrawScale = function() {
  };
  x.prototype.GetDrawScale = function() {
  };
  x.prototype.SetLineThickness = function() {
  };
  x.prototype.GetLineThickness = function() {
  };
  x.prototype.SetAlpha = function() {
  };
  x.prototype.GetAlpha = function() {
  };
  x.prototype.SetFillAlpha = function() {
  };
  x.prototype.GetFillAlpha = function() {
  };
  x.prototype.SetXFormScale = function() {
  };
  x.prototype.GetXFormScale = function() {
  };
  x.prototype.DrawPolygon = function() {
  };
  x.prototype.DrawSolidPolygon = function() {
  };
  x.prototype.DrawCircle = function() {
  };
  x.prototype.DrawSolidCircle = function() {
  };
  x.prototype.DrawSegment = function() {
  };
  x.prototype.DrawTransform = function() {
  };
  Box2D.postDefs.push(function() {
    Box2D.Dynamics.b2DebugDraw.e_shapeBit = 1;
    Box2D.Dynamics.b2DebugDraw.e_jointBit = 2;
    Box2D.Dynamics.b2DebugDraw.e_aabbBit = 4;
    Box2D.Dynamics.b2DebugDraw.e_pairBit = 8;
    Box2D.Dynamics.b2DebugDraw.e_centerOfMassBit = 16;
    Box2D.Dynamics.b2DebugDraw.e_controllerBit = 32
  });
  t.b2DestructionListener = function() {
  };
  t.prototype.SayGoodbyeJoint = function() {
  };
  t.prototype.SayGoodbyeFixture = function() {
  };
  D.b2FilterData = function() {
    this.categoryBits = 1;
    this.maskBits = 65535;
    this.groupIndex = 0
  };
  D.prototype.Copy = function() {
    var a = new D;
    a.categoryBits = this.categoryBits;
    a.maskBits = this.maskBits;
    a.groupIndex = this.groupIndex;
    return a
  };
  u.b2Fixture = function() {
    this.m_filter = new D
  };
  u.prototype.GetType = function() {
    return this.m_shape.GetType()
  };
  u.prototype.GetShape = function() {
    return this.m_shape
  };
  u.prototype.SetSensor = function(a) {
    if(this.m_isSensor != a && (this.m_isSensor = a, this.m_body != null)) {
      for(a = this.m_body.GetContactList();a;) {
        var b = a.contact, d = b.GetFixtureA(), e = b.GetFixtureB();
        if(d == this || e == this) {
          b.SetSensor(d.IsSensor() || e.IsSensor())
        }
        a = a.next
      }
    }
  };
  u.prototype.IsSensor = function() {
    return this.m_isSensor
  };
  u.prototype.SetFilterData = function(a) {
    this.m_filter = a.Copy();
    if(!this.m_body) {
      for(a = this.m_body.GetContactList();a;) {
        var b = a.contact, d = b.GetFixtureA(), e = b.GetFixtureB();
        (d == this || e == this) && b.FlagForFiltering();
        a = a.next
      }
    }
  };
  u.prototype.GetFilterData = function() {
    return this.m_filter.Copy()
  };
  u.prototype.GetBody = function() {
    return this.m_body
  };
  u.prototype.GetNext = function() {
    return this.m_next
  };
  u.prototype.GetUserData = function() {
    return this.m_userData
  };
  u.prototype.SetUserData = function(a) {
    this.m_userData = a
  };
  u.prototype.TestPoint = function(a) {
    return this.m_shape.TestPoint(this.m_body.GetTransform(), a)
  };
  u.prototype.RayCast = function(a, b) {
    return this.m_shape.RayCast(a, b, this.m_body.GetTransform())
  };
  u.prototype.GetMassData = function(a) {
    a === void 0 && (a = null);
    a == null && (a = new n);
    this.m_shape.ComputeMass(a, this.m_density);
    return a
  };
  u.prototype.SetDensity = function(a) {
    a === void 0 && (a = 0);
    this.m_density = a
  };
  u.prototype.GetDensity = function() {
    return this.m_density
  };
  u.prototype.GetFriction = function() {
    return this.m_friction
  };
  u.prototype.SetFriction = function(a) {
    a === void 0 && (a = 0);
    this.m_friction = a
  };
  u.prototype.GetRestitution = function() {
    return this.m_restitution
  };
  u.prototype.SetRestitution = function(a) {
    a === void 0 && (a = 0);
    this.m_restitution = a
  };
  u.prototype.GetAABB = function() {
    return this.m_aabb
  };
  u.prototype.b2Fixture = function() {
    this.m_aabb = new f;
    this.m_shape = this.m_next = this.m_body = this.m_userData = null;
    this.m_restitution = this.m_friction = this.m_density = 0
  };
  u.prototype.Create = function(a, b, d) {
    this.m_userData = d.userData;
    this.m_friction = d.friction;
    this.m_restitution = d.restitution;
    this.m_body = a;
    this.m_next = null;
    this.m_filter = d.filter.Copy();
    this.m_isSensor = d.isSensor;
    this.m_shape = d.shape.Copy();
    this.m_density = d.density
  };
  u.prototype.Destroy = function() {
    this.m_shape = null
  };
  u.prototype.CreateProxy = function(a, b) {
    this.m_shape.ComputeAABB(this.m_aabb, b);
    this.m_proxy = a.CreateProxy(this.m_aabb, this)
  };
  u.prototype.DestroyProxy = function(a) {
    if(this.m_proxy != null) {
      a.DestroyProxy(this.m_proxy), this.m_proxy = null
    }
  };
  u.prototype.Synchronize = function(b, d, e) {
    if(this.m_proxy) {
      var g = new f, k = new f;
      this.m_shape.ComputeAABB(g, d);
      this.m_shape.ComputeAABB(k, e);
      this.m_aabb.Combine(g, k);
      d = a.SubtractVV(e.position, d.position);
      b.MoveProxy(this.m_proxy, this.m_aabb, d)
    }
  };
  H.b2FixtureDef = function() {
    this.filter = new D
  };
  H.prototype.b2FixtureDef = function() {
    this.userData = this.shape = null;
    this.friction = 0.2;
    this.density = this.restitution = 0;
    this.filter.categoryBits = 1;
    this.filter.maskBits = 65535;
    this.filter.groupIndex = 0;
    this.isSensor = !1
  };
  B.b2Island = function() {
  };
  B.prototype.b2Island = function() {
    this.m_bodies = [];
    this.m_contacts = [];
    this.m_joints = []
  };
  B.prototype.Initialize = function(a, b, d, e, k, f) {
    a === void 0 && (a = 0);
    b === void 0 && (b = 0);
    d === void 0 && (d = 0);
    var q = 0;
    this.m_bodyCapacity = a;
    this.m_contactCapacity = b;
    this.m_jointCapacity = d;
    this.m_jointCount = this.m_contactCount = this.m_bodyCount = 0;
    this.m_allocator = e;
    this.m_listener = k;
    this.m_contactSolver = f;
    for(q = this.m_bodies.length;q < a;q++) {
      this.m_bodies[q] = null
    }
    for(q = this.m_contacts.length;q < b;q++) {
      this.m_contacts[q] = null
    }
    for(q = this.m_joints.length;q < d;q++) {
      this.m_joints[q] = null
    }
  };
  B.prototype.Clear = function() {
    this.m_jointCount = this.m_contactCount = this.m_bodyCount = 0
  };
  B.prototype.Solve = function(b, d, e) {
    for(var f = 0, k = 0, s, f = 0;f < this.m_bodyCount;++f) {
      k = this.m_bodies[f], k.GetType() == j.b2_dynamicBody && (k.m_linearVelocity.x += b.dt * (d.x + k.m_invMass * k.m_force.x), k.m_linearVelocity.y += b.dt * (d.y + k.m_invMass * k.m_force.y), k.m_angularVelocity += b.dt * k.m_invI * k.m_torque, k.m_linearVelocity.Multiply(a.Clamp(1 - b.dt * k.m_linearDamping, 0, 1)), k.m_angularVelocity *= a.Clamp(1 - b.dt * k.m_angularDamping, 0, 1))
    }
    this.m_contactSolver.Initialize(b, this.m_contacts, this.m_contactCount, this.m_allocator);
    d = this.m_contactSolver;
    d.InitVelocityConstraints(b);
    for(f = 0;f < this.m_jointCount;++f) {
      s = this.m_joints[f], s.InitVelocityConstraints(b)
    }
    for(f = 0;f < b.velocityIterations;++f) {
      for(k = 0;k < this.m_jointCount;++k) {
        s = this.m_joints[k], s.SolveVelocityConstraints(b)
      }
      d.SolveVelocityConstraints()
    }
    for(f = 0;f < this.m_jointCount;++f) {
      s = this.m_joints[f], s.FinalizeVelocityConstraints()
    }
    d.FinalizeVelocityConstraints();
    for(f = 0;f < this.m_bodyCount;++f) {
      if(k = this.m_bodies[f], k.GetType() != j.b2_staticBody) {
        var q = b.dt * k.m_linearVelocity.x, E = b.dt * k.m_linearVelocity.y;
        q * q + E * E > g.b2_maxTranslationSquared && (k.m_linearVelocity.Normalize(), k.m_linearVelocity.x *= g.b2_maxTranslation * b.inv_dt, k.m_linearVelocity.y *= g.b2_maxTranslation * b.inv_dt);
        q = b.dt * k.m_angularVelocity;
        if(q * q > g.b2_maxRotationSquared) {
          k.m_angularVelocity = k.m_angularVelocity < 0 ? -g.b2_maxRotation * b.inv_dt : g.b2_maxRotation * b.inv_dt
        }
        k.m_sweep.c0.SetV(k.m_sweep.c);
        k.m_sweep.a0 = k.m_sweep.a;
        k.m_sweep.c.x += b.dt * k.m_linearVelocity.x;
        k.m_sweep.c.y += b.dt * k.m_linearVelocity.y;
        k.m_sweep.a += b.dt * k.m_angularVelocity;
        k.SynchronizeTransform()
      }
    }
    for(f = 0;f < b.positionIterations;++f) {
      q = d.SolvePositionConstraints(g.b2_contactBaumgarte);
      E = !0;
      for(k = 0;k < this.m_jointCount;++k) {
        s = this.m_joints[k], s = s.SolvePositionConstraints(g.b2_contactBaumgarte), E = E && s
      }
      if(q && E) {
        break
      }
    }
    this.Report(d.m_constraints);
    if(e) {
      e = Number.MAX_VALUE;
      d = g.b2_linearSleepTolerance * g.b2_linearSleepTolerance;
      q = g.b2_angularSleepTolerance * g.b2_angularSleepTolerance;
      for(f = 0;f < this.m_bodyCount;++f) {
        if(k = this.m_bodies[f], k.GetType() != j.b2_staticBody) {
          if((k.m_flags & j.e_allowSleepFlag) == 0) {
            e = k.m_sleepTime = 0
          }
          (k.m_flags & j.e_allowSleepFlag) == 0 || k.m_angularVelocity * k.m_angularVelocity > q || a.Dot(k.m_linearVelocity, k.m_linearVelocity) > d ? e = k.m_sleepTime = 0 : (k.m_sleepTime += b.dt, e = a.Min(e, k.m_sleepTime))
        }
      }
      if(e >= g.b2_timeToSleep) {
        for(f = 0;f < this.m_bodyCount;++f) {
          k = this.m_bodies[f], k.SetAwake(!1)
        }
      }
    }
  };
  B.prototype.SolveTOI = function(a) {
    var b = 0, d = 0;
    this.m_contactSolver.Initialize(a, this.m_contacts, this.m_contactCount, this.m_allocator);
    for(var e = this.m_contactSolver, b = 0;b < this.m_jointCount;++b) {
      this.m_joints[b].InitVelocityConstraints(a)
    }
    for(b = 0;b < a.velocityIterations;++b) {
      e.SolveVelocityConstraints();
      for(d = 0;d < this.m_jointCount;++d) {
        this.m_joints[d].SolveVelocityConstraints(a)
      }
    }
    for(b = 0;b < this.m_bodyCount;++b) {
      if(d = this.m_bodies[b], d.GetType() != j.b2_staticBody) {
        var k = a.dt * d.m_linearVelocity.x, f = a.dt * d.m_linearVelocity.y;
        k * k + f * f > g.b2_maxTranslationSquared && (d.m_linearVelocity.Normalize(), d.m_linearVelocity.x *= g.b2_maxTranslation * a.inv_dt, d.m_linearVelocity.y *= g.b2_maxTranslation * a.inv_dt);
        k = a.dt * d.m_angularVelocity;
        if(k * k > g.b2_maxRotationSquared) {
          d.m_angularVelocity = d.m_angularVelocity < 0 ? -g.b2_maxRotation * a.inv_dt : g.b2_maxRotation * a.inv_dt
        }
        d.m_sweep.c0.SetV(d.m_sweep.c);
        d.m_sweep.a0 = d.m_sweep.a;
        d.m_sweep.c.x += a.dt * d.m_linearVelocity.x;
        d.m_sweep.c.y += a.dt * d.m_linearVelocity.y;
        d.m_sweep.a += a.dt * d.m_angularVelocity;
        d.SynchronizeTransform()
      }
    }
    for(b = 0;b < a.positionIterations;++b) {
      k = e.SolvePositionConstraints(0.75);
      f = !0;
      for(d = 0;d < this.m_jointCount;++d) {
        var q = this.m_joints[d].SolvePositionConstraints(g.b2_contactBaumgarte), f = f && q
      }
      if(k && f) {
        break
      }
    }
    this.Report(e.m_constraints)
  };
  B.prototype.Report = function(a) {
    if(this.m_listener != null) {
      for(var b = 0;b < this.m_contactCount;++b) {
        for(var d = this.m_contacts[b], e = a[b], k = 0;k < e.pointCount;++k) {
          B.s_impulse.normalImpulses[k] = e.points[k].normalImpulse, B.s_impulse.tangentImpulses[k] = e.points[k].tangentImpulse
        }
        this.m_listener.PostSolve(d, B.s_impulse)
      }
    }
  };
  B.prototype.AddBody = function(a) {
    a.m_islandIndex = this.m_bodyCount;
    this.m_bodies[this.m_bodyCount++] = a
  };
  B.prototype.AddContact = function(a) {
    this.m_contacts[this.m_contactCount++] = a
  };
  B.prototype.AddJoint = function(a) {
    this.m_joints[this.m_jointCount++] = a
  };
  Box2D.postDefs.push(function() {
    Box2D.Dynamics.b2Island.s_impulse = new v
  });
  F.b2TimeStep = function() {
  };
  F.prototype.Set = function(a) {
    this.dt = a.dt;
    this.inv_dt = a.inv_dt;
    this.positionIterations = a.positionIterations;
    this.velocityIterations = a.velocityIterations;
    this.warmStarting = a.warmStarting
  }
})();
(function() {
  var a = Box2D.Collision.Shapes.b2CircleShape, e = Box2D.Collision.Shapes.b2EdgeShape, d = Box2D.Collision.Shapes.b2PolygonShape, b = Box2D.Collision.Shapes.b2Shape, g = Box2D.Dynamics.Contacts.b2CircleContact, f = Box2D.Dynamics.Contacts.b2Contact, l = Box2D.Dynamics.Contacts.b2ContactConstraint, h = Box2D.Dynamics.Contacts.b2ContactConstraintPoint, n = Box2D.Dynamics.Contacts.b2ContactEdge, j = Box2D.Dynamics.Contacts.b2ContactFactory, r = Box2D.Dynamics.Contacts.b2ContactRegister, p = Box2D.Dynamics.Contacts.b2ContactResult, 
  v = Box2D.Dynamics.Contacts.b2ContactSolver, o = Box2D.Dynamics.Contacts.b2EdgeAndCircleContact, w = Box2D.Dynamics.Contacts.b2NullContact, x = Box2D.Dynamics.Contacts.b2PolyAndCircleContact, t = Box2D.Dynamics.Contacts.b2PolyAndEdgeContact, D = Box2D.Dynamics.Contacts.b2PolygonContact, u = Box2D.Dynamics.Contacts.b2PositionSolverManifold, H = Box2D.Dynamics.b2Body, B = Box2D.Dynamics.b2TimeStep, F = Box2D.Common.b2Settings, G = Box2D.Common.Math.b2Mat22, K = Box2D.Common.Math.b2Math, m = Box2D.Common.Math.b2Vec2, 
  z = Box2D.Collision.b2Collision, I = Box2D.Collision.b2ContactID, J = Box2D.Collision.b2Manifold, k = Box2D.Collision.b2TimeOfImpact, s = Box2D.Collision.b2TOIInput, q = Box2D.Collision.b2WorldManifold;
  Box2D.inherit(g, Box2D.Dynamics.Contacts.b2Contact);
  g.prototype.__super = Box2D.Dynamics.Contacts.b2Contact.prototype;
  g.b2CircleContact = function() {
    Box2D.Dynamics.Contacts.b2Contact.b2Contact.apply(this, arguments)
  };
  g.Create = function() {
    return new g
  };
  g.Destroy = function() {
  };
  g.prototype.Reset = function(a, b) {
    this.__super.Reset.call(this, a, b)
  };
  g.prototype.Evaluate = function() {
    var b = this.m_fixtureA.GetBody(), k = this.m_fixtureB.GetBody();
    z.CollideCircles(this.m_manifold, this.m_fixtureA.GetShape() instanceof a ? this.m_fixtureA.GetShape() : null, b.m_xf, this.m_fixtureB.GetShape() instanceof a ? this.m_fixtureB.GetShape() : null, k.m_xf)
  };
  f.b2Contact = function() {
    this.m_nodeA = new n;
    this.m_nodeB = new n;
    this.m_manifold = new J;
    this.m_oldManifold = new J
  };
  f.prototype.GetManifold = function() {
    return this.m_manifold
  };
  f.prototype.GetWorldManifold = function(a) {
    var b = this.m_fixtureA.GetBody(), k = this.m_fixtureB.GetBody(), d = this.m_fixtureA.GetShape(), e = this.m_fixtureB.GetShape();
    a.Initialize(this.m_manifold, b.GetTransform(), d.m_radius, k.GetTransform(), e.m_radius)
  };
  f.prototype.IsTouching = function() {
    return(this.m_flags & f.e_touchingFlag) == f.e_touchingFlag
  };
  f.prototype.IsContinuous = function() {
    return(this.m_flags & f.e_continuousFlag) == f.e_continuousFlag
  };
  f.prototype.SetSensor = function(a) {
    a ? this.m_flags |= f.e_sensorFlag : this.m_flags &= ~f.e_sensorFlag
  };
  f.prototype.IsSensor = function() {
    return(this.m_flags & f.e_sensorFlag) == f.e_sensorFlag
  };
  f.prototype.SetEnabled = function(a) {
    a ? this.m_flags |= f.e_enabledFlag : this.m_flags &= ~f.e_enabledFlag
  };
  f.prototype.IsEnabled = function() {
    return(this.m_flags & f.e_enabledFlag) == f.e_enabledFlag
  };
  f.prototype.GetNext = function() {
    return this.m_next
  };
  f.prototype.GetFixtureA = function() {
    return this.m_fixtureA
  };
  f.prototype.GetFixtureB = function() {
    return this.m_fixtureB
  };
  f.prototype.FlagForFiltering = function() {
    this.m_flags |= f.e_filterFlag
  };
  f.prototype.b2Contact = function() {
  };
  f.prototype.Reset = function(a, b) {
    a === void 0 && (a = null);
    b === void 0 && (b = null);
    this.m_flags = f.e_enabledFlag;
    if(!a || !b) {
      this.m_fixtureB = this.m_fixtureA = null
    }else {
      if(a.IsSensor() || b.IsSensor()) {
        this.m_flags |= f.e_sensorFlag
      }
      var k = a.GetBody(), d = b.GetBody();
      if(k.GetType() != H.b2_dynamicBody || k.IsBullet() || d.GetType() != H.b2_dynamicBody || d.IsBullet()) {
        this.m_flags |= f.e_continuousFlag
      }
      this.m_fixtureA = a;
      this.m_fixtureB = b;
      this.m_manifold.m_pointCount = 0;
      this.m_next = this.m_prev = null;
      this.m_nodeA.contact = null;
      this.m_nodeA.prev = null;
      this.m_nodeA.next = null;
      this.m_nodeA.other = null;
      this.m_nodeB.contact = null;
      this.m_nodeB.prev = null;
      this.m_nodeB.next = null;
      this.m_nodeB.other = null
    }
  };
  f.prototype.Update = function(a) {
    var k = this.m_oldManifold;
    this.m_oldManifold = this.m_manifold;
    this.m_manifold = k;
    this.m_flags |= f.e_enabledFlag;
    var d = !1, k = (this.m_flags & f.e_touchingFlag) == f.e_touchingFlag, e = this.m_fixtureA.m_body, q = this.m_fixtureB.m_body, s = this.m_fixtureA.m_aabb.TestOverlap(this.m_fixtureB.m_aabb);
    if(this.m_flags & f.e_sensorFlag) {
      s && (d = this.m_fixtureA.GetShape(), s = this.m_fixtureB.GetShape(), e = e.GetTransform(), q = q.GetTransform(), d = b.TestOverlap(d, e, s, q)), this.m_manifold.m_pointCount = 0
    }else {
      e.GetType() != H.b2_dynamicBody || e.IsBullet() || q.GetType() != H.b2_dynamicBody || q.IsBullet() ? this.m_flags |= f.e_continuousFlag : this.m_flags &= ~f.e_continuousFlag;
      if(s) {
        this.Evaluate();
        d = this.m_manifold.m_pointCount > 0;
        for(s = 0;s < this.m_manifold.m_pointCount;++s) {
          var g = this.m_manifold.m_points[s];
          g.m_normalImpulse = 0;
          g.m_tangentImpulse = 0;
          for(var h = g.m_id, j = 0;j < this.m_oldManifold.m_pointCount;++j) {
            var l = this.m_oldManifold.m_points[j];
            if(l.m_id.key == h.key) {
              g.m_normalImpulse = l.m_normalImpulse;
              g.m_tangentImpulse = l.m_tangentImpulse;
              break
            }
          }
        }
      }else {
        this.m_manifold.m_pointCount = 0
      }
      d != k && (e.SetAwake(!0), q.SetAwake(!0))
    }
    d ? this.m_flags |= f.e_touchingFlag : this.m_flags &= ~f.e_touchingFlag;
    k == !1 && d == !0 && a.BeginContact(this);
    k == !0 && d == !1 && a.EndContact(this);
    (this.m_flags & f.e_sensorFlag) == 0 && a.PreSolve(this, this.m_oldManifold)
  };
  f.prototype.Evaluate = function() {
  };
  f.prototype.ComputeTOI = function(a, b) {
    f.s_input.proxyA.Set(this.m_fixtureA.GetShape());
    f.s_input.proxyB.Set(this.m_fixtureB.GetShape());
    f.s_input.sweepA = a;
    f.s_input.sweepB = b;
    f.s_input.tolerance = F.b2_linearSlop;
    return k.TimeOfImpact(f.s_input)
  };
  Box2D.postDefs.push(function() {
    Box2D.Dynamics.Contacts.b2Contact.e_sensorFlag = 1;
    Box2D.Dynamics.Contacts.b2Contact.e_continuousFlag = 2;
    Box2D.Dynamics.Contacts.b2Contact.e_islandFlag = 4;
    Box2D.Dynamics.Contacts.b2Contact.e_toiFlag = 8;
    Box2D.Dynamics.Contacts.b2Contact.e_touchingFlag = 16;
    Box2D.Dynamics.Contacts.b2Contact.e_enabledFlag = 32;
    Box2D.Dynamics.Contacts.b2Contact.e_filterFlag = 64;
    Box2D.Dynamics.Contacts.b2Contact.s_input = new s
  });
  l.b2ContactConstraint = function() {
    this.localPlaneNormal = new m;
    this.localPoint = new m;
    this.normal = new m;
    this.normalMass = new G;
    this.K = new G
  };
  l.prototype.b2ContactConstraint = function() {
    this.points = Array(F.b2_maxManifoldPoints);
    for(var a = 0;a < F.b2_maxManifoldPoints;a++) {
      this.points[a] = new h
    }
  };
  h.b2ContactConstraintPoint = function() {
    this.localPoint = new m;
    this.rA = new m;
    this.rB = new m
  };
  n.b2ContactEdge = function() {
  };
  j.b2ContactFactory = function() {
  };
  j.prototype.b2ContactFactory = function(a) {
    this.m_allocator = a;
    this.InitializeRegisters()
  };
  j.prototype.AddType = function(a, b, k, d) {
    k === void 0 && (k = 0);
    d === void 0 && (d = 0);
    this.m_registers[k][d].createFcn = a;
    this.m_registers[k][d].destroyFcn = b;
    this.m_registers[k][d].primary = !0;
    if(k != d) {
      this.m_registers[d][k].createFcn = a, this.m_registers[d][k].destroyFcn = b, this.m_registers[d][k].primary = !1
    }
  };
  j.prototype.InitializeRegisters = function() {
    this.m_registers = Array(b.e_shapeTypeCount);
    for(var a = 0;a < b.e_shapeTypeCount;a++) {
      this.m_registers[a] = Array(b.e_shapeTypeCount);
      for(var k = 0;k < b.e_shapeTypeCount;k++) {
        this.m_registers[a][k] = new r
      }
    }
    this.AddType(g.Create, g.Destroy, b.e_circleShape, b.e_circleShape);
    this.AddType(x.Create, x.Destroy, b.e_polygonShape, b.e_circleShape);
    this.AddType(D.Create, D.Destroy, b.e_polygonShape, b.e_polygonShape);
    this.AddType(o.Create, o.Destroy, b.e_edgeShape, b.e_circleShape);
    this.AddType(t.Create, t.Destroy, b.e_polygonShape, b.e_edgeShape)
  };
  j.prototype.Create = function(a, b) {
    var k = parseInt(a.GetType()), d = parseInt(b.GetType()), k = this.m_registers[k][d];
    if(k.pool) {
      return d = k.pool, k.pool = d.m_next, k.poolCount--, d.Reset(a, b), d
    }
    d = k.createFcn;
    return d != null ? (k.primary ? (d = d(this.m_allocator), d.Reset(a, b)) : (d = d(this.m_allocator), d.Reset(b, a)), d) : null
  };
  j.prototype.Destroy = function(a) {
    a.m_manifold.m_pointCount > 0 && (a.m_fixtureA.m_body.SetAwake(!0), a.m_fixtureB.m_body.SetAwake(!0));
    var b = parseInt(a.m_fixtureA.GetType()), k = parseInt(a.m_fixtureB.GetType()), b = this.m_registers[b][k];
    b.poolCount++;
    a.m_next = b.pool;
    b.pool = a;
    b = b.destroyFcn;
    b(a, this.m_allocator)
  };
  r.b2ContactRegister = function() {
  };
  p.b2ContactResult = function() {
    this.position = new m;
    this.normal = new m;
    this.id = new I
  };
  v.b2ContactSolver = function() {
    this.m_step = new B;
    this.m_constraints = []
  };
  v.prototype.b2ContactSolver = function() {
  };
  v.prototype.Initialize = function(a, b, k, d) {
    k === void 0 && (k = 0);
    var e;
    this.m_step.Set(a);
    this.m_allocator = d;
    a = 0;
    for(this.m_constraintCount = k;this.m_constraints.length < this.m_constraintCount;) {
      this.m_constraints[this.m_constraints.length] = new l
    }
    for(a = 0;a < k;++a) {
      e = b[a];
      var d = e.m_fixtureA, f = e.m_fixtureB, q = d.m_shape.m_radius, s = f.m_shape.m_radius, g = d.m_body, h = f.m_body, j = e.GetManifold(), m = F.b2MixFriction(d.GetFriction(), f.GetFriction()), o = F.b2MixRestitution(d.GetRestitution(), f.GetRestitution()), n = g.m_linearVelocity.x, p = g.m_linearVelocity.y, t = h.m_linearVelocity.x, u = h.m_linearVelocity.y, r = g.m_angularVelocity, x = h.m_angularVelocity;
      F.b2Assert(j.m_pointCount > 0);
      v.s_worldManifold.Initialize(j, g.m_xf, q, h.m_xf, s);
      f = v.s_worldManifold.m_normal.x;
      e = v.s_worldManifold.m_normal.y;
      d = this.m_constraints[a];
      d.bodyA = g;
      d.bodyB = h;
      d.manifold = j;
      d.normal.x = f;
      d.normal.y = e;
      d.pointCount = j.m_pointCount;
      d.friction = m;
      d.restitution = o;
      d.localPlaneNormal.x = j.m_localPlaneNormal.x;
      d.localPlaneNormal.y = j.m_localPlaneNormal.y;
      d.localPoint.x = j.m_localPoint.x;
      d.localPoint.y = j.m_localPoint.y;
      d.radius = q + s;
      d.type = j.m_type;
      for(q = 0;q < d.pointCount;++q) {
        m = j.m_points[q];
        s = d.points[q];
        s.normalImpulse = m.m_normalImpulse;
        s.tangentImpulse = m.m_tangentImpulse;
        s.localPoint.SetV(m.m_localPoint);
        var m = s.rA.x = v.s_worldManifold.m_points[q].x - g.m_sweep.c.x, o = s.rA.y = v.s_worldManifold.m_points[q].y - g.m_sweep.c.y, w = s.rB.x = v.s_worldManifold.m_points[q].x - h.m_sweep.c.x, B = s.rB.y = v.s_worldManifold.m_points[q].y - h.m_sweep.c.y, L = m * e - o * f, z = w * e - B * f;
        L *= L;
        z *= z;
        s.normalMass = 1 / (g.m_invMass + h.m_invMass + g.m_invI * L + h.m_invI * z);
        var D = g.m_mass * g.m_invMass + h.m_mass * h.m_invMass;
        D += g.m_mass * g.m_invI * L + h.m_mass * h.m_invI * z;
        s.equalizedMass = 1 / D;
        z = e;
        D = -f;
        L = m * D - o * z;
        z = w * D - B * z;
        L *= L;
        z *= z;
        s.tangentMass = 1 / (g.m_invMass + h.m_invMass + g.m_invI * L + h.m_invI * z);
        s.velocityBias = 0;
        m = d.normal.x * (t + -x * B - n - -r * o) + d.normal.y * (u + x * w - p - r * m);
        m < -F.b2_velocityThreshold && (s.velocityBias += -d.restitution * m)
      }
      if(d.pointCount == 2) {
        u = d.points[0], t = d.points[1], j = g.m_invMass, g = g.m_invI, n = h.m_invMass, h = h.m_invI, p = u.rA.x * e - u.rA.y * f, u = u.rB.x * e - u.rB.y * f, r = t.rA.x * e - t.rA.y * f, t = t.rB.x * e - t.rB.y * f, f = j + n + g * p * p + h * u * u, e = j + n + g * r * r + h * t * t, h = j + n + g * p * r + h * u * t, f * f < 100 * (f * e - h * h) ? (d.K.col1.Set(f, h), d.K.col2.Set(h, e), d.K.GetInverse(d.normalMass)) : d.pointCount = 1
      }
    }
  };
  v.prototype.InitVelocityConstraints = function(a) {
    for(var b = 0;b < this.m_constraintCount;++b) {
      var k = this.m_constraints[b], d = k.bodyA, e = k.bodyB, f = d.m_invMass, q = d.m_invI, s = e.m_invMass, g = e.m_invI, h = k.normal.x, j = k.normal.y, l = j, m = -h, o = 0, n = 0;
      if(a.warmStarting) {
        n = k.pointCount;
        for(o = 0;o < n;++o) {
          var v = k.points[o];
          v.normalImpulse *= a.dtRatio;
          v.tangentImpulse *= a.dtRatio;
          var p = v.normalImpulse * h + v.tangentImpulse * l, t = v.normalImpulse * j + v.tangentImpulse * m;
          d.m_angularVelocity -= q * (v.rA.x * t - v.rA.y * p);
          d.m_linearVelocity.x -= f * p;
          d.m_linearVelocity.y -= f * t;
          e.m_angularVelocity += g * (v.rB.x * t - v.rB.y * p);
          e.m_linearVelocity.x += s * p;
          e.m_linearVelocity.y += s * t
        }
      }else {
        n = k.pointCount;
        for(o = 0;o < n;++o) {
          d = k.points[o], d.normalImpulse = 0, d.tangentImpulse = 0
        }
      }
    }
  };
  v.prototype._SVCA = function(a, b, k, d, e, f, q, s, g, h, j, l, m, o) {
    var b = a - b, v = k - d, d = b * e;
    b *= f;
    e *= v;
    f *= v;
    m.x -= q * (d + e);
    m.y -= q * (b + f);
    q = -g * (j.rA.x * b - j.rA.y * d + l.rA.x * f - l.rA.y * e);
    o.x += s * (d + e);
    o.y += s * (b + f);
    s = h * (j.rB.x * b - j.rB.y * d + l.rB.x * f - l.rB.y * e);
    j.normalImpulse = a;
    l.normalImpulse = k;
    return{wad:q, wbd:s}
  };
  v.prototype.SolveVelocityConstraints = function() {
    for(var a = 0, b = 0, k = b = 0, d = k = 0, e = b = 0;e < this.m_constraintCount;++e) {
      for(var a = this.m_constraints[e], f = a.bodyA, q = a.bodyB, s = f.m_angularVelocity, g = q.m_angularVelocity, h = f.m_linearVelocity, j = q.m_linearVelocity, l = f.m_invMass, m = f.m_invI, o = q.m_invMass, v = q.m_invI, n = a.normal.x, p = a.normal.y, t = p, u = -n, r = a.friction, x = 0;x < a.pointCount;x++) {
        var w = a.points[x], b = j.x - g * w.rB.y - h.x + s * w.rA.y, k = j.y + g * w.rB.x - h.y - s * w.rA.x, b = b * t + k * u, b = w.tangentMass * -b, k = r * w.normalImpulse, k = K.Clamp(w.tangentImpulse + b, -k, k), b = k - w.tangentImpulse, d = b * t;
        b *= u;
        h.x -= l * d;
        h.y -= l * b;
        s -= m * (w.rA.x * b - w.rA.y * d);
        j.x += o * d;
        j.y += o * b;
        g += v * (w.rB.x * b - w.rB.y * d);
        w.tangentImpulse = k
      }
      parseInt(a.pointCount);
      a.pointCount == 1 ? (w = a.points[0], b = j.x - g * w.rB.y - h.x + s * w.rA.y, k = j.y + g * w.rB.x - h.y - s * w.rA.x, a = b * n + k * p, b = -w.normalMass * (a - w.velocityBias), k = w.normalImpulse + b, k < 0 && (k = 0), b = k - w.normalImpulse, d = b * n, b *= p, h.x -= l * d, h.y -= l * b, s -= m * (w.rA.x * b - w.rA.y * d), j.x += o * d, j.y += o * b, g += v * (w.rB.x * b - w.rB.y * d), w.normalImpulse = k) : (w = a.points[0], t = a.points[1], u = w.normalImpulse, r = t.normalImpulse, 
      b = j.x - h.x, k = j.y - h.y, x = (b - g * w.rB.y + s * w.rA.y) * n + (k + g * w.rB.x - s * w.rA.x) * p - w.velocityBias - (a.K.col1.x * u + a.K.col2.x * r), b = (b - g * t.rB.y + s * t.rA.y) * n + (k + g * t.rB.x - s * t.rA.x) * p - t.velocityBias - (a.K.col1.y * u + a.K.col2.y * r), k = -(a.normalMass.col1.x * x + a.normalMass.col2.x * b), d = -1, k >= 0 && (d = -(a.normalMass.col1.y * x + a.normalMass.col2.y * b)), d >= 0 ? (h = this._SVCA(k, u, d, r, n, p, l, o, m, v, w, t, h, j), s += 
      h.wad, g += h.wbd) : (k = -w.normalMass * x, d = 0, k >= 0 && a.K.col1.y * k + b >= 0 ? (h = this._SVCA(k, u, d, r, n, p, l, o, m, v, w, t, h, j), s += h.wad, g += h.wbd) : (k = 0, d = -t.normalMass * b, d >= 0 && a.K.col2.x * d + x >= 0 ? (h = this._SVCA(k, u, d, r, n, p, l, o, m, v, w, t, h, j), s += h.wad, g += h.wbd) : (d = 0, x >= 0 && b >= 0 && (h = this._SVCA(k, u, d, r, n, p, l, o, m, v, w, t, h, j), s += h.wad, g += h.wbd)))));
      f.m_angularVelocity = s;
      q.m_angularVelocity = g
    }
  };
  v.prototype.SolveVelocityConstraints_OLD = function() {
    for(var a = 0, b, k = 0, d = 0, e = 0, f = d = d = k = k = 0, q = k = k = 0, s = k = e = 0, g = 0, h, j = 0;j < this.m_constraintCount;++j) {
      var e = this.m_constraints[j], l = e.bodyA, m = e.bodyB, o = l.m_angularVelocity, v = m.m_angularVelocity, n = l.m_linearVelocity, p = m.m_linearVelocity, t = l.m_invMass, u = l.m_invI, w = m.m_invMass, r = m.m_invI, s = e.normal.x, x = g = e.normal.y;
      h = -s;
      q = e.friction;
      for(a = 0;a < e.pointCount;a++) {
        b = e.points[a], k = p.x - v * b.rB.y - n.x + o * b.rA.y, d = p.y + v * b.rB.x - n.y - o * b.rA.x, k = k * x + d * h, k = b.tangentMass * -k, d = q * b.normalImpulse, d = K.Clamp(b.tangentImpulse + k, -d, d), k = d - b.tangentImpulse, f = k * x, k *= h, n.x -= t * f, n.y -= t * k, o -= u * (b.rA.x * k - b.rA.y * f), p.x += w * f, p.y += w * k, v += r * (b.rB.x * k - b.rB.y * f), b.tangentImpulse = d
      }
      parseInt(e.pointCount);
      if(e.pointCount == 1) {
        b = e.points[0], k = p.x + -v * b.rB.y - n.x - -o * b.rA.y, d = p.y + v * b.rB.x - n.y - o * b.rA.x, e = k * s + d * g, k = -b.normalMass * (e - b.velocityBias), d = b.normalImpulse + k, d = d > 0 ? d : 0, k = d - b.normalImpulse, f = k * s, k *= g, n.x -= t * f, n.y -= t * k, o -= u * (b.rA.x * k - b.rA.y * f), p.x += w * f, p.y += w * k, v += r * (b.rB.x * k - b.rB.y * f), b.normalImpulse = d
      }else {
        b = e.points[0];
        var a = e.points[1], k = b.normalImpulse, q = a.normalImpulse, B = (p.x - v * b.rB.y - n.x + o * b.rA.y) * s + (p.y + v * b.rB.x - n.y - o * b.rA.x) * g, z = (p.x - v * a.rB.y - n.x + o * a.rA.y) * s + (p.y + v * a.rB.x - n.y - o * a.rA.x) * g, d = B - b.velocityBias, f = z - a.velocityBias;
        h = e.K;
        d -= h.col1.x * k + h.col2.x * q;
        for(f -= h.col1.y * k + h.col2.y * q;;) {
          h = e.normalMass;
          x = -(h.col1.x * d + h.col2.x * f);
          h = -(h.col1.y * d + h.col2.y * f);
          if(x >= 0 && h >= 0) {
            k = x - k;
            q = h - q;
            e = k * s;
            k *= g;
            s *= q;
            g *= q;
            n.x -= t * (e + s);
            n.y -= t * (k + g);
            o -= u * (b.rA.x * k - b.rA.y * e + a.rA.x * g - a.rA.y * s);
            p.x += w * (e + s);
            p.y += w * (k + g);
            v += r * (b.rB.x * k - b.rB.y * e + a.rB.x * g - a.rB.y * s);
            b.normalImpulse = x;
            a.normalImpulse = h;
            break
          }
          x = -b.normalMass * d;
          h = 0;
          z = e.K.col1.y * x + f;
          if(x >= 0 && z >= 0) {
            k = x - k;
            q = h - q;
            e = k * s;
            k *= g;
            s *= q;
            g *= q;
            n.x -= t * (e + s);
            n.y -= t * (k + g);
            o -= u * (b.rA.x * k - b.rA.y * e + a.rA.x * g - a.rA.y * s);
            p.x += w * (e + s);
            p.y += w * (k + g);
            v += r * (b.rB.x * k - b.rB.y * e + a.rB.x * g - a.rB.y * s);
            b.normalImpulse = x;
            a.normalImpulse = h;
            break
          }
          x = 0;
          h = -a.normalMass * f;
          B = e.K.col2.x * h + d;
          if(h >= 0 && B >= 0) {
            k = x - k;
            q = h - q;
            e = k * s;
            k *= g;
            s *= q;
            g *= q;
            n.x -= t * (e + s);
            n.y -= t * (k + g);
            o -= u * (b.rA.x * k - b.rA.y * e + a.rA.x * g - a.rA.y * s);
            p.x += w * (e + s);
            p.y += w * (k + g);
            v += r * (b.rB.x * k - b.rB.y * e + a.rB.x * g - a.rB.y * s);
            b.normalImpulse = x;
            a.normalImpulse = h;
            break
          }
          h = x = 0;
          B = d;
          z = f;
          if(B >= 0 && z >= 0) {
            k = x - k;
            q = h - q;
            e = k * s;
            k *= g;
            s *= q;
            g *= q;
            n.x -= t * (e + s);
            n.y -= t * (k + g);
            o -= u * (b.rA.x * k - b.rA.y * e + a.rA.x * g - a.rA.y * s);
            p.x += w * (e + s);
            p.y += w * (k + g);
            v += r * (b.rB.x * k - b.rB.y * e + a.rB.x * g - a.rB.y * s);
            b.normalImpulse = x;
            a.normalImpulse = h;
            break
          }
          break
        }
      }
      l.m_angularVelocity = o;
      m.m_angularVelocity = v
    }
  };
  v.prototype.FinalizeVelocityConstraints = function() {
    for(var a = 0;a < this.m_constraintCount;++a) {
      for(var b = this.m_constraints[a], k = b.manifold, d = 0;d < b.pointCount;++d) {
        var e = k.m_points[d], f = b.points[d];
        e.m_normalImpulse = f.normalImpulse;
        e.m_tangentImpulse = f.tangentImpulse
      }
    }
  };
  v.prototype.SolvePositionConstraints = function(a) {
    a === void 0 && (a = 0);
    for(var b = 0, k = 0;k < this.m_constraintCount;k++) {
      var d = this.m_constraints[k], e = d.bodyA, f = d.bodyB, q = e.m_mass * e.m_invMass, s = e.m_mass * e.m_invI, g = f.m_mass * f.m_invMass, h = f.m_mass * f.m_invI;
      v.s_psm.Initialize(d);
      for(var j = v.s_psm.m_normal, l = 0;l < d.pointCount;l++) {
        var m = d.points[l], o = v.s_psm.m_points[l], n = v.s_psm.m_separations[l], p = o.x - e.m_sweep.c.x, t = o.y - e.m_sweep.c.y, w = o.x - f.m_sweep.c.x, o = o.y - f.m_sweep.c.y;
        n < b && (b = n);
        a != 0 && K.Clamp(a * (n + F.b2_linearSlop), -F.b2_maxLinearCorrection, 0);
        n = -m.equalizedMass * 0;
        m = n * j.x;
        n *= j.y;
        e.m_sweep.c.x -= q * m;
        e.m_sweep.c.y -= q * n;
        e.m_sweep.a -= s * (p * n - t * m);
        e.SynchronizeTransform();
        f.m_sweep.c.x += g * m;
        f.m_sweep.c.y += g * n;
        f.m_sweep.a += h * (w * n - o * m);
        f.SynchronizeTransform()
      }
    }
    return b > -1.5 * F.b2_linearSlop
  };
  Box2D.postDefs.push(function() {
    Box2D.Dynamics.Contacts.b2ContactSolver.s_worldManifold = new q;
    Box2D.Dynamics.Contacts.b2ContactSolver.s_psm = new u
  });
  Box2D.inherit(o, Box2D.Dynamics.Contacts.b2Contact);
  o.prototype.__super = Box2D.Dynamics.Contacts.b2Contact.prototype;
  o.b2EdgeAndCircleContact = function() {
    Box2D.Dynamics.Contacts.b2Contact.b2Contact.apply(this, arguments)
  };
  o.Create = function() {
    return new o
  };
  o.Destroy = function() {
  };
  o.prototype.Reset = function(a, b) {
    this.__super.Reset.call(this, a, b)
  };
  o.prototype.Evaluate = function() {
    var b = this.m_fixtureA.GetBody(), k = this.m_fixtureB.GetBody();
    this.b2CollideEdgeAndCircle(this.m_manifold, this.m_fixtureA.GetShape() instanceof e ? this.m_fixtureA.GetShape() : null, b.m_xf, this.m_fixtureB.GetShape() instanceof a ? this.m_fixtureB.GetShape() : null, k.m_xf)
  };
  o.prototype.b2CollideEdgeAndCircle = function() {
  };
  Box2D.inherit(w, Box2D.Dynamics.Contacts.b2Contact);
  w.prototype.__super = Box2D.Dynamics.Contacts.b2Contact.prototype;
  w.b2NullContact = function() {
    Box2D.Dynamics.Contacts.b2Contact.b2Contact.apply(this, arguments)
  };
  w.prototype.b2NullContact = function() {
    this.__super.b2Contact.call(this)
  };
  w.prototype.Evaluate = function() {
  };
  Box2D.inherit(x, Box2D.Dynamics.Contacts.b2Contact);
  x.prototype.__super = Box2D.Dynamics.Contacts.b2Contact.prototype;
  x.b2PolyAndCircleContact = function() {
    Box2D.Dynamics.Contacts.b2Contact.b2Contact.apply(this, arguments)
  };
  x.Create = function() {
    return new x
  };
  x.Destroy = function() {
  };
  x.prototype.Reset = function(a, k) {
    this.__super.Reset.call(this, a, k);
    F.b2Assert(a.GetType() == b.e_polygonShape);
    F.b2Assert(k.GetType() == b.e_circleShape)
  };
  x.prototype.Evaluate = function() {
    var b = this.m_fixtureA.m_body, k = this.m_fixtureB.m_body;
    z.CollidePolygonAndCircle(this.m_manifold, this.m_fixtureA.GetShape() instanceof d ? this.m_fixtureA.GetShape() : null, b.m_xf, this.m_fixtureB.GetShape() instanceof a ? this.m_fixtureB.GetShape() : null, k.m_xf)
  };
  Box2D.inherit(t, Box2D.Dynamics.Contacts.b2Contact);
  t.prototype.__super = Box2D.Dynamics.Contacts.b2Contact.prototype;
  t.b2PolyAndEdgeContact = function() {
    Box2D.Dynamics.Contacts.b2Contact.b2Contact.apply(this, arguments)
  };
  t.Create = function() {
    return new t
  };
  t.Destroy = function() {
  };
  t.prototype.Reset = function(a, k) {
    this.__super.Reset.call(this, a, k);
    F.b2Assert(a.GetType() == b.e_polygonShape);
    F.b2Assert(k.GetType() == b.e_edgeShape)
  };
  t.prototype.Evaluate = function() {
    var a = this.m_fixtureA.GetBody(), b = this.m_fixtureB.GetBody();
    this.b2CollidePolyAndEdge(this.m_manifold, this.m_fixtureA.GetShape() instanceof d ? this.m_fixtureA.GetShape() : null, a.m_xf, this.m_fixtureB.GetShape() instanceof e ? this.m_fixtureB.GetShape() : null, b.m_xf)
  };
  t.prototype.b2CollidePolyAndEdge = function() {
  };
  Box2D.inherit(D, Box2D.Dynamics.Contacts.b2Contact);
  D.prototype.__super = Box2D.Dynamics.Contacts.b2Contact.prototype;
  D.b2PolygonContact = function() {
    Box2D.Dynamics.Contacts.b2Contact.b2Contact.apply(this, arguments)
  };
  D.Create = function() {
    return new D
  };
  D.Destroy = function() {
  };
  D.prototype.Reset = function(a, b) {
    this.__super.Reset.call(this, a, b)
  };
  D.prototype.Evaluate = function() {
    var a = this.m_fixtureA.GetBody(), b = this.m_fixtureB.GetBody();
    z.CollidePolygons(this.m_manifold, this.m_fixtureA.GetShape() instanceof d ? this.m_fixtureA.GetShape() : null, a.m_xf, this.m_fixtureB.GetShape() instanceof d ? this.m_fixtureB.GetShape() : null, b.m_xf)
  };
  u.b2PositionSolverManifold = function() {
  };
  u.prototype.b2PositionSolverManifold = function() {
    this.m_normal = new m;
    this.m_separations = new Box2D.NVector(F.b2_maxManifoldPoints);
    this.m_points = Array(F.b2_maxManifoldPoints);
    for(var a = 0;a < F.b2_maxManifoldPoints;a++) {
      this.m_points[a] = new m
    }
  };
  u.prototype.Initialize = function(a) {
    F.b2Assert(a.pointCount > 0);
    var b = 0, k = 0, d = 0, e = 0, f = 0;
    switch(a.type) {
      case J.e_circles:
        var q = a.bodyA.m_xf.R, d = a.localPoint, b = a.bodyA.m_xf.position.x + (q.col1.x * d.x + q.col2.x * d.y), k = a.bodyA.m_xf.position.y + (q.col1.y * d.x + q.col2.y * d.y), q = a.bodyB.m_xf.R, d = a.points[0].localPoint, e = a.bodyB.m_xf.position.x + (q.col1.x * d.x + q.col2.x * d.y), q = a.bodyB.m_xf.position.y + (q.col1.y * d.x + q.col2.y * d.y), d = e - b, f = q - k, s = d * d + f * f;
        s > Box2D.MIN_VALUE_SQUARED ? (s = Math.sqrt(s), this.m_normal.x = d / s, this.m_normal.y = f / s) : (this.m_normal.x = 1, this.m_normal.y = 0);
        this.m_points[0].x = 0.5 * (b + e);
        this.m_points[0].y = 0.5 * (k + q);
        this.m_separations[0] = d * this.m_normal.x + f * this.m_normal.y - a.radius;
        break;
      case J.e_faceA:
        q = a.bodyA.m_xf.R;
        d = a.localPlaneNormal;
        this.m_normal.x = q.col1.x * d.x + q.col2.x * d.y;
        this.m_normal.y = q.col1.y * d.x + q.col2.y * d.y;
        q = a.bodyA.m_xf.R;
        d = a.localPoint;
        e = a.bodyA.m_xf.position.x + (q.col1.x * d.x + q.col2.x * d.y);
        f = a.bodyA.m_xf.position.y + (q.col1.y * d.x + q.col2.y * d.y);
        q = a.bodyB.m_xf.R;
        for(b = 0;b < a.pointCount;++b) {
          d = a.points[b].localPoint, k = a.bodyB.m_xf.position.x + (q.col1.x * d.x + q.col2.x * d.y), d = a.bodyB.m_xf.position.y + (q.col1.y * d.x + q.col2.y * d.y), this.m_separations[b] = (k - e) * this.m_normal.x + (d - f) * this.m_normal.y - a.radius, this.m_points[b].x = k, this.m_points[b].y = d
        }
        break;
      case J.e_faceB:
        q = a.bodyB.m_xf.R;
        d = a.localPlaneNormal;
        this.m_normal.x = q.col1.x * d.x + q.col2.x * d.y;
        this.m_normal.y = q.col1.y * d.x + q.col2.y * d.y;
        q = a.bodyB.m_xf.R;
        d = a.localPoint;
        e = a.bodyB.m_xf.position.x + (q.col1.x * d.x + q.col2.x * d.y);
        f = a.bodyB.m_xf.position.y + (q.col1.y * d.x + q.col2.y * d.y);
        q = a.bodyA.m_xf.R;
        for(b = 0;b < a.pointCount;++b) {
          d = a.points[b].localPoint, k = a.bodyA.m_xf.position.x + (q.col1.x * d.x + q.col2.x * d.y), d = a.bodyA.m_xf.position.y + (q.col1.y * d.x + q.col2.y * d.y), this.m_separations[b] = (k - e) * this.m_normal.x + (d - f) * this.m_normal.y - a.radius, this.m_points[b].Set(k, d)
        }
        this.m_normal.x *= -1;
        this.m_normal.y *= -1
    }
  };
  Box2D.postDefs.push(function() {
    Box2D.Dynamics.Contacts.b2PositionSolverManifold.circlePointA = new m;
    Box2D.Dynamics.Contacts.b2PositionSolverManifold.circlePointB = new m
  })
})();
(function() {
  var a = Box2D.Common.Math.b2Mat22, e = Box2D.Common.Math.b2Math, d = Box2D.Common.Math.b2Vec2, b = Box2D.Common.b2Color, g = Box2D.Dynamics.Controllers.b2BuoyancyController, f = Box2D.Dynamics.Controllers.b2ConstantAccelController, l = Box2D.Dynamics.Controllers.b2ConstantForceController, h = Box2D.Dynamics.Controllers.b2Controller, n = Box2D.Dynamics.Controllers.b2ControllerEdge, j = Box2D.Dynamics.Controllers.b2GravityController, r = Box2D.Dynamics.Controllers.b2TensorDampingController;
  Box2D.inherit(g, Box2D.Dynamics.Controllers.b2Controller);
  g.prototype.__super = Box2D.Dynamics.Controllers.b2Controller.prototype;
  g.b2BuoyancyController = function() {
    Box2D.Dynamics.Controllers.b2Controller.b2Controller.apply(this, arguments);
    this.normal = new d(0, -1);
    this.density = this.offset = 0;
    this.velocity = new d(0, 0);
    this.linearDrag = 2;
    this.angularDrag = 1;
    this.useDensity = !1;
    this.useWorldGravity = !0;
    this.gravity = null
  };
  g.prototype.Step = function() {
    if(this.m_bodyList) {
      if(this.useWorldGravity) {
        this.gravity = this.GetWorld().GetGravity().Copy()
      }
      for(var a = this.m_bodyList;a;a = a.nextBody) {
        var b = a.body;
        if(b.IsAwake() != !1) {
          for(var e = new d, f = new d, g = 0, h = 0, j = b.GetFixtureList();j;j = j.GetNext()) {
            var l = new d, n = j.GetShape().ComputeSubmergedArea(this.normal, this.offset, b.GetTransform(), l);
            g += n;
            e.x += n * l.x;
            e.y += n * l.y;
            var r = 0, r = 1;
            h += n * r;
            f.x += n * l.x * r;
            f.y += n * l.y * r
          }
          e.x /= g;
          e.y /= g;
          f.x /= h;
          f.y /= h;
          g < Number.MIN_VALUE || (h = this.gravity.GetNegative(), h.Multiply(this.density * g), b.ApplyForce(h, f), f = b.GetLinearVelocityFromWorldPoint(e), f.Subtract(this.velocity), f.Multiply(-this.linearDrag * g), b.ApplyForce(f, e), b.ApplyTorque(-b.GetInertia() / b.GetMass() * g * b.GetAngularVelocity() * this.angularDrag))
        }
      }
    }
  };
  g.prototype.Draw = function(a) {
    var e = new d, f = new d;
    e.x = this.normal.x * this.offset + this.normal.y * 1E3;
    e.y = this.normal.y * this.offset - this.normal.x * 1E3;
    f.x = this.normal.x * this.offset - this.normal.y * 1E3;
    f.y = this.normal.y * this.offset + this.normal.x * 1E3;
    var g = new b(0, 0, 1);
    a.DrawSegment(e, f, g)
  };
  Box2D.inherit(f, Box2D.Dynamics.Controllers.b2Controller);
  f.prototype.__super = Box2D.Dynamics.Controllers.b2Controller.prototype;
  f.b2ConstantAccelController = function() {
    Box2D.Dynamics.Controllers.b2Controller.b2Controller.apply(this, arguments);
    this.A = new d(0, 0)
  };
  f.prototype.Step = function(a) {
    for(var a = new d(this.A.x * a.dt, this.A.y * a.dt), b = this.m_bodyList;b;b = b.nextBody) {
      var e = b.body;
      e.IsAwake() && e.SetLinearVelocity(new d(e.GetLinearVelocity().x + a.x, e.GetLinearVelocity().y + a.y))
    }
  };
  Box2D.inherit(l, Box2D.Dynamics.Controllers.b2Controller);
  l.prototype.__super = Box2D.Dynamics.Controllers.b2Controller.prototype;
  l.b2ConstantForceController = function() {
    Box2D.Dynamics.Controllers.b2Controller.b2Controller.apply(this, arguments);
    this.F = new d(0, 0)
  };
  l.prototype.Step = function() {
    for(var a = this.m_bodyList;a;a = a.nextBody) {
      var b = a.body;
      b.IsAwake() && b.ApplyForce(this.F, b.GetWorldCenter())
    }
  };
  h.b2Controller = function() {
  };
  h.prototype.Step = function() {
  };
  h.prototype.Draw = function() {
  };
  h.prototype.AddBody = function(a) {
    var b = new n;
    b.controller = this;
    b.body = a;
    b.nextBody = this.m_bodyList;
    b.prevBody = null;
    this.m_bodyList = b;
    if(b.nextBody) {
      b.nextBody.prevBody = b
    }
    this.m_bodyCount++;
    b.nextController = a.m_controllerList;
    b.prevController = null;
    a.m_controllerList = b;
    if(b.nextController) {
      b.nextController.prevController = b
    }
    a.m_controllerCount++
  };
  h.prototype.RemoveBody = function(a) {
    for(var b = a.m_controllerList;b && b.controller != this;) {
      b = b.nextController
    }
    if(b.prevBody) {
      b.prevBody.nextBody = b.nextBody
    }
    if(b.nextBody) {
      b.nextBody.prevBody = b.prevBody
    }
    if(b.nextController) {
      b.nextController.prevController = b.prevController
    }
    if(b.prevController) {
      b.prevController.nextController = b.nextController
    }
    if(this.m_bodyList == b) {
      this.m_bodyList = b.nextBody
    }
    if(a.m_controllerList == b) {
      a.m_controllerList = b.nextController
    }
    a.m_controllerCount--;
    this.m_bodyCount--
  };
  h.prototype.Clear = function() {
    for(;this.m_bodyList;) {
      this.RemoveBody(this.m_bodyList.body)
    }
  };
  h.prototype.GetNext = function() {
    return this.m_next
  };
  h.prototype.GetWorld = function() {
    return this.m_world
  };
  h.prototype.GetBodyList = function() {
    return this.m_bodyList
  };
  n.b2ControllerEdge = function() {
  };
  Box2D.inherit(j, Box2D.Dynamics.Controllers.b2Controller);
  j.prototype.__super = Box2D.Dynamics.Controllers.b2Controller.prototype;
  j.b2GravityController = function() {
    Box2D.Dynamics.Controllers.b2Controller.b2Controller.apply(this, arguments);
    this.G = 1;
    this.invSqr = !0
  };
  j.prototype.Step = function() {
    var a = null, b = null, e = null, f = 0, g = null, h = null, j = null, l = 0, n = 0, r = 0, l = null;
    if(this.invSqr) {
      for(a = this.m_bodyList;a;a = a.nextBody) {
        b = a.body;
        e = b.GetWorldCenter();
        f = b.GetMass();
        for(g = this.m_bodyList;g != a;g = g.nextBody) {
          h = g.body, j = h.GetWorldCenter(), l = j.x - e.x, n = j.y - e.y, r = l * l + n * n, r < Number.MIN_VALUE || (l = new d(l, n), l.Multiply(this.G / r / Math.sqrt(r) * f * h.GetMass()), b.IsAwake() && b.ApplyForce(l, e), l.Multiply(-1), h.IsAwake() && h.ApplyForce(l, j))
        }
      }
    }else {
      for(a = this.m_bodyList;a;a = a.nextBody) {
        b = a.body;
        e = b.GetWorldCenter();
        f = b.GetMass();
        for(g = this.m_bodyList;g != a;g = g.nextBody) {
          h = g.body, j = h.GetWorldCenter(), l = j.x - e.x, n = j.y - e.y, r = l * l + n * n, r < Number.MIN_VALUE || (l = new d(l, n), l.Multiply(this.G / r * f * h.GetMass()), b.IsAwake() && b.ApplyForce(l, e), l.Multiply(-1), h.IsAwake() && h.ApplyForce(l, j))
        }
      }
    }
  };
  Box2D.inherit(r, Box2D.Dynamics.Controllers.b2Controller);
  r.prototype.__super = Box2D.Dynamics.Controllers.b2Controller.prototype;
  r.b2TensorDampingController = function() {
    Box2D.Dynamics.Controllers.b2Controller.b2Controller.apply(this, arguments);
    this.T = new a;
    this.maxTimestep = 0
  };
  r.prototype.SetAxisAligned = function(a, b) {
    a === void 0 && (a = 0);
    b === void 0 && (b = 0);
    this.T.col1.x = -a;
    this.T.col1.y = 0;
    this.T.col2.x = 0;
    this.T.col2.y = -b;
    this.maxTimestep = a > 0 || b > 0 ? 1 / Math.max(a, b) : 0
  };
  r.prototype.Step = function(a) {
    a = a.dt;
    if(!(a <= Number.MIN_VALUE)) {
      if(a > this.maxTimestep && this.maxTimestep > 0) {
        a = this.maxTimestep
      }
      for(var b = this.m_bodyList;b;b = b.nextBody) {
        var f = b.body;
        if(f.IsAwake()) {
          var g = f.GetWorldVector(e.MulMV(this.T, f.GetLocalVector(f.GetLinearVelocity())));
          f.SetLinearVelocity(new d(f.GetLinearVelocity().x + g.x * a, f.GetLinearVelocity().y + g.y * a))
        }
      }
    }
  }
})();
(function() {
  var a = Box2D.Common.b2Settings, e = Box2D.Common.Math.b2Mat22, d = Box2D.Common.Math.b2Mat33, b = Box2D.Common.Math.b2Math, g = Box2D.Common.Math.b2Vec2, f = Box2D.Common.Math.b2Vec3, l = Box2D.Dynamics.Joints.b2DistanceJoint, h = Box2D.Dynamics.Joints.b2DistanceJointDef, n = Box2D.Dynamics.Joints.b2FrictionJoint, j = Box2D.Dynamics.Joints.b2FrictionJointDef, r = Box2D.Dynamics.Joints.b2GearJoint, p = Box2D.Dynamics.Joints.b2GearJointDef, v = Box2D.Dynamics.Joints.b2Jacobian, o = Box2D.Dynamics.Joints.b2Joint, 
  w = Box2D.Dynamics.Joints.b2JointDef, x = Box2D.Dynamics.Joints.b2JointEdge, t = Box2D.Dynamics.Joints.b2LineJoint, D = Box2D.Dynamics.Joints.b2LineJointDef, u = Box2D.Dynamics.Joints.b2MouseJoint, H = Box2D.Dynamics.Joints.b2MouseJointDef, B = Box2D.Dynamics.Joints.b2PrismaticJoint, F = Box2D.Dynamics.Joints.b2PrismaticJointDef, G = Box2D.Dynamics.Joints.b2PulleyJoint, K = Box2D.Dynamics.Joints.b2PulleyJointDef, m = Box2D.Dynamics.Joints.b2RevoluteJoint, z = Box2D.Dynamics.Joints.b2RevoluteJointDef, 
  I = Box2D.Dynamics.Joints.b2WeldJoint, J = Box2D.Dynamics.Joints.b2WeldJointDef;
  Box2D.inherit(l, Box2D.Dynamics.Joints.b2Joint);
  l.prototype.__super = Box2D.Dynamics.Joints.b2Joint.prototype;
  l.b2DistanceJoint = function() {
    Box2D.Dynamics.Joints.b2Joint.b2Joint.apply(this, arguments);
    this.m_localAnchor1 = new g;
    this.m_localAnchor2 = new g;
    this.m_u = new g
  };
  l.prototype.GetAnchorA = function() {
    return this.m_bodyA.GetWorldPoint(this.m_localAnchor1)
  };
  l.prototype.GetAnchorB = function() {
    return this.m_bodyB.GetWorldPoint(this.m_localAnchor2)
  };
  l.prototype.GetReactionForce = function(a) {
    a === void 0 && (a = 0);
    return new g(a * this.m_impulse * this.m_u.x, a * this.m_impulse * this.m_u.y)
  };
  l.prototype.GetReactionTorque = function() {
    return 0
  };
  l.prototype.GetLength = function() {
    return this.m_length
  };
  l.prototype.SetLength = function(a) {
    a === void 0 && (a = 0);
    this.m_length = a
  };
  l.prototype.GetFrequency = function() {
    return this.m_frequencyHz
  };
  l.prototype.SetFrequency = function(a) {
    a === void 0 && (a = 0);
    this.m_frequencyHz = a
  };
  l.prototype.GetDampingRatio = function() {
    return this.m_dampingRatio
  };
  l.prototype.SetDampingRatio = function(a) {
    a === void 0 && (a = 0);
    this.m_dampingRatio = a
  };
  l.prototype.b2DistanceJoint = function(a) {
    this.__super.b2Joint.call(this, a);
    this.m_localAnchor1.SetV(a.localAnchorA);
    this.m_localAnchor2.SetV(a.localAnchorB);
    this.m_length = a.length;
    this.m_frequencyHz = a.frequencyHz;
    this.m_dampingRatio = a.dampingRatio;
    this.m_bias = this.m_gamma = this.m_impulse = 0
  };
  l.prototype.InitVelocityConstraints = function(b) {
    var d, e = 0, f = this.m_bodyA, g = this.m_bodyB;
    d = f.m_xf.R;
    var h = this.m_localAnchor1.x - f.m_sweep.localCenter.x, j = this.m_localAnchor1.y - f.m_sweep.localCenter.y, e = d.col1.x * h + d.col2.x * j, j = d.col1.y * h + d.col2.y * j, h = e;
    d = g.m_xf.R;
    var l = this.m_localAnchor2.x - g.m_sweep.localCenter.x, m = this.m_localAnchor2.y - g.m_sweep.localCenter.y, e = d.col1.x * l + d.col2.x * m, m = d.col1.y * l + d.col2.y * m, l = e;
    this.m_u.x = g.m_sweep.c.x + l - f.m_sweep.c.x - h;
    this.m_u.y = g.m_sweep.c.y + m - f.m_sweep.c.y - j;
    e = Math.sqrt(this.m_u.x * this.m_u.x + this.m_u.y * this.m_u.y);
    e > a.b2_linearSlop ? this.m_u.Multiply(1 / e) : this.m_u.SetZero();
    d = h * this.m_u.y - j * this.m_u.x;
    var o = l * this.m_u.y - m * this.m_u.x;
    d = f.m_invMass + f.m_invI * d * d + g.m_invMass + g.m_invI * o * o;
    this.m_mass = d != 0 ? 1 / d : 0;
    if(this.m_frequencyHz > 0) {
      e -= this.m_length;
      var o = 2 * Math.PI * this.m_frequencyHz, n = this.m_mass * o * o;
      this.m_gamma = b.dt * (2 * this.m_mass * this.m_dampingRatio * o + b.dt * n);
      this.m_gamma = this.m_gamma != 0 ? 1 / this.m_gamma : 0;
      this.m_bias = e * b.dt * n * this.m_gamma;
      this.m_mass = d + this.m_gamma;
      this.m_mass = this.m_mass != 0 ? 1 / this.m_mass : 0
    }
    b.warmStarting ? (this.m_impulse *= b.dtRatio, b = this.m_impulse * this.m_u.x, d = this.m_impulse * this.m_u.y, f.m_linearVelocity.x -= f.m_invMass * b, f.m_linearVelocity.y -= f.m_invMass * d, f.m_angularVelocity -= f.m_invI * (h * d - j * b), g.m_linearVelocity.x += g.m_invMass * b, g.m_linearVelocity.y += g.m_invMass * d, g.m_angularVelocity += g.m_invI * (l * d - m * b)) : this.m_impulse = 0
  };
  l.prototype.SolveVelocityConstraints = function() {
    var a, b = this.m_bodyA, d = this.m_bodyB;
    a = b.m_xf.R;
    var e = this.m_localAnchor1.x - b.m_sweep.localCenter.x, f = this.m_localAnchor1.y - b.m_sweep.localCenter.y, g = a.col1.x * e + a.col2.x * f, f = a.col1.y * e + a.col2.y * f, e = g;
    a = d.m_xf.R;
    var h = this.m_localAnchor2.x - d.m_sweep.localCenter.x, j = this.m_localAnchor2.y - d.m_sweep.localCenter.y, g = a.col1.x * h + a.col2.x * j, j = a.col1.y * h + a.col2.y * j, h = g, g = -this.m_mass * (this.m_u.x * (d.m_linearVelocity.x + -d.m_angularVelocity * j - (b.m_linearVelocity.x + -b.m_angularVelocity * f)) + this.m_u.y * (d.m_linearVelocity.y + d.m_angularVelocity * h - (b.m_linearVelocity.y + b.m_angularVelocity * e)) + this.m_bias + this.m_gamma * this.m_impulse);
    this.m_impulse += g;
    a = g * this.m_u.x;
    g *= this.m_u.y;
    b.m_linearVelocity.x -= b.m_invMass * a;
    b.m_linearVelocity.y -= b.m_invMass * g;
    b.m_angularVelocity -= b.m_invI * (e * g - f * a);
    d.m_linearVelocity.x += d.m_invMass * a;
    d.m_linearVelocity.y += d.m_invMass * g;
    d.m_angularVelocity += d.m_invI * (h * g - j * a)
  };
  l.prototype.SolvePositionConstraints = function() {
    var d;
    if(this.m_frequencyHz > 0) {
      return!0
    }
    var e = this.m_bodyA, f = this.m_bodyB;
    d = e.m_xf.R;
    var g = this.m_localAnchor1.x - e.m_sweep.localCenter.x, h = this.m_localAnchor1.y - e.m_sweep.localCenter.y, j = d.col1.x * g + d.col2.x * h, h = d.col1.y * g + d.col2.y * h, g = j;
    d = f.m_xf.R;
    var y = this.m_localAnchor2.x - f.m_sweep.localCenter.x, l = this.m_localAnchor2.y - f.m_sweep.localCenter.y, j = d.col1.x * y + d.col2.x * l, l = d.col1.y * y + d.col2.y * l, y = j, j = f.m_sweep.c.x + y - e.m_sweep.c.x - g, m = f.m_sweep.c.y + l - e.m_sweep.c.y - h;
    d = Math.sqrt(j * j + m * m);
    j /= d;
    m /= d;
    d -= this.m_length;
    d = b.Clamp(d, -a.b2_maxLinearCorrection, a.b2_maxLinearCorrection);
    var o = -this.m_mass * d;
    this.m_u.Set(j, m);
    j = o * this.m_u.x;
    m = o * this.m_u.y;
    e.m_sweep.c.x -= e.m_invMass * j;
    e.m_sweep.c.y -= e.m_invMass * m;
    e.m_sweep.a -= e.m_invI * (g * m - h * j);
    f.m_sweep.c.x += f.m_invMass * j;
    f.m_sweep.c.y += f.m_invMass * m;
    f.m_sweep.a += f.m_invI * (y * m - l * j);
    e.SynchronizeTransform();
    f.SynchronizeTransform();
    return b.Abs(d) < a.b2_linearSlop
  };
  Box2D.inherit(h, Box2D.Dynamics.Joints.b2JointDef);
  h.prototype.__super = Box2D.Dynamics.Joints.b2JointDef.prototype;
  h.b2DistanceJointDef = function() {
    Box2D.Dynamics.Joints.b2JointDef.b2JointDef.apply(this, arguments);
    this.localAnchorA = new g;
    this.localAnchorB = new g
  };
  h.prototype.b2DistanceJointDef = function() {
    this.__super.b2JointDef.call(this);
    this.type = o.e_distanceJoint;
    this.length = 1;
    this.dampingRatio = this.frequencyHz = 0
  };
  h.prototype.Initialize = function(a, b, d, e) {
    this.bodyA = a;
    this.bodyB = b;
    this.localAnchorA.SetV(this.bodyA.GetLocalPoint(d));
    this.localAnchorB.SetV(this.bodyB.GetLocalPoint(e));
    a = e.x - d.x;
    d = e.y - d.y;
    this.length = Math.sqrt(a * a + d * d);
    this.dampingRatio = this.frequencyHz = 0
  };
  Box2D.inherit(n, Box2D.Dynamics.Joints.b2Joint);
  n.prototype.__super = Box2D.Dynamics.Joints.b2Joint.prototype;
  n.b2FrictionJoint = function() {
    Box2D.Dynamics.Joints.b2Joint.b2Joint.apply(this, arguments);
    this.m_localAnchorA = new g;
    this.m_localAnchorB = new g;
    this.m_linearMass = new e;
    this.m_linearImpulse = new g
  };
  n.prototype.GetAnchorA = function() {
    return this.m_bodyA.GetWorldPoint(this.m_localAnchorA)
  };
  n.prototype.GetAnchorB = function() {
    return this.m_bodyB.GetWorldPoint(this.m_localAnchorB)
  };
  n.prototype.GetReactionForce = function(a) {
    a === void 0 && (a = 0);
    return new g(a * this.m_linearImpulse.x, a * this.m_linearImpulse.y)
  };
  n.prototype.GetReactionTorque = function(a) {
    a === void 0 && (a = 0);
    return a * this.m_angularImpulse
  };
  n.prototype.SetMaxForce = function(a) {
    a === void 0 && (a = 0);
    this.m_maxForce = a
  };
  n.prototype.GetMaxForce = function() {
    return this.m_maxForce
  };
  n.prototype.SetMaxTorque = function(a) {
    a === void 0 && (a = 0);
    this.m_maxTorque = a
  };
  n.prototype.GetMaxTorque = function() {
    return this.m_maxTorque
  };
  n.prototype.b2FrictionJoint = function(a) {
    this.__super.b2Joint.call(this, a);
    this.m_localAnchorA.SetV(a.localAnchorA);
    this.m_localAnchorB.SetV(a.localAnchorB);
    this.m_linearMass.SetZero();
    this.m_angularMass = 0;
    this.m_linearImpulse.SetZero();
    this.m_angularImpulse = 0;
    this.m_maxForce = a.maxForce;
    this.m_maxTorque = a.maxTorque
  };
  n.prototype.InitVelocityConstraints = function(a) {
    var b, d = 0, f = this.m_bodyA, g = this.m_bodyB;
    b = f.m_xf.R;
    var h = this.m_localAnchorA.x - f.m_sweep.localCenter.x, j = this.m_localAnchorA.y - f.m_sweep.localCenter.y, d = b.col1.x * h + b.col2.x * j, j = b.col1.y * h + b.col2.y * j, h = d;
    b = g.m_xf.R;
    var l = this.m_localAnchorB.x - g.m_sweep.localCenter.x, m = this.m_localAnchorB.y - g.m_sweep.localCenter.y, d = b.col1.x * l + b.col2.x * m, m = b.col1.y * l + b.col2.y * m, l = d;
    b = f.m_invMass;
    var d = g.m_invMass, o = f.m_invI, n = g.m_invI, p = new e;
    p.col1.x = b + d;
    p.col2.x = 0;
    p.col1.y = 0;
    p.col2.y = b + d;
    p.col1.x += o * j * j;
    p.col2.x += -o * h * j;
    p.col1.y += -o * h * j;
    p.col2.y += o * h * h;
    p.col1.x += n * m * m;
    p.col2.x += -n * l * m;
    p.col1.y += -n * l * m;
    p.col2.y += n * l * l;
    p.GetInverse(this.m_linearMass);
    this.m_angularMass = o + n;
    if(this.m_angularMass > 0) {
      this.m_angularMass = 1 / this.m_angularMass
    }
    a.warmStarting ? (this.m_linearImpulse.x *= a.dtRatio, this.m_linearImpulse.y *= a.dtRatio, this.m_angularImpulse *= a.dtRatio, a = this.m_linearImpulse, f.m_linearVelocity.x -= b * a.x, f.m_linearVelocity.y -= b * a.y, f.m_angularVelocity -= o * (h * a.y - j * a.x + this.m_angularImpulse), g.m_linearVelocity.x += d * a.x, g.m_linearVelocity.y += d * a.y, g.m_angularVelocity += n * (l * a.y - m * a.x + this.m_angularImpulse)) : (this.m_linearImpulse.SetZero(), this.m_angularImpulse = 0)
  };
  n.prototype.SolveVelocityConstraints = function(a) {
    var d, e = 0, f = this.m_bodyA, h = this.m_bodyB, j = f.m_linearVelocity, l = f.m_angularVelocity, m = h.m_linearVelocity, o = h.m_angularVelocity, n = f.m_invMass, p = h.m_invMass, t = f.m_invI, r = h.m_invI;
    d = f.m_xf.R;
    var w = this.m_localAnchorA.x - f.m_sweep.localCenter.x, v = this.m_localAnchorA.y - f.m_sweep.localCenter.y, e = d.col1.x * w + d.col2.x * v, v = d.col1.y * w + d.col2.y * v, w = e;
    d = h.m_xf.R;
    var u = this.m_localAnchorB.x - h.m_sweep.localCenter.x, x = this.m_localAnchorB.y - h.m_sweep.localCenter.y, e = d.col1.x * u + d.col2.x * x, x = d.col1.y * u + d.col2.y * x, u = e;
    d = 0;
    var e = -this.m_angularMass * (o - l), z = this.m_angularImpulse;
    d = a.dt * this.m_maxTorque;
    this.m_angularImpulse = b.Clamp(this.m_angularImpulse + e, -d, d);
    e = this.m_angularImpulse - z;
    l -= t * e;
    o += r * e;
    d = b.MulMV(this.m_linearMass, new g(-(m.x - o * x - j.x + l * v), -(m.y + o * u - j.y - l * w)));
    e = this.m_linearImpulse.Copy();
    this.m_linearImpulse.Add(d);
    d = a.dt * this.m_maxForce;
    this.m_linearImpulse.LengthSquared() > d * d && (this.m_linearImpulse.Normalize(), this.m_linearImpulse.Multiply(d));
    d = b.SubtractVV(this.m_linearImpulse, e);
    j.x -= n * d.x;
    j.y -= n * d.y;
    l -= t * (w * d.y - v * d.x);
    m.x += p * d.x;
    m.y += p * d.y;
    o += r * (u * d.y - x * d.x);
    f.m_angularVelocity = l;
    h.m_angularVelocity = o
  };
  n.prototype.SolvePositionConstraints = function() {
    return!0
  };
  Box2D.inherit(j, Box2D.Dynamics.Joints.b2JointDef);
  j.prototype.__super = Box2D.Dynamics.Joints.b2JointDef.prototype;
  j.b2FrictionJointDef = function() {
    Box2D.Dynamics.Joints.b2JointDef.b2JointDef.apply(this, arguments);
    this.localAnchorA = new g;
    this.localAnchorB = new g
  };
  j.prototype.b2FrictionJointDef = function() {
    this.__super.b2JointDef.call(this);
    this.type = o.e_frictionJoint;
    this.maxTorque = this.maxForce = 0
  };
  j.prototype.Initialize = function(a, b, d) {
    this.bodyA = a;
    this.bodyB = b;
    this.localAnchorA.SetV(this.bodyA.GetLocalPoint(d));
    this.localAnchorB.SetV(this.bodyB.GetLocalPoint(d))
  };
  Box2D.inherit(r, Box2D.Dynamics.Joints.b2Joint);
  r.prototype.__super = Box2D.Dynamics.Joints.b2Joint.prototype;
  r.b2GearJoint = function() {
    Box2D.Dynamics.Joints.b2Joint.b2Joint.apply(this, arguments);
    this.m_groundAnchor1 = new g;
    this.m_groundAnchor2 = new g;
    this.m_localAnchor1 = new g;
    this.m_localAnchor2 = new g;
    this.m_J = new v
  };
  r.prototype.GetAnchorA = function() {
    return this.m_bodyA.GetWorldPoint(this.m_localAnchor1)
  };
  r.prototype.GetAnchorB = function() {
    return this.m_bodyB.GetWorldPoint(this.m_localAnchor2)
  };
  r.prototype.GetReactionForce = function(a) {
    a === void 0 && (a = 0);
    return new g(a * this.m_impulse * this.m_J.linearB.x, a * this.m_impulse * this.m_J.linearB.y)
  };
  r.prototype.GetReactionTorque = function(a) {
    a === void 0 && (a = 0);
    var b = this.m_bodyB.m_xf.R, d = this.m_localAnchor1.x - this.m_bodyB.m_sweep.localCenter.x, e = this.m_localAnchor1.y - this.m_bodyB.m_sweep.localCenter.y, f = b.col1.x * d + b.col2.x * e, e = b.col1.y * d + b.col2.y * e;
    return a * (this.m_impulse * this.m_J.angularB - f * this.m_impulse * this.m_J.linearB.y + e * this.m_impulse * this.m_J.linearB.x)
  };
  r.prototype.GetRatio = function() {
    return this.m_ratio
  };
  r.prototype.SetRatio = function(a) {
    a === void 0 && (a = 0);
    this.m_ratio = a
  };
  r.prototype.b2GearJoint = function(a) {
    this.__super.b2Joint.call(this, a);
    var b = parseInt(a.joint1.m_type), d = parseInt(a.joint2.m_type);
    this.m_prismatic2 = this.m_revolute2 = this.m_prismatic1 = this.m_revolute1 = null;
    var e = 0, f = 0;
    this.m_ground1 = a.joint1.GetBodyA();
    this.m_bodyA = a.joint1.GetBodyB();
    b == o.e_revoluteJoint ? (this.m_revolute1 = a.joint1 instanceof m ? a.joint1 : null, this.m_groundAnchor1.SetV(this.m_revolute1.m_localAnchor1), this.m_localAnchor1.SetV(this.m_revolute1.m_localAnchor2), e = this.m_revolute1.GetJointAngle()) : (this.m_prismatic1 = a.joint1 instanceof B ? a.joint1 : null, this.m_groundAnchor1.SetV(this.m_prismatic1.m_localAnchor1), this.m_localAnchor1.SetV(this.m_prismatic1.m_localAnchor2), e = this.m_prismatic1.GetJointTranslation());
    this.m_ground2 = a.joint2.GetBodyA();
    this.m_bodyB = a.joint2.GetBodyB();
    d == o.e_revoluteJoint ? (this.m_revolute2 = a.joint2 instanceof m ? a.joint2 : null, this.m_groundAnchor2.SetV(this.m_revolute2.m_localAnchor1), this.m_localAnchor2.SetV(this.m_revolute2.m_localAnchor2), f = this.m_revolute2.GetJointAngle()) : (this.m_prismatic2 = a.joint2 instanceof B ? a.joint2 : null, this.m_groundAnchor2.SetV(this.m_prismatic2.m_localAnchor1), this.m_localAnchor2.SetV(this.m_prismatic2.m_localAnchor2), f = this.m_prismatic2.GetJointTranslation());
    this.m_ratio = a.ratio;
    this.m_constant = e + this.m_ratio * f;
    this.m_impulse = 0
  };
  r.prototype.InitVelocityConstraints = function(a) {
    var b = this.m_ground1, d = this.m_ground2, e = this.m_bodyA, f = this.m_bodyB, g = 0, h = 0, j = 0, l = 0, m = j = 0, o = 0;
    this.m_J.SetZero();
    this.m_revolute1 ? (this.m_J.angularA = -1, o += e.m_invI) : (b = b.m_xf.R, h = this.m_prismatic1.m_localXAxis1, g = b.col1.x * h.x + b.col2.x * h.y, h = b.col1.y * h.x + b.col2.y * h.y, b = e.m_xf.R, j = this.m_localAnchor1.x - e.m_sweep.localCenter.x, l = this.m_localAnchor1.y - e.m_sweep.localCenter.y, m = b.col1.x * j + b.col2.x * l, l = b.col1.y * j + b.col2.y * l, j = m * h - l * g, this.m_J.linearA.Set(-g, -h), this.m_J.angularA = -j, o += e.m_invMass + e.m_invI * j * j);
    this.m_revolute2 ? (this.m_J.angularB = -this.m_ratio, o += this.m_ratio * this.m_ratio * f.m_invI) : (b = d.m_xf.R, h = this.m_prismatic2.m_localXAxis1, g = b.col1.x * h.x + b.col2.x * h.y, h = b.col1.y * h.x + b.col2.y * h.y, b = f.m_xf.R, j = this.m_localAnchor2.x - f.m_sweep.localCenter.x, l = this.m_localAnchor2.y - f.m_sweep.localCenter.y, m = b.col1.x * j + b.col2.x * l, l = b.col1.y * j + b.col2.y * l, j = m * h - l * g, this.m_J.linearB.Set(-this.m_ratio * g, -this.m_ratio * h), this.m_J.angularB = 
    -this.m_ratio * j, o += this.m_ratio * this.m_ratio * (f.m_invMass + f.m_invI * j * j));
    this.m_mass = o > 0 ? 1 / o : 0;
    a.warmStarting ? (e.m_linearVelocity.x += e.m_invMass * this.m_impulse * this.m_J.linearA.x, e.m_linearVelocity.y += e.m_invMass * this.m_impulse * this.m_J.linearA.y, e.m_angularVelocity += e.m_invI * this.m_impulse * this.m_J.angularA, f.m_linearVelocity.x += f.m_invMass * this.m_impulse * this.m_J.linearB.x, f.m_linearVelocity.y += f.m_invMass * this.m_impulse * this.m_J.linearB.y, f.m_angularVelocity += f.m_invI * this.m_impulse * this.m_J.angularB) : this.m_impulse = 0
  };
  r.prototype.SolveVelocityConstraints = function() {
    var a = this.m_bodyA, b = this.m_bodyB, d = -this.m_mass * this.m_J.Compute(a.m_linearVelocity, a.m_angularVelocity, b.m_linearVelocity, b.m_angularVelocity);
    this.m_impulse += d;
    a.m_linearVelocity.x += a.m_invMass * d * this.m_J.linearA.x;
    a.m_linearVelocity.y += a.m_invMass * d * this.m_J.linearA.y;
    a.m_angularVelocity += a.m_invI * d * this.m_J.angularA;
    b.m_linearVelocity.x += b.m_invMass * d * this.m_J.linearB.x;
    b.m_linearVelocity.y += b.m_invMass * d * this.m_J.linearB.y;
    b.m_angularVelocity += b.m_invI * d * this.m_J.angularB
  };
  r.prototype.SolvePositionConstraints = function() {
    var b = this.m_bodyA, d = this.m_bodyB, e = 0, f = 0, e = this.m_revolute1 ? this.m_revolute1.GetJointAngle() : this.m_prismatic1.GetJointTranslation(), f = this.m_revolute2 ? this.m_revolute2.GetJointAngle() : this.m_prismatic2.GetJointTranslation(), e = -this.m_mass * (this.m_constant - (e + this.m_ratio * f));
    b.m_sweep.c.x += b.m_invMass * e * this.m_J.linearA.x;
    b.m_sweep.c.y += b.m_invMass * e * this.m_J.linearA.y;
    b.m_sweep.a += b.m_invI * e * this.m_J.angularA;
    d.m_sweep.c.x += d.m_invMass * e * this.m_J.linearB.x;
    d.m_sweep.c.y += d.m_invMass * e * this.m_J.linearB.y;
    d.m_sweep.a += d.m_invI * e * this.m_J.angularB;
    b.SynchronizeTransform();
    d.SynchronizeTransform();
    return 0 < a.b2_linearSlop
  };
  Box2D.inherit(p, Box2D.Dynamics.Joints.b2JointDef);
  p.prototype.__super = Box2D.Dynamics.Joints.b2JointDef.prototype;
  p.b2GearJointDef = function() {
    Box2D.Dynamics.Joints.b2JointDef.b2JointDef.apply(this, arguments)
  };
  p.prototype.b2GearJointDef = function() {
    this.__super.b2JointDef.call(this);
    this.type = o.e_gearJoint;
    this.joint2 = this.joint1 = null;
    this.ratio = 1
  };
  v.b2Jacobian = function() {
    this.linearA = new g;
    this.linearB = new g
  };
  v.prototype.SetZero = function() {
    this.linearA.SetZero();
    this.angularA = 0;
    this.linearB.SetZero();
    this.angularB = 0
  };
  v.prototype.Set = function(a, b, d, e) {
    b === void 0 && (b = 0);
    e === void 0 && (e = 0);
    this.linearA.SetV(a);
    this.angularA = b;
    this.linearB.SetV(d);
    this.angularB = e
  };
  v.prototype.Compute = function(a, b, d, e) {
    b === void 0 && (b = 0);
    e === void 0 && (e = 0);
    return this.linearA.x * a.x + this.linearA.y * a.y + this.angularA * b + (this.linearB.x * d.x + this.linearB.y * d.y) + this.angularB * e
  };
  o.b2Joint = function() {
    this.m_edgeA = new x;
    this.m_edgeB = new x;
    this.m_localCenterA = new g;
    this.m_localCenterB = new g
  };
  o.prototype.GetType = function() {
    return this.m_type
  };
  o.prototype.GetAnchorA = function() {
    return null
  };
  o.prototype.GetAnchorB = function() {
    return null
  };
  o.prototype.GetReactionForce = function() {
    return null
  };
  o.prototype.GetReactionTorque = function() {
    return 0
  };
  o.prototype.GetBodyA = function() {
    return this.m_bodyA
  };
  o.prototype.GetBodyB = function() {
    return this.m_bodyB
  };
  o.prototype.GetNext = function() {
    return this.m_next
  };
  o.prototype.GetUserData = function() {
    return this.m_userData
  };
  o.prototype.SetUserData = function(a) {
    this.m_userData = a
  };
  o.prototype.IsActive = function() {
    return this.m_bodyA.IsActive() && this.m_bodyB.IsActive()
  };
  o.Create = function(a) {
    var b = null;
    switch(a.type) {
      case o.e_distanceJoint:
        b = new l(a instanceof h ? a : null);
        break;
      case o.e_mouseJoint:
        b = new u(a instanceof H ? a : null);
        break;
      case o.e_prismaticJoint:
        b = new B(a instanceof F ? a : null);
        break;
      case o.e_revoluteJoint:
        b = new m(a instanceof z ? a : null);
        break;
      case o.e_pulleyJoint:
        b = new G(a instanceof K ? a : null);
        break;
      case o.e_gearJoint:
        b = new r(a instanceof p ? a : null);
        break;
      case o.e_lineJoint:
        b = new t(a instanceof D ? a : null);
        break;
      case o.e_weldJoint:
        b = new I(a instanceof J ? a : null);
        break;
      case o.e_frictionJoint:
        b = new n(a instanceof j ? a : null)
    }
    return b
  };
  o.Destroy = function() {
  };
  o.prototype.b2Joint = function(b) {
    a.b2Assert(b.bodyA != b.bodyB);
    this.m_type = b.type;
    this.m_next = this.m_prev = null;
    this.m_bodyA = b.bodyA;
    this.m_bodyB = b.bodyB;
    this.m_collideConnected = b.collideConnected;
    this.m_islandFlag = !1;
    this.m_userData = b.userData
  };
  o.prototype.InitVelocityConstraints = function() {
  };
  o.prototype.SolveVelocityConstraints = function() {
  };
  o.prototype.FinalizeVelocityConstraints = function() {
  };
  o.prototype.SolvePositionConstraints = function() {
    return!1
  };
  Box2D.postDefs.push(function() {
    Box2D.Dynamics.Joints.b2Joint.e_unknownJoint = 0;
    Box2D.Dynamics.Joints.b2Joint.e_revoluteJoint = 1;
    Box2D.Dynamics.Joints.b2Joint.e_prismaticJoint = 2;
    Box2D.Dynamics.Joints.b2Joint.e_distanceJoint = 3;
    Box2D.Dynamics.Joints.b2Joint.e_pulleyJoint = 4;
    Box2D.Dynamics.Joints.b2Joint.e_mouseJoint = 5;
    Box2D.Dynamics.Joints.b2Joint.e_gearJoint = 6;
    Box2D.Dynamics.Joints.b2Joint.e_lineJoint = 7;
    Box2D.Dynamics.Joints.b2Joint.e_weldJoint = 8;
    Box2D.Dynamics.Joints.b2Joint.e_frictionJoint = 9;
    Box2D.Dynamics.Joints.b2Joint.e_inactiveLimit = 0;
    Box2D.Dynamics.Joints.b2Joint.e_atLowerLimit = 1;
    Box2D.Dynamics.Joints.b2Joint.e_atUpperLimit = 2;
    Box2D.Dynamics.Joints.b2Joint.e_equalLimits = 3
  });
  w.b2JointDef = function() {
  };
  w.prototype.b2JointDef = function() {
    this.type = o.e_unknownJoint;
    this.bodyB = this.bodyA = this.userData = null;
    this.collideConnected = !1
  };
  x.b2JointEdge = function() {
  };
  Box2D.inherit(t, Box2D.Dynamics.Joints.b2Joint);
  t.prototype.__super = Box2D.Dynamics.Joints.b2Joint.prototype;
  t.b2LineJoint = function() {
    Box2D.Dynamics.Joints.b2Joint.b2Joint.apply(this, arguments);
    this.m_localAnchor1 = new g;
    this.m_localAnchor2 = new g;
    this.m_localXAxis1 = new g;
    this.m_localYAxis1 = new g;
    this.m_axis = new g;
    this.m_perp = new g;
    this.m_K = new e;
    this.m_impulse = new g
  };
  t.prototype.GetAnchorA = function() {
    return this.m_bodyA.GetWorldPoint(this.m_localAnchor1)
  };
  t.prototype.GetAnchorB = function() {
    return this.m_bodyB.GetWorldPoint(this.m_localAnchor2)
  };
  t.prototype.GetReactionForce = function(a) {
    a === void 0 && (a = 0);
    return new g(a * (this.m_impulse.x * this.m_perp.x + (this.m_motorImpulse + this.m_impulse.y) * this.m_axis.x), a * (this.m_impulse.x * this.m_perp.y + (this.m_motorImpulse + this.m_impulse.y) * this.m_axis.y))
  };
  t.prototype.GetReactionTorque = function(a) {
    a === void 0 && (a = 0);
    return a * this.m_impulse.y
  };
  t.prototype.GetJointTranslation = function() {
    var a = this.m_bodyA, b = this.m_bodyB, d = a.GetWorldPoint(this.m_localAnchor1), e = b.GetWorldPoint(this.m_localAnchor2), b = e.x - d.x, d = e.y - d.y, a = a.GetWorldVector(this.m_localXAxis1);
    return a.x * b + a.y * d
  };
  t.prototype.GetJointSpeed = function() {
    var a = this.m_bodyA, b = this.m_bodyB, d;
    d = a.m_xf.R;
    var e = this.m_localAnchor1.x - a.m_sweep.localCenter.x, f = this.m_localAnchor1.y - a.m_sweep.localCenter.y, g = d.col1.x * e + d.col2.x * f, f = d.col1.y * e + d.col2.y * f, e = g;
    d = b.m_xf.R;
    var h = this.m_localAnchor2.x - b.m_sweep.localCenter.x, j = this.m_localAnchor2.y - b.m_sweep.localCenter.y, g = d.col1.x * h + d.col2.x * j, j = d.col1.y * h + d.col2.y * j, h = g;
    d = b.m_sweep.c.x + h - (a.m_sweep.c.x + e);
    var g = b.m_sweep.c.y + j - (a.m_sweep.c.y + f), l = a.GetWorldVector(this.m_localXAxis1), m = a.m_linearVelocity, o = b.m_linearVelocity, a = a.m_angularVelocity, b = b.m_angularVelocity;
    return d * -a * l.y + g * a * l.x + (l.x * (o.x + -b * j - m.x - -a * f) + l.y * (o.y + b * h - m.y - a * e))
  };
  t.prototype.IsLimitEnabled = function() {
    return this.m_enableLimit
  };
  t.prototype.EnableLimit = function(a) {
    this.m_bodyA.SetAwake(!0);
    this.m_bodyB.SetAwake(!0);
    this.m_enableLimit = a
  };
  t.prototype.GetLowerLimit = function() {
    return this.m_lowerTranslation
  };
  t.prototype.GetUpperLimit = function() {
    return this.m_upperTranslation
  };
  t.prototype.SetLimits = function(a, b) {
    a === void 0 && (a = 0);
    b === void 0 && (b = 0);
    this.m_bodyA.SetAwake(!0);
    this.m_bodyB.SetAwake(!0);
    this.m_lowerTranslation = a;
    this.m_upperTranslation = b
  };
  t.prototype.IsMotorEnabled = function() {
    return this.m_enableMotor
  };
  t.prototype.EnableMotor = function(a) {
    this.m_bodyA.SetAwake(!0);
    this.m_bodyB.SetAwake(!0);
    this.m_enableMotor = a
  };
  t.prototype.SetMotorSpeed = function(a) {
    a === void 0 && (a = 0);
    this.m_bodyA.SetAwake(!0);
    this.m_bodyB.SetAwake(!0);
    this.m_motorSpeed = a
  };
  t.prototype.GetMotorSpeed = function() {
    return this.m_motorSpeed
  };
  t.prototype.SetMaxMotorForce = function(a) {
    a === void 0 && (a = 0);
    this.m_bodyA.SetAwake(!0);
    this.m_bodyB.SetAwake(!0);
    this.m_maxMotorForce = a
  };
  t.prototype.GetMaxMotorForce = function() {
    return this.m_maxMotorForce
  };
  t.prototype.GetMotorForce = function() {
    return this.m_motorImpulse
  };
  t.prototype.b2LineJoint = function(a) {
    this.__super.b2Joint.call(this, a);
    this.m_localAnchor1.SetV(a.localAnchorA);
    this.m_localAnchor2.SetV(a.localAnchorB);
    this.m_localXAxis1.SetV(a.localAxisA);
    this.m_localYAxis1.x = -this.m_localXAxis1.y;
    this.m_localYAxis1.y = this.m_localXAxis1.x;
    this.m_impulse.SetZero();
    this.m_motorImpulse = this.m_motorMass = 0;
    this.m_lowerTranslation = a.lowerTranslation;
    this.m_upperTranslation = a.upperTranslation;
    this.m_maxMotorForce = a.maxMotorForce;
    this.m_motorSpeed = a.motorSpeed;
    this.m_enableLimit = a.enableLimit;
    this.m_enableMotor = a.enableMotor;
    this.m_limitState = o.e_inactiveLimit;
    this.m_axis.SetZero();
    this.m_perp.SetZero()
  };
  t.prototype.InitVelocityConstraints = function(d) {
    var e = this.m_bodyA, f = this.m_bodyB, g, h = 0;
    this.m_localCenterA.SetV(e.GetLocalCenter());
    this.m_localCenterB.SetV(f.GetLocalCenter());
    var j = e.GetTransform();
    f.GetTransform();
    g = e.m_xf.R;
    var l = this.m_localAnchor1.x - this.m_localCenterA.x, m = this.m_localAnchor1.y - this.m_localCenterA.y, h = g.col1.x * l + g.col2.x * m, m = g.col1.y * l + g.col2.y * m, l = h;
    g = f.m_xf.R;
    var n = this.m_localAnchor2.x - this.m_localCenterB.x, C = this.m_localAnchor2.y - this.m_localCenterB.y, h = g.col1.x * n + g.col2.x * C, C = g.col1.y * n + g.col2.y * C, n = h;
    g = f.m_sweep.c.x + n - e.m_sweep.c.x - l;
    h = f.m_sweep.c.y + C - e.m_sweep.c.y - m;
    this.m_invMassA = e.m_invMass;
    this.m_invMassB = f.m_invMass;
    this.m_invIA = e.m_invI;
    this.m_invIB = f.m_invI;
    this.m_axis.SetV(b.MulMV(j.R, this.m_localXAxis1));
    this.m_a1 = (g + l) * this.m_axis.y - (h + m) * this.m_axis.x;
    this.m_a2 = n * this.m_axis.y - C * this.m_axis.x;
    this.m_motorMass = this.m_invMassA + this.m_invMassB + this.m_invIA * this.m_a1 * this.m_a1 + this.m_invIB * this.m_a2 * this.m_a2;
    this.m_motorMass = this.m_motorMass > Number.MIN_VALUE ? 1 / this.m_motorMass : 0;
    this.m_perp.SetV(b.MulMV(j.R, this.m_localYAxis1));
    this.m_s1 = (g + l) * this.m_perp.y - (h + m) * this.m_perp.x;
    this.m_s2 = n * this.m_perp.y - C * this.m_perp.x;
    j = this.m_invMassA;
    l = this.m_invMassB;
    m = this.m_invIA;
    n = this.m_invIB;
    this.m_K.col1.x = j + l + m * this.m_s1 * this.m_s1 + n * this.m_s2 * this.m_s2;
    this.m_K.col1.y = m * this.m_s1 * this.m_a1 + n * this.m_s2 * this.m_a2;
    this.m_K.col2.x = this.m_K.col1.y;
    this.m_K.col2.y = j + l + m * this.m_a1 * this.m_a1 + n * this.m_a2 * this.m_a2;
    if(this.m_enableLimit) {
      if(g = this.m_axis.x * g + this.m_axis.y * h, b.Abs(this.m_upperTranslation - this.m_lowerTranslation) < 2 * a.b2_linearSlop) {
        this.m_limitState = o.e_equalLimits
      }else {
        if(g <= this.m_lowerTranslation) {
          if(this.m_limitState != o.e_atLowerLimit) {
            this.m_limitState = o.e_atLowerLimit, this.m_impulse.y = 0
          }
        }else {
          if(g >= this.m_upperTranslation) {
            if(this.m_limitState != o.e_atUpperLimit) {
              this.m_limitState = o.e_atUpperLimit, this.m_impulse.y = 0
            }
          }else {
            this.m_limitState = o.e_inactiveLimit, this.m_impulse.y = 0
          }
        }
      }
    }else {
      this.m_limitState = o.e_inactiveLimit
    }
    if(this.m_enableMotor == !1) {
      this.m_motorImpulse = 0
    }
    d.warmStarting ? (this.m_impulse.x *= d.dtRatio, this.m_impulse.y *= d.dtRatio, this.m_motorImpulse *= d.dtRatio, d = this.m_impulse.x * this.m_perp.x + (this.m_motorImpulse + this.m_impulse.y) * this.m_axis.x, g = this.m_impulse.x * this.m_perp.y + (this.m_motorImpulse + this.m_impulse.y) * this.m_axis.y, h = this.m_impulse.x * this.m_s1 + (this.m_motorImpulse + this.m_impulse.y) * this.m_a1, j = this.m_impulse.x * this.m_s2 + (this.m_motorImpulse + this.m_impulse.y) * this.m_a2, e.m_linearVelocity.x -= 
    this.m_invMassA * d, e.m_linearVelocity.y -= this.m_invMassA * g, e.m_angularVelocity -= this.m_invIA * h, f.m_linearVelocity.x += this.m_invMassB * d, f.m_linearVelocity.y += this.m_invMassB * g, f.m_angularVelocity += this.m_invIB * j) : (this.m_impulse.SetZero(), this.m_motorImpulse = 0)
  };
  t.prototype.SolveVelocityConstraints = function(a) {
    var d = this.m_bodyA, e = this.m_bodyB, f = d.m_linearVelocity, h = d.m_angularVelocity, j = e.m_linearVelocity, l = e.m_angularVelocity, m = 0, n = 0, C = 0, p = 0;
    if(this.m_enableMotor && this.m_limitState != o.e_equalLimits) {
      p = this.m_motorMass * (this.m_motorSpeed - (this.m_axis.x * (j.x - f.x) + this.m_axis.y * (j.y - f.y) + this.m_a2 * l - this.m_a1 * h)), m = this.m_motorImpulse, n = a.dt * this.m_maxMotorForce, this.m_motorImpulse = b.Clamp(this.m_motorImpulse + p, -n, n), p = this.m_motorImpulse - m, m = p * this.m_axis.x, n = p * this.m_axis.y, C = p * this.m_a1, p *= this.m_a2, f.x -= this.m_invMassA * m, f.y -= this.m_invMassA * n, h -= this.m_invIA * C, j.x += this.m_invMassB * m, j.y += this.m_invMassB * 
      n, l += this.m_invIB * p
    }
    n = this.m_perp.x * (j.x - f.x) + this.m_perp.y * (j.y - f.y) + this.m_s2 * l - this.m_s1 * h;
    if(this.m_enableLimit && this.m_limitState != o.e_inactiveLimit) {
      C = this.m_axis.x * (j.x - f.x) + this.m_axis.y * (j.y - f.y) + this.m_a2 * l - this.m_a1 * h;
      m = this.m_impulse.Copy();
      a = this.m_K.Solve(new g, -n, -C);
      this.m_impulse.Add(a);
      if(this.m_limitState == o.e_atLowerLimit) {
        this.m_impulse.y = b.Max(this.m_impulse.y, 0)
      }else {
        if(this.m_limitState == o.e_atUpperLimit) {
          this.m_impulse.y = b.Min(this.m_impulse.y, 0)
        }
      }
      n = -n - (this.m_impulse.y - m.y) * this.m_K.col2.x;
      C = 0;
      C = this.m_K.col1.x != 0 ? n / this.m_K.col1.x + m.x : m.x;
      this.m_impulse.x = C;
      a.x = this.m_impulse.x - m.x;
      a.y = this.m_impulse.y - m.y;
      m = a.x * this.m_perp.x + a.y * this.m_axis.x;
      n = a.x * this.m_perp.y + a.y * this.m_axis.y;
      C = a.x * this.m_s1 + a.y * this.m_a1;
      p = a.x * this.m_s2 + a.y * this.m_a2
    }else {
      a = 0, a = this.m_K.col1.x != 0 ? -n / this.m_K.col1.x : 0, this.m_impulse.x += a, m = a * this.m_perp.x, n = a * this.m_perp.y, C = a * this.m_s1, p = a * this.m_s2
    }
    f.x -= this.m_invMassA * m;
    f.y -= this.m_invMassA * n;
    h -= this.m_invIA * C;
    j.x += this.m_invMassB * m;
    j.y += this.m_invMassB * n;
    l += this.m_invIB * p;
    d.m_linearVelocity.SetV(f);
    d.m_angularVelocity = h;
    e.m_linearVelocity.SetV(j);
    e.m_angularVelocity = l
  };
  t.prototype.SolvePositionConstraints = function() {
    var d = this.m_bodyA, f = this.m_bodyB, h = d.m_sweep.c, j = d.m_sweep.a, l = f.m_sweep.c, m = f.m_sweep.a, y, n = 0, o = 0, C = 0, p = 0, t = y = 0, r = 0, o = !1, w = 0, v = e.FromAngle(j), C = e.FromAngle(m);
    y = v;
    var r = this.m_localAnchor1.x - this.m_localCenterA.x, u = this.m_localAnchor1.y - this.m_localCenterA.y, n = y.col1.x * r + y.col2.x * u, u = y.col1.y * r + y.col2.y * u, r = n;
    y = C;
    C = this.m_localAnchor2.x - this.m_localCenterB.x;
    p = this.m_localAnchor2.y - this.m_localCenterB.y;
    n = y.col1.x * C + y.col2.x * p;
    p = y.col1.y * C + y.col2.y * p;
    C = n;
    y = l.x + C - h.x - r;
    n = l.y + p - h.y - u;
    if(this.m_enableLimit) {
      this.m_axis = b.MulMV(v, this.m_localXAxis1);
      this.m_a1 = (y + r) * this.m_axis.y - (n + u) * this.m_axis.x;
      this.m_a2 = C * this.m_axis.y - p * this.m_axis.x;
      var x = this.m_axis.x * y + this.m_axis.y * n;
      b.Abs(this.m_upperTranslation - this.m_lowerTranslation) < 2 * a.b2_linearSlop ? (w = b.Clamp(x, -a.b2_maxLinearCorrection, a.b2_maxLinearCorrection), t = b.Abs(x), o = !0) : x <= this.m_lowerTranslation ? (w = b.Clamp(x - this.m_lowerTranslation + a.b2_linearSlop, -a.b2_maxLinearCorrection, 0), t = this.m_lowerTranslation - x, o = !0) : x >= this.m_upperTranslation && (w = b.Clamp(x - this.m_upperTranslation + a.b2_linearSlop, 0, a.b2_maxLinearCorrection), t = x - this.m_upperTranslation, 
      o = !0)
    }
    this.m_perp = b.MulMV(v, this.m_localYAxis1);
    this.m_s1 = (y + r) * this.m_perp.y - (n + u) * this.m_perp.x;
    this.m_s2 = C * this.m_perp.y - p * this.m_perp.x;
    v = new g;
    u = this.m_perp.x * y + this.m_perp.y * n;
    t = b.Max(t, b.Abs(u));
    r = 0;
    o ? (o = this.m_invMassA, C = this.m_invMassB, p = this.m_invIA, y = this.m_invIB, this.m_K.col1.x = o + C + p * this.m_s1 * this.m_s1 + y * this.m_s2 * this.m_s2, this.m_K.col1.y = p * this.m_s1 * this.m_a1 + y * this.m_s2 * this.m_a2, this.m_K.col2.x = this.m_K.col1.y, this.m_K.col2.y = o + C + p * this.m_a1 * this.m_a1 + y * this.m_a2 * this.m_a2, this.m_K.Solve(v, -u, -w)) : (o = this.m_invMassA, C = this.m_invMassB, p = this.m_invIA, y = this.m_invIB, w = o + C + p * this.m_s1 * this.m_s1 + 
    y * this.m_s2 * this.m_s2, o = 0, v.x = w != 0 ? -u / w : 0, v.y = 0);
    w = v.x * this.m_perp.x + v.y * this.m_axis.x;
    o = v.x * this.m_perp.y + v.y * this.m_axis.y;
    u = v.x * this.m_s1 + v.y * this.m_a1;
    v = v.x * this.m_s2 + v.y * this.m_a2;
    h.x -= this.m_invMassA * w;
    h.y -= this.m_invMassA * o;
    j -= this.m_invIA * u;
    l.x += this.m_invMassB * w;
    l.y += this.m_invMassB * o;
    m += this.m_invIB * v;
    d.m_sweep.a = j;
    f.m_sweep.a = m;
    d.SynchronizeTransform();
    f.SynchronizeTransform();
    return t <= a.b2_linearSlop && r <= a.b2_angularSlop
  };
  Box2D.inherit(D, Box2D.Dynamics.Joints.b2JointDef);
  D.prototype.__super = Box2D.Dynamics.Joints.b2JointDef.prototype;
  D.b2LineJointDef = function() {
    Box2D.Dynamics.Joints.b2JointDef.b2JointDef.apply(this, arguments);
    this.localAnchorA = new g;
    this.localAnchorB = new g;
    this.localAxisA = new g
  };
  D.prototype.b2LineJointDef = function() {
    this.__super.b2JointDef.call(this);
    this.type = o.e_lineJoint;
    this.localAxisA.Set(1, 0);
    this.enableLimit = !1;
    this.upperTranslation = this.lowerTranslation = 0;
    this.enableMotor = !1;
    this.motorSpeed = this.maxMotorForce = 0
  };
  D.prototype.Initialize = function(a, b, d, e) {
    this.bodyA = a;
    this.bodyB = b;
    this.localAnchorA = this.bodyA.GetLocalPoint(d);
    this.localAnchorB = this.bodyB.GetLocalPoint(d);
    this.localAxisA = this.bodyA.GetLocalVector(e)
  };
  Box2D.inherit(u, Box2D.Dynamics.Joints.b2Joint);
  u.prototype.__super = Box2D.Dynamics.Joints.b2Joint.prototype;
  u.b2MouseJoint = function() {
    Box2D.Dynamics.Joints.b2Joint.b2Joint.apply(this, arguments);
    this.K = new e;
    this.K1 = new e;
    this.K2 = new e;
    this.m_localAnchor = new g;
    this.m_target = new g;
    this.m_impulse = new g;
    this.m_mass = new e;
    this.m_C = new g
  };
  u.prototype.GetAnchorA = function() {
    return this.m_target
  };
  u.prototype.GetAnchorB = function() {
    return this.m_bodyB.GetWorldPoint(this.m_localAnchor)
  };
  u.prototype.GetReactionForce = function(a) {
    a === void 0 && (a = 0);
    return new g(a * this.m_impulse.x, a * this.m_impulse.y)
  };
  u.prototype.GetReactionTorque = function() {
    return 0
  };
  u.prototype.GetTarget = function() {
    return this.m_target
  };
  u.prototype.SetTarget = function(a) {
    this.m_bodyB.IsAwake() == !1 && this.m_bodyB.SetAwake(!0);
    this.m_target = a
  };
  u.prototype.GetMaxForce = function() {
    return this.m_maxForce
  };
  u.prototype.SetMaxForce = function(a) {
    a === void 0 && (a = 0);
    this.m_maxForce = a
  };
  u.prototype.GetFrequency = function() {
    return this.m_frequencyHz
  };
  u.prototype.SetFrequency = function(a) {
    a === void 0 && (a = 0);
    this.m_frequencyHz = a
  };
  u.prototype.GetDampingRatio = function() {
    return this.m_dampingRatio
  };
  u.prototype.SetDampingRatio = function(a) {
    a === void 0 && (a = 0);
    this.m_dampingRatio = a
  };
  u.prototype.b2MouseJoint = function(a) {
    this.__super.b2Joint.call(this, a);
    this.m_target.SetV(a.target);
    var b = this.m_target.x - this.m_bodyB.m_xf.position.x, d = this.m_target.y - this.m_bodyB.m_xf.position.y, e = this.m_bodyB.m_xf.R;
    this.m_localAnchor.x = b * e.col1.x + d * e.col1.y;
    this.m_localAnchor.y = b * e.col2.x + d * e.col2.y;
    this.m_maxForce = a.maxForce;
    this.m_impulse.SetZero();
    this.m_frequencyHz = a.frequencyHz;
    this.m_dampingRatio = a.dampingRatio;
    this.m_gamma = this.m_beta = 0
  };
  u.prototype.InitVelocityConstraints = function(a) {
    var b = this.m_bodyB, d = b.GetMass(), e = 2 * Math.PI * this.m_frequencyHz, f = d * e * e;
    this.m_gamma = a.dt * (2 * d * this.m_dampingRatio * e + a.dt * f);
    this.m_gamma = this.m_gamma != 0 ? 1 / this.m_gamma : 0;
    this.m_beta = a.dt * f * this.m_gamma;
    var f = b.m_xf.R, d = this.m_localAnchor.x - b.m_sweep.localCenter.x, e = this.m_localAnchor.y - b.m_sweep.localCenter.y, g = f.col1.x * d + f.col2.x * e, e = f.col1.y * d + f.col2.y * e, d = g, f = b.m_invMass, g = b.m_invI;
    this.K1.col1.x = f;
    this.K1.col2.x = 0;
    this.K1.col1.y = 0;
    this.K1.col2.y = f;
    this.K2.col1.x = g * e * e;
    this.K2.col2.x = -g * d * e;
    this.K2.col1.y = -g * d * e;
    this.K2.col2.y = g * d * d;
    this.K.SetM(this.K1);
    this.K.AddM(this.K2);
    this.K.col1.x += this.m_gamma;
    this.K.col2.y += this.m_gamma;
    this.K.GetInverse(this.m_mass);
    this.m_C.x = b.m_sweep.c.x + d - this.m_target.x;
    this.m_C.y = b.m_sweep.c.y + e - this.m_target.y;
    b.m_angularVelocity *= 0.98;
    this.m_impulse.x *= a.dtRatio;
    this.m_impulse.y *= a.dtRatio;
    b.m_linearVelocity.x += f * this.m_impulse.x;
    b.m_linearVelocity.y += f * this.m_impulse.y;
    b.m_angularVelocity += g * (d * this.m_impulse.y - e * this.m_impulse.x)
  };
  u.prototype.SolveVelocityConstraints = function(a) {
    var b = this.m_bodyB, d, e = 0, f = 0;
    d = b.m_xf.R;
    var g = this.m_localAnchor.x - b.m_sweep.localCenter.x, h = this.m_localAnchor.y - b.m_sweep.localCenter.y, e = d.col1.x * g + d.col2.x * h, h = d.col1.y * g + d.col2.y * h, g = e, e = b.m_linearVelocity.x + -b.m_angularVelocity * h, j = b.m_linearVelocity.y + b.m_angularVelocity * g;
    d = this.m_mass;
    e = e + this.m_beta * this.m_C.x + this.m_gamma * this.m_impulse.x;
    f = j + this.m_beta * this.m_C.y + this.m_gamma * this.m_impulse.y;
    j = -(d.col1.x * e + d.col2.x * f);
    f = -(d.col1.y * e + d.col2.y * f);
    d = this.m_impulse.x;
    e = this.m_impulse.y;
    this.m_impulse.x += j;
    this.m_impulse.y += f;
    a = a.dt * this.m_maxForce;
    this.m_impulse.LengthSquared() > a * a && this.m_impulse.Multiply(a / this.m_impulse.Length());
    j = this.m_impulse.x - d;
    f = this.m_impulse.y - e;
    b.m_linearVelocity.x += b.m_invMass * j;
    b.m_linearVelocity.y += b.m_invMass * f;
    b.m_angularVelocity += b.m_invI * (g * f - h * j)
  };
  u.prototype.SolvePositionConstraints = function() {
    return!0
  };
  Box2D.inherit(H, Box2D.Dynamics.Joints.b2JointDef);
  H.prototype.__super = Box2D.Dynamics.Joints.b2JointDef.prototype;
  H.b2MouseJointDef = function() {
    Box2D.Dynamics.Joints.b2JointDef.b2JointDef.apply(this, arguments);
    this.target = new g
  };
  H.prototype.b2MouseJointDef = function() {
    this.__super.b2JointDef.call(this);
    this.type = o.e_mouseJoint;
    this.maxForce = 0;
    this.frequencyHz = 5;
    this.dampingRatio = 0.7
  };
  Box2D.inherit(B, Box2D.Dynamics.Joints.b2Joint);
  B.prototype.__super = Box2D.Dynamics.Joints.b2Joint.prototype;
  B.b2PrismaticJoint = function() {
    Box2D.Dynamics.Joints.b2Joint.b2Joint.apply(this, arguments);
    this.m_localAnchor1 = new g;
    this.m_localAnchor2 = new g;
    this.m_localXAxis1 = new g;
    this.m_localYAxis1 = new g;
    this.m_axis = new g;
    this.m_perp = new g;
    this.m_K = new d;
    this.m_impulse = new f
  };
  B.prototype.GetAnchorA = function() {
    return this.m_bodyA.GetWorldPoint(this.m_localAnchor1)
  };
  B.prototype.GetAnchorB = function() {
    return this.m_bodyB.GetWorldPoint(this.m_localAnchor2)
  };
  B.prototype.GetReactionForce = function(a) {
    a === void 0 && (a = 0);
    return new g(a * (this.m_impulse.x * this.m_perp.x + (this.m_motorImpulse + this.m_impulse.z) * this.m_axis.x), a * (this.m_impulse.x * this.m_perp.y + (this.m_motorImpulse + this.m_impulse.z) * this.m_axis.y))
  };
  B.prototype.GetReactionTorque = function(a) {
    a === void 0 && (a = 0);
    return a * this.m_impulse.y
  };
  B.prototype.GetJointTranslation = function() {
    var a = this.m_bodyA, b = this.m_bodyB, d = a.GetWorldPoint(this.m_localAnchor1), e = b.GetWorldPoint(this.m_localAnchor2), b = e.x - d.x, d = e.y - d.y, a = a.GetWorldVector(this.m_localXAxis1);
    return a.x * b + a.y * d
  };
  B.prototype.GetJointSpeed = function() {
    var a = this.m_bodyA, b = this.m_bodyB, d;
    d = a.m_xf.R;
    var e = this.m_localAnchor1.x - a.m_sweep.localCenter.x, f = this.m_localAnchor1.y - a.m_sweep.localCenter.y, g = d.col1.x * e + d.col2.x * f, f = d.col1.y * e + d.col2.y * f, e = g;
    d = b.m_xf.R;
    var h = this.m_localAnchor2.x - b.m_sweep.localCenter.x, j = this.m_localAnchor2.y - b.m_sweep.localCenter.y, g = d.col1.x * h + d.col2.x * j, j = d.col1.y * h + d.col2.y * j, h = g;
    d = b.m_sweep.c.x + h - (a.m_sweep.c.x + e);
    var g = b.m_sweep.c.y + j - (a.m_sweep.c.y + f), l = a.GetWorldVector(this.m_localXAxis1), m = a.m_linearVelocity, n = b.m_linearVelocity, a = a.m_angularVelocity, b = b.m_angularVelocity;
    return d * -a * l.y + g * a * l.x + (l.x * (n.x + -b * j - m.x - -a * f) + l.y * (n.y + b * h - m.y - a * e))
  };
  B.prototype.IsLimitEnabled = function() {
    return this.m_enableLimit
  };
  B.prototype.EnableLimit = function(a) {
    this.m_bodyA.SetAwake(!0);
    this.m_bodyB.SetAwake(!0);
    this.m_enableLimit = a
  };
  B.prototype.GetLowerLimit = function() {
    return this.m_lowerTranslation
  };
  B.prototype.GetUpperLimit = function() {
    return this.m_upperTranslation
  };
  B.prototype.SetLimits = function(a, b) {
    a === void 0 && (a = 0);
    b === void 0 && (b = 0);
    this.m_bodyA.SetAwake(!0);
    this.m_bodyB.SetAwake(!0);
    this.m_lowerTranslation = a;
    this.m_upperTranslation = b
  };
  B.prototype.IsMotorEnabled = function() {
    return this.m_enableMotor
  };
  B.prototype.EnableMotor = function(a) {
    this.m_bodyA.SetAwake(!0);
    this.m_bodyB.SetAwake(!0);
    this.m_enableMotor = a
  };
  B.prototype.SetMotorSpeed = function(a) {
    a === void 0 && (a = 0);
    this.m_bodyA.SetAwake(!0);
    this.m_bodyB.SetAwake(!0);
    this.m_motorSpeed = a
  };
  B.prototype.GetMotorSpeed = function() {
    return this.m_motorSpeed
  };
  B.prototype.SetMaxMotorForce = function(a) {
    a === void 0 && (a = 0);
    this.m_bodyA.SetAwake(!0);
    this.m_bodyB.SetAwake(!0);
    this.m_maxMotorForce = a
  };
  B.prototype.GetMotorForce = function() {
    return this.m_motorImpulse
  };
  B.prototype.b2PrismaticJoint = function(a) {
    this.__super.b2Joint.call(this, a);
    this.m_localAnchor1.SetV(a.localAnchorA);
    this.m_localAnchor2.SetV(a.localAnchorB);
    this.m_localXAxis1.SetV(a.localAxisA);
    this.m_localYAxis1.x = -this.m_localXAxis1.y;
    this.m_localYAxis1.y = this.m_localXAxis1.x;
    this.m_refAngle = a.referenceAngle;
    this.m_impulse.SetZero();
    this.m_motorImpulse = this.m_motorMass = 0;
    this.m_lowerTranslation = a.lowerTranslation;
    this.m_upperTranslation = a.upperTranslation;
    this.m_maxMotorForce = a.maxMotorForce;
    this.m_motorSpeed = a.motorSpeed;
    this.m_enableLimit = a.enableLimit;
    this.m_enableMotor = a.enableMotor;
    this.m_limitState = o.e_inactiveLimit;
    this.m_axis.SetZero();
    this.m_perp.SetZero()
  };
  B.prototype.InitVelocityConstraints = function(d) {
    var e = this.m_bodyA, f = this.m_bodyB, g, h = 0;
    this.m_localCenterA.SetV(e.GetLocalCenter());
    this.m_localCenterB.SetV(f.GetLocalCenter());
    var j = e.GetTransform();
    f.GetTransform();
    g = e.m_xf.R;
    var l = this.m_localAnchor1.x - this.m_localCenterA.x, m = this.m_localAnchor1.y - this.m_localCenterA.y, h = g.col1.x * l + g.col2.x * m, m = g.col1.y * l + g.col2.y * m, l = h;
    g = f.m_xf.R;
    var n = this.m_localAnchor2.x - this.m_localCenterB.x, p = this.m_localAnchor2.y - this.m_localCenterB.y, h = g.col1.x * n + g.col2.x * p, p = g.col1.y * n + g.col2.y * p, n = h;
    g = f.m_sweep.c.x + n - e.m_sweep.c.x - l;
    h = f.m_sweep.c.y + p - e.m_sweep.c.y - m;
    this.m_invMassA = e.m_invMass;
    this.m_invMassB = f.m_invMass;
    this.m_invIA = e.m_invI;
    this.m_invIB = f.m_invI;
    this.m_axis.SetV(b.MulMV(j.R, this.m_localXAxis1));
    this.m_a1 = (g + l) * this.m_axis.y - (h + m) * this.m_axis.x;
    this.m_a2 = n * this.m_axis.y - p * this.m_axis.x;
    this.m_motorMass = this.m_invMassA + this.m_invMassB + this.m_invIA * this.m_a1 * this.m_a1 + this.m_invIB * this.m_a2 * this.m_a2;
    if(this.m_motorMass > Number.MIN_VALUE) {
      this.m_motorMass = 1 / this.m_motorMass
    }
    this.m_perp.SetV(b.MulMV(j.R, this.m_localYAxis1));
    this.m_s1 = (g + l) * this.m_perp.y - (h + m) * this.m_perp.x;
    this.m_s2 = n * this.m_perp.y - p * this.m_perp.x;
    j = this.m_invMassA;
    l = this.m_invMassB;
    m = this.m_invIA;
    n = this.m_invIB;
    this.m_K.col1.x = j + l + m * this.m_s1 * this.m_s1 + n * this.m_s2 * this.m_s2;
    this.m_K.col1.y = m * this.m_s1 + n * this.m_s2;
    this.m_K.col1.z = m * this.m_s1 * this.m_a1 + n * this.m_s2 * this.m_a2;
    this.m_K.col2.x = this.m_K.col1.y;
    this.m_K.col2.y = m + n;
    this.m_K.col2.z = m * this.m_a1 + n * this.m_a2;
    this.m_K.col3.x = this.m_K.col1.z;
    this.m_K.col3.y = this.m_K.col2.z;
    this.m_K.col3.z = j + l + m * this.m_a1 * this.m_a1 + n * this.m_a2 * this.m_a2;
    if(this.m_enableLimit) {
      if(g = this.m_axis.x * g + this.m_axis.y * h, b.Abs(this.m_upperTranslation - this.m_lowerTranslation) < 2 * a.b2_linearSlop) {
        this.m_limitState = o.e_equalLimits
      }else {
        if(g <= this.m_lowerTranslation) {
          if(this.m_limitState != o.e_atLowerLimit) {
            this.m_limitState = o.e_atLowerLimit, this.m_impulse.z = 0
          }
        }else {
          if(g >= this.m_upperTranslation) {
            if(this.m_limitState != o.e_atUpperLimit) {
              this.m_limitState = o.e_atUpperLimit, this.m_impulse.z = 0
            }
          }else {
            this.m_limitState = o.e_inactiveLimit, this.m_impulse.z = 0
          }
        }
      }
    }else {
      this.m_limitState = o.e_inactiveLimit
    }
    if(this.m_enableMotor == !1) {
      this.m_motorImpulse = 0
    }
    d.warmStarting ? (this.m_impulse.x *= d.dtRatio, this.m_impulse.y *= d.dtRatio, this.m_motorImpulse *= d.dtRatio, d = this.m_impulse.x * this.m_perp.x + (this.m_motorImpulse + this.m_impulse.z) * this.m_axis.x, g = this.m_impulse.x * this.m_perp.y + (this.m_motorImpulse + this.m_impulse.z) * this.m_axis.y, h = this.m_impulse.x * this.m_s1 + this.m_impulse.y + (this.m_motorImpulse + this.m_impulse.z) * this.m_a1, j = this.m_impulse.x * this.m_s2 + this.m_impulse.y + (this.m_motorImpulse + this.m_impulse.z) * 
    this.m_a2, e.m_linearVelocity.x -= this.m_invMassA * d, e.m_linearVelocity.y -= this.m_invMassA * g, e.m_angularVelocity -= this.m_invIA * h, f.m_linearVelocity.x += this.m_invMassB * d, f.m_linearVelocity.y += this.m_invMassB * g, f.m_angularVelocity += this.m_invIB * j) : (this.m_impulse.SetZero(), this.m_motorImpulse = 0)
  };
  B.prototype.SolveVelocityConstraints = function(a) {
    var d = this.m_bodyA, e = this.m_bodyB, h = d.m_linearVelocity, j = d.m_angularVelocity, l = e.m_linearVelocity, m = e.m_angularVelocity, n = 0, p = 0, C = 0, r = 0;
    if(this.m_enableMotor && this.m_limitState != o.e_equalLimits) {
      r = this.m_motorMass * (this.m_motorSpeed - (this.m_axis.x * (l.x - h.x) + this.m_axis.y * (l.y - h.y) + this.m_a2 * m - this.m_a1 * j)), n = this.m_motorImpulse, a = a.dt * this.m_maxMotorForce, this.m_motorImpulse = b.Clamp(this.m_motorImpulse + r, -a, a), r = this.m_motorImpulse - n, n = r * this.m_axis.x, p = r * this.m_axis.y, C = r * this.m_a1, r *= this.m_a2, h.x -= this.m_invMassA * n, h.y -= this.m_invMassA * p, j -= this.m_invIA * C, l.x += this.m_invMassB * n, l.y += this.m_invMassB * 
      p, m += this.m_invIB * r
    }
    C = this.m_perp.x * (l.x - h.x) + this.m_perp.y * (l.y - h.y) + this.m_s2 * m - this.m_s1 * j;
    p = m - j;
    if(this.m_enableLimit && this.m_limitState != o.e_inactiveLimit) {
      a = this.m_axis.x * (l.x - h.x) + this.m_axis.y * (l.y - h.y) + this.m_a2 * m - this.m_a1 * j;
      n = this.m_impulse.Copy();
      a = this.m_K.Solve33(new f, -C, -p, -a);
      this.m_impulse.Add(a);
      if(this.m_limitState == o.e_atLowerLimit) {
        this.m_impulse.z = b.Max(this.m_impulse.z, 0)
      }else {
        if(this.m_limitState == o.e_atUpperLimit) {
          this.m_impulse.z = b.Min(this.m_impulse.z, 0)
        }
      }
      C = -C - (this.m_impulse.z - n.z) * this.m_K.col3.x;
      p = -p - (this.m_impulse.z - n.z) * this.m_K.col3.y;
      p = this.m_K.Solve22(new g, C, p);
      p.x += n.x;
      p.y += n.y;
      this.m_impulse.x = p.x;
      this.m_impulse.y = p.y;
      a.x = this.m_impulse.x - n.x;
      a.y = this.m_impulse.y - n.y;
      a.z = this.m_impulse.z - n.z;
      n = a.x * this.m_perp.x + a.z * this.m_axis.x;
      p = a.x * this.m_perp.y + a.z * this.m_axis.y;
      C = a.x * this.m_s1 + a.y + a.z * this.m_a1;
      r = a.x * this.m_s2 + a.y + a.z * this.m_a2
    }else {
      a = this.m_K.Solve22(new g, -C, -p), this.m_impulse.x += a.x, this.m_impulse.y += a.y, n = a.x * this.m_perp.x, p = a.x * this.m_perp.y, C = a.x * this.m_s1 + a.y, r = a.x * this.m_s2 + a.y
    }
    h.x -= this.m_invMassA * n;
    h.y -= this.m_invMassA * p;
    j -= this.m_invIA * C;
    l.x += this.m_invMassB * n;
    l.y += this.m_invMassB * p;
    m += this.m_invIB * r;
    d.m_linearVelocity.SetV(h);
    d.m_angularVelocity = j;
    e.m_linearVelocity.SetV(l);
    e.m_angularVelocity = m
  };
  B.prototype.SolvePositionConstraints = function() {
    var d = this.m_bodyA, h = this.m_bodyB, j = d.m_sweep.c, l = d.m_sweep.a, m = h.m_sweep.c, n = h.m_sweep.a, o, p = 0, r = 0, C = 0, t = p = o = 0, v = 0, r = !1, w = 0, u = e.FromAngle(l), x = e.FromAngle(n);
    o = u;
    var v = this.m_localAnchor1.x - this.m_localCenterA.x, z = this.m_localAnchor1.y - this.m_localCenterA.y, p = o.col1.x * v + o.col2.x * z, z = o.col1.y * v + o.col2.y * z, v = p;
    o = x;
    x = this.m_localAnchor2.x - this.m_localCenterB.x;
    C = this.m_localAnchor2.y - this.m_localCenterB.y;
    p = o.col1.x * x + o.col2.x * C;
    C = o.col1.y * x + o.col2.y * C;
    x = p;
    o = m.x + x - j.x - v;
    p = m.y + C - j.y - z;
    if(this.m_enableLimit) {
      this.m_axis = b.MulMV(u, this.m_localXAxis1);
      this.m_a1 = (o + v) * this.m_axis.y - (p + z) * this.m_axis.x;
      this.m_a2 = x * this.m_axis.y - C * this.m_axis.x;
      var B = this.m_axis.x * o + this.m_axis.y * p;
      b.Abs(this.m_upperTranslation - this.m_lowerTranslation) < 2 * a.b2_linearSlop ? (w = b.Clamp(B, -a.b2_maxLinearCorrection, a.b2_maxLinearCorrection), t = b.Abs(B), r = !0) : B <= this.m_lowerTranslation ? (w = b.Clamp(B - this.m_lowerTranslation + a.b2_linearSlop, -a.b2_maxLinearCorrection, 0), t = this.m_lowerTranslation - B, r = !0) : B >= this.m_upperTranslation && (w = b.Clamp(B - this.m_upperTranslation + a.b2_linearSlop, 0, a.b2_maxLinearCorrection), t = B - this.m_upperTranslation, 
      r = !0)
    }
    this.m_perp = b.MulMV(u, this.m_localYAxis1);
    this.m_s1 = (o + v) * this.m_perp.y - (p + z) * this.m_perp.x;
    this.m_s2 = x * this.m_perp.y - C * this.m_perp.x;
    u = new f;
    z = this.m_perp.x * o + this.m_perp.y * p;
    x = n - l - this.m_refAngle;
    t = b.Max(t, b.Abs(z));
    v = b.Abs(x);
    r ? (r = this.m_invMassA, C = this.m_invMassB, o = this.m_invIA, p = this.m_invIB, this.m_K.col1.x = r + C + o * this.m_s1 * this.m_s1 + p * this.m_s2 * this.m_s2, this.m_K.col1.y = o * this.m_s1 + p * this.m_s2, this.m_K.col1.z = o * this.m_s1 * this.m_a1 + p * this.m_s2 * this.m_a2, this.m_K.col2.x = this.m_K.col1.y, this.m_K.col2.y = o + p, this.m_K.col2.z = o * this.m_a1 + p * this.m_a2, this.m_K.col3.x = this.m_K.col1.z, this.m_K.col3.y = this.m_K.col2.z, this.m_K.col3.z = r + C + o * this.m_a1 * 
    this.m_a1 + p * this.m_a2 * this.m_a2, this.m_K.Solve33(u, -z, -x, -w)) : (r = this.m_invMassA, C = this.m_invMassB, o = this.m_invIA, p = this.m_invIB, w = o * this.m_s1 + p * this.m_s2, B = o + p, this.m_K.col1.Set(r + C + o * this.m_s1 * this.m_s1 + p * this.m_s2 * this.m_s2, w, 0), this.m_K.col2.Set(w, B, 0), w = this.m_K.Solve22(new g, -z, -x), u.x = w.x, u.y = w.y, u.z = 0);
    w = u.x * this.m_perp.x + u.z * this.m_axis.x;
    r = u.x * this.m_perp.y + u.z * this.m_axis.y;
    z = u.x * this.m_s1 + u.y + u.z * this.m_a1;
    u = u.x * this.m_s2 + u.y + u.z * this.m_a2;
    j.x -= this.m_invMassA * w;
    j.y -= this.m_invMassA * r;
    l -= this.m_invIA * z;
    m.x += this.m_invMassB * w;
    m.y += this.m_invMassB * r;
    n += this.m_invIB * u;
    d.m_sweep.a = l;
    h.m_sweep.a = n;
    d.SynchronizeTransform();
    h.SynchronizeTransform();
    return t <= a.b2_linearSlop && v <= a.b2_angularSlop
  };
  Box2D.inherit(F, Box2D.Dynamics.Joints.b2JointDef);
  F.prototype.__super = Box2D.Dynamics.Joints.b2JointDef.prototype;
  F.b2PrismaticJointDef = function() {
    Box2D.Dynamics.Joints.b2JointDef.b2JointDef.apply(this, arguments);
    this.localAnchorA = new g;
    this.localAnchorB = new g;
    this.localAxisA = new g
  };
  F.prototype.b2PrismaticJointDef = function() {
    this.__super.b2JointDef.call(this);
    this.type = o.e_prismaticJoint;
    this.localAxisA.Set(1, 0);
    this.referenceAngle = 0;
    this.enableLimit = !1;
    this.upperTranslation = this.lowerTranslation = 0;
    this.enableMotor = !1;
    this.motorSpeed = this.maxMotorForce = 0
  };
  F.prototype.Initialize = function(a, b, d, e) {
    this.bodyA = a;
    this.bodyB = b;
    this.localAnchorA = this.bodyA.GetLocalPoint(d);
    this.localAnchorB = this.bodyB.GetLocalPoint(d);
    this.localAxisA = this.bodyA.GetLocalVector(e);
    this.referenceAngle = this.bodyB.GetAngle() - this.bodyA.GetAngle()
  };
  Box2D.inherit(G, Box2D.Dynamics.Joints.b2Joint);
  G.prototype.__super = Box2D.Dynamics.Joints.b2Joint.prototype;
  G.b2PulleyJoint = function() {
    Box2D.Dynamics.Joints.b2Joint.b2Joint.apply(this, arguments);
    this.m_groundAnchor1 = new g;
    this.m_groundAnchor2 = new g;
    this.m_localAnchor1 = new g;
    this.m_localAnchor2 = new g;
    this.m_u1 = new g;
    this.m_u2 = new g
  };
  G.prototype.GetAnchorA = function() {
    return this.m_bodyA.GetWorldPoint(this.m_localAnchor1)
  };
  G.prototype.GetAnchorB = function() {
    return this.m_bodyB.GetWorldPoint(this.m_localAnchor2)
  };
  G.prototype.GetReactionForce = function(a) {
    a === void 0 && (a = 0);
    return new g(a * this.m_impulse * this.m_u2.x, a * this.m_impulse * this.m_u2.y)
  };
  G.prototype.GetReactionTorque = function() {
    return 0
  };
  G.prototype.GetGroundAnchorA = function() {
    var a = this.m_ground.m_xf.position.Copy();
    a.Add(this.m_groundAnchor1);
    return a
  };
  G.prototype.GetGroundAnchorB = function() {
    var a = this.m_ground.m_xf.position.Copy();
    a.Add(this.m_groundAnchor2);
    return a
  };
  G.prototype.GetLength1 = function() {
    var a = this.m_bodyA.GetWorldPoint(this.m_localAnchor1), b = a.x - (this.m_ground.m_xf.position.x + this.m_groundAnchor1.x), a = a.y - (this.m_ground.m_xf.position.y + this.m_groundAnchor1.y);
    return Math.sqrt(b * b + a * a)
  };
  G.prototype.GetLength2 = function() {
    var a = this.m_bodyB.GetWorldPoint(this.m_localAnchor2), b = a.x - (this.m_ground.m_xf.position.x + this.m_groundAnchor2.x), a = a.y - (this.m_ground.m_xf.position.y + this.m_groundAnchor2.y);
    return Math.sqrt(b * b + a * a)
  };
  G.prototype.GetRatio = function() {
    return this.m_ratio
  };
  G.prototype.b2PulleyJoint = function(a) {
    this.__super.b2Joint.call(this, a);
    this.m_ground = this.m_bodyA.m_world.m_groundBody;
    this.m_groundAnchor1.x = a.groundAnchorA.x - this.m_ground.m_xf.position.x;
    this.m_groundAnchor1.y = a.groundAnchorA.y - this.m_ground.m_xf.position.y;
    this.m_groundAnchor2.x = a.groundAnchorB.x - this.m_ground.m_xf.position.x;
    this.m_groundAnchor2.y = a.groundAnchorB.y - this.m_ground.m_xf.position.y;
    this.m_localAnchor1.SetV(a.localAnchorA);
    this.m_localAnchor2.SetV(a.localAnchorB);
    this.m_ratio = a.ratio;
    this.m_constant = a.lengthA + this.m_ratio * a.lengthB;
    this.m_maxLength1 = b.Min(a.maxLengthA, this.m_constant - this.m_ratio * G.b2_minPulleyLength);
    this.m_maxLength2 = b.Min(a.maxLengthB, (this.m_constant - G.b2_minPulleyLength) / this.m_ratio);
    this.m_limitImpulse2 = this.m_limitImpulse1 = this.m_impulse = 0
  };
  G.prototype.InitVelocityConstraints = function(b) {
    var d = this.m_bodyA, e = this.m_bodyB, f;
    f = d.m_xf.R;
    var g = this.m_localAnchor1.x - d.m_sweep.localCenter.x, h = this.m_localAnchor1.y - d.m_sweep.localCenter.y, j = f.col1.x * g + f.col2.x * h, h = f.col1.y * g + f.col2.y * h, g = j;
    f = e.m_xf.R;
    var l = this.m_localAnchor2.x - e.m_sweep.localCenter.x, m = this.m_localAnchor2.y - e.m_sweep.localCenter.y, j = f.col1.x * l + f.col2.x * m, m = f.col1.y * l + f.col2.y * m, l = j;
    f = e.m_sweep.c.x + l;
    var j = e.m_sweep.c.y + m, n = this.m_ground.m_xf.position.x + this.m_groundAnchor2.x, p = this.m_ground.m_xf.position.y + this.m_groundAnchor2.y;
    this.m_u1.Set(d.m_sweep.c.x + g - (this.m_ground.m_xf.position.x + this.m_groundAnchor1.x), d.m_sweep.c.y + h - (this.m_ground.m_xf.position.y + this.m_groundAnchor1.y));
    this.m_u2.Set(f - n, j - p);
    f = this.m_u1.Length();
    j = this.m_u2.Length();
    f > a.b2_linearSlop ? this.m_u1.Multiply(1 / f) : this.m_u1.SetZero();
    j > a.b2_linearSlop ? this.m_u2.Multiply(1 / j) : this.m_u2.SetZero();
    this.m_constant - f - this.m_ratio * j > 0 ? (this.m_state = o.e_inactiveLimit, this.m_impulse = 0) : this.m_state = o.e_atUpperLimit;
    f < this.m_maxLength1 ? (this.m_limitState1 = o.e_inactiveLimit, this.m_limitImpulse1 = 0) : this.m_limitState1 = o.e_atUpperLimit;
    j < this.m_maxLength2 ? (this.m_limitState2 = o.e_inactiveLimit, this.m_limitImpulse2 = 0) : this.m_limitState2 = o.e_atUpperLimit;
    f = g * this.m_u1.y - h * this.m_u1.x;
    j = l * this.m_u2.y - m * this.m_u2.x;
    this.m_limitMass1 = d.m_invMass + d.m_invI * f * f;
    this.m_limitMass2 = e.m_invMass + e.m_invI * j * j;
    this.m_pulleyMass = this.m_limitMass1 + this.m_ratio * this.m_ratio * this.m_limitMass2;
    this.m_limitMass1 = 1 / this.m_limitMass1;
    this.m_limitMass2 = 1 / this.m_limitMass2;
    this.m_pulleyMass = 1 / this.m_pulleyMass;
    b.warmStarting ? (this.m_impulse *= b.dtRatio, this.m_limitImpulse1 *= b.dtRatio, this.m_limitImpulse2 *= b.dtRatio, b = (-this.m_impulse - this.m_limitImpulse1) * this.m_u1.x, f = (-this.m_impulse - this.m_limitImpulse1) * this.m_u1.y, j = (-this.m_ratio * this.m_impulse - this.m_limitImpulse2) * this.m_u2.x, n = (-this.m_ratio * this.m_impulse - this.m_limitImpulse2) * this.m_u2.y, d.m_linearVelocity.x += d.m_invMass * b, d.m_linearVelocity.y += d.m_invMass * f, d.m_angularVelocity += d.m_invI * 
    (g * f - h * b), e.m_linearVelocity.x += e.m_invMass * j, e.m_linearVelocity.y += e.m_invMass * n, e.m_angularVelocity += e.m_invI * (l * n - m * j)) : this.m_limitImpulse2 = this.m_limitImpulse1 = this.m_impulse = 0
  };
  G.prototype.SolveVelocityConstraints = function() {
    var a = this.m_bodyA, d = this.m_bodyB, e;
    e = a.m_xf.R;
    var f = this.m_localAnchor1.x - a.m_sweep.localCenter.x, g = this.m_localAnchor1.y - a.m_sweep.localCenter.y, h = e.col1.x * f + e.col2.x * g, g = e.col1.y * f + e.col2.y * g, f = h;
    e = d.m_xf.R;
    var j = this.m_localAnchor2.x - d.m_sweep.localCenter.x, l = this.m_localAnchor2.y - d.m_sweep.localCenter.y, h = e.col1.x * j + e.col2.x * l, l = e.col1.y * j + e.col2.y * l, j = h, m = h = e = 0, n = 0;
    e = n = e = n = m = h = e = 0;
    if(this.m_state == o.e_atUpperLimit) {
      e = a.m_linearVelocity.x + -a.m_angularVelocity * g, h = a.m_linearVelocity.y + a.m_angularVelocity * f, m = d.m_linearVelocity.x + -d.m_angularVelocity * l, n = d.m_linearVelocity.y + d.m_angularVelocity * j, e = -(this.m_u1.x * e + this.m_u1.y * h) - this.m_ratio * (this.m_u2.x * m + this.m_u2.y * n), n = this.m_pulleyMass * -e, e = this.m_impulse, this.m_impulse = b.Max(0, this.m_impulse + n), n = this.m_impulse - e, e = -n * this.m_u1.x, h = -n * this.m_u1.y, m = -this.m_ratio * n * this.m_u2.x, 
      n = -this.m_ratio * n * this.m_u2.y, a.m_linearVelocity.x += a.m_invMass * e, a.m_linearVelocity.y += a.m_invMass * h, a.m_angularVelocity += a.m_invI * (f * h - g * e), d.m_linearVelocity.x += d.m_invMass * m, d.m_linearVelocity.y += d.m_invMass * n, d.m_angularVelocity += d.m_invI * (j * n - l * m)
    }
    if(this.m_limitState1 == o.e_atUpperLimit) {
      e = a.m_linearVelocity.x + -a.m_angularVelocity * g, h = a.m_linearVelocity.y + a.m_angularVelocity * f, e = -(this.m_u1.x * e + this.m_u1.y * h), n = -this.m_limitMass1 * e, e = this.m_limitImpulse1, this.m_limitImpulse1 = b.Max(0, this.m_limitImpulse1 + n), n = this.m_limitImpulse1 - e, e = -n * this.m_u1.x, h = -n * this.m_u1.y, a.m_linearVelocity.x += a.m_invMass * e, a.m_linearVelocity.y += a.m_invMass * h, a.m_angularVelocity += a.m_invI * (f * h - g * e)
    }
    if(this.m_limitState2 == o.e_atUpperLimit) {
      m = d.m_linearVelocity.x + -d.m_angularVelocity * l, n = d.m_linearVelocity.y + d.m_angularVelocity * j, e = -(this.m_u2.x * m + this.m_u2.y * n), n = -this.m_limitMass2 * e, e = this.m_limitImpulse2, this.m_limitImpulse2 = b.Max(0, this.m_limitImpulse2 + n), n = this.m_limitImpulse2 - e, m = -n * this.m_u2.x, n = -n * this.m_u2.y, d.m_linearVelocity.x += d.m_invMass * m, d.m_linearVelocity.y += d.m_invMass * n, d.m_angularVelocity += d.m_invI * (j * n - l * m)
    }
  };
  G.prototype.SolvePositionConstraints = function() {
    var d = this.m_bodyA, e = this.m_bodyB, f, g = this.m_ground.m_xf.position.x + this.m_groundAnchor1.x, h = this.m_ground.m_xf.position.y + this.m_groundAnchor1.y, j = this.m_ground.m_xf.position.x + this.m_groundAnchor2.x, l = this.m_ground.m_xf.position.y + this.m_groundAnchor2.y, m = 0, n = 0, p = 0, r = 0, t = f = 0, v = 0, u = 0, w = t = u = f = t = f = 0;
    if(this.m_state == o.e_atUpperLimit) {
      f = d.m_xf.R, m = this.m_localAnchor1.x - d.m_sweep.localCenter.x, n = this.m_localAnchor1.y - d.m_sweep.localCenter.y, t = f.col1.x * m + f.col2.x * n, n = f.col1.y * m + f.col2.y * n, m = t, f = e.m_xf.R, p = this.m_localAnchor2.x - e.m_sweep.localCenter.x, r = this.m_localAnchor2.y - e.m_sweep.localCenter.y, t = f.col1.x * p + f.col2.x * r, r = f.col1.y * p + f.col2.y * r, p = t, f = d.m_sweep.c.x + m, t = d.m_sweep.c.y + n, v = e.m_sweep.c.x + p, u = e.m_sweep.c.y + r, this.m_u1.Set(f - 
      g, t - h), this.m_u2.Set(v - j, u - l), f = this.m_u1.Length(), t = this.m_u2.Length(), f > a.b2_linearSlop ? this.m_u1.Multiply(1 / f) : this.m_u1.SetZero(), t > a.b2_linearSlop ? this.m_u2.Multiply(1 / t) : this.m_u2.SetZero(), f = this.m_constant - f - this.m_ratio * t, w = b.Max(w, -f), f = b.Clamp(f + a.b2_linearSlop, -a.b2_maxLinearCorrection, 0), u = -this.m_pulleyMass * f, f = -u * this.m_u1.x, t = -u * this.m_u1.y, v = -this.m_ratio * u * this.m_u2.x, u = -this.m_ratio * u * this.m_u2.y, 
      d.m_sweep.c.x += d.m_invMass * f, d.m_sweep.c.y += d.m_invMass * t, d.m_sweep.a += d.m_invI * (m * t - n * f), e.m_sweep.c.x += e.m_invMass * v, e.m_sweep.c.y += e.m_invMass * u, e.m_sweep.a += e.m_invI * (p * u - r * v), d.SynchronizeTransform(), e.SynchronizeTransform()
    }
    if(this.m_limitState1 == o.e_atUpperLimit) {
      f = d.m_xf.R, m = this.m_localAnchor1.x - d.m_sweep.localCenter.x, n = this.m_localAnchor1.y - d.m_sweep.localCenter.y, t = f.col1.x * m + f.col2.x * n, n = f.col1.y * m + f.col2.y * n, m = t, f = d.m_sweep.c.x + m, t = d.m_sweep.c.y + n, this.m_u1.Set(f - g, t - h), f = this.m_u1.Length(), f > a.b2_linearSlop ? (this.m_u1.x *= 1 / f, this.m_u1.y *= 1 / f) : this.m_u1.SetZero(), f = this.m_maxLength1 - f, w = b.Max(w, -f), f = b.Clamp(f + a.b2_linearSlop, -a.b2_maxLinearCorrection, 0), u = 
      -this.m_limitMass1 * f, f = -u * this.m_u1.x, t = -u * this.m_u1.y, d.m_sweep.c.x += d.m_invMass * f, d.m_sweep.c.y += d.m_invMass * t, d.m_sweep.a += d.m_invI * (m * t - n * f), d.SynchronizeTransform()
    }
    if(this.m_limitState2 == o.e_atUpperLimit) {
      f = e.m_xf.R, p = this.m_localAnchor2.x - e.m_sweep.localCenter.x, r = this.m_localAnchor2.y - e.m_sweep.localCenter.y, t = f.col1.x * p + f.col2.x * r, r = f.col1.y * p + f.col2.y * r, p = t, v = e.m_sweep.c.x + p, u = e.m_sweep.c.y + r, this.m_u2.Set(v - j, u - l), t = this.m_u2.Length(), t > a.b2_linearSlop ? (this.m_u2.x *= 1 / t, this.m_u2.y *= 1 / t) : this.m_u2.SetZero(), f = this.m_maxLength2 - t, w = b.Max(w, -f), f = b.Clamp(f + a.b2_linearSlop, -a.b2_maxLinearCorrection, 0), u = 
      -this.m_limitMass2 * f, v = -u * this.m_u2.x, u = -u * this.m_u2.y, e.m_sweep.c.x += e.m_invMass * v, e.m_sweep.c.y += e.m_invMass * u, e.m_sweep.a += e.m_invI * (p * u - r * v), e.SynchronizeTransform()
    }
    return w < a.b2_linearSlop
  };
  Box2D.postDefs.push(function() {
    Box2D.Dynamics.Joints.b2PulleyJoint.b2_minPulleyLength = 2
  });
  Box2D.inherit(K, Box2D.Dynamics.Joints.b2JointDef);
  K.prototype.__super = Box2D.Dynamics.Joints.b2JointDef.prototype;
  K.b2PulleyJointDef = function() {
    Box2D.Dynamics.Joints.b2JointDef.b2JointDef.apply(this, arguments);
    this.groundAnchorA = new g;
    this.groundAnchorB = new g;
    this.localAnchorA = new g;
    this.localAnchorB = new g
  };
  K.prototype.b2PulleyJointDef = function() {
    this.__super.b2JointDef.call(this);
    this.type = o.e_pulleyJoint;
    this.groundAnchorA.Set(-1, 1);
    this.groundAnchorB.Set(1, 1);
    this.localAnchorA.Set(-1, 0);
    this.localAnchorB.Set(1, 0);
    this.maxLengthB = this.lengthB = this.maxLengthA = this.lengthA = 0;
    this.ratio = 1;
    this.collideConnected = !0
  };
  K.prototype.Initialize = function(a, b, d, e, f, g, h) {
    h === void 0 && (h = 0);
    this.bodyA = a;
    this.bodyB = b;
    this.groundAnchorA.SetV(d);
    this.groundAnchorB.SetV(e);
    this.localAnchorA = this.bodyA.GetLocalPoint(f);
    this.localAnchorB = this.bodyB.GetLocalPoint(g);
    a = f.x - d.x;
    d = f.y - d.y;
    this.lengthA = Math.sqrt(a * a + d * d);
    d = g.x - e.x;
    e = g.y - e.y;
    this.lengthB = Math.sqrt(d * d + e * e);
    this.ratio = h;
    h = this.lengthA + this.ratio * this.lengthB;
    this.maxLengthA = h - this.ratio * G.b2_minPulleyLength;
    this.maxLengthB = (h - G.b2_minPulleyLength) / this.ratio
  };
  Box2D.inherit(m, Box2D.Dynamics.Joints.b2Joint);
  m.prototype.__super = Box2D.Dynamics.Joints.b2Joint.prototype;
  m.b2RevoluteJoint = function() {
    Box2D.Dynamics.Joints.b2Joint.b2Joint.apply(this, arguments);
    this.K = new e;
    this.K1 = new e;
    this.K2 = new e;
    this.K3 = new e;
    this.impulse3 = new f;
    this.impulse2 = new g;
    this.reduced = new g;
    this.m_localAnchor1 = new g;
    this.m_localAnchor2 = new g;
    this.m_impulse = new f;
    this.m_mass = new d
  };
  m.prototype.GetAnchorA = function() {
    return this.m_bodyA.GetWorldPoint(this.m_localAnchor1)
  };
  m.prototype.GetAnchorB = function() {
    return this.m_bodyB.GetWorldPoint(this.m_localAnchor2)
  };
  m.prototype.GetReactionForce = function(a) {
    a === void 0 && (a = 0);
    return new g(a * this.m_impulse.x, a * this.m_impulse.y)
  };
  m.prototype.GetReactionTorque = function(a) {
    a === void 0 && (a = 0);
    return a * this.m_impulse.z
  };
  m.prototype.GetJointAngle = function() {
    return this.m_bodyB.m_sweep.a - this.m_bodyA.m_sweep.a - this.m_referenceAngle
  };
  m.prototype.GetJointSpeed = function() {
    return this.m_bodyB.m_angularVelocity - this.m_bodyA.m_angularVelocity
  };
  m.prototype.IsLimitEnabled = function() {
    return this.m_enableLimit
  };
  m.prototype.EnableLimit = function(a) {
    this.m_enableLimit = a
  };
  m.prototype.GetLowerLimit = function() {
    return this.m_lowerAngle
  };
  m.prototype.GetUpperLimit = function() {
    return this.m_upperAngle
  };
  m.prototype.SetLimits = function(a, b) {
    a === void 0 && (a = 0);
    b === void 0 && (b = 0);
    this.m_lowerAngle = a;
    this.m_upperAngle = b
  };
  m.prototype.IsMotorEnabled = function() {
    this.m_bodyA.SetAwake(!0);
    this.m_bodyB.SetAwake(!0);
    return this.m_enableMotor
  };
  m.prototype.EnableMotor = function(a) {
    this.m_enableMotor = a
  };
  m.prototype.SetMotorSpeed = function(a) {
    a === void 0 && (a = 0);
    this.m_bodyA.SetAwake(!0);
    this.m_bodyB.SetAwake(!0);
    this.m_motorSpeed = a
  };
  m.prototype.GetMotorSpeed = function() {
    return this.m_motorSpeed
  };
  m.prototype.SetMaxMotorTorque = function(a) {
    a === void 0 && (a = 0);
    this.m_maxMotorTorque = a
  };
  m.prototype.GetMotorTorque = function() {
    return this.m_maxMotorTorque
  };
  m.prototype.b2RevoluteJoint = function(a) {
    this.__super.b2Joint.call(this, a);
    this.m_localAnchor1.SetV(a.localAnchorA);
    this.m_localAnchor2.SetV(a.localAnchorB);
    this.m_referenceAngle = a.referenceAngle;
    this.m_impulse.SetZero();
    this.m_motorImpulse = 0;
    this.m_lowerAngle = a.lowerAngle;
    this.m_upperAngle = a.upperAngle;
    this.m_maxMotorTorque = a.maxMotorTorque;
    this.m_motorSpeed = a.motorSpeed;
    this.m_enableLimit = a.enableLimit;
    this.m_enableMotor = a.enableMotor;
    this.m_limitState = o.e_inactiveLimit
  };
  m.prototype.InitVelocityConstraints = function(d) {
    var e = this.m_bodyA, f = this.m_bodyB, g, h = 0;
    g = e.m_xf.R;
    var j = this.m_localAnchor1.x - e.m_sweep.localCenter.x, l = this.m_localAnchor1.y - e.m_sweep.localCenter.y, h = g.col1.x * j + g.col2.x * l, l = g.col1.y * j + g.col2.y * l, j = h;
    g = f.m_xf.R;
    var m = this.m_localAnchor2.x - f.m_sweep.localCenter.x, n = this.m_localAnchor2.y - f.m_sweep.localCenter.y, h = g.col1.x * m + g.col2.x * n, n = g.col1.y * m + g.col2.y * n, m = h;
    g = e.m_invMass;
    var h = f.m_invMass, p = e.m_invI, r = f.m_invI;
    this.m_mass.col1.x = g + h + l * l * p + n * n * r;
    this.m_mass.col2.x = -l * j * p - n * m * r;
    this.m_mass.col3.x = -l * p - n * r;
    this.m_mass.col1.y = this.m_mass.col2.x;
    this.m_mass.col2.y = g + h + j * j * p + m * m * r;
    this.m_mass.col3.y = j * p + m * r;
    this.m_mass.col1.z = this.m_mass.col3.x;
    this.m_mass.col2.z = this.m_mass.col3.y;
    this.m_mass.col3.z = p + r;
    this.m_motorMass = 1 / (p + r);
    if(this.m_enableMotor == !1) {
      this.m_motorImpulse = 0
    }
    if(this.m_enableLimit) {
      var t = f.m_sweep.a - e.m_sweep.a - this.m_referenceAngle;
      if(b.Abs(this.m_upperAngle - this.m_lowerAngle) < 2 * a.b2_angularSlop) {
        this.m_limitState = o.e_equalLimits
      }else {
        if(t <= this.m_lowerAngle) {
          if(this.m_limitState != o.e_atLowerLimit) {
            this.m_impulse.z = 0
          }
          this.m_limitState = o.e_atLowerLimit
        }else {
          if(t >= this.m_upperAngle) {
            if(this.m_limitState != o.e_atUpperLimit) {
              this.m_impulse.z = 0
            }
            this.m_limitState = o.e_atUpperLimit
          }else {
            this.m_limitState = o.e_inactiveLimit, this.m_impulse.z = 0
          }
        }
      }
    }else {
      this.m_limitState = o.e_inactiveLimit
    }
    d.warmStarting ? (this.m_impulse.x *= d.dtRatio, this.m_impulse.y *= d.dtRatio, this.m_motorImpulse *= d.dtRatio, d = this.m_impulse.x, t = this.m_impulse.y, e.m_linearVelocity.x -= g * d, e.m_linearVelocity.y -= g * t, e.m_angularVelocity -= p * (j * t - l * d + this.m_motorImpulse + this.m_impulse.z), f.m_linearVelocity.x += h * d, f.m_linearVelocity.y += h * t, f.m_angularVelocity += r * (m * t - n * d + this.m_motorImpulse + this.m_impulse.z)) : (this.m_impulse.SetZero(), this.m_motorImpulse = 
    0)
  };
  m.prototype.SolveVelocityConstraints = function(a) {
    var d = this.m_bodyA, e = this.m_bodyB, f = 0, g = f = 0, h = 0, j = 0, l = 0, m = d.m_linearVelocity, n = d.m_angularVelocity, p = e.m_linearVelocity, r = e.m_angularVelocity, t = d.m_invMass, u = e.m_invMass, v = d.m_invI, w = e.m_invI;
    if(this.m_enableMotor && this.m_limitState != o.e_equalLimits) {
      g = this.m_motorMass * -(r - n - this.m_motorSpeed), h = this.m_motorImpulse, j = a.dt * this.m_maxMotorTorque, this.m_motorImpulse = b.Clamp(this.m_motorImpulse + g, -j, j), g = this.m_motorImpulse - h, n -= v * g, r += w * g
    }
    if(this.m_enableLimit && this.m_limitState != o.e_inactiveLimit) {
      var a = d.m_xf.R, g = this.m_localAnchor1.x - d.m_sweep.localCenter.x, h = this.m_localAnchor1.y - d.m_sweep.localCenter.y, f = a.col1.x * g + a.col2.x * h, h = a.col1.y * g + a.col2.y * h, g = f, a = e.m_xf.R, j = this.m_localAnchor2.x - e.m_sweep.localCenter.x, l = this.m_localAnchor2.y - e.m_sweep.localCenter.y, f = a.col1.x * j + a.col2.x * l, l = a.col1.y * j + a.col2.y * l, j = f, a = p.x + -r * l - m.x - -n * h, x = p.y + r * j - m.y - n * g;
      this.m_mass.Solve33(this.impulse3, -a, -x, -(r - n));
      if(this.m_limitState == o.e_equalLimits) {
        this.m_impulse.Add(this.impulse3)
      }else {
        if(this.m_limitState == o.e_atLowerLimit) {
          if(f = this.m_impulse.z + this.impulse3.z, f < 0) {
            this.m_mass.Solve22(this.reduced, -a, -x), this.impulse3.x = this.reduced.x, this.impulse3.y = this.reduced.y, this.impulse3.z = -this.m_impulse.z, this.m_impulse.x += this.reduced.x, this.m_impulse.y += this.reduced.y, this.m_impulse.z = 0
          }
        }else {
          if(this.m_limitState == o.e_atUpperLimit && (f = this.m_impulse.z + this.impulse3.z, f > 0)) {
            this.m_mass.Solve22(this.reduced, -a, -x), this.impulse3.x = this.reduced.x, this.impulse3.y = this.reduced.y, this.impulse3.z = -this.m_impulse.z, this.m_impulse.x += this.reduced.x, this.m_impulse.y += this.reduced.y, this.m_impulse.z = 0
          }
        }
      }
      m.x -= t * this.impulse3.x;
      m.y -= t * this.impulse3.y;
      n -= v * (g * this.impulse3.y - h * this.impulse3.x + this.impulse3.z);
      p.x += u * this.impulse3.x;
      p.y += u * this.impulse3.y;
      r += w * (j * this.impulse3.y - l * this.impulse3.x + this.impulse3.z)
    }else {
      a = d.m_xf.R, g = this.m_localAnchor1.x - d.m_sweep.localCenter.x, h = this.m_localAnchor1.y - d.m_sweep.localCenter.y, f = a.col1.x * g + a.col2.x * h, h = a.col1.y * g + a.col2.y * h, g = f, a = e.m_xf.R, j = this.m_localAnchor2.x - e.m_sweep.localCenter.x, l = this.m_localAnchor2.y - e.m_sweep.localCenter.y, f = a.col1.x * j + a.col2.x * l, l = a.col1.y * j + a.col2.y * l, j = f, this.m_mass.Solve22(this.impulse2, -(p.x + -r * l - m.x - -n * h), -(p.y + r * j - m.y - n * g)), this.m_impulse.x += 
      this.impulse2.x, this.m_impulse.y += this.impulse2.y, m.x -= t * this.impulse2.x, m.y -= t * this.impulse2.y, n -= v * (g * this.impulse2.y - h * this.impulse2.x), p.x += u * this.impulse2.x, p.y += u * this.impulse2.y, r += w * (j * this.impulse2.y - l * this.impulse2.x)
    }
    d.m_linearVelocity.SetV(m);
    d.m_angularVelocity = n;
    e.m_linearVelocity.SetV(p);
    e.m_angularVelocity = r
  };
  m.prototype.SolvePositionConstraints = function() {
    var d = 0, e, f = this.m_bodyA, g = this.m_bodyB, h = 0, j = e = 0, l = 0, n = 0;
    if(this.m_enableLimit && this.m_limitState != o.e_inactiveLimit) {
      var d = g.m_sweep.a - f.m_sweep.a - this.m_referenceAngle, p = 0;
      this.m_limitState == o.e_equalLimits ? (d = b.Clamp(d - this.m_lowerAngle, -a.b2_maxAngularCorrection, a.b2_maxAngularCorrection), p = -this.m_motorMass * d, h = b.Abs(d)) : this.m_limitState == o.e_atLowerLimit ? (d -= this.m_lowerAngle, h = -d, d = b.Clamp(d + a.b2_angularSlop, -a.b2_maxAngularCorrection, 0), p = -this.m_motorMass * d) : this.m_limitState == o.e_atUpperLimit && (d -= this.m_upperAngle, h = d, d = b.Clamp(d - a.b2_angularSlop, 0, a.b2_maxAngularCorrection), p = -this.m_motorMass * 
      d);
      f.m_sweep.a -= f.m_invI * p;
      g.m_sweep.a += g.m_invI * p;
      f.SynchronizeTransform();
      g.SynchronizeTransform()
    }
    e = f.m_xf.R;
    p = this.m_localAnchor1.x - f.m_sweep.localCenter.x;
    d = this.m_localAnchor1.y - f.m_sweep.localCenter.y;
    j = e.col1.x * p + e.col2.x * d;
    d = e.col1.y * p + e.col2.y * d;
    p = j;
    e = g.m_xf.R;
    var r = this.m_localAnchor2.x - g.m_sweep.localCenter.x, t = this.m_localAnchor2.y - g.m_sweep.localCenter.y, j = e.col1.x * r + e.col2.x * t, t = e.col1.y * r + e.col2.y * t, r = j, l = g.m_sweep.c.x + r - f.m_sweep.c.x - p, n = g.m_sweep.c.y + t - f.m_sweep.c.y - d, u = l * l + n * n;
    e = Math.sqrt(u);
    var j = f.m_invMass, v = g.m_invMass, w = f.m_invI, x = g.m_invI, z = 10 * a.b2_linearSlop;
    u > z * z && (u = 1 / (j + v), l = u * -l, n = u * -n, f.m_sweep.c.x -= 0.5 * j * l, f.m_sweep.c.y -= 0.5 * j * n, g.m_sweep.c.x += 0.5 * v * l, g.m_sweep.c.y += 0.5 * v * n, l = g.m_sweep.c.x + r - f.m_sweep.c.x - p, n = g.m_sweep.c.y + t - f.m_sweep.c.y - d);
    this.K1.col1.x = j + v;
    this.K1.col2.x = 0;
    this.K1.col1.y = 0;
    this.K1.col2.y = j + v;
    this.K2.col1.x = w * d * d;
    this.K2.col2.x = -w * p * d;
    this.K2.col1.y = -w * p * d;
    this.K2.col2.y = w * p * p;
    this.K3.col1.x = x * t * t;
    this.K3.col2.x = -x * r * t;
    this.K3.col1.y = -x * r * t;
    this.K3.col2.y = x * r * r;
    this.K.SetM(this.K1);
    this.K.AddM(this.K2);
    this.K.AddM(this.K3);
    this.K.Solve(m.tImpulse, -l, -n);
    l = m.tImpulse.x;
    n = m.tImpulse.y;
    f.m_sweep.c.x -= f.m_invMass * l;
    f.m_sweep.c.y -= f.m_invMass * n;
    f.m_sweep.a -= f.m_invI * (p * n - d * l);
    g.m_sweep.c.x += g.m_invMass * l;
    g.m_sweep.c.y += g.m_invMass * n;
    g.m_sweep.a += g.m_invI * (r * n - t * l);
    f.SynchronizeTransform();
    g.SynchronizeTransform();
    return e <= a.b2_linearSlop && h <= a.b2_angularSlop
  };
  Box2D.postDefs.push(function() {
    Box2D.Dynamics.Joints.b2RevoluteJoint.tImpulse = new g
  });
  Box2D.inherit(z, Box2D.Dynamics.Joints.b2JointDef);
  z.prototype.__super = Box2D.Dynamics.Joints.b2JointDef.prototype;
  z.b2RevoluteJointDef = function() {
    Box2D.Dynamics.Joints.b2JointDef.b2JointDef.apply(this, arguments);
    this.localAnchorA = new g;
    this.localAnchorB = new g
  };
  z.prototype.b2RevoluteJointDef = function() {
    this.__super.b2JointDef.call(this);
    this.type = o.e_revoluteJoint;
    this.localAnchorA.Set(0, 0);
    this.localAnchorB.Set(0, 0);
    this.motorSpeed = this.maxMotorTorque = this.upperAngle = this.lowerAngle = this.referenceAngle = 0;
    this.enableMotor = this.enableLimit = !1
  };
  z.prototype.Initialize = function(a, b, d) {
    this.bodyA = a;
    this.bodyB = b;
    this.localAnchorA = this.bodyA.GetLocalPoint(d);
    this.localAnchorB = this.bodyB.GetLocalPoint(d);
    this.referenceAngle = this.bodyB.GetAngle() - this.bodyA.GetAngle()
  };
  Box2D.inherit(I, Box2D.Dynamics.Joints.b2Joint);
  I.prototype.__super = Box2D.Dynamics.Joints.b2Joint.prototype;
  I.b2WeldJoint = function() {
    Box2D.Dynamics.Joints.b2Joint.b2Joint.apply(this, arguments);
    this.m_localAnchorA = new g;
    this.m_localAnchorB = new g;
    this.m_impulse = new f;
    this.m_mass = new d
  };
  I.prototype.GetAnchorA = function() {
    return this.m_bodyA.GetWorldPoint(this.m_localAnchorA)
  };
  I.prototype.GetAnchorB = function() {
    return this.m_bodyB.GetWorldPoint(this.m_localAnchorB)
  };
  I.prototype.GetReactionForce = function(a) {
    a === void 0 && (a = 0);
    return new g(a * this.m_impulse.x, a * this.m_impulse.y)
  };
  I.prototype.GetReactionTorque = function(a) {
    a === void 0 && (a = 0);
    return a * this.m_impulse.z
  };
  I.prototype.b2WeldJoint = function(a) {
    this.__super.b2Joint.call(this, a);
    this.m_localAnchorA.SetV(a.localAnchorA);
    this.m_localAnchorB.SetV(a.localAnchorB);
    this.m_referenceAngle = a.referenceAngle;
    this.m_impulse.SetZero();
    this.m_mass = new d
  };
  I.prototype.InitVelocityConstraints = function(a) {
    var b, d = 0, e = this.m_bodyA, f = this.m_bodyB;
    b = e.m_xf.R;
    var g = this.m_localAnchorA.x - e.m_sweep.localCenter.x, h = this.m_localAnchorA.y - e.m_sweep.localCenter.y, d = b.col1.x * g + b.col2.x * h, h = b.col1.y * g + b.col2.y * h, g = d;
    b = f.m_xf.R;
    var j = this.m_localAnchorB.x - f.m_sweep.localCenter.x, l = this.m_localAnchorB.y - f.m_sweep.localCenter.y, d = b.col1.x * j + b.col2.x * l, l = b.col1.y * j + b.col2.y * l, j = d;
    b = e.m_invMass;
    var d = f.m_invMass, m = e.m_invI, n = f.m_invI;
    this.m_mass.col1.x = b + d + h * h * m + l * l * n;
    this.m_mass.col2.x = -h * g * m - l * j * n;
    this.m_mass.col3.x = -h * m - l * n;
    this.m_mass.col1.y = this.m_mass.col2.x;
    this.m_mass.col2.y = b + d + g * g * m + j * j * n;
    this.m_mass.col3.y = g * m + j * n;
    this.m_mass.col1.z = this.m_mass.col3.x;
    this.m_mass.col2.z = this.m_mass.col3.y;
    this.m_mass.col3.z = m + n;
    a.warmStarting ? (this.m_impulse.x *= a.dtRatio, this.m_impulse.y *= a.dtRatio, this.m_impulse.z *= a.dtRatio, e.m_linearVelocity.x -= b * this.m_impulse.x, e.m_linearVelocity.y -= b * this.m_impulse.y, e.m_angularVelocity -= m * (g * this.m_impulse.y - h * this.m_impulse.x + this.m_impulse.z), f.m_linearVelocity.x += d * this.m_impulse.x, f.m_linearVelocity.y += d * this.m_impulse.y, f.m_angularVelocity += n * (j * this.m_impulse.y - l * this.m_impulse.x + this.m_impulse.z)) : this.m_impulse.SetZero()
  };
  I.prototype.SolveVelocityConstraints = function() {
    var a, b = 0, d = this.m_bodyA, e = this.m_bodyB, g = d.m_linearVelocity, h = d.m_angularVelocity, j = e.m_linearVelocity, l = e.m_angularVelocity, m = d.m_invMass, n = e.m_invMass, o = d.m_invI, p = e.m_invI;
    a = d.m_xf.R;
    var r = this.m_localAnchorA.x - d.m_sweep.localCenter.x, t = this.m_localAnchorA.y - d.m_sweep.localCenter.y, b = a.col1.x * r + a.col2.x * t, t = a.col1.y * r + a.col2.y * t, r = b;
    a = e.m_xf.R;
    var u = this.m_localAnchorB.x - e.m_sweep.localCenter.x, v = this.m_localAnchorB.y - e.m_sweep.localCenter.y, b = a.col1.x * u + a.col2.x * v, v = a.col1.y * u + a.col2.y * v, u = b;
    a = j.x - l * v - g.x + h * t;
    var b = j.y + l * u - g.y - h * r, w = l - h, x = new f;
    this.m_mass.Solve33(x, -a, -b, -w);
    this.m_impulse.Add(x);
    g.x -= m * x.x;
    g.y -= m * x.y;
    h -= o * (r * x.y - t * x.x + x.z);
    j.x += n * x.x;
    j.y += n * x.y;
    l += p * (u * x.y - v * x.x + x.z);
    d.m_angularVelocity = h;
    e.m_angularVelocity = l
  };
  I.prototype.SolvePositionConstraints = function() {
    var d, e = 0, g = this.m_bodyA, h = this.m_bodyB;
    d = g.m_xf.R;
    var j = this.m_localAnchorA.x - g.m_sweep.localCenter.x, l = this.m_localAnchorA.y - g.m_sweep.localCenter.y, e = d.col1.x * j + d.col2.x * l, l = d.col1.y * j + d.col2.y * l, j = e;
    d = h.m_xf.R;
    var m = this.m_localAnchorB.x - h.m_sweep.localCenter.x, n = this.m_localAnchorB.y - h.m_sweep.localCenter.y, e = d.col1.x * m + d.col2.x * n, n = d.col1.y * m + d.col2.y * n, m = e;
    d = g.m_invMass;
    var e = h.m_invMass, o = g.m_invI, p = h.m_invI, r = h.m_sweep.c.x + m - g.m_sweep.c.x - j, t = h.m_sweep.c.y + n - g.m_sweep.c.y - l, u = h.m_sweep.a - g.m_sweep.a - this.m_referenceAngle, v = 10 * a.b2_linearSlop, w = Math.sqrt(r * r + t * t), x = b.Abs(u);
    w > v && (o *= 1, p *= 1);
    this.m_mass.col1.x = d + e + l * l * o + n * n * p;
    this.m_mass.col2.x = -l * j * o - n * m * p;
    this.m_mass.col3.x = -l * o - n * p;
    this.m_mass.col1.y = this.m_mass.col2.x;
    this.m_mass.col2.y = d + e + j * j * o + m * m * p;
    this.m_mass.col3.y = j * o + m * p;
    this.m_mass.col1.z = this.m_mass.col3.x;
    this.m_mass.col2.z = this.m_mass.col3.y;
    this.m_mass.col3.z = o + p;
    v = new f;
    this.m_mass.Solve33(v, -r, -t, -u);
    g.m_sweep.c.x -= d * v.x;
    g.m_sweep.c.y -= d * v.y;
    g.m_sweep.a -= o * (j * v.y - l * v.x + v.z);
    h.m_sweep.c.x += e * v.x;
    h.m_sweep.c.y += e * v.y;
    h.m_sweep.a += p * (m * v.y - n * v.x + v.z);
    g.SynchronizeTransform();
    h.SynchronizeTransform();
    return w <= a.b2_linearSlop && x <= a.b2_angularSlop
  };
  Box2D.inherit(J, Box2D.Dynamics.Joints.b2JointDef);
  J.prototype.__super = Box2D.Dynamics.Joints.b2JointDef.prototype;
  J.b2WeldJointDef = function() {
    Box2D.Dynamics.Joints.b2JointDef.b2JointDef.apply(this, arguments);
    this.localAnchorA = new g;
    this.localAnchorB = new g
  };
  J.prototype.b2WeldJointDef = function() {
    this.__super.b2JointDef.call(this);
    this.type = o.e_weldJoint;
    this.referenceAngle = 0
  };
  J.prototype.Initialize = function(a, b, d) {
    this.bodyA = a;
    this.bodyB = b;
    this.localAnchorA.SetV(this.bodyA.GetLocalPoint(d));
    this.localAnchorB.SetV(this.bodyB.GetLocalPoint(d));
    this.referenceAngle = this.bodyB.GetAngle() - this.bodyA.GetAngle()
  }
})();
(function() {
  var a = Box2D.Dynamics.b2DebugDraw;
  a.b2DebugDraw = function() {
    this.m_xformScale = this.m_fillAlpha = this.m_alpha = this.m_lineThickness = this.m_drawScale = 1;
    var a = this;
    this.m_sprite = {graphics:{clear:function() {
      a.m_ctx.clearRect(0, 0, a.m_ctx.canvas.width, a.m_ctx.canvas.height)
    }}}
  };
  a.prototype._color = function(a, d) {
    return"rgba(" + ((a & 16711680) >> 16) + "," + ((a & 65280) >> 8) + "," + (a & 255) + "," + d + ")"
  };
  a.prototype.b2DebugDraw = function() {
    this.m_drawFlags = 0
  };
  a.prototype.SetFlags = function(a) {
    a === void 0 && (a = 0);
    this.m_drawFlags = a
  };
  a.prototype.GetFlags = function() {
    return this.m_drawFlags
  };
  a.prototype.AppendFlags = function(a) {
    a === void 0 && (a = 0);
    this.m_drawFlags |= a
  };
  a.prototype.ClearFlags = function(a) {
    a === void 0 && (a = 0);
    this.m_drawFlags &= ~a
  };
  a.prototype.SetSprite = function(a) {
    this.m_ctx = a
  };
  a.prototype.GetSprite = function() {
    return this.m_ctx
  };
  a.prototype.SetDrawScale = function(a) {
    a === void 0 && (a = 0);
    this.m_drawScale = a
  };
  a.prototype.GetDrawScale = function() {
    return this.m_drawScale
  };
  a.prototype.SetLineThickness = function(a) {
    a === void 0 && (a = 0);
    this.m_lineThickness = a;
    this.m_ctx.strokeWidth = a
  };
  a.prototype.GetLineThickness = function() {
    return this.m_lineThickness
  };
  a.prototype.SetAlpha = function(a) {
    a === void 0 && (a = 0);
    this.m_alpha = a
  };
  a.prototype.GetAlpha = function() {
    return this.m_alpha
  };
  a.prototype.SetFillAlpha = function(a) {
    a === void 0 && (a = 0);
    this.m_fillAlpha = a
  };
  a.prototype.GetFillAlpha = function() {
    return this.m_fillAlpha
  };
  a.prototype.SetXFormScale = function(a) {
    a === void 0 && (a = 0);
    this.m_xformScale = a
  };
  a.prototype.GetXFormScale = function() {
    return this.m_xformScale
  };
  a.prototype.DrawPolygon = function(a, d, b) {
    if(d) {
      var g = this.m_ctx, f = this.m_drawScale;
      g.beginPath();
      g.strokeStyle = this._color(b.color, this.m_alpha);
      g.moveTo(a[0].x * f, a[0].y * f);
      for(b = 1;b < d;b++) {
        g.lineTo(a[b].x * f, a[b].y * f)
      }
      g.lineTo(a[0].x * f, a[0].y * f);
      g.closePath();
      g.stroke()
    }
  };
  a.prototype.DrawSolidPolygon = function(a, d, b) {
    if(d) {
      var g = this.m_ctx, f = this.m_drawScale;
      g.beginPath();
      g.strokeStyle = this._color(b.color, this.m_alpha);
      g.fillStyle = this._color(b.color, this.m_fillAlpha);
      g.moveTo(a[0].x * f, a[0].y * f);
      for(b = 1;b < d;b++) {
        g.lineTo(a[b].x * f, a[b].y * f)
      }
      g.lineTo(a[0].x * f, a[0].y * f);
      g.closePath();
      g.fill();
      g.stroke()
    }
  };
  a.prototype.DrawCircle = function(a, d, b) {
    if(d) {
      var g = this.m_ctx, f = this.m_drawScale;
      g.beginPath();
      g.strokeStyle = this._color(b.color, this.m_alpha);
      g.arc(a.x * f, a.y * f, d * f, 0, Math.PI * 2, !0);
      g.closePath();
      g.stroke()
    }
  };
  a.prototype.DrawSolidCircle = function(a, d, b, g) {
    if(d) {
      var f = this.m_ctx, l = this.m_drawScale, h = a.x * l, n = a.y * l;
      f.moveTo(0, 0);
      f.beginPath();
      f.strokeStyle = this._color(g.color, this.m_alpha);
      f.fillStyle = this._color(g.color, this.m_fillAlpha);
      f.arc(h, n, d * l, 0, Math.PI * 2, !0);
      f.moveTo(h, n);
      f.lineTo((a.x + b.x * d) * l, (a.y + b.y * d) * l);
      f.closePath();
      f.fill();
      f.stroke()
    }
  };
  a.prototype.DrawSegment = function(a, d, b) {
    var g = this.m_ctx, f = this.m_drawScale;
    g.strokeStyle = this._color(b.color, this.m_alpha);
    g.beginPath();
    g.moveTo(a.x * f, a.y * f);
    g.lineTo(d.x * f, d.y * f);
    g.closePath();
    g.stroke()
  };
  a.prototype.DrawTransform = function(a) {
    var d = this.m_ctx, b = this.m_drawScale;
    d.beginPath();
    d.strokeStyle = this._color(16711680, this.m_alpha);
    d.moveTo(a.position.x * b, a.position.y * b);
    d.lineTo((a.position.x + this.m_xformScale * a.R.col1.x) * b, (a.position.y + this.m_xformScale * a.R.col1.y) * b);
    d.strokeStyle = this._color(65280, this.m_alpha);
    d.moveTo(a.position.x * b, a.position.y * b);
    d.lineTo((a.position.x + this.m_xformScale * a.R.col2.x) * b, (a.position.y + this.m_xformScale * a.R.col2.y) * b);
    d.closePath();
    d.stroke()
  }
})();
Box2D.Post = {};
var i;
for(i = 0;i < Box2D.postDefs.length;++i) {
  Box2D.postDefs[i]()
}
delete Box2D.postDefs;
var game = {draw:{}}, game = {};
(function(a) {
  var e = 0, d = {};
  a.draw = function(a, g, f, l, h) {
    for(a = f.GetBodyList();a != null;) {
      f = a.GetPosition();
      l = a.size;
      if(l != null) {
        var n = a.GetUserData();
        n == null && (n = {}, a.SetUserData(n));
        if(n.viewID == null) {
          n.viewID = e++
        }
        if(d[n.viewID] == null) {
          d[n.viewID] = document.createElement("span"), d[n.viewID].className = "gameObject", g.appendChild(d[n.viewID])
        }
        n = d[n.viewID];
        n.style.left = (f.x - l.x / 2) * h + "px";
        n.style.top = (f.y - l.y / 2) * h + "px";
        n.style.width = l.x * h + "px";
        n.style.height = l.y * h + "px";
        n.style.webkitTransform = "rotate(" + a.GetAngle() + "rad)"
      }
      a = a.GetNext()
    }
  }
})(game);
var engine = {};
window.requestAnimFrame = function() {
  return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(a) {
    window.setTimeout(a, 1E3 / 60)
  }
}();
var viewportWidth = 600, viewportHeight = 400, worldWidth = 120, worldHeight = 80, scale = 5, lastTickTime = 0, frameSteps = 10, b2dDebugFlags = 0;
b2dDebugFlags |= Box2D.Dynamics.b2DebugDraw.e_aabbBit;
b2dDebugFlags |= Box2D.Dynamics.b2DebugDraw.e_centerOfMassBit;
b2dDebugFlags |= Box2D.Dynamics.b2DebugDraw.e_controllerBit;
b2dDebugFlags |= Box2D.Dynamics.b2DebugDraw.e_jointBit;
b2dDebugFlags |= Box2D.Dynamics.b2DebugDraw.e_pairBit;
b2dDebugFlags |= Box2D.Dynamics.b2DebugDraw.e_shapeBit;
var Vec2 = Box2D.Common.Math.b2Vec2, fixtureDefinition = new Box2D.Dynamics.b2FixtureDef, bodyDefinition = new Box2D.Dynamics.b2BodyDef, world, display, debugCanvas, camera = new Vec2(0, 0), player, debug = !0, fps, frames = 0, rollingFPS = 60, testObjects = 100, domObjects = {}, createStaticBox = function(a, e, d, b) {
  fixtureDefinition.density = 1;
  fixtureDefinition.friction = 0.5;
  fixtureDefinition.restitution = 0.2;
  fixtureDefinition.shape = new Box2D.Collision.Shapes.b2PolygonShape;
  fixtureDefinition.shape.SetAsBox(a / 2, e / 2);
  bodyDefinition.type = Box2D.Dynamics.b2Body.b2_staticBody;
  bodyDefinition.position.x = d;
  bodyDefinition.position.y = b;
  d = world.CreateBody(bodyDefinition);
  d.size = new Vec2(a, e);
  a = d.CreateFixture(fixtureDefinition);
  return{body:d, fixture:a}
}, createBox = function(a, e, d, b) {
  fixtureDefinition.density = 1;
  fixtureDefinition.friction = 0.5;
  fixtureDefinition.restitution = 0.2;
  fixtureDefinition.shape = new Box2D.Collision.Shapes.b2PolygonShape;
  fixtureDefinition.shape.SetAsBox(a / 2, e / 2);
  bodyDefinition.type = Box2D.Dynamics.b2Body.b2_dynamicBody;
  bodyDefinition.position.x = d;
  bodyDefinition.position.y = b;
  d = world.CreateBody(bodyDefinition);
  d.size = new Vec2(a, e);
  a = d.CreateFixture(fixtureDefinition);
  return{body:d, fixture:a}
}, init = function(a, e) {
  fps = document.getElementById("fps");
  debug = e;
  initDisplay(a, debug);
  world = new Box2D.Dynamics.b2World(new Vec2(0, 9.8), !0);
  if(debug) {
    var d = new Box2D.Dynamics.b2DebugDraw;
    debugCanvas = document.getElementById(a + "__DEBUG");
    debugCanvas.width = worldWidth * scale;
    debugCanvas.height = worldHeight * scale;
    debugCanvas.style.marginRight = "-" + debugCanvas.width + "px";
    debugCanvas.style.marginBottom = "-" + debugCanvas.height + "px";
    d.SetSprite(debugCanvas.getContext("2d"));
    d.SetDrawScale(scale);
    d.SetFillAlpha(0.3);
    d.SetLineThickness(1);
    d.SetFlags(b2dDebugFlags);
    world.SetDebugDraw(d)
  }
  createStaticBox(worldWidth, 1, worldWidth / 2, 0);
  createStaticBox(worldWidth, 1, worldWidth / 2, worldHeight);
  createStaticBox(1, worldHeight, 0, worldHeight / 2);
  createStaticBox(1, worldHeight, worldWidth, worldHeight / 2);
  for(var b = new Box2D.Dynamics.Joints.b2RevoluteJointDef, g = new Box2D.Dynamics.Joints.b2WeldJointDef, f = !1, d = 10;d <= worldWidth - 10;d += 8) {
    bodyDefinition.angle = d / worldWidth * 3.1415;
    var l = worldHeight / 2;
    f && (l += 8);
    var f = !f, h = createStaticBox(0.1, 0.1, d, l), n = createBox(10, 1, d, l), l = createBox(1, 10, d, l);
    b.Initialize(h.body, n.body, h.body.GetWorldCenter());
    world.CreateJoint(b);
    b.Initialize(h.body, l.body, h.body.GetWorldCenter());
    world.CreateJoint(b);
    g.Initialize(n.body, l.body, n.body.GetWorldCenter());
    world.CreateJoint(g)
  }
  bodyDefinition.type = Box2D.Dynamics.b2Body.b2_dynamicBody;
  fixtureDefinition.restitution = 2.5;
  fixtureDefinition.shape = new Box2D.Collision.Shapes.b2CircleShape(0.25);
  l = 15;
  for(d = 0;d < testObjects;d++) {
    var j = d * 5 % (worldWidth - 10);
    bodyDefinition.position.y = l + d % 20;
    bodyDefinition.position.x = j + d % 20 / 20 + 4.5;
    j = world.CreateBody(bodyDefinition);
    j.size = new Vec2(0.5, 0.5);
    j.CreateFixture(fixtureDefinition)
  }
  fixtureDefinition.shape = new Box2D.Collision.Shapes.b2PolygonShape;
  fixtureDefinition.shape.SetAsBox(0.25, 0.25);
  bodyDefinition.position.x = 5;
  l = 15;
  for(d = 0;d < testObjects;d++) {
    player = j, j = d * 5 % (worldWidth - 10), bodyDefinition.position.y = l + (d + 5) % 20, bodyDefinition.position.x = j + (d + 5) % 20 / 20 + 4.5, bodyDefinition.angle = d % 17 / 17, j = world.CreateBody(bodyDefinition), j.size = new Vec2(0.5, 0.5), j.CreateFixture(fixtureDefinition)
  }
  fixtureDefinition.shape = new Box2D.Collision.Shapes.b2PolygonShape;
  fixtureDefinition.shape.SetAsArray([new Vec2(-0.5, -0.5), new Vec2(0.5, -0.5), new Vec2(-0.5, 0.5)], 3);
  bodyDefinition.position.x = 5;
  l = 15;
  for(d = 0;d < testObjects;d++) {
    player = j, j = d * 5 % (worldWidth - 10), bodyDefinition.position.y = l + (d + 10) % 20, bodyDefinition.position.x = j + (d + 10) % 20 / 20 + 4.5, bodyDefinition.angle = d % 22 / 22, j = world.CreateBody(bodyDefinition), j.size = new Vec2(0.75, 0.75), j.CreateFixture(fixtureDefinition)
  }
  fixtureDefinition.shape = new Box2D.Collision.Shapes.b2PolygonShape;
  fixtureDefinition.shape.SetAsArray([new Vec2(-0.5, -0.5), new Vec2(0, -0.5), new Vec2(0.5, 0), new Vec2(0.5, 0.5), new Vec2(0, 0.3)], 5);
  bodyDefinition.position.x = 5;
  l = 15;
  for(d = 0;d < testObjects;d++) {
    player = j, j = d * 5 % (worldWidth - 10), bodyDefinition.position.y = l + (d + 15) % 20, bodyDefinition.position.x = j + (d + 15) % 20 / 20 + 4.5, bodyDefinition.angle = d % 35 / 35, j = world.CreateBody(bodyDefinition), j.size = new Vec2(0.75, 0.75), j.CreateFixture(fixtureDefinition)
  }
  window.requestAnimFrame(update, display)
}, initDisplay = function(a, e) {
  var d = document.getElementById(a), b = document.createElement("span");
  if(e) {
    d.innerHTML = '<div style="width: ' + viewportWidth + "px; height: " + viewportHeight / 2 + 'px; background-color: #000; opacity: 0.15; position: absolute;"></div><div style="width: ' + viewportWidth / 2 + "px; height: " + viewportHeight + 'px; background-color: #FFF; opacity: 0.15; position: absolute;"></div>', b.innerHTML = '<canvas id="' + a + '__DEBUG" class="debugViewport"></canvas>'
  }
  b.className = "viewportContainer";
  b.style.width = viewportWidth + "px";
  b.style.height = viewportHeight + "px";
  display = document.createElement("span");
  display.className = "viewport";
  b.appendChild(display);
  d.appendChild(b)
}, update = function(a) {
  a == null && (a = (new Date).getTime());
  var e = 0;
  lastTickTime != 0 ? e = (a - lastTickTime) / 1E3 : lastTickTime = a;
  if(e > 0.015) {
    e > 0.04 && (e = 0.04);
    if(fps) {
      var d = 1 / e;
      rollingFPS = rollingFPS * 0.99 + d * 0.01;
      fps.innerHTML = Math.round(d) + " - " + Math.round(rollingFPS);
      frames++
    }
    lastTickTime = a;
    world.Step(e, frameSteps, frameSteps);
    world.DrawDebugData();
    world.ClearForces();
    draw(e)
  }
  window.requestAnimFrame(update, display)
}, draw = function(a) {
  var e = player.GetPosition(), d = viewportWidth / scale, b = viewportHeight / scale;
  camera.x = e.x - d / 2;
  camera.y = e.y - b / 2;
  if(camera.x < 0) {
    camera.x = 0
  }else {
    if(camera.x > worldWidth - d) {
      camera.x = worldWidth - d
    }
  }
  if(camera.y < 0) {
    camera.y = 0
  }else {
    if(camera.y > worldHeight - b) {
      camera.y = worldHeight - b
    }
  }
  if(debugCanvas != null) {
    debugCanvas.style.left = "-" + camera.x * scale + "px", debugCanvas.style.top = "-" + camera.y * scale + "px"
  }
  display.style.left = "-" + camera.x * scale + "px";
  display.style.top = "-" + camera.y * scale + "px";
  game.draw(a, display, world, camera, scale)
};


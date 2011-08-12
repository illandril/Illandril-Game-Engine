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
goog.exportPath_ = function(a, e, f) {
  a = a.split(".");
  f = f || goog.global;
  !(a[0] in f) && f.execScript && f.execScript("var " + a[0]);
  for(var d;a.length && (d = a.shift());) {
    !a.length && goog.isDef(e) ? f[d] = e : f = f[d] ? f[d] : f[d] = {}
  }
};
goog.getObjectByName = function(a, e) {
  for(var f = a.split("."), d = e || goog.global, b;b = f.shift();) {
    if(goog.isDefAndNotNull(d[b])) {
      d = d[b]
    }else {
      return null
    }
  }
  return d
};
goog.globalize = function(a, e) {
  var f = e || goog.global, d;
  for(d in a) {
    f[d] = a[d]
  }
};
goog.addDependency = function(a, e, f) {
  if(!COMPILED) {
    for(var d, a = a.replace(/\\/g, "/"), b = goog.dependencies_, g = 0;d = e[g];g++) {
      b.nameToPath[d] = a, a in b.pathToNames || (b.pathToNames[a] = {}), b.pathToNames[a][d] = !0
    }
    for(d = 0;e = f[d];d++) {
      a in b.requires || (b.requires[a] = {}), b.requires[a][e] = !0
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
          var f = a[e].src, d = f.lastIndexOf("?"), d = d == -1 ? f.length : d;
          if(f.substr(d - 7, 7) == "base.js") {
            goog.basePath = f.substr(0, d - 7);
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
    function a(b) {
      if(!(b in d.written)) {
        if(!(b in d.visited) && (d.visited[b] = !0, b in d.requires)) {
          for(var j in d.requires[b]) {
            if(!goog.isProvided_(j)) {
              if(j in d.nameToPath) {
                a(d.nameToPath[j])
              }else {
                throw Error("Undefined nameToPath for " + j);
              }
            }
          }
        }
        b in f || (f[b] = !0, e.push(b))
      }
    }
    var e = [], f = {}, d = goog.dependencies_, b;
    for(b in goog.included_) {
      d.written[b] || a(b)
    }
    for(b = 0;b < e.length;b++) {
      if(e[b]) {
        goog.importScript_(goog.basePath + e[b])
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
      var f = Object.prototype.toString.call(a);
      if(f == "[object Window]") {
        return"object"
      }
      if(f == "[object Array]" || typeof a.length == "number" && typeof a.splice != "undefined" && typeof a.propertyIsEnumerable != "undefined" && !a.propertyIsEnumerable("splice")) {
        return"array"
      }
      if(f == "[object Function]" || typeof a.call != "undefined" && typeof a.propertyIsEnumerable != "undefined" && !a.propertyIsEnumerable("call")) {
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
    for(var f in a) {
      if(f == e && Object.prototype.hasOwnProperty.call(a, e)) {
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
    var e = e == "array" ? [] : {}, f;
    for(f in a) {
      e[f] = goog.cloneObject(a[f])
    }
    return e
  }
  return a
};
goog.bindNative_ = function(a, e, f) {
  return a.call.apply(a.bind, arguments)
};
goog.bindJs_ = function(a, e, f) {
  if(!a) {
    throw Error();
  }
  if(arguments.length > 2) {
    var d = Array.prototype.slice.call(arguments, 2);
    return function() {
      var b = Array.prototype.slice.call(arguments);
      Array.prototype.unshift.apply(b, d);
      return a.apply(e, b)
    }
  }else {
    return function() {
      return a.apply(e, arguments)
    }
  }
};
goog.bind = function(a, e, f) {
  goog.bind = Function.prototype.bind && Function.prototype.bind.toString().indexOf("native code") != -1 ? goog.bindNative_ : goog.bindJs_;
  return goog.bind.apply(null, arguments)
};
goog.partial = function(a, e) {
  var f = Array.prototype.slice.call(arguments, 1);
  return function() {
    var e = Array.prototype.slice.call(arguments);
    e.unshift.apply(e, f);
    return a.apply(this, e)
  }
};
goog.mixin = function(a, e) {
  for(var f in e) {
    a[f] = e[f]
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
        var e = goog.global.document, f = e.createElement("script");
        f.type = "text/javascript";
        f.defer = !1;
        f.appendChild(e.createTextNode(a));
        e.body.appendChild(f);
        e.body.removeChild(f)
      }
    }else {
      throw Error("goog.globalEval not available");
    }
  }
};
goog.evalWorksForGlobals_ = null;
goog.getCssName = function(a, e) {
  var f = function(e) {
    return goog.cssNameMapping_[e] || e
  }, d;
  d = goog.cssNameMapping_ ? goog.cssNameMappingStyle_ == "BY_WHOLE" ? f : function(e) {
    for(var e = e.split("-"), a = [], d = 0;d < e.length;d++) {
      a.push(f(e[d]))
    }
    return a.join("-")
  } : function(e) {
    return e
  };
  return e ? a + "-" + d(e) : d(a)
};
goog.setCssNameMapping = function(a, e) {
  goog.cssNameMapping_ = a;
  goog.cssNameMappingStyle_ = e
};
goog.getMsg = function(a, e) {
  var f = e || {}, d;
  for(d in f) {
    var b = ("" + f[d]).replace(/\$/g, "$$$$"), a = a.replace(RegExp("\\{\\$" + d + "\\}", "gi"), b)
  }
  return a
};
goog.exportSymbol = function(a, e, f) {
  goog.exportPath_(a, e, f)
};
goog.exportProperty = function(a, e, f) {
  a[e] = f
};
goog.inherits = function(a, e) {
  function f() {
  }
  f.prototype = e.prototype;
  a.superClass_ = e.prototype;
  a.prototype = new f;
  a.prototype.constructor = a
};
goog.base = function(a, e, f) {
  var d = arguments.callee.caller;
  if(d.superClass_) {
    return d.superClass_.constructor.apply(a, Array.prototype.slice.call(arguments, 1))
  }
  for(var b = Array.prototype.slice.call(arguments, 2), g = !1, j = a.constructor;j;j = j.superClass_ && j.superClass_.constructor) {
    if(j.prototype[e] === d) {
      g = !0
    }else {
      if(g) {
        return j.prototype[e].apply(a, b)
      }
    }
  }
  if(a[e] === d) {
    return a.constructor.prototype[e].apply(a, b)
  }else {
    throw Error("goog.base called from a method of one name to a method of a different name");
  }
};
goog.scope = function(a) {
  a.call(goog.global)
};
var Box2D = Box2D || {};
Box2D.base = Box2D.base || {};
(function(a, e) {
  if(!(Object.prototype.defineProperty instanceof Function) && Object.prototype.__defineGetter__ instanceof Function && Object.prototype.__defineSetter__ instanceof Function) {
    Object.defineProperty = function(e, a, f) {
      f.get instanceof Function && e.__defineGetter__(a, f.get);
      f.set instanceof Function && e.__defineSetter__(a, f.set)
    }
  }
  var f = function() {
  };
  a.inherit = function(e, a) {
    f.prototype = a.prototype;
    e.prototype = new f;
    e.prototype.constructor = e
  };
  a.generateCallback = function(e, a) {
    return function() {
      a.apply(e, arguments)
    }
  };
  a.NVector = function(a) {
    a === e && (a = 0);
    for(var b = Array(a || 0), f = 0;f < a;++f) {
      b[f] = 0
    }
    return b
  };
  a.is = function(a, b) {
    return a === null ? !1 : b instanceof Function && a instanceof b ? !0 : a.constructor.__implements !== e && a.constructor.__implements[b] ? !0 : !1
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
    var d = -Number.MAX_VALUE, b = Number.MAX_VALUE, g = a.p2.x - a.p1.x;
    if(Math.abs(g) < Number.MIN_VALUE) {
      if(a.p1.x < this.lowerBound.x || this.upperBound.x < a.p1.x) {
        return!1
      }
    }else {
      var j = 1 / g, g = (this.lowerBound.x - a.p1.x) * j;
      j *= this.upperBound.x - a.p1.x;
      var h = -1;
      g > j && (h = g, g = j, j = h, h = 1);
      if(g > d) {
        e.normal.x = h, e.normal.y = 0, d = g
      }
      b = Math.min(b, j);
      if(d > b) {
        return!1
      }
    }
    g = a.p2.y - a.p1.y;
    if(Math.abs(g) < Number.MIN_VALUE) {
      if(a.p1.y < this.lowerBound.y || this.upperBound.y < a.p1.y) {
        return!1
      }
    }else {
      j = 1 / g;
      g = (this.lowerBound.y - a.p1.y) * j;
      j *= this.upperBound.y - a.p1.y;
      h = -1;
      g > j && (h = g, g = j, j = h, h = 1);
      if(g > d) {
        e.normal.y = h, e.normal.x = 0, d = g
      }
      b = Math.min(b, j);
      if(d > b) {
        return!1
      }
    }
    e.fraction = d;
    return!0
  };
  a.prototype.TestOverlap = function(e) {
    return e.lowerBound.x - this.upperBound.x > 0 ? !1 : e.lowerBound.y - this.upperBound.y > 0 ? !1 : this.lowerBound.x - e.upperBound.x > 0 ? !1 : this.lowerBound.y - e.upperBound.y > 0 ? !1 : !0
  };
  a.Combine = function(e, f) {
    var d = new a;
    d.Combine(e, f);
    return d
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
  a.ClipSegmentToLine = function(e, a, d, b) {
    b === void 0 && (b = 0);
    var g = 0, j = a[0].v, h = a[1].v, l = d.x * j.x + d.y * j.y - b, d = d.x * h.x + d.y * h.y - b;
    l <= 0 && e[g++].Set(a[0]);
    d <= 0 && e[g++].Set(a[1]);
    if(l * d < 0) {
      d = l / (l - d), b = e[g].v, b.x = j.x + d * (h.x - j.x), b.y = j.y + d * (h.y - j.y), e[g].id = l > 0 ? a[0].id : a[1].id, g++
    }
    return g
  };
  a.EdgeSeparation = function(e, a, d, b, g) {
    d === void 0 && (d = 0);
    for(var j = e.m_vertices, h = e.m_normals, e = b.m_vertices, l = a.R.col1.x * h[d].x + a.R.col2.x * h[d].y, h = a.R.col1.y * h[d].x + a.R.col2.y * h[d].y, k = g.R.col1.x * l + g.R.col1.y * h, n = g.R.col2.x * l + g.R.col2.y * h, q = 0, v = Number.MAX_VALUE, r = 0;r < b.m_vertexCount;++r) {
      var y = e[r].x * k + e[r].y * n;
      y < v && (v = y, q = r)
    }
    return(g.position.x + (g.R.col1.x * e[q].x + g.R.col2.x * e[q].y) - (a.position.x + (a.R.col1.x * j[d].x + a.R.col2.x * j[d].y))) * l + (g.position.y + (g.R.col1.y * e[q].x + g.R.col2.y * e[q].y) - (a.position.y + (a.R.col1.y * j[d].x + a.R.col2.y * j[d].y))) * h
  };
  a.FindMaxSeparation = function(e, f, d, b, g) {
    var j = f.m_normals, h = g.position.x + (g.R.col1.x * b.m_centroid.x + g.R.col2.x * b.m_centroid.y), l = g.position.y + (g.R.col1.y * b.m_centroid.x + g.R.col2.y * b.m_centroid.y);
    h -= d.position.x + (d.R.col1.x * f.m_centroid.x + d.R.col2.x * f.m_centroid.y);
    l -= d.position.y + (d.R.col1.y * f.m_centroid.x + d.R.col2.y * f.m_centroid.y);
    for(var k = h * d.R.col1.x + l * d.R.col1.y, l = h * d.R.col2.x + l * d.R.col2.y, h = 0, n = -Number.MAX_VALUE, q = 0;q < f.m_vertexCount;++q) {
      var v = j[q].x * k + j[q].y * l;
      v > n && (n = v, h = q)
    }
    j = a.EdgeSeparation(f, d, h, b, g);
    k = h - 1;
    k < 0 && (k = f.m_vertexCount - 1);
    l = a.EdgeSeparation(f, d, k, b, g);
    n = h + 1;
    n >= f.m_vertexCount && (n = 0);
    var q = a.EdgeSeparation(f, d, n, b, g), r = v = 0, y = 0;
    if(l > j && l > q) {
      y = -1, v = k, r = l
    }else {
      if(q > j) {
        y = 1, v = n, r = q
      }else {
        return e[0] = h, j
      }
    }
    for(;;) {
      if(y == -1 ? (h = v - 1, h < 0 && (h = f.m_vertexCount - 1)) : (h = v + 1, h >= f.m_vertexCount && (h = 0)), j = a.EdgeSeparation(f, d, h, b, g), j > r) {
        v = h, r = j
      }else {
        break
      }
    }
    e[0] = v;
    return r
  };
  a.FindIncidentEdge = function(e, a, d, b, g, j) {
    b === void 0 && (b = 0);
    for(var h = d.R.col1.x * a.m_normals[b].x + d.R.col2.x * a.m_normals[b].y, a = d.R.col1.y * a.m_normals[b].x + d.R.col2.y * a.m_normals[b].y, d = j.R.col1.x * h + j.R.col1.y * a, a = j.R.col2.x * h + j.R.col2.y * a, h = d, d = 0, l = Number.MAX_VALUE, k = 0;k < g.m_vertexCount;k++) {
      var n = h * g.m_normals[k].x + a * g.m_normals[k].y;
      n < l && (l = n, d = k)
    }
    h = d + 1;
    h >= g.m_vertexCount && (h = 0);
    e[0].v.x = j.position.x + (j.R.col1.x * g.m_vertices[d].x + j.R.col2.x * g.m_vertices[d].y);
    e[0].v.y = j.position.y + (j.R.col1.y * g.m_vertices[d].x + j.R.col2.y * g.m_vertices[d].y);
    e[0].id.features.referenceEdge = b;
    e[0].id.features.incidentEdge = d;
    e[0].id.features.incidentVertex = 0;
    e[1].v.x = j.position.x + (j.R.col1.x * g.m_vertices[h].x + j.R.col2.x * g.m_vertices[h].y);
    e[1].v.y = j.position.y + (j.R.col1.y * g.m_vertices[h].x + j.R.col2.y * g.m_vertices[h].y);
    e[1].id.features.referenceEdge = b;
    e[1].id.features.incidentEdge = h;
    e[1].id.features.incidentVertex = 1
  };
  a.MakeClipPointVector = function() {
    return[new Box2D.Collision.ClipVertex, new Box2D.Collision.ClipVertex]
  };
  a.CollidePolygons = function(e, f, d, b, g) {
    e.m_pointCount = 0;
    var j = f.m_radius + b.m_radius;
    a.s_edgeAO[0] = 0;
    var h = a.FindMaxSeparation(a.s_edgeAO, f, d, b, g);
    if(!(h > j)) {
      a.s_edgeBO[0] = 0;
      var l = a.FindMaxSeparation(a.s_edgeBO, b, g, f, d);
      if(!(l > j)) {
        var k = f, n = b, q = d, v = g, r = a.s_edgeAO[0], y = 0;
        e.m_type = Box2D.Collision.b2Manifold.e_faceA;
        if(l > 0.98 * h + 0.001) {
          k = b, n = f, q = g, v = d, r = a.s_edgeBO[0], e.m_type = Box2D.Collision.b2Manifold.e_faceB, y = 1
        }
        f = a.s_incidentEdge;
        a.FindIncidentEdge(f, k, q, r, n, v);
        n = k.m_vertices[r];
        k = r + 1 < k.m_vertexCount ? k.m_vertices[r + 1] : k.m_vertices[0];
        a.s_localTangent.Set(k.x - n.x, k.y - n.y);
        a.s_localTangent.Normalize();
        a.s_localNormal.x = a.s_localTangent.y;
        a.s_localNormal.y = -a.s_localTangent.x;
        a.s_planePoint.Set(0.5 * (n.x + k.x), 0.5 * (n.y + k.y));
        a.s_tangent.x = q.R.col1.x * a.s_localTangent.x + q.R.col2.x * a.s_localTangent.y;
        a.s_tangent.y = q.R.col1.y * a.s_localTangent.x + q.R.col2.y * a.s_localTangent.y;
        a.s_tangent2.x = -a.s_tangent.x;
        a.s_tangent2.y = -a.s_tangent.y;
        a.s_normal.x = a.s_tangent.y;
        a.s_normal.y = -a.s_tangent.x;
        a.s_v11.x = q.position.x + (q.R.col1.x * n.x + q.R.col2.x * n.y);
        a.s_v11.y = q.position.y + (q.R.col1.y * n.x + q.R.col2.y * n.y);
        a.s_v12.x = q.position.x + (q.R.col1.x * k.x + q.R.col2.x * k.y);
        a.s_v12.y = q.position.y + (q.R.col1.y * k.x + q.R.col2.y * k.y);
        if(!(a.ClipSegmentToLine(a.s_clipPoints1, f, a.s_tangent2, -a.s_tangent.x * a.s_v11.x - a.s_tangent.y * a.s_v11.y + j) < 2) && !(a.ClipSegmentToLine(a.s_clipPoints2, a.s_clipPoints1, a.s_tangent, a.s_tangent.x * a.s_v12.x + a.s_tangent.y * a.s_v12.y + j) < 2)) {
          e.m_localPlaneNormal.SetV(a.s_localNormal);
          e.m_localPoint.SetV(a.s_planePoint);
          q = a.s_normal.x * a.s_v11.x + a.s_normal.y * a.s_v11.y;
          for(r = k = 0;r < Box2D.Common.b2Settings.b2_maxManifoldPoints;++r) {
            if(a.s_normal.x * a.s_clipPoints2[r].v.x + a.s_normal.y * a.s_clipPoints2[r].v.y - q <= j) {
              n = a.s_clipPoints2[r].v.x - v.position.x, f = a.s_clipPoints2[r].v.y - v.position.y, e.m_points[k].m_localPoint.x = n * v.R.col1.x + f * v.R.col1.y, e.m_points[k].m_localPoint.y = n * v.R.col2.x + f * v.R.col2.y, e.m_points[k].m_id.Set(a.s_clipPoints2[r].id), e.m_points[k].m_id.features.flip = y, k++
            }
          }
          e.m_pointCount = k
        }
      }
    }
  };
  a.CollideCircles = function(e, a, d, b, g) {
    e.m_pointCount = 0;
    var j = g.position.x + (g.R.col1.x * b.m_p.x + g.R.col2.x * b.m_p.y) - (d.position.x + (d.R.col1.x * a.m_p.x + d.R.col2.x * a.m_p.y)), d = g.position.y + (g.R.col1.y * b.m_p.x + g.R.col2.y * b.m_p.y) - (d.position.y + (d.R.col1.y * a.m_p.x + d.R.col2.y * a.m_p.y)), g = a.m_radius + b.m_radius;
    if(!(j * j + d * d > g * g)) {
      e.m_type = Box2D.Collision.b2Manifold.e_circles, e.m_localPoint.SetV(a.m_p), e.m_localPlaneNormal.SetZero(), e.m_pointCount = 1, e.m_points[0].m_localPoint.SetV(b.m_p), e.m_points[0].m_id.key = 0
    }
  };
  a.CollidePolygonAndCircle = function(e, a, d, b, g) {
    e.m_pointCount = 0;
    for(var j = g.position.x + (g.R.col1.x * b.m_p.x + g.R.col2.x * b.m_p.y) - d.position.x, h = g.position.y + (g.R.col1.y * b.m_p.x + g.R.col2.y * b.m_p.y) - d.position.y, g = j * d.R.col1.x + h * d.R.col1.y, d = j * d.R.col2.x + h * d.R.col2.y, j = 0, h = -Number.MAX_VALUE, l = a.m_radius + b.m_radius, k = 0;k < a.m_vertexCount;++k) {
      var n = a.m_normals[k].x * (g - a.m_vertices[k].x) + a.m_normals[k].y * (d - a.m_vertices[k].y);
      if(n > l) {
        return
      }
      n > h && (h = n, j = k)
    }
    n = j + 1;
    n >= a.m_vertexCount && (n = 0);
    var k = a.m_vertices[j], q = a.m_vertices[n];
    if(h < Number.MIN_VALUE) {
      e.m_pointCount = 1, e.m_type = Box2D.Collision.b2Manifold.e_faceA, e.m_localPlaneNormal.SetV(a.m_normals[j]), e.m_localPoint.x = 0.5 * (k.x + q.x), e.m_localPoint.y = 0.5 * (k.y + q.y)
    }else {
      if((g - k.x) * (q.x - k.x) + (d - k.y) * (q.y - k.y) <= 0) {
        if((g - k.x) * (g - k.x) + (d - k.y) * (d - k.y) > l * l) {
          return
        }
        e.m_pointCount = 1;
        e.m_type = Box2D.Collision.b2Manifold.e_faceA;
        e.m_localPlaneNormal.x = g - k.x;
        e.m_localPlaneNormal.y = d - k.y;
        e.m_localPlaneNormal.Normalize();
        e.m_localPoint.SetV(k)
      }else {
        if((g - q.x) * (k.x - q.x) + (d - q.y) * (k.y - q.y) <= 0) {
          if((g - q.x) * (g - q.x) + (d - q.y) * (d - q.y) > l * l) {
            return
          }
          e.m_pointCount = 1;
          e.m_type = Box2D.Collision.b2Manifold.e_faceA;
          e.m_localPlaneNormal.x = g - q.x;
          e.m_localPlaneNormal.y = d - q.y;
          e.m_localPlaneNormal.Normalize();
          e.m_localPoint.SetV(q)
        }else {
          n = 0.5 * (k.x + q.x);
          k = 0.5 * (k.y + q.y);
          h = (g - n) * a.m_normals[j].x + (d - k) * a.m_normals[j].y;
          if(h > l) {
            return
          }
          e.m_pointCount = 1;
          e.m_type = Box2D.Collision.b2Manifold.e_faceA;
          e.m_localPlaneNormal.x = a.m_normals[j].x;
          e.m_localPlaneNormal.y = a.m_normals[j].y;
          e.m_localPlaneNormal.Normalize();
          e.m_localPoint.Set(n, k)
        }
      }
    }
    e.m_points[0].m_localPoint.SetV(b.m_p);
    e.m_points[0].m_id.key = 0
  };
  a.TestOverlap = function(e, a) {
    return a.lowerBound.x - e.upperBound.x > 0 ? !1 : a.lowerBound.y - e.upperBound.y > 0 ? !1 : e.lowerBound.x - a.upperBound.x > 0 ? !1 : e.lowerBound.y - a.upperBound.y > 0 ? !1 : !0
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
  a.prototype.Set = function(e) {
    this.key = e._key
  };
  a.prototype.Copy = function() {
    var e = new a;
    e.key = this.key;
    return e
  };
  Object.defineProperty(a.prototype, "key", {enumerable:!1, configurable:!0, get:function() {
    return this._key
  }, set:function(e) {
    e === void 0 && (e = 0);
    this._key = e;
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
  a.Distance = function(e, f, d) {
    a.s_simplex.ReadCache(f, d.proxyA, d.transformA, d.proxyB, d.transformB);
    (a.s_simplex.m_count < 1 || a.s_simplex.m_count > 3) && Box2D.Common.b2Settings.b2Assert(!1);
    for(var b = 0;b < 20;) {
      for(var g = [], j = 0;j < a.s_simplex.m_count;j++) {
        g[j] = {}, g[j].indexA = a.s_simplex.m_vertices[j].indexA, g[j].indexB = a.s_simplex.m_vertices[j].indexB
      }
      a.s_simplex.m_count == 2 ? a.s_simplex.Solve2() : a.s_simplex.m_count == 3 && a.s_simplex.Solve3();
      if(a.s_simplex.m_count == 3) {
        break
      }
      j = a.s_simplex.GetSearchDirection();
      if(j.LengthSquared() < Box2D.MIN_VALUE_SQUARED) {
        break
      }
      a.s_simplex.m_vertices[a.s_simplex.m_count].indexA = d.proxyA.GetSupport(Box2D.Common.Math.b2Math.MulTMV(d.transformA.R, j.GetNegative()));
      a.s_simplex.m_vertices[a.s_simplex.m_count].wA = Box2D.Common.Math.b2Math.MulX(d.transformA, d.proxyA.GetVertex(a.s_simplex.m_vertices[a.s_simplex.m_count].indexA));
      a.s_simplex.m_vertices[a.s_simplex.m_count].indexB = d.proxyB.GetSupport(Box2D.Common.Math.b2Math.MulTMV(d.transformB.R, j));
      a.s_simplex.m_vertices[a.s_simplex.m_count].wB = Box2D.Common.Math.b2Math.MulX(d.transformB, d.proxyB.GetVertex(a.s_simplex.m_vertices[a.s_simplex.m_count].indexB));
      a.s_simplex.m_vertices[a.s_simplex.m_count].w = Box2D.Common.Math.b2Math.SubtractVV(a.s_simplex.m_vertices[a.s_simplex.m_count].wB, a.s_simplex.m_vertices[a.s_simplex.m_count].wA);
      b++;
      for(var h = !1, j = 0;j < g.length;j++) {
        if(a.s_simplex.m_vertices[a.s_simplex.m_count].indexA == g[j].indexA && a.s_simplex.m_vertices[a.s_simplex.m_count].indexB == g[j].indexB) {
          h = !0;
          break
        }
      }
      if(h) {
        break
      }
      a.s_simplex.m_count++
    }
    a.s_simplex.GetWitnessPoints(e.pointA, e.pointB);
    e.distance = Box2D.Common.Math.b2Math.SubtractVV(e.pointA, e.pointB).Length();
    e.iterations = b;
    a.s_simplex.WriteCache(f);
    if(d.useRadii) {
      f = d.proxyA.m_radius, d = d.proxyB.m_radius, e.distance > f + d && e.distance > Number.MIN_VALUE ? (e.distance -= f + d, b = Box2D.Common.Math.b2Math.SubtractVV(e.pointB, e.pointA), b.Normalize(), e.pointA.x += f * b.x, e.pointA.y += f * b.y, e.pointB.x -= d * b.x, e.pointB.y -= d * b.y) : (d = new Box2D.Common.Math.b2Vec2, d.x = 0.5 * (e.pointA.x + e.pointB.x), d.y = 0.5 * (e.pointA.y + e.pointB.y), e.pointA.x = e.pointB.x = d.x, e.pointA.y = e.pointB.y = d.y, e.distance = 0)
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
  a.prototype.Set = function(e) {
    var a = e.GetType();
    a == Box2D.Collision.Shapes.b2Shape.e_circleShape ? (this.m_vertices = [e.m_p], this.m_count = 1, this.m_radius = e.m_radius) : a == Box2D.Collision.Shapes.b2Shape.e_polygonShape ? (this.m_vertices = e.m_vertices, this.m_count = e.m_vertexCount, this.m_radius = e.m_radius) : Box2D.Common.b2Settings.b2Assert(!1)
  };
  a.prototype.GetSupport = function(e) {
    for(var a = 0, d = this.m_vertices[0].x * e.x + this.m_vertices[0].y * e.y, b = 1;b < this.m_count;b++) {
      var g = this.m_vertices[b].x * e.x + this.m_vertices[b].y * e.y;
      g > d && (a = b, d = g)
    }
    return a
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
    var f = this.m_contactManager.m_broadPhase;
    this.m_contactManager.m_broadPhase = a;
    for(var d = this.m_bodyList;d;d = d.m_next) {
      for(var b = d.m_fixtureList;b;b = b.m_next) {
        b.m_proxy = a.CreateProxy(f.GetFatAABB(b.m_proxy), b)
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
      for(var f = a.m_jointList;f;) {
        var d = f, f = f.next;
        this.m_destructionListener && this.m_destructionListener.SayGoodbyeJoint(d.joint);
        this.DestroyJoint(d.joint)
      }
      for(f = a.m_controllerList;f;) {
        d = f, f = f.nextController, d.controller.RemoveBody(a)
      }
      for(f = a.m_contactList;f;) {
        d = f, f = f.next, this.m_contactManager.Destroy(d.contact)
      }
      a.m_contactList = null;
      for(f = a.m_fixtureList;f;) {
        d = f, f = f.m_next, this.m_destructionListener && this.m_destructionListener.SayGoodbyeFixture(d), d.DestroyProxy(this.m_contactManager.m_broadPhase), d.Destroy()
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
    var f = Box2D.Dynamics.Joints.b2Joint.Create(a, null);
    f.m_prev = null;
    if(f.m_next = this.m_jointList) {
      this.m_jointList.m_prev = f
    }
    this.m_jointList = f;
    this.m_jointCount++;
    f.m_edgeA.joint = f;
    f.m_edgeA.other = f.m_bodyB;
    f.m_edgeA.prev = null;
    if(f.m_edgeA.next = f.m_bodyA.m_jointList) {
      f.m_bodyA.m_jointList.prev = f.m_edgeA
    }
    f.m_bodyA.m_jointList = f.m_edgeA;
    f.m_edgeB.joint = f;
    f.m_edgeB.other = f.m_bodyA;
    f.m_edgeB.prev = null;
    if(f.m_edgeB.next = f.m_bodyB.m_jointList) {
      f.m_bodyB.m_jointList.prev = f.m_edgeB
    }
    f.m_bodyB.m_jointList = f.m_edgeB;
    var d = a.bodyA, b = a.bodyB;
    if(!a.collideConnected) {
      for(a = b.GetContactList();a;) {
        a.other == d && a.contact.FlagForFiltering(), a = a.next
      }
    }
    return f
  };
  a.prototype.DestroyJoint = function(a) {
    var f = a.m_collideConnected;
    if(a.m_prev) {
      a.m_prev.m_next = a.m_next
    }
    if(a.m_next) {
      a.m_next.m_prev = a.m_prev
    }
    if(a == this.m_jointList) {
      this.m_jointList = a.m_next
    }
    var d = a.m_bodyA, b = a.m_bodyB;
    d.SetAwake(!0);
    b.SetAwake(!0);
    if(a.m_edgeA.prev) {
      a.m_edgeA.prev.next = a.m_edgeA.next
    }
    if(a.m_edgeA.next) {
      a.m_edgeA.next.prev = a.m_edgeA.prev
    }
    if(a.m_edgeA == d.m_jointList) {
      d.m_jointList = a.m_edgeA.next
    }
    a.m_edgeA.prev = null;
    a.m_edgeA.next = null;
    if(a.m_edgeB.prev) {
      a.m_edgeB.prev.next = a.m_edgeB.next
    }
    if(a.m_edgeB.next) {
      a.m_edgeB.next.prev = a.m_edgeB.prev
    }
    if(a.m_edgeB == b.m_jointList) {
      b.m_jointList = a.m_edgeB.next
    }
    a.m_edgeB.prev = null;
    a.m_edgeB.next = null;
    Box2D.Dynamics.Joints.b2Joint.Destroy(a, null);
    this.m_jointCount--;
    if(!f) {
      for(a = b.GetContactList();a;) {
        a.other == d && a.contact.FlagForFiltering(), a = a.next
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
  a.prototype.Step = function(e, f, d) {
    e === void 0 && (e = 0);
    f === void 0 && (f = 0);
    d === void 0 && (d = 0);
    if(this.m_newFixture) {
      this.m_contactManager.FindNewContacts(), this.m_newFixture = !1
    }
    this.m_isLocked = !0;
    var b = new Box2D.Dynamics.b2TimeStep;
    b.dt = e;
    b.velocityIterations = f;
    b.positionIterations = d;
    b.inv_dt = e > 0 ? 1 / e : 0;
    b.dtRatio = this.m_inv_dt0 * e;
    b.warmStarting = a.m_warmStarting;
    this.m_contactManager.Collide();
    if(b.dt > 0) {
      this.Solve(b), a.m_continuousPhysics && b.dt > 0 && this.SolveTOI(b), this.m_inv_dt0 = b.inv_dt
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
        for(var f = new Box2D.Common.b2Color(0.5, 0.5, 0.3), d = new Box2D.Common.b2Color(0.5, 0.9, 0.5), b = new Box2D.Common.b2Color(0.5, 0.5, 0.9), g = new Box2D.Common.b2Color(0.6, 0.6, 0.6), j = new Box2D.Common.b2Color(0.9, 0.7, 0.7), h = this.m_bodyList;h;h = h.m_next) {
          for(var l = h.GetFixtureList();l;l = l.m_next) {
            var k = l.GetShape();
            h.IsActive() ? h.GetType() == Box2D.Dynamics.b2Body.b2_staticBody ? this.DrawShape(k, h.m_xf, d) : h.GetType() == Box2D.Dynamics.b2Body.b2_kinematicBody ? this.DrawShape(k, h.m_xf, b) : h.IsAwake() ? this.DrawShape(k, h.m_xf, j) : this.DrawShape(k, h.m_xf, g) : this.DrawShape(k, h.m_xf, f)
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
        for(l = this.m_contactManager.m_contactList;l;l = l.GetNext()) {
          d = l.GetFixtureA(), f = l.GetFixtureB(), d = d.GetAABB().GetCenter(), f = f.GetAABB().GetCenter(), this.m_debugDraw.DrawSegment(d, f, h)
        }
      }
      if(e & Box2D.Dynamics.b2DebugDraw.e_aabbBit) {
        f = new Box2D.Common.b2Color(0, 0, 0.8);
        for(h = this.m_bodyList;h;h = h.GetNext()) {
          if(h.IsActive()) {
            for(l = h.GetFixtureList();l;l = l.GetNext()) {
              d = this.m_contactManager.m_broadPhase.GetFatAABB(l.m_proxy), this.m_debugDraw.DrawPolygon([new Box2D.Common.Math.b2Vec2(d.lowerBound.x, d.lowerBound.y), new Box2D.Common.Math.b2Vec2(d.upperBound.x, d.lowerBound.y), new Box2D.Common.Math.b2Vec2(d.upperBound.x, d.upperBound.y), new Box2D.Common.Math.b2Vec2(d.lowerBound.x, d.upperBound.y)], 4, f)
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
  a.prototype.QueryAABB = function(a, f) {
    var d = this.m_contactManager.m_broadPhase;
    d.Query(function(b) {
      return a(d.GetUserData(b))
    }, f)
  };
  a.prototype.QueryShape = function(a, f, d) {
    if(d === void 0 || d === null) {
      d = new Box2D.Common.Math.b2Transform, d.SetIdentity()
    }
    var b = this.m_contactManager.m_broadPhase, g = new Box2D.Collision.b2AABB;
    f.ComputeAABB(g, d);
    b.Query(function(g) {
      g = b.GetUserData(g);
      g instanceof Box2D.Dynamics.b2Fixture || (g = null);
      return Box2D.Collision.Shapes.b2Shape.TestOverlap(f, d, g.GetShape(), g.GetBody().GetTransform()) ? a(g) : !0
    }, g)
  };
  a.prototype.QueryPoint = function(a, f) {
    var d = this.m_contactManager.m_broadPhase, b = new Box2D.Collision.b2AABB;
    b.lowerBound.Set(f.x - Box2D.Common.b2Settings.b2_linearSlop, f.y - Box2D.Common.b2Settings.b2_linearSlop);
    b.upperBound.Set(f.x + Box2D.Common.b2Settings.b2_linearSlop, f.y + Box2D.Common.b2Settings.b2_linearSlop);
    d.Query(function(b) {
      b = d.GetUserData(b);
      b instanceof Box2D.Dynamics.b2Fixture || (b = null);
      return b.TestPoint(f) ? a(b) : !0
    }, b)
  };
  a.prototype.RayCast = function(a, f, d) {
    var b = this.m_contactManager.m_broadPhase, g = new Box2D.Collision.b2RayCastOutput, j = new Box2D.Collision.b2RayCastInput(f, d);
    b.RayCast(function(h, l) {
      var k = b.GetUserData(l);
      k instanceof Box2D.Dynamics.b2Fixture || (k = null);
      if(k.RayCast(g, h)) {
        var j = 1 - g.fraction, j = new Box2D.Common.Math.b2Vec2(j * f.x + g.fraction * d.x, j * f.y + g.fraction * d.y);
        return a(k, j, g.normal, g.fraction)
      }else {
        return h.maxFraction
      }
    }, j)
  };
  a.prototype.RayCastOne = function(a, f) {
    var d;
    this.RayCast(function(a, e, f, h) {
      h === void 0 && (h = 0);
      d = a;
      return h
    }, a, f);
    return d
  };
  a.prototype.RayCastAll = function(a, f) {
    var d = [];
    this.RayCast(function(a) {
      d[d.length] = a;
      return 1
    }, a, f);
    return d
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
    for(var f = this.m_controllerList;f;f = f.m_next) {
      f.Step(a)
    }
    this.m_island.Initialize(this.m_bodyCount, this.m_contactCount, this.m_jointCount, this.m_contactManager.m_contactListener, this.m_contactSolver);
    for(var d = this.m_bodyList;d;d = d.m_next) {
      d.m_islandFlag = !1
    }
    for(f = this.m_contactList;f;f = f.m_next) {
      f.m_islandFlag = !1
    }
    for(f = this.m_jointList;f;f = f.m_next) {
      f.m_islandFlag = !1
    }
    for(f = this.m_bodyList;f;f = f.m_next) {
      if(!f.m_islandFlag && f.IsAwake() && f.IsActive() && f.GetType() != Box2D.Dynamics.b2Body.b2_staticBody) {
        this.m_island.Clear();
        var b = [];
        b.push(f);
        for(f.m_islandFlag = !0;b.length > 0;) {
          if(d = b.pop(), this.m_island.AddBody(d), d.IsAwake() || d.SetAwake(!0), d.GetType() != Box2D.Dynamics.b2Body.b2_staticBody) {
            for(var g = d.m_contactList;g;g = g.next) {
              if(!g.contact.m_islandFlag && !g.contact.IsSensor() && g.contact.IsEnabled() != !1 && g.contact.IsTouching() && (this.m_island.AddContact(g.contact), g.contact.m_islandFlag = !0, !g.other.m_islandFlag)) {
                b.push(g.other), g.other.m_islandFlag = !0
              }
            }
            for(d = d.m_jointList;d;d = d.next) {
              if(!d.joint.m_islandFlag && d.other.IsActive() && (this.m_island.AddJoint(d.joint), d.joint.m_islandFlag = !0, !d.other.m_islandFlag)) {
                b.push(d.other), d.other.m_islandFlag = !0
              }
            }
          }
        }
        this.m_island.Solve(a, this.m_gravity, this.m_allowSleep);
        for(b = 0;b < this.m_island.m_bodyCount;++b) {
          if(this.m_island.m_bodies[b].GetType() == Box2D.Dynamics.b2Body.b2_staticBody) {
            this.m_island.m_bodies[b].m_islandFlag = !1
          }
        }
      }
    }
    for(d = this.m_bodyList;d;d = d.m_next) {
      d.IsAwake() && d.IsActive() && d.GetType() != Box2D.Dynamics.b2Body.b2_staticBody && d.SynchronizeFixtures()
    }
    this.m_contactManager.FindNewContacts()
  };
  a.prototype.SolveTOI = function(e) {
    this.m_island.Initialize(this.m_bodyCount, Box2D.Common.b2Settings.b2_maxTOIContactsPerIsland, Box2D.Common.b2Settings.b2_maxTOIJointsPerIsland, this.m_contactManager.m_contactListener, this.m_contactSolver);
    for(var f = this.m_bodyList;f;f = f.m_next) {
      f.m_islandFlag = !1, f.m_sweep.t0 = 0
    }
    for(var d = this.m_contactList;d;d = d.m_next) {
      d.m_islandFlag = !1, d.m_toi = null
    }
    for(d = this.m_jointList;d;d = d.m_next) {
      d.m_islandFlag = !1
    }
    for(;;) {
      var d = this._SolveTOI2(e), b = d.minContact, d = d.minTOI;
      if(b === null || a.MAX_TOI < d) {
        break
      }
      a.s_backupA.Set(b.m_fixtureA.m_body.m_sweep);
      a.s_backupB.Set(b.m_fixtureB.m_body.m_sweep);
      b.m_fixtureA.m_body.Advance(d);
      b.m_fixtureB.m_body.Advance(d);
      b.Update(this.m_contactManager.m_contactListener);
      b.m_toi = null;
      if(b.IsSensor() || b.IsEnabled() == !1) {
        b.m_fixtureA.m_body.m_sweep.Set(a.s_backupA), b.m_fixtureB.m_body.m_sweep.Set(a.s_backupB), b.m_fixtureA.m_body.SynchronizeTransform(), b.m_fixtureB.m_body.SynchronizeTransform()
      }else {
        if(b.IsTouching()) {
          var g = b.m_fixtureA.m_body;
          if(g.GetType() != Box2D.Dynamics.b2Body.b2_dynamicBody) {
            g = b.m_fixtureB.m_body
          }
          this.m_island.Clear();
          b = new Box2D.Queue;
          b.enqueue(g);
          for(g.m_islandFlag = !0;b.size > 0;) {
            if(f = b.dequeue(), this.m_island.AddBody(f), f.IsAwake() || f.SetAwake(!0), f.GetType() == Box2D.Dynamics.b2Body.b2_dynamicBody) {
              for(g = f.m_contactList;g;g = g.next) {
                if(this.m_island.m_contactCount == this.m_island.m_contactCapacity) {
                  break
                }
                if(!g.contact.m_islandFlag && !g.contact.IsSensor() && g.contact.IsEnabled() != !1 && g.contact.IsTouching() && (this.m_island.AddContact(g.contact), g.contact.m_islandFlag = !0, !g.other.m_islandFlag)) {
                  g.other.GetType() != Box2D.Dynamics.b2Body.b2_staticBody && (g.other.Advance(d), g.other.SetAwake(!0)), b.enqueue(g.other), g.other.m_islandFlag = !0
                }
              }
              for(g = f.m_jointList;g;g = g.next) {
                if(this.m_island.m_jointCount != this.m_island.m_jointCapacity && !g.joint.m_islandFlag && g.other.IsActive() && (this.m_island.AddJoint(g.joint), g.joint.m_islandFlag = !0, !g.other.m_islandFlag)) {
                  g.other.GetType() != Box2D.Dynamics.b2Body.b2_staticBody && (g.other.Advance(d), g.other.SetAwake(!0)), b.enqueue(g.other), g.other.m_islandFlag = !0
                }
              }
            }
          }
          b = new Box2D.Dynamics.b2TimeStep;
          b.warmStarting = !1;
          b.dt = (1 - d) * e.dt;
          b.inv_dt = 1 / b.dt;
          b.dtRatio = 0;
          b.velocityIterations = e.velocityIterations;
          b.positionIterations = e.positionIterations;
          this.m_island.SolveTOI(b);
          for(d = 0;d < this.m_island.m_bodyCount;d++) {
            if(this.m_island.m_bodies[d].m_islandFlag = !1, this.m_island.m_bodies[d].IsAwake() && this.m_island.m_bodies[d].GetType() == Box2D.Dynamics.b2Body.b2_dynamicBody) {
              this.m_island.m_bodies[d].SynchronizeFixtures();
              for(g = this.m_island.m_bodies[d].m_contactList;g;g = g.next) {
                g.contact.m_toi = null
              }
            }
          }
          for(d = 0;d < this.m_island.m_contactCount;d++) {
            this.m_island.m_contacts[d].m_islandFlag = !1, this.m_island.m_contacts[d].m_toi = null
          }
          for(d = 0;d < this.m_island.m_jointCount;d++) {
            this.m_island.m_joints[d].m_islandFlag = !1
          }
          this.m_contactManager.FindNewContacts()
        }
      }
    }
  };
  a.prototype._SolveTOI2 = function(a) {
    for(var f = null, d = 1, b = this.m_contactList;b;b = b.m_next) {
      if(!this._SolveTOI2SkipContact(a, b)) {
        var g = 1;
        if(b.m_toi != null) {
          g = b.m_toi
        }else {
          if(b.IsTouching()) {
            g = 1
          }else {
            var j = b.m_fixtureA.m_body.m_sweep.t0;
            if(b.m_fixtureA.m_body.m_sweep.t0 < b.m_fixtureB.m_body.m_sweep.t0) {
              j = b.m_fixtureB.m_body.m_sweep.t0, b.m_fixtureA.m_body.m_sweep.Advance(j)
            }else {
              if(b.m_fixtureB.m_body.m_sweep.t0 < b.m_fixtureA.m_body.m_sweep.t0) {
                j = b.m_fixtureA.m_body.m_sweep.t0, b.m_fixtureB.m_body.m_sweep.Advance(j)
              }
            }
            g = b.ComputeTOI(b.m_fixtureA.m_body.m_sweep, b.m_fixtureB.m_body.m_sweep);
            Box2D.Common.b2Settings.b2Assert(0 <= g && g <= 1);
            g > 0 && g < 1 && (g = (1 - g) * j + g)
          }
          b.m_toi = g
        }
        Number.MIN_VALUE < g && g < d && (f = b, d = g)
      }
    }
    return{minContact:f, minTOI:d}
  };
  a.prototype._SolveTOI2SkipContact = function(a, f) {
    return f.IsSensor() || f.IsEnabled() == !1 || !f.IsContinuous() ? !0 : (f.m_fixtureA.m_body.GetType() != Box2D.Dynamics.b2Body.b2_dynamicBody || !f.m_fixtureA.m_body.IsAwake()) && (f.m_fixtureB.m_body.GetType() != Box2D.Dynamics.b2Body.b2_dynamicBody || !f.m_fixtureB.m_body.IsAwake()) ? !0 : !1
  };
  a.prototype.DrawJoint = function(e) {
    e.m_type == Box2D.Dynamics.Joints.b2Joint.e_distanceJoint || e.m_type == Box2D.Dynamics.Joints.b2Joint.e_mouseJoint ? this.m_debugDraw.DrawSegment(e.GetAnchorA(), e.GetAnchorB(), a.s_jointColor) : e.m_type == Box2D.Dynamics.Joints.b2Joint.e_pulleyJoint ? (this.m_debugDraw.DrawSegment(e.GetGroundAnchorA(), e.GetAnchorA(), a.s_jointColor), this.m_debugDraw.DrawSegment(e.GetGroundAnchorB(), e.GetAnchorB(), a.s_jointColor), this.m_debugDraw.DrawSegment(e.GetGroundAnchorA(), e.GetGroundAnchorB(), 
    a.s_jointColor)) : (e.GetBodyA() != this.m_groundBody && this.m_debugDraw.DrawSegment(e.GetBodyA().m_xf.position, e.GetAnchorA(), a.s_jointColor), this.m_debugDraw.DrawSegment(e.GetAnchorA(), e.GetAnchorB(), a.s_jointColor), e.GetBodyB() != this.m_groundBody && this.m_debugDraw.DrawSegment(e.GetBodyB().m_xf.position, e.GetAnchorB(), a.s_jointColor))
  };
  a.prototype.DrawShape = function(a, f, d) {
    switch(a.m_type) {
      case Box2D.Collision.Shapes.b2Shape.e_circleShape:
        var b = a instanceof Box2D.Collision.Shapes.b2CircleShape ? a : null;
        this.m_debugDraw.DrawSolidCircle(Box2D.Common.Math.b2Math.MulX(f, b.m_p), b.m_radius, f.R.col1, d);
        break;
      case Box2D.Collision.Shapes.b2Shape.e_polygonShape:
        for(var b = 0, b = a instanceof Box2D.Collision.Shapes.b2PolygonShape ? a : null, a = parseInt(b.GetVertexCount()), g = b.GetVertices(), j = Array(a), b = 0;b < a;++b) {
          j[b] = Box2D.Common.Math.b2Math.MulX(f, g[b])
        }
        this.m_debugDraw.DrawSolidPolygon(j, a, d);
        break;
      case Box2D.Collision.Shapes.b2Shape.e_edgeShape:
        b = a instanceof Box2D.Collision.Shapes.b2EdgeShape ? a : null, this.m_debugDraw.DrawSegment(Box2D.Common.Math.b2Math.MulX(f, b.GetVertex1()), Box2D.Common.Math.b2Math.MulX(f, b.GetVertex2()), d)
    }
  };
  Box2D.postDefs.push(function() {
    Box2D.Dynamics.b2World.s_xf = new Box2D.Common.Math.b2Transform;
    Box2D.Dynamics.b2World.s_backupA = new Box2D.Common.Math.b2Sweep;
    Box2D.Dynamics.b2World.s_backupB = new Box2D.Common.Math.b2Sweep;
    Box2D.Dynamics.b2World.s_jointColor = new Box2D.Common.b2Color(0.5, 0.8, 0.8)
  })
})(Box2D.Dynamics.b2World);
Box2D.Dynamics.b2DebugDraw = function() {
  this.m_xformScale = this.m_fillAlpha = this.m_alpha = this.m_lineThickness = this.m_drawScale = 1;
  var a = this;
  this.m_sprite = {graphics:{clear:function() {
    a.m_ctx.clearRect(0, 0, a.m_ctx.canvas.width, a.m_ctx.canvas.height)
  }}};
  if(this.constructor === Box2D.Dynamics.b2DebugDraw) {
    this.m_drawFlags = 0
  }
};
(function(a) {
  a.prototype._color = function(a, f) {
    return"rgba(" + ((a & 16711680) >> 16) + "," + ((a & 65280) >> 8) + "," + (a & 255) + "," + f + ")"
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
  a.prototype.DrawPolygon = function(a, f, d) {
    if(f) {
      var b = this.m_ctx, g = this.m_drawScale;
      b.beginPath();
      b.strokeStyle = this._color(d.color, this.m_alpha);
      b.moveTo(a[0].x * g, a[0].y * g);
      for(d = 1;d < f;d++) {
        b.lineTo(a[d].x * g, a[d].y * g)
      }
      b.lineTo(a[0].x * g, a[0].y * g);
      b.closePath();
      b.stroke()
    }
  };
  a.prototype.DrawSolidPolygon = function(a, f, d) {
    if(f) {
      var b = this.m_ctx, g = this.m_drawScale;
      b.beginPath();
      b.strokeStyle = this._color(d.color, this.m_alpha);
      b.fillStyle = this._color(d.color, this.m_fillAlpha);
      b.moveTo(a[0].x * g, a[0].y * g);
      for(d = 1;d < f;d++) {
        b.lineTo(a[d].x * g, a[d].y * g)
      }
      b.lineTo(a[0].x * g, a[0].y * g);
      b.closePath();
      b.fill();
      b.stroke()
    }
  };
  a.prototype.DrawCircle = function(a, f, d) {
    if(f) {
      var b = this.m_ctx, g = this.m_drawScale;
      b.beginPath();
      b.strokeStyle = this._color(d.color, this.m_alpha);
      b.arc(a.x * g, a.y * g, f * g, 0, Math.PI * 2, !0);
      b.closePath();
      b.stroke()
    }
  };
  a.prototype.DrawSolidCircle = function(a, f, d, b) {
    if(f) {
      var g = this.m_ctx, j = this.m_drawScale, h = a.x * j, l = a.y * j;
      g.moveTo(0, 0);
      g.beginPath();
      g.strokeStyle = this._color(b.color, this.m_alpha);
      g.fillStyle = this._color(b.color, this.m_fillAlpha);
      g.arc(h, l, f * j, 0, Math.PI * 2, !0);
      g.moveTo(h, l);
      g.lineTo((a.x + d.x * f) * j, (a.y + d.y * f) * j);
      g.closePath();
      g.fill();
      g.stroke()
    }
  };
  a.prototype.DrawSegment = function(a, f, d) {
    var b = this.m_ctx, g = this.m_drawScale;
    b.strokeStyle = this._color(d.color, this.m_alpha);
    b.beginPath();
    b.moveTo(a.x * g, a.y * g);
    b.lineTo(f.x * g, f.y * g);
    b.closePath();
    b.stroke()
  };
  a.prototype.DrawTransform = function(a) {
    var f = this.m_ctx, d = this.m_drawScale;
    f.beginPath();
    f.strokeStyle = this._color(16711680, this.m_alpha);
    f.moveTo(a.position.x * d, a.position.y * d);
    f.lineTo((a.position.x + this.m_xformScale * a.R.col1.x) * d, (a.position.y + this.m_xformScale * a.R.col1.y) * d);
    f.strokeStyle = this._color(65280, this.m_alpha);
    f.moveTo(a.position.x * d, a.position.y * d);
    f.lineTo((a.position.x + this.m_xformScale * a.R.col2.x) * d, (a.position.y + this.m_xformScale * a.R.col2.y) * d);
    f.closePath();
    f.stroke()
  };
  Box2D.postDefs.push(function() {
    Box2D.Dynamics.b2DebugDraw.e_shapeBit = 1;
    Box2D.Dynamics.b2DebugDraw.e_jointBit = 2;
    Box2D.Dynamics.b2DebugDraw.e_aabbBit = 4;
    Box2D.Dynamics.b2DebugDraw.e_pairBit = 8;
    Box2D.Dynamics.b2DebugDraw.e_centerOfMassBit = 16;
    Box2D.Dynamics.b2DebugDraw.e_controllerBit = 32
  })
})(Box2D.Dynamics.b2DebugDraw);
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
  function f() {
    f.b2Mat22.apply(this, arguments);
    this.constructor === f && this.b2Mat22.apply(this, arguments)
  }
  function d() {
    d.b2Mat33.apply(this, arguments);
    this.constructor === d && this.b2Mat33.apply(this, arguments)
  }
  function b() {
    b.b2Math.apply(this, arguments)
  }
  function g() {
    g.b2Sweep.apply(this, arguments)
  }
  function j() {
    j.b2Transform.apply(this, arguments);
    this.constructor === j && this.b2Transform.apply(this, arguments)
  }
  function h() {
    h.b2Vec2.apply(this, arguments);
    this.constructor === h && this.b2Vec2.apply(this, arguments)
  }
  function l() {
    l.b2Vec3.apply(this, arguments);
    this.constructor === l && this.b2Vec3.apply(this, arguments)
  }
  function k() {
    k.b2Body.apply(this, arguments);
    this.constructor === k && this.b2Body.apply(this, arguments)
  }
  function n() {
    n.b2BodyDef.apply(this, arguments);
    this.constructor === n && this.b2BodyDef.apply(this, arguments)
  }
  function q() {
    q.b2ContactFilter.apply(this, arguments)
  }
  function v() {
    v.b2ContactImpulse.apply(this, arguments)
  }
  function r() {
    r.b2ContactListener.apply(this, arguments)
  }
  function y() {
    y.b2ContactManager.apply(this, arguments);
    this.constructor === y && this.b2ContactManager.apply(this, arguments)
  }
  function B() {
    B.b2DestructionListener.apply(this, arguments)
  }
  function s() {
    s.b2FilterData.apply(this, arguments)
  }
  function z() {
    z.b2Fixture.apply(this, arguments);
    this.constructor === z && this.b2Fixture.apply(this, arguments)
  }
  function G() {
    G.b2FixtureDef.apply(this, arguments);
    this.constructor === G && this.b2FixtureDef.apply(this, arguments)
  }
  function I() {
    I.b2Island.apply(this, arguments);
    this.constructor === I && this.b2Island.apply(this, arguments)
  }
  function H() {
    H.b2TimeStep.apply(this, arguments)
  }
  function J() {
    J.b2BuoyancyController.apply(this, arguments)
  }
  function o() {
    o.b2ConstantAccelController.apply(this, arguments)
  }
  function x() {
    x.b2ConstantForceController.apply(this, arguments)
  }
  function t() {
    t.b2Controller.apply(this, arguments)
  }
  function F() {
    F.b2ControllerEdge.apply(this, arguments)
  }
  function L() {
    L.b2GravityController.apply(this, arguments)
  }
  function N() {
    N.b2TensorDampingController.apply(this, arguments)
  }
  function m() {
    m.b2DistanceJoint.apply(this, arguments);
    this.constructor === m && this.b2DistanceJoint.apply(this, arguments)
  }
  function u() {
    u.b2DistanceJointDef.apply(this, arguments);
    this.constructor === u && this.b2DistanceJointDef.apply(this, arguments)
  }
  function p() {
    p.b2FrictionJoint.apply(this, arguments);
    this.constructor === p && this.b2FrictionJoint.apply(this, arguments)
  }
  function C() {
    C.b2FrictionJointDef.apply(this, arguments);
    this.constructor === C && this.b2FrictionJointDef.apply(this, arguments)
  }
  function K() {
    K.b2GearJoint.apply(this, arguments);
    this.constructor === K && this.b2GearJoint.apply(this, arguments)
  }
  function M() {
    M.b2GearJointDef.apply(this, arguments);
    this.constructor === M && this.b2GearJointDef.apply(this, arguments)
  }
  function D() {
    D.b2Jacobian.apply(this, arguments)
  }
  function A() {
    A.b2Joint.apply(this, arguments);
    this.constructor === A && this.b2Joint.apply(this, arguments)
  }
  function w() {
    w.b2JointDef.apply(this, arguments);
    this.constructor === w && this.b2JointDef.apply(this, arguments)
  }
  function E() {
    E.b2JointEdge.apply(this, arguments)
  }
  function O() {
    O.b2LineJoint.apply(this, arguments);
    this.constructor === O && this.b2LineJoint.apply(this, arguments)
  }
  function P() {
    P.b2LineJointDef.apply(this, arguments);
    this.constructor === P && this.b2LineJointDef.apply(this, arguments)
  }
  function Q() {
    Q.b2MouseJoint.apply(this, arguments);
    this.constructor === Q && this.b2MouseJoint.apply(this, arguments)
  }
  function R() {
    R.b2MouseJointDef.apply(this, arguments);
    this.constructor === R && this.b2MouseJointDef.apply(this, arguments)
  }
  function S() {
    S.b2PrismaticJoint.apply(this, arguments);
    this.constructor === S && this.b2PrismaticJoint.apply(this, arguments)
  }
  function T() {
    T.b2PrismaticJointDef.apply(this, arguments);
    this.constructor === T && this.b2PrismaticJointDef.apply(this, arguments)
  }
  function U() {
    U.b2PulleyJoint.apply(this, arguments);
    this.constructor === U && this.b2PulleyJoint.apply(this, arguments)
  }
  function V() {
    V.b2PulleyJointDef.apply(this, arguments);
    this.constructor === V && this.b2PulleyJointDef.apply(this, arguments)
  }
  function W() {
    W.b2RevoluteJoint.apply(this, arguments);
    this.constructor === W && this.b2RevoluteJoint.apply(this, arguments)
  }
  function X() {
    X.b2RevoluteJointDef.apply(this, arguments);
    this.constructor === X && this.b2RevoluteJointDef.apply(this, arguments)
  }
  function Y() {
    Y.b2WeldJoint.apply(this, arguments);
    this.constructor === Y && this.b2WeldJoint.apply(this, arguments)
  }
  function Z() {
    Z.b2WeldJointDef.apply(this, arguments);
    this.constructor === Z && this.b2WeldJointDef.apply(this, arguments)
  }
  Box2D.MIN_VALUE_SQUARED = Number.MIN_VALUE * Number.MIN_VALUE;
  Box2D.Common.b2internal = "Box2D.Common.b2internal";
  Box2D.Common.b2Color = a;
  Box2D.Common.b2Settings = e;
  Box2D.Common.Math.b2Mat22 = f;
  Box2D.Common.Math.b2Mat33 = d;
  Box2D.Common.Math.b2Math = b;
  Box2D.Common.Math.b2Sweep = g;
  Box2D.Common.Math.b2Transform = j;
  Box2D.Common.Math.b2Vec2 = h;
  Box2D.Common.Math.b2Vec3 = l;
  Box2D.Dynamics.b2Body = k;
  Box2D.Dynamics.b2BodyDef = n;
  Box2D.Dynamics.b2ContactFilter = q;
  Box2D.Dynamics.b2ContactImpulse = v;
  Box2D.Dynamics.b2ContactListener = r;
  Box2D.Dynamics.b2ContactManager = y;
  Box2D.Dynamics.b2DestructionListener = B;
  Box2D.Dynamics.b2FilterData = s;
  Box2D.Dynamics.b2Fixture = z;
  Box2D.Dynamics.b2FixtureDef = G;
  Box2D.Dynamics.b2Island = I;
  Box2D.Dynamics.b2TimeStep = H;
  Box2D.Dynamics.Controllers.b2BuoyancyController = J;
  Box2D.Dynamics.Controllers.b2ConstantAccelController = o;
  Box2D.Dynamics.Controllers.b2ConstantForceController = x;
  Box2D.Dynamics.Controllers.b2Controller = t;
  Box2D.Dynamics.Controllers.b2ControllerEdge = F;
  Box2D.Dynamics.Controllers.b2GravityController = L;
  Box2D.Dynamics.Controllers.b2TensorDampingController = N;
  Box2D.Dynamics.Joints.b2DistanceJoint = m;
  Box2D.Dynamics.Joints.b2DistanceJointDef = u;
  Box2D.Dynamics.Joints.b2FrictionJoint = p;
  Box2D.Dynamics.Joints.b2FrictionJointDef = C;
  Box2D.Dynamics.Joints.b2GearJoint = K;
  Box2D.Dynamics.Joints.b2GearJointDef = M;
  Box2D.Dynamics.Joints.b2Jacobian = D;
  Box2D.Dynamics.Joints.b2Joint = A;
  Box2D.Dynamics.Joints.b2JointDef = w;
  Box2D.Dynamics.Joints.b2JointEdge = E;
  Box2D.Dynamics.Joints.b2LineJoint = O;
  Box2D.Dynamics.Joints.b2LineJointDef = P;
  Box2D.Dynamics.Joints.b2MouseJoint = Q;
  Box2D.Dynamics.Joints.b2MouseJointDef = R;
  Box2D.Dynamics.Joints.b2PrismaticJoint = S;
  Box2D.Dynamics.Joints.b2PrismaticJointDef = T;
  Box2D.Dynamics.Joints.b2PulleyJoint = U;
  Box2D.Dynamics.Joints.b2PulleyJointDef = V;
  Box2D.Dynamics.Joints.b2RevoluteJoint = W;
  Box2D.Dynamics.Joints.b2RevoluteJointDef = X;
  Box2D.Dynamics.Joints.b2WeldJoint = Y;
  Box2D.Dynamics.Joints.b2WeldJointDef = Z
})();
(function() {
  var a = Box2D.Common.b2Settings, e = Box2D.Common.Math.b2Math, f = Box2D.Common.Math.b2Sweep, d = Box2D.Common.Math.b2Transform, b = Box2D.Common.Math.b2Vec2, g = Box2D.Collision.b2AABB, j = Box2D.Collision.b2ContactID, h = Box2D.Collision.b2Distance, l = Box2D.Collision.b2DistanceInput, k = Box2D.Collision.b2DistanceOutput, n = Box2D.Collision.b2DistanceProxy, q = Box2D.Collision.b2DynamicTree, v = Box2D.Collision.b2DynamicTreeBroadPhase, r = Box2D.Collision.b2DynamicTreeNode, y = Box2D.Collision.b2DynamicTreePair, 
  B = Box2D.Collision.b2Manifold, s = Box2D.Collision.b2ManifoldPoint, z = Box2D.Collision.b2Point, G = Box2D.Collision.b2RayCastInput, I = Box2D.Collision.b2RayCastOutput, H = Box2D.Collision.b2Segment, J = Box2D.Collision.b2SeparationFunction, o = Box2D.Collision.b2Simplex, x = Box2D.Collision.b2SimplexCache, t = Box2D.Collision.b2SimplexVertex, F = Box2D.Collision.b2TimeOfImpact, L = Box2D.Collision.b2TOIInput, N = Box2D.Collision.b2WorldManifold, m = Box2D.Collision.ClipVertex, u = Box2D.Collision.Features, 
  p = Box2D.Collision.IBroadPhase;
  q.b2DynamicTree = function() {
  };
  q.prototype.b2DynamicTree = function() {
    this.m_freeList = this.m_root = null;
    this.m_insertionCount = this.m_path = 0
  };
  q.prototype.CreateProxy = function(m, d) {
    var b = this.AllocateNode(), o = a.b2_aabbExtension, e = a.b2_aabbExtension;
    b.aabb.lowerBound.x = m.lowerBound.x - o;
    b.aabb.lowerBound.y = m.lowerBound.y - e;
    b.aabb.upperBound.x = m.upperBound.x + o;
    b.aabb.upperBound.y = m.upperBound.y + e;
    b.userData = d;
    this.InsertLeaf(b);
    return b
  };
  q.prototype.DestroyProxy = function(a) {
    this.RemoveLeaf(a);
    this.FreeNode(a)
  };
  q.prototype.MoveProxy = function(m, d, b) {
    a.b2Assert(m.IsLeaf());
    if(m.aabb.Contains(d)) {
      return!1
    }
    this.RemoveLeaf(m);
    var o = a.b2_aabbExtension + a.b2_aabbMultiplier * (b.x > 0 ? b.x : -b.x), b = a.b2_aabbExtension + a.b2_aabbMultiplier * (b.y > 0 ? b.y : -b.y);
    m.aabb.lowerBound.x = d.lowerBound.x - o;
    m.aabb.lowerBound.y = d.lowerBound.y - b;
    m.aabb.upperBound.x = d.upperBound.x + o;
    m.aabb.upperBound.y = d.upperBound.y + b;
    this.InsertLeaf(m);
    return!0
  };
  q.prototype.Rebalance = function(a) {
    a === void 0 && (a = 0);
    if(this.m_root != null) {
      for(var m = 0;m < a;m++) {
        for(var b = this.m_root, d = 0;b.IsLeaf() == !1;) {
          b = this.m_path >> d & 1 ? b.child2 : b.child1, d = d + 1 & 31
        }
        ++this.m_path;
        this.RemoveLeaf(b);
        this.InsertLeaf(b)
      }
    }
  };
  q.prototype.GetFatAABB = function(a) {
    return a.aabb
  };
  q.prototype.GetUserData = function(a) {
    return a.userData
  };
  q.prototype.Query = function(a, m) {
    if(this.m_root != null) {
      var b = [], d = 0;
      for(b[d++] = this.m_root;d > 0;) {
        var o = b[--d];
        if(o.aabb.TestOverlap(m)) {
          if(o.IsLeaf()) {
            if(!a(o)) {
              break
            }
          }else {
            b[d++] = o.child1, b[d++] = o.child2
          }
        }
      }
    }
  };
  q.prototype.RayCast = function(a, m) {
    if(this.m_root != null) {
      var b = m.p1, d = m.p2, o = e.SubtractVV(b, d);
      o.Normalize();
      var o = e.CrossFV(1, o), u = e.AbsV(o), h = m.maxFraction, p = new g, f = 0, x = 0, f = b.x + h * (d.x - b.x), x = b.y + h * (d.y - b.y);
      p.lowerBound.x = Math.min(b.x, f);
      p.lowerBound.y = Math.min(b.y, x);
      p.upperBound.x = Math.max(b.x, f);
      p.upperBound.y = Math.max(b.y, x);
      var t = [], s = 0;
      for(t[s++] = this.m_root;s > 0;) {
        if(h = t[--s], h.aabb.TestOverlap(p) != !1 && (f = h.aabb.GetCenter(), x = h.aabb.GetExtents(), !(Math.abs(o.x * (b.x - f.x) + o.y * (b.y - f.y)) - u.x * x.x - u.y * x.y > 0))) {
          if(h.IsLeaf()) {
            f = new G;
            f.p1 = m.p1;
            f.p2 = m.p2;
            f.maxFraction = m.maxFraction;
            h = a(f, h);
            if(h == 0) {
              break
            }
            if(h > 0) {
              f = b.x + h * (d.x - b.x), x = b.y + h * (d.y - b.y), p.lowerBound.x = Math.min(b.x, f), p.lowerBound.y = Math.min(b.y, x), p.upperBound.x = Math.max(b.x, f), p.upperBound.y = Math.max(b.y, x)
            }
          }else {
            t[s++] = h.child1, t[s++] = h.child2
          }
        }
      }
    }
  };
  q.prototype.AllocateNode = function() {
    if(this.m_freeList) {
      var a = this.m_freeList;
      this.m_freeList = a.parent;
      a.parent = null;
      a.child1 = null;
      a.child2 = null;
      return a
    }
    return new r
  };
  q.prototype.FreeNode = function(a) {
    a.parent = this.m_freeList;
    this.m_freeList = a
  };
  q.prototype.InsertLeaf = function(a) {
    ++this.m_insertionCount;
    if(this.m_root == null) {
      this.m_root = a, this.m_root.parent = null
    }else {
      var m = a.aabb.GetCenter(), b = this.m_root;
      if(b.IsLeaf() == !1) {
        do {
          var d = b.child1, b = b.child2, o = Math.abs((d.aabb.lowerBound.x + d.aabb.upperBound.x) / 2 - m.x) + Math.abs((d.aabb.lowerBound.y + d.aabb.upperBound.y) / 2 - m.y), e = Math.abs((b.aabb.lowerBound.x + b.aabb.upperBound.x) / 2 - m.x) + Math.abs((b.aabb.lowerBound.y + b.aabb.upperBound.y) / 2 - m.y), b = o < e ? d : b
        }while(b.IsLeaf() == !1)
      }
      m = b.parent;
      d = this.AllocateNode();
      d.parent = m;
      d.userData = null;
      d.aabb.Combine(a.aabb, b.aabb);
      if(m) {
        b.parent.child1 == b ? m.child1 = d : m.child2 = d;
        d.child1 = b;
        d.child2 = a;
        b.parent = d;
        a.parent = d;
        do {
          if(m.aabb.Contains(d.aabb)) {
            break
          }
          m.aabb.Combine(m.child1.aabb, m.child2.aabb);
          d = m;
          m = m.parent
        }while(m)
      }else {
        d.child1 = b, d.child2 = a, b.parent = d, this.m_root = a.parent = d
      }
    }
  };
  q.prototype.RemoveLeaf = function(a) {
    if(a == this.m_root) {
      this.m_root = null
    }else {
      var m = a.parent, b = m.parent, a = m.child1 == a ? m.child2 : m.child1;
      if(b) {
        b.child1 == m ? b.child1 = a : b.child2 = a;
        a.parent = b;
        for(this.FreeNode(m);b;) {
          m = b.aabb;
          b.aabb = g.Combine(b.child1.aabb, b.child2.aabb);
          if(m.Contains(b.aabb)) {
            break
          }
          b = b.parent
        }
      }else {
        this.m_root = a, a.parent = null, this.FreeNode(m)
      }
    }
  };
  v.b2DynamicTreeBroadPhase = function() {
    this.m_tree = new q;
    this.m_moveBuffer = [];
    this.m_pairBuffer = [];
    this.m_pairCount = 0
  };
  v.prototype.CreateProxy = function(a, m) {
    var b = this.m_tree.CreateProxy(a, m);
    ++this.m_proxyCount;
    this.BufferMove(b);
    return b
  };
  v.prototype.DestroyProxy = function(a) {
    this.UnBufferMove(a);
    --this.m_proxyCount;
    this.m_tree.DestroyProxy(a)
  };
  v.prototype.MoveProxy = function(a, m, b) {
    this.m_tree.MoveProxy(a, m, b) && this.BufferMove(a)
  };
  v.prototype.TestOverlap = function(a, m) {
    var b = this.m_tree.GetFatAABB(a), d = this.m_tree.GetFatAABB(m);
    return b.TestOverlap(d)
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
    for(var m = this, b = m.m_pairCount = 0, d, b = 0;b < m.m_moveBuffer.length;++b) {
      d = m.m_moveBuffer[b];
      var o = m.m_tree.GetFatAABB(d);
      m.m_tree.Query(function(a) {
        if(a == d) {
          return!0
        }
        m.m_pairCount == m.m_pairBuffer.length && (m.m_pairBuffer[m.m_pairCount] = new y);
        var b = m.m_pairBuffer[m.m_pairCount];
        b.proxyA = a < d ? a : d;
        b.proxyB = a >= d ? a : d;
        ++m.m_pairCount;
        return!0
      }, o)
    }
    for(b = m.m_moveBuffer.length = 0;b < m.m_pairCount;) {
      var o = m.m_pairBuffer[b], e = m.m_tree.GetUserData(o.proxyA), h = m.m_tree.GetUserData(o.proxyB);
      a(e, h);
      for(++b;b < m.m_pairCount;) {
        e = m.m_pairBuffer[b];
        if(e.proxyA != o.proxyA || e.proxyB != o.proxyB) {
          break
        }
        ++b
      }
    }
  };
  v.prototype.Query = function(a, m) {
    this.m_tree.Query(a, m)
  };
  v.prototype.RayCast = function(a, m) {
    this.m_tree.RayCast(a, m)
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
    this.m_moveBuffer.splice(this.m_moveBuffer.indexOf(a), 1)
  };
  v.prototype.ComparePairs = function() {
    return 0
  };
  v.__implements = {};
  v.__implements[p] = !0;
  r.b2DynamicTreeNode = function() {
    this.aabb = new g
  };
  r.prototype.IsLeaf = function() {
    return this.child1 == null
  };
  y.b2DynamicTreePair = function() {
  };
  B.b2Manifold = function() {
    this.m_pointCount = 0
  };
  B.prototype.b2Manifold = function() {
    this.m_points = [];
    for(var m = 0;m < a.b2_maxManifoldPoints;m++) {
      this.m_points[m] = new s
    }
    this.m_localPlaneNormal = new b;
    this.m_localPoint = new b
  };
  B.prototype.Reset = function() {
    for(var m = 0;m < a.b2_maxManifoldPoints;m++) {
      (this.m_points[m] instanceof s ? this.m_points[m] : null).Reset()
    }
    this.m_localPlaneNormal.SetZero();
    this.m_localPoint.SetZero();
    this.m_pointCount = this.m_type = 0
  };
  B.prototype.Set = function(m) {
    this.m_pointCount = m.m_pointCount;
    for(var b = 0;b < a.b2_maxManifoldPoints;b++) {
      (this.m_points[b] instanceof s ? this.m_points[b] : null).Set(m.m_points[b])
    }
    this.m_localPlaneNormal.SetV(m.m_localPlaneNormal);
    this.m_localPoint.SetV(m.m_localPoint);
    this.m_type = m.m_type
  };
  B.prototype.Copy = function() {
    var a = new B;
    a.Set(this);
    return a
  };
  Box2D.postDefs.push(function() {
    Box2D.Collision.b2Manifold.e_circles = 1;
    Box2D.Collision.b2Manifold.e_faceA = 2;
    Box2D.Collision.b2Manifold.e_faceB = 4
  });
  s.b2ManifoldPoint = function() {
    this.m_localPoint = new b;
    this.m_id = new j
  };
  s.prototype.b2ManifoldPoint = function() {
    this.Reset()
  };
  s.prototype.Reset = function() {
    this.m_localPoint.SetZero();
    this.m_tangentImpulse = this.m_normalImpulse = 0;
    this.m_id.key = 0
  };
  s.prototype.Set = function(a) {
    this.m_localPoint.SetV(a.m_localPoint);
    this.m_normalImpulse = a.m_normalImpulse;
    this.m_tangentImpulse = a.m_tangentImpulse;
    this.m_id.Set(a.m_id)
  };
  z.b2Point = function() {
    this.p = new b
  };
  z.prototype.Support = function() {
    return this.p
  };
  z.prototype.GetFirstVertex = function() {
    return this.p
  };
  G.b2RayCastInput = function() {
    this.p1 = new b;
    this.p2 = new b
  };
  G.prototype.b2RayCastInput = function(a, m, b) {
    a === void 0 && (a = null);
    m === void 0 && (m = null);
    b === void 0 && (b = 1);
    a && this.p1.SetV(a);
    m && this.p2.SetV(m);
    this.maxFraction = b
  };
  I.b2RayCastOutput = function() {
    this.normal = new b
  };
  H.b2Segment = function() {
    this.p1 = new b;
    this.p2 = new b
  };
  H.prototype.TestSegment = function(a, m, b, d) {
    d === void 0 && (d = 0);
    var o = b.p1, e = b.p2.x - o.x, h = b.p2.y - o.y, b = this.p2.y - this.p1.y, u = -(this.p2.x - this.p1.x), p = 100 * Number.MIN_VALUE, g = -(e * b + h * u);
    if(g > p) {
      var f = o.x - this.p1.x, x = o.y - this.p1.y, o = f * b + x * u;
      if(0 <= o && o <= d * g && (d = -e * x + h * f, -p * g <= d && d <= g * (1 + p))) {
        return o /= g, d = Math.sqrt(b * b + u * u), b /= d, u /= d, a[0] = o, m.Set(b, u), !0
      }
    }
    return!1
  };
  H.prototype.Extend = function(a) {
    this.ExtendForward(a);
    this.ExtendBackward(a)
  };
  H.prototype.ExtendForward = function(a) {
    var m = this.p2.x - this.p1.x, b = this.p2.y - this.p1.y, a = Math.min(m > 0 ? (a.upperBound.x - this.p1.x) / m : m < 0 ? (a.lowerBound.x - this.p1.x) / m : Number.POSITIVE_INFINITY, b > 0 ? (a.upperBound.y - this.p1.y) / b : b < 0 ? (a.lowerBound.y - this.p1.y) / b : Number.POSITIVE_INFINITY);
    this.p2.x = this.p1.x + m * a;
    this.p2.y = this.p1.y + b * a
  };
  H.prototype.ExtendBackward = function(a) {
    var m = -this.p2.x + this.p1.x, b = -this.p2.y + this.p1.y, a = Math.min(m > 0 ? (a.upperBound.x - this.p2.x) / m : m < 0 ? (a.lowerBound.x - this.p2.x) / m : Number.POSITIVE_INFINITY, b > 0 ? (a.upperBound.y - this.p2.y) / b : b < 0 ? (a.lowerBound.y - this.p2.y) / b : Number.POSITIVE_INFINITY);
    this.p1.x = this.p2.x + m * a;
    this.p1.y = this.p2.y + b * a
  };
  J.b2SeparationFunction = function() {
    this.m_localPoint = new b;
    this.m_axis = new b
  };
  J.prototype.Initialize = function(m, d, o, h, u) {
    this.m_proxyA = d;
    this.m_proxyB = h;
    var p = m.count;
    a.b2Assert(0 < p && p < 3);
    var g, f, x, t, s = t = x = h = d = 0, l = 0, s = 0;
    p == 1 ? (this.m_type = J.e_points, g = this.m_proxyA.GetVertex(m.indexA[0]), f = this.m_proxyB.GetVertex(m.indexB[0]), p = g, m = o.R, d = o.position.x + (m.col1.x * p.x + m.col2.x * p.y), h = o.position.y + (m.col1.y * p.x + m.col2.y * p.y), p = f, m = u.R, x = u.position.x + (m.col1.x * p.x + m.col2.x * p.y), t = u.position.y + (m.col1.y * p.x + m.col2.y * p.y), this.m_axis.x = x - d, this.m_axis.y = t - h, this.m_axis.Normalize()) : (m.indexB[0] == m.indexB[1] ? (this.m_type = J.e_faceA, 
    d = this.m_proxyA.GetVertex(m.indexA[0]), h = this.m_proxyA.GetVertex(m.indexA[1]), f = this.m_proxyB.GetVertex(m.indexB[0]), this.m_localPoint.x = 0.5 * (d.x + h.x), this.m_localPoint.y = 0.5 * (d.y + h.y), this.m_axis = e.CrossVF(e.SubtractVV(h, d), 1), this.m_axis.Normalize(), p = this.m_axis, m = o.R, s = m.col1.x * p.x + m.col2.x * p.y, l = m.col1.y * p.x + m.col2.y * p.y, p = this.m_localPoint, m = o.R, d = o.position.x + (m.col1.x * p.x + m.col2.x * p.y), h = o.position.y + (m.col1.y * 
    p.x + m.col2.y * p.y), p = f, m = u.R, x = u.position.x + (m.col1.x * p.x + m.col2.x * p.y), t = u.position.y + (m.col1.y * p.x + m.col2.y * p.y), s = (x - d) * s + (t - h) * l) : m.indexA[0] == m.indexA[0] ? (this.m_type = J.e_faceB, x = this.m_proxyB.GetVertex(m.indexB[0]), t = this.m_proxyB.GetVertex(m.indexB[1]), g = this.m_proxyA.GetVertex(m.indexA[0]), this.m_localPoint.x = 0.5 * (x.x + t.x), this.m_localPoint.y = 0.5 * (x.y + t.y), this.m_axis = e.CrossVF(e.SubtractVV(t, x), 1), this.m_axis.Normalize(), 
    p = this.m_axis, m = u.R, s = m.col1.x * p.x + m.col2.x * p.y, l = m.col1.y * p.x + m.col2.y * p.y, p = this.m_localPoint, m = u.R, x = u.position.x + (m.col1.x * p.x + m.col2.x * p.y), t = u.position.y + (m.col1.y * p.x + m.col2.y * p.y), p = g, m = o.R, d = o.position.x + (m.col1.x * p.x + m.col2.x * p.y), h = o.position.y + (m.col1.y * p.x + m.col2.y * p.y), s = (d - x) * s + (h - t) * l) : (d = this.m_proxyA.GetVertex(m.indexA[0]), h = this.m_proxyA.GetVertex(m.indexA[1]), x = this.m_proxyB.GetVertex(m.indexB[0]), 
    t = this.m_proxyB.GetVertex(m.indexB[1]), e.MulX(o, g), g = e.MulMV(o.R, e.SubtractVV(h, d)), e.MulX(u, f), s = e.MulMV(u.R, e.SubtractVV(t, x)), u = g.x * g.x + g.y * g.y, f = s.x * s.x + s.y * s.y, m = e.SubtractVV(s, g), o = g.x * m.x + g.y * m.y, m = s.x * m.x + s.y * m.y, g = g.x * s.x + g.y * s.y, l = u * f - g * g, s = 0, l != 0 && (s = e.Clamp((g * m - o * f) / l, 0, 1)), (g * s + m) / f < 0 && (s = e.Clamp((g - o) / u, 0, 1)), g = new b, g.x = d.x + s * (h.x - d.x), g.y = d.y + s * (h.y - 
    d.y), f = new b, f.x = x.x + s * (t.x - x.x), f.y = x.y + s * (t.y - x.y), s == 0 || s == 1 ? (this.m_type = J.e_faceB, this.m_axis = e.CrossVF(e.SubtractVV(t, x), 1), this.m_axis.Normalize(), this.m_localPoint = f) : (this.m_type = J.e_faceA, this.m_axis = e.CrossVF(e.SubtractVV(h, d), 1), this.m_localPoint = g)), s < 0 && this.m_axis.NegativeSelf())
  };
  J.prototype.Evaluate = function(m, b) {
    var d, o, p = 0;
    switch(this.m_type) {
      case J.e_points:
        return d = e.MulTMV(m.R, this.m_axis), o = e.MulTMV(b.R, this.m_axis.GetNegative()), d = this.m_proxyA.GetSupportVertex(d), o = this.m_proxyB.GetSupportVertex(o), d = e.MulX(m, d), o = e.MulX(b, o), p = (o.x - d.x) * this.m_axis.x + (o.y - d.y) * this.m_axis.y;
      case J.e_faceA:
        return p = e.MulMV(m.R, this.m_axis), d = e.MulX(m, this.m_localPoint), o = e.MulTMV(b.R, p.GetNegative()), o = this.m_proxyB.GetSupportVertex(o), o = e.MulX(b, o), p = (o.x - d.x) * p.x + (o.y - d.y) * p.y;
      case J.e_faceB:
        return p = e.MulMV(b.R, this.m_axis), o = e.MulX(b, this.m_localPoint), d = e.MulTMV(m.R, p.GetNegative()), d = this.m_proxyA.GetSupportVertex(d), d = e.MulX(m, d), p = (d.x - o.x) * p.x + (d.y - o.y) * p.y;
      default:
        return a.b2Assert(!1), 0
    }
  };
  Box2D.postDefs.push(function() {
    Box2D.Collision.b2SeparationFunction.e_points = 1;
    Box2D.Collision.b2SeparationFunction.e_faceA = 2;
    Box2D.Collision.b2SeparationFunction.e_faceB = 4
  });
  o.b2Simplex = function() {
    this.m_v1 = new t;
    this.m_v2 = new t;
    this.m_v3 = new t;
    this.m_vertices = Array(3)
  };
  o.prototype.b2Simplex = function() {
    this.m_vertices[0] = this.m_v1;
    this.m_vertices[1] = this.m_v2;
    this.m_vertices[2] = this.m_v3
  };
  o.prototype.ReadCache = function(m, b, d, o, p) {
    a.b2Assert(0 <= m.count && m.count <= 3);
    var h, u;
    this.m_count = m.count;
    for(var g = this.m_vertices, f = 0;f < this.m_count;f++) {
      var x = g[f];
      x.indexA = m.indexA[f];
      x.indexB = m.indexB[f];
      h = b.GetVertex(x.indexA);
      u = o.GetVertex(x.indexB);
      x.wA = e.MulX(d, h);
      x.wB = e.MulX(p, u);
      x.w = e.SubtractVV(x.wB, x.wA);
      x.a = 0
    }
    if(this.m_count > 1 && (m = m.metric, h = this.GetMetric(), h < 0.5 * m || 2 * m < h || h < Number.MIN_VALUE)) {
      this.m_count = 0
    }
    if(this.m_count == 0) {
      x = g[0], x.indexA = 0, x.indexB = 0, h = b.GetVertex(0), u = o.GetVertex(0), x.wA = e.MulX(d, h), x.wB = e.MulX(p, u), x.w = e.SubtractVV(x.wB, x.wA), this.m_count = 1
    }
  };
  o.prototype.WriteCache = function(a) {
    a.metric = this.GetMetric();
    a.count = Box2D.parseUInt(this.m_count);
    for(var m = this.m_vertices, b = 0;b < this.m_count;b++) {
      a.indexA[b] = Box2D.parseUInt(m[b].indexA), a.indexB[b] = Box2D.parseUInt(m[b].indexB)
    }
  };
  o.prototype.GetSearchDirection = function() {
    switch(this.m_count) {
      case 1:
        return this.m_v1.w.GetNegative();
      case 2:
        var m = e.SubtractVV(this.m_v2.w, this.m_v1.w);
        return e.CrossVV(m, this.m_v1.w.GetNegative()) > 0 ? e.CrossFV(1, m) : e.CrossVF(m, 1);
      default:
        return a.b2Assert(!1), new b
    }
  };
  o.prototype.GetClosestPoint = function() {
    switch(this.m_count) {
      case 0:
        return a.b2Assert(!1), new b;
      case 1:
        return this.m_v1.w;
      case 2:
        return new b(this.m_v1.a * this.m_v1.w.x + this.m_v2.a * this.m_v2.w.x, this.m_v1.a * this.m_v1.w.y + this.m_v2.a * this.m_v2.w.y);
      default:
        return a.b2Assert(!1), new b
    }
  };
  o.prototype.GetWitnessPoints = function(m, b) {
    switch(this.m_count) {
      case 0:
        a.b2Assert(!1);
        break;
      case 1:
        m.SetV(this.m_v1.wA);
        b.SetV(this.m_v1.wB);
        break;
      case 2:
        m.x = this.m_v1.a * this.m_v1.wA.x + this.m_v2.a * this.m_v2.wA.x;
        m.y = this.m_v1.a * this.m_v1.wA.y + this.m_v2.a * this.m_v2.wA.y;
        b.x = this.m_v1.a * this.m_v1.wB.x + this.m_v2.a * this.m_v2.wB.x;
        b.y = this.m_v1.a * this.m_v1.wB.y + this.m_v2.a * this.m_v2.wB.y;
        break;
      case 3:
        b.x = m.x = this.m_v1.a * this.m_v1.wA.x + this.m_v2.a * this.m_v2.wA.x + this.m_v3.a * this.m_v3.wA.x;
        b.y = m.y = this.m_v1.a * this.m_v1.wA.y + this.m_v2.a * this.m_v2.wA.y + this.m_v3.a * this.m_v3.wA.y;
        break;
      default:
        a.b2Assert(!1)
    }
  };
  o.prototype.GetMetric = function() {
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
  o.prototype.Solve2 = function() {
    var a = this.m_v1.w, m = this.m_v2.w, b = e.SubtractVV(m, a), a = -(a.x * b.x + a.y * b.y);
    a <= 0 ? this.m_count = this.m_v1.a = 1 : (m = m.x * b.x + m.y * b.y, m <= 0 ? (this.m_count = this.m_v2.a = 1, this.m_v1.Set(this.m_v2)) : (b = 1 / (m + a), this.m_v1.a = m * b, this.m_v2.a = a * b, this.m_count = 2))
  };
  o.prototype.Solve3 = function() {
    var a = this.m_v1.w, m = this.m_v2.w, b = this.m_v3.w, d = e.SubtractVV(m, a), o = e.Dot(a, d), p = e.Dot(m, d), o = -o, h = e.SubtractVV(b, a), u = e.Dot(a, h), g = e.Dot(b, h), u = -u, f = e.SubtractVV(b, m), x = e.Dot(m, f), f = e.Dot(b, f), x = -x, h = e.CrossVV(d, h), d = h * e.CrossVV(m, b), b = h * e.CrossVV(b, a), a = h * e.CrossVV(a, m);
    o <= 0 && u <= 0 ? this.m_count = this.m_v1.a = 1 : p > 0 && o > 0 && a <= 0 ? (g = 1 / (p + o), this.m_v1.a = p * g, this.m_v2.a = o * g, this.m_count = 2) : g > 0 && u > 0 && b <= 0 ? (p = 1 / (g + u), this.m_v1.a = g * p, this.m_v3.a = u * p, this.m_count = 2, this.m_v2.Set(this.m_v3)) : p <= 0 && x <= 0 ? (this.m_count = this.m_v2.a = 1, this.m_v1.Set(this.m_v2)) : g <= 0 && f <= 0 ? (this.m_count = this.m_v3.a = 1, this.m_v1.Set(this.m_v3)) : f > 0 && x > 0 && d <= 0 ? (p = 1 / (f + x), 
    this.m_v2.a = f * p, this.m_v3.a = x * p, this.m_count = 2, this.m_v1.Set(this.m_v3)) : (p = 1 / (d + b + a), this.m_v1.a = d * p, this.m_v2.a = b * p, this.m_v3.a = a * p, this.m_count = 3)
  };
  x.b2SimplexCache = function() {
    this.indexA = [0, 0, 0];
    this.indexB = [0, 0, 0]
  };
  t.b2SimplexVertex = function() {
  };
  t.prototype.Set = function(a) {
    this.wA.SetV(a.wA);
    this.wB.SetV(a.wB);
    this.w.SetV(a.w);
    this.a = a.a;
    this.indexA = a.indexA;
    this.indexB = a.indexB
  };
  F.b2TimeOfImpact = function() {
  };
  F.TimeOfImpact = function(m) {
    ++F.b2_toiCalls;
    var b = m.proxyA, d = m.proxyB, o = m.sweepA, p = m.sweepB;
    a.b2Assert(o.t0 == p.t0);
    a.b2Assert(1 - o.t0 > Number.MIN_VALUE);
    var u = b.m_radius + d.m_radius, m = m.tolerance, g = 0, f = 0, x = 0;
    F.s_cache.count = 0;
    for(F.s_distanceInput.useRadii = !1;;) {
      o.GetTransform(F.s_xfA, g);
      p.GetTransform(F.s_xfB, g);
      F.s_distanceInput.proxyA = b;
      F.s_distanceInput.proxyB = d;
      F.s_distanceInput.transformA = F.s_xfA;
      F.s_distanceInput.transformB = F.s_xfB;
      h.Distance(F.s_distanceOutput, F.s_cache, F.s_distanceInput);
      if(F.s_distanceOutput.distance <= 0) {
        g = 1;
        break
      }
      F.s_fcn.Initialize(F.s_cache, b, F.s_xfA, d, F.s_xfB);
      var t = F.s_fcn.Evaluate(F.s_xfA, F.s_xfB);
      if(t <= 0) {
        g = 1;
        break
      }
      f == 0 && (x = t > u ? e.Max(u - m, 0.75 * u) : e.Max(t - m, 0.02 * u));
      if(t - x < 0.5 * m) {
        if(f == 0) {
          g = 1;
          break
        }
        break
      }
      var s = g, l = g, j = 1;
      o.GetTransform(F.s_xfA, j);
      p.GetTransform(F.s_xfB, j);
      var k = F.s_fcn.Evaluate(F.s_xfA, F.s_xfB);
      if(k >= x) {
        g = 1;
        break
      }
      for(var z = 0;;) {
        var G = 0, G = z & 1 ? l + (x - t) * (j - l) / (k - t) : 0.5 * (l + j);
        o.GetTransform(F.s_xfA, G);
        p.GetTransform(F.s_xfB, G);
        var J = F.s_fcn.Evaluate(F.s_xfA, F.s_xfB);
        if(e.Abs(J - x) < 0.025 * m) {
          s = G;
          break
        }
        J > x ? (l = G, t = J) : (j = G, k = J);
        ++z;
        ++F.b2_toiRootIters;
        if(z == 50) {
          break
        }
      }
      F.b2_toiMaxRootIters = e.Max(F.b2_toiMaxRootIters, z);
      if(s < (1 + 100 * Number.MIN_VALUE) * g) {
        break
      }
      g = s;
      f++;
      ++F.b2_toiIters;
      if(f == 1E3) {
        break
      }
    }
    F.b2_toiMaxIters = e.Max(F.b2_toiMaxIters, f);
    return g
  };
  Box2D.postDefs.push(function() {
    Box2D.Collision.b2TimeOfImpact.b2_toiCalls = 0;
    Box2D.Collision.b2TimeOfImpact.b2_toiIters = 0;
    Box2D.Collision.b2TimeOfImpact.b2_toiMaxIters = 0;
    Box2D.Collision.b2TimeOfImpact.b2_toiRootIters = 0;
    Box2D.Collision.b2TimeOfImpact.b2_toiMaxRootIters = 0;
    Box2D.Collision.b2TimeOfImpact.s_cache = new x;
    Box2D.Collision.b2TimeOfImpact.s_distanceInput = new l;
    Box2D.Collision.b2TimeOfImpact.s_xfA = new d;
    Box2D.Collision.b2TimeOfImpact.s_xfB = new d;
    Box2D.Collision.b2TimeOfImpact.s_fcn = new J;
    Box2D.Collision.b2TimeOfImpact.s_distanceOutput = new k
  });
  L.b2TOIInput = function() {
    this.proxyA = new n;
    this.proxyB = new n;
    this.sweepA = new f;
    this.sweepB = new f
  };
  N.b2WorldManifold = function() {
    this.m_normal = new b
  };
  N.prototype.b2WorldManifold = function() {
    this.m_points = Array(a.b2_maxManifoldPoints);
    for(var m = 0;m < a.b2_maxManifoldPoints;m++) {
      this.m_points[m] = new b
    }
  };
  N.prototype.Initialize = function(a, m, b, d, o) {
    b === void 0 && (b = 0);
    o === void 0 && (o = 0);
    if(a.m_pointCount != 0) {
      var e = 0, p, h, u = 0, g = 0, f = 0, x = 0, t = 0;
      p = 0;
      switch(a.m_type) {
        case B.e_circles:
          h = m.R;
          p = a.m_localPoint;
          e = m.position.x + h.col1.x * p.x + h.col2.x * p.y;
          m = m.position.y + h.col1.y * p.x + h.col2.y * p.y;
          h = d.R;
          p = a.m_points[0].m_localPoint;
          a = d.position.x + h.col1.x * p.x + h.col2.x * p.y;
          d = d.position.y + h.col1.y * p.x + h.col2.y * p.y;
          p = a - e;
          h = d - m;
          u = p * p + h * h;
          u > Box2D.MIN_VALUE_SQUARED ? (u = Math.sqrt(u), this.m_normal.x = p / u, this.m_normal.y = h / u) : (this.m_normal.x = 1, this.m_normal.y = 0);
          p = m + b * this.m_normal.y;
          d -= o * this.m_normal.y;
          this.m_points[0].x = 0.5 * (e + b * this.m_normal.x + (a - o * this.m_normal.x));
          this.m_points[0].y = 0.5 * (p + d);
          break;
        case B.e_faceA:
          h = m.R;
          p = a.m_localPlaneNormal;
          u = h.col1.x * p.x + h.col2.x * p.y;
          g = h.col1.y * p.x + h.col2.y * p.y;
          h = m.R;
          p = a.m_localPoint;
          f = m.position.x + h.col1.x * p.x + h.col2.x * p.y;
          x = m.position.y + h.col1.y * p.x + h.col2.y * p.y;
          this.m_normal.x = u;
          this.m_normal.y = g;
          for(e = 0;e < a.m_pointCount;e++) {
            h = d.R, p = a.m_points[e].m_localPoint, t = d.position.x + h.col1.x * p.x + h.col2.x * p.y, p = d.position.y + h.col1.y * p.x + h.col2.y * p.y, this.m_points[e].x = t + 0.5 * (b - (t - f) * u - (p - x) * g - o) * u, this.m_points[e].y = p + 0.5 * (b - (t - f) * u - (p - x) * g - o) * g
          }
          break;
        case B.e_faceB:
          h = d.R;
          p = a.m_localPlaneNormal;
          u = h.col1.x * p.x + h.col2.x * p.y;
          g = h.col1.y * p.x + h.col2.y * p.y;
          h = d.R;
          p = a.m_localPoint;
          f = d.position.x + h.col1.x * p.x + h.col2.x * p.y;
          x = d.position.y + h.col1.y * p.x + h.col2.y * p.y;
          this.m_normal.x = -u;
          this.m_normal.y = -g;
          for(e = 0;e < a.m_pointCount;e++) {
            h = m.R, p = a.m_points[e].m_localPoint, t = m.position.x + h.col1.x * p.x + h.col2.x * p.y, p = m.position.y + h.col1.y * p.x + h.col2.y * p.y, this.m_points[e].x = t + 0.5 * (o - (t - f) * u - (p - x) * g - b) * u, this.m_points[e].y = p + 0.5 * (o - (t - f) * u - (p - x) * g - b) * g
          }
      }
    }
  };
  m.ClipVertex = function() {
    this.v = new b;
    this.id = new j
  };
  m.prototype.Set = function(a) {
    this.v.SetV(a.v);
    this.id.Set(a.id)
  };
  u.Features = function() {
  };
  Object.defineProperty(u.prototype, "referenceEdge", {enumerable:!1, configurable:!0, get:function() {
    return this._referenceEdge
  }});
  Object.defineProperty(u.prototype, "referenceEdge", {enumerable:!1, configurable:!0, set:function(a) {
    a === void 0 && (a = 0);
    this._referenceEdge = a;
    this._m_id._key = this._m_id._key & 4294967040 | this._referenceEdge & 255
  }});
  Object.defineProperty(u.prototype, "incidentEdge", {enumerable:!1, configurable:!0, get:function() {
    return this._incidentEdge
  }});
  Object.defineProperty(u.prototype, "incidentEdge", {enumerable:!1, configurable:!0, set:function(a) {
    a === void 0 && (a = 0);
    this._incidentEdge = a;
    this._m_id._key = this._m_id._key & 4294902015 | this._incidentEdge << 8 & 65280
  }});
  Object.defineProperty(u.prototype, "incidentVertex", {enumerable:!1, configurable:!0, get:function() {
    return this._incidentVertex
  }});
  Object.defineProperty(u.prototype, "incidentVertex", {enumerable:!1, configurable:!0, set:function(a) {
    a === void 0 && (a = 0);
    this._incidentVertex = a;
    this._m_id._key = this._m_id._key & 4278255615 | this._incidentVertex << 16 & 16711680
  }});
  Object.defineProperty(u.prototype, "flip", {enumerable:!1, configurable:!0, get:function() {
    return this._flip
  }});
  Object.defineProperty(u.prototype, "flip", {enumerable:!1, configurable:!0, set:function(a) {
    a === void 0 && (a = 0);
    this._flip = a;
    this._m_id._key = this._m_id._key & 16777215 | this._flip << 24 & 4278190080
  }})
})();
(function() {
  var a = Box2D.Common.b2Settings, e = Box2D.Collision.Shapes.b2CircleShape, f = Box2D.Collision.Shapes.b2EdgeChainDef, d = Box2D.Collision.Shapes.b2EdgeShape, b = Box2D.Collision.Shapes.b2MassData, g = Box2D.Collision.Shapes.b2PolygonShape, j = Box2D.Collision.Shapes.b2Shape, h = Box2D.Common.Math.b2Mat22, l = Box2D.Common.Math.b2Math, k = Box2D.Common.Math.b2Transform, n = Box2D.Common.Math.b2Vec2, q = Box2D.Collision.b2Distance, v = Box2D.Collision.b2DistanceInput, r = Box2D.Collision.b2DistanceOutput, 
  y = Box2D.Collision.b2DistanceProxy, B = Box2D.Collision.b2SimplexCache;
  Box2D.inherit(e, Box2D.Collision.Shapes.b2Shape);
  e.prototype.__super = Box2D.Collision.Shapes.b2Shape.prototype;
  e.b2CircleShape = function() {
    Box2D.Collision.Shapes.b2Shape.b2Shape.apply(this, arguments);
    this.m_p = new n
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
    var d = a.R, e = a.position.x + (d.col1.x * this.m_p.x + d.col2.x * this.m_p.y), d = a.position.y + (d.col1.y * this.m_p.x + d.col2.y * this.m_p.y), e = b.x - e, d = b.y - d;
    return e * e + d * d <= this.m_radius * this.m_radius
  };
  e.prototype.RayCast = function(a, b, d) {
    var e = d.R, h = b.p1.x - (d.position.x + (e.col1.x * this.m_p.x + e.col2.x * this.m_p.y)), d = b.p1.y - (d.position.y + (e.col1.y * this.m_p.x + e.col2.y * this.m_p.y)), e = b.p2.x - b.p1.x, g = b.p2.y - b.p1.y, o = h * e + d * g, f = e * e + g * g, t = o * o - f * (h * h + d * d - this.m_radius * this.m_radius);
    if(t < 0 || f < Number.MIN_VALUE) {
      return!1
    }
    o = -(o + Math.sqrt(t));
    return 0 <= o && o <= b.maxFraction * f ? (o /= f, a.fraction = o, a.normal.x = h + o * e, a.normal.y = d + o * g, a.normal.Normalize(), !0) : !1
  };
  e.prototype.ComputeAABB = function(a, b) {
    var d = b.R, e = b.position.x + (d.col1.x * this.m_p.x + d.col2.x * this.m_p.y), d = b.position.y + (d.col1.y * this.m_p.x + d.col2.y * this.m_p.y);
    a.lowerBound.Set(e - this.m_radius, d - this.m_radius);
    a.upperBound.Set(e + this.m_radius, d + this.m_radius)
  };
  e.prototype.ComputeMass = function(b, d) {
    d === void 0 && (d = 0);
    b.mass = d * a.b2_pi * this.m_radius * this.m_radius;
    b.center.SetV(this.m_p);
    b.I = b.mass * (0.5 * this.m_radius * this.m_radius + (this.m_p.x * this.m_p.x + this.m_p.y * this.m_p.y))
  };
  e.prototype.ComputeSubmergedArea = function(a, b, d, e) {
    b === void 0 && (b = 0);
    var d = l.MulX(d, this.m_p), h = -(l.Dot(a, d) - b);
    if(h < -this.m_radius + Number.MIN_VALUE) {
      return 0
    }
    if(h > this.m_radius) {
      return e.SetV(d), Math.PI * this.m_radius * this.m_radius
    }
    var b = this.m_radius * this.m_radius, g = h * h, h = b * (Math.asin(h / this.m_radius) + Math.PI / 2) + h * Math.sqrt(b - g), b = -2 / 3 * Math.pow(b - g, 1.5) / h;
    e.x = d.x + a.x * b;
    e.y = d.y + a.y * b;
    return h
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
    this.m_type = j.e_circleShape;
    this.m_radius = a
  };
  f.b2EdgeChainDef = function() {
  };
  f.prototype.b2EdgeChainDef = function() {
    this.vertexCount = 0;
    this.isALoop = !0;
    this.vertices = []
  };
  Box2D.inherit(d, Box2D.Collision.Shapes.b2Shape);
  d.prototype.__super = Box2D.Collision.Shapes.b2Shape.prototype;
  d.b2EdgeShape = function() {
    Box2D.Collision.Shapes.b2Shape.b2Shape.apply(this, arguments);
    this.s_supportVec = new n;
    this.m_v1 = new n;
    this.m_v2 = new n;
    this.m_coreV1 = new n;
    this.m_coreV2 = new n;
    this.m_normal = new n;
    this.m_direction = new n;
    this.m_cornerDir1 = new n;
    this.m_cornerDir2 = new n
  };
  d.prototype.TestPoint = function() {
    return!1
  };
  d.prototype.RayCast = function(a, b, d) {
    var e, h = b.p2.x - b.p1.x, g = b.p2.y - b.p1.y;
    e = d.R;
    var o = d.position.x + (e.col1.x * this.m_v1.x + e.col2.x * this.m_v1.y), f = d.position.y + (e.col1.y * this.m_v1.x + e.col2.y * this.m_v1.y), t = d.position.y + (e.col1.y * this.m_v2.x + e.col2.y * this.m_v2.y) - f, d = -(d.position.x + (e.col1.x * this.m_v2.x + e.col2.x * this.m_v2.y) - o);
    e = 100 * Number.MIN_VALUE;
    var l = -(h * t + g * d);
    if(l > e) {
      var o = b.p1.x - o, j = b.p1.y - f, f = o * t + j * d;
      if(0 <= f && f <= b.maxFraction * l && (b = -h * j + g * o, -e * l <= b && b <= l * (1 + e))) {
        return f /= l, a.fraction = f, b = Math.sqrt(t * t + d * d), a.normal.x = t / b, a.normal.y = d / b, !0
      }
    }
    return!1
  };
  d.prototype.ComputeAABB = function(a, b) {
    var d = b.R, e = b.position.x + (d.col1.x * this.m_v1.x + d.col2.x * this.m_v1.y), h = b.position.y + (d.col1.y * this.m_v1.x + d.col2.y * this.m_v1.y), g = b.position.x + (d.col1.x * this.m_v2.x + d.col2.x * this.m_v2.y), d = b.position.y + (d.col1.y * this.m_v2.x + d.col2.y * this.m_v2.y);
    e < g ? (a.lowerBound.x = e, a.upperBound.x = g) : (a.lowerBound.x = g, a.upperBound.x = e);
    h < d ? (a.lowerBound.y = h, a.upperBound.y = d) : (a.lowerBound.y = d, a.upperBound.y = h)
  };
  d.prototype.ComputeMass = function(a) {
    a.mass = 0;
    a.center.SetV(this.m_v1);
    a.I = 0
  };
  d.prototype.ComputeSubmergedArea = function(a, b, d, e) {
    b === void 0 && (b = 0);
    var h = new n(a.x * b, a.y * b), g = l.MulX(d, this.m_v1), d = l.MulX(d, this.m_v2), o = l.Dot(a, g) - b, a = l.Dot(a, d) - b;
    if(o > 0) {
      if(a > 0) {
        return 0
      }else {
        g.x = -a / (o - a) * g.x + o / (o - a) * d.x, g.y = -a / (o - a) * g.y + o / (o - a) * d.y
      }
    }else {
      if(a > 0) {
        d.x = -a / (o - a) * g.x + o / (o - a) * d.x, d.y = -a / (o - a) * g.y + o / (o - a) * d.y
      }
    }
    e.x = (h.x + g.x + d.x) / 3;
    e.y = (h.y + g.y + d.y) / 3;
    return 0.5 * ((g.x - h.x) * (d.y - h.y) - (g.y - h.y) * (d.x - h.x))
  };
  d.prototype.GetLength = function() {
    return this.m_length
  };
  d.prototype.GetVertex1 = function() {
    return this.m_v1
  };
  d.prototype.GetVertex2 = function() {
    return this.m_v2
  };
  d.prototype.GetCoreVertex1 = function() {
    return this.m_coreV1
  };
  d.prototype.GetCoreVertex2 = function() {
    return this.m_coreV2
  };
  d.prototype.GetNormalVector = function() {
    return this.m_normal
  };
  d.prototype.GetDirectionVector = function() {
    return this.m_direction
  };
  d.prototype.GetCorner1Vector = function() {
    return this.m_cornerDir1
  };
  d.prototype.GetCorner2Vector = function() {
    return this.m_cornerDir2
  };
  d.prototype.Corner1IsConvex = function() {
    return this.m_cornerConvex1
  };
  d.prototype.Corner2IsConvex = function() {
    return this.m_cornerConvex2
  };
  d.prototype.GetFirstVertex = function(a) {
    var b = a.R;
    return new n(a.position.x + (b.col1.x * this.m_coreV1.x + b.col2.x * this.m_coreV1.y), a.position.y + (b.col1.y * this.m_coreV1.x + b.col2.y * this.m_coreV1.y))
  };
  d.prototype.GetNextEdge = function() {
    return this.m_nextEdge
  };
  d.prototype.GetPrevEdge = function() {
    return this.m_prevEdge
  };
  d.prototype.Support = function(a, b, d) {
    b === void 0 && (b = 0);
    d === void 0 && (d = 0);
    var e = a.R, h = a.position.x + (e.col1.x * this.m_coreV1.x + e.col2.x * this.m_coreV1.y), g = a.position.y + (e.col1.y * this.m_coreV1.x + e.col2.y * this.m_coreV1.y), o = a.position.x + (e.col1.x * this.m_coreV2.x + e.col2.x * this.m_coreV2.y), a = a.position.y + (e.col1.y * this.m_coreV2.x + e.col2.y * this.m_coreV2.y);
    h * b + g * d > o * b + a * d ? (this.s_supportVec.x = h, this.s_supportVec.y = g) : (this.s_supportVec.x = o, this.s_supportVec.y = a);
    return this.s_supportVec
  };
  d.prototype.b2EdgeShape = function(b, d) {
    this.__super.b2Shape.call(this);
    this.m_type = j.e_edgeShape;
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
  d.prototype.SetPrevEdge = function(a, b, d, e) {
    this.m_prevEdge = a;
    this.m_coreV1 = b;
    this.m_cornerDir1 = d;
    this.m_cornerConvex1 = e
  };
  d.prototype.SetNextEdge = function(a, b, d, e) {
    this.m_nextEdge = a;
    this.m_coreV2 = b;
    this.m_cornerDir2 = d;
    this.m_cornerConvex2 = e
  };
  b.b2MassData = function() {
    this.mass = 0;
    this.center = new n(0, 0);
    this.I = 0
  };
  Box2D.inherit(g, Box2D.Collision.Shapes.b2Shape);
  g.prototype.__super = Box2D.Collision.Shapes.b2Shape.prototype;
  g.b2PolygonShape = function() {
    Box2D.Collision.Shapes.b2Shape.b2Shape.apply(this, arguments)
  };
  g.prototype.Copy = function() {
    var a = new g;
    a.Set(this);
    return a
  };
  g.prototype.Set = function(a) {
    this.__super.Set.call(this, a);
    if(Box2D.is(a, g)) {
      a = a instanceof g ? a : null;
      this.m_centroid.SetV(a.m_centroid);
      this.m_vertexCount = a.m_vertexCount;
      this.Reserve(this.m_vertexCount);
      for(var b = 0;b < this.m_vertexCount;b++) {
        this.m_vertices[b].SetV(a.m_vertices[b]), this.m_normals[b].SetV(a.m_normals[b])
      }
    }
  };
  g.prototype.SetAsArray = function(a, b) {
    b === void 0 && (b = 0);
    for(var d = [], e = 0, h, e = 0;e < a.length;++e) {
      h = a[e], d.push(h)
    }
    this.SetAsVector(d, b)
  };
  g.AsArray = function(a, b) {
    b === void 0 && (b = 0);
    var d = new g;
    d.SetAsArray(a, b);
    return d
  };
  g.prototype.SetAsVector = function(b, d) {
    d === void 0 && (d = 0);
    if(d == 0) {
      d = b.length
    }
    a.b2Assert(2 <= d);
    this.m_vertexCount = d;
    this.Reserve(d);
    for(var e = 0, e = 0;e < this.m_vertexCount;e++) {
      this.m_vertices[e].SetV(b[e])
    }
    for(e = 0;e < this.m_vertexCount;++e) {
      var h = l.SubtractVV(this.m_vertices[e + 1 < this.m_vertexCount ? e + 1 : 0], this.m_vertices[e]);
      a.b2Assert(h.LengthSquared() > Number.MIN_VALUE);
      this.m_normals[e].SetV(l.CrossVF(h, 1));
      this.m_normals[e].Normalize()
    }
    this.m_centroid = g.ComputeCentroid(this.m_vertices, this.m_vertexCount)
  };
  g.AsVector = function(a, b) {
    b === void 0 && (b = 0);
    var d = new g;
    d.SetAsVector(a, b);
    return d
  };
  g.prototype.SetAsBox = function(a, b) {
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
  g.AsBox = function(a, b) {
    a === void 0 && (a = 0);
    b === void 0 && (b = 0);
    var d = new g;
    d.SetAsBox(a, b);
    return d
  };
  g.prototype.SetAsOrientedBox = function(a, b, d, e) {
    a === void 0 && (a = 0);
    b === void 0 && (b = 0);
    d === void 0 && (d = null);
    e === void 0 && (e = 0);
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
    a = new k;
    a.position = d;
    a.R.Set(e);
    for(d = 0;d < this.m_vertexCount;++d) {
      this.m_vertices[d] = l.MulX(a, this.m_vertices[d]), this.m_normals[d] = l.MulMV(a.R, this.m_normals[d])
    }
  };
  g.AsOrientedBox = function(a, b, d, e) {
    a === void 0 && (a = 0);
    b === void 0 && (b = 0);
    d === void 0 && (d = null);
    e === void 0 && (e = 0);
    var h = new g;
    h.SetAsOrientedBox(a, b, d, e);
    return h
  };
  g.prototype.SetAsEdge = function(a, b) {
    this.m_vertexCount = 2;
    this.Reserve(2);
    this.m_vertices[0].SetV(a);
    this.m_vertices[1].SetV(b);
    this.m_centroid.x = 0.5 * (a.x + b.x);
    this.m_centroid.y = 0.5 * (a.y + b.y);
    this.m_normals[0] = l.CrossVF(l.SubtractVV(b, a), 1);
    this.m_normals[0].Normalize();
    this.m_normals[1].x = -this.m_normals[0].x;
    this.m_normals[1].y = -this.m_normals[0].y
  };
  g.AsEdge = function(a, b) {
    var d = new g;
    d.SetAsEdge(a, b);
    return d
  };
  g.prototype.TestPoint = function(a, b) {
    var d;
    d = a.R;
    for(var e = b.x - a.position.x, h = b.y - a.position.y, g = e * d.col1.x + h * d.col1.y, o = e * d.col2.x + h * d.col2.y, f = 0;f < this.m_vertexCount;++f) {
      if(d = this.m_vertices[f], e = g - d.x, h = o - d.y, d = this.m_normals[f], d.x * e + d.y * h > 0) {
        return!1
      }
    }
    return!0
  };
  g.prototype.RayCast = function(a, b, d) {
    var e = 0, h = b.maxFraction, g = 0, o = 0, f, t, g = b.p1.x - d.position.x, o = b.p1.y - d.position.y;
    f = d.R;
    var l = g * f.col1.x + o * f.col1.y, j = g * f.col2.x + o * f.col2.y, g = b.p2.x - d.position.x, o = b.p2.y - d.position.y;
    f = d.R;
    b = g * f.col1.x + o * f.col1.y - l;
    f = g * f.col2.x + o * f.col2.y - j;
    for(var k = -1, m = 0;m < this.m_vertexCount;++m) {
      t = this.m_vertices[m];
      g = t.x - l;
      o = t.y - j;
      t = this.m_normals[m];
      g = t.x * g + t.y * o;
      o = t.x * b + t.y * f;
      if(o == 0) {
        if(g < 0) {
          return!1
        }
      }else {
        o < 0 && g < e * o ? (e = g / o, k = m) : o > 0 && g < h * o && (h = g / o)
      }
      if(h < e - Number.MIN_VALUE) {
        return!1
      }
    }
    return k >= 0 ? (a.fraction = e, f = d.R, t = this.m_normals[k], a.normal.x = f.col1.x * t.x + f.col2.x * t.y, a.normal.y = f.col1.y * t.x + f.col2.y * t.y, !0) : !1
  };
  g.prototype.ComputeAABB = function(a, b) {
    for(var d = b.R, e = this.m_vertices[0], h = b.position.x + (d.col1.x * e.x + d.col2.x * e.y), g = b.position.y + (d.col1.y * e.x + d.col2.y * e.y), o = h, f = g, t = 1;t < this.m_vertexCount;++t) {
      var e = this.m_vertices[t], l = b.position.x + (d.col1.x * e.x + d.col2.x * e.y), e = b.position.y + (d.col1.y * e.x + d.col2.y * e.y), h = h < l ? h : l, g = g < e ? g : e, o = o > l ? o : l, f = f > e ? f : e
    }
    a.lowerBound.x = h - this.m_radius;
    a.lowerBound.y = g - this.m_radius;
    a.upperBound.x = o + this.m_radius;
    a.upperBound.y = f + this.m_radius
  };
  g.prototype.ComputeMass = function(a, b) {
    b === void 0 && (b = 0);
    if(this.m_vertexCount == 2) {
      a.center.x = 0.5 * (this.m_vertices[0].x + this.m_vertices[1].x), a.center.y = 0.5 * (this.m_vertices[0].y + this.m_vertices[1].y), a.mass = 0, a.I = 0
    }else {
      for(var d = 0, e = 0, h = 0, g = 0, o = 1 / 3, f = 0;f < this.m_vertexCount;++f) {
        var t = this.m_vertices[f], l = f + 1 < this.m_vertexCount ? this.m_vertices[f + 1] : this.m_vertices[0], j = t.x - 0, k = t.y - 0, m = l.x - 0, u = l.y - 0, p = j * u - k * m, C = 0.5 * p;
        h += C;
        d += C * o * (0 + t.x + l.x);
        e += C * o * (0 + t.y + l.y);
        t = j;
        g += p * (o * (0.25 * (t * t + m * t + m * m) + (0 * t + 0 * m)) + 0 + (o * (0.25 * (k * k + u * k + u * u) + (0 * k + 0 * u)) + 0))
      }
      a.mass = b * h;
      d *= 1 / h;
      e *= 1 / h;
      a.center.Set(d, e);
      a.I = b * g
    }
  };
  g.prototype.ComputeSubmergedArea = function(a, d, e, h) {
    d === void 0 && (d = 0);
    for(var g = l.MulTMV(e.R, a), f = d - l.Dot(a, e.position), o = [], x = 0, t = -1, d = -1, j = !1, a = a = 0;a < this.m_vertexCount;++a) {
      o[a] = l.Dot(g, this.m_vertices[a]) - f;
      var k = o[a] < -Number.MIN_VALUE;
      a > 0 && (k ? j || (t = a - 1, x++) : j && (d = a - 1, x++));
      j = k
    }
    switch(x) {
      case 0:
        return j ? (a = new b, this.ComputeMass(a, 1), h.SetV(l.MulX(e, a.center)), a.mass) : 0;
      case 1:
        t == -1 ? t = this.m_vertexCount - 1 : d = this.m_vertexCount - 1
    }
    a = (t + 1) % this.m_vertexCount;
    g = (d + 1) % this.m_vertexCount;
    f = (0 - o[t]) / (o[a] - o[t]);
    o = (0 - o[d]) / (o[g] - o[d]);
    t = new n(this.m_vertices[t].x * (1 - f) + this.m_vertices[a].x * f, this.m_vertices[t].y * (1 - f) + this.m_vertices[a].y * f);
    d = new n(this.m_vertices[d].x * (1 - o) + this.m_vertices[g].x * o, this.m_vertices[d].y * (1 - o) + this.m_vertices[g].y * o);
    o = 0;
    f = new n;
    for(x = this.m_vertices[a];a != g;) {
      a = (a + 1) % this.m_vertexCount, j = a == g ? d : this.m_vertices[a], k = 0.5 * ((x.x - t.x) * (j.y - t.y) - (x.y - t.y) * (j.x - t.x)), o += k, f.x += k * (t.x + x.x + j.x) / 3, f.y += k * (t.y + x.y + j.y) / 3, x = j
    }
    f.Multiply(1 / o);
    h.SetV(l.MulX(e, f));
    return o
  };
  g.prototype.GetVertexCount = function() {
    return this.m_vertexCount
  };
  g.prototype.GetVertices = function() {
    return this.m_vertices
  };
  g.prototype.GetNormals = function() {
    return this.m_normals
  };
  g.prototype.GetSupport = function(a) {
    for(var b = 0, d = this.m_vertices[0].x * a.x + this.m_vertices[0].y * a.y, e = 1;e < this.m_vertexCount;++e) {
      var h = this.m_vertices[e].x * a.x + this.m_vertices[e].y * a.y;
      h > d && (b = e, d = h)
    }
    return b
  };
  g.prototype.GetSupportVertex = function(a) {
    for(var b = 0, d = this.m_vertices[0].x * a.x + this.m_vertices[0].y * a.y, e = 1;e < this.m_vertexCount;++e) {
      var h = this.m_vertices[e].x * a.x + this.m_vertices[e].y * a.y;
      h > d && (b = e, d = h)
    }
    return this.m_vertices[b]
  };
  g.prototype.Validate = function() {
    return!1
  };
  g.prototype.b2PolygonShape = function() {
    this.__super.b2Shape.call(this);
    this.m_type = j.e_polygonShape;
    this.m_centroid = new n;
    this.m_vertices = [];
    this.m_normals = []
  };
  g.prototype.Reserve = function(a) {
    a === void 0 && (a = 0);
    for(var b = this.m_vertices.length;b < a;b++) {
      this.m_vertices[b] = new n, this.m_normals[b] = new n
    }
  };
  g.ComputeCentroid = function(a, b) {
    b === void 0 && (b = 0);
    for(var d = new n, e = 0, h = 1 / 3, g = 0;g < b;++g) {
      var o = a[g], f = g + 1 < b ? a[g + 1] : a[0], t = 0.5 * ((o.x - 0) * (f.y - 0) - (o.y - 0) * (f.x - 0));
      e += t;
      d.x += t * h * (0 + o.x + f.x);
      d.y += t * h * (0 + o.y + f.y)
    }
    d.x *= 1 / e;
    d.y *= 1 / e;
    return d
  };
  g.ComputeOBB = function(a, b, d) {
    d === void 0 && (d = 0);
    for(var e = 0, h = Array(d + 1), e = 0;e < d;++e) {
      h[e] = b[e]
    }
    h[d] = h[0];
    b = Number.MAX_VALUE;
    for(e = 1;e <= d;++e) {
      var g = h[e - 1], o = h[e].x - g.x, f = h[e].y - g.y, t = Math.sqrt(o * o + f * f);
      o /= t;
      f /= t;
      for(var l = -f, j = o, k = t = Number.MAX_VALUE, m = -Number.MAX_VALUE, u = -Number.MAX_VALUE, p = 0;p < d;++p) {
        var C = h[p].x - g.x, K = h[p].y - g.y, M = o * C + f * K, C = l * C + j * K;
        M < t && (t = M);
        C < k && (k = C);
        M > m && (m = M);
        C > u && (u = C)
      }
      p = (m - t) * (u - k);
      if(p < 0.95 * b) {
        b = p, a.R.col1.x = o, a.R.col1.y = f, a.R.col2.x = l, a.R.col2.y = j, o = 0.5 * (t + m), f = 0.5 * (k + u), l = a.R, a.center.x = g.x + (l.col1.x * o + l.col2.x * f), a.center.y = g.y + (l.col1.y * o + l.col2.y * f), a.extents.x = 0.5 * (m - t), a.extents.y = 0.5 * (u - k)
      }
    }
  };
  Box2D.postDefs.push(function() {
    Box2D.Collision.Shapes.b2PolygonShape.s_mat = new h
  });
  j.b2Shape = function() {
  };
  j.prototype.Copy = function() {
    return null
  };
  j.prototype.Set = function(a) {
    this.m_radius = a.m_radius
  };
  j.prototype.GetType = function() {
    return this.m_type
  };
  j.prototype.TestPoint = function() {
    return!1
  };
  j.prototype.RayCast = function() {
    return!1
  };
  j.prototype.ComputeAABB = function() {
  };
  j.prototype.ComputeMass = function() {
  };
  j.prototype.ComputeSubmergedArea = function() {
    return 0
  };
  j.TestOverlap = function(a, b, d, e) {
    var h = new v;
    h.proxyA = new y;
    h.proxyA.Set(a);
    h.proxyB = new y;
    h.proxyB.Set(d);
    h.transformA = b;
    h.transformB = e;
    h.useRadii = !0;
    a = new B;
    a.count = 0;
    b = new r;
    q.Distance(b, a, h);
    return b.distance < 10 * Number.MIN_VALUE
  };
  j.prototype.b2Shape = function() {
    this.m_type = j.e_unknownShape;
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
  var a = Box2D.Common.b2Color, e = Box2D.Common.b2Settings, f = Box2D.Common.Math.b2Math;
  a.b2Color = function() {
    this._b = this._g = this._r = 0
  };
  a.prototype.b2Color = function(a, b, e) {
    a === void 0 && (a = 0);
    b === void 0 && (b = 0);
    e === void 0 && (e = 0);
    this._r = Box2D.parseUInt(255 * f.Clamp(a, 0, 1));
    this._g = Box2D.parseUInt(255 * f.Clamp(b, 0, 1));
    this._b = Box2D.parseUInt(255 * f.Clamp(e, 0, 1))
  };
  a.prototype.Set = function(a, b, e) {
    a === void 0 && (a = 0);
    b === void 0 && (b = 0);
    e === void 0 && (e = 0);
    this._r = Box2D.parseUInt(255 * f.Clamp(a, 0, 1));
    this._g = Box2D.parseUInt(255 * f.Clamp(b, 0, 1));
    this._b = Box2D.parseUInt(255 * f.Clamp(e, 0, 1))
  };
  Object.defineProperty(a.prototype, "r", {enumerable:!1, configurable:!0, set:function(a) {
    a === void 0 && (a = 0);
    this._r = Box2D.parseUInt(255 * f.Clamp(a, 0, 1))
  }});
  Object.defineProperty(a.prototype, "g", {enumerable:!1, configurable:!0, set:function(a) {
    a === void 0 && (a = 0);
    this._g = Box2D.parseUInt(255 * f.Clamp(a, 0, 1))
  }});
  Object.defineProperty(a.prototype, "b", {enumerable:!1, configurable:!0, set:function(a) {
    a === void 0 && (a = 0);
    this._b = Box2D.parseUInt(255 * f.Clamp(a, 0, 1))
  }});
  Object.defineProperty(a.prototype, "color", {enumerable:!1, configurable:!0, get:function() {
    return this._r << 16 | this._g << 8 | this._b
  }});
  e.b2Settings = function() {
  };
  e.b2MixFriction = function(a, b) {
    a === void 0 && (a = 0);
    b === void 0 && (b = 0);
    return Math.sqrt(a * b)
  };
  e.b2MixRestitution = function(a, b) {
    a === void 0 && (a = 0);
    b === void 0 && (b = 0);
    return a > b ? a : b
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
  var a = Box2D.Common.Math.b2Mat22, e = Box2D.Common.Math.b2Mat33, f = Box2D.Common.Math.b2Math, d = Box2D.Common.Math.b2Sweep, b = Box2D.Common.Math.b2Transform, g = Box2D.Common.Math.b2Vec2, j = Box2D.Common.Math.b2Vec3;
  a.b2Mat22 = function() {
    this.col1 = new g;
    this.col2 = new g
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
    var b = this.col1.x, d = this.col2.x, e = this.col1.y, g = this.col2.y, f = b * g - d * e;
    f != 0 && (f = 1 / f);
    a.col1.x = f * g;
    a.col2.x = -f * d;
    a.col1.y = -f * e;
    a.col2.y = f * b;
    return a
  };
  a.prototype.Solve = function(a, b, d) {
    b === void 0 && (b = 0);
    d === void 0 && (d = 0);
    var e = this.col1.x, g = this.col2.x, f = this.col1.y, j = this.col2.y, y = e * j - g * f;
    y != 0 && (y = 1 / y);
    a.x = y * (j * b - g * d);
    a.y = y * (e * d - f * b);
    return a
  };
  a.prototype.Abs = function() {
    this.col1.Abs();
    this.col2.Abs()
  };
  e.b2Mat33 = function() {
    this.col1 = new j;
    this.col2 = new j;
    this.col3 = new j
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
    var e = this.col1.x, g = this.col2.x, f = this.col1.y, j = this.col2.y, y = e * j - g * f;
    y != 0 && (y = 1 / y);
    a.x = y * (j * b - g * d);
    a.y = y * (e * d - f * b);
    return a
  };
  e.prototype.Solve33 = function(a, b, d, e) {
    b === void 0 && (b = 0);
    d === void 0 && (d = 0);
    e === void 0 && (e = 0);
    var g = this.col1.x, f = this.col1.y, j = this.col1.z, y = this.col2.x, B = this.col2.y, s = this.col2.z, z = this.col3.x, G = this.col3.y, I = this.col3.z, H = g * (B * I - s * G) + f * (s * z - y * I) + j * (y * G - B * z);
    H != 0 && (H = 1 / H);
    a.x = H * (b * (B * I - s * G) + d * (s * z - y * I) + e * (y * G - B * z));
    a.y = H * (g * (d * I - e * G) + f * (e * z - b * I) + j * (b * G - d * z));
    a.z = H * (g * (B * e - s * d) + f * (s * b - y * e) + j * (y * d - B * b));
    return a
  };
  f.b2Math = function() {
  };
  f.IsValid = function(a) {
    a === void 0 && (a = 0);
    return isFinite(a)
  };
  f.Dot = function(a, b) {
    return a.x * b.x + a.y * b.y
  };
  f.CrossVV = function(a, b) {
    return a.x * b.y - a.y * b.x
  };
  f.CrossVF = function(a, b) {
    b === void 0 && (b = 0);
    return new g(b * a.y, -b * a.x)
  };
  f.CrossFV = function(a, b) {
    a === void 0 && (a = 0);
    return new g(-a * b.y, a * b.x)
  };
  f.MulMV = function(a, b) {
    return new g(a.col1.x * b.x + a.col2.x * b.y, a.col1.y * b.x + a.col2.y * b.y)
  };
  f.MulTMV = function(a, b) {
    return new g(f.Dot(b, a.col1), f.Dot(b, a.col2))
  };
  f.MulX = function(a, b) {
    var d = f.MulMV(a.R, b);
    d.x += a.position.x;
    d.y += a.position.y;
    return d
  };
  f.MulXT = function(a, b) {
    var d = f.SubtractVV(b, a.position), e = d.x * a.R.col1.x + d.y * a.R.col1.y;
    d.y = d.x * a.R.col2.x + d.y * a.R.col2.y;
    d.x = e;
    return d
  };
  f.AddVV = function(a, b) {
    return new g(a.x + b.x, a.y + b.y)
  };
  f.SubtractVV = function(a, b) {
    return new g(a.x - b.x, a.y - b.y)
  };
  f.Distance = function(a, b) {
    var d = a.x - b.x, e = a.y - b.y;
    return Math.sqrt(d * d + e * e)
  };
  f.DistanceSquared = function(a, b) {
    var d = a.x - b.x, e = a.y - b.y;
    return d * d + e * e
  };
  f.MulFV = function(a, b) {
    a === void 0 && (a = 0);
    return new g(a * b.x, a * b.y)
  };
  f.AddMM = function(b, d) {
    return a.FromVV(f.AddVV(b.col1, d.col1), f.AddVV(b.col2, d.col2))
  };
  f.MulMM = function(b, d) {
    return a.FromVV(f.MulMV(b, d.col1), f.MulMV(b, d.col2))
  };
  f.MulTMM = function(b, d) {
    var e = new g(f.Dot(b.col1, d.col1), f.Dot(b.col2, d.col1)), j = new g(f.Dot(b.col1, d.col2), f.Dot(b.col2, d.col2));
    return a.FromVV(e, j)
  };
  f.Abs = function(a) {
    a === void 0 && (a = 0);
    return a > 0 ? a : -a
  };
  f.AbsV = function(a) {
    return new g(f.Abs(a.x), f.Abs(a.y))
  };
  f.AbsM = function(b) {
    return a.FromVV(f.AbsV(b.col1), f.AbsV(b.col2))
  };
  f.Min = function(a, b) {
    a === void 0 && (a = 0);
    b === void 0 && (b = 0);
    return a < b ? a : b
  };
  f.MinV = function(a, b) {
    return new g(f.Min(a.x, b.x), f.Min(a.y, b.y))
  };
  f.Max = function(a, b) {
    a === void 0 && (a = 0);
    b === void 0 && (b = 0);
    return a > b ? a : b
  };
  f.MaxV = function(a, b) {
    return new g(f.Max(a.x, b.x), f.Max(a.y, b.y))
  };
  f.Clamp = function(a, b, d) {
    a === void 0 && (a = 0);
    b === void 0 && (b = 0);
    d === void 0 && (d = 0);
    return a < b ? b : a > d ? d : a
  };
  f.ClampV = function(a, b, d) {
    return f.MaxV(b, f.MinV(a, d))
  };
  f.Swap = function(a, b) {
    var d = a[0];
    a[0] = b[0];
    b[0] = d
  };
  f.Random = function() {
    return Math.random() * 2 - 1
  };
  f.RandomRange = function(a, b) {
    a === void 0 && (a = 0);
    b === void 0 && (b = 0);
    var d = Math.random();
    return(b - a) * d + a
  };
  f.NextPowerOfTwo = function(a) {
    a === void 0 && (a = 0);
    a |= a >> 1 & 2147483647;
    a |= a >> 2 & 1073741823;
    a |= a >> 4 & 268435455;
    a |= a >> 8 & 16777215;
    a |= a >> 16 & 65535;
    return a + 1
  };
  f.IsPowerOfTwo = function(a) {
    a === void 0 && (a = 0);
    return a > 0 && (a & a - 1) == 0
  };
  Box2D.postDefs.push(function() {
    Box2D.Common.Math.b2Math.b2Vec2_zero = new g(0, 0);
    Box2D.Common.Math.b2Math.b2Mat22_identity = a.FromVV(new g(1, 0), new g(0, 1));
    Box2D.Common.Math.b2Math.b2Transform_identity = new b(f.b2Vec2_zero, f.b2Mat22_identity)
  });
  d.b2Sweep = function() {
    this.localCenter = new g;
    this.c0 = new g;
    this.c = new g
  };
  d.prototype.Set = function(a) {
    this.localCenter.SetV(a.localCenter);
    this.c0.SetV(a.c0);
    this.c.SetV(a.c);
    this.a0 = a.a0;
    this.a = a.a;
    this.t0 = a.t0
  };
  d.prototype.Copy = function() {
    var a = new d;
    a.localCenter.SetV(this.localCenter);
    a.c0.SetV(this.c0);
    a.c.SetV(this.c);
    a.a0 = this.a0;
    a.a = this.a;
    a.t0 = this.t0;
    return a
  };
  d.prototype.GetTransform = function(a, b) {
    b === void 0 && (b = 0);
    a.position.x = (1 - b) * this.c0.x + b * this.c.x;
    a.position.y = (1 - b) * this.c0.y + b * this.c.y;
    a.R.Set((1 - b) * this.a0 + b * this.a);
    var d = a.R;
    a.position.x -= d.col1.x * this.localCenter.x + d.col2.x * this.localCenter.y;
    a.position.y -= d.col1.y * this.localCenter.x + d.col2.y * this.localCenter.y
  };
  d.prototype.Advance = function(a) {
    a === void 0 && (a = 0);
    if(this.t0 < a && 1 - this.t0 > Number.MIN_VALUE) {
      var b = (a - this.t0) / (1 - this.t0);
      this.c0.x = (1 - b) * this.c0.x + b * this.c.x;
      this.c0.y = (1 - b) * this.c0.y + b * this.c.y;
      this.a0 = (1 - b) * this.a0 + b * this.a;
      this.t0 = a
    }
  };
  b.b2Transform = function() {
    this.position = new g;
    this.R = new a
  };
  b.prototype.b2Transform = function(a, b) {
    a === void 0 && (a = null);
    b === void 0 && (b = null);
    a && (this.position.SetV(a), this.R.SetM(b))
  };
  b.prototype.Initialize = function(a, b) {
    this.position.SetV(a);
    this.R.SetM(b)
  };
  b.prototype.SetIdentity = function() {
    this.position.SetZero();
    this.R.SetIdentity()
  };
  b.prototype.Set = function(a) {
    this.position.SetV(a.position);
    this.R.SetM(a.R)
  };
  b.prototype.GetAngle = function() {
    return Math.atan2(this.R.col1.y, this.R.col1.x)
  };
  g.b2Vec2 = function() {
  };
  g.prototype.b2Vec2 = function(a, b) {
    a === void 0 && (a = 0);
    b === void 0 && (b = 0);
    this.x = a;
    this.y = b
  };
  g.prototype.SetZero = function() {
    this.y = this.x = 0
  };
  g.prototype.Set = function(a, b) {
    a === void 0 && (a = 0);
    b === void 0 && (b = 0);
    this.x = a;
    this.y = b
  };
  g.prototype.SetV = function(a) {
    this.x = a.x;
    this.y = a.y
  };
  g.prototype.GetNegative = function() {
    return new g(-this.x, -this.y)
  };
  g.prototype.NegativeSelf = function() {
    this.x = -this.x;
    this.y = -this.y
  };
  g.Make = function(a, b) {
    a === void 0 && (a = 0);
    b === void 0 && (b = 0);
    return new g(a, b)
  };
  g.prototype.Copy = function() {
    return new g(this.x, this.y)
  };
  g.prototype.Add = function(a) {
    this.x += a.x;
    this.y += a.y
  };
  g.prototype.Subtract = function(a) {
    this.x -= a.x;
    this.y -= a.y
  };
  g.prototype.Multiply = function(a) {
    a === void 0 && (a = 0);
    this.x *= a;
    this.y *= a
  };
  g.prototype.MulM = function(a) {
    var b = this.x;
    this.x = a.col1.x * b + a.col2.x * this.y;
    this.y = a.col1.y * b + a.col2.y * this.y
  };
  g.prototype.MulTM = function(a) {
    var b = f.Dot(this, a.col1);
    this.y = f.Dot(this, a.col2);
    this.x = b
  };
  g.prototype.CrossVF = function(a) {
    a === void 0 && (a = 0);
    var b = this.x;
    this.x = a * this.y;
    this.y = -a * b
  };
  g.prototype.CrossFV = function(a) {
    a === void 0 && (a = 0);
    var b = this.x;
    this.x = -a * this.y;
    this.y = a * b
  };
  g.prototype.MinV = function(a) {
    this.x = this.x < a.x ? this.x : a.x;
    this.y = this.y < a.y ? this.y : a.y
  };
  g.prototype.MaxV = function(a) {
    this.x = this.x > a.x ? this.x : a.x;
    this.y = this.y > a.y ? this.y : a.y
  };
  g.prototype.Abs = function() {
    if(this.x < 0) {
      this.x = -this.x
    }
    if(this.y < 0) {
      this.y = -this.y
    }
  };
  g.prototype.Length = function() {
    return Math.sqrt(this.x * this.x + this.y * this.y)
  };
  g.prototype.LengthSquared = function() {
    return this.x * this.x + this.y * this.y
  };
  g.prototype.Normalize = function() {
    var a = Math.sqrt(this.x * this.x + this.y * this.y);
    if(a < Number.MIN_VALUE) {
      return 0
    }
    var b = 1 / a;
    this.x *= b;
    this.y *= b;
    return a
  };
  g.prototype.IsValid = function() {
    return f.IsValid(this.x) && f.IsValid(this.y)
  };
  j.b2Vec3 = function() {
  };
  j.prototype.b2Vec3 = function(a, b, d) {
    a === void 0 && (a = 0);
    b === void 0 && (b = 0);
    d === void 0 && (d = 0);
    this.x = a;
    this.y = b;
    this.z = d
  };
  j.prototype.SetZero = function() {
    this.x = this.y = this.z = 0
  };
  j.prototype.Set = function(a, b, d) {
    a === void 0 && (a = 0);
    b === void 0 && (b = 0);
    d === void 0 && (d = 0);
    this.x = a;
    this.y = b;
    this.z = d
  };
  j.prototype.SetV = function(a) {
    this.x = a.x;
    this.y = a.y;
    this.z = a.z
  };
  j.prototype.GetNegative = function() {
    return new j(-this.x, -this.y, -this.z)
  };
  j.prototype.NegativeSelf = function() {
    this.x = -this.x;
    this.y = -this.y;
    this.z = -this.z
  };
  j.prototype.Copy = function() {
    return new j(this.x, this.y, this.z)
  };
  j.prototype.Add = function(a) {
    this.x += a.x;
    this.y += a.y;
    this.z += a.z
  };
  j.prototype.Subtract = function(a) {
    this.x -= a.x;
    this.y -= a.y;
    this.z -= a.z
  };
  j.prototype.Multiply = function(a) {
    a === void 0 && (a = 0);
    this.x *= a;
    this.y *= a;
    this.z *= a
  }
})();
(function() {
  var a = Box2D.Common.Math.b2Math, e = Box2D.Common.Math.b2Sweep, f = Box2D.Common.Math.b2Transform, d = Box2D.Common.Math.b2Vec2, b = Box2D.Common.b2Settings, g = Box2D.Collision.b2AABB, j = Box2D.Collision.b2ContactPoint, h = Box2D.Collision.b2DynamicTreeBroadPhase, l = Box2D.Collision.Shapes.b2MassData, k = Box2D.Dynamics.b2Body, n = Box2D.Dynamics.b2BodyDef, q = Box2D.Dynamics.b2ContactFilter, v = Box2D.Dynamics.b2ContactImpulse, r = Box2D.Dynamics.b2ContactListener, y = Box2D.Dynamics.b2ContactManager, 
  B = Box2D.Dynamics.b2DestructionListener, s = Box2D.Dynamics.b2FilterData, z = Box2D.Dynamics.b2Fixture, G = Box2D.Dynamics.b2FixtureDef, I = Box2D.Dynamics.b2Island, H = Box2D.Dynamics.b2TimeStep, J = Box2D.Dynamics.Contacts.b2ContactFactory;
  k.b2Body = function() {
    this.m_xf = new f;
    this.m_sweep = new e;
    this.m_linearVelocity = new d;
    this.m_force = new d
  };
  k.prototype.connectEdges = function(d, e, g) {
    g === void 0 && (g = 0);
    var f = Math.atan2(e.GetDirectionVector().y, e.GetDirectionVector().x), g = Math.tan((f - g) * 0.5), g = a.MulFV(g, e.GetDirectionVector()), g = a.SubtractVV(g, e.GetNormalVector()), g = a.MulFV(b.b2_toiSlop, g), g = a.AddVV(g, e.GetVertex1()), h = a.AddVV(d.GetDirectionVector(), e.GetDirectionVector());
    h.Normalize();
    var j = a.Dot(d.GetDirectionVector(), e.GetNormalVector()) > 0;
    d.SetNextEdge(e, g, h, j);
    e.SetPrevEdge(d, g, h, j);
    return f
  };
  k.prototype.CreateFixture = function(a) {
    if(this.m_world.IsLocked() == !0) {
      return null
    }
    var b = new z;
    b.Create(this, this.m_xf, a);
    this.m_flags & k.e_activeFlag && b.CreateProxy(this.m_world.m_contactManager.m_broadPhase, this.m_xf);
    b.m_next = this.m_fixtureList;
    this.m_fixtureList = b;
    ++this.m_fixtureCount;
    b.m_body = this;
    b.m_density > 0 && this.ResetMassData();
    this.m_world.m_newFixture = !0;
    return b
  };
  k.prototype.CreateFixture2 = function(a, b) {
    b === void 0 && (b = 0);
    var d = new G;
    d.shape = a;
    d.density = b;
    return this.CreateFixture(d)
  };
  k.prototype.DestroyFixture = function(a) {
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
        var d = b.contact, b = b.next, e = d.GetFixtureA(), g = d.GetFixtureB();
        (a == e || a == g) && this.m_world.m_contactManager.Destroy(d)
      }
      this.m_flags & k.e_activeFlag && a.DestroyProxy(this.m_world.m_contactManager.m_broadPhase);
      a.Destroy();
      a.m_body = null;
      a.m_next = null;
      --this.m_fixtureCount;
      this.ResetMassData()
    }
  };
  k.prototype.SetPositionAndAngle = function(a, b) {
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
  k.prototype.SetTransform = function(a) {
    this.SetPositionAndAngle(a.position, a.GetAngle())
  };
  k.prototype.GetTransform = function() {
    return this.m_xf
  };
  k.prototype.GetPosition = function() {
    return this.m_xf.position
  };
  k.prototype.SetPosition = function(a) {
    this.SetPositionAndAngle(a, this.GetAngle())
  };
  k.prototype.GetAngle = function() {
    return this.m_sweep.a
  };
  k.prototype.SetAngle = function(a) {
    a === void 0 && (a = 0);
    this.SetPositionAndAngle(this.GetPosition(), a)
  };
  k.prototype.GetWorldCenter = function() {
    return this.m_sweep.c
  };
  k.prototype.GetLocalCenter = function() {
    return this.m_sweep.localCenter
  };
  k.prototype.SetLinearVelocity = function(a) {
    this.m_type != k.b2_staticBody && this.m_linearVelocity.SetV(a)
  };
  k.prototype.GetLinearVelocity = function() {
    return this.m_linearVelocity
  };
  k.prototype.SetAngularVelocity = function(a) {
    a === void 0 && (a = 0);
    if(this.m_type != k.b2_staticBody) {
      this.m_angularVelocity = a
    }
  };
  k.prototype.GetAngularVelocity = function() {
    return this.m_angularVelocity
  };
  k.prototype.GetDefinition = function() {
    var a = new n;
    a.type = this.GetType();
    a.allowSleep = this.m_allowSleep;
    a.angle = this.GetAngle();
    a.angularDamping = this.m_angularDamping;
    a.angularVelocity = this.m_angularVelocity;
    a.fixedRotation = (this.m_flags & k.e_fixedRotationFlag) == k.e_fixedRotationFlag;
    a.bullet = (this.m_flags & k.e_bulletFlag) == k.e_bulletFlag;
    a.awake = this.m_awake;
    a.linearDamping = this.m_linearDamping;
    a.linearVelocity.SetV(this.GetLinearVelocity());
    a.position = this.GetPosition();
    a.userData = this.GetUserData();
    return a
  };
  k.prototype.ApplyForce = function(a, b) {
    this.m_type == k.b2_dynamicBody && (this.IsAwake() == !1 && this.SetAwake(!0), this.m_force.x += a.x, this.m_force.y += a.y, this.m_torque += (b.x - this.m_sweep.c.x) * a.y - (b.y - this.m_sweep.c.y) * a.x)
  };
  k.prototype.ApplyTorque = function(a) {
    a === void 0 && (a = 0);
    this.m_type == k.b2_dynamicBody && (this.IsAwake() == !1 && this.SetAwake(!0), this.m_torque += a)
  };
  k.prototype.ApplyImpulse = function(a, b) {
    this.m_type == k.b2_dynamicBody && (this.IsAwake() == !1 && this.SetAwake(!0), this.m_linearVelocity.x += this.m_invMass * a.x, this.m_linearVelocity.y += this.m_invMass * a.y, this.m_angularVelocity += this.m_invI * ((b.x - this.m_sweep.c.x) * a.y - (b.y - this.m_sweep.c.y) * a.x))
  };
  k.prototype.Split = function(b) {
    for(var d = this.GetLinearVelocity().Copy(), e = this.GetAngularVelocity(), g = this.GetWorldCenter(), f = this.m_world.CreateBody(this.GetDefinition()), h, m = this.m_fixtureList;m;) {
      if(b(m)) {
        var u = m.m_next;
        h ? h.m_next = u : this.m_fixtureList = u;
        this.m_fixtureCount--;
        m.m_next = f.m_fixtureList;
        f.m_fixtureList = m;
        f.m_fixtureCount++;
        m.m_body = f;
        m = u
      }else {
        h = m, m = m.m_next
      }
    }
    this.ResetMassData();
    f.ResetMassData();
    h = this.GetWorldCenter();
    b = f.GetWorldCenter();
    h = a.AddVV(d, a.CrossFV(e, a.SubtractVV(h, g)));
    d = a.AddVV(d, a.CrossFV(e, a.SubtractVV(b, g)));
    this.SetLinearVelocity(h);
    f.SetLinearVelocity(d);
    this.SetAngularVelocity(e);
    f.SetAngularVelocity(e);
    this.SynchronizeFixtures();
    f.SynchronizeFixtures();
    return f
  };
  k.prototype.Merge = function(a) {
    var b;
    for(b = a.m_fixtureList;b;) {
      var d = b.m_next;
      a.m_fixtureCount--;
      b.m_next = this.m_fixtureList;
      this.m_fixtureList = b;
      this.m_fixtureCount++;
      b.m_body = g;
      b = d
    }
    e.m_fixtureCount = 0;
    var e = this, g = a;
    e.GetWorldCenter();
    g.GetWorldCenter();
    e.GetLinearVelocity().Copy();
    g.GetLinearVelocity().Copy();
    e.GetAngularVelocity();
    g.GetAngularVelocity();
    e.ResetMassData();
    this.SynchronizeFixtures()
  };
  k.prototype.GetMass = function() {
    return this.m_mass
  };
  k.prototype.GetInertia = function() {
    return this.m_I
  };
  k.prototype.GetMassData = function(a) {
    a.mass = this.m_mass;
    a.I = this.m_I;
    a.center.SetV(this.m_sweep.localCenter)
  };
  k.prototype.SetMassData = function(d) {
    b.b2Assert(this.m_world.IsLocked() == !1);
    if(this.m_world.IsLocked() != !0 && this.m_type == k.b2_dynamicBody) {
      this.m_invI = this.m_I = this.m_invMass = 0;
      this.m_mass = d.mass;
      if(this.m_mass <= 0) {
        this.m_mass = 1
      }
      this.m_invMass = 1 / this.m_mass;
      if(d.I > 0 && (this.m_flags & k.e_fixedRotationFlag) == 0) {
        this.m_I = d.I - this.m_mass * (d.center.x * d.center.x + d.center.y * d.center.y), this.m_invI = 1 / this.m_I
      }
      var e = this.m_sweep.c.Copy();
      this.m_sweep.localCenter.SetV(d.center);
      this.m_sweep.c0.SetV(a.MulX(this.m_xf, this.m_sweep.localCenter));
      this.m_sweep.c.SetV(this.m_sweep.c0);
      this.m_linearVelocity.x += this.m_angularVelocity * -(this.m_sweep.c.y - e.y);
      this.m_linearVelocity.y += this.m_angularVelocity * +(this.m_sweep.c.x - e.x)
    }
  };
  k.prototype.ResetMassData = function() {
    this.m_invI = this.m_I = this.m_invMass = this.m_mass = 0;
    this.m_sweep.localCenter.SetZero();
    if(!(this.m_type == k.b2_staticBody || this.m_type == k.b2_kinematicBody)) {
      for(var e = d.Make(0, 0), g = this.m_fixtureList;g;g = g.m_next) {
        if(g.m_density != 0) {
          var f = g.GetMassData();
          this.m_mass += f.mass;
          e.x += f.center.x * f.mass;
          e.y += f.center.y * f.mass;
          this.m_I += f.I
        }
      }
      this.m_mass > 0 ? (this.m_invMass = 1 / this.m_mass, e.x *= this.m_invMass, e.y *= this.m_invMass) : this.m_invMass = this.m_mass = 1;
      this.m_I > 0 && (this.m_flags & k.e_fixedRotationFlag) == 0 ? (this.m_I -= this.m_mass * (e.x * e.x + e.y * e.y), this.m_I *= this.m_inertiaScale, b.b2Assert(this.m_I > 0), this.m_invI = 1 / this.m_I) : this.m_invI = this.m_I = 0;
      g = this.m_sweep.c.Copy();
      this.m_sweep.localCenter.SetV(e);
      this.m_sweep.c0.SetV(a.MulX(this.m_xf, this.m_sweep.localCenter));
      this.m_sweep.c.SetV(this.m_sweep.c0);
      this.m_linearVelocity.x += this.m_angularVelocity * -(this.m_sweep.c.y - g.y);
      this.m_linearVelocity.y += this.m_angularVelocity * +(this.m_sweep.c.x - g.x)
    }
  };
  k.prototype.GetWorldPoint = function(a) {
    var b = this.m_xf.R, a = new d(b.col1.x * a.x + b.col2.x * a.y, b.col1.y * a.x + b.col2.y * a.y);
    a.x += this.m_xf.position.x;
    a.y += this.m_xf.position.y;
    return a
  };
  k.prototype.GetWorldVector = function(b) {
    return a.MulMV(this.m_xf.R, b)
  };
  k.prototype.GetLocalPoint = function(b) {
    return a.MulXT(this.m_xf, b)
  };
  k.prototype.GetLocalVector = function(b) {
    return a.MulTMV(this.m_xf.R, b)
  };
  k.prototype.GetLinearVelocityFromWorldPoint = function(a) {
    return new d(this.m_linearVelocity.x - this.m_angularVelocity * (a.y - this.m_sweep.c.y), this.m_linearVelocity.y + this.m_angularVelocity * (a.x - this.m_sweep.c.x))
  };
  k.prototype.GetLinearVelocityFromLocalPoint = function(a) {
    var b = this.m_xf.R, a = new d(b.col1.x * a.x + b.col2.x * a.y, b.col1.y * a.x + b.col2.y * a.y);
    a.x += this.m_xf.position.x;
    a.y += this.m_xf.position.y;
    return new d(this.m_linearVelocity.x - this.m_angularVelocity * (a.y - this.m_sweep.c.y), this.m_linearVelocity.y + this.m_angularVelocity * (a.x - this.m_sweep.c.x))
  };
  k.prototype.GetLinearDamping = function() {
    return this.m_linearDamping
  };
  k.prototype.SetLinearDamping = function(a) {
    a === void 0 && (a = 0);
    this.m_linearDamping = a
  };
  k.prototype.GetAngularDamping = function() {
    return this.m_angularDamping
  };
  k.prototype.SetAngularDamping = function(a) {
    a === void 0 && (a = 0);
    this.m_angularDamping = a
  };
  k.prototype.SetType = function(a) {
    a === void 0 && (a = 0);
    if(this.m_type != a) {
      this.m_type = a;
      this.ResetMassData();
      if(this.m_type == k.b2_staticBody) {
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
  k.prototype.GetType = function() {
    return this.m_type
  };
  k.prototype.SetBullet = function(a) {
    a ? this.m_flags |= k.e_bulletFlag : this.m_flags &= ~k.e_bulletFlag
  };
  k.prototype.IsBullet = function() {
    return(this.m_flags & k.e_bulletFlag) == k.e_bulletFlag
  };
  k.prototype.SetSleepingAllowed = function(a) {
    (this.m_allowSleep = a) || this.SetAwake(!0)
  };
  k.prototype.SetAwake = function(a) {
    this.m_awake = a;
    this.m_sleepTime = 0;
    if(!a) {
      this.m_linearVelocity.SetZero(), this.m_angularVelocity = 0, this.m_force.SetZero(), this.m_torque = 0
    }
  };
  k.prototype.IsAwake = function() {
    return this.m_awake
  };
  k.prototype.SetFixedRotation = function(a) {
    a ? this.m_flags |= k.e_fixedRotationFlag : this.m_flags &= ~k.e_fixedRotationFlag;
    this.ResetMassData()
  };
  k.prototype.IsFixedRotation = function() {
    return(this.m_flags & k.e_fixedRotationFlag) == k.e_fixedRotationFlag
  };
  k.prototype.SetActive = function(a) {
    if(a != this.IsActive()) {
      var b;
      if(a) {
        this.m_flags |= k.e_activeFlag;
        a = this.m_world.m_contactManager.m_broadPhase;
        for(b = this.m_fixtureList;b;b = b.m_next) {
          b.CreateProxy(a, this.m_xf)
        }
      }else {
        this.m_flags &= ~k.e_activeFlag;
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
  k.prototype.IsActive = function() {
    return(this.m_flags & k.e_activeFlag) == k.e_activeFlag
  };
  k.prototype.IsSleepingAllowed = function() {
    return this.m_allowSleep
  };
  k.prototype.GetFixtureList = function() {
    return this.m_fixtureList
  };
  k.prototype.GetJointList = function() {
    return this.m_jointList
  };
  k.prototype.GetControllerList = function() {
    return this.m_controllerList
  };
  k.prototype.GetContactList = function() {
    return this.m_contactList
  };
  k.prototype.GetNext = function() {
    return this.m_next
  };
  k.prototype.GetUserData = function() {
    return this.m_userData
  };
  k.prototype.SetUserData = function(a) {
    this.m_userData = a
  };
  k.prototype.GetWorld = function() {
    return this.m_world
  };
  k.prototype.b2Body = function(a, b) {
    this.m_flags = 0;
    a.bullet && (this.m_flags |= k.e_bulletFlag);
    a.fixedRotation && (this.m_flags |= k.e_fixedRotationFlag);
    this.m_allowSleep = a.allowSleep;
    this.m_awake = a.awake;
    a.active && (this.m_flags |= k.e_activeFlag);
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
    this.m_invMass = this.m_type == k.b2_dynamicBody ? this.m_mass = 1 : this.m_mass = 0;
    this.m_invI = this.m_I = 0;
    this.m_inertiaScale = a.inertiaScale;
    this.m_userData = a.userData;
    this.m_fixtureList = null;
    this.m_fixtureCount = 0
  };
  k.prototype.SynchronizeFixtures = function() {
    var a = k.s_xf1;
    a.R.Set(this.m_sweep.a0);
    var b = a.R, d = this.m_sweep.localCenter;
    a.position.x = this.m_sweep.c0.x - (b.col1.x * d.x + b.col2.x * d.y);
    a.position.y = this.m_sweep.c0.y - (b.col1.y * d.x + b.col2.y * d.y);
    d = this.m_world.m_contactManager.m_broadPhase;
    for(b = this.m_fixtureList;b;b = b.m_next) {
      b.Synchronize(d, a, this.m_xf)
    }
  };
  k.prototype.SynchronizeTransform = function() {
    this.m_xf.R.Set(this.m_sweep.a);
    var a = this.m_xf.R, b = this.m_sweep.localCenter;
    this.m_xf.position.x = this.m_sweep.c.x - (a.col1.x * b.x + a.col2.x * b.y);
    this.m_xf.position.y = this.m_sweep.c.y - (a.col1.y * b.x + a.col2.y * b.y)
  };
  k.prototype.ShouldCollide = function(a) {
    if(this.m_type != k.b2_dynamicBody && a.m_type != k.b2_dynamicBody) {
      return!1
    }
    for(var b = this.m_jointList;b;b = b.next) {
      if(b.other == a && b.joint.m_collideConnected == !1) {
        return!1
      }
    }
    return!0
  };
  k.prototype.Advance = function(a) {
    a === void 0 && (a = 0);
    this.m_sweep.Advance(a);
    this.m_sweep.c.SetV(this.m_sweep.c0);
    this.m_sweep.a = this.m_sweep.a0;
    this.SynchronizeTransform()
  };
  Box2D.postDefs.push(function() {
    Box2D.Dynamics.b2Body.s_xf1 = new f;
    Box2D.Dynamics.b2Body.e_bulletFlag = 8;
    Box2D.Dynamics.b2Body.e_fixedRotationFlag = 16;
    Box2D.Dynamics.b2Body.e_activeFlag = 32;
    Box2D.Dynamics.b2Body.b2_staticBody = 0;
    Box2D.Dynamics.b2Body.b2_kinematicBody = 1;
    Box2D.Dynamics.b2Body.b2_dynamicBody = 2
  });
  n.b2BodyDef = function() {
    this.position = new d;
    this.linearVelocity = new d
  };
  n.prototype.b2BodyDef = function() {
    this.userData = null;
    this.position.Set(0, 0);
    this.angle = 0;
    this.linearVelocity.Set(0, 0);
    this.angularDamping = this.linearDamping = this.angularVelocity = 0;
    this.awake = this.allowSleep = !0;
    this.bullet = this.fixedRotation = !1;
    this.type = k.b2_staticBody;
    this.active = !0;
    this.inertiaScale = 1
  };
  q.b2ContactFilter = function() {
  };
  q.prototype.ShouldCollide = function(a, b) {
    var d = a.GetFilterData(), e = b.GetFilterData();
    return d.groupIndex == e.groupIndex && d.groupIndex != 0 ? d.groupIndex > 0 : (d.maskBits & e.categoryBits) != 0 && (d.categoryBits & e.maskBits) != 0
  };
  q.prototype.RayCollide = function(a, b) {
    return!a ? !0 : this.ShouldCollide(a instanceof z ? a : null, b)
  };
  Box2D.postDefs.push(function() {
    Box2D.Dynamics.b2ContactFilter.b2_defaultFilter = new q
  });
  v.b2ContactImpulse = function() {
    this.normalImpulses = new Box2D.NVector(b.b2_maxManifoldPoints);
    this.tangentImpulses = new Box2D.NVector(b.b2_maxManifoldPoints)
  };
  r.b2ContactListener = function() {
  };
  r.prototype.BeginContact = function() {
  };
  r.prototype.EndContact = function() {
  };
  r.prototype.PreSolve = function() {
  };
  r.prototype.PostSolve = function() {
  };
  Box2D.postDefs.push(function() {
    Box2D.Dynamics.b2ContactListener.b2_defaultListener = new r
  });
  y.b2ContactManager = function() {
  };
  y.prototype.b2ContactManager = function() {
    this.m_world = null;
    this.m_contactCount = 0;
    this.m_contactFilter = q.b2_defaultFilter;
    this.m_contactListener = r.b2_defaultListener;
    this.m_contactFactory = new J;
    this.m_broadPhase = new h
  };
  y.prototype.AddPair = function(a, b) {
    var d = a instanceof z ? a : null, e = b instanceof z ? b : null, g = d.GetBody(), f = e.GetBody();
    if(g != f && f.ShouldCollide(g) != !1 && this.m_contactFilter.ShouldCollide(d, e) != !1) {
      for(f = f.GetContactList();f;) {
        if(f.other == g) {
          var m = f.contact.GetFixtureA(), u = f.contact.GetFixtureB();
          if(m == d && u == e) {
            return
          }
          if(m == e && u == d) {
            return
          }
        }
        f = f.next
      }
      m = this.m_contactFactory.Create(d, e);
      d = m.GetFixtureA();
      e = m.GetFixtureB();
      g = d.m_body;
      f = e.m_body;
      m.m_prev = null;
      m.m_next = this.m_world.m_contactList;
      if(this.m_world.m_contactList != null) {
        this.m_world.m_contactList.m_prev = m
      }
      this.m_world.m_contactList = m;
      m.m_nodeA.contact = m;
      m.m_nodeA.other = f;
      m.m_nodeA.prev = null;
      m.m_nodeA.next = g.m_contactList;
      if(g.m_contactList != null) {
        g.m_contactList.prev = m.m_nodeA
      }
      g.m_contactList = m.m_nodeA;
      m.m_nodeB.contact = m;
      m.m_nodeB.other = g;
      m.m_nodeB.prev = null;
      m.m_nodeB.next = f.m_contactList;
      if(f.m_contactList != null) {
        f.m_contactList.prev = m.m_nodeB
      }
      f.m_contactList = m.m_nodeB;
      ++this.m_world.m_contactCount
    }
  };
  y.prototype.FindNewContacts = function() {
    this.m_broadPhase.UpdatePairs(Box2D.generateCallback(this, this.AddPair))
  };
  y.prototype.Destroy = function(a) {
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
  y.prototype.Collide = function() {
    for(var a = this.m_world.m_contactList;a;) {
      var b = a.GetFixtureA(), d = a.GetFixtureB(), e = b.GetBody(), g = d.GetBody();
      if(e.IsAwake() == !1 && g.IsAwake() == !1) {
        a = a.GetNext()
      }else {
        if(a.IsFiltering()) {
          if(g.ShouldCollide(e) == !1) {
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
          a.ClearFiltering()
        }
        this.m_broadPhase.TestOverlap(b.m_proxy, d.m_proxy) == !1 ? (b = a, a = b.GetNext(), this.Destroy(b)) : (a.Update(this.m_contactListener), a = a.GetNext())
      }
    }
  };
  Box2D.postDefs.push(function() {
    Box2D.Dynamics.b2ContactManager.s_evalCP = new j
  });
  B.b2DestructionListener = function() {
  };
  B.prototype.SayGoodbyeJoint = function() {
  };
  B.prototype.SayGoodbyeFixture = function() {
  };
  s.b2FilterData = function() {
    this.categoryBits = 1;
    this.maskBits = 65535;
    this.groupIndex = 0
  };
  s.prototype.Copy = function() {
    var a = new s;
    a.categoryBits = this.categoryBits;
    a.maskBits = this.maskBits;
    a.groupIndex = this.groupIndex;
    return a
  };
  z.b2Fixture = function() {
    this.m_filter = new s
  };
  z.prototype.GetType = function() {
    return this.m_shape.GetType()
  };
  z.prototype.GetShape = function() {
    return this.m_shape
  };
  z.prototype.SetSensor = function(a) {
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
  z.prototype.IsSensor = function() {
    return this.m_isSensor
  };
  z.prototype.SetFilterData = function(a) {
    this.m_filter = a.Copy();
    if(!this.m_body) {
      for(a = this.m_body.GetContactList();a;) {
        var b = a.contact, d = b.GetFixtureA(), e = b.GetFixtureB();
        (d == this || e == this) && b.FlagForFiltering();
        a = a.next
      }
    }
  };
  z.prototype.GetFilterData = function() {
    return this.m_filter.Copy()
  };
  z.prototype.GetBody = function() {
    return this.m_body
  };
  z.prototype.GetNext = function() {
    return this.m_next
  };
  z.prototype.GetUserData = function() {
    return this.m_userData
  };
  z.prototype.SetUserData = function(a) {
    this.m_userData = a
  };
  z.prototype.TestPoint = function(a) {
    return this.m_shape.TestPoint(this.m_body.GetTransform(), a)
  };
  z.prototype.RayCast = function(a, b) {
    return this.m_shape.RayCast(a, b, this.m_body.GetTransform())
  };
  z.prototype.GetMassData = function(a) {
    a === void 0 && (a = null);
    a == null && (a = new l);
    this.m_shape.ComputeMass(a, this.m_density);
    return a
  };
  z.prototype.SetDensity = function(a) {
    a === void 0 && (a = 0);
    this.m_density = a
  };
  z.prototype.GetDensity = function() {
    return this.m_density
  };
  z.prototype.GetFriction = function() {
    return this.m_friction
  };
  z.prototype.SetFriction = function(a) {
    a === void 0 && (a = 0);
    this.m_friction = a
  };
  z.prototype.GetRestitution = function() {
    return this.m_restitution
  };
  z.prototype.SetRestitution = function(a) {
    a === void 0 && (a = 0);
    this.m_restitution = a
  };
  z.prototype.GetAABB = function() {
    return this.m_aabb
  };
  z.prototype.b2Fixture = function() {
    this.m_aabb = new g;
    this.m_shape = this.m_next = this.m_body = this.m_userData = null;
    this.m_restitution = this.m_friction = this.m_density = 0
  };
  z.prototype.Create = function(a, b, d) {
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
  z.prototype.Destroy = function() {
    this.m_shape = null
  };
  z.prototype.CreateProxy = function(a, b) {
    this.m_shape.ComputeAABB(this.m_aabb, b);
    this.m_proxy = a.CreateProxy(this.m_aabb, this)
  };
  z.prototype.DestroyProxy = function(a) {
    if(this.m_proxy != null) {
      a.DestroyProxy(this.m_proxy), this.m_proxy = null
    }
  };
  z.prototype.Synchronize = function(b, d, e) {
    if(this.m_proxy) {
      var f = new g, h = new g;
      this.m_shape.ComputeAABB(f, d);
      this.m_shape.ComputeAABB(h, e);
      this.m_aabb.Combine(f, h);
      d = a.SubtractVV(e.position, d.position);
      b.MoveProxy(this.m_proxy, this.m_aabb, d)
    }
  };
  G.b2FixtureDef = function() {
    this.filter = new s
  };
  G.prototype.b2FixtureDef = function() {
    this.userData = this.shape = null;
    this.friction = 0.2;
    this.density = this.restitution = 0;
    this.filter.categoryBits = 1;
    this.filter.maskBits = 65535;
    this.filter.groupIndex = 0;
    this.isSensor = !1
  };
  I.b2Island = function() {
  };
  I.prototype.b2Island = function() {
    this.m_bodies = [];
    this.m_contacts = [];
    this.m_joints = []
  };
  I.prototype.Initialize = function(a, b, d, e, g) {
    a === void 0 && (a = 0);
    b === void 0 && (b = 0);
    d === void 0 && (d = 0);
    var f = 0;
    this.m_bodyCapacity = a;
    this.m_contactCapacity = b;
    this.m_jointCapacity = d;
    this.m_jointCount = this.m_contactCount = this.m_bodyCount = 0;
    this.m_listener = e;
    this.m_contactSolver = g;
    for(f = this.m_bodies.length;f < a;f++) {
      this.m_bodies[f] = null
    }
    for(f = this.m_contacts.length;f < b;f++) {
      this.m_contacts[f] = null
    }
    for(f = this.m_joints.length;f < d;f++) {
      this.m_joints[f] = null
    }
  };
  I.prototype.Clear = function() {
    this.m_jointCount = this.m_contactCount = this.m_bodyCount = 0
  };
  I.prototype.Solve = function(d, e, g) {
    for(var f = 0, h = 0, j, f = 0;f < this.m_bodyCount;++f) {
      h = this.m_bodies[f], h.GetType() == k.b2_dynamicBody && (h.m_linearVelocity.x += d.dt * (e.x + h.m_invMass * h.m_force.x), h.m_linearVelocity.y += d.dt * (e.y + h.m_invMass * h.m_force.y), h.m_angularVelocity += d.dt * h.m_invI * h.m_torque, h.m_linearVelocity.Multiply(a.Clamp(1 - d.dt * h.m_linearDamping, 0, 1)), h.m_angularVelocity *= a.Clamp(1 - d.dt * h.m_angularDamping, 0, 1))
    }
    this.m_contactSolver.Initialize(d, this.m_contacts, this.m_contactCount);
    e = this.m_contactSolver;
    e.InitVelocityConstraints(d);
    for(f = 0;f < this.m_jointCount;++f) {
      j = this.m_joints[f], j.InitVelocityConstraints(d)
    }
    for(f = 0;f < d.velocityIterations;++f) {
      for(h = 0;h < this.m_jointCount;++h) {
        j = this.m_joints[h], j.SolveVelocityConstraints(d)
      }
      e.SolveVelocityConstraints()
    }
    for(f = 0;f < this.m_jointCount;++f) {
      j = this.m_joints[f], j.FinalizeVelocityConstraints()
    }
    e.FinalizeVelocityConstraints();
    for(f = 0;f < this.m_bodyCount;++f) {
      if(h = this.m_bodies[f], h.GetType() != k.b2_staticBody) {
        var m = d.dt * h.m_linearVelocity.x, u = d.dt * h.m_linearVelocity.y;
        m * m + u * u > b.b2_maxTranslationSquared && (h.m_linearVelocity.Normalize(), h.m_linearVelocity.x *= b.b2_maxTranslation * d.inv_dt, h.m_linearVelocity.y *= b.b2_maxTranslation * d.inv_dt);
        m = d.dt * h.m_angularVelocity;
        if(m * m > b.b2_maxRotationSquared) {
          h.m_angularVelocity = h.m_angularVelocity < 0 ? -b.b2_maxRotation * d.inv_dt : b.b2_maxRotation * d.inv_dt
        }
        h.m_sweep.c0.SetV(h.m_sweep.c);
        h.m_sweep.a0 = h.m_sweep.a;
        h.m_sweep.c.x += d.dt * h.m_linearVelocity.x;
        h.m_sweep.c.y += d.dt * h.m_linearVelocity.y;
        h.m_sweep.a += d.dt * h.m_angularVelocity;
        h.SynchronizeTransform()
      }
    }
    for(f = 0;f < d.positionIterations;++f) {
      m = e.SolvePositionConstraints(b.b2_contactBaumgarte);
      u = !0;
      for(h = 0;h < this.m_jointCount;++h) {
        j = this.m_joints[h], j = j.SolvePositionConstraints(b.b2_contactBaumgarte), u = u && j
      }
      if(m && u) {
        break
      }
    }
    this.Report(e.m_constraints);
    if(g) {
      g = Number.MAX_VALUE;
      e = b.b2_linearSleepTolerance * b.b2_linearSleepTolerance;
      m = b.b2_angularSleepTolerance * b.b2_angularSleepTolerance;
      for(f = 0;f < this.m_bodyCount;++f) {
        if(h = this.m_bodies[f], h.GetType() != k.b2_staticBody) {
          !h.m_allowSleep || h.m_angularVelocity * h.m_angularVelocity > m || a.Dot(h.m_linearVelocity, h.m_linearVelocity) > e ? g = h.m_sleepTime = 0 : (h.m_sleepTime += d.dt, g = a.Min(g, h.m_sleepTime))
        }
      }
      if(g >= b.b2_timeToSleep) {
        for(f = 0;f < this.m_bodyCount;++f) {
          h = this.m_bodies[f], h.SetAwake(!1)
        }
      }
    }
  };
  I.prototype.SolveTOI = function(a) {
    var d = 0, e = 0;
    this.m_contactSolver.Initialize(a, this.m_contacts, this.m_contactCount);
    for(var f = this.m_contactSolver, d = 0;d < this.m_jointCount;++d) {
      this.m_joints[d].InitVelocityConstraints(a)
    }
    for(d = 0;d < a.velocityIterations;++d) {
      f.SolveVelocityConstraints();
      for(e = 0;e < this.m_jointCount;++e) {
        this.m_joints[e].SolveVelocityConstraints(a)
      }
    }
    for(d = 0;d < this.m_bodyCount;++d) {
      if(e = this.m_bodies[d], e.GetType() != k.b2_staticBody) {
        var g = a.dt * e.m_linearVelocity.x, h = a.dt * e.m_linearVelocity.y;
        g * g + h * h > b.b2_maxTranslationSquared && (e.m_linearVelocity.Normalize(), e.m_linearVelocity.x *= b.b2_maxTranslation * a.inv_dt, e.m_linearVelocity.y *= b.b2_maxTranslation * a.inv_dt);
        g = a.dt * e.m_angularVelocity;
        if(g * g > b.b2_maxRotationSquared) {
          e.m_angularVelocity = e.m_angularVelocity < 0 ? -b.b2_maxRotation * a.inv_dt : b.b2_maxRotation * a.inv_dt
        }
        e.m_sweep.c0.SetV(e.m_sweep.c);
        e.m_sweep.a0 = e.m_sweep.a;
        e.m_sweep.c.x += a.dt * e.m_linearVelocity.x;
        e.m_sweep.c.y += a.dt * e.m_linearVelocity.y;
        e.m_sweep.a += a.dt * e.m_angularVelocity;
        e.SynchronizeTransform()
      }
    }
    for(d = 0;d < a.positionIterations;++d) {
      g = f.SolvePositionConstraints(0.75);
      h = !0;
      for(e = 0;e < this.m_jointCount;++e) {
        var m = this.m_joints[e].SolvePositionConstraints(b.b2_contactBaumgarte), h = h && m
      }
      if(g && h) {
        break
      }
    }
    this.Report(f.m_constraints)
  };
  I.prototype.Report = function(a) {
    if(this.m_listener != null) {
      for(var b = 0;b < this.m_contactCount;++b) {
        for(var d = this.m_contacts[b], e = a[b], g = 0;g < e.pointCount;++g) {
          I.s_impulse.normalImpulses[g] = e.points[g].normalImpulse, I.s_impulse.tangentImpulses[g] = e.points[g].tangentImpulse
        }
        this.m_listener.PostSolve(d, I.s_impulse)
      }
    }
  };
  I.prototype.AddBody = function(a) {
    a.m_islandIndex = this.m_bodyCount;
    this.m_bodies[this.m_bodyCount++] = a
  };
  I.prototype.AddContact = function(a) {
    this.m_contacts[this.m_contactCount++] = a
  };
  I.prototype.AddJoint = function(a) {
    this.m_joints[this.m_jointCount++] = a
  };
  Box2D.postDefs.push(function() {
    Box2D.Dynamics.b2Island.s_impulse = new v
  });
  H.b2TimeStep = function() {
  };
  H.prototype.Set = function(a) {
    this.dt = a.dt;
    this.inv_dt = a.inv_dt;
    this.positionIterations = a.positionIterations;
    this.velocityIterations = a.velocityIterations;
    this.warmStarting = a.warmStarting
  }
})();
(function() {
  var a = Box2D.Collision.Shapes.b2CircleShape, e = Box2D.Collision.Shapes.b2EdgeShape, f = Box2D.Collision.Shapes.b2PolygonShape, d = Box2D.Collision.Shapes.b2Shape, b = Box2D.Dynamics.Contacts.b2ContactConstraint, g = Box2D.Dynamics.Contacts.b2ContactResult, j = Box2D.Dynamics.Contacts.b2ContactSolver, h = Box2D.Dynamics.Contacts.b2EdgeAndCircleContact, l = Box2D.Dynamics.Contacts.b2NullContact, k = Box2D.Dynamics.Contacts.b2PolyAndCircleContact, n = Box2D.Dynamics.Contacts.b2PolyAndEdgeContact, 
  q = Box2D.Dynamics.Contacts.b2PolygonContact, v = Box2D.Dynamics.Contacts.b2PositionSolverManifold, r = Box2D.Dynamics.b2TimeStep, y = Box2D.Common.b2Settings, B = Box2D.Common.Math.b2Math, s = Box2D.Common.Math.b2Vec2, z = Box2D.Collision.b2Collision, G = Box2D.Collision.b2ContactID, I = Box2D.Collision.b2Manifold, H = Box2D.Collision.b2WorldManifold;
  Box2D.Dynamics.Contacts.b2ContactRegister.b2ContactRegister = function() {
  };
  g.b2ContactResult = function() {
    this.position = new s;
    this.normal = new s;
    this.id = new G
  };
  j.b2ContactSolver = function() {
    this.m_step = new r;
    this.m_constraints = []
  };
  j.prototype.b2ContactSolver = function() {
  };
  j.prototype.Initialize = function(a, d, e) {
    e === void 0 && (e = 0);
    var g;
    this.m_step.Set(a);
    a = 0;
    for(this.m_constraintCount = e;this.m_constraints.length < this.m_constraintCount;) {
      this.m_constraints[this.m_constraints.length] = new b
    }
    for(a = 0;a < e;++a) {
      g = d[a];
      var f = g.m_fixtureA, h = g.m_fixtureB, k = f.m_shape.m_radius, m = h.m_shape.m_radius, u = f.m_body, p = h.m_body, C = g.GetManifold(), K = y.b2MixFriction(f.GetFriction(), h.GetFriction()), M = y.b2MixRestitution(f.GetRestitution(), h.GetRestitution()), D = u.m_linearVelocity.x, A = u.m_linearVelocity.y, w = p.m_linearVelocity.x, E = p.m_linearVelocity.y, r = u.m_angularVelocity, q = p.m_angularVelocity;
      y.b2Assert(C.m_pointCount > 0);
      j.s_worldManifold.Initialize(C, u.m_xf, k, p.m_xf, m);
      h = j.s_worldManifold.m_normal.x;
      g = j.s_worldManifold.m_normal.y;
      f = this.m_constraints[a];
      f.bodyA = u;
      f.bodyB = p;
      f.manifold = C;
      f.normal.x = h;
      f.normal.y = g;
      f.pointCount = C.m_pointCount;
      f.friction = K;
      f.restitution = M;
      f.localPlaneNormal.x = C.m_localPlaneNormal.x;
      f.localPlaneNormal.y = C.m_localPlaneNormal.y;
      f.localPoint.x = C.m_localPoint.x;
      f.localPoint.y = C.m_localPoint.y;
      f.radius = k + m;
      f.type = C.m_type;
      for(k = 0;k < f.pointCount;++k) {
        K = C.m_points[k];
        m = f.points[k];
        m.normalImpulse = K.m_normalImpulse;
        m.tangentImpulse = K.m_tangentImpulse;
        m.localPoint.SetV(K.m_localPoint);
        var K = m.rA.x = j.s_worldManifold.m_points[k].x - u.m_sweep.c.x, M = m.rA.y = j.s_worldManifold.m_points[k].y - u.m_sweep.c.y, l = m.rB.x = j.s_worldManifold.m_points[k].x - p.m_sweep.c.x, n = m.rB.y = j.s_worldManifold.m_points[k].y - p.m_sweep.c.y, v = K * g - M * h, s = l * g - n * h;
        v *= v;
        s *= s;
        m.normalMass = 1 / (u.m_invMass + p.m_invMass + u.m_invI * v + p.m_invI * s);
        var B = u.m_mass * u.m_invMass + p.m_mass * p.m_invMass;
        B += u.m_mass * u.m_invI * v + p.m_mass * p.m_invI * s;
        m.equalizedMass = 1 / B;
        s = g;
        B = -h;
        v = K * B - M * s;
        s = l * B - n * s;
        v *= v;
        s *= s;
        m.tangentMass = 1 / (u.m_invMass + p.m_invMass + u.m_invI * v + p.m_invI * s);
        m.velocityBias = 0;
        K = f.normal.x * (w + -q * n - D - -r * M) + f.normal.y * (E + q * l - A - r * K);
        K < -y.b2_velocityThreshold && (m.velocityBias += -f.restitution * K)
      }
      if(f.pointCount == 2) {
        E = f.points[0], w = f.points[1], C = u.m_invMass, u = u.m_invI, D = p.m_invMass, p = p.m_invI, A = E.rA.x * g - E.rA.y * h, E = E.rB.x * g - E.rB.y * h, r = w.rA.x * g - w.rA.y * h, w = w.rB.x * g - w.rB.y * h, h = C + D + u * A * A + p * E * E, g = C + D + u * r * r + p * w * w, p = C + D + u * A * r + p * E * w, h * h < 100 * (h * g - p * p) ? (f.K.col1.Set(h, p), f.K.col2.Set(p, g), f.K.GetInverse(f.normalMass)) : f.pointCount = 1
      }
    }
  };
  j.prototype.InitVelocityConstraints = function(a) {
    for(var b = 0;b < this.m_constraintCount;++b) {
      var d = this.m_constraints[b], e = d.bodyA, f = d.bodyB, g = e.m_invMass, h = e.m_invI, m = f.m_invMass, u = f.m_invI, p = d.normal.x, C = d.normal.y, j = C, k = -p, D = 0, A = 0;
      if(a.warmStarting) {
        A = d.pointCount;
        for(D = 0;D < A;++D) {
          var w = d.points[D];
          w.normalImpulse *= a.dtRatio;
          w.tangentImpulse *= a.dtRatio;
          var E = w.normalImpulse * p + w.tangentImpulse * j, r = w.normalImpulse * C + w.tangentImpulse * k;
          e.m_angularVelocity -= h * (w.rA.x * r - w.rA.y * E);
          e.m_linearVelocity.x -= g * E;
          e.m_linearVelocity.y -= g * r;
          f.m_angularVelocity += u * (w.rB.x * r - w.rB.y * E);
          f.m_linearVelocity.x += m * E;
          f.m_linearVelocity.y += m * r
        }
      }else {
        A = d.pointCount;
        for(D = 0;D < A;++D) {
          e = d.points[D], e.normalImpulse = 0, e.tangentImpulse = 0
        }
      }
    }
  };
  j.prototype._SVCA = function(a, b, d, e, f, g, h, m, u, p, C, j, k, D) {
    var b = a - b, A = d - e, e = b * f;
    b *= g;
    f *= A;
    g *= A;
    k.x -= h * (e + f);
    k.y -= h * (b + g);
    h = -u * (C.rA.x * b - C.rA.y * e + j.rA.x * g - j.rA.y * f);
    D.x += m * (e + f);
    D.y += m * (b + g);
    m = p * (C.rB.x * b - C.rB.y * e + j.rB.x * g - j.rB.y * f);
    C.normalImpulse = a;
    j.normalImpulse = d;
    return{wad:h, wbd:m}
  };
  j.prototype.SolveVelocityConstraints_NEW = function() {
    for(var a = 0, b = 0, d = b = 0, e = d = 0, f = b = 0;f < this.m_constraintCount;++f) {
      for(var a = this.m_constraints[f], g = a.bodyA, h = a.bodyB, m = g.m_angularVelocity, u = h.m_angularVelocity, p = g.m_linearVelocity, C = h.m_linearVelocity, j = g.m_invMass, k = g.m_invI, D = h.m_invMass, A = h.m_invI, w = a.normal.x, E = a.normal.y, r = E, q = -w, l = a.friction, v = 0;v < a.pointCount;v++) {
        var n = a.points[v], b = C.x - u * n.rB.y - p.x + m * n.rA.y, d = C.y + u * n.rB.x - p.y - m * n.rA.x, b = b * r + d * q, b = n.tangentMass * -b, d = l * n.normalImpulse, d = B.Clamp(n.tangentImpulse + b, -d, d), b = d - n.tangentImpulse, e = b * r;
        b *= q;
        p.x -= j * e;
        p.y -= j * b;
        m -= k * (n.rA.x * b - n.rA.y * e);
        C.x += D * e;
        C.y += D * b;
        u += A * (n.rB.x * b - n.rB.y * e);
        n.tangentImpulse = d
      }
      a.pointCount == 1 ? (n = a.points[0], b = C.x - u * n.rB.y - p.x + m * n.rA.y, d = C.y + u * n.rB.x - p.y - m * n.rA.x, a = b * w + d * E, b = -n.normalMass * (a - n.velocityBias), d = n.normalImpulse + b, d < 0 && (d = 0), b = d - n.normalImpulse, e = b * w, b *= E, p.x -= j * e, p.y -= j * b, m -= k * (n.rA.x * b - n.rA.y * e), C.x += D * e, C.y += D * b, u += A * (n.rB.x * b - n.rB.y * e), n.normalImpulse = d) : (n = a.points[0], r = a.points[1], q = n.normalImpulse, l = r.normalImpulse, 
      b = C.x - p.x, d = C.y - p.y, v = (b - u * n.rB.y + m * n.rA.y) * w + (d + u * n.rB.x - m * n.rA.x) * E - n.velocityBias - (a.K.col1.x * q + a.K.col2.x * l), b = (b - u * r.rB.y + m * r.rA.y) * w + (d + u * r.rB.x - m * r.rA.x) * E - r.velocityBias - (a.K.col1.y * q + a.K.col2.y * l), d = -(a.normalMass.col1.x * v + a.normalMass.col2.x * b), e = -1, d >= 0 && (e = -(a.normalMass.col1.y * v + a.normalMass.col2.y * b)), e >= 0 ? (p = this._SVCA(d, q, e, l, w, E, j, D, k, A, n, r, p, C), m += 
      p.wad, u += p.wbd) : (d = -n.normalMass * v, e = 0, d >= 0 && a.K.col1.y * d + b >= 0 ? (p = this._SVCA(d, q, e, l, w, E, j, D, k, A, n, r, p, C), m += p.wad, u += p.wbd) : (d = 0, e = -r.normalMass * b, e >= 0 && a.K.col2.x * e + v >= 0 ? (p = this._SVCA(d, q, e, l, w, E, j, D, k, A, n, r, p, C), m += p.wad, u += p.wbd) : (e = 0, v >= 0 && b >= 0 && (p = this._SVCA(d, q, e, l, w, E, j, D, k, A, n, r, p, C), m += p.wad, u += p.wbd)))));
      g.m_angularVelocity = m;
      h.m_angularVelocity = u
    }
  };
  j.prototype.SolveVelocityConstraints = function() {
    for(var a = 0, b, d = 0, e = 0, f = 0, g = e = e = d = d = 0, h = d = d = 0, m = d = f = 0, u = 0, p, j = 0;j < this.m_constraintCount;++j) {
      var f = this.m_constraints[j], k = f.bodyA, r = f.bodyB, D = k.m_angularVelocity, A = r.m_angularVelocity, w = k.m_linearVelocity, E = r.m_linearVelocity, q = k.m_invMass, n = k.m_invI, l = r.m_invMass, v = r.m_invI, m = f.normal.x, s = u = f.normal.y;
      p = -m;
      h = f.friction;
      for(a = 0;a < f.pointCount;a++) {
        b = f.points[a], d = E.x - A * b.rB.y - w.x + D * b.rA.y, e = E.y + A * b.rB.x - w.y - D * b.rA.x, d = d * s + e * p, d = b.tangentMass * -d, e = h * b.normalImpulse, e = B.Clamp(b.tangentImpulse + d, -e, e), d = e - b.tangentImpulse, g = d * s, d *= p, w.x -= q * g, w.y -= q * d, D -= n * (b.rA.x * d - b.rA.y * g), E.x += l * g, E.y += l * d, A += v * (b.rB.x * d - b.rB.y * g), b.tangentImpulse = e
      }
      if(f.pointCount == 1) {
        b = f.points[0], d = E.x + -A * b.rB.y - w.x - -D * b.rA.y, e = E.y + A * b.rB.x - w.y - D * b.rA.x, f = d * m + e * u, d = -b.normalMass * (f - b.velocityBias), e = b.normalImpulse + d, e = e > 0 ? e : 0, d = e - b.normalImpulse, g = d * m, d *= u, w.x -= q * g, w.y -= q * d, D -= n * (b.rA.x * d - b.rA.y * g), E.x += l * g, E.y += l * d, A += v * (b.rB.x * d - b.rB.y * g), b.normalImpulse = e
      }else {
        b = f.points[0];
        var a = f.points[1], d = b.normalImpulse, h = a.normalImpulse, y = (E.x - A * b.rB.y - w.x + D * b.rA.y) * m + (E.y + A * b.rB.x - w.y - D * b.rA.x) * u, z = (E.x - A * a.rB.y - w.x + D * a.rA.y) * m + (E.y + A * a.rB.x - w.y - D * a.rA.x) * u, e = y - b.velocityBias, g = z - a.velocityBias;
        p = f.K;
        e -= p.col1.x * d + p.col2.x * h;
        for(g -= p.col1.y * d + p.col2.y * h;;) {
          p = f.normalMass;
          s = -(p.col1.x * e + p.col2.x * g);
          p = -(p.col1.y * e + p.col2.y * g);
          if(s >= 0 && p >= 0) {
            d = s - d;
            h = p - h;
            f = d * m;
            d *= u;
            m *= h;
            u *= h;
            w.x -= q * (f + m);
            w.y -= q * (d + u);
            D -= n * (b.rA.x * d - b.rA.y * f + a.rA.x * u - a.rA.y * m);
            E.x += l * (f + m);
            E.y += l * (d + u);
            A += v * (b.rB.x * d - b.rB.y * f + a.rB.x * u - a.rB.y * m);
            b.normalImpulse = s;
            a.normalImpulse = p;
            break
          }
          s = -b.normalMass * e;
          p = 0;
          z = f.K.col1.y * s + g;
          if(s >= 0 && z >= 0) {
            d = s - d;
            h = p - h;
            f = d * m;
            d *= u;
            m *= h;
            u *= h;
            w.x -= q * (f + m);
            w.y -= q * (d + u);
            D -= n * (b.rA.x * d - b.rA.y * f + a.rA.x * u - a.rA.y * m);
            E.x += l * (f + m);
            E.y += l * (d + u);
            A += v * (b.rB.x * d - b.rB.y * f + a.rB.x * u - a.rB.y * m);
            b.normalImpulse = s;
            a.normalImpulse = p;
            break
          }
          s = 0;
          p = -a.normalMass * g;
          y = f.K.col2.x * p + e;
          if(p >= 0 && y >= 0) {
            d = s - d;
            h = p - h;
            f = d * m;
            d *= u;
            m *= h;
            u *= h;
            w.x -= q * (f + m);
            w.y -= q * (d + u);
            D -= n * (b.rA.x * d - b.rA.y * f + a.rA.x * u - a.rA.y * m);
            E.x += l * (f + m);
            E.y += l * (d + u);
            A += v * (b.rB.x * d - b.rB.y * f + a.rB.x * u - a.rB.y * m);
            b.normalImpulse = s;
            a.normalImpulse = p;
            break
          }
          p = s = 0;
          y = e;
          z = g;
          if(y >= 0 && z >= 0) {
            d = s - d;
            h = p - h;
            f = d * m;
            d *= u;
            m *= h;
            u *= h;
            w.x -= q * (f + m);
            w.y -= q * (d + u);
            D -= n * (b.rA.x * d - b.rA.y * f + a.rA.x * u - a.rA.y * m);
            E.x += l * (f + m);
            E.y += l * (d + u);
            A += v * (b.rB.x * d - b.rB.y * f + a.rB.x * u - a.rB.y * m);
            b.normalImpulse = s;
            a.normalImpulse = p;
            break
          }
          break
        }
      }
      k.m_angularVelocity = D;
      r.m_angularVelocity = A
    }
  };
  j.prototype.FinalizeVelocityConstraints = function() {
    for(var a = 0;a < this.m_constraintCount;++a) {
      for(var b = this.m_constraints[a], d = b.manifold, e = 0;e < b.pointCount;++e) {
        var f = d.m_points[e], g = b.points[e];
        f.m_normalImpulse = g.normalImpulse;
        f.m_tangentImpulse = g.tangentImpulse
      }
    }
  };
  j.prototype.SolvePositionConstraints = function(a) {
    a === void 0 && (a = 0);
    for(var b = 0, d = 0;d < this.m_constraintCount;d++) {
      var e = this.m_constraints[d], f = e.bodyA, g = e.bodyB, h = f.m_mass * f.m_invMass, m = f.m_mass * f.m_invI, u = g.m_mass * g.m_invMass, p = g.m_mass * g.m_invI;
      j.s_psm.Initialize(e);
      for(var C = j.s_psm.m_normal, k = 0;k < e.pointCount;k++) {
        var r = e.points[k], D = j.s_psm.m_points[k], A = j.s_psm.m_separations[k], w = D.x - f.m_sweep.c.x, E = D.y - f.m_sweep.c.y, q = D.x - g.m_sweep.c.x, D = D.y - g.m_sweep.c.y, b = b < A ? b : A, A = B.Clamp(a * (A + y.b2_linearSlop), -y.b2_maxLinearCorrection, 0);
        A *= -r.equalizedMass;
        r = A * C.x;
        A *= C.y;
        f.m_sweep.c.x -= h * r;
        f.m_sweep.c.y -= h * A;
        f.m_sweep.a -= m * (w * A - E * r);
        f.SynchronizeTransform();
        g.m_sweep.c.x += u * r;
        g.m_sweep.c.y += u * A;
        g.m_sweep.a += p * (q * A - D * r);
        g.SynchronizeTransform()
      }
    }
    return b > -1.5 * y.b2_linearSlop
  };
  j.prototype.SolvePositionConstraints_NEW = function(a) {
    a === void 0 && (a = 0);
    for(var b = 0, d = 0;d < this.m_constraintCount;d++) {
      var e = this.m_constraints[d], f = e.bodyA, g = e.bodyB, h = f.m_mass * f.m_invMass, m = f.m_mass * f.m_invI, u = g.m_mass * g.m_invMass, p = g.m_mass * g.m_invI;
      j.s_psm.Initialize(e);
      for(var C = j.s_psm.m_normal, k = 0;k < e.pointCount;k++) {
        var r = e.points[k], D = j.s_psm.m_points[k], A = j.s_psm.m_separations[k], w = D.x - f.m_sweep.c.x, q = D.y - f.m_sweep.c.y, n = D.x - g.m_sweep.c.x, D = D.y - g.m_sweep.c.y;
        A < b && (b = A);
        a != 0 && B.Clamp(a * (A + y.b2_linearSlop), -y.b2_maxLinearCorrection, 0);
        A = -r.equalizedMass * 0;
        r = A * C.x;
        A *= C.y;
        f.m_sweep.c.x -= h * r;
        f.m_sweep.c.y -= h * A;
        f.m_sweep.a -= m * (w * A - q * r);
        f.SynchronizeTransform();
        g.m_sweep.c.x += u * r;
        g.m_sweep.c.y += u * A;
        g.m_sweep.a += p * (n * A - D * r);
        g.SynchronizeTransform()
      }
    }
    return b > -1.5 * y.b2_linearSlop
  };
  Box2D.postDefs.push(function() {
    Box2D.Dynamics.Contacts.b2ContactSolver.s_worldManifold = new H;
    Box2D.Dynamics.Contacts.b2ContactSolver.s_psm = new v
  });
  Box2D.inherit(h, Box2D.Dynamics.Contacts.b2Contact);
  h.prototype.__super = Box2D.Dynamics.Contacts.b2Contact.prototype;
  h.b2EdgeAndCircleContact = function() {
    Box2D.Dynamics.Contacts.b2Contact.apply(this, arguments)
  };
  h.Create = function() {
    return new h
  };
  h.Destroy = function() {
  };
  h.prototype.Reset = function(a, b) {
    this.__super.Reset.call(this, a, b)
  };
  h.prototype.Evaluate = function() {
    var b = this.m_fixtureA.GetBody(), d = this.m_fixtureB.GetBody();
    this.b2CollideEdgeAndCircle(this.m_manifold, this.m_fixtureA.GetShape() instanceof e ? this.m_fixtureA.GetShape() : null, b.m_xf, this.m_fixtureB.GetShape() instanceof a ? this.m_fixtureB.GetShape() : null, d.m_xf)
  };
  h.prototype.b2CollideEdgeAndCircle = function() {
  };
  Box2D.inherit(l, Box2D.Dynamics.Contacts.b2Contact);
  l.prototype.__super = Box2D.Dynamics.Contacts.b2Contact.prototype;
  l.b2NullContact = function() {
    Box2D.Dynamics.Contacts.b2Contact.apply(this, arguments)
  };
  l.prototype.b2NullContact = function() {
    this.__super.b2Contact.call(this)
  };
  l.prototype.Evaluate = function() {
  };
  Box2D.inherit(k, Box2D.Dynamics.Contacts.b2Contact);
  k.prototype.__super = Box2D.Dynamics.Contacts.b2Contact.prototype;
  k.b2PolyAndCircleContact = function() {
    Box2D.Dynamics.Contacts.b2Contact.apply(this, arguments)
  };
  k.Create = function() {
    return new k
  };
  k.Destroy = function() {
  };
  k.prototype.Reset = function(a, b) {
    this.__super.Reset.call(this, a, b);
    y.b2Assert(a.GetType() == d.e_polygonShape);
    y.b2Assert(b.GetType() == d.e_circleShape)
  };
  k.prototype.Evaluate = function() {
    var b = this.m_fixtureA.m_body, d = this.m_fixtureB.m_body;
    z.CollidePolygonAndCircle(this.m_manifold, this.m_fixtureA.GetShape() instanceof f ? this.m_fixtureA.GetShape() : null, b.m_xf, this.m_fixtureB.GetShape() instanceof a ? this.m_fixtureB.GetShape() : null, d.m_xf)
  };
  Box2D.inherit(n, Box2D.Dynamics.Contacts.b2Contact);
  n.prototype.__super = Box2D.Dynamics.Contacts.b2Contact.prototype;
  n.b2PolyAndEdgeContact = function() {
    Box2D.Dynamics.Contacts.b2Contact.apply(this, arguments)
  };
  n.Create = function() {
    return new n
  };
  n.Destroy = function() {
  };
  n.prototype.Reset = function(a, b) {
    this.__super.Reset.call(this, a, b);
    y.b2Assert(a.GetType() == d.e_polygonShape);
    y.b2Assert(b.GetType() == d.e_edgeShape)
  };
  n.prototype.Evaluate = function() {
    var a = this.m_fixtureA.GetBody(), b = this.m_fixtureB.GetBody();
    this.b2CollidePolyAndEdge(this.m_manifold, this.m_fixtureA.GetShape() instanceof f ? this.m_fixtureA.GetShape() : null, a.m_xf, this.m_fixtureB.GetShape() instanceof e ? this.m_fixtureB.GetShape() : null, b.m_xf)
  };
  n.prototype.b2CollidePolyAndEdge = function() {
  };
  Box2D.inherit(q, Box2D.Dynamics.Contacts.b2Contact);
  q.prototype.__super = Box2D.Dynamics.Contacts.b2Contact.prototype;
  q.b2PolygonContact = function() {
    Box2D.Dynamics.Contacts.b2Contact.apply(this, arguments)
  };
  q.Create = function() {
    return new q
  };
  q.Destroy = function() {
  };
  q.prototype.Reset = function(a, b) {
    this.__super.Reset.call(this, a, b)
  };
  q.prototype.Evaluate = function() {
    var a = this.m_fixtureA.GetBody(), b = this.m_fixtureB.GetBody();
    z.CollidePolygons(this.m_manifold, this.m_fixtureA.GetShape() instanceof f ? this.m_fixtureA.GetShape() : null, a.m_xf, this.m_fixtureB.GetShape() instanceof f ? this.m_fixtureB.GetShape() : null, b.m_xf)
  };
  v.b2PositionSolverManifold = function() {
  };
  v.prototype.b2PositionSolverManifold = function() {
    this.m_normal = new s;
    this.m_separations = new Box2D.NVector(y.b2_maxManifoldPoints);
    this.m_points = Array(y.b2_maxManifoldPoints);
    for(var a = 0;a < y.b2_maxManifoldPoints;a++) {
      this.m_points[a] = new s
    }
  };
  v.prototype.Initialize = function(a) {
    y.b2Assert(a.pointCount > 0);
    var b = 0, d = 0, e = 0, f = 0, g = 0;
    switch(a.type) {
      case I.e_circles:
        var h = a.bodyA.m_xf.R, e = a.localPoint, b = a.bodyA.m_xf.position.x + (h.col1.x * e.x + h.col2.x * e.y), d = a.bodyA.m_xf.position.y + (h.col1.y * e.x + h.col2.y * e.y), h = a.bodyB.m_xf.R, e = a.points[0].localPoint, f = a.bodyB.m_xf.position.x + (h.col1.x * e.x + h.col2.x * e.y), h = a.bodyB.m_xf.position.y + (h.col1.y * e.x + h.col2.y * e.y), e = f - b, g = h - d, m = e * e + g * g;
        m > Box2D.MIN_VALUE_SQUARED ? (m = Math.sqrt(m), this.m_normal.x = e / m, this.m_normal.y = g / m) : (this.m_normal.x = 1, this.m_normal.y = 0);
        this.m_points[0].x = 0.5 * (b + f);
        this.m_points[0].y = 0.5 * (d + h);
        this.m_separations[0] = e * this.m_normal.x + g * this.m_normal.y - a.radius;
        break;
      case I.e_faceA:
        h = a.bodyA.m_xf.R;
        e = a.localPlaneNormal;
        this.m_normal.x = h.col1.x * e.x + h.col2.x * e.y;
        this.m_normal.y = h.col1.y * e.x + h.col2.y * e.y;
        h = a.bodyA.m_xf.R;
        e = a.localPoint;
        f = a.bodyA.m_xf.position.x + (h.col1.x * e.x + h.col2.x * e.y);
        g = a.bodyA.m_xf.position.y + (h.col1.y * e.x + h.col2.y * e.y);
        h = a.bodyB.m_xf.R;
        for(b = 0;b < a.pointCount;++b) {
          e = a.points[b].localPoint, d = a.bodyB.m_xf.position.x + (h.col1.x * e.x + h.col2.x * e.y), e = a.bodyB.m_xf.position.y + (h.col1.y * e.x + h.col2.y * e.y), this.m_separations[b] = (d - f) * this.m_normal.x + (e - g) * this.m_normal.y - a.radius, this.m_points[b].x = d, this.m_points[b].y = e
        }
        break;
      case I.e_faceB:
        h = a.bodyB.m_xf.R;
        e = a.localPlaneNormal;
        this.m_normal.x = h.col1.x * e.x + h.col2.x * e.y;
        this.m_normal.y = h.col1.y * e.x + h.col2.y * e.y;
        h = a.bodyB.m_xf.R;
        e = a.localPoint;
        f = a.bodyB.m_xf.position.x + (h.col1.x * e.x + h.col2.x * e.y);
        g = a.bodyB.m_xf.position.y + (h.col1.y * e.x + h.col2.y * e.y);
        h = a.bodyA.m_xf.R;
        for(b = 0;b < a.pointCount;++b) {
          e = a.points[b].localPoint, d = a.bodyA.m_xf.position.x + (h.col1.x * e.x + h.col2.x * e.y), e = a.bodyA.m_xf.position.y + (h.col1.y * e.x + h.col2.y * e.y), this.m_separations[b] = (d - f) * this.m_normal.x + (e - g) * this.m_normal.y - a.radius, this.m_points[b].Set(d, e)
        }
        this.m_normal.x *= -1;
        this.m_normal.y *= -1
    }
  };
  Box2D.postDefs.push(function() {
    Box2D.Dynamics.Contacts.b2PositionSolverManifold.circlePointA = new s;
    Box2D.Dynamics.Contacts.b2PositionSolverManifold.circlePointB = new s
  })
})();
(function() {
  var a = Box2D.Common.Math.b2Mat22, e = Box2D.Common.Math.b2Math, f = Box2D.Common.Math.b2Vec2, d = Box2D.Common.b2Color, b = Box2D.Dynamics.Controllers.b2BuoyancyController, g = Box2D.Dynamics.Controllers.b2ConstantAccelController, j = Box2D.Dynamics.Controllers.b2ConstantForceController, h = Box2D.Dynamics.Controllers.b2Controller, l = Box2D.Dynamics.Controllers.b2ControllerEdge, k = Box2D.Dynamics.Controllers.b2GravityController, n = Box2D.Dynamics.Controllers.b2TensorDampingController;
  Box2D.inherit(b, Box2D.Dynamics.Controllers.b2Controller);
  b.prototype.__super = Box2D.Dynamics.Controllers.b2Controller.prototype;
  b.b2BuoyancyController = function() {
    Box2D.Dynamics.Controllers.b2Controller.b2Controller.apply(this, arguments);
    this.normal = new f(0, -1);
    this.density = this.offset = 0;
    this.velocity = new f(0, 0);
    this.linearDrag = 2;
    this.angularDrag = 1;
    this.useDensity = !1;
    this.useWorldGravity = !0;
    this.gravity = null
  };
  b.prototype.Step = function() {
    if(this.m_bodyList) {
      if(this.useWorldGravity) {
        this.gravity = this.GetWorld().GetGravity().Copy()
      }
      for(var a = this.m_bodyList;a;a = a.nextBody) {
        var b = a.body;
        if(b.IsAwake() != !1) {
          for(var d = new f, e = new f, g = 0, h = 0, j = b.GetFixtureList();j;j = j.GetNext()) {
            var k = new f, n = j.GetShape().ComputeSubmergedArea(this.normal, this.offset, b.GetTransform(), k);
            g += n;
            d.x += n * k.x;
            d.y += n * k.y;
            var l = 0, l = 1;
            h += n * l;
            e.x += n * k.x * l;
            e.y += n * k.y * l
          }
          d.x /= g;
          d.y /= g;
          e.x /= h;
          e.y /= h;
          g < Number.MIN_VALUE || (h = this.gravity.GetNegative(), h.Multiply(this.density * g), b.ApplyForce(h, e), e = b.GetLinearVelocityFromWorldPoint(d), e.Subtract(this.velocity), e.Multiply(-this.linearDrag * g), b.ApplyForce(e, d), b.ApplyTorque(-b.GetInertia() / b.GetMass() * g * b.GetAngularVelocity() * this.angularDrag))
        }
      }
    }
  };
  b.prototype.Draw = function(a) {
    var b = new f, e = new f;
    b.x = this.normal.x * this.offset + this.normal.y * 1E3;
    b.y = this.normal.y * this.offset - this.normal.x * 1E3;
    e.x = this.normal.x * this.offset - this.normal.y * 1E3;
    e.y = this.normal.y * this.offset + this.normal.x * 1E3;
    var g = new d(0, 0, 1);
    a.DrawSegment(b, e, g)
  };
  Box2D.inherit(g, Box2D.Dynamics.Controllers.b2Controller);
  g.prototype.__super = Box2D.Dynamics.Controllers.b2Controller.prototype;
  g.b2ConstantAccelController = function() {
    Box2D.Dynamics.Controllers.b2Controller.b2Controller.apply(this, arguments);
    this.A = new f(0, 0)
  };
  g.prototype.Step = function(a) {
    for(var a = new f(this.A.x * a.dt, this.A.y * a.dt), b = this.m_bodyList;b;b = b.nextBody) {
      var d = b.body;
      d.IsAwake() && d.SetLinearVelocity(new f(d.GetLinearVelocity().x + a.x, d.GetLinearVelocity().y + a.y))
    }
  };
  Box2D.inherit(j, Box2D.Dynamics.Controllers.b2Controller);
  j.prototype.__super = Box2D.Dynamics.Controllers.b2Controller.prototype;
  j.b2ConstantForceController = function() {
    Box2D.Dynamics.Controllers.b2Controller.b2Controller.apply(this, arguments);
    this.F = new f(0, 0)
  };
  j.prototype.Step = function() {
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
    var b = new l;
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
  l.b2ControllerEdge = function() {
  };
  Box2D.inherit(k, Box2D.Dynamics.Controllers.b2Controller);
  k.prototype.__super = Box2D.Dynamics.Controllers.b2Controller.prototype;
  k.b2GravityController = function() {
    Box2D.Dynamics.Controllers.b2Controller.b2Controller.apply(this, arguments);
    this.G = 1;
    this.invSqr = !0
  };
  k.prototype.Step = function() {
    var a = null, b = null, d = null, e = 0, g = null, h = null, j = null, k = 0, n = 0, l = 0, k = null;
    if(this.invSqr) {
      for(a = this.m_bodyList;a;a = a.nextBody) {
        b = a.body;
        d = b.GetWorldCenter();
        e = b.GetMass();
        for(g = this.m_bodyList;g != a;g = g.nextBody) {
          h = g.body, j = h.GetWorldCenter(), k = j.x - d.x, n = j.y - d.y, l = k * k + n * n, l < Number.MIN_VALUE || (k = new f(k, n), k.Multiply(this.G / l / Math.sqrt(l) * e * h.GetMass()), b.IsAwake() && b.ApplyForce(k, d), k.Multiply(-1), h.IsAwake() && h.ApplyForce(k, j))
        }
      }
    }else {
      for(a = this.m_bodyList;a;a = a.nextBody) {
        b = a.body;
        d = b.GetWorldCenter();
        e = b.GetMass();
        for(g = this.m_bodyList;g != a;g = g.nextBody) {
          h = g.body, j = h.GetWorldCenter(), k = j.x - d.x, n = j.y - d.y, l = k * k + n * n, l < Number.MIN_VALUE || (k = new f(k, n), k.Multiply(this.G / l * e * h.GetMass()), b.IsAwake() && b.ApplyForce(k, d), k.Multiply(-1), h.IsAwake() && h.ApplyForce(k, j))
        }
      }
    }
  };
  Box2D.inherit(n, Box2D.Dynamics.Controllers.b2Controller);
  n.prototype.__super = Box2D.Dynamics.Controllers.b2Controller.prototype;
  n.b2TensorDampingController = function() {
    Box2D.Dynamics.Controllers.b2Controller.b2Controller.apply(this, arguments);
    this.T = new a;
    this.maxTimestep = 0
  };
  n.prototype.SetAxisAligned = function(a, b) {
    a === void 0 && (a = 0);
    b === void 0 && (b = 0);
    this.T.col1.x = -a;
    this.T.col1.y = 0;
    this.T.col2.x = 0;
    this.T.col2.y = -b;
    this.maxTimestep = a > 0 || b > 0 ? 1 / Math.max(a, b) : 0
  };
  n.prototype.Step = function(a) {
    a = a.dt;
    if(!(a <= Number.MIN_VALUE)) {
      if(a > this.maxTimestep && this.maxTimestep > 0) {
        a = this.maxTimestep
      }
      for(var b = this.m_bodyList;b;b = b.nextBody) {
        var d = b.body;
        if(d.IsAwake()) {
          var g = d.GetWorldVector(e.MulMV(this.T, d.GetLocalVector(d.GetLinearVelocity())));
          d.SetLinearVelocity(new f(d.GetLinearVelocity().x + g.x * a, d.GetLinearVelocity().y + g.y * a))
        }
      }
    }
  }
})();
(function() {
  var a = Box2D.Common.b2Settings, e = Box2D.Common.Math.b2Mat22, f = Box2D.Common.Math.b2Mat33, d = Box2D.Common.Math.b2Math, b = Box2D.Common.Math.b2Vec2, g = Box2D.Common.Math.b2Vec3, j = Box2D.Dynamics.Joints.b2DistanceJoint, h = Box2D.Dynamics.Joints.b2DistanceJointDef, l = Box2D.Dynamics.Joints.b2FrictionJoint, k = Box2D.Dynamics.Joints.b2FrictionJointDef, n = Box2D.Dynamics.Joints.b2GearJoint, q = Box2D.Dynamics.Joints.b2GearJointDef, v = Box2D.Dynamics.Joints.b2Jacobian, r = Box2D.Dynamics.Joints.b2Joint, 
  y = Box2D.Dynamics.Joints.b2JointDef, B = Box2D.Dynamics.Joints.b2JointEdge, s = Box2D.Dynamics.Joints.b2LineJoint, z = Box2D.Dynamics.Joints.b2LineJointDef, G = Box2D.Dynamics.Joints.b2MouseJoint, I = Box2D.Dynamics.Joints.b2MouseJointDef, H = Box2D.Dynamics.Joints.b2PrismaticJoint, J = Box2D.Dynamics.Joints.b2PrismaticJointDef, o = Box2D.Dynamics.Joints.b2PulleyJoint, x = Box2D.Dynamics.Joints.b2PulleyJointDef, t = Box2D.Dynamics.Joints.b2RevoluteJoint, F = Box2D.Dynamics.Joints.b2RevoluteJointDef, 
  L = Box2D.Dynamics.Joints.b2WeldJoint, N = Box2D.Dynamics.Joints.b2WeldJointDef;
  Box2D.inherit(j, Box2D.Dynamics.Joints.b2Joint);
  j.prototype.__super = Box2D.Dynamics.Joints.b2Joint.prototype;
  j.b2DistanceJoint = function() {
    Box2D.Dynamics.Joints.b2Joint.b2Joint.apply(this, arguments);
    this.m_localAnchor1 = new b;
    this.m_localAnchor2 = new b;
    this.m_u = new b
  };
  j.prototype.GetAnchorA = function() {
    return this.m_bodyA.GetWorldPoint(this.m_localAnchor1)
  };
  j.prototype.GetAnchorB = function() {
    return this.m_bodyB.GetWorldPoint(this.m_localAnchor2)
  };
  j.prototype.GetReactionForce = function(a) {
    a === void 0 && (a = 0);
    return new b(a * this.m_impulse * this.m_u.x, a * this.m_impulse * this.m_u.y)
  };
  j.prototype.GetReactionTorque = function() {
    return 0
  };
  j.prototype.GetLength = function() {
    return this.m_length
  };
  j.prototype.SetLength = function(a) {
    a === void 0 && (a = 0);
    this.m_length = a
  };
  j.prototype.GetFrequency = function() {
    return this.m_frequencyHz
  };
  j.prototype.SetFrequency = function(a) {
    a === void 0 && (a = 0);
    this.m_frequencyHz = a
  };
  j.prototype.GetDampingRatio = function() {
    return this.m_dampingRatio
  };
  j.prototype.SetDampingRatio = function(a) {
    a === void 0 && (a = 0);
    this.m_dampingRatio = a
  };
  j.prototype.b2DistanceJoint = function(a) {
    this.__super.b2Joint.call(this, a);
    this.m_localAnchor1.SetV(a.localAnchorA);
    this.m_localAnchor2.SetV(a.localAnchorB);
    this.m_length = a.length;
    this.m_frequencyHz = a.frequencyHz;
    this.m_dampingRatio = a.dampingRatio;
    this.m_bias = this.m_gamma = this.m_impulse = 0
  };
  j.prototype.InitVelocityConstraints = function(b) {
    var d, e = 0, f = this.m_bodyA, g = this.m_bodyB;
    d = f.m_xf.R;
    var h = this.m_localAnchor1.x - f.m_sweep.localCenter.x, j = this.m_localAnchor1.y - f.m_sweep.localCenter.y, e = d.col1.x * h + d.col2.x * j, j = d.col1.y * h + d.col2.y * j, h = e;
    d = g.m_xf.R;
    var k = this.m_localAnchor2.x - g.m_sweep.localCenter.x, w = this.m_localAnchor2.y - g.m_sweep.localCenter.y, e = d.col1.x * k + d.col2.x * w, w = d.col1.y * k + d.col2.y * w, k = e;
    this.m_u.x = g.m_sweep.c.x + k - f.m_sweep.c.x - h;
    this.m_u.y = g.m_sweep.c.y + w - f.m_sweep.c.y - j;
    e = Math.sqrt(this.m_u.x * this.m_u.x + this.m_u.y * this.m_u.y);
    e > a.b2_linearSlop ? this.m_u.Multiply(1 / e) : this.m_u.SetZero();
    d = h * this.m_u.y - j * this.m_u.x;
    var n = k * this.m_u.y - w * this.m_u.x;
    d = f.m_invMass + f.m_invI * d * d + g.m_invMass + g.m_invI * n * n;
    this.m_mass = d != 0 ? 1 / d : 0;
    if(this.m_frequencyHz > 0) {
      e -= this.m_length;
      var n = 2 * Math.PI * this.m_frequencyHz, r = this.m_mass * n * n;
      this.m_gamma = b.dt * (2 * this.m_mass * this.m_dampingRatio * n + b.dt * r);
      this.m_gamma = this.m_gamma != 0 ? 1 / this.m_gamma : 0;
      this.m_bias = e * b.dt * r * this.m_gamma;
      this.m_mass = d + this.m_gamma;
      this.m_mass = this.m_mass != 0 ? 1 / this.m_mass : 0
    }
    b.warmStarting ? (this.m_impulse *= b.dtRatio, b = this.m_impulse * this.m_u.x, d = this.m_impulse * this.m_u.y, f.m_linearVelocity.x -= f.m_invMass * b, f.m_linearVelocity.y -= f.m_invMass * d, f.m_angularVelocity -= f.m_invI * (h * d - j * b), g.m_linearVelocity.x += g.m_invMass * b, g.m_linearVelocity.y += g.m_invMass * d, g.m_angularVelocity += g.m_invI * (k * d - w * b)) : this.m_impulse = 0
  };
  j.prototype.SolveVelocityConstraints = function() {
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
  j.prototype.SolvePositionConstraints = function() {
    var b;
    if(this.m_frequencyHz > 0) {
      return!0
    }
    var e = this.m_bodyA, g = this.m_bodyB;
    b = e.m_xf.R;
    var f = this.m_localAnchor1.x - e.m_sweep.localCenter.x, h = this.m_localAnchor1.y - e.m_sweep.localCenter.y, j = b.col1.x * f + b.col2.x * h, h = b.col1.y * f + b.col2.y * h, f = j;
    b = g.m_xf.R;
    var k = this.m_localAnchor2.x - g.m_sweep.localCenter.x, A = this.m_localAnchor2.y - g.m_sweep.localCenter.y, j = b.col1.x * k + b.col2.x * A, A = b.col1.y * k + b.col2.y * A, k = j, j = g.m_sweep.c.x + k - e.m_sweep.c.x - f, w = g.m_sweep.c.y + A - e.m_sweep.c.y - h;
    b = Math.sqrt(j * j + w * w);
    j /= b;
    w /= b;
    b -= this.m_length;
    b = d.Clamp(b, -a.b2_maxLinearCorrection, a.b2_maxLinearCorrection);
    var n = -this.m_mass * b;
    this.m_u.Set(j, w);
    j = n * this.m_u.x;
    w = n * this.m_u.y;
    e.m_sweep.c.x -= e.m_invMass * j;
    e.m_sweep.c.y -= e.m_invMass * w;
    e.m_sweep.a -= e.m_invI * (f * w - h * j);
    g.m_sweep.c.x += g.m_invMass * j;
    g.m_sweep.c.y += g.m_invMass * w;
    g.m_sweep.a += g.m_invI * (k * w - A * j);
    e.SynchronizeTransform();
    g.SynchronizeTransform();
    return d.Abs(b) < a.b2_linearSlop
  };
  Box2D.inherit(h, Box2D.Dynamics.Joints.b2JointDef);
  h.prototype.__super = Box2D.Dynamics.Joints.b2JointDef.prototype;
  h.b2DistanceJointDef = function() {
    Box2D.Dynamics.Joints.b2JointDef.b2JointDef.apply(this, arguments);
    this.localAnchorA = new b;
    this.localAnchorB = new b
  };
  h.prototype.b2DistanceJointDef = function() {
    this.__super.b2JointDef.call(this);
    this.type = r.e_distanceJoint;
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
  Box2D.inherit(l, Box2D.Dynamics.Joints.b2Joint);
  l.prototype.__super = Box2D.Dynamics.Joints.b2Joint.prototype;
  l.b2FrictionJoint = function() {
    Box2D.Dynamics.Joints.b2Joint.b2Joint.apply(this, arguments);
    this.m_localAnchorA = new b;
    this.m_localAnchorB = new b;
    this.m_linearMass = new e;
    this.m_linearImpulse = new b
  };
  l.prototype.GetAnchorA = function() {
    return this.m_bodyA.GetWorldPoint(this.m_localAnchorA)
  };
  l.prototype.GetAnchorB = function() {
    return this.m_bodyB.GetWorldPoint(this.m_localAnchorB)
  };
  l.prototype.GetReactionForce = function(a) {
    a === void 0 && (a = 0);
    return new b(a * this.m_linearImpulse.x, a * this.m_linearImpulse.y)
  };
  l.prototype.GetReactionTorque = function(a) {
    a === void 0 && (a = 0);
    return a * this.m_angularImpulse
  };
  l.prototype.SetMaxForce = function(a) {
    a === void 0 && (a = 0);
    this.m_maxForce = a
  };
  l.prototype.GetMaxForce = function() {
    return this.m_maxForce
  };
  l.prototype.SetMaxTorque = function(a) {
    a === void 0 && (a = 0);
    this.m_maxTorque = a
  };
  l.prototype.GetMaxTorque = function() {
    return this.m_maxTorque
  };
  l.prototype.b2FrictionJoint = function(a) {
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
  l.prototype.InitVelocityConstraints = function(a) {
    var b, d = 0, g = this.m_bodyA, f = this.m_bodyB;
    b = g.m_xf.R;
    var h = this.m_localAnchorA.x - g.m_sweep.localCenter.x, j = this.m_localAnchorA.y - g.m_sweep.localCenter.y, d = b.col1.x * h + b.col2.x * j, j = b.col1.y * h + b.col2.y * j, h = d;
    b = f.m_xf.R;
    var k = this.m_localAnchorB.x - f.m_sweep.localCenter.x, w = this.m_localAnchorB.y - f.m_sweep.localCenter.y, d = b.col1.x * k + b.col2.x * w, w = b.col1.y * k + b.col2.y * w, k = d;
    b = g.m_invMass;
    var d = f.m_invMass, n = g.m_invI, r = f.m_invI, l = new e;
    l.col1.x = b + d;
    l.col2.x = 0;
    l.col1.y = 0;
    l.col2.y = b + d;
    l.col1.x += n * j * j;
    l.col2.x += -n * h * j;
    l.col1.y += -n * h * j;
    l.col2.y += n * h * h;
    l.col1.x += r * w * w;
    l.col2.x += -r * k * w;
    l.col1.y += -r * k * w;
    l.col2.y += r * k * k;
    l.GetInverse(this.m_linearMass);
    this.m_angularMass = n + r;
    if(this.m_angularMass > 0) {
      this.m_angularMass = 1 / this.m_angularMass
    }
    a.warmStarting ? (this.m_linearImpulse.x *= a.dtRatio, this.m_linearImpulse.y *= a.dtRatio, this.m_angularImpulse *= a.dtRatio, a = this.m_linearImpulse, g.m_linearVelocity.x -= b * a.x, g.m_linearVelocity.y -= b * a.y, g.m_angularVelocity -= n * (h * a.y - j * a.x + this.m_angularImpulse), f.m_linearVelocity.x += d * a.x, f.m_linearVelocity.y += d * a.y, f.m_angularVelocity += r * (k * a.y - w * a.x + this.m_angularImpulse)) : (this.m_linearImpulse.SetZero(), this.m_angularImpulse = 0)
  };
  l.prototype.SolveVelocityConstraints = function(a) {
    var e, g = 0, f = this.m_bodyA, h = this.m_bodyB, j = f.m_linearVelocity, k = f.m_angularVelocity, A = h.m_linearVelocity, w = h.m_angularVelocity, n = f.m_invMass, r = h.m_invMass, l = f.m_invI, o = h.m_invI;
    e = f.m_xf.R;
    var q = this.m_localAnchorA.x - f.m_sweep.localCenter.x, s = this.m_localAnchorA.y - f.m_sweep.localCenter.y, g = e.col1.x * q + e.col2.x * s, s = e.col1.y * q + e.col2.y * s, q = g;
    e = h.m_xf.R;
    var t = this.m_localAnchorB.x - h.m_sweep.localCenter.x, v = this.m_localAnchorB.y - h.m_sweep.localCenter.y, g = e.col1.x * t + e.col2.x * v, v = e.col1.y * t + e.col2.y * v, t = g;
    e = 0;
    var g = -this.m_angularMass * (w - k), y = this.m_angularImpulse;
    e = a.dt * this.m_maxTorque;
    this.m_angularImpulse = d.Clamp(this.m_angularImpulse + g, -e, e);
    g = this.m_angularImpulse - y;
    k -= l * g;
    w += o * g;
    e = d.MulMV(this.m_linearMass, new b(-(A.x - w * v - j.x + k * s), -(A.y + w * t - j.y - k * q)));
    g = this.m_linearImpulse.Copy();
    this.m_linearImpulse.Add(e);
    e = a.dt * this.m_maxForce;
    this.m_linearImpulse.LengthSquared() > e * e && (this.m_linearImpulse.Normalize(), this.m_linearImpulse.Multiply(e));
    e = d.SubtractVV(this.m_linearImpulse, g);
    j.x -= n * e.x;
    j.y -= n * e.y;
    k -= l * (q * e.y - s * e.x);
    A.x += r * e.x;
    A.y += r * e.y;
    w += o * (t * e.y - v * e.x);
    f.m_angularVelocity = k;
    h.m_angularVelocity = w
  };
  l.prototype.SolvePositionConstraints = function() {
    return!0
  };
  Box2D.inherit(k, Box2D.Dynamics.Joints.b2JointDef);
  k.prototype.__super = Box2D.Dynamics.Joints.b2JointDef.prototype;
  k.b2FrictionJointDef = function() {
    Box2D.Dynamics.Joints.b2JointDef.b2JointDef.apply(this, arguments);
    this.localAnchorA = new b;
    this.localAnchorB = new b
  };
  k.prototype.b2FrictionJointDef = function() {
    this.__super.b2JointDef.call(this);
    this.type = r.e_frictionJoint;
    this.maxTorque = this.maxForce = 0
  };
  k.prototype.Initialize = function(a, b, d) {
    this.bodyA = a;
    this.bodyB = b;
    this.localAnchorA.SetV(this.bodyA.GetLocalPoint(d));
    this.localAnchorB.SetV(this.bodyB.GetLocalPoint(d))
  };
  Box2D.inherit(n, Box2D.Dynamics.Joints.b2Joint);
  n.prototype.__super = Box2D.Dynamics.Joints.b2Joint.prototype;
  n.b2GearJoint = function() {
    Box2D.Dynamics.Joints.b2Joint.b2Joint.apply(this, arguments);
    this.m_groundAnchor1 = new b;
    this.m_groundAnchor2 = new b;
    this.m_localAnchor1 = new b;
    this.m_localAnchor2 = new b;
    this.m_J = new v
  };
  n.prototype.GetAnchorA = function() {
    return this.m_bodyA.GetWorldPoint(this.m_localAnchor1)
  };
  n.prototype.GetAnchorB = function() {
    return this.m_bodyB.GetWorldPoint(this.m_localAnchor2)
  };
  n.prototype.GetReactionForce = function(a) {
    a === void 0 && (a = 0);
    return new b(a * this.m_impulse * this.m_J.linearB.x, a * this.m_impulse * this.m_J.linearB.y)
  };
  n.prototype.GetReactionTorque = function(a) {
    a === void 0 && (a = 0);
    var b = this.m_bodyB.m_xf.R, d = this.m_localAnchor1.x - this.m_bodyB.m_sweep.localCenter.x, e = this.m_localAnchor1.y - this.m_bodyB.m_sweep.localCenter.y, g = b.col1.x * d + b.col2.x * e, e = b.col1.y * d + b.col2.y * e;
    return a * (this.m_impulse * this.m_J.angularB - g * this.m_impulse * this.m_J.linearB.y + e * this.m_impulse * this.m_J.linearB.x)
  };
  n.prototype.GetRatio = function() {
    return this.m_ratio
  };
  n.prototype.SetRatio = function(a) {
    a === void 0 && (a = 0);
    this.m_ratio = a
  };
  n.prototype.b2GearJoint = function(a) {
    this.__super.b2Joint.call(this, a);
    var b = a.joint1.m_type, d = a.joint2.m_type;
    this.m_prismatic2 = this.m_revolute2 = this.m_prismatic1 = this.m_revolute1 = null;
    var e = 0, g = 0;
    this.m_ground1 = a.joint1.GetBodyA();
    this.m_bodyA = a.joint1.GetBodyB();
    b == r.e_revoluteJoint ? (this.m_revolute1 = a.joint1 instanceof t ? a.joint1 : null, this.m_groundAnchor1.SetV(this.m_revolute1.m_localAnchor1), this.m_localAnchor1.SetV(this.m_revolute1.m_localAnchor2), e = this.m_revolute1.GetJointAngle()) : (this.m_prismatic1 = a.joint1 instanceof H ? a.joint1 : null, this.m_groundAnchor1.SetV(this.m_prismatic1.m_localAnchor1), this.m_localAnchor1.SetV(this.m_prismatic1.m_localAnchor2), e = this.m_prismatic1.GetJointTranslation());
    this.m_ground2 = a.joint2.GetBodyA();
    this.m_bodyB = a.joint2.GetBodyB();
    d == r.e_revoluteJoint ? (this.m_revolute2 = a.joint2 instanceof t ? a.joint2 : null, this.m_groundAnchor2.SetV(this.m_revolute2.m_localAnchor1), this.m_localAnchor2.SetV(this.m_revolute2.m_localAnchor2), g = this.m_revolute2.GetJointAngle()) : (this.m_prismatic2 = a.joint2 instanceof H ? a.joint2 : null, this.m_groundAnchor2.SetV(this.m_prismatic2.m_localAnchor1), this.m_localAnchor2.SetV(this.m_prismatic2.m_localAnchor2), g = this.m_prismatic2.GetJointTranslation());
    this.m_ratio = a.ratio;
    this.m_constant = e + this.m_ratio * g;
    this.m_impulse = 0
  };
  n.prototype.InitVelocityConstraints = function(a) {
    var b = this.m_ground1, d = this.m_ground2, e = this.m_bodyA, g = this.m_bodyB, f = 0, h = 0, j = 0, k = 0, n = j = 0, r = 0;
    this.m_J.SetZero();
    this.m_revolute1 ? (this.m_J.angularA = -1, r += e.m_invI) : (b = b.m_xf.R, h = this.m_prismatic1.m_localXAxis1, f = b.col1.x * h.x + b.col2.x * h.y, h = b.col1.y * h.x + b.col2.y * h.y, b = e.m_xf.R, j = this.m_localAnchor1.x - e.m_sweep.localCenter.x, k = this.m_localAnchor1.y - e.m_sweep.localCenter.y, n = b.col1.x * j + b.col2.x * k, k = b.col1.y * j + b.col2.y * k, j = n * h - k * f, this.m_J.linearA.Set(-f, -h), this.m_J.angularA = -j, r += e.m_invMass + e.m_invI * j * j);
    this.m_revolute2 ? (this.m_J.angularB = -this.m_ratio, r += this.m_ratio * this.m_ratio * g.m_invI) : (b = d.m_xf.R, h = this.m_prismatic2.m_localXAxis1, f = b.col1.x * h.x + b.col2.x * h.y, h = b.col1.y * h.x + b.col2.y * h.y, b = g.m_xf.R, j = this.m_localAnchor2.x - g.m_sweep.localCenter.x, k = this.m_localAnchor2.y - g.m_sweep.localCenter.y, n = b.col1.x * j + b.col2.x * k, k = b.col1.y * j + b.col2.y * k, j = n * h - k * f, this.m_J.linearB.Set(-this.m_ratio * f, -this.m_ratio * h), this.m_J.angularB = 
    -this.m_ratio * j, r += this.m_ratio * this.m_ratio * (g.m_invMass + g.m_invI * j * j));
    this.m_mass = r > 0 ? 1 / r : 0;
    a.warmStarting ? (e.m_linearVelocity.x += e.m_invMass * this.m_impulse * this.m_J.linearA.x, e.m_linearVelocity.y += e.m_invMass * this.m_impulse * this.m_J.linearA.y, e.m_angularVelocity += e.m_invI * this.m_impulse * this.m_J.angularA, g.m_linearVelocity.x += g.m_invMass * this.m_impulse * this.m_J.linearB.x, g.m_linearVelocity.y += g.m_invMass * this.m_impulse * this.m_J.linearB.y, g.m_angularVelocity += g.m_invI * this.m_impulse * this.m_J.angularB) : this.m_impulse = 0
  };
  n.prototype.SolveVelocityConstraints = function() {
    var a = this.m_bodyA, b = this.m_bodyB, d = -this.m_mass * this.m_J.Compute(a.m_linearVelocity, a.m_angularVelocity, b.m_linearVelocity, b.m_angularVelocity);
    this.m_impulse += d;
    a.m_linearVelocity.x += a.m_invMass * d * this.m_J.linearA.x;
    a.m_linearVelocity.y += a.m_invMass * d * this.m_J.linearA.y;
    a.m_angularVelocity += a.m_invI * d * this.m_J.angularA;
    b.m_linearVelocity.x += b.m_invMass * d * this.m_J.linearB.x;
    b.m_linearVelocity.y += b.m_invMass * d * this.m_J.linearB.y;
    b.m_angularVelocity += b.m_invI * d * this.m_J.angularB
  };
  n.prototype.SolvePositionConstraints = function() {
    var b = this.m_bodyA, d = this.m_bodyB, e = 0, g = 0, e = this.m_revolute1 ? this.m_revolute1.GetJointAngle() : this.m_prismatic1.GetJointTranslation(), g = this.m_revolute2 ? this.m_revolute2.GetJointAngle() : this.m_prismatic2.GetJointTranslation(), e = -this.m_mass * (this.m_constant - (e + this.m_ratio * g));
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
  Box2D.inherit(q, Box2D.Dynamics.Joints.b2JointDef);
  q.prototype.__super = Box2D.Dynamics.Joints.b2JointDef.prototype;
  q.b2GearJointDef = function() {
    Box2D.Dynamics.Joints.b2JointDef.b2JointDef.apply(this, arguments)
  };
  q.prototype.b2GearJointDef = function() {
    this.__super.b2JointDef.call(this);
    this.type = r.e_gearJoint;
    this.joint2 = this.joint1 = null;
    this.ratio = 1
  };
  v.b2Jacobian = function() {
    this.linearA = new b;
    this.linearB = new b
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
  r.b2Joint = function() {
    this.m_edgeA = new B;
    this.m_edgeB = new B;
    this.m_localCenterA = new b;
    this.m_localCenterB = new b
  };
  r.prototype.GetType = function() {
    return this.m_type
  };
  r.prototype.GetAnchorA = function() {
    return null
  };
  r.prototype.GetAnchorB = function() {
    return null
  };
  r.prototype.GetReactionForce = function() {
    return null
  };
  r.prototype.GetReactionTorque = function() {
    return 0
  };
  r.prototype.GetBodyA = function() {
    return this.m_bodyA
  };
  r.prototype.GetBodyB = function() {
    return this.m_bodyB
  };
  r.prototype.GetNext = function() {
    return this.m_next
  };
  r.prototype.GetUserData = function() {
    return this.m_userData
  };
  r.prototype.SetUserData = function(a) {
    this.m_userData = a
  };
  r.prototype.IsActive = function() {
    return this.m_bodyA.IsActive() && this.m_bodyB.IsActive()
  };
  r.Create = function(a) {
    var b = null;
    switch(a.type) {
      case r.e_distanceJoint:
        b = new j(a instanceof h ? a : null);
        break;
      case r.e_mouseJoint:
        b = new G(a instanceof I ? a : null);
        break;
      case r.e_prismaticJoint:
        b = new H(a instanceof J ? a : null);
        break;
      case r.e_revoluteJoint:
        b = new t(a instanceof F ? a : null);
        break;
      case r.e_pulleyJoint:
        b = new o(a instanceof x ? a : null);
        break;
      case r.e_gearJoint:
        b = new n(a instanceof q ? a : null);
        break;
      case r.e_lineJoint:
        b = new s(a instanceof z ? a : null);
        break;
      case r.e_weldJoint:
        b = new L(a instanceof N ? a : null);
        break;
      case r.e_frictionJoint:
        b = new l(a instanceof k ? a : null)
    }
    return b
  };
  r.Destroy = function() {
  };
  r.prototype.b2Joint = function(b) {
    a.b2Assert(b.bodyA != b.bodyB);
    this.m_type = b.type;
    this.m_next = this.m_prev = null;
    this.m_bodyA = b.bodyA;
    this.m_bodyB = b.bodyB;
    this.m_collideConnected = b.collideConnected;
    this.m_userData = b.userData
  };
  r.prototype.InitVelocityConstraints = function() {
  };
  r.prototype.SolveVelocityConstraints = function() {
  };
  r.prototype.FinalizeVelocityConstraints = function() {
  };
  r.prototype.SolvePositionConstraints = function() {
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
  y.b2JointDef = function() {
  };
  y.prototype.b2JointDef = function() {
    this.type = r.e_unknownJoint;
    this.bodyB = this.bodyA = this.userData = null;
    this.collideConnected = !1
  };
  B.b2JointEdge = function() {
  };
  Box2D.inherit(s, Box2D.Dynamics.Joints.b2Joint);
  s.prototype.__super = Box2D.Dynamics.Joints.b2Joint.prototype;
  s.b2LineJoint = function() {
    Box2D.Dynamics.Joints.b2Joint.b2Joint.apply(this, arguments);
    this.m_localAnchor1 = new b;
    this.m_localAnchor2 = new b;
    this.m_localXAxis1 = new b;
    this.m_localYAxis1 = new b;
    this.m_axis = new b;
    this.m_perp = new b;
    this.m_K = new e;
    this.m_impulse = new b
  };
  s.prototype.GetAnchorA = function() {
    return this.m_bodyA.GetWorldPoint(this.m_localAnchor1)
  };
  s.prototype.GetAnchorB = function() {
    return this.m_bodyB.GetWorldPoint(this.m_localAnchor2)
  };
  s.prototype.GetReactionForce = function(a) {
    a === void 0 && (a = 0);
    return new b(a * (this.m_impulse.x * this.m_perp.x + (this.m_motorImpulse + this.m_impulse.y) * this.m_axis.x), a * (this.m_impulse.x * this.m_perp.y + (this.m_motorImpulse + this.m_impulse.y) * this.m_axis.y))
  };
  s.prototype.GetReactionTorque = function(a) {
    a === void 0 && (a = 0);
    return a * this.m_impulse.y
  };
  s.prototype.GetJointTranslation = function() {
    var a = this.m_bodyA, b = this.m_bodyB, d = a.GetWorldPoint(this.m_localAnchor1), e = b.GetWorldPoint(this.m_localAnchor2), b = e.x - d.x, d = e.y - d.y, a = a.GetWorldVector(this.m_localXAxis1);
    return a.x * b + a.y * d
  };
  s.prototype.GetJointSpeed = function() {
    var a = this.m_bodyA, b = this.m_bodyB, d;
    d = a.m_xf.R;
    var e = this.m_localAnchor1.x - a.m_sweep.localCenter.x, g = this.m_localAnchor1.y - a.m_sweep.localCenter.y, f = d.col1.x * e + d.col2.x * g, g = d.col1.y * e + d.col2.y * g, e = f;
    d = b.m_xf.R;
    var h = this.m_localAnchor2.x - b.m_sweep.localCenter.x, j = this.m_localAnchor2.y - b.m_sweep.localCenter.y, f = d.col1.x * h + d.col2.x * j, j = d.col1.y * h + d.col2.y * j, h = f;
    d = b.m_sweep.c.x + h - (a.m_sweep.c.x + e);
    var f = b.m_sweep.c.y + j - (a.m_sweep.c.y + g), k = a.GetWorldVector(this.m_localXAxis1), n = a.m_linearVelocity, r = b.m_linearVelocity, a = a.m_angularVelocity, b = b.m_angularVelocity;
    return d * -a * k.y + f * a * k.x + (k.x * (r.x + -b * j - n.x - -a * g) + k.y * (r.y + b * h - n.y - a * e))
  };
  s.prototype.IsLimitEnabled = function() {
    return this.m_enableLimit
  };
  s.prototype.EnableLimit = function(a) {
    this.m_bodyA.SetAwake(!0);
    this.m_bodyB.SetAwake(!0);
    this.m_enableLimit = a
  };
  s.prototype.GetLowerLimit = function() {
    return this.m_lowerTranslation
  };
  s.prototype.GetUpperLimit = function() {
    return this.m_upperTranslation
  };
  s.prototype.SetLimits = function(a, b) {
    a === void 0 && (a = 0);
    b === void 0 && (b = 0);
    this.m_bodyA.SetAwake(!0);
    this.m_bodyB.SetAwake(!0);
    this.m_lowerTranslation = a;
    this.m_upperTranslation = b
  };
  s.prototype.IsMotorEnabled = function() {
    return this.m_enableMotor
  };
  s.prototype.EnableMotor = function(a) {
    this.m_bodyA.SetAwake(!0);
    this.m_bodyB.SetAwake(!0);
    this.m_enableMotor = a
  };
  s.prototype.SetMotorSpeed = function(a) {
    a === void 0 && (a = 0);
    this.m_bodyA.SetAwake(!0);
    this.m_bodyB.SetAwake(!0);
    this.m_motorSpeed = a
  };
  s.prototype.GetMotorSpeed = function() {
    return this.m_motorSpeed
  };
  s.prototype.SetMaxMotorForce = function(a) {
    a === void 0 && (a = 0);
    this.m_bodyA.SetAwake(!0);
    this.m_bodyB.SetAwake(!0);
    this.m_maxMotorForce = a
  };
  s.prototype.GetMaxMotorForce = function() {
    return this.m_maxMotorForce
  };
  s.prototype.GetMotorForce = function() {
    return this.m_motorImpulse
  };
  s.prototype.b2LineJoint = function(a) {
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
    this.m_limitState = r.e_inactiveLimit;
    this.m_axis.SetZero();
    this.m_perp.SetZero()
  };
  s.prototype.InitVelocityConstraints = function(b) {
    var e = this.m_bodyA, g = this.m_bodyB, f, h = 0;
    this.m_localCenterA.SetV(e.GetLocalCenter());
    this.m_localCenterB.SetV(g.GetLocalCenter());
    var j = e.GetTransform();
    g.GetTransform();
    f = e.m_xf.R;
    var k = this.m_localAnchor1.x - this.m_localCenterA.x, n = this.m_localAnchor1.y - this.m_localCenterA.y, h = f.col1.x * k + f.col2.x * n, n = f.col1.y * k + f.col2.y * n, k = h;
    f = g.m_xf.R;
    var w = this.m_localAnchor2.x - this.m_localCenterB.x, l = this.m_localAnchor2.y - this.m_localCenterB.y, h = f.col1.x * w + f.col2.x * l, l = f.col1.y * w + f.col2.y * l, w = h;
    f = g.m_sweep.c.x + w - e.m_sweep.c.x - k;
    h = g.m_sweep.c.y + l - e.m_sweep.c.y - n;
    this.m_invMassA = e.m_invMass;
    this.m_invMassB = g.m_invMass;
    this.m_invIA = e.m_invI;
    this.m_invIB = g.m_invI;
    this.m_axis.SetV(d.MulMV(j.R, this.m_localXAxis1));
    this.m_a1 = (f + k) * this.m_axis.y - (h + n) * this.m_axis.x;
    this.m_a2 = w * this.m_axis.y - l * this.m_axis.x;
    this.m_motorMass = this.m_invMassA + this.m_invMassB + this.m_invIA * this.m_a1 * this.m_a1 + this.m_invIB * this.m_a2 * this.m_a2;
    this.m_motorMass = this.m_motorMass > Number.MIN_VALUE ? 1 / this.m_motorMass : 0;
    this.m_perp.SetV(d.MulMV(j.R, this.m_localYAxis1));
    this.m_s1 = (f + k) * this.m_perp.y - (h + n) * this.m_perp.x;
    this.m_s2 = w * this.m_perp.y - l * this.m_perp.x;
    j = this.m_invMassA;
    k = this.m_invMassB;
    n = this.m_invIA;
    w = this.m_invIB;
    this.m_K.col1.x = j + k + n * this.m_s1 * this.m_s1 + w * this.m_s2 * this.m_s2;
    this.m_K.col1.y = n * this.m_s1 * this.m_a1 + w * this.m_s2 * this.m_a2;
    this.m_K.col2.x = this.m_K.col1.y;
    this.m_K.col2.y = j + k + n * this.m_a1 * this.m_a1 + w * this.m_a2 * this.m_a2;
    if(this.m_enableLimit) {
      if(f = this.m_axis.x * f + this.m_axis.y * h, d.Abs(this.m_upperTranslation - this.m_lowerTranslation) < 2 * a.b2_linearSlop) {
        this.m_limitState = r.e_equalLimits
      }else {
        if(f <= this.m_lowerTranslation) {
          if(this.m_limitState != r.e_atLowerLimit) {
            this.m_limitState = r.e_atLowerLimit, this.m_impulse.y = 0
          }
        }else {
          if(f >= this.m_upperTranslation) {
            if(this.m_limitState != r.e_atUpperLimit) {
              this.m_limitState = r.e_atUpperLimit, this.m_impulse.y = 0
            }
          }else {
            this.m_limitState = r.e_inactiveLimit, this.m_impulse.y = 0
          }
        }
      }
    }else {
      this.m_limitState = r.e_inactiveLimit
    }
    if(this.m_enableMotor == !1) {
      this.m_motorImpulse = 0
    }
    b.warmStarting ? (this.m_impulse.x *= b.dtRatio, this.m_impulse.y *= b.dtRatio, this.m_motorImpulse *= b.dtRatio, b = this.m_impulse.x * this.m_perp.x + (this.m_motorImpulse + this.m_impulse.y) * this.m_axis.x, f = this.m_impulse.x * this.m_perp.y + (this.m_motorImpulse + this.m_impulse.y) * this.m_axis.y, h = this.m_impulse.x * this.m_s1 + (this.m_motorImpulse + this.m_impulse.y) * this.m_a1, j = this.m_impulse.x * this.m_s2 + (this.m_motorImpulse + this.m_impulse.y) * this.m_a2, e.m_linearVelocity.x -= 
    this.m_invMassA * b, e.m_linearVelocity.y -= this.m_invMassA * f, e.m_angularVelocity -= this.m_invIA * h, g.m_linearVelocity.x += this.m_invMassB * b, g.m_linearVelocity.y += this.m_invMassB * f, g.m_angularVelocity += this.m_invIB * j) : (this.m_impulse.SetZero(), this.m_motorImpulse = 0)
  };
  s.prototype.SolveVelocityConstraints = function(a) {
    var e = this.m_bodyA, g = this.m_bodyB, f = e.m_linearVelocity, h = e.m_angularVelocity, j = g.m_linearVelocity, k = g.m_angularVelocity, n = 0, w = 0, l = 0, o = 0;
    if(this.m_enableMotor && this.m_limitState != r.e_equalLimits) {
      o = this.m_motorMass * (this.m_motorSpeed - (this.m_axis.x * (j.x - f.x) + this.m_axis.y * (j.y - f.y) + this.m_a2 * k - this.m_a1 * h)), n = this.m_motorImpulse, w = a.dt * this.m_maxMotorForce, this.m_motorImpulse = d.Clamp(this.m_motorImpulse + o, -w, w), o = this.m_motorImpulse - n, n = o * this.m_axis.x, w = o * this.m_axis.y, l = o * this.m_a1, o *= this.m_a2, f.x -= this.m_invMassA * n, f.y -= this.m_invMassA * w, h -= this.m_invIA * l, j.x += this.m_invMassB * n, j.y += this.m_invMassB * 
      w, k += this.m_invIB * o
    }
    w = this.m_perp.x * (j.x - f.x) + this.m_perp.y * (j.y - f.y) + this.m_s2 * k - this.m_s1 * h;
    if(this.m_enableLimit && this.m_limitState != r.e_inactiveLimit) {
      l = this.m_axis.x * (j.x - f.x) + this.m_axis.y * (j.y - f.y) + this.m_a2 * k - this.m_a1 * h;
      n = this.m_impulse.Copy();
      a = this.m_K.Solve(new b, -w, -l);
      this.m_impulse.Add(a);
      if(this.m_limitState == r.e_atLowerLimit) {
        this.m_impulse.y = d.Max(this.m_impulse.y, 0)
      }else {
        if(this.m_limitState == r.e_atUpperLimit) {
          this.m_impulse.y = d.Min(this.m_impulse.y, 0)
        }
      }
      w = -w - (this.m_impulse.y - n.y) * this.m_K.col2.x;
      l = 0;
      l = this.m_K.col1.x != 0 ? w / this.m_K.col1.x + n.x : n.x;
      this.m_impulse.x = l;
      a.x = this.m_impulse.x - n.x;
      a.y = this.m_impulse.y - n.y;
      n = a.x * this.m_perp.x + a.y * this.m_axis.x;
      w = a.x * this.m_perp.y + a.y * this.m_axis.y;
      l = a.x * this.m_s1 + a.y * this.m_a1;
      o = a.x * this.m_s2 + a.y * this.m_a2
    }else {
      a = 0, a = this.m_K.col1.x != 0 ? -w / this.m_K.col1.x : 0, this.m_impulse.x += a, n = a * this.m_perp.x, w = a * this.m_perp.y, l = a * this.m_s1, o = a * this.m_s2
    }
    f.x -= this.m_invMassA * n;
    f.y -= this.m_invMassA * w;
    h -= this.m_invIA * l;
    j.x += this.m_invMassB * n;
    j.y += this.m_invMassB * w;
    k += this.m_invIB * o;
    e.m_linearVelocity.SetV(f);
    e.m_angularVelocity = h;
    g.m_linearVelocity.SetV(j);
    g.m_angularVelocity = k
  };
  s.prototype.SolvePositionConstraints = function() {
    var g = this.m_bodyA, f = this.m_bodyB, h = g.m_sweep.c, j = g.m_sweep.a, k = f.m_sweep.c, n = f.m_sweep.a, l, r = 0, w = 0, o = 0, q = 0, s = l = 0, t = 0, w = !1, v = 0, y = e.FromAngle(j), o = e.FromAngle(n);
    l = y;
    var t = this.m_localAnchor1.x - this.m_localCenterA.x, x = this.m_localAnchor1.y - this.m_localCenterA.y, r = l.col1.x * t + l.col2.x * x, x = l.col1.y * t + l.col2.y * x, t = r;
    l = o;
    o = this.m_localAnchor2.x - this.m_localCenterB.x;
    q = this.m_localAnchor2.y - this.m_localCenterB.y;
    r = l.col1.x * o + l.col2.x * q;
    q = l.col1.y * o + l.col2.y * q;
    o = r;
    l = k.x + o - h.x - t;
    r = k.y + q - h.y - x;
    if(this.m_enableLimit) {
      this.m_axis = d.MulMV(y, this.m_localXAxis1);
      this.m_a1 = (l + t) * this.m_axis.y - (r + x) * this.m_axis.x;
      this.m_a2 = o * this.m_axis.y - q * this.m_axis.x;
      var B = this.m_axis.x * l + this.m_axis.y * r;
      d.Abs(this.m_upperTranslation - this.m_lowerTranslation) < 2 * a.b2_linearSlop ? (v = d.Clamp(B, -a.b2_maxLinearCorrection, a.b2_maxLinearCorrection), s = d.Abs(B), w = !0) : B <= this.m_lowerTranslation ? (v = d.Clamp(B - this.m_lowerTranslation + a.b2_linearSlop, -a.b2_maxLinearCorrection, 0), s = this.m_lowerTranslation - B, w = !0) : B >= this.m_upperTranslation && (v = d.Clamp(B - this.m_upperTranslation + a.b2_linearSlop, 0, a.b2_maxLinearCorrection), s = B - this.m_upperTranslation, 
      w = !0)
    }
    this.m_perp = d.MulMV(y, this.m_localYAxis1);
    this.m_s1 = (l + t) * this.m_perp.y - (r + x) * this.m_perp.x;
    this.m_s2 = o * this.m_perp.y - q * this.m_perp.x;
    y = new b;
    x = this.m_perp.x * l + this.m_perp.y * r;
    s = d.Max(s, d.Abs(x));
    t = 0;
    w ? (w = this.m_invMassA, o = this.m_invMassB, q = this.m_invIA, l = this.m_invIB, this.m_K.col1.x = w + o + q * this.m_s1 * this.m_s1 + l * this.m_s2 * this.m_s2, this.m_K.col1.y = q * this.m_s1 * this.m_a1 + l * this.m_s2 * this.m_a2, this.m_K.col2.x = this.m_K.col1.y, this.m_K.col2.y = w + o + q * this.m_a1 * this.m_a1 + l * this.m_a2 * this.m_a2, this.m_K.Solve(y, -x, -v)) : (w = this.m_invMassA, o = this.m_invMassB, q = this.m_invIA, l = this.m_invIB, v = w + o + q * this.m_s1 * this.m_s1 + 
    l * this.m_s2 * this.m_s2, w = 0, y.x = v != 0 ? -x / v : 0, y.y = 0);
    v = y.x * this.m_perp.x + y.y * this.m_axis.x;
    w = y.x * this.m_perp.y + y.y * this.m_axis.y;
    x = y.x * this.m_s1 + y.y * this.m_a1;
    y = y.x * this.m_s2 + y.y * this.m_a2;
    h.x -= this.m_invMassA * v;
    h.y -= this.m_invMassA * w;
    j -= this.m_invIA * x;
    k.x += this.m_invMassB * v;
    k.y += this.m_invMassB * w;
    n += this.m_invIB * y;
    g.m_sweep.a = j;
    f.m_sweep.a = n;
    g.SynchronizeTransform();
    f.SynchronizeTransform();
    return s <= a.b2_linearSlop && t <= a.b2_angularSlop
  };
  Box2D.inherit(z, Box2D.Dynamics.Joints.b2JointDef);
  z.prototype.__super = Box2D.Dynamics.Joints.b2JointDef.prototype;
  z.b2LineJointDef = function() {
    Box2D.Dynamics.Joints.b2JointDef.b2JointDef.apply(this, arguments);
    this.localAnchorA = new b;
    this.localAnchorB = new b;
    this.localAxisA = new b
  };
  z.prototype.b2LineJointDef = function() {
    this.__super.b2JointDef.call(this);
    this.type = r.e_lineJoint;
    this.localAxisA.Set(1, 0);
    this.enableLimit = !1;
    this.upperTranslation = this.lowerTranslation = 0;
    this.enableMotor = !1;
    this.motorSpeed = this.maxMotorForce = 0
  };
  z.prototype.Initialize = function(a, b, d, e) {
    this.bodyA = a;
    this.bodyB = b;
    this.localAnchorA = this.bodyA.GetLocalPoint(d);
    this.localAnchorB = this.bodyB.GetLocalPoint(d);
    this.localAxisA = this.bodyA.GetLocalVector(e)
  };
  Box2D.inherit(G, Box2D.Dynamics.Joints.b2Joint);
  G.prototype.__super = Box2D.Dynamics.Joints.b2Joint.prototype;
  G.b2MouseJoint = function() {
    Box2D.Dynamics.Joints.b2Joint.b2Joint.apply(this, arguments);
    this.K = new e;
    this.K1 = new e;
    this.K2 = new e;
    this.m_localAnchor = new b;
    this.m_target = new b;
    this.m_impulse = new b;
    this.m_mass = new e;
    this.m_C = new b
  };
  G.prototype.GetAnchorA = function() {
    return this.m_target
  };
  G.prototype.GetAnchorB = function() {
    return this.m_bodyB.GetWorldPoint(this.m_localAnchor)
  };
  G.prototype.GetReactionForce = function(a) {
    a === void 0 && (a = 0);
    return new b(a * this.m_impulse.x, a * this.m_impulse.y)
  };
  G.prototype.GetReactionTorque = function() {
    return 0
  };
  G.prototype.GetTarget = function() {
    return this.m_target
  };
  G.prototype.SetTarget = function(a) {
    this.m_bodyB.IsAwake() == !1 && this.m_bodyB.SetAwake(!0);
    this.m_target = a
  };
  G.prototype.GetMaxForce = function() {
    return this.m_maxForce
  };
  G.prototype.SetMaxForce = function(a) {
    a === void 0 && (a = 0);
    this.m_maxForce = a
  };
  G.prototype.GetFrequency = function() {
    return this.m_frequencyHz
  };
  G.prototype.SetFrequency = function(a) {
    a === void 0 && (a = 0);
    this.m_frequencyHz = a
  };
  G.prototype.GetDampingRatio = function() {
    return this.m_dampingRatio
  };
  G.prototype.SetDampingRatio = function(a) {
    a === void 0 && (a = 0);
    this.m_dampingRatio = a
  };
  G.prototype.b2MouseJoint = function(a) {
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
  G.prototype.InitVelocityConstraints = function(a) {
    var b = this.m_bodyB, d = b.GetMass(), e = 2 * Math.PI * this.m_frequencyHz, g = d * e * e;
    this.m_gamma = a.dt * (2 * d * this.m_dampingRatio * e + a.dt * g);
    this.m_gamma = this.m_gamma != 0 ? 1 / this.m_gamma : 0;
    this.m_beta = a.dt * g * this.m_gamma;
    var g = b.m_xf.R, d = this.m_localAnchor.x - b.m_sweep.localCenter.x, e = this.m_localAnchor.y - b.m_sweep.localCenter.y, f = g.col1.x * d + g.col2.x * e, e = g.col1.y * d + g.col2.y * e, d = f, g = b.m_invMass, f = b.m_invI;
    this.K1.col1.x = g;
    this.K1.col2.x = 0;
    this.K1.col1.y = 0;
    this.K1.col2.y = g;
    this.K2.col1.x = f * e * e;
    this.K2.col2.x = -f * d * e;
    this.K2.col1.y = -f * d * e;
    this.K2.col2.y = f * d * d;
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
    b.m_linearVelocity.x += g * this.m_impulse.x;
    b.m_linearVelocity.y += g * this.m_impulse.y;
    b.m_angularVelocity += f * (d * this.m_impulse.y - e * this.m_impulse.x)
  };
  G.prototype.SolveVelocityConstraints = function(a) {
    var b = this.m_bodyB, d, e = 0, g = 0;
    d = b.m_xf.R;
    var f = this.m_localAnchor.x - b.m_sweep.localCenter.x, h = this.m_localAnchor.y - b.m_sweep.localCenter.y, e = d.col1.x * f + d.col2.x * h, h = d.col1.y * f + d.col2.y * h, f = e, e = b.m_linearVelocity.x + -b.m_angularVelocity * h, j = b.m_linearVelocity.y + b.m_angularVelocity * f;
    d = this.m_mass;
    e = e + this.m_beta * this.m_C.x + this.m_gamma * this.m_impulse.x;
    g = j + this.m_beta * this.m_C.y + this.m_gamma * this.m_impulse.y;
    j = -(d.col1.x * e + d.col2.x * g);
    g = -(d.col1.y * e + d.col2.y * g);
    d = this.m_impulse.x;
    e = this.m_impulse.y;
    this.m_impulse.x += j;
    this.m_impulse.y += g;
    a = a.dt * this.m_maxForce;
    this.m_impulse.LengthSquared() > a * a && this.m_impulse.Multiply(a / this.m_impulse.Length());
    j = this.m_impulse.x - d;
    g = this.m_impulse.y - e;
    b.m_linearVelocity.x += b.m_invMass * j;
    b.m_linearVelocity.y += b.m_invMass * g;
    b.m_angularVelocity += b.m_invI * (f * g - h * j)
  };
  G.prototype.SolvePositionConstraints = function() {
    return!0
  };
  Box2D.inherit(I, Box2D.Dynamics.Joints.b2JointDef);
  I.prototype.__super = Box2D.Dynamics.Joints.b2JointDef.prototype;
  I.b2MouseJointDef = function() {
    Box2D.Dynamics.Joints.b2JointDef.b2JointDef.apply(this, arguments);
    this.target = new b
  };
  I.prototype.b2MouseJointDef = function() {
    this.__super.b2JointDef.call(this);
    this.type = r.e_mouseJoint;
    this.maxForce = 0;
    this.frequencyHz = 5;
    this.dampingRatio = 0.7
  };
  Box2D.inherit(H, Box2D.Dynamics.Joints.b2Joint);
  H.prototype.__super = Box2D.Dynamics.Joints.b2Joint.prototype;
  H.b2PrismaticJoint = function() {
    Box2D.Dynamics.Joints.b2Joint.b2Joint.apply(this, arguments);
    this.m_localAnchor1 = new b;
    this.m_localAnchor2 = new b;
    this.m_localXAxis1 = new b;
    this.m_localYAxis1 = new b;
    this.m_axis = new b;
    this.m_perp = new b;
    this.m_K = new f;
    this.m_impulse = new g
  };
  H.prototype.GetAnchorA = function() {
    return this.m_bodyA.GetWorldPoint(this.m_localAnchor1)
  };
  H.prototype.GetAnchorB = function() {
    return this.m_bodyB.GetWorldPoint(this.m_localAnchor2)
  };
  H.prototype.GetReactionForce = function(a) {
    a === void 0 && (a = 0);
    return new b(a * (this.m_impulse.x * this.m_perp.x + (this.m_motorImpulse + this.m_impulse.z) * this.m_axis.x), a * (this.m_impulse.x * this.m_perp.y + (this.m_motorImpulse + this.m_impulse.z) * this.m_axis.y))
  };
  H.prototype.GetReactionTorque = function(a) {
    a === void 0 && (a = 0);
    return a * this.m_impulse.y
  };
  H.prototype.GetJointTranslation = function() {
    var a = this.m_bodyA, b = this.m_bodyB, d = a.GetWorldPoint(this.m_localAnchor1), e = b.GetWorldPoint(this.m_localAnchor2), b = e.x - d.x, d = e.y - d.y, a = a.GetWorldVector(this.m_localXAxis1);
    return a.x * b + a.y * d
  };
  H.prototype.GetJointSpeed = function() {
    var a = this.m_bodyA, b = this.m_bodyB, d;
    d = a.m_xf.R;
    var e = this.m_localAnchor1.x - a.m_sweep.localCenter.x, g = this.m_localAnchor1.y - a.m_sweep.localCenter.y, f = d.col1.x * e + d.col2.x * g, g = d.col1.y * e + d.col2.y * g, e = f;
    d = b.m_xf.R;
    var h = this.m_localAnchor2.x - b.m_sweep.localCenter.x, j = this.m_localAnchor2.y - b.m_sweep.localCenter.y, f = d.col1.x * h + d.col2.x * j, j = d.col1.y * h + d.col2.y * j, h = f;
    d = b.m_sweep.c.x + h - (a.m_sweep.c.x + e);
    var f = b.m_sweep.c.y + j - (a.m_sweep.c.y + g), k = a.GetWorldVector(this.m_localXAxis1), n = a.m_linearVelocity, l = b.m_linearVelocity, a = a.m_angularVelocity, b = b.m_angularVelocity;
    return d * -a * k.y + f * a * k.x + (k.x * (l.x + -b * j - n.x - -a * g) + k.y * (l.y + b * h - n.y - a * e))
  };
  H.prototype.IsLimitEnabled = function() {
    return this.m_enableLimit
  };
  H.prototype.EnableLimit = function(a) {
    this.m_bodyA.SetAwake(!0);
    this.m_bodyB.SetAwake(!0);
    this.m_enableLimit = a
  };
  H.prototype.GetLowerLimit = function() {
    return this.m_lowerTranslation
  };
  H.prototype.GetUpperLimit = function() {
    return this.m_upperTranslation
  };
  H.prototype.SetLimits = function(a, b) {
    a === void 0 && (a = 0);
    b === void 0 && (b = 0);
    this.m_bodyA.SetAwake(!0);
    this.m_bodyB.SetAwake(!0);
    this.m_lowerTranslation = a;
    this.m_upperTranslation = b
  };
  H.prototype.IsMotorEnabled = function() {
    return this.m_enableMotor
  };
  H.prototype.EnableMotor = function(a) {
    this.m_bodyA.SetAwake(!0);
    this.m_bodyB.SetAwake(!0);
    this.m_enableMotor = a
  };
  H.prototype.SetMotorSpeed = function(a) {
    a === void 0 && (a = 0);
    this.m_bodyA.SetAwake(!0);
    this.m_bodyB.SetAwake(!0);
    this.m_motorSpeed = a
  };
  H.prototype.GetMotorSpeed = function() {
    return this.m_motorSpeed
  };
  H.prototype.SetMaxMotorForce = function(a) {
    a === void 0 && (a = 0);
    this.m_bodyA.SetAwake(!0);
    this.m_bodyB.SetAwake(!0);
    this.m_maxMotorForce = a
  };
  H.prototype.GetMotorForce = function() {
    return this.m_motorImpulse
  };
  H.prototype.b2PrismaticJoint = function(a) {
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
    this.m_limitState = r.e_inactiveLimit;
    this.m_axis.SetZero();
    this.m_perp.SetZero()
  };
  H.prototype.InitVelocityConstraints = function(b) {
    var e = this.m_bodyA, g = this.m_bodyB, f, h = 0;
    this.m_localCenterA.SetV(e.GetLocalCenter());
    this.m_localCenterB.SetV(g.GetLocalCenter());
    var j = e.GetTransform();
    g.GetTransform();
    f = e.m_xf.R;
    var k = this.m_localAnchor1.x - this.m_localCenterA.x, n = this.m_localAnchor1.y - this.m_localCenterA.y, h = f.col1.x * k + f.col2.x * n, n = f.col1.y * k + f.col2.y * n, k = h;
    f = g.m_xf.R;
    var l = this.m_localAnchor2.x - this.m_localCenterB.x, o = this.m_localAnchor2.y - this.m_localCenterB.y, h = f.col1.x * l + f.col2.x * o, o = f.col1.y * l + f.col2.y * o, l = h;
    f = g.m_sweep.c.x + l - e.m_sweep.c.x - k;
    h = g.m_sweep.c.y + o - e.m_sweep.c.y - n;
    this.m_invMassA = e.m_invMass;
    this.m_invMassB = g.m_invMass;
    this.m_invIA = e.m_invI;
    this.m_invIB = g.m_invI;
    this.m_axis.SetV(d.MulMV(j.R, this.m_localXAxis1));
    this.m_a1 = (f + k) * this.m_axis.y - (h + n) * this.m_axis.x;
    this.m_a2 = l * this.m_axis.y - o * this.m_axis.x;
    this.m_motorMass = this.m_invMassA + this.m_invMassB + this.m_invIA * this.m_a1 * this.m_a1 + this.m_invIB * this.m_a2 * this.m_a2;
    if(this.m_motorMass > Number.MIN_VALUE) {
      this.m_motorMass = 1 / this.m_motorMass
    }
    this.m_perp.SetV(d.MulMV(j.R, this.m_localYAxis1));
    this.m_s1 = (f + k) * this.m_perp.y - (h + n) * this.m_perp.x;
    this.m_s2 = l * this.m_perp.y - o * this.m_perp.x;
    j = this.m_invMassA;
    k = this.m_invMassB;
    n = this.m_invIA;
    l = this.m_invIB;
    this.m_K.col1.x = j + k + n * this.m_s1 * this.m_s1 + l * this.m_s2 * this.m_s2;
    this.m_K.col1.y = n * this.m_s1 + l * this.m_s2;
    this.m_K.col1.z = n * this.m_s1 * this.m_a1 + l * this.m_s2 * this.m_a2;
    this.m_K.col2.x = this.m_K.col1.y;
    this.m_K.col2.y = n + l;
    this.m_K.col2.z = n * this.m_a1 + l * this.m_a2;
    this.m_K.col3.x = this.m_K.col1.z;
    this.m_K.col3.y = this.m_K.col2.z;
    this.m_K.col3.z = j + k + n * this.m_a1 * this.m_a1 + l * this.m_a2 * this.m_a2;
    if(this.m_enableLimit) {
      if(f = this.m_axis.x * f + this.m_axis.y * h, d.Abs(this.m_upperTranslation - this.m_lowerTranslation) < 2 * a.b2_linearSlop) {
        this.m_limitState = r.e_equalLimits
      }else {
        if(f <= this.m_lowerTranslation) {
          if(this.m_limitState != r.e_atLowerLimit) {
            this.m_limitState = r.e_atLowerLimit, this.m_impulse.z = 0
          }
        }else {
          if(f >= this.m_upperTranslation) {
            if(this.m_limitState != r.e_atUpperLimit) {
              this.m_limitState = r.e_atUpperLimit, this.m_impulse.z = 0
            }
          }else {
            this.m_limitState = r.e_inactiveLimit, this.m_impulse.z = 0
          }
        }
      }
    }else {
      this.m_limitState = r.e_inactiveLimit
    }
    if(this.m_enableMotor == !1) {
      this.m_motorImpulse = 0
    }
    b.warmStarting ? (this.m_impulse.x *= b.dtRatio, this.m_impulse.y *= b.dtRatio, this.m_motorImpulse *= b.dtRatio, b = this.m_impulse.x * this.m_perp.x + (this.m_motorImpulse + this.m_impulse.z) * this.m_axis.x, f = this.m_impulse.x * this.m_perp.y + (this.m_motorImpulse + this.m_impulse.z) * this.m_axis.y, h = this.m_impulse.x * this.m_s1 + this.m_impulse.y + (this.m_motorImpulse + this.m_impulse.z) * this.m_a1, j = this.m_impulse.x * this.m_s2 + this.m_impulse.y + (this.m_motorImpulse + this.m_impulse.z) * 
    this.m_a2, e.m_linearVelocity.x -= this.m_invMassA * b, e.m_linearVelocity.y -= this.m_invMassA * f, e.m_angularVelocity -= this.m_invIA * h, g.m_linearVelocity.x += this.m_invMassB * b, g.m_linearVelocity.y += this.m_invMassB * f, g.m_angularVelocity += this.m_invIB * j) : (this.m_impulse.SetZero(), this.m_motorImpulse = 0)
  };
  H.prototype.SolveVelocityConstraints = function(a) {
    var e = this.m_bodyA, f = this.m_bodyB, h = e.m_linearVelocity, j = e.m_angularVelocity, k = f.m_linearVelocity, n = f.m_angularVelocity, l = 0, o = 0, q = 0, s = 0;
    if(this.m_enableMotor && this.m_limitState != r.e_equalLimits) {
      s = this.m_motorMass * (this.m_motorSpeed - (this.m_axis.x * (k.x - h.x) + this.m_axis.y * (k.y - h.y) + this.m_a2 * n - this.m_a1 * j)), l = this.m_motorImpulse, a = a.dt * this.m_maxMotorForce, this.m_motorImpulse = d.Clamp(this.m_motorImpulse + s, -a, a), s = this.m_motorImpulse - l, l = s * this.m_axis.x, o = s * this.m_axis.y, q = s * this.m_a1, s *= this.m_a2, h.x -= this.m_invMassA * l, h.y -= this.m_invMassA * o, j -= this.m_invIA * q, k.x += this.m_invMassB * l, k.y += this.m_invMassB * 
      o, n += this.m_invIB * s
    }
    q = this.m_perp.x * (k.x - h.x) + this.m_perp.y * (k.y - h.y) + this.m_s2 * n - this.m_s1 * j;
    o = n - j;
    if(this.m_enableLimit && this.m_limitState != r.e_inactiveLimit) {
      a = this.m_axis.x * (k.x - h.x) + this.m_axis.y * (k.y - h.y) + this.m_a2 * n - this.m_a1 * j;
      l = this.m_impulse.Copy();
      a = this.m_K.Solve33(new g, -q, -o, -a);
      this.m_impulse.Add(a);
      if(this.m_limitState == r.e_atLowerLimit) {
        this.m_impulse.z = d.Max(this.m_impulse.z, 0)
      }else {
        if(this.m_limitState == r.e_atUpperLimit) {
          this.m_impulse.z = d.Min(this.m_impulse.z, 0)
        }
      }
      q = -q - (this.m_impulse.z - l.z) * this.m_K.col3.x;
      o = -o - (this.m_impulse.z - l.z) * this.m_K.col3.y;
      o = this.m_K.Solve22(new b, q, o);
      o.x += l.x;
      o.y += l.y;
      this.m_impulse.x = o.x;
      this.m_impulse.y = o.y;
      a.x = this.m_impulse.x - l.x;
      a.y = this.m_impulse.y - l.y;
      a.z = this.m_impulse.z - l.z;
      l = a.x * this.m_perp.x + a.z * this.m_axis.x;
      o = a.x * this.m_perp.y + a.z * this.m_axis.y;
      q = a.x * this.m_s1 + a.y + a.z * this.m_a1;
      s = a.x * this.m_s2 + a.y + a.z * this.m_a2
    }else {
      a = this.m_K.Solve22(new b, -q, -o), this.m_impulse.x += a.x, this.m_impulse.y += a.y, l = a.x * this.m_perp.x, o = a.x * this.m_perp.y, q = a.x * this.m_s1 + a.y, s = a.x * this.m_s2 + a.y
    }
    h.x -= this.m_invMassA * l;
    h.y -= this.m_invMassA * o;
    j -= this.m_invIA * q;
    k.x += this.m_invMassB * l;
    k.y += this.m_invMassB * o;
    n += this.m_invIB * s;
    e.m_linearVelocity.SetV(h);
    e.m_angularVelocity = j;
    f.m_linearVelocity.SetV(k);
    f.m_angularVelocity = n
  };
  H.prototype.SolvePositionConstraints = function() {
    var f = this.m_bodyA, h = this.m_bodyB, j = f.m_sweep.c, k = f.m_sweep.a, n = h.m_sweep.c, l = h.m_sweep.a, o, r = 0, w = 0, q = 0, s = r = o = 0, t = 0, w = !1, v = 0, y = e.FromAngle(k), x = e.FromAngle(l);
    o = y;
    var t = this.m_localAnchor1.x - this.m_localCenterA.x, B = this.m_localAnchor1.y - this.m_localCenterA.y, r = o.col1.x * t + o.col2.x * B, B = o.col1.y * t + o.col2.y * B, t = r;
    o = x;
    x = this.m_localAnchor2.x - this.m_localCenterB.x;
    q = this.m_localAnchor2.y - this.m_localCenterB.y;
    r = o.col1.x * x + o.col2.x * q;
    q = o.col1.y * x + o.col2.y * q;
    x = r;
    o = n.x + x - j.x - t;
    r = n.y + q - j.y - B;
    if(this.m_enableLimit) {
      this.m_axis = d.MulMV(y, this.m_localXAxis1);
      this.m_a1 = (o + t) * this.m_axis.y - (r + B) * this.m_axis.x;
      this.m_a2 = x * this.m_axis.y - q * this.m_axis.x;
      var z = this.m_axis.x * o + this.m_axis.y * r;
      d.Abs(this.m_upperTranslation - this.m_lowerTranslation) < 2 * a.b2_linearSlop ? (v = d.Clamp(z, -a.b2_maxLinearCorrection, a.b2_maxLinearCorrection), s = d.Abs(z), w = !0) : z <= this.m_lowerTranslation ? (v = d.Clamp(z - this.m_lowerTranslation + a.b2_linearSlop, -a.b2_maxLinearCorrection, 0), s = this.m_lowerTranslation - z, w = !0) : z >= this.m_upperTranslation && (v = d.Clamp(z - this.m_upperTranslation + a.b2_linearSlop, 0, a.b2_maxLinearCorrection), s = z - this.m_upperTranslation, 
      w = !0)
    }
    this.m_perp = d.MulMV(y, this.m_localYAxis1);
    this.m_s1 = (o + t) * this.m_perp.y - (r + B) * this.m_perp.x;
    this.m_s2 = x * this.m_perp.y - q * this.m_perp.x;
    y = new g;
    B = this.m_perp.x * o + this.m_perp.y * r;
    x = l - k - this.m_refAngle;
    s = d.Max(s, d.Abs(B));
    t = d.Abs(x);
    w ? (w = this.m_invMassA, q = this.m_invMassB, o = this.m_invIA, r = this.m_invIB, this.m_K.col1.x = w + q + o * this.m_s1 * this.m_s1 + r * this.m_s2 * this.m_s2, this.m_K.col1.y = o * this.m_s1 + r * this.m_s2, this.m_K.col1.z = o * this.m_s1 * this.m_a1 + r * this.m_s2 * this.m_a2, this.m_K.col2.x = this.m_K.col1.y, this.m_K.col2.y = o + r, this.m_K.col2.z = o * this.m_a1 + r * this.m_a2, this.m_K.col3.x = this.m_K.col1.z, this.m_K.col3.y = this.m_K.col2.z, this.m_K.col3.z = w + q + o * this.m_a1 * 
    this.m_a1 + r * this.m_a2 * this.m_a2, this.m_K.Solve33(y, -B, -x, -v)) : (w = this.m_invMassA, q = this.m_invMassB, o = this.m_invIA, r = this.m_invIB, v = o * this.m_s1 + r * this.m_s2, z = o + r, this.m_K.col1.Set(w + q + o * this.m_s1 * this.m_s1 + r * this.m_s2 * this.m_s2, v, 0), this.m_K.col2.Set(v, z, 0), v = this.m_K.Solve22(new b, -B, -x), y.x = v.x, y.y = v.y, y.z = 0);
    v = y.x * this.m_perp.x + y.z * this.m_axis.x;
    w = y.x * this.m_perp.y + y.z * this.m_axis.y;
    B = y.x * this.m_s1 + y.y + y.z * this.m_a1;
    y = y.x * this.m_s2 + y.y + y.z * this.m_a2;
    j.x -= this.m_invMassA * v;
    j.y -= this.m_invMassA * w;
    k -= this.m_invIA * B;
    n.x += this.m_invMassB * v;
    n.y += this.m_invMassB * w;
    l += this.m_invIB * y;
    f.m_sweep.a = k;
    h.m_sweep.a = l;
    f.SynchronizeTransform();
    h.SynchronizeTransform();
    return s <= a.b2_linearSlop && t <= a.b2_angularSlop
  };
  Box2D.inherit(J, Box2D.Dynamics.Joints.b2JointDef);
  J.prototype.__super = Box2D.Dynamics.Joints.b2JointDef.prototype;
  J.b2PrismaticJointDef = function() {
    Box2D.Dynamics.Joints.b2JointDef.b2JointDef.apply(this, arguments);
    this.localAnchorA = new b;
    this.localAnchorB = new b;
    this.localAxisA = new b
  };
  J.prototype.b2PrismaticJointDef = function() {
    this.__super.b2JointDef.call(this);
    this.type = r.e_prismaticJoint;
    this.localAxisA.Set(1, 0);
    this.referenceAngle = 0;
    this.enableLimit = !1;
    this.upperTranslation = this.lowerTranslation = 0;
    this.enableMotor = !1;
    this.motorSpeed = this.maxMotorForce = 0
  };
  J.prototype.Initialize = function(a, b, d, e) {
    this.bodyA = a;
    this.bodyB = b;
    this.localAnchorA = this.bodyA.GetLocalPoint(d);
    this.localAnchorB = this.bodyB.GetLocalPoint(d);
    this.localAxisA = this.bodyA.GetLocalVector(e);
    this.referenceAngle = this.bodyB.GetAngle() - this.bodyA.GetAngle()
  };
  Box2D.inherit(o, Box2D.Dynamics.Joints.b2Joint);
  o.prototype.__super = Box2D.Dynamics.Joints.b2Joint.prototype;
  o.b2PulleyJoint = function() {
    Box2D.Dynamics.Joints.b2Joint.b2Joint.apply(this, arguments);
    this.m_groundAnchor1 = new b;
    this.m_groundAnchor2 = new b;
    this.m_localAnchor1 = new b;
    this.m_localAnchor2 = new b;
    this.m_u1 = new b;
    this.m_u2 = new b
  };
  o.prototype.GetAnchorA = function() {
    return this.m_bodyA.GetWorldPoint(this.m_localAnchor1)
  };
  o.prototype.GetAnchorB = function() {
    return this.m_bodyB.GetWorldPoint(this.m_localAnchor2)
  };
  o.prototype.GetReactionForce = function(a) {
    a === void 0 && (a = 0);
    return new b(a * this.m_impulse * this.m_u2.x, a * this.m_impulse * this.m_u2.y)
  };
  o.prototype.GetReactionTorque = function() {
    return 0
  };
  o.prototype.GetGroundAnchorA = function() {
    var a = this.m_ground.m_xf.position.Copy();
    a.Add(this.m_groundAnchor1);
    return a
  };
  o.prototype.GetGroundAnchorB = function() {
    var a = this.m_ground.m_xf.position.Copy();
    a.Add(this.m_groundAnchor2);
    return a
  };
  o.prototype.GetLength1 = function() {
    var a = this.m_bodyA.GetWorldPoint(this.m_localAnchor1), b = a.x - (this.m_ground.m_xf.position.x + this.m_groundAnchor1.x), a = a.y - (this.m_ground.m_xf.position.y + this.m_groundAnchor1.y);
    return Math.sqrt(b * b + a * a)
  };
  o.prototype.GetLength2 = function() {
    var a = this.m_bodyB.GetWorldPoint(this.m_localAnchor2), b = a.x - (this.m_ground.m_xf.position.x + this.m_groundAnchor2.x), a = a.y - (this.m_ground.m_xf.position.y + this.m_groundAnchor2.y);
    return Math.sqrt(b * b + a * a)
  };
  o.prototype.GetRatio = function() {
    return this.m_ratio
  };
  o.prototype.b2PulleyJoint = function(a) {
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
    this.m_maxLength1 = d.Min(a.maxLengthA, this.m_constant - this.m_ratio * o.b2_minPulleyLength);
    this.m_maxLength2 = d.Min(a.maxLengthB, (this.m_constant - o.b2_minPulleyLength) / this.m_ratio);
    this.m_limitImpulse2 = this.m_limitImpulse1 = this.m_impulse = 0
  };
  o.prototype.InitVelocityConstraints = function(b) {
    var d = this.m_bodyA, e = this.m_bodyB, f;
    f = d.m_xf.R;
    var g = this.m_localAnchor1.x - d.m_sweep.localCenter.x, h = this.m_localAnchor1.y - d.m_sweep.localCenter.y, j = f.col1.x * g + f.col2.x * h, h = f.col1.y * g + f.col2.y * h, g = j;
    f = e.m_xf.R;
    var k = this.m_localAnchor2.x - e.m_sweep.localCenter.x, n = this.m_localAnchor2.y - e.m_sweep.localCenter.y, j = f.col1.x * k + f.col2.x * n, n = f.col1.y * k + f.col2.y * n, k = j;
    f = e.m_sweep.c.x + k;
    var j = e.m_sweep.c.y + n, l = this.m_ground.m_xf.position.x + this.m_groundAnchor2.x, o = this.m_ground.m_xf.position.y + this.m_groundAnchor2.y;
    this.m_u1.Set(d.m_sweep.c.x + g - (this.m_ground.m_xf.position.x + this.m_groundAnchor1.x), d.m_sweep.c.y + h - (this.m_ground.m_xf.position.y + this.m_groundAnchor1.y));
    this.m_u2.Set(f - l, j - o);
    f = this.m_u1.Length();
    j = this.m_u2.Length();
    f > a.b2_linearSlop ? this.m_u1.Multiply(1 / f) : this.m_u1.SetZero();
    j > a.b2_linearSlop ? this.m_u2.Multiply(1 / j) : this.m_u2.SetZero();
    this.m_constant - f - this.m_ratio * j > 0 ? (this.m_state = r.e_inactiveLimit, this.m_impulse = 0) : this.m_state = r.e_atUpperLimit;
    f < this.m_maxLength1 ? (this.m_limitState1 = r.e_inactiveLimit, this.m_limitImpulse1 = 0) : this.m_limitState1 = r.e_atUpperLimit;
    j < this.m_maxLength2 ? (this.m_limitState2 = r.e_inactiveLimit, this.m_limitImpulse2 = 0) : this.m_limitState2 = r.e_atUpperLimit;
    f = g * this.m_u1.y - h * this.m_u1.x;
    j = k * this.m_u2.y - n * this.m_u2.x;
    this.m_limitMass1 = d.m_invMass + d.m_invI * f * f;
    this.m_limitMass2 = e.m_invMass + e.m_invI * j * j;
    this.m_pulleyMass = this.m_limitMass1 + this.m_ratio * this.m_ratio * this.m_limitMass2;
    this.m_limitMass1 = 1 / this.m_limitMass1;
    this.m_limitMass2 = 1 / this.m_limitMass2;
    this.m_pulleyMass = 1 / this.m_pulleyMass;
    b.warmStarting ? (this.m_impulse *= b.dtRatio, this.m_limitImpulse1 *= b.dtRatio, this.m_limitImpulse2 *= b.dtRatio, b = (-this.m_impulse - this.m_limitImpulse1) * this.m_u1.x, f = (-this.m_impulse - this.m_limitImpulse1) * this.m_u1.y, j = (-this.m_ratio * this.m_impulse - this.m_limitImpulse2) * this.m_u2.x, l = (-this.m_ratio * this.m_impulse - this.m_limitImpulse2) * this.m_u2.y, d.m_linearVelocity.x += d.m_invMass * b, d.m_linearVelocity.y += d.m_invMass * f, d.m_angularVelocity += d.m_invI * 
    (g * f - h * b), e.m_linearVelocity.x += e.m_invMass * j, e.m_linearVelocity.y += e.m_invMass * l, e.m_angularVelocity += e.m_invI * (k * l - n * j)) : this.m_limitImpulse2 = this.m_limitImpulse1 = this.m_impulse = 0
  };
  o.prototype.SolveVelocityConstraints = function() {
    var a = this.m_bodyA, b = this.m_bodyB, e;
    e = a.m_xf.R;
    var f = this.m_localAnchor1.x - a.m_sweep.localCenter.x, g = this.m_localAnchor1.y - a.m_sweep.localCenter.y, h = e.col1.x * f + e.col2.x * g, g = e.col1.y * f + e.col2.y * g, f = h;
    e = b.m_xf.R;
    var j = this.m_localAnchor2.x - b.m_sweep.localCenter.x, k = this.m_localAnchor2.y - b.m_sweep.localCenter.y, h = e.col1.x * j + e.col2.x * k, k = e.col1.y * j + e.col2.y * k, j = h, n = h = e = 0, l = 0;
    e = l = e = l = n = h = e = 0;
    if(this.m_state == r.e_atUpperLimit) {
      e = a.m_linearVelocity.x + -a.m_angularVelocity * g, h = a.m_linearVelocity.y + a.m_angularVelocity * f, n = b.m_linearVelocity.x + -b.m_angularVelocity * k, l = b.m_linearVelocity.y + b.m_angularVelocity * j, e = -(this.m_u1.x * e + this.m_u1.y * h) - this.m_ratio * (this.m_u2.x * n + this.m_u2.y * l), l = this.m_pulleyMass * -e, e = this.m_impulse, this.m_impulse = d.Max(0, this.m_impulse + l), l = this.m_impulse - e, e = -l * this.m_u1.x, h = -l * this.m_u1.y, n = -this.m_ratio * l * this.m_u2.x, 
      l = -this.m_ratio * l * this.m_u2.y, a.m_linearVelocity.x += a.m_invMass * e, a.m_linearVelocity.y += a.m_invMass * h, a.m_angularVelocity += a.m_invI * (f * h - g * e), b.m_linearVelocity.x += b.m_invMass * n, b.m_linearVelocity.y += b.m_invMass * l, b.m_angularVelocity += b.m_invI * (j * l - k * n)
    }
    if(this.m_limitState1 == r.e_atUpperLimit) {
      e = a.m_linearVelocity.x + -a.m_angularVelocity * g, h = a.m_linearVelocity.y + a.m_angularVelocity * f, e = -(this.m_u1.x * e + this.m_u1.y * h), l = -this.m_limitMass1 * e, e = this.m_limitImpulse1, this.m_limitImpulse1 = d.Max(0, this.m_limitImpulse1 + l), l = this.m_limitImpulse1 - e, e = -l * this.m_u1.x, h = -l * this.m_u1.y, a.m_linearVelocity.x += a.m_invMass * e, a.m_linearVelocity.y += a.m_invMass * h, a.m_angularVelocity += a.m_invI * (f * h - g * e)
    }
    if(this.m_limitState2 == r.e_atUpperLimit) {
      n = b.m_linearVelocity.x + -b.m_angularVelocity * k, l = b.m_linearVelocity.y + b.m_angularVelocity * j, e = -(this.m_u2.x * n + this.m_u2.y * l), l = -this.m_limitMass2 * e, e = this.m_limitImpulse2, this.m_limitImpulse2 = d.Max(0, this.m_limitImpulse2 + l), l = this.m_limitImpulse2 - e, n = -l * this.m_u2.x, l = -l * this.m_u2.y, b.m_linearVelocity.x += b.m_invMass * n, b.m_linearVelocity.y += b.m_invMass * l, b.m_angularVelocity += b.m_invI * (j * l - k * n)
    }
  };
  o.prototype.SolvePositionConstraints = function() {
    var b = this.m_bodyA, e = this.m_bodyB, f, g = this.m_ground.m_xf.position.x + this.m_groundAnchor1.x, h = this.m_ground.m_xf.position.y + this.m_groundAnchor1.y, j = this.m_ground.m_xf.position.x + this.m_groundAnchor2.x, k = this.m_ground.m_xf.position.y + this.m_groundAnchor2.y, l = 0, n = 0, o = 0, q = 0, s = f = 0, t = 0, v = 0, y = s = v = f = s = f = 0;
    if(this.m_state == r.e_atUpperLimit) {
      f = b.m_xf.R, l = this.m_localAnchor1.x - b.m_sweep.localCenter.x, n = this.m_localAnchor1.y - b.m_sweep.localCenter.y, s = f.col1.x * l + f.col2.x * n, n = f.col1.y * l + f.col2.y * n, l = s, f = e.m_xf.R, o = this.m_localAnchor2.x - e.m_sweep.localCenter.x, q = this.m_localAnchor2.y - e.m_sweep.localCenter.y, s = f.col1.x * o + f.col2.x * q, q = f.col1.y * o + f.col2.y * q, o = s, f = b.m_sweep.c.x + l, s = b.m_sweep.c.y + n, t = e.m_sweep.c.x + o, v = e.m_sweep.c.y + q, this.m_u1.Set(f - 
      g, s - h), this.m_u2.Set(t - j, v - k), f = this.m_u1.Length(), s = this.m_u2.Length(), f > a.b2_linearSlop ? this.m_u1.Multiply(1 / f) : this.m_u1.SetZero(), s > a.b2_linearSlop ? this.m_u2.Multiply(1 / s) : this.m_u2.SetZero(), f = this.m_constant - f - this.m_ratio * s, y = d.Max(y, -f), f = d.Clamp(f + a.b2_linearSlop, -a.b2_maxLinearCorrection, 0), v = -this.m_pulleyMass * f, f = -v * this.m_u1.x, s = -v * this.m_u1.y, t = -this.m_ratio * v * this.m_u2.x, v = -this.m_ratio * v * this.m_u2.y, 
      b.m_sweep.c.x += b.m_invMass * f, b.m_sweep.c.y += b.m_invMass * s, b.m_sweep.a += b.m_invI * (l * s - n * f), e.m_sweep.c.x += e.m_invMass * t, e.m_sweep.c.y += e.m_invMass * v, e.m_sweep.a += e.m_invI * (o * v - q * t), b.SynchronizeTransform(), e.SynchronizeTransform()
    }
    if(this.m_limitState1 == r.e_atUpperLimit) {
      f = b.m_xf.R, l = this.m_localAnchor1.x - b.m_sweep.localCenter.x, n = this.m_localAnchor1.y - b.m_sweep.localCenter.y, s = f.col1.x * l + f.col2.x * n, n = f.col1.y * l + f.col2.y * n, l = s, f = b.m_sweep.c.x + l, s = b.m_sweep.c.y + n, this.m_u1.Set(f - g, s - h), f = this.m_u1.Length(), f > a.b2_linearSlop ? (this.m_u1.x *= 1 / f, this.m_u1.y *= 1 / f) : this.m_u1.SetZero(), f = this.m_maxLength1 - f, y = d.Max(y, -f), f = d.Clamp(f + a.b2_linearSlop, -a.b2_maxLinearCorrection, 0), v = 
      -this.m_limitMass1 * f, f = -v * this.m_u1.x, s = -v * this.m_u1.y, b.m_sweep.c.x += b.m_invMass * f, b.m_sweep.c.y += b.m_invMass * s, b.m_sweep.a += b.m_invI * (l * s - n * f), b.SynchronizeTransform()
    }
    if(this.m_limitState2 == r.e_atUpperLimit) {
      f = e.m_xf.R, o = this.m_localAnchor2.x - e.m_sweep.localCenter.x, q = this.m_localAnchor2.y - e.m_sweep.localCenter.y, s = f.col1.x * o + f.col2.x * q, q = f.col1.y * o + f.col2.y * q, o = s, t = e.m_sweep.c.x + o, v = e.m_sweep.c.y + q, this.m_u2.Set(t - j, v - k), s = this.m_u2.Length(), s > a.b2_linearSlop ? (this.m_u2.x *= 1 / s, this.m_u2.y *= 1 / s) : this.m_u2.SetZero(), f = this.m_maxLength2 - s, y = d.Max(y, -f), f = d.Clamp(f + a.b2_linearSlop, -a.b2_maxLinearCorrection, 0), v = 
      -this.m_limitMass2 * f, t = -v * this.m_u2.x, v = -v * this.m_u2.y, e.m_sweep.c.x += e.m_invMass * t, e.m_sweep.c.y += e.m_invMass * v, e.m_sweep.a += e.m_invI * (o * v - q * t), e.SynchronizeTransform()
    }
    return y < a.b2_linearSlop
  };
  Box2D.postDefs.push(function() {
    Box2D.Dynamics.Joints.b2PulleyJoint.b2_minPulleyLength = 2
  });
  Box2D.inherit(x, Box2D.Dynamics.Joints.b2JointDef);
  x.prototype.__super = Box2D.Dynamics.Joints.b2JointDef.prototype;
  x.b2PulleyJointDef = function() {
    Box2D.Dynamics.Joints.b2JointDef.b2JointDef.apply(this, arguments);
    this.groundAnchorA = new b;
    this.groundAnchorB = new b;
    this.localAnchorA = new b;
    this.localAnchorB = new b
  };
  x.prototype.b2PulleyJointDef = function() {
    this.__super.b2JointDef.call(this);
    this.type = r.e_pulleyJoint;
    this.groundAnchorA.Set(-1, 1);
    this.groundAnchorB.Set(1, 1);
    this.localAnchorA.Set(-1, 0);
    this.localAnchorB.Set(1, 0);
    this.maxLengthB = this.lengthB = this.maxLengthA = this.lengthA = 0;
    this.ratio = 1;
    this.collideConnected = !0
  };
  x.prototype.Initialize = function(a, b, d, e, f, g, h) {
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
    this.maxLengthA = h - this.ratio * o.b2_minPulleyLength;
    this.maxLengthB = (h - o.b2_minPulleyLength) / this.ratio
  };
  Box2D.inherit(t, Box2D.Dynamics.Joints.b2Joint);
  t.prototype.__super = Box2D.Dynamics.Joints.b2Joint.prototype;
  t.b2RevoluteJoint = function() {
    Box2D.Dynamics.Joints.b2Joint.b2Joint.apply(this, arguments);
    this.K = new e;
    this.K1 = new e;
    this.K2 = new e;
    this.K3 = new e;
    this.impulse3 = new g;
    this.impulse2 = new b;
    this.reduced = new b;
    this.m_localAnchor1 = new b;
    this.m_localAnchor2 = new b;
    this.m_impulse = new g;
    this.m_mass = new f
  };
  t.prototype.GetAnchorA = function() {
    return this.m_bodyA.GetWorldPoint(this.m_localAnchor1)
  };
  t.prototype.GetAnchorB = function() {
    return this.m_bodyB.GetWorldPoint(this.m_localAnchor2)
  };
  t.prototype.GetReactionForce = function(a) {
    a === void 0 && (a = 0);
    return new b(a * this.m_impulse.x, a * this.m_impulse.y)
  };
  t.prototype.GetReactionTorque = function(a) {
    a === void 0 && (a = 0);
    return a * this.m_impulse.z
  };
  t.prototype.GetJointAngle = function() {
    return this.m_bodyB.m_sweep.a - this.m_bodyA.m_sweep.a - this.m_referenceAngle
  };
  t.prototype.GetJointSpeed = function() {
    return this.m_bodyB.m_angularVelocity - this.m_bodyA.m_angularVelocity
  };
  t.prototype.IsLimitEnabled = function() {
    return this.m_enableLimit
  };
  t.prototype.EnableLimit = function(a) {
    this.m_enableLimit = a
  };
  t.prototype.GetLowerLimit = function() {
    return this.m_lowerAngle
  };
  t.prototype.GetUpperLimit = function() {
    return this.m_upperAngle
  };
  t.prototype.SetLimits = function(a, b) {
    a === void 0 && (a = 0);
    b === void 0 && (b = 0);
    this.m_lowerAngle = a;
    this.m_upperAngle = b
  };
  t.prototype.IsMotorEnabled = function() {
    this.m_bodyA.SetAwake(!0);
    this.m_bodyB.SetAwake(!0);
    return this.m_enableMotor
  };
  t.prototype.EnableMotor = function(a) {
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
  t.prototype.SetMaxMotorTorque = function(a) {
    a === void 0 && (a = 0);
    this.m_maxMotorTorque = a
  };
  t.prototype.GetMotorTorque = function() {
    return this.m_maxMotorTorque
  };
  t.prototype.b2RevoluteJoint = function(a) {
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
    this.m_limitState = r.e_inactiveLimit
  };
  t.prototype.InitVelocityConstraints = function(b) {
    var e = this.m_bodyA, f = this.m_bodyB, g, h = 0;
    g = e.m_xf.R;
    var j = this.m_localAnchor1.x - e.m_sweep.localCenter.x, k = this.m_localAnchor1.y - e.m_sweep.localCenter.y, h = g.col1.x * j + g.col2.x * k, k = g.col1.y * j + g.col2.y * k, j = h;
    g = f.m_xf.R;
    var l = this.m_localAnchor2.x - f.m_sweep.localCenter.x, n = this.m_localAnchor2.y - f.m_sweep.localCenter.y, h = g.col1.x * l + g.col2.x * n, n = g.col1.y * l + g.col2.y * n, l = h;
    g = e.m_invMass;
    var h = f.m_invMass, o = e.m_invI, q = f.m_invI;
    this.m_mass.col1.x = g + h + k * k * o + n * n * q;
    this.m_mass.col2.x = -k * j * o - n * l * q;
    this.m_mass.col3.x = -k * o - n * q;
    this.m_mass.col1.y = this.m_mass.col2.x;
    this.m_mass.col2.y = g + h + j * j * o + l * l * q;
    this.m_mass.col3.y = j * o + l * q;
    this.m_mass.col1.z = this.m_mass.col3.x;
    this.m_mass.col2.z = this.m_mass.col3.y;
    this.m_mass.col3.z = o + q;
    this.m_motorMass = 1 / (o + q);
    if(this.m_enableMotor == !1) {
      this.m_motorImpulse = 0
    }
    if(this.m_enableLimit) {
      var s = f.m_sweep.a - e.m_sweep.a - this.m_referenceAngle;
      if(d.Abs(this.m_upperAngle - this.m_lowerAngle) < 2 * a.b2_angularSlop) {
        this.m_limitState = r.e_equalLimits
      }else {
        if(s <= this.m_lowerAngle) {
          if(this.m_limitState != r.e_atLowerLimit) {
            this.m_impulse.z = 0
          }
          this.m_limitState = r.e_atLowerLimit
        }else {
          if(s >= this.m_upperAngle) {
            if(this.m_limitState != r.e_atUpperLimit) {
              this.m_impulse.z = 0
            }
            this.m_limitState = r.e_atUpperLimit
          }else {
            this.m_limitState = r.e_inactiveLimit, this.m_impulse.z = 0
          }
        }
      }
    }else {
      this.m_limitState = r.e_inactiveLimit
    }
    b.warmStarting ? (this.m_impulse.x *= b.dtRatio, this.m_impulse.y *= b.dtRatio, this.m_motorImpulse *= b.dtRatio, b = this.m_impulse.x, s = this.m_impulse.y, e.m_linearVelocity.x -= g * b, e.m_linearVelocity.y -= g * s, e.m_angularVelocity -= o * (j * s - k * b + this.m_motorImpulse + this.m_impulse.z), f.m_linearVelocity.x += h * b, f.m_linearVelocity.y += h * s, f.m_angularVelocity += q * (l * s - n * b + this.m_motorImpulse + this.m_impulse.z)) : (this.m_impulse.SetZero(), this.m_motorImpulse = 
    0)
  };
  t.prototype.SolveVelocityConstraints = function(a) {
    var b = this.m_bodyA, e = this.m_bodyB, f = 0, g = f = 0, h = 0, j = 0, k = 0, l = b.m_linearVelocity, n = b.m_angularVelocity, o = e.m_linearVelocity, q = e.m_angularVelocity, s = b.m_invMass, t = e.m_invMass, v = b.m_invI, y = e.m_invI;
    if(this.m_enableMotor && this.m_limitState != r.e_equalLimits) {
      g = this.m_motorMass * -(q - n - this.m_motorSpeed), h = this.m_motorImpulse, j = a.dt * this.m_maxMotorTorque, this.m_motorImpulse = d.Clamp(this.m_motorImpulse + g, -j, j), g = this.m_motorImpulse - h, n -= v * g, q += y * g
    }
    if(this.m_enableLimit && this.m_limitState != r.e_inactiveLimit) {
      var a = b.m_xf.R, g = this.m_localAnchor1.x - b.m_sweep.localCenter.x, h = this.m_localAnchor1.y - b.m_sweep.localCenter.y, f = a.col1.x * g + a.col2.x * h, h = a.col1.y * g + a.col2.y * h, g = f, a = e.m_xf.R, j = this.m_localAnchor2.x - e.m_sweep.localCenter.x, k = this.m_localAnchor2.y - e.m_sweep.localCenter.y, f = a.col1.x * j + a.col2.x * k, k = a.col1.y * j + a.col2.y * k, j = f, a = o.x + -q * k - l.x - -n * h, x = o.y + q * j - l.y - n * g;
      this.m_mass.Solve33(this.impulse3, -a, -x, -(q - n));
      if(this.m_limitState == r.e_equalLimits) {
        this.m_impulse.Add(this.impulse3)
      }else {
        if(this.m_limitState == r.e_atLowerLimit) {
          if(f = this.m_impulse.z + this.impulse3.z, f < 0) {
            this.m_mass.Solve22(this.reduced, -a, -x), this.impulse3.x = this.reduced.x, this.impulse3.y = this.reduced.y, this.impulse3.z = -this.m_impulse.z, this.m_impulse.x += this.reduced.x, this.m_impulse.y += this.reduced.y, this.m_impulse.z = 0
          }
        }else {
          if(this.m_limitState == r.e_atUpperLimit && (f = this.m_impulse.z + this.impulse3.z, f > 0)) {
            this.m_mass.Solve22(this.reduced, -a, -x), this.impulse3.x = this.reduced.x, this.impulse3.y = this.reduced.y, this.impulse3.z = -this.m_impulse.z, this.m_impulse.x += this.reduced.x, this.m_impulse.y += this.reduced.y, this.m_impulse.z = 0
          }
        }
      }
      l.x -= s * this.impulse3.x;
      l.y -= s * this.impulse3.y;
      n -= v * (g * this.impulse3.y - h * this.impulse3.x + this.impulse3.z);
      o.x += t * this.impulse3.x;
      o.y += t * this.impulse3.y;
      q += y * (j * this.impulse3.y - k * this.impulse3.x + this.impulse3.z)
    }else {
      a = b.m_xf.R, g = this.m_localAnchor1.x - b.m_sweep.localCenter.x, h = this.m_localAnchor1.y - b.m_sweep.localCenter.y, f = a.col1.x * g + a.col2.x * h, h = a.col1.y * g + a.col2.y * h, g = f, a = e.m_xf.R, j = this.m_localAnchor2.x - e.m_sweep.localCenter.x, k = this.m_localAnchor2.y - e.m_sweep.localCenter.y, f = a.col1.x * j + a.col2.x * k, k = a.col1.y * j + a.col2.y * k, j = f, this.m_mass.Solve22(this.impulse2, -(o.x + -q * k - l.x - -n * h), -(o.y + q * j - l.y - n * g)), this.m_impulse.x += 
      this.impulse2.x, this.m_impulse.y += this.impulse2.y, l.x -= s * this.impulse2.x, l.y -= s * this.impulse2.y, n -= v * (g * this.impulse2.y - h * this.impulse2.x), o.x += t * this.impulse2.x, o.y += t * this.impulse2.y, q += y * (j * this.impulse2.y - k * this.impulse2.x)
    }
    b.m_linearVelocity.SetV(l);
    b.m_angularVelocity = n;
    e.m_linearVelocity.SetV(o);
    e.m_angularVelocity = q
  };
  t.prototype.SolvePositionConstraints = function() {
    var b = 0, e, f = this.m_bodyA, g = this.m_bodyB, h = 0, j = e = 0, k = 0, l = 0;
    if(this.m_enableLimit && this.m_limitState != r.e_inactiveLimit) {
      var b = g.m_sweep.a - f.m_sweep.a - this.m_referenceAngle, n = 0;
      this.m_limitState == r.e_equalLimits ? (b = d.Clamp(b - this.m_lowerAngle, -a.b2_maxAngularCorrection, a.b2_maxAngularCorrection), n = -this.m_motorMass * b, h = d.Abs(b)) : this.m_limitState == r.e_atLowerLimit ? (b -= this.m_lowerAngle, h = -b, b = d.Clamp(b + a.b2_angularSlop, -a.b2_maxAngularCorrection, 0), n = -this.m_motorMass * b) : this.m_limitState == r.e_atUpperLimit && (b -= this.m_upperAngle, h = b, b = d.Clamp(b - a.b2_angularSlop, 0, a.b2_maxAngularCorrection), n = -this.m_motorMass * 
      b);
      f.m_sweep.a -= f.m_invI * n;
      g.m_sweep.a += g.m_invI * n;
      f.SynchronizeTransform();
      g.SynchronizeTransform()
    }
    e = f.m_xf.R;
    n = this.m_localAnchor1.x - f.m_sweep.localCenter.x;
    b = this.m_localAnchor1.y - f.m_sweep.localCenter.y;
    j = e.col1.x * n + e.col2.x * b;
    b = e.col1.y * n + e.col2.y * b;
    n = j;
    e = g.m_xf.R;
    var o = this.m_localAnchor2.x - g.m_sweep.localCenter.x, q = this.m_localAnchor2.y - g.m_sweep.localCenter.y, j = e.col1.x * o + e.col2.x * q, q = e.col1.y * o + e.col2.y * q, o = j, k = g.m_sweep.c.x + o - f.m_sweep.c.x - n, l = g.m_sweep.c.y + q - f.m_sweep.c.y - b, s = k * k + l * l;
    e = Math.sqrt(s);
    var j = f.m_invMass, v = g.m_invMass, y = f.m_invI, x = g.m_invI, B = 10 * a.b2_linearSlop;
    s > B * B && (s = 1 / (j + v), k = s * -k, l = s * -l, f.m_sweep.c.x -= 0.5 * j * k, f.m_sweep.c.y -= 0.5 * j * l, g.m_sweep.c.x += 0.5 * v * k, g.m_sweep.c.y += 0.5 * v * l, k = g.m_sweep.c.x + o - f.m_sweep.c.x - n, l = g.m_sweep.c.y + q - f.m_sweep.c.y - b);
    this.K1.col1.x = j + v;
    this.K1.col2.x = 0;
    this.K1.col1.y = 0;
    this.K1.col2.y = j + v;
    this.K2.col1.x = y * b * b;
    this.K2.col2.x = -y * n * b;
    this.K2.col1.y = -y * n * b;
    this.K2.col2.y = y * n * n;
    this.K3.col1.x = x * q * q;
    this.K3.col2.x = -x * o * q;
    this.K3.col1.y = -x * o * q;
    this.K3.col2.y = x * o * o;
    this.K.SetM(this.K1);
    this.K.AddM(this.K2);
    this.K.AddM(this.K3);
    this.K.Solve(t.tImpulse, -k, -l);
    k = t.tImpulse.x;
    l = t.tImpulse.y;
    f.m_sweep.c.x -= f.m_invMass * k;
    f.m_sweep.c.y -= f.m_invMass * l;
    f.m_sweep.a -= f.m_invI * (n * l - b * k);
    g.m_sweep.c.x += g.m_invMass * k;
    g.m_sweep.c.y += g.m_invMass * l;
    g.m_sweep.a += g.m_invI * (o * l - q * k);
    f.SynchronizeTransform();
    g.SynchronizeTransform();
    return e <= a.b2_linearSlop && h <= a.b2_angularSlop
  };
  Box2D.postDefs.push(function() {
    Box2D.Dynamics.Joints.b2RevoluteJoint.tImpulse = new b
  });
  Box2D.inherit(F, Box2D.Dynamics.Joints.b2JointDef);
  F.prototype.__super = Box2D.Dynamics.Joints.b2JointDef.prototype;
  F.b2RevoluteJointDef = function() {
    Box2D.Dynamics.Joints.b2JointDef.b2JointDef.apply(this, arguments);
    this.localAnchorA = new b;
    this.localAnchorB = new b
  };
  F.prototype.b2RevoluteJointDef = function() {
    this.__super.b2JointDef.call(this);
    this.type = r.e_revoluteJoint;
    this.localAnchorA.Set(0, 0);
    this.localAnchorB.Set(0, 0);
    this.motorSpeed = this.maxMotorTorque = this.upperAngle = this.lowerAngle = this.referenceAngle = 0;
    this.enableMotor = this.enableLimit = !1
  };
  F.prototype.Initialize = function(a, b, d) {
    this.bodyA = a;
    this.bodyB = b;
    this.localAnchorA = this.bodyA.GetLocalPoint(d);
    this.localAnchorB = this.bodyB.GetLocalPoint(d);
    this.referenceAngle = this.bodyB.GetAngle() - this.bodyA.GetAngle()
  };
  Box2D.inherit(L, Box2D.Dynamics.Joints.b2Joint);
  L.prototype.__super = Box2D.Dynamics.Joints.b2Joint.prototype;
  L.b2WeldJoint = function() {
    Box2D.Dynamics.Joints.b2Joint.b2Joint.apply(this, arguments);
    this.m_localAnchorA = new b;
    this.m_localAnchorB = new b;
    this.m_impulse = new g;
    this.m_mass = new f
  };
  L.prototype.GetAnchorA = function() {
    return this.m_bodyA.GetWorldPoint(this.m_localAnchorA)
  };
  L.prototype.GetAnchorB = function() {
    return this.m_bodyB.GetWorldPoint(this.m_localAnchorB)
  };
  L.prototype.GetReactionForce = function(a) {
    a === void 0 && (a = 0);
    return new b(a * this.m_impulse.x, a * this.m_impulse.y)
  };
  L.prototype.GetReactionTorque = function(a) {
    a === void 0 && (a = 0);
    return a * this.m_impulse.z
  };
  L.prototype.b2WeldJoint = function(a) {
    this.__super.b2Joint.call(this, a);
    this.m_localAnchorA.SetV(a.localAnchorA);
    this.m_localAnchorB.SetV(a.localAnchorB);
    this.m_referenceAngle = a.referenceAngle;
    this.m_impulse.SetZero();
    this.m_mass = new f
  };
  L.prototype.InitVelocityConstraints = function(a) {
    var b, d = 0, e = this.m_bodyA, f = this.m_bodyB;
    b = e.m_xf.R;
    var g = this.m_localAnchorA.x - e.m_sweep.localCenter.x, h = this.m_localAnchorA.y - e.m_sweep.localCenter.y, d = b.col1.x * g + b.col2.x * h, h = b.col1.y * g + b.col2.y * h, g = d;
    b = f.m_xf.R;
    var j = this.m_localAnchorB.x - f.m_sweep.localCenter.x, k = this.m_localAnchorB.y - f.m_sweep.localCenter.y, d = b.col1.x * j + b.col2.x * k, k = b.col1.y * j + b.col2.y * k, j = d;
    b = e.m_invMass;
    var d = f.m_invMass, l = e.m_invI, n = f.m_invI;
    this.m_mass.col1.x = b + d + h * h * l + k * k * n;
    this.m_mass.col2.x = -h * g * l - k * j * n;
    this.m_mass.col3.x = -h * l - k * n;
    this.m_mass.col1.y = this.m_mass.col2.x;
    this.m_mass.col2.y = b + d + g * g * l + j * j * n;
    this.m_mass.col3.y = g * l + j * n;
    this.m_mass.col1.z = this.m_mass.col3.x;
    this.m_mass.col2.z = this.m_mass.col3.y;
    this.m_mass.col3.z = l + n;
    a.warmStarting ? (this.m_impulse.x *= a.dtRatio, this.m_impulse.y *= a.dtRatio, this.m_impulse.z *= a.dtRatio, e.m_linearVelocity.x -= b * this.m_impulse.x, e.m_linearVelocity.y -= b * this.m_impulse.y, e.m_angularVelocity -= l * (g * this.m_impulse.y - h * this.m_impulse.x + this.m_impulse.z), f.m_linearVelocity.x += d * this.m_impulse.x, f.m_linearVelocity.y += d * this.m_impulse.y, f.m_angularVelocity += n * (j * this.m_impulse.y - k * this.m_impulse.x + this.m_impulse.z)) : this.m_impulse.SetZero()
  };
  L.prototype.SolveVelocityConstraints = function() {
    var a, b = 0, d = this.m_bodyA, e = this.m_bodyB, f = d.m_linearVelocity, h = d.m_angularVelocity, j = e.m_linearVelocity, k = e.m_angularVelocity, l = d.m_invMass, n = e.m_invMass, o = d.m_invI, r = e.m_invI;
    a = d.m_xf.R;
    var q = this.m_localAnchorA.x - d.m_sweep.localCenter.x, s = this.m_localAnchorA.y - d.m_sweep.localCenter.y, b = a.col1.x * q + a.col2.x * s, s = a.col1.y * q + a.col2.y * s, q = b;
    a = e.m_xf.R;
    var v = this.m_localAnchorB.x - e.m_sweep.localCenter.x, t = this.m_localAnchorB.y - e.m_sweep.localCenter.y, b = a.col1.x * v + a.col2.x * t, t = a.col1.y * v + a.col2.y * t, v = b;
    a = j.x - k * t - f.x + h * s;
    var b = j.y + k * v - f.y - h * q, y = k - h, x = new g;
    this.m_mass.Solve33(x, -a, -b, -y);
    this.m_impulse.Add(x);
    f.x -= l * x.x;
    f.y -= l * x.y;
    h -= o * (q * x.y - s * x.x + x.z);
    j.x += n * x.x;
    j.y += n * x.y;
    k += r * (v * x.y - t * x.x + x.z);
    d.m_angularVelocity = h;
    e.m_angularVelocity = k
  };
  L.prototype.SolvePositionConstraints = function() {
    var b, e = 0, f = this.m_bodyA, h = this.m_bodyB;
    b = f.m_xf.R;
    var j = this.m_localAnchorA.x - f.m_sweep.localCenter.x, k = this.m_localAnchorA.y - f.m_sweep.localCenter.y, e = b.col1.x * j + b.col2.x * k, k = b.col1.y * j + b.col2.y * k, j = e;
    b = h.m_xf.R;
    var l = this.m_localAnchorB.x - h.m_sweep.localCenter.x, n = this.m_localAnchorB.y - h.m_sweep.localCenter.y, e = b.col1.x * l + b.col2.x * n, n = b.col1.y * l + b.col2.y * n, l = e;
    b = f.m_invMass;
    var e = h.m_invMass, o = f.m_invI, r = h.m_invI, q = h.m_sweep.c.x + l - f.m_sweep.c.x - j, s = h.m_sweep.c.y + n - f.m_sweep.c.y - k, v = h.m_sweep.a - f.m_sweep.a - this.m_referenceAngle, t = 10 * a.b2_linearSlop, y = Math.sqrt(q * q + s * s), x = d.Abs(v);
    y > t && (o *= 1, r *= 1);
    this.m_mass.col1.x = b + e + k * k * o + n * n * r;
    this.m_mass.col2.x = -k * j * o - n * l * r;
    this.m_mass.col3.x = -k * o - n * r;
    this.m_mass.col1.y = this.m_mass.col2.x;
    this.m_mass.col2.y = b + e + j * j * o + l * l * r;
    this.m_mass.col3.y = j * o + l * r;
    this.m_mass.col1.z = this.m_mass.col3.x;
    this.m_mass.col2.z = this.m_mass.col3.y;
    this.m_mass.col3.z = o + r;
    t = new g;
    this.m_mass.Solve33(t, -q, -s, -v);
    f.m_sweep.c.x -= b * t.x;
    f.m_sweep.c.y -= b * t.y;
    f.m_sweep.a -= o * (j * t.y - k * t.x + t.z);
    h.m_sweep.c.x += e * t.x;
    h.m_sweep.c.y += e * t.y;
    h.m_sweep.a += r * (l * t.y - n * t.x + t.z);
    f.SynchronizeTransform();
    h.SynchronizeTransform();
    return y <= a.b2_linearSlop && x <= a.b2_angularSlop
  };
  Box2D.inherit(N, Box2D.Dynamics.Joints.b2JointDef);
  N.prototype.__super = Box2D.Dynamics.Joints.b2JointDef.prototype;
  N.b2WeldJointDef = function() {
    Box2D.Dynamics.Joints.b2JointDef.b2JointDef.apply(this, arguments);
    this.localAnchorA = new b;
    this.localAnchorB = new b
  };
  N.prototype.b2WeldJointDef = function() {
    this.__super.b2JointDef.call(this);
    this.type = r.e_weldJoint;
    this.referenceAngle = 0
  };
  N.prototype.Initialize = function(a, b, d) {
    this.bodyA = a;
    this.bodyB = b;
    this.localAnchorA.SetV(this.bodyA.GetLocalPoint(d));
    this.localAnchorB.SetV(this.bodyB.GetLocalPoint(d));
    this.referenceAngle = this.bodyB.GetAngle() - this.bodyA.GetAngle()
  }
})();
Box2D.Post = {};
var i;
for(i = 0;i < Box2D.postDefs.length;++i) {
  Box2D.postDefs[i]()
}
delete Box2D.postDefs;
Box2D.Dynamics.Contacts = {};
Box2D.Dynamics.Contacts.b2Contact = function() {
  this.m_nodeA = new Box2D.Dynamics.Contacts.b2ContactEdge;
  this.m_nodeB = new Box2D.Dynamics.Contacts.b2ContactEdge;
  this.m_manifold = new Box2D.Collision.b2Manifold;
  this.m_oldManifold = new Box2D.Collision.b2Manifold;
  this.constructor === Box2D.Dynamics.Contacts.b2Contact && this.b2Contact.apply(this, arguments)
};
(function(a) {
  a.b2Contact = function() {
  };
  a.prototype.GetManifold = function() {
    return this.m_manifold
  };
  a.prototype.GetWorldManifold = function(a) {
    var f = this.m_fixtureA.GetBody(), d = this.m_fixtureB.GetBody(), b = this.m_fixtureA.GetShape(), g = this.m_fixtureB.GetShape();
    a.Initialize(this.m_manifold, f.GetTransform(), b.m_radius, d.GetTransform(), g.m_radius)
  };
  a.prototype.IsTouching = function() {
    return this.touching
  };
  a.prototype.IsContinuous = function() {
    return this.continuous
  };
  a.prototype.SetSensor = function(a) {
    this.sensor = a
  };
  a.prototype.IsSensor = function() {
    return this.sensor
  };
  a.prototype.SetEnabled = function(a) {
    this.enabled = a
  };
  a.prototype.IsEnabled = function() {
    return this.enabled
  };
  a.prototype.GetNext = function() {
    return this.m_next
  };
  a.prototype.GetFixtureA = function() {
    return this.m_fixtureA
  };
  a.prototype.GetFixtureB = function() {
    return this.m_fixtureB
  };
  a.prototype.FlagForFiltering = function() {
    this.filtering = !0
  };
  a.prototype.ClearFiltering = function() {
    this.filtering = !1
  };
  a.prototype.IsFiltering = function() {
    return this.filtering
  };
  a.prototype.b2Contact = function() {
  };
  a.prototype.Reset = function(a, f) {
    a === void 0 && (a = null);
    f === void 0 && (f = null);
    this.enabled = !0;
    this.filtering = this.touching = this.continuous = this.sensor = !1;
    if(!a || !f) {
      this.m_fixtureB = this.m_fixtureA = null
    }else {
      if(a.IsSensor() || f.IsSensor()) {
        this.sensor = !0
      }
      var d = a.GetBody(), b = f.GetBody();
      if(d.GetType() != Box2D.Dynamics.b2Body.b2_dynamicBody || d.IsBullet() || b.GetType() != Box2D.Dynamics.b2Body.b2_dynamicBody || b.IsBullet()) {
        this.continuous = !0
      }
      this.m_fixtureA = a;
      this.m_fixtureB = f;
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
  a.prototype.Update = function(a) {
    var f = this.m_oldManifold;
    this.m_oldManifold = this.m_manifold;
    this.m_manifold = f;
    this.enabled = !0;
    var d = !1, f = this.IsTouching(), b = this.m_fixtureA.m_body, g = this.m_fixtureB.m_body, j = this.m_fixtureA.m_aabb.TestOverlap(this.m_fixtureB.m_aabb);
    if(this.sensor) {
      j && (d = this.m_fixtureA.GetShape(), j = this.m_fixtureB.GetShape(), b = b.GetTransform(), g = g.GetTransform(), d = Box2D.Collision.Shapes.b2Shape.TestOverlap(d, b, j, g)), this.m_manifold.m_pointCount = 0
    }else {
      this.continuous = b.GetType() != Box2D.Dynamics.b2Body.b2_dynamicBody || b.IsBullet() || g.GetType() != Box2D.Dynamics.b2Body.b2_dynamicBody || g.IsBullet() ? !0 : !1;
      if(j) {
        this.Evaluate();
        d = this.m_manifold.m_pointCount > 0;
        for(j = 0;j < this.m_manifold.m_pointCount;++j) {
          var h = this.m_manifold.m_points[j];
          h.m_normalImpulse = 0;
          h.m_tangentImpulse = 0;
          for(var l = h.m_id, k = 0;k < this.m_oldManifold.m_pointCount;++k) {
            var n = this.m_oldManifold.m_points[k];
            if(n.m_id.key == l.key) {
              h.m_normalImpulse = n.m_normalImpulse;
              h.m_tangentImpulse = n.m_tangentImpulse;
              break
            }
          }
        }
      }else {
        this.m_manifold.m_pointCount = 0
      }
      d != f && (b.SetAwake(!0), g.SetAwake(!0))
    }
    this.touching = d;
    !f && d && a.BeginContact(this);
    f && !d && a.EndContact(this);
    this.sensor || a.PreSolve(this, this.m_oldManifold)
  };
  a.prototype.Evaluate = function() {
  };
  a.prototype.ComputeTOI = function(e, f) {
    a.s_input.proxyA.Set(this.m_fixtureA.GetShape());
    a.s_input.proxyB.Set(this.m_fixtureB.GetShape());
    a.s_input.sweepA = e;
    a.s_input.sweepB = f;
    a.s_input.tolerance = Box2D.Common.b2Settings.b2_linearSlop;
    return Box2D.Collision.b2TimeOfImpact.TimeOfImpact(a.s_input)
  };
  Box2D.postDefs.push(function() {
    Box2D.Dynamics.Contacts.b2Contact.s_input = new Box2D.Collision.b2TOIInput
  })
})(Box2D.Dynamics.Contacts.b2Contact);
Box2D.Dynamics.Contacts.b2CircleContact = function() {
  Box2D.Dynamics.Contacts.b2Contact.apply(this, arguments)
};
(function(a) {
  Box2D.inherit(a, Box2D.Dynamics.Contacts.b2Contact);
  a.prototype.__super = Box2D.Dynamics.Contacts.b2Contact.prototype;
  a.Create = function() {
    return new a
  };
  a.Destroy = function() {
  };
  a.prototype.Reset = function(a, f) {
    this.__super.Reset.call(this, a, f)
  };
  a.prototype.Evaluate = function() {
    var a = this.m_fixtureA.GetBody(), f = this.m_fixtureB.GetBody();
    Box2D.Collision.b2Collision.CollideCircles(this.m_manifold, this.m_fixtureA.GetShape() instanceof Box2D.Collision.Shapes.b2CircleShape ? this.m_fixtureA.GetShape() : null, a.m_xf, this.m_fixtureB.GetShape() instanceof Box2D.Collision.Shapes.b2CircleShape ? this.m_fixtureB.GetShape() : null, f.m_xf)
  }
})(Box2D.Dynamics.Contacts.b2CircleContact);
Box2D.Dynamics.Contacts.b2ContactConstraint = function() {
  this.localPlaneNormal = new Box2D.Common.Math.b2Vec2;
  this.localPoint = new Box2D.Common.Math.b2Vec2;
  this.normal = new Box2D.Common.Math.b2Vec2;
  this.normalMass = new Box2D.Common.Math.b2Mat22;
  this.K = new Box2D.Common.Math.b2Mat22;
  this.constructor === Box2D.Dynamics.Contacts.b2ContactConstraint && this.b2ContactConstraint.apply(this, arguments)
};
(function(a) {
  a.prototype.b2ContactConstraint = function() {
    this.points = Array(Box2D.Common.b2Settings.b2_maxManifoldPoints);
    for(var a = 0;a < Box2D.Common.b2Settings.b2_maxManifoldPoints;a++) {
      this.points[a] = new Box2D.Dynamics.Contacts.b2ContactConstraintPoint
    }
  }
})(Box2D.Dynamics.Contacts.b2ContactConstraint);
Box2D.Dynamics.Contacts.b2ContactConstraintPoint = function() {
  this.localPoint = new Box2D.Common.Math.b2Vec2;
  this.rA = new Box2D.Common.Math.b2Vec2;
  this.rB = new Box2D.Common.Math.b2Vec2
};
Box2D.Dynamics.Contacts.b2ContactEdge = function() {
};
Box2D.Dynamics.Contacts.b2ContactFactory = function() {
  this.constructor === Box2D.Dynamics.Contacts.b2ContactFactory && this.b2ContactFactory.apply(this, arguments)
};
(function(a) {
  a.prototype.b2ContactFactory = function() {
    this.InitializeRegisters()
  };
  a.prototype.AddType = function(a, f, d, b) {
    d === void 0 && (d = 0);
    b === void 0 && (b = 0);
    this.m_registers[d][b].createFcn = a;
    this.m_registers[d][b].destroyFcn = f;
    this.m_registers[d][b].primary = !0;
    if(d != b) {
      this.m_registers[b][d].createFcn = a, this.m_registers[b][d].destroyFcn = f, this.m_registers[b][d].primary = !1
    }
  };
  a.prototype.InitializeRegisters = function() {
    this.m_registers = Array(Box2D.Collision.Shapes.b2Shape.e_shapeTypeCount);
    for(var a = 0;a < Box2D.Collision.Shapes.b2Shape.e_shapeTypeCount;a++) {
      this.m_registers[a] = Array(Box2D.Collision.Shapes.b2Shape.e_shapeTypeCount);
      for(var f = 0;f < Box2D.Collision.Shapes.b2Shape.e_shapeTypeCount;f++) {
        this.m_registers[a][f] = new Box2D.Dynamics.Contacts.b2ContactRegister
      }
    }
    this.AddType(Box2D.Dynamics.Contacts.b2CircleContact.Create, Box2D.Dynamics.Contacts.b2CircleContact.Destroy, Box2D.Collision.Shapes.b2Shape.e_circleShape, Box2D.Collision.Shapes.b2Shape.e_circleShape);
    this.AddType(Box2D.Dynamics.Contacts.b2PolyAndCircleContact.Create, Box2D.Dynamics.Contacts.b2PolyAndCircleContact.Destroy, Box2D.Collision.Shapes.b2Shape.e_polygonShape, Box2D.Collision.Shapes.b2Shape.e_circleShape);
    this.AddType(Box2D.Dynamics.Contacts.b2PolygonContact.Create, Box2D.Dynamics.Contacts.b2PolygonContact.Destroy, Box2D.Collision.Shapes.b2Shape.e_polygonShape, Box2D.Collision.Shapes.b2Shape.e_polygonShape);
    this.AddType(Box2D.Dynamics.Contacts.b2EdgeAndCircleContact.Create, Box2D.Dynamics.Contacts.b2EdgeAndCircleContact.Destroy, Box2D.Collision.Shapes.b2Shape.e_edgeShape, Box2D.Collision.Shapes.b2Shape.e_circleShape);
    this.AddType(Box2D.Dynamics.Contacts.b2PolyAndEdgeContact.Create, Box2D.Dynamics.Contacts.b2PolyAndEdgeContact.Destroy, Box2D.Collision.Shapes.b2Shape.e_polygonShape, Box2D.Collision.Shapes.b2Shape.e_edgeShape)
  };
  a.prototype.Create = function(a, f) {
    var d = a.GetType(), b = f.GetType(), d = this.m_registers[d][b];
    if(d.pool) {
      return b = d.pool, d.pool = b.m_next, d.poolCount--, b.Reset(a, f), b
    }
    b = d.createFcn;
    return b != null ? (d.primary ? (b = b(), b.Reset(a, f)) : (b = b(), b.Reset(f, a)), b) : null
  };
  a.prototype.Create = function(a, f) {
    var d = a.GetType(), b = f.GetType(), d = this.m_registers[d][b];
    if(d.pool) {
      return b = d.pool, d.pool = b.m_next, d.poolCount--, b.Reset(a, f), b
    }
    b = d.createFcn;
    return b != null ? (d.primary ? (b = b(), b.Reset(a, f)) : (b = b(), b.Reset(f, a)), b) : null
  };
  a.prototype.Destroy = function(a) {
    a.m_manifold.m_pointCount > 0 && (a.m_fixtureA.m_body.SetAwake(!0), a.m_fixtureB.m_body.SetAwake(!0));
    var f = a.m_fixtureA.GetType(), d = a.m_fixtureB.GetType(), f = this.m_registers[f][d];
    f.poolCount++;
    a.m_next = f.pool;
    f.pool = a;
    f = f.destroyFcn;
    f(a)
  }
})(Box2D.Dynamics.Contacts.b2ContactFactory);
function b2ContactRegister() {
  b2ContactRegister.b2ContactRegister.apply(this, arguments)
}
Box2D.Dynamics.Contacts.b2ContactRegister = b2ContactRegister;
function b2ContactResult() {
  b2ContactResult.b2ContactResult.apply(this, arguments)
}
Box2D.Dynamics.Contacts.b2ContactResult = b2ContactResult;
function b2ContactSolver() {
  b2ContactSolver.b2ContactSolver.apply(this, arguments);
  this.constructor === b2ContactSolver && this.b2ContactSolver.apply(this, arguments)
}
Box2D.Dynamics.Contacts.b2ContactSolver = b2ContactSolver;
function b2EdgeAndCircleContact() {
  b2EdgeAndCircleContact.b2EdgeAndCircleContact.apply(this, arguments)
}
Box2D.Dynamics.Contacts.b2EdgeAndCircleContact = b2EdgeAndCircleContact;
function b2NullContact() {
  b2NullContact.b2NullContact.apply(this, arguments);
  this.constructor === b2NullContact && this.b2NullContact.apply(this, arguments)
}
Box2D.Dynamics.Contacts.b2NullContact = b2NullContact;
function b2PolyAndCircleContact() {
  b2PolyAndCircleContact.b2PolyAndCircleContact.apply(this, arguments)
}
Box2D.Dynamics.Contacts.b2PolyAndCircleContact = b2PolyAndCircleContact;
function b2PolyAndEdgeContact() {
  b2PolyAndEdgeContact.b2PolyAndEdgeContact.apply(this, arguments)
}
Box2D.Dynamics.Contacts.b2PolyAndEdgeContact = b2PolyAndEdgeContact;
function b2PolygonContact() {
  b2PolygonContact.b2PolygonContact.apply(this, arguments)
}
Box2D.Dynamics.Contacts.b2PolygonContact = b2PolygonContact;
function b2PositionSolverManifold() {
  b2PositionSolverManifold.b2PositionSolverManifold.apply(this, arguments);
  this.constructor === b2PositionSolverManifold && this.b2PositionSolverManifold.apply(this, arguments)
}
Box2D.Dynamics.Contacts.b2PositionSolverManifold = b2PositionSolverManifold;
game.ai = {};
var game = game || {};
(function(a) {
  var e = [];
  a.ai = {};
  a.ai.addThinker = function(a) {
    if(typeof a.think != "function") {
      throw"Thinker can't think!";
    }
    if(a.tIdx != null) {
      throw"Thinker already added!";
    }
    a.tIdx = e.push(a)
  };
  a.ai.removeThinker = function(a) {
    if(a.tIdx != null) {
      throw"Thinker not added (or already removed)!";
    }
    e[a.tIdx] = null;
    a.tIdx = null
  };
  a.ai.think = function(a, d) {
    for(var b = [], g = 0;g < e.length;g++) {
      var j = e[g];
      if(j != null) {
        j.tIdx = b.push(e[g]), j.think(a, d)
      }
    }
    e = b
  }
})(game);
game = game || {};
game.animations = {};
(function(a) {
  a.setSpriteSheet = function(a, f, d, b, g, j, h) {
    game.ui.setDisplaySize(a, f);
    game.ui.setImage(a, d);
    a.display.spriteSheet.offset = b;
    a.display.spriteSheet.frameSize = g;
    a.display.spriteSheet.frames = j;
    a.display.spriteSheet.frameSpeed = h;
    a.display.spriteSheet.frameTick = 0;
    a.display.spriteSheet.frameOffset = new Box2D.Common.Math.b2Vec2(0, 0);
    a.display.spriteSheet.frameDir = {a:0, x:0, y:2}
  };
  a.setAsFourDirectionalAnimation = function(a, f, d, b, g, j, h) {
    game.animations.setSpriteSheet(a, f, d, b, g, j, h);
    if(a.think) {
      var l = a.think;
      a.think = function(b, d) {
        l(b, d);
        game.animations.fourDirectionalAnimation(b, d, a)
      }
    }else {
      a.think = function(b, d) {
        game.animations.fourDirectionalAnimation(b, d, a)
      }, game.ai.addThinker(a)
    }
  };
  a.fourDirectionalAnimation = function(a, f, d) {
    a = d.display.spriteSheet;
    a.frameTick += f;
    var f = d.GetLinearVelocity(), d = Math.abs(f.x), b = Math.abs(f.y);
    if(b < 0.01 || d >= b) {
      if(f.x > 0.01) {
        if(a.frameDir.x = 0, a.frameDir.a != 0) {
          a.frameDir.a = 0, a.frameTick = 0
        }
      }else {
        if(f.x < -0.01) {
          if(a.frameDir.x = 1, a.frameDir.a != 1) {
            a.frameDir.a = 1, a.frameTick = 0
          }
        }else {
          a.frameTick = 0
        }
      }
      a.frameOffset.y = a.frameDir.x == 1 ? a.frameSize.y * 3 + a.offset.y : a.frameSize.y + a.offset.y
    }else {
      if(f.y > 0.01) {
        a.frameDir.y = 3;
        if(a.frameDir.a != 3) {
          a.frameDir.a = 3, a.frameTick = 0
        }
        a.frameOffset.y = a.frameSize.y * 2 + a.offset.y
      }else {
        a.frameDir.y = 2;
        if(a.frameDir.a != 2) {
          a.frameDir.a = 2, a.frameTick = 0
        }
        a.frameOffset.y = a.offset.y
      }
    }
    a.frameOffset.x = a.frameTick == 0 ? a.offset.x : Math.floor(a.frameTick * a.frameSpeed) % a.frames * a.frameSize.x + a.offset.x
  };
  a.eightDirectionalAnimation = function(a, f, d) {
    a = d.GetLinearVelocity();
    Math.abs(a.x);
    Math.abs(a.y);
    d = illandril.game.ui.BasicDirectionalAnimation.Direction.N;
    a = Math.abs(directionVector.x);
    f = Math.abs(directionVector.y);
    d = a > 2 * f ? directionVector.x > 0 ? illandril.game.ui.BasicDirectionalAnimation.Direction.E : illandril.game.ui.BasicDirectionalAnimation.Direction.W : f > 2 * a ? directionVector.y < 0 ? illandril.game.ui.BasicDirectionalAnimation.Direction.S : illandril.game.ui.BasicDirectionalAnimation.Direction.N : directionVector.y < 0 ? directionVector.x > 0 ? illandril.game.ui.BasicDirectionalAnimation.Direction.SE : illandril.game.ui.BasicDirectionalAnimation.Direction.SW : directionVector.x > 0 ? 
    illandril.game.ui.BasicDirectionalAnimation.Direction.NE : illandril.game.ui.BasicDirectionalAnimation.Direction.NW;
    if(d != this.lastDirection) {
      this.directionTime = 0, this.lastDirection = d
    }
    a = 0;
    f = Math.round((this.directionTime + 1) / this.mspf) % this.frames;
    speedVector.squaredMagnitude() != 0 || this.lastFrame != 0 ? (this.directionTime += tickTime, this.lastFrame = f) : f = this.lastFrame = this.directionTime = 0;
    switch(d) {
      case illandril.game.ui.BasicDirectionalAnimation.Direction.N:
        a = 0;
        break;
      case illandril.game.ui.BasicDirectionalAnimation.Direction.NE:
        a = 0;
        f += this.frames;
        break;
      case illandril.game.ui.BasicDirectionalAnimation.Direction.E:
        a = 1;
        break;
      case illandril.game.ui.BasicDirectionalAnimation.Direction.SE:
        a = 1;
        f += this.frames;
        break;
      case illandril.game.ui.BasicDirectionalAnimation.Direction.S:
        a = 2;
        break;
      case illandril.game.ui.BasicDirectionalAnimation.Direction.SW:
        a = 2;
        f += this.frames;
        break;
      case illandril.game.ui.BasicDirectionalAnimation.Direction.W:
        a = 3;
        break;
      case illandril.game.ui.BasicDirectionalAnimation.Direction.NW:
        a = 3, f += this.frames
    }
    d = a * this.tileHeight;
    isNaN(f * this.tileWidth) && illandril.DEBUG && illandril.getLogger("game.ui.BasicDirectionalAnimation").shout("BAD SPRITE X -- sX: " + f + "; DT: " + this.directionTime + "; MSPF: " + this.mspf + "; Width: " + this.tileWidth);
    isNaN(d) && illandril.DEBUG && illandril.getLogger("game.ui.SpriteSheet").shout("BAD SPRITE Y -- sY: " + a + "; GT: " + gameTime + "; MSPF: " + this.mspf + "; Height: " + this.tileHeight);
    return{src:this.src, x:f * this.tileWidth, y:a * this.tileHeight}
  }
})(game.animations);
game.world = {};
game = game || {};
(function(a) {
  var e = new Box2D.Dynamics.b2FixtureDef, f = new Box2D.Dynamics.b2BodyDef, d = null, b = null, g = null, j = [], h = {density:0.1, friction:0.5, restitution:0.01, isSensor:!1}, l = {fixedRotation:!1, angle:0, type:Box2D.Dynamics.b2Body.b2_dynamicBody}, k = function(a, b) {
    var a = a || {}, d = {}, e;
    for(e in b) {
      d[e] = a[e] === void 0 || a[e] === null ? b[e] : a[e]
    }
    return d
  };
  a.world = {};
  a.world.init = function(e, f) {
    d = new Box2D.Dynamics.b2World(f, !0);
    d.SetContactFilter(a.world);
    d.SetContactListener(a.world);
    b = e.x;
    g = e.y;
    d.top = a.world.createStaticBox(new Box2D.Common.Math.b2Vec2(b, 1), new Box2D.Common.Math.b2Vec2(b / 2, 0), !0, null, {friction:0});
    a.ui.setImage(d.top.body, "graphics/border.png");
    d.bottom = a.world.createStaticBox(new Box2D.Common.Math.b2Vec2(b, 1), new Box2D.Common.Math.b2Vec2(b / 2, g), !0, null, {friction:0});
    a.ui.setImage(d.bottom.body, "graphics/border.png");
    d.left = a.world.createStaticBox(new Box2D.Common.Math.b2Vec2(1, g), new Box2D.Common.Math.b2Vec2(0, g / 2), !0, null, {friction:0});
    a.ui.setImage(d.left.body, "graphics/border.png");
    d.right = a.world.createStaticBox(new Box2D.Common.Math.b2Vec2(1, g), new Box2D.Common.Math.b2Vec2(b, g / 2), !0, null, {friction:0});
    a.ui.setImage(d.right.body, "graphics/border.png")
  };
  a.world.update = function(a, b) {
    d.Step(b, 10, 10);
    d.DrawDebugData();
    d.ClearForces()
  };
  a.world.getBox2DWorld = function() {
    return d
  };
  a.world.addCollisionFilter = function(a) {
    j.push(a)
  };
  a.world.RayCollide = function(a, b) {
    if(!b.IsSensor()) {
      for(var d = 0;d < j.length;d++) {
        if(j[d].RayCollide && !j[d].RayCollide(a, b)) {
          return!1
        }
      }
    }
    return Box2D.Dynamics.b2ContactFilter.prototype.RayCollide(a, b)
  };
  a.world.ShouldCollide = function(a, b) {
    if(!a.IsSensor() && !b.IsSensor()) {
      for(var d = 0;d < j.length;d++) {
        if(j[d].ShouldCollide && !j[d].ShouldCollide(a, b)) {
          return!1
        }
      }
    }
    return Box2D.Dynamics.b2ContactFilter.prototype.ShouldCollide(a, b)
  };
  a.world.BeginContact = function(a) {
    for(var b = 0;b < j.length;b++) {
      j[b].ValidateBeginContact && j[b].ValidateBeginContact(a), a.disabled && a.SetEnabled(!1), j[b].BeginContact && j[b].BeginContact(a)
    }
  };
  a.world.EndContact = function(a) {
    for(var b = 0;b < j.length;b++) {
      j[b].EndContact && j[b].EndContact(a)
    }
    a.disabled = !1;
    a.SetEnabled(!0)
  };
  a.world.PreSolve = function(a, b) {
    a.disabled && a.SetEnabled(!1);
    for(var d = 0;d < j.length;d++) {
      j[d].PreSolve && j[d].PreSolve(a, b)
    }
  };
  a.world.PostSolve = function(a, b) {
    for(var d = 0;d < j.length;d++) {
      j[d].PostSolve && j[d].PostSolve(a, b)
    }
  };
  a.world.getBox2DBodyDefinition = function() {
    return f
  };
  a.world.getBox2DFixtureDefinition = function() {
    return e
  };
  a.world.getWorldWidth = function() {
    return b
  };
  a.world.getWorldHeight = function() {
    return g
  };
  a.world.createStaticBox = function(b, d, e, f, g) {
    f = f || {};
    f.type = Box2D.Dynamics.b2Body.b2_staticBody;
    return a.world.createBox(b, d, e, f, g)
  };
  a.world.createBox = function(b, d, e, f, g) {
    var h = new Box2D.Collision.Shapes.b2PolygonShape;
    h.SetAsBox(b.x / 2, b.y / 2);
    return a.world.createObject(b, d, e !== !1, f, g, h)
  };
  a.world.createObject = function(b, e, g, h, j, B) {
    h = k(h, l);
    f.type = h.type;
    f.angle = h.angle;
    f.fixedRotation = h.fixedRotation;
    f.position = e;
    e = d.CreateBody(f);
    fixture = a.world.addFixture(e, j, B);
    g && a.ui.setDisplaySize(e, new Box2D.Common.Math.b2Vec2(b.x, b.y));
    b = {body:e, fixture:fixture};
    return e.object = b
  };
  a.world.addFixture = function(a, b, d) {
    b = k(b, h);
    e.density = b.density;
    e.friction = b.friction;
    e.restitution = b.restitution;
    e.isSensor = b.isSensor;
    e.shape = d;
    return a.CreateFixture(e)
  }
})(game);
game.ui = {};
game = game || {};
(function(a) {
  var e = 0;
  e |= Box2D.Dynamics.b2DebugDraw.e_aabbBit;
  e |= Box2D.Dynamics.b2DebugDraw.e_pairBit;
  e |= Box2D.Dynamics.b2DebugDraw.e_shapeBit;
  var f = 0, d = {}, b = null, g = null, j = null, h = null, l = null, k = null, n = null, q = new Box2D.Common.Math.b2Vec2(0, 0), v = new Box2D.Common.Math.b2Vec2(0, 0);
  a.ui = {};
  a.ui.getDisplayDOMObject = function() {
    return k
  };
  a.ui.initDisplay = function(d, f, q, s) {
    b = f;
    g = q.x;
    j = q.y;
    h = g / b;
    l = j / b;
    a.ui.lookAt(new Box2D.Common.Math.b2Vec2(0, 0));
    f = document.getElementById(d);
    q = document.createElement("span");
    if(s) {
      f.innerHTML = '<div style="width: ' + g + "px; height: " + j / 2 + 'px; background-color: #000; opacity: 0.15; position: absolute;"></div><div style="width: ' + g / 2 + "px; height: " + j + 'px; background-color: #FFF; opacity: 0.15; position: absolute;"></div>', q.innerHTML = '<canvas id="' + d + '__DEBUG" class="debugViewport"></canvas>'
    }
    q.className = "viewportContainer";
    q.style.width = g + "px";
    q.style.height = j + "px";
    k = document.createElement("span");
    k.className = "viewport";
    q.appendChild(k);
    f.appendChild(q);
    if(s) {
      n = document.getElementById(d + "__DEBUG"), n.width = a.world.getWorldWidth() * b, n.height = a.world.getWorldHeight() * b, n.style.marginRight = "-" + n.width + "px", n.style.marginBottom = "-" + n.height + "px", d = new Box2D.Dynamics.b2DebugDraw, d.SetSprite(n.getContext("2d")), d.SetDrawScale(b), d.SetFillAlpha(0.3), d.SetLineThickness(1), d.SetFlags(e), a.world.getBox2DWorld().SetDebugDraw(d)
    }
  };
  a.ui.lookAt = function(b) {
    q.x = b.x - h / 2;
    q.y = b.y - l / 2;
    if(q.x < 0) {
      q.x = 0
    }else {
      if(q.x > a.world.getWorldWidth() - h) {
        q.x = a.world.getWorldWidth() - h
      }
    }
    if(q.y < 0) {
      q.y = 0
    }else {
      if(q.y > a.world.getWorldHeight() - l) {
        q.y = a.world.getWorldHeight() - l
      }
    }
  };
  a.ui.draw = function() {
    if(k == null) {
      throw"Display not yet initialized!";
    }
    if(v.x != q.x || v.y != q.y) {
      v.x = q.x;
      v.y = q.y;
      if(n != null) {
        n.style.left = "-" + q.x * b + "px", n.style.top = "-" + q.y * b + "px"
      }
      k.style.left = "-" + q.x * b + "px";
      k.style.top = "-" + q.y * b + "px"
    }
    for(var e = a.world.getBox2DWorld().GetBodyList();e != null;) {
      if(e.display != null) {
        var g = e.GetPosition(), h = e.display.size;
        if(e.display.viewID == null) {
          e.display.viewID = f++
        }
        if(d[e.display.viewID] == null) {
          d[e.display.viewID] = document.createElement("span"), d[e.display.viewID].className = "gameObject", d[e.display.viewID].savedStyle = {}, k.appendChild(d[e.display.viewID])
        }
        var j = d[e.display.viewID], l = (g.x - h.x / 2) * b;
        if(j.savedStyle.left != l) {
          j.savedStyle.left = l, j.style.left = l + "px"
        }
        g = (g.y - h.y / 2) * b;
        if(j.savedStyle.top != g) {
          j.savedStyle.top = g, j.style.top = g + "px"
        }
        g = h.x * b;
        if(j.savedStyle.width != g) {
          j.savedStyle.width = g, j.style.width = g + "px"
        }
        h = h.y * b;
        if(j.savedStyle.height != h) {
          j.savedStyle.height = h, j.style.height = h + "px"
        }
        h = e.GetAngle();
        if(j.savedStyle.rotation != h) {
          j.savedStyle.rotation = h, j.style.webkitTransform = "rotate(" + h + "rad)"
        }
        if(e.display.spriteSheet != null) {
          h = e.display.spriteSheet.url;
          if(j.savedStyle.bg != h) {
            j.savedStyle.bg = h, j.style.backgroundImage = "url(" + h + ")", j.style.backgroundColor = "transparent"
          }
          h = e.display.spriteSheet.frameOffset;
          if(h != null && (j.savedStyle.bgPosX != h.x || j.savedStyle.bgPosY != h.y)) {
            j.savedStyle.bgPosX = h.x, j.savedStyle.bgPosY = h.y, j.style.backgroundPosition = h.x * -1 + "px " + h.y * -1 + "px"
          }
        }
      }
      e = e.GetNext()
    }
  };
  a.ui.setDisplaySize = function(a, b) {
    a.display = a.display || {};
    a.display.size = b
  };
  a.ui.setImage = function(a, b) {
    if(a.display == null || a.display.size == null) {
      throw"Attempt to set image of object with no display size!";
    }
    a.display.spriteSheet = a.display.spriteSheet || {};
    a.display.spriteSheet.url = b
  }
})(game);
window.requestAnimFrame = function() {
  return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(a) {
    window.setTimeout(a, 1E3 / 60)
  }
}();
game = game || {};
(function(a) {
  var e = 0, f = 60, d = 0, b = null;
  a.init = function(d, f, g, k, n, q, v) {
    b = d;
    e = document.getElementById("fps");
    a.world.init(g, k);
    a.ui.initDisplay(f, q, n, v)
  };
  a.start = function() {
    window.requestAnimFrame(g, a.ui.getDisplayDOMObject())
  };
  var g = function(j) {
    j == null && (j = (new Date).getTime());
    var h = 0;
    d != 0 ? h = (j - d) / 1E3 : d = j;
    if(h > 0.015) {
      if(e) {
        var l = 1 / h;
        f = f * 0.99 + l * 0.01;
        e.innerHTML = Math.round(l) + " - " + Math.round(f)
      }
      h > 0.04 && (h = 0.04);
      d = j;
      b.preThink && b.preThink(j, h);
      a.ai.think(j, h);
      b.preUpdate && b.preUpdate(j, h);
      a.world.update(j, h);
      b.preDraw && b.preDraw(j, h);
      a.ui.draw(j, h)
    }
    window.requestAnimFrame(g, a.ui.getDisplayDOMObject())
  }
})(game);
game = game || {};
game.platformer = {};
(function(a) {
  a.DEFAULT_GRAVITY = new Box2D.Common.Math.b2Vec2(0, 9.8);
  a.DEFAULTS = {GRAVITY:new Box2D.Common.Math.b2Vec2(0, 9.8), JUMP_IMPULSE_MODIFIER:1.75, PLAYER_SPEED:5, PLAYER_ACCELERATION:1};
  a.RULE_TYPES = {DIRECTIONAL_SIDING:1, JUMPER:2, MOVER:4};
  a.init = function() {
    game.world.addCollisionFilter(a)
  };
  a.initializeDirectionalSiding = function(d, b, e, f, h) {
    d.platformerRules = d.platformerRules || {};
    d.platformerRules.type |= a.RULE_TYPES.DIRECTIONAL_SIDING;
    d.platformerRules.directionalSiding = {noTop:b, noBottom:e, noLeft:f, noRight:h}
  };
  a.initializeJumper = function(d, b) {
    d.platformerRules = d.platformerRules || {};
    d.platformerRules.type |= a.RULE_TYPES.JUMPER;
    d.platformerRules.jumper = {grounds:[], speed:b, jump:function() {
      var b = d.platformerRules.jumper.grounds;
      if(b.length > 0) {
        var e = d.body.GetMass() * d.platformerRules.jumper.speed * a.DEFAULTS.JUMP_IMPULSE_MODIFIER, f = d.body.GetWorldCenter(), l = d.body.GetLinearVelocity();
        l.y = 0;
        d.body.SetLinearVelocity(l);
        d.body.ApplyImpulse(new Box2D.Common.Math.b2Vec2(0, -e), f);
        for(l = 0;l < b.length;l++) {
          b[l].body.ApplyImpulse(new Box2D.Common.Math.b2Vec2(0, e / b.length), f)
        }
      }
    }}
  };
  a.initializeMover = function(d, b, e) {
    d.platformerRules = d.platformerRules || {};
    d.platformerRules.type |= a.RULE_TYPES.JUMPER;
    d.platformerRules.mover = {acceleration:e, speed:b, moveRight:function() {
      var a = d.body.GetLinearVelocity(), a = Math.min(a.x + d.platformerRules.mover.acceleration, d.platformerRules.mover.speed) - a.x;
      a > 0 && (a *= d.body.GetMass(), d.body.ApplyImpulse(new Box2D.Common.Math.b2Vec2(a, 0), d.body.GetWorldCenter()))
    }, moveLeft:function() {
      var a = d.body.GetLinearVelocity(), a = Math.max(a.x - d.platformerRules.mover.acceleration, -d.platformerRules.mover.speed) - a.x;
      a < 0 && (a *= d.body.GetMass(), d.body.ApplyImpulse(new Box2D.Common.Math.b2Vec2(a, 0), d.body.GetWorldCenter()))
    }}
  };
  a.createPlayer = function(d, b) {
    var e = game.world.createBox(d, b, !0, {fixedRotation:!0}, {restitution:0});
    e.platformerRules = {};
    a.initializeJumper(e, a.DEFAULTS.PLAYER_SPEED);
    a.initializeMover(e, a.DEFAULTS.PLAYER_SPEED, a.DEFAULTS.PLAYER_ACCELERATION);
    var f = new Box2D.Collision.Shapes.b2PolygonShape;
    f.SetAsOrientedBox(0.01, d.y / 2, new Box2D.Common.Math.b2Vec2(-d.x / 2, 0));
    e.leftEdge = game.world.addFixture(e.body, {friction:0}, f);
    f.SetAsOrientedBox(0.01, d.y / 2, new Box2D.Common.Math.b2Vec2(d.x / 2, 0));
    e.rightEdge = game.world.addFixture(e.body, {friction:0}, f);
    e.actions = {};
    e.actions.moveUp = new game.controls.action(function() {
      e.platformerRules.jumper.jump()
    }, "Move Up", !0);
    e.actions.moveDown = new game.controls.action(function() {
    }, "Move Down", !0);
    e.actions.moveLeft = new game.controls.action(function() {
      e.platformerRules.mover.moveLeft()
    }, "Move Left", !0);
    e.actions.moveRight = new game.controls.action(function() {
      e.platformerRules.mover.moveRight()
    }, "Move Right", !0);
    return e
  };
  a.RayCollide = null;
  a.ShouldCollide = null;
  a.ValidateBeginContact = function(a) {
    var b = a.GetFixtureA(), f = b.GetBody(), j = f.object, h = a.GetFixtureB(), l = h.GetBody(), k = l.object;
    !a.disabled && j.platformerRules && e(a, j, f, b, k, l, h);
    !a.disabled && k.platformerRules && e(a, k, l, h, j, f, b)
  };
  var e = function(d, b) {
    if(b.platformerRules.type & a.RULE_TYPES.DIRECTIONAL_SIDING) {
      d.disabled = !0;
      var e = new Box2D.Collision.b2WorldManifold;
      d.GetWorldManifold(e);
      e = e.m_normal;
      if(!b.platformerRules.directionalSiding.noTop && e.y > 0) {
        d.disabled = !1
      }else {
        if(!b.platformerRules.directionalSiding.noBottom && e.y < 0) {
          d.disabled = !1
        }else {
          if(!b.platformerRules.directionalSiding.noRight && e.x > 0) {
            d.disabled = !1
          }else {
            if(!b.platformerRules.directionalSiding.noLeft && e.x < 0) {
              d.disabled = !1
            }
          }
        }
      }
    }
  };
  a.BeginContact = function(a) {
    if(!a.disabled) {
      var b = a.GetFixtureA(), e = b.GetBody(), j = e.object, h = a.GetFixtureB(), l = h.GetBody(), k = l.object;
      j.platformerRules && f(a, j, e, b, k, l, h);
      k.platformerRules && f(a, k, l, h, j, e, b)
    }
  };
  var f = function(d, b, e, f, h, l) {
    if(b.platformerRules.type & a.RULE_TYPES.JUMPER && (e = new Box2D.Collision.b2WorldManifold, d.GetWorldManifold(e), e.m_normal.y > 0)) {
      e = !1;
      for(f = 0;f < b.platformerRules.jumper.grounds.length;f++) {
        if(b.platformerRules.jumper.grounds[f].body == l) {
          b.platformerRules.jumper.grounds[f].count++;
          e = !0;
          break
        }
      }
      e || b.platformerRules.jumper.grounds.push({body:l, count:1});
      d.platformerGrounds = d.platformerGrounds || [];
      d.platformerGrounds.push({jumper:b, ground:l})
    }
  };
  a.EndContact = function(a) {
    if(a.platformerGrounds) {
      for(var b = 0;b < a.platformerGrounds.length;b++) {
        for(var e = a.platformerGrounds[b].jumper, f = a.platformerGrounds[b].ground, h = [], l = 0;l < e.platformerRules.jumper.grounds.length;l++) {
          e.platformerRules.jumper.grounds[l].body == f ? (e.platformerRules.jumper.grounds[l].count--, e.platformerRules.jumper.grounds[l].count > 0 && h.push(e.platformerRules.jumper.grounds[l])) : h.push(e.platformerRules.jumper.grounds[l])
        }
        e.platformerRules.jumper.grounds = h
      }
      a.platformerGrounds = null
    }
  };
  a.PreSolve = null;
  a.PostSolve = null;
  a.createBlock = function(a, b) {
    return game.world.createStaticBox(a, b, !0)
  };
  a.createPlatform = function(d, b, e, f, h) {
    d = game.world.createStaticBox(d, b, !0, {angle:Math.PI * Math.random() * 0}, null);
    a.initializeDirectionalSiding(d, !1, !e, !f, !h);
    return d
  }
})(game.platformer);
var test = {}, player, ramp;
(function(a) {
  var e = new Box2D.Common.Math.b2Vec2(60, 80), f = new Box2D.Common.Math.b2Vec2(600, 400), d;
  a.init = function(b, d) {
    game.init(a, b, e, game.platformer.DEFAULTS.GRAVITY, f, 20, d);
    game.platformer.init();
    var j = new Box2D.Common.Math.b2Vec2(13, e.y - 25);
    a.createWorld();
    a.createSpinners();
    a.createDebugObjects();
    a.createPlayer(j);
    a.createMario(new Box2D.Common.Math.b2Vec2(13, e.y - 40));
    game.start()
  };
  a.createPlayer = function(a) {
    var e = new Box2D.Common.Math.b2Vec2(0, 0), f = new Box2D.Common.Math.b2Vec2(21, 47), h = new Box2D.Common.Math.b2Vec2(f.x / 20, f.y / 20);
    player = game.platformer.createPlayer(h, a);
    game.animations.setAsFourDirectionalAnimation(player.body, h, "../external-resources/graphics/urbansquall_tileset/characters/princess_AP.png", e, f, 4, 4);
    d = new game.controls("main");
    d.registerAction(player.actions.moveUp, goog.events.KeyCodes.W, !1, !1, !1);
    d.registerAction(player.actions.moveLeft, goog.events.KeyCodes.A, !1, !1, !1);
    d.registerAction(player.actions.moveDown, goog.events.KeyCodes.S, !1, !1, !1);
    d.registerAction(player.actions.moveRight, goog.events.KeyCodes.D, !1, !1, !1)
  };
  a.createWorld = function() {
    var b = new Box2D.Common.Math.b2Vec2(3, 0.25);
    ramp = game.world.createStaticBox(new Box2D.Common.Math.b2Vec2(5, 0.25), new Box2D.Common.Math.b2Vec2(16, e.y - 1.5), !0, {angle:Math.PI / 3}, null);
    game.platformer.createPlatform(b, new Box2D.Common.Math.b2Vec2(12, e.y - 2.5));
    game.platformer.createPlatform(b, new Box2D.Common.Math.b2Vec2(10, e.y - 5));
    game.platformer.createPlatform(b, new Box2D.Common.Math.b2Vec2(8, e.y - 7.5));
    game.platformer.createPlatform(b, new Box2D.Common.Math.b2Vec2(6, e.y - 10));
    game.platformer.createPlatform(b, new Box2D.Common.Math.b2Vec2(4, e.y - 12.5));
    game.platformer.createPlatform(b, new Box2D.Common.Math.b2Vec2(2, e.y - 15));
    game.platformer.createPlatform(b, new Box2D.Common.Math.b2Vec2(8, e.y - 17.5));
    game.platformer.createPlatform(b, new Box2D.Common.Math.b2Vec2(10, e.y - 20));
    game.platformer.createPlatform(b, new Box2D.Common.Math.b2Vec2(12, e.y - 22.5));
    game.platformer.createPlatform(b, new Box2D.Common.Math.b2Vec2(10, e.y - 27.5));
    game.platformer.createPlatform(b, new Box2D.Common.Math.b2Vec2(10, e.y - 31));
    game.platformer.createPlatform(b, new Box2D.Common.Math.b2Vec2(10, e.y - 34.5));
    game.platformer.createPlatform(b, new Box2D.Common.Math.b2Vec2(10, e.y - 38));
    game.platformer.createPlatform(new Box2D.Common.Math.b2Vec2(e.x - 14, 0.5), new Box2D.Common.Math.b2Vec2(e.x / 2 + 7, e.y - 25), !0, !0, !0);
    a.createBallPit(new Box2D.Common.Math.b2Vec2(e.x - 30, 5), new Box2D.Common.Math.b2Vec2(20, e.y - 25))
  };
  a.createBallPit = function(a, d) {
    game.world.createStaticBox(new Box2D.Common.Math.b2Vec2(0.25, Math.sqrt(a.y * a.y * 2)), new Box2D.Common.Math.b2Vec2(d.x + a.y / 2, d.y - a.y / 2), !0, {angle:Math.PI / 4}, null);
    game.world.createStaticBox(new Box2D.Common.Math.b2Vec2(0.25, a.y), new Box2D.Common.Math.b2Vec2(d.x + a.y, d.y - a.y / 2), !0, null, null);
    game.world.createStaticBox(new Box2D.Common.Math.b2Vec2(0.25, a.y), new Box2D.Common.Math.b2Vec2(d.x + a.x, d.y - a.y / 2), !0, null, null);
    for(var e = new Box2D.Collision.Shapes.b2CircleShape(0.15), f = a.y + 1;f < a.x;f += 0.3) {
      for(var l = 0;l < a.y;l += 1) {
        var k = game.world.createObject(new Box2D.Common.Math.b2Vec2(0.3, 0.3), new Box2D.Common.Math.b2Vec2(d.x + f + (Math.random() - 0.5) / 2, d.y - a.y), !0, null, {density:0.1, restitution:0, friction:0.1}, e), n = Math.random();
        n <= 0.25 ? game.ui.setImage(k.body, "graphics/ball-red.png") : n <= 0.5 ? game.ui.setImage(k.body, "graphics/ball-green.png") : n <= 0.75 ? game.ui.setImage(k.body, "graphics/ball-yellow.png") : game.ui.setImage(k.body, "graphics/ball-blue.png")
      }
    }
  };
  a.createSpinners = function() {
    for(var a = new Box2D.Dynamics.Joints.b2RevoluteJointDef, d = new Box2D.Dynamics.Joints.b2WeldJointDef, f = !1, h = 20;h <= e.x - 10;h += 8) {
      game.world.getBox2DBodyDefinition().angle = h / e.x * Math.PI;
      var l = e.y - 14;
      f && (l += 8);
      var f = !f, k = game.world.createStaticBox(new Box2D.Common.Math.b2Vec2(0.1, 0.1), new Box2D.Common.Math.b2Vec2(h, l));
      k.body.display = null;
      var n = game.world.createBox(new Box2D.Common.Math.b2Vec2(10, 1), new Box2D.Common.Math.b2Vec2(h, l));
      game.ui.setImage(n.body, "graphics/spinner.png");
      game.platformer.initializeDirectionalSiding(n, !1, !0, !1, !1);
      l = game.world.createBox(new Box2D.Common.Math.b2Vec2(10, 1), new Box2D.Common.Math.b2Vec2(h, l));
      l.body.SetAngle(game.world.getBox2DBodyDefinition().angle + Math.PI / 2);
      game.ui.setImage(l.body, "graphics/spinner.png");
      a.Initialize(k.body, n.body, k.body.GetWorldCenter());
      game.world.getBox2DWorld().CreateJoint(a);
      a.Initialize(k.body, l.body, k.body.GetWorldCenter());
      game.world.getBox2DWorld().CreateJoint(a);
      d.Initialize(n.body, l.body, n.body.GetWorldCenter());
      game.world.getBox2DWorld().CreateJoint(d)
    }
  };
  a.createDebugObjects = function() {
    game.world.getBox2DBodyDefinition().type = Box2D.Dynamics.b2Body.b2_dynamicBody;
    game.world.getBox2DBodyDefinition().fixedRotation = !1;
    game.world.getBox2DFixtureDefinition().restitution = 2.5;
    game.world.getBox2DFixtureDefinition().shape = new Box2D.Collision.Shapes.b2CircleShape(0.25);
    for(var a = 0;a < 0;a++) {
      var d = a * 5 % (e.x - 10);
      game.world.getBox2DBodyDefinition().position.y = 15 + a % 20;
      game.world.getBox2DBodyDefinition().position.x = d + a % 20 / 20 + 4.5;
      d = game.world.getBox2DWorld().CreateBody(game.world.getBox2DBodyDefinition());
      d.display = {};
      d.display.size = new Box2D.Common.Math.b2Vec2(0.5, 0.5);
      d.CreateFixture(game.world.getBox2DFixtureDefinition())
    }
    game.world.getBox2DFixtureDefinition().shape = new Box2D.Collision.Shapes.b2PolygonShape;
    game.world.getBox2DFixtureDefinition().shape.SetAsBox(0.25, 0.25);
    for(a = 0;a < 0;a++) {
      d = a * 5 % (e.x - 10), game.world.getBox2DBodyDefinition().position.y = 15 + (a + 5) % 20, game.world.getBox2DBodyDefinition().position.x = d + (a + 5) % 20 / 20 + 4.5, game.world.getBox2DBodyDefinition().angle = a % 17 / 17, d = game.world.getBox2DWorld().CreateBody(game.world.getBox2DBodyDefinition()), d.display = {}, d.display.size = new Box2D.Common.Math.b2Vec2(0.5, 0.5), d.CreateFixture(game.world.getBox2DFixtureDefinition())
    }
    game.world.getBox2DFixtureDefinition().shape = new Box2D.Collision.Shapes.b2PolygonShape;
    game.world.getBox2DFixtureDefinition().shape.SetAsArray([new Box2D.Common.Math.b2Vec2(-0.5, -0.5), new Box2D.Common.Math.b2Vec2(0.5, -0.5), new Box2D.Common.Math.b2Vec2(-0.5, 0.5)], 3);
    for(a = 0;a < 0;a++) {
      d = a * 5 % (e.x - 10), game.world.getBox2DBodyDefinition().position.y = 15 + (a + 10) % 20, game.world.getBox2DBodyDefinition().position.x = d + (a + 10) % 20 / 20 + 4.5, game.world.getBox2DBodyDefinition().angle = a % 22 / 22, d = game.world.getBox2DWorld().CreateBody(game.world.getBox2DBodyDefinition()), d.display = {}, d.display.size = new Box2D.Common.Math.b2Vec2(0.75, 0.75), d.CreateFixture(game.world.getBox2DFixtureDefinition())
    }
    game.world.getBox2DFixtureDefinition().shape = new Box2D.Collision.Shapes.b2PolygonShape;
    game.world.getBox2DFixtureDefinition().shape.SetAsArray([new Box2D.Common.Math.b2Vec2(-0.5, -0.5), new Box2D.Common.Math.b2Vec2(0, -0.5), new Box2D.Common.Math.b2Vec2(0.5, 0), new Box2D.Common.Math.b2Vec2(0.5, 0.5), new Box2D.Common.Math.b2Vec2(0, 0.3)], 5);
    for(a = 0;a < 0;a++) {
      d = a * 5 % (e.x - 10), game.world.getBox2DBodyDefinition().position.y = 15 + (a + 15) % 20, game.world.getBox2DBodyDefinition().position.x = d + (a + 15) % 20 / 20 + 4.5, game.world.getBox2DBodyDefinition().angle = a % 35 / 35, d = game.world.getBox2DWorld().CreateBody(game.world.getBox2DBodyDefinition()), d.display = {}, d.display.size = new Box2D.Common.Math.b2Vec2(0.75, 0.75), d.CreateFixture(game.world.getBox2DFixtureDefinition())
    }
  };
  a.createMario = function(a) {
    var d = new Box2D.Common.Math.b2Vec2(2, 2), a = new Box2D.Common.Math.b2Vec2(a.x + d.x / 2, a.y + d.y / 2);
    game.platformer.createBlock(d, new Box2D.Common.Math.b2Vec2(a.x, a.y));
    game.platformer.createBlock(d, new Box2D.Common.Math.b2Vec2(a.x + d.x, a.y));
    game.platformer.createBlock(d, new Box2D.Common.Math.b2Vec2(a.x + d.x * 2, a.y));
    game.platformer.createBlock(d, new Box2D.Common.Math.b2Vec2(a.x + d.x * 3, a.y));
    game.platformer.createBlock(d, new Box2D.Common.Math.b2Vec2(a.x + d.x * 4, a.y));
    game.platformer.createBlock(d, new Box2D.Common.Math.b2Vec2(a.x + d.x * 5, a.y));
    game.platformer.createBlock(d, new Box2D.Common.Math.b2Vec2(a.x + d.x * 6, a.y));
    game.platformer.createBlock(d, new Box2D.Common.Math.b2Vec2(a.x + d.x * 7, a.y));
    game.platformer.createBlock(d, new Box2D.Common.Math.b2Vec2(a.x + d.x * 8, a.y));
    game.platformer.createBlock(d, new Box2D.Common.Math.b2Vec2(a.x + d.x * 9, a.y));
    game.platformer.createBlock(d, new Box2D.Common.Math.b2Vec2(a.x + d.x * 10, a.y));
    game.platformer.createBlock(d, new Box2D.Common.Math.b2Vec2(a.x + d.x * 11, a.y));
    game.platformer.createBlock(d, new Box2D.Common.Math.b2Vec2(a.x + d.x * 12, a.y));
    game.platformer.createBlock(d, new Box2D.Common.Math.b2Vec2(a.x + d.x * 13, a.y))
  };
  a.preThink = function(a, e) {
    d.handleKeyEvents(e)
  };
  a.preDraw = function() {
    game.ui.lookAt(player.body.GetWorldCenter())
  }
})(test);


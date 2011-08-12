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
    for(var d = a;d = d.substring(0, d.lastIndexOf("."));) {
      if(goog.getObjectByName(d)) {
        break
      }
      goog.implicitNamespaces_[d] = !0
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
goog.exportPath_ = function(a, d, b) {
  a = a.split(".");
  b = b || goog.global;
  !(a[0] in b) && b.execScript && b.execScript("var " + a[0]);
  for(var f;a.length && (f = a.shift());) {
    !a.length && goog.isDef(d) ? b[f] = d : b = b[f] ? b[f] : b[f] = {}
  }
};
goog.getObjectByName = function(a, d) {
  for(var b = a.split("."), f = d || goog.global, e;e = b.shift();) {
    if(goog.isDefAndNotNull(f[e])) {
      f = f[e]
    }else {
      return null
    }
  }
  return f
};
goog.globalize = function(a, d) {
  var b = d || goog.global, f;
  for(f in a) {
    b[f] = a[f]
  }
};
goog.addDependency = function(a, d, b) {
  if(!COMPILED) {
    for(var f, a = a.replace(/\\/g, "/"), e = goog.dependencies_, g = 0;f = d[g];g++) {
      e.nameToPath[f] = a, a in e.pathToNames || (e.pathToNames[a] = {}), e.pathToNames[a][f] = !0
    }
    for(f = 0;d = b[f];f++) {
      a in e.requires || (e.requires[a] = {}), e.requires[a][d] = !0
    }
  }
};
goog.ENABLE_DEBUG_LOADER = !0;
goog.require = function(a) {
  if(!COMPILED && !goog.isProvided_(a)) {
    if(goog.ENABLE_DEBUG_LOADER) {
      var d = goog.getPathFromDeps_(a);
      if(d) {
        goog.included_[d] = !0;
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
        for(var a = goog.global.document.getElementsByTagName("script"), d = a.length - 1;d >= 0;--d) {
          var b = a[d].src, f = b.lastIndexOf("?"), f = f == -1 ? b.length : f;
          if(b.substr(f - 7, 7) == "base.js") {
            goog.basePath = b.substr(0, f - 7);
            break
          }
        }
      }
    }
  }, goog.importScript_ = function(a) {
    var d = goog.global.CLOSURE_IMPORT_SCRIPT || goog.writeScriptTag_;
    !goog.dependencies_.written[a] && d(a) && (goog.dependencies_.written[a] = !0)
  }, goog.writeScriptTag_ = function(a) {
    return goog.inHtmlDocument_() ? (goog.global.document.write('<script type="text/javascript" src="' + a + '"><\/script>'), !0) : !1
  }, goog.writeScripts_ = function() {
    function a(e) {
      if(!(e in f.written)) {
        if(!(e in f.visited) && (f.visited[e] = !0, e in f.requires)) {
          for(var h in f.requires[e]) {
            if(!goog.isProvided_(h)) {
              if(h in f.nameToPath) {
                a(f.nameToPath[h])
              }else {
                throw Error("Undefined nameToPath for " + h);
              }
            }
          }
        }
        e in b || (b[e] = !0, d.push(e))
      }
    }
    var d = [], b = {}, f = goog.dependencies_, e;
    for(e in goog.included_) {
      f.written[e] || a(e)
    }
    for(e = 0;e < d.length;e++) {
      if(d[e]) {
        goog.importScript_(goog.basePath + d[e])
      }else {
        throw Error("Undefined script input");
      }
    }
  }, goog.getPathFromDeps_ = function(a) {
    return a in goog.dependencies_.nameToPath ? goog.dependencies_.nameToPath[a] : null
  }, goog.findBasePath_(), goog.global.CLOSURE_NO_DEPS || goog.importScript_(goog.basePath + "deps.js")
}
goog.typeOf = function(a) {
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
};
goog.propertyIsEnumerableCustom_ = function(a, d) {
  if(d in a) {
    for(var b in a) {
      if(b == d && Object.prototype.hasOwnProperty.call(a, d)) {
        return!0
      }
    }
  }
  return!1
};
goog.propertyIsEnumerable_ = function(a, d) {
  return a instanceof Object ? Object.prototype.propertyIsEnumerable.call(a, d) : goog.propertyIsEnumerableCustom_(a, d)
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
  var d = goog.typeOf(a);
  return d == "array" || d == "object" && typeof a.length == "number"
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
  }catch(d) {
  }
};
goog.UID_PROPERTY_ = "closure_uid_" + Math.floor(Math.random() * 2147483648).toString(36);
goog.uidCounter_ = 0;
goog.getHashCode = goog.getUid;
goog.removeHashCode = goog.removeUid;
goog.cloneObject = function(a) {
  var d = goog.typeOf(a);
  if(d == "object" || d == "array") {
    if(a.clone) {
      return a.clone()
    }
    var d = d == "array" ? [] : {}, b;
    for(b in a) {
      d[b] = goog.cloneObject(a[b])
    }
    return d
  }
  return a
};
goog.bindNative_ = function(a, d, b) {
  return a.call.apply(a.bind, arguments)
};
goog.bindJs_ = function(a, d, b) {
  if(!a) {
    throw Error();
  }
  if(arguments.length > 2) {
    var f = Array.prototype.slice.call(arguments, 2);
    return function() {
      var e = Array.prototype.slice.call(arguments);
      Array.prototype.unshift.apply(e, f);
      return a.apply(d, e)
    }
  }else {
    return function() {
      return a.apply(d, arguments)
    }
  }
};
goog.bind = function(a, d, b) {
  goog.bind = Function.prototype.bind && Function.prototype.bind.toString().indexOf("native code") != -1 ? goog.bindNative_ : goog.bindJs_;
  return goog.bind.apply(null, arguments)
};
goog.partial = function(a, d) {
  var b = Array.prototype.slice.call(arguments, 1);
  return function() {
    var d = Array.prototype.slice.call(arguments);
    d.unshift.apply(d, b);
    return a.apply(this, d)
  }
};
goog.mixin = function(a, d) {
  for(var b in d) {
    a[b] = d[b]
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
        var d = goog.global.document, b = d.createElement("script");
        b.type = "text/javascript";
        b.defer = !1;
        b.appendChild(d.createTextNode(a));
        d.body.appendChild(b);
        d.body.removeChild(b)
      }
    }else {
      throw Error("goog.globalEval not available");
    }
  }
};
goog.evalWorksForGlobals_ = null;
goog.getCssName = function(a, d) {
  var b = function(a) {
    return goog.cssNameMapping_[a] || a
  }, f;
  f = goog.cssNameMapping_ ? goog.cssNameMappingStyle_ == "BY_WHOLE" ? b : function(a) {
    for(var a = a.split("-"), d = [], f = 0;f < a.length;f++) {
      d.push(b(a[f]))
    }
    return d.join("-")
  } : function(a) {
    return a
  };
  return d ? a + "-" + f(d) : f(a)
};
goog.setCssNameMapping = function(a, d) {
  goog.cssNameMapping_ = a;
  goog.cssNameMappingStyle_ = d
};
goog.getMsg = function(a, d) {
  var b = d || {}, f;
  for(f in b) {
    var e = ("" + b[f]).replace(/\$/g, "$$$$"), a = a.replace(RegExp("\\{\\$" + f + "\\}", "gi"), e)
  }
  return a
};
goog.exportSymbol = function(a, d, b) {
  goog.exportPath_(a, d, b)
};
goog.exportProperty = function(a, d, b) {
  a[d] = b
};
goog.inherits = function(a, d) {
  function b() {
  }
  b.prototype = d.prototype;
  a.superClass_ = d.prototype;
  a.prototype = new b;
  a.prototype.constructor = a
};
goog.base = function(a, d, b) {
  var f = arguments.callee.caller;
  if(f.superClass_) {
    return f.superClass_.constructor.apply(a, Array.prototype.slice.call(arguments, 1))
  }
  for(var e = Array.prototype.slice.call(arguments, 2), g = !1, h = a.constructor;h;h = h.superClass_ && h.superClass_.constructor) {
    if(h.prototype[d] === f) {
      g = !0
    }else {
      if(g) {
        return h.prototype[d].apply(a, e)
      }
    }
  }
  if(a[d] === f) {
    return a.constructor.prototype[d].apply(a, e)
  }else {
    throw Error("goog.base called from a method of one name to a method of a different name");
  }
};
goog.scope = function(a) {
  a.call(goog.global)
};
var Box2D = Box2D || {};
Box2D.base = Box2D.base || {};
(function(a, d) {
  if(!(Object.prototype.defineProperty instanceof Function) && Object.prototype.__defineGetter__ instanceof Function && Object.prototype.__defineSetter__ instanceof Function) {
    Object.defineProperty = function(a, d, b) {
      b.get instanceof Function && a.__defineGetter__(d, b.get);
      b.set instanceof Function && a.__defineSetter__(d, b.set)
    }
  }
  var b = function() {
  };
  a.inherit = function(a, d) {
    b.prototype = d.prototype;
    a.prototype = new b;
    a.prototype.constructor = a
  };
  a.generateCallback = function(a, d) {
    return function() {
      d.apply(a, arguments)
    }
  };
  a.NVector = function(a) {
    a === d && (a = 0);
    for(var e = Array(a || 0), b = 0;b < a;++b) {
      e[b] = 0
    }
    return e
  };
  a.is = function(a, e) {
    return a === null ? !1 : e instanceof Function && a instanceof e ? !0 : a.constructor.__implements !== d && a.constructor.__implements[e] ? !0 : !1
  };
  a.parseUInt = function(a) {
    return Math.abs(a)
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
  a.prototype.Contains = function(a) {
    var b;
    return b = (b = (b = (b = this.lowerBound.x <= a.lowerBound.x) && this.lowerBound.y <= a.lowerBound.y) && a.upperBound.x <= this.upperBound.x) && a.upperBound.y <= this.upperBound.y
  };
  a.prototype.RayCast = function(a, b) {
    var f = -Number.MAX_VALUE, e = Number.MAX_VALUE, g = b.p2.x - b.p1.x;
    if(Math.abs(g) < Number.MIN_VALUE) {
      if(b.p1.x < this.lowerBound.x || this.upperBound.x < b.p1.x) {
        return!1
      }
    }else {
      var h = 1 / g, g = (this.lowerBound.x - b.p1.x) * h;
      h *= this.upperBound.x - b.p1.x;
      var j = -1;
      g > h && (j = g, g = h, h = j, j = 1);
      if(g > f) {
        a.normal.x = j, a.normal.y = 0, f = g
      }
      e = Math.min(e, h);
      if(f > e) {
        return!1
      }
    }
    g = b.p2.y - b.p1.y;
    if(Math.abs(g) < Number.MIN_VALUE) {
      if(b.p1.y < this.lowerBound.y || this.upperBound.y < b.p1.y) {
        return!1
      }
    }else {
      h = 1 / g;
      g = (this.lowerBound.y - b.p1.y) * h;
      h *= this.upperBound.y - b.p1.y;
      j = -1;
      g > h && (j = g, g = h, h = j, j = 1);
      if(g > f) {
        a.normal.y = j, a.normal.x = 0, f = g
      }
      e = Math.min(e, h);
      if(f > e) {
        return!1
      }
    }
    a.fraction = f;
    return!0
  };
  a.prototype.TestOverlap = function(a) {
    return a.lowerBound.x - this.upperBound.x > 0 ? !1 : a.lowerBound.y - this.upperBound.y > 0 ? !1 : this.lowerBound.x - a.upperBound.x > 0 ? !1 : this.lowerBound.y - a.upperBound.y > 0 ? !1 : !0
  };
  a.Combine = function(d, b) {
    var f = new a;
    f.Combine(d, b);
    return f
  };
  a.prototype.Combine = function(a, b) {
    this.lowerBound.x = Math.min(a.lowerBound.x, b.lowerBound.x);
    this.lowerBound.y = Math.min(a.lowerBound.y, b.lowerBound.y);
    this.upperBound.x = Math.max(a.upperBound.x, b.upperBound.x);
    this.upperBound.y = Math.max(a.upperBound.y, b.upperBound.y)
  }
})(Box2D.Collision.b2AABB);
Box2D.Collision.b2Collision = function() {
};
(function(a) {
  a.ClipSegmentToLine = function(a, b, f, e) {
    e === void 0 && (e = 0);
    var g = 0, h = b[0].v, j = b[1].v, l = f.x * h.x + f.y * h.y - e, f = f.x * j.x + f.y * j.y - e;
    l <= 0 && a[g++].Set(b[0]);
    f <= 0 && a[g++].Set(b[1]);
    if(l * f < 0) {
      f = l / (l - f), e = a[g].v, e.x = h.x + f * (j.x - h.x), e.y = h.y + f * (j.y - h.y), a[g].id = l > 0 ? b[0].id : b[1].id, g++
    }
    return g
  };
  a.EdgeSeparation = function(a, b, f, e, g) {
    f === void 0 && (f = 0);
    for(var h = a.m_vertices, j = a.m_normals, a = e.m_vertices, l = b.R.col1.x * j[f].x + b.R.col2.x * j[f].y, j = b.R.col1.y * j[f].x + b.R.col2.y * j[f].y, k = g.R.col1.x * l + g.R.col1.y * j, o = g.R.col2.x * l + g.R.col2.y * j, m = 0, s = Number.MAX_VALUE, q = 0;q < e.m_vertexCount;++q) {
      var w = a[q].x * k + a[q].y * o;
      w < s && (s = w, m = q)
    }
    return(g.position.x + (g.R.col1.x * a[m].x + g.R.col2.x * a[m].y) - (b.position.x + (b.R.col1.x * h[f].x + b.R.col2.x * h[f].y))) * l + (g.position.y + (g.R.col1.y * a[m].x + g.R.col2.y * a[m].y) - (b.position.y + (b.R.col1.y * h[f].x + b.R.col2.y * h[f].y))) * j
  };
  a.FindMaxSeparation = function(d, b, f, e, g) {
    var h = b.m_normals, j = g.position.x + (g.R.col1.x * e.m_centroid.x + g.R.col2.x * e.m_centroid.y), l = g.position.y + (g.R.col1.y * e.m_centroid.x + g.R.col2.y * e.m_centroid.y);
    j -= f.position.x + (f.R.col1.x * b.m_centroid.x + f.R.col2.x * b.m_centroid.y);
    l -= f.position.y + (f.R.col1.y * b.m_centroid.x + f.R.col2.y * b.m_centroid.y);
    for(var k = j * f.R.col1.x + l * f.R.col1.y, l = j * f.R.col2.x + l * f.R.col2.y, j = 0, o = -Number.MAX_VALUE, m = 0;m < b.m_vertexCount;++m) {
      var s = h[m].x * k + h[m].y * l;
      s > o && (o = s, j = m)
    }
    h = a.EdgeSeparation(b, f, j, e, g);
    k = j - 1;
    k < 0 && (k = b.m_vertexCount - 1);
    l = a.EdgeSeparation(b, f, k, e, g);
    o = j + 1;
    o >= b.m_vertexCount && (o = 0);
    var m = a.EdgeSeparation(b, f, o, e, g), q = s = 0, w = 0;
    if(l > h && l > m) {
      w = -1, s = k, q = l
    }else {
      if(m > h) {
        w = 1, s = o, q = m
      }else {
        return d[0] = j, h
      }
    }
    for(;;) {
      if(w == -1 ? (j = s - 1, j < 0 && (j = b.m_vertexCount - 1)) : (j = s + 1, j >= b.m_vertexCount && (j = 0)), h = a.EdgeSeparation(b, f, j, e, g), h > q) {
        s = j, q = h
      }else {
        break
      }
    }
    d[0] = s;
    return q
  };
  a.FindIncidentEdge = function(a, b, f, e, g, h) {
    e === void 0 && (e = 0);
    for(var j = f.R.col1.x * b.m_normals[e].x + f.R.col2.x * b.m_normals[e].y, b = f.R.col1.y * b.m_normals[e].x + f.R.col2.y * b.m_normals[e].y, f = h.R.col1.x * j + h.R.col1.y * b, b = h.R.col2.x * j + h.R.col2.y * b, j = f, f = 0, l = Number.MAX_VALUE, k = 0;k < g.m_vertexCount;k++) {
      var o = j * g.m_normals[k].x + b * g.m_normals[k].y;
      o < l && (l = o, f = k)
    }
    j = f + 1;
    j >= g.m_vertexCount && (j = 0);
    a[0].v.x = h.position.x + (h.R.col1.x * g.m_vertices[f].x + h.R.col2.x * g.m_vertices[f].y);
    a[0].v.y = h.position.y + (h.R.col1.y * g.m_vertices[f].x + h.R.col2.y * g.m_vertices[f].y);
    a[0].id.features.referenceEdge = e;
    a[0].id.features.incidentEdge = f;
    a[0].id.features.incidentVertex = 0;
    a[1].v.x = h.position.x + (h.R.col1.x * g.m_vertices[j].x + h.R.col2.x * g.m_vertices[j].y);
    a[1].v.y = h.position.y + (h.R.col1.y * g.m_vertices[j].x + h.R.col2.y * g.m_vertices[j].y);
    a[1].id.features.referenceEdge = e;
    a[1].id.features.incidentEdge = j;
    a[1].id.features.incidentVertex = 1
  };
  a.MakeClipPointVector = function() {
    return[new Box2D.Collision.ClipVertex, new Box2D.Collision.ClipVertex]
  };
  a.CollidePolygons = function(d, b, f, e, g) {
    d.m_pointCount = 0;
    var h = b.m_radius + e.m_radius;
    a.s_edgeAO[0] = 0;
    var j = a.FindMaxSeparation(a.s_edgeAO, b, f, e, g);
    if(!(j > h)) {
      a.s_edgeBO[0] = 0;
      var l = a.FindMaxSeparation(a.s_edgeBO, e, g, b, f);
      if(!(l > h)) {
        var k = b, o = e, m = f, s = g, q = a.s_edgeAO[0], w = 0;
        d.m_type = Box2D.Collision.b2Manifold.e_faceA;
        if(l > 0.98 * j + 0.001) {
          k = e, o = b, m = g, s = f, q = a.s_edgeBO[0], d.m_type = Box2D.Collision.b2Manifold.e_faceB, w = 1
        }
        b = a.s_incidentEdge;
        a.FindIncidentEdge(b, k, m, q, o, s);
        o = k.m_vertices[q];
        k = q + 1 < k.m_vertexCount ? k.m_vertices[q + 1] : k.m_vertices[0];
        a.s_localTangent.Set(k.x - o.x, k.y - o.y);
        a.s_localTangent.Normalize();
        a.s_localNormal.x = a.s_localTangent.y;
        a.s_localNormal.y = -a.s_localTangent.x;
        a.s_planePoint.Set(0.5 * (o.x + k.x), 0.5 * (o.y + k.y));
        a.s_tangent.x = m.R.col1.x * a.s_localTangent.x + m.R.col2.x * a.s_localTangent.y;
        a.s_tangent.y = m.R.col1.y * a.s_localTangent.x + m.R.col2.y * a.s_localTangent.y;
        a.s_tangent2.x = -a.s_tangent.x;
        a.s_tangent2.y = -a.s_tangent.y;
        a.s_normal.x = a.s_tangent.y;
        a.s_normal.y = -a.s_tangent.x;
        a.s_v11.x = m.position.x + (m.R.col1.x * o.x + m.R.col2.x * o.y);
        a.s_v11.y = m.position.y + (m.R.col1.y * o.x + m.R.col2.y * o.y);
        a.s_v12.x = m.position.x + (m.R.col1.x * k.x + m.R.col2.x * k.y);
        a.s_v12.y = m.position.y + (m.R.col1.y * k.x + m.R.col2.y * k.y);
        if(!(a.ClipSegmentToLine(a.s_clipPoints1, b, a.s_tangent2, -a.s_tangent.x * a.s_v11.x - a.s_tangent.y * a.s_v11.y + h) < 2) && !(a.ClipSegmentToLine(a.s_clipPoints2, a.s_clipPoints1, a.s_tangent, a.s_tangent.x * a.s_v12.x + a.s_tangent.y * a.s_v12.y + h) < 2)) {
          d.m_localPlaneNormal.SetV(a.s_localNormal);
          d.m_localPoint.SetV(a.s_planePoint);
          m = a.s_normal.x * a.s_v11.x + a.s_normal.y * a.s_v11.y;
          for(q = k = 0;q < Box2D.Common.b2Settings.b2_maxManifoldPoints;++q) {
            if(a.s_normal.x * a.s_clipPoints2[q].v.x + a.s_normal.y * a.s_clipPoints2[q].v.y - m <= h) {
              o = a.s_clipPoints2[q].v.x - s.position.x, b = a.s_clipPoints2[q].v.y - s.position.y, d.m_points[k].m_localPoint.x = o * s.R.col1.x + b * s.R.col1.y, d.m_points[k].m_localPoint.y = o * s.R.col2.x + b * s.R.col2.y, d.m_points[k].m_id.Set(a.s_clipPoints2[q].id), d.m_points[k].m_id.features.flip = w, k++
            }
          }
          d.m_pointCount = k
        }
      }
    }
  };
  a.CollideCircles = function(a, b, f, e, g) {
    a.m_pointCount = 0;
    var h = g.position.x + (g.R.col1.x * e.m_p.x + g.R.col2.x * e.m_p.y) - (f.position.x + (f.R.col1.x * b.m_p.x + f.R.col2.x * b.m_p.y)), f = g.position.y + (g.R.col1.y * e.m_p.x + g.R.col2.y * e.m_p.y) - (f.position.y + (f.R.col1.y * b.m_p.x + f.R.col2.y * b.m_p.y)), g = b.m_radius + e.m_radius;
    if(!(h * h + f * f > g * g)) {
      a.m_type = Box2D.Collision.b2Manifold.e_circles, a.m_localPoint.SetV(b.m_p), a.m_localPlaneNormal.SetZero(), a.m_pointCount = 1, a.m_points[0].m_localPoint.SetV(e.m_p), a.m_points[0].m_id.key = 0
    }
  };
  a.CollidePolygonAndCircle = function(a, b, f, e, g) {
    a.m_pointCount = 0;
    for(var h = g.position.x + (g.R.col1.x * e.m_p.x + g.R.col2.x * e.m_p.y) - f.position.x, j = g.position.y + (g.R.col1.y * e.m_p.x + g.R.col2.y * e.m_p.y) - f.position.y, g = h * f.R.col1.x + j * f.R.col1.y, f = h * f.R.col2.x + j * f.R.col2.y, h = 0, j = -Number.MAX_VALUE, l = b.m_radius + e.m_radius, k = 0;k < b.m_vertexCount;++k) {
      var o = b.m_normals[k].x * (g - b.m_vertices[k].x) + b.m_normals[k].y * (f - b.m_vertices[k].y);
      if(o > l) {
        return
      }
      o > j && (j = o, h = k)
    }
    o = h + 1;
    o >= b.m_vertexCount && (o = 0);
    var k = b.m_vertices[h], m = b.m_vertices[o];
    if(j < Number.MIN_VALUE) {
      a.m_pointCount = 1, a.m_type = Box2D.Collision.b2Manifold.e_faceA, a.m_localPlaneNormal.SetV(b.m_normals[h]), a.m_localPoint.x = 0.5 * (k.x + m.x), a.m_localPoint.y = 0.5 * (k.y + m.y)
    }else {
      if((g - k.x) * (m.x - k.x) + (f - k.y) * (m.y - k.y) <= 0) {
        if((g - k.x) * (g - k.x) + (f - k.y) * (f - k.y) > l * l) {
          return
        }
        a.m_pointCount = 1;
        a.m_type = Box2D.Collision.b2Manifold.e_faceA;
        a.m_localPlaneNormal.x = g - k.x;
        a.m_localPlaneNormal.y = f - k.y;
        a.m_localPlaneNormal.Normalize();
        a.m_localPoint.SetV(k)
      }else {
        if((g - m.x) * (k.x - m.x) + (f - m.y) * (k.y - m.y) <= 0) {
          if((g - m.x) * (g - m.x) + (f - m.y) * (f - m.y) > l * l) {
            return
          }
          a.m_pointCount = 1;
          a.m_type = Box2D.Collision.b2Manifold.e_faceA;
          a.m_localPlaneNormal.x = g - m.x;
          a.m_localPlaneNormal.y = f - m.y;
          a.m_localPlaneNormal.Normalize();
          a.m_localPoint.SetV(m)
        }else {
          o = 0.5 * (k.x + m.x);
          k = 0.5 * (k.y + m.y);
          j = (g - o) * b.m_normals[h].x + (f - k) * b.m_normals[h].y;
          if(j > l) {
            return
          }
          a.m_pointCount = 1;
          a.m_type = Box2D.Collision.b2Manifold.e_faceA;
          a.m_localPlaneNormal.x = b.m_normals[h].x;
          a.m_localPlaneNormal.y = b.m_normals[h].y;
          a.m_localPlaneNormal.Normalize();
          a.m_localPoint.Set(o, k)
        }
      }
    }
    a.m_points[0].m_localPoint.SetV(e.m_p);
    a.m_points[0].m_id.key = 0
  };
  a.TestOverlap = function(a, b) {
    return b.lowerBound.x - a.upperBound.x > 0 ? !1 : b.lowerBound.y - a.upperBound.y > 0 ? !1 : a.lowerBound.x - b.upperBound.x > 0 ? !1 : a.lowerBound.y - b.upperBound.y > 0 ? !1 : !0
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
    var d = new a;
    d.key = this.key;
    return d
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
  a.Distance = function(d, b, f) {
    a.s_simplex.ReadCache(b, f.proxyA, f.transformA, f.proxyB, f.transformB);
    (a.s_simplex.m_count < 1 || a.s_simplex.m_count > 3) && Box2D.Common.b2Settings.b2Assert(!1);
    for(var e = 0;e < 20;) {
      for(var g = [], h = 0;h < a.s_simplex.m_count;h++) {
        g[h] = {}, g[h].indexA = a.s_simplex.m_vertices[h].indexA, g[h].indexB = a.s_simplex.m_vertices[h].indexB
      }
      a.s_simplex.m_count == 2 ? a.s_simplex.Solve2() : a.s_simplex.m_count == 3 && a.s_simplex.Solve3();
      if(a.s_simplex.m_count == 3) {
        break
      }
      h = a.s_simplex.GetSearchDirection();
      if(h.LengthSquared() < Box2D.MIN_VALUE_SQUARED) {
        break
      }
      a.s_simplex.m_vertices[a.s_simplex.m_count].indexA = f.proxyA.GetSupport(Box2D.Common.Math.b2Math.MulTMV(f.transformA.R, h.GetNegative()));
      a.s_simplex.m_vertices[a.s_simplex.m_count].wA = Box2D.Common.Math.b2Math.MulX(f.transformA, f.proxyA.GetVertex(a.s_simplex.m_vertices[a.s_simplex.m_count].indexA));
      a.s_simplex.m_vertices[a.s_simplex.m_count].indexB = f.proxyB.GetSupport(Box2D.Common.Math.b2Math.MulTMV(f.transformB.R, h));
      a.s_simplex.m_vertices[a.s_simplex.m_count].wB = Box2D.Common.Math.b2Math.MulX(f.transformB, f.proxyB.GetVertex(a.s_simplex.m_vertices[a.s_simplex.m_count].indexB));
      a.s_simplex.m_vertices[a.s_simplex.m_count].w = Box2D.Common.Math.b2Math.SubtractVV(a.s_simplex.m_vertices[a.s_simplex.m_count].wB, a.s_simplex.m_vertices[a.s_simplex.m_count].wA);
      e++;
      for(var j = !1, h = 0;h < g.length;h++) {
        if(a.s_simplex.m_vertices[a.s_simplex.m_count].indexA == g[h].indexA && a.s_simplex.m_vertices[a.s_simplex.m_count].indexB == g[h].indexB) {
          j = !0;
          break
        }
      }
      if(j) {
        break
      }
      a.s_simplex.m_count++
    }
    a.s_simplex.GetWitnessPoints(d.pointA, d.pointB);
    d.distance = Box2D.Common.Math.b2Math.SubtractVV(d.pointA, d.pointB).Length();
    d.iterations = e;
    a.s_simplex.WriteCache(b);
    if(f.useRadii) {
      b = f.proxyA.m_radius, f = f.proxyB.m_radius, d.distance > b + f && d.distance > Number.MIN_VALUE ? (d.distance -= b + f, e = Box2D.Common.Math.b2Math.SubtractVV(d.pointB, d.pointA), e.Normalize(), d.pointA.x += b * e.x, d.pointA.y += b * e.y, d.pointB.x -= f * e.x, d.pointB.y -= f * e.y) : (f = new Box2D.Common.Math.b2Vec2, f.x = 0.5 * (d.pointA.x + d.pointB.x), f.y = 0.5 * (d.pointA.y + d.pointB.y), d.pointA.x = d.pointB.x = f.x, d.pointA.y = d.pointB.y = f.y, d.distance = 0)
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
    var b = a.GetType();
    b == Box2D.Collision.Shapes.b2Shape.e_circleShape ? (this.m_vertices = [a.m_p], this.m_count = 1, this.m_radius = a.m_radius) : b == Box2D.Collision.Shapes.b2Shape.e_polygonShape ? (this.m_vertices = a.m_vertices, this.m_count = a.m_vertexCount, this.m_radius = a.m_radius) : Box2D.Common.b2Settings.b2Assert(!1)
  };
  a.prototype.GetSupport = function(a) {
    for(var b = 0, f = this.m_vertices[0].x * a.x + this.m_vertices[0].y * a.y, e = 1;e < this.m_count;e++) {
      var g = this.m_vertices[e].x * a.x + this.m_vertices[e].y * a.y;
      g > f && (b = e, f = g)
    }
    return b
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
Box2D.Dynamics.b2World = function(a, d) {
  this.m_contactManager = new Box2D.Dynamics.b2ContactManager;
  this.m_contactSolver = new Box2D.Dynamics.Contacts.b2ContactSolver;
  this.m_island = new Box2D.Dynamics.b2Island;
  if(this.constructor === Box2D.Dynamics.b2World) {
    this.m_newFixture = this.m_isLocked = !1, this.m_controllerList = this.m_jointList = this.m_contactList = this.m_bodyList = this.m_debugDraw = this.m_destructionListener = null, this.m_controllerCount = this.m_jointCount = this.m_contactCount = this.m_bodyCount = 0, Box2D.Dynamics.b2World.m_warmStarting = !0, Box2D.Dynamics.b2World.m_continuousPhysics = !0, this.m_allowSleep = d, this.m_gravity = a, this.m_inv_dt0 = 0, this.m_contactManager.m_world = this, this.m_groundBody = this.CreateBody(new Box2D.Dynamics.b2BodyDef)
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
    var b = this.m_contactManager.m_broadPhase;
    this.m_contactManager.m_broadPhase = a;
    for(var f = this.m_bodyList;f;f = f.m_next) {
      for(var e = f.m_fixtureList;e;e = e.m_next) {
        e.m_proxy = a.CreateProxy(b.GetFatAABB(e.m_proxy), e)
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
      for(var b = a.m_jointList;b;) {
        var f = b, b = b.next;
        this.m_destructionListener && this.m_destructionListener.SayGoodbyeJoint(f.joint);
        this.DestroyJoint(f.joint)
      }
      for(b = a.m_controllerList;b;) {
        f = b, b = b.nextController, f.controller.RemoveBody(a)
      }
      for(b = a.m_contactList;b;) {
        f = b, b = b.next, this.m_contactManager.Destroy(f.contact)
      }
      a.m_contactList = null;
      for(b = a.m_fixtureList;b;) {
        f = b, b = b.m_next, this.m_destructionListener && this.m_destructionListener.SayGoodbyeFixture(f), f.DestroyProxy(this.m_contactManager.m_broadPhase), f.Destroy()
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
    var b = Box2D.Dynamics.Joints.b2Joint.Create(a, null);
    b.m_prev = null;
    if(b.m_next = this.m_jointList) {
      this.m_jointList.m_prev = b
    }
    this.m_jointList = b;
    this.m_jointCount++;
    b.m_edgeA.joint = b;
    b.m_edgeA.other = b.m_bodyB;
    b.m_edgeA.prev = null;
    if(b.m_edgeA.next = b.m_bodyA.m_jointList) {
      b.m_bodyA.m_jointList.prev = b.m_edgeA
    }
    b.m_bodyA.m_jointList = b.m_edgeA;
    b.m_edgeB.joint = b;
    b.m_edgeB.other = b.m_bodyA;
    b.m_edgeB.prev = null;
    if(b.m_edgeB.next = b.m_bodyB.m_jointList) {
      b.m_bodyB.m_jointList.prev = b.m_edgeB
    }
    b.m_bodyB.m_jointList = b.m_edgeB;
    var f = a.bodyA, e = a.bodyB;
    if(!a.collideConnected) {
      for(a = e.GetContactList();a;) {
        a.other == f && a.contact.FlagForFiltering(), a = a.next
      }
    }
    return b
  };
  a.prototype.DestroyJoint = function(a) {
    var b = a.m_collideConnected;
    if(a.m_prev) {
      a.m_prev.m_next = a.m_next
    }
    if(a.m_next) {
      a.m_next.m_prev = a.m_prev
    }
    if(a == this.m_jointList) {
      this.m_jointList = a.m_next
    }
    var f = a.m_bodyA, e = a.m_bodyB;
    f.SetAwake(!0);
    e.SetAwake(!0);
    if(a.m_edgeA.prev) {
      a.m_edgeA.prev.next = a.m_edgeA.next
    }
    if(a.m_edgeA.next) {
      a.m_edgeA.next.prev = a.m_edgeA.prev
    }
    if(a.m_edgeA == f.m_jointList) {
      f.m_jointList = a.m_edgeA.next
    }
    a.m_edgeA.prev = null;
    a.m_edgeA.next = null;
    if(a.m_edgeB.prev) {
      a.m_edgeB.prev.next = a.m_edgeB.next
    }
    if(a.m_edgeB.next) {
      a.m_edgeB.next.prev = a.m_edgeB.prev
    }
    if(a.m_edgeB == e.m_jointList) {
      e.m_jointList = a.m_edgeB.next
    }
    a.m_edgeB.prev = null;
    a.m_edgeB.next = null;
    Box2D.Dynamics.Joints.b2Joint.Destroy(a, null);
    this.m_jointCount--;
    if(!b) {
      for(a = e.GetContactList();a;) {
        a.other == f && a.contact.FlagForFiltering(), a = a.next
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
  a.prototype.SetWarmStarting = function(d) {
    a.m_warmStarting = d
  };
  a.prototype.SetContinuousPhysics = function(d) {
    a.m_continuousPhysics = d
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
  a.prototype.Step = function(d, b, f) {
    d === void 0 && (d = 0);
    b === void 0 && (b = 0);
    f === void 0 && (f = 0);
    if(this.m_newFixture) {
      this.m_contactManager.FindNewContacts(), this.m_newFixture = !1
    }
    this.m_isLocked = !0;
    var e = new Box2D.Dynamics.b2TimeStep;
    e.dt = d;
    e.velocityIterations = b;
    e.positionIterations = f;
    e.inv_dt = d > 0 ? 1 / d : 0;
    e.dtRatio = this.m_inv_dt0 * d;
    e.warmStarting = a.m_warmStarting;
    this.m_contactManager.Collide();
    if(e.dt > 0) {
      this.Solve(e), a.m_continuousPhysics && e.dt > 0 && this.SolveTOI(e), this.m_inv_dt0 = e.inv_dt
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
      var d = this.m_debugDraw.GetFlags();
      if(d & Box2D.Dynamics.b2DebugDraw.e_shapeBit) {
        for(var b = new Box2D.Common.b2Color(0.5, 0.5, 0.3), f = new Box2D.Common.b2Color(0.5, 0.9, 0.5), e = new Box2D.Common.b2Color(0.5, 0.5, 0.9), g = new Box2D.Common.b2Color(0.6, 0.6, 0.6), h = new Box2D.Common.b2Color(0.9, 0.7, 0.7), j = this.m_bodyList;j;j = j.m_next) {
          for(var l = j.GetFixtureList();l;l = l.m_next) {
            var k = l.GetShape();
            j.IsActive() ? j.GetType() == Box2D.Dynamics.b2Body.b2_staticBody ? this.DrawShape(k, j.m_xf, f) : j.GetType() == Box2D.Dynamics.b2Body.b2_kinematicBody ? this.DrawShape(k, j.m_xf, e) : j.IsAwake() ? this.DrawShape(k, j.m_xf, h) : this.DrawShape(k, j.m_xf, g) : this.DrawShape(k, j.m_xf, b)
          }
        }
      }
      if(d & Box2D.Dynamics.b2DebugDraw.e_jointBit) {
        for(j = this.m_jointList;j;j = j.m_next) {
          this.DrawJoint(j)
        }
      }
      if(d & Box2D.Dynamics.b2DebugDraw.e_controllerBit) {
        for(j = this.m_controllerList;j;j = j.m_next) {
          j.Draw(this.m_debugDraw)
        }
      }
      if(d & Box2D.Dynamics.b2DebugDraw.e_pairBit) {
        j = new Box2D.Common.b2Color(0.3, 0.9, 0.9);
        for(l = this.m_contactManager.m_contactList;l;l = l.GetNext()) {
          f = l.GetFixtureA(), b = l.GetFixtureB(), f = f.GetAABB().GetCenter(), b = b.GetAABB().GetCenter(), this.m_debugDraw.DrawSegment(f, b, j)
        }
      }
      if(d & Box2D.Dynamics.b2DebugDraw.e_aabbBit) {
        b = new Box2D.Common.b2Color(0, 0, 0.8);
        for(j = this.m_bodyList;j;j = j.GetNext()) {
          if(j.IsActive()) {
            for(l = j.GetFixtureList();l;l = l.GetNext()) {
              f = this.m_contactManager.m_broadPhase.GetFatAABB(l.m_proxy), this.m_debugDraw.DrawPolygon([new Box2D.Common.Math.b2Vec2(f.lowerBound.x, f.lowerBound.y), new Box2D.Common.Math.b2Vec2(f.upperBound.x, f.lowerBound.y), new Box2D.Common.Math.b2Vec2(f.upperBound.x, f.upperBound.y), new Box2D.Common.Math.b2Vec2(f.lowerBound.x, f.upperBound.y)], 4, b)
            }
          }
        }
      }
      if(d & Box2D.Dynamics.b2DebugDraw.e_centerOfMassBit) {
        for(j = this.m_bodyList;j;j = j.m_next) {
          a.s_xf.R = j.m_xf.R, a.s_xf.position = j.GetWorldCenter(), this.m_debugDraw.DrawTransform(a.s_xf)
        }
      }
    }
  };
  a.prototype.QueryAABB = function(a, b) {
    var f = this.m_contactManager.m_broadPhase;
    f.Query(function(e) {
      return a(f.GetUserData(e))
    }, b)
  };
  a.prototype.QueryShape = function(a, b, f) {
    if(f === void 0 || f === null) {
      f = new Box2D.Common.Math.b2Transform, f.SetIdentity()
    }
    var e = this.m_contactManager.m_broadPhase, g = new Box2D.Collision.b2AABB;
    b.ComputeAABB(g, f);
    e.Query(function(g) {
      g = e.GetUserData(g);
      g instanceof Box2D.Dynamics.b2Fixture || (g = null);
      return Box2D.Collision.Shapes.b2Shape.TestOverlap(b, f, g.GetShape(), g.GetBody().GetTransform()) ? a(g) : !0
    }, g)
  };
  a.prototype.QueryPoint = function(a, b) {
    var f = this.m_contactManager.m_broadPhase, e = new Box2D.Collision.b2AABB;
    e.lowerBound.Set(b.x - Box2D.Common.b2Settings.b2_linearSlop, b.y - Box2D.Common.b2Settings.b2_linearSlop);
    e.upperBound.Set(b.x + Box2D.Common.b2Settings.b2_linearSlop, b.y + Box2D.Common.b2Settings.b2_linearSlop);
    f.Query(function(e) {
      e = f.GetUserData(e);
      e instanceof Box2D.Dynamics.b2Fixture || (e = null);
      return e.TestPoint(b) ? a(e) : !0
    }, e)
  };
  a.prototype.RayCast = function(a, b, f) {
    var e = this.m_contactManager.m_broadPhase, g = new Box2D.Collision.b2RayCastOutput, h = new Box2D.Collision.b2RayCastInput(b, f);
    e.RayCast(function(j, h) {
      var k = e.GetUserData(h);
      k instanceof Box2D.Dynamics.b2Fixture || (k = null);
      if(k.RayCast(g, j)) {
        var o = 1 - g.fraction, o = new Box2D.Common.Math.b2Vec2(o * b.x + g.fraction * f.x, o * b.y + g.fraction * f.y);
        return a(k, o, g.normal, g.fraction)
      }else {
        return j.maxFraction
      }
    }, h)
  };
  a.prototype.RayCastOne = function(a, b) {
    var f;
    this.RayCast(function(a, d, b, j) {
      j === void 0 && (j = 0);
      f = a;
      return j
    }, a, b);
    return f
  };
  a.prototype.RayCastAll = function(a, b) {
    var f = [];
    this.RayCast(function(a) {
      f[f.length] = a;
      return 1
    }, a, b);
    return f
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
    for(var b = this.m_controllerList;b;b = b.m_next) {
      b.Step(a)
    }
    this.m_island.Initialize(this.m_bodyCount, this.m_contactCount, this.m_jointCount, this.m_contactManager.m_contactListener, this.m_contactSolver);
    for(var f = this.m_bodyList;f;f = f.m_next) {
      f.m_islandFlag = !1
    }
    for(b = this.m_contactList;b;b = b.m_next) {
      b.m_islandFlag = !1
    }
    for(b = this.m_jointList;b;b = b.m_next) {
      b.m_islandFlag = !1
    }
    for(b = this.m_bodyList;b;b = b.m_next) {
      if(!b.m_islandFlag && b.IsAwake() && b.IsActive() && b.GetType() != Box2D.Dynamics.b2Body.b2_staticBody) {
        this.m_island.Clear();
        var e = [];
        e.push(b);
        for(b.m_islandFlag = !0;e.length > 0;) {
          if(f = e.pop(), this.m_island.AddBody(f), f.IsAwake() || f.SetAwake(!0), f.GetType() != Box2D.Dynamics.b2Body.b2_staticBody) {
            for(var g = f.m_contactList;g;g = g.next) {
              if(!g.contact.m_islandFlag && !g.contact.IsSensor() && g.contact.IsEnabled() != !1 && g.contact.IsTouching() && (this.m_island.AddContact(g.contact), g.contact.m_islandFlag = !0, !g.other.m_islandFlag)) {
                e.push(g.other), g.other.m_islandFlag = !0
              }
            }
            for(f = f.m_jointList;f;f = f.next) {
              if(!f.joint.m_islandFlag && f.other.IsActive() && (this.m_island.AddJoint(f.joint), f.joint.m_islandFlag = !0, !f.other.m_islandFlag)) {
                e.push(f.other), f.other.m_islandFlag = !0
              }
            }
          }
        }
        this.m_island.Solve(a, this.m_gravity, this.m_allowSleep);
        for(e = 0;e < this.m_island.m_bodyCount;++e) {
          if(this.m_island.m_bodies[e].GetType() == Box2D.Dynamics.b2Body.b2_staticBody) {
            this.m_island.m_bodies[e].m_islandFlag = !1
          }
        }
      }
    }
    for(f = this.m_bodyList;f;f = f.m_next) {
      f.IsAwake() && f.IsActive() && f.GetType() != Box2D.Dynamics.b2Body.b2_staticBody && f.SynchronizeFixtures()
    }
    this.m_contactManager.FindNewContacts()
  };
  a.prototype.SolveTOI = function(d) {
    this.m_island.Initialize(this.m_bodyCount, Box2D.Common.b2Settings.b2_maxTOIContactsPerIsland, Box2D.Common.b2Settings.b2_maxTOIJointsPerIsland, this.m_contactManager.m_contactListener, this.m_contactSolver);
    for(var b = this.m_bodyList;b;b = b.m_next) {
      b.m_islandFlag = !1, b.m_sweep.t0 = 0
    }
    for(var f = this.m_contactList;f;f = f.m_next) {
      f.m_islandFlag = !1, f.m_toi = null
    }
    for(f = this.m_jointList;f;f = f.m_next) {
      f.m_islandFlag = !1
    }
    for(;;) {
      var f = this._SolveTOI2(d), e = f.minContact, f = f.minTOI;
      if(e === null || a.MAX_TOI < f) {
        break
      }
      a.s_backupA.Set(e.m_fixtureA.m_body.m_sweep);
      a.s_backupB.Set(e.m_fixtureB.m_body.m_sweep);
      e.m_fixtureA.m_body.Advance(f);
      e.m_fixtureB.m_body.Advance(f);
      e.Update(this.m_contactManager.m_contactListener);
      e.m_toi = null;
      if(e.IsSensor() || e.IsEnabled() == !1) {
        e.m_fixtureA.m_body.m_sweep.Set(a.s_backupA), e.m_fixtureB.m_body.m_sweep.Set(a.s_backupB), e.m_fixtureA.m_body.SynchronizeTransform(), e.m_fixtureB.m_body.SynchronizeTransform()
      }else {
        if(e.IsTouching()) {
          var g = e.m_fixtureA.m_body;
          if(g.GetType() != Box2D.Dynamics.b2Body.b2_dynamicBody) {
            g = e.m_fixtureB.m_body
          }
          this.m_island.Clear();
          e = new Box2D.Queue;
          e.enqueue(g);
          for(g.m_islandFlag = !0;e.size > 0;) {
            if(b = e.dequeue(), this.m_island.AddBody(b), b.IsAwake() || b.SetAwake(!0), b.GetType() == Box2D.Dynamics.b2Body.b2_dynamicBody) {
              for(g = b.m_contactList;g;g = g.next) {
                if(this.m_island.m_contactCount == this.m_island.m_contactCapacity) {
                  break
                }
                if(!g.contact.m_islandFlag && !g.contact.IsSensor() && g.contact.IsEnabled() != !1 && g.contact.IsTouching() && (this.m_island.AddContact(g.contact), g.contact.m_islandFlag = !0, !g.other.m_islandFlag)) {
                  g.other.GetType() != Box2D.Dynamics.b2Body.b2_staticBody && (g.other.Advance(f), g.other.SetAwake(!0)), e.enqueue(g.other), g.other.m_islandFlag = !0
                }
              }
              for(g = b.m_jointList;g;g = g.next) {
                if(this.m_island.m_jointCount != this.m_island.m_jointCapacity && !g.joint.m_islandFlag && g.other.IsActive() && (this.m_island.AddJoint(g.joint), g.joint.m_islandFlag = !0, !g.other.m_islandFlag)) {
                  g.other.GetType() != Box2D.Dynamics.b2Body.b2_staticBody && (g.other.Advance(f), g.other.SetAwake(!0)), e.enqueue(g.other), g.other.m_islandFlag = !0
                }
              }
            }
          }
          e = new Box2D.Dynamics.b2TimeStep;
          e.warmStarting = !1;
          e.dt = (1 - f) * d.dt;
          e.inv_dt = 1 / e.dt;
          e.dtRatio = 0;
          e.velocityIterations = d.velocityIterations;
          e.positionIterations = d.positionIterations;
          this.m_island.SolveTOI(e);
          for(f = 0;f < this.m_island.m_bodyCount;f++) {
            if(this.m_island.m_bodies[f].m_islandFlag = !1, this.m_island.m_bodies[f].IsAwake() && this.m_island.m_bodies[f].GetType() == Box2D.Dynamics.b2Body.b2_dynamicBody) {
              this.m_island.m_bodies[f].SynchronizeFixtures();
              for(g = this.m_island.m_bodies[f].m_contactList;g;g = g.next) {
                g.contact.m_toi = null
              }
            }
          }
          for(f = 0;f < this.m_island.m_contactCount;f++) {
            this.m_island.m_contacts[f].m_islandFlag = !1, this.m_island.m_contacts[f].m_toi = null
          }
          for(f = 0;f < this.m_island.m_jointCount;f++) {
            this.m_island.m_joints[f].m_islandFlag = !1
          }
          this.m_contactManager.FindNewContacts()
        }
      }
    }
  };
  a.prototype._SolveTOI2 = function(a) {
    for(var b = null, f = 1, e = this.m_contactList;e;e = e.m_next) {
      if(!this._SolveTOI2SkipContact(a, e)) {
        var g = 1;
        if(e.m_toi != null) {
          g = e.m_toi
        }else {
          if(e.IsTouching()) {
            g = 1
          }else {
            var h = e.m_fixtureA.m_body.m_sweep.t0;
            if(e.m_fixtureA.m_body.m_sweep.t0 < e.m_fixtureB.m_body.m_sweep.t0) {
              h = e.m_fixtureB.m_body.m_sweep.t0, e.m_fixtureA.m_body.m_sweep.Advance(h)
            }else {
              if(e.m_fixtureB.m_body.m_sweep.t0 < e.m_fixtureA.m_body.m_sweep.t0) {
                h = e.m_fixtureA.m_body.m_sweep.t0, e.m_fixtureB.m_body.m_sweep.Advance(h)
              }
            }
            g = e.ComputeTOI(e.m_fixtureA.m_body.m_sweep, e.m_fixtureB.m_body.m_sweep);
            Box2D.Common.b2Settings.b2Assert(0 <= g && g <= 1);
            g > 0 && g < 1 && (g = (1 - g) * h + g)
          }
          e.m_toi = g
        }
        Number.MIN_VALUE < g && g < f && (b = e, f = g)
      }
    }
    return{minContact:b, minTOI:f}
  };
  a.prototype._SolveTOI2SkipContact = function(a, b) {
    return b.IsSensor() || b.IsEnabled() == !1 || !b.IsContinuous() ? !0 : (b.m_fixtureA.m_body.GetType() != Box2D.Dynamics.b2Body.b2_dynamicBody || !b.m_fixtureA.m_body.IsAwake()) && (b.m_fixtureB.m_body.GetType() != Box2D.Dynamics.b2Body.b2_dynamicBody || !b.m_fixtureB.m_body.IsAwake()) ? !0 : !1
  };
  a.prototype.DrawJoint = function(d) {
    d.m_type == Box2D.Dynamics.Joints.b2Joint.e_distanceJoint || d.m_type == Box2D.Dynamics.Joints.b2Joint.e_mouseJoint ? this.m_debugDraw.DrawSegment(d.GetAnchorA(), d.GetAnchorB(), a.s_jointColor) : d.m_type == Box2D.Dynamics.Joints.b2Joint.e_pulleyJoint ? (this.m_debugDraw.DrawSegment(d.GetGroundAnchorA(), d.GetAnchorA(), a.s_jointColor), this.m_debugDraw.DrawSegment(d.GetGroundAnchorB(), d.GetAnchorB(), a.s_jointColor), this.m_debugDraw.DrawSegment(d.GetGroundAnchorA(), d.GetGroundAnchorB(), 
    a.s_jointColor)) : (d.GetBodyA() != this.m_groundBody && this.m_debugDraw.DrawSegment(d.GetBodyA().m_xf.position, d.GetAnchorA(), a.s_jointColor), this.m_debugDraw.DrawSegment(d.GetAnchorA(), d.GetAnchorB(), a.s_jointColor), d.GetBodyB() != this.m_groundBody && this.m_debugDraw.DrawSegment(d.GetBodyB().m_xf.position, d.GetAnchorB(), a.s_jointColor))
  };
  a.prototype.DrawShape = function(a, b, f) {
    switch(a.m_type) {
      case Box2D.Collision.Shapes.b2Shape.e_circleShape:
        var e = a instanceof Box2D.Collision.Shapes.b2CircleShape ? a : null;
        this.m_debugDraw.DrawSolidCircle(Box2D.Common.Math.b2Math.MulX(b, e.m_p), e.m_radius, b.R.col1, f);
        break;
      case Box2D.Collision.Shapes.b2Shape.e_polygonShape:
        for(var e = 0, e = a instanceof Box2D.Collision.Shapes.b2PolygonShape ? a : null, a = parseInt(e.GetVertexCount()), g = e.GetVertices(), h = Array(a), e = 0;e < a;++e) {
          h[e] = Box2D.Common.Math.b2Math.MulX(b, g[e])
        }
        this.m_debugDraw.DrawSolidPolygon(h, a, f);
        break;
      case Box2D.Collision.Shapes.b2Shape.e_edgeShape:
        e = a instanceof Box2D.Collision.Shapes.b2EdgeShape ? a : null, this.m_debugDraw.DrawSegment(Box2D.Common.Math.b2Math.MulX(b, e.GetVertex1()), Box2D.Common.Math.b2Math.MulX(b, e.GetVertex2()), f)
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
  a.prototype._color = function(a, b) {
    return"rgba(" + ((a & 16711680) >> 16) + "," + ((a & 65280) >> 8) + "," + (a & 255) + "," + b + ")"
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
  a.prototype.DrawPolygon = function(a, b, f) {
    if(b) {
      var e = this.m_ctx, g = this.m_drawScale;
      e.beginPath();
      e.strokeStyle = this._color(f.color, this.m_alpha);
      e.moveTo(a[0].x * g, a[0].y * g);
      for(f = 1;f < b;f++) {
        e.lineTo(a[f].x * g, a[f].y * g)
      }
      e.lineTo(a[0].x * g, a[0].y * g);
      e.closePath();
      e.stroke()
    }
  };
  a.prototype.DrawSolidPolygon = function(a, b, f) {
    if(b) {
      var e = this.m_ctx, g = this.m_drawScale;
      e.beginPath();
      e.strokeStyle = this._color(f.color, this.m_alpha);
      e.fillStyle = this._color(f.color, this.m_fillAlpha);
      e.moveTo(a[0].x * g, a[0].y * g);
      for(f = 1;f < b;f++) {
        e.lineTo(a[f].x * g, a[f].y * g)
      }
      e.lineTo(a[0].x * g, a[0].y * g);
      e.closePath();
      e.fill();
      e.stroke()
    }
  };
  a.prototype.DrawCircle = function(a, b, f) {
    if(b) {
      var e = this.m_ctx, g = this.m_drawScale;
      e.beginPath();
      e.strokeStyle = this._color(f.color, this.m_alpha);
      e.arc(a.x * g, a.y * g, b * g, 0, Math.PI * 2, !0);
      e.closePath();
      e.stroke()
    }
  };
  a.prototype.DrawSolidCircle = function(a, b, f, e) {
    if(b) {
      var g = this.m_ctx, h = this.m_drawScale, j = a.x * h, l = a.y * h;
      g.moveTo(0, 0);
      g.beginPath();
      g.strokeStyle = this._color(e.color, this.m_alpha);
      g.fillStyle = this._color(e.color, this.m_fillAlpha);
      g.arc(j, l, b * h, 0, Math.PI * 2, !0);
      g.moveTo(j, l);
      g.lineTo((a.x + f.x * b) * h, (a.y + f.y * b) * h);
      g.closePath();
      g.fill();
      g.stroke()
    }
  };
  a.prototype.DrawSegment = function(a, b, f) {
    var e = this.m_ctx, g = this.m_drawScale;
    e.strokeStyle = this._color(f.color, this.m_alpha);
    e.beginPath();
    e.moveTo(a.x * g, a.y * g);
    e.lineTo(b.x * g, b.y * g);
    e.closePath();
    e.stroke()
  };
  a.prototype.DrawTransform = function(a) {
    var b = this.m_ctx, f = this.m_drawScale;
    b.beginPath();
    b.strokeStyle = this._color(16711680, this.m_alpha);
    b.moveTo(a.position.x * f, a.position.y * f);
    b.lineTo((a.position.x + this.m_xformScale * a.R.col1.x) * f, (a.position.y + this.m_xformScale * a.R.col1.y) * f);
    b.strokeStyle = this._color(65280, this.m_alpha);
    b.moveTo(a.position.x * f, a.position.y * f);
    b.lineTo((a.position.x + this.m_xformScale * a.R.col2.x) * f, (a.position.y + this.m_xformScale * a.R.col2.y) * f);
    b.closePath();
    b.stroke()
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
    var b = this.m_fixtureA.GetBody(), f = this.m_fixtureB.GetBody(), e = this.m_fixtureA.GetShape(), g = this.m_fixtureB.GetShape();
    a.Initialize(this.m_manifold, b.GetTransform(), e.m_radius, f.GetTransform(), g.m_radius)
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
  a.prototype.Reset = function(a, b) {
    a === void 0 && (a = null);
    b === void 0 && (b = null);
    this.enabled = !0;
    this.filtering = this.touching = this.continuous = this.sensor = !1;
    if(!a || !b) {
      this.m_fixtureB = this.m_fixtureA = null
    }else {
      if(a.IsSensor() || b.IsSensor()) {
        this.sensor = !0
      }
      var f = a.GetBody(), e = b.GetBody();
      if(f.GetType() != Box2D.Dynamics.b2Body.b2_dynamicBody || f.IsBullet() || e.GetType() != Box2D.Dynamics.b2Body.b2_dynamicBody || e.IsBullet()) {
        this.continuous = !0
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
  a.prototype.Update = function(a) {
    var b = this.m_oldManifold;
    this.m_oldManifold = this.m_manifold;
    this.m_manifold = b;
    this.enabled = !0;
    var f = !1, b = this.IsTouching(), e = this.m_fixtureA.m_body, g = this.m_fixtureB.m_body, h = this.m_fixtureA.m_aabb.TestOverlap(this.m_fixtureB.m_aabb);
    if(this.sensor) {
      h && (f = this.m_fixtureA.GetShape(), h = this.m_fixtureB.GetShape(), e = e.GetTransform(), g = g.GetTransform(), f = Box2D.Collision.Shapes.b2Shape.TestOverlap(f, e, h, g)), this.m_manifold.m_pointCount = 0
    }else {
      this.continuous = e.GetType() != Box2D.Dynamics.b2Body.b2_dynamicBody || e.IsBullet() || g.GetType() != Box2D.Dynamics.b2Body.b2_dynamicBody || g.IsBullet() ? !0 : !1;
      if(h) {
        this.Evaluate();
        f = this.m_manifold.m_pointCount > 0;
        for(h = 0;h < this.m_manifold.m_pointCount;++h) {
          var j = this.m_manifold.m_points[h];
          j.m_normalImpulse = 0;
          j.m_tangentImpulse = 0;
          for(var l = j.m_id, k = 0;k < this.m_oldManifold.m_pointCount;++k) {
            var o = this.m_oldManifold.m_points[k];
            if(o.m_id.key == l.key) {
              j.m_normalImpulse = o.m_normalImpulse;
              j.m_tangentImpulse = o.m_tangentImpulse;
              break
            }
          }
        }
      }else {
        this.m_manifold.m_pointCount = 0
      }
      f != b && (e.SetAwake(!0), g.SetAwake(!0))
    }
    this.touching = f;
    !b && f && a.BeginContact(this);
    b && !f && a.EndContact(this);
    this.sensor || a.PreSolve(this, this.m_oldManifold)
  };
  a.prototype.Evaluate = function() {
  };
  a.prototype.ComputeTOI = function(d, b) {
    a.s_input.proxyA.Set(this.m_fixtureA.GetShape());
    a.s_input.proxyB.Set(this.m_fixtureB.GetShape());
    a.s_input.sweepA = d;
    a.s_input.sweepB = b;
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
  a.prototype.Reset = function(a, b) {
    this.__super.Reset.call(this, a, b)
  };
  a.prototype.Evaluate = function() {
    var a = this.m_fixtureA.GetBody(), b = this.m_fixtureB.GetBody();
    Box2D.Collision.b2Collision.CollideCircles(this.m_manifold, this.m_fixtureA.GetShape() instanceof Box2D.Collision.Shapes.b2CircleShape ? this.m_fixtureA.GetShape() : null, a.m_xf, this.m_fixtureB.GetShape() instanceof Box2D.Collision.Shapes.b2CircleShape ? this.m_fixtureB.GetShape() : null, b.m_xf)
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
  a.prototype.AddType = function(a, b, f, e) {
    f === void 0 && (f = 0);
    e === void 0 && (e = 0);
    this.m_registers[f][e].createFcn = a;
    this.m_registers[f][e].destroyFcn = b;
    this.m_registers[f][e].primary = !0;
    if(f != e) {
      this.m_registers[e][f].createFcn = a, this.m_registers[e][f].destroyFcn = b, this.m_registers[e][f].primary = !1
    }
  };
  a.prototype.InitializeRegisters = function() {
    this.m_registers = Array(Box2D.Collision.Shapes.b2Shape.e_shapeTypeCount);
    for(var a = 0;a < Box2D.Collision.Shapes.b2Shape.e_shapeTypeCount;a++) {
      this.m_registers[a] = Array(Box2D.Collision.Shapes.b2Shape.e_shapeTypeCount);
      for(var b = 0;b < Box2D.Collision.Shapes.b2Shape.e_shapeTypeCount;b++) {
        this.m_registers[a][b] = new Box2D.Dynamics.Contacts.b2ContactRegister
      }
    }
    this.AddType(Box2D.Dynamics.Contacts.b2CircleContact.Create, Box2D.Dynamics.Contacts.b2CircleContact.Destroy, Box2D.Collision.Shapes.b2Shape.e_circleShape, Box2D.Collision.Shapes.b2Shape.e_circleShape);
    this.AddType(Box2D.Dynamics.Contacts.b2PolyAndCircleContact.Create, Box2D.Dynamics.Contacts.b2PolyAndCircleContact.Destroy, Box2D.Collision.Shapes.b2Shape.e_polygonShape, Box2D.Collision.Shapes.b2Shape.e_circleShape);
    this.AddType(Box2D.Dynamics.Contacts.b2PolygonContact.Create, Box2D.Dynamics.Contacts.b2PolygonContact.Destroy, Box2D.Collision.Shapes.b2Shape.e_polygonShape, Box2D.Collision.Shapes.b2Shape.e_polygonShape);
    this.AddType(Box2D.Dynamics.Contacts.b2EdgeAndCircleContact.Create, Box2D.Dynamics.Contacts.b2EdgeAndCircleContact.Destroy, Box2D.Collision.Shapes.b2Shape.e_edgeShape, Box2D.Collision.Shapes.b2Shape.e_circleShape);
    this.AddType(Box2D.Dynamics.Contacts.b2PolyAndEdgeContact.Create, Box2D.Dynamics.Contacts.b2PolyAndEdgeContact.Destroy, Box2D.Collision.Shapes.b2Shape.e_polygonShape, Box2D.Collision.Shapes.b2Shape.e_edgeShape)
  };
  a.prototype.Create = function(a, b) {
    var f = a.GetType(), e = b.GetType(), f = this.m_registers[f][e];
    if(f.pool) {
      return e = f.pool, f.pool = e.m_next, f.poolCount--, e.Reset(a, b), e
    }
    e = f.createFcn;
    return e != null ? (f.primary ? (e = e(), e.Reset(a, b)) : (e = e(), e.Reset(b, a)), e) : null
  };
  a.prototype.Create = function(a, b) {
    var f = a.GetType(), e = b.GetType(), f = this.m_registers[f][e];
    if(f.pool) {
      return e = f.pool, f.pool = e.m_next, f.poolCount--, e.Reset(a, b), e
    }
    e = f.createFcn;
    return e != null ? (f.primary ? (e = e(), e.Reset(a, b)) : (e = e(), e.Reset(b, a)), e) : null
  };
  a.prototype.Destroy = function(a) {
    a.m_manifold.m_pointCount > 0 && (a.m_fixtureA.m_body.SetAwake(!0), a.m_fixtureB.m_body.SetAwake(!0));
    var b = a.m_fixtureA.GetType(), f = a.m_fixtureB.GetType(), b = this.m_registers[b][f];
    b.poolCount++;
    a.m_next = b.pool;
    b.pool = a;
    b = b.destroyFcn;
    b(a)
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
  function d() {
    d.b2Settings.apply(this, arguments)
  }
  function b() {
    b.b2Mat22.apply(this, arguments);
    this.constructor === b && this.b2Mat22.apply(this, arguments)
  }
  function f() {
    f.b2Mat33.apply(this, arguments);
    this.constructor === f && this.b2Mat33.apply(this, arguments)
  }
  function e() {
    e.b2Math.apply(this, arguments)
  }
  function g() {
    g.b2Sweep.apply(this, arguments)
  }
  function h() {
    h.b2Transform.apply(this, arguments);
    this.constructor === h && this.b2Transform.apply(this, arguments)
  }
  function j() {
    j.b2Vec2.apply(this, arguments);
    this.constructor === j && this.b2Vec2.apply(this, arguments)
  }
  function l() {
    l.b2Vec3.apply(this, arguments);
    this.constructor === l && this.b2Vec3.apply(this, arguments)
  }
  function k() {
    k.b2Body.apply(this, arguments);
    this.constructor === k && this.b2Body.apply(this, arguments)
  }
  function o() {
    o.b2BodyDef.apply(this, arguments);
    this.constructor === o && this.b2BodyDef.apply(this, arguments)
  }
  function m() {
    m.b2ContactFilter.apply(this, arguments)
  }
  function s() {
    s.b2ContactImpulse.apply(this, arguments)
  }
  function q() {
    q.b2ContactListener.apply(this, arguments)
  }
  function w() {
    w.b2ContactManager.apply(this, arguments);
    this.constructor === w && this.b2ContactManager.apply(this, arguments)
  }
  function I() {
    I.b2DestructionListener.apply(this, arguments)
  }
  function A() {
    A.b2FilterData.apply(this, arguments)
  }
  function y() {
    y.b2Fixture.apply(this, arguments);
    this.constructor === y && this.b2Fixture.apply(this, arguments)
  }
  function x() {
    x.b2FixtureDef.apply(this, arguments);
    this.constructor === x && this.b2FixtureDef.apply(this, arguments)
  }
  function F() {
    F.b2Island.apply(this, arguments);
    this.constructor === F && this.b2Island.apply(this, arguments)
  }
  function E() {
    E.b2TimeStep.apply(this, arguments)
  }
  function J() {
    J.b2BuoyancyController.apply(this, arguments)
  }
  function n() {
    n.b2ConstantAccelController.apply(this, arguments)
  }
  function G() {
    G.b2ConstantForceController.apply(this, arguments)
  }
  function t() {
    t.b2Controller.apply(this, arguments)
  }
  function D() {
    D.b2ControllerEdge.apply(this, arguments)
  }
  function M() {
    M.b2GravityController.apply(this, arguments)
  }
  function N() {
    N.b2TensorDampingController.apply(this, arguments)
  }
  function p() {
    p.b2DistanceJoint.apply(this, arguments);
    this.constructor === p && this.b2DistanceJoint.apply(this, arguments)
  }
  function r() {
    r.b2DistanceJointDef.apply(this, arguments);
    this.constructor === r && this.b2DistanceJointDef.apply(this, arguments)
  }
  function v() {
    v.b2FrictionJoint.apply(this, arguments);
    this.constructor === v && this.b2FrictionJoint.apply(this, arguments)
  }
  function H() {
    H.b2FrictionJointDef.apply(this, arguments);
    this.constructor === H && this.b2FrictionJointDef.apply(this, arguments)
  }
  function K() {
    K.b2GearJoint.apply(this, arguments);
    this.constructor === K && this.b2GearJoint.apply(this, arguments)
  }
  function O() {
    O.b2GearJointDef.apply(this, arguments);
    this.constructor === O && this.b2GearJointDef.apply(this, arguments)
  }
  function C() {
    C.b2Jacobian.apply(this, arguments)
  }
  function B() {
    B.b2Joint.apply(this, arguments);
    this.constructor === B && this.b2Joint.apply(this, arguments)
  }
  function u() {
    u.b2JointDef.apply(this, arguments);
    this.constructor === u && this.b2JointDef.apply(this, arguments)
  }
  function L() {
    L.b2JointEdge.apply(this, arguments)
  }
  function P() {
    P.b2LineJoint.apply(this, arguments);
    this.constructor === P && this.b2LineJoint.apply(this, arguments)
  }
  function Q() {
    Q.b2LineJointDef.apply(this, arguments);
    this.constructor === Q && this.b2LineJointDef.apply(this, arguments)
  }
  function R() {
    R.b2MouseJoint.apply(this, arguments);
    this.constructor === R && this.b2MouseJoint.apply(this, arguments)
  }
  function S() {
    S.b2MouseJointDef.apply(this, arguments);
    this.constructor === S && this.b2MouseJointDef.apply(this, arguments)
  }
  function z() {
    z.b2PrismaticJoint.apply(this, arguments);
    this.constructor === z && this.b2PrismaticJoint.apply(this, arguments)
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
  Box2D.Common.b2Settings = d;
  Box2D.Common.Math.b2Mat22 = b;
  Box2D.Common.Math.b2Mat33 = f;
  Box2D.Common.Math.b2Math = e;
  Box2D.Common.Math.b2Sweep = g;
  Box2D.Common.Math.b2Transform = h;
  Box2D.Common.Math.b2Vec2 = j;
  Box2D.Common.Math.b2Vec3 = l;
  Box2D.Dynamics.b2Body = k;
  Box2D.Dynamics.b2BodyDef = o;
  Box2D.Dynamics.b2ContactFilter = m;
  Box2D.Dynamics.b2ContactImpulse = s;
  Box2D.Dynamics.b2ContactListener = q;
  Box2D.Dynamics.b2ContactManager = w;
  Box2D.Dynamics.b2DestructionListener = I;
  Box2D.Dynamics.b2FilterData = A;
  Box2D.Dynamics.b2Fixture = y;
  Box2D.Dynamics.b2FixtureDef = x;
  Box2D.Dynamics.b2Island = F;
  Box2D.Dynamics.b2TimeStep = E;
  Box2D.Dynamics.Controllers.b2BuoyancyController = J;
  Box2D.Dynamics.Controllers.b2ConstantAccelController = n;
  Box2D.Dynamics.Controllers.b2ConstantForceController = G;
  Box2D.Dynamics.Controllers.b2Controller = t;
  Box2D.Dynamics.Controllers.b2ControllerEdge = D;
  Box2D.Dynamics.Controllers.b2GravityController = M;
  Box2D.Dynamics.Controllers.b2TensorDampingController = N;
  Box2D.Dynamics.Joints.b2DistanceJoint = p;
  Box2D.Dynamics.Joints.b2DistanceJointDef = r;
  Box2D.Dynamics.Joints.b2FrictionJoint = v;
  Box2D.Dynamics.Joints.b2FrictionJointDef = H;
  Box2D.Dynamics.Joints.b2GearJoint = K;
  Box2D.Dynamics.Joints.b2GearJointDef = O;
  Box2D.Dynamics.Joints.b2Jacobian = C;
  Box2D.Dynamics.Joints.b2Joint = B;
  Box2D.Dynamics.Joints.b2JointDef = u;
  Box2D.Dynamics.Joints.b2JointEdge = L;
  Box2D.Dynamics.Joints.b2LineJoint = P;
  Box2D.Dynamics.Joints.b2LineJointDef = Q;
  Box2D.Dynamics.Joints.b2MouseJoint = R;
  Box2D.Dynamics.Joints.b2MouseJointDef = S;
  Box2D.Dynamics.Joints.b2PrismaticJoint = z;
  Box2D.Dynamics.Joints.b2PrismaticJointDef = T;
  Box2D.Dynamics.Joints.b2PulleyJoint = U;
  Box2D.Dynamics.Joints.b2PulleyJointDef = V;
  Box2D.Dynamics.Joints.b2RevoluteJoint = W;
  Box2D.Dynamics.Joints.b2RevoluteJointDef = X;
  Box2D.Dynamics.Joints.b2WeldJoint = Y;
  Box2D.Dynamics.Joints.b2WeldJointDef = Z
})();
(function() {
  var a = Box2D.Common.b2Settings, d = Box2D.Common.Math.b2Math, b = Box2D.Common.Math.b2Sweep, f = Box2D.Common.Math.b2Transform, e = Box2D.Common.Math.b2Vec2, g = Box2D.Collision.b2AABB, h = Box2D.Collision.b2ContactID, j = Box2D.Collision.b2Distance, l = Box2D.Collision.b2DistanceInput, k = Box2D.Collision.b2DistanceOutput, o = Box2D.Collision.b2DistanceProxy, m = Box2D.Collision.b2DynamicTree, s = Box2D.Collision.b2DynamicTreeBroadPhase, q = Box2D.Collision.b2DynamicTreeNode, w = Box2D.Collision.b2DynamicTreePair, 
  I = Box2D.Collision.b2Manifold, A = Box2D.Collision.b2ManifoldPoint, y = Box2D.Collision.b2Point, x = Box2D.Collision.b2RayCastInput, F = Box2D.Collision.b2RayCastOutput, E = Box2D.Collision.b2Segment, J = Box2D.Collision.b2SeparationFunction, n = Box2D.Collision.b2Simplex, G = Box2D.Collision.b2SimplexCache, t = Box2D.Collision.b2SimplexVertex, D = Box2D.Collision.b2TimeOfImpact, M = Box2D.Collision.b2TOIInput, N = Box2D.Collision.b2WorldManifold, p = Box2D.Collision.ClipVertex, r = Box2D.Collision.Features, 
  v = Box2D.Collision.IBroadPhase;
  m.b2DynamicTree = function() {
  };
  m.prototype.b2DynamicTree = function() {
    this.m_freeList = this.m_root = null;
    this.m_insertionCount = this.m_path = 0
  };
  m.prototype.CreateProxy = function(e, d) {
    var b = this.AllocateNode(), f = a.b2_aabbExtension, g = a.b2_aabbExtension;
    b.aabb.lowerBound.x = e.lowerBound.x - f;
    b.aabb.lowerBound.y = e.lowerBound.y - g;
    b.aabb.upperBound.x = e.upperBound.x + f;
    b.aabb.upperBound.y = e.upperBound.y + g;
    b.userData = d;
    this.InsertLeaf(b);
    return b
  };
  m.prototype.DestroyProxy = function(a) {
    this.RemoveLeaf(a);
    this.FreeNode(a)
  };
  m.prototype.MoveProxy = function(e, d, b) {
    a.b2Assert(e.IsLeaf());
    if(e.aabb.Contains(d)) {
      return!1
    }
    this.RemoveLeaf(e);
    var f = a.b2_aabbExtension + a.b2_aabbMultiplier * (b.x > 0 ? b.x : -b.x), b = a.b2_aabbExtension + a.b2_aabbMultiplier * (b.y > 0 ? b.y : -b.y);
    e.aabb.lowerBound.x = d.lowerBound.x - f;
    e.aabb.lowerBound.y = d.lowerBound.y - b;
    e.aabb.upperBound.x = d.upperBound.x + f;
    e.aabb.upperBound.y = d.upperBound.y + b;
    this.InsertLeaf(e);
    return!0
  };
  m.prototype.Rebalance = function(a) {
    a === void 0 && (a = 0);
    if(this.m_root != null) {
      for(var e = 0;e < a;e++) {
        for(var d = this.m_root, b = 0;d.IsLeaf() == !1;) {
          d = this.m_path >> b & 1 ? d.child2 : d.child1, b = b + 1 & 31
        }
        ++this.m_path;
        this.RemoveLeaf(d);
        this.InsertLeaf(d)
      }
    }
  };
  m.prototype.GetFatAABB = function(a) {
    return a.aabb
  };
  m.prototype.GetUserData = function(a) {
    return a.userData
  };
  m.prototype.Query = function(a, e) {
    if(this.m_root != null) {
      var d = [], b = 0;
      for(d[b++] = this.m_root;b > 0;) {
        var f = d[--b];
        if(f.aabb.TestOverlap(e)) {
          if(f.IsLeaf()) {
            if(!a(f)) {
              break
            }
          }else {
            d[b++] = f.child1, d[b++] = f.child2
          }
        }
      }
    }
  };
  m.prototype.RayCast = function(a, e) {
    if(this.m_root != null) {
      var b = e.p1, f = e.p2, p = d.SubtractVV(b, f);
      p.Normalize();
      var p = d.CrossFV(1, p), n = d.AbsV(p), j = e.maxFraction, r = new g, v = 0, h = 0, v = b.x + j * (f.x - b.x), h = b.y + j * (f.y - b.y);
      r.lowerBound.x = Math.min(b.x, v);
      r.lowerBound.y = Math.min(b.y, h);
      r.upperBound.x = Math.max(b.x, v);
      r.upperBound.y = Math.max(b.y, h);
      var G = [], t = 0;
      for(G[t++] = this.m_root;t > 0;) {
        if(j = G[--t], j.aabb.TestOverlap(r) != !1 && (v = j.aabb.GetCenter(), h = j.aabb.GetExtents(), !(Math.abs(p.x * (b.x - v.x) + p.y * (b.y - v.y)) - n.x * h.x - n.y * h.y > 0))) {
          if(j.IsLeaf()) {
            v = new x;
            v.p1 = e.p1;
            v.p2 = e.p2;
            v.maxFraction = e.maxFraction;
            j = a(v, j);
            if(j == 0) {
              break
            }
            if(j > 0) {
              v = b.x + j * (f.x - b.x), h = b.y + j * (f.y - b.y), r.lowerBound.x = Math.min(b.x, v), r.lowerBound.y = Math.min(b.y, h), r.upperBound.x = Math.max(b.x, v), r.upperBound.y = Math.max(b.y, h)
            }
          }else {
            G[t++] = j.child1, G[t++] = j.child2
          }
        }
      }
    }
  };
  m.prototype.AllocateNode = function() {
    if(this.m_freeList) {
      var a = this.m_freeList;
      this.m_freeList = a.parent;
      a.parent = null;
      a.child1 = null;
      a.child2 = null;
      return a
    }
    return new q
  };
  m.prototype.FreeNode = function(a) {
    a.parent = this.m_freeList;
    this.m_freeList = a
  };
  m.prototype.InsertLeaf = function(a) {
    ++this.m_insertionCount;
    if(this.m_root == null) {
      this.m_root = a, this.m_root.parent = null
    }else {
      var e = a.aabb.GetCenter(), b = this.m_root;
      if(b.IsLeaf() == !1) {
        do {
          var d = b.child1, b = b.child2, f = Math.abs((d.aabb.lowerBound.x + d.aabb.upperBound.x) / 2 - e.x) + Math.abs((d.aabb.lowerBound.y + d.aabb.upperBound.y) / 2 - e.y), g = Math.abs((b.aabb.lowerBound.x + b.aabb.upperBound.x) / 2 - e.x) + Math.abs((b.aabb.lowerBound.y + b.aabb.upperBound.y) / 2 - e.y), b = f < g ? d : b
        }while(b.IsLeaf() == !1)
      }
      e = b.parent;
      d = this.AllocateNode();
      d.parent = e;
      d.userData = null;
      d.aabb.Combine(a.aabb, b.aabb);
      if(e) {
        b.parent.child1 == b ? e.child1 = d : e.child2 = d;
        d.child1 = b;
        d.child2 = a;
        b.parent = d;
        a.parent = d;
        do {
          if(e.aabb.Contains(d.aabb)) {
            break
          }
          e.aabb.Combine(e.child1.aabb, e.child2.aabb);
          d = e;
          e = e.parent
        }while(e)
      }else {
        d.child1 = b, d.child2 = a, b.parent = d, this.m_root = a.parent = d
      }
    }
  };
  m.prototype.RemoveLeaf = function(a) {
    if(a == this.m_root) {
      this.m_root = null
    }else {
      var e = a.parent, b = e.parent, a = e.child1 == a ? e.child2 : e.child1;
      if(b) {
        b.child1 == e ? b.child1 = a : b.child2 = a;
        a.parent = b;
        for(this.FreeNode(e);b;) {
          e = b.aabb;
          b.aabb = g.Combine(b.child1.aabb, b.child2.aabb);
          if(e.Contains(b.aabb)) {
            break
          }
          b = b.parent
        }
      }else {
        this.m_root = a, a.parent = null, this.FreeNode(e)
      }
    }
  };
  s.b2DynamicTreeBroadPhase = function() {
    this.m_tree = new m;
    this.m_moveBuffer = [];
    this.m_pairBuffer = [];
    this.m_pairCount = 0
  };
  s.prototype.CreateProxy = function(a, e) {
    var b = this.m_tree.CreateProxy(a, e);
    ++this.m_proxyCount;
    this.BufferMove(b);
    return b
  };
  s.prototype.DestroyProxy = function(a) {
    this.UnBufferMove(a);
    --this.m_proxyCount;
    this.m_tree.DestroyProxy(a)
  };
  s.prototype.MoveProxy = function(a, e, b) {
    this.m_tree.MoveProxy(a, e, b) && this.BufferMove(a)
  };
  s.prototype.TestOverlap = function(a, e) {
    var b = this.m_tree.GetFatAABB(a), d = this.m_tree.GetFatAABB(e);
    return b.TestOverlap(d)
  };
  s.prototype.GetUserData = function(a) {
    return this.m_tree.GetUserData(a)
  };
  s.prototype.GetFatAABB = function(a) {
    return this.m_tree.GetFatAABB(a)
  };
  s.prototype.GetProxyCount = function() {
    return this.m_proxyCount
  };
  s.prototype.UpdatePairs = function(a) {
    for(var e = this, b = e.m_pairCount = 0, d, b = 0;b < e.m_moveBuffer.length;++b) {
      d = e.m_moveBuffer[b];
      var f = e.m_tree.GetFatAABB(d);
      e.m_tree.Query(function(a) {
        if(a == d) {
          return!0
        }
        e.m_pairCount == e.m_pairBuffer.length && (e.m_pairBuffer[e.m_pairCount] = new w);
        var b = e.m_pairBuffer[e.m_pairCount];
        b.proxyA = a < d ? a : d;
        b.proxyB = a >= d ? a : d;
        ++e.m_pairCount;
        return!0
      }, f)
    }
    for(b = e.m_moveBuffer.length = 0;b < e.m_pairCount;) {
      var f = e.m_pairBuffer[b], g = e.m_tree.GetUserData(f.proxyA), p = e.m_tree.GetUserData(f.proxyB);
      a(g, p);
      for(++b;b < e.m_pairCount;) {
        g = e.m_pairBuffer[b];
        if(g.proxyA != f.proxyA || g.proxyB != f.proxyB) {
          break
        }
        ++b
      }
    }
  };
  s.prototype.Query = function(a, e) {
    this.m_tree.Query(a, e)
  };
  s.prototype.RayCast = function(a, e) {
    this.m_tree.RayCast(a, e)
  };
  s.prototype.Validate = function() {
  };
  s.prototype.Rebalance = function(a) {
    a === void 0 && (a = 0);
    this.m_tree.Rebalance(a)
  };
  s.prototype.BufferMove = function(a) {
    this.m_moveBuffer[this.m_moveBuffer.length] = a
  };
  s.prototype.UnBufferMove = function(a) {
    this.m_moveBuffer.splice(this.m_moveBuffer.indexOf(a), 1)
  };
  s.prototype.ComparePairs = function() {
    return 0
  };
  s.__implements = {};
  s.__implements[v] = !0;
  q.b2DynamicTreeNode = function() {
    this.aabb = new g
  };
  q.prototype.IsLeaf = function() {
    return this.child1 == null
  };
  w.b2DynamicTreePair = function() {
  };
  I.b2Manifold = function() {
    this.m_pointCount = 0
  };
  I.prototype.b2Manifold = function() {
    this.m_points = [];
    for(var b = 0;b < a.b2_maxManifoldPoints;b++) {
      this.m_points[b] = new A
    }
    this.m_localPlaneNormal = new e;
    this.m_localPoint = new e
  };
  I.prototype.Reset = function() {
    for(var e = 0;e < a.b2_maxManifoldPoints;e++) {
      (this.m_points[e] instanceof A ? this.m_points[e] : null).Reset()
    }
    this.m_localPlaneNormal.SetZero();
    this.m_localPoint.SetZero();
    this.m_pointCount = this.m_type = 0
  };
  I.prototype.Set = function(e) {
    this.m_pointCount = e.m_pointCount;
    for(var b = 0;b < a.b2_maxManifoldPoints;b++) {
      (this.m_points[b] instanceof A ? this.m_points[b] : null).Set(e.m_points[b])
    }
    this.m_localPlaneNormal.SetV(e.m_localPlaneNormal);
    this.m_localPoint.SetV(e.m_localPoint);
    this.m_type = e.m_type
  };
  I.prototype.Copy = function() {
    var a = new I;
    a.Set(this);
    return a
  };
  Box2D.postDefs.push(function() {
    Box2D.Collision.b2Manifold.e_circles = 1;
    Box2D.Collision.b2Manifold.e_faceA = 2;
    Box2D.Collision.b2Manifold.e_faceB = 4
  });
  A.b2ManifoldPoint = function() {
    this.m_localPoint = new e;
    this.m_id = new h
  };
  A.prototype.b2ManifoldPoint = function() {
    this.Reset()
  };
  A.prototype.Reset = function() {
    this.m_localPoint.SetZero();
    this.m_tangentImpulse = this.m_normalImpulse = 0;
    this.m_id.key = 0
  };
  A.prototype.Set = function(a) {
    this.m_localPoint.SetV(a.m_localPoint);
    this.m_normalImpulse = a.m_normalImpulse;
    this.m_tangentImpulse = a.m_tangentImpulse;
    this.m_id.Set(a.m_id)
  };
  y.b2Point = function() {
    this.p = new e
  };
  y.prototype.Support = function() {
    return this.p
  };
  y.prototype.GetFirstVertex = function() {
    return this.p
  };
  x.b2RayCastInput = function() {
    this.p1 = new e;
    this.p2 = new e
  };
  x.prototype.b2RayCastInput = function(a, e, b) {
    a === void 0 && (a = null);
    e === void 0 && (e = null);
    b === void 0 && (b = 1);
    a && this.p1.SetV(a);
    e && this.p2.SetV(e);
    this.maxFraction = b
  };
  F.b2RayCastOutput = function() {
    this.normal = new e
  };
  E.b2Segment = function() {
    this.p1 = new e;
    this.p2 = new e
  };
  E.prototype.TestSegment = function(a, e, b, d) {
    d === void 0 && (d = 0);
    var f = b.p1, g = b.p2.x - f.x, p = b.p2.y - f.y, b = this.p2.y - this.p1.y, n = -(this.p2.x - this.p1.x), j = 100 * Number.MIN_VALUE, r = -(g * b + p * n);
    if(r > j) {
      var v = f.x - this.p1.x, h = f.y - this.p1.y, f = v * b + h * n;
      if(0 <= f && f <= d * r && (d = -g * h + p * v, -j * r <= d && d <= r * (1 + j))) {
        return f /= r, d = Math.sqrt(b * b + n * n), b /= d, n /= d, a[0] = f, e.Set(b, n), !0
      }
    }
    return!1
  };
  E.prototype.Extend = function(a) {
    this.ExtendForward(a);
    this.ExtendBackward(a)
  };
  E.prototype.ExtendForward = function(a) {
    var e = this.p2.x - this.p1.x, b = this.p2.y - this.p1.y, a = Math.min(e > 0 ? (a.upperBound.x - this.p1.x) / e : e < 0 ? (a.lowerBound.x - this.p1.x) / e : Number.POSITIVE_INFINITY, b > 0 ? (a.upperBound.y - this.p1.y) / b : b < 0 ? (a.lowerBound.y - this.p1.y) / b : Number.POSITIVE_INFINITY);
    this.p2.x = this.p1.x + e * a;
    this.p2.y = this.p1.y + b * a
  };
  E.prototype.ExtendBackward = function(a) {
    var e = -this.p2.x + this.p1.x, b = -this.p2.y + this.p1.y, a = Math.min(e > 0 ? (a.upperBound.x - this.p2.x) / e : e < 0 ? (a.lowerBound.x - this.p2.x) / e : Number.POSITIVE_INFINITY, b > 0 ? (a.upperBound.y - this.p2.y) / b : b < 0 ? (a.lowerBound.y - this.p2.y) / b : Number.POSITIVE_INFINITY);
    this.p1.x = this.p2.x + e * a;
    this.p1.y = this.p2.y + b * a
  };
  J.b2SeparationFunction = function() {
    this.m_localPoint = new e;
    this.m_axis = new e
  };
  J.prototype.Initialize = function(b, f, g, p, n) {
    this.m_proxyA = f;
    this.m_proxyB = p;
    var j = b.count;
    a.b2Assert(0 < j && j < 3);
    var r, v, h, G, t = G = h = p = f = 0, l = 0, t = 0;
    j == 1 ? (this.m_type = J.e_points, r = this.m_proxyA.GetVertex(b.indexA[0]), v = this.m_proxyB.GetVertex(b.indexB[0]), j = r, b = g.R, f = g.position.x + (b.col1.x * j.x + b.col2.x * j.y), p = g.position.y + (b.col1.y * j.x + b.col2.y * j.y), j = v, b = n.R, h = n.position.x + (b.col1.x * j.x + b.col2.x * j.y), G = n.position.y + (b.col1.y * j.x + b.col2.y * j.y), this.m_axis.x = h - f, this.m_axis.y = G - p, this.m_axis.Normalize()) : (b.indexB[0] == b.indexB[1] ? (this.m_type = J.e_faceA, 
    f = this.m_proxyA.GetVertex(b.indexA[0]), p = this.m_proxyA.GetVertex(b.indexA[1]), v = this.m_proxyB.GetVertex(b.indexB[0]), this.m_localPoint.x = 0.5 * (f.x + p.x), this.m_localPoint.y = 0.5 * (f.y + p.y), this.m_axis = d.CrossVF(d.SubtractVV(p, f), 1), this.m_axis.Normalize(), j = this.m_axis, b = g.R, t = b.col1.x * j.x + b.col2.x * j.y, l = b.col1.y * j.x + b.col2.y * j.y, j = this.m_localPoint, b = g.R, f = g.position.x + (b.col1.x * j.x + b.col2.x * j.y), p = g.position.y + (b.col1.y * 
    j.x + b.col2.y * j.y), j = v, b = n.R, h = n.position.x + (b.col1.x * j.x + b.col2.x * j.y), G = n.position.y + (b.col1.y * j.x + b.col2.y * j.y), t = (h - f) * t + (G - p) * l) : b.indexA[0] == b.indexA[0] ? (this.m_type = J.e_faceB, h = this.m_proxyB.GetVertex(b.indexB[0]), G = this.m_proxyB.GetVertex(b.indexB[1]), r = this.m_proxyA.GetVertex(b.indexA[0]), this.m_localPoint.x = 0.5 * (h.x + G.x), this.m_localPoint.y = 0.5 * (h.y + G.y), this.m_axis = d.CrossVF(d.SubtractVV(G, h), 1), this.m_axis.Normalize(), 
    j = this.m_axis, b = n.R, t = b.col1.x * j.x + b.col2.x * j.y, l = b.col1.y * j.x + b.col2.y * j.y, j = this.m_localPoint, b = n.R, h = n.position.x + (b.col1.x * j.x + b.col2.x * j.y), G = n.position.y + (b.col1.y * j.x + b.col2.y * j.y), j = r, b = g.R, f = g.position.x + (b.col1.x * j.x + b.col2.x * j.y), p = g.position.y + (b.col1.y * j.x + b.col2.y * j.y), t = (f - h) * t + (p - G) * l) : (f = this.m_proxyA.GetVertex(b.indexA[0]), p = this.m_proxyA.GetVertex(b.indexA[1]), h = this.m_proxyB.GetVertex(b.indexB[0]), 
    G = this.m_proxyB.GetVertex(b.indexB[1]), d.MulX(g, r), r = d.MulMV(g.R, d.SubtractVV(p, f)), d.MulX(n, v), t = d.MulMV(n.R, d.SubtractVV(G, h)), n = r.x * r.x + r.y * r.y, v = t.x * t.x + t.y * t.y, b = d.SubtractVV(t, r), g = r.x * b.x + r.y * b.y, b = t.x * b.x + t.y * b.y, r = r.x * t.x + r.y * t.y, l = n * v - r * r, t = 0, l != 0 && (t = d.Clamp((r * b - g * v) / l, 0, 1)), (r * t + b) / v < 0 && (t = d.Clamp((r - g) / n, 0, 1)), r = new e, r.x = f.x + t * (p.x - f.x), r.y = f.y + t * (p.y - 
    f.y), v = new e, v.x = h.x + t * (G.x - h.x), v.y = h.y + t * (G.y - h.y), t == 0 || t == 1 ? (this.m_type = J.e_faceB, this.m_axis = d.CrossVF(d.SubtractVV(G, h), 1), this.m_axis.Normalize(), this.m_localPoint = v) : (this.m_type = J.e_faceA, this.m_axis = d.CrossVF(d.SubtractVV(p, f), 1), this.m_localPoint = r)), t < 0 && this.m_axis.NegativeSelf())
  };
  J.prototype.Evaluate = function(b, e) {
    var f, g, p = 0;
    switch(this.m_type) {
      case J.e_points:
        return f = d.MulTMV(b.R, this.m_axis), g = d.MulTMV(e.R, this.m_axis.GetNegative()), f = this.m_proxyA.GetSupportVertex(f), g = this.m_proxyB.GetSupportVertex(g), f = d.MulX(b, f), g = d.MulX(e, g), p = (g.x - f.x) * this.m_axis.x + (g.y - f.y) * this.m_axis.y;
      case J.e_faceA:
        return p = d.MulMV(b.R, this.m_axis), f = d.MulX(b, this.m_localPoint), g = d.MulTMV(e.R, p.GetNegative()), g = this.m_proxyB.GetSupportVertex(g), g = d.MulX(e, g), p = (g.x - f.x) * p.x + (g.y - f.y) * p.y;
      case J.e_faceB:
        return p = d.MulMV(e.R, this.m_axis), g = d.MulX(e, this.m_localPoint), f = d.MulTMV(b.R, p.GetNegative()), f = this.m_proxyA.GetSupportVertex(f), f = d.MulX(b, f), p = (f.x - g.x) * p.x + (f.y - g.y) * p.y;
      default:
        return a.b2Assert(!1), 0
    }
  };
  Box2D.postDefs.push(function() {
    Box2D.Collision.b2SeparationFunction.e_points = 1;
    Box2D.Collision.b2SeparationFunction.e_faceA = 2;
    Box2D.Collision.b2SeparationFunction.e_faceB = 4
  });
  n.b2Simplex = function() {
    this.m_v1 = new t;
    this.m_v2 = new t;
    this.m_v3 = new t;
    this.m_vertices = Array(3)
  };
  n.prototype.b2Simplex = function() {
    this.m_vertices[0] = this.m_v1;
    this.m_vertices[1] = this.m_v2;
    this.m_vertices[2] = this.m_v3
  };
  n.prototype.ReadCache = function(b, e, f, g, p) {
    a.b2Assert(0 <= b.count && b.count <= 3);
    var n, j;
    this.m_count = b.count;
    for(var r = this.m_vertices, v = 0;v < this.m_count;v++) {
      var h = r[v];
      h.indexA = b.indexA[v];
      h.indexB = b.indexB[v];
      n = e.GetVertex(h.indexA);
      j = g.GetVertex(h.indexB);
      h.wA = d.MulX(f, n);
      h.wB = d.MulX(p, j);
      h.w = d.SubtractVV(h.wB, h.wA);
      h.a = 0
    }
    if(this.m_count > 1 && (b = b.metric, n = this.GetMetric(), n < 0.5 * b || 2 * b < n || n < Number.MIN_VALUE)) {
      this.m_count = 0
    }
    if(this.m_count == 0) {
      h = r[0], h.indexA = 0, h.indexB = 0, n = e.GetVertex(0), j = g.GetVertex(0), h.wA = d.MulX(f, n), h.wB = d.MulX(p, j), h.w = d.SubtractVV(h.wB, h.wA), this.m_count = 1
    }
  };
  n.prototype.WriteCache = function(a) {
    a.metric = this.GetMetric();
    a.count = Box2D.parseUInt(this.m_count);
    for(var b = this.m_vertices, e = 0;e < this.m_count;e++) {
      a.indexA[e] = Box2D.parseUInt(b[e].indexA), a.indexB[e] = Box2D.parseUInt(b[e].indexB)
    }
  };
  n.prototype.GetSearchDirection = function() {
    switch(this.m_count) {
      case 1:
        return this.m_v1.w.GetNegative();
      case 2:
        var b = d.SubtractVV(this.m_v2.w, this.m_v1.w);
        return d.CrossVV(b, this.m_v1.w.GetNegative()) > 0 ? d.CrossFV(1, b) : d.CrossVF(b, 1);
      default:
        return a.b2Assert(!1), new e
    }
  };
  n.prototype.GetClosestPoint = function() {
    switch(this.m_count) {
      case 0:
        return a.b2Assert(!1), new e;
      case 1:
        return this.m_v1.w;
      case 2:
        return new e(this.m_v1.a * this.m_v1.w.x + this.m_v2.a * this.m_v2.w.x, this.m_v1.a * this.m_v1.w.y + this.m_v2.a * this.m_v2.w.y);
      default:
        return a.b2Assert(!1), new e
    }
  };
  n.prototype.GetWitnessPoints = function(b, e) {
    switch(this.m_count) {
      case 0:
        a.b2Assert(!1);
        break;
      case 1:
        b.SetV(this.m_v1.wA);
        e.SetV(this.m_v1.wB);
        break;
      case 2:
        b.x = this.m_v1.a * this.m_v1.wA.x + this.m_v2.a * this.m_v2.wA.x;
        b.y = this.m_v1.a * this.m_v1.wA.y + this.m_v2.a * this.m_v2.wA.y;
        e.x = this.m_v1.a * this.m_v1.wB.x + this.m_v2.a * this.m_v2.wB.x;
        e.y = this.m_v1.a * this.m_v1.wB.y + this.m_v2.a * this.m_v2.wB.y;
        break;
      case 3:
        e.x = b.x = this.m_v1.a * this.m_v1.wA.x + this.m_v2.a * this.m_v2.wA.x + this.m_v3.a * this.m_v3.wA.x;
        e.y = b.y = this.m_v1.a * this.m_v1.wA.y + this.m_v2.a * this.m_v2.wA.y + this.m_v3.a * this.m_v3.wA.y;
        break;
      default:
        a.b2Assert(!1)
    }
  };
  n.prototype.GetMetric = function() {
    switch(this.m_count) {
      case 0:
        return a.b2Assert(!1), 0;
      case 1:
        return 0;
      case 2:
        return d.SubtractVV(this.m_v1.w, this.m_v2.w).Length();
      case 3:
        return d.CrossVV(d.SubtractVV(this.m_v2.w, this.m_v1.w), d.SubtractVV(this.m_v3.w, this.m_v1.w));
      default:
        return a.b2Assert(!1), 0
    }
  };
  n.prototype.Solve2 = function() {
    var a = this.m_v1.w, b = this.m_v2.w, e = d.SubtractVV(b, a), a = -(a.x * e.x + a.y * e.y);
    a <= 0 ? this.m_count = this.m_v1.a = 1 : (b = b.x * e.x + b.y * e.y, b <= 0 ? (this.m_count = this.m_v2.a = 1, this.m_v1.Set(this.m_v2)) : (e = 1 / (b + a), this.m_v1.a = b * e, this.m_v2.a = a * e, this.m_count = 2))
  };
  n.prototype.Solve3 = function() {
    var a = this.m_v1.w, b = this.m_v2.w, e = this.m_v3.w, f = d.SubtractVV(b, a), g = d.Dot(a, f), p = d.Dot(b, f), g = -g, n = d.SubtractVV(e, a), j = d.Dot(a, n), r = d.Dot(e, n), j = -j, v = d.SubtractVV(e, b), h = d.Dot(b, v), v = d.Dot(e, v), h = -h, n = d.CrossVV(f, n), f = n * d.CrossVV(b, e), e = n * d.CrossVV(e, a), a = n * d.CrossVV(a, b);
    g <= 0 && j <= 0 ? this.m_count = this.m_v1.a = 1 : p > 0 && g > 0 && a <= 0 ? (r = 1 / (p + g), this.m_v1.a = p * r, this.m_v2.a = g * r, this.m_count = 2) : r > 0 && j > 0 && e <= 0 ? (p = 1 / (r + j), this.m_v1.a = r * p, this.m_v3.a = j * p, this.m_count = 2, this.m_v2.Set(this.m_v3)) : p <= 0 && h <= 0 ? (this.m_count = this.m_v2.a = 1, this.m_v1.Set(this.m_v2)) : r <= 0 && v <= 0 ? (this.m_count = this.m_v3.a = 1, this.m_v1.Set(this.m_v3)) : v > 0 && h > 0 && f <= 0 ? (p = 1 / (v + h), 
    this.m_v2.a = v * p, this.m_v3.a = h * p, this.m_count = 2, this.m_v1.Set(this.m_v3)) : (p = 1 / (f + e + a), this.m_v1.a = f * p, this.m_v2.a = e * p, this.m_v3.a = a * p, this.m_count = 3)
  };
  G.b2SimplexCache = function() {
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
  D.b2TimeOfImpact = function() {
  };
  D.TimeOfImpact = function(b) {
    ++D.b2_toiCalls;
    var e = b.proxyA, f = b.proxyB, g = b.sweepA, p = b.sweepB;
    a.b2Assert(g.t0 == p.t0);
    a.b2Assert(1 - g.t0 > Number.MIN_VALUE);
    var n = e.m_radius + f.m_radius, b = b.tolerance, r = 0, v = 0, h = 0;
    D.s_cache.count = 0;
    for(D.s_distanceInput.useRadii = !1;;) {
      g.GetTransform(D.s_xfA, r);
      p.GetTransform(D.s_xfB, r);
      D.s_distanceInput.proxyA = e;
      D.s_distanceInput.proxyB = f;
      D.s_distanceInput.transformA = D.s_xfA;
      D.s_distanceInput.transformB = D.s_xfB;
      j.Distance(D.s_distanceOutput, D.s_cache, D.s_distanceInput);
      if(D.s_distanceOutput.distance <= 0) {
        r = 1;
        break
      }
      D.s_fcn.Initialize(D.s_cache, e, D.s_xfA, f, D.s_xfB);
      var t = D.s_fcn.Evaluate(D.s_xfA, D.s_xfB);
      if(t <= 0) {
        r = 1;
        break
      }
      v == 0 && (h = t > n ? d.Max(n - b, 0.75 * n) : d.Max(t - b, 0.02 * n));
      if(t - h < 0.5 * b) {
        if(v == 0) {
          r = 1;
          break
        }
        break
      }
      var G = r, l = r, k = 1;
      g.GetTransform(D.s_xfA, k);
      p.GetTransform(D.s_xfB, k);
      var A = D.s_fcn.Evaluate(D.s_xfA, D.s_xfB);
      if(A >= h) {
        r = 1;
        break
      }
      for(var y = 0;;) {
        var x = 0, x = y & 1 ? l + (h - t) * (k - l) / (A - t) : 0.5 * (l + k);
        g.GetTransform(D.s_xfA, x);
        p.GetTransform(D.s_xfB, x);
        var q = D.s_fcn.Evaluate(D.s_xfA, D.s_xfB);
        if(d.Abs(q - h) < 0.025 * b) {
          G = x;
          break
        }
        q > h ? (l = x, t = q) : (k = x, A = q);
        ++y;
        ++D.b2_toiRootIters;
        if(y == 50) {
          break
        }
      }
      D.b2_toiMaxRootIters = d.Max(D.b2_toiMaxRootIters, y);
      if(G < (1 + 100 * Number.MIN_VALUE) * r) {
        break
      }
      r = G;
      v++;
      ++D.b2_toiIters;
      if(v == 1E3) {
        break
      }
    }
    D.b2_toiMaxIters = d.Max(D.b2_toiMaxIters, v);
    return r
  };
  Box2D.postDefs.push(function() {
    Box2D.Collision.b2TimeOfImpact.b2_toiCalls = 0;
    Box2D.Collision.b2TimeOfImpact.b2_toiIters = 0;
    Box2D.Collision.b2TimeOfImpact.b2_toiMaxIters = 0;
    Box2D.Collision.b2TimeOfImpact.b2_toiRootIters = 0;
    Box2D.Collision.b2TimeOfImpact.b2_toiMaxRootIters = 0;
    Box2D.Collision.b2TimeOfImpact.s_cache = new G;
    Box2D.Collision.b2TimeOfImpact.s_distanceInput = new l;
    Box2D.Collision.b2TimeOfImpact.s_xfA = new f;
    Box2D.Collision.b2TimeOfImpact.s_xfB = new f;
    Box2D.Collision.b2TimeOfImpact.s_fcn = new J;
    Box2D.Collision.b2TimeOfImpact.s_distanceOutput = new k
  });
  M.b2TOIInput = function() {
    this.proxyA = new o;
    this.proxyB = new o;
    this.sweepA = new b;
    this.sweepB = new b
  };
  N.b2WorldManifold = function() {
    this.m_normal = new e
  };
  N.prototype.b2WorldManifold = function() {
    this.m_points = Array(a.b2_maxManifoldPoints);
    for(var b = 0;b < a.b2_maxManifoldPoints;b++) {
      this.m_points[b] = new e
    }
  };
  N.prototype.Initialize = function(a, b, e, d, f) {
    e === void 0 && (e = 0);
    f === void 0 && (f = 0);
    if(a.m_pointCount != 0) {
      var g = 0, p, n, j = 0, r = 0, v = 0, h = 0, t = 0;
      p = 0;
      switch(a.m_type) {
        case I.e_circles:
          n = b.R;
          p = a.m_localPoint;
          g = b.position.x + n.col1.x * p.x + n.col2.x * p.y;
          b = b.position.y + n.col1.y * p.x + n.col2.y * p.y;
          n = d.R;
          p = a.m_points[0].m_localPoint;
          a = d.position.x + n.col1.x * p.x + n.col2.x * p.y;
          d = d.position.y + n.col1.y * p.x + n.col2.y * p.y;
          p = a - g;
          n = d - b;
          j = p * p + n * n;
          j > Box2D.MIN_VALUE_SQUARED ? (j = Math.sqrt(j), this.m_normal.x = p / j, this.m_normal.y = n / j) : (this.m_normal.x = 1, this.m_normal.y = 0);
          p = b + e * this.m_normal.y;
          d -= f * this.m_normal.y;
          this.m_points[0].x = 0.5 * (g + e * this.m_normal.x + (a - f * this.m_normal.x));
          this.m_points[0].y = 0.5 * (p + d);
          break;
        case I.e_faceA:
          n = b.R;
          p = a.m_localPlaneNormal;
          j = n.col1.x * p.x + n.col2.x * p.y;
          r = n.col1.y * p.x + n.col2.y * p.y;
          n = b.R;
          p = a.m_localPoint;
          v = b.position.x + n.col1.x * p.x + n.col2.x * p.y;
          h = b.position.y + n.col1.y * p.x + n.col2.y * p.y;
          this.m_normal.x = j;
          this.m_normal.y = r;
          for(g = 0;g < a.m_pointCount;g++) {
            n = d.R, p = a.m_points[g].m_localPoint, t = d.position.x + n.col1.x * p.x + n.col2.x * p.y, p = d.position.y + n.col1.y * p.x + n.col2.y * p.y, this.m_points[g].x = t + 0.5 * (e - (t - v) * j - (p - h) * r - f) * j, this.m_points[g].y = p + 0.5 * (e - (t - v) * j - (p - h) * r - f) * r
          }
          break;
        case I.e_faceB:
          n = d.R;
          p = a.m_localPlaneNormal;
          j = n.col1.x * p.x + n.col2.x * p.y;
          r = n.col1.y * p.x + n.col2.y * p.y;
          n = d.R;
          p = a.m_localPoint;
          v = d.position.x + n.col1.x * p.x + n.col2.x * p.y;
          h = d.position.y + n.col1.y * p.x + n.col2.y * p.y;
          this.m_normal.x = -j;
          this.m_normal.y = -r;
          for(g = 0;g < a.m_pointCount;g++) {
            n = b.R, p = a.m_points[g].m_localPoint, t = b.position.x + n.col1.x * p.x + n.col2.x * p.y, p = b.position.y + n.col1.y * p.x + n.col2.y * p.y, this.m_points[g].x = t + 0.5 * (f - (t - v) * j - (p - h) * r - e) * j, this.m_points[g].y = p + 0.5 * (f - (t - v) * j - (p - h) * r - e) * r
          }
      }
    }
  };
  p.ClipVertex = function() {
    this.v = new e;
    this.id = new h
  };
  p.prototype.Set = function(a) {
    this.v.SetV(a.v);
    this.id.Set(a.id)
  };
  r.Features = function() {
  };
  Object.defineProperty(r.prototype, "referenceEdge", {enumerable:!1, configurable:!0, get:function() {
    return this._referenceEdge
  }});
  Object.defineProperty(r.prototype, "referenceEdge", {enumerable:!1, configurable:!0, set:function(a) {
    a === void 0 && (a = 0);
    this._referenceEdge = a;
    this._m_id._key = this._m_id._key & 4294967040 | this._referenceEdge & 255
  }});
  Object.defineProperty(r.prototype, "incidentEdge", {enumerable:!1, configurable:!0, get:function() {
    return this._incidentEdge
  }});
  Object.defineProperty(r.prototype, "incidentEdge", {enumerable:!1, configurable:!0, set:function(a) {
    a === void 0 && (a = 0);
    this._incidentEdge = a;
    this._m_id._key = this._m_id._key & 4294902015 | this._incidentEdge << 8 & 65280
  }});
  Object.defineProperty(r.prototype, "incidentVertex", {enumerable:!1, configurable:!0, get:function() {
    return this._incidentVertex
  }});
  Object.defineProperty(r.prototype, "incidentVertex", {enumerable:!1, configurable:!0, set:function(a) {
    a === void 0 && (a = 0);
    this._incidentVertex = a;
    this._m_id._key = this._m_id._key & 4278255615 | this._incidentVertex << 16 & 16711680
  }});
  Object.defineProperty(r.prototype, "flip", {enumerable:!1, configurable:!0, get:function() {
    return this._flip
  }});
  Object.defineProperty(r.prototype, "flip", {enumerable:!1, configurable:!0, set:function(a) {
    a === void 0 && (a = 0);
    this._flip = a;
    this._m_id._key = this._m_id._key & 16777215 | this._flip << 24 & 4278190080
  }})
})();
(function() {
  var a = Box2D.Common.b2Settings, d = Box2D.Collision.Shapes.b2CircleShape, b = Box2D.Collision.Shapes.b2EdgeChainDef, f = Box2D.Collision.Shapes.b2EdgeShape, e = Box2D.Collision.Shapes.b2MassData, g = Box2D.Collision.Shapes.b2PolygonShape, h = Box2D.Collision.Shapes.b2Shape, j = Box2D.Common.Math.b2Mat22, l = Box2D.Common.Math.b2Math, k = Box2D.Common.Math.b2Transform, o = Box2D.Common.Math.b2Vec2, m = Box2D.Collision.b2Distance, s = Box2D.Collision.b2DistanceInput, q = Box2D.Collision.b2DistanceOutput, 
  w = Box2D.Collision.b2DistanceProxy, I = Box2D.Collision.b2SimplexCache;
  Box2D.inherit(d, Box2D.Collision.Shapes.b2Shape);
  d.prototype.__super = Box2D.Collision.Shapes.b2Shape.prototype;
  d.b2CircleShape = function() {
    Box2D.Collision.Shapes.b2Shape.b2Shape.apply(this, arguments);
    this.m_p = new o
  };
  d.prototype.Copy = function() {
    var a = new d;
    a.Set(this);
    return a
  };
  d.prototype.Set = function(a) {
    this.__super.Set.call(this, a);
    Box2D.is(a, d) && this.m_p.SetV((a instanceof d ? a : null).m_p)
  };
  d.prototype.TestPoint = function(a, b) {
    var e = a.R, d = a.position.x + (e.col1.x * this.m_p.x + e.col2.x * this.m_p.y), e = a.position.y + (e.col1.y * this.m_p.x + e.col2.y * this.m_p.y), d = b.x - d, e = b.y - e;
    return d * d + e * e <= this.m_radius * this.m_radius
  };
  d.prototype.RayCast = function(a, b, e) {
    var d = e.R, f = b.p1.x - (e.position.x + (d.col1.x * this.m_p.x + d.col2.x * this.m_p.y)), e = b.p1.y - (e.position.y + (d.col1.y * this.m_p.x + d.col2.y * this.m_p.y)), d = b.p2.x - b.p1.x, g = b.p2.y - b.p1.y, n = f * d + e * g, j = d * d + g * g, h = n * n - j * (f * f + e * e - this.m_radius * this.m_radius);
    if(h < 0 || j < Number.MIN_VALUE) {
      return!1
    }
    n = -(n + Math.sqrt(h));
    return 0 <= n && n <= b.maxFraction * j ? (n /= j, a.fraction = n, a.normal.x = f + n * d, a.normal.y = e + n * g, a.normal.Normalize(), !0) : !1
  };
  d.prototype.ComputeAABB = function(a, b) {
    var e = b.R, d = b.position.x + (e.col1.x * this.m_p.x + e.col2.x * this.m_p.y), e = b.position.y + (e.col1.y * this.m_p.x + e.col2.y * this.m_p.y);
    a.lowerBound.Set(d - this.m_radius, e - this.m_radius);
    a.upperBound.Set(d + this.m_radius, e + this.m_radius)
  };
  d.prototype.ComputeMass = function(b, e) {
    e === void 0 && (e = 0);
    b.mass = e * a.b2_pi * this.m_radius * this.m_radius;
    b.center.SetV(this.m_p);
    b.I = b.mass * (0.5 * this.m_radius * this.m_radius + (this.m_p.x * this.m_p.x + this.m_p.y * this.m_p.y))
  };
  d.prototype.ComputeSubmergedArea = function(a, b, e, d) {
    b === void 0 && (b = 0);
    var e = l.MulX(e, this.m_p), f = -(l.Dot(a, e) - b);
    if(f < -this.m_radius + Number.MIN_VALUE) {
      return 0
    }
    if(f > this.m_radius) {
      return d.SetV(e), Math.PI * this.m_radius * this.m_radius
    }
    var b = this.m_radius * this.m_radius, g = f * f, f = b * (Math.asin(f / this.m_radius) + Math.PI / 2) + f * Math.sqrt(b - g), b = -2 / 3 * Math.pow(b - g, 1.5) / f;
    d.x = e.x + a.x * b;
    d.y = e.y + a.y * b;
    return f
  };
  d.prototype.GetLocalPosition = function() {
    return this.m_p
  };
  d.prototype.SetLocalPosition = function(a) {
    this.m_p.SetV(a)
  };
  d.prototype.GetRadius = function() {
    return this.m_radius
  };
  d.prototype.SetRadius = function(a) {
    a === void 0 && (a = 0);
    this.m_radius = a
  };
  d.prototype.b2CircleShape = function(a) {
    a === void 0 && (a = 0);
    this.__super.b2Shape.call(this);
    this.m_type = h.e_circleShape;
    this.m_radius = a
  };
  b.b2EdgeChainDef = function() {
  };
  b.prototype.b2EdgeChainDef = function() {
    this.vertexCount = 0;
    this.isALoop = !0;
    this.vertices = []
  };
  Box2D.inherit(f, Box2D.Collision.Shapes.b2Shape);
  f.prototype.__super = Box2D.Collision.Shapes.b2Shape.prototype;
  f.b2EdgeShape = function() {
    Box2D.Collision.Shapes.b2Shape.b2Shape.apply(this, arguments);
    this.s_supportVec = new o;
    this.m_v1 = new o;
    this.m_v2 = new o;
    this.m_coreV1 = new o;
    this.m_coreV2 = new o;
    this.m_normal = new o;
    this.m_direction = new o;
    this.m_cornerDir1 = new o;
    this.m_cornerDir2 = new o
  };
  f.prototype.TestPoint = function() {
    return!1
  };
  f.prototype.RayCast = function(a, b, e) {
    var d, f = b.p2.x - b.p1.x, g = b.p2.y - b.p1.y;
    d = e.R;
    var n = e.position.x + (d.col1.x * this.m_v1.x + d.col2.x * this.m_v1.y), j = e.position.y + (d.col1.y * this.m_v1.x + d.col2.y * this.m_v1.y), h = e.position.y + (d.col1.y * this.m_v2.x + d.col2.y * this.m_v2.y) - j, e = -(e.position.x + (d.col1.x * this.m_v2.x + d.col2.x * this.m_v2.y) - n);
    d = 100 * Number.MIN_VALUE;
    var l = -(f * h + g * e);
    if(l > d) {
      var n = b.p1.x - n, k = b.p1.y - j, j = n * h + k * e;
      if(0 <= j && j <= b.maxFraction * l && (b = -f * k + g * n, -d * l <= b && b <= l * (1 + d))) {
        return j /= l, a.fraction = j, b = Math.sqrt(h * h + e * e), a.normal.x = h / b, a.normal.y = e / b, !0
      }
    }
    return!1
  };
  f.prototype.ComputeAABB = function(a, b) {
    var e = b.R, d = b.position.x + (e.col1.x * this.m_v1.x + e.col2.x * this.m_v1.y), f = b.position.y + (e.col1.y * this.m_v1.x + e.col2.y * this.m_v1.y), g = b.position.x + (e.col1.x * this.m_v2.x + e.col2.x * this.m_v2.y), e = b.position.y + (e.col1.y * this.m_v2.x + e.col2.y * this.m_v2.y);
    d < g ? (a.lowerBound.x = d, a.upperBound.x = g) : (a.lowerBound.x = g, a.upperBound.x = d);
    f < e ? (a.lowerBound.y = f, a.upperBound.y = e) : (a.lowerBound.y = e, a.upperBound.y = f)
  };
  f.prototype.ComputeMass = function(a) {
    a.mass = 0;
    a.center.SetV(this.m_v1);
    a.I = 0
  };
  f.prototype.ComputeSubmergedArea = function(a, b, e, d) {
    b === void 0 && (b = 0);
    var f = new o(a.x * b, a.y * b), g = l.MulX(e, this.m_v1), e = l.MulX(e, this.m_v2), n = l.Dot(a, g) - b, a = l.Dot(a, e) - b;
    if(n > 0) {
      if(a > 0) {
        return 0
      }else {
        g.x = -a / (n - a) * g.x + n / (n - a) * e.x, g.y = -a / (n - a) * g.y + n / (n - a) * e.y
      }
    }else {
      if(a > 0) {
        e.x = -a / (n - a) * g.x + n / (n - a) * e.x, e.y = -a / (n - a) * g.y + n / (n - a) * e.y
      }
    }
    d.x = (f.x + g.x + e.x) / 3;
    d.y = (f.y + g.y + e.y) / 3;
    return 0.5 * ((g.x - f.x) * (e.y - f.y) - (g.y - f.y) * (e.x - f.x))
  };
  f.prototype.GetLength = function() {
    return this.m_length
  };
  f.prototype.GetVertex1 = function() {
    return this.m_v1
  };
  f.prototype.GetVertex2 = function() {
    return this.m_v2
  };
  f.prototype.GetCoreVertex1 = function() {
    return this.m_coreV1
  };
  f.prototype.GetCoreVertex2 = function() {
    return this.m_coreV2
  };
  f.prototype.GetNormalVector = function() {
    return this.m_normal
  };
  f.prototype.GetDirectionVector = function() {
    return this.m_direction
  };
  f.prototype.GetCorner1Vector = function() {
    return this.m_cornerDir1
  };
  f.prototype.GetCorner2Vector = function() {
    return this.m_cornerDir2
  };
  f.prototype.Corner1IsConvex = function() {
    return this.m_cornerConvex1
  };
  f.prototype.Corner2IsConvex = function() {
    return this.m_cornerConvex2
  };
  f.prototype.GetFirstVertex = function(a) {
    var b = a.R;
    return new o(a.position.x + (b.col1.x * this.m_coreV1.x + b.col2.x * this.m_coreV1.y), a.position.y + (b.col1.y * this.m_coreV1.x + b.col2.y * this.m_coreV1.y))
  };
  f.prototype.GetNextEdge = function() {
    return this.m_nextEdge
  };
  f.prototype.GetPrevEdge = function() {
    return this.m_prevEdge
  };
  f.prototype.Support = function(a, b, e) {
    b === void 0 && (b = 0);
    e === void 0 && (e = 0);
    var d = a.R, f = a.position.x + (d.col1.x * this.m_coreV1.x + d.col2.x * this.m_coreV1.y), g = a.position.y + (d.col1.y * this.m_coreV1.x + d.col2.y * this.m_coreV1.y), n = a.position.x + (d.col1.x * this.m_coreV2.x + d.col2.x * this.m_coreV2.y), a = a.position.y + (d.col1.y * this.m_coreV2.x + d.col2.y * this.m_coreV2.y);
    f * b + g * e > n * b + a * e ? (this.s_supportVec.x = f, this.s_supportVec.y = g) : (this.s_supportVec.x = n, this.s_supportVec.y = a);
    return this.s_supportVec
  };
  f.prototype.b2EdgeShape = function(b, e) {
    this.__super.b2Shape.call(this);
    this.m_type = h.e_edgeShape;
    this.m_nextEdge = this.m_prevEdge = null;
    this.m_v1 = b;
    this.m_v2 = e;
    this.m_direction.Set(this.m_v2.x - this.m_v1.x, this.m_v2.y - this.m_v1.y);
    this.m_length = this.m_direction.Normalize();
    this.m_normal.Set(this.m_direction.y, -this.m_direction.x);
    this.m_coreV1.Set(-a.b2_toiSlop * (this.m_normal.x - this.m_direction.x) + this.m_v1.x, -a.b2_toiSlop * (this.m_normal.y - this.m_direction.y) + this.m_v1.y);
    this.m_coreV2.Set(-a.b2_toiSlop * (this.m_normal.x + this.m_direction.x) + this.m_v2.x, -a.b2_toiSlop * (this.m_normal.y + this.m_direction.y) + this.m_v2.y);
    this.m_cornerDir1 = this.m_normal;
    this.m_cornerDir2.Set(-this.m_normal.x, -this.m_normal.y)
  };
  f.prototype.SetPrevEdge = function(a, b, e, d) {
    this.m_prevEdge = a;
    this.m_coreV1 = b;
    this.m_cornerDir1 = e;
    this.m_cornerConvex1 = d
  };
  f.prototype.SetNextEdge = function(a, b, e, d) {
    this.m_nextEdge = a;
    this.m_coreV2 = b;
    this.m_cornerDir2 = e;
    this.m_cornerConvex2 = d
  };
  e.b2MassData = function() {
    this.mass = 0;
    this.center = new o(0, 0);
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
    for(var e = [], d = 0, f, d = 0;d < a.length;++d) {
      f = a[d], e.push(f)
    }
    this.SetAsVector(e, b)
  };
  g.AsArray = function(a, b) {
    b === void 0 && (b = 0);
    var e = new g;
    e.SetAsArray(a, b);
    return e
  };
  g.prototype.SetAsVector = function(b, e) {
    e === void 0 && (e = 0);
    if(e == 0) {
      e = b.length
    }
    a.b2Assert(2 <= e);
    this.m_vertexCount = e;
    this.Reserve(e);
    for(var d = 0, d = 0;d < this.m_vertexCount;d++) {
      this.m_vertices[d].SetV(b[d])
    }
    for(d = 0;d < this.m_vertexCount;++d) {
      var f = l.SubtractVV(this.m_vertices[d + 1 < this.m_vertexCount ? d + 1 : 0], this.m_vertices[d]);
      a.b2Assert(f.LengthSquared() > Number.MIN_VALUE);
      this.m_normals[d].SetV(l.CrossVF(f, 1));
      this.m_normals[d].Normalize()
    }
    this.m_centroid = g.ComputeCentroid(this.m_vertices, this.m_vertexCount)
  };
  g.AsVector = function(a, b) {
    b === void 0 && (b = 0);
    var e = new g;
    e.SetAsVector(a, b);
    return e
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
    var e = new g;
    e.SetAsBox(a, b);
    return e
  };
  g.prototype.SetAsOrientedBox = function(a, b, e, d) {
    a === void 0 && (a = 0);
    b === void 0 && (b = 0);
    e === void 0 && (e = null);
    d === void 0 && (d = 0);
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
    this.m_centroid = e;
    a = new k;
    a.position = e;
    a.R.Set(d);
    for(e = 0;e < this.m_vertexCount;++e) {
      this.m_vertices[e] = l.MulX(a, this.m_vertices[e]), this.m_normals[e] = l.MulMV(a.R, this.m_normals[e])
    }
  };
  g.AsOrientedBox = function(a, b, e, d) {
    a === void 0 && (a = 0);
    b === void 0 && (b = 0);
    e === void 0 && (e = null);
    d === void 0 && (d = 0);
    var f = new g;
    f.SetAsOrientedBox(a, b, e, d);
    return f
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
    var e = new g;
    e.SetAsEdge(a, b);
    return e
  };
  g.prototype.TestPoint = function(a, b) {
    var e;
    e = a.R;
    for(var d = b.x - a.position.x, f = b.y - a.position.y, g = d * e.col1.x + f * e.col1.y, n = d * e.col2.x + f * e.col2.y, j = 0;j < this.m_vertexCount;++j) {
      if(e = this.m_vertices[j], d = g - e.x, f = n - e.y, e = this.m_normals[j], e.x * d + e.y * f > 0) {
        return!1
      }
    }
    return!0
  };
  g.prototype.RayCast = function(a, b, e) {
    var d = 0, f = b.maxFraction, g = 0, n = 0, j, h, g = b.p1.x - e.position.x, n = b.p1.y - e.position.y;
    j = e.R;
    var l = g * j.col1.x + n * j.col1.y, k = g * j.col2.x + n * j.col2.y, g = b.p2.x - e.position.x, n = b.p2.y - e.position.y;
    j = e.R;
    b = g * j.col1.x + n * j.col1.y - l;
    j = g * j.col2.x + n * j.col2.y - k;
    for(var q = -1, p = 0;p < this.m_vertexCount;++p) {
      h = this.m_vertices[p];
      g = h.x - l;
      n = h.y - k;
      h = this.m_normals[p];
      g = h.x * g + h.y * n;
      n = h.x * b + h.y * j;
      if(n == 0) {
        if(g < 0) {
          return!1
        }
      }else {
        n < 0 && g < d * n ? (d = g / n, q = p) : n > 0 && g < f * n && (f = g / n)
      }
      if(f < d - Number.MIN_VALUE) {
        return!1
      }
    }
    return q >= 0 ? (a.fraction = d, j = e.R, h = this.m_normals[q], a.normal.x = j.col1.x * h.x + j.col2.x * h.y, a.normal.y = j.col1.y * h.x + j.col2.y * h.y, !0) : !1
  };
  g.prototype.ComputeAABB = function(a, b) {
    for(var e = b.R, d = this.m_vertices[0], f = b.position.x + (e.col1.x * d.x + e.col2.x * d.y), g = b.position.y + (e.col1.y * d.x + e.col2.y * d.y), n = f, j = g, h = 1;h < this.m_vertexCount;++h) {
      var d = this.m_vertices[h], l = b.position.x + (e.col1.x * d.x + e.col2.x * d.y), d = b.position.y + (e.col1.y * d.x + e.col2.y * d.y), f = f < l ? f : l, g = g < d ? g : d, n = n > l ? n : l, j = j > d ? j : d
    }
    a.lowerBound.x = f - this.m_radius;
    a.lowerBound.y = g - this.m_radius;
    a.upperBound.x = n + this.m_radius;
    a.upperBound.y = j + this.m_radius
  };
  g.prototype.ComputeMass = function(a, b) {
    b === void 0 && (b = 0);
    if(this.m_vertexCount == 2) {
      a.center.x = 0.5 * (this.m_vertices[0].x + this.m_vertices[1].x), a.center.y = 0.5 * (this.m_vertices[0].y + this.m_vertices[1].y), a.mass = 0, a.I = 0
    }else {
      for(var e = 0, d = 0, f = 0, g = 0, n = 1 / 3, j = 0;j < this.m_vertexCount;++j) {
        var h = this.m_vertices[j], l = j + 1 < this.m_vertexCount ? this.m_vertices[j + 1] : this.m_vertices[0], k = h.x - 0, q = h.y - 0, p = l.x - 0, r = l.y - 0, v = k * r - q * p, H = 0.5 * v;
        f += H;
        e += H * n * (0 + h.x + l.x);
        d += H * n * (0 + h.y + l.y);
        h = k;
        g += v * (n * (0.25 * (h * h + p * h + p * p) + (0 * h + 0 * p)) + 0 + (n * (0.25 * (q * q + r * q + r * r) + (0 * q + 0 * r)) + 0))
      }
      a.mass = b * f;
      e *= 1 / f;
      d *= 1 / f;
      a.center.Set(e, d);
      a.I = b * g
    }
  };
  g.prototype.ComputeSubmergedArea = function(a, b, d, f) {
    b === void 0 && (b = 0);
    for(var g = l.MulTMV(d.R, a), j = b - l.Dot(a, d.position), n = [], h = 0, t = -1, b = -1, k = !1, a = a = 0;a < this.m_vertexCount;++a) {
      n[a] = l.Dot(g, this.m_vertices[a]) - j;
      var q = n[a] < -Number.MIN_VALUE;
      a > 0 && (q ? k || (t = a - 1, h++) : k && (b = a - 1, h++));
      k = q
    }
    switch(h) {
      case 0:
        return k ? (a = new e, this.ComputeMass(a, 1), f.SetV(l.MulX(d, a.center)), a.mass) : 0;
      case 1:
        t == -1 ? t = this.m_vertexCount - 1 : b = this.m_vertexCount - 1
    }
    a = (t + 1) % this.m_vertexCount;
    g = (b + 1) % this.m_vertexCount;
    j = (0 - n[t]) / (n[a] - n[t]);
    n = (0 - n[b]) / (n[g] - n[b]);
    t = new o(this.m_vertices[t].x * (1 - j) + this.m_vertices[a].x * j, this.m_vertices[t].y * (1 - j) + this.m_vertices[a].y * j);
    b = new o(this.m_vertices[b].x * (1 - n) + this.m_vertices[g].x * n, this.m_vertices[b].y * (1 - n) + this.m_vertices[g].y * n);
    n = 0;
    j = new o;
    for(h = this.m_vertices[a];a != g;) {
      a = (a + 1) % this.m_vertexCount, k = a == g ? b : this.m_vertices[a], q = 0.5 * ((h.x - t.x) * (k.y - t.y) - (h.y - t.y) * (k.x - t.x)), n += q, j.x += q * (t.x + h.x + k.x) / 3, j.y += q * (t.y + h.y + k.y) / 3, h = k
    }
    j.Multiply(1 / n);
    f.SetV(l.MulX(d, j));
    return n
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
    for(var b = 0, e = this.m_vertices[0].x * a.x + this.m_vertices[0].y * a.y, d = 1;d < this.m_vertexCount;++d) {
      var f = this.m_vertices[d].x * a.x + this.m_vertices[d].y * a.y;
      f > e && (b = d, e = f)
    }
    return b
  };
  g.prototype.GetSupportVertex = function(a) {
    for(var b = 0, e = this.m_vertices[0].x * a.x + this.m_vertices[0].y * a.y, d = 1;d < this.m_vertexCount;++d) {
      var f = this.m_vertices[d].x * a.x + this.m_vertices[d].y * a.y;
      f > e && (b = d, e = f)
    }
    return this.m_vertices[b]
  };
  g.prototype.Validate = function() {
    return!1
  };
  g.prototype.b2PolygonShape = function() {
    this.__super.b2Shape.call(this);
    this.m_type = h.e_polygonShape;
    this.m_centroid = new o;
    this.m_vertices = [];
    this.m_normals = []
  };
  g.prototype.Reserve = function(a) {
    a === void 0 && (a = 0);
    for(var b = this.m_vertices.length;b < a;b++) {
      this.m_vertices[b] = new o, this.m_normals[b] = new o
    }
  };
  g.ComputeCentroid = function(a, b) {
    b === void 0 && (b = 0);
    for(var e = new o, d = 0, f = 1 / 3, g = 0;g < b;++g) {
      var n = a[g], j = g + 1 < b ? a[g + 1] : a[0], h = 0.5 * ((n.x - 0) * (j.y - 0) - (n.y - 0) * (j.x - 0));
      d += h;
      e.x += h * f * (0 + n.x + j.x);
      e.y += h * f * (0 + n.y + j.y)
    }
    e.x *= 1 / d;
    e.y *= 1 / d;
    return e
  };
  g.ComputeOBB = function(a, b, e) {
    e === void 0 && (e = 0);
    for(var d = 0, f = Array(e + 1), d = 0;d < e;++d) {
      f[d] = b[d]
    }
    f[e] = f[0];
    b = Number.MAX_VALUE;
    for(d = 1;d <= e;++d) {
      var g = f[d - 1], j = f[d].x - g.x, h = f[d].y - g.y, t = Math.sqrt(j * j + h * h);
      j /= t;
      h /= t;
      for(var l = -h, k = j, q = t = Number.MAX_VALUE, p = -Number.MAX_VALUE, r = -Number.MAX_VALUE, v = 0;v < e;++v) {
        var H = f[v].x - g.x, K = f[v].y - g.y, O = j * H + h * K, H = l * H + k * K;
        O < t && (t = O);
        H < q && (q = H);
        O > p && (p = O);
        H > r && (r = H)
      }
      v = (p - t) * (r - q);
      if(v < 0.95 * b) {
        b = v, a.R.col1.x = j, a.R.col1.y = h, a.R.col2.x = l, a.R.col2.y = k, j = 0.5 * (t + p), h = 0.5 * (q + r), l = a.R, a.center.x = g.x + (l.col1.x * j + l.col2.x * h), a.center.y = g.y + (l.col1.y * j + l.col2.y * h), a.extents.x = 0.5 * (p - t), a.extents.y = 0.5 * (r - q)
      }
    }
  };
  Box2D.postDefs.push(function() {
    Box2D.Collision.Shapes.b2PolygonShape.s_mat = new j
  });
  h.b2Shape = function() {
  };
  h.prototype.Copy = function() {
    return null
  };
  h.prototype.Set = function(a) {
    this.m_radius = a.m_radius
  };
  h.prototype.GetType = function() {
    return this.m_type
  };
  h.prototype.TestPoint = function() {
    return!1
  };
  h.prototype.RayCast = function() {
    return!1
  };
  h.prototype.ComputeAABB = function() {
  };
  h.prototype.ComputeMass = function() {
  };
  h.prototype.ComputeSubmergedArea = function() {
    return 0
  };
  h.TestOverlap = function(a, b, e, d) {
    var f = new s;
    f.proxyA = new w;
    f.proxyA.Set(a);
    f.proxyB = new w;
    f.proxyB.Set(e);
    f.transformA = b;
    f.transformB = d;
    f.useRadii = !0;
    a = new I;
    a.count = 0;
    b = new q;
    m.Distance(b, a, f);
    return b.distance < 10 * Number.MIN_VALUE
  };
  h.prototype.b2Shape = function() {
    this.m_type = h.e_unknownShape;
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
  var a = Box2D.Common.b2Color, d = Box2D.Common.b2Settings, b = Box2D.Common.Math.b2Math;
  a.b2Color = function() {
    this._b = this._g = this._r = 0
  };
  a.prototype.b2Color = function(a, e, d) {
    a === void 0 && (a = 0);
    e === void 0 && (e = 0);
    d === void 0 && (d = 0);
    this._r = Box2D.parseUInt(255 * b.Clamp(a, 0, 1));
    this._g = Box2D.parseUInt(255 * b.Clamp(e, 0, 1));
    this._b = Box2D.parseUInt(255 * b.Clamp(d, 0, 1))
  };
  a.prototype.Set = function(a, e, d) {
    a === void 0 && (a = 0);
    e === void 0 && (e = 0);
    d === void 0 && (d = 0);
    this._r = Box2D.parseUInt(255 * b.Clamp(a, 0, 1));
    this._g = Box2D.parseUInt(255 * b.Clamp(e, 0, 1));
    this._b = Box2D.parseUInt(255 * b.Clamp(d, 0, 1))
  };
  Object.defineProperty(a.prototype, "r", {enumerable:!1, configurable:!0, set:function(a) {
    a === void 0 && (a = 0);
    this._r = Box2D.parseUInt(255 * b.Clamp(a, 0, 1))
  }});
  Object.defineProperty(a.prototype, "g", {enumerable:!1, configurable:!0, set:function(a) {
    a === void 0 && (a = 0);
    this._g = Box2D.parseUInt(255 * b.Clamp(a, 0, 1))
  }});
  Object.defineProperty(a.prototype, "b", {enumerable:!1, configurable:!0, set:function(a) {
    a === void 0 && (a = 0);
    this._b = Box2D.parseUInt(255 * b.Clamp(a, 0, 1))
  }});
  Object.defineProperty(a.prototype, "color", {enumerable:!1, configurable:!0, get:function() {
    return this._r << 16 | this._g << 8 | this._b
  }});
  d.b2Settings = function() {
  };
  d.b2MixFriction = function(a, b) {
    a === void 0 && (a = 0);
    b === void 0 && (b = 0);
    return Math.sqrt(a * b)
  };
  d.b2MixRestitution = function(a, b) {
    a === void 0 && (a = 0);
    b === void 0 && (b = 0);
    return a > b ? a : b
  };
  d.b2Assert = function(a) {
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
    Box2D.Common.b2Settings.b2_polygonRadius = 2 * d.b2_linearSlop;
    Box2D.Common.b2Settings.b2_linearSlop = 0.005;
    Box2D.Common.b2Settings.b2_angularSlop = 2 / 180 * d.b2_pi;
    Box2D.Common.b2Settings.b2_toiSlop = 8 * d.b2_linearSlop;
    Box2D.Common.b2Settings.b2_maxTOIContactsPerIsland = 32;
    Box2D.Common.b2Settings.b2_maxTOIJointsPerIsland = 32;
    Box2D.Common.b2Settings.b2_velocityThreshold = 1;
    Box2D.Common.b2Settings.b2_maxLinearCorrection = 0.2;
    Box2D.Common.b2Settings.b2_maxAngularCorrection = 8 / 180 * d.b2_pi;
    Box2D.Common.b2Settings.b2_maxTranslation = 2;
    Box2D.Common.b2Settings.b2_maxTranslationSquared = d.b2_maxTranslation * d.b2_maxTranslation;
    Box2D.Common.b2Settings.b2_maxRotation = 0.5 * d.b2_pi;
    Box2D.Common.b2Settings.b2_maxRotationSquared = d.b2_maxRotation * d.b2_maxRotation;
    Box2D.Common.b2Settings.b2_contactBaumgarte = 0.2;
    Box2D.Common.b2Settings.b2_timeToSleep = 0.5;
    Box2D.Common.b2Settings.b2_linearSleepTolerance = 0.01;
    Box2D.Common.b2Settings.b2_angularSleepTolerance = 2 / 180 * d.b2_pi
  })
})();
(function() {
  var a = Box2D.Common.Math.b2Mat22, d = Box2D.Common.Math.b2Mat33, b = Box2D.Common.Math.b2Math, f = Box2D.Common.Math.b2Sweep, e = Box2D.Common.Math.b2Transform, g = Box2D.Common.Math.b2Vec2, h = Box2D.Common.Math.b2Vec3;
  a.b2Mat22 = function() {
    this.col1 = new g;
    this.col2 = new g
  };
  a.prototype.b2Mat22 = function() {
    this.SetIdentity()
  };
  a.FromAngle = function(b) {
    b === void 0 && (b = 0);
    var e = new a;
    e.Set(b);
    return e
  };
  a.FromVV = function(b, e) {
    var d = new a;
    d.SetVV(b, e);
    return d
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
    var b = this.col1.x, e = this.col2.x, d = this.col1.y, f = this.col2.y, g = b * f - e * d;
    g != 0 && (g = 1 / g);
    a.col1.x = g * f;
    a.col2.x = -g * e;
    a.col1.y = -g * d;
    a.col2.y = g * b;
    return a
  };
  a.prototype.Solve = function(a, b, e) {
    b === void 0 && (b = 0);
    e === void 0 && (e = 0);
    var d = this.col1.x, f = this.col2.x, g = this.col1.y, h = this.col2.y, w = d * h - f * g;
    w != 0 && (w = 1 / w);
    a.x = w * (h * b - f * e);
    a.y = w * (d * e - g * b);
    return a
  };
  a.prototype.Abs = function() {
    this.col1.Abs();
    this.col2.Abs()
  };
  d.b2Mat33 = function() {
    this.col1 = new h;
    this.col2 = new h;
    this.col3 = new h
  };
  d.prototype.b2Mat33 = function(a, b, e) {
    a === void 0 && (a = null);
    b === void 0 && (b = null);
    e === void 0 && (e = null);
    !a && !b && !e ? (this.col1.SetZero(), this.col2.SetZero(), this.col3.SetZero()) : (this.col1.SetV(a), this.col2.SetV(b), this.col3.SetV(e))
  };
  d.prototype.SetVVV = function(a, b, e) {
    this.col1.SetV(a);
    this.col2.SetV(b);
    this.col3.SetV(e)
  };
  d.prototype.Copy = function() {
    return new d(this.col1, this.col2, this.col3)
  };
  d.prototype.SetM = function(a) {
    this.col1.SetV(a.col1);
    this.col2.SetV(a.col2);
    this.col3.SetV(a.col3)
  };
  d.prototype.AddM = function(a) {
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
  d.prototype.SetIdentity = function() {
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
  d.prototype.SetZero = function() {
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
  d.prototype.Solve22 = function(a, b, e) {
    b === void 0 && (b = 0);
    e === void 0 && (e = 0);
    var d = this.col1.x, f = this.col2.x, g = this.col1.y, h = this.col2.y, w = d * h - f * g;
    w != 0 && (w = 1 / w);
    a.x = w * (h * b - f * e);
    a.y = w * (d * e - g * b);
    return a
  };
  d.prototype.Solve33 = function(a, b, e, d) {
    b === void 0 && (b = 0);
    e === void 0 && (e = 0);
    d === void 0 && (d = 0);
    var f = this.col1.x, g = this.col1.y, h = this.col1.z, w = this.col2.x, I = this.col2.y, A = this.col2.z, y = this.col3.x, x = this.col3.y, F = this.col3.z, E = f * (I * F - A * x) + g * (A * y - w * F) + h * (w * x - I * y);
    E != 0 && (E = 1 / E);
    a.x = E * (b * (I * F - A * x) + e * (A * y - w * F) + d * (w * x - I * y));
    a.y = E * (f * (e * F - d * x) + g * (d * y - b * F) + h * (b * x - e * y));
    a.z = E * (f * (I * d - A * e) + g * (A * b - w * d) + h * (w * e - I * b));
    return a
  };
  b.b2Math = function() {
  };
  b.IsValid = function(a) {
    a === void 0 && (a = 0);
    return isFinite(a)
  };
  b.Dot = function(a, b) {
    return a.x * b.x + a.y * b.y
  };
  b.CrossVV = function(a, b) {
    return a.x * b.y - a.y * b.x
  };
  b.CrossVF = function(a, b) {
    b === void 0 && (b = 0);
    return new g(b * a.y, -b * a.x)
  };
  b.CrossFV = function(a, b) {
    a === void 0 && (a = 0);
    return new g(-a * b.y, a * b.x)
  };
  b.MulMV = function(a, b) {
    return new g(a.col1.x * b.x + a.col2.x * b.y, a.col1.y * b.x + a.col2.y * b.y)
  };
  b.MulTMV = function(a, e) {
    return new g(b.Dot(e, a.col1), b.Dot(e, a.col2))
  };
  b.MulX = function(a, e) {
    var d = b.MulMV(a.R, e);
    d.x += a.position.x;
    d.y += a.position.y;
    return d
  };
  b.MulXT = function(a, e) {
    var d = b.SubtractVV(e, a.position), f = d.x * a.R.col1.x + d.y * a.R.col1.y;
    d.y = d.x * a.R.col2.x + d.y * a.R.col2.y;
    d.x = f;
    return d
  };
  b.AddVV = function(a, b) {
    return new g(a.x + b.x, a.y + b.y)
  };
  b.SubtractVV = function(a, b) {
    return new g(a.x - b.x, a.y - b.y)
  };
  b.Distance = function(a, b) {
    var e = a.x - b.x, d = a.y - b.y;
    return Math.sqrt(e * e + d * d)
  };
  b.DistanceSquared = function(a, b) {
    var e = a.x - b.x, d = a.y - b.y;
    return e * e + d * d
  };
  b.MulFV = function(a, b) {
    a === void 0 && (a = 0);
    return new g(a * b.x, a * b.y)
  };
  b.AddMM = function(e, d) {
    return a.FromVV(b.AddVV(e.col1, d.col1), b.AddVV(e.col2, d.col2))
  };
  b.MulMM = function(e, d) {
    return a.FromVV(b.MulMV(e, d.col1), b.MulMV(e, d.col2))
  };
  b.MulTMM = function(e, d) {
    var f = new g(b.Dot(e.col1, d.col1), b.Dot(e.col2, d.col1)), h = new g(b.Dot(e.col1, d.col2), b.Dot(e.col2, d.col2));
    return a.FromVV(f, h)
  };
  b.Abs = function(a) {
    a === void 0 && (a = 0);
    return a > 0 ? a : -a
  };
  b.AbsV = function(a) {
    return new g(b.Abs(a.x), b.Abs(a.y))
  };
  b.AbsM = function(e) {
    return a.FromVV(b.AbsV(e.col1), b.AbsV(e.col2))
  };
  b.Min = function(a, b) {
    a === void 0 && (a = 0);
    b === void 0 && (b = 0);
    return a < b ? a : b
  };
  b.MinV = function(a, e) {
    return new g(b.Min(a.x, e.x), b.Min(a.y, e.y))
  };
  b.Max = function(a, b) {
    a === void 0 && (a = 0);
    b === void 0 && (b = 0);
    return a > b ? a : b
  };
  b.MaxV = function(a, e) {
    return new g(b.Max(a.x, e.x), b.Max(a.y, e.y))
  };
  b.Clamp = function(a, b, e) {
    a === void 0 && (a = 0);
    b === void 0 && (b = 0);
    e === void 0 && (e = 0);
    return a < b ? b : a > e ? e : a
  };
  b.ClampV = function(a, e, d) {
    return b.MaxV(e, b.MinV(a, d))
  };
  b.Swap = function(a, b) {
    var e = a[0];
    a[0] = b[0];
    b[0] = e
  };
  b.Random = function() {
    return Math.random() * 2 - 1
  };
  b.RandomRange = function(a, b) {
    a === void 0 && (a = 0);
    b === void 0 && (b = 0);
    var e = Math.random();
    return(b - a) * e + a
  };
  b.NextPowerOfTwo = function(a) {
    a === void 0 && (a = 0);
    a |= a >> 1 & 2147483647;
    a |= a >> 2 & 1073741823;
    a |= a >> 4 & 268435455;
    a |= a >> 8 & 16777215;
    a |= a >> 16 & 65535;
    return a + 1
  };
  b.IsPowerOfTwo = function(a) {
    a === void 0 && (a = 0);
    return a > 0 && (a & a - 1) == 0
  };
  Box2D.postDefs.push(function() {
    Box2D.Common.Math.b2Math.b2Vec2_zero = new g(0, 0);
    Box2D.Common.Math.b2Math.b2Mat22_identity = a.FromVV(new g(1, 0), new g(0, 1));
    Box2D.Common.Math.b2Math.b2Transform_identity = new e(b.b2Vec2_zero, b.b2Mat22_identity)
  });
  f.b2Sweep = function() {
    this.localCenter = new g;
    this.c0 = new g;
    this.c = new g
  };
  f.prototype.Set = function(a) {
    this.localCenter.SetV(a.localCenter);
    this.c0.SetV(a.c0);
    this.c.SetV(a.c);
    this.a0 = a.a0;
    this.a = a.a;
    this.t0 = a.t0
  };
  f.prototype.Copy = function() {
    var a = new f;
    a.localCenter.SetV(this.localCenter);
    a.c0.SetV(this.c0);
    a.c.SetV(this.c);
    a.a0 = this.a0;
    a.a = this.a;
    a.t0 = this.t0;
    return a
  };
  f.prototype.GetTransform = function(a, b) {
    b === void 0 && (b = 0);
    a.position.x = (1 - b) * this.c0.x + b * this.c.x;
    a.position.y = (1 - b) * this.c0.y + b * this.c.y;
    a.R.Set((1 - b) * this.a0 + b * this.a);
    var e = a.R;
    a.position.x -= e.col1.x * this.localCenter.x + e.col2.x * this.localCenter.y;
    a.position.y -= e.col1.y * this.localCenter.x + e.col2.y * this.localCenter.y
  };
  f.prototype.Advance = function(a) {
    a === void 0 && (a = 0);
    if(this.t0 < a && 1 - this.t0 > Number.MIN_VALUE) {
      var b = (a - this.t0) / (1 - this.t0);
      this.c0.x = (1 - b) * this.c0.x + b * this.c.x;
      this.c0.y = (1 - b) * this.c0.y + b * this.c.y;
      this.a0 = (1 - b) * this.a0 + b * this.a;
      this.t0 = a
    }
  };
  e.b2Transform = function() {
    this.position = new g;
    this.R = new a
  };
  e.prototype.b2Transform = function(a, b) {
    a === void 0 && (a = null);
    b === void 0 && (b = null);
    a && (this.position.SetV(a), this.R.SetM(b))
  };
  e.prototype.Initialize = function(a, b) {
    this.position.SetV(a);
    this.R.SetM(b)
  };
  e.prototype.SetIdentity = function() {
    this.position.SetZero();
    this.R.SetIdentity()
  };
  e.prototype.Set = function(a) {
    this.position.SetV(a.position);
    this.R.SetM(a.R)
  };
  e.prototype.GetAngle = function() {
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
    var e = b.Dot(this, a.col1);
    this.y = b.Dot(this, a.col2);
    this.x = e
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
    return b.IsValid(this.x) && b.IsValid(this.y)
  };
  h.b2Vec3 = function() {
  };
  h.prototype.b2Vec3 = function(a, b, e) {
    a === void 0 && (a = 0);
    b === void 0 && (b = 0);
    e === void 0 && (e = 0);
    this.x = a;
    this.y = b;
    this.z = e
  };
  h.prototype.SetZero = function() {
    this.x = this.y = this.z = 0
  };
  h.prototype.Set = function(a, b, e) {
    a === void 0 && (a = 0);
    b === void 0 && (b = 0);
    e === void 0 && (e = 0);
    this.x = a;
    this.y = b;
    this.z = e
  };
  h.prototype.SetV = function(a) {
    this.x = a.x;
    this.y = a.y;
    this.z = a.z
  };
  h.prototype.GetNegative = function() {
    return new h(-this.x, -this.y, -this.z)
  };
  h.prototype.NegativeSelf = function() {
    this.x = -this.x;
    this.y = -this.y;
    this.z = -this.z
  };
  h.prototype.Copy = function() {
    return new h(this.x, this.y, this.z)
  };
  h.prototype.Add = function(a) {
    this.x += a.x;
    this.y += a.y;
    this.z += a.z
  };
  h.prototype.Subtract = function(a) {
    this.x -= a.x;
    this.y -= a.y;
    this.z -= a.z
  };
  h.prototype.Multiply = function(a) {
    a === void 0 && (a = 0);
    this.x *= a;
    this.y *= a;
    this.z *= a
  }
})();
(function() {
  var a = Box2D.Common.Math.b2Math, d = Box2D.Common.Math.b2Sweep, b = Box2D.Common.Math.b2Transform, f = Box2D.Common.Math.b2Vec2, e = Box2D.Common.b2Settings, g = Box2D.Collision.b2AABB, h = Box2D.Collision.b2ContactPoint, j = Box2D.Collision.b2DynamicTreeBroadPhase, l = Box2D.Collision.Shapes.b2MassData, k = Box2D.Dynamics.b2Body, o = Box2D.Dynamics.b2BodyDef, m = Box2D.Dynamics.b2ContactFilter, s = Box2D.Dynamics.b2ContactImpulse, q = Box2D.Dynamics.b2ContactListener, w = Box2D.Dynamics.b2ContactManager, 
  I = Box2D.Dynamics.b2DestructionListener, A = Box2D.Dynamics.b2FilterData, y = Box2D.Dynamics.b2Fixture, x = Box2D.Dynamics.b2FixtureDef, F = Box2D.Dynamics.b2Island, E = Box2D.Dynamics.b2TimeStep, J = Box2D.Dynamics.Contacts.b2ContactFactory;
  k.b2Body = function() {
    this.m_xf = new b;
    this.m_sweep = new d;
    this.m_linearVelocity = new f;
    this.m_force = new f
  };
  k.prototype.connectEdges = function(b, d, f) {
    f === void 0 && (f = 0);
    var g = Math.atan2(d.GetDirectionVector().y, d.GetDirectionVector().x), f = Math.tan((g - f) * 0.5), f = a.MulFV(f, d.GetDirectionVector()), f = a.SubtractVV(f, d.GetNormalVector()), f = a.MulFV(e.b2_toiSlop, f), f = a.AddVV(f, d.GetVertex1()), h = a.AddVV(b.GetDirectionVector(), d.GetDirectionVector());
    h.Normalize();
    var j = a.Dot(b.GetDirectionVector(), d.GetNormalVector()) > 0;
    b.SetNextEdge(d, f, h, j);
    d.SetPrevEdge(b, f, h, j);
    return g
  };
  k.prototype.CreateFixture = function(a) {
    if(this.m_world.IsLocked() == !0) {
      return null
    }
    var b = new y;
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
    var e = new x;
    e.shape = a;
    e.density = b;
    return this.CreateFixture(e)
  };
  k.prototype.DestroyFixture = function(a) {
    if(this.m_world.IsLocked() != !0) {
      for(var b = this.m_fixtureList, e = null;b != null;) {
        if(b == a) {
          e ? e.m_next = a.m_next : this.m_fixtureList = a.m_next;
          break
        }
        e = b;
        b = b.m_next
      }
      for(b = this.m_contactList;b;) {
        var e = b.contact, b = b.next, d = e.GetFixtureA(), f = e.GetFixtureB();
        (a == d || a == f) && this.m_world.m_contactManager.Destroy(e)
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
    var e;
    if(this.m_world.IsLocked() != !0) {
      this.m_xf.R.Set(b);
      this.m_xf.position.SetV(a);
      e = this.m_xf.R;
      var d = this.m_sweep.localCenter;
      this.m_sweep.c.x = e.col1.x * d.x + e.col2.x * d.y;
      this.m_sweep.c.y = e.col1.y * d.x + e.col2.y * d.y;
      this.m_sweep.c.x += this.m_xf.position.x;
      this.m_sweep.c.y += this.m_xf.position.y;
      this.m_sweep.c0.SetV(this.m_sweep.c);
      this.m_sweep.a0 = this.m_sweep.a = b;
      d = this.m_world.m_contactManager.m_broadPhase;
      for(e = this.m_fixtureList;e;e = e.m_next) {
        e.Synchronize(d, this.m_xf, this.m_xf)
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
    var a = new o;
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
    for(var e = this.GetLinearVelocity().Copy(), d = this.GetAngularVelocity(), f = this.GetWorldCenter(), g = this.m_world.CreateBody(this.GetDefinition()), h, p = this.m_fixtureList;p;) {
      if(b(p)) {
        var r = p.m_next;
        h ? h.m_next = r : this.m_fixtureList = r;
        this.m_fixtureCount--;
        p.m_next = g.m_fixtureList;
        g.m_fixtureList = p;
        g.m_fixtureCount++;
        p.m_body = g;
        p = r
      }else {
        h = p, p = p.m_next
      }
    }
    this.ResetMassData();
    g.ResetMassData();
    h = this.GetWorldCenter();
    b = g.GetWorldCenter();
    h = a.AddVV(e, a.CrossFV(d, a.SubtractVV(h, f)));
    e = a.AddVV(e, a.CrossFV(d, a.SubtractVV(b, f)));
    this.SetLinearVelocity(h);
    g.SetLinearVelocity(e);
    this.SetAngularVelocity(d);
    g.SetAngularVelocity(d);
    this.SynchronizeFixtures();
    g.SynchronizeFixtures();
    return g
  };
  k.prototype.Merge = function(a) {
    var b;
    for(b = a.m_fixtureList;b;) {
      var e = b.m_next;
      a.m_fixtureCount--;
      b.m_next = this.m_fixtureList;
      this.m_fixtureList = b;
      this.m_fixtureCount++;
      b.m_body = f;
      b = e
    }
    d.m_fixtureCount = 0;
    var d = this, f = a;
    d.GetWorldCenter();
    f.GetWorldCenter();
    d.GetLinearVelocity().Copy();
    f.GetLinearVelocity().Copy();
    d.GetAngularVelocity();
    f.GetAngularVelocity();
    d.ResetMassData();
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
  k.prototype.SetMassData = function(b) {
    e.b2Assert(this.m_world.IsLocked() == !1);
    if(this.m_world.IsLocked() != !0 && this.m_type == k.b2_dynamicBody) {
      this.m_invI = this.m_I = this.m_invMass = 0;
      this.m_mass = b.mass;
      if(this.m_mass <= 0) {
        this.m_mass = 1
      }
      this.m_invMass = 1 / this.m_mass;
      if(b.I > 0 && (this.m_flags & k.e_fixedRotationFlag) == 0) {
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
  k.prototype.ResetMassData = function() {
    this.m_invI = this.m_I = this.m_invMass = this.m_mass = 0;
    this.m_sweep.localCenter.SetZero();
    if(!(this.m_type == k.b2_staticBody || this.m_type == k.b2_kinematicBody)) {
      for(var b = f.Make(0, 0), d = this.m_fixtureList;d;d = d.m_next) {
        if(d.m_density != 0) {
          var g = d.GetMassData();
          this.m_mass += g.mass;
          b.x += g.center.x * g.mass;
          b.y += g.center.y * g.mass;
          this.m_I += g.I
        }
      }
      this.m_mass > 0 ? (this.m_invMass = 1 / this.m_mass, b.x *= this.m_invMass, b.y *= this.m_invMass) : this.m_invMass = this.m_mass = 1;
      this.m_I > 0 && (this.m_flags & k.e_fixedRotationFlag) == 0 ? (this.m_I -= this.m_mass * (b.x * b.x + b.y * b.y), this.m_I *= this.m_inertiaScale, e.b2Assert(this.m_I > 0), this.m_invI = 1 / this.m_I) : this.m_invI = this.m_I = 0;
      d = this.m_sweep.c.Copy();
      this.m_sweep.localCenter.SetV(b);
      this.m_sweep.c0.SetV(a.MulX(this.m_xf, this.m_sweep.localCenter));
      this.m_sweep.c.SetV(this.m_sweep.c0);
      this.m_linearVelocity.x += this.m_angularVelocity * -(this.m_sweep.c.y - d.y);
      this.m_linearVelocity.y += this.m_angularVelocity * +(this.m_sweep.c.x - d.x)
    }
  };
  k.prototype.GetWorldPoint = function(a) {
    var b = this.m_xf.R, a = new f(b.col1.x * a.x + b.col2.x * a.y, b.col1.y * a.x + b.col2.y * a.y);
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
    return new f(this.m_linearVelocity.x - this.m_angularVelocity * (a.y - this.m_sweep.c.y), this.m_linearVelocity.y + this.m_angularVelocity * (a.x - this.m_sweep.c.x))
  };
  k.prototype.GetLinearVelocityFromLocalPoint = function(a) {
    var b = this.m_xf.R, a = new f(b.col1.x * a.x + b.col2.x * a.y, b.col1.y * a.x + b.col2.y * a.y);
    a.x += this.m_xf.position.x;
    a.y += this.m_xf.position.y;
    return new f(this.m_linearVelocity.x - this.m_angularVelocity * (a.y - this.m_sweep.c.y), this.m_linearVelocity.y + this.m_angularVelocity * (a.x - this.m_sweep.c.x))
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
    var e = this.m_xf.R, d = this.m_sweep.localCenter;
    this.m_sweep.c.x = e.col1.x * d.x + e.col2.x * d.y;
    this.m_sweep.c.y = e.col1.y * d.x + e.col2.y * d.y;
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
    var b = a.R, e = this.m_sweep.localCenter;
    a.position.x = this.m_sweep.c0.x - (b.col1.x * e.x + b.col2.x * e.y);
    a.position.y = this.m_sweep.c0.y - (b.col1.y * e.x + b.col2.y * e.y);
    e = this.m_world.m_contactManager.m_broadPhase;
    for(b = this.m_fixtureList;b;b = b.m_next) {
      b.Synchronize(e, a, this.m_xf)
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
    Box2D.Dynamics.b2Body.s_xf1 = new b;
    Box2D.Dynamics.b2Body.e_bulletFlag = 8;
    Box2D.Dynamics.b2Body.e_fixedRotationFlag = 16;
    Box2D.Dynamics.b2Body.e_activeFlag = 32;
    Box2D.Dynamics.b2Body.b2_staticBody = 0;
    Box2D.Dynamics.b2Body.b2_kinematicBody = 1;
    Box2D.Dynamics.b2Body.b2_dynamicBody = 2
  });
  o.b2BodyDef = function() {
    this.position = new f;
    this.linearVelocity = new f
  };
  o.prototype.b2BodyDef = function() {
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
  m.b2ContactFilter = function() {
  };
  m.prototype.ShouldCollide = function(a, b) {
    var e = a.GetFilterData(), d = b.GetFilterData();
    return e.groupIndex == d.groupIndex && e.groupIndex != 0 ? e.groupIndex > 0 : (e.maskBits & d.categoryBits) != 0 && (e.categoryBits & d.maskBits) != 0
  };
  m.prototype.RayCollide = function(a, b) {
    return!a ? !0 : this.ShouldCollide(a instanceof y ? a : null, b)
  };
  Box2D.postDefs.push(function() {
    Box2D.Dynamics.b2ContactFilter.b2_defaultFilter = new m
  });
  s.b2ContactImpulse = function() {
    this.normalImpulses = new Box2D.NVector(e.b2_maxManifoldPoints);
    this.tangentImpulses = new Box2D.NVector(e.b2_maxManifoldPoints)
  };
  q.b2ContactListener = function() {
  };
  q.prototype.BeginContact = function() {
  };
  q.prototype.EndContact = function() {
  };
  q.prototype.PreSolve = function() {
  };
  q.prototype.PostSolve = function() {
  };
  Box2D.postDefs.push(function() {
    Box2D.Dynamics.b2ContactListener.b2_defaultListener = new q
  });
  w.b2ContactManager = function() {
  };
  w.prototype.b2ContactManager = function() {
    this.m_world = null;
    this.m_contactCount = 0;
    this.m_contactFilter = m.b2_defaultFilter;
    this.m_contactListener = q.b2_defaultListener;
    this.m_contactFactory = new J;
    this.m_broadPhase = new j
  };
  w.prototype.AddPair = function(a, b) {
    var e = a instanceof y ? a : null, d = b instanceof y ? b : null, f = e.GetBody(), g = d.GetBody();
    if(f != g && g.ShouldCollide(f) != !1 && this.m_contactFilter.ShouldCollide(e, d) != !1) {
      for(g = g.GetContactList();g;) {
        if(g.other == f) {
          var p = g.contact.GetFixtureA(), r = g.contact.GetFixtureB();
          if(p == e && r == d) {
            return
          }
          if(p == d && r == e) {
            return
          }
        }
        g = g.next
      }
      p = this.m_contactFactory.Create(e, d);
      e = p.GetFixtureA();
      d = p.GetFixtureB();
      f = e.m_body;
      g = d.m_body;
      p.m_prev = null;
      p.m_next = this.m_world.m_contactList;
      if(this.m_world.m_contactList != null) {
        this.m_world.m_contactList.m_prev = p
      }
      this.m_world.m_contactList = p;
      p.m_nodeA.contact = p;
      p.m_nodeA.other = g;
      p.m_nodeA.prev = null;
      p.m_nodeA.next = f.m_contactList;
      if(f.m_contactList != null) {
        f.m_contactList.prev = p.m_nodeA
      }
      f.m_contactList = p.m_nodeA;
      p.m_nodeB.contact = p;
      p.m_nodeB.other = f;
      p.m_nodeB.prev = null;
      p.m_nodeB.next = g.m_contactList;
      if(g.m_contactList != null) {
        g.m_contactList.prev = p.m_nodeB
      }
      g.m_contactList = p.m_nodeB;
      ++this.m_world.m_contactCount
    }
  };
  w.prototype.FindNewContacts = function() {
    this.m_broadPhase.UpdatePairs(Box2D.generateCallback(this, this.AddPair))
  };
  w.prototype.Destroy = function(a) {
    var b = a.GetFixtureA(), e = a.GetFixtureB(), b = b.GetBody(), e = e.GetBody();
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
    if(a.m_nodeB == e.m_contactList) {
      e.m_contactList = a.m_nodeB.next
    }
    this.m_contactFactory.Destroy(a);
    --this.m_contactCount
  };
  w.prototype.Collide = function() {
    for(var a = this.m_world.m_contactList;a;) {
      var b = a.GetFixtureA(), e = a.GetFixtureB(), d = b.GetBody(), f = e.GetBody();
      if(d.IsAwake() == !1 && f.IsAwake() == !1) {
        a = a.GetNext()
      }else {
        if(a.IsFiltering()) {
          if(f.ShouldCollide(d) == !1) {
            b = a;
            a = b.GetNext();
            this.Destroy(b);
            continue
          }
          if(this.m_contactFilter.ShouldCollide(b, e) == !1) {
            b = a;
            a = b.GetNext();
            this.Destroy(b);
            continue
          }
          a.ClearFiltering()
        }
        this.m_broadPhase.TestOverlap(b.m_proxy, e.m_proxy) == !1 ? (b = a, a = b.GetNext(), this.Destroy(b)) : (a.Update(this.m_contactListener), a = a.GetNext())
      }
    }
  };
  Box2D.postDefs.push(function() {
    Box2D.Dynamics.b2ContactManager.s_evalCP = new h
  });
  I.b2DestructionListener = function() {
  };
  I.prototype.SayGoodbyeJoint = function() {
  };
  I.prototype.SayGoodbyeFixture = function() {
  };
  A.b2FilterData = function() {
    this.categoryBits = 1;
    this.maskBits = 65535;
    this.groupIndex = 0
  };
  A.prototype.Copy = function() {
    var a = new A;
    a.categoryBits = this.categoryBits;
    a.maskBits = this.maskBits;
    a.groupIndex = this.groupIndex;
    return a
  };
  y.b2Fixture = function() {
    this.m_filter = new A
  };
  y.prototype.GetType = function() {
    return this.m_shape.GetType()
  };
  y.prototype.GetShape = function() {
    return this.m_shape
  };
  y.prototype.SetSensor = function(a) {
    if(this.m_isSensor != a && (this.m_isSensor = a, this.m_body != null)) {
      for(a = this.m_body.GetContactList();a;) {
        var b = a.contact, e = b.GetFixtureA(), d = b.GetFixtureB();
        if(e == this || d == this) {
          b.SetSensor(e.IsSensor() || d.IsSensor())
        }
        a = a.next
      }
    }
  };
  y.prototype.IsSensor = function() {
    return this.m_isSensor
  };
  y.prototype.SetFilterData = function(a) {
    this.m_filter = a.Copy();
    if(!this.m_body) {
      for(a = this.m_body.GetContactList();a;) {
        var b = a.contact, e = b.GetFixtureA(), d = b.GetFixtureB();
        (e == this || d == this) && b.FlagForFiltering();
        a = a.next
      }
    }
  };
  y.prototype.GetFilterData = function() {
    return this.m_filter.Copy()
  };
  y.prototype.GetBody = function() {
    return this.m_body
  };
  y.prototype.GetNext = function() {
    return this.m_next
  };
  y.prototype.GetUserData = function() {
    return this.m_userData
  };
  y.prototype.SetUserData = function(a) {
    this.m_userData = a
  };
  y.prototype.TestPoint = function(a) {
    return this.m_shape.TestPoint(this.m_body.GetTransform(), a)
  };
  y.prototype.RayCast = function(a, b) {
    return this.m_shape.RayCast(a, b, this.m_body.GetTransform())
  };
  y.prototype.GetMassData = function(a) {
    a === void 0 && (a = null);
    a == null && (a = new l);
    this.m_shape.ComputeMass(a, this.m_density);
    return a
  };
  y.prototype.SetDensity = function(a) {
    a === void 0 && (a = 0);
    this.m_density = a
  };
  y.prototype.GetDensity = function() {
    return this.m_density
  };
  y.prototype.GetFriction = function() {
    return this.m_friction
  };
  y.prototype.SetFriction = function(a) {
    a === void 0 && (a = 0);
    this.m_friction = a
  };
  y.prototype.GetRestitution = function() {
    return this.m_restitution
  };
  y.prototype.SetRestitution = function(a) {
    a === void 0 && (a = 0);
    this.m_restitution = a
  };
  y.prototype.GetAABB = function() {
    return this.m_aabb
  };
  y.prototype.b2Fixture = function() {
    this.m_aabb = new g;
    this.m_shape = this.m_next = this.m_body = this.m_userData = null;
    this.m_restitution = this.m_friction = this.m_density = 0
  };
  y.prototype.Create = function(a, b, e) {
    this.m_userData = e.userData;
    this.m_friction = e.friction;
    this.m_restitution = e.restitution;
    this.m_body = a;
    this.m_next = null;
    this.m_filter = e.filter.Copy();
    this.m_isSensor = e.isSensor;
    this.m_shape = e.shape.Copy();
    this.m_density = e.density
  };
  y.prototype.Destroy = function() {
    this.m_shape = null
  };
  y.prototype.CreateProxy = function(a, b) {
    this.m_shape.ComputeAABB(this.m_aabb, b);
    this.m_proxy = a.CreateProxy(this.m_aabb, this)
  };
  y.prototype.DestroyProxy = function(a) {
    if(this.m_proxy != null) {
      a.DestroyProxy(this.m_proxy), this.m_proxy = null
    }
  };
  y.prototype.Synchronize = function(b, e, d) {
    if(this.m_proxy) {
      var f = new g, h = new g;
      this.m_shape.ComputeAABB(f, e);
      this.m_shape.ComputeAABB(h, d);
      this.m_aabb.Combine(f, h);
      e = a.SubtractVV(d.position, e.position);
      b.MoveProxy(this.m_proxy, this.m_aabb, e)
    }
  };
  x.b2FixtureDef = function() {
    this.filter = new A
  };
  x.prototype.b2FixtureDef = function() {
    this.userData = this.shape = null;
    this.friction = 0.2;
    this.density = this.restitution = 0;
    this.filter.categoryBits = 1;
    this.filter.maskBits = 65535;
    this.filter.groupIndex = 0;
    this.isSensor = !1
  };
  F.b2Island = function() {
  };
  F.prototype.b2Island = function() {
    this.m_bodies = [];
    this.m_contacts = [];
    this.m_joints = []
  };
  F.prototype.Initialize = function(a, b, e, d, f) {
    a === void 0 && (a = 0);
    b === void 0 && (b = 0);
    e === void 0 && (e = 0);
    var g = 0;
    this.m_bodyCapacity = a;
    this.m_contactCapacity = b;
    this.m_jointCapacity = e;
    this.m_jointCount = this.m_contactCount = this.m_bodyCount = 0;
    this.m_listener = d;
    this.m_contactSolver = f;
    for(g = this.m_bodies.length;g < a;g++) {
      this.m_bodies[g] = null
    }
    for(g = this.m_contacts.length;g < b;g++) {
      this.m_contacts[g] = null
    }
    for(g = this.m_joints.length;g < e;g++) {
      this.m_joints[g] = null
    }
  };
  F.prototype.Clear = function() {
    this.m_jointCount = this.m_contactCount = this.m_bodyCount = 0
  };
  F.prototype.Solve = function(b, d, f) {
    for(var g = 0, h = 0, j, g = 0;g < this.m_bodyCount;++g) {
      h = this.m_bodies[g], h.GetType() == k.b2_dynamicBody && (h.m_linearVelocity.x += b.dt * (d.x + h.m_invMass * h.m_force.x), h.m_linearVelocity.y += b.dt * (d.y + h.m_invMass * h.m_force.y), h.m_angularVelocity += b.dt * h.m_invI * h.m_torque, h.m_linearVelocity.Multiply(a.Clamp(1 - b.dt * h.m_linearDamping, 0, 1)), h.m_angularVelocity *= a.Clamp(1 - b.dt * h.m_angularDamping, 0, 1))
    }
    this.m_contactSolver.Initialize(b, this.m_contacts, this.m_contactCount);
    d = this.m_contactSolver;
    d.InitVelocityConstraints(b);
    for(g = 0;g < this.m_jointCount;++g) {
      j = this.m_joints[g], j.InitVelocityConstraints(b)
    }
    for(g = 0;g < b.velocityIterations;++g) {
      for(h = 0;h < this.m_jointCount;++h) {
        j = this.m_joints[h], j.SolveVelocityConstraints(b)
      }
      d.SolveVelocityConstraints()
    }
    for(g = 0;g < this.m_jointCount;++g) {
      j = this.m_joints[g], j.FinalizeVelocityConstraints()
    }
    d.FinalizeVelocityConstraints();
    for(g = 0;g < this.m_bodyCount;++g) {
      if(h = this.m_bodies[g], h.GetType() != k.b2_staticBody) {
        var p = b.dt * h.m_linearVelocity.x, r = b.dt * h.m_linearVelocity.y;
        p * p + r * r > e.b2_maxTranslationSquared && (h.m_linearVelocity.Normalize(), h.m_linearVelocity.x *= e.b2_maxTranslation * b.inv_dt, h.m_linearVelocity.y *= e.b2_maxTranslation * b.inv_dt);
        p = b.dt * h.m_angularVelocity;
        if(p * p > e.b2_maxRotationSquared) {
          h.m_angularVelocity = h.m_angularVelocity < 0 ? -e.b2_maxRotation * b.inv_dt : e.b2_maxRotation * b.inv_dt
        }
        h.m_sweep.c0.SetV(h.m_sweep.c);
        h.m_sweep.a0 = h.m_sweep.a;
        h.m_sweep.c.x += b.dt * h.m_linearVelocity.x;
        h.m_sweep.c.y += b.dt * h.m_linearVelocity.y;
        h.m_sweep.a += b.dt * h.m_angularVelocity;
        h.SynchronizeTransform()
      }
    }
    for(g = 0;g < b.positionIterations;++g) {
      p = d.SolvePositionConstraints(e.b2_contactBaumgarte);
      r = !0;
      for(h = 0;h < this.m_jointCount;++h) {
        j = this.m_joints[h], j = j.SolvePositionConstraints(e.b2_contactBaumgarte), r = r && j
      }
      if(p && r) {
        break
      }
    }
    this.Report(d.m_constraints);
    if(f) {
      f = Number.MAX_VALUE;
      d = e.b2_linearSleepTolerance * e.b2_linearSleepTolerance;
      p = e.b2_angularSleepTolerance * e.b2_angularSleepTolerance;
      for(g = 0;g < this.m_bodyCount;++g) {
        if(h = this.m_bodies[g], h.GetType() != k.b2_staticBody) {
          !h.m_allowSleep || h.m_angularVelocity * h.m_angularVelocity > p || a.Dot(h.m_linearVelocity, h.m_linearVelocity) > d ? f = h.m_sleepTime = 0 : (h.m_sleepTime += b.dt, f = a.Min(f, h.m_sleepTime))
        }
      }
      if(f >= e.b2_timeToSleep) {
        for(g = 0;g < this.m_bodyCount;++g) {
          h = this.m_bodies[g], h.SetAwake(!1)
        }
      }
    }
  };
  F.prototype.SolveTOI = function(a) {
    var b = 0, d = 0;
    this.m_contactSolver.Initialize(a, this.m_contacts, this.m_contactCount);
    for(var f = this.m_contactSolver, b = 0;b < this.m_jointCount;++b) {
      this.m_joints[b].InitVelocityConstraints(a)
    }
    for(b = 0;b < a.velocityIterations;++b) {
      f.SolveVelocityConstraints();
      for(d = 0;d < this.m_jointCount;++d) {
        this.m_joints[d].SolveVelocityConstraints(a)
      }
    }
    for(b = 0;b < this.m_bodyCount;++b) {
      if(d = this.m_bodies[b], d.GetType() != k.b2_staticBody) {
        var g = a.dt * d.m_linearVelocity.x, h = a.dt * d.m_linearVelocity.y;
        g * g + h * h > e.b2_maxTranslationSquared && (d.m_linearVelocity.Normalize(), d.m_linearVelocity.x *= e.b2_maxTranslation * a.inv_dt, d.m_linearVelocity.y *= e.b2_maxTranslation * a.inv_dt);
        g = a.dt * d.m_angularVelocity;
        if(g * g > e.b2_maxRotationSquared) {
          d.m_angularVelocity = d.m_angularVelocity < 0 ? -e.b2_maxRotation * a.inv_dt : e.b2_maxRotation * a.inv_dt
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
      g = f.SolvePositionConstraints(0.75);
      h = !0;
      for(d = 0;d < this.m_jointCount;++d) {
        var p = this.m_joints[d].SolvePositionConstraints(e.b2_contactBaumgarte), h = h && p
      }
      if(g && h) {
        break
      }
    }
    this.Report(f.m_constraints)
  };
  F.prototype.Report = function(a) {
    if(this.m_listener != null) {
      for(var b = 0;b < this.m_contactCount;++b) {
        for(var e = this.m_contacts[b], d = a[b], f = 0;f < d.pointCount;++f) {
          F.s_impulse.normalImpulses[f] = d.points[f].normalImpulse, F.s_impulse.tangentImpulses[f] = d.points[f].tangentImpulse
        }
        this.m_listener.PostSolve(e, F.s_impulse)
      }
    }
  };
  F.prototype.AddBody = function(a) {
    a.m_islandIndex = this.m_bodyCount;
    this.m_bodies[this.m_bodyCount++] = a
  };
  F.prototype.AddContact = function(a) {
    this.m_contacts[this.m_contactCount++] = a
  };
  F.prototype.AddJoint = function(a) {
    this.m_joints[this.m_jointCount++] = a
  };
  Box2D.postDefs.push(function() {
    Box2D.Dynamics.b2Island.s_impulse = new s
  });
  E.b2TimeStep = function() {
  };
  E.prototype.Set = function(a) {
    this.dt = a.dt;
    this.inv_dt = a.inv_dt;
    this.positionIterations = a.positionIterations;
    this.velocityIterations = a.velocityIterations;
    this.warmStarting = a.warmStarting
  }
})();
(function() {
  var a = Box2D.Collision.Shapes.b2CircleShape, d = Box2D.Collision.Shapes.b2EdgeShape, b = Box2D.Collision.Shapes.b2PolygonShape, f = Box2D.Collision.Shapes.b2Shape, e = Box2D.Dynamics.Contacts.b2ContactConstraint, g = Box2D.Dynamics.Contacts.b2ContactResult, h = Box2D.Dynamics.Contacts.b2ContactSolver, j = Box2D.Dynamics.Contacts.b2EdgeAndCircleContact, l = Box2D.Dynamics.Contacts.b2NullContact, k = Box2D.Dynamics.Contacts.b2PolyAndCircleContact, o = Box2D.Dynamics.Contacts.b2PolyAndEdgeContact, 
  m = Box2D.Dynamics.Contacts.b2PolygonContact, s = Box2D.Dynamics.Contacts.b2PositionSolverManifold, q = Box2D.Dynamics.b2TimeStep, w = Box2D.Common.b2Settings, I = Box2D.Common.Math.b2Math, A = Box2D.Common.Math.b2Vec2, y = Box2D.Collision.b2Collision, x = Box2D.Collision.b2ContactID, F = Box2D.Collision.b2Manifold, E = Box2D.Collision.b2WorldManifold;
  Box2D.Dynamics.Contacts.b2ContactRegister.b2ContactRegister = function() {
  };
  g.b2ContactResult = function() {
    this.position = new A;
    this.normal = new A;
    this.id = new x
  };
  h.b2ContactSolver = function() {
    this.m_step = new q;
    this.m_constraints = []
  };
  h.prototype.b2ContactSolver = function() {
  };
  h.prototype.Initialize = function(a, b, d) {
    d === void 0 && (d = 0);
    var f;
    this.m_step.Set(a);
    a = 0;
    for(this.m_constraintCount = d;this.m_constraints.length < this.m_constraintCount;) {
      this.m_constraints[this.m_constraints.length] = new e
    }
    for(a = 0;a < d;++a) {
      f = b[a];
      var g = f.m_fixtureA, j = f.m_fixtureB, k = g.m_shape.m_radius, p = j.m_shape.m_radius, r = g.m_body, v = j.m_body, H = f.GetManifold(), K = w.b2MixFriction(g.GetFriction(), j.GetFriction()), q = w.b2MixRestitution(g.GetRestitution(), j.GetRestitution()), C = r.m_linearVelocity.x, B = r.m_linearVelocity.y, u = v.m_linearVelocity.x, L = v.m_linearVelocity.y, m = r.m_angularVelocity, l = v.m_angularVelocity;
      w.b2Assert(H.m_pointCount > 0);
      h.s_worldManifold.Initialize(H, r.m_xf, k, v.m_xf, p);
      j = h.s_worldManifold.m_normal.x;
      f = h.s_worldManifold.m_normal.y;
      g = this.m_constraints[a];
      g.bodyA = r;
      g.bodyB = v;
      g.manifold = H;
      g.normal.x = j;
      g.normal.y = f;
      g.pointCount = H.m_pointCount;
      g.friction = K;
      g.restitution = q;
      g.localPlaneNormal.x = H.m_localPlaneNormal.x;
      g.localPlaneNormal.y = H.m_localPlaneNormal.y;
      g.localPoint.x = H.m_localPoint.x;
      g.localPoint.y = H.m_localPoint.y;
      g.radius = k + p;
      g.type = H.m_type;
      for(k = 0;k < g.pointCount;++k) {
        K = H.m_points[k];
        p = g.points[k];
        p.normalImpulse = K.m_normalImpulse;
        p.tangentImpulse = K.m_tangentImpulse;
        p.localPoint.SetV(K.m_localPoint);
        var K = p.rA.x = h.s_worldManifold.m_points[k].x - r.m_sweep.c.x, q = p.rA.y = h.s_worldManifold.m_points[k].y - r.m_sweep.c.y, s = p.rB.x = h.s_worldManifold.m_points[k].x - v.m_sweep.c.x, o = p.rB.y = h.s_worldManifold.m_points[k].y - v.m_sweep.c.y, z = K * f - q * j, x = s * f - o * j;
        z *= z;
        x *= x;
        p.normalMass = 1 / (r.m_invMass + v.m_invMass + r.m_invI * z + v.m_invI * x);
        var y = r.m_mass * r.m_invMass + v.m_mass * v.m_invMass;
        y += r.m_mass * r.m_invI * z + v.m_mass * v.m_invI * x;
        p.equalizedMass = 1 / y;
        x = f;
        y = -j;
        z = K * y - q * x;
        x = s * y - o * x;
        z *= z;
        x *= x;
        p.tangentMass = 1 / (r.m_invMass + v.m_invMass + r.m_invI * z + v.m_invI * x);
        p.velocityBias = 0;
        K = g.normal.x * (u + -l * o - C - -m * q) + g.normal.y * (L + l * s - B - m * K);
        K < -w.b2_velocityThreshold && (p.velocityBias += -g.restitution * K)
      }
      if(g.pointCount == 2) {
        L = g.points[0], u = g.points[1], H = r.m_invMass, r = r.m_invI, C = v.m_invMass, v = v.m_invI, B = L.rA.x * f - L.rA.y * j, L = L.rB.x * f - L.rB.y * j, m = u.rA.x * f - u.rA.y * j, u = u.rB.x * f - u.rB.y * j, j = H + C + r * B * B + v * L * L, f = H + C + r * m * m + v * u * u, v = H + C + r * B * m + v * L * u, j * j < 100 * (j * f - v * v) ? (g.K.col1.Set(j, v), g.K.col2.Set(v, f), g.K.GetInverse(g.normalMass)) : g.pointCount = 1
      }
    }
  };
  h.prototype.InitVelocityConstraints = function(a) {
    for(var b = 0;b < this.m_constraintCount;++b) {
      var e = this.m_constraints[b], d = e.bodyA, f = e.bodyB, g = d.m_invMass, h = d.m_invI, p = f.m_invMass, r = f.m_invI, v = e.normal.x, j = e.normal.y, k = j, q = -v, C = 0, B = 0;
      if(a.warmStarting) {
        B = e.pointCount;
        for(C = 0;C < B;++C) {
          var u = e.points[C];
          u.normalImpulse *= a.dtRatio;
          u.tangentImpulse *= a.dtRatio;
          var L = u.normalImpulse * v + u.tangentImpulse * k, m = u.normalImpulse * j + u.tangentImpulse * q;
          d.m_angularVelocity -= h * (u.rA.x * m - u.rA.y * L);
          d.m_linearVelocity.x -= g * L;
          d.m_linearVelocity.y -= g * m;
          f.m_angularVelocity += r * (u.rB.x * m - u.rB.y * L);
          f.m_linearVelocity.x += p * L;
          f.m_linearVelocity.y += p * m
        }
      }else {
        B = e.pointCount;
        for(C = 0;C < B;++C) {
          d = e.points[C], d.normalImpulse = 0, d.tangentImpulse = 0
        }
      }
    }
  };
  h.prototype._SVCA = function(a, b, e, d, f, g, h, p, r, v, j, k, q, C) {
    var b = a - b, B = e - d, d = b * f;
    b *= g;
    f *= B;
    g *= B;
    q.x -= h * (d + f);
    q.y -= h * (b + g);
    h = -r * (j.rA.x * b - j.rA.y * d + k.rA.x * g - k.rA.y * f);
    C.x += p * (d + f);
    C.y += p * (b + g);
    p = v * (j.rB.x * b - j.rB.y * d + k.rB.x * g - k.rB.y * f);
    j.normalImpulse = a;
    k.normalImpulse = e;
    return{wad:h, wbd:p}
  };
  h.prototype.SolveVelocityConstraints_NEW = function() {
    for(var a = 0, b = 0, e = b = 0, d = e = 0, f = b = 0;f < this.m_constraintCount;++f) {
      for(var a = this.m_constraints[f], g = a.bodyA, h = a.bodyB, p = g.m_angularVelocity, r = h.m_angularVelocity, v = g.m_linearVelocity, j = h.m_linearVelocity, k = g.m_invMass, q = g.m_invI, C = h.m_invMass, B = h.m_invI, u = a.normal.x, m = a.normal.y, l = m, s = -u, o = a.friction, w = 0;w < a.pointCount;w++) {
        var z = a.points[w], b = j.x - r * z.rB.y - v.x + p * z.rA.y, e = j.y + r * z.rB.x - v.y - p * z.rA.x, b = b * l + e * s, b = z.tangentMass * -b, e = o * z.normalImpulse, e = I.Clamp(z.tangentImpulse + b, -e, e), b = e - z.tangentImpulse, d = b * l;
        b *= s;
        v.x -= k * d;
        v.y -= k * b;
        p -= q * (z.rA.x * b - z.rA.y * d);
        j.x += C * d;
        j.y += C * b;
        r += B * (z.rB.x * b - z.rB.y * d);
        z.tangentImpulse = e
      }
      a.pointCount == 1 ? (z = a.points[0], b = j.x - r * z.rB.y - v.x + p * z.rA.y, e = j.y + r * z.rB.x - v.y - p * z.rA.x, a = b * u + e * m, b = -z.normalMass * (a - z.velocityBias), e = z.normalImpulse + b, e < 0 && (e = 0), b = e - z.normalImpulse, d = b * u, b *= m, v.x -= k * d, v.y -= k * b, p -= q * (z.rA.x * b - z.rA.y * d), j.x += C * d, j.y += C * b, r += B * (z.rB.x * b - z.rB.y * d), z.normalImpulse = e) : (z = a.points[0], l = a.points[1], s = z.normalImpulse, o = l.normalImpulse, 
      b = j.x - v.x, e = j.y - v.y, w = (b - r * z.rB.y + p * z.rA.y) * u + (e + r * z.rB.x - p * z.rA.x) * m - z.velocityBias - (a.K.col1.x * s + a.K.col2.x * o), b = (b - r * l.rB.y + p * l.rA.y) * u + (e + r * l.rB.x - p * l.rA.x) * m - l.velocityBias - (a.K.col1.y * s + a.K.col2.y * o), e = -(a.normalMass.col1.x * w + a.normalMass.col2.x * b), d = -1, e >= 0 && (d = -(a.normalMass.col1.y * w + a.normalMass.col2.y * b)), d >= 0 ? (v = this._SVCA(e, s, d, o, u, m, k, C, q, B, z, l, v, j), p += 
      v.wad, r += v.wbd) : (e = -z.normalMass * w, d = 0, e >= 0 && a.K.col1.y * e + b >= 0 ? (v = this._SVCA(e, s, d, o, u, m, k, C, q, B, z, l, v, j), p += v.wad, r += v.wbd) : (e = 0, d = -l.normalMass * b, d >= 0 && a.K.col2.x * d + w >= 0 ? (v = this._SVCA(e, s, d, o, u, m, k, C, q, B, z, l, v, j), p += v.wad, r += v.wbd) : (d = 0, w >= 0 && b >= 0 && (v = this._SVCA(e, s, d, o, u, m, k, C, q, B, z, l, v, j), p += v.wad, r += v.wbd)))));
      g.m_angularVelocity = p;
      h.m_angularVelocity = r
    }
  };
  h.prototype.SolveVelocityConstraints = function() {
    for(var a = 0, b, e = 0, d = 0, f = 0, g = d = d = e = e = 0, h = e = e = 0, p = e = f = 0, r = 0, v, j = 0;j < this.m_constraintCount;++j) {
      var f = this.m_constraints[j], k = f.bodyA, q = f.bodyB, C = k.m_angularVelocity, B = q.m_angularVelocity, u = k.m_linearVelocity, m = q.m_linearVelocity, l = k.m_invMass, s = k.m_invI, o = q.m_invMass, w = q.m_invI, p = f.normal.x, z = r = f.normal.y;
      v = -p;
      h = f.friction;
      for(a = 0;a < f.pointCount;a++) {
        b = f.points[a], e = m.x - B * b.rB.y - u.x + C * b.rA.y, d = m.y + B * b.rB.x - u.y - C * b.rA.x, e = e * z + d * v, e = b.tangentMass * -e, d = h * b.normalImpulse, d = I.Clamp(b.tangentImpulse + e, -d, d), e = d - b.tangentImpulse, g = e * z, e *= v, u.x -= l * g, u.y -= l * e, C -= s * (b.rA.x * e - b.rA.y * g), m.x += o * g, m.y += o * e, B += w * (b.rB.x * e - b.rB.y * g), b.tangentImpulse = d
      }
      if(f.pointCount == 1) {
        b = f.points[0], e = m.x + -B * b.rB.y - u.x - -C * b.rA.y, d = m.y + B * b.rB.x - u.y - C * b.rA.x, f = e * p + d * r, e = -b.normalMass * (f - b.velocityBias), d = b.normalImpulse + e, d = d > 0 ? d : 0, e = d - b.normalImpulse, g = e * p, e *= r, u.x -= l * g, u.y -= l * e, C -= s * (b.rA.x * e - b.rA.y * g), m.x += o * g, m.y += o * e, B += w * (b.rB.x * e - b.rB.y * g), b.normalImpulse = d
      }else {
        b = f.points[0];
        var a = f.points[1], e = b.normalImpulse, h = a.normalImpulse, x = (m.x - B * b.rB.y - u.x + C * b.rA.y) * p + (m.y + B * b.rB.x - u.y - C * b.rA.x) * r, y = (m.x - B * a.rB.y - u.x + C * a.rA.y) * p + (m.y + B * a.rB.x - u.y - C * a.rA.x) * r, d = x - b.velocityBias, g = y - a.velocityBias;
        v = f.K;
        d -= v.col1.x * e + v.col2.x * h;
        for(g -= v.col1.y * e + v.col2.y * h;;) {
          v = f.normalMass;
          z = -(v.col1.x * d + v.col2.x * g);
          v = -(v.col1.y * d + v.col2.y * g);
          if(z >= 0 && v >= 0) {
            e = z - e;
            h = v - h;
            f = e * p;
            e *= r;
            p *= h;
            r *= h;
            u.x -= l * (f + p);
            u.y -= l * (e + r);
            C -= s * (b.rA.x * e - b.rA.y * f + a.rA.x * r - a.rA.y * p);
            m.x += o * (f + p);
            m.y += o * (e + r);
            B += w * (b.rB.x * e - b.rB.y * f + a.rB.x * r - a.rB.y * p);
            b.normalImpulse = z;
            a.normalImpulse = v;
            break
          }
          z = -b.normalMass * d;
          v = 0;
          y = f.K.col1.y * z + g;
          if(z >= 0 && y >= 0) {
            e = z - e;
            h = v - h;
            f = e * p;
            e *= r;
            p *= h;
            r *= h;
            u.x -= l * (f + p);
            u.y -= l * (e + r);
            C -= s * (b.rA.x * e - b.rA.y * f + a.rA.x * r - a.rA.y * p);
            m.x += o * (f + p);
            m.y += o * (e + r);
            B += w * (b.rB.x * e - b.rB.y * f + a.rB.x * r - a.rB.y * p);
            b.normalImpulse = z;
            a.normalImpulse = v;
            break
          }
          z = 0;
          v = -a.normalMass * g;
          x = f.K.col2.x * v + d;
          if(v >= 0 && x >= 0) {
            e = z - e;
            h = v - h;
            f = e * p;
            e *= r;
            p *= h;
            r *= h;
            u.x -= l * (f + p);
            u.y -= l * (e + r);
            C -= s * (b.rA.x * e - b.rA.y * f + a.rA.x * r - a.rA.y * p);
            m.x += o * (f + p);
            m.y += o * (e + r);
            B += w * (b.rB.x * e - b.rB.y * f + a.rB.x * r - a.rB.y * p);
            b.normalImpulse = z;
            a.normalImpulse = v;
            break
          }
          v = z = 0;
          x = d;
          y = g;
          if(x >= 0 && y >= 0) {
            e = z - e;
            h = v - h;
            f = e * p;
            e *= r;
            p *= h;
            r *= h;
            u.x -= l * (f + p);
            u.y -= l * (e + r);
            C -= s * (b.rA.x * e - b.rA.y * f + a.rA.x * r - a.rA.y * p);
            m.x += o * (f + p);
            m.y += o * (e + r);
            B += w * (b.rB.x * e - b.rB.y * f + a.rB.x * r - a.rB.y * p);
            b.normalImpulse = z;
            a.normalImpulse = v;
            break
          }
          break
        }
      }
      k.m_angularVelocity = C;
      q.m_angularVelocity = B
    }
  };
  h.prototype.FinalizeVelocityConstraints = function() {
    for(var a = 0;a < this.m_constraintCount;++a) {
      for(var b = this.m_constraints[a], e = b.manifold, d = 0;d < b.pointCount;++d) {
        var f = e.m_points[d], g = b.points[d];
        f.m_normalImpulse = g.normalImpulse;
        f.m_tangentImpulse = g.tangentImpulse
      }
    }
  };
  h.prototype.SolvePositionConstraints = function(a) {
    a === void 0 && (a = 0);
    for(var b = 0, e = 0;e < this.m_constraintCount;e++) {
      var d = this.m_constraints[e], f = d.bodyA, g = d.bodyB, j = f.m_mass * f.m_invMass, p = f.m_mass * f.m_invI, r = g.m_mass * g.m_invMass, v = g.m_mass * g.m_invI;
      h.s_psm.Initialize(d);
      for(var H = h.s_psm.m_normal, k = 0;k < d.pointCount;k++) {
        var q = d.points[k], C = h.s_psm.m_points[k], B = h.s_psm.m_separations[k], u = C.x - f.m_sweep.c.x, m = C.y - f.m_sweep.c.y, l = C.x - g.m_sweep.c.x, C = C.y - g.m_sweep.c.y, b = b < B ? b : B, B = I.Clamp(a * (B + w.b2_linearSlop), -w.b2_maxLinearCorrection, 0);
        B *= -q.equalizedMass;
        q = B * H.x;
        B *= H.y;
        f.m_sweep.c.x -= j * q;
        f.m_sweep.c.y -= j * B;
        f.m_sweep.a -= p * (u * B - m * q);
        f.SynchronizeTransform();
        g.m_sweep.c.x += r * q;
        g.m_sweep.c.y += r * B;
        g.m_sweep.a += v * (l * B - C * q);
        g.SynchronizeTransform()
      }
    }
    return b > -1.5 * w.b2_linearSlop
  };
  h.prototype.SolvePositionConstraints_NEW = function(a) {
    a === void 0 && (a = 0);
    for(var b = 0, e = 0;e < this.m_constraintCount;e++) {
      var d = this.m_constraints[e], f = d.bodyA, g = d.bodyB, j = f.m_mass * f.m_invMass, p = f.m_mass * f.m_invI, r = g.m_mass * g.m_invMass, v = g.m_mass * g.m_invI;
      h.s_psm.Initialize(d);
      for(var H = h.s_psm.m_normal, k = 0;k < d.pointCount;k++) {
        var q = d.points[k], C = h.s_psm.m_points[k], B = h.s_psm.m_separations[k], u = C.x - f.m_sweep.c.x, m = C.y - f.m_sweep.c.y, l = C.x - g.m_sweep.c.x, C = C.y - g.m_sweep.c.y;
        B < b && (b = B);
        a != 0 && I.Clamp(a * (B + w.b2_linearSlop), -w.b2_maxLinearCorrection, 0);
        B = -q.equalizedMass * 0;
        q = B * H.x;
        B *= H.y;
        f.m_sweep.c.x -= j * q;
        f.m_sweep.c.y -= j * B;
        f.m_sweep.a -= p * (u * B - m * q);
        f.SynchronizeTransform();
        g.m_sweep.c.x += r * q;
        g.m_sweep.c.y += r * B;
        g.m_sweep.a += v * (l * B - C * q);
        g.SynchronizeTransform()
      }
    }
    return b > -1.5 * w.b2_linearSlop
  };
  Box2D.postDefs.push(function() {
    Box2D.Dynamics.Contacts.b2ContactSolver.s_worldManifold = new E;
    Box2D.Dynamics.Contacts.b2ContactSolver.s_psm = new s
  });
  Box2D.inherit(j, Box2D.Dynamics.Contacts.b2Contact);
  j.prototype.__super = Box2D.Dynamics.Contacts.b2Contact.prototype;
  j.b2EdgeAndCircleContact = function() {
    Box2D.Dynamics.Contacts.b2Contact.apply(this, arguments)
  };
  j.Create = function() {
    return new j
  };
  j.Destroy = function() {
  };
  j.prototype.Reset = function(a, b) {
    this.__super.Reset.call(this, a, b)
  };
  j.prototype.Evaluate = function() {
    var b = this.m_fixtureA.GetBody(), e = this.m_fixtureB.GetBody();
    this.b2CollideEdgeAndCircle(this.m_manifold, this.m_fixtureA.GetShape() instanceof d ? this.m_fixtureA.GetShape() : null, b.m_xf, this.m_fixtureB.GetShape() instanceof a ? this.m_fixtureB.GetShape() : null, e.m_xf)
  };
  j.prototype.b2CollideEdgeAndCircle = function() {
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
    w.b2Assert(a.GetType() == f.e_polygonShape);
    w.b2Assert(b.GetType() == f.e_circleShape)
  };
  k.prototype.Evaluate = function() {
    var e = this.m_fixtureA.m_body, d = this.m_fixtureB.m_body;
    y.CollidePolygonAndCircle(this.m_manifold, this.m_fixtureA.GetShape() instanceof b ? this.m_fixtureA.GetShape() : null, e.m_xf, this.m_fixtureB.GetShape() instanceof a ? this.m_fixtureB.GetShape() : null, d.m_xf)
  };
  Box2D.inherit(o, Box2D.Dynamics.Contacts.b2Contact);
  o.prototype.__super = Box2D.Dynamics.Contacts.b2Contact.prototype;
  o.b2PolyAndEdgeContact = function() {
    Box2D.Dynamics.Contacts.b2Contact.apply(this, arguments)
  };
  o.Create = function() {
    return new o
  };
  o.Destroy = function() {
  };
  o.prototype.Reset = function(a, b) {
    this.__super.Reset.call(this, a, b);
    w.b2Assert(a.GetType() == f.e_polygonShape);
    w.b2Assert(b.GetType() == f.e_edgeShape)
  };
  o.prototype.Evaluate = function() {
    var a = this.m_fixtureA.GetBody(), e = this.m_fixtureB.GetBody();
    this.b2CollidePolyAndEdge(this.m_manifold, this.m_fixtureA.GetShape() instanceof b ? this.m_fixtureA.GetShape() : null, a.m_xf, this.m_fixtureB.GetShape() instanceof d ? this.m_fixtureB.GetShape() : null, e.m_xf)
  };
  o.prototype.b2CollidePolyAndEdge = function() {
  };
  Box2D.inherit(m, Box2D.Dynamics.Contacts.b2Contact);
  m.prototype.__super = Box2D.Dynamics.Contacts.b2Contact.prototype;
  m.b2PolygonContact = function() {
    Box2D.Dynamics.Contacts.b2Contact.apply(this, arguments)
  };
  m.Create = function() {
    return new m
  };
  m.Destroy = function() {
  };
  m.prototype.Reset = function(a, b) {
    this.__super.Reset.call(this, a, b)
  };
  m.prototype.Evaluate = function() {
    var a = this.m_fixtureA.GetBody(), e = this.m_fixtureB.GetBody();
    y.CollidePolygons(this.m_manifold, this.m_fixtureA.GetShape() instanceof b ? this.m_fixtureA.GetShape() : null, a.m_xf, this.m_fixtureB.GetShape() instanceof b ? this.m_fixtureB.GetShape() : null, e.m_xf)
  };
  s.b2PositionSolverManifold = function() {
  };
  s.prototype.b2PositionSolverManifold = function() {
    this.m_normal = new A;
    this.m_separations = new Box2D.NVector(w.b2_maxManifoldPoints);
    this.m_points = Array(w.b2_maxManifoldPoints);
    for(var a = 0;a < w.b2_maxManifoldPoints;a++) {
      this.m_points[a] = new A
    }
  };
  s.prototype.Initialize = function(a) {
    w.b2Assert(a.pointCount > 0);
    var b = 0, e = 0, d = 0, f = 0, g = 0;
    switch(a.type) {
      case F.e_circles:
        var h = a.bodyA.m_xf.R, d = a.localPoint, b = a.bodyA.m_xf.position.x + (h.col1.x * d.x + h.col2.x * d.y), e = a.bodyA.m_xf.position.y + (h.col1.y * d.x + h.col2.y * d.y), h = a.bodyB.m_xf.R, d = a.points[0].localPoint, f = a.bodyB.m_xf.position.x + (h.col1.x * d.x + h.col2.x * d.y), h = a.bodyB.m_xf.position.y + (h.col1.y * d.x + h.col2.y * d.y), d = f - b, g = h - e, p = d * d + g * g;
        p > Box2D.MIN_VALUE_SQUARED ? (p = Math.sqrt(p), this.m_normal.x = d / p, this.m_normal.y = g / p) : (this.m_normal.x = 1, this.m_normal.y = 0);
        this.m_points[0].x = 0.5 * (b + f);
        this.m_points[0].y = 0.5 * (e + h);
        this.m_separations[0] = d * this.m_normal.x + g * this.m_normal.y - a.radius;
        break;
      case F.e_faceA:
        h = a.bodyA.m_xf.R;
        d = a.localPlaneNormal;
        this.m_normal.x = h.col1.x * d.x + h.col2.x * d.y;
        this.m_normal.y = h.col1.y * d.x + h.col2.y * d.y;
        h = a.bodyA.m_xf.R;
        d = a.localPoint;
        f = a.bodyA.m_xf.position.x + (h.col1.x * d.x + h.col2.x * d.y);
        g = a.bodyA.m_xf.position.y + (h.col1.y * d.x + h.col2.y * d.y);
        h = a.bodyB.m_xf.R;
        for(b = 0;b < a.pointCount;++b) {
          d = a.points[b].localPoint, e = a.bodyB.m_xf.position.x + (h.col1.x * d.x + h.col2.x * d.y), d = a.bodyB.m_xf.position.y + (h.col1.y * d.x + h.col2.y * d.y), this.m_separations[b] = (e - f) * this.m_normal.x + (d - g) * this.m_normal.y - a.radius, this.m_points[b].x = e, this.m_points[b].y = d
        }
        break;
      case F.e_faceB:
        h = a.bodyB.m_xf.R;
        d = a.localPlaneNormal;
        this.m_normal.x = h.col1.x * d.x + h.col2.x * d.y;
        this.m_normal.y = h.col1.y * d.x + h.col2.y * d.y;
        h = a.bodyB.m_xf.R;
        d = a.localPoint;
        f = a.bodyB.m_xf.position.x + (h.col1.x * d.x + h.col2.x * d.y);
        g = a.bodyB.m_xf.position.y + (h.col1.y * d.x + h.col2.y * d.y);
        h = a.bodyA.m_xf.R;
        for(b = 0;b < a.pointCount;++b) {
          d = a.points[b].localPoint, e = a.bodyA.m_xf.position.x + (h.col1.x * d.x + h.col2.x * d.y), d = a.bodyA.m_xf.position.y + (h.col1.y * d.x + h.col2.y * d.y), this.m_separations[b] = (e - f) * this.m_normal.x + (d - g) * this.m_normal.y - a.radius, this.m_points[b].Set(e, d)
        }
        this.m_normal.x *= -1;
        this.m_normal.y *= -1
    }
  };
  Box2D.postDefs.push(function() {
    Box2D.Dynamics.Contacts.b2PositionSolverManifold.circlePointA = new A;
    Box2D.Dynamics.Contacts.b2PositionSolverManifold.circlePointB = new A
  })
})();
(function() {
  var a = Box2D.Common.Math.b2Mat22, d = Box2D.Common.Math.b2Math, b = Box2D.Common.Math.b2Vec2, f = Box2D.Common.b2Color, e = Box2D.Dynamics.Controllers.b2BuoyancyController, g = Box2D.Dynamics.Controllers.b2ConstantAccelController, h = Box2D.Dynamics.Controllers.b2ConstantForceController, j = Box2D.Dynamics.Controllers.b2Controller, l = Box2D.Dynamics.Controllers.b2ControllerEdge, k = Box2D.Dynamics.Controllers.b2GravityController, o = Box2D.Dynamics.Controllers.b2TensorDampingController;
  Box2D.inherit(e, Box2D.Dynamics.Controllers.b2Controller);
  e.prototype.__super = Box2D.Dynamics.Controllers.b2Controller.prototype;
  e.b2BuoyancyController = function() {
    Box2D.Dynamics.Controllers.b2Controller.b2Controller.apply(this, arguments);
    this.normal = new b(0, -1);
    this.density = this.offset = 0;
    this.velocity = new b(0, 0);
    this.linearDrag = 2;
    this.angularDrag = 1;
    this.useDensity = !1;
    this.useWorldGravity = !0;
    this.gravity = null
  };
  e.prototype.Step = function() {
    if(this.m_bodyList) {
      if(this.useWorldGravity) {
        this.gravity = this.GetWorld().GetGravity().Copy()
      }
      for(var a = this.m_bodyList;a;a = a.nextBody) {
        var e = a.body;
        if(e.IsAwake() != !1) {
          for(var d = new b, f = new b, g = 0, h = 0, j = e.GetFixtureList();j;j = j.GetNext()) {
            var k = new b, l = j.GetShape().ComputeSubmergedArea(this.normal, this.offset, e.GetTransform(), k);
            g += l;
            d.x += l * k.x;
            d.y += l * k.y;
            var o = 0, o = 1;
            h += l * o;
            f.x += l * k.x * o;
            f.y += l * k.y * o
          }
          d.x /= g;
          d.y /= g;
          f.x /= h;
          f.y /= h;
          g < Number.MIN_VALUE || (h = this.gravity.GetNegative(), h.Multiply(this.density * g), e.ApplyForce(h, f), f = e.GetLinearVelocityFromWorldPoint(d), f.Subtract(this.velocity), f.Multiply(-this.linearDrag * g), e.ApplyForce(f, d), e.ApplyTorque(-e.GetInertia() / e.GetMass() * g * e.GetAngularVelocity() * this.angularDrag))
        }
      }
    }
  };
  e.prototype.Draw = function(a) {
    var e = new b, d = new b;
    e.x = this.normal.x * this.offset + this.normal.y * 1E3;
    e.y = this.normal.y * this.offset - this.normal.x * 1E3;
    d.x = this.normal.x * this.offset - this.normal.y * 1E3;
    d.y = this.normal.y * this.offset + this.normal.x * 1E3;
    var g = new f(0, 0, 1);
    a.DrawSegment(e, d, g)
  };
  Box2D.inherit(g, Box2D.Dynamics.Controllers.b2Controller);
  g.prototype.__super = Box2D.Dynamics.Controllers.b2Controller.prototype;
  g.b2ConstantAccelController = function() {
    Box2D.Dynamics.Controllers.b2Controller.b2Controller.apply(this, arguments);
    this.A = new b(0, 0)
  };
  g.prototype.Step = function(a) {
    for(var a = new b(this.A.x * a.dt, this.A.y * a.dt), e = this.m_bodyList;e;e = e.nextBody) {
      var d = e.body;
      d.IsAwake() && d.SetLinearVelocity(new b(d.GetLinearVelocity().x + a.x, d.GetLinearVelocity().y + a.y))
    }
  };
  Box2D.inherit(h, Box2D.Dynamics.Controllers.b2Controller);
  h.prototype.__super = Box2D.Dynamics.Controllers.b2Controller.prototype;
  h.b2ConstantForceController = function() {
    Box2D.Dynamics.Controllers.b2Controller.b2Controller.apply(this, arguments);
    this.F = new b(0, 0)
  };
  h.prototype.Step = function() {
    for(var a = this.m_bodyList;a;a = a.nextBody) {
      var b = a.body;
      b.IsAwake() && b.ApplyForce(this.F, b.GetWorldCenter())
    }
  };
  j.b2Controller = function() {
  };
  j.prototype.Step = function() {
  };
  j.prototype.Draw = function() {
  };
  j.prototype.AddBody = function(a) {
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
  j.prototype.RemoveBody = function(a) {
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
  j.prototype.Clear = function() {
    for(;this.m_bodyList;) {
      this.RemoveBody(this.m_bodyList.body)
    }
  };
  j.prototype.GetNext = function() {
    return this.m_next
  };
  j.prototype.GetWorld = function() {
    return this.m_world
  };
  j.prototype.GetBodyList = function() {
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
    var a = null, e = null, d = null, f = 0, g = null, h = null, j = null, k = 0, l = 0, o = 0, k = null;
    if(this.invSqr) {
      for(a = this.m_bodyList;a;a = a.nextBody) {
        e = a.body;
        d = e.GetWorldCenter();
        f = e.GetMass();
        for(g = this.m_bodyList;g != a;g = g.nextBody) {
          h = g.body, j = h.GetWorldCenter(), k = j.x - d.x, l = j.y - d.y, o = k * k + l * l, o < Number.MIN_VALUE || (k = new b(k, l), k.Multiply(this.G / o / Math.sqrt(o) * f * h.GetMass()), e.IsAwake() && e.ApplyForce(k, d), k.Multiply(-1), h.IsAwake() && h.ApplyForce(k, j))
        }
      }
    }else {
      for(a = this.m_bodyList;a;a = a.nextBody) {
        e = a.body;
        d = e.GetWorldCenter();
        f = e.GetMass();
        for(g = this.m_bodyList;g != a;g = g.nextBody) {
          h = g.body, j = h.GetWorldCenter(), k = j.x - d.x, l = j.y - d.y, o = k * k + l * l, o < Number.MIN_VALUE || (k = new b(k, l), k.Multiply(this.G / o * f * h.GetMass()), e.IsAwake() && e.ApplyForce(k, d), k.Multiply(-1), h.IsAwake() && h.ApplyForce(k, j))
        }
      }
    }
  };
  Box2D.inherit(o, Box2D.Dynamics.Controllers.b2Controller);
  o.prototype.__super = Box2D.Dynamics.Controllers.b2Controller.prototype;
  o.b2TensorDampingController = function() {
    Box2D.Dynamics.Controllers.b2Controller.b2Controller.apply(this, arguments);
    this.T = new a;
    this.maxTimestep = 0
  };
  o.prototype.SetAxisAligned = function(a, b) {
    a === void 0 && (a = 0);
    b === void 0 && (b = 0);
    this.T.col1.x = -a;
    this.T.col1.y = 0;
    this.T.col2.x = 0;
    this.T.col2.y = -b;
    this.maxTimestep = a > 0 || b > 0 ? 1 / Math.max(a, b) : 0
  };
  o.prototype.Step = function(a) {
    a = a.dt;
    if(!(a <= Number.MIN_VALUE)) {
      if(a > this.maxTimestep && this.maxTimestep > 0) {
        a = this.maxTimestep
      }
      for(var e = this.m_bodyList;e;e = e.nextBody) {
        var f = e.body;
        if(f.IsAwake()) {
          var g = f.GetWorldVector(d.MulMV(this.T, f.GetLocalVector(f.GetLinearVelocity())));
          f.SetLinearVelocity(new b(f.GetLinearVelocity().x + g.x * a, f.GetLinearVelocity().y + g.y * a))
        }
      }
    }
  }
})();
(function() {
  var a = Box2D.Common.b2Settings, d = Box2D.Common.Math.b2Mat22, b = Box2D.Common.Math.b2Mat33, f = Box2D.Common.Math.b2Math, e = Box2D.Common.Math.b2Vec2, g = Box2D.Common.Math.b2Vec3, h = Box2D.Dynamics.Joints.b2DistanceJoint, j = Box2D.Dynamics.Joints.b2DistanceJointDef, l = Box2D.Dynamics.Joints.b2FrictionJoint, k = Box2D.Dynamics.Joints.b2FrictionJointDef, o = Box2D.Dynamics.Joints.b2GearJoint, m = Box2D.Dynamics.Joints.b2GearJointDef, s = Box2D.Dynamics.Joints.b2Jacobian, q = Box2D.Dynamics.Joints.b2Joint, 
  w = Box2D.Dynamics.Joints.b2JointDef, I = Box2D.Dynamics.Joints.b2JointEdge, A = Box2D.Dynamics.Joints.b2LineJoint, y = Box2D.Dynamics.Joints.b2LineJointDef, x = Box2D.Dynamics.Joints.b2MouseJoint, F = Box2D.Dynamics.Joints.b2MouseJointDef, E = Box2D.Dynamics.Joints.b2PrismaticJoint, J = Box2D.Dynamics.Joints.b2PrismaticJointDef, n = Box2D.Dynamics.Joints.b2PulleyJoint, G = Box2D.Dynamics.Joints.b2PulleyJointDef, t = Box2D.Dynamics.Joints.b2RevoluteJoint, D = Box2D.Dynamics.Joints.b2RevoluteJointDef, 
  M = Box2D.Dynamics.Joints.b2WeldJoint, N = Box2D.Dynamics.Joints.b2WeldJointDef;
  Box2D.inherit(h, Box2D.Dynamics.Joints.b2Joint);
  h.prototype.__super = Box2D.Dynamics.Joints.b2Joint.prototype;
  h.b2DistanceJoint = function() {
    Box2D.Dynamics.Joints.b2Joint.b2Joint.apply(this, arguments);
    this.m_localAnchor1 = new e;
    this.m_localAnchor2 = new e;
    this.m_u = new e
  };
  h.prototype.GetAnchorA = function() {
    return this.m_bodyA.GetWorldPoint(this.m_localAnchor1)
  };
  h.prototype.GetAnchorB = function() {
    return this.m_bodyB.GetWorldPoint(this.m_localAnchor2)
  };
  h.prototype.GetReactionForce = function(a) {
    a === void 0 && (a = 0);
    return new e(a * this.m_impulse * this.m_u.x, a * this.m_impulse * this.m_u.y)
  };
  h.prototype.GetReactionTorque = function() {
    return 0
  };
  h.prototype.GetLength = function() {
    return this.m_length
  };
  h.prototype.SetLength = function(a) {
    a === void 0 && (a = 0);
    this.m_length = a
  };
  h.prototype.GetFrequency = function() {
    return this.m_frequencyHz
  };
  h.prototype.SetFrequency = function(a) {
    a === void 0 && (a = 0);
    this.m_frequencyHz = a
  };
  h.prototype.GetDampingRatio = function() {
    return this.m_dampingRatio
  };
  h.prototype.SetDampingRatio = function(a) {
    a === void 0 && (a = 0);
    this.m_dampingRatio = a
  };
  h.prototype.b2DistanceJoint = function(a) {
    this.__super.b2Joint.call(this, a);
    this.m_localAnchor1.SetV(a.localAnchorA);
    this.m_localAnchor2.SetV(a.localAnchorB);
    this.m_length = a.length;
    this.m_frequencyHz = a.frequencyHz;
    this.m_dampingRatio = a.dampingRatio;
    this.m_bias = this.m_gamma = this.m_impulse = 0
  };
  h.prototype.InitVelocityConstraints = function(b) {
    var e, d = 0, f = this.m_bodyA, g = this.m_bodyB;
    e = f.m_xf.R;
    var h = this.m_localAnchor1.x - f.m_sweep.localCenter.x, j = this.m_localAnchor1.y - f.m_sweep.localCenter.y, d = e.col1.x * h + e.col2.x * j, j = e.col1.y * h + e.col2.y * j, h = d;
    e = g.m_xf.R;
    var k = this.m_localAnchor2.x - g.m_sweep.localCenter.x, u = this.m_localAnchor2.y - g.m_sweep.localCenter.y, d = e.col1.x * k + e.col2.x * u, u = e.col1.y * k + e.col2.y * u, k = d;
    this.m_u.x = g.m_sweep.c.x + k - f.m_sweep.c.x - h;
    this.m_u.y = g.m_sweep.c.y + u - f.m_sweep.c.y - j;
    d = Math.sqrt(this.m_u.x * this.m_u.x + this.m_u.y * this.m_u.y);
    d > a.b2_linearSlop ? this.m_u.Multiply(1 / d) : this.m_u.SetZero();
    e = h * this.m_u.y - j * this.m_u.x;
    var l = k * this.m_u.y - u * this.m_u.x;
    e = f.m_invMass + f.m_invI * e * e + g.m_invMass + g.m_invI * l * l;
    this.m_mass = e != 0 ? 1 / e : 0;
    if(this.m_frequencyHz > 0) {
      d -= this.m_length;
      var l = 2 * Math.PI * this.m_frequencyHz, q = this.m_mass * l * l;
      this.m_gamma = b.dt * (2 * this.m_mass * this.m_dampingRatio * l + b.dt * q);
      this.m_gamma = this.m_gamma != 0 ? 1 / this.m_gamma : 0;
      this.m_bias = d * b.dt * q * this.m_gamma;
      this.m_mass = e + this.m_gamma;
      this.m_mass = this.m_mass != 0 ? 1 / this.m_mass : 0
    }
    b.warmStarting ? (this.m_impulse *= b.dtRatio, b = this.m_impulse * this.m_u.x, e = this.m_impulse * this.m_u.y, f.m_linearVelocity.x -= f.m_invMass * b, f.m_linearVelocity.y -= f.m_invMass * e, f.m_angularVelocity -= f.m_invI * (h * e - j * b), g.m_linearVelocity.x += g.m_invMass * b, g.m_linearVelocity.y += g.m_invMass * e, g.m_angularVelocity += g.m_invI * (k * e - u * b)) : this.m_impulse = 0
  };
  h.prototype.SolveVelocityConstraints = function() {
    var a, b = this.m_bodyA, e = this.m_bodyB;
    a = b.m_xf.R;
    var d = this.m_localAnchor1.x - b.m_sweep.localCenter.x, f = this.m_localAnchor1.y - b.m_sweep.localCenter.y, g = a.col1.x * d + a.col2.x * f, f = a.col1.y * d + a.col2.y * f, d = g;
    a = e.m_xf.R;
    var h = this.m_localAnchor2.x - e.m_sweep.localCenter.x, j = this.m_localAnchor2.y - e.m_sweep.localCenter.y, g = a.col1.x * h + a.col2.x * j, j = a.col1.y * h + a.col2.y * j, h = g, g = -this.m_mass * (this.m_u.x * (e.m_linearVelocity.x + -e.m_angularVelocity * j - (b.m_linearVelocity.x + -b.m_angularVelocity * f)) + this.m_u.y * (e.m_linearVelocity.y + e.m_angularVelocity * h - (b.m_linearVelocity.y + b.m_angularVelocity * d)) + this.m_bias + this.m_gamma * this.m_impulse);
    this.m_impulse += g;
    a = g * this.m_u.x;
    g *= this.m_u.y;
    b.m_linearVelocity.x -= b.m_invMass * a;
    b.m_linearVelocity.y -= b.m_invMass * g;
    b.m_angularVelocity -= b.m_invI * (d * g - f * a);
    e.m_linearVelocity.x += e.m_invMass * a;
    e.m_linearVelocity.y += e.m_invMass * g;
    e.m_angularVelocity += e.m_invI * (h * g - j * a)
  };
  h.prototype.SolvePositionConstraints = function() {
    var b;
    if(this.m_frequencyHz > 0) {
      return!0
    }
    var e = this.m_bodyA, d = this.m_bodyB;
    b = e.m_xf.R;
    var g = this.m_localAnchor1.x - e.m_sweep.localCenter.x, h = this.m_localAnchor1.y - e.m_sweep.localCenter.y, j = b.col1.x * g + b.col2.x * h, h = b.col1.y * g + b.col2.y * h, g = j;
    b = d.m_xf.R;
    var k = this.m_localAnchor2.x - d.m_sweep.localCenter.x, B = this.m_localAnchor2.y - d.m_sweep.localCenter.y, j = b.col1.x * k + b.col2.x * B, B = b.col1.y * k + b.col2.y * B, k = j, j = d.m_sweep.c.x + k - e.m_sweep.c.x - g, u = d.m_sweep.c.y + B - e.m_sweep.c.y - h;
    b = Math.sqrt(j * j + u * u);
    j /= b;
    u /= b;
    b -= this.m_length;
    b = f.Clamp(b, -a.b2_maxLinearCorrection, a.b2_maxLinearCorrection);
    var l = -this.m_mass * b;
    this.m_u.Set(j, u);
    j = l * this.m_u.x;
    u = l * this.m_u.y;
    e.m_sweep.c.x -= e.m_invMass * j;
    e.m_sweep.c.y -= e.m_invMass * u;
    e.m_sweep.a -= e.m_invI * (g * u - h * j);
    d.m_sweep.c.x += d.m_invMass * j;
    d.m_sweep.c.y += d.m_invMass * u;
    d.m_sweep.a += d.m_invI * (k * u - B * j);
    e.SynchronizeTransform();
    d.SynchronizeTransform();
    return f.Abs(b) < a.b2_linearSlop
  };
  Box2D.inherit(j, Box2D.Dynamics.Joints.b2JointDef);
  j.prototype.__super = Box2D.Dynamics.Joints.b2JointDef.prototype;
  j.b2DistanceJointDef = function() {
    Box2D.Dynamics.Joints.b2JointDef.b2JointDef.apply(this, arguments);
    this.localAnchorA = new e;
    this.localAnchorB = new e
  };
  j.prototype.b2DistanceJointDef = function() {
    this.__super.b2JointDef.call(this);
    this.type = q.e_distanceJoint;
    this.length = 1;
    this.dampingRatio = this.frequencyHz = 0
  };
  j.prototype.Initialize = function(a, b, e, d) {
    this.bodyA = a;
    this.bodyB = b;
    this.localAnchorA.SetV(this.bodyA.GetLocalPoint(e));
    this.localAnchorB.SetV(this.bodyB.GetLocalPoint(d));
    a = d.x - e.x;
    e = d.y - e.y;
    this.length = Math.sqrt(a * a + e * e);
    this.dampingRatio = this.frequencyHz = 0
  };
  Box2D.inherit(l, Box2D.Dynamics.Joints.b2Joint);
  l.prototype.__super = Box2D.Dynamics.Joints.b2Joint.prototype;
  l.b2FrictionJoint = function() {
    Box2D.Dynamics.Joints.b2Joint.b2Joint.apply(this, arguments);
    this.m_localAnchorA = new e;
    this.m_localAnchorB = new e;
    this.m_linearMass = new d;
    this.m_linearImpulse = new e
  };
  l.prototype.GetAnchorA = function() {
    return this.m_bodyA.GetWorldPoint(this.m_localAnchorA)
  };
  l.prototype.GetAnchorB = function() {
    return this.m_bodyB.GetWorldPoint(this.m_localAnchorB)
  };
  l.prototype.GetReactionForce = function(a) {
    a === void 0 && (a = 0);
    return new e(a * this.m_linearImpulse.x, a * this.m_linearImpulse.y)
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
    var b, e = 0, f = this.m_bodyA, g = this.m_bodyB;
    b = f.m_xf.R;
    var h = this.m_localAnchorA.x - f.m_sweep.localCenter.x, j = this.m_localAnchorA.y - f.m_sweep.localCenter.y, e = b.col1.x * h + b.col2.x * j, j = b.col1.y * h + b.col2.y * j, h = e;
    b = g.m_xf.R;
    var k = this.m_localAnchorB.x - g.m_sweep.localCenter.x, u = this.m_localAnchorB.y - g.m_sweep.localCenter.y, e = b.col1.x * k + b.col2.x * u, u = b.col1.y * k + b.col2.y * u, k = e;
    b = f.m_invMass;
    var e = g.m_invMass, l = f.m_invI, q = g.m_invI, m = new d;
    m.col1.x = b + e;
    m.col2.x = 0;
    m.col1.y = 0;
    m.col2.y = b + e;
    m.col1.x += l * j * j;
    m.col2.x += -l * h * j;
    m.col1.y += -l * h * j;
    m.col2.y += l * h * h;
    m.col1.x += q * u * u;
    m.col2.x += -q * k * u;
    m.col1.y += -q * k * u;
    m.col2.y += q * k * k;
    m.GetInverse(this.m_linearMass);
    this.m_angularMass = l + q;
    if(this.m_angularMass > 0) {
      this.m_angularMass = 1 / this.m_angularMass
    }
    a.warmStarting ? (this.m_linearImpulse.x *= a.dtRatio, this.m_linearImpulse.y *= a.dtRatio, this.m_angularImpulse *= a.dtRatio, a = this.m_linearImpulse, f.m_linearVelocity.x -= b * a.x, f.m_linearVelocity.y -= b * a.y, f.m_angularVelocity -= l * (h * a.y - j * a.x + this.m_angularImpulse), g.m_linearVelocity.x += e * a.x, g.m_linearVelocity.y += e * a.y, g.m_angularVelocity += q * (k * a.y - u * a.x + this.m_angularImpulse)) : (this.m_linearImpulse.SetZero(), this.m_angularImpulse = 0)
  };
  l.prototype.SolveVelocityConstraints = function(a) {
    var b, d = 0, g = this.m_bodyA, h = this.m_bodyB, j = g.m_linearVelocity, k = g.m_angularVelocity, l = h.m_linearVelocity, u = h.m_angularVelocity, q = g.m_invMass, m = h.m_invMass, n = g.m_invI, o = h.m_invI;
    b = g.m_xf.R;
    var s = this.m_localAnchorA.x - g.m_sweep.localCenter.x, z = this.m_localAnchorA.y - g.m_sweep.localCenter.y, d = b.col1.x * s + b.col2.x * z, z = b.col1.y * s + b.col2.y * z, s = d;
    b = h.m_xf.R;
    var w = this.m_localAnchorB.x - h.m_sweep.localCenter.x, t = this.m_localAnchorB.y - h.m_sweep.localCenter.y, d = b.col1.x * w + b.col2.x * t, t = b.col1.y * w + b.col2.y * t, w = d;
    b = 0;
    var d = -this.m_angularMass * (u - k), y = this.m_angularImpulse;
    b = a.dt * this.m_maxTorque;
    this.m_angularImpulse = f.Clamp(this.m_angularImpulse + d, -b, b);
    d = this.m_angularImpulse - y;
    k -= n * d;
    u += o * d;
    b = f.MulMV(this.m_linearMass, new e(-(l.x - u * t - j.x + k * z), -(l.y + u * w - j.y - k * s)));
    d = this.m_linearImpulse.Copy();
    this.m_linearImpulse.Add(b);
    b = a.dt * this.m_maxForce;
    this.m_linearImpulse.LengthSquared() > b * b && (this.m_linearImpulse.Normalize(), this.m_linearImpulse.Multiply(b));
    b = f.SubtractVV(this.m_linearImpulse, d);
    j.x -= q * b.x;
    j.y -= q * b.y;
    k -= n * (s * b.y - z * b.x);
    l.x += m * b.x;
    l.y += m * b.y;
    u += o * (w * b.y - t * b.x);
    g.m_angularVelocity = k;
    h.m_angularVelocity = u
  };
  l.prototype.SolvePositionConstraints = function() {
    return!0
  };
  Box2D.inherit(k, Box2D.Dynamics.Joints.b2JointDef);
  k.prototype.__super = Box2D.Dynamics.Joints.b2JointDef.prototype;
  k.b2FrictionJointDef = function() {
    Box2D.Dynamics.Joints.b2JointDef.b2JointDef.apply(this, arguments);
    this.localAnchorA = new e;
    this.localAnchorB = new e
  };
  k.prototype.b2FrictionJointDef = function() {
    this.__super.b2JointDef.call(this);
    this.type = q.e_frictionJoint;
    this.maxTorque = this.maxForce = 0
  };
  k.prototype.Initialize = function(a, b, e) {
    this.bodyA = a;
    this.bodyB = b;
    this.localAnchorA.SetV(this.bodyA.GetLocalPoint(e));
    this.localAnchorB.SetV(this.bodyB.GetLocalPoint(e))
  };
  Box2D.inherit(o, Box2D.Dynamics.Joints.b2Joint);
  o.prototype.__super = Box2D.Dynamics.Joints.b2Joint.prototype;
  o.b2GearJoint = function() {
    Box2D.Dynamics.Joints.b2Joint.b2Joint.apply(this, arguments);
    this.m_groundAnchor1 = new e;
    this.m_groundAnchor2 = new e;
    this.m_localAnchor1 = new e;
    this.m_localAnchor2 = new e;
    this.m_J = new s
  };
  o.prototype.GetAnchorA = function() {
    return this.m_bodyA.GetWorldPoint(this.m_localAnchor1)
  };
  o.prototype.GetAnchorB = function() {
    return this.m_bodyB.GetWorldPoint(this.m_localAnchor2)
  };
  o.prototype.GetReactionForce = function(a) {
    a === void 0 && (a = 0);
    return new e(a * this.m_impulse * this.m_J.linearB.x, a * this.m_impulse * this.m_J.linearB.y)
  };
  o.prototype.GetReactionTorque = function(a) {
    a === void 0 && (a = 0);
    var b = this.m_bodyB.m_xf.R, e = this.m_localAnchor1.x - this.m_bodyB.m_sweep.localCenter.x, d = this.m_localAnchor1.y - this.m_bodyB.m_sweep.localCenter.y, f = b.col1.x * e + b.col2.x * d, d = b.col1.y * e + b.col2.y * d;
    return a * (this.m_impulse * this.m_J.angularB - f * this.m_impulse * this.m_J.linearB.y + d * this.m_impulse * this.m_J.linearB.x)
  };
  o.prototype.GetRatio = function() {
    return this.m_ratio
  };
  o.prototype.SetRatio = function(a) {
    a === void 0 && (a = 0);
    this.m_ratio = a
  };
  o.prototype.b2GearJoint = function(a) {
    this.__super.b2Joint.call(this, a);
    var b = a.joint1.m_type, e = a.joint2.m_type;
    this.m_prismatic2 = this.m_revolute2 = this.m_prismatic1 = this.m_revolute1 = null;
    var d = 0, f = 0;
    this.m_ground1 = a.joint1.GetBodyA();
    this.m_bodyA = a.joint1.GetBodyB();
    b == q.e_revoluteJoint ? (this.m_revolute1 = a.joint1 instanceof t ? a.joint1 : null, this.m_groundAnchor1.SetV(this.m_revolute1.m_localAnchor1), this.m_localAnchor1.SetV(this.m_revolute1.m_localAnchor2), d = this.m_revolute1.GetJointAngle()) : (this.m_prismatic1 = a.joint1 instanceof E ? a.joint1 : null, this.m_groundAnchor1.SetV(this.m_prismatic1.m_localAnchor1), this.m_localAnchor1.SetV(this.m_prismatic1.m_localAnchor2), d = this.m_prismatic1.GetJointTranslation());
    this.m_ground2 = a.joint2.GetBodyA();
    this.m_bodyB = a.joint2.GetBodyB();
    e == q.e_revoluteJoint ? (this.m_revolute2 = a.joint2 instanceof t ? a.joint2 : null, this.m_groundAnchor2.SetV(this.m_revolute2.m_localAnchor1), this.m_localAnchor2.SetV(this.m_revolute2.m_localAnchor2), f = this.m_revolute2.GetJointAngle()) : (this.m_prismatic2 = a.joint2 instanceof E ? a.joint2 : null, this.m_groundAnchor2.SetV(this.m_prismatic2.m_localAnchor1), this.m_localAnchor2.SetV(this.m_prismatic2.m_localAnchor2), f = this.m_prismatic2.GetJointTranslation());
    this.m_ratio = a.ratio;
    this.m_constant = d + this.m_ratio * f;
    this.m_impulse = 0
  };
  o.prototype.InitVelocityConstraints = function(a) {
    var b = this.m_ground1, e = this.m_ground2, d = this.m_bodyA, f = this.m_bodyB, g = 0, h = 0, j = 0, k = 0, l = j = 0, q = 0;
    this.m_J.SetZero();
    this.m_revolute1 ? (this.m_J.angularA = -1, q += d.m_invI) : (b = b.m_xf.R, h = this.m_prismatic1.m_localXAxis1, g = b.col1.x * h.x + b.col2.x * h.y, h = b.col1.y * h.x + b.col2.y * h.y, b = d.m_xf.R, j = this.m_localAnchor1.x - d.m_sweep.localCenter.x, k = this.m_localAnchor1.y - d.m_sweep.localCenter.y, l = b.col1.x * j + b.col2.x * k, k = b.col1.y * j + b.col2.y * k, j = l * h - k * g, this.m_J.linearA.Set(-g, -h), this.m_J.angularA = -j, q += d.m_invMass + d.m_invI * j * j);
    this.m_revolute2 ? (this.m_J.angularB = -this.m_ratio, q += this.m_ratio * this.m_ratio * f.m_invI) : (b = e.m_xf.R, h = this.m_prismatic2.m_localXAxis1, g = b.col1.x * h.x + b.col2.x * h.y, h = b.col1.y * h.x + b.col2.y * h.y, b = f.m_xf.R, j = this.m_localAnchor2.x - f.m_sweep.localCenter.x, k = this.m_localAnchor2.y - f.m_sweep.localCenter.y, l = b.col1.x * j + b.col2.x * k, k = b.col1.y * j + b.col2.y * k, j = l * h - k * g, this.m_J.linearB.Set(-this.m_ratio * g, -this.m_ratio * h), this.m_J.angularB = 
    -this.m_ratio * j, q += this.m_ratio * this.m_ratio * (f.m_invMass + f.m_invI * j * j));
    this.m_mass = q > 0 ? 1 / q : 0;
    a.warmStarting ? (d.m_linearVelocity.x += d.m_invMass * this.m_impulse * this.m_J.linearA.x, d.m_linearVelocity.y += d.m_invMass * this.m_impulse * this.m_J.linearA.y, d.m_angularVelocity += d.m_invI * this.m_impulse * this.m_J.angularA, f.m_linearVelocity.x += f.m_invMass * this.m_impulse * this.m_J.linearB.x, f.m_linearVelocity.y += f.m_invMass * this.m_impulse * this.m_J.linearB.y, f.m_angularVelocity += f.m_invI * this.m_impulse * this.m_J.angularB) : this.m_impulse = 0
  };
  o.prototype.SolveVelocityConstraints = function() {
    var a = this.m_bodyA, b = this.m_bodyB, e = -this.m_mass * this.m_J.Compute(a.m_linearVelocity, a.m_angularVelocity, b.m_linearVelocity, b.m_angularVelocity);
    this.m_impulse += e;
    a.m_linearVelocity.x += a.m_invMass * e * this.m_J.linearA.x;
    a.m_linearVelocity.y += a.m_invMass * e * this.m_J.linearA.y;
    a.m_angularVelocity += a.m_invI * e * this.m_J.angularA;
    b.m_linearVelocity.x += b.m_invMass * e * this.m_J.linearB.x;
    b.m_linearVelocity.y += b.m_invMass * e * this.m_J.linearB.y;
    b.m_angularVelocity += b.m_invI * e * this.m_J.angularB
  };
  o.prototype.SolvePositionConstraints = function() {
    var b = this.m_bodyA, e = this.m_bodyB, d = 0, f = 0, d = this.m_revolute1 ? this.m_revolute1.GetJointAngle() : this.m_prismatic1.GetJointTranslation(), f = this.m_revolute2 ? this.m_revolute2.GetJointAngle() : this.m_prismatic2.GetJointTranslation(), d = -this.m_mass * (this.m_constant - (d + this.m_ratio * f));
    b.m_sweep.c.x += b.m_invMass * d * this.m_J.linearA.x;
    b.m_sweep.c.y += b.m_invMass * d * this.m_J.linearA.y;
    b.m_sweep.a += b.m_invI * d * this.m_J.angularA;
    e.m_sweep.c.x += e.m_invMass * d * this.m_J.linearB.x;
    e.m_sweep.c.y += e.m_invMass * d * this.m_J.linearB.y;
    e.m_sweep.a += e.m_invI * d * this.m_J.angularB;
    b.SynchronizeTransform();
    e.SynchronizeTransform();
    return 0 < a.b2_linearSlop
  };
  Box2D.inherit(m, Box2D.Dynamics.Joints.b2JointDef);
  m.prototype.__super = Box2D.Dynamics.Joints.b2JointDef.prototype;
  m.b2GearJointDef = function() {
    Box2D.Dynamics.Joints.b2JointDef.b2JointDef.apply(this, arguments)
  };
  m.prototype.b2GearJointDef = function() {
    this.__super.b2JointDef.call(this);
    this.type = q.e_gearJoint;
    this.joint2 = this.joint1 = null;
    this.ratio = 1
  };
  s.b2Jacobian = function() {
    this.linearA = new e;
    this.linearB = new e
  };
  s.prototype.SetZero = function() {
    this.linearA.SetZero();
    this.angularA = 0;
    this.linearB.SetZero();
    this.angularB = 0
  };
  s.prototype.Set = function(a, b, e, d) {
    b === void 0 && (b = 0);
    d === void 0 && (d = 0);
    this.linearA.SetV(a);
    this.angularA = b;
    this.linearB.SetV(e);
    this.angularB = d
  };
  s.prototype.Compute = function(a, b, e, d) {
    b === void 0 && (b = 0);
    d === void 0 && (d = 0);
    return this.linearA.x * a.x + this.linearA.y * a.y + this.angularA * b + (this.linearB.x * e.x + this.linearB.y * e.y) + this.angularB * d
  };
  q.b2Joint = function() {
    this.m_edgeA = new I;
    this.m_edgeB = new I;
    this.m_localCenterA = new e;
    this.m_localCenterB = new e
  };
  q.prototype.GetType = function() {
    return this.m_type
  };
  q.prototype.GetAnchorA = function() {
    return null
  };
  q.prototype.GetAnchorB = function() {
    return null
  };
  q.prototype.GetReactionForce = function() {
    return null
  };
  q.prototype.GetReactionTorque = function() {
    return 0
  };
  q.prototype.GetBodyA = function() {
    return this.m_bodyA
  };
  q.prototype.GetBodyB = function() {
    return this.m_bodyB
  };
  q.prototype.GetNext = function() {
    return this.m_next
  };
  q.prototype.GetUserData = function() {
    return this.m_userData
  };
  q.prototype.SetUserData = function(a) {
    this.m_userData = a
  };
  q.prototype.IsActive = function() {
    return this.m_bodyA.IsActive() && this.m_bodyB.IsActive()
  };
  q.Create = function(a) {
    var b = null;
    switch(a.type) {
      case q.e_distanceJoint:
        b = new h(a instanceof j ? a : null);
        break;
      case q.e_mouseJoint:
        b = new x(a instanceof F ? a : null);
        break;
      case q.e_prismaticJoint:
        b = new E(a instanceof J ? a : null);
        break;
      case q.e_revoluteJoint:
        b = new t(a instanceof D ? a : null);
        break;
      case q.e_pulleyJoint:
        b = new n(a instanceof G ? a : null);
        break;
      case q.e_gearJoint:
        b = new o(a instanceof m ? a : null);
        break;
      case q.e_lineJoint:
        b = new A(a instanceof y ? a : null);
        break;
      case q.e_weldJoint:
        b = new M(a instanceof N ? a : null);
        break;
      case q.e_frictionJoint:
        b = new l(a instanceof k ? a : null)
    }
    return b
  };
  q.Destroy = function() {
  };
  q.prototype.b2Joint = function(b) {
    a.b2Assert(b.bodyA != b.bodyB);
    this.m_type = b.type;
    this.m_next = this.m_prev = null;
    this.m_bodyA = b.bodyA;
    this.m_bodyB = b.bodyB;
    this.m_collideConnected = b.collideConnected;
    this.m_userData = b.userData
  };
  q.prototype.InitVelocityConstraints = function() {
  };
  q.prototype.SolveVelocityConstraints = function() {
  };
  q.prototype.FinalizeVelocityConstraints = function() {
  };
  q.prototype.SolvePositionConstraints = function() {
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
    this.type = q.e_unknownJoint;
    this.bodyB = this.bodyA = this.userData = null;
    this.collideConnected = !1
  };
  I.b2JointEdge = function() {
  };
  Box2D.inherit(A, Box2D.Dynamics.Joints.b2Joint);
  A.prototype.__super = Box2D.Dynamics.Joints.b2Joint.prototype;
  A.b2LineJoint = function() {
    Box2D.Dynamics.Joints.b2Joint.b2Joint.apply(this, arguments);
    this.m_localAnchor1 = new e;
    this.m_localAnchor2 = new e;
    this.m_localXAxis1 = new e;
    this.m_localYAxis1 = new e;
    this.m_axis = new e;
    this.m_perp = new e;
    this.m_K = new d;
    this.m_impulse = new e
  };
  A.prototype.GetAnchorA = function() {
    return this.m_bodyA.GetWorldPoint(this.m_localAnchor1)
  };
  A.prototype.GetAnchorB = function() {
    return this.m_bodyB.GetWorldPoint(this.m_localAnchor2)
  };
  A.prototype.GetReactionForce = function(a) {
    a === void 0 && (a = 0);
    return new e(a * (this.m_impulse.x * this.m_perp.x + (this.m_motorImpulse + this.m_impulse.y) * this.m_axis.x), a * (this.m_impulse.x * this.m_perp.y + (this.m_motorImpulse + this.m_impulse.y) * this.m_axis.y))
  };
  A.prototype.GetReactionTorque = function(a) {
    a === void 0 && (a = 0);
    return a * this.m_impulse.y
  };
  A.prototype.GetJointTranslation = function() {
    var a = this.m_bodyA, b = this.m_bodyB, e = a.GetWorldPoint(this.m_localAnchor1), d = b.GetWorldPoint(this.m_localAnchor2), b = d.x - e.x, e = d.y - e.y, a = a.GetWorldVector(this.m_localXAxis1);
    return a.x * b + a.y * e
  };
  A.prototype.GetJointSpeed = function() {
    var a = this.m_bodyA, b = this.m_bodyB, e;
    e = a.m_xf.R;
    var d = this.m_localAnchor1.x - a.m_sweep.localCenter.x, f = this.m_localAnchor1.y - a.m_sweep.localCenter.y, g = e.col1.x * d + e.col2.x * f, f = e.col1.y * d + e.col2.y * f, d = g;
    e = b.m_xf.R;
    var h = this.m_localAnchor2.x - b.m_sweep.localCenter.x, j = this.m_localAnchor2.y - b.m_sweep.localCenter.y, g = e.col1.x * h + e.col2.x * j, j = e.col1.y * h + e.col2.y * j, h = g;
    e = b.m_sweep.c.x + h - (a.m_sweep.c.x + d);
    var g = b.m_sweep.c.y + j - (a.m_sweep.c.y + f), k = a.GetWorldVector(this.m_localXAxis1), l = a.m_linearVelocity, q = b.m_linearVelocity, a = a.m_angularVelocity, b = b.m_angularVelocity;
    return e * -a * k.y + g * a * k.x + (k.x * (q.x + -b * j - l.x - -a * f) + k.y * (q.y + b * h - l.y - a * d))
  };
  A.prototype.IsLimitEnabled = function() {
    return this.m_enableLimit
  };
  A.prototype.EnableLimit = function(a) {
    this.m_bodyA.SetAwake(!0);
    this.m_bodyB.SetAwake(!0);
    this.m_enableLimit = a
  };
  A.prototype.GetLowerLimit = function() {
    return this.m_lowerTranslation
  };
  A.prototype.GetUpperLimit = function() {
    return this.m_upperTranslation
  };
  A.prototype.SetLimits = function(a, b) {
    a === void 0 && (a = 0);
    b === void 0 && (b = 0);
    this.m_bodyA.SetAwake(!0);
    this.m_bodyB.SetAwake(!0);
    this.m_lowerTranslation = a;
    this.m_upperTranslation = b
  };
  A.prototype.IsMotorEnabled = function() {
    return this.m_enableMotor
  };
  A.prototype.EnableMotor = function(a) {
    this.m_bodyA.SetAwake(!0);
    this.m_bodyB.SetAwake(!0);
    this.m_enableMotor = a
  };
  A.prototype.SetMotorSpeed = function(a) {
    a === void 0 && (a = 0);
    this.m_bodyA.SetAwake(!0);
    this.m_bodyB.SetAwake(!0);
    this.m_motorSpeed = a
  };
  A.prototype.GetMotorSpeed = function() {
    return this.m_motorSpeed
  };
  A.prototype.SetMaxMotorForce = function(a) {
    a === void 0 && (a = 0);
    this.m_bodyA.SetAwake(!0);
    this.m_bodyB.SetAwake(!0);
    this.m_maxMotorForce = a
  };
  A.prototype.GetMaxMotorForce = function() {
    return this.m_maxMotorForce
  };
  A.prototype.GetMotorForce = function() {
    return this.m_motorImpulse
  };
  A.prototype.b2LineJoint = function(a) {
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
    this.m_limitState = q.e_inactiveLimit;
    this.m_axis.SetZero();
    this.m_perp.SetZero()
  };
  A.prototype.InitVelocityConstraints = function(b) {
    var e = this.m_bodyA, d = this.m_bodyB, g, h = 0;
    this.m_localCenterA.SetV(e.GetLocalCenter());
    this.m_localCenterB.SetV(d.GetLocalCenter());
    var j = e.GetTransform();
    d.GetTransform();
    g = e.m_xf.R;
    var k = this.m_localAnchor1.x - this.m_localCenterA.x, l = this.m_localAnchor1.y - this.m_localCenterA.y, h = g.col1.x * k + g.col2.x * l, l = g.col1.y * k + g.col2.y * l, k = h;
    g = d.m_xf.R;
    var u = this.m_localAnchor2.x - this.m_localCenterB.x, m = this.m_localAnchor2.y - this.m_localCenterB.y, h = g.col1.x * u + g.col2.x * m, m = g.col1.y * u + g.col2.y * m, u = h;
    g = d.m_sweep.c.x + u - e.m_sweep.c.x - k;
    h = d.m_sweep.c.y + m - e.m_sweep.c.y - l;
    this.m_invMassA = e.m_invMass;
    this.m_invMassB = d.m_invMass;
    this.m_invIA = e.m_invI;
    this.m_invIB = d.m_invI;
    this.m_axis.SetV(f.MulMV(j.R, this.m_localXAxis1));
    this.m_a1 = (g + k) * this.m_axis.y - (h + l) * this.m_axis.x;
    this.m_a2 = u * this.m_axis.y - m * this.m_axis.x;
    this.m_motorMass = this.m_invMassA + this.m_invMassB + this.m_invIA * this.m_a1 * this.m_a1 + this.m_invIB * this.m_a2 * this.m_a2;
    this.m_motorMass = this.m_motorMass > Number.MIN_VALUE ? 1 / this.m_motorMass : 0;
    this.m_perp.SetV(f.MulMV(j.R, this.m_localYAxis1));
    this.m_s1 = (g + k) * this.m_perp.y - (h + l) * this.m_perp.x;
    this.m_s2 = u * this.m_perp.y - m * this.m_perp.x;
    j = this.m_invMassA;
    k = this.m_invMassB;
    l = this.m_invIA;
    u = this.m_invIB;
    this.m_K.col1.x = j + k + l * this.m_s1 * this.m_s1 + u * this.m_s2 * this.m_s2;
    this.m_K.col1.y = l * this.m_s1 * this.m_a1 + u * this.m_s2 * this.m_a2;
    this.m_K.col2.x = this.m_K.col1.y;
    this.m_K.col2.y = j + k + l * this.m_a1 * this.m_a1 + u * this.m_a2 * this.m_a2;
    if(this.m_enableLimit) {
      if(g = this.m_axis.x * g + this.m_axis.y * h, f.Abs(this.m_upperTranslation - this.m_lowerTranslation) < 2 * a.b2_linearSlop) {
        this.m_limitState = q.e_equalLimits
      }else {
        if(g <= this.m_lowerTranslation) {
          if(this.m_limitState != q.e_atLowerLimit) {
            this.m_limitState = q.e_atLowerLimit, this.m_impulse.y = 0
          }
        }else {
          if(g >= this.m_upperTranslation) {
            if(this.m_limitState != q.e_atUpperLimit) {
              this.m_limitState = q.e_atUpperLimit, this.m_impulse.y = 0
            }
          }else {
            this.m_limitState = q.e_inactiveLimit, this.m_impulse.y = 0
          }
        }
      }
    }else {
      this.m_limitState = q.e_inactiveLimit
    }
    if(this.m_enableMotor == !1) {
      this.m_motorImpulse = 0
    }
    b.warmStarting ? (this.m_impulse.x *= b.dtRatio, this.m_impulse.y *= b.dtRatio, this.m_motorImpulse *= b.dtRatio, b = this.m_impulse.x * this.m_perp.x + (this.m_motorImpulse + this.m_impulse.y) * this.m_axis.x, g = this.m_impulse.x * this.m_perp.y + (this.m_motorImpulse + this.m_impulse.y) * this.m_axis.y, h = this.m_impulse.x * this.m_s1 + (this.m_motorImpulse + this.m_impulse.y) * this.m_a1, j = this.m_impulse.x * this.m_s2 + (this.m_motorImpulse + this.m_impulse.y) * this.m_a2, e.m_linearVelocity.x -= 
    this.m_invMassA * b, e.m_linearVelocity.y -= this.m_invMassA * g, e.m_angularVelocity -= this.m_invIA * h, d.m_linearVelocity.x += this.m_invMassB * b, d.m_linearVelocity.y += this.m_invMassB * g, d.m_angularVelocity += this.m_invIB * j) : (this.m_impulse.SetZero(), this.m_motorImpulse = 0)
  };
  A.prototype.SolveVelocityConstraints = function(a) {
    var b = this.m_bodyA, d = this.m_bodyB, g = b.m_linearVelocity, h = b.m_angularVelocity, j = d.m_linearVelocity, k = d.m_angularVelocity, l = 0, u = 0, m = 0, n = 0;
    if(this.m_enableMotor && this.m_limitState != q.e_equalLimits) {
      n = this.m_motorMass * (this.m_motorSpeed - (this.m_axis.x * (j.x - g.x) + this.m_axis.y * (j.y - g.y) + this.m_a2 * k - this.m_a1 * h)), l = this.m_motorImpulse, u = a.dt * this.m_maxMotorForce, this.m_motorImpulse = f.Clamp(this.m_motorImpulse + n, -u, u), n = this.m_motorImpulse - l, l = n * this.m_axis.x, u = n * this.m_axis.y, m = n * this.m_a1, n *= this.m_a2, g.x -= this.m_invMassA * l, g.y -= this.m_invMassA * u, h -= this.m_invIA * m, j.x += this.m_invMassB * l, j.y += this.m_invMassB * 
      u, k += this.m_invIB * n
    }
    u = this.m_perp.x * (j.x - g.x) + this.m_perp.y * (j.y - g.y) + this.m_s2 * k - this.m_s1 * h;
    if(this.m_enableLimit && this.m_limitState != q.e_inactiveLimit) {
      m = this.m_axis.x * (j.x - g.x) + this.m_axis.y * (j.y - g.y) + this.m_a2 * k - this.m_a1 * h;
      l = this.m_impulse.Copy();
      a = this.m_K.Solve(new e, -u, -m);
      this.m_impulse.Add(a);
      if(this.m_limitState == q.e_atLowerLimit) {
        this.m_impulse.y = f.Max(this.m_impulse.y, 0)
      }else {
        if(this.m_limitState == q.e_atUpperLimit) {
          this.m_impulse.y = f.Min(this.m_impulse.y, 0)
        }
      }
      u = -u - (this.m_impulse.y - l.y) * this.m_K.col2.x;
      m = 0;
      m = this.m_K.col1.x != 0 ? u / this.m_K.col1.x + l.x : l.x;
      this.m_impulse.x = m;
      a.x = this.m_impulse.x - l.x;
      a.y = this.m_impulse.y - l.y;
      l = a.x * this.m_perp.x + a.y * this.m_axis.x;
      u = a.x * this.m_perp.y + a.y * this.m_axis.y;
      m = a.x * this.m_s1 + a.y * this.m_a1;
      n = a.x * this.m_s2 + a.y * this.m_a2
    }else {
      a = 0, a = this.m_K.col1.x != 0 ? -u / this.m_K.col1.x : 0, this.m_impulse.x += a, l = a * this.m_perp.x, u = a * this.m_perp.y, m = a * this.m_s1, n = a * this.m_s2
    }
    g.x -= this.m_invMassA * l;
    g.y -= this.m_invMassA * u;
    h -= this.m_invIA * m;
    j.x += this.m_invMassB * l;
    j.y += this.m_invMassB * u;
    k += this.m_invIB * n;
    b.m_linearVelocity.SetV(g);
    b.m_angularVelocity = h;
    d.m_linearVelocity.SetV(j);
    d.m_angularVelocity = k
  };
  A.prototype.SolvePositionConstraints = function() {
    var b = this.m_bodyA, g = this.m_bodyB, h = b.m_sweep.c, j = b.m_sweep.a, k = g.m_sweep.c, l = g.m_sweep.a, q, m = 0, u = 0, n = 0, o = 0, s = q = 0, w = 0, u = !1, t = 0, z = d.FromAngle(j), n = d.FromAngle(l);
    q = z;
    var w = this.m_localAnchor1.x - this.m_localCenterA.x, y = this.m_localAnchor1.y - this.m_localCenterA.y, m = q.col1.x * w + q.col2.x * y, y = q.col1.y * w + q.col2.y * y, w = m;
    q = n;
    n = this.m_localAnchor2.x - this.m_localCenterB.x;
    o = this.m_localAnchor2.y - this.m_localCenterB.y;
    m = q.col1.x * n + q.col2.x * o;
    o = q.col1.y * n + q.col2.y * o;
    n = m;
    q = k.x + n - h.x - w;
    m = k.y + o - h.y - y;
    if(this.m_enableLimit) {
      this.m_axis = f.MulMV(z, this.m_localXAxis1);
      this.m_a1 = (q + w) * this.m_axis.y - (m + y) * this.m_axis.x;
      this.m_a2 = n * this.m_axis.y - o * this.m_axis.x;
      var x = this.m_axis.x * q + this.m_axis.y * m;
      f.Abs(this.m_upperTranslation - this.m_lowerTranslation) < 2 * a.b2_linearSlop ? (t = f.Clamp(x, -a.b2_maxLinearCorrection, a.b2_maxLinearCorrection), s = f.Abs(x), u = !0) : x <= this.m_lowerTranslation ? (t = f.Clamp(x - this.m_lowerTranslation + a.b2_linearSlop, -a.b2_maxLinearCorrection, 0), s = this.m_lowerTranslation - x, u = !0) : x >= this.m_upperTranslation && (t = f.Clamp(x - this.m_upperTranslation + a.b2_linearSlop, 0, a.b2_maxLinearCorrection), s = x - this.m_upperTranslation, 
      u = !0)
    }
    this.m_perp = f.MulMV(z, this.m_localYAxis1);
    this.m_s1 = (q + w) * this.m_perp.y - (m + y) * this.m_perp.x;
    this.m_s2 = n * this.m_perp.y - o * this.m_perp.x;
    z = new e;
    y = this.m_perp.x * q + this.m_perp.y * m;
    s = f.Max(s, f.Abs(y));
    w = 0;
    u ? (u = this.m_invMassA, n = this.m_invMassB, o = this.m_invIA, q = this.m_invIB, this.m_K.col1.x = u + n + o * this.m_s1 * this.m_s1 + q * this.m_s2 * this.m_s2, this.m_K.col1.y = o * this.m_s1 * this.m_a1 + q * this.m_s2 * this.m_a2, this.m_K.col2.x = this.m_K.col1.y, this.m_K.col2.y = u + n + o * this.m_a1 * this.m_a1 + q * this.m_a2 * this.m_a2, this.m_K.Solve(z, -y, -t)) : (u = this.m_invMassA, n = this.m_invMassB, o = this.m_invIA, q = this.m_invIB, t = u + n + o * this.m_s1 * this.m_s1 + 
    q * this.m_s2 * this.m_s2, u = 0, z.x = t != 0 ? -y / t : 0, z.y = 0);
    t = z.x * this.m_perp.x + z.y * this.m_axis.x;
    u = z.x * this.m_perp.y + z.y * this.m_axis.y;
    y = z.x * this.m_s1 + z.y * this.m_a1;
    z = z.x * this.m_s2 + z.y * this.m_a2;
    h.x -= this.m_invMassA * t;
    h.y -= this.m_invMassA * u;
    j -= this.m_invIA * y;
    k.x += this.m_invMassB * t;
    k.y += this.m_invMassB * u;
    l += this.m_invIB * z;
    b.m_sweep.a = j;
    g.m_sweep.a = l;
    b.SynchronizeTransform();
    g.SynchronizeTransform();
    return s <= a.b2_linearSlop && w <= a.b2_angularSlop
  };
  Box2D.inherit(y, Box2D.Dynamics.Joints.b2JointDef);
  y.prototype.__super = Box2D.Dynamics.Joints.b2JointDef.prototype;
  y.b2LineJointDef = function() {
    Box2D.Dynamics.Joints.b2JointDef.b2JointDef.apply(this, arguments);
    this.localAnchorA = new e;
    this.localAnchorB = new e;
    this.localAxisA = new e
  };
  y.prototype.b2LineJointDef = function() {
    this.__super.b2JointDef.call(this);
    this.type = q.e_lineJoint;
    this.localAxisA.Set(1, 0);
    this.enableLimit = !1;
    this.upperTranslation = this.lowerTranslation = 0;
    this.enableMotor = !1;
    this.motorSpeed = this.maxMotorForce = 0
  };
  y.prototype.Initialize = function(a, b, e, d) {
    this.bodyA = a;
    this.bodyB = b;
    this.localAnchorA = this.bodyA.GetLocalPoint(e);
    this.localAnchorB = this.bodyB.GetLocalPoint(e);
    this.localAxisA = this.bodyA.GetLocalVector(d)
  };
  Box2D.inherit(x, Box2D.Dynamics.Joints.b2Joint);
  x.prototype.__super = Box2D.Dynamics.Joints.b2Joint.prototype;
  x.b2MouseJoint = function() {
    Box2D.Dynamics.Joints.b2Joint.b2Joint.apply(this, arguments);
    this.K = new d;
    this.K1 = new d;
    this.K2 = new d;
    this.m_localAnchor = new e;
    this.m_target = new e;
    this.m_impulse = new e;
    this.m_mass = new d;
    this.m_C = new e
  };
  x.prototype.GetAnchorA = function() {
    return this.m_target
  };
  x.prototype.GetAnchorB = function() {
    return this.m_bodyB.GetWorldPoint(this.m_localAnchor)
  };
  x.prototype.GetReactionForce = function(a) {
    a === void 0 && (a = 0);
    return new e(a * this.m_impulse.x, a * this.m_impulse.y)
  };
  x.prototype.GetReactionTorque = function() {
    return 0
  };
  x.prototype.GetTarget = function() {
    return this.m_target
  };
  x.prototype.SetTarget = function(a) {
    this.m_bodyB.IsAwake() == !1 && this.m_bodyB.SetAwake(!0);
    this.m_target = a
  };
  x.prototype.GetMaxForce = function() {
    return this.m_maxForce
  };
  x.prototype.SetMaxForce = function(a) {
    a === void 0 && (a = 0);
    this.m_maxForce = a
  };
  x.prototype.GetFrequency = function() {
    return this.m_frequencyHz
  };
  x.prototype.SetFrequency = function(a) {
    a === void 0 && (a = 0);
    this.m_frequencyHz = a
  };
  x.prototype.GetDampingRatio = function() {
    return this.m_dampingRatio
  };
  x.prototype.SetDampingRatio = function(a) {
    a === void 0 && (a = 0);
    this.m_dampingRatio = a
  };
  x.prototype.b2MouseJoint = function(a) {
    this.__super.b2Joint.call(this, a);
    this.m_target.SetV(a.target);
    var b = this.m_target.x - this.m_bodyB.m_xf.position.x, e = this.m_target.y - this.m_bodyB.m_xf.position.y, d = this.m_bodyB.m_xf.R;
    this.m_localAnchor.x = b * d.col1.x + e * d.col1.y;
    this.m_localAnchor.y = b * d.col2.x + e * d.col2.y;
    this.m_maxForce = a.maxForce;
    this.m_impulse.SetZero();
    this.m_frequencyHz = a.frequencyHz;
    this.m_dampingRatio = a.dampingRatio;
    this.m_gamma = this.m_beta = 0
  };
  x.prototype.InitVelocityConstraints = function(a) {
    var b = this.m_bodyB, e = b.GetMass(), d = 2 * Math.PI * this.m_frequencyHz, g = e * d * d;
    this.m_gamma = a.dt * (2 * e * this.m_dampingRatio * d + a.dt * g);
    this.m_gamma = this.m_gamma != 0 ? 1 / this.m_gamma : 0;
    this.m_beta = a.dt * g * this.m_gamma;
    var g = b.m_xf.R, e = this.m_localAnchor.x - b.m_sweep.localCenter.x, d = this.m_localAnchor.y - b.m_sweep.localCenter.y, f = g.col1.x * e + g.col2.x * d, d = g.col1.y * e + g.col2.y * d, e = f, g = b.m_invMass, f = b.m_invI;
    this.K1.col1.x = g;
    this.K1.col2.x = 0;
    this.K1.col1.y = 0;
    this.K1.col2.y = g;
    this.K2.col1.x = f * d * d;
    this.K2.col2.x = -f * e * d;
    this.K2.col1.y = -f * e * d;
    this.K2.col2.y = f * e * e;
    this.K.SetM(this.K1);
    this.K.AddM(this.K2);
    this.K.col1.x += this.m_gamma;
    this.K.col2.y += this.m_gamma;
    this.K.GetInverse(this.m_mass);
    this.m_C.x = b.m_sweep.c.x + e - this.m_target.x;
    this.m_C.y = b.m_sweep.c.y + d - this.m_target.y;
    b.m_angularVelocity *= 0.98;
    this.m_impulse.x *= a.dtRatio;
    this.m_impulse.y *= a.dtRatio;
    b.m_linearVelocity.x += g * this.m_impulse.x;
    b.m_linearVelocity.y += g * this.m_impulse.y;
    b.m_angularVelocity += f * (e * this.m_impulse.y - d * this.m_impulse.x)
  };
  x.prototype.SolveVelocityConstraints = function(a) {
    var b = this.m_bodyB, e, d = 0, g = 0;
    e = b.m_xf.R;
    var f = this.m_localAnchor.x - b.m_sweep.localCenter.x, h = this.m_localAnchor.y - b.m_sweep.localCenter.y, d = e.col1.x * f + e.col2.x * h, h = e.col1.y * f + e.col2.y * h, f = d, d = b.m_linearVelocity.x + -b.m_angularVelocity * h, j = b.m_linearVelocity.y + b.m_angularVelocity * f;
    e = this.m_mass;
    d = d + this.m_beta * this.m_C.x + this.m_gamma * this.m_impulse.x;
    g = j + this.m_beta * this.m_C.y + this.m_gamma * this.m_impulse.y;
    j = -(e.col1.x * d + e.col2.x * g);
    g = -(e.col1.y * d + e.col2.y * g);
    e = this.m_impulse.x;
    d = this.m_impulse.y;
    this.m_impulse.x += j;
    this.m_impulse.y += g;
    a = a.dt * this.m_maxForce;
    this.m_impulse.LengthSquared() > a * a && this.m_impulse.Multiply(a / this.m_impulse.Length());
    j = this.m_impulse.x - e;
    g = this.m_impulse.y - d;
    b.m_linearVelocity.x += b.m_invMass * j;
    b.m_linearVelocity.y += b.m_invMass * g;
    b.m_angularVelocity += b.m_invI * (f * g - h * j)
  };
  x.prototype.SolvePositionConstraints = function() {
    return!0
  };
  Box2D.inherit(F, Box2D.Dynamics.Joints.b2JointDef);
  F.prototype.__super = Box2D.Dynamics.Joints.b2JointDef.prototype;
  F.b2MouseJointDef = function() {
    Box2D.Dynamics.Joints.b2JointDef.b2JointDef.apply(this, arguments);
    this.target = new e
  };
  F.prototype.b2MouseJointDef = function() {
    this.__super.b2JointDef.call(this);
    this.type = q.e_mouseJoint;
    this.maxForce = 0;
    this.frequencyHz = 5;
    this.dampingRatio = 0.7
  };
  Box2D.inherit(E, Box2D.Dynamics.Joints.b2Joint);
  E.prototype.__super = Box2D.Dynamics.Joints.b2Joint.prototype;
  E.b2PrismaticJoint = function() {
    Box2D.Dynamics.Joints.b2Joint.b2Joint.apply(this, arguments);
    this.m_localAnchor1 = new e;
    this.m_localAnchor2 = new e;
    this.m_localXAxis1 = new e;
    this.m_localYAxis1 = new e;
    this.m_axis = new e;
    this.m_perp = new e;
    this.m_K = new b;
    this.m_impulse = new g
  };
  E.prototype.GetAnchorA = function() {
    return this.m_bodyA.GetWorldPoint(this.m_localAnchor1)
  };
  E.prototype.GetAnchorB = function() {
    return this.m_bodyB.GetWorldPoint(this.m_localAnchor2)
  };
  E.prototype.GetReactionForce = function(a) {
    a === void 0 && (a = 0);
    return new e(a * (this.m_impulse.x * this.m_perp.x + (this.m_motorImpulse + this.m_impulse.z) * this.m_axis.x), a * (this.m_impulse.x * this.m_perp.y + (this.m_motorImpulse + this.m_impulse.z) * this.m_axis.y))
  };
  E.prototype.GetReactionTorque = function(a) {
    a === void 0 && (a = 0);
    return a * this.m_impulse.y
  };
  E.prototype.GetJointTranslation = function() {
    var a = this.m_bodyA, b = this.m_bodyB, e = a.GetWorldPoint(this.m_localAnchor1), d = b.GetWorldPoint(this.m_localAnchor2), b = d.x - e.x, e = d.y - e.y, a = a.GetWorldVector(this.m_localXAxis1);
    return a.x * b + a.y * e
  };
  E.prototype.GetJointSpeed = function() {
    var a = this.m_bodyA, b = this.m_bodyB, e;
    e = a.m_xf.R;
    var d = this.m_localAnchor1.x - a.m_sweep.localCenter.x, g = this.m_localAnchor1.y - a.m_sweep.localCenter.y, f = e.col1.x * d + e.col2.x * g, g = e.col1.y * d + e.col2.y * g, d = f;
    e = b.m_xf.R;
    var h = this.m_localAnchor2.x - b.m_sweep.localCenter.x, j = this.m_localAnchor2.y - b.m_sweep.localCenter.y, f = e.col1.x * h + e.col2.x * j, j = e.col1.y * h + e.col2.y * j, h = f;
    e = b.m_sweep.c.x + h - (a.m_sweep.c.x + d);
    var f = b.m_sweep.c.y + j - (a.m_sweep.c.y + g), k = a.GetWorldVector(this.m_localXAxis1), l = a.m_linearVelocity, q = b.m_linearVelocity, a = a.m_angularVelocity, b = b.m_angularVelocity;
    return e * -a * k.y + f * a * k.x + (k.x * (q.x + -b * j - l.x - -a * g) + k.y * (q.y + b * h - l.y - a * d))
  };
  E.prototype.IsLimitEnabled = function() {
    return this.m_enableLimit
  };
  E.prototype.EnableLimit = function(a) {
    this.m_bodyA.SetAwake(!0);
    this.m_bodyB.SetAwake(!0);
    this.m_enableLimit = a
  };
  E.prototype.GetLowerLimit = function() {
    return this.m_lowerTranslation
  };
  E.prototype.GetUpperLimit = function() {
    return this.m_upperTranslation
  };
  E.prototype.SetLimits = function(a, b) {
    a === void 0 && (a = 0);
    b === void 0 && (b = 0);
    this.m_bodyA.SetAwake(!0);
    this.m_bodyB.SetAwake(!0);
    this.m_lowerTranslation = a;
    this.m_upperTranslation = b
  };
  E.prototype.IsMotorEnabled = function() {
    return this.m_enableMotor
  };
  E.prototype.EnableMotor = function(a) {
    this.m_bodyA.SetAwake(!0);
    this.m_bodyB.SetAwake(!0);
    this.m_enableMotor = a
  };
  E.prototype.SetMotorSpeed = function(a) {
    a === void 0 && (a = 0);
    this.m_bodyA.SetAwake(!0);
    this.m_bodyB.SetAwake(!0);
    this.m_motorSpeed = a
  };
  E.prototype.GetMotorSpeed = function() {
    return this.m_motorSpeed
  };
  E.prototype.SetMaxMotorForce = function(a) {
    a === void 0 && (a = 0);
    this.m_bodyA.SetAwake(!0);
    this.m_bodyB.SetAwake(!0);
    this.m_maxMotorForce = a
  };
  E.prototype.GetMotorForce = function() {
    return this.m_motorImpulse
  };
  E.prototype.b2PrismaticJoint = function(a) {
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
    this.m_limitState = q.e_inactiveLimit;
    this.m_axis.SetZero();
    this.m_perp.SetZero()
  };
  E.prototype.InitVelocityConstraints = function(b) {
    var e = this.m_bodyA, d = this.m_bodyB, g, h = 0;
    this.m_localCenterA.SetV(e.GetLocalCenter());
    this.m_localCenterB.SetV(d.GetLocalCenter());
    var j = e.GetTransform();
    d.GetTransform();
    g = e.m_xf.R;
    var k = this.m_localAnchor1.x - this.m_localCenterA.x, l = this.m_localAnchor1.y - this.m_localCenterA.y, h = g.col1.x * k + g.col2.x * l, l = g.col1.y * k + g.col2.y * l, k = h;
    g = d.m_xf.R;
    var m = this.m_localAnchor2.x - this.m_localCenterB.x, n = this.m_localAnchor2.y - this.m_localCenterB.y, h = g.col1.x * m + g.col2.x * n, n = g.col1.y * m + g.col2.y * n, m = h;
    g = d.m_sweep.c.x + m - e.m_sweep.c.x - k;
    h = d.m_sweep.c.y + n - e.m_sweep.c.y - l;
    this.m_invMassA = e.m_invMass;
    this.m_invMassB = d.m_invMass;
    this.m_invIA = e.m_invI;
    this.m_invIB = d.m_invI;
    this.m_axis.SetV(f.MulMV(j.R, this.m_localXAxis1));
    this.m_a1 = (g + k) * this.m_axis.y - (h + l) * this.m_axis.x;
    this.m_a2 = m * this.m_axis.y - n * this.m_axis.x;
    this.m_motorMass = this.m_invMassA + this.m_invMassB + this.m_invIA * this.m_a1 * this.m_a1 + this.m_invIB * this.m_a2 * this.m_a2;
    if(this.m_motorMass > Number.MIN_VALUE) {
      this.m_motorMass = 1 / this.m_motorMass
    }
    this.m_perp.SetV(f.MulMV(j.R, this.m_localYAxis1));
    this.m_s1 = (g + k) * this.m_perp.y - (h + l) * this.m_perp.x;
    this.m_s2 = m * this.m_perp.y - n * this.m_perp.x;
    j = this.m_invMassA;
    k = this.m_invMassB;
    l = this.m_invIA;
    m = this.m_invIB;
    this.m_K.col1.x = j + k + l * this.m_s1 * this.m_s1 + m * this.m_s2 * this.m_s2;
    this.m_K.col1.y = l * this.m_s1 + m * this.m_s2;
    this.m_K.col1.z = l * this.m_s1 * this.m_a1 + m * this.m_s2 * this.m_a2;
    this.m_K.col2.x = this.m_K.col1.y;
    this.m_K.col2.y = l + m;
    this.m_K.col2.z = l * this.m_a1 + m * this.m_a2;
    this.m_K.col3.x = this.m_K.col1.z;
    this.m_K.col3.y = this.m_K.col2.z;
    this.m_K.col3.z = j + k + l * this.m_a1 * this.m_a1 + m * this.m_a2 * this.m_a2;
    if(this.m_enableLimit) {
      if(g = this.m_axis.x * g + this.m_axis.y * h, f.Abs(this.m_upperTranslation - this.m_lowerTranslation) < 2 * a.b2_linearSlop) {
        this.m_limitState = q.e_equalLimits
      }else {
        if(g <= this.m_lowerTranslation) {
          if(this.m_limitState != q.e_atLowerLimit) {
            this.m_limitState = q.e_atLowerLimit, this.m_impulse.z = 0
          }
        }else {
          if(g >= this.m_upperTranslation) {
            if(this.m_limitState != q.e_atUpperLimit) {
              this.m_limitState = q.e_atUpperLimit, this.m_impulse.z = 0
            }
          }else {
            this.m_limitState = q.e_inactiveLimit, this.m_impulse.z = 0
          }
        }
      }
    }else {
      this.m_limitState = q.e_inactiveLimit
    }
    if(this.m_enableMotor == !1) {
      this.m_motorImpulse = 0
    }
    b.warmStarting ? (this.m_impulse.x *= b.dtRatio, this.m_impulse.y *= b.dtRatio, this.m_motorImpulse *= b.dtRatio, b = this.m_impulse.x * this.m_perp.x + (this.m_motorImpulse + this.m_impulse.z) * this.m_axis.x, g = this.m_impulse.x * this.m_perp.y + (this.m_motorImpulse + this.m_impulse.z) * this.m_axis.y, h = this.m_impulse.x * this.m_s1 + this.m_impulse.y + (this.m_motorImpulse + this.m_impulse.z) * this.m_a1, j = this.m_impulse.x * this.m_s2 + this.m_impulse.y + (this.m_motorImpulse + this.m_impulse.z) * 
    this.m_a2, e.m_linearVelocity.x -= this.m_invMassA * b, e.m_linearVelocity.y -= this.m_invMassA * g, e.m_angularVelocity -= this.m_invIA * h, d.m_linearVelocity.x += this.m_invMassB * b, d.m_linearVelocity.y += this.m_invMassB * g, d.m_angularVelocity += this.m_invIB * j) : (this.m_impulse.SetZero(), this.m_motorImpulse = 0)
  };
  E.prototype.SolveVelocityConstraints = function(a) {
    var b = this.m_bodyA, d = this.m_bodyB, h = b.m_linearVelocity, j = b.m_angularVelocity, k = d.m_linearVelocity, l = d.m_angularVelocity, m = 0, u = 0, n = 0, o = 0;
    if(this.m_enableMotor && this.m_limitState != q.e_equalLimits) {
      o = this.m_motorMass * (this.m_motorSpeed - (this.m_axis.x * (k.x - h.x) + this.m_axis.y * (k.y - h.y) + this.m_a2 * l - this.m_a1 * j)), m = this.m_motorImpulse, a = a.dt * this.m_maxMotorForce, this.m_motorImpulse = f.Clamp(this.m_motorImpulse + o, -a, a), o = this.m_motorImpulse - m, m = o * this.m_axis.x, u = o * this.m_axis.y, n = o * this.m_a1, o *= this.m_a2, h.x -= this.m_invMassA * m, h.y -= this.m_invMassA * u, j -= this.m_invIA * n, k.x += this.m_invMassB * m, k.y += this.m_invMassB * 
      u, l += this.m_invIB * o
    }
    n = this.m_perp.x * (k.x - h.x) + this.m_perp.y * (k.y - h.y) + this.m_s2 * l - this.m_s1 * j;
    u = l - j;
    if(this.m_enableLimit && this.m_limitState != q.e_inactiveLimit) {
      a = this.m_axis.x * (k.x - h.x) + this.m_axis.y * (k.y - h.y) + this.m_a2 * l - this.m_a1 * j;
      m = this.m_impulse.Copy();
      a = this.m_K.Solve33(new g, -n, -u, -a);
      this.m_impulse.Add(a);
      if(this.m_limitState == q.e_atLowerLimit) {
        this.m_impulse.z = f.Max(this.m_impulse.z, 0)
      }else {
        if(this.m_limitState == q.e_atUpperLimit) {
          this.m_impulse.z = f.Min(this.m_impulse.z, 0)
        }
      }
      n = -n - (this.m_impulse.z - m.z) * this.m_K.col3.x;
      u = -u - (this.m_impulse.z - m.z) * this.m_K.col3.y;
      u = this.m_K.Solve22(new e, n, u);
      u.x += m.x;
      u.y += m.y;
      this.m_impulse.x = u.x;
      this.m_impulse.y = u.y;
      a.x = this.m_impulse.x - m.x;
      a.y = this.m_impulse.y - m.y;
      a.z = this.m_impulse.z - m.z;
      m = a.x * this.m_perp.x + a.z * this.m_axis.x;
      u = a.x * this.m_perp.y + a.z * this.m_axis.y;
      n = a.x * this.m_s1 + a.y + a.z * this.m_a1;
      o = a.x * this.m_s2 + a.y + a.z * this.m_a2
    }else {
      a = this.m_K.Solve22(new e, -n, -u), this.m_impulse.x += a.x, this.m_impulse.y += a.y, m = a.x * this.m_perp.x, u = a.x * this.m_perp.y, n = a.x * this.m_s1 + a.y, o = a.x * this.m_s2 + a.y
    }
    h.x -= this.m_invMassA * m;
    h.y -= this.m_invMassA * u;
    j -= this.m_invIA * n;
    k.x += this.m_invMassB * m;
    k.y += this.m_invMassB * u;
    l += this.m_invIB * o;
    b.m_linearVelocity.SetV(h);
    b.m_angularVelocity = j;
    d.m_linearVelocity.SetV(k);
    d.m_angularVelocity = l
  };
  E.prototype.SolvePositionConstraints = function() {
    var b = this.m_bodyA, h = this.m_bodyB, j = b.m_sweep.c, k = b.m_sweep.a, l = h.m_sweep.c, q = h.m_sweep.a, m, n = 0, u = 0, o = 0, s = n = m = 0, w = 0, u = !1, t = 0, y = d.FromAngle(k), z = d.FromAngle(q);
    m = y;
    var w = this.m_localAnchor1.x - this.m_localCenterA.x, x = this.m_localAnchor1.y - this.m_localCenterA.y, n = m.col1.x * w + m.col2.x * x, x = m.col1.y * w + m.col2.y * x, w = n;
    m = z;
    z = this.m_localAnchor2.x - this.m_localCenterB.x;
    o = this.m_localAnchor2.y - this.m_localCenterB.y;
    n = m.col1.x * z + m.col2.x * o;
    o = m.col1.y * z + m.col2.y * o;
    z = n;
    m = l.x + z - j.x - w;
    n = l.y + o - j.y - x;
    if(this.m_enableLimit) {
      this.m_axis = f.MulMV(y, this.m_localXAxis1);
      this.m_a1 = (m + w) * this.m_axis.y - (n + x) * this.m_axis.x;
      this.m_a2 = z * this.m_axis.y - o * this.m_axis.x;
      var A = this.m_axis.x * m + this.m_axis.y * n;
      f.Abs(this.m_upperTranslation - this.m_lowerTranslation) < 2 * a.b2_linearSlop ? (t = f.Clamp(A, -a.b2_maxLinearCorrection, a.b2_maxLinearCorrection), s = f.Abs(A), u = !0) : A <= this.m_lowerTranslation ? (t = f.Clamp(A - this.m_lowerTranslation + a.b2_linearSlop, -a.b2_maxLinearCorrection, 0), s = this.m_lowerTranslation - A, u = !0) : A >= this.m_upperTranslation && (t = f.Clamp(A - this.m_upperTranslation + a.b2_linearSlop, 0, a.b2_maxLinearCorrection), s = A - this.m_upperTranslation, 
      u = !0)
    }
    this.m_perp = f.MulMV(y, this.m_localYAxis1);
    this.m_s1 = (m + w) * this.m_perp.y - (n + x) * this.m_perp.x;
    this.m_s2 = z * this.m_perp.y - o * this.m_perp.x;
    y = new g;
    x = this.m_perp.x * m + this.m_perp.y * n;
    z = q - k - this.m_refAngle;
    s = f.Max(s, f.Abs(x));
    w = f.Abs(z);
    u ? (u = this.m_invMassA, o = this.m_invMassB, m = this.m_invIA, n = this.m_invIB, this.m_K.col1.x = u + o + m * this.m_s1 * this.m_s1 + n * this.m_s2 * this.m_s2, this.m_K.col1.y = m * this.m_s1 + n * this.m_s2, this.m_K.col1.z = m * this.m_s1 * this.m_a1 + n * this.m_s2 * this.m_a2, this.m_K.col2.x = this.m_K.col1.y, this.m_K.col2.y = m + n, this.m_K.col2.z = m * this.m_a1 + n * this.m_a2, this.m_K.col3.x = this.m_K.col1.z, this.m_K.col3.y = this.m_K.col2.z, this.m_K.col3.z = u + o + m * this.m_a1 * 
    this.m_a1 + n * this.m_a2 * this.m_a2, this.m_K.Solve33(y, -x, -z, -t)) : (u = this.m_invMassA, o = this.m_invMassB, m = this.m_invIA, n = this.m_invIB, t = m * this.m_s1 + n * this.m_s2, A = m + n, this.m_K.col1.Set(u + o + m * this.m_s1 * this.m_s1 + n * this.m_s2 * this.m_s2, t, 0), this.m_K.col2.Set(t, A, 0), t = this.m_K.Solve22(new e, -x, -z), y.x = t.x, y.y = t.y, y.z = 0);
    t = y.x * this.m_perp.x + y.z * this.m_axis.x;
    u = y.x * this.m_perp.y + y.z * this.m_axis.y;
    x = y.x * this.m_s1 + y.y + y.z * this.m_a1;
    y = y.x * this.m_s2 + y.y + y.z * this.m_a2;
    j.x -= this.m_invMassA * t;
    j.y -= this.m_invMassA * u;
    k -= this.m_invIA * x;
    l.x += this.m_invMassB * t;
    l.y += this.m_invMassB * u;
    q += this.m_invIB * y;
    b.m_sweep.a = k;
    h.m_sweep.a = q;
    b.SynchronizeTransform();
    h.SynchronizeTransform();
    return s <= a.b2_linearSlop && w <= a.b2_angularSlop
  };
  Box2D.inherit(J, Box2D.Dynamics.Joints.b2JointDef);
  J.prototype.__super = Box2D.Dynamics.Joints.b2JointDef.prototype;
  J.b2PrismaticJointDef = function() {
    Box2D.Dynamics.Joints.b2JointDef.b2JointDef.apply(this, arguments);
    this.localAnchorA = new e;
    this.localAnchorB = new e;
    this.localAxisA = new e
  };
  J.prototype.b2PrismaticJointDef = function() {
    this.__super.b2JointDef.call(this);
    this.type = q.e_prismaticJoint;
    this.localAxisA.Set(1, 0);
    this.referenceAngle = 0;
    this.enableLimit = !1;
    this.upperTranslation = this.lowerTranslation = 0;
    this.enableMotor = !1;
    this.motorSpeed = this.maxMotorForce = 0
  };
  J.prototype.Initialize = function(a, b, e, d) {
    this.bodyA = a;
    this.bodyB = b;
    this.localAnchorA = this.bodyA.GetLocalPoint(e);
    this.localAnchorB = this.bodyB.GetLocalPoint(e);
    this.localAxisA = this.bodyA.GetLocalVector(d);
    this.referenceAngle = this.bodyB.GetAngle() - this.bodyA.GetAngle()
  };
  Box2D.inherit(n, Box2D.Dynamics.Joints.b2Joint);
  n.prototype.__super = Box2D.Dynamics.Joints.b2Joint.prototype;
  n.b2PulleyJoint = function() {
    Box2D.Dynamics.Joints.b2Joint.b2Joint.apply(this, arguments);
    this.m_groundAnchor1 = new e;
    this.m_groundAnchor2 = new e;
    this.m_localAnchor1 = new e;
    this.m_localAnchor2 = new e;
    this.m_u1 = new e;
    this.m_u2 = new e
  };
  n.prototype.GetAnchorA = function() {
    return this.m_bodyA.GetWorldPoint(this.m_localAnchor1)
  };
  n.prototype.GetAnchorB = function() {
    return this.m_bodyB.GetWorldPoint(this.m_localAnchor2)
  };
  n.prototype.GetReactionForce = function(a) {
    a === void 0 && (a = 0);
    return new e(a * this.m_impulse * this.m_u2.x, a * this.m_impulse * this.m_u2.y)
  };
  n.prototype.GetReactionTorque = function() {
    return 0
  };
  n.prototype.GetGroundAnchorA = function() {
    var a = this.m_ground.m_xf.position.Copy();
    a.Add(this.m_groundAnchor1);
    return a
  };
  n.prototype.GetGroundAnchorB = function() {
    var a = this.m_ground.m_xf.position.Copy();
    a.Add(this.m_groundAnchor2);
    return a
  };
  n.prototype.GetLength1 = function() {
    var a = this.m_bodyA.GetWorldPoint(this.m_localAnchor1), b = a.x - (this.m_ground.m_xf.position.x + this.m_groundAnchor1.x), a = a.y - (this.m_ground.m_xf.position.y + this.m_groundAnchor1.y);
    return Math.sqrt(b * b + a * a)
  };
  n.prototype.GetLength2 = function() {
    var a = this.m_bodyB.GetWorldPoint(this.m_localAnchor2), b = a.x - (this.m_ground.m_xf.position.x + this.m_groundAnchor2.x), a = a.y - (this.m_ground.m_xf.position.y + this.m_groundAnchor2.y);
    return Math.sqrt(b * b + a * a)
  };
  n.prototype.GetRatio = function() {
    return this.m_ratio
  };
  n.prototype.b2PulleyJoint = function(a) {
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
    this.m_maxLength1 = f.Min(a.maxLengthA, this.m_constant - this.m_ratio * n.b2_minPulleyLength);
    this.m_maxLength2 = f.Min(a.maxLengthB, (this.m_constant - n.b2_minPulleyLength) / this.m_ratio);
    this.m_limitImpulse2 = this.m_limitImpulse1 = this.m_impulse = 0
  };
  n.prototype.InitVelocityConstraints = function(b) {
    var e = this.m_bodyA, d = this.m_bodyB, g;
    g = e.m_xf.R;
    var f = this.m_localAnchor1.x - e.m_sweep.localCenter.x, h = this.m_localAnchor1.y - e.m_sweep.localCenter.y, j = g.col1.x * f + g.col2.x * h, h = g.col1.y * f + g.col2.y * h, f = j;
    g = d.m_xf.R;
    var k = this.m_localAnchor2.x - d.m_sweep.localCenter.x, l = this.m_localAnchor2.y - d.m_sweep.localCenter.y, j = g.col1.x * k + g.col2.x * l, l = g.col1.y * k + g.col2.y * l, k = j;
    g = d.m_sweep.c.x + k;
    var j = d.m_sweep.c.y + l, m = this.m_ground.m_xf.position.x + this.m_groundAnchor2.x, n = this.m_ground.m_xf.position.y + this.m_groundAnchor2.y;
    this.m_u1.Set(e.m_sweep.c.x + f - (this.m_ground.m_xf.position.x + this.m_groundAnchor1.x), e.m_sweep.c.y + h - (this.m_ground.m_xf.position.y + this.m_groundAnchor1.y));
    this.m_u2.Set(g - m, j - n);
    g = this.m_u1.Length();
    j = this.m_u2.Length();
    g > a.b2_linearSlop ? this.m_u1.Multiply(1 / g) : this.m_u1.SetZero();
    j > a.b2_linearSlop ? this.m_u2.Multiply(1 / j) : this.m_u2.SetZero();
    this.m_constant - g - this.m_ratio * j > 0 ? (this.m_state = q.e_inactiveLimit, this.m_impulse = 0) : this.m_state = q.e_atUpperLimit;
    g < this.m_maxLength1 ? (this.m_limitState1 = q.e_inactiveLimit, this.m_limitImpulse1 = 0) : this.m_limitState1 = q.e_atUpperLimit;
    j < this.m_maxLength2 ? (this.m_limitState2 = q.e_inactiveLimit, this.m_limitImpulse2 = 0) : this.m_limitState2 = q.e_atUpperLimit;
    g = f * this.m_u1.y - h * this.m_u1.x;
    j = k * this.m_u2.y - l * this.m_u2.x;
    this.m_limitMass1 = e.m_invMass + e.m_invI * g * g;
    this.m_limitMass2 = d.m_invMass + d.m_invI * j * j;
    this.m_pulleyMass = this.m_limitMass1 + this.m_ratio * this.m_ratio * this.m_limitMass2;
    this.m_limitMass1 = 1 / this.m_limitMass1;
    this.m_limitMass2 = 1 / this.m_limitMass2;
    this.m_pulleyMass = 1 / this.m_pulleyMass;
    b.warmStarting ? (this.m_impulse *= b.dtRatio, this.m_limitImpulse1 *= b.dtRatio, this.m_limitImpulse2 *= b.dtRatio, b = (-this.m_impulse - this.m_limitImpulse1) * this.m_u1.x, g = (-this.m_impulse - this.m_limitImpulse1) * this.m_u1.y, j = (-this.m_ratio * this.m_impulse - this.m_limitImpulse2) * this.m_u2.x, m = (-this.m_ratio * this.m_impulse - this.m_limitImpulse2) * this.m_u2.y, e.m_linearVelocity.x += e.m_invMass * b, e.m_linearVelocity.y += e.m_invMass * g, e.m_angularVelocity += e.m_invI * 
    (f * g - h * b), d.m_linearVelocity.x += d.m_invMass * j, d.m_linearVelocity.y += d.m_invMass * m, d.m_angularVelocity += d.m_invI * (k * m - l * j)) : this.m_limitImpulse2 = this.m_limitImpulse1 = this.m_impulse = 0
  };
  n.prototype.SolveVelocityConstraints = function() {
    var a = this.m_bodyA, b = this.m_bodyB, e;
    e = a.m_xf.R;
    var d = this.m_localAnchor1.x - a.m_sweep.localCenter.x, g = this.m_localAnchor1.y - a.m_sweep.localCenter.y, h = e.col1.x * d + e.col2.x * g, g = e.col1.y * d + e.col2.y * g, d = h;
    e = b.m_xf.R;
    var j = this.m_localAnchor2.x - b.m_sweep.localCenter.x, k = this.m_localAnchor2.y - b.m_sweep.localCenter.y, h = e.col1.x * j + e.col2.x * k, k = e.col1.y * j + e.col2.y * k, j = h, l = h = e = 0, m = 0;
    e = m = e = m = l = h = e = 0;
    if(this.m_state == q.e_atUpperLimit) {
      e = a.m_linearVelocity.x + -a.m_angularVelocity * g, h = a.m_linearVelocity.y + a.m_angularVelocity * d, l = b.m_linearVelocity.x + -b.m_angularVelocity * k, m = b.m_linearVelocity.y + b.m_angularVelocity * j, e = -(this.m_u1.x * e + this.m_u1.y * h) - this.m_ratio * (this.m_u2.x * l + this.m_u2.y * m), m = this.m_pulleyMass * -e, e = this.m_impulse, this.m_impulse = f.Max(0, this.m_impulse + m), m = this.m_impulse - e, e = -m * this.m_u1.x, h = -m * this.m_u1.y, l = -this.m_ratio * m * this.m_u2.x, 
      m = -this.m_ratio * m * this.m_u2.y, a.m_linearVelocity.x += a.m_invMass * e, a.m_linearVelocity.y += a.m_invMass * h, a.m_angularVelocity += a.m_invI * (d * h - g * e), b.m_linearVelocity.x += b.m_invMass * l, b.m_linearVelocity.y += b.m_invMass * m, b.m_angularVelocity += b.m_invI * (j * m - k * l)
    }
    if(this.m_limitState1 == q.e_atUpperLimit) {
      e = a.m_linearVelocity.x + -a.m_angularVelocity * g, h = a.m_linearVelocity.y + a.m_angularVelocity * d, e = -(this.m_u1.x * e + this.m_u1.y * h), m = -this.m_limitMass1 * e, e = this.m_limitImpulse1, this.m_limitImpulse1 = f.Max(0, this.m_limitImpulse1 + m), m = this.m_limitImpulse1 - e, e = -m * this.m_u1.x, h = -m * this.m_u1.y, a.m_linearVelocity.x += a.m_invMass * e, a.m_linearVelocity.y += a.m_invMass * h, a.m_angularVelocity += a.m_invI * (d * h - g * e)
    }
    if(this.m_limitState2 == q.e_atUpperLimit) {
      l = b.m_linearVelocity.x + -b.m_angularVelocity * k, m = b.m_linearVelocity.y + b.m_angularVelocity * j, e = -(this.m_u2.x * l + this.m_u2.y * m), m = -this.m_limitMass2 * e, e = this.m_limitImpulse2, this.m_limitImpulse2 = f.Max(0, this.m_limitImpulse2 + m), m = this.m_limitImpulse2 - e, l = -m * this.m_u2.x, m = -m * this.m_u2.y, b.m_linearVelocity.x += b.m_invMass * l, b.m_linearVelocity.y += b.m_invMass * m, b.m_angularVelocity += b.m_invI * (j * m - k * l)
    }
  };
  n.prototype.SolvePositionConstraints = function() {
    var b = this.m_bodyA, e = this.m_bodyB, d, g = this.m_ground.m_xf.position.x + this.m_groundAnchor1.x, h = this.m_ground.m_xf.position.y + this.m_groundAnchor1.y, j = this.m_ground.m_xf.position.x + this.m_groundAnchor2.x, k = this.m_ground.m_xf.position.y + this.m_groundAnchor2.y, l = 0, m = 0, n = 0, o = 0, s = d = 0, t = 0, w = 0, y = s = w = d = s = d = 0;
    if(this.m_state == q.e_atUpperLimit) {
      d = b.m_xf.R, l = this.m_localAnchor1.x - b.m_sweep.localCenter.x, m = this.m_localAnchor1.y - b.m_sweep.localCenter.y, s = d.col1.x * l + d.col2.x * m, m = d.col1.y * l + d.col2.y * m, l = s, d = e.m_xf.R, n = this.m_localAnchor2.x - e.m_sweep.localCenter.x, o = this.m_localAnchor2.y - e.m_sweep.localCenter.y, s = d.col1.x * n + d.col2.x * o, o = d.col1.y * n + d.col2.y * o, n = s, d = b.m_sweep.c.x + l, s = b.m_sweep.c.y + m, t = e.m_sweep.c.x + n, w = e.m_sweep.c.y + o, this.m_u1.Set(d - 
      g, s - h), this.m_u2.Set(t - j, w - k), d = this.m_u1.Length(), s = this.m_u2.Length(), d > a.b2_linearSlop ? this.m_u1.Multiply(1 / d) : this.m_u1.SetZero(), s > a.b2_linearSlop ? this.m_u2.Multiply(1 / s) : this.m_u2.SetZero(), d = this.m_constant - d - this.m_ratio * s, y = f.Max(y, -d), d = f.Clamp(d + a.b2_linearSlop, -a.b2_maxLinearCorrection, 0), w = -this.m_pulleyMass * d, d = -w * this.m_u1.x, s = -w * this.m_u1.y, t = -this.m_ratio * w * this.m_u2.x, w = -this.m_ratio * w * this.m_u2.y, 
      b.m_sweep.c.x += b.m_invMass * d, b.m_sweep.c.y += b.m_invMass * s, b.m_sweep.a += b.m_invI * (l * s - m * d), e.m_sweep.c.x += e.m_invMass * t, e.m_sweep.c.y += e.m_invMass * w, e.m_sweep.a += e.m_invI * (n * w - o * t), b.SynchronizeTransform(), e.SynchronizeTransform()
    }
    if(this.m_limitState1 == q.e_atUpperLimit) {
      d = b.m_xf.R, l = this.m_localAnchor1.x - b.m_sweep.localCenter.x, m = this.m_localAnchor1.y - b.m_sweep.localCenter.y, s = d.col1.x * l + d.col2.x * m, m = d.col1.y * l + d.col2.y * m, l = s, d = b.m_sweep.c.x + l, s = b.m_sweep.c.y + m, this.m_u1.Set(d - g, s - h), d = this.m_u1.Length(), d > a.b2_linearSlop ? (this.m_u1.x *= 1 / d, this.m_u1.y *= 1 / d) : this.m_u1.SetZero(), d = this.m_maxLength1 - d, y = f.Max(y, -d), d = f.Clamp(d + a.b2_linearSlop, -a.b2_maxLinearCorrection, 0), w = 
      -this.m_limitMass1 * d, d = -w * this.m_u1.x, s = -w * this.m_u1.y, b.m_sweep.c.x += b.m_invMass * d, b.m_sweep.c.y += b.m_invMass * s, b.m_sweep.a += b.m_invI * (l * s - m * d), b.SynchronizeTransform()
    }
    if(this.m_limitState2 == q.e_atUpperLimit) {
      d = e.m_xf.R, n = this.m_localAnchor2.x - e.m_sweep.localCenter.x, o = this.m_localAnchor2.y - e.m_sweep.localCenter.y, s = d.col1.x * n + d.col2.x * o, o = d.col1.y * n + d.col2.y * o, n = s, t = e.m_sweep.c.x + n, w = e.m_sweep.c.y + o, this.m_u2.Set(t - j, w - k), s = this.m_u2.Length(), s > a.b2_linearSlop ? (this.m_u2.x *= 1 / s, this.m_u2.y *= 1 / s) : this.m_u2.SetZero(), d = this.m_maxLength2 - s, y = f.Max(y, -d), d = f.Clamp(d + a.b2_linearSlop, -a.b2_maxLinearCorrection, 0), w = 
      -this.m_limitMass2 * d, t = -w * this.m_u2.x, w = -w * this.m_u2.y, e.m_sweep.c.x += e.m_invMass * t, e.m_sweep.c.y += e.m_invMass * w, e.m_sweep.a += e.m_invI * (n * w - o * t), e.SynchronizeTransform()
    }
    return y < a.b2_linearSlop
  };
  Box2D.postDefs.push(function() {
    Box2D.Dynamics.Joints.b2PulleyJoint.b2_minPulleyLength = 2
  });
  Box2D.inherit(G, Box2D.Dynamics.Joints.b2JointDef);
  G.prototype.__super = Box2D.Dynamics.Joints.b2JointDef.prototype;
  G.b2PulleyJointDef = function() {
    Box2D.Dynamics.Joints.b2JointDef.b2JointDef.apply(this, arguments);
    this.groundAnchorA = new e;
    this.groundAnchorB = new e;
    this.localAnchorA = new e;
    this.localAnchorB = new e
  };
  G.prototype.b2PulleyJointDef = function() {
    this.__super.b2JointDef.call(this);
    this.type = q.e_pulleyJoint;
    this.groundAnchorA.Set(-1, 1);
    this.groundAnchorB.Set(1, 1);
    this.localAnchorA.Set(-1, 0);
    this.localAnchorB.Set(1, 0);
    this.maxLengthB = this.lengthB = this.maxLengthA = this.lengthA = 0;
    this.ratio = 1;
    this.collideConnected = !0
  };
  G.prototype.Initialize = function(a, b, e, d, g, f, h) {
    h === void 0 && (h = 0);
    this.bodyA = a;
    this.bodyB = b;
    this.groundAnchorA.SetV(e);
    this.groundAnchorB.SetV(d);
    this.localAnchorA = this.bodyA.GetLocalPoint(g);
    this.localAnchorB = this.bodyB.GetLocalPoint(f);
    a = g.x - e.x;
    e = g.y - e.y;
    this.lengthA = Math.sqrt(a * a + e * e);
    e = f.x - d.x;
    d = f.y - d.y;
    this.lengthB = Math.sqrt(e * e + d * d);
    this.ratio = h;
    h = this.lengthA + this.ratio * this.lengthB;
    this.maxLengthA = h - this.ratio * n.b2_minPulleyLength;
    this.maxLengthB = (h - n.b2_minPulleyLength) / this.ratio
  };
  Box2D.inherit(t, Box2D.Dynamics.Joints.b2Joint);
  t.prototype.__super = Box2D.Dynamics.Joints.b2Joint.prototype;
  t.b2RevoluteJoint = function() {
    Box2D.Dynamics.Joints.b2Joint.b2Joint.apply(this, arguments);
    this.K = new d;
    this.K1 = new d;
    this.K2 = new d;
    this.K3 = new d;
    this.impulse3 = new g;
    this.impulse2 = new e;
    this.reduced = new e;
    this.m_localAnchor1 = new e;
    this.m_localAnchor2 = new e;
    this.m_impulse = new g;
    this.m_mass = new b
  };
  t.prototype.GetAnchorA = function() {
    return this.m_bodyA.GetWorldPoint(this.m_localAnchor1)
  };
  t.prototype.GetAnchorB = function() {
    return this.m_bodyB.GetWorldPoint(this.m_localAnchor2)
  };
  t.prototype.GetReactionForce = function(a) {
    a === void 0 && (a = 0);
    return new e(a * this.m_impulse.x, a * this.m_impulse.y)
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
    this.m_limitState = q.e_inactiveLimit
  };
  t.prototype.InitVelocityConstraints = function(b) {
    var e = this.m_bodyA, d = this.m_bodyB, g, h = 0;
    g = e.m_xf.R;
    var j = this.m_localAnchor1.x - e.m_sweep.localCenter.x, k = this.m_localAnchor1.y - e.m_sweep.localCenter.y, h = g.col1.x * j + g.col2.x * k, k = g.col1.y * j + g.col2.y * k, j = h;
    g = d.m_xf.R;
    var l = this.m_localAnchor2.x - d.m_sweep.localCenter.x, m = this.m_localAnchor2.y - d.m_sweep.localCenter.y, h = g.col1.x * l + g.col2.x * m, m = g.col1.y * l + g.col2.y * m, l = h;
    g = e.m_invMass;
    var h = d.m_invMass, n = e.m_invI, o = d.m_invI;
    this.m_mass.col1.x = g + h + k * k * n + m * m * o;
    this.m_mass.col2.x = -k * j * n - m * l * o;
    this.m_mass.col3.x = -k * n - m * o;
    this.m_mass.col1.y = this.m_mass.col2.x;
    this.m_mass.col2.y = g + h + j * j * n + l * l * o;
    this.m_mass.col3.y = j * n + l * o;
    this.m_mass.col1.z = this.m_mass.col3.x;
    this.m_mass.col2.z = this.m_mass.col3.y;
    this.m_mass.col3.z = n + o;
    this.m_motorMass = 1 / (n + o);
    if(this.m_enableMotor == !1) {
      this.m_motorImpulse = 0
    }
    if(this.m_enableLimit) {
      var s = d.m_sweep.a - e.m_sweep.a - this.m_referenceAngle;
      if(f.Abs(this.m_upperAngle - this.m_lowerAngle) < 2 * a.b2_angularSlop) {
        this.m_limitState = q.e_equalLimits
      }else {
        if(s <= this.m_lowerAngle) {
          if(this.m_limitState != q.e_atLowerLimit) {
            this.m_impulse.z = 0
          }
          this.m_limitState = q.e_atLowerLimit
        }else {
          if(s >= this.m_upperAngle) {
            if(this.m_limitState != q.e_atUpperLimit) {
              this.m_impulse.z = 0
            }
            this.m_limitState = q.e_atUpperLimit
          }else {
            this.m_limitState = q.e_inactiveLimit, this.m_impulse.z = 0
          }
        }
      }
    }else {
      this.m_limitState = q.e_inactiveLimit
    }
    b.warmStarting ? (this.m_impulse.x *= b.dtRatio, this.m_impulse.y *= b.dtRatio, this.m_motorImpulse *= b.dtRatio, b = this.m_impulse.x, s = this.m_impulse.y, e.m_linearVelocity.x -= g * b, e.m_linearVelocity.y -= g * s, e.m_angularVelocity -= n * (j * s - k * b + this.m_motorImpulse + this.m_impulse.z), d.m_linearVelocity.x += h * b, d.m_linearVelocity.y += h * s, d.m_angularVelocity += o * (l * s - m * b + this.m_motorImpulse + this.m_impulse.z)) : (this.m_impulse.SetZero(), this.m_motorImpulse = 
    0)
  };
  t.prototype.SolveVelocityConstraints = function(a) {
    var b = this.m_bodyA, e = this.m_bodyB, d = 0, g = d = 0, h = 0, j = 0, k = 0, l = b.m_linearVelocity, m = b.m_angularVelocity, n = e.m_linearVelocity, o = e.m_angularVelocity, s = b.m_invMass, w = e.m_invMass, t = b.m_invI, y = e.m_invI;
    if(this.m_enableMotor && this.m_limitState != q.e_equalLimits) {
      g = this.m_motorMass * -(o - m - this.m_motorSpeed), h = this.m_motorImpulse, j = a.dt * this.m_maxMotorTorque, this.m_motorImpulse = f.Clamp(this.m_motorImpulse + g, -j, j), g = this.m_motorImpulse - h, m -= t * g, o += y * g
    }
    if(this.m_enableLimit && this.m_limitState != q.e_inactiveLimit) {
      var a = b.m_xf.R, g = this.m_localAnchor1.x - b.m_sweep.localCenter.x, h = this.m_localAnchor1.y - b.m_sweep.localCenter.y, d = a.col1.x * g + a.col2.x * h, h = a.col1.y * g + a.col2.y * h, g = d, a = e.m_xf.R, j = this.m_localAnchor2.x - e.m_sweep.localCenter.x, k = this.m_localAnchor2.y - e.m_sweep.localCenter.y, d = a.col1.x * j + a.col2.x * k, k = a.col1.y * j + a.col2.y * k, j = d, a = n.x + -o * k - l.x - -m * h, x = n.y + o * j - l.y - m * g;
      this.m_mass.Solve33(this.impulse3, -a, -x, -(o - m));
      if(this.m_limitState == q.e_equalLimits) {
        this.m_impulse.Add(this.impulse3)
      }else {
        if(this.m_limitState == q.e_atLowerLimit) {
          if(d = this.m_impulse.z + this.impulse3.z, d < 0) {
            this.m_mass.Solve22(this.reduced, -a, -x), this.impulse3.x = this.reduced.x, this.impulse3.y = this.reduced.y, this.impulse3.z = -this.m_impulse.z, this.m_impulse.x += this.reduced.x, this.m_impulse.y += this.reduced.y, this.m_impulse.z = 0
          }
        }else {
          if(this.m_limitState == q.e_atUpperLimit && (d = this.m_impulse.z + this.impulse3.z, d > 0)) {
            this.m_mass.Solve22(this.reduced, -a, -x), this.impulse3.x = this.reduced.x, this.impulse3.y = this.reduced.y, this.impulse3.z = -this.m_impulse.z, this.m_impulse.x += this.reduced.x, this.m_impulse.y += this.reduced.y, this.m_impulse.z = 0
          }
        }
      }
      l.x -= s * this.impulse3.x;
      l.y -= s * this.impulse3.y;
      m -= t * (g * this.impulse3.y - h * this.impulse3.x + this.impulse3.z);
      n.x += w * this.impulse3.x;
      n.y += w * this.impulse3.y;
      o += y * (j * this.impulse3.y - k * this.impulse3.x + this.impulse3.z)
    }else {
      a = b.m_xf.R, g = this.m_localAnchor1.x - b.m_sweep.localCenter.x, h = this.m_localAnchor1.y - b.m_sweep.localCenter.y, d = a.col1.x * g + a.col2.x * h, h = a.col1.y * g + a.col2.y * h, g = d, a = e.m_xf.R, j = this.m_localAnchor2.x - e.m_sweep.localCenter.x, k = this.m_localAnchor2.y - e.m_sweep.localCenter.y, d = a.col1.x * j + a.col2.x * k, k = a.col1.y * j + a.col2.y * k, j = d, this.m_mass.Solve22(this.impulse2, -(n.x + -o * k - l.x - -m * h), -(n.y + o * j - l.y - m * g)), this.m_impulse.x += 
      this.impulse2.x, this.m_impulse.y += this.impulse2.y, l.x -= s * this.impulse2.x, l.y -= s * this.impulse2.y, m -= t * (g * this.impulse2.y - h * this.impulse2.x), n.x += w * this.impulse2.x, n.y += w * this.impulse2.y, o += y * (j * this.impulse2.y - k * this.impulse2.x)
    }
    b.m_linearVelocity.SetV(l);
    b.m_angularVelocity = m;
    e.m_linearVelocity.SetV(n);
    e.m_angularVelocity = o
  };
  t.prototype.SolvePositionConstraints = function() {
    var b = 0, e, d = this.m_bodyA, g = this.m_bodyB, h = 0, j = e = 0, k = 0, l = 0;
    if(this.m_enableLimit && this.m_limitState != q.e_inactiveLimit) {
      var b = g.m_sweep.a - d.m_sweep.a - this.m_referenceAngle, m = 0;
      this.m_limitState == q.e_equalLimits ? (b = f.Clamp(b - this.m_lowerAngle, -a.b2_maxAngularCorrection, a.b2_maxAngularCorrection), m = -this.m_motorMass * b, h = f.Abs(b)) : this.m_limitState == q.e_atLowerLimit ? (b -= this.m_lowerAngle, h = -b, b = f.Clamp(b + a.b2_angularSlop, -a.b2_maxAngularCorrection, 0), m = -this.m_motorMass * b) : this.m_limitState == q.e_atUpperLimit && (b -= this.m_upperAngle, h = b, b = f.Clamp(b - a.b2_angularSlop, 0, a.b2_maxAngularCorrection), m = -this.m_motorMass * 
      b);
      d.m_sweep.a -= d.m_invI * m;
      g.m_sweep.a += g.m_invI * m;
      d.SynchronizeTransform();
      g.SynchronizeTransform()
    }
    e = d.m_xf.R;
    m = this.m_localAnchor1.x - d.m_sweep.localCenter.x;
    b = this.m_localAnchor1.y - d.m_sweep.localCenter.y;
    j = e.col1.x * m + e.col2.x * b;
    b = e.col1.y * m + e.col2.y * b;
    m = j;
    e = g.m_xf.R;
    var n = this.m_localAnchor2.x - g.m_sweep.localCenter.x, o = this.m_localAnchor2.y - g.m_sweep.localCenter.y, j = e.col1.x * n + e.col2.x * o, o = e.col1.y * n + e.col2.y * o, n = j, k = g.m_sweep.c.x + n - d.m_sweep.c.x - m, l = g.m_sweep.c.y + o - d.m_sweep.c.y - b, s = k * k + l * l;
    e = Math.sqrt(s);
    var j = d.m_invMass, w = g.m_invMass, y = d.m_invI, z = g.m_invI, x = 10 * a.b2_linearSlop;
    s > x * x && (s = 1 / (j + w), k = s * -k, l = s * -l, d.m_sweep.c.x -= 0.5 * j * k, d.m_sweep.c.y -= 0.5 * j * l, g.m_sweep.c.x += 0.5 * w * k, g.m_sweep.c.y += 0.5 * w * l, k = g.m_sweep.c.x + n - d.m_sweep.c.x - m, l = g.m_sweep.c.y + o - d.m_sweep.c.y - b);
    this.K1.col1.x = j + w;
    this.K1.col2.x = 0;
    this.K1.col1.y = 0;
    this.K1.col2.y = j + w;
    this.K2.col1.x = y * b * b;
    this.K2.col2.x = -y * m * b;
    this.K2.col1.y = -y * m * b;
    this.K2.col2.y = y * m * m;
    this.K3.col1.x = z * o * o;
    this.K3.col2.x = -z * n * o;
    this.K3.col1.y = -z * n * o;
    this.K3.col2.y = z * n * n;
    this.K.SetM(this.K1);
    this.K.AddM(this.K2);
    this.K.AddM(this.K3);
    this.K.Solve(t.tImpulse, -k, -l);
    k = t.tImpulse.x;
    l = t.tImpulse.y;
    d.m_sweep.c.x -= d.m_invMass * k;
    d.m_sweep.c.y -= d.m_invMass * l;
    d.m_sweep.a -= d.m_invI * (m * l - b * k);
    g.m_sweep.c.x += g.m_invMass * k;
    g.m_sweep.c.y += g.m_invMass * l;
    g.m_sweep.a += g.m_invI * (n * l - o * k);
    d.SynchronizeTransform();
    g.SynchronizeTransform();
    return e <= a.b2_linearSlop && h <= a.b2_angularSlop
  };
  Box2D.postDefs.push(function() {
    Box2D.Dynamics.Joints.b2RevoluteJoint.tImpulse = new e
  });
  Box2D.inherit(D, Box2D.Dynamics.Joints.b2JointDef);
  D.prototype.__super = Box2D.Dynamics.Joints.b2JointDef.prototype;
  D.b2RevoluteJointDef = function() {
    Box2D.Dynamics.Joints.b2JointDef.b2JointDef.apply(this, arguments);
    this.localAnchorA = new e;
    this.localAnchorB = new e
  };
  D.prototype.b2RevoluteJointDef = function() {
    this.__super.b2JointDef.call(this);
    this.type = q.e_revoluteJoint;
    this.localAnchorA.Set(0, 0);
    this.localAnchorB.Set(0, 0);
    this.motorSpeed = this.maxMotorTorque = this.upperAngle = this.lowerAngle = this.referenceAngle = 0;
    this.enableMotor = this.enableLimit = !1
  };
  D.prototype.Initialize = function(a, b, e) {
    this.bodyA = a;
    this.bodyB = b;
    this.localAnchorA = this.bodyA.GetLocalPoint(e);
    this.localAnchorB = this.bodyB.GetLocalPoint(e);
    this.referenceAngle = this.bodyB.GetAngle() - this.bodyA.GetAngle()
  };
  Box2D.inherit(M, Box2D.Dynamics.Joints.b2Joint);
  M.prototype.__super = Box2D.Dynamics.Joints.b2Joint.prototype;
  M.b2WeldJoint = function() {
    Box2D.Dynamics.Joints.b2Joint.b2Joint.apply(this, arguments);
    this.m_localAnchorA = new e;
    this.m_localAnchorB = new e;
    this.m_impulse = new g;
    this.m_mass = new b
  };
  M.prototype.GetAnchorA = function() {
    return this.m_bodyA.GetWorldPoint(this.m_localAnchorA)
  };
  M.prototype.GetAnchorB = function() {
    return this.m_bodyB.GetWorldPoint(this.m_localAnchorB)
  };
  M.prototype.GetReactionForce = function(a) {
    a === void 0 && (a = 0);
    return new e(a * this.m_impulse.x, a * this.m_impulse.y)
  };
  M.prototype.GetReactionTorque = function(a) {
    a === void 0 && (a = 0);
    return a * this.m_impulse.z
  };
  M.prototype.b2WeldJoint = function(a) {
    this.__super.b2Joint.call(this, a);
    this.m_localAnchorA.SetV(a.localAnchorA);
    this.m_localAnchorB.SetV(a.localAnchorB);
    this.m_referenceAngle = a.referenceAngle;
    this.m_impulse.SetZero();
    this.m_mass = new b
  };
  M.prototype.InitVelocityConstraints = function(a) {
    var b, e = 0, d = this.m_bodyA, g = this.m_bodyB;
    b = d.m_xf.R;
    var f = this.m_localAnchorA.x - d.m_sweep.localCenter.x, h = this.m_localAnchorA.y - d.m_sweep.localCenter.y, e = b.col1.x * f + b.col2.x * h, h = b.col1.y * f + b.col2.y * h, f = e;
    b = g.m_xf.R;
    var j = this.m_localAnchorB.x - g.m_sweep.localCenter.x, k = this.m_localAnchorB.y - g.m_sweep.localCenter.y, e = b.col1.x * j + b.col2.x * k, k = b.col1.y * j + b.col2.y * k, j = e;
    b = d.m_invMass;
    var e = g.m_invMass, l = d.m_invI, m = g.m_invI;
    this.m_mass.col1.x = b + e + h * h * l + k * k * m;
    this.m_mass.col2.x = -h * f * l - k * j * m;
    this.m_mass.col3.x = -h * l - k * m;
    this.m_mass.col1.y = this.m_mass.col2.x;
    this.m_mass.col2.y = b + e + f * f * l + j * j * m;
    this.m_mass.col3.y = f * l + j * m;
    this.m_mass.col1.z = this.m_mass.col3.x;
    this.m_mass.col2.z = this.m_mass.col3.y;
    this.m_mass.col3.z = l + m;
    a.warmStarting ? (this.m_impulse.x *= a.dtRatio, this.m_impulse.y *= a.dtRatio, this.m_impulse.z *= a.dtRatio, d.m_linearVelocity.x -= b * this.m_impulse.x, d.m_linearVelocity.y -= b * this.m_impulse.y, d.m_angularVelocity -= l * (f * this.m_impulse.y - h * this.m_impulse.x + this.m_impulse.z), g.m_linearVelocity.x += e * this.m_impulse.x, g.m_linearVelocity.y += e * this.m_impulse.y, g.m_angularVelocity += m * (j * this.m_impulse.y - k * this.m_impulse.x + this.m_impulse.z)) : this.m_impulse.SetZero()
  };
  M.prototype.SolveVelocityConstraints = function() {
    var a, b = 0, e = this.m_bodyA, d = this.m_bodyB, f = e.m_linearVelocity, h = e.m_angularVelocity, j = d.m_linearVelocity, k = d.m_angularVelocity, l = e.m_invMass, m = d.m_invMass, n = e.m_invI, q = d.m_invI;
    a = e.m_xf.R;
    var o = this.m_localAnchorA.x - e.m_sweep.localCenter.x, s = this.m_localAnchorA.y - e.m_sweep.localCenter.y, b = a.col1.x * o + a.col2.x * s, s = a.col1.y * o + a.col2.y * s, o = b;
    a = d.m_xf.R;
    var w = this.m_localAnchorB.x - d.m_sweep.localCenter.x, t = this.m_localAnchorB.y - d.m_sweep.localCenter.y, b = a.col1.x * w + a.col2.x * t, t = a.col1.y * w + a.col2.y * t, w = b;
    a = j.x - k * t - f.x + h * s;
    var b = j.y + k * w - f.y - h * o, y = k - h, x = new g;
    this.m_mass.Solve33(x, -a, -b, -y);
    this.m_impulse.Add(x);
    f.x -= l * x.x;
    f.y -= l * x.y;
    h -= n * (o * x.y - s * x.x + x.z);
    j.x += m * x.x;
    j.y += m * x.y;
    k += q * (w * x.y - t * x.x + x.z);
    e.m_angularVelocity = h;
    d.m_angularVelocity = k
  };
  M.prototype.SolvePositionConstraints = function() {
    var b, e = 0, d = this.m_bodyA, h = this.m_bodyB;
    b = d.m_xf.R;
    var j = this.m_localAnchorA.x - d.m_sweep.localCenter.x, k = this.m_localAnchorA.y - d.m_sweep.localCenter.y, e = b.col1.x * j + b.col2.x * k, k = b.col1.y * j + b.col2.y * k, j = e;
    b = h.m_xf.R;
    var l = this.m_localAnchorB.x - h.m_sweep.localCenter.x, m = this.m_localAnchorB.y - h.m_sweep.localCenter.y, e = b.col1.x * l + b.col2.x * m, m = b.col1.y * l + b.col2.y * m, l = e;
    b = d.m_invMass;
    var e = h.m_invMass, n = d.m_invI, q = h.m_invI, o = h.m_sweep.c.x + l - d.m_sweep.c.x - j, s = h.m_sweep.c.y + m - d.m_sweep.c.y - k, w = h.m_sweep.a - d.m_sweep.a - this.m_referenceAngle, t = 10 * a.b2_linearSlop, y = Math.sqrt(o * o + s * s), x = f.Abs(w);
    y > t && (n *= 1, q *= 1);
    this.m_mass.col1.x = b + e + k * k * n + m * m * q;
    this.m_mass.col2.x = -k * j * n - m * l * q;
    this.m_mass.col3.x = -k * n - m * q;
    this.m_mass.col1.y = this.m_mass.col2.x;
    this.m_mass.col2.y = b + e + j * j * n + l * l * q;
    this.m_mass.col3.y = j * n + l * q;
    this.m_mass.col1.z = this.m_mass.col3.x;
    this.m_mass.col2.z = this.m_mass.col3.y;
    this.m_mass.col3.z = n + q;
    t = new g;
    this.m_mass.Solve33(t, -o, -s, -w);
    d.m_sweep.c.x -= b * t.x;
    d.m_sweep.c.y -= b * t.y;
    d.m_sweep.a -= n * (j * t.y - k * t.x + t.z);
    h.m_sweep.c.x += e * t.x;
    h.m_sweep.c.y += e * t.y;
    h.m_sweep.a += q * (l * t.y - m * t.x + t.z);
    d.SynchronizeTransform();
    h.SynchronizeTransform();
    return y <= a.b2_linearSlop && x <= a.b2_angularSlop
  };
  Box2D.inherit(N, Box2D.Dynamics.Joints.b2JointDef);
  N.prototype.__super = Box2D.Dynamics.Joints.b2JointDef.prototype;
  N.b2WeldJointDef = function() {
    Box2D.Dynamics.Joints.b2JointDef.b2JointDef.apply(this, arguments);
    this.localAnchorA = new e;
    this.localAnchorB = new e
  };
  N.prototype.b2WeldJointDef = function() {
    this.__super.b2JointDef.call(this);
    this.type = q.e_weldJoint;
    this.referenceAngle = 0
  };
  N.prototype.Initialize = function(a, b, e) {
    this.bodyA = a;
    this.bodyB = b;
    this.localAnchorA.SetV(this.bodyA.GetLocalPoint(e));
    this.localAnchorB.SetV(this.bodyB.GetLocalPoint(e));
    this.referenceAngle = this.bodyB.GetAngle() - this.bodyA.GetAngle()
  }
})();
Box2D.Post = {};
var i;
for(i = 0;i < Box2D.postDefs.length;++i) {
  Box2D.postDefs[i]()
}
delete Box2D.postDefs;
game = game || {};
game.ai = game.ai || {};
(function(a) {
  var d = [];
  a.addThinker = function(a) {
    if(typeof a.think != "function") {
      throw"Thinker can't think!";
    }
    if(a.tIdx != null) {
      throw"Thinker already added!";
    }
    a.tIdx = d.push(a)
  };
  a.removeThinker = function(a) {
    if(a.tIdx != null) {
      throw"Thinker not added (or already removed)!";
    }
    d[a.tIdx] = null;
    a.tIdx = null
  };
  a.think = function(a, f) {
    for(var e = [], g = 0;g < d.length;g++) {
      var h = d[g];
      if(h != null) {
        h.tIdx = e.push(d[g]), h.think(a, f)
      }
    }
    d = e
  }
})(game.ai);
var game = game || {};
game.animations = game.animations || {};
(function(a) {
  a.setSpriteSheet = function(a, b, f, e, g, h, j) {
    game.ui.setDisplaySize(a, b);
    game.ui.setImage(a, f);
    a.display.spriteSheet.offset = e;
    a.display.spriteSheet.frameSize = g;
    a.display.spriteSheet.frames = h;
    a.display.spriteSheet.frameSpeed = j;
    a.display.spriteSheet.frameTick = 0;
    a.display.spriteSheet.frameOffset = new Box2D.Common.Math.b2Vec2(0, 0);
    a.display.spriteSheet.frameDir = {a:0, x:0, y:2}
  };
  a.setAsFourDirectionalAnimation = function(d, b, f, e, g, h, j) {
    a.setSpriteSheet(d, b, f, e, g, h, j);
    if(d.think) {
      var l = d.think;
      d.think = function(b, e) {
        l(b, e);
        a.fourDirectionalAnimation(b, e, d)
      }
    }else {
      d.think = function(b, e) {
        a.fourDirectionalAnimation(b, e, d)
      }, game.ai.addThinker(d)
    }
  };
  a.fourDirectionalAnimation = function(a, b, f) {
    a = f.display.spriteSheet;
    a.frameTick += b;
    var b = f.GetLinearVelocity(), f = Math.abs(b.x), e = Math.abs(b.y);
    if(e < 0.01 || f >= e) {
      if(b.x > 0.01) {
        if(a.frameDir.x = 0, a.frameDir.a != 0) {
          a.frameDir.a = 0, a.frameTick = 0
        }
      }else {
        if(b.x < -0.01) {
          if(a.frameDir.x = 1, a.frameDir.a != 1) {
            a.frameDir.a = 1, a.frameTick = 0
          }
        }else {
          a.frameTick = 0
        }
      }
      a.frameOffset.y = a.frameDir.x == 1 ? a.frameSize.y * 3 + a.offset.y : a.frameSize.y + a.offset.y
    }else {
      if(b.y > 0.01) {
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
  a.eightDirectionalAnimation = function(a, b, f) {
    a = f.GetLinearVelocity();
    Math.abs(a.x);
    Math.abs(a.y);
    f = illandril.game.ui.BasicDirectionalAnimation.Direction.N;
    a = Math.abs(directionVector.x);
    b = Math.abs(directionVector.y);
    f = a > 2 * b ? directionVector.x > 0 ? illandril.game.ui.BasicDirectionalAnimation.Direction.E : illandril.game.ui.BasicDirectionalAnimation.Direction.W : b > 2 * a ? directionVector.y < 0 ? illandril.game.ui.BasicDirectionalAnimation.Direction.S : illandril.game.ui.BasicDirectionalAnimation.Direction.N : directionVector.y < 0 ? directionVector.x > 0 ? illandril.game.ui.BasicDirectionalAnimation.Direction.SE : illandril.game.ui.BasicDirectionalAnimation.Direction.SW : directionVector.x > 0 ? 
    illandril.game.ui.BasicDirectionalAnimation.Direction.NE : illandril.game.ui.BasicDirectionalAnimation.Direction.NW;
    if(f != this.lastDirection) {
      this.directionTime = 0, this.lastDirection = f
    }
    a = 0;
    b = Math.round((this.directionTime + 1) / this.mspf) % this.frames;
    speedVector.squaredMagnitude() != 0 || this.lastFrame != 0 ? (this.directionTime += tickTime, this.lastFrame = b) : b = this.lastFrame = this.directionTime = 0;
    switch(f) {
      case illandril.game.ui.BasicDirectionalAnimation.Direction.N:
        a = 0;
        break;
      case illandril.game.ui.BasicDirectionalAnimation.Direction.NE:
        a = 0;
        b += this.frames;
        break;
      case illandril.game.ui.BasicDirectionalAnimation.Direction.E:
        a = 1;
        break;
      case illandril.game.ui.BasicDirectionalAnimation.Direction.SE:
        a = 1;
        b += this.frames;
        break;
      case illandril.game.ui.BasicDirectionalAnimation.Direction.S:
        a = 2;
        break;
      case illandril.game.ui.BasicDirectionalAnimation.Direction.SW:
        a = 2;
        b += this.frames;
        break;
      case illandril.game.ui.BasicDirectionalAnimation.Direction.W:
        a = 3;
        break;
      case illandril.game.ui.BasicDirectionalAnimation.Direction.NW:
        a = 3, b += this.frames
    }
    f = a * this.tileHeight;
    isNaN(b * this.tileWidth) && illandril.DEBUG && illandril.getLogger("game.ui.BasicDirectionalAnimation").shout("BAD SPRITE X -- sX: " + b + "; DT: " + this.directionTime + "; MSPF: " + this.mspf + "; Width: " + this.tileWidth);
    isNaN(f) && illandril.DEBUG && illandril.getLogger("game.ui.SpriteSheet").shout("BAD SPRITE Y -- sY: " + a + "; GT: " + gameTime + "; MSPF: " + this.mspf + "; Height: " + this.tileHeight);
    return{src:this.src, x:b * this.tileWidth, y:a * this.tileHeight}
  }
})(game.animations);
game = game || {};
game.world = game.world || {};
(function(a) {
  var d = new Box2D.Dynamics.b2FixtureDef, b = new Box2D.Dynamics.b2BodyDef, f = null, e = null, g = null, h = [], j = [], l = {density:0.1, friction:0.5, restitution:0.01, isSensor:!1}, k = {fixedRotation:!1, angle:0, type:Box2D.Dynamics.b2Body.b2_dynamicBody}, o = function(a, b) {
    var a = a || {}, e = {}, d;
    for(d in b) {
      e[d] = a[d] === void 0 || a[d] === null ? b[d] : a[d]
    }
    return e
  };
  a.init = function(b, d) {
    f = new Box2D.Dynamics.b2World(d, !0);
    f.SetContactFilter(a);
    f.SetContactListener(a);
    e = b.x;
    g = b.y;
    a.top = a.createStaticBox(new Box2D.Common.Math.b2Vec2(e, 1), new Box2D.Common.Math.b2Vec2(e / 2, 0), !0, null, {friction:0});
    game.ui.setImage(a.top.body, "graphics/border.png");
    a.bottom = a.createStaticBox(new Box2D.Common.Math.b2Vec2(e, 1), new Box2D.Common.Math.b2Vec2(e / 2, g), !0, null, {friction:0});
    game.ui.setImage(a.bottom.body, "graphics/border.png");
    a.left = a.createStaticBox(new Box2D.Common.Math.b2Vec2(1, g), new Box2D.Common.Math.b2Vec2(0, g / 2), !0, null, {friction:0});
    game.ui.setImage(a.left.body, "graphics/border.png");
    a.right = a.createStaticBox(new Box2D.Common.Math.b2Vec2(1, g), new Box2D.Common.Math.b2Vec2(e, g / 2), !0, null, {friction:0});
    game.ui.setImage(a.right.body, "graphics/border.png")
  };
  a.update = function(a, b) {
    f.Step(b, 10, 10);
    f.DrawDebugData();
    f.ClearForces();
    if(j.length > 0) {
      for(var e = 0;e < j.length;e++) {
        f.DestroyBody(j[e].body)
      }
      j = []
    }
  };
  a.getBox2DWorld = function() {
    return f
  };
  a.addCollisionFilter = function(a) {
    h.push(a)
  };
  a.RayCollide = function(a, b) {
    if(!b.IsSensor()) {
      for(var e = 0;e < h.length;e++) {
        if(h[e].RayCollide && !h[e].RayCollide(a, b)) {
          return!1
        }
      }
    }
    return Box2D.Dynamics.b2ContactFilter.prototype.RayCollide(a, b)
  };
  a.ShouldCollide = function(a, b) {
    if(!a.IsSensor() && !b.IsSensor()) {
      for(var e = 0;e < h.length;e++) {
        if(h[e].ShouldCollide && !h[e].ShouldCollide(a, b)) {
          return!1
        }
      }
    }
    return Box2D.Dynamics.b2ContactFilter.prototype.ShouldCollide(a, b)
  };
  a.BeginContact = function(a) {
    for(var b = 0;b < h.length;b++) {
      h[b].ValidateBeginContact && h[b].ValidateBeginContact(a), a.disabled && a.SetEnabled(!1), h[b].BeginContact && h[b].BeginContact(a)
    }
  };
  a.EndContact = function(a) {
    for(var b = 0;b < h.length;b++) {
      h[b].EndContact && h[b].EndContact(a)
    }
    a.disabled = !1;
    a.SetEnabled(!0)
  };
  a.PreSolve = function(a, b) {
    a.disabled && a.SetEnabled(!1);
    for(var e = 0;e < h.length;e++) {
      h[e].PreSolve && h[e].PreSolve(a, b)
    }
  };
  a.PostSolve = function(a, b) {
    for(var e = 0;e < h.length;e++) {
      h[e].PostSolve && h[e].PostSolve(a, b)
    }
  };
  a.getBox2DBodyDefinition = function() {
    return b
  };
  a.getBox2DFixtureDefinition = function() {
    return d
  };
  a.getWorldWidth = function() {
    return e
  };
  a.getWorldHeight = function() {
    return g
  };
  a.createStaticBox = function(b, e, d, g, f) {
    g = g || {};
    g.type = Box2D.Dynamics.b2Body.b2_staticBody;
    return a.createBox(b, e, d, g, f)
  };
  a.createBox = function(b, e, d, g, f) {
    var h = new Box2D.Collision.Shapes.b2PolygonShape;
    h.SetAsBox(b.x / 2, b.y / 2);
    return a.createObject(b, e, d !== !1, g, f, h)
  };
  a.createObject = function(e, d, g, h, j, l) {
    h = o(h, k);
    b.type = h.type;
    b.angle = h.angle;
    b.fixedRotation = h.fixedRotation;
    b.position = d;
    d = f.CreateBody(b);
    fixture = a.addFixture(d, j, l);
    g && game.ui.setDisplaySize(d, new Box2D.Common.Math.b2Vec2(e.x, e.y));
    e = {body:d, fixture:fixture};
    return d.object = e
  };
  a.addFixture = function(a, b, e) {
    b = o(b, l);
    d.density = b.density;
    d.friction = b.friction;
    d.restitution = b.restitution;
    d.isSensor = b.isSensor;
    d.shape = e;
    return a.CreateFixture(d)
  };
  a.destroyObject = function(a) {
    j.push(a)
  }
})(game.world);
game.ui = {};
game = game || {};
(function(a) {
  var d = 0;
  d |= Box2D.Dynamics.b2DebugDraw.e_aabbBit;
  d |= Box2D.Dynamics.b2DebugDraw.e_pairBit;
  d |= Box2D.Dynamics.b2DebugDraw.e_shapeBit;
  var b = 0, f = {}, e = null, g = null, h = null, j = null, l = null, k = null, o = null, m = new Box2D.Common.Math.b2Vec2(0, 0), s = new Box2D.Common.Math.b2Vec2(0, 0);
  a.ui = {};
  a.ui.getDisplayDOMObject = function() {
    return k
  };
  a.ui.initDisplay = function(b, f, m, s) {
    e = f;
    g = m.x;
    h = m.y;
    j = g / e;
    l = h / e;
    a.ui.lookAt(new Box2D.Common.Math.b2Vec2(0, 0));
    f = document.getElementById(b);
    m = document.createElement("span");
    if(s) {
      f.innerHTML = '<div style="width: ' + g + "px; height: " + h / 2 + 'px; background-color: #000; opacity: 0.15; position: absolute;"></div><div style="width: ' + g / 2 + "px; height: " + h + 'px; background-color: #FFF; opacity: 0.15; position: absolute;"></div>', m.innerHTML = '<canvas id="' + b + '__DEBUG" class="debugViewport"></canvas>'
    }
    m.className = "viewportContainer";
    m.style.width = g + "px";
    m.style.height = h + "px";
    k = document.createElement("span");
    k.className = "viewport";
    m.appendChild(k);
    f.appendChild(m);
    if(s) {
      o = document.getElementById(b + "__DEBUG"), o.width = a.world.getWorldWidth() * e, o.height = a.world.getWorldHeight() * e, o.style.marginRight = "-" + o.width + "px", o.style.marginBottom = "-" + o.height + "px", b = new Box2D.Dynamics.b2DebugDraw, b.SetSprite(o.getContext("2d")), b.SetDrawScale(e), b.SetFillAlpha(0.3), b.SetLineThickness(1), b.SetFlags(d), a.world.getBox2DWorld().SetDebugDraw(b)
    }
  };
  a.ui.lookAt = function(b) {
    m.x = b.x - j / 2;
    m.y = b.y - l / 2;
    if(m.x < 0) {
      m.x = 0
    }else {
      if(m.x > a.world.getWorldWidth() - j) {
        m.x = a.world.getWorldWidth() - j
      }
    }
    if(m.y < 0) {
      m.y = 0
    }else {
      if(m.y > a.world.getWorldHeight() - l) {
        m.y = a.world.getWorldHeight() - l
      }
    }
  };
  a.ui.draw = function() {
    if(k == null) {
      throw"Display not yet initialized!";
    }
    if(s.x != m.x || s.y != m.y) {
      s.x = m.x;
      s.y = m.y;
      if(o != null) {
        o.style.left = "-" + m.x * e + "px", o.style.top = "-" + m.y * e + "px"
      }
      k.style.left = "-" + m.x * e + "px";
      k.style.top = "-" + m.y * e + "px"
    }
    var d = {}, g;
    for(g in f) {
      d[g] = f[g]
    }
    for(var h = a.world.getBox2DWorld().GetBodyList();h != null;) {
      if(h.display != null) {
        var j = h.GetPosition(), l = h.display.size;
        if(h.display.viewID == null) {
          h.display.viewID = b++
        }
        delete d[h.display.viewID];
        if(f[h.display.viewID] == null) {
          f[h.display.viewID] = document.createElement("span"), f[h.display.viewID].className = "gameObject", f[h.display.viewID].savedStyle = {}, k.appendChild(f[h.display.viewID])
        }
        var x = f[h.display.viewID], F = (j.x - l.x / 2) * e;
        if(x.savedStyle.left != F) {
          x.savedStyle.left = F, x.style.left = F + "px"
        }
        j = (j.y - l.y / 2) * e;
        if(x.savedStyle.top != j) {
          x.savedStyle.top = j, x.style.top = j + "px"
        }
        j = l.x * e;
        if(x.savedStyle.width != j) {
          x.savedStyle.width = j, x.style.width = j + "px"
        }
        l = l.y * e;
        if(x.savedStyle.height != l) {
          x.savedStyle.height = l, x.style.height = l + "px"
        }
        l = h.GetAngle();
        if(x.savedStyle.rotation != l) {
          x.savedStyle.rotation = l, x.style.webkitTransform = "rotate(" + l + "rad)"
        }
        if(h.display.spriteSheet != null) {
          l = h.display.spriteSheet.url;
          if(x.savedStyle.bg != l) {
            x.savedStyle.bg = l, x.style.backgroundImage = "url(" + l + ")", x.style.backgroundColor = "transparent"
          }
          l = h.display.spriteSheet.frameOffset;
          if(l != null && (x.savedStyle.bgPosX != l.x || x.savedStyle.bgPosY != l.y)) {
            x.savedStyle.bgPosX = l.x, x.savedStyle.bgPosY = l.y, x.style.backgroundPosition = l.x * -1 + "px " + l.y * -1 + "px"
          }
        }
      }
      h = h.GetNext()
    }
    for(g in d) {
      x = d[g], k.removeChild(x), delete f[g]
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
  var d = 0, b = 60, f = 0, e = null;
  a.init = function(b, g, f, k, o, m, s) {
    e = b;
    d = document.getElementById("fps");
    a.world.init(f, k);
    a.ui.initDisplay(g, m, o, s)
  };
  a.start = function() {
    window.requestAnimFrame(g, a.ui.getDisplayDOMObject())
  };
  var g = function(h) {
    h == null && (h = (new Date).getTime());
    var j = 0;
    f != 0 ? j = (h - f) / 1E3 : f = h;
    if(j > 0.015) {
      if(d) {
        var l = 1 / j;
        b = b * 0.99 + l * 0.01;
        d.innerHTML = Math.round(l) + " - " + Math.round(b)
      }
      j > 0.04 && (j = 0.04);
      f = h;
      e.preThink && e.preThink(h, j);
      a.ai.think(h, j);
      e.preUpdate && e.preUpdate(h, j);
      a.world.update(h, j);
      e.preDraw && e.preDraw(h, j);
      a.ui.draw(h, j)
    }
    window.requestAnimFrame(g, a.ui.getDisplayDOMObject())
  }
})(game);
goog.string = {};
goog.string.Unicode = {NBSP:"\u00a0"};
goog.string.startsWith = function(a, d) {
  return a.lastIndexOf(d, 0) == 0
};
goog.string.endsWith = function(a, d) {
  var b = a.length - d.length;
  return b >= 0 && a.indexOf(d, b) == b
};
goog.string.caseInsensitiveStartsWith = function(a, d) {
  return goog.string.caseInsensitiveCompare(d, a.substr(0, d.length)) == 0
};
goog.string.caseInsensitiveEndsWith = function(a, d) {
  return goog.string.caseInsensitiveCompare(d, a.substr(a.length - d.length, d.length)) == 0
};
goog.string.subs = function(a, d) {
  for(var b = 1;b < arguments.length;b++) {
    var f = String(arguments[b]).replace(/\$/g, "$$$$"), a = a.replace(/\%s/, f)
  }
  return a
};
goog.string.collapseWhitespace = function(a) {
  return a.replace(/[\s\xa0]+/g, " ").replace(/^\s+|\s+$/g, "")
};
goog.string.isEmpty = function(a) {
  return/^[\s\xa0]*$/.test(a)
};
goog.string.isEmptySafe = function(a) {
  return goog.string.isEmpty(goog.string.makeSafe(a))
};
goog.string.isBreakingWhitespace = function(a) {
  return!/[^\t\n\r ]/.test(a)
};
goog.string.isAlpha = function(a) {
  return!/[^a-zA-Z]/.test(a)
};
goog.string.isNumeric = function(a) {
  return!/[^0-9]/.test(a)
};
goog.string.isAlphaNumeric = function(a) {
  return!/[^a-zA-Z0-9]/.test(a)
};
goog.string.isSpace = function(a) {
  return a == " "
};
goog.string.isUnicodeChar = function(a) {
  return a.length == 1 && a >= " " && a <= "~" || a >= "\u0080" && a <= "\ufffd"
};
goog.string.stripNewlines = function(a) {
  return a.replace(/(\r\n|\r|\n)+/g, " ")
};
goog.string.canonicalizeNewlines = function(a) {
  return a.replace(/(\r\n|\r|\n)/g, "\n")
};
goog.string.normalizeWhitespace = function(a) {
  return a.replace(/\xa0|\s/g, " ")
};
goog.string.normalizeSpaces = function(a) {
  return a.replace(/\xa0|[ \t]+/g, " ")
};
goog.string.collapseBreakingSpaces = function(a) {
  return a.replace(/[\t\r\n ]+/g, " ").replace(/^[\t\r\n ]+|[\t\r\n ]+$/g, "")
};
goog.string.trim = function(a) {
  return a.replace(/^[\s\xa0]+|[\s\xa0]+$/g, "")
};
goog.string.trimLeft = function(a) {
  return a.replace(/^[\s\xa0]+/, "")
};
goog.string.trimRight = function(a) {
  return a.replace(/[\s\xa0]+$/, "")
};
goog.string.caseInsensitiveCompare = function(a, d) {
  var b = String(a).toLowerCase(), f = String(d).toLowerCase();
  return b < f ? -1 : b == f ? 0 : 1
};
goog.string.numerateCompareRegExp_ = /(\.\d+)|(\d+)|(\D+)/g;
goog.string.numerateCompare = function(a, d) {
  if(a == d) {
    return 0
  }
  if(!a) {
    return-1
  }
  if(!d) {
    return 1
  }
  for(var b = a.toLowerCase().match(goog.string.numerateCompareRegExp_), f = d.toLowerCase().match(goog.string.numerateCompareRegExp_), e = Math.min(b.length, f.length), g = 0;g < e;g++) {
    var h = b[g], j = f[g];
    if(h != j) {
      b = parseInt(h, 10);
      return!isNaN(b) && (f = parseInt(j, 10), !isNaN(f) && b - f) ? b - f : h < j ? -1 : 1
    }
  }
  return b.length != f.length ? b.length - f.length : a < d ? -1 : 1
};
goog.string.encodeUriRegExp_ = /^[a-zA-Z0-9\-_.!~*'()]*$/;
goog.string.urlEncode = function(a) {
  a = String(a);
  return!goog.string.encodeUriRegExp_.test(a) ? encodeURIComponent(a) : a
};
goog.string.urlDecode = function(a) {
  return decodeURIComponent(a.replace(/\+/g, " "))
};
goog.string.newLineToBr = function(a, d) {
  return a.replace(/(\r\n|\r|\n)/g, d ? "<br />" : "<br>")
};
goog.string.htmlEscape = function(a, d) {
  if(d) {
    return a.replace(goog.string.amperRe_, "&amp;").replace(goog.string.ltRe_, "&lt;").replace(goog.string.gtRe_, "&gt;").replace(goog.string.quotRe_, "&quot;")
  }else {
    if(!goog.string.allRe_.test(a)) {
      return a
    }
    a.indexOf("&") != -1 && (a = a.replace(goog.string.amperRe_, "&amp;"));
    a.indexOf("<") != -1 && (a = a.replace(goog.string.ltRe_, "&lt;"));
    a.indexOf(">") != -1 && (a = a.replace(goog.string.gtRe_, "&gt;"));
    a.indexOf('"') != -1 && (a = a.replace(goog.string.quotRe_, "&quot;"));
    return a
  }
};
goog.string.amperRe_ = /&/g;
goog.string.ltRe_ = /</g;
goog.string.gtRe_ = />/g;
goog.string.quotRe_ = /\"/g;
goog.string.allRe_ = /[&<>\"]/;
goog.string.unescapeEntities = function(a) {
  return goog.string.contains(a, "&") ? "document" in goog.global ? goog.string.unescapeEntitiesUsingDom_(a) : goog.string.unescapePureXmlEntities_(a) : a
};
goog.string.unescapeEntitiesUsingDom_ = function(a) {
  var d = {"&amp;":"&", "&lt;":"<", "&gt;":">", "&quot;":'"'}, b = document.createElement("div");
  return a.replace(goog.string.HTML_ENTITY_PATTERN_, function(a, e) {
    var g = d[a];
    if(g) {
      return g
    }
    if(e.charAt(0) == "#") {
      var h = Number("0" + e.substr(1));
      isNaN(h) || (g = String.fromCharCode(h))
    }
    if(!g) {
      b.innerHTML = a + " ", g = b.firstChild.nodeValue.slice(0, -1)
    }
    return d[a] = g
  })
};
goog.string.unescapePureXmlEntities_ = function(a) {
  return a.replace(/&([^;]+);/g, function(a, b) {
    switch(b) {
      case "amp":
        return"&";
      case "lt":
        return"<";
      case "gt":
        return">";
      case "quot":
        return'"';
      default:
        if(b.charAt(0) == "#") {
          var f = Number("0" + b.substr(1));
          if(!isNaN(f)) {
            return String.fromCharCode(f)
          }
        }
        return a
    }
  })
};
goog.string.HTML_ENTITY_PATTERN_ = /&([^;\s<&]+);?/g;
goog.string.whitespaceEscape = function(a, d) {
  return goog.string.newLineToBr(a.replace(/  /g, " &#160;"), d)
};
goog.string.stripQuotes = function(a, d) {
  for(var b = d.length, f = 0;f < b;f++) {
    var e = b == 1 ? d : d.charAt(f);
    if(a.charAt(0) == e && a.charAt(a.length - 1) == e) {
      return a.substring(1, a.length - 1)
    }
  }
  return a
};
goog.string.truncate = function(a, d, b) {
  b && (a = goog.string.unescapeEntities(a));
  a.length > d && (a = a.substring(0, d - 3) + "...");
  b && (a = goog.string.htmlEscape(a));
  return a
};
goog.string.truncateMiddle = function(a, d, b, f) {
  b && (a = goog.string.unescapeEntities(a));
  if(f && a.length > d) {
    f > d && (f = d);
    var e = a.length - f, a = a.substring(0, d - f) + "..." + a.substring(e)
  }else {
    a.length > d && (f = Math.floor(d / 2), e = a.length - f, f += d % 2, a = a.substring(0, f) + "..." + a.substring(e))
  }
  b && (a = goog.string.htmlEscape(a));
  return a
};
goog.string.specialEscapeChars_ = {"\x00":"\\0", "\u0008":"\\b", "\u000c":"\\f", "\n":"\\n", "\r":"\\r", "\t":"\\t", "\u000b":"\\x0B", '"':'\\"', "\\":"\\\\"};
goog.string.jsEscapeCache_ = {"'":"\\'"};
goog.string.quote = function(a) {
  a = String(a);
  if(a.quote) {
    return a.quote()
  }else {
    for(var d = ['"'], b = 0;b < a.length;b++) {
      var f = a.charAt(b), e = f.charCodeAt(0);
      d[b + 1] = goog.string.specialEscapeChars_[f] || (e > 31 && e < 127 ? f : goog.string.escapeChar(f))
    }
    d.push('"');
    return d.join("")
  }
};
goog.string.escapeString = function(a) {
  for(var d = [], b = 0;b < a.length;b++) {
    d[b] = goog.string.escapeChar(a.charAt(b))
  }
  return d.join("")
};
goog.string.escapeChar = function(a) {
  if(a in goog.string.jsEscapeCache_) {
    return goog.string.jsEscapeCache_[a]
  }
  if(a in goog.string.specialEscapeChars_) {
    return goog.string.jsEscapeCache_[a] = goog.string.specialEscapeChars_[a]
  }
  var d = a, b = a.charCodeAt(0);
  if(b > 31 && b < 127) {
    d = a
  }else {
    if(b < 256) {
      if(d = "\\x", b < 16 || b > 256) {
        d += "0"
      }
    }else {
      d = "\\u", b < 4096 && (d += "0")
    }
    d += b.toString(16).toUpperCase()
  }
  return goog.string.jsEscapeCache_[a] = d
};
goog.string.toMap = function(a) {
  for(var d = {}, b = 0;b < a.length;b++) {
    d[a.charAt(b)] = !0
  }
  return d
};
goog.string.contains = function(a, d) {
  return a.indexOf(d) != -1
};
goog.string.removeAt = function(a, d, b) {
  var f = a;
  d >= 0 && d < a.length && b > 0 && (f = a.substr(0, d) + a.substr(d + b, a.length - d - b));
  return f
};
goog.string.remove = function(a, d) {
  var b = RegExp(goog.string.regExpEscape(d), "");
  return a.replace(b, "")
};
goog.string.removeAll = function(a, d) {
  var b = RegExp(goog.string.regExpEscape(d), "g");
  return a.replace(b, "")
};
goog.string.regExpEscape = function(a) {
  return String(a).replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, "\\$1").replace(/\x08/g, "\\x08")
};
goog.string.repeat = function(a, d) {
  return Array(d + 1).join(a)
};
goog.string.padNumber = function(a, d, b) {
  a = goog.isDef(b) ? a.toFixed(b) : String(a);
  b = a.indexOf(".");
  if(b == -1) {
    b = a.length
  }
  return goog.string.repeat("0", Math.max(0, d - b)) + a
};
goog.string.makeSafe = function(a) {
  return a == null ? "" : String(a)
};
goog.string.buildString = function(a) {
  return Array.prototype.join.call(arguments, "")
};
goog.string.getRandomString = function() {
  return Math.floor(Math.random() * 2147483648).toString(36) + Math.abs(Math.floor(Math.random() * 2147483648) ^ goog.now()).toString(36)
};
goog.string.compareVersions = function(a, d) {
  for(var b = 0, f = goog.string.trim(String(a)).split("."), e = goog.string.trim(String(d)).split("."), g = Math.max(f.length, e.length), h = 0;b == 0 && h < g;h++) {
    var j = f[h] || "", l = e[h] || "", k = RegExp("(\\d*)(\\D*)", "g"), o = RegExp("(\\d*)(\\D*)", "g");
    do {
      var m = k.exec(j) || ["", "", ""], s = o.exec(l) || ["", "", ""];
      if(m[0].length == 0 && s[0].length == 0) {
        break
      }
      var b = m[1].length == 0 ? 0 : parseInt(m[1], 10), q = s[1].length == 0 ? 0 : parseInt(s[1], 10), b = goog.string.compareElements_(b, q) || goog.string.compareElements_(m[2].length == 0, s[2].length == 0) || goog.string.compareElements_(m[2], s[2])
    }while(b == 0)
  }
  return b
};
goog.string.compareElements_ = function(a, d) {
  if(a < d) {
    return-1
  }else {
    if(a > d) {
      return 1
    }
  }
  return 0
};
goog.string.HASHCODE_MAX_ = 4294967296;
goog.string.hashCode = function(a) {
  for(var d = 0, b = 0;b < a.length;++b) {
    d = 31 * d + a.charCodeAt(b), d %= goog.string.HASHCODE_MAX_
  }
  return d
};
goog.string.uniqueStringCounter_ = Math.random() * 2147483648 | 0;
goog.string.createUniqueString = function() {
  return"goog_" + goog.string.uniqueStringCounter_++
};
goog.string.toNumber = function(a) {
  var d = Number(a);
  return d == 0 && goog.string.isEmpty(a) ? NaN : d
};
goog.string.toCamelCaseCache_ = {};
goog.string.toCamelCase = function(a) {
  return goog.string.toCamelCaseCache_[a] || (goog.string.toCamelCaseCache_[a] = String(a).replace(/\-([a-z])/g, function(a, b) {
    return b.toUpperCase()
  }))
};
goog.string.toSelectorCaseCache_ = {};
goog.string.toSelectorCase = function(a) {
  return goog.string.toSelectorCaseCache_[a] || (goog.string.toSelectorCaseCache_[a] = String(a).replace(/([A-Z])/g, "-$1").toLowerCase())
};
goog.userAgent = {};
goog.userAgent.ASSUME_IE = !1;
goog.userAgent.ASSUME_GECKO = !1;
goog.userAgent.ASSUME_WEBKIT = !1;
goog.userAgent.ASSUME_MOBILE_WEBKIT = !1;
goog.userAgent.ASSUME_OPERA = !1;
goog.userAgent.BROWSER_KNOWN_ = goog.userAgent.ASSUME_IE || goog.userAgent.ASSUME_GECKO || goog.userAgent.ASSUME_MOBILE_WEBKIT || goog.userAgent.ASSUME_WEBKIT || goog.userAgent.ASSUME_OPERA;
goog.userAgent.getUserAgentString = function() {
  return goog.global.navigator ? goog.global.navigator.userAgent : null
};
goog.userAgent.getNavigator = function() {
  return goog.global.navigator
};
goog.userAgent.init_ = function() {
  goog.userAgent.detectedOpera_ = !1;
  goog.userAgent.detectedIe_ = !1;
  goog.userAgent.detectedWebkit_ = !1;
  goog.userAgent.detectedMobile_ = !1;
  goog.userAgent.detectedGecko_ = !1;
  var a;
  if(!goog.userAgent.BROWSER_KNOWN_ && (a = goog.userAgent.getUserAgentString())) {
    var d = goog.userAgent.getNavigator();
    goog.userAgent.detectedOpera_ = a.indexOf("Opera") == 0;
    goog.userAgent.detectedIe_ = !goog.userAgent.detectedOpera_ && a.indexOf("MSIE") != -1;
    goog.userAgent.detectedWebkit_ = !goog.userAgent.detectedOpera_ && a.indexOf("WebKit") != -1;
    goog.userAgent.detectedMobile_ = goog.userAgent.detectedWebkit_ && a.indexOf("Mobile") != -1;
    goog.userAgent.detectedGecko_ = !goog.userAgent.detectedOpera_ && !goog.userAgent.detectedWebkit_ && d.product == "Gecko"
  }
};
goog.userAgent.BROWSER_KNOWN_ || goog.userAgent.init_();
goog.userAgent.OPERA = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_OPERA : goog.userAgent.detectedOpera_;
goog.userAgent.IE = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_IE : goog.userAgent.detectedIe_;
goog.userAgent.GECKO = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_GECKO : goog.userAgent.detectedGecko_;
goog.userAgent.WEBKIT = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_WEBKIT || goog.userAgent.ASSUME_MOBILE_WEBKIT : goog.userAgent.detectedWebkit_;
goog.userAgent.MOBILE = goog.userAgent.ASSUME_MOBILE_WEBKIT || goog.userAgent.detectedMobile_;
goog.userAgent.SAFARI = goog.userAgent.WEBKIT;
goog.userAgent.determinePlatform_ = function() {
  var a = goog.userAgent.getNavigator();
  return a && a.platform || ""
};
goog.userAgent.PLATFORM = goog.userAgent.determinePlatform_();
goog.userAgent.ASSUME_MAC = !1;
goog.userAgent.ASSUME_WINDOWS = !1;
goog.userAgent.ASSUME_LINUX = !1;
goog.userAgent.ASSUME_X11 = !1;
goog.userAgent.PLATFORM_KNOWN_ = goog.userAgent.ASSUME_MAC || goog.userAgent.ASSUME_WINDOWS || goog.userAgent.ASSUME_LINUX || goog.userAgent.ASSUME_X11;
goog.userAgent.initPlatform_ = function() {
  goog.userAgent.detectedMac_ = goog.string.contains(goog.userAgent.PLATFORM, "Mac");
  goog.userAgent.detectedWindows_ = goog.string.contains(goog.userAgent.PLATFORM, "Win");
  goog.userAgent.detectedLinux_ = goog.string.contains(goog.userAgent.PLATFORM, "Linux");
  goog.userAgent.detectedX11_ = !!goog.userAgent.getNavigator() && goog.string.contains(goog.userAgent.getNavigator().appVersion || "", "X11")
};
goog.userAgent.PLATFORM_KNOWN_ || goog.userAgent.initPlatform_();
goog.userAgent.MAC = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_MAC : goog.userAgent.detectedMac_;
goog.userAgent.WINDOWS = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_WINDOWS : goog.userAgent.detectedWindows_;
goog.userAgent.LINUX = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_LINUX : goog.userAgent.detectedLinux_;
goog.userAgent.X11 = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_X11 : goog.userAgent.detectedX11_;
goog.userAgent.determineVersion_ = function() {
  var a = "", d;
  goog.userAgent.OPERA && goog.global.opera ? (a = goog.global.opera.version, a = typeof a == "function" ? a() : a) : (goog.userAgent.GECKO ? d = /rv\:([^\);]+)(\)|;)/ : goog.userAgent.IE ? d = /MSIE\s+([^\);]+)(\)|;)/ : goog.userAgent.WEBKIT && (d = /WebKit\/(\S+)/), d && (a = (a = d.exec(goog.userAgent.getUserAgentString())) ? a[1] : ""));
  return goog.userAgent.IE && (d = goog.userAgent.getDocumentMode_(), d > parseFloat(a)) ? String(d) : a
};
goog.userAgent.getDocumentMode_ = function() {
  var a = goog.global.document;
  return a ? a.documentMode : void 0
};
goog.userAgent.VERSION = goog.userAgent.determineVersion_();
goog.userAgent.compare = function(a, d) {
  return goog.string.compareVersions(a, d)
};
goog.userAgent.isVersionCache_ = {};
goog.userAgent.isVersion = function(a) {
  return goog.userAgent.isVersionCache_[a] || (goog.userAgent.isVersionCache_[a] = goog.string.compareVersions(goog.userAgent.VERSION, a) >= 0)
};
goog.userAgent.isDocumentModeCache_ = {};
goog.userAgent.isDocumentMode = function(a) {
  return goog.userAgent.isDocumentModeCache_[a] || (goog.userAgent.isDocumentModeCache_[a] = goog.userAgent.IE && document.documentMode && document.documentMode >= a)
};
goog.events = {};
goog.events.KeyNames = {8:"backspace", 9:"tab", 13:"enter", 16:"shift", 17:"ctrl", 18:"alt", 19:"pause", 20:"caps-lock", 27:"esc", 32:"space", 33:"pg-up", 34:"pg-down", 35:"end", 36:"home", 37:"left", 38:"up", 39:"right", 40:"down", 45:"insert", 46:"delete", 48:"0", 49:"1", 50:"2", 51:"3", 52:"4", 53:"5", 54:"6", 55:"7", 56:"8", 57:"9", 61:"equals", 65:"a", 66:"b", 67:"c", 68:"d", 69:"e", 70:"f", 71:"g", 72:"h", 73:"i", 74:"j", 75:"k", 76:"l", 77:"m", 78:"n", 79:"o", 80:"p", 81:"q", 82:"r", 83:"s", 
84:"t", 85:"u", 86:"v", 87:"w", 88:"x", 89:"y", 90:"z", 93:"context", 96:"num-0", 97:"num-1", 98:"num-2", 99:"num-3", 100:"num-4", 101:"num-5", 102:"num-6", 103:"num-7", 104:"num-8", 105:"num-9", 106:"num-multiply", 107:"num-plus", 109:"num-minus", 110:"num-period", 111:"num-division", 112:"f1", 113:"f2", 114:"f3", 115:"f4", 116:"f5", 117:"f6", 118:"f7", 119:"f8", 120:"f9", 121:"f10", 122:"f11", 123:"f12", 187:"equals", 188:",", 190:".", 191:"/", 220:"\\", 224:"win"};
goog.events.KeyCodes = {MAC_ENTER:3, BACKSPACE:8, TAB:9, NUM_CENTER:12, ENTER:13, SHIFT:16, CTRL:17, ALT:18, PAUSE:19, CAPS_LOCK:20, ESC:27, SPACE:32, PAGE_UP:33, PAGE_DOWN:34, END:35, HOME:36, LEFT:37, UP:38, RIGHT:39, DOWN:40, PRINT_SCREEN:44, INSERT:45, DELETE:46, ZERO:48, ONE:49, TWO:50, THREE:51, FOUR:52, FIVE:53, SIX:54, SEVEN:55, EIGHT:56, NINE:57, QUESTION_MARK:63, A:65, B:66, C:67, D:68, E:69, F:70, G:71, H:72, I:73, J:74, K:75, L:76, M:77, N:78, O:79, P:80, Q:81, R:82, S:83, T:84, U:85, 
V:86, W:87, X:88, Y:89, Z:90, META:91, WIN_KEY_RIGHT:92, CONTEXT_MENU:93, NUM_ZERO:96, NUM_ONE:97, NUM_TWO:98, NUM_THREE:99, NUM_FOUR:100, NUM_FIVE:101, NUM_SIX:102, NUM_SEVEN:103, NUM_EIGHT:104, NUM_NINE:105, NUM_MULTIPLY:106, NUM_PLUS:107, NUM_MINUS:109, NUM_PERIOD:110, NUM_DIVISION:111, F1:112, F2:113, F3:114, F4:115, F5:116, F6:117, F7:118, F8:119, F9:120, F10:121, F11:122, F12:123, NUMLOCK:144, SEMICOLON:186, DASH:189, EQUALS:187, COMMA:188, PERIOD:190, SLASH:191, APOSTROPHE:192, SINGLE_QUOTE:222, 
OPEN_SQUARE_BRACKET:219, BACKSLASH:220, CLOSE_SQUARE_BRACKET:221, WIN_KEY:224, MAC_FF_META:224, WIN_IME:229, PHANTOM:255};
goog.events.KeyCodes.isTextModifyingKeyEvent = function(a) {
  if(a.altKey && !a.ctrlKey || a.metaKey || a.keyCode >= goog.events.KeyCodes.F1 && a.keyCode <= goog.events.KeyCodes.F12) {
    return!1
  }
  switch(a.keyCode) {
    case goog.events.KeyCodes.ALT:
    ;
    case goog.events.KeyCodes.CAPS_LOCK:
    ;
    case goog.events.KeyCodes.CONTEXT_MENU:
    ;
    case goog.events.KeyCodes.CTRL:
    ;
    case goog.events.KeyCodes.DOWN:
    ;
    case goog.events.KeyCodes.END:
    ;
    case goog.events.KeyCodes.ESC:
    ;
    case goog.events.KeyCodes.HOME:
    ;
    case goog.events.KeyCodes.INSERT:
    ;
    case goog.events.KeyCodes.LEFT:
    ;
    case goog.events.KeyCodes.MAC_FF_META:
    ;
    case goog.events.KeyCodes.META:
    ;
    case goog.events.KeyCodes.NUMLOCK:
    ;
    case goog.events.KeyCodes.NUM_CENTER:
    ;
    case goog.events.KeyCodes.PAGE_DOWN:
    ;
    case goog.events.KeyCodes.PAGE_UP:
    ;
    case goog.events.KeyCodes.PAUSE:
    ;
    case goog.events.KeyCodes.PHANTOM:
    ;
    case goog.events.KeyCodes.PRINT_SCREEN:
    ;
    case goog.events.KeyCodes.RIGHT:
    ;
    case goog.events.KeyCodes.SHIFT:
    ;
    case goog.events.KeyCodes.UP:
    ;
    case goog.events.KeyCodes.WIN_KEY:
    ;
    case goog.events.KeyCodes.WIN_KEY_RIGHT:
      return!1;
    default:
      return!0
  }
};
goog.events.KeyCodes.firesKeyPressEvent = function(a, d, b, f, e) {
  if(!goog.userAgent.IE && (!goog.userAgent.WEBKIT || !goog.userAgent.isVersion("525"))) {
    return!0
  }
  if(goog.userAgent.MAC && e) {
    return goog.events.KeyCodes.isCharacterKey(a)
  }
  if(e && !f) {
    return!1
  }
  if(!b && (d == goog.events.KeyCodes.CTRL || d == goog.events.KeyCodes.ALT)) {
    return!1
  }
  if(goog.userAgent.IE && f && d == a) {
    return!1
  }
  switch(a) {
    case goog.events.KeyCodes.ENTER:
      return!(goog.userAgent.IE && goog.userAgent.isDocumentMode(9));
    case goog.events.KeyCodes.ESC:
      return!goog.userAgent.WEBKIT
  }
  return goog.events.KeyCodes.isCharacterKey(a)
};
goog.events.KeyCodes.isCharacterKey = function(a) {
  if(a >= goog.events.KeyCodes.ZERO && a <= goog.events.KeyCodes.NINE) {
    return!0
  }
  if(a >= goog.events.KeyCodes.NUM_ZERO && a <= goog.events.KeyCodes.NUM_MULTIPLY) {
    return!0
  }
  if(a >= goog.events.KeyCodes.A && a <= goog.events.KeyCodes.Z) {
    return!0
  }
  if(goog.userAgent.WEBKIT && a == 0) {
    return!0
  }
  switch(a) {
    case goog.events.KeyCodes.SPACE:
    ;
    case goog.events.KeyCodes.QUESTION_MARK:
    ;
    case goog.events.KeyCodes.NUM_PLUS:
    ;
    case goog.events.KeyCodes.NUM_MINUS:
    ;
    case goog.events.KeyCodes.NUM_PERIOD:
    ;
    case goog.events.KeyCodes.NUM_DIVISION:
    ;
    case goog.events.KeyCodes.SEMICOLON:
    ;
    case goog.events.KeyCodes.DASH:
    ;
    case goog.events.KeyCodes.EQUALS:
    ;
    case goog.events.KeyCodes.COMMA:
    ;
    case goog.events.KeyCodes.PERIOD:
    ;
    case goog.events.KeyCodes.SLASH:
    ;
    case goog.events.KeyCodes.APOSTROPHE:
    ;
    case goog.events.KeyCodes.SINGLE_QUOTE:
    ;
    case goog.events.KeyCodes.OPEN_SQUARE_BRACKET:
    ;
    case goog.events.KeyCodes.BACKSLASH:
    ;
    case goog.events.KeyCodes.CLOSE_SQUARE_BRACKET:
      return!0;
    default:
      return!1
  }
};
goog.events.EventType = {CLICK:"click", DBLCLICK:"dblclick", MOUSEDOWN:"mousedown", MOUSEUP:"mouseup", MOUSEOVER:"mouseover", MOUSEOUT:"mouseout", MOUSEMOVE:"mousemove", SELECTSTART:"selectstart", KEYPRESS:"keypress", KEYDOWN:"keydown", KEYUP:"keyup", BLUR:"blur", FOCUS:"focus", DEACTIVATE:"deactivate", FOCUSIN:goog.userAgent.IE ? "focusin" : "DOMFocusIn", FOCUSOUT:goog.userAgent.IE ? "focusout" : "DOMFocusOut", CHANGE:"change", SELECT:"select", SUBMIT:"submit", INPUT:"input", PROPERTYCHANGE:"propertychange", 
DRAGSTART:"dragstart", DRAGENTER:"dragenter", DRAGOVER:"dragover", DRAGLEAVE:"dragleave", DROP:"drop", TOUCHSTART:"touchstart", TOUCHMOVE:"touchmove", TOUCHEND:"touchend", TOUCHCANCEL:"touchcancel", CONTEXTMENU:"contextmenu", ERROR:"error", HELP:"help", LOAD:"load", LOSECAPTURE:"losecapture", READYSTATECHANGE:"readystatechange", RESIZE:"resize", SCROLL:"scroll", UNLOAD:"unload", HASHCHANGE:"hashchange", PAGEHIDE:"pagehide", PAGESHOW:"pageshow", POPSTATE:"popstate", COPY:"copy", PASTE:"paste", CUT:"cut", 
BEFORECOPY:"beforecopy", BEFORECUT:"beforecut", BEFOREPASTE:"beforepaste", MESSAGE:"message", CONNECT:"connect"};
goog.debug = {};
goog.debug.errorHandlerWeakDep = {protectEntryPoint:function(a) {
  return a
}};
goog.object = {};
goog.object.forEach = function(a, d, b) {
  for(var f in a) {
    d.call(b, a[f], f, a)
  }
};
goog.object.filter = function(a, d, b) {
  var f = {}, e;
  for(e in a) {
    d.call(b, a[e], e, a) && (f[e] = a[e])
  }
  return f
};
goog.object.map = function(a, d, b) {
  var f = {}, e;
  for(e in a) {
    f[e] = d.call(b, a[e], e, a)
  }
  return f
};
goog.object.some = function(a, d, b) {
  for(var f in a) {
    if(d.call(b, a[f], f, a)) {
      return!0
    }
  }
  return!1
};
goog.object.every = function(a, d, b) {
  for(var f in a) {
    if(!d.call(b, a[f], f, a)) {
      return!1
    }
  }
  return!0
};
goog.object.getCount = function(a) {
  var d = 0, b;
  for(b in a) {
    d++
  }
  return d
};
goog.object.getAnyKey = function(a) {
  for(var d in a) {
    return d
  }
};
goog.object.getAnyValue = function(a) {
  for(var d in a) {
    return a[d]
  }
};
goog.object.contains = function(a, d) {
  return goog.object.containsValue(a, d)
};
goog.object.getValues = function(a) {
  var d = [], b = 0, f;
  for(f in a) {
    d[b++] = a[f]
  }
  return d
};
goog.object.getKeys = function(a) {
  var d = [], b = 0, f;
  for(f in a) {
    d[b++] = f
  }
  return d
};
goog.object.getValueByKeys = function(a, d) {
  for(var b = goog.isArrayLike(d), f = b ? d : arguments, b = b ? 0 : 1;b < f.length;b++) {
    if(a = a[f[b]], !goog.isDef(a)) {
      break
    }
  }
  return a
};
goog.object.containsKey = function(a, d) {
  return d in a
};
goog.object.containsValue = function(a, d) {
  for(var b in a) {
    if(a[b] == d) {
      return!0
    }
  }
  return!1
};
goog.object.findKey = function(a, d, b) {
  for(var f in a) {
    if(d.call(b, a[f], f, a)) {
      return f
    }
  }
};
goog.object.findValue = function(a, d, b) {
  return(d = goog.object.findKey(a, d, b)) && a[d]
};
goog.object.isEmpty = function(a) {
  for(var d in a) {
    return!1
  }
  return!0
};
goog.object.clear = function(a) {
  for(var d in a) {
    delete a[d]
  }
};
goog.object.remove = function(a, d) {
  var b;
  (b = d in a) && delete a[d];
  return b
};
goog.object.add = function(a, d, b) {
  if(d in a) {
    throw Error('The object already contains the key "' + d + '"');
  }
  goog.object.set(a, d, b)
};
goog.object.get = function(a, d, b) {
  return d in a ? a[d] : b
};
goog.object.set = function(a, d, b) {
  a[d] = b
};
goog.object.setIfUndefined = function(a, d, b) {
  return d in a ? a[d] : a[d] = b
};
goog.object.clone = function(a) {
  var d = {}, b;
  for(b in a) {
    d[b] = a[b]
  }
  return d
};
goog.object.unsafeClone = function(a) {
  var d = goog.typeOf(a);
  if(d == "object" || d == "array") {
    if(a.clone) {
      return a.clone()
    }
    var d = d == "array" ? [] : {}, b;
    for(b in a) {
      d[b] = goog.object.unsafeClone(a[b])
    }
    return d
  }
  return a
};
goog.object.transpose = function(a) {
  var d = {}, b;
  for(b in a) {
    d[a[b]] = b
  }
  return d
};
goog.object.PROTOTYPE_FIELDS_ = "constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",");
goog.object.extend = function(a, d) {
  for(var b, f, e = 1;e < arguments.length;e++) {
    f = arguments[e];
    for(b in f) {
      a[b] = f[b]
    }
    for(var g = 0;g < goog.object.PROTOTYPE_FIELDS_.length;g++) {
      b = goog.object.PROTOTYPE_FIELDS_[g], Object.prototype.hasOwnProperty.call(f, b) && (a[b] = f[b])
    }
  }
};
goog.object.create = function(a) {
  var d = arguments.length;
  if(d == 1 && goog.isArray(arguments[0])) {
    return goog.object.create.apply(null, arguments[0])
  }
  if(d % 2) {
    throw Error("Uneven number of arguments");
  }
  for(var b = {}, f = 0;f < d;f += 2) {
    b[arguments[f]] = arguments[f + 1]
  }
  return b
};
goog.object.createSet = function(a) {
  var d = arguments.length;
  if(d == 1 && goog.isArray(arguments[0])) {
    return goog.object.createSet.apply(null, arguments[0])
  }
  for(var b = {}, f = 0;f < d;f++) {
    b[arguments[f]] = !0
  }
  return b
};
goog.debug.Error = function(a) {
  this.stack = Error().stack || "";
  if(a) {
    this.message = String(a)
  }
};
goog.inherits(goog.debug.Error, Error);
goog.debug.Error.prototype.name = "CustomError";
goog.asserts = {};
goog.asserts.ENABLE_ASSERTS = goog.DEBUG;
goog.asserts.AssertionError = function(a, d) {
  d.unshift(a);
  goog.debug.Error.call(this, goog.string.subs.apply(null, d));
  d.shift();
  this.messagePattern = a
};
goog.inherits(goog.asserts.AssertionError, goog.debug.Error);
goog.asserts.AssertionError.prototype.name = "AssertionError";
goog.asserts.doAssertFailure_ = function(a, d, b, f) {
  var e = "Assertion failed";
  if(b) {
    e += ": " + b;
    var g = f
  }else {
    a && (e += ": " + a, g = d)
  }
  throw new goog.asserts.AssertionError("" + e, g || []);
};
goog.asserts.assert = function(a, d, b) {
  goog.asserts.ENABLE_ASSERTS && !a && goog.asserts.doAssertFailure_("", null, d, Array.prototype.slice.call(arguments, 2));
  return a
};
goog.asserts.fail = function(a, d) {
  if(goog.asserts.ENABLE_ASSERTS) {
    throw new goog.asserts.AssertionError("Failure" + (a ? ": " + a : ""), Array.prototype.slice.call(arguments, 1));
  }
};
goog.asserts.assertNumber = function(a, d, b) {
  goog.asserts.ENABLE_ASSERTS && !goog.isNumber(a) && goog.asserts.doAssertFailure_("Expected number but got %s: %s.", [goog.typeOf(a), a], d, Array.prototype.slice.call(arguments, 2));
  return a
};
goog.asserts.assertString = function(a, d, b) {
  goog.asserts.ENABLE_ASSERTS && !goog.isString(a) && goog.asserts.doAssertFailure_("Expected string but got %s: %s.", [goog.typeOf(a), a], d, Array.prototype.slice.call(arguments, 2));
  return a
};
goog.asserts.assertFunction = function(a, d, b) {
  goog.asserts.ENABLE_ASSERTS && !goog.isFunction(a) && goog.asserts.doAssertFailure_("Expected function but got %s: %s.", [goog.typeOf(a), a], d, Array.prototype.slice.call(arguments, 2));
  return a
};
goog.asserts.assertObject = function(a, d, b) {
  goog.asserts.ENABLE_ASSERTS && !goog.isObject(a) && goog.asserts.doAssertFailure_("Expected object but got %s: %s.", [goog.typeOf(a), a], d, Array.prototype.slice.call(arguments, 2));
  return a
};
goog.asserts.assertArray = function(a, d, b) {
  goog.asserts.ENABLE_ASSERTS && !goog.isArray(a) && goog.asserts.doAssertFailure_("Expected array but got %s: %s.", [goog.typeOf(a), a], d, Array.prototype.slice.call(arguments, 2));
  return a
};
goog.asserts.assertBoolean = function(a, d, b) {
  goog.asserts.ENABLE_ASSERTS && !goog.isBoolean(a) && goog.asserts.doAssertFailure_("Expected boolean but got %s: %s.", [goog.typeOf(a), a], d, Array.prototype.slice.call(arguments, 2));
  return a
};
goog.asserts.assertInstanceof = function(a, d, b, f) {
  goog.asserts.ENABLE_ASSERTS && !(a instanceof d) && goog.asserts.doAssertFailure_("instanceof check failed.", null, b, Array.prototype.slice.call(arguments, 3))
};
goog.array = {};
goog.NATIVE_ARRAY_PROTOTYPES = !0;
goog.array.peek = function(a) {
  return a[a.length - 1]
};
goog.array.ARRAY_PROTOTYPE_ = Array.prototype;
goog.array.indexOf = goog.NATIVE_ARRAY_PROTOTYPES && goog.array.ARRAY_PROTOTYPE_.indexOf ? function(a, d, b) {
  goog.asserts.assert(a.length != null);
  return goog.array.ARRAY_PROTOTYPE_.indexOf.call(a, d, b)
} : function(a, d, b) {
  b = b == null ? 0 : b < 0 ? Math.max(0, a.length + b) : b;
  if(goog.isString(a)) {
    return!goog.isString(d) || d.length != 1 ? -1 : a.indexOf(d, b)
  }
  for(;b < a.length;b++) {
    if(b in a && a[b] === d) {
      return b
    }
  }
  return-1
};
goog.array.lastIndexOf = goog.NATIVE_ARRAY_PROTOTYPES && goog.array.ARRAY_PROTOTYPE_.lastIndexOf ? function(a, d, b) {
  goog.asserts.assert(a.length != null);
  return goog.array.ARRAY_PROTOTYPE_.lastIndexOf.call(a, d, b == null ? a.length - 1 : b)
} : function(a, d, b) {
  b = b == null ? a.length - 1 : b;
  b < 0 && (b = Math.max(0, a.length + b));
  if(goog.isString(a)) {
    return!goog.isString(d) || d.length != 1 ? -1 : a.lastIndexOf(d, b)
  }
  for(;b >= 0;b--) {
    if(b in a && a[b] === d) {
      return b
    }
  }
  return-1
};
goog.array.forEach = goog.NATIVE_ARRAY_PROTOTYPES && goog.array.ARRAY_PROTOTYPE_.forEach ? function(a, d, b) {
  goog.asserts.assert(a.length != null);
  goog.array.ARRAY_PROTOTYPE_.forEach.call(a, d, b)
} : function(a, d, b) {
  for(var f = a.length, e = goog.isString(a) ? a.split("") : a, g = 0;g < f;g++) {
    g in e && d.call(b, e[g], g, a)
  }
};
goog.array.forEachRight = function(a, d, b) {
  var f = a.length, e = goog.isString(a) ? a.split("") : a;
  for(f -= 1;f >= 0;--f) {
    f in e && d.call(b, e[f], f, a)
  }
};
goog.array.filter = goog.NATIVE_ARRAY_PROTOTYPES && goog.array.ARRAY_PROTOTYPE_.filter ? function(a, d, b) {
  goog.asserts.assert(a.length != null);
  return goog.array.ARRAY_PROTOTYPE_.filter.call(a, d, b)
} : function(a, d, b) {
  for(var f = a.length, e = [], g = 0, h = goog.isString(a) ? a.split("") : a, j = 0;j < f;j++) {
    if(j in h) {
      var l = h[j];
      d.call(b, l, j, a) && (e[g++] = l)
    }
  }
  return e
};
goog.array.map = goog.NATIVE_ARRAY_PROTOTYPES && goog.array.ARRAY_PROTOTYPE_.map ? function(a, d, b) {
  goog.asserts.assert(a.length != null);
  return goog.array.ARRAY_PROTOTYPE_.map.call(a, d, b)
} : function(a, d, b) {
  for(var f = a.length, e = Array(f), g = goog.isString(a) ? a.split("") : a, h = 0;h < f;h++) {
    h in g && (e[h] = d.call(b, g[h], h, a))
  }
  return e
};
goog.array.reduce = function(a, d, b, f) {
  if(a.reduce) {
    return f ? a.reduce(goog.bind(d, f), b) : a.reduce(d, b)
  }
  var e = b;
  goog.array.forEach(a, function(b, h) {
    e = d.call(f, e, b, h, a)
  });
  return e
};
goog.array.reduceRight = function(a, d, b, f) {
  if(a.reduceRight) {
    return f ? a.reduceRight(goog.bind(d, f), b) : a.reduceRight(d, b)
  }
  var e = b;
  goog.array.forEachRight(a, function(b, h) {
    e = d.call(f, e, b, h, a)
  });
  return e
};
goog.array.some = goog.NATIVE_ARRAY_PROTOTYPES && goog.array.ARRAY_PROTOTYPE_.some ? function(a, d, b) {
  goog.asserts.assert(a.length != null);
  return goog.array.ARRAY_PROTOTYPE_.some.call(a, d, b)
} : function(a, d, b) {
  for(var f = a.length, e = goog.isString(a) ? a.split("") : a, g = 0;g < f;g++) {
    if(g in e && d.call(b, e[g], g, a)) {
      return!0
    }
  }
  return!1
};
goog.array.every = goog.NATIVE_ARRAY_PROTOTYPES && goog.array.ARRAY_PROTOTYPE_.every ? function(a, d, b) {
  goog.asserts.assert(a.length != null);
  return goog.array.ARRAY_PROTOTYPE_.every.call(a, d, b)
} : function(a, d, b) {
  for(var f = a.length, e = goog.isString(a) ? a.split("") : a, g = 0;g < f;g++) {
    if(g in e && !d.call(b, e[g], g, a)) {
      return!1
    }
  }
  return!0
};
goog.array.find = function(a, d, b) {
  d = goog.array.findIndex(a, d, b);
  return d < 0 ? null : goog.isString(a) ? a.charAt(d) : a[d]
};
goog.array.findIndex = function(a, d, b) {
  for(var f = a.length, e = goog.isString(a) ? a.split("") : a, g = 0;g < f;g++) {
    if(g in e && d.call(b, e[g], g, a)) {
      return g
    }
  }
  return-1
};
goog.array.findRight = function(a, d, b) {
  d = goog.array.findIndexRight(a, d, b);
  return d < 0 ? null : goog.isString(a) ? a.charAt(d) : a[d]
};
goog.array.findIndexRight = function(a, d, b) {
  var f = a.length, e = goog.isString(a) ? a.split("") : a;
  for(f -= 1;f >= 0;f--) {
    if(f in e && d.call(b, e[f], f, a)) {
      return f
    }
  }
  return-1
};
goog.array.contains = function(a, d) {
  return goog.array.indexOf(a, d) >= 0
};
goog.array.isEmpty = function(a) {
  return a.length == 0
};
goog.array.clear = function(a) {
  if(!goog.isArray(a)) {
    for(var d = a.length - 1;d >= 0;d--) {
      delete a[d]
    }
  }
  a.length = 0
};
goog.array.insert = function(a, d) {
  goog.array.contains(a, d) || a.push(d)
};
goog.array.insertAt = function(a, d, b) {
  goog.array.splice(a, b, 0, d)
};
goog.array.insertArrayAt = function(a, d, b) {
  goog.partial(goog.array.splice, a, b, 0).apply(null, d)
};
goog.array.insertBefore = function(a, d, b) {
  var f;
  arguments.length == 2 || (f = goog.array.indexOf(a, b)) < 0 ? a.push(d) : goog.array.insertAt(a, d, f)
};
goog.array.remove = function(a, d) {
  var b = goog.array.indexOf(a, d), f;
  (f = b >= 0) && goog.array.removeAt(a, b);
  return f
};
goog.array.removeAt = function(a, d) {
  goog.asserts.assert(a.length != null);
  return goog.array.ARRAY_PROTOTYPE_.splice.call(a, d, 1).length == 1
};
goog.array.removeIf = function(a, d, b) {
  d = goog.array.findIndex(a, d, b);
  return d >= 0 ? (goog.array.removeAt(a, d), !0) : !1
};
goog.array.concat = function(a) {
  return goog.array.ARRAY_PROTOTYPE_.concat.apply(goog.array.ARRAY_PROTOTYPE_, arguments)
};
goog.array.clone = function(a) {
  if(goog.isArray(a)) {
    return goog.array.concat(a)
  }else {
    for(var d = [], b = 0, f = a.length;b < f;b++) {
      d[b] = a[b]
    }
    return d
  }
};
goog.array.toArray = function(a) {
  return goog.isArray(a) ? goog.array.concat(a) : goog.array.clone(a)
};
goog.array.extend = function(a, d) {
  for(var b = 1;b < arguments.length;b++) {
    var f = arguments[b], e;
    if(goog.isArray(f) || (e = goog.isArrayLike(f)) && f.hasOwnProperty("callee")) {
      a.push.apply(a, f)
    }else {
      if(e) {
        for(var g = a.length, h = f.length, j = 0;j < h;j++) {
          a[g + j] = f[j]
        }
      }else {
        a.push(f)
      }
    }
  }
};
goog.array.splice = function(a, d, b, f) {
  goog.asserts.assert(a.length != null);
  return goog.array.ARRAY_PROTOTYPE_.splice.apply(a, goog.array.slice(arguments, 1))
};
goog.array.slice = function(a, d, b) {
  goog.asserts.assert(a.length != null);
  return arguments.length <= 2 ? goog.array.ARRAY_PROTOTYPE_.slice.call(a, d) : goog.array.ARRAY_PROTOTYPE_.slice.call(a, d, b)
};
goog.array.removeDuplicates = function(a, d) {
  for(var b = d || a, f = {}, e = 0, g = 0;g < a.length;) {
    var h = a[g++], j = goog.isObject(h) ? "o" + goog.getUid(h) : (typeof h).charAt(0) + h;
    Object.prototype.hasOwnProperty.call(f, j) || (f[j] = !0, b[e++] = h)
  }
  b.length = e
};
goog.array.binarySearch = function(a, d, b) {
  return goog.array.binarySearch_(a, b || goog.array.defaultCompare, !1, d)
};
goog.array.binarySelect = function(a, d, b) {
  return goog.array.binarySearch_(a, d, !0, void 0, b)
};
goog.array.binarySearch_ = function(a, d, b, f, e) {
  for(var g = 0, h = a.length, j;g < h;) {
    var l = g + h >> 1, k;
    k = b ? d.call(e, a[l], l, a) : d(f, a[l]);
    k > 0 ? g = l + 1 : (h = l, j = !k)
  }
  return j ? g : ~g
};
goog.array.sort = function(a, d) {
  goog.asserts.assert(a.length != null);
  goog.array.ARRAY_PROTOTYPE_.sort.call(a, d || goog.array.defaultCompare)
};
goog.array.stableSort = function(a, d) {
  for(var b = 0;b < a.length;b++) {
    a[b] = {index:b, value:a[b]}
  }
  var f = d || goog.array.defaultCompare;
  goog.array.sort(a, function(a, b) {
    return f(a.value, b.value) || a.index - b.index
  });
  for(b = 0;b < a.length;b++) {
    a[b] = a[b].value
  }
};
goog.array.sortObjectsByKey = function(a, d, b) {
  var f = b || goog.array.defaultCompare;
  goog.array.sort(a, function(a, b) {
    return f(a[d], b[d])
  })
};
goog.array.isSorted = function(a, d, b) {
  for(var d = d || goog.array.defaultCompare, f = 1;f < a.length;f++) {
    var e = d(a[f - 1], a[f]);
    if(e > 0 || e == 0 && b) {
      return!1
    }
  }
  return!0
};
goog.array.equals = function(a, d, b) {
  if(!goog.isArrayLike(a) || !goog.isArrayLike(d) || a.length != d.length) {
    return!1
  }
  for(var f = a.length, b = b || goog.array.defaultCompareEquality, e = 0;e < f;e++) {
    if(!b(a[e], d[e])) {
      return!1
    }
  }
  return!0
};
goog.array.compare = function(a, d, b) {
  return goog.array.equals(a, d, b)
};
goog.array.compare3 = function(a, d, b) {
  for(var b = b || goog.array.defaultCompare, f = Math.min(a.length, d.length), e = 0;e < f;e++) {
    var g = b(a[e], d[e]);
    if(g != 0) {
      return g
    }
  }
  return goog.array.defaultCompare(a.length, d.length)
};
goog.array.defaultCompare = function(a, d) {
  return a > d ? 1 : a < d ? -1 : 0
};
goog.array.defaultCompareEquality = function(a, d) {
  return a === d
};
goog.array.binaryInsert = function(a, d, b) {
  b = goog.array.binarySearch(a, d, b);
  return b < 0 ? (goog.array.insertAt(a, d, -(b + 1)), !0) : !1
};
goog.array.binaryRemove = function(a, d, b) {
  d = goog.array.binarySearch(a, d, b);
  return d >= 0 ? goog.array.removeAt(a, d) : !1
};
goog.array.bucket = function(a, d) {
  for(var b = {}, f = 0;f < a.length;f++) {
    var e = a[f], g = d(e, f, a);
    goog.isDef(g) && (b[g] || (b[g] = [])).push(e)
  }
  return b
};
goog.array.repeat = function(a, d) {
  for(var b = [], f = 0;f < d;f++) {
    b[f] = a
  }
  return b
};
goog.array.flatten = function(a) {
  for(var d = [], b = 0;b < arguments.length;b++) {
    var f = arguments[b];
    goog.isArray(f) ? d.push.apply(d, goog.array.flatten.apply(null, f)) : d.push(f)
  }
  return d
};
goog.array.rotate = function(a, d) {
  goog.asserts.assert(a.length != null);
  a.length && (d %= a.length, d > 0 ? goog.array.ARRAY_PROTOTYPE_.unshift.apply(a, a.splice(-d, d)) : d < 0 && goog.array.ARRAY_PROTOTYPE_.push.apply(a, a.splice(0, -d)));
  return a
};
goog.array.zip = function(a) {
  if(!arguments.length) {
    return[]
  }
  for(var d = [], b = 0;;b++) {
    for(var f = [], e = 0;e < arguments.length;e++) {
      var g = arguments[e];
      if(b >= g.length) {
        return d
      }
      f.push(g[b])
    }
    d.push(f)
  }
};
goog.array.shuffle = function(a, d) {
  for(var b = d || Math.random, f = a.length - 1;f > 0;f--) {
    var e = Math.floor(b() * (f + 1)), g = a[f];
    a[f] = a[e];
    a[e] = g
  }
};
goog.debug.entryPointRegistry = {};
goog.debug.EntryPointMonitor = function() {
};
goog.debug.entryPointRegistry.refList_ = [];
goog.debug.entryPointRegistry.register = function(a) {
  goog.debug.entryPointRegistry.refList_[goog.debug.entryPointRegistry.refList_.length] = a
};
goog.debug.entryPointRegistry.monitorAll = function(a) {
  for(var a = goog.bind(a.wrap, a), d = 0;d < goog.debug.entryPointRegistry.refList_.length;d++) {
    goog.debug.entryPointRegistry.refList_[d](a)
  }
};
goog.debug.entryPointRegistry.unmonitorAllIfPossible = function(a) {
  for(var a = goog.bind(a.unwrap, a), d = 0;d < goog.debug.entryPointRegistry.refList_.length;d++) {
    goog.debug.entryPointRegistry.refList_[d](a)
  }
};
goog.events.EventWrapper = function() {
};
goog.events.EventWrapper.prototype.listen = function() {
};
goog.events.EventWrapper.prototype.unlisten = function() {
};
goog.events.BrowserFeature = {HAS_W3C_BUTTON:!goog.userAgent.IE || goog.userAgent.isDocumentMode(9), SET_KEY_CODE_TO_PREVENT_DEFAULT:goog.userAgent.IE && !goog.userAgent.isVersion("8")};
goog.disposable = {};
goog.disposable.IDisposable = function() {
};
goog.Disposable = function() {
  goog.Disposable.ENABLE_MONITORING && (goog.Disposable.instances_[goog.getUid(this)] = this)
};
goog.Disposable.ENABLE_MONITORING = !1;
goog.Disposable.instances_ = {};
goog.Disposable.getUndisposedObjects = function() {
  var a = [], d;
  for(d in goog.Disposable.instances_) {
    goog.Disposable.instances_.hasOwnProperty(d) && a.push(goog.Disposable.instances_[Number(d)])
  }
  return a
};
goog.Disposable.clearUndisposedObjects = function() {
  goog.Disposable.instances_ = {}
};
goog.Disposable.prototype.disposed_ = !1;
goog.Disposable.prototype.isDisposed = function() {
  return this.disposed_
};
goog.Disposable.prototype.getDisposed = goog.Disposable.prototype.isDisposed;
goog.Disposable.prototype.dispose = function() {
  if(!this.disposed_ && (this.disposed_ = !0, this.disposeInternal(), goog.Disposable.ENABLE_MONITORING)) {
    var a = goog.getUid(this);
    if(!goog.Disposable.instances_.hasOwnProperty(a)) {
      throw Error(this + " did not call the goog.Disposable base constructor or was disposed of after a clearUndisposedObjects call");
    }
    delete goog.Disposable.instances_[a]
  }
};
goog.Disposable.prototype.registerDisposable = function(a) {
  if(!this.dependentDisposables_) {
    this.dependentDisposables_ = []
  }
  this.dependentDisposables_.push(a)
};
goog.Disposable.prototype.disposeInternal = function() {
  this.dependentDisposables_ && goog.disposeAll.apply(null, this.dependentDisposables_)
};
goog.dispose = function(a) {
  a && typeof a.dispose == "function" && a.dispose()
};
goog.disposeAll = function(a) {
  for(var d = 0, b = arguments.length;d < b;++d) {
    var f = arguments[d];
    goog.isArrayLike(f) ? goog.disposeAll.apply(null, f) : goog.dispose(f)
  }
};
goog.events.Event = function(a, d) {
  goog.Disposable.call(this);
  this.type = a;
  this.currentTarget = this.target = d
};
goog.inherits(goog.events.Event, goog.Disposable);
goog.events.Event.prototype.disposeInternal = function() {
  delete this.type;
  delete this.target;
  delete this.currentTarget
};
goog.events.Event.prototype.propagationStopped_ = !1;
goog.events.Event.prototype.returnValue_ = !0;
goog.events.Event.prototype.stopPropagation = function() {
  this.propagationStopped_ = !0
};
goog.events.Event.prototype.preventDefault = function() {
  this.returnValue_ = !1
};
goog.events.Event.stopPropagation = function(a) {
  a.stopPropagation()
};
goog.events.Event.preventDefault = function(a) {
  a.preventDefault()
};
goog.reflect = {};
goog.reflect.object = function(a, d) {
  return d
};
goog.reflect.sinkValue = function(a) {
  goog.reflect.sinkValue[" "](a);
  return a
};
goog.reflect.sinkValue[" "] = goog.nullFunction;
goog.reflect.canAccessProperty = function(a, d) {
  try {
    return goog.reflect.sinkValue(a[d]), !0
  }catch(b) {
  }
  return!1
};
goog.events.BrowserEvent = function(a, d) {
  a && this.init(a, d)
};
goog.inherits(goog.events.BrowserEvent, goog.events.Event);
goog.events.BrowserEvent.MouseButton = {LEFT:0, MIDDLE:1, RIGHT:2};
goog.events.BrowserEvent.IEButtonMap = [1, 4, 2];
goog.events.BrowserEvent.prototype.target = null;
goog.events.BrowserEvent.prototype.relatedTarget = null;
goog.events.BrowserEvent.prototype.offsetX = 0;
goog.events.BrowserEvent.prototype.offsetY = 0;
goog.events.BrowserEvent.prototype.clientX = 0;
goog.events.BrowserEvent.prototype.clientY = 0;
goog.events.BrowserEvent.prototype.screenX = 0;
goog.events.BrowserEvent.prototype.screenY = 0;
goog.events.BrowserEvent.prototype.button = 0;
goog.events.BrowserEvent.prototype.keyCode = 0;
goog.events.BrowserEvent.prototype.charCode = 0;
goog.events.BrowserEvent.prototype.ctrlKey = !1;
goog.events.BrowserEvent.prototype.altKey = !1;
goog.events.BrowserEvent.prototype.shiftKey = !1;
goog.events.BrowserEvent.prototype.metaKey = !1;
goog.events.BrowserEvent.prototype.platformModifierKey = !1;
goog.events.BrowserEvent.prototype.event_ = null;
goog.events.BrowserEvent.prototype.init = function(a, d) {
  var b = this.type = a.type;
  goog.events.Event.call(this, b);
  this.target = a.target || a.srcElement;
  this.currentTarget = d;
  var f = a.relatedTarget;
  if(f) {
    goog.userAgent.GECKO && (goog.reflect.canAccessProperty(f, "nodeName") || (f = null))
  }else {
    if(b == goog.events.EventType.MOUSEOVER) {
      f = a.fromElement
    }else {
      if(b == goog.events.EventType.MOUSEOUT) {
        f = a.toElement
      }
    }
  }
  this.relatedTarget = f;
  this.offsetX = a.offsetX !== void 0 ? a.offsetX : a.layerX;
  this.offsetY = a.offsetY !== void 0 ? a.offsetY : a.layerY;
  this.clientX = a.clientX !== void 0 ? a.clientX : a.pageX;
  this.clientY = a.clientY !== void 0 ? a.clientY : a.pageY;
  this.screenX = a.screenX || 0;
  this.screenY = a.screenY || 0;
  this.button = a.button;
  this.keyCode = a.keyCode || 0;
  this.charCode = a.charCode || (b == "keypress" ? a.keyCode : 0);
  this.ctrlKey = a.ctrlKey;
  this.altKey = a.altKey;
  this.shiftKey = a.shiftKey;
  this.metaKey = a.metaKey;
  this.platformModifierKey = goog.userAgent.MAC ? a.metaKey : a.ctrlKey;
  this.state = a.state;
  this.event_ = a;
  delete this.returnValue_;
  delete this.propagationStopped_
};
goog.events.BrowserEvent.prototype.isButton = function(a) {
  return goog.events.BrowserFeature.HAS_W3C_BUTTON ? this.event_.button == a : this.type == "click" ? a == goog.events.BrowserEvent.MouseButton.LEFT : !!(this.event_.button & goog.events.BrowserEvent.IEButtonMap[a])
};
goog.events.BrowserEvent.prototype.isMouseActionButton = function() {
  return this.isButton(goog.events.BrowserEvent.MouseButton.LEFT) && !(goog.userAgent.WEBKIT && goog.userAgent.MAC && this.ctrlKey)
};
goog.events.BrowserEvent.prototype.stopPropagation = function() {
  goog.events.BrowserEvent.superClass_.stopPropagation.call(this);
  this.event_.stopPropagation ? this.event_.stopPropagation() : this.event_.cancelBubble = !0
};
goog.events.BrowserEvent.prototype.preventDefault = function() {
  goog.events.BrowserEvent.superClass_.preventDefault.call(this);
  var a = this.event_;
  if(a.preventDefault) {
    a.preventDefault()
  }else {
    if(a.returnValue = !1, goog.events.BrowserFeature.SET_KEY_CODE_TO_PREVENT_DEFAULT) {
      try {
        if(a.ctrlKey || a.keyCode >= 112 && a.keyCode <= 123) {
          a.keyCode = -1
        }
      }catch(d) {
      }
    }
  }
};
goog.events.BrowserEvent.prototype.getBrowserEvent = function() {
  return this.event_
};
goog.events.BrowserEvent.prototype.disposeInternal = function() {
  goog.events.BrowserEvent.superClass_.disposeInternal.call(this);
  this.relatedTarget = this.currentTarget = this.target = this.event_ = null
};
goog.events.Listener = function() {
};
goog.events.Listener.counter_ = 0;
goog.events.Listener.prototype.key = 0;
goog.events.Listener.prototype.removed = !1;
goog.events.Listener.prototype.callOnce = !1;
goog.events.Listener.prototype.init = function(a, d, b, f, e, g) {
  if(goog.isFunction(a)) {
    this.isFunctionListener_ = !0
  }else {
    if(a && a.handleEvent && goog.isFunction(a.handleEvent)) {
      this.isFunctionListener_ = !1
    }else {
      throw Error("Invalid listener argument");
    }
  }
  this.listener = a;
  this.proxy = d;
  this.src = b;
  this.type = f;
  this.capture = !!e;
  this.handler = g;
  this.callOnce = !1;
  this.key = ++goog.events.Listener.counter_;
  this.removed = !1
};
goog.events.Listener.prototype.handleEvent = function(a) {
  return this.isFunctionListener_ ? this.listener.call(this.handler || this.src, a) : this.listener.handleEvent.call(this.listener, a)
};
goog.userAgent.jscript = {};
goog.userAgent.jscript.ASSUME_NO_JSCRIPT = !1;
goog.userAgent.jscript.init_ = function() {
  goog.userAgent.jscript.DETECTED_HAS_JSCRIPT_ = "ScriptEngine" in goog.global && goog.global.ScriptEngine() == "JScript";
  goog.userAgent.jscript.DETECTED_VERSION_ = goog.userAgent.jscript.DETECTED_HAS_JSCRIPT_ ? goog.global.ScriptEngineMajorVersion() + "." + goog.global.ScriptEngineMinorVersion() + "." + goog.global.ScriptEngineBuildVersion() : "0"
};
goog.userAgent.jscript.ASSUME_NO_JSCRIPT || goog.userAgent.jscript.init_();
goog.userAgent.jscript.HAS_JSCRIPT = goog.userAgent.jscript.ASSUME_NO_JSCRIPT ? !1 : goog.userAgent.jscript.DETECTED_HAS_JSCRIPT_;
goog.userAgent.jscript.VERSION = goog.userAgent.jscript.ASSUME_NO_JSCRIPT ? "0" : goog.userAgent.jscript.DETECTED_VERSION_;
goog.userAgent.jscript.isVersion = function(a) {
  return goog.string.compareVersions(goog.userAgent.jscript.VERSION, a) >= 0
};
goog.structs = {};
goog.structs.SimplePool = function(a, d) {
  goog.Disposable.call(this);
  this.maxCount_ = d;
  this.freeQueue_ = [];
  this.createInitial_(a)
};
goog.inherits(goog.structs.SimplePool, goog.Disposable);
goog.structs.SimplePool.prototype.createObjectFn_ = null;
goog.structs.SimplePool.prototype.disposeObjectFn_ = null;
goog.structs.SimplePool.prototype.setCreateObjectFn = function(a) {
  this.createObjectFn_ = a
};
goog.structs.SimplePool.prototype.setDisposeObjectFn = function(a) {
  this.disposeObjectFn_ = a
};
goog.structs.SimplePool.prototype.getObject = function() {
  return this.freeQueue_.length ? this.freeQueue_.pop() : this.createObject()
};
goog.structs.SimplePool.prototype.releaseObject = function(a) {
  this.freeQueue_.length < this.maxCount_ ? this.freeQueue_.push(a) : this.disposeObject(a)
};
goog.structs.SimplePool.prototype.createInitial_ = function(a) {
  if(a > this.maxCount_) {
    throw Error("[goog.structs.SimplePool] Initial cannot be greater than max");
  }
  for(var d = 0;d < a;d++) {
    this.freeQueue_.push(this.createObject())
  }
};
goog.structs.SimplePool.prototype.createObject = function() {
  return this.createObjectFn_ ? this.createObjectFn_() : {}
};
goog.structs.SimplePool.prototype.disposeObject = function(a) {
  if(this.disposeObjectFn_) {
    this.disposeObjectFn_(a)
  }else {
    if(goog.isObject(a)) {
      if(goog.isFunction(a.dispose)) {
        a.dispose()
      }else {
        for(var d in a) {
          delete a[d]
        }
      }
    }
  }
};
goog.structs.SimplePool.prototype.disposeInternal = function() {
  goog.structs.SimplePool.superClass_.disposeInternal.call(this);
  for(var a = this.freeQueue_;a.length;) {
    this.disposeObject(a.pop())
  }
  delete this.freeQueue_
};
goog.events.pools = {};
goog.events.ASSUME_GOOD_GC = !1;
(function() {
  function a() {
    return{count_:0, remaining_:0}
  }
  function d() {
    return[]
  }
  function b() {
    var a = function(b) {
      b = h.call(a.src, a.key, b);
      if(!b) {
        return b
      }
    };
    return a
  }
  function f() {
    return new goog.events.Listener
  }
  function e() {
    return new goog.events.BrowserEvent
  }
  var g = !goog.events.ASSUME_GOOD_GC && goog.userAgent.jscript.HAS_JSCRIPT && !goog.userAgent.jscript.isVersion("5.7"), h;
  goog.events.pools.setProxyCallbackFunction = function(a) {
    h = a
  };
  if(g) {
    goog.events.pools.getObject = function() {
      return j.getObject()
    };
    goog.events.pools.releaseObject = function(a) {
      j.releaseObject(a)
    };
    goog.events.pools.getArray = function() {
      return l.getObject()
    };
    goog.events.pools.releaseArray = function(a) {
      l.releaseObject(a)
    };
    goog.events.pools.getProxy = function() {
      return k.getObject()
    };
    goog.events.pools.releaseProxy = function() {
      k.releaseObject(b())
    };
    goog.events.pools.getListener = function() {
      return o.getObject()
    };
    goog.events.pools.releaseListener = function(a) {
      o.releaseObject(a)
    };
    goog.events.pools.getEvent = function() {
      return m.getObject()
    };
    goog.events.pools.releaseEvent = function(a) {
      m.releaseObject(a)
    };
    var j = new goog.structs.SimplePool(0, 600);
    j.setCreateObjectFn(a);
    var l = new goog.structs.SimplePool(0, 600);
    l.setCreateObjectFn(d);
    var k = new goog.structs.SimplePool(0, 600);
    k.setCreateObjectFn(b);
    var o = new goog.structs.SimplePool(0, 600);
    o.setCreateObjectFn(f);
    var m = new goog.structs.SimplePool(0, 600);
    m.setCreateObjectFn(e)
  }else {
    goog.events.pools.getObject = a, goog.events.pools.releaseObject = goog.nullFunction, goog.events.pools.getArray = d, goog.events.pools.releaseArray = goog.nullFunction, goog.events.pools.getProxy = b, goog.events.pools.releaseProxy = goog.nullFunction, goog.events.pools.getListener = f, goog.events.pools.releaseListener = goog.nullFunction, goog.events.pools.getEvent = e, goog.events.pools.releaseEvent = goog.nullFunction
  }
})();
goog.events.listeners_ = {};
goog.events.listenerTree_ = {};
goog.events.sources_ = {};
goog.events.onString_ = "on";
goog.events.onStringMap_ = {};
goog.events.keySeparator_ = "_";
goog.events.listen = function(a, d, b, f, e) {
  if(d) {
    if(goog.isArray(d)) {
      for(var g = 0;g < d.length;g++) {
        goog.events.listen(a, d[g], b, f, e)
      }
      return null
    }else {
      var f = !!f, h = goog.events.listenerTree_;
      d in h || (h[d] = goog.events.pools.getObject());
      h = h[d];
      f in h || (h[f] = goog.events.pools.getObject(), h.count_++);
      var h = h[f], j = goog.getUid(a), l;
      h.remaining_++;
      if(h[j]) {
        l = h[j];
        for(g = 0;g < l.length;g++) {
          if(h = l[g], h.listener == b && h.handler == e) {
            if(h.removed) {
              break
            }
            return l[g].key
          }
        }
      }else {
        l = h[j] = goog.events.pools.getArray(), h.count_++
      }
      g = goog.events.pools.getProxy();
      g.src = a;
      h = goog.events.pools.getListener();
      h.init(b, g, a, d, f, e);
      b = h.key;
      g.key = b;
      l.push(h);
      goog.events.listeners_[b] = h;
      goog.events.sources_[j] || (goog.events.sources_[j] = goog.events.pools.getArray());
      goog.events.sources_[j].push(h);
      a.addEventListener ? (a == goog.global || !a.customEvent_) && a.addEventListener(d, g, f) : a.attachEvent(goog.events.getOnString_(d), g);
      return b
    }
  }else {
    throw Error("Invalid event type");
  }
};
goog.events.listenOnce = function(a, d, b, f, e) {
  if(goog.isArray(d)) {
    for(var g = 0;g < d.length;g++) {
      goog.events.listenOnce(a, d[g], b, f, e)
    }
    return null
  }
  a = goog.events.listen(a, d, b, f, e);
  goog.events.listeners_[a].callOnce = !0;
  return a
};
goog.events.listenWithWrapper = function(a, d, b, f, e) {
  d.listen(a, b, f, e)
};
goog.events.unlisten = function(a, d, b, f, e) {
  if(goog.isArray(d)) {
    for(var g = 0;g < d.length;g++) {
      goog.events.unlisten(a, d[g], b, f, e)
    }
    return null
  }
  f = !!f;
  a = goog.events.getListeners_(a, d, f);
  if(!a) {
    return!1
  }
  for(g = 0;g < a.length;g++) {
    if(a[g].listener == b && a[g].capture == f && a[g].handler == e) {
      return goog.events.unlistenByKey(a[g].key)
    }
  }
  return!1
};
goog.events.unlistenByKey = function(a) {
  if(!goog.events.listeners_[a]) {
    return!1
  }
  var d = goog.events.listeners_[a];
  if(d.removed) {
    return!1
  }
  var b = d.src, f = d.type, e = d.proxy, g = d.capture;
  b.removeEventListener ? (b == goog.global || !b.customEvent_) && b.removeEventListener(f, e, g) : b.detachEvent && b.detachEvent(goog.events.getOnString_(f), e);
  b = goog.getUid(b);
  e = goog.events.listenerTree_[f][g][b];
  if(goog.events.sources_[b]) {
    var h = goog.events.sources_[b];
    goog.array.remove(h, d);
    h.length == 0 && delete goog.events.sources_[b]
  }
  d.removed = !0;
  e.needsCleanup_ = !0;
  goog.events.cleanUp_(f, g, b, e);
  delete goog.events.listeners_[a];
  return!0
};
goog.events.unlistenWithWrapper = function(a, d, b, f, e) {
  d.unlisten(a, b, f, e)
};
goog.events.cleanUp_ = function(a, d, b, f) {
  if(!f.locked_ && f.needsCleanup_) {
    for(var e = 0, g = 0;e < f.length;e++) {
      if(f[e].removed) {
        var h = f[e].proxy;
        h.src = null;
        goog.events.pools.releaseProxy(h);
        goog.events.pools.releaseListener(f[e])
      }else {
        e != g && (f[g] = f[e]), g++
      }
    }
    f.length = g;
    f.needsCleanup_ = !1;
    g == 0 && (goog.events.pools.releaseArray(f), delete goog.events.listenerTree_[a][d][b], goog.events.listenerTree_[a][d].count_--, goog.events.listenerTree_[a][d].count_ == 0 && (goog.events.pools.releaseObject(goog.events.listenerTree_[a][d]), delete goog.events.listenerTree_[a][d], goog.events.listenerTree_[a].count_--), goog.events.listenerTree_[a].count_ == 0 && (goog.events.pools.releaseObject(goog.events.listenerTree_[a]), delete goog.events.listenerTree_[a]))
  }
};
goog.events.removeAll = function(a, d, b) {
  var f = 0, e = d == null, g = b == null, b = !!b;
  if(a == null) {
    goog.object.forEach(goog.events.sources_, function(a) {
      for(var h = a.length - 1;h >= 0;h--) {
        var j = a[h];
        if((e || d == j.type) && (g || b == j.capture)) {
          goog.events.unlistenByKey(j.key), f++
        }
      }
    })
  }else {
    if(a = goog.getUid(a), goog.events.sources_[a]) {
      for(var a = goog.events.sources_[a], h = a.length - 1;h >= 0;h--) {
        var j = a[h];
        if((e || d == j.type) && (g || b == j.capture)) {
          goog.events.unlistenByKey(j.key), f++
        }
      }
    }
  }
  return f
};
goog.events.getListeners = function(a, d, b) {
  return goog.events.getListeners_(a, d, b) || []
};
goog.events.getListeners_ = function(a, d, b) {
  var f = goog.events.listenerTree_;
  return d in f && (f = f[d], b in f && (f = f[b], a = goog.getUid(a), f[a])) ? f[a] : null
};
goog.events.getListener = function(a, d, b, f, e) {
  f = !!f;
  if(a = goog.events.getListeners_(a, d, f)) {
    for(d = 0;d < a.length;d++) {
      if(!a[d].removed && a[d].listener == b && a[d].capture == f && a[d].handler == e) {
        return a[d]
      }
    }
  }
  return null
};
goog.events.hasListener = function(a, d, b) {
  var a = goog.getUid(a), f = goog.events.sources_[a];
  if(f) {
    var e = goog.isDef(d), g = goog.isDef(b);
    return e && g ? (f = goog.events.listenerTree_[d], !!f && !!f[b] && a in f[b]) : !e && !g ? !0 : goog.array.some(f, function(a) {
      return e && a.type == d || g && a.capture == b
    })
  }
  return!1
};
goog.events.expose = function(a) {
  var d = [], b;
  for(b in a) {
    a[b] && a[b].id ? d.push(b + " = " + a[b] + " (" + a[b].id + ")") : d.push(b + " = " + a[b])
  }
  return d.join("\n")
};
goog.events.getOnString_ = function(a) {
  return a in goog.events.onStringMap_ ? goog.events.onStringMap_[a] : goog.events.onStringMap_[a] = goog.events.onString_ + a
};
goog.events.fireListeners = function(a, d, b, f) {
  var e = goog.events.listenerTree_;
  return d in e && (e = e[d], b in e) ? goog.events.fireListeners_(e[b], a, d, b, f) : !0
};
goog.events.fireListeners_ = function(a, d, b, f, e) {
  var g = 1, d = goog.getUid(d);
  if(a[d]) {
    a.remaining_--;
    a = a[d];
    a.locked_ ? a.locked_++ : a.locked_ = 1;
    try {
      for(var h = a.length, j = 0;j < h;j++) {
        var l = a[j];
        l && !l.removed && (g &= goog.events.fireListener(l, e) !== !1)
      }
    }finally {
      a.locked_--, goog.events.cleanUp_(b, f, d, a)
    }
  }
  return Boolean(g)
};
goog.events.fireListener = function(a, d) {
  var b = a.handleEvent(d);
  a.callOnce && goog.events.unlistenByKey(a.key);
  return b
};
goog.events.getTotalListenerCount = function() {
  return goog.object.getCount(goog.events.listeners_)
};
goog.events.dispatchEvent = function(a, d) {
  var b = d.type || d, f = goog.events.listenerTree_;
  if(!(b in f)) {
    return!0
  }
  if(goog.isString(d)) {
    d = new goog.events.Event(d, a)
  }else {
    if(d instanceof goog.events.Event) {
      d.target = d.target || a
    }else {
      var e = d, d = new goog.events.Event(b, a);
      goog.object.extend(d, e)
    }
  }
  var e = 1, g, f = f[b], b = !0 in f, h;
  if(b) {
    g = [];
    for(h = a;h;h = h.getParentEventTarget()) {
      g.push(h)
    }
    h = f[!0];
    h.remaining_ = h.count_;
    for(var j = g.length - 1;!d.propagationStopped_ && j >= 0 && h.remaining_;j--) {
      d.currentTarget = g[j], e &= goog.events.fireListeners_(h, g[j], d.type, !0, d) && d.returnValue_ != !1
    }
  }
  if(!1 in f) {
    if(h = f[!1], h.remaining_ = h.count_, b) {
      for(j = 0;!d.propagationStopped_ && j < g.length && h.remaining_;j++) {
        d.currentTarget = g[j], e &= goog.events.fireListeners_(h, g[j], d.type, !1, d) && d.returnValue_ != !1
      }
    }else {
      for(f = a;!d.propagationStopped_ && f && h.remaining_;f = f.getParentEventTarget()) {
        d.currentTarget = f, e &= goog.events.fireListeners_(h, f, d.type, !1, d) && d.returnValue_ != !1
      }
    }
  }
  return Boolean(e)
};
goog.events.protectBrowserEventEntryPoint = function(a) {
  goog.events.handleBrowserEvent_ = a.protectEntryPoint(goog.events.handleBrowserEvent_);
  goog.events.pools.setProxyCallbackFunction(goog.events.handleBrowserEvent_)
};
goog.events.handleBrowserEvent_ = function(a, d) {
  if(!goog.events.listeners_[a]) {
    return!0
  }
  var b = goog.events.listeners_[a], f = b.type, e = goog.events.listenerTree_;
  if(!(f in e)) {
    return!0
  }
  var e = e[f], g, h;
  if(goog.events.synthesizeEventPropagation_()) {
    g = d || goog.getObjectByName("window.event");
    var j = !0 in e, l = !1 in e;
    if(j) {
      if(goog.events.isMarkedIeEvent_(g)) {
        return!0
      }
      goog.events.markIeEvent_(g)
    }
    var k = goog.events.pools.getEvent();
    k.init(g, this);
    g = !0;
    try {
      if(j) {
        for(var o = goog.events.pools.getArray(), m = k.currentTarget;m;m = m.parentNode) {
          o.push(m)
        }
        h = e[!0];
        h.remaining_ = h.count_;
        for(var s = o.length - 1;!k.propagationStopped_ && s >= 0 && h.remaining_;s--) {
          k.currentTarget = o[s], g &= goog.events.fireListeners_(h, o[s], f, !0, k)
        }
        if(l) {
          h = e[!1];
          h.remaining_ = h.count_;
          for(s = 0;!k.propagationStopped_ && s < o.length && h.remaining_;s++) {
            k.currentTarget = o[s], g &= goog.events.fireListeners_(h, o[s], f, !1, k)
          }
        }
      }else {
        g = goog.events.fireListener(b, k)
      }
    }finally {
      if(o) {
        o.length = 0, goog.events.pools.releaseArray(o)
      }
      k.dispose();
      goog.events.pools.releaseEvent(k)
    }
    return g
  }
  f = new goog.events.BrowserEvent(d, this);
  try {
    g = goog.events.fireListener(b, f)
  }finally {
    f.dispose()
  }
  return g
};
goog.events.pools.setProxyCallbackFunction(goog.events.handleBrowserEvent_);
goog.events.markIeEvent_ = function(a) {
  var d = !1;
  if(a.keyCode == 0) {
    try {
      a.keyCode = -1;
      return
    }catch(b) {
      d = !0
    }
  }
  if(d || a.returnValue == void 0) {
    a.returnValue = !0
  }
};
goog.events.isMarkedIeEvent_ = function(a) {
  return a.keyCode < 0 || a.returnValue != void 0
};
goog.events.uniqueIdCounter_ = 0;
goog.events.getUniqueId = function(a) {
  return a + "_" + goog.events.uniqueIdCounter_++
};
goog.events.synthesizeEventPropagation_ = function() {
  if(goog.events.requiresSyntheticEventPropagation_ === void 0) {
    goog.events.requiresSyntheticEventPropagation_ = goog.userAgent.IE && !goog.global.addEventListener
  }
  return goog.events.requiresSyntheticEventPropagation_
};
goog.debug.entryPointRegistry.register(function(a) {
  goog.events.handleBrowserEvent_ = a(goog.events.handleBrowserEvent_);
  goog.events.pools.setProxyCallbackFunction(goog.events.handleBrowserEvent_)
});
goog.events.EventTarget = function() {
  goog.Disposable.call(this)
};
goog.inherits(goog.events.EventTarget, goog.Disposable);
goog.events.EventTarget.prototype.customEvent_ = !0;
goog.events.EventTarget.prototype.parentEventTarget_ = null;
goog.events.EventTarget.prototype.getParentEventTarget = function() {
  return this.parentEventTarget_
};
goog.events.EventTarget.prototype.setParentEventTarget = function(a) {
  this.parentEventTarget_ = a
};
goog.events.EventTarget.prototype.addEventListener = function(a, d, b, f) {
  goog.events.listen(this, a, d, b, f)
};
goog.events.EventTarget.prototype.removeEventListener = function(a, d, b, f) {
  goog.events.unlisten(this, a, d, b, f)
};
goog.events.EventTarget.prototype.dispatchEvent = function(a) {
  return goog.events.dispatchEvent(this, a)
};
goog.events.EventTarget.prototype.disposeInternal = function() {
  goog.events.EventTarget.superClass_.disposeInternal.call(this);
  goog.events.removeAll(this);
  this.parentEventTarget_ = null
};
goog.events.KeyHandler = function(a, d) {
  goog.events.EventTarget.call(this);
  a && this.attach(a, d)
};
goog.inherits(goog.events.KeyHandler, goog.events.EventTarget);
goog.events.KeyHandler.prototype.element_ = null;
goog.events.KeyHandler.prototype.keyPressKey_ = null;
goog.events.KeyHandler.prototype.keyDownKey_ = null;
goog.events.KeyHandler.prototype.keyUpKey_ = null;
goog.events.KeyHandler.prototype.lastKey_ = -1;
goog.events.KeyHandler.prototype.keyCode_ = -1;
goog.events.KeyHandler.EventType = {KEY:"key"};
goog.events.KeyHandler.safariKey_ = {3:goog.events.KeyCodes.ENTER, 12:goog.events.KeyCodes.NUMLOCK, 63232:goog.events.KeyCodes.UP, 63233:goog.events.KeyCodes.DOWN, 63234:goog.events.KeyCodes.LEFT, 63235:goog.events.KeyCodes.RIGHT, 63236:goog.events.KeyCodes.F1, 63237:goog.events.KeyCodes.F2, 63238:goog.events.KeyCodes.F3, 63239:goog.events.KeyCodes.F4, 63240:goog.events.KeyCodes.F5, 63241:goog.events.KeyCodes.F6, 63242:goog.events.KeyCodes.F7, 63243:goog.events.KeyCodes.F8, 63244:goog.events.KeyCodes.F9, 
63245:goog.events.KeyCodes.F10, 63246:goog.events.KeyCodes.F11, 63247:goog.events.KeyCodes.F12, 63248:goog.events.KeyCodes.PRINT_SCREEN, 63272:goog.events.KeyCodes.DELETE, 63273:goog.events.KeyCodes.HOME, 63275:goog.events.KeyCodes.END, 63276:goog.events.KeyCodes.PAGE_UP, 63277:goog.events.KeyCodes.PAGE_DOWN, 63289:goog.events.KeyCodes.NUMLOCK, 63302:goog.events.KeyCodes.INSERT};
goog.events.KeyHandler.keyIdentifier_ = {Up:goog.events.KeyCodes.UP, Down:goog.events.KeyCodes.DOWN, Left:goog.events.KeyCodes.LEFT, Right:goog.events.KeyCodes.RIGHT, Enter:goog.events.KeyCodes.ENTER, F1:goog.events.KeyCodes.F1, F2:goog.events.KeyCodes.F2, F3:goog.events.KeyCodes.F3, F4:goog.events.KeyCodes.F4, F5:goog.events.KeyCodes.F5, F6:goog.events.KeyCodes.F6, F7:goog.events.KeyCodes.F7, F8:goog.events.KeyCodes.F8, F9:goog.events.KeyCodes.F9, F10:goog.events.KeyCodes.F10, F11:goog.events.KeyCodes.F11, 
F12:goog.events.KeyCodes.F12, "U+007F":goog.events.KeyCodes.DELETE, Home:goog.events.KeyCodes.HOME, End:goog.events.KeyCodes.END, PageUp:goog.events.KeyCodes.PAGE_UP, PageDown:goog.events.KeyCodes.PAGE_DOWN, Insert:goog.events.KeyCodes.INSERT};
goog.events.KeyHandler.mozKeyCodeToKeyCodeMap_ = {61:187, 59:186};
goog.events.KeyHandler.USES_KEYDOWN_ = goog.userAgent.IE || goog.userAgent.WEBKIT && goog.userAgent.isVersion("525");
goog.events.KeyHandler.prototype.handleKeyDown_ = function(a) {
  if(goog.userAgent.WEBKIT && (this.lastKey_ == goog.events.KeyCodes.CTRL && !a.ctrlKey || this.lastKey_ == goog.events.KeyCodes.ALT && !a.altKey)) {
    this.keyCode_ = this.lastKey_ = -1
  }
  goog.events.KeyHandler.USES_KEYDOWN_ && !goog.events.KeyCodes.firesKeyPressEvent(a.keyCode, this.lastKey_, a.shiftKey, a.ctrlKey, a.altKey) ? this.handleEvent(a) : this.keyCode_ = goog.userAgent.GECKO && a.keyCode in goog.events.KeyHandler.mozKeyCodeToKeyCodeMap_ ? goog.events.KeyHandler.mozKeyCodeToKeyCodeMap_[a.keyCode] : a.keyCode
};
goog.events.KeyHandler.prototype.handleKeyup_ = function() {
  this.keyCode_ = this.lastKey_ = -1
};
goog.events.KeyHandler.prototype.handleEvent = function(a) {
  var d = a.getBrowserEvent(), b, f;
  if(goog.userAgent.IE && a.type == goog.events.EventType.KEYPRESS) {
    b = this.keyCode_, f = b != goog.events.KeyCodes.ENTER && b != goog.events.KeyCodes.ESC ? d.keyCode : 0
  }else {
    if(goog.userAgent.WEBKIT && a.type == goog.events.EventType.KEYPRESS) {
      b = this.keyCode_, f = d.charCode >= 0 && d.charCode < 63232 && goog.events.KeyCodes.isCharacterKey(b) ? d.charCode : 0
    }else {
      if(goog.userAgent.OPERA) {
        b = this.keyCode_, f = goog.events.KeyCodes.isCharacterKey(b) ? d.keyCode : 0
      }else {
        if(b = d.keyCode || this.keyCode_, f = d.charCode || 0, goog.userAgent.MAC && f == goog.events.KeyCodes.QUESTION_MARK && !b) {
          b = goog.events.KeyCodes.SLASH
        }
      }
    }
  }
  var e = b, g = d.keyIdentifier;
  b ? b >= 63232 && b in goog.events.KeyHandler.safariKey_ ? e = goog.events.KeyHandler.safariKey_[b] : b == 25 && a.shiftKey && (e = 9) : g && g in goog.events.KeyHandler.keyIdentifier_ && (e = goog.events.KeyHandler.keyIdentifier_[g]);
  a = e == this.lastKey_;
  this.lastKey_ = e;
  d = new goog.events.KeyEvent(e, f, a, d);
  try {
    this.dispatchEvent(d)
  }finally {
    d.dispose()
  }
};
goog.events.KeyHandler.prototype.getElement = function() {
  return this.element_
};
goog.events.KeyHandler.prototype.attach = function(a, d) {
  this.keyUpKey_ && this.detach();
  this.element_ = a;
  this.keyPressKey_ = goog.events.listen(this.element_, goog.events.EventType.KEYPRESS, this, d);
  this.keyDownKey_ = goog.events.listen(this.element_, goog.events.EventType.KEYDOWN, this.handleKeyDown_, d, this);
  this.keyUpKey_ = goog.events.listen(this.element_, goog.events.EventType.KEYUP, this.handleKeyup_, d, this)
};
goog.events.KeyHandler.prototype.detach = function() {
  if(this.keyPressKey_) {
    goog.events.unlistenByKey(this.keyPressKey_), goog.events.unlistenByKey(this.keyDownKey_), goog.events.unlistenByKey(this.keyUpKey_), this.keyUpKey_ = this.keyDownKey_ = this.keyPressKey_ = null
  }
  this.element_ = null;
  this.keyCode_ = this.lastKey_ = -1
};
goog.events.KeyHandler.prototype.disposeInternal = function() {
  goog.events.KeyHandler.superClass_.disposeInternal.call(this);
  this.detach()
};
goog.events.KeyEvent = function(a, d, b, f) {
  goog.events.BrowserEvent.call(this, f);
  this.type = goog.events.KeyHandler.EventType.KEY;
  this.keyCode = a;
  this.charCode = d;
  this.repeat = b
};
goog.inherits(goog.events.KeyEvent, goog.events.BrowserEvent);
/*
 Copyright (c) 2011, Joseph Spandrusyszyn
 See https://github.com/illandril/Illandril-Game-Engine.
*/
game = game || {};
game.controls = function(a) {
  this.id = game.controls.nextID++;
  this.name = a;
  this.controls = {};
  this.reverseControls = {};
  this.controlChangeListeners = [];
  this.registeringActionTimeout = this.actionToRegister = null
};
game.controls.nextID = 0;
game.controls.actionPendingFor = null;
game.controls.keyStates = {};
game.controls.modifierKeyStates = {CTRL:!1, CTRL_LAST:{}, ALT:!1, ALT_LAST:{}, SHIFT:!1, SHIFT_LAST:{}};
game.controls.rememberCurrentAsLastKeyState = function() {
  for(var a in game.controls.keyStates) {
    game.controls.keyStates[a].wasActive = !0
  }
  game.controls.modifierKeyStates.CTRL_LAST = game.controls.modifierKeyStates.CTRL;
  game.controls.modifierKeyStates.ALT_LAST = game.controls.modifierKeyStates.ALT;
  game.controls.modifierKeyStates.SHIFT_LAST = game.controls.modifierKeyStates.SHIFT
};
game.controls.getKeyState = function(a) {
  var d = a.KeyCode, d = goog.userAgent.GECKO && a.keyCode in goog.events.KeyHandler.mozKeyCodeToKeyCodeMap_ ? goog.events.KeyHandler.mozKeyCodeToKeyCodeMap_[a.keyCode] : a.keyCode;
  return{keyCode:d, ctrlKey:a.ctrlKey, altKey:a.altKey, shiftKey:a.shiftKey}
};
game.controls.blur = function() {
  game.controls.keyStates = {};
  game.controls.modifierKeyStates.CTRL = !1;
  game.controls.modifierKeyStates.CTRL_LAST = !1;
  game.controls.modifierKeyStates.ALT = !1;
  game.controls.modifierKeyStates.ALT_LAST = !1;
  game.controls.modifierKeyStates.SHIFT = !1;
  game.controls.modifierKeyStates.SHIFT_LAST = !1
};
game.controls.keyDown = function(a) {
  a = game.controls.getKeyState(a);
  game.controls.getKeyEventKey(a.keyCode, a.ctrlKey, a.altKey, a.shiftKey);
  a.keyCode != goog.events.KeyCodes.SHIFT && a.keyCode != goog.events.KeyCodes.CTRL && a.keyCode != goog.events.KeyCodes.ALT && game.controls.keyStates[a.keyCode] == null && (game.controls.keyStates[a.keyCode] = {wasActive:!1});
  game.controls.modifierKeyStates.CTRL = a.ctrlKey;
  game.controls.modifierKeyStates.ALT = a.altKey;
  game.controls.modifierKeyStates.SHIFT = a.shiftKey
};
game.controls.keyUp = function(a) {
  a = game.controls.getKeyState(a);
  game.controls.getKeyEventKey(a.keyCode, a.ctrlKey, a.altKey, a.shiftKey);
  delete game.controls.keyStates[a.keyCode];
  game.controls.modifierKeyStates.CTRL = a.ctrlKey;
  game.controls.modifierKeyStates.ALT = a.altKey;
  game.controls.modifierKeyStates.SHIFT = a.shiftKey
};
game.controls.getKeyEventKey = function(a, d, b, f) {
  var e = goog.events.KeyNames[a];
  e == null && (e = "KEY[" + a + "]");
  return(d ? "Ctrl + " : "") + (b ? "Alt + " : "") + (f ? "Shift + " : "") + e.toUpperCase()
};
game.controls.prototype = {handleKeyEvents:function(a) {
  var d = 0, b = game.controls.modifierKeyStates.CTRL == game.controls.modifierKeyStates.CTRL_LAST && game.controls.modifierKeyStates.ALT == game.controls.modifierKeyStates.ALT_LAST && game.controls.modifierKeyStates.SHIFT == game.controls.modifierKeyStates.SHIFT_LAST, f;
  for(f in game.controls.keyStates) {
    var e = b && game.controls.keyStates[f].wasActive;
    d++;
    var g = game.controls.getKeyEventKey(f, game.controls.modifierKeyStates.CTRL, game.controls.modifierKeyStates.ALT, game.controls.modifierKeyStates.SHIFT);
    this.actionToRegister == null && this.controls[g] != null && (!e || this.controls[g].executeOnRepeat) && this.controls[g].execute(a)
  }
  if(d == 1 && this.actionToRegister != null) {
    this.registeringActionTimeout != null && clearTimeout(this.registeringActionTimeout);
    var h = this;
    this.registeringActionTimeout = setTimeout(function() {
      h.registerAction(h.actionToRegister, g);
      h.actionToRegister = null;
      game.controls.actionPendingFor = null;
      h.registeringActionTimeout = null
    }, 100)
  }
}, getKeyForAction:function(a) {
  return this.reverseControls[a]
}, registerAction:function(a, d, b, f, e) {
  var g = d;
  typeof d == "number" && (g = game.controls.getKeyEventKey(d, b, f, e));
  d = [];
  b = this.controls[g];
  f = this.reverseControls[a.name];
  if(b != null) {
    if(f != null) {
      this.controls[f] = b, this.reverseControls[b.name] = f, d.push(new game.controls.exportedAction(f, b))
    }else {
      throw"The specified key is already in use for a different function.";
    }
  }else {
    f != null && delete this.controls[f]
  }
  this.controls[g] = a;
  this.reverseControls[a.name] = g;
  d.push(new game.controls.exportedAction(g, a));
  this.notifyControlChangeListeners(d)
}, registerActionFromInput:function(a) {
  game.controls.actionPendingFor != null && game.controls.actionPendingFor.notifyControlChangeListeners(null);
  game.controls.actionPendingFor = this;
  this.actionToRegister = a
}, unregisterAction:function(a) {
  var d = this.reverseControls[a.name];
  d != null && (delete this.controls[d], delete this.reverseControls[a.name], this.notifyControlChangeListeners([new game.controls.exportedAction(null, a)]))
}, getActionList:function() {
  var a = [], d;
  for(d in this.controls) {
    a.push(new game.controls.exportedAction(d, this.controls[d]))
  }
  return a
}, registerControlChangeListener:function(a, d, b) {
  this.controlChangeListeners.push({listener:a, fn:d});
  b && d.apply(a, null, this.getActionList())
}, notifyControlChangeListeners:function(a) {
  for(var d = 0;d < this.controlChangeListeners.length;d++) {
    var b = this.controlChangeListeners[d];
    b.fn.apply(b.listener, a || [], this.getActionList())
  }
}};
goog.events.listen(document, goog.events.EventType.KEYDOWN, game.controls.keyDown);
goog.events.listen(document, goog.events.EventType.KEYUP, game.controls.keyUp);
goog.events.listen(document, goog.events.EventType.BLUR, game.controls.blur);
game.controls.exportedAction = function(a, d) {
  this.key = this.key = a;
  this.action = this.action = d
};
game.controls.action = function(a, d, b) {
  this.execute = a;
  this.name = this.name = d;
  this.executeOnRepeat = b
};
game = game || {};
game.platformer = game.platformer || {};
(function(a) {
  a.DEFAULT_GRAVITY = new Box2D.Common.Math.b2Vec2(0, 9.8);
  a.DEFAULTS = {GRAVITY:new Box2D.Common.Math.b2Vec2(0, 9.8), JUMP_IMPULSE_MODIFIER:2.25, PLAYER_SPEED:5, PLAYER_ACCELERATION:1};
  a.RULE_TYPES = {DIRECTIONAL_SIDING:1, JUMPER:2, MOVER:4, BREAKABLE:8};
  a.SIDES = {TOP:1, LEFT:2, BOTTOM:4, RIGHT:8};
  a.init = function() {
    game.world.addCollisionFilter(a)
  };
  a.initializeDirectionalSiding = function(b, e) {
    b.platformerRules = b.platformerRules || {};
    b.platformerRules.type |= a.RULE_TYPES.DIRECTIONAL_SIDING;
    b.platformerRules.directionalSiding = {noTop:e & a.SIDES.TOP, noBottom:e & a.SIDES.BOTTOM, noLeft:e & a.SIDES.LEFT, noRight:e & a.SIDES.RIGHT}
  };
  a.initializeJumper = function(b, e) {
    b.platformerRules = b.platformerRules || {};
    b.platformerRules.type |= a.RULE_TYPES.JUMPER;
    b.platformerRules.jumper = {grounds:[], speed:e, jump:function() {
      var e = b.platformerRules.jumper.grounds;
      if(e.length > 0) {
        var d = b.body.GetMass() * b.platformerRules.jumper.speed * a.DEFAULTS.JUMP_IMPULSE_MODIFIER, j = b.body.GetWorldCenter(), l = b.body.GetLinearVelocity();
        l.y = 0;
        b.body.SetLinearVelocity(l);
        b.body.ApplyImpulse(new Box2D.Common.Math.b2Vec2(0, -d), j);
        for(l = 0;l < e.length;l++) {
          e[l].body.ApplyImpulse(new Box2D.Common.Math.b2Vec2(0, d / e.length), j)
        }
      }
    }}
  };
  a.initializeMover = function(b, e, d) {
    b.platformerRules = b.platformerRules || {};
    b.platformerRules.type |= a.RULE_TYPES.JUMPER;
    b.platformerRules.mover = {acceleration:d, speed:e, moveRight:function() {
      var a = b.body.GetLinearVelocity(), a = Math.min(a.x + b.platformerRules.mover.acceleration, b.platformerRules.mover.speed) - a.x;
      a > 0 && (a *= b.body.GetMass(), b.body.ApplyImpulse(new Box2D.Common.Math.b2Vec2(a, 0), b.body.GetWorldCenter()))
    }, moveLeft:function() {
      var a = b.body.GetLinearVelocity(), a = Math.max(a.x - b.platformerRules.mover.acceleration, -b.platformerRules.mover.speed) - a.x;
      a < 0 && (a *= b.body.GetMass(), b.body.ApplyImpulse(new Box2D.Common.Math.b2Vec2(a, 0), b.body.GetWorldCenter()))
    }}
  };
  a.initializeBreakable = function(b, e) {
    b.platformerRules = b.platformerRules || {};
    b.platformerRules.type |= a.RULE_TYPES.BREAKABLE;
    b.platformerRules.breakable = {top:e & a.SIDES.TOP, bottom:e & a.SIDES.BOTTOM, left:e & a.SIDES.LEFT, right:e & a.SIDES.RIGHT}
  };
  a.createPlayer = function(b, e) {
    var d = game.world.createBox(b, e, !0, {fixedRotation:!0}, {restitution:0});
    d.platformerRules = {};
    a.initializeJumper(d, a.DEFAULTS.PLAYER_SPEED);
    a.initializeMover(d, a.DEFAULTS.PLAYER_SPEED, a.DEFAULTS.PLAYER_ACCELERATION);
    var h = new Box2D.Collision.Shapes.b2PolygonShape;
    h.SetAsOrientedBox(0.01, b.y / 2, new Box2D.Common.Math.b2Vec2(-b.x / 2, 0));
    d.leftEdge = game.world.addFixture(d.body, {friction:0}, h);
    h.SetAsOrientedBox(0.01, b.y / 2, new Box2D.Common.Math.b2Vec2(b.x / 2, 0));
    d.rightEdge = game.world.addFixture(d.body, {friction:0}, h);
    d.actions = {};
    d.actions.moveUp = new game.controls.action(function() {
      d.platformerRules.jumper.jump()
    }, "Move Up", !0);
    d.actions.moveDown = new game.controls.action(function() {
    }, "Move Down", !0);
    d.actions.moveLeft = new game.controls.action(function() {
      d.platformerRules.mover.moveLeft()
    }, "Move Left", !0);
    d.actions.moveRight = new game.controls.action(function() {
      d.platformerRules.mover.moveRight()
    }, "Move Right", !0);
    return d
  };
  a.RayCollide = null;
  a.ShouldCollide = null;
  a.ValidateBeginContact = function(a) {
    var b = a.GetFixtureA(), g = b.GetBody(), h = g.object, j = a.GetFixtureB(), l = j.GetBody(), k = l.object;
    !a.disabled && h.platformerRules && d(a, h, g, b, k, l, j);
    !a.disabled && k.platformerRules && d(a, k, l, j, h, g, b)
  };
  var d = function(b, e) {
    if(e.platformerRules.type & a.RULE_TYPES.DIRECTIONAL_SIDING) {
      b.disabled = !0;
      var d = new Box2D.Collision.b2WorldManifold;
      b.GetWorldManifold(d);
      d = d.m_normal;
      if(!e.platformerRules.directionalSiding.noTop && d.y > 0) {
        b.disabled = !1
      }else {
        if(!e.platformerRules.directionalSiding.noBottom && d.y < 0) {
          b.disabled = !1
        }else {
          if(!e.platformerRules.directionalSiding.noRight && d.x > 0) {
            b.disabled = !1
          }else {
            if(!e.platformerRules.directionalSiding.noLeft && d.x < 0) {
              b.disabled = !1
            }
          }
        }
      }
    }
  };
  a.BeginContact = function(a) {
    if(!a.disabled) {
      var e = a.GetFixtureA(), d = e.GetBody(), h = d.object, j = a.GetFixtureB(), l = j.GetBody(), k = l.object;
      h.platformerRules && b(a, h, d, e, k, l, j);
      k.platformerRules && b(a, k, l, j, h, d, e)
    }
  };
  var b = function(b, e, d, h, j, l) {
    if(e.platformerRules.type & a.RULE_TYPES.JUMPER && (d = new Box2D.Collision.b2WorldManifold, b.GetWorldManifold(d), d = d.m_normal, d.y > 0)) {
      d = !1;
      for(h = 0;h < e.platformerRules.jumper.grounds.length;h++) {
        if(e.platformerRules.jumper.grounds[h].body == l) {
          e.platformerRules.jumper.grounds[h].count++;
          d = !0;
          break
        }
      }
      d || e.platformerRules.jumper.grounds.push({body:l, count:1});
      b.platformerGrounds = b.platformerGrounds || [];
      b.platformerGrounds.push({jumper:e, ground:l})
    }
    if(e.platformerRules.type & a.RULE_TYPES.BREAKABLE) {
      d = new Box2D.Collision.b2WorldManifold, b.GetWorldManifold(d), d = d.m_normal, d.y > 0 && e.platformerRules.breakable.top ? game.world.destroyObject(e) : d.y < 0 && e.platformerRules.breakable.bottom ? game.world.destroyObject(e) : d.x > 0 && e.platformerRules.breakable.left ? game.world.destroyObject(e) : d.x < 0 && e.platformerRules.breakable.right && game.world.destroyObject(e)
    }
  };
  a.EndContact = function(a) {
    if(a.platformerGrounds) {
      for(var b = 0;b < a.platformerGrounds.length;b++) {
        for(var d = a.platformerGrounds[b].jumper, h = a.platformerGrounds[b].ground, j = [], l = 0;l < d.platformerRules.jumper.grounds.length;l++) {
          d.platformerRules.jumper.grounds[l].body == h ? (d.platformerRules.jumper.grounds[l].count--, d.platformerRules.jumper.grounds[l].count > 0 && j.push(d.platformerRules.jumper.grounds[l])) : j.push(d.platformerRules.jumper.grounds[l])
        }
        d.platformerRules.jumper.grounds = j
      }
      a.platformerGrounds = null
    }
  };
  a.PreSolve = null;
  a.PostSolve = null;
  a.createBlock = function(a, b) {
    return game.world.createStaticBox(a, b, !0)
  };
  a.createPlatform = function(b, e, d) {
    b = game.world.createStaticBox(b, e, !0, {angle:Math.PI * Math.random() * 0}, null);
    if(d === void 0 || d === null) {
      d = a.SIDES.BOTTOM | a.SIDES.LEFT | a.SIDES.RIGHT
    }
    a.initializeDirectionalSiding(b, d);
    return b
  };
  a.createBreakableBlock = function(b, e, d) {
    b = game.world.createStaticBox(b, e, !0, {angle:Math.PI * Math.random() * 0}, null);
    if(d === void 0 || d === null) {
      d = a.SIDES.BOTTOM
    }
    a.initializeBreakable(b, d);
    return b
  }
})(game.platformer);
var test = {}, player, ramp;
(function(a) {
  var d = new Box2D.Common.Math.b2Vec2(200, 80), b = new Box2D.Common.Math.b2Vec2(600, 400), f;
  a.init = function(e, g) {
    game.init(a, e, d, game.platformer.DEFAULTS.GRAVITY, b, 20, g);
    game.platformer.init();
    var f = new Box2D.Common.Math.b2Vec2(13, d.y - 45);
    a.createWorld();
    a.createBallPit(new Box2D.Common.Math.b2Vec2(30, 5), new Box2D.Common.Math.b2Vec2(20, d.y - 25));
    a.createSpinners();
    a.createDebugObjects();
    a.createPlayer(f);
    a.createMario(new Box2D.Common.Math.b2Vec2(13, d.y - 40));
    game.start()
  };
  a.createPlayer = function(a) {
    var b = new Box2D.Common.Math.b2Vec2(0, 0), d = new Box2D.Common.Math.b2Vec2(21, 47), j = new Box2D.Common.Math.b2Vec2(d.x / 20, d.y / 20);
    player = game.platformer.createPlayer(j, a);
    game.animations.setAsFourDirectionalAnimation(player.body, j, "../external-resources/graphics/urbansquall_tileset/characters/princess_AP.png", b, d, 4, 4);
    f = new game.controls("main");
    f.registerAction(player.actions.moveUp, goog.events.KeyCodes.W, !1, !1, !1);
    f.registerAction(player.actions.moveLeft, goog.events.KeyCodes.A, !1, !1, !1);
    f.registerAction(player.actions.moveDown, goog.events.KeyCodes.S, !1, !1, !1);
    f.registerAction(player.actions.moveRight, goog.events.KeyCodes.D, !1, !1, !1)
  };
  a.createWorld = function() {
    var a = new Box2D.Common.Math.b2Vec2(3, 0.25);
    ramp = game.world.createStaticBox(new Box2D.Common.Math.b2Vec2(5, 0.25), new Box2D.Common.Math.b2Vec2(16, d.y - 1.5), !0, {angle:Math.PI / 3}, null);
    game.platformer.createPlatform(a, new Box2D.Common.Math.b2Vec2(12, d.y - 2.5));
    game.platformer.createPlatform(a, new Box2D.Common.Math.b2Vec2(10, d.y - 5));
    game.platformer.createPlatform(a, new Box2D.Common.Math.b2Vec2(8, d.y - 7.5));
    game.platformer.createPlatform(a, new Box2D.Common.Math.b2Vec2(6, d.y - 10));
    game.platformer.createPlatform(a, new Box2D.Common.Math.b2Vec2(4, d.y - 12.5));
    game.platformer.createPlatform(a, new Box2D.Common.Math.b2Vec2(2, d.y - 15));
    game.platformer.createPlatform(a, new Box2D.Common.Math.b2Vec2(8, d.y - 17.5));
    game.platformer.createPlatform(a, new Box2D.Common.Math.b2Vec2(10, d.y - 20));
    game.platformer.createPlatform(a, new Box2D.Common.Math.b2Vec2(12, d.y - 22.5));
    game.platformer.createPlatform(a, new Box2D.Common.Math.b2Vec2(10, d.y - 27.5));
    game.platformer.createPlatform(a, new Box2D.Common.Math.b2Vec2(10, d.y - 31));
    game.platformer.createPlatform(a, new Box2D.Common.Math.b2Vec2(10, d.y - 34.5));
    game.platformer.createPlatform(a, new Box2D.Common.Math.b2Vec2(10, d.y - 38));
    game.platformer.createBlock(new Box2D.Common.Math.b2Vec2(d.x - 14, 0.5), new Box2D.Common.Math.b2Vec2(d.x / 2 + 7, d.y - 25))
  };
  a.createBallPit = function(a, b) {
    game.world.createStaticBox(new Box2D.Common.Math.b2Vec2(0.25, Math.sqrt(a.y * a.y * 2)), new Box2D.Common.Math.b2Vec2(b.x + a.y / 2, b.y - a.y / 2), !0, {angle:Math.PI / 4}, null);
    game.world.createStaticBox(new Box2D.Common.Math.b2Vec2(0.25, a.y), new Box2D.Common.Math.b2Vec2(b.x + a.y, b.y - a.y / 2), !0, null, null);
    game.world.createStaticBox(new Box2D.Common.Math.b2Vec2(0.25, a.y), new Box2D.Common.Math.b2Vec2(b.x + a.x, b.y - a.y / 2), !0, null, null);
    for(var d = new Box2D.Collision.Shapes.b2CircleShape(0.15), f = a.y + 1;f < a.x;f += 0.3) {
      for(var l = 0;l < a.y;l += 1) {
        var k = game.world.createObject(new Box2D.Common.Math.b2Vec2(0.3, 0.3), new Box2D.Common.Math.b2Vec2(b.x + f + (Math.random() - 0.5) / 2, b.y - a.y), !0, null, {density:0.1, restitution:0, friction:0.1}, d), o = Math.random();
        o <= 0.25 ? game.ui.setImage(k.body, "graphics/ball-red.png") : o <= 0.5 ? game.ui.setImage(k.body, "graphics/ball-green.png") : o <= 0.75 ? game.ui.setImage(k.body, "graphics/ball-yellow.png") : game.ui.setImage(k.body, "graphics/ball-blue.png")
      }
    }
  };
  a.createSpinners = function() {
    for(var a = new Box2D.Dynamics.Joints.b2RevoluteJointDef, b = new Box2D.Dynamics.Joints.b2WeldJointDef, f = !1, j = 20;j <= d.x - 10;j += 8) {
      game.world.getBox2DBodyDefinition().angle = j / d.x * Math.PI;
      var l = d.y - 14;
      f && (l += 8);
      var f = !f, k = game.world.createStaticBox(new Box2D.Common.Math.b2Vec2(0.1, 0.1), new Box2D.Common.Math.b2Vec2(j, l));
      k.body.display = null;
      var o = game.world.createBox(new Box2D.Common.Math.b2Vec2(10, 1), new Box2D.Common.Math.b2Vec2(j, l));
      game.ui.setImage(o.body, "graphics/spinner.png");
      game.platformer.initializeDirectionalSiding(o, !1, !0, !1, !1);
      l = game.world.createBox(new Box2D.Common.Math.b2Vec2(10, 1), new Box2D.Common.Math.b2Vec2(j, l));
      l.body.SetAngle(game.world.getBox2DBodyDefinition().angle + Math.PI / 2);
      game.ui.setImage(l.body, "graphics/spinner.png");
      a.Initialize(k.body, o.body, k.body.GetWorldCenter());
      game.world.getBox2DWorld().CreateJoint(a);
      a.Initialize(k.body, l.body, k.body.GetWorldCenter());
      game.world.getBox2DWorld().CreateJoint(a);
      b.Initialize(o.body, l.body, o.body.GetWorldCenter());
      game.world.getBox2DWorld().CreateJoint(b)
    }
  };
  a.createDebugObjects = function() {
    game.world.getBox2DBodyDefinition().type = Box2D.Dynamics.b2Body.b2_dynamicBody;
    game.world.getBox2DBodyDefinition().fixedRotation = !1;
    game.world.getBox2DFixtureDefinition().restitution = 2.5;
    game.world.getBox2DFixtureDefinition().shape = new Box2D.Collision.Shapes.b2CircleShape(0.25);
    for(var a = 0;a < 0;a++) {
      var b = a * 5 % (d.x - 10);
      game.world.getBox2DBodyDefinition().position.y = 15 + a % 20;
      game.world.getBox2DBodyDefinition().position.x = b + a % 20 / 20 + 4.5;
      b = game.world.getBox2DWorld().CreateBody(game.world.getBox2DBodyDefinition());
      b.display = {};
      b.display.size = new Box2D.Common.Math.b2Vec2(0.5, 0.5);
      b.CreateFixture(game.world.getBox2DFixtureDefinition())
    }
    game.world.getBox2DFixtureDefinition().shape = new Box2D.Collision.Shapes.b2PolygonShape;
    game.world.getBox2DFixtureDefinition().shape.SetAsBox(0.25, 0.25);
    for(a = 0;a < 0;a++) {
      b = a * 5 % (d.x - 10), game.world.getBox2DBodyDefinition().position.y = 15 + (a + 5) % 20, game.world.getBox2DBodyDefinition().position.x = b + (a + 5) % 20 / 20 + 4.5, game.world.getBox2DBodyDefinition().angle = a % 17 / 17, b = game.world.getBox2DWorld().CreateBody(game.world.getBox2DBodyDefinition()), b.display = {}, b.display.size = new Box2D.Common.Math.b2Vec2(0.5, 0.5), b.CreateFixture(game.world.getBox2DFixtureDefinition())
    }
    game.world.getBox2DFixtureDefinition().shape = new Box2D.Collision.Shapes.b2PolygonShape;
    game.world.getBox2DFixtureDefinition().shape.SetAsArray([new Box2D.Common.Math.b2Vec2(-0.5, -0.5), new Box2D.Common.Math.b2Vec2(0.5, -0.5), new Box2D.Common.Math.b2Vec2(-0.5, 0.5)], 3);
    for(a = 0;a < 0;a++) {
      b = a * 5 % (d.x - 10), game.world.getBox2DBodyDefinition().position.y = 15 + (a + 10) % 20, game.world.getBox2DBodyDefinition().position.x = b + (a + 10) % 20 / 20 + 4.5, game.world.getBox2DBodyDefinition().angle = a % 22 / 22, b = game.world.getBox2DWorld().CreateBody(game.world.getBox2DBodyDefinition()), b.display = {}, b.display.size = new Box2D.Common.Math.b2Vec2(0.75, 0.75), b.CreateFixture(game.world.getBox2DFixtureDefinition())
    }
    game.world.getBox2DFixtureDefinition().shape = new Box2D.Collision.Shapes.b2PolygonShape;
    game.world.getBox2DFixtureDefinition().shape.SetAsArray([new Box2D.Common.Math.b2Vec2(-0.5, -0.5), new Box2D.Common.Math.b2Vec2(0, -0.5), new Box2D.Common.Math.b2Vec2(0.5, 0), new Box2D.Common.Math.b2Vec2(0.5, 0.5), new Box2D.Common.Math.b2Vec2(0, 0.3)], 5);
    for(a = 0;a < 0;a++) {
      b = a * 5 % (d.x - 10), game.world.getBox2DBodyDefinition().position.y = 15 + (a + 15) % 20, game.world.getBox2DBodyDefinition().position.x = b + (a + 15) % 20 / 20 + 4.5, game.world.getBox2DBodyDefinition().angle = a % 35 / 35, b = game.world.getBox2DWorld().CreateBody(game.world.getBox2DBodyDefinition()), b.display = {}, b.display.size = new Box2D.Common.Math.b2Vec2(0.75, 0.75), b.CreateFixture(game.world.getBox2DFixtureDefinition())
    }
  };
  a.createMario = function(a) {
    var b = new Box2D.Common.Math.b2Vec2(1.5, 1.5), a = new Box2D.Common.Math.b2Vec2(a.x + b.x / 2, a.y + b.y / 2);
    game.platformer.createBlock(b, new Box2D.Common.Math.b2Vec2(a.x, a.y));
    game.platformer.createBlock(b, new Box2D.Common.Math.b2Vec2(a.x + b.x, a.y));
    game.platformer.createBlock(b, new Box2D.Common.Math.b2Vec2(a.x + b.x * 2, a.y));
    game.platformer.createBlock(b, new Box2D.Common.Math.b2Vec2(a.x + b.x * 3, a.y));
    game.platformer.createBlock(b, new Box2D.Common.Math.b2Vec2(a.x + b.x * 4, a.y));
    game.platformer.createBlock(b, new Box2D.Common.Math.b2Vec2(a.x + b.x * 5, a.y));
    game.platformer.createBlock(b, new Box2D.Common.Math.b2Vec2(a.x + b.x * 6, a.y));
    game.platformer.createBlock(b, new Box2D.Common.Math.b2Vec2(a.x + b.x * 7, a.y));
    game.platformer.createBlock(b, new Box2D.Common.Math.b2Vec2(a.x + b.x * 8, a.y));
    game.platformer.createBlock(b, new Box2D.Common.Math.b2Vec2(a.x + b.x * 9, a.y));
    game.platformer.createBlock(b, new Box2D.Common.Math.b2Vec2(a.x + b.x * 10, a.y));
    game.platformer.createBlock(b, new Box2D.Common.Math.b2Vec2(a.x + b.x * 11, a.y));
    game.platformer.createBlock(b, new Box2D.Common.Math.b2Vec2(a.x + b.x * 12, a.y));
    game.platformer.createBlock(b, new Box2D.Common.Math.b2Vec2(a.x + b.x * 13, a.y));
    game.platformer.createBlock(b, new Box2D.Common.Math.b2Vec2(a.x + b.x * 14, a.y));
    game.platformer.createBlock(b, new Box2D.Common.Math.b2Vec2(a.x + b.x * 15, a.y));
    game.platformer.createBlock(b, new Box2D.Common.Math.b2Vec2(a.x + b.x * 16, a.y));
    game.platformer.createBreakableBlock(b, new Box2D.Common.Math.b2Vec2(a.x + b.x * 16, a.y - b.y * 4));
    game.platformer.createBlock(b, new Box2D.Common.Math.b2Vec2(a.x + b.x * 17, a.y));
    game.platformer.createBlock(b, new Box2D.Common.Math.b2Vec2(a.x + b.x * 18, a.y));
    game.platformer.createBlock(b, new Box2D.Common.Math.b2Vec2(a.x + b.x * 19, a.y));
    game.platformer.createBlock(b, new Box2D.Common.Math.b2Vec2(a.x + b.x * 20, a.y));
    game.platformer.createBreakableBlock(b, new Box2D.Common.Math.b2Vec2(a.x + b.x * 20, a.y - b.y * 4));
    game.platformer.createBlock(b, new Box2D.Common.Math.b2Vec2(a.x + b.x * 21, a.y));
    game.platformer.createBreakableBlock(b, new Box2D.Common.Math.b2Vec2(a.x + b.x * 21, a.y - b.y * 4));
    game.platformer.createBlock(b, new Box2D.Common.Math.b2Vec2(a.x + b.x * 22, a.y));
    game.platformer.createBreakableBlock(b, new Box2D.Common.Math.b2Vec2(a.x + b.x * 22, a.y - b.y * 4));
    game.platformer.createBreakableBlock(b, new Box2D.Common.Math.b2Vec2(a.x + b.x * 22, a.y - b.y * 8));
    game.platformer.createBlock(b, new Box2D.Common.Math.b2Vec2(a.x + b.x * 23, a.y));
    game.platformer.createBreakableBlock(b, new Box2D.Common.Math.b2Vec2(a.x + b.x * 23, a.y - b.y * 4));
    game.platformer.createBlock(b, new Box2D.Common.Math.b2Vec2(a.x + b.x * 24, a.y));
    game.platformer.createBreakableBlock(b, new Box2D.Common.Math.b2Vec2(a.x + b.x * 24, a.y - b.y * 4));
    game.platformer.createBlock(b, new Box2D.Common.Math.b2Vec2(a.x + b.x * 25, a.y));
    game.platformer.createBlock(b, new Box2D.Common.Math.b2Vec2(a.x + b.x * 26, a.y));
    game.platformer.createBlock(b, new Box2D.Common.Math.b2Vec2(a.x + b.x * 27, a.y));
    game.platformer.createBlock(b, new Box2D.Common.Math.b2Vec2(a.x + b.x * 28, a.y));
    game.platformer.createBlock(b, new Box2D.Common.Math.b2Vec2(a.x + b.x * 28, a.y - b.y * 1));
    game.platformer.createBlock(b, new Box2D.Common.Math.b2Vec2(a.x + b.x * 28, a.y - b.y * 2));
    game.platformer.createBlock(b, new Box2D.Common.Math.b2Vec2(a.x + b.x * 29, a.y));
    game.platformer.createBlock(b, new Box2D.Common.Math.b2Vec2(a.x + b.x * 29, a.y - b.y * 1));
    game.platformer.createBlock(b, new Box2D.Common.Math.b2Vec2(a.x + b.x * 29, a.y - b.y * 2));
    game.platformer.createBlock(b, new Box2D.Common.Math.b2Vec2(a.x + b.x * 30, a.y));
    game.platformer.createBlock(b, new Box2D.Common.Math.b2Vec2(a.x + b.x * 31, a.y));
    game.platformer.createBlock(b, new Box2D.Common.Math.b2Vec2(a.x + b.x * 32, a.y));
    game.platformer.createBlock(b, new Box2D.Common.Math.b2Vec2(a.x + b.x * 33, a.y));
    game.platformer.createBlock(b, new Box2D.Common.Math.b2Vec2(a.x + b.x * 34, a.y));
    game.platformer.createBlock(b, new Box2D.Common.Math.b2Vec2(a.x + b.x * 35, a.y));
    game.platformer.createBlock(b, new Box2D.Common.Math.b2Vec2(a.x + b.x * 36, a.y));
    game.platformer.createBlock(b, new Box2D.Common.Math.b2Vec2(a.x + b.x * 37, a.y));
    game.platformer.createBlock(b, new Box2D.Common.Math.b2Vec2(a.x + b.x * 38, a.y));
    game.platformer.createBlock(b, new Box2D.Common.Math.b2Vec2(a.x + b.x * 38, a.y - b.y * 1));
    game.platformer.createBlock(b, new Box2D.Common.Math.b2Vec2(a.x + b.x * 38, a.y - b.y * 2));
    game.platformer.createBlock(b, new Box2D.Common.Math.b2Vec2(a.x + b.x * 38, a.y - b.y * 3));
    game.platformer.createBlock(b, new Box2D.Common.Math.b2Vec2(a.x + b.x * 39, a.y));
    game.platformer.createBlock(b, new Box2D.Common.Math.b2Vec2(a.x + b.x * 39, a.y - b.y * 1));
    game.platformer.createBlock(b, new Box2D.Common.Math.b2Vec2(a.x + b.x * 39, a.y - b.y * 2));
    game.platformer.createBlock(b, new Box2D.Common.Math.b2Vec2(a.x + b.x * 39, a.y - b.y * 3));
    game.platformer.createBlock(b, new Box2D.Common.Math.b2Vec2(a.x + b.x * 40, a.y));
    game.platformer.createBlock(b, new Box2D.Common.Math.b2Vec2(a.x + b.x * 41, a.y));
    game.platformer.createBlock(b, new Box2D.Common.Math.b2Vec2(a.x + b.x * 42, a.y));
    game.platformer.createBlock(b, new Box2D.Common.Math.b2Vec2(a.x + b.x * 43, a.y));
    game.platformer.createBlock(b, new Box2D.Common.Math.b2Vec2(a.x + b.x * 44, a.y));
    game.platformer.createBlock(b, new Box2D.Common.Math.b2Vec2(a.x + b.x * 45, a.y));
    game.platformer.createBlock(b, new Box2D.Common.Math.b2Vec2(a.x + b.x * 46, a.y));
    game.platformer.createBlock(b, new Box2D.Common.Math.b2Vec2(a.x + b.x * 46, a.y - b.y * 1));
    game.platformer.createBlock(b, new Box2D.Common.Math.b2Vec2(a.x + b.x * 46, a.y - b.y * 2));
    game.platformer.createBlock(b, new Box2D.Common.Math.b2Vec2(a.x + b.x * 46, a.y - b.y * 3));
    game.platformer.createBlock(b, new Box2D.Common.Math.b2Vec2(a.x + b.x * 46, a.y - b.y * 4));
    game.platformer.createBlock(b, new Box2D.Common.Math.b2Vec2(a.x + b.x * 47, a.y));
    game.platformer.createBlock(b, new Box2D.Common.Math.b2Vec2(a.x + b.x * 47, a.y - b.y * 1));
    game.platformer.createBlock(b, new Box2D.Common.Math.b2Vec2(a.x + b.x * 47, a.y - b.y * 2));
    game.platformer.createBlock(b, new Box2D.Common.Math.b2Vec2(a.x + b.x * 47, a.y - b.y * 3));
    game.platformer.createBlock(b, new Box2D.Common.Math.b2Vec2(a.x + b.x * 47, a.y - b.y * 4));
    game.platformer.createBlock(b, new Box2D.Common.Math.b2Vec2(a.x + b.x * 48, a.y));
    game.platformer.createBlock(b, new Box2D.Common.Math.b2Vec2(a.x + b.x * 49, a.y));
    game.platformer.createBlock(b, new Box2D.Common.Math.b2Vec2(a.x + b.x * 50, a.y));
    game.platformer.createBlock(b, new Box2D.Common.Math.b2Vec2(a.x + b.x * 51, a.y));
    game.platformer.createBlock(b, new Box2D.Common.Math.b2Vec2(a.x + b.x * 52, a.y));
    game.platformer.createBlock(b, new Box2D.Common.Math.b2Vec2(a.x + b.x * 53, a.y));
    game.platformer.createBlock(b, new Box2D.Common.Math.b2Vec2(a.x + b.x * 54, a.y));
    game.platformer.createBlock(b, new Box2D.Common.Math.b2Vec2(a.x + b.x * 55, a.y));
    game.platformer.createBlock(b, new Box2D.Common.Math.b2Vec2(a.x + b.x * 56, a.y));
    game.platformer.createBlock(b, new Box2D.Common.Math.b2Vec2(a.x + b.x * 57, a.y));
    game.platformer.createBlock(b, new Box2D.Common.Math.b2Vec2(a.x + b.x * 57, a.y - b.y * 1));
    game.platformer.createBlock(b, new Box2D.Common.Math.b2Vec2(a.x + b.x * 57, a.y - b.y * 2));
    game.platformer.createBlock(b, new Box2D.Common.Math.b2Vec2(a.x + b.x * 57, a.y - b.y * 3));
    game.platformer.createBlock(b, new Box2D.Common.Math.b2Vec2(a.x + b.x * 57, a.y - b.y * 4));
    game.platformer.createBlock(b, new Box2D.Common.Math.b2Vec2(a.x + b.x * 58, a.y));
    game.platformer.createBlock(b, new Box2D.Common.Math.b2Vec2(a.x + b.x * 58, a.y - b.y * 1));
    game.platformer.createBlock(b, new Box2D.Common.Math.b2Vec2(a.x + b.x * 58, a.y - b.y * 2));
    game.platformer.createBlock(b, new Box2D.Common.Math.b2Vec2(a.x + b.x * 58, a.y - b.y * 3));
    game.platformer.createBlock(b, new Box2D.Common.Math.b2Vec2(a.x + b.x * 58, a.y - b.y * 4));
    game.platformer.createBlock(b, new Box2D.Common.Math.b2Vec2(a.x + b.x * 59, a.y));
    game.platformer.createBlock(b, new Box2D.Common.Math.b2Vec2(a.x + b.x * 60, a.y));
    game.platformer.createBlock(b, new Box2D.Common.Math.b2Vec2(a.x + b.x * 61, a.y));
    game.platformer.createBlock(b, new Box2D.Common.Math.b2Vec2(a.x + b.x * 62, a.y));
    game.platformer.createBlock(b, new Box2D.Common.Math.b2Vec2(a.x + b.x * 63, a.y));
    game.platformer.createBlock(b, new Box2D.Common.Math.b2Vec2(a.x + b.x * 64, a.y));
    game.platformer.createBreakableBlock(b, new Box2D.Common.Math.b2Vec2(a.x + b.x * 64, a.y - b.y * 5));
    game.platformer.createBlock(b, new Box2D.Common.Math.b2Vec2(a.x + b.x * 65, a.y));
    game.platformer.createBlock(b, new Box2D.Common.Math.b2Vec2(a.x + b.x * 66, a.y));
    game.platformer.createBlock(b, new Box2D.Common.Math.b2Vec2(a.x + b.x * 67, a.y));
    game.platformer.createBlock(b, new Box2D.Common.Math.b2Vec2(a.x + b.x * 68, a.y));
    game.platformer.createBlock(b, new Box2D.Common.Math.b2Vec2(a.x + b.x * 71, a.y));
    game.platformer.createBlock(b, new Box2D.Common.Math.b2Vec2(a.x + b.x * 72, a.y));
    game.platformer.createBlock(b, new Box2D.Common.Math.b2Vec2(a.x + b.x * 73, a.y));
    game.platformer.createBlock(b, new Box2D.Common.Math.b2Vec2(a.x + b.x * 74, a.y));
    game.platformer.createBlock(b, new Box2D.Common.Math.b2Vec2(a.x + b.x * 75, a.y));
    game.platformer.createBlock(b, new Box2D.Common.Math.b2Vec2(a.x + b.x * 76, a.y));
    game.platformer.createBlock(b, new Box2D.Common.Math.b2Vec2(a.x + b.x * 77, a.y));
    game.platformer.createBreakableBlock(b, new Box2D.Common.Math.b2Vec2(a.x + b.x * 77, a.y - b.y * 4));
    game.platformer.createBlock(b, new Box2D.Common.Math.b2Vec2(a.x + b.x * 78, a.y));
    game.platformer.createBreakableBlock(b, new Box2D.Common.Math.b2Vec2(a.x + b.x * 78, a.y - b.y * 4));
    game.platformer.createBlock(b, new Box2D.Common.Math.b2Vec2(a.x + b.x * 79, a.y));
    game.platformer.createBreakableBlock(b, new Box2D.Common.Math.b2Vec2(a.x + b.x * 79, a.y - b.y * 4))
  };
  a.preThink = function(a, b) {
    f.handleKeyEvents(b)
  };
  a.preDraw = function() {
    game.ui.lookAt(player.body.GetWorldCenter())
  }
})(test);


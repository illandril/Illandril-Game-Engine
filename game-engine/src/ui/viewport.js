goog.provide('illandril.game.ui.viewport');

goog.require('Box2D.Collision.b2AABB');
goog.require('Box2D.Common.Math.b2Vec2');
goog.require('Box2D.Dynamics.b2DebugDraw');

goog.require('illandril.game.ui.ui');
goog.require('illandril.game.ui.spriteSheet');

/**
 * @param {!illandril.game.game} g The game for this viewport
 * @param {string} containerID The id of the container for this viewport
 * @param {number} scale The scale of the viewport (pixels per meter)
 * @param {!Box2D.Common.Math.b2Vec2} viewportSize The size of the viewport (pixels)
 * @param {boolean} debug Flag indicating if the viewport should include debug information or not
 * @constructor
 */
illandril.game.ui.viewport = function(g, containerID, scale, viewportSize, debug) {
    this.domObjects = {};
    this.game = g;
    this.viewportSize = viewportSize;
    this.scaledViewportSize = new Box2D.Common.Math.b2Vec2(viewportSize.x / scale, viewportSize.y / scale);
    this.scale = scale;
    this.camera = new Box2D.Common.Math.b2Vec2(0, 0);
    this.lastCamera = new Box2D.Common.Math.b2Vec2(-1, -1); // Can't be 0,0, or if we start in the top-left corner the viewportWorldObject won't update
    
    var viewportWorldObjectSize = new Box2D.Common.Math.b2Vec2(this.scaledViewportSize.x * illandril.game.ui.viewport.VIEWPORT_LOAD_SCALE, this.scaledViewportSize.y * illandril.game.ui.viewport.VIEWPORT_LOAD_SCALE);
    this.viewportWorldObject = this.game.getWorld().createStaticBox(viewportWorldObjectSize, new Box2D.Common.Math.b2Vec2(0, 0), false /* visible */, null /* bodyArgs */, { isSensor: true } );
    this.lookAt(new Box2D.Common.Math.b2Vec2(0, 0));
    
    var container = document.getElementById(containerID);
    this.displayContainer = document.createElement('span');
    if (debug) {
        container.innerHTML = '<div style="width: ' + this.viewportSize.x + 'px; height: ' + this.viewportSize.y / 2 + 'px; background-color: #000; opacity: 0.15; position: absolute;"></div><div style="width: ' + this.viewportSize.x / 2 + 'px; height: ' + this.viewportSize.y + 'px; background-color: #FFF; opacity: 0.15; position: absolute;"></div>';
        this.displayContainer.innerHTML = '<canvas id="' + containerID + '__DEBUG" class="debugViewport"></canvas>';
    }
    this.displayContainer.className = 'viewportContainer';
    this.displayContainer.style.width = this.viewportSize.x + 'px';
    this.displayContainer.style.height = this.viewportSize.y + 'px';
    this.display = document.createElement('span');
    this.display.className = 'viewport';
    this.displayContainer.appendChild(this.display);
    container.appendChild(this.displayContainer);
    
    this.loadingMessage = document.createElement('div');
    
    this.loadingMessage = this.createMessageDOMObject("Loading, please wait.");
    this.showMessageDOMObject(this.loadingMessage);
    this.pausedMessage = this.createMessageDOMObject("Paused");
    
    if (debug) {
        this.debugCanvas = document.getElementById(containerID + '__DEBUG');
        this.debugCanvas.width = this.game.getWorld().getWorldWidth() * scale;
        this.debugCanvas.height = this.game.getWorld().getWorldHeight() * scale;
        this.debugCanvas.style.marginRight = '-' + this.debugCanvas.width + 'px';
        this.debugCanvas.style.marginBottom = '-' + this.debugCanvas.height + 'px';
        
        var debugDraw = new Box2D.Dynamics.b2DebugDraw();
        debugDraw.SetSprite(this.debugCanvas.getContext('2d'));
        debugDraw.SetDrawScale(scale);
        debugDraw.SetFillAlpha(0.3);
        debugDraw.SetLineThickness(1);
        debugDraw.SetFlags(illandril.game.ui.viewport.B2DEBUG_FLAGS);
        this.game.getWorld().getBox2DWorld().SetDebugDraw(debugDraw);
    } else {
        this.debugCanvas = null;
    }
};

illandril.game.ui.viewport.prototype.createMessageDOMObject = function(message) {
    var messageDOM = document.createElement('div');
    messageDOM.style.fontSize = "40px";
    messageDOM.style.textAlign = "center";
    messageDOM.style.verticalAlign = "middle";
    messageDOM.style.backgroundColor = "rgba(255,255,255,0.5)";
    messageDOM.style.color = "black";
    messageDOM.style.position = "relative";
    messageDOM.style.display = "none";
    messageDOM.style.zIndex = illandril.game.ui.viewport.BASE_Z + illandril.game.ui.viewport.LAYERS.MESSAGES;
    messageDOM.innerHTML = message;
    messageDOM.style.width = (this.viewportSize.x) + "px";
    messageDOM.style.height = (this.viewportSize.y) + "px";
    this.displayContainer.appendChild(messageDOM);
    return messageDOM;
};

illandril.game.ui.viewport.prototype.getDisplayDOMObject = function() {
    return this.display;
};

illandril.game.ui.viewport.prototype.hideLoading = function() {
    this.hideMessageDOMObject(this.loadingMessage);
};

illandril.game.ui.viewport.prototype.showMessageDOMObject = function(obj) {
    if(obj.style.display == "none") {
        obj.style.display = illandril.game.ui.viewport.MESSAGE_DISPLAY;
    }
};

illandril.game.ui.viewport.prototype.hideMessageDOMObject = function(obj) {
    if(obj.style.display != "none") {
        obj.style.display = "none";
    }
};

illandril.game.ui.viewport.prototype.showPaused = function() {
    this.showMessageDOMObject(this.pausedMessage);
};

illandril.game.ui.viewport.prototype.hidePaused = function() {
    this.hideMessageDOMObject(this.pausedMessage);
};

illandril.game.ui.viewport.prototype.lookAt = function(position) {
    this.camera.x = position.x;
    this.camera.y = position.y;
    if ( this.camera.x < this.scaledViewportSize.x / 2 ) {
        this.camera.x = this.scaledViewportSize.x / 2;
    } else if ( this.camera.x > this.game.getWorld().getWorldWidth() - this.scaledViewportSize.x / 2 ) {
        this.camera.x = this.game.getWorld().getWorldWidth() - this.scaledViewportSize.x / 2;
    }
    if ( this.camera.y < this.scaledViewportSize.y / 2 ) {
        this.camera.y = this.scaledViewportSize.y / 2;
    } else if ( this.camera.y > this.game.getWorld().getWorldHeight() - this.scaledViewportSize.y / 2 ) {
        this.camera.y = this.game.getWorld().getWorldHeight() - this.scaledViewportSize.y / 2;
    }
};


illandril.game.ui.viewport.prototype.draw = function(time, tick) {
    this.display.style.visibility = "hidden";
    if (this.lastCamera.x != this.camera.x || this.lastCamera.y != this.camera.y) {
        this.lastCamera.x = this.camera.x;
        this.lastCamera.y = this.camera.y;
        if (this.debugCanvas !== null) {
            this.debugCanvas.style.left = "-" + ( this.camera.x * this.scale - this.viewportSize.x / 2 ) + "px";
            this.debugCanvas.style.top = "-" + ( this.camera.y * this.scale - this.viewportSize.y / 2 ) + "px";
        }
        this.display.style.left = "-" + ( this.camera.x * this.scale - this.viewportSize.x / 2 ) + "px";
        this.display.style.top = "-" + ( this.camera.y * this.scale - this.viewportSize.y / 2 ) + "px";
        this.viewportWorldObject.body.SetPosition(new Box2D.Common.Math.b2Vec2(this.camera.x, this.camera.y));
    }
    
    var undisplayedDOMObjects = [];
    for (var i in this.domObjects) {
        undisplayedDOMObjects[i] = this.domObjects[i];
    }
    var viewportAABB = this.viewportWorldObject.fixture.GetAABB();
    var worldObjects = this.game.getWorld().objects;
    for(var oid in worldObjects) {
        var obj = worldObjects[oid];
        if (obj.display) {
            var objDisplay = obj.display;
            var visible = false;
            var pos = obj.getDisplayPosition(this.camera);
            var size = objDisplay.size;
            objDisplay.aabb.lowerBound.Set(pos.x - size.x, pos.y - size.y);
            objDisplay.aabb.upperBound.Set(pos.x + size.x, pos.y + size.y);
            if (!viewportAABB.TestOverlap(objDisplay.aabb)) {
                continue;
            }
            if ( objDisplay.viewID == null ) {
                objDisplay.viewID = illandril.game.ui.viewport._nextUID++;
            }
            delete undisplayedDOMObjects[objDisplay.viewID];
            if (this.domObjects[objDisplay.viewID] == null) {
                this.domObjects[objDisplay.viewID] = document.createElement('span');
                this.domObjects[objDisplay.viewID].className = 'gameObject';
                this.domObjects[objDisplay.viewID].style.zIndex = illandril.game.ui.viewport.BASE_Z + (objDisplay.zOffset || illandril.game.ui.viewport.LAYERS.DEFAULT);
                this.display.appendChild(this.domObjects[objDisplay.viewID]);
            }
            var domObject = this.domObjects[objDisplay.viewID];
            var savedStyle = illandril.game.ui.ui.getDOMStyleCache(domObject);
            var newScale = this.scale != savedStyle.scale;
            savedStyle.scale = this.scale;
            var left = pos.x - (size.x / 2);
            if ( newScale || savedStyle.left != left ) {
                savedStyle.left = left;
                domObject.style.left = (left * this.scale) + "px";
            }
            var top = pos.y - (size.y / 2);
            if ( newScale || savedStyle.top != top ) {
                savedStyle.top = top;
                domObject.style.top = (top * this.scale) + "px";
            }
            var width = size.x;
            if ( newScale || savedStyle.width != width ) {
                savedStyle.width = width;
                domObject.style.width = (width * this.scale) + "px";
            }
            var height = size.y;
            if ( newScale || savedStyle.height != height ) {
                savedStyle.height = height;
                domObject.style.height = (height * this.scale) + "px";
            }
            var rotation = obj.getDisplayAngle(this.camera);
            if ( savedStyle.rotation != rotation ) {
                savedStyle.rotation = rotation;
                domObject.style.webkitTransform = "rotate(" + rotation + "rad)";
            }
            if (objDisplay.spriteSheet != null) {
                objDisplay.spriteSheet.updateDOM(domObject);
            }
        }
    }
    for (var n in undisplayedDOMObjects) {
        this.display.removeChild(undisplayedDOMObjects[n]);
        delete this.domObjects[n];
    }
    if (this.debugCanvas !== null) {
        this.debugCanvas.style.visibility = "hidden";
        this.game.getWorld().getBox2DWorld().DrawDebugData();
        this.debugCanvas.style.visibility = "";
    }
    this.display.style.visibility = "";
};

illandril.game.ui.viewport.prototype.setDisplaySize = function(object, size) {
    if (object.display == null) {
        object.display = {};
        object.display.aabb = new Box2D.Collision.b2AABB();
        object.getDisplayPosition = function(camera) {
            var pos = this.getPosition();
            if(this.display.parallaxMultiplier == 0) {
                return pos;
            } else {
                var newX = pos.x + (camera.x - pos.x) * this.display.parallaxMultiplier;
                var newY = pos.y + (camera.y - pos.y) * this.display.parallaxMultiplier;
                return new Box2D.Common.Math.b2Vec2(newX, newY);
            }
        };
        object.getDisplayAngle = function(camera) {
            return this.getAngle();
        };
        this.setParallax(object, 0);
        this.setZOffset(object, 0);
    }
    object.display.size = size.Copy(); // Meters
};

illandril.game.ui.viewport.prototype.setImage = function(object, url, offset) {
    object.display.spriteSheet = new illandril.game.ui.spriteSheet(url, offset);
};

// Parallax level of 0 means no parallax at all
// Parallax level of 10 means display shifted by 10%
// Parallax Level of 100 means follow the camera
illandril.game.ui.viewport.prototype.setParallax = function(object, parallaxLevel) {
    object.display.parallaxMultiplier = parallaxLevel / 100;
};

// Parallax level of 0 means no parallax at all
// Parallax level of 10 means display shifted by 10%
// Parallax Level of 100 means follow the camera
illandril.game.ui.viewport.prototype.setZOffset = function(object, zOffset) {
    object.display.zOffset = zOffset;
};

// CONSTANTS
/**
 * @const
 * @type {number}
 */
illandril.game.ui.viewport.VIEWPORT_LOAD_SCALE = 1.25;

/**
 * @const
 * @type {number}
 */
illandril.game.ui.viewport.BASE_Z = 100;

/**
 * @const
 * @type {Object.<string, number>}
 */
illandril.game.ui.viewport.LAYERS = {
    SCENERY: -10,
    DEFAULT: 0,
    PLAYER: 10,
    HUD: 50,
    MESSAGES: 100
};

/**
 * @const
 * @type {string}
 */
illandril.game.ui.viewport.MESSAGE_DISPLAY = "table-cell";

/**
 * @const
 * @type {number}
 */
illandril.game.ui.viewport.B2DEBUG_FLAGS = 0
                        | Box2D.Dynamics.b2DebugDraw.e_aabbBit
//                        | Box2D.Dynamics.b2DebugDraw.e_centerOfMassBit
//                        | Box2D.Dynamics.b2DebugDraw.e_controllerBit
//                        | Box2D.Dynamics.b2DebugDraw.e_jointBit
//                        | Box2D.Dynamics.b2DebugDraw.e_pairBit
                        | Box2D.Dynamics.b2DebugDraw.e_shapeBit
                        ;
                        

// STATICS
/**
 * @type {number}
 */
illandril.game.ui.viewport._nextUID = 0;

goog.provide('game.ui.viewport');

goog.require('game.ui');
goog.require('game.ui.spriteSheet');


game.ui.viewport = function(g, containerID, scale, viewportSize, debug) {
    this.domObjects = {};
    this.game = g;
    this.viewportSize = viewportSize;
    this.scaledViewportSize = new Box2D.Common.Math.b2Vec2(viewportSize.x / scale, viewportSize.y / scale);
    this.scale = scale;
    this.camera = new Box2D.Common.Math.b2Vec2(0, 0);
    this.lastCamera = new Box2D.Common.Math.b2Vec2(-1, -1); // Can't be 0,0, or if we start in the top-left corner the viewportWorldObject won't update
    
    var viewportWorldObjectSize = new Box2D.Common.Math.b2Vec2(this.scaledViewportSize.x * game.ui.viewport.VIEWPORT_LOAD_SCALE, this.scaledViewportSize.y * game.ui.viewport.VIEWPORT_LOAD_SCALE);
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
        debugDraw.SetFlags(game.ui.viewport.B2DEBUG_FLAGS);
        this.game.getWorld().getBox2DWorld().SetDebugDraw(debugDraw);
    } else {
        this.debugCanvas = null;
    }
};

game.ui.viewport.prototype.createMessageDOMObject = function(message) {
    var messageDOM = document.createElement('div');
    messageDOM.style.fontSize = "40px";
    messageDOM.style.textAlign = "center";
    messageDOM.style.verticalAlign = "middle";
    messageDOM.style.backgroundColor = "rgba(255,255,255,0.5)";
    messageDOM.style.color = "black";
    messageDOM.style.position = "relative";
    messageDOM.style.display = "none";
    messageDOM.style.zIndex = 10000;
    messageDOM.innerHTML = message;
    messageDOM.style.width = (this.viewportSize.x) + "px";
    messageDOM.style.height = (this.viewportSize.y) + "px";
    this.displayContainer.appendChild(messageDOM);
    return messageDOM;
};

game.ui.viewport.prototype.getDisplayDOMObject = function() {
    return this.display;
};

game.ui.viewport.prototype.hideLoading = function() {
    this.hideMessageDOMObject(this.loadingMessage);
};

game.ui.viewport.prototype.showMessageDOMObject = function(obj) {
    if(obj.style.display == "none") {
        obj.style.display = game.ui.viewport.MESSAGE_DISPLAY;
    }
};

game.ui.viewport.prototype.hideMessageDOMObject = function(obj) {
    if(obj.style.display != "none") {
        obj.style.display = "none";
    }
};

game.ui.viewport.prototype.showPaused = function() {
    this.showMessageDOMObject(this.pausedMessage);
};

game.ui.viewport.prototype.hidePaused = function() {
    this.hideMessageDOMObject(this.pausedMessage);
};

game.ui.viewport.prototype.lookAt = function(position) {
    this.camera.x = position.x - this.scaledViewportSize.x / 2;
    this.camera.y = position.y - this.scaledViewportSize.y / 2;
    if ( this.camera.x < 0 ) {
        this.camera.x = 0;
    } else if ( this.camera.x > this.game.getWorld().getWorldWidth() - this.scaledViewportSize.x ) {
        this.camera.x = this.game.getWorld().getWorldWidth() - this.scaledViewportSize.x;
    }
    if ( this.camera.y < 0 ) {
        this.camera.y = 0;
    } else if ( this.camera.y > this.game.getWorld().getWorldHeight() - this.scaledViewportSize.y ) {
        this.camera.y = this.game.getWorld().getWorldHeight() - this.scaledViewportSize.y;
    }
};


game.ui.viewport.prototype.draw = function(time, tick) {
    this.display.style.visibility = "hidden";
    if (this.lastCamera.x != this.camera.x || this.lastCamera.y != this.camera.y) {
        this.lastCamera.x = this.camera.x;
        this.lastCamera.y = this.camera.y;
        if (this.debugCanvas !== null) {
            this.debugCanvas.style.left = "-" + ( this.camera.x * this.scale ) + "px";
            this.debugCanvas.style.top = "-" + ( this.camera.y * this.scale ) + "px";
        }
        this.display.style.left = "-" + ( this.camera.x * this.scale ) + "px";
        this.display.style.top = "-" + ( this.camera.y * this.scale ) + "px";
        this.viewportWorldObject.body.SetPosition(new Box2D.Common.Math.b2Vec2(this.camera.x + this.scaledViewportSize.x / 2, this.camera.y + this.scaledViewportSize.y / 2));
    }
    
    var undisplayedDOMObjects = [];
    for (var i in this.domObjects) {
        undisplayedDOMObjects[i] = this.domObjects[i];
    }
    var viewportAABB = this.viewportWorldObject.fixture.GetAABB();
    for(var body = this.game.getWorld().getBox2DWorld().GetBodyList(); body; body = body.GetNext()) {
        if ( body.object && body.object.display ) {
            var objDisplay = body.object.display;
            var visible = false;
            for(var fixture = body.GetFixtureList(); fixture; fixture = fixture.GetNext()) {
                if (viewportAABB.TestOverlap(fixture.GetAABB())) {
                    visible = true;
                    break;
                }
            }
            if (!visible) {
                continue;
            }
            var pos = body.GetPosition();
            var size = objDisplay.size;
            if ( objDisplay.viewID == null ) {
                objDisplay.viewID = game.ui.viewport._nextUID++;
            }
            delete undisplayedDOMObjects[objDisplay.viewID];
            if (this.domObjects[objDisplay.viewID] == null) {
                this.domObjects[objDisplay.viewID] = document.createElement('span');
                this.domObjects[objDisplay.viewID].className = 'gameObject';
                this.display.appendChild(this.domObjects[objDisplay.viewID]);
            }
            var domObject = this.domObjects[objDisplay.viewID];
            var savedStyle = game.ui.getDOMStyleCache(domObject);
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
            var rotation = body.GetAngle();
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


// CONSTANTS
game.ui.viewport.VIEWPORT_LOAD_SCALE = 1.25;

game.ui.viewport.MESSAGE_DISPLAY = "table-cell";

game.ui.viewport.B2DEBUG_FLAGS = 0
                        | Box2D.Dynamics.b2DebugDraw.e_aabbBit
//                        | Box2D.Dynamics.b2DebugDraw.e_centerOfMassBit
//                        | Box2D.Dynamics.b2DebugDraw.e_controllerBit
//                        | Box2D.Dynamics.b2DebugDraw.e_jointBit
//                        | Box2D.Dynamics.b2DebugDraw.e_pairBit
                        | Box2D.Dynamics.b2DebugDraw.e_shapeBit
                        ;
                        

// STATICS


game.ui.viewport._nextUID = 0;

game.ui.viewport.prototype.setDisplaySize = function(object, size) {
    object.display = object.display || {};
    object.display.size = size; // Meters
};

game.ui.viewport.prototype.setImage = function(object, url, offset) {
    if (object.display == null || object.display.size == null) {
        throw 'Attempt to set image of object with no display size!'
    }
    object.display.spriteSheet = new game.ui.spriteSheet(url, offset);
};

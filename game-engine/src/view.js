goog.provide('game.ui');

game = game || {};
(function(game){
    var b2dDebugFlags = 0;
    b2dDebugFlags = b2dDebugFlags | Box2D.Dynamics.b2DebugDraw.e_aabbBit;
    //b2dDebugFlags = b2dDebugFlags | Box2D.Dynamics.b2DebugDraw.e_centerOfMassBit;
    //b2dDebugFlags = b2dDebugFlags | Box2D.Dynamics.b2DebugDraw.e_controllerBit;
    //b2dDebugFlags = b2dDebugFlags | Box2D.Dynamics.b2DebugDraw.e_jointBit;
    //b2dDebugFlags = b2dDebugFlags | Box2D.Dynamics.b2DebugDraw.e_pairBit;
    b2dDebugFlags = b2dDebugFlags | Box2D.Dynamics.b2DebugDraw.e_shapeBit;
    
    var nextID = 0;
    
    var domObjects = {};
    var scale = null;
    var viewportWidth = null;
    var viewportHeight = null;
    var scaledViewportWidth = null;
    var scaledViewportHeight = null;
    var display = null;
    var debugCanvas = null;
    var camera = new Box2D.Common.Math.b2Vec2(0, 0);
    var lastCamera = new Box2D.Common.Math.b2Vec2(0, 0);
    
    game.ui = {};
    
    game.ui.getDisplayDOMObject = function() {
        return display;
    };
    
    game.ui.initDisplay = function(containerID, _scale, viewportSize, debug) {
        scale = _scale;
        viewportWidth = viewportSize.x;
        viewportHeight = viewportSize.y;
        scaledViewportWidth = ( viewportWidth / scale );
        scaledViewportHeight = ( viewportHeight / scale );
        game.ui.lookAt( new Box2D.Common.Math.b2Vec2( 0, 0 ) );
        
        var container = document.getElementById(containerID);
        var displayContainer = document.createElement('span');
        if (debug) {
            container.innerHTML = '<div style="width: ' + viewportWidth + 'px; height: ' + viewportHeight / 2 + 'px; background-color: #000; opacity: 0.15; position: absolute;"></div><div style="width: ' + viewportWidth / 2 + 'px; height: ' + viewportHeight + 'px; background-color: #FFF; opacity: 0.15; position: absolute;"></div>';
            displayContainer.innerHTML = '<canvas id="' + containerID + '__DEBUG" class="debugViewport"></canvas>';
        }
        displayContainer.className = 'viewportContainer';
        displayContainer.style.width = viewportWidth + 'px';
        displayContainer.style.height = viewportHeight + 'px';
        display = document.createElement('span');
        display.className = 'viewport';
        displayContainer.appendChild(display);
        container.appendChild(displayContainer);

        if (debug) {
            debugCanvas = document.getElementById(containerID + '__DEBUG');
            debugCanvas.width = game.world.getWorldWidth() * scale;
            debugCanvas.height = game.world.getWorldHeight() * scale;
            debugCanvas.style.marginRight = '-' + debugCanvas.width + 'px';
            debugCanvas.style.marginBottom = '-' + debugCanvas.height + 'px';
            
            var debugDraw = new Box2D.Dynamics.b2DebugDraw();
            debugDraw.SetSprite(debugCanvas.getContext('2d'));
            debugDraw.SetDrawScale(scale);
            debugDraw.SetFillAlpha(0.3);
            debugDraw.SetLineThickness(1);
            debugDraw.SetFlags(b2dDebugFlags);
            game.world.getBox2DWorld().SetDebugDraw(debugDraw);
        }
    };
    
    game.ui.lookAt = function(position) {
        camera.x = position.x - scaledViewportWidth / 2;
        camera.y = position.y - scaledViewportHeight / 2;
        if ( camera.x < 0 ) {
            camera.x = 0;
        } else if ( camera.x > game.world.getWorldWidth() - scaledViewportWidth ) {
            camera.x = game.world.getWorldWidth() - scaledViewportWidth;
        }
        if ( camera.y < 0 ) {
            camera.y = 0;
        } else if ( camera.y > game.world.getWorldHeight() - scaledViewportHeight ) {
            camera.y = game.world.getWorldHeight() - scaledViewportHeight;
        }
    };
    
    game.ui.draw = function(time, tick) {
        if (display == null) {
            throw "Display not yet initialized!";
        }
        if (lastCamera.x != camera.x || lastCamera.y != camera.y) {
            lastCamera.x = camera.x;
            lastCamera.y = camera.y;
            if (debugCanvas != null) {
                debugCanvas.style.left = "-" + ( camera.x * scale ) + "px";
                debugCanvas.style.top = "-" + ( camera.y * scale ) + "px";
            }
            display.style.left = "-" + ( camera.x * scale ) + "px";
            display.style.top = "-" + ( camera.y * scale ) + "px";
        }
        
        var body = game.world.getBox2DWorld().GetBodyList();
        while( body != null ) {
            if ( body.display != null ) {
                var pos = body.GetPosition();
                var size = body.display.size;
                if ( body.display.viewID == null ) {
                    body.display.viewID = nextID++;
                }
                if ( domObjects[body.display.viewID] == null ) {
                    domObjects[body.display.viewID] = document.createElement('span');
                    domObjects[body.display.viewID].className = 'gameObject';
                    domObjects[body.display.viewID].savedStyle = {};
                    display.appendChild( domObjects[body.display.viewID] );
                }
                var domObject = domObjects[body.display.viewID];
                var left = ( ( pos.x - size.x / 2 ) * scale );
                if ( domObject.savedStyle.left != left ) {
                    domObject.savedStyle.left = left;
                    domObject.style.left = left + "px";
                }
                var top = ( ( pos.y - size.y / 2 ) * scale );
                if ( domObject.savedStyle.top != top ) {
                    domObject.savedStyle.top = top;
                    domObject.style.top = top + "px";
                }
                var width = ( size.x * scale );
                if ( domObject.savedStyle.width != width ) {
                    domObject.savedStyle.width = width;
                    domObject.style.width = width + "px";
                }
                var height = ( size.y * scale );
                if ( domObject.savedStyle.height != height ) {
                    domObject.savedStyle.height = height;
                    domObject.style.height = height + "px";
                }
                var rotation = body.GetAngle();
                if ( domObject.savedStyle.rotation != rotation ) {
                    domObject.savedStyle.rotation = rotation;
                    domObject.style.webkitTransform = "rotate(" + rotation + "rad)";
                }
                if (body.display.spriteSheet != null) {
                    var bg = body.display.spriteSheet.url;
                    if ( domObject.savedStyle.bg != bg ) {
                        domObject.savedStyle.bg = bg;
                        domObject.style.backgroundImage = 'url(' + bg + ')';
                        domObject.style.backgroundColor = 'transparent';
                    }
                    var bgPos = body.display.spriteSheet.frameOffset;
                    if ( bgPos != null && ( domObject.savedStyle.bgPosX != bgPos.x || domObject.savedStyle.bgPosY != bgPos.y ) ) {
                        domObject.savedStyle.bgPosX = bgPos.x;
                        domObject.savedStyle.bgPosY = bgPos.y;
                        domObject.style.backgroundPosition = (bgPos.x * -1) + 'px ' + (bgPos.y * -1) + 'px';
                    }
                }
            }
            body = body.GetNext();
        }
    };
    
    game.ui.setDisplaySize = function(object, size) {
        object.display = object.display || {};
        object.display.size = size; // Meters
    };
    
    game.ui.setImage = function(object, url) {
        if (object.display == null || object.display.size == null) {
            throw 'Attempt to set image of object with no display size!'
        }
        object.display.spriteSheet = object.display.spriteSheet || {};
        object.display.spriteSheet.url = url;
    };

})(game);
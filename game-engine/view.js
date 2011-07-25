goog.provide('game.draw');

game = {};
(function(game){
    var nextID = 0;
    
    var domObjects = {};
    
    game.draw = function( tick, display, world, camera, scale ) {
        var body = world.GetBodyList();
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
                var bg = body.display.spriteSheet;
                if ( domObject.savedStyle.bg != bg ) {
                    domObject.savedStyle.bg = bg;
                    domObject.style.backgroundImage = 'url(' + bg + ')';
                }
                var bgPos = body.display.spriteOffset;
                if ( bgPos != null && ( domObject.savedStyle.bgPosX != bgPos.x || domObject.savedStyle.bgPosY != bgPos.y ) ) {
                    domObject.savedStyle.bgPosX = bgPos.x;
                    domObject.savedStyle.bgPosY = bgPos.y;
                    objDom.style.backgroundPosition = (bgPos.x * -1) + 'px ' + (bgPos.y * -1) + 'px';
                }
            }
            body = body.GetNext();
        }
    };
    
    
})(game);
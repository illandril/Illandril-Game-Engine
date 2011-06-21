game = {};
(function(game){
    var nextID = 0;
    
    var domObjects = {};
    
    game.draw = function( tick, display, world, camera, scale ) {
        var body = world.GetBodyList();
        while( body != null ) {
            var pos = body.GetPosition();
            var size = body.size;
            if ( size != null ) {
                var userData = body.GetUserData();
                if ( userData == null ) {
                    userData = {};
                    body.SetUserData( userData );
                }
                if ( userData.viewID == null ) {
                    userData.viewID = nextID++;
                }
                if ( domObjects[userData.viewID] == null ) {
                    domObjects[userData.viewID] = document.createElement('span');
                    domObjects[userData.viewID].className = 'gameObject';
                    display.appendChild( domObjects[userData.viewID] );
                }
                var domObject = domObjects[userData.viewID];
                domObject.style.left = ( ( pos.x - size.x / 2 ) * scale ) + "px";
                domObject.style.top = ( ( pos.y - size.y / 2 ) * scale ) + "px";
                domObject.style.width = ( size.x * scale ) + "px";
                domObject.style.height = ( size.y * scale ) + "px";
            }
            body = body.GetNext();
        }
    };
    
    
})(game);
// requestAnim shim layer by Paul Irish
window.requestAnimFrame = (function(){
      return  window.requestAnimationFrame       || 
              window.webkitRequestAnimationFrame || 
              window.mozRequestAnimationFrame    || 
              window.oRequestAnimationFrame      || 
              window.msRequestAnimationFrame     || 
              function(/* function */ callback, /* DOMElement */ element){
                window.setTimeout(callback, 1000 / 60);
              };
    })();
    
var viewportWidth = 600;
var viewportHeight = 400;
var worldWidth = 60;
var worldHeight = 40;
var scale = 10.0;

var lastTickTime = 0;
var frameSteps = 10;

var b2dDebugFlags = 0;
b2dDebugFlags = b2dDebugFlags | Box2D.Dynamics.b2DebugDraw.e_aabbBit;
b2dDebugFlags = b2dDebugFlags | Box2D.Dynamics.b2DebugDraw.e_centerOfMassBit;
b2dDebugFlags = b2dDebugFlags | Box2D.Dynamics.b2DebugDraw.e_controllerBit;
b2dDebugFlags = b2dDebugFlags | Box2D.Dynamics.b2DebugDraw.e_jointBit;
b2dDebugFlags = b2dDebugFlags | Box2D.Dynamics.b2DebugDraw.e_pairBit;
b2dDebugFlags = b2dDebugFlags | Box2D.Dynamics.b2DebugDraw.e_shapeBit;

var Vec2 = Box2D.Common.Math.b2Vec2;

var fixtureDefinition = new Box2D.Dynamics.b2FixtureDef();
var bodyDefinition = new Box2D.Dynamics.b2BodyDef();

var world;
var display;
var debugCanvas;
var camera = new Vec2( 0, 0 );
var player;
var debug = true;
var fps;
var testObjects = 100;

var domObjects = {};

var createBox = function( width, height, centerX, centerY ) {
    fixtureDefinition.density = 1.0;
    fixtureDefinition.friction = 0.5;
    fixtureDefinition.restitution = 0.2;
    fixtureDefinition.shape = new Box2D.Collision.Shapes.b2PolygonShape();
    fixtureDefinition.shape.SetAsBox( width / 2, height / 2 );
    bodyDefinition.type = Box2D.Dynamics.b2Body.b2_staticBody;
    bodyDefinition.position.x = centerX;
    bodyDefinition.position.y = centerY;
    var body = world.CreateBody( bodyDefinition );
    body.size = new Vec2( width, height );
    var fixture = body.CreateFixture( fixtureDefinition );
    return { body: body, fixture: fixture };
};

var init = function( gameContainerID, doDebug ) {
    fps = document.getElementById( "fps" );
    debug = doDebug;
    
    // Initialize the display
    initDisplay( gameContainerID, debug );
    
    // Create the world
    world = new Box2D.Dynamics.b2World( new Vec2( 0, 9.8 ) /* Gravity */, true /* allow sleep */ );
    
    // Setup Debugging
    if ( debug ) {
        var debugDraw = new Box2D.Dynamics.b2DebugDraw();
        debugCanvas = document.getElementById( gameContainerID + '__DEBUG' );
        debugCanvas.width = worldWidth * scale;
        debugCanvas.height = worldHeight * scale;
        debugDraw.SetSprite( debugCanvas.getContext( "2d" ) );
        debugDraw.SetDrawScale( scale );
        debugDraw.SetFillAlpha( 0.3 );
        debugDraw.SetLineThickness( 1 );
        debugDraw.SetFlags( b2dDebugFlags );
        world.SetDebugDraw( debugDraw );
    }
    // Add in the boundries
    createBox( worldWidth, 1, worldWidth / 2, 0 );
    createBox( worldWidth, 1, worldWidth / 2, worldHeight );
    createBox( 1, worldHeight, 0, worldHeight / 2 );
    createBox( 1, worldHeight, worldWidth, worldHeight / 2 );
    
    // Debug Objects
    bodyDefinition.type = Box2D.Dynamics.b2Body.b2_dynamicBody;
    /*
    fixtureDefinition.shape = new Box2D.Collision.Shapes.b2CircleShape( 2 );
    bodyDefinition.position.x = 5;
    bodyDefinition.position.y = 5;
    var db1 = world.CreateBody( bodyDefinition );
    db1.size = new Vec2( 4, 4 );
    db1.CreateFixture( fixtureDefinition );
    bodyDefinition.position.x = 6;
    bodyDefinition.position.y = 10;
    fixtureDefinition.restitution = 1.2;
    fixtureDefinition.friction = 0.0;
    var db2 = world.CreateBody( bodyDefinition );
    player = db2;
    db2.size = new Vec2( 4, 4 );
    db2.CreateFixture( fixtureDefinition );
    */
    fixtureDefinition.restitution = 1.5;
    
    fixtureDefinition.shape = new Box2D.Collision.Shapes.b2CircleShape( 0.25 );
    var y = 5;
    for ( var i = 0; i < testObjects; i++ ) {
      var x = i % ( worldWidth - 10 );
      if ( x == 0 ) {
          y = y + 5;
      }
      bodyDefinition.position.y = y + 5 * ( Math.random() - 0.5 );
      bodyDefinition.position.x = x + ( Math.random() - 0.5 ) + 5;
      var db3 = world.CreateBody( bodyDefinition );
      db3.size = new Vec2( 0.5, 0.5 );
      db3.CreateFixture( fixtureDefinition );
    }
    fixtureDefinition.shape = new Box2D.Collision.Shapes.b2PolygonShape();
    fixtureDefinition.shape.SetAsBox( 0.25, 0.25 );
    bodyDefinition.position.x = 5;
    y = 5;
    for ( var i = 0; i < testObjects; i++ ) {
      player = db3;
      var x = i % ( worldWidth - 10 );
      if ( x == 0 ) {
          y = y + 5;
      }
      bodyDefinition.position.y = y + 5 * ( Math.random() - 0.5 );
      bodyDefinition.position.x = x + ( Math.random() - 0.5 ) + 5;
      bodyDefinition.angle = Math.random();
      var db3 = world.CreateBody( bodyDefinition );
      db3.size = new Vec2( 0.5, 0.5 );
      db3.CreateFixture( fixtureDefinition );
    }
    
    // Start the magic!
    window.requestAnimFrame( update, display );
};

var initDisplay = function(containerID, debug) {
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
};

var update = function( time ) {
    if ( time == null ) {
        time = new Date().getTime();
    }
    var tick = 0;
    if ( lastTickTime != 0 ) {
        tick = ( time - lastTickTime ) / 1000;
    } else {
        lastTickTime = time;
    }
    // Clamp the frame rate to minimize Box2D discrepencies
    if ( tick > 0.015 ) { // Max FPS: 66.66
        if ( tick > 0.04 ) { // Min FPS: 25
            tick = 0.04;
        }
        if ( fps ) {
            fps.innerHTML = 1 / tick;
        }
        lastTickTime = time;
        world.Step( tick /* time delta (sec) */, frameSteps /* Velocity Iterations */, frameSteps /* Position Iterations */ );
        world.DrawDebugData();
        world.ClearForces();
        draw( tick );
    }
    window.requestAnimFrame( update, display );
};

var draw = function( tick ) {
    var pPos = player.GetPosition();
    var scaledViewportWidth = ( viewportWidth / scale );
    var scaledViewportHeight = ( viewportHeight / scale );
    camera.x = pPos.x - scaledViewportWidth / 2;
    camera.y = pPos.y - scaledViewportHeight / 2;
    if ( camera.x < 0 ) {
        camera.x = 0;
    } else if ( camera.x > worldWidth - scaledViewportWidth ) {
        camera.x = worldWidth - scaledViewportWidth;
    }
    if ( camera.y < 0 ) {
        camera.y = 0;
    } else if ( camera.y > worldHeight - scaledViewportHeight ) {
        camera.y = worldHeight - scaledViewportHeight;
    }
    if ( debugCanvas != null ) {
        debugCanvas.style.left = "-" + ( camera.x * scale ) + "px";
        debugCanvas.style.top = "-" + ( camera.y * scale ) + "px";
    }
    display.style.left = "-" + ( camera.x * scale ) + "px";
    display.style.top = "-" + ( camera.y * scale ) + "px";
    game.draw( tick, display, world, camera, scale );
};
goog.require('game.draw');
goog.require('Box2D');

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
var worldWidth = 1200;
var worldHeight = 800;
var scale = 5.0;

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
var frames = 0;
var rollingFPS = 60;
var testObjects = 500;

var domObjects = {};

var createStaticBox = function( width, height, centerX, centerY ) {
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

var createBox = function( width, height, centerX, centerY ) {
    fixtureDefinition.density = 1.0;
    fixtureDefinition.friction = 0.5;
    fixtureDefinition.restitution = 0.2;
    fixtureDefinition.shape = new Box2D.Collision.Shapes.b2PolygonShape();
    fixtureDefinition.shape.SetAsBox( width / 2, height / 2 );
    bodyDefinition.type = Box2D.Dynamics.b2Body.b2_dynamicBody;
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
        debugCanvas.style.marginRight = "-" + debugCanvas.width + "px";
        debugCanvas.style.marginBottom = "-" + debugCanvas.height + "px";
        debugDraw.SetSprite( debugCanvas.getContext( "2d" ) );
        debugDraw.SetDrawScale( scale );
        debugDraw.SetFillAlpha( 0.3 );
        debugDraw.SetLineThickness( 1 );
        debugDraw.SetFlags( b2dDebugFlags );
        world.SetDebugDraw( debugDraw );
    }
    // Add in the boundries
    createStaticBox( worldWidth, 1, worldWidth / 2, 0 );
    createStaticBox( worldWidth, 1, worldWidth / 2, worldHeight );
    createStaticBox( 1, worldHeight, 0, worldHeight / 2 );
    createStaticBox( 1, worldHeight, worldWidth, worldHeight / 2 );
    
    var jointDef = new Box2D.Dynamics.Joints.b2RevoluteJointDef();
    var weldJointDef = new Box2D.Dynamics.Joints.b2WeldJointDef();
    var flip = false;
    for ( var i = 10; i <= worldWidth - 10; i += 8 ) {
        bodyDefinition.angle = i / worldWidth * 3.1415;
        var y = worldHeight / 2;
        if ( flip ) {
            y = y + 8;
        }
        flip = !flip;
        var b0 = createStaticBox( 0.1, 0.1, i, y );
        var b1 = createBox( 10, 1, i, y );
        var b2 = createBox( 1, 10, i, y );
        jointDef.Initialize(b0.body, b1.body, b0.body.GetWorldCenter());
        world.CreateJoint(jointDef);
        jointDef.Initialize(b0.body, b2.body, b0.body.GetWorldCenter());
        world.CreateJoint(jointDef);
        weldJointDef.Initialize(b1.body, b2.body, b1.body.GetWorldCenter());
        world.CreateJoint(weldJointDef);
    }
    
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
    fixtureDefinition.restitution = 2.5;
    
    fixtureDefinition.shape = new Box2D.Collision.Shapes.b2CircleShape( 0.25 );
    var y = 15;
    for ( var i = 0; i < testObjects; i++ ) {
      var x = ( i * 5 ) % ( worldWidth - 10 );
      if ( x == 0 ) {
          //y = y + 5;
      }
      bodyDefinition.position.y = y + ( i % 20 );
      bodyDefinition.position.x = x + ( i % 20 ) / 20 + 4.5;
      var db3 = world.CreateBody( bodyDefinition );
      db3.size = new Vec2( 0.5, 0.5 );
      db3.CreateFixture( fixtureDefinition );
    }
    fixtureDefinition.shape = new Box2D.Collision.Shapes.b2PolygonShape();
    fixtureDefinition.shape.SetAsBox( 0.25, 0.25 );
    bodyDefinition.position.x = 5;
    y = 15;
    for ( var i = 0; i < testObjects; i++ ) {
      player = db3;
      var x = ( i * 5 ) % ( worldWidth - 10 );
      if ( x == 0 ) {
          //y = y + 5;
      }
      bodyDefinition.position.y = y + ( ( i + 5 ) % 20 );
      bodyDefinition.position.x = x + ( ( i + 5 ) % 20 ) / 20 + 4.5;
      bodyDefinition.angle = ( i % 17 ) / 17;
      var db3 = world.CreateBody( bodyDefinition );
      db3.size = new Vec2( 0.5, 0.5 );
      db3.CreateFixture( fixtureDefinition );
    }
    fixtureDefinition.shape = new Box2D.Collision.Shapes.b2PolygonShape();
    fixtureDefinition.shape.SetAsArray( [ new Vec2(-0.5, -0.5), new Vec2(0.5, -0.5), new Vec2(-0.5,0.5)], 3 );
    bodyDefinition.position.x = 5;
    y = 15;
    for ( var i = 0; i < testObjects; i++ ) {
      player = db3;
      var x = ( i * 5 ) % ( worldWidth - 10 );
      if ( x == 0 ) {
          //y = y + 5;
      }
      bodyDefinition.position.y = y + ( ( i + 10 ) % 20 );
      bodyDefinition.position.x = x + ( ( i + 10 ) % 20 ) / 20 + 4.5;
      bodyDefinition.angle = ( i % 22 ) / 22;
      var db3 = world.CreateBody( bodyDefinition );
      db3.size = new Vec2( 0.75, 0.75 );
      db3.CreateFixture( fixtureDefinition );
    }
    fixtureDefinition.shape = new Box2D.Collision.Shapes.b2PolygonShape();
    fixtureDefinition.shape.SetAsArray( [ new Vec2(-0.5, -0.5), new Vec2(0, -0.5), new Vec2(0.5,0), new Vec2(0.5, 0.5), new Vec2( 0, 0.3 )], 5 );
    bodyDefinition.position.x = 5;
    y = 15;
    for ( var i = 0; i < testObjects; i++ ) {
      player = db3;
      var x = ( i * 5 ) % ( worldWidth - 10 );
      if ( x == 0 ) {
          //y = y + 5;
      }
      bodyDefinition.position.y = y + ( ( i + 15 ) % 20 );
      bodyDefinition.position.x = x + ( ( i + 15 ) % 20 ) / 20 + 4.5;
      bodyDefinition.angle = ( i % 35 ) / 35;
      var db3 = world.CreateBody( bodyDefinition );
      db3.size = new Vec2( 0.75, 0.75 );
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
            var instantFPS = 1 / tick;
            rollingFPS = rollingFPS * 0.99 + instantFPS * 0.01;
            fps.innerHTML = Math.round(instantFPS) + " - " + Math.round(rollingFPS);
            frames++;
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
    //game.draw( tick, display, world, camera, scale );
};


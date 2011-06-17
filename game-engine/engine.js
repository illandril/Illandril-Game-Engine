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
    
var worldWidth = 60;
var worldHeight = 40;
var frameSteps = 10;
var b2dDebugFlags = 0;
var scale = 10.0;
var lastTickTime = 0;
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

var createBox = function( width, height, centerX, centerY ) {
    fixtureDefinition.density = 1.0;
    fixtureDefinition.friction = 1.5;
    fixtureDefinition.restitution = 0.2;
    fixtureDefinition.shape = new Box2D.Collision.Shapes.b2PolygonShape();
    fixtureDefinition.shape.SetAsBox( width / 2, height / 2 );
    bodyDefinition.type = Box2D.Dynamics.b2Body.b2_staticBody;
    bodyDefinition.position.x = centerX;
    bodyDefinition.position.y = centerY;
    var body = world.CreateBody( bodyDefinition );
    var fixture = body.CreateFixture( fixtureDefinition );
    return { body: body, fixture: fixture };
};

var init = function( gameContainerID, debugCanvasID ) {
    // Initialize the display
    display = document.getElementById( gameContainerID );
    
    // Create the world
    world = new Box2D.Dynamics.b2World( new Vec2( 0, 9.8 ) /* Gravity */, true /* allow sleep */ );
    
    // Setup Debugging
    if ( debugCanvasID != null ) {
        var debugDraw = new Box2D.Dynamics.b2DebugDraw();
        debugDraw.SetSprite( document.getElementById( debugCanvasID ).getContext( "2d" ) );
        debugDraw.SetDrawScale( scale );
        debugDraw.SetFillAlpha( 0.3 );
        debugDraw.SetLineThickness( 1.0 );
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
    fixtureDefinition.shape = new Box2D.Collision.Shapes.b2CircleShape( 2 );
    bodyDefinition.position.x = 5;
    bodyDefinition.position.y = 5;
    world.CreateBody( bodyDefinition ).CreateFixture( fixtureDefinition );
    bodyDefinition.position.x = 6;
    bodyDefinition.position.y = 10;
    world.CreateBody( bodyDefinition ).CreateFixture( fixtureDefinition );
    
    // Start the magic!
    window.requestAnimFrame( update, display );
};

var update = function( time ) {
    if ( time == null ) {
        time = new Date().getTime();
    }
    var tick = 0;
    if ( lastTickTime != 0 ) {
        tick = ( time - lastTickTime ) / 1000;
        if ( tick > 0.035 ) { // Minimum frame rate: ~30 (otherwise, Box2D starts messing up)
            tick = 0.035;
        }
        //console.error( 1 / tick );
    }
    // Clamp the frame rate to 28-70fps, to minimize Box2D discrepencies
    lastTickTime = time;
    tick = 1/80;
    world.Step( tick /* time delta (sec) */, frameSteps /* Velocity Iterations */, frameSteps /* Position Iterations */ );
    world.DrawDebugData();
    world.ClearForces();
    window.requestAnimFrame( update, display );
};
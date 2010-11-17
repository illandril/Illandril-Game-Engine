goog.provide("illandril.game.Engine");

goog.require("goog.math.Vec2");
goog.require("illandril.math.Bounds");
goog.require("illandril.game.World");
goog.require("illandril.game.objects.ActiveCollectable");
goog.require("illandril.game.objects.Player");
goog.require("illandril.game.objects.Wall");
goog.require("illandril.game.objects.Car");
goog.require("illandril.game.objects.Generator");
goog.require("illandril.game.objects.Consumer");
goog.require("illandril.game.ui.Viewport");
goog.require("illandril.game.ui.Controls");
goog.require("illandril.game.util.Framerate");

illandril.game.Engine={};
goog.exportSymbol( "illandril.game.Engine", illandril.game.Engine );

illandril.game.Engine.init = function( gameContainerID ) {
  var container = document.getElementById( gameContainerID );
  world = new illandril.game.World();
  window["world"] = world;
  if ( illandril.game.Engine.map != null ) {
    world.startBulk();
    for ( var idx = 0; idx < illandril.game.Engine.map.length; idx++ ) {
      var objDef = illandril.game.Engine.map[idx];
      new illandril.game.objects.Wall( world, illandril.math.Bounds.fromCenter( new goog.math.Vec2( objDef.x, objDef.y ), new goog.math.Vec2( objDef.width, objDef.height ) ), objDef.bg, objDef.zIndex );
    }
    world.endBulk();
  }
  
  // Start for testing
  charac = new illandril.game.objects.Player( world, illandril.math.Bounds.fromCenter( new goog.math.Vec2( 10, 20 ), new goog.math.Vec2( 8, 8 ) ), null, 1000 );
  window["charac"] = charac;
  
  var top = -10000;
  var bottom = -10;
  var left = -300;
  var right = 300;
  var minSpeed = 1 * 1000;
  var maxSpeed = 10 * 1000;
  var size = new goog.math.Vec2( 8, 3 );
  for ( var y = top; y < bottom; y += size.y + 2 + Math.random() * 200 ) {
    var cbounds = illandril.math.Bounds.fromCenter( new goog.math.Vec2( right, y ), size );
    var gbounds = illandril.math.Bounds.fromCenter( new goog.math.Vec2( left, y ), size );
    new illandril.game.objects.Consumer( world, cbounds, null, 0, illandril.game.objects.Car );
    new illandril.game.objects.Generator( world, gbounds, null, 0, illandril.game.objects.Car, minSpeed, maxSpeed ).start();
  }
  for ( var x = left + 10; x < right; x += 20 ) {
    var bounds = illandril.math.Bounds.fromCenter( new goog.math.Vec2( x, top - 50 ), new goog.math.Vec2( 2, 2 ) );
    new illandril.game.objects.Collectable( world, bounds, null, 0 );
  }
  mobs = [];
  window["mobs"] = mobs;
  move = false;
  var totalMobs = illandril.game.Engine["mc"];
  var highMob = Math.round( totalMobs / 2 );
  var lowMob = -1 * highMob;
  for ( var i = lowMob; i < highMob; i++ ) {
    var bounds = null;
    var attempts = 0;
    
    while( bounds == null && attempts < 50 ) {
      var randomBounds = illandril.math.Bounds.fromCenter( new goog.math.Vec2( 300 + Math.random() * 200, 3 * i ), new goog.math.Vec2( 2, 2 ) );
      if ( !world.hasObjectIntersecting( randomBounds ) ) {
        bounds = randomBounds;
      }
      attempts++;
    }
    if ( bounds != null ) {
      mobs[i] = new illandril.game.objects.ActiveCollectable( world, bounds, null, 1100 );
      mobs[i].think = function( tick ) {
        if ( /* this.getPosition().isWithinXFrom( 100000, charac.getPosition() ) */ move ) {
          this.addVelocity( new goog.math.Vec2( Math.random() * 2 - 1, Math.random() * 2 - 1 ) );
        }
      };
    } else {
      illandril.game.Engine["mc"]--;
    }
  }

  var vp = new illandril.game.ui.Viewport( container, world, new goog.math.Vec2( 500, 500 ) );
  vp.follow( charac );
  
  /*
  var vp3 = new illandril.game.ui.Viewport( container, world, new goog.math.Vec2( 400, 300 ) );
  vp3.follow( charac );
  vp3.setZoom( 0.25 );
  
  vp2 = new illandril.game.ui.Viewport( container, world, new goog.math.Vec2( 800, 200 ) );
  vp2.lookAt( new goog.math.Vec2( 2000, 0 ) );
  vp2.setZoom( 0.10 );
  window["vp2"]=vp2;
  */
  
  var controls = new illandril.game.ui.Controls();
  var moveUp = function() { charac.addVelocity( new goog.math.Vec2( 0, -1 ) ); };
  controls.register( 87, moveUp, "move up" );
  controls.register( 83, function(){ charac.addVelocity( new goog.math.Vec2( 0, 1 ) ) }, "move down" );
  controls.register( 68, function(){ charac.addVelocity( new goog.math.Vec2( 1, 0 ) ) }, "move right" );
  controls.register( 65, function(){ charac.addVelocity( new goog.math.Vec2( -1, 0 ) ) }, "move left" );
  
  stop = false;
  illandril.game.util.Framerate.reset();
  setInterval( function() {
      if ( stop ) {
        illandril.game.util.Framerate.reset();
      } else {
        var timeForThisTick = illandril.game.util.Framerate.tick();
        updateControls();
        world.update( timeForThisTick );
        if ( illandril.game.util.Framerate.totalFrames % 5 == 0 ) {
          document.getElementById("fps").innerHTML = illandril.game.util.Framerate.getAverageFPS() + "<br>" + illandril.game.util.Framerate.getRollingAverageFPS();
          document.getElementById("objcount").innerHTML = world.getObjects().getAllObjects().length;
          document.getElementById("solidcount").innerHTML = world.getObjects().getSolidObjects().length;
          document.getElementById("thinkcount").innerHTML = world.getObjects().getActiveObjects().length;
        }
      }
    }, 10 );

  // End for testing
};
goog.exportProperty( illandril.game.Engine, "init", illandril.game.Engine.init );

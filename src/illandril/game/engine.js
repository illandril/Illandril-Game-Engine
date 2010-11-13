goog.provide("illandril.game.Engine");

goog.require("goog.math.Vec2");
goog.require("illandril.math.Bounds");
goog.require("illandril.game.World");
goog.require("illandril.game.GameObject");
goog.require("illandril.game.Viewport");
goog.require("illandril.game.Controls");
goog.require("illandril.game.Framerate");

illandril.game.Engine={};

illandril.game.Engine.init = function( gameContainerID ) {
  var container = document.getElementById( gameContainerID );
  world = new illandril.game.World();
  window["world"] = world;
  if ( illandril.game.Engine.map != null ) {
    world.startBulk();
    for ( var idx = 0; idx < illandril.game.Engine.map.length; idx++ ) {
      var objDef = illandril.game.Engine.map[idx];
      new illandril.game.GameObject( world, illandril.math.Bounds.fromCenter( new goog.math.Vec2( objDef.x, objDef.y ), new goog.math.Vec2( objDef.width, objDef.height ) ) );
    }
    world.endBulk();
  }
  
  // Start for testing
  charac = new illandril.game.GameObject( world, illandril.math.Bounds.fromCenter( new goog.math.Vec2( 250, 100 ), new goog.math.Vec2( 8, 8 ) ) );
  window["charac"] = charac;

  mobs = [];
  window["mobs"] = mobs;
  move = false;
  var totalMobs = illandril.game.Engine["mc"];
  var highMob = Math.round( totalMobs / 2 );
  var lowMob = -1 * highMob;
  for ( var i = lowMob; i < highMob; i++ ) {
   mobs[i] = new illandril.game.GameObject( world, illandril.math.Bounds.fromCenter( new goog.math.Vec2( 300 + Math.random() * 2000, 10 * i ), new goog.math.Vec2( 2, 2 ) ) );
   mobs[i].think = function( tick ) {
     if ( /* this.getPosition().isWithinXFrom( 100000, charac.getPosition() ) */ move ) {
       this.addVelocity( new goog.math.Vec2( Math.random() * 2 - 1, Math.random() * 2 - 1 ) );
     }
   };
  }
  new illandril.game.GameObject( world, illandril.math.Bounds.fromCenter( new goog.math.Vec2( 500, 0 ), new goog.math.Vec2( Math.random() * 100, Math.random() * 100 ) ) );

  var vp = new illandril.game.Viewport( container, world, new goog.math.Vec2( 500, 500 ) );
  vp.follow( charac );
  
  /*
  var vp3 = new illandril.game.Viewport( container, world, new goog.math.Vec2( 400, 300 ) );
  vp3.follow( charac );
  vp3.setZoom( 0.25 );
  
  vp2 = new illandril.game.Viewport( container, world, new goog.math.Vec2( 800, 200 ) );
  vp2.lookAt( new goog.math.Vec2( 2000, 0 ) );
  vp2.setZoom( 0.10 );
  window["vp2"]=vp2;
  */
  
  var controls = new illandril.game.Controls();
  var moveUp = function() { charac.addVelocity( new goog.math.Vec2( 0, -1 ) ); };
  controls.register( 87, moveUp, "move up" );
  controls.register( 83, function(){ charac.addVelocity( new goog.math.Vec2( 0, 1 ) ) }, "move down" );
  controls.register( 68, function(){ charac.addVelocity( new goog.math.Vec2( 1, 0 ) ) }, "move right" );
  controls.register( 65, function(){ charac.addVelocity( new goog.math.Vec2( -1, 0 ) ) }, "move left" );
  
  stop = false;
  illandril.game.Framerate.reset();
  setInterval( function() {
      if ( stop ) {
        illandril.game.Framerate.reset();
      } else {
        var timeForThisTick = illandril.game.Framerate.tick();
        updateControls();
        world.update( timeForThisTick );
        if ( illandril.game.Framerate.totalFrames % 5 == 0 ) {
          document.getElementById("fps").innerHTML = illandril.game.Framerate.getAverageFPS() + "<br>" + illandril.game.Framerate.getRollingAverageFPS();
        }
      }
    }, 10 );

  // End for testing
};
goog.exportSymbol( "illandril.game.Engine", illandril.game.Engine );
goog.exportProperty( illandril.game.Engine, "init", illandril.game.Engine.init );

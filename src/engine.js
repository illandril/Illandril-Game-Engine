iGameEngine={};

iGameEngine.init = function( gameContainerID ) {
  var container = document.getElementById( gameContainerID );
  world = new World();
  window["world"] = world;
  if ( iGameEngine.map != null ) {
    world.startBulk();
    for ( var idx = 0; idx < iGameEngine.map.length; idx++ ) {
      var objDef = iGameEngine.map[idx];
      new GameObject( world, Bounds.fromCenter( new Vector2( objDef.x, objDef.y ), new Vector2( objDef.width, objDef.height ) ) );
    }
    world.endBulk();
  }
  
  // Start for testing
  charac = new GameObject( world, Bounds.fromCenter( new Vector2( 250, 100 ), new Vector2( 10, 10 ) ) );
  window["charac"] = charac;

  mobs = [];
  window["mobs"] = mobs;
  var totalMobs = iGameEngine["mc"];
  var highMob = Math.round( totalMobs / 2 );
  var lowMob = -1 * highMob;
  for ( var i = lowMob; i < highMob; i++ ) {
   mobs[i] = new GameObject( world, Bounds.fromCenter( new Vector2( 300 + Math.random() * 2000, 10 * i ), new Vector2( 2, 2 ) ) );
   mobs[i].think = function( tick ) {
     if ( this.getPosition().isWithinXFrom( 100000, charac.getPosition() ) ) {
       this.addVelocity( new Vector2( Math.random() * 2 - 1, Math.random() * 2 - 1 ) );
     }
   };
  }
  new GameObject( world, Bounds.fromCenter( new Vector2( 500, 0 ), new Vector2( Math.random() * 100, Math.random() * 100 ) ) );

  var vp = new Viewport( container, world, new Vector2( 400, 300 ) );
  vp.follow( charac );
  
  var vp3 = new Viewport( container, world, new Vector2( 400, 300 ) );
  vp3.follow( charac );
  vp3.setZoom( 0.25 );
  
  vp2 = new Viewport( container, world, new Vector2( 800, 200 ) );
  vp2.lookAt( new Vector2( 2000, 0 ) );
  vp2.setZoom( 0.2 );
  window["vp2"]=vp2;
  
  var controls = new Controls();
  var moveUp = function() { charac.addVelocity( new Vector2( 0, -1 ) ); };
  controls.register( 87, moveUp, "move up" );
  controls.register( 83, function(){ charac.addVelocity( new Vector2( 0, 1 ) ) }, "move down" );
  controls.register( 68, function(){ charac.addVelocity( new Vector2( 1, 0 ) ) }, "move right" );
  controls.register( 65, function(){ charac.addVelocity( new Vector2( -1, 0 ) ) }, "move left" );
  tickTime = new Date();
  window["tickTime"] = tickTime;
  frames = 0;
  window["frames"] = frames;
  firstFrame = tickTime;
  window["firstFrame"] = firstFrame;
  
  setInterval( function() {
      var newTick = new Date();
      updateControls();
      world.update( newTick - tickTime );
      tickTime = newTick;
      frames++;
      if ( frames % 5 == 1 ) {
        document.getElementById("fps").innerHTML = frames + " - " + frames / ( ( tickTime - firstFrame ) / 1000 )
      }
    }, 10 );

  // End for testing
};
iGameEngine['init']=iGameEngine.init;

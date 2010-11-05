iGameEngine={};

iGameEngine.init = function( gameContainerID ) {
  var container = document.getElementById( gameContainerID );
  var world = new World();
  world.addObject( "char", new Vector2( 10, 10 ) );
  world.addObject( "monster", new Vector2( 50, 20 ) );
  var vp = new Viewport( container, world, new Vector2( 100, 100 ) );
  vp.lookAt( new Vector2( 10, 10 ) );
  var vp2 = new Viewport( container, world, new Vector2( 50, 50 ) );  
  vp2.lookAt( new Vector2( 50, 20 ) );
  
  var start = new Date();
  world.startBulk();
  for ( var x = -200; x < 200; x++ ) {
   for ( var y = -200; y < 200; y++ ) {
    world.addObject( "junk", new Vector2( x, y ) );
   }
  }
  world.endBulk();
  var end = new Date();
  document.write( end - start );
};
iGameEngine['init']=iGameEngine.init;

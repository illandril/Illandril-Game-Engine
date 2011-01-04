goog.provide("illandril.game.Engine");

goog.require("goog.events");
goog.require("goog.events.KeyCodes");
goog.require("goog.math.Vec2");
goog.require("goog.net.EventType");
goog.require("goog.net.XhrIo");
goog.require("goog.ui.Dialog");
goog.require("goog.ui.KeyboardShortcutHandler");
goog.require("illandril.math.Bounds");
goog.require("illandril.game.ControlChangeScene");
goog.require("illandril.game.Scene");
goog.require("illandril.game.objects.ActiveCollectable");
goog.require("illandril.game.objects.Player");
goog.require("illandril.game.objects.Wall");
goog.require("illandril.game.objects.GameObject");
goog.require("illandril.game.objects.Car");
goog.require("illandril.game.objects.Generator");
goog.require("illandril.game.objects.Consumer");
goog.require("illandril.game.objects.menus.MenuEntry");
goog.require("illandril.game.objects.menus.ControlEntry");
goog.require("illandril.game.ui.Action");
goog.require("illandril.game.ui.Controls");
goog.require("illandril.game.ui.Font");
goog.require("illandril.game.ui.StaticSprite");
goog.require("illandril.game.ui.BasicDirectionalAnimation");
goog.require("illandril.game.ui.Viewport");
goog.require("illandril.game.util.Framerate");

illandril.game.Engine = {
  debugFPS: true,
  debugObjectCount: false,
  resumeOnLoadingFinish: true,
  paused: true,
  loading: 0,
  maps: [],
  scenes: [],
  currentScene: null,
  lastScene: null,
  startTime: null,
  controls: null,
  init: function( gameContainerID, mapSrc ) {
    illandril.game.Engine.startTime = new Date();
    
    var container = document.getElementById( gameContainerID );
    illandril.game.Engine.container = container;
    illandril.game.Engine.debug = document.createElement( "span" );
    illandril.game.Engine.debug.style.position = "absolute";
    illandril.game.Engine.debug.style.zIndex = 99998;
    illandril.game.Engine.debug.style.textAlign = "left";
    illandril.game.Engine.debug.style.fontSize = "12px";
    illandril.game.Engine.debug.style.fontWeight = "bold";
    illandril.game.Engine.debug.style.fontFamily = "Courier New"
    illandril.game.Engine.debug.style.backgroundColor = "white";
    illandril.game.Engine.debug.style.padding = "2px";
    illandril.game.Engine.container.appendChild( illandril.game.Engine.debug );

    illandril.game.Engine.noClick = document.createElement( "div" );
    illandril.game.Engine.noClick.style.position = "absolute";
    illandril.game.Engine.noClick.style.zIndex = 99997;
    illandril.game.Engine.noClick.style.width = illandril.game.Engine.container.width;
    illandril.game.Engine.noClick.style.height = illandril.game.Engine.container.height;
    illandril.game.Engine.noClick.style.backgroundColor = "#000";
    illandril.game.Engine.noClick.style.opacity = 0.5;
    illandril.game.Engine.noClick.style.display = "none";
    illandril.game.Engine.container.appendChild( illandril.game.Engine.noClick );

    illandril.game.Engine.pausedDialog = new goog.ui.Dialog();
    illandril.game.Engine.pausedDialog.setTitle( "Game Paused" );
    illandril.game.Engine.pausedDialog.setContent( "Your game has been paused.<br>Press 'P' to resume." );
    illandril.game.Engine.pausedDialog.setButtonSet( new goog.ui.Dialog.ButtonSet() );
    illandril.game.Engine.pausedDialog.setHasTitleCloseButton( false );
    illandril.game.Engine.pausedDialog.setEscapeToCancel( false );
    illandril.game.Engine.pausedDialog.setDraggable( false );
    illandril.game.Engine.pausedDialog.setModal( false );
    illandril.game.Engine.pausedDialog.setVisible( false );
    
    illandril.game.Engine.loadingDialog = new goog.ui.Dialog();
    illandril.game.Engine.loadingDialog.setTitle( "Loading" );
    illandril.game.Engine.loadingDialog.setContent( "Loading, please wait..." );
    illandril.game.Engine.loadingDialog.setButtonSet( new goog.ui.Dialog.ButtonSet() );
    illandril.game.Engine.loadingDialog.setHasTitleCloseButton( false );
    illandril.game.Engine.loadingDialog.setEscapeToCancel( false );
    illandril.game.Engine.loadingDialog.setDraggable( false );
    illandril.game.Engine.loadingDialog.setModal( false );
    illandril.game.Engine.loadingDialog.setVisible( true );
    
    illandril.game.Engine.controls = new illandril.game.ui.Controls();
    var pause = new illandril.game.ui.Action( function() { illandril.game.Engine.togglePause(); }, "Pause", false );
    illandril.game.Engine.controls.registerAction( pause, goog.events.KeyCodes.P, false, false, false );
    
    var debugFPS = new illandril.game.ui.Action( function() { if ( !illandril.game.Engine.paused ) { illandril.game.Engine.debugFPS = !illandril.game.Engine.debugFPS; } }, "Debug FPS", false );
    illandril.game.Engine.controls.registerAction( debugFPS, goog.events.KeyCodes.F8, false, false, false );
    
    var debugObjectCount = new illandril.game.ui.Action( function() { if ( !illandril.game.Engine.paused ) { illandril.game.Engine.debugObjectCount = !illandril.game.Engine.debugObjectCount; } }, "Debug Object Count", false );
    illandril.game.Engine.controls.registerAction( debugObjectCount, goog.events.KeyCodes.F7, false, false, false );
    
    var font = new illandril.game.ui.Font( "../graphics/font.png", 15, 15, "?ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890 :+", 1, 1, -4 );
    
    var menuScene = new illandril.game.Scene( "Main Menu" );
    new illandril.game.ui.Viewport( illandril.game.Engine.container, menuScene, new goog.math.Vec2( 500, 500 ) );
    
    illandril.game.Engine.controlScene = new illandril.game.ControlChangeScene( "Controls Menu", new goog.math.Vec2( 0, -200 ), font );
    new illandril.game.ui.Viewport( illandril.game.Engine.container, illandril.game.Engine.controlScene, new goog.math.Vec2( 500, 500 ) );
    
    var toMenu = new illandril.game.ui.Action( function() { if ( !illandril.game.Engine.paused ) { illandril.game.Engine.currentScene = menuScene; } }, "Main Menu", false );
    illandril.game.Engine.controls.registerAction( toMenu, goog.events.KeyCodes.ESC, false, false, false );
    
    var loadedScene = new illandril.game.Scene();
    new illandril.game.objects.menus.MenuEntry( menuScene, "Test Menu 1", new goog.math.Vec2( 0, -200 ), font, 0 );
    new illandril.game.objects.menus.MenuEntry( menuScene, "Test Menu 2", new goog.math.Vec2( 0, -180 ), font, 0 );
    illandril.game.Engine.controlScene.addControl( illandril.game.Engine.controls, toMenu );
    illandril.game.Engine.controlScene.addControl( illandril.game.Engine.controls, pause );
    illandril.game.Engine.controlScene.addControl( illandril.game.Engine.controls, debugFPS );
    illandril.game.Engine.controlScene.addControl( illandril.game.Engine.controls, debugObjectCount );
    
    var controlsMenu = new illandril.game.objects.menus.MenuEntry( menuScene, "Controls", new goog.math.Vec2( 0, 180 ), font, 5 );
    controlsMenu.onClick = function() {
      illandril.game.Engine.currentScene = illandril.game.Engine.controlScene;
    }
    
    var playMenu = new illandril.game.objects.menus.MenuEntry( menuScene, "Play", new goog.math.Vec2( 0, 200 ), font, 0 );
    playMenu.onClick = function() {
      illandril.game.Engine.currentScene = loadedScene;
    }
    
    illandril.game.Engine.currentScene = menuScene;
    illandril.game.Engine.tick();

    illandril.game.Engine.loadMap( mapSrc, loadedScene );
  },
  shortcut: function( event ) {
    if ( event.identifier == "pause" ) {
      illandril.game.Engine.togglePause();
    } else if ( event.identifier == "debugFPS" ) {
      illandril.game.Engine.debugFPS = !illandril.game.Engine.debugFPS;
    } else if ( event.identifier == "debugObjectCount" ) {
      illandril.game.Engine.debugObjectCount = !illandril.game.Engine.debugObjectCount;
    }
  },
  loadMap: function( mapSrc, scene ) {
    illandril.game.Engine.startLoad();
    illandril.game.Engine._loadMap( mapSrc, scene );
  },
  _loadMap: function( mapSrc, scene ) {
    if ( mapSrc != null && illandril.game.Engine.maps[mapSrc] == null ) {
      var mapPullRequest = new goog.net.XhrIo();
      goog.events.listen( mapPullRequest, goog.net.EventType.COMPLETE, function(e) {
        illandril.game.Engine.maps[mapSrc] = this.getResponseJson() || [];
        illandril.game.Engine._loadMap( mapSrc, scene );
      });
      mapPullRequest.send( mapSrc );
    } else if ( mapSrc == null || illandril.game.Engine.maps[mapSrc].length == 0 ) {
      illandril.game.Engine._initMap( mapSrc, scene );
    } else {
      scene.startBulk();
      while ( illandril.game.Engine.maps[mapSrc].length > 0 ) {
        var objDef = illandril.game.Engine.maps[mapSrc].pop();
        var sprite = null;
        if ( objDef["bg"] != null ) {
          var bgOffsetX = objDef["bgOffsetX"] || 0;
          var bgOffsetY = objDef["bgOffsetY"] || 0;
          sprite = new illandril.game.ui.StaticSprite( objDef["bg"], new goog.math.Vec2( bgOffsetX, bgOffsetY ) );
        }
        if ( objDef["solid"] != null && objDef["solid"] == false ) {
          new illandril.game.objects.GameObject( scene, illandril.math.Bounds.fromCenter( new goog.math.Vec2( objDef["x"], objDef["y"] ), new goog.math.Vec2( objDef["width"], objDef["height"] ) ), sprite, objDef["zIndex"] );
        } else {
          new illandril.game.objects.Wall( scene, illandril.math.Bounds.fromCenter( new goog.math.Vec2( objDef["x"], objDef["y"] ), new goog.math.Vec2( objDef["width"], objDef["height"] ) ), sprite, objDef["zIndex"] );
        }
        if ( illandril.game.Engine.maps[mapSrc].length % 100 == 0 ) {
          break; // Make sure the UI still responds
        }
      }
      scene.endBulk()
      setTimeout( function() { illandril.game.Engine._loadMap( mapSrc, scene ); }, 0 );
    }
  },
  _initMap: function( mapSrc, scene ) {
    scene.startBulk();
    var container = illandril.game.Engine.container;
    
    // Start for testing
    charac = new illandril.game.objects.Player( scene, illandril.math.Bounds.fromCenter( new goog.math.Vec2( 10, 20 ), new goog.math.Vec2( 20, 20 ) ), new illandril.game.ui.BasicDirectionalAnimation( "../graphics/turtle.png", 20, 20, 8, 6 ), 1000 );
    window["charac"] = charac;
    
    var vp = new illandril.game.ui.Viewport( container, scene, new goog.math.Vec2( 400, 500 ) );
    vp.follow( charac );
  
    var vp2 = new illandril.game.ui.Viewport( container, scene, new goog.math.Vec2( 100, 500 ) );
    vp2.lookAt( new goog.math.Vec2( 300, 2000 ) );
    vp2.setZoom( 0.12 );
  
    var top = 4000;
    var bottom = -10;
    var left = -300;
    var right = 300;
    var minSpeed = 1 * 1000;
    var maxSpeed = 10 * 1000;
    var size = new goog.math.Vec2( 8, 3 );
    for ( var y = top; y < bottom; y += size.y + 2 + Math.random() * 100 ) {
      var cbounds = illandril.math.Bounds.fromCenter( new goog.math.Vec2( right, y ), size );
      var gbounds = illandril.math.Bounds.fromCenter( new goog.math.Vec2( left, y ), size );
      new illandril.game.objects.Consumer( scene, cbounds, null, 0, illandril.game.objects.Car );
      new illandril.game.objects.Generator( scene, gbounds, null, 0, illandril.game.objects.Car, minSpeed, maxSpeed ).start();
    }
    for ( var x = left + 10; x < right; x += 20 ) {
      var bounds = illandril.math.Bounds.fromCenter( new goog.math.Vec2( x, top - 50 ), new goog.math.Vec2( 2, 2 ) );
      new illandril.game.objects.Collectable( scene, bounds, null, 0 );
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
        if ( !scene.hasObjectIntersecting( randomBounds ) ) {
          bounds = randomBounds;
        }
        attempts++;
      }
      if ( bounds != null ) {
        mobs[i] = new illandril.game.objects.ActiveCollectable( scene, bounds, null, 1100 );
        /** @this {illandril.game.objects.ActiveCollectable} */
        mobs[i].think = function( tick ) {
          if ( /* this.getPosition().isWithinXFrom( 100000, charac.getPosition() ) */ move ) {
            this.addVelocity( new goog.math.Vec2( Math.random() * 2 - 1, Math.random() * 2 - 1 ) );
          }
        };
      } else {
        illandril.game.Engine["mc"]--;
      }
    }
    
    var moveUp = new illandril.game.ui.Action( function( tickTime ) { if ( illandril.game.Engine.paused ) { return; } charac.addVelocity( new goog.math.Vec2( 0, -1 ) ); }, "Move Up", true );
    window["moveUp"] = moveUp;
    var moveDown = new illandril.game.ui.Action( function( tickTime ) { if ( illandril.game.Engine.paused ) { return; } charac.addVelocity( new goog.math.Vec2( 0, 1 ) ); }, "Move Down", true );
    window["moveDown"] = moveDown;
    var moveLeft = new illandril.game.ui.Action( function( tickTime ) { if ( illandril.game.Engine.paused ) { return; } charac.addVelocity( new goog.math.Vec2( -1, 0 ) ); }, "Move Left", true );
    window["moveLeft"] = moveLeft;
    var moveRight = new illandril.game.ui.Action( function( tickTime ) { if ( illandril.game.Engine.paused ) { return; } charac.addVelocity( new goog.math.Vec2( 1, 0 ) ); }, "Move Right", true );
    window["moveRight"] = moveRight;
    scene.getControls().registerAction( moveUp, goog.events.KeyCodes.W, false, false, false );
    illandril.game.Engine.controlScene.addControl( scene.getControls(), moveUp );
    scene.getControls().registerAction( moveLeft, goog.events.KeyCodes.A, false, false, false );
    illandril.game.Engine.controlScene.addControl( scene.getControls(), moveLeft );
    scene.getControls().registerAction( moveDown, goog.events.KeyCodes.S, false, false, false );
    illandril.game.Engine.controlScene.addControl( scene.getControls(), moveDown );
    scene.getControls().registerAction( moveRight, goog.events.KeyCodes.D, false, false, false );
    illandril.game.Engine.controlScene.addControl( scene.getControls(), moveRight );

    illandril.game.util.Framerate.reset();
    
    // End for testing
     
    scene.endBulk();
    illandril.game.Engine.endLoad();
  },
  tick: function() {
    var tickTime = illandril.game.util.Framerate.tick();
    illandril.game.Engine.controls.handleKeyEvents( tickTime );
    if ( illandril.game.Engine.paused ) {
      /*
      if ( illandril.game.Engine.lastScene != null ) {
        for ( var i = 0; i < illandril.game.Engine.lastScene.viewports.length; i++ ) {
          illandril.game.Engine.lastScene.viewports[i].hide();
        }
        illandril.game.Engine.lastScene = null;
      }
      */
      illandril.game.util.Framerate.reset();
    } else {
      var scene = illandril.game.Engine.currentScene;
      if ( scene != illandril.game.Engine.lastScene ) {
        if ( illandril.game.Engine.lastScene != null ) {
          for ( var i = 0; i < illandril.game.Engine.lastScene.viewports.length; i++ ) {
            illandril.game.Engine.lastScene.viewports[i].hide();
           }
        }
        illandril.game.Engine.lastScene = scene;
      }
      for ( var i = 0; i < scene.viewports.length; i++ ) {
        scene.viewports[i].show();
      }
      scene.getControls().handleKeyEvents( tickTime );
      scene.update( tickTime, illandril.game.util.Framerate.getTotalTime() );
      if ( illandril.game.util.Framerate.totalFrames % 5 == 0 ) {
        illandril.game.Engine.debug.innerHTML = "";
        if ( illandril.game.Engine.debugFPS ) {
          illandril.game.Engine.debug.innerHTML = "FPS: " + illandril.game.util.Framerate.getAverageFPS().toString().substr(0,5) + ":" + illandril.game.util.Framerate.getRollingAverageFPS().toString().substr(0,5);
          if ( illandril.game.Engine.debugObjectCount ) {
            illandril.game.Engine.debug.innerHTML = illandril.game.Engine.debug.innerHTML + "<br>";
          }
        }
        if ( illandril.game.Engine.debugObjectCount ) {
          illandril.game.Engine.debug.innerHTML = illandril.game.Engine.debug.innerHTML + "Objects: " + scene.getObjects().getAllObjects().length;
          illandril.game.Engine.debug.innerHTML = illandril.game.Engine.debug.innerHTML + "<br>&nbsp;&nbsp;Solid: " + scene.getObjects().getSolidObjects().length;
          illandril.game.Engine.debug.innerHTML = illandril.game.Engine.debug.innerHTML + "<br>&nbsp;Active: " + scene.getObjects().getActiveObjects().length;
          illandril.game.Engine.debug.innerHTML = illandril.game.Engine.debug.innerHTML + "<br>DOM: " + document.all.length;
        }
        illandril.game.Engine.debug.style.display = ( illandril.game.Engine.debug.innerHTML == "" ) ? "none" : "";
      }
    }
    setTimeout( illandril.game.Engine.tick, 10 );
  },
  startLoad: function() {
    illandril.game.Engine.loading++;
    illandril.game.Engine.loadingDialog.setVisible( true );
    illandril.game.Engine._pause();
  },
  endLoad: function() {
    illandril.game.Engine.loading--;
    if ( illandril.game.Engine.loading == 0 ) {
      illandril.game.Engine.loadingDialog.setVisible( false );
      if ( illandril.game.Engine.resumeOnLoadingFinish ) {
        illandril.game.Engine.resume();
      } else {
        illandril.game.Engine._pause();
      }
    }
  },
  togglePause: function() {
    if ( illandril.game.Engine.paused ) {
      illandril.game.Engine.resume();
    } else {
      illandril.game.Engine.pause();
    }
  },
  pause: function() {
    illandril.game.Engine.resumeOnLoadingFinish = false;
    illandril.game.Engine._pause();
  },
  _pause: function() {
    illandril.game.Engine.paused = true;
    illandril.game.Engine.pausedDialog.setVisible( illandril.game.Engine.loading == 0 );
    illandril.game.Engine.noClick.style.display = "";
    illandril.game.Engine.noClick.style.width = illandril.game.Engine.container.clientWidth + "px";
    illandril.game.Engine.noClick.style.height = illandril.game.Engine.container.clientHeight + "px";
  },
  resume: function() {
    if ( illandril.game.Engine.loading == 0 ) {
      illandril.game.Engine.paused = false;
      illandril.game.Engine.resumeOnLoadingFinish = true;
      illandril.game.Engine.pausedDialog.setVisible( false );
      illandril.game.Engine.noClick.style.display = "none";
    }
  }
};
goog.exportSymbol( "illandril.game.Engine", illandril.game.Engine );
goog.exportProperty( illandril.game.Engine, "init", illandril.game.Engine.init );
goog.exportProperty( illandril.game.Engine, "pause", illandril.game.Engine.pause );
goog.exportProperty( illandril.game.Engine, "resume", illandril.game.Engine.resume );


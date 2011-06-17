goog.provide('platformer');

goog.require('illandril');
goog.require('illandril.game.ControlChangeScene');
goog.require('illandril.game.Engine');
goog.require('illandril.game.Scene');
goog.require('illandril.game.objects.ActiveCollectable');
goog.require('illandril.game.objects.Car');
goog.require('illandril.game.objects.Consumer');
goog.require('illandril.game.objects.GameObject');
goog.require('illandril.game.objects.Generator');
goog.require('illandril.game.objects.Player');
goog.require('illandril.game.objects.Slope');
goog.require('illandril.game.objects.Stairs');
goog.require('illandril.game.objects.Wall');
goog.require('illandril.game.objects.menus.ControlEntry');
goog.require('illandril.game.objects.menus.MenuEntry');
goog.require('illandril.game.ui.Action');
goog.require('illandril.game.ui.BasicDirectionalAnimation');
goog.require('illandril.game.ui.Controls');
goog.require('illandril.game.ui.Font');
goog.require('illandril.game.ui.StaticSprite');
goog.require('illandril.game.ui.Viewport');
goog.require('illandril.game.util.Framerate');

platformer = {};
platformer.init = function(menuSrc, mapSrc) {
  platformer.engine = new illandril.game.Engine('game');

  var font = new illandril.game.ui.Font('../graphics/font.png', 15, 15, '?ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890 :+', 1, 1, -4);

  var menuScene = new illandril.game.Scene('Main Menu');
  new illandril.game.ui.Viewport(platformer.engine.container, menuScene, new goog.math.Vec2(500, 500));
  new illandril.game.objects.Player(menuScene, new illandril.math.Bounds(new goog.math.Vec2(0, 0), new goog.math.Vec2(0, 0)), null, 0);

  platformer.controlScene = new illandril.game.ControlChangeScene('Controls Menu', new goog.math.Vec2(0, 200), font);
  new illandril.game.ui.Viewport(platformer.engine.container, platformer.controlScene, new goog.math.Vec2(500, 500));
  new illandril.game.objects.Player(platformer.controlScene, new illandril.math.Bounds(new goog.math.Vec2(0, 0), new goog.math.Vec2(0, 0)), null, 0);

  var toMenu = new illandril.game.ui.Action(function() { if (!platformer.engine.paused) { platformer.engine.loadScene(menuScene); } }, 'Main Menu', false);
  platformer.engine.addActionToControls(toMenu, goog.events.KeyCodes.ESC, false, false, false);

  var loadedScene = new illandril.game.Scene();
  loadedScene.setGravity(new goog.math.Vec2(0, -400));
  platformer.controlScene.addControl(platformer.engine.controls, toMenu);
  platformer.engine.addStandardEngineControlsToScene(platformer.controlScene);

  var controlsMenu = new illandril.game.objects.menus.MenuEntry(menuScene, 'Controls', new goog.math.Vec2(-144, -118), font, 10000);
  controlsMenu.onClick = function() {
    platformer.engine.loadScene(platformer.controlScene);
  }

  var playMenu = new illandril.game.objects.menus.MenuEntry(menuScene, 'Play', new goog.math.Vec2(144, -118), font, 10000);
  playMenu.onClick = function() {
    platformer.engine.loadScene(loadedScene);
  }


  platformer.engine.loadScene(menuScene);
  platformer.engine.start();

  platformer.engine.loadMap(menuSrc, menuScene, function(){});
  platformer.engine.loadMap(mapSrc, loadedScene, platformer.initMap, platformer.objectBuilder);
};

platformer.initMap = function(mapSrc, scene) {
  scene.startBulk();

  // Start for testing
/*
  // START OF DIRECTIONAL BLOCKING TESTS
  for (var y = 16; y <= 1000; y += 32) {
    var t = new illandril.game.objects.Wall(scene, new illandril.math.Bounds(new goog.math.Vec2(16 - Math.random() * 64, y), new goog.math.Vec2(64, 32)), new illandril.game.ui.StaticSprite('../graphics/generic_tiles.png', new goog.math.Vec2(32, 256)), 50);
    t.blocksFromBottom = function() { return false; }
    t.blocksFromLeft = function() { return false; }
    t.blocksFromRight = function() { return false; }
  }

  var b = new illandril.game.objects.Wall(scene, new illandril.math.Bounds(new goog.math.Vec2(-112, 48), new goog.math.Vec2(32, 32)), new illandril.game.ui.StaticSprite('../graphics/generic_tiles.png', new goog.math.Vec2(32, 352)), 50);
  b.blocksFromTop = function() { return false; }
  b.blocksFromLeft = function() { return false; }
  b.blocksFromRight = function() { return false; }

  var l = new illandril.game.objects.Wall(scene, new illandril.math.Bounds(new goog.math.Vec2(-128, 16), new goog.math.Vec2(32, 32)), new illandril.game.ui.StaticSprite('../graphics/generic_tiles.png', new goog.math.Vec2(0, 288)), 50);
  l.blocksFromTop = function() { return false; }
  l.blocksFromBottom = function() { return false; }
  l.blocksFromRight = function() { return false; }

  var r = new illandril.game.objects.Wall(scene, new illandril.math.Bounds(new goog.math.Vec2(-196, 16), new goog.math.Vec2(32, 32)), new illandril.game.ui.StaticSprite('../graphics/generic_tiles.png', new goog.math.Vec2(96, 288)), 50);
  r.blocksFromTop = function() { return false; }
  r.blocksFromBottom = function() { return false; }
  r.blocksFromLeft = function() { return false; }


  // START OF SLOPE / STAIR TESTING
  var s = new illandril.game.objects.Wall(scene, new illandril.math.Bounds(new goog.math.Vec2(96, 32), new goog.math.Vec2(64, 64)), new illandril.game.ui.StaticSprite('../graphics/generic_tiles.png', new goog.math.Vec2(256, 0)), 50);
  goog.object.extend(s, illandril.game.objects.Slope.prototype);
  s.direction = illandril.game.objects.Slope.DIRECTION.NE;

  s = new illandril.game.objects.Wall(scene, new illandril.math.Bounds(new goog.math.Vec2(160, 32), new goog.math.Vec2(64, 64)), new illandril.game.ui.StaticSprite('../graphics/generic_tiles.png', new goog.math.Vec2(320, 0)), 50);
  goog.object.extend(s, illandril.game.objects.Slope.prototype);
  s.direction = illandril.game.objects.Slope.DIRECTION.NW;

  s = new illandril.game.objects.Wall(scene, new illandril.math.Bounds(new goog.math.Vec2(96, 96), new goog.math.Vec2(64, 64)), new illandril.game.ui.StaticSprite("../graphics/generic_tiles.png", new goog.math.Vec2(320, 64)), 50);
  goog.object.extend(s, illandril.game.objects.Slope.prototype);
  s.direction = illandril.game.objects.Slope.DIRECTION.SW;

  s = new illandril.game.objects.Wall(scene, new illandril.math.Bounds(new goog.math.Vec2(160, 96), new goog.math.Vec2(64, 64)), new illandril.game.ui.StaticSprite("../graphics/generic_tiles.png", new goog.math.Vec2(256, 64)), 50);
  goog.object.extend(s, illandril.game.objects.Slope.prototype);
  s.direction = illandril.game.objects.Slope.DIRECTION.SE;



  s = new illandril.game.objects.Wall(scene, new illandril.math.Bounds(new goog.math.Vec2(256, 64), new goog.math.Vec2(64, 128)), new illandril.game.ui.StaticSprite('../graphics/generic_tiles.png', new goog.math.Vec2(256, 128)), 50);
  goog.object.extend(s, illandril.game.objects.Slope.prototype);
  s.direction = illandril.game.objects.Slope.DIRECTION.NE;

  s = new illandril.game.objects.Wall(scene, new illandril.math.Bounds(new goog.math.Vec2(320, 64), new goog.math.Vec2(64, 128)), new illandril.game.ui.StaticSprite('../graphics/generic_tiles.png', new goog.math.Vec2(320, 128)), 50);
  goog.object.extend(s, illandril.game.objects.Slope.prototype);
  s.direction = illandril.game.objects.Slope.DIRECTION.NW;

  s = new illandril.game.objects.Wall(scene, new illandril.math.Bounds(new goog.math.Vec2(256, 160), new goog.math.Vec2(64, 128)), new illandril.game.ui.StaticSprite("../graphics/generic_tiles.png", new goog.math.Vec2(320, 256)), 50);
  goog.object.extend(s, illandril.game.objects.Slope.prototype);
  s.direction = illandril.game.objects.Slope.DIRECTION.SW;

  s = new illandril.game.objects.Wall(scene, new illandril.math.Bounds(new goog.math.Vec2(320, 160), new goog.math.Vec2(64, 128)), new illandril.game.ui.StaticSprite("../graphics/generic_tiles.png", new goog.math.Vec2(256, 256)), 50);
  goog.object.extend(s, illandril.game.objects.Slope.prototype);
  s.direction = illandril.game.objects.Slope.DIRECTION.SE;



  s = new illandril.game.objects.Wall(scene, new illandril.math.Bounds(new goog.math.Vec2(448, 32), new goog.math.Vec2(128, 64)), new illandril.game.ui.StaticSprite('../graphics/generic_tiles.png', new goog.math.Vec2(0, 384)), 50);
  goog.object.extend(s, illandril.game.objects.Slope.prototype);
  s.direction = illandril.game.objects.Slope.DIRECTION.NE;

  s = new illandril.game.objects.Wall(scene, new illandril.math.Bounds(new goog.math.Vec2(576, 32), new goog.math.Vec2(128, 64)), new illandril.game.ui.StaticSprite('../graphics/generic_tiles.png', new goog.math.Vec2(128, 384)), 50);
  goog.object.extend(s, illandril.game.objects.Slope.prototype);
  s.direction = illandril.game.objects.Slope.DIRECTION.NW;


  s = new illandril.game.objects.Wall(scene, new illandril.math.Bounds(new goog.math.Vec2(448, 96), new goog.math.Vec2(128, 64)), new illandril.game.ui.StaticSprite("../graphics/generic_tiles.png", new goog.math.Vec2(128, 448)), 50);
  goog.object.extend(s, illandril.game.objects.Slope.prototype);
  s.direction = illandril.game.objects.Slope.DIRECTION.SW;

  s = new illandril.game.objects.Wall(scene, new illandril.math.Bounds(new goog.math.Vec2(576, 96), new goog.math.Vec2(128, 64)), new illandril.game.ui.StaticSprite("../graphics/generic_tiles.png", new goog.math.Vec2(0, 448)), 50);
  goog.object.extend(s, illandril.game.objects.Slope.prototype);
  s.direction = illandril.game.objects.Slope.DIRECTION.SE;



  s = new illandril.game.objects.Wall(scene, new illandril.math.Bounds(new goog.math.Vec2(704, 32), new goog.math.Vec2(64, 64)), new illandril.game.ui.StaticSprite('../graphics/generic_tiles.png', new goog.math.Vec2(384, 0)), 50);
  goog.object.extend(s, illandril.game.objects.Stairs.prototype);
  s.direction = illandril.game.objects.Slope.DIRECTION.NE;
  s.steps = 8;

  s = new illandril.game.objects.Wall(scene, new illandril.math.Bounds(new goog.math.Vec2(768, 32), new goog.math.Vec2(64, 64)), new illandril.game.ui.StaticSprite('../graphics/generic_tiles.png', new goog.math.Vec2(448, 0)), 50);
  goog.object.extend(s, illandril.game.objects.Stairs.prototype);
  s.direction = illandril.game.objects.Slope.DIRECTION.NW;
  s.steps = 8;

  s = new illandril.game.objects.Wall(scene, new illandril.math.Bounds(new goog.math.Vec2(704, 96), new goog.math.Vec2(64, 64)), new illandril.game.ui.StaticSprite("../graphics/generic_tiles.png", new goog.math.Vec2(448, 64)), 50);
  goog.object.extend(s, illandril.game.objects.Stairs.prototype);
  s.direction = illandril.game.objects.Slope.DIRECTION.SW;
  s.steps = 8;

  s = new illandril.game.objects.Wall(scene, new illandril.math.Bounds(new goog.math.Vec2(768, 96), new goog.math.Vec2(64, 64)), new illandril.game.ui.StaticSprite("../graphics/generic_tiles.png", new goog.math.Vec2(384, 64)), 50);
  goog.object.extend(s, illandril.game.objects.Stairs.prototype);
  s.direction = illandril.game.objects.Slope.DIRECTION.SE;
  s.steps = 8;



  s = new illandril.game.objects.Wall(scene, new illandril.math.Bounds(new goog.math.Vec2(864, 64), new goog.math.Vec2(64, 128)), new illandril.game.ui.StaticSprite('../graphics/generic_tiles.png', new goog.math.Vec2(384, 128)), 50);
  goog.object.extend(s, illandril.game.objects.Stairs.prototype);
  s.direction = illandril.game.objects.Slope.DIRECTION.NE;
  s.steps = 16;

  s = new illandril.game.objects.Wall(scene, new illandril.math.Bounds(new goog.math.Vec2(928, 64), new goog.math.Vec2(64, 128)), new illandril.game.ui.StaticSprite('../graphics/generic_tiles.png', new goog.math.Vec2(448, 128)), 50);
  goog.object.extend(s, illandril.game.objects.Stairs.prototype);
  s.direction = illandril.game.objects.Slope.DIRECTION.NW;
  s.steps = 16;

  s = new illandril.game.objects.Wall(scene, new illandril.math.Bounds(new goog.math.Vec2(864, 160), new goog.math.Vec2(64, 128)), new illandril.game.ui.StaticSprite("../graphics/generic_tiles.png", new goog.math.Vec2(448, 256)), 50);
  goog.object.extend(s, illandril.game.objects.Stairs.prototype);
  s.direction = illandril.game.objects.Slope.DIRECTION.SW;
  s.steps = 16;

  s = new illandril.game.objects.Wall(scene, new illandril.math.Bounds(new goog.math.Vec2(928, 160), new goog.math.Vec2(64, 128)), new illandril.game.ui.StaticSprite("../graphics/generic_tiles.png", new goog.math.Vec2(384, 256)), 50);
  goog.object.extend(s, illandril.game.objects.Stairs.prototype);
  s.direction = illandril.game.objects.Slope.DIRECTION.SE;
  s.steps = 16;



  s = new illandril.game.objects.Wall(scene, new illandril.math.Bounds(new goog.math.Vec2(1056, 32), new goog.math.Vec2(128, 64)), new illandril.game.ui.StaticSprite('../graphics/generic_tiles.png', new goog.math.Vec2(256, 384)), 50);
  goog.object.extend(s, illandril.game.objects.Stairs.prototype);
  s.direction = illandril.game.objects.Slope.DIRECTION.NE;
  s.steps = 16;

  s = new illandril.game.objects.Wall(scene, new illandril.math.Bounds(new goog.math.Vec2(1184, 32), new goog.math.Vec2(128, 64)), new illandril.game.ui.StaticSprite('../graphics/generic_tiles.png', new goog.math.Vec2(384, 384)), 50);
  goog.object.extend(s, illandril.game.objects.Stairs.prototype);
  s.direction = illandril.game.objects.Slope.DIRECTION.NW;
  s.steps = 16;

  s = new illandril.game.objects.Wall(scene, new illandril.math.Bounds(new goog.math.Vec2(1056, 96), new goog.math.Vec2(128, 64)), new illandril.game.ui.StaticSprite("../graphics/generic_tiles.png", new goog.math.Vec2(384, 448)), 50);
  goog.object.extend(s, illandril.game.objects.Stairs.prototype);
  s.direction = illandril.game.objects.Slope.DIRECTION.SW;
  s.steps = 16;

  s = new illandril.game.objects.Wall(scene, new illandril.math.Bounds(new goog.math.Vec2(1184, 96), new goog.math.Vec2(128, 64)), new illandril.game.ui.StaticSprite("../graphics/generic_tiles.png", new goog.math.Vec2(256, 448)), 50);
  goog.object.extend(s, illandril.game.objects.Stairs.prototype);
  s.direction = illandril.game.objects.Slope.DIRECTION.SE;
  s.steps = 16;
*/
  // PLAYER
  var charac = new illandril.game.objects.Player(scene, new illandril.math.Bounds(new goog.math.Vec2(10, 10), new goog.math.Vec2(20, 20)), new illandril.game.ui.BasicDirectionalAnimation('../graphics/generic_character.png', 20, 20, 4, 2), 1000);
  charac.setSpeed(100);

  // PLAYER CONTROLS
  var moveUp = new illandril.game.ui.Action(function(tickTime) { charac.setDesiredMovement(new goog.math.Vec2(0, 1)); }, 'Move Up', true);
  var moveDown = new illandril.game.ui.Action(function(tickTime) { charac.setDesiredMovement(new goog.math.Vec2(0, -1)); }, 'Move Down', true);
  var moveLeft = new illandril.game.ui.Action(function(tickTime) { charac.setDesiredMovement(new goog.math.Vec2(-1, 0)); }, 'Move Left', true);
  var moveRight = new illandril.game.ui.Action(function(tickTime) { charac.setDesiredMovement(new goog.math.Vec2(1, 0)); }, 'Move Right', true);
  scene.getControls().registerAction(moveUp, goog.events.KeyCodes.W, false, false, false);
  platformer.controlScene.addControl(scene.getControls(), moveUp);
  scene.getControls().registerAction(moveLeft, goog.events.KeyCodes.A, false, false, false);
  platformer.controlScene.addControl(scene.getControls(), moveLeft);
  scene.getControls().registerAction(moveDown, goog.events.KeyCodes.S, false, false, false);
  platformer.controlScene.addControl(scene.getControls(), moveDown);
  scene.getControls().registerAction(moveRight, goog.events.KeyCodes.D, false, false, false);
  platformer.controlScene.addControl(scene.getControls(), moveRight);

  var vp = new illandril.game.ui.Viewport(platformer.engine.container, scene, new goog.math.Vec2(500, 500));
  vp.follow(charac);

  scene.endBulk();
};

platformer.objectBuilder = function(objDef) {
  if ( objDef['type'] == 'death' ) {
    alert( "DEATH!" );
    if (objDef['solid'] != null && objDef['solid'] == false) {
      new illandril.game.objects.GameObject(objDef.scene, new illandril.math.Bounds(objDef.pos, objDef.size), objDef.sprite, objDef['zIndex']);
    } else {
      new illandril.game.objects.Wall(objDef.scene, new illandril.math.Bounds(objDef.pos, objDef.size), objDef.sprite, objDef['zIndex']);
    }
  } else {
    illandril.game.Engine.defaultObjectBuilder(objDef);
  }
};

goog.exportSymbol('platformer', platformer);
goog.exportProperty(platformer, 'init', platformer.init);

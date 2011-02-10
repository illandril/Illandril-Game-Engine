goog.provide('demo');

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

demo = {};
demo.init = function(mapSrc) {
  demo.engine = new illandril.game.Engine('game');

  var font = new illandril.game.ui.Font('../graphics/font.png', 15, 15, '?ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890 :+', 1, 1, -4);

  var menuScene = new illandril.game.Scene('Main Menu');
  new illandril.game.ui.Viewport(demo.engine.container, menuScene, new goog.math.Vec2(500, 500));
  new illandril.game.objects.Player(menuScene, new illandril.math.Bounds(new goog.math.Vec2(0, 0), new goog.math.Vec2(0, 0)), null, 0);

  demo.controlScene = new illandril.game.ControlChangeScene('Controls Menu', new goog.math.Vec2(0, 200), font);
  new illandril.game.ui.Viewport(demo.engine.container, demo.controlScene, new goog.math.Vec2(500, 500));
  new illandril.game.objects.Player(demo.controlScene, new illandril.math.Bounds(new goog.math.Vec2(0, 0), new goog.math.Vec2(0, 0)), null, 0);

  var toMenu = new illandril.game.ui.Action(function() { if (!demo.engine.paused) { demo.engine.loadScene(menuScene); } }, 'Main Menu', false);
  demo.engine.addActionToControls(toMenu, goog.events.KeyCodes.ESC, false, false, false);

  var loadedScene = new illandril.game.Scene();
  // loadedScene.setGravity(new goog.math.Vec2(0, -400));
  demo.controlScene.addControl(demo.engine.controls, toMenu);
  demo.engine.addStandardEngineControlsToScene(demo.controlScene);

  var controlsMenu = new illandril.game.objects.menus.MenuEntry(menuScene, 'Controls', new goog.math.Vec2(0, 20), font, 5);
  controlsMenu.onClick = function() {
    demo.engine.loadScene(demo.controlScene);
  }

  var playMenu = new illandril.game.objects.menus.MenuEntry(menuScene, 'Play', new goog.math.Vec2(0, -20), font, 0);
  playMenu.onClick = function() {
    demo.engine.loadScene(loadedScene);
  }


  demo.engine.loadScene(menuScene);
  demo.engine.start();

  demo.engine.loadMap(mapSrc, loadedScene, demo.initMap);
};

demo.initMap = function(mapSrc, scene) {
  scene.startBulk();
  var container = demo.engine.container;

  // Start for demoing
  var charac = new illandril.game.objects.Player(scene, new illandril.math.Bounds(new goog.math.Vec2(11, 24), new goog.math.Vec2(21, 47)), new illandril.game.ui.BasicDirectionalAnimation('../../external-resources/graphics/urbansquall_tileset/characters/princess_AP.png', 21, 47, 4, 4), 1000, new illandril.math.Bounds(new goog.math.Vec2(0, -14), new goog.math.Vec2(21, 24)));
  charac.setSpeed(75);
  charac.jumpY = false;
  
  var vp = new illandril.game.ui.Viewport(container, scene, new goog.math.Vec2(500, 500));
  vp.follow(charac);
  
  // PLAYER CONTROLS
  var moveUp = new illandril.game.ui.Action(function(tickTime) { charac.setDesiredMovement(new goog.math.Vec2(0, 1)); }, 'Move Up', true);
  var moveDown = new illandril.game.ui.Action(function(tickTime) { charac.setDesiredMovement(new goog.math.Vec2(0, -1)); }, 'Move Down', true);
  var moveLeft = new illandril.game.ui.Action(function(tickTime) { charac.setDesiredMovement(new goog.math.Vec2(-1, 0)); }, 'Move Left', true);
  var moveRight = new illandril.game.ui.Action(function(tickTime) { charac.setDesiredMovement(new goog.math.Vec2(1, 0)); }, 'Move Right', true);
  scene.getControls().registerAction(moveUp, goog.events.KeyCodes.W, false, false, false);
  demo.controlScene.addControl(scene.getControls(), moveUp);
  scene.getControls().registerAction(moveLeft, goog.events.KeyCodes.A, false, false, false);
  demo.controlScene.addControl(scene.getControls(), moveLeft);
  scene.getControls().registerAction(moveDown, goog.events.KeyCodes.S, false, false, false);
  demo.controlScene.addControl(scene.getControls(), moveDown);
  scene.getControls().registerAction(moveRight, goog.events.KeyCodes.D, false, false, false);
  demo.controlScene.addControl(scene.getControls(), moveRight);

  scene.endBulk();
};

goog.exportSymbol('demo', demo);
goog.exportProperty(demo, 'init', demo.init);

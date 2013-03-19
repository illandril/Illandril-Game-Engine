goog.provide('mario');

goog.require('Box2D.Common.Math.b2Vec2');

goog.require('illandril.game.game');
goog.require('illandril.game.platformer');
goog.require('illandril.game.controls.keyHandler');
goog.require('illandril.game.controls.action');
goog.require('goog.events.KeyCodes');

(function(test){

var player;
var ramp;

var worldSize = Box2D.Common.Math.b2Vec2.Get(350, 30); // Meters
var viewportSize = Box2D.Common.Math.b2Vec2.Get(600, 300); // Pixels
var viewportScale = 20; // Pixels per Meter

var playerControls;
var gameControls;
var g;
var p;

var marioSheet = 'graphics/smbsheet.gif';
var offsets = {
    floor: Box2D.Common.Math.b2Vec2.Get(0,454),
    block: Box2D.Common.Math.b2Vec2.Get(178,326),
    hard: Box2D.Common.Math.b2Vec2.Get(2,124),
    coinBox: Box2D.Common.Math.b2Vec2.Get(354,54),
    coin: Box2D.Common.Math.b2Vec2.Get(0,58),
    spentBox: Box2D.Common.Math.b2Vec2.Get(290,54),
    coinBlock: Box2D.Common.Math.b2Vec2.Get(178,326),
    hiddenStar: Box2D.Common.Math.b2Vec2.Get(0,0),
    star: Box2D.Common.Math.b2Vec2.Get(32,84),
    shroomBox: Box2D.Common.Math.b2Vec2.Get(354,54),
    shroom: Box2D.Common.Math.b2Vec2.Get(0,90),
    hiddenOneUp: Box2D.Common.Math.b2Vec2.Get(0,0),
    oneUp: Box2D.Common.Math.b2Vec2.Get(2,158),
    pipeL: Box2D.Common.Math.b2Vec2.Get(158,388),
    pipeR: Box2D.Common.Math.b2Vec2.Get(190,388),
    pipeLT: Box2D.Common.Math.b2Vec2.Get(158,356),
    pipeRT: Box2D.Common.Math.b2Vec2.Get(190,356),
    pipeLTD: Box2D.Common.Math.b2Vec2.Get(158,356),
    pipeRTD: Box2D.Common.Math.b2Vec2.Get(190,356),
    turtle: Box2D.Common.Math.b2Vec2.Get(55,380), // Not actually on the sheet
    goomba: Box2D.Common.Math.b2Vec2.Get(10,396), // Not actually on the sheet
    flagPole: Box2D.Common.Math.b2Vec2.Get(466,168),
    flag: Box2D.Common.Math.b2Vec2.Get(452,136),
    flagTopper: Box2D.Common.Math.b2Vec2.Get(466,104),
    castleWall: Box2D.Common.Math.b2Vec2.Get(300,424),
    castleTopper: Box2D.Common.Math.b2Vec2.Get(300,352),
    castleDoorBottom: Box2D.Common.Math.b2Vec2.Get(364,424),
    castleDoorTop: Box2D.Common.Math.b2Vec2.Get(364,384),
    castleTopperWindowRight: Box2D.Common.Math.b2Vec2.Get(332,352),
    castleWindowRight: Box2D.Common.Math.b2Vec2.Get(332,320),
    castleTopperWindowLeft: Box2D.Common.Math.b2Vec2.Get(396,352),
    castleWindowLeft: Box2D.Common.Math.b2Vec2.Get(396,320),
    castleTopperWall: Box2D.Common.Math.b2Vec2.Get(364,352),
    castleFlag: Box2D.Common.Math.b2Vec2.Get(362,264),
    death: Box2D.Common.Math.b2Vec2.Get(160,64)
};

test.init = function(gameContainerID, doDebug, wasd) {
    g = new illandril.game.game(test, gameContainerID, worldSize, illandril.game.platformer.DEFAULTS.GRAVITY, viewportSize, viewportScale, doDebug);
    p = new illandril.game.platformer(g);
    var position = Box2D.Common.Math.b2Vec2.Get(5, worldSize.y - 7);
    test.createPlayer(position, wasd);
    test.createMario(g, p, Box2D.Common.Math.b2Vec2.Get(0, worldSize.y), position);
    
    var size = Box2D.Common.Math.b2Vec2.Get(viewportSize.x / viewportScale, viewportSize.y / viewportScale);
    var bg = g.getWorld().createScenery(size, Box2D.Common.Math.b2Vec2.Get(0,0), -1 /* zOffset */);
    g.getViewport().setImage(bg, 'graphics/sky.png');
    g.getViewport().setParallax(bg, 100);
    g.startWhenReady();
};

test.createPlayer = function(position, wasd) {
    var sprite = '../external-resources/graphics/urbansquall_tileset/characters/princess_AP.png';
    var spriteOffset = Box2D.Common.Math.b2Vec2.Get(0, 0);
    var frames = 4;
    var frameSpeed = 4;
    var frameSize = Box2D.Common.Math.b2Vec2.Get(21, 47);
    var size = Box2D.Common.Math.b2Vec2.Get(frameSize.x / 20, frameSize.y / 20);
    player = p.createPlayer(size, position);
    g.getAnimationManager().setAsFourDirectionalAnimation(player, size, sprite, spriteOffset, frameSize, frames, frameSpeed);
    gameControls = new illandril.game.controls.keyHandler("game");
    var pauseAction = new illandril.game.controls.action(function(){ g.togglePause(); }, "Pause", false /* executeOnRepeat */);
    gameControls.registerAction(pauseAction, goog.events.KeyCodes.P, false, false, false);
    
    playerControls = new illandril.game.controls.keyHandler("player");
    playerControls.registerAction(player.actions.moveUp, wasd ? goog.events.KeyCodes.W : goog.events.KeyCodes.UP, false, false, false);
    playerControls.registerAction(player.actions.moveLeft, wasd ? goog.events.KeyCodes.A : goog.events.KeyCodes.LEFT, false, false, false);
    playerControls.registerAction(player.actions.moveDown, wasd ? goog.events.KeyCodes.S : goog.events.KeyCodes.DOWN, false, false, false);
    playerControls.registerAction(player.actions.moveRight, wasd ? goog.events.KeyCodes.D : goog.events.KeyCodes.RIGHT, false, false, false);
};

test.createMario = function(g, p, offset, respawn) {

    var tileSize = Box2D.Common.Math.b2Vec2.Get(1.6, 1.6);
    var start = Box2D.Common.Math.b2Vec2.Get(offset.x - tileSize.x / 2, offset.y - tileSize.y / 2);
    //http://ian-albert.com/games/super_mario_bros_maps/mario-1-1.gif
    var world = [
        '                                                                                                                                                                                                                    '.split(''),
//       012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789
        '                                                                                                                                                                                                                    '.split(''),
//       012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789
        '                                                                                                                                                                                                      o             '.split(''),
//       012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789
        '                                                                                                                                                                                                     F|             '.split(''),
//       012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789
        '                                                                                   G                                                                                                                  |             '.split(''),
//       012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789
        '                      O                                                         ########   ###O              M           ###    #OO#                                                        ==        |             '.split(''),
//       012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789
        '                                                                                                                                                                                           ===        |             '.split(''),
//       012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789
        '                                                                               G                                                                                                          ====        |     $       '.split(''),
//       012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789
        '                                                                1                                                                                                                        =====        |    ^^^      '.split(''),
//       012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789
        '                O   #M#O#                     <>         {}                  #M#              @     #*    O  O  O     #          ##      =  =          ==  =            ###O#           ======        |    R+L      '.split(''),
//       012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789
        '                                      <>      []         []                                                                             ==  ==        ===  ==                          =======        |   ^r&l^     '.split(''),
//       012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789
        '                            <>        []      []         []                                                                            ===  ===      ====  ===     {}              <> ========        |   ++u++     '.split(''),
//       012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789
        '                     G      []        [] G    []     G G []                                    G G        T                G G G G    ====  ====    =====  ====    []        G G   []=========        =   ++8++     '.split(''),
//       012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789
        '---------------------------------------------------------------------  ---------------   ----------------------------------------------------------------  ---------------------------------------------------------'.split(''),
        'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'.split('')
//       012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789
//       0         1         2         3         4         5         6         7         8         9         0         1         2         3         4         5         6         7         8         9         0         1         2         3         4         5         6         7         8         9         0         1         2         3         4         5         6         7         8         9         0         1         2         3         4         5         6         7         8         9         0         
    ];
    var topLeft = Box2D.Common.Math.b2Vec2.Get(start.x, start.y - tileSize.y * (world.length - 1));
    
    for(var y = 0; y < world.length; y++) {
        for(var x = 0; x < world[y].length; x++) {
            test.createItem(g, p, world[y][x], Box2D.Common.Math.b2Vec2.Get(x, y), topLeft, tileSize, respawn);
        }
    }
};

test.createItem = function(g, p, type, location, offset, tileSize, respawn) {
    var obj = null;
    var imgSheet = marioSheet;
    var imgOffset = null;
    switch(type) {
        case ' ':
            break;
        case '-':
            obj = p.createBlock(tileSize, Box2D.Common.Math.b2Vec2.Get(offset.x + location.x * tileSize.x, offset.y + location.y * tileSize.y));
            imgOffset = offsets.floor;
            break;
        case '=':
            obj = p.createBlock(tileSize, Box2D.Common.Math.b2Vec2.Get(offset.x + location.x * tileSize.x, offset.y + location.y * tileSize.y));
            imgOffset = offsets.hard;
            break;
        case 'O':
            obj = p.createBreakableBlock(tileSize, Box2D.Common.Math.b2Vec2.Get(offset.x + location.x * tileSize.x, offset.y + location.y * tileSize.y));
            illandril.game.platformer.initializeDirectionalAction(obj, function(collidingObject){
                var obj = p.createBlock(tileSize, Box2D.Common.Math.b2Vec2.Get(offset.x + location.x * tileSize.x, offset.y + location.y * tileSize.y));
                g.getViewport().setImage(obj, marioSheet, offsets.spentBox);
                obj = g.getWorld().createScenery(tileSize, Box2D.Common.Math.b2Vec2.Get(offset.x + location.x * tileSize.x, offset.y + (location.y - 1) * tileSize.y));
                g.getViewport().setImage(obj, marioSheet, offsets.coin);
            }, illandril.game.platformer.SIDES.BOTTOM);
            imgOffset = offsets.coinBox;
            break;
        case '@':
            obj = p.createBlock(tileSize, Box2D.Common.Math.b2Vec2.Get(offset.x + location.x * tileSize.x, offset.y + location.y * tileSize.y));
            obj.coins = 8;
            obj.coinsOutput = 0;
            illandril.game.platformer.initializeDirectionalAction(obj, function(contact){
                obj.coinsOutput++;
                var nObj = g.getWorld().createScenery(tileSize, Box2D.Common.Math.b2Vec2.Get(offset.x + location.x * tileSize.x, offset.y + (location.y - obj.coinsOutput / obj.coins) * tileSize.y));
                g.getViewport().setImage(nObj, marioSheet, offsets.coin);
                if(obj.coinsOutput == obj.coins) {
                    g.getWorld().destroyObject(obj);
                    nObj = p.createBlock(tileSize, Box2D.Common.Math.b2Vec2.Get(offset.x + location.x * tileSize.x, offset.y + location.y * tileSize.y));
                    g.getViewport().setImage(nObj, marioSheet, offsets.spentBox);
                }
            }, illandril.game.platformer.SIDES.BOTTOM);
            imgOffset = offsets.coinBlock;
            break;
        case '#':
            obj = p.createBreakableBlock(tileSize, Box2D.Common.Math.b2Vec2.Get(offset.x + location.x * tileSize.x, offset.y + location.y * tileSize.y));
            imgOffset = offsets.block;
            break;
        case '1':
            obj = p.createBreakableBlock(tileSize, Box2D.Common.Math.b2Vec2.Get(offset.x + location.x * tileSize.x, offset.y + location.y * tileSize.y));
            illandril.game.platformer.initializeDirectionalSiding(obj, illandril.game.platformer.SIDES.TOP | illandril.game.platformer.SIDES.LEFT | illandril.game.platformer.SIDES.RIGHT);
            illandril.game.platformer.initializeDirectionalAction(obj, function(contact){
                var obj = p.createBlock(tileSize, Box2D.Common.Math.b2Vec2.Get(offset.x + location.x * tileSize.x, offset.y + location.y * tileSize.y));
                g.getViewport().setImage(obj, marioSheet, offsets.spentBox);
                obj = g.getWorld().createScenery(tileSize, Box2D.Common.Math.b2Vec2.Get(offset.x + location.x * tileSize.x, offset.y + (location.y - 1) * tileSize.y));
                g.getViewport().setImage(obj, marioSheet, offsets.oneUp);
            }, illandril.game.platformer.SIDES.BOTTOM);
            imgOffset = offsets.hiddenOneUp;
            break;
        case '*':
            obj = p.createBreakableBlock(tileSize, Box2D.Common.Math.b2Vec2.Get(offset.x + location.x * tileSize.x, offset.y + location.y * tileSize.y));
            illandril.game.platformer.initializeDirectionalSiding(obj, illandril.game.platformer.SIDES.TOP | illandril.game.platformer.SIDES.LEFT | illandril.game.platformer.SIDES.RIGHT);
            illandril.game.platformer.initializeDirectionalAction(obj, function(contact){
                var obj = p.createBlock(tileSize, Box2D.Common.Math.b2Vec2.Get(offset.x + location.x * tileSize.x, offset.y + location.y * tileSize.y));
                g.getViewport().setImage(obj, marioSheet, offsets.spentBox);
                obj = g.getWorld().createScenery(tileSize, Box2D.Common.Math.b2Vec2.Get(offset.x + location.x * tileSize.x, offset.y + (location.y - 1) * tileSize.y));
                g.getViewport().setImage(obj, marioSheet, offsets.star);
            }, illandril.game.platformer.SIDES.BOTTOM);
            imgOffset = offsets.hiddenStar;
            break;
        case 'M':
            obj = p.createBreakableBlock(tileSize, Box2D.Common.Math.b2Vec2.Get(offset.x + location.x * tileSize.x, offset.y + location.y * tileSize.y));
            illandril.game.platformer.initializeDirectionalAction(obj, function(contact){
                var obj = p.createBlock(tileSize, Box2D.Common.Math.b2Vec2.Get(offset.x + location.x * tileSize.x, offset.y + location.y * tileSize.y));
                g.getViewport().setImage(obj, marioSheet, offsets.spentBox);
                obj = g.getWorld().createScenery(tileSize, Box2D.Common.Math.b2Vec2.Get(offset.x + location.x * tileSize.x, offset.y + (location.y - 1) * tileSize.y));
                g.getViewport().setImage(obj, marioSheet, offsets.shroom);
            }, illandril.game.platformer.SIDES.BOTTOM);
            imgOffset = offsets.shroomBox;
            break;
        case '[':
            obj = p.createBlock(tileSize, Box2D.Common.Math.b2Vec2.Get(offset.x + location.x * tileSize.x, offset.y + location.y * tileSize.y));
            imgOffset = offsets.pipeL;
            break;
        case ']':
            obj = p.createBlock(tileSize, Box2D.Common.Math.b2Vec2.Get(offset.x + location.x * tileSize.x, offset.y + location.y * tileSize.y));
            imgOffset = offsets.pipeR;
            break;
        case '<':
            obj = p.createBlock(tileSize, Box2D.Common.Math.b2Vec2.Get(offset.x + location.x * tileSize.x, offset.y + location.y * tileSize.y));
            imgOffset = offsets.pipeLT;
            break;
        case '>':
            obj = p.createBlock(tileSize, Box2D.Common.Math.b2Vec2.Get(offset.x + location.x * tileSize.x, offset.y + location.y * tileSize.y));
            imgOffset = offsets.pipeRT;
            break;
        case '{':
            obj = p.createBlock(tileSize, Box2D.Common.Math.b2Vec2.Get(offset.x + location.x * tileSize.x, offset.y + location.y * tileSize.y));
            imgOffset = offsets.pipeLTD;
            break;
        case '}':
            obj = p.createBlock(tileSize, Box2D.Common.Math.b2Vec2.Get(offset.x + location.x * tileSize.x, offset.y + location.y * tileSize.y));
            imgOffset = offsets.pipeRTD;
            break;
        case 'T':
            obj = g.getWorld().createScenery(tileSize, Box2D.Common.Math.b2Vec2.Get(offset.x + location.x * tileSize.x, offset.y + location.y * tileSize.y));
            imgOffset = offsets.turtle;
            break;
        case 'G':
            obj = g.getWorld().createScenery(tileSize, Box2D.Common.Math.b2Vec2.Get(offset.x + location.x * tileSize.x, offset.y + location.y * tileSize.y));
            imgOffset = offsets.goomba;
            break;
        case '|':
            obj = g.getWorld().createScenery(tileSize, Box2D.Common.Math.b2Vec2.Get(offset.x + location.x * tileSize.x, offset.y + location.y * tileSize.y));
            imgOffset = offsets.flagPole;
            break;
        case 'F':
            obj = g.getWorld().createScenery(tileSize, Box2D.Common.Math.b2Vec2.Get(offset.x + location.x * tileSize.x + tileSize.x / 2, offset.y + location.y * tileSize.y), 1 /* zOffset */);
            imgOffset = offsets.flag;
            break;
        case 'o':
            obj = g.getWorld().createScenery(tileSize, Box2D.Common.Math.b2Vec2.Get(offset.x + location.x * tileSize.x, offset.y + location.y * tileSize.y));
            imgOffset = offsets.flagTopper;
            break;
        case '+':
            obj = g.getWorld().createScenery(tileSize, Box2D.Common.Math.b2Vec2.Get(offset.x + location.x * tileSize.x, offset.y + location.y * tileSize.y));
            imgOffset = offsets.castleWall;
            break;
        case '^':
            obj = g.getWorld().createScenery(tileSize, Box2D.Common.Math.b2Vec2.Get(offset.x + location.x * tileSize.x, offset.y + location.y * tileSize.y));
            imgOffset = offsets.castleTopper;
            break;
        case '8':
            obj = g.getWorld().createScenery(tileSize, Box2D.Common.Math.b2Vec2.Get(offset.x + location.x * tileSize.x, offset.y + location.y * tileSize.y));
            imgOffset = offsets.castleDoorBottom;
            break;
        case 'u':
            obj = g.getWorld().createScenery(tileSize, Box2D.Common.Math.b2Vec2.Get(offset.x + location.x * tileSize.x, offset.y + location.y * tileSize.y));
            imgOffset = offsets.castleDoorTop;
            break;
        case 'R':
            obj = g.getWorld().createScenery(tileSize, Box2D.Common.Math.b2Vec2.Get(offset.x + location.x * tileSize.x, offset.y + location.y * tileSize.y));
            imgOffset = offsets.castleWindowRight;
            break;
        case 'r':
            obj = g.getWorld().createScenery(tileSize, Box2D.Common.Math.b2Vec2.Get(offset.x + location.x * tileSize.x, offset.y + location.y * tileSize.y));
            imgOffset = offsets.castleTopperWindowRight;
            break;
        case 'L':
            obj = g.getWorld().createScenery(tileSize, Box2D.Common.Math.b2Vec2.Get(offset.x + location.x * tileSize.x, offset.y + location.y * tileSize.y));
            imgOffset = offsets.castleWindowLeft;
            break;
        case 'l':
            obj = g.getWorld().createScenery(tileSize, Box2D.Common.Math.b2Vec2.Get(offset.x + location.x * tileSize.x, offset.y + location.y * tileSize.y));
            imgOffset = offsets.castleTopperWindowLeft;
            break;
        case '&':
            obj = g.getWorld().createScenery(tileSize, Box2D.Common.Math.b2Vec2.Get(offset.x + location.x * tileSize.x, offset.y + location.y * tileSize.y));
            imgOffset = offsets.castleTopperWall;
            break;
        case '$':
            obj = g.getWorld().createScenery(tileSize, Box2D.Common.Math.b2Vec2.Get(offset.x + location.x * tileSize.x, offset.y + location.y * tileSize.y + tileSize.y / 4));
            imgOffset = offsets.castleFlag;
            break;
        case 'x':
            obj = p.createDeathTrigger(tileSize, Box2D.Common.Math.b2Vec2.Get(offset.x + location.x * tileSize.x, offset.y + location.y * tileSize.y), respawn);
            imgOffset = offsets.death;
            break;
        default:
            throw 'Invalid type: ' + type;
    }
    if (obj !== null && imgSheet !== null && imgOffset !== null) {
        g.getViewport().setImage(obj, imgSheet, imgOffset);
    }
};

test.whilePaused = function(time, tick) {
    gameControls.handleKeyEvents(time, tick);
};

test.preThink = function(time, tick) {
    gameControls.handleKeyEvents(time, tick);
    playerControls.handleKeyEvents(time, tick);
};

//test.preUpdate = function(time, tick) {};
test.preDraw = function(time, tick) {
    g.getViewport().lookAt(player.body.GetWorldCenter());
};

})(mario);

goog.exportSymbol('mario.init', mario.init);

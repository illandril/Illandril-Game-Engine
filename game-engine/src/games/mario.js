goog.provide('mario');

goog.require('game.game');
goog.require('game.platformer');
goog.require('game.controls');
goog.require('game.controls.action');
goog.require('goog.events.KeyCodes');

(function(test){

var player;
var ramp;

var testObjects = 0;
var worldSize = new Box2D.Common.Math.b2Vec2(350, 30); // Meters
var viewportSize = new Box2D.Common.Math.b2Vec2(600, 300); // Pixels
var viewportScale = 20; // Pixels per Meter
var addBallPit = false;

var playerControls;
var gameControls;
var g;
var p;

var marioSheet = 'graphics/smbsheet.gif';
var offsets = {
    floor: new Box2D.Common.Math.b2Vec2(0,454),
    block: new Box2D.Common.Math.b2Vec2(178,326),
    hard: new Box2D.Common.Math.b2Vec2(2,124),
    coinBox: new Box2D.Common.Math.b2Vec2(354,54),
    coin: new Box2D.Common.Math.b2Vec2(0,58),
    spentBox: new Box2D.Common.Math.b2Vec2(290,54),
    coinBlock: new Box2D.Common.Math.b2Vec2(178,326),
    hiddenStar: new Box2D.Common.Math.b2Vec2(0,0),
    star: new Box2D.Common.Math.b2Vec2(32,84),
    shroomBox: new Box2D.Common.Math.b2Vec2(354,54),
    shroom: new Box2D.Common.Math.b2Vec2(0,90),
    hiddenOneUp: new Box2D.Common.Math.b2Vec2(0,0),
    oneUp: new Box2D.Common.Math.b2Vec2(2,158),
    pipeL: new Box2D.Common.Math.b2Vec2(158,388),
    pipeR: new Box2D.Common.Math.b2Vec2(190,388),
    pipeLT: new Box2D.Common.Math.b2Vec2(158,356),
    pipeRT: new Box2D.Common.Math.b2Vec2(190,356),
    pipeLTD: new Box2D.Common.Math.b2Vec2(158,356),
    pipeRTD: new Box2D.Common.Math.b2Vec2(190,356),
    turtle: new Box2D.Common.Math.b2Vec2(55,380), // Not actually on the sheet
    goomba: new Box2D.Common.Math.b2Vec2(10,396), // Not actually on the sheet
    flagPole: new Box2D.Common.Math.b2Vec2(466,168),
    flag: new Box2D.Common.Math.b2Vec2(452,136),
    flagTopper: new Box2D.Common.Math.b2Vec2(466,104),
    castleWall: new Box2D.Common.Math.b2Vec2(300,424),
    castleTopper: new Box2D.Common.Math.b2Vec2(300,352),
    castleDoorBottom: new Box2D.Common.Math.b2Vec2(364,424),
    castleDoorTop: new Box2D.Common.Math.b2Vec2(364,384),
    castleTopperWindowRight: new Box2D.Common.Math.b2Vec2(332,352),
    castleWindowRight: new Box2D.Common.Math.b2Vec2(332,320),
    castleTopperWindowLeft: new Box2D.Common.Math.b2Vec2(396,352),
    castleWindowLeft: new Box2D.Common.Math.b2Vec2(396,320),
    castleTopperWall: new Box2D.Common.Math.b2Vec2(364,352),
    castleFlag: new Box2D.Common.Math.b2Vec2(362,264),
    death: new Box2D.Common.Math.b2Vec2(160,64)
};

test.init = function(gameContainerID, doDebug, wasd) {
    g = new game.game(test, gameContainerID, worldSize, game.platformer.DEFAULTS.GRAVITY, viewportSize, viewportScale, doDebug);
    p = new game.platformer(g);
    var position = new Box2D.Common.Math.b2Vec2(5, worldSize.y - 7);
    test.createPlayer(position, wasd);
    test.createMario(new Box2D.Common.Math.b2Vec2(0, worldSize.y), position);
    
    var size = new Box2D.Common.Math.b2Vec2(viewportSize.x / viewportScale, viewportSize.y / viewportScale);
    var bg = g.getWorld().createScenery(size, new Box2D.Common.Math.b2Vec2(0,0), -1 /* zOffset */);
    g.getViewport().setImage(bg, 'graphics/sky.png');
    g.getViewport().setParallax(bg, 100);
    g.startWhenReady();
};

test.createPlayer = function(position, wasd) {
    var sprite = '../external-resources/graphics/urbansquall_tileset/characters/princess_AP.png';
    var spriteOffset = new Box2D.Common.Math.b2Vec2(0, 0);
    var frames = 4;
    var frameSpeed = 4;
    var frameSize = new Box2D.Common.Math.b2Vec2(21, 47);
    var size = new Box2D.Common.Math.b2Vec2(frameSize.x / 20, frameSize.y / 20);
    player = p.createPlayer(size, position);
    g.getAnimationManager().setAsFourDirectionalAnimation(player, size, sprite, spriteOffset, frameSize, frames, frameSpeed);
    g.getViewport().setZOffset(player, game.ui.viewport.LAYERS.PLAYER);
    gameControls = new game.controls("game");
    var pauseAction = new game.controls.action(function(){ g.togglePause(); }, "Pause", false /* executeOnRepeat */);
    gameControls.registerAction(pauseAction, goog.events.KeyCodes.P, false, false, false);
    
    playerControls = new game.controls("player");
    playerControls.registerAction(player.actions.moveUp, wasd ? goog.events.KeyCodes.W : goog.events.KeyCodes.UP, false, false, false);
    playerControls.registerAction(player.actions.moveLeft, wasd ? goog.events.KeyCodes.A : goog.events.KeyCodes.LEFT, false, false, false);
    playerControls.registerAction(player.actions.moveDown, wasd ? goog.events.KeyCodes.S : goog.events.KeyCodes.DOWN, false, false, false);
    playerControls.registerAction(player.actions.moveRight, wasd ? goog.events.KeyCodes.D : goog.events.KeyCodes.RIGHT, false, false, false);
};

test.createMario = function(offset, respawn) {

    var tileSize = new Box2D.Common.Math.b2Vec2(1.6, 1.6);
    var start = new Box2D.Common.Math.b2Vec2(offset.x - tileSize.x / 2, offset.y - tileSize.y / 2);
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
    var topLeft = new Box2D.Common.Math.b2Vec2(start.x, start.y - tileSize.y * (world.length - 1));
    
    for(var y = 0; y < world.length; y++) {
        for(var x = 0; x < world[y].length; x++) {
            test.createItem(world[y][x], new Box2D.Common.Math.b2Vec2(x, y), topLeft, tileSize, respawn);
        }
    }
};

test.createItem = function(type, location, offset, tileSize, respawn) {
    var obj = null;
    var imgSheet = marioSheet;
    var imgOffset = null;
    switch(type) {
        case ' ':
            break;
        case '-':
            obj = p.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(offset.x + location.x * tileSize.x, offset.y + location.y * tileSize.y));
            imgOffset = offsets.floor;
            break;
        case '=':
            obj = p.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(offset.x + location.x * tileSize.x, offset.y + location.y * tileSize.y));
            imgOffset = offsets.hard;
            break;
        case 'O':
            obj = p.createBreakableBlock(tileSize, new Box2D.Common.Math.b2Vec2(offset.x + location.x * tileSize.x, offset.y + location.y * tileSize.y));
            game.platformer.initializeDirectionalAction(obj, function(collidingObject){
                var obj = p.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(offset.x + location.x * tileSize.x, offset.y + location.y * tileSize.y));
                g.getViewport().setImage(obj, marioSheet, offsets.spentBox);
                obj = g.getWorld().createScenery(tileSize, new Box2D.Common.Math.b2Vec2(offset.x + location.x * tileSize.x, offset.y + (location.y - 1) * tileSize.y));
                g.getViewport().setImage(obj, marioSheet, offsets.coin);
            }, game.platformer.SIDES.BOTTOM);
            imgOffset = offsets.coinBox;
            break;
        case '@':
            obj = p.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(offset.x + location.x * tileSize.x, offset.y + location.y * tileSize.y));
            obj.coins = 8;
            obj.coinsOutput = 0;
            game.platformer.initializeDirectionalAction(obj, function(contact){
                obj.coinsOutput++;
                nObj = g.getWorld().createScenery(tileSize, new Box2D.Common.Math.b2Vec2(offset.x + location.x * tileSize.x, offset.y + (location.y - obj.coinsOutput / obj.coins) * tileSize.y));
                g.getViewport().setImage(nObj, marioSheet, offsets.coin);
                if(obj.coinsOutput == obj.coins) {
                    g.getWorld().destroyObject(obj);
                    var nObj = p.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(offset.x + location.x * tileSize.x, offset.y + location.y * tileSize.y));
                    g.getViewport().setImage(nObj, marioSheet, offsets.spentBox);
                }
            }, game.platformer.SIDES.BOTTOM);
            imgOffset = offsets.coinBlock;
            break;
        case '#':
            obj = p.createBreakableBlock(tileSize, new Box2D.Common.Math.b2Vec2(offset.x + location.x * tileSize.x, offset.y + location.y * tileSize.y));
            imgOffset = offsets.block;
            break;
        case '1':
            obj = p.createBreakableBlock(tileSize, new Box2D.Common.Math.b2Vec2(offset.x + location.x * tileSize.x, offset.y + location.y * tileSize.y));
            game.platformer.initializeDirectionalSiding(obj, game.platformer.SIDES.TOP | game.platformer.SIDES.LEFT | game.platformer.SIDES.RIGHT);
            game.platformer.initializeDirectionalAction(obj, function(contact){
                var obj = p.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(offset.x + location.x * tileSize.x, offset.y + location.y * tileSize.y));
                g.getViewport().setImage(obj, marioSheet, offsets.spentBox);
                obj = g.getWorld().createScenery(tileSize, new Box2D.Common.Math.b2Vec2(offset.x + location.x * tileSize.x, offset.y + (location.y - 1) * tileSize.y));
                g.getViewport().setImage(obj, marioSheet, offsets.oneUp);
            }, game.platformer.SIDES.BOTTOM);
            imgOffset = offsets.hiddenOneUp;
            break;
        case '*':
            obj = p.createBreakableBlock(tileSize, new Box2D.Common.Math.b2Vec2(offset.x + location.x * tileSize.x, offset.y + location.y * tileSize.y));
            game.platformer.initializeDirectionalSiding(obj, game.platformer.SIDES.TOP | game.platformer.SIDES.LEFT | game.platformer.SIDES.RIGHT);
            game.platformer.initializeDirectionalAction(obj, function(contact){
                var obj = p.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(offset.x + location.x * tileSize.x, offset.y + location.y * tileSize.y));
                g.getViewport().setImage(obj, marioSheet, offsets.spentBox);
                obj = g.getWorld().createScenery(tileSize, new Box2D.Common.Math.b2Vec2(offset.x + location.x * tileSize.x, offset.y + (location.y - 1) * tileSize.y));
                g.getViewport().setImage(obj, marioSheet, offsets.star);
            }, game.platformer.SIDES.BOTTOM);
            imgOffset = offsets.hiddenStar;
            break;
        case 'M':
            obj = p.createBreakableBlock(tileSize, new Box2D.Common.Math.b2Vec2(offset.x + location.x * tileSize.x, offset.y + location.y * tileSize.y));
            game.platformer.initializeDirectionalAction(obj, function(contact){
                var obj = p.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(offset.x + location.x * tileSize.x, offset.y + location.y * tileSize.y));
                g.getViewport().setImage(obj, marioSheet, offsets.spentBox);
                obj = g.getWorld().createScenery(tileSize, new Box2D.Common.Math.b2Vec2(offset.x + location.x * tileSize.x, offset.y + (location.y - 1) * tileSize.y));
                g.getViewport().setImage(obj, marioSheet, offsets.shroom);
            }, game.platformer.SIDES.BOTTOM);
            imgOffset = offsets.shroomBox;
            break;
        case '[':
            obj = p.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(offset.x + location.x * tileSize.x, offset.y + location.y * tileSize.y));
            imgOffset = offsets.pipeL;
            break;
        case ']':
            obj = p.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(offset.x + location.x * tileSize.x, offset.y + location.y * tileSize.y));
            imgOffset = offsets.pipeR;
            break;
        case '<':
            obj = p.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(offset.x + location.x * tileSize.x, offset.y + location.y * tileSize.y));
            imgOffset = offsets.pipeLT;
            break;
        case '>':
            obj = p.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(offset.x + location.x * tileSize.x, offset.y + location.y * tileSize.y));
            imgOffset = offsets.pipeRT;
            break;
        case '{':
            obj = p.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(offset.x + location.x * tileSize.x, offset.y + location.y * tileSize.y));
            imgOffset = offsets.pipeLTD;
            break;
        case '}':
            obj = p.createBlock(tileSize, new Box2D.Common.Math.b2Vec2(offset.x + location.x * tileSize.x, offset.y + location.y * tileSize.y));
            imgOffset = offsets.pipeRTD;
            break;
        case 'T':
            obj = g.getWorld().createScenery(tileSize, new Box2D.Common.Math.b2Vec2(offset.x + location.x * tileSize.x, offset.y + location.y * tileSize.y));
            imgOffset = offsets.turtle;
            break;
        case 'G':
            obj = g.getWorld().createScenery(tileSize, new Box2D.Common.Math.b2Vec2(offset.x + location.x * tileSize.x, offset.y + location.y * tileSize.y));
            imgOffset = offsets.goomba;
            break;
        case '|':
            obj = g.getWorld().createScenery(tileSize, new Box2D.Common.Math.b2Vec2(offset.x + location.x * tileSize.x, offset.y + location.y * tileSize.y));
            imgOffset = offsets.flagPole;
            break;
        case 'F':
            obj = g.getWorld().createScenery(tileSize, new Box2D.Common.Math.b2Vec2(offset.x + location.x * tileSize.x + tileSize.x / 2, offset.y + location.y * tileSize.y), 1 /* zOffset */);
            imgOffset = offsets.flag;
            break;
        case 'o':
            obj = g.getWorld().createScenery(tileSize, new Box2D.Common.Math.b2Vec2(offset.x + location.x * tileSize.x, offset.y + location.y * tileSize.y));
            imgOffset = offsets.flagTopper;
            break;
        case '+':
            obj = g.getWorld().createScenery(tileSize, new Box2D.Common.Math.b2Vec2(offset.x + location.x * tileSize.x, offset.y + location.y * tileSize.y));
            imgOffset = offsets.castleWall;
            break;
        case '^':
            obj = g.getWorld().createScenery(tileSize, new Box2D.Common.Math.b2Vec2(offset.x + location.x * tileSize.x, offset.y + location.y * tileSize.y));
            imgOffset = offsets.castleTopper;
            break;
        case '8':
            obj = g.getWorld().createScenery(tileSize, new Box2D.Common.Math.b2Vec2(offset.x + location.x * tileSize.x, offset.y + location.y * tileSize.y));
            imgOffset = offsets.castleDoorBottom;
            break;
        case 'u':
            obj = g.getWorld().createScenery(tileSize, new Box2D.Common.Math.b2Vec2(offset.x + location.x * tileSize.x, offset.y + location.y * tileSize.y));
            imgOffset = offsets.castleDoorTop;
            break;
        case 'R':
            obj = g.getWorld().createScenery(tileSize, new Box2D.Common.Math.b2Vec2(offset.x + location.x * tileSize.x, offset.y + location.y * tileSize.y));
            imgOffset = offsets.castleWindowRight;
            break;
        case 'r':
            obj = g.getWorld().createScenery(tileSize, new Box2D.Common.Math.b2Vec2(offset.x + location.x * tileSize.x, offset.y + location.y * tileSize.y));
            imgOffset = offsets.castleTopperWindowRight;
            break;
        case 'L':
            obj = g.getWorld().createScenery(tileSize, new Box2D.Common.Math.b2Vec2(offset.x + location.x * tileSize.x, offset.y + location.y * tileSize.y));
            imgOffset = offsets.castleWindowLeft;
            break;
        case 'l':
            obj = g.getWorld().createScenery(tileSize, new Box2D.Common.Math.b2Vec2(offset.x + location.x * tileSize.x, offset.y + location.y * tileSize.y));
            imgOffset = offsets.castleTopperWindowLeft;
            break;
        case '&':
            obj = g.getWorld().createScenery(tileSize, new Box2D.Common.Math.b2Vec2(offset.x + location.x * tileSize.x, offset.y + location.y * tileSize.y));
            imgOffset = offsets.castleTopperWall;
            break;
        case '$':
            obj = g.getWorld().createScenery(tileSize, new Box2D.Common.Math.b2Vec2(offset.x + location.x * tileSize.x, offset.y + location.y * tileSize.y + tileSize.y / 4));
            imgOffset = offsets.castleFlag;
            break;
        case 'x':
            obj = p.createDeathTrigger(tileSize, new Box2D.Common.Math.b2Vec2(offset.x + location.x * tileSize.x, offset.y + location.y * tileSize.y), respawn);
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

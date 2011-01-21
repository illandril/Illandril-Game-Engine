goog.provide("test");

goog.require("illandril.game.Engine");

test = {};
test.init = function( mc ) {
  illandril.game.Engine.mc = mc;
  illandril.game.Engine.init( "game", "map.json", "../graphics/" );
}

goog.exportSymbol( "test", test );

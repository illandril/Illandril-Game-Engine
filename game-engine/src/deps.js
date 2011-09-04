// This file was autogenerated by ../closure-library/closure/bin/build/depswriter.py.
// Please do not edit.
goog.addDependency('../../../game-engine/src/ai/ai.js', ['game.ai'], ['goog.array']);
goog.addDependency('../../../game-engine/src/controls/action.js', ['game.controls.action'], ['game.controls']);
goog.addDependency('../../../game-engine/src/controls/controls.js', ['game.controls'], ['goog.events', 'goog.events.EventType', 'goog.events.KeyCodes', 'goog.events.KeyHandler', 'goog.events.KeyNames', 'goog.userAgent']);
goog.addDependency('../../../game-engine/src/game.js', ['game.game'], ['game.ai', 'game.ui.animation', 'game.ui.viewport', 'game.world', 'window.requestAnimFrame']);
goog.addDependency('../../../game-engine/src/gameObject.js', ['game.gameObject'], ['game.ui', 'game.ui.spriteSheet']);
goog.addDependency('../../../game-engine/src/gameTypes/platformer.js', ['game.platformer'], ['game.controls.action']);
goog.addDependency('../../../game-engine/src/games/mario.js', ['mario'], ['game.controls', 'game.controls.action', 'game.game', 'game.platformer', 'goog.events.KeyCodes']);
goog.addDependency('../../../game-engine/src/games/pit.js', ['pit'], ['game.controls', 'game.controls.action', 'game.game', 'game.platformer', 'goog.events.KeyCodes']);
goog.addDependency('../../../game-engine/src/games/test.js', ['test'], ['game.controls', 'game.controls.action', 'game.game', 'game.platformer', 'goog.events.KeyCodes']);
goog.addDependency('../../../game-engine/src/shims.js', ['window.requestAnimFrame'], []);
goog.addDependency('../../../game-engine/src/ui/animation.js', ['game.ui.animation'], ['game.ai', 'game.ui.spriteSheet', 'game.ui.viewport']);
goog.addDependency('../../../game-engine/src/ui/spriteSheet.js', ['game.ui.spriteSheet'], ['game.ui']);
goog.addDependency('../../../game-engine/src/ui/ui.js', ['game.ui'], []);
goog.addDependency('../../../game-engine/src/ui/viewport.js', ['game.ui.viewport'], ['Box2D.Collision.b2AABB', 'Box2D.Common.Math.b2Vec2', 'Box2D.Dynamics.b2DebugDraw', 'game.ui', 'game.ui.spriteSheet']);
goog.addDependency('../../../game-engine/src/world.js', ['game.world'], ['Box2D', 'game.gameObject']);

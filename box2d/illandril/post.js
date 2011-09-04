/*
 * See Box2D.js
 */
goog.provide('Box2D.Post');

goog.require('Box2D.unopped');
goog.require('Box2D.postDefs');

var i;
for (var i = 0; i < Box2D.postDefs.length; ++i) {
    Box2D.postDefs[i]();
}
delete Box2D.postDefs;

/*
 * See Box2D.js
 */
goog.provide('Box2D.Post');

var i;
for (i = 0; i < Box2D.postDefs.length; ++i) Box2D.postDefs[i]();
delete Box2D.postDefs;
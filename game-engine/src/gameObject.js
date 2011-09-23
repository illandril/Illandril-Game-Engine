goog.provide('illandril.game.gameObject');

/**
 * @param {!Box2D.Common.Math.b2Vec2} position
 * @constructor
 */
illandril.game.gameObject = function(position) {
    /** @type {number} */
    this.UID = illandril.game.gameObject.NEXT_UID++;
    
    /** @type {!Box2D.Common.Math.b2Vec2} */
    this.position = position.Copy();
    
    /** @type {number} */
    this.angle = 0;
    
    /** @type {Array.<function(number, number)>} */
    this.thoughts = [];
    
    /** @type {Array.<function(!Box2D.Dynamics.Contacts.b2Contact, !illandril.game.gameObject, !Box2D.Dynamics.b2Body, !Box2D.Dynamics.b2Fixture, !illandril.game.gameObject, !Box2D.Dynamics.b2Body, !Box2D.Dynamics.b2Fixture)>} */
    this.ValidateBeginContactActions = [];
    
    /** @type {Array.<function(!Box2D.Dynamics.Contacts.b2Contact, !illandril.game.gameObject, !Box2D.Dynamics.b2Body, !Box2D.Dynamics.b2Fixture, !illandril.game.gameObject, !Box2D.Dynamics.b2Body, !Box2D.Dynamics.b2Fixture)>} */
    this.BeginContactActions = [];
    
    /** @type {Array.<function(!Box2D.Dynamics.Contacts.b2Contact, !Box2D.Common.Math.b2Vec2, !illandril.game.gameObject, !Box2D.Dynamics.b2Body, !Box2D.Dynamics.b2Fixture, !illandril.game.gameObject, !Box2D.Dynamics.b2Body, !Box2D.Dynamics.b2Fixture)>} */
    this.PostSolveActions = [];
    
    /** @type {Box2D.Dynamics.b2Body} */
    this.body = null;
};

/**
 * @param {!Box2D.Common.Math.b2Vec2} position
 */
illandril.game.gameObject.prototype.setPosition = function(position) {
    if(this.body) {
        this.body.SetPosition(position);
    } else {
        this.position = position.Copy();
    }
};

/**
 * @return {!Box2D.Common.Math.b2Vec2}
 */
illandril.game.gameObject.prototype.getPosition = function() {
    if (this.body) {
        return this.body.GetPosition();
    } else {
        return this.position.Copy();
    }
};

/**
 * @return {number}
 */
illandril.game.gameObject.prototype.getAngle = function() {
    if (this.body) {
        return this.body.GetAngle();
    } else {
        return this.angle;
    }
};

/**
 * @type {number}
 * @private
 */
illandril.game.gameObject.NEXT_UID = 0;

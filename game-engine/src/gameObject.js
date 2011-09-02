goog.provide('game.gameObject');

goog.require('game.ui');
goog.require('game.ui.spriteSheet');

game.gameObject = function(position) {
    this.UID = game.gameObject.NEXT_UID++;
    this.position = position.Copy();
    this.angle = 0;
};

game.gameObject.prototype.setPosition = function(newPos) {
    if(this.body) {
        this.body.SetPosition(newPos);
    } else {
        this.position = newPos.Copy();
    }
};

game.gameObject.prototype.getPosition = function() {
    if (this.body) {
        return this.body.GetPosition();
    } else {
        return this.position.Copy();
    }
};

game.gameObject.prototype.getAngle = function() {
    if (this.body) {
        return this.body.GetAngle();
    } else {
        return this.angle;
    }
};

game.gameObject.NEXT_UID = 0;

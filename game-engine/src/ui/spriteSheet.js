goog.provide('illandril.game.ui.spriteSheet');

goog.require('illandril.game.ui.ui');
goog.require('Box2D.Common.Math.b2Vec2');

/**
 * @param {string} url
 * @param {Box2D.Common.Math.b2Vec2=} offset Defaults to 0,0
 * @param {Box2D.Common.Math.b2Vec2=} sheetSize Defautls to 1,1 - only needed if this is used for animation
 * @param {Box2D.Common.Math.b2Vec2=} tileSize Defaults to 1,1 - only needed if this is used for animation
 * @constructor
 */
illandril.game.ui.spriteSheet = function(url, offset, sheetSize, tileSize) {
    illandril.game.ui.ui.preloadImage(url);
    this.url = url;
    this.offset = offset || new Box2D.Common.Math.b2Vec2(0, 0);
    this.sheetSize = sheetSize || new Box2D.Common.Math.b2Vec2(1, 1);
    this.tileSize = tileSize || new Box2D.Common.Math.b2Vec2(1, 1);
    this.tile = new Box2D.Common.Math.b2Vec2(1, 1);
};

/**
 * @param {!Box2D.Common.Math.b2Vec2} tile
 */
illandril.game.ui.spriteSheet.prototype.setTile = function(tile) {
    this.tile = tile.Copy();
    this.tile.x = this.tile.x % this.sheetSize.x;
    this.tile.y = this.tile.y % this.sheetSize.y;
    if (this.tile.x === 0) {
        this.tile.x = this.sheetSize.x;
    }
    if (this.tile.y === 0) {
        this.tile.y = this.sheetSize.y;
    }
};

illandril.game.ui.spriteSheet.prototype.updateDOM = function(domObject) {
    var tileChange = false;
    var savedStyle = illandril.game.ui.ui.getDOMStyleCache(domObject);
    if (savedStyle.bg != this.url) {
        savedStyle.bg = this.url;
        domObject.style.backgroundImage = 'url(' + this.url + ')';
        domObject.style.backgroundColor = 'transparent';
        tileChange = true;
    } else {
        if (savedStyle.bgPosX != this.tile.x || savedStyle.bgPosY != this.tile.y) {
            tileChange = true;
        }
    }
    
    if (tileChange) {
        savedStyle.bgPosX = this.tile.x;
        savedStyle.bgPosY = this.tile.y;
        domObject.style.backgroundPosition = ((this.offset.x + (this.tile.x - 1) * this.tileSize.x) * -1) + 'px ' + ((this.offset.y + (this.tile.y - 1) * this.tileSize.y) * -1) + 'px';
    }
};
